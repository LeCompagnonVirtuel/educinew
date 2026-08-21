export enum CopilotMode {
  TEXT = "TEXT",
  VOICE = "VOICE",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  SPREADSHEET = "SPREADSHEET",
  PRESENTATION = "PRESENTATION",
  CODE = "CODE",
  DATA = "DATA",
  MULTIMODAL = "MULTIMODAL",
  COLLABORATIVE = "COLLABORATIVE",
  OFFLINE = "OFFLINE",
  STREAMING = "STREAMING",
  BATCH = "BATCH",
  REAL_TIME = "REAL_TIME"
}

export enum CopilotCapability {
  TEXT_GENERATION = "TEXT_GENERATION",
  TEXT_SUMMARIZATION = "TEXT_SUMMARIZATION",
  TEXT_TRANSLATION = "TEXT_TRANSLATION",
  TEXT_ANALYSIS = "TEXT_ANALYSIS",
  TEXT_CLASSIFICATION = "TEXT_CLASSIFICATION",
  TEXT_EXTRACTION = "TEXT_EXTRACTION",
  QUESTION_ANSWERING = "QUESTION_ANSWERING",
  CONVERSATION = "CONVERSATION",
  CONTENT_CREATION = "CONTENT_CREATION",
  CODE_GENERATION = "CODE_GENERATION",
  CODE_REVIEW = "CODE_REVIEW",
  CODE_EXPLANATION = "CODE_EXPLANATION",
  DATA_ANALYSIS = "DATA_ANALYSIS",
  DATA_VISUALIZATION = "DATA_VISUALIZATION",
  PREDICTION = "PREDICTION",
  RECOMMENDATION = "RECOMMENDATION",
  OCR = "OCR",
  IMAGE_ANALYSIS = "IMAGE_ANALYSIS",
  IMAGE_GENERATION = "IMAGE_GENERATION",
  SPEECH_TO_TEXT = "SPEECH_TO_TEXT",
  TEXT_TO_SPEECH = "TEXT_TO_SPEECH",
  VOICE_COMMAND = "VOICE_COMMAND",
  DOCUMENT_PARSING = "DOCUMENT_PARSING",
  DOCUMENT_GENERATION = "DOCUMENT_GENERATION",
  SPREADSHEET_ANALYSIS = "SPREADSHEET_ANALYSIS",
  SPREADSHEET_GENERATION = "SPREADSHEET_GENERATION",
  PRESENTATION_GENERATION = "PRESENTATION_GENERATION",
  VIDEO_ANALYSIS = "VIDEO_ANALYSIS",
  VIDEO_GENERATION = "VIDEO_GENERATION",
  MATH_SOLVING = "MATH_SOLVING",
  GRAMMAR_CHECK = "GRAMMAR_CHECK",
  PLAGIARISM_CHECK = "PLAGIARISM_CHECK",
  CITATION_GENERATION = "CITATION_GENERATION",
  QUIZ_GENERATION = "QUIZ_GENERATION",
  LESSON_PLANNING = "LESSON_PLANNING",
  GRADING = "GRADING",
  FEEDBACK_GENERATION = "FEEDBACK_GENERATION",
  ATTENDANCE_TRACKING = "ATTENDANCE_TRACKING",
  BEHAVIOR_ANALYSIS = "BEHAVIOR_ANALYSIS"
}

export enum CopilotContext {
  CHAT = "CHAT",
  DOCUMENT = "DOCUMENT",
  EMAIL = "EMAIL",
  MEETING = "MEETING",
  CLASSROOM = "CLASSROOM",
  ASSIGNMENT = "ASSIGNMENT",
  EXAM = "EXAM",
  GRADE = "GRADE",
  REPORT = "REPORT",
  FINANCE = "FINANCE",
  HR = "HR",
  INVENTORY = "INVENTORY",
  SCHEDULE = "SCHEDULE",
  COMMUNICATION = "COMMUNICATION",
  ADMINISTRATION = "ADMINISTRATION"
}

export enum VoiceLanguage {
  FRENCH = "FRENCH",
  ENGLISH = "ENGLISH",
  ARABIC = "ARABIC",
  WOLOF = "WOLOF",
  BAMBARA = "BAMBARA",
  HAUSA = "HAUSA",
  SWAHILI = "SWAHILI",
  YORUBA = "YORUBA",
  IGBO = "IGBO",
  AMHARIC = "AMHARIC",
  ZULU = "ZULU",
  XHOSA = "XHOSA",
  SPANISH = "SPANISH",
  PORTUGUESE = "PORTUGUESE",
  MALAY = "MALAY",
  HINDI = "HINDI",
  BENGALI = "BENGALI",
  TURKISH = "TURKISH",
  PERSIAN = "PERSIAN",
  RUSSIAN = "RUSSIAN"
}

export enum OCRFormat {
  PDF = "PDF",
  IMAGE = "IMAGE",
  SCANNED_DOCUMENT = "SCANNED_DOCUMENT",
  PHOTO = "PHOTO",
  SCREENSHOT = "SCREENSHOT",
  HANDWRITING = "HANDWRITING",
  RECEIPT = "RECEIPT",
  INVOICE = "INVOICE",
  BUSINESS_CARD = "BUSINESS_CARD",
  TABLE = "TABLE",
  FORM = "FORM",
  ID_DOCUMENT = "ID_DOCUMENT",
  CERTIFICATE = "CERTIFICATE",
  TRANSCRIPT = "TRANSCRIPT",
  BOOK_PAGE = "BOOK_PAGE"
}

export enum DocumentFormat {
  PDF = "PDF",
  DOCX = "DOCX",
  DOC = "DOC",
  TXT = "TXT",
  RTF = "RTF",
  ODT = "ODT",
  MARKDOWN = "MARKDOWN",
  HTML = "HTML",
  EPUB = "EPUB",
  LATEX = "LATEX",
  PAGES = "PAGES",
  GOOGLE_DOC = "GOOGLE_DOC"
}

export enum SpreadsheetOperation {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ANALYZE = "ANALYZE",
  SORT = "SORT",
  FILTER = "FILTER",
  FORMULA = "FORMULA",
  CHART = "CHART",
  PIVOT = "PIVOT",
  LOOKUP = "LOOKUP",
  AGGREGATE = "AGGREGATE",
  VALIDATE = "VALIDATE",
  TRANSFORM = "TRANSFORM",
  MERGE = "MERGE",
  SPLIT = "SPLIT",
  IMPORT = "IMPORT",
  EXPORT = "EXPORT"
}

export enum ClassroomAction {
  START_LESSON = "START_LESSON",
  END_LESSON = "END_LESSON",
  TAKE_ATTENDANCE = "TAKE_ATTENDANCE",
  ASSIGN_HOMEWORK = "ASSIGN_HOMEWORK",
  GRADE_HOMEWORK = "GRADE_HOMEWORK",
  CONDUCT_QUIZ = "CONDUCT_QUIZ",
  DISCUSS_TOPIC = "DISCUSS_TOPIC",
  SHOW_PRESENTATION = "SHOW_PRESENTATION",
  PLAY_VIDEO = "PLAY_VIDEO",
  SHARE_SCREEN = "SHARE_SCREEN",
  BREAKOUT_ROOM = "BREAKOUT_ROOM",
  POLL_STUDENTS = "POLL_STUDENTS",
  Q_AND_A = "Q_AND_A",
  WHITEBOARD = "WHITEBOARD",
  COLLABORATIVE_DOC = "COLLABORATIVE_DOC",
  TIME_CHECK = "TIME_CHECK",
  NEXT_ACTIVITY = "NEXT_ACTIVITY",
  REVIEW_PREVIOUS = "REVIEW_PREVIOUS"
}

