import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer'],
    trim: true
  },
  category: {
    type: String,
    enum: ['GENERAL', 'MEMBERSHIP', 'EVENTS', 'PROJECTS', 'OTHER'],
    default: 'GENERAL',
    uppercase: true
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
faqSchema.index({ category: 1, order: 1 });

export default mongoose.model('FAQ', faqSchema);
