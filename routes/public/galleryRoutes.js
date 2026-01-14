import express from 'express';
import {
  getGallery,
  getGalleryItem
} from '../../controllers/public/galleryController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getGallery);
router.get('/:id', getGalleryItem);

export default router;
