
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
export const boardController = {
  createNew,
  getDetails
}