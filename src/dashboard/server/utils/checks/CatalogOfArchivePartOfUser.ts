import { ArchiveModel } from '../../models/Archive'
import { CatalogModel } from '../../models/Catalog'
import { ObjectID } from 'mongodb'

export async function CatalogOfArchivePartOfUser(
  archiveId: string,
  userCatalogs: [ObjectID]
) {
  try {
    const archive = await ArchiveModel.findById(archiveId)
    if (!archive) {
      return false
    }

    const catalog = await CatalogModel.findById(archive.catalog)
    //check if catalog still exists
    if (!catalog) {
      return false
    }

    return userCatalogs.includes(archive.catalog)
  } catch {
    return false
  }
}
