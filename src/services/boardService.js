/* eslint-disable no-useless-catch */


import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

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
// const getListBoard = async (boardId) => {
//   try {
//     const board = await boardModel.getListBoard(boardId);
//     if (!board) {
//       throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found');
//     }

//     // Deep clone board để không ảnh hưởng tới board ban đầu
//     const resBoard = cloneDeep(board);

//     // Duyệt qua từng cột và lọc các thẻ vào cột tương ứng
//     resBoard.columns.forEach(column => {
//       column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString());
//     });

//     // Xóa mảng cards khỏi board ban đầu
//     delete resBoard.cards;

//     // Trả kết quả về từ service
//     return resBoard;
//   } catch (error) {
//     throw error;
//   }
// };

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
const update = async (boardId,reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt:Date.now()
    }
    const updatedBoard = await boardModel.update(boardId,updateData)
    // Trả kq về trong service luôn phải có return
    return updatedBoard
  } catch (error) {
    throw error
  }
}
const moveCardToDifferentColumn = async (reqBody) => {
  try {
    // b1 cập nhập mảng cardOrderIds của col ban đầ chứa nó
    await columnModel.update(reqBody.prevColumnId,{
      cardOrderIds:reqBody.prevCardOrderIds,
      updatedAt:Date.now()
    })
    // b2 cập nhập mảng cardOrderIds của column tiếp theo
    await columnModel.update(reqBody.nextColumnId,{
      cardOrderIds:reqBody.nextCardOrderIds,
      updatedAt:Date.now()
    })
    // b3 cập nhập lại trường columnId mới của card đã kéo
    await cardModel.update(reqBody.currentCardId,{
      columnId: reqBody.nextColumnId
    })
    // Trả kq về trong service luôn phải có return
    return { updateResult: 'Success'}
  } catch (error) {
    throw error
  }
}
export const boardService ={
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  // getListBoard
}