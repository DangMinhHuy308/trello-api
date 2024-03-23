/* eslint-disable no-useless-catch */


import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Trả kq về trong service luôn phải có return
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  try {

    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')

    }

    // Trả kq về trong service luôn phải có return
    return board
  } catch (error) {
    throw error
  }
}
export const boardService ={
  createNew,
  getDetails
}