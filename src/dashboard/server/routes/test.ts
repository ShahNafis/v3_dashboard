import express from 'express'
import { testGet, testError, testAssignImage } from '../controllers/test'
const router = express.Router()

router.route('/').get(testGet)
router.route('/error').get(testError)
router.route('/testAssignImage').get(testAssignImage)

export default router
