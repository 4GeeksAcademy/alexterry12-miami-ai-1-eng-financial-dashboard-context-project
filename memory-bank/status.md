Current Project Status
Implemented (working today)

Full set of financial metrics endpoints: movements, summary, top categories,
comparison, alerts, B2B/B2C views, and a health check.
Typed API responses via Pydantic models, with auto-generated docs at /docs.
React + TypeScript frontend with financial utility functions and tests.
Backend test suite (pytest) and frontend utility tests (Vitest).
Dockerized local development with hot reload via Docker Compose.

Known gaps and risks
(These come from the Phase 2 analysis and are documented in PHASE2-FINDINGS.md
and the rule files in .agents/rules/.)

No persistent data. All data is mock/generated; there is no database.
Duplicated data loading. generate_mock_movements(seed=42) is repeated in
almost every route instead of being centralized.
Redundant endpoints. /api/metrics/b2b and /api/metrics/b2c duplicate
logic that a query parameter could handle.
Duplicated logic across layers. Profit/income/outcome math exists in both
the backend and the frontend, which risks mismatched numbers.
Open CORS. The backend allows all origins with credentials — insecure for
production.
Startup ordering. depends_on does not guarantee the backend is ready
before the frontend calls it (no healthcheck).

Suggested next priorities

Centralize data loading/filtering into a shared helper or dependency.
Replace the duplicate B2B/B2C routes with a business_type parameter.
Make the backend the single source of truth for calculations; have the
frontend consume API values.
Restrict CORS to known origins before any real deployment.
Add a backend healthcheck and have the frontend wait for it.
If real data is needed, introduce a database and a data layer behind the
existing endpoints.