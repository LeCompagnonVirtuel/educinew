// ==================== ENUMS ====================

export enum GraphType {
  STUDENT = 'student',
  TEACHER = 'teacher',
  SCHOOL = 'school',
  CURRICULUM = 'curriculum',
  SKILLS = 'skills',
  COMPETENCY = 'competency',
  EMPLOYMENT = 'employment',
  ALUMNI = 'alumni',
  RESEARCH = 'research',
  LEARNING = 'learning',
  AI = 'ai',
  CONCEPT = 'concept',
  TOPIC = 'topic',
  RESOURCE = 'resource'
}

export enum NodeType {
  ENTITY = 'entity',
  CONCEPT = 'concept',
  SKILL = 'skill',
  COMPETENCY = 'competency',
  RESOURCE = 'resource',
  ASSESSMENT = 'assessment',
  COURSE = 'course',
  MODULE = 'module',
  TOPIC = 'topic',
  SUBTOPIC = 'subtopic',
  STANDARD = 'standard',
  OUTCOME = 'outcome'
}

export enum EdgeType {
  PREREQUISITE = 'prerequisite',
  TEACHES = 'teaches',
  LEARNS = 'learns',
  ASSESSES = 'assesses',
  CONTAINS = 'contains',
  RELATES_TO = 'relates_to',
  DEPENDS_ON = 'depends_on',
  FEEDS_INTO = 'feeds_into',
  EQUIVALENT = 'equivalent',
  SIMILAR = 'similar',
  CONTRADICTS = 'contradicts',
  SUPPORTS = 'supports'
}

export enum RelationshipStrength {
  VERY_WEAK = 0.1,
  WEAK = 0.3,
  MODERATE = 0.5,
  STRONG = 0.7,
  VERY_STRONG = 0.9
}

export enum SearchType {
  KEYWORD = 'keyword',
  SEMANTIC = 'semantic',
  GRAPH = 'graph',
  HYBRID = 'hybrid',
  FUZZY = 'fuzzy',
  EXACT = 'exact',
  PHONETIC = 'phonetic'
}

export enum RecommendationType {
  COURSE = 'course',
  SKILL = 'skill',
  RESOURCE = 'resource',
  PATH = 'path',
  MENTOR = 'mentor',
  PEER = 'peer',
  OPPORTUNITY = 'opportunity'
}

export enum RecommendationReason {
  PREREQUISITE = 'prerequisite',
  GAP = 'gap',
  INTEREST = 'interest',
  PERFORMANCE = 'performance',
  CAREER = 'career',
  TREND = 'trend',
  POPULARITY = 'popularity'
}

export enum CompetencyLevel {
  NOVICE = 'novice',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
  MASTER = 'master'
}

export enum SkillCategory {
  TECHNICAL = 'technical',
  SOFT = 'soft',
  DOMAIN = 'domain',
  METHODOLOGICAL = 'methodological',
  DIGITAL = 'digital',
  LANGUAGE = 'language',
  LEADERSHIP = 'leadership',
  CREATIVE = 'creative'
}

export enum CompetencyStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ACHIEVED = 'achieved',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

export enum GraphTraversal {
  BFS = 'bfs',
  DFS = 'dfs',
  SHORTEST_PATH = 'shortest_path',
  ALL_PATHS = 'all_paths',
  SUBGRAPH = 'subgraph',
  COMMUNITY = 'community'
}

export enum CommunityDetection {
  LOUVAIN = 'louvain',
  LABEL_PROPAGATION = 'label_propagation',
  GIRVAN_NEWMAN = 'girvan_newman',
  SPECTRAL = 'spectral',
  CLIQUE = 'clique'
}

export enum CentralityMeasure {
  DEGREE = 'degree',
  BETWEENNESS = 'betweenness',
  CLOSENESS = 'closeness',
  EIGENVECTOR = 'eigenvector',
  PAGERANK = 'pagerank',
  KATZ = 'katz'
}

export enum PathType {
  SHORTEST = 'shortest',
  LONGEST = 'longest',
  MOST_RELEVANT = 'most_relevant',
  LEAST_COST = 'least_cost',
  ALL = 'all'
}

export enum GraphLayout {
  FORCE_DIRECTED = 'force_directed',
  HIERARCHICAL = 'hierarchical',
  CIRCULAR = 'circular',
  GRID = 'grid',
  TREE = 'tree',
  RADIAL = 'radial'
}

export enum VisualType {
  NODE_LINK = 'node_link',
  ADJACENCY_MATRIX = 'adjacency_matrix',
  ARC_DIAGRAM = 'arc_diagram',
  CHORD = 'chord',
  SANKEY = 'sankey',
  TREE_MAP = 'tree_map'
}

export enum QueryType {
  MATCH = 'match',
  AGGREGATE = 'aggregate',
  PATH = 'path',
  SUBGRAPH = 'subgraph',
  PATTERN = 'pattern',
  ANOMALY = 'anomaly'
}

export enum SemanticRelation {
  HYPERNYM = 'hypernym',
  HYPONYM = 'hyponym',
  SYNONYM = 'synonym',
  ANTONYM = 'antonym',
  MERONYM = 'meronym',
  HOLONYM = 'holonym',
  TROPONYM = 'troponym'
}

export enum LearningPathType {
  LINEAR = 'linear',
  BRANCHING = 'branching',
  ADAPTIVE = 'adaptive',
  MODULAR = 'modular',
  COMPETENCY_BASED = 'competency_based'
}

export enum EmploymentRelation {
  EMPLOYS = 'employs',
  INTERNS = 'interns',
  CONTRACTS = 'contracts',
  PARTNERS = 'partners',
  COLLABORATES = 'collaborates'
}

