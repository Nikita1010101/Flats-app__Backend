import { ObjectId } from "mongodb"

export interface IFlat {
	_id: ObjectId
	floor: number
	pos_on_floor: number
	price: number
	rooms: number
	area_total: number
	area_kitchen: number
	area_live: number
	layout_image: string
}

export interface IFiltersBody {
	floor_params: [number, number]
	price_params: [number, number]
	rooms_params: [number, number]
	area_total_params: [number, number]
	area_kitchen_params: [number, number]
	area_live_params: [number, number]
}
