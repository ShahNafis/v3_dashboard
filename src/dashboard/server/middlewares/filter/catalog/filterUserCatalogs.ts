import { CatalogDocument, AllDocuments } from '../../../../interfaces/models'
import { ExtenedResponse } from '../../../../interfaces'
import { Request } from 'express'
import { ObjectID } from 'mongodb'
import { asyncHandler } from '../../async'

const filterUserCatalogsMiddleware = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const userCatalogs: [ObjectID] = req?.user?.data?.catalogs

    res.advancedResults.data = filterToUserCatalog(
      res.advancedResults.data,
      userCatalogs
    )
    res.status(200).json(res.advancedResults)
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

export { filterUserCatalogsMiddleware, filterToUserCatalog }
