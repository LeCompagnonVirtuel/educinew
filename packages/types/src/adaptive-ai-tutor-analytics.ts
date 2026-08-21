// Module 4: AI Tutor — Enums

export enum TutorMode {
  EXPLAIN = 'EXPLAIN',
  PRACTICE = 'PRACTICE',
  ASSESS = 'ASSESS',
  GUIDE = 'GUIDE',
  CHAT = 'CHAT',
  VOICE = 'VOICE',
  IMAGE = 'IMAGE',
  WHITEBOARD = 'WHITEBOARD',
}

export enum TutorSubject {
  MATHEMATICS = 'MATHEMATICS',
  SCIENCE = 'SCIENCE',
  ENGLISH = 'ENGLISH',
  FRENCH = 'FRENCH',
  HISTORY = 'HISTORY',
  GEOGRAPHY = 'GEOGRAPHY',
  COMPUTER_SCIENCE = 'COMPUTER_SCIENCE',
  ART = 'ART',
  MUSIC = 'MUSIC',
  PHYSICAL_EDUCATION = 'PHYSICAL_EDUCATION',
}

export enum ConversationStyle {
  FORMAL = 'FORMAL',
  FRIENDLY = 'FRIENDLY',
  ENCOURAGING = 'ENCOURAGING',
  SOCRATIC = 'SOCRATIC',
  DIRECT = 'DIRECT',
}

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum TutorResponseFormat {
  TEXT = 'TEXT',
  CODE = 'CODE',
  MATH = 'MATH',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  WHITEBOARD = 'WHITEBOARD',
}

export enum MathOperation {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  ALGEBRA = 'ALGEBRA',
  GEOMETRY = 'GEOMETRY',
  CALCULUS = 'CALCULUS',
  STATISTICS = 'STATISTICS',
  PROBABILITY = 'PROBABILITY',
}

export enum ScienceBranch {
  PHYSICS = 'PHYSICS',
  CHEMISTRY = 'CHEMISTRY',
  BIOLOGY = 'BIOLOGY',
  EARTH_SCIENCE = 'EARTH_SCIENCE',
  ENVIRONMENTAL_SCIENCE = 'ENVIRONMENTAL_SCIENCE',
}

export enum TutorStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
}

// Module 5: Learning Analytics — Enums

export enum AnalyticsTimeframe {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
  CUSTOM = 'CUSTOM',
}

export enum DashboardType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  SCHOOL = 'SCHOOL',
  MINISTRY = 'MINISTRY',
}

export enum InsightType {
  TREND = 'TREND',
  ANOMALY = 'ANOMALY',
  PREDICTION = 'PREDICTION',
  RECOMMENDATION = 'RECOMMENDATION',
  COMPARISON = 'COMPARISON',
}

export enum ComparisonType {
  PEER = 'PEER',
  GRADE_LEVEL = 'GRADE_LEVEL',
  SCHOOL = 'SCHOOL',
  REGIONAL = 'REGIONAL',
  NATIONAL = 'NATIONAL',
}

export enum AnalyticsMetricType {
  MASTERY = 'MASTERY',
  PROGRESS = 'PROGRESS',
  ENGAGEMENT = 'ENGAGEMENT',
  TIME_ON_TASK = 'TIME_ON_TASK',
  COMPLETION_RATE = 'COMPLETION_RATE',
  ACCURACY = 'ACCURACY',
}

