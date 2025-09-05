# User Authentication & Profile Management Web App

A **web application** built with **Node.js, Express, MongoDB, and EJS** that allows users to **signup, login, manage their profile**, and view a **dashboard of all users**.  

## Features

- **User Authentication**: Signup and login with session-based authentication.  
- **Profile Management**: Users can fill in and update personal details (branch, year, phone, address).  
- **Dashboard**: View all registered users with edit and delete options.  
- **Secure Access**: Only authenticated users can access the dashboard and edit profiles.  
- **Modern UI**: Clean, responsive interface with optional video background.  

## Folder Structure

project-root/
├── config/
│ └── db.js # MongoDB connection
├── middleware/
│ └── auth.js # Authentication middleware
├── models/
│ └── User.js # Mongoose user model
├── public/
│ ├── css/
│ │ └── styles.css
│ └── videos/
│ └── background.mp4
├── routes/
│ ├── auth.js # Signup/Login routes
│ ├── users.js # Profile routes
│ └── dashboard.js # Dashboard/edit/delete routes
├── views/
│ ├── dashboard.ejs
│ ├── edit-user.ejs
│ ├── login.ejs
│ ├── profile.ejs
│ └── signup.ejs
├── package.json
└── server.js


## Installation

1. **Clone the repository**
2. **npm install**
3. **npm run dev**
4. **Open in browser**

Visit http://localhost:8080

## Usage

1. **Signup as a new user**
- **Go to the signup page and create a new account.**
  
2. **Fill your profile details**
- **After signup or login, you will be redirected to the profile page.**
- **Fill in your personal information such as branch, year, phone, and address.**

3. **Access the dashboard to view all users**
- **Once your profile is complete, you’ll be redirected to the dashboard.**
- **Here you can see all registered users in a table format.**
  
4. **Edit or delete users from the dashboard**
- **Click the Edit button next to a user to update their details.**
- **Click the Delete button to remove a user from the database.**

## Dependencies
- **Node.js**
- **Express**
- **MongoDB (native or community edition)**
- **Mongoose**
- **EJS**
- **Express-session**
- **Nodemon (for development)**
