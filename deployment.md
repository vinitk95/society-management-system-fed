# Deployment Guide - Society Management System

## Frontend Deployment

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager
- Access to deployment server/hosting platform

### Build Process

1. **Install Dependencies**
```bash
npm install
```

2. **Build for Production**
```bash
npm run build
```

3. **Deploy Build Folder**
The `build` folder contains the production-ready files that can be deployed to any static hosting service.

### Deployment Options

#### Option 1: Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on git push

#### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

#### Option 3: AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `build` folder contents to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

#### Option 4: Traditional Web Server
1. Build the project: `npm run build`
2. Upload `build` folder contents to web server
3. Configure web server to serve static files
4. Set up HTTPS (recommended)

### Environment Variables for Production

Create a `.env.production` file:
```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_API_TIMEOUT=10000
REACT_APP_NAME=Society Management System
REACT_APP_VERSION=1.0.0
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG=false
```

### Backend Deployment

The backend package `society-management-system-bed` should be deployed separately:

1. **Server Requirements**
   - Node.js 14+
   - MongoDB database
   - PM2 for process management (recommended)

2. **Environment Setup**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRE=7d
EMAIL_HOST=your-smtp-host
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
```

3. **Deployment Steps**
```bash
# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "society-management-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Docker Deployment (Optional)

#### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Backend Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### SSL Certificate Setup

1. **Let's Encrypt (Recommended)**
```bash
# Install certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

2. **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Monitoring and Maintenance

1. **Health Checks**
   - Frontend: Check if the app loads correctly
   - Backend: Implement health check endpoint `/api/health`

2. **Logging**
   - Use PM2 logs for backend monitoring
   - Set up log rotation
   - Monitor error rates and performance

3. **Backup Strategy**
   - Regular MongoDB backups
   - Database backup before deployments
   - Test restore procedures

4. **Security**
   - Keep dependencies updated
   - Regular security audits
   - Monitor for suspicious activities
   - Use HTTPS everywhere
   - Implement rate limiting

### Troubleshooting

#### Common Issues

1. **Build Fails**
   - Check Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **API Connection Issues**
   - Verify CORS settings in backend
   - Check API URL configuration
   - Verify network connectivity

3. **Performance Issues**
   - Enable gzip compression
   - Optimize images and assets
   - Use CDN for static assets
   - Monitor database queries

### Scaling Considerations

1. **Frontend Scaling**
   - Use CDN for static assets
   - Implement caching strategies
   - Optimize bundle size

2. **Backend Scaling**
   - Use load balancers
   - Implement database clustering
   - Use Redis for session management
   - Consider microservices architecture

3. **Database Scaling**
   - Implement read replicas
   - Use database sharding if needed
   - Monitor query performance
   - Implement proper indexing
