export enum AcademyType {
  CORPORATE = 'CORPORATE',
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  HYBRID = 'HYBRID',
  PARTNER = 'PARTNER',
  VIRTUAL = 'VIRTUAL',
  ONSITE = 'ONSITE',
  BLENDED = 'BLENDED',
  SATELLITE = 'SATELLITE',
  GLOBAL = 'GLOBAL',
}

export enum LearningStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  EXEMPT = 'EXEMPT',
  SUSPENDED = 'SUSPENDED',
  DEFERRED = 'DEFERRED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  RECOGNIZED = 'RECOGNIZED',
}

export enum BudgetType {
  ANNUAL = 'ANNUAL',
  QUARTERLY = 'QUARTERLY',
  MONTHLY = 'MONTHLY',
  PROJECT = 'PROJECT',
  DEPARTMENT = 'DEPARTMENT',
  INDIVIDUAL = 'INDIVIDUAL',
  UNLIMITED = 'UNLIMITED',
  FLEXIBLE = 'FLEXIBLE',
  RESTRICTED = 'RESTRICTED',
  POOLED = 'POOLED',
}

export enum CreditType {
  TRAINING = 'TRAINING',
  TUITION = 'TUITION',
  CERTIFICATION = 'CERTIFICATION',
  CONFERENCE = 'CONFERENCE',
  BOOK = 'BOOK',
  SOFTWARE = 'SOFTWARE',
  TRAVEL = 'TRAVEL',
  MENTORSHIP = 'MENTORSHIP',
  COACHING = 'COACHING',
  LEADERSHIP = 'LEADERSHIP',
}

export enum ComplianceType {
  REGULATORY = 'REGULATORY',
  INDUSTRY = 'INDUSTRY',
  INTERNAL = 'INTERNAL',
  LEGAL = 'LEGAL',
  SAFETY = 'SAFETY',
  ETHICS = 'ETHICS',
  DATA_PRIVACY = 'DATA_PRIVACY',
  ANTI_MONEY_LAUNDERING = 'ANTI_MONEY_LAUNDERING',
  ANTI_HARASSMENT = 'ANTI_HARASSMENT',
  CODE_OF_CONDUCT = 'CODE_OF_CONDUCT',
}

export enum TrackingStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  EXEMPT = 'EXEMPT',
  OVERDUE = 'OVERDUE',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  WAIVED = 'WAIVED',
  REVOKED = 'REVOKED',
  EXTENDED = 'EXTENDED',
}

export enum PlanningType {
  STRATEGIC = 'STRATEGIC',
  TACTICAL = 'TACTICAL',
  OPERATIONAL = 'OPERATIONAL',
  EMERGENCY = 'EMERGENCY',
  GROWTH = 'GROWTH',
  SUCCESSION = 'SUCCESSION',
  DIVERSITY = 'DIVERSITY',
  TRANSITION = 'TRANSITION',
  SCALING = 'SCALING',
  RESTRUCTURING = 'RESTRUCTURING',
}

export enum MatrixStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  UPDATED = 'UPDATED',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  FROZEN = 'FROZEN',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

export enum MobilityType {
  INTERNAL_TRANSFER = 'INTERNAL_TRANSFER',
  PROMOTION = 'PROMOTION',
  DEMOTION = 'DEMOTION',
  LATERAL = 'LATERAL',
  SECONDEMENT = 'SECONDEMENT',
  ROTATION = 'ROTATION',
  ASSIGNMENT = 'ASSIGNMENT',
  DETACHMENT = 'DETACHMENT',
  EXPATRIATE = 'EXPATRIATE',
  INTERCOMPANY = 'INTERCOMPANY',
}

export enum SuccessionStatus {
  POTENTIAL = 'POTENTIAL',
  READY_NOW = 'READY_NOW',
  READY_1_YEAR = 'READY_1_YEAR',
  READY_2_YEARS = 'READY_2_YEARS',
  NOT_READY = 'NOT_READY',
  EMERGING = 'EMERGING',
  HIGH_POTENTIAL = 'HIGH_POTENTIAL',
  SELECTED = 'SELECTED',
  DECLINED = 'DECLINED',
  TRANSITIONING = 'TRANSITIONING',
}

export enum PerformanceRating {
  EXCEPTIONAL = 'EXCEPTIONAL',
  EXCEEDS_EXPECTATIONS = 'EXCEEDS_EXPECTATIONS',
  MEETS_EXPECTATIONS = 'MEETS_EXPECTATIONS',
  NEEDS_IMPROVEMENT = 'NEEDS_IMPROVEMENT',
  UNSATISFACTORY = 'UNSATISFACTORY',
  NOT_RATED = 'NOT_RATED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  SELF_ASSESSED = 'SELF_ASSESSED',
  PEER_REVIEWED = 'PEER_REVIEWED',
  MANAGER_REVIEWED = 'MANAGER_REVIEWED',
}

export enum ROIType {
  FINANCIAL = 'FINANCIAL',
  PRODUCTIVITY = 'PRODUCTIVITY',
  QUALITY = 'QUALITY',
  ENGAGEMENT = 'ENGAGEMENT',
  RETENTION = 'RETENTION',
  INNOVATION = 'INNOVATION',
  COMPLIANCE = 'COMPLIANCE',
  SAFETY = 'SAFETY',
  CUSTOMER_SATISFACTION = 'CUSTOMER_SATISFACTION',
  TIME_TO_COMPETENCY = 'TIME_TO_COMPETENCY',
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  VERY_LOW = 'VERY_LOW',
  VERY_HIGH = 'VERY_HIGH',
  UNKNOWN = 'UNKNOWN',
  ACCEPTABLE = 'ACCEPTABLE',
  UNACCEPTABLE = 'UNACCEPTABLE',
  MITIGATED = 'MITIGATED',
}

export enum TrainingCategory {
  TECHNICAL = 'TECHNICAL',
  SOFT_SKILLS = 'SOFT_SKILLS',
  LEADERSHIP = 'LEADERSHIP',
  COMPLIANCE = 'COMPLIANCE',
  SAFETY = 'SAFETY',
  ONBOARDING = 'ONBOARDING',
  PROFESSIONAL_DEVELOPMENT = 'PROFESSIONAL_DEVELOPMENT',
  DIVERSITY_EQUITY_INCLUSION = 'DIVERSITY_EQUITY_INCLUSION',
  CHANGE_MANAGEMENT = 'CHANGE_MANAGEMENT',
  DIGITAL_TRANSFORMATION = 'DIGITAL_TRANSFORMATION',
}

export enum SkillProficiency {
  NOVICE = 'NOVICE',
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
  MASTERY = 'MASTERY',
  NOT_ASSESSED = 'NOT_ASSESSED',
  DESIRED = 'DESIRED',
  REQUIRED = 'REQUIRED',
  PREFERRED = 'PREFERRED',
}

export enum CertificationStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED',
  RENEWAL_DUE = 'RENEWAL_DUE',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
  WAIVED = 'WAIVED',
  EXEMPT = 'EXEMPT',
}

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  WAITLISTED = 'WAITLISTED',
  WITHDRAWN = 'WITHDRAWN',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_ENROLLED = 'NOT_ENROLLED',
  REINSTATED = 'REINSTATED',
  DEFERRED = 'DEFERRED',
  CANCELLED = 'CANCELLED',
}

export enum CourseFormat {
  ONLINE = 'ONLINE',
  ONSITE = 'ONSITE',
  BLENDED = 'BLENDED',
  SELF_PACED = 'SELF_PACED',
  INSTRUCTOR_LED = 'INSTRUCTOR_LED',
  VIRTUAL_CLASSROOM = 'VIRTUAL_CLASSROOM',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  WEBINAR = 'WEBINAR',
  LAB = 'LAB',
}

