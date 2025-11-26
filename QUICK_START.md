# ⚡ Quick Start - Ubuntu Deployment

**Copy this ONE command and paste into your Ubuntu server!**

---

## 1️⃣ Setup Server (2 minutes)

**SSH to your Ubuntu server:**
```bash
ssh root@YOUR_SERVER_IP
```

**Run this ONE command:**
```bash
curl -fsSL https://raw.githubusercontent.com/jx4zm98wrw-cloud/landing-page-polish/main/ubuntu-setup.sh | bash
```

**That's it!** Everything installs automatically:
- ✅ Node.js 20.x
- ✅ PM2
- ✅ Nginx
- ✅ Certbot (SSL)
- ✅ All configurations created

---

## 2️⃣ Upload Your Code (2 minutes)

**From your local computer:**

```bash
# Build frontend
npm run build

# Upload everything to server
scp -r dist/* api/ package.json root@YOUR_SERVER_IP:/var/www/asl-law/
```

**OR if using Git on server:**
```bash
ssh root@YOUR_SERVER_IP
cd /var/www/asl-law
git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git .
npm install
npm run build
```

---

## 3️⃣ Start Application (1 minute)

```bash
ssh root@YOUR_SERVER_IP
/var/www/asl-law/start.sh
```

**Should see:**
```
✅ ASL LAW is running!
[PM2 status showing asl-law-api online]
```

---

## 4️⃣ Configure Domain (2 minutes)

**Edit Nginx config:**
```bash
nano /etc/nginx/sites-available/asl-law
```

**Change line 3:**
```nginx
# From:
server_name yourdomain.com www.yourdomain.com;

# To:
server_name YOUR_ACTUAL_DOMAIN.com www.YOUR_ACTUAL_DOMAIN.com;
```

**Enable site and restart:**
```bash
ln -s /etc/nginx/sites-available/asl-law /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 5️⃣ Setup SSL (2 minutes)

```bash
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

**Follow prompts:**
- Enter email
- Agree to terms
- Choose "Redirect" (option 2)

**Done!** 🎉

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
