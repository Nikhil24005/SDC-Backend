import projectService from '../../services/projectService.js';

// @desc    Get all projects
// @route   GET /api/public/projects
// @access  Public
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAll({ status: 'COMPLETED' });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured projects
// @route   GET /api/public/projects/featured
// @access  Public
export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getFeatured();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/public/projects/:id
// @access  Public
export const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};
