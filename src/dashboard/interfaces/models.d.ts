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
  role: [ObjectID]
  catalog: ObjectID
  taggable: boolean
  totalImages: number
}
