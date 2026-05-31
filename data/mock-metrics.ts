import type { MetricDefinition, MetricRequest } from "@/types";

export const metricDefinitions: MetricDefinition[] = [
  { id: "gmv", name: "gmv", displayName: "GMV", description: "Total gross merchandise value before refunds.", formula: "sum(order_amount)", owner: "Data Product", grain: "daily", dimensions: ["channel", "city", "user_segment"], dataSource: "mart_orders", status: "active", lastReviewedAt: "2026-05-10" },
  { id: "revenue", name: "revenue", displayName: "Revenue", description: "Recognized platform revenue after discounts and refunds.", formula: "sum(net_revenue)", owner: "Finance Analytics", grain: "daily", dimensions: ["channel", "product_line"], dataSource: "mart_finance_revenue", status: "active", lastReviewedAt: "2026-05-12" },
  { id: "orders", name: "orders", displayName: "Orders", description: "Submitted order count excluding test orders.", formula: "count(distinct order_id)", owner: "Growth Analytics", grain: "daily", dimensions: ["channel", "new_or_returning"], dataSource: "mart_orders", status: "active", lastReviewedAt: "2026-05-09" },
  { id: "paid_orders", name: "paid_orders", displayName: "Paid Orders", description: "Orders with successful payment status.", formula: "count(distinct if(payment_status = 'paid', order_id, null))", owner: "Growth Analytics", grain: "daily", dimensions: ["channel", "payment_method"], dataSource: "mart_orders", status: "active", lastReviewedAt: "2026-05-09" },
  { id: "conversion_rate", name: "conversion_rate", displayName: "Conversion Rate", description: "Paid orders divided by product detail page visitors.", formula: "paid_orders / pdp_uv", owner: "Product Analytics", grain: "daily", dimensions: ["traffic_source", "device"], dataSource: "mart_funnel", status: "active", lastReviewedAt: "2026-05-16" },
  { id: "retention_rate", name: "retention_rate", displayName: "Retention Rate", description: "Users active in the current period who were also active in the prior period.", formula: "retained_users / eligible_users", owner: "Lifecycle Product", grain: "weekly", dimensions: ["cohort", "user_segment"], dataSource: "mart_user_retention", status: "active", lastReviewedAt: "2026-05-18" },
  { id: "cac", name: "cac", displayName: "CAC", description: "Marketing acquisition cost per new paid customer.", formula: "marketing_spend / new_paid_customers", owner: "Growth Ops", grain: "daily", dimensions: ["channel", "campaign"], dataSource: "mart_marketing_spend", status: "active", lastReviewedAt: "2026-05-14" },
  { id: "roi", name: "roi", displayName: "ROI", description: "Incremental revenue divided by marketing spend.", formula: "incremental_revenue / marketing_spend", owner: "Growth Ops", grain: "daily", dimensions: ["channel", "campaign"], dataSource: "mart_campaign_roi", status: "active", lastReviewedAt: "2026-05-15" }
];

export const metricRequests: MetricRequest[] = [
  { id: "mr-profit", metricName: "profit", requester: "PM Intern", businessQuestion: "Why did profit decline this month?", proposedDefinition: "Revenue minus refund amount minus marketing cost.", status: "pending", createdAt: "2026-05-28" }
];
