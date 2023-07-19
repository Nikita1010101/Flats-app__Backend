import { FlatModel } from '../models/flat.model'
import { IFilters, IFlat } from '../types/flat.interface'
import { createFilterParams } from '../utils/create-filter-params'
import { createSortParams } from '../utils/create-sort-params'

class FlatServiceClass {
	public readonly limit_params: number = 5

	async allFlats(page: number): Promise<Partial<IFlat>[]> {
		const skip_params: number = (page - 1) * this.limit_params
		const limit_params = this.limit_params
		const flats = await FlatModel.find().skip(skip_params).limit(limit_params)
		return flats
	}

	async oneFlat(id: string): Promise<Partial<IFlat> | null> {
		const flat = await FlatModel.findById(id)

		return flat
	}

	async count(body: IFilters): Promise<string> {
		const filterParams = createFilterParams(body)
		const flats = await FlatModel.find(filterParams)

		return String(flats.length)
	}

	async filtered(
		page: number,
		sort: string,
		body: IFilters
	): Promise<Partial<IFlat>[]> {
		const skip_params: number = (page - 1) * this.limit_params
		const limit_params = this.limit_params
		const sortParams = createSortParams(sort)
		const filterParams = createFilterParams(body)

		const flats = await FlatModel.find(filterParams)
			.skip(skip_params)
			.sort(sortParams)
			.limit(limit_params)
		return flats
	}
}

export const FlatService = new FlatServiceClass()
