#!/bin/bash

# 🚀 ASL LAW - CloudPanel Deployment Script
# This script helps deploy the frontend and backend to CloudPanel

set -e  # Exit on error

echo "🚀 Starting ASL LAW Deployment to CloudPanel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_DIST="dist"
BACKEND_DIR="api"
SERVER_USER="cloudpanel"
SERVER_IP="YOUR_SERVER_IP"
DOMAIN="yourdomain.com"
API_DOMAIN="api.yourdomain.com"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required files exist
check_files() {
    print_status "Checking required files..."
    if [ ! -d "$FRONTEND_DIST" ]; then
        print_error "Frontend build not found! Run 'npm run build' first."
        exit 1
    fi

    if [ ! -f "api/server.js" ]; then
        print_error "Backend not found!"
        exit 1
    fi

    if [ ! -f "ecosystem.config.js" ]; then
        print_error "PM2 config not found!"
        exit 1
    fi

    print_status "✓ All required files found"
}

# Build frontend
build_frontend() {
    print_status "Building frontend for production..."
    npm run build

    if [ -d "$FRONTEND_DIST" ]; then
        print_status "✓ Frontend built successfully"
    else
        print_error "Frontend build failed!"
        exit 1
    fi
}

# Deploy frontend
deploy_frontend() {
    print_status "Deploying frontend to $DOMAIN..."

    # Check if SSH key exists
    if [ ! -f ~/.ssh/id_rsa ]; then
        print_warning "SSH key not found. You may need to enter password."
    fi

    # Create directory on server
    ssh $SERVER_USER@$SERVER_IP "mkdir -p /home/cloudpanel/htdocs/$DOMAIN/htdocs" || {
        print_error "Failed to create frontend directory on server"
        exit 1
    }

    # Upload files
    rsync -avz --delete $FRONTEND_DIST/ $SERVER_USER@$SERVER_IP:/home/cloudpanel/htdocs/$DOMAIN/htdocs/ || {
        print_error "Failed to upload frontend files"
        exit 1
    }

    # Set permissions
    ssh $SERVER_USER@$SERVER_IP "chown -R cloudpanel:cloudpanel /home/cloudpanel/htdocs/$DOMAIN/htdocs/ && chmod -R 755 /home/cloudpanel/htdocs/$DOMAIN/htdocs/"

    print_status "✓ Frontend deployed successfully"
}

# Deploy backend
deploy_backend() {
    print_status "Deploying backend to $API_DOMAIN..."

    # Create directory on server
    ssh $SERVER_USER@$SERVER_IP "mkdir -p /home/cloudpanel/htdocs/$API_DOMAIN/app" || {
        print_error "Failed to create backend directory on server"
        exit 1
    }

    # Upload backend files (excluding node_modules and dist)
    rsync -avz --exclude 'node_modules/' --exclude 'dist/' --exclude '.git/' $BACKEND_DIR/ $SERVER_USER@$SERVER_IP:/home/cloudpanel/htdocs/$API_DOMAIN/app/ || {
        print_error "Failed to upload backend files"
        exit 1
    }

    # Upload PM2 config
    scp ecosystem.config.js $SERVER_USER@$SERVER_IP:/home/cloudpanel/htdocs/$API_DOMAIN/app/ || {
        print_error "Failed to upload PM2 config"
        exit 1
    }

    # Install dependencies on server
    print_status "Installing backend dependencies on server..."
    ssh $SERVER_USER@$SERVER_IP "cd /home/cloudpanel/htdocs/$API_DOMAIN/app && npm install --production" || {
        print_error "Failed to install dependencies on server"
        exit 1
    }

    # Restart PM2
    print_status "Restarting PM2 processes..."
    ssh $SERVER_USER@$SERVER_IP "cd /home/cloudpanel/htdocs/$API_DOMAIN/app && pm2 delete asl-law-api || true" || true
    ssh $SERVER_USER@$SERVER_IP "cd /home/cloudpanel/htdocs/$API_DOMAIN/app && pm2 start ecosystem.config.js" || {
        print_error "Failed to start PM2"
        exit 1
    }

    # Save PM2 config
    ssh $SERVER_USER@$SERVER_IP "pm2 save"

    print_status "✓ Backend deployed successfully"
}

# Update API URL in frontend (optional)
update_api_url() {
    read -p "Do you want to update API URL in frontend config? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Updating API URL in frontend..."

        # This would require modifying source files before build
        # For now, just remind user
        print_warning "Remember to update VITE_API_URL in .env.production before building!"
    fi
}

# Test deployment
test_deployment() {
    print_status "Testing deployment..."

    echo ""
    echo "Please test the following:"
    echo "1. Frontend: https://$DOMAIN"
    echo "2. Backend API: https://$API_DOMAIN/api/contact"
    echo "3. PM2 Status: ssh $SERVER_USER@$SERVER_IP 'pm2 status'"
    echo "4. Backend Logs: ssh $SERVER_USER@$SERVER_IP 'pm2 logs asl-law-api'"
    echo ""
}

# Main execution
main() {
    echo ""
    echo "╔════════════════════════════════════╗"
    echo "║   ASL LAW - CloudPanel Deploy      ║"
    echo "╚════════════════════════════════════╝"
    echo ""

    # Update configuration if needed
    echo "⚠️  IMPORTANT: Please update the following variables in deploy.sh before running:"
    echo "   - SERVER_IP: Your server IP"
    echo "   - DOMAIN: Your domain name"
    echo "   - SERVER_USER: Your server username"
    echo ""

    read -p "Have you updated deploy.sh configuration? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Please update deploy.sh configuration first!"
        exit 1
    fi

    # Execute deployment steps
    check_files
    build_frontend
    deploy_frontend
    deploy_backend
    update_api_url
    test_deployment

    echo ""
    print_status "🎉 Deployment completed successfully!"
    echo ""
}

# Run main function
main

exit 0
