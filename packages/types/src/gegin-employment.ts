export enum GraduateStatus {
  ACTIVE = "ACTIVE",
  EMPLOYED = "EMPLOYED",
  UNEMPLOYED = "UNEMPLOYED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  FURTHER_STUDY = "FURTHER_STUDY",
  RETIRED = "RETIRED",
  OUT_OF_WORKFORCE = "OUT_OF_WORKFORCE",
  DECEASED = "DECEASED",
}

export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  TEMPORARY = "TEMPORARY",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  CONSULTING = "CONSULTING",
  SEASONAL = "SEASONAL",
}

export enum JobStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
  EXPIRED = "EXPIRED",
  FILLED = "FILLED",
  CANCELLED = "CANCELLED",
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
}

export enum SkillMatchStatus {
  NO_MATCH = "NO_MATCH",
  PARTIAL_MATCH = "PARTIAL_MATCH",
  GOOD_MATCH = "GOOD_MATCH",
  EXCELLENT_MATCH = "EXCELLENT_MATCH",
  PERFECT_MATCH = "PERFECT_MATCH",
}

export enum InternshipStatus {
  APPLICATION = "APPLICATION",
  SELECTED = "SELECTED",
  PLACED = "PLACED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  EXTENDED = "EXTENDED",
  TERMINATED = "TERMINATED",
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
  INTERNATIONAL_ORG = "INTERATIONAL_ORG",
  CONSULTING = "CONSULTING",
}

export enum RecruitmentStage {
  SOURCING = "SOURCING",
  SCREENING = "SCREENING",
  SHORTLISTING = "SHORTLISTING",
  INTERVIEW = "INTERVIEW",
  ASSESSMENT = "ASSESSMENT",
  REFERENCE_CHECK = "REFERENCE_CHECK",
  OFFER = "OFFER",
  ONBOARDING = "ONBOARDING",
}

export enum CareerPathway {
  TRADITIONAL = "TRADITIONAL",
  NON_TRADITIONAL = "NON_TRADITIONAL",
  ENTREPRENEURIAL = "ENTREPRENEURIAL",
  ACADEMIC = "ACADEMIC",
  PUBLIC_SECTOR = "PUBLIC_SECTOR",
  NGO = "NGO",
  FREELANCE = "FREELANCE",
}

export enum WorkforcePlanStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum LaborMarketIndicator {
  EMPLOYMENT_RATE = "EMPLOYMENT_RATE",
  UNEMPLOYMENT_RATE = "UNEMPLOYMENT_RATE",
  UNDEREMPLOYMENT = "UNDEREMPLOYMENT",
  LABOR_FORCE_PARTICIPATION = "LABOR_FORCE_PARTICIPATION",
  WAGE_GROWTH = "WAGE_GROWTH",
  JOB_VACANCIES = "JOB_VACANCIES",
  SKILLS_GAP = "SKILLS_GAP",
}

export enum SkillCategory {
  TECHNICAL = "TECHNICAL",
  SOFT_SKILL = "SOFT_SKILL",
  LEADERSHIP = "LEADERSHIP",
  LANGUAGE = "LANGUAGE",
  DIGITAL = "DIGITAL",
  DOMAIN_SPECIFIC = "DOMAIN_SPECIFIC",
  INTERPERSONAL = "INTERPERSONAL",
  ANALYTICAL = "ANALYTICAL",
}

export enum AIRecommendationType {
  JOB = "JOB",
  COURSE = "COURSE",
  CERTIFICATION = "CERTIFICATION",
  SKILL = "SKILL",
  MENTOR = "MENTOR",
  NETWORK = "NETWORK",
  CAREER_PATH = "CAREER_PATH",
}

export enum WorkforceTrend {
  GROWTH = "GROWTH",
  DECLINE = "DECLINE",
  STABLE = "STABLE",
  EMERGING = "EMERGING",
  TRANSITIONING = "TRANSITIONING",
}

export enum JobSector {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MANUFACTURING = "MANUFACTURING",
  RETAIL = "RETAIL",
  CONSTRUCTION = "CONSTRUCTION",
  ENERGY = "ENERGY",
  TRANSPORTATION = "TRANSPORTATION",
  HOSPITALITY = "HOSPITALITY",
  AGRICULTURE = "AGRICULTURE",
  GOVERNMENT = "GOVERNMENT",
  TELECOM = "TELECOM",
  MEDIA = "MEDIA",
  LEGAL = "LEGAL",
}

export enum GeographicMobility {
  NOT_WILLING = "NOT_WILLING",
  WILLING_DOMESTIC = "WILLING_DOMESTIC",
  WILLING_REGIONAL = "WILLING_REGIONAL",
  WILLING_GLOBAL = "WILLING_GLOBAL",
}

export enum SalaryRange {
  ENTRY = "ENTRY",
  MID = "MID",
  SENIOR = "SENIOR",
  EXECUTIVE = "EXECUTIVE",
}

export enum InterviewType {
  PHONE_SCREEN = "PHONE_SCREEN",
  VIDEO_CALL = "VIDEO_CALL",
  IN_PERSON = "IN_PERSON",
  PANEL = "PANEL",
  TECHNICAL = "TECHNICAL",
  ASSESSMENT_CENTER = "ASSESSMENT_CENTER",
  GROUP = "GROUP",
}

export enum AssessmentType {
  APTITUDE = "APTITUDE",
  PERSONALITY = "PERSONALITY",
  TECHNICAL = "TECHNICAL",
  PSYCHOMETRIC = "PSYCHOMETRIC",
  SITUATIONAL = "SITUATIONAL",
  WORK_SAMPLE = "WORK_SAMPLE",
}

export enum JobMatchAlgorithm {
  SKILL_BASED = "SKILL_BASED",
  AI_HYBRID = "AI_HYBRID",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  CONTENT_BASED = "CONTENT_BASED",
  COLLABORATIVE = "COLLABORATIVE",
}

export enum TalentPipelineStage {
  PROSPECT = "PROSPECT",
  ENGAGED = "ENGAGED",
  APPLICANT = "APPLICANT",
  CANDIDATE = "CANDIDATE",
  HIRED = "HIRED",
  ALUMNI = "ALUMNI",
}

export enum RemoteWorkOption {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FLEXIBLE = "FLEXIBLE",
}

export enum CareerEvent {
  GRADUATION = "GRADUATION",
  FIRST_JOB = "FIRST_JOB",
  PROMOTION = "PROMOTION",
  CAREER_CHANGE = "CAREER_CHANGE",
  CERTIFICATION = "CERTIFICATION",
  SKILL_UPDATE = "SKILL_UPDATE",
  RETIREMENT = "RETIREMENT",
}

