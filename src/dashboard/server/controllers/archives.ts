import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { AdvResultsRes } from '../../interfaces'
import { Request } from 'express'
//console.log(typeof ArchiveModel, 'controller/archive.ts')

const getAllArchives = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
    res.status(200).json(res.advancedResults)
  }
)

const isArchiveValid = asyncHandler(
  async (req: Request, res: AdvResultsRes) => {
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

    const results = {
      archiveValid: undefined,
    }

    //see if valid archive, and if archive is part of catalog
    const archive = await ArchiveModel.findOne({
      _id: archiveId,
      catalog: catalogId,
    })
    results.archiveValid = !!archive

    res.status(200).json({
      success: true,
      message: `Checked if archive/catalog ID's are valid`,
      data: results,
    })
  }
)
export { getAllArchives, isArchiveValid }
