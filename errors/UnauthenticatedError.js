import { StatusCodes } from 'http-status-codes'
import { CustomError } from './customError.js'

class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
export default UnauthenticatedError
