import Job from '../models/Jobs.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/badRequest.js'
import NotFoundError from '../errors/notFound.js'
import checkPermission from '../utils/checkPermission.js'
import mongoose from 'mongoose'

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (status !== 'All') {
    queryObject.status = status
  }

  if (jobType !== 'All') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  //console.log(queryObject)

  let result = Job.find(queryObject)
  // console.log(result)
  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  // const page = Number(req.query.page) || 1
  // const limit = Number(req.query.limi) || 10
  // const skip = (page - 1) * limit
  // result = result.skip(skip).limit(limit)

  const jobs = await result

  // const totalJobs = await Job.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.Applied || 0,
    interview: stats.Interview || 0,
    declined: stats.Declined || 0,
    offer_Accepted: stats.Offer_Accepted || 0,
    offer_Rejected: stats.Offer_Rejected || 0,
    interview_Done: stats.Interview_Done || 0,
  }
  let monthlyApplications = []

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
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
