import { asyncHandler } from '../middlewares/async'
import { UserModel } from '../models/User'
import { Request, Response } from 'express'

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const id: string = req.user.id
  let user = undefined
  user = await UserModel.findOne({ userId: id ?? '' })
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

export { getUser }
