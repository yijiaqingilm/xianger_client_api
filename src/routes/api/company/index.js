import express from 'express'
import BaseData from '../../../baseData'
import ErrorData from '../../../baseData/ErrorData'
import { handleErr } from '../../../lib/utils'
import companyService from '../../../service/companyService'
import { check } from 'express-validator/check'

const router = express.Router()

router.post('/info', (req, res, next) => {
  companyService.getCompany({companyId: 1}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    console.error(error, '在数据中查询公司信息失败')
    let err = new Error('系统异常')
    next(err)
  })
})

export default router
