# Admin Dashboard - Complete Guide

## 🎯 Overview

The admin dashboard provides a complete management interface for handling form submissions from the ASL LAW landing page. It's a fully-featured system with authentication, submission management, analytics, and export capabilities.

---

## 🔐 Accessing the Admin Dashboard

### URL
- **Admin Login:** http://localhost:8080/admin
- **Dashboard:** http://localhost:8080/admin/dashboard
- **Submission Detail:** http://localhost:8080/admin/submissions/:id

### Credentials
- **Username:** `admin`
- **Password:** `asllaw2024`

⚠️ **Note:** This is a demo setup. In production, use proper authentication with strong passwords, JWT tokens, and secure session management.

---

## ✨ Features

### 1. Authentication System
- Simple login form with session storage
- Protected routes for all admin pages
- Automatic redirect to login if not authenticated
- Logout functionality

### 2. Dashboard Overview
- **Statistics Cards:**
  - Total submissions
  - New (unread)
  - Contacted
  - Closed

- **Quick Stats:**
  - Today: Submissions received today
  - This Week: Submissions in last 7 days
  - This Month: Submissions in current month

### 3. Submission Management

#### List View
- Sortable columns
- Search functionality (name, phone, email, trademark)
- Filter by status (All, New, Contacted, Closed)
- Paginated display (if needed for large datasets)
- Export to CSV

#### Actions Available
- **View Details** - Full submission information
- **Mark as Contacted** - Update status
- **Mark as Closed** - Mark as completed
- **Delete** - Remove submission (with confirmation)

#### Detail View
- Complete submission information
- Customer details (name, phone, email)
- Trademark information
- Full message (if provided)
- Internal notes section
- Status management
- Quick action buttons (call, email)

### 4. Status Management

Three statuses available:
- **New** - Default for all new submissions
- **Contacted** - After you reach out to the customer
- **Closed** - After the case is resolved

### 5. Notes System
- Add internal notes to each submission
- Track communication history
- Track progress updates
- Notes are saved automatically

### 6. Export Functionality
- Export filtered submissions to CSV
- Includes all submission data
- Timestamps in Vietnamese format
- Timestamped filename

---

## 🚀 How to Use

### Step 1: Access the Dashboard
1. Navigate to http://localhost:8080/admin
2. Login with credentials: admin / asllaw2024
3. You'll be redirected to the dashboard

### Step 2: View Submissions
1. Dashboard shows all submissions with statistics
2. Use search to find specific submissions
3. Use filter to view only certain statuses
4. Click "View Details" to see full information

### Step 3: Manage Submissions
1. Click on a submission row to see actions menu
2. Choose "Xem chi tiết" to view full details
3. Update status as needed (New → Contacted → Closed)
4. Add notes about your communication

### Step 4: Track Progress
1. Use status badges to track progress
2. Add notes for internal tracking
3. Export data for reporting

---

## 📊 API Endpoints

The admin dashboard uses these API endpoints:

### Public Endpoints
```http
POST /api/contact
```
Submit contact form (from landing page)

### Admin Endpoints
```http
GET /api/submissions
```
List all submissions

```http
GET /api/submissions/:id
```
Get single submission

```http
PATCH /api/submissions/:id
```
Update submission (status, notes)

```http
DELETE /api/submissions/:id
```
Delete submission

```http
GET /api/stats
```
Get statistics (total, new, contacted, closed, today, this week, this month)

---

## 📁 File Structure

```
api/
├── server.js           # API server with admin endpoints
├── submissions.json    # Submissions database (JSON file)

src/pages/
├── AdminLogin.tsx           # Admin login page
├── AdminDashboard.tsx       # Main dashboard
├── AdminSubmissionDetail.tsx # Submission detail page

src/lib/
└── analytics.ts        # Google Analytics tracking
```

---

## 🎨 Features in Detail

### Search Functionality
Search across:
- Customer name
- Phone number
- Email address
- Trademark name

Case-insensitive matching.

### Status Management
- Visual badges with color coding
- Dropdown for quick status updates
- Automatic timestamp tracking

### Export CSV
Exports current filtered results:
- Includes all submission fields
- Vietnamese column headers
- Timestamp in DD/MM/YYYY HH:mm format
- Status in Vietnamese (Mới, Đã liên hệ, Đã đóng)

### Notes System
- Unlimited text
- Automatically saved
- Internal (not visible to customers)
- Timestamped when saved

---

## 🔄 Data Flow

```
Landing Page Form
    ↓
POST /api/contact
    ↓
Save to submissions.json
    ↓
Admin Dashboard
    ↓
GET /api/submissions (load list)
    ↓
View, Update, Export
    ↓
PATCH /api/submissions/:id (update)
```

---

## 🛠️ Customization Options

### Adding More Fields
1. Update form schema in `ContactForm.tsx`
2. Update API to accept new fields
3. Update admin dashboard to display fields

### Adding Authentication
Replace simple localStorage auth with:
- JWT tokens
- httpOnly cookies
- Session management
- Password hashing

### Database Integration
Replace JSON file with:
- MongoDB
- PostgreSQL
- MySQL
- Any SQL/NoSQL database

### Email Notifications
Add on form submission:
- Send email to admin
- Auto-reply to customer
- Integration with SendGrid, Mailgun, etc.

---

## 📱 Mobile Support

The admin dashboard is fully responsive:
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Responsive tables with horizontal scroll

---

## 🔒 Security Considerations

**Current Implementation (Demo):**
- Simple username/password
- Client-side session storage
- No encryption

**For Production:**
- Use HTTPS
- Implement proper authentication (OAuth, JWT)
- Hash passwords with bcrypt
- Use httpOnly cookies
- Rate limiting on API
- Input validation and sanitization
- CSRF protection
- SQL injection prevention

---

## 🐛 Troubleshooting

### Can't Login
- Check if you're using correct credentials
- Clear browser localStorage
- Check if API server is running on port 3001

### Submissions Not Loading
- Verify API server is running
- Check browser console for errors
- Check network tab for API errors

### Form Submission Not Working
- Ensure both servers are running (Vite on 8080, API on 3001)
- Check browser console for errors
- Verify submissions.json is writable

### Export Not Working
- Check if browser allows downloads
- Ensure you have filtered results
- Try different browser

---

## 📈 Analytics Integration

Google Analytics events tracked:
- Form submissions
- Page views
- Custom events (if implemented)

See `GA_SETUP.md` for configuration.

---

## 🚢 Deployment

### For Production:
1. Build the React app: `npm run build`
2. Serve static files from web server (Nginx, Apache)
3. Deploy API server to cloud (AWS, Heroku, DigitalOcean)
4. Set up SSL certificates
5. Configure environment variables
6. Use proper database instead of JSON file
7. Set up proper authentication
8. Enable email notifications

### Environment Variables Needed:
```
API_BASE_URL=https://your-api-domain.com
GA_TRACKING_ID=G-XXXXXXXXXX
ADMIN_USERNAME=your_admin_user
ADMIN_PASSWORD=your_secure_password
```

---

## 📞 Support

For issues:
1. Check browser console for errors
2. Verify API server logs
3. Check network requests in DevTools
4. Review submissions.json for data integrity

---

## 🎉 Summary

The admin dashboard provides a complete solution for managing form submissions:
- ✅ Authentication
- ✅ Submission listing and filtering
- ✅ Detailed submission view
- ✅ Status management
- ✅ Notes system
- ✅ Export functionality
- ✅ Statistics and analytics
- ✅ Responsive design
- ✅ RESTful API

Perfect for a small to medium business handling trademark registration inquiries!
