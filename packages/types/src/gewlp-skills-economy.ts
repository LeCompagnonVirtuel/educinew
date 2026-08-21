export enum SkillLevel {
  NOVICE = "NOVICE",
  BEGINNER = "BEGINNER",
  ELEMENTARY = "ELEMENTARY",
  INTERMEDIATE = "INTERMEDIATE",
  UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTERY = "MASTERY",
  SPECIALIST = "SPECIALIST",
}

export enum SkillCategory {
  TECHNICAL = "TECHNICAL",
  SOFT_SKILL = "SOFT_SKILL",
  DIGITAL = "DIGITAL",
  LANGUAGE = "LANGUAGE",
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
  VOCATIONAL = "VOCATIONAL",
  LEADERSHIP = "LEADERSHIP",
  CREATIVE = "CREATIVE",
  RESEARCH = "RESEARCH",
  ANALYTICAL = "ANALYTICAL",
  INTERPERSONAL = "INTERPERSONAL",
  DOMAIN_SPECIFIC = "DOMAIN_SPECIFIC",
  MANAGEMENT = "MANAGEMENT",
  COMMUNICATION = "COMMUNICATION",
}

export enum SkillStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DEPRECATED = "DEPRECATED",
  EMERGING = "EMERGING",
  MATURE = "MATURE",
  DECLINING = "DECLINING",
  ARCHIVED = "ARCHIVED",
  PENDING = "PENDING",
}

export enum EvidenceType {
  PORTFOLIO = "PORTFOLIO",
  PROJECT = "PROJECT",
  ASSESSMENT = "ASSESSMENT",
  CERTIFICATION = "CERTIFICATION",
  WORK_SAMPLE = "WORK_SAMPLE",
  PEER_REVIEW = "PEER_REVIEW",
  SELF_DECLARATION = "SELF_DECLARATION",
  INSTITUTIONAL = "INSTITUTIONAL",
  INDUSTRY_RECOGNITION = "INDUSTRY_RECOGNITION",
  AWARD = "AWARD",
  PUBLICATION = "PUBLICATION",
  PRESENTATION = "PRESENTATION",
}

export enum VerificationMethod {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  PEER = "PEER",
  INSTITUTIONAL = "INSTITUTIONAL",
  AI_ASSISTED = "AI_ASSISTED",
  ASSESSMENT = "ASSESSMENT",
  PORTFOLIO = "PORTFOLIO",
  OBSERVATION = "OBSERVATION",
  CROSS_REFERENCE = "CROSS_REFERENCE",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum PassportStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  UPDATED = "UPDATED",
  TRANSFERRED = "TRANSFERRED",
}

export enum GraphNodeType {
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  CERTIFICATION = "CERTIFICATION",
  JOB = "JOB",
  INDUSTRY = "INDUSTRY",
  EDUCATION = "EDUCATION",
  PERSON = "PERSON",
  ORGANIZATION = "ORGANIZATION",
  FRAMEWORK = "FRAMEWORK",
  TAXONOMY = "TAXONOMY",
}

export enum RelationshipType {
  PREREQUISITE = "PREREQUISITE",
  RELATED = "RELATED",
  SIMILAR = "SIMILAR",
  SUB_SKILL = "SUB_SKILL",
  PARENT_SKILL = "PARENT_SKILL",
  EQUIVALENT = "EQUIVALENT",
  CONFLICTING = "CONFLICTING",
  COMPLEMENTARY = "COMPLEMENTARY",
  TRANSFERABLE = "TRANSFERABLE",
  DERIVED_FROM = "DERIVED_FROM",
  ALTERNATIVE_TO = "ALTERNATIVE_TO",
  ENHANCES = "ENHANCES",
}

export enum EquivalenceType {
  EXACT = "EXACT",
  EQUIVALENT = "EQUIVALENT",
  PARTIAL = "PARTIAL",
  APPROXIMATE = "APPROXIMATE",
  NOT_EQUIVALENT = "NOT_EQUIVALENT",
  FUNCTIONAL = "FUNCTIONAL",
  CONTEXTUAL = "CONTEXTUAL",
}

export enum DemandLevel {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  CRITICAL = "CRITICAL",
  DECLINING = "DECLINING",
  STABLE = "STABLE",
}

export enum SupplyLevel {
  SURPLUS = "SURPLUS",
  ADEQUATE = "ADEQUATE",
  BALANCED = "BALANCED",
  SHORTAGE = "SHORTAGE",
  CRITICAL_SHORTAGE = "CRITICAL_SHORTAGE",
}

export enum TrendType {
  GROWING = "GROWING",
  DECLINING = "DECLINING",
  STABLE = "STABLE",
  EMERGING = "EMERGING",
  PEAKING = "PEAKING",
  PLATEAUING = "PLATEAUING",
  VOLATILE = "VOLATILE",
  SEASONAL = "SEASONAL",
}

export enum GapSeverity {
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SIGNIFICANT = "SIGNIFICANT",
  CRITICAL = "CRITICAL",
  BLOCKING = "BLOCKING",
}

export enum ValidationMethod {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  AI_ASSISTED = "AI_ASSISTED",
  PEER_REVIEW = "PEER_REVIEW",
  EXPERT_PANEL = "EXPERT_PANEL",
  INSTITUTIONAL = "INSTITUTIONAL",
  INDUSTRY = "INDUSTRY",
}

export enum MatchingAlgorithm {
  EXACT_MATCH = "EXACT_MATCH",
  FUZZY_MATCH = "FUZZY_MATCH",
  SEMANTIC_MATCH = "SEMANTIC_MATCH",
  CONTEXTUAL_MATCH = "CONTEXTUAL_MATCH",
  BEHAVIORAL_MATCH = "BEHAVIORAL_MATCH",
  HYBRID = "HYBRID",
  NEURAL = "NEURAL",
}

export enum TaxonomyStatus {
  ACTIVE = "ACTIVE",
  DEPRECATED = "DEPRECATED",
  UNDER_REVISION = "UNDER_REVISION",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}

export enum OntologyVersion {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
  PRE_RELEASE = "PRE_RELEASE",
}

export enum SkillTransferability {
  FULLY_TRANSFERABLE = "FULLY_TRANSFERABLE",
  PARTIALLY_TRANSFERABLE = "PARTIALLY_TRANSFERABLE",
  CONTEXT_DEPENDENT = "CONTEXT_DEPENDENT",
  NON_TRANSFERABLE = "NON_TRANSFERABLE",
  UNIVERSALLY_TRANSFERABLE = "UNIVERSALLY_TRANSFERABLE",
}

export enum VerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  DISPUTED = "DISPUTED",
}

export enum SkillSource {
  CURRICULUM = "CURRICULUM",
  ASSESSMENT = "ASSESSMENT",
  SELF_DECLARED = "SELF_DECLARED",
  PEER_VALIDATED = "PEER_VALIDATED",
  INSTITUTIONAL = "INSTITUTIONAL",
  INDUSTRY = "INDUSTRY",
  AI_INFERRED = "AI_INFERRED",
  MARKET_DATA = "MARKET_DATA",
}

export enum SkillFramework {
  ESCO = "ESCO",
  O_NET = "O_NET",
  SOC = "SOC",
  ISCO = "ISCO",
  NQF = "NQF",
  EQF = "EQF",
  CUSTOM = "CUSTOM",
}