export enum ResearchRelation {
  COLLABORATES = 'collaborates',
  CITES = 'cites',
  SUPERVISES = 'supervises',
  CO_AUTHORS = 'co_authors',
  FUNDS = 'funds'
}

export enum AlumniRelation {
  GRADUATED_FROM = 'graduated_from',
  STUDIED = 'studied',
  MENTORED = 'mentored',
  DONATED = 'donated',
  TEACHES_AT = 'teaches_at'
}

export enum CurriculumRelation {
  INCLUDES = 'includes',
  FOLLOWS = 'follows',
  ALIGNS_WITH = 'aligns_with',
  ASSESSES = 'assesses',
  SUPPLEMENTS = 'supplements'
}

export enum KnowledgeLevel {
  EXPLICIT = 'explicit',
  TACIT = 'tacit',
  EMBEDDED = 'embedded',
  EMERGENT = 'emergent'
}

export enum GraphUpdateType {
  ADD_NODE = 'add_node',
  REMOVE_NODE = 'remove_node',
  ADD_EDGE = 'add_edge',
  REMOVE_EDGE = 'remove_edge',
  UPDATE_NODE = 'update_node',
  UPDATE_EDGE = 'update_edge',
  MERGE = 'merge',
  SPLIT = 'split'
}

export enum IndexType {
  FULL_TEXT = 'full_text',
  VECTOR = 'vector',
  GRAPH = 'graph',
  TEMPORAL = 'temporal',
  GEOSPATIAL = 'geospatial',
  HASH = 'hash'
}

export enum QueryLanguage {
  CYPHER = 'cypher',
  GREMLIN = 'gremlin',
  SPARQL = 'sparql',
  GRAPHQL = 'graphql',
  SQL = 'sql',
  NATURAL_LANGUAGE = 'natural_language'
}

export enum AIOperation {
  EMBEDDING = 'embedding',
  CLASSIFICATION = 'classification',
  CLUSTERING = 'clustering',
  SUMMARIZATION = 'summarization',
  GENERATION = 'generation',
  TRANSLATION = 'translation'
}

export enum ConfidenceLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum DataQuality {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
  INCONSISTENT = 'inconsistent',
  OUTDATED = 'outdated',
  VERIFIED = 'verified'
}

export enum GraphHealth {
  OPTIMAL = 'optimal',
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  CRITICAL = 'critical',
  OFFLINE = 'offline'
}

export enum SyncStatus {
  SYNCED = 'synced',
  SYNCING = 'syncing',
  STALE = 'stale',
  ERROR = 'error',
  PARTIAL = 'partial'
}

export enum ExportFormat {
  JSON = 'json',
  RDF = 'rdf',
  GRAPHML = 'graphml',
  CSV = 'csv',
  GEXF = 'gexf',
  DOT = 'dot',
  NEO4J = 'neo4j'
}

export enum ImportFormat {
  CSV = 'csv',
  JSON = 'json',
  EXCEL = 'excel',
  RDF = 'rdf',
  XML = 'xml',
  API = 'api',
  WEBHOOK = 'webhook'
}

export enum AlertType {
  ANOMALY = 'anomaly',
  THRESHOLD = 'threshold',
  PATTERN = 'pattern',
  TREND = 'trend',
  BREAK = 'break',
  CORRELATION = 'correlation'
}

export enum VisualizationMode {
  STATIC = 'static',
  ANIMATED = 'animated',
  INTERACTIVE = 'interactive',
  REAL_TIME = 'real_time',
  AR = 'ar',
  VR = 'vr'
}

export enum GraphScope {
  GLOBAL = 'global',
  SCHOOL = 'school',
  REGIONAL = 'regional',
  NATIONAL = 'national',
  INTERNATIONAL = 'international'
}

export enum TemporalMode {
  SNAPSHOT = 'snapshot',
  TIME_SERIES = 'time_series',
  ANIMATION = 'animation',
  COMPARISON = 'comparison'
}

export enum PrivacyLevel {
  PUBLIC = 'public',
  INTERNAL = 'internal',
  CONFIDENTIAL = 'confidential',
  RESTRICTED = 'restricted',
  ANONYMIZED = 'anonymized'
}

export enum GraphVisualizationType {
  EDUCATION_NETWORK = 'education_network',
  SKILL_TREE = 'skill_tree',
  COMPETENCY_MAP = 'competency_map',
  LEARNING_PATH = 'learning_path',
  CURRICULUM_FLOW = 'curriculum_flow',
  ALUMNI_NETWORK = 'alumni_network',
  RESEARCH_COLLABORATION = 'research_collaboration',
  EMPLOYMENT_OUTCOME = 'employment_outcome'
}

// ==================== CORE INTERFACES ====================

