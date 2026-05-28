# Component Specifications

This document describes the UI components for the three features. It specifies
each component, the data it needs (props), and what it renders in edge cases.
Types referenced here are defined in `api-types.ts` and `param-types.ts`.

## Feature 1 — Date Range Filter (home dashboard)

### `DateRangeFilterBar`
The row of date controls at the top of the home dashboard.

**Props:**
- `value: DateRangeFilter` — the currently selected start/end dates (controlled by the parent)
- `onChange: (next: DateRangeFilter) => void` — called when the user edits either date
- `facets: FacetsResponse | null` — used to show the available range hint; `null` while still loading

**Layout:** a single row — `[ Start date input ] [ End date input ] [ available-range hint text ]`

**Hint text:** shows `Data available from {facets.min_date} to {facets.max_date}`.
While `facets` is `null` (still loading), show `Loading available range…` instead.

**Conditional rendering:**
- **Both dates empty:** no filter is applied; the dashboard shows all data.
- **Only one date filled in:** the filter is NOT applied until both dates are
  valid. Show an inline message: `Enter both dates to filter`.

  ## Feature 2 — Anomaly Alerts Table (home dashboard)

### `OutcomeAlertsTable`
A table below the existing charts that highlights periods where spending spiked.

**Props:**
- `alerts: AlertEntry[]` — the rows to display (from `AlertsResponse`)
- `threshold: number` — the current spike sensitivity value
- `onThresholdChange: (next: number) => void` — called when the user edits the threshold input
- `dateFilter: DateRangeFilter` — the active date range from Feature 1, passed through to the request
- `isLoading: boolean` — true while waiting for the API response

**Threshold input:** a numeric field. UI restricts the value to the range 0.01–1.0,
default 0.3. If the user enters a value outside that range, clamp it back to the
nearest valid value (e.g. 1.5 becomes 1.0, 0 becomes 0.01).

**Columns:** Period | Outcome total | Baseline average (prev 3 periods) | Increase ratio

**Conditional rendering:**
- **Empty result (`alerts.length === 0`):** render an explicit empty state — a
  title `No anomalies found` plus text mentioning the current threshold, e.g.
  `No periods exceeded a {threshold} increase over baseline.` Do NOT hide the
  section silently.
- **Loading (`isLoading === true`):** show a loading indicator in place of the table body.

## Feature 3 — B2B vs B2C Comparison View (new page)

A new dashboard page with two side-by-side panels (B2B and B2C) and a comparison chart below.

### `ComparisonView`
The page container. Holds the shared date filter and both panels.

**Props:**
- `dateFilter: DateRangeFilter` — the active date range, applied to both panels
- `onDateFilterChange: (next: DateRangeFilter) => void` — updates the shared filter

**Layout:** date filter on top, then `[ B2B panel ] [ B2C panel ]` side by side, then the comparison chart below both.

### `CategoryPanel`
One side of the comparison — the top-5 income categories for a single business line.

**Props:**
- `businessType: "B2B" | "B2C"` — which line this panel represents
- `categories: CategoryEntry[]` — the top-5 rows (from `TopCategoriesResponse`)
- `isLoading: boolean` — true while waiting for the API response

**Columns:** Category | Total income | Percent of panel total

**Percent of panel total:** the API does not return this. The component computes it
as `total_amount / sum(all total_amount in this panel) * 100`.

**Conditional rendering:**
- **Empty (`categories.length === 0`):** show an empty state with title
  `No income categories` and text `No income data for {businessType} in this range.`
- **Loading:** show a loading indicator in place of the rows.

### `ComparisonChart`
A single chart comparing total income of B2B vs B2C.

**Props:**
- `b2bTotal: number` — sum of `total_amount` across the B2B panel's top-5
- `b2cTotal: number` — sum of `total_amount` across the B2C panel's top-5

**Conditional rendering:**
- **Both totals zero:** show an empty state `No data to compare for this range.`

