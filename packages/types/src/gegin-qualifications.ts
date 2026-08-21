export enum QualificationLevel {
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  LEVEL_4 = "LEVEL_4",
  LEVEL_5 = "LEVEL_5",
  LEVEL_6 = "LEVEL_6",
  LEVEL_7 = "LEVEL_7",
  LEVEL_8 = "LEVEL_8",
}

export enum FrameworkType {
  EQF = "EQF",
  AQRF = "AQRF",
  NRF = "NRF",
  UNESCO = "UNESCO",
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  SECTORAL = "SECTORAL",
}

export enum SkillCategory {
  TECHNICAL = "TECHNICAL",
  DIGITAL = "DIGITAL",
  SOFT = "SOFT",
  LINGUISTIC = "LINGUISTIC",
  PROFESSIONAL = "PROFESSIONAL",
  MANAGERIAL = "MANAGERIAL",
  RESEARCH = "RESEARCH",
  PEDAGOGICAL = "PEDAGOGICAL",
}

export enum CompetencyDomain {
  KNOWLEDGE = "KNOWLEDGE",
  SKILLS = "SKILLS",
  RESPONSIBILITY = "RESPONSIBILITY",
  AUTONOMY = "AUTONOMY",
  COMMUNICATION = "COMMUNICATION",
  DIGITAL = "DIGITAL",
  ENTREPRENEURSHIP = "ENTREPRENEURSHIP",
  SUSTAINABILITY = "SUSTAINABILITY",
}

export enum EquivalenceStatus {
  FULL_EQUIVALENT = "FULL_EQUIVALENT",
  PARTIAL_EQUIVALENT = "PARTIAL_EQUIVALENT",
  NOT_EQUIVALENT = "NOT_EQUIVALENT",
  CONDITIONAL = "CONDITIONAL",
  UNDER_REVIEW = "UNDER_REVIEW",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
}

export enum CreditTransferStatus {
  ACCEPTED = "ACCEPTED",
  PARTIALLY_ACCEPTED = "PARTIALLY_ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  CONDITIONAL = "CONDITIONAL",
  UNDER_EVALUATION = "UNDER_EVALUATION",
}

export enum RecognitionStatus {
  FULLY_RECOGNIZED = "FULLY_RECOGNIZED",
  PARTIALLY_RECOGNIZED = "PARTIALLY_RECOGNIZED",
  NOT_RECOGNIZED = "NOT_RECOGNIZED",
  PENDING = "PENDING",
  CONDITIONALLY_RECOGNIZED = "CONDITIONALLY_RECOGNIZED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum MappingStatus {
  DRAFT = "DRAFT",
  VALIDATED = "VALIDATED",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REVISED = "REVISED",
  WITHDRAWN = "WITHDRAWN",
}

export enum AssessmentCriteriaType {
  KNOWLEDGE = "KNOWLEDGE",
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  PERFORMANCE = "PERFORMANCE",
  PORTFOLIO = "PORTFOLIO",
  PRACTICAL = "PRACTICAL",
}

export enum CreditSystem {
  ECTS = "ECTS",
  US_CREDIT = "US_CREDIT",
  NATIONAL = "NATIONAL",
  CONTACT_HOURS = "CONTACT_HOURS",
  SELF_STUDY = "SELF_STUDY",
  MODULE_BASED = "MODULE_BASED",
}

export enum LearningOutcomeLevel {
  INTRODUCTORY = "INTRODUCTORY",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  SPECIALIST = "SPECIALIST",
}

export enum FrameworkVersion {
  CURRENT = "CURRENT",
  PREVIOUS = "PREVIOUS",
  DRAFT = "DRAFT",
  SUPERSEDED = "SUPERSEDED",
}

export enum EquivalenceRequestStatus {
  SUBMITTED = "SUBMITTED",
  UNDER_EVALUATION = "UNDER_EVALUATION",
  ADDITIONAL_INFO_REQUIRED = "ADDITIONAL_INFO_REQUIRED",
  DECISION_PENDING = "DECISION_PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  APPEALED = "APPEALED",
}

export enum CreditTransferRequestStatus {
  INITIATED = "INITIATED",
  DOCUMENTS_RECEIVED = "DOCUMENTS_RECEIVED",
  UNDER_REVIEW = "UNDER_REVIEW",
  EVALUATED = "EVALUATED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export enum RecognitionRequestStatus {
  SUBMITTED = "SUBMITTED",
  DOCUMENTS_RECEIVED = "DOCUMENTS_RECEIVED",
  UNDER_EVALUATION = "UNDER_EVALUATION",
  EXPERT_REVIEW = "EXPERT_REVIEW",
  COMMITTEE_REVIEW = "COMMITTEE_REVIEW",
  DECISION = "DECISION",
  COMPLETED = "COMPLETED",
}

export enum SkillFrameworkType {
  ESCO = "ESCO",
  ONET = "O_NET",
  NATIONAL_SKILLS = "NATIONAL_SKILLS",
  INDUSTRY = "INDUSTRY",
  CUSTOM = "CUSTOM",
}

