export enum TranslationEngine {
  GOOGLE_TRANSLATE = "GOOGLE_TRANSLATE",
  DEEPL = "DEEPL",
  AZURE_TRANSLATOR = "AZURE_TRANSLATOR",
  AWS_TRANSLATE = "AWS_TRANSLATE",
  IBM_WATSON = "IBM_WATSON",
  OPENAI = "OPENAI",
  META_NLLB = "META_NLLB",
  CROWDIN = "CROWDIN",
  LOCALIZED_AI = "LOCALIZED_AI",
  CUSTOM = "CUSTOM",
}

export enum TranslationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  QUEUED = "QUEUED",
  REVIEW_NEEDED = "REVIEW_NEEDED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PARTIAL = "PARTIAL",
}

export enum LocalisationScope {
  GLOBAL = "GLOBAL",
  REGIONAL = "REGIONAL",
  COUNTRY = "COUNTRY",
  CITY = "CITY",
  SCHOOL = "SCHOOL",
  DEPARTMENT = "DEPARTMENT",
  CLASS = "CLASS",
  USER = "USER",
}

export enum ContentType {
  TEXT = "TEXT",
  RICH_TEXT = "RICH_TEXT",
  HTML = "HTML",
  MARKDOWN = "MARKDOWN",
  JSON = "JSON",
  XML = "XML",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  DOCUMENT = "DOCUMENT",
}

export enum LanguagePackType {
  FULL = "FULL",
  PARTIAL = "MINIMAL",
  LIGHTWEIGHT = "LIGHTWEIGHT",
  OFFLINE = "OFFLINE",
  COMPRESSED = "COMPRESSED",
  AI_GENERATED = "AI_GENERATED",
  COMMUNITY = "COMMUNITY",
  OFFICIAL = "OFFICIAL",
}

export enum VoiceTranslationMode {
  REAL_TIME = "REAL_TIME",
  PUSH_TO_TALK = "PUSH_TO_TALK",
  CONTINUOUS = "CONTINUOUS",
  INTERPRETER_BOOTH = "INTERPRETER_BOOTH",
  DICTION_MODE = "DICTION_MODE",
}

export enum OCRMode {
  FULL_PAGE = "FULL_PAGE",
  REGION = "REGION",
  HIGHLIGHT = "HIGHLIGHT",
  LIVE_SCAN = "LIVE_SCAN",
  DOCUMENT_SCAN = "DOCUMENT_SCAN",
  HANDWRITING = "HANDWRITING",
}

export enum InterpretationMode {
  SIMULTANEOUS = "SIMULTANEOUS",
  CONSECUTIVE = "CONSECUTIVE",
  WHISPERED = "WHISPERED",
  SIGN_LANGUAGE = "SIGN_LANGUAGE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
}

export enum CulturalAdaptationType {
  DATE_FORMAT = "DATE_FORMAT",
  CURRENCY = "CURRENCY",
  MEASUREMENTS = "MEASUREMENTS",
  COLORS = "COLORS",
  IMAGERY = "IMAGERY",
  ICONOGRAPHY = "ICONOGRAPHY",
  HUMOR = "HUMOR",
  TONE = "TONE",
  IDIOMS = "IDIOMS",
  FORMALITY = "FORMALITY",
}

export enum AccessibilityStandard {
  WCAG_A = "WCAG_A",
  WCAG_AA = "WCAG_AA",
  WCAG_AAA = "WCAG_AAA",
  Section508 = "SECTION_508",
  EN301549 = "EN301549",
  ADA = "ADA",
  AODA = "AODA",
}

export enum TranslationMemoryType {
  SENTENCE = "SENTENCE",
  PARAGRAPH = "PARAGRAPH",
  DOCUMENT = "DOCUMENT",
  TERMINOLOGY = "TERMINOLOGY",
  PHRASEBOOK = "PHRASEBOOK",
}

export enum QualityAssessmentType {
  BLEU = "BLEU",
  METEOR = "METEOR",
  TER = "TER",
  COMET = "COMET",
  BERTSCORE = "BERTSCORE",
  HUMAN = "HUMAN",
}

export enum TextDirection {
  LTR = "LTR",
  RTL = "RTL",
  BIDI = "BIDI",
}

