import { z } from "zod";

// =============================================================================
// MODULE 1 — Global Education Data Fabric
// =============================================================================

export enum GedkinDataDomain {
  SCHOOL = "SCHOOL",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  FINANCE = "FINANCE",
  HR = "HR",
  EXAMS = "EXAMS",
  CURRICULUM = "CURRICULUM",
  RESEARCH = "RESEARCH",
  GOVERNMENT = "GOVERNMENT",
  HEALTH = "HEALTH",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  IDENTITY = "IDENTITY",
  CLOUD = "CLOUD",
  CYBERSECURITY = "CYBERSECURITY",
}

export enum GedkinDataProductStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  DEPRECATED = "DEPRECATED",
  ARCHIVED = "ARCHIVED",
}

export enum GedkinDataQualityLevel {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  CRITICAL = "CRITICAL",
}

export enum GedkinDataClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  TOP_SECRET = "TOP_SECRET",
}

export enum GedkinDataVisibility {
  PRIVATE = "PRIVATE",
  INSTITUTIONAL = "INSTITUTIONAL",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  PUBLIC = "PUBLIC",
}

export interface GedkinDataDomain_ {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  owner: string;
  steward: string;
  status: GedkinDataProductStatus;
  qualityLevel: GedkinDataQualityLevel;
  classification: GedkinDataClassification;
  visibility: GedkinDataVisibility;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinDataProduct {
  id: string;
  schoolId: string;
  domainId: string;
  name: string;
  description: string;
  type: string;
  version: string;
  status: GedkinDataProductStatus;
  schema: Record<string, unknown>;
  lineage: string[];
  contracts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GedkinDataContract {
  id: string;
  schoolId: string;
  productId: string;
  name: string;
  description: string;
  schema: Record<string, unknown>;
  sla: Record<string, unknown>;
  enforcement: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinDataSource {
  id: string;
  schoolId: string;
  domainId: string;
  name: string;
  type: string;
  connection: Record<string, unknown>;
  schema: Record<string, unknown>;
  refreshInterval: string;
  lastSyncedAt: string;
  status: string;
  createdAt: string;
}

export interface GedkinDataLineage {
  id: string;
  schoolId: string;
  sourceId: string;
  targetId: string;
  transformation: string;
  direction: string;
  createdAt: string;
}

export interface GedkinDataQuality_ {
  id: string;
  schoolId: string;
  domainId: string;
  productId: string;
  completeness: number;
  consistency: number;
  freshness: number;
  accuracy: number;
  overallScore: number;
  issues: string[];
  checkedAt: string;
}

// =============================================================================
// MODULE 2 — Knowledge Graph
// =============================================================================

export enum GedkinEntitytype {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  SCHOOL = "SCHOOL",
  UNIVERSITY = "UNIVERSITY",
  INSTITUTION = "INSTITUTION",
  COURSE = "COURSE",
  SUBJECT = "SUBJECT",
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  CERTIFICATION = "CERTIFICATION",
  EXAM = "EXAM",
  CURRICULUM = "CURRICULUM",
  RESEARCH = "RESEARCH",
  PUBLICATION = "PUBLICATION",
  ORGANIZATION = "ORGANIZATION",
  COUNTRY = "COUNTRY",
  REGION = "REGION",
  POLICY = "POLICY",
  REGULATION = "REGULATION",
  FUNDING = "FUNDING",
  JOB = "JOB",
  INDUSTRY = "INDUSTRY",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  TECHNOLOGY = "TECHNOLOGY",
}

export enum GedkinRelationtype {
  TEACHES = "TEACHES",
  STUDIES = "STUDIES",
  BELONGS_TO = "BELONGS_TO",
  GRADUATES_FROM = "GRADUATES_FROM",
  CERTIFIED_BY = "CERTIFIED_BY",
  EQUIVALENT_TO = "EQUIVALENT_TO",
  REQUIRES = "REQUIRES",
  DEPENDS_ON = "DEPENDS_ON",
  RELATED_TO = "RELATED_TO",
  WORKS_AT = "WORKS_AT",
  RESEARCHES = "RESEARCHES",
  FUNDS = "FUNDS",
  GOVERNS = "GOVERNS",
  REGULATES = "REGULATES",
  LOCATED_IN = "LOCATED_IN",
  PARTICIPATES_IN = "PARTICIPATES_IN",
  SPECIALIZES_IN = "SPECIALIZES_IN",
}

export interface GedkinKnowledgeEntity {
  id: string;
  schoolId: string;
  entityType: GedkinEntitytype;
  name: string;
  description: string;
  properties: Record<string, unknown>;
  embeddings: number[];
  createdAt: string;
  updatedAt: string;
}

export interface GedkinKnowledgeRelation {
  id: string;
  schoolId: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationType: GedkinRelationtype;
  weight: number;
  properties: Record<string, unknown>;
  createdAt: string;
}

export interface GedkinGraphSnapshot {
  id: string;
  schoolId: string;
  name: string;
  entityCount: number;
  relationCount: number;
  createdAt: string;
}

export interface GedkinEntityResolution {
  id: string;
  schoolId: string;
  sourceEntityId: string;
  targetEntityId: string;
  confidence: number;
  method: string;
  resolvedAt: string;
}

// =============================================================================
// MODULE 3 — Semantic Intelligence
// =============================================================================

export enum GedkinSemanticLanguage {
  FR = "FR",
  EN = "EN",
  ES = "ES",
  AR = "AR",
  PT = "PT",
}

export enum GedkinSearchType {
  KEYWORD = "KEYWORD",
  SEMANTIC = "SEMANTIC",
  HYBRID = "HYBRID",
  VECTOR = "VECTOR",
  GRAPH = "GRAPH",
}

export enum GedkinEmbeddingModel {
  OPENAI = "OPENAI",
  SENTENCE_TRANSFORMER = "SENTENCE_TRANSFORMER",
  MULTILINGUAL_E5 = "MULTILINGUAL_E5",
  CUSTOM = "CUSTOM",
}

export interface GedkinSemanticConcept {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  language: GedkinSemanticLanguage;
  synonyms: string[];
  relatedConcepts: string[];
  ontologyId: string;
  createdAt: string;
}

export interface GedkinOntology {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  version: string;
  concepts: string[];
  relations: string[];
  language: GedkinSemanticLanguage;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinTaxonomy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  rootConcepts: string[];
  depth: number;
  language: GedkinSemanticLanguage;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinEmbedding {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  model: GedkinEmbeddingModel;
  vector: number[];
  dimensions: number;
  createdAt: string;
}

export interface GedkinSemanticSearch {
  id: string;
  schoolId: string;
  query: string;
  language: GedkinSemanticLanguage;
  results: string[];
  searchType: GedkinSearchType;
  timestamp: string;
}

// =============================================================================
// MODULE 4 — Research Intelligence
// =============================================================================

export enum GedkinResearchStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
}

export enum GedkinPublicationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  ACCEPTED = "ACCEPTED",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
}

export interface GedkinResearchProject {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  status: GedkinResearchStatus;
  principalInvestigator: string;
  coInvestigators: string[];
  startDate: string;
  endDate: string;
  funding: number;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GedkinPublication {
  id: string;
  schoolId: string;
  projectId: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  citations: number;
  status: GedkinPublicationStatus;
  abstract: string;
  keywords: string[];
  createdAt: string;
}

export interface GedkinResearcherProfile {
  id: string;
  schoolId: string;
  userId: string;
  name: string;
  institution: string;
  researchAreas: string[];
  publications: string[];
  hIndex: number;
  citations: number;
  orcidId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinCitation {
  id: string;
  schoolId: string;
  publicationId: string;
  citedByPublicationId: string;
  context: string;
  timestamp: string;
}

export interface GedkinResearchTrend {
  id: string;
  schoolId: string;
  topic: string;
  trendScore: number;
  growthRate: number;
  topInstitutions: string[];
  topCountries: string[];
  period: string;
  createdAt: string;
}

// =============================================================================
// MODULE 5 — Global Education Observatory
// =============================================================================

export enum GedkinIndicatorCategory {
  ENROLLMENT = "ENROLLMENT",
  LITERACY = "LITERACY",
  GRADUATION = "GRADUATION",
  DROPOUT = "DROPOUT",
  ATTENDANCE = "ATTENDANCE",
  TEACHER_RATIO = "TEACHER_RATIO",
  SPENDING = "SPENDING",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  DIGITAL_ACCESS = "DIGITAL_ACCESS",
  LEARNING_OUTCOMES = "LEARNING_OUTCOMES",
  GENDER_PARITY = "GENDER_PARITY",
  INCLUSION = "INCLUSION",
  EMPLOYMENT = "EMPLOYMENT",
  SKILLS = "SKILLS",
  MOBILITY = "MOBILITY",
}

export enum GedkinIndicatorFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
}

export interface GedkinObservatoryIndicator {
  id: string;
  schoolId: string;
  name: string;
  category: GedkinIndicatorCategory;
  value: number;
  unit: string;
  frequency: GedkinIndicatorFrequency;
  country: string;
  region: string;
  period: string;
  source: string;
  methodology: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinObservatoryDashboard {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  indicators: string[];
  filters: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinBenchmark {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  indicators: string[];
  benchmarks: Record<string, number>;
  period: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinSDGAlignment {
  id: string;
  schoolId: string;
  sdgNumber: number;
  sdgName: string;
  indicators: string[];
  alignmentScore: number;
  period: string;
  createdAt: string;
}

// =============================================================================
// MODULE 6 — Policy & Decision Intelligence
// =============================================================================

export enum GedkinPolicyStatus {
  DRAFT = "DRAFT",
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  RETIRED = "RETIRED",
}

export enum GedkinAnalysisType {
  COST_BENEFIT = "COST_BENEFIT",
  RISK = "RISK",
  IMPACT = "IMPACT",
  COMPARISON = "COMPARISON",
  WHAT_IF = "WHAT_IF",
}

export interface GedkinPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: GedkinPolicyStatus;
  category: string;
  effectiveDate: string;
  expiryDate: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinPolicySimulation {
  id: string;
  schoolId: string;
  policyId: string;
  parameters: Record<string, unknown>;
  results: Record<string, unknown>;
  confidence: number;
  createdAt: string;
}

export interface GedkinDecisionRecommendation {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  options: string[];
  analysisType: GedkinAnalysisType;
  confidence: number;
  evidence: string[];
  risks: string[];
  benefits: string[];
  createdAt: string;
}

export interface GedkinImpactAnalysis {
  id: string;
  schoolId: string;
  policyId: string;
  dimension: string;
  baselineValue: number;
  projectedValue: number;
  impactScore: number;
  confidence: number;
  timeframe: string;
  createdAt: string;
}

// =============================================================================
// MODULE 7 — Global Forecasting Engine
// =============================================================================

export enum GedkinForecastModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  ARIMA = "ARIMA",
  PROPHET = "PROPHET",
  LSTM = "LSTM",
  ENSEMBLE = "ENSEMBLE",
  TRANSFORMER = "TRANSFORMER",
}

export enum GedkinForecastType {
  ENROLLMENT = "ENROLLMENT",
  DROPOUT = "DROPOUT",
  GRADUATION = "GRADUATION",
  TEACHER_DEMAND = "TEACHER_DEMAND",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  FINANCIAL = "FINANCIAL",
  WORKFORCE = "WORKFORCE",
  SKILLS = "SKILLS",
  MOBILITY = "MOBILITY",
  POPULATION = "POPULATION",
}

export enum GedkinForecastStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface GedkinForecast {
  id: string;
  schoolId: string;
  name: string;
  type: GedkinForecastType;
  model: GedkinForecastModel;
  status: GedkinForecastStatus;
  parameters: Record<string, unknown>;
  predictions: GedkinForecastPrediction[];
  confidence: number;
  period: string;
  createdAt: string;
  completedAt: string;
}

export interface GedkinForecastModel_ {
  id: string;
  schoolId: string;
  name: string;
  type: GedkinForecastModel;
  version: string;
  accuracy: number;
  trainingData: Record<string, unknown>;
  hyperparameters: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinForecastPrediction {
  id: string;
  schoolId: string;
  forecastId: string;
  date: string;
  value: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
}

export interface GedkinCapacityForecast {
  id: string;
  schoolId: string;
  resourceType: string;
  currentCapacity: number;
  predictedDemand: number;
  gap: number;
  period: string;
  createdAt: string;
}

export interface GedkinDriftDetection {
  id: string;
  schoolId: string;
  forecastId: string;
  metric: string;
  driftScore: number;
  severity: string;
  detectedAt: string;
  acknowledged: boolean;
}

// =============================================================================
// MODULE 8 — AI Agent Network
// =============================================================================

export enum GedkinAgenttype {
  RESEARCH = "RESEARCH",
  DATA_ANALYST = "DATA_ANALYST",
  POLICY = "POLICY",
  CURRICULUM = "CURRICULUM",
  STUDENT_INTELLIGENCE = "STUDENT_INTELLIGENCE",
  TEACHER_INTELLIGENCE = "TEACHER_INTELLIGENCE",
  FINANCE_INTELLIGENCE = "FINANCE_INTELLIGENCE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  GOVERNMENT = "GOVERNMENT",
  COMPLIANCE = "COMPLIANCE",
  GLOBAL_EDUCATION = "GLOBAL_EDUCATION",
  KNOWLEDGE_GRAPH = "KNOWLEDGE_GRAPH",
  FORECASTING = "FORECASTING",
  OBSERVATORY = "OBSERVATORY",
}

export enum GedkinAgentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ERROR = "ERROR",
  MAINTENANCE = "MAINTENANCE",
}

export enum GedkinTaskStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum GedkinTaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface GedkinAIAgent {
  id: string;
  schoolId: string;
  type: GedkinAgenttype;
  name: string;
  description: string;
  status: GedkinAgentStatus;
  capabilities: string[];
  config: Record<string, unknown>;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinAgentTask {
  id: string;
  schoolId: string;
  agentId: string;
  type: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: GedkinTaskStatus;
  priority: GedkinTaskPriority;
  startedAt: string;
  completedAt: string;
  error: string;
  createdAt: string;
}

export interface GedkinAgentMessage {
  id: string;
  schoolId: string;
  taskId: string;
  fromAgentId: string;
  toAgentId: string;
  content: string;
  type: string;
  timestamp: string;
}

export interface GedkinToolCall {
  id: string;
  schoolId: string;
  agentId: string;
  taskId: string;
  tool: string;
  parameters: Record<string, unknown>;
  result: Record<string, unknown>;
  status: string;
  timestamp: string;
}

export interface GedkinAgentMemory {
  id: string;
  schoolId: string;
  agentId: string;
  key: string;
  value: string;
  ttl: number;
  expiresAt: string;
}

// =============================================================================
// MODULE 9 — Digital Research Lab
// =============================================================================

export enum GedkinExperimentStatus {
  PLANNING = "PLANNING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum GedkinDatasetType {
  TABULAR = "TABULAR",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  GRAPH = "GRAPH",
  EMBEDDING = "EMBEDDING",
}

export interface GedkinExperiment {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: GedkinExperimentStatus;
  hypothesis: string;
  methodology: string;
  datasetIds: string[];
  modelIds: string[];
  results: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
  createdAt: string;
}

export interface GedkinDataset_ {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: GedkinDatasetType;
  schema: Record<string, unknown>;
  size: number;
  rows: number;
  license: string;
  tags: string[];
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinModelExperiment {
  id: string;
  schoolId: string;
  experimentId: string;
  name: string;
  modelType: string;
  hyperparameters: Record<string, unknown>;
  metrics: Record<string, number>;
  artifacts: string[];
  status: string;
  createdAt: string;
}

export interface GedkinBenchmark_ {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  datasetIds: string[];
  metrics: Record<string, number>;
  baseline: Record<string, number>;
  createdAt: string;
}

// =============================================================================
// MODULE 10 — Data Products & Marketplace
// =============================================================================

export enum GedkinProductType {
  DATASET = "DATASET",
  INDICATOR = "INDICATOR",
  DASHBOARD = "DASHBOARD",
  API = "API",
  MODEL = "MODEL",
  EMBEDDING = "EMBEDDING",
  ONTOLOGY = "ONTOLOGY",
  KNOWLEDGE_GRAPH = "KNOWLEDGE_GRAPH",
  FORECAST = "FORECAST",
  REPORT = "REPORT",
}

export enum GedkinMarketplaceStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum GedkinLicenseType {
  FREE = "FREE",
  COMMERCIAL = "COMMERCIAL",
  RESEARCH = "RESEARCH",
  EDUCATIONAL = "EDUCATIONAL",
  GOVERNMENT = "GOVERNMENT",
}

export interface GedkinMarketplaceProduct {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: GedkinProductType;
  version: string;
  status: GedkinMarketplaceStatus;
  license: GedkinLicenseType;
  pricing: Record<string, unknown>;
  schema: Record<string, unknown>;
  documentation: string;
  rating: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinDataSubscription {
  id: string;
  schoolId: string;
  productId: string;
  userId: string;
  status: string;
  startDate: string;
  endDate: string;
  usage: Record<string, unknown>;
  createdAt: string;
}

export interface GedkinDataAccessLog {
  id: string;
  schoolId: string;
  productId: string;
  userId: string;
  action: string;
  timestamp: string;
  details: Record<string, unknown>;
}

export interface GedkinProductReview {
  id: string;
  schoolId: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GedkinProductSLA {
  id: string;
  schoolId: string;
  productId: string;
  availability: number;
  latency: number;
  freshness: number;
  uptime: number;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// MODULE 11 — Simulation & Scenario Engine
// =============================================================================

export enum GedkinSimulationType {
  POPULATION = "POPULATION",
  SCHOOLS = "SCHOOLS",
  STUDENTS = "STUDENTS",
  TEACHERS = "TEACHERS",
  FINANCE = "FINANCE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  TECHNOLOGY = "TECHNOLOGY",
  CLIMATE = "CLIMATE",
  MIGRATION = "MIGRATION",
  EMPLOYMENT = "EMPLOYMENT",
  SKILLS = "SKILLS",
  POLICY = "POLICY",
  MONTE_CARLO = "MONTE_CARLO",
}

export enum GedkinScenarioType {
  BASELINE = "BASELINE",
  OPTIMISTIC = "OPTIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  CUSTOM = "CUSTOM",
}

export enum GedkinSimulationStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface GedkinSimulation {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: GedkinSimulationType;
  status: GedkinSimulationStatus;
  parameters: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
  createdAt: string;
}

export interface GedkinScenario {
  id: string;
  schoolId: string;
  simulationId: string;
  name: string;
  type: GedkinScenarioType;
  description: string;
  assumptions: Record<string, unknown>;
  parameters: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinScenarioRun {
  id: string;
  schoolId: string;
  scenarioId: string;
  status: GedkinSimulationStatus;
  results: Record<string, unknown>;
  duration: number;
  startedAt: string;
  completedAt: string;
  createdAt: string;
}

export interface GedkinSimulationResult {
  id: string;
  schoolId: string;
  runId: string;
  dimension: string;
  baselineValue: number;
  scenarioValue: number;
  impact: number;
  confidence: number;
  createdAt: string;
}

export interface GedkinSensitivityAnalysis {
  id: string;
  schoolId: string;
  simulationId: string;
  parameter: string;
  range: Record<string, number>;
  impact: Record<string, number>;
  sensitivity: number;
  createdAt: string;
}

// =============================================================================
// MODULE 12 — Intelligence Copilot
// =============================================================================

export enum GedkinCopilotQueryType {
  NATURAL_LANGUAGE = "NATURAL_LANGUAGE",
  SQL = "SQL",
  KNOWLEDGE_GRAPH = "KNOWLEDGE_GRAPH",
  SEMANTIC = "SEMANTIC",
  FORECAST = "FORECAST",
  SIMULATION = "SIMULATION",
}

export enum GedkinCopilotResponseType {
  TEXT = "TEXT",
  CHART = "CHART",
  TABLE = "TABLE",
  REPORT = "REPORT",
  GRAPH = "GRAPH",
  CODE = "CODE",
}

export enum GedkinCopilotStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface GedkinCopilotQuery {
  id: string;
  schoolId: string;
  userId: string;
  query: string;
  queryType: GedkinCopilotQueryType;
  language: GedkinSemanticLanguage;
  status: GedkinCopilotStatus;
  createdAt: string;
}

export interface GedkinCopilotResponse {
  id: string;
  schoolId: string;
  queryId: string;
  answer: string;
  responseTypes: GedkinCopilotResponseType[];
  sources: GedkinCopilotSource[];
  citations: string[];
  confidence: number;
  provenance: Record<string, unknown>;
  processingTime: number;
  createdAt: string;
}

export interface GedkinCopilotConversation {
  id: string;
  schoolId: string;
  userId: string;
  queries: string[];
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GedkinCopilotSource {
  id: string;
  schoolId: string;
  type: string;
  entityId: string;
  entityName: string;
  relevance: number;
  excerpt: string;
  url: string;
}

export interface GedkinCopilotApproval {
  id: string;
  schoolId: string;
  queryId: string;
  responseId: string;
  approvedBy: string;
  status: string;
  reason: string;
  timestamp: string;
}

// =============================================================================
// ZOD SCHEMAS — MODULE 1 (Global Education Data Fabric)
// =============================================================================

export const createGedkinDataDomainSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  owner: z.string().min(1),
  steward: z.string().min(1),
  status: z.nativeEnum(GedkinDataProductStatus),
  qualityLevel: z.nativeEnum(GedkinDataQualityLevel),
  classification: z.nativeEnum(GedkinDataClassification),
  visibility: z.nativeEnum(GedkinDataVisibility),
});
export const updateGedkinDataDomainSchema = createGedkinDataDomainSchema.partial();

export const createGedkinDataProductSchema = z.object({
  schoolId: z.string().uuid(),
  domainId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  type: z.string().min(1),
  version: z.string().min(1),
  status: z.nativeEnum(GedkinDataProductStatus),
  schema: z.record(z.unknown()),
  lineage: z.array(z.string()),
  contracts: z.array(z.string()),
});
export const updateGedkinDataProductSchema = createGedkinDataProductSchema.partial();

export const createGedkinDataContractSchema = z.object({
  schoolId: z.string().uuid(),
  productId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  schema: z.record(z.unknown()),
  sla: z.record(z.unknown()),
  enforcement: z.string().min(1),
});
export const updateGedkinDataContractSchema = createGedkinDataContractSchema.partial();

export const createGedkinDataSourceSchema = z.object({
  schoolId: z.string().uuid(),
  domainId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.string().min(1),
  connection: z.record(z.unknown()),
  schema: z.record(z.unknown()),
  refreshInterval: z.string().min(1),
  status: z.string().min(1),
});
export const updateGedkinDataSourceSchema = createGedkinDataSourceSchema.partial();

export const createGedkinDataLineageSchema = z.object({
  schoolId: z.string().uuid(),
  sourceId: z.string().uuid(),
  targetId: z.string().uuid(),
  transformation: z.string().min(1),
  direction: z.string().min(1),
});
export const updateGedkinDataLineageSchema = createGedkinDataLineageSchema.partial();

export const createGedkinDataQualitySchema = z.object({
  schoolId: z.string().uuid(),
  domainId: z.string().uuid(),
  productId: z.string().uuid(),
  completeness: z.number().min(0).max(100),
  consistency: z.number().min(0).max(100),
  freshness: z.number().min(0).max(100),
  accuracy: z.number().min(0).max(100),
  overallScore: z.number().min(0).max(100),
  issues: z.array(z.string()),
});
export const updateGedkinDataQualitySchema = createGedkinDataQualitySchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 2 (Knowledge Graph)
// =============================================================================

export const createGedkinKnowledgeEntitySchema = z.object({
  schoolId: z.string().uuid(),
  entityType: z.nativeEnum(GedkinEntitytype),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  properties: z.record(z.unknown()),
  embeddings: z.array(z.number()),
});
export const updateGedkinKnowledgeEntitySchema = createGedkinKnowledgeEntitySchema.partial();

export const createGedkinKnowledgeRelationSchema = z.object({
  schoolId: z.string().uuid(),
  sourceEntityId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  relationType: z.nativeEnum(GedkinRelationtype),
  weight: z.number().min(0).max(1),
  properties: z.record(z.unknown()),
});
export const updateGedkinKnowledgeRelationSchema = createGedkinKnowledgeRelationSchema.partial();

export const createGedkinGraphSnapshotSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  entityCount: z.number().int().min(0),
  relationCount: z.number().int().min(0),
});
export const updateGedkinGraphSnapshotSchema = createGedkinGraphSnapshotSchema.partial();

export const createGedkinEntityResolutionSchema = z.object({
  schoolId: z.string().uuid(),
  sourceEntityId: z.string().uuid(),
  targetEntityId: z.string().uuid(),
  confidence: z.number().min(0).max(1),
  method: z.string().min(1),
});
export const updateGedkinEntityResolutionSchema = createGedkinEntityResolutionSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 3 (Semantic Intelligence)
// =============================================================================

export const createGedkinSemanticConceptSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  language: z.nativeEnum(GedkinSemanticLanguage),
  synonyms: z.array(z.string()),
  relatedConcepts: z.array(z.string()),
  ontologyId: z.string().uuid(),
});
export const updateGedkinSemanticConceptSchema = createGedkinSemanticConceptSchema.partial();

export const createGedkinOntologySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  version: z.string().min(1),
  concepts: z.array(z.string()),
  relations: z.array(z.string()),
  language: z.nativeEnum(GedkinSemanticLanguage),
});
export const updateGedkinOntologySchema = createGedkinOntologySchema.partial();

export const createGedkinTaxonomySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  rootConcepts: z.array(z.string()),
  depth: z.number().int().positive(),
  language: z.nativeEnum(GedkinSemanticLanguage),
});
export const updateGedkinTaxonomySchema = createGedkinTaxonomySchema.partial();

export const createGedkinEmbeddingSchema = z.object({
  schoolId: z.string().uuid(),
  entityType: z.string().min(1),
  entityId: z.string().uuid(),
  model: z.nativeEnum(GedkinEmbeddingModel),
  vector: z.array(z.number()),
  dimensions: z.number().int().positive(),
});
export const updateGedkinEmbeddingSchema = createGedkinEmbeddingSchema.partial();

export const createGedkinSemanticSearchSchema = z.object({
  schoolId: z.string().uuid(),
  query: z.string().min(1),
  language: z.nativeEnum(GedkinSemanticLanguage),
  results: z.array(z.string()),
  searchType: z.nativeEnum(GedkinSearchType),
});
export const updateGedkinSemanticSearchSchema = createGedkinSemanticSearchSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 4 (Research Intelligence)
// =============================================================================

export const createGedkinResearchProjectSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().max(5000),
  status: z.nativeEnum(GedkinResearchStatus),
  principalInvestigator: z.string().min(1),
  coInvestigators: z.array(z.string()),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  funding: z.number().min(0),
  keywords: z.array(z.string()),
});
export const updateGedkinResearchProjectSchema = createGedkinResearchProjectSchema.partial();

