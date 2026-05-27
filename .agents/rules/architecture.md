Rule: Architecture & Data
Scope: Whole repository (backend and frontend).
Rules

Centralize shared data loading and filtering.
Do not repeat generate_mock_movements(seed=42) or the same filter block in
every route. Extract shared setup into a helper or a FastAPI dependency.
Rationale: one source of truth means a data-source change is a one-place
edit, not a many-place hunt where bugs hide.
One authoritative source for calculations and data.
Financial calculations live in the backend; the frontend displays values
returned by the API rather than recomputing them (profit math currently
exists in both routes.py and financial-utils.ts). Maintain a single
source of truth for data; reserve frontend mock data
(frontend/src/lib/mock-data.ts) for isolated tests only.
Rationale: two implementations of the same math can disagree, so users
would see mismatched numbers across views.