/* eslint-disable no-useless-catch */


import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Trả kq về trong service luôn phải có return
    return newBoard
  } catch (error) {
    throw error
  }
}
export const boardService ={
  createNew
}