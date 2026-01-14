import express from 'express';
import {
  getTestimonials,
  getTestimonial
} from '../../controllers/public/testimonialController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

export default router;
