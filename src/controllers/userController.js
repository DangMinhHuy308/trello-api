
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { userService } from '~/services/userService'
const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    const createdUser = await userService.createNew(req.body)

    // Có kq trả về phía client
    res.status(StatusCodes.CREATED).json(createdUser)

  } catch (error) {
    next(error)

  }
}
const loginUser = async (req, res, next) => {
  try {
    const user = await userService.login(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
}
export const userController = {
  createNew,
  loginUser
  // getListBoard
}