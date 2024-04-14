
import express from 'express'

import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
const Router = express.Router()
Router.route('/')
  .post(cardValidation.createNew,cardController.createNew)
Router.route('/:id')
  .put(cardValidation.update, cardController.update)
export const cardRoute = Router
