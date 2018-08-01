import * as Model from '../store/AuthorModel'
import { setPageAndSize } from '../lib/utils'
import { PAGESIZE } from '../const/const'
import Sequelize from 'sequelize'

const Op = Sequelize.Op
const commonService = {}
commonService.bannerList = () => new Promise((resolve, reject) => {
  Model.Banner.findAll().then((data) => {
    resolve(data)
  }).catch((error) => {
    console.error(error, '在数据中查询banner列表失败')
    reject(new Error('系统异常'))
  })
})
export default commonService
