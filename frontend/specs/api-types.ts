/**
 * Response from GET /api/metrics/facets.
 * Used to populate the date range hint and category filters.
 */
export interface FacetsResponse {
  /** Operation types present in the dataset */
  operation_types: ("income" | "outcome")[];
  /** Business lines present (e.g. "B2B", "B2C") */
  business_types: string[];
  /** Movement categories present (e.g. "suppliers") */
  categories: string[];
  /** Earliest date with data, format YYYY-MM-DD */
  min_date: string;
  /** Latest date with data, format YYYY-MM-DD */
  max_date: string;
}

/**
 * One row from GET /api/metrics/alerts — a period flagged as anomalous.
 */
export interface AlertEntry {
  /** Period label, formatted per group_by (e.g. "2026-05" for month) */
  period: string;
  /** Total outcome (spending) recorded in this period */
  outcome_total: number;
  /** Rolling average of outcome over the 3 previous periods */
  baseline_average: number;
  /** Ratio of outcome_total over baseline_average (e.g. 1.5 = 50% above baseline) */
  increase_ratio: number;
}

/** GET /api/metrics/alerts returns an array of AlertEntry (may be empty) */
export type AlertsResponse = AlertEntry[];