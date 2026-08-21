export enum SkillLevel {
  BEGINNER = "BEGINNER",
  ELEMENTARY = "ELEMENTARY",
  INTERMEDIATE = "INTERMEDIATE",
  UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTERY = "MASTERY",
}

export enum SkillCategory {
  TECHNICAL = "TECHNICAL",
  SOFT = "SOFT",
  DIGITAL = "DIGITAL",
  LANGUAGE = "LANGUAGE",
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
  VOCATIONAL = "VOCATIONAL",
  LEADERSHIP = "LEADERSHIP",
  CREATIVE = "CREATIVE",
  RESEARCH = "RESEARCH",
}

export enum CompetencyType {
  CORE = "CORE",
  FUNCTIONAL = "FUNCTIONAL",
  BEHAVIORAL = "BEHAVIORAL",
  TECHNICAL = "TECHNICAL",
  MANAGEMENT = "MANAGEMENT",
  LEADERSHIP = "LEADERSHIP",
  DOMAIN = "DOMAIN",
}

export enum OccupationType {
  PROFESSIONAL = "PROFESSIONAL",
  TECHNICAL = "TECHNICAL",
  MANAGERIAL = "MANAGERIAL",
  CLERICAL = "CLERICAL",
  SERVICE = "SERVICE",
  SALES = "SALES",
  AGRICULTURAL = "AGRICULTURAL",
  CRAFT = "CRAFT",
  PLANT_OPERATORS = "PLANT_OPERATORS",
  ELEMENTARY = "ELEMENTARY",
}

export enum MappingStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
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
}

export enum PassportStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  UPDATED = "UPDATED",
}

export enum EquivalenceType {
  EXACT = "EXACT",
  EQUIVALENT = "EQUIVALENT",
  PARTIAL = "PARTIAL",
  APPROXIMATE = "APPROXIMATE",
  NOT_EQUIVALENT = "NOT_EQUIVALENT",
}

export enum GapType {
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  KNOWLEDGE = "KNOWLEDGE",
  EXPERIENCE = "EXPERIENCE",
  CERTIFICATION = "CERTIFICATION",
  CREDENTIAL = "CREDENTIAL",
}

