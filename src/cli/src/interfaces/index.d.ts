declare namespace cilDashboard {
  export interface ResponseType {
    success: boolean
    message: string
    data?: any
  }

  export interface ResumeTaggingData {
    catalogName: string
    archives: {
      archiveName: string
      total: number
      tagged: number
      link: string
    }[]
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
    displayName: string,
    id: string,
    user_id: string,
    provider: string,
    picture: string,
    nickname: string,
    _json: {
      sub: string,       
      given_name: string,
      family_name: string,
      nickname: string,
      name: string,
      picture: string,
      locale: string,
      updated_at: string,
      email: string,
      email_verified: boolean
    },
    data?: {
      catalogs: [any],
      roles: [string],
      _id: string,
      userId: string,
      userName: string,
      dataAdded: Date,
      imagesTagged: [any],
      id: string
    }
  }
}

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}

export = cilDashboard
