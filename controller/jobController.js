const getAllJobs = async (req, res) => {
  res.send('GetAlljobs')
  // res.send('All jobs')
}

const showStats = async (req, res) => {
  res.send('Get jobs')
}

const createJob = async (req, res) => {
  res.send('Create job ')
  //res.json(req.body)
}
const updateJob = async (req, res) => {
  res.send('Update jobs')
}
const deleteJob = async (req, res) => {
  res.send('Delete job')
}
export { getAllJobs, showStats, createJob, updateJob, deleteJob }
