import { NextFunction, Request, RequestHandler, Response } from 'express'

import { FlatModel } from '../models/flat.model'
import { IFlat } from '../types/flat.interface'

class FlatController {
	getFlats: RequestHandler<Record<any, string>, Array<IFlat>> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { page } = req.query

		const limit: number = 5
		const skip: number = page ? (Number(page) - 1) * limit : 0

		const flats = await FlatModel.find().skip(skip).limit(limit)

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
			const { page } = req.query

			const limit: number = 5
			const skip: number = page ? (Number(page) - 1) * limit : 0

			const flats = await FlatModel.find({ floor: Number(floor) })
				.skip(skip)
				.limit(limit)

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

			const flats = await FlatModel.findById(id)

			res.send(flats)
		} catch (error) {
			next(error)
		}
	}
}

export const flatController = new FlatController()
