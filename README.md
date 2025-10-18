# Shawn Mutogo Portfolio System

A complete portfolio management system with admin dashboard and public frontend, featuring real-time content updates and modern design.

## 🚀 System Overview

This portfolio system consists of two main components:

### 1. **Admin Dashboard** (`/admin-dashboard`)
- **Next.js 15** with App Router
- **Prisma ORM** with SQLite database
- **Real-time content management** for projects, videos, and CV
- **Server-Sent Events** for live updates
- **Modern UI** with Tailwind CSS and custom components

### 2. **Portfolio Frontend** (`/portfolio-frontend`)
- **Static HTML/CSS/JavaScript** portfolio website
- **API integration** with fallback to GitHub
- **Real-time updates** via Server-Sent Events
- **Responsive design** optimized for performance

## ✨ Features

- **🎛️ Complete Admin Dashboard**: Manage projects, videos, CV sections
- **🔄 Real-time Sync**: Changes in admin instantly reflect on frontend
- **📱 Responsive Design**: Works perfectly on all devices
- **🎨 Modern UI**: Professional dark theme with animations
- **📊 Analytics Ready**: Built-in support for tracking and monitoring
- **🔧 Easy Deployment**: Optimized for Netlify, Vercel, and other platforms

## 🛠️ Technology Stack

### Admin Dashboard
- **Framework**: Next.js 15 with TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS + Custom Components
- **Real-time**: Server-Sent Events (SSE)
- **Authentication**: NextAuth.js (configurable)

### Portfolio Frontend
- **Core**: HTML5, CSS3, Modern JavaScript
- **API**: Fetch API with caching and fallbacks
- **Real-time**: EventSource API for live updates
- **Performance**: Optimized loading and caching strategies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Setup
```bash
git clone https://github.com/swoet/shawn-portfolio.git
cd shawn-portfolio
```

### 2. Admin Dashboard Setup
```bash
cd admin-dashboard
npm install
npx prisma db push
node prisma/real-data-seed.js
npm run dev
```

Admin dashboard will be available at: `http://localhost:3001`

### 3. Frontend Setup
```bash
cd ../portfolio-frontend
npx http-server "D:\Shawn Mutogo Portifolio\portfolio-frontend" -p 8081 -i -c-1
```

Portfolio will be available at: `http://localhost:3000`

## 📊 Real Data Integration

The system comes pre-populated with your authentic portfolio content:

### Projects
- ✅ **Decentralized Freelance Marketplace** - Blockchain platform with smart contracts
- ✅ **Charity Shopper** - E-commerce platform for social impact
- ✅ **Red Notice** - Advanced web application with interactive features
- ✅ **TechUnity Global OS** - Operating system platform

### Professional Information
- ✅ **Full Stack Developer & Blockchain Specialist**
- ✅ **Published Author** - "The Girl from My Dreams" & "The Last Origins"
- ✅ **ABMA CIOS Graduate**
- ✅ **Web3 & Blockchain Technologies Expertise**

## 🎯 Admin Dashboard Features

### Dashboard Overview
- Real-time statistics (Projects, Videos, CV sections)
- Quick action buttons
- System status monitoring

### Project Management (`/dashboard/projects`)
- Add/Edit/Delete projects
- Live URL and GitHub repository links
- Technology tags and descriptions
- Featured project toggles

### Video Management (`/dashboard/videos`)  
- Upload and manage video demonstrations
- Custom thumbnails and descriptions
- YouTube and direct video URL support

### CV Management (`/dashboard/cv`)
- Organized by section types (Experience, Education, Skills, etc.)
- Date ranges and locations
- Color-coded categories
- Order management

### Settings (`/dashboard/settings`)
- General portfolio configuration
- Social media integration
- Feature toggles
- Data export capabilities

## 🔄 Real-time Updates

The system features **Server-Sent Events** for instant synchronization:

1. **Make changes** in the admin dashboard
2. **Changes broadcast** to all connected clients
3. **Frontend updates** automatically without refresh
4. **Fallback polling** if SSE is unavailable

## 🌐 API Endpoints

### Projects API
- `GET /api/projects` - All projects
- `GET /api/projects?featured=true&limit=3` - Featured projects
- `POST /api/projects` - Create project
- `PUT /api/projects` - Update project
- `DELETE /api/projects?id={id}` - Delete project

### Videos API
- `GET /api/videos` - All videos
- `POST /api/videos` - Create video
- `PUT /api/videos` - Update video
- `DELETE /api/videos?id={id}` - Delete video

### CV API
- `GET /api/cv` - All CV sections
- `GET /api/cv?section={type}` - Sections by type
- `POST /api/cv` - Create CV section
- `PUT /api/cv` - Update CV section
- `DELETE /api/cv?id={id}` - Delete CV section

### Real-time Updates
- `GET /api/updates` - Server-Sent Events stream

## 🚀 Deployment

### Admin Dashboard (Backend)
Deploy to **Vercel**, **Netlify**, or any Node.js hosting:

```bash
cd admin-dashboard
npm run build
npm start
```

**Environment Variables:**
```env
DATABASE_URL="file:./production.db"
NEXTAUTH_URL="https://your-admin-domain.com"
NEXTAUTH_SECRET="your-secret-key"
```

### Portfolio Frontend
Deploy to **Netlify**, **Vercel**, or any static hosting:

```bash
cd portfolio-frontend
# Update API_BASE_URL in js/api-client.js to your admin domain
# Deploy the entire folder
```

## 🎨 Customization

### Styling
- **Admin**: Modify `admin-dashboard/app/globals.css` and Tailwind config
- **Frontend**: Update `portfolio-frontend/style.css`

### Content
- **Admin Dashboard**: Manage all content through the web interface
- **Database**: Direct SQLite access via Prisma Studio: `npx prisma studio`

## 📱 Mobile Responsive

Both admin dashboard and frontend are fully responsive:
- **Mobile-first design**
- **Touch-friendly interfaces**
- **Adaptive layouts**
- **Performance optimized**

## 🔐 Security Features

- **Environment variables** for sensitive data
- **CORS protection** for API endpoints
- **Input validation** on all forms
- **SQL injection protection** via Prisma
- **Authentication ready** (NextAuth.js integration)

## 🎯 Performance

- **Static frontend** for maximum speed
- **Efficient caching** with localStorage
- **Optimized API calls** with background updates
- **Lazy loading** for images and content
- **Minimal JavaScript** bundle size

## 📈 Analytics Ready

Built-in support for:
- **Google Analytics**
- **Custom event tracking**
- **Performance monitoring**
- **Error logging**

## 🤝 Contributing

This is a personal portfolio system, but feel free to:
1. Fork the repository
2. Create feature branches
3. Submit pull requests
4. Report issues

## 📞 Contact

**Shawn Mutogo**
- **Email**: shawnmutogo5@gmail.com
- **GitHub**: [@swoet](https://github.com/swoet)
- **Portfolio**: [Live Demo](https://your-portfolio-url.com)

## 📄 License

MIT License - Feel free to use this codebase as inspiration for your own portfolio system.

---

**Built with ❤️ by Shawn Mutogo** - Full Stack Developer & Blockchain Specialist