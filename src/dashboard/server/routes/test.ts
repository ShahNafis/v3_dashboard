import express from 'express'
import { testGet, testError } from '../controllers/test'
const router = express.Router()

router.route('/').get(testGet)
router.route('/error').get(testError)

export default router
