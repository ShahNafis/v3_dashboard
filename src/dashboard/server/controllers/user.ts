import { asyncHandler } from '../middlewares/async'
//import { UserModel } from '../models/User'
import { Request, Response } from 'express'

const createuser = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.ip)
  res.status(200).json({
    success: true,
    message: `hi`,
    data: {
      ip: req.ip,
    },
  })
})

export { createuser }
