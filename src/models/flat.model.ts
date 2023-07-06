import { Schema, model } from 'mongoose'


const flatSchema = new Schema({
	floor: { type: Number, require: true },
	pos_on_floor: { type: Number, require: true },
	price: { type: Number, require: true },
	rooms: { type: Number, require: true },
	area_total: { type: Number, require: true },
	area_kitchen: { type: Number, require: true },
	area_live: { type: Number, require: true },
	layout_image: { type: String, require: true }
})

export const FlatModel = model('flat', flatSchema)
