import { asyncHandler } from './async'
import { ResPartOfCatalog } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { CatalogModel } from '../models/Catalog'

const userPartOfCatalog = asyncHandler(
  async (req: Request, res: ResPartOfCatalog, next: NextFunction) => {
    const { catalogID } = req.body

    if (!catalogID) {
      return res.status(200).json({
        success: true,
        message: 'No catalogId sent',
        data: {
          partOfCatalog: false,
        },
      })
    }

    //See if the catalogId passed is valid
    const catalog = await CatalogModel.findOne({ _id: catalogID })
    if (!catalog) {
      return res.status(200).json({
        success: true,
        message: `Invalid catalog id: ${catalogID}`,
        data: {
          partOfCatalog: false,
        },
      })
    }

    //see if user is part of catalog
    const userCatalogs = req?.user?.data?.catalogs
    const partOfCatalog = userCatalogs.includes(catalogID)
    res.partOfCatalog = partOfCatalog

    next()
  }
)

export { userPartOfCatalog }
