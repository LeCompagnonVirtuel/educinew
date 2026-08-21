export enum KnowledgeNodeType {
  CONCEPT = "CONCEPT",
  FACT = "FACT",
  RULE = "RULE",
  PRINCIPLE = "PRINCIPLE",
  THEORY = "THEORY",
  PROCEDURE = "PROCEDURE",
  DEFINITION = "DEFINITION",
  EXAMPLE = "EXAMPLE",
  METADATA = "METADATA",
  CONTEXT = "CONTEXT",
  ENTITY = "ENTITY",
  RELATION = "RELATION",
  ATTRIBUTE = "ATTRIBUTE",
  EVENT = "EVENT",
  PROCESS = "PROCESS",
  RESOURCE = "RESOURCE",
  STANDARD = "STANDARD",
  ASSESSMENT = "ASSESSMENT",
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  LEARNING_OUTCOME = "LEARNING_OUTCOME",
  PEDAGOGY = "PEDAGOGY",
  CURRICULUM = "CURRICULUM",
  POLICY = "POLICY",
  BEST_PRACTICE = "BEST_PRACTICE",
  CASE_STUDY = "CASE_STUDY",
  RESEARCH = "RESEARCH",
  DATA_POINT = "DATA_POINT",
  METRIC = "METRIC",
  INSIGHT = "INSIGHT",
  PATTERN = "PATTERN",
  ANOMALY = "ANOMALY",
  TREND = "TREND",
  PREDICTION = "PREDICTION",
  RECOMMENDATION = "RECOMMENDATION",
  FEEDBACK = "FEEDBACK",
  EVALUATION = "EVALUATION",
  SUMMARY = "SUMMARY",
  ENCYCLOPEDIA = "ENCYCLOPEDIA",
  GLOSSARY = "GLOSSARY",
  TIMELINE = "TIMELINE",
  HIERARCHY = "HIERARCHY",
  NETWORK = "NETWORK",
  MATRIX = "MATRIX",
  TAXONOMY = "TAXONOMY",
  ONTOLOGY = "ONTOLOGY",
  SCHEMA = "SCHEMA",
  MODEL = "MODEL",
  FRAMEWORK = "FRAMEWORK",
  METHODOLOGY = "METHODOLOGY",
  TECHNIQUE = "TECHNIQUE",
  STRATEGY = "STRATEGY",
  TOOL = "TOOL",
  INSTRUMENT = "INSTRUMENT",
  PLATFORM = "PLATFORM",
  SYSTEM = "SYSTEM",
  MODULE = "MODULE",
  COMPONENT = "COMPONENT",
  SERVICE = "SERVICE",
  API_ENDPOINT = "API_ENDPOINT",
  DATABASE = "DATABASE",
  DOCUMENT = "DOCUMENT",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  INTERACTIVE = "INTERACTIVE",
  SIMULATION = "SIMULATION",
  GAME = "GAME",
  QUIZ = "QUIZ",
  ASSIGNMENT = "ASSIGNMENT",
  PROJECT = "PROJECT",
  LABORATORY = "LABORATORY",
  FIELDWORK = "FIELDWORK",
  WORKSHOP = "WORKSHOP",
  SEMINAR = "SEMINAR",
  CONFERENCE = "CONFERENCE",
  LECTURE = "LECTURE",
  TUTORIAL = "TUTORIAL",
  MENTORING = "MENTORING",
  COACHING = "COACHING",
  THERAPY = "THERAPY",
  COUNSELING = "COUNSELING",
  SUPPORT = "SUPPORT"
}

export enum KnowledgeEdgeType {
  IS_A = "IS_A",
  PART_OF = "PART_OF",
  HAS_PROPERTY = "HAS_PROPERTY",
  CAUSES = "CAUSES",
  ENABLES = "ENABLES",
  PREVENTS = "PREVENTS",
  REQUIRES = "REQUIRES",
  PRODUCES = "PRODUCES",
  RELATES_TO = "RELATES_TO",
  CONTRADICTS = "CONTRADICTS",
  SUPPORTS = "SUPPORTS",
  DEPENDS_ON = "DEPENDS_ON",
  INFLUENCES = "INFLUENCES",
  LEADS_TO = "LEADS_TO",
  DERIVED_FROM = "DERIVED_FROM",
  EXAMPLE_OF = "EXAMPLE_OF",
  INSTANCE_OF = "INSTANCE_OF",
  SUBCLASS_OF = "SUBCLASS_OF",
  SUPERCLASS_OF = "SUPERCLASS_OF",
  SIMILAR_TO = "SIMILAR_TO",
  OPPOSITE_OF = "OPPOSITE_OF",
  ALTERNATIVE_TO = "ALTERNATIVE_TO",
  USED_FOR = "USED_FOR",
  INTERACTS_WITH = "INTERACTS_WITH",
  MEASURED_BY = "MEASURED_BY",
  EVALUATED_BY = "EVALUATED_BY",
  VALIDATED_BY = "VALIDATED_BY",
  UPDATED_BY = "UPDATED_BY",
  CREATED_BY = "CREATED_BY",
  MODIFIED_BY = "MODIFIED_BY",
  ASSOCIATED_WITH = "ASSOCIATED_WITH",
  CONTEXTUALIZES = "CONTEXTUALIZES",
  EXEMPLIFIES = "EXEMPLIFIES",
  ILLUSTRATES = "ILLUSTRATES",
  DEFINES = "DEFINES",
  DESCRIBES = "DESCRIBES",
  EXPLAINS = "EXPLAINS",
  ELABORATES = "ELABORATES",
  EXTENDS = "EXTENDS",
  SPECIALIZES = "SPECIALIZES",
  GENERALIZES = "GENERALIZES",
  COMPARISON = "COMPARISON",
  SEQUENCE = "SEQUENCE",
  HIERARCHY = "HIERARCHY",
  NETWORK = "NETWORK",
  FLOW = "FLOW",
  DEPENDENCY = "DEPENDENCY",
  CONSTRAINT = "CONSTRAINT",
  INVARIANT = "INVARIANT",
  PRECONDITION = "PRECONDITION",
  POSTCONDITION = "POSTCONDITION"
}

export enum MemoryType {
  SHORT_TERM = "SHORT_TERM",
  LONG_TERM = "LONG_TERM",
  WORKING = "WORKING",
  EPISODIC = "EPISODIC",
  SEMANTIC = "SEMANTIC",
  PROCEDURAL = "PROCEDURAL",
  DECLARATIVE = "DECLARATIVE",
  IMPLICIT = "IMPLICIT",
  EXPLICIT = "EXPLICIT",
  SENSORY = "SENSORY",
  RETRIEVAL = "RETRIEVAL",
  ENCODING = "ENCODING",
  CONSOLIDATION = "CONSOLIDATION",
  DECAY = "DECAY",
  REINFORCEMENT = "REINFORCEMENT",
  ASSOCIATIVE = "ASSOCIATIVE",
  COLLECTIVE = "COLLECTIVE",
  DISTRIBUTED = "DISTRIBUTED",
  PERSISTENT = "PERSISTENT",
  TEMPORARY = "TEMPORARY",
  VOLATILE = "VOLATILE",
  CACHED = "CACHED",
  INDEXED = "INDEXED",
  COMPRESSED = "COMPRESSED",
  ARCHIVED = "ARCHIVED"
}

export enum MemoryPersistence {
  SESSION = "SESSION",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
  PERMANENT = "PERMANENT",
  INDEFINITE = "INDEFINITE",
  TTL = "TTL",
  ON_DEMAND = "ON_DEMAND",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  SCHEDULED = "SCHEDULED",
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
  HYBRID = "HYBRID"
}

export enum ContextType {
  USER = "USER",
  SESSION = "SESSION",
  APPLICATION = "APPLICATION",
  ORGANIZATIONAL = "ORGANIZATIONAL",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  SOCIAL = "SOCIAL",
  ACADEMIC = "ACADEMIC",
  BEHAVIORAL = "BEHAVIORAL",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  HISTORICAL = "HISTORICAL",
  PREDICTIVE = "PREDICTIVE",
  PRESCRIPTIVE = "PRESCRIPTIVE",
  DIAGNOSTIC = "DIAGNOSTIC",
  ANALYTICAL = "ANALYTICAL",
  TRANSACTIONAL = "TRANSACTIONAL",
  COLLABORATIVE = "COLLABORATIVE",
  PERSONALIZED = "PERSONALIZED",
  ADAPTIVE = "ADAPTIVE",
  DYNAMIC = "DYNAMIC",
  STATIC = "STATIC",
  REAL_TIME = "REAL_TIME",
  BATCH = "BATCH",
  STREAMING = "STREAMING"
}

