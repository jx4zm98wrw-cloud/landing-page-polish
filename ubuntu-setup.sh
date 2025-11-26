#!/bin/bash

# 🚀 Simple Ubuntu Setup for ASL LAW
# Run this on a fresh Ubuntu server (20.04/22.04/24.04)
# Just copy & paste: bash ubuntu-setup.sh

set -e

echo "╔════════════════════════════════════════╗"
echo "║    ASL LAW - Ubuntu Setup Script       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

print_info "Starting installation..."
echo ""

# Update system
print_info "Updating system packages..."
apt update && apt upgrade -y
print_status "System updated"

# Install essential packages
print_info "Installing essential packages (curl, wget, git, nginx, ufw)..."
apt install -y curl wget git ufw nginx
print_status "Essential packages installed"

# Install Node.js 20.x
if ! command -v node &> /dev/null; then
    print_info "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    print_status "Node.js installed: $(node --version)"
else
    print_warning "Node.js already installed: $(node --version)"
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    print_info "Installing PM2..."
    npm install -g pm2
    print_status "PM2 installed: $(pm2 --version)"
else
    print_warning "PM2 already installed"
fi

# Install Certbot for SSL
print_info "Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx
print_status "Certbot installed"

# Create application directory
print_info "Creating application directories..."
mkdir -p /var/www/asl-law/htdocs
mkdir -p /var/log/asl-law
print_status "Directories created"

# Create PM2 ecosystem file
print_info "Creating PM2 configuration..."
cat > /var/www/asl-law/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'asl-law-api',
    script: '/var/www/asl-law/api/server.js',
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
print_status "PM2 config created"

# Create start script
cat > /var/www/asl-law/start.sh << 'EOF'
#!/bin/bash
echo "Starting ASL LAW application..."

# Install dependencies
cd /var/www/asl-law
npm install --production

# Stop existing process (if any)
pm2 delete asl-law-api 2>/dev/null || true

# Start application
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup
echo ""
echo "✅ ASL LAW is running!"
echo ""
pm2 status
echo ""
echo "Next steps:"
echo "1. Upload your code to /var/www/asl-law"
echo "2. Configure Nginx: nano /etc/nginx/sites-available/asl-law"
echo "3. Enable site: ln -s /etc/nginx/sites-available/asl-law /etc/nginx/sites-enabled/"
echo "4. Setup SSL: certbot --nginx -d yourdomain.com"
EOF

chmod +x /var/www/asl-law/start.sh
print_status "Start script created"

# Create Nginx config template
cat > /etc/nginx/sites-available/asl-law << 'EOF'
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
EOF

print_status "Nginx config template created"
print_warning "⚠️  Don't forget to update 'yourdomain.com' in /etc/nginx/sites-available/asl-law!"

# Configure firewall
print_info "Configuring UFW firewall..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
print_status "Firewall configured"

# Create simple status check script
cat > /usr/local/bin/asl-status << 'EOF'
#!/bin/bash
echo "╔════════════════════════════════════════╗"
echo "║      ASL LAW - System Status           ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo ""
echo "PM2 Processes:"
pm2 status 2>/dev/null || echo "No PM2 processes running"
echo ""
echo "Nginx Status:"
systemctl is-active nginx
echo ""
echo "Disk Usage:"
df -h / | tail -1
echo ""
echo "Memory Usage:"
free -h | grep Mem
echo ""
echo "Recent Logs:"
tail -5 /var/log/asl-law/combined.log 2>/dev/null || echo "No logs yet"
echo ""
echo "Recent API Logs:"
tail -5 /var/log/nginx/error.log 2>/dev/null || echo "No errors"
EOF

chmod +x /usr/local/bin/asl-status
print_status "Status check command created: asl-status"

# Create simple restart script
cat > /usr/local/bin/asl-restart << 'EOF'
#!/bin/bash
echo "Restarting ASL LAW..."
pm2 restart asl-law-api 2>/dev/null || echo "Process not running. Use 'pm2 start /var/www/asl-law/ecosystem.config.js'"
systemctl reload nginx
echo "✅ Done!"
EOF

chmod +x /usr/local/bin/asl-restart
print_status "Restart command created: asl-restart"

echo ""
print_status "========================================="
print_status "  Installation Complete!"
print_status "========================================="
echo ""
echo "📦 Installed:"
echo "  • Node.js $(node --version)"
echo "  • PM2 $(pm2 --version)"
echo "  • Nginx"
echo "  • Certbot (SSL)"
echo ""
echo "📁 Application directory: /var/www/asl-law"
echo ""
echo "🚀 Next Steps:"
echo "  1. Upload your code to /var/www/asl-law"
echo "  2. Update Nginx config:"
echo "     nano /etc/nginx/sites-available/asl-law"
echo "  3. Start application:"
echo "     /var/www/asl-law/start.sh"
echo "  4. Enable Nginx site:"
echo "     ln -s /etc/nginx/sites-available/asl-law /etc/nginx/sites-enabled/"
echo "  5. Reload Nginx:"
echo "     nginx -t && systemctl reload nginx"
echo "  6. Setup SSL:"
echo "     certbot --nginx -d yourdomain.com"
echo ""
echo "🔧 Quick Commands:"
echo "  • Check status: asl-status"
echo "  • Restart app: asl-restart"
echo "  • View logs: pm2 logs asl-law-api"
echo "  • Monitor: pm2 monit"
echo ""
print_warning "⚠️  Remember to update 'yourdomain.com' to your actual domain!"
echo ""