export interface GraphNode {
  id: string;
  school_id: string;
  type: NodeType;
  label: string;
  description: string;
  properties: Record<string, unknown>;
  embedding?: number[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GraphEdge {
  id: string;
  school_id: string;
  source_id: string;
  target_id: string;
  type: EdgeType;
  weight: number;
  properties: Record<string, unknown>;
  bidirectional: boolean;
  created_at: string;
  updated_at: string;
}

export interface GraphPath {
  id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_weight: number;
  path_type: PathType;
  depth: number;
}

export interface GraphCommunity {
  id: string;
  school_id: string;
  name: string;
  node_ids: string[];
  edge_ids: string[];
  density: number;
  modularity: number;
  algorithm: CommunityDetection;
  created_at: string;
}

export interface GraphQuery {
  id: string;
  school_id: string;
  query: string;
  language: QueryLanguage;
  type: QueryType;
  parameters: Record<string, unknown>;
  result_count: number;
  execution_time_ms: number;
  created_at: string;
}

export interface GraphSearch {
  id: string;
  school_id: string;
  query: string;
  type: SearchType;
  filters: Record<string, unknown>;
  results: GraphSearchResult[];
  total_results: number;
  execution_time_ms: number;
  created_at: string;
}

export interface GraphSearchResult {
  node_id: string;
  score: number;
  highlights: string[];
  context: string;
}

export interface GraphTraversalResult {
  path: GraphPath;
  visited_nodes: string[];
  distance: number;
  algorithm: GraphTraversal;
}

export interface GraphAnalytics {
  id: string;
  school_id: string;
  node_count: number;
  edge_count: number;
  density: number;
  avg_degree: number;
  avg_path_length: number;
  clustering_coefficient: number;
  communities: GraphCommunity[];
  centrality: GraphCentrality[];
  created_at: string;
}

export interface GraphCentrality {
  node_id: string;
  measure: CentralityMeasure;
  score: number;
}

export interface GraphRecommendation {
  id: string;
  school_id: string;
  entity_id: string;
  entity_type: string;
  type: RecommendationType;
  reason: RecommendationReason;
  score: number;
  confidence: ConfidenceLevel;
  path: GraphPath;
  explanation: string;
  expires_at: string;
  created_at: string;
}

export interface GraphInsight {
  id: string;
  school_id: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  confidence: ConfidenceLevel;
  impact: string;
  actionable: boolean;
  created_at: string;
}

export interface GraphPattern {
  id: string;
  school_id: string;
  name: string;
  description: string;
  nodes: string[];
  edges: string[];
  frequency: number;
  confidence: number;
  first_seen: string;
  last_seen: string;
}

export interface GraphEmbedding {
  id: string;
  node_id: string;
  model: string;
  dimensions: number;
  vector: number[];
  created_at: string;
}

export interface GraphVector {
  id: string;
  entity_id: string;
  entity_type: string;
  vector: number[];
  model: string;
  dimensions: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface GraphIndex {
  id: string;
  school_id: string;
  name: string;
  type: IndexType;
  fields: string[];
  status: string;
  size_bytes: number;
  last_rebuilt: string;
  created_at: string;
}

export interface GraphSchema {
  id: string;
  school_id: string;
  name: string;
  version: string;
  node_types: NodeType[];
  edge_types: EdgeType[];
  constraints: GraphConstraint[];
  created_at: string;
  updated_at: string;
}

export interface GraphConstraint {
  name: string;
  type: string;
  definition: Record<string, unknown>;
  enforced: boolean;
}

export interface GraphUpdate {
  id: string;
  school_id: string;
  type: GraphUpdateType;
  entity_id: string;
  entity_type: string;
  changes: Record<string, unknown>;
  applied: boolean;
  applied_at: string;
  created_at: string;
}

export interface GraphSync {
  id: string;
  school_id: string;
  source: string;
  status: SyncStatus;
  last_synced: string;
  records_synced: number;
  errors: string[];
  next_sync: string;
  created_at: string;
}

export interface GraphExport {
  id: string;
  school_id: string;
  format: ExportFormat;
  scope: GraphScope;
  file_url: string;
  file_size: number;
  node_count: number;
  edge_count: number;
  status: string;
  created_at: string;
}

export interface GraphImport {
  id: string;
  school_id: string;
  format: ImportFormat;
  source_url: string;
  status: string;
  records_imported: number;
  records_failed: number;
  errors: string[];
  created_at: string;
}

export interface GraphVisualization {
  id: string;
  school_id: string;
  name: string;
  type: VisualType;
  layout: GraphLayout;
  mode: VisualizationMode;
  config: GraphVisualizationConfig;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GraphVisualizationConfig {
  width: number;
  height: number;
  zoom: boolean;
  pan: boolean;
  animations: boolean;
  labels: boolean;
  tooltips: boolean;
  legend: boolean;
  theme: string;
}

export interface GraphDashboard {
  id: string;
  school_id: string;
  name: string;
  widgets: GraphDashboardWidget[];
  layout: Record<string, unknown>[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface GraphDashboardWidget {
  id: string;
  type: string;
  title: string;
  config: Record<string, unknown>;
  data_source: string;
  position: { x: number; y: number; w: number; h: number };
}

export interface GraphReport {
  id: string;
  school_id: string;
  title: string;
  type: string;
  content: Record<string, unknown>;
  generated_at: string;
  expires_at: string;
  created_at: string;
}

// ==================== AI INTERFACES ====================

export interface GraphAI {
  id: string;
  school_id: string;
  operation: AIOperation;
  model: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  confidence: ConfidenceLevel;
  execution_time_ms: number;
  created_at: string;
}

export interface GraphAIModel {
  id: string;
  name: string;
  version: string;
  type: AIOperation;
  dimensions: number;
  max_tokens: number;
  supports_batch: boolean;
  accuracy: number;
  created_at: string;
}

export interface GraphAIPrediction {
  id: string;
  school_id: string;
  entity_id: string;
  entity_type: string;
  prediction: string;
  confidence: ConfidenceLevel;
  features: Record<string, unknown>;
  model: string;
  created_at: string;
}

export interface GraphAIInsight {
  id: string;
  school_id: string;
  type: string;
  title: string;
  description: string;
  evidence: string[];
  confidence: ConfidenceLevel;
  impact_score: number;
  recommendations: string[];
  created_at: string;
}

// ==================== HEALTH & MONITORING ====================

export interface GraphHealthStatus {
  id: string;
  school_id: string;
  status: GraphHealth;
  metrics: GraphMetric[];
  alerts: GraphAlert[];
  last_check: string;
  uptime_percent: number;
  created_at: string;
}

export interface GraphMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold_min: number;
  threshold_max: number;
  status: string;
  measured_at: string;
}

export interface GraphAlert {
  id: string;
  school_id: string;
  type: AlertType;
  severity: string;
  title: string;
  message: string;
  source: string;
  acknowledged: boolean;
  acknowledged_at: string;
  created_at: string;
}

export interface GraphAudit {
  id: string;
  school_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  changes: Record<string, unknown>;
  ip_address: string;
  created_at: string;
}

export interface GraphTemplate {
  id: string;
  name: string;
  description: string;
  graph_type: GraphType;
  schema: GraphSchema;
  sample_nodes: GraphNode[];
  sample_edges: GraphEdge[];
  tags: string[];
  created_at: string;
}

export interface GraphPreset {
  id: string;
  name: string;
  description: string;
  config: Record<string, unknown>;
  layout: GraphLayout;
  visual_type: VisualType;
  created_at: string;
}

export interface GraphHistory {
  id: string;
  school_id: string;
  version: number;
  snapshot: Record<string, unknown>;
  changes_summary: string;
  created_at: string;
  created_by: string;
}

// ==================== SEMANTIC INTERFACES ====================

export interface SemanticSearch {
  id: string;
  school_id: string;
  query: string;
  query_embedding: number[];
  results: SemanticResult[];
  total_results: number;
  execution_time_ms: number;
  created_at: string;
}

export interface SemanticQuery {
  id: string;
  school_id: string;
  query: string;
  language: QueryLanguage;
  embedding: number[];
  filters: Record<string, unknown>;
  created_at: string;
}

export interface SemanticResult {
  node_id: string;
  score: number;
  similarity: number;
  context: string;
  explanation: string;
}

export interface RecommendationGraph {
  id: string;
  school_id: string;
  entity_id: string;
  entity_type: string;
  recommendations: GraphRecommendation[];
  total_score: number;
  generated_at: string;
}

export interface RecommendationPath {
  id: string;
  source_id: string;
  target_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_weight: number;
  confidence: ConfidenceLevel;
}

export interface RecommendationScore {
  id: string;
  entity_id: string;
  entity_type: string;
  recommendation_type: RecommendationType;
  score: number;
  factors: Record<string, number>;
  created_at: string;
}

export interface RelationshipDiscovery {
  id: string;
  school_id: string;
  entity_id: string;
  entity_type: string;
  discovered: RelationshipPattern[];
  algorithm: string;
  confidence: ConfidenceLevel;
  created_at: string;
}

export interface RelationshipPattern {
  pattern_id: string;
  name: string;
  description: string;
  nodes: string[];
  edges: string[];
  frequency: number;
  strength: RelationshipStrength;
}

export interface RelationshipStrengthScore {
  id: string;
  source_id: string;
  target_id: string;
  edge_type: EdgeType;
  strength: RelationshipStrength;
  score: number;
  evidence: string[];
  created_at: string;
}

// ==================== KNOWLEDGE INTERFACES ====================

export interface KnowledgeNode {
  id: string;
  school_id: string;
  type: string;
  label: string;
  content: string;
  level: KnowledgeLevel;
  domain: string;
  tags: string[];
  embedding: number[];
  references: string[];
  created_at: string;
  updated_at: string;
}

export interface KnowledgeEdge {
  id: string;
  source_id: string;
  target_id: string;
  type: SemanticRelation;
  weight: number;
  context: string;
  bidirectional: boolean;
  created_at: string;
}

export interface KnowledgePath {
  id: string;
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  total_weight: number;
  coherence_score: number;
}

export interface KnowledgeCluster {
  id: string;
  school_id: string;
  name: string;
  description: string;
  node_ids: string[];
  coherence: number;
  centrality: number;
  created_at: string;
}

// ==================== SKILL INTERFACES ====================

export interface SkillGap {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  current_level: CompetencyLevel;
  target_level: CompetencyLevel;
  gap: number;
  priority: string;
  recommended_resources: string[];
  estimated_time_hours: number;
  created_at: string;
}

export interface SkillMatch {
  id: string;
  entity_id: string;
  entity_type: string;
  skill_id: string;
  match_score: number;
  required_level: CompetencyLevel;
  current_level: CompetencyLevel;
  evidence: string[];
  created_at: string;
}

export interface SkillTrend {
  id: string;
  skill_id: string;
  school_id: string;
  period: string;
  demand_score: number;
  supply_score: number;
  growth_rate: number;
  related_skills: string[];
  created_at: string;
}

export interface SkillForecast {
  id: string;
  skill_id: string;
  forecast_period: string;
  predicted_demand: number;
  confidence: ConfidenceLevel;
  factors: Record<string, unknown>;
  recommendations: string[];
  created_at: string;
}

// ==================== COMPETENCY INTERFACES ====================

export interface CompetencyMap {
  id: string;
  school_id: string;
  name: string;
  description: string;
  competencies: CompetencyEntry[];
  total_competencies: number;
  average_level: CompetencyLevel;
  created_at: string;
  updated_at: string;
}

export interface CompetencyEntry {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  level: CompetencyLevel;
  required: boolean;
}

export interface CompetencyPath {
  id: string;
  school_id: string;
  name: string;
  description: string;
  steps: CompetencyStep[];
  total_steps: number;
  estimated_hours: number;
  difficulty: string;
  created_at: string;
}

export interface CompetencyStep {
  order: number;
  competency_id: string;
  competency_name: string;
  target_level: CompetencyLevel;
  prerequisites: string[];
  resources: string[];
}

export interface CompetencyProgress {
  id: string;
  school_id: string;
  student_id: string;
  competency_id: string;
  status: CompetencyStatus;
  current_level: CompetencyLevel;
  target_level: CompetencyLevel;
  progress_percent: number;
  started_at: string;
  achieved_at: string;
  expires_at: string;
  evidence: string[];
  created_at: string;
  updated_at: string;
}

// ==================== LEARNING INTERFACES ====================

export interface LearningPath {
  id: string;
  school_id: string;
  name: string;
  description: string;
  type: LearningPathType;
  modules: LearningModule[];
  total_modules: number;
  estimated_hours: number;
  difficulty: string;
  tags: string[];
  enrollment_count: number;
  completion_rate: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface LearningModule {
  id: string;
  path_id: string;
  name: string;
  description: string;
  order: number;
  duration_hours: number;
  prerequisites: string[];
  outcomes: LearningOutcome[];
  resources: string[];
  assessment_id: string;
  completed_by_count: number;
}

export interface LearningOutcome {
  id: string;
  module_id: string;
  description: string;
  competency_id: string;
  target_level: CompetencyLevel;
  assessment_method: string;
}

// ==================== ALUMNI INTERFACES ====================

export interface AlumniNetwork {
  id: string;
  school_id: string;
  name: string;
  description: string;
  member_count: number;
  total_donations: number;
  events_hosted: number;
  mentors_active: number;
  created_at: string;
  updated_at: string;
}

export interface AlumniEvent {
  id: string;
  school_id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  attendee_count: number;
  organizer_id: string;
  sponsors: string[];
  created_at: string;
}

export interface AlumniContribution {
  id: string;
  school_id: string;
  alumni_id: string;
  type: string;
  amount: number;
  currency: string;
  purpose: string;
  campaign_id: string;
  anonymous: boolean;
  created_at: string;
}

// ==================== RESEARCH INTERFACES ====================

export interface ResearchCollaboration {
  id: string;
  school_id: string;
  title: string;
  description: string;
  researchers: string[];
  institutions: string[];
  start_date: string;
  end_date: string;
  status: string;
  funding: number;
  publications: string[];
  created_at: string;
}

export interface ResearchImpact {
  id: string;
  paper_id: string;
  citations: number;
  h_index: number;
  i10_index: number;
  altmetric_score: number;
  downloads: number;
  views: number;
  created_at: string;
}

export interface ResearchTrend {
  id: string;
  topic: string;
  domain: string;
  growth_rate: number;
  publication_count: number;
  top_keywords: string[];
  top_researchers: string[];
  period: string;
  created_at: string;
}

// ==================== EMPLOYMENT INTERFACES ====================

export interface EmploymentPath {
  id: string;
  school_id: string;
  alumni_id: string;
  positions: EmploymentPosition[];
  total_positions: number;
  career_span_years: number;
  industry_changes: number;
  created_at: string;
  updated_at: string;
}

export interface EmploymentPosition {
  id: string;
  title: string;
  company: string;
  industry: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  skills_used: string[];
  level: string;
}

export interface EmploymentTrend {
  id: string;
  school_id: string;
  period: string;
  total_graduates: number;
  employed_count: number;
  employment_rate: number;
  avg_salary: number;
  top_industries: string[];
  top_companies: string[];
  top_roles: string[];
  created_at: string;
}

export interface EmploymentMatch {
  id: string;
  school_id: string;
  student_id: string;
  position_id: string;
  match_score: number;
  skill_match: number;
  experience_match: number;
  location_match: number;
  salary_match: number;
  overall_fit: string;
  created_at: string;
}

// ==================== DOMAIN-SPECIFIC GRAPH INTERFACES ====================

export interface StudentGraph {
  id: string;
  school_id: string;
  student_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  courses: string[];
  skills: string[];
  competencies: CompetencyProgress[];
  learning_paths: string[];
  performance_score: number;
  engagement_score: number;
  created_at: string;
  updated_at: string;
}

export interface TeacherGraph {
  id: string;
  school_id: string;
  teacher_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  subjects: string[];
  classes: string[];
  expertise: string[];
  publications: string[];
  mentoring_students: string[];
  research_areas: string[];
  created_at: string;
  updated_at: string;
}

export interface SchoolGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  departments: string[];
  programs: string[];
  total_students: number;
  total_teachers: number;
  total_courses: number;
  health_score: number;
  created_at: string;
  updated_at: string;
}

export interface CurriculumGraph {
  id: string;
  school_id: string;
  curriculum_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  courses: string[];
  dependencies: string[];
  standards_aligned: string[];
  total_credits: number;
  completion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface SkillsGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_skills: number;
  categories: SkillCategory[];
  trending_skills: string[];
  gap_skills: string[];
  created_at: string;
  updated_at: string;
}

export interface CompetencyGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_competencies: number;
  average_level: CompetencyLevel;
  coverage_percent: number;
  alignment_score: number;
  created_at: string;
  updated_at: string;
}

export interface EmploymentGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  companies: string[];
  industries: string[];
  avg_salary: number;
  employment_rate: number;
  created_at: string;
  updated_at: string;
}

export interface AlumniGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_alumni: number;
  active_donors: number;
  active_mentors: number;
  countries_represented: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_papers: number;
  total_citations: number;
  collaborations: number;
  avg_h_index: number;
  created_at: string;
  updated_at: string;
}

export interface LearningGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_paths: number;
  total_modules: number;
  avg_completion_rate: number;
  avg_satisfaction: number;
  created_at: string;
  updated_at: string;
}

export interface AIGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  models: GraphAIModel[];
  predictions_count: number;
  accuracy_avg: number;
  created_at: string;
  updated_at: string;
}

