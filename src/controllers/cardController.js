
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cardService } from '~/services/cardService'
const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng service
    const createdCard = await cardService.createNew(req.body)
    // Có kq trả về phía client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) {
    next(error)

  }
}
const update = async (req, res, next) => {
  try {
    const cardId = req.params.id
    const updatedCard = await cardService.update(cardId, req.body)

    res.status(StatusCodes.OK).json(updatedCard)
  } catch (error) {
    next(error)

  }
}
export const cardController = {
  createNew,
  update
}