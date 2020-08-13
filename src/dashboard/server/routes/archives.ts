import express from 'express'
import { getAllArchives, archiveExists } from '../controllers/archives'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ArchiveModel } from '../models/Archive'
// import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { genericReturn } from '../middlewares/genericReturn'

const router = express.Router()

router.route('/').post(advancedResults(ArchiveModel), getAllArchives)
router.route('/exists').post(
  archiveExists,
  genericReturn({
    keys: ['archive'],
    message: 'Archive is valid',
    success: true,
  })
)

export default router