export enum SemanticRelation {
  SYNONYM = "SYNONYM",
  ANTONYM = "ANTONYM",
  HYPERNYM = "HYPERNYM",
  HYPONYM = "HYPONYM",
  MERONYM = "MERONYM",
  HOLONYM = "HOLONYM",
  HOMONYM = "HOMONYM",
  POLYSEMY = "POLYSEMY",
  COLLOCATION = "COLLOCATION",
  IS_A = "IS_A",
  HAS_A = "HAS_A",
  PART_OF = "PART_OF",
  CAUSES = "CAUSES",
  ENABLES = "ENABLES",
  PREVENTS = "PREVENTS",
  REQUIRES = "REQUIRES",
  PRODUCES = "PRODUCES",
  MEASURES = "MEASURES",
  DESCRIBES = "DESCRIBES",
  RELATES_TO = "RELATES_TO"
}

export enum EmbeddingModel {
  TEXT_EMBEDDING_ADA_002 = "TEXT_EMBEDDING_ADA_002",
  TEXT_EMBEDDING_3_SMALL = "TEXT_EMBEDDING_3_SMALL",
  TEXT_EMBEDDING_3_LARGE = "TEXT_EMBEDDING_3_LARGE",
  BGE_BASE_EN = "BGE_BASE_EN",
  BGE_LARGE_EN = "BGE_LARGE_EN",
  E5_LARGE = "E5_LARGE",
  MPNET_BASE = "MPNET_BASE",
  ALL_MINILM = "ALL_MINILM",
  DISTILBERT = "DISTILBERT",
  SENTENCE_TRANSFORMERS = "SENTENCE_TRANSFORMERS",
  INSTRUCTOR = "INSTRUCTOR",
  GTE_BASE = "GTE_BASE",
  GTE_LARGE = "GTE_LARGE",
  GTE_XL = "GTE_XL",
  NOMIC_EMBED = "NOMIC_EMBED",
  MISTRAL_EMBED = "MISTRAL_EMBED",
  COHERE_EMBED = "COHERE_EMBED",
  JINA_EMBED = "JINA_EMBED",
  VOYAGE_EMBED = "VOYAGE_EMBED",
  VOYAGE_2 = "VOYAGE_2",
  CUSTOM = "CUSTOM"
}

export enum VectorStoreType {
  PINECONE = "PINECONE",
  WEAVIATE = "WEAVIATE",
  QDRANT = "QDRANT",
  MILVUS = "MILVUS",
  CHROMA = "CHROMA",
  FAISS = "FAISS",
  PINECONE_SERVERLESS = "PINECONE_SERVERLESS",
  SUPABASE_PGVECTOR = "SUPABASE_PGVECTOR",
  ELASTICSEARCH = "ELASTICSEARCH",
  REDIS = "REDIS",
  MONGO_ATLAS = "MONGO_ATLAS",
  SINGLESTORE = "SINGLESTORE",
  LANCEDB = "LANCEDB",
  TURBOPUFFER = "TURBOPUFFER",
  SUPERBASE = "SUPERBASE",
  IN_MEMORY = "IN_MEMORY",
  LOCAL = "LOCAL",
  HYBRID = "HYBRID"
}

export enum RAGStrategy {
  NAIVE = "NAIVE",
  ADVANCED = "ADVANCED",
  MULTI_QUERY = "MULTI_QUERY",
  RECURSIVE = "RECURSIVE",
  TREE_OF_THOUGHT = "TREE_OF_THOUGHT",
  SELF_RAG = "SELF_RAG",
  CORRECTION = "CORRECTION",
  ITERATIVE = "ITERATIVE",
  ADAPTIVE = "ADAPTIVE",
  GRAPH = "GRAPH",
  AGENTIC = "AGENTIC",
  SEMANTIC = "SEMANTIC",
  KEYWORD = "KEYWORD",
  HYBRID_SEARCH = "HYBRID_SEARCH",
  ENSEMBLE = "ENSEMBLE",
  RERANK = "RERANK",
  RETRIEVAL = "RETRIEVAL",
  MAP_REDUCE = "MAP_REDUCE",
  MAP_RERANK = "MAP_RERANK",
  REFINEMENT = "REFINEMENT"
}

export enum RetrievalMode {
  DENSE = "DENSE",
  SPARSE = "SPARSE",
  HYBRID = "HYBRID",
  SEMANTIC = "SEMANTIC",
  KEYWORD = "KEYWORD",
  FULL_TEXT = "FULL_TEXT",
  FUZZY = "FUZZY",
  EXACT = "EXACT",
  VECTOR = "VECTOR",
  GRAPH = "GRAPH",
  RECURSIVE = "RECURSIVE",
  PARENT_CHILD = "PARENT_CHILD",
  WINDOW = "WINDOW",
  SENTENCE = "SENTENCE",
  PARAGRAPH = "PARAGRAPH",
  DOCUMENT = "DOCUMENT",
  MULTI_FIELD = "MULTI_FIELD",
  CROSS_ENCODER = "CROSS_ENCODER",
  COLBERT = "COLBERT",
  LATE_INTERACTION = "LATE_INTERACTION"
}

export enum ReasoningType {
  DEDUCTIVE = "DEDUCTIVE",
  INDUCTIVE = "INDUCTIVE",
  ABDUCTIVE = "ABDUCTIVE",
  ANALOGICAL = "ANALOGICAL",
  CAUSAL = "CAUSAL",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  QUANTITATIVE = "QUANTITATIVE",
  QUALITATIVE = "QUALITATIVE",
  COMPARATIVE = "COMPARATIVE",
  CLASSIFICATORY = "CLASSIFICATORY",
  EVALUATIVE = "EVALUATIVE",
  PREDICTIVE = "PREDICTIVE",
  PRESCRIPTIVE = "PRESCRIPTIVE",
  DIAGNOSTIC = "DIAGNOSTIC",
  PROBABILISTIC = "PROBABILISTIC",
  BAYESIAN = "BAYESIAN",
  SYMBOLIC = "SYMBOLIC",
  CONNECTIONIST = "CONNECTIONIST",
  HYBRID = "HYBRID",
  COMMONSENSE = "COMMONSENSE",
  EXPERT = "EXPERT",
  LEARNED = "LEARNED",
  RULE_BASED = "RULE_BASED",
  CASE_BASED = "CASE_BASED"
}

export enum KnowledgeGraphSchema {
  OWL = "OWL",
  RDF = "RDF",
  RDFS = "RDFS",
  SCHEMA_ORG = "SCHEMA_ORG",
  DBPEDIA = "DBPEDIA",
  WIKIDATA = "WIKIDATA",
  CUSTOM = "CUSTOM",
  ONTOLOGY = "ONTOLOGY",
  TAXONOMY = "TAXONOMY",
  THESAURUS = "THESAURUS"
}

export enum GraphTraversal {
  BFS = "BFS",
  DFS = "DFS",
  DIJKSTRA = "DIJKSTRA",
  A_STAR = "A_STAR",
  PAGERANK = "PAGERANK",
  BETWEENNESS = "BETWEENNESS",
  CLOSENESS = "CLOSENESS",
  EIGENVECTOR = "EIGENVECTOR",
  HITS = "HITS",
  RANDOM_WALK = "RANDOM_WALK"
}

export enum EmbeddingDistance {
  COSINE = "COSINE",
  EUCLIDEAN = "EUCLIDEAN",
  MANHATTAN = "MANHATTAN",
  DOT_PRODUCT = "DOT_PRODUCT",
  HAMMING = "HAMMING",
  JACCARD = "JACCARD",
  CHEBYSHEV = "CHEBYSHEV",
  CANBERRA = "CANBERRA",
  BRAY_CURTIS = "BRAY_CURTIS",
  MAHALANOBIS = "MAHALANOBIS"
}

export enum IndexType {
  FLAT = "FLAT",
  IVF = "IVF",
  HNSW = "HNSW",
  ANNOY = "ANNOY",
  LSH = "LSH",
  PQ = "PQ",
  OPQ = "OPQ",
  IVF_PQ = "IVF_PQ",
  IVF_HNSW = "IVF_HNSW",
  SCANN = "SCANN"
}

