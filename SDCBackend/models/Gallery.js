import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please provide an image']
  },
  category: {
    type: String,
    enum: ['EVENT', 'WORKSHOP', 'HACKATHON', 'MEETUP', 'OTHER'],
    default: 'OTHER',
    uppercase: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
gallerySchema.index({ category: 1, date: -1 });

export default mongoose.model('Gallery', gallerySchema);
