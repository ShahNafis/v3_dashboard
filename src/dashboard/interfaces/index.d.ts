declare namespace cilDashboard {
  export interface ResponseType {
    success: boolean
    message: string
    data?: any
  }

  export interface ResumeTaggingData {
    catalogName: string;
    archives: {
        archiveName: string;
        total: number;
        tagged: number;
        link: string;
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
