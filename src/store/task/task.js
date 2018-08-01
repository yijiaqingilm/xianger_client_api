import { redisPub } from '../redisConnect'

const exeTask = function (expiredKey) {
  let [task, taskName, id] = expiredKey.split(':')
  console.log('pmessage', expiredKey)
}
export default exeTask