export enum AssessmentType {
  QUIZ = 'QUIZ',
  EXAM = 'EXAM',
  PROJECT = 'PROJECT',
  PRESENTATION = 'PRESENTATION',
  PEER_REVIEW = 'PEER_REVIEW',
  SELF_ASSESSMENT = 'SELF_ASSESSMENT',
  PRACTICAL = 'PRACTICAL',
  CASE_STUDY = 'CASE_STUDY',
  SIMULATION = 'SIMULATION',
  PORTFOLIO = 'PORTFOLIO',
}

export enum LearningGoalType {
  KNOWLEDGE = 'KNOWLEDGE',
  SKILL = 'SKILL',
  COMPETENCY = 'COMPETENCY',
  BEHAVIOR = 'BEHAVIOR',
  RESULT = 'RESULT',
  PERFORMANCE = 'PERFORMANCE',
  DEVELOPMENT = 'DEVELOPMENT',
  CAREER = 'CAREER',
  PERSONAL = 'PERSONAL',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
}

export enum SkillCategory {
  TECHNICAL = 'TECHNICAL',
  LEADERSHIP = 'LEADERSHIP',
  COMMUNICATION = 'COMMUNICATION',
  ANALYTICAL = 'ANALYTICAL',
  CREATIVE = 'CREATIVE',
  INTERPERSONAL = 'INTERPERSONAL',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  PROBLEM_SOLVING = 'PROBLEM_SOLVING',
  DIGITAL = 'DIGITAL',
  DOMAIN_SPECIFIC = 'DOMAIN_SPECIFIC',
}

export enum ProductivityMetric {
  OUTPUT_PER_HOUR = 'OUTPUT_PER_HOUR',
  TASK_COMPLETION_RATE = 'TASK_COMPLETION_RATE',
  ERROR_RATE = 'ERROR_RATE',
  RESPONSE_TIME = 'RESPONSE_TIME',
  CUSTOMER_SATISFACTION = 'CUSTOMER_SATISFACTION',
  REVENUE_PER_EMPLOYEE = 'REVENUE_PER_EMPLOYEE',
  PROJECT_COMPLETION_RATE = 'PROJECT_COMPLETION_RATE',
  QUALITY_SCORE = 'QUALITY_SCORE',
  EFFICIENCY_RATIO = 'EFFICIENCY_RATIO',
  UTILIZATION_RATE = 'UTILIZATION_RATE',
}

export enum WorkforceSegment {
  EXECUTIVE = 'EXECUTIVE',
  MANAGER = 'MANAGER',
  PROFESSIONAL = 'PROFESSIONAL',
  TECHNICAL = 'TECHNICAL',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  OPERATIONS = 'OPERATIONS',
  SALES = 'SALES',
  MARKETING = 'MARKETING',
  FINANCE = 'FINANCE',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
}

export enum TalentTier {
  TOP_PERFORMER = 'TOP_PERFORMER',
  HIGH_PERFORMER = 'HIGH_PERFORMER',
  CORE_PERFORMER = 'CORE_PERFORMER',
  DEVELOPING = 'DEVELOPING',
  UNDERPERFORMER = 'UNDERPERFORMER',
  HIRED_HAND = 'HIRED_HAND',
  FUTURE_LEADER = 'FUTURE_LEADER',
  SUBJECT_MATTER_EXPERT = 'SUBJECT_MATTER_EXPERT',
  CRITICAL_RETENTION = 'CRITICAL_RETENTION',
  FLIGHT_RISK = 'FLIGHT_RISK',
}

export enum BudgetStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  EXHAUSTED = 'EXHAUSTED',
  EXCEEDED = 'EXCEEDED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  UPDATED = 'UPDATED',
}

export enum InstructorType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  CONTRACT = 'CONTRACT',
  GUEST = 'GUEST',
  PEER = 'PEER',
  MENTOR = 'MENTOR',
  COACH = 'COACH',
  SME = 'SME',
  VIRTUAL = 'VIRTUAL',
  HYBRID = 'HYBRID',
}

export enum CompletionCriteria {
  GRADE_BASED = 'GRADE_BASED',
  ATTENDANCE_BASED = 'ATTENDANCE_BASED',
  PROJECT_BASED = 'PROJECT_BASED',
  TIME_BASED = 'TIME_BASED',
  COMPETENCY_BASED = 'COMPETENCY_BASED',
  COMBINATION = 'COMBINATION',
  PEER_APPROVAL = 'PEER_APPROVAL',
  MANAGER_APPROVAL = 'MANAGER_APPROVAL',
  SELF_DECLARATION = 'SELF_DECLARATION',
  EXTERNAL_VERIFICATION = 'EXTERNAL_VERIFICATION',
}

export enum NotificationType {
  ENROLLMENT_CONFIRMATION = 'ENROLLMENT_CONFIRMATION',
  COURSE_REMINDER = 'COURSE_REMINDER',
  DEADLINE_WARNING = 'DEADLINE_WARNING',
  COMPLETION_CONGRATULATIONS = 'COMPLETION_CONGRATULATIONS',
  CERTIFICATION_EXPIRY = 'CERTIFICATION_EXPIRY',
  BUDGET_ALERT = 'BUDGET_ALERT',
  COMPLIANCE_OVERDUE = 'COMPLIANCE_OVERDUE',
  ASSIGNMENT_NEW = 'ASSIGNMENT_NEW',
  FEEDBACK_RECEIVED = 'FEEDBACK_RECEIVED',
  PROGRESS_UPDATE = 'PROGRESS_UPDATE',
}

export enum ReportFrequency {
  REAL_TIME = 'REAL_TIME',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL',
  ON_DEMAND = 'ON_DEMAND',
  EVENT_DRIVEN = 'EVENT_DRIVEN',
}

export enum DepartmentCategory {
  EXECUTIVE = 'EXECUTIVE',
  OPERATIONS = 'OPERATIONS',
  FINANCE = 'FINANCE',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  MARKETING = 'MARKETING',
  SALES = 'SALES',
  IT = 'IT',
  LEGAL = 'LEGAL',
  RESEARCH = 'RESEARCH',
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
}

export enum EngagementLevel {
  HIGHLY_ENGAGED = 'HIGHLY_ENGAGED',
  ENGAGED = 'ENGAGED',
  NEUTRAL = 'NEUTRAL',
  DISENGAGED = 'DISENGAGED',
  HIGHLY_DISENGAGED = 'HIGHLY_DISENGAGED',
  PASSIVE = 'PASSIVE',
  ACTIVELY_DISENGAGED = 'ACTIVELY_DISENGAGED',
  PROMOTER = 'PROMOTER',
  CRITIC = 'CRITIC',
  INDIFFERENT = 'INDIFFERENT',
}

export enum LearningPathType {
  ROLE_BASED = 'ROLE_BASED',
  SKILL_BASED = 'SKILL_BASED',
  CAREER_BASED = 'CAREER_BASED',
  COMPLIANCE_BASED = 'COMPLIANCE_BASED',
  ONBOARDING = 'ONBOARDING',
  LEADERSHIP = 'LEADERSHIP',
  TECHNICAL = 'TECHNICAL',
  CUSTOM = 'CUSTOM',
  RECOMMENDED = 'RECOMMENDED',
  MANDATORY = 'MANDATORY',
}

export enum WorkforceChangeType {
  HIRING = 'HIRING',
  TERMINATION = 'TERMINATION',
  PROMOTION = 'PROMOTION',
  DEMOTION = 'DEMOTION',
  TRANSFER = 'TRANSFER',
  RETIREMENT = 'RETIREMENT',
  LEAVE = 'LEAVE',
  RETURN = 'RETURN',
  RESTRUCTURING = 'RESTRUCTURING',
  LAYOFF = 'LAYOFF',
}

