import { Request, NextFunction } from 'express'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { CatalogModel } from '../models/Catalog'
import { QuestionSetModel } from '../models/QuestionSet'

const userCatalogMembership = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const { catalogId } = req.body
    res.status(200).json({
      success: true,
      message: `User has membership to catalog ${catalogId}`,
      data: {
        membershipCatalog: true,
      },
    })
  }
)

const catalogExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { catalogId } = req.body

    if (!catalogId) {
      return res.status(200).json({
        success: false,
        message: 'No catalogId given',
      })
    }

    const catalog = await CatalogModel.findById(catalogId)

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

export { userCatalogMembership, catalogExists, getCatalogQuestionSet }
