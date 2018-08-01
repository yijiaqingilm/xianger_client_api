import sequelize from './db'
import sysUsers from '../models/sys_users'
import sysRoles from '../models/sys_roles'
import sysRules from '../models/sys_rules'
import sysroles2rules from '../models/sys_roles_rules'

import users from '../models/users'
import order from '../models/order'
import goods from '../models/goods'
import catalogs from '../models/catalogs'
// import order2goods from '../models/order_goods'
import company from '../models/company'
import combo from '../models/combo'
import combo2goods from '../models/combo_goods'
// import order2combo from '../models/order_combo'
import banner from '../models/banner'

import orderGoodsItems from '../models/order_goods_items'
import orderComboItems from '../models/order_combo_items'
import orderComboGoodsItems from '../models/order_combo_goods_items'

const SysUser = sequelize.import('sys_users', sysUsers)
const SysRole = sequelize.import('sys_roles', sysRoles)
const SysRule = sequelize.import('sys_rule', sysRules)
const SysRole2Rule = sequelize.import('sys_role_rule', sysroles2rules)

const Users = sequelize.import('users', users)
const Order = sequelize.import('order', order)
const Catalogs = sequelize.import('catalogs', catalogs)
// const Order2Goods = sequelize.import('order2goods', order2goods)
const OrderGoodsItems = sequelize.import('order_goods_items', orderGoodsItems)
const OrderComboItems = sequelize.import('order_combo_items', orderComboItems)
const OrderComboGoodsItems = sequelize.import('order_combo_goods_items', orderComboGoodsItems)
const Company = sequelize.import('company', company)
const Goods = sequelize.import('goods', goods)
const Combo2Goods = sequelize.import('combo2goods', combo2goods)
const Combo = sequelize.import('combo', combo)
// const Order2Combo = sequelize.import('order2combo', order2combo)
const Banner = sequelize.import('banner', banner)
/* 系统用户 权限关系映射*/
SysRule.belongsToMany(SysRole, {through: SysRole2Rule, foreignKey: 'rules_id'})
SysRole.belongsToMany(SysRule, {through: SysRole2Rule, foreignKey: 'roles_id'})
SysRole.hasMany(SysUser, {foreignKey: 'roles_id'})
SysUser.belongsTo(SysRole, {foreignKey: 'roles_id'})

/* 用户关系映射*/
Users.hasMany(Order, {foreignKey: 'userId'})

/* goods 关系映射*/
Catalogs.hasMany(Goods, {foreignKey: 'catalogsId'})
Goods.belongsTo(Catalogs, {foreignKey: 'catalogsId'})

Order.hasMany(OrderGoodsItems, {foreignKey: 'orderId'})
Order.hasMany(OrderComboItems, {foreignKey: 'orderId'})
OrderComboItems.hasMany(OrderComboGoodsItems, {foreignKey: 'comboId'})
// Goods.belongsToMany(Order, {through: Order2Goods, foreignKey: 'goodsId'})
// Order.belongsToMany(Goods, {through: Order2Goods, foreignKey: 'orderId'})

/* combo 关系映射*/
Combo.belongsToMany(Goods, {through: Combo2Goods, foreignKey: 'comboId'})
Goods.belongsToMany(Combo, {through: Combo2Goods, foreignKey: 'goodsId'})

/* 订单 关系映射*/
Order.belongsTo(Users, {foreignKey: 'userId'})
export {
  SysUser,
  SysRole,
  SysRule,
  SysRole2Rule,
  Users,
  Order,
  Catalogs,
  // Order2Goods,
  Company,
  Goods,
  Combo,
  Combo2Goods,
  // Order2Combo,
  Banner,
  OrderGoodsItems,
  OrderComboItems,
  OrderComboGoodsItems
}
