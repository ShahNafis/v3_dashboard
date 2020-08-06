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
}

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}

export = cilDashboard
