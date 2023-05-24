import { useEffect } from 'react'
import { UseAppContext } from '../../context/AppContext.js'
import { StatsContainer, Loading, Charts } from '../../components'

const Stats = () => {
  const { ShowStats, isLoading, monthlyApplications } = UseAppContext()
  useEffect(() => {
    ShowStats()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <Charts />}
    </>
  )
}

export default Stats
