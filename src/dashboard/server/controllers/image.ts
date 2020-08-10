import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { AdvResultsRes } from '../../interfaces'

const getAllImages = asyncHandler(async (req: Request, res: AdvResultsRes) => {
  res.status(200).json(res.advancedResults)
})
export { getAllImages }
