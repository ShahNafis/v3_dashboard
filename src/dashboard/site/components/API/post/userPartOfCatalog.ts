import { ResponseType } from '../../../../interfaces'
import { routes } from '../../Constants'

interface Params {
  cookie: string
  res: any
  catalogID: string
}

export async function isUserPartOfcatalog({ cookie, catalogID }: Params) {
  const resGetData = await fetch(routes.postReq.isUserPartOfCatalog, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //These two are needed for server side calls
      credentials: 'include',
      cookie: cookie ?? null,
    },
    body: JSON.stringify({
      catalogID: catalogID,
    }),
  })

  const resData: ResponseType = await resGetData.json()

  if (resData.success) {
    return resData
  }

  return {
    success: false,
    message: resData.message ?? 'Error',
  }
}
