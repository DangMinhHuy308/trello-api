import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
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
const update = async (columnId,reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt:Date.now()
    }
    const updatedColumn = await columnModel.update(columnId,updateData)
    // Trả kq về trong service luôn phải có return
    return updatedColumn
  } catch (error) {
    throw error
  }
}
export const columnService ={
  createNew,
  update
}