export enum SuccessionReadinessLevel {
  IMMEDIATELY_READY = 'IMMEDIATELY_READY',
  READY_WITHIN_12_MONTHS = 'READY_WITHIN_12_MONTHS',
  READY_WITHIN_24_MONTHS = 'READY_WITHIN_24_MONTHS',
  READY_WITHIN_36_MONTHS = 'READY_WITHIN_36_MONTHS',
  NOT_READY = 'NOT_READY',
  DEVELOPMENT_NEEDED = 'DEVELOPMENT_NEEDED',
  HIGH_POTENTIAL = 'HIGH_POTENTIAL',
  EMERGING_TALENT = 'EMERGING_TALENT',
  CRITICAL_ROLE_HOLDER = 'CRITICAL_ROLE_HOLDER',
  FLIGHT_RISK = 'FLIGHT_RISK',
}

export enum MobilityRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
  RETURNED = 'RETURNED',
  EXTENDED = 'EXTENDED',
  TERMINATED = 'TERMINATED',
}

export enum SkillGapPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  DEFERRED = 'DEFERRED',
  IMMEDIATE = 'IMMEDIATE',
  PLANNED = 'PLANNED',
  OPTIONAL = 'OPTIONAL',
  REGULATORY = 'REGULATORY',
  STRATEGIC = 'STRATEGIC',
}

export enum TrainingDeliveryMode {
  IN_PERSON = 'IN_PERSON',
  VIRTUAL_LIVE = 'VIRTUAL_LIVE',
  SELF_PACED_ONLINE = 'SELF_PACED_ONLINE',
  BLENDED = 'BLENDED',
  OJT = 'OJT',
  COACHING = 'COACHING',
  MENTORING = 'MENTORING',
  SIMULATION = 'SIMULATION',
  GAMIFIED = 'GAMIFIED',
  MOBILE = 'MOBILE',
}

export enum CorporateLearningStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
}

export enum WorkforceRiskCategory {
  RETENTION = 'RETENTION',
  SKILL_SHORTAGE = 'SKILL_SHORTAGE',
  BURNOUT = 'BURNOUT',
  COMPLIANCE = 'COMPLIANCE',
  SUCCESSION = 'SUCCESSION',
  DIVERSITY = 'DIVERSITY',
  ENGAGEMENT = 'ENGAGEMENT',
  PERFORMANCE = 'PERFORMANCE',
  COST = 'COST',
  REGULATORY = 'REGULATORY',
}

export enum BudgetAlertThreshold {
  FIFTY_PERCENT = 'FIFTY_PERCENT',
  SEVENTY_FIVE_PERCENT = 'SEVENTY_FIVE_PERCENT',
  NINETY_PERCENT = 'NINETY_PERCENT',
  ONE_HUNDRED_PERCENT = 'ONE_HUNDRED_PERCENT',
  ONE_HUNDRED_TEN_PERCENT = 'ONE_HUNDRED_TEN_PERCENT',
  ONE_HUNDRED_TWENTY_FIVE_PERCENT = 'ONE_HUNDRED_TWENTY_FIVE_PERCENT',
  ONE_HUNDRED_FIFTY_PERCENT = 'ONE_HUNDRED_FIFTY_PERCENT',
  TWO_HUNDRED_PERCENT = 'TWO_HUNDRED_PERCENT',
  CUSTOM = 'CUSTOM',
  NONE = 'NONE',
}

export enum CorporateAcademyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  LAUNCHING = 'LAUNCHING',
  MATURE = 'MATURE',
  DECLINING = 'DECLINING',
  RESTRUCTURING = 'RESTRUCTURING',
  MERGING = 'MERGING',
  CLOSING = 'CLOSING',
  REBRANDING = 'REBRANDING',
}

export enum LeadershipLevel {
  C_SUITE = 'C_SUITE',
  VP = 'VP',
  DIRECTOR = 'DIRECTOR',
  SENIOR_MANAGER = 'SENIOR_MANAGER',
  MANAGER = 'MANAGER',
  TEAM_LEAD = 'TEAM_LEAD',
  SUPERVISOR = 'SUPERVISOR',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  PROGRAM_MANAGER = 'PROGRAM_MANAGER',
  SECTION_HEAD = 'SECTION_HEAD',
}

export enum DevelopmentPlanStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  ARCHIVED = 'ARCHIVED',
  UPDATED = 'UPDATED',
  CLOSED = 'CLOSED',
}

export enum CoachingType {
  EXECUTIVE = 'EXECUTIVE',
  CAREER = 'CAREER',
  PERFORMANCE = 'PERFORMANCE',
  TRANSITION = 'TRANSITION',
  SKILL_DEVELOPMENT = 'SKILL_DEVELOPMENT',
  LEADERSHIP = 'LEADERSHIP',
  WELLNESS = 'WELLNESS',
  BUSINESS = 'BUSINESS',
  TEAM = 'TEAM',
  GROUP = 'GROUP',
}

export enum MentorshipProgramStatus {
  RECRUITING = 'RECRUITING',
  MATCHING = 'MATCHING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  EVALUATING = 'EVALUATING',
  PILOT = 'PILOT',
  EXPANDING = 'EXPANDING',
  ARCHIVED = 'ARCHIVED',
}

export enum LearningAnalyticsType {
  ENGAGEMENT = 'ENGAGEMENT',
  COMPLETION = 'COMPLETION',
  PERFORMANCE = 'PERFORMANCE',
  SATISFACTION = 'SATISFACTION',
  IMPACT = 'IMPACT',
  COST = 'COST',
  EFFICIENCY = 'EFFICIENCY',
  EFFECTIVENESS = 'EFFECTIVENESS',
  ROI = 'ROI',
  BENCHMARK = 'BENCHMARK',
}

export enum CorporateAcademyMode {
  CENTRALIZED = 'CENTRALIZED',
  DECENTRALIZED = 'DECENTRALIZED',
  FEDERATED = 'FEDERATED',
  HUB_AND_SPOKE = 'HUB_AND_SPOKE',
  NETWORK = 'NETWORK',
  VIRTUAL_FIRST = 'VIRTUAL_FIRST',
  HYBRID = 'HYBRID',
  OUTSOURCED = 'OUTSOURCED',
  PARTNERSHIP = 'PARTNERSHIP',
  OPEN = 'OPEN',
}

export enum SkillAssessmentMethod {
  SELF_ASSESSMENT = 'SELF_ASSESSMENT',
  MANAGER_ASSESSMENT = 'MANAGER_ASSESSMENT',
  PEER_ASSESSMENT = 'PEER_ASSESSMENT',
  360_FEEDBACK = '360_FEEDBACK',
  EXAM = 'EXAM',
  PRACTICAL_DEMO = 'PRACTICAL_DEMO',
  PORTFOLIO_REVIEW = 'PORTFOLIO_REVIEW',
  SIMULATION = 'SIMULATION',
  INTERVIEW = 'INTERVIEW',
  OBSERVATION = 'OBSERVATION',
}

export enum WorkforcePlanningHorizon {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM',
  IMMEDIATE = 'IMMEDIATE',
  TACTICAL = 'TACTICAL',
  STRATEGIC = 'STRATEGIC',
  OPERATIONAL = 'OPERATIONAL',
  CONTINGENCY = 'CONTINGENCY',
  SCENARIO_BASED = 'SCENARIO_BASED',
  DYNAMIC = 'DYNAMIC',
}

