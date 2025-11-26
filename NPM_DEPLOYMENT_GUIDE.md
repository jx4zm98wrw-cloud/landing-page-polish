# 🔀 Nginx Proxy Manager Deployment Guide

**For servers already running Nginx Proxy Manager (NPM)**

---

## 🎯 Overview

Since you already have **Nginx Proxy Manager (NPM)** running, deployment is much simpler!

**What you need:**
- ✅ NPM already set up and running
- ✅ Node.js installed
- ✅ PM2 for process management
- ✅ Your domain pointed to NPM

**What NPM handles:**
- 🔄 Reverse proxy (route requests to your app)
- 🔒 SSL certificates (automatic with Let's Encrypt)
- 🌐 Web UI for easy management
- 📊 Simple routing rules

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Node.js & PM2

**SSH to your server:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Verify installation
node --version
npm --version
pm2 --version
```

### Step 2: Setup Application Directory

```bash
# Create directory
sudo mkdir -p /var/www/asl-law
sudo chown $USER:$USER /var/www/asl-law
cd /var/www/asl-law

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
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
    error_file: '/var/log/asl-law/err.log',
    out_file: '/var/log/asl-law/out.log',
    log_file: '/var/log/asl-law/combined.log',
    time: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '500M',
    watch: false,
    ignore_watch: ['node_modules', 'logs']
  }]
};
EOF
```

### Step 3: Deploy Your Code

**Option A: Git Clone (Easiest)**

```bash
cd /var/www/asl-law
git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git .

# Install dependencies
npm install

# Build frontend
npm run build
```

**Option B: Upload Manually**

**From your local machine:**
```bash
# Build frontend
npm run build

