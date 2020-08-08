import express from 'express'
import { getUser } from '../controllers/user'

import { ensureAuthenticated } from '../middlewares/ensureAuth'

const router = express.Router()

router.route('/getUser').post(ensureAuthenticated, getUser)

export default router
