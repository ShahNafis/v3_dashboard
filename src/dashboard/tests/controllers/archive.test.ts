import httpMocks from 'node-mocks-http'
import { connectDB, closeConnection } from '../../server/db'
// eslint-disable-next-line
import * as Types from '../../interfaces'

import dotenv from 'dotenv'

dotenv.config({
  path: './site/.env.test.local',
})
dotenv.config({
  path: './site/.env',
})
import { archiveExists } from '../../server/controllers/archives'

test('Test archiveExists Controller', async () => {
  const req = httpMocks.createRequest()
  req.body = {
    archiveId: '5f336c1de9aea42d24bf0f22',
  }
  const res: Types.TestResponse = httpMocks.createResponse()

  await archiveExists(req, res, () => {
    return
  })

  expect(res.archive.name).toBe('american')
  expect(res.archive.catalog.toString()).toBe('5f336c1de9aea42d24bf0f21')
  expect(res.archive.totalImages).toBe(7)
})

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})
