import express from 'express';
import {
  getAllAlumni,
  getGoldenAlumni,
  getTeam,
  getFaculty,
  getAllPeople
} from '../../controllers/public/peopleController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getAllPeople);
router.get('/alumni', getAllAlumni);
router.get('/golden-alumni', getGoldenAlumni);
router.get('/team', getTeam);
router.get('/faculty', getFaculty);

export default router;
