export enum PromptTemplate {
  EDUCATIONAL = "EDUCATIONAL",
  ASSESSMENT = "ASSESSMENT",
  FEEDBACK = "FEEDBACK",
  EXPLANATION = "EXPLANATION",
  SUMMARIZATION = "SUMMARIZATION",
  TRANSLATION = "TRANSLATION",
  CREATIVE = "CREATIVE",
  ANALYTICAL = "ANALYTICAL",
  COMPARATIVE = "COMPARATIVE",
  DESCRIPTIVE = "DESCRIPTIVE",
  NARRATIVE = "NARRATIVE",
  PERSUASIVE = "PERSUASIVE",
  INSTRUCTIONAL = "INSTRUCTIONAL",
  QUESTIONING = "QUESTIONING",
  BRSTORMING = "BRSTORMING",
  PROBLEM_SOLVING = "PROBLEM_SOLVING",
  CRITICAL_THINKING = "CRITICAL_THINKING",
  COLLABORATIVE = "COLLABORATIVE",
  PERSONALIZED = "PERSONALIZED",
  ADAPTIVE = "ADAPTIVE"
}

export enum WorkflowNodeType {
  START = "START",
  END = "END",
  LLM = "LLM",
  CONDITION = "CONDITION",
  LOOP = "LOOP",
  PARALLEL = "PARALLEL",
  MERGE = "MERGE",
  TRANSFORM = "TRANSFORM",
  VALIDATE = "VALIDATE",
  FILTER = "FILTER",
  AGGREGATE = "AGGREGATE",
  SPLIT = "SPLIT",
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
  API_CALL = "API_CALL",
  DATABASE = "DATABASE",
  EMAIL = "EMAIL",
  NOTIFICATION = "NOTIFICATION",
  DELAY = "DELAY",
  APPROVAL = "APPROVAL"
}

export enum FormFieldType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  DATE = "DATE",
  TIME = "TIME",
  DATETIME = "DATETIME",
  TEXTAREA = "TEXTAREA",
  SELECT = "SELECT",
  MULTI_SELECT = "MULTI_SELECT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  FILE = "FILE",
  IMAGE = "IMAGE",
  SIGNATURE = "SIGNATURE",
  RATING = "RATING",
  SLIDER = "SLIDER",
  COLOR = "COLOR",
  URL = "URL",
  ADDRESS = "ADDRESS"
}

export enum ReportType {
  ACADEMIC = "ACADEMIC",
  FINANCIAL = "FINANCIAL",
  ATTENDANCE = "ATTENDANCE",
  BEHAVIOR = "BEHAVIOR",
  PERFORMANCE = "PERFORMANCE",
  ENROLLMENT = "ENROLLMENT",
  STAFF = "STAFF",
  INVENTORY = "INVENTORY",
  TRANSPORT = "TRANSPORT",
  LIBRARY = "LIBRARY",
  HEALTH = "HEALTH",
  DISCIPLINE = "DISCIPLINE",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICS = "ANALYTICS",
  COMPLIANCE = "COMPLIANCE"
}

export enum PresentationStyle {
  PROFESSIONAL = "PROFESSIONAL",
  EDUCATIONAL = "EDUCATIONAL",
  CREATIVE = "CREATIVE",
  MINIMALIST = "MINIMALIST",
  CORPORATE = "CORPORATE",
  MODERN = "MODERN",
  CLASSIC = "CLASSIC",
  PLAYFUL = "PLAYFUL",
  ACADEMIC = "ACADEMIC",
  VISUAL = "VISUAL"
}

export enum CertificateType {
  ACADEMIC = "ACADEMIC",
  ACHIEVEMENT = "ACHIEVEMENT",
  PARTICIPATION = "PARTICIPATION",
  EXCELLENCE = "EXCELLENCE",
  COMPLETION = "COMPLETION",
  HONOR = "HONOR",
  APPRECIATION = "APPRECIATION",
  COMPETENCE = "COMPETENCE",
  LEADERSHIP = "LEADERSHIP",
  SERVICE = "SERVICE"
}

export enum LessonFormat {
  LECTURE = "LECTURE",
  DISCUSSION = "DISCUSSION",
  WORKSHOP = "WORKSHOP",
  LABORATORY = "LABORATORY",
  FIELD_TRIP = "FIELD_TRIP",
  GROUP_WORK = "GROUP_WORK",
  PRESENTATION = "PRESENTATION",
  DEBATE = "DEBATE",
  SIMULATION = "SIMULATION",
  PROJECT_BASED = "PROJECT_BASED"
}

export enum QuizType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  FILL_IN_BLANK = "FILL_IN_BLANK",
  SHORT_ANSWER = "SHORT_ANSWER",
  ESSAY = "ESSAY",
  MATCHING = "MATCHING",
  ORDERING = "ORDERING",
  HOTSPOT = "HOTSPOT",
  DRAWING = "DRAWING",
  AUDIO = "AUDIO"
}

export enum ExamFormat {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID",
  PRACTICAL = "PRACTICAL",
  ORAL = "ORAL",
  WRITTEN = "WRITTEN",
  PORTFOLIO = "PORTFOLIO",
  PROJECT = "PROJECT",
  COMPREHENSIVE = "COMPREHENSIVE",
  DIAGNOSTIC = "DIAGNOSTIC"
}

export enum CourseStructure {
  LINEAR = "LINEAR",
  MODULAR = "MODULAR",
  SPiral = "SPIRAL",
  PROJECT_BASED = "PROJECT_BASED",
  COMPETENCY_BASED = "COMPETENCY_BASED",
  SELF_PACED = "SELF_PACED",
  INSTRUCTOR_LED = "INSTRUCTOR_LED",
  BLENDED = "BLENDED",
  HYBRID = "HYBRID",
  ASYNCHRONOUS = "ASYNCHRONOUS"
}

export enum VideoStyle {
  ANIMATED = "ANIMATED",
  LIVE_ACTION = "LIVE_ACTION",
  SCREEN_RECORDING = "SCREEN_RECORDING",
  WHITEBOARD = "WHITEBOARD",
  PRESENTATION = "PRESENTATION",
  DOCUMENTARY = "DOCUMENTARY",
  TUTORIAL = "TUTORIAL",
  EXPLAINER = "EXPLAINER",
  INTERVIEW = "INTERVIEW",
  NEWS = "NEWS"
}

