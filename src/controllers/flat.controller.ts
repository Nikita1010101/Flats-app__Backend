import { NextFunction, Request, RequestHandler, Response } from 'express'

import { IFiltersBody, IFlat } from '../types/flat.interface'
import { flatService } from '../services/flat.service'

class FlatController {
	getFlats: RequestHandler<Record<any, string>, Array<IFlat>> = async (
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

	getFloorFlats: RequestHandler<Record<any, string>, Array<IFlat>> = async (
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

	getFlat: RequestHandler<Record<any, string>, IFlat> = async (
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

	getfiltered: RequestHandler<Record<any, string>, IFlat, IFiltersBody> =
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const body = req.body
				const { page, sort } = req.query
				const flats = await flatService.filtered(
					body,
					Number(page),
					String(sort)
				)
				res.send(flats)
			} catch (error) {
				next(error)
			}
		}
}

export const flatController = new FlatController()
