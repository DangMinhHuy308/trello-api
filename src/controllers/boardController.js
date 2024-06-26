
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    const createdBoard = await boardService.createNew(req.body)

    // Có kq trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)

  } catch (error) {
    next(error)

  }
}
const getDetails = async (req, res, next) => {
  try {
    // console.log(object)
    const boardId = req.params.id
    // 
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)

  }
}
// const getListBoard = async (req, res, next) => {
//   try {
//     // console.log(object)
//     const boardList = req.body
//     // 
//     const board = await boardService.getDetails(boardList)

//     res.status(StatusCodes.OK).json(board)
//   } catch (error) {
//     next(error)

//   }
// }
const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId,req.body)

    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) {
    next(error)

  }
}
const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)

  }
}
export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  // getListBoard
}