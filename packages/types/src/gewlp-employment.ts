export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  TEMPORARY = "TEMPORARY",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  CONSULTING = "CONSULTING",
  SEASONAL = "SEASONAL",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  ON_SITE = "ON_SITE",
}

export enum JobStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
  EXPIRED = "EXPIRED",
  FILLED = "FILLED",
  CANCELLED = "CANCELLED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum ApplicationStatus {
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  INTERVIEWED = "INTERVIEWED",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
  ON_HOLD = "ON_HOLD",
  HIRED = "HIRED",
  NOT_INTERESTED = "NOT_INTERESTED",
}

export enum InterviewType {
  PHONE = "PHONE",
  VIDEO = "VIDEO",
  IN_PERSON = "IN_PERSON",
  PANEL = "PANEL",
  TECHNICAL = "TECHNICAL",
  BEHAVIORAL = "BEHAVIORAL",
  CASE_STUDY = "CASE_STUDY",
  GROUP = "GROUP",
  AI_POWERED = "AI_POWERED",
}

export enum OfferStatus {
  PENDING = "PENDING",
  EXTENDED = "EXTENDED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  NEGOTIATING = "NEGOTIATING",
  EXPIRED = "EXPIRED",
  WITHDRAWN = "WITHDRAWN",
  COUNTER_OFFERED = "COUNTER_OFFERED",
}

export enum HiringStage {
  SOURCING = "SOURCING",
  SCREENING = "SCREENING",
  SHORTLISTING = "SHORTLISTING",
  INTERVIEW = "INTERVIEW",
  ASSESSMENT = "ASSESSMENT",
  REFERENCE_CHECK = "REFERENCE_CHECK",
  OFFER = "OFFER",
  ONBOARDING = "ONBOARDING",
  COMPLETED = "COMPLETED",
}

export enum ContractType {
  PERMANENT = "PERMANENT",
  FIXED_TERM = "FIXED_TERM",
  ZERO_HOURS = "ZERO_HOURS",
  APPRENTICESHIP = "APPRENTICESHIP",
  PROBATIONARY = "PROBATIONARY",
  CONSULTING = "CONSULTING",
  FREELANCE = "FREELANCE",
}

export enum OnboardingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DELAYED = "DELAYED",
  CANCELLED = "CANCELLED",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  NOT_REQUIRED = "NOT_REQUIRED",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum MatchingScore {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  EXCELLENT = "EXCELLENT",
  PERFECT = "PERFECT",
}

export enum EmployerStatus {
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  VERIFIED = "VERIFIED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  BLACKLISTED = "BLACKLISTED",
}

export enum EmployerType {
  CORPORATE = "CORPORATE",
  SME = "SME",
  STARTUP = "STARTUP",
  GOVERNMENT = "GOVERNMENT",
  NGO = "NGO",
  ACADEMIC = "ACADEMIC",
  INTERNATIONAL_ORG = "INTERNATIONAL_ORG",
  CONSULTING = "CONSULTING",
  AGENCY = "AGENCY",
}

export enum RecruitmentPipelineStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
  ARCHIVED = "ARCHIVED",
}

export enum BackgroundCheckType {
  CRIMINAL = "CRIMINAL",
  CREDIT = "CREDIT",
  EDUCATION = "EDUCATION",
  EMPLOYMENT = "EMPLOYMENT",
  PROFESSIONAL_LICENSE = "PROFESSIONAL_LICENSE",
  REFERENCE = "REFERENCE",
  DRUG_TEST = "DRUG_TEST",
  MEDICAL = "MEDICAL",
}

export enum BackgroundCheckStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CLEARED = "CLEARED",
  FLAGGED = "FLAGGED",
}

export enum EmploymentContractStatus {
  DRAFT = "DRAFT",
  PENDING_SIGNATURE = "PENDING_SIGNATURE",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  TERMINATED = "TERMINATED",
  AMENDED = "AMENDED",
}

export enum OffboardingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  EXIT_INTERVIEW = "EXIT_INTERVIEW",
  ASSET_RETURN = "ASSET_RETURN",
  FINAL_SETTLEMENT = "FINAL_SETTLEMENT",
}

export enum CandidateSource {
  JOB_BOARD = "JOB_BOARD",
  COMPANY_CAREERS = "COMPANY_CAREERS",
  REFERRAL = "REFERRAL",
  LINKEDIN = "LINKEDIN",
  RECRUITMENT_AGENCY = "RECRUITMENT_AGENCY",
  CAMPUS = "CAMPUS",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  DIRECT_APPLICATION = "DIRECT_APPLICATION",
  AI_SOURCED = "AI_SOURCED",
}

export enum CandidateStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  INTERESTED = "INTERESTED",
  APPLIED = "APPLIED",
  SCREENING = "SCREENING",
  INTERVIEWING = "INTERVIEWING",
  OFFERED = "OFFERED",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
  BLACKLISTED = "BLACKLISTED",
}

export enum JobMatchAlgorithm {
  SKILL_BASED = "SKILL_BASED",
  EXPERIENCE_BASED = "EXPERIENCE_BASED",
  CULTURAL_FIT = "CULTURAL_FIT",
  HYBRID = "HYBRID",
  NEURAL = "NEURAL",
  BEHAVIORAL = "BEHAVIORAL",
}

export enum ApplicationTrackingStage {
  APPLIED = "APPLIED",
  SCREENING = "SCREENING",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW = "INTERVIEW",
  ASSESSMENT = "ASSESSMENT",
  OFFER = "OFFER",
  ONBOARDING = "ONBOARDING",
  COMPLETED = "COMPLETED",
}

export enum InterviewStatus {
  SCHEDULED = "SCHEDULED",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW",
  RESCHEDULED = "RESCHEDULED",
}

export enum OfferNegotiationStatus {
  INITIAL = "INITIAL",
  COUNTER = "COUNTER",
  FINAL = "FINAL",
  AGREED = "AGREED",
  CLOSED = "CLOSED",
}

export enum OnboardingTaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
  SKIPPED = "SKIPPED",
}

export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  ON_LEAVE = "ON_LEAVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
  RETIRED = "RETIRED",
  DECEASED = "DECEASED",
}

export enum WorkExperienceType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  VOLUNTEER = "VOLUNTEER",
  APPRENTICESHIP = "APPRENTICESHIP",
}

export enum ReferenceType {
  PROFESSIONAL = "PROFESSIONAL",
  ACADEMIC = "ACADEMIC",
  PERSONAL = "PERSONAL",
  CHARACTER = "CHARACTER",
}

export enum ReferenceStatus {
  PENDING = "PENDING",
  CONTACTED = "CONTACTED",
  COMPLETED = "COMPLETED",
  UNAVAILABLE = "UNAVAILABLE",
}

export enum JobSalaryCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  XOF = "XOF",
  XAF = "XAF",
  NGN = "NGN",
  GHS = "GHS",
  KES = "KES",
  ZAR = "ZAR",
  EGP = "EGP",
  MAD = "MAD",
  TND = "TND",
}

export enum JobExperienceLevel {
  ENTRY_LEVEL = "ENTRY_LEVEL",
  JUNIOR = "JUNIOR",
  MID_LEVEL = "MID_LEVEL",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
  EXECUTIVE = "EXECUTIVE",
  INTERN = "INTERN",
}

