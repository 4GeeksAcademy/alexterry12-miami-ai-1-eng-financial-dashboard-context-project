Product Overview
What this project is
A financial metrics dashboard. It presents business financial data —
income, expenses (called "outcome" in the code), and derived metrics — through
a web interface backed by an API.
What it does (verified from the code)
The backend exposes a set of /api/metrics/... endpoints that return:

Movements — individual income/outcome records, filterable by date,
category, and operation type.
Summary — totals grouped by day, week, or month (income, outcome, net).
Top categories — the largest income or spending categories.
Comparison — one period's net value versus the previous period.
Alerts — periods where spending rose unusually above the historical
average.
B2B / B2C views — the same data filtered by business type.

A /health endpoint reports whether the service is running.
The frontend (React) consumes these endpoints and displays KPIs, charts, and
financial breakdowns.
Important characteristics

Data is mock / generated, not stored. The backend produces randomized
sample data on each request (generate_mock_movements in
backend/app/routes.py); the frontend also contains a separate hardcoded
sample dataset (frontend/src/lib/mock-data.ts).
There is no database.
There is no user authentication.

These points were confirmed by reading the source, not assumed from the project
name.