import express from 'express'

import { userCatalogMembership, catalogExists } from '../controllers/catalogs'

//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { CatalogModel } from '../models/Catalog'
import { insertUser } from '../middlewares/insertUser'
import { membershipCatalogMiddleware } from '../middlewares/membership/catalog'

import { filterUserCatalogsMiddleware } from '../middlewares/filter/catalog/filterUserCatalogs'
import { genericReturn } from '../middlewares/genericReturn'

const router = express.Router()

router.route('/').post(
  advancedResults(CatalogModel, ['archives']),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

router.route('/userCatalogs').post(
  ensureAuthenticated,
  insertUser,
  advancedResults(CatalogModel, ['archives']),
  filterUserCatalogsMiddleware,
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

router
  .route('/catalogMembership')
  .post(
    ensureAuthenticated,
    insertUser,
    catalogExists,
    membershipCatalogMiddleware,
    userCatalogMembership
  )

router.route('/exists').post(
  catalogExists,
  genericReturn({
    keys: ['catalog'],
    success: true,
    message: 'Catalog is valid',
  })
)

export default router
