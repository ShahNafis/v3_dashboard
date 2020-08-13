import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request } from 'express'
//console.log(typeof ArchiveModel, 'controller/archive.ts')

const getAllArchives = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    res.status(200).json(res.advancedResults)
  }
)

const isArchiveValid = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const { catalogId, archiveId } = req.body

    //check if archive ID sent
    if (!archiveId) {
      return res.status(200).json({
        success: true,
        message: 'No archiveId sent',
        data: {
          partOfCatalog: false,
        },
      })
    }

    //see if valid archive, and if archive is part of catalog
    const archive = await ArchiveModel.findOne({
      _id: archiveId,
      catalog: catalogId,
    })

    res.status(200).json({
      success: true,
      message: `Checked if archive/catalog ID's are valid`,
      data: !!archive,
    })
  }
)
export { getAllArchives, isArchiveValid }
