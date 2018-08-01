import router from './routes'
import bodyParser from 'body-parser'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import ErrorData from './baseData/ErrorData'
import cors from './middleware/cors'
import { errorLogs, infoLogs } from './middleware/logs'
import session from 'express-session'
import redisClient from './store/redisConnect'
import connectRedis from 'connect-redis'
import config from '../config'
// 重写date tojson方法
/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
Date.prototype.toJSON = function () {
  return this.getTime()
}
var app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// session config
const RedisStore = connectRedis(session)
app.use(session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
}))

app.use(infoLogs)
app.use(errorLogs)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../static')))
app.use(bodyParser.json())
app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('error', {message: '友情提示', error: {status: 404, stack: '您访问的页面不存在！！！'}})
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  req.error = err.message
  res.status(err.status || err.httpStatusCode || 500).json(new ErrorData(err.message))
})

module.exports = app