export interface ConceptGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_concepts: number;
  domains: string[];
  avg_connectivity: number;
  created_at: string;
  updated_at: string;
}

export interface TopicGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_topics: number;
  hierarchy_depth: number;
  avg_children: number;
  created_at: string;
  updated_at: string;
}

export interface ResourceGraph {
  id: string;
  school_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_resources: number;
  resource_types: string[];
  avg_quality: number;
  created_at: string;
  updated_at: string;
}

// ==================== ADDITIONAL INTERFACES ====================

export interface GraphTraversalConfig {
  algorithm: GraphTraversal;
  max_depth: number;
  max_nodes: number;
  weight_threshold: number;
  directed: boolean;
  include_cycles: boolean;
  timeout_ms: number;
}

export interface GraphTraversalOptions {
  start_node_id: string;
  end_node_id?: string;
  config: GraphTraversalConfig;
  filters: Record<string, unknown>;
}

export interface GraphCommunityConfig {
  algorithm: CommunityDetection;
  resolution: number;
  min_community_size: number;
  max_communities: number;
  weight_attribute: string;
}

export interface GraphCentralityConfig {
  measure: CentralityMeasure;
  normalized: boolean;
  directed: boolean;
  weight_attribute: string;
  top_k: number;
}

export interface GraphSearchConfig {
  type: SearchType;
  max_results: number;
  min_score: number;
  fuzzy_threshold: number;
  semantic_weight: number;
  keyword_weight: number;
  graph_weight: number;
  include_context: boolean;
  context_window: number;
}

