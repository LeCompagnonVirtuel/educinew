export enum WellbeingLevel {
  THRIVING = "thriving",
  GOOD = "good",
  FAIR = "fair",
  STRUGGLING = "struggling",
  IN_CRISIS = "in_crisis",
  CRITICAL = "critical",
}

export enum WellbeingDimension {
  EMOTIONAL = "emotional",
  SOCIAL = "social",
  ACADEMIC = "academic",
  PHYSICAL = "physical",
  SPIRITUAL = "spiritual",
  ENVIRONMENTAL = "environmental",
  FINANCIAL = "financial",
  MENTAL = "mental",
}

export enum AssessmentType {
  SELF_REPORT = "self_report",
  TEACHER_OBSERVATION = "teacher_observation",
  PARENT_REPORT = "parent_report",
  PEER_ASSESSMENT = "peer_assessment",
  CLINICAL = "clinical",
  BEHAVIORAL = "behavioral",
  ACADEMIC_CORRELATION = "academic_correlation",
}

export enum StressLevel {
  NONE = "none",
  MILD = "mild",
  MODERATE = "moderate",
  HIGH = "high",
  SEVERE = "severe",
  OVERWHELMING = "overwhelming",
}

export enum AnxietyLevel {
  NONE = "none",
  MILD = "mild",
  MODERATE = "moderate",
  HIGH = "high",
  SEVERE = "severe",
  PANIC = "panic",
}

export enum EmotionalState {
  HAPPY = "happy",
  CONTENT = "content",
  NEUTRAL = "neutral",
  SAD = "sad",
  ANGRY = "angry",
  FRUSTRATED = "frustrated",
  ANXIOUS = "anxious",
  FEARFUL = "fearful",
  CONFUSED = "confused",
  LONELY = "lonely",
  EXCITED = "excited",
  CALM = "calm",
}

export enum EngagementLevel {
  HIGHLY_ENGAGED = "highly_engaged",
  ENGAGED = "engaged",
  NEUTRAL = "neutral",
  DISENGAGED = "disengaged",
  HIGHLY_DISENGAGED = "highly_disengaged",
  REBELLIOUS = "rebellious",
}

export enum BurnoutLevel {
  NONE = "none",
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
  SEVERE = "severe",
  CHRONIC = "chronic",
}

export enum CounselorType {
  SCHOOL_COUNSELOR = "school_counselor",
  CLINICAL_PSYCHOLOGIST = "clinical_psychologist",
  PSYCHIATRIST = "psychiatrist",
  SOCIAL_WORKER = "social_worker",
  BEHAVIORAL_SPECIALIST = "behavioral_specialist",
  TRAUMA_COUNSELOR = "trauma_counselor",
  PEER_COUNSELOR = "peer_counselor",
  EXTERNAL_PROVIDER = "external_provider",
}

export enum InterventionType {
  INDIVIDUAL_COUNSELING = "individual_counseling",
  GROUP_COUNSELING = "group_counseling",
  CRISIS_INTERVENTION = "crisis_intervention",
  BEHAVIORAL_INTERVENTION = "behavioral_intervention",
  ACADEMIC_SUPPORT = "academic_support",
  PEER_SUPPORT = "peer_support",
  FAMILY_THERAPY = "family_therapy",
  MINDFULNESS = "mindfulness",
  SOCIALIZATION_SKILLS = "socialization_skills",
  ANGER_MANAGEMENT = "anger_management",
}

export enum SupportPlanStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  UNDER_REVIEW = "under_review",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NEEDS_REVISION = "needs_revision",
}

export enum FollowUpStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  MISSED = "missed",
  CANCELLED = "cancelled",
  RESCHEDULED = "rescheduled",
  PENDING = "pending",
}

