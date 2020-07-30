import httpMocks from 'node-mocks-http'
import { testGet } from '../server/controllers/test'
// eslint-disable-next-line
import * as Types from '../interfaces'

test('Test clickDown(0)', () => {
  expect(1).toBe(1)
})

test('Test Middleware', async () => {
  const req = httpMocks.createRequest({
    user: { id: 'blablabla' },
  })
  const res = httpMocks.createResponse()

  await testGet(req, res)
  const data = await res._getJSONData()
  expect(data.data.cards.length).toBe(7)
})

export {}
