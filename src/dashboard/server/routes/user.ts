import express from 'express'
import { createuser, getUser } from '../controllers/user'
const router = express.Router()

router.route('/createUser').get(createuser)
router.route('/getUser').post(getUser)

export default router
