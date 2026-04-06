# GanAi Backend

A modern Node.js backend API built with Express.js, featuring secure JWT-based authentication, MongoDB database integration, and Redis caching. This is a production-ready authentication service designed for scalable web applications.


## Project Overview

GanAi Backend is a comprehensive authentication and user management system that provides secure endpoints for user registration, login, logout, and profile management. It implements industry-standard security practices including JWT tokens, password hashing with bcryptjs, and cookie-based authentication.

## Tech Stack

| Technology        | Version | Purpose                         |
| ----------------- | ------- | ------------------------------- |
| **Node.js**       | Latest  | Runtime environment             |
| **Express.js**    | ^5.2.1  | Web framework                   |
| **MongoDB**       | -       | NoSQL database                  |
| **Mongoose**      | ^9.3.3  | MongoDB ODM                     |
| **JWT**           | ^9.0.3  | Token-based authentication      |
| **bcryptjs**      | ^3.0.3  | Password hashing                |
| **Redis**         | ^5.11.0 | Caching & session management    |
| **CORS**          | ^2.8.6  | Cross-Origin Resource Sharing   |
| **dotenv**        | ^17.3.1 | Environment variable management |
| **Cookie Parser** | ^1.4.7  | Cookie handling middleware      |
| **Bun**           | Latest  | JavaScript runtime (optional)   |

## Installation

### Prerequisites

- **Node.js** (v16 or higher) or **Bun** (latest version)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Redis** (optional, for caching)
- **npm** or **yarn** package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   Or, if using Bun:

   ```bash
   bun install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables) section)

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Verify Installation**
   ```bash
   npm list
   ```

## Environment Variables

Create a `.env` file in the root directory of the backend folder with the following configuration:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret-change-this-in-production-min-32-chars
REFRESH_TOKEN_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password

# Environment
NODE_ENV=development
```

## Running the Server

### Development Mode (with Hot Reload)

```bash
npm run dev
```

The server will start on `http://localhost:8000` and automatically reload on file changes.

### Production Mode

```bash
npm start
```

Or with Node.js directly:

```bash
node src/index.js
```

## API Endpoints

### Base URL

```
http://localhost:8000/api/v1/users
```

### Authentication Endpoints

| Method   | Endpoint         | Description              | Auth Required | Request Body                              |
| -------- | ---------------- | ------------------------ | ------------- | ----------------------------------------- |
| **POST** | `/register`      | Register a new user      | No            | `{ fullName, username, email, password }` |
| **POST** | `/login`         | Login user               | No            | `{ email, password }`                     |
| **POST** | `/logout`        | Logout user              | Yes           | -                                         |
| **POST** | `/refresh-token` | Refresh access token     | Yes           | -                                         |
| **GET**  | `/get-me`        | Get current user profile | Yes           | -                                         |

### Request/Response Examples

#### 1. Register User

**Request:**

```http
POST /api/v1/users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (201):**

```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

#### 2. Login User

**Request:**

```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged in successfully"
}
```

#### 3. Get Current User (Protected Route)

**Request:**

```http
GET /api/v1/users/get-me
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "User fetched successfully"
}
```

#### 4. Logout User (Protected Route)

**Request:**

```http
POST /api/v1/users/logout
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": null,
  "message": "User logged out successfully"
}
```

#### 5. Refresh Access Token (Protected Route)

**Request:**

```http
POST /api/v1/users/refresh-token
Authorization: Bearer <refreshToken>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Access token refreshed successfully"
}
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    // Automatically hashed using bcryptjs
  },
  refreshToken: {
    type: String,
    default: null
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Features:**

- Automatic password hashing before save (bcryptjs with 10 salt rounds)
- JWT token generation methods on User model
- Password comparison utility methods
- Unique email and username constraints with indexes
- Automatic timestamps (createdAt, updatedAt)

## Features

- **Secure JWT Authentication**: Token-based authentication with access & refresh tokens
- **Password Security**: Industry-standard bcryptjs hashing with configurable salt rounds
- **CORS Protection**: Configured to accept requests only from whitelisted origins
- **Input Validation**: Comprehensive validation for all API endpoints
- **Token Refresh Mechanism**: Automatic token refresh with refresh tokens
- **MongoDB Integration**: Mongoose ODM for reliable data persistence
- **Hot Reload Support**: Bun integration for fast development with auto-reload
- **Secure Cookie Handling**: HTTP-only cookies for token storage
- **Consistent Error Handling**: Standardized API error responses
- **Request Size Limiting**: 10kb limit to prevent payload abuse

## Project Structure

```
backend/
├── src/
│   ├── app.js                      # Express app configuration & middleware setup
│   ├── index.js                    # Server entry point & DB connection
│   ├── constants.js                # Application constants
│   │
│   ├── controllers/
│   │   └── auth.controller.js      # Authentication logic (register, login, logout, refresh)
│   │
│   ├── db/
│   │   ├── index.js                # MongoDB connection setup
│   │   └── redis.js                # Redis connection setup
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js      # JWT verification middleware
│   │
│   ├── models/
│   │   └── user.model.js           # User schema & model with methods
│   │
│   ├── routes/
│   │   └── auth.routes.js          # Authentication routes
│   │
│   └── utils/
│       ├── apiError.js             # Custom error class
│       ├── apiResponse.js          # Standardized response class
│       └── asyncHandler.js         # Async error handling wrapper
│
├── public/                         # Static files directory
├── .env                            # Environment variables (not in git)
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignore rules
├── .prettierrc                     # Prettier code formatting config
├── package.json                    # Dependencies & scripts
├── README.md                       # Documentation (this file)
└── bun.lock or package-lock.json  # Dependency lock file
```

## Security Best Practices

1. **Password Hashing**: All passwords are hashed using bcryptjs with 10 salt rounds
2. **JWT Tokens**: Secure token-based authentication with expiration timestamps
3. **CORS Configuration**: Restricted to specific frontend origins
4. **Request Size Limits**: Limited to 10kb to prevent abuse
5. **HTTP-Only Cookies**: Secure cookie handling prevents XSS attacks
6. **Environment Variables**: All sensitive data stored in `.env` (never committed to git)
7. **Refresh Tokens**: Separate token rotation for extended sessions
8. **Input Validation**: All inputs validated before database operations

## Troubleshooting

### MongoDB Connection Error

```
Error connecting to mongoDB
```

**Solutions:**

- Verify `MONGO_URI` is correct in `.env` file
- Check MongoDB service is running: `mongo --version`
- Ensure network access is allowed in MongoDB Atlas
- For MongoDB Atlas: IP whitelist must include your current IP
- Test connection string in MongoDB Compass

### JWT Token Expired

```
Token expired
```

**Solution:**

- Use `/refresh-token` endpoint to obtain a new access token
- Include the refresh token in the Authorization header as Bearer token

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

- Verify `CORS_ORIGIN` in `.env` matches your frontend URL exactly
- Update `.env` if frontend runs on different port (e.g., `5173` for Vite)
- Restart server after changing environment variables

### Port Already in Use

```
EADDRINUSE: address already in use :::8000
```

**Solutions:**

- Change `PORT` in `.env` to a different port (e.g., `8001`)
- Or kill process using port: `lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

### Database Validation Errors

```
All fields are required
```

**Solution:**

- Ensure all required fields are provided in request body
- Check field names match exactly: `fullName`, `username`, `email`, `password`

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [JWT Authorization](https://jwt.io/)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ for secure authentication and user management**
