import type { MetricDefinition } from "@/types";

export const metricDefinitions: MetricDefinition[] = [
  { id: "gmv", name: "gmv", displayName: "GMV", description: "退款前的商品交易总额。", formula: "sum(order_amount)", owner: "Data Product", grain: "daily", dimensions: ["channel", "city", "user_segment"], dataSource: "mart_orders", status: "active", lastReviewedAt: "2026-05-10" },
  { id: "revenue", name: "revenue", displayName: "Revenue / 收入", description: "扣除折扣和退款后的平台确认收入。", formula: "sum(net_revenue)", owner: "Finance Analytics", grain: "daily", dimensions: ["channel", "product_line"], dataSource: "mart_finance_revenue", status: "active", lastReviewedAt: "2026-05-12" },
  { id: "orders", name: "orders", displayName: "Orders / 订单数", description: "排除测试订单后的提交订单数。", formula: "count(distinct order_id)", owner: "Growth Analytics", grain: "daily", dimensions: ["channel", "new_or_returning"], dataSource: "mart_orders", status: "active", lastReviewedAt: "2026-05-09" },
  { id: "paid_orders", name: "paid_orders", displayName: "Paid Orders / 支付订单数", description: "支付状态为成功的订单数。", formula: "count(distinct if(payment_status = 'paid', order_id, null))", owner: "Growth Analytics", grain: "daily", dimensions: ["channel", "payment_method"], dataSource: "mart_orders", status: "active", lastReviewedAt: "2026-05-09" },
  { id: "conversion_rate", name: "conversion_rate", displayName: "Conversion Rate / 转化率", description: "支付订单数除以商品详情页访问用户数。", formula: "paid_orders / pdp_uv", owner: "Product Analytics", grain: "daily", dimensions: ["traffic_source", "device"], dataSource: "mart_funnel", status: "active", lastReviewedAt: "2026-05-16" },
  { id: "retention_rate", name: "retention_rate", displayName: "Retention Rate / 留存率", description: "当前周期活跃且上一周期也活跃的用户占比。", formula: "retained_users / eligible_users", owner: "Lifecycle Product", grain: "weekly", dimensions: ["cohort", "user_segment"], dataSource: "mart_user_retention", status: "active", lastReviewedAt: "2026-05-18" },
  { id: "cac", name: "cac", displayName: "CAC", description: "每个新增付费用户对应的营销获客成本。", formula: "marketing_spend / new_paid_customers", owner: "Growth Ops", grain: "daily", dimensions: ["channel", "campaign"], dataSource: "mart_marketing_spend", status: "active", lastReviewedAt: "2026-05-14" },
  { id: "roi", name: "roi", displayName: "ROI", description: "增量收入除以营销投放成本。", formula: "incremental_revenue / marketing_spend", owner: "Growth Ops", grain: "daily", dimensions: ["channel", "campaign"], dataSource: "mart_campaign_roi", status: "active", lastReviewedAt: "2026-05-15" },
];

export const metricRequests = [];
