import { Request, NextFunction } from 'express'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { CatalogModel } from '../models/Catalog'
import { QuestionSetModel } from '../models/QuestionSet'

//✔️
const catalogExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { catalogId } = req.body

    const catalog = await CatalogModel.findById(catalogId)
    console.log('catalog', !catalog)
    if (!catalog) {
      return res.status(200).json({
        success: false,
        message: `No catalog with catalogId: ${catalogId}`,
      })
    }

    res.catalog = catalog
    next()
  }
)

const getCatalogQuestionSet = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { questionSet: questionSetId, _id } = res.catalog

    const questionSet = await QuestionSetModel.findById(questionSetId)

    if (!questionSet) {
      return res.status(200).json({
        success: false,
        message: `No question set with Id = ${questionSetId} found for catalog ${_id}`,
      })
    }

    res.questionSet = questionSet
    next()
  }
)

export { catalogExists, getCatalogQuestionSet }
