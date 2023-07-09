import { SortOrder } from 'mongoose'
import { FlatModel } from '../models/flat.model'
import { IFiltersBody, IFlat } from '../types/flat.interface'

class FlatService {
	public readonly limit_params: number = 5

	async allFlats(page: number, sort: string): Promise<Array<Partial<IFlat>>> {
		const skip_params: number = page ? (page - 1) * this.limit_params : 0
		const [key, value] = sort.split(' ') as [string, SortOrder]
		const sort_params = key && value ? { [key]: value } : ''
		const flats = await FlatModel.find()
			.skip(skip_params)
			.limit(this.limit_params)
			.sort(sort_params)
		return flats
	}

	async floorFlats(
		floor: number,
		page: number,
		sort: string
	): Promise<Array<Partial<IFlat>>> {
		const skip_params: number = page
			? (Number(page) - 1) * this.limit_params
			: 0
		const [key, value] = sort.split(' ') as [string, SortOrder]
		const sort_params = key && value ? { [key]: value } : ''
		const flats = await FlatModel.find({ floor: Number(floor) })
			.skip(skip_params)
			.sort(sort_params)
			.limit(this.limit_params)
		return flats
	}

	async oneFlat(id: string): Promise<Partial<IFlat> | null> {
		const flat = await FlatModel.findById(id)
		return flat
	}

	async flatsCount(floor: number): Promise<number> {
		const search_params = floor !== 0 ? { floor } : {}
		const flats_count = await FlatModel.find(search_params).count()
		return flats_count
	}

	async filtered(
		body: IFiltersBody,
		page: number,
		sort: string
	): Promise<Array<Partial<IFlat>>> {
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
		const skip: number = page ? (Number(page) - 1) * this.limit_params : 0
		const [key, value] = sort.split(' ') as [string, SortOrder]
		const sort_params = key && value ? { [key]: value } : ''
		const flats = await FlatModel.find(sortParams)
			.skip(skip)
			.sort(sort_params)
			.limit(this.limit_params)
		return flats
	}
}

export const flatService = new FlatService()