export enum CompetencyLevel {
  AWARENESS = "AWARENESS",
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export enum SkillProficiency {
  ELEMENTARY = "ELEMENTARY",
  LIMITED = "LIMITED",
  PROFESSIONAL = "PROFESSIONAL",
  FULL = "FULL",
  MASTERY = "MASTERY",
}

export enum QualificationType {
  DEGREE = "DEGREE",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  MICRO_CREDENTIAL = "MICRO_CREDENTIAL",
  VOCATIONAL = "VOCATIONAL",
  PROFESSIONAL = "PROFESSIONAL",
  ACADEMIC = "ACADEMIC",
}

export enum QualityAssuranceType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  PEER_REVIEW = "PEER_REVIEW",
  ACCREDITATION = "ACCREDITATION",
  AUDIT = "AUDIT",
  BENCHMARKING = "BENCHMARKING",
}

export enum ReviewCycle {
  ANNUAL = "ANNUAL",
  BIENNIAL = "BIENNIAL",
  TRIENNIAL = "TRIENNIAL",
  QUADRENNIAL = "QUADRENNIAL",
  AD_HOC = "AD_HOC",
}

export enum StakeholderRole {
  GOVERNMENT = "GOVERNMENT",
  INSTITUTION = "INSTITUTION",
  INDUSTRY = "INDUSTRY",
  STUDENT = "STUDENT",
  EMPLOYER = "EMPLOYER",
  PROFESSIONAL_BODY = "PROFESSIONAL_BODY",
  INTERNATIONAL_ORG = "INTERNATIONAL_ORG",
}

export enum CreditHourType {
  LECTURE = "LECTURE",
  LABORATORY = "LABORATORY",
  SEMINAR = "SEMINAR",
  WORKSHOP = "WORKSHOP",
  PRACTICAL = "PRACTICAL",
  FIELDWORK = "FIELDWORK",
  SELF_STUDY = "SELF_STUDY",
}

export enum CreditTransferDirection {
  DOMESTIC = "DOMESTIC",
  INTERNATIONAL = "INTERNATIONAL",
  REGIONAL = "REGIONAL",
  BILATERAL = "BILATERAL",
}

export enum RecognitionMethod {
  FORMAL = "FORMAL",
  NON_FORMAL = "NON_FORMAL",
  INFORMAL = "INFORMAL",
  COMPETENCY_BASED = "COMPETENCY_BASED",
  PORTFOLIO = "PORTFOLIO",
  RPL = "RPL",
}

export enum LearningPathway {
  LINEAR = "LINEAR",
  MODULAR = "MODULAR",
  STACKABLE = "STACKABLE",
  COMPETENCY_BASED = "COMPETENCY_BASED",
  SELF_DIRECTED = "SELF_DIRECTED",
}

export enum FrameworkAlignment {
  ALIGNED = "ALIGNED",
  PARTIALLY_ALIGNED = "PARTIALLY_ALIGNED",
  NOT_ALIGNED = "NOT_ALIGNED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum StakeholderStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum BenchmarkType {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  SECTORAL = "SECTORAL",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum TrendDirection {
  UPWARD = "UPWARD",
  DOWNWARD = "DOWNWARD",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
}

export enum QualificationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
  UNDER_REVIEW = "UNDER_REVIEW",
  PENDING = "PENDING",
}

export enum CreditTransferMode {
  FULL_TRANSFER = "FULL_TRANSFER",
  PARTIAL_TRANSFER = "PARTIAL_TRANSFER",
  BLOCK_TRANSFER = "BLOCK_TRANSFER",
  COURSE_BY_COURSE = "COURSE_BY_COURSE",
  TOP_UP = "TOP_UP",
  EXEMPTION = "EXEMPTION",
}

export enum RecognitionLevel {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  CONDITIONAL = "CONDITIONAL",
  NONE = "NONE",
  PENDING = "PENDING",
}

export enum FrameworkCoverage {
  COMPREHENSIVE = "COMPREHENSIVE",
  SECTORAL = "SECTORAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  PROGRAM_SPECIFIC = "PROGRAM_SPECIFIC",
  MODULE_BASED = "MODULE_BASED",
}

export enum QualityLevel {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  SATISFACTORY = "SATISFACTORY",
  UNSATISFACTORY = "UNSATISFACTORY",
  CRITICAL = "CRITICAL",
}

export enum MappingConfidence {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  UNVERIFIED = "UNVERIFIED",
}

export enum CreditAccumulationType {
  PROGRESSIVE = "PROGRESSIVE",
  INSTANTANEOUS = "INSTANTANEOUS",
  BLOCK = "BLOCK",
  MODULAR = "MODULAR",
}

export enum QualificationAward {
  PASS = "PASS",
  MERIT = "MERIT",
  DISTINCTION = "DISTINCTION",
  HONORS = "HONORS",
  FIRST_CLASS = "FIRST_CLASS",
  SECOND_CLASS_UPPER = "SECOND_CLASS_UPPER",
  SECOND_CLASS_LOWER = "SECOND_CLASS_LOWER",
  THIRD_CLASS = "THIRD_CLASS",
}

export enum ProgramMode {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  ONLINE = "ONLINE",
  BLENDED = "BLENDED",
  DISTANCE = "DISTANCE",
  WORK_BASED = "WORK_BASED",
}

