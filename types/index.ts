export type MetricStatus = "active" | "draft" | "deprecated" | "requested";
export type ReviewStatus = "pending" | "approved" | "rejected" | "needs_revision";
export type SkillStatus = "stable" | "beta" | "experimental";

export interface MetricDefinition {
  id: string;
  name: string;
  key?: string;
  displayName: string;
  description: string;
  formula: string;
  owner: string;
  grain: "daily" | "weekly" | "monthly" | "event" | "user";
  dimensions: string[];
  dataSource: string;
  dataSources?: string[];
  aliases?: string[];
  caveat?: string;
  status: MetricStatus;
  lastReviewedAt: string;
}

export interface MetricRequest {
  id: string;
  metricName: string;
  key?: string;
  displayName?: string;
  requester: string;
  requestedBy?: string;
  businessQuestion: string;
  sourceQuestion?: string;
  reason?: string;
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
    formula?: string;
    caveat?: string;
    drivers?: string[];
    recommendations?: string[];
    reportingNote?: string;
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

export type EvidenceLanguage = "sql" | "python";
export type EvidenceReviewStatus = "mock" | "review_required" | "approved";
export type MonitoringStatus = "healthy" | "watch" | "incident";

export interface EvidenceQuery {
  id: string;
  title: string;
  language: EvidenceLanguage;
  source: string;
  owner: string;
  grain: "daily" | "weekly" | "event" | "user";
  metricKeys: string[];
  code: string;
  resultPreview: string[];
  reviewStatus: EvidenceReviewStatus;
}

export interface FunnelStepEvidence {
  id: string;
  label: string;
  users: number;
  conversionFromPrevious: number | null;
  baselineConversion: number | null;
  deltaVsBaseline: number | null;
  diagnosis: string;
}

export interface AnomalyContribution {
  id: string;
  segment: string;
  contribution: number;
  shareOfDrop: number;
  note: string;
}

export interface PythonDiagnosisEvidence {
  id: string;
  title: string;
  notebookPath: string;
  method: string;
  window: string;
  code: string;
  findings: string[];
  contributions: AnomalyContribution[];
  confidence: "low" | "medium" | "high";
  reviewNote: string;
}

export interface MonitoringSignal {
  id: string;
  metricKey: string;
  label: string;
  value: string;
  threshold: string;
  status: MonitoringStatus;
  owner: string;
  lastCheckedAt: string;
  action: string;
}

export interface EvidenceArtifact {
  id: string;
  title: string;
  route: string;
  purpose: string;
  screenshotHint: string;
}
