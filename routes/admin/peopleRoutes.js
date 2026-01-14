import express from 'express';
import { body } from 'express-validator';
import {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} from '../../controllers/admin/peopleController.js';
import { protect, authorize } from '../../middlewares/auth.js';
import { upload, handleMulterError } from '../../middlewares/upload.js';
import { validate } from '../../middlewares/validator.js';

const router = express.Router();

// Validation rules
const peopleValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['TEAM', 'FACULTY', 'ALUMNI', 'GOLDEN_ALUMNI'])
    .withMessage('Invalid category'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  validate
];

// Apply authentication and authorization to all routes
router.use(protect);
router.use(authorize('ADMIN'));

// Routes
router
  .route('/')
  .get(getAllPeople)
  .post(upload.single('image'), handleMulterError, peopleValidation, createPerson);

router
  .route('/:id')
  .get(getPerson)
  .put(upload.single('image'), handleMulterError, peopleValidation, updatePerson)
  .delete(deletePerson);

export default router;