export const createGedkinPublicationSchema = z.object({
  schoolId: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1).max(500),
  authors: z.array(z.string()),
  journal: z.string().min(1).max(300),
  year: z.number().int().min(1900).max(2100),
  doi: z.string().min(1),
  citations: z.number().int().min(0),
  status: z.nativeEnum(GedkinPublicationStatus),
  abstract: z.string().max(5000),
  keywords: z.array(z.string()),
});
export const updateGedkinPublicationSchema = createGedkinPublicationSchema.partial();

export const createGedkinResearcherProfileSchema = z.object({
  schoolId: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1).max(200),
  institution: z.string().min(1).max(300),
  researchAreas: z.array(z.string()),
  publications: z.array(z.string()),
  hIndex: z.number().int().min(0),
  citations: z.number().int().min(0),
  orcidId: z.string().min(1),
});
export const updateGedkinResearcherProfileSchema = createGedkinResearcherProfileSchema.partial();

export const createGedkinCitationSchema = z.object({
  schoolId: z.string().uuid(),
  publicationId: z.string().uuid(),
  citedByPublicationId: z.string().uuid(),
  context: z.string().max(2000),
});
export const updateGedkinCitationSchema = createGedkinCitationSchema.partial();

export const createGedkinResearchTrendSchema = z.object({
  schoolId: z.string().uuid(),
  topic: z.string().min(1).max(200),
  trendScore: z.number().min(0).max(1),
  growthRate: z.number(),
  topInstitutions: z.array(z.string()),
  topCountries: z.array(z.string()),
  period: z.string().min(1),
});
export const updateGedkinResearchTrendSchema = createGedkinResearchTrendSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 5 (Global Education Observatory)
// =============================================================================

export const createGedkinObservatoryIndicatorSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  category: z.nativeEnum(GedkinIndicatorCategory),
  value: z.number(),
  unit: z.string().min(1),
  frequency: z.nativeEnum(GedkinIndicatorFrequency),
  country: z.string().min(1),
  region: z.string().min(1),
  period: z.string().min(1),
  source: z.string().min(1),
  methodology: z.string().min(1),
  confidence: z.number().min(0).max(1),
});
export const updateGedkinObservatoryIndicatorSchema = createGedkinObservatoryIndicatorSchema.partial();

export const createGedkinObservatoryDashboardSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.string().min(1),
  indicators: z.array(z.string()),
  filters: z.record(z.unknown()),
});
export const updateGedkinObservatoryDashboardSchema = createGedkinObservatoryDashboardSchema.partial();

export const createGedkinBenchmarkSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  indicators: z.array(z.string()),
  benchmarks: z.record(z.number()),
  period: z.string().min(1),
});
export const updateGedkinBenchmarkSchema = createGedkinBenchmarkSchema.partial();

export const createGedkinSDGAlignmentSchema = z.object({
  schoolId: z.string().uuid(),
  sdgNumber: z.number().int().min(1).max(17),
  sdgName: z.string().min(1).max(200),
  indicators: z.array(z.string()),
  alignmentScore: z.number().min(0).max(1),
  period: z.string().min(1),
});
export const updateGedkinSDGAlignmentSchema = createGedkinSDGAlignmentSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 6 (Policy & Decision Intelligence)
// =============================================================================

