import { Request, NextFunction } from 'express'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { CatalogModel } from '../models/Catalog'

const returnAdvResults = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    res.status(200).json(res.advancedResults)
  }
)

const userCatalogMembership = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const { catalogId } = req.body
    res.status(200).json({
      success: true,
      message: `User has membership to catalog ${catalogId}`,
      data: {
        membershipCatalog: true,
      },
    })
  }
)

const catalogExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { catalogId } = req.body

    if (!catalogId) {
      return res.status(200).json({
        success: false,
        message: 'No catalogId given',
      })
    }

    const catalog = await CatalogModel.findById(catalogId)

    if (!catalog) {
      return res.status(200).json({
        success: false,
        message: `No catalog with catalogId: ${catalogId}`,
      })
    }

    res.catalog = catalog
    next()
  }
)
export { returnAdvResults, userCatalogMembership, catalogExists }
