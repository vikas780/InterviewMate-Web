import UnauthorizedError from '../errors/UnauthenticatedError.js'

const checkPermission = (requestUSer, resourceUSer) => {
  if (requestUSer.userId === resourceUSer.toString()) return
  throw new UnauthorizedError('Not authorized to access this route')
}

export default checkPermission
