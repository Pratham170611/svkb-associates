# SVKB Associates - Chartered Accountant Agency Website

A high-converting, premium agency website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Frontend**: Modern, responsive design with smooth animations
- **Backend**: Full API routes for content management
- **Admin Dashboard**: Complete CMS for managing services, case studies, leads, bookings, and content
- **SEO Ready**: Built-in SEO management
- **Lead Generation**: Contact forms and booking system
- **Database**: SQLite with Prisma ORM (easily switchable to PostgreSQL/MySQL)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `/admin`
- Email: `admin@svkbassociates.com`
- Password: `admin123`

**Important**: Change the default admin credentials in production!

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (Prisma)
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **UI Components**: Radix UI

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and helpers
├── prisma/          # Database schema and seeds
└── public/          # Static assets
```