# Upload files
scp -r dist/* api/ package.json root@YOUR_SERVER:/var/www/asl-law/

# On server: install dependencies
cd /var/www/asl-law
npm install
```

### Step 4: Start Backend with PM2

```bash
cd /var/www/asl-law

# Create logs directory
mkdir -p /var/log/asl-law

# Start application
pm2 start ecosystem.config.js

# Save PM2 config (auto-start on boot)
pm2 save

# Setup PM2 startup
pm2 startup
# (Follow the instructions PM2 prints - usually run a sudo command)

# Check status
pm2 status
```

**Should see:**
```
┌─────┬────────────────┬─────────┬─────────┬─────────┬──────────┐
│ id  │ name           │ mode    │ ↺      │ status  │ cpu      │
├─────┼────────────────┼─────────┼─────────┼─────────┼──────────┤
│ 0   │ asl-law-api    │ fork    │ 0       │ online  │ 0%       │
└─────┴────────────────┴─────────┴─────────┴─────────┴──────────┘
```

### Step 5: Configure NPM Proxy Hosts

**In NPM Web UI (http://your-server-ip:8181):**

#### A. Frontend Domain (yourdomain.com)

1. **Go to "Hosts" → "Proxy Hosts"**
2. **Click "Create Proxy Host"**
3. **Details Tab:**
   - **Domain Names:** `yourdomain.com,www.yourdomain.com`
   - **Scheme:** `http`
   - **Forward Hostname/IP:** `localhost`
   - **Forward Port:** `8080` (or where frontend is served)
   - **Advanced Tab** (if needed):
     ```nginx
     location / {
         root /var/www/asl-law/dist;
         index index.html;
         try_files $uri $uri/ /index.html;
     }
     ```

#### B. Backend API (api.yourdomain.com)

1. **Go to "Hosts" → "Proxy Hosts"**
2. **Click "Create Proxy Host"**
3. **Details Tab:**
   - **Domain Names:** `api.yourdomain.com`
   - **Scheme:** `http`
   - **Forward Hostname/IP:** `localhost`
   - **Forward Port:** `3001`
   - **Advanced Tab:**
     ```nginx
     location / {
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
     ```

### Step 6: Setup SSL Certificates

**In NPM Web UI:**

#### For Frontend Domain:
1. **Go to "Hosts" → "Proxy Hosts"**
2. **Find your domain** and click the ✏️ **edit icon**
3. **Click "SSL" tab**
4. **Select "Request a new SSL Certificate"**
5. **Check "Force SSL"**
6. **Check "HTTP/2 Support"**
7. **Enter your email**
8. **Agree to Terms of Service**
9. **Click "Save"**

#### For API Domain:
1. **Repeat the same process** for `api.yourdomain.com`

**NPM will automatically:**
- ✅ Get Let's Encrypt certificate
- ✅ Configure auto-renewal
- ✅ Force HTTPS redirect

---

## ✅ Test Deployment

**Visit:**
- https://yourdomain.com
- https://api.yourdomain.com/api/contact

**Check API directly:**
```bash
curl -X POST https://api.yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"1234567890","trademark":"Test Brand"}'
```

---

## 🔧 NPM Configuration Examples

### Frontend Proxy Host (Static Files)

**Domain:** `yourdomain.com`

**Scheme:** `http`
**Forward Hostname/IP:** `localhost`
**Forward Port:** `8080`

**Advanced → Custom Nginx Configuration:**
```nginx
location / {
    root /var/www/asl-law/dist;
    index index.html;
    try_files $uri $uri/ /index.html;

    # Handle React Router
    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Backend Proxy Host (API)

**Domain:** `api.yourdomain.com`

**Scheme:** `http`
**Forward Hostname/IP:** `localhost`
**Forward Port:** `3001`

**Advanced → Custom Nginx Configuration:**
```nginx
location / {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # CORS headers
    add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
}
```

---

## 🔄 Daily Management

### View Application Status
```bash
pm2 status
pm2 monit
pm2 logs asl-law-api
```

### Restart Application
```bash
pm2 restart asl-law-api
```

### Update Application
```bash
cd /var/www/asl-law
git pull
npm install
npm run build
pm2 restart asl-law-api
```

### Check NPM Status
```
# NPM runs on port 8181 by default
http://your-server-ip:8181
```

### Check Logs
```bash
# PM2 logs
pm2 logs asl-law-api

# NPM logs (if in Docker)
docker logs nginx-proxy-manager
# Or if using NPM without Docker, logs are in:
tail -f /var/log/nginx/proxy_host/
```

---

## 📁 Directory Structure

```
/var/www/asl-law/
├── dist/              # Frontend (React build)
│   ├── index.html
│   └── assets/
├── api/               # Backend
│   ├── server.js
│   └── submissions.json
├── ecosystem.config.js
├── package.json
└── logs/
    ├── err.log
    ├── out.log
    └── combined.log
```

---

## 🚨 Troubleshooting

### Backend Returns 502 Bad Gateway

**Check if application is running:**
```bash
pm2 status
pm2 logs asl-law-api
```

**Check port is listening:**
```bash
netstat -tulpn | grep 3001
```

**Restart:**
```bash
pm2 restart asl-law-api
```

### Frontend Returns 404

**Check files exist:**
```bash
ls -la /var/www/asl-law/dist/
```

**Check NPM proxy host configuration:**
- Domain is correct
- Forward port is correct (8080)
- Try accessing the port directly: `http://localhost:8080`

### CORS Errors

**In NPM, add to backend proxy host Advanced config:**
```nginx
add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
```

**Restart backend:**
```bash
pm2 restart asl-law-api
```

### SSL Certificate Issues

**In NPM:**
1. **Go to "SSL Certificates"**
2. **Delete and re-request** certificate
3. **Check domain DNS** is pointing to NPM server
4. **Verify port 80/443** are open

---

## 🛡️ Security Tips

### NPM Web UI Access
```bash
# Default credentials
# Username: admin@example.com
# Password: changeme

# Change in NPM UI immediately!
```

### Firewall
```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# If accessing NPM UI remotely
sudo ufw allow 8181/tcp

sudo ufw enable
```

### Update Dependencies
```bash
cd /var/www/asl-law
npm audit
npm update
pm2 restart asl-law-api
```

---

## 🎯 Advantages of NPM

With NPM already set up, you get:

- ✅ **Easy management** - Web UI for all proxy hosts
- ✅ **Automatic SSL** - One-click Let's Encrypt
- ✅ **Auto-renewal** - Certificates renew automatically
- ✅ **Multiple domains** - Easy to add more sites
- ✅ **No nginx config** - NPM handles everything
- ✅ **Dashboard** - See all services in one place
- ✅ **Rate limiting** - Built-in DDoS protection
- ✅ **Auth** - Add HTTP auth if needed

---

## 📊 NPM Setup Summary

| Component | Configuration |
|-----------|---------------|
| **Frontend** | Proxy Host to port 8080 |
| **Backend** | Proxy Host to port 3001 |
| **SSL** | Automatic via NPM |
| **Process Manager** | PM2 |
| **Application Path** | /var/www/asl-law |

---

## 🎉 Success!

**You now have:**
- ✅ NPM handling all reverse proxying
- ✅ Node.js backend running on PM2
- ✅ React frontend served behind NPM
- ✅ SSL certificates (automatic)
- ✅ Auto-start on boot
- ✅ Easy management via NPM UI

**Access points:**
- **Website:** https://yourdomain.com
- **API:** https://api.yourdomain.com/api/contact
- **NPM UI:** http://your-server-ip:8181

---

**Much simpler with NPM! 🚀**