export enum FinanceAction {
  VIEW_BUDGET = "VIEW_BUDGET",
  CREATE_EXPENSE = "CREATE_EXPENSE",
  APPROVE_EXPENSE = "APPROVE_EXPENSE",
  VIEW_REPORT = "VIEW_REPORT",
  GENERATE_INVOICE = "GENERATE_INVOICE",
  PROCESS_PAYMENT = "PROCESS_PAYMENT",
  RECONCILE_ACCOUNT = "RECONCILE_ACCOUNT",
  FORECAST_REVENUE = "FORECAST_REVENUE",
  ANALYZE_COSTS = "ANALYZE_COSTS",
  VIEW_CASHFLOW = "VIEW_CASHFLOW",
  CREATE_BUDGET = "CREATE_BUDGET",
  EXPORT_DATA = "EXPORT_DATA",
  IMPORT_DATA = "IMPORT_DATA",
  SCHEDULE_PAYMENT = "SCHEDULE_PAYMENT",
  VIEW_AUDIT = "VIEW_AUDIT"
}

export enum HRAction {
  VIEW_EMPLOYEES = "VIEW_EMPLOYEES",
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
  UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE",
  PROCESS_LEAVE = "PROCESS_LEAVE",
  VIEW_ATTENDANCE = "VIEW_ATTENDANCE",
  PROCESS_PAYROLL = "PROCESS_PAYROLL",
  CONDUCT_REVIEW = "CONDUCT_REVIEW",
  TRAINING_ASSIGN = "TRAINING_ASSIGN",
  DOCUMENT_MANAGE = "DOCUMENT_MANAGE",
  RECRUITMENT = "RECRUITMENT",
  ONBOARDING = "ONBOARDING",
  OFFBOARDING = "OFFBOARDING",
  BENEFITS_MANAGE = "BENEFITS_MANAGE",
  COMPLIANCE_CHECK = "COMPLIANCE_CHECK",
  REPORT_GENERATE = "REPORT_GENERATE"
}

export enum AcademicAction {
  VIEW_STUDENTS = "VIEW_STUDENTS",
  VIEW_GRADES = "VIEW_GRADES",
  CREATE_ASSIGNMENT = "CREATE_ASSIGNMENT",
  GRADE_ASSIGNMENT = "GRADE_ASSIGNMENT",
  VIEW_ATTENDANCE = "VIEW_ATTENDANCE",
  CREATE_EXAM = "CREATE_EXAM",
  ANALYZE_PERFORMANCE = "ANALYZE_PERFORMANCE",
  GENERATE_REPORT = "GENERATE_REPORT",
  PLAN_LESSON = "PLAN_LESSON",
  MANAGE_COURSE = "MANAGE_COURSE",
  VIEW_SCHEDULE = "VIEW_SCHEDULE",
  PARENT_COMMUNICATION = "PARENT_COMMUNICATION",
  STUDENT_COUNSELING = "STUDENT_COUNSELING",
  CAREER_GUIDANCE = "CAREER_GUIDANCE",
  EXTRA_CURRICULAR = "EXTRA_CURRICULAR"
}

export enum AdminAction {
  VIEW_DASHBOARD = "VIEW_DASHBOARD",
  MANAGE_USERS = "MANAGE_USERS",
  MANAGE_SETTINGS = "MANAGE_SETTINGS",
  VIEW_REPORTS = "VIEW_REPORTS",
  MANAGE_SCHOOL = "MANAGE_SCHOOL",
  MANAGE_CLASSES = "MANAGE_CLASSES",
  MANAGE_SUBJECTS = "MANAGE_SUBJECTS",
  MANAGE_TIMETABLE = "MANAGE_TIMETABLE",
  MANAGE_FEE = "MANAGE_FEE",
  MANAGE_INVENTORY = "MANAGE_INVENTORY",
  MANAGE_TRANSPORT = "MANAGE_TRANSPORT",
  MANAGE_LIBRARY = "MANAGE_LIBRARY",
  MANAGE_CANTEEN = "MANAGE_CANTEEN",
  VIEW_ANALYTICS = "VIEW_ANALYTICS",
  SYSTEM_MAINTENANCE = "SYSTEM_MAINTENANCE"
}

export enum ResponseFormat {
  TEXT = "TEXT",
  MARKDOWN = "MARKDOWN",
  HTML = "HTML",
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV",
  TABLE = "TABLE",
  LIST = "LIST",
  CODE = "CODE",
  CHART = "CHART",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  PDF = "PDF",
  RICH_TEXT = "RICH_TEXT"
}

export enum CopilotTone {
  PROFESSIONAL = "PROFESSIONAL",
  FRIENDLY = "FRIENDLY",
  FORMAL = "FORMAL",
  INFORMAL = "INFORMAL",
  EDUCATIONAL = "EDUCATIONAL",
  ENCOURAGING = "ENCOURAGING",
  CONCISE = "CONCISE",
  DETAILED = "DETAILED",
  TECHNICAL = "TECHNICAL",
  SIMPLE = "SIMPLE"
}

export enum VoiceCommandType {
  NAVIGATION = "NAVIGATION",
  ACTION = "ACTION",
  QUERY = "QUERY",
  INPUT = "INPUT",
  CONTROL = "CONTROL",
  SETTINGS = "SETTINGS",
  HELP = "HELP",
  CANCEL = "CANCEL",
  CONFIRM = "CONFIRM",
  REPEAT = "REPEAT"
}

export enum CopilotResponseStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PARTIAL = "PARTIAL",
  PENDING = "PENDING",
  STREAMING = "STREAMING",
  CANCELLED = "CANCELLED",
  TIMEOUT = "TIMEOUT",
  RATE_LIMITED = "RATE_LIMITED",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND"
}

export enum CopilotSessionType {
  CHAT = "CHAT",
  VOICE = "VOICE",
  DOCUMENT = "DOCUMENT",
  CODE = "CODE",
  DATA = "DATA",
  MULTIMODAL = "MULTIMODAL",
  COLLABORATIVE = "COLLABORATIVE",
  ASYNC = "ASYNC"
}

export enum CopilotFeedbackType {
  THUMBS_UP = "THUMBS_UP",
  THUMBS_DOWN = "THUMBS_DOWN",
  HELPFUL = "HELPFUL",
  NOT_HELPFUL = "NOT_HELPFUL",
  ACCURATE = "ACCURATE",
  INACCURATE = "INACCURATE",
  COMPLETE = "COMPLETE",
  INCOMPLETE = "INCOMPLETE",
  RELEVANT = "RELEVANT",
  IRRELEVANT = "IRRELEVANT"
}

export enum CopilotSecurityLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  CLASSIFIED = "CLASSIFIED"
}

