// =============================================================================
// Phase 2.6 - AI Safety & Analytics Types for EduCI
// =============================================================================

// ---------------------------------------------------------------------------
// ENUMS
// ---------------------------------------------------------------------------

export const AISafetyLevel = {
  None: 'none',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  Strict: 'strict',
} as const;
export type AISafetyLevel = (typeof AISafetyLevel)[keyof typeof AISafetyLevel];

export const ContentFilterCategory = {
  Profanity: 'profanity',
  HateSpeech: 'hate_speech',
  Violence: 'violence',
  Sexual: 'sexual',
  Spam: 'spam',
  PII: 'pii',
  SelfHarm: 'self_harm',
  IllegalActivity: 'illegal_activity',
  Custom: 'custom',
} as const;
export type ContentFilterCategory =
  (typeof ContentFilterCategory)[keyof typeof ContentFilterCategory];

export const PIIDetectionType = {
  Email: 'email',
  Phone: 'phone',
  Address: 'address',
  SSN: 'ssn',
  CreditCard: 'credit_card',
  Name: 'name',
  DateOfBirth: 'date_of_birth',
  MedicalRecord: 'medical_record',
  Custom: 'custom',
} as const;
export type PIIDetectionType =
  (typeof PIIDetectionType)[keyof typeof PIIDetectionType];

export const BiasType = {
  Gender: 'gender',
  Racial: 'racial',
  Age: 'age',
  Socioeconomic: 'socioeconomic',
  Disability: 'disability',
  Geographic: 'geographic',
  Religious: 'religious',
  Language: 'language',
  Custom: 'custom',
} as const;
export type BiasType = (typeof BiasType)[keyof typeof BiasType];

export const HallucinationType = {
  Factual: 'factual',
  Entity: 'entity',
  Relational: 'relational',
  Numerical: 'numerical',
  Temporal: 'temporal',
  Citation: 'citation',
  FabricatedSource: 'fabricated_source',
} as const;
export type HallucinationType =
  (typeof HallucinationType)[keyof typeof HallucinationType];

export const InjectionType = {
  PromptLeak: 'prompt_leak',
  Jailbreak: 'jailbreak',
  RolePlay: 'role_play',
  Encoded: 'encoded',
  MultiTurn: 'multi_turn',
  Payload: 'payload',
} as const;
export type InjectionType = (typeof InjectionType)[keyof typeof InjectionType];

export const OutputValidationType = {
  Format: 'format',
  Length: 'length',
  Content: 'content',
  Safety: 'safety',
  Accuracy: 'accuracy',
  Relevance: 'relevance',
} as const;
export type OutputValidationType =
  (typeof OutputValidationType)[keyof typeof OutputValidationType];

export const ComplianceFramework = {
  FERPA: 'ferpa',
  COPPA: 'coppa',
  GDPR: 'gdpr',
  HIPAA: 'hipaa',
  CIPA: 'cipa',
  LocalRegulation: 'local_regulation',
  Custom: 'custom',
} as const;
export type ComplianceFramework =
  (typeof ComplianceFramework)[keyof typeof ComplianceFramework];

export const AIContentType = {
  Text: 'text',
  Code: 'code',
  Image: 'image',
  Audio: 'audio',
  Video: 'video',
  Mixed: 'mixed',
} as const;
export type AIContentType =
  (typeof AIContentType)[keyof typeof AIContentType];

export const SafetyAction = {
  Block: 'block',
  Flag: 'flag',
  Modify: 'modify',
  Log: 'log',
  Alert: 'alert',
  Quarantine: 'quarantine',
  Notify: 'notify',
} as const;
export type SafetyAction = (typeof SafetyAction)[keyof typeof SafetyAction];

export const AuditEventType = {
  Request: 'request',
  Response: 'response',
  Filter: 'filter',
  Block: 'block',
  Escalation: 'escalation',
  PolicyChange: 'policy_change',
  ModelChange: 'model_change',
} as const;
export type AuditEventType =
  (typeof AuditEventType)[keyof typeof AuditEventType];

export const SatisfactionRating = {
  VeryDissatisfied: 'very_dissatisfied',
  Dissatisfied: 'dissatisfied',
  Neutral: 'neutral',
  Satisfied: 'satisfied',
  VerySatisfied: 'very_satisfied',
} as const;
export type SatisfactionRating =
  (typeof SatisfactionRating)[keyof typeof SatisfactionRating];

