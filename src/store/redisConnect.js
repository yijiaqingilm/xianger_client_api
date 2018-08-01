import redis from 'redis'
import exeTask from './task/task'
import config from '../../config'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis)
const redisClient = redis.createClient({
  ...config.redis
})

const redisSub = redis.createClient({
  ...config.redis
})
const redisPub = redis.createClient({
  ...config.redis
})

redisClient.on('error', (err) => {
  console.log('redisClient Error ' + err)
})
redisSub.on('error', (err) => {
  console.log('redisSub Error ' + err)
})
redisPub.on('error', (err) => {
  console.log('redisPub Error ' + err)
})

redisClient.on('connect', () => {
  console.log('Redis服务已连接')
})
redisClient.on('reconnecting', () => {
  console.log('Redis服务重新连接')
})
redisSub.on('pmessage', function (pattern, channel, expiredKey) {
  exeTask(expiredKey)
})
redisSub.psubscribe('__keyevent@0__:expired')
export {redisSub, redisPub}
export default redisClient
