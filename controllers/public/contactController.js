import contactService from '../../services/contactService.js';

// @desc    Submit contact form
// @route   POST /api/public/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const contact = await contactService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};