export enum SemanticSearchMode {
  EXACT = "EXACT",
  APPROXIMATE = "APPROXIMATE",
  RANGE = "RANGE",
  FILTERED = "FILTERED",
  WEIGHTED = "WEIGHTED",
  RANKED = "RANKED",
  CLUSTERED = "CLUSTERED",
  DEDUPLICATED = "DEDUPLICATED",
  ENRICHED = "ENRICHED",
  AUGMENTED = "AUGMENTED"
}

export enum MemoryRefreshStrategy {
  LRU = "LRU",
  LFU = "LFU",
  FIFO = "FIFO",
  LIFO = "LIFO",
  RANDOM = "RANDOM",
  PRIORITY = "PRIORITY",
  TIME_BASED = "TIME_BASED",
  ACCESS_BASED = "ACCESS_BASED",
  SIZE_BASED = "SIZE_BASED",
  COMBINED = "COMBINED"
}

export enum KnowledgeSyncMode {
  REAL_TIME = "REAL_TIME",
  BATCH = "BATCH",
  ON_DEMAND = "ON_DEMAND",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  SCHEDULED = "SCHEDULED",
  MANUAL = "MANUAL",
  INCREMENTAL = "INCREMENTAL",
  FULL = "FULL",
  DIFFERENTIAL = "DIFFERENTIAL",
  COMPRESSION = "COMPRESSION"
}

export enum PolicyComplianceLevel {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  MINIMAL = "MINIMAL",
  NON_COMPLIANT = "NON_COMPLIANT",
  EXEMPT = "EXEMPT",
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  VIOLATION = "VIOLATION",
  WAIVER = "WAIVER",
  OVERRIDE = "OVERRIDE"
}

export enum BestPracticeCategory {
  PEDAGOGY = "PEDAGOGY",
  TECHNOLOGY = "TECHNOLOGY",
  ASSESSMENT = "ASSESSMENT",
  ENGAGEMENT = "ENGAGEMENT",
  INCLUSION = "INCLUSION",
  SAFETY = "SAFETY",
  EFFICIENCY = "EFFICIENCY",
  INNOVATION = "INNOVATION",
  COLLABORATION = "COLLABORATION",
  WELLNESS = "WELLNESS"
}

export enum KnowledgeValidationStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  OUTDATED = "OUTDATED",
  CONFLICTING = "CONFLICTING",
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  DEPRECATED = "DEPRECATED",
  SUPERSEDED = "SUPERSEDED",
  INCOMPLETE = "INCOMPLETE",
  CORRUPTED = "CORRUPTED"
}

export enum SemanticVersioning {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
  PRE_RELEASE = "PRE_RELEASE",
  BUILD = "BUILD"
}

export enum KnowledgeGraphMetricType {
  DENSITY = "DENSITY",
  CENTRALITY = "CENTRALITY",
  CONNECTIVITY = "CONNECTIVITY",
  CLUSTERING = "CLUSTERING",
  DIVERSITY = "DIVERSITY",
  RICHNESS = "RICHNESS",
  ACCURACY = "ACCURACY",
  COMPLETENESS = "COMPLETENESS",
  CONSISTENCY = "CONSISTENCY",
  CURRENCY = "CURRENCY"
}

export enum MemoryCompressionType {
  NONE = "NONE",
  LOSSY = "LOSSY",
  LOSSLESS = "LOSSLESS",
  SEMANTIC = "SEMANTIC",
  STRUCTURAL = "STRUCTURAL",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  FREQUENCY = "FREQUENCY",
  IMPORTANCE = "IMPORTANCE",
  RELEVANCE = "RELEVANCE"
}

export enum ContextWindowType {
  FIXED = "FIXED",
  DYNAMIC = "DYNAMIC",
  SLIDING = "SLIDING",
  ADAPTIVE = "ADAPTIVE",
  HIERARCHICAL = "HIERARCHICAL",
  MULTI_LEVEL = "MULTI_LEVEL",
  PRIORITY = "PRIORITY",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  SEMANTIC = "SEMANTIC"
}

export enum KnowledgeGraphUpdateMode {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  UPSERT = "UPSERT",
  MERGE = "MERGE",
  SPLIT = "SPLIT",
  RELOCATE = "RELOCATE",
  RECONNECT = "RECONNECT",
  TRANSFORM = "TRANSFORM",
  ROLLBACK = "ROLLBACK"
}

export enum SemanticReasoningScope {
  LOCAL = "LOCAL",
  GLOBAL = "GLOBAL",
  DOMAIN = "DOMAIN",
  CROSS_DOMAIN = "CROSS_DOMAIN",
  INTERDISCIPLINARY = "INTERDISCIPLINARY",
  UNIVERSAL = "UNIVERSAL",
  CONTEXTUAL = "CONTEXTUAL",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  SOCIAL = "SOCIAL"
}

export enum KnowledgeGraphVisualization {
  FORCE_DIRECTED = "FORCE_DIRECTED",
  TREE = "TREE",
  RADIAL = "RADIAL",
  CIRCULAR = "CIRCULAR",
  HIERARCHICAL = "HIERARCHICAL",
  CLUSTERED = "CLUSTERED",
  GEOGRAPHIC = "GEOGRAPHIC",
  TEMPORAL = "TEMPORAL",
  MATRIX = "MATRIX",
  SANKEY = "SANKEY"
}