export interface WellbeingProfile {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  overall_wellbeing_level: WellbeingLevel;
  overall_score: number;
  dimensions: WellbeingDimension[];
  last_assessment_date: string;
  next_assessment_date: string;
  risk_factors: string[];
  protective_factors: string[];
  strengths: string[];
  areas_of_concern: string[];
  current_interventions: string[];
  counselor_assigned: string;
  parent_engagement_level: string;
  follow_up_required: boolean;
  follow_up_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WellbeingAssessment {
  id: string;
  school_id: string;
  student_id: string;
  assessment_type: AssessmentType;
  assessment_name: string;
  administered_by: string;
  administered_date: string;
  dimensions_assessed: WellbeingDimension[];
  total_score: number;
  max_score: number;
  percentage: number;
  wellbeing_level: WellbeingLevel;
  dimension_scores: Record<string, number>;
  observations: string;
  flags: string[];
  follow_up_required: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingAssessmentResult {
  id: string;
  assessment_id: string;
  student_id: string;
  dimension: WellbeingDimension;
  score: number;
  max_score: number;
  percentage: number;
  level: WellbeingLevel;
  indicators: string[];
  strengths: string[];
  concerns: string[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface StressIndicator {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  stress_level: StressLevel;
  stress_score: number;
  academic_pressure: number;
  social_pressure: number;
  family_pressure: number;
  personal_pressure: number;
  coping_mechanisms: string[];
  triggers: string[];
  physical_symptoms: string[];
  behavioral_changes: string[];
  recommendations: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AnxietyIndicator {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  anxiety_level: AnxietyLevel;
  anxiety_score: number;
  generalized_anxiety: number;
  social_anxiety: number;
  performance_anxiety: number;
  separation_anxiety: number;
  panic_episodes: number;
  avoidance_behaviors: string[];
  physical_symptoms: string[];
  cognitive_symptoms: string[];
  coping_strategies: string[];
  interventions: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmotionalWellbeing {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  dominant_emotional_state: EmotionalState;
  emotional_regulation_score: number;
  emotional_awareness_score: number;
  empathy_score: number;
  self_esteem_score: number;
  mood_stability: number;
  positive_emotions_frequency: number;
  negative_emotions_frequency: number;
  emotional_triggers: string[];
  coping_strategies: string[];
  support_needed: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolEngagement {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  engagement_level: EngagementLevel;
  attendance_rate: number;
  participation_rate: number;
  assignment_completion: number;
  class_participation_score: number;
  teacher_relationship_score: number;
  peer_relationship_score: number;
  school_belonging_score: number;
  motivation_level: number;
  disengagement_signs: string[];
  engagement_boosters: string[];
  recommendations: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SocialWellbeing {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  social_skills_score: number;
  friendship_quality: number;
  peer_acceptance: number;
  social_confidence: number;
  communication_skills: number;
  conflict_resolution: number;
  collaboration_skills: number;
  number_of_close_friends: number;
  social_activities_participation: number;
  bullying_victim: boolean;
  bullying_perpetrator: boolean;
  social_concerns: string[];
  social_strengths: string[];
  recommendations: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LonelinessIndicator {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  loneliness_score: number;
  social_loneliness_score: number;
  emotional_loneliness_score: number;
  isolation_level: string;
  social_connection_count: number;
  quality_of_relationships: number;
  belonging_score: number;
  exclusion_experiences: string[];
  social_anxiety_factors: string[];
  interventions: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BurnoutIndicator {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  burnout_level: BurnoutLevel;
  burnout_score: number;
  emotional_exhaustion: number;
  depersonalization: number;
  personal_accomplishment: number;
  academic_burnout: number;
  social_burnout: number;
  physical_fatigue: number;
  cognitive_fatigue: number;
  motivation_loss: number;
  irritability_level: number;
  sleep_quality: number;
  stress_sources: string[];
  recovery_strategies: string[];
  accommodations_needed: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingSurvey {
  id: string;
  school_id: string;
  survey_name: string;
  survey_type: string;
  description: string;
  questions: string[];
  dimensions: WellbeingDimension[];
  target_audience: string;
  start_date: string;
  end_date: string;
  is_anonymous: boolean;
  response_count: number;
  status: string;
  created_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingSurveyResponse {
  id: string;
  school_id: string;
  survey_id: string;
  student_id: string;
  response_date: string;
  answers: Record<string, string>;
  dimension_scores: Record<string, number>;
  overall_score: number;
  wellbeing_level: WellbeingLevel;
  flags: string[];
  follow_up_required: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingCheckIn {
  id: string;
  school_id: string;
  student_id: string;
  check_in_date: string;
  check_in_time: string;
  mood_rating: number;
  energy_level: number;
  stress_level: number;
  sleep_quality: number;
  social_connection: number;
  academic_load: number;
  current_feelings: string[];
  concerns: string[];
  support_needed: string[];
  checked_in_by: string;
  follow_up_required: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CounselorReferral {
  id: string;
  school_id: string;
  student_id: string;
  referral_date: string;
  referred_by: string;
  counselor_type: CounselorType;
  reason: string;
  urgency: string;
  concern_categories: string[];
  previous_counseling: boolean;
  current_medications: string[];
  family_history: string;
  status: string;
  assigned_counselor: string;
  first_appointment_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SupportPlan {
  id: string;
  school_id: string;
  student_id: string;
  plan_name: string;
  status: SupportPlanStatus;
  start_date: string;
  end_date: string;
  review_date: string;
  created_by: string;
  approved_by: string;
  goals: string[];
  interventions: InterventionType[];
  actions: SupportPlanAction[];
  team_members: string[];
  parent_involved: boolean;
  progress_percentage: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SupportPlanAction {
  id: string;
  plan_id: string;
  action_name: string;
  description: string;
  intervention_type: InterventionType;
  responsible_person: string;
  frequency: string;
  start_date: string;
  end_date: string;
  status: string;
  completion_date: string;
  outcome: string;
  notes: string;
}

export interface InterventionTracking {
  id: string;
  school_id: string;
  student_id: string;
  intervention_type: InterventionType;
  start_date: string;
  end_date: string;
  sessions_completed: number;
  sessions_planned: number;
  progress_score: number;
  goals_met: string[];
  goals_pending: string[];
  side_effects: string[];
  effectiveness_rating: number;
  student_feedback: string;
  counselor_notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FollowUpSession {
  id: string;
  school_id: string;
  student_id: string;
  session_date: string;
  session_time: string;
  duration_minutes: number;
  session_type: string;
  counselor_name: string;
  status: FollowUpStatus;
  agenda: string[];
  discussion_points: string[];
  action_items: string[];
  mood_before: number;
  mood_after: number;
  risk_assessment: string;
  next_session_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingResource {
  id: string;
  school_id: string;
  resource_name: string;
  resource_type: string;
  description: string;
  target_audience: string[];
  dimensions: WellbeingDimension[];
  url: string;
  file_url: string;
  author: string;
  is_anonymous: boolean;
  language: string;
  age_appropriate: string[];
  tags: string[];
  usage_count: number;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}
