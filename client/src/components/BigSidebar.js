import Wrapper from '../assets/wrappers/BigSidebar'
import { UseAppContext } from '../context/AppContext'
import Navlinks from '../components/Navlinks'
import Logo from '../components/Logo'
const BigSidebar = () => {
  const { showSidebar } = UseAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
