export enum MarketplaceType {
  JOB = 'JOB',
  INTERNSHIP = 'INTERNSHIP',
  APPRENTICESHIP = 'APPRENTICESHIP',
  FREELANCE = 'FREELANCE',
  MENTORSHIP = 'MENTORSHIP',
  EXPERT = 'EXPERT',
  PROJECT = 'PROJECT',
  RESEARCH = 'RESEARCH',
  TRAINING = 'TRAINING',
  EMPLOYER = 'EMPLOYER',
  HYBRID = 'HYBRID',
  NICHE = 'NICHE',
  REGIONAL = 'REGIONAL',
  GLOBAL = 'GLOBAL',
}

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

export enum TalentType {
  STUDENT = 'STUDENT',
  GRADUATE = 'GRADUATE',
  PROFESSIONAL = 'PROFESSIONAL',
  FREELANCER = 'FREELANCER',
  CONSULTANT = 'CONSULTANT',
  MENTOR = 'MENTOR',
  EXPERT = 'EXPERT',
  RESEARCHER = 'RESEARCHER',
  INFLUENCER = 'INFLUENCER',
  ENTREPRENEUR = 'ENTREPRENEUR',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  INCOMPLETE = 'INCOMPLETE',
  AUTO_VERIFIED = 'AUTO_VERIFIED',
  MANUAL_VERIFIED = 'MANUAL_VERIFIED',
}

export enum RatingType {
  EMPLOYER = 'EMPLOYER',
  CANDIDATE = 'CANDIDATE',
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
  CLIENT = 'CLIENT',
  FREELANCER = 'FREELANCER',
  INSTRUCTOR = 'INSTRUCTOR',
  PEER = 'PEER',
  SELF = 'SELF',
  SYSTEM = 'SYSTEM',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FLAGGED = 'FLAGGED',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED',
  APPEALED = 'APPEALED',
  DISPUTED = 'DISPUTED',
  RESOLVED = 'RESOLVED',
  ARCHIVED = 'ARCHIVED',
}

export enum ReputationLevel {
  NEWCOMER = 'NEWCOMER',
  RISING = 'RISING',
  ESTABLISHED = 'ESTABLISHED',
  RECOGNIZED = 'RECOGNIZED',
  EXPERT = 'EXPERT',
  THOUGHT_LEADER = 'THOUGHT_LEADER',
  INFLUENCER = 'INFLUENCER',
  TOP_TALENT = 'TOP_TALENT',
  ELITE = 'ELITE',
  LEGEND = 'LEGEND',
}

export enum TrustScore {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  EXCEPTIONAL = 'EXCEPTIONAL',
  UNRATED = 'UNRATED',
  PROBATIONARY = 'PROBATIONARY',
  TRUSTED = 'TRUSTED',
  HIGHLY_TRUSTED = 'HIGHLY_TRUSTED',
}

export enum PoolType {
  TALENT = 'TALENT',
  CANDIDATE = 'CANDIDATE',
  PROSPECT = 'PROSPECT',
  ALUMNI = 'ALUMNI',
  PASSIVE = 'PASSIVE',
  EMERGING = 'EMERGING',
  DIVERSITY = 'DIVERSITY',
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  PARTNER = 'PARTNER',
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEWED = 'INTERVIEWED',
  OFFERED = 'OFFERED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  ON_HOLD = 'ON_HOLD',
}

export enum MatchStatus {
  PENDING = 'PENDING',
  MUTUAL_INTEREST = 'MUTUAL_INTEREST',
  MATCHED = 'MATCHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  RECURRING = 'RECURRING',
}

export enum TalentVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  RESTRICTED = 'RESTRICTED',
  UNLISTED = 'UNLISTED',
  EMPLOYERS_ONLY = 'EMPLOYERS_ONLY',
  MENTORS_ONLY = 'MENTORS_ONLY',
  POOL_MEMBERS = 'POOL_MEMBERS',
  INVITATION_ONLY = 'INVITATION_ONLY',
  SEARCHABLE = 'SEARCHABLE',
  HIDDEN = 'HIDDEN',
}

export enum SkillDemandLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  CRITICAL = 'CRITICAL',
  EMERGING = 'EMERGING',
  DECLINING = 'DECLINING',
  STABLE = 'STABLE',
  EXPLOSIVE = 'EXPLOSIVE',
}

export enum MatchAlgorithm {
  SKILL_BASED = 'SKILL_BASED',
  EXPERIENCE_BASED = 'EXPERIENCE_BASED',
  LOCATION_BASED = 'LOCATION_BASED',
  CULTURE_FIT = 'CULTURE_FIT',
  HYBRID = 'HYBRID',
  AI_POWERED = 'AI_POWERED',
  COLLABORATIVE_FILTERING = 'COLLABORATIVE_FILTERING',
  CONTENT_BASED = 'CONTENT_BASED',
  GRAPH_BASED = 'GRAPH_BASED',
  ENSEMBLE = 'ENSEMBLE',
}

export enum OpportunityDuration {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM',
  PERMANENT = 'PERMANENT',
  CONTRACT = 'CONTRACT',
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME',
  FLEXIBLE = 'FLEXIBLE',
  SEASONAL = 'SEASONAL',
  PROJECT_BASED = 'PROJECT_BASED',
}