export enum CopilotRateLimitType {
  REQUESTS_PER_MINUTE = "REQUESTS_PER_MINUTE",
  REQUESTS_PER_HOUR = "REQUESTS_PER_HOUR",
  TOKENS_PER_MINUTE = "TOKENS_PER_MINUTE",
  TOKENS_PER_HOUR = "TOKENS_PER_HOUR",
  TOKENS_PER_DAY = "TOKENS_PER_DAY",
  REQUESTS_PER_DAY = "REQUESTS_PER_DAY"
}

export enum CopilotCacheStrategy {
  NONE = "NONE",
  MEMORY = "MEMORY",
  REDIS = "REDIS",
  DATABASE = "DATABASE",
  CDN = "CDN",
  HYBRID = "HYBRID"
}

export enum CopilotModelType {
  TEXT = "TEXT",
  CODE = "CODE",
  MULTIMODAL = "MULTIMODAL",
  EMBEDDING = "EMBEDDING",
  SPEECH = "SPEECH",
  VISION = "VISION"
}

export enum CopilotLogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL"
}

export enum CopilotExportFormat {
  PDF = "PDF",
  DOCX = "DOCX",
  TXT = "TXT",
  MARKDOWN = "MARKDOWN",
  JSON = "JSON",
  HTML = "HTML",
  CSV = "CSV",
  XLSX = "XLSX"
}

export enum CopilotIntegrationType {
  WEBHOOK = "WEBHOOK",
  API = "API",
  SDK = "SDK",
  PLUGIN = "PLUGIN",
  EXTENSION = "EXTENSION",
  WIDGET = "WIDGET"
}

export enum CopilotAnalyticsMetricType {
  RESPONSE_TIME = "RESPONSE_TIME",
  TOKEN_USAGE = "TOKEN_USAGE",
  ERROR_RATE = "ERROR_RATE",
  SUCCESS_RATE = "SUCCESS_RATE",
  USER_SATISFACTION = "USER_SATISFACTION",
  COST_PER_REQUEST = "COST_PER_REQUEST",
  LATENCY = "LATENCY",
  THROUGHPUT = "THROUGHPUT"
}

export enum CopilotContextPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum CopilotDocumentProcessingMode {
  FULL = "FULL",
  SUMMARY = "SUMMARY",
  EXTRACT_KEY_POINTS = "EXTRACT_KEY_POINTS",
  TRANSLATE = "TRANSLATE",
  SIMPLIFY = "SIMPLIFY",
  ANALYZE = "ANALYZE",
  COMPARE = "COMPARE",
  REWRITE = "REWRITE"
}

export enum CopilotVoiceSynthesisQuality {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  ULTRA = "ULTRA"
}

export enum CopilotImageAnalysisType {
  OBJECT_DETECTION = "OBJECT_DETECTION",
  SCENE_CLASSIFICATION = "SCENE_CLASSIFICATION",
  TEXT_EXTRACTION = "TEXT_EXTRACTION",
  FACE_DETECTION = "FACE_DETECTION",
  BARCODE_READING = "BARCODE_READING",
  COLOR_ANALYSIS = "COLOR_ANALYSIS",
  COMPOSITION_ANALYSIS = "COMPOSITION_ANALYSIS",
  QUALITY_ASSESSMENT = "QUALITY_ASSESSMENT"
}

export enum CopilotSpreadsheetCellType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  DATE = "DATE",
  BOOLEAN = "BOOLEAN",
  FORMULA = "FORMULA",
  ERROR = "ERROR",
  EMPTY = "EMPTY"
}

export enum CopilotMeetingAction {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  MUTE = "MUTE",
  UNMUTE = "UNMUTE",
  SHARE_SCREEN = "SHARE_SCREEN",
  STOP_SHARE = "STOP_SHARE",
  RECORD = "RECORD",
  STOP_RECORD = "STOP_RECORD",
  SCHEDULE = "SCHEDULE",
  CANCEL = "CANCEL",
  INVITE = "INVITE",
  MINUTES = "MINUTES",
  ACTION_ITEMS = "ACTION_ITEMS",
  SUMMARY = "SUMMARY"
}

export enum CopilotEmailAction {
  COMPOSE = "COMPOSE",
  REPLY = "REPLY",
  FORWARD = "FORWARD",
  ARCHIVE = "ARCHIVE",
  DELETE = "DELETE",
  FLAG = "FLAG",
  CATEGORIZE = "CATEGORIZE",
  SEARCH = "SEARCH",
  SUMMARIZE = "SUMMARIZE",
  TRANSLATE = "TRANSLATE",
  SCHEDULE = "SCHEDULE",
  TEMPLATE = "TEMPLATE"
}

export enum CopilotAccessibilityFeature {
  SCREEN_READER = "SCREEN_READER",
  VOICE_COMMAND = "VOICE_COMMAND",
  KEYBOARD_NAVIGATION = "KEYBOARD_NAVIGATION",
  HIGH_CONTRAST = "HIGH_CONTRAST",
  LARGE_TEXT = "LARGE_TEXT",
  AUDIO_DESCRIPTIONS = "AUDIO_DESCRIPTIONS",
  CLOSED_CAPTIONS = "CLOSED_CAPTIONS",
  BRAILLE = "BRAILLE"
}

export enum CopilotPersonalizationType {
  LEARNING_STYLE = "LEARNING_STYLE",
  PACE = "PACE",
  DIFFICULTY = "DIFFICULTY",
  LANGUAGE = "LANGUAGE",
  NOTIFICATION = "NOTIFICATION",
  THEME = "THEME",
  LAYOUT = "LAYOUT",
  SHORTCUTS = "SHORTCUTS"
}

export enum CopilotDataPrivacyLevel {
  ANONYMOUS = "ANONYMOUS",
  PSEUDONYMOUS = "PSEUDONYMOUS",
  PERSONAL = "PERSONAL",
  SENSITIVE = "SENSITIVE",
  RESTRICTED = "RESTRICTED"
}

