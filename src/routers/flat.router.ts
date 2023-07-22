import { Router } from 'express'

import { FlatController } from '../controllers/flat.controller'

const router = Router()

router.get('/', FlatController.getAllFlats)
router.get('/flat/:id', FlatController.getOneFlat)
router.get('/count', FlatController.getCount)

export const MainRouter = router
