# MERN Authentication with Access Token, Refresh Token, and Role-Based Authorization

This is a MERN (MongoDB, Express, React, Node.js) authentication system using JWT, with **Access Tokens** (stored in `localStorage` for 15 minutes) and **Refresh Tokens** (stored in a secure HTTP-only cookie for 7 days). The system supports **role-based authorization** with two roles: **Admin** and **User**. The dashboard displays the user's role after login.

## Features

- **Access Token**: A short-lived JWT (15 minutes) stored in `localStorage` for securing routes on the frontend.
- **Refresh Token**: A long-lived JWT (7 days) stored in a secure HTTP-only cookie, used to get a new access token when it expires.
- **JWT Authentication**: Secure user authentication with JWT for user sessions.
- **Role-Based Authorization**: Users can have either the **Admin** or **User** role. The user's role is displayed in the dashboard.
- **Backend**: Express.js with MongoDB for storing user credentials and JWTs.

## Technologies Used

- **Frontend**: React, Axios, React Router, Zustand, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, JWT (jsonwebtoken), bcrypt (for password hashing)
- **Packages**:
  - `@tanstack/react-query`: For data fetching and caching.
  - `axios`: For HTTP requests.
  - `cookie-parser`: For parsing cookies in the backend.
  - `jsonwebtoken`: For generating and verifying JWTs.
  - `bcrypt`: For password hashing.
  - `cors`: For handling cross-origin requests.

## Prerequisites

1. **MongoDB**: You must have MongoDB installed or use a cloud service like MongoDB Atlas.
2. **Node.js**: Make sure Node.js is installed.
3. **Vite**: The frontend uses Vite for building the React app.

## Backend Setup and Frontend Setup

1. Clone the repository.
2. Navigate to the `backend` folder and install Backend dependencies.

```bash
cd backend
npm install
```

3. Create an `.env` file for backend with the following content:

```dotenv
MONGODB_URL = "mongodb://127.0.0.1:27017/mern-auth-db"  # or your MongoDB connection string
PORT = 3000
ACCESS_TOKEN_SECRET = "your-secret-key"
REFRESH_TOKEN_SECRET = "your-refresh-secret-key"
NODE_ENV = "development"  # or "production"
```

4. Start the Backend Server
   for run nodemon dev mode

```bash
npm run dev
```

for run with node

```bash
npm start
```

The backend will be running at http://localhost:3000.

5. Navigate to the `frontend` folder and install Frontend dependencies.

```bash
cd frontend
npm install
```

6. Create an `.env` file for frontend with the following content:

```dotenv
VITE_API_BASE_URL="http://localhost:3000/api"
```
