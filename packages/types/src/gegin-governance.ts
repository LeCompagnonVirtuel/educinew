export enum GovernanceType {
  MINISTRY = "MINISTRY",
  DEPARTMENT = "DEPARTMENT",
  AGENCY = "AGENCY",
  COUNCIL = "COUNCIL",
  BOARD = "BOARD",
  COMMISSION = "COMMISSION",
  AUTHORITY = "AUTHORITY",
  DIRECTORATE = "DIRECTORATE",
}

export enum CountryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
  RESTRICTED = "RESTRICTED",
}

export enum RegionType {
  CONTINENT = "CONTINENT",
  SUB_CONTINENT = "SUB_CONTINENT",
  ECONOMIC_ZONE = "ECONOMIC_ZONE",
  CUSTOMS_UNION = "CUSTOMS_UNION",
  FREE_TRADE_AREA = "FREE_TRADE_AREA",
  POLITICAL_UNION = "POLITICAL_UNION",
}

export enum PolicyStatus {
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  REPEALED = "REPEALED",
  AMENDED = "AMENDED",
  SUSPENDED = "SUSPENDED",
}

export enum PolicyCategory {
  CURRICULUM = "CURRICULUM",
  ASSESSMENT = "ASSESSMENT",
  QUALITY_ASSURANCE = "QUALITY_ASSURANCE",
  TEACHER_EDUCATION = "TEACHER_EDUCATION",
  STUDENT_WELFARE = "STUDENT_WELFARE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  FUNDING = "FUNDING",
  GOVERNANCE = "GOVERNANCE",
  TECHNOLOGY = "TECHNOLOGY",
  INCLUSION = "INCLUSION",
}

export enum AgreementType {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  REGIONAL = "REGIONAL",
  GLOBAL = "GLOBAL",
  INTERGOVERNMENTAL = "INTERGOVERNMENTAL",
  MEMORANDUM = "MEMORANDUM",
  TREATY = "TREATY",
  CONVENTION = "CONVENTION",
}

export enum AgreementStatus {
  NEGOTIATION = "NEGOTIATION",
  SIGNED = "SIGNED",
  RATIFIED = "RATIFIED",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  TERMINATED = "TERMINATED",
  SUSPENDED = "SUSPENDED",
  PENDING_RATIFICATION = "PENDING_RATIFICATION",
}

export enum LawCategory {
  EDUCATION = "EDUCATION",
  LABOR = "LABOR",
  CHILD_PROTECTION = "CHILD_PROTECTION",
  DATA_PRIVACY = "DATA_PRIVACY",
  INTELLECTUAL_PROPERTY = "INTELLECTUAL_PROPERTY",
  CIVIL = "CIVIL",
  CRIMINAL = "CRIMINAL",
  ADMINISTRATIVE = "ADMINISTRATIVE",
}

export enum LawStatus {
  PROPOSED = "PROPOSED",
  UNDER_CONSIDERATION = "UNDER_CONSIDERATION",
  PASSED = "PASSED",
  ENACTED = "ENACTED",
  IN_FORCE = "IN_FORCE",
  AMENDED = "AMENDED",
  REPEALED = "REPEALED",
  SUSPENDED = "SUSPENDED",
}

export enum DirectiveScope {
  GLOBAL = "GLOBAL",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  LOCAL = "LOCAL",
  SECTORAL = "SECTORAL",
}

export enum DirectivePriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  ADVISORY = "ADVISORY",
}

export enum WorkflowStatus {
  INITIATED = "INITIATED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ON_HOLD = "ON_HOLD",
}

export enum WorkflowType {
  POLICY_APPROVAL = "POLICY_APPROVAL",
  LAW_DRAFTING = "LAW_DRAFTING",
  AGREEMENT_NEGOTIATION = "AGREEMENT_NEGOTIATION",
  COMPLIANCE_REVIEW = "COMPLIANCE_REVIEW",
  AUDIT = "AUDIT",
  REFORM = "REFORM",
  STANDARDIZATION = "STANDARDIZATION",
  CERTIFICATION = "CERTIFICATION",
}

export enum ComplianceLevel {
  FULLY_COMPLIANT = "FULLY_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
  WAIVED = "WAIVED",
  PENDING_ASSESSMENT = "PENDING_ASSESSMENT",
}

export enum ComplianceCategory {
  CURRICULUM = "CURRICULUM",
  ASSESSMENT = "ASSESSMENT",
  QUALITY = "QUALITY",
  GOVERNANCE = "GOVERNANCE",
  FINANCE = "FINANCE",
  REPORTING = "REPORTING",
  SAFETY = "SAFETY",
  ACCESS = "ACCESS",
}

export enum VersionStatus {
  DRAFT = "DRAFT",
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  DEPRECATED = "DEPRECATED",
  WITHDRAWN = "WITHDRAWN",
}

export enum AuditStatus {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FOLLOW_UP = "FOLLOW_UP",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
}

export enum AuditType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  SELF_ASSESSMENT = "SELF_ASSESSMENT",
  PEER_REVIEW = "PEER_REVIEW",
  REGULATORY = "REGULATORY",
  COMPLIANCE = "COMPLIANCE",
  PERFORMANCE = "PERFORMANCE",
}

export enum AnalyticsType {
  OVERVIEW = "OVERVIEW",
  PERFORMANCE = "PERFORMANCE",
  COMPARISON = "COMPARISON",
  TREND = "TREND",
  PREDICTIVE = "PREDICTIVE",
  BENCHMARK = "BENCHMARK",
  DIAGNOSTIC = "DIAGNOSTIC",
}

export enum MetricCategory {
  ENROLLMENT = "ENROLLMENT",
  COMPLETION = "COMPLETION",
  QUALITY = "QUALITY",
  EQUITY = "EQUITY",
  EFFICIENCY = "EFFICIENCY",
  GOVERNANCE = "GOVERNANCE",
  FINANCE = "FINANCE",
  INNOVATION = "INNOVATION",
}

export enum DataFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
  BIENNIAL = "BIENNIAL",
}

export enum StakeholderType {
  GOVERNMENT = "GOVERNMENT",
  INSTITUTION = "INSTITUTION",
  ORGANIZATION = "ORGANIZATION",
  INDIVIDUAL = "INDIVIDUAL",
  COMMUNITY = "COMMUNITY",
  INDUSTRY = "INDUSTRY",
  CIVIL_SOCIETY = "CIVIL_SOCIETY",
}

export enum LanguageCode {
  EN = "EN",
  FR = "FR",
  ES = "ES",
  AR = "AR",
  ZH = "ZH",
  PT = "PT",
  SW = "SW",
  HA = "HA",
  AM = "AM",
  YO = "YO",
}

