import express from 'express'
import BaseData from '../../../baseData'
import goodsService from '../../../service/goodsService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkCatalogsId = [checkPage, check('catalogsId', 'catalogsId格式不正确').isInt(), handleErr]
router.post('/list', (req, res, next) => {
  goodsService.catalogsList().then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
router.post('/goods', checkCatalogsId, (req, res, next) => {
  goodsService.goodsByCatalogs(req.body).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
export default router
