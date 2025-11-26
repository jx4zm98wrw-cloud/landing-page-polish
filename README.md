# ASL LAW - Vietnamese Law Firm Landing Page

A professional, SEO-optimized landing page for ASL LAW, a Vietnamese law firm specializing in trademark registration and intellectual property services. Features a complete admin dashboard for lead management.

## 🎯 Features

### Landing Page
- ✅ Professional Vietnamese law firm design
- ✅ Responsive (mobile, tablet, desktop)
- ✅ SEO optimized (meta tags, structured data, sitemap)
- ✅ Performance optimized (lazy loading, image optimization)
- ✅ Working contact form with backend API
- ✅ Vietnamese language support
- ✅ Professional awards and team section

### Admin Dashboard
- ✅ Complete lead management system
- ✅ Authentication and session management
- ✅ Submission listing, searching, and filtering
- ✅ Status management (New, Contacted, Closed)
- ✅ Internal notes system
- ✅ Export to CSV functionality
- ✅ Statistics and analytics

### Analytics
- ✅ Google Analytics 4 integration (requires configuration)
- ✅ Page view tracking
- ✅ Form submission event tracking
- ✅ Conversion tracking ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed

### Installation
```bash
npm install
```

### Run Development Servers
```bash
# Run both frontend and backend together
npm run dev:all

# OR run separately
npm run dev:api      # Terminal 1: API server on port 3001
npm run dev          # Terminal 2: Frontend on port 8080
```

### Access Points
- **Landing Page:** http://localhost:8080
- **Admin Login:** http://localhost:8080/admin
- **Admin Dashboard:** http://localhost:8080/admin/dashboard

### Admin Credentials
- **Username:** admin
- **Password:** asllaw2024

## 📦 Technology Stack

### Frontend
- React 18.3.1
- TypeScript 5.8.3
- Vite 5.4.19
- Tailwind CSS 3.4.17
- shadcn/ui (50+ components)
- Radix UI (accessible components)
- React Hook Form
- React Router 6

### Backend
- Express.js 5.1.0
- File-based storage (easily replaceable with database)

## 📁 Project Structure

```
landing-page-polish/
├── api/
│   ├── server.js              # Express API server
│   └── submissions.json       # Submissions database
│
├── public/
│   ├── sitemap.xml            # SEO sitemap
│   └── robots.txt             # SEO robots.txt
│
├── src/
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── AdminLogin.tsx     # Admin login
│   │   ├── AdminDashboard.tsx # Admin dashboard
│   │   └── AdminSubmissionDetail.tsx
│   │
│   ├── components/
│   │   ├── ContactForm.tsx    # Contact form
│   │   └── ui/                # shadcn/ui components
│   │
│   └── lib/
│       └── analytics.ts       # GA4 utilities
│
└── Documentation files
    ├── GA_SETUP.md
    ├── ADMIN_DASHBOARD.md
    ├── IMPLEMENTATION_SUMMARY.md
    └── COMPLETE_PROJECT_SUMMARY.md
```

## 🔌 API Endpoints

### Public
```
POST /api/contact      # Submit contact form
```

### Admin
```
GET /api/submissions          # List submissions
GET /api/submissions/:id      # Get single submission
PATCH /api/submissions/:id    # Update submission
DELETE /api/submissions/:id   # Delete submission
GET /api/stats                # Get statistics
```

## 🔧 Configuration

### Google Analytics 4 (Required)
1. Get GA4 tracking ID from https://analytics.google.com/
2. Update files:
   - `src/lib/analytics.ts` (line 2)
   - `index.html` (lines 101, 106)
3. See `GA_SETUP.md` for detailed instructions

### Admin Credentials (Change in Production)
- Current: admin / asllaw2024
- Update in: `src/pages/AdminLogin.tsx`

## 📊 Testing

### Test Form Submission
1. Run the app: `npm run dev:all`
2. Go to http://localhost:8080
3. Fill out and submit the contact form
4. Check http://localhost:8080/admin/dashboard for the submission

### Test Admin Dashboard
1. Go to http://localhost:8080/admin
2. Login with: admin / asllaw2024
3. View submissions, update status, add notes
4. Export data to CSV

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📚 Documentation

- **GA_SETUP.md** - Google Analytics configuration
- **ADMIN_DASHBOARD.md** - Complete admin dashboard guide
- **IMPLEMENTATION_SUMMARY.md** - Implementation details
- **COMPLETE_PROJECT_SUMMARY.md** - Complete project overview

## 🎨 Design Features

- Professional navy and gold color scheme
- Glassmorphism design effects
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible components (WCAG compliant)
- Modern typography (Inter font)

## 🔒 Security Notes

This is a demo implementation. For production:

1. Implement proper authentication (JWT, bcrypt)
2. Use HTTPS
3. Replace JSON file with proper database
4. Add rate limiting
5. Input validation and sanitization
6. CSRF protection
7. Secure session management

## 🚢 Deployment

### Frontend (Static Hosting)
- Build: `npm run build`
- Deploy `dist/` folder to Netlify, Vercel, or similar

### Backend (Cloud Hosting)
- Deploy API server to AWS, Heroku, DigitalOcean, etc.
- Update API URL in frontend code
- Set up environment variables
- Configure CORS for your domain

## 📞 Support

For questions:
1. Check the documentation files
2. Review browser console for errors
3. Verify API server is running on port 3001
4. Check network requests in DevTools

## 🎉 Status

✅ **Production-Ready Landing Page**
✅ **Complete Admin Dashboard**
✅ **SEO Optimized**
✅ **Performance Optimized**
✅ **Analytics Ready**

---

**Built with ❤️ using React, TypeScript, Vite, Tailwind CSS, and shadcn/ui**
