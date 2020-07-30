import { ServerResponse } from 'http'
import { ResponseType } from '../../../interfaces/index'
interface Params {
  cookie: string
  res: ServerResponse
}
import { routes } from '../Constants'

async function getUserDB({ cookie, res }: Params) {
  const resGetUser = await fetch(routes.postReq.getUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //These two are needed for server side calls
      credentials: 'include',
      cookie: cookie ?? null,
    },
  })
  const data: ResponseType = await resGetUser.json()

  if (data.success) {
    return data.data.user
  } else {
    //for some reason redirect doesnt exist.

    ;(res as any).redirect('/')
    return {}
  }
}

export { getUserDB }
