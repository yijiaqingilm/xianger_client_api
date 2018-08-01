import express from 'express'
import BaseData from '../../../baseData'
import orderService from '../../../service/orderService'
import { checkPage, handleErr, encodeOrderNo, decodeOrderNo } from '../../../lib/utils'
import { check } from 'express-validator/check'

const router = express.Router()

const checkOrderId = [check('orderId', 'orderId格式不正确').isLength({min: 14}), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  orderService.orderListByUser(user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
router.post('/finsh', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  orderService.orderListByUser(user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
router.post('/info', checkOrderId, (req, res, next) => {
  let {orderId} = req.body
  orderService.getOrder({orderId: decodeOrderNo(orderId)}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
router.post('/offlinePay', checkOrderId, (req, res, next) => {
  let {orderId} = req.body
  orderService.offlinePay(orderId).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})

export default router
