# Geek Academy - Deployment Guide

This guide covers deploying Geek Academy to production on popular hosting platforms.

## Overview

Geek Academy is a fullstack application:
- **Frontend**: React + Vite → Deploy to Vercel/Netlify
- **Backend**: Node.js + Express → Deploy to Railway/Render
- **Database**: MongoDB Atlas (Cloud)

## Prerequisites

Before deploying:
- [ ] MongoDB Atlas account and cluster created
- [ ] Git repository (GitHub, GitLab, Bitbucket)
- [ ] Frontend hosting account (Vercel or Netlify)
- [ ] Backend hosting account (Railway or Render)

## Step 1: MongoDB Atlas Setup

### Create a Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click "Create" to build a new cluster
4. Choose free tier (M0)
5. Select your region (choose closest to your users)
6. Click "Create Cluster" and wait for provisioning

### Create Database User

1. In the left menu, go to "Database Access"
2. Click "Add New Database User"
3. Enter username and password
4. Set permissions: "Atlas admin"
5. Click "Add User"

### Whitelist IPs

1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0) for development
4. For production, add specific IPs only
5. Click "Confirm"

### Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `geek-academy`

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/geek-academy?retryWrites=true&w=majority
```

## Step 2: Backend Deployment (Railway)

### Push Code to GitHub

```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit: Geek Academy fullstack app"
git remote add origin https://github.com/yourusername/geek-academy.git
git push -u origin main
```

### Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `geek-academy` repository
6. Railway auto-detects Node.js backend
7. Click "Deploy"

### Configure Environment Variables

1. In Railway project, go to "Variables"
2. Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=use_a_strong_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-domain.com
   ```
3. Click "Save"

### Get Backend URL

1. Go to your Railway deployment
2. Click "Settings"
3. Copy the public URL (e.g., https://geek-academy-backend.railway.app)
4. Save this - you'll need it for frontend

## Step 3: Frontend Deployment (Vercel)

### Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/log in with GitHub
3. Click "Add New..." → "Project"
4. Select `geek-academy` repository
5. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Add Environment Variables

1. In Vercel project, go to "Settings" → "Environment Variables"
2. Add:
   ```
   VITE_API_URL = https://your-backend-url.railway.app
   ```
3. Click "Save"
4. Redeploy the project

### Redeploy to Apply Variables

1. Go to "Deployments"
2. Find the latest deployment
3. Click the three dots menu
4. Select "Redeploy"

## Step 4: DNS & Custom Domain

### For Frontend (Vercel)

1. In Vercel, go to "Settings" → "Domains"
2. Add your custom domain
3. Update your domain registrar's nameservers to:
   - `ns1.vercel.com`
   - `ns2.vercel.com`
   - `ns3.vercel.com`
   - `ns4.vercel.com`

### For Backend (Railway)

1. In Railway, go to "Settings"
2. Look for "Public URL" or "Custom Domain"
3. Add your backend domain (e.g., api.yourdomain.com)
4. Update domain registrar DNS records:
   ```
   CNAME: api.yourdomain.com → your-railway-url
   ```

## Step 5: Update Frontend Configuration

Once backend is live:

1. Go to Vercel project settings
2. Update `VITE_API_URL` to production backend URL
3. Redeploy the application

## Step 6: Test Production

1. Visit your frontend domain
2. Test signup/login flow
3. Test course browsing
4. Test course enrollment
5. Check browser console for errors
6. Monitor backend logs

## Production Checklist

- [ ] MongoDB Atlas cluster created and seeded
- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] Tested authentication flow
- [ ] Tested course enrollment
- [ ] HTTPS working on both domains
- [ ] Error logging setup
- [ ] Database backups scheduled

## Monitoring

### Railway Backend Monitoring

1. Go to Railway project dashboard
2. Check "Metrics" tab
3. Monitor memory, CPU, and requests
4. Check "Logs" for errors

### Vercel Frontend Monitoring  

1. Go to Vercel project dashboard
2. Check "Analytics" tab
3. Monitor page views and errors
4. Check "Logs" for build errors

### MongoDB Atlas Monitoring

1. Go to MongoDB Atlas cluster
2. Check "Monitoring" tab
3. Monitor queries and connections
4. Set up alerts for issues

## Scaling & Optimization

### Frontend (Vercel)

- Enable automatic scaling
- Use edge functions for performance
- Enable analytics monitoring

### Backend (Railway)

- Monitor CPU and memory usage
- Scale vertically if needed
- Implement caching strategies
- Use database indexes

### Database (MongoDB)

- Monitor query performance
- Create indexes for frequent queries
- Use connection pooling
- Set up automated backups

## Troubleshooting

### Backend Deployment Issues

**502 Bad Gateway Error**
- Check server logs in Railway
- Verify environment variables are set
- Ensure MongoDB connection is working
- Check port configuration

**Connection Refused**
- Verify MongoDB connection string
- Check MongoDB Atlas IP whitelist
- Verify network connectivity

### Frontend Deployment Issues

**CORS Errors**
- Check `FRONTEND_URL` in backend .env matches frontend domain
- Ensure CORS middleware is enabled
- Verify API URL in frontend .env

**API Connection Failing**
- Check `VITE_API_URL` is set correctly
- Verify backend is running
- Check network tab in browser dev tools

### Authentication Issues

**Loginbuts showing "Error"**
- Check JWT_SECRET matches between environments
- Verify MongoDB has users collection
- Check browser console for error details

## Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use strong JWT secrets
   - Rotate secrets periodically

2. **Database**
   - Use IP whitelist (not 0.0.0.0)
   - Enable encryption at rest
   - Set up automated backups
   - Use strong passwords

3. **CORS**
   - Only allow frontend domain
   - Use HTTPS everywhere
   - Implement rate limiting

4. **API Security**  
   - Validate all inputs
   - Use HTTPS only
   - Implement request throttling
   - Set secure headers

## Maintenance

### Weekly
- Monitor error logs
- Check database performance
- Review user feedback

### Monthly
- Update dependencies
- Review security patches
- Backup database manually
- Check SSL certificate expiration

### Quarterly
- Performance optimization
- Code review and refactoring
- Update documentation

## Rollback Procedures

### Vercel Frontend
1. Go to "Deployments"
2. Select previous deployment
3. Click "Redeploy"

### Railway Backend
1. Go to "Deployments"
2. Select previous deployment
3. Click "Deploy"

## Support

For deployment issues:
1. Check service status pages
2. Review deployment logs
3. Check platform documentation
4. Contact platform support

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Deployment Complete!** 🚀

Your Geek Academy platform is now live and ready for users!
