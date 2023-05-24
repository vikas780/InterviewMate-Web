import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import connectDB from './db/connect.js'
import authRouter from './Routes/authRoutes.js'
import jobRouter from './Routes/jobRoutes.js'

import notFoundMiddleware from './middleware/NotFound.js'
import errorHandler from './middleware/ErrorHandler.js'
import authenticateUser from './middleware/Auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json()) //avialbe json data in contollers
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandler)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () => {
      console.log(`server is listning on port:${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
