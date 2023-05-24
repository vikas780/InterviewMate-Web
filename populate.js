import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Job from './models/Jobs.js'
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Job.deleteMany()

    const jsonProducats = JSON.parse(
      await readFile(new URL('./MOCK_DATA.json', import.meta.url))
    )
    await Job.create(jsonProducats)
    console.log('Sucess!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
