import { ArchiveModel } from '../../models/Archive'
import { CatalogModel } from '../../models/Catalog'
// import { ImageModel } from '../../models/Image'
import { ImageDocument } from '../../../interfaces/models'
import { ObjectID } from 'mongodb'

//✔️
export async function imageInCatalog(
  image: ImageDocument,
  userCatalogs: ObjectID[] | string[]
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

  if (userCatalogs.includes(catalog._id.toString())) {
    return {
      success: true,
      message: `Image ${image._id} exists in a catalog user can tag`,
    }
  } else {
    return {
      success: false,
      message: `Image ${image._id} does not exists in a catalog user can tag`,
    }
  }
}
