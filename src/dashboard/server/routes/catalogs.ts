import express from 'express'

import { getAllCatalogs, filterUserCatalogs } from '../controllers/catalogs'

//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { CatalogModel } from '../models/Catalog'
import { insertUser } from '../middlewares/insertUser'

const router = express.Router()

router
  .route('/')
  .get(
    ensureAuthenticated,
    advancedResults(CatalogModel, 'archives'),
    getAllCatalogs
  )

router
  .route('/userCatalogs')
  .get(
    ensureAuthenticated,
    insertUser,
    advancedResults(CatalogModel, 'archives'),
    filterUserCatalogs
  )

export default router
