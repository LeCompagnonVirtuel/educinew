export enum OrganizationType {
  INTERGOVERNMENTAL = "INTERGOVERNMENTAL",
  NON_GOVERNMENTAL = "NON_GOVERNMENTAL",
  GOVERNMENTAL = "GOVERNMENTAL",
  ACADEMIC = "ACADEMIC",
  RESEARCH = "RESEARCH",
  FOUNDATION = "FOUNDATION",
  MULTILATERAL = "MULTILATERAL",
  BILATERAL = "BILATERAL",
}

export enum OrganizationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DISSOLVED = "DISSOLVED",
  SUSPENDED = "SUSPENDED",
  RESTRUCTURING = "RESTRUCTURING",
  MERGED = "MERGED",
}

export enum MembershipTier {
  FULL = "FULL",
  ASSOCIATE = "ASSOCIATE",
  OBSERVER = "OBSERVER",
  PROVISIONAL = "PROVISIONAL",
  HONORARY = "HONORARY",
  AFFILIATED = "AFFILIATED",
}

export enum ProjectStatus {
  PROPOSED = "PROPOSED",
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  EXTENDED = "EXTENDED",
}

export enum ProjectType {
  TECHNICAL_ASSISTANCE = "TECHNICAL_ASSISTANCE",
  CAPACITY_BUILDING = "CAPACITY_BUILDING",
  RESEARCH = "RESEARCH",
  INNOVATION = "INNOVATION",
  POLICY_SUPPORT = "POLICY_SUPPORT",
  MONITORING = "MONITORING",
  EMERGENCY = "EMERGENCY",
  DEVELOPMENT = "DEVELOPMENT",
}

export enum FundingType {
  GRANT = "GRANT",
  LOAN = "LOAN",
  CONCESSIONAL = "CONCESSIONAL",
  BLENDED = "BLENDED",
  COFINANCING = "COFINANCING",
  IN_KIND = "IN_KIND",
}

export enum PartnershipLevel {
  STRATEGIC = "STRATEGIC",
  OPERATIONAL = "OPERATIONAL",
  TECHNICAL = "TECHNICAL",
  FINANCIAL = "FINANCIAL",
  ADVISORY = "ADVISORY",
  COLLABORATIVE = "COLLABORATIVE",
}

export enum RegionScope {
  GLOBAL = "GLOBAL",
  AFRICA = "AFRICA",
  ASIA_PACIFIC = "ASIA_PACIFIC",
  EUROPE = "EUROPE",
  AMERICAS = "AMERICAS",
  MIDDLE_EAST = "MIDDLE_EAST",
  SUB_SAHARAN = "SUB_SAHARAN",
}

export enum FocusArea {
  BASIC_EDUCATION = "BASIC_EDUCATION",
  HIGHER_EDUCATION = "HIGHER_EDUCATION",
  TECHNICAL_VOCATIONAL = "TECHNICAL_VOCATIONAL",
  TEACHER_EDUCATION = "TEACHER_EDUCATION",
  LITERACY = "LITERACY",
  STEM = "STEM",
  INCLUSION = "INCLUSION",
  QUALITY = "QUALITY",
  GOVERNANCE = "GOVERNANCE",
  DIGITAL = "DIGITAL",
  EARLY_CHILDHOOD = "EARLY_CHILDHOOD",
  YOUTH = "YOUTH",
}

export enum UniversityRankingType {
  QS_WORLD = "QS_WORLD",
  TIMES_HIGHER = "TIMES_HIGHER",
  ARWU = "ARWU",
  US_NEWS = "US_NEWS",
  WEBOMETRICS = "WEBOMETRICS",
  CWUR = "CWUR",
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
}

export enum AccreditationStatus {
  ACCREDITED = "ACCREDITED",
  CONDITIONALLY_ACCREDITED = "CONDITIONALLY_ACCREDITED",
  PROBATIONARY = "PROBATIONARY",
  NOT_ACCREDITED = "NOT_ACCREDITED",
  PENDING_REVIEW = "PENDING_REVIEW",
  SUSPENDED = "SUSPENDED",
}

export enum NgoType {
  INTERNATIONAL = "INTERNATIONAL",
  NATIONAL = "NATIONAL",
  LOCAL = "LOCAL",
  GRASSROOTS = "GRASSROOTS",
  NETWORK = "NETWORK",
  COALITION = "COALITION",
  FOUNDATION = "FOUNDATION",
}

export enum NgoStatus {
  REGISTERED = "REGISTERED",
  PENDING_REGISTRATION = "PENDING_REGISTRATION",
  DEREGISTERED = "DEREGISTERED",
  SUSPENDED = "SUSPENDED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum MemberCategory {
  COUNTRY = "COUNTRY",
  INSTITUTION = "INSTITUTION",
  ORGANIZATION = "ORGANIZATION",
  INDIVIDUAL = "INDIVIDUAL",
  ASSOCIATE = "ASSOCIATE",
}

export enum CollaborationType {
  RESEARCH = "RESEARCH",
  EXCHANGE = "EXCHANGE",
  JOINT_PROGRAM = "JOINT_PROGRAM",
  FRANCHISE = "FRANCHISE",
  ACCREDITATION = "ACCREDITATION",
  MOBILITY = "MOBILITY",
  twinning = "twinning",
}

