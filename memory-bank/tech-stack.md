Tech Stack
Backend

Language: Python
Framework: FastAPI (backend/app/main.py, backend/app/routes.py)
Server: uvicorn
Data validation: Pydantic models (typed request/response shapes)
Testing: pytest with pytest-cov (tests in backend/tests/)
Debugging: debugpy (debug port exposed in docker-compose.yml)
Runs on port 8000; interactive API docs at /docs.

Frontend

Language: TypeScript
Framework: React
Build tool: Vite (runs on port 5173)
UI components: organized into components/ui (generic) and
components/dashboard (app-specific); uses a shadcn/ui-style setup
(components.json).
Utilities: frontend/src/lib/ (financial calculations, types, formatting)
Linting: ESLint (eslint.config.js)
Testing: Vitest (e.g. financial-utils.test.ts)

Infrastructure / tooling

Containerization: Docker (a Dockerfile in each of backend/ and
frontend/)
Orchestration: Docker Compose (docker-compose.yml) runs both services
together with live-reload volume mounts; the frontend depends_on the
backend.

Key dependencies (backend, from requirements.txt)
fastapi, uvicorn[standard], debugpy, pytest, pytest-cov, httpx.