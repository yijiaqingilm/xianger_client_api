import ErrorData from '../baseData/ErrorData'
import { validationResult, check } from 'express-validator/check'
import { PAGESIZE } from '../const/const'
import moment from 'moment'
import config from '../../config'
import Hashids from 'hashids'
import md5 from 'js-md5'
import redisClient from '../store/redisConnect'
import BaseData from '../baseData'
import jwt from 'jsonwebtoken'

const handleErr = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return res.status(422).json(new ErrorData(errors.array()[0].msg))
    let e = new Error(errors.array()[0].msg)
    e.status = 422
    return next(e)
  } else {
    next()
  }
}
const checkPage = check('page', 'page参数格式不正确').isInt()
const setPageAndSize = (page = 1, size = PAGESIZE, callback) => {
  size = parseInt(size, 10)
  if (isNaN(size) || size <= 0) {
    let error = new Error('size格式不正常')
    error.status = 422
    return callback && callback(error)
  }
  let preIndex = (page - 1) * size
  let sufIndex = (page - 1) * size + size
  return callback && callback(null, [preIndex, sufIndex])
}

const hashIds = new Hashids(config.hashSalt, 8, '12345ABCDE67890FGHJKMNPRSTUWXYZ')
const encodeOrderNo = (orderId, createTime) => `${moment(createTime).format('YYMMDD')}${hashIds.encode(orderId)}`
const decodeOrderNo = (str) => Number(hashIds.decode(str.substr(6)))

const encodeUserId = (userId) => hashIds.encode(userId)
const decodeUserId = (str) => hashIds.decode(str)

class CacheRouter {
  static _getKey (req) {
    const method = req.method
    const url = req.originalUrl
    let query = ''
    const userId = req.user.userId
    if (method === 'GET') {
      query = req.query
    } else {
      query = req.body
    }
    const key = md5([userId, method, url, JSON.stringify(query)].join(','))
    return key
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  getCacheData (req, res, next) {
    const key = CacheRouter._getKey(req)
    redisClient.get(key, (err, result) => {
      if (err) {
        console.error('redis 读取 key 失败', key)
        return res.status(500).json(new ErrorData('服务异常'))
      }
      if (result) {
        return res.json(new BaseData(JSON.parse(result)))
      } else {
        next()
      }

    })
  }

  /**
   * @param req
   * @param data
   * @param expTime
   */
  setCacheData (req, data, expTime = 1) {
    const key = CacheRouter._getKey(req)
    redisClient.setex(key, expTime, JSON.stringify(data))

  }
}

const cacheRouter = new CacheRouter()

class Node {
  constructor (data) {
    this.data = data
    this.parent = null
    this.children = []
  }
}

const getJsonTree = (data, id = 'ruleId', parentId = -1) => {
  let treeArr = []
  data && data.forEach((row) => {
    if (Object.prototype.toString.call(row) !== '[object Object]') {
      row = JSON.parse(row)
    }
    let node = new Node(row)
    if (node.data.parentNode === parentId) {
      node.children = getJsonTree(data, id, node.data[id])
      node.parent = node.data.parentNode
      if (node.children.length === 0) {
        delete node.children
      }
      treeArr.push(node)
    }
  })
  return treeArr
}
const jwtVerifyPromise = (token, secret) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (error, decode) => {
    if (error) {
      reject(error)
      return
    }
    resolve(decode)
  })
})

export {
  handleErr,
  checkPage,
  setPageAndSize,
  encodeOrderNo,
  decodeOrderNo,
  encodeUserId,
  decodeUserId,
  cacheRouter,
  getJsonTree,
  jwtVerifyPromise
}
