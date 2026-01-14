import Gallery from '../models/Gallery.js';
import { AppError } from '../middlewares/errorHandler.js';

class GalleryService {
  async getAll(filters = {}) {
    const { category, isActive } = filters;
    const query = {};

    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive;

    const gallery = await Gallery.find(query).sort({ date: -1, order: 1 });
    return gallery;
  }

  async getById(id) {
    const item = await Gallery.findById(id);
    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }
    return item;
  }

  async create(data) {
    const item = await Gallery.create(data);
    return item;
  }

  async update(id, data) {
    const item = await Gallery.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }

    return item;
  }

  async delete(id) {
    const item = await Gallery.findByIdAndDelete(id);
    
    if (!item) {
      throw new AppError('Gallery item not found', 404);
    }

    return item;
  }
}

export default new GalleryService();
