import * as Model from '../store/AuthorModel'
import { setPageAndSize, encodeOrderNo, decodeOrderNo } from '../lib/utils'
import { orderStatus, sourceStatus } from '../const/const'
import Sequelize from 'sequelize'

const Op = Sequelize.Op
const orderService = {}

orderService.orderListByUser = (userId, params) => new Promise((resolve, reject) => {
  let {page, size} = params
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    Model.Order.findAll({
      where: {
        userId
      },
      offset,
      limit
    }).then((data) => {
      data = data.map((order) => {
        order = JSON.parse(JSON.stringify(order))
        order.orderId = encodeOrderNo(order.orderId, order.createdAt)
        return order
      })
      resolve(data)
    }).catch((error) => {
      console.error(error, '在数据库中查询订单列表失败', error)
      let err = new Error('系统异常')
      reject(err)
    })
  })
})
orderService.getOrder = (where) => {
  const orderInfo = Model.Order.findOne({
    where,
    include: [
      {
        model: Model.Goods,
        attributes: ['goodsId', 'name', 'price'],
        through: {
          attributes: []
        }
      },
      {
        model: Model.Combo,
        attributes: ['comboId', 'name', 'oprice', 'price'],
        through: {
          attributes: []
        }
      }
    ]
  })
  return new Promise((resolve, reject) => {
    orderInfo().then((order) => {
      order.orderId = encodeOrderNo(order.orderId, order.createdAt)
      resolve(order)
    }).catch((error) => {
      reject(error)
    })
  })
}
orderService.offlinePay = (encodeOrderId) => new Promise((resolve, reject) => {
  const orderId = decodeOrderNo(encodeOrderId)
  const getOrder = Model.Order.findOne({
    where: {
      orderId
    }
  })
  return getOrder.then((order) => {
    let {source, status} = order
    if (source === sourceStatus.offline && status === orderStatus.noPay) {
      order.status = orderStatus.pay
      return order.save().then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    } else {
      let err = new Error('该订单不可操作！！！')
      reject(err)
    }
  })
})
export default orderService
