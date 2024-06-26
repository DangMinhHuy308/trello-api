
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
// Define collection (Name & Schema)

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),

  description: Joi.string().required().min(3).max(256).trim().strict(),
  type:Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})
// 1 số field ko muốn cập nhập trong hàm update()
const INVALID_UPDATE_FIELDS =['_id', 'createdAt']
const validateBeforeCreate = async(data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
// gọi tới tầng model để xử lý lưu bản ghi newBoard vào db
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
// const getListBoard = async (id) => {
//   try {
//     const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
//       { $match:{
//         _id: new ObjectId(id),
//         _destroy: false
//       } },
//       { $lookup:{
//         from: columnModel.COLUMN_COLLECTION_NAME,
//         localField: 'columnOrderIds',
//         foreignField: '_id',
//         as: 'columns'
//       } },
//       { $lookup:{
//         from: cardModel.CARD_COLLECTION_NAME,
//         localField: '_id',
//         foreignField: 'boardId',
//         as: 'cards'
//       } }
//     ]).toArray();
//     // Trả về phần tử đầu tiên của kết quả hoặc null nếu không tìm thấy
//     return result[0] || null;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match:{
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup:{
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup:{
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()
    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}
// push giá trị columnId vào mảng cuối mảng columnOrderIds
const pushColumnOrderIds = async(column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(column.boardId)

      },
      { $push:{ columnOrderIds: new ObjectId(column._id) } },
      { returnDocument:'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const update = async(boardId, updateData) => {
  try {
    // lọc những field mà chúng ta ko muốn cập nhập
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })
    // đối với những dữ liệu lien quan tới ObjectId, biến đổi ở đây
    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map(_id => (new ObjectId(_id)))
    }
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(boardId)
      },
      { $set: updateData },
      { returnDocument:'after' } //trả về kq mới sau khi cập nhập
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
// lấy 1 phần tử columnId ra khỏi mảng columnOrderIds
const pullColumnOrderIds = async(column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(column.boardId)

      },
      { $pull:{ columnOrderIds: new ObjectId(column._id) } },
      { returnDocument:'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const boardModel ={
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
  update,
  pullColumnOrderIds,
  // getListBoard
}
