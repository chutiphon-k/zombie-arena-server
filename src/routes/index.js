import { Router } from 'express'

import web from 'routes/web'
import api from 'routes/api'

const router = Router()

router.use('/api', api)
router.use('/', web)

export default router
