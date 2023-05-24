import StatsItem from './StatsItem.js'
import { UseAppContext } from '../context/AppContext.js'

import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import { GiFlyingTarget, GiCrossMark } from 'react-icons/gi'
import { ImUserTie } from 'react-icons/im'
import Wrapper from '../assets/wrappers/StatsContainer'
const StatsContainer = () => {
  const { stats } = UseAppContext()
  const defaultStats = [
    {
      title: 'Applied Jobs',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Interviews Given',
      count: stats.interview_Done || 0,
      icon: <ImUserTie />,
      color: '#f18701',
      bcg: '#fbdbb3',
    },

    {
      title: 'Offer Accepted',
      count: stats.offer_Accepted || 0,
      icon: <GiFlyingTarget />,
      color: '#177d4a',
      bcg: '#a9cab3',
    },
    {
      title: 'Offer Rejected',
      count: stats.offer_Rejected || 0,
      icon: <GiCrossMark />,
      color: '#c1121f',
      bcg: '#f8cfd8',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#283d3b',
      bcg: '#bfc5c4',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
