Phase 2 — Engineering Practices Analysis
Good and risky practices found by reading the actual code. Every finding was
verified by inspecting the referenced file directly.

Good practices

G1 — Real backend test suite (Testing).
backend/requirements.txt has pytest/pytest-cov; backend/tests/ has real tests.
Why good: catches bugs before they reach users.
Rule: every new endpoint needs a test.

G2 — Typed response models (API design).
Every route in backend/app/routes.py uses response_model= with Pydantic models.
Why good: validates data and auto-documents the API.
Rule: all endpoints declare a response_model; no raw dicts.

G3 — Auto-generated API docs (Documentation).
FastAPI serves interactive docs at /docs (backend/app/main.py).
Why good: free, always-current API documentation.
Rule: keep typing/docstrings accurate; don't disable docs.

G4 — Hot-reload dev setup (Developer experience).
docker-compose.yml mounts source as volumes so edits show live.
Why good: fast feedback, no rebuilds during development.
Rule: preserve the volume-mounted dev setup.

G5 — Clean, tested frontend utilities (Frontend quality).
frontend/src/lib/financial-utils.ts has small named functions, uses
Intl.NumberFormat, and is tested in financial-utils.test.ts.
Why good: easy to read, reuse, and trust.
Rule: keep utilities small, named, and tested.

Risky / bad practices

B1 — Duplicated data loading (Architecture / DRY).
Almost every route repeats generate_mock_movements(seed=42) and the same filter.
Why bad: a data-source change means editing many identical lines; bugs hide here.
Rule: centralize data loading in a shared helper.

B2 — Redundant B2B/B2C endpoints (API design / DRY).
/api/metrics/b2b and /api/metrics/b2c differ only by one filter value.
Why bad: two copies must be kept in sync; one gets forgotten and they drift.
Rule: use a query parameter, not duplicate routes.

B3 — depends_on is not a readiness check (Infrastructure).
In docker-compose.yml the frontend waits for the backend to start, not be ready.
Why bad: frontend can call an API that isn't listening yet → startup failures.
Rule: add a backend healthcheck.

B4 — Wide-open CORS (Security).
backend/app/main.py sets allow_origins=["*"] with allow_credentials=True.
Why bad: lets any website call the API; insecure and invalid per the CORS spec.
Rule: restrict origins in production; no wildcard + credentials.

B5 — Duplicated logic and data across layers (Architecture / data).
Profit math lives in both financial-utils.ts and routes.py; mock data exists twice.
Why bad: the two can disagree, so users see mismatched numbers.
Rule: calculations authoritative in the backend; frontend displays API values.