export interface KnowledgeGraph {
  id: string;
  name: string;
  description: string;
  schema: KnowledgeGraphSchema;
  schoolId: string;
  version: string;
  nodeCount: number;
  edgeCount: number;
  density: number;
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  metrics: KnowledgeGraphMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeNode {
  id: string;
  graphId: string;
  type: KnowledgeNodeType;
  label: string;
  description: string;
  properties: Record<string, unknown>;
  embedding: Embedding;
  validationStatus: KnowledgeValidationStatus;
  version: string;
  metadata: KnowledgeNodeMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeEdge {
  id: string;
  graphId: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: KnowledgeEdgeType;
  weight: number;
  properties: Record<string, unknown>;
  confidence: number;
  metadata: KnowledgeEdgeMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeNodeMetadata {
  source: string;
  author: string;
  confidence: number;
  lastAccessed: Date;
  accessCount: number;
  tags: string[];
  categories: string[];
  language: string;
  domain: string;
}

export interface KnowledgeEdgeMetadata {
  source: string;
  confidence: number;
  bidirectional: boolean;
  temporal: boolean;
  spatial: boolean;
  evidence: string[];
  references: string[];
}

export interface KnowledgeGraphMetrics {
  density: number;
  avgPathLength: number;
  clusteringCoefficient: number;
  modularity: number;
  centrality: CentralityMetrics;
  connectivity: ConnectivityMetrics;
  diversity: DiversityMetrics;
  accuracy: number;
  completeness: number;
  consistency: number;
}

export interface CentralityMetrics {
  degree: Record<string, number>;
  betweenness: Record<string, number>;
  closeness: Record<string, number>;
  eigenvector: Record<string, number>;
  pagerank: Record<string, number>;
}

export interface ConnectivityMetrics {
  components: number;
  diameter: number;
  radius: number;
  avgDegree: number;
  maxDegree: number;
  minDegree: number;
}

export interface DiversityMetrics {
  typeDistribution: Record<KnowledgeNodeType, number>;
  edgeTypeDistribution: Record<KnowledgeEdgeType, number>;
  domainCoverage: number;
  topicEntropy: number;
}

export interface InstitutionalMemoryEntry {
  id: string;
  schoolId: string;
  type: MemoryType;
  persistence: MemoryPersistence;
  content: string;
  context: ContextWindow;
  embedding: Embedding;
  importance: number;
  accessCount: number;
  lastAccessed: Date;
  decayRate: number;
  tags: string[];
  metadata: InstitutionalMemoryMetadata;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
}

export interface InstitutionalMemoryMetadata {
  source: string;
  author: string;
  department: string;
  category: string;
  confidence: number;
  verified: boolean;
  references: string[];
  relatedMemories: string[];
}

export interface SemanticMemory {
  id: string;
  schoolId: string;
  concept: string;
  definition: string;
  relations: SemanticRelationEntry[];
  embedding: Embedding;
  context: ContextWindow;
  confidence: number;
  version: string;
  metadata: SemanticMemoryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface SemanticRelationEntry {
  targetConcept: string;
  relation: SemanticRelation;
  weight: number;
  confidence: number;
  bidirectional: boolean;
}

export interface SemanticMemoryMetadata {
  domain: string;
  source: string;
  authority: number;
  lastValidated: Date;
  validationCount: number;
  tags: string[];
}

export interface ContextWindow {
  id: string;
  type: ContextWindowType;
  size: number;
  overlap: number;
  strategy: string;
  tokens: ContextToken[];
  metadata: ContextWindowMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContextToken {
  id: string;
  content: string;
  position: number;
  importance: number;
  recency: number;
  relevance: number;
  embedding: Embedding;
  metadata: Record<string, unknown>;
}

export interface ContextWindowMetadata {
  totalTokens: number;
  usedTokens: number;
  availableTokens: number;
  compressionRatio: number;
  lastCompacted: Date;
}

export interface LearningMemory {
  id: string;
  studentId: string;
  schoolId: string;
  subject: string;
  topic: string;
  masteryLevel: number;
  learningStyle: string;
  struggles: string[];
  strengths: string[];
  interactions: LearningInteraction[];
  embedding: Embedding;
  metadata: LearningMemoryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningInteraction {
  id: string;
  type: string;
  content: string;
  outcome: string;
  duration: number;
  timestamp: Date;
  context: Record<string, unknown>;
}

export interface LearningMemoryMetadata {
  totalInteractions: number;
  averageScore: number;
  improvementRate: number;
  retentionRate: number;
  engagementLevel: number;
  lastStudyDate: Date;
}

export interface OrganizationalMemory {
  id: string;
  schoolId: string;
  department: string;
  category: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  embedding: Embedding;
  accessCount: number;
  importance: number;
  metadata: OrganizationalMemoryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationalMemoryMetadata {
  author: string;
  department: string;
  classification: string;
  retentionPolicy: string;
  reviewDate: Date;
  approvedBy: string;
  version: string;
}

export interface PolicyKBEntry {
  id: string;
  schoolId: string;
  policyCode: string;
  title: string;
  description: string;
  content: string;
  category: string;
  effectiveDate: Date;
  expiryDate: Date | null;
  complianceLevel: PolicyComplianceLevel;
  applicableRoles: string[];
  embedding: Embedding;
  version: string;
  metadata: PolicyKBMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface PolicyKBMetadata {
  author: string;
  approvedBy: string;
  reviewCycle: string;
  lastReview: Date;
  nextReview: Date;
  relatedPolicies: string[];
  exceptions: string[];
  references: string[];
}

export interface BestPractice {
  id: string;
  schoolId: string;
  category: BestPracticeCategory;
  title: string;
  description: string;
  implementation: string;
  outcomes: string[];
  evidence: string[];
  applicability: string[];
  embedding: Embedding;
  rating: number;
  adoptionCount: number;
  metadata: BestPracticeMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface BestPracticeMetadata {
  source: string;
  author: string;
  validatedBy: string;
  validationDate: Date;
  domain: string;
  complexity: string;
  prerequisites: string[];
  resources: string[];
}

export interface RAGQuery {
  id: string;
  schoolId: string;
  query: string;
  strategy: RAGStrategy;
  retrievalMode: RetrievalMode;
  topK: number;
  threshold: number;
  filters: RAGFilter[];
  options: RAGQueryOptions;
  metadata: RAGQueryMetadata;
  createdAt: Date;
}

export interface RAGFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface RAGQueryOptions {
  useReranker: boolean;
  rerankerModel: string;
  maxTokens: number;
  temperature: number;
  includeMetadata: boolean;
  deduplicate: boolean;
  highlightMatches: boolean;
}

export interface RAGQueryMetadata {
  executionTime: number;
  tokensUsed: number;
  documentsRetrieved: number;
  averageRelevance: number;
}

export interface RAGResult {
  id: string;
  queryId: string;
  chunks: RAGChunk[];
  answer: string;
  confidence: number;
  sources: RAGSource[];
  reasoning: string;
  metadata: RAGResultMetadata;
  createdAt: Date;
}

export interface RAGChunk {
  id: string;
  documentId: string;
  content: string;
  score: number;
  rank: number;
  embedding: Embedding;
  metadata: Record<string, unknown>;
}

export interface RAGSource {
  documentId: string;
  title: string;
  url: string;
  score: number;
  excerpt: string;
}

export interface RAGResultMetadata {
  totalChunks: number;
  processingTime: number;
  rerankingTime: number;
  generationTime: number;
  tokensUsed: number;
}

export interface Embedding {
  id: string;
  model: EmbeddingModel;
  vector: number[];
  dimensions: number;
  text: string;
  metadata: EmbeddingMetadata;
  createdAt: Date;
}

export interface EmbeddingMetadata {
  tokenCount: number;
  processingTime: number;
  language: string;
  domain: string;
  checksum: string;
}

export interface VectorStore {
  id: string;
  name: string;
  type: VectorStoreType;
  schoolId: string;
  indexType: IndexType;
  dimensions: number;
  metric: EmbeddingDistance;
  documentCount: number;
  vectorCount: number;
  config: VectorStoreConfig;
  metadata: VectorStoreMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VectorStoreConfig {
  efConstruction: number;
  maxM: number;
  efSearch: number;
  nProbe: number;
  nList: number;
  nBits: number;
  buckets: number;
  replicates: number;
}

export interface VectorStoreMetadata {
  sizeBytes: number;
  indexSize: number;
  avgQueryTime: number;
  lastOptimized: Date;
  version: string;
}

export interface SemanticSearch {
  id: string;
  schoolId: string;
  query: string;
  mode: SemanticSearchMode;
  filters: SearchFilter[];
  results: SearchResult[];
  totalResults: number;
  metadata: SemanticSearchMetadata;
  createdAt: Date;
}

export interface SearchFilter {
  field: string;
  type: string;
  value: unknown;
  operator: string;
}

export interface SearchResult {
  id: string;
  documentId: string;
  title: string;
  content: string;
  score: number;
  rank: number;
  highlights: SearchHighlight[];
  metadata: Record<string, unknown>;
}

export interface SearchHighlight {
  field: string;
  fragment: string;
  score: number;
}

export interface SemanticSearchMetadata {
  executionTime: number;
  indexUsed: string;
  filtersApplied: number;
  facets: SearchFacet[];
}

export interface SearchFacet {
  name: string;
  values: SearchFacetValue[];
}

export interface SearchFacetValue {
  value: string;
  count: number;
}

export interface ContextualReasoning {
  id: string;
  schoolId: string;
  type: ReasoningType;
  scope: SemanticReasoningScope;
  input: string;
  context: ContextWindow;
  knowledgeGraph: string;
  steps: ReasoningStep[];
  conclusion: string;
  confidence: number;
  metadata: ContextualReasoningMetadata;
  createdAt: Date;
}

export interface ReasoningStep {
  id: string;
  order: number;
  type: string;
  input: string;
  output: string;
  confidence: number;
  evidence: string[];
  knowledgeNodes: string[];
}

export interface ContextualReasoningMetadata {
  totalSteps: number;
  executionTime: number;
  knowledgeUsed: number;
  nodesAccessed: number;
  edgesTraversed: number;
}

export interface MemoryIndex {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  fields: IndexField[];
  statistics: MemoryIndexStatistics;
  config: MemoryIndexConfig;
  metadata: MemoryIndexMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndexField {
  name: string;
  type: string;
  indexed: boolean;
  unique: boolean;
  weight: number;
}

export interface MemoryIndexStatistics {
  totalEntries: number;
  averageSize: number;
  indexSize: number;
  fragmentation: number;
  hitRate: number;
}

export interface MemoryIndexConfig {
  refreshInterval: number;
  maxEntries: number;
  evictionPolicy: MemoryRefreshStrategy;
  compressionType: MemoryCompressionType;
  cacheEnabled: boolean;
}

export interface MemoryIndexMetadata {
  lastRebuilt: Date;
  rebuildCount: number;
  version: string;
  checksum: string;
}

export interface KnowledgeMetrics {
  id: string;
  schoolId: string;
  graphId: string;
  metricType: KnowledgeGraphMetricType;
  value: number;
  trend: number;
  period: string;
  breakdown: MetricBreakdown[];
  metadata: KnowledgeMetricsMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricBreakdown {
  category: string;
  value: number;
  percentage: number;
}

export interface KnowledgeMetricsMetadata {
  unit: string;
  source: string;
  confidence: number;
  comparisonPeriod: string;
  benchmark: number;
}

export interface KnowledgeGraphTraversal {
  id: string;
  graphId: string;
  algorithm: GraphTraversal;
  startNodeId: string;
  endNodeId: string | null;
  maxDepth: number;
  path: string[];
  distance: number;
  metadata: KnowledgeGraphTraversalMetadata;
  createdAt: Date;
}

export interface KnowledgeGraphTraversalMetadata {
  nodesVisited: number;
  edgesTraversed: number;
  executionTime: number;
  pathFound: boolean;
  alternatives: number;
}

export interface KnowledgeGraphUpdate {
  id: string;
  graphId: string;
  mode: KnowledgeGraphUpdateMode;
  nodesAdded: number;
  nodesUpdated: number;
  nodesDeleted: number;
  edgesAdded: number;
  edgesUpdated: number;
  edgesDeleted: number;
  batchId: string;
  metadata: KnowledgeGraphUpdateMetadata;
  createdAt: Date;
}

export interface KnowledgeGraphUpdateMetadata {
  source: string;
  author: string;
  reason: string;
  validationRequired: boolean;
  rollbackAvailable: boolean;
}

export interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
  preRelease: string | null;
  build: string | null;
}

export interface KnowledgeSchema {
  id: string;
  name: string;
  version: SemanticVersion;
  nodeTypes: KnowledgeNodeType[];
  edgeTypes: KnowledgeEdgeType[];
  constraints: SchemaConstraint[];
  metadata: KnowledgeSchemaMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchemaConstraint {
  type: string;
  name: string;
  description: string;
  expression: string;
  severity: string;
}

export interface KnowledgeSchemaMetadata {
  author: string;
  domain: string;
  language: string;
  compatible: boolean;
  deprecated: boolean;
}

export interface EmbeddingCluster {
  id: string;
  schoolId: string;
  centroid: number[];
  members: string[];
  size: number;
  coherence: number;
  label: string;
  metadata: EmbeddingClusterMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmbeddingClusterMetadata {
  algorithm: string;
  iterations: number;
  convergence: number;
  silhouetteScore: number;
  daviesBouldinIndex: number;
}

export interface KnowledgeGraphExport {
  id: string;
  graphId: string;
  format: string;
  compression: string;
  sizeBytes: number;
  nodeCount: number;
  edgeCount: number;
  url: string;
  expiresAt: Date;
  metadata: KnowledgeGraphExportMetadata;
  createdAt: Date;
}

export interface KnowledgeGraphExportMetadata {
  includeEmbeddings: boolean;
  includeMetadata: boolean;
  anonymized: boolean;
  encrypted: boolean;
  checksum: string;
}

export interface SemanticRetrievalResult {
  id: string;
  query: string;
  mode: RetrievalMode;
  chunks: RetrievalChunk[];
  totalChunks: number;
  relevanceScore: number;
  metadata: SemanticRetrievalMetadata;
  createdAt: Date;
}

export interface RetrievalChunk {
  id: string;
  content: string;
  source: string;
  score: number;
  position: number;
  context: string;
  embedding: Embedding;
}

export interface SemanticRetrievalMetadata {
  executionTime: number;
  indexUsed: string;
  filtersApplied: number;
  reranked: boolean;
  deduplicated: boolean;
}

export interface KnowledgeGraphAnalytics {
  id: string;
  graphId: string;
  schoolId: string;
  totalNodes: number;
  totalEdges: number;
  avgDegree: number;
  density: number;
  clustering: number;
  diameter: number;
  components: number;
  communities: CommunityInfo[];
  metadata: KnowledgeGraphAnalyticsMetadata;
  createdAt: Date;
}

export interface CommunityInfo {
  id: string;
  name: string;
  size: number;
  density: number;
  centrality: number;
}

export interface KnowledgeGraphAnalyticsMetadata {
  analysisType: string;
  algorithm: string;
  executionTime: number;
  accuracy: number;
}

export interface MemoryConsolidation {
  id: string;
  schoolId: string;
  sourceMemoryType: MemoryType;
  targetMemoryType: MemoryType;
  entriesConsolidated: number;
  strategy: string;
  compressionRatio: number;
  metadata: MemoryConsolidationMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface MemoryConsolidationMetadata {
  algorithm: string;
  duration: number;
  entriesProcessed: number;
  entriesDropped: number;
  qualityScore: number;
}

export interface PolicyKnowledgeBase {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  policies: PolicyKBEntry[];
  totalPolicies: number;
  complianceRate: number;
  metadata: PolicyKnowledgeBaseMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface PolicyKnowledgeBaseMetadata {
  lastAudit: Date;
  nextAudit: Date;
  auditor: string;
  version: string;
  language: string;
}

export interface BestPracticesEngine {
  id: string;
  schoolId: string;
  name: string;
  category: BestPracticeCategory;
  practices: BestPractice[];
  totalPractices: number;
  averageRating: number;
  adoptionRate: number;
  metadata: BestPracticesEngineMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface BestPracticesEngineMetadata {
  lastUpdated: Date;
  contributors: string[];
  validationStatus: string;
  version: string;
}

export interface KnowledgeGraphSync {
  id: string;
  graphId: string;
  mode: KnowledgeSyncMode;
  source: string;
  status: string;
  entriesProcessed: number;
  entriesAdded: number;
  entriesUpdated: number;
  entriesDeleted: number;
  errors: SyncError[];
  metadata: KnowledgeGraphSyncMetadata;
  startedAt: Date;
  completedAt: Date | null;
}

export interface SyncError {
  entryId: string;
  error: string;
  timestamp: Date;
  retryCount: number;
}

export interface KnowledgeGraphSyncMetadata {
  trigger: string;
  batchSize: number;
  parallelism: number;
  checksum: string;
}

export interface MemoryRetrievalStrategy {
  id: string;
  name: string;
  type: string;
  algorithm: string;
  parameters: Record<string, unknown>;
  performance: RetrievalPerformance;
  metadata: MemoryRetrievalStrategyMetadata;
}

export interface RetrievalPerformance {
  precision: number;
  recall: number;
  f1Score: number;
  latency: number;
  throughput: number;
}

export interface MemoryRetrievalStrategyMetadata {
  version: string;
  author: string;
  lastBenchmark: Date;
  benchmarkScore: number;
}

export interface KnowledgeGraphValidation {
  id: string;
  graphId: string;
  rules: ValidationRule[];
  results: ValidationResult[];
  passed: boolean;
  score: number;
  metadata: KnowledgeGraphValidationMetadata;
  createdAt: Date;
}

export interface ValidationRule {
  id: string;
  name: string;
  type: string;
  expression: string;
  severity: string;
}

export interface ValidationResult {
  ruleId: string;
  passed: boolean;
  violations: ValidationViolation[];
}

export interface ValidationViolation {
  nodeId: string;
  edgeId: string;
  message: string;
  severity: string;
}

export interface KnowledgeGraphValidationMetadata {
  totalRules: number;
  passedRules: number;
  failedRules: number;
  executionTime: number;
}

export interface ContextEngineConfig {
  id: string;
  schoolId: string;
  windowType: ContextWindowType;
  windowSize: number;
  overlapSize: number;
  refreshStrategy: string;
  compressionEnabled: boolean;
  maxTokens: number;
  embeddingModel: EmbeddingModel;
  metadata: ContextEngineConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContextEngineConfigMetadata {
  version: string;
  author: string;
  lastTested: Date;
  testScore: number;
}

export interface SemanticSearchConfig {
  id: string;
  schoolId: string;
  vectorStoreType: VectorStoreType;
  embeddingModel: EmbeddingModel;
  distanceMetric: EmbeddingDistance;
  indexType: IndexType;
  defaultTopK: number;
  defaultThreshold: number;
  rerankerEnabled: boolean;
  metadata: SemanticSearchConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface SemanticSearchConfigMetadata {
  version: string;
  author: string;
  lastOptimized: Date;
  optimizationScore: number;
}

export interface KnowledgeGraphBackup {
  id: string;
  graphId: string;
  type: string;
  format: string;
  sizeBytes: number;
  checksum: string;
  url: string;
  expiresAt: Date;
  metadata: KnowledgeGraphBackupMetadata;
  createdAt: Date;
}

export interface KnowledgeGraphBackupMetadata {
  compression: string;
  encrypted: boolean;
  incremental: boolean;
  baseBackupId: string | null;
  retentionDays: number;
}

export interface MemoryEvictionPolicy {
  id: string;
  name: string;
  strategy: MemoryRefreshStrategy;
  maxEntries: number;
  ttlSeconds: number;
  priorityWeights: Record<string, number>;
  metadata: MemoryEvictionPolicyMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoryEvictionPolicyMetadata {
  version: string;
  author: string;
  effectiveness: number;
  lastTuned: Date;
}

export interface KnowledgeGraphCluster {
  id: string;
  graphId: string;
  algorithm: string;
  clusters: ClusterInfo[];
  silhouetteScore: number;
  modularity: number;
  metadata: KnowledgeGraphClusterMetadata;
  createdAt: Date;
}

export interface ClusterInfo {
  id: string;
  label: string;
  nodeIds: string[];
  size: number;
  density: number;
  cohesion: number;
}

export interface KnowledgeGraphClusterMetadata {
  iterations: number;
  convergence: number;
  executionTime: number;
}

export interface RAGPipeline {
  id: string;
  schoolId: string;
  name: string;
  strategy: RAGStrategy;
  retrievalMode: RetrievalMode;
  embeddingModel: EmbeddingModel;
  vectorStoreType: VectorStoreType;
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  threshold: number;
  steps: RAGPipelineStep[];
  metadata: RAGPipelineMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface RAGPipelineStep {
  order: number;
  type: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface RAGPipelineMetadata {
  version: string;
  author: string;
  lastRun: Date;
  averageLatency: number;
  successRate: number;
}

export interface KnowledgeGraphRecommendation {
  id: string;
  graphId: string;
  type: string;
  sourceNodeId: string;
  targetNodeId: string;
  confidence: number;
  reason: string;
  metadata: KnowledgeGraphRecommendationMetadata;
  createdAt: Date;
}

export interface KnowledgeGraphRecommendationMetadata {
  algorithm: string;
  features: string[];
  feedback: string;
  accepted: boolean;
}

export interface MemoryDecayModel {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  halfLife: number;
  decayFunction: string;
  parameters: Record<string, unknown>;
  metadata: MemoryDecayModelMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoryDecayModelMetadata {
  accuracy: number;
  lastCalibrated: Date;
  calibrationData: string;
}

export interface KnowledgeGraphImpactAnalysis {
  id: string;
  graphId: string;
  affectedNodes: string[];
  affectedEdges: string[];
  impactScore: number;
  cascadingEffects: CascadingEffect[];
  recommendations: string[];
  metadata: KnowledgeGraphImpactAnalysisMetadata;
  createdAt: Date;
}

export interface CascadingEffect {
  nodeId: string;
  impactType: string;
  severity: number;
  probability: number;
}

export interface KnowledgeGraphImpactAnalysisMetadata {
  analysisType: string;
  depth: number;
  executionTime: number;
}

export enum KnowledgeEncoding {
  ONE_HOT = "ONE_HOT",
  BAG_OF_WORDS = "BAG_OF_WORDS",
  TF_IDF = "TF_IDF",
  WORD2VEC = "WORD2VEC",
  GLOVE = "GLOVE",
  FASTTEXT = "FASTTEXT",
  BERT = "BERT",
  ROBERTA = "ROBERTA",
  XLNET = "XLNET",
  ELECTRA = "ELECTRA"
}

export enum MemoryStorageType {
  RELATIONAL = "RELATIONAL",
  DOCUMENT = "DOCUMENT",
  GRAPH = "GRAPH",
  KEY_VALUE = "KEY_VALUE",
  TIME_SERIES = "TIME_SERIES",
  COLUMNAR = "COLUMNAR",
  OBJECT = "OBJECT",
  FILE = "FILE",
  CACHE = "CACHE",
  HYBRID = "HYBRID"
}

export enum SemanticSimilarityMetric {
  COSINE = "COSINE",
  EUCLIDEAN = "EUCLIDEAN",
  MANHATTAN = "MANHATTAN",
  DOT_PRODUCT = "DOT_PRODUCT",
  JACCARD = "JACCARD",
  PEARSON = "PEARSON",
  SPEARMAN = "SPEARMAN",
  KENDALL = "KENDALL",
  HAMMING = "HAMMING",
  LEVENSHTEIN = "LEVENSHTEIN"
}

export enum KnowledgeGraphQueryType {
  SHORTEST_PATH = "SHORTEST_PATH",
  ALL_PATHS = "ALL_PATHS",
  NEIGHBORS = "NEIGHBORS",
  SUBGRAPH = "SUBGRAPH",
  PATTERN_MATCH = "PATTERN_MATCH",
  AGGREGATION = "AGGREGATION",
  FILTER = "FILTER",
  SORT = "SORT",
  LIMIT = "LIMIT",
  UNWIND = "UNWIND"
}

export enum MemoryLifecycleStage {
  CREATION = "CREATION",
  ENCODING = "ENCODING",
  STORAGE = "STORAGE",
  RETRIEVAL = "RETRIEVAL",
  CONSOLIDATION = "CONSOLIDATION",
  DECAY = "DECAY",
  ARCHIVAL = "ARCHIVAL",
  DELETION = "DELETION"
}

export enum ContextualRelevance {
  HIGHLY_RELEVANT = "HIGHLY_RELEVANT",
  RELEVANT = "RELEVANT",
  PARTIALLY_RELEVANT = "PARTIALLY_RELEVANT",
  MARGINALLY_RELEVANT = "MARGINALLY_RELEVANT",
  NOT_RELEVANT = "NOT_RELEVANT"
}

export enum KnowledgeGraphUpdateFrequency {
  REAL_TIME = "REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ON_DEMAND = "ON_DEMAND",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  BATCH = "BATCH"
}

export enum EmbeddingDimension {
  DIM_128 = "128",
  DIM_256 = "256",
  DIM_384 = "384",
  DIM_512 = "512",
  DIM_768 = "768",
  DIM_1024 = "1024",
  DIM_1536 = "1536",
  DIM_2048 = "2048",
  DIM_3072 = "3072",
  DIM_4096 = "4096"
}

export enum RAGChunkStrategy {
  FIXED_SIZE = "FIXED_SIZE",
  SENTENCE = "SENTENCE",
  PARAGRAPH = "PARAGRAPH",
  SEMANTIC = "SEMANTIC",
  RECURSIVE = "RECURSIVE",
  DOCUMENT_LEVEL = "DOCUMENT_LEVEL",
  SLIDING_WINDOW = "SLIDING_WINDOW",
  OVERLAP = "OVERLAP",
  CUSTOM = "CUSTOM"
}

export enum KnowledgeGraphExportFormat {
  JSON = "JSON",
  RDF = "RDF",
  OWL = "OWL",
  CSV = "CSV",
  GRAPHML = "GRAPHML",
  DOT = "DOT",
  GEXF = "GEXF",
  GML = "GML",
  N3 = "N3",
  TURTLE = "TURTLE"
}

export enum SemanticDisambiguationMethod {
  CONTEXT = "CONTEXT",
  POPULARITY = "POPULARITY",
  RECENCY = "RECENCY",
  AUTHORITY = "AUTHORITY",
  SIMILARITY = "SIMILARITY",
  ENSEMBLE = "ENSEMBLE",
  RULE_BASED = "RULE_BASED",
  LEARNED = "LEARNED",
  HYBRID = "HYBRID",
  USER_FEEDBACK = "USER_FEEDBACK"
}

export enum KnowledgeGraphCommunity {
  EDUCATION = "EDUCATION",
  SCIENCE = "SCIENCE",
  TECHNOLOGY = "TECHNOLOGY",
  ARTS = "ARTS",
  BUSINESS = "BUSINESS",
  HEALTH = "HEALTH",
  LAW = "LAW",
  ENGINEERING = "ENGINEERING",
  MATHEMATICS = "MATHEMATICS",
  HUMANITIES = "HUMANITIES"
}

export enum MemoryAccessPattern {
  SEQUENTIAL = "SEQUENTIAL",
  RANDOM = "RANDOM",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  FREQUENCY = "FREQUENCY",
  RECENCY = "RECENCY",
  IMPORTANCE = "IMPORTANCE",
  CONTEXTUAL = "CONTEXTUAL",
  BATCH = "BATCH",
  STREAM = "STREAM"
}

export enum KnowledgeGraphInferenceType {
  RULE_BASED = "RULE_BASED",
  STATISTICAL = "STATISTICAL",
  NEURAL = "NEURAL",
  HYBRID = "HYBRID",
  ONTOLOGICAL = "ONTOLOGICAL",
  PROBABILISTIC = "PROBABILISTIC",
  FUZZY = "FUZZY",
  TEMPORAL = "TEMPORAL",
  SPATIAL = "SPATIAL",
  CAUSAL = "CAUSAL"
}

export enum SemanticRoleLabeling {
  AGENT = "AGENT",
  PATIENT = "PATIENT",
  INSTRUMENT = "INSTRUMENT",
  EXPERIENCER = "EXPERIENCER",
  THEME = "THEME",
  SOURCE = "SOURCE",
  GOAL = "GOAL",
  LOCATION = "LOCATION",
  TIME = "TIME",
  MANNER = "MANNER"
}

export interface KnowledgeGraphInference {
  id: string;
  graphId: string;
  type: KnowledgeGraphInferenceType;
  input: string;
  output: string;
  confidence: number;
  rules: InferenceRule[];
  metadata: KnowledgeGraphInferenceMetadata;
  createdAt: Date;
}

export interface InferenceRule {
  id: string;
  name: string;
  pattern: string;
  conclusion: string;
  confidence: number;
}

export interface KnowledgeGraphInferenceMetadata {
  totalRules: number;
  executionTime: number;
  factsInferred: number;
  accuracy: number;
}

export interface SemanticEmbeddingIndex {
  id: string;
  schoolId: string;
  model: EmbeddingModel;
  dimensions: EmbeddingDimension;
  totalVectors: number;
  indexType: IndexType;
  stats: EmbeddingIndexStats;
  metadata: SemanticEmbeddingIndexMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmbeddingIndexStats {
  totalVectors: number;
  avgQueryTime: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface SemanticEmbeddingIndexMetadata {
  lastOptimized: Date;
  version: string;
  buildTime: number;
}

export interface KnowledgeGraphVersion {
  id: string;
  graphId: string;
  version: string;
  changes: GraphVersionChange[];
  snapshot: string;
  metadata: KnowledgeGraphVersionMetadata;
  createdAt: Date;
}

export interface GraphVersionChange {
  type: string;
  nodeId: string | null;
  edgeId: string | null;
  description: string;
}

export interface KnowledgeGraphVersionMetadata {
  author: string;
  reason: string;
  sizeChange: number;
}

export interface MemorySearchIndex {
  id: string;
  schoolId: string;
  name: string;
  fields: SearchIndexField[];
  stats: SearchIndexStats;
  config: SearchIndexConfig;
  metadata: MemorySearchIndexMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchIndexField {
  name: string;
  type: string;
  indexed: boolean;
  weight: number;
}

export interface SearchIndexStats {
  totalEntries: number;
  avgQueryTime: number;
  indexSize: number;
}

export interface SearchIndexConfig {
  analyzer: string;
  tokenizer: string;
  stemmer: string;
  stopWords: string[];
}

export interface MemorySearchIndexMetadata {
  lastRebuilt: Date;
  version: string;
}

export interface SemanticRelationGraph {
  id: string;
  schoolId: string;
  concepts: SemanticConcept[];
  relations: SemanticRelationEntry[];
  clusters: SemanticCluster[];
  metadata: SemanticRelationGraphMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface SemanticConcept {
  id: string;
  name: string;
  definition: string;
  frequency: number;
  importance: number;
}

export interface SemanticCluster {
  id: string;
  label: string;
  concepts: string[];
  coherence: number;
}

export interface SemanticRelationGraphMetadata {
  totalConcepts: number;
  totalRelations: number;
  density: number;
}

export interface KnowledgeGraphAnalyticsDashboard {
  id: string;
  schoolId: string;
  graphId: string;
  charts: KnowledgeGraphChart[];
  kpis: KnowledgeGraphKPI[];
  alerts: KnowledgeGraphAlert[];
  metadata: KnowledgeGraphAnalyticsDashboardMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeGraphChart {
  id: string;
  type: string;
  title: string;
  data: unknown;
}

export interface KnowledgeGraphKPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
}

export interface KnowledgeGraphAlert {
  id: string;
  type: string;
  severity: string;
  message: string;
  timestamp: Date;
}

export interface KnowledgeGraphAnalyticsDashboardMetadata {
  lastRefreshed: Date;
  dataPoints: number;
}

export interface MemoryCompressionResult {
  id: string;
  schoolId: string;
  sourceSize: number;
  compressedSize: number;
  ratio: number;
  type: MemoryCompressionType;
  entriesProcessed: number;
  metadata: MemoryCompressionResultMetadata;
  createdAt: Date;
}

export interface MemoryCompressionResultMetadata {
  algorithm: string;
  duration: number;
  qualityLoss: number;
}

export interface SemanticReasoningChain {
  id: string;
  schoolId: string;
  steps: ReasoningChainStep[];
  conclusion: string;
  confidence: number;
  metadata: SemanticReasoningChainMetadata;
  createdAt: Date;
}

export interface ReasoningChainStep {
  order: number;
  type: string;
  input: string;
  output: string;
  evidence: string[];
}

export interface SemanticReasoningChainMetadata {
  totalSteps: number;
  executionTime: number;
  knowledgeUsed: number;
}

export interface KnowledgeGraphSchemaVersion {
  id: string;
  schemaId: string;
  version: string;
  changes: SchemaVersionChange[];
  metadata: KnowledgeGraphSchemaVersionMetadata;
  createdAt: Date;
}

export interface SchemaVersionChange {
  type: string;
  element: string;
  description: string;
}

export interface KnowledgeGraphSchemaVersionMetadata {
  author: string;
  breaking: boolean;
  migrationRequired: boolean;
}

export interface MemoryDecayCurve {
  id: string;
  schoolId: string;
  memoryType: MemoryType;
  halfLife: number;
  points: DecayCurvePoint[];
  metadata: MemoryDecayCurveMetadata;
  createdAt: Date;
}

export interface DecayCurvePoint {
  time: number;
  retention: number;
}

export interface MemoryDecayCurveMetadata {
  model: string;
  rSquared: number;
  lastCalibrated: Date;
}

export interface SemanticSearchResultRanking {
  id: string;
  queryId: string;
  algorithm: string;
  results: RankedSearchResult[];
  metadata: SemanticSearchResultRankingMetadata;
  createdAt: Date;
}

export interface RankedSearchResult {
  documentId: string;
  score: number;
  rank: number;
  features: SearchRankingFeature[];
}

export interface SearchRankingFeature {
  name: string;
  value: number;
  weight: number;
}

export interface SemanticSearchResultRankingMetadata {
  totalResults: number;
  avgScore: number;
  executionTime: number;
}

export enum KnowledgeGraphNodeType {
  CONCEPT = "CONCEPT",
  ENTITY = "ENTITY",
  RELATION = "RELATION",
  EVENT = "EVENT",
  DOCUMENT = "DOCUMENT",
  PERSON = "PERSON",
  ORGANIZATION = "ORGANIZATION",
  LOCATION = "LOCATION",
  DATE = "DATE",
  NUMBER = "NUMBER"
}

export enum SemanticVectorStoreFeature {
  FILTERING = "FILTERING",
  NARROWING = "NARROWING",
  GROUPING = "GROUPING",
  AGGREGATION = "AGGREGATION",
  PAGINATION = "PAGINATION",
  SORTING = "SORTING",
  HIGHLIGHTING = "HIGHLIGHTING",
  FACETING = "FACETING",
  AUTOCOMPLETE = "AUTOCOMPLETE",
  SPELL_CHECK = "SPELL_CHECK"
}

export enum KnowledgeGraphAlgorithm {
  PAGERANK = "PAGERANK",
  BETWEENNESS = "BETWEENNESS",
  CLOSENESS = "CLOSENESS",
  DEGREE = "DEGREE",
  EIGENVECTOR = "EIGENVECTOR",
  HITS = "HITS",
  COMMUNITY_DETECTION = "COMMUNITY_DETECTION",
  LINK_PREDICTION = "LINK_PREDICTION",
  NODE_CLASSIFICATION = "NODE_CLASSIFICATION",
  GRAPH_EMBEDDING = "GRAPH_EMBEDDING"
}

export enum MemoryIndexingStrategy {
  BRUTE_FORCE = "BRUTE_FORCE",
  INVERTED_INDEX = "INVERTED_INDEX",
  KD_TREE = "KD_TREE",
  BALL_TREE = "BALL_TREE",
  LSH = "LSH",
  HNSW = "HNSW",
  IVF = "IVF",
  PQ = "PQ",
  SQ = "SQ",
  OPQ = "OPQ"
}

export enum SemanticRelationStrength {
  WEAK = "WEAK",
  MODERATE = "MODERATE",
  STRONG = "STRONG",
  VERY_STRONG = "VERY_STRONG",
  DEFINITIVE = "DEFINITIVE"
}

export enum KnowledgeGraphDataQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  CRITICAL = "CRITICAL"
}

export enum MemoryCompressionAlgorithm {
  GZIP = "GZIP",
  LZ4 = "LZ4",
  SNAPPY = "SNAPPY",
  ZSTD = "ZSTD",
  BROTLI = "BROTLI",
  DEFLATE = "DEFLATE",
  CUSTOM = "CUSTOM"
}

export enum SemanticSearchFilterType {
  KEYWORD = "KEYWORD",
  PHRASE = "PHRASE",
  REGEX = "REGEX",
  RANGE = "RANGE",
  BOOLEAN = "BOOLEAN",
  NESTED = "NESTED",
  GEOSPATIAL = "GEOSPATIAL",
  TEMPORAL = "TEMPORAL"
}

export enum KnowledgeGraphAccessLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  CLASSIFIED = "CLASSIFIED"
}

export enum MemoryReplicationStrategy {
  NONE = "NONE",
  SYNC = "SYNC",
  ASYNC = "ASYNC",
  EVENTUAL = "EVENTUAL",
  STRONG = "STRONG"
}

export enum EmbeddingFineTuneMethod {
  FULL = "FULL",
  LORA = "LORA",
  QLORA = "QLORA",
  ADAPTER = "ADAPTER",
  PROMPT_TUNING = "PROMPT_TUNING",
  PREFIX_TUNING = "PREFIX_TUNING"
}

export enum KnowledgeGraphVisualizationType {
  NODE_LINK = "NODE_LINK",
  ADJACENCY_MATRIX = "ADJACENCY_MATRIX",
  ARC_DIAGRAM = "ARC_DIAGRAM",
  CHORD_DIAGRAM = "CHORD_DIAGRAM",
  TREE_MAP = "TREE_MAP",
  SUNBURST = "SUNBURST",
  TREEMAP = "TREEMAP",
  SANKEY = "SANKEY",
  ALLUVIAL = "ALLUVIAL",
  CIRCULAR = "CIRCULAR"
}

export enum SemanticConceptSimilarity {
  IDENTICAL = "IDENTICAL",
  VERY_SIMILAR = "VERY_SIMILAR",
  SIMILAR = "SIMILAR",
  SOMEWHAT_SIMILAR = "SOMEWHAT_SIMILAR",
  DISSIMILAR = "DISSIMILAR",
  VERY_DISSIMILAR = "VERY_DISSIMILAR"
}

export enum MemoryStorageOptimization {
  NONE = "NONE",
  COMPRESSION = "COMPRESSION",
  DEDUPLICATION = "DEDUPLICATION",
  ARCHIVAL = "ARCHIVAL",
  TIERING = "TIERING"
}

export enum KnowledgeGraphEvolutionType {
  ADDITION = "ADDITION",
  MODIFICATION = "MODIFICATION",
  DELETION = "DELETION",
  MERGE = "MERGE",
  SPLIT = "SPLIT",
  REORGANIZATION = "REORGANIZATION"
}

export enum SemanticKnowledgeSource {
  MANUAL = "MANUAL",
  AUTOMATED = "AUTOMATED",
  SEMI_AUTOMATED = "SEMI_AUTOMATED",
  CROWDSOURCED = "CROWDSOURCED",
  EXTERNAL = "EXTERNAL"
}

export enum MemoryRetrievalMethod {
  KEYWORD = "KEYWORD",
  SEMANTIC = "SEMANTIC",
  HYBRID = "HYBRID",
  GRAPH_BASED = "GRAPH_BASED",
  RECOMMENDATION = "RECOMMENDATION"
}

export enum KnowledgeGraphUpdateTrigger {
  SCHEDULED = "SCHEDULED",
  EVENT = "EVENT",
  MANUAL = "MANUAL",
  THRESHOLD = "THRESHOLD",
  ANOMALY = "ANOMALY"
}

export enum SemanticConceptRelation {
  SYNONYM = "SYNONYM",
  ANTONYM = "ANTONYM",
  HYPERNYM = "HYPERNYM",
  HYPONYM = "HYPONYM",
  MERONYM = "MERONYM",
  HOLONYM = "HOLONYM"
}

export enum MemoryStorageFormat {
  JSON = "JSON",
  BINARY = "BINARY",
  COLUMNAR = "COLUMNAR",
  DOCUMENT = "DOCUMENT",
  GRAPH = "GRAPH"
}

export enum KnowledgeGraphBackupFrequency {
  REAL_TIME = "REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY"
}

export enum SemanticSearchScope {
  GLOBAL = "GLOBAL",
  DOMAIN = "DOMAIN",
  PROJECT = "PROJECT",
  PERSONAL = "PERSONAL",
  TEAM = "TEAM"
}

export enum MemoryAllocationStrategy {
  EQUAL = "EQUAL",
  PRIORITY = "PRIORITY",
  DEMAND = "DEMAND",
  BALANCED = "BALANCED"
}

export enum KnowledgeGraphPerformanceMetric {
  QUERY_TIME = "QUERY_TIME",
  UPDATE_TIME = "UPDATE_TIME",
  MEMORY_USAGE = "MEMORY_USAGE",
  DISK_USAGE = "DISK_USAGE",
  THROUGHPUT = "THROUGHPUT"
}

export enum SemanticEmbeddingQuality {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  ULTRA = "ULTRA"
}

export enum MemoryEvictionMethod {
  LRU = "LRU",
  LFU = "LFU",
  FIFO = "FIFO",
  RANDOM = "RANDOM",
  PRIORITY = "PRIORITY"
}

export enum KnowledgeGraphSchemaEvolution {
  BACKWARD = "BACKWARD",
  FORWARD = "FORWARD",
  BIDIRECTIONAL = "BIDIRECTIONAL",
  BREAKING = "BREAKING"
}

export enum SemanticKnowledgeGraphType {
  ONTOLOGY = "ONTOLOGY",
  TAXONOMY = "TAXONOMY",
  THESAURUS = "THESAURUS",
  KNOWLEDGE_BASE = "KNOWLEDGE_BASE",
  CONCEPT_MAP = "CONCEPT_MAP"
}

export enum MemoryConsistencyCheck {
  STRONG = "STRONG",
  EVENTUAL = "EVENTUAL",
  CAUSAL = "CAUSAL",
  READ_YOUR_WRITES = "READ_YOUR_WRITES"
}

export enum KnowledgeGraphQueryOptimization {
  NONE = "NONE",
  CACHING = "CACHING",
  MATERIALIZATION = "MATERIALIZATION",
  INDEXING = "INDEXING",
  PARTITIONING = "PARTITIONING"
}

export enum SemanticKnowledgeUpdateFrequency {
  REAL_TIME = "REAL_TIME",
  NEAR_REAL_TIME = "NEAR_REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  BATCH = "BATCH"
}

export enum MemoryStorageLocation {
  LOCAL = "LOCAL",
  CLOUD = "CLOUD",
  EDGE = "EDGE",
  HYBRID = "HYBRID"
}

export enum KnowledgeGraphDataValidation {
  SCHEMA = "SCHEMA",
  SEMANTIC = "SEMANTIC",
  STRUCTURAL = "STRUCTURAL",
  REFERENTIAL = "REFERENTIAL"
}

export enum SemanticSearchComplexity {
  SIMPLE = "SIMPLE",
  MODERATE = "MODERATE",
  COMPLEX = "COMPLEX",
  ADVANCED = "ADVANCED"
}

export enum MemoryIndexStatus {
  ACTIVE = "ACTIVE",
  REBUILDING = "REBUILDING",
  OPTIMIZING = "OPTIMIZING",
  CORRUPTED = "CORRUPTED"
}
