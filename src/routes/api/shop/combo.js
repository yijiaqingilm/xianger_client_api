import express from 'express'
import BaseData from '../../../baseData'
import goodsService from '../../../service/goodsService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkComboId = [check('comboId', 'comboId格式不正确').isInt(), handleErr]
router.post('/list', [checkPage, handleErr], (req, res, next) => {
  let user = req.body
  goodsService.comboListAll(user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/top4', (req, res, next) => {
  goodsService.comboTop4().then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})
router.post('/info', checkComboId, (req, res, next) => {
  let {comboId} = req.body
  goodsService.getCombo({comboId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

export default router