export enum CurrencyCode {
  USD = "USD",
  EUR = "EUR",
  XOF = "XOF",
  XAF = "XAF",
  NGN = "NGN",
  KES = "KES",
  GHS = "GHS",
  ZAR = "ZAR",
  EGP = "EGP",
  MAD = "MAD",
}

export enum DocumentType {
  POLICY = "POLICY",
  LAW = "LAW",
  REGULATION = "REGULATION",
  DIRECTIVE = "DIRECTIVE",
  GUIDELINE = "GUIDELINE",
  STANDARD = "STANDARD",
  FRAMEWORK = "FRAMEWORK",
  MANUAL = "MANUAL",
}

export enum ApprovalLevel {
  MINISTERIAL = "MINISTERIAL",
  DIRECTORIAL = "DIRECTORIAL",
  DEPARTMENTAL = "DEPARTMENTAL",
  DIVISIONAL = "DIVISIONAL",
  UNIT = "UNIT",
  TECHNICAL = "TECHNICAL",
}

export enum ChangeType {
  CREATION = "CREATION",
  AMENDMENT = "AMENDMENT",
  CORRECTION = "CORRECTION",
  UPDATE = "UPDATE",
  REPEAL = "REPEAL",
  CONSOLIDATION = "CONSOLIDATION",
  TRANSLATION = "TRANSLATION",
}

export enum NotificationType {
  POLICY_UPDATE = "POLICY_UPDATE",
  COMPLIANCE_ALERT = "COMPLIANCE_ALERT",
  AUDIT_FINDING = "AUDIT_FINDING",
  DEADLINE_REMINDER = "DEADLINE_REMINDER",
  APPROVAL_REQUEST = "APPROVAL_REQUEST",
  STATUS_CHANGE = "STATUS_CHANGE",
  COMMENT = "COMMENT",
  REVISION = "REVISION",
}

export enum EntityType {
  COUNTRY = "COUNTRY",
  INSTITUTION = "INSTITUTION",
  ORGANIZATION = "ORGANIZATION",
  PROGRAM = "PROGRAM",
  PROJECT = "PROJECT",
  DOCUMENT = "DOCUMENT",
  AGREEMENT = "AGREEMENT",
  POLICY = "POLICY",
}

export enum RelationshipType {
  MEMBER = "MEMBER",
  AFFILIATE = "AFFILIATE",
  PARTNER = "PARTNER",
  SUBSIDIARY = "SUBSIDIARY",
  SUPERVISOR = "SUPERVISOR",
  COOPERATING = "COOPERATING",
  FUNDING = "FUNDING",
  BENEFICIARY = "BENEFICIARY",
}

export enum ImpactLevel {
  TRANSFORMATIVE = "TRANSFORMATIVE",
  SIGNIFICANT = "SIGNIFICANT",
  MODERATE = "MODERATE",
  MINIMAL = "MINIMAL",
  NEGLIGIBLE = "NEGLIGIBLE",
}

export enum ReviewCycle {
  CONTINUOUS = "CONTINUOUS",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  BIENNIAL = "BIENNIAL",
  AD_HOC = "AD_HOC",
}

export enum StandardType {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  INDUSTRY = "INDUSTRY",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum CertificationStatus {
  PENDING = "PENDING",
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  SUSPENDED = "SUSPENDED",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
  RENEWED = "RENEWED",
}

export enum EnforcementAction {
  WARNING = "WARNING",
  SANCTION = "SANCTION",
  PENALTY = "PENALTY",
  SUSPENSION = "SUSPENSION",
  REVOCATION = "REVOCATION",
  PROSECUTION = "PROSECUTION",
  REMEDIATION = "REMEDIATION",
}

export enum DataSourceType {
  GOVERNMENT = "GOVERNMENT",
  INSTITUTION = "INSTITUTION",
  INTERNATIONAL_ORG = "INTERNATIONAL_ORG",
  RESEARCH = "RESEARCH",
  SURVEY = "SURVEY",
  AUTOMATED = "AUTOMATED",
  CROWDSOURCED = "CROWDSOURCED",
}

export enum QualityStandard {
  ISO_9001 = "ISO_9001",
  ISO_21001 = "ISO_21001",
  ABET = "ABET",
  AACSB = "AACSB",
  EQUIS = "EQUIS",
  QAA = "QAA",
  NATIONAL = "NATIONAL",
}

export enum FundingSource {
  GOVERNMENT = "GOVERNMENT",
  INTERNATIONAL = "INTERNATIONAL",
  PRIVATE = "PRIVATE",
  NGO = "NGO",
  MIXED = "MIXED",
  SCHOLARSHIP = "SCHOLARSHIP",
  LOAN = "LOAN",
}

export enum ReportingFormat {
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV",
  PDF = "PDF",
  EXCEL = "EXCEL",
  HTML = "HTML",
  DASHBOARD = "DASHBOARD",
}

export enum AccessLevel {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
  CLASSIFIED = "CLASSIFIED",
  INTERNAL = "INTERNAL",
}

export enum Priority {
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  INFORMATIONAL = "INFORMATIONAL",
}

export enum TimeFrame {
  IMMEDIATE = "IMMEDIATE",
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
  STRATEGIC = "STRATEGIC",
}

export enum ReformPhase {
  PLANNING = "PLANNING",
  DESIGN = "DESIGN",
  PILOT = "PILOT",
  IMPLEMENTATION = "IMPLEMENTATION",
  EVALUATION = "EVALUATION",
  SCALING = "SCALING",
  INSTITUTIONALIZATION = "INSTITUTIONALIZATION",
}

export enum StakeholderRole {
  DECISION_MAKER = "DECISION_MAKER",
  IMPLEMENTER = "IMPLEMENTER",
  BENEFICIARY = "BENEFICIARY",
  MONITOR = "MONITOR",
  ADVISOR = "ADVISOR",
  FUNDING_PARTNER = "FUNDING_PARTNER",
}

export enum DocumentClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  SECRET = "SECRET",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REVISION_REQUIRED = "REVISION_REQUIRED",
}

export enum ValidationStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
}

export enum RiskLevel {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  MINIMAL = "MINIMAL",
}

export enum ImplementationStatus {
  NOT_STARTED = "NOT_STARTED",
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  ON_TRACK = "ON_TRACK",
  BEHIND_SCHEDULE = "BEHIND_SCHEDULE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum CoverageType {
  NATIONAL = "NATIONAL",
  REGIONAL = "LOCAL",
  SECTORAL = "SECTORAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  PROGRAM_BASED = "PROGRAM_BASED",
}

export enum BenchmarkType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  INTERNATIONAL = "INTERNATIONAL",
  INDUSTRY = "INDUSTRY",
  ACADEMIC = "ACADEMIC",
}

