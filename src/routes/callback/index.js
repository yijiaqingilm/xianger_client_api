import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../../../config'
import userService from '../../service/userService'
import { check, validationResult } from 'express-validator/check'
import { encodeUserId } from '../../lib/utils'
import BaseData from '../../baseData'

const router = express.Router()
const setToken = (data = {}, expiresIn = '1 days') => {
  const token = jwt.sign(data, config.secret, {
    expiresIn
  })
  return token
}
router.get('/wechat', [check('code', '微信登录失败').exists()], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.redirect(config.webUrl + '#/error?message=' + encodeURIComponent('微信登录失败'))
  }
  let {code, state} = req.query
  let hashUrl = ''
  if (state && state !== 'STATE') {
    try {
      state = JSON.parse(state)
      hashUrl = state.hash
    } catch (e) {
      console.error('用户来源解析失败', state, e.message)
      return res.redirect(config.webUrl + '#/error?message=' + encodeURIComponent('无效的用户来源'))
    }
  }
  userService.loginByWechatOAuth(code).then((data) => {
    let dobind = data.dobind || false
    const token = setToken(data)
    let userCode = encodeUserId(data.userId)
    if (dobind) {
      userCode = data.agentId
    }
    return res.redirect(`${config.webUrl}?time=${new Date().getTime()}#/jump?token=${token}&hashUrl=${hashUrl}&dobind=${dobind}&userCode=${userCode}`)
  }).catch((err) => res.redirect(config.webUrl + '#/error?message=' + encodeURIComponent(err)))
})
router.post('/bind', (req, res, next) => {
  const {maimengToken, maiyaToken} = req.body
  userService.bindWechat(maimengToken, maiyaToken).then((data) => {
    const token = setToken(data)
    const userCode = encodeUserId(data.userId)
    res.json(new BaseData({token, userCode}))
  }).catch((err) => {
    next(err)
  })
})
export default router