export interface CopilotSession {
  id: string;
  userId: string;
  schoolId: string;
  type: CopilotSessionType;
  mode: CopilotMode;
  context: CopilotContext;
  messages: CopilotMessage[];
  status: CopilotResponseStatus;
  metadata: CopilotSessionMetadata;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface CopilotSessionMetadata {
  totalMessages: number;
  totalTokens: number;
  averageResponseTime: number;
  satisfactionScore: number;
  deviceInfo: CopilotDeviceInfo;
  language: VoiceLanguage;
  securityLevel: CopilotSecurityLevel;
}

export interface CopilotDeviceInfo {
  platform: string;
  browser: string;
  os: string;
  screenResolution: string;
  isMobile: boolean;
}

export interface CopilotMessage {
  id: string;
  sessionId: string;
  role: string;
  content: string;
  format: ResponseFormat;
  tokens: number;
  latency: number;
  metadata: CopilotMessageMetadata;
  createdAt: Date;
}

export interface CopilotMessageMetadata {
  model: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  stopSequences: string[];
  cached: boolean;
  streaming: boolean;
}

export interface CopilotResponse {
  id: string;
  messageId: string;
  content: string;
  format: ResponseFormat;
  confidence: number;
  suggestions: CopilotSuggestion[];
  sources: CopilotSource[];
  metadata: CopilotResponseMetadata;
  createdAt: Date;
}

export interface CopilotSuggestion {
  type: string;
  content: string;
  confidence: number;
  action: string;
  metadata: Record<string, unknown>;
}

export interface CopilotSource {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  score: number;
  type: string;
}

export interface CopilotResponseMetadata {
  model: string;
  tokensUsed: number;
  processingTime: number;
  cached: boolean;
  ragUsed: boolean;
  reasoningSteps: number;
}

export interface VoiceAssistant {
  id: string;
  schoolId: string;
  language: VoiceLanguage;
  quality: CopilotVoiceSynthesisQuality;
  wakeWord: string;
  commands: VoiceCommand[];
  sessions: VoiceSession[];
  config: VoiceAssistantConfig;
  metadata: VoiceAssistantMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceCommand {
  id: string;
  assistantId: string;
  type: VoiceCommandType;
  trigger: string;
  aliases: string[];
  action: string;
  parameters: VoiceCommandParameter[];
  enabled: boolean;
  metadata: VoiceCommandMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceCommandParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue: unknown;
}

export interface VoiceCommandMetadata {
  successRate: number;
  usageCount: number;
  lastUsed: Date;
  avgResponseTime: number;
}

export interface VoiceSession {
  id: string;
  assistantId: string;
  userId: string;
  start_time: Date;
  end_time: Date | null;
  duration: number;
  commandsExecuted: number;
  transcripts: VoiceTranscript[];
  metadata: VoiceSessionMetadata;
}

export interface VoiceTranscript {
  id: string;
  sessionId: string;
  text: string;
  confidence: number;
  language: VoiceLanguage;
  timestamp: Date;
  duration: number;
}

export interface VoiceSessionMetadata {
  deviceType: string;
  networkQuality: string;
  backgroundNoise: string;
  speakerCount: number;
}

export interface VoiceAssistantConfig {
  wakeWordEnabled: boolean;
  continuousListening: boolean;
  noiseReduction: boolean;
  echoCancellation: boolean;
  autoLanguageDetection: boolean;
  offlineMode: boolean;
  streamingEnabled: boolean;
  maxSessionDuration: number;
}

export interface VoiceAssistantMetadata {
  totalSessions: number;
  totalCommands: number;
  successRate: number;
  avgResponseTime: number;
  lastCalibrated: Date;
}

export interface OCRResult {
  id: string;
  schoolId: string;
  inputFormat: OCRFormat;
  text: string;
  confidence: number;
  language: string;
  elements: OCRElement[];
  tables: OCRTable[];
  metadata: OCRResultMetadata;
  createdAt: Date;
}

export interface OCRElement {
  id: string;
  type: string;
  text: string;
  confidence: number;
  boundingBox: OCRBoundingBox;
  style: OCRStyle;
}

export interface OCRBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OCRStyle {
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
}

export interface OCRTable {
  id: string;
  rows: number;
  columns: number;
  cells: OCRTableCell[][];
  confidence: number;
}

export interface OCRTableCell {
  text: string;
  confidence: number;
  rowSpan: number;
  colSpan: number;
}

export interface OCRResultMetadata {
  processingTime: number;
  pageCount: number;
  resolution: number;
  dpi: number;
}

export interface PDFAnalysis {
  id: string;
  schoolId: string;
  fileName: string;
  pageCount: number;
  metadata: PDFMetadata;
  content: PDFContent;
  analysis: PDFAnalysisResult;
  createdAt: Date;
}

export interface PDFMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  creator: string;
  producer: string;
  creationDate: Date;
  modDate: Date;
  fileSize: number;
}

export interface PDFContent {
  text: string;
  images: PDFImage[];
  tables: PDFTable[];
  links: PDFLink[];
  annotations: PDFAnnotation[];
}

export interface PDFImage {
  id: string;
  index: number;
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface PDFTable {
  id: string;
  index: number;
  rows: number;
  columns: number;
  data: string[][];
}

export interface PDFLink {
  id: string;
  text: string;
  url: string;
  page: number;
}

export interface PDFAnnotation {
  id: string;
  type: string;
  content: string;
  page: number;
  position: PDFPosition;
}

export interface PDFPosition {
  x: number;
  y: number;
  page: number;
}

export interface PDFAnalysisResult {
  summary: string;
  keyPoints: string[];
  entities: string[];
  sentiment: string;
  topics: string[];
  readability: number;
}

export interface SpreadsheetAnalysis {
  id: string;
  schoolId: string;
  fileName: string;
  sheetCount: number;
  sheets: SpreadsheetSheet[];
  analysis: SpreadsheetAnalysisResult;
  metadata: SpreadsheetMetadata;
  createdAt: Date;
}

export interface SpreadsheetSheet {
  name: string;
  index: number;
  rows: number;
  columns: number;
  data: unknown[][];
  headers: string[];
}

export interface SpreadsheetAnalysisResult {
  summary: string;
  statistics: SpreadsheetStatistics;
  insights: string[];
  anomalies: string[];
  recommendations: string[];
}

export interface SpreadsheetStatistics {
  totalCells: number;
  numericCells: number;
  textCells: number;
  emptyCells: number;
  averageNumeric: number;
  medianNumeric: number;
  stdDeviation: number;
}

export interface SpreadsheetMetadata {
  format: string;
  version: string;
  author: string;
  created: Date;
  modified: Date;
}

export interface ClassroomContext {
  id: string;
  schoolId: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  sessionId: string;
  students: ClassroomStudent[];
  currentActivity: ClassroomActivity;
  metadata: ClassroomContextMetadata;
  createdAt: Date;
}

export interface ClassroomStudent {
  id: string;
  name: string;
  status: string;
  engagement: number;
  lastInteraction: Date;
}

export interface ClassroomActivity {
  type: string;
  title: string;
  description: string;
  startTime: Date;
  duration: number;
  status: string;
}

export interface ClassroomContextMetadata {
  totalStudents: number;
  presentStudents: number;
  averageEngagement: number;
  sessionProgress: number;
}

export interface FinanceContext {
  id: string;
  schoolId: string;
  fiscalYear: number;
  period: string;
  budget: FinanceBudget;
  transactions: FinanceTransaction[];
  metrics: FinanceMetricsData;
  metadata: FinanceContextMetadata;
  createdAt: Date;
}

export interface FinanceBudget {
  totalBudget: number;
  spent: number;
  remaining: number;
  categories: FinanceBudgetCategory[];
}

export interface FinanceBudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export interface FinanceTransaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: string;
  category: string;
}

export interface FinanceMetricsData {
  revenue: number;
  expenses: number;
  netIncome: number;
  cashFlow: number;
}

export interface FinanceContextMetadata {
  lastUpdated: Date;
  dataFreshness: string;
  alerts: string[];
}

export interface HRContext {
  id: string;
  schoolId: string;
  departmentId: string;
  employeeCount: number;
  employees: HREmployee[];
  metrics: HRMetrics;
  metadata: HRContextMetadata;
  createdAt: Date;
}

export interface HREmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: string;
  joinDate: Date;
}

export interface HRMetrics {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  turnoverRate: number;
  averageTenure: number;
}

