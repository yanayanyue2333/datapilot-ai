export type MetricStatus = "active" | "draft" | "deprecated" | "requested";
export type ReviewStatus = "pending" | "approved" | "rejected" | "needs_revision";
export type SkillStatus = "stable" | "beta" | "experimental";

export interface MetricDefinition {
  id: string;
  name: string;
  displayName: string;
  description: string;
  formula: string;
  owner: string;
  grain: "daily" | "weekly" | "monthly" | "event" | "user";
  dimensions: string[];
  dataSource: string;
  status: MetricStatus;
  lastReviewedAt: string;
}

export interface MetricRequest {
  id: string;
  metricName: string;
  requester: string;
  businessQuestion: string;
  proposedDefinition?: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface MetricReviewAction {
  id: string;
  requestId: string;
  reviewer: string;
  action: ReviewStatus;
  comment: string;
  createdAt: string;
}

export interface MetricRegistryState {
  definitions: MetricDefinition[];
  requests: MetricRequest[];
  reviewActions: MetricReviewAction[];
}

export interface DataQuestion {
  id: string;
  question: string;
  userRole: string;
  requestedMetricNames: string[];
  createdAt: string;
}

export interface AnalysisTraceStep {
  id: string;
  label: string;
  status: "completed" | "blocked" | "pending";
  productVisibleReason: string;
}

export interface AIAnswer {
  id: string;
  questionId: string;
  answerType: "analysis" | "honest_refusal" | "clarification";
  summary: string;
  confidence: number;
  trace: AnalysisTraceStep[];
  suggestedNextActions: string[];
}

export interface QuestionIntent {
  id: string;
  label: string;
  description: string;
}

export interface HonestRefusal {
  reason: string;
  missingMetric: string;
  alternativeAnalysis: string[];
  requiredConfirmation: string;
}

export interface DataAssistantResult {
  question: string;
  intent: QuestionIntent;
  requiredMetric: string;
  availableAlternativeMetrics: string[];
  trace: AnalysisTraceStep[];
  answerType: "analysis" | "honest_refusal";
  refusal?: HonestRefusal;
  mockAnswer?: {
    title: string;
    summary: string;
    supportingSignals: string[];
    confidence: number;
  };
}

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  targetUser: string;
  useCase: string;
  inputParameters: string[];
  outputStructure: string[];
  usageCount: number;
  satisfactionScore: number;
  failureRate: number;
  latestIterationNote: string;
  status: SkillStatus;
}

export interface SkillRun {
  id: string;
  skillId: string;
  user: string;
  status: "success" | "failed" | "review_required";
  inputSummary: string;
  outputSummary: string;
  createdAt: string;
}

export interface SkillEvaluation {
  id: string;
  skillId: string;
  evaluator: string;
  score: number;
  failureMode?: string;
  recommendation: string;
}

export interface UserResearchInsight {
  id: string;
  segment: string;
  source: string;
  insight: string;
  productImplication: string;
  confidence: "low" | "medium" | "high";
}

export interface ProductUsageLog {
  id: string;
  date: string;
  dau: number;
  questions: number;
  skillRuns: number;
  answerSatisfaction: number;
  failureRate: number;
  lowConfidenceAnswerRatio: number;
  humanInterventionRate: number;
}

export interface FalseRejectionLog {
  id: string;
  userQuestion: string;
  mappedIntent: string;
  rejectionReason: string;
  proposedFix: string;
  severity: "low" | "medium" | "high";
}

export interface AnalysisReview {
  id: string;
  initialAnalysis: string;
  analystFinding: string;
  rejectionComment: string;
  revisedInsight: string;
  status: ReviewStatus;
}

export interface AIRadarItem {
  id: string;
  productName: string;
  updateOrMechanism: string;
  innovation: string;
  lessonForDataPilot: string;
  featureOpportunity: string;
}

export interface PRDSection {
  id: string;
  title: string;
  problem: string;
  proposedScope: string;
  successMetric: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  narrative: string;
  artifact: string;
}
