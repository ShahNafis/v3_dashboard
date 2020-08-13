// eslint-disable-next-line
import * as Types from '../interfaces'

import dotenv from 'dotenv'
// Load env vars
dotenv.config({
  path: './test.env',
})

import express, { Request, Response } from 'express'
import next from 'next'

//import db connection
import { connectDB, closeConnection } from './db'

//logged with or without color depending on env
import { log } from './utils/logger'

//Generic function to handle erros
import { errorHandler } from './middlewares/error'

//routes
import test from './routes/test'
import user from './routes/user'
import catalog from './routes/catalogs'
import archive from './routes/archives'
import assignedImages from './routes/assignedImages'
import image from './routes/image'
import imageServeOrder from './routes/imageServeOrder'
import tags from './routes/tags'

//Security
import { initAuthentication } from './auth'

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
console.log(`dev mode ${dev}`)
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
    server.use(`/api/catalog`, catalog)
    server.use(`/api/archive`, archive)
    server.use(`/api/assignedImages`, assignedImages)
    server.use(`/api/image`, image)
    server.use(`/api/imageServeOrder`, imageServeOrder)
    server.use(`/api/tags`, tags)

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
        `> Ready on ${process.env.NEXT_PUBLIC_PROTOCOL}://${
          process.env.NEXT_PUBLIC_DOMAIN_NAME
        } - env ${process.env.NEXT_PUBLIC_NODE_ENV ?? 'dev'} mode
        `
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
        closeConnection()
        process.exit(1)
      })
    })
  } catch (e) {
    console.error(e)
    closeConnection()
    process.exit(1)
  }
})()
