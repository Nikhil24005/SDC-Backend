import User from '../models/User.js';
import { AppError } from '../middlewares/errorHandler.js';

class AuthService {
  async register(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists with this email', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'USER'
    });

    return user;
  }

  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    return user;
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export default new AuthService();