export enum JobEducationLevel {
  HIGH_SCHOOL = "HIGH_SCHOOL",
  DIPLOMA = "DIPLOMA",
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTORATE = "DOCTORATE",
  PROFESSIONAL = "PROFESSIONAL",
  CERTIFICATION = "CERTIFICATION",
}

export enum ApplicationSource {
  DIRECT = "DIRECT",
  REFERRAL = "REFERRAL",
  JOB_BOARD = "JOB_BOARD",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  CAMPUS = "CAMPUS",
  AGENCY = "AGENCY",
  AI_SOURCED = "AI_SOURCED",
  CAREER_FAIR = "CAREER_FAIR",
}

export enum InterviewFeedbackRating {
  POOR = "POOR",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  AVERAGE = "AVERAGE",
  ABOVE_AVERAGE = "ABOVE_AVERAGE",
  EXCELLENT = "EXCELLENT",
  OUTSTANDING = "OUTSTANDING",
}

export enum OfferBenefits {
  HEALTH_INSURANCE = "HEALTH_INSURANCE",
  RETIREMENT_PLAN = "RETIREMENT_PLAN",
  PAID_TIME_OFF = "PAID_TIME_OFF",
  BONUS = "BONUS",
  STOCK_OPTIONS = "STOCK_OPTIONS",
  REMOTE_WORK = "REMOTE_WORK",
  PROFESSIONAL_DEVELOPMENT = "PROFESSIONAL_DEVELOPMENT",
  TRANSPORT = "TRANSPORT",
  HOUSING = "HOUSING",
  MEAL_ALLOWANCE = "MEAL_ALLOWANCE",
}

export enum OnboardingDocumentType {
  CONTRACT = "CONTRACT",
  NDA = "NDA",
  POLICY = "POLICY",
  FORM = "FORM",
  ID_PROOF = "ID_PROOF",
  ADDRESS_PROOF = "ADDRESS_PROOF",
  EDUCATION_CERTIFICATE = "EDUCATION_CERTIFICATE",
  EXPERIENCE_CERTIFICATE = "EXPERIENCE_CERTIFICATE",
}

export enum BackgroundCheckProvider {
  INTERNAL = "INTERNAL",
  THIRD_PARTY = "THIRD_PARTY",
  GOVERNMENT = "GOVERNMENT",
  AI_POWERED = "AI_POWERED",
}

export enum EmploymentHistoryStatus {
  CURRENT = "CURRENT",
  PAST = "PAST",
  BREAK = "BREAK",
}

export enum CandidateMatchWeight {
  EQUAL = "EQUAL",
  SKILL_FOCUSED = "SKILL_FOCUSED",
  EXPERIENCE_FOCUSED = "EXPERIENCE_FOCUSED",
  CULTURE_FOCUSED = "CULTURE_FOCUSED",
  CUSTOM = "CUSTOM",
}

export enum JobPostingVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  INTERNAL_ONLY = "INTERNAL_ONLY",
  NETWORK_ONLY = "NETWORK_ONLY",
}

export enum RecruitmentMetricType {
  TIME_TO_HIRE = "TIME_TO_HIRE",
  COST_PER_HIRE = "COST_PER_HIRE",
  QUALITY_OF_HIRE = "QUALITY_OF_HIRE",
  SOURCE_EFFECTIVENESS = "SOURCE_EFFECTIVENESS",
  OFFER_ACCEPTANCE_RATE = "OFFER_ACCEPTANCE_RATE",
  CANDIDATE_SATISFACTION = "CANDIDATE_SATISFACTION",
}

export enum EmploymentConfigType {
  RECRUITMENT = "RECRUITMENT",
  ONBOARDING = "ONBOARDING",
  OFFBOARDING = "OFFBOARDING",
  BACKGROUND_CHECK = "BACKGROUND_CHECK",
  INTERVIEW = "INTERVIEW",
  OFFER = "OFFER",
}

export enum EmploymentMetricType {
  TIME_TO_HIRE = "TIME_TO_HIRE",
  COST_PER_HIRE = "COST_PER_HIRE",
  TURNOVER_RATE = "TURNOVER_RATE",
  RETENTION_RATE = "RETENTION_RATE",
  EMPLOYEE_SATISFACTION = "EMPLOYEE_SATISFACTION",
  PRODUCTIVITY = "PRODUCTIVITY",
}

export enum CandidateSearchFilter {
  SKILLS = "SKILLS",
  EXPERIENCE = "EXPERIENCE",
  EDUCATION = "EDUCATION",
  LOCATION = "LOCATION",
  SALARY = "SALARY",
  AVAILABILITY = "AVAILABILITY",
  SOURCE = "SOURCE",
}

export enum JobApplicationStatusTimeline {
  SUBMITTED = "SUBMITTED",
  VIEWED = "VIEWED",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  INTERVIEWED = "INTERVIEWED",
  ASSESSED = "ASSESSED",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum EmployerVerificationType {
  BUSINESS_REGISTRATION = "BUSINESS_REGISTRATION",
  TAX_COMPLIANCE = "TAX_COMPLIANCE",
  INDUSTRY_LICENSE = "INDUSTRY_LICENSE",
  FINANCIAL_STABILITY = "FINANCIAL_STABILITY",
  REPUTATION_CHECK = "REPUTATION_CHECK",
}

export enum EmploymentContractClause {
  NON_COMPETE = "NON_COMPETE",
  NON_DISCLOSURE = "NON_DISCLOSURE",
  CONFIDENTIALITY = "CONFIDENTIALITY",
  INTELLECTUAL_PROPERTY = "INTELLECTUAL_PROPERTY",
  TERMINATION = "TERMINATION",
  DISPUTE_RESOLUTION = "DISPUTE_RESOLUTION",
  GOVERNING_LAW = "GOVERNING_LAW",
}

export enum OffboardingReason {
  RESIGNATION = "RESIGNATION",
  TERMINATION = "TERMINATION",
  RETIREMENT = "RETIREMENT",
  END_OF_CONTRACT = "END_OF_CONTRACT",
  REDUNDANCY = "REDUNDANCY",
  MUTUAL_AGREEMENT = "MUTUAL_AGREEMENT",
  MISCONDUCT = "MISCONDUCT",
  PERFORMANCE = "PERFORMANCE",
}

export enum JobSalaryPeriod {
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ANNUAL = "ANNUAL",
}

export enum ApplicationWithdrawalReason {
  FOUND_OTHER_JOB = "FOUND_OTHER_JOB",
  SALARY_NOT_SATISFACTORY = "SALARY_NOT_SATISFACTORY",
  ROLE_NOT_SUITABLE = "ROLE_NOT_SUITABLE",
  LOCATION = "LOCATION",
  PERSONAL_REASONS = "PERSONAL_REASONS",
  COMPANY_REPUTATION = "COMPANY_REPUTATION",
  OTHER = "OTHER",
}

export enum InterviewSchedulingStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  CONFIRMED = "CONFIRMED",
  RESCHEDULED = "RESCHEDULED",
  CANCELLED = "CANCELLED",
}

export enum OfferExpirationAction {
  AUTO_REJECT = "AUTO_REJECT",
  FOLLOW_UP = "FOLLOW_UP",
  EXTEND = "EXTEND",
  ESCALATE = "ESCALATE",
}

export enum EmployeePerformanceRating {
  NEEDS_IMPROVEMENT = "NEEDS_IMPROVEMENT",
  MEETS_EXPECTATIONS = "MEETS_EXPECTATIONS",
  EXCEEDS_EXPECTATIONS = "EXCEEDS_EXPECTATIONS",
  OUTSTANDING = "OUTSTANDING",
  EXCEPTIONAL = "EXCEPTIONAL",
}

