import express from 'express';
import { body } from 'express-validator';
import {
  getAllTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../../controllers/admin/testimonialController.js';
import { protect, authorize } from '../../middlewares/auth.js';
import { upload, handleMulterError } from '../../middlewares/upload.js';
import { validate } from '../../middlewares/validator.js';

const router = express.Router();

// Validation rules
const testimonialValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('message').notEmpty().withMessage('Message is required'),
  validate
];

// Apply authentication and authorization to all routes
router.use(protect);
router.use(authorize('ADMIN'));

// Routes
router
  .route('/')
  .get(getAllTestimonials)
  .post(upload.single('image'), handleMulterError, testimonialValidation, createTestimonial);

router
  .route('/:id')
  .get(getTestimonial)
  .put(upload.single('image'), handleMulterError, testimonialValidation, updateTestimonial)
  .delete(deleteTestimonial);

export default router;
