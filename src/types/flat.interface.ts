import { ObjectId } from 'mongodb'

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

export interface ParsedQs {
	[key: string]: undefined | string | string[] | ParsedQs | ParsedQs[]
}

export interface ISortParams {
	_page: number
	_sort: string
}

export interface IFilterParams {
	_floor: string
	_rooms: string
	_area_total: string
	_area_live: string
	_area_kitchen: string
	_price: string
}

export type TQueryParams<TParams> = TParams & ParsedQs
