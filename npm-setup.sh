#!/bin/bash

# 🔀 NPM Setup for ASL LAW
# Run this on a server with Nginx Proxy Manager already installed
# This script sets up Node.js backend for NPM

set -e

echo "╔════════════════════════════════════════════╗"
echo "║    ASL LAW - NPM Setup Script              ║"
echo "╚════════════════════════════════════════════╝"
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

print_info "Starting NPM setup for ASL LAW..."
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_warning "Running as root. It's recommended to run as non-root user."
    print_warning "Press Ctrl+C to cancel, or Enter to continue..."
    read
fi

# Check if NPM is running
print_info "Checking if Nginx Proxy Manager is accessible..."
if curl -s http://localhost:8181 > /dev/null 2>&1; then
    print_status "NPM is running on port 8181"
else
    print_warning "NPM doesn't appear to be running on port 8181"
    print_info "Make sure NPM is installed and running before continuing."
    print_info "NPM runs at: http://your-server-ip:8181"
    echo ""
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Update system
print_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y
print_status "System updated"

# Install Node.js 20.x
if ! command -v node &> /dev/null; then
    print_info "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    print_status "Node.js installed: $(node --version)"
else
    print_warning "Node.js already installed: $(node --version)"
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    print_info "Installing PM2..."
    sudo npm install -g pm2
    print_status "PM2 installed: $(pm2 --version)"
else
    print_warning "PM2 already installed"
fi

# Create application directory
print_info "Creating application directories..."
APP_DIR="$HOME/asl-law"
mkdir -p $APP_DIR
mkdir -p /var/log/asl-law
print_status "Directory created: $APP_DIR"

# Create PM2 ecosystem file
print_info "Creating PM2 configuration..."
cat > $APP_DIR/ecosystem.config.js << 'EOF'
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
print_status "PM2 config created"

# Create deployment script
cat > $APP_DIR/deploy.sh << 'EOF'
#!/bin/bash
echo "🚀 Deploying ASL LAW..."

# Install dependencies
cd $APP_DIR
npm install --production

# Build frontend (if needed)
if [ -d "src" ]; then
    echo "Building frontend..."
    npm run build
fi

# Stop existing process
pm2 delete asl-law-api 2>/dev/null || true

# Start application
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

echo ""
echo "✅ Application deployed!"
echo ""
echo "Next steps:"
echo "1. Upload your code to: $APP_DIR"
echo "2. Configure NPM Proxy Hosts (see NPM_DEPLOYMENT_GUIDE.md)"
echo "3. Setup SSL certificates in NPM UI"
echo ""
pm2 status
EOF

chmod +x $APP_DIR/deploy.sh
print_status "Deployment script created"

# Create NPM configuration helper
cat > $APP_DIR/NPM-CONFIG.txt << 'EOF'
NPM Proxy Host Configuration
============================

Frontend Proxy Host (yourdomain.com):
-------------------------------------
Domain Names: yourdomain.com,www.yourdomain.com
Scheme: http
Forward Hostname/IP: localhost
Forward Port: 8080

Advanced Config:
location / {
    root /var/www/asl-law/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
}

Backend Proxy Host (api.yourdomain.com):
----------------------------------------
Domain Names: api.yourdomain.com
Scheme: http
Forward Hostname/IP: localhost
Forward Port: 3001

Advanced Config:
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

SSL Setup:
----------
1. Edit proxy host
2. Go to SSL tab
3. Select "Request a new SSL Certificate"
4. Check "Force SSL"
5. Enter email, accept terms
6. Save

Update domain names to your actual domain!
EOF

print_status "NPM config helper created"

# Create status check script
cat > /usr/local/bin/asl-npm-status << 'EOF'
#!/bin/bash
echo "╔════════════════════════════════════════════╗"
echo "║    ASL LAW - NPM Status                    ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Application Status:"
pm2 status 2>/dev/null || echo "PM2 not running"
echo ""
echo "Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
echo "PM2: $(pm2 --version 2>/dev/null || echo 'Not installed')"
echo ""
echo "Port 3001 Status:"
netstat -tulpn 2>/dev/null | grep 3001 || echo "Port 3001 not listening"
echo ""
echo "NPM Status:"
curl -s http://localhost:8181 > /dev/null 2>&1 && echo "NPM is accessible on port 8181" || echo "NPM not responding"
echo ""
echo "Disk Usage:"
df -h $HOME 2>/dev/null | tail -1
echo ""
echo "Memory Usage:"
free -h | grep Mem
echo ""
echo "Recent Logs:"
tail -5 /var/log/asl-law/combined.log 2>/dev/null || echo "No logs yet"
EOF

chmod +x /usr/local/bin/asl-npm-status
print_status "Status command created: asl-npm-status"

# Create restart script
cat > /usr/local/bin/asl-npm-restart << 'EOF'
#!/bin/bash
echo "Restarting ASL LAW..."
pm2 restart asl-law-api 2>/dev/null || echo "Process not running. Use 'pm2 start $HOME/asl-law/ecosystem.config.js'"
echo "✅ Done!"
EOF

chmod +x /usr/local/bin/asl-npm-restart
print_status "Restart command created: asl-npm-restart"

echo ""
print_status "============================================"
print_status "  NPM Setup Complete!"
print_status "============================================"
echo ""
echo "📦 Installed:"
echo "  • Node.js $(node --version)"
echo "  • PM2 $(pm2 --version)"
echo ""
echo "📁 Application directory: $APP_DIR"
echo ""
echo "🚀 Next Steps:"
echo "  1. Deploy your code:"
echo "     cd $APP_DIR"
echo "     git clone https://github.com/jx4zm98wrw-cloud/landing-page-polish.git ."
echo "     npm install"
echo "     npm run build"
echo "     ./deploy.sh"
echo ""
echo "  2. Configure NPM Proxy Hosts (see $APP_DIR/NPM-CONFIG.txt)"
echo ""
echo "  3. Setup SSL in NPM UI:"
echo "     - Go to: http://your-server-ip:8181"
echo "     - Default login: admin@example.com / changeme"
echo "     - Change password immediately!"
echo ""
echo "🔧 Quick Commands:"
echo "  • Check status: asl-npm-status"
echo "  • Restart: asl-npm-restart"
echo "  • View logs: pm2 logs asl-law-api"
echo "  • NPM UI: http://your-server-ip:8181"
echo ""
print_warning "⚠️  Don't forget to:"
echo "  • Update domain names in NPM configuration"
echo "  • Change NPM default password"
echo "  • Point your domains to this server"
echo ""
print_info "Full guide: NPM_DEPLOYMENT_GUIDE.md"
echo ""