export enum CompensationType {
  SALARY = 'SALARY',
  HOURLY = 'HOURLY',
  FIXED = 'FIXED',
  PERFORMANCE_BASED = 'PERFORMANCE_BASED',
  EQUITY = 'EQUITY',
  STIPEND = 'STIPEND',
  UNPAID = 'UNPAID',
  REVENUE_SHARE = 'REVENUE_SHARE',
  BONUS = 'BONUS',
  HYBRID = 'HYBRID',
}

export enum TalentSearchFilter {
  SKILLS = 'SKILLS',
  EXPERIENCE = 'EXPERIENCE',
  EDUCATION = 'EDUCATION',
  LOCATION = 'LOCATION',
  AVAILABILITY = 'AVAILABILITY',
  RATING = 'RATING',
  BUDGET = 'BUDGET',
  CERTIFICATION = 'CERTIFICATION',
  LANGUAGE = 'LANGUAGE',
  INDUSTRY = 'INDUSTRY',
}

export enum PlatformCommission {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
  TIERED = 'TIERED',
  HYBRID = 'HYBRID',
  NONE = 'NONE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FREEMIUM = 'FREEMIUM',
  BID_BASED = 'BID_BASED',
  NEGOTIABLE = 'NEGOTIABLE',
  CAPPED = 'CAPPED',
}

export enum DisputeResolution {
  MEDIATION = 'MEDIATION',
  ARBITRATION = 'ARBITRATION',
  ESCROW = 'ESCROW',
  PLATFORM_REVIEW = 'PLATFORM_REVIEW',
  LEGAL = 'LEGAL',
  REFUND = 'REFUND',
  PARTIAL_REFUND = 'PARTIAL_REFUND',
  REWORK = 'REWORK',
  RELOCATION = 'RELOCATION',
  TERMINATION = 'TERMINATION',
}

export enum TalentContentType {
  PORTFOLIO = 'PORTFOLIO',
  RESUME = 'RESUME',
  VIDEO = 'VIDEO',
  PROJECT = 'PROJECT',
  PUBLICATION = 'PUBLICATION',
  CERTIFICATION = 'CERTIFICATION',
  TESTIMONIAL = 'TESTIMONIAL',
  CASE_STUDY = 'CASE_STUDY',
  DEMO = 'DEMO',
  LINK = 'LINK',
}

export enum PlatformFeeType {
  LISTING = 'LISTING',
  SUCCESS = 'SUCCESS',
  SUBSCRIPTION = 'SUBSCRIPTION',
  PREMIUM_FEATURE = 'PREMIUM_FEATURE',
  VERIFICATION = 'VERIFICATION',
  BOOST = 'BOOST',
  MESSAGE = 'MESSAGE',
  INTRODUCTION = 'INTRODUCTION',
  ESCROW = 'ESCROW',
  DISPUTE = 'DISPUTE',
}

export enum TalentMatchPreference {
  SKILL_MATCH = 'SKILL_MATCH',
  EXPERIENCE_MATCH = 'EXPERIENCE_MATCH',
  LOCATION_MATCH = 'LOCATION_MATCH',
  BUDGET_MATCH = 'BUDGET_MATCH',
  AVAILABILITY_MATCH = 'AVAILABILITY_MATCH',
  CULTURE_MATCH = 'CULTURE_MATCH',
  LANGUAGE_MATCH = 'LANGUAGE_MATCH',
  INDUSTRY_MATCH = 'INDUSTRY_MATCH',
  CERTIFICATION_MATCH = 'CERTIFICATION_MATCH',
  RATING_MATCH = 'RATING_MATCH',
}

export enum TalentPoolEngagement {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
  DORMANT = 'DORMANT',
  ENGAGED = 'ENGAGED',
  NOURTURED = 'NOURTURED',
  COLD = 'COLD',
  WARM = 'WARM',
  HOT = 'HOT',
  LOST = 'LOST',
  CONVERTED = 'CONVERTED',
}

export enum VerificationDocumentType {
  GOVERNMENT_ID = 'GOVERNMENT_ID',
  DEGREE = 'DEGREE',
  CERTIFICATION = 'CERTIFICATION',
  EMPLOYMENT_LETTER = 'EMPLOYMENT_LETTER',
  PORTFOLIO = 'PORTFOLIO',
  REFERENCE = 'REFERENCE',
  BACKGROUND_CHECK = 'BACKGROUND_CHECK',
  SKILL_ASSESSMENT = 'SKILL_ASSESSMENT',
  TRANSCRIPT = 'TRANSCRIPT',
  LICENSE = 'LICENSE',
}

export enum EmployerSize {
  STARTUP = 'STARTUP',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  ENTERPRISE = 'ENTERPRISE',
  MICRO = 'MICRO',
  SMB = 'SMB',
  MID_MARKET = 'MID_MARKET',
  FORTUNE_500 = 'FORTUNE_500',
  GOVERNMENT = 'GOVERNMENT',
}

export enum TalentEndorsementType {
  SKILL = 'SKILL',
  PROJECT = 'PROJECT',
  WORK Ethic = 'WORK_ETHIC',
  COMMUNICATION = 'COMMUNICATION',
  LEADERSHIP = 'LEADERSHIP',
  TEAMWORK = 'TEAMWORK',
  PROBLEM_SOLVING = 'PROBLEM_SOLVING',
  CREATIVITY = 'CREATIVITY',
  RELIABILITY = 'RELIABILITY',
  OVERALL = 'OVERALL',
}

