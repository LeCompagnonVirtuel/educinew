export enum PartnerType {
  UNESCO = 'unesco',
  UNICEF = 'unicef',
  WORLD_BANK = 'world_bank',
  AFRICAN_UNION = 'african_union',
  ECOWAS = 'ecowas',
  BILATERAL = 'bilateral',
  NGO = 'ngo',
  PRIVATE_SECTOR = 'private_sector',
  FOUNDATION = 'foundation',
  ACADEMIC = 'academic',
}

export enum PartnerStatus {
  PROSPECTIVE = 'prospective',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  COMPLETED = 'completed',
  TERMINATED = 'terminated',
  UNDER_REVIEW = 'under_review',
}

export enum ProjectType {
  CAPACITY_BUILDING = 'capacity_building',
  INFRASTRUCTURE = 'infrastructure',
  CURRICULUM = 'curriculum',
  TRAINING = 'training',
  RESEARCH = 'research',
  POLICY = 'policy',
  TECHNOLOGY = 'technology',
  SCHOLARSHIP = 'scholarship',
  EMERGENCY = 'emergency',
}

export enum ProjectStatus {
  PROPOSAL = 'proposal',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  ACTIVE = 'active',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXTENDED = 'extended',
}

export enum CooperationType {
  TECHNICAL = 'technical',
  FINANCIAL = 'financial',
  IN_KIND = 'in_kind',
  KNOWLEDGE = 'knowledge',
  SOUTH_SOUTH = 'south_south',
  TRIANGULAR = 'triangular',
}

export enum FundingSource {
  GRANT = 'grant',
  LOAN = 'loan',
  CONCESSIONAL = 'concessional',
  MIXED = 'mixed',
  IN_KIND = 'in_kind',
  CO_FINANCING = 'co_financing',
}

