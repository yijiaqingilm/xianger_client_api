import express from 'express'
import BaseData from '../../../baseData'
import goodsService from '../../../service/goodsService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkGoodsId = [check('goodsId', 'goodsId格式不正确').isInt(), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  goodsService.goodsList(user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
router.post('/info', checkGoodsId, (req, res, next) => {
  let {goodsId} = req.body
  console.log(goodsId, 'goodsId')
  goodsService.getGoods({goodsId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

export default router
