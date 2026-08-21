// Phase 2.6 - AI Agents & Education Types for EduCI

// ============================================================================
// ENUMS (20)
// ============================================================================

export const AIAgentType = {
  Teacher: 'teacher',
  Student: 'student',
  Parent: 'parent',
  Director: 'director',
  HR: 'hr',
  Finance: 'finance',
  Communication: 'communication',
  Analytics: 'analytics',
  Document: 'document',
  Support: 'support',
  Developer: 'developer',
  Workflow: 'workflow',
  SuperAdmin: 'super_admin',
  Custom: 'custom',
} as const;
export type AIAgentType = (typeof AIAgentType)[keyof typeof AIAgentType];

export const AIAgentStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Training: 'training',
  Error: 'error',
  Maintenance: 'maintenance',
} as const;
export type AIAgentStatus = (typeof AIAgentStatus)[keyof typeof AIAgentStatus];

export const AIAgentCapability = {
  Chat: 'chat',
  Search: 'search',
  Generate: 'generate',
  Analyze: 'analyze',
  Correct: 'correct',
  Plan: 'plan',
  Summarize: 'summarize',
  Translate: 'translate',
  Recommend: 'recommend',
  Moderate: 'moderate',
} as const;
export type AIAgentCapability = (typeof AIAgentCapability)[keyof typeof AIAgentCapability];

export const AIAgentExecutionMode = {
  Sync: 'sync',
  Async: 'async',
  Batch: 'batch',
  Streaming: 'streaming',
} as const;
export type AIAgentExecutionMode = (typeof AIAgentExecutionMode)[keyof typeof AIAgentExecutionMode];

export const AIDelegationStatus = {
  Pending: 'pending',
  Accepted: 'accepted',
  Rejected: 'rejected',
  Completed: 'completed',
  Failed: 'failed',
} as const;
export type AIDelegationStatus = (typeof AIDelegationStatus)[keyof typeof AIDelegationStatus];

export const EducationAILessonType = {
  Course: 'course',
  Exercise: 'exercise',
  Exam: 'exam',
  Quiz: 'quiz',
  Homework: 'homework',
  Revision: 'revision',
  Project: 'project',
  Lab: 'lab',
} as const;
export type EducationAILessonType = (typeof EducationAILessonType)[keyof typeof EducationAILessonType];

export const BloomTaxonomyLevel = {
  Remember: 'remember',
  Understand: 'understand',
  Apply: 'apply',
  Analyze: 'analyze',
  Evaluate: 'evaluate',
  Create: 'create',
} as const;
export type BloomTaxonomyLevel = (typeof BloomTaxonomyLevel)[keyof typeof BloomTaxonomyLevel];

export const CompetencyLevel = {
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
  Expert: 'expert',
  Mastery: 'mastery',
} as const;
export type CompetencyLevel = (typeof CompetencyLevel)[keyof typeof CompetencyLevel];

export const LearningPathStatus = {
  Draft: 'draft',
  Active: 'active',
  Completed: 'completed',
  Archived: 'archived',
} as const;
export type LearningPathStatus = (typeof LearningPathStatus)[keyof typeof LearningPathStatus];

export const StudentAIActionType = {
  Tutor: 'tutor',
  Coach: 'coach',
  Planner: 'planner',
  Flashcards: 'flashcards',
  Adaptive: 'adaptive',
  Prediction: 'prediction',
} as const;
export type StudentAIActionType = (typeof StudentAIActionType)[keyof typeof StudentAIActionType];

export const TeacherAIServiceType = {
  Assistant: 'assistant',
  Content: 'content',
  Exercises: 'exercises',
  Correction: 'correction',
  Analysis: 'analysis',
  Feedback: 'feedback',
  Recommendations: 'recommendations',
} as const;
export type TeacherAIServiceType = (typeof TeacherAIServiceType)[keyof typeof TeacherAIServiceType];