export enum SkillRelationType {
  PREREQUISITE = "PREREQUISITE",
  RELATED = "RELATED",
  SIMILAR = "SIMILAR",
  SUB_SKILL = "SUB_SKILL",
  PARENT_SKILL = "PARENT_SKILL",
  EQUIVALENT = "EQUIVALENT",
  CONFLICTING = "CONFLICTING",
  COMPLEMENTARY = "COMPLEMENTARY",
  TRANSFERABLE = "TRANSFERABLE",
  DERIVED_FROM = "DERIVED_FROM",
}

export enum SkillDemandTrend {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  EMERGING = "EMERGING",
  DECLINING = "DECLINING",
  PEAKING = "PEAKING",
}

export enum SkillSupplyTrend {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  SURPLUS = "SURPLUS",
  SHORTAGE = "SHORTAGE",
}

export enum EmergingSkillCategory {
  AI_ML = "AI_ML",
  BLOCKCHAIN = "BLOCKCHAIN",
  CYBERSECURITY = "CYBERSECURITY",
  CLOUD_COMPUTING = "CLOUD_COMPUTING",
  DATA_SCIENCE = "DATA_SCIENCE",
  QUANTUM_COMPUTING = "QUANTUM_COMPUTING",
  BIOTECH = "BIOTECH",
  CLEAN_ENERGY = "CLEAN_ENERGY",
  ROBOTICS = "ROBOTICS",
  IoT = "IoT",
}

export enum DecliningSkillCategory {
  LEGACY_TECHNOLOGY = "LEGACY_TECHNOLOGY",
  MANUAL_PROCESS = "MANUAL_PROCESS",
  OBSOLETE_FRAMEWORK = "OBSOLETE_FRAMEWORK",
  DEPRECATED_LANGUAGE = "DEPRECATED_LANGUAGE",
  OUTDATED_METHODOLOGY = "OUTDATED_METHODOLOGY",
}

export enum SkillGapPriority {
  IMMEDIATE = "IMMEDIATE",
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
  STRATEGIC = "STRATEGIC",
}

export enum SkillAssessmentType {
  SELF = "SELF",
  PEER = "PEER",
  AI = "AI",
  FORMAL = "FORMAL",
  INFORMAL = "INFORMAL",
  OBSERVATION = "OBSERVATION",
  PORTFOLIO = "PORTFOLIO",
}

export enum SkillValidationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXPIRED = "EXPIRED",
}

export enum SkillMatchingStatus {
  NO_MATCH = "NO_MATCH",
  PARTIAL_MATCH = "PARTIAL_MATCH",
  GOOD_MATCH = "GOOD_MATCH",
  EXCELLENT_MATCH = "EXCELLENT_MATCH",
  PERFECT_MATCH = "PERFECT_MATCH",
}

export enum SkillConfigType {
  REGISTRY = "REGISTRY",
  TAXONOMY = "TAXONOMY",
  ONTOLOGY = "ONTOLOGY",
  GRAPH = "GRAPH",
  MATCHING = "MATCHING",
  TRANSFER = "TRANSFER",
  DEMAND = "DEMAND",
  SUPPLY = "SUPPLY",
}

export enum SkillMetricType {
  DEMAND = "DEMAND",
  SUPPLY = "SUPPLY",
  GAP = "GAP",
  TRANSFER = "TRANSFER",
  VERIFICATION = "VERIFICATION",
  ADOPTION = "ADOPTION",
  SALARY = "SALARY",
  GROWTH = "GROWTH",
}

export enum SkillTransferContext {
  INDUSTRY = "INDUSTRY",
  GEOGRAPHY = "GEOGRAPHY",
  ROLE = "ROLE",
  EDUCATION = "EDUCATION",
  ORGANIZATION = "ORGANIZATION",
  PROJECT = "PROJECT",
}

export enum SkillEquivalenceScope {
  FUNCTIONAL = "FUNCTIONAL",
  CONTEXTUAL = "CONTEXTUAL",
  UNIVERSAL = "UNIVERSAL",
  INDUSTRY = "INDUSTRY",
  ORGANIZATIONAL = "ORGANIZATIONAL",
}

export enum SkillValidationScope {
  INDIVIDUAL = "INDIVIDUAL",
  ORGANIZATION = "ORGANIZATION",
  INDUSTRY = "INDUSTRY",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum SkillMatchWeight {
  EQUAL = "EQUAL",
  SKILL_FOCUSED = "SKILL_FOCUSED",
  EXPERIENCE_FOCUSED = "EXPERIENCE_FOCUSED",
  EDUCATION_FOCUSED = "EDUCATION_FOCUSED",
  CERTIFICATION_FOCUSED = "CERTIFICATION_FOCUSED",
}

export enum SkillGapAnalysisScope {
  INDIVIDUAL = "INDIVIDUAL",
  TEAM = "TEAM",
  ORGANIZATION = "ORGANIZATION",
  INDUSTRY = "INDUSTRY",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
}

export enum SkillRegistryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  UNDER_REVIEW = "UNDER_REVIEW",
  DEPRECATED = "DEPRECATED",
  ARCHIVED = "ARCHIVED",
}

export enum SkillOntologyStatus {
  ACTIVE = "ACTIVE",
  UNDER_DEVELOPMENT = "UNDER_DEVELOPMENT",
  DEPRECATED = "DEPRECATED",
  ARCHIVED = "ARCHIVED",
}

export enum SkillGraphStatus {
  ACTIVE = "ACTIVE",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  ARCHIVED = "ARCHIVED",
}

export enum SkillPassportVerificationLevel {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  ENHANCED = "ENHANCED",
  PREMIUM = "PREMIUM",
}

