declare namespace cilDashboard {
  export interface ResponseType {
    success: boolean
    message: string
    data?: any
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
