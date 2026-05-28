# Frontend Specs — Data Contract

Specification for three new features on the Financial Dashboard. No implementation
here — these are the contracts a developer (or AI) follows to build each feature.

Types live in `api-types.ts` (responses) and `param-types.ts` (request params).
Components live in `components.md`. All endpoint paths verified against `/docs`.

---

## Feature 1 — Date Range Filter

**Endpoint:** `GET /api/metrics/facets` (for the available-range hint). The date
range is also sent as `start_date` / `end_date` to the other metrics endpoints.

**Types:**
- Response: `FacetsResponse`
- Params: `DateRangeFilter`

**Parameters:**
- `start_date` — optional, string, format `YYYY-MM-DD`
- `end_date` — optional, string, format `YYYY-MM-DD`

**Edge cases:**
1. **Both dates empty:** no date params sent; dashboard shows all data.
2. **Only one date filled:** filter not applied until both are valid; show inline message `Enter both dates to filter`.

---

## Feature 2 — Anomaly Alerts Table

**Endpoint:** `GET /api/metrics/alerts`

**Types:**
- Response: `AlertsResponse` (`AlertEntry[]`)
- Params: `AlertsParams` (extends `DateRangeFilter`)

**Parameters:**
- `threshold` — number; API minimum 0; UI restricts to 0.01–1.0; default 0.3
- `group_by` — optional; one of `day`, `week`, `month`; default `month`
- `start_date`, `end_date` — optional, `YYYY-MM-DD`
- `business_type` — optional; `B2B` or `B2C`

**Edge cases:**
1. **Empty array returned:** show explicit empty state (`No anomalies found` + threshold text); do not hide the section.
2. **Threshold out of range:** clamp to nearest valid value (e.g. 1.5 → 1.0, 0 → 0.01).

---

## Feature 3 — B2B vs B2C Comparison View

**Endpoints:** `GET /api/metrics/categories/top` (once per business line) and
`GET /api/metrics/facets` (for available categories/lines).

**Types:**
- Response: `TopCategoriesResponse` (`CategoryEntry[]`)
- Params: `TopCategoriesParams` (extends `DateRangeFilter`)

**Parameters:**
- `operation_type` — `income` or `outcome`; default `outcome`. This feature uses `income`.
- `limit` — integer 1–20; default 5. This feature uses 5.
- `business_type` — `B2B` or `B2C`
- `start_date`, `end_date` — optional, `YYYY-MM-DD`

**Notes:** "percent of panel total" is not returned by the API; the component
computes it as `total_amount / sum(panel total_amount) * 100`.

**Edge cases:**
1. **A panel's top-5 is empty:** show empty state (`No income categories` + range text) in that panel.
2. **Both totals zero:** comparison chart shows `No data to compare for this range.`