import Wrapper from '../assets/wrappers/Navbar'
// import { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { UseAppContext } from '../context/AppContext'
import Logo from './Logo'
import { useState } from 'react'

const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = UseAppContext()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            className='btn'
            onClick={() => setShowLogout(!showLogout)('Show User')}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button onClick={logoutUser} className='dropdown-btn'>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
