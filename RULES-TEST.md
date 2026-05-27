Rule Validation
Each rule in .agents/rules/ was checked against a realistic task in this
repository. A rule passes if it gives clear, specific direction (not too vague)
that actually fits how this project works (not too strict or disconnected).

1. Testing rule
Rule: Every new endpoint must have a test (testing.md).
Real task: A developer adds a new /api/metrics/forecast endpoint.
Check: The rule clearly tells them to also add a test for that endpoint in
backend/tests/. It is specific (says exactly what to do) and realistic (the
project already has pytest and a tests/ folder, so this fits the workflow).
Result: passes.

2. No duplicate endpoints rule
Rule: Do not create near-duplicate endpoints that differ only by a value;
use a query parameter instead (api-design.md).
Real task: A developer is asked to add an endpoint that returns only B2B
data.
Check: The rule guides them away from creating another /b2b-style route
and toward adding a business_type parameter to an existing endpoint — which
the project already does in /api/metrics/summary. Specific and directly tied
to existing code. Result: passes.

3. CORS security rule
Rule: No wildcard CORS with credentials in production; restrict
allow_origins to known frontend URLs (security-and-infra.md).
Real task: A developer is preparing the app for a real deployment.
Check: The rule tells them to replace allow_origins=["*"] in
backend/app/main.py with the actual frontend URL before shipping. Specific and
actionable. It is not "too much" — it explicitly allows wildcards for local
development, so it fits the project's real workflow. Result: passes.

4. Single source of truth rule
Rule: Financial calculations are authoritative in the backend; the frontend
displays API values rather than recomputing them (architecture.md).
Real task: A developer needs to show total profit on a new dashboard card.
Check: The rule tells them to read the value from the backend API instead of
re-adding the math in the frontend (where computeKPIs already duplicates the
backend's calculate_net_value). Specific and tied to a real duplication that
exists in the code today. Result: passes.

Notes
These four cover the main rule categories (testing, API design, security,
architecture). Each rule was specific enough to guide a real task and realistic
for a project of this size, so no rule needed to be rewritten for being too
vague or too strict.