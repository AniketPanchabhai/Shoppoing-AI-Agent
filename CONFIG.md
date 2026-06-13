# Configuration Guide

## Environment Variables

### Backend (.env file)

Create a `.env` file in the `backend/` directory with these variables:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=paste_your_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Getting Your Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste into `.env` file

### Environment Options

**NODE_ENV values:**
- `development` - Shows detailed logs and error messages
- `production` - Optimized for deployment

**PORT:**
- Default: 5000
- Change only if port is already in use
- Must match frontend API calls

## Frontend Configuration

Frontend automatically connects to backend at:
```
http://localhost:5000/api
```

Modify in `frontend/src/app/services/chat.service.ts` if needed:
```typescript
private apiUrl = 'http://localhost:5000/api/chat';
```

## Required Services

### Google Gemini API
- **Purpose:** Intent detection, reasoning, response generation
- **Cost:** Free tier available with 60 requests/minute
- **Signup:** https://makersuite.google.com/app/apikey

## Optional Enhancements

### Database Integration
For production deployment, consider:
- **Products:** MongoDB or PostgreSQL
- **Orders:** PostgreSQL or MySQL
- **Caching:** Redis

### Image Hosting
For production image uploads:
- AWS S3
- Google Cloud Storage
- Azure Blob Storage

### Authentication
For multi-user system:
- JWT tokens
- OAuth 2.0
- Session management

## Troubleshooting

### API Key Issues
```
ERROR: Cannot generate text: invalid_api_key
→ Check .env file has correct GEMINI_API_KEY
→ Verify key from makersuite.google.com
→ Ensure API is enabled in Google Cloud Console
```

### Port Already in Use
```
ERROR: listen EADDRINUSE: address already in use :::5000
→ Change PORT in .env to 5001
→ Or kill process using port 5000
```

### CORS Errors
```
ERROR: Cross-Origin Request Blocked
→ Ensure backend is running on port 5000
→ Check Express CORS middleware enabled
→ Verify frontend API URL correct
```

### Module Not Found
```
ERROR: Cannot find module 'express'
→ Run: npm install in backend directory
→ Run: npm install in frontend directory
```

## Performance Tuning

### Caching
Add Redis to cache search results:
```javascript
// Check cache before searching
// Store results for 5 minutes
// Reduce API calls
```

### Rate Limiting
Implement to protect API:
```javascript
// Max 10 requests per minute per user
// Prevent abuse
```

### Database Indexing
For production database:
```sql
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating);
```

## Deployment

### Docker Setup
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

### Cloud Deployment
- **Heroku:** Works with Procfile
- **AWS:** ECS or EC2
- **Google Cloud:** Cloud Run or App Engine
- **Azure:** App Service

### Environment Variables in Cloud
Ensure these are set:
- `GEMINI_API_KEY` → Secret Manager
- `NODE_ENV` → Set to "production"
- `PORT` → Auto-configured by platform

## Monitoring

### Logs to Monitor
- API response times
- Error rates
- Tool execution success
- Agent reasoning steps
- User queries (anonymized)

### Metrics to Track
- Requests per minute
- Average response time
- Tool selection accuracy
- Out-of-scope rejection rate
- Order completion rate
- User retention

## Security

### Best Practices
1. ✓ Never commit .env file
2. ✓ Use environment variables for secrets
3. ✓ Implement rate limiting
4. ✓ Add input validation
5. ✓ Use HTTPS in production
6. ✓ Implement authentication
7. ✓ Log security events
8. ✓ Regular security audits

### API Security
```javascript
// CORS - restrict origins
// Rate limiting - prevent abuse
// Input validation - prevent injection
// Output encoding - prevent XSS
// HTTPS - encrypt data in transit
```

---

Ready to run? Follow [QUICKSTART.md](QUICKSTART.md)!
