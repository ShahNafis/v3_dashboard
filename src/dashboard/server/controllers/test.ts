import { asyncHandler } from '../middlewares/async'
//import { ErrorResponse } from '../utils/errorResponse'
import { Request, Response, NextFunction } from 'express'
// import { AssignedImageModel } from '../models/AssignedImages'
// import {ImageModel} from '../models/Image'
// import {CatalogModel} from '../models/Catalog'
// import {ArchiveModel} from '../models/Archive'
import fs from 'fs'

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
  //console.log('TEST GET')
  res.status(200).json({
    success: true,
    message: `Got ${cards.length} cards`,
    data: {
      cards,
    },
  })
})

const testError = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    fs.readFile('/file-does-not-exist', function (err, data) {
      if (err) {
        next(err) // Pass errors to Express.
      } else {
        res.send(data)
      }
    })
  }
)

const testAssignImage = asyncHandler(async (req: Request, res: Response) => {
  // await AssignedImageModel.create({
  //   imageId: '5f32ea2c694bad78203fd1b9',
  //   userId: '5f2f65cd363ae5001670164b',
  //   date: Date.now(),
  // })
  res.json({ done: true })
})

export { testGet, testError, testAssignImage }
