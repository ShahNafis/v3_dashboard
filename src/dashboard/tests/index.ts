import httpMocks from 'node-mocks-http'
import { testGet } from '../server/controllers/test'
// eslint-disable-next-line
import * as Types from '../interfaces'

async function testMid() {
  const req = httpMocks.createRequest({
    user: { id: 'blablabla' },
  })
  const res = httpMocks.createResponse()

  await testGet(req, res)
  const data = await res._getJSONData()
  console.log(data.data.cards.length)
}

testMid()
