# Weekly Report Generator

A full-stack Weekly Report Management System built with NestJS, React, PostgreSQL and Docker.

## Features

### Authentication
- JWT Authentication
- User Registration
- User Login
- Password Hashing (bcrypt)
- Role Based Authorization

### User Management
- View Users
- Update User Role
- Update User Status
- Delete Users

### Project Management
- Create Project
- Update Project
- Delete Project
- View Projects

### Project Assignment
- Assign Team Members to Projects
- View Assigned Members
- Remove Assignments

### Weekly Reports
- Create Weekly Reports
- Edit Reports
- Delete Reports
- Submit Reports
- Prevent Duplicate Weekly Reports
- Restrict Reports to Assigned Projects
- Automatic Pending / Late Status

### Dashboard
- Summary Statistics
- Charts
- Recent Activity
- Report Filtering

### Documentation
- Swagger API Documentation

### Deployment
- Docker
- Docker Compose
- PostgreSQL

---

# Tech Stack

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt
- Swagger

## Frontend

- React
- TypeScript
- Vite

## Database

- PostgreSQL

## DevOps

- Docker
- Docker Compose

---

# Project Structure

```
weekly-report-generator/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# Backend Setup

```
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run start:dev
```

Backend

```
http://localhost:3000
```

Swagger

```
http://localhost:3000/api
```

---

# Docker Setup

```
docker compose up --build
```

Backend

```
http://localhost:3000
```

Database

```
localhost:5433
```

---

# Environment Variables

Backend `.env`

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/weekly_report_db?schema=public

JWT_SECRET=weekly-report-secret

JWT_EXPIRES_IN=7d

PORT=3000
```

---

# API Modules

- Authentication
- Users
- Projects
- Project Assignments
- Weekly Reports
- Dashboard

---

# Default Roles

- Admin
- Manager
- Team Member

---

# API Documentation

Swagger

```
http://localhost:3000/api
```

---

# Author

Ramesh Kalhara

Software Engineering Undergraduate

SLIIT