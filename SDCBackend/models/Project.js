import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  thumbnail: {
    type: String,
    default: null
  },
  githubUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['ONGOING', 'COMPLETED', 'ARCHIVED'],
    default: 'ONGOING',
    uppercase: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  teamMembers: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ status: 1, isFeatured: 1, order: 1 });

export default mongoose.model('Project', projectSchema);
