# Weekly Report Generator

A full-stack web application developed to streamline the weekly reporting process within software development teams.

The system enables team members to submit weekly reports, while managers and administrators can review, approve, and monitor report progress through a centralized dashboard.

you can see project completion proofs inside proofs folder in github repo

---

# Features

## Authentication
- User Registration
- User Login with JWT Authentication
- Role-Based Access Control (Admin, Manager, Team Member)

## User Management
- Create Users
- Update Users
- Activate / Deactivate Users
- Assign User Roles

## Project Management
- Create Projects
- Edit Projects
- Activate / Deactivate Projects

## Project Assignment
- Assign Team Members to Projects
- Remove Project Assignments

## Weekly Reports
### Team Member
- Create Weekly Reports
- Edit Draft Reports
- Submit Reports
- Delete Draft Reports
- View Report Status

### Manager / Admin
- View Submitted Reports
- Review Reports
- Approve Reports
- Provide Feedback

## Dashboard
- Report Statistics
- Recent Reports Overview

---

# Technology Stack

## Frontend
- React
- TypeScript
- Vite
- Axios
- React Router
- React Hot Toast

## Backend
- NestJS
- TypeScript
- Prisma ORM
- JWT Authentication
- Swagger

## Database
- PostgreSQL

## DevOps
- Docker
- Docker Compose

---

# Project Structure

```
weekly-report-generator
│
├── frontend
│
├── backend
│
├── docker-compose.yml
│
└── README.md
```

---

# Prerequisites

Before running the project, install:

- Node.js (v20 or above)
- npm
- Docker Desktop
- Git

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/weekly-report-generator.git

cd weekly-report-generator
```

---

# Install Dependencies

## Backend

```bash
cd backend

npm install
```

## Frontend

```bash
cd frontend

npm install
```

---

# Environment Variables

## Backend

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/weekly_report"

JWT_SECRET=your_jwt_secret

PORT=3000
```

## Frontend

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:3000
```

---

# Running Database

Start PostgreSQL using Docker Compose.

```bash
docker compose up -d
```

To verify:

```bash
docker ps
```

---

# Running Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migrations

```bash
npx prisma migrate dev
```

(Optional)

Open Prisma Studio

```bash
npx prisma studio
```

---

# Running Backend

Navigate to backend folder.

```bash
cd backend
```

Start development server.

```bash
npm run start:dev
```

Backend runs on

```
http://localhost:3000
```

Swagger Documentation

```
http://localhost:3000/api
```

---

# Running Frontend

Navigate to frontend folder.

```bash
cd frontend
```

Run development server.

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Running Entire Application with Docker

Build containers

```bash
docker compose up --build
```

Run in background

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

# Default Workflow

## Team Member

- Login
- Create Weekly Report
- Save Draft
- Submit Report
- Wait for Review

## Manager / Admin

- Login
- View Submitted Reports
- Review Reports
- Provide Feedback
- Approve Reports

---

# API Documentation

Swagger API Documentation

```
http://localhost:3000/api
```

---

# Database

This project uses PostgreSQL with Prisma ORM.

Useful Prisma Commands

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

Reset Database

```bash
npx prisma migrate reset
```

---

# Author

**Ramesh Kalhara**

BSc (Hons) Information Technology Specializing in Software Engineering

SLIIT

---

# License

This project was developed for academic purposes as part of the Software Engineering degree program at SLIIT.