export enum SkillSource {
  CURRICULUM = "CURRICULUM",
  ASSESSMENT = "ASSESSMENT",
  SELF_DECLARED = "SELF_DECLARED",
  PEER_VALIDATED = "PEER_VALIDATED",
  INSTITUTIONAL = "INSTITUTIONAL",
  INDUSTRY = "INDUSTRY",
  AI_INFERRED = "AI_INFERRED",
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

export enum CompetencyLevel {
  FOUNDATION = "FOUNDATION",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTERY = "MASTERY",
}

export enum SkillVerificationStatus {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  DISPUTED = "DISPUTED",
}

export enum MappingDirection {
  A_TO_B = "A_TO_B",
  B_TO_A = "B_TO_A",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum AssessmentType {
  FORMAL = "FORMAL",
  INFORMAL = "INFORMAL",
  SELF = "SELF",
  PEER = "PEER",
  AI = "AI",
  PORTFOLIO = "PORTFOLIO",
  OBSERVATION = "OBSERVATION",
}

export enum SkillRelationType {
  PREREQUISITE = "PREREQUISITE",
  RELATED = "RELATED",
  SIMILAR = "SIMILAR",
  BROADER = "BROADER",
  NARROWER = "NARROWER",
  CONFLICTS = "CONFLICTS",
  SUPPORTS = "SUPPORTS",
}

export enum PassportFormat {
  PDF = "PDF",
  JSON = "JSON",
  JSON_LD = "JSON_LD",
  DIGITAL = "DIGITAL",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum SkillMatchType {
  EXACT = "EXACT",
  PARTIAL = "PARTIAL",
  SEMANTIC = "SEMANTIC",
  HIERARCHICAL = "HIERARCHICAL",
}

export enum IndustrySector {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  FINANCE = "FINANCE",
  MANUFACTURING = "MANUFACTURING",
  CONSTRUCTION = "CONSTRUCTION",
  AGRICULTURE = "AGRICULTURE",
  RETAIL = "RETAIL",
  TRANSPORTATION = "TRANSPORTATION",
  GOVERNMENT = "GOVERNMENT",
  ENERGY = "ENERGY",
  TELECOMMUNICATIONS = "TELECOMMUNICATIONS",
  OTHER = "OTHER",
}

export enum CertificationStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum LearningOutcomeType {
  KNOWLEDGE = "KNOWLEDGE",
  SKILL = "SKILL",
  COMPETENCE = "COMPETENCE",
  ATTITUDE = "ATTITUDE",
}

export enum SkillGapPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum AuditAction {
  SKILL_ADDED = "SKILL_ADDED",
  SKILL_UPDATED = "SKILL_UPDATED",
  SKILL_REMOVED = "SKILL_REMOVED",
  SKILL_VERIFIED = "SKILL_VERIFIED",
  SKILL_REVOKED = "SKILL_REVOKED",
  MAPPING_CREATED = "MAPPING_CREATED",
  MAPPING_UPDATED = "MAPPING_UPDATED",
  MAPPING_DELETED = "MAPPING_DELETED",
  GAP_IDENTIFIED = "GAP_IDENTIFIED",
  GAP_RESOLVED = "GAP_RESOLVED",
  PASSPORT_CREATED = "PASSPORT_CREATED",
  PASSPORT_UPDATED = "PASSPORT_UPDATED",
  PASSPORT_REVOKED = "PASSPORT_REVOKED",
  EQUIVALENCE_CALCULATED = "EQUIVALENCE_CALCULATED",
  COMPETENCY_MAPPED = "COMPETENCY_MAPPED",
}

export enum NotificationType {
  SKILL_VERIFIED = "SKILL_VERIFIED",
  SKILL_EXPIRING = "SKILL_EXPIRING",
  SKILL_REVOKED = "SKILL_REVOKED",
  GAP_IDENTIFIED = "GAP_IDENTIFIED",
  MAPPING_APPROVED = "MAPPING_APPROVED",
  PASSPORT_UPDATED = "PASSPORT_UPDATED",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
}

export interface Skill {
  id: string;
  skillId: string;
  name: string;
  description: string;
  category: SkillCategory;
  level: SkillLevel;
  framework: SkillFramework;
  frameworkId: string | null;
  schoolId: string;
  source: SkillSource;
  parentSkillId: string | null;
  childSkills: string[];
  relatedSkills: SkillRelation[];
  tags: string[];
  occupations: SkillOccupation[];
  industries: IndustrySector[];
  verificationStatus: SkillVerificationStatus;
  verificationMethod: VerificationMethod | null;
  verifiedAt: string | null;
  expiresAt: string | null;
  proficiencyScore: number | null;
  evidence: SkillEvidence[];
  metadata: SkillMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillMapping {
  id: string;
  sourceSkillId: string;
  sourceSkillName: string;
  sourceFramework: SkillFramework;
  targetSkillId: string;
  targetSkillName: string;
  targetFramework: SkillFramework;
  mappingType: EquivalenceType;
  direction: MappingDirection;
  confidence: number;
  equivalenceScore: number;
  schoolId: string;
  status: MappingStatus;
  verifiedBy: string | null;
  verifiedAt: string | null;
  notes: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillEquivalence {
  id: string;
  sourceSkillId: string;
  sourceSkillName: string;
  targetSkillId: string;
  targetSkillName: string;
  equivalenceType: EquivalenceType;
  equivalenceScore: number;
  conversionNotes: string[];
  sourceLevel: SkillLevel;
  targetLevel: SkillLevel;
  confidence: number;
  country: string | null;
  institution: string | null;
  schoolId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillGap {
  id: string;
  studentId: string;
  requiredSkillId: string;
  requiredSkillName: string;
  requiredLevel: SkillLevel;
  currentLevel: SkillLevel | null;
  gapLevel: number;
  gapType: GapType;
  priority: SkillGapPriority;
  recommendedActions: GapRecommendedAction[];
  targetDate: string | null;
  status: string;
  schoolId: string;
  identifiedAt: string;
  resolvedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface SkillVerification {
  id: string;
  skillId: string;
  verificationMethod: VerificationMethod;
  status: SkillVerificationStatus;
  verifierId: string;
  verifierName: string;
  verifierType: string;
  evidence: VerificationEvidence[];
  confidenceScore: number;
  verifiedAt: string;
  expiresAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillPassport {
  id: string;
  passportId: string;
  holderId: string;
  holderName: string;
  passportStatus: PassportStatus;
  passportFormat: PassportFormat;
  skills: PassportSkill[];
  competencies: PassportCompetency[];
  certifications: PassportCertification[];
  learningOutcomes: PassportLearningOutcome[];
  totalSkills: number;
  verifiedSkills: number;
  skillLevelDistribution: Record<string, number>;
  qrCode: string;
  verificationUrl: string;
  digitalSignature: string;
  blockchainHash: string | null;
  schoolId: string;
  issuedAt: string;
  expiresAt: string | null;
  lastUpdatedAt: string;
  metadata: PassportMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Competency {
  id: string;
  competencyId: string;
  name: string;
  description: string;
  type: CompetencyType;
  level: CompetencyLevel;
  framework: SkillFramework;
  frameworkId: string | null;
  schoolId: string;
  parentCompetencyId: string | null;
  childCompetencies: string[];
  relatedCompetencies: string[];
  skills: string[];
  indicators: CompetencyIndicator[];
  assessmentCriteria: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CompetencyMapping {
  id: string;
  sourceCompetencyId: string;
  sourceCompetencyName: string;
  targetCompetencyId: string;
  targetCompetencyName: string;
  mappingType: EquivalenceType;
  direction: MappingDirection;
  confidence: number;
  schoolId: string;
  status: MappingStatus;
  verifiedBy: string | null;
  verifiedAt: string | null;
  notes: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LearningOutcome {
  id: string;
  outcomeId: string;
  name: string;
  description: string;
  type: LearningOutcomeType;
  level: SkillLevel;
  framework: SkillFramework;
  schoolId: string;
  relatedSkills: string[];
  relatedCompetencies: string[];
  assessmentMethods: AssessmentType[];
  bloomLevel: string | null;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Occupation {
  id: string;
  occupationId: string;
  name: string;
  description: string;
  type: OccupationType;
  framework: SkillFramework;
  frameworkId: string | null;
  schoolId: string;
  requiredSkills: OccupationSkill[];
  preferredSkills: OccupationSkill[];
  industries: IndustrySector[];
  educationLevel: string | null;
  experienceLevel: string | null;
  salaryRange: SalaryRange | null;
  outlook: string | null;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface JobSkill {
  id: string;
  jobId: string;
  jobTitle: string;
  skillId: string;
  skillName: string;
  requiredLevel: SkillLevel;
  isRequired: boolean;
  weight: number;
  industry: IndustrySector;
  occupationType: OccupationType;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface AcademicSkill {
  id: string;
  curriculumId: string;
  programName: string;
  courseId: string | null;
  courseName: string | null;
  skillId: string;
  skillName: string;
  level: SkillLevel;
  credits: number | null;
  learningOutcomes: string[];
  assessmentMethods: AssessmentType[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface ProfessionalSkill {
  id: string;
  professionalId: string;
  skillId: string;
  skillName: string;
  level: SkillLevel;
  yearsOfExperience: number;
  lastUsed: string;
  verificationStatus: SkillVerificationStatus;
  certificationId: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillConfig {
  id: string;
  schoolId: string;
  defaultFramework: SkillFramework;
  allowedFrameworks: SkillFramework[];
  defaultVerificationMethod: VerificationMethod;
  allowedVerificationMethods: VerificationMethod[];
  autoVerify: boolean;
  requireEvidence: boolean;
  skillExpirationDays: number;
  passportExpirationDays: number;
  enableBlockchain: boolean;
  enableAI: boolean;
  gapAnalysisEnabled: boolean;
  equivalenceEngineEnabled: boolean;
  webhookEndpoints: WebhookEndpoint[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalSkills: number;
  verifiedSkills: number;
  pendingVerifications: number;
  expiredSkills: number;
  totalCompetencies: number;
  mappedCompetencies: number;
  totalPassports: number;
  activePassports: number;
  totalGaps: number;
  resolvedGaps: number;
  averageVerificationTime: number;
  averageGapResolutionTime: number;
  verificationSuccessRate: number;
  mappingSuccessRate: number;
  skillDistribution: Record<string, number>;
  competencyDistribution: Record<string, number>;
  topSkills: SkillRanking[];
  topGaps: GapRanking[];
  metricsBreakdown: SkillMetricsBreakdown;
  computedAt: string;
}

export interface SkillRelation {
  id: string;
  sourceSkillId: string;
  targetSkillId: string;
  relationType: SkillRelationType;
  weight: number;
  description: string;
  schoolId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillOccupation {
  occupationId: string;
  occupationName: string;
  relevance: number;
  isRequired: boolean;
}

export interface SkillEvidence {
  type: string;
  name: string;
  description: string;
  url: string | null;
  hash: string | null;
  verifiedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface SkillMetadata {
  version: string;
  source: string;
  tags: string[];
  customFields: Record<string, unknown>;
}

export interface CompetencyIndicator {
  id: string;
  name: string;
  description: string;
  type: string;
  level: CompetencyLevel;
}

export interface PassportSkill {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  category: SkillCategory;
  verified: boolean;
  verifiedAt: string | null;
  expiresAt: string | null;
  evidence: SkillEvidence[];
}

export interface PassportCompetency {
  competencyId: string;
  competencyName: string;
  level: CompetencyLevel;
  type: CompetencyType;
  verified: boolean;
  verifiedAt: string | null;
}

export interface PassportCertification {
  certificationId: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  status: CertificationStatus;
  credentialUrl: string | null;
}

export interface PassportLearningOutcome {
  outcomeId: string;
  name: string;
  type: LearningOutcomeType;
  level: SkillLevel;
  achieved: boolean;
  achievedAt: string | null;
}

export interface PassportMetadata {
  version: string;
  schemaVersion: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  lastUpdatedAt: string;
}

export interface VerificationEvidence {
  type: string;
  url: string | null;
  hash: string | null;
  verifiedAt: string;
  metadata: Record<string, unknown>;
}

export interface GapRecommendedAction {
  actionType: string;
  description: string;
  skillId: string;
  skillName: string;
  targetLevel: SkillLevel;
  estimatedDuration: string;
  resourceUrl: string | null;
  priority: SkillGapPriority;
}

export interface OccupationSkill {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  isRequired: boolean;
  weight: number;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: string;
}

export interface SkillRanking {
  skillId: string;
  skillName: string;
  count: number;
  rank: number;
}

export interface GapRanking {
  skillId: string;
  skillName: string;
  gapCount: number;
  rank: number;
}

export interface SkillMetricsBreakdown {
  byCategory: Record<string, number>;
  byLevel: Record<string, number>;
  byFramework: Record<string, number>;
  byIndustry: Record<string, number>;
  byMonth: Record<string, number>;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  retryPolicy: RetryPolicy;
  metadata: Record<string, unknown>;
}

export interface RetryPolicy {
  maxRetries: number;
  retryInterval: number;
  backoffMultiplier: number;
}

export interface SkillSearchQuery {
  query: string;
  filters: SkillSearchFilter[];
  sort: SkillSearchSort[];
  pagination: SkillSearchPagination;
}

export interface SkillSearchFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface SkillSearchSort {
  field: string;
  direction: string;
}

export interface SkillSearchPagination {
  page: number;
  pageSize: number;
  totalCount: number | null;
}

export interface SkillSearchResult {
  skills: Skill[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface SkillGapAnalysisRequest {
  studentId: string;
  targetOccupationId: string | null;
  targetProgramId: string | null;
  requiredSkills: string[];
  includeRecommendations: boolean;
}

export interface SkillGapAnalysisResult {
  id: string;
  studentId: string;
  totalRequiredSkills: number;
  matchedSkills: number;
  gapSkills: number;
  gaps: SkillGap[];
  matchPercent: number;
  recommendations: GapRecommendedAction[];
  overallScore: number;
  schoolId: string;
  analyzedAt: string;
  metadata: Record<string, unknown>;
}

export interface SkillEquivalenceRequest {
  sourceSkillId: string;
  targetFramework: SkillFramework;
  sourceCountry: string | null;
  targetCountry: string | null;
}

export interface SkillEquivalenceResult {
  id: string;
  sourceSkill: Skill;
  equivalences: SkillEquivalence[];
  bestMatch: SkillEquivalence | null;
  confidence: number;
  computedAt: string;
  metadata: Record<string, unknown>;
}

export interface SkillPassportExportRequest {
  passportId: string;
  format: PassportFormat;
  includeEvidence: boolean;
  includeBlockchain: boolean;
}

export interface SkillPassportExportResult {
  exportId: string;
  format: PassportFormat;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface SkillBulkImport {
  id: string;
  batchId: string;
  sourceFormat: string;
  sourceUrl: string;
  totalCount: number;
  processedCount: number;
  successCount: number;
  failedCount: number;
  status: string;
  initiatedBy: string;
  startedAt: string;
  completedAt: string | null;
  errors: string[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillHealthCheck {
  status: HealthStatus;
  version: string;
  uptime: number;
  checks: HealthCheckItem[];
  lastChecked: string;
}

export interface HealthCheckItem {
  name: string;
  status: HealthStatus;
  latency: number;
  message: string | null;
  lastChecked: string;
}

export enum SkillLifecycleStage {
  DRAFT = "DRAFT",
  PROPOSED = "PROPOSED",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  MATURE = "MATURE",
  DECLINING = "DECLINING",
  DEPRECATED = "DEPRECATED",
  RETIRED = "RETIRED",
}

export enum SkillVerificationLevel {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  ENHANCED = "ENHANCED",
  PREMIUM = "PREMIUM",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum CompetencyAssessmentMethod {
  SELF_ASSESSMENT = "SELF_ASSESSMENT",
  PEER_ASSESSMENT = "PEER_ASSESSMENT",
  MANAGER_ASSESSMENT = "MANAGER_ASSESSMENT",
  AI_ASSESSMENT = "AI_ASSESSMENT",
  FORMAL_TEST = "FORMAL_TEST",
  PORTFOLIO_REVIEW = "PORTFOLIO_REVIEW",
  OBSERVATION = "OBSERVATION",
}

export enum SkillMatchConfidence {
  EXACT = "EXACT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
}

export enum GapResolutionStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  WONT_FIX = "WONT_FIX",
  DEFERRED = "DEFERRED",
}

export enum SkillEndorsementStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REVOKED = "REVOKED",
}

export enum CompetencyFrameworkType {
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  INDUSTRY = "INDUSTRY",
  INSTITUTIONAL = "CUSTOM",
  ACADEMIC = "ACADEMIC",
}

export enum SkillEvidenceType {
  CERTIFICATE = "CERTIFICATE",
  PORTFOLIO = "PORTFOLIO",
  PROJECT = "PROJECT",
  ASSESSMENT = "ASSESSMENT",
  RECOMMENDATION = "RECOMMENDATION",
  PUBLICATION = "PUBLICATION",
  AWARD = "AWARD",
  EXPERIENCE = "EXPERIENCE",
}

export enum PassportRevocationReason {
  HOLDER_REQUEST = "HOLDER_REQUEST",
  FRAUD = "FRAUD",
  EXPIRED = "EXPIRED",
  SUPERSEDED = "SUPERSEDED",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum SkillExportFormat {
  PDF = "PDF",
  JSON = "JSON",
  JSON_LD = "JSON_LD",
  CSV = "CSV",
  XML = "XML",
}

export enum CompetencyProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  ACHIEVED = "ACHIEVED",
  EXCEEDED = "EXCEEDED",
  MAINTAINED = "MAINTAINED",
}

export enum SkillRecommendationType {
  SIMILAR = "SIMILAR",
  PREREQUISITE = "PREREQUISITE",
  COMPLEMENTARY = "COMPLEMENTARY",
  TRENDING = "TRENDING",
  GAP_BASED = "GAP_BASED",
  CAREER_BASED = "CAREER_BASED",
}

export enum OccupationSkillDemand {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  DECLINING = "DECLINING",
  EMERGING = "EMERGING",
}

export enum SkillMatchTypeType {
  EXACT = "EXACT",
  PARTIAL = "PARTIAL",
  SEMANTIC = "SEMANTIC",
  HIERARCHICAL = "HIERARCHICAL",
}

export interface SkillLifecycleEvent {
  id: string;
  skillId: string;
  stage: SkillLifecycleStage;
  eventTimestamp: string;
  actor: string;
  actorType: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface SkillVerificationRecord {
  id: string;
  skillId: string;
  verificationLevel: SkillVerificationLevel;
  verifierId: string;
  verifierName: string;
  verifierType: string;
  verifiedAt: string;
  expiresAt: string | null;
  confidence: number;
  evidence: SkillEvidenceRecord[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CompetencyAssessmentRecord {
  id: string;
  competencyId: string;
  studentId: string;
  assessmentMethod: CompetencyAssessmentMethod;
  score: number;
  maxScore: number;
  level: CompetencyLevel;
  assessorId: string;
  assessorName: string;
  assessedAt: string;
  feedback: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillMatchResult {
  sourceSkillId: string;
  sourceSkillName: string;
  targetSkillId: string;
  targetSkillName: string;
  matchType: SkillMatchType;
  confidence: SkillMatchConfidence;
  score: number;
  explanation: string;
}

export interface GapResolutionPlan {
  id: string;
  gapId: string;
  status: GapResolutionStatus;
  actions: GapResolutionAction[];
  targetDate: string | null;
  assignedTo: string | null;
  notes: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GapResolutionAction {
  actionType: string;
  description: string;
  skillId: string;
  skillName: string;
  targetLevel: SkillLevel;
  estimatedDuration: string;
  resourceUrl: string | null;
  status: string;
}

export interface SkillEndorsement {
  id: string;
  skillId: string;
  endorserId: string;
  endorserName: string;
  endorserRelationship: string;
  status: SkillEndorsementStatus;
  comment: string;
  endorsedAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CompetencyFrameworkMapping {
  id: string;
  sourceFramework: CompetencyFrameworkType;
  targetFramework: CompetencyFrameworkType;
  sourceCompetencyId: string;
  targetCompetencyId: string;
  mappingType: EquivalenceType;
  confidence: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillEvidenceRecord {
  id: string;
  skillId: string;
  evidenceType: SkillEvidenceType;
  name: string;
  description: string;
  url: string | null;
  hash: string | null;
  mimeType: string | null;
  size: number | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillPassportRevocation {
  id: string;
  passportId: string;
  reason: PassportRevocationReason;
  revokedBy: string;
  revokedAt: string;
  description: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillExportRequest {
  skillIds: string[];
  format: SkillExportFormat;
  includeEvidence: boolean;
  includeVerificationStatus: boolean;
  schoolId: string;
}

export interface SkillExportResult {
  exportId: string;
  format: SkillExportFormat;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  schoolId: string;
}

export interface CompetencyProgressRecord {
  id: string;
  competencyId: string;
  studentId: string;
  status: CompetencyProgressStatus;
  currentLevel: CompetencyLevel;
  targetLevel: CompetencyLevel;
  progressPercent: number;
  lastAssessedAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillRecommendation {
  id: string;
  skillId: string;
  skillName: string;
  recommendationType: SkillRecommendationType;
  confidence: number;
  reason: string;
  relatedOccupations: string[];
  estimatedLearningTime: string;
  resources: SkillResource[];
  schoolId: string;
}

export interface SkillResource {
  resourceType: string;
  title: string;
  url: string;
  provider: string;
  duration: string | null;
  cost: number | null;
  rating: number | null;
}

export interface OccupationSkillDemandRecord {
  occupationId: string;
  skillId: string;
  skillName: string;
  demand: OccupationSkillDemand;
  demandScore: number;
  trendDirection: string;
  trendPercent: number;
  projectedDemand: string;
  lastUpdated: string;
  schoolId: string;
}

export interface SkillBulkVerificationRequest {
  skillIds: string[];
  verificationMethod: VerificationMethod;
  verifierId: string;
  schoolId: string;
}

export interface SkillBulkVerificationResult {
  batchId: string;
  totalCount: number;
  verifiedCount: number;
  failedCount: number;
  results: SkillVerificationResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillVerificationResultItem {
  skillId: string;
  status: string;
  verificationId: string | null;
  error: string | null;
}

export interface SkillSearchFilter {
  field: string;
  operator: string;
  value: unknown;
  type: string;
}

export interface SkillSearchSort {
  field: string;
  direction: string;
}

export interface SkillSearchRequest {
  query: string;
  filters: SkillSearchFilter[];
  sort: SkillSearchSort[];
  page: number;
  pageSize: number;
  schoolId: string;
}

export interface SkillSearchResponse {
  results: Skill[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface CompetencySearchRequest {
  query: string;
  filters: SkillSearchFilter[];
  sort: SkillSearchSort[];
  page: number;
  pageSize: number;
  schoolId: string;
}

export interface CompetencySearchResponse {
  results: Competency[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface SkillAuditSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  recentEvents: SkillLifecycleEvent[];
  period: string;
  schoolId: string;
}

export interface SkillDashboardMetrics {
  totalSkills: number;
  verifiedSkills: number;
  totalCompetencies: number;
  mappedCompetencies: number;
  totalPassports: number;
  activePassports: number;
  totalGaps: number;
  resolvedGaps: number;
  topSkills: SkillRanking[];
  topGaps: GapRanking[];
  period: string;
  schoolId: string;
}

export interface SkillComparisonRequest {
  skillIds: string[];
  comparisonFields: string[];
  includeMappings: boolean;
  schoolId: string;
}

export interface SkillComparisonResult {
  skills: Skill[];
  differences: SkillDifference[];
  summary: string;
  computedAt: string;
  schoolId: string;
}

export interface SkillDifference {
  field: string;
  skill1Value: unknown;
  skill2Value: unknown;
  differenceType: string;
  significance: string;
}

export interface CompetencyTree {
  rootCompetency: Competency;
  children: CompetencyTree[];
  depth: number;
  totalDescendants: number;
}

export interface SkillGraph {
  nodes: SkillGraphNode[];
  edges: SkillGraphEdge[];
  metadata: Record<string, unknown>;
}

export interface SkillGraphNode {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  level: SkillLevel;
  x: number;
  y: number;
}

export interface SkillGraphEdge {
  sourceSkillId: string;
  targetSkillId: string;
  relationType: SkillRelationType;
  weight: number;
}

export interface SkillNotification {
  id: string;
  notificationType: NotificationType;
  recipientId: string;
  skillId: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
  schoolId: string;
}

export interface SkillConfigUpdate {
  defaultFramework?: SkillFramework;
  allowedFrameworks?: SkillFramework[];
  defaultVerificationMethod?: VerificationMethod;
  autoVerify?: boolean;
  requireEvidence?: boolean;
  skillExpirationDays?: number;
  passportExpirationDays?: number;
  enableBlockchain?: boolean;
  enableAI?: boolean;
  gapAnalysisEnabled?: boolean;
  equivalenceEngineEnabled?: boolean;
}

export enum SkillRatingType {
  SELF_RATING = "SELF_RATING",
  PEER_RATING = "PEER_RATING",
  MANAGER_RATING = "MANAGER_RATING",
  AI_RATING = "AI_RATING",
  ASSESSMENT_RATING = "ASSESSMENT_RATING",
}

export enum SkillProficiencyUnit {
  YEARS = "YEARS",
  PROJECTS = "PROJECTS",
  HOURS = "HOURS",
  SCORE = "SCORE",
  LEVEL = "LEVEL",
}

export enum SkillTrendDirection {
  RISING = "RISING",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
  EMERGING = "EMERGING",
  OBSOLETE = "OBSOLETE",
}

export enum CompetencyFrameworkVersion {
  V1 = "V1",
  V2 = "V2",
  V3 = "V3",
  CUSTOM = "CUSTOM",
}

export enum SkillAssessmentFormat {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  PRACTICAL = "PRACTICAL",
  PORTFOLIO = "PORTFOLIO",
  INTERVIEW = "INTERVIEW",
  PROJECT = "PROJECT",
  OBSERVATION = "OBSERVATION",
  SIMULATION = "SIMULATION",
}

export enum SkillEndorsementType {
  PROFESSIONAL = "PROFESSIONAL",
  ACADEMIC = "ACADEMIC",
  PEER = "PEER",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum PassportIssuanceMethod {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum SkillCompetencyAlignment {
  FULLY_ALIGNED = "FULLY_ALIGNED",
  PARTIALLY_ALIGNED = "PARTIALLY_ALIGNED",
  NOT_ALIGNED = "NOT_ALIGNED",
  OVER_ALIGNED = "OVER_ALIGNED",
}

export enum SkillDataQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  UNKNOWN = "UNKNOWN",
}

export interface SkillRating {
  id: string;
  skillId: string;
  raterId: string;
  raterName: string;
  ratingType: SkillRatingType;
  score: number;
  maxScore: number;
  comment: string | null;
  ratedAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillProficiency {
  id: string;
  skillId: string;
  studentId: string;
  proficiencyLevel: SkillLevel;
  proficiencyScore: number;
  unit: SkillProficiencyUnit;
  yearsOfExperience: number | null;
  lastUsed: string;
  verified: boolean;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillTrend {
  id: string;
  skillId: string;
  skillName: string;
  direction: SkillTrendDirection;
  demandScore: number;
  supplyScore: number;
  growthRate: number;
  period: string;
  schoolId: string;
}

export interface CompetencyFrameworkRecord {
  id: string;
  frameworkId: string;
  name: string;
  type: CompetencyFrameworkType;
  version: CompetencyFrameworkVersion;
  country: CountryCode | null;
  totalCompetencies: number;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillAssessmentRecord {
  id: string;
  skillId: string;
  studentId: string;
  assessmentFormat: SkillAssessmentFormat;
  score: number;
  maxScore: number;
  passingScore: number;
  passed: boolean;
  assessorId: string | null;
  assessedAt: string;
  expiresAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillEndorsementRecord {
  id: string;
  skillId: string;
  endorserId: string;
  endorserName: string;
  endorserTitle: string | null;
  endorsementType: SkillEndorsementType;
  comment: string;
  rating: number | null;
  status: SkillEndorsementStatus;
  endorsedAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillPassportIssuance {
  id: string;
  passportId: string;
  issuanceMethod: PassportIssuanceMethod;
  issuedBy: string;
  issuedByName: string;
  issuedAt: string;
  validUntil: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface SkillCompetencyAlignmentRecord {
  id: string;
  skillId: string;
  competencyId: string;
  alignment: SkillCompetencyAlignment;
  alignmentScore: number;
  coveragePercent: number;
  gaps: string[];
  overlaps: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillDataQualityReport {
  id: string;
  skillId: string;
  quality: SkillDataQuality;
  completenessScore: number;
  accuracyScore: number;
  timelinessScore: number;
  consistencyScore: number;
  issues: SkillDataQualityIssue[];
  assessedAt: string;
  schoolId: string;
}

export interface SkillDataQualityIssue {
  field: string;
  issueType: string;
  severity: string;
  message: string;
  suggestion: string;
}

export interface SkillOccupationMapping {
  id: string;
  skillId: string;
  occupationId: string;
  occupationName: string;
  relevance: number;
  isRequired: boolean;
  demand: OccupationSkillDemand;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillIndustryMapping {
  id: string;
  skillId: string;
  industry: IndustrySector;
  relevance: number;
  isRequired: boolean;
  demandScore: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CompetencyAssessmentConfig {
  id: string;
  competencyId: string;
  assessmentMethod: CompetencyAssessmentMethod;
  passingScore: number;
  maxAttempts: number;
  validityPeriod: number | null;
  requiresEvidence: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillGapAnalysisConfig {
  id: string;
  schoolId: string;
  autoAnalysis: boolean;
  analysisFrequency: string;
  includeRecommendations: boolean;
  includeResources: boolean;
  confidenceThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillPassportConfig {
  id: string;
  schoolId: string;
  defaultFormat: PassportFormat;
  allowedFormats: PassportFormat[];
  expirationDays: number;
  requireVerification: boolean;
  enableBlockchain: boolean;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SkillVerificationConfig {
  id: string;
  schoolId: string;
  defaultMethod: VerificationMethod;
  allowedMethods: VerificationMethod[];
  autoVerify: boolean;
  requireEvidence: boolean;
  confidenceThreshold: number;
  expirationDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillEquivalenceConfig {
  id: string;
  schoolId: string;
  enabledMethods: EquivalenceMethod[];
  confidenceThreshold: number;
  requireManualReview: boolean;
  supportedFrameworks: SkillFramework[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillBulkImportRequest {
  sourceFormat: string;
  sourceUrl: string;
  mappingConfig: Record<string, unknown>;
  schoolId: string;
}

export interface SkillBulkImportResult {
  importId: string;
  totalCount: number;
  importedCount: number;
  failedCount: number;
  skippedCount: number;
  errors: string[];
  warnings: string[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface CompetencyBulkImportRequest {
  sourceFormat: string;
  sourceUrl: string;
  frameworkId: string;
  schoolId: string;
}

export interface CompetencyBulkImportResult {
  importId: string;
  totalCount: number;
  importedCount: number;
  failedCount: number;
  errors: string[];
  warnings: string[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillPassportExportRequest {
  passportId: string;
  format: SkillExportFormat;
  includeEvidence: boolean;
  includeVerificationStatus: boolean;
  includeEndorsements: boolean;
  schoolId: string;
}

export interface SkillPassportExportResult {
  exportId: string;
  format: SkillExportFormat;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  schoolId: string;
}

export interface SkillAnalyticsQuery {
  dateFrom: string;
  dateTo: string;
  groupBy: string;
  filters: Record<string, unknown>;
  schoolId: string;
}

export interface SkillAnalyticsResult {
  totalSkills: number;
  verifiedSkills: number;
  totalCompetencies: number;
  mappedCompetencies: number;
  totalPassports: number;
  skillDistribution: Record<string, number>;
  competencyDistribution: Record<string, number>;
  topSkillCategories: Record<string, number>;
  averageVerificationTime: number;
  verificationSuccessRate: number;
  period: string;
  schoolId: string;
}

export interface SkillRecommendationConfig {
  id: string;
  schoolId: string;
  enabledTypes: SkillRecommendationType[];
  maxRecommendations: number;
  considerOccupations: boolean;
  considerIndustry: boolean;
  considerTrends: boolean;
  confidenceThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillCompetencyGapSummary {
  totalCompetencies: number;
  alignedCompetencies: number;
  gapCompetencies: number;
  alignmentPercent: number;
  topGaps: SkillGap[];
  topAlignments: SkillCompetencyAlignmentRecord[];
  schoolId: string;
  computedAt: string;
}

export interface SkillNotificationConfig {
  id: string;
  schoolId: string;
  enabledTypes: NotificationType[];
  emailEnabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  frequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillEndorsementBatchRequest {
  skillIds: string[];
  endorserId: string;
  endorserName: string;
  endorsementType: SkillEndorsementType;
  comment: string;
  rating: number | null;
  schoolId: string;
}

export interface SkillEndorsementBatchResult {
  batchId: string;
  totalCount: number;
  endorsedCount: number;
  failedCount: number;
  results: SkillEndorsementResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillEndorsementResultItem {
  skillId: string;
  endorsementId: string | null;
  status: string;
  error: string | null;
}

export interface SkillVerificationBatchRequest2 {
  skillIds: string[];
  verificationMethod: VerificationMethod;
  verifierId: string;
  requireEvidence: boolean;
  schoolId: string;
}

export interface SkillVerificationBatchResult2 {
  batchId: string;
  totalCount: number;
  verifiedCount: number;
  failedCount: number;
  results: SkillVerificationResultItem2[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillVerificationResultItem2 {
  skillId: string;
  verificationId: string | null;
  status: string;
  confidence: number | null;
  error: string | null;
}

export interface SkillGapAnalysisBatchRequest {
  studentIds: string[];
  targetOccupationId: string | null;
  targetProgramId: string | null;
  requiredSkills: string[];
  includeRecommendations: boolean;
  schoolId: string;
}

export interface SkillGapAnalysisBatchResult {
  batchId: string;
  totalCount: number;
  analyzedCount: number;
  failedCount: number;
  results: SkillGapAnalysisResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillGapAnalysisResultItem {
  studentId: string;
  analysisId: string | null;
  matchPercent: number | null;
  gapCount: number | null;
  error: string | null;
}

export interface SkillPassportBatchRequest {
  holderIds: string[];
  format: PassportFormat;
  includeEvidence: boolean;
  includeVerificationStatus: boolean;
  schoolId: string;
}

export interface SkillPassportBatchResult {
  batchId: string;
  totalCount: number;
  createdCount: number;
  failedCount: number;
  results: SkillPassportResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillPassportResultItem {
  holderId: string;
  passportId: string | null;
  status: string;
  error: string | null;
}

export interface CompetencyAssessmentBatchRequest {
  studentIds: string[];
  competencyId: string;
  assessmentMethod: CompetencyAssessmentMethod;
  assessorId: string;
  schoolId: string;
}

export interface CompetencyAssessmentBatchResult {
  batchId: string;
  totalCount: number;
  assessedCount: number;
  failedCount: number;
  results: CompetencyAssessmentResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface CompetencyAssessmentResultItem {
  studentId: string;
  assessmentId: string | null;
  score: number | null;
  level: CompetencyLevel | null;
  error: string | null;
}

export interface SkillMappingBatchRequest {
  sourceFramework: SkillFramework;
  targetFramework: SkillFramework;
  sourceSkillIds: string[];
  mappingType: EquivalenceType;
  schoolId: string;
}

export interface SkillMappingBatchResult {
  batchId: string;
  totalCount: number;
  mappedCount: number;
  failedCount: number;
  results: SkillMappingResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface SkillMappingResultItem {
  sourceSkillId: string;
  mappingId: string | null;
  targetSkillId: string | null;
  equivalenceType: EquivalenceType | null;
  confidence: number | null;
  error: string | null;
}

export interface SkillExportBatchRequest {
  skillIds: string[];
  format: SkillExportFormat;
  includeEvidence: boolean;
  includeVerificationStatus: boolean;
  includeMappings: boolean;
  schoolId: string;
}

export interface SkillExportBatchResult {
  batchId: string;
  totalCount: number;
  exportedCount: number;
  failedCount: number;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  errors: string[];
  schoolId: string;
}

export interface SkillAnalyticsDashboard {
  totalSkills: number;
  verifiedSkills: number;
  totalCompetencies: number;
  mappedCompetencies: number;
  totalPassports: number;
  activePassports: number;
  totalGaps: number;
  resolvedGaps: number;
  skillDistribution: Record<string, number>;
  competencyDistribution: Record<string, number>;
  topSkillCategories: Record<string, number>;
  recentActivity: SkillLifecycleEvent[];
  period: string;
  schoolId: string;
}

export interface SkillTrendDashboard {
  risingSkills: SkillTrend[];
  decliningSkills: SkillTrend[];
  emergingSkills: SkillTrend[];
  obsoleteSkills: SkillTrend[];
  topDemandSkills: SkillTrend[];
  period: string;
  schoolId: string;
}

export interface CompetencyAlignmentDashboard {
  totalCompetencies: number;
  fullyAligned: number;
  partiallyAligned: number;
  notAligned: number;
  alignmentPercent: number;
  topAlignments: SkillCompetencyAlignmentRecord[];
  topGaps: SkillGap[];
  period: string;
  schoolId: string;
}

export interface SkillOccupationDashboard {
  totalOccupations: number;
  highDemandOccupations: number;
  mediumDemandOccupations: number;
  lowDemandOccupations: number;
  emergingOccupations: number;
  topOccupations: Occupation[];
  skillDemandByOccupation: Record<string, number>;
  period: string;
  schoolId: string;
}

export interface SkillPassportDashboard {
  totalPassports: number;
  activePassports: number;
  expiredPassports: number;
  revokedPassports: number;
  averageSkillsPerPassport: number;
  topSkillsInPassports: SkillRanking[];
  recentPassportActivity: SkillLifecycleEvent[];
  period: string;
  schoolId: string;
}

export interface SkillProcessingConfig {
  id: string;
  schoolId: string;
  autoVerify: boolean;
  autoMap: boolean;
  autoAssess: boolean;
  enableAI: boolean;
  enableBlockchain: boolean;
  defaultVerificationMethod: VerificationMethod;
  defaultSkillFramework: SkillFramework;
  confidenceThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompetencyProcessingConfig {
  id: string;
  schoolId: string;
  autoAssess: boolean;
  autoAlign: boolean;
  defaultAssessmentMethod: CompetencyAssessmentMethod;
  defaultFramework: SkillFramework;
  passingScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillExportConfig {
  id: string;
  schoolId: string;
  allowedFormats: SkillExportFormat[];
  requireEncryption: boolean;
  watermarkEnabled: boolean;
  maxExportsPerDay: number;
  retentionDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillStatistics {
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  min: number;
  max: number;
  range: number;
  total: number;
}

export interface SkillCategoryDistribution {
  category: SkillCategory;
  count: number;
  percentage: number;
  averageLevel: SkillLevel;
}

export interface SkillLevelDistribution {
  level: SkillLevel;
  count: number;
  percentage: number;
}

export interface SkillFrameworkDistribution {
  framework: SkillFramework;
  count: number;
  percentage: number;
}

export interface SkillIndustryDistribution {
  industry: IndustrySector;
  count: number;
  percentage: number;
  averageDemand: OccupationSkillDemand;
}

export interface CompetencyLevelStatistics {
  level: CompetencyLevel;
  count: number;
  percentage: number;
  averageAssessmentScore: number | null;
}

export interface SkillGapStatistics {
  averageGapLevel: number;
  medianGapLevel: number;
  maxGapLevel: number;
  minGapLevel: number;
  totalGaps: number;
  resolvedGaps: number;
  openGaps: number;
  averageResolutionTime: number | null;
}

export interface SkillPassportStatistics {
  totalPassports: number;
  averageSkillsPerPassport: number;
  averageCompetenciesPerPassport: number;
  averageCertificationsPerPassport: number;
  mostCommonSkills: SkillRanking[];
  mostCommonCompetencies: SkillRanking[];
}

export interface SkillEndorsementStatistics {
  totalEndorsements: number;
  averageRating: number;
  endorsementByType: Record<string, number>;
  endorsementBySkill: Record<string, number>;
  topEndorsers: Record<string, number>;
}
