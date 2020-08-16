import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { TagModel } from '../models/Tag'
import { ImageModel } from '../models/Image'
import { imageInCatalog } from '../utils/checks/imageInCatalog'

const tagImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { userId, imageId, tags } = req.body

    //check if user has already tagged this image
    const previousTag = await TagModel.find({
      userId: userId,
      imageId: imageId,
    })
    if (previousTag.length > 0) {
      return res.status(200).json({
        success: false,
        message: `User ${userId} has already tagged image ${imageId}`,
      })
    }

    //check if the catalog of the archive of the image belongs to user
    const image = await ImageModel.findById(imageId)
    const imageInCatalogRes = await imageInCatalog(image)

    if (!imageInCatalogRes.success) {
      return res.status(200).json({
        success: false,
        message: imageInCatalogRes.message,
      })
    }

    //check if any matching tags: DO BEFORE ADDING TAG
    const compareResult = await image.compareTags(tags, ['Additional Comments'])
    const finalizable = compareResult.numMatch === compareResult.numberOfMatches

    //create
    const newTag = await TagModel.create({
      date: Date.now(),
      imageId: imageId,
      userId: req.user.data._id,
      tags: tags,
      final: finalizable,
    })

    //If finalized, update imageDoc to have this new tag
    if (finalizable) {
      await ImageModel.updateOne({ _id: imageId }, { finalTag: newTag._id })
      console.log('Updated final tag for image', imageId)
    }

    next()
  }
)

export { tagImage }
