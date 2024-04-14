
import express from 'express'


import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
const Router = express.Router()
Router.route('/register')
  .post(userValidation.createNew, userController.createNew)
Router.route('/login')
  .post(userValidation.loginUser, userController.loginUser)
export const userRoute = Router