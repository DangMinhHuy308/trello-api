import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)
    }
    // Trả kq về trong service luôn phải có return
    return getNewCard
  } catch (error) {
    throw error
  }
}
const update = async (cardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt:Date.now()
    }
    const updatedCard = await cardModel.update(cardId, updateData)
    // Trả kq về trong service luôn phải có return
    return updatedCard
  } catch (error) {
    throw error
  }
}
export const cardService ={
  createNew,
  update
}