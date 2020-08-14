import express from 'express'
import { archiveExists } from '../controllers/archives'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ArchiveModel } from '../models/Archive'
// import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { genericReturn } from '../middlewares/genericReturn'

const router = express.Router()

router.route('/').post(
  advancedResults(ArchiveModel),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

router.route('/exists').post(
  archiveExists,
  genericReturn({
    keys: ['archive'],
    message: 'Archive is valid',
    success: true,
  })
)

export default router
