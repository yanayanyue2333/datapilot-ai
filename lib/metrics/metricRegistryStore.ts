"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { metricDefinitions, metricRequests } from "@/data/mock-metrics";
import type { MetricDefinition, MetricRequest, MetricReviewAction } from "@/types";

export const approvedProfitDefinition: MetricDefinition = {
  id: "profit",
  name: "profit",
  key: "profit",
  displayName: "利润",
  description: "用于内部产品分析的经营毛利口径。",
  formula: "revenue - marketing_cost - refund_amount - fulfillment_cost",
  owner: "Data Analytics",
  grain: "daily",
  dimensions: ["channel", "product_line", "city"],
  dataSource: "orders_daily, finance_daily, marketing_daily",
  dataSources: ["orders_daily", "finance_daily", "marketing_daily"],
  aliases: ["利润", "profit", "经营毛利", "毛利"],
  caveat: "当前使用的是经营毛利口径，不等于财务净利润；不包含固定成本、税费或薪酬费用。",
  status: "active",
  lastReviewedAt: "2026-06-01",
};

export type ApprovedMetricDefinitionInput = Omit<MetricDefinition, "id" | "name" | "status" | "lastReviewedAt" | "grain" | "dimensions" | "dataSource"> & {
  key: string;
  dataSources: string[];
  grain?: MetricDefinition["grain"];
  dimensions?: string[];
};

interface MetricRegistryStore {
  definitions: MetricDefinition[];
  requests: MetricRequest[];
  reviewActions: MetricReviewAction[];
  submitMetricRequest: (request: MetricRequest) => void;
  approveMetricRequest: (requestId: string, approvedDefinition: ApprovedMetricDefinitionInput) => void;
  rejectMetricRequest: (requestId: string, reason: string) => void;
  addMetricDefinition: (definition: MetricDefinition) => void;
  findMetricDefinition: (metricKeyOrAlias: string) => MetricDefinition | undefined;
  canAnswerQuestion: (question: string) => boolean;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function matchesMetric(definition: MetricDefinition, metricKeyOrAlias: string) {
  const target = normalize(metricKeyOrAlias);
  const candidates = [definition.id, definition.name, definition.key, definition.displayName, ...(definition.aliases ?? [])].filter(Boolean).map((value) => normalize(String(value)));
  return candidates.includes(target);
}

function inferMetricFromQuestion(question: string) {
  const normalized = normalize(question);
  if (normalized.includes("profit") || question.includes("利润") || question.includes("毛利")) return "profit";
  if (normalized.includes("gmv")) return "gmv";
  if (normalized.includes("roi") || question.includes("渠道") || question.includes("投放")) return "roi";
  if (question.includes("老用户") || question.includes("回来") || question.includes("留存")) return "retention_rate";
  return "gmv";
}

export const useMetricRegistryStore = create<MetricRegistryStore>()(
  persist(
    (set, get) => ({
      definitions: metricDefinitions,
      requests: metricRequests,
      reviewActions: [],
      submitMetricRequest: (request) => {
        set((state) => {
          const existing = state.requests.find((item) => item.id === request.id || (item.key === request.key && item.status === "pending"));
          if (existing) return state;
          return { requests: [request, ...state.requests] };
        });
      },
      approveMetricRequest: (requestId, approvedDefinition) => {
        const definition: MetricDefinition = {
          id: approvedDefinition.key,
          name: approvedDefinition.key,
          key: approvedDefinition.key,
          displayName: approvedDefinition.displayName,
          description: approvedDefinition.description,
          formula: approvedDefinition.formula,
          owner: approvedDefinition.owner,
          grain: approvedDefinition.grain ?? "daily",
          dimensions: approvedDefinition.dimensions ?? ["channel", "product_line"],
          dataSource: approvedDefinition.dataSources.join(", "),
          dataSources: approvedDefinition.dataSources,
          aliases: approvedDefinition.aliases,
          caveat: approvedDefinition.caveat,
          status: "active",
          lastReviewedAt: new Date().toISOString().slice(0, 10),
        };

        set((state) => ({
          definitions: state.definitions.some((item) => matchesMetric(item, definition.name))
            ? state.definitions.map((item) => (matchesMetric(item, definition.name) ? definition : item))
            : [...state.definitions, definition],
          requests: state.requests.map((request) => (request.id === requestId ? { ...request, status: "approved" } : request)),
          reviewActions: [
            {
              id: `review-${requestId}-${Date.now()}`,
              requestId,
              reviewer: "分析师",
              action: "approved",
              comment: `已批准 ${definition.displayName}，公式：${definition.formula}`,
              createdAt: new Date().toISOString(),
            },
            ...state.reviewActions,
          ],
        }));
      },
      rejectMetricRequest: (requestId, reason) => {
        set((state) => ({
          requests: state.requests.map((request) => (request.id === requestId ? { ...request, status: "rejected" } : request)),
          reviewActions: [
            {
              id: `review-${requestId}-${Date.now()}`,
              requestId,
              reviewer: "分析师",
              action: "rejected",
              comment: reason,
              createdAt: new Date().toISOString(),
            },
            ...state.reviewActions,
          ],
        }));
      },
      addMetricDefinition: (definition) => {
        set((state) => ({
          definitions: state.definitions.some((item) => matchesMetric(item, definition.name))
            ? state.definitions.map((item) => (matchesMetric(item, definition.name) ? definition : item))
            : [...state.definitions, definition],
        }));
      },
      findMetricDefinition: (metricKeyOrAlias) => get().definitions.find((definition) => matchesMetric(definition, metricKeyOrAlias)),
      canAnswerQuestion: (question) => Boolean(get().findMetricDefinition(inferMetricFromQuestion(question))),
    }),
    {
      name: "datapilot-metric-registry",
      partialize: (state) => ({
        definitions: state.definitions,
        requests: state.requests,
        reviewActions: state.reviewActions,
      }),
    },
  ),
);
