/* eslint-disable no-console */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { CorsOptions } from '~/config/cors'
const START_SERVER = () => {
  const app = express()
  // xử cors
  app.use(cors(CorsOptions))
  // Enable req.body json data
  app.use(express.json())
  // Use APIs V1
  app.use('/v1', APIs_V1)
  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)
  // Môi trường Production
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at Port:${process.env.PORT}/`)
    })
  } else {
    // Môi trường local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }
  exitHook(() => {
    CLOSE_DB()
  })
}
CONNECT_DB()
  .then(() => console.log('Connected successfully'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error()
    process.exit(0)
  })