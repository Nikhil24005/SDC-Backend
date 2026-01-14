import projectService from '../../services/projectService.js';

// @desc    Get all projects
// @route   GET /api/admin/projects
// @access  Private/Admin
export const getAllProjects = async (req, res, next) => {
  try {
    const { status, isFeatured } = req.query;
    const projects = await projectService.getAll({ status, isFeatured });

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
// @route   GET /api/admin/projects/:id
// @access  Private/Admin
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

// @desc    Create new project
// @route   POST /api/admin/projects
// @access  Private/Admin
export const createProject = async (req, res, next) => {
  try {
    // Handle multiple image uploads
    if (req.files) {
      const images = req.files.map(file => `/uploads/projects/${file.filename}`);
      req.body.images = images;
      if (images.length > 0) {
        req.body.thumbnail = images[0]; // First image as thumbnail
      }
    }

    // Parse arrays from string if needed
    if (typeof req.body.technologies === 'string') {
      req.body.technologies = JSON.parse(req.body.technologies);
    }
    if (typeof req.body.teamMembers === 'string') {
      req.body.teamMembers = JSON.parse(req.body.teamMembers);
    }

    const project = await projectService.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res, next) => {
  try {
    // Handle multiple image uploads
    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => `/uploads/projects/${file.filename}`);
      req.body.images = images;
      if (images.length > 0) {
        req.body.thumbnail = images[0];
      }
    }

    // Parse arrays from string if needed
    if (typeof req.body.technologies === 'string') {
      req.body.technologies = JSON.parse(req.body.technologies);
    }
    if (typeof req.body.teamMembers === 'string') {
      req.body.teamMembers = JSON.parse(req.body.teamMembers);
    }

    const project = await projectService.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res, next) => {
  try {
    await projectService.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
