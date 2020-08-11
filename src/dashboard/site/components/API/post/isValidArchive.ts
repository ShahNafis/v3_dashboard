import { ResponseType } from '../../../../interfaces'
import { routes } from '../../Constants'

interface Params {
  cookie: string
  res: any
  catalogID?: string
  archiveID: string
}

export async function isValidArchive({ cookie, catalogID, archiveID }: Params) {
  const bodyObj: { catalogID?: string; archiveID } = {
    archiveID: archiveID,
  }
  //optionally add catalogID if it is defined
  if (catalogID) {
    bodyObj.catalogID = catalogID
  }

  const resGetData = await fetch(routes.postReq.isArchiveValid, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //These two are needed for server side calls
      credentials: 'include',
      cookie: cookie ?? null,
    },
    body: JSON.stringify({
      ...bodyObj,
    }),
  })

  try {
    const resData: ResponseType = await resGetData.json()
    if (resData.success) {
      return resData
    } else {
      return {
        success: false,
        message: `${resData.message}` ?? 'Error',
      }
    }
  } catch {
    return {
      success: false,
      message: `${resGetData.status} - ${resGetData.statusText}` ?? 'Error',
    }
  }
}
