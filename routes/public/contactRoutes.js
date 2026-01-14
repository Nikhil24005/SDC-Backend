import express from 'express';
import { body } from 'express-validator';
import { submitContact } from '../../controllers/public/contactController.js';
import { validate } from '../../middlewares/validator.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
  validate
];

// Public route
router.post('/', contactValidation, submitContact);

export default router;
