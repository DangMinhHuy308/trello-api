/* eslint-disable no-useless-catch */


import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
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
    // b1 Deep clone board ra 1 cái mới để xử lý, ko ảnh hưởng tới board ban đầu
    const resBoard = cloneDeep(board)
    // b2 đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // b3 xóa mảng cards khỏi board ban đầu
    delete resBoard.cards
    // Trả kq về trong service luôn phải có return
    return resBoard
  } catch (error) {
    throw error
  }
}
export const boardService ={
  createNew,
  getDetails
}