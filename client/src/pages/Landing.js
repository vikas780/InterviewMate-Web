import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'

import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>tracking </span>app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            dolor alias ipsam quibusdam quas ad similique quae, consequuntur
            architecto nobis sunt dicta? Pariatur blanditiis tempore quidem,
            accusantium fuga atque animi.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
