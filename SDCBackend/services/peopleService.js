import People from '../models/People.js';
import { AppError } from '../middlewares/errorHandler.js';

class PeopleService {
  async getAll(filters = {}) {
    const { category, isActive } = filters;
    const query = {};

    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive;

    const people = await People.find(query).sort({ order: 1, createdAt: -1 });
    return people;
  }

  async getById(id) {
    const person = await People.findById(id);
    if (!person) {
      throw new AppError('Person not found', 404);
    }
    return person;
  }

  async create(data) {
    const person = await People.create(data);
    return person;
  }

  async update(id, data) {
    const person = await People.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!person) {
      throw new AppError('Person not found', 404);
    }

    return person;
  }

  async delete(id) {
    const person = await People.findByIdAndDelete(id);
    
    if (!person) {
      throw new AppError('Person not found', 404);
    }

    return person;
  }

  async getByCategory(category) {
    const people = await People.find({ 
      category: category.toUpperCase(), 
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });
    
    return people;
  }
}

export default new PeopleService();
