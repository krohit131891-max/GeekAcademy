# Geek Academy - Full Stack Learning Platform

A professional fullstack course learning platform built with React, Node.js, Express, and MongoDB. Users can browse courses, enroll in classes, and track their learning progress.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Course Catalog**: Browse 10+ professional courses across multiple categories
- **Course Modules**: Courses organized into modules with detailed lessons
- **Course Enrollment**: Authenticated enrollments with enrollment management
- **Interest Tracking**: Mark courses as interested to get personalized recommendations
- **Responsive Design**: Mobile-friendly UI that works across all devices
- **Professional UI**: Modern design with smooth interactions and animations

## 📚 Course Categories

- Web Development (React, Node.js, Express)
- Data Science (Python, Machine Learning)
- AI/ML (Deep Learning, Neural Networks)
- Mobile Development (React Native, iOS)
- Cloud Computing (AWS, Docker, Kubernetes)

## 🛠️ Tech Stack

### Frontend
- React 19.2.4
- React Router 7.14.0
- Axios 1.7.7
- Vite 8.0.4
- CSS3 with CSS Variables

### Backend
- Node.js 18+
- Express 4.19.2
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- Bcrypt (bcryptjs)
- CORS & Compression Middleware

### Database
- MongoDB Atlas (Cloud)

## 📁 Project Structure

```
geek-academy/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components (Home, Courses, Login, etc.)
│   │   ├── context/         # React Context (AuthContext)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── data/            # Static data and utilities
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static files
│   ├── index.html           # Main HTML file
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
├── backend/                  # Node.js + Express API
│   ├── models/              # MongoDB Mongoose models
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── data/                # Seed data
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   ├── .env.example         # Environment variables template
│   └── .gitignore           # Git ignore rules
│
├── .gitignore              # Root git ignore
└── README.md               # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB Atlas account (free tier available)
- Git

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file from `.env.example`:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your MongoDB Atlas connection string:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/geek-academy?retryWrites=true&w=majority
   JWT_SECRET=your_secret_key_here_change_in_production
   JWT_EXPIRE=7d
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file from `.env.example`:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` if needed:**
   ```
   VITE_API_URL=http://localhost:5000
   ```

5. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5173`

## 🌐 API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
  - Body: `{ fullName, email, password }`
  - Returns: JWT token and user data

- `POST /api/auth/login` - Login user  
  - Body: `{ email, password }`
  - Returns: JWT token and user data

- `GET /api/auth/me` - Get current user (protected)
  - Headers: `Authorization: Bearer {token}`
  - Returns: Current user details

### Course Endpoints

- `GET /api/courses` - Get all courses
  - Returns: List of all courses with modules

- `GET /api/courses/:id` - Get course details
  - Returns: Single course with full module details

- `POST /api/courses/:id/enroll` - Enroll in course (protected)
  - Headers: `Authorization: Bearer {token}`
  - Returns: Updated user with enrolled courses

- `POST /api/courses/:id/interested` - Toggle course interest (protected)
  - Headers: `Authorization: Bearer {token}`
  - Returns: Updated user with interested courses

## 🔐 Authentication Flow

1. User signs up or logs in
2. Backend generates JWT token
3. Token stored in browser localStorage
4. Token sent in Authorization header for protected routes
5. Backend verifies token validity
6. User can enroll in courses and manage interests

## 🎨 Key Features

### User Authentication
- Secure password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Auto-logout on token expiration

### Course Management
- Browse 10 professional courses
- Expandable course modules and lessons
- Course ratings and reviews
- Prerequisites and learning objectives

### User Preferences
- Mark courses as interested
- Get personalized course recommendations
- Track enrolled courses
- Local storage backup of preferences

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interfaces
- Smooth animations

## 🚀 Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```
Creates optimized build in `frontend/dist/`

### Backend Deployment
The backend is ready to deploy as-is. Use Node.js hosting platforms like:
- Railway
- Render
- Heroku (deprecated but still works)
- AWS
- DigitalOcean

## 📦 Dependencies

### Frontend
- react@19.2.4
- react-dom@19.2.4
- react-router-dom@7.14.0
- axios@1.7.7

### Backend
- express@4.19.2
- mongoose@8.3.1
- jsonwebtoken@9.1.2
- bcryptjs@2.4.3
- dotenv@16.4.5
- cors@2.8.5
- compression@1.7.4

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure `.env` file is in backend root

### CORS Errors
- Check `FRONTEND_URL` in backend `.env`
- Ensure frontend and backend are running
- Verify CORS middleware in Express

### Authentication Issues
- Clear browser localStorage and try again
- Check JWT token expiration
- Verify JWT secret matches

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

## 📄 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/geek-academy
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 🔄 Data Persistence

- User data stored in MongoDB
- Authentication tokens in browser localStorage
- Course data populated on server startup if database is empty
- Preferences synced with MongoDB for authenticated users

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check MongoDB Atlas status
4. Verify all environment variables

## 📄 License

This project is open source and available under the ISC License.

## 🎯 Future Enhancements

- Video hosting integration
- Progress tracking and certificates
- Discussion forums
- Live instructor sessions
- Mobile app (React Native)
- Advanced analytics
- Payment integration
- Social features

---

**Happy Learning! 🚀**

Built with ❤️ by the Geek Academy Team
