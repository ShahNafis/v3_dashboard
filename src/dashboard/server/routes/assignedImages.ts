import express from 'express'
import { getAllAssignedImages } from '../controllers/assignedImages'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { AssignedImageModel } from '../models/AssignedImages'

const router = express.Router()

router.route('/').get(advancedResults(AssignedImageModel), getAllAssignedImages)

export default router
