import { Request } from 'express'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
// import {CatalogModel} from '../models/Catalog'
// import {UserDocument,CatalogDocument,ArchiveDocument} from '../../interfaces/models'
import { ExtenedResponse } from '../../interfaces'
import { CatalogDocument, AllDocuments } from '../../interfaces/models'
import { ObjectID } from 'mongodb'

const getAllCatalogs = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    res.status(200).json(res.advancedResults)
  }
)

const filterUserCatalogs = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const data = res.advancedResults.data
    const userCatalogs: [ObjectID] = req?.user?.data?.catalogs

    const newData = filterToUserCatalog(data, userCatalogs)

    res.advancedResults.data = newData
    res.status(200).json(res.advancedResults)
  }
)

const isUserPartOfCatalog = asyncHandler(
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

export { getAllCatalogs, filterUserCatalogs, isUserPartOfCatalog }
