import { UseAppContext } from '../context/AppContext'
const Alert = () => {
  const { alertType, alertString } = UseAppContext()
  return <div className={`alert alert-${alertType}`}>{alertString}</div>
}

export default Alert
