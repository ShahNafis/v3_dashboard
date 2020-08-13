import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'

const getAllServeOrder = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    res.status(200).json(res.advancedResults)
  }
)
export { getAllServeOrder }
