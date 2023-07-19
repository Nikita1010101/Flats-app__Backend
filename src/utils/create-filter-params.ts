import { IFilters } from '../types/flat.interface'

export const createFilterParams = (body: IFilters) => {
	const {
		floor_from,
		floor_to,
		rooms_from,
		rooms_to,
		area_total_from,
		area_total_to,
		area_live_from,
		area_live_to,
		area_kitchen_from,
		area_kitchen_to,
		price_from,
		price_to
	} = body

	const sortParams = {
		$and: [
			{
				floor: {
					$gte: floor_from,
					$lte: floor_to
				}
			},
			{
				price: {
					$gte: price_from,
					$lte: price_to
				}
			},
			{
				rooms: {
					$gte: rooms_from,
					$lte: rooms_to
				}
			},
			{
				area_total: {
					$gte: area_total_from,
					$lte: area_total_to
				}
			},
			{
				area_kitchen: {
					$gte: area_kitchen_from,
					$lte: area_kitchen_to
				}
			},
			{
				area_live: {
					$gte: area_live_from,
					$lte: area_live_to
				}
			}
		]
	}

  return sortParams
}
