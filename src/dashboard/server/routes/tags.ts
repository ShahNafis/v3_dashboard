import express from 'express'
import { genericReturn } from '../middlewares/genericReturn'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { TagModel } from '../models/Tag'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { insertUser } from '../middlewares/insertUser'
import { tagImage } from '../controllers/tags'
import { unassignImage } from '../controllers/assignedImages'

const router = express.Router()

router.route('/').post(
  advancedResults(TagModel),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

router.route('/tagImage').post(
  ensureAuthenticated,
  insertUser,
  tagImage,
  unassignImage,
  genericReturn({
    keys: [],
    message: 'Tagged Image',
    success: true,
  })
)
router.route('/skipImage').post(ensureAuthenticated, insertUser, tagImage)

export default router
