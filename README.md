# E‑Learning App

A MERN‑stack e‑learning platform with user authentication, course management, and file uploads.

## 🚀 Features

- User signup / login (JWT)  
- Password reset via email  
- Role‑based access (student / instructor)  
- Course creation & enrollment  
- Video & asset uploads  
- …and more

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), Multer  
- Frontend: React 
- Auth: JWT tokens, bcrypt  
- Storage: Local filesystem (for now), can swap to S3  

## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yash-prince/e‑learning.git
   cd e‑learning


2. **Create your own .env file in the server folder**
   cp .env.example .env
# then open server/.env and fill in:
#   PORT
#   DB
#   password
#   email
#   Activation_secret
#   jwt_sec
#   Razorpay_key
#   Razorpay_secret

# then open .env in your editor and fill in your own values

3.**Install backend (server) dependencies**
  ```bash
  cd server
  npm install
  cd ..
# now you’re back at /e‑learning and can run:
4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
# now again you’re back at /e‑learning and can run:

5. **Run your app**
   # From the server/ folder:
   ```bash
   cd server
   npm run dev

6.  # From the frontend/ folder (in a separate terminal):
   ```bash
   cd frontend
   npm start or npm run dev
