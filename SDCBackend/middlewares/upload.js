import multer from 'multer';
import path from 'path';
import { config } from '../config/config.js';
import { AppError } from './errorHandler.js';

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Different folders for different upload types
    let uploadPath = config.upload.uploadPath;
    
    if (req.baseUrl.includes('/gallery')) {
      uploadPath = path.join(uploadPath, 'gallery');
    } else if (req.baseUrl.includes('/people')) {
      uploadPath = path.join(uploadPath, 'people');
    } else if (req.baseUrl.includes('/project')) {
      uploadPath = path.join(uploadPath, 'projects');
    } else {
      uploadPath = path.join(uploadPath, 'misc');
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed (jpeg, jpg, png, gif, webp)', 400));
  }
};

// Multer configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: config.upload.maxFileSize
  },
  fileFilter: fileFilter
});

// Error handling for multer
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('File size is too large. Maximum size is 5MB', 400));
    }
    return next(new AppError(err.message, 400));
  }
  next(err);
};
