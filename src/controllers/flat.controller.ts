import { NextFunction, Request, RequestHandler, Response } from 'express'

import { FlatService } from '../services/flat.service'

class FlatControllerClass {
	getAllFlats: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { _page } = req.query
			const flats = await FlatService.allFlats(Number(_page))
			res.send(flats)
		} catch (error) {
			next(error)
		}
	}

	getOneFlat: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params
			const flat = await FlatService.oneFlat(id)
			res.send(flat)
		} catch (error) {
			next(error)
		}
	}

	getCount: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const body = req.body
			const count = await FlatService.count(body)
			res.send(count)
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
			const { _page, _sort } = req.query
			const flats = await FlatService.filtered(
				Number(_page),
				String(_sort),
				body
			)
			res.send(flats)
		} catch (error) {
			next(error)
		}
	}
}

export const FlatController = new FlatControllerClass()
