import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

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

// app.get('/', (req, res) => {
//   res.send('Hello from Express (Backend!)')
// })
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

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
