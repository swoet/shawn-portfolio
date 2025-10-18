# Development Guide - Shawn Portfolio System

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Start PostgreSQL (if using Docker)
docker compose up -d

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database
npm run prisma:studio
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Fill in your environment variables
# See DEPLOYMENT.md for required variables
```

### 4. Development Servers
```bash
# Start both apps in development mode
npm run dev

# Or start individually:
npm run dev:admin     # Admin dashboard on :3000
npm run dev:frontend  # Portfolio frontend on :3001
```

## Project Structure
```
├── admin-dashboard/          # Next.js admin app
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities (prisma, auth)
│   └── public/              # Static assets
├── portfolio-frontend/       # Next.js portfolio app
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities (fetcher, constants)
│   └── public/              # Static assets
├── shared/                  # Shared types and utilities
│   └── src/                 # TypeScript modules
├── prisma/                  # Database schema
└── .github/workflows/       # CI/CD configuration
```

## Key Features

### Admin Dashboard
- **Authentication**: NextAuth with Email + Google OAuth
- **CRUD Operations**: Projects, Videos, CV sections
- **File Uploads**: Cloudinary integration ready
- **Revalidation**: Triggers frontend cache updates
- **UI Components**: shadcn/ui with Tailwind CSS

### Portfolio Frontend
- **Animated UI**: Framer Motion book-flip navigation
- **ISR Caching**: Incremental Static Regeneration with tags
- **Responsive Design**: Mobile-first Tailwind CSS
- **Performance**: Optimized images and lazy loading

### Shared Infrastructure
- **Type Safety**: Shared TypeScript types
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Next.js ISR with revalidation tags
- **CI/CD**: GitHub Actions for automated deployment

## Development Workflow

### Adding New Content Types
1. Update Prisma schema in `prisma/schema.prisma`
2. Add types to `shared/src/types.ts`
3. Create API routes in `admin-dashboard/app/api/`
4. Add admin UI pages in `admin-dashboard/app/dashboard/`
5. Create frontend display components
6. Run migrations: `npm run prisma:migrate`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow shadcn/ui component patterns
- Maintain consistent spacing (4, 6, 8px grid)
- Use semantic color names (blue-600, gray-900)

### Animation Guidelines
- Use Framer Motion for complex animations
- Keep animations under 300ms for micro-interactions
- Use easing functions: "easeInOut", "easeOut"
- Prefer transform properties over layout changes

## Testing
```bash
# Lint all workspaces
npm run lint

# Format code
npm run format

# Type checking
npx tsc --noEmit
```

## Database Management
```bash
# View database in browser
npm run prisma:studio

# Reset database (development only)
npx prisma migrate reset

# Generate new migration
npx prisma migrate dev --name migration-name
```

## Troubleshooting
- **Port conflicts**: Change ports in package.json scripts
- **Database issues**: Check Docker container status
- **Type errors**: Regenerate Prisma client
- **Build failures**: Clear .next directories and reinstall
