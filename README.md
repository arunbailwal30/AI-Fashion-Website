# AI Fashion Website

This repository contains a minimal full-stack setup for an AI fashion try-on experience:

- **Frontend**: React.js (Vite) UI to:
  - select dress + size and start a realtime try-on session
  - upload user and dress images to generate a try-on image
- **Backend**: FastAPI API for realtime session initialization and upload-based try-on requests
- **Docker**: Containerized frontend and backend with Docker Compose

## Project structure

- `/frontend` - React client
- `/backend` - FastAPI server
- `/docker-compose.yml` - runs both services together

## Run locally (without Docker)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8000` by default.

## Run with Docker

```bash
docker compose up --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
