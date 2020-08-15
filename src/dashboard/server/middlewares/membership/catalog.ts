import { asyncHandler } from '../async'
// import { ResPartOfCatalog } from '../../../interfaces'
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { ArchiveModel } from '../../models/Archive'
import { ImageModel } from '../../models/Image'

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
    let { catalogId } = req.body
    const { archiveId, imageId } = req.body

    if (imageId) {
      const image = await ImageModel.findById(imageId)
      const archive = await ArchiveModel.findById(image.archive)
      catalogId = archive.catalog.toString()
    }
    if (archiveId) {
      const archive = await ArchiveModel.findById(archiveId)
      catalogId = archive.catalog.toString()
    }
    const result = await membershipCatalog(
      user?.data?.catalogs,
      catalogId.toString()
    )

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
