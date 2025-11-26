#!/bin/bash

# 🚀 Deploy API URL Fix
# This script pulls the latest changes and deploys the fixed ContactForm

echo "🚀 Deploying API URL fix..."

# 1. Pull latest changes
cd /var/www/asl-law
git pull origin main

# 2. Build frontend with new API URL
npm run build

# 3. Copy built files to dist
cp -r dist/* /var/www/asl-law/dist/

# 4. Restart frontend server
pm2 restart asl-frontend

# 5. Verify
echo ""
echo "✅ Deployment complete!"
echo ""
echo "Processes:"
pm2 status
echo ""
echo "Test the fix:"
echo "1. Visit: https://asl.mirbase.io.vn"
echo "2. Fill the form and submit"
echo "3. Should see success message!"
