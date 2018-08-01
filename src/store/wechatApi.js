import config from '../../config'
import redisClient from './redisConnect'
import Wechat from 'wechat-api'

const wechatApiCode = () => new Promise((resolve, reject) => {
  let {wechatid, wechatkey} = config.wechat
  const wechatApi = new Wechat(wechatid, wechatkey, (callback) => {
    redisClient.get('wechat:tokenwh', (err, result) => {
      if (err) {
        return callback(err)
      }
      if (!result) {
        return callback(null, null)
      }
      return callback(null, JSON.parse(result))
    })
  }, (token, callback) => {
    console.log('成功获取微信访问TOKEN并保存到缓存')
    redisClient.setex('wechat:tokenwh', 3600, JSON.stringify(token))
    return callback(null, token)
  })
  wechatApi.registerTicketHandle(function (type, callback) {
    redisClient.get('wechat:jsticketwh', function (err, result) {
      if (err) {
        return callback(err)
      }
      if (!result) {
        return callback(null, null)
      }
      return callback(null, JSON.parse(result))
    })
  }, function (type, _ticketToken, callback) {
    console.log('成功获取微信访问JS Ticket并保存到缓存')
    redisClient.setex('wechat:jsticketwh', 3600, JSON.stringify(_ticketToken))
    return callback(null, _ticketToken)
  })
  const jsconfig_param = {
    debug: false,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu', 'scanQRCode'],
    url: 'https://whc.wechat.maiya.com/'
  }
  wechatApi.getJsConfig(jsconfig_param, (error, result) => {
    if (error) {
      console.error('获取微信JS CONFIG错误2', error)
      return reject(new Error('系统异常'))
    }
    return resolve(result)
  })
})

exports.wechatApiCode = wechatApiCode
