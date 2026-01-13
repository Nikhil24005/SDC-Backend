import Testimonial from '../models/Testimonial.js';
import { AppError } from '../middlewares/errorHandler.js';

class TestimonialService {
  async getAll(filters = {}) {
    const { isActive } = filters;
    const query = {};

    if (isActive !== undefined) query.isActive = isActive;

    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    return testimonials;
  }

  async getById(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return testimonial;
  }

  async create(data) {
    const testimonial = await Testimonial.create(data);
    return testimonial;
  }

  async update(id, data) {
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    return testimonial;
  }

  async delete(id) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    return testimonial;
  }
}

export default new TestimonialService();
