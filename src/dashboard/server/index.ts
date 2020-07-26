//imports
import express, { Request, Response } from 'express'
import next from 'next'

//import db connection
import { connectDB } from './db'

//routes
import test from './routes/test'

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
    console.log(dbResponse.message)
    if (!dbResponse.success) {
      throw 'Database connection failed'
    }

    //Register api routes first
    server.use('/api/test', test)

    //Everything else is a site page
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(
        `> Ready on localhost:${port} - env ${
          process.env.NEXT_PUBLIC_NODE_ENV ?? 'dev'
        } mode`
      )
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
