import express from 'express'
import { createuser } from '../controllers/user'
const router = express.Router()

router.route('/createUser').get(createuser)

export default router
