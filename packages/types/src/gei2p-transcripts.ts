export enum ExchangeFormat {
  JSON = "JSON",
  JSON_LD = "JSON_LD",
  CSV = "CSV",
  XML = "XML",
  EXCEL = "EXCEL",
  PDF = "PDF",
  REST_API = "REST_API",
  WEBHOOK = "WEBHOOK",
  SFTP = "SFTP",
  EDI = "EDI",
  SOAP = "SOAP",
}

export enum ExchangeDirection {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum TranscriptStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ARCHIVED = "ARCHIVED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
  UNDER_REVIEW = "UNDER_REVIEW",
  FINAL = "FINAL",
}

export enum ConversionType {
  GRADE = "GRADE",
  CREDIT = "CREDIT",
  GPA = "GPA",
  CURRICULUM = "CURRICULUM",
  QUALIFICATION = "QUALIFICATION",
  COUNTRY = "COUNTRY",
  SCALE = "SCALE",
  LANGUAGE = "LANGUAGE",
}

export enum GradeSystem {
  LETTER = "LETTER",
  PERCENTAGE = "PERCENTAGE",
  POINT = "POINT",
  DESCRIPTIVE = "DESCRIPTIVE",
  PASS_FAIL = "PASS_FAIL",
  RANKING = "RANKING",
  STANDARDIZED = "STANDARDIZED",
}

export enum CreditSystem {
  ECTS = "ECTS",
  US_CREDIT = "US_CREDIT",
  UK_CREDIT = "UK_CREDIT",
  CANADIAN = "CANADIAN",
  AUSTRALIAN = "AUSTRALIAN",
  CREDITS = "CREDITS",
  UNITS = "UNITS",
  HOURS = "HOURS",
}

export enum GPAScale {
  FOUR_POINT = "FOUR_POINT",
  FIVE_POINT = "FIVE_POINT",
  TEN_POINT = "TEN_POINT",
  TWENTY_POINT = "TWENTY_POINT",
  HUNDRED_POINT = "HUNDRED_POINT",
  WEIGHTED = "WEIGHTED",
  UNWEIGHTED = "UNWEIGHTED",
  CUSTOM = "CUSTOM",
}

export enum MappingType {
  DIRECT = "DIRECT",
  EQUIVALENT = "EQUIVALENT",
  APPROXIMATE = "APPROXIMATE",
  TRANSFORMED = "TRANSFORMED",
  APPROXIMATION = "APPROXIMATION",
  ESTIMATED = "ESTIMATED",
  REGIONAL = "REGIONAL",
}

export enum RuleType {
  COUNTRY_SPECIFIC = "COUNTRY_SPECIFIC",
  INSTITUTION_SPECIFIC = "INSTITUTION_SPECIFIC",
  PROGRAM_SPECIFIC = "PROGRAM_SPECIFIC",
  GRADE_SPECIFIC = "GRADE_SPECIFIC",
  CREDIT_SPECIFIC = "CREDIT_SPECIFIC",
  CURRICULUM_SPECIFIC = "CURRICULUM_SPECIFIC",
  QUALIFICATION_SPECIFIC = "QUALIFICATION_SPECIFIC",
  GLOBAL = "GLOBAL",
}