export enum EmployerEngagementType {
  JOB_POSTING = "JOB_POSTING",
  CAMPUS_VISIT = "CAMPUS_VISIT",
  CAREER_FAIR = "CAREER_FAIR",
  MENTORING = "MENTORING",
  GUEST_LECTURE = "GUEST_LECTURE",
  SPONSORSHIP = "SPONSORSHIP",
  INTERNSHIP_PROGRAM = "INTERNSHIP_PROGRAM",
}

export enum AlumniStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DISENGAGED = "DISENGAGED",
  RE_ENGAGED = "RE_ENGAGED",
}

export enum CareerServiceType {
  COUNSELING = "COUNSELING",
  CV_REVIEW = "CV_REVIEW",
  INTERVIEW_PREP = "INTERVIEW_PREP",
  JOB_SEARCH = "JOB_SEARCH",
  NETWORKING = "NETWORKING",
  SKILL_DEVELOPMENT = "SKILL_DEVELOPMENT",
}

export enum EmploymentDataCollectionMethod {
  SURVEY = "SURVEY",
  CENSUS = "CENSUS",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  REGISTRY = "REGISTRY",
  ESTIMATE = "ESTIMATE",
}

export enum JobVerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  DISPUTED = "DISPUTED",
}

export enum CareerReadinessLevel {
  NOT_READY = "NOT_READY",
  DEVELOPING = "DEVELOPING",
  PROFICIENT = "PROFICIENT",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export enum InternshipCompensationType {
  PAID = "PAID",
  UNPAID = "UNPAID",
  STIPEND = "STIPEND",
  COURSE_CREDIT = "COURSE_CREDIT",
}

export enum GraduateDestination {
  EMPLOYED = "EMPLOYED",
  FURTHER_STUDY = "FURTHER_STUDY",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  UNEMPLOYED = "UNEMPLOYED",
  GAP_YEAR = "GAP_YEAR",
  VOLUNTEERING = "VOLUNTEERING",
  EMIGRATED = "EMIGRATED",
}

export enum TalentPoolType {
  INSTITUTIONAL = "INSTITUTIONAL",
  EMPLOYER = "EMPLOYER",
  INDUSTRY = "INDUSTRY",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum RecruitmentChannel {
  UNIVERSITY_PORTAL = "UNIVERSITY_PORTAL",
  JOB_BOARD = "JOB_BOARD",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  NETWORKING = "NETWORKING",
  RECRUITMENT_AGENCY = "RECRUITMENT_AGENCY",
  REFERRAL = "REFERRAL",
  COLD_APPLICATION = "COLD_APPLICATION",
}

export enum WorkforceGapType {
  SKILL = "SKILL",
  EXPERIENCE = "EXPERIENCE",
  GEOGRAPHIC = "GEOGRAPHIC",
  DEMOGRAPHIC = "DEMOGRAPHIC",
  TEMPORARY = "TEMPORARY",
}

export enum CareerPlanStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ON_TRACK = "ON_TRACK",
  OFF_TRACK = "OFF_TRACK",
  COMPLETED = "COMPLETED",
  REVISED = "REVISED",
}

export enum SalaryCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  XOF = "XOF",
  XAF = "XAF",
  LOCAL = "LOCAL",
}

export enum JobBenefitType {
  HEALTH_INSURANCE = "HEALTH_INSURANCE",
  RETIREMENT = "RETIREMENT",
  PAID_LEAVE = "PAID_LEAVE",
  TRAINING = "TRAINING",
  REMOTE_WORK = "REMOTE_WORK",
  BONUS = "BONUS",
  EQUITY = "EQUITY",
  TRANSPORT = "TRANSPORT",
}