export enum VoiceStyle {
  PROFESSIONAL = "PROFESSIONAL",
  FRIENDLY = "FRIENDLY",
  AUTHORITATIVE = "AUTHORITATIVE",
  WARM = "WARM",
  ENERGETIC = "ENERGETIC",
  CALM = "CALM",
  NARRATIVE = "NARRATIVE",
  CONVERSATIONAL = "CONVERSATIONAL",
  EDUCATIONAL = "EDUCATIONAL",
  MOTIVATIONAL = "MOTIVATIONAL"
}

export enum ImageStyle {
  REALISTIC = "REALISTIC",
  ILLUSTRATION = "ILLUSTRATION",
  CARTOON = "CARTOON",
  ABSTRACT = "ABSTRACT",
  MINIMALIST = "MINIMALIST",
  FLAT = "FLAT",
  THREE_D = "3D",
  WATERCOLOR = "WATERCOLOR",
  SKETCH = "SKETCH",
  POP_ART = "POP_ART"
}

export enum GenerationStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PARTIAL = "PARTIAL",
  QUEUED = "QUEUED",
  STREAMING = "STREAMING"
}

export enum QualityLevel {
  DRAFT = "DRAFT",
  STANDARD = "STANDARD",
  HIGH = "HIGH",
  PREMIUM = "PREMIUM",
  ULTRA = "ULTRA"
}

export enum OutputFormat {
  PDF = "PDF",
  DOCX = "DOCX",
  PPTX = "PPTX",
  XLSX = "XLSX",
  MP4 = "MP4",
  MP3 = "MP3",
  PNG = "PNG",
  JPG = "JPG",
  SVG = "SVG",
  JSON = "JSON",
  HTML = "HTML",
  MARKDOWN = "MARKDOWN"
}

export enum AIModelType {
  TEXT_GENERATION = "TEXT_GENERATION",
  IMAGE_GENERATION = "IMAGE_GENERATION",
  VIDEO_GENERATION = "VIDEO_GENERATION",
  AUDIO_GENERATION = "AUDIO_GENERATION",
  CODE_GENERATION = "CODE_GENERATION",
  EMBEDDING = "EMBEDDING",
  TRANSLATION = "TRANSLATION",
  SUMMARIZATION = "SUMMARIZATION",
  CLASSIFICATION = "CLASSIFICATION"
}

export enum TemplateCategory {
  LESSON = "LESSON",
  ASSESSMENT = "ASSESSMENT",
  PRESENTATION = "PRESENTATION",
  CERTIFICATE = "CERTIFICATE",
  REPORT = "REPORT",
  WORKSHEET = "WORKSHEET",
  NEWSLETTER = "NEWSLETTER",
  FLYER = "FLYER",
  POSTER = "POSTER",
  SOCIAL_MEDIA = "SOCIAL_MEDIA"
}

export enum WorkflowTrigger {
  MANUAL = "MANUAL",
  SCHEDULED = "SCHEDULED",
  EVENT = "EVENT",
  API = "API",
  WEBHOOK = "WEBHOOK",
  FILE_UPLOAD = "FILE_UPLOAD",
  FORM_SUBMISSION = "FORM_SUBMISSION",
  CONDITION_MET = "CONDITION_MET",
  CHAIN_COMPLETION = "CHAIN_COMPLETION"
}

export enum GenerationError {
  INVALID_INPUT = "INVALID_INPUT",
  MODEL_UNAVAILABLE = "MODEL_UNAVAILABLE",
  QUOTA_EXCEEDED = "QUOTA_EXCEEDED",
  TIMEOUT = "TIMEOUT",
  CONTENT_POLICY = "CONTENT_POLICY",
  RATE_LIMITED = "RATE_LIMITED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  INVALID_TEMPLATE = "INVALID_TEMPLATE",
  MISSING_VARIABLES = "MISSING_VARIABLES",
  PROCESSING_FAILED = "PROCESSING_FAILED"
}

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",
  ANIMATION = "ANIMATION",
  INTERACTIVE = "INTERACTIVE"
}

export enum ContentSafetyLevel {
  SAFE = "SAFE",
  MILD = "MILD",
  MODERATE = "MODERATE",
  MATURE = "MATURE",
  RESTRICTED = "RESTRICTED"
}

export enum PresentationTransition {
  NONE = "NONE",
  FADE = "FADE",
  SLIDE = "SLIDE",
  WIPE = "WIPE",
  ZOOM = "ZOOM",
  DISSOLVE = "DISSOLVE",
  PUSH = "PUSH",
  COVER = "COVER",
  UNCOVER = "UNCOVER",
  FLIP = "FLIP"
}

export enum LessonObjectiveType {
  KNOWLEDGE = "KNOWLEDGE",
  SKILL = "SKILL",
  ATTITUDE = "ATTITUDE",
  APPLICATION = "APPLICATION",
  ANALYSIS = "ANALYSIS",
  SYNTHESIS = "SYNTHESIS",
  EVALUATION = "EVALUATION"
}

export enum AssessmentRubricType {
  ANALYTIC = "ANALYTIC",
  HOLISTIC = "HOLISTIC",
  SINGLE_SCALE = "SINGLE_SCALE",
  MULTIDIMENSIONAL = "MULTIDIMENSIONAL",
  CUSTOM = "CUSTOM"
}

export enum VideoResolution {
  SD = "SD",
  HD = "HD",
  FULL_HD = "FULL_HD",
  TWO_K = "2K",
  FOUR_K = "4K",
  EIGHT_K = "8K"
}

export enum AudioFormat {
  MP3 = "MP3",
  WAV = "WAV",
  AAC = "AAC",
  OGG = "OGG",
  FLAC = "FLAC",
  WMA = "WMA"
}

export enum ImageResolution {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  ULTRA = "ULTRA"
}

export enum ColorScheme {
  MONOCHROME = "MONOCHROME",
  ANALOGOUS = "ANALOGOUS",
  COMPLEMENTARY = "COMPLEMENTARY",
  TRIADIC = "TRIADIC",
  SPLIT_COMPLEMENTARY = "SPLIT_COMPLEMENTARY",
  CUSTOM = "CUSTOM"
}

export enum TypographyStyle {
  SERIF = "SERIF",
  SANS_SERIF = "SANS_SERIF",
  MONOSPACE = "MONOSPACE",
  HANDWRITING = "HANDWRITING",
  DISPLAY = "DISPLAY",
  MIXED = "MIXED"
}

export enum LayoutType {
  SINGLE_COLUMN = "SINGLE_COLUMN",
  TWO_COLUMN = "TWO_COLUMN",
  THREE_COLUMN = "THREE_COLUMN",
  GRID = "GRID",
  MAGAZINE = "MAGAZINE",
  ZIGZAG = "ZIGZAG",
  ASYMMETRIC = "ASYMMETRIC"
}

