# AI Task Processing Platform

A distributed AI-style task processing platform built using MERN stack, Redis queue, Python workers, Docker, Kubernetes, and Argo CD.

This project demonstrates asynchronous task processing using background workers and scalable microservice architecture.

---

# Tech Stack

## Frontend

* React + Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* bcrypt
* Redis

## Worker Service

* Python
* Redis
* PyMongo

## DevOps

* Docker
* Docker Compose
* Kubernetes
* Argo CD

---

# Features

* User Registration & Login
* JWT Authentication
* Create AI Tasks
* Asynchronous Task Processing
* Redis Queue System
* Python Background Worker
* Task Status Tracking
* Task Logs & Results
* Dockerized Services
* Kubernetes Deployment
* Scalable Worker Architecture

---

# Architecture Flow

```txt
Frontend
   ↓
Backend API
   ↓
Redis Queue
   ↓
Python Worker
   ↓
MongoDB
```

---

# Supported Operations

* Uppercase
* Lowercase
* Reverse String
* Word Count

---

# Project Structure

```txt
ai-task-platform/
│
├── frontend/
├── backend/
├── worker/
├── infra/
└── docker-compose.yml
```

---

# Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create .env File

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 4. Start Backend

```bash
npm run dev
```

---

# Frontend Setup

## 1. Navigate to Frontend

```bash
cd frontend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Frontend

```bash
npm run dev
```

---

# Worker Setup

## 1. Navigate to Worker

```bash
cd worker
```

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3. Install Requirements

```bash
pip install -r requirements.txt
```

---

## 4. Create .env File

```env
REDIS_HOST=localhost
REDIS_PORT=6379
MONGO_URI=your_mongodb_connection
DB_NAME=your_database_name
```

---

## 5. Start Worker

```bash
python worker.py
```

---

# Redis Setup

Run Redis using Docker:

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

---

# Docker Setup

## Build Backend Image

```bash
cd backend
docker build -t ai-backend .
```

---

## Build Frontend Image

```bash
cd frontend
docker build -t ai-frontend .
```

---

## Build Worker Image

```bash
cd worker
docker build -t ai-worker .
```

---

# Docker Compose Setup

Run all services together:

```bash
docker-compose up --build
```

---

# Kubernetes Setup

## Start Minikube

```bash
minikube start
```

---

## Apply Kubernetes Manifests

```bash
kubectl apply -f infra/
```

---

## Verify Pods

```bash
kubectl get pods -n ai-task-platform
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/Signup
```

### Login

```http
POST /api/auth/Login
```

### Logout

```http
POST /api/auth/Logout
```

---

## Tasks

### Create Task

```http
POST /api/task/createtask
```

### Get All Tasks

```http
GET /api/task/gettask
```

### Get Task By ID

```http
GET /api/task/getTaskById/:id
```

### Run Task

```http
POST /api/task/:id/run
```

---

# Task Lifecycle

```txt
pending
↓
running
↓
success
```

OR

```txt
pending
↓
running
↓
failed
```

---

# Scaling Strategy

* Multiple Python worker replicas process tasks concurrently.
* Redis queue distributes jobs asynchronously.
* Kubernetes deployments support horizontal scaling.
* Workers can scale independently from backend APIs.

---

# Future Improvements

* WebSocket-based realtime updates
* Retry mechanism for failed tasks
* Redis persistence
* Kubernetes Horizontal Pod Autoscaler
* Monitoring with Prometheus & Grafana
* Role-based access control

---

# Screenshots

Add screenshots here:

* Frontend Dashb
