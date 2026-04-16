# Geek Academy - Quick Start Guide

Get Geek Academy running locally in 5 minutes!

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas))
- Git

### 2. Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new free cluster (M0)
3. Create a database user (remember username & password)
4. Whitelist your IP (0.0.0.0/0 for development)
5. Copy connection string: `mongodb+srv://user:password@cluster.mongodb.net/geek-academy`

### 3. Clone & Setup Backend

```bash
# Navigate to project
cd geek-academy

# Go to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB connection string:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/geek-academy
```

**Edit `.env` file:**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Start backend:**
```bash
npm run dev
```

✅ Backend running on `http://localhost:5000`

### 4. Setup Frontend (New Terminal)

```bash
# From geek-academy root
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

## 📝 Test the Application

1. **Open browser:** `http://localhost:5173`
2. **Sign Up:** Click "Sign Up" button
   - Fill in name, email, password
   - Create account
3. **Browse Courses:** View available courses
4. **Enroll in Course:** Click "Enroll Now" button
5. **View Modules:** See course content and modules
6. **Logout:** Click your profile menu

## 🎯 What to Try

- ✅ Sign up and log in
- ✅ Browse courses by category
- ✅ View course details and modules
- ✅ Enroll in a course
- ✅ Mark courses as interested
- ✅ See personalized recommendations
- ✅ Log out and verify persistence

## 📂 Project Structure

```
geek-academy/
├── backend/          # Express API server
├── frontend/         # React application
├── README.md         # Full documentation
└── DEPLOYMENT.md     # Deployment guide
```

## 🔧 Useful Commands

### Backend
```bash
npm run dev      # Development mode (auto-reload)
npm start        # Production mode
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Check code quality
npm run preview  # Preview build
```

## 🆘 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED
→ Check MongoDB connection string in .env
→ Verify MongoDB Atlas IP whitelist
```

### Frontend CORS errors
```
Error: No Access-Control-Allow-Origin
→ Check FRONTEND_URL in backend .env matches frontend URL
→ Verify backend is running on port 5000
```

### Can't log in
```
Error: 401 Unauthorized
→ Check username/password are correct
→ Check MongoDB has users collection
→ Clear browser localStorage and try again
```

### Courses not showing
```
→ Backend will auto-seed courses on first run
→ Check MongoDB database has courses collection
→ Verify both backend and frontend are running

## Need Help?

1. Check the full [README.md](./README.md)
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
3. Check browser console for errors (F12)
4. Check backend logs in terminal

## Next Steps

Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md)

- Deploy backend to Railway ☁️
- Deploy frontend to Vercel 🚀
- Set up MongoDB Atlas 🗄️
- Configure custom domain 🌐

---

**Happy Learning! 🎓**
