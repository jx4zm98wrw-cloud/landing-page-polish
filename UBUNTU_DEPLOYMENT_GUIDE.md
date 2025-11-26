# 🐧 Simple Ubuntu Server Deployment Guide

**No CloudPanel needed!** Just plain Ubuntu + Node.js + Nginx

---

## 🎯 Overview

Deploy your ASL LAW landing page on a plain Ubuntu server with:
- ✅ **Nginx** - Web server
- ✅ **PM2** - Process manager
- ✅ **Certbot** - SSL certificates
- ✅ **Simple commands** - No complex panels

---

## ⚡ Quick Start (10 Minutes)

### Step 1: Create Ubuntu Server

**Recommended:** DigitalOcean, Linode, or Vultr
- Ubuntu 22.04 LTS
- 1GB RAM minimum (2GB recommended)
- 25GB SSD

### Step 2: Connect to Server

```bash
ssh root@YOUR_SERVER_IP
```

### Step 3: Run Setup Script

Copy and paste this entire block:

```bash
#!/bin/bash
echo "🚀 Setting up Ubuntu for ASL LAW..."

# Update system
apt update && apt upgrade -y

# Install essentials
apt install -y curl wget git ufw nginx

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

# Create directories
mkdir -p /var/www/asl-law
mkdir -p /var/log/asl-law

# Create PM2 ecosystem file
cat > /var/www/asl-law/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'asl-law-api',
    script: '/var/www/asl-law/api/server.js',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
EOF

# Create startup script
cat > /var/www/asl-law/start.sh << 'EOF'
#!/bin/bash
cd /var/www/asl-law
npm install --production
pm2 start ecosystem.config.js
pm2 save
pm2 startup
echo "✅ ASL LAW is running!"
pm2 status
EOF

chmod +x /var/www/asl-law/start.sh

# Configure UFW firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo "✅ Setup complete!"
echo "Next steps:"
echo "1. Upload your code to /var/www/asl-law"
echo "2. Run: /var/www/asl-law/start.sh"
echo "3. Configure Nginx"
echo "4. Setup SSL with Certbot"
```

**Just paste this and press Enter!** 🚀

---

## 📦 Deploy Your Code

### Option 1: Git (Recommended)

```bash
cd /var/www/asl-law
git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git .

# Or upload via SCP from your computer:
# scp -r dist/ api/ package.json root@YOUR_SERVER:/var/www/asl-law/
```

### Option 2: Manual Upload

**From your local machine:**
```bash
# Build frontend
npm run build

# Upload to server
scp -r dist/* root@YOUR_SERVER:/var/www/asl-law/htdocs/

# Upload backend
scp -r api/ root@YOUR_SERVER:/var/www/asl-law/
scp package.json root@YOUR_SERVER:/var/www/asl-law/

# Set permissions
ssh root@YOUR_SERVER "chown -R www-data:www-data /var/www/asl-law"
```

### Start the Application

```bash
cd /var/www/asl-law
bash start.sh
```

**Should see:**
```
✅ ASL LAW is running!
┌─────┬────────────────┬─────────┬─────────┬─────────┬──────────┐
│ id  │ name           │ mode    │ ↺      │ status  │ cpu      │
├─────┼────────────────┼─────────┼─────────┼─────────┼──────────┤
│ 0   │ asl-law-api    │ fork    │ 0       │ online  │ 0%       │
└─────┴────────────────┴─────────┴─────────┴─────────┴──────────┘
```

---

## 🌐 Configure Nginx

### Create Nginx Config

```bash
nano /etc/nginx/sites-available/asl-law
```

**Paste this config:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (static files)
    location / {
        root /var/www/asl-law/htdocs;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Update:** Replace `yourdomain.com` with your actual domain!

### Enable Site

```bash
ln -s /etc/nginx/sites-available/asl-law /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 🔒 Setup SSL (HTTPS)

```bash
# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts (enter email, agree to terms)
# Choose "Redirect" to force HTTPS
```

**That's it!** Your site now has HTTPS! 🔒

---

## ✅ Test Deployment

**Visit:**
- http://yourdomain.com (should redirect to HTTPS)
- https://yourdomain.com
- https://yourdomain.com/api/contact

**Check status:**
```bash
pm2 status
pm2 logs asl-law-api
```

---

## 🔄 Daily Management

### Start/Stop Application
```bash
# Start
pm2 start asl-law-api

# Stop
pm2 stop asl-law-api

# Restart
pm2 restart asl-law-api

# View logs
pm2 logs asl-law-api
```

### Update Code
```bash
# Pull latest
cd /var/www/asl-law
git pull

# Rebuild frontend
npm run build

# Restart
pm2 restart asl-law-api
```

### Check Status
```bash
# Application status
pm2 status
pm2 monit

# Server resources
htop
df -h
```

---

## 📁 Directory Structure

```
/var/www/asl-law/
├── htdocs/           # Frontend (React build)
│   ├── index.html
│   └── assets/
├── api/              # Backend
│   ├── server.js
│   └── submissions.json
├── ecosystem.config.js
├── package.json
└── start.sh
```

---

## 🚨 Troubleshooting

### Backend not accessible (502 error)
```bash
# Check if running
pm2 status

# Check logs
pm2 logs asl-law-api

# Restart
pm2 restart asl-law-api
```

### Frontend not loading (404)
```bash
# Check files exist
ls -la /var/www/asl-law/htdocs/

# Check Nginx config
nginx -t
systemctl status nginx
```

### SSL issues
```bash
# Check certificate
certbot certificates

# Renew manually
certbot renew --dry-run
```

---

## 🛡️ Security Tips

**1. Use SSH keys (instead of password)**
```bash
# On your computer
ssh-keygen -t rsa
ssh-copy-id root@YOUR_SERVER_IP
```

**2. Disable root login (optional)**
```bash
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
systemctl restart ssh
```

**3. Keep system updated**
```bash
apt update && apt upgrade -y
```

---

## 🎯 Production Checklist

- [ ] Ubuntu server created
- [ ] Node.js installed
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Code uploaded
- [ ] Application started
- [ ] Nginx configured
- [ ] SSL certificate issued
- [ ] Domain pointing to server
- [ ] Firewall configured
- [ ] Test contact form

---

## 💡 Simple Backup

**Create backup:**
```bash
tar -czf /root/asl-law-backup-$(date +%Y%m%d).tar.gz /var/www/asl-law
```

**Restore backup:**
```bash
tar -xzf /root/asl-law-backup-YYYYMMDD.tar.gz -C /
```

---

## 🎉 That's It!

**You now have:**
- ✅ Ubuntu server with Nginx
- ✅ Node.js backend running on PM2
- ✅ React frontend served by Nginx
- ✅ SSL certificate (HTTPS)
- ✅ Auto-start on boot

**No CloudPanel needed! Just pure Ubuntu! 🐧**

---

## 📞 Quick Commands Reference

```bash
# Check application
pm2 status
pm2 logs asl-law-api

# Restart
pm2 restart asl-law-api

# Check Nginx
nginx -t
systemctl status nginx

# Check logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Monitor
htop
```

---

**Need help?** Everything is standard Ubuntu/nginx/node.js - easy to debug! 🔧
