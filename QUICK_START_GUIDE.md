# 🚀 Quick Start Guide - ASL LAW Landing Page

## Development Environment

### Starting the Application

```bash
# Start both frontend and backend
npm run dev:all

# Or start individually:
npm run dev          # Frontend (port 8080)
npm run dev:api      # Backend API (port 3001)
```

### Access URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Main Website** | http://localhost:8080 | - |
| **Admin Dashboard** | http://localhost:8080/admin | admin / asllaw2024 |
| **API Server** | http://localhost:3001 | - |
| **API Contact Endpoint** | http://localhost:3001/api/contact | - |

---

## Testing the Application

### 1. Contact Form with Logo Upload

1. Visit: http://localhost:8080
2. Scroll to "NHẬN TƯ VẤN MIỄN PHÍ" section
3. Fill in the form:
   - Họ và tên: Test User
   - Số điện thoại: 0123456789
   - Email: test@example.com (optional)
   - Tên thương hiệu: Test Brand
   - Logo thương hiệu: Click upload area to select an image
   - Tin nhắn: Optional message
4. Click "Gửi thông tin"
5. Success message should appear

### 2. Admin Dashboard

1. Visit: http://localhost:8080/admin
2. Login with:
   - Username: admin
   - Password: asllaw2024
3. View submissions list
4. Click "Xem chi tiết" on any submission to see full details
5. If submission has a logo, you can view and download it

### 3. API Testing

```bash
# Test form submission with logo
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "0987654321",
    "email": "test@example.com",
    "trademark": "Test Brand",
    "message": "API test",
    "logo": "data:image/png;base64,iVBORw0KG...",
    "logoName": "logo.png",
    "logoType": "image/png"
  }'

# Get all submissions
curl http://localhost:3001/api/submissions

# Get statistics
curl http://localhost:3001/api/stats

# Get specific submission
curl http://localhost:3001/api/submissions/1764126503460
```

---

## Database Location

Submissions are stored in: `api/submissions.json`

View latest submissions:
```bash
cat api/submissions.json | jq '.[-3:] | .[].name'
```

---

## Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory.

---

## Common Tasks

### Reset Database

```bash
# Backup first
cp api/submissions.json api/submissions.json.backup

# Clear all submissions
echo "[]" > api/submissions.json

# Restart API server
# (kill existing process and run npm run dev:api again)
```

### Check Server Status

```bash
# Check if servers are running
ps aux | grep -E "(node|vite)" | grep -v grep

# Test endpoints
curl http://localhost:3001/api/stats
curl http://localhost:8080
```

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8080 or 3001
lsof -ti:8080 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### API Server Not Responding

```bash
# Check API logs
# Look for output from: npm run dev:api

# Restart API server
npm run dev:api
```

### Changes Not Reflecting

```bash
# Hard refresh browser (Ctrl/Cmd + Shift + R)
# Or restart dev server:
# Ctrl+C to stop, then npm run dev:all
```

---

## Project Structure

```
landing-page-polish/
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx      # Main contact form with logo upload
│   │   ├── theme-provider.tsx   # Dark mode provider
│   │   └── ui/                  # shadcn/ui components
│   ├── pages/
│   │   ├── AdminDashboard.tsx   # Admin panel main page
│   │   ├── AdminLogin.tsx       # Admin login
│   │   └── AdminSubmissionDetail.tsx # Submission details
│   └── lib/
│       ├── analytics.ts         # GA4 integration
│       └── web-vitals.ts        # Performance monitoring
├── api/
│   └── server.js                # Express.js API server
├── public/
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # SEO sitemap
└── docs/
    ├── *.md                     # Documentation files
    └── ...
```

---

## Key Features

✅ Logo Upload (5MB max, images only)
✅ Dark Mode (light/dark/system)
✅ Responsive Design
✅ SEO Optimized
✅ Accessibility (WCAG 2.1 AA)
✅ Performance Optimized
✅ Admin Dashboard
✅ CSV Export
✅ Real-time Stats

---

## Support

For issues or questions, refer to:
- IMPLEMENTATION_SUMMARY.md - Technical details
- ADMIN_DASHBOARD.md - Admin guide
- LOGO_UPLOAD_FEATURE.md - Logo feature docs
- PROJECT_COMPLETION_STATUS.md - Complete status

---

**Last Updated:** November 26, 2025
**Version:** 1.0
