Rule: API Design
Scope: Backend API (backend/app/routes.py, backend/app/main.py).
Rules

All endpoints declare a typed response_model.
Every route uses response_model= with Pydantic models (e.g.
FinancialMovement, MetricsSummaryItem). Do not return raw, untyped dicts.
Rationale: validates output, powers the auto-generated docs, and catches
shape errors early.
Keep the auto-generated API docs working.
FastAPI serves interactive docs at /docs. Maintain accurate typing and
docstrings; do not disable the docs route.
Rationale: free, always-current documentation lowers onboarding cost.
No near-duplicate endpoints that differ only by a value.
Do not create routes like /api/metrics/b2b and /api/metrics/b2c that
differ only by a filter. Expose the variation as a query parameter on one
endpoint (as /api/metrics/summary already does with business_type).
Rationale: duplicate routes must be kept in sync and drift apart over time.