export const ROIIndicator = {
  Positive: 'positive',
  Neutral: 'neutral',
  Negative: 'negative',
} as const;
export type ROIIndicator =
  (typeof ROIIndicator)[keyof typeof ROIIndicator];

export const AdoptionStage = {
  Awareness: 'awareness',
  Trial: 'trial',
  Regular: 'regular',
  Power: 'power',
  Declining: 'declining',
} as const;
export type AdoptionStage =
  (typeof AdoptionStage)[keyof typeof AdoptionStage];

export const AnalyticsGranularity = {
  Minute: 'minute',
  Hour: 'hour',
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Quarter: 'quarter',
  Year: 'year',
} as const;
export type AnalyticsGranularity =
  (typeof AnalyticsGranularity)[keyof typeof AnalyticsGranularity];

export const VoiceMode = {
  Realtime: 'realtime',
  PushToTalk: 'push_to_talk',
  WakeWord: 'wake_word',
  Continuous: 'continuous',
} as const;
export type VoiceMode = (typeof VoiceMode)[keyof typeof VoiceMode];

export const VoiceLanguage = {
  FR: 'fr',
  EN: 'en',
  Wolof: 'wolof',
  Dioula: 'dioula',
  Baule: 'baulé',
  Custom: 'custom',
} as const;
export type VoiceLanguage =
  (typeof VoiceLanguage)[keyof typeof VoiceLanguage];

export const VoiceGender = {
  Male: 'male',
  Female: 'female',
  Neutral: 'neutral',
} as const;
export type VoiceGender = (typeof VoiceGender)[keyof typeof VoiceGender];

export const TranscriptionQuality = {
  Draft: 'draft',
  Standard: 'standard',
  High: 'high',
  Premium: 'premium',
} as const;
export type TranscriptionQuality =
  (typeof TranscriptionQuality)[keyof typeof TranscriptionQuality];

export const AISuggestionType = {
  TextCompletion: 'text_completion',
  ContentRewrite: 'content_rewrite',
  StructureChange: 'structure_change',
  GrammarFix: 'grammar_fix',
  Translation: 'translation',
  Summary: 'summary',
  Expansion: 'expansion',
  Question: 'question',
} as const;
export type AISuggestionType =
  (typeof AISuggestionType)[keyof typeof AISuggestionType];

// ---------------------------------------------------------------------------
// INTERFACES - AI Safety (1-20)
// ---------------------------------------------------------------------------

