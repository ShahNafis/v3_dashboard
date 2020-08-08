import { Request} from "express"
import {asyncHandler} from '../middlewares/async' //to avoid putting try catch everywhere
// import {CatalogModel} from '../models/Catalog'
// import {UserDocument,CatalogDocument,ArchiveDocument} from '../../interfaces/models'
import {AdvResultsRes} from '../../interfaces'
import {CatalogDocument} from '../../interfaces/models'
import { ObjectID } from "mongodb"


const getAllCatalogs = asyncHandler(async (req: Request, res: AdvResultsRes) => {
    res.status(200).json(res.advancedResults)
})

const filterUserCatalogs = asyncHandler(async (req: Request, res: AdvResultsRes) => {
    const data = res.advancedResults.data
    const userCatalogs: [ObjectID] = req?.user?.data?.catalogs

    //console.log(req?.user?.data.catalogs)
    const newData = data.filter((catalog: CatalogDocument)=>{
        // console.log(catalog._id.toString())
        return userCatalogs.includes(catalog._id.toString())
    })

    res.advancedResults.data = newData
    res.status(200).json(res.advancedResults)
})


export {
    getAllCatalogs,
    filterUserCatalogs
}