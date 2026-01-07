# Deployment Guide - SVKB Associates Website

## 🚀 Recommended: Deploy to Vercel (Easiest for Next.js)

Vercel is made by the Next.js team and provides the easiest deployment experience.

### Step 1: Prepare Your Code

1. Make sure all your code is pushed to GitHub (✅ Already done!)
2. Your repository should be at: `https://github.com/Pratham170611/svkb-associates`

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended - easiest)
4. Authorize Vercel to access your GitHub account

### Step 3: Deploy Your Project

1. After signing in, click **"Add New..."** → **"Project"**
2. Import your repository: `Pratham170611/svkb-associates`
3. Vercel will auto-detect it's a Next.js project
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-strong-random-secret-key-here
```

**Important Notes:**
- For production, you'll need a real database (not SQLite)
- Options: PostgreSQL (Vercel Postgres, Supabase, Railway, etc.)
- Generate a strong `NEXTAUTH_SECRET`: Use `openssl rand -base64 32` or an online generator

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://your-app-name.vercel.app`

### Step 6: Set Up Production Database

**Option A: Vercel Postgres (Easiest)**
1. In your Vercel project, go to **Storage** tab
2. Click **"Create Database"** → **"Postgres"**
3. Copy the connection string to `DATABASE_URL`

**Option B: Supabase (Free tier available)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your connection string from Settings → Database
4. Update `DATABASE_URL` in Vercel

**Option C: Railway (Free tier available)**
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Update `DATABASE_URL` in Vercel

### Step 7: Update Prisma for Production

After setting up your database, update your `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

Then run:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Step 8: Run Database Migrations

You can do this locally or via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Push database schema
npx prisma db push

# Seed database
npm run db:seed
```

---

## 🌐 Alternative Deployment Options

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy!

**Note**: Netlify works but Vercel is better optimized for Next.js.

### Option 3: Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway will auto-detect Next.js
6. Add environment variables
7. Deploy!

### Option 4: Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New"** → **"Web Service"**
4. Connect your GitHub repository
5. Settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Add environment variables
7. Deploy!

---

## 📋 Pre-Deployment Checklist

- [ ] All code pushed to GitHub
- [ ] Environment variables configured
- [ ] Production database set up (PostgreSQL)
- [ ] Prisma schema updated for PostgreSQL
- [ ] Database migrations run
- [ ] Admin credentials changed from default
- [ ] `NEXTAUTH_SECRET` is a strong random string
- [ ] `NEXTAUTH_URL` points to your production domain

---

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel (and other platforms) will automatically:
- Deploy when you push to `main` branch
- Create preview deployments for pull requests
- Roll back if deployment fails

---

## 🛠️ Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify database connection string is correct

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if database allows connections from Vercel's IPs
- Ensure Prisma schema matches your database provider

### Admin Dashboard Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure authentication routes are working

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma Deployment: https://www.prisma.io/docs/guides/deployment

---

## 🎯 Quick Start (Vercel - Recommended)

1. **Sign up**: [vercel.com](https://vercel.com) → Continue with GitHub
2. **Import**: Click "Add New Project" → Select your repo
3. **Configure**: Add environment variables
4. **Deploy**: Click "Deploy" → Wait 2-3 minutes
5. **Database**: Set up PostgreSQL (Vercel Postgres, Supabase, or Railway)
6. **Done**: Your site is live! 🎉