export enum AnimationType {
  NONE = "NONE",
  FADE_IN = "FADE_IN",
  SLIDE_IN = "SLIDE_IN",
  BOUNCE = "BOUNCE",
  ZOOM = "ZOOM",
  ROTATE = "ROTATE",
  FLIP = "FLIP",
  MORPH = "MORPH",
  DRAW = "DRAW",
  TYPEWRITER = "TYPEWRITER"
}

export enum GenerationPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum TemplateDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT"
}

export enum CollaborationMode {
  PRIVATE = "PRIVATE",
  TEAM = "TEAM",
  ORGANIZATION = "ORGANIZATION",
  PUBLIC = "PUBLIC"
}

export interface PromptTemplateConfig {
  id: string;
  name: string;
  description: string;
  category: PromptTemplate;
  template: string;
  variables: PromptVariable[];
  examples: PromptExample[];
  metadata: PromptTemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptVariable {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue: unknown;
  options: unknown[];
  validation: PromptVariableValidation;
}

export interface PromptVariableValidation {
  minLength: number | null;
  maxLength: number | null;
  pattern: string | null;
  min: number | null;
  max: number | null;
}

export interface PromptExample {
  input: string;
  output: string;
  description: string;
}

export interface PromptTemplateMetadata {
  author: string;
  version: string;
  usageCount: number;
  avgRating: number;
  tags: string[];
  language: string;
}

export interface AIWorkflow {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  enabled: boolean;
  metadata: AIWorkflowMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  name: string;
  config: Record<string, unknown>;
  position: WorkflowPosition;
  inputs: WorkflowPort[];
  outputs: WorkflowPort[];
  metadata: WorkflowNodeMetadata;
}

export interface WorkflowPosition {
  x: number;
  y: number;
}

export interface WorkflowPort {
  name: string;
  type: string;
  required: boolean;
  connected: boolean;
}

export interface WorkflowNodeMetadata {
  executionTime: number;
  lastExecuted: Date;
  successRate: number;
}

export interface WorkflowEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourcePort: string;
  targetPort: string;
  condition: string | null;
  metadata: WorkflowEdgeMetadata;
}

export interface WorkflowEdgeMetadata {
  label: string;
  color: string;
}

export interface AIWorkflowMetadata {
  author: string;
  version: string;
  executionCount: number;
  avgExecutionTime: number;
  lastExecuted: Date;
}

export interface AIForm {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  fields: FormField[];
  settings: AIFormSettings;
  submissions: FormSubmission[];
  metadata: AIFormMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder: string;
  required: boolean;
  defaultValue: unknown;
  options: FormFieldOption[];
  validation: FormFieldValidation;
  conditional: FormFieldConditional;
  metadata: FormFieldMetadata;
}

