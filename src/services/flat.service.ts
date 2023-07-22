import { FlatModel } from '../models/flat.model'
import { IFilterParams, IFlat } from '../types/flat.interface'
import { createFilterParams } from '../utils/create-filter-params'
import { createSortParams } from '../utils/create-sort-params'

class FlatServiceClass {
	public readonly limit_params: number = 5

	async allFlats(
		page: number,
		sort: string,
		filters: IFilterParams
	): Promise<Partial<IFlat>[]> {
		const skip_params: number = page ? (page - 1) * this.limit_params : 0
		const limit_params = page ? this.limit_params : 0
		const sortParams = createSortParams(sort)
		const filterParams = createFilterParams(filters)

		const flats = await FlatModel.find(filterParams)
			.skip(skip_params)
			.sort(sortParams)
			.limit(limit_params)

		return flats
	}

	async oneFlat(id: string): Promise<Partial<IFlat> | null> {
		const flat = await FlatModel.findById(id)

		return flat
	}

	async count(filter: IFilterParams): Promise<string> {
		const filterParams = createFilterParams(filter)
		const flats = await FlatModel.find(filterParams)
		
		return String(flats.length)
	}
}

export const FlatService = new FlatServiceClass()
