import { Request } from 'express'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
// import {CatalogModel} from '../models/Catalog'
// import {UserDocument,CatalogDocument,ArchiveDocument} from '../../interfaces/models'
import { AdvResultsRes } from '../../interfaces'
import { CatalogDocument, AllDocuments } from '../../interfaces/models'
import { ObjectID } from 'mongodb'
import { CatalogModel } from '../models/Catalog'

const getAllCatalogs = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    res.status(200).json(res.advancedResults)
  }
)

const filterUserCatalogs = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    const data = res.advancedResults.data
    const userCatalogs: [ObjectID] = req?.user?.data?.catalogs

    const newData = filterToUserCatalog(data, userCatalogs)

    res.advancedResults.data = newData
    res.status(200).json(res.advancedResults)
  }
)

const userPartOfCatalog = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
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

    if (partOfCatalog) {
      return res.status(200).json({
        success: true,
        message: `User is part of catalog ${catalogID}`,
        data: {
          partOfCatalog: true,
        },
      })
    } else {
      return res.status(200).json({
        success: true,
        message: `User is not part of catalog ${catalogID}`,
        data: {
          partOfCatalog: false,
        },
      })
    }

    //res.status(200).json(res.advancedResults)
  }
)

function filterToUserCatalog(
  catalogs: AllDocuments[],
  userCatalogs: [ObjectID]
) {
  let res: AllDocuments[] = []

  res = catalogs.filter((catalog: CatalogDocument) => {
    return userCatalogs.includes(catalog._id.toString())
  })

  return res
}

export { getAllCatalogs, filterUserCatalogs, userPartOfCatalog }