export enum TalentPoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OVERFLOW = 'OVERFLOW',
  DRAINED = 'DRAINED',
  NURTURED = 'NURTURED',
  ENGAGED = 'ENGAGED',
  DORMANT = 'DORMANT',
  PRIORITIZED = 'PRIORITIZED',
  SEGMENTED = 'SEGMENTED',
  ARCHIVED = 'ARCHIVED',
}

export enum CorporateEngagementSource {
  LMS = 'LMS',
  HRIS = 'HRIS',
  PERFORMANCE = 'PERFORMANCE',
  SURVEY = 'SURVEY',
  FEEDBACK = 'FEEDBACK',
  COLLABORATION = 'COLLABORATION',
  PROJECT = 'PROJECT',
  MEETING = 'MEETING',
  TRAINING = 'TRAINING',
  EXTERNAL = 'EXTERNAL',
}

export enum WorkforceSkillSource {
  SELF_REPORTED = 'SELF_REPORTED',
  MANAGER_ASSESSED = 'MANAGER_ASSESSED',
  SYSTEM_DETECTED = 'SYSTEM_DETECTED',
  CERTIFICATION = 'CERTIFICATION',
  TRAINING_COMPLETION = 'TRAINING_COMPLETION',
  PROJECT_OUTCOME = 'PROJECT_OUTCOME',
  PEER_REVIEW = 'PEER_REVIEW',
  EXTERNAL_ASSESSMENT = 'EXTERNAL_ASSESSMENT',
  AI_INFERRED = 'AI_INFERRED',
  BEHAVIORAL_DATA = 'BEHAVIORAL_DATA',
}

export enum LearningCreditUsage {
  TUITION_REIMBURSEMENT = 'TUITION_REIMBURSEMENT',
  CERTIFICATION = 'CERTIFICATION',
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  BOOK = 'BOOK',
  SOFTWARE = 'SOFTWARE',
  TRAVEL = 'TRAVEL',
  MEMBERSHIP = 'MEMBERSHIP',
  COACHING = 'COACHING',
  OTHER = 'OTHER',
}

export enum ComplianceTrainingPriority {
  MANDATORY = 'MANDATORY',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  RECOMMENDED = 'RECOMMENDED',
  OPTIONAL = 'OPTIONAL',
  CRITICAL = 'CRITICAL',
  REGULATORY = 'REGULATORY',
  AUDIT = 'AUDIT',
  CONTINUOUS = 'CONTINUOUS',
}

export enum CorporateInterface {
  id: string;
  school_id: string;
  name: string;
  description: string;
  academy_type: AcademyType;
  mode: CorporateAcademyMode;
  status: CorporateAcademyStatus;
  founded_date: string;
  headquarters: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  logo_url: string;
  parent_organization: string;
  departments: string[];
  programs: string[];
  instructors: string[];
  courses_count: number;
  enrollments_count: number;
  completion_rate: number;
  satisfaction_score: number;
  budget: number;
  spent: number;
  created_at: string;
  updated_at: string;
}

