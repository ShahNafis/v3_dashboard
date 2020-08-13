import { Response } from 'express'
//For some reason even though UserDocument is used, eslint thinks its not.
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllDocuments,
  CatalogDocument,
  UserDocument,
  ArchiveDocument,
} from './models'
import { ObjectID } from 'mongodb'

declare namespace cilDashboard {
  export interface ResponseType {
    success: boolean
    message: string
    data?: any
  }

  export interface ResumeTaggingData {
    archiveId: string | ObjectID
    catalogId: string | ObjectID
    tagCount: number
    archive: ArchiveDocument
    catalog: CatalogDocument
  }

  export interface CatalogSelectionData {
    name: string
    _id: string
    catalogInfo: {
      year: number
      link: string
      description: string
    }
    totalImages: number
    archives: {
      name: string
      totalImages: number
      _id: string
    }[]
  }

  export interface UserProp {
    displayName: string
    id: string
    user_id: string
    provider: string
    picture: string
    nickname: string
    _json: {
      sub: string
      given_name: string
      family_name: string
      nickname: string
      name: string
      picture: string
      locale: string
      updated_at: string
      email: string
      email_verified: boolean
    }
    data?: UserDocument
  }

  // export interface AdvResultsRes extends Response {
  //   advancedResults?: {
  //     success: boolean
  //     count: number
  //     message: string
  //     pagination: {
  //       page: number
  //       limit: number
  //     }
  //     data: AllDocuments[]
  //   }
  // }

  export interface ResPartOfCatalog extends AdvResultsRes {
    partOfCatalog: boolean
  }

  export interface ExtenedResponse extends Response {
    advancedResults?: {
      success: boolean
      count: number
      message: string
      pagination: {
        page: number
        limit: number
      }
      data: AllDocuments[]
    }
    partOfCatalog?: boolean
  }
}

declare global {
  namespace Express {
    interface User {
      displayName: string
      id: string
      user_id: string
      provider: string
      picture: string
      nickname: string
      _json: {
        sub: string
        given_name: string
        family_name: string
        nickname: string
        name: string
        picture: string
        locale: string
        updated_at: string
        email: string
        email_verified: boolean
      }
      /* eslint-disable @typescript-eslint/no-unused-vars */
      data?: UserDocument
    }
  }
}

export = cilDashboard
