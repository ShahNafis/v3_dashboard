import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request } from 'express'
import { TagModel } from '../models/Tag'
import { ArchiveModel } from '../models/Archive'
import { CatalogModel } from '../models/Catalog'
import { ImageModel } from '../models/Image'
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
  if (!image) {
    return res.status(200).json({
      success: false,
      message: `Image ${imageId} does not exist`,
    })
  }

  const archive = await ArchiveModel.findById(image.archive)
  if (!archive) {
    return res.status(200).json({
      success: false,
      message: `Archive ${image.archive} of image ${imageId} does not exist`,
    })
  }

  const catalog = await CatalogModel.findById(archive.catalog)
  if (!catalog) {
    return res.status(200).json({
      success: false,
      message: `Catalog ${archive.catalog} of Archive ${image.archive} of image ${imageId} does not exist`,
    })
  }

  if (!req.user.data.catalogs.includes(catalog._id)) {
    return res.status(200).json({
      success: false,
      message: `User is not allowed to tag catalog ${catalog._id}`,
    })
  }

  //check if any matching tags
  //to do

  //create
  const newTag = await TagModel.create({
    date: Date.now(),
    imageId: imageId,
    userId: req.user.data._id,
    tags: tags,
  })

  return res.status(200).json({
    success: true,
    message: `Tagged Image ${imageId}`,
    data: newTag,
  })
})

export { tagImage }