export enum CreditWeighting {
  STANDARD = "STANDARD",
  ENHANCED = "ENHANCED",
  REDUCED = "REDUCED",
  CUSTOM = "CUSTOM",
}

export enum FrameworkIntegration {
  STANDALONE = "STANDALONE",
  INTEGRATED = "INTEGRATED",
  FEDERATED = "FEDERATED",
  INTEROPERABLE = "INTEROPERABLE",
}

export enum StakeholderInvolvement {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  CONSULTED = "CONSULTED",
  INFORMED = "INFORMED",
  NONE = "NONE",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DEFERRED = "DEFERRED",
  CANCELLED = "CANCELLED",
}

export enum ImplementationPhase {
  PLANNING = "PLANNING",
  PILOT = "PILOT",
  ROLLOUT = "ROLLOUT",
  MATURITY = "MATURITY",
  RENEWAL = "RENEWAL",
}

export enum CreditTransferGovernance {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum AssessmentWeighting {
  HEAVY = "HEAVY",
  MODERATE = "MODERATE",
  LIGHT = "LIGHT",
  EQUAL = "EQUAL",
  CUSTOM = "CUSTOM",
}

export enum QualificationPathwayType {
  DIRECT = "DIRECT",
  BRIDGING = "BRIDGING",
  TOP_UP = "TOP_UP",
  TRANSFER = "TRANSFER",
  STACKABLE = "STACKABLE",
  RECOGNITION = "RECOGNITION",
}

export enum CreditEquivalenceStatus {
  EQUIVALENT = "EQUIVALENT",
  PARTIALLY_EQUIVALENT = "PARTIALLY_EQUIVALENT",
  NOT_EQUIVALENT = "NOT_EQUIVALENT",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum FrameworkUpdateType {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  CORRECTION = "CORRECTION",
  CLARIFICATION = "CLARIFICATION",
}

export enum GapType {
  SKILL = "SKILL",
  KNOWLEDGE = "KNOWLEDGE",
  COMPETENCY = "COMPETENCY",
  CREDIT = "CREDIT",
  DURATION = "DURATION",
  ASSESSMENT = "ASSESSMENT",
}

export enum CreditMappingStatus {
  MAPPED = "MAPPED",
  PARTIALLY_MAPPED = "PARTIALLY_MAPPED",
  NOT_MAPPED = "NOT_MAPPED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum ProgramOutcomeType {
  PROGRAMME = "PROGRAMME",
  COURSE = "COURSE",
  MODULE = "MODULE",
  UNIT = "UNIT",
}

export enum AssessmentMethod {
  EXAMINATION = "EXAMINATION",
  COURSEWORK = "COURSEWORK",
  PORTFOLIO = "PORTFOLIO",
  PROJECT = "PROJECT",
  DISSERTATION = "DISSERTATION",
  PRACTICAL = "PRACTICAL",
  COMBINATION = "COMBINATION",
}

export enum LevelDescriptor {
  SHORT_CYCLE = "SHORT_CYCLE",
  FIRST_CYCLE = "FIRST_CYCLE",
  SECOND_CYCLE = "SECOND_CYCLE",
  THIRD_CYCLE = "THIRD_CYCLE",
  DOCTORAL = "DOCTORAL",
}

export enum CreditVolume {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  EXTRA_LARGE = "EXTRA_LARGE",
}

export enum FrameworkScope {
  ALL_QUALIFICATIONS = "ALL_QUALIFICATIONS",
  HIGHER_EDUCATION = "HIGHER_EDUCATION",
  VOCATIONAL = "VOCATIONAL",
  GENERAL = "GENERAL",
  PROFESSIONAL = "PROFESSIONAL",
}

export enum MappingDirection {
  ONE_TO_ONE = "ONE_TO_ONE",
  ONE_TO_MANY = "ONE_TO_MANY",
  MANY_TO_ONE = "MANY_TO_ONE",
  MANY_TO_MANY = "MANY_TO_MANY",
}

export interface EuropeanQualificationFramework {
  id: string;
  frameworkName: string;
  frameworkType: FrameworkType;
  version: FrameworkVersion;
  description: string;
  levels: EQFLevel[];
  referencePoints: string[];
  learningOutcomeBased: boolean;
  stakeholderConsultation: boolean;
  qualityAssurance: string;
  lastReviewDate: string;
  nextReviewDate: string;
  officialUrl: string;
  contactAuthority: string;
  applicableCountries: string[];
  alignment: EQFAlignment;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EQFLevel {
  levelNumber: QualificationLevel;
  levelName: string;
  descriptors: EQFLevelDescriptor;
  typicalDuration: string;
  typicalCredits: number;
  creditSystem: CreditSystem;
  entryRequirements: string[];
  learningOutcomeType: ProgramOutcomeType;
  progressionPathway: string[];
  examples: string[];
}

export interface EQFLevelDescriptor {
  knowledgeDescriptor: string;
  skillsDescriptor: string;
  competenceDescriptor: string;
  autonomyDescriptor: string;
  responsibilityDescriptor: string;
}

export interface EQFAlignment {
  nationalFrameworkAlignment: FrameworkAlignment;
  regionalFrameworkAlignment: FrameworkAlignment;
  internationalFrameworkAlignment: FrameworkAlignment;
  alignmentDetails: string[];
  gaps: string[];
  recommendations: string[];
}

export interface AfricanQualificationFramework {
  id: string;
  frameworkName: string;
  frameworkType: FrameworkType;
  version: FrameworkVersion;
  description: string;
  region: string;
  memberCountries: string[];
  levels: AQRFLevel[];
  referencePoints: string[];
  learningOutcomeBased: boolean;
  stakeholderConsultation: boolean;
  qualityAssurance: string;
  lastReviewDate: string;
  nextReviewDate: string;
  officialUrl: string;
  contactAuthority: string;
  regionalEconomicCommunities: string[];
  alignment: AQRFAlignment;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AQRFLevel {
  levelNumber: QualificationLevel;
  levelName: string;
  descriptors: AQRFLevelDescriptor;
  typicalDuration: string;
  typicalCredits: number;
  creditSystem: CreditSystem;
  entryRequirements: string[];
  progressionPathway: string[];
  examples: string[];
  subFrameworks: string[];
}

export interface AQRFLevelDescriptor {
  knowledgeDescriptor: string;
  skillsDescriptor: string;
  applicationDescriptor: string;
  autonomyDescriptor: string;
  responsibilityDescriptor: string;
  contextSpecificDescriptor: string;
}

export interface AQRFAlignment {
  nationalFrameworkAlignment: FrameworkAlignment;
  internationalFrameworkAlignment: FrameworkAlignment;
  eqfAlignment: FrameworkAlignment;
  unescoAlignment: FrameworkAlignment;
  alignmentDetails: string[];
  gaps: string[];
  recommendations: string[];
}

export interface UNESCOQualificationFramework {
  id: string;
  frameworkName: string;
  frameworkType: FrameworkType;
  version: FrameworkVersion;
  description: string;
  scope: FrameworkScope;
  levels: UNESCOFrameworkLevel[];
  referencePoints: string[];
  learningOutcomeBased: boolean;
  qualityAssurance: string;
  lastReviewDate: string;
  nextReviewDate: string;
  officialUrl: string;
  contactAuthority: string;
  applicableCountries: string[];
  thematicAreas: string[];
  alignment: UNESCOFrameworkAlignment;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UNESCOFrameworkLevel {
  levelNumber: QualificationLevel;
  levelName: string;
  descriptors: UNESCOLevelDescriptor;
  typicalDuration: string;
  typicalCredits: number;
  entryRequirements: string[];
  progressionPathway: string[];
  examples: string[];
}

export interface UNESCOLevelDescriptor {
  knowledgeDescriptor: string;
  skillsDescriptor: string;
  applicationDescriptor: string;
  autonomyDescriptor: string;
  responsibilityDescriptor: string;
}

export interface UNESCOFrameworkAlignment {
  regionalAlignment: FrameworkAlignment;
  nationalAlignment: FrameworkAlignment;
  eqfAlignment: FrameworkAlignment;
  aqrfAlignment: FrameworkAlignment;
  alignmentDetails: string[];
  gaps: string[];
  recommendations: string[];
}

export interface NationalQualificationMapping {
  id: string;
  mappingName: string;
  sourceFramework: string;
  sourceCountry: string;
  targetFramework: string;
  targetCountry: string;
  status: MappingStatus;
  description: string;
  mappings: LevelMapping[];
  creditConversions: CreditConversion[];
  equivalenceResults: EquivalenceResult[];
  approvedBy: string;
  approvalDate: string;
  effectiveDate: string;
  expiryDate: string | null;
  lastReviewDate: string;
  nextReviewDate: string;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LevelMapping {
  mappingId: string;
  sourceLevel: QualificationLevel;
  targetLevel: QualificationLevel;
  mappingDirection: MappingDirection;
  equivalencies: string[];
  conditions: string[];
  notes: string;
  confidence: number;
}

export interface CreditConversion {
  conversionId: string;
  sourceCreditSystem: CreditSystem;
  sourceCredits: number;
  targetCreditSystem: CreditSystem;
  targetCredits: number;
  conversionFactor: number;
  conditions: string[];
  applicablePrograms: string[];
}

export interface EquivalenceResult {
  equivalenceId: string;
  qualificationType: string;
  sourceCountry: string;
  sourceInstitution: string;
  sourceLevel: QualificationLevel;
  targetCountry: string;
  targetLevel: QualificationLevel;
  status: EquivalenceStatus;
  conditions: string[];
  limitations: string[];
  validUntil: string | null;
}

export interface NationalQualificationFramework {
  id: string;
  frameworkName: string;
  frameworkType: FrameworkType;
  country: string;
  version: FrameworkVersion;
  description: string;
  legislativeBasis: string;
  governingBody: string;
  levels: NationalFrameworkLevel[];
  referencePoints: string[];
  learningOutcomeBased: boolean;
  qualityAssurance: string;
  lastReviewDate: string;
  nextReviewDate: string;
  officialUrl: string;
  contactAuthority: string;
  internationalAlignment: NationalFrameworkAlignment[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NationalFrameworkLevel {
  levelNumber: QualificationLevel;
  levelName: string;
  descriptors: NationalLevelDescriptor;
  typicalDuration: string;
  typicalCredits: number;
  creditSystem: CreditSystem;
  entryRequirements: string[];
  progressionPathway: string[];
  examples: string[];
  issuingAuthorities: string[];
}

export interface NationalLevelDescriptor {
  knowledgeDescriptor: string;
  skillsDescriptor: string;
  applicationDescriptor: string;
  autonomyDescriptor: string;
  responsibilityDescriptor: string;
}

export interface NationalFrameworkAlignment {
  frameworkName: string;
  frameworkType: FrameworkType;
  alignmentLevel: FrameworkAlignment;
  alignmentDetails: string[];
  lastVerified: string;
}

export interface SkillFramework {
  id: string;
  frameworkName: string;
  frameworkType: SkillFrameworkType;
  description: string;
  version: string;
  governingBody: string;
  applicableCountries: string[];
  skillCategories: SkillCategoryDefinition[];
  competencyDomains: CompetencyDomainDefinition[];
  proficiencyLevels: SkillProficiencyDefinition[];
  lastReviewDate: string;
  nextReviewDate: string;
  officialUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SkillCategoryDefinition {
  categoryId: string;
  categoryName: string;
  categoryType: SkillCategory;
  description: string;
  skills: SkillDefinition[];
  subcategories: string[];
}

export interface SkillDefinition {
  skillId: string;
  skillName: string;
  description: string;
  skillType: SkillCategory;
  proficiencyLevels: string[];
  relatedSkills: string[];
  industryRelevance: string[];
  occupationalGroups: string[];
}

export interface CompetencyDomainDefinition {
  domainId: string;
  domainName: string;
  domainType: CompetencyDomain;
  description: string;
  competencies: CompetencyDefinition[];
}

export interface CompetencyDefinition {
  competencyId: string;
  competencyName: string;
  description: string;
  domain: CompetencyDomain;
  levels: CompetencyLevelDefinition[];
  relatedCompetencies: string[];
}

export interface CompetencyLevelDefinition {
  level: CompetencyLevel;
  description: string;
  indicators: string[];
}

export interface SkillProficiencyDefinition {
  proficiency: SkillProficiency;
  description: string;
  indicators: string[];
  duration: string;
}

export interface CompetencyMapping {
  id: string;
  mappingName: string;
  qualificationId: string;
  qualificationName: string;
  qualificationLevel: QualificationLevel;
  skillFrameworkId: string;
  skillFrameworkName: string;
  status: MappingStatus;
  description: string;
  mappedCompetencies: MappedCompetency[];
  gaps: CompetencyGap[];
  coveragePercentage: number;
  approvedBy: string;
  approvalDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MappedCompetency {
  competencyId: string;
  competencyName: string;
  requiredLevel: CompetencyLevel;
  achievedLevel: CompetencyLevel;
  coverage: number;
  assessmentMethod: AssessmentMethod;
  status: string;
}

export interface CompetencyGap {
  gapId: string;
  gapType: GapType;
  description: string;
  severity: string;
  recommendation: string;
  targetDate: string;
  status: string;
}

export interface DiplomaEquivalence {
  id: string;
  equivalenceCode: string;
  requestStatus: EquivalenceRequestStatus;
  applicantName: string;
  applicantNationality: string;
  applicantId: string;
  sourceCountry: string;
  sourceInstitution: string;
  sourceQualificationType: QualificationType;
  sourceQualificationName: string;
  sourceLevel: QualificationLevel;
  sourceCredits: number;
  sourceDuration: string;
  sourceIssuedDate: string;
  sourceDocumentUrl: string;
  targetCountry: string;
  targetFramework: string;
  equivalentLevel: QualificationLevel | null;
  equivalentCredits: number | null;
  equivalenceStatus: EquivalenceStatus;
  conditions: string[];
  limitations: string[];
  recommendations: string[];
  evaluatedBy: string;
  evaluationDate: string;
  decisionDate: string | null;
  decisionAuthority: string;
  validUntil: string | null;
  certificateNumber: string | null;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreditTransfer {
  id: string;
  transferCode: string;
  requestStatus: CreditTransferRequestStatus;
  studentId: string;
  studentName: string;
  studentNationality: string;
  sourceInstitution: string;
  sourceCountry: string;
  sourceProgram: string;
  sourceCredits: number;
  sourceCreditSystem: CreditSystem;
  sourceGpa: number | null;
  sourceCompletedCourses: TransferredCourse[];
  targetInstitution: string;
  targetCountry: string;
  targetProgram: string;
  targetCreditSystem: CreditSystem;
  transferredCredits: number;
  acceptedCourses: AcceptedCourse[];
  rejectedCourses: RejectedCourse[];
  conditions: string[];
  transferDirection: CreditTransferDirection;
  status: CreditTransferStatus;
  evaluatedBy: string;
  evaluationDate: string;
  decisionDate: string | null;
  effectiveDate: string | null;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TransferredCourse {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  creditSystem: CreditSystem;
  grade: string;
  gradePoints: number;
  semester: string;
  academicYear: string;
  description: string;
  learningOutcomes: string[];
  assessmentMethod: AssessmentMethod;
}

export interface AcceptedCourse {
  sourceCourseId: string;
  sourceCourseName: string;
  targetCourseId: string;
  targetCourseName: string;
  creditsAccepted: number;
  creditConversionFactor: number;
  conditions: string[];
}

export interface RejectedCourse {
  sourceCourseId: string;
  sourceCourseName: string;
  reason: string;
  alternativeRecommendation: string;
}

export interface RecognitionEngine {
  id: string;
  engineName: string;
  engineVersion: string;
  description: string;
  supportedFrameworks: string[];
  supportedCountries: string[];
  recognitionMethods: RecognitionMethod[];
  assessmentCriteria: RecognitionAssessmentCriteria[];
  decisionRules: RecognitionDecisionRule[];
  stakeholderRoles: StakeholderRole[];
  lastUpdated: string;
  officialUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RecognitionAssessmentCriteria {
  criteriaId: string;
  criteriaName: string;
  criteriaType: AssessmentCriteriaType;
  weight: number;
  scoringMethod: string;
  passingScore: number;
  maxScore: number;
  description: string;
}

export interface RecognitionDecisionRule {
  ruleId: string;
  ruleName: string;
  ruleType: string;
  conditions: string[];
  action: string;
  priority: number;
  isActive: boolean;
}

export interface QualificationLevelDescriptor {
  id: string;
  frameworkName: string;
  level: QualificationLevel;
  levelName: string;
  knowledgeDescription: string;
  skillsDescription: string;
  competenceDescription: string;
  autonomyDescription: string;
  responsibilityDescription: string;
  typicalDuration: string;
  typicalCredits: number;
  creditSystem: CreditSystem;
  entryRequirements: string[];
  progressionPathway: string[];
  examples: string[];
  lastReviewDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreditTransferAgreement {
  id: string;
  agreementName: string;
  agreementType: string;
  sourceInstitution: string;
  sourceCountry: string;
  targetInstitution: string;
  targetCountry: string;
  signatoryDate: string;
  effectiveDate: string;
  expiryDate: string | null;
  renewalDate: string | null;
  creditSystems: CreditSystem[];
  transferableCredits: number;
  transferablePrograms: string[];
  conditions: string[];
  restrictions: string[];
  governanceStructure: string;
  disputeResolution: string;
  status: string;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationBenchmark {
  id: string;
  benchmarkName: string;
  benchmarkType: BenchmarkType;
  description: string;
  country: string;
  region: string;
  qualificationType: QualificationType;
  level: QualificationLevel;
  benchmarkYear: number;
  metrics: BenchmarkMetric[];
  globalComparison: BenchmarkComparison[];
  regionalComparison: BenchmarkComparison[];
  trend: TrendDirection;
  methodology: string;
  dataSources: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BenchmarkMetric {
  metricName: string;
  value: number;
  unit: string;
  change: number;
  target: number | null;
}

export interface BenchmarkComparison {
  entityName: string;
  entityCountry: string;
  score: number;
  rank: number;
  percentile: number;
}

export interface QualificationStakeholder {
  id: string;
  stakeholderName: string;
  stakeholderType: StakeholderRole;
  organization: string;
  country: string;
  role: string;
  contactPerson: string;
  contactEmail: string;
  status: StakeholderStatus;
  interests: string[];
  contributions: string[];
  lastEngagement: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LearningOutcomeMapping {
  id: string;
  mappingName: string;
  sourceProgramId: string;
  sourceProgramName: string;
  targetProgramId: string;
  targetProgramName: string;
  sourceInstitution: string;
  targetInstitution: string;
  sourceCountry: string;
  targetCountry: string;
  status: MappingStatus;
  mappedOutcomes: MappedLearningOutcome[];
  unmappedOutcomes: UnmappedLearningOutcome[];
  coveragePercentage: number;
  approvedBy: string;
  approvalDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MappedLearningOutcome {
  sourceOutcomeId: string;
  sourceOutcomeDescription: string;
  targetOutcomeId: string;
  targetOutcomeDescription: string;
  mappingStrength: number;
  conditions: string[];
}

export interface UnmappedLearningOutcome {
  outcomeId: string;
  outcomeDescription: string;
  reason: string;
  recommendation: string;
}

export interface QualificationPathway {
  id: string;
  pathwayName: string;
  description: string;
  pathwayType: LearningPathway;
  sourceQualificationId: string;
  sourceQualificationName: string;
  sourceLevel: QualificationLevel;
  targetQualificationId: string;
  targetQualificationName: string;
  targetLevel: QualificationLevel;
  requirements: PathwayRequirement[];
  duration: string;
  credits: number;
  creditSystem: CreditSystem;
  prerequisites: string[];
  progressionRules: string[];
  exitPoints: string[];
  applicableCountries: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PathwayRequirement {
  requirementId: string;
  requirementType: string;
  description: string;
  mandatory: boolean;
  credits: number | null;
  duration: string | null;
  assessmentMethod: AssessmentMethod | null;
}

export interface QualificationQualityAssurance {
  id: string;
  assuranceName: string;
  assuranceType: QualityAssuranceType;
  qualificationId: string;
  qualificationName: string;
  institutionId: string;
  institutionName: string;
  country: string;
  frameworkName: string;
  assessmentDate: string;
  assessmentCriteria: QualityAssessmentCriteria[];
  overallScore: number;
  maxScore: number;
  rating: string;
  accreditedBy: string;
  accreditationStatus: string;
  accreditationDate: string;
  accreditationExpiry: string;
  conditions: string[];
  recommendations: string[];
  reviewCycle: ReviewCycle;
  nextReviewDate: string;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualityAssessmentCriteria {
  criteriaId: string;
  criteriaName: string;
  weight: number;
  score: number;
  maxScore: number;
  comments: string;
  evidence: string[];
}

export interface NationalQualificationRegistry {
  id: string;
  registryName: string;
  country: string;
  governingBody: string;
  frameworkName: string;
  totalQualifications: number;
  qualificationsByType: QualificationTypeCount[];
  qualificationsByLevel: QualificationLevelCount[];
  lastUpdated: string;
  officialUrl: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationTypeCount {
  type: QualificationType;
  count: number;
  percentage: number;
}

export interface QualificationLevelCount {
  level: QualificationLevel;
  count: number;
  percentage: number;
}

export interface InternationalCreditTransfer {
  id: string;
  transferCode: string;
  studentId: string;
  studentName: string;
  studentNationality: string;
  sourceCountry: string;
  sourceInstitution: string;
  sourceProgram: string;
  sourceCredits: number;
  sourceCreditSystem: CreditSystem;
  sourceGpa: number | null;
  sourceCompletedCourses: TransferredCourse[];
  targetCountry: string;
  targetInstitution: string;
  targetProgram: string;
  targetCreditSystem: CreditSystem;
  transferredCredits: number;
  acceptedCourses: AcceptedCourse[];
  rejectedCourses: RejectedCourse[];
  crossBorderAgreement: string;
  recognitionDecision: RecognitionStatus;
  conditions: string[];
  status: CreditTransferStatus;
  evaluatedBy: string;
  evaluationDate: string;
  decisionDate: string | null;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationMappingTemplate {
  id: string;
  templateName: string;
  description: string;
  sourceFramework: string;
  targetFramework: string;
  templateType: string;
  fields: MappingTemplateField[];
  version: string;
  isActive: boolean;
  usageCount: number;
  createdBy: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MappingTemplateField {
  fieldName: string;
  fieldType: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
  validation: string | null;
}

export interface QualificationAnalytics {
  id: string;
  analyticsTitle: string;
  description: string;
  country: string;
  region: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  generatedAt: string;
  generatedBy: string;
  metrics: QualificationMetric[];
  comparisons: QualificationComparison[];
  trends: QualificationTrend[];
  insights: QualificationInsight[];
  recommendations: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationMetric {
  metricId: string;
  metricName: string;
  category: string;
  value: number;
  unit: string;
  change: number;
  target: number | null;
  trend: TrendDirection;
}

export interface QualificationComparison {
  comparisonId: string;
  entityName: string;
  entityCountry: string;
  score: number;
  rank: number;
  metrics: Record<string, number>;
}

export interface QualificationTrend {
  trendId: string;
  trendName: string;
  direction: TrendDirection;
  magnitude: number;
  duration: string;
  dataPoints: TrendDataPoint[];
  confidence: number;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  annotation: string | null;
}

export interface QualificationInsight {
  insightId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  evidence: string[];
  recommendations: string[];
  actionable: boolean;
}

export interface CompetencyGapAnalysis {
  id: string;
  analysisName: string;
  qualificationId: string;
  qualificationName: string;
  industrySector: string;
  country: string;
  assessedDate: string;
  assessedBy: string;
  gaps: DetailedCompetencyGap[];
  overallGapScore: number;
  priorityGaps: string[];
  remediationPlan: string;
  recommendations: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DetailedCompetencyGap {
  gapId: string;
  competencyName: string;
  requiredLevel: CompetencyLevel;
  currentLevel: CompetencyLevel;
  gapSize: number;
  gapType: GapType;
  industryRelevance: string;
  remediationActions: string[];
  priority: string;
  estimatedEffort: string;
}

export interface SkillMapping {
  id: string;
  mappingName: string;
  qualificationId: string;
  qualificationName: string;
  skillFrameworkId: string;
  skillFrameworkName: string;
  status: MappingStatus;
  description: string;
  mappedSkills: MappedSkill[];
  unmappedSkills: UnmappedSkill[];
  coveragePercentage: number;
  approvedBy: string;
  approvalDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MappedSkill {
  skillId: string;
  skillName: string;
  requiredProficiency: SkillProficiency;
  achievedProficiency: SkillProficiency;
  coverage: number;
  assessmentMethod: AssessmentMethod;
  status: string;
}

export interface UnmappedSkill {
  skillId: string;
  skillName: string;
  reason: string;
  recommendation: string;
}

export interface CreditHourConversion {
  id: string;
  conversionName: string;
  sourceCreditSystem: CreditSystem;
  sourceCountry: string;
  sourceInstitution: string;
  targetCreditSystem: CreditSystem;
  targetCountry: string;
  targetInstitution: string;
  conversionFactor: number;
  equivalenceType: string;
  conditions: string[];
  applicablePrograms: string[];
  effectiveDate: string;
  expiryDate: string | null;
  approvedBy: string;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationEquivalenceRequest {
  id: string;
  requestNumber: string;
  requestStatus: EquivalenceRequestStatus;
  applicantId: string;
  applicantName: string;
  applicantNationality: string;
  sourceCountry: string;
  sourceInstitution: string;
  sourceQualificationId: string;
  sourceQualificationType: QualificationType;
  sourceQualificationName: string;
  sourceLevel: QualificationLevel;
  sourceCredits: number;
  sourceDuration: string;
  sourceIssuedDate: string;
  targetCountry: string;
  targetFramework: string;
  evaluationCriteria: string[];
  requestedEquivalenceLevel: QualificationLevel | null;
  equivalentLevel: QualificationLevel | null;
  equivalentCredits: number | null;
  equivalenceStatus: EquivalenceStatus;
  conditions: string[];
  limitations: string[];
  evaluatedBy: string;
  evaluationDate: string | null;
  decisionDate: string | null;
  decisionAuthority: string;
  validUntil: string | null;
  appealDeadline: string | null;
  appealStatus: string | null;
  supportingDocuments: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RecognitionOfPriorLearning {
  id: string;
  rplId: string;
  applicantId: string;
  applicantName: string;
  applicantNationality: string;
  targetQualification: string;
  targetLevel: QualificationLevel;
  targetInstitution: string;
  targetCountry: string;
  priorLearning: PriorLearningRecord[];
  assessmentMethod: RecognitionMethod;
  assessedBy: string;
  assessmentDate: string;
  status: RecognitionRequestStatus;
  recognizedCredits: number;
  conditions: string[];
  recommendations: string[];
  decisionDate: string | null;
  decisionAuthority: string;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PriorLearningRecord {
  recordId: string;
  learningType: RecognitionMethod;
  description: string;
  institution: string;
  country: string;
  startDate: string;
  endDate: string | null;
  duration: string;
  credits: number;
  grade: string | null;
  evidence: string[];
  verified: boolean;
}

export interface QualificationStacking {
  id: string;
  stackingName: string;
  description: string;
  qualificationIds: string[];
  qualificationNames: string[];
  qualificationLevels: QualificationLevel[];
  stackingType: string;
  totalCredits: number;
  creditSystem: CreditSystem;
  pathway: string;
  exitQualification: string;
  exitLevel: QualificationLevel;
  applicableCountries: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InternationalRecognitionAgreement {
  id: string;
  agreementName: string;
  agreementType: string;
  sourceCountry: string;
  sourceFramework: string;
  sourceAuthority: string;
  targetCountry: string;
  targetFramework: string;
  targetAuthority: string;
  signatoryDate: string;
  effectiveDate: string;
  expiryDate: string | null;
  scope: string[];
  coveredQualifications: string[];
  recognitionLevel: RecognitionStatus;
  conditions: string[];
  limitations: string[];
  reviewCycle: ReviewCycle;
  lastReviewDate: string;
  nextReviewDate: string;
  status: string;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationDatabase {
  id: string;
  databaseName: string;
  description: string;
  country: string;
  region: string;
  governingBody: string;
  totalQualifications: number;
  lastUpdated: string;
  officialUrl: string;
  searchUrl: string;
  apiEndpoint: string | null;
  dataFormat: string;
  updateFrequency: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationSearchResult {
  resultId: string;
  qualificationId: string;
  qualificationName: string;
  qualificationType: QualificationType;
  level: QualificationLevel;
  institution: string;
  country: string;
  fieldOfStudy: string;
  credits: number;
  creditSystem: CreditSystem;
  duration: string;
  recognitionStatus: RecognitionStatus;
  relevanceScore: number;
}

export interface QualificationReport {
  id: string;
  reportTitle: string;
  reportType: string;
  country: string;
  region: string;
  frameworkName: string;
  reportingPeriod: string;
  author: string;
  publicationDate: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  dataSources: string[];
  pageCount: number;
  fileSize: number;
  fileFormat: string;
  downloadUrl: string;
  isPublic: boolean;
  downloads: number;
  citations: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationAlert {
  id: string;
  alertTitle: string;
  alertType: string;
  severity: string;
  description: string;
  country: string;
  region: string;
  frameworkName: string;
  issuedDate: string;
  expiryDate: string | null;
  actionRequired: string;
  deadline: string | null;
  affectedQualifications: string[];
  issuingBody: string;
  isRead: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationDashboard {
  id: string;
  dashboardTitle: string;
  description: string;
  targetUser: string;
  targetRole: string;
  layout: QualificationDashboardLayout[];
  filters: QualificationDashboardFilter[];
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

export interface QualificationDashboardLayout {
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

export interface QualificationDashboardFilter {
  filterName: string;
  filterType: string;
  options: string[];
  defaultValue: string;
  isRequired: boolean;
}

export interface QualificationNotification {
  id: string;
  notificationTitle: string;
  notificationType: string;
  description: string;
  country: string;
  targetUsers: string[];
  targetRoles: string[];
  issuedDate: string;
  expiryDate: string | null;
  actionRequired: string;
  deadline: string | null;
  relatedEntityId: string | null;
  isRead: boolean;
  acknowledgedBy: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