export const createGedkinPolicySchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(300),
  description: z.string().max(5000),
  status: z.nativeEnum(GedkinPolicyStatus),
  category: z.string().min(1),
  effectiveDate: z.string().datetime(),
  expiryDate: z.string().datetime(),
  content: z.string().min(1),
});
export const updateGedkinPolicySchema = createGedkinPolicySchema.partial();

export const createGedkinPolicySimulationSchema = z.object({
  schoolId: z.string().uuid(),
  policyId: z.string().uuid(),
  parameters: z.record(z.unknown()),
  results: z.record(z.unknown()),
  confidence: z.number().min(0).max(1),
});
export const updateGedkinPolicySimulationSchema = createGedkinPolicySimulationSchema.partial();

export const createGedkinDecisionRecommendationSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(300),
  description: z.string().max(5000),
  options: z.array(z.string()),
  analysisType: z.nativeEnum(GedkinAnalysisType),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()),
  risks: z.array(z.string()),
  benefits: z.array(z.string()),
});
export const updateGedkinDecisionRecommendationSchema = createGedkinDecisionRecommendationSchema.partial();

export const createGedkinImpactAnalysisSchema = z.object({
  schoolId: z.string().uuid(),
  policyId: z.string().uuid(),
  dimension: z.string().min(1),
  baselineValue: z.number(),
  projectedValue: z.number(),
  impactScore: z.number(),
  confidence: z.number().min(0).max(1),
  timeframe: z.string().min(1),
});
export const updateGedkinImpactAnalysisSchema = createGedkinImpactAnalysisSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 7 (Global Forecasting Engine)
// =============================================================================

export const createGedkinForecastSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.nativeEnum(GedkinForecastType),
  model: z.nativeEnum(GedkinForecastModel),
  status: z.nativeEnum(GedkinForecastStatus),
  parameters: z.record(z.unknown()),
  predictions: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  period: z.string().min(1),
});
export const updateGedkinForecastSchema = createGedkinForecastSchema.partial();

export const createGedkinForecastModelSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.nativeEnum(GedkinForecastModel),
  version: z.string().min(1),
  accuracy: z.number().min(0).max(1),
  trainingData: z.record(z.unknown()),
  hyperparameters: z.record(z.unknown()),
});
export const updateGedkinForecastModelSchema = createGedkinForecastModelSchema.partial();

export const createGedkinForecastPredictionSchema = z.object({
  schoolId: z.string().uuid(),
  forecastId: z.string().uuid(),
  date: z.string().datetime(),
  value: z.number(),
  lowerBound: z.number(),
  upperBound: z.number(),
  confidence: z.number().min(0).max(1),
});
export const updateGedkinForecastPredictionSchema = createGedkinForecastPredictionSchema.partial();

export const createGedkinCapacityForecastSchema = z.object({
  schoolId: z.string().uuid(),
  resourceType: z.string().min(1),
  currentCapacity: z.number().min(0),
  predictedDemand: z.number().min(0),
  gap: z.number(),
  period: z.string().min(1),
});
export const updateGedkinCapacityForecastSchema = createGedkinCapacityForecastSchema.partial();

export const createGedkinDriftDetectionSchema = z.object({
  schoolId: z.string().uuid(),
  forecastId: z.string().uuid(),
  metric: z.string().min(1),
  driftScore: z.number().min(0).max(1),
  severity: z.string().min(1),
  acknowledged: z.boolean(),
});
export const updateGedkinDriftDetectionSchema = createGedkinDriftDetectionSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 8 (AI Agent Network)
// =============================================================================

export const createGedkinAIAgentSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.nativeEnum(GedkinAgenttype),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  status: z.nativeEnum(GedkinAgentStatus),
  capabilities: z.array(z.string()),
  config: z.record(z.unknown()),
});
export const updateGedkinAIAgentSchema = createGedkinAIAgentSchema.partial();

export const createGedkinAgentTaskSchema = z.object({
  schoolId: z.string().uuid(),
  agentId: z.string().uuid(),
  type: z.string().min(1),
  input: z.record(z.unknown()),
  output: z.record(z.unknown()),
  status: z.nativeEnum(GedkinTaskStatus),
  priority: z.nativeEnum(GedkinTaskPriority),
  error: z.string().optional(),
});
export const updateGedkinAgentTaskSchema = createGedkinAgentTaskSchema.partial();

export const createGedkinAgentMessageSchema = z.object({
  schoolId: z.string().uuid(),
  taskId: z.string().uuid(),
  fromAgentId: z.string().uuid(),
  toAgentId: z.string().uuid(),
  content: z.string().min(1),
  type: z.string().min(1),
});
export const updateGedkinAgentMessageSchema = createGedkinAgentMessageSchema.partial();

export const createGedkinToolCallSchema = z.object({
  schoolId: z.string().uuid(),
  agentId: z.string().uuid(),
  taskId: z.string().uuid(),
  tool: z.string().min(1),
  parameters: z.record(z.unknown()),
  result: z.record(z.unknown()),
  status: z.string().min(1),
});
export const updateGedkinToolCallSchema = createGedkinToolCallSchema.partial();

export const createGedkinAgentMemorySchema = z.object({
  schoolId: z.string().uuid(),
  agentId: z.string().uuid(),
  key: z.string().min(1),
  value: z.string().min(1),
  ttl: z.number().int().min(0),
});
export const updateGedkinAgentMemorySchema = createGedkinAgentMemorySchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 9 (Digital Research Lab)
// =============================================================================

export const createGedkinExperimentSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000),
  status: z.nativeEnum(GedkinExperimentStatus),
  hypothesis: z.string().max(2000),
  methodology: z.string().max(5000),
  datasetIds: z.array(z.string()),
  modelIds: z.array(z.string()),
  results: z.record(z.unknown()),
});
export const updateGedkinExperimentSchema = createGedkinExperimentSchema.partial();

export const createGedkinDatasetSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  type: z.nativeEnum(GedkinDatasetType),
  schema: z.record(z.unknown()),
  size: z.number().int().min(0),
  rows: z.number().int().min(0),
  license: z.string().min(1),
  tags: z.array(z.string()),
  version: z.string().min(1),
});
export const updateGedkinDatasetSchema = createGedkinDatasetSchema.partial();

export const createGedkinModelExperimentSchema = z.object({
  schoolId: z.string().uuid(),
  experimentId: z.string().uuid(),
  name: z.string().min(1).max(200),
  modelType: z.string().min(1),
  hyperparameters: z.record(z.unknown()),
  metrics: z.record(z.number()),
  artifacts: z.array(z.string()),
  status: z.string().min(1),
});
export const updateGedkinModelExperimentSchema = createGedkinModelExperimentSchema.partial();

export const createGedkinBenchmarkSchema2 = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  datasetIds: z.array(z.string()),
  metrics: z.record(z.number()),
  baseline: z.record(z.number()),
});
export const updateGedkinBenchmarkSchema2 = createGedkinBenchmarkSchema2.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 10 (Data Products & Marketplace)
// =============================================================================

export const createGedkinMarketplaceProductSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000),
  type: z.nativeEnum(GedkinProductType),
  version: z.string().min(1),
  status: z.nativeEnum(GedkinMarketplaceStatus),
  license: z.nativeEnum(GedkinLicenseType),
  pricing: z.record(z.unknown()),
  schema: z.record(z.unknown()),
  documentation: z.string().max(10000),
  rating: z.number().min(0).max(5),
  downloads: z.number().int().min(0),
});
export const updateGedkinMarketplaceProductSchema = createGedkinMarketplaceProductSchema.partial();

export const createGedkinDataSubscriptionSchema = z.object({
  schoolId: z.string().uuid(),
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  usage: z.record(z.unknown()),
});
export const updateGedkinDataSubscriptionSchema = createGedkinDataSubscriptionSchema.partial();

export const createGedkinDataAccessLogSchema = z.object({
  schoolId: z.string().uuid(),
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  action: z.string().min(1),
  details: z.record(z.unknown()),
});
export const updateGedkinDataAccessLogSchema = createGedkinDataAccessLogSchema.partial();

export const createGedkinProductReviewSchema = z.object({
  schoolId: z.string().uuid(),
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000),
});
export const updateGedkinProductReviewSchema = createGedkinProductReviewSchema.partial();

export const createGedkinProductSLASchema = z.object({
  schoolId: z.string().uuid(),
  productId: z.string().uuid(),
  availability: z.number().min(0).max(100),
  latency: z.number().min(0),
  freshness: z.number().min(0),
  uptime: z.number().min(0).max(100),
});
export const updateGedkinProductSLASchema = createGedkinProductSLASchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 11 (Simulation & Scenario Engine)
// =============================================================================

export const createGedkinSimulationSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000),
  type: z.nativeEnum(GedkinSimulationType),
  status: z.nativeEnum(GedkinSimulationStatus),
  parameters: z.record(z.unknown()),
});
export const updateGedkinSimulationSchema = createGedkinSimulationSchema.partial();

export const createGedkinScenarioSchema = z.object({
  schoolId: z.string().uuid(),
  simulationId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.nativeEnum(GedkinScenarioType),
  description: z.string().max(5000),
  assumptions: z.record(z.unknown()),
  parameters: z.record(z.unknown()),
});
export const updateGedkinScenarioSchema = createGedkinScenarioSchema.partial();

export const createGedkinScenarioRunSchema = z.object({
  schoolId: z.string().uuid(),
  scenarioId: z.string().uuid(),
  status: z.nativeEnum(GedkinSimulationStatus),
  results: z.record(z.unknown()),
  duration: z.number().int().min(0),
});
export const updateGedkinScenarioRunSchema = createGedkinScenarioRunSchema.partial();

export const createGedkinSimulationResultSchema = z.object({
  schoolId: z.string().uuid(),
  runId: z.string().uuid(),
  dimension: z.string().min(1),
  baselineValue: z.number(),
  scenarioValue: z.number(),
  impact: z.number(),
  confidence: z.number().min(0).max(1),
});
export const updateGedkinSimulationResultSchema = createGedkinSimulationResultSchema.partial();

export const createGedkinSensitivityAnalysisSchema = z.object({
  schoolId: z.string().uuid(),
  simulationId: z.string().uuid(),
  parameter: z.string().min(1),
  range: z.record(z.number()),
  impact: z.record(z.number()),
  sensitivity: z.number(),
});
export const updateGedkinSensitivityAnalysisSchema = createGedkinSensitivityAnalysisSchema.partial();

// =============================================================================
// ZOD SCHEMAS — MODULE 12 (Intelligence Copilot)
// =============================================================================

export const createGedkinCopilotQuerySchema = z.object({
  schoolId: z.string().uuid(),
  userId: z.string().uuid(),
  query: z.string().min(1).max(5000),
  queryType: z.nativeEnum(GedkinCopilotQueryType),
  language: z.nativeEnum(GedkinSemanticLanguage),
  status: z.nativeEnum(GedkinCopilotStatus),
});
export const updateGedkinCopilotQuerySchema = createGedkinCopilotQuerySchema.partial();

export const createGedkinCopilotResponseSchema = z.object({
  schoolId: z.string().uuid(),
  queryId: z.string().uuid(),
  answer: z.string().min(1),
  responseTypes: z.array(z.nativeEnum(GedkinCopilotResponseType)),
  sources: z.array(z.string()),
  citations: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  provenance: z.record(z.unknown()),
  processingTime: z.number().int().min(0),
});
export const updateGedkinCopilotResponseSchema = createGedkinCopilotResponseSchema.partial();

export const createGedkinCopilotConversationSchema = z.object({
  schoolId: z.string().uuid(),
  userId: z.string().uuid(),
  queries: z.array(z.string()),
  title: z.string().min(1).max(200),
});
export const updateGedkinCopilotConversationSchema = createGedkinCopilotConversationSchema.partial();

export const createGedkinCopilotSourceSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.string().min(1),
  entityId: z.string().uuid(),
  entityName: z.string().min(1),
  relevance: z.number().min(0).max(1),
  excerpt: z.string().max(5000),
  url: z.string().url(),
});
export const updateGedkinCopilotSourceSchema = createGedkinCopilotSourceSchema.partial();

export const createGedkinCopilotApprovalSchema = z.object({
  schoolId: z.string().uuid(),
  queryId: z.string().uuid(),
  responseId: z.string().uuid(),
  approvedBy: z.string().uuid(),
  status: z.string().min(1),
  reason: z.string().max(2000),
});
export const updateGedkinCopilotApprovalSchema = createGedkinCopilotApprovalSchema.partial();
