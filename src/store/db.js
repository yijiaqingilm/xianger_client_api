import config from '../../config'
import Sequelize from 'sequelize'

const {database, user, password, ...rest} = config.dbApp
const sequelize = new Sequelize(database, user, password, {
  ...rest,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00',
  define: {
    timestamps: false
  }
})
sequelize.authenticate().then(() => {
  console.log('应用数据库连接已分配')
}).catch((err) => {
  console.error('应用数据库错误', err, err.code)
})

export default sequelize
