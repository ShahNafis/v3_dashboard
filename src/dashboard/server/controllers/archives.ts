import {ArchiveModel} from '../models/Archive'
import {asyncHandler} from '../middlewares/async' //to avoid putting try catch everywhere
import {AdvResultsRes} from '../../interfaces'
console.log(typeof(ArchiveModel),'controller/archive.ts')

const getAllArchives = asyncHandler(async (req: Request, res: AdvResultsRes) => {
    res.status(200).json(res.advancedResults)
})
export {getAllArchives}