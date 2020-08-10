import { Document, Model } from 'mongoose'
import { ObjectID } from 'mongodb'

export interface UserDocument extends Document {
  username: string
  assignedImages: Record<string, any>
  catalogs: [ObjectID]
  dateAdded: Date
  imagesTagged: Record<string, any>
  roles: [string]
  userId: string
}

export interface CatalogDocument extends Document {
  dateAdded?: Date
  name: string
  path: {
    original: string
    compressed?: string
  }
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

  updateCatalogImageCount(): Promise<void>
}

export interface CatalogModelType extends Model<CatalogDocument> {
  // here we decalre statics

  updateCatalogImageCount?: (catalogId: ObjectID) => Promise<void>
}

export interface ArchiveDocument extends Document {
  dateAdded?: Date
  name: string
  path: {
    original: string
    compressed?: string
  }
  catalog: ObjectID
  taggable: boolean
  totalImages?: number

  updateCatalogImageCount(): Promise<void>
  updateArchiveImageCount(): Promise<void>
}

export interface ArchiveModelType extends Model<ArchiveDocument> {
  // here we decalre statics

  updateCatalogImageCount?: (catalogId: ObjectID) => Promise<void>
  updateArchiveImageCount?: (archiveId: ObjectID) => Promise<void>
}

export interface ImageDocument extends Document {
  archive: ObjectID
  dateAdded?: Date
  finalTag?: Record<string, any>
  name: string
  path: {
    original: string
    compressed?: string
  }
  taggable: boolean
  // tags?: [Record<string, any>]
  //numberOfTags?: number
  numberOfMatches: number
}

export type AllDocuments =
  | UserDocument
  | CatalogDocument
  | ArchiveDocument
  | ImageDocument
