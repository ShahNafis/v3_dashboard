import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { AdvResultsRes } from '../../interfaces'
import { Request } from 'express'
import { AssignedImageModel } from '../models/AssignedImages'
import { isValidArchive } from '../utils/checks/isValidArchive'
import { CatalogOfArchivePartOfUser } from '../utils/checks/CatalogOfArchivePartOfUser'
const getAllAssignedImages = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    res.status(200).json(res.advancedResults)
  }
)

const getUserAssignedImage = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    const { archiveID } = req.body
    const { user } = req

    //check archive is valid ID
    const validArchive = await isValidArchive(archiveID)
    if (!validArchive) {
      res.status(200).json({
        success: true,
        message: `Invalid archive ID ${archiveID}`,
      })
    }

    //check if catalog of archive is part of user
    const partOfUserCatalogs = await CatalogOfArchivePartOfUser(
      archiveID,
      user.data.catalogs
    )
    if (!partOfUserCatalogs) {
      res.status(200).json({
        success: true,
        message: `User is not allowed to tag Catalog of the Archive with id ${archiveID}`,
      })
    }

    //Check if there is already an assigned image
    const currentlyAssignedImage = await AssignedImageModel.findOne({
      userId: user.data._id,
      archiveId: archiveID,
    })
    console.log(currentlyAssignedImage)
    // if(!currentlyAssignedImage) {
    //   res.status(200).json({
    //     success: true,
    //     message: `No assigned Images`
    //   })
    // }
    res.status(200).json({
      success: true,
      message: 'Got Image',
    })
  }
)
export { getAllAssignedImages, getUserAssignedImage }
