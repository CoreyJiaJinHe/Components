# Components Project

## Stack
- Frontend: Vite + React
- Backend: FastAPI

## Setup

1. Activate venv
   .venv\Scripts\activate.bat

2. Install Python deps
   python -m pip install -r requirements.txt

3. Install frontend deps
   cd frontend
   npm install
   cd ..

## Run In VS Code

Use Run and Debug with the launch configuration in .vscode/launch.json:

1. Select Full Stack: FastAPI + Vite
2. Press F5

## Run Manually

Backend:
uvicorn backend.server:app --reload --host 127.0.0.1 --port 8000

Frontend:
cd frontend
npm run dev -- --host localhost --port 5173