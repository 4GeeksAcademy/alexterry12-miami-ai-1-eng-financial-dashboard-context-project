Rule: Security & Infrastructure
Scope: Backend config (backend/app/main.py) and orchestration
(docker-compose.yml).
Rules

No wide-open CORS in production.
main.py currently sets allow_origins=["*"] with allow_credentials=True.
Restrict allow_origins to known frontend URLs; do not combine a wildcard
origin with credentials. Wildcards, if used at all, are for local development
only and must be clearly separated from production config.
Rationale: open CORS lets any site call the API, and wildcard + credentials
is insecure and invalid per the CORS spec.
Use healthchecks for service readiness, not bare depends_on.
In docker-compose.yml, depends_on only waits for a container to start,
not to be ready. Add a backend healthcheck and have dependents wait for the
healthy condition.
Rationale: prevents the frontend from calling an API that isn't listening
yet, which causes intermittent startup failures.