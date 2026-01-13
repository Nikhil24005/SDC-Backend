import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sdc_database'
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expire: process.env.JWT_EXPIRE || '7d',
    cookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE) || 7
  },
  
  cors: {
    origin: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
  },
  
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  }
};
