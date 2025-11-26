#!/bin/bash

# 🖥️ CloudPanel Server Setup Script
# Run this on your CloudPanel server to install all dependencies

set -e

echo "╔════════════════════════════════════════════╗"
echo "║   CloudPanel Server Setup for ASL LAW     ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

print_info "Starting server setup..."
echo ""

# Update system
print_info "Updating system packages..."
apt update && apt upgrade -y
print_status "System updated"

# Install curl and wget
print_info "Installing curl, wget, and git..."
apt install -y curl wget git unzip
print_status "Basic tools installed"

# Install Node.js 20.x
print_info "Installing Node.js 20.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    print_status "Node.js installed: $(node --version)"
else
    print_warning "Node.js already installed: $(node --version)"
fi

# Install NPM
print_info "Installing/upgrading npm..."
npm install -g npm@latest
print_status "npm version: $(npm --version)"

# Install PM2 globally
print_info "Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    print_status "PM2 installed: $(pm2 --version)"
else
    print_warning "PM2 already installed: $(pm2 --version)"
fi

# Install CloudPanel Node.js module (if not already installed)
print_info "Installing CloudPanel Node.js module..."
if ! cloudpanel install nodejs 2>/dev/null; then
    print_warning "CloudPanel nodejs module may already be installed or failed"
else
    print_status "CloudPanel Node.js module installed"
fi

# Enable firewall (optional but recommended)
print_info "Configuring UFW firewall..."
if command -v ufw &> /dev/null; then
    ufw --force reset
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 8443/tcp  # CloudPanel port
    ufw --force enable
    print_status "Firewall configured"
else
    print_warning "UFW not found, skipping firewall setup"
fi

# Create logs directory for applications
print_info "Creating logs directory..."
mkdir -p /home/cloudpanel/htdocs/api.yourdomain.com/logs
chown -R cloudpanel:cloudpanel /home/cloudpanel/htdocs/
print_status "Logs directory created"

# Set PM2 to start on boot
print_info "Configuring PM2 startup..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u cloudpanel --hp /home/cloudpanel
print_status "PM2 startup configured"

# Install useful monitoring tools
print_info "Installing monitoring tools..."
apt install -y htop iotop ncdu
print_status "Monitoring tools installed"

# Create a simple health check script
print_info "Creating health check script..."
cat > /usr/local/bin/asl-health-check.sh << 'EOF'
#!/bin/bash
echo "=== ASL LAW Server Health Check ==="
echo ""
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo ""
echo "PM2 Processes:"
pm2 status
echo ""
echo "Disk Usage:"
df -h /
echo ""
echo "Memory Usage:"
free -h
echo ""
echo "Recent API Logs:"
pm2 logs asl-law-api --lines 10 --nostream
echo ""
echo "=== End Health Check ==="
EOF

chmod +x /usr/local/bin/asl-health-check.sh
print_status "Health check script created at /usr/local/bin/asl-health-check.sh"

# Create backup script
print_info "Creating backup script..."
cat > /usr/local/bin/asl-backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/cloudpanel/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "Creating backup in $BACKUP_DIR..."

# Backup submissions
cp -r /home/cloudpanel/htdocs/api.yourdomain.com/app/api/submissions.json $BACKUP_DIR/ 2>/dev/null || echo "No submissions to backup"

# Backup PM2 config
cp /home/cloudpanel/htdocs/api.yourdomain.com/app/ecosystem.config.js $BACKUP_DIR/ 2>/dev/null || echo "No PM2 config found"

echo "Backup completed: $BACKUP_DIR"
ls -lh $BACKUP_DIR
EOF

chmod +x /usr/local/bin/asl-backup.sh
print_status "Backup script created at /usr/local/bin/asl-backup.sh"

# Install Cloudflare certbot (optional)
print_info "Installing Certbot for Let's Encrypt..."
if ! command -v certbot &> /dev/null; then
    apt install -y certbot
    print_status "Certbot installed"
else
    print_warning "Certbot already installed"
fi

echo ""
print_info "=== Installation Summary ==="
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo ""

echo "Useful commands:"
echo "  • Check server status: pm2 status"
echo "  • View logs: pm2 logs asl-law-api"
echo "  • Restart API: pm2 restart asl-law-api"
echo "  • Health check: asl-health-check.sh"
echo "  • Create backup: asl-backup.sh"
echo ""

print_status "Server setup completed successfully!"
print_info "Next steps:"
echo "  1. Update deploy.sh with your domain details"
echo "  2. Run ./deploy.sh to deploy the application"
echo "  3. Configure SSL in CloudPanel"
echo ""

print_warning "Don't forget to:"
echo "  • Configure your DNS records"
echo "  • Create sites in CloudPanel dashboard"
echo "  • Issue SSL certificates"
echo ""
