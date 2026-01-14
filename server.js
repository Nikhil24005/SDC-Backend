import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Config
import { config } from './config/config.js';
import { connectDB } from './config/database.js';

// Middleware
import { errorHandler, notFound } from './middlewares/errorHandler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import adminPeopleRoutes from './routes/admin/peopleRoutes.js';
import adminProjectRoutes from './routes/admin/projectRoutes.js';
import adminTestimonialRoutes from './routes/admin/testimonialRoutes.js';
import adminGalleryRoutes from './routes/admin/galleryRoutes.js';
import publicPeopleRoutes from './routes/public/peopleRoutes.js';
import publicProjectRoutes from './routes/public/projectRoutes.js';
import publicContactRoutes from './routes/public/contactRoutes.js';
import publicTestimonialRoutes from './routes/public/testimonialRoutes.js';
import publicGalleryRoutes from './routes/public/galleryRoutes.js';

// Load env vars
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// CORS
app.use(cors(config.cors));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Compression
app.use(compression());

// Logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/people', adminPeopleRoutes);
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/testimonials', adminTestimonialRoutes);
app.use('/api/admin/gallery', adminGalleryRoutes);
app.use('/api/public/people', publicPeopleRoutes);
app.use('/api/public/projects', publicProjectRoutes);
app.use('/api/public/testimonials', publicTestimonialRoutes);
app.use('/api/public/gallery', publicGalleryRoutes);
app.use('/api/public/contact', publicContactRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: config.env
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   SDC Backend Server                  ║
  ║   Environment: ${config.env.padEnd(23)}║
  ║   Port: ${PORT.toString().padEnd(30)}║
  ║   URL: http://localhost:${PORT.toString().padEnd(15)}║
  ╚═══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
