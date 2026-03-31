# ?? Travel Management System

A full-stack web application for managing travel packages and bookings. Users can browse travel packages, create bookings, and admins can manage packages and view all bookings.

**?? Live Demo:** [https://travelbookinglive.netlify.app/](https://travelbookinglive.netlify.app/)

---

## ?? Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [User Roles](#user-roles)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ? Features

### For Users
- ? User authentication (Register/Login)
- ? Browse available travel packages
- ? Book travel packages
- ? View booking history in user dashboard
- ? Track booking status (Booked/Cancelled)

### For Admins
- ? Admin dashboard with full control
- ? Create new travel packages
- ? Delete packages
- ? View all user bookings
- ? Update booking status (Pending/Confirmed/Cancelled)

### General
- ? Secure JWT authentication
- ? Role-based access control (User/Admin)
- ? Responsive UI design
- ? Error handling and validation
- ? CORS protection

---

## ?? Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 8** - Build tool
- **React Router DOM 7** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling (custom CSS, no frameworks)
- **Node.js Runtime** - JavaScript execution

### Backend
- **Node.js + Express 5** - REST API server
- **MongoDB 9.3** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Hosting & Deployment
- **Frontend:** Netlify (https://travelbookinglive.netlify.app/)
- **Backend:** Railway (https://travel-management-systemlive-production-aaac.up.railway.app/)
- **Database:** MongoDB Atlas (Cloud)

---

## ?? Project Structure

\\\
travel-management-system/
¦
+-- backend/
¦   +-- server.js                 # Express server setup
¦   +-- package.json              # Backend dependencies
¦   +-- .env                       # Environment variables (local)
¦   +-- .env.example               # Environment template
¦   +-- .gitignore                 # Git ignore rules
¦   ¦
¦   +-- controllers/
¦   ¦   +-- authController.js     # Register & Login logic
¦   ¦   +-- packageController.js  # Package CRUD operations
¦   ¦   +-- bookingController.js  # Booking operations
¦   ¦
¦   +-- models/
¦   ¦   +-- User.js               # User schema
¦   ¦   +-- Package.js            # Package schema
¦   ¦   +-- Booking.js            # Booking schema
¦   ¦
¦   +-- routes/
¦   ¦   +-- auth.js               # Authentication endpoints
¦   ¦   +-- packages.js           # Package endpoints
¦   ¦   +-- bookings.js           # Booking endpoints
¦   ¦
¦   +-- middleware/
¦       +-- auth.js               # JWT verification
¦       +-- role.js               # Role-based access control
¦
+-- frontend/
¦   +-- src/
¦   ¦   +-- main.jsx              # React entry point
¦   ¦   +-- App.jsx               # Main app component
¦   ¦   +-- index.css             # Global styles
¦   ¦   ¦
¦   ¦   +-- api/
¦   ¦   ¦   +-- axios.js          # Axios instance with interceptors
¦   ¦   ¦
¦   ¦   +-- context/
¦   ¦   ¦   +-- AuthContext.jsx   # Global auth state
¦   ¦   ¦
¦   ¦   +-- components/
¦   ¦   ¦   +-- Header.jsx        # Navigation header
¦   ¦   ¦   +-- PackageCard.jsx   # Package card component
¦   ¦   ¦   +-- BookingCard.jsx   # Booking card component
¦   ¦   ¦
¦   ¦   +-- pages/
¦   ¦   ¦   +-- Home.jsx          # Home page with packages
¦   ¦   ¦   +-- Login.jsx         # Login page
¦   ¦   ¦   +-- Register.jsx      # Registration page
¦   ¦   ¦   +-- UserDashboard.jsx # User booking dashboard
¦   ¦   ¦   +-- AdminDashboard.jsx# Admin management panel
¦   ¦   ¦
¦   ¦   +-- assets/               # Images, icons, etc.
¦   ¦
¦   +-- public/
¦   ¦   +-- _redirects            # Netlify routing config
¦   ¦
¦   +-- index.html                # HTML template
¦   +-- package.json              # Frontend dependencies
¦   +-- vite.config.js            # Vite configuration
¦   +-- eslint.config.js          # ESLint rules
¦   +-- .env.production           # Production environment variables
¦   +-- .gitignore                # Git ignore rules
¦
+-- README.md                      # This file
\\\

---

## ?? Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Create Free Account](https://www.mongodb.com/cloud/atlas)

### Local Development Setup

#### 1. Clone the Repository

\\\ash
git clone https://github.com/GayanPradeepJayawardhana/travel-management-system_Live.git
cd travel-management-system_Live
\\\

#### 2. Backend Setup

\\\ash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# FRONTEND_URL=http://localhost:5173
\\\

Start the backend server:
\\\ash
npm run dev    # Development mode with nodemon
# OR
npm start      # Production mode
\\\

Backend runs on: **http://localhost:5000**

#### 3. Frontend Setup

\\\ash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
\\\

Frontend runs on: **http://localhost:5173**

#### 4. Access the Application

Open your browser and go to: **http://localhost:5173**

---

## ?? API Documentation

### Base URL (Production)
\\\
https://travel-management-systemlive-production-aaac.up.railway.app
\\\

### Authentication Endpoints

#### Register User
\\\http
POST /api/auth/register
Content-Type: application/json

{
  \"name\": \"John Doe\",
  \"email\": \"john@example.com\",
  \"password\": \"securepassword123\"
}
\\\

Response:
\\\json
{
  \"message\": \"User registered successfully\"
}
\\\

#### Login User
\\\http
POST /api/auth/login
Content-Type: application/json

{
  \"email\": \"john@example.com\",
  \"password\": \"securepassword123\"
}
\\\

Response:
\\\json
{
  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",
  \"user\": {
    \"_id\": \"507f1f77bcf86cd799439011\",
    \"name\": \"John Doe\",
    \"email\": \"john@example.com\",
    \"role\": \"user\"
  }
}
\\\

### Package Endpoints

#### Get All Packages
\\\http
GET /api/packages
\\\

Response:
\\\json
[
  {
    \"_id\": \"507f1f77bcf86cd799439011\",
    \"title\": \"Paris City Tour\",
    \"description\": \"Experience the magic of Paris\",
    \"location\": \"Paris, France\",
    \"price\": 1200,
    \"imageUrl\": \"https://example.com/image.jpg\",
    \"createdAt\": \"2026-03-30T10:30:00Z\"
  }
]
\\\

#### Create Package (Admin Only)
\\\http
POST /api/packages
Authorization: Bearer {token}
Content-Type: application/json

{
  \"title\": \"Paris City Tour\",
  \"description\": \"Experience the magic of Paris\",
  \"location\": \"Paris, France\",
  \"price\": 1200
}
\\\

#### Delete Package (Admin Only)
\\\http
DELETE /api/packages/{packageId}
Authorization: Bearer {token}
\\\

### Booking Endpoints

#### Create Booking
\\\http
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  \"packageId\": \"507f1f77bcf86cd799439011\"
}
\\\

#### Get User Bookings
\\\http
GET /api/bookings/user
Authorization: Bearer {token}
\\\

#### Get All Bookings (Admin Only)
\\\http
GET /api/bookings
Authorization: Bearer {token}
\\\

---

## ?? Deployment

### Frontend Deployment (Netlify)

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build settings:
   - **Build command:** \
pm run build\
   - **Publish directory:** \rontend/dist\
   - **Base directory:** \rontend\
4. Add environment variable:
   \\\
   VITE_API_BASE_URL=https://your-railway-backend-url.com/api
   \\\
5. Deploy!

### Backend Deployment (Railway)

1. Push code to GitHub
2. Create project on Railway
3. Connect GitHub repository
4. Set environment variables in Railway dashboard:
   \\\
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_strong_secret_key
   FRONTEND_URL=https://your-netlify-frontend-url.com
   \\\
5. Railway auto-deploys on push

---

## ?? Environment Variables

### Backend (.env)
\\\env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=TravelApp

# Server Port (Railway assigns automatically)
PORT=5000

# JWT Secret (Generate a strong random string)
JWT_SECRET=aB7@mN2#pQ4!xY8&zC3*wE5(vR6)

# Frontend URL (for CORS)
FRONTEND_URL=https://travelbookinglive.netlify.app
\\\

### Frontend (.env.production)
\\\env
# Backend API Base URL
VITE_API_BASE_URL=https://travel-management-systemlive-production-aaac.up.railway.app/api
\\\

**?? Security Note:** Never commit \.env\ files to Git. Use \.env.example\ as template.

---

## ?? Database Schema

### User Model
\\\javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: [\"user\", \"admin\"], default: \"user\"),
  createdAt: Date,
  updatedAt: Date
}
\\\

### Package Model
\\\javascript
{
  title: String,
  description: String,
  location: String,
  price: Number,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
\\\

### Booking Model
\\\javascript
{
  user: ObjectId (ref: User),
  package: ObjectId (ref: Package),
  status: String (enum: [\"booked\", \"cancelled\"], default: \"booked\"),
  createdAt: Date,
  updatedAt: Date
}
\\\

---

## ?? User Roles

### User Role
- Browse travel packages
- Create bookings
- View own bookings in dashboard
- Cannot access admin features

### Admin Role
- All user permissions
- Create travel packages
- Delete travel packages
- View all user bookings
- Update booking status

**Note:** To create an admin account, register a user and manually change the role in MongoDB to \\"admin\"\.

---

## ?? Troubleshooting

### Issue: CORS Error
**Symptom:** Frontend can't connect to backend
**Solution:** 
1. Check \FRONTEND_URL\ environment variable in Railway
2. Ensure it matches your Netlify domain exactly
3. Restart the backend deployment

### Issue: MongoDB Connection Error
**Symptom:** \"MongoDB connection error\"
**Solution:**
1. Verify \MONGO_URI\ in Railway environment variables
2. Check if MongoDB Atlas IP whitelist includes Railway's IP
3. Ensure cluster is not paused

### Issue: Login/Register Not Working
**Symptom:** \"Failed to load packages\" or blank page
**Solution:**
1. Open browser DevTools (F12) ? Console tab
2. Check for CORS or network errors
3. Verify API URL in \rontend/.env.production\
4. Redeploy both frontend and backend

### Issue: Packages Not Showing
**Symptom:** Home page loads but no packages visible
**Solution:**
1. Log in as admin
2. Create at least one package in admin dashboard
3. Refresh home page

---

## ?? Sample Test Credentials

After first deployment, create these accounts for testing:

**Admin Account:**
\\\
Email: admin@example.com
Password: Admin@123
\\\

**User Account:**
\\\
Email: user@example.com
Password: User@123
\\\

Then manually update the admin account's role in MongoDB.

---

## ?? Support & Contact

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Review browser console for error messages
3. Check Railway logs for backend errors
4. Create an issue on GitHub

---

## ?? License

This project is licensed under the ISC License.

---

## ?? Acknowledgments

- Built with React, Node.js, and Express
- Hosted on Netlify and Railway
- Database powered by MongoDB Atlas

---

**Happy travels! ????**
