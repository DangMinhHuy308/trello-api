/* eslint-disable no-useless-catch */


import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { userModel } from '~/models/userModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody
    }
    const createdUser = await userModel.createNew(newUser)
    console.log(createdUser)
    const getNewUser = await userModel.findOneById(createdUser.insertedId)

    // Trả kq về trong service luôn phải có return
    return getNewUser
  } catch (error) {
    throw error
  }
}
const loginUser = async (reqBody) => {
  try {
    const { username, password } = reqBody;
    console.log('Đang thực hiện đăng nhập với người dùng:', username);
    // Kiểm tra sự tồn tại của người dùng
    const user = await userModel.findOne(username);
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Người dùng không tồn tại');
    }
    // So sánh mật khẩu
    if (user.password !== password) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Mật khẩu không chính xác');
    }
    console.log('Đăng nhập thành công với người dùng:', username);
    // Nếu thông tin đăng nhập hợp lệ, bạn có thể tạo JWT token, quản lý phiên đăng nhập, vv.
    return user;
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error.message);
    throw error;
  }
}


export const userService ={
  createNew,
  loginUser
}