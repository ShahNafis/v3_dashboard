import { Document } from 'mongoose'
import { ObjectID } from 'mongodb';

export interface UserDocument extends Document {
  username: string
}

export interface CatalogDocument extends Document {
  dateAdded?: Date
  name: string
  path: string
  compressedPath: string
  catalogInfo?: {
    year: number
    link: string
    description: string
  }
  taggable: boolean
  questionSet: ObjectID
  imageServeOrder?: {
    type: string
  }
  totalImages?: number
}

export interface ArchiveDocument extends Document {
  dateAdded?: Date
  name: string
  path: string
  compressedPath: string
  catalog: ObjectID
  taggable: boolean
  totalImages?: number
}

export interface ImageDocument extends Document {
  archive: ObjectID,
  dateAdded?: Date,
  finalTag?: Record<string, any>,
  // location?:{
  //     upperLeft:[number],
  //     upperRight:[number],
  //     lowerLeft:[number],
  //     lowerRight:[number]
  // },
  name: string,
  path: string,
  taggable: boolean,
  tags?: [Record<string, any>],
  numberOfTags?: number
  numberOfMatches: number
}
