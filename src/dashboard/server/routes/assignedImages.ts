import express from 'express'
import {
  getAllAssignedImages,
  getUserAssignedImage,
  // insertUserIdQuery,
  insertTaggedCount,
} from '../controllers/assignedImages'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { AssignedImageModel } from '../models/AssignedImages'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { insertUser } from '../middlewares/insertUser'
const router = express.Router()

router
  .route('/')
  .post(
    advancedResults(AssignedImageModel, ['archive', 'catalog']),
    getAllAssignedImages
  )
router
  .route('/getImage')
  .post(ensureAuthenticated, insertUser, getUserAssignedImage)

router.route('/getAllCurrent').post(
  ensureAuthenticated,
  insertUser,
  // insertUserIdQuery,
  // advancedResults(AssignedImageModel, ['archive', 'catalog']),
  insertTaggedCount
)

export default router
