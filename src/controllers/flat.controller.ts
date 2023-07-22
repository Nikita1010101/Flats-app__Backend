import { NextFunction, Request, RequestHandler, Response } from 'express'

import { FlatService } from '../services/flat.service'
import {
	IFilterParams,
	ISortParams,
	TQueryParams
} from '../types/flat.interface'

class FlatControllerClass {
	getAllFlats: RequestHandler = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { _page, _sort, ...filters } = req.query as TQueryParams<
				ISortParams & IFilterParams
			>
			const flats = await FlatService.allFlats(_page, _sort, filters)
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
			const { id } = req.params as { id: string }
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
			const { ...filters } = req.query as TQueryParams<IFilterParams>
			const count = await FlatService.count(filters)
			res.send(count)
		} catch (error) {
			next(error)
		}
	}
}

export const FlatController = new FlatControllerClass()
