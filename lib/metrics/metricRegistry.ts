import { metricDefinitions } from "@/data/mock-metrics";

export function findMetricDefinition(metricName: string) {
  const normalized = metricName.toLowerCase();
  return metricDefinitions.find((metric) => metric.name.toLowerCase() === normalized || metric.displayName.toLowerCase() === normalized);
}

export function isMetricDefined(metricName: string) {
  return Boolean(findMetricDefinition(metricName));
}
