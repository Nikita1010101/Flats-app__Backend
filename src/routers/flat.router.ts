import { Router } from 'express'

import { FlatController } from '../controllers/flat.controller'


const router = Router()

router.get('/', FlatController.getAllFlats)
router.get('/flat/:id', FlatController.getOneFlat)

router.post('/count', FlatController.getCount)
router.post('/filters', FlatController.getfiltered)

export const MainRouter = router
