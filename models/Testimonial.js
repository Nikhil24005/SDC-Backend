import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Please provide a designation'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide a testimonial message'],
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
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
testimonialSchema.index({ isActive: 1, order: 1 });

export default mongoose.model('Testimonial', testimonialSchema);
