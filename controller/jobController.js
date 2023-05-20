import Job from '../models/Jobs.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/badRequest.js'
import NotFoundError from '../errors/notFound.js'
import checkPermission from '../utils/checkPermission.js'

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const showStats = async (req, res) => {
  res.send('Get jobs')
}

const createJob = async (req, res) => {
  const { company, position } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
  const { id: jobId } = req.params

  const { company, position } = req.body
  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }
  const IsjobPresent = await Job.findOne({ _id: jobId })
  if (!IsjobPresent) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  checkPermission(req.user, IsjobPresent.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`)
  }

  checkPermission(req.user, job.createdBy)
  const jobDeleted = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  })
  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}
export { getAllJobs, showStats, createJob, updateJob, deleteJob }
