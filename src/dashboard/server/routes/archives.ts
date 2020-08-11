import express from 'express'
import { getAllArchives, isArchiveValid } from '../controllers/archives'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ArchiveModel } from '../models/Archive'
import { ensureAuthenticated } from '../middlewares/ensureAuth'

const router = express.Router()

router.route('/').get(advancedResults(ArchiveModel), getAllArchives)
router.route('/validArchive').post(ensureAuthenticated, isArchiveValid)

export default router