export interface HRContextMetadata {
  lastUpdated: Date;
  dataFreshness: string;
  alerts: string[];
}

export interface AcademicContext {
  id: string;
  schoolId: string;
  academicYear: number;
  semester: string;
  studentCount: number;
  courses: AcademicCourse[];
  metrics: AcademicMetrics;
  metadata: AcademicContextMetadata;
  createdAt: Date;
}

export interface AcademicCourse {
  id: string;
  name: string;
  code: string;
  teacher: string;
  students: number;
  averageGrade: number;
}

export interface AcademicMetrics {
  totalStudents: number;
  averageGPA: number;
  passRate: number;
  attendanceRate: number;
  graduationRate: number;
}

export interface AcademicContextMetadata {
  lastUpdated: Date;
  dataFreshness: string;
  alerts: string[];
}

export interface AdminContext {
  id: string;
  schoolId: string;
  modules: AdminModule[];
  users: AdminUser[];
  metrics: AdminMetrics;
  metadata: AdminContextMetadata;
  createdAt: Date;
}

export interface AdminModule {
  id: string;
  name: string;
  status: string;
  lastUpdated: Date;
  usageCount: number;
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  lastActive: Date;
  status: string;
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  systemHealth: number;
  storageUsed: number;
  apiCalls: number;
}

export interface AdminContextMetadata {
  lastUpdated: Date;
  systemVersion: string;
  alerts: string[];
}

