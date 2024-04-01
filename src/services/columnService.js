import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    if (getNewColumn) {
      getNewColumn.cards = []
      // cập nhập lại mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    // Trả kq về trong service luôn phải có return
    return getNewColumn
  } catch (error) {
    throw error
  }
}
const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt:Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    // Trả kq về trong service luôn phải có return
    return updatedColumn
  } catch (error) {
    throw error
  }
}
const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }
    // xóa column
    await columnModel.deleteOneById(columnId)
    // xóa all cards thuộc column chứa nó
    await cardModel.deleteManyByColumnId(columnId)
    //  xóa columnId trong mảng columnOrderIds của cái Board chứa nó
    await boardModel.pullColumnOrderIds()
    return { deleteResult:'Column and its Cards deleted successfully' }
  } catch (error) {
    throw error
  }
}
export const columnService ={
  createNew,
  update,
  deleteItem
}