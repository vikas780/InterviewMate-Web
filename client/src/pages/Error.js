import { Link } from 'react-router-dom'
import notFound from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={notFound} alt='Not Found' />
        <h3>Opps! Page Not Found</h3>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
