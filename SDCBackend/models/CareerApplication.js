import mongoose from 'mongoose';

const careerApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please provide a position'],
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  resume: {
    type: String,
    default: null
  },
  linkedIn: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED'],
    default: 'PENDING',
    uppercase: true
  }
}, {
  timestamps: true
});

// Index for faster queries
careerApplicationSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('CareerApplication', careerApplicationSchema);
