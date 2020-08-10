import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { AdvResultsRes } from '../../interfaces'

const getAllTags = asyncHandler(async (req: Request, res: AdvResultsRes) => {
  res.status(200).json(res.advancedResults)
})
export { getAllTags }
