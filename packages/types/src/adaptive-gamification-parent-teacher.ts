// Phase 3.2 - Adaptive Gamification & Parent-Teacher AI Collaboration
// Modules 10-13

// ==================== ENUMS ====================

export enum AchievementRarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export enum MissionType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  SPECIAL = 'SPECIAL',
  EVENT = 'EVENT',
  CLASS = 'CLASS',
}

export enum RewardType {
  XP = 'XP',
  BADGE = 'BADGE',
  CURRENCY = 'CURRENCY',
  TITLE = 'TITLE',
  AVATAR_ITEM = 'AVATAR_ITEM',
}

export enum LeaderboardScope {
  CLASS = 'CLASS',
  SCHOOL = 'SCHOOL',
  REGIONAL = 'REGIONAL',
  NATIONAL = 'NATIONAL',
}

export enum TeamStatus {
  ACTIVE = 'ACTIVE',
  DISSOLVED = 'DISSOLVED',
  FULL = 'FULL',
}

export enum AvatarGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  CUSTOM = 'CUSTOM',
}

export enum BadgeCategory {
  ACADEMIC = 'ACADEMIC',
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  CREATIVE = 'CREATIVE',
  CITIZENSHIP = 'CITIZENSHIP',
  ACHIEVEMENT = 'ACHIEVEMENT',
}

export enum ChallengeDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXTREME = 'EXTREME',
}

export enum ParentAlertType {
  ACADEMIC = 'ACADEMIC',
  BEHAVIOURAL = 'BEHAVIOURAL',
  ATTENDANCE = 'ATTENDANCE',
  FINANCIAL = 'FINANCIAL',
  SAFEMENTAL = 'SAFEMENTAL',
}

export enum CoachingArea {
  HOMEWORK = 'HOMEWORK',
  STUDY_HABITS = 'STUDY_HABITS',
  SCREEN_TIME = 'SCREEN_TIME',
  SLEEP = 'SLEEP',
  NUTRITION = 'NUTRITION',
  MOTIVATION = 'MOTIVATION',
  COMMUNICATION = 'COMMUNICATION',
}

export enum LessonPlanStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum ExamTemplateType {
  MCQ = 'MCQ',
  ESSAY = 'ESSAY',
  MIXED = 'MIXED',
  PRACTICAL = 'PRACTICAL',
  ADAPTIVE = 'ADAPTIVE',
}

export enum HomeworkTemplateStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
}

export enum InsightCategory {
  PERFORMANCE = 'PERFORMANCE',
  ENGAGEMENT = 'ENGAGEMENT',
  BEHAVIOUR = 'BEHAVIOUR',
  ATTENDANCE = 'ATTENDANCE',
  PROGRESS = 'PROGRESS',
}

export enum SchoolPerformanceMetric {
  PASS_RATE = 'PASS_RATE',
  AVERAGE_SCORE = 'AVERAGE_SCORE',
  ATTENDANCE = 'ATTENDANCE',
  GRADUATION = 'GRADUATION',
  RETENTION = 'RETENTION',
  DISCIPLINE = 'DISCIPLINE',
}

export enum ResourceAllocationType {
  BUDGET = 'BUDGET',
  STAFF = 'STAFF',
  EQUIPMENT = 'EQUIPMENT',
  SPACE = 'SPACE',
  TECHNOLOGY = 'TECHNOLOGY',
}

export enum RiskPredictionType {
  ACADEMIC_FAILURE = 'ACADEMIC_FAILURE',
  DROPOUT = 'DROPOUT',
  BEHAVIOURAL = 'BEHAVIOURAL',
  FINANCIAL = 'FINANCIAL',
  SECURITY = 'SECURITY',
}

// ==================== MODULE 10: ADAPTIVE GAMIFICATION ====================

export interface XP {
  id: string;
  school_id: string;
  student_id: string;
  amount: number;
  source: string;
  reason: string;
  created_at: string;
}

export interface Level {
  id: string;
  school_id: string;
  student_id: string;
  current_level: number;
  current_xp: number;
  xp_to_next_level: number;
  total_xp: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  school_id: string;
  student_id: string;
  name: string;
  description: string;
  icon_url: string;
  rarity: AchievementRarity;
  criteria: string[];
  unlocked: boolean;
  unlocked_at: string | null;
  created_at: string;
}