export interface ContentModerationResult {
  id: string;
  schoolId: string;
  content: string;
  contentType: AIContentType;
  categories: ModerationCategory[];
  overallScore: number;
  safe: boolean;
  action: SafetyAction;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ModerationCategory {
  category: ContentFilterCategory;
  score: number;
  flagged: boolean;
  details: string;
  confidence: number;
}

export interface PIIDetectionResult {
  id: string;
  schoolId: string;
  content: string;
  entities: PIIDetectedEntity[];
  overallRisk: string;
  metadata: Record<string, unknown>;
  detectedAt: string;
}

export interface PIIDetectedEntity {
  type: PIIDetectionType;
  value: string;
  startIndex: number;
  endIndex: number;
  confidence: number;
  masked: boolean;
  metadata: Record<string, unknown>;
}

export interface BiasDetectionResult {
  id: string;
  schoolId: string;
  content: string;
  biases: BiasDetected[];
  overallBiasScore: number;
  metadata: Record<string, unknown>;
  detectedAt: string;
}

export interface BiasDetected {
  type: BiasType;
  score: number;
  evidence: string;
  suggestion: string;
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface HallucinationDetection {
  id: string;
  schoolId: string;
  content: string;
  claims: HallucinatedClaim[];
  overallScore: number;
  metadata: Record<string, unknown>;
  detectedAt: string;
}

export interface HallucinatedClaim {
  claim: string;
  confidence: number;
  evidence: string;
  correction?: string;
  type: HallucinationType;
  metadata: Record<string, unknown>;
}

export interface InjectionDetection {
  id: string;
  schoolId: string;
  input: string;
  attackType: InjectionType;
  detected: boolean;
  confidence: number;
  blocked: boolean;
  metadata: Record<string, unknown>;
  detectedAt: string;
}

export interface OutputValidation {
  id: string;
  schoolId: string;
  input: string;
  output: string;
  validations: ValidationResult[];
  passed: boolean;
  metadata: Record<string, unknown>;
  validatedAt: string;
}

export interface ValidationResult {
  type: OutputValidationType;
  passed: boolean;
  score: number;
  details: string;
  metadata: Record<string, unknown>;
}

export interface SafetyPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  level: AISafetyLevel;
  rules: SafetyRule[];
  enabled: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SafetyRule {
  id: string;
  policyId: string;
  type: string;
  conditions: Record<string, unknown>;
  action: SafetyAction;
  priority: number;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface SafetyIncident {
  id: string;
  schoolId: string;
  userId?: string;
  modelId?: string;
  type: string;
  severity: string;
  content: string;
  action: SafetyAction;
  details: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  resolvedAt?: string;
}

export interface ComplianceReport {
  id: string;
  schoolId: string;
  framework: ComplianceFramework;
  status: string;
  score: number;
  findings: ComplianceFinding[];
  generatedAt: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface ComplianceFinding {
  category: string;
  severity: string;
  description: string;
  remediation: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface SafetyAuditEntry {
  id: string;
  schoolId: string;
  eventType: AuditEventType;
  entityType: string;
  entityId: string;
  details: Record<string, unknown>;
  userId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ContentFilterConfig {
  id: string;
  schoolId: string;
  categories: ContentFilterCategory[];
  threshold: number;
  action: SafetyAction;
  customRules: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface PromptInjectionLog {
  id: string;
  schoolId: string;
  input: string;
  detected: boolean;
  type: InjectionType;
  confidence: number;
  blocked: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SafetyDashboard {
  id: string;
  schoolId: string;
  totalRequests: number;
  blockedRequests: number;
  flaggedRequests: number;
  topCategories: ContentFilterCategory[];
  trend: number[];
  period: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// INTERFACES - AI Analytics (21-40)
// ---------------------------------------------------------------------------

export interface TokenUsageAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalInput: number;
  totalOutput: number;
  totalCached: number;
  totalCost: number;
  byModel: Record<string, TokenUsage>;
  byUser: Record<string, TokenUsage>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface TokenUsage {
  input: number;
  output: number;
  cached: number;
  cost: number;
}

export interface CostAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalCost: number;
  budget: number;
  remaining: number;
  projected: number;
  byProvider: Record<string, number>;
  byFeature: Record<string, number>;
  alerts: CostAlert[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CostAlert {
  id: string;
  schoolId: string;
  type: string;
  threshold: number;
  current: number;
  message: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface LatencyAnalytics {
  id: string;
  schoolId: string;
  period: string;
  avgP50: number;
  avgP95: number;
  avgP99: number;
  maxLatency: number;
  byModel: Record<string, LatencyStats>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface LatencyStats {
  avg: number;
  p50: number;
  p95: number;
  p99: number;
  max: number;
  min: number;
}

export interface SuccessRateAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalRequests: number;
  successful: number;
  failed: number;
  timeout: number;
  byModel: Record<string, number>;
  byError: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ModelPerformanceAnalytics {
  id: string;
  modelId: string;
  schoolId: string;
  period: string;
  requests: number;
  tokens: number;
  cost: number;
  avgLatency: number;
  successRate: number;
  userRating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptPerformanceAnalytics {
  id: string;
  promptId: string;
  schoolId: string;
  period: string;
  executions: number;
  avgQuality: number;
  avgCost: number;
  avgLatency: number;
  rating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface UserSatisfactionAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalRatings: number;
  averageRating: number;
  distribution: Record<string, number>;
  feedback: UserFeedback[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface UserFeedback {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  tags: string[];
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ConversationAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalConversations: number;
  avgMessages: number;
  avgTokens: number;
  avgDuration: number;
  completionRate: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ROIMetrics {
  id: string;
  schoolId: string;
  period: string;
  timeSaved: number;
  costSavings: number;
  productivityGain: number;
  studentImprovement: number;
  teacherSatisfaction: number;
  metadata: Record<string, unknown>;
  calculatedAt: string;
}

export interface AdoptionMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  retentionRate: number;
  featureUsage: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIUsageReport {
  id: string;
  schoolId: string;
  period: string;
  summary: string;
  highlights: string[];
  recommendations: string[];
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface AnalyticsDashboard {
  id: string;
  schoolId: string;
  widgets: AnalyticsWidget[];
  layout: Record<string, unknown>;
  refreshInterval: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsWidget {
  id: string;
  dashboardId: string;
  type: string;
  title: string;
  query: string;
  config: Record<string, unknown>;
  position: Record<string, number>;
  size: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface AnalyticsExport {
  id: string;
  schoolId: string;
  format: string;
  dateFrom: string;
  dateTo: string;
  recordCount: number;
  downloadUrl: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AnalyticsAlert {
  id: string;
  schoolId: string;
  metric: string;
  condition: string;
  threshold: number;
  currentValue: number;
  channels: string[];
  enabled: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIInsight {
  id: string;
  schoolId: string;
  type: string;
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  data: Record<string, unknown>;
  priority: number;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface AIInsightCategory {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  insightCount: number;
  metadata: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// INTERFACES - Prompt Management (41-55)
// ---------------------------------------------------------------------------

export interface PromptLibraryEntry {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  content: string;
  category: PromptLibraryCategory;
  tags: string[];
  variables: PromptVariable[];
  version: number;
  isPublic: boolean;
  usageCount: number;
  rating: number;
  ratingCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface PromptLibraryCategory {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  icon: string;
  parentId?: string;
  itemCount: number;
  metadata: Record<string, unknown>;
}

export interface PromptVariable {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: unknown;
}

export interface PromptTestResult {
  id: string;
  promptId: string;
  input: Record<string, unknown>;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  score: number;
  latency: number;
  cost: number;
  metadata: Record<string, unknown>;
  testedAt: string;
}

export interface PromptTestSuite {
  id: string;
  promptId: string;
  name: string;
  testCases: PromptTestCase[];
  passRate: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptTestCase {
  id: string;
  input: Record<string, unknown>;
  expectedOutput: string;
  criteria: string;
  metadata: Record<string, unknown>;
}

export interface PromptVersion {
  id: string;
  promptId: string;
  version: number;
  content: string;
  variables: PromptVariable[];
  changelog: string;
  metadata: Record<string, unknown>;
  publishedAt: string;
  publishedBy: string;
}

export interface PromptSharing {
  id: string;
  promptId: string;
  sharedWith: string[];
  permission: string;
  sharedBy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptAnalytics {
  id: string;
  promptId: string;
  period: string;
  executions: number;
  avgQuality: number;
  avgCost: number;
  avgLatency: number;
  rating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptTemplate {
  id: string;
  schoolId: string;
  name: string;
  content: string;
  category: string;
  variables: PromptVariable[];
  usageCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptEvaluation {
  id: string;
  promptId: string;
  evaluatorId: string;
  scores: EvaluationScore[];
  comments: string;
  metadata: Record<string, unknown>;
  evaluatedAt: string;
}

export interface EvaluationScore {
  criterion: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface PromptChain {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: PromptChainStep[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptChainStep {
  id: string;
  chainId: string;
  order: number;
  promptId: string;
  inputMapping: Record<string, string>;
  outputMapping: Record<string, string>;
  metadata: Record<string, unknown>;
}

export interface PromptDependency {
  id: string;
  promptId: string;
  dependsOnPromptId: string;
  type: string;
  metadata: Record<string, unknown>;
}

export interface PromptUsageLog {
  id: string;
  promptId: string;
  userId: string;
  input: Record<string, unknown>;
  output: string;
  tokenCount: number;
  cost: number;
  latency: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PromptMarketplaceEntry {
  id: string;
  promptId: string;
  price: number;
  license: string;
  downloads: number;
  revenue: number;
  metadata: Record<string, unknown>;
  listedAt: string;
}

// ---------------------------------------------------------------------------
// INTERFACES - AI Automation (56-65)
// ---------------------------------------------------------------------------

export interface AIWorkflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  triggers: AIWorkflowTrigger[];
  steps: AIWorkflowStep[];
  variables: Record<string, unknown>;
  status: string;
  version: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AIWorkflowTrigger {
  id: string;
  type: string;
  config: Record<string, unknown>;
  conditions: Record<string, unknown>[];
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface AIWorkflowStep {
  id: string;
  workflowId: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  nextStepId?: string;
  onError: string;
  conditions: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface AIWorkflowExecution {
  id: string;
  workflowId: string;
  schoolId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: string;
  currentStepId: string;
  stepResults: Record<string, unknown>;
  error?: string;
  metadata: Record<string, unknown>;
  startedAt: string;
  completedAt?: string;
}

export interface AISuggestion {
  id: string;
  schoolId: string;
  userId: string;
  type: AISuggestionType;
  title: string;
  description: string;
  content: string;
  context: Record<string, unknown>;
  accepted: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIDecision {
  id: string;
  schoolId: string;
  userId: string;
  input: string;
  options: DecisionOption[];
  selected: string;
  confidence: number;
  reasoning: string;
  metadata: Record<string, unknown>;
  decidedAt: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  confidence: number;
  pros: string[];
  cons: string[];
  metadata: Record<string, unknown>;
}

export interface AIApprovalRequest {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  content: string;
  status: string;
  approverId: string;
  response: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  respondedAt?: string;
}

export interface HumanInTheLoop {
  id: string;
  schoolId: string;
  executionId: string;
  stepId: string;
  question: string;
  options: string[];
  selectedOption?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  respondedAt?: string;
}

export interface AIFeedbackLoop {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  userId: string;
  rating: number;
  correction?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// INTERFACES - Voice & Vision (66-82)
// ---------------------------------------------------------------------------

export interface VoiceSession {
  id: string;
  schoolId: string;
  userId: string;
  agentId?: string;
  mode: VoiceMode;
  language: VoiceLanguage;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface VoiceTranscript {
  id: string;
  sessionId: string;
  speaker: string;
  text: string;
  confidence: number;
  timestamps: VoiceTimestamp[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface VoiceTimestamp {
  word: string;
  startMs: number;
  endMs: number;
  confidence: number;
}

export interface VoiceCommand {
  id: string;
  sessionId: string;
  command: string;
  intent: string;
  entities: Record<string, string>;
  action: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface VoiceResponse {
  id: string;
  sessionId: string;
  text: string;
  audioUrl: string;
  duration: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface VoiceConfig {
  id: string;
  schoolId: string;
  language: VoiceLanguage;
  gender: VoiceGender;
  speed: number;
  pitch: number;
  quality: TranscriptionQuality;
  metadata: Record<string, unknown>;
}

export interface VisionAnalysis {
  id: string;
  schoolId: string;
  imageUrl: string;
  mimeType: string;
  result: VisionResult;
  metadata: Record<string, unknown>;
  processedAt: string;
}

export interface VisionResult {
  type: string;
  labels: VisionLabel[];
  objects: VisionObject[];
  text: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface VisionLabel {
  name: string;
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface VisionObject {
  name: string;
  confidence: number;
  boundingBox: BoundingBox;
  metadata: Record<string, unknown>;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageAnalysis {
  id: string;
  schoolId: string;
  imageUrl: string;
  ocr: string;
  classification: string;
  tags: string[];
  description: string;
  metadata: Record<string, unknown>;
  analyzedAt: string;
}

export interface VideoAnalysis {
  id: string;
  schoolId: string;
  videoUrl: string;
  duration: number;
  transcript: string;
  summary: string;
  keyframes: VideoKeyframe[];
  metadata: Record<string, unknown>;
  analyzedAt: string;
}

export interface VideoKeyframe {
  timestamp: number;
  description: string;
  imageUrl: string;
}

export interface AudioAnalysis {
  id: string;
  schoolId: string;
  audioUrl: string;
  duration: number;
  transcript: string;
  language: string;
  speakers: AudioSpeaker[];
  summary: string;
  metadata: Record<string, unknown>;
  analyzedAt: string;
}

export interface AudioSpeaker {
  id: string;
  name: string;
  segments: AudioSegment[];
}

export interface AudioSegment {
  startMs: number;
  endMs: number;
  text: string;
}

// ---------------------------------------------------------------------------
// INTERFACES - Mobile AI (83-90)
// ---------------------------------------------------------------------------

export interface MobileAIChat {
  id: string;
  schoolId: string;
  userId: string;
  agentId?: string;
  messages: MobileChatMessage[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface MobileChatMessage {
  id: string;
  chatId: string;
  role: string;
  content: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface MobileVoiceAssistant {
  id: string;
  schoolId: string;
  userId: string;
  sessions: VoiceSession[];
  config: VoiceConfig;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface MobileAIRecommendation {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  actionUrl: string;
  priority: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface MobileAIInsight {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  title: string;
  summary: string;
  details: Record<string, unknown>;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface MobileStudentTutor {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  sessions: TutorSession[];
  progress: TutorProgress;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface TutorSession {
  id: string;
  studentId: string;
  subjectId: string;
  topic: string;
  duration: number;
  score: number;
  metadata: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
}

export interface TutorProgress {
  topicsCovered: number;
  totalHours: number;
  improvementRate: number;
  nextMilestone: string;
}

export interface MobileTeacherCopilot {
  id: string;
  schoolId: string;
  teacherId: string;
  suggestions: AISuggestion[];
  recentActions: AssistantAction[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AssistantAction {
  id: string;
  type: string;
  description: string;
  result: string;
  metadata: Record<string, unknown>;
  executedAt: string;
}