export enum ProgramType {
  DEGREE = "DEGREE",
  CERTIFICATE = "CERTIFICATE",
  DIPLOMA = "DIPLOMA",
  SHORT_COURSE = "SHORT_COURSE",
  WORKSHOP = "WORKSHOP",
  SEMINAR = "SEMINAR",
  CONFERENCE = "CONFERENCE",
}

export enum ResearchFocus {
  EDUCATION_POLICY = "EDUCATION_POLICY",
  PEDAGOGY = "PEDAGOGY",
  CURRICULUM = "CURRICULUM",
  ASSESSMENT = "ASSESSMENT",
  TECHNOLOGY = "TECHNOLOGY",
  INCLUSION = "INCLUSION",
  LEADERSHIP = "LEADERSHIP",
  EQUITY = "EQUITY",
}

export enum ImpactMetricType {
  STUDENTS_REACHED = "STUDENTS_REACHED",
  TEACHERS_TRAINED = "TEACHERS_TRAINED",
  INSTITUTIONS_SUPPORTED = "INSTITUTIONS_SUPPORTED",
  POLICIES_INFLUENCED = "POLICIES_INFLUENCED",
  FUNDS_MOBILIZED = "FUNDS_MOBILIZED",
  RESEARCH_OUTPUTS = "RESEARCH_OUTPUTS",
}

export enum ReportType {
  ANNUAL = "ANNUAL",
  QUARTERLY = "QUARTERLY",
  PROJECT = "PROJECT",
  FINANCIAL = "FINANCIAL",
  IMPACT = "IMPACT",
  AUDIT = "AUDIT",
  EVALUATION = "EVALUATION",
  STRATEGIC = "STRATEGIC",
}

export enum GovernanceBody {
  GENERAL_ASSEMBLY = "GENERAL_ASSEMBLY",
  EXECUTIVE_BOARD = "EXECUTIVE_BOARD",
  COUNCIL = "COUNCIL",
  COMMISSION = "COMMISSION",
  SECRETARIAT = "SECRETARIAT",
  COMMITTEE = "COMMITTEE",
}

export enum RegionMembership {
  FULL = "FULL",
  ASSOCIATE = "ASSOCIATE",
  OBSERVER = "OBSERVER",
  CANDIDATE = "CANDIDATE",
  FORMER = "FORMER",
}

export enum TradeAgreementType {
  FREE_TRADE = "FREE_TRADE",
  CUSTOMS_UNION = "CUSTOMS_UNION",
  COMMON_MARKET = "COMMON_MARKET",
  ECONOMIC_UNION = "ECONOMIC_UNION",
  MONETARY_UNION = "MONETARY_UNION",
  POLITICAL_UNION = "POLITICAL_UNION",
}

export enum QualityAssuranceType {
  INSTITUTIONAL = "INSTITUTIONAL",
  PROGRAM = "PROGRAM",
  ACCREDITATION = "ACCREDITATION",
  AUDIT = "AUDIT",
  REVIEW = "REVIEW",
  RANKING = "RANKING",
  BENCHMARKING = "BENCHMARKING",
}

export enum ScholarshipType {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  TUITION = "TUITION",
  LIVING = "LIVING",
  TRAVEL = "TRAVEL",
  RESEARCH = "RESEARCH",
  MERIT = "MERIT",
  NEED = "NEED",
}

export enum AcademicCalendarType {
  SEMESTER = "SEMESTER",
  TRIMESTER = "TRIMESTER",
  QUARTER = "QUARTER",
  ANNUAL = "ANNUAL",
  FLEXIBLE = "FLEXIBLE",
}

export enum ConferenceType {
  INTERNATIONAL = "INTERNATIONAL",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  VIRTUAL = "VIRTUAL",
  HYBRID = "HYBRID",
}

export enum JournalRanking {
  Q1 = "Q1",
  Q2 = "Q2",
  Q3 = "Q3",
  Q4 = "Q4",
  SCOPUS = "SCOPUS",
  WOS = "WOS",
  NONE = "NONE",
}

export enum IntellectualPropertyType {
  PATENT = "PATENT",
  COPYRIGHT = "COPYRIGHT",
  TRADEMARK = "TRADEMARK",
  TRADE_SECRET = "TRADE_SECRET",
  OPEN_SOURCE = "OPEN_SOURCE",
  CREATIVE_COMMONS = "CREATIVE_COMMONS",
}

export enum CapacityBuildingLevel {
  INSTITUTIONAL = "INSTITUTIONAL",
  INDIVIDUAL = "INDIVIDUAL",
  SYSTEM = "SYSTEM",
  COMMUNITY = "COMMUNITY",
  SECTOR = "SECTOR",
}

export enum MonitoringFramework {
  RESULTS_BASED = "RESULTS_BASED",
  LOGICAL_FRAMEWORK = "LOGICAL_FRAMEWORK",
  THEORY_OF_CHANGE = "THEORY_OF_CHANGE",
  PARTICIPATORY = "PARTICIPATORY",
  GENDER_RESPONSIVE = "GENDER_RESPONSIVE",
}

