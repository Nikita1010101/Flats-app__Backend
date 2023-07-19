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

export interface IFilters {
	floor_from: number
	floor_to: number
	rooms_from: number
	rooms_to: number
	area_total_from: number
	area_total_to: number
	area_live_from: number
	area_live_to: number
	area_kitchen_from: number
	area_kitchen_to: number
	price_from: number
	price_to: number
}
