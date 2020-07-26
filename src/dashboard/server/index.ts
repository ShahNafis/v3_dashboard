import express, { Request, Response, NextFunction } from 'express'
import next from 'next'

//import db connection
import { connectDB } from './db'

//logged with or without color depending on env
import { log } from './utils/logger'

//Generic function to handle erros
import { errorHandler } from './middlewares/error'

//routes
import test from './routes/test'

// 1 - importing dependencies
import session from 'express-session'
const MemoryStore = require('memorystore')(session)
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import uid from 'uid-safe'
import { authRoutes } from './utils/auth-routes' //Handles login and logout

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
const app = next({
  dev,
  dir: './site',
})
const handle = app.getRequestHandler()
const port = process.env.NEXT_PUBLIC_PORT ?? 3000

;(async () => {
  try {
    await app.prepare()
    const server = express()

    //Connect to db first
    const dbResponse = await connectDB()

    if (!dbResponse.success) {
      log({
        message: dbResponse.message,
        type: 'error',
      })
      throw 'Database connection failed'
    } else {
      log({
        message: dbResponse.message,
        type: 'ok',
      })
    }

    //Security
    // 2 - add session management to Express
    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: 86400 * 1000, // 24 hours in milliseconds
      },
      resave: false,
      saveUninitialized: true,
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    }
    server.use(session(sessionConfig))

    // 3 - configuring Auth0Strategy
    const auth0Strategy = new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
      },
      function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile)
      }
    )

    // 4 - configuring Passport
    passport.use(auth0Strategy)
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))

    // 5 - adding Passport and authentication routes
    server.use(passport.initialize())
    server.use(passport.session())
    server.use(authRoutes)

    // 6 - you are restricting access to some routes
    const restrictAccess = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (!req.isAuthenticated()) return res.redirect('/login')
      next()
    }

    // Body parser so that json can be recieved on Api calls
    server.use(express.json())

    //Register api routes first
    server.use('/api/test', test)

    // This handles errors that happen during API calls
    server.use(errorHandler)

    //Only pages with /auth at the beginning need to be restricted
    server.use('/*', restrictAccess)

    //Everything else is a site page
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    //start the server
    const serverObj = server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(
        `> Ready on ${process.env.NEXT_PUBLIC_PROTOCAL}://${
          process.env.NEXT_PUBLIC_DOMAIN_NAME
        } - env ${process.env.NEXT_PUBLIC_NODE_ENV ?? 'dev'} mode`
      )
    })

    //Handle unhandled promise rejections
    process.on('unhandledRejection', (err: any) => {
      log({
        message: `Error: ${err?.message ?? 'undefined error'}`,
        type: 'error',
      })

      //Exit server on fail
      serverObj.close(() => {
        process.exit(1)
      })
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
