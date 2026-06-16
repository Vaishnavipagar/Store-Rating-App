# ⭐ Store Rating App

A Full Stack Store Rating Application built using **React.js, Node.js, Express.js, MySQL, Sequelize, JWT Authentication, and bcrypt**.

This application allows users to register, log in, rate stores, and provides separate dashboards for Admins, Normal Users, and Store Owners.

---

# 📌 Project Overview

The Store Rating App is a role-based web application where:

* Normal Users can register, log in, view stores, and submit/update ratings.
* Store Owners can view their store's average rating and users who rated their store.
* System Administrators can manage users and stores through an admin dashboard.

---

# 🚀 Features

## 👨‍💼 System Administrator

* Login using JWT Authentication
* View Dashboard Statistics
* View Total Users
* View Total Stores
* View Total Ratings
* Add New Users
* Add New Stores
* View Users List
* View Stores List
* Logout

---

## 👩‍💻 Normal User

* Register Account
* Login
* View All Stores
* Submit Ratings (1–5)
* Update Submitted Ratings
* Logout

---

## 🏪 Store Owner

* Login
* View Average Store Rating
* View Users Who Rated the Store
* Logout

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT Authentication
* bcrypt

---

# 📂 Project Structure

Store-Rating-App

├── backend

│   ├── config

│   ├── controllers

│   ├── middleware

│   ├── models

│   ├── routes

│   └── server.js

│

├── frontend

│   ├── public

│   ├── src

│   │   ├── components

│   │   ├── pages

│   │   ├── services

│   │   ├── App.jsx

│   │   └── main.jsx

│   └── package.json

│

└── README.md

---

# ⚙ Installation Guide

## Clone Repository

```bash
git clone https://github.com/Vaishnavipagar/Store-Rating-App.git
cd Store-Rating-App
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

# 🗄 Database Schema

## Database Name

```text
store_rating
```

### Users Table

| Column | Type |
|----------|------|
| id | INT (PK) |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| address | TEXT |
| role | ENUM |
| createdAt | DATETIME |
| updatedAt | DATETIME |

### Stores Table

| Column | Type |
|----------|------|
| id | INT (PK) |
| name | VARCHAR |
| email | VARCHAR |
| address | TEXT |
| ownerId | INT (FK) |
| createdAt | DATETIME |
| updatedAt | DATETIME |

### Ratings Table

| Column | Type |
|----------|------|
| id | INT (PK) |
| userId | INT (FK) |
| storeId | INT (FK) |
| rating | INT |
| createdAt | DATETIME |
| updatedAt | DATETIME |

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=store_rating
JWT_SECRET=YOUR_SECRET_KEY
```

---

# 🔗 API Endpoints

## Authentication

### Register User

POST

```text
/auth/register
```

### Login User

POST

```text
/auth/login
```

---

## Admin

### Dashboard

GET

```text
/admin/dashboard
```

### View Users

GET

```text
/admin/users
```

### View Stores

GET

```text
/admin/stores
```

### Add User

POST

```text
/admin/add-user
```

### Add Store

POST

```text
/admin/add-store
```

---

## User

### View Stores

GET

```text
/user/stores
```

### Submit Rating

POST

```text
/user/rate
```

### Update Rating

PUT

```text
/user/rate/:storeId
```

---

## Store Owner

### Owner Dashboard

GET

```text
/owner/dashboard
```

---

# 🧪 Test Credentials

## 👨‍💼 Admin

Email:

vaishnavi@gmail.com

Password:

Password@123

---

## 🏪 Store Owner

Email:

owner@gmail.com

Password:

Owner@123

---

## 👩‍💻 User 1

Email:

user@gmail.com

Password:

User@123

---

## 👩‍💻 User 2 (Anjali)

Email:

anjali@gmail.com

Password:

Password@123

---

# 👩‍🎓 Author

Vaishnavi Dipak Pagar

GitHub:

https://github.com/Vaishnavipagar

---

# ⭐ Thank You

Thank you for reviewing this project.

This project was developed as part of a Full Stack Internship Coding Challenge using React, Express, MySQL, Sequelize, and JWT Authentication.
