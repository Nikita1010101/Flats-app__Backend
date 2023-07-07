import { NextFunction, Request, RequestHandler, Response } from 'express'

import { flatService } from '../services/flat.service'


class FlatController {
	getFlats: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { page, sort } = req.query
		const flats = await flatService.allFlats(Number(page), String(sort))
		res.send(flats)
		try {
		} catch (error) {
			next(error)
		}
	}

	getFloorFlats: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { floor } = req.params
			const { page, sort } = req.query
			const flats = await flatService.floorFlats(
				Number(floor),
				Number(page),
				String(sort)
			)
			res.send(flats)
		} catch (error) {
			res.send(error)
		}
	}

	getFlat: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params
			const flat = await flatService.oneFlat(id)
			res.send(flat)
		} catch (error) {
			next(error)
		}
	}

	getfiltered: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const body = req.body
			const { page, sort } = req.query
			const flats = await flatService.filtered(body, Number(page), String(sort))
			res.send(flats)
		} catch (error) {
			next(error)
		}
	}
}

export const flatController = new FlatController()
