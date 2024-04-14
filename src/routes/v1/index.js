/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import {StatusCodes} from'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'
import { userRoute } from '~/routes/v1/userRoute'
const Router = express.Router()
// check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message:'APIs V1 are ready to use.'})
})
// board Api
Router.use('/boards', boardRoute)
// column API
Router.use('/columns', columnRoute)
// card API
Router.use('/cards', cardRoute)
// user API
Router.use('/users', userRoute)


export const APIs_V1 = Router