export enum ReportingStatus {
  ON_TIME = 'on_time',
  LATE = 'late',
  MISSING = 'missing',
  PARTIAL = 'partial',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum StatisticType {
  ENROLLMENT = 'enrollment',
  COMPLETION = 'completion',
  LITERACY = 'literacy',
  GENDER_PARITY = 'gender_parity',
  EDUCATION_INDEX = 'education_index',
  pupil_teacher_ratio = 'pupil_teacher_ratio',
  BUDGET = 'budget',
  AID_FLOW = 'aid_flow',
}

export enum AgreementStatus {
  DRAFT = 'draft',
  NEGOTIATION = 'negotiation',
  SIGNED = 'signed',
  ACTIVE = 'active',
  AMENDED = 'amended',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
}

export enum FrameworkType {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational',
  TECHNICAL = 'technical',
  FINANCIAL = 'financial',
  POLICY = 'policy',
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed',
  CANCELLED = 'cancelled',
}

export enum BudgetStatus {
  PLANNED = 'planned',
  COMMITTED = 'committed',
  DISBURSED = 'disbursed',
  EXPENDED = 'expended',
  REPORTED = 'reported',
}

export enum ReportType {
  PROGRESS = 'progress',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  AUDIT = 'audit',
  FINAL = 'final',
  ANNUAL = 'annual',
}

export enum DisbursementStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export enum ProjectPhase {
  IDENTIFICATION = 'identification',
  PREPARATION = 'preparation',
  APPRAISAL = 'appraisal',
  NEGOTIATION = 'negotiation',
  IMPLEMENTATION = 'implementation',
  SUPERVISION = 'supervision',
  EVALUATION = 'evaluation',
  COMPLETION = 'completion',
}

export enum CooperationLevel {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  SUB_REGIONAL = 'sub_regional',
  CONTINENTAL = 'continental',
  GLOBAL = 'global',
}

export enum AidEffectiveness {
  VERY_EFFECTIVE = 'very_effective',
  EFFECTIVE = 'effective',
  MODERATELY_EFFECTIVE = 'moderately_effective',
  INEFFECTIVE = 'ineffective',
  VERY_INEFFECTIVE = 'very_ineffective',
}

export enum CapacityBuildingArea {
  PLANNING = 'planning',
  MANAGEMENT = 'management',
  TEACHING = 'teaching',
  ASSESSMENT = 'assessment',
  FINANCE = 'finance',
  TECHNOLOGY = 'technology',
  MONITORING = 'monitoring',
  GOVERNANCE = 'governance',
}

export enum ScholarshipType {
  FULL = 'full',
  PARTIAL = 'partial',
  TUITION_ONLY = 'tuition_only',
  LIVING_EXPENSE = 'living_expense',
  TRAVEL = 'travel',
}

export enum GenderFocus {
  GENDER_NEUTRAL = 'gender_neutral',
  GIRLS_EDUCATION = 'girls_education',
  BOYS_EDUCATION = 'boys_education',
  GENDER_PARITY = 'gender_parity',
}

export enum SectorFocus {
  PRIMARY_EDUCATION = 'primary_education',
  SECONDARY_EDUCATION = 'secondary_education',
  TERTIARY_EDUCATION = 'tertiary_education',
  TECHNICAL_EDUCATION = 'technical_education',
  EARLY_CHILDHOOD = 'early_childhood',
  ADULT_EDUCATION = 'adult_education',
  TEACHER_EDUCATION = 'teacher_education',
}

export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum StakeholderCategory {
  GOVERNMENT = 'government',
  INTERNATIONAL = 'international',
  CIVIL_SOCIETY = 'civil_society',
  PRIVATE_SECTOR = 'private_sector',
  ACADEMIC = 'academic',
  COMMUNITY = 'community',
}

export enum OutcomeLevel {
  IMPACT = 'impact',
  OUTCOME = 'outcome',
  OUTPUT = 'output',
  ACTIVITY = 'activity',
}

export enum IndicatorDirection {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

export enum SustainabilityLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  NOT_SUSTAINABLE = 'not_sustainable',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RiskStatus {
  IDENTIFIED = 'identified',
  MITIGATED = 'mitigated',
  MONITORED = 'monitored',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved',
}

export enum ProcurementType {
  COMPETITIVE = 'competitive',
  DIRECT = 'direct',
  CONSULTING = 'consulting',
  IN_KIND = 'in_kind',
}

export enum EvaluationType {
  BASELINE = 'baseline',
  MID_TERM = 'mid_term',
  FINAL = 'final',
  EX_POST = 'ex_post',
  THEMATIC = 'thematic',
}

export enum DocumentType {
  AGREEMENT = 'agreement',
  REPORT = 'report',
  PROPOSAL = 'proposal',
  BUDGET = 'budget',
  EVALUATION = 'evaluation',
  POLICY = 'policy',
  GUIDELINE = 'guideline',
  MANIFEST = 'manifest',
}

export enum CertificationStatus {
  PENDING = 'pending',
  CERTIFIED = 'certified',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
}

export enum AidChannel {
  BILATERAL = 'bilateral',
  MULTILATERAL = 'multilateral',
  NGO = 'ngo',
  PRIVATE_FOUNDATION = 'private_foundation',
  DIASPORA = 'diaspora',
}

export enum DataCollectionFrequency {
  REAL_TIME = 'real_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
}

export enum StatisticalSource {
  UNESCO_UIS = 'unesco_uis',
  WORLD_BANK = 'world_bank',
  UNICEF = 'unicef',
  AFRICAN_DEVELOPMENT_BANK = 'african_development_bank',
  ECOWAS = 'ecowas',
  NATIONAL = 'national',
  OTHER = 'other',
}

export enum GeographicCoverage {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  LOCAL = 'local',
  TARGETED = 'targeted',
}

export enum TimeFrameType {
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
}

export enum PartnershipPriority {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational',
  EXPLORATORY = 'exploratory',
}

export enum CooperationStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
  TERMINATED = 'terminated',
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  WORD = 'word',
  HTML = 'html',
}

export enum VisibilityLevel {
  PUBLIC = 'public',
  RESTRICTED = 'restricted',
  CONFIDENTIAL = 'confidential',
}

export enum BeneficiaryType {
  STUDENTS = 'students',
  TEACHERS = 'teachers',
  SCHOOLS = 'schools',
  COMMUNITIES = 'communities',
  GOVERNMENT = 'government',
}

export enum InternationalFramework {
  SDG_4 = 'sdg_4',
  AGENDA_2063 = 'agenda_2063',
  EDUCATION_2030 = 'education_2030',
  ECOWAS_EDUCATION = 'ecowas_education',
  NATIONAL_PLAN = 'national_plan',
}

export interface InternationalPartner {
  id: string;
  name: string;
  code: string;
  type: PartnerType;
  status: PartnerStatus;
  country: string;
  region: string;
  website: string | null;
  logo_url: string | null;
  description: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  partnership_start_date: string;
  partnership_end_date: string | null;
  total_funding: number;
  active_projects: number;
  certification_status: CertificationStatus;
  priority_level: PriorityLevel;
  gender_focus: GenderFocus;
  sector_focus: SectorFocus[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnerProfile {
  id: string;
  partner_id: string;
  mission: string;
  vision: string;
  values: string[];
  expertise_areas: string[];
  target_countries: string[];
  funding_capacity: number;
  annual_budget: number;
  staff_count: number;
  office_locations: string[];
  languages: string[];
  legal_status: string;
  registration_date: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalProject {
  id: string;
  partner_id: string;
  name: string;
  code: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  phase: ProjectPhase;
  cooperation_type: CooperationType;
  funding_source: FundingSource;
  sector_focus: SectorFocus;
  gender_focus: GenderFocus;
  geographic_coverage: GeographicCoverage;
  start_date: string;
  end_date: string;
  actual_end_date: string | null;
  total_budget: number;
  disbursed_amount: number;
  spent_amount: number;
  currency: string;
  beneficiaries_count: number;
  beneficiary_type: BeneficiaryType;
  objectives: string[];
  expected_outcomes: string[];
  actual_outcomes: string[];
  sustainability_level: SustainabilityLevel;
  overall_rating: AidEffectiveness;
  framework: InternationalFramework;
  region_id: string | null;
  school_ids: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProjectMilestone {
  id: string;
  project_id: string;
  name: string;
  description: string;
  phase: ProjectPhase;
  target_date: string;
  actual_date: string | null;
  completion_percentage: number;
  status: MilestoneStatus;
  deliverables: string[];
  responsible_person: string;
  dependencies: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectBudget {
  id: string;
  project_id: string;
  category: string;
  description: string;
  planned_amount: number;
  committed_amount: number;
  disbursed_amount: number;
  spent_amount: number;
  variance: number;
  currency: string;
  fiscal_year: number;
  quarter: number;
  status: BudgetStatus;
  disbursement_status: DisbursementStatus;
  justification: string | null;
  created_at: string;
  updated_at: string;
}

export interface BilateralAgreement {
  id: string;
  partner_id: string;
  name: string;
  code: string;
  description: string;
  type: FrameworkType;
  status: AgreementStatus;
  cooperation_type: CooperationType;
  country_a: string;
  country_b: string;
  sign_date: string;
  effective_date: string;
  expiry_date: string | null;
  renewal_date: string | null;
  total_value: number;
  currency: string;
  terms: string[];
  obligations_country_a: string[];
  obligations_country_b: string[];
  dispute_mechanism: string;
  termination_clause: string;
  documents: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationFramework {
  id: string;
  name: string;
  code: string;
  description: string;
  type: FrameworkType;
  level: CooperationLevel;
  partner_ids: string[];
  country: string;
  start_date: string;
  end_date: string;
  objectives: string[];
  strategic_alignment: string[];
  governance_structure: Record<string, unknown>;
  monitoring_mechanism: string;
  review_frequency: string;
  status: CooperationStatus;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface InternationalStatistic {
  id: string;
  country: string;
  statistic_type: StatisticType;
  source: StatisticalSource;
  value: number;
  previous_value: number | null;
  year: number;
  unit: string;
  education_level: string;
  gender: string | null;
  region: string | null;
  data_quality: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface StatisticalReport {
  id: string;
  title: string;
  description: string;
  report_type: ReportType;
  frequency: DataCollectionFrequency;
  coverage: GeographicCoverage;
  period_start: string;
  period_end: string;
  country: string;
  region: string | null;
  indicators: StatisticalIndicator[];
  summary: string;
  methodology: string;
  limitations: string;
  recommendations: string[];
  format: ReportFormat;
  visibility: VisibilityLevel;
  author: string;
  reviewed_by: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface StatisticalIndicator {
  id: string;
  report_id: string;
  name: string;
  value: number;
  unit: string;
  direction: IndicatorDirection;
  comparison_value: number | null;
  comparison_year: number | null;
  source: StatisticalSource;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AidFlow {
  id: string;
  source_country: string;
  source_organization: string;
  destination_country: string;
  channel: AidChannel;
  amount: number;
  currency: string;
  usd_equivalent: number;
  year: number;
  sector: string;
  purpose: string;
  type: FundingSource;
  is earmarked: boolean;
  conditions: string[];
  status: DisbursementStatus;
  disbursement_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartnershipConfig {
  id: string;
  name: string;
  description: string;
  default_currency: string;
  reporting_frequency: DataCollectionFrequency;
  required_documents: DocumentType[];
  approval_workflow: string[];
  notification_channels: string[];
  auto_reminder_days: number;
  created_at: string;
  updated_at: string;
}

export interface PartnershipMetrics {
  id: string;
  total_partners: number;
  active_partners: number;
  total_projects: number;
  active_projects: number;
  total_budget: number;
  disbursed_amount: number;
  spent_amount: number;
  execution_rate: number;
  average_effectiveness: AidEffectiveness;
  beneficiaries_reached: number;
  countries_covered: number;
  created_at: string;
  updated_at: string;
}

export interface CapacityBuildingProgram {
  id: string;
  name: string;
  description: string;
  partner_id: string;
  project_id: string | null;
  area: CapacityBuildingArea;
  target_group: string;
  participants_count: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  budget: number;
  trainer: string;
  location: string;
  status: ProjectStatus;
  outcomes: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ScholarshipProgram {
  id: string;
  name: string;
  description: string;
  partner_id: string;
  scholarship_type: ScholarshipType;
  level: string;
  country: string;
  total_scholarships: number;
  awarded_scholarships: number;
  amount_per_scholarship: number;
  currency: string;
  duration_months: number;
  application_deadline: string;
  start_date: string;
  eligibility_criteria: string[];
  selection_criteria: string[];
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProjectEvaluation {
  id: string;
  project_id: string;
  evaluation_type: EvaluationType;
  evaluator_name: string;
  evaluator_organization: string;
  start_date: string;
  end_date: string;
  overall_rating: AidEffectiveness;
  criteria_ratings: EvaluationCriterionRating[];
  findings: string[];
  recommendations: string[];
  lessons_learned: string[];
  report_url: string | null;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EvaluationCriterionRating {
  criterion: string;
  rating: AidEffectiveness;
  score: number;
  comments: string;
}

export interface ProjectRisk {
  id: string;
  project_id: string;
  description: string;
  category: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  overall_risk: RiskLevel;
  mitigation_strategy: string;
  contingency_plan: string;
  responsible_person: string;
  status: RiskStatus;
  identified_date: string;
  last_reviewed: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectReport {
  id: string;
  project_id: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  title: string;
  summary: string;
  achievements: string[];
  challenges: string[];
  financial_summary: FinancialSummary;
  progress_percentage: number;
  next_steps: string[];
  prepared_by: string;
  reviewed_by: string | null;
  approved_by: string | null;
  status: ReportingStatus;
  submitted_date: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FinancialSummary {
  total_budget: number;
  spent_to_date: number;
  remaining_budget: number;
  planned_this_period: number;
  actual_this_period: number;
  variance: number;
  currency: string;
}

export interface StakeholderMapping {
  id: string;
  project_id: string;
  name: string;
  category: StakeholderCategory;
  interest_level: PriorityLevel;
  influence_level: PriorityLevel;
  engagement_strategy: string;
  contact_person: string;
  contact_email: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface InternationalFrameworkAlignment {
  id: string;
  project_id: string;
  framework: InternationalFramework;
  alignment_score: number;
  alignment_description: string;
  contributing_indicators: string[];
  gaps: string[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectDocument {
  id: string;
  project_id: string;
  name: string;
  type: DocumentType;
  file_url: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  version: number;
  is_confidential: boolean;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipAudit {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  changes: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerMeeting {
  id: string;
  partner_id: string;
  project_id: string | null;
  title: string;
  description: string;
  meeting_date: string;
  duration_minutes: number;
  attendees: string[];
  agenda: string[];
  decisions: string[];
  action_items: MeetingActionItem[];
  minutes_url: string | null;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface MeetingActionItem {
  item: string;
  responsible: string;
  deadline: string;
  status: ProjectStatus;
}

export interface PartnerDueDiligence {
  id: string;
  partner_id: string;
  assessment_date: string;
  financial_stability: number;
  governance_score: number;
  technical_capacity: number;
  reputation_score: number;
  compliance_score: number;
  overall_score: number;
  findings: string[];
  recommendations: string[];
  next_review_date: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectImplementationLog {
  id: string;
  project_id: string;
  log_date: string;
  activity_description: string;
  progress_percentage: number;
  issues_encountered: string[];
  solutions_applied: string[];
  resources_used: string[];
  budget_spent: number;
  logged_by: string;
  created_at: string;
  updated_at: string;
}

export interface CooperationMou {
  id: string;
  partner_id: string;
  title: string;
  description: string;
  effective_date: string;
  expiry_date: string;
  scope: string;
  key_terms: string[];
  renewal_conditions: string[];
  status: AgreementStatus;
  document_url: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalTrainingProgram {
  id: string;
  name: string;
  description: string;
  partner_id: string;
  project_id: string | null;
  training_area: CapacityBuildingArea;
  location: string;
  country: string;
  start_date: string;
  end_date: string;
  participants_count: number;
  participant_countries: string[];
  total_cost: number;
  funding_source: FundingSource;
  status: ProjectStatus;
  outcomes: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipKpi {
  id: string;
  partner_id: string;
  kpi_name: string;
  target_value: number;
  current_value: number;
  unit: string;
  measurement_frequency: DataCollectionFrequency;
  fiscal_year: number;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationForum {
  id: string;
  name: string;
  description: string;
  forum_type: FrameworkType;
  level: CooperationLevel;
  member_countries: string[];
  meeting_frequency: string;
  next_meeting: string;
  chairperson: string;
  secretariat: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface AidProjectPipeline {
  id: string;
  project_name: string;
  potential_partners: string[];
  estimated_budget: number;
  sector: string;
  target_country: string;
  stage: ProjectPhase;
  probability_of_funding: number;
  expected_start: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerContactPerson {
  id: string;
  partner_id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  role: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface CooperationJointCommittee {
  id: string;
  name: string;
  partner_ids: string[];
  country: string;
  chairperson_country: string;
  chairperson_partner: string;
  meeting_frequency: string;
  last_meeting: string;
  next_meeting: string;
  members: CommitteeMember[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface CommitteeMember {
  name: string;
  organization: string;
  role: string;
  country: string;
}

export interface ProjectCoFinancing {
  id: string;
  project_id: string;
  co_financier_id: string;
  amount: number;
  currency: string;
  conditions: string[];
  disbursement_schedule: string;
  status: DisbursementStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnerPerformanceReview {
  id: string;
  partner_id: string;
  review_period: string;
  project_delivery_score: number;
  financial_management_score: number;
  reporting_score: number;
  communication_score: number;
  overall_score: number;
  strengths: string[];
  areas_for_improvement: string[];
  reviewer: string;
  review_date: string;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface InternationalConference {
  id: string;
  name: string;
  description: string;
  organizer: string;
  location: string;
  country: string;
  start_date: string;
  end_date: string;
  participants_count: number;
  countries_represented: number;
  topics: string[];
  outcomes: string[];
  delegate_list: string[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationIndicator {
  id: string;
  name: string;
  description: string;
  unit: string;
  target_value: number;
  current_value: number;
  measurement_method: string;
  frequency: DataCollectionFrequency;
  responsible_entity: string;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface BilateralExchange {
  id: string;
  agreement_id: string;
  exchange_type: string;
  description: string;
  participants_count: number;
  duration_days: number;
  country_origin: string;
  country_destination: string;
  objectives: string[];
  outcomes: string[];
  cost: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipImpactStudy {
  id: string;
  partner_id: string;
  project_id: string | null;
  study_date: string;
  beneficiaries_reached: number;
  outcomes_achieved: string[];
  sustainability_assessment: string;
  cost_effectiveness: number;
  social_impact_score: number;
  economic_impact_score: number;
  recommendations: string[];
  report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CooperationWorkPlan {
  id: string;
  framework_id: string;
  fiscal_year: number;
  objectives: WorkPlanObjective[];
  total_budget: number;
  approved_by: string;
  approval_date: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkPlanObjective {
  name: string;
  description: string;
  activities: string[];
  budget: number;
  timeline: string;
  responsible: string;
}

export interface AidEffectivenessScore {
  id: string;
  country: string;
  year: number;
  ownership_score: number;
  alignment_score: number;
  harmonization_score: number;
  results_orientation: number;
  mutual_accountability: number;
  overall_score: number;
  data_source: StatisticalSource;
  created_at: string;
  updated_at: string;
}

export interface SouthSouthCooperation {
  id: string;
  name: string;
  description: string;
  participating_countries: string[];
  lead_country: string;
  focus_area: string;
  knowledge_shared: string[];
  technical_experts: number;
  outcomes: string[];
  funding_amount: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipCommunicationPlan {
  id: string;
  partner_id: string;
  communication_type: string;
  frequency: string;
  channels: string[];
  target_audience: string;
  key_messages: string[];
  responsible_person: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationDonorProfile {
  id: string;
  donor_name: string;
  donor_type: PartnerType;
  country: string;
  total_commitments: number;
  total_disbursements: number;
  active_projects: number;
  priority_sectors: string[];
  programming_approach: string;
  contact_information: Record<string, string>;
  status: PartnerStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectProcurement {
  id: string;
  project_id: string;
  procurement_title: string;
  procurement_type: ProcurementType;
  estimated_cost: number;
  actual_cost: number;
  vendor: string;
  contract_start: string;
  contract_end: string;
  deliverables: string[];
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationCountryProfile {
  id: string;
  country: string;
  income_level: string;
  education_expenditure_gdp: number;
  aid_received: number;
  partner_count: number;
  active_projects: number;
  education_indicators: Record<string, number>;
  cooperation_priorities: string[];
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalDonorMeeting {
  id: string;
  meeting_date: string;
  donor_name: string;
  attendees: string[];
  agenda: string[];
  commitments_discussed: number;
  decisions_made: string[];
  follow_up_actions: MeetingActionItem[];
  minutes_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartnershipRiskRegister {
  id: string;
  partner_id: string;
  risk_description: string;
  risk_category: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  overall_risk: RiskLevel;
  mitigation_strategy: string;
  contingency_plan: string;
  risk_owner: string;
  status: RiskStatus;
  last_reviewed: string;
  created_at: string;
  updated_at: string;
}

export interface CooperationProjectSite {
  id: string;
  project_id: string;
  site_name: string;
  location: string;
  latitude: number;
  longitude: number;
  beneficiaries_count: number;
  implementation_status: string;
  photos: string[];
  visits: ProjectVisit[];
  created_at: string;
  updated_at: string;
}

export interface ProjectVisit {
  visit_date: string;
  visitor: string;
  findings: string[];
  recommendations: string[];
}

export interface PartnershipResourceMapping {
  id: string;
  partner_id: string;
  resource_type: string;
  description: string;
  quantity: number;
  unit: string;
  availability: string;
  cost: number;
  created_at: string;
  updated_at: string;
}

export interface InternationalScholarProfile {
  id: string;
  scholarship_id: string;
  student_name: string;
  country: string;
  institution: string;
  field_of_study: string;
  degree_level: string;
  start_date: string;
  expected_end_date: string;
  gpa: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationProgressDashboard {
  id: string;
  partner_id: string | null;
  fiscal_year: number;
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  total_budget: number;
  execution_rate: number;
  beneficiaries_reached: number;
  key_achievements: string[];
  challenges: string[];
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectResultFramework {
  id: string;
  project_id: string;
  impact_goal: string;
  outcomes: ResultOutcome[];
  outputs: ResultOutput[];
  created_at: string;
  updated_at: string;
}

export interface ResultOutcome {
  name: string;
  indicators: ResultIndicator[];
}

export interface ResultOutput {
  name: string;
  indicators: ResultIndicator[];
}

export interface ResultIndicator {
  name: string;
  baseline: number;
  target: number;
  actual: number;
  unit: string;
  means_of_verification: string;
}

export interface CooperationTender {
  id: string;
  project_id: string;
  tender_title: string;
  description: string;
  estimated_value: number;
  currency: string;
  submission_deadline: string;
  evaluation_criteria: string[];
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnerFinancialReport {
  id: string;
  partner_id: string;
  fiscal_year: number;
  quarter: number;
  total_revenue: number;
  total_expenditure: number;
  project_expenditure: number;
  administrative_cost: number;
  audit_status: ReportingStatus;
  report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CooperationTechnologyTransfer {
  id: string;
  partner_id: string;
  project_id: string | null;
  technology_name: string;
  description: string;
  transfer_type: CooperationType;
  source_country: string;
  target_country: string;
  cost: number;
  training_included: boolean;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipCapacityAssessment {
  id: string;
  partner_id: string;
  assessment_date: string;
  governance_capacity: number;
  financial_management_capacity: number;
  technical_capacity: number;
  monitoring_capacity: number;
  hr_capacity: number;
  overall_capacity: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface CooperationMoURegistry {
  id: string;
  partner_id: string;
  mou_title: string;
  signed_date: string;
  effective_date: string;
  expiry_date: string;
  status: AgreementStatus;
  document_url: string;
  renewal_count: number;
  created_at: string;
  updated_at: string;
}

export enum PartnershipCategory {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational',
  TECHNICAL = 'technical',
  FINANCIAL = 'financial',
  SOUTH_SOUTH = 'south_south',
}

export enum AidInstrument {
  PROJECT = 'project',
  PROGRAM = 'program',
  BUDGET_SUPPORT = 'budget_support',
  SECTOR_WIDE = 'sector_wide',
  TRUST_FUND = 'trust_fund',
}

export enum CooperationOutcome {
  CAPACITY_BUILT = 'capacity_built',
  INFRASTRUCTURE_CREATED = 'infrastructure_created',
  POLICY_CHANGED = 'policy_changed',
  SYSTEMS_IMPROVED = 'systems_improved',
  KNOWLEDGE_SHARED = 'knowledge_shared',
}

export enum PartnershipRiskCategory {
  FINANCIAL = 'financial',
  OPERATIONAL = 'operational',
  POLITICAL = 'political',
  REPUTATIONAL = 'reputational',
  TECHNICAL = 'technical',
}

export enum AidEffectivenessPrinciple {
  OWNERSHIP = 'ownership',
  ALIGNMENT = 'alignment',
  HARMONIZATION = 'harmonization',
  RESULTS = 'results',
  MUTUAL_ACCOUNTABILITY = 'mutual_accountability',
}

export enum CooperationModality {
  BILATERAL = 'bilateral',
  MULTILATERAL = 'multilateral',
  TRIANGULAR = 'triangular',
  SOUTH_SOUTH = 'south_south',
}

export enum FundingStatus {
  COMMITTED = 'committed',
  DISBURSED = 'disbursed',
  UTILIZED = 'utilized',
  UNUTILIZED = 'unutilized',
  REFUNDED = 'refunded',
}

export interface PartnershipRiskRegister {
  id: string;
  partner_id: string;
  risk_description: string;
  risk_category: PartnershipRiskCategory;
  likelihood: RiskLevel;
  impact: RiskLevel;
  overall_risk: RiskLevel;
  mitigation_strategy: string;
  contingency_plan: string;
  risk_owner: string;
  status: RiskStatus;
  last_reviewed: string;
  created_at: string;
  updated_at: string;
}

export interface CooperationProjectSite {
  id: string;
  project_id: string;
  site_name: string;
  location: string;
  latitude: number;
  longitude: number;
  beneficiaries_count: number;
  implementation_status: string;
  photos: string[];
  visits: ProjectVisit[];
  created_at: string;
  updated_at: string;
}

export interface ProjectVisit {
  visit_date: string;
  visitor: string;
  findings: string[];
  recommendations: string[];
}

export interface PartnershipResourceMapping {
  id: string;
  partner_id: string;
  resource_type: string;
  description: string;
  quantity: number;
  unit: string;
  availability: string;
  cost: number;
  created_at: string;
  updated_at: string;
}

export interface InternationalScholarProfile {
  id: string;
  scholarship_id: string;
  student_name: string;
  country: string;
  institution: string;
  field_of_study: string;
  degree_level: string;
  start_date: string;
  expected_end_date: string;
  gpa: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationProgressDashboard {
  id: string;
  partner_id: string | null;
  fiscal_year: number;
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  total_budget: number;
  execution_rate: number;
  beneficiaries_reached: number;
  key_achievements: string[];
  challenges: string[];
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectResultFramework {
  id: string;
  project_id: string;
  impact_goal: string;
  outcomes: ResultOutcome[];
  outputs: ResultOutput[];
  created_at: string;
  updated_at: string;
}

export interface ResultOutcome {
  name: string;
  indicators: ResultIndicator[];
}

export interface ResultOutput {
  name: string;
  indicators: ResultIndicator[];
}

export interface ResultIndicator {
  name: string;
  baseline: number;
  target: number;
  actual: number;
  unit: string;
  means_of_verification: string;
}

export interface CooperationTender {
  id: string;
  project_id: string;
  tender_title: string;
  description: string;
  estimated_value: number;
  currency: string;
  submission_deadline: string;
  evaluation_criteria: string[];
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnerFinancialReport {
  id: string;
  partner_id: string;
  fiscal_year: number;
  quarter: number;
  total_revenue: number;
  total_expenditure: number;
  project_expenditure: number;
  administrative_cost: number;
  audit_status: ReportingStatus;
  report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CooperationTechnologyTransfer {
  id: string;
  partner_id: string;
  project_id: string | null;
  technology_name: string;
  description: string;
  transfer_type: CooperationType;
  source_country: string;
  target_country: string;
  cost: number;
  training_included: boolean;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipCapacityAssessment {
  id: string;
  partner_id: string;
  assessment_date: string;
  governance_capacity: number;
  financial_management_capacity: number;
  technical_capacity: number;
  monitoring_capacity: number;
  hr_capacity: number;
  overall_capacity: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface CooperationMoURegistry {
  id: string;
  partner_id: string;
  mou_title: string;
  signed_date: string;
  effective_date: string;
  expiry_date: string;
  status: AgreementStatus;
  document_url: string;
  renewal_count: number;
  created_at: string;
  updated_at: string;
}

export interface PartnershipAgreementAmendment {
  id: string;
  agreement_id: string;
  amendment_number: number;
  description: string;
  changes: string[];
  effective_date: string;
  approved_by: string;
  approval_date: string;
  status: AgreementStatus;
  created_at: string;
  updated_at: string;
}

export interface AidFlowTracker {
  id: string;
  flow_id: string;
  tracking_date: string;
  amount_disbursed: number;
  amount_utilized: number;
  utilization_rate: number;
  pipeline_months: number;
  bottlenecks: string[];
  created_at: string;
  updated_at: string;
}

export interface CooperationMeetingMinutes {
  id: string;
  meeting_id: string;
  content: string;
  decisions: string[];
  action_items: MeetingActionItem[];
  next_meeting_date: string;
  minutes_taker: string;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipVisibilityReport {
  id: string;
  partner_id: string;
  project_id: string | null;
  report_date: string;
  publications: number;
  media_mentions: number;
  social_media_reach: number;
  events_organized: number;
  visibility_score: number;
  created_at: string;
  updated_at: string;
}

export interface InternationalCooperationFramework {
  id: string;
  framework_name: string;
  framework_type: FrameworkType;
  participating_countries: string[];
  objectives: string[];
  governance_structure: Record<string, unknown>;
  funding_mechanism: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationAlignmentAssessment {
  id: string;
  project_id: string;
  framework_id: string;
  alignment_score: number;
  alignment_areas: string[];
  gaps: string[];
  recommendations: string[];
  assessed_by: string;
  assessment_date: string;
  created_at: string;
  updated_at: string;
}

export interface PartnershipInnovationFund {
  id: string;
  fund_name: string;
  partner_id: string;
  total_budget: number;
  available_budget: number;
  innovation_areas: string[];
  application_deadline: string;
  selection_criteria: string[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationJointPublication {
  id: string;
  title: string;
  description: string;
  authors: string[];
  publication_date: string;
  journal: string;
  doi: string | null;
  partners_involved: string[];
  project_id: string | null;
  access_url: string;
  created_at: string;
  updated_at: string;
}

export interface PartnershipDisbursementTracker {
  id: string;
  project_id: string;
  partner_id: string;
  total_commitment: number;
  total_disbursed: number;
  pending_disbursement: number;
  disbursement_rate: number;
  next_disbursement_date: string;
  conditions_met: boolean;
  created_at: string;
  updated_at: string;
}

export interface CooperationCapacityMapping {
  id: string;
  partner_id: string;
  capacity_area: CapacityBuildingArea;
  current_level: number;
  target_level: number;
  gap: number;
  training_needed: string[];
  estimated_cost: number;
  timeline_months: number;
  created_at: string;
  updated_at: string;
}

export interface PartnershipGrantApplication {
  id: string;
  grant_name: string;
  donor_id: string;
  project_id: string | null;
  requested_amount: number;
  approved_amount: number | null;
  submission_date: string;
  decision_date: string | null;
  grant_period_start: string;
  grant_period_end: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationStakeholderEngagement {
  id: string;
  project_id: string;
  stakeholder_name: string;
  stakeholder_type: StakeholderCategory;
  engagement_level: string;
  engagement_method: string;
  frequency: string;
  satisfaction_score: number;
  feedback: string;
  created_at: string;
  updated_at: string;
}

export interface AidConditionality {
  id: string;
  agreement_id: string;
  condition_text: string;
  condition_type: string;
  sector: string;
  deadline: string;
  status: ProjectStatus;
  verification_method: string;
  created_at: string;
  updated_at: string;
}

export interface CooperationSouthSouthRecord {
  id: string;
  knowledge_product: string;
  source_country: string;
  destination_country: string;
  transfer_type: CooperationType;
  beneficiaries: number;
  impact_description: string;
  year: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipGeographicFocus {
  id: string;
  partner_id: string;
  region: string;
  country: string;
  focus_areas: string[];
  active_projects: number;
  total_investment: number;
  beneficiary_count: number;
  created_at: string;
  updated_at: string;
}

export interface CooperationReportingCalendar {
  id: string;
  partner_id: string;
  project_id: string | null;
  report_type: ReportType;
  due_date: string;
  submitted_date: string | null;
  status: ReportingStatus;
  reviewer: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartnershipInnovationProject {
  id: string;
  project_name: string;
  description: string;
  partner_id: string;
  innovation_type: string;
  budget: number;
  implementation_period: number;
  expected_outcomes: string[];
  risk_level: RiskLevel;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationSustainabilityPlan {
  id: string;
  project_id: string;
  sustainability_factors: string[];
  exit_strategy: string;
  ownership_transfer: string;
  funding_continuity: string;
  capacity_retention: string;
  sustainability_score: number;
  created_at: string;
  updated_at: string;
}

export interface CooperationProjectPhase {
  id: string;
  project_id: string;
  phase_name: string;
  phase_number: number;
  start_date: string;
  end_date: string;
  budget_allocated: number;
  budget_spent: number;
  completion_percentage: number;
  milestones: string[];
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipJointVenture {
  id: string;
  venture_name: string;
  partner_ids: string[];
  country: string;
  sector: string;
  investment_amount: number;
  equity_split: Record<string, number>;
  governance_structure: Record<string, unknown>;
  expected_roi: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationDataExchange {
  id: string;
  exchange_name: string;
  source_partner: string;
  target_partner: string;
  data_type: string;
  frequency: DataCollectionFrequency;
  format: string;
  volume_records: number;
  last_exchange: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipCapacityGrant {
  id: string;
  grant_name: string;
  partner_id: string;
  amount: number;
  currency: string;
  purpose: string;
  conditions: string[];
  disbursement_schedule: string;
  reporting_requirements: string[];
  status: DisbursementStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationSectorAllocation {
  id: string;
  partner_id: string;
  fiscal_year: number;
  sector: string;
  allocated_amount: number;
  disbursed_amount: number;
  utilized_amount: number;
  beneficiary_count: number;
  outcomes: string[];
  created_at: string;
  updated_at: string;
}

export interface PartnershipBenchmark {
  id: string;
  benchmark_name: string;
  description: string;
  metric: string;
  target_value: number;
  current_value: number;
  unit: string;
  measurement_method: string;
  frequency: DataCollectionFrequency;
  created_at: string;
  updated_at: string;
}

export interface CooperationFieldVisit {
  id: string;
  visit_name: string;
  project_id: string;
  visit_date: string;
  visitors: string[];
  sites_visited: string[];
  findings: string[];
  photos: string[];
  report_url: string | null;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipResourceMobilization {
  id: string;
  campaign_name: string;
  target_amount: number;
  raised_amount: number;
  donor_count: number;
  campaign_start: string;
  campaign_end: string;
  resource_mobilization_rate: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationPeerLearning {
  id: string;
  program_name: string;
  description: string;
  participating_countries: string[];
  focus_area: string;
  sessions_count: number;
  participants_count: number;
  outcomes: string[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipAdvocacy {
  id: string;
  advocacy_title: string;
  partner_id: string;
  target_audience: string;
  key_messages: string[];
  channels: string[];
  reach_estimate: number;
  impact_score: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationCountryDialogue {
  id: string;
  dialogue_name: string;
  country: string;
  partner_ids: string[];
  meeting_date: string;
  agenda: string[];
  commitments: string[];
  follow_up_actions: MeetingActionItem[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipAidArchitecture {
  id: string;
  architecture_name: string;
  description: string;
  partner_ids: string[];
  coordination_mechanism: string;
  funding_modalities: string[];
  governance_structure: Record<string, unknown>;
  effectiveness_principles: AidEffectivenessPrinciple[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationCapacityWorkshop {
  id: string;
  workshop_name: string;
  description: string;
  partner_id: string;
  training_area: CapacityBuildingArea;
  location: string;
  start_date: string;
  end_date: string;
  facilitators: string[];
  participants_count: number;
  evaluation_score: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipFiduciaryAssessment {
  id: string;
  partner_id: string;
  assessment_date: string;
  financial_systems_score: number;
  procurement_score: number;
  internal_controls_score: number;
  audit_score: number;
  overall_fiduciary_score: number;
  findings: string[];
  recommendations: string[];
  next_assessment_date: string;
  created_at: string;
  updated_at: string;
}

export interface CooperationBudgetSupport {
  id: string;
  support_name: string;
  partner_id: string;
  country: string;
  amount: number;
  currency: string;
  sector: string;
  conditions: string[];
  disbursement_triggers: string[];
  fiduciary_assessment_score: number;
  status: DisbursementStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipResultsFramework {
  id: string;
  partner_id: string;
  fiscal_year: number;
  impact_statement: string;
  outcome_indicators: PartnershipIndicator[];
  output_indicators: PartnershipIndicator[];
  baseline_year: number;
  target_year: number;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipIndicator {
  name: string;
  baseline: number;
  midline: number;
  endline: number;
  target: number;
  unit: string;
  data_source: string;
}

export interface CooperationSectorReview {
  id: string;
  review_name: string;
  sector: string;
  country: string;
  review_date: string;
  participating_partners: string[];
  key_findings: string[];
  recommendations: string[];
  action_items: MeetingActionItem[];
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface PartnershipCountryProgram {
  id: string;
  program_name: string;
  partner_id: string;
  country: string;
  program_period_start: string;
  program_period_end: string;
  total_budget: number;
  sectors: string[];
  priority_areas: string[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CooperationDevelopmentEffectiveness {
  id: string;
  country: string;
  year: number;
  oda_received: number;
  gni_percentage: number;
  debt_service: number;
  public_spending_education: number;
  outcome_indicators: Record<string, number>;
  effectiveness_rating: AidEffectiveness;
  created_at: string;
  updated_at: string;
}

export interface PartnershipCommunicationsStrategy {
  id: string;
  partner_id: string;
  strategy_name: string;
  target_audiences: string[];
  key_messages: string[];
  channels: CommunicationChannel[];
  budget: number;
  timeline: string;
  kpis: string[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationImpactEvaluation {
  id: string;
  evaluation_name: string;
  project_id: string;
  methodology: string;
  sample_size: number;
  evaluation_period: string;
  impact_findings: string[];
  cost_effectiveness_ratio: number;
  recommendation: string;
  evaluation_score: AidEffectiveness;
  created_at: string;
  updated_at: string;
}

export interface PartnershipKnowledgeManagement {
  id: string;
  knowledge_product_name: string;
  product_type: string;
  partner_id: string;
  project_id: string | null;
  description: string;
  target_audience: string;
  dissemination_channels: string[];
  downloads_count: number;
  citations_count: number;
  created_at: string;
  updated_at: string;
}

export interface CooperationMonitoringFramework {
  id: string;
  framework_name: string;
  partner_id: string | null;
  indicators: MonitoringIndicator[];
  data_collection_tools: string[];
  reporting_frequency: DataCollectionFrequency;
  responsible_entities: string[];
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface MonitoringIndicator {
  name: string;
  type: string;
  target: number;
  data_source: string;
  frequency: DataCollectionFrequency;
}

export interface PartnershipFinancialDashboard {
  id: string;
  partner_id: string;
  fiscal_year: number;
  total_budget: number;
  total_expenditure: number;
  burn_rate: number;
  variance: number;
  pending_commitments: number;
  forecasted_end_balance: number;
  status: ReportingStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationEmergencyResponse {
  id: string;
  emergency_name: string;
  partner_id: string;
  crisis_type: string;
  response_budget: number;
  beneficiaries_targeted: number;
  beneficiaries_reached: number;
  response_start: string;
  response_end: string | null;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipPolicyDialogue {
  id: string;
  dialogue_name: string;
  partner_id: string;
  country: string;
  policy_area: string;
  meeting_date: string;
  participants: string[];
  policy_recommendations: string[];
  government_commitments: string[];
  follow_up_date: string;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
}

export interface CooperationInnovationLab {
  id: string;
  lab_name: string;
  description: string;
  partner_ids: string[];
  focus_area: string;
  budget: number;
  experiments_count: number;
  successful_innovations: number;
  status: CooperationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PartnershipDueDiligenceReport {
  id: string;
  partner_id: string;
  report_date: string;
  financial_health: string;
  governance_assessment: string;
  technical_capacity: string;
  reputational_risk: string;
  compliance_status: string;
  overall_assessment: string;
  conditions: string[];
  next_review_date: string;
  created_at: string;
  updated_at: string;
}