export enum EmploymentBenefitsCategory {
  HEALTH = "HEALTH",
  FINANCIAL = "FINANCIAL",
  TIME_OFF = "TIME_OFF",
  DEVELOPMENT = "DEVELOPMENT",
  LIFESTYLE = "LIFESTYLE",
  PROTECTION = "PROTECTION",
}

export enum RecruitmentChannel {
  LINKEDIN = "LINKEDIN",
  INDEED = "INDEED",
  GLASSDOOR = "GLASSDOOR",
  COMPANY_WEBSITE = "COMPANY_WEBSITE",
  EMPLOYEE_REFERRAL = "EMPLOYEE_REFERRAL",
  CAMPUS_RECRUITMENT = "CAMPUS_RECRUITMENT",
  RECRUITMENT_AGENCY = "RECRUITMENT_AGENCY",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
}

export enum CandidateEngagementStatus {
  NOT_CONTACTED = "NOT_CONTACTED",
  CONTACTED = "CONTACTED",
  ENGAGED = "ENGAGED",
  RESPONSIVE = "RESPONSIVE",
  UNRESPONSIVE = "UNRESPONSIVE",
  NURTURED = "NURTURED",
}

export enum JobMatchConfidence {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum ApplicationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum InterviewerRole {
  HIRING_MANAGER = "HIRING_MANAGER",
  TEAM_LEAD = "TEAM_LEAD",
  HR = "HR",
  PEER = "PEER",
  EXECUTIVE = "EXECUTIVE",
  EXTERNAL = "EXTERNAL",
}

export enum OfferCompetitiveness {
  BELOW_MARKET = "BELOW_MARKET",
  AT_MARKET = "AT_MARKET",
  ABOVE_MARKET = "ABOVE_MARKET",
  PREMIUM = "PREMIUM",
}

export enum OnboardingChecklistCategory {
  DOCUMENTATION = "DOCUMENTATION",
  IT_SETUP = "IT_SETUP",
  TRAINING = "TRAINING",
  INTRODUCTION = "INTRODUCTION",
  COMPLIANCE = "COMPLIANCE",
  SOCIAL = "SOCIAL",
}

export enum BackgroundCheckScope {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  ENHANCED = "ENHANCED",
  COMPREHENSIVE = "COMPREHENSIVE",
}

export enum EmploymentContractRenewal {
  AUTO_RENEW = "AUTO_RENEW",
  MANUAL_REVIEW = "MANUAL_REVIEW",
  NON_RENEWABLE = "NON_RENEWABLE",
  OPTION_TO_RENEW = "OPTION_TO_RENEW",
}

export enum EmployeeDocumentType {
  CONTRACT = "CONTRACT",
  PAYSLIP = "PAYSLIP",
  TAX_FORM = "TAX_FORM",
  PERFORMANCE_REVIEW = "PERFORMANCE_REVIEW",
  DISCIPLINARY = "DISCIPLINARY",
  LEAVE_REQUEST = "LEAVE_REQUEST",
  TRAINING_CERTIFICATE = "TRAINING_CERTIFICATE",
}

export enum EmploymentComplianceType {
  LABOR_LAW = "LABOR_LAW",
  EQUAL_OPPORTUNITY = "EQUAL_OPPORTUNITY",
  WORKPLACE_SAFETY = "WORKPLACE_SAFETY",
  DATA_PROTECTION = "DATA_PROTECTION",
  TAX_COMPLIANCE = "TAX_COMPLIANCE",
}

export enum JobLocationType {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FLEXIBLE = "FLEXIBLE",
  FIELD = "FIELD",
}

export enum CandidateSkillMatchType {
  EXACT = "EXACT",
  RELATED = "RELATED",
  TRANSFERABLE = "TRANSFERABLE",
  LEARNABLE = "LEARNABLE",
}

export enum RecruitmentProcessStage {
  PLANNING = "PLANNING",
  SOURCING = "SOURCING",
  SCREENING = "SCREENING",
  INTERVIEWING = "INTERVIEWING",
  DECIDING = "DECIDING",
  OFFERING = "OFFERING",
  ONBOARDING = "ONBOARDING",
}

export enum EmployeeEngagementLevel {
  DISENGAGED = "DISENGAGED",
  NOT_ENGAGED = "NOT_ENGAGED",
  ACTIVELY_DISENGAGED = "ACTIVELY_DISENGAGED",
  ENGAGED = "ENGAGED",
  HIGHLY_ENGAGED = "HIGHLY_ENGAGED",
}

export enum JobCompensationType {
  SALARY = "SALARY",
  HOURLY = "HOURLY",
  COMMISSION = "COMMISSION",
  BASE_PLUS_BONUS = "BASE_PLUS_BONUS",
  EQUITY = "EQUITY",
}

export enum EmployerIndustrySector {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MANUFACTURING = "MANUFACTURING",
  RETAIL = "RETAIL",
  ENERGY = "ENERGY",
  TRANSPORT = "TRANSPORT",
  AGRICULTURE = "AGRICULTURE",
  GOVERNMENT = "GOVERNMENT",
  NGO = "NGO",
  CONSULTING = "CONSULTING",
}

export enum ApplicationDocumentType {
  RESUME = "RESUME",
  COVER_LETTER = "COVER_LETTER",
  PORTFOLIO = "PORTFOLIO",
  CERTIFICATE = "CERTIFICATE",
  REFERENCE = "REFERENCE",
  OTHER = "OTHER",
}

export enum InterviewQuestionCategory {
  TECHNICAL = "TECHNICAL",
  BEHAVIORAL = "BEHAVIORAL",
  SITUATIONAL = "SITUATIONAL",
  CULTURAL_FIT = "CULTURAL_FIT",
  ROLE_SPECIFIC = "ROLE_SPECIFIC",
  COMPANY_KNOWLEDGE = "COMPANY_KNOWLEDGE",
}

export enum EmployerBrandingElement {
  COMPANY_CULTURE = "COMPANY_CULTURE",
  VALUES = "VALUES",
  BENEFITS = "BENEFITS",
  CAREER_GROWTH = "CAREER_GROWTH",
  DIVERSITY = "DIVERSITY",
  SOCIAL_RESPONSIBILITY = "SOCIAL_RESPONSIBILITY",
}

export enum JobPostingStatusTimeline {
  CREATED = "CREATED",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  VIEWED = "VIEWED",
  APPLIED = "APPLIED",
  CLOSED = "CLOSED",
}

export enum CandidateProfileCompleteness {
  INCOMPLETE = "INCOMPLETE",
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  COMPLETE = "COMPLETE",
  COMPREHENSIVE = "COMPREHENSIVE",
}

export enum RecruitmentComplianceType {
  EQUAL_OPPORTUNITY = "EQUAL_OPPORTUNITY",
  DATA_PRIVACY = "DATA_PRIVACY",
  LABOR_LAWS = "LABOR_LAWS",
  IMMIGRATION = "IMMIGRATION",
  BACKGROUND_CHECK = "BACKGROUND_CHECK",
}

export enum EmploymentTerminationType {
  VOLUNTARY = "VOLUNTARY",
  INVOLUNTARY = "INVOLUNTARY",
  MUTUAL = "MUTUAL",
  END_OF_CONTRACT = "END_OF_CONTRACT",
  REDUNDANCY = "REDUNDANCY",
}

export enum JobApplicationDecision {
  PENDING = "PENDING",
  SHORTLIST = "SHORTLIST",
  INTERVIEW = "INTERVIEW",
  REJECT = "REJECT",
  HOLD = "HOLD",
}

export enum CandidateSearchSortBy {
  RELEVANCE = "RELEVANCE",
  EXPERIENCE = "EXPERIENCE",
  EDUCATION = "EDUCATION",
  SKILLS = "SKILLS",
  AVAILABILITY = "AVAILABILITY",
  SALARY_EXPECTATION = "SALARY_EXPECTATION",
}

export enum EmployerVerificationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
}

