import Project from '../models/Project.js';
import { AppError } from '../middlewares/errorHandler.js';

class ProjectService {
  async getAll(filters = {}) {
    const { status, isFeatured } = filters;
    const query = {};

    if (status) query.status = status;
    if (isFeatured !== undefined) query.isFeatured = isFeatured;

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    return projects;
  }

  async getById(id) {
    const project = await Project.findById(id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return project;
  }

  async create(data) {
    const project = await Project.create(data);
    return project;
  }

  async update(id, data) {
    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return project;
  }

  async delete(id) {
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return project;
  }

  async getFeatured() {
    const projects = await Project.find({ 
      isFeatured: true,
      status: 'COMPLETED'
    }).sort({ order: 1 }).limit(6);
    
    return projects;
  }
}

export default new ProjectService();
