import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { AssignedImageModel } from '../models/AssignedImages'
import { selectImageForAssignment } from '../utils/selectImageForAssignment'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { CatalogModel } from '../models/Catalog'
import { ArchiveModel } from '../models/Archive'
import { performance } from 'perf_hooks'

const getCurrentlyAssignedImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { archiveId } = req.body
    const { user } = req

    //Check if there is already an assigned image
    const currentlyAssignedImage = await AssignedImageModel.findOne({
      userId: user.data._id,
      archiveId: archiveId,
    })

    //If there is a image assigned
    if (currentlyAssignedImage) {
      const image = await ImageModel.findById(currentlyAssignedImage.imageId)
      return res.status(200).json({
        success: true,
        message: 'Got Image',
        data: {
          assignedImage: image,
        },
      })
    }

    next()
  }
)

const assignImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    //console.log('Assigning New Image')
    const { archiveId } = req.body
    const { user } = req

    const selectedImage = await selectImageForAssignment({
      user: user,
      archiveId: archiveId,
    })
    console.log('selectedImage', selectedImage.data.name)
    if (selectedImage.success) {
      res.assignedImage = selectedImage.data
      next()
    } else {
      res.status(400).json({
        success: false,
        message: selectedImage.message,
      })
    }
  }
)

const unassignImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    console.log('unassigning an Image')
    const { imageId } = req.body
    const { user } = req

    console.log(
      'remove image with image = ',
      imageId,
      ' user = ',
      user.data._id
    )

    const currentAssignedImage = await AssignedImageModel.findOne({
      imageId: imageId,
      userId: user.data._id,
    })

    if (currentAssignedImage) {
      await currentAssignedImage.remove()
      return next()
    }

    res.status(500).json({
      success: false,
      message: `Error in unassigning image ${imageId}`,
    })
  }
)

//not unit tested
const insertTaggedCount = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const t1 = performance.now()

    const AssignedGroupByCatalog = await AssignedImageModel.aggregate([
      {
        $match: {
          userId: req.user.data._id,
        },
      },
      {
        $group: {
          _id: '$catalogId',
          numArchivesAssigned: { $sum: 1 },
          doc: { $push: '$$ROOT' },
        },
      },
    ])

    const testObj = []

    for (const catalog of AssignedGroupByCatalog) {
      const testRes: any = {}
      const doc = await CatalogModel.findById(catalog._id)

      testRes.catalogInfo = doc.catalogInfo
      testRes.totalImages = doc.totalImages
      ;(testRes.name = doc.name), (testRes.catalogId = doc._id)

      testRes.tagged =
        (
          await TagModel.aggregate([
            {
              $match: {
                userId: req.user.data._id,
                catalogId: doc._id,
              },
            },
            {
              $group: {
                _id: '$catalogId',
                numTagsInCatalog: { $sum: 1 },
                doc: { $push: '$$ROOT' },
              },
            },
          ])
        )[0]?.numTagsInCatalog ?? 0
      testRes.archives = []

      for (const archive of catalog.doc) {
        const archiveData: any = {
          _id: archive.archiveId,
        }

        archiveData.tagged = (
          await TagModel.find({
            userId: req.user.data._id,
            archiveId: archive.archiveId,
          })
        ).length

        const archiveDoc = await ArchiveModel.findById(archive.archiveId)
        archiveData.name = archiveDoc?.name
        archiveData.totalImages = archiveDoc?.totalImages

        testRes.archives.push(archiveData)
      }

      //console.log(testRes)
      testObj.push(testRes)
    }

    res.status(200).json({
      success: true,
      message: 'Got table data',
      data: testObj,
    })
    const t2 = performance.now()
    console.log(`Server: Time ${t2 - t1} ms`)
  }
)

export {
  getCurrentlyAssignedImage,
  insertTaggedCount,
  assignImage,
  unassignImage,
}
