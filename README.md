# SDC Website

Full-stack web application for SDC (Software Development Club) with separate backend and frontend.

## Project Structure

```
├── SDCBackend/          # Node.js/Express backend API
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── middlewares/     # Custom middlewares
│
└── SDCFrontend/         # React frontend
    ├── src/
    │   ├── api/         # API integration
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── routes/      # Route configuration
    │   └── utils/       # Utility functions
    └── public/          # Static assets
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd SDCBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (see `.env.example` for reference)

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd SDCFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with backend API URL

4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Features

- User authentication with JWT
- Admin dashboard
- Gallery management
- Project showcase
- Testimonials
- Contact form
- People/Team management
- Career applications

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File uploads)

**Frontend:**
- React
- Vite
- Axios
- React Router

## License

Private project
