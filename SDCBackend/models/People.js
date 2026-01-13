import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Please provide a designation'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['TEAM', 'FACULTY', 'ALUMNI', 'GOLDEN_ALUMNI'],
    uppercase: true
  },
  bio: {
    type: String,
    trim: true
  },
  image: {
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
  twitter: {
    type: String,
    trim: true
  },
  // Alumni specific fields
  company: {
    type: String,
    trim: true
  },
  package: {
    type: String,
    trim: true
  },
  graduationYear: {
    type: Number
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
peopleSchema.index({ category: 1, order: 1 });

export default mongoose.model('People', peopleSchema);
