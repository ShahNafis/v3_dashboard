import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
//console.log(typeof ArchiveModel, 'controller/archive.ts')

// const getAllArchives = asyncHandler(
//   async (req: Request, res: ExtenedResponse) => {
//     res.status(200).json(res.advancedResults)
//   }
// )

const archiveExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { archiveId } = req.body

    if (!archiveId) {
      return res.status(200).json({
        success: false,
        message: 'No archiveId given',
      })
    }

    const archive = await ArchiveModel.findById(archiveId)

    if (!archive) {
      return res.status(200).json({
        success: false,
        message: `No archive with archiveId: ${archiveId}`,
      })
    }

    res.archive = archive
    next()
  }
)

export { archiveExists }