export enum FreelanceProjectStatus {
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CONTRACTED = 'CONTRACTED',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
  ON_HOLD = 'ON_HOLD',
  DELIVERED = 'DELIVERED',
}

export enum MentorshipMatchType {
  SKILL_BASED = 'SKILL_BASED',
  CAREER_BASED = 'CAREER_BASED',
  INDUSTRY_BASED = 'INDUSTRY_BASED',
  ROLE_BASED = 'ROLE_BASED',
  GEOGRAPHIC = 'GEOGRAPHIC',
  ALUMNI = 'ALUMNI',
  PEER = 'PEER',
  REVERSE = 'REVERSE',
  GROUP = 'GROUP',
  SPEED = 'SPEED',
}

export enum InternshipDuration {
  ONE_MONTH = 'ONE_MONTH',
  TWO_MONTHS = 'TWO_MONTHS',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  TWELVE_MONTHS = 'TWELVE_MONTHS',
  SUMMER = 'SUMMER',
  SEMESTER = 'SEMESTER',
  YEAR = 'YEAR',
  FLEXIBLE = 'FLEXIBLE',
  CUSTOM = 'CUSTOM',
}

export enum ApprenticeshipLevel {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  LEVEL_4 = 'LEVEL_4',
  LEVEL_5 = 'LEVEL_5',
  LEVEL_6 = 'LEVEL_6',
  LEVEL_7 = 'LEVEL_7',
  ENTRY = 'ENTRY',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum ResearchTalentType {
  ACADEMIC = 'ACADEMIC',
  INDUSTRY = 'INDUSTRY',
  INDEPENDENT = 'INDEPENDENT',
  POSTDOC = 'POSTDOC',
  PHD_CANDIDATE = 'PHD_CANDIDATE',
  RESEARCH_SCIENTIST = 'RESEARCH_SCIENTIST',
  DATA_SCIENTIST = 'DATA_SCIENTIST',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  PRINCIPAL_INVESTIGATOR = 'PRINCIPAL_INVESTIGATOR',
  COLLABORATOR = 'COLLABORATOR',
}

export enum ExpertAvailability {
  AVAILABLE_NOW = 'AVAILABLE_NOW',
  AVAILABLE_THIS_WEEK = 'AVAILABLE_THIS_WEEK',
  AVAILABLE_THIS_MONTH = 'AVAILABLE_THIS_MONTH',
  BOOKED = 'BOOKED',
  UNAVAILABLE = 'UNAVAILABLE',
  BY_REQUEST = 'BY_REQUEST',
  SCHEDULED = 'SCHEDULED',
  ON_LEAVE = 'ON_LEAVE',
  FLEXIBLE = 'FLEXIBLE',
  WAITLIST = 'WAITLIST',
}

export enum TalentPaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_MONEY = 'MOBILE_MONEY',
  CRYPTO = 'CRYPTO',
  ESCROW = 'ESCROW',
  MILESTONE = 'MILESTONE',
  HOURLY = 'HOURLY',
  UPFRONT = 'UPFRONT',
  POST_DELIVERY = 'POST_DELIVERY',
  SPLIT = 'SPLIT',
  HOLD = 'HOLD',
}

export enum TalentFeedbackType {
  RATING = 'RATING',
  COMMENT = 'COMMENT',
  TESTIMONIAL = 'TESTIMONIAL',
  CASE_STUDY = 'CASE_STUDY',
  RECOMMENDATION = 'RECOMMENDATION',
  COMPLAINT = 'COMPLAINT',
  SUGGESTION = 'SUGGESTION',
  FOLLOW_UP = 'FOLLOW_UP',
  RECURRING = 'RECURRING',
  ANONYMOUS = 'ANONYMOUS',
}

export enum TalentPortfolioType {
  CASE_STUDY = 'CASE_STUDY',
  PROJECT = 'PROJECT',
  PUBLICATION = 'PUBLICATION',
  SPEAKING = 'SPEAKING',
  PATENT = 'PATENT',
  OPEN_SOURCE = 'OPEN_SOURCE',
  DESIGN = 'DESIGN',
  WRITING = 'WRITING',
  DATA = 'DATA',
  MIXED = 'MIXED',
}

export enum TalentSkillVerification {
  SELF_REPORTED = 'SELF_REPORTED',
  PEER_ENDORSED = 'PEER_ENDORSED',
  PLATFORM_ASSESSED = 'PLATFORM_ASSESSED',
  EXTERNAL_CERTIFIED = 'EXTERNAL_CERTIFIED',
  PROJECT_DEMONSTRATED = 'PROJECT_DEMONSTRATED',
  EMPLOYER_VERIFIED = 'EMPLOYER_VERIFIED',
  INSTRUCTOR_VERIFIED = 'INSTRUCTOR_VERIFIED',
  AI_VERIFIED = 'AI_VERIFIED',
  PORTFOLIO_VERIFIED = 'PORTFOLIO_VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export enum TalentGeoLocation {
  REMOTE = 'REMOTE',
  ONSITE = 'ONSITE',
  HYBRID = 'HYBRID',
  FLEXIBLE = 'FLEXIBLE',
  SPECIFIC_CITY = 'SPECIFIC_CITY',
  SPECIFIC_COUNTRY = 'SPECIFIC_COUNTRY',
  REGION = 'REGION',
  WORLDWIDE = 'WORLDWIDE',
  TIMEZONE_BASED = 'TIMEZONE_BASED',
  TRAVEL_REQUIRED = 'TRAVEL_REQUIRED',
}

