import express from 'express'
import { getAllArchives } from '../controllers/archives'
//Perform advanced results which means filtering, pagination, and query parameters
import {advancedResults} from '../middlewares/advancedResults'
import {ArchiveModel} from '../models/Archive'

// "/api/v1/archives/"
const router = express.Router();

router
    .route('/')
    .get(advancedResults(ArchiveModel),getAllArchives)

export default router