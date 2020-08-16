import { asyncHandler } from './async'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const bodyValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessages = []
      errors.array().forEach((error) => {
        errorMessages.push(`${error.param}:${error.msg}`)
      })
      return res.status(422).json({
        success: false,
        message: errorMessages.join(' - '),
        data: errors,
      })
    }

    next()
  }
)

export { bodyValidation }
