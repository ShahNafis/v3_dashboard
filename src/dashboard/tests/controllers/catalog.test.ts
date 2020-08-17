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

test('Test catalogExists Controller: Valid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f21',
  }
  const res = httpMocks.createResponse()

  //execute
  await catalogExists(req, res, () => {
    return
  })

  //assert
  expect(res.catalog.name).toBe('Tanks')
  expect(res.catalog.totalImages).toBe(27)
  expect(res.catalog.catalogInfo.year).toBe(1916)
  expect(res.catalog.questionSet.toString()).toBe('5f36cee346891c0348c77d24')
  expect(res.catalog.imageServeOrder.toString()).toBe(
    '5f3197417264d3213420c20e'
  )
})

test('Test catalogExists Controller: Nonexistant Catalog', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f20',
  }
  const res = httpMocks.createResponse()

  //execute
  await catalogExists(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'No catalog with catalogId: 5f336c1de9aea42d24bf0f20'
  )
  expect(res.catalog).toBe(undefined)
})

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})
