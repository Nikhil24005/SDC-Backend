# SDC Backend - Node.js/Express API

Complete Node.js backend for the Software Developers Community (SDC) website. Built with Express.js, MongoDB, JWT authentication, and follows MVC architecture.

## 🚀 Features

- **RESTful API**: Clean REST API architecture
- **Authentication**: JWT-based authentication with HTTP-only cookies
- **Authorization**: Role-based access control (ADMIN)
- **File Upload**: Image upload support with Multer
- **Validation**: Request validation using express-validator
- **Error Handling**: Global error handling middleware
- **Security**: Helmet, CORS, rate limiting
- **Database**: MongoDB with Mongoose ODM
- **Environment Config**: Centralized configuration

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- npm >= 9.0.0

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
cd SDCBackend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/sdc_database

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# CORS
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Create Upload Directories

```bash
mkdir uploads
mkdir uploads/people
mkdir uploads/projects
mkdir uploads/gallery
mkdir uploads/misc
```

Or create a `.gitkeep` file:
```bash
New-Item -ItemType Directory -Force -Path uploads/people, uploads/projects, uploads/gallery, uploads/misc
New-Item -ItemType File -Path uploads/.gitkeep
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud) and update `MONGODB_URI` in `.env`

### 5. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

## 📁 Project Structure

```
SDCBackend/
├── config/
│   ├── config.js           # Application configuration
│   └── database.js         # MongoDB connection
├── controllers/
│   ├── authController.js   # Authentication controllers
│   ├── admin/              # Admin controllers
│   │   ├── peopleController.js
│   │   └── projectController.js
│   └── public/             # Public controllers
│       ├── peopleController.js
│       ├── projectController.js
│       └── contactController.js
├── middlewares/
│   ├── auth.js             # Authentication & authorization
│   ├── errorHandler.js     # Global error handler
│   ├── upload.js           # File upload (Multer)
│   └── validator.js        # Request validation
├── models/
│   ├── User.js
│   ├── People.js
│   ├── Project.js
│   ├── Testimonial.js
│   ├── Gallery.js
│   ├── FAQ.js
│   ├── CareerApplication.js
│   └── Contact.js
├── routes/
│   ├── authRoutes.js
│   ├── admin/
│   │   ├── peopleRoutes.js
│   │   └── projectRoutes.js
│   └── public/
│       ├── peopleRoutes.js
│       ├── projectRoutes.js
│       └── contactRoutes.js
├── services/
│   ├── authService.js      # Business logic for auth
│   ├── peopleService.js
│   ├── projectService.js
│   └── contactService.js
├── uploads/                # Uploaded files
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── server.js               # Application entry point
```

## 🔐 Authentication

### Register Admin User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@sdc.com",
  "password": "Admin@123",
  "role": "ADMIN"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@sdc.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "data": {
    "id": "user-id",
    "name": "Admin User",
    "email": "admin@sdc.com",
    "role": "ADMIN"
  }
}
```

The JWT token is automatically stored in an HTTP-only cookie named `token`.

### Logout

```bash
POST /api/auth/logout
Cookie: token=jwt-token-here
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Admin Routes (Protected - Requires Authentication)

#### People Management
- `GET /api/admin/people` - Get all people
- `GET /api/admin/people/:id` - Get single person
- `POST /api/admin/people` - Create person (with image upload)
- `PUT /api/admin/people/:id` - Update person
- `DELETE /api/admin/people/:id` - Delete person

#### Project Management
- `GET /api/admin/projects` - Get all projects
- `GET /api/admin/projects/:id` - Get single project
- `POST /api/admin/projects` - Create project (with images)
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

### Public Routes (No Authentication Required)

#### People
- `GET /api/public/people` - Get all active people
- `GET /api/public/people/team` - Get team members
- `GET /api/public/people/faculty` - Get faculty
- `GET /api/public/people/alumni` - Get alumni
- `GET /api/public/people/golden-alumni` - Get golden alumni

#### Projects
- `GET /api/public/projects` - Get all completed projects
- `GET /api/public/projects/featured` - Get featured projects
- `GET /api/public/projects/:id` - Get project details

#### Contact
- `POST /api/public/contact` - Submit contact form

## 🖼️ File Upload Examples

### Create Person with Image

```bash
POST /api/admin/people
Content-Type: multipart/form-data
Cookie: token=jwt-token-here

