import { SortOrder } from 'mongoose'
import { FlatModel } from '../models/flat.model'
import { IFiltersBody, IFlat } from '../types/flat.interface'

class FlatServiceClass {
	public readonly limit_params: number = 5

	async allFlats(
		page: number,
		sort: string,
		count: string
	): Promise<Partial<IFlat>[] | string> {
		const skip_params: number = page 
			? (page - 1) * this.limit_params
			: 0
		const limit_params = page ? this.limit_params : 0
		const [key, value] = sort.split(' ') as [string, SortOrder]
		const sort_params = key && value ? { [key]: value } : ''
		const flats = await FlatModel.find()
			.skip(skip_params)
			.limit(limit_params)
			.sort(sort_params)
		return count === 'true' ? String(flats.length) : flats
	}

	async oneFlat(id: string): Promise<Partial<IFlat> | null> {
		const flat = await FlatModel.findById(id)
		return flat
	}

	async filtered(
		body: IFiltersBody,
		page: number,
		sort: string
	): Promise<Partial<IFlat>[] | string> {
		const {
			floor_params,
			price_params,
			rooms_params,
			area_total_params,
			area_kitchen_params,
			area_live_params
		} = body
		const sortParams = {
			$and: [
				{
					floor: {
						$gte: floor_params[0],
						$lte: floor_params[1]
					}
				},
				{
					price: {
						$gte: price_params[0],
						$lte: price_params[1]
					}
				},
				{
					rooms: {
						$gte: rooms_params[0],
						$lte: rooms_params[1]
					}
				},
				{
					area_total: {
						$gte: area_total_params[0],
						$lte: area_total_params[1]
					}
				},
				{
					area_kitchen: {
						$gte: area_kitchen_params[0],
						$lte: area_kitchen_params[1]
					}
				},
				{
					area_live: {
						$gte: area_live_params[0],
						$lte: area_live_params[1]
					}
				}
			]
		}
		const skip_params: number = page
			? (page - 1) * this.limit_params
			: 0
		const limit_params = page ? this.limit_params : 0
		const [key, value] = sort.split(' ') as [string, SortOrder]
		const sort_params = key && value ? { [key]: value } : ''
		const flats = await FlatModel.find(sortParams)
			.skip(skip_params)
			.sort(sort_params)
			.limit(limit_params)
		return page ? flats : String(flats.length)
	}
}

export const FlatService = new FlatServiceClass()
