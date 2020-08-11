import express from 'express'
import {
  getAllAssignedImages,
  getUserAssignedImage,
} from '../controllers/assignedImages'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { AssignedImageModel } from '../models/AssignedImages'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { insertUser } from '../middlewares/insertUser'
const router = express.Router()

router.route('/').get(advancedResults(AssignedImageModel), getAllAssignedImages)
router
  .route('/userAssignedImage')
  .post(ensureAuthenticated, insertUser, getUserAssignedImage)

export default router
