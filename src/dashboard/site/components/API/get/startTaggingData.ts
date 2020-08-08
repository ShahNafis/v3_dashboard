import {ResponseType} from '../../../../interfaces'
import { routes } from '../../Constants'

interface Params {
  cookie: string
  res: any
}

export async function getStartTaggingTableData({ cookie }: Params) {
    const resGetData = await fetch(routes.postReq.getResumeTableData, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //These two are needed for server side calls
          credentials: 'include',
          cookie: cookie ?? null,
        },
    })
    
    const resData: ResponseType = await resGetData.json()

    if (resData.success) {
        return resData.data
    }

    return [] 
}