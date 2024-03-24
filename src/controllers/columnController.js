
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

export const columnController = {
  createNew
}