export enum EmploymentWorkSchedule {
  STANDARD = "STANDARD",
  FLEXIBLE = "FLEXIBLE",
  SHIFT_WORK = "SHIFT_WORK",
  COMPRESSED = "COMPRESSED",
  ROTATING = "ROTATING",
}

export enum JobIndustryRelevance {
  HIGHLY_RELEVANT = "HIGHLY_RELEVANT",
  MODERATELY_RELEVANT = "MODERATELY_RELEVANT",
  SLIGHTLY_RELEVANT = "SLIGHTLY_RELEVANT",
  NOT_RELEVANT = "NOT_RELEVANT",
}

export enum ApplicationReviewStatus {
  PENDING = "PENDING",
  IN_REVIEW = "IN_REVIEW",
  REVIEWED = "REVIEWED",
  ESCALATED = "ESCALATED",
}

export enum EmployeeRetentionRisk {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum JobMarketDemand {
  HIGH = "HIGH",
  MODERATE = "MODERATE",
  LOW = "LOW",
  DECLINING = "DECLINING",
  GROWING = "GROWING",
}

export enum RecruitmentEfficiency {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  POOR = "POOR",
}

export enum EmployerWorkEnvironment {
  CORPORATE = "CORPORATE",
  STARTUP = "STARTUP",
  ACADEMIC = "ACADEMIC",
  GOVERNMENT = "GOVERNMENT",
  NON_PROFIT = "NON_PROFIT",
}

export enum CandidateAvailability {
  IMMEDIATE = "IMMEDIATE",
  TWO_WEEKS = "TWO_WEEKS",
  ONE_MONTH = "ONE_MONTH",
  TWO_MONTHS = "TWO_MONTHS",
  THREE_MONTHS = "THREE_MONTHS",
  FLEXIBLE = "FLEXIBLE",
}

export enum JobSkillRequirement {
  REQUIRED = "REQUIRED",
  PREFERRED = "PREFERRED",
  NICE_TO_HAVE = "NICE_TO_HAVE",
  BONUS = "BONUS",
}

export enum EmployeeDevelopmentStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
  CANCELLED = "CANCELLED",
}

export enum RecruitmentPipelineStage {
  SOURCING = "SOURCING",
  SCREENING = "SCREENING",
  INTERVIEWING = "INTERVIEWING",
  EVALUATING = "EVALUATING",
  OFFERING = "OFFERING",
  HIRING = "HIRING",
}

export enum CandidateMatchingAlgorithm {
  RULE_BASED = "RULE_BASED",
  ML_BASED = "ML_BASED",
  HYBRID = "HYBRID",
  SEMANTIC = "SEMANTIC",
  BEHAVIORAL = "BEHAVIORAL",
}

export enum JobSalaryRange {
  BELOW_MARKET = "BELOW_MARKET",
  AT_MARKET = "AT_MARKET",
  ABOVE_MARKET = "ABOVE_MARKET",
  COMPETITIVE = "COMPETITIVE",
  PREMIUM = "PREMIUM",
}

export enum EmploymentComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  REMEDIATION = "REMEDIATION",
}

export enum EmployerSizeCategory {
  MICRO = "MICRO",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  ENTERPRISE = "ENTERPRISE",
}

export enum ApplicationStatusChangeReason {
  AUTO_PROGRESS = "AUTO_PROGRESS",
  MANUAL_REVIEW = "MANUAL_REVIEW",
  INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
  ASSESSMENT_PASSED = "ASSESSMENT_PASSED",
  REFERENCE_CLEARED = "REFERENCE_CLEARED",
  OFFER_ACCEPTED = "OFFER_ACCEPTED",
}

export enum JobPostingExpiryAction {
  AUTO_CLOSE = "AUTO_CLOSE",
  AUTO_RENEW = "AUTO_RENEW",
  NOTIFY_ADMIN = "NOTIFY_ADMIN",
  HIDE = "HIDE",
}

export enum CandidateSkillVerification {
  SELF_DECLARED = "SELF_DECLARED",
  VERIFIED = "VERIFIED",
  ASSESSED = "ASSESSED",
  CERTIFIED = "CERTIFIED",
}

export enum InterviewEvaluationCriteria {
  TECHNICAL_SKILLS = "TECHNICAL_SKILLS",
  COMMUNICATION = "COMMUNICATION",
  PROBLEM_SOLVING = "PROBLEM_SOLVING",
  TEAMWORK = "TEAMWORK",
  LEADERSHIP = "LEADERSHIP",
  CULTURAL_FIT = "CULTURAL_FIT",
  MOTIVATION = "MOTIVATION",
}

export enum EmployerBenefitPlan {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  EXECUTIVE = "EXECUTIVE",
}

export enum EmployeeContractRenewalStatus {
  PENDING = "PENDING",
  RENEWED = "RENEWED",
  NOT_RENEWED = "NOT_RENEWED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum JobApplicationSourceChannel {
  WEBSITE = "WEBSITE",
  MOBILE_APP = "MOBILE_APP",
  EMAIL = "EMAIL",
  API = "API",
  REFERRAL = "REFERRAL",
  SOCIAL = "SOCIAL",
}

export enum CandidateProfileVerification {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
}

export enum RecruitmentProcessStatus {
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum EmploymentWorkArrangement {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FLEXIBLE = "FLEXIBLE",
  FIELD = "FIELD",
}

export enum JobVacancyStatus {
  OPEN = "OPEN",
  FILLED = "FILLED",
  ON_HOLD = "ON_HOLD",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum CandidateSearchResultRank {
  TOP = "TOP",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  NOT_MATCHED = "NOT_MATCHED",
}

export enum EmployerTalentPoolStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  NURTURED = "NURTURED",
  ENGAGED = "ENGAGED",
}

export enum EmploymentProbationStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  EXTENDED = "EXTENDED",
  FAILED = "FAILED",
}

export interface EmployerRegistry {
  id: string;
  name: string;
  description: string;
  type: EmployerType;
  status: EmployerStatus;
  industry: EmployerIndustrySector;
  size: EmployerSizeCategory;
  website: string;
  logo: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: EmployerRegistryMetadata;
}

export interface EmployerRegistryMetadata {
  totalEmployers: number;
  activeEmployers: number;
  verifiedEmployers: number;
  lastUpdated: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  description: string;
  type: EmployerType;
  status: EmployerStatus;
  industry: EmployerIndustrySector;
  size: EmployerSizeCategory;
  founded: string;
  website: string;
  logo: string;
  email: string;
  phone: string;
  address: CompanyAddress;
  socialMedia: CompanySocialMedia;
  benefits: CompanyBenefits[];
  culture: CompanyCulture;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CompanyProfileMetadata;
}

export interface CompanyAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CompanySocialMedia {
  linkedin: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
}

