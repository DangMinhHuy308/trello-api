
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { columnService } from '~/services/columnService'
const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    const createdColumn = await columnService.createNew(req.body)
    // Có kq trả về phía client
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)

  }
}
const update = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const updatedColumn = await columnService.update(columnId,req.body)

    res.status(StatusCodes.OK).json(updatedColumn)
  } catch (error) {
    next(error)

  }
}
export const columnController = {
  createNew,
  update
}