export enum EvaluationMethodology {
  FORMATIVE = "FORMATIVE",
  SUMMATIVE = "SUMMATIVE",
  PROCESS = "PROCESS",
  OUTCOME = "OUTCOME",
  IMPACT = "IMPACT",
  COST_EFFECTIVENESS = "COST_EFFECTIVENESS",
}

export enum CommunicationChannel {
  EMAIL = "EMAIL",
  NEWSLETTER = "NEWSLETTER",
  WEBSITE = "WEBSITE",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  PRESS_RELEASE = "PRESS_RELEASE",
  CONFERENCE = "CONFERENCE",
  WEBINAR = "WEBINAR",
}

export enum KnowledgeProduct {
  REPORT = "REPORT",
  RESEARCH_PAPER = "RESEARCH_PAPER",
  BOOK = "BOOK",
  BRIEF = "BRIEF",
  TOOLKIT = "TOOLKIT",
  GUIDELINE = "GUIDELINE",
  MANUAL = "MANUAL",
  DATABASE = "DATABASE",
}

export enum StakeholderRole {
  FUNDER = "FUNDER",
  IMPLEMENTER = "IMPLEMENTER",
  BENEFICIARY = "BENEFICIARY",
  MONITOR = "MONITOR",
  ADVISOR = "ADVISOR",
  PARTNER = "PARTNER",
}

export enum OrganizationalMaturity {
  STARTUP = "STARTUP",
  GROWING = "GROWING",
  MATURE = "MATURE",
  TRANSFORMING = "TRANSFORMING",
  DECLINING = "DECLINING",
}

export enum StrategicPriority {
  EXPANSION = "EXPANSION",
  DIVERSIFICATION = "DIVERSIFICATION",
  DEEPENING = "DEEPENING",
  INNOVATION = "INNOVATION",
  EFFICIENCY = "EFFICIENCY",
  IMPACT = "IMPACT",
}

export enum BenchmarkCategory {
  RESEARCH_OUTPUT = "RESEARCH_OUTPUT",
  TEACHING_QUALITY = "TEACHING_QUALITY",
  STUDENT_SUCCESS = "STUDENT_SUCCESS",
  GLOBAL_ENGAGEMENT = "GLOBAL_ENGAGEMENT",
  REPUTATION = "REPUTATION",
  SUSTAINABILITY = "SUSTAINABILITY",
}

export enum NetworkType {
  RESEARCH = "RESEARCH",
  TEACHING = "TEACHING",
  POLICY = "POLICY",
  ADVOCACY = "ADVOCACY",
  PROFESSIONAL = "PROFESSIONAL",
  INDUSTRY = "INDUSTRY",
}

export enum AllianceScope {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  GLOBAL = "GLOBAL",
  REGIONAL = "REGIONAL",
  SECTORAL = "SECTORAL",
}

export enum CollaborationStatus {
  PROPOSED = "PROPOSED",
  NEGOTIATING = "NEGOTIATING",
  ACTIVE = "ACTIVE",
  IMPLEMENTING = "IMPLEMENTING",
  MONITORING = "MONITORING",
  COMPLETED = "COMPLETED",
  TERMINATED = "TERMINATED",
}

export enum MembershipFeeCurrency {
  USD = "USD",
  EUR = "EUR",
  CHF = "CHF",
  GBP = "GBP",
}

export enum VotingRightType {
  FULL = "FULL",
  LIMITED = "LIMITED",
  OBSERVER = "OBSERVER",
  NONE = "NONE",
}

export enum ExecutiveCommitteeRole {
  CHAIR = "CHAIR",
  VICE_CHAIR = "VICE_CHAIR",
  SECRETARY = "SECRETARY",
  TREASURER = "TREASURER",
  MEMBER = "MEMBER",
}

export enum StrategicPlanPhase {
  DEVELOPMENT = "DEVELOPMENT",
  ADOPTION = "ADOPTION",
  IMPLEMENTATION = "IMPLEMENTATION",
  MONITORING = "MONITORING",
  EVALUATION = "EVALUATION",
  RENEWAL = "RENEWAL",
}

export enum OrganizationalValue {
  EXCELLENCE = "EXCELLENCE",
  INTEGRITY = "INTEGRITY",
  INNOVATION = "INNOVATION",
  INCLUSION = "INCLUSION",
  SUSTAINABILITY = "SUSTAINABILITY",
  COLLABORATION = "COLLABORATION",
}

export enum CommunicationStrategy {
  AWARENESS = "AWARENESS",
  ADVOCACY = "ADVOCACY",
  ENGAGEMENT = "ENGAGEMENT",
  MOBILIZATION = "MOBILIZATION",
  FUNDRAISING = "FUNDRAISING",
  REPORTING = "REPORTING",
}

export enum DigitalMaturityLevel {
  BEGINNER = "BEGINNER",
  DEVELOPING = "DEVELOPING",
  PROFICIENT = "PROFICIENT",
  ADVANCED = "ADVANCED",
  LEADING = "LEADING",
}

export enum TechnologyFocus {
  LMS = "LMS",
  MOOC = "MOOC",
  AI = "AI",
  DATA_ANALYTICS = "DATA_ANALYTICS",
  VR_AR = "VR_AR",
  BLOCKCHAIN = "BLOCKCHAIN",
  CLOUD = "CLOUD",
}

