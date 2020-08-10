import express from 'express'
import { getAllTags } from '../controllers/tags'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { TagModel } from '../models/Tag'

const router = express.Router()

router.route('/').get(advancedResults(TagModel), getAllTags)

export default router
