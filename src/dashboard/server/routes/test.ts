import express from 'express'
import { testExpVal } from '../controllers/test'
import { check } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'
const router = express.Router()

router
  .route('/testBodyValidation')
  .post(
    [
      check('archiveId').isString(),
      check('userId').isString(),
      check('count').isNumeric(),
      check('a.b').isNumeric(),
    ],
    bodyValidation,
    testExpVal
  )

export default router
