/**
 * Optional date range filter shared across features.
 * Only include keys the user actually set.
 */
export interface DateRangeFilter {
  /** Range start, inclusive. Format YYYY-MM-DD */
  start_date?: string;
  /** Range end, inclusive. Format YYYY-MM-DD */
  end_date?: string;
}

/**
 * Query params for GET /api/metrics/alerts.
 * Extends the shared date filter.
 */
export interface AlertsParams extends DateRangeFilter {
  /** Spike sensitivity. API minimum 0; UI restricts to 0.01–1.0. Default 0.3 */
  threshold: number;
  /** Period grouping. Default "month" */
  group_by?: "day" | "week" | "month";
  /** Optional business line filter */
  business_type?: "B2B" | "B2C";
}

/**
 * Query params for GET /api/metrics/categories/top.
 * Extends the shared date filter.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /** Income or outcome categories. Default "outcome" */
  operation_type: "income" | "outcome";
  /** How many to return. API allows 1–20. Default 5 */
  limit: number;
  /** Optional business line filter */
  business_type?: "B2B" | "B2C";
}