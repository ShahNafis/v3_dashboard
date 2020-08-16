// import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { isValidArchive } from '../utils/checks/isValidArchive'

const archiveExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { archiveId } = req.body

    //check archive is valid ID
    const validArchive = await isValidArchive(archiveId)
    if (!validArchive.success) {
      return res.status(200).json({
        success: true,
        message: `Invalid archive ID ${archiveId}`,
      })
    }

    res.archive = validArchive.data
    next()
  }
)

export { archiveExists }
