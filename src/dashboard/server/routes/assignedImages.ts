import express from 'express'
import {
  getUserAssignedImage,
  // insertUserIdQuery,
  insertTaggedCount,
} from '../controllers/assignedImages'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { AssignedImageModel } from '../models/AssignedImages'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { insertUser } from '../middlewares/insertUser'
import { genericReturn } from '../middlewares/genericReturn'

const router = express.Router()

router.route('/').post(
  advancedResults(AssignedImageModel, ['archive', 'catalog']),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)
router
  .route('/getImage')
  .post(ensureAuthenticated, insertUser, getUserAssignedImage)

router
  .route('/getAllCurrent')
  .post(ensureAuthenticated, insertUser, insertTaggedCount)

export default router