export const DocumentAIAction = {
  OCR: 'ocr',
  Classify: 'classify',
  Tag: 'tag',
  Extract: 'extract',
  Summarize: 'summarize',
  Translate: 'translate',
  QA: 'qa',
  Compare: 'compare',
  DetectDuplicates: 'detect_duplicates',
} as const;
export type DocumentAIAction = (typeof DocumentAIAction)[keyof typeof DocumentAIAction];

export const KnowledgeSourceType = {
  Document: 'document',
  Webpage: 'webpage',
  Database: 'database',
  API: 'api',
  Manual: 'manual',
  Video: 'video',
  Audio: 'audio',
  Image: 'image',
} as const;
export type KnowledgeSourceType = (typeof KnowledgeSourceType)[keyof typeof KnowledgeSourceType];

export const IndexingStatus = {
  Pending: 'pending',
  Indexing: 'indexing',
  Completed: 'completed',
  Failed: 'failed',
  Reindexing: 'reindexing',
} as const;
export type IndexingStatus = (typeof IndexingStatus)[keyof typeof IndexingStatus];

export const RetrievalStrategy = {
  Similarity: 'similarity',
  Hybrid: 'hybrid',
  Keyword: 'keyword',
  Contextual: 'contextual',
  Reranked: 'reranked',
  MultiQuery: 'multi_query',
} as const;
export type RetrievalStrategy = (typeof RetrievalStrategy)[keyof typeof RetrievalStrategy];

export const PromptLibraryCategory = {
  Education: 'education',
  Communication: 'communication',
  Assessment: 'assessment',
  Analytics: 'analytics',
  Admin: 'admin',
  Creative: 'creative',
  Code: 'code',
  Custom: 'custom',
} as const;
export type PromptLibraryCategory = (typeof PromptLibraryCategory)[keyof typeof PromptLibraryCategory];

export const PromptTestStatus = {
  Draft: 'draft',
  Testing: 'testing',
  Passed: 'passed',
  Failed: 'failed',
} as const;
export type PromptTestStatus = (typeof PromptTestStatus)[keyof typeof PromptTestStatus];

export const AISafetyLevel = {
  None: 'none',
  Low: 'low',
  Medium: 'medium',
  High: 'high',
  Strict: 'strict',
} as const;
export type AISafetyLevel = (typeof AISafetyLevel)[keyof typeof AISafetyLevel];

export const ContentFilterType = {
  Profanity: 'profanity',
  HateSpeech: 'hate_speech',
  Violence: 'violence',
  Sexual: 'sexual',
  Spam: 'spam',
  PII: 'pii',
  Custom: 'custom',
} as const;
export type ContentFilterType = (typeof ContentFilterType)[keyof typeof ContentFilterType];

export const BiasType = {
  Gender: 'gender',
  Racial: 'racial',
  Age: 'age',
  Socioeconomic: 'socioeconomic',
  Disability: 'disability',
  Geographic: 'geographic',
  Religious: 'religious',
} as const;
export type BiasType = (typeof BiasType)[keyof typeof BiasType];

// ============================================================================
// INTERFACES (100)
// ============================================================================

// ============================================================================
// AI Agents (20)
// ============================================================================

