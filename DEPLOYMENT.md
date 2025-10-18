# Deployment Guide - Shawn Portfolio System

## Prerequisites
- Node.js 18+
- PostgreSQL database
- Vercel account (for frontend)
- Render account (for backend + database)
- GitHub repository

## Environment Variables

### Admin Dashboard (.env)
```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_URL="https://your-admin-domain.com"
NEXTAUTH_SECRET="your-strong-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@yourdomain.com"

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Frontend URL for revalidation
FRONTEND_URL="https://your-portfolio-domain.com"
```

### Portfolio Frontend (.env.local)
```bash
ADMIN_API_URL="https://your-admin-domain.com/api"
```

## Deployment Steps

### 1. Database Setup (Render)
1. Create PostgreSQL database on Render
2. Copy connection string to `DATABASE_URL`
3. Run migrations: `npm run prisma:migrate`

### 2. Admin Dashboard (Render)
1. Connect GitHub repository to Render
2. Set build command: `npm ci && npm run prisma:generate && npm run build`
3. Set start command: `npm start`
4. Add all environment variables
5. Deploy service

### 3. Portfolio Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set framework preset: Next.js
3. Set root directory: `portfolio-frontend`
4. Add environment variables
5. Deploy

### 4. Domain Configuration
1. Add custom domain to Vercel (frontend)
2. Add custom domain to Render (admin)
3. Configure SSL certificates
4. Update NEXTAUTH_URL and FRONTEND_URL

## Post-Deployment Checklist
- [ ] Admin login works with Google OAuth
- [ ] Database connections successful
- [ ] API endpoints responding
- [ ] Frontend displays data from admin
- [ ] Revalidation triggers work
- [ ] SSL certificates active
- [ ] Custom domains configured

## Monitoring
- Check Render logs for backend issues
- Monitor Vercel deployment logs
- Test revalidation flow after content updates
- Verify database connection health

## Troubleshooting
- **Database connection issues**: Check DATABASE_URL format
- **NextAuth errors**: Verify NEXTAUTH_SECRET and OAuth credentials
- **Revalidation not working**: Check FRONTEND_URL and API connectivity
- **Build failures**: Ensure all dependencies are in package.json