export enum EquivalenceStatus {
  EQUIVALENT = "EQUIVALENT",
  PARTIALLY_EQUIVALENT = "PARTIALLY_EQUIVALENT",
  NOT_EQUIVALENT = "NOT_EQUIVALENT",
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum RecognitionStatus {
  FULLY_RECOGNIZED = "FULLY_RECOGNIZED",
  PARTIALLY_RECOGNIZED = "PARTIALLY_RECOGNIZED",
  NOT_RECOGNIZED = "NOT_RECOGNIZED",
  CONDITIONALLY_RECOGNIZED = "CONDITIONALLY_RECOGNIZED",
  PENDING = "PENDING",
  UNDER_EVALUATION = "UNDER_EVALUATION",
}

export enum CountryCode {
  US = "US",
  GB = "GB",
  FR = "FR",
  DE = "DE",
  CA = "CA",
  AU = "AU",
  JP = "JP",
  CN = "CN",
  IN = "IN",
  BR = "BR",
  NG = "NG",
  SN = "SN",
  CI = "CI",
  CM = "CM",
  ML = "ML",
  BF = "BF",
  GH = "GH",
  KE = "KE",
  ZA = "ZA",
  OTHER = "OTHER",
}

export enum TranscriptLanguage {
  EN = "EN",
  FR = "FR",
  DE = "DE",
  ES = "ES",
  PT = "PT",
  AR = "AR",
  ZH = "ZH",
  JA = "JA",
  OTHER = "OTHER",
}

export enum TranscriptFormat {
  OFFICIAL = "OFFICIAL",
  UNOFFICIAL = "UNOFFICIAL",
  DIGITAL = "DIGITAL",
  PAPER = "PAPER",
  ELECTRONIC = "ELECTRONIC",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum ExchangeProtocol {
  REST = "REST",
  SOAP = "SOAP",
  GRAPHQL = "GRAPHQL",
  EDI = "EDI",
  SFTP = "SFTP",
  WEBHOOK = "WEBHOOK",
  DIDCOMM = "DIDCOMM",
}

export enum NormalizationMethod {
  STANDARD = "STANDARD",
  COUNTRY_BASED = "COUNTRY_BASED",
  INSTITUTION_BASED = "INSTITUTION_BASED",
  AI_ASSISTED = "AI_ASSISTED",
  MANUAL = "MANUAL",
  HYBRID = "HYBRID",
}

export enum ValidationSeverity {
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
  CRITICAL = "CRITICAL",
}

export enum GradeValue {
  A_PLUS = "A_PLUS",
  A = "A",
  A_MINUS = "A_MINUS",
  B_PLUS = "B_PLUS",
  B = "B",
  B_MINUS = "B_MINUS",
  C_PLUS = "C_PLUS",
  C = "C",
  C_MINUS = "C_MINUS",
  D_PLUS = "D_PLUS",
  D = "D",
  D_MINUS = "D_MINUS",
  F = "F",
  PASS = "PASS",
  FAIL = "FAIL",
  INCOMPLETE = "INCOMPLETE",
  WITHDRAWN = "WITHDRAWN",
  AUDIT = "AUDIT",
}

export enum QualificationFramework {
  NQF = "NQF",
  EQF = "EQF",
  ISCED = "ISCED",
  ANAQF = "ANAQF",
  CUSTOM = "CUSTOM",
}

export enum CurriculumStandard {
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  BILINGUAL = "BILINGUAL",
  IB = "IB",
  CUSTOM = "CUSTOM",
}

export enum AcademicPeriod {
  SEMESTER = "SEMESTER",
  TRIMESTER = "TRIMESTER",
  QUARTER = "QUARTER",
  ANNUAL = "ANNUAL",
  TERM = "TERM",
}

export enum CreditConversionStatus {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  DENIED = "DENIED",
  PENDING = "PENDING",
  CONDITIONAL = "CONDITIONAL",
}

export enum GPAConversionStatus {
  EXACT = "EXACT",
  APPROXIMATE = "APPROXIMATE",
  ESTIMATED = "ESTIMATED",
  UNABLE = "UNABLE",
}

export enum TranscriptEvent {
  UPLOADED = "UPLOADED",
  PARSED = "PARSED",
  NORMALIZED = "NORMALIZED",
  VALIDATED = "VALIDATED",
  CONVERTED = "CONVERTED",
  VERIFIED = "VERIFIED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPORTED = "EXPORTED",
  SHARED = "SHARED",
}

export enum MappingDirection {
  A_TO_B = "A_TO_B",
  B_TO_A = "B_TO_A",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum CountryRuleScope {
  GRADE_CONVERSION = "GRADE_CONVERSION",
  CREDIT_CONVERSION = "CREDIT_CONVERSION",
  GPA_CONVERSION = "GPA_CONVERSION",
  CURRICULUM = "CURRICULUM",
  QUALIFICATION = "QUALIFICATION",
  TRANSCRIPT_FORMAT = "TRANSCRIPT_FORMAT",
}

export enum RecognitionBody {
  NARIC = "NARIC",
  ENIC_NARIC = "ENIC_NARIC",
  NATIONAL_AUTHORITY = "NATIONAL_AUTHORITY",
  INSTITUTION = "INSTITUTION",
  ACCREDITATION_BODY = "ACCREDITATION_BODY",
  CUSTOM = "CUSTOM",
}

export enum EquivalenceMethod {
  FORMULA = "FORMULA",
  TABLE_LOOKUP = "TABLE_LOOKUP",
  AI_ESTIMATION = "AI_ESTIMATION",
  EXPERT_JUDGMENT = "EXPERT_JUDGMENT",
  HYBRID = "HYBRID",
}

export enum TranscriptPrivacy {
  PUBLIC = "PUBLIC",
  INSTITUTIONAL = "INSTITUTIONAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
}

export enum ExchangeSecurity {
  TLS = "TLS",
  MTLS = "MTLS",
  JWT = "JWT",
  OAUTH2 = "OAUTH2",
  API_KEY = "API_KEY",
  SIGNATURE = "SIGNATURE",
}

export enum DataQualityStatus {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  UNACCEPTABLE = "UNACCEPTABLE",
}

export enum GradeScaleMappingStatus {
  MAPPED = "MAPPED",
  PARTIAL = "PARTIAL",
  UNMAPPED = "UNMAPPED",
  CONFLICT = "CONFLICT",
}

export enum AuditAction {
  TRANSCRIPT_UPLOADED = "TRANSCRIPT_UPLOADED",
  TRANSCRIPT_PARSED = "TRANSCRIPT_PARSED",
  TRANSCRIPT_NORMALIZED = "TRANSCRIPT_NORMALIZED",
  TRANSCRIPT_VALIDATED = "TRANSCRIPT_VALIDATED",
  TRANSCRIPT_CONVERTED = "TRANSCRIPT_CONVERTED",
  TRANSCRIPT_VERIFIED = "TRANSCRIPT_VERIFIED",
  TRANSCRIPT_APPROVED = "TRANSCRIPT_APPROVED",
  TRANSCRIPT_REJECTED = "TRANSCRIPT_REJECTED",
  TRANSCRIPT_EXPORTED = "TRANSCRIPT_EXPORTED",
  TRANSCRIPT_SHARED = "TRANSCRIPT_SHARED",
  TRANSCRIPT_DELETED = "TRANSCRIPT_DELETED",
  MAPPING_CREATED = "MAPPING_CREATED",
  MAPPING_UPDATED = "MAPPING_UPDATED",
  MAPPING_DELETED = "MAPPING_DELETED",
  RULE_CREATED = "RULE_CREATED",
  RULE_UPDATED = "RULE_UPDATED",
  RULE_DELETED = "RULE_DELETED",
  EQUIVALENCE_CREATED = "EQUIVALENCE_CREATED",
  EQUIVALENCE_APPROVED = "EQUIVALENCE_APPROVED",
  RECOGNITION_COMPLETED = "RECOGNITION_COMPLETED",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
}

export enum NotificationType {
  TRANSCRIPT_RECEIVED = "TRANSCRIPT_RECEIVED",
  TRANSCRIPT_PROCESSED = "TRANSCRIPT_PROCESSED",
  TRANSCRIPT_APPROVED = "TRANSCRIPT_APPROVED",
  TRANSCRIPT_REJECTED = "TRANSCRIPT_REJECTED",
  CONVERSION_COMPLETE = "CONVERSION_COMPLETE",
  EQUIVALENCE_AVAILABLE = "EQUIVALENCE_AVAILABLE",
  RECOGNITION_COMPLETE = "RECOGNITION_COMPLETE",
}

export interface AcademicDataExchange {
  id: string;
  exchangeName: string;
  exchangeFormat: ExchangeFormat;
  exchangeDirection: ExchangeDirection;
  exchangeProtocol: ExchangeProtocol;
  security: ExchangeSecurity;
  schoolId: string;
  sourceInstitution: ExchangeInstitution;
  targetInstitution: ExchangeInstitution;
  dataTypes: string[];
  mappings: ExchangeMapping[];
  rules: ExchangeRule[];
  isActive: boolean;
  lastSyncAt: string | null;
  syncFrequency: string;
  errorCount: number;
  totalExchanges: number;
  metadata: ExchangeMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ExchangePackage {
  id: string;
  exchangeId: string;
  packageId: string;
  format: ExchangeFormat;
  direction: ExchangeDirection;
  status: string;
  sourceInstitution: ExchangeInstitution;
  targetInstitution: ExchangeInstitution;
  transcriptCount: number;
  transcripts: AcademicTranscriptRef[];
  fileUrl: string | null;
  fileSize: number | null;
  checksum: string;
  encryptionUsed: boolean;
  sentAt: string;
  receivedAt: string | null;
  processedAt: string | null;
  errors: string[];
  warnings: string[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface ExchangeMapping {
  id: string;
  exchangeId: string;
  sourceSystem: string;
  targetSystem: string;
  mappingType: MappingType;
  direction: MappingDirection;
  sourceField: string;
  targetField: string;
  transformation: MappingTransformation | null;
  defaultValue: unknown | null;
  isRequired: boolean;
  validationRules: MappingValidationRule[];
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AcademicTranscript {
  id: string;
  transcriptId: string;
  transcriptStatus: TranscriptStatus;
  transcriptFormat: TranscriptFormat;
  transcriptLanguage: TranscriptLanguage;
  schoolId: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  institutionName: string;
  institutionCountry: CountryCode;
  programName: string;
  qualificationLevel: string;
  qualificationFramework: QualificationFramework;
  enrollmentDate: string;
  graduationDate: string | null;
  academicPeriod: AcademicPeriod;
  periods: TranscriptPeriod[];
  courses: TranscriptCourse[];
  gpa: GPACalculation | null;
  credits: CreditSummary;
  honors: TranscriptHonor[];
  remarks: string | null;
  officialSeal: string | null;
  registrarSignature: string | null;
  digitalSignature: TranscriptDigitalSignature | null;
  verificationCode: string;
  verificationUrl: string;
  privacy: TranscriptPrivacy;
  exportFormats: string[];
  blockchainHash: string | null;
  metadata: TranscriptMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TranscriptImport {
  id: string;
  importId: string;
  sourceFormat: ExchangeFormat;
  sourceUrl: string | null;
  sourceFile: string | null;
  sourceInstitution: string;
  sourceCountry: CountryCode;
  status: string;
  transcriptCount: number;
  importedCount: number;
  failedCount: number;
  validationResults: TranscriptValidationResult[];
  normalizationResults: TranscriptNormalizationResult[];
  conversionResults: TranscriptConversionResult[];
  errors: string[];
  warnings: string[];
  schoolId: string;
  initiatedBy: string;
  startedAt: string;
  completedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface TranscriptNormalization {
  id: string;
  transcriptId: string;
  normalizationMethod: NormalizationMethod;
  sourceLanguage: TranscriptLanguage;
  targetLanguage: TranscriptLanguage;
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  normalizedGrades: NormalizedGrade[];
  normalizedCredits: NormalizedCredit[];
  normalizedGPA: NormalizedGPA | null;
  normalizationRules: string[];
  confidence: number;
  schoolId: string;
  normalizedAt: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptValidation {
  id: string;
  transcriptId: string;
  validationResults: TranscriptValidationResult[];
  overallStatus: string;
  totalErrors: number;
  totalWarnings: number;
  totalInfo: number;
  isValid: boolean;
  schoolId: string;
  validatedAt: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptConversion {
  id: string;
  transcriptId: string;
  conversionTypes: ConversionType[];
  sourceGradeSystem: GradeSystem;
  targetGradeSystem: GradeSystem;
  sourceCreditSystem: CreditSystem;
  targetCreditSystem: CreditSystem;
  sourceGPAScale: GPAScale;
  targetGPAScale: GPAScale;
  convertedGrades: ConvertedGrade[];
  convertedCredits: ConvertedCredit[];
  convertedGPA: ConvertedGPA | null;
  conversionConfidence: number;
  conversionNotes: string[];
  schoolId: string;
  convertedAt: string;
  metadata: Record<string, unknown>;
}

export interface GradeConversion {
  id: string;
  sourceGrade: string;
  sourceGradeSystem: GradeSystem;
  sourceValue: number;
  targetGrade: string;
  targetGradeSystem: GradeSystem;
  targetValue: number;
  conversionType: ConversionType;
  country: CountryCode;
  institution: string | null;
  confidence: number;
  formula: string | null;
  mappingId: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CreditConversion {
  id: string;
  sourceCredits: number;
  sourceSystem: CreditSystem;
  targetCredits: number;
  targetSystem: CreditSystem;
  conversionFactor: number;
  status: CreditConversionStatus;
  country: CountryCode;
  institution: string | null;
  confidence: number;
  formula: string | null;
  mappingId: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface GPAConversion {
  id: string;
  sourceGPA: number;
  sourceScale: GPAScale;
  targetGPA: number;
  targetScale: GPAScale;
  status: GPAConversionStatus;
  country: CountryCode;
  institution: string | null;
  confidence: number;
  formula: string | null;
  mappingId: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CurriculumMapping {
  id: string;
  sourceCurriculum: CurriculumMappingCurriculum;
  targetCurriculum: CurriculumMappingCurriculum;
  mappingType: MappingType;
  mappings: CurriculumSubjectMapping[];
  coveragePercent: number;
  gaps: CurriculumGap[];
  equivalences: CurriculumEquivalence[];
  country: CountryCode;
  institution: string | null;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InstitutionMapping {
  id: string;
  sourceInstitutionId: string;
  sourceInstitutionName: string;
  sourceCountry: CountryCode;
  targetInstitutionId: string;
  targetInstitutionName: string;
  targetCountry: CountryCode;
  mappingType: MappingType;
  equivalenceLevel: string;
  accreditationStatus: string;
  isActive: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QualificationMapping {
  id: string;
  sourceQualification: QualificationInfo;
  targetQualification: QualificationInfo;
  mappingType: MappingType;
  equivalenceStatus: EquivalenceStatus;
  recognitionStatus: RecognitionStatus;
  country: CountryCode;
  qualificationFramework: QualificationFramework;
  level: number;
  creditPoints: number | null;
  duration: string | null;
  isActive: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CountryRule {
  id: string;
  country: CountryCode;
  ruleType: RuleType;
  ruleName: string;
  ruleDescription: string;
  ruleContent: CountryRuleContent;
  gradeConversions: GradeConversionRule[];
  creditConversions: CreditConversionRule[];
  gpaConversions: GPAConversionRule[];
  qualificationLevels: QualificationLevelRule[];
  curriculumStandards: CurriculumStandardRule[];
  transcriptRequirements: TranscriptRequirement[];
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EquivalenceEngine {
  id: string;
  engineName: string;
  engineVersion: string;
  equivalenceMethod: EquivalenceMethod;
  supportedCountries: CountryCode[];
  supportedQualificationFrameworks: QualificationFramework[];
  supportedGradeSystems: GradeSystem[];
  supportedCreditSystems: CreditSystem[];
  supportedGPAScales: GPAScale[];
  rules: EquivalenceRule[];
  algorithms: EquivalenceAlgorithm[];
  confidenceThreshold: number;
  requireManualReview: boolean;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecognitionEngine {
  id: string;
  engineName: string;
  engineVersion: string;
  recognitionBody: RecognitionBody;
  supportedCountries: CountryCode[];
  supportedQualificationFrameworks: QualificationFramework[];
  recognitionPolicies: RecognitionPolicy[];
  recognitionRules: RecognitionRule[];
  autoRecognition: boolean;
  requireManualReview: boolean;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptConfig {
  id: string;
  schoolId: string;
  defaultFormat: TranscriptFormat;
  allowedFormats: TranscriptFormat[];
  defaultLanguage: TranscriptLanguage;
  allowedLanguages: TranscriptLanguage[];
  defaultExchangeFormat: ExchangeFormat;
  allowedExchangeFormats: ExchangeFormat[];
  defaultExchangeProtocol: ExchangeProtocol;
  allowedExchangeProtocols: ExchangeProtocol[];
  defaultGradeSystem: GradeSystem;
  defaultCreditSystem: CreditSystem;
  defaultGPAScale: GPAScale;
  defaultCountry: CountryCode;
  defaultQualificationFramework: QualificationFramework;
  normalizationPolicy: NormalizationPolicy;
  validationPolicy: TranscriptValidationPolicy;
  conversionPolicy: ConversionPolicy;
  equivalencePolicy: EquivalencePolicy;
  recognitionPolicy: RecognitionRecognitionPolicy;
  privacyPolicy: TranscriptPrivacyPolicy;
  securityPolicy: TranscriptSecurityPolicy;
  webhookEndpoints: WebhookEndpoint[];
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalTranscripts: number;
  verifiedTranscripts: number;
  pendingTranscripts: number;
  rejectedTranscripts: number;
  importedTranscripts: number;
  exportedTranscripts: number;
  sharedTranscripts: number;
  conversionsPerformed: number;
  equivalencesCalculated: number;
  recognitionsProcessed: number;
  averageProcessingTime: number;
  averageValidationTime: number;
  averageConversionTime: number;
  averageEquivalenceTime: number;
  averageRecognitionTime: number;
  validationSuccessRate: number;
  conversionSuccessRate: number;
  equivalenceSuccessRate: number;
  recognitionSuccessRate: number;
  dataQualityScore: number;
  exchangesCompleted: number;
  exchangesFailed: number;
  averageExchangeTime: number;
  metricsBreakdown: TranscriptMetricsBreakdown;
  computedAt: string;
}

export interface TranscriptPeriod {
  id: string;
  periodName: string;
  academicPeriod: AcademicPeriod;
  startDate: string;
  endDate: string;
  courses: TranscriptCourse[];
  periodGPA: number | null;
  periodCredits: number;
  periodCreditsEarned: number;
  rank: number | null;
  classSize: number | null;
  metadata: Record<string, unknown>;
}

export interface TranscriptCourse {
  id: string;
  courseCode: string;
  courseName: string;
  courseDescription: string | null;
  credits: number;
  creditsEarned: number;
  grade: string;
  gradeValue: number;
  gradeSystem: GradeSystem;
  isHonors: boolean;
  isRepeat: boolean;
  isTransfer: boolean;
  semester: string;
  year: number;
  instructor: string | null;
  department: string;
  category: string;
  convertedGrade: ConvertedGrade | null;
  metadata: Record<string, unknown>;
}

export interface GPACalculation {
  gpa: number;
  scale: GPAScale;
  totalCredits: number;
  totalCreditsEarned: number;
  qualityPoints: number;
  calculationMethod: string;
  cumulativeGPA: number | null;
  majorGPA: number | null;
  honorsGPA: number | null;
}

export interface CreditSummary {
  totalCredits: number;
  creditsEarned: number;
  creditsInProgress: number;
  creditsTransferred: number;
  creditsRequired: number;
  creditsRemaining: number;
  completionPercent: number;
  system: CreditSystem;
}

export interface TranscriptHonor {
  type: string;
  name: string;
  description: string;
  dateAwarded: string;
  level: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptDigitalSignature {
  algorithm: string;
  publicKey: string;
  signature: string;
  certificate: string;
  signedAt: string;
  signerId: string;
  signerName: string;
}

export interface TranscriptMetadata {
  version: string;
  schemaVersion: string;
  source: string;
  tags: string[];
  customFields: Record<string, unknown>;
}

export interface TranscriptValidationResult {
  ruleId: string;
  ruleName: string;
  severity: ValidationSeverity;
  message: string;
  field: string | null;
  value: unknown | null;
  expectedValue: unknown | null;
  suggestion: string | null;
}

export interface TranscriptNormalizationResult {
  field: string;
  sourceValue: string;
  normalizedValue: string;
  normalizationMethod: NormalizationMethod;
  confidence: number;
  notes: string[];
}

export interface TranscriptConversionResult {
  field: string;
  sourceValue: string;
  convertedValue: string;
  conversionType: ConversionType;
  sourceSystem: string;
  targetSystem: string;
  confidence: number;
  notes: string[];
}

export interface NormalizedGrade {
  originalGrade: string;
  normalizedGrade: string;
  normalizedValue: number;
  gradeSystem: GradeSystem;
  confidence: number;
}

export interface NormalizedCredit {
  originalCredits: number;
  normalizedCredits: number;
  sourceSystem: CreditSystem;
  targetSystem: CreditSystem;
  conversionFactor: number;
  confidence: number;
}

export interface NormalizedGPA {
  originalGPA: number;
  normalizedGPA: number;
  sourceScale: GPAScale;
  targetScale: GPAScale;
  confidence: number;
}

export interface ConvertedGrade {
  courseCode: string;
  originalGrade: string;
  originalValue: number;
  convertedGrade: string;
  convertedValue: number;
  sourceSystem: GradeSystem;
  targetSystem: GradeSystem;
  confidence: number;
}

export interface ConvertedCredit {
  courseCode: string;
  originalCredits: number;
  convertedCredits: number;
  sourceSystem: CreditSystem;
  targetSystem: CreditSystem;
  conversionFactor: number;
}

export interface ConvertedGPA {
  originalGPA: number;
  convertedGPA: number;
  sourceScale: GPAScale;
  targetScale: GPAScale;
  confidence: number;
  formula: string;
}

export interface CurriculumMappingCurriculum {
  id: string;
  name: string;
  country: CountryCode;
  standard: CurriculumStandard;
  level: string;
  totalCredits: number;
  subjects: CurriculumSubject[];
}

export interface CurriculumSubject {
  id: string;
  code: string;
  name: string;
  credits: number;
  category: string;
  level: string;
  description: string;
}

export interface CurriculumSubjectMapping {
  sourceSubject: CurriculumSubject;
  targetSubject: CurriculumSubject;
  mappingType: MappingType;
  confidence: number;
  notes: string[];
}

export interface CurriculumGap {
  subject: CurriculumSubject;
  gapType: string;
  description: string;
  suggestion: string;
}

export interface CurriculumEquivalence {
  sourceSubject: CurriculumSubject;
  targetSubject: CurriculumSubject;
  equivalenceStatus: EquivalenceStatus;
  creditAdjustment: number;
  notes: string[];
}

export interface QualificationInfo {
  id: string;
  name: string;
  level: string;
  framework: QualificationFramework;
  country: CountryCode;
  creditPoints: number | null;
  duration: string | null;
  description: string;
}

export interface CountryRuleContent {
  gradeSystem: GradeSystem;
  creditSystem: CreditSystem;
  gpaScale: GPAScale;
  passingGrade: string;
  passingValue: number;
  maxGrade: string;
  maxGradeValue: number;
  description: string;
}

export interface GradeConversionRule {
  sourceGrade: string;
  sourceValue: number;
  targetGrade: string;
  targetValue: number;
  isDefault: boolean;
}

export interface CreditConversionRule {
  sourceSystem: CreditSystem;
  targetSystem: CreditSystem;
  conversionFactor: number;
  isDefault: boolean;
}

export interface GPAConversionRule {
  sourceScale: GPAScale;
  targetScale: GPAScale;
  conversionFormula: string;
  isDefault: boolean;
}

export interface QualificationLevelRule {
  level: number;
  name: string;
  framework: QualificationFramework;
  description: string;
}

export interface CurriculumStandardRule {
  standard: CurriculumStandard;
  country: CountryCode;
  requirements: string[];
  description: string;
}

export interface TranscriptRequirement {
  format: TranscriptFormat;
  requiredFields: string[];
  optionalFields: string[];
  language: TranscriptLanguage;
  description: string;
}

export interface EquivalenceRule {
  id: string;
  name: string;
  sourceQualification: string;
  targetQualification: string;
  equivalenceStatus: EquivalenceStatus;
  conditions: string[];
  confidence: number;
  country: CountryCode;
  isActive: boolean;
}

export interface EquivalenceAlgorithm {
  id: string;
  name: string;
  method: EquivalenceMethod;
  inputFields: string[];
  outputFields: string[];
  formula: string | null;
  description: string;
}

export interface RecognitionPolicy {
  id: string;
  name: string;
  country: CountryCode;
  recognitionBody: RecognitionBody;
  qualificationFramework: QualificationFramework;
  autoRecognition: boolean;
  conditions: string[];
  description: string;
  isActive: boolean;
}

export interface RecognitionRule {
  id: string;
  name: string;
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  recognitionStatus: RecognitionStatus;
  conditions: string[];
  notes: string[];
  confidence: number;
  isActive: boolean;
}

export interface NormalizationPolicy {
  autoNormalize: boolean;
  defaultMethod: NormalizationMethod;
  requireManualReview: boolean;
  confidenceThreshold: number;
}

export interface TranscriptValidationPolicy {
  autoValidate: boolean;
  requiredFields: string[];
  strictMode: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
}

export interface ConversionPolicy {
  autoConvert: boolean;
  defaultGradeSystem: GradeSystem;
  defaultCreditSystem: CreditSystem;
  defaultGPAScale: GPAScale;
  requireManualReview: boolean;
  confidenceThreshold: number;
}

export interface EquivalencePolicy {
  autoCalculate: boolean;
  defaultMethod: EquivalenceMethod;
  requireManualReview: boolean;
  confidenceThreshold: number;
  supportedFrameworks: QualificationFramework[];
}

export interface RecognitionRecognitionPolicy {
  autoRecognize: boolean;
  defaultBody: RecognitionBody;
  requireManualReview: boolean;
  supportedCountries: CountryCode[];
}

export interface TranscriptPrivacyPolicy {
  defaultPrivacy: TranscriptPrivacy;
  allowSharing: boolean;
  requireConsent: boolean;
  retentionDays: number;
}

export interface TranscriptSecurityPolicy {
  requireEncryption: boolean;
  requireSignature: boolean;
  allowedProtocols: ExchangeProtocol[];
  apiKeyRequired: boolean;
}

export interface ExchangeInstitution {
  id: string;
  name: string;
  country: CountryCode;
  accreditationStatus: string;
  website: string | null;
  apiEndpoint: string | null;
}

export interface ExchangeRule {
  id: string;
  name: string;
  ruleType: RuleType;
  conditions: Record<string, unknown>;
  action: string;
  isActive: boolean;
}

export interface ExchangeMetadata {
  version: string;
  source: string;
  tags: string[];
  customFields: Record<string, unknown>;
}

export interface AcademicTranscriptRef {
  transcriptId: string;
  studentName: string;
  institutionName: string;
  status: TranscriptStatus;
}

export interface MappingTransformation {
  type: string;
  formula: string | null;
  lookupTable: Record<string, unknown> | null;
  defaultValue: unknown | null;
  description: string;
}

export interface MappingValidationRule {
  ruleId: string;
  ruleType: string;
  parameters: Record<string, unknown>;
  errorMessage: string;
}

export interface TranscriptSearchQuery {
  query: string;
  filters: TranscriptSearchFilter[];
  sort: TranscriptSearchSort[];
  pagination: TranscriptSearchPagination;
}

export interface TranscriptSearchFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface TranscriptSearchSort {
  field: string;
  direction: string;
}

export interface TranscriptSearchPagination {
  page: number;
  pageSize: number;
  totalCount: number | null;
}

export interface TranscriptSearchResult {
  transcripts: AcademicTranscript[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface TranscriptBulkImport {
  id: string;
  batchId: string;
  sourceFormat: ExchangeFormat;
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

export interface TranscriptExportRequest {
  transcriptIds: string[];
  format: ExchangeFormat;
  includeMetadata: boolean;
  includeConversionResults: boolean;
  encryptionRequired: boolean;
}

export interface TranscriptExportResult {
  exportId: string;
  format: ExchangeFormat;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptWebhookEvent {
  eventId: string;
  eventType: TranscriptEvent;
  transcriptId: string;
  schoolId: string;
  timestamp: string;
  payload: Record<string, unknown>;
  signature: string;
}

export interface TranscriptHealthCheck {
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

export interface TranscriptMetricsBreakdown {
  byCountry: Record<string, number>;
  byInstitution: Record<string, number>;
  byStatus: Record<string, number>;
  byFormat: Record<string, number>;
  byLanguage: Record<string, number>;
  byMonth: Record<string, number>;
}

export enum TranscriptLifecycleStage {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  PROCESSING = "PROCESSING",
  VALIDATED = "VALIDATED",
  CONVERTED = "CONVERTED",
  VERIFIED = "VERIFIED",
  APPROVED = "APPROVED",
  SHARED = "SHARED",
  ARCHIVED = "ARCHIVED",
}

export enum GradeScaleType {
  ABSOLUTE = "ABSOLUTE",
  RELATIVE = "RELATIVE",
  STANDARDIZED = "STANDARDIZED",
  PERCENTILE = "PERCENTILE",
  CURVE = "CURVE",
  PASS_FAIL = "PASS_FAIL",
}

export enum CreditTransferStatus {
  APPROVED = "APPROVED",
  PARTIAL = "PARTIAL",
  DENIED = "DENIED",
  PENDING = "PENDING",
  CONDITIONAL = "CONDITIONAL",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum TranscriptVerificationMethod {
  DIGITAL_SIGNATURE = "DIGITAL_SIGNATURE",
  BLOCKCHAIN = "BLOCKCHAIN",
  QR_CODE = "QR_CODE",
  API = "API",
  INSTITUTIONAL = "INSTITUTIONAL",
  MANUAL = "MANUAL",
}

export enum TranscriptQualityLevel {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  ACCEPTABLE = "ACCEPTABLE",
  POOR = "POOR",
  UNACCEPTABLE = "UNACCEPTABLE",
}

export enum AcademicCreditType {
  LECTURE = "LECTURE",
  LABORATORY = "LABORATORY",
  SEMINAR = "SEMINAR",
  INTERNSHIP = "INTERNSHIP",
  THESIS = "THESIS",
  PRACTICUM = "PRACTICUM",
  ONLINE = "ONLINE",
}

export enum TranscriptAnnotationType {
  HONOR = "HONOR",
  WITHDistinction = "WITH_DISTINCTION",
  WITHDRAWAL = "WITHDRAWAL",
  INCOMPLETE = "INCOMPLETE",
  REPEAT = "REPEAT",
  TRANSFER = "TRANSFER",
  ACADEMIC_PROBATION = "ACADEMIC_PROBATION",
}

export enum ExchangeEncryptionMethod {
  NONE = "NONE",
  AES_256 = "AES_256",
  RSA = "RSA",
  ECIES = "ECIES",
  TLS = "TLS",
}

export enum TranscriptComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum GradeConversionMethod {
  LOOKUP_TABLE = "LOOKUP_TABLE",
  FORMULA = "FORMULA",
  AI_ESTIMATION = "AI_ESTIMATION",
  EXPERT_JUDGMENT = "EXPERT_JUDGMENT",
  STATISTICAL = "STATISTICAL",
}

export enum TranscriptShareScope {
  PRIVATE = "PRIVATE",
  INSTITUTIONAL = "INSTITUTIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  PUBLIC = "PUBLIC",
  SPECIFIC = "SPECIFIC",
}

export enum TranscriptDataIntegrityStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  CORRUPTED = "CORRUPTED",
  UNKNOWN = "UNKNOWN",
}

export enum AcademicRecordType {
  TRANSCRIPT = "TRANSCRIPT",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  DEGREE = "DEGREE",
  ATTENDANCE = "ATTENDANCE",
  ENROLLMENT = "ENROLLMENT",
}

export enum TranscriptProcessingStatus {
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum CountryAcademicSystem {
  ANGLO_SAXON = "ANGLO_SAXON",
  FRANCOPHONE = "FRANCOPHONE",
  GERMANIC = "GERMANIC",
  EASTERN_EUROPEAN = "EASTERN_EUROPEAN",
  ASIAN = "ASIAN",
  LATIN_AMERICAN = "LATIN_AMERICAN",
  AFRICAN = "AFRICAN",
  MIDDLE_EASTERN = "MIDDLE_EASTERN",
}

export enum TranscriptEncodingFormat {
  UTF8 = "UTF8",
  ASCII = "ASCII",
  ISO_8859_1 = "ISO_8859_1",
  ISO_8859_15 = "ISO_8859_15",
}

export interface TranscriptLifecycleEvent {
  id: string;
  transcriptId: string;
  stage: TranscriptLifecycleStage;
  eventTimestamp: string;
  actor: string;
  actorType: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface GradeScaleEntry {
  id: string;
  grade: string;
  value: number;
  minPercentage: number;
  maxPercentage: number;
  description: string;
  scaleType: GradeScaleType;
  country: CountryCode;
  schoolId: string;
}

export interface CreditTransferRequest {
  id: string;
  sourceTranscriptId: string;
  targetInstitutionId: string;
  courses: CreditTransferCourse[];
  totalCreditsRequested: number;
  status: CreditTransferStatus;
  initiatorId: string;
  initiatorType: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreditTransferCourse {
  sourceCourseCode: string;
  sourceCourseName: string;
  sourceCredits: number;
  sourceGrade: string;
  targetCredits: number | null;
  targetGrade: string | null;
  status: CreditTransferStatus;
  notes: string[];
}

export interface TranscriptVerificationRecord {
  id: string;
  transcriptId: string;
  verificationMethod: TranscriptVerificationMethod;
  verifierId: string;
  verifierName: string;
  verifiedAt: string;
  isValid: boolean;
  proofData: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptQualityAssessment {
  id: string;
  transcriptId: string;
  qualityLevel: TranscriptQualityLevel;
  completenessScore: number;
  accuracyScore: number;
  consistencyScore: number;
  overallScore: number;
  issues: TranscriptQualityIssue[];
  assessedAt: string;
  schoolId: string;
}

export interface TranscriptQualityIssue {
  field: string;
  issueType: string;
  severity: ValidationSeverity;
  message: string;
  suggestion: string;
}

export interface AcademicCreditEntry {
  id: string;
  courseCode: string;
  courseName: string;
  creditType: AcademicCreditType;
  credits: number;
  creditsEarned: number;
  grade: string;
  gradeValue: number;
  semester: string;
  year: number;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptAnnotation {
  id: string;
  transcriptId: string;
  annotationType: TranscriptAnnotationType;
  content: string;
  addedBy: string;
  addedAt: string;
  isPublic: boolean;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface ExchangeEncryptionConfig {
  method: ExchangeEncryptionMethod;
  algorithm: string | null;
  keyId: string | null;
  certificateId: string | null;
  requireEncryption: boolean;
}

export interface TranscriptComplianceRecord {
  id: string;
  transcriptId: string;
  framework: string;
  status: TranscriptComplianceStatus;
  lastCheckedAt: string;
  findings: TranscriptComplianceFinding[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptComplianceFinding {
  rule: string;
  status: string;
  message: string;
  recommendation: string;
}

export interface GradeConversionLookupEntry {
  sourceGrade: string;
  sourceValue: number;
  targetGrade: string;
  targetValue: number;
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  confidence: number;
  schoolId: string;
}

export interface TranscriptShareRecord {
  id: string;
  transcriptId: string;
  sharedBy: string;
  sharedWith: string | null;
  scope: TranscriptShareScope;
  sharedAt: string;
  expiresAt: string | null;
  accessCount: number;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptDataIntegrityCheck {
  id: string;
  transcriptId: string;
  status: TranscriptDataIntegrityStatus;
  checksum: string;
  checksumAlgorithm: string;
  verifiedAt: string;
  verifiedBy: string;
  schoolId: string;
}

export interface AcademicRecordReference {
  id: string;
  recordType: AcademicRecordType;
  recordId: string;
  institutionName: string;
  country: CountryCode;
  issueDate: string;
  transcriptId: string | null;
}

export interface TranscriptProcessingJob {
  id: string;
  jobId: string;
  transcriptId: string;
  status: TranscriptProcessingStatus;
  steps: TranscriptProcessingStep[];
  startedAt: string;
  completedAt: string | null;
  error: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptProcessingStep {
  stepName: string;
  status: string;
  startedAt: string;
  completedAt: string | null;
  error: string | null;
  duration: number | null;
}

export interface CountryAcademicSystemConfig {
  country: CountryCode;
  system: CountryAcademicSystem;
  defaultGradeSystem: GradeSystem;
  defaultCreditSystem: CreditSystem;
  defaultGPAScale: GPAScale;
  qualificationFramework: QualificationFramework;
  description: string;
  schoolId: string;
}

export interface TranscriptEncodingConfig {
  sourceEncoding: TranscriptEncodingFormat;
  targetEncoding: TranscriptEncodingFormat;
  autoDetect: boolean;
  fallbackEncoding: TranscriptEncodingFormat;
}

export interface TranscriptBulkExportRequest {
  transcriptIds: string[];
  format: ExchangeFormat;
  includeMetadata: boolean;
  includeConversionResults: boolean;
  includeVerificationInfo: boolean;
  schoolId: string;
}

export interface TranscriptBulkExportResult {
  exportId: string;
  status: string;
  totalCount: number;
  exportedCount: number;
  failedCount: number;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  errors: string[];
  schoolId: string;
}

export interface TranscriptStatistics {
  totalTranscripts: number;
  totalCourses: number;
  totalCredits: number;
  averageGPA: number;
  medianGPA: number;
  gpaStandardDeviation: number;
  gradeDistribution: Record<string, number>;
  creditDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
  period: string;
  schoolId: string;
}

export interface TranscriptComparisonRequest {
  transcriptIds: string[];
  comparisonFields: string[];
  includeConversion: boolean;
  schoolId: string;
}

export interface TranscriptComparisonResult {
  transcripts: AcademicTranscript[];
  differences: TranscriptDifference[];
  summary: string;
  computedAt: string;
  schoolId: string;
}

export interface TranscriptDifference {
  field: string;
  transcript1Value: unknown;
  transcript2Value: unknown;
  differenceType: string;
  significance: string;
}

export interface TranscriptValidationRule {
  id: string;
  ruleName: string;
  ruleType: string;
  field: string;
  condition: string;
  parameters: Record<string, unknown>;
  severity: ValidationSeverity;
  errorMessage: string;
  isActive: boolean;
  schoolId: string;
}

export interface TranscriptConversionProfile {
  id: string;
  profileName: string;
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  sourceGradeSystem: GradeSystem;
  targetGradeSystem: GradeSystem;
  sourceCreditSystem: CreditSystem;
  targetCreditSystem: CreditSystem;
  sourceGPAScale: GPAScale;
  targetGPAScale: GPAScale;
  conversionRules: TranscriptConversionRule[];
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptConversionRule {
  field: string;
  method: GradeConversionMethod;
  formula: string | null;
  lookupTable: Record<string, unknown> | null;
  confidence: number;
}

export interface ExchangeHealthRecord {
  exchangeId: string;
  status: HealthStatus;
  lastSuccessfulExchange: string | null;
  lastFailedExchange: string | null;
  totalExchanges: number;
  successRate: number;
  averageLatency: number;
  uptime: number;
  schoolId: string;
}

export interface TranscriptAuditSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  recentEvents: TranscriptLifecycleEvent[];
  period: string;
  schoolId: string;
}

export enum TranscriptGradePointSystem {
  STANDARD = "STANDARD",
  WEIGHTED = "WEIGHTED",
  HONORS = "HONORS",
  AP = "AP",
  IB = "IB",
  CUSTOM = "CUSTOM",
}

export enum TranscriptCreditHourType {
  SEMESTER = "SEMESTER",
  QUARTER = "QUARTER",
  TRIMESTER = "TRIMESTER",
  CONTACT_HOUR = "CONTACT_HOUR",
}

export enum TranscriptCourseCategory {
  GENERAL_EDUCATION = "GENERAL_EDUCATION",
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  ELECTIVE = "ELECTIVE",
  CORE = "CORE",
  CAPSTONE = "CAPSTONE",
  THESIS = "THESIS",
}

export enum TranscriptGradeAppealStatus {
  FILED = "FILED",
  UNDER_REVIEW = "UNDER_REVIEW",
  UPHELD = "UPHELD",
  DENIED = "DENIED",
  WITHDRAWN = "WITHDRAWN",
}

export enum TranscriptHoldStatus {
  ACTIVE = "ACTIVE",
  RELEASED = "RELEASED",
  EXPIRED = "EXPIRED",
}

export enum TranscriptRequestStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum TranscriptDeliveryMethod {
  ELECTRONIC = "ELECTRONIC",
  PAPER = "PAPER",
  BOTH = "BOTH",
  PICKUP = "PICKUP",
  COURIER = "COURIER",
}

export enum TranscriptSealType {
  DIGITAL = "DIGITAL",
  EMBOSSED = "EMBOSSED",
  ELECTRONIC = "ELECTRONIC",
  WET_SIGNATURE = "WET_SIGNATURE",
}

export enum TranscriptWatermarkType {
  NONE = "NONE",
  DRAFT = "DRAFT",
  OFFICIAL = "OFFICIAL",
  COPY = "COPY",
  CUSTOM = "CUSTOM",
}

export enum TranscriptSecurityFeature {
  QR_CODE = "QR_CODE",
  BARCODE = "BARCODE",
  WATERMARK = "WATERMARK",
  DIGITAL_SIGNATURE = "DIGITAL_SIGNATURE",
  HOLOGRAM = "HOLOGRAM",
  MICROPRINT = "MICROPRINT",
}

export interface TranscriptGradePointEntry {
  grade: string;
  gradePoint: number;
  credits: number;
  qualityPoints: number;
  weightedGradePoint: number | null;
  isHonors: boolean;
  isAp: boolean;
  isIb: boolean;
}

export interface TranscriptCreditHourRecord {
  creditType: TranscriptCreditHourType;
  totalHours: number;
  lectureHours: number;
  labHours: number;
  contactHours: number;
  selfStudyHours: number | null;
}

export interface TranscriptCourseCategoryRecord {
  category: TranscriptCourseCategory;
  creditsRequired: number;
  creditsEarned: number;
  courses: TranscriptCourse[];
}

export interface TranscriptGradeAppeal {
  id: string;
  transcriptId: string;
  courseId: string;
  currentGrade: string;
  requestedGrade: string;
  reason: string;
  status: TranscriptGradeAppealStatus;
  filedBy: string;
  filedAt: string;
  resolvedAt: string | null;
  decision: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptHold {
  id: string;
  transcriptId: string;
  holdType: string;
  reason: string;
  status: TranscriptHoldStatus;
  placedBy: string;
  placedAt: string;
  releasedAt: string | null;
  expiresAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptRequest {
  id: string;
  requestId: string;
  transcriptId: string | null;
  requesterId: string;
  requesterType: string;
  status: TranscriptRequestStatus;
  deliveryMethod: TranscriptDeliveryMethod;
  recipientName: string | null;
  recipientEmail: string | null;
  recipientAddress: string | null;
  purpose: string;
  numberOfCopies: number;
  requestedAt: string;
  processedAt: string | null;
  deliveredAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptSeal {
  type: TranscriptSealType;
  issuerId: string;
  issuerName: string;
  issuedAt: string;
  expiresAt: string | null;
  verificationUrl: string;
  certificateChain: string[];
}

export interface TranscriptSecurityFeatures {
  features: TranscriptSecurityFeature[];
  qrCode: string | null;
  barcode: string | null;
  watermark: TranscriptWatermarkType;
  digitalSignature: string | null;
  hologramId: string | null;
  microprintData: string | null;
}

export interface TranscriptGradeConversionLookup {
  id: string;
  sourceCountry: CountryCode;
  sourceSystem: GradeSystem;
  sourceGrade: string;
  sourceValue: number;
  targetCountry: CountryCode;
  targetSystem: GradeSystem;
  targetGrade: string;
  targetValue: number;
  confidence: number;
  isActive: boolean;
  schoolId: string;
}

export interface TranscriptCreditConversionLookup {
  id: string;
  sourceCountry: CountryCode;
  sourceSystem: CreditSystem;
  targetCountry: CountryCode;
  targetSystem: CreditSystem;
  conversionFactor: number;
  minCredits: number | null;
  maxCredits: number | null;
  isActive: boolean;
  schoolId: string;
}

export interface TranscriptGPAScaleEntry {
  id: string;
  scaleName: string;
  scale: GPAScale;
  country: CountryCode;
  passingGPA: number;
  maxGPA: number;
  honorsGPA: number | null;
  deansListGPA: number | null;
  isActive: boolean;
  schoolId: string;
}

export interface TranscriptQualificationLevel {
  id: string;
  level: number;
  name: string;
  framework: QualificationFramework;
  country: CountryCode;
  creditPointsRequired: number;
  duration: string;
  description: string;
  schoolId: string;
}

export interface TranscriptCountrySpecificRule {
  id: string;
  country: CountryCode;
  academicSystem: CountryAcademicSystem;
  gradingConvention: string;
  creditConvention: string;
  transcriptFormat: TranscriptFormat;
  requiredSeals: TranscriptSealType[];
  requiredSignatures: string[];
  languageRequirements: TranscriptLanguage[];
  description: string;
  isActive: boolean;
  schoolId: string;
}

export interface TranscriptEquivalenceMapping {
  id: string;
  sourceQualification: string;
  sourceCountry: CountryCode;
  targetQualification: string;
  targetCountry: CountryCode;
  equivalenceLevel: string;
  creditAdjustment: number;
  conditions: string[];
  isActive: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
  schoolId: string;
}

export interface TranscriptRecognitionRecord {
  id: string;
  transcriptId: string;
  recognitionBody: RecognitionBody;
  recognitionStatus: RecognitionStatus;
  recognizedQualification: string;
  recognizedCountry: CountryCode;
  recognizedAt: string;
  expiresAt: string | null;
  conditions: string[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptVerificationQRCode {
  id: string;
  transcriptId: string;
  qrData: string;
  verificationUrl: string;
  expiresAt: string;
  scanCount: number;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
}

export interface TranscriptDigitalSignatureRecord {
  id: string;
  transcriptId: string;
  algorithm: string;
  publicKey: string;
  signature: string;
  certificateChain: string[];
  signedBy: string;
  signedAt: string;
  isValid: boolean;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface TranscriptBatchProcessRequest {
  transcriptIds: string[];
  operationType: string;
  parameters: Record<string, unknown>;
  initiatedBy: string;
  schoolId: string;
}

export interface TranscriptBatchProcessResult {
  batchId: string;
  totalCount: number;
  successCount: number;
  failedCount: number;
  results: TranscriptBatchItemResult[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptBatchItemResult {
  transcriptId: string;
  status: string;
  error: string | null;
}

export interface TranscriptComparisonConfig {
  fields: string[];
  includeGrades: boolean;
  includeCredits: boolean;
  includeGPA: boolean;
  normalizeGrades: boolean;
  schoolId: string;
}

export interface TranscriptStatisticsEntry {
  metric: string;
  value: number;
  trend: string;
  changePercent: number;
  period: string;
}

export interface TranscriptAnalyticsQuery {
  dateFrom: string;
  dateTo: string;
  groupBy: string;
  filters: Record<string, unknown>;
  schoolId: string;
}

export interface TranscriptAnalyticsResult {
  totalTranscripts: number;
  averageGPA: number;
  medianGPA: number;
  gradeDistribution: Record<string, number>;
  creditDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
  topInstitutions: Record<string, number>;
  conversionSuccessRate: number;
  verificationSuccessRate: number;
  period: string;
  schoolId: string;
}

export interface TranscriptExchangeConfig {
  exchangeId: string;
  exchangeName: string;
  protocol: ExchangeProtocol;
  format: ExchangeFormat;
  encryption: ExchangeEncryptionConfig;
  authentication: string;
  rateLimit: number;
  retryPolicy: RetryPolicy;
  webhookUrl: string | null;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptShareConfig {
  allowSharing: boolean;
  allowedScopes: TranscriptShareScope[];
  requireApproval: boolean;
  maxSharesPerTranscript: number;
  shareExpiryDays: number;
  auditSharing: boolean;
  schoolId: string;
}

export interface RetryPolicy {
  maxRetries: number;
  retryInterval: number;
  backoffMultiplier: number;
}

export interface TranscriptDashboardMetrics {
  totalTranscripts: number;
  verifiedTranscripts: number;
  pendingTranscripts: number;
  recentImports: number;
  recentExports: number;
  averageProcessingTime: number;
  topCountries: Record<string, number>;
  topInstitutions: Record<string, number>;
  period: string;
  schoolId: string;
}

export interface TranscriptGradeConversionBatchRequest {
  transcriptIds: string[];
  sourceGradeSystem: GradeSystem;
  targetGradeSystem: GradeSystem;
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  method: GradeConversionMethod;
  schoolId: string;
}

export interface TranscriptGradeConversionBatchResult {
  batchId: string;
  totalCount: number;
  convertedCount: number;
  failedCount: number;
  results: TranscriptGradeConversionResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptGradeConversionResultItem {
  transcriptId: string;
  conversionId: string | null;
  status: string;
  originalGPA: number | null;
  convertedGPA: number | null;
  error: string | null;
}

export interface TranscriptCreditConversionBatchRequest {
  transcriptIds: string[];
  sourceCreditSystem: CreditSystem;
  targetCreditSystem: CreditSystem;
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  schoolId: string;
}

export interface TranscriptCreditConversionBatchResult {
  batchId: string;
  totalCount: number;
  convertedCount: number;
  failedCount: number;
  results: TranscriptCreditConversionResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptCreditConversionResultItem {
  transcriptId: string;
  conversionId: string | null;
  status: string;
  originalCredits: number | null;
  convertedCredits: number | null;
  error: string | null;
}

export interface TranscriptVerificationBatchRequest {
  transcriptIds: string[];
  verificationMethod: TranscriptVerificationMethod;
  verifierId: string;
  schoolId: string;
}

export interface TranscriptVerificationBatchResult {
  batchId: string;
  totalCount: number;
  verifiedCount: number;
  failedCount: number;
  results: TranscriptVerificationResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptVerificationResultItem {
  transcriptId: string;
  verificationId: string | null;
  isValid: boolean;
  error: string | null;
}

export interface TranscriptShareBatchRequest {
  transcriptIds: string[];
  scope: TranscriptShareScope;
  sharedWith: string | null;
  purpose: string;
  expiryDays: number | null;
  schoolId: string;
}

export interface TranscriptShareBatchResult {
  batchId: string;
  totalCount: number;
  sharedCount: number;
  failedCount: number;
  results: TranscriptShareResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptShareResultItem {
  transcriptId: string;
  shareId: string | null;
  shareUrl: string | null;
  status: string;
  error: string | null;
}

export interface TranscriptImportBatchRequest {
  sourceUrls: string[];
  sourceFormat: ExchangeFormat;
  sourceCountry: CountryCode;
  normalizationMethod: NormalizationMethod;
  schoolId: string;
}

export interface TranscriptImportBatchResult {
  batchId: string;
  totalCount: number;
  importedCount: number;
  failedCount: number;
  results: TranscriptImportResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptImportResultItem {
  sourceUrl: string;
  transcriptId: string | null;
  status: string;
  error: string | null;
}

export interface TranscriptEquivalenceBatchRequest {
  sourceQualifications: string[];
  sourceCountry: CountryCode;
  targetCountry: CountryCode;
  targetFramework: QualificationFramework;
  schoolId: string;
}

export interface TranscriptEquivalenceBatchResult {
  batchId: string;
  totalCount: number;
  equivalentCount: number;
  partialCount: number;
  notEquivalentCount: number;
  results: TranscriptEquivalenceResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptEquivalenceResultItem {
  sourceQualification: string;
  equivalenceStatus: EquivalenceStatus;
  targetQualification: string | null;
  confidence: number;
  notes: string[];
}

export interface TranscriptRecognitionBatchRequest {
  transcriptIds: string[];
  targetCountry: CountryCode;
  recognitionBody: RecognitionBody;
  schoolId: string;
}

export interface TranscriptRecognitionBatchResult {
  batchId: string;
  totalCount: number;
  recognizedCount: number;
  partialCount: number;
  notRecognizedCount: number;
  results: TranscriptRecognitionResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptRecognitionResultItem {
  transcriptId: string;
  recognitionStatus: RecognitionStatus;
  recognizedQualification: string | null;
  conditions: string[];
  notes: string[];
}

export interface TranscriptSearchRequest {
  query: string;
  filters: TranscriptSearchFilter[];
  sort: TranscriptSearchSort[];
  page: number;
  pageSize: number;
  schoolId: string;
}

export interface TranscriptSearchFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface TranscriptSearchSort {
  field: string;
  direction: string;
}

export interface TranscriptSearchResult {
  transcripts: AcademicTranscript[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface TranscriptValidationBatchRequest {
  transcriptIds: string[];
  validationRules: string[];
  strictMode: boolean;
  schoolId: string;
}

export interface TranscriptValidationBatchResult {
  batchId: string;
  totalCount: number;
  validCount: number;
  invalidCount: number;
  results: TranscriptValidationResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface TranscriptValidationResultItem {
  transcriptId: string;
  isValid: boolean;
  errors: TranscriptValidationResult[];
  warnings: TranscriptValidationResult[];
}

export interface TranscriptExportBatchRequest {
  transcriptIds: string[];
  format: ExchangeFormat;
  includeMetadata: boolean;
  includeConversionResults: boolean;
  encrypted: boolean;
  schoolId: string;
}

export interface TranscriptExportBatchResult {
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

export interface TranscriptAnalyticsDashboard {
  totalTranscripts: number;
  verifiedTranscripts: number;
  pendingTranscripts: number;
  averageGPA: number;
  medianGPA: number;
  gradeDistribution: Record<string, number>;
  creditDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
  recentActivity: TranscriptLifecycleEvent[];
  topInstitutions: Record<string, number>;
  conversionSuccessRate: number;
  period: string;
  schoolId: string;
}

export interface TranscriptProcessingConfig {
  id: string;
  schoolId: string;
  autoParse: boolean;
  autoNormalize: boolean;
  autoValidate: boolean;
  autoConvert: boolean;
  defaultNormalizationMethod: NormalizationMethod;
  defaultConversionMethod: GradeConversionMethod;
  maxFileSize: number;
  allowedFileTypes: string[];
  enableOCR: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptRecognitionConfig {
  id: string;
  schoolId: string;
  autoRecognize: boolean;
  defaultRecognitionBody: RecognitionBody;
  requireManualReview: boolean;
  supportedCountries: CountryCode[];
  supportedFrameworks: QualificationFramework[];
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptExchangeConfig2 {
  id: string;
  schoolId: string;
  defaultFormat: ExchangeFormat;
  allowedFormats: ExchangeFormat[];
  defaultProtocol: ExchangeProtocol;
  allowedProtocols: ExchangeProtocol[];
  requireEncryption: boolean;
  requireSignature: boolean;
  rateLimit: number;
  retryPolicy: RetryPolicy;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptGradeDistribution {
  grade: string;
  count: number;
  percentage: number;
  averageGPA: number | null;
}

export interface TranscriptCreditDistribution {
  credits: number;
  count: number;
  percentage: number;
  totalStudents: number;
}

export interface TranscriptCountryDistribution {
  country: CountryCode;
  count: number;
  percentage: number;
  averageGPA: number | null;
}

export interface TranscriptInstitutionDistribution {
  institutionId: string;
  institutionName: string;
  count: number;
  percentage: number;
  averageGPA: number | null;
}

export interface TranscriptGradeStatistics {
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  variance: number;
  min: number;
  max: number;
  range: number;
  skewness: number;
  kurtosis: number;
}

export interface TranscriptCreditStatistics {
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  min: number;
  max: number;
  totalCredits: number;
  averageCreditsPerTranscript: number;
}