export enum PluralForm {
  ONE = "ONE",
  TWO = "TWO",
  FEW = "FEW",
  MANY = "MANY",
  OTHER = "OTHER",
  ZERO = "ZERO",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NEUTRAL = "NEUTRAL",
  NONE = "NONE",
}

export enum ScriptType {
  LATIN = "LATIN",
  ARABIC = "ARABIC",
  CYRILLIC = "CYRILLIC",
  CJK = "CJK",
  DEVANAGARI = "DEVANAGARI",
  THAI = "THAI",
  HANGUL = "HANGUL",
  ETHIOPIC = "ETHIOPIC",
  HEBREW = "HEBREW",
}

export enum LanguageLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export enum ContentCategory {
  CURRICULUM = "CURRICULUM",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  COMMUNICATION = "COMMUNICATION",
  ASSESSMENT = "ASSESSMENT",
  INTERFACE = "INTERFACE",
  LEGAL = "LEGAL",
  MARKETING = "MARKETING",
  SUPPORT = "SUPPORT",
}

export enum TranslationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
  CRITICAL = "CRITICAL",
}

export enum LocaleFormat {
  ISO_639_1 = "ISO_639_1",
  ISO_639_2 = "ISO_639_2",
  ISO_639_3 = "ISO_639_3",
  IETF_BCP47 = "IETF_BCP47",
}

export enum MachineTranslationMethod {
  NEURAL = "NEURAL",
  STATISTICAL = "STATISTICAL",
  RULE_BASED = "RULE_BASED",
  HYBRID = "HYBRID",
  ZERO_SHOT = "ZERO_SHOT",
  FEW_SHOT = "FEW_SHOT",
}

export enum GlossaryMatchType {
  EXACT = "EXACT",
  PARTIAL = "PARTIAL",
  FUZZY = "FUZZY",
  SEMANTIC = "SEMANTIC",
}

export enum VoiceLanguageDetectionType {
  AUTO = "AUTO",
  MANUAL = "MANUAL",
  CONTEXTUAL = "CONTEXTUAL",
}

export enum TranslationOutputFormat {
  PLAIN_TEXT = "PLAIN_TEXT",
  XLIFF = "XLIFF",
  RESX = "RESX",
  PO = "PO",
  JSON_FLAT = "JSON_FLAT",
  JSON_NESTED = "JSON_NESTED",
  PROPERTIES = "PROPERTIES",
  YAML = "YAML",
}

export enum SubtitleFormat {
  SRT = "SRT",
  VTT = "VTT",
  ASS = "ASS",
  SSA = "SSA",
  TTML = "TTML",
}

export enum LocalizationFileFormat {
  JSON = "JSON",
  XLIFF = "XLIFF",
  PO = "PO",
  RESX = "RESX",
  YML = "YML",
  PROPERTIES = "PROPERTIES",
  XML = "XML",
}

export enum ContentSyncStatus {
  SYNCED = "SYNCED",
  OUTDATED = "OUTDATED",
  CONFLICT = "CONFLICT",
  PENDING = "PENDING",
  MANUALLY_EDITED = "MANUALLY_EDITED",
}

export enum DialectVariant {
  STANDARD = "STANDARD",
  REGIONAL = "REGIONAL",
  FORMAL = "FORMAL",
  INFORMAL = "INFORMAL",
  LITERARY = "LITERARY",
  COLLOQUIAL = "COLLOQUIAL",
}

export enum TranslationSource {
  HUMAN = "HUMAN",
  MACHINE = "MACHINE",
  HYBRID = "HYBRID",
  TRANSLATION_MEMORY = "TRANSLATION_MEMORY",
  MT_POST_EDITED = "MT_POST_EDITED",
}

export enum ErrorCorrectionType {
  SPELLING = "SPELLING",
  GRAMMAR = "GRAMMAR",
  STYLE = "STYLE",
  TERMINOLOGY = "TERMINOLOGY",
  CONSISTENCY = "CONSISTENCY",
  PUNCTUATION = "PUNCTUATION",
}

export enum CollaborationPermission {
  VIEW = "VIEW",
  COMMENT = "COMMENT",
  EDIT = "EDIT",
  APPROVE = "APPROVE",
  PUBLISH = "PUBLISH",
  ADMIN = "ADMIN",
}

