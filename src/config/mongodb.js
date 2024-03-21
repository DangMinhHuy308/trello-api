//minhhuydev
//yBXHWmCvWFmCOnbI
//14.242.181.185/32
// const MONGODB_URI = 'mongodb+srv://minhhuydev:yBXHWmCvWFmCOnbI@cluster0-minhhuydev.zz0e1fg.mongodb.net/?retryWrites=true&w=majority'

// const DATABASE_NAME = 'trello-minhhuydev'

import { MongoClient } from 'mongodb'
import { env } from '~/config/environment'

// khởi tạo đối tượng
let trelloData = null

// khởi tạo đối tượng mongodbClientInstance connect mongodb
const mongodbClientInstance = new MongoClient(env.MONGODB_URI)

export const CONNECT_DB = async () => {
  await mongodbClientInstance.connect()
  trelloData = mongodbClientInstance.db(env.DATABASE_NAME)
}

// funtion GET_DB( ko async) này có nv export ra cái Treall DB sau khi đã connect thành công tới Mongodb để chúng ta sử dụng ở nhiều nơi khác trong code
// lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới mongodb
export const GET_DB = () => {
  if (!trelloData) throw new Error('Must connect to Database first')
  return trelloData
}
export const CLOSE_DB = async () => {
    await mongodbClientInstance.close()
}