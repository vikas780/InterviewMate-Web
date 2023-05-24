import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: [
        'Applied',
        'Interview',
        'Declined',
        'Interview_Done',
        'Offer_Accepted',
        'Offer_Rejected',
      ],
      default: 'Applied',
    },

    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Internship'],
      default: 'Full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true } //CreatedAt
)
export default mongoose.model('Job', JobSchema)
