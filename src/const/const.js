const STATUS_CODE = {
  SUCCESS: 200,
  404: 404,
  SERVER_ERROR: 500
}

const PAGESIZE = 10
const orderStatus = {
  pay: 1,
  noPay: 0,
}
const sourceStatus = {
  offline: 0,
  wx: 1
}
const orderPayType = {
  wx: 0,
  cash: 1
}
export {
  STATUS_CODE,
  PAGESIZE,
  orderStatus,
  orderPayType,
  sourceStatus
}
