import express from 'express'
import wechatApi from '../../../store/wechatApi'
import config from '../../../../config'
import BaseData from '../../../baseData'

const router = express.Router()

router.post('/config', (req, res, next) => {
  if (config.debug) {
    console.warn('测试接口，不调用JSConfig')
    // const error = new Error('测试接口，不调用JSConfig')
    // error.httpStatusCode = 400
    // return next(error)
    res.json(new BaseData({test: '测试数据'}))
  } else {
    const jsconfig_param = {
      debug: false,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu'],
      url: config.url
    }
    wechatApi.getJsConfig(jsconfig_param, (error, config) => {
      if (error) {
        console.error('获取微信JS CONFIG错误', error)
        const error = new Error('系统异常')
        error.httpStatusCode = 400
        return next(error)
      }
      return res.json(new BaseData({config}))
    })
  }
})
export default router
