import express from 'express';
import { body } from 'express-validator';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../../controllers/admin/projectController.js';
import { protect, authorize } from '../../middlewares/auth.js';
import { upload, handleMulterError } from '../../middlewares/upload.js';
import { validate } from '../../middlewares/validator.js';

const router = express.Router();

// Validation rules
const projectValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  validate
];

// Apply authentication and authorization to all routes
router.use(protect);
router.use(authorize('ADMIN'));

// Routes
router
  .route('/')
  .get(getAllProjects)
  .post(upload.array('images', 5), handleMulterError, projectValidation, createProject);

router
  .route('/:id')
  .get(getProject)
  .put(upload.array('images', 5), handleMulterError, projectValidation, updateProject)
  .delete(deleteProject);

export default router;
