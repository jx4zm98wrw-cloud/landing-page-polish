# 🚀 CloudPanel Deployment Guide

## Overview
This guide covers deploying your ASL LAW landing page (React + Express.js) to CloudPanel.

## What is CloudPanel?
CloudPanel is a lightweight server control panel for Node.js, PHP, and static site hosting with features like:
- One-click SSL certificates (Let's Encrypt)
- Automatic deployment
- Node.js/PM2 support
- Domain management
- Database support

---

## 📋 Prerequisites

1. **CloudPanel installed** on your server (Ubuntu/Debian)
2. **Root/sudo access** to the server
3. **Domain name** pointed to your server IP
4. **Git repository** with your code (already have this)

---

## 🎯 Step 1: Prepare Your Project for Production

### A. Build Frontend for Production

```bash
# Navigate to project root
cd /path/to/landing-page-polish

# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with optimized static files.

### B. Create Production Environment Variables

Create `.env.production`:
```bash
# Frontend Environment
VITE_API_URL=https://api.yourdomain.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Backend Environment
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://yourdomain.com
```

### C. Update Frontend API URL

Update `src/lib/analytics.ts` and any hardcoded API URLs:
```typescript
// Use environment variable instead of localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

---

## 🌐 Step 2: Deploy Frontend (Static Site)

### Option 1: Using CloudPanel's Static Site Feature

1. **Login to CloudPanel**
   - Open browser: `https://your-server-ip:8443`
   - Login with admin credentials

2. **Create New Site**
   - Click **"Sites"** → **"Add Site"**
   - Select **"Static HTML"**
   - Enter domain: `yourdomain.com`
   - Click **"Create"**

3. **Upload Frontend Build**
   ```bash
   # Using SCP (from local machine)
   scp -r dist/* user@your-server:/home/cloudpanel/htdocs/yourdomain.com/htdocs/

   # Or using rsync
   rsync -avz dist/ user@your-server:/home/cloudpanel/htdocs/yourdomain.com/htdocs/
   ```

4. **Set Permissions**
   ```bash
   ssh user@your-server
   sudo chown -R cloudpanel:cloudpanel /home/cloudpanel/htdocs/yourdomain.com/htdocs/
   sudo chmod -R 755 /home/cloudpanel/htdocs/yourdomain.com/htdocs/
   ```

### Option 2: Using Git Deployment

1. **In CloudPanel Dashboard:**
   - Go to your site
   - Click **"Deployment"**
   - Connect Git repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

2. **Configure Build Hook**
   ```bash
   # The build will run automatically on git push
   # Files will be deployed to htdocs/
   ```

---

## ⚙️ Step 3: Deploy Backend (Node.js/Express)

### A. Install Node.js on Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install CloudPanel Node.js Module
sudo cloudpanel install nodejs
```

### B. Create Node.js Site in CloudPanel

1. **In CloudPanel:**
   - **"Sites"** → **"Add Site"**
   - Select **"Node.js"**
   - Domain: `api.yourdomain.com` (or subdomain)
   - Node.js Version: `20.x`
   - Click **"Create"**

2. **Upload Backend Code**
   ```bash
   # Create project directory
   ssh user@your-server
   mkdir -p /home/cloudpanel/htdocs/api.yourdomain.com/app
   cd /home/cloudpanel/htdocs/api.yourdomain.com/app

   # Clone repository
   git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git .

   # Or upload via SCP
   scp -r api/ user@your-server:/home/cloudpanel/htdocs/api.yourdomain.com/app/
   scp package.json user@your-server:/home/cloudpanel/htdocs/api.yourdomain.com/app/
   ```

3. **Install Dependencies**
   ```bash
   cd /home/cloudpanel/htdocs/api.yourdomain.com/app
   npm install --production
   ```

### C. Configure PM2

Create `ecosystem.config.js` in app directory:
```javascript
module.exports = {
  apps: [{
    name: 'asl-law-api',
    script: 'api/server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/home/cloudpanel/htdocs/api.yourdomain.com/logs/err.log',
    out_file: '/home/cloudpanel/htdocs/api.yourdomain.com/logs/out.log',
    log_file: '/home/cloudpanel/htdocs/api.yourdomain.com/logs/combined.log'
  }]
};
```

**Start with PM2:**
```bash
cd /home/cloudpanel/htdocs/api.yourdomain.com/app
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### D. Configure Nginx (CloudPanel handles this automatically)

CloudPanel creates nginx config at:
```
/etc/nginx/sites-available/api.yourdomain.com
```

Verify it includes:
```nginx
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## 🔒 Step 4: SSL Certificate (Let's Encrypt)

### A. Frontend Domain
```bash
# In CloudPanel Dashboard:
# Go to Sites → yourdomain.com → SSL
# Click "Issue Certificate"
# Select "Let's Encrypt"
# Click "Issue"
```

### B. Backend API Subdomain
```bash
# Same process:
# Sites → api.yourdomain.com → SSL
# Issue Let's Encrypt certificate
```

---

## 📧 Step 5: Configure Email (Optional)

If using email notifications:

```bash
# Install sendmail
sudo apt install sendmail -y

# Configure in CloudPanel
# Go to Settings → Mail
```

---

## 🔍 Step 6: Test Deployment

### Test Backend API:
```bash
# Should return success
curl https://api.yourdomain.com/api/health
# or
curl http://localhost:3001/api/health
```

### Test Frontend:
```bash
# Visit your domain
https://yourdomain.com
```

### Test Contact Form:
```bash
# Submit form and check:
curl -X POST https://api.yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"1234567890","trademark":"Test Brand"}'
```

---

## 📊 Step 7: Monitoring & Logs

### View PM2 Status:
```bash
pm2 status
pm2 logs asl-law-api
```

### View Nginx Logs:
```bash
# Frontend
sudo tail -f /var/log/nginx/yourdomain.com_access.log
sudo tail -f /var/log/nginx/yourdomain.com_error.log

# Backend
sudo tail -f /var/log/nginx/api.yourdomain.com_access.log
sudo tail -f /var/log/nginx/api.yourdomain.com_error.log
```

### View Application Logs:
```bash
# PM2 logs
pm2 logs asl-law-api --lines 100

# CloudPanel logs
sudo cat /home/cloudpanel/htdocs/api.yourdomain.com/logs/combined.log
```

---

## 🔄 Step 8: Auto-Deployment Setup (Optional)

### Using Git Hooks:

Create `post-receive` hook in your server:
```bash
cd /home/cloudpanel/htdocs/api.yourdomain.com/app
cat > .git/hooks/post-receive << 'EOF'
#!/bin/bash
git --git-dir=/home/cloudpanel/htdocs/api.yourdomain.com/app/.git --work-tree=/home/cloudpanel/htdocs/api.yourdomain.com/app checkout -f
npm install --production
pm2 restart asl-law-api
echo "Deployment complete at $(date)"
EOF

chmod +x .git/hooks/post-receive
```

### CloudPanel Git Integration:
- Enable **Auto-Deploy** in site settings
- Set webhook URL in GitHub/GitLab
- Triggers build on every push

---

## 🎯 Step 9: Domain Configuration

### Update DNS Records:
```
Type    Name    Value
A       @       YOUR_SERVER_IP
A       www     YOUR_SERVER_IP
A       api     YOUR_SERVER_IP
```

### Update Frontend API URL:
```typescript
// Update src/lib/analytics.ts
const API_BASE_URL = 'https://api.yourdomain.com';
```

Then rebuild and redeploy:
```bash
npm run build
# Upload dist/ to CloudPanel
```

---

## 🚨 Troubleshooting

### Backend not starting:
```bash
pm2 logs asl-law-api
# Check for errors in logs
# Verify port is not in use: netstat -tulpn | grep 3001
```

### 502 Bad Gateway:
```bash
# Check if PM2 is running
pm2 status

# Restart application
pm2 restart asl-law-api

# Check nginx config
sudo nginx -t
```

### CORS Errors:
```javascript
// Update CORS_ORIGIN in production
// api/server.js
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'https://yourdomain.com',
  credentials: true
}));
```

### Static Files Not Loading:
```bash
# Check file permissions
sudo chown -R cloudpanel:cloudpanel /home/cloudpanel/htdocs/yourdomain.com/htdocs/
sudo chmod -R 755 /home/cloudpanel/htdocs/yourdomain.com/htdocs/
```

---

## 📈 Performance Optimization

### 1. Enable Gzip Compression
CloudPanel automatically enables it, verify in nginx config.

### 2. Set Cache Headers
Add to `dist/_headers` or nginx:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. PM2 Clustering (Optional)
```javascript
// ecosystem.config.js
instances: 'max',  // Use all CPU cores
exec_mode: 'cluster'
```

---

## ✅ Deployment Checklist

- [ ] Node.js 20.x installed on server
- [ ] PM2 installed globally
- [ ] Frontend built (`npm run build`)
- [ ] Frontend uploaded to CloudPanel
- [ ] SSL certificate issued (Let's Encrypt)
- [ ] Backend code uploaded
- [ ] Dependencies installed (`npm install`)
- [ ] PM2 ecosystem config created
- [ ] API running on subdomain
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] DNS records configured
- [ ] Contact form tested
- [ ] Logs monitoring setup
- [ ] Auto-restart on server reboot configured (`pm2 startup`)

---

## 💡 Quick Commands Reference

```bash
# Build frontend
npm run build

# Deploy to server
rsync -avz dist/ user@server:/home/cloudpanel/htdocs/yourdomain.com/htdocs/

# Restart backend
pm2 restart asl-law-api

# View logs
pm2 logs asl-law-api

# Check status
pm2 status

# Test API
curl https://api.yourdomain.com/api/contact
```

---

## 🎓 Additional Resources

- **CloudPanel Docs:** https://www.cloudpanel.io/docs/
- **PM2 Docs:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx Config:** `/etc/nginx/sites-available/`
- **Let's Encrypt:** Automatic via CloudPanel

---

## 📞 Support

If you encounter issues:
1. Check logs: `pm2 logs` and `sudo tail -f /var/log/nginx/error.log`
2. Verify DNS propagation: https://www.whatsmydns.net/
3. Test locally first: `npm run preview`
4. Check CloudPanel community forums

---

**Deployment Complete! 🚀**

Your ASL LAW landing page is now live with:
- ✅ HTTPS/SSL encryption
- ✅ Node.js backend API
- ✅ Static frontend
- ✅ PM2 process management
- ✅ Automatic restarts
- ✅ Optimized performance