export enum PlatformNotificationType {
  NEW_MATCH = 'NEW_MATCH',
  APPLICATION_RECEIVED = 'APPLICATION_RECEIVED',
  APPLICATION_STATUS = 'APPLICATION_STATUS',
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  REVIEW_RECEIVED = 'REVIEW_RECEIVED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  MILESTONE_COMPLETED = 'MILESTONE_COMPLETED',
  DISPUTE_OPENED = 'DISPUTE_OPENED',
  SYSTEM = 'SYSTEM',
}

export enum TalentSubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
  TEAM = 'TEAM',
  ACADEMIC = 'ACADEMIC',
  NON_PROFIT = 'NON_PROFIT',
  STARTUP = 'STARTUP',
  CUSTOM = 'CUSTOM',
}

export enum TalentSearchSortBy {
  RELEVANCE = 'RELEVANCE',
  RATING = 'RATING',
  PRICE_LOW_HIGH = 'PRICE_LOW_HIGH',
  PRICE_HIGH_LOW = 'PRICE_HIGH_LOW',
  EXPERIENCE = 'EXPERIENCE',
  COMPLETION_RATE = 'COMPLETION_RATE',
  RESPONSE_TIME = 'RESPONSE_TIME',
  LAST_ACTIVE = 'LAST_ACTIVE',
  MATCH_SCORE = 'MATCH_SCORE',
  NEWEST = 'NEWEST',
}

export enum TalentAvailabilitySchedule {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  FLEXIBLE = 'FLEXIBLE',
  WEEKDAYS = 'WEEKDAYS',
  WEEKENDS = 'WEEKENDS',
  EVENINGS = 'EVENINGS',
  MORNINGS = 'MORNINGS',
  CUSTOM = 'CUSTOM',
  ON_DEMAND = 'ON_DEMAND',
  SEASONAL = 'SEASONAL',
}

export enum TalentProfile {
  id: string;
  school_id: string;
  user_id: string;
  talent_type: TalentType;
  headline: string;
  bio: string;
  skills: string[];
  experience_years: number;
  education: EducationEntry[];
  certifications: string[];
  portfolio_url: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  location: string;
  timezone: string;
  languages: string[];
  hourly_rate: number;
  currency: string;
  availability: TalentAvailabilitySchedule;
  visibility: TalentVisibility;
  verification_status: VerificationStatus;
  reputation_level: ReputationLevel;
  trust_score: TrustScore;
  avg_rating: number;
  total_reviews: number;
  total_projects: number;
  completion_rate: number;
  response_time_hours: number;
  profile_views: number;
  match_count: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  gpa: number;
  honors: string[];
}

export interface TalentSearch {
  id: string;
  school_id: string;
  user_id: string;
  query: string;
  filters: TalentSearchFilter[];
  location: string;
  min_budget: number;
  max_budget: number;
  skills_required: string[];
  experience_level: string;
  availability: string;
  sort_by: TalentSearchSortBy;
  results_count: number;
  saved: boolean;
  created_at: string;
  updated_at: string;
}