export enum AudioQuality {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  STUDIO = "STUDIO",
}

export enum VoiceGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NEUTRAL = "NEUTRAL",
  CUSTOM = "CUSTOM",
}

export enum SpeechRate {
  SLOW = "SLOW",
  NORMAL = "NORMAL",
  FAST = "FAST",
  VARIABLE = "VARIABLE",
}

export enum TranslationJobType {
  SINGLE = "SINGLE",
  BATCH = "BATCH",
  STREAMING = "STREAMING",
  PERIODIC = "PERIODIC",
  ON_DEMAND = "ON_DEMAND",
}

export enum CulturalContext {
  EDUCATIONAL = "EDUCATIONAL",
  BUSINESS = "BUSINESS",
  SOCIAL = "SOCIAL",
  LEGAL = "LEGAL",
  MEDICAL = "MEDICAL",
  TECHNICAL = "TECHNICAL",
}

export enum LocaleCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  CNY = "CNY",
  NGN = "NGN",
  GHS = "GHS",
  KES = "KES",
  ZAR = "ZAR",
  XOF = "XOF",
  XAF = "XAF",
}

export enum DateFormatStyle {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
  FULL = "FULL",
}

export enum NumberFormatStyle {
  DECIMAL = "DECIMAL",
  PERCENT = "PERCENT",
  CURRENCY = "CURRENCY",
  SCIENTIFIC = "SCIENTIFIC",
}

export enum TimeFormatStyle {
  TWELVE_HOUR = "TWELVE_HOUR",
  TWENTY_FOUR_HOUR = "TWENTY_FOUR_HOUR",
  ISO_8601 = "ISO_8601",
}

export enum WeekStartDay {
  MONDAY = "MONDAY",
  SUNDAY = "SUNDAY",
  SATURDAY = "SATURDAY",
}

export enum TranslationCacheStrategy {
  NONE = "NONE",
  SHORT_LIVED = "SHORT_LIVED",
  LONG_LIVED = "LONG_LIVED",
  PERSISTENT = "PERSISTENT",
  SMART = "SMART",
}

export enum APIQuotaUnit {
  CHARACTERS = "CHARACTERS",
  WORDS = "WORDS",
  REQUESTS = "REQUESTS",
  MINUTES = "MINUTES",
}

export enum NotificationLanguageMode {
  USER_PREFERRED = "USER_PREFERRED",
  SYSTEM_DEFAULT = "SYSTEM_DEFAULT",
  MULTILINGUAL = "MULTILINGUAL",
  ALL_AVAILABLE = "ALL_AVAILABLE",
}

export enum OCRConfidenceLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum ContentDiffType {
  ADDED = "ADDED",
  REMOVED = "REMOVED",
  MODIFIED = "MODIFIED",
  UNCHANGED = "UNCHANGED",
}

export enum TranslationReviewStatus {
  UNREVIEWED = "UNREVIEWED",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEEDS_REVISION = "NEEDS_REVISION",
}

export enum LanguageScriptDirection {
  LEFT_TO_RIGHT = "LEFT_TO_RIGHT",
  RIGHT_TO_LEFT = "RIGHT_TO_LEFT",
  TOP_TO_BOTTOM = "TOP_TO_BOTTOM",
}

export enum FallbackStrategy {
  PARENT_LOCALE = "PARENT_LOCALE",
  DEFAULT_LOCALE = "DEFAULT_LOCALE",
  ENGLISH = "ENGLISH",
  RAW_KEY = "RAW_KEY",
}

export enum ContentPluralizationMode {
  SIMPLE = "SIMPLE",
  ICU = "ICU",
  CLDR = "CLDR",
}

