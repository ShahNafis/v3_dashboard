import express from 'express'
import { getAllImages } from '../controllers/image'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ImageModel } from '../models/Image'

const router = express.Router()

router.route('/').get(advancedResults(ImageModel), getAllImages)

export default router
