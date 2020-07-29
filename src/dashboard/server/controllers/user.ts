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
  const id: string = req.user.id
  const user = await UserModel.findOne({ userId: id })

  if (user) {
    res.status(200).json({
      success: true,
      message: `User found`,
      data: {
        user,
      },
    })
  } else {
    res.status(200).json({
      success: false,
      message: `User not found`,
    })
  }
})
export { createuser, getUser }
