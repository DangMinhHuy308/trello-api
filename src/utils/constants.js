/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// những domain dc phép truy cập tới tài nguyên của server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173' //không cần local host vì ở config/cors đã cho phép môi trường dev(env.BUILD_MOD === 'dev')
]
export const BOARD_TYPES = {
  PUBLIC:'public',
  PRIVATE:'private'
}