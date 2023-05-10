import express from 'express'
const router = express.Router()

import {
  getAllJobs,
  showStats,
  createJob,
  updateJob,
  deleteJob,
} from '../controller/jobController.js'

router.route('/').get(getAllJobs).post(createJob)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
