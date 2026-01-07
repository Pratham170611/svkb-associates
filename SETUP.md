# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   ```

3. **Set Up Database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Website**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin
   - Admin Login:
     - Email: `admin@svkbassociates.com`
     - Password: `admin123`

## Important Notes

- **Change Admin Credentials**: The default admin password is for development only. Change it in production!
- **Database**: The project uses SQLite by default. For production, consider switching to PostgreSQL or MySQL.
- **Authentication**: The current authentication uses localStorage. For production, implement proper session management with NextAuth.js or similar.

## Features

✅ **Frontend**
- Hero section with bold positioning
- Services overview
- How we work section
- Case studies & results
- Testimonials
- About section
- Booking form
- Contact form
- FAQ section
- Strong CTA blocks
- Professional footer

✅ **Admin Dashboard**
- Services management
- Case studies management
- Testimonials management
- Leads & bookings management
- Dashboard with statistics

✅ **Backend**
- RESTful API routes
- Database with Prisma ORM
- Pre-loaded placeholder content

## Security Status

✅ **Fixed**: Critical Next.js security vulnerability (updated to 14.2.35)
✅ **Production**: No vulnerabilities in production dependencies (`npm audit --production` shows 0 vulnerabilities)
⚠️ **Development Only**: 3 high-severity vulnerabilities in dev dependencies (ESLint tools). These:
- Do NOT affect production builds
- Are only in development/linting tools
- Would require upgrading to Next.js 16 (breaking change) to fix

**Recommendation**: Safe to proceed. The production build is secure. The dev dependency vulnerabilities can be addressed later if needed.

## Production Deployment

1. Update environment variables
2. Change admin credentials
3. Switch to production database (PostgreSQL/MySQL)
4. Implement proper authentication
5. Set up proper session management
6. Configure SEO settings
7. Add proper error handling and logging
8. Run `npm audit` and address any production dependencies vulnerabilities