export enum GraduateSurveyResponseRate {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum AIEngineType {
  RECOMMENDATION = "RECOMMENDATION",
  PREDICTIVE = "PREDICTIVE",
  MATCHING = "MATCHING",
  NATURAL_LANGUAGE = "NATURAL_LANGUAGE",
  COMPUTER_VISION = "COMPUTER_VISION",
}

export enum LaborIntelligenceSource {
  GOVERNMENT_DATA = "GOVERNMENT_DATA",
  JOB_MARKET = "JOB_MARKET",
  SURVEY = "SURVEY",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  ACADEMIC = "ACADEMIC",
  INDUSTRY_REPORT = "INDUSTRY_REPORT",
}

export enum WorkforcePlanningHorizon {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum RecruitmentMetricType {
  TIME_TO_HIRE = "TIME_TO_HIRE",
  COST_PER_HIRE = "COST_PER_HIRE",
  QUALITY_OF_HIRE = "QUALITY_OF_HIRE",
  APPLICATION_RATE = "APPLICATION_RATE",
  OFFER_ACCEPTANCE = "OFFER_ACCEPTANCE",
  DIVERSITY = "DIVERSITY",
}

export enum CareerCompetency {
  COMMUNICATION = "COMMUNICATION",
  TEAMWORK = "TEAMWORK",
  PROBLEM_SOLVING = "PROBLEM_SOLVING",
  LEADERSHIP = "LEADERSHIP",
  DIGITAL_LITERACY = "DIGITAL_LITERACY",
  ADAPTABILITY = "ADAPTABILITY",
  CRITICAL_THINKING = "CRITICAL_THINKING",
}

export enum EmploymentContractType {
  PERMANENT = "PERMANENT",
  FIXED_TERM = "FIXED_TERM",
  ZERO_HOURS = "ZERO_HOURS",
  APPRENTICESHIP = "APPRENTICESHIP",
  FREELANCE = "FREELANCE",
}

export enum JobSearchFilter {
  LOCATION = "LOCATION",
  SALARY = "SALARY",
  INDUSTRY = "INDUSTRY",
  EXPERIENCE = "EXPERIENCE",
  SKILLS = "SKILLS",
  REMOTE = "REMOTE",
  COMPANY = "COMPANY",
}

export enum TalentAcquisitionChannel {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
  REFERRAL = "REFERRAL",
  AGENCY = "AGENCY",
  HEADHUNTING = "HEADHUNTING",
}

export enum CareerTransitionType {
  VERTICAL = "VERTICAL",
  LATERAL = "LATERAL",
  FUNCTIONAL = "FUNCTIONAL",
  INDUSTRY = "INDUSTRY",
  ENTREPRENEURIAL = "ENTREPRENEURIAL",
}

export enum InternshipDurationType {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
  ONGOING = "ONGOING",
}

export enum GraduateEmployabilityIndicator {
  FIRST_DESTINATION = "FIRST_DESTINATION",
  TIME_TO_EMPLOYMENT = "TIME_TO_EMPLOYMENT",
  SALARY = "SALARY",
  JOB_SATISFACTION = "JOB_SATISFACTION",
  SKILL_MATCH = "SKILL_MATCH",
}

export interface GraduateTracking {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  graduationYear: string;
  degree: string;
  field: string;
  institutionId: string;
  institution: string;
  status: GraduateStatus;
  destination: GraduateDestination;
  employmentDate: string;
  employerId: string;
  employer: Employer;
  jobTitle: string;
  employmentType: EmploymentType;
  salary: Salary;
  location: string;
  country: string;
  industry: JobSector;
  careerPathway: CareerPathway;
  remoteWork: RemoteWorkOption;
  furtherStudy: FurtherStudyRecord;
  surveyResponses: GraduateSurveyResponse[];
  careerMilestones: CareerMilestone[];
  skillsAssessment: SkillsAssessment;
  createdAt: string;
  updatedAt: string;
}

export interface InternationalJob {
  id: string;
  title: string;
  description: string;
  employerId: string;
  employer: Employer;
  jobId: string;
  job: JobListing;
  status: JobStatus;
  location: string;
  country: string;
  region: string;
  remoteWork: RemoteWorkOption;
  visaSponsorship: boolean;
  relocationAssistance: boolean;
  languageRequirements: string[];
  internationalBenefits: string[];
  relocationPackage: RelocationPackage;
  culturalAdaptation: CulturalAdaptationSupport;
  visaSponsorshipDetails: VisaSponsorshipDetails;
  globalCompliance: GlobalComplianceInfo;
  applications: JobApplication[];
  createdAt: string;
  updatedAt: string;
}

export interface Employer {
  id: string;
  name: string;
  slug: string;
  description: string;
  employerType: EmployerType;
  industry: JobSector;
  size: string;
  foundedYear: number;
  website: string;
  email: string;
  phone: string;
  logo: string;
  headquarters: Address;
  branches: Address[];
  country: string;
  region: string;
  status: EmployerStatus;
  verified: boolean;
  verificationDate: string;
  verificationDocuments: string[];
  rating: number;
  reviewCount: number;
  reviews: EmployerReview[];
  jobListings: JobListing[];
  internshipPrograms: InternshipProgram[];
  campusEngagement: CampusEngagement[];
  diversityInitiatives: DiversityInitiative[];
  sustainabilityPractices: string[];
  awards: EmployerAward[];
  socialMedia: SocialMediaLinks;
  employeeBenefits: EmployeeBenefit[];
  totalEmployees: number;
  hiringVolume: number;
  averageSalary: number;
  salaryCurrency: SalaryCurrency;
  createdAt: string;
  updatedAt: string;
}

export interface SkillsMatching {
  id: string;
  candidateId: string;
  candidate: GraduateProfile;
  jobId: string;
  job: JobListing;
  matchScore: number;
  matchStatus: SkillMatchStatus;
  requiredSkills: SkillMatch[];
  candidateSkills: SkillMatch[];
  missingSkills: Skill[];
  matchingSkills: Skill[];
  skillGaps: SkillGap[];
  recommendations: SkillRecommendation[];
  algorithm: JobMatchAlgorithm;
  matchDate: string;
  confidence: number;
  reasoning: string;
  createdAt: string;
  updatedAt: string;
}

export interface AICareerEngine {
  id: string;
  engineType: AIEngineType;
  version: string;
  modelId: string;
  accuracy: number;
  trainingData: TrainingDataInfo;
  lastTrained: string;
  recommendations: AICareerRecommendation[];
  predictions: AIPrediction[];
  insights: AIInsight[];
  performanceMetrics: EnginePerformanceMetrics;
  ethicalChecks: EthicalCheck[];
  createdAt: string;
  updatedAt: string;
}

export interface Recruitment {
  id: string;
  title: string;
  description: string;
  employerId: string;
  employer: Employer;
  department: string;
  hiringManager: string;
  recruitmentType: string;
  status: JobStatus;
  stage: RecruitmentStage;
  openDate: string;
  closeDate: string;
  filledDate: string;
  positions: number;
  positionsFilled: number;
  applications: JobApplication[];
  shortlisted: JobCandidate[];
  interviewSchedule: Interview[];
  assessments: Assessment[];
  offers: JobOffer[];
  pipeline: RecruitmentPipeline;
  budget: number;
  salaryRange: SalaryRange;
  currency: SalaryCurrency;
  diversityTargets: DiversityTarget[];
  metrics: RecruitmentMetrics;
  channels: RecruitmentChannel[];
  createdAt: string;
  updatedAt: string;
}

export interface InternshipProgram {
  id: string;
  title: string;
  description: string;
  employerId: string;
  employer: Employer;
  field: string;
  durationWeeks: number;
  durationType: InternshipDurationType;
  compensationType: InternshipCompensationType;
  compensationAmount: number;
  currency: SalaryCurrency;
  status: InternshipStatus;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  maxPositions: number;
  currentPositions: number;
  requirements: string[];
  learningObjectives: string[];
  mentor: MentorProfile;
  supervisor: SupervisorProfile;
  interns: Intern[];
  evaluations: InternshipEvaluation[];
  conversionRate: number;
  satisfactionScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmploymentAnalytics {
  id: string;
  institutionId: string;
  academicYear: string;
  totalGraduates: number;
  surveyResponses: number;
  responseRate: number;
  employmentRate: number;
  averageTimeToEmployment: number;
  averageStartingSalary: number;
  salaryCurrency: SalaryCurrency;
  topEmployers: TopEmployerStat[];
  topIndustries: IndustryStat[];
  topLocations: LocationStat[];
  genderDistribution: GenderEmploymentStat[];
  fieldDistribution: FieldEmploymentStat[];
  careerPathways: CareerPathwayStat[];
  graduateSatisfaction: number;
  skillMatchRate: number;
  internationalEmployment: InternationalEmploymentStat;
  remoteWorkAdoption: number;
  furtherStudyRate: number;
  selfEmploymentRate: number;
  graduateDestinationSummary: GraduateDestinationSummary;
  createdAt: string;
  updatedAt: string;
}

export interface WorkforcePlanning {
  id: string;
  organizationId: string;
  organization: string;
  planName: string;
  description: string;
  horizon: WorkforcePlanningHorizon;
  status: WorkforcePlanStatus;
  startDate: string;
  endDate: string;
  currentWorkforce: WorkforceSnapshot;
  projectedWorkforce: WorkforceProjection[];
  gapAnalysis: WorkforceGap[];
  talentPools: TalentPool[];
  successionPlanning: SuccessionPlan[];
  diversityGoals: DiversityGoal[];
  trainingNeeds: TrainingNeed[];
  budget: number;
  currency: SalaryCurrency;
  kpis: WorkforceKPI[];
  risks: WorkforceRisk[];
  createdAt: string;
  updatedAt: string;
}

export interface LaborIntelligence {
  id: string;
  region: string;
  country: string;
  indicator: LaborMarketIndicator;
  value: number;
  previousValue: number;
  changePercent: number;
  trend: WorkforceTrend;
  period: string;
  source: LaborIntelligenceSource;
  methodology: EmploymentDataCollectionMethod;
  confidence: number;
  breakdowns: LaborMarketBreakdown[];
  forecasts: LaborMarketForecast[];
  comparisons: LaborMarketComparison[];
  relatedIndicators: RelatedIndicator[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface GraduateProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  countryOfResidence: string;
  graduationYear: string;
  institutionId: string;
  institution: string;
  degree: string;
  field: string;
  gpa: number;
  skills: Skill[];
  certifications: Certification[];
  experience: WorkExperience[];
  languages: LanguageProficiency[];
  careerInterests: string[];
  geographicMobility: GeographicMobility;
  desiredSalary: Salary;
  linkedinUrl: string;
  portfolioUrl: string;
  resumeUrl: string;
  profilePhoto: string;
  careerReadiness: CareerReadinessLevel;
  employabilityScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobListing {
  id: string;
  title: string;
  description: string;
  employerId: string;
  employer: Employer;
  department: string;
  employmentType: EmploymentType;
  remoteWork: RemoteWorkOption;
  status: JobStatus;
  location: string;
  country: string;
  region: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: SalaryCurrency;
  salaryPeriod: string;
  requiredSkills: Skill[];
  preferredSkills: Skill[];
  requiredExperience: number;
  requiredEducation: string;
  benefits: JobBenefit[];
  applicationDeadline: string;
  startDate: string;
  visaSponsorship: boolean;
  relocationAssistance: boolean;
  applicationUrl: string;
  applicationsCount: number;
  viewsCount: number;
  postedDate: string;
  expiresDate: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  candidateId: string;
  candidate: GraduateProfile;
  jobId: string;
  job: JobListing;
  status: ApplicationStatus;
  applicationDate: string;
  coverLetter: string;
  resumeUrl: string;
  additionalDocuments: string[];
  screeningAnswers: ScreeningAnswer[];
  matchScore: number;
  recruiterNotes: string;
  interviewHistory: Interview[];
  assessments: AssessmentResult[];
  offer: JobOffer;
  rejectionReason: string;
  withdrawalReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface Salary {
  amount: number;
  currency: SalaryCurrency;
  period: string;
  gross: boolean;
  benefits: number;
  total: number;
}

export interface RelocationPackage {
  provided: boolean;
  amount: number;
  currency: SalaryCurrency;
  covering: string[];
  temporaryHousing: boolean;
  housingDuration: number;
  shippingAllowance: number;
  culturalTraining: boolean;
  languageTraining: boolean;
  familySupport: boolean;
}

export interface VisaSponsorshipDetails {
  provided: boolean;
  visaTypes: string[];
  processingTime: number;
  legalSupport: boolean;
  costCoverage: string;
  requirements: string[];
}

export interface GlobalComplianceInfo {
  laborLawCompliance: boolean;
  taxImplications: string[];
  workPermitRequired: boolean;
  backgroundCheck: boolean;
  drugTest: boolean;
  medicalExam: boolean;
}

export interface CulturalAdaptationSupport {
  orientationProgram: boolean;
  mentorshipProgram: boolean;
  culturalTraining: boolean;
  languageSupport: boolean;
  socialIntegration: boolean;
  familySupport: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  maxLevel: number;
  certified: boolean;
  lastUsed: string;
  yearsExperience: number;
  endorsements: number;
}

export interface SkillMatch {
  skill: Skill;
  required: boolean;
  level: number;
  matched: boolean;
  matchPercent: number;
}

export interface SkillGap {
  skill: Skill;
  requiredLevel: number;
  currentLevel: number;
  gap: number;
  trainingRecommendation: string;
  estimatedTimeToClose: number;
}

export interface SkillRecommendation {
  skill: Skill;
  reason: string;
  priority: string;
  trainingProvider: string;
  estimatedCost: number;
  currency: SalaryCurrency;
  estimatedDuration: number;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  verificationUrl: string;
  skills: Skill[];
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  skills: Skill[];
  achievements: string[];
  location: string;
  country: string;
}

export interface LanguageProficiency {
  languageCode: string;
  languageName: string;
  proficiency: string;
  certified: boolean;
  certificationName: string;
  testScore: number;
}

export interface EmployerReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  title: string;
  pros: string;
  cons: string;
  advice: string;
  employmentStatus: string;
  jobTitle: string;
  date: string;
  verified: boolean;
}

export interface EmployerAward {
  id: string;
  name: string;
  awardingBody: string;
  year: number;
  description: string;
}

export interface SocialMediaLinks {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface EmployeeBenefit {
  type: JobBenefitType;
  description: string;
  value: number;
  currency: SalaryCurrency;
  eligibility: string;
}

export interface DiversityInitiative {
  name: string;
  description: string;
  targetGroup: string;
  metrics: string;
  year: number;
}

export interface CampusEngagement {
  type: EmployerEngagementType;
  date: string;
  description: string;
  participants: number;
  outcome: string;
}

export interface Intern {
  id: string;
  studentId: string;
  student: GraduateProfile;
  programId: string;
  program: InternshipProgram;
  status: InternshipStatus;
  startDate: string;
  endDate: string;
  actualEndDate: string;
  supervisorId: string;
  supervisor: SupervisorProfile;
  mentorId: string;
  mentor: MentorProfile;
  project: string;
  deliverables: string[];
  evaluation: InternshipEvaluation;
  conversionOffered: boolean;
  conversionAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InternshipEvaluation {
  id: string;
  internId: string;
  intern: Intern;
  evaluatorId: string;
  evaluatorName: string;
  evaluationDate: string;
  technicalSkills: number;
  communication: number;
  teamwork: number;
  initiative: number;
  reliability: number;
  overallRating: number;
  strengths: string[];
  improvements: string[];
  comments: string;
  recommendation: string;
  wouldHireAgain: boolean;
}

export interface SupervisorProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
  company: string;
}

export interface MentorProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  company: string;
  industry: string;
  experience: number;
  availability: string;
  mentoringStyle: string;
  maxMentees: number;
  currentMentees: number;
  rating: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface FurtherStudyRecord {
  institution: string;
  program: string;
  degree: string;
  field: string;
  startDate: string;
  expectedEndDate: string;
  funding: string;
  researchArea: string;
}

export interface GraduateSurveyResponse {
  id: string;
  surveyName: string;
  responseDate: string;
  questions: SurveyQuestion[];
  overallSatisfaction: number;
  wouldRecommend: boolean;
  comments: string;
}

export interface SurveyQuestion {
  question: string;
  answer: string;
  rating: number;
}

export interface CareerMilestone {
  id: string;
  event: CareerEvent;
  date: string;
  title: string;
  description: string;
  impact: string;
}

export interface SkillsAssessment {
  date: string;
  overallScore: number;
  technicalScore: number;
  softSkillScore: number;
  leadershipScore: number;
  digitalScore: number;
  competencies: CompetencyScore[];
}

export interface CompetencyScore {
  competency: CareerCompetency;
  score: number;
  level: CareerReadinessLevel;
}

export interface TopEmployerStat {
  employerId: string;
  employerName: string;
  hireCount: number;
  percentage: number;
}

export interface IndustryStat {
  industry: JobSector;
  count: number;
  percentage: number;
}

export interface LocationStat {
  location: string;
  country: string;
  count: number;
  percentage: number;
}

export interface GenderEmploymentStat {
  gender: string;
  employed: number;
  unemployed: number;
  employmentRate: number;
}

export interface FieldEmploymentStat {
  field: string;
  count: number;
  employmentRate: number;
  averageSalary: number;
}

export interface CareerPathwayStat {
  pathway: CareerPathway;
  count: number;
  percentage: number;
}

export interface InternationalEmploymentStat {
  employedAbroad: number;
  percentageAbroad: number;
  topCountries: CountryStat[];
}

export interface GraduateDestinationSummary {
  employed: number;
  furtherStudy: number;
  selfEmployed: number;
  unemployed: number;
  other: number;
}

export interface CountryStat {
  country: string;
  count: number;
  percentage: number;
}

export interface WorkforceSnapshot {
  totalEmployees: number;
  byDepartment: DepartmentStat[];
  byLevel: LevelStat[];
  byAge: AgeStat[];
  byGender: GenderStat[];
  turnoverRate: number;
  averageTenure: number;
  averageAge: number;
}

export interface WorkforceProjection {
  year: string;
  projectedHeadcount: number;
  projectedTurnover: number;
  projectedNewHires: number;
  projectedRetirements: number;
  projectedPromotions: number;
}

export interface WorkforceGap {
  gapType: WorkforceGapType;
  description: string;
  severity: string;
  affectedAreas: string[];
  timeline: string;
  mitigationStrategy: string;
  estimatedCost: number;
  currency: SalaryCurrency;
}

export interface TalentPool {
  id: string;
  name: string;
  poolType: TalentPoolType;
  description: string;
  candidates: GraduateProfile[];
  size: number;
  averageExperience: number;
  topSkills: Skill[];
  geographicDistribution: string[];
  availabilityDate: string;
  engagementScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface SuccessionPlan {
  position: string;
  incumbent: string;
  potentialSuccessors: string[];
  readinessLevel: string;
  developmentActions: string[];
  timeline: string;
  riskLevel: string;
}

export interface DiversityGoal {
  metric: string;
  currentValue: number;
  targetValue: number;
  deadline: string;
  strategies: string[];
}

export interface TrainingNeed {
  skill: Skill;
  currentLevel: number;
  targetLevel: number;
  priority: string;
  trainingProvider: string;
  estimatedCost: number;
  currency: SalaryCurrency;
  duration: number;
}

export interface WorkforceKPI {
  name: string;
  metric: string;
  target: number;
  current: number;
  unit: string;
  trend: string;
}

export interface WorkforceRisk {
  risk: string;
  probability: string;
  impact: string;
  mitigation: string;
  owner: string;
}

export interface LaborMarketBreakdown {
  category: string;
  value: number;
  percentage: number;
}

export interface LaborMarketForecast {
  year: string;
  projectedValue: number;
  confidence: number;
  scenario: string;
}

export interface LaborMarketComparison {
  comparator: string;
  value: number;
  difference: number;
  better: boolean;
}

export interface RelatedIndicator {
  indicator: LaborMarketIndicator;
  value: number;
  correlation: number;
}

export interface Interview {
  id: string;
  applicationId: string;
  application: JobApplication;
  interviewType: InterviewType;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  location: string;
  interviewers: Interviewer[];
  status: string;
  feedback: InterviewFeedback[];
  score: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interviewer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
}

export interface InterviewFeedback {
  interviewerId: string;
  interviewerName: string;
  technicalScore: number;
  communicationScore: number;
  culturalFitScore: number;
  overallScore: number;
  strengths: string[];
  concerns: string[];
  recommendation: string;
  comments: string;
  submittedDate: string;
}

export interface Assessment {
  id: string;
  title: string;
  assessmentType: AssessmentType;
  jobId: string;
  duration: number;
  passingScore: number;
  instructions: string;
  questions: AssessmentQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessment: Assessment;
  candidateId: string;
  candidate: GraduateProfile;
  score: number;
  passingScore: boolean;
  completionDate: string;
  answers: AssessmentAnswer[];
  timeTaken: number;
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string;
  correct: boolean;
  points: number;
}

export interface ScreeningAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface JobOffer {
  id: string;
  applicationId: string;
  application: JobApplication;
  offerDate: string;
  startDate: string;
  expiryDate: string;
  salary: Salary;
  benefits: JobBenefit[];
  employmentType: EmploymentType;
  position: string;
  department: string;
  location: string;
  remoteWork: RemoteWorkOption;
  relocationPackage: RelocationPackage;
  probationPeriod: number;
  noticePeriod: number;
  conditions: string[];
  status: string;
  acceptedDate: string;
  declinedDate: string;
  declineReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentPipeline {
  totalApplicants: number;
  screened: number;
  shortlisted: number;
  interviewed: number;
  assessed: number;
  offered: number;
  hired: number;
  conversionRates: ConversionRate[];
}

export interface ConversionRate {
  fromStage: string;
  toStage: string;
  rate: number;
}

export interface DiversityTarget {
  metric: string;
  target: number;
  current: number;
}

export interface RecruitmentMetrics {
  timeToHire: number;
  costPerHire: number;
  qualityOfHire: number;
  sourceEffectiveness: SourceStat[];
  diversityMetrics: DiversityMetrics;
  candidateExperience: number;
}

export interface SourceStat {
  channel: RecruitmentChannel;
  applicants: number;
  hires: number;
  cost: number;
}

export interface DiversityMetrics {
  genderBalance: number;
  ethnicDiversity: number;
  disabilityInclusion: number;
}

export interface TrainingDataInfo {
  size: number;
  features: number;
  lastUpdated: string;
  sources: string[];
}

export interface AICareerRecommendation {
  id: string;
  userId: string;
  recommendationType: AIRecommendationType;
  title: string;
  description: string;
  confidence: number;
  reasoning: string;
  relevantSkills: Skill[];
  estimatedImpact: number;
  timeframe: string;
  createdAt: string;
}

export interface AIPrediction {
  id: string;
  userId: string;
  predictionType: string;
  value: number;
  confidence: number;
  factors: PredictionFactor[];
  validUntil: string;
  createdAt: string;
}

export interface PredictionFactor {
  factor: string;
  weight: number;
  value: number;
}

export interface AIInsight {
  id: string;
  insightType: string;
  title: string;
  description: string;
  dataPoints: number;
  confidence: number;
  actionable: boolean;
  recommendations: string[];
  createdAt: string;
}

export interface EnginePerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  lastEvaluated: string;
}

export interface EthicalCheck {
  id: string;
  checkType: string;
  status: string;
  issues: string[];
  mitigation: string;
  lastChecked: string;
}

export interface JobBenefit {
  type: JobBenefitType;
  description: string;
  value: number;
  currency: SalaryCurrency;
  eligibility: string;
  waitingPeriod: number;
}

export enum GraduateEmployerRelationship {
  EMPLOYED = "EMPLOYED",
  FORMER_EMPLOYER = "FORMER_EMPLOYER",
  INTERNSHIP_HOST = "INTERNSHIP_HOST",
  PROSPECTIVE = "PROSPECTIVE",
  ALUMNI_NETWORK = "ALUMNI_NETWORK",
}

export enum TalentAcquisitionStatus {
  IDENTIFIED = "IDENTIFIED",
  ENGAGED = "ENGAGED",
  ASSESSED = "ASSESSED",
  OFFERED = "OFFERED",
  HIRED = "HIRED",
  DECLINED = "DECLINED",
}

export enum JobMarketSector {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  NON_PROFIT = "NON_PROFIT",
  INFORMAL = "INFORMAL",
  HYBRID = "HYBRID",
}

export enum CareerDevelopmentStage {
  ENTRY = "ENTRY",
  MID_CAREER = "MID_CAREER",
  SENIOR = "SENIOR",
  EXECUTIVE = "EXECUTIVE",
  LATE_CAREER = "LATE_CAREER",
  POST_CAREER = "POST_CAREER",
}

export enum EmploymentQualityIndicator {
  JOB_SECURITY = "JOB_SECURITY",
  WORK_LIFE_BALANCE = "WORK_LIFE_BALANCE",
  CAREER_PROGRESSION = "CAREER_PROGRESSION",
  COMPENSATION_FAIRNESS = "COMPENSATION_FAIRNESS",
  WORKPLACE_SAFETY = "WORKPLACE_SAFETY",
  INCLUSION = "INCLUSION",
}

export enum GraduateOutcomeQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  SATISFACTORY = "SATISFACTORY",
  BELOW_EXPECTATIONS = "BELOW_EXPECTATIONS",
  POOR = "POOR",
}

export enum WorkforceDevelopmentInitiativeType {
  TRAINING = "TRAINING",
  RESKILLING = "RESKILLING",
  UPSKILLING = "UPSKILLING",
  MENTORING = "MENTORING",
  SCHOLARSHIP = "SCHOLARSHIP",
  INTERNSHIP = "INTERNSHIP",
}

export enum JobSatisfactionDimension {
  OVERALL = "OVERALL",
  COMPENSATION = "COMPENSATION",
  WORK_CONTENT = "WORK_CONTENT",
  MANAGEMENT = "MANAGEMENT",
  COLLEAGUES = "COLLEAGUES",
  GROWTH = "GROWTH",
  BALANCE = "BALANCE",
}

export enum CareerMobilityType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  INTERNATIONAL = "INTERNATIONAL",
  INTERINDUSTRY = "INTERINDUSTRY",
}

export enum GraduateNetworkStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DISENGAGED = "DISENGAGED",
  CHAMPION = "CHAMPION",
}

export interface GraduateEmployerRelationshipRecord {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  employerId: string;
  employer: Employer;
  relationshipType: GraduateEmployerRelationship;
  startDate: string;
  endDate: string;
  duration: number;
  jobTitle: string;
  department: string;
  supervisorName: string;
  exitReason: string;
  wouldRehire: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface TalentAcquisitionRecord {
  id: string;
  talentId: string;
  talent: GraduateProfile;
  employerId: string;
  employer: Employer;
  status: TalentAcquisitionStatus;
  source: TalentAcquisitionChannel;
  position: string;
  identifiedDate: string;
  engagedDate: string;
  assessedDate: string;
  offeredDate: string;
  hiredDate: string;
  declinedDate: string;
  declineReason: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobMarketIntelligence {
  id: string;
  region: string;
  country: string;
  sector: JobMarketSector;
  period: string;
  totalJobs: number;
  newJobs: number;
  filledJobs: number;
  averageTimeToFill: number;
  averageSalary: number;
  salaryCurrency: SalaryCurrency;
  topDemandSkills: SkillDemandStat[];
  topSupplySkills: SkillSupplyStat[];
  skillGaps: MarketSkillGap[];
  salaryTrends: SalaryTrend[];
  hiringTrends: HiringTrend[];
  outlook: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillDemandStat {
  skill: Skill;
  demandCount: number;
  demandGrowth: number;
  averageSalary: number;
}

export interface SkillSupplyStat {
  skill: Skill;
  supplyCount: number;
  supplyGrowth: number;
  unemploymentRate: number;
}

export interface MarketSkillGap {
  skill: Skill;
  demandCount: number;
  supplyCount: number;
  gap: number;
  severity: string;
  projectedGap: number;
}

export interface SalaryTrend {
  year: string;
  averageSalary: number;
  medianSalary: number;
  percentile10: number;
  percentile25: number;
  percentile75: number;
  percentile90: number;
  growth: number;
}

export interface HiringTrend {
  year: string;
  totalHires: number;
  turnover: number;
  newPositions: number;
  costPerHire: number;
  timeToHire: number;
}

export interface CareerPathwayModel {
  id: string;
  name: string;
  description: string;
  startingRoles: string[];
  progressionSteps: ProgressionStep[];
  averageTimePerStep: number;
  timeUnit: string;
  requiredSkills: Skill[];
  successFactors: string[];
  salaryProgression: SalaryProgressionEntry[];
  industryDemand: number;
  geographicDemand: string[];
}

export interface ProgressionStep {
  step: number;
  title: string;
  level: string;
  yearsExperience: number;
  requiredSkills: Skill[];
  typicalSalary: number;
  currency: SalaryCurrency;
}

export interface SalaryProgressionEntry {
  years: number;
  averageSalary: number;
  currency: SalaryCurrency;
}

export interface GraduateEmployabilityAssessment {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  assessmentDate: string;
  overallScore: number;
  dimensions: EmployabilityDimension[];
  strengths: string[];
  developmentAreas: string[];
  recommendations: EmployabilityRecommendation[];
  assessedBy: string;
  methodology: string;
  validityPeriod: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployabilityDimension {
  name: string;
  score: number;
  level: CareerReadinessLevel;
  evidence: string[];
  benchmarks: EmployabilityBenchmark[];
}

export interface EmployabilityBenchmark {
  metric: string;
  value: number;
  average: number;
  topPerformers: number;
}

export interface EmployabilityRecommendation {
  area: string;
  recommendation: string;
  priority: string;
  timeframe: string;
  resources: string[];
}

export interface WorkforceSkillAnalytics {
  id: string;
  institutionId: string;
  institution: string;
  year: string;
  totalGraduates: number;
  skillsAssessed: number;
  skillProficiencyDistribution: SkillProficiencyStat[];
  topSkills: Skill[];
  emergingSkills: Skill[];
  decliningSkills: Skill[];
  industryAlignment: IndustryAlignmentStat[];
  regionalAlignment: RegionalAlignmentStat[];
  genderSkillGap: GenderSkillGapStat[];
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillProficiencyStat {
  skill: Skill;
  proficient: number;
  developing: number;
  beginner: number;
  averageScore: number;
}

export interface IndustryAlignmentStat {
  industry: JobSector;
  alignmentScore: number;
  matchRate: number;
  gapSkills: Skill[];
}

export interface RegionalAlignmentStat {
  region: string;
  alignmentScore: number;
  matchRate: number;
  gapSkills: Skill[];
}

export interface GenderSkillGapStat {
  skill: Skill;
  maleAverage: number;
  femaleAverage: number;
  gap: number;
  significance: string;
}

export interface GraduateCareerPathwayAnalytics {
  id: string;
  institutionId: string;
  institution: string;
  graduationYear: string;
  totalGraduates: number;
  pathways: CareerPathwayDistribution[];
  averageTimeToFirstJob: number;
  firstJobRelevance: number;
  careerSwitchRate: number;
  averagePromotions: number;
  averageSalaryGrowth: number;
  industryDistribution: IndustryStat[];
  geographicDistribution: GeographicStat[];
  entrepreneurshipRate: number;
  furtherStudyRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface CareerPathwayDistribution {
  pathway: CareerPathway;
  count: number;
  percentage: number;
  averageSalary: number;
  satisfactionScore: number;
}

export interface GeographicStat {
  location: string;
  country: string;
  count: number;
  percentage: number;
}

export interface WorkforceRetentionAnalytics {
  id: string;
  employerId: string;
  employer: Employer;
  period: string;
  totalEmployees: number;
  newHires: number;
  departures: number;
  turnoverRate: number;
  retentionRate: number;
  voluntaryTurnover: number;
  involuntaryTurnover: number;
  averageTenure: number;
  averageTenureByLevel: TenureByLevel[];
  turnoverByDepartment: TurnoverByDepartment[];
  exitReasons: ExitReasonStat[];
  retentionByGender: RetentionByGender[];
  costOfTurnover: number;
  createdAt: string;
  updatedAt: string;
}

export interface TenureByLevel {
  level: string;
  averageTenure: number;
  medianTenure: number;
}

export interface TurnoverByDepartment {
  department: string;
  turnoverRate: number;
  departures: number;
}

export interface ExitReasonStat {
  reason: string;
  count: number;
  percentage: number;
}

export interface RetentionByGender {
  gender: string;
  retentionRate: number;
  averageTenure: number;
}

export interface GraduateJobMatchAnalytics {
  id: string;
  institutionId: string;
  institution: string;
  graduationYear: string;
  totalGraduates: number;
  matchedGraduates: number;
  matchRate: number;
  averageMatchScore: number;
  matchByField: FieldMatchStat[];
  matchByRegion: RegionMatchStat[];
  matchBySkillLevel: SkillLevelMatchStat[];
  timeToMatch: number;
  matchAccuracy: number;
  employerSatisfaction: number;
  graduateSatisfaction: number;
  createdAt: string;
  updatedAt: string;
}

export interface FieldMatchStat {
  field: string;
  matchCount: number;
  matchRate: number;
  averageScore: number;
}

export interface RegionMatchStat {
  region: string;
  matchCount: number;
  matchRate: number;
}

export interface SkillLevelMatchStat {
  level: CareerReadinessLevel;
  matchCount: number;
  matchRate: number;
  averageScore: number;
}

export interface InternshipConversionAnalytics {
  id: string;
  employerId: string;
  employer: Employer;
  year: string;
  totalInterns: number;
  convertedToFullTime: number;
  conversionRate: number;
  averageInternshipDuration: number;
  conversionByField: FieldConversionStat[];
  conversionByGender: GenderConversionStat[];
  averageTimeToConvert: number;
  retentionAfterConversion: number;
  employerSatisfaction: number;
  internSatisfaction: number;
  topConversionFactors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FieldConversionStat {
  field: string;
  interns: number;
  converted: number;
  conversionRate: number;
}

export interface GenderConversionStat {
  gender: string;
  interns: number;
  converted: number;
  conversionRate: number;
}

export interface GraduateSurveyAnalytics {
  id: string;
  institutionId: string;
  institution: string;
  surveyYear: string;
  surveyName: string;
  totalGraduates: number;
  totalResponses: number;
  responseRate: number;
  overallSatisfaction: number;
  employmentSatisfaction: number;
  salarySatisfaction: number;
  careerProgressionSatisfaction: number;
  skillRelevance: number;
  institutionRecommendation: number;
  wouldChooseAgain: number;
  topStrengths: string[];
  topImprovements: string[];
  demographicBreakdown: SurveyDemographicStat[];
  createdAt: string;
  updatedAt: string;
}

export interface SurveyDemographicStat {
  demographic: string;
  value: string;
  count: number;
  averageSatisfaction: number;
  employmentRate: number;
}

export interface WorkforceDiversityAnalytics {
  id: string;
  employerId: string;
  employer: Employer;
  year: string;
  totalEmployees: number;
  genderDistribution: GenderDiversityStat[];
  ethnicDistribution: EthnicDiversityStat[];
  ageDistribution: AgeDiversityStat[];
  disabilityRepresentation: number;
  diversityIndex: number;
  inclusionScore: number;
  payEquityGap: number;
  representationByLevel: RepresentationByLevel[];
  hiringDiversity: HiringDiversityStat[];
  retentionDiversity: RetentionDiversityStat[];
  createdAt: string;
  updatedAt: string;
}

export interface GenderDiversityStat {
  gender: string;
  count: number;
  percentage: number;
}

export interface EthnicDiversityStat {
  ethnicity: string;
  count: number;
  percentage: number;
}

export interface AgeDiversityStat {
  ageGroup: string;
  count: number;
  percentage: number;
}

export interface RepresentationByLevel {
  level: string;
  genderBreakdown: GenderDiversityStat[];
  ethnicBreakdown: EthnicDiversityStat[];
}

export interface HiringDiversityStat {
  gender: string;
  hired: number;
  hiredPercent: number;
  applicantPercent: number;
}

export interface RetentionDiversityStat {
  gender: string;
  retained: number;
  retentionRate: number;
  averageTenure: number;
}

export interface GraduateOnboardingRecord {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  employerId: string;
  employer: Employer;
  position: string;
  startDate: string;
  onboardingStatus: string;
  onboardingChecklist: OnboardingChecklistItem[];
  assignedBuddy: string;
  assignedMentor: string;
  trainingSchedule: string;
  firstReviewDate: string;
  completionPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingChecklistItem {
  item: string;
  completed: boolean;
  completedDate: string;
  assignedTo: string;
  notes: string;
}

export interface GraduateExitInterview {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  employerId: string;
  employer: Employer;
  exitDate: string;
  reasonForLeaving: string;
  overallSatisfaction: number;
  managementSatisfaction: number;
  compensationSatisfaction: number;
  growthOpportunities: number;
  workLifeBalance: number;
  wouldRecommend: boolean;
  wouldReturn: boolean;
  suggestions: string[];
  comments: string;
  interviewerName: string;
  interviewDate: string;
}

export interface WorkforceDemandForecast {
  id: string;
  employerId: string;
  employer: Employer;
  forecastYear: string;
  totalHeadcountProjected: number;
  newHiresProjected: number;
  departuresProjected: number;
  skillDemandForecast: SkillDemandForecastItem[];
  departmentForecasts: DepartmentForecast[];
  budgetForecast: number;
  currency: SalaryCurrency;
  confidence: number;
  assumptions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillDemandForecastItem {
  skill: Skill;
  currentDemand: number;
  projectedDemand: number;
  growth: number;
  shortageRisk: string;
}

export interface DepartmentForecast {
  department: string;
  currentHeadcount: number;
  projectedHeadcount: number;
  newHiresNeeded: number;
  departuresExpected: number;
  topSkillsNeeded: Skill[];
}

export interface GraduateSalaryBenchmark {
  id: string;
  field: string;
  degree: string;
  experienceLevel: string;
  region: string;
  country: string;
  year: string;
  percentile10: number;
  percentile25: number;
  median: number;
  percentile75: number;
  percentile90: number;
  currency: SalaryCurrency;
  sampleSize: number;
  source: string;
  lastUpdated: string;
  createdAt: string;
}

export interface EmployerBrandScore {
  id: string;
  employerId: string;
  employer: Employer;
  assessmentDate: string;
  overallScore: number;
  careerSiteScore: number;
  socialMediaScore: number;
  reviewScore: number;
  offerAcceptanceRate: number;
  employeeAdvocacyScore: number;
  talentAttractionIndex: number;
  competitors: CompetitorBrandStat[];
  strengths: string[];
  improvements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorBrandStat {
  competitorId: string;
  competitorName: string;
  brandScore: number;
  overallRank: number;
}

export interface GraduateCareerSatisfaction {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  assessmentDate: string;
  overallSatisfaction: number;
  careerProgressSatisfaction: number;
  compensationSatisfaction: number;
  workLifeBalance: number;
  relationshipWithManager: number;
  colleaguesRelationship: number;
  learningOpportunities: number;
  jobSecurity: number;
  meaningfulWork: number;
  wouldRecommend: boolean;
  fiveYearGoal: string;
  biggestChallenge: string;
  supportNeeded: string[];
}

export interface WorkforceTrainingAnalytics {
  id: string;
  employerId: string;
  employer: Employer;
  year: string;
  totalTrainingHours: number;
  trainingBudget: number;
  currency: SalaryCurrency;
  employeesTrained: number;
  trainingParticipationRate: number;
  programsOffered: TrainingProgramStat[];
  skillsImproved: SkillImprovementStat[];
  roi: number;
  averageSatisfaction: number;
  certificationsEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingProgramStat {
  programName: string;
  participants: number;
  completionRate: number;
  satisfactionScore: number;
  skillImprovement: number;
  costPerParticipant: number;
}

export interface SkillImprovementStat {
  skill: Skill;
  beforeScore: number;
  afterScore: number;
  improvement: number;
  participants: number;
}

export interface GraduateJobSearchAnalytics {
  id: string;
  graduateId: string;
  graduate: GraduateProfile;
  searchStartDate: string;
  searchEndDate: string;
  totalApplications: number;
  totalInterviews: number;
  totalOffers: number;
  totalRejections: number;
  applicationsByIndustry: ApplicationByIndustryStat[];
  applicationsByRegion: ApplicationByRegionStat[];
  averageResponseTime: number;
  averageInterviewScore: number;
  searchOutcome: string;
  firstOfferSalary: number;
  firstOfferCurrency: SalaryCurrency;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationByIndustryStat {
  industry: JobSector;
  applications: number;
  interviews: number;
  offers: number;
}

export interface ApplicationByRegionStat {
  region: string;
  applications: number;
  interviews: number;
  offers: number;
}

export interface EmployerRecruitmentFunnel {
  id: string;
  employerId: string;
  employer: Employer;
  period: string;
  totalJobViews: number;
  totalApplications: number;
  totalScreened: number;
  totalInterviewed: number;
  totalAssessed: number;
  totalOffered: number;
  totalHired: number;
  conversionRates: RecruitmentFunnelConversion[];
  averageTimePerStage: TimePerStage[];
  topSources: RecruitmentSourceStat[];
  costPerChannel: CostPerChannelStat[];
}

export interface RecruitmentFunnelConversion {
  fromStage: string;
  toStage: string;
  rate: number;
  benchmark: number;
}

export interface TimePerStage {
  stage: string;
  averageDays: number;
  benchmark: number;
}

export interface RecruitmentSourceStat {
  source: RecruitmentChannel;
  applications: number;
  hires: number;
  cost: number;
  qualityScore: number;
}

export interface CostPerChannelStat {
  channel: RecruitmentChannel;
  totalCost: number;
  costPerApplication: number;
  costPerHire: number;
  roi: number;
}

export interface GraduateSkillGapAnalysis {
  id: string;
  institutionId: string;
  institution: string;
  graduationYear: string;
  totalGraduates: number;
  skillGaps: InstitutionalSkillGap[];
  overallGapScore: number;
  industryAlignment: number;
  topGapFields: FieldGapStat[];
  recommendations: string[];
  methodology: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionalSkillGap {
  skill: Skill;
  requiredLevel: number;
  averageLevel: number;
  gap: number;
  gapPercent: number;
  criticality: string;
  affectedFields: string[];
}

export interface FieldGapStat {
  field: string;
  averageGap: number;
  graduateCount: number;
  topMissingSkills: Skill[];
}
