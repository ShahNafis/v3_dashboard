import express from 'express'
import {
  getCurrentlyAssignedImage,
  insertTaggedCount,
  assignImage,
} from '../controllers/assignedImages'
import { advancedResults } from '../middlewares/advancedResults'
import { AssignedImageModel } from '../models/AssignedImages'
import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { insertUser } from '../middlewares/insertUser'
import { genericReturn } from '../middlewares/genericReturn'
import { isValidArchiveMiddleware } from '../middlewares/isValidArchive'
import { membershipCatalogMiddleware } from '../middlewares/membership/catalog'
import { check } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'

const router = express.Router()

router.route('/').post(
  advancedResults(AssignedImageModel, ['archive', 'catalog']),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)
router.route('/getImage').post(
  ensureAuthenticated,
  insertUser,
  ...bodyValidation([check('archiveId').isString()]),
  isValidArchiveMiddleware,
  membershipCatalogMiddleware,
  getCurrentlyAssignedImage,
  assignImage,
  genericReturn({
    keys: ['assignedImage'],
    message: 'Assigned Image',
    success: true,
  })
)
router
  .route('/getAllCurrent')
  .post(ensureAuthenticated, insertUser, insertTaggedCount)

export default router
