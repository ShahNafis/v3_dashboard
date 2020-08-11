import express from 'express'

import {
  getAllCatalogs,
  filterUserCatalogs,
  userPartOfCatalog,
} from '../controllers/catalogs'

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

router
  .route('/userPartOfCatalog')
  .post(
    ensureAuthenticated,
    insertUser,
    advancedResults(CatalogModel, 'archives'),
    userPartOfCatalog
  )

export default router
