import express from 'express'
import catalgosRouter from './catalogs'
import goodsRouter from './goods'
import comboRouter from './combo'

const router = express.Router()

router.use('/catalogs', catalgosRouter)
router.use('/goods', goodsRouter)
router.use('/combo', comboRouter)
export default router
