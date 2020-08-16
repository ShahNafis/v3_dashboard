import httpMocks from 'node-mocks-http'
import { testExpVal } from '../server/controllers/test'
import { getUser } from '../server/controllers/user'
import { connectDB, closeConnection } from '../server/db'
// eslint-disable-next-line
import * as Types from '../interfaces'

import dotenv from 'dotenv'
// Load env vars
//Load this first, if its not defined, the 2nd will override
dotenv.config({
  path: './site/.env.local',
})
dotenv.config({
  path: './site/.env',
})

test('Test clickDown(0)', () => {
  expect(1).toBe(1)
})

test('Test Middleware #1', async () => {
  const req = httpMocks.createRequest({
    user: { id: 'blablabla' },
  })
  const res = httpMocks.createResponse()

  await testExpVal(req, res)
  const data = await res._getJSONData()
  expect(data.success).toBe(true)
})

test('Test Middleware #2', async () => {
  await connectDB()

  const req = httpMocks.createRequest({
    user: { id: 'google-oauth2|116302372331153157667' },
  })
  const res = httpMocks.createResponse()

  await getUser(req, res)
  const data: Types.ResponseType = await res._getJSONData()

  expect(data.success).toBe(true)
  // console.log(res.statusCode)
  // console.log(res.statusMessage)
  expect(res.statusCode).toBe(200)
  closeConnection()
})

export {}
