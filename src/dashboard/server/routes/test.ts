import express from 'express'
import { testGet } from '../controllers/test'
const router = express.Router()

router.route('/').get(testGet)

export default router