export interface CompanyBenefits {
  type: OfferBenefits;
  description: string;
  value: string | null;
}

export interface CompanyCulture {
  values: string[];
  workEnvironment: EmployerWorkEnvironment;
  diversity: string;
  description: string;
}

export interface CompanyProfileMetadata {
  totalEmployees: number;
  averageRating: number;
  reviewCount: number;
  lastUpdated: string;
}

export interface JobRegistry {
  id: string;
  name: string;
  description: string;
  status: JobStatus;
  totalJobs: number;
  activeJobs: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: JobRegistryMetadata;
}

export interface JobRegistryMetadata {
  totalJobs: number;
  activeJobs: number;
  filledJobs: number;
  lastUpdated: string;
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  employerId: string;
  employerName: string;
  type: JobType;
  status: JobStatus;
  experienceLevel: JobExperienceLevel;
  educationLevel: JobEducationLevel;
  salary: JobSalary;
  location: JobLocation;
  skills: JobSkill[];
  requirements: string[];
  benefits: JobBenefit[];
  visibility: JobPostingVisibility;
  applicationDeadline: string;
  startDate: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: JobPostingMetadata;
}

export interface JobSalary {
  min: number;
  max: number;
  currency: JobSalaryCurrency;
  period: JobSalaryPeriod;
  negotiable: boolean;
}

export interface JobLocation {
  type: JobLocationType;
  city: string;
  country: string;
  address: string | null;
  remoteAllowed: boolean;
}

export interface JobSkill {
  name: string;
  level: string;
  required: JobSkillRequirement;
  yearsOfExperience: number | null;
}

export interface JobBenefit {
  type: OfferBenefits;
  description: string;
  value: string | null;
}

export interface JobPostingMetadata {
  totalApplications: number;
  views: number;
  shortlisted: number;
  lastUpdated: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  status: ApplicationStatus;
  source: ApplicationSource;
  priority: ApplicationPriority;
  resume: string;
  coverLetter: string | null;
  documents: ApplicationDocument[];
  timeline: ApplicationTimelineEntry[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: JobApplicationMetadata;
}

export interface ApplicationDocument {
  type: ApplicationDocumentType;
  url: string;
  name: string;
  uploadedAt: string;
}

export interface ApplicationTimelineEntry {
  stage: ApplicationStatusChangeReason;
  timestamp: string;
  notes: string | null;
  performedBy: string;
}

export interface JobApplicationMetadata {
  matchScore: number;
  reviewCount: number;
  lastReviewedAt: string | null;
}

export interface CandidateProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  source: CandidateSource;
  availability: CandidateAvailability;
  skills: CandidateSkill[];
  experience: CandidateExperience[];
  education: CandidateEducation[];
  certifications: CandidateCertification[];
  references: CandidateReference[];
  resume: string;
  coverLetter: string | null;
  portfolio: string | null;
  profileCompleteness: CandidateProfileCompleteness;
  profileVerification: CandidateProfileVerification;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CandidateProfileMetadata;
}

export interface CandidateSkill {
  name: string;
  level: string;
  yearsOfExperience: number;
  verification: CandidateSkillVerification;
  lastUsed: string;
}

export interface CandidateExperience {
  company: string;
  title: string;
  type: WorkExperienceType;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface CandidateEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: number | null;
}

export interface CandidateCertification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
}

export interface CandidateReference {
  name: string;
  type: ReferenceType;
  company: string;
  position: string;
  email: string;
  phone: string;
  status: ReferenceStatus;
  relationship: string;
}

export interface CandidateProfileMetadata {
  matchScore: number;
  applicationCount: number;
  lastActiveAt: string;
}

