Rule: Testing
Scope: Backend (backend/) and frontend utilities (frontend/src/lib/).
Rules

Every new endpoint must have a test.
The backend already uses pytest + pytest-cov with tests in
backend/tests/ (test_routes.py). New endpoints without a test must not be
merged.
Rationale: the project already values testing; skipping it quietly erodes
that safety net.
Utility/calculation functions must be tested, with tests co-located.
Frontend utilities follow the x.ts -> x.test.ts pattern (e.g.
financial-utils.ts / financial-utils.test.ts). Keep test files next to the
code they test.
Rationale: co-located tests are easy to find; testing math prevents silent
numeric bugs in a financial product.