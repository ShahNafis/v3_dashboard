import { connect, Mongoose } from 'mongoose'
import { ResponseType } from '../interfaces'
import { log } from './utils/logger'

export const connectDB = async (): Promise<ResponseType> => {
  //Get the uri to connect from the enviroment variables. Assume by default to use the development db
  let dbURI: string = process?.env?.MONGO_URI_DEV

  //If in production mode, use production db
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    dbURI = process?.env?.MONGO_URI_PRODUCTION
  }

  //for whatever reason if the uri is not defined, exit
  if (dbURI === '' || !dbURI) {
    return {
      success: false,
      message: 'No URI passed',
    } as ResponseType
  }
  //Inform which DB using
  log({
    message: `Using ${process.env.NEXT_PUBLIC_NODE_ENV} Database`,
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
  return {
    success: true,
    message: `MongoDB connected: ${conn?.connection?.host}`,
  } as ResponseType
}