export enum StakeholderEngagement {
  CONSULTATION = "CONSULTATION",
  COLLABORATION = "COLLABORATION",
  PARTICIPATION = "PARTICIPATION",
  INFORM = "INFORM",
  EMPOWER = "EMPOWER",
}

export enum ComplianceFramework {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  SECTORAL = "SECTORAL",
  CUSTOM = "CUSTOM",
}

export enum DataQualityLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  UNVERIFIED = "UNVERIFIED",
}

export enum AlignmentStatus {
  ALIGNED = "ALIGNED",
  PARTIALLY_ALIGNED = "PARTIALLY_ALIGNED",
  NOT_ALIGNED = "NOT_ALIGNED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum PolicyImpact {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
  MIXED = "MIXED",
  UNDETERMINED = "UNDETERMINED",
}

export enum GovernanceFramework {
  CENTRALIZED = "CENTRALIZED",
  DECENTRALIZED = "DECENTRALIZED",
  FEDERAL = "FEDERAL",
  UNITARY = "UNITARY",
  HYBRID = "HYBRID",
}

export enum AccountabilityLevel {
  MINISTERIAL = "MINISTERIAL",
  DEPARTMENTAL = "DEPARTMENTAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  INDIVIDUAL = "INDIVIDUAL",
  COLLECTIVE = "COLLECTIVE",
}

export enum TransparencyLevel {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  LIMITED = "LIMITED",
  NONE = "NONE",
}

export enum ParticipationLevel {
  MANDATORY = "MANDATORY",
  VOLUNTARY = "VOLUNTARY",
  ENCOURAGED = "ENCOURAGED",
  OPTIONAL = "OPTIONAL",
}

export enum ReportingRequirement {
  MANDATORY = "MANDATORY",
  VOLUNTARY = "VOLUNTARY",
  PERIODIC = "PERIODIC",
  AD_HOC = "AD_HOC",
}

export enum SanctionType {
  WARNING = "WARNING",
  FINES = "FINES",
  SUSPENSION = "SUSPENSION",
  EXPULSION = "EXPULSION",
  BAN = "BAN",
  REMEDIAL = "REMEDIAL",
}

export enum CooperationType {
  TECHNICAL = "TECHNICAL",
  FINANCIAL = "FINANCIAL",
  KNOWLEDGE = "KNOWLEDGE",
  CAPACITY_BUILDING = "CAPACITY_BUILDING",
  SOUTH_SOUTH = "SOUTH_SOUTH",
  TRIANGULAR = "TRIANGULAR",
}

export enum DevelopmentGoal {
  QUALITY_EDUCATION = "QUALITY_EDUCATION",
  GENDER_EQUALITY = "GENDER_EQUALITY",
  POVERTY_REDUCTION = "POVERTY_REDUCTION",
  ECONOMIC_GROWTH = "ECONOMIC_GROWTH",
  REDUCED_INEQUALITIES = "REDUCED_INEQUALITIES",
  SUSTAINABLE_CITIES = "SUSTAINABLE_CITIES",
  PARTNERSHIPS = "PARTNERSHIPS",
}

export enum IndicatorType {
  INPUT = "INPUT",
  PROCESS = "PROCESS",
  OUTPUT = "OUTPUT",
  OUTCOME = "OUTCOME",
  IMPACT = "IMPACT",
  EFFICIENCY = "EFFICIENCY",
  EFFECTIVENESS = "EFFECTIVENESS",
}

export enum MeasurementUnit {
  PERCENTAGE = "PERCENTAGE",
  RATIO = "RATIO",
  INDEX = "INDEX",
  SCORE = "SCORE",
  COUNT = "COUNT",
  RATE = "RATE",
  AMOUNT = "AMOUNT",
}

export enum TrendDirection {
  UPWARD = "UPWARD",
  DOWNWARD = "DOWNWARD",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
  CYCLICAL = "CYCLICAL",
}

export enum ComparisonType {
  PEER = "PEER",
  HISTORICAL = "HISTORICAL",
  TARGET = "TARGET",
  INTERNATIONAL = "INTERNATIONAL",
  BEST_PRACTICE = "BEST_PRACTICE",
}

export enum ReportingPeriod {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  BIENNIAL = "BIENNIAL",
  AD_HOC = "AD_HOC",
}

export enum DataCollectionMethod {
  SURVEY = "SURVEY",
  CENSUS = "CENSUS",
  INTERVIEW = "INTERVIEW",
  OBSERVATION = "OBSERVATION",
  DOCUMENTATION = "DOCUMENTATION",
  AUTOMATED = "AUTOMATED",
}

export enum GovernanceLevel {
  FEDERAL = "FEDERAL",
  STATE = "STATE",
  LOCAL = "LOCAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  PROGRAM = "PROGRAM",
}

export enum PolicyCyclePhase {
  AGENDA_SETTING = "AGENDA_SETTING",
  FORMULATION = "FORMULATION",
  ADOPTION = "ADOPTION",
  IMPLEMENTATION = "IMPLEMENTATION",
  EVALUATION = "EVALUATION",
  TERMINATION = "TERMINATION",
}

export enum RegulatoryBody {
  MINISTRY = "MINISTRY",
  AGENCY = "AGENCY",
  COUNCIL = "COUNCIL",
  BOARD = "BOARD",
  COMMISSION = "COMMISSION",
  AUTHORITY = "AUTHORITY",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
}

export enum RemediationAction {
  CORRECTIVE = "CORRECTIVE",
  PREVENTIVE = "PREVENTIVE",
  ADAPTIVE = "ADAPTIVE",
  MITIGATIVE = "MITIGATIVE",
  COMPENSATORY = "COMPENSATORY",
}

