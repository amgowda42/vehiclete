# Vehiclete 🚗

A unified vehicle platform for browsing, comparing, and managing vehicles.

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Option 1 — Docker Production Mode](#option-1--docker-production-mode-recommended)
  - [Option 2 — Docker Development Mode](#option-2--docker-development-mode-for-contributors)
  - [Option 3 — Manual Setup](#option-3--manual-setup)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Docker Architecture](#-docker-architecture)
- [Contributing](#-contributing)
- [Useful Docker Commands](#-useful-docker-commands)
- [Docker Images](#-docker-images)

---

## 🔧 Prerequisites

### For Docker setup (recommended)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker and Docker Compose)
- Git

### For manual setup

- Node.js 20+
- MongoDB running locally
- Git

---

## 🚀 Getting Started

### Option 1 — Docker Production Mode (Recommended)

This is the easiest way to run the app. You don't need to install Node.js, MongoDB, or any dependencies manually. Docker handles everything.

#### Step 1 — Clone the repository

```bash
git clone https://github.com/amgowda52/vehiclete.git
cd vehiclete
```

#### Step 2 — Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and update the values:

```env
MONGO_DB_URL=mongodb://mongo:27017/vehiclete
NODE_ENV=production
PORT=8001
JWT_SECRET=your_jwt_secret_here
REFRESH_SECRET=your_refresh_secret_here
CLIENT_ORIGIN=http://localhost:8000
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

#### Step 3 — Start everything with one command

```bash
docker-compose up --build -d
```

This will:

- Pull the MongoDB image from Docker Hub
- Build the API image (compiles TypeScript → JavaScript)
- Build the Client image (builds React → served by nginx)
- Start all three containers on a shared network

#### Step 4 — Verify everything is running

```bash
docker-compose ps
```

You should see:

```
NAME               STATUS    PORTS
vehiclete-mongo    running   0.0.0.0:27017->27017/tcp
vehiclete-api      running   0.0.0.0:8001->8001/tcp
vehiclete-client   running   0.0.0.0:8000->80/tcp
```

#### Step 5 — Open the app

| Service  | URL                       |
| -------- | ------------------------- |
| Frontend | http://localhost:8000     |
| API      | http://localhost:8001     |
| MongoDB  | mongodb://localhost:27017 |

#### Stopping the app

```bash
# Stop all containers (data is preserved)
docker-compose down

# Stop and delete all data (fresh start)
docker-compose down -v
```

#### Viewing logs

```bash
# All services
docker-compose logs -f

# Just the API
docker-compose logs -f api

# Just the client
docker-compose logs -f client
```

#### Rebuilding after code changes

```bash
# After changing source code
docker-compose up --build -d

# After changing only .env
docker-compose down && docker-compose up -d
```

---

### Option 2 — Docker Development Mode (For Contributors)

Use this mode when you want to **contribute code**. It runs with live reload — edit any file on your laptop and changes reflect instantly inside the container without rebuilding.

#### Step 1 — Clone and set up `.env`

```bash
git clone https://github.com/amgowda52/vehiclete.git
cd vehiclete
cp .env.example .env
```

Update `.env` for development:

```env
MONGO_DB_URL=mongodb://mongo:27017/vehiclete
NODE_ENV=development
PORT=8001
JWT_SECRET=your_jwt_secret_here
REFRESH_SECRET=your_refresh_secret_here
CLIENT_ORIGIN=http://localhost:8000
```

#### Step 2 — Start in development mode

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

#### Step 3 — Open the app

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:8000 |
| API      | http://localhost:8001 |

#### How live reload works

```
You edit api/server.ts on your laptop
        ↓
tsx watch detects the change inside the container
        ↓
API restarts automatically — no rebuild needed

You edit client/src/App.tsx on your laptop
        ↓
Vite HMR detects the change
        ↓
Browser updates instantly — no refresh needed
```

#### Stopping dev mode

```bash
# Press Ctrl+C to stop logs, then:
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

---

### Option 3 — Manual Setup

If you prefer to run without Docker:

#### Step 1 — Clone the repository

```bash
git clone https://github.com/amgowda52/vehiclete.git
cd vehiclete
```

#### Step 2 — Set up environment variables

```bash
cp .env.example .env
```

Update `.env` with your local MongoDB URL:

```env
MONGO_DB_URL=mongodb://localhost:27017/vehiclete
NODE_ENV=development
PORT=8001
JWT_SECRET=your_jwt_secret_here
REFRESH_SECRET=your_refresh_secret_here
CLIENT_ORIGIN=http://localhost:5173
```

#### Step 3 — Backend setup

```bash
cd api
npm install
npm run dev
```

API runs at: http://localhost:8001

#### Step 4 — Frontend setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

> Make sure MongoDB is running locally before starting the backend.

---

## 🔑 Environment Variables

Create a `.env` file at the root of the project. Use `.env.example` as a template.

| Variable         | Description                       | Example                           |
| ---------------- | --------------------------------- | --------------------------------- |
| `MONGO_DB_URL`   | MongoDB connection string         | `mongodb://mongo:27017/vehiclete` |
| `NODE_ENV`       | Environment mode                  | `production` or `development`     |
| `PORT`           | API server port                   | `8001`                            |
| `JWT_SECRET`     | Secret key for JWT access tokens  | `your_long_random_secret`         |
| `REFRESH_SECRET` | Secret key for JWT refresh tokens | `your_long_random_secret`         |
| `CLIENT_ORIGIN`  | Frontend URL for CORS             | `http://localhost:8000`           |

> **Docker:** use `mongodb://mongo:27017/vehiclete` — `mongo` is the container service name, not localhost.
> **Manual:** use `mongodb://localhost:27017/vehiclete`

---

## 📁 Project Structure

```
vehiclete/
├── api/                        # Node.js / Express backend (TypeScript)
│   ├── config/                 # DB connection, CORS config
│   ├── middleware/             # Auth, error handler, logger
│   ├── models/                 # Mongoose models
│   ├── routes/                 # Express routes
│   ├── server.ts               # Entry point
│   ├── Dockerfile              # Production container
│   ├── Dockerfile.dev          # Development container (tsx watch)
│   ├── tsconfig.json           # TypeScript config
│   └── .dockerignore           # Docker build exclusions
│
├── client/                     # React frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── nginx.conf              # Nginx config for React Router
│   ├── Dockerfile              # Production container (nginx)
│   ├── Dockerfile.dev          # Development container (vite dev)
│   └── .dockerignore           # Docker build exclusions
│
├── docker-compose.yml          # Production orchestration
├── docker-compose.dev.yml      # Development overrides (live reload)
├── .env                        # Your local secrets (never commit)
├── .env.example                # Template for contributors
└── README.md
```

---

## 🐳 Docker Architecture

```
┌──────────────────────────────────────────────────────┐
│   docker-compose — shared network: vehiclete-net     │
│                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   client     │  │     api      │  │   mongo    │  │
│  │  nginx:80    │─▶│  node:8001   │─▶│  :27017    │  │
│  │  port:8000   │  │  port:8001   │  │            │  │
│  └──────────────┘  └──────────────┘  └────────────┘  │
└──────────────────────────────────────────────────────┘

Browser → http://localhost:8000   (React app)
Browser → http://localhost:8001   (REST API)
Compass → mongodb://localhost:27017
```

### Production vs Development containers

| Service | Production                   | Development                 |
| ------- | ---------------------------- | --------------------------- |
| API     | `tsc` compile → `node dist/` | `tsx watch` — live reload   |
| Client  | `vite build` → `nginx`       | `vite dev` — HMR hot reload |
| Mongo   | same in both                 | same in both                |

---

## 🤝 Contributing

Vehiclete is open source and contributions are welcome!

### Step 1 — Fork and clone

Fork the repo on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/vehiclete.git
cd vehiclete
```

### Step 2 — Set up the project

```bash
cp .env.example .env
# Edit .env with your values

# Start in development mode (live reload)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Step 3 — Create a branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-you-are-fixing
```

### Step 4 — Make your changes

Edit files in `api/` or `client/` on your laptop. Changes reflect instantly:

- API changes → `tsx watch` restarts the server automatically
- Client changes → Vite HMR updates the browser instantly

Watch logs while you develop:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f api
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f client
```

### Step 5 — Commit and push

```bash
git add .
git commit -m "feat: describe what you added"
git push origin feature/your-feature-name
```

### Step 6 — Open a Pull Request

Go to the original repo on GitHub and open a Pull Request from your branch.

**Commit message format:**

| Prefix      | When to use                      |
| ----------- | -------------------------------- |
| `feat:`     | New feature                      |
| `fix:`      | Bug fix                          |
| `docs:`     | Documentation changes            |
| `refactor:` | Code refactor, no feature change |
| `chore:`    | Build, config, tooling changes   |

---

## 🛠️ Useful Docker Commands

```bash
# ── Production ────────────────────────────────────────────
# Start everything
docker-compose up -d

# Start and rebuild images
docker-compose up --build -d

# Stop everything (keeps data)
docker-compose down

# Stop and wipe all data
docker-compose down -v

# ── Development ───────────────────────────────────────────
# Start with live reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Stop dev mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# ── Logs ──────────────────────────────────────────────────
docker-compose logs -f
docker-compose logs -f api
docker-compose logs -f client

# ── Debugging ─────────────────────────────────────────────
# Open a shell inside the API container
docker exec -it vehiclete-api sh

# Open MongoDB shell
docker exec -it vehiclete-mongo mongosh

# Check running containers
docker-compose ps

# Check resource usage (CPU, memory)
docker stats

# ── Cleanup ───────────────────────────────────────────────
# Remove unused images and containers
docker system prune -f

# See disk usage
docker system df
```

---

## 📦 Docker Images

Pre-built images are available on Docker Hub:

| Image  | Link                                                                              |
| ------ | --------------------------------------------------------------------------------- |
| API    | [amgowda52/vehiclete-api](https://hub.docker.com/r/amgowda52/vehiclete-api)       |
| Client | [amgowda52/vehiclete-client](https://hub.docker.com/r/amgowda52/vehiclete-client) |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
