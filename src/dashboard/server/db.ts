import { connect, Mongoose, connection } from 'mongoose'
import { log } from './utils/logger'

export const connectDB = async () => {
  //Get the uri to connect from the enviroment variables. Assume by default to use the development db
  let dbURI: string = process?.env?.MONGO_URI_DEV

  //If in production mode, use production db
  if (process.env.NODE_ENV === 'production') {
    dbURI = process?.env?.MONGO_URI_PRODUCTION
  }

  //for whatever reason if the uri is not defined, exit
  if (dbURI === '' || !dbURI) {
    log({
      message: 'No URI passed',
      type: 'error',
    })
    throw 'Database connection failed'
  }
  //Inform which DB using
  log({
    message: `Using ${process.env.NODE_ENV} Database`,
    type: 'info',
  })

  //Connect
  const conn: Mongoose = await connect(dbURI as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  //Inform that the connection has been made
  log({
    message: `MongoDB connected: ${conn?.connection?.host}`,
    type: 'ok',
  })
}

export const closeConnection = async () => {
  connection.close()
  log({
    message: 'DB connection closed',
    type: 'ok',
  })
}