export interface GraphQueryConfig {
  language: QueryLanguage;
  type: QueryType;
  max_results: number;
  timeout_ms: number;
  include_explanation: boolean;
  parameterized: boolean;
}

export interface GraphRecommendationConfig {
  type: RecommendationType;
  max_recommendations: number;
  min_score: number;
  confidence_threshold: ConfidenceLevel;
  diversity_factor: number;
  recency_weight: number;
  popularity_weight: number;
  personalization_weight: number;
}

export interface GraphVisualization3D {
  id: string;
  graph_id: string;
  camera_position: { x: number; y: number; z: number };
  lighting: Record<string, unknown>;
  node_size_attribute: string;
  edge_width_attribute: string;
  color_scheme: string;
  depth_cue: boolean;
  stereoscopic: boolean;
}

export interface GraphExportConfig {
  format: ExportFormat;
  scope: GraphScope;
  include_metadata: boolean;
  include_embeddings: boolean;
  include_properties: boolean;
  compressed: boolean;
  max_file_size_mb: number;
  split_large_files: boolean;
}

export interface GraphImportConfig {
  format: ImportFormat;
  source_url: string;
  delimiter: string;
  encoding: string;
  skip_header: boolean;
  validate_schema: boolean;
  on_conflict: string;
  batch_size: number;
  timeout_ms: number;
}

