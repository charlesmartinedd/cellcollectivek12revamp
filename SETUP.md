# Cell Collective K-12 - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** (v20.10+)
  - Download: https://www.docker.com/products/docker-desktop
  - Required for running the application in containers

- **Node.js** (v18+) - Only if running locally without Docker
  - Download: https://nodejs.org/
  - Includes npm package manager

- **Git**
  - Download: https://git-scm.com/

## Quick Start (Docker - Recommended)

This is the fastest way to get started and ensures consistency across different systems.

### Step 1: Clone the Repository

```bash
git clone https://github.com/charlesmartinedd/cellcollectivek12revamp.git
cd cellcollectivek12revamp
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

Edit `.env` if you need custom configuration (optional for local development).

### Step 3: Start Docker Containers

```bash
docker-compose up
```

This will:
- Build the web container (Node.js + React)
- Start PostgreSQL database
- Start Nginx reverse proxy
- Install all dependencies
- Start development servers

**First startup may take 5-10 minutes** as it builds images and installs dependencies.

### Step 4: Access the Application

Once containers are running, open your browser:

- **Main Application** (Nginx): http://localhost
- **Frontend Dev Server** (Vite): http://localhost:5173
- **Backend API**: http://localhost:3000

### Step 5: Stop the Application

```bash
# Stop containers (keeps data)
docker-compose down

# Stop and remove all data
docker-compose down -v
```

## Local Development (Without Docker)

For developers who prefer running services locally.

### Step 1: Clone and Navigate

```bash
git clone https://github.com/charlesmartinedd/cellcollectivek12revamp.git
cd cellcollectivek12revamp
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd src/client
npm install
cd ../..
```

### Step 3: Setup Database

You'll need PostgreSQL running locally:

```bash
# On Mac (using Homebrew)
brew install postgresql@15
brew services start postgresql@15

# On Windows (using installer)
# Download from: https://www.postgresql.org/download/windows/

# Create database
createdb cellcollective_k12
```

Update `.env` with your database credentials:
```
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/cellcollective_k12
```

### Step 4: Run Development Servers

From the project root:

```bash
# This runs both client and server concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1: Backend server
npm run server:dev

# Terminal 2: Frontend dev server
npm run client:dev
```

### Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Development Workflow

### File Structure

```
src/
├── client/                 # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components (routes)
│   │   ├── store/          # Redux store and slices
│   │   ├── theme/          # Material-UI theme
│   │   ├── styles/         # Global SCSS styles
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
└── server/                 # Node.js/Express backend
    ├── api/
    ├── routes/             # API endpoints
    ├── models/             # Database models
    ├── simulation/         # Simulation logic
    └── index.js            # Server entry point
```

### Available Scripts

**Root Level:**
```bash
npm run dev              # Run both client and server
npm run client:dev       # Run only frontend
npm run server:dev       # Run only backend
npm run build            # Build for production
npm run test             # Run tests
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
```

**Client (src/client):**
```bash
npm run dev              # Vite dev server
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Hot Reload

Both frontend and backend support hot reload during development:
- **Frontend**: Vite HMR (Hot Module Replacement) - changes appear instantly
- **Backend**: Nodemon - server restarts automatically on file changes

## Troubleshooting

### Docker Issues

**Problem**: Containers won't start
```bash
# Check Docker is running
docker info

# View logs
docker-compose logs

# Rebuild containers
docker-compose build --no-cache
docker-compose up
```

**Problem**: Port already in use
```bash
# Check what's using the port (example for port 3000)
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000

# Kill the process or change ports in docker-compose.yml
```

**Problem**: Database connection errors
```bash
# Make sure database container is running
docker-compose ps

# Reset database
docker-compose down -v
docker-compose up
```

### Local Development Issues

**Problem**: `npm install` fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Module not found errors
```bash
# Make sure you're in the right directory
# Client modules: cd src/client && npm install
# Server modules: cd ../server && npm install (if applicable)
```

**Problem**: PostgreSQL connection refused
```bash
# Check PostgreSQL is running
# Mac
brew services list

# Create database if it doesn't exist
psql postgres
CREATE DATABASE cellcollective_k12;
```

### Common Errors

**Error**: `ENOSPC: System limit for number of file watchers reached`
```bash
# Linux only - increase watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

**Error**: `Module build failed: Error: Cannot find module 'sass'`
```bash
cd src/client
npm install sass
```

## Next Steps

Once you have the application running:

1. **Explore the Code**: Start with `src/client/src/App.jsx` and `src/server/index.js`
2. **Read the README**: See `README.md` for architecture and design principles
3. **Check the Todos**: See what features need to be built
4. **Make Changes**: Edit files and see them hot-reload automatically

## Additional Resources

- **Material-UI Docs**: https://mui.com/
- **Redux Toolkit Docs**: https://redux-toolkit.js.org/
- **Vite Docs**: https://vitejs.dev/
- **Original Cell Collective**: https://cellcollective.org/

## Getting Help

If you encounter issues:

1. Check this SETUP.md guide
2. Review `README.md` for project details
3. Check Docker/Node.js logs for errors
4. Ensure all prerequisites are installed and running

---

**Last Updated**: 2025-10-22
**Status**: Initial foundation complete, ready for feature development
