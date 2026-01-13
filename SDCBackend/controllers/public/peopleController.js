import peopleService from '../../services/peopleService.js';

// @desc    Get all alumni
// @route   GET /api/public/people/alumni
// @access  Public
export const getAllAlumni = async (req, res, next) => {
  try {
    const alumni = await peopleService.getByCategory('ALUMNI');

    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get golden alumni
// @route   GET /api/public/people/golden-alumni
// @access  Public
export const getGoldenAlumni = async (req, res, next) => {
  try {
    const goldenAlumni = await peopleService.getByCategory('GOLDEN_ALUMNI');

    res.status(200).json({
      success: true,
      count: goldenAlumni.length,
      data: goldenAlumni
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all team members
// @route   GET /api/public/people/team
// @access  Public
export const getTeam = async (req, res, next) => {
  try {
    const team = await peopleService.getByCategory('TEAM');

    res.status(200).json({
      success: true,
      count: team.length,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all faculty
// @route   GET /api/public/people/faculty
// @access  Public
export const getFaculty = async (req, res, next) => {
  try {
    const faculty = await peopleService.getByCategory('FACULTY');

    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all people (all categories)
// @route   GET /api/public/people
// @access  Public
export const getAllPeople = async (req, res, next) => {
  try {
    const people = await peopleService.getAll({ isActive: true });

    res.status(200).json({
      success: true,
      count: people.length,
      data: people
    });
  } catch (error) {
    next(error);
  }
};