export enum ImpactAssessment {
  ENVIRONMENTAL = "ENVIRONMENTAL",
  SOCIAL = "SOCIAL",
  ECONOMIC = "ECONOMIC",
  CULTURAL = "CULTURAL",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum ReviewMethodology {
  QUANTITATIVE = "QUANTITATIVE",
  QUALITATIVE = "QUALITATIVE",
  MIXED_METHODS = "MIXED_METHODS",
  BENCHMARKING = "BENCHMARKING",
  CASE_STUDY = "CASE_STUDY",
}

export enum EvidenceType {
  STATISTICAL = "STATISTICAL",
  ANECDOTAL = "ANECDOTAL",
  EXPERIMENTAL = "EXPERIMENTAL",
  COMPARATIVE = "COMPARATIVE",
  LONGITUDINAL = "LONGITUDINAL",
}

export enum RecommendationType {
  MANDATORY = "MANDATORY",
  RECOMMENDED = "RECOMMENDED",
  OPTIONAL = "OPTIONAL",
  CONDITIONAL = "CONDITIONAL",
  ADVISORY = "ADVISORY",
}

export enum ImplementationPriority {
  IMMEDIATE = "IMMEDIATE",
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum ResourceRequirement {
  HUMAN = "HUMAN",
  FINANCIAL = "FINANCIAL",
  TECHNICAL = "TECHNICAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  INFRASTRUCTURE = "INFRASTRUCTURE",
}

export enum CapacityBuildingNeed {
  TRAINING = "TRAINING",
  TECHNICAL_ASSISTANCE = "TECHNICAL_ASSISTANCE",
  INSTITUTIONAL_SUPPORT = "INSTITUTIONAL_SUPPORT",
  KNOWLEDGE_TRANSFER = "KNOWLEDGE_TRANSFER",
  MENTORING = "MENTORING",
}

export enum MonitoringFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
}

export enum EvaluationType {
  FORMATIVE = "FORMATIVE",
  SUMMATIVE = "SUMMATIVE",
  PROCESS = "PROCESS",
  OUTCOME = "OUTCOME",
  IMPACT = "IMPACT",
}

export enum StakeholderCategory {
  PRIMARY = "PRIMARY",
  SECONDARY = "TERTIARY",
  EXTERNAL = "EXTERNAL",
  INTERNAL = "INTERNAL",
}

export enum EngagementMethod {
  WORKSHOP = "WORKSHOP",
  SEMINAR = "SEMINAR",
  CONFERENCE = "CONFERENCE",
  SURVEY = "SURVEY",
  FOCUS_GROUP = "FOCUS_GROUP",
  INTERVIEW = "INTERVIEW",
}

export enum CommunicationChannel {
  EMAIL = "EMAIL",
  PORTAL = "PORTAL",
  SMS = "SMS",
  MEETING = "MEETING",
  REPORT = "REPORT",
  DASHBOARD = "DASHBOARD",
}

export enum ReportingTool {
  DASHBOARD = "DASHBOARD",
  REPORT = "REPORT",
  VISUALIZATION = "VISUALIZATION",
  ALERT = "ALERT",
  SUMMARY = "SUMMARY",
}

export enum DataVisualizationType {
  BAR_CHART = "BAR_CHART",
  LINE_CHART = "LINE_CHART",
  PIE_CHART = "PIE_CHART",
  MAP = "MAP",
  TABLE = "TABLE",
  INFOGRAPHIC = "INFOGRAPHIC",
}

export enum ExportFormat {
  PDF = "PDF",
  EXCEL = "EXCEL",
  CSV = "CSV",
  JSON = "JSON",
  XML = "XML",
  IMAGE = "IMAGE",
}

export enum AccessMethod {
  WEB = "WEB",
  MOBILE = "MOBILE",
  API = "API",
  DOWNLOAD = "DOWNLOAD",
  EMAIL = "EMAIL",
}

export enum SearchType {
  FULL_TEXT = "FULL_TEXT",
  KEYWORD = "KEYWORD",
  FILTER = "FILTER",
  FACETED = "FACETED",
  BOOLEAN = "BOOLEAN",
}

export enum SortOrder {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}

export enum PaginationType {
  OFFSET = "OFFSET",
  CURSOR = "CURSOR",
  INFINITE_SCROLL = "INFINITE_SCROLL",
}

export enum CacheStrategy {
  NONE = "NONE",
  SHORT_TERM = "SHORT_TERM",
  LONG_TERM = "LONG_TERM",
  PERSISTENT = "PERSISTENT",
}

export enum SyncFrequency {
  REAL_TIME = "REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum IntegrationType {
  REST_API = "REST_API",
  GRAPHQL = "GRAPHQL",
  WEBHOOK = "WEBHOOK",
  FILE_IMPORT = "FILE_IMPORT",
  DATABASE_LINK = "DATABASE_LINK",
}

export enum AuthenticationMethod {
  API_KEY = "API_KEY",
  OAUTH = "OAUTH",
  JWT = "JWT",
  BASIC = "BASIC",
  CERTIFICATE = "CERTIFICATE",
}

export enum RateLimitTier {
  FREE = "FREE",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
}

export interface GlobalMinistryRegistry {
  id: string;
  countryId: string;
  ministryName: string;
  ministryCode: string;
  governanceType: GovernanceType;
  ministerName: string;
  ministerTitle: string;
  officialEmail: string;
  officialPhone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  establishedDate: string;
  mandateDescription: string;
  responsibleSectors: string[];
  parentMinistryId: string | null;
  subordinateAgencies: string[];
  budget: number;
  currencyCode: CurrencyCode;
  staffCount: number;
  isActive: boolean;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CountryRegistry {
  id: string;
  countryName: string;
  officialName: string;
  isoCode2: string;
  isoCode3: string;
  unCode: string;
  region: string;
  subRegion: string;
  continent: string;
  capitalCity: string;
  largestCity: string;
  population: number;
  areaSquareKm: number;
  officialLanguages: LanguageCode[];
  currencyCode: CurrencyCode;
  currencyName: string;
  dialingCode: string;
  internetTLD: string;
  governmentType: string;
  headOfState: string;
  headOfGovernment: string;
  independenceDate: string;
  constitutionalStatus: string;
  educationSystem: string;
  literacyRate: number;
  educationExpenditureGDP: number;
  studentPopulation: number;
  numberInstitutions: number;
  isOECD: boolean;
  isCommonwealth: boolean;
  isAU: boolean;
  isECOWAS: boolean;
  isASEAN: boolean;
  isUN: boolean;
  hasMinistryOfEducation: boolean;
  ministryOfEducationId: string;
  nationalQualificationFramework: string;
  accreditationBody: string;
  qualityAssuranceAgency: string;
  dataProtectionLaw: string;
  educationLegislation: string;
  isActive: boolean;
  lastVerified: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RegionalGovernance {
  id: string;
  regionName: string;
  regionType: RegionType;
  regionCode: string;
  description: string;
  memberCountries: string[];
  headquartersCountry: string;
  headquartersCity: string;
  establishedDate: string;
  foundingTreaty: string;
  presidentName: string;
  secretaryGeneralName: string;
  officialWebsite: string;
  officialLanguages: LanguageCode[];
  totalPopulation: number;
  totalGDP: number;
  currencyCode: CurrencyCode;
  educationInitiatives: string[];
  governanceStructure: string;
  decisionMakingProcess: string;
  disputeResolutionMechanism: string;
  fundingMechanism: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EducationPolicy {
  id: string;
  policyTitle: string;
  policyCode: string;
  policyDescription: string;
  policyCategory: PolicyCategory;
  policyStatus: PolicyStatus;
  issuingAuthority: string;
  issuingCountry: string;
  issuingMinistryId: string;
  effectiveDate: string;
  expiryDate: string | null;
  reviewDate: string;
  version: string;
  previousVersionId: string | null;
  targetStakeholders: StakeholderType[];
  geographicScope: string;
  sectoralScope: string[];
  objectives: string[];
  keyProvisions: string[];
  implementationRequirements: string[];
  complianceRequirements: string[];
  fundingMechanism: string;
  estimatedBudget: number;
  currencyCode: CurrencyCode;
  responsibleEntity: string;
  monitoringMechanism: string;
  evaluationCriteria: string[];
  legalBasis: string;
  relatedPolicies: string[];
  relatedLaws: string[];
  relatedAgreements: string[];
  supportingDocuments: string[];
  tags: string[];
  language: LanguageCode;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InternationalAgreement {
  id: string;
  agreementTitle: string;
  agreementCode: string;
  agreementType: AgreementType;
  agreementStatus: AgreementStatus;
  description: string;
  signatoryCountries: string[];
  signatoryOrganizations: string[];
  leadCountry: string;
  leadOrganization: string;
  dateNegotiated: string;
  dateSigned: string;
  dateRatified: string;
  dateEnteredForce: string;
  expiryDate: string | null;
  renewalDate: string | null;
  durationYears: number;
  subjectMatter: string[];
  educationFocus: string[];
  keyProvisions: string[];
  obligations: string[];
  reportingRequirements: string[];
  disputeResolution: string;
  amendmentProcedure: string;
  withdrawalProcedure: string;
  fundingArrangements: string;
  secretariatLocation: string;
  officialLanguages: LanguageCode[];
  ratificationCount: number;
  minimumRatifications: number;
  isPublic: boolean;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EducationLaw {
  id: string;
  lawTitle: string;
  lawNumber: string;
  lawCategory: LawCategory;
  lawStatus: LawStatus;
  description: string;
  enactingCountry: string;
  enactingAuthority: string;
  legislativeBody: string;
  dateProposed: string;
  datePassed: string;
  dateEnacted: string;
  dateInForce: string;
  effectiveDate: string;
  expiryDate: string | null;
  lastAmended: string | null;
  version: string;
  preamble: string;
  sections: LawSection[];
  keyProvisions: string[];
  rights: string[];
  obligations: string[];
  penalties: string[];
  enforcementMechanism: string;
  regulatoryAuthority: string;
  implementingRegulations: string[];
  relatedLaws: string[];
  relatedPolicies: string[];
  supportingDocuments: string[];
  constitutionalBasis: string;
  internationalObligations: string[];
  tags: string[];
  language: LanguageCode;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LawSection {
  sectionNumber: string;
  sectionTitle: string;
  sectionContent: string;
  subsections: LawSubsection[];
}

export interface LawSubsection {
  subsectionNumber: string;
  subsectionContent: string;
}

export interface InternationalDirective {
  id: string;
  directiveTitle: string;
  directiveCode: string;
  issuingBody: string;
  issuingOrganization: string;
  directiveScope: DirectiveScope;
  directivePriority: DirectivePriority;
  description: string;
  targetCountries: string[];
  targetEntities: string[];
  subjectMatter: string[];
  educationFocus: string[];
  requirements: string[];
  guidelines: string[];
  implementationDeadline: string;
  reportingDeadline: string;
  complianceDeadline: string;
  enforcementMechanism: string;
  nonComplianceConsequences: string[];
  supportAvailable: string[];
  fundingMechanism: string;
  monitoringMechanism: string;
  reviewDate: string;
  version: string;
  previousDirectiveId: string | null;
  relatedDirectives: string[];
  relatedPolicies: string[];
  relatedLaws: string[];
  supportingDocuments: string[];
  officialLanguages: LanguageCode[];
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceWorkflow {
  id: string;
  workflowName: string;
  workflowType: WorkflowType;
  workflowStatus: WorkflowStatus;
  description: string;
  initiatingCountry: string;
  initiatingOrganization: string;
  initiatingUser: string;
  targetEntity: string;
  entityType: EntityType;
  priority: Priority;
  startDate: string;
  dueDate: string;
  completionDate: string | null;
  steps: WorkflowStep[];
  currentStep: number;
  totalSteps: number;
  participants: WorkflowParticipant[];
  documents: string[];
  comments: WorkflowComment[];
  approvals: WorkflowApproval[];
  dependencies: string[];
  blockers: string[];
  estimatedDuration: number;
  actualDuration: number | null;
  statusHistory: WorkflowStatusHistory[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorkflowStep {
  stepNumber: number;
  stepName: string;
  stepDescription: string;
  stepType: string;
  assignedRole: string;
  assignedUser: string | null;
  status: string;
  startDate: string | null;
  dueDate: string;
  completionDate: string | null;
  requiredDocuments: string[];
  outputDocuments: string[];
  decisionRequired: boolean;
  decisionOptions: string[];
  actualDuration: number | null;
}

export interface WorkflowParticipant {
  userId: string;
  role: string;
  name: string;
  email: string;
  organization: string;
  joinedDate: string;
  leftDate: string | null;
  isActive: boolean;
}

export interface WorkflowComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  stepNumber: number;
}

export interface WorkflowApproval {
  id: string;
  approverId: string;
  approverName: string;
  approverRole: string;
  approvalLevel: ApprovalLevel;
  status: string;
  decisionDate: string | null;
  comments: string;
  signatureRequired: boolean;
  signatureUrl: string | null;
}

export interface WorkflowStatusHistory {
  status: WorkflowStatus;
  changedBy: string;
  changedByName: string;
  changedAt: string;
  reason: string;
  previousStatus: WorkflowStatus;
}

export interface InternationalCompliance {
  id: string;
  countryId: string;
  countryName: string;
  agreementId: string;
  agreementTitle: string;
  complianceLevel: ComplianceLevel;
  complianceScore: number;
  complianceDate: string;
  lastAssessmentDate: string;
  nextAssessmentDate: string;
  assessmentMethodology: string;
  assessorOrganization: string;
  complianceAreas: ComplianceArea[];
  evidenceDocuments: string[];
  findings: ComplianceFinding[];
  recommendations: string[];
  actionPlan: string;
  responsibleEntity: string;
  reportingDeadline: string;
  followUpRequired: boolean;
  followUpDate: string | null;
  status: ComplianceStatus;
  previousComplianceLevel: ComplianceLevel | null;
  trend: TrendDirection;
  supportingDocuments: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ComplianceArea {
  areaName: string;
  areaDescription: string;
  complianceLevel: ComplianceLevel;
  score: number;
  findings: string[];
  evidence: string[];
  gaps: string[];
  remediationActions: string[];
}

export interface ComplianceFinding {
  findingId: string;
  findingTitle: string;
  findingDescription: string;
  severity: RiskLevel;
  area: string;
  evidence: string[];
  impact: string;
  rootCause: string;
  recommendation: string;
  responsibleEntity: string;
  deadline: string;
  status: string;
}

export interface PolicyVersioning {
  id: string;
  policyId: string;
  policyTitle: string;
  versionNumber: string;
  versionStatus: VersionStatus;
  changeType: ChangeType;
  changeDescription: string;
  changeJustification: string;
  previousVersionId: string | null;
  authorId: string;
  authorName: string;
  authorOrganization: string;
  reviewDate: string;
  approvalDate: string;
  approvedBy: string;
  approvedByName: string;
  effectiveDate: string;
  expiryDate: string | null;
  contentHash: string;
  documentUrl: string;
  diffFromPrevious: string;
  changeLog: PolicyChangeLog[];
  reviewComments: ReviewComment[];
  attachments: string[];
  isCurrentVersion: boolean;
  versionHistory: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PolicyChangeLog {
  changeId: string;
  changeType: ChangeType;
  section: string;
  description: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
}

export interface ReviewComment {
  commentId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: string;
  section: string;
  comment: string;
  recommendation: string;
  timestamp: string;
  status: string;
}

export interface GovernanceAudit {
  id: string;
  auditTitle: string;
  auditCode: string;
  auditType: AuditType;
  auditStatus: AuditStatus;
  auditScope: string;
  auditDescription: string;
  auditingBody: string;
  auditingOrganization: string;
  auditLead: string;
  auditTeam: string[];
  targetCountry: string;
  targetOrganization: string;
  targetType: EntityType;
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate: string | null;
  actualEndDate: string | null;
  auditCriteria: AuditCriterion[];
  methodology: string;
  standards: string[];
  budget: number;
  currencyCode: CurrencyCode;
  documents: string[];
  findings: AuditFinding[];
  recommendations: AuditRecommendation[];
  executiveSummary: string;
  detailedReport: string;
  publicReport: string;
  confidentialReport: string;
  distributionList: string[];
  followUpDate: string | null;
  followUpActions: string[];
  previousAuditId: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AuditCriterion {
  criterionId: string;
  criterionName: string;
  criterionDescription: string;
  category: string;
  weight: number;
  score: number | null;
  maxScore: number;
  complianceStatus: string;
  evidenceRequired: string[];
  evidenceProvided: string[];
  findings: string[];
}

export interface AuditFinding {
  findingId: string;
  findingTitle: string;
  findingDescription: string;
  category: string;
  severity: RiskLevel;
  criteria: string;
  evidence: string[];
  rootCause: string;
  impact: string;
  recommendation: string;
  managementResponse: string;
  correctiveAction: string;
  responsibleEntity: string;
  deadline: string;
  status: string;
}

export interface AuditRecommendation {
  recommendationId: string;
  recommendationNumber: string;
  findingId: string;
  description: string;
  priority: Priority;
  category: string;
  implementationStatus: string;
  responsibleEntity: string;
  deadline: string;
  estimatedCost: number;
  currencyCode: CurrencyCode;
  expectedBenefit: string;
  progressUpdates: string[];
}

export interface GovernanceAnalytics {
  id: string;
  analyticsTitle: string;
  analyticsType: AnalyticsType;
  description: string;
  targetCountry: string;
  targetRegion: string;
  targetOrganization: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  generatedAt: string;
  generatedBy: string;
  dataSources: DataSource[];
  metrics: GovernanceMetric[];
  comparisons: GovernanceComparison[];
  trends: GovernanceTrend[];
  insights: GovernanceInsight[];
  recommendations: string[];
  methodology: string;
  limitations: string[];
  confidence: number;
  reportUrl: string;
  visualizationUrls: string[];
  exportFormats: ExportFormat[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DataSource {
  sourceId: string;
  sourceName: string;
  sourceType: DataSourceType;
  sourceOrganization: string;
  lastUpdated: string;
  reliability: number;
  coveragePercentage: number;
  dataQuality: DataQualityLevel;
}

export interface GovernanceMetric {
  metricId: string;
  metricName: string;
  metricCategory: MetricCategory;
  description: string;
  value: number;
  previousValue: number | null;
  unit: MeasurementUnit;
  changePercentage: number | null;
  trend: TrendDirection;
  benchmark: number | null;
  target: number | null;
  regionalAverage: number | null;
  globalAverage: number | null;
  period: string;
  dataSource: string;
  confidence: number;
}

export interface GovernanceComparison {
  comparisonId: string;
  comparisonType: ComparisonType;
  description: string;
  entities: ComparisonEntity[];
  metrics: string[];
  timeframe: string;
  insights: string[];
}

export interface ComparisonEntity {
  entityId: string;
  entityName: string;
  entityType: EntityType;
  country: string;
  metricValues: Record<string, number>;
  rank: number;
  percentile: number;
}

export interface GovernanceTrend {
  trendId: string;
  trendName: string;
  description: string;
  metricCategory: MetricCategory;
  direction: TrendDirection;
  magnitude: number;
  duration: string;
  dataPoints: TrendDataPoint[];
  forecast: TrendForecast | null;
  factors: string[];
  confidence: number;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  annotation: string | null;
}

export interface TrendForecast {
  forecastPeriod: string;
  forecastValues: TrendDataPoint[];
  methodology: string;
  confidenceInterval: number;
  assumptions: string[];
}

export interface GovernanceInsight {
  insightId: string;
  insightTitle: string;
  insightDescription: string;
  category: string;
  priority: Priority;
  evidence: string[];
  implications: string[];
  recommendations: string[];
  actionable: boolean;
  targetStakeholders: StakeholderType[];
  estimatedImpact: ImpactLevel;
  timeframe: TimeFrame;
}

export interface RegionalCompliance {
  id: string;
  regionId: string;
  regionName: string;
  complianceFramework: ComplianceFramework;
  overallScore: number;
  countryScores: CountryComplianceScore[];
  assessmentDate: string;
  nextAssessmentDate: string;
  methodology: string;
  assessor: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
  actionPlan: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CountryComplianceScore {
  countryId: string;
  countryName: string;
  overallScore: number;
  areaScores: AreaComplianceScore[];
  trend: TrendDirection;
  rank: number;
}

export interface AreaComplianceScore {
  areaName: string;
  score: number;
  status: ComplianceLevel;
  improvement: number;
}

export interface GovernanceReform {
  id: string;
  reformTitle: string;
  reformCode: string;
  reformPhase: ReformPhase;
  description: string;
  targetCountry: string;
  targetSector: string;
  leadOrganization: string;
  fundingSource: FundingSource;
  estimatedBudget: number;
  currencyCode: CurrencyCode;
  startDate: string;
  targetEndDate: string;
  actualEndDate: string | null;
  objectives: string[];
  keyActivities: string[];
  milestones: ReformMilestone[];
  stakeholders: ReformStakeholder[];
  partners: string[];
  expectedOutcomes: string[];
  actualOutcomes: string[];
  monitoringFramework: string;
  evaluationPlan: string;
  lessonsLearned: string[];
  sustainabilityPlan: string;
  risks: ReformRisk[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReformMilestone {
  milestoneId: string;
  milestoneName: string;
  description: string;
  targetDate: string;
  actualDate: string | null;
  status: string;
  deliverables: string[];
}

export interface ReformStakeholder {
  stakeholderId: string;
  stakeholderName: string;
  stakeholderType: StakeholderType;
  role: string;
  involvement: string;
  contactPerson: string;
  contactEmail: string;
}

export interface ReformRisk {
  riskId: string;
  riskDescription: string;
  probability: number;
  impact: number;
  riskScore: number;
  mitigationStrategy: string;
  responsiblePerson: string;
  status: string;
}

export interface GovernanceCapacity {
  id: string;
  countryId: string;
  countryName: string;
  capacityArea: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  assessmentDate: string;
  assessor: string;
  strengths: string[];
  weaknesses: string[];
  capacityBuildingNeeds: CapacityBuildingNeed[];
  actionPlan: string;
  estimatedCost: number;
  currencyCode: CurrencyCode;
  timeline: string;
  responsibleEntity: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceIndicator {
  id: string;
  indicatorName: string;
  indicatorCode: string;
  indicatorType: IndicatorType;
  category: MetricCategory;
  description: string;
  definition: string;
  unit: MeasurementUnit;
  dataCollectionMethod: DataCollectionMethod;
  frequency: DataFrequency;
  sourceOrganization: string;
  targetCountries: string[];
  baseline: number | null;
  target: number | null;
  disaggregation: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceBenchmark {
  id: string;
  benchmarkName: string;
  benchmarkType: BenchmarkType;
  description: string;
  category: MetricCategory;
  benchmarkValue: number;
  unit: MeasurementUnit;
  referenceRegion: string;
  referencePeriod: string;
  methodology: string;
  source: string;
  lastUpdated: string;
  applicableCountries: string[];
  applicableEntities: EntityType[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceReporting {
  id: string;
  reportingTitle: string;
  reportingFramework: string;
  reportType: string;
  reportingCountry: string;
  reportingOrganization: string;
  reportingPeriod: ReportingPeriod;
  submissionDeadline: string;
  submissionDate: string | null;
  status: string;
  sections: ReportingSection[];
  attachments: string[];
  submittedBy: string;
  reviewedBy: string | null;
  reviewComments: string;
  approvalStatus: string;
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReportingSection {
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  requiredFields: string[];
  completedFields: string[];
  status: string;
  comments: string;
}

export interface GovernanceNetwork {
  id: string;
  networkName: string;
  networkType: string;
  description: string;
  memberCountries: string[];
  memberOrganizations: string[];
  foundingDate: string;
  headquarters: string;
  website: string;
  objectives: string[];
  activities: string[];
  meetings: NetworkMeeting[];
  publications: string[];
  budget: number;
  currencyCode: CurrencyCode;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NetworkMeeting {
  meetingId: string;
  meetingTitle: string;
  meetingDate: string;
  meetingLocation: string;
  attendees: string[];
  agenda: string[];
  outcomes: string[];
  documents: string[];
}

export interface GovernancePartnership {
  id: string;
  partnershipTitle: string;
  partnershipType: RelationshipType;
  partner1Country: string;
  partner1Organization: string;
  partner2Country: string;
  partner2Organization: string;
  startDate: string;
  endDate: string | null;
  renewalDate: string | null;
  objectives: string[];
  activities: string[];
  funding: PartnershipFunding[];
  outcomes: string[];
  status: string;
  agreementId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PartnershipFunding {
  fundingId: string;
  sourceCountry: string;
  sourceOrganization: string;
  amount: number;
  currencyCode: CurrencyCode;
  type: string;
  conditions: string[];
  disbursementSchedule: string;
}

export interface GovernanceDocument {
  id: string;
  documentTitle: string;
  documentType: DocumentType;
  documentClassification: DocumentClassification;
  description: string;
  authorOrganization: string;
  authorCountry: string;
  publicationDate: string;
  lastRevisionDate: string;
  version: string;
  language: LanguageCode;
  pageCount: number;
  fileSize: number;
  fileFormat: string;
  downloadUrl: string;
  summary: string;
  keywords: string[];
  relatedDocuments: string[];
  targetAudience: StakeholderType[];
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceTemplate {
  id: string;
  templateName: string;
  templateType: string;
  description: string;
  category: string;
  content: string;
  fields: TemplateField[];
  version: string;
  authorOrganization: string;
  authorCountry: string;
  language: LanguageCode;
  isPublic: boolean;
  downloadCount: number;
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TemplateField {
  fieldName: string;
  fieldType: string;
  required: boolean;
  defaultValue: string;
  description: string;
  options: string[] | null;
}

export interface GovernanceKnowledge {
  id: string;
  knowledgeTitle: string;
  knowledgeType: string;
  description: string;
  category: string;
  content: string;
  authorOrganization: string;
  authorCountry: string;
  publicationDate: string;
  language: LanguageCode;
  tags: string[];
  relatedKnowledge: string[];
  downloads: number;
  citations: number;
  rating: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceEvent {
  id: string;
  eventTitle: string;
  eventType: string;
  description: string;
  organizer: string;
  organizerCountry: string;
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  virtualLink: string | null;
  expectedAttendees: number;
  actualAttendees: number | null;
  agenda: string[];
  speakers: string[];
  outcomes: string[];
  documents: string[];
  registrationDeadline: string;
  registrationUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceAlert {
  id: string;
  alertTitle: string;
  alertType: NotificationType;
  severity: Priority;
  description: string;
  targetCountries: string[];
  targetOrganizations: string[];
  issuingBody: string;
  issuedDate: string;
  expiryDate: string | null;
  actionRequired: string;
  deadline: string | null;
  relatedDocumentId: string | null;
  isRead: boolean;
  acknowledgedBy: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceDashboard {
  id: string;
  dashboardTitle: string;
  description: string;
  targetUser: string;
  targetRole: string;
  layout: DashboardLayout[];
  filters: DashboardFilter[];
  refreshInterval: number;
  lastRefreshed: string;
  createdBy: string;
  isPublic: boolean;
  shareUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DashboardLayout {
  widgetId: string;
  widgetType: string;
  widgetTitle: string;
  position: DashboardPosition;
  size: DashboardSize;
  configuration: Record<string, unknown>;
}

export interface DashboardPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardSize {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export interface DashboardFilter {
  filterName: string;
  filterType: string;
  options: string[];
  defaultValue: string;
  isRequired: boolean;
}

export interface GovernanceScorecard {
  id: string;
  scorecardTitle: string;
  targetCountry: string;
  targetOrganization: string;
  assessmentPeriod: string;
  overallScore: number;
  dimensions: ScorecardDimension[];
  benchmarkComparison: ScorecardBenchmark[];
  trend: TrendDirection;
  previousScore: number | null;
  targetScore: number;
  assessmentDate: string;
  assessor: string;
  methodology: string;
  recommendations: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ScorecardDimension {
  dimensionName: string;
  dimensionDescription: string;
  weight: number;
  score: number;
  maxScore: number;
  indicators: ScorecardIndicator[];
}

export interface ScorecardIndicator {
  indicatorName: string;
  value: number;
  weight: number;
  score: number;
  trend: TrendDirection;
  benchmark: number | null;
}

export interface ScorecardBenchmark {
  benchmarkName: string;
  benchmarkType: string;
  score: number;
  rank: number;
  percentile: number;
}

export interface GovernanceRisk {
  id: string;
  riskTitle: string;
  riskCategory: string;
  riskDescription: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  riskLevel: RiskLevel;
  affectedCountries: string[];
  affectedSectors: string[];
  rootCauses: string[];
  consequences: string[];
  mitigationStrategies: string[];
  riskOwner: string;
  monitoringIndicators: string[];
  lastAssessmentDate: string;
  nextReviewDate: string;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceStakeholder {
  id: string;
  stakeholderName: string;
  stakeholderType: StakeholderType;
  stakeholderCategory: StakeholderCategory;
  organization: string;
  country: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  role: StakeholderRole;
  interest: string;
  influence: number;
  engagementLevel: StakeholderEngagement;
  communicationChannels: CommunicationChannel[];
  lastEngagement: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernancePlan {
  id: string;
  planTitle: string;
  planType: string;
  description: string;
  targetCountry: string;
  targetOrganization: string;
  startDate: string;
  endDate: string;
  objectives: string[];
  strategies: string[];
  activities: PlanActivity[];
  budget: number;
  currencyCode: CurrencyCode;
  fundingSources: string[];
  milestones: PlanMilestone[];
  risks: PlanRisk[];
  successCriteria: string[];
  monitoringPlan: string;
  evaluationPlan: string;
  stakeholders: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PlanActivity {
  activityId: string;
  activityName: string;
  description: string;
  startDate: string;
  endDate: string;
  responsiblePerson: string;
  status: string;
  budget: number;
  dependencies: string[];
}

export interface PlanMilestone {
  milestoneId: string;
  milestoneName: string;
  description: string;
  targetDate: string;
  actualDate: string | null;
  status: string;
}

export interface PlanRisk {
  riskId: string;
  riskDescription: string;
  probability: number;
  impact: number;
  mitigation: string;
  responsiblePerson: string;
  status: string;
}

export interface GovernanceAssessment {
  id: string;
  assessmentTitle: string;
  assessmentType: string;
  description: string;
  targetCountry: string;
  targetOrganization: string;
  assessmentDate: string;
  assessorOrganization: string;
  assessorName: string;
  assessmentCriteria: string[];
  scoringMethodology: string;
  overallScore: number;
  dimensionScores: AssessmentDimensionScore[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
  actionPlan: string;
  followUpDate: string;
  supportingDocuments: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AssessmentDimensionScore {
  dimensionName: string;
  score: number;
  maxScore: number;
  weight: number;
  comments: string;
  evidence: string[];
}

export interface GovernanceProgress {
  id: string;
  progressTitle: string;
  description: string;
  targetCountry: string;
  targetOrganization: string;
  reportPeriod: string;
  reportingDate: string;
  overallProgress: number;
  dimensionProgress: ProgressDimension[];
  achievements: string[];
  challenges: string[];
  lessonsLearned: string[];
  nextSteps: string[];
  supportRequired: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProgressDimension {
  dimensionName: string;
  progress: number;
  status: string;
  details: string;
  milestones: ProgressMilestone[];
}

export interface ProgressMilestone {
  milestoneName: string;
  targetDate: string;
  status: string;
  completionPercentage: number;
}

export interface GovernanceCountryProfile {
  id: string;
  countryId: string;
  countryName: string;
  profileType: string;
  lastUpdated: string;
  overview: CountryOverview;
  educationSystem: EducationSystemProfile;
  governanceStructure: GovernanceStructureProfile;
  policyLandscape: PolicyLandscapeProfile;
  complianceStatus: CountryComplianceProfile;
  capacityAssessment: CountryCapacityProfile;
  internationalEngagement: InternationalEngagementProfile;
  keyContacts: CountryContact[];
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CountryOverview {
  population: number;
  gdpPerCapita: number;
  literacyRate: number;
  urbanizationRate: number;
  officialLanguages: string[];
  currencyCode: CurrencyCode;
  governmentType: string;
}

export interface EducationSystemProfile {
  structure: string;
  compulsoryYears: number;
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  studentTeacherRatio: number;
  enrollmentRates: EnrollmentRate;
  graduationRates: GraduationRate;
  literacyRate: number;
  expenditurePercentageGDP: number;
}

export interface EnrollmentRate {
  primary: number;
  secondary: number;
  tertiary: number;
  gross: number;
  net: number;
}

export interface GraduationRate {
  primary: number;
  secondary: number;
  tertiary: number;
}

export interface GovernanceStructureProfile {
  ministryName: string;
  governanceType: GovernanceType;
  decentralizationLevel: string;
  qualityAssuranceBody: string;
  accreditationBody: string;
  curriculumBody: string;
  examinationBody: string;
  statisticsBody: string;
}

export interface PolicyLandscapeProfile {
  nationalEducationPolicy: string;
  nationalQualificationsFramework: string;
  curriculumFramework: string;
  teacherPolicy: string;
  assessmentPolicy: string;
  technologyPolicy: string;
  inclusionPolicy: string;
  recentReforms: string[];
}

export interface CountryComplianceProfile {
  internationalAgreements: string[];
  complianceLevels: Record<string, ComplianceLevel>;
  auditHistory: string[];
  pendingReviews: string[];
}

export interface CountryCapacityProfile {
  institutionalCapacity: number;
  humanResourceCapacity: number;
  financialCapacity: number;
  technologicalCapacity: number;
  capacityGaps: string[];
  capacityBuildingNeeds: string[];
}

export interface InternationalEngagementProfile {
  memberships: string[];
  activePartnerships: string[];
  fundingReceived: number;
  fundingProvided: number;
  keyInitiatives: string[];
}

export interface CountryContact {
  contactType: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  organization: string;
}
