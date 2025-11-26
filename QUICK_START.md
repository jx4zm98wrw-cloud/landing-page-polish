# ⚡ Quick Start - Deployment Guide

**Choose the option that matches your setup:**

---

## 🎯 Option 1: You Have Nginx Proxy Manager (NPM) - EASIEST!

**If you already have NPM running, use this:**

### 1️⃣ Setup (2 minutes)
```bash
# Install Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Run NPM setup
bash npm-setup.sh
```

### 2️⃣ Deploy Code (2 minutes)
```bash
cd ~/asl-law
git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git .
npm install && npm run build
./deploy.sh
```

### 3️⃣ Configure NPM (3 minutes) - Via Web UI
**Go to:** http://your-server-ip:8181

**Frontend Proxy Host:**
- Domain: `yourdomain.com,www.yourdomain.com`
- Forward to: `localhost:8080`

**Backend Proxy Host:**
- Domain: `api.yourdomain.com`
- Forward to: `localhost:3001`

**SSL:** One-click in NPM UI for each domain!

**Total time: ~7 minutes!** 🚀

---

## 🎯 Option 2: Plain Ubuntu Server (No NPM)

**If you DON'T have NPM:**

### 1️⃣ Setup (2 minutes)
```bash
ssh root@YOUR_SERVER_IP
curl -fsSL https://raw.githubusercontent.com/jx4zm98wrw-cloud/landing-page-polish/main/ubuntu-setup.sh | bash
```

### 2️⃣ Deploy Code (2 minutes)
```bash
# From your local machine
npm run build
scp -r dist/* api/ root@YOUR_SERVER_IP:/var/www/asl-law/

# OR on server
cd /var/www/asl-law
git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git .
npm install && npm run build
```

### 3️⃣ Start Application (1 minute)
```bash
/var/www/asl-law/start.sh
```

### 4️⃣ Configure Nginx (2 minutes)
```bash
nano /etc/nginx/sites-available/asl-law
# Change domain name
ln -s /etc/nginx/sites-available/asl-law /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 5️⃣ Setup SSL (2 minutes)
```bash
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

**Total time: ~10 minutes!**

---

## ✅ Test

Visit:
- https://YOUR_DOMAIN.com

**That's it! Your site is live!** 🚀

---

## 🔧 Daily Commands

```bash
# Check status
asl-status

# Restart
asl-restart

# View logs
pm2 logs asl-law-api

# Monitor
pm2 monit
```

---

## 📁 What Gets Created

```
/var/www/asl-law/
├── htdocs/           # Frontend (React build)
│   ├── index.html
│   └── assets/
├── api/              # Backend (Node.js)
│   ├── server.js
│   └── submissions.json
├── ecosystem.config.js
└── start.sh

Commands created:
- asl-status         # Check system status
- asl-restart        # Restart application
```

---

## 🆘 Troubleshooting

### Backend not accessible (502)
```bash
pm2 status
pm2 logs asl-law-api
pm2 restart asl-law-api
```

### Frontend not loading (404)
```bash
ls -la /var/www/asl-law/htdocs/
nginx -t
systemctl reload nginx
```

### SSL issues
```bash
certbot certificates
certbot renew --dry-run
```

---

## 💰 Cost

**Recommended VPS:**
- **DigitalOcean:** $5/month (1GB RAM, 1 CPU, 25GB SSD)
- **Linode:** $5/month (1GB RAM, 1 CPU, 25GB SSD)
- **Vultr:** $3.50/month (512MB RAM, 1 CPU, 10GB SSD)

**Total:** Just $3.50-5/month! 💰

---

## 🎯 What You Need

- Ubuntu VPS (20.04/22.04/24.04)
- Root SSH access
- Domain name pointing to server IP

**That's it!** No CloudPanel, no complex setup!

---

## 📚 Full Documentation

For complete guide with all options:
- **[UBUNTU_DEPLOYMENT_GUIDE.md](./UBUNTU_DEPLOYMENT_GUIDE.md)** - Full Ubuntu guide
- **[DEPLOYMENT_COMPARISON.md](./DEPLOYMENT_COMPARISON.md)** - Compare all options
- **[QUICK_START.md](./QUICK_START.md)** - This file

---

## 🎉 You're Done!

**Total time: ~10 minutes**
**Total cost: $3.50-5/month**
**Difficulty: Beginner friendly**

**Your ASL LAW landing page is now live! 🚀**
