import { asyncHandler } from '../middlewares/async'
//import { ErrorResponse } from '../utils/errorResponse'
import {
  Request,
  Response,
  //NextFunction
} from 'express'

const cards = [
  { _id: 123, message: 'I love pepperoni pizza!', author: 'unknown1' },
  { _id: 123, message: 'I love pizza!', author: 'unknown2' },
  { _id: 123, message: 'I pepperoni pizza!', author: 'unknown3' },
  { _id: 123, message: 'I love pepperoni ', author: 'unknown4' },
  { _id: 123, message: 'I pepperoni pizza!', author: 'unknown5' },
  { _id: 123, message: 'I', author: 'unknown6' },
  { _id: 456, message: "I'm watching Netflix.", author: 'unknownX2' },
]

const testGet = asyncHandler(async (req: Request, res: Response) => {
  console.log('TEST GET')
  res.status(200).json({
    success: true,
    message: `Got ${cards.length} cards`,
    data: {
      cards,
    },
  })
})

export { testGet }
