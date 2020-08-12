import { asyncHandler } from '../async'
// import { ResPartOfCatalog } from '../../../interfaces'
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'

async function membershipCatalog(userCatalog: [ObjectId], catalogId: string) {
  let result = false

  userCatalog.forEach((catalog) => {
    if (catalog.toString() === catalogId) {
      result = true
    }
  })

  return result
}

const membershipCatalogMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req
    const { catalogId } = req.body
    const result = await membershipCatalog(user?.data?.catalogs, catalogId)

    if (result) {
      next()
    } else {
      res.status(401).json({
        success: false,
        message: `User has no membership to catalog Id ${catalogId}`,
      })
    }
  }
)

export { membershipCatalog, membershipCatalogMiddleware }