export interface AIAgent {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: AIAgentType;
  status: AIAgentStatus;
  modelId: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  capabilities: AIAgentCapability[];
  tools: AIAgentTool[];
  memoryConfig: AgentMemoryConfig;
  permissionScope: string[];
  executionMode: AIAgentExecutionMode;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AIAgentTool {
  id: string;
  agentId: string;
  name: string;
  description: string;
  type: string;
  parameters: Record<string, unknown>;
  handler: string;
  metadata: Record<string, unknown>;
}

export interface AgentMemoryConfig {
  type: string;
  maxMessages: number;
  maxTokens: number;
  summarizeAfter: number;
  persistAcrossSessions: boolean;
  metadata: Record<string, unknown>;
}

export interface AIAgentExecution {
  id: string;
  agentId: string;
  schoolId: string;
  userId: string;
  input: string;
  output: string;
  status: string;
  tokenUsage: number;
  cost: number;
  duration: number;
  error?: string;
  metadata: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
}

export interface AIAgentMessage {
  id: string;
  executionId: string;
  role: string;
  content: string;
  tokenCount: number;
  latency: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIAgentDelegation {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  schoolId: string;
  task: string;
  status: AIDelegationStatus;
  result?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  completedAt: string;
}

export interface AIAgentPermission {
  id: string;
  agentId: string;
  schoolId: string;
  resource: string;
  actions: string[];
  conditions: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface AIAgentMemory {
  id: string;
  agentId: string;
  schoolId: string;
  type: string;
  content: string;
  embedding?: number[];
  relevanceScore: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface AIAgentConfig {
  id: string;
  agentId: string;
  schoolId: string;
  config: Record<string, unknown>;
  overrides: Record<string, unknown>;
  metadata: Record<string, unknown>;
  updatedAt: string;
}

export interface AIAgentAnalytics {
  id: string;
  agentId: string;
  schoolId: string;
  period: string;
  executionCount: number;
  successRate: number;
  avgLatency: number;
  avgCost: number;
  userSatisfaction: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIAgentTemplate {
  id: string;
  name: string;
  description: string;
  type: AIAgentType;
  systemPrompt: string;
  capabilities: AIAgentCapability[];
  tools: AIAgentTool[];
  category: string;
  usageCount: number;
  rating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIAgentConversation {
  id: string;
  agentId: string;
  schoolId: string;
  userId: string;
  messages: AIAgentMessage[];
  status: string;
  tokenCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIAgentSkill {
  id: string;
  agentId: string;
  name: string;
  description: string;
  type: string;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface AIAgentTrigger {
  id: string;
  agentId: string;
  type: string;
  config: Record<string, unknown>;
  conditions: Record<string, unknown>[];
  enabled: boolean;
  metadata: Record<string, unknown>;
}

export interface AgentCollaboration {
  id: string;
  agentIds: string[];
  schoolId: string;
  name: string;
  description: string;
  orchestrationType: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AgentCollaborationStep {
  id: string;
  collaborationId: string;
  agentId: string;
  input: string;
  output: string;
  order: number;
  dependencies: string[];
  metadata: Record<string, unknown>;
}

export interface AIAgentLog {
  id: string;
  agentId: string;
  executionId: string;
  level: string;
  message: string;
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIAgentVersion {
  id: string;
  agentId: string;
  version: string;
  systemPrompt: string;
  capabilities: AIAgentCapability[];
  changelog: string;
  metadata: Record<string, unknown>;
  publishedAt: string;
}

export interface AIAgentFeedback {
  id: string;
  agentId: string;
  executionId: string;
  userId: string;
  rating: number;
  comment: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AgentWorkflowBinding {
  id: string;
  agentId: string;
  workflowId: string;
  trigger: string;
  config: Record<string, unknown>;
  enabled: boolean;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Education AI (20)
// ============================================================================

export interface LessonPlan {
  id: string;
  schoolId: string;
  subjectId: string;
  classId: string;
  title: string;
  objectives: string[];
  content: string;
  activities: LessonActivity[];
  resources: string[];
  duration: number;
  level: BloomTaxonomyLevel;
  competencies: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface LessonActivity {
  id: string;
  type: string;
  description: string;
  duration: number;
  materials: string[];
  assessment: string;
  metadata: Record<string, unknown>;
}

export interface CourseContent {
  id: string;
  schoolId: string;
  subjectId: string;
  title: string;
  description: string;
  modules: CourseModule[];
  level: CompetencyLevel;
  prerequisites: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  content: string;
  lessons: string[];
  assessment: string;
  order: number;
  metadata: Record<string, unknown>;
}

export interface ExamPaper {
  id: string;
  schoolId: string;
  subjectId: string;
  classId: string;
  title: string;
  questions: ExamQuestion[];
  totalPoints: number;
  duration: number;
  instructions: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  createdBy: string;
}

export interface ExamQuestion {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  difficulty: string;
  bloomLevel: BloomTaxonomyLevel;
  explanation: string;
  metadata: Record<string, unknown>;
}

export interface QuizSet {
  id: string;
  schoolId: string;
  subjectId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
  shuffleOptions: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  type: string;
  content: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  metadata: Record<string, unknown>;
}

export interface HomeworkAssignment {
  id: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  title: string;
  description: string;
  questions: HomeworkQuestion[];
  dueDate: string;
  maxScore: number;
  allowLateSubmission: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  createdBy: string;
}

export interface HomeworkQuestion {
  id: string;
  type: string;
  content: string;
  expectedAnswer: string;
  points: number;
  hints: string[];
  metadata: Record<string, unknown>;
}

export interface CorrectionResult {
  id: string;
  schoolId: string;
  assignmentId: string;
  studentId: string;
  answers: CorrectedAnswer[];
  totalScore: number;
  feedback: string;
  rubricApplied: boolean;
  metadata: Record<string, unknown>;
  correctedAt: string;
}

export interface CorrectedAnswer {
  questionId: string;
  studentAnswer: string;
  correctAnswer: string;
  score: number;
  maxScore: number;
  feedback: string;
  rubricScores: RubricScore[];
}

export interface RubricScore {
  criterion: string;
  score: number;
  maxScore: number;
  comment: string;
}

export interface RubricTemplate {
  id: string;
  schoolId: string;
  name: string;
  subject: string;
  type: string;
  criteria: RubricCriterion[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface RubricCriterion {
  name: string;
  description: string;
  levels: RubricLevel[];
  weight: number;
}

export interface RubricLevel {
  level: string;
  description: string;
  score: number;
}

export interface BulletinComment {
  id: string;
  schoolId: string;
  studentId: string;
  period: string;
  subjectId: string;
  comment: string;
  type: string;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface ReportCard {
  id: string;
  schoolId: string;
  studentId: string;
  period: string;
  subjects: ReportSubject[];
  overallAverage: number;
  rank: number;
  status: string;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface ReportSubject {
  subjectId: string;
  average: number;
  rank: number;
  comment: string;
  competencies: string[];
}

export interface CurriculumStructure {
  id: string;
  schoolId: string;
  name: string;
  levels: CurriculumLevel[];
  subjects: CurriculumSubject[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CurriculumLevel {
  id: string;
  name: string;
  order: number;
  sections: string[];
  metadata: Record<string, unknown>;
}

export interface CurriculumSubject {
  id: string;
  name: string;
  code: string;
  levelId: string;
  hoursPerWeek: number;
  competencies: string[];
  metadata: Record<string, unknown>;
}

export interface CompetencyMap {
  id: string;
  schoolId: string;
  subjectId: string;
  competencies: Competency[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Competency {
  id: string;
  name: string;
  description: string;
  level: CompetencyLevel;
  prerequisites: string[];
  assessments: string[];
  metadata: Record<string, unknown>;
}

export interface LearningObjective {
  id: string;
  subjectId: string;
  competencyId: string;
  description: string;
  bloomLevel: BloomTaxonomyLevel;
  measurable: boolean;
  metadata: Record<string, unknown>;
}

export interface BloomDistribution {
  id: string;
  schoolId: string;
  subjectId: string;
  examId: string;
  distribution: Record<BloomTaxonomyLevel, number>;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Student AI (15)
// ============================================================================

export interface TutorSession {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  topic: string;
  messages: TutorMessage[];
  mode: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface TutorMessage {
  id: string;
  sessionId: string;
  role: string;
  content: string;
  hint?: string;
  explanation?: string;
  tokenCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface LearningCoachPlan {
  id: string;
  schoolId: string;
  studentId: string;
  goals: string[];
  currentLevel: CompetencyLevel;
  targetLevel: CompetencyLevel;
  duration: number;
  activities: CoachActivity[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CoachActivity {
  id: string;
  type: string;
  description: string;
  duration: number;
  resources: string[];
  completed: boolean;
  metadata: Record<string, unknown>;
}

export interface RevisionPlan {
  id: string;
  schoolId: string;
  studentId: string;
  examId: string;
  subjects: RevisionSubject[];
  schedule: RevisionSchedule[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface RevisionSubject {
  subjectId: string;
  topics: string[];
  estimatedHours: number;
  priority: string;
  confidence: number;
}

export interface RevisionSchedule {
  date: string;
  subjectId: string;
  topics: string[];
  duration: number;
  completed: boolean;
  metadata: Record<string, unknown>;
}

export interface FlashcardDeck {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  name: string;
  cards: Flashcard[];
  tagCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  hint: string;
  difficulty: string;
  correctCount: number;
  incorrectCount: number;
  nextReview: string;
  metadata: Record<string, unknown>;
}

export interface AdaptivePath {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  currentNodeId: string;
  nodes: AdaptiveNode[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AdaptiveNode {
  id: string;
  topicId: string;
  type: string;
  content: string;
  difficulty: string;
  prerequisites: string[];
  nextNodes: string[];
  metadata: Record<string, unknown>;
}

export interface WeaknessReport {
  id: string;
  schoolId: string;
  studentId: string;
  subjectId: string;
  weaknesses: Weakness[];
  overallConfidence: number;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface Weakness {
  topic: string;
  confidence: number;
  errorPattern: string;
  recommendedActivities: string[];
  metadata: Record<string, unknown>;
}

export interface StudentRecommendation {
  id: string;
  schoolId: string;
  studentId: string;
  type: string;
  title: string;
  description: string;
  resources: string[];
  priority: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface StudySchedule {
  id: string;
  schoolId: string;
  studentId: string;
  name: string;
  slots: StudySlot[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface StudySlot {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  activity: string;
  completed: boolean;
  metadata: Record<string, unknown>;
}

export interface ExamPreparation {
  id: string;
  schoolId: string;
  studentId: string;
  examId: string;
  topics: PrepTopic[];
  studyPlan: PrepPlan[];
  estimatedReadiness: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PrepTopic {
  topicId: string;
  confidence: number;
  studyHours: number;
  practiceQuestions: number;
  lastStudied: string;
  metadata: Record<string, unknown>;
}

export interface PrepPlan {
  date: string;
  topics: string[];
  activities: string[];
  duration: number;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Teacher AI (10)
// ============================================================================

export interface TeachingAssistantSession {
  id: string;
  schoolId: string;
  teacherId: string;
  classId: string;
  messages: AssistantMessage[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AssistantMessage {
  id: string;
  sessionId: string;
  role: string;
  content: string;
  action?: AssistantAction;
  tokenCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AssistantAction {
  type: string;
  target: string;
  data: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
}

export interface ContentImprovement {
  id: string;
  schoolId: string;
  teacherId: string;
  originalContent: string;
  improvedContent: string;
  suggestions: string[];
  changes: ContentChange[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ContentChange {
  field: string;
  oldValue: string;
  newValue: string;
  reason: string;
  metadata: Record<string, unknown>;
}

export interface ExerciseSet {
  id: string;
  schoolId: string;
  teacherId: string;
  subjectId: string;
  classId: string;
  title: string;
  exercises: Exercise[];
  difficulty: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Exercise {
  id: string;
  type: string;
  content: string;
  answer: string;
  points: number;
  hints: string[];
  metadata: Record<string, unknown>;
}

export interface ClassInsight {
  id: string;
  schoolId: string;
  classId: string;
  teacherId: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  actionable: boolean;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface LessonSummary {
  id: string;
  schoolId: string;
  teacherId: string;
  classId: string;
  lessonDate: string;
  summary: string;
  keyTopics: string[];
  studentEngagement: number;
  attendance: number;
  metadata: Record<string, unknown>;
}

export interface AutoFeedback {
  id: string;
  schoolId: string;
  teacherId: string;
  studentId: string;
  assignmentId: string;
  feedback: string;
  rubricScores: RubricScore[];
  quality: number;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface ClassroomRecommendation {
  id: string;
  schoolId: string;
  classId: string;
  teacherId: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface StudentInsight {
  id: string;
  schoolId: string;
  studentId: string;
  classId: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  confidence: number;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

// ============================================================================
// Document AI (10)
// ============================================================================

export interface OCRResult {
  id: string;
  schoolId: string;
  fileId: string;
  text: string;
  confidence: number;
  language: string;
  pages: OCRPage[];
  metadata: Record<string, unknown>;
  processedAt: string;
}

export interface OCRPage {
  pageNumber: number;
  text: string;
  confidence: number;
  boundingBoxes: BoundingBox[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  confidence: number;
}

export interface DocumentClassification {
  id: string;
  schoolId: string;
  fileId: string;
  category: string;
  subcategory: string;
  confidence: number;
  tags: string[];
  metadata: Record<string, unknown>;
  classifiedAt: string;
}

export interface AutoTag {
  id: string;
  schoolId: string;
  fileId: string;
  tags: Tag[];
  metadata: Record<string, unknown>;
  taggedAt: string;
}

export interface Tag {
  name: string;
  confidence: number;
  source: string;
}

export interface EntityExtraction {
  id: string;
  schoolId: string;
  fileId: string;
  entities: ExtractedEntity[];
  metadata: Record<string, unknown>;
  extractedAt: string;
}

export interface ExtractedEntity {
  type: string;
  value: string;
  confidence: number;
  startIndex: number;
  endIndex: number;
  metadata: Record<string, unknown>;
}

export interface DocumentSummary {
  id: string;
  schoolId: string;
  fileId: string;
  summary: string;
  keyPoints: string[];
  sentences: number;
  wordCount: number;
  metadata: Record<string, unknown>;
  generatedAt: string;
}

export interface DocumentTranslation {
  id: string;
  schoolId: string;
  fileId: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatedText: string;
  quality: number;
  metadata: Record<string, unknown>;
  translatedAt: string;
}

export interface DocumentQA {
  id: string;
  schoolId: string;
  fileId: string;
  question: string;
  answer: string;
  confidence: number;
  sources: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SemanticSearchResult {
  id: string;
  schoolId: string;
  query: string;
  results: SearchResultItem[];
  metadata: Record<string, unknown>;
  searchedAt: string;
}

export interface SearchResultItem {
  documentId: string;
  chunkId: string;
  content: string;
  score: number;
  highlights: string[];
  metadata: Record<string, unknown>;
}

// ============================================================================
// Knowledge Base (10)
// ============================================================================

export interface KnowledgeSource {
  id: string;
  schoolId: string;
  name: string;
  type: KnowledgeSourceType;
  config: Record<string, unknown>;
  status: string;
  documentCount: number;
  lastSynced: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface KnowledgeDocument {
  id: string;
  sourceId: string;
  schoolId: string;
  title: string;
  content: string;
  contentType: string;
  chunkCount: number;
  tokenCount: number;
  status: IndexingStatus;
  metadata: Record<string, unknown>;
  createdAt: string;
  indexedAt: string;
}

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  content: string;
  embedding: number[];
  tokenCount: number;
  position: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface KnowledgeIndex {
  id: string;
  schoolId: string;
  name: string;
  sources: string[];
  vectorStoreId: string;
  dimensions: number;
  metric: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface VectorStore {
  id: string;
  schoolId: string;
  name: string;
  provider: string;
  dimensions: number;
  vectorCount: number;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface RetrievalQuery {
  id: string;
  schoolId: string;
  query: string;
  embedding: number[];
  strategy: RetrievalStrategy;
  topK: number;
  filters: Record<string, unknown>;
  results: RetrievalResult[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface RetrievalResult {
  chunkId: string;
  documentId: string;
  content: string;
  score: number;
  highlights: string[];
  metadata: Record<string, unknown>;
}

export interface RAGExecution {
  id: string;
  schoolId: string;
  query: string;
  context: string;
  results: RetrievalResult[];
  prompt: string;
  response: string;
  modelId: string;
  tokenUsage: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CitationEntry {
  id: string;
  schoolId: string;
  sourceDocumentId: string;
  chunkId: string;
  text: string;
  position: number;
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface KnowledgePermission {
  id: string;
  schoolId: string;
  knowledgeBaseId: string;
  userId?: string;
  role?: string;
  access: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}
