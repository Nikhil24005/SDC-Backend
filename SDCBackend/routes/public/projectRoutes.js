import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getProject
} from '../../controllers/public/projectController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProject);

export default router;
