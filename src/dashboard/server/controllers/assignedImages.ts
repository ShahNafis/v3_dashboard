import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request } from 'express'
import { AssignedImageModel } from '../models/AssignedImages'
import { isValidArchive } from '../utils/checks/isValidArchive'
import { CatalogOfArchivePartOfUser } from '../utils/checks/CatalogOfArchivePartOfUser'

import { selectImageForAssignment } from '../utils/selectImageForAssignment'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
// import { AssingedImageDocument } from '../../interfaces/models'
import { CatalogModel } from '../models/Catalog'
import { ArchiveModel } from '../models/Archive'

import { performance } from 'perf_hooks'
// const getAllAssignedImages = asyncHandler(
//   async (req: Request, res: ExtenedResponse) => {
//     res.status(200).json(res.advancedResults)
//   }
// )

const getUserAssignedImage = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
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
export { getUserAssignedImage, insertTaggedCount }
