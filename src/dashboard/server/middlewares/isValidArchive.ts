import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { isValidArchive } from '../utils/checks/isValidArchive'
import { asyncHandler } from './async'

const isValidArchiveMiddleware = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { archiveId } = req.body

    //check archive is valid ID
    const validArchive = await isValidArchive(archiveId)

    if (!validArchive) {
      return res.status(200).json({
        success: true,
        message: `Invalid archive ID ${archiveId}`,
      })
    }

    next()
  }
)

export { isValidArchiveMiddleware }
