import express from 'express'
import BaseData from '../../../baseData'
import userService from '../../../service/userService'
import { checkPage, handleErr } from '../../../lib/utils'
import ErrorData from '../../../baseData/ErrorData'
import { check } from 'express-validator/check'

const router = express.Router()

const checkUserId = [check('userId', 'userId格式不正确').isInt(), handleErr]

router.post('/profile', checkUserId, (req, res, next) => {
  let {userId} = req.body
  console.log(userId, 'userId')
  userService.getUser({userId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/set', checkUserId, (req, res, next) => {
  let user = req.body
  let {userId} = req.user
  userService.setUser(userId, user).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
// 为实现
router.post('/project', checkUserId, (req, res, next) => {
  let {userId} = req.body
  console.log(userId, 'userId')
  userService.getUser({userId}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
export default router