export interface Mission {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  description: string;
  mission_type: MissionType;
  xp_reward: number;
  requirements: MissionRequirement[];
  status: string;
  expires_at: string;
  created_at: string;
}

export interface MissionRequirement {
  id: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
}

export interface DailyChallenge {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  xp_reward: number;
  status: string;
  date: string;
  completed_at: string | null;
}

export interface WeeklyChallenge {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  xp_reward: number;
  status: string;
  week_start: string;
  week_end: string;
  progress: number;
  created_at: string;
}

export interface Leaderboard {
  id: string;
  school_id: string;
  scope: LeaderboardScope;
  scope_id: string;
  period: string;
  entries: LeaderboardEntry[];
  generated_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  student_id: string;
  student_name: string;
  score: number;
  level: number;
  avatar_url: string;
}

export interface Team {
  id: string;
  school_id: string;
  name: string;
  members: TeamMember[];
  leader_id: string;
  status: TeamStatus;
  created_at: string;
}

export interface TeamMember {
  student_id: string;
  name: string;
  role: string;
  joined_at: string;
  xp_contributed: number;
}

export interface Avatar {
  id: string;
  school_id: string;
  student_id: string;
  avatar_url: string;
  accessories: string[];
  background: string;
  updated_at: string;
}

export interface Reward {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  description: string;
  type: RewardType;
  value: number;
  claimed: boolean;
  claimed_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface Badge {
  id: string;
  school_id: string;
  student_id: string;
  name: string;
  description: string;
  icon_url: string;
  category: BadgeCategory;
  earned_at: string;
  created_at: string;
}

export interface VirtualCurrency {
  id: string;
  school_id: string;
  student_id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface CurrencyTransaction {
  id: string;
  student_id: string;
  amount: number;
  type: 'earned' | 'spent';
  reason: string;
  created_at: string;
}

export interface XPProgress {
  student_id: string;
  current_level: number;
  current_xp: number;
  xp_to_next: number;
  percentage: number;
  streak_days: number;
}

// ==================== MODULE 11: PARENT AI ====================

export interface ParentRecommendation {
  id: string;
  school_id: string;
  parent_id: string;
  student_id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  action_url: string | null;
  created_at: string;
}

export interface ParentAlert {
  id: string;
  school_id: string;
  parent_id: string;
  student_id: string;
  alert_type: ParentAlertType;
  title: string;
  message: string;
  severity: string;
  read: boolean;
  created_at: string;
}

export interface ParentCoaching {
  id: string;
  school_id: string;
  parent_id: string;
  student_id: string;
  area: CoachingArea;
  tips: CoachingTip[];
  created_at: string;
}

export interface CoachingTip {
  id: string;
  title: string;
  description: string;
  resources: string[];
  priority: number;
}

export interface ParentDashboardData {
  parent_id: string;
  school_id: string;
  children: ChildSummary[];
  notifications_count: number;
  upcoming_events: string[];
  generated_at: string;
}

export interface ChildSummary {
  student_id: string;
  name: string;
  grade: string;
  overall_score: number;
  attendance_rate: number;
  recent_grades: string[];
  alerts_count: number;
}

export interface HomeActivity {
  id: string;
  school_id: string;
  parent_id: string;
  student_id: string;
  title: string;
  description: string;
  subject: string;
  estimated_minutes: number;
  status: string;
  due_date: string | null;
  created_at: string;
}

export interface ParentWeeklyReport {
  id: string;
  school_id: string;
  parent_id: string;
  student_id: string;
  week_start: string;
  week_end: string;
  summary: string;
  achievements: string[];
  areas_for_improvement: string[];
  recommended_actions: string[];
  generated_at: string;
}

// ==================== MODULE 12: TEACHER AI ASSISTANT ====================

export interface LessonPlan {
  id: string;
  school_id: string;
  teacher_id: string;
  title: string;
  subject_id: string;
  grade_level: string;
  duration_minutes: number;
  objectives: string[];
  activities: LessonActivity[];
  materials: string[];
  assessment: string;
  status: LessonPlanStatus;
  created_at: string;
  updated_at: string;
}

export interface LessonActivity {
  id: string;
  type: string;
  title: string;
  duration_minutes: number;
  description: string;
  order: number;
}

export interface ExamTemplate {
  id: string;
  school_id: string;
  teacher_id: string;
  title: string;
  subject_id: string;
  type: ExamTemplateType;
  questions_count: number;
  total_points: number;
  duration_minutes: number;
  difficulty: string;
  created_at: string;
}

export interface HomeworkTemplate {
  id: string;
  school_id: string;
  teacher_id: string;
  title: string;
  subject_id: string;
  exercises_count: number;
  estimated_minutes: number;
  difficulty: string;
  status: HomeworkTemplateStatus;
  created_at: string;
}

export interface RubricTemplate {
  id: string;
  school_id: string;
  teacher_id: string;
  title: string;
  subject_id: string;
  criteria_count: number;
  max_score: number;
  created_at: string;
}

export interface ClassroomInsights {
  id: string;
  school_id: string;
  teacher_id: string;
  class_id: string;
  insights: TeacherInsightItem[];
  period: string;
  generated_at: string;
}

export interface TeacherInsightItem {
  category: InsightCategory;
  title: string;
  description: string;
  data: Record<string, unknown>;
}

export interface AttendanceInsights {
  id: string;
  school_id: string;
  teacher_id: string;
  class_id: string;
  attendance_rate: number;
  trend: string;
  at_risk_students: string[];
  generated_at: string;
}

export interface TeacherIntervention {
  id: string;
  school_id: string;
  teacher_id: string;
  student_id: string;
  type: string;
  title: string;
  description: string;
  urgency: string;
  status: string;
  created_at: string;
}

export interface LessonRecommendation {
  id: string;
  school_id: string;
  teacher_id: string;
  subject_id: string;
  title: string;
  reason: string;
  confidence: number;
  created_at: string;
}

// ==================== MODULE 13: ADMINISTRATION INTELLIGENCE ====================

export interface SchoolPerformanceAI {
  id: string;
  school_id: string;
  metrics: SchoolMetric[];
  trends: PerformanceTrend[];
  predictions: PerformancePrediction[];
  generated_at: string;
}

export interface SchoolMetric {
  name: string;
  value: number;
  target: number;
  status: string;
  trend: string;
}

export interface PerformanceTrend {
  metric: string;
  period: string;
  direction: string;
  magnitude: number;
}

export interface PerformancePrediction {
  metric: string;
  predicted_value: number;
  confidence: number;
  factors: string[];
}

export interface TeacherPerformanceAI {
  id: string;
  school_id: string;
  teacher_id: string;
  metrics: TeacherMetric[];
  rating: number;
  strengths: string[];
  areas_for_improvement: string[];
  generated_at: string;
}

export interface TeacherMetric {
  name: string;
  value: number;
  benchmark: number;
  rank: string;
}

export interface CurriculumAnalysis {
  id: string;
  school_id: string;
  framework_id: string;
  completion_rate: number;
  quality_score: number;
  gaps: CurriculumGap[];
  recommendations: string[];
  generated_at: string;
}

export interface CurriculumGap {
  subject: string;
  topic: string;
  severity: string;
  affected_students: number;
  suggested_action: string;
}

export interface ResourceAllocation {
  id: string;
  school_id: string;
  allocations: AllocationItem[];
  efficiency_score: number;
  recommendations: string[];
  generated_at: string;
}

export interface AllocationItem {
  resource_type: ResourceAllocationType;
  current: number;
  allocated: number;
  utilization: number;
  status: string;
}

export interface RiskPrediction {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  risk_type: string;
  probability: number;
  factors: string[];
  mitigation: string[];
  created_at: string;
}

export interface NationalComparison {
  id: string;
  school_id: string;
  metrics: ComparisonMetric[];
  national_rank: number;
  regional_rank: number;
  generated_at: string;
}

export interface ComparisonMetric {
  name: string;
  school_value: number;
  national_average: number;
  regional_average: number;
  percentile: number;
}
