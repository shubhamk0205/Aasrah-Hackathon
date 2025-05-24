# Aasrah Backend

This is the backend server for the Aasrah application, built with Node.js and Express.js.

## Project Structure

```
Backend/
├── src/
│   ├── config/         # Configuration files
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── index.js        # Main application file
├── .env               # Environment variables
├── package.json       # Project dependencies
└── README.md         # Project documentation
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aasrah
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users/profile` - Get user profile (protected route)
- PUT `/api/users/profile` - Update user profile (protected route)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation 