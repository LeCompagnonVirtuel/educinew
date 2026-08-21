export enum KnowledgeType {
  POLICY = 'policy',
  REGULATION = 'regulation',
  PROCEDURE = 'procedure',
  FAQ = 'faq',
  JURISPRUDENCE = 'jurisprudence',
  DOCUMENT = 'document',
  GUIDE = 'guide',
  BEST_PRACTICE = 'best_practice',
  CASE_STUDY = 'case_study',
  TEMPLATE = 'template'
}

export enum NLQueryIntent {
  QUERY = 'query',
  EXPLAIN = 'explain',
  COMPARE = 'compare',
  PREDICT = 'predict',
  RECOMMEND = 'recommend',
  SUMMARIZE = 'summarize',
  ANALYZE = 'analyze',
  LIST = 'list'
}

export enum ReportType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
  MINISTERIAL = 'ministerial',
  INSPECTION = 'inspection',
  BOARD = 'board',
  CUSTOM = 'custom'
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  POWERPOINT = 'powerpoint',
  WORD = 'word',
  HTML = 'html',
  CSV = 'csv'
}

export enum ReportStatus {
  GENERATING = 'generating',
  GENERATED = 'generated',
  DELIVERED = 'delivered',
  FAILED = 'failed'
}

export enum BenchmarkType {
  SCHOOL = 'school',
  REGION = 'region',
  COUNTRY = 'country',
  SCHOOL_GROUP = 'school_group',
  PROGRAM = 'program',
  DISTRICT = 'district'
}

export enum BenchmarkMetric {
  PASS_RATE = 'pass_rate',
  AVERAGE_GRADE = 'average_grade',
  GRADUATION_RATE = 'graduation_rate',
  ATTENDANCE_RATE = 'attendance_rate',
  TEACHER_STUDENT_RATIO = 'teacher_student_ratio',
  BUDGET_PER_STUDENT = 'budget_per_student',
  INFRASTRUCTURE_SCORE = 'infrastructure_score',
  DIGITAL_ADOPTION = 'digital_adoption',
  PARENT_SATISFACTION = 'parent_satisfaction',
  STUDENT_WELLBEING = 'student_wellbeing'
}

export enum ScenarioType {
  RECRUITMENT = 'recruitment',
  BUDGET = 'budget',
  ENROLLMENT = 'enrollment',
  INFRASTRUCTURE = 'infrastructure',
  PROGRAM = 'program',
  POLICY = 'policy',
  MERGER = 'merger',
  EXPANSION = 'expansion'
}

export enum ScenarioStatus {
  DRAFT = 'draft',
  SIMULATED = 'simulated',
  ANALYZED = 'analyzed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IMPLEMENTED = 'implemented'
}

export enum RAGSource {
  KNOWLEDGE_BASE = 'knowledge_base',
  INTERNAL_DOCS = 'internal_docs',
  REGULATIONS = 'regulations',
  EXTERNAL = 'external'
}

export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export interface KnowledgeArticle {
  id: string;
  school_id: string;
  type: KnowledgeType;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  author: string;
  status: string;
  version: number;
  language: string;
  source: RAGSource;
  citations: string[];
  effective_date: string;
  expiry_date: string;
  access_level: string;
  view_count: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeBase {
  id: string;
  school_id: string;
  name: string;
  description: string;
  article_count: number;
  categories: string[];
  last_updated: string;
  status: string;
}

export interface KnowledgePolicy {
  id: string;
  school_id: string;
  title: string;
  content: string;
  version: number;
  effective_date: string;
  expiry_date: string;
  department: string;
  compliance_required: boolean;
  acknowledged_by: string[];
  acknowledgement_count: number;
  created_at: string;
}

export interface KnowledgeRegulation {
  id: string;
  country: string;
  title: string;
  content: string;
  category: string;
  effective_date: string;
  reference_number: string;
  authority: string;
  compliance_deadline: string;
  penalties: Record<string, unknown>;
  created_at: string;
}

export interface KnowledgeProcedure {
  id: string;
  school_id: string;
  title: string;
  content: string;
  steps: string[];
  department: string;
  frequency: string;
  responsible: string;
  prerequisites: string[];
  estimated_time: number;
  difficulty: string;
  created_at: string;
}

export interface KnowledgeFAQ {
  id: string;
  school_id: string;
  question: string;
  answer: string;
  category: string;
  helpful_count: number;
  not_helpful_count: number;
  views: number;
  created_at: string;
}

export interface KnowledgeJurisprudence {
  id: string;
  country: string;
  title: string;
  summary: string;
  court: string;
  date: string;
  reference_number: string;
  category: string;
  relevance: number;
  precedent_value: string;
  created_at: string;
}

export interface KnowledgeDocument {
  id: string;
  school_id: string;
  title: string;
  content: string;
  type: string;
  category: string;
  author: string;
  version: number;
  tags: string[];
  file_path: string;
  file_size: number;
  mime_type: string;
  access_level: string;
  created_at: string;
}

export interface KnowledgeGuide {
  id: string;
  school_id: string;
  title: string;
  content: string;
  category: string;
  target_audience: string;
  difficulty: string;
  estimated_time: number;
  steps: string[];
  prerequisites: string[];
  created_at: string;
}

export interface RAGQuery {
  id: string;
  school_id: string;
  query: string;
  intent: NLQueryIntent;
  sources: RAGSource[];
  max_results: number;
  filters: Record<string, unknown>;
  created_at: string;
}

export interface RAGResult {
  id: string;
  query_id: string;
  sources: RAGSource[];
  answer: string;
  confidence: number;
  citations: string[];
  reasoning: string;
  generated_at: string;
}

export interface NLQueryRecord {
  id: string;
  school_id: string;
  query: string;
  intent: NLQueryIntent;
  translated_query: NLQueryTranslation;
  parameters: Record<string, unknown>;
  result_count: number;
  execution_time: number;
  success: boolean;
  error_message: string;
  generated_at: string;
}

export interface NLQueryTranslation {
  id: string;
  query_id: string;
  sql_query: string;
  parameters: Record<string, unknown>;
  explanation: string;
  confidence: number;
  alternatives: string[];
}

export interface NLQueryResult {
  id: string;
  query_id: string;
  data: Record<string, unknown>[];
  columns: string[];
  row_count: number;
  summary: string;
  visualization: NLVisualizationSuggestion;
  generated_at: string;
}

export interface NLVisualizationSuggestion {
  id: string;
  query_id: string;
  chart_type: string;
  title: string;
  x_axis: string;
  y_axis: string;
  series: string[];
  configuration: Record<string, unknown>;
}

export interface NLContext {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  recent_queries: string[];
  relevant_data: Record<string, unknown>;
  user_preferences: Record<string, unknown>;
}

export interface NLFeedback {
  id: string;
  query_id: string;
  rating: number;
  comment: string;
  helpful: boolean;
  created_at: string;
}

export interface AIReport {
  id: string;
  school_id: string;
  type: ReportType;
  format: ReportFormat;
  title: string;
  content: string;
  date_range: Record<string, string>;
  sections: ReportSection[];
  status: ReportStatus;
  file_path: string;
  file_size: number;
  generated_at: string;
  delivered_at: string;
}

export interface ReportSection {
  id: string;
  report_id: string;
  title: string;
  content: string;
  type: string;
  order: number;
  data: Record<string, unknown>;
  charts: Record<string, unknown>[];
  tables: Record<string, unknown>[];
}

export interface ReportSchedule {
  id: string;
  school_id: string;
  type: ReportType;
  format: ReportFormat;
  frequency: string;
  recipients: ReportRecipient[];
  parameters: Record<string, unknown>;
  enabled: boolean;
  last_generated: string;
  next_generation: string;
  created_at: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  type: ReportType;
  format: ReportFormat;
  sections: Record<string, unknown>[];
  parameters: Record<string, unknown>;
  layout: Record<string, unknown>;
  branding: Record<string, unknown>;
  created_at: string;
}

export interface ReportRecipient {
  id: string;
  report_id: string;
  email: string;
  name: string;
  role: string;
  sent_at: string;
  read_at: string;
}

export interface ReportExport {
  id: string;
  report_id: string;
  format: ReportFormat;
  file_path: string;
  file_size: number;
  generated_at: string;
}

export interface Benchmark {
  id: string;
  school_id: string;
  type: BenchmarkType;
  name: string;
  description: string;
  period: string;
  metrics: Record<string, number>;
  calculated_at: string;
}

export interface BenchmarkComparison {
  id: string;
  benchmark_id: string;
  entity_a: string;
  entity_b: string;
  metrics: Record<string, number>;
  differences: Record<string, number>;
  analysis: string;
  generated_at: string;
}

export interface BenchmarkRanking {
  id: string;
  school_id: string;
  type: BenchmarkType;
  period: string;
  rankings: BenchmarkRankingEntry[];
  total_entities: number;
  percentile: number;
  rank: number;
  calculated_at: string;
}

export interface BenchmarkRankingEntry {
  id: string;
  ranking_id: string;
  entity_id: string;
  entity_name: string;
  entity_type: string;
  score: number;
  rank: number;
  percentile: number;
  trend: string;
}

export interface BenchmarkPercentile {
  id: string;
  school_id: string;
  metric: BenchmarkMetric;
  value: number;
  percentile: number;
  benchmark: string;
  period: string;
  calculated_at: string;
}

export interface BenchmarkTrend {
  id: string;
  school_id: string;
  metric: BenchmarkMetric;
  direction: string;
  magnitude: number;
  period: string;
  data_points: Record<string, number>[];
  calculated_at: string;
}

export interface BenchmarkEvolution {
  id: string;
  school_id: string;
  metric: BenchmarkMetric;
  periods: string[];
  values: number[];
  trend: string;
  change_rate: number;
  calculated_at: string;
}

export interface BenchmarkGap {
  id: string;
  school_id: string;
  metric: BenchmarkMetric;
  target_value: number;
  current_value: number;
  gap: number;
  priority: string;
  improvement_plan: string;
  calculated_at: string;
}

export interface Scenario {
  id: string;
  school_id: string;
  name: string;
  description: string;
  type: ScenarioType;
  status: ScenarioStatus;
  variables: ScenarioVariable[];
  assumptions: ScenarioAssumption[];
  created_by: string;
  created_at: string;
  simulated_at: string;
}

export interface ScenarioVariable {
  id: string;
  scenario_id: string;
  name: string;
  type: string;
  current_value: number;
  new_value: number;
  unit: string;
  range: Record<string, number>;
}

export interface ScenarioAssumption {
  id: string;
  scenario_id: string;
  description: string;
  type: string;
  value: number;
  confidence: number;
}

export interface ScenarioSimulation {
  id: string;
  scenario_id: string;
  results: ScenarioResult[];
  execution_time: number;
  model_version: string;
  generated_at: string;
}

export interface ScenarioResult {
  id: string;
  simulation_id: string;
  metric: string;
  baseline_value: number;
  projected_value: number;
  change: number;
  change_percent: number;
  confidence: number;
}

export interface ScenarioCost {
  id: string;
  scenario_id: string;
  type: string;
  amount: number;
  currency: string;
  breakdown: Record<string, number>;
  roi: number;
  payback_period: string;
}

export interface ScenarioImpact {
  id: string;
  scenario_id: string;
  dimension: string;
  magnitude: number;
  probability: number;
  timeframe: string;
  affected_entities: string[];
  description: string;
}

export interface ScenarioProjection {
  id: string;
  scenario_id: string;
  period: string;
  values: Record<string, number>;
  trend: string;
  lower_bound: number;
  upper_bound: number;
  confidence: number;
}

export interface ScenarioROI {
  id: string;
  scenario_id: string;
  investment: number;
  returns: number;
  roi: number;
  payback_period: string;
  net_present_value: number;
  internal_rate_of_return: number;
}

export interface AIChatSession {
  id: string;
  school_id: string;
  user_id: string;
  title: string;
  messages: AIChatMessage[];
  status: string;
  context: AIChatContext;
  created_at: string;
  last_message_at: string;
}

export interface AIChatMessage {
  id: string;
  session_id: string;
  role: ChatRole;
  content: string;
  sources: RAGSource[];
  confidence: number;
  generated_at: string;
}

export interface AIChatContext {
  id: string;
  session_id: string;
  entity_type: string;
  entity_id: string;
  relevant_data: Record<string, unknown>;
  conversation_history: string[];
  user_preferences: Record<string, unknown>;
}

export interface AIChatFeedback {
  id: string;
  message_id: string;
  rating: number;
  comment: string;
  created_at: string;
}
