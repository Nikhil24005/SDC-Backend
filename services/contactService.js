import Contact from '../models/Contact.js';
import { AppError } from '../middlewares/errorHandler.js';

class ContactService {
  async create(data) {
    const contact = await Contact.create(data);
    return contact;
  }

  async getAll(filters = {}) {
    const { status } = filters;
    const query = {};

    if (status) query.status = status;

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    return contacts;
  }

  async getById(id) {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }
    return contact;
  }

  async updateStatus(id, status) {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    return contact;
  }

  async delete(id) {
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    return contact;
  }
}

export default new ContactService();
