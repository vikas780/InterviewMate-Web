import { UseAppContext } from '../context/AppContext.js'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
  const { getAllJobs, jobs, isLoading, page, totalJobs } = UseAppContext()
  useEffect(() => {
    getAllJobs()
  }, [])
  if (isLoading) {
    return <Loading center={'center'} />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((jb) => {
          return <Job key={jb._id} {...jb} />
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer
