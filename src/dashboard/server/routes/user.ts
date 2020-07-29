import express from 'express'
import { createuser, getUser } from '../controllers/user'
import { ensureAuthenticated } from '../middlewares/ensureAuth'

const router = express.Router()

router.route('/createUser').get(createuser)
router.route('/getUser').post(ensureAuthenticated, getUser)

export default router
