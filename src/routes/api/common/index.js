import express from 'express'
import BaseData from '../../../baseData'
import comomonService from '../../../service/commonService'

const router = express.Router()

router.post('/banner', (req, res, next) => {
  comomonService.bannerList().then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    next(error)
  })
})

export default router