export interface CorporateAcademy {
  id: string;
  school_id: string;
  name: string;
  description: string;
  academy_type: AcademyType;
  mode: CorporateAcademyMode;
  status: CorporateAcademyStatus;
  founded_date: string;
  headquarters: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  logo_url: string;
  parent_organization: string;
  departments: string[];
  programs: string[];
  instructors: string[];
  courses_count: number;
  enrollments_count: number;
  completion_rate: number;
  satisfaction_score: number;
  budget: number;
  spent: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeLearning {
  id: string;
  school_id: string;
  employee_id: string;
  course_id: string;
  enrollment_status: EnrollmentStatus;
  learning_status: LearningStatus;
  start_date: string;
  end_date: string;
  completion_date: string;
  progress_percentage: number;
  score: number;
  grade: string;
  hours_spent: number;
  instructor_id: string;
  feedback: string;
  certificate_url: string;
  credits_earned: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeSkills {
  id: string;
  school_id: string;
  employee_id: string;
  skill_name: string;
  skill_category: SkillCategory;
  proficiency_level: SkillProficiency;
  assessment_method: SkillAssessmentMethod;
  assessed_date: string;
  assessed_by: string;
  confidence_score: number;
  years_experience: number;
  endorsements: number;
  certifications: string[];
  last_used_date: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  plan_type: PlanningType;
  department_id: string;
  target_audience: string;
  objectives: string[];
  courses: string[];
  duration_months: number;
  start_date: string;
  end_date: string;
  budget: number;
  status: MatrixStatus;
  approved_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingBudget {
  id: string;
  school_id: string;
  name: string;
  description: string;
  budget_type: BudgetType;
  fiscal_year: number;
  department_id: string;
  total_amount: number;
  spent_amount: number;
  committed_amount: number;
  available_amount: number;
  currency: string;
  alert_threshold: BudgetAlertThreshold;
  status: BudgetStatus;
  approved_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

export interface LearningCredit {
  id: string;
  school_id: string;
  employee_id: string;
  credit_type: CreditType;
  total_credits: number;
  used_credits: number;
  available_credits: number;
  expiration_date: string;
  fiscal_year: number;
  usage_history: LearningCreditUsage[];
  created_at: string;
  updated_at: string;
}

export interface ComplianceTraining {
  id: string;
  school_id: string;
  name: string;
  description: string;
  compliance_type: ComplianceType;
  course_id: string;
  required_for: string[];
  frequency_months: number;
  due_date: string;
  grace_period_days: number;
  auto_enroll: boolean;
  priority: ComplianceTrainingPriority;
  regulatory_body: string;
  penalty_for_non_compliance: string;
  created_at: string;
  updated_at: string;
}

export interface MandatoryTraining {
  id: string;
  school_id: string;
  name: string;
  description: string;
  compliance_type: ComplianceType;
  course_id: string;
  required_for: WorkforceSegment[];
  deadline: string;
  tracking_status: TrackingStatus;
  completion_rate: number;
  overdue_count: number;
  warning_days: number;
  escalation_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface CertificationTracking {
  id: string;
  school_id: string;
  employee_id: string;
  certification_name: string;
  issuing_body: string;
  certification_number: string;
  issue_date: string;
  expiration_date: string;
  status: CertificationStatus;
  renewal_required: boolean;
  renewal_period_months: number;
  cost: number;
  verification_url: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforcePlanning {
  id: string;
  school_id: string;
  name: string;
  description: string;
  planning_type: PlanningType;
  horizon: WorkforcePlanningHorizon;
  department_id: string;
  current_headcount: number;
  projected_headcount: number;
  gap: number;
  hiring_plan: number;
  attrition_plan: number;
  budget: number;
  status: MatrixStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSkillsMatrix {
  id: string;
  school_id: string;
  name: string;
  description: string;
  department_id: string;
  skills: string[];
  employees: string[];
  matrix_data: Record<string, Record<string, SkillProficiency>>;
  status: MatrixStatus;
  effective_date: string;
  review_date: string;
  created_at: string;
  updated_at: string;
}

export interface InternalMobility {
  id: string;
  school_id: string;
  employee_id: string;
  mobility_type: MobilityType;
  from_department: string;
  to_department: string;
  from_role: string;
  to_role: string;
  request_date: string;
  effective_date: string;
  status: MobilityRequestStatus;
  approved_by: string;
  reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TalentMarketplace {
  id: string;
  school_id: string;
  name: string;
  description: string;
  listing_type: string;
  status: MatrixStatus;
  open_positions: number;
  total_applicants: number;
  matches_made: number;
  avg_time_to_fill: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface SuccessionPlanning {
  id: string;
  school_id: string;
  position_id: string;
  position_title: string;
  department_id: string;
  current_holder_id: string;
  potential_successors: SuccessionCandidate[];
  readiness_level: SuccessionReadinessLevel;
  risk_of_loss: RiskLevel;
  impact_of_loss: RiskLevel;
  development_actions: string[];
  timeline_months: number;
  status: SuccessionStatus;
  created_at: string;
  updated_at: string;
}

export interface SuccessionCandidate {
  employee_id: string;
  name: string;
  current_role: string;
  readiness_level: SuccessionReadinessLevel;
  potential_score: number;
  performance_rating: PerformanceRating;
  development_needs: string[];
  estimated_readiness_date: string;
}

export interface LeadershipDevelopment {
  id: string;
  school_id: string;
  employee_id: string;
  leadership_level: LeadershipLevel;
  program_name: string;
  program_type: string;
  start_date: string;
  end_date: string;
  mentor_id: string;
  coach_id: string;
  goals: string[];
  competencies_developed: string[];
  assessment_results: Record<string, number>;
  status: DevelopmentPlanStatus;
  created_at: string;
  updated_at: string;
}

export interface EmployeePerformance {
  id: string;
  school_id: string;
  employee_id: string;
  review_period: string;
  rating: PerformanceRating;
  goals_met: number;
  goals_total: number;
  performance_score: number;
  strengths: string[];
  improvement_areas: string[];
  manager_comments: string;
  self_assessment: string;
  peer_feedback: string;
  development_plan_id: string;
  compensation_change: number;
  promotion_eligible: boolean;
  created_at: string;
  updated_at: string;
}

export interface LearningROI {
  id: string;
  school_id: string;
  program_id: string;
  program_name: string;
  roi_type: ROIType;
  investment_amount: number;
  return_amount: number;
  roi_percentage: number;
  measurement_period: string;
  methodology: string;
  kpis: Record<string, number>;
  baseline_value: number;
  current_value: number;
  target_value: number;
  created_at: string;
  updated_at: string;
}

export interface WorkforceDashboard {
  id: string;
  school_id: string;
  name: string;
  description: string;
  department_id: string;
  workforce_skills_summary: WorkforceSkillsSummary;
  skill_gaps: SkillGap[];
  training_costs: TrainingCostSummary;
  certification_rate: number;
  employee_mobility: MobilitySummary;
  productivity_indicators: ProductivityIndicator[];
  workforce_risks: WorkforceRisk[];
  generated_at: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSkillsSummary {
  total_employees: number;
  total_skills: number;
  avg_proficiency: number;
  skills_at_expert_level: number;
  skills_at_advanced_level: number;
  skills_at_intermediate_level: number;
  skills_at_beginner_level: number;
  top_skills: SkillItem[];
  emerging_skills: SkillItem[];
}

export interface SkillItem {
  skill_name: string;
  category: SkillCategory;
  proficiency_level: SkillProficiency;
  employee_count: number;
  growth_rate: number;
}

export interface SkillGap {
  skill_name: string;
  category: SkillCategory;
  required_level: SkillProficiency;
  current_level: SkillProficiency;
  gap_score: number;
  employees_affected: number;
  priority: SkillGapPriority;
  recommended_actions: string[];
}

export interface TrainingCostSummary {
  total_budget: number;
  total_spent: number;
  budget_utilization: number;
  cost_per_employee: number;
  cost_per_course: number;
  cost_per_completion: number;
  cost_by_department: DepartmentCost[];
  cost_by_category: CategoryCost[];
}

export interface DepartmentCost {
  department_id: string;
  department_name: string;
  budget: number;
  spent: number;
  utilization: number;
}

export interface CategoryCost {
  category: TrainingCategory;
  budget: number;
  spent: number;
  utilization: number;
  headcount: number;
}

export interface MobilitySummary {
  total_requests: number;
  approved: number;
  pending: number;
  rejected: number;
  avg_processing_time: number;
  mobility_by_type: MobilityTypeCount[];
  top_departments: DepartmentMobility[];
}

export interface MobilityTypeCount {
  mobility_type: MobilityType;
  count: number;
  percentage: number;
}

export interface DepartmentMobility {
  department_id: string;
  department_name: string;
  transfers_in: number;
  transfers_out: number;
  net_movement: number;
}

export interface ProductivityIndicator {
  metric: ProductivityMetric;
  current_value: number;
  target_value: number;
  benchmark_value: number;
  trend: string;
  change_percentage: number;
  status: string;
}

export interface WorkforceRisk {
  risk_id: string;
  category: WorkforceRiskCategory;
  description: string;
  probability: number;
  impact: number;
  risk_score: number;
  level: RiskLevel;
  mitigation_actions: string[];
  owner: string;
  status: string;
}

export interface CorporateConfig {
  id: string;
  school_id: string;
  academy_name: string;
  academy_type: AcademyType;
  mode: CorporateAcademyMode;
  fiscal_year_start: number;
  currency: string;
  timezone: string;
  default_budget_alert: BudgetAlertThreshold;
  auto_enroll_compliance: boolean;
  require_manager_approval: boolean;
  allow_self_enrollment: boolean;
  max_courses_per_employee: number;
  max_credits_per_employee: number;
  certification_renewal_reminder_days: number[];
  notification_channels: string[];
  integration_settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CorporateMetrics {
  id: string;
  school_id: string;
  total_employees: number;
  active_learners: number;
  courses_completed: number;
  avg_completion_rate: number;
  avg_satisfaction_score: number;
  total_training_hours: number;
  total_training_cost: number;
  cost_per_employee: number;
  compliance_rate: number;
  certification_rate: number;
  skill_coverage: number;
  mobility_rate: number;
  retention_rate: number;
  engagement_score: number;
  productivity_index: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface SkillGapAnalysis {
  id: string;
  school_id: string;
  department_id: string;
  analysis_date: string;
  gaps: SkillGap[];
  overall_gap_score: number;
  critical_gaps: number;
  high_priority_gaps: number;
  recommended_training: RecommendedTraining[];
  estimated_closing_time: number;
  investment_required: number;
  created_at: string;
  updated_at: string;
}

export interface RecommendedTraining {
  skill_name: string;
  course_id: string;
  course_name: string;
  estimated_duration: number;
  estimated_cost: number;
  priority: SkillGapPriority;
  expected_impact: number;
}

export interface EmployeeDevelopmentPlan {
  id: string;
  school_id: string;
  employee_id: string;
  manager_id: string;
  plan_name: string;
  description: string;
  goals: DevelopmentGoal[];
  activities: DevelopmentActivity[];
  mentor_id: string;
  coach_id: string;
  review_frequency: ReportFrequency;
  start_date: string;
  end_date: string;
  status: DevelopmentPlanStatus;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface DevelopmentGoal {
  goal_id: string;
  description: string;
  skill_category: SkillCategory;
  target_proficiency: SkillProficiency;
  current_proficiency: SkillProficiency;
  deadline: string;
  status: string;
  measurable_outcomes: string[];
}

export interface DevelopmentActivity {
  activity_id: string;
  activity_type: string;
  description: string;
  course_id: string;
  estimated_hours: number;
  completion_date: string;
  status: string;
  result: string;
}

export interface TalentPoolConfiguration {
  id: string;
  school_id: string;
  pool_name: string;
  description: string;
  pool_type: string;
  auto_add_criteria: string[];
  manual_add_enabled: boolean;
  max_size: number;
  current_size: number;
  nurture_campaigns: string[];
  status: TalentPoolStatus;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningPath {
  id: string;
  school_id: string;
  name: string;
  description: string;
  path_type: LearningPathType;
  target_role: string;
  target_department: string;
  courses: string[];
  estimated_duration: number;
  prerequisites: string[];
  milestones: LearningMilestone[];
  enrollment_count: number;
  completion_count: number;
  avg_rating: number;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
}

export interface LearningMilestone {
  milestone_id: string;
  name: string;
  description: string;
  order_index: number;
  required_courses: string[];
  assessment_required: boolean;
  estimated_completion_date: string;
}

export interface CorporateCourse {
  id: string;
  school_id: string;
  name: string;
  description: string;
  category: TrainingCategory;
  format: CourseFormat;
  difficulty_level: SkillProficiency;
  duration_hours: number;
  max_enrollment: number;
  current_enrollment: number;
  instructor_id: string;
  instructor_type: InstructorType;
  price: number;
  objectives: string[];
  prerequisites: string[];
  materials: CourseMaterial[];
  assessment_type: AssessmentType;
  completion_criteria: CompletionCriteria;
  rating: number;
  review_count: number;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
}

export interface CourseMaterial {
  material_id: string;
  name: string;
  type: string;
  url: string;
  size_bytes: number;
  required: boolean;
}

export interface CorporateInstructor {
  id: string;
  school_id: string;
  employee_id: string;
  instructor_type: InstructorType;
  expertise_areas: string[];
  certifications: string[];
  experience_years: number;
  courses_taught: number;
  avg_rating: number;
  total_students: number;
  availability: string[];
  hourly_rate: number;
  bio: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetAllocation {
  id: string;
  school_id: string;
  training_budget_id: string;
  department_id: string;
  allocated_amount: number;
  spent_amount: number;
  committed_amount: number;
  utilization_rate: number;
  fiscal_year: number;
  quarter: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceComplianceRecord {
  id: string;
  school_id: string;
  employee_id: string;
  compliance_training_id: string;
  status: TrackingStatus;
  due_date: string;
  completed_date: string;
  score: number;
  attempts: number;
  certificate_url: string;
  reminder_sent: boolean;
  escalation_level: number;
  created_at: string;
  updated_at: string;
}

export interface WorkforceTransition {
  id: string;
  school_id: string;
  employee_id: string;
  change_type: WorkforceChangeType;
  from_position: string;
  to_position: string;
  from_department: string;
  to_department: string;
  effective_date: string;
  reason: string;
  impact_assessment: string;
  transition_plan: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LeadershipProgram {
  id: string;
  school_id: string;
  name: string;
  description: string;
  target_level: LeadershipLevel;
  duration_months: number;
  modules: LeadershipModule[];
  mentors_required: boolean;
  coaches_required: boolean;
  assessment_criteria: string[];
  graduation_criteria: string[];
  participants_count: number;
  completion_rate: number;
  satisfaction_score: number;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
}

export interface LeadershipModule {
  module_id: string;
  name: string;
  description: string;
  order_index: number;
  duration_weeks: number;
  topics: string[];
  assessments: string[];
  resources: string[];
}

export interface CoachingEngagement {
  id: string;
  school_id: string;
  coach_id: string;
  coachee_id: string;
  coaching_type: CoachingType;
  start_date: string;
  end_date: string;
  sessions_total: number;
  sessions_completed: number;
  goals: string[];
  progress_notes: string[];
  outcome_assessment: string;
  satisfaction_score: number;
  status: DevelopmentPlanStatus;
  created_at: string;
  updated_at: string;
}

export interface MentorshipMatch {
  id: string;
  school_id: string;
  mentor_id: string;
  mentee_id: string;
  program_id: string;
  match_date: string;
  goals: string[];
  meeting_frequency: string;
  meetings_held: number;
  duration_months: number;
  satisfaction_score: number;
  outcome_notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LearningEngagement {
  id: string;
  school_id: string;
  employee_id: string;
  course_id: string;
  engagement_type: CorporateEngagementSource;
  engagement_score: number;
  time_spent_minutes: number;
  interactions_count: number;
  content_completed: number;
  assignments_submitted: number;
  forum_posts: number;
  peer_interactions: number;
  last_activity_date: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSkillAssessment {
  id: string;
  school_id: string;
  employee_id: string;
  skill_name: string;
  assessment_date: string;
  assessment_method: SkillAssessmentMethod;
  assessed_by: string;
  score: number;
  proficiency_level: SkillProficiency;
  evidence: string[];
  notes: string;
  next_assessment_date: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingImpactMeasurement {
  id: string;
  school_id: string;
  program_id: string;
  measurement_type: ROIType;
  pre_training_value: number;
  post_training_value: number;
  improvement_percentage: number;
  sample_size: number;
  confidence_level: number;
  methodology: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningAnalytics {
  id: string;
  school_id: string;
  analytics_type: LearningAnalyticsType;
  period: string;
  data: Record<string, number>;
  trends: AnalyticsTrend[];
  benchmarks: AnalyticsBenchmark[];
  insights: string[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsTrend {
  metric: string;
  direction: string;
  change_percentage: number;
  period: string;
  significance: string;
}

export interface AnalyticsBenchmark {
  metric: string;
  internal_value: number;
  industry_average: number;
  top_performer_value: number;
  percentile: number;
}

export interface CorporateReport {
  id: string;
  school_id: string;
  report_type: string;
  title: string;
  description: string;
  period: string;
  frequency: ReportFrequency;
  recipients: string[];
  sections: ReportSection[];
  generated_at: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface ReportSection {
  section_id: string;
  title: string;
  content: string;
  charts: string[];
  tables: string[];
  insights: string[];
}

export interface EmployeeSkillProfile {
  id: string;
  school_id: string;
  employee_id: string;
  overall_proficiency: SkillProficiency;
  total_skills: number;
  expert_skills: number;
  advanced_skills: number;
  intermediate_skills: number;
  beginner_skills: number;
  skill_categories: SkillCategoryBreakdown[];
  endorsements_received: number;
  endorsements_given: number;
  last_assessment_date: string;
  created_at: string;
  updated_at: string;
}

export interface SkillCategoryBreakdown {
  category: SkillCategory;
  skill_count: number;
  avg_proficiency: SkillProficiency;
  top_skill: string;
}

export interface WorkforceRetentionAnalytics {
  id: string;
  school_id: string;
  department_id: string;
  period: string;
  retention_rate: number;
  turnover_rate: number;
  voluntary_turnover: number;
  involuntary_turnover: number;
  avg_tenure: number;
  flight_risk_employees: number;
  top_departure_reasons: DepartureReason[];
  cost_of_turnover: number;
  created_at: string;
  updated_at: string;
}

export interface DepartureReason {
  reason: string;
  count: number;
  percentage: number;
  avg_tenure: number;
}

export interface CorporateEngagementSurvey {
  id: string;
  school_id: string;
  survey_name: string;
  description: string;
  survey_date: string;
  response_rate: number;
  overall_score: number;
  dimensions: EngagementDimension[];
  action_items: string[];
  created_at: string;
  updated_at: string;
}

export interface EngagementDimension {
  dimension: string;
  score: number;
  benchmark: number;
  trend: string;
  comments: string[];
}

export interface TalentMarketplaceListing {
  id: string;
  school_id: string;
  title: string;
  description: string;
  listing_type: string;
  department_id: string;
  required_skills: string[];
  preferred_skills: string[];
  experience_level: SkillProficiency;
  employment_type: string;
  location: string;
  remote_option: boolean;
  salary_range_min: number;
  salary_range_max: number;
  currency: string;
  application_deadline: string;
  applicant_count: number;
  status: MatrixStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceDiversityMetrics {
  id: string;
  school_id: string;
  period: string;
  total_workforce: number;
  gender_distribution: Record<string, number>;
  age_distribution: Record<string, number>;
  ethnicity_distribution: Record<string, number>;
  disability_representation: number;
  diversity_index: number;
  inclusion_score: number;
  pay_equity_score: number;
  representation_by_level: Record<string, Record<string, number>>;
  created_at: string;
  updated_at: string;
}

export interface CorporateComplianceDashboard {
  id: string;
  school_id: string;
  period: string;
  overall_compliance_rate: number;
  total_required_trainings: number;
  completed_trainings: number;
  overdue_trainings: number;
  upcoming_deadlines: number;
  compliance_by_type: ComplianceByType[];
  non_compliant_employees: number;
  risk_score: number;
  audit_status: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceByType {
  compliance_type: ComplianceType;
  required: number;
  completed: number;
  overdue: number;
  compliance_rate: number;
}

export interface WorkforceProductivityDashboard {
  id: string;
  school_id: string;
  period: string;
  overall_productivity_index: number;
  productivity_by_department: DepartmentProductivity[];
  productivity_by_role: RoleProductivity[];
  top_performers: string[];
  improvement_needed: string[];
  correlation_with_training: number;
  roi_of_training: number;
  created_at: string;
  updated_at: string;
}

export interface DepartmentProductivity {
  department_id: string;
  department_name: string;
  productivity_index: number;
  trend: string;
  training_hours_per_employee: number;
}

export interface RoleProductivity {
  role: string;
  productivity_index: number;
  headcount: number;
  avg_training_hours: number;
}

export interface SuccessionPlanDashboard {
  id: string;
  school_id: string;
  period: string;
  critical_positions: number;
  positions_with_successors: number;
  positions_without_successors: number;
  coverage_rate: number;
  avg_readiness_level: SuccessionReadinessLevel;
  high_potential_employees: number;
  bench_strength: number;
  succession_risks: SuccessionRisk[];
  created_at: string;
  updated_at: string;
}

export interface SuccessionRisk {
  position_id: string;
  position_title: string;
  risk_level: RiskLevel;
  reason: string;
  mitigation_plan: string;
}

export interface CorporateAcademyEnrollment {
  id: string;
  school_id: string;
  academy_id: string;
  employee_id: string;
  program_id: string;
  enrollment_date: string;
  start_date: string;
  expected_completion_date: string;
  actual_completion_date: string;
  status: EnrollmentStatus;
  progress_percentage: number;
  current_score: number;
  credits_earned: number;
  feedback: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningCreditTransaction {
  id: string;
  school_id: string;
  employee_id: string;
  credit_type: CreditType;
  amount: number;
  balance_after: number;
  transaction_type: string;
  description: string;
  reference_id: string;
  processed_date: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSkillHeatmap {
  id: string;
  school_id: string;
  department_id: string;
  skills: string[];
  employees: string[];
  heatmap_data: number[][];
  avg_score: number;
  critical_skills: string[];
  gap_skills: string[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateTrainingCalendar {
  id: string;
  school_id: string;
  year: number;
  month: number;
  events: TrainingCalendarEvent[];
  total_scheduled: number;
  total_completed: number;
  total_cancelled: number;
  created_at: string;
  updated_at: string;
}

export interface TrainingCalendarEvent {
  event_id: string;
  course_id: string;
  course_name: string;
  instructor_id: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  enrolled_count: number;
  status: string;
}

export interface WorkforceBenchmark {
  id: string;
  school_id: string;
  benchmark_name: string;
  category: string;
  our_value: number;
  industry_average: number;
  top_quartile: number;
  top_decile: number;
  percentile_rank: number;
  period: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateTrainingEffectiveness {
  id: string;
  school_id: string;
  program_id: string;
  program_name: string;
  reaction_score: number;
  learning_score: number;
  behavior_score: number;
  results_score: number;
  kirkpatrick_level: number;
  sample_size: number;
  measurement_period: string;
  methodology: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceCompetencyFramework {
  id: string;
  school_id: string;
  name: string;
  description: string;
  competencies: CompetencyDefinition[];
  version: string;
  effective_date: string;
  status: MatrixStatus;
  created_at: string;
  updated_at: string;
}

export interface CompetencyDefinition {
  competency_id: string;
  name: string;
  description: string;
  category: SkillCategory;
  levels: CompetencyLevel[];
  behavioral_indicators: string[];
  assessment_methods: string[];
}

export interface CompetencyLevel {
  level: SkillProficiency;
  description: string;
  indicators: string[];
}

export interface CorporateTalentAssessment {
  id: string;
  school_id: string;
  employee_id: string;
  assessment_type: string;
  assessment_date: string;
  overall_score: number;
  category_scores: Record<string, number>;
  potential_rating: string;
  performance_rating: PerformanceRating;
  talent_tier: TalentTier;
  development_recommendations: string[];
  mobility_readiness: string;
  succession_eligible: boolean;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningEvent {
  id: string;
  school_id: string;
  event_type: string;
  event_name: string;
  description: string;
  event_date: string;
  location: string;
  format: CourseFormat;
  target_audience: string;
  expected_attendees: number;
  actual_attendees: number;
  budget: number;
  actual_cost: number;
  satisfaction_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceCostAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_labor_cost: number;
  training_cost: number;
  training_cost_per_employee: number;
  training_cost_percentage: number;
  cost_by_department: DepartmentCost[];
  cost_by_category: CategoryCost[];
  cost_efficiency_score: number;
  benchmark_comparison: number;
  trend: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningRecommendation {
  id: string;
  school_id: string;
  employee_id: string;
  recommendation_type: string;
  recommended_courses: string[];
  recommended_skills: string[];
  reason: string;
  priority: SkillGapPriority;
  estimated_impact: number;
  estimated_duration: number;
  estimated_cost: number;
  generated_date: string;
  accepted: boolean;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSuccessionCandidateAssessment {
  id: string;
  school_id: string;
  candidate_id: string;
  position_id: string;
  assessment_date: string;
  readiness_level: SuccessionReadinessLevel;
  strength_areas: string[];
  development_areas: string[];
  potential_score: number;
  performance_score: number;
  leadership_score: number;
  cultural_fit_score: number;
  overall_assessment: string;
  recommended_development: string[];
  estimated_ready_date: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateAcademyProgram {
  id: string;
  school_id: string;
  academy_id: string;
  name: string;
  description: string;
  program_type: string;
  duration_months: number;
  courses: string[];
  max_participants: number;
  current_participants: number;
  prerequisites: string[];
  learning_objectives: string[];
  assessment_criteria: string[];
  certification_offered: boolean;
  price: number;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceAttritionAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_attrition: number;
  voluntary_attrition: number;
  involuntary_attrition: number;
  attrition_rate: number;
  avg_tenure_at_exit: number;
  cost_of_attrition: number;
  top_reasons: DepartureReason[];
  regrettable_attrition: number;
  regrettable_attrition_rate: number;
  replacement_time_avg: number;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningCompliance {
  id: string;
  school_id: string;
  compliance_type: ComplianceType;
  regulation_name: string;
  regulatory_body: string;
  required_trainings: string[];
  deadline: string;
  grace_period_days: number;
  penalties: string;
  documentation_required: string[];
  audit_frequency: string;
  last_audit_date: string;
  compliance_status: TrackingStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceEngagementIndex {
  id: string;
  school_id: string;
  period: string;
  overall_engagement_score: number;
  engagement_level: EngagementLevel;
  dimensions: EngagementDimension[];
  participation_rate: number;
  response_rate: number;
  action_items_completed: number;
  action_items_total: number;
  trend: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningBudgetForecast {
  id: string;
  school_id: string;
  fiscal_year: number;
  projected_budget: number;
  current_spend: number;
  forecasted_spend: number;
  variance: number;
  variance_percentage: number;
  department_forecasts: DepartmentForecast[];
  assumptions: string[];
  confidence_level: number;
  created_at: string;
  updated_at: string;
}

export interface DepartmentForecast {
  department_id: string;
  department_name: string;
  projected_spend: number;
  headcount: number;
  cost_per_employee: number;
}

export interface WorkforceMobilityAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_moves: number;
  internal_transfers: number;
  promotions: number;
  lateral_moves: number;
  avg_time_to_fill: number;
  fill_rate: number;
  internal_mobility_rate: number;
  top_talent_mobility: number;
  mobility_by_department: DepartmentMobility[];
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningPathEnrollment {
  id: string;
  school_id: string;
  path_id: string;
  employee_id: string;
  enrollment_date: string;
  expected_completion_date: string;
  actual_completion_date: string;
  progress_percentage: number;
  current_course_index: number;
  courses_completed: number;
  courses_total: number;
  status: EnrollmentStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSkillDemandForecast {
  id: string;
  school_id: string;
  skill_name: string;
  current_demand: number;
  projected_demand_1y: number;
  projected_demand_3y: number;
  projected_demand_5y: number;
  growth_rate: number;
  supply_availability: number;
  gap_projected: number;
  recommended_actions: string[];
  confidence_level: number;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningAssessment {
  id: string;
  school_id: string;
  assessment_type: AssessmentType;
  course_id: string;
  name: string;
  description: string;
  max_score: number;
  passing_score: number;
  time_limit_minutes: number;
  attempts_allowed: number;
  randomize_questions: boolean;
  show_results: boolean;
  proctored: boolean;
  questions_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceWellnessMetrics {
  id: string;
  school_id: string;
  period: string;
  overall_wellness_score: number;
  stress_level: string;
  work_life_balance_score: number;
  burnout_risk: RiskLevel;
  absenteeism_rate: number;
  presenteeism_rate: number;
  wellness_program_participation: number;
  mental_health_support_utilization: number;
  satisfaction_with_wellness: number;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningCertificate {
  id: string;
  school_id: string;
  employee_id: string;
  course_id: string;
  certificate_number: string;
  issue_date: string;
  expiration_date: string;
  certificate_url: string;
  verification_code: string;
  status: CertificationStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceDevelopmentInitiative {
  id: string;
  school_id: string;
  initiative_name: string;
  description: string;
  target_population: string;
  objectives: string[];
  budget: number;
  start_date: string;
  end_date: string;
  expected_outcomes: string[];
  actual_outcomes: string[];
  participants_count: number;
  completion_rate: number;
  satisfaction_score: number;
  roi: number;
  status: MatrixStatus;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningNotification {
  id: string;
  school_id: string;
  employee_id: string;
  notification_type: NotificationType;
  title: string;
  message: string;
  channel: string;
  sent_date: string;
  read_date: string;
  action_url: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceRecruitmentMetrics {
  id: string;
  school_id: string;
  period: string;
  total_openings: number;
  total_hires: number;
  time_to_fill_avg: number;
  time_to_hire_avg: number;
  cost_per_hire: number;
  quality_of_hire_score: number;
  offer_acceptance_rate: number;
  source_effectiveness: SourceEffectiveness[];
  created_at: string;
  updated_at: string;
}

export interface SourceEffectiveness {
  source: string;
  hires: number;
  cost: number;
  quality_score: number;
  time_to_fill: number;
}

export interface CorporateLearningFeedback {
  id: string;
  school_id: string;
  employee_id: string;
  course_id: string;
  feedback_type: string;
  rating: number;
  comments: string;
  would_recommend: boolean;
  instructor_rating: number;
  content_rating: number;
  format_rating: number;
  submitted_date: string;
  anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkforceTrainingROI {
  id: string;
  school_id: string;
  program_id: string;
  program_name: string;
  investment: number;
  monetary_return: number;
  non_monetary_benefits: string[];
  roi_percentage: number;
  payback_period_months: number;
  npv: number;
  measurement_period: string;
  methodology: string;
  confidence_level: number;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningContent {
  id: string;
  school_id: string;
  content_type: string;
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  duration_minutes: number;
  author: string;
  version: string;
  tags: string[];
  download_count: number;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceSkillEndorsement {
  id: string;
  school_id: string;
  skill_id: string;
  endorser_id: string;
  endorsee_id: string;
  endorsement_date: string;
  relationship: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningGoal {
  id: string;
  school_id: string;
  employee_id: string;
  goal_type: LearningGoalType;
  description: string;
  target_date: string;
  progress_percentage: number;
  status: string;
  linked_courses: string[];
  manager_approved: boolean;
  achievement_date: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceCompetencyAssessment {
  id: string;
  school_id: string;
  employee_id: string;
  competency_id: string;
  assessment_date: string;
  score: number;
  proficiency_level: SkillProficiency;
  evidence: string[];
  assessor_id: string;
  assessment_method: SkillAssessmentMethod;
  comments: string;
  next_assessment_date: string;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningSatisfaction {
  id: string;
  school_id: string;
  survey_id: string;
  course_id: string;
  respondent_id: string;
  overall_satisfaction: number;
  content_quality: number;
  instructor_effectiveness: number;
  learning_environment: number;
  relevance_to_role: number;
  likelihood_to_recommend: number;
  comments: string;
  submitted_date: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforcePerformanceAnalytics {
  id: string;
  school_id: string;
  period: string;
  avg_performance_score: number;
  top_performer_percentage: number;
  needs_improvement_percentage: number;
  performance_by_department: DepartmentPerformance[];
  performance_by_tenure: TenurePerformance[];
  correlation_with_training: number;
  created_at: string;
  updated_at: string;
}

export interface DepartmentPerformance {
  department_id: string;
  department_name: string;
  avg_score: number;
  headcount: number;
  training_hours: number;
}

export interface TenurePerformance {
  tenure_range: string;
  avg_score: number;
  headcount: number;
}

export interface CorporateLearningCompletion {
  id: string;
  school_id: string;
  employee_id: string;
  course_id: string;
  enrollment_date: string;
  start_date: string;
  completion_date: string;
  score: number;
  grade: string;
  time_spent_hours: number;
  certificate_issued: boolean;
  credits_earned: number;
  status: LearningStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkforceTalentPipeline {
  id: string;
  school_id: string;
  pipeline_name: string;
  description: string;
  source: string;
  candidates_count: number;
  qualified_count: number;
  interview_count: number;
  offer_count: number;
  hire_count: number;
  conversion_rate: number;
  avg_time_to_hire: number;
  cost_per_candidate: number;
  status: MatrixStatus;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningResource {
  id: string;
  school_id: string;
  resource_type: string;
  name: string;
  description: string;
  url: string;
  file_size: number;
  author: string;
  tags: string[];
  download_count: number;
  rating: number;
  available_licenses: number;
  total_licenses: number;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WorkforceLearningCulture {
  id: string;
  school_id: string;
  period: string;
  learning_hours_per_employee: number;
  voluntary_learning_participation: number;
  manager_support_score: number;
  learning_time_allocation: number;
  knowledge_sharing_index: number;
  innovation_index: number;
  learning_culture_maturity: string;
  benchmark_comparison: number;
  created_at: string;
  updated_at: string;
}

export interface CorporateLearningOutcome {
  id: string;
  school_id: string;
  course_id: string;
  employee_id: string;
  outcome_type: string;
  description: string;
  measured_date: string;
  pre_value: number;
  post_value: number;
  improvement: number;
  methodology: string;
  created_at: string;
  updated_at: string;
}
