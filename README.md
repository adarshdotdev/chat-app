# 💬 Real-Time Chat App

A full-stack real-time chat application built using **React**, **Node.js**, **Socket.io**, and **MongoDB**. Users can sign in, chat instantly, share images, and update their profiles with a clean, responsive UI powered by **Tailwind CSS**. Everything is deployed on **Vercel** for a smooth experience.

📸 Screenshots
![preview](/preview.png)

## 🚀 Features

- 🔐 User Authentication (Sign In / Sign Up)
- 👤 Profile Management (Name, Bio, and Profile Picture)
- 🟢 Real-Time Online/Offline User Status
- 💬 Instant Messaging with Socket.io
- 🖼️ Image Sharing in Chats
- ☁️ Profile and Chat Images stored on Cloudinary
- 🎯 Responsive UI with Tailwind CSS
- 🧭 Express.js for RESTful APIs
- 🗂 MongoDB + Mongoose for Data Storage
- 🌍 Deployed on Vercel (Frontend + Backend)

## 🔗 Live Demo

👉 **Frontend:** [https://your-frontend.vercel.app](https://chat-app-fronend-nine.vercel.app/login)  
👉 **Backend:** [https://your-backend.vercel.app](https://chat-app-backend-lime-one.vercel.app/)

## 🛠️ Tech Stack

**Frontend:**
- React
- Context API
- React Router Dom
- React-tostify
- Tailwind CSS
- Socket.io Client

**Backend:**
- Node.js
- Express.js
- Socket.io
- Json web token
- MongoDB (via Mongoose)
- Cloudinary (for media uploads)

## 📁 Project Structure

```bash
quick-app/
├── client/        # React Frontend
├── server/        # Node.js Backend
```

## ⚙️ Getting Started Locally

### 1. Clone the Repository
```

git clone https://github.com/your-username/chat-app.git
cd chat-app
```
### 2. Setup the Backend
```
cd server
npm install
```

#### Create a .env file in the server folder and add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

#### Run the server:
```

npm run dev
```
## 3. Setup the Frontend
```
cd ../client
npm install
npm run dev
```

 
