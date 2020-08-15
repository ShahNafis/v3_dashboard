import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request } from 'express'
import { TagModel } from '../models/Tag'
import { ImageModel } from '../models/Image'
import { imageInCatalog } from '../utils/checks/imageInCatalog'
// import { ObjectID } from 'mongodb'
// import mongoose from 'mongoose';

const tagImage = asyncHandler(async (req: Request, res: ExtenedResponse) => {
  const { userId, imageId, tags } = req.body
  console.log('req.body', req.body)

  //check to see if tags is sent
  if (!(Object.keys(tags).length > 0)) {
    return res.status(200).json({
      success: false,
      message: `No tags sent`,
    })
  }

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

  return res.status(200).json({
    success: true,
    message: `Tagged Image ${imageId}`,
    data: {},
  })
})

export { tagImage }