export interface GraphSchemaValidation {
  is_valid: boolean;
  errors: GraphSchemaError[];
  warnings: GraphSchemaWarning[];
  node_type_violations: string[];
  edge_type_violations: string[];
  missing_constraints: string[];
  validated_at: string;
}

export interface GraphSchemaError {
  code: string;
  message: string;
  path: string;
  severity: string;
}

export interface GraphSchemaWarning {
  code: string;
  message: string;
  path: string;
  suggestion: string;
}

export interface GraphTemporalIndex {
  id: string;
  graph_id: string;
  node_id: string;
  timestamp: string;
  event_type: string;
  changes: Record<string, unknown>;
  version: number;
  created_at: string;
}

export interface GraphTimeSeries {
  id: string;
  graph_id: string;
  metric: string;
  data_points: GraphTimeSeriesPoint[];
  interval: string;
  start_date: string;
  end_date: string;
  aggregation: string;
}

export interface GraphTimeSeriesPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface GraphComparison {
  id: string;
  graph_id_a: string;
  graph_id_b: string;
  node_diff: GraphDiff;
  edge_diff: GraphDiff;
  similarity_score: number;
  structural_diff: Record<string, unknown>;
  created_at: string;
}

export interface GraphDiff {
  added: string[];
  removed: string[];
  modified: string[];
  unchanged: string[];
}

export interface GraphAnomaly {
  id: string;
  graph_id: string;
  type: AlertType;
  entity_id: string;
  entity_type: string;
  description: string;
  severity: string;
  confidence: ConfidenceLevel;
  detected_at: string;
  resolved: boolean;
  resolved_at: string;
}

export interface GraphCorrelation {
  id: string;
  graph_id: string;
  attribute_a: string;
  attribute_b: string;
  correlation_coefficient: number;
  p_value: number;
  sample_size: number;
  direction: string;
  strength: RelationshipStrength;
  created_at: string;
}

export interface GraphPrediction {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  prediction_type: string;
  predicted_value: unknown;
  confidence: ConfidenceLevel;
  features_used: string[];
  model_version: string;
  created_at: string;
  valid_until: string;
}

export interface GraphSimulation {
  id: string;
  graph_id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  iterations: number;
  results: Record<string, unknown>;
  status: string;
  created_at: string;
  completed_at: string;
}

export interface GraphScenario {
  id: string;
  graph_id: string;
  name: string;
  description: string;
  changes: GraphUpdate[];
  predicted_impact: Record<string, unknown>;
  risk_score: number;
  confidence: ConfidenceLevel;
  created_at: string;
}

export interface GraphVersion {
  id: string;
  graph_id: string;
  version: number;
  snapshot: Record<string, unknown>;
  changelog: string;
  created_by: string;
  created_at: string;
}

export interface GraphBackup {
  id: string;
  graph_id: string;
  file_url: string;
  file_size: number;
  node_count: number;
  edge_count: number;
  checksum: string;
  status: string;
  created_at: string;
}

export interface GraphPermission {
  id: string;
  graph_id: string;
  user_id: string;
  role: string;
  can_read: boolean;
  can_write: boolean;
  can_delete: boolean;
  can_export: boolean;
  can_share: boolean;
  created_at: string;
}

export interface GraphShare {
  id: string;
  graph_id: string;
  shared_by: string;
  shared_with: string[];
  permission_level: string;
  expires_at: string;
  created_at: string;
}

