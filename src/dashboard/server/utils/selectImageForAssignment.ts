import { CatalogModel } from '../models/Catalog'
import { ArchiveModel } from '../models/Archive'
import { ImageServeOrderModel } from '../models/ImageServeOrder'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { AssignedImageModel } from '../models/AssignedImages'
import { ImageDocument } from '../../interfaces/models'

interface Params {
  user: Express.User
  archiveId: any
}
interface ReturnType {
  success: boolean
  message: string
  data?: ImageDocument
}

async function selectImageForAssignment({
  user,
  archiveId,
}: Params): Promise<ReturnType> {
  const archive = await ArchiveModel.findById(archiveId)
  const catalog = await CatalogModel.findById(archive.catalog)
  const imageServeOrder = await ImageServeOrderModel.findById(
    catalog.imageServeOrder.toString()
  )

  //Get all images tagged by the user
  const imagesTaggedByUser = await TagModel.find({
    userId: user.data._id,
  })

  const taggedImageIdOnly = imagesTaggedByUser.map((imageTag) =>
    imageTag.imageId.toString()
  )

  if (imageServeOrder.type === 'random') {
    //Get all the images that can be tagged
    const allTaggableImages = await ImageModel.find({
      taggable: true,
      archive: archiveId,
    })
    const taggableImagesIdOnly = allTaggableImages.map((image) =>
      image._id.toString()
    )

    //Filter to only those that have not been tagged by user
    const taggableImages = taggableImagesIdOnly.filter(
      (imageId) => !taggedImageIdOnly.includes(imageId)
    )

    // console.log('All taggable Images', taggableImagesIdOnly)
    // console.log('Tagged images', taggedImageIdOnly)
    // console.log('Filtered Images', taggableImages)

    //if there are taggable images
    if (taggableImages.length > 0) {
      const selectedId =
        taggableImages[Math.floor(Math.random() * taggableImages.length)]
      const selectedImageDocument = await ImageModel.findById(selectedId)

      await AssignedImageModel.create({
        date: Date.now(),
        imageId: selectedId,
        userId: user.data._id,
        archiveId: archiveId,
      })
      return {
        success: true,
        message: `Found image to assign with id = ${selectedImageDocument._id}`,
        data: selectedImageDocument,
      }
    } else {
      return {
        success: false,
        message: `No more images to tag in archive ${archiveId}`,
      }
    }
  }

  return {
    success: false,
    message: 'No Image serve ypue found',
  }
}

export { selectImageForAssignment }
