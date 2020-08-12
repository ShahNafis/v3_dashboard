import { CatalogModel } from '../models/Catalog'
import { ArchiveModel } from '../models/Archive'
import { ImageServeOrderModel } from '../models/ImageServeOrder'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { AssignedImageModel } from '../models/AssignedImages'

interface Params {
  user: Express.User
  archiveId: any
}

async function selectImageForAssignment({ user, archiveId }: Params) {
  const archive = await ArchiveModel.findById(archiveId)
  const catalog = await CatalogModel.findById(archive.catalog)
  const imageServeOrder = await ImageServeOrderModel.findById(
    catalog.imageServeOrder
  )

  //Get all images tagged by the user
  const imagesTaggedByUser = await TagModel.find({
    userId: user.data._id,
  })
  const taggedImageIdOnly = imagesTaggedByUser.map((image) => image._id)

  if (imageServeOrder.type === 'random') {
    //Get all the images that can be tagged
    const allTaggableImages = await ImageModel.find({
      taggable: true,
      archive: archiveId,
    })
    const taggableImagesIdOnly = allTaggableImages.map((image) => image._id)

    //Filter to only those that have not been tagged by user
    const taggableImages = taggableImagesIdOnly.filter(
      (imageId) => !taggedImageIdOnly.includes(imageId)
    )
    // console.log('Tagged images', taggedImageIdOnly)
    // console.log('All taggable Images', taggableImagesIdOnly)
    // console.log('Filtered Images', taggableImages)

    const selectedId =
      taggableImages[Math.floor(Math.random() * taggableImages.length)]
    const selectedImageDocument = ImageModel.findById(selectedId)

    await AssignedImageModel.create({
      date: Date.now(),
      imageId: selectedId,
      userId: user.data._id,
      archiveId: archiveId,
    })
    return selectedImageDocument
  }

  return {}
}

export { selectImageForAssignment }
