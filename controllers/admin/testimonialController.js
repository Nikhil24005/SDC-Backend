import testimonialService from '../../services/testimonialService.js';

// @desc    Get all testimonials
// @route   GET /api/admin/testimonials
// @access  Private/Admin
export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await testimonialService.getAll();

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
// @route   GET /api/admin/testimonials/:id
// @access  Private/Admin
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

// @desc    Create new testimonial
// @route   POST /api/admin/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res, next) => {
  try {
    // Add image path if file was uploaded
    if (req.file) {
      req.body.image = `/uploads/misc/${req.file.filename}`;
    }

    const testimonial = await testimonialService.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/admin/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res, next) => {
  try {
    // Add image path if file was uploaded
    if (req.file) {
      req.body.image = `/uploads/misc/${req.file.filename}`;
    }

    const testimonial = await testimonialService.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res, next) => {
  try {
    await testimonialService.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
