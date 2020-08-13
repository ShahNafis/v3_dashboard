import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { AdvResultsRes } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { AssignedImageModel } from '../models/AssignedImages'
import { isValidArchive } from '../utils/checks/isValidArchive'
import { CatalogOfArchivePartOfUser } from '../utils/checks/CatalogOfArchivePartOfUser'

import { selectImageForAssignment } from '../utils/selectImageForAssignment'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { AssingedImageDocument } from '../../interfaces/models'

const getAllAssignedImages = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    res.status(200).json(res.advancedResults)
  }
)

const getUserAssignedImage = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    const { archiveId } = req.body
    const { user } = req

    //check archive is valid ID
    const validArchive = await isValidArchive(archiveId)

    if (!validArchive) {
      return res.status(200).json({
        success: true,
        message: `Invalid archive ID ${archiveId}`,
      })
    }

    //check if catalog of archive is part of user
    const partOfUserCatalogs = await CatalogOfArchivePartOfUser(
      archiveId,
      user.data.catalogs
    )

    if (!partOfUserCatalogs) {
      return res.status(200).json({
        success: true,
        message: `User is not allowed to tag Catalog of the Archive with id ${archiveId}`,
      })
    }

    //Check if there is already an assigned image
    const currentlyAssignedImage = await AssignedImageModel.findOne({
      userId: user.data._id,
      archiveId: archiveId,
    })

    console.log(currentlyAssignedImage ? 'Found assigned' : 'Need to assign')
    //If there is a image assigned
    if (currentlyAssignedImage) {
      const image = await ImageModel.findById(currentlyAssignedImage.imageId)
      return res.status(200).json({
        success: true,
        message: 'Got Image',
        data: image,
      })
    }

    //If not
    const selectedImage = await selectImageForAssignment({
      user: user,
      archiveId: archiveId,
    })

    console.log('selectedImage', selectedImage)
    res.status(200).json({
      success: true,
      message: 'Got Image',
      data: selectedImage,
    })
  }
)

const insertUserIdQuery = asyncHandler(
  async (req: Request, res: AdvResultsRes, next: NextFunction) => {
    req.query = {
      userId: req.user.data._id,
    }
    next()
  }
)

const insertTaggedCount = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    const { data }: { data: any[] } = res.advancedResults

    const newData = []
    // let memeTest = [
    //   ...data,...data,...data,...data,
    //   ...data,...data,...data,...data,
    //   ...data,...data,...data,...data,
    //   ...data,...data,...data,...data,
    //   ...data,...data,...data,...data,
    //   ...data,...data,...data,...data,
    // ]

    for (const item of data) {
      const doc = item as AssingedImageDocument

      const tagCount =
        (
          await TagModel.find({
            userId: req.user.data._id,
            archiveId: doc.archiveId,
          })
        ).length ?? 0

      newData.push({
        archiveId: doc.archiveId,
        catalogId: doc.catalogId,
        tagCount: tagCount,
        archive: {
          name: doc.archive.name,
          totalImages: doc.archive.totalImages,
        },
        catalog: {
          name: doc.catalog.name,
          totalImages: doc.catalog.totalImages,
        },
      })
    }

    res.status(200).json({
      success: true,
      message: 'Got table data',
      data: newData,
    })
  }
)
export {
  getAllAssignedImages,
  getUserAssignedImage,
  insertUserIdQuery,
  insertTaggedCount,
}