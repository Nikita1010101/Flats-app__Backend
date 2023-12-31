require('dotenv').config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { MainRouter } from './routers/flat.router'

const PORT = process.env.PORT || 7000

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', MainRouter)

const start = async () => {
	try {
		await mongoose.connect(String(process.env.DB_URL))
		app.listen(PORT, () => {
			console.log(`Сервер успешно запущен на ${PORT} порту`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
