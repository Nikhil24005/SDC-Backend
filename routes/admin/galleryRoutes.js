import express from 'express';
import { body } from 'express-validator';
import {
  getAllGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../../controllers/admin/galleryController.js';
import { protect, authorize } from '../../middlewares/auth.js';
import { upload, handleMulterError } from '../../middlewares/upload.js';
import { validate } from '../../middlewares/validator.js';

const router = express.Router();

// Validation rules
const galleryValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  validate
];

// Apply authentication and authorization to all routes
router.use(protect);
router.use(authorize('ADMIN'));

// Routes
router
  .route('/')
  .get(getAllGallery)
  .post(upload.single('image'), handleMulterError, galleryValidation, createGalleryItem);

router
  .route('/:id')
  .get(getGalleryItem)
  .put(upload.single('image'), handleMulterError, galleryValidation, updateGalleryItem)
  .delete(deleteGalleryItem);

export default router;
