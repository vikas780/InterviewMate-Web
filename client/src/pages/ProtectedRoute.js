import { Navigate } from 'react-router-dom'
import { UseAppContext } from '../context/AppContext'

const ProtectedRoute = ({ children }) => {
  const { user } = UseAppContext()
  if (!user) {
    return <Navigate to='/landing' />
  }
  return children
}

export default ProtectedRoute