export enum HeatmapScale {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum TimelineEventType {
  LESSON = 'LESSON',
  ASSESSMENT = 'ASSESSMENT',
  ACHIEVEMENT = 'ACHIEVEMENT',
  MILESTONE = 'MILESTONE',
  INTERVENTION = 'INTERVENTION',
  REMEDIATION = 'REMEDIATION',
}

export enum SkillEvolutionPeriod {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  SEMESTER = 'SEMESTER',
  YEAR = 'YEAR',
}

// Module 4: AI Tutor — Interfaces

export interface AITutor {
  id: string;
  school_id: string;
  student_id: string;
  tutor_subject: TutorSubject;
  mode: TutorMode;
  language: string;
  status: TutorStatus;
  created_at: string;
  updated_at: string;
}

export interface TutorConversation {
  id: string;
  tutor_id: string;
  messages: TutorMessage[];
  started_at: string;
  last_message_at: string;
  satisfaction_rating: number | null;
}

export interface TutorMessage {
  id: string;
  role: 'student' | 'tutor';
  content: string;
  format: TutorResponseFormat;
  timestamp: string;
  helpful: boolean | null;
}

export interface HomeworkAssistance {
  id: string;
  school_id: string;
  student_id: string;
  subject: TutorSubject;
  question: string;
  ai_response: string;
  steps_shown: number;
  student_satisfied: boolean | null;
  created_at: string;
}

export interface ConceptExplanation {
  id: string;
  concept_name: string;
  subject: TutorSubject;
  explanation: string;
  analogies: string[];
  examples: string[];
  difficulty_level: string;
  created_at: string;
}

export interface ConversationMemory {
  id: string;
  tutor_id: string;
  student_id: string;
  context: string[];
  topics_covered: string[];
  key_facts: string[];
  last_updated: string;
}

export interface MultiLanguageTutor {
  id: string;
  tutor_id: string;
  supported_languages: string[];
  primary_language: string;
  created_at: string;
}

export interface VoiceTutor {
  id: string;
  tutor_id: string;
  supported_accents: string[];
  speech_recognition_accuracy: number;
  created_at: string;
}

export interface ImageTutor {
  id: string;
  tutor_id: string;
  supported_image_types: string[];
  ocr_enabled: boolean;
  created_at: string;
}

export interface WhiteboardTutor {
  id: string;
  tutor_id: string;
  supported_tools: string[];
  collaboration_enabled: boolean;
  created_at: string;
}

export interface MathSolver {
  id: string;
  school_id: string;
  problem_text: string;
  solution_steps: MathStep[];
  final_answer: string;
  subject_area: MathOperation;
  created_at: string;
}

export interface MathStep {
  step_number: number;
  operation: string;
  explanation: string;
  result: string;
}

export interface ScienceSolver {
  id: string;
  school_id: string;
  problem_text: string;
  solution: string;
  branch: ScienceBranch;
  created_at: string;
}

export interface ProgrammingTutor {
  id: string;
  school_id: string;
  student_id: string;
  language: string;
  topic: string;
  exercise_code: string;
  feedback: string;
  created_at: string;
}

export interface EssayAssistant {
  id: string;
  school_id: string;
  student_id: string;
  essay_text: string;
  feedback: EssayFeedback;
  created_at: string;
}

export interface EssayFeedback {
  grammar_score: number;
  vocabulary_score: number;
  structure_score: number;
  argument_score: number;
  overall_score: number;
  suggestions: string[];
}

export interface TutorSession {
  id: string;
  tutor_id: string;
  student_id: string;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number;
  topic: string;
  mode: TutorMode;
  rating: number | null;
}

// Module 5: Learning Analytics — Interfaces

export interface MasteryDashboard {
  id: string;
  school_id: string;
  student_id: string;
  subjects: SubjectMastery[];
  overall_mastery: number;
  timeframe: AnalyticsTimeframe;
  created_at: string;
}

export interface SubjectMastery {
  subject_id: string;
  subject_name: string;
  mastery_level: number;
  skills_mastered: number;
  skills_total: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface CompetencyDashboard {
  id: string;
  school_id: string;
  student_id: string;
  framework: string;
  competencies: CompetencyStatus[];
  overall_progress: number;
  created_at: string;
}

export interface CompetencyStatus {
  competency_id: string;
  name: string;
  status: string;
  score: number;
  assessments_count: number;
}

export interface KnowledgeHeatmap {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  nodes: HeatmapNode[];
  overall_coverage: number;
  created_at: string;
}

export interface HeatmapNode {
  concept_id: string;
  concept_name: string;
  mastery: number;
  scale: HeatmapScale;
  last_assessed: string;
}

export interface LearningTimeline {
  id: string;
  school_id: string;
  student_id: string;
  events: TimelineEvent[];
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  date: string;
  metadata: Record<string, unknown>;
}

export interface SkillEvolution {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  period: SkillEvolutionPeriod;
  data_points: SkillEvolutionPoint[];
  trend: string;
  created_at: string;
}

export interface SkillEvolutionPoint {
  date: string;
  score: number;
  assessment_type: string;
}

export interface WeakTopicsReport {
  id: string;
  school_id: string;
  student_id: string;
  weak_topics: TopicReport[];
  generated_at: string;
}

export interface StrongTopicsReport {
  id: string;
  school_id: string;
  student_id: string;
  strong_topics: TopicReport[];
  generated_at: string;
}

export interface TopicReport {
  topic_id: string;
  topic_name: string;
  mastery: number;
  assessment_count: number;
  last_assessed: string;
  trend: string;
}

export interface TeacherInsights {
  id: string;
  school_id: string;
  teacher_id: string;
  class_insights: ClassInsight[];
  generated_at: string;
}

export interface ClassInsight {
  class_id: string;
  class_name: string;
  average_mastery: number;
  at_risk_students: number;
  top_performers: number;
  recommendations: string[];
}

export interface ParentInsights {
  id: string;
  school_id: string;
  parent_id: string;
  student_insights: StudentParentInsight[];
  generated_at: string;
}

export interface StudentParentInsight {
  student_id: string;
  student_name: string;
  overall_score: number;
  strengths: string[];
  areas_for_improvement: string[];
  recommended_activities: string[];
}

export interface SchoolInsights {
  id: string;
  school_id: string;
  overall_performance: number;
  department_performance: DepartmentPerformance[];
  risk_summary: RiskSummary;
  generated_at: string;
}

export interface DepartmentPerformance {
  department: string;
  average_score: number;
  student_count: number;
  trend: string;
}

export interface RiskSummary {
  total_at_risk: number;
  critical: number;
  high: number;
  moderate: number;
  low: number;
}

export interface MinistryInsights {
  id: string;
  region_id: string;
  national_performance: number;
  regional_comparison: RegionalComparison[];
  generated_at: string;
}

export interface RegionalComparison {
  region: string;
  performance: number;
  rank: number;
  trend: string;
}

export interface AnalyticsReport {
  id: string;
  school_id: string;
  title: string;
  report_type: string;
  timeframe: AnalyticsTimeframe;
  data: Record<string, unknown>;
  generated_at: string;
  created_at: string;
}
