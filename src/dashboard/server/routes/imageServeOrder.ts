import express from 'express'
import { getAllServeOrder } from '../controllers/imageServeOrder'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ImageServeOrderModel } from '../models/ImageServeOrder'

const router = express.Router()

router.route('/').get(advancedResults(ImageServeOrderModel), getAllServeOrder)

export default router
