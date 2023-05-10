import { StatusCodes } from 'http-status-codes'
import { CustomError } from './customError.js'

class NotFoundError extends CustomError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFoundError
