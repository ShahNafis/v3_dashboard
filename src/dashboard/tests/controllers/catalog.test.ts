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
import { catalogExists } from '../../server/controllers/catalogs'

test('Test catalogExists Controller', async () => {
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f21',
  }
  const res: Types.TestResponse = httpMocks.createResponse()

  await catalogExists(req, res, () => {
    return
  })

  expect(res.catalog.name).toBe('Tanks')
  expect(res.catalog.totalImages).toBe(27)
  expect(res.catalog.catalogInfo.year).toBe(1916)
  expect(res.catalog.questionSet.toString()).toBe('5f36cee346891c0348c77d24')
  expect(res.catalog.imageServeOrder.toString()).toBe(
    '5f3197417264d3213420c20e'
  )
})

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})
