import cors from 'cors'
import redisClient from '../store/redisConnect'
import * as Model from '../store/AuthorModel'

const checkCors = (origin) => new Promise((resolve, reject) => {
  const existCacheMember = () => {
    redisClient.sismemberAsync('domains', origin).then((data) => {
      if (data) {
        resolve()
      } else {
        existCacheKey()
      }

    }).catch((err) => {
      console.error('在缓存中查询来访域名是否白名单错误', err)
      return reject('系统异常')
    })
  }
  const existCacheKey = () => {
    redisClient.scardAsync('domains').then((data) => {
      if (data && data > 0) {
        return reject('无权限的访问请求来源')
      } else {
        queryDb()
      }
    }).catch((err) => {
      console.error('在缓存中查询是否存在域名白名单数据错误', err)
      return reject('系统异常')
    })
  }
  const queryDb = () => {
    Model.Domains.findAll().then((data) => {
      if (!data || data.length === 0) {
        reject('无权限的访问请求来源')
      }
      let domainsName = []
      let existDomain = false
      data.forEach((row) => {
        domainsName.push(row.domain)
        if (row.domain === origin) {
          existDomain = true
        }
      })
      redisClient.saddAsync('domains', domainsName)
      if (existDomain) {
        resolve()
      } else {
        reject('无权限的访问请求来源')
      }
    }).catch((err) => {
      console.error('在数据库中查询所有域名白名单错误', err)
      return reject('系统异常')
    })
  }
  if (!origin) {
    return reject('无效的请求来源')
  } else {
    existCacheMember()
  }
})
let corsOptionsDelegate = (req, callback) => {
  const origin = req.header('Origin')
  checkCors(origin).then(() => {
    callback(null, {origin: true})
  }).catch(() => {
    callback(null, {origin: false})
  })

}
export default () => cors(corsOptionsDelegate)
