import httpMocks from 'node-mocks-http'
import { testExpVal } from '../server/controllers/test'
// eslint-disable-next-line
import * as Types from '../interfaces'

async function testMid() {
  const req = httpMocks.createRequest({
    user: { id: 'blablabla' },
  })
  const res = httpMocks.createResponse()

  await testExpVal(req, res)
  const data = await res._getJSONData()
  console.log(data.success)
}

testMid()
