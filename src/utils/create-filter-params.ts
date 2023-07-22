import { resolveObjectURL } from 'buffer'
import { IFilterParams } from '../types/flat.interface'

export const createFilterParams = (filters: IFilterParams) => {
	if (Object.keys(filters).length === 0) {
		return {}
	}

	const { _floor, _rooms, _price, _area_total, _area_live, _area_kitchen } =
		filters

	const [floor_from, floor_to] = _floor.split(' ')
	const [rooms_from, rooms_to] = _rooms.split(' ')
	const [price_from, price_to] = _price.split(' ')
	const [area_total_from, area_total_to] = _area_total.split(' ')
	const [area_live_from, area_live_to] = _area_live.split(' ')
	const [area_kitchen_from, area_kitchen_to] = _area_kitchen.split(' ')

	const sortParams = {
		$and: [
			{
				floor: {
					$gte: floor_from,
					$lte: floor_to
				}
			},
			{
				rooms: {
					$gte: rooms_from,
					$lte: rooms_to
				}
			},
			{
				price: {
					$gte: price_from,
					$lte: price_to
				}
			},
			{
				area_total: {
					$gte: area_total_from,
					$lte: area_total_to
				}
			},
			{
				area_live: {
					$gte: area_live_from,
					$lte: area_live_to
				}
			},
			{
				area_kitchen: {
					$gte: area_kitchen_from,
					$lte: area_kitchen_to
				}
			}
		]
	}

	return sortParams
}
