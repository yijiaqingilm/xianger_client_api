import * as Model from '../store/AuthorModel'
import { setPageAndSize } from '../lib/utils'

const goodsService = {}
goodsService.catalogsList = (where = {}) => new Promise((resolve, reject) => {
  Model.Catalogs.findAll({where}).then((data) => {
    resolve(data)
  }).catch((error) => {
    console.error(error, '数据库获取catalogs list 失败')
    let err = new Error('系统异常')
    reject(err)
  })
})
goodsService.goodsList = (goods) => new Promise((resolve, reject) => {
  let {page, size} = goods
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    return Model.Goods.findAll({
      offset,
      limit
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
})
goodsService.goodsByCatalogs = (p) => new Promise((resolve, reject) => {
  let {catalogsId, page, size} = p
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    Model.Goods.findAll({
      where: {
        catalogsId
      },
      offset,
      limit
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      console.error(error, '数据库分类查询商品列表失败')
      let err = new Error('系统异常')
      reject(err)
    })
  })
})
goodsService.getGoods = (where) => Model.Goods.findOne({where})

goodsService.comboListAll = (combo) => new Promise((resolve, reject) => {
  let {page, size} = combo
  setPageAndSize(page, size, (err, pageAndSize) => {
    if (err) {
      reject(err)
      return
    }
    let [offset, limit] = pageAndSize
    return Model.Combo.findAll({
      offset,
      limit
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })

})
goodsService.comboTop4 = () => new Promise((resolve, reject) => {
  Model.Combo.findAll({
    offset: 0,
    limit: 4
  }).then((data) => {
    resolve(data)
  }).catch((error) => {
    console.error(error, '在数据库中查询combo top 4 失败')
    let err = new Error('系统异常')
    reject(err)
  })
})
goodsService.getCombo = (where) => Model.Combo.findOne({
  where,
  include: [{
    model: Model.Goods,
    attributes: ['goodsId'],
    through: {
      attributes: []
    }
  }]
})
export default goodsService
