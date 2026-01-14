import testimonialService from '../../services/testimonialService.js';

// @desc    Get all testimonials
// @route   GET /api/public/testimonials
// @access  Public
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await testimonialService.getAll({ isActive: true });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single testimonial
// @route   GET /api/public/testimonials/:id
// @access  Public
export const getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await testimonialService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};
