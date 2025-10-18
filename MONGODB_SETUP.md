# MongoDB Backend Setup Guide

## Prerequisites
- Node.js installed on your system
- MongoDB Atlas account (already configured)

## Setup Instructions

### 1. Install Backend Dependencies

Open a **new terminal** and navigate to the server directory:

```bash
cd server
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Auto-restart server (dev)

### 2. Start the Backend Server

From the `server` directory, run:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on **http://localhost:5000**

### 3. Start the Frontend (in a separate terminal)

From the root directory:

```bash
npm run dev
```

The frontend will run on **http://localhost:8080**

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Sign Up
- **POST** `/api/signup`
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Creates new user in MongoDB

### Sign In
- **POST** `/api/signin`
- Body: `{ "email": "user@example.com", "password": "password123" }`
- Authenticates user

### Get All Users (Testing)
- **GET** `/api/users`
- Returns all registered users (passwords excluded)

## MongoDB Connection

Your MongoDB connection string is:
```
mongodb+srv://2410030489_db_user:Svvk%402227@cluster0.x7avxez.mongodb.net/autobots
```

Database name: **autobots**
Collection: **users**

## User Schema

```javascript
{
  email: String (required, unique, lowercase)
  password: String (required, hashed with bcrypt)
  createdAt: Date (auto-generated)
}
```

## Testing the API

### Using the Web App:
1. Go to http://localhost:8080/signup
2. Create an account with email and password
3. Go to http://localhost:8080/signin
4. Sign in with your credentials

### Using Postman or cURL:

**Sign Up:**
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Sign In:**
```bash
curl -X POST http://localhost:5000/api/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**View Users:**
```bash
curl http://localhost:5000/api/users
```

## Troubleshooting

### MongoDB Connection Error
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Check if IP address is whitelisted in MongoDB Atlas

### Port Already in Use
If port 5000 is already in use, edit `server/index.js` and change:
```javascript
const PORT = process.env.PORT || 5000;
```
to another port like 5001 or 3001.

### CORS Error
The backend is configured to accept requests from any origin. If you face CORS issues, check the `cors()` middleware in `server/index.js`.

## Security Notes

⚠️ **Important:**
- Passwords are hashed using bcrypt before storing
- Never commit `.env` files with credentials to Git
- In production, use proper authentication tokens (JWT)
- Add rate limiting for production deployment
- Implement proper input validation and sanitization

## Production Deployment

For production:
1. Set up proper environment variables
2. Use JWT for authentication
3. Add rate limiting (express-rate-limit)
4. Enable HTTPS
5. Use MongoDB Atlas production cluster
6. Add proper error logging