export enum TranslationVendorTier {
  FREE = "FREE",
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum CulturalSensitivityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum LocalizationAssetType {
  STRING = "STRING",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  FONT = "FONT",
  LAYOUT = "LAYOUT",
}

export enum QualityGateStatus {
  PASSED = "PASSED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  SKIPPED = "SKIPPED",
}

export enum TranslationPlatformType {
  WEB = "WEB",
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
  API = "API",
  PLUGIN = "PLUGIN",
}

export interface TranslationEngineConfig {
  id: string;
  engine: TranslationEngine;
  apiKey?: string;
  endpoint?: string;
  maxCharacters: number;
  supportedLanguages: string[];
  isActive: boolean;
  priority: number;
  rateLimit: number;
  quotaUsed: number;
  quotaLimit: number;
  quotaUnit: APIQuotaUnit;
  customTerms: GlossaryEntry[];
  excludedLanguages: string[];
  config: Record<string, unknown>;
}

export interface GlossaryEntry {
  id: string;
  sourceTerm: string;
  targetTerm: string;
  sourceLanguage: string;
  targetLanguage: string;
  context?: string;
  matchType: GlossaryMatchType;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationJob {
  id: string;
  schoolId: string;
  jobType: TranslationJobType;
  status: TranslationStatus;
  sourceLanguage: string;
  targetLanguages: string[];
  contentType: ContentType;
  contentCategory: ContentCategory;
  priority: TranslationPriority;
  sourceContent: string;
  targetContent?: string;
  engineUsed: TranslationEngine;
  characterCount: number;
  wordCount: number;
  estimatedTime: number;
  elapsedTime: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  error?: TranslationError;
  metadata: Record<string, unknown>;
}

export interface TranslationError {
  code: string;
  message: string;
  details: Record<string, unknown>;
  retryable: boolean;
  timestamp: string;
}

export interface TranslationResult {
  id: string;
  jobId: string;
  targetLanguage: string;
  translatedContent: string;
  engineUsed: TranslationEngine;
  confidence: number;
  qualityScore: number;
  translationMemoryHits: number;
  terminologyHits: number;
  suggestions: TranslationSuggestion[];
  alternativeTranslations: AlternativeTranslation[];
  processingTime: number;
  createdAt: string;
}

export interface TranslationSuggestion {
  id: string;
  originalText: string;
  suggestedText: string;
  reason: string;
  confidence: number;
  source: TranslationMemoryType;
}

export interface AlternativeTranslation {
  text: string;
  confidence: number;
  engine: TranslationEngine;
  context: string;
}

export interface TranslationMemory {
  id: string;
  schoolId: string;
  name: string;
  type: TranslationMemoryType;
  sourceLanguage: string;
  targetLanguage: string;
  entryCount: number;
  sizeBytes: number;
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string;
  isActive: boolean;
}

export interface Localisation {
  id: string;
  schoolId: string;
  scope: LocalisationScope;
  languageCode: string;
  dialect?: string;
  country: string;
  region?: string;
  isActive: boolean;
  completionPercentage: number;
  entries: LocalisationEntry[];
  createdAt: string;
  updatedAt: string;
  version: number;
  isDefault: boolean;
}

export interface LocalisationEntry {
  id: string;
  localisationId: string;
  key: string;
  value: string;
  context?: string;
  pluralForm?: PluralForm;
  gender?: GenderType;
  maxLength?: number;
  contentType: ContentType;
  status: TranslationStatus;
  translatorId?: string;
  reviewerId?: string;
  lastTranslatedAt?: string;
  lastReviewedAt?: string;
  comments: LocalisationComment[];
  tags: string[];
}

export interface LocalisationComment {
  id: string;
  entryId: string;
  authorId: string;
  content: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface MultilingualContent {
  id: string;
  schoolId: string;
  contentType: ContentType;
  category: ContentCategory;
  originalLanguage: string;
  translations: ContentTranslation[];
  version: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export interface ContentTranslation {
  id: string;
  contentId: string;
  targetLanguage: string;
  translatedContent: string;
  status: TranslationStatus;
  qualityScore: number;
  translationEngine: TranslationEngine;
  translatorId?: string;
  reviewedAt?: string;
  reviewerId?: string;
  publishedAt?: string;
  syncStatus: ContentSyncStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LanguagePack {
  id: string;
  name: string;
  version: string;
  languageCode: string;
  languageName: string;
  type: LanguagePackType;
  dialect?: string;
  country: string;
  direction: TextDirection;
  script: ScriptType;
  localeFormat: LocaleFormat;
  dateFormat: DateFormatStyle;
  timeFormat: TimeFormatStyle;
  numberFormat: NumberFormatStyle;
  currencyCode: LocaleCurrency;
  weekStartDay: WeekStartDay;
  pluralRules: PluralRule[];
  entryCount: number;
  sizeBytes: number;
  isActive: boolean;
  isDefault: boolean;
  isComplete: boolean;
  completionPercentage: number;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  checksum: string;
}

export interface PluralRule {
  pluralForm: PluralForm;
  condition: string;
  example: string;
}

export interface VoiceTranslation {
  id: string;
  schoolId: string;
  mode: VoiceTranslationMode;
  sourceLanguage: string;
  targetLanguage: string;
  audioQuality: AudioQuality;
  voiceGender: VoiceGender;
  speechRate: SpeechRate;
  inputAudioUrl?: string;
  outputAudioUrl?: string;
  transcript: string;
  translation: string;
  confidence: number;
  duration: number;
  status: TranslationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VoiceTranslationSession {
  id: string;
  voiceTranslationId: string;
  participants: VoiceParticipant[];
  mode: VoiceTranslationMode;
  startedAt: string;
  endedAt?: string;
  duration: number;
  isActive: boolean;
}

export interface VoiceParticipant {
  userId: string;
  language: string;
  role: string;
  joinedAt: string;
  leftAt?: string;
}

export interface OCRTranslation {
  id: string;
  schoolId: string;
  mode: OCRMode;
  sourceLanguage: string;
  targetLanguage: string;
  imageUrl: string;
  detectedText: string;
  translatedText: string;
  confidence: number;
  ocrConfidence: OCRConfidenceLevel;
  boundingBoxes: BoundingBox[];
  status: TranslationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BoundingBox {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

export interface LiveInterpretation {
  id: string;
  schoolId: string;
  mode: InterpretationMode;
  sourceLanguage: string;
  targetLanguages: string[];
  sessionId: string;
  interpreterId: string;
  startedAt: string;
  endedAt?: string;
  status: TranslationStatus;
  participants: InterpretationParticipant[];
  quality: AudioQuality;
  latency: number;
}

export interface InterpretationParticipant {
  userId: string;
  role: string;
  language: string;
  joinedAt: string;
  leftAt?: string;
}

export interface CulturalAdaptation {
  id: string;
  schoolId: string;
  type: CulturalAdaptationType;
  sourceLocale: string;
  targetLocale: string;
  originalValue: string;
  adaptedValue: string;
  context: CulturalContext;
  sensitivityLevel: CulturalSensitivityLevel;
  approvedBy?: string;
  approvedAt?: string;
  status: TranslationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AccessibilityConfig {
  id: string;
  schoolId: string;
  standard: AccessibilityStandard;
  enabledFeatures: AccessibilityFeature[];
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
  highContrast: boolean;
  fontSize: number;
  reducedMotion: boolean;
  altTextRequired: boolean;
  captionRequired: boolean;
  audioDescription: boolean;
  colorContrastRatio: number;
  focusIndicators: boolean;
  skipLinks: boolean;
  ariaLabels: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccessibilityFeature {
  feature: string;
  isEnabled: boolean;
  level: string;
  description: string;
}

export interface TranslationConfig {
  id: string;
  schoolId: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  fallbackLanguage: string;
  fallbackStrategy: FallbackStrategy;
  primaryEngine: TranslationEngine;
  engines: TranslationEngineConfig[];
  cacheStrategy: TranslationCacheStrategy;
  cacheTtl: number;
  autoTranslation: boolean;
  requireReview: boolean;
  maxConcurrentJobs: number;
  dailyQuota: number;
  notificationLanguage: NotificationLanguageMode;
  pluralizationMode: ContentPluralizationMode;
  rtlSupport: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalTranslations: number;
  completedTranslations: number;
  failedTranslations: number;
  averageQualityScore: number;
  averageProcessingTime: number;
  totalCharactersTranslated: number;
  totalWordsTranslated: number;
  languagesActive: number;
  topLanguages: LanguageUsageStat[];
  engineUsage: EngineUsageStat[];
  qualityTrend: QualityTrendPoint[];
  costEstimate: number;
  currency: string;
  computedAt: string;
}

export interface LanguageUsageStat {
  language: string;
  translationCount: number;
  characterCount: number;
  averageQuality: number;
}

export interface EngineUsageStat {
  engine: TranslationEngine;
  usageCount: number;
  averageQuality: number;
  averageTime: number;
  costEstimate: number;
}

export interface QualityTrendPoint {
  date: string;
  score: number;
  translationCount: number;
}

export interface TranslationWorkflow {
  id: string;
  schoolId: string;
  name: string;
  steps: WorkflowStep[];
  isActive: boolean;
  triggerCondition: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  stepNumber: number;
  name: string;
  type: string;
  assigneeRole?: string;
  autoAction?: string;
  timeoutMinutes?: number;
}

export interface TranslationProject {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  sourceLanguage: string;
  targetLanguages: string[];
  status: TranslationStatus;
  dueDate?: string;
  budget: number;
  currency: string;
  jobs: TranslationJob[];
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ProjectMember {
  userId: string;
  role: CollaborationPermission;
  joinedAt: string;
}

export interface ContentSyncRecord {
  id: string;
  multilingualContentId: string;
  targetLanguage: string;
  sourceVersion: number;
  targetVersion: number;
  status: ContentSyncStatus;
  lastSyncedAt: string;
  conflictDetails?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface SubtitleTranslation {
  id: string;
  videoId: string;
  sourceLanguage: string;
  targetLanguage: string;
  format: SubtitleFormat;
  entries: SubtitleEntry[];
  status: TranslationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SubtitleEntry {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
  translatedText: string;
}

export interface LocalizationAsset {
  id: string;
  name: string;
  type: LocalizationAssetType;
  sourceLocale: string;
  targetLocale: string;
  filePath: string;
  fileSize: number;
  checksum: string;
  format: LocalizationFileFormat;
  status: TranslationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationQualityAssessment {
  id: string;
  translationResultId: string;
  assessmentType: QualityAssessmentType;
  score: number;
  maxScore: number;
  details: string;
  assessedAt: string;
  assessedBy: string;
  isAutomated: boolean;
}

export interface ErrorCorrection {
  id: string;
  translationResultId: string;
  type: ErrorCorrectionType;
  originalText: string;
  correctedText: string;
  position: number;
  length: number;
  confidence: number;
  appliedAt?: string;
  appliedBy?: string;
}

export interface DialectMapping {
  id: string;
  parentLanguage: string;
  dialect: string;
  variant: DialectVariant;
  region: string;
  isActive: boolean;
  languagePackId: string;
}

export interface VoiceSynthesisConfig {
  id: string;
  language: string;
  voiceGender: VoiceGender;
  speechRate: SpeechRate;
  audioQuality: AudioQuality;
  engine: string;
  pitch?: number;
  volume?: number;
}

export interface PlatformLocalizationConfig {
  id: string;
  platform: TranslationPlatformType;
  defaultLocale: string;
  supportedLocales: string[];
  autoDetect: boolean;
  cookieName: string;
  headerDetection: boolean;
  urlDetection: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationDashboard {
  schoolId: string;
  activeLanguages: number;
  pendingTranslations: number;
  completedToday: number;
  averageQuality: number;
  recentJobs: TranslationJob[];
  topRequestedLanguages: LanguageUsageStat[];
  alerts: TranslationAlert[];
}

export interface TranslationAlert {
  id: string;
  type: string;
  message: string;
  severity: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface RegionalContentRule {
  id: string;
  schoolId: string;
  sourceLocale: string;
  targetLocale: string;
  ruleType: CulturalAdaptationType;
  pattern: string;
  replacement: string;
  priority: number;
  isActive: boolean;
}

export interface TranslationApproval {
  id: string;
  translationResultId: string;
  approverId: string;
  status: TranslationReviewStatus;
  comments: string;
  score?: number;
  approvedAt: string;
}

export interface LocalizationProgress {
  schoolId: string;
  languageCode: string;
  totalKeys: number;
  translatedKeys: number;
  reviewedKeys: number;
  publishedKeys: number;
  completionPercentage: number;
  lastUpdated: string;
}

export interface TranslationBudget {
  id: string;
  schoolId: string;
  month: string;
  allocated: number;
  spent: number;
  remaining: number;
  currency: string;
  breakdown: BudgetBreakdown[];
}

export interface BudgetBreakdown {
  engine: TranslationEngine;
  charactersTranslated: number;
  cost: number;
}
