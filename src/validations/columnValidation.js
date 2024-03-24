
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title:Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate dữ liệu hợp lệ thì cho request đi tiếp sang controller
    next()

  } catch (error) {
    // const errorMessage = error.message
    const errorMessage = new Error(error.message)
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)

  }

}
export const columnValidation = {
  createNew
}