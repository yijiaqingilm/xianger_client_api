import express from 'express'
import apiRouter from './api'
import callbackRouter from './callback'
import config from '../../config'

const router = express.Router()
router.all('/api/*', (req, res, next) => {
  if (config.debug) {
    req.user = {userId: 4, role: -1}
  }
  next()
})
router.use('/api', apiRouter)
router.use('/callback', callbackRouter)
export default router
