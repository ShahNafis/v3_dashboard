import { ArchiveModel } from '../../models/Archive'
import { CatalogModel } from '../../models/Catalog'
// import { ImageModel } from '../../models/Image'
import { ImageDocument } from '../../../interfaces/models'
import { ObjectID } from 'mongodb'

export async function imageInCatalog(
  image: ImageDocument,
  userCatalogs: ObjectID[]
) {
  const imageId = image._id

  if (!image) {
    return {
      success: false,
      message: `Image ${imageId} does not exist`,
    }
  }

  const archive = await ArchiveModel.findById(image.archive)
  if (!archive) {
    return {
      success: false,
      message: `Archive ${image.archive} of image ${imageId} does not exist`,
    }
  }

  const catalog = await CatalogModel.findById(archive.catalog)
  if (!catalog) {
    return {
      success: false,
      message: `Catalog ${archive.catalog} of Archive ${image.archive} of image ${imageId} does not exist`,
    }
  }

  return {
    success: userCatalogs.includes(catalog._id.toString()),
  }
}
