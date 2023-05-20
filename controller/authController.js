import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/badRequest.js'
import UnauthenticatedError from '../errors/UnauthenticatedError.js'

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.create({ name, email, password })
  const token = user.createjwt()
  console.log(req.body)

  res.status(StatusCodes.CREATED).json({
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
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnauthenticatedError('User does not exists')
  }
  const isPassMatch = user.comparePass(password)
  if (!isPassMatch) {
    throw new UnauthenticatedError('Password does not match')
  }
  const token = user.createjwt()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body
  if (!name || !email || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createjwt()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export { register, login, updateUser }
