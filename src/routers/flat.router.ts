import { Router } from 'express'

import { flatController } from '../controllers/flat.controller'


const router = Router()

router.get('/', flatController.getFlats)
router.get('/floor/:floor', flatController.getFloorFlats)
router.get('/flat/:id', flatController.getFlat)

export const mainRouter = router