export interface FormFieldOption {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface FormFieldValidation {
  required: boolean;
  minLength: number | null;
  maxLength: number | null;
  pattern: string | null;
  min: number | null;
  max: number | null;
  customMessage: string;
}

export interface FormFieldConditional {
  enabled: boolean;
  field: string;
  operator: string;
  value: unknown;
}

export interface FormFieldMetadata {
  width: string;
  order: number;
  helpText: string;
  aiGenerated: boolean;
}

export interface AIFormSettings {
  submitButtonText: string;
  successMessage: string;
  allowMultipleSubmissions: boolean;
  requireAuth: boolean;
  notifyOnSubmission: boolean;
  recipients: string[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  userId: string;
  data: Record<string, unknown>;
  status: string;
  metadata: FormSubmissionMetadata;
  createdAt: Date;
}

export interface FormSubmissionMetadata {
  ipAddress: string;
  userAgent: string;
  duration: number;
  validated: boolean;
}

export interface AIFormMetadata {
  author: string;
  version: string;
  totalSubmissions: number;
  completionRate: number;
  avgCompletionTime: number;
}

export interface AIReport {
  id: string;
  schoolId: string;
  name: string;
  type: ReportType;
  description: string;
  sections: ReportSection[];
  settings: AIReportSettings;
  metadata: AIReportMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportSection {
  id: string;
  title: string;
  type: string;
  content: string;
  data: unknown;
  charts: ReportChart[];
  order: number;
  metadata: ReportSectionMetadata;
}

export interface ReportChart {
  id: string;
  type: string;
  title: string;
  data: unknown;
  config: Record<string, unknown>;
}

export interface ReportSectionMetadata {
  aiGenerated: boolean;
  lastUpdated: Date;
}

export interface AIReportSettings {
  format: OutputFormat;
  orientation: string;
  pageSize: string;
  includeCharts: boolean;
  includeSummary: boolean;
  includeRawData: boolean;
}

export interface AIReportMetadata {
  author: string;
  version: string;
  generatedCount: number;
  lastGenerated: Date;
}

export interface AIPresentation {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  style: PresentationStyle;
  slides: PresentationSlide[];
  theme: PresentationTheme;
  settings: AIPresentationSettings;
  metadata: AIPresentationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface PresentationSlide {
  id: string;
  order: number;
  title: string;
  content: string;
  layout: LayoutType;
  elements: SlideElement[];
  transition: PresentationTransition;
  notes: string;
  duration: number;
  metadata: PresentationSlideMetadata;
}

export interface SlideElement {
  id: string;
  type: string;
  content: string;
  position: SlidePosition;
  size: SlideSize;
  style: SlideElementStyle;
  animation: AnimationType;
}

export interface SlidePosition {
  x: number;
  y: number;
  z: number;
}

export interface SlideSize {
  width: number;
  height: number;
}

export interface SlideElementStyle {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  border: string;
  shadow: string;
}

export interface PresentationSlideMetadata {
  aiGenerated: boolean;
  lastModified: Date;
  speakerNotes: string;
}

export interface PresentationTheme {
  name: string;
  colors: ColorScheme;
  typography: TypographyStyle;
  background: string;
  logo: string;
}

export interface AIPresentationSettings {
  aspectRatio: string;
  transition: PresentationTransition;
  autoAdvance: boolean;
  includeNotes: boolean;
  includeHandouts: boolean;
}

export interface AIPresentationMetadata {
  author: string;
  version: string;
  slideCount: number;
  lastPresented: Date;
  presentationCount: number;
}

export interface AICertificate {
  id: string;
  schoolId: string;
  name: string;
  type: CertificateType;
  description: string;
  template: CertificateTemplate;
  recipient: CertificateRecipient;
  issuer: CertificateIssuer;
  metadata: AICertificateMetadata;
  createdAt: Date;
  issuedAt: Date;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  style: PresentationStyle;
  layout: LayoutType;
  elements: CertificateElement[];
  background: string;
  border: string;
}

export interface CertificateElement {
  id: string;
  type: string;
  content: string;
  position: SlidePosition;
  size: SlideSize;
  style: SlideElementStyle;
}

export interface CertificateRecipient {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

export interface CertificateIssuer {
  id: string;
  name: string;
  title: string;
  schoolId: string;
}

export interface AICertificateMetadata {
  templateName: string;
  generatedCount: number;
  lastGenerated: Date;
}

export interface LessonPlan {
  id: string;
  schoolId: string;
  teacherId: string;
  subjectId: string;
  classId: string;
  title: string;
  description: string;
  objectives: LessonObjective[];
  activities: LessonActivity[];
  resources: LessonResource[];
  assessment: LessonAssessment;
  metadata: LessonPlanMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonObjective {
  id: string;
  type: LessonObjectiveType;
  description: string;
  measurable: boolean;
  verbs: string[];
}

export interface LessonActivity {
  id: string;
  name: string;
  type: LessonFormat;
  duration: number;
  description: string;
  instructions: string;
  materials: string[];
  differentiation: string;
  order: number;
}

export interface LessonResource {
  id: string;
  name: string;
  type: string;
  url: string;
  description: string;
}

export interface LessonAssessment {
  type: string;
  description: string;
  criteria: string[];
  rubric: AssessmentRubric;
}

export interface AssessmentRubric {
  id: string;
  type: AssessmentRubricType;
  criteria: RubricCriteria[];
  scale: RubricScale[];
}

export interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  id: string;
  name: string;
  description: string;
  score: number;
}

export interface RubricScale {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  description: string;
}

export interface LessonPlanMetadata {
  aiGenerated: boolean;
  duration: number;
  totalActivities: number;
  lastTaught: Date;
}

export interface Quiz {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  type: QuizType;
  questions: QuizQuestion[];
  settings: QuizSettings;
  metadata: QuizMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  options: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  difficulty: TemplateDifficulty;
  tags: string[];
  metadata: QuizQuestionMetadata;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizQuestionMetadata {
  aiGenerated: boolean;
  averageTime: number;
  successRate: number;
  lastUsed: Date;
}

export interface QuizSettings {
  timeLimit: number;
  attempts: number;
  showAnswers: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  passingScore: number;
  certificateEnabled: boolean;
}

export interface QuizMetadata {
  author: string;
  version: string;
  questionCount: number;
  totalPoints: number;
  avgDifficulty: number;
}

export interface Exam {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  format: ExamFormat;
  subjectId: string;
  classId: string;
  sections: ExamSection[];
  settings: ExamSettings;
  metadata: ExamMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamSection {
  id: string;
  name: string;
  description: string;
  questions: ExamQuestion[];
  duration: number;
  totalPoints: number;
  order: number;
}

export interface ExamQuestion {
  id: string;
  type: QuizType;
  question: string;
  options: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  difficulty: TemplateDifficulty;
  BloomLevel: string;
  tags: string[];
  metadata: ExamQuestionMetadata;
}

export interface ExamQuestionMetadata {
  aiGenerated: boolean;
  timeEstimate: number;
  successRate: number;
  lastUsed: Date;
}

export interface ExamSettings {
  duration: number;
  totalPoints: number;
  passingScore: number;
  attempts: number;
  proctored: boolean;
  openBook: boolean;
  showResults: boolean;
  shuffleQuestions: boolean;
}

export interface ExamMetadata {
  author: string;
  version: string;
  questionCount: number;
  avgDifficulty: number;
  lastAdministered: Date;
  adminCount: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  name: string;
  description: string;
  lessons: CourseLesson[];
  order: number;
  duration: number;
  prerequisites: string[];
  metadata: CourseModuleMetadata;
}

export interface CourseLesson {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  type: string;
  content: string;
  resources: LessonResource[];
  duration: number;
  order: number;
  metadata: CourseLessonMetadata;
}

export interface CourseModuleMetadata {
  aiGenerated: boolean;
  completionRate: number;
  avgScore: number;
}

export interface CourseLessonMetadata {
  aiGenerated: boolean;
  viewCount: number;
  avgDuration: number;
  completionRate: number;
}

export interface CourseBuilder {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  structure: CourseStructure;
  modules: CourseModule[];
  settings: CourseSettings;
  metadata: CourseBuilderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseSettings {
  language: string;
  difficulty: TemplateDifficulty;
  estimatedDuration: number;
  maxStudents: number;
  certificateEnabled: boolean;
  prerequisites: string[];
}

export interface CourseBuilderMetadata {
  author: string;
  version: string;
  totalLessons: number;
  totalDuration: number;
  enrolledStudents: number;
}

export interface VideoTemplate {
  id: string;
  name: string;
  style: VideoStyle;
  resolution: VideoResolution;
  duration: number;
  scenes: VideoScene[];
  assets: VideoAsset[];
  settings: VideoTemplateSettings;
  metadata: VideoTemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoScene {
  id: string;
  order: number;
  type: string;
  duration: number;
  content: string;
  voiceover: string;
  background: string;
  elements: VideoElement[];
  transition: PresentationTransition;
}

export interface VideoElement {
  id: string;
  type: string;
  content: string;
  position: SlidePosition;
  size: SlideSize;
  animation: AnimationType;
  duration: number;
}

export interface VideoAsset {
  id: string;
  type: MediaType;
  url: string;
  name: string;
  duration: number;
}

export interface VideoTemplateSettings {
  fps: number;
  bitrate: number;
  codec: string;
  aspectRatio: string;
}

export interface VideoTemplateMetadata {
  author: string;
  version: string;
  usageCount: number;
  lastUsed: Date;
}

export interface VoiceTemplate {
  id: string;
  name: string;
  style: VoiceStyle;
  language: string;
  speed: number;
  pitch: number;
  emotion: string;
  script: string;
  audioUrl: string | null;
  settings: VoiceTemplateSettings;
  metadata: VoiceTemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceTemplateSettings {
  format: AudioFormat;
  sampleRate: number;
  bitDepth: number;
  channels: number;
}

export interface VoiceTemplateMetadata {
  author: string;
  version: string;
  usageCount: number;
  lastUsed: Date;
  generationTime: number;
}

export interface ImageTemplate {
  id: string;
  name: string;
  style: ImageStyle;
  resolution: ImageResolution;
  width: number;
  height: number;
  prompt: string;
  negativePrompt: string;
  elements: ImageElement[];
  settings: ImageTemplateSettings;
  metadata: ImageTemplateMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageElement {
  id: string;
  type: string;
  content: string;
  position: SlidePosition;
  size: SlideSize;
  style: SlideElementStyle;
}

export interface ImageTemplateSettings {
  format: string;
  quality: number;
  colorScheme: ColorScheme;
  DPI: number;
}

export interface ImageTemplateMetadata {
  author: string;
  version: string;
  usageCount: number;
  lastUsed: Date;
  generationTime: number;
}

export interface GenerationConfig {
  model: AIModelType;
  provider: string;
  quality: QualityLevel;
  priority: GenerationPriority;
  timeout: number;
  retries: number;
  parameters: GenerationParameters;
}

export interface GenerationParameters {
  temperature: number;
  topP: number;
  maxTokens: number;
  stopSequences: string[];
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface GenerationResult {
  id: string;
  status: GenerationStatus;
  config: GenerationConfig;
  output: GenerationOutput;
  error: GenerationErrorResult | null;
  metadata: GenerationResultMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface GenerationOutput {
  content: string;
  format: OutputFormat;
  url: string | null;
  size: number | null;
  metadata: Record<string, unknown>;
}

export interface GenerationErrorResult {
  code: GenerationError;
  message: string;
  details: string;
  retryable: boolean;
}

export interface GenerationResultMetadata {
  model: string;
  tokensUsed: number;
  processingTime: number;
  cost: number;
}

export interface AIWorkflowExecution {
  id: string;
  workflowId: string;
  status: string;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  steps: WorkflowExecutionStep[];
  metadata: AIWorkflowExecutionMetadata;
  startedAt: Date;
  completedAt: Date | null;
}

export interface WorkflowExecutionStep {
  nodeId: string;
  status: string;
  input: unknown;
  output: unknown;
  error: string | null;
  duration: number;
}

export interface AIWorkflowExecutionMetadata {
  trigger: string;
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
}

export interface AIGenerationQueue {
  id: string;
  schoolId: string;
  items: GenerationQueueItem[];
  totalItems: number;
  processedItems: number;
  metadata: AIGenerationQueueMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationQueueItem {
  id: string;
  type: string;
  config: GenerationConfig;
  status: GenerationStatus;
  priority: GenerationPriority;
  result: GenerationResult | null;
  metadata: Record<string, unknown>;
}

export interface AIGenerationQueueMetadata {
  avgProcessingTime: number;
  totalTokensUsed: number;
  totalCost: number;
}

export interface TemplateLibrary {
  id: string;
  schoolId: string;
  name: string;
  category: TemplateCategory;
  templates: TemplateItem[];
  metadata: TemplateLibraryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  preview: string;
  config: Record<string, unknown>;
  tags: string[];
  rating: number;
  usageCount: number;
}

export interface TemplateLibraryMetadata {
  author: string;
  totalTemplates: number;
  lastUpdated: Date;
}

export interface AICollaborationSession {
  id: string;
  schoolId: string;
  mode: CollaborationMode;
  participants: CollaborationParticipant[];
  content: CollaborationContent;
  metadata: AICollaborationSessionMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollaborationParticipant {
  userId: string;
  name: string;
  role: string;
  cursor: CollaborationCursor;
  lastActive: Date;
}

export interface CollaborationCursor {
  x: number;
  y: number;
  elementId: string | null;
}

export interface CollaborationContent {
  type: string;
  data: unknown;
  version: number;
  history: CollaborationHistoryEntry[];
}

export interface CollaborationHistoryEntry {
  id: string;
  userId: string;
  action: string;
  data: unknown;
  timestamp: Date;
}

export interface AICollaborationSessionMetadata {
  totalEdits: number;
  avgResponseTime: number;
  activeDuration: number;
}

export interface ContentSafetyCheck {
  id: string;
  content: string;
  level: ContentSafetyLevel;
  flags: ContentSafetyFlag[];
  approved: boolean;
  metadata: ContentSafetyCheckMetadata;
  createdAt: Date;
}

export interface ContentSafetyFlag {
  category: string;
  severity: string;
  description: string;
  confidence: number;
}

export interface ContentSafetyCheckMetadata {
  model: string;
  processingTime: number;
  version: string;
}

export interface AIGenerationAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalGenerations: number;
  byType: GenerationAnalyticsByType;
  byModel: GenerationAnalyticsByModel;
  metrics: GenerationAnalyticsMetrics;
  metadata: AIGenerationAnalyticsMetadata;
  createdAt: Date;
}

export interface GenerationAnalyticsByType {
  text: number;
  image: number;
  video: number;
  audio: number;
  document: number;
}

export interface GenerationAnalyticsByModel {
  [model: string]: number;
}

export interface GenerationAnalyticsMetrics {
  avgProcessingTime: number;
  successRate: number;
  totalTokens: number;
  totalCost: number;
}

export interface AIGenerationAnalyticsMetadata {
  dataFreshness: string;
  aggregationPeriod: string;
}

export interface AIPresentationExport {
  id: string;
  presentationId: string;
  format: OutputFormat;
  url: string;
  size: number;
  metadata: AIPresentationExportMetadata;
  createdAt: Date;
  expiresAt: Date;
}

export interface AIPresentationExportMetadata {
  slideCount: number;
  includeNotes: boolean;
  includeHandouts: boolean;
  compressed: boolean;
}

export interface CertificateExport {
  id: string;
  certificateId: string;
  format: OutputFormat;
  url: string;
  size: number;
  metadata: CertificateExportMetadata;
  createdAt: Date;
  expiresAt: Date;
}

export interface CertificateExportMetadata {
  highResolution: boolean;
  signed: boolean;
  verifiable: boolean;
}

export interface AIQuizExport {
  id: string;
  quizId: string;
  format: OutputFormat;
  url: string;
  size: number;
  metadata: AIQuizExportMetadata;
  createdAt: Date;
  expiresAt: Date;
}

export interface AIQuizExportMetadata {
  questionCount: number;
  includeAnswers: boolean;
  includeExplanations: boolean;
}

export interface VideoGenerationRequest {
  id: string;
  schoolId: string;
  templateId: string;
  scenes: VideoScene[];
  settings: VideoTemplateSettings;
  status: GenerationStatus;
  result: GenerationResult | null;
  metadata: VideoGenerationRequestMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface VideoGenerationRequestMetadata {
  estimatedDuration: number;
  estimatedSize: number;
  priority: GenerationPriority;
}

export interface VoiceGenerationRequest {
  id: string;
  schoolId: string;
  templateId: string;
  script: string;
  settings: VoiceTemplateSettings;
  status: GenerationStatus;
  result: GenerationResult | null;
  metadata: VoiceGenerationRequestMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface VoiceGenerationRequestMetadata {
  estimatedDuration: number;
  estimatedSize: number;
  priority: GenerationPriority;
}

export interface ImageGenerationRequest {
  id: string;
  schoolId: string;
  templateId: string;
  prompt: string;
  negativePrompt: string;
  settings: ImageTemplateSettings;
  status: GenerationStatus;
  result: GenerationResult | null;
  metadata: ImageGenerationRequestMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface ImageGenerationRequestMetadata {
  width: number;
  height: number;
  steps: number;
  guidanceScale: number;
}

export interface AIContentVersion {
  id: string;
  contentId: string;
  version: number;
  content: string;
  author: string;
  changes: string;
  metadata: AIContentVersionMetadata;
  createdAt: Date;
}

export interface AIContentVersionMetadata {
  autoGenerated: boolean;
  sizeBytes: number;
  checksum: string;
}

export interface AITemplateRating {
  id: string;
  templateId: string;
  userId: string;
  rating: number;
  comment: string;
  tags: string[];
  metadata: AITemplateRatingMetadata;
  createdAt: Date;
}

export interface AITemplateRatingMetadata {
  helpful: boolean;
  verified: boolean;
}

export enum PromptChainType {
  SEQUENTIAL = "SEQUENTIAL",
  PARALLEL = "PARALLEL",
  CONDITIONAL = "CONDITIONAL",
  ITERATIVE = "ITERATIVE",
  BRANCHING = "BRANCHING",
  LOOP = "LOOP",
  FALLBACK = "FALLBACK",
  ENSEMBLE = "ENSEMBLE"
}

export enum ContentGenerationMode {
  SINGLE = "SINGLE",
  BATCH = "BATCH",
  STREAMING = "STREAMING",
  ASYNC = "ASYNC",
  REAL_TIME = "REAL_TIME",
  SCHEDULED = "SCHEDULED"
}

export enum AIContentType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  CODE = "CODE",
  DOCUMENT = "DOCUMENT",
  PRESENTATION = "PRESENTATION",
  SPREADSHEET = "SPREADSHEET"
}

export enum TemplateEngine {
  HANDLEBARS = "HANDLEBARS",
  MUSTACHE = "MUSTACHE",
  EJS = "EJS",
  JINJA = "JINJA",
  PUG = "PUG",
  CUSTOM = "CUSTOM"
}

export enum SlideLayout {
  TITLE = "TITLE",
  TITLE_CONTENT = "TITLE_CONTENT",
  TWO_CONTENT = "TWO_CONTENT",
  SECTION = "SECTION",
  CONTENT = "CONTENT",
  BLANK = "BLANK",
  IMAGE = "IMAGE",
  QUOTE = "QUOTE",
  COMPARISON = "COMPARISON",
  CHART = "CHART"
}

export enum ReportExportFormat {
  PDF = "PDF",
  DOCX = "DOCX",
  XLSX = "XLSX",
  PPTX = "PPTX",
  HTML = "HTML",
  CSV = "CSV",
  JSON = "JSON",
  MARKDOWN = "MARKDOWN"
}

export enum QuizDifficultyDistribution {
  UNIFORM = "UNIFORM",
  PROGRESSIVE = "PROGRESSIVE",
  BELL_CURVE = "BELL_CURVE",
  CUSTOM = "CUSTOM"
}

export enum ExamProctoringType {
  NONE = "NONE",
  AI_SUPERVISED = "AI_SUPERVISED",
  HUMAN_SUPERVISED = "HUMAN_SUPERVISED",
  HYBRID = "HYBRID",
  RECORDING = "RECORDING",
  LIVE_MONITORING = "LIVE_MONITORING"
}

export enum CourseDeliveryMode {
  SELF_PACED = "SELF_PACED",
  INSTRUCTOR_LED = "INSTRUCTOR_LED",
  BLENDED = "BLENDED",
  SYNCHRONOUS = "SYNCHRONOUS",
  ASYNCHRONOUS = "ASYNCHRONOUS",
  HYBRID = "HYBRID"
}

export enum VideoAspectRatio {
  SQUARE = "SQUARE",
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
  CINEMA = "CINEMA",
  ULTRA_WIDE = "ULTRA_WIDE"
}

export enum VoiceEmotion {
  NEUTRAL = "NEUTRAL",
  HAPPY = "HAPPY",
  SAD = "SAD",
  EXCITED = "EXCITED",
  CALM = "CALM",
  SERIOUS = "SERIOUS",
  WARM = "WARM",
  AUTHORITATIVE = "AUTHORITATIVE"
}

export enum ImageGenerationModel {
  DALLE = "DALLE",
  STABLE_DIFFUSION = "STABLE_DIFFUSION",
  MIDJOURNEY = "MIDJOURNEY",
  FIREFLY = "FIREFLY",
  IMAGEN = "IMAGEN",
  CUSTOM = "CUSTOM"
}

export enum ContentSafetyModel {
  MODERATION = "MODERATION",
  TOXICITY = "TOXICITY",
  PII = "PII",
  CUSTOM = "CUSTOM",
  ENSEMBLE = "ENSEMBLE"
}

export enum AIGenerationCostTier {
  FREE = "FREE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  PREMIUM = "PREMIUM"
}

export enum PresentationExportFormat {
  PPTX = "PPTX",
  PDF = "PDF",
  GOOGLE_SLIDES = "GOOGLE_SLIDES",
  KEYNOTE = "KEYNOTE",
  HTML = "HTML"
}

export enum CertificateVerification {
  NONE = "NONE",
  QR_CODE = "QR_CODE",
  BLOCKCHAIN = "BLOCKCHAIN",
  DIGITAL_SIGNATURE = "DIGITAL_SIGNATURE",
  UNIQUE_ID = "UNIQUE_ID"
}

export enum LessonPlanExportFormat {
  PDF = "PDF",
  DOCX = "DOCX",
  MARKDOWN = "MARKDOWN",
  HTML = "HTML",
  LMS = "LMS"
}

export enum QuizAnalyticsMetric {
  COMPLETION_RATE = "COMPLETION_RATE",
  AVERAGE_SCORE = "AVERAGE_SCORE",
  TIME_PER_QUESTION = "TIME_PER_QUESTION",
  DIFFICULTY_INDEX = "DIFFICULTY_INDEX",
  DISCRIMINATION_INDEX = "DISCRIMINATION_INDEX"
}

export enum ExamAntiCheating {
  NONE = "NONE",
  RANDOMIZE_QUESTIONS = "RANDOMIZE_QUESTIONS",
  RANDOMIZE_OPTIONS = "RANDOMIZE_OPTIONS",
  TIME_LIMIT = "TIME_LIMIT",
  TAB_SWITCH_DETECTION = "TAB_SWITCH_DETECTION",
  COPY_PREVENTION = "COPY_PREVENTION",
  FULL_SCREEN = "FULL_SCREEN",
  IP_LOGGING = "IP_LOGGING"
}

export enum CourseCompletionCriteria {
  ALL_LESSONS = "ALL_LESSONS",
  MIN_SCORE = "MIN_SCORE",
  TIME_BASED = "TIME_BASED",
  PROJECT_BASED = "PROJECT_BASED",
  COMPETENCY_BASED = "COMPETENCY_BASED"
}

export enum VideoSubtitleFormat {
  SRT = "SRT",
  VTT = "VTT",
  TTML = "TTML",
  SCC = "SCC",
  DFXP = "DFXP"
}

export enum VoiceCloneQuality {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  HIGH = "HIGH",
  ULTRA = "ULTRA"
}

export enum ImageStyleTransfer {
  NONE = "NONE",
  MONET = "MONET",
  VAN_GOGH = "VAN_GOGH",
  PICASSO = "PICASSO",
  POP_ART = "POP_ART",
  WATERCOLOR = "WATERCOLOR",
  SKETCH = "SKETCH",
  CUSTOM = "CUSTOM"
}

export enum AIWorkflowStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  ERROR = "ERROR",
  COMPLETED = "COMPLETED"
}

export enum PromptVariableType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  SELECT = "SELECT",
  MULTI_SELECT = "MULTI_SELECT",
  FILE = "FILE",
  DATE = "DATE",
  JSON = "JSON"
}

export interface PromptChain {
  id: string;
  schoolId: string;
  name: string;
  type: PromptChainType;
  prompts: PromptChainStep[];
  variables: PromptVariable[];
  metadata: PromptChainMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptChainStep {
  order: number;
  prompt: string;
  variables: string[];
  condition: string | null;
  outputVariable: string;
}

export interface PromptChainMetadata {
  author: string;
  executionCount: number;
  avgLatency: number;
  successRate: number;
}

export interface ContentGenerationRequest {
  id: string;
  schoolId: string;
  type: AIContentType;
  mode: ContentGenerationMode;
  prompt: string;
  config: GenerationConfig;
  status: GenerationStatus;
  result: GenerationResult | null;
  metadata: ContentGenerationRequestMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface ContentGenerationRequestMetadata {
  priority: GenerationPriority;
  user: string;
  estimatedTime: number;
  costTier: AIGenerationCostTier;
}

export interface PresentationThemeConfig {
  id: string;
  name: string;
  colors: ThemeColorPalette;
  typography: ThemeTypography;
  backgrounds: ThemeBackground[];
  shapes: ThemeShape[];
  metadata: PresentationThemeConfigMetadata;
}

export interface ThemeColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  codeFont: string;
  headingSize: number;
  bodySize: number;
}

export interface ThemeBackground {
  id: string;
  type: string;
  value: string;
}

export interface ThemeShape {
  id: string;
  type: string;
  color: string;
}

export interface PresentationThemeConfigMetadata {
  author: string;
  usageCount: number;
  rating: number;
}

export interface QuizAnalytics {
  id: string;
  quizId: string;
  totalAttempts: number;
  averageScore: number;
  completionRate: number;
  questionAnalytics: QuizQuestionAnalytics[];
  metadata: QuizAnalyticsMetadata;
  createdAt: Date;
}

export interface QuizQuestionAnalytics {
  questionId: string;
  correctRate: number;
  avgTime: number;
  difficulty: number;
  discrimination: number;
}

export interface QuizAnalyticsMetadata {
  period: string;
  sampleSize: number;
}

export interface ExamAnalytics {
  id: string;
  examId: string;
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  scoreDistribution: ScoreDistribution[];
  sectionAnalytics: ExamSectionAnalytics[];
  metadata: ExamAnalyticsMetadata;
  createdAt: Date;
}

export interface ScoreDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface ExamSectionAnalytics {
  sectionId: string;
  averageScore: number;
  difficulty: number;
  timeSpent: number;
}

export interface ExamAnalyticsMetadata {
  period: string;
  sampleSize: number;
}

export interface CourseAnalytics {
  id: string;
  courseId: string;
  enrolledStudents: number;
  completionRate: number;
  averageScore: number;
  engagementMetrics: CourseEngagementMetrics;
  metadata: CourseAnalyticsMetadata;
  createdAt: Date;
}

export interface CourseEngagementMetrics {
  avgTimeSpent: number;
  avgLessonsPerWeek: number;
  dropoffRate: number;
  satisfactionScore: number;
}

export interface CourseAnalyticsMetadata {
  period: string;
  lastUpdated: Date;
}

export interface VideoGenerationAnalytics {
  id: string;
  videoId: string;
  views: number;
  watchTime: number;
  completionRate: number;
  engagement: VideoEngagementMetrics;
  metadata: VideoGenerationAnalyticsMetadata;
  createdAt: Date;
}

export interface VideoEngagementMetrics {
  avgWatchTime: number;
  dropoffPoints: number[];
  replayRate: number;
  shareRate: number;
}

export interface VideoGenerationAnalyticsMetadata {
  period: string;
  lastUpdated: Date;
}

export interface AIGenerationCostTracking {
  id: string;
  schoolId: string;
  period: string;
  totalCost: number;
  byType: CostByType[];
  byModel: CostByModel[];
  metadata: AIGenerationCostTrackingMetadata;
  createdAt: Date;
}

export interface CostByType {
  type: AIContentType;
  cost: number;
  count: number;
}

export interface CostByModel {
  model: string;
  cost: number;
  tokens: number;
}

export interface AIGenerationCostTrackingMetadata {
  budget: number;
  remaining: number;
  alertThreshold: number;
}

export interface TemplateVersionHistory {
  id: string;
  templateId: string;
  versions: TemplateVersion[];
  metadata: TemplateVersionHistoryMetadata;
  createdAt: Date;
}

export interface TemplateVersion {
  version: string;
  changes: string;
  author: string;
  timestamp: Date;
}

export interface TemplateVersionHistoryMetadata {
  totalVersions: number;
  lastUpdated: Date;
}

export interface AIGenerationBatch {
  id: string;
  schoolId: string;
  requests: ContentGenerationRequest[];
  status: string;
  totalItems: number;
  processedItems: number;
  metadata: AIGenerationBatchMetadata;
  createdAt: Date;
  completedAt: Date | null;
}

export interface AIGenerationBatchMetadata {
  avgProcessingTime: number;
  totalCost: number;
  errorCount: number;
}

export interface ContentTemplateLibrary {
  id: string;
  schoolId: string;
  category: TemplateCategory;
  templates: ContentTemplate[];
  metadata: ContentTemplateLibraryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: PromptVariable[];
  tags: string[];
  rating: number;
  usageCount: number;
}

export interface ContentTemplateLibraryMetadata {
  author: string;
  totalTemplates: number;
  lastUpdated: Date;
}

export interface AIFormAnalytics {
  id: string;
  formId: string;
  totalSubmissions: number;
  completionRate: number;
  avgCompletionTime: number;
  fieldAnalytics: FormFieldAnalytics[];
  metadata: AIFormAnalyticsMetadata;
  createdAt: Date;
}

export interface FormFieldAnalytics {
  fieldId: string;
  interactions: number;
  avgTime: number;
  dropoffRate: number;
}

export interface AIFormAnalyticsMetadata {
  period: string;
  lastUpdated: Date;
}

export interface PresentationAnalytics {
  id: string;
  presentationId: string;
  viewCount: number;
  downloadCount: number;
  avgViewTime: number;
  slideAnalytics: SlideAnalytics[];
  metadata: PresentationAnalyticsMetadata;
  createdAt: Date;
}

export interface SlideAnalytics {
  slideId: string;
  views: number;
  avgTime: number;
  engagement: number;
}

export interface PresentationAnalyticsMetadata {
  period: string;
  lastUpdated: Date;
}

export interface CertificateAnalytics {
  id: string;
  schoolId: string;
  totalIssued: number;
  byType: CertificateTypeAnalytics[];
  metadata: CertificateAnalyticsMetadata;
  createdAt: Date;
}

export interface CertificateTypeAnalytics {
  type: CertificateType;
  count: number;
  lastIssued: Date;
}

export interface CertificateAnalyticsMetadata {
  period: string;
  lastUpdated: Date;
}

export interface AIContentQuality {
  id: string;
  contentId: string;
  score: number;
  metrics: ContentQualityMetrics;
  suggestions: string[];
  metadata: AIContentQualityMetadata;
  createdAt: Date;
}

export interface ContentQualityMetrics {
  accuracy: number;
  completeness: number;
  relevance: number;
  readability: number;
  engagement: number;
}

export interface AIContentQualityMetadata {
  model: string;
  version: string;
  lastCalibrated: Date;
}

export interface AIGenerationSchedule {
  id: string;
  schoolId: string;
  name: string;
  cron: string;
  config: GenerationConfig;
  prompt: string;
  enabled: boolean;
  lastRun: Date | null;
  nextRun: Date;
  metadata: AIGenerationScheduleMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIGenerationScheduleMetadata {
  totalRuns: number;
  successRate: number;
  avgDuration: number;
}

export enum ContentGenerationMethod {
  GENERATIVE_AI = "GENERATIVE_AI",
  TEMPLATE_BASED = "TEMPLATE_BASED",
  HYBRID = "HYBRID",
  RULE_BASED = "RULE_BASED"
}

export enum PresentationAnimationStyle {
  SUBTLE = "SUBTLE",
  DRAMATIC = "DRAMATIC",
  PROFESSIONAL = "PROFESSIONAL",
  PLAYFUL = "PLAYFUL",
  MINIMAL = "MINIMAL"
}

export enum QuizQuestionSource {
  AI_GENERATED = "AI_GENERATED",
  BANK = "BANK",
  CUSTOM = "CUSTOM",
  MIXED = "MIXED"
}

export enum ExamQuestionDistribution {
  UNIFORM = "UNIFORM",
  WEIGHTED = "WEIGHTED",
  RANDOM = "RANDOM",
  CUSTOM = "CUSTOM"
}

export enum CourseContentType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
  INTERACTIVE = "INTERACTIVE",
  ASSESSMENT = "ASSESSMENT",
  ASSIGNMENT = "ASSIGNMENT"
}

export enum VideoTransitionStyle {
  CUT = "CUT",
  FADE = "FADE",
  WIPE = "WIPE",
  DISSOLVE = "DISSOLVE",
  SLIDE = "SLIDE",
  ZOOM = "ZOOM"
}

export enum VoicePacing {
  SLOW = "SLOW",
  NORMAL = "NORMAL",
  FAST = "FAST",
  VARIABLE = "VARIABLE"
}

export enum ImageGenerationStep {
  PROMPT = "PROMPT",
  GENERATION = "GENERATION",
  REFINEMENT = "REFINEMENT",
  UPSCALE = "UPSCALE",
  EXPORT = "EXPORT"
}

export enum ContentSafetyAction {
  ALLOW = "ALLOW",
  FLAG = "FLAG",
  BLOCK = "BLOCK",
  REVIEW = "REVIEW"
}

export enum AIGenerationQueuePriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum TemplateVariableScope {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
  STEP = "STEP"
}

export enum PresentationColorTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
  AUTO = "AUTO",
  CUSTOM = "CUSTOM"
}

export enum QuizFeedbackMode {
  IMMEDIATE = "IMMEDIATE",
  DELAYED = "DELAYED",
  END_OF_QUIZ = "END_OF_QUIZ",
  NONE = "NONE"
}

export enum ExamTimeStrategy {
  FIXED = "FIXED",
  ADAPTIVE = "ADAPTIVE",
  UNLIMITED = "UNLIMITED",
  SECTION_BASED = "SECTION_BASED"
}

export enum CourseProgressTracking {
  LESSON_BASED = "LESSON_BASED",
  TIME_BASED = "TIME_BASED",
  SCORE_BASED = "SCORE_BASED",
  COMBINED = "COMBINED"
}

export enum ContentGenerationStatus {
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

export enum PresentationSlideTransition {
  NONE = "NONE",
  FADE = "FADE",
  SLIDE_LEFT = "SLIDE_LEFT",
  SLIDE_RIGHT = "SLIDE_RIGHT",
  ZOOM = "ZOOM"
}

export enum QuizCorrectAnswerDisplay {
  AFTER_SUBMISSION = "AFTER_SUBMISSION",
  AFTER_DEADLINE = "AFTER_DEADLINE",
  NEVER = "NEVER",
  ON_DEMAND = "ON_DEMAND"
}

export enum ExamQuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SHORT_ANSWER = "SHORT_ANSWER",
  ESSAY = "ESSAY"
}

export enum CourseEnrollmentStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  WAITLIST = "WAITLIST",
  INVITE_ONLY = "INVITE_ONLY"
}

export enum VideoExportQuality {
  DRAFT = "DRAFT",
  STANDARD = "STANDARD",
  HIGH = "HIGH",
  PROFESSIONAL = "PROFESSIONAL"
}
