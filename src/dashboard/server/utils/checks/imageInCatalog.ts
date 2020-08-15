import { ArchiveModel } from '../../models/Archive'
import { CatalogModel } from '../../models/Catalog'
// import { ImageModel } from '../../models/Image'
import { ImageDocument } from '../../../interfaces/models'

export async function imageInCatalog(image: ImageDocument) {
  const imageId = image._id
  console.log('imageInCatalog')
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
    success: true,
  }
}