export interface CandidateSearch {
  id: string;
  query: string;
  filters: CandidateSearchFilter[];
  sortBy: CandidateSearchSortBy;
  results: CandidateSearchResult[];
  totalResults: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CandidateSearchFilterValue {
  field: string;
  operator: string;
  value: string;
}

export interface CandidateSearchResult {
  candidateId: string;
  candidateName: string;
  rank: CandidateSearchResultRank;
  matchScore: number;
  matchDetails: CandidateMatchDetail[];
}

export interface CandidateMatchDetail {
  criteria: string;
  score: number;
  matched: boolean;
  details: string;
}

export interface CandidateMatch {
  id: string;
  jobId: string;
  candidateId: string;
  matchScore: number;
  confidence: JobMatchConfidence;
  algorithm: CandidateMatchingAlgorithm;
  weight: CandidateMatchWeight;
  skillMatch: CandidateSkillMatch[];
  experienceMatch: number;
  educationMatch: number;
  overallFit: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CandidateMatchMetadata;
}

export interface CandidateSkillMatch {
  skill: string;
  required: boolean;
  matched: boolean;
  candidateLevel: string;
  requiredLevel: string;
  matchType: CandidateSkillMatchType;
}

export interface CandidateMatchMetadata {
  totalMatches: number;
  averageScore: number;
  lastUpdated: string;
}

export interface ApplicationTracking {
  id: string;
  applicationId: string;
  stage: ApplicationTrackingStage;
  status: ApplicationStatus;
  timeline: ApplicationTrackingTimeline[];
  notes: ApplicationTrackingNote[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ApplicationTrackingTimeline {
  stage: ApplicationTrackingStage;
  enteredAt: string;
  exitedAt: string | null;
  duration: number;
  notes: string | null;
}

export interface ApplicationTrackingNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface RecruitmentPipeline {
  id: string;
  name: string;
  description: string;
  status: RecruitmentPipelineStatus;
  stages: RecruitmentPipelineStageEntry[];
  jobs: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: RecruitmentPipelineMetadata;
}

export interface RecruitmentPipelineStageEntry {
  id: string;
  name: string;
  order: number;
  type: HiringStage;
  applications: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RecruitmentPipelineMetadata {
  totalPipelines: number;
  activePipelines: number;
  lastUpdated: string;
}

export interface Interview {
  id: string;
  jobId: string;
  candidateId: string;
  applicationId: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt: string;
  duration: number;
  interviewers: Interviewer[];
  location: string | null;
  videoLink: string | null;
  feedback: InterviewFeedback | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: InterviewMetadata;
}

export interface Interviewer {
  id: string;
  name: string;
  role: InterviewerRole;
  email: string;
}

export interface InterviewFeedback {
  rating: InterviewFeedbackRating;
  technicalSkills: number;
  communication: number;
  problemSolving: number;
  teamwork: number;
  leadership: number;
  culturalFit: number;
  motivation: number;
  notes: string;
  recommendation: string;
  submittedAt: string;
}

export interface InterviewMetadata {
  totalInterviews: number;
  averageRating: number;
  lastUpdated: string;
}

export interface Offer {
  id: string;
  jobId: string;
  candidateId: string;
  applicationId: string;
  status: OfferStatus;
  salary: number;
  currency: JobSalaryCurrency;
  benefits: OfferBenefitsEntry[];
  startDate: string;
  expiryDate: string;
  negotiable: boolean;
  negotiationHistory: OfferNegotiationEntry[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: OfferMetadata;
}

export interface OfferBenefitsEntry {
  type: OfferBenefits;
  description: string;
  value: string | null;
}

export interface OfferNegotiationEntry {
  round: number;
  status: OfferNegotiationStatus;
  salary: number;
  notes: string;
  date: string;
}

export interface OfferMetadata {
  totalOffers: number;
  acceptanceRate: number;
  averageTimeToAccept: number;
  lastUpdated: string;
}

export interface HiringWorkflow {
  id: string;
  name: string;
  description: string;
  stages: HiringWorkflowStage[];
  jobs: string[];
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: HiringWorkflowMetadata;
}

export interface HiringWorkflowStage {
  id: string;
  name: string;
  type: HiringStage;
  order: number;
  required: boolean;
  autoProgress: boolean;
  conditions: HiringWorkflowCondition[];
}

export interface HiringWorkflowCondition {
  field: string;
  operator: string;
  value: string;
}

export interface HiringWorkflowMetadata {
  totalWorkflows: number;
  activeWorkflows: number;
  lastUpdated: string;
}

export interface EmploymentContract {
  id: string;
  employeeId: string;
  employerId: string;
  type: ContractType;
  status: EmploymentContractStatus;
  startDate: string;
  endDate: string | null;
  salary: number;
  currency: JobSalaryCurrency;
  position: string;
  department: string;
  clauses: EmploymentContractClauseEntry[];
  renewal: EmploymentContractRenewal;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: EmploymentContractMetadata;
}

export interface EmploymentContractClauseEntry {
  type: EmploymentContractClause;
  content: string;
  order: number;
}

export interface EmploymentContractMetadata {
  totalContracts: number;
  activeContracts: number;
  pendingRenewals: number;
  lastUpdated: string;
}

export interface OnboardingEntry {
  id: string;
  employeeId: string;
  employerId: string;
  status: OnboardingStatus;
  startDate: string;
  completionDate: string | null;
  checklist: OnboardingChecklistItem[];
  documents: OnboardingDocument[];
  tasks: OnboardingTask[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: OnboardingMetadata;
}

export interface OnboardingChecklistItem {
  id: string;
  category: OnboardingChecklistCategory;
  description: string;
  completed: boolean;
  completedAt: string | null;
  assignedTo: string;
}

export interface OnboardingDocument {
  type: OnboardingDocumentType;
  name: string;
  url: string;
  uploaded: boolean;
  verified: boolean;
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  status: OnboardingTaskStatus;
  dueDate: string;
  assignedTo: string;
  completedAt: string | null;
}

export interface OnboardingMetadata {
  totalOnboardings: number;
  averageCompletionTime: number;
  completionRate: number;
  lastUpdated: string;
}

export interface OffboardingEntry {
  id: string;
  employeeId: string;
  employerId: string;
  status: OffboardingStatus;
  reason: OffboardingReason;
  lastWorkingDay: string;
  exitInterview: ExitInterview | null;
  assetReturn: AssetReturnEntry[];
  finalSettlement: FinalSettlement;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: OffboardingMetadata;
}

export interface ExitInterview {
  completed: boolean;
  feedback: string;
  reasons: string[];
  suggestions: string[];
  completedAt: string | null;
}

export interface AssetReturnEntry {
  assetId: string;
  assetName: string;
  returned: boolean;
  returnedAt: string | null;
  condition: string;
}

export interface FinalSettlement {
  pendingSalary: number;
  benefits: number;
  deductions: number;
  netAmount: number;
  currency: JobSalaryCurrency;
  paymentDate: string;
}

export interface OffboardingMetadata {
  totalOffboardings: number;
  averageProcessingTime: number;
  exitInterviewCompletionRate: number;
  lastUpdated: string;
}

export interface EmployeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  status: EmployeeStatus;
  hireDate: string;
  terminationDate: string | null;
  workSchedule: EmploymentWorkArrangement;
  profilePhoto: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: EmployeeProfileMetadata;
}

export interface EmployeeProfileMetadata {
  totalEmployees: number;
  activeEmployees: number;
  averageTenure: number;
  lastUpdated: string;
}

export interface EmploymentHistory {
  id: string;
  employeeId: string;
  entries: EmploymentHistoryEntry[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmploymentHistoryEntry {
  company: string;
  position: string;
  type: WorkExperienceType;
  startDate: string;
  endDate: string | null;
  current: boolean;
  achievements: string[];
  reasonForLeaving: string | null;
}

export interface WorkExperience {
  id: string;
  personId: string;
  company: string;
  position: string;
  type: WorkExperienceType;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: WorkExperienceMetadata;
}

export interface WorkExperienceMetadata {
  totalExperience: number;
  averageTenure: number;
  industries: string[];
}

export interface Reference {
  id: string;
  personId: string;
  name: string;
  type: ReferenceType;
  company: string;
  position: string;
  email: string;
  phone: string;
  status: ReferenceStatus;
  relationship: string;
  feedback: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: ReferenceMetadata;
}

export interface ReferenceMetadata {
  totalReferences: number;
  responseRate: number;
  averageFeedback: string;
}

export interface BackgroundCheck {
  id: string;
  personId: string;
  type: BackgroundCheckType;
  status: BackgroundCheckStatus;
  scope: BackgroundCheckScope;
  provider: BackgroundCheckProvider;
  result: BackgroundCheckResult | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  completedAt: string | null;
  expiresAt: string | null;
  metadata: BackgroundCheckMetadata;
}

export interface BackgroundCheckResult {
  status: BackgroundCheckStatus;
  summary: string;
  details: string;
  flags: string[];
  clearanceLevel: string;
}

export interface BackgroundCheckMetadata {
  totalChecks: number;
  passRate: number;
  averageCompletionTime: number;
  lastUpdated: string;
}

export interface EmploymentConfig {
  id: string;
  name: string;
  description: string;
  type: EmploymentConfigType;
  settings: Record<string, unknown>;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmploymentMetrics {
  id: string;
  name: string;
  description: string;
  type: EmploymentMetricType;
  value: number;
  unit: string;
  period: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: EmploymentMetricsMetadata;
}

export interface EmploymentMetricsMetadata {
  totalMetrics: number;
  lastUpdated: string;
  trends: string[];
}

export interface EmploymentDashboard {
  employerRegistry: EmployerRegistry;
  jobRegistry: JobRegistry;
  metrics: EmploymentMetrics;
  config: EmploymentConfig;
  lastUpdated: string;
}

export interface EmployerRegistryEntry {
  id: string;
  name: string;
  description: string;
  type: EmployerType;
  status: EmployerStatus;
  industry: EmployerIndustrySector;
  size: EmployerSizeCategory;
  verifiedAt: string | null;
  totalJobs: number;
  totalEmployees: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerVerification {
  id: string;
  employerId: string;
  type: EmployerVerificationType;
  status: EmployerVerificationStatus;
  verifiedBy: string | null;
  verifiedAt: string | null;
  expiresAt: string | null;
  documents: EmployerVerificationDocument[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerVerificationDocument {
  type: string;
  url: string;
  uploadedAt: string;
  verified: boolean;
}

export interface EmployerBranding {
  id: string;
  employerId: string;
  elements: EmployerBrandingElement[];
  tagline: string | null;
  missionStatement: string | null;
  values: string[];
  photos: string[];
  videos: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerTalentPool {
  id: string;
  employerId: string;
  name: string;
  status: EmployerTalentPoolStatus;
  candidates: string[];
  skills: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobPostingDetail {
  id: string;
  title: string;
  description: string;
  employerId: string;
  type: JobType;
  status: JobStatus;
  salary: JobSalary;
  location: JobLocation;
  skills: JobSkill[];
  requirements: string[];
  benefits: JobBenefit[];
  applicationDeadline: string;
  totalApplications: number;
  views: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobPostingAnalytics {
  jobId: string;
  views: number;
  applications: number;
  shortlisted: number;
  interviewed: number;
  offered: number;
  hired: number;
  conversionRate: number;
  sourceBreakdown: JobSourceBreakdown[];
  schoolId: string;
  period: string;
}

export interface JobSourceBreakdown {
  source: ApplicationSource;
  count: number;
  percentage: number;
}

export interface JobVacancy {
  id: string;
  jobId: string;
  title: string;
  department: string;
  hiringManager: string;
  status: JobVacancyStatus;
  priority: ApplicationPriority;
  headcount: number;
  filled: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobSalaryBenchmark {
  jobId: string;
  role: string;
  industry: EmployerIndustrySector;
  location: string;
  experienceLevel: JobExperienceLevel;
  averageSalary: number;
  minSalary: number;
  maxSalary: number;
  currency: JobSalaryCurrency;
  competitiveness: OfferCompetitiveness;
  schoolId: string;
  generatedAt: string;
}

export interface JobApplicationDetail {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  status: ApplicationStatus;
  source: ApplicationSource;
  priority: ApplicationPriority;
  matchScore: number;
  resume: string;
  coverLetter: string | null;
  documents: ApplicationDocument[];
  timeline: ApplicationTimelineEntry[];
  notes: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicationTimeline {
  applicationId: string;
  entries: ApplicationTimelineEntry[];
  currentStage: ApplicationTrackingStage;
  totalDaysInProcess: number;
}

export interface JobApplicationDecisionEntry {
  applicationId: string;
  decision: JobApplicationDecision;
  decidedBy: string;
  decidedAt: string;
  reason: string | null;
}

export interface CandidateSearchQuery {
  id: string;
  query: string;
  filters: CandidateSearchFilterValue[];
  sortBy: CandidateSearchSortBy;
  page: number;
  limit: number;
  totalResults: number;
  results: CandidateSearchResult[];
  schoolId: string;
  createdAt: string;
}

export interface CandidateSearchAnalytics {
  totalSearches: number;
  averageResults: number;
  topQueries: string[];
  topFilters: string[];
  conversionRate: number;
  schoolId: string;
  period: string;
}

export interface CandidateMatchDetailEntry {
  id: string;
  jobId: string;
  candidateId: string;
  overallScore: number;
  skillMatch: CandidateSkillMatch[];
  experienceMatch: number;
  educationMatch: number;
  locationMatch: number;
  salaryMatch: number;
  cultureFit: number;
  algorithm: CandidateMatchingAlgorithm;
  schoolId: string;
  createdAt: string;
}

export interface CandidateMatchReport {
  jobId: string;
  totalCandidates: number;
  matches: CandidateMatchDetailEntry[];
  averageScore: number;
  topMatches: string[];
  schoolId: string;
  generatedAt: string;
}

export interface CandidateProfileSummary {
  id: string;
  name: string;
  email: string;
  status: CandidateStatus;
  skills: string[];
  experience: number;
  education: string;
  availability: CandidateAvailability;
  lastActive: string;
  matchScore: number | null;
  schoolId: string;
}

export interface CandidateEngagement {
  id: string;
  candidateId: string;
  status: CandidateEngagementStatus;
  lastContactedAt: string | null;
  responseRate: number;
  interactions: CandidateInteraction[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateInteraction {
  type: string;
  timestamp: string;
  direction: string;
  notes: string;
}

export interface ApplicationTrackingDetail {
  id: string;
  applicationId: string;
  currentStage: ApplicationTrackingStage;
  stages: ApplicationTrackingTimeline[];
  totalDaysInProcess: number;
  bottleneck: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationTrackingAnalytics {
  totalApplications: number;
  averageTimeToHire: number;
  stageConversionRates: Record<string, number>;
  bottleneckStage: string;
  schoolId: string;
  period: string;
}

export interface RecruitmentPipelineDetail {
  id: string;
  name: string;
  status: RecruitmentPipelineStatus;
  stages: RecruitmentPipelineStageEntry[];
  totalCandidates: number;
  conversionRates: Record<string, number>;
  averageTimeInStage: Record<string, number>;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentPipelineMetrics {
  totalPipelines: number;
  activePipelines: number;
  averageTimeToFill: number;
  costPerHire: number;
  qualityOfHire: number;
  schoolId: string;
  period: string;
}

export interface RecruitmentProcessDetail {
  id: string;
  jobId: string;
  stage: RecruitmentProcessStage;
  status: RecruitmentProcessStatus;
  startedAt: string;
  estimatedEndAt: string;
  actualEndAt: string | null;
  responsible: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentCompliance {
  id: string;
  jobId: string;
  type: RecruitmentComplianceType;
  status: EmploymentComplianceStatus;
  checkedAt: string;
  issues: string[];
  schoolId: string;
}

export interface InterviewDetail {
  id: string;
  jobId: string;
  candidateId: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt: string;
  duration: number;
  interviewers: Interviewer[];
  location: string | null;
  videoLink: string | null;
  feedback: InterviewFeedback | null;
  questions: InterviewQuestion[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  id: string;
  category: InterviewQuestionCategory;
  question: string;
  expectedAnswer: string | null;
  score: number | null;
  notes: string | null;
}

export interface InterviewAnalytics {
  totalInterviews: number;
  averageRating: number;
  averageDuration: number;
  noShowRate: number;
  feedbackCompletionRate: number;
  schoolId: string;
  period: string;
}

export interface InterviewScheduling {
  id: string;
  interviewId: string;
  status: InterviewSchedulingStatus;
  proposedSlots: InterviewSlot[];
  confirmedSlot: InterviewSlot | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSlot {
  startTime: string;
  endTime: string;
  timezone: string;
  available: boolean;
}

export interface OfferDetail {
  id: string;
  jobId: string;
  candidateId: string;
  status: OfferStatus;
  salary: number;
  currency: JobSalaryCurrency;
  benefits: OfferBenefitsEntry[];
  startDate: string;
  expiryDate: string;
  competitiveness: OfferCompetitiveness;
  negotiationHistory: OfferNegotiationEntry[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OfferAnalytics {
  totalOffers: number;
  acceptanceRate: number;
  averageTimeToAccept: number;
  averageNegotiationRounds: number;
  competitiveness: OfferCompetitiveness;
  schoolId: string;
  period: string;
}

export interface OfferExpiration {
  offerId: string;
  expiresAt: string;
  action: OfferExpirationAction;
  reminderSentAt: string | null;
  escalatedAt: string | null;
}

export interface HiringWorkflowDetail {
  id: string;
  name: string;
  stages: HiringWorkflowStage[];
  activeJobs: number;
  totalProcessed: number;
  averageTimeToHire: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface HiringWorkflowMetrics {
  totalWorkflows: number;
  activeWorkflows: number;
  averageStages: number;
  averageTimePerStage: Record<string, number>;
  schoolId: string;
  period: string;
}

export interface EmploymentContractDetail {
  id: string;
  employeeId: string;
  employerId: string;
  type: ContractType;
  status: EmploymentContractStatus;
  position: string;
  department: string;
  startDate: string;
  endDate: string | null;
  salary: number;
  currency: JobSalaryCurrency;
  clauses: EmploymentContractClauseEntry[];
  renewal: EmploymentContractRenewal;
  renewalStatus: EmployeeContractRenewalStatus;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmploymentContractAnalytics {
  totalContracts: number;
  activeContracts: number;
  expiringSoon: number;
  pendingRenewals: number;
  averageTenure: number;
  schoolId: string;
  period: string;
}

export interface OnboardingDetail {
  id: string;
  employeeId: string;
  status: OnboardingStatus;
  startDate: string;
  completionDate: string | null;
  checklist: OnboardingChecklistItem[];
  documents: OnboardingDocument[];
  tasks: OnboardingTask[];
  progress: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingAnalytics {
  totalOnboardings: number;
  averageCompletionTime: number;
  completionRate: number;
  averageChecklistCompletion: number;
  overdueTasks: number;
  schoolId: string;
  period: string;
}

export interface OnboardingChecklist {
  id: string;
  employeeId: string;
  categories: OnboardingChecklistCategoryGroup[];
  totalItems: number;
  completedItems: number;
  completionRate: number;
  schoolId: string;
}

export interface OnboardingChecklistCategoryGroup {
  category: OnboardingChecklistCategory;
  items: OnboardingChecklistItem[];
  completed: number;
  total: number;
}

export interface OffboardingDetail {
  id: string;
  employeeId: string;
  status: OffboardingStatus;
  reason: OffboardingReason;
  lastWorkingDay: string;
  exitInterview: ExitInterview | null;
  assetReturn: AssetReturnEntry[];
  finalSettlement: FinalSettlement;
  knowledgeTransfer: KnowledgeTransferEntry[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeTransferEntry {
  task: string;
  assignedTo: string;
  completed: boolean;
  completedAt: string | null;
}

export interface OffboardingAnalytics {
  totalOffboardings: number;
  averageProcessingTime: number;
  exitInterviewCompletionRate: number;
  topReasons: OffboardingReason[];
  schoolId: string;
  period: string;
}

export interface EmployeeProfileDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  status: EmployeeStatus;
  hireDate: string;
  workSchedule: EmploymentWorkArrangement;
  performance: EmployeePerformanceRating;
  retentionRisk: EmployeeRetentionRisk;
  engagement: EmployeeEngagementLevel;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeAnalytics {
  totalEmployees: number;
  activeEmployees: number;
  averageTenure: number;
  turnoverRate: number;
  averagePerformance: EmployeePerformanceRating;
  engagementDistribution: Record<EmployeeEngagementLevel, number>;
  schoolId: string;
  period: string;
}

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  type: EmployeeDocumentType;
  name: string;
  url: string;
  uploadedAt: string;
  expiresAt: string | null;
  schoolId: string;
}

export interface EmployeePerformance {
  id: string;
  employeeId: string;
  period: string;
  rating: EmployeePerformanceRating;
  goals: EmployeePerformanceGoal[];
  feedback: string;
  reviewer: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeePerformanceGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: string;
}

export interface EmploymentHistoryDetail {
  id: string;
  personId: string;
  entries: EmploymentHistoryEntry[];
  totalExperience: number;
  industries: string[];
  roles: string[];
  schoolId: string;
}

export interface WorkExperienceDetail {
  id: string;
  personId: string;
  company: string;
  position: string;
  type: WorkExperienceType;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  industry: string;
  schoolId: string;
}

export interface ReferenceDetail {
  id: string;
  personId: string;
  name: string;
  type: ReferenceType;
  company: string;
  position: string;
  email: string;
  phone: string;
  status: ReferenceStatus;
  relationship: string;
  feedback: string | null;
  rating: number | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackgroundCheckDetail {
  id: string;
  personId: string;
  type: BackgroundCheckType;
  status: BackgroundCheckStatus;
  scope: BackgroundCheckScope;
  provider: BackgroundCheckProvider;
  result: BackgroundCheckResult | null;
  startedAt: string;
  completedAt: string | null;
  expiresAt: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackgroundCheckAnalytics {
  totalChecks: number;
  passRate: number;
  averageCompletionTime: number;
  flagRate: number;
  schoolId: string;
  period: string;
}

export interface EmploymentComplianceDetail {
  id: string;
  type: EmploymentComplianceType;
  status: EmploymentComplianceStatus;
  lastCheckedAt: string;
  nextCheckAt: string | null;
  issues: EmploymentComplianceIssue[];
  schoolId: string;
}

export interface EmploymentComplianceIssue {
  type: string;
  severity: string;
  description: string;
  recommendation: string;
}

export interface EmploymentAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface EmploymentNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  recipientId: string;
  read: boolean;
  schoolId: string;
  createdAt: string;
}

export interface EmploymentExport {
  id: string;
  format: string;
  scope: string;
  status: string;
  url: string | null;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface EmploymentImport {
  id: string;
  format: string;
  source: string;
  status: string;
  totalRows: number;
  processedRows: number;
  errors: number;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface EmploymentSearchQuery {
  id: string;
  query: string;
  filters: EmploymentSearchFilter[];
  results: EmploymentSearchResult[];
  totalResults: number;
  schoolId: string;
  createdAt: string;
}

export interface EmploymentSearchFilter {
  field: string;
  operator: string;
  value: string;
}

export interface EmploymentSearchResult {
  entityId: string;
  entityType: string;
  name: string;
  score: number;
  highlights: string[];
}

export interface EmployerAnalytics {
  totalEmployers: number;
  activeEmployers: number;
  verifiedEmployers: number;
  averageRating: number;
  industryBreakdown: Record<EmployerIndustrySector, number>;
  schoolId: string;
  period: string;
}

export interface JobMarketOverview {
  totalJobs: number;
  activeJobs: number;
  averageSalary: number;
  topSkills: string[];
  topIndustries: EmployerIndustrySector[];
  schoolId: string;
  period: string;
}

export interface CandidatePoolSummary {
  totalCandidates: number;
  activeCandidates: number;
  averageMatchScore: number;
  topSkills: string[];
  availabilityBreakdown: Record<CandidateAvailability, number>;
  schoolId: string;
  period: string;
}

export interface RecruitmentEfficiencyReport {
  timeToHire: number;
  costPerHire: number;
  qualityOfHire: number;
  offerAcceptanceRate: number;
  candidateSatisfaction: number;
  schoolId: string;
  period: string;
}

export interface EmploymentBenchmark {
  metric: string;
  value: number;
  industryAverage: number;
  bestPractice: number;
  schoolId: string;
  period: string;
}

export interface EmployerRating {
  id: string;
  employerId: string;
  overallRating: number;
  cultureRating: number;
  compensationRating: number;
  workLifeBalanceRating: number;
  careerGrowthRating: number;
  totalReviews: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobRecommendationResult {
  id: string;
  candidateId: string;
  jobs: JobRecommendationEntry[];
  algorithm: CandidateMatchingAlgorithm;
  generatedAt: string;
  schoolId: string;
}

export interface JobRecommendationEntry {
  jobId: string;
  title: string;
  company: string;
  matchScore: number;
  reasons: string[];
}

export interface CandidateRecommendationResult {
  id: string;
  jobId: string;
  candidates: CandidateRecommendationEntry[];
  algorithm: CandidateMatchingAlgorithm;
  generatedAt: string;
  schoolId: string;
}

export interface CandidateRecommendationEntry {
  candidateId: string;
  name: string;
  matchScore: number;
  reasons: string[];
}

export interface EmploymentReport {
  id: string;
  name: string;
  type: string;
  period: string;
  data: Record<string, unknown>;
  generatedAt: string;
  schoolId: string;
}

export interface EmploymentBackup {
  id: string;
  scope: string;
  status: string;
  size: number;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}
