import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/badRequest.js'

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.create({ name, email, password })
  const token = user.createjwt()
  console.log(req.body)

  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
    })

  //next(error) //Pass error to next middleware
}

const login = async (req, res) => {
  res.status(200).send('Hello from Login')
}

const updateUser = async (req, res) => {
  res.status(200).send('Hello from Update user')
}

export { register, login, updateUser }