export interface TalentPool {
  id: string;
  school_id: string;
  name: string;
  description: string;
  pool_type: PoolType;
  criteria: PoolCriteria;
  members_count: number;
  max_size: number;
  engagement_level: TalentPoolEngagement;
  nurture_campaigns: string[];
  auto_add_enabled: boolean;
  tags: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface PoolCriteria {
  skills: string[];
  experience_min: number;
  experience_max: number;
  locations: string[];
  talent_types: TalentType[];
  min_rating: number;
  verification_required: boolean;
}

export interface JobMarketplaceListing {
  id: string;
  school_id: string;
  employer_id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills_required: string[];
  skills_preferred: string[];
  experience_level: string;
  employment_type: string;
  compensation_type: CompensationType;
  salary_min: number;
  salary_max: number;
  currency: string;
  location: string;
  remote_option: boolean;
  timezone_requirement: string;
  duration: OpportunityDuration;
  application_deadline: string;
  applicant_count: number;
  view_count: number;
  status: ListingStatus;
  featured: boolean;
  urgent: boolean;
  created_at: string;
  updated_at: string;
}

export interface InternshipListing {
  id: string;
  school_id: string;
  employer_id: string;
  title: string;
  description: string;
  department: string;
  skills_required: string[];
  duration: InternshipDuration;
  compensation_type: CompensationType;
  stipend: number;
  currency: string;
  location: string;
  remote_option: boolean;
  start_date: string;
  end_date: string;
  application_deadline: string;
  spots_available: number;
  spots_filled: number;
  mentor_assigned: boolean;
  learning_outcomes: string[];
  certificate_provided: boolean;
  conversion_possible: boolean;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface ApprenticeshipListing {
  id: string;
  school_id: string;
  employer_id: string;
  title: string;
  description: string;
  program_name: string;
  level: ApprenticeshipLevel;
  framework: string;
  skills_required: string[];
  duration_months: number;
  wage: number;
  currency: string;
  location: string;
  training_provider: string;
  assessment_method: string;
  certification_on_completion: boolean;
  application_deadline: string;
  start_date: string;
  spots_available: number;
  spots_filled: number;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface FreelanceListing {
  id: string;
  school_id: string;
  client_id: string;
  title: string;
  description: string;
  project_scope: string;
  skills_required: string[];
  deliverables: string[];
  budget: number;
  currency: string;
  compensation_type: CompensationType;
  duration: OpportunityDuration;
  start_date: string;
  deadline: string;
  milestone_payments: MilestonePayment[];
  experience_required: string;
  portfolio_required: boolean;
  application_deadline: string;
  applicant_count: number;
  status: FreelanceProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface MilestonePayment {
  milestone_id: string;
  description: string;
  amount: number;
  due_date: string;
  deliverables: string[];
}

export interface MentorshipListing {
  id: string;
  school_id: string;
  mentor_id: string;
  title: string;
  description: string;
  expertise_areas: string[];
  match_type: MentorshipMatchType;
  duration_months: number;
  meeting_frequency: string;
  max_mentees: number;
  current_mentees: number;
  communication_preference: string;
  languages: string[];
  industry_experience: string[];
  availability: ExpertAvailability;
  success_stories: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface ExpertListing {
  id: string;
  school_id: string;
  expert_id: string;
  title: string;
  description: string;
  expertise_areas: string[];
  hourly_rate: number;
  currency: string;
  min_engagement_hours: number;
  availability: ExpertAvailability;
  industries: string[];
  certifications: string[];
  publications: string[];
  speaking_experience: boolean;
  consulting_experience: number;
  languages: string[];
  travel_willingness: boolean;
  remote_capable: boolean;
  avg_rating: number;
  total_engagements: number;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectListing {
  id: string;
  school_id: string;
  client_id: string;
  title: string;
  description: string;
  project_type: string;
  skills_required: string[];
  team_size_min: number;
  team_size_max: number;
  budget_min: number;
  budget_max: number;
  currency: string;
  duration_months: number;
  start_date: string;
  remote_option: boolean;
  collaboration_tools: string[];
  methodology: string;
  deliverables: string[];
  application_deadline: string;
  applicant_count: number;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface ResearchTalentListing {
  id: string;
  school_id: string;
  researcher_id: string;
  title: string;
  description: string;
  research_type: ResearchTalentType;
  research_areas: string[];
  methodology_expertise: string[];
  tools_expertise: string[];
  publication_count: number;
  h_index: number;
  citation_count: number;
  availability: ExpertAvailability;
  collaboration_interest: string[];
  funding_experience: boolean;
  supervision_experience: boolean;
  lab_access: boolean;
  data_access: string[];
  languages: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface EmployerMarketplaceListing {
  id: string;
  school_id: string;
  employer_id: string;
  company_name: string;
  company_description: string;
  industry: string[];
  company_size: EmployerSize;
  founded_year: number;
  headquarters: string;
  offices: string[];
  website: string;
  logo_url: string;
  culture_values: string[];
  benefits: string[];
  tech_stack: string[];
  open_positions: number;
  avg_rating: number;
  total_reviews: number;
  verified: boolean;
  featured: boolean;
  talent_pipeline_active: boolean;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface TrainingMarketplaceListing {
  id: string;
  school_id: string;
  provider_id: string;
  title: string;
  description: string;
  category: string;
  skills_taught: string[];
  difficulty_level: string;
  duration_hours: number;
  format: string;
  price: number;
  currency: string;
  currency_type: CompensationType;
  max_students: number;
  current_students: number;
  instructor: string;
  rating: number;
  review_count: number;
  certificate_provided: boolean;
  prerequisites: string[];
  learning_outcomes: string[];
  sample_lessons: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface TalentRating {
  id: string;
  school_id: string;
  rater_id: string;
  ratee_id: string;
  rating_type: RatingType;
  listing_id: string;
  rating: number;
  rating_categories: Record<string, number>;
  review_text: string;
  created_at: string;
  updated_at: string;
}

export interface TalentReview {
  id: string;
  school_id: string;
  reviewer_id: string;
  subject_id: string;
  listing_id: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  would_recommend: boolean;
  helpful_count: number;
  report_count: number;
  status: ReviewStatus;
  response: string;
  response_date: string;
  created_at: string;
  updated_at: string;
}

export interface TalentVerification {
  id: string;
  school_id: string;
  talent_id: string;
  document_type: VerificationDocumentType;
  document_url: string;
  document_number: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  status: VerificationStatus;
  verified_by: string;
  verified_at: string;
  rejection_reason: string;
  verification_method: string;
  confidence_score: number;
  created_at: string;
  updated_at: string;
}

export interface TalentReputation {
  id: string;
  school_id: string;
  talent_id: string;
  reputation_level: ReputationLevel;
  reputation_score: number;
  total_ratings: number;
  avg_rating: number;
  total_reviews: number;
  total_projects: number;
  completion_rate: number;
  on_time_rate: number;
  on_budget_rate: number;
  repeat_client_rate: number;
  endorsements: number;
  badges: string[];
  achievements: string[];
  last_calculated: string;
  created_at: string;
  updated_at: string;
}

export interface TrustScoreData {
  id: string;
  school_id: string;
  talent_id: string;
  trust_score: TrustScore;
  trust_value: number;
  verification_level: number;
  identity_verified: boolean;
  background_check_passed: boolean;
  references_verified: boolean;
  portfolio_verified: boolean;
  skill_assessment_passed: boolean;
  platform_tenure_months: number;
  dispute_free: boolean;
  payment_history_clean: boolean;
  factors: TrustFactor[];
  last_calculated: string;
  created_at: string;
  updated_at: string;
}

export interface TrustFactor {
  factor: string;
  weight: number;
  score: number;
  contribution: number;
}

export interface MarketplaceConfig {
  id: string;
  school_id: string;
  platform_name: string;
  marketplace_types: MarketplaceType[];
  commission_type: PlatformCommission;
  commission_rate: number;
  escrow_enabled: boolean;
  auto_match: boolean;
  match_algorithm: MatchAlgorithm;
  verification_required: boolean;
  min_trust_score: TrustScore;
  dispute_resolution: DisputeResolution;
  notification_settings: Record<string, boolean>;
  search_settings: SearchSettings;
  payment_settings: PaymentSettings;
  created_at: string;
  updated_at: string;
}

export interface SearchSettings {
  max_results_per_page: number;
  default_sort: TalentSearchSortBy;
  fuzzy_matching: boolean;
  auto_suggest: boolean;
  saved_searches_limit: number;
  search_history_retention_days: number;
}

export interface PaymentSettings {
  escrow_hold_days: number;
  auto_release: boolean;
  dispute_period_days: number;
  minimum_payout: number;
  payout_schedule: string;
  supported_currencies: string[];
  payment_methods: TalentPaymentMethod[];
}

export interface MarketplaceMetrics {
  id: string;
  school_id: string;
  total_talents: number;
  total_employers: number;
  total_listings: number;
  active_listings: number;
  total_matches: number;
  successful_matches: number;
  match_rate: number;
  avg_time_to_match: number;
  total_transactions: number;
  total_volume: number;
  avg_transaction_value: number;
  platform_revenue: number;
  avg_rating: number;
  total_reviews: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TalentMatch {
  id: string;
  school_id: string;
  talent_id: string;
  listing_id: string;
  match_score: number;
  match_algorithm: MatchAlgorithm;
  match_factors: MatchFactor[];
  status: MatchStatus;
  initiated_by: string;
  initiated_at: string;
  responded_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export interface MatchFactor {
  factor: string;
  weight: number;
  score: number;
  contribution: number;
  explanation: string;
}

export interface TalentApplication {
  id: string;
  school_id: string;
  talent_id: string;
  listing_id: string;
  listing_type: MarketplaceType;
  cover_letter: string;
  proposed_rate: number;
  proposed_duration: string;
  relevant_experience: string;
  portfolio_links: string[];
  availability_date: string;
  status: ApplicationStatus;
  employer_feedback: string;
  interview_date: string;
  offer_amount: number;
  created_at: string;
  updated_at: string;
}

export interface TalentMessage {
  id: string;
  school_id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  subject: string;
  content: string;
  read: boolean;
  attachments: string[];
  reply_to: string;
  created_at: string;
  updated_at: string;
}

export interface TalentEscrow {
  id: string;
  school_id: string;
  payer_id: string;
  payee_id: string;
  listing_id: string;
  amount: number;
  currency: string;
  fee_amount: number;
  net_amount: number;
  status: string;
  release_conditions: string[];
  released_at: string;
  dispute_id: string;
  created_at: string;
  updated_at: string;
}

export interface TalentDispute {
  id: string;
  school_id: string;
  dispute_initiator_id: string;
  dispute_respondent_id: string;
  listing_id: string;
  escrow_id: string;
  dispute_type: string;
  description: string;
  evidence: string[];
  resolution: DisputeResolution;
  resolution_details: string;
  refund_amount: number;
  status: string;
  resolved_at: string;
  created_at: string;
  updated_at: string;
}

export interface TalentPortfolio {
  id: string;
  school_id: string;
  talent_id: string;
  portfolio_type: TalentPortfolioType;
  title: string;
  description: string;
  content_url: string;
  thumbnail_url: string;
  tags: string[];
  skills_demonstrated: string[];
  client: string;
  project_date: string;
  results: string;
  views: number;
  likes: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillAssessment {
  id: string;
  school_id: string;
  talent_id: string;
  skill_name: string;
  assessment_type: string;
  score: number;
  max_score: number;
  percentile: number;
  proficiency_level: string;
  verified: boolean;
  assessment_date: string;
  expires_at: string;
  platform: string;
  created_at: string;
  updated_at: string;
}

export interface TalentEndorsement {
  id: string;
  school_id: string;
  endorser_id: string;
  endorsee_id: string;
  endorsement_type: TalentEndorsementType;
  skill_name: string;
  relationship: string;
  comment: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface TalentAchievement {
  id: string;
  school_id: string;
  talent_id: string;
  achievement_type: string;
  title: string;
  description: string;
  earned_date: string;
  criteria: string[];
  badge_url: string;
  points: number;
  tier: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSubscription {
  id: string;
  school_id: string;
  talent_id: string;
  tier: TalentSubscriptionTier;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  price: number;
  currency: string;
  billing_cycle: string;
  features: string[];
  usage: SubscriptionUsage;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionUsage {
  listings_created: number;
  messages_sent: number;
  applications_submitted: number;
  searches_performed: number;
  premium_features_used: number;
}

export interface TalentNotification {
  id: string;
  school_id: string;
  user_id: string;
  notification_type: PlatformNotificationType;
  title: string;
  message: string;
  link: string;
  read: boolean;
  channel: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface TalentReport {
  id: string;
  school_id: string;
  reporter_id: string;
  reported_id: string;
  listing_id: string;
  report_type: string;
  reason: string;
  description: string;
  evidence: string[];
  status: string;
  action_taken: string;
  resolved_at: string;
  created_at: string;
  updated_at: string;
}

export interface TalentBenchmark {
  id: string;
  school_id: string;
  benchmark_name: string;
  category: string;
  metric: string;
  our_value: number;
  industry_average: number;
  top_performer: number;
  period: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceListingAnalytics {
  id: string;
  school_id: string;
  listing_id: string;
  views: number;
  unique_viewers: number;
  applications: number;
  saves: number;
  shares: number;
  time_on_page_avg: number;
  bounce_rate: number;
  conversion_rate: number;
  source_breakdown: Record<string, number>;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSearchHistory {
  id: string;
  school_id: string;
  user_id: string;
  query: string;
  filters: Record<string, unknown>;
  results_count: number;
  clicked_results: string[];
  application_submitted: boolean;
  search_date: string;
  created_at: string;
}

export interface TalentRecommendation {
  id: string;
  school_id: string;
  user_id: string;
  recommended_talent_id: string;
  recommendation_type: string;
  reason: string;
  match_score: number;
  factors: MatchFactor[];
  viewed: boolean;
  applied: boolean;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface TalentMarketplaceCategory {
  id: string;
  school_id: string;
  name: string;
  description: string;
  parent_id: string;
  listing_count: number;
  icon: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillTag {
  id: string;
  school_id: string;
  name: string;
  category: string;
  demand_level: SkillDemandLevel;
  talent_count: number;
  listing_count: number;
  avg_rate: number;
  trending: boolean;
  created_at: string;
  updated_at: string;
}

export interface TalentGeographicData {
  id: string;
  school_id: string;
  location: string;
  country: string;
  region: string;
  talent_count: number;
  employer_count: number;
  avg_rate: number;
  top_skills: string[];
  demand_supply_ratio: number;
  avg_response_time: number;
  created_at: string;
  updated_at: string;
}

export interface TalentIndustryData {
  id: string;
  school_id: string;
  industry: string;
  talent_count: number;
  listing_count: number;
  avg_rate: number;
  top_skills: string[];
  growth_rate: number;
  avg_time_to_fill: number;
  competition_level: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceTrend {
  id: string;
  school_id: string;
  trend_type: string;
  category: string;
  metric: string;
  current_value: number;
  previous_value: number;
  change_percentage: number;
  direction: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TalentContract {
  id: string;
  school_id: string;
  client_id: string;
  talent_id: string;
  listing_id: string;
  contract_type: string;
  start_date: string;
  end_date: string;
  rate: number;
  currency: string;
  payment_terms: string;
  deliverables: string[];
  milestones: MilestonePayment[];
  status: string;
  signed_by_client: boolean;
  signed_by_talent: boolean;
  signed_at: string;
  created_at: string;
  updated_at: string;
}

export interface TalentPayout {
  id: string;
  school_id: string;
  talent_id: string;
  amount: number;
  currency: string;
  fee: number;
  net_amount: number;
  payment_method: TalentPaymentMethod;
  status: string;
  processed_at: string;
  reference_number: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillGap {
  id: string;
  school_id: string;
  talent_id: string;
  skill_name: string;
  current_level: string;
  target_level: string;
  gap_score: number;
  recommended_courses: string[];
  estimated_time_to_close: number;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface TalentLearningPath {
  id: string;
  school_id: string;
  talent_id: string;
  name: string;
  description: string;
  target_role: string;
  courses: string[];
  estimated_duration: number;
  progress_percentage: number;
  skills_developed: string[];
  created_at: string;
  updated_at: string;
}

export interface TalentAnalytics {
  id: string;
  school_id: string;
  talent_id: string;
  profile_views: number;
  search_appearances: number;
  application_count: number;
  interview_count: number;
  offer_count: number;
  hire_count: number;
  conversion_rate: number;
  avg_response_time: number;
  avg_rating_received: number;
  earnings_total: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface EmployerAnalytics {
  id: string;
  school_id: string;
  employer_id: string;
  listings_posted: number;
  total_applicants: number;
  avg_applicants_per_listing: number;
  time_to_fill_avg: number;
  hire_rate: number;
  cost_per_hire: number;
  quality_of_hire_score: number;
  candidate_satisfaction: number;
  repeat_hire_rate: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TalentCompetitorAnalysis {
  id: string;
  school_id: string;
  talent_id: string;
  competitor_id: string;
  skill_overlap: number;
  rate_comparison: number;
  rating_comparison: number;
  experience_comparison: number;
  competitive_advantage: string[];
  improvement_areas: string[];
  created_at: string;
  updated_at: string;
}

export interface TalentSkillDemand {
  id: string;
  school_id: string;
  skill_name: string;
  demand_level: SkillDemandLevel;
  talent_supply: number;
  listing_demand: number;
  avg_rate: number;
  growth_rate: number;
  top_industries: string[];
  geographic_demand: Record<string, number>;
  trend: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceSearchOptimization {
  id: string;
  school_id: string;
  listing_id: string;
  search_rank: number;
  keyword_relevance: number;
  completeness_score: number;
  freshness_score: number;
  engagement_score: number;
  suggestions: string[];
  created_at: string;
  updated_at: string;
}

export interface TalentClientRelationship {
  id: string;
  school_id: string;
  talent_id: string;
  client_id: string;
  total_projects: number;
  total_earnings: number;
  avg_rating: number;
  relationship_duration_months: number;
  last_project_date: string;
  repeat_client: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillEndorsementRequest {
  id: string;
  school_id: string;
  requester_id: string;
  endorser_id: string;
  skill_name: string;
  relationship: string;
  message: string;
  status: string;
  responded_at: string;
  created_at: string;
  updated_at: string;
}

export interface TalentMarketplaceCampaign {
  id: string;
  school_id: string;
  campaign_name: string;
  campaign_type: string;
  target_audience: string[];
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  applications: number;
  conversion_rate: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillCertification {
  id: string;
  school_id: string;
  talent_id: string;
  certification_name: string;
  issuing_body: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
  verification_url: string;
  status: VerificationStatus;
  skills_validated: string[];
  created_at: string;
  updated_at: string;
}

export interface TalentAvailabilitySlot {
  id: string;
  school_id: string;
  talent_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone: string;
  recurring: boolean;
  specific_date: string;
  available: boolean;
  booking_type: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceLanguagePreference {
  id: string;
  school_id: string;
  user_id: string;
  primary_language: string;
  secondary_languages: string[];
  auto_translate: boolean;
  translation_quality: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSearchFilterPreset {
  id: string;
  school_id: string;
  user_id: string;
  preset_name: string;
  filters: Record<string, unknown>;
  sort_by: TalentSearchSortBy;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface TalentPortfolioAnalytics {
  id: string;
  school_id: string;
  portfolio_id: string;
  views: number;
  unique_viewers: number;
  likes: number;
  saves: number;
  shares: number;
  inquiries: number;
  hire_conversions: number;
  avg_view_duration: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillGapAnalysis {
  id: string;
  school_id: string;
  talent_id: string;
  analysis_date: string;
  current_skills: SkillAssessmentResult[];
  target_skills: SkillAssessmentResult[];
  gaps: SkillGap[];
  recommendations: string[];
  estimated_closing_time: number;
  created_at: string;
  updated_at: string;
}

export interface SkillAssessmentResult {
  skill_name: string;
  current_level: string;
  target_level: string;
  verified: boolean;
}

export interface SkillGap {
  skill_name: string;
  current_level: string;
  target_level: string;
  gap_score: number;
  priority: string;
  recommended_actions: string[];
}

export interface TalentMarketplaceFeedback {
  id: string;
  school_id: string;
  feedback_from: string;
  feedback_to: string;
  listing_id: string;
  feedback_type: TalentFeedbackType;
  rating: number;
  content: string;
  helpful: boolean;
  anonymous: boolean;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface TalentPaymentTransaction {
  id: string;
  school_id: string;
  payer_id: string;
  payee_id: string;
  amount: number;
  currency: string;
  fee: number;
  net_amount: number;
  transaction_type: string;
  payment_method: TalentPaymentMethod;
  status: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillMatchScore {
  id: string;
  school_id: string;
  talent_id: string;
  listing_id: string;
  overall_score: number;
  skill_match_score: number;
  experience_match_score: number;
  location_match_score: number;
  budget_match_score: number;
  availability_match_score: number;
  culture_fit_score: number;
  breakdown: MatchFactor[];
  created_at: string;
  updated_at: string;
}

export interface TalentMarketplaceFeature {
  id: string;
  school_id: string;
  feature_name: string;
  description: string;
  feature_type: string;
  enabled: boolean;
  premium_required: boolean;
  usage_count: number;
  max_usage: number;
  created_at: string;
  updated_at: string;
}

export interface TalentInvitation {
  id: string;
  school_id: string;
  inviter_id: string;
  invitee_id: string;
  listing_id: string;
  invitation_type: string;
  message: string;
  status: string;
  expires_at: string;
  accepted_at: string;
  created_at: string;
  updated_at: string;
}

export interface TalentMarketplaceReview {
  id: string;
  school_id: string;
  platform_reviewer_id: string;
  review_type: string;
  overall_rating: number;
  categories: Record<string, number>;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  would_recommend: boolean;
  response: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface TalentSkillGapClosingPlan {
  id: string;
  school_id: string;
  talent_id: string;
  plan_name: string;
  gaps_to_address: SkillGap[];
  courses: string[];
  estimated_duration_weeks: number;
  estimated_cost: number;
  milestones: string[];
  progress_percentage: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceAIBenchmark {
  id: string;
  school_id: string;
  benchmark_type: string;
  category: string;
  ai_score: number;
  human_score: number;
  correlation: number;
  sample_size: number;
  methodology: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TalentMarketplaceNotification {
  id: string;
  school_id: string;
  user_id: string;
  notification_type: PlatformNotificationType;
  title: string;
  message: string;
  action_url: string;
  read: boolean;
  priority: string;
  channel: string;
  created_at: string;
  updated_at: string;
}
