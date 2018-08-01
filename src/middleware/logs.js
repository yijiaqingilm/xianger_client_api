import logger from 'morgan'
import fs from 'fs'
import path from 'path'
import rfs from 'rotating-file-stream'
import moment from 'moment'

logger.token('body', function (req, res) {
  return JSON.stringify(req.method === 'POST' ? req.body : req.query)
})
logger.token('user', function (req, res) {
  return JSON.stringify(req.user)
})
logger.token('errInfo', function (req, res) {
  console.log('error', req.error)
  return req.error
})
var logDirectory = path.join(__dirname, '../../logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const accessErrorLogStream = rfs(moment().format('YYYYMMDD') + 'Error.log', {
  interval: '1d',
  path: logDirectory,
})
const accessInfoLogStream = rfs(moment().format('YYYYMMDD') + 'Info.log', {
  interval: '1d',
  path: logDirectory,
})
const errorLogs = logger(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
    tokens.user(req, res),
    'errorInfo:', tokens.errInfo(req, res)
  ].join(' ')
}, {
  stream: accessErrorLogStream,
  skip: function (req, res) { return res.statusCode < 400 }
})

const infoLogs = logger(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ')
}, {
  stream: accessInfoLogStream,
  skip: function (req, res) { return res.statusCode >= 400 },
  redirect_console: 0x01
})

/* logger.format('dev+', function (tokens, req, res) {
  var color = 32 // green
  var status = res.statusCode

  if (status >= 500) {
    color = 31 // red
  } else if (status >= 400) {
    color = 33 // yellow
  } else if (status >= 300) {
    color = 36 // cyan
  }
  var fn = compile('\x1b[90m:remote-addr \x1b[32m:method \x1b[35m:url \x1b[/' + color + 'm:status \x1b[97m:response-time ms\x1b[0m')

  return fn(tokens, req, res)
})*/
export { errorLogs, infoLogs }
