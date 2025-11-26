# 🚀 Quick Start: Deploy to CloudPanel

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] CloudPanel installed on your server
- [ ] Domain name (e.g., yourdomain.com) pointing to server IP
- [ ] SSH access to your server
- [ ] Node.js 20.x installed on server
- [ ] PM2 installed: `sudo npm install -g pm2`

---

## ⚡ Quick Deployment (5 Minutes)

### Step 1: Update Configuration

Edit these files with your server details:

**1. Update `.env.production`:**
```bash
VITE_API_URL=https://api.yourdomain.com
CORS_ORIGIN=https://yourdomain.com
```

**2. Update `deploy.sh`:**
```bash
SERVER_IP="YOUR_ACTUAL_SERVER_IP"
DOMAIN="yourdomain.com"
API_DOMAIN="api.yourdomain.com"
SERVER_USER="your_server_username"
```

### Step 2: Run Deployment Script

```bash
# Make executable (already done)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
1. ✅ Build frontend (`npm run build`)
2. ✅ Upload frontend to CloudPanel
3. ✅ Upload backend to server
4. ✅ Install dependencies
5. ✅ Start PM2 processes
6. ✅ Configure permissions

### Step 3: Create Sites in CloudPanel

**In CloudPanel Dashboard:**

1. **Frontend Site:**
   - Sites → Add Site → Static HTML
   - Domain: `yourdomain.com`
   - Create

2. **Backend Site:**
   - Sites → Add Site → Node.js
   - Domain: `api.yourdomain.com`
   - Node.js Version: `20.x`
   - Create

### Step 4: SSL Certificate

**For both sites:**
- Go to Sites → your site → SSL
- Click "Issue Certificate"
- Select "Let's Encrypt"
- Click "Issue"

### Step 5: Test

Visit:
- ✅ https://yourdomain.com (Frontend)
- ✅ https://api.yourdomain.com/api/contact (Backend API)

---

## 📋 Manual Deployment (Alternative)

If you prefer manual deployment:

### Frontend (Static):
```bash
# Build
npm run build

# Upload to CloudPanel
scp -r dist/* cloudpanel@YOUR_SERVER:/home/cloudpanel/htdocs/yourdomain.com/htdocs/

# Set permissions
ssh cloudpanel@YOUR_SERVER "chown -R cloudpanel:cloudpanel /home/cloudpanel/htdocs/yourdomain.com/htdocs/"
```

### Backend (Node.js):
```bash
# Upload backend
scp -r api/ cloudpanel@YOUR_SERVER:/home/cloudpanel/htdocs/api.yourdomain.com/app/
scp package.json cloudpanel@YOUR_SERVER:/home/cloudpanel/htdocs/api.yourdomain.com/app/
scp ecosystem.config.js cloudpanel@YOUR_SERVER:/home/cloudpanel/htdocs/api.yourdomain.com/app/

# SSH to server
ssh cloudpanel@YOUR_SERVER

# Install & start
cd /home/cloudpanel/htdocs/api.yourdomain.com/app
npm install --production
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🔧 Common Commands

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs asl-law-api

# Restart application
pm2 restart asl-law-api

# Stop application
pm2 stop asl-law-api

# Check server resources
htop
df -h
```

---

## 🚨 Troubleshooting

### Backend not accessible (502 error):
```bash
# Check if running
pm2 status

# Restart
pm2 restart asl-law-api

# Check logs
pm2 logs asl-law-api --lines 50
```

### Frontend not loading:
```bash
# Check file permissions
ssh cloudpanel@YOUR_SERVER "ls -la /home/cloudpanel/htdocs/yourdomain.com/htdocs/"

# Re-upload if needed
```

### CORS errors:
Ensure `CORS_ORIGIN` in `.env.production` matches your domain exactly.

### Can't connect via SSH:
- Verify SSH key is added: `ssh-copy-id cloudpanel@YOUR_SERVER`
- Or use password authentication

---

## 📊 Post-Deployment Checklist

- [ ] Frontend loads at https://yourdomain.com
- [ ] Backend API responds at https://api.yourdomain.com/api/contact
- [ ] Contact form submission works
- [ ] SSL certificate is valid (green lock icon)
- [ ] PM2 auto-restart enabled: `pm2 startup`
- [ ] Logs are being written: `pm2 logs`
- [ ] DNS propagated: https://www.whatsmydns.net/
- [ ] Google Analytics tracking (if configured)

---

## 💡 Pro Tips

1. **Set up monitoring:**
   ```bash
   pm2 install pm2-server-monit
   ```

2. **Backup submissions:**
   ```bash
   # Backup JSON file
   scp cloudpanel@SERVER:/home/cloudpanel/htdocs/api.yourdomain.com/app/api/submissions.json ./
   ```

3. **Update code:**
   ```bash
   # Just pull and restart
   git pull
   pm2 restart asl-law-api
   ```

4. **Multiple domains:**
   - Add domains in CloudPanel site settings
   - Update CORS_ORIGIN to include all domains

---

## 📞 Need Help?

1. Check logs: `pm2 logs asl-law-api`
2. Verify nginx: `sudo nginx -t`
3. Check CloudPanel docs: https://www.cloudpanel.io/docs/
4. Test API directly: `curl https://api.yourdomain.com/api/health`

---

**That's it! Your site is now live! 🎉**

For detailed information, see `CLOUDPANEL_DEPLOYMENT_GUIDE.md`
