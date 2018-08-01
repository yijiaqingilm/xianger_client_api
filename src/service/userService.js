import * as Model from '../store/AuthorModel'
import { setPageAndSize } from '../lib/utils'
import { PAGESIZE } from '../const/const'
import Sequelize from 'sequelize'

const Op = Sequelize.Op
const userService = {}
userService.getUser = (where) => Model.Users.findOne({
  where,
  attributes: ['name', 'mobile', 'avatar', 'scope', 'balance', 'source', 'cardId', 'nickName']
})
userService.setUser = (userId, user) => new Promise((resolve, reject) => {
  Model.Users.update(user, {
    where: {userId}
  }).then((data) => {
    resolve(data)
  }).catch((error) => {
    console.error(error, '修改个人信息失败')
    let err = new Error('系统异常')
    reject(err)
  })
})
export default userService