export enum SustainabilityGoal {
  CLIMATE = "CLIMATE",
  GENDER = "GENDER",
  POVERTY = "POVERTY",
  HEALTH = "HEALTH",
  PEACE = "PEACE",
  PARTNERSHIP = "PARTNERSHIP",
}

export enum KnowledgeExchangeType {
  SOUTH_SOUTH = "SOUTH_SOUTH",
  NORTH_SOUTH = "NORTH_SOUTH",
  TRIANGULAR = "TRIANGULAR",
  PEER = "PEER",
  MENTORING = "MENTORING",
}

export enum ProgramDuration {
  ONE_DAY = "ONE_DAY",
  ONE_WEEK = "ONE_WEEK",
  ONE_MONTH = "ONE_MONTH",
  THREE_MONTHS = "THREE_MONTHS",
  SIX_MONTHS = "SIX_MONTHS",
  ONE_YEAR = "ONE_YEAR",
  MULTIPLE_YEARS = "MULTIPLE_YEARS",
}

export enum ResourceCategory {
  HUMAN = "HUMAN",
  FINANCIAL = "FINANCIAL",
  TECHNICAL = "TECHNICAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  MATERIAL = "MATERIAL",
}

export enum PartnershipStatus {
  EXPLORE = "EXPLORE",
  FORMALIZE = "FORMALIZE",
  IMPLEMENT = "IMPLEMENT",
  EVALUATE = "EVALUATE",
  RENEW = "RENEW",
  CLOSE = "CLOSE",
}

export enum MembershipStatus {
  APPLIED = "APPLIED",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  WITHDRAWN = "WITHDRAWN",
  EXPELLED = "EXPELLED",
}

export enum ServiceType {
  TRAINING = "TRAINING",
  CONSULTING = "CONSULTING",
  ASSESSMENT = "ASSESSMENT",
  CERTIFICATION = "CERTIFICATION",
  PUBLICATION = "PUBLICATION",
  DATABASE = "DATABASE",
}

export enum RegionalInitiativeType {
  POLICY = "POLICY",
  CAPACITY = "CAPACITY",
  RESEARCH = "RESEARCH",
  MOBILITY = "MOBILITY",
  QUALITY = "QUALITY",
  INNOVATION = "INNOVATION",
}

