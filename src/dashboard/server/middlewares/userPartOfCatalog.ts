import { asyncHandler } from './async'
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { CatalogModel } from '../models/Catalog'

const userPartOfCatalog = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { catalogId } = req.body

    if (!catalogId) {
      return res.status(200).json({
        success: true,
        message: 'No catalogId sent',
        data: {
          partOfCatalog: false,
        },
      })
    }

    //See if the catalogId passed is valid
    const catalog = await CatalogModel.findOne({ _id: catalogId })
    if (!catalog) {
      return res.status(200).json({
        success: true,
        message: `Invalid catalog id: ${catalogId}`,
        data: {
          partOfCatalog: false,
        },
      })
    }

    //see if user is part of catalog
    const userCatalogs = req?.user?.data?.catalogs
    const partOfCatalog = userCatalogs.includes(catalogId)
    res.partOfCatalog = partOfCatalog

    next()
  }
)

export { userPartOfCatalog }