Form Data:
- name: "John Doe"
- email: "john@example.com"
- designation: "Software Engineer"
- category: "TEAM"
- bio: "Experienced developer..."
- image: [file]
```

### Create Project with Multiple Images

```bash
POST /api/admin/projects
Content-Type: multipart/form-data
Cookie: token=jwt-token-here

Form Data:
- title: "Project Name"
- description: "Project description..."
- category: "Web Development"
- technologies: ["React", "Node.js"]
- images: [file1, file2, file3]
```

## 🔧 Frontend Integration

Update your frontend axios configuration to work with the backend:

### Frontend: `src/api/config.js`

```javascript
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Frontend: `src/api/axios.js`

```javascript
import axios from 'axios';
import { API_BASE_URL } from './config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
```

### Frontend: Admin Login Example

```javascript
// src/api/Admin/login.js
import axiosInstance from '../axios';

export const loginAdmin = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};
```

### Frontend: Admin People API Example

```javascript
// src/api/Admin/People/getPeople.js
import axiosInstance from '../../axios';

export const getPeople = async () => {
  const response = await axiosInstance.get('/admin/people');
  return response.data;
};

export const createPerson = async (formData) => {
  const response = await axiosInstance.post('/admin/people', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
```

## 🧪 Testing the API

### Using cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sdc.com","password":"Admin@123"}' \
  -c cookies.txt

# Get People (with authentication)
curl -X GET http://localhost:5000/api/admin/people \
  -b cookies.txt

# Create Person with Image
curl -X POST http://localhost:5000/api/admin/people \
  -b cookies.txt \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "designation=Developer" \
  -F "category=TEAM" \
  -F "image=@/path/to/image.jpg"
```

### Using Postman

1. **Login:**
   - POST `http://localhost:5000/api/auth/login`
   - Body: JSON `{"email":"admin@sdc.com","password":"Admin@123"}`
   - Cookie `token` will be automatically saved

2. **Create Person:**
   - POST `http://localhost:5000/api/admin/people`
   - Body: form-data
   - Add fields: name, email, designation, category
   - Add file: image
   - Cookies are automatically sent

## 🛡️ Security Features

- **Helmet**: Sets security HTTP headers
- **CORS**: Configured for specific origins
- **Rate Limiting**: Prevents brute-force attacks
- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **Input Validation**: express-validator
- **File Upload Validation**: File type and size limits

## 📊 Database Models

### People Categories
- `TEAM` - Current team members
- `FACULTY` - Faculty members
- `ALUMNI` - Alumni
- `GOLDEN_ALUMNI` - Golden alumni

### Project Status
- `ONGOING` - Active projects
- `COMPLETED` - Finished projects
- `ARCHIVED` - Archived projects

### Contact Status
- `UNREAD` - New messages
- `READ` - Read messages
- `REPLIED` - Replied messages

## 🐛 Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
JWT_SECRET=your-production-secret-key-very-long-and-secure
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Use MongoDB Atlas or production database
- [ ] Configure proper CORS origins
- [ ] Set up proper file storage (AWS S3, Cloudinary)
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## 📝 Additional Modules to Implement

You can extend this backend with:

### Testimonials
- Create: `routes/admin/testimonialRoutes.js`
- Model already exists: `models/Testimonial.js`

### Gallery
- Create: `routes/admin/galleryRoutes.js`
- Model already exists: `models/Gallery.js`

### FAQ
- Create: `routes/admin/faqRoutes.js`
- Model already exists: `models/FAQ.js`

### Career Applications
- Create: `routes/admin/careerRoutes.js`
- Model already exists: `models/CareerApplication.js`

Follow the same pattern as People and Projects modules.

## 🤝 Support

For issues or questions:
- Check the error logs in the console
- Verify environment variables
- Ensure MongoDB is running
- Check CORS configuration matches frontend URL

## 📄 License

[Add your license information]

---

**Built with ❤️ for the Software Developers Community**
