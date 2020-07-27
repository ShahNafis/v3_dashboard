import express, { Request, Response } from 'express'
import next from 'next'

//import db connection
import { connectDB } from './db'

//logged with or without color depending on env
import { log } from './utils/logger'

//Generic function to handle erros
import { errorHandler } from './middlewares/error'

//routes
import test from './routes/test'
import user from './routes/user'

//Security
import { initAuthentication } from './auth'

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
const app = next({
  dev,
  dir: './site',
})
const handle = app.getRequestHandler()
const port = ((process.env.NEXT_PUBLIC_PORT as unknown) as number) ?? 3000

;(async () => {
  try {
    await app.prepare()
    const server = express()

    //Connect to db first
    await connectDB()

    const { restrictAccess } = initAuthentication(server)
    // Body parser so that json can be recieved on Api calls
    server.use(express.json())

    //Register api routes first
    server.use('/api/test', test)
    server.use(`/api/user`, user)

    // This handles errors that happen during API calls
    server.use(errorHandler)

    //Only pages with /auth at the beginning need to be restricted
    server.use('/auth/*', restrictAccess)

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
        message: `--Error--: ${err?.message ?? 'undefined error'}`,
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