export enum SkillEvidenceWeight {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum SkillCertificationStatus {
  VALID = "VALID",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum SkillMarketIndication {
  BOOMING = "BOOMING",
  GROWING = "GROWING",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
  NICHE = "NICHE",
  SATURATED = "SATURATED",
}

export enum SkillVersionStatus {
  CURRENT = "CURRENT",
  PREVIOUS = "PREVIOUS",
  DEPRECATED = "DEPRECATED",
  DRAFT = "DRAFT",
  BETA = "BETA",
}

export enum SkillCategoryMapping {
  ONE_TO_ONE = "ONE_TO_ONE",
  ONE_TO_MANY = "ONE_TO_MANY",
  MANY_TO_ONE = "MANY_TO_ONE",
  MANY_TO_MANY = "MANY_TO_MANY",
}

export enum SkillIndustryRelevance {
  UNIVERSAL = "UNIVERSAL",
  HIGHLY_RELEVANT = "HIGHLY_RELEVANT",
  MODERATELY_RELEVANT = "MODERATELY_RELEVANT",
  LOW = "LOW",
  NOT_RELEVANT = "NOT_RELEVANT",
}

export enum SkillVerificationTrustLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum SkillDemandForecast {
  VERY_PESSIMISTIC = "VERY_PESSIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  NEUTRAL = "NEUTRAL",
  OPTIMISTIC = "OPTIMISTIC",
  VERY_OPTIMISTIC = "VERY_OPTIMISTIC",
}

export enum SkillSupplyForecast {
  SURPLUS_GROWING = "SURPLUS_GROWING",
  SURPLUS_STABLE = "SURPLUS_STABLE",
  BALANCED = "BALANCED",
  SHORTAGE_GROWING = "SHORTAGE_GROWING",
  CRITICAL_SHORTAGE = "CRITICAL_SHORTAGE",
}

export enum SkillGapMitigation {
  TRAINING = "TRAINING",
  HIRING = "HIRING",
  OUTSOURCING = "OUTSOURCING",
  AUTOMATION = "AUTOMATION",
  PARTNERSHIP = "PARTNERSHIP",
  INTERNAL_MOBILITY = "INTERNAL_MOBILITY",
}

export enum SkillMatchingWeight {
  EQUAL = "EQUAL",
  WEIGHTED = "WEIGHTED",
  CUSTOM = "CUSTOM",
  ADAPTIVE = "ADAPTIVE",
}

export enum SkillTransferDirection {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  DIAGONAL = "DIAGONAL",
  CROSS_FUNCTIONAL = "CROSS_FUNCTIONAL",
}

export enum SkillVersioningStrategy {
  SEMANTIC = "SEMANTIC",
  TIMESTAMP = "TIMESTAMP",
  SEQUENTIAL = "SEQUENTIAL",
  MAJOR_MINOR = "MAJOR_MINOR",
}

export enum SkillRegistryAuthority {
  GOVERNMENT = "GOVERNMENT",
  INDUSTRY = "INDUSTRY",
  ACADEMIC = "ACADEMIC",
  INTERNATIONAL = "INTERNATIONAL",
  PRIVATE = "PRIVATE",
}

export enum SkillOntologyFramework {
  OWL = "OWL",
  RDF = "RDF",
  SKOS = "SKOS",
  CUSTOM = "CUSTOM",
}

export enum SkillGraphNodeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DEPRECATED = "DEPRECATED",
}

export enum SkillRelationshipWeight {
  STRONG = "STRONG",
  MODERATE = "MODERATE",
  WEAK = "WEAK",
}

export enum SkillEquivalenceConfidence {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum SkillTransferabilityScope {
  UNIVERSAL = "UNIVERSAL",
  INDUSTRY = "INDUSTRY",
  ROLE = "ROLE",
  GEOGRAPHIC = "GEOGRAPHIC",
}

export enum SkillDemandRegion {
  GLOBAL = "GLOBAL",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  LOCAL = "LOCAL",
}

export enum SkillSupplySource {
  EDUCATIONAL = "EDUCATIONAL",
  CORPORATE = "CORPORATE",
  SELF_LEARNED = "SELF_LEARNED",
  GOVERNMENT = "GOVERNMENT",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum SkillEmergenceIndicator {
  PUBLICATIONS = "PUBLICATIONS",
  JOB_POSTINGS = "JOB_POSTINGS",
  TRAINING_PROGRAMS = "TRAINING_PROGRAMS",
  CONFERENCES = "CONFERENCES",
  FUNDING = "FUNDING",
  ADOPTION = "ADOPTION",
}

export enum SkillDeclineIndicator {
  REDUCED_POSTINGS = "REDUCED_POSTINGS",
  LEGACY_MAINTENANCE = "LEGACY_MAINTENANCE",
  RETRAINING_PROGRAMS = "RETRAINING_PROGRAMS",
  INDUSTRY_SHIFT = "INDUSTRY_SHIFT",
}

export enum SkillGapTimeframe {
  IMMEDIATE = "IMMEDIATE",
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum SkillValidationEvidence {
  DOCUMENTARY = "DOCUMENTARY",
  PRACTICAL = "PRACTICAL",
  TESTIMONIAL = "TESTIMONIAL",
  ANALYTICAL = "ANALYTICAL",
}

export enum SkillMatchConfidence {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum SkillMatchingModel {
  RULE_BASED = "RULE_BASED",
  ML_BASED = "ML_BASED",
  HYBRID = "HYBRID",
  SEMANTIC = "SEMANTIC",
}

export enum SkillGraphTraversal {
  BFS = "BFS",
  DFS = "DFS",
  SHORTEST_PATH = "SHORTEST_PATH",
  WEIGHTED = "WEIGHTED",
}

export enum SkillOntologyRelation {
  SUBCLASS_OF = "SUBCLASS_OF",
  EQUIVALENT_TO = "EQUIVALENT_TO",
  OVERLAPS_WITH = "OVERLAPS_WITH",
  DISJOINT_FROM = "DISJOINT_FROM",
  RELATED_TO = "RELATED_TO",
}

export enum SkillVersionCompatibility {
  BACKWARD = "BACKWARD",
  FORWARD = "FORWARD",
  FULL = "FULL",
  NONE = "NONE",
}

export enum SkillRegistryAccess {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  PRIVATE = "PRIVATE",
}

export enum SkillEvidenceStatus {
  VALID = "VALID",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
}

export enum SkillCertificationIssuer {
  UNIVERSITY = "UNIVERSITY",
  INDUSTRY_BODY = "INDUSTRY_BODY",
  GOVERNMENT = "GOVERNMENT",
  PRIVATE_PROVIDER = "PRIVATE_PROVIDER",
  ONLINE_PLATFORM = "ONLINE_PLATFORM",
}

export enum SkillMarketSegment {
  ENTRY_LEVEL = "ENTRY_LEVEL",
  MID_LEVEL = "MID_LEVEL",
  SENIOR_LEVEL = "SENIOR_LEVEL",
  EXECUTIVE = "EXECUTIVE",
  SPECIALIST = "SPECIALIST",
}

export enum SkillVersionChangeType {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
  BREAKING = "BREAKING",
  DEPRECATION = "DEPRECATION",
}

export enum SkillCategoryHierarchy {
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  LEVEL_4 = "LEVEL_4",
}

export enum SkillIndustrySector {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MANUFACTURING = "MANUFACTURING",
  ENERGY = "ENERGY",
  TRANSPORT = "TRANSPORT",
  AGRICULTURE = "AGRICULTURE",
  GOVERNMENT = "GOVERNMENT",
  RETAIL = "RETAIL",
}

export enum SkillVerificationProvider {
  INSTITUTION = "INSTITUTION",
  INDUSTRY_BODY = "INDUSTRY_BODY",
  GOVERNMENT = "GOVERNMENT",
  AI_PLATFORM = "AI_PLATFORM",
  PEER_NETWORK = "PEER_NETWORK",
}

export enum SkillGapStakeholder {
  INDIVIDUAL = "INDIVIDUAL",
  EMPLOYER = "EMPLOYER",
  EDUCATOR = "EDUCATOR",
  GOVERNMENT = "GOVERNMENT",
  INDUSTRY = "INDUSTRY",
}

export enum SkillMatchingOutcome {
  HIRED = "HIRED",
  INTERVIEW = "INTERVIEW",
  SHORTLISTED = "SHORTLISTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export enum SkillTransferOutcome {
  SUCCESSFUL = "SUCCESSFUL",
  PARTIAL = "PARTIAL",
  UNSUCCESSFUL = "UNSUCCESSFUL",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum SkillValidationOutcome {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CONDITIONAL = "CONDITIONAL",
  PENDING = "PENDING",
}

export enum SkillDemandSource {
  JOB_BOARDS = "JOB_BOARDS",
  EMPLOYER_SURVEYS = "EMPLOYER_SURVEYS",
  GOVERNMENT_DATA = "GOVERNMENT_DATA",
  INDUSTRY_REPORTS = "INDUSTRY_REPORTS",
  AI_ANALYSIS = "AI_ANALYSIS",
}

export enum SkillSupplySourceRegional {
  LOCAL_UNIVERSITIES = "LOCAL_UNIVERSITIES",
  LOCAL_TRAINING = "LOCAL_TRAINING",
  IMMIGRATION = "IMMIGRATION",
  REMOTE_WORKERS = "REMOTE_WORKERS",
  OUTSOURCING = "OUTSOURCING",
}

export enum SkillEmergencePhase {
  INCEPTION = "INCEPTION",
  GROWTH = "GROWTH",
  MATURITY = "MATURITY",
  DECLINE = "DECLINE",
}

export enum SkillDeclinePhase {
  EARLY = "EARLY",
  MIDDLE = "MIDDLE",
  ADVANCED = "ADVANCED",
  OBSOLETE = "OBSOLETE",
}

export enum SkillGapMetric {
  ABSOLUTE = "ABSOLUTE",
  PERCENTAGE = "PERCENTAGE",
  INDEX = "INDEX",
  RATIO = "RATIO",
}

export enum SkillValidationStandard {
  ISO = "ISO",
  NATIONAL = "NATIONAL",
  INDUSTRY = "INDUSTRY",
  ORGANIZATIONAL = "ORGANIZATIONAL",
}

export enum SkillMatchAlgorithm {
  COSINE_SIMILARITY = "COSINE_SIMILARITY",
  JACCARD = "JACCARD",
  LEVENSHTEIN = "LEVENSHTEIN",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  ENSEMBLE = "ENSEMBLE",
}

export enum SkillGraphEdgeType {
  DIRECTED = "DIRECTED",
  UNDIRECTED = "UNDIRECTED",
  WEIGHTED = "WEIGHTED",
  LABELED = "LABELED",
}

export enum SkillOntologyStatus2 {
  ACTIVE = "ACTIVE",
  UNDER_REVISION = "UNDER_REVISION",
  DEPRECATED = "DEPRECATED",
}

export enum SkillVersioningFormat {
  SEMANTIC = "SEMANTIC",
  TIMESTAMP = "TIMESTAMP",
  SEQUENTIAL = "SEQUENTIAL",
}

export enum SkillRegistryScope {
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  INDUSTRY = "INDUSTRY",
  ORGANIZATION = "ORGANIZATION",
}

export enum SkillEvidenceFormat {
  PDF = "PDF",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  LINK = "LINK",
  TEXT = "TEXT",
}

export enum SkillCertificationLevel {
  FOUNDATION = "FOUNDATION",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export enum SkillMarketPhase {
  INTRODUCTION = "INTRODUCTION",
  GROWTH = "GROWTH",
  MATURITY = "MATURITY",
  DECLINE = "DECLINE",
}

export enum SkillVersioningScope {
  INDIVIDUAL = "INDIVIDUAL",
  ORGANIZATION = "ORGANIZATION",
  INDUSTRY = "INDUSTRY",
  GLOBAL = "GLOBAL",
}

export enum SkillRegistryFormat {
  JSON = "JSON",
  XML = "XML",
  RDF = "RDF",
  CSV = "CSV",
}

export enum SkillCategoryCount {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE",
  HIERARCHICAL = "HIERARCHICAL",
  FLAT = "FLAT",
}

export enum SkillDemandVisualization {
  CHART = "CHART",
  HEATMAP = "HEATMAP",
  MAP = "MAP",
  TIMELINE = "TIMELINE",
}

export enum SkillSupplyVisualization {
  CHART = "CHART",
  HEATMAP = "HEATMAP",
  MAP = "MAP",
  TIMELINE = "TIMELINE",
}

export enum SkillGapVisualization {
  CHART = "CHART",
  HEATMAP = "HEATMAP",
  MATRIX = "MATRIX",
  TIMELINE = "TIMELINE",
}

export enum SkillMatchingVisualization {
  MATRIX = "MATRIX",
  GRAPH = "GRAPH",
  LIST = "LIST",
  CHART = "CHART",
}

export enum SkillTransferVisualization {
  FLOW = "FLOW",
  GRAPH = "GRAPH",
  MATRIX = "MATRIX",
  CHART = "CHART",
}

export enum SkillValidationVisualization {
  DASHBOARD = "DASHBOARD",
  REPORT = "REPORT",
  CHART = "CHART",
  MATRIX = "MATRIX",
}

export enum SkillEmergenceVisualization {
  TIMELINE = "TIMELINE",
  HEATMAP = "HEATMAP",
  MAP = "MAP",
  CHART = "CHART",
}

export enum SkillDeclineVisualization {
  TIMELINE = "TIMELINE",
  HEATMAP = "HEATMAP",
  MAP = "MAP",
  CHART = "CHART",
}

export interface SkillRegistryEntry {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  level: SkillLevel;
  status: SkillStatus;
  source: SkillSource;
  framework: SkillFramework;
  version: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillRegistryMetadata;
  tags: string[];
  aliases: string[];
  industryRelevance: SkillIndustryRelevance;
  marketIndication: SkillMarketIndication;
}

export interface SkillRegistryMetadata {
  totalEntries: number;
  activeEntries: number;
  deprecatedEntries: number;
  lastUpdated: string;
  sources: string[];
  frameworks: string[];
}

export interface SkillTaxonomy {
  id: string;
  name: string;
  description: string;
  version: string;
  status: TaxonomyStatus;
  framework: SkillFramework;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  rootCategories: SkillTaxonomyCategory[];
  totalCategories: number;
  totalSkills: number;
  metadata: SkillTaxonomyMetadata;
}

export interface SkillTaxonomyCategory {
  id: string;
  name: string;
  description: string;
  level: number;
  parentId: string | null;
  children: SkillTaxonomyCategory[];
  skillCount: number;
  status: SkillStatus;
}

export interface SkillTaxonomyMetadata {
  version: string;
  author: string;
  lastUpdated: string;
  totalCategories: number;
  totalSkills: number;
}

export interface SkillOntology {
  id: string;
  name: string;
  description: string;
  version: string;
  status: SkillOntologyStatus;
  framework: SkillOntologyFramework;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  classes: SkillOntologyClass[];
  relationships: SkillOntologyRelationship[];
  metadata: SkillOntologyMetadata;
}

export interface SkillOntologyClass {
  id: string;
  name: string;
  description: string;
  parentClass: string | null;
  properties: SkillOntologyProperty[];
  instances: number;
}

export interface SkillOntologyProperty {
  name: string;
  type: string;
  description: string;
  domain: string;
  range: string;
}

export interface SkillOntologyRelationship {
  id: string;
  sourceClass: string;
  targetClass: string;
  type: SkillOntologyRelation;
  weight: number;
  description: string;
}

export interface SkillOntologyMetadata {
  totalClasses: number;
  totalRelationships: number;
  totalProperties: number;
  lastUpdated: string;
}

export interface SkillVersion {
  id: string;
  skillId: string;
  version: string;
  status: SkillVersionStatus;
  changeType: SkillVersionChangeType;
  compatibility: SkillVersionCompatibility;
  description: string;
  changes: SkillVersionChange[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  releasedAt: string;
  deprecatedAt: string | null;
  metadata: SkillVersionMetadata;
}

export interface SkillVersionChange {
  type: SkillVersionChangeType;
  description: string;
  impact: string;
  breaking: boolean;
}

export interface SkillVersionMetadata {
  totalVersions: number;
  currentVersion: string;
  lastUpdated: string;
  contributors: string[];
}

export interface SkillCategoryEntry {
  id: string;
  name: string;
  description: string;
  hierarchy: SkillCategoryHierarchy;
  level: number;
  parentId: string | null;
  children: SkillCategoryEntry[];
  skillCount: number;
  status: SkillStatus;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillCategoryMetadata;
}

export interface SkillCategoryMetadata {
  totalSkills: number;
  averageLevel: number;
  growthRate: number;
  lastUpdated: string;
}

export interface SkillLevelEntry {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  order: number;
  competencies: SkillLevelCompetency[];
  assessmentCriteria: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillLevelCompetency {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  indicators: string[];
}

export interface SkillEvidenceEntry {
  id: string;
  skillId: string;
  personId: string;
  type: EvidenceType;
  status: SkillEvidenceStatus;
  title: string;
  description: string;
  url: string | null;
  fileUrl: string | null;
  weight: SkillEvidenceWeight;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  verifiedAt: string | null;
  expiresAt: string | null;
  metadata: SkillEvidenceMetadata;
}

export interface SkillEvidenceMetadata {
  format: string;
  size: number;
  checksum: string;
  verificationProvider: string;
}

export interface SkillVerificationEntry {
  id: string;
  skillId: string;
  personId: string;
  method: VerificationMethod;
  status: VerificationStatus;
  trustLevel: SkillVerificationTrustLevel;
  verifierId: string;
  verifierName: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  verifiedAt: string | null;
  expiresAt: string | null;
  evidence: SkillEvidenceEntry[];
  metadata: SkillVerificationMetadata;
}

export interface SkillVerificationMetadata {
  totalVerifications: number;
  averageTrustLevel: number;
  lastUpdated: string;
}

export interface SkillPassportEntry {
  id: string;
  personId: string;
  status: PassportStatus;
  verificationLevel: SkillPassportVerificationLevel;
  skills: SkillPassportSkill[];
  certifications: SkillPassportCertification[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  expiresAt: string | null;
  metadata: SkillPassportMetadata;
}

export interface SkillPassportSkill {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  verified: boolean;
  evidence: SkillEvidenceEntry[];
  lastVerified: string;
}

export interface SkillPassportCertification {
  certificationId: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  status: SkillCertificationStatus;
}

export interface SkillPassportMetadata {
  totalSkills: number;
  totalCertifications: number;
  verificationScore: number;
  lastUpdated: string;
}

export interface SkillGraphEntry {
  id: string;
  name: string;
  description: string;
  status: SkillGraphStatus;
  nodes: SkillGraphNode[];
  edges: SkillGraphEdge[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillGraphMetadata;
}

export interface SkillGraphNode {
  id: string;
  type: GraphNodeType;
  name: string;
  description: string;
  status: SkillGraphNodeStatus;
  attributes: Record<string, unknown>;
  position: SkillGraphPosition;
}

export interface SkillGraphPosition {
  x: number;
  y: number;
  z: number;
}

export interface SkillGraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  weight: number;
  directed: boolean;
  label: string;
  attributes: Record<string, unknown>;
}

export interface SkillGraphMetadata {
  totalNodes: number;
  totalEdges: number;
  density: number;
  lastUpdated: string;
}

export interface SkillRelationshipEntry {
  id: string;
  sourceSkillId: string;
  targetSkillId: string;
  type: SkillRelationType;
  weight: number;
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillRelationshipMetadata;
}

export interface SkillRelationshipMetadata {
  strength: SkillRelationshipWeight;
  confidence: number;
  lastUpdated: string;
}

export interface SkillEquivalenceEntry {
  id: string;
  sourceSkillId: string;
  targetSkillId: string;
  type: EquivalenceType;
  scope: SkillEquivalenceScope;
  confidence: SkillEquivalenceConfidence;
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillEquivalenceMetadata;
}

export interface SkillEquivalenceMetadata {
  evidenceCount: number;
  lastVerified: string;
  verificationMethod: string;
}

export interface SkillTransferabilityEntry {
  id: string;
  skillId: string;
  transferability: SkillTransferability;
  direction: SkillTransferDirection;
  contexts: SkillTransferContext[];
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillTransferabilityMetadata;
}

export interface SkillTransferabilityMetadata {
  successRate: number;
  totalTransfers: number;
  averageAdaptationTime: string;
}

export interface SkillDemandEntry {
  id: string;
  skillId: string;
  level: SkillLevel;
  demandLevel: DemandLevel;
  trend: SkillDemandTrend;
  forecast: SkillDemandForecast;
  region: SkillDemandRegion;
  industry: SkillIndustrySector;
  salaryImpact: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillDemandMetadata;
}

export interface SkillDemandMetadata {
  totalJobPostings: number;
  averageSalary: number;
  growthRate: number;
  lastUpdated: string;
}

export interface SkillSupplyEntry {
  id: string;
  skillId: string;
  level: SkillLevel;
  supplyLevel: SupplyLevel;
  trend: SkillSupplyTrend;
  forecast: SkillSupplyForecast;
  region: SkillDemandRegion;
  source: SkillSupplySource;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillSupplyMetadata;
}

export interface SkillSupplyMetadata {
  totalAvailable: number;
  averageExperience: number;
  growthRate: number;
  lastUpdated: string;
}

export interface EmergingSkillEntry {
  id: string;
  skillId: string;
  category: EmergingSkillCategory;
  phase: SkillEmergencePhase;
  indicators: SkillEmergenceIndicator[];
  adoptionRate: number;
  growthRate: number;
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: EmergingSkillMetadata;
}

export interface EmergingSkillMetadata {
  totalEmerging: number;
  averageAdoptionRate: number;
  lastUpdated: string;
}

export interface DecliningSkillEntry {
  id: string;
  skillId: string;
  category: DecliningSkillCategory;
  phase: SkillDeclinePhase;
  indicators: SkillDeclineIndicator[];
  declineRate: number;
 替代Skills: string[];
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: DecliningSkillMetadata;
}

export interface DecliningSkillMetadata {
  totalDeclining: number;
  averageDeclineRate: number;
  lastUpdated: string;
}

export interface SkillGapEntry {
  id: string;
  skillId: string;
  level: SkillLevel;
  severity: GapSeverity;
  priority: SkillGapPriority;
  timeframe: SkillGapTimeframe;
  mitigation: SkillGapMitigation[];
  stakeholders: SkillGapStakeholder[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillGapMetadata;
}

export interface SkillGapMetadata {
  totalGaps: number;
  averageSeverity: number;
  estimatedCost: number;
  lastUpdated: string;
}

export interface SkillGapAnalysisEntry {
  id: string;
  name: string;
  description: string;
  scope: SkillGapAnalysisScope;
  status: SkillGapValidationStatus;
  gaps: SkillGapEntry[];
  recommendations: SkillGapRecommendation[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillGapAnalysisMetadata;
}

export interface SkillGapRecommendation {
  id: string;
  gapId: string;
  type: SkillGapMitigation;
  description: string;
  priority: SkillGapPriority;
  estimatedImpact: number;
  estimatedCost: number;
  timeframe: string;
}

export interface SkillGapAnalysisMetadata {
  totalAnalyses: number;
  averageGapSeverity: number;
  lastUpdated: string;
}

export interface SkillValidationEntry {
  id: string;
  skillId: string;
  method: ValidationMethod;
  status: SkillValidationStatus;
  scope: SkillValidationScope;
  evidence: SkillValidationEvidence[];
  validatorId: string;
  validatorName: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  validatedAt: string | null;
  expiresAt: string | null;
  metadata: SkillValidationMetadata;
}

export interface SkillValidationMetadata {
  totalValidations: number;
  averageConfidence: number;
  lastUpdated: string;
}

export interface AISkillMatchEntry {
  id: string;
  personId: string;
  skillId: string;
  matchScore: number;
  confidence: SkillMatchConfidence;
  algorithm: SkillMatchingAlgorithm;
  model: SkillMatchingModel;
  weight: SkillMatchingWeight;
  status: SkillMatchingStatus;
  outcome: SkillMatchingOutcome;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: AISkillMatchMetadata;
}

export interface AISkillMatchMetadata {
  totalMatches: number;
  averageScore: number;
  lastUpdated: string;
}

export interface SkillConfigEntry {
  id: string;
  name: string;
  description: string;
  type: SkillConfigType;
  settings: Record<string, unknown>;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillMetricsEntry {
  id: string;
  name: string;
  description: string;
  type: SkillMetricType;
  value: number;
  unit: string;
  period: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillMetricsMetadata;
}

export interface SkillMetricsMetadata {
  totalMetrics: number;
  lastUpdated: string;
  trends: string[];
}

export interface SkillRegistry {
  id: string;
  name: string;
  description: string;
  authority: SkillRegistryAuthority;
  scope: SkillRegistryScope;
  format: SkillRegistryFormat;
  status: SkillRegistryStatus;
  access: SkillRegistryAccess;
  entries: SkillRegistryEntry[];
  totalEntries: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillRegistryMetadata;
}

export interface SkillTaxonomyEntry {
  id: string;
  name: string;
  description: string;
  taxonomy: SkillTaxonomy;
  categories: SkillTaxonomyCategory[];
  totalCategories: number;
  totalSkills: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillOntologyEntry {
  id: string;
  name: string;
  description: string;
  ontology: SkillOntology;
  classes: SkillOntologyClass[];
  relationships: SkillOntologyRelationship[];
  totalClasses: number;
  totalRelationships: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillVersionEntry {
  id: string;
  name: string;
  description: string;
  version: SkillVersion;
  skillId: string;
  versionNumber: string;
  status: SkillVersionStatus;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillGraphEntryExtended {
  id: string;
  name: string;
  description: string;
  graph: SkillGraphEntry;
  traversal: SkillGraphTraversal;
  nodes: SkillGraphNode[];
  edges: SkillGraphEdge[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillRelationshipEntryExtended {
  id: string;
  name: string;
  description: string;
  relationship: SkillRelationshipEntry;
  weight: SkillRelationshipWeight;
  confidence: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillEquivalenceEntryExtended {
  id: string;
  name: string;
  description: string;
  equivalence: SkillEquivalenceEntry;
  confidence: SkillEquivalenceConfidence;
  evidenceCount: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillTransferabilityEntryExtended {
  id: string;
  name: string;
  description: string;
  transferability: SkillTransferabilityEntry;
  successRate: number;
  totalTransfers: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillDemandEntryExtended {
  id: string;
  name: string;
  description: string;
  demand: SkillDemandEntry;
  totalJobPostings: number;
  averageSalary: number;
  growthRate: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillSupplyEntryExtended {
  id: string;
  name: string;
  description: string;
  supply: SkillSupplyEntry;
  totalAvailable: number;
  averageExperience: number;
  growthRate: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmergingSkillEntryExtended {
  id: string;
  name: string;
  description: string;
  emerging: EmergingSkillEntry;
  adoptionRate: number;
  growthRate: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DecliningSkillEntryExtended {
  id: string;
  name: string;
  description: string;
  declining: DecliningSkillEntry;
  declineRate: number;
  replacementSkills: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillGapEntryExtended {
  id: string;
  name: string;
  description: string;
  gap: SkillGapEntry;
  severity: GapSeverity;
  priority: SkillGapPriority;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillGapAnalysisEntryExtended {
  id: string;
  name: string;
  description: string;
  analysis: SkillGapAnalysisEntry;
  scope: SkillGapAnalysisScope;
  totalGaps: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillValidationEntryExtended {
  id: string;
  name: string;
  description: string;
  validation: SkillValidationEntry;
  confidence: number;
  evidenceCount: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AISkillMatchEntryExtended {
  id: string;
  name: string;
  description: string;
  match: AISkillMatchEntry;
  matchScore: number;
  confidence: SkillMatchConfidence;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillConfigEntryExtended {
  id: string;
  name: string;
  description: string;
  config: SkillConfigEntry;
  settings: Record<string, unknown>;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillMetricsEntryExtended {
  id: string;
  name: string;
  description: string;
  metrics: SkillMetricsEntry;
  value: number;
  unit: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillRegistryConfig {
  enabledFeatures: string[];
  defaultFramework: SkillFramework;
  defaultTaxonomy: string;
  autoVerification: boolean;
  aiMatchingEnabled: boolean;
  graphVisualization: boolean;
  demandTracking: boolean;
  supplyTracking: boolean;
  gapAnalysis: boolean;
  transferAnalysis: boolean;
}

export interface SkillRegistryMetrics {
  totalSkills: number;
  activeSkills: number;
  deprecatedSkills: number;
  totalVerifications: number;
  averageMatchScore: number;
  totalGapAnalyses: number;
  totalTransferAnalyses: number;
  lastUpdated: string;
}

export interface SkillDemandMetrics {
  totalDemand: number;
  averageDemandLevel: number;
  demandGrowthRate: number;
  topDemandedSkills: string[];
  lastUpdated: string;
}

export interface SkillSupplyMetrics {
  totalSupply: number;
  averageSupplyLevel: number;
  supplyGrowthRate: number;
  topSuppliedSkills: string[];
  lastUpdated: string;
}

export interface SkillGapMetrics {
  totalGaps: number;
  averageSeverity: number;
  criticalGaps: number;
  mitigationProgress: number;
  lastUpdated: string;
}

export interface SkillTransferMetrics {
  totalTransfers: number;
  successRate: number;
  averageAdaptationTime: string;
  topTransferableSkills: string[];
  lastUpdated: string;
}

export interface SkillMatchingMetrics {
  totalMatches: number;
  averageScore: number;
  matchSuccessRate: number;
  algorithmPerformance: Record<string, number>;
  lastUpdated: string;
}

export interface SkillValidationMetrics {
  totalValidations: number;
  averageConfidence: number;
  validationSuccessRate: number;
  lastUpdated: string;
}

export interface SkillEmergenceMetrics {
  totalEmerging: number;
  averageAdoptionRate: number;
  topEmergingCategories: string[];
  lastUpdated: string;
}

export interface SkillDeclineMetrics {
  totalDeclining: number;
  averageDeclineRate: number;
  topDecliningCategories: string[];
  lastUpdated: string;
}

export interface SkillRegistryDashboard {
  registry: SkillRegistry;
  metrics: SkillRegistryMetrics;
  demandMetrics: SkillDemandMetrics;
  supplyMetrics: SkillSupplyMetrics;
  gapMetrics: SkillGapMetrics;
  transferMetrics: SkillTransferMetrics;
  matchingMetrics: SkillMatchingMetrics;
  validationMetrics: SkillValidationMetrics;
  emergenceMetrics: SkillEmergenceMetrics;
  declineMetrics: SkillDeclineMetrics;
  lastUpdated: string;
}

export interface SkillTaxonomyTree {
  id: string;
  rootNodes: SkillTaxonomyCategory[];
  depth: number;
  breadth: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillOntologyMapping {
  id: string;
  sourceOntology: string;
  targetOntology: string;
  mappings: SkillOntologyMapEntry[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillOntologyMapEntry {
  sourceClass: string;
  targetClass: string;
  equivalence: EquivalenceType;
  confidence: number;
}

export interface SkillVersionChangelog {
  versionId: string;
  entries: SkillVersionChangelogEntry[];
  totalChanges: number;
}

export interface SkillVersionChangelogEntry {
  changeType: SkillVersionChangeType;
  description: string;
  impact: string;
  date: string;
}

export interface SkillCategoryTree {
  id: string;
  rootCategories: SkillCategoryEntry[];
  depth: number;
  totalCategories: number;
  totalSkills: number;
  schoolId: string;
}

export interface SkillLevelProgression {
  currentLevel: SkillLevel;
  nextLevel: SkillLevel;
  requirements: string[];
  estimatedDuration: string;
  competencies: SkillLevelCompetency[];
}

export interface SkillEvidenceBundle {
  id: string;
  skillId: string;
  personId: string;
  evidenceItems: SkillEvidenceEntry[];
  totalWeight: number;
  verified: boolean;
  schoolId: string;
}

export interface SkillVerificationChain {
  id: string;
  skillId: string;
  verifications: SkillVerificationEntry[];
  trustScore: number;
  chainValid: boolean;
  schoolId: string;
}

export interface SkillPassportSummary {
  passportId: string;
  personId: string;
  totalSkills: number;
  verifiedSkills: number;
  totalCertifications: number;
  verificationScore: number;
  lastUpdated: string;
}

export interface SkillGraphMetrics {
  graphId: string;
  nodeCount: number;
  edgeCount: number;
  density: number;
  averageDegree: number;
  clusteringCoefficient: number;
  centrality: Record<string, number>;
  schoolId: string;
}

export interface SkillGraphPath {
  sourceNodeId: string;
  targetNodeId: string;
  path: string[];
  distance: number;
  weight: number;
}

export interface SkillGraphCommunity {
  id: string;
  name: string;
  nodes: string[];
  internalEdges: number;
  externalEdges: number;
  modularity: number;
}

export interface SkillRelationshipCluster {
  id: string;
  name: string;
  skills: string[];
  relationshipTypes: RelationshipType[];
  averageWeight: number;
  schoolId: string;
}

export interface SkillEquivalenceCluster {
  id: string;
  name: string;
  skills: string[];
  equivalenceType: EquivalenceType;
  averageConfidence: number;
  schoolId: string;
}

export interface SkillTransferabilityMatrix {
  id: string;
  sourceSkills: string[];
  targetSkills: string[];
  matrix: number[][];
  schoolId: string;
}

export interface SkillDemandForecastEntry {
  id: string;
  skillId: string;
  currentDemand: DemandLevel;
  predictedDemand: DemandLevel;
  timeframe: string;
  confidence: number;
  factors: string[];
  schoolId: string;
}

export interface SkillSupplyForecastEntry {
  id: string;
  skillId: string;
  currentSupply: SupplyLevel;
  predictedSupply: SupplyLevel;
  timeframe: string;
  confidence: number;
  factors: string[];
  schoolId: string;
}

export interface EmergingSkillTrend {
  skillId: string;
  trend: TrendType;
  adoptionCurve: number[];
  growthRate: number;
  predictedPeak: string;
  schoolId: string;
}

export interface DecliningSkillTrend {
  skillId: string;
  trend: TrendType;
  declineRate: number;
  predictedObsolescence: string;
  replacementSkills: string[];
  schoolId: string;
}

export interface SkillGapReport {
  id: string;
  name: string;
  scope: SkillGapAnalysisScope;
  generatedAt: string;
  executiveSummary: string;
  gaps: SkillGapEntry[];
  recommendations: SkillGapRecommendation[];
  totalGaps: number;
  criticalGaps: number;
  schoolId: string;
}

export interface SkillGapTrend {
  skillId: string;
  historicalGap: number[];
  currentGap: number;
  predictedGap: number;
  trend: TrendType;
  schoolId: string;
}

export interface SkillValidationReport {
  id: string;
  skillId: string;
  validations: SkillValidationEntry[];
  overallScore: number;
  confidence: SkillMatchConfidence;
  generatedAt: string;
  schoolId: string;
}

export interface SkillMatchingProfile {
  personId: string;
  skills: string[];
  levels: Record<string, SkillLevel>;
  matchScores: Record<string, number>;
  recommendations: string[];
  schoolId: string;
}

export interface SkillMarketOverview {
  id: string;
  totalSkills: number;
  activeSkills: number;
  emergingSkills: number;
  decliningSkills: number;
  averageDemand: number;
  averageSupply: number;
  schoolId: string;
  generatedAt: string;
}

export interface SkillIndustryMapping {
  id: string;
  industry: SkillIndustrySector;
  skills: SkillIndustrySkillEntry[];
  averageDemand: number;
  averageSalary: number;
  schoolId: string;
}

export interface SkillIndustrySkillEntry {
  skillId: string;
  skillName: string;
  demand: DemandLevel;
  supply: SupplyLevel;
  relevance: SkillIndustryRelevance;
}

export interface SkillRegionMapping {
  id: string;
  region: SkillDemandRegion;
  skills: SkillRegionSkillEntry[];
  averageDemand: number;
  averageSupply: number;
  schoolId: string;
}

export interface SkillRegionSkillEntry {
  skillId: string;
  skillName: string;
  demand: DemandLevel;
  supply: SupplyLevel;
  salaryImpact: number;
}

export interface SkillPersonProfile {
  personId: string;
  skills: SkillPersonSkillEntry[];
  totalSkills: number;
  verifiedSkills: number;
  averageLevel: SkillLevel;
  schoolId: string;
}

export interface SkillPersonSkillEntry {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  verified: boolean;
  lastUsed: string;
  evidenceCount: number;
}

export interface SkillOrganizationProfile {
  organizationId: string;
  requiredSkills: SkillOrgSkillEntry[];
  availableSkills: SkillOrgSkillEntry[];
  gaps: SkillGapEntry[];
  schoolId: string;
}

export interface SkillOrgSkillEntry {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  count: number;
}

export interface SkillCertificationMapping {
  id: string;
  certificationId: string;
  skills: string[];
  equivalence: EquivalenceType;
  issuer: string;
  schoolId: string;
}

export interface SkillJobMapping {
  id: string;
  jobId: string;
  requiredSkills: SkillJobSkillEntry[];
  preferredSkills: SkillJobSkillEntry[];
  averageMatch: number;
  schoolId: string;
}

export interface SkillJobSkillEntry {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  required: boolean;
}

export interface SkillEducationMapping {
  id: string;
  educationId: string;
  skills: string[];
  level: SkillLevel;
  institution: string;
  schoolId: string;
}

export interface SkillExperienceMapping {
  id: string;
  personId: string;
  experienceId: string;
  skills: string[];
  level: SkillLevel;
  yearsOfExperience: number;
  schoolId: string;
}

export interface SkillCompetencyMapping {
  id: string;
  competencyId: string;
  skills: string[];
  level: SkillLevel;
  framework: SkillFramework;
  schoolId: string;
}

export interface SkillFrameworkMapping {
  id: string;
  framework: SkillFramework;
  skills: SkillFrameworkSkillEntry[];
  version: string;
  schoolId: string;
}

export interface SkillFrameworkSkillEntry {
  frameworkSkillId: string;
  skillId: string;
  equivalence: EquivalenceType;
  confidence: number;
}

export interface SkillTaxonomyMapping {
  id: string;
  taxonomyId: string;
  skills: SkillTaxonomySkillEntry[];
  totalMapped: number;
  schoolId: string;
}

export interface SkillTaxonomySkillEntry {
  taxonomyNodeId: string;
  skillId: string;
  position: string[];
}

export interface SkillOntologyConcept {
  id: string;
  name: string;
  description: string;
  relationships: SkillOntologyRelationship[];
  instances: number;
}

export interface SkillOntologyInstance {
  id: string;
  conceptId: string;
  name: string;
  properties: Record<string, unknown>;
}

export interface SkillGraphVisualization {
  id: string;
  graphId: string;
  layout: string;
  nodes: SkillGraphVisualizationNode[];
  edges: SkillGraphVisualizationEdge[];
  schoolId: string;
}

export interface SkillGraphVisualizationNode {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  label: string;
}

export interface SkillGraphVisualizationEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  color: string;
}

export interface SkillDemandHeatmap {
  id: string;
  region: SkillDemandRegion;
  industry: SkillIndustrySector;
  data: SkillDemandHeatmapCell[];
  schoolId: string;
}

export interface SkillDemandHeatmapCell {
  skillId: string;
  demand: number;
  growth: number;
}

export interface SkillSupplyHeatmap {
  id: string;
  region: SkillDemandRegion;
  data: SkillSupplyHeatmapCell[];
  schoolId: string;
}

export interface SkillSupplyHeatmapCell {
  skillId: string;
  supply: number;
  availability: number;
}

export interface SkillGapHeatmap {
  id: string;
  scope: SkillGapAnalysisScope;
  data: SkillGapHeatmapCell[];
  schoolId: string;
}

export interface SkillGapHeatmapCell {
  skillId: string;
  gap: number;
  severity: GapSeverity;
}

export interface SkillMatchingResult {
  id: string;
  personId: string;
  targetId: string;
  targetType: string;
  overallScore: number;
  skillScores: SkillMatchingScoreEntry[];
  recommendations: string[];
  schoolId: string;
}

export interface SkillMatchingScoreEntry {
  skillId: string;
  score: number;
  matched: boolean;
  gap: number;
}

export interface SkillTransferResult {
  id: string;
  personId: string;
  sourceSkillId: string;
  targetSkillId: string;
  transferability: SkillTransferability;
  estimatedTime: string;
  successProbability: number;
  schoolId: string;
}

export interface SkillValidationResult {
  id: string;
  skillId: string;
  personId: string;
  score: number;
  confidence: SkillMatchConfidence;
  evidence: SkillEvidenceEntry[];
  valid: boolean;
  schoolId: string;
}

export interface SkillEmergenceReport {
  id: string;
  period: string;
  emergingSkills: EmergingSkillEntry[];
  totalEmerging: number;
  averageGrowthRate: number;
  topIndustries: SkillIndustrySector[];
  schoolId: string;
}

export interface SkillDeclineReport {
  id: string;
  period: string;
  decliningSkills: DecliningSkillEntry[];
  totalDeclining: number;
  averageDeclineRate: number;
  topAffectedIndustries: SkillIndustrySector[];
  schoolId: string;
}

export interface SkillRegistryAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillTaxonomyAuditLog {
  id: string;
  action: string;
  categoryId: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillGraphAuditLog {
  id: string;
  action: string;
  nodeId: string | null;
  edgeId: string | null;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillVersionAuditLog {
  id: string;
  versionId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillVerificationAuditLog {
  id: string;
  verificationId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillPassportAuditLog {
  id: string;
  passportId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillMatchingAuditLog {
  id: string;
  matchId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillGapAuditLog {
  id: string;
  gapId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillTransferAuditLog {
  id: string;
  transferId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillDemandAuditLog {
  id: string;
  demandId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillSupplyAuditLog {
  id: string;
  supplyId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  personId: string;
  read: boolean;
  schoolId: string;
  createdAt: string;
}

export interface SkillAlert {
  id: string;
  type: string;
  severity: GapSeverity;
  title: string;
  message: string;
  skillId: string;
  schoolId: string;
  createdAt: string;
  acknowledgedAt: string | null;
}

export interface SkillExport {
  id: string;
  format: string;
  scope: string;
  status: string;
  url: string | null;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface SkillImport {
  id: string;
  format: string;
  source: string;
  status: string;
  totalRows: number;
  processedRows: number;
  errors: number;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface SkillBackup {
  id: string;
  scope: string;
  status: string;
  size: number;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface SkillSearchQuery {
  id: string;
  query: string;
  filters: SkillSearchFilter[];
  results: SkillSearchResult[];
  totalResults: number;
  schoolId: string;
  createdAt: string;
}

export interface SkillSearchFilter {
  field: string;
  operator: string;
  value: string;
}

export interface SkillSearchResult {
  skillId: string;
  skillName: string;
  score: number;
  highlights: string[];
}

export interface SkillRecommendationEngine {
  id: string;
  personId: string;
  inputSkills: string[];
  recommendations: SkillRecommendationEntry[];
  model: string;
  confidence: number;
  schoolId: string;
}

export interface SkillRecommendationEntry {
  skillId: string;
  skillName: string;
  reason: string;
  priority: SkillGapPriority;
  estimatedTime: string;
}

export interface SkillPredictionModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  lastTrained: string;
  parameters: Record<string, unknown>;
  schoolId: string;
}

export interface SkillPredictionResult {
  id: string;
  modelId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  confidence: number;
  generatedAt: string;
  schoolId: string;
}

export interface SkillBenchmark {
  id: string;
  name: string;
  industry: SkillIndustrySector;
  region: SkillDemandRegion;
  skills: SkillBenchmarkEntry[];
  averageScore: number;
  schoolId: string;
  createdAt: string;
}

export interface SkillBenchmarkEntry {
  skillId: string;
  skillName: string;
  benchmarkScore: number;
  actualScore: number;
  gap: number;
}

export interface SkillComplianceCheck {
  id: string;
  regulation: string;
  scope: string;
  status: string;
  issues: SkillComplianceIssue[];
  schoolId: string;
  createdAt: string;
}

export interface SkillComplianceIssue {
  type: string;
  severity: GapSeverity;
  description: string;
  recommendation: string;
}

export interface SkillPerformanceMetric {
  id: string;
  skillId: string;
  metricType: string;
  value: number;
  trend: TrendType;
  period: string;
  schoolId: string;
  measuredAt: string;
}

export interface SkillUsageAnalytics {
  id: string;
  skillId: string;
  totalViews: number;
  totalUses: number;
  averageRating: number;
  lastUsed: string;
  schoolId: string;
}