export interface GraphNotification {
  id: string;
  graph_id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

export interface GraphSubscription {
  id: string;
  graph_id: string;
  user_id: string;
  events: string[];
  webhook_url: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GraphAnalyticsDashboard {
  id: string;
  graph_id: string;
  name: string;
  metrics: GraphMetric[];
  charts: GraphChart[];
  refresh_interval: number;
  last_refresh: string;
  created_at: string;
  updated_at: string;
}

export interface GraphChart {
  id: string;
  type: string;
  title: string;
  data_source: string;
  config: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
}

export interface GraphReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: GraphReportSection[];
  format: ExportFormat;
  schedule: string;
  recipients: string[];
  created_at: string;
}

export interface GraphReportSection {
  title: string;
  type: string;
  query: string;
  visualization: string;
  narrative: string;
}

export interface GraphDataQualityReport {
  id: string;
  graph_id: string;
  overall_score: number;
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  issues: GraphDataQualityIssue[];
  created_at: string;
}

export interface GraphDataQualityIssue {
  entity_type: string;
  entity_id: string;
  issue_type: string;
  description: string;
  severity: string;
  suggested_fix: string;
}

export interface GraphPerformanceMetrics {
  id: string;
  graph_id: string;
  query_time_avg_ms: number;
  traversal_time_avg_ms: number;
  embedding_time_avg_ms: number;
  index_size_bytes: number;
  cache_hit_rate: number;
  memory_usage_mb: number;
  cpu_usage_percent: number;
  measured_at: string;
}

export interface GraphOptimization {
  id: string;
  graph_id: string;
  type: string;
  description: string;
  impact: string;
  estimated_improvement: number;
  status: string;
  applied_at: string;
  created_at: string;
}

export interface GraphMigration {
  id: string;
  source_graph_id: string;
  target_graph_id: string;
  status: string;
  records_migrated: number;
  records_failed: number;
  errors: string[];
  started_at: string;
  completed_at: string;
}

export interface GraphConsolidation {
  id: string;
  graph_id: string;
  source_nodes: string[];
  target_node: string;
  merged_properties: Record<string, unknown>;
  edges_affected: number;
  status: string;
  created_at: string;
}

export interface GraphDeduplication {
  id: string;
  graph_id: string;
  duplicate_groups: string[][];
  total_duplicates: number;
  resolved: number;
  strategy: string;
  created_at: string;
}

export interface GraphEnrichment {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  source: string;
  added_properties: Record<string, unknown>;
  added_edges: GraphEdge[];
  confidence: ConfidenceLevel;
  created_at: string;
}

export interface GraphAnnotation {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  user_id: string;
  text: string;
  tags: string[];
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface GraphTag {
  id: string;
  graph_id: string;
  name: string;
  color: string;
  entity_count: number;
  created_at: string;
}

export interface GraphBookmark {
  id: string;
  graph_id: string;
  user_id: string;
  entity_id: string;
  entity_type: string;
  note: string;
  created_at: string;
}

export interface GraphActivityLog {
  id: string;
  graph_id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown>;
  ip_address: string;
  created_at: string;
}

export interface GraphUsageStatistics {
  id: string;
  graph_id: string;
  total_queries: number;
  total_traversals: number;
  total_searches: number;
  unique_users: number;
  avg_session_duration: number;
  peak_concurrent: number;
  period: string;
  created_at: string;
}

export interface GraphFeedback {
  id: string;
  graph_id: string;
  user_id: string;
  rating: number;
  comment: string;
  category: string;
  resolved: boolean;
  created_at: string;
}

export interface GraphDocumentation {
  id: string;
  graph_id: string;
  title: string;
  content: string;
  type: string;
  author: string;
  version: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface GraphGlossary {
  id: string;
  graph_id: string;
  term: string;
  definition: string;
  aliases: string[];
  domain: string;
  related_terms: string[];
  created_at: string;
  updated_at: string;
}

export interface GraphLineage {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  source_system: string;
  source_entity_id: string;
  transformation: string;
  created_at: string;
}

export interface GraphImpactAnalysis {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  affected_nodes: string[];
  affected_edges: string[];
  impact_score: number;
  cascade_depth: number;
  created_at: string;
}

export interface GraphDependency {
  id: string;
  graph_id: string;
  source_id: string;
  target_id: string;
  dependency_type: string;
  criticality: string;
  alternative_paths: number;
  created_at: string;
}

export interface GraphCircularDependency {
  id: string;
  graph_id: string;
  cycle: string[];
  cycle_length: number;
  severity: string;
  suggested_break: string;
  created_at: string;
}

export interface GraphClustering {
  id: string;
  graph_id: string;
  algorithm: string;
  clusters: GraphCluster[];
  silhouette_score: number;
  davies_bouldin_index: number;
  created_at: string;
}

export interface GraphCluster {
  id: string;
  name: string;
  node_ids: string[];
  centroid: string;
  size: number;
  density: number;
  cohesion: number;
}

export interface GraphEmbeddingModel {
  id: string;
  name: string;
  type: string;
  dimensions: number;
  max_tokens: number;
  supports_batch: boolean;
  accuracy_benchmark: number;
  created_at: string;
}

export interface GraphEmbeddingConfig {
  model_id: string;
  dimensions: number;
  batch_size: number;
  normalize: boolean;
  pooling: string;
  truncation: boolean;
}

export interface GraphSimilaritySearch {
  id: string;
  graph_id: string;
  query_entity_id: string;
  results: GraphSimilarityResult[];
  algorithm: string;
  threshold: number;
  created_at: string;
}

export interface GraphSimilarityResult {
  entity_id: string;
  entity_type: string;
  similarity_score: number;
  common_neighbors: number;
  path_length: number;
}

export interface GraphLinkPrediction {
  id: string;
  graph_id: string;
  source_id: string;
  target_id: string;
  predicted_edge_type: EdgeType;
  probability: ConfidenceLevel;
  features_used: string[];
  model: string;
  created_at: string;
}

export interface GraphNodeClassification {
  id: string;
  graph_id: string;
  node_id: string;
  predicted_type: NodeType;
  confidence: ConfidenceLevel;
  features_used: string[];
  model: string;
  created_at: string;
}

export interface GraphAnomalyDetection {
  id: string;
  graph_id: string;
  anomaly_type: string;
  entity_ids: string[];
  description: string;
  severity: string;
  confidence: ConfidenceLevel;
  detected_at: string;
  resolved: boolean;
}

export interface GraphEvolution {
  id: string;
  graph_id: string;
  start_date: string;
  end_date: string;
  node_growth: number;
  edge_growth: number;
  density_change: number;
  community_changes: number;
  milestones: GraphMilestone[];
  created_at: string;
}

export interface GraphMilestone {
  date: string;
  event: string;
  description: string;
  impact: string;
}

export interface GraphBenchmark {
  id: string;
  graph_id: string;
  metric: string;
  value: number;
  baseline: number;
  target: number;
  status: string;
  trend: string;
  measured_at: string;
}

export interface GraphHealthCheck {
  id: string;
  graph_id: string;
  status: GraphHealth;
  node_integrity: number;
  edge_integrity: number;
  orphan_nodes: number;
  dangling_edges: number;
  schema_violations: number;
  checked_at: string;
}

export interface GraphRecovery {
  id: string;
  graph_id: string;
  backup_id: string;
  status: string;
  records_recovered: number;
  started_at: string;
  completed_at: string;
  errors: string[];
}

export interface GraphPartition {
  id: string;
  graph_id: string;
  name: string;
  node_ids: string[];
  edge_ids: string[];
  size_bytes: number;
  created_at: string;
}

export interface GraphShard {
  id: string;
  graph_id: string;
  shard_index: number;
  node_range: { start: number; end: number };
  size_bytes: number;
  status: string;
  created_at: string;
}

export interface GraphReplica {
  id: string;
  graph_id: string;
  replica_index: number;
  node_count: number;
  edge_count: number;
  lag_ms: number;
  status: string;
  created_at: string;
}

export interface GraphCacheConfig {
  id: string;
  graph_id: string;
  cache_type: string;
  ttl_seconds: number;
  max_size_mb: number;
  eviction_policy: string;
  hit_rate: number;
  created_at: string;
}

export interface GraphRateLimit {
  id: string;
  graph_id: string;
  user_id: string;
  max_queries_per_minute: number;
  max_traversals_per_minute: number;
  current_usage: number;
  window_start: string;
  created_at: string;
}

export interface GraphApiEndpoint {
  id: string;
  graph_id: string;
  path: string;
  method: string;
  description: string;
  parameters: Record<string, unknown>[];
  rate_limit: number;
  requires_auth: boolean;
  created_at: string;
}

export interface GraphWebhook {
  id: string;
  graph_id: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  last_triggered: string;
  failure_count: number;
  created_at: string;
}

export interface GraphIntegration {
  id: string;
  graph_id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  last_sync: string;
  created_at: string;
}

export interface GraphTransform {
  id: string;
  graph_id: string;
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  output_schema: Record<string, unknown>;
  transform_function: string;
  created_at: string;
}

export interface GraphValidation {
  id: string;
  graph_id: string;
  rule_name: string;
  rule_type: string;
  definition: Record<string, unknown>;
  violations: number;
  last_checked: string;
  created_at: string;
}

export interface GraphCompliance {
  id: string;
  graph_id: string;
  standard: string;
  status: string;
  score: number;
  requirements_met: number;
  requirements_total: number;
  last_audit: string;
  created_at: string;
}

export interface GraphGovernance {
  id: string;
  graph_id: string;
  policy: string;
  description: string;
  owner: string;
  approvers: string[];
  effective_date: string;
  review_cycle: string;
  created_at: string;
}

export interface GraphStewardship {
  id: string;
  graph_id: string;
  entity_type: string;
  steward_id: string;
  responsibilities: string[];
  quality_target: number;
  current_quality: number;
  created_at: string;
}

export interface GraphCatalog {
  id: string;
  graph_id: string;
  name: string;
  description: string;
  entries: GraphCatalogEntry[];
  total_entries: number;
  last_updated: string;
  created_at: string;
}

export interface GraphCatalogEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  name: string;
  description: string;
  owner: string;
  tags: string[];
  quality_score: number;
  last_verified: string;
}

export interface GraphDataLineage {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  upstream: GraphLineageNode[];
  downstream: GraphLineageNode[];
  created_at: string;
}

export interface GraphLineageNode {
  entity_id: string;
  entity_type: string;
  system: string;
  transformation: string;
}

export interface GraphImpactScore {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  direct_impact: number;
  indirect_impact: number;
  total_impact: number;
  affected_count: number;
  created_at: string;
}

export interface GraphRiskAssessment {
  id: string;
  graph_id: string;
  entity_id: string;
  entity_type: string;
  risk_type: string;
  probability: number;
  impact: number;
  risk_score: number;
  mitigation: string;
  created_at: string;
}

export interface GraphCostAnalysis {
  id: string;
  graph_id: string;
  storage_cost: number;
  compute_cost: number;
  api_cost: number;
  total_cost: number;
  cost_per_query: number;
  period: string;
  created_at: string;
}

export interface GraphROI {
  id: string;
  graph_id: string;
  investment: number;
  returns: number;
  roi_percent: number;
  time_to_value: number;
  efficiency_gain: number;
  created_at: string;
}
