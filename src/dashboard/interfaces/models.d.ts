import { Document } from 'mongoose'

export interface UserDocument extends Document {
  username: string
}

export interface CatalogDocument extends Document {
  archives: any
  catalogInfo?: {
    year: number
    link: string
    description: string
  }
  dateAdded?: Date
  name: string
  path: string
  taggable: boolean
  questionSet: Types.ObjectId
  imageServeOrder?: {
    type: string
  }
  totalImages: number
}

export interface ArchiveDocument extends Document {
  dateAdded?: Date
  name: string
  path: string
  role: [Types.ObjectId]
  catalog: Types.ObjectId
  taggable: boolean
  totalImages: number
}
