import { asyncHandler } from '../middlewares/async'
import { UserModel } from '../models/User'
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

const getUser = asyncHandler(async (req: Request, res: Response) => {
  console.log(Object.keys(req.user))

  const id: string = req.user.id
  const user = await UserModel.findOne({ userId: id })

  res.status(200).json({
    success: true,
    message: `hi`,
    data: {
      user,
    },
  })
})
export { createuser, getUser }