export interface CopilotCapabilityConfig {
  id: string;
  capability: CopilotCapability;
  enabled: boolean;
  config: Record<string, unknown>;
  quota: CopilotQuota;
  metadata: CopilotCapabilityConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotQuota {
  dailyLimit: number;
  monthlyLimit: number;
  usedToday: number;
  usedThisMonth: number;
  resetDate: Date;
}

export interface CopilotCapabilityConfigMetadata {
  version: string;
  lastUpdated: Date;
  performance: CopilotCapabilityPerformance;
}

export interface CopilotCapabilityPerformance {
  avgResponseTime: number;
  successRate: number;
  errorRate: number;
  userRating: number;
}

export interface CopilotConfig {
  id: string;
  schoolId: string;
  defaultMode: CopilotMode;
  defaultLanguage: VoiceLanguage;
  defaultTone: CopilotTone;
  capabilities: CopilotCapabilityConfig[];
  security: CopilotSecurityConfig;
  rateLimit: CopilotRateLimitConfig;
  cache: CopilotCacheConfig;
  metadata: CopilotConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotSecurityConfig {
  level: CopilotSecurityLevel;
  dataPrivacy: CopilotDataPrivacyLevel;
  encryptionEnabled: boolean;
  auditLogEnabled: boolean;
  ipWhitelist: string[];
  sessionTimeout: number;
}

export interface CopilotRateLimitConfig {
  enabled: boolean;
  limits: CopilotRateLimitEntry[];
  windowMs: number;
}

export interface CopilotRateLimitEntry {
  type: CopilotRateLimitType;
  limit: number;
  windowMs: number;
}

export interface CopilotCacheConfig {
  strategy: CopilotCacheStrategy;
  ttlSeconds: number;
  maxSize: number;
  evictionPolicy: string;
}

export interface CopilotConfigMetadata {
  version: string;
  lastUpdated: Date;
  environment: string;
}

export interface CopilotMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalSessions: number;
  totalMessages: number;
  totalTokens: number;
  averageResponseTime: number;
  successRate: number;
  errorRate: number;
  userSatisfaction: number;
  capabilityBreakdown: CopilotCapabilityMetrics[];
  metadata: CopilotMetricsMetadata;
  createdAt: Date;
}

export interface CopilotCapabilityMetrics {
  capability: CopilotCapability;
  usageCount: number;
  avgResponseTime: number;
  successRate: number;
  tokensUsed: number;
}

export interface CopilotMetricsMetadata {
  dataFreshness: string;
  aggregationPeriod: string;
  sampleSize: number;
}

export interface CopilotHistory {
  id: string;
  userId: string;
  schoolId: string;
  sessions: CopilotSessionSummary[];
  totalSessions: number;
  totalMessages: number;
  favoriteCapabilities: string[];
  metadata: CopilotHistoryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotSessionSummary {
  sessionId: string;
  type: CopilotSessionType;
  startTime: Date;
  endTime: Date;
  messageCount: number;
  satisfaction: number;
  topics: string[];
}

export interface CopilotHistoryMetadata {
  averageSessionDuration: number;
  averageMessagesPerSession: number;
  topTopics: string[];
  improvementSuggestions: string[];
}

export interface CopilotFeedback {
  id: string;
  userId: string;
  sessionId: string;
  messageId: string;
  type: CopilotFeedbackType;
  rating: number;
  comment: string;
  tags: string[];
  metadata: CopilotFeedbackMetadata;
  createdAt: Date;
}

export interface CopilotFeedbackMetadata {
  category: string;
  priority: string;
  resolved: boolean;
  response: string;
}

export interface CopilotDocument {
  id: string;
  schoolId: string;
  userId: string;
  name: string;
  type: DocumentFormat;
  size: number;
  content: string;
  analysis: CopilotDocumentAnalysis;
  metadata: CopilotDocumentMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotDocumentAnalysis {
  summary: string;
  keyPoints: string[];
  entities: string[];
  sentiment: string;
  topics: string[];
  wordCount: number;
  readingTime: number;
}

export interface CopilotDocumentMetadata {
  uploadSource: string;
  processingTime: number;
  lastAccessed: Date;
  accessCount: number;
}

export interface CopilotEmail {
  id: string;
  schoolId: string;
  userId: string;
  action: CopilotEmailAction;
  subject: string;
  body: string;
  recipients: string[];
  cc: string[];
  bcc: string[];
  attachments: CopilotAttachment[];
  metadata: CopilotEmailMetadata;
  createdAt: Date;
  sentAt: Date | null;
}

export interface CopilotAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface CopilotEmailMetadata {
  template: string;
  scheduled: boolean;
  readBy: string[];
  priority: string;
}

export interface CopilotMeeting {
  id: string;
  schoolId: string;
  organizerId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendees: CopilotMeetingAttendee[];
  action: CopilotMeetingAction;
  minutes: CopilotMeetingMinutes;
  metadata: CopilotMeetingMetadata;
  createdAt: Date;
}

export interface CopilotMeetingAttendee {
  userId: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

export interface CopilotMeetingMinutes {
  summary: string;
  actionItems: CopilotActionItem[];
  decisions: string[];
  nextSteps: string[];
}

export interface CopilotActionItem {
  id: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: string;
}

export interface CopilotMeetingMetadata {
  recordingUrl: string;
  transcriptUrl: string;
  duration: number;
  platform: string;
}

export interface CopilotCodeAnalysis {
  id: string;
  schoolId: string;
  language: string;
  code: string;
  analysis: CopilotCodeAnalysisResult;
  suggestions: CopilotCodeSuggestion[];
  metadata: CopilotCodeAnalysisMetadata;
  createdAt: Date;
}

export interface CopilotCodeAnalysisResult {
  complexity: number;
  maintainability: number;
  readability: number;
  issues: CopilotCodeIssue[];
  metrics: CopilotCodeMetrics;
}

export interface CopilotCodeIssue {
  type: string;
  severity: string;
  line: number;
  column: number;
  message: string;
  suggestion: string;
}

export interface CopilotCodeMetrics {
  linesOfCode: number;
  functions: number;
  classes: number;
  comments: number;
  duplication: number;
}

export interface CopilotCodeSuggestion {
  type: string;
  description: string;
  confidence: number;
  code: string;
  line: number;
}

export interface CopilotCodeAnalysisMetadata {
  executionTime: number;
  rulesApplied: number;
  fixableIssues: number;
}

export interface CopilotChatExport {
  id: string;
  sessionId: string;
  format: CopilotExportFormat;
  content: string;
  url: string;
  size: number;
  metadata: CopilotChatExportMetadata;
  createdAt: Date;
  expiresAt: Date;
}

export interface CopilotChatExportMetadata {
  messageCount: number;
  includeTimestamps: boolean;
  includeMetadata: boolean;
}

export interface CopilotPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  type: CopilotIntegrationType;
  capabilities: CopilotCapability[];
  config: Record<string, unknown>;
  metadata: CopilotPluginMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotPluginMetadata {
  author: string;
  license: string;
  downloads: number;
  rating: number;
  verified: boolean;
}

export interface CopilotWebhook {
  id: string;
  schoolId: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  metadata: CopilotWebhookMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotWebhookMetadata {
  lastTriggered: Date;
  successCount: number;
  failureCount: number;
  averageLatency: number;
}

export interface CopilotTrainingData {
  id: string;
  schoolId: string;
  type: string;
  examples: CopilotTrainingExample[];
  totalExamples: number;
  metadata: CopilotTrainingDataMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotTrainingExample {
  input: string;
  output: string;
  context: Record<string, unknown>;
  quality: number;
}

export interface CopilotTrainingDataMetadata {
  lastTrained: Date;
  accuracy: number;
  version: string;
}

export interface CopilotSearchResult {
  id: string;
  query: string;
  results: CopilotSearchItem[];
  totalResults: number;
  metadata: CopilotSearchResultMetadata;
  createdAt: Date;
}

export interface CopilotSearchItem {
  id: string;
  title: string;
  content: string;
  score: number;
  source: string;
  type: string;
  highlights: string[];
}

export interface CopilotSearchResultMetadata {
  executionTime: number;
  indexUsed: string;
  filtersApplied: number;
}

export interface CopilotPersonalization {
  id: string;
  userId: string;
  type: CopilotPersonalizationType;
  value: string;
  metadata: CopilotPersonalizationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotPersonalizationMetadata {
  source: string;
  confidence: number;
  lastUsed: Date;
}

export interface CopilotNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  priority: string;
  read: boolean;
  actionUrl: string;
  metadata: CopilotNotificationMetadata;
  createdAt: Date;
}

export interface CopilotNotificationMetadata {
  channel: string;
  delivered: boolean;
  clicked: boolean;
}

export interface CopilotAccessibilityConfig {
  id: string;
  userId: string;
  features: CopilotAccessibilityFeature[];
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
  metadata: CopilotAccessibilityConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotAccessibilityConfigMetadata {
  lastTested: Date;
  complianceLevel: string;
  issues: string[];
}

export interface CopilotWorkflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  trigger: string;
  steps: CopilotWorkflowStep[];
  enabled: boolean;
  metadata: CopilotWorkflowMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotWorkflowStep {
  order: number;
  type: string;
  action: string;
  parameters: Record<string, unknown>;
  nextStep: number | null;
}

export interface CopilotWorkflowMetadata {
  executions: number;
  successRate: number;
  lastExecuted: Date;
  averageDuration: number;
}

export interface CopilotIntegration {
  id: string;
  schoolId: string;
  type: CopilotIntegrationType;
  name: string;
  config: Record<string, unknown>;
  enabled: boolean;
  metadata: CopilotIntegrationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotIntegrationMetadata {
  lastSync: Date;
  syncStatus: string;
  errorCount: number;
}

export interface CopilotAnalytics {
  id: string;
  schoolId: string;
  period: string;
  metrics: CopilotAnalyticsMetrics;
  trends: CopilotAnalyticsTrend[];
  metadata: CopilotAnalyticsMetadata;
  createdAt: Date;
}

export interface CopilotAnalyticsMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLatency: number;
  p95Latency: number;
  p99Latency: number;
  totalTokens: number;
  costTotal: number;
}

export interface CopilotAnalyticsTrend {
  metric: string;
  period: string;
  values: number[];
  trend: string;
  changePercent: number;
}

export interface CopilotAnalyticsMetadata {
  dataSources: string[];
  aggregationMethod: string;
  lastUpdated: Date;
}

export interface CopilotRateLimit {
  id: string;
  userId: string;
  schoolId: string;
  limits: CopilotRateLimitState[];
  metadata: CopilotRateLimitMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotRateLimitState {
  type: CopilotRateLimitType;
  current: number;
  limit: number;
  remaining: number;
  resetAt: Date;
}

export interface CopilotRateLimitMetadata {
  windowMs: number;
  strategy: string;
  lastRequest: Date;
}

export interface CopilotCacheEntry {
  id: string;
  key: string;
  value: string;
  ttl: number;
  hits: number;
  size: number;
  metadata: CopilotCacheEntryMetadata;
  createdAt: Date;
  expiresAt: Date;
}

export interface CopilotCacheEntryMetadata {
  source: string;
  compressed: boolean;
  tags: string[];
}

export interface CopilotAuditLog {
  id: string;
  userId: string;
  schoolId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  metadata: CopilotAuditLogMetadata;
  createdAt: Date;
}

export interface CopilotAuditLogMetadata {
  severity: string;
  category: string;
  retention: number;
}

export interface CopilotExport {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  format: CopilotExportFormat;
  status: string;
  url: string | null;
  size: number | null;
  metadata: CopilotExportMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface CopilotExportMetadata {
  recordCount: number;
  dateRange: string;
  filters: Record<string, unknown>;
}

export interface CopilotModelConfig {
  id: string;
  schoolId: string;
  modelType: CopilotModelType;
  provider: string;
  modelId: string;
  apiEndpoint: string;
  config: CopilotModelSettings;
  metadata: CopilotModelConfigMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotModelSettings {
  temperature: number;
  topP: number;
  maxTokens: number;
  stopSequences: string[];
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface CopilotModelConfigMetadata {
  costPerToken: number;
  rateLimit: number;
  lastUpdated: Date;
}

export interface CopilotConversationSummary {
  id: string;
  sessionId: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  decisions: string[];
  sentiment: string;
  metadata: CopilotConversationSummaryMetadata;
  createdAt: Date;
}

export interface CopilotConversationSummaryMetadata {
  messageCount: number;
  duration: number;
  participantCount: number;
}

export enum CopilotInputModality {
  TEXT = "TEXT",
  VOICE = "VOICE",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  FILE = "FILE",
  MULTIMODAL = "MULTIMODAL",
  GESTURE = "GESTURE",
  BRAIN_COMPUTER = "BRAIN_COMPUTER"
}

export enum CopilotOutputModality {
  TEXT = "TEXT",
  VOICE = "VOICE",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  CODE = "CODE",
  CHART = "CHART",
  TABLE = "TABLE"
}

export enum CopilotAttentionLevel {
  MINIMAL = "MINIMAL",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  FULL = "FULL"
}

export enum CopilotResponseStyle {
  CONCISE = "CONCISE",
  DETAILED = "DETAILED",
  STEP_BY_STEP = "STEP_BY_STEP",
  VISUAL = "VISUAL",
  INTERACTIVE = "INTERACTIVE",
  NARRATIVE = "NARRATIVE",
  TECHNICAL = "TECHNICAL",
  BEGINNER_FRIENDLY = "BEGINNER_FRIENDLY"
}

export enum CopilotLanguageStyle {
  FORMAL = "FORMAL",
  INFORMAL = "INFORMAL",
  ACADEMIC = "ACADEMIC",
  CONVERSATIONAL = "CONVERSATIONAL",
  INSTRUCTIONAL = "INSTRUCTIONAL",
  MOTIVATIONAL = "MOTIVATIONAL"
}

export enum CopilotTaskComplexity {
  SIMPLE = "SIMPLE",
  MODERATE = "MODERATE",
  COMPLEX = "COMPLEX",
  EXPERT = "EXPERT",
  RESEARCH = "RESEARCH"
}

export enum CopilotLearningMode {
  PASSIVE = "PASSIVE",
  ACTIVE = "ACTIVE",
  ADAPTIVE = "ADAPTIVE",
  GUIDED = "GUIDED",
  EXPLORATORY = "EXPLORATORY"
}

export enum CopilotFeedbackSentiment {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
  MIXED = "MIXED"
}

export enum CopilotIntegrationProtocol {
  REST = "REST",
  GRAPHQL = "GRAPHQL",
  GRPC = "GRPC",
  WEBSOCKET = "WEBSOCKET",
  MQTT = "MQTT",
  AMQP = "AMQP"
}

export enum CopilotAccessibilityMode {
  STANDARD = "STANDARD",
  SCREEN_READER = "SCREEN_READER",
  VOICE_ONLY = "VOICE_ONLY",
  KEYBOARD_ONLY = "KEYBOARD_ONLY",
  HIGH_CONTRAST = "HIGH_CONTRAST",
  LARGE_TEXT = "LARGE_TEXT"
}

export enum CopilotCollaborationMode {
  SOLO = "SOLO",
  PAIR = "PAIR",
  TEAM = "TEAM",
  AUDIENCE = "AUDIENCE"
}

export enum CopilotContentFilter {
  NONE = "NONE",
  MILD = "MILD",
  MODERATE = "MODERATE",
  STRICT = "STRICT",
  CUSTOM = "CUSTOM"
}

export enum CopilotModelProvider {
  OPENAI = "OPENAI",
  ANTHROPIC = "ANTHROPIC",
  GOOGLE = "GOOGLE",
  META = "META",
  MISTRAL = "MISTRAL",
  COHERE = "COHERE",
  HUGGINGFACE = "HUGGINGFACE",
  AZURE = "AZURE",
  AWS = "AWS",
  CUSTOM = "CUSTOM"
}

export enum CopilotStreamingMode {
  NONE = "NONE",
  TOKEN = "TOKEN",
  CHUNK = "CHUNK",
  LINE = "LINE",
  SENTENCE = "SENTENCE",
  PARAGRAPH = "PARAGRAPH"
}

export enum CopilotMemoryType {
  SESSION = "SESSION",
  USER_PREFERENCE = "USER_PREFERENCE",
  CONTEXT = "CONTEXT",
  HISTORY = "HISTORY",
  LEARNING = "LEARNING",
  PERSONALIZATION = "PERSONALIZATION"
}

export interface CopilotAttentionState {
  id: string;
  sessionId: string;
  level: CopilotAttentionLevel;
  focus: string;
  distractions: string[];
  recommendations: string[];
  metadata: CopilotAttentionStateMetadata;
  updatedAt: Date;
}

export interface CopilotAttentionStateMetadata {
  eyeTracking: boolean;
  interactionRate: number;
  responseTime: number;
}

export interface CopilotLearningProfile {
  id: string;
  userId: string;
  schoolId: string;
  learningStyle: string;
  pace: string;
  preferences: CopilotLearningPreference[];
  history: CopilotLearningHistoryEntry[];
  metadata: CopilotLearningProfileMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotLearningPreference {
  category: string;
  preference: string;
  strength: number;
}

export interface CopilotLearningHistoryEntry {
  topic: string;
  performance: number;
  timestamp: Date;
  duration: number;
}

export interface CopilotLearningProfileMetadata {
  totalSessions: number;
  avgPerformance: number;
  improvementRate: number;
}

export interface CopilotContentAnalysis {
  id: string;
  content: string;
  type: string;
  sentiment: CopilotFeedbackSentiment;
  topics: string[];
  entities: string[];
  readability: number;
  wordCount: number;
  metadata: CopilotContentAnalysisMetadata;
  createdAt: Date;
}

export interface CopilotContentAnalysisMetadata {
  model: string;
  processingTime: number;
  confidence: number;
}

export interface CopilotRecommendation {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  confidence: number;
  action: string;
  metadata: CopilotRecommendationMetadata;
  createdAt: Date;
}

export interface CopilotRecommendationMetadata {
  source: string;
  basis: string;
  feedback: string;
  accepted: boolean;
}

export interface CopilotQualityMetric {
  id: string;
  schoolId: string;
  metric: string;
  value: number;
  target: number;
  trend: number;
  period: string;
  metadata: CopilotQualityMetricMetadata;
  measuredAt: Date;
}

export interface CopilotQualityMetricMetadata {
  unit: string;
  benchmark: number;
  percentile: number;
}

export interface CopilotTemplate {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: string;
  content: string;
  variables: CopilotTemplateVariable[];
  usageCount: number;
  metadata: CopilotTemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotTemplateVariable {
  name: string;
  type: string;
  required: boolean;
  defaultValue: unknown;
  description: string;
}

export interface CopilotTemplateMetadata {
  author: string;
  version: string;
  rating: number;
  tags: string[];
}

export interface CopilotWorkflowTemplate {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: CopilotWorkflowTemplateStep[];
  triggers: string[];
  metadata: CopilotWorkflowTemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotWorkflowTemplateStep {
  order: number;
  action: string;
  parameters: Record<string, unknown>;
  conditions: string[];
}

export interface CopilotWorkflowTemplateMetadata {
  author: string;
  executionCount: number;
  successRate: number;
}

export interface CopilotModelPerformance {
  id: string;
  modelId: string;
  metrics: CopilotModelPerformanceMetrics;
  benchmarks: CopilotModelBenchmark[];
  metadata: CopilotModelPerformanceMetadata;
  measuredAt: Date;
}

export interface CopilotModelPerformanceMetrics {
  latency: number;
  throughput: number;
  accuracy: number;
  costPerToken: number;
  uptime: number;
}

export interface CopilotModelBenchmark {
  name: string;
  score: number;
  rank: number;
}

export interface CopilotModelPerformanceMetadata {
  environment: string;
  version: string;
  lastUpdated: Date;
}

export interface CopilotContextWindow {
  id: string;
  sessionId: string;
  tokens: CopilotContextToken[];
  totalTokens: number;
  maxTokens: number;
  strategy: string;
  metadata: CopilotContextWindowMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotContextToken {
  id: string;
  content: string;
  role: string;
  tokens: number;
  importance: number;
  recency: number;
}

export interface CopilotContextWindowMetadata {
  utilization: number;
  compressionRatio: number;
  lastCompacted: Date;
}

export interface CopilotErrorLog {
  id: string;
  schoolId: string;
  sessionId: string;
  error: string;
  stack: string;
  context: Record<string, unknown>;
  severity: string;
  resolved: boolean;
  metadata: CopilotErrorLogMetadata;
  createdAt: Date;
  resolvedAt: Date | null;
}

export interface CopilotErrorLogMetadata {
  userId: string;
  model: string;
  retryCount: number;
}

export interface CopilotABTest {
  id: string;
  schoolId: string;
  name: string;
  variants: CopilotABVariant[];
  metric: string;
  status: string;
  winner: string | null;
  metadata: CopilotABTestMetadata;
  startDate: Date;
  endDate: Date | null;
}

export interface CopilotABVariant {
  id: string;
  name: string;
  config: Record<string, unknown>;
  sampleSize: number;
  conversionRate: number;
  confidence: number;
}

export interface CopilotABTestMetadata {
  significance: number;
  minSampleSize: number;
  currentSampleSize: number;
}

export interface CopilotPerformanceDashboard {
  id: string;
  schoolId: string;
  summary: CopilotDashboardSummary;
  charts: CopilotDashboardChart[];
  alerts: CopilotDashboardAlert[];
  metadata: CopilotPerformanceDashboardMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CopilotDashboardSummary {
  totalSessions: number;
  avgResponseTime: number;
  successRate: number;
  userSatisfaction: number;
  costTotal: number;
}

export interface CopilotDashboardChart {
  id: string;
  type: string;
  title: string;
  data: unknown;
}

export interface CopilotDashboardAlert {
  id: string;
  type: string;
  severity: string;
  message: string;
  timestamp: Date;
}

export interface CopilotPerformanceDashboardMetadata {
  lastRefreshed: Date;
  dataPoints: number;
}

export interface CopilotVoiceRecognitionResult {
  id: string;
  sessionId: string;
  audioUrl: string;
  transcript: string;
  confidence: number;
  alternatives: VoiceRecognitionAlternative[];
  metadata: CopilotVoiceRecognitionResultMetadata;
  createdAt: Date;
}

export interface VoiceRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface CopilotVoiceRecognitionResultMetadata {
  language: string;
  duration: number;
  wordCount: number;
}

export interface CopilotDocumentGeneration {
  id: string;
  schoolId: string;
  type: string;
  template: string;
  variables: Record<string, unknown>;
  outputFormat: CopilotExportFormat;
  status: GenerationStatus;
  result: CopilotDocumentGenerationResult | null;
  metadata: CopilotDocumentGenerationMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface CopilotDocumentGenerationResult {
  content: string;
  url: string;
  size: number;
  pages: number;
}

export interface CopilotDocumentGenerationMetadata {
  processingTime: number;
  model: string;
  tokensUsed: number;
}

export interface CopilotMultimodalInput {
  id: string;
  sessionId: string;
  text: string | null;
  imageUrl: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  fileUrl: string | null;
  modality: CopilotInputModality;
  metadata: CopilotMultimodalInputMetadata;
  createdAt: Date;
}

export interface CopilotMultimodalInputMetadata {
  fileSize: number;
  mimeType: string;
  processingTime: number;
}

export interface CopilotSessionAnalytics {
  id: string;
  sessionId: string;
  duration: number;
  messageCount: number;
  tokensUsed: number;
  topics: string[];
  sentiment: CopilotFeedbackSentiment;
  metadata: CopilotSessionAnalyticsMetadata;
  createdAt: Date;
}

export interface CopilotSessionAnalyticsMetadata {
  avgResponseTime: number;
  userEngagement: number;
  taskCompletion: number;
}

export enum CopilotEngagementLevel {
  PASSIVE = "PASSIVE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH"
}

export enum CopilotResponseQuality {
  POOR = "POOR",
  FAIR = "FAIR",
  GOOD = "GOOD",
  VERY_GOOD = "VERY_GOOD",
  EXCELLENT = "EXCELLENT"
}

export enum CopilotSessionOutcome {
  SUCCESS = "SUCCESS",
  PARTIAL_SUCCESS = "PARTIAL_SUCCESS",
  FAILED = "FAILED",
  ABANDONED = "ABANDONED",
  TIMEOUT = "TIMEOUT"
}

export enum CopilotUserExpertise {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT"
}

export enum CopilotContentType {
  DOCUMENT = "DOCUMENT",
  CODE = "CODE",
  DATA = "DATA",
  MEDIA = "MEDIA",
  COMMUNICATION = "COMMUNICATION",
  ANALYSIS = "ANALYSIS"
}

export enum CopilotProcessingStage {
  INPUT = "INPUT",
  ANALYSIS = "ANALYSIS",
  GENERATION = "GENERATION",
  VALIDATION = "VALIDATION",
  OUTPUT = "OUTPUT"
}

export enum CopilotCacheStatus {
  HIT = "HIT",
  MISS = "MISS",
  PARTIAL = "PARTIAL",
  EXPIRED = "EXPIRED"
}

export enum CopilotPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum CopilotAvailability {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  OFFLINE = "OFFLINE",
  MAINTENANCE = "MAINTENANCE"
}

export enum CopilotSessionDuration {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG"
}

export enum CopilotResponseTime {
  INSTANT = "INSTANT",
  FAST = "FAST",
  MODERATE = "MODERATE",
  SLOW = "SLOW"
}

export enum CopilotUserSatisfaction {
  VERY_DISSATISFIED = "VERY_DISSATISFIED",
  DISSATISFIED = "DISSATISFIED",
  NEUTRAL = "NEUTRAL",
  SATISFIED = "SATISFIED",
  VERY_SATISFIED = "VERY_SATISFIED"
}

export enum CopilotInteractionMode {
  TURN_BASED = "TURN_BASED",
  CONTINUOUS = "CONTINUOUS",
  EVENT_DRIVEN = "EVENT_DRIVEN"
}

export enum CopilotSessionStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  TERMINATED = "TERMINATED"
}

export enum CopilotResponseConfidence {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH"
}

export enum CopilotTaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export enum CopilotKnowledgeBaseType {
  FAQ = "FAQ",
  DOCUMENTATION = "DOCUMENTATION",
  POLICY = "POLICY",
  PROCEDURE = "PROCEDURE"
}

export enum CopilotDataProcessingMode {
  SYNC = "SYNC",
  ASYNC = "ASYNC",
  BATCH = "BATCH",
  STREAMING = "STREAMING"
}

export enum CopilotErrorRecovery {
  RETRY = "RETRY",
  FALLBACK = "FALLBACK",
  SKIP = "SKIP",
  ABORT = "ABORT"
}

export enum GenerationStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED"
}