export enum QualityFramework {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum BenchmarkStatus {
  BASELINE = "BASELINE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  UPDATED = "UPDATED",
}

export enum TrendDirection {
  IMPROVING = "IMPROVING",
  DECLINING = "DECLINING",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
}

export enum PartnershipType {
  RESEARCH = "RESEARCH",
  TEACHING = "TEACHING",
  EXCHANGE = "EXCHANGE",
  JOINT_PROGRAM = "JOINT_PROGRAM",
  FRANCHISE = "FRANCHISE",
  ACCREDITATION = "ACCREDITATION",
  MOBILITY = "MOBILITY",
  TWINNING = "TWINNING",
  CAPACITY_BUILDING = "CAPACITY_BUILDING",
  INNOVATION = "INNOVATION",
}

export interface UNESCOProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberStates: number;
  website: string;
  directorGeneral: string;
  motto: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  fields: FocusArea[];
  majorPrograms: string[];
  conventions: string[];
  publications: string[];
  partnerships: string[];
  regionalOffices: UNESCORegionalOffice[];
  institutes: UNESCOInstitute[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UNESCORegionalOffice {
  officeId: string;
  officeName: string;
  region: string;
  location: string;
  countries: string[];
  director: string;
  staffCount: number;
  programs: string[];
}

export interface UNESCOInstitute {
  instituteId: string;
  instituteName: string;
  focusArea: string;
  location: string;
  director: string;
  establishedDate: string;
  researchAreas: string[];
}

export interface UNICEFProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberStates: number;
  website: string;
  executiveDirector: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  countryOffices: UNICEFCountryOffice[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UNICEFCountryOffice {
  officeId: string;
  countryId: string;
  countryName: string;
  officeLocation: string;
  representative: string;
  staffCount: number;
  programs: string[];
}

export interface WorldBankProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberCountries: number;
  website: string;
  president: string;
  officialLanguages: string[];
  totalAssets: number;
  lendingPortfolio: number;
  staffCount: number;
  focusAreas: string[];
  educationProjects: WorldBankProject[];
  countryStrategy: string[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldBankProject {
  projectId: string;
  projectTitle: string;
  country: string;
  sector: string;
  status: ProjectStatus;
  amount: number;
  currencyCode: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface OECDProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberCountries: number;
  website: string;
  secretaryGeneral: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  dataSets: string[];
  publications: string[];
  partnerships: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AfricanUnionProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberStates: number;
  website: string;
  chairperson: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  memberRegionalEconomicCommunities: string[];
  agendax: string[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ECOWASProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberStates: number;
  website: string;
  president: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  memberCountries: string[];
  educationInitiatives: string[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EUProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberStates: number;
  website: string;
  president: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  memberCountries: string[];
  erasmusPrograms: string[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ASEANProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberStates: number;
  website: string;
  secretaryGeneral: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  memberCountries: string[];
  educationInitiatives: string[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CommonwealthProfile {
  id: string;
  organizationName: string;
  fullName: string;
  headquarters: string;
  foundedDate: string;
  memberCountries: number;
  website: string;
  secretaryGeneral: string;
  officialLanguages: string[];
  budget: number;
  staffCount: number;
  focusAreas: string[];
  majorPrograms: string[];
  memberCountriesList: string[];
  educationInitiatives: string[];
  partnerships: string[];
  publications: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InternationalUniversity {
  id: string;
  universityName: string;
  universityCode: string;
  country: string;
  city: string;
  website: string;
  foundedDate: string;
  universityType: string;
  accreditationStatus: AccreditationStatus;
  accreditationBody: string;
  rankingType: UniversityRankingType;
  ranking: number;
  globalRanking: number;
  regionalRanking: number;
  studentPopulation: number;
  internationalStudents: number;
  facultyCount: number;
  programs: UniversityProgram[];
  researchOutput: UniversityResearchOutput;
  internationalPartnerships: string[];
  exchangePrograms: string[];
  scholarships: string[];
  publications: string[];
  facilities: string[];
  languagesOfInstruction: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UniversityProgram {
  programId: string;
  programName: string;
  degreeLevel: string;
  fieldOfStudy: string;
  duration: string;
  credits: number;
  language: string;
  isAccredited: boolean;
  accreditationBody: string;
  enrollmentCapacity: number;
  tuitionFee: number;
  currencyCode: string;
  isOnline: boolean;
  isHybrid: boolean;
}

export interface UniversityResearchOutput {
  totalPublications: number;
  citationCount: number;
  hIndex: number;
  patents: number;
  researchFunding: number;
  currencyCode: string;
  activeProjects: number;
  researchCenters: string[];
}

export interface InternationalNGO {
  id: string;
  organizationName: string;
  organizationCode: string;
  ngoType: NgoType;
  ngoStatus: NgoStatus;
  headquarters: string;
  headquartersCountry: string;
  foundedDate: string;
  website: string;
  executiveDirector: string;
  officialLanguages: string[];
  annualBudget: number;
  currencyCode: string;
  staffCount: number;
  volunteersCount: number;
  countriesOfOperation: string[];
  focusAreas: string[];
  targetBeneficiaries: string[];
  fundingSources: string[];
  majorPrograms: NGOProgram[];
  partnerships: string[];
  publications: string[];
  achievements: string[];
  isAccredited: boolean;
  accreditationBody: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NGOProgram {
  programId: string;
  programName: string;
  description: string;
  status: ProjectStatus;
  countries: string[];
  beneficiaries: number;
  budget: number;
  currencyCode: string;
  startDate: string;
  endDate: string;
  outcomes: string[];
}

export interface InternationalProject {
  id: string;
  projectTitle: string;
  projectCode: string;
  projectType: ProjectType;
  projectStatus: ProjectStatus;
  description: string;
  leadOrganization: string;
  leadCountry: string;
  partnerOrganizations: string[];
  partnerCountries: string[];
  fundingSource: string;
  fundingType: FundingType;
  totalBudget: number;
  currencyCode: string;
  disbursedAmount: number;
  committedAmount: number;
  startDate: string;
  endDate: string;
  actualEndDate: string | null;
  extensionDate: string | null;
  objectives: string[];
  activities: ProjectActivity[];
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
  expectedOutcomes: string[];
  actualOutcomes: string[];
  beneficiaries: ProjectBeneficiary[];
  impact: ProjectImpact[];
  risks: ProjectRisk[];
  monitoringFramework: string;
  evaluationPlan: string;
  sustainabilityPlan: string;
  lessonsLearned: string[];
  reports: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProjectActivity {
  activityId: string;
  activityName: string;
  description: string;
  startDate: string;
  endDate: string;
  responsibleParty: string;
  status: string;
  budget: number;
  progress: number;
  dependencies: string[];
}

export interface ProjectMilestone {
  milestoneId: string;
  milestoneName: string;
  description: string;
  targetDate: string;
  actualDate: string | null;
  status: string;
  deliverables: string[];
}

export interface ProjectDeliverable {
  deliverableId: string;
  deliverableName: string;
  description: string;
  dueDate: string;
  completionDate: string | null;
  status: string;
  verifiedBy: string;
}

export interface ProjectBeneficiary {
  beneficiaryType: string;
  count: number;
  gender: string;
  ageGroup: string;
  location: string;
}

export interface ProjectImpact {
  impactArea: string;
  indicator: string;
  baseline: number;
  target: number;
  actual: number;
  unit: string;
}

export interface ProjectRisk {
  riskId: string;
  riskDescription: string;
  likelihood: number;
  impact: number;
  mitigationStrategy: string;
  responsiblePerson: string;
  status: string;
}

export interface WorldEducationOrganizationMembership {
  id: string;
  organizationId: string;
  memberEntityId: string;
  memberEntityType: MemberCategory;
  membershipTier: MembershipTier;
  membershipDate: string;
  expiryDate: string | null;
  membershipFee: number;
  currencyCode: string;
  feePaymentStatus: string;
  votingRights: VotingRightType;
  benefits: string[];
  obligations: string[];
  status: MembershipStatus;
  renewalDate: string | null;
  representative: string;
  representativeEmail: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationProgram {
  id: string;
  programName: string;
  organizationId: string;
  programType: ProgramType;
  description: string;
  focusArea: string;
  targetCountries: string[];
  targetBeneficiaries: string[];
  budget: number;
  currencyCode: string;
  fundingSources: string[];
  startDate: string;
  endDate: string | null;
  duration: ProgramDuration;
  enrollmentCapacity: number;
  currentEnrollment: number;
  status: ProjectStatus;
  outcomes: string[];
  activities: string[];
  partners: string[];
  reports: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationResearch {
  id: string;
  researchTitle: string;
  organizationId: string;
  researchFocus: ResearchFocus;
  description: string;
  principalInvestigators: string[];
  institutions: string[];
  countries: string[];
  startDate: string;
  endDate: string | null;
  budget: number;
  currencyCode: string;
  fundingSource: string;
  methodology: string;
  status: ProjectStatus;
  publications: ResearchPublication[];
  dataSets: string[];
  impact: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ResearchPublication {
  publicationId: string;
  title: string;
  authors: string[];
  journal: string;
  journalRanking: JournalRanking;
  publicationDate: string;
  doi: string;
  citations: number;
  impactFactor: number;
  isPeerReviewed: boolean;
}

export interface WorldEducationOrganizationReport {
  id: string;
  reportTitle: string;
  organizationId: string;
  reportType: ReportType;
  description: string;
  reportingPeriod: string;
  author: string;
  publicationDate: string;
  pageCount: number;
  fileSize: number;
  fileFormat: string;
  downloadUrl: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  language: string;
  isPublic: boolean;
  downloads: number;
  citations: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationGovernance {
  id: string;
  organizationId: string;
  governanceBody: GovernanceBody;
  bodyName: string;
  composition: GovernanceComposition[];
  meetingFrequency: string;
  quorum: number;
  decisionMakingProcess: string;
  lastMeetingDate: string;
  nextMeetingDate: string;
  chairperson: string;
  secretary: string;
  committees: string[];
  charter: string;
  bylaws: string;
  minutes: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GovernanceComposition {
  memberId: string;
  memberName: string;
  memberCountry: string;
  role: string;
  termStart: string;
  termEnd: string | null;
  isActive: boolean;
}

export interface WorldEducationOrganizationImpact {
  id: string;
  organizationId: string;
  impactYear: number;
  metricType: ImpactMetricType;
  metricName: string;
  value: number;
  unit: string;
  changeFromPrevious: number;
  targetValue: number;
  methodology: string;
  dataSources: string[];
  verifiedBy: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationScholarship {
  id: string;
  scholarshipName: string;
  organizationId: string;
  scholarshipType: ScholarshipType;
  description: string;
  value: number;
  currencyCode: string;
  coverage: string[];
  eligibilityCriteria: string[];
  applicationDeadline: string;
  awardDate: string;
  duration: string;
  targetCountries: string[];
  targetLevel: string[];
  fieldsOfStudy: string[];
  applicationRequirements: string[];
  selectionCriteria: string[];
  contactEmail: string;
  website: string;
  isActive: boolean;
  totalAwards: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationConference {
  id: string;
  conferenceTitle: string;
  organizationId: string;
  conferenceType: ConferenceType;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  isVirtual: boolean;
  virtualPlatform: string | null;
  expectedAttendees: number;
  actualAttendees: number | null;
  speakers: ConferenceSpeaker[];
  agenda: ConferenceSession[];
  sponsors: string[];
  registrationFee: number;
  currencyCode: string;
  registrationDeadline: string;
  earlyBirdDeadline: string;
  website: string;
  proceedings: string;
  outcomes: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ConferenceSpeaker {
  speakerId: string;
  name: string;
  title: string;
  organization: string;
  country: string;
  biography: string;
  topics: string[];
  isKeynote: boolean;
}

export interface ConferenceSession {
  sessionId: string;
  sessionTitle: string;
  sessionType: string;
  startTime: string;
  endTime: string;
  room: string;
  speakers: string[];
  description: string;
  capacity: number;
}

export interface WorldEducationOrganizationPartnership {
  id: string;
  partnershipTitle: string;
  organization1Id: string;
  organization1Name: string;
  organization2Id: string;
  organization2Name: string;
  partnershipType: PartnershipType;
  partnershipLevel: PartnershipLevel;
  status: CollaborationStatus;
  startDate: string;
  endDate: string | null;
  renewalDate: string | null;
  objectives: string[];
  activities: string[];
  funding: PartnershipFunding[];
  outcomes: string[];
  governance: string;
  contactPersons: PartnershipContact[];
  agreements: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PartnershipFunding {
  fundingId: string;
  source: string;
  amount: number;
  currencyCode: string;
  type: FundingType;
  conditions: string[];
}

export interface PartnershipContact {
  contactId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  organization: string;
}

export interface WorldEducationOrganizationQualityAssurance {
  id: string;
  organizationId: string;
  assuranceType: QualityAssuranceType;
  description: string;
  standard: string;
  framework: QualityFramework;
  assessmentDate: string;
  assessorOrganization: string;
  score: number;
  maxScore: number;
  rating: string;
  accreditationStatus: AccreditationStatus;
  accreditationBody: string;
  accreditationDate: string;
  accreditationExpiry: string;
  conditions: string[];
  recommendations: string[];
  documents: string[];
  nextReviewDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationCapacityBuilding {
  id: string;
  programTitle: string;
  organizationId: string;
  capacityLevel: CapacityBuildingLevel;
  description: string;
  targetAudience: string[];
  targetCountries: string[];
  trainingMethodology: string;
  duration: ProgramDuration;
  startDate: string;
  endDate: string | null;
  budget: number;
  currencyCode: string;
  fundingSource: string;
  trainers: string[];
  participants: CapacityBuildingParticipant[];
  outcomes: string[];
  materials: string[];
  certifications: string[];
  followUpSupport: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CapacityBuildingParticipant {
  participantId: string;
  name: string;
  organization: string;
  country: string;
  role: string;
  completedModules: string[];
  score: number;
  certificationEarned: boolean;
}

export interface WorldEducationOrganizationNetwork {
  id: string;
  networkName: string;
  networkType: NetworkType;
  description: string;
  leadOrganization: string;
  foundingMembers: string[];
  memberCount: number;
  memberCountries: string[];
  foundingDate: string;
  objectives: string[];
  activities: string[];
  meetings: NetworkMeeting[];
  publications: string[];
  budget: number;
  currencyCode: string;
  website: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NetworkMeeting {
  meetingId: string;
  meetingTitle: string;
  meetingDate: string;
  location: string;
  attendees: string[];
  agenda: string[];
  outcomes: string[];
  documents: string[];
}

export interface WorldEducationOrganizationBenchmark {
  id: string;
  benchmarkName: string;
  benchmarkCategory: BenchmarkCategory;
  description: string;
  organizationId: string;
  benchmarkYear: number;
  globalAverage: number;
  regionalAverage: number;
  topPerformers: BenchmarkEntity[];
  metrics: BenchmarkMetric[];
  methodology: string;
  dataSources: string[];
  trend: TrendDirection;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BenchmarkEntity {
  entityId: string;
  entityName: string;
  entityCountry: string;
  score: number;
  rank: number;
}

export interface BenchmarkMetric {
  metricName: string;
  value: number;
  unit: string;
  change: number;
  target: number | null;
}

export interface WorldEducationOrganizationAlliance {
  id: string;
  allianceName: string;
  allianceScope: AllianceScope;
  description: string;
  leadOrganization: string;
  memberOrganizations: AllianceMember[];
  foundingDate: string;
  objectives: string[];
  workAreas: string[];
  governanceStructure: string;
  meetingSchedule: string;
  fundingMechanism: string;
  sharedResources: string[];
  jointProjects: string[];
  publications: string[];
  website: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AllianceMember {
  memberId: string;
  memberName: string;
  memberCountry: string;
  joinDate: string;
  role: string;
  contributions: string[];
  isActive: boolean;
}

export interface WorldEducationOrganizationKnowledgeHub {
  id: string;
  hubName: string;
  organizationId: string;
  description: string;
  focusArea: string;
  resources: KnowledgeResource[];
  experts: KnowledgeExpert[];
  events: string[];
  publications: string[];
  dataSets: string[];
  tools: string[];
  partnerships: string[];
  website: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface KnowledgeResource {
  resourceId: string;
  resourceName: string;
  resourceType: KnowledgeProduct;
  description: string;
  authors: string[];
  publicationDate: string;
  url: string;
  downloads: number;
  citations: number;
}

export interface KnowledgeExpert {
  expertId: string;
  name: string;
  title: string;
  organization: string;
  expertise: string[];
  publications: number;
  hIndex: number;
  availableForConsultation: boolean;
}

export interface WorldEducationOrganizationAdvocacy {
  id: string;
  campaignTitle: string;
  organizationId: string;
  description: string;
  targetAudience: string[];
  keyMessages: string[];
  channels: CommunicationChannel[];
  startDate: string;
  endDate: string | null;
  budget: number;
  currencyCode: string;
  reach: number;
  engagement: number;
  outcomes: string[];
  partners: string[];
  materials: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationFunding {
  id: string;
  organizationId: string;
  fundingYear: number;
  totalFunding: number;
  currencyCode: string;
  sources: FundingSource[];
  allocation: FundingAllocation[];
  expenditure: number;
  reserves: number;
  auditStatus: string;
  auditDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FundingSource {
  sourceId: string;
  sourceName: string;
  sourceType: string;
  amount: number;
  currencyCode: string;
  conditions: string[];
  disbursementStatus: string;
}

export interface FundingAllocation {
  allocationId: string;
  programArea: string;
  amount: number;
  percentage: number;
  currencyCode: string;
}

export interface WorldEducationOrganizationDataHub {
  id: string;
  hubName: string;
  organizationId: string;
  description: string;
  dataCategories: string[];
  datasets: DataHubDataset[];
  indicators: string[];
  accessLevel: string;
  updateFrequency: string;
  lastUpdated: string;
  totalRecords: number;
  dataQuality: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DataHubDataset {
  datasetId: string;
  datasetName: string;
  description: string;
  category: string;
  country: string;
  year: string;
  records: number;
  lastUpdated: string;
  accessUrl: string;
  format: string;
}

export interface WorldEducationOrganizationInnovation {
  id: string;
  innovationTitle: string;
  organizationId: string;
  description: string;
  innovationType: string;
  technologyFocus: TechnologyFocus;
  status: ProjectStatus;
  countries: string[];
  beneficiaries: number;
  budget: number;
  currencyCode: string;
  fundingSource: string;
  partners: string[];
  outcomes: string[];
  publications: string[];
  awards: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationSustainability {
  id: string;
  organizationId: string;
  sustainabilityYear: number;
  environmentalImpact: SustainabilityMetric;
  socialImpact: SustainabilityMetric;
  economicImpact: SustainabilityMetric;
  governanceImpact: SustainabilityMetric;
  sdgAlignment: SDGAlignment[];
  sustainabilityGoals: string[];
  carbonFootprint: number;
  emissionsReduction: number;
  renewableEnergyPercentage: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SustainabilityMetric {
  score: number;
  maxScore: number;
  initiatives: string[];
  outcomes: string[];
}

export interface SDGAlignment {
  sdgNumber: number;
  sdgName: string;
  alignmentLevel: string;
  contributions: string[];
}

export interface WorldEducationOrganizationMedia {
  id: string;
  mediaTitle: string;
  organizationId: string;
  mediaType: string;
  description: string;
  publishDate: string;
  url: string;
  author: string;
  reach: number;
  engagement: number;
  language: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationAlumni {
  id: string;
  organizationId: string;
  totalAlumni: number;
  alumniByCountry: AlumniCountry[];
  alumniEngagement: AlumniEngagement;
  alumniNetwork: string;
  mentorshipProgram: boolean;
  reunions: string[];
  contributions: number;
  currencyCode: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AlumniCountry {
  country: string;
  count: number;
  activeAlumni: number;
}

export interface AlumniEngagement {
  eventsAttended: number;
  mentorshipPairs: number;
  donationsReceived: number;
  volunteerHours: number;
}

export interface WorldEducationOrganizationTechnology {
  id: string;
  organizationId: string;
  technologyName: string;
  description: string;
  maturityLevel: DigitalMaturityLevel;
  adoptionStatus: string;
  implementationDate: string;
  users: number;
  features: string[];
  integrations: string[];
  cost: number;
  currencyCode: string;
  vendor: string;
  version: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationMembershipDirectory {
  id: string;
  organizationId: string;
  directoryYear: number;
  totalMembers: number;
  membersByRegion: MembershipByRegion[];
  membersByType: MembershipByType[];
  newMembers: number;
  renewedMembers: number;
  expiredMembers: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MembershipByRegion {
  region: string;
  count: number;
  percentage: number;
}

export interface MembershipByType {
  type: MemberCategory;
  count: number;
  percentage: number;
}

export interface WorldEducationOrganizationStrategicPlan {
  id: string;
  planTitle: string;
  organizationId: string;
  planPhase: StrategicPlanPhase;
  planPeriod: string;
  vision: string;
  mission: string;
  values: OrganizationalValue[];
  strategicObjectives: StrategicObjective[];
  budget: number;
  currencyCode: string;
  approvedBy: string;
  approvalDate: string;
  reviewDate: string;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface StrategicObjective {
  objectiveId: string;
  objectiveTitle: string;
  description: string;
  targetDate: string;
  responsibleParty: string;
  keyResults: string[];
  progress: number;
  status: string;
}

export interface WorldEducationOrganizationCompliance {
  id: string;
  organizationId: string;
  complianceArea: string;
  complianceStatus: string;
  lastAssessmentDate: string;
  nextAssessmentDate: string;
  assessor: string;
  findings: string[];
  correctiveActions: string[];
  documentation: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationPerformance {
  id: string;
  organizationId: string;
  performanceYear: number;
  overallScore: number;
  performanceAreas: PerformanceArea[];
  achievements: string[];
  challenges: string[];
  improvementAreas: string[];
  benchmarkComparison: string[];
  stakeholderSatisfaction: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PerformanceArea {
  areaName: string;
  score: number;
  maxScore: number;
  weight: number;
  indicators: string[];
  trend: TrendDirection;
}

export interface WorldEducationOrganizationCrisis {
  id: string;
  crisisTitle: string;
  organizationId: string;
  crisisType: string;
  severity: string;
  description: string;
  affectedAreas: string[];
  responseActions: string[];
  responseTeam: string[];
  startDate: string;
  endDate: string | null;
  status: string;
  lessonsLearned: string[];
  recoveryPlan: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WorldEducationOrganizationFutureInitiative {
  id: string;
  initiativeTitle: string;
  organizationId: string;
  description: string;
  strategicPriority: StrategicPriority;
  status: string;
  expectedImpact: string;
  timeline: string;
  budget: number;
  currencyCode: string;
  fundingStatus: string;
  partners: string[];
  risks: string[];
  dependencies: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
