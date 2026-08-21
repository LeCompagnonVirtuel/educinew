export enum ResearchProjectStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  TERMINATED = "TERMINATED",
}

export enum ResearchPhase {
  CONCEPT = "CONCEPT",
  PROPOSAL = "PROPOSAL",
  FUNDING = "FUNDING",
  PLANNING = "PLANNING",
  EXECUTION = "EXECUTION",
  DATA_COLLECTION = "DATA_COLLECTION",
  ANALYSIS = "ANALYSIS",
  WRITING = "WRITING",
  PEER_REVIEW = "PEER_REVIEW",
  PUBLICATION = "PUBLICATION",
  DISSEMINATION = "DISSEMINATION",
}

export enum PublicationType {
  JOURNAL_ARTICLE = "JOURNAL_ARTICLE",
  CONFERENCE_PAPER = "CONFERENCE_PAPER",
  BOOK = "BOOK",
  BOOK_CHAPTER = "BOOK_CHAPTER",
  THESIS = "THESIS",
  PATENT = "PATENT",
  TECHNICAL_REPORT = "TECHNICAL_REPORT",
  WORKING_PAPER = "WORKING_PAPER",
  PREPRINT = "PREPRINT",
  REVIEW = "REVIEW",
}

export enum PeerReviewStatus {
  INVITED = "INVITED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  REVISION_REQUIRED = "REVISION_REQUIRED",
  ACCEPTED_FINAL = "ACCEPTED_FINAL",
  REJECTED = "REJECTED",
}

export enum GrantStatus {
  OPEN = "OPEN",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  FUNDED = "FUNDED",
  PARTIALLY_FUNDED = "PARTIALLY_FUNDED",
  REJECTED = "REJECTED",
  CLOSED = "CLOSED",
}

export enum PatentStatus {
  IDEA = "IDEA",
  PROVISIONAL = "PROVISIONAL",
  FILED = "FILED",
  UNDER_EXAMINATION = "UNDER_EXAMINATION",
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  EXPIRED = "EXPIRED",
  LICENSED = "LICENSED",
}

export enum ResearchCenterType {
  UNIVERSITY = "UNIVERSITY",
  GOVERNMENT = "GOVERNMENT",
  PRIVATE = "PRIVATE",
  INTERGOVERNMENTAL = "INTERGOVERNMENTAL",
  NONPROFIT = "NONPROFIT",
  JOINT = "JOINT",
  VIRTUAL = "VIRTUAL",
  FIELD = "FIELD",
}

export enum CollaborationType {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  CONSORTIUM = "CONSORTIUM",
  NETWORK = "NETWORK",
  PUBLIC_PRIVATE = "PUBLIC_PRIVATE",
  INTERNATIONAL = "INTERATIONAL",
  INDUSTRY = "INDUSTRY",
}

export enum InnovationLabStatus {
  PLANNING = "PLANNING",
  OPERATIONAL = "OPERATIONAL",
  SCALING = "SCALING",
  MATURE = "MATURE",
  TRANSITIONING = "TRANSITIONING",
  CLOSING = "CLOSING",
  CLOSED = "CLOSED",
}

export enum JournalImpactTier {
  Q1 = "Q1",
  Q2 = "Q2",
  Q3 = "Q3",
  Q4 = "Q4",
  UNRANKED = "UNRANKED",
}

export enum CitationMetricType {
  H_INDEX = "H_INDEX",
  I10_INDEX = "I10_INDEX",
  TOTAL_CITATIONS = "TOTAL_CITATIONS",
  AVG_CITATIONS_PER_PAPER = "AVG_CITATIONS_PER_PAPER",
  CITED_PAPERS_RATIO = "CITED_PAPERS_RATIO",
}

export enum ResearchField {
  STEM = "STEM",
  SOCIAL_SCIENCES = "SOCIAL_SCIENCES",
  HUMANITIES = "HUMANITIES",
  MEDICAL = "MEDICAL",
  ENGINEERING = "ENGINEERING",
  BUSINESS = "BUSINESS",
  EDUCATION = "EDUCATION",
  LAW = "LAW",
  ARTS = "ARTS",
  INTERDISCIPLINARY = "INTERDISCIPLINARY",
}

export enum FundingAgencyType {
  GOVERNMENT = "GOVERNMENT",
  INTERNATIONAL = "INTERNATIONAL",
  FOUNDATION = "FOUNDATION",
  CORPORATE = "CORPORATE",
  MULTILATERAL = "MULTILATERAL",
  PRIVATE = "PRIVATE",
  MIXED = "MIXED",
}

export enum ResearchOutputType {
  PUBLICATION = "PUBLICATION",
  PATENT = "PATENT",
  PROTOTYPE = "PROTOTYPE",
  SOFTWARE = "SOFTWARE",
  DATASET = "DATASET",
  POLICY_BRIEF = "POLICY_BRIEF",
  CONFERENCE_PRESENTATION = "CONFERENCE_PRESENTATION",
  WORKSHOP = "WORKSHOP",
}

export enum IntellectualPropertyType {
  PATENT = "PATENT",
  COPYRIGHT = "COPYRIGHT",
  TRADE_SECRET = "TRADE_SECRET",
  TRADEMARK = "TRADEMARK",
  DATA_LICENSE = "DATA_LICENSE",
  SOFTWARE_LICENSE = "SOFTWARE_LICENSE",
}

export enum ResearchEthicsStatus {
  NOT_REQUIRED = "NOT_REQUIRED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  CONDITIONALLY_APPROVED = "CONDITIONALLY_APPROVED",
  REJECTED = "REJECTED",
  AMENDMENT_REQUIRED = "AMENDMENT_REQUIRED",
  SUSPENDED = "SUSPENDED",
}

export enum GrantDisbursementType {
  LUMP_SUM = "LUMP_SUM",
  MILESTONE = "MILESTONE",
  PROGRESSIVE = "PROGRESSIVE",
  REIMBURSEMENT = "REIMBURSEMENT",
  ADVANCE = "ADVANCE",
}

export enum ResearchCollaborationStatus {
  PROPOSED = "PROPOSED",
  NEGOTIATING = "NEGOTIATING",
  FORMALIZED = "FORMALIZED",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  TERMINATED = "TERMINATED",
}

export enum DataSharingPolicy {
  OPEN = "OPEN",
  RESTRICTED = "RESTRICTED",
  CONTROLLED = "CONTROLLED",
  CONFIDENTIAL = "CONFIDENTIAL",
  PROPRIETARY = "PROPRIETARY",
}

export enum PeerReviewType {
  SINGLE_BLIND = "SINGLE_BLIND",
  DOUBLE_BLIND = "DOUBLE_BLIND",
  OPEN = "OPEN",
  POST_PUBLICATION = "POST_PUBLICATION",
  PLATFORM = "PLATFORM",
}

export enum ResearchFacilityType {
  LABORATORY = "LABORATORY",
  FIELD_STATION = "FIELD_STATION",
  OBSERVATORY = "OBSERVATORY",
  COMPUTING_CENTER = "COMPUTING_CENTER",
  DATA_CENTER = "DATA_CENTER",
  CLINICAL = "CLINICAL",
  FABRICATION = "FABRICATION",
}

export enum GrantBudgetCategory {
  PERSONNEL = "PERSONNEL",
  EQUIPMENT = "EQUIPMENT",
  SUPPLIES = "SUPPLIES",
  TRAVEL = "TRAVEL",
  SUBCONTRACTS = "SUBCONTRACTS",
  OVERHEAD = "OVERHEAD",
  OTHER = "OTHER",
}

export enum PublicationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REVISION_REQUIRED = "REVISION_REQUIRED",
  REVISED = "REVISED",
  ACCEPTED = "ACCEPTED",
  PUBLISHED = "PUBLISHED",
  WITHDRAWN = "WITHDRAWN",
}

export enum ResearchCenterStatus {
  PROPOSED = "PROPOSED",
  APPROVED = "APPROVED",
  OPERATIONAL = "OPERATIONAL",
  UNDER_EVALUATION = "UNDER_EVALUATION",
  RENEWED = "RENEWED",
  SUSPENDED = "SUSPENDED",
  DISSOLVED = "DISSOLVED",
}

export enum ConferenceType {
  INTERNATIONAL = "INTERNATIONAL",
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  WORKSHOP = "WORKSHOP",
  SYMPOSIUM = "SYMPOSIUM",
  COLLOQUIUM = "COLLOQUIUM",
  SUMMER_SCHOOL = "SUMMER_SCHOOL",
  VIRTUAL = "VIRTUAL",
}

export enum InnovationStage {
  IDEA = "IDEA",
  CONCEPT = "CONCEPT",
  PROTOTYPE = "PROTOTYPE",
  MVP = "MVP",
  PILOT = "PILOT",
  SCALE = "SCALE",
  MARKET = "MARKET",
}

export enum CollaborationAgreementType {
  MOU = "MOU",
  NDA = "NDA",
  RESEARCH_AGREEMENT = "RESEARCH_AGREEMENT",
  LICENSE_AGREEMENT = "LICENSE_AGREEMENT",
  JOINT_VENTURE = "JOINT_VENTURE",
  CONSORTIUM_AGREEMENT = "CONSORTIUM_AGREEMENT",
}

export enum JournalIndexingStatus {
  INDEXED = "INDEXED",
  PENDING = "PENDING",
  NOT_INDEXED = "NOT_INDEXED",
  REMOVED = "REMOVED",
}

export enum ResearchDataFormat {
  RAW = "RAW",
  PROCESSED = "PROCESSED",
  ANALYZED = "ANALYZED",
  VISUALIZED = "VISUALIZED",
  PUBLISHED = "PUBLISHED",
}

export enum PatentClassification {
  UTILITY = "UTILITY",
  DESIGN = "DESIGN",
  PLANT = "PLANT",
  PROVISIONAL = "PROVISIONAL",
  PCT = "PCT",
}

export enum InnovationFundingType {
  GRANT = "GRANT",
  INVESTMENT = "INVESTMENT",
  CROWDFUNDING = "CROWDFUNDING",
  CORPORATE_SPONSORSHIP = "CORPORATE_SPONSORSHIP",
  GOVERNMENT = "GOVERNMENT",
}

export enum ResearchCareerLevel {
  PhD_STUDENT = "PHD_STUDENT",
  POSTDOC = "POSTDOC",
  RESEARCH_ASSOCIATE = "RESEARCH_ASSOCIATE",
  RESEARCH_FELLOW = "RESEARCH_FELLOW",
  PRINCIPAL_INVESTIGATOR = "PRINCIPAL_INVESTIGATOR",
  SENIOR_RESEARCHER = "SENIOR_RESEARCHER",
  PROFESSOR = "PROFESSOR",
}

export enum CollaborationOutputType {
  JOINT_PUBLICATION = "JOINT_PUBLICATION",
  JOINT_PATENT = "JOINT_PATENT",
  SHARED_DATASET = "SHARED_DATASET",
  SOFTWARE_TOOL = "SOFTWARE_TOOL",
  POLICY_BRIEF = "POLICY_BRIEF",
  TRAINING_PROGRAM = "TRAINING_PROGRAM",
}

export enum ResearchImpactType {
  ACADEMIC = "ACADEMIC",
  ECONOMIC = "ECONOMIC",
  SOCIAL = "SOCIAL",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  POLICY = "POLICY",
  HEALTH = "HEALTH",
  CULTURAL = "CULTURAL",
}

export enum GrantReportingFrequency {
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  MILESTONE = "MILESTONE",
  FINAL = "FINAL",
}

export enum PeerReviewerExpertise {
  EXPERT = "EXPERT",
  EXPERIENCED = "EXPERIENCED",
  COMPETENT = "COMPETENT",
  GENERALIST = "GENERALIST",
}

export enum ResearchComplianceType {
  IRB = "IRB",
  Biosafety = "Biosafety",
  ExportControl = "ExportControl",
  ConflictOfInterest = "ConflictOfInterest",
  DataProtection = "DataProtection",
  AnimalWelfare = "AnimalWelfare",
}

export enum InnovationProtectionStatus {
  UNPROTECTED = "UNPROTECTED",
  PENDING = "PENDING",
  PROTECTED = "PROTECTED",
  EXPIRED = "EXPIRED",
}

export enum ResearchFacilityStatus {
  PLANNING = "PLANNING",
  CONSTRUCTING = "CONSTRUCTING",
  OPERATIONAL = "OPERATIONAL",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  DECOMMISSIONED = "DECOMMISSIONED",
}

export enum ConferencePresentationType {
  KEYNOTE = "KEYNOTE",
  PLENARY = "PLENARY",
  ORAL = "ORAL",
  POSTER = "POSTER",
  WORKSHOP = "WORKSHOP",
  PANEL = "PANEL",
  INVITED = "INVITED",
}

export enum GrantEvaluationCriteria {
  SCIENTIFIC_MERIT = "SCIENTIFIC_MERIT",
  INNOVATION = "INNOVATION",
  IMPACT = "IMPACT",
  FEASIBILITY = "FEASIBILITY",
  TEAM_QUALITY = "TEAM_QUALITY",
  BUDGET = "BUDGET",
  ETHICS = "ETHICS",
}

export enum ResearchOutputStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  ACCEPTED = "ACCEPTED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum CollaborationNetworkType {
  RESEARCH = "RESEARCH",
  INNOVATION = "INNOVATION",
  POLICY = "POLICY",
  INDUSTRY = "INDUSTRY",
  CAPACITY_BUILDING = "CAPACITY_BUILDING",
}

export enum InnovationEcosystemComponent {
  UNIVERSITIES = "UNIVERSITIES",
  STARTUPS = "STARTUPS",
  CORPORATIONS = "CORPORATIONS",
  INVESTORS = "INVESTORS",
  GOVERNMENT = "GOVERNMENT",
  INCUBATORS = "INCUBATORS",
  ACCELERATORS = "ACCELERATORS",
}

export enum ResearchDataRepositoryType {
  INSTITUTIONAL = "INSTITUTIONAL",
  DISCIPLINE_SPECIFIC = "DISCIPLINE_SPECIFIC",
  GENERAL = "GENERAL",
  GOVERNMENT = "GOVERNMENT",
  PRIVATE = "PRIVATE",
}

export enum PatentLicenseType {
  EXCLUSIVE = "EXCLUSIVE",
  NON_EXCLUSIVE = "NON_EXCLUSIVE",
  SOLE = "SOLE",
  CROSS_LICENSE = "CROSS_LICENSE",
}

export enum ResearchCollaborationLevel {
  COOPERATION = "COOPERATION",
  COORDINATION = "COORDINATION",
  COLLABORATION = "COLLABORATION",
  INTEGRATION = "INTEGRATION",
  ALLIANCE = "ALLIANCE",
}

export enum JournalEditorialRole {
  EDITOR_IN_CHIEF = "EDITOR_IN_CHIEF",
  DEPUTY_EDITOR = "DEPUTY_EDITOR",
  ASSOCIATE_EDITOR = "ASSOCIATE_EDITOR",
  SECTION_EDITOR = "SECTION_EDITOR",
  EDITORIAL_BOARD = "EDITORIAL_BOARD",
  GUEST_EDITOR = "GUEST_EDITOR",
}

export enum InnovationMetricType {
  PATENTS_FILED = "PATENTS_FILED",
  PATENTS_GRANTED = "PATENTS_GRANTED",
  LICENSES_SIGNED = "LICENSES_SIGNED",
  STARTUPS_LAUNCHED = "STARTUPS_LAUNCHED",
  REVENUE_GENERATED = "REVENUE_GENERATED",
  JOBS_CREATED = "JOBS_CREATED",
}

export enum ResearchGrantReportingStatus {
  ON_TRACK = "ON_TRACK",
  DELAYED = "DELAYED",
  AT_RISK = "AT_RISK",
  CRITICAL = "CRITICAL",
  COMPLETED = "COMPLETED",
}

export interface ResearchProject {
  id: string;
  title: string;
  code: string;
  description: string;
  principalInvestigatorId: string;
  principalInvestigator: Researcher;
  coInvestigators: Researcher[];
  teamMembers: Researcher[];
  institutionId: string;
  institution: ResearchCenter;
  field: ResearchField;
  phase: ResearchPhase;
  status: ResearchProjectStatus;
  startDate: string;
  endDate: string;
  durationMonths: number;
  totalBudget: number;
  fundingSource: string;
  fundingAgency: FundingAgency;
  grantId: string;
  grant: Grant;
  objectives: string[];
  methodology: string;
  expectedOutputs: string[];
  actualOutputs: ResearchOutput[];
  publications: Publication[];
  patents: Patent[];
  ethicsApproval: ResearchEthicsApproval;
  dataManagementPlan: DataManagementPlan;
  collaborators: ResearchCollaboration[];
  milestones: ResearchMilestone[];
  reports: ResearchReport[];
  tags: string[];
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResearchCenter {
  id: string;
  name: string;
  code: string;
  centerType: ResearchCenterType;
  description: string;
  institutionId: string;
  institution: string;
  director: Researcher;
  address: string;
  city: string;
  country: string;
  website: string;
  email: string;
  phone: string;
  establishedDate: string;
  status: ResearchCenterStatus;
  fields: ResearchField[];
  facilities: ResearchFacility[];
  staff: Researcher[];
  projects: ResearchProject[];
  publications: Publication[];
  patents: Patent[];
  annualBudget: number;
  funding: FundingSource[];
  partnerships: ResearchCollaboration[];
  ranking: CenterRanking;
  metrics: CenterMetrics;
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: Researcher[];
  correspondingAuthor: Researcher;
  publicationType: PublicationType;
  journal: Journal;
  conference: Conference;
  status: PublicationStatus;
  abstract: string;
  keywords: string[];
  doi: string;
  isbn: string;
  issn: string;
  volume: string;
  issue: string;
  pages: string;
  publicationDate: string;
  submittedDate: string;
  acceptedDate: string;
  url: string;
  pdfUrl: string;
  citations: Citation[];
  citationCount: number;
  downloads: number;
  altmetricScore: number;
  openAccess: boolean;
  license: string;
  peerReviewType: PeerReviewType;
  peerReviewers: PeerReviewer[];
  fundingAcknowledgments: string[];
  supplementaryMaterials: SupplementaryMaterial[];
  createdAt: string;
  updatedAt: string;
}

export interface Journal {
  id: string;
  name: string;
  issn: string;
  publisher: string;
  country: string;
  language: string[];
  impactFactor: number;
  impactFactorYear: string;
  quartile: JournalImpactTier;
  hIndex: number;
  totalPublications: number;
  acceptanceRate: number;
  reviewTimeWeeks: number;
  indexing: JournalIndexing[];
  subjectAreas: string[];
  openAccess: boolean;
  website: string;
  editorialBoard: EditorialBoardMember[];
  impactMetrics: JournalImpactMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface Conference {
  id: string;
  name: string;
  acronym: string;
  conferenceType: ConferenceType;
  description: string;
  organizer: string;
  venue: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  notificationDate: string;
  registrationDeadline: string;
  website: string;
  proceedingsUrl: string;
  proceedingsPublisher: string;
  isbn: string;
  attendees: number;
  papersPresented: number;
  acceptanceRate: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Grant {
  id: string;
  title: string;
  code: string;
  description: string;
  fundingAgencyId: string;
  fundingAgency: FundingAgency;
  grantType: string;
  status: GrantStatus;
  totalBudget: number;
  currency: string;
  durationMonths: number;
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  principalInvestigator: Researcher;
  institution: string;
  eligibleCountries: string[];
  eligibleFields: ResearchField[];
  submissionRequirements: string[];
  evaluationCriteria: GrantEvaluationCriteria[];
  disbursementType: GrantDisbursementType;
  disbursementSchedule: GrantDisbursement[];
  budgetBreakdown: GrantBudgetItem[];
  reportingRequirements: GrantReportingRequirement[];
  intellectualPropertyTerms: string;
  publicationsRequired: number;
  createdAt: string;
  updatedAt: string;
}

export interface Patent {
  id: string;
  title: string;
  description: string;
  patentType: PatentClassification;
  status: PatentStatus;
  inventors: Researcher[];
  institutionId: string;
  institution: string;
  filingDate: string;
  grantDate: string;
  expiryDate: string;
  applicationNumber: string;
  patentNumber: string;
  internationalClassification: string[];
  claims: PatentClaim[];
  priorArt: PriorArt[];
  licenses: PatentLicense[];
  commercializationStatus: InnovationProtectionStatus;
  estimatedValue: number;
  currency: string;
  filingCountry: string;
  pctaApplication: boolean;
  pctaNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Researcher {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  affiliation: string;
  institutionId: string;
  department: string;
  field: ResearchField;
  careerLevel: ResearchCareerLevel;
  orcidId: string;
  scopusId: string;
  googleScholarId: string;
  researchGateId: string;
  website: string;
  expertise: string[];
  hIndex: number;
  i10Index: number;
  totalPublications: number;
  totalCitations: number;
  totalGrants: number;
  totalPatents: number;
  collaborations: ResearchCollaboration[];
  projects: ResearchProject[];
  publications: Publication[];
  patents: Patent[];
  mentorship: MentorshipRecord[];
  awards: ResearchAward[];
  createdAt: string;
  updatedAt: string;
}

export interface CollaborationNetwork {
  id: string;
  name: string;
  description: string;
  networkType: CollaborationNetworkType;
  coordinatorId: string;
  coordinator: ResearchCenter;
  members: ResearchCenter[];
  partnerCountries: string[];
  fields: ResearchField[];
  status: ResearchCollaborationStatus;
  establishedDate: string;
  fundingSource: string;
  totalBudget: number;
  jointProjects: ResearchProject[];
  jointPublications: Publication[];
  jointPatents: Patent[];
  activities: CollaborationActivity[];
  governance: NetworkGovernance;
  createdAt: string;
  updatedAt: string;
}

export interface InnovationLab {
  id: string;
  name: string;
  description: string;
  institutionId: string;
  institution: string;
  director: Researcher;
  status: InnovationLabStatus;
  stage: InnovationStage;
  fields: ResearchField[];
  technologies: string[];
  facilities: ResearchFacility[];
  team: Researcher[];
  projects: InnovationProject[];
  patents: Patent[];
  products: InnovationProduct[];
  partnerships: ResearchCollaboration[];
  funding: InnovationFunding[];
  incubatedStartups: Startup[];
  annualBudget: number;
  establishedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PeerReview {
  id: string;
  manuscriptId: string;
  manuscript: Publication;
  reviewerId: string;
  reviewer: PeerReviewer;
  reviewType: PeerReviewType;
  status: PeerReviewStatus;
  invitationDate: string;
  dueDate: string;
  submittedDate: string;
  decision: PeerReviewDecision;
  recommendation: string;
  comments: PeerReviewComment[];
  score: number;
  confidenceLevel: number;
  reviewerExpertise: PeerReviewerExpertise;
  conflictsDeclared: boolean;
  confidentialComments: string;
  createdAt: string;
  updatedAt: string;
}

export interface CitationAnalytics {
  id: string;
  researcherId: string;
  researcher: Researcher;
  totalCitations: number;
  citationsByYear: CitationYearStat[];
  citationsByPaper: PaperCitationStat[];
  hIndex: number;
  hIndexHistory: HIndexHistoryEntry[];
  i10Index: number;
  gIndex: number;
  mQuotient: number;
  topCitedPapers: Publication[];
  citationTrends: CitationTrend[];
  fieldWeightedCitationImpact: number;
  collaborationImpact: CollaborationImpactStat[];
  journalImpactStats: JournalImpactStat[];
  createdAt: string;
  updatedAt: string;
}

export interface FundingAgency {
  id: string;
  name: string;
  agencyType: FundingAgencyType;
  country: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  totalBudget: number;
  annualBudget: number;
  activeCalls: Grant[];
  fundedProjects: ResearchProject[];
  eligibilityCriteria: FundingEligibilityCriteria[];
  applicationProcess: string;
  evaluationProcess: string;
  successRate: number;
  averageGrantSize: number;
  fundingAreas: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResearchCollaboration {
  id: string;
  name: string;
  description: string;
  collaborationType: CollaborationType;
  status: ResearchCollaborationStatus;
  leadInstitution: ResearchCenter;
  partnerInstitutions: ResearchCenter[];
  principalInvestigators: Researcher[];
  agreementType: CollaborationAgreementType;
  agreementUrl: string;
  startDate: string;
  endDate: string;
  fields: ResearchField[];
  jointProjects: ResearchProject[];
  jointPublications: Publication[];
  jointPatents: Patent[];
  sharedResources: SharedResource[];
  funding: CollaborationFunding;
  outputs: CollaborationOutput[];
  level: ResearchCollaborationLevel;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchFacility {
  id: string;
  name: string;
  facilityType: ResearchFacilityType;
  description: string;
  centerId: string;
  center: ResearchCenter;
  location: string;
  equipment: EquipmentItem[];
  capabilities: string[];
  status: ResearchFacilityStatus;
  accessPolicy: string;
  costPerHour: number;
  currency: string;
  managerId: string;
  manager: Researcher;
  certifications: FacilityCertification[];
  utilizationRate: number;
  establishedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchOutput {
  id: string;
  projectId: string;
  project: ResearchProject;
  outputType: ResearchOutputType;
  title: string;
  description: string;
  authors: Researcher[];
  status: ResearchOutputStatus;
  date: string;
  url: string;
  doi: string;
  citationCount: number;
  impact: ResearchImpactType;
  disseminationChannels: string[];
  audience: string;
  accessLevel: DataSharingPolicy;
  createdAt: string;
  updatedAt: string;
}

export interface PeerReviewer {
  id: string;
  researcherId: string;
  researcher: Researcher;
  expertise: string[];
  reviewHistory: PeerReview[];
  averageReviewTime: number;
  completedReviews: number;
  reliabilityScore: number;
  availability: string;
  conflictsOfInterest: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JournalIndex {
  id: string;
  name: string;
  journalId: string;
  journal: Journal;
  indexingStatus: JournalIndexingStatus;
  indexedDate: string;
  impactFactor: number;
  quartile: JournalImpactTier;
  ranking: number;
}

export interface JournalImpactMetrics {
  impactFactor: number;
  fiveYearImpactFactor: number;
  citescore: number;
  snip: number;
  sjr: number;
  hIndex: number;
  eigenfactor: number;
  articleInfluence: number;
  year: string;
}

export interface EditorialBoardMember {
  id: string;
  researcherId: string;
  researcher: Researcher;
  role: JournalEditorialRole;
  startDate: string;
  endDate: string;
}

export interface Citation {
  id: string;
  citingPaperId: string;
  citingPaperTitle: string;
  citingPaperDoi: string;
  citingAuthors: string[];
  citationDate: string;
  context: string;
  citationType: string;
}

export interface SupplementaryMaterial {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  description: string;
}

export interface PatentClaim {
  claimNumber: number;
  description: string;
  dependentClaims: number[];
}

export interface PriorArt {
  id: string;
  title: string;
  patentNumber: string;
  publicationDate: string;
  relevance: string;
}

export interface PatentLicense {
  id: string;
  licenseeName: string;
  licenseType: PatentLicenseType;
  field: string;
  territory: string;
  startDate: string;
  endDate: string;
  royaltyRate: number;
  upfrontFee: number;
  status: string;
}

export interface GrantBudgetItem {
  category: GrantBudgetCategory;
  description: string;
  amount: number;
  justification: string;
  period: string;
}

export interface GrantDisbursement {
  installmentNumber: number;
  amount: number;
  dueDate: string;
  disbursedDate: string;
  disbursed: boolean;
  conditions: string[];
}

export interface GrantReportingRequirement {
  reportType: string;
  frequency: GrantReportingFrequency;
  dueDate: string;
  template: string;
  required: boolean;
}

export interface DataManagementPlan {
  dataTypes: string[];
  collectionMethods: string[];
  storageLocations: string[];
  accessPolicies: DataSharingPolicy[];
  retentionPeriod: number;
  backupProcedures: string[];
  ethicsConsiderations: string[];
  budget: number;
}

export interface ResearchEthicsApproval {
  id: string;
  ethicsCommittee: string;
  approvalNumber: string;
  status: ResearchEthicsStatus;
  submissionDate: string;
  approvalDate: string;
  expiryDate: string;
  conditions: string[];
  amendments: EthicsAmendment[];
  annualRenewalRequired: boolean;
}

export interface EthicsAmendment {
  id: string;
  amendmentNumber: number;
  description: string;
  submissionDate: string;
  approvalDate: string;
  status: string;
}

export interface ResearchMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completedDate: string;
  status: string;
  deliverables: string[];
  verifiedBy: string;
}

export interface ResearchReport {
  id: string;
  projectId: string;
  reportType: string;
  period: string;
  submissionDate: string;
  content: string;
  financialSummary: FinancialSummary;
  progressSummary: string;
  nextSteps: string[];
  challenges: string[];
  status: string;
  reviewerComments: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalBudget: number;
  spentToDate: number;
  remainingBudget: number;
  currency: string;
  breakdown: FinancialBreakdown[];
}

export interface FinancialBreakdown {
  category: string;
  budgeted: number;
  spent: number;
  variance: number;
}

export interface ResearchAward {
  id: string;
  name: string;
  awardingBody: string;
  year: number;
  description: string;
  category: string;
  international: boolean;
}

export interface MentorshipRecord {
  id: string;
  mentorId: string;
  menteeId: string;
  startDate: string;
  endDate: string;
  field: string;
  status: string;
  outcomes: string[];
}

export interface SharedResource {
  id: string;
  resourceType: string;
  description: string;
  provider: ResearchCenter;
  accessTerms: string;
  cost: number;
  currency: string;
}

export interface CollaborationFunding {
  totalBudget: number;
  contributions: FundingContribution[];
  currency: string;
  managedBy: string;
}

export interface FundingContribution {
  institutionId: string;
  institution: string;
  amount: number;
  percentage: number;
  type: string;
}

export interface CollaborationOutput {
  id: string;
  outputType: CollaborationOutputType;
  title: string;
  description: string;
  authors: Researcher[];
  date: string;
  url: string;
}

export interface CollaborationActivity {
  id: string;
  activityType: string;
  name: string;
  description: string;
  date: string;
  participants: number;
  outcome: string;
}

export interface NetworkGovernance {
  steeringCommittee: Researcher[];
  meetingFrequency: string;
  decisionProcess: string;
  disputeResolution: string;
}

export interface CenterRanking {
  globalRank: number;
  regionalRank: number;
  fieldRank: number;
  rankingBody: string;
  year: string;
}

export interface CenterMetrics {
  totalPublications: number;
  totalCitations: number;
  hIndex: number;
  totalGrants: number;
  totalPatents: number;
  staffCount: number;
  averageImpactFactor: number;
  collaborationCount: number;
  internationalCollaborations: number;
  year: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  acquisitionDate: string;
  cost: number;
  currency: string;
  status: string;
  location: string;
  capabilities: string[];
  maintenanceSchedule: string;
}

export interface FacilityCertification {
  name: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}

export interface InnovationProject {
  id: string;
  name: string;
  description: string;
  stage: InnovationStage;
  technology: string;
  team: Researcher[];
  budget: number;
  currency: string;
  startDate: string;
  targetDate: string;
  status: string;
  intellectualProperty: InnovationIP;
  marketAnalysis: MarketAnalysis;
  createdAt: string;
  updatedAt: string;
}

export interface InnovationProduct {
  id: string;
  name: string;
  description: string;
  stage: InnovationStage;
  technologyReadiness: number;
  marketReadiness: number;
  team: Researcher[];
  intellectualProperty: InnovationIP;
  targetMarket: string;
  competitiveAdvantage: string;
  createdAt: string;
  updatedAt: string;
}

export interface InnovationIP {
  protectionStatus: InnovationProtectionStatus;
  patentPending: boolean;
  patentNumbers: string[];
  copyrightRegistered: boolean;
  tradeSecrets: string[];
  licenses: PatentLicense[];
}

export interface InnovationFunding {
  id: string;
  fundingType: InnovationFundingType;
  source: string;
  amount: number;
  currency: string;
  date: string;
  conditions: string[];
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  stage: InnovationStage;
  founders: Researcher[];
  institution: string;
  lab: InnovationLab;
  technology: string;
  fundingReceived: number;
  currency: string;
  employees: number;
  website: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketAnalysis {
  marketSize: number;
  targetSegment: string;
  competitors: string[];
  competitiveAdvantage: string;
  pricingStrategy: string;
  distributionChannels: string[];
}

export interface FundingEligibilityCriteria {
  criterion: string;
  description: string;
  required: boolean;
  value: string;
}

export interface SharedResourceItem {
  id: string;
  resourceType: string;
  description: string;
  provider: string;
  accessTerms: string;
  cost: number;
  currency: string;
}

export interface PeerReviewComment {
  section: string;
  comment: string;
  recommendation: string;
  severity: string;
}

export interface PeerReviewDecision {
  decision: string;
  rationale: string;
  revisionRequired: boolean;
  majorRevision: boolean;
}

export interface CitationYearStat {
  year: number;
  citations: number;
}

export interface PaperCitationStat {
  paperId: string;
  paperTitle: string;
  citations: number;
  yearPublished: number;
}

export interface HIndexHistoryEntry {
  year: number;
  hIndex: number;
}

export interface CitationTrend {
  period: string;
  citations: number;
  growthRate: number;
}

export interface CollaborationImpactStat {
  collaboratorId: string;
  collaboratorName: string;
  jointPapers: number;
  jointCitations: number;
}

export interface JournalImpactStat {
  journalId: string;
  journalName: string;
  papersPublished: number;
  averageImpactFactor: number;
  totalCitations: number;
}

export interface FundingSource {
  id: string;
  name: string;
  type: FundingAgencyType;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
}

export interface ResearchImpact {
  type: ResearchImpactType;
  description: string;
  metric: string;
  value: number;
  evidence: string[];
}

export interface StartupStage {
  currentStage: InnovationStage;
  transitionDate: string;
  milestones: string[];
  funding: number;
}

export interface InnovationIncubation {
  id: string;
  startupId: string;
  startup: Startup;
  labId: string;
  lab: InnovationLab;
  startDate: string;
  endDate: string;
  mentoringHours: number;
  resourcesProvided: string[];
  outcome: string;
}

export enum ResearchDataAccessLevel {
  OPEN = "OPEN",
  REGISTERED = "REGISTERED",
  RESTRICTED = "RESTRICTED",
  EMBARGOED = "EMBARGOED",
  CONFIDENTIAL = "CONFIDENTIAL",
}

export enum ResearchCollaborationMaturity {
  EMERGING = "EMERGING",
  DEVELOPING = "DEVELOPING",
  ESTABLISHED = "ESTABLISHED",
  MATURE = "MATURE",
  TRANSFORMATIVE = "TRANSFORMATIVE",
}

export enum PublicationImpactLevel {
  VERY_HIGH = "VERY_HIGH",
  HIGH = "HIGH",
  MODERATE = "MODERATE",
  LOW = "LOW",
  MINIMAL = "MINIMAL",
}

export enum ResearchOutputLicense {
  CC_BY = "CC_BY",
  CC_BY_SA = "CC_BY_SA",
  CC_BY_NC = "CC_BY_NC",
  CC_BY_NC_SA = "CC_BY_NC_SA",
  CC_BY_ND = "CC_BY_ND",
  CC0 = "CC0",
  PROPRIETARY = "PROPRIETARY",
  OPEN_SOURCE = "OPEN_SOURCE",
}

export enum ResearchMethodologyType {
  QUANTITATIVE = "QUANTITATIVE",
  QUALITATIVE = "QUALITATIVE",
  MIXED_METHODS = "MIXED_METHODS",
  EXPERIMENTAL = "EXPERIMENTAL",
  OBSERVATIONAL = "OBSERVATIONAL",
  META_ANALYSIS = "META_ANALYSIS",
  CASE_STUDY = "CASE_STUDY",
  LONGITUDINAL = "LONGITUDINAL",
}

export enum ResearchDataFormatType {
  STRUCTURED = "STRUCTURED",
  SEMI_STRUCTURED = "SEMI_STRUCTURED",
  UNSTRUCTURED = "UNSTRUCTURED",
  TIME_SERIES = "TIME_SERIES",
  SPATIAL = "SPATIAL",
  MULTIMEDIA = "MULTIMEDIA",
}

export enum InnovationTransferStatus {
  IDENTIFIED = "IDENTIFIED",
  ASSESSED = "ASSESSED",
  NEGOTIATING = "NEGOTIATING",
  LICENSED = "LICENSED",
  COMMERCIALIZED = "COMMERCIALIZED",
  FAILED = "FAILED",
}

export enum ResearchGrantMilestoneStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  DELAYED = "DELAYED",
  COMPLETED = "COMPLETED",
  WAIVED = "WAIVED",
}

export enum JournalSubmissionStatus {
  NOT_SUBMITTED = "NOT_SUBMITTED",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REVISION_REQUIRED = "REVISION_REQUIRED",
  RESUBMITTED = "RESUBMITTED",
  ACCEPTED = "ACCEPTED",
  PUBLISHED = "PUBLISHED",
  WITHDRAWN = "WITHDRAWN",
  REJECTED = "REJECTED",
}

export enum ResearchInstitutionalReviewStatus {
  NOT_REQUIRED = "NOT_REQUIRED",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  MODIFICATIONS_REQUIRED = "MODIFICATIONS_REQUIRED",
  EXPIRED = "EXPIRED",
}

export interface ResearchDataRepository {
  id: string;
  name: string;
  repositoryType: ResearchDataRepositoryType;
  description: string;
  url: string;
  provider: string;
  accessLevel: ResearchDataAccessLevel;
  supportedFormats: ResearchDataFormatType[];
  totalDatasets: number;
  totalDownloads: number;
  citationCount: number;
  doi: string;
  versioning: boolean;
  retentionPolicy: string;
  metadataStandard: string;
  lastUpdated: string;
  createdAt: string;
}

export interface ResearchDataset {
  id: string;
  title: string;
  description: string;
  repositoryId: string;
  repository: ResearchDataRepository;
  authors: Researcher[];
  license: ResearchOutputLicense;
  accessLevel: ResearchDataAccessLevel;
  formats: ResearchDataFormatType[];
  sizeBytes: number;
  version: string;
  doi: string;
  citationCount: number;
  downloadCount: number;
  lastUpdated: string;
  keywords: string[];
  methodology: ResearchMethodologyType;
  createdAt: string;
}

export interface ResearchDataManagementPlan {
  id: string;
  projectId: string;
  project: ResearchProject;
  dataTypes: ResearchDataFormatType[];
  collectionMethods: string[];
  storageRepositories: ResearchDataRepository[];
  accessPolicies: ResearchDataAccessLevel[];
  sharingPolicies: string[];
  retentionPeriod: number;
  backupFrequency: string;
  privacyConsiderations: string[];
  ethicalRequirements: string[];
  costEstimate: number;
  currency: string;
  responsiblePerson: Researcher;
  lastUpdated: string;
  createdAt: string;
}

export interface InnovationTechnologyTransfer {
  id: string;
  title: string;
  description: string;
  inventionId: string;
  patent: Patent;
  transferStatus: InnovationTransferStatus;
  technologyType: string;
 TRL: number;
  mRL: number;
  marketSize: number;
  potentialLicensees: string[];
  licensingTerms: string;
  exclusivity: string;
  territory: string;
  valuationMethod: string;
  estimatedValue: number;
  currency: string;
  transferDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchGrantMilestoneTracking {
  id: string;
  grantId: string;
  grant: Grant;
  milestoneId: string;
  milestoneName: string;
  description: string;
  dueDate: string;
  completionDate: string;
  status: ResearchGrantMilestoneStatus;
  deliverables: GrantDeliverable[];
  evidence: string[];
  verifiedBy: string;
  verificationDate: string;
  notes: string;
}

export interface GrantDeliverable {
  id: string;
  name: string;
  description: string;
  type: string;
  submittedDate: string;
  fileUrl: string;
  status: string;
  feedback: string;
}

export interface JournalImpactFactorTrend {
  journalId: string;
  journal: Journal;
  years: JournalImpactYear[];
  averageIF: number;
  highestIF: number;
  lowestIF: number;
  volatilityIndex: number;
}

export interface JournalImpactYear {
  year: string;
  impactFactor: number;
  citescore: number;
  quartile: JournalImpactTier;
  hIndex: number;
}

export interface ResearchInstitutionalReviewBoard {
  id: string;
  name: string;
  institutionId: string;
  institution: string;
  chair: Researcher;
  members: Researcher[];
  status: ResearchInstitutionalReviewStatus;
  meetingFrequency: string;
  nextMeetingDate: string;
  totalReviewsCompleted: number;
  averageReviewTimeDays: number;
  approvalRate: number;
  composition: IRBMember[];
  createdAt: string;
  updatedAt: string;
}

export interface IRBMember {
  id: string;
  researcherId: string;
  researcher: Researcher;
  role: string;
  expertise: string[];
  termStart: string;
  termEnd: string;
}

export interface ResearchComplianceRecord {
  id: string;
  projectId: string;
  project: ResearchProject;
  complianceType: ResearchComplianceType;
  status: string;
  submissionDate: string;
  approvalDate: string;
  expiryDate: string;
  reviewBoard: string;
  certificateNumber: string;
  conditions: string[];
  amendments: ComplianceAmendment[];
  annualRenewal: boolean;
  lastRenewalDate: string;
  nextRenewalDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceAmendment {
  id: string;
  amendmentNumber: number;
  description: string;
  submissionDate: string;
  approvalDate: string;
  status: string;
  impact: string;
}

export interface ResearchCollaborationOutputTracking {
  id: string;
  collaborationId: string;
  collaboration: ResearchCollaboration;
  outputType: CollaborationOutputType;
  outputs: CollaborationOutputRecord[];
  totalOutputs: number;
  year: string;
  summary: string;
}

export interface CollaborationOutputRecord {
  id: string;
  title: string;
  authors: Researcher[];
  date: string;
  venue: string;
  doi: string;
  citations: number;
  impact: string;
}

export interface ResearchPublicationMetrics {
  id: string;
  institutionId: string;
  institution: string;
  year: string;
  totalPublications: number;
  publicationsByType: PublicationTypeStat[];
  publicationsByField: FieldPublicationStat[];
  publicationsByJournalQuartile: QuartileStat[];
  openAccessPercent: number;
  internationalCollaborationPercent: number;
  averageCitations: number;
  topCitedPapers: Publication[];
  hIndex: number;
  i10Index: number;
  gIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicationTypeStat {
  type: PublicationType;
  count: number;
  percentage: number;
  averageCitations: number;
}

export interface FieldPublicationStat {
  field: ResearchField;
  count: number;
  percentage: number;
  averageImpactFactor: number;
}

export interface QuartileStat {
  quartile: JournalImpactTier;
  count: number;
  percentage: number;
}

export interface ResearchGrantPortfolio {
  id: string;
  institutionId: string;
  institution: string;
  year: string;
  totalGrants: number;
  totalFunding: number;
  currency: string;
  grantsByStatus: GrantStatusStat[];
  grantsByAgency: AgencyStat[];
  grantsByField: FieldGrantStat[];
  averageGrantSize: number;
  successRate: number;
  fundingTrend: FundingTrendEntry[];
  topFundedProjects: ResearchProject[];
  createdAt: string;
  updatedAt: string;
}

export interface GrantStatusStat {
  status: GrantStatus;
  count: number;
  totalFunding: number;
}

export interface AgencyStat {
  agencyId: string;
  agencyName: string;
  grantCount: number;
  totalFunding: number;
}

export interface FieldGrantStat {
  field: ResearchField;
  grantCount: number;
  totalFunding: number;
}

export interface FundingTrendEntry {
  year: string;
  totalFunding: number;
  grantCount: number;
  averageGrantSize: number;
}

export interface ResearchPatentAnalytics {
  id: string;
  institutionId: string;
  institution: string;
  year: string;
  totalPatents: number;
  patentsByStatus: PatentStatusStat[];
  patentsByType: PatentTypeStat[];
  patentsByField: FieldPatentStat[];
  totalLicenses: number;
  totalLicenseRevenue: number;
  averageTimeToGrant: number;
  commercializationRate: number;
  topPatents: Patent[];
  createdAt: string;
  updatedAt: string;
}

export interface PatentStatusStat {
  status: PatentStatus;
  count: number;
  percentage: number;
}

export interface PatentTypeStat {
  type: PatentClassification;
  count: number;
  percentage: number;
}

export interface FieldPatentStat {
  field: ResearchField;
  count: number;
  revenue: number;
}

export interface InnovationEcosystemMap {
  id: string;
  name: string;
  description: string;
  geography: string;
  components: EcosystemComponent[];
  connections: EcosystemConnection[];
  maturity: string;
  strengths: string[];
  gaps: string[];
  opportunities: string[];
  lastUpdated: string;
  createdAt: string;
}

export interface EcosystemComponent {
  id: string;
  type: InnovationEcosystemComponent;
  name: string;
  description: string;
  institutionId: string;
  institution: string;
  capacity: number;
  activities: string[];
  connections: string[];
}

export interface EcosystemConnection {
  sourceId: string;
  targetId: string;
  connectionType: string;
  strength: number;
  description: string;
}

export interface ResearchCollaborationNetworkMap {
  id: string;
  name: string;
  description: string;
  networkType: CollaborationNetworkType;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  metrics: NetworkMetrics;
  clusters: NetworkCluster[];
  insights: NetworkInsight[];
  lastUpdated: string;
  createdAt: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: string;
  country: string;
  region: string;
  size: number;
  connections: number;
  publications: number;
  grants: number;
}

export interface NetworkEdge {
  sourceId: string;
  targetId: string;
  weight: number;
  type: string;
  jointOutputs: number;
}

export interface NetworkMetrics {
  totalNodes: number;
  totalEdges: number;
  density: number;
  clustering: number;
  centrality: CentralityMeasure[];
  modularity: number;
}

export interface CentralityMeasure {
  nodeId: string;
  nodeName: string;
  degree: number;
  betweenness: number;
  closeness: number;
  eigenvector: number;
}

export interface NetworkCluster {
  id: string;
  name: string;
  members: string[];
  field: string;
  cohesion: number;
}

export interface NetworkInsight {
  insightType: string;
  description: string;
  evidence: string;
  recommendation: string;
}

export interface ResearchOpenScienceMetrics {
  id: string;
  institutionId: string;
  institution: string;
  year: string;
  openAccessPublications: number;
  openAccessRate: number;
  openDataSets: number;
  openDataRate: number;
  preregisteredStudies: number;
  openPeerReview: number;
  openSourceSoftware: number;
  totalOutputs: number;
  complianceScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchImpactAssessment {
  id: string;
  projectId: string;
  project: ResearchProject;
  assessmentDate: string;
  academicImpact: ImpactDimension;
  economicImpact: ImpactDimension;
  socialImpact: ImpactDimension;
  environmentalImpact: ImpactDimension;
  policyImpact: ImpactDimension;
  healthImpact: ImpactDimension;
  culturalImpact: ImpactDimension;
  overallImpactScore: number;
  impactNarrative: string;
  evidenceUrls: string[];
  assessedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImpactDimension {
  score: number;
  description: string;
  evidence: string[];
  beneficiaries: number;
  reach: string;
  depth: string;
  significance: string;
}

export interface ResearchCollaborationHealth {
  id: string;
  collaborationId: string;
  collaboration: ResearchCollaboration;
  assessmentDate: string;
  communicationScore: number;
  productivityScore: number;
  satisfactionScore: number;
  governanceScore: number;
  resourceScore: number;
  overallHealth: number;
  issues: string[];
  recommendations: string[];
  nextReviewDate: string;
  assessedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchEthicsTrainingRecord {
  id: string;
  researcherId: string;
  researcher: Researcher;
  trainingName: string;
  provider: string;
  completionDate: string;
  expiryDate: string;
  certificateUrl: string;
  hoursCompleted: number;
  score: number;
  passed: boolean;
  modules: EthicsTrainingModule[];
}

export interface EthicsTrainingModule {
  moduleId: string;
  moduleName: string;
  duration: number;
  completed: boolean;
  score: number;
}

export interface ResearchConferenceParticipation {
  id: string;
  researcherId: string;
  researcher: Researcher;
  conferenceId: string;
  conference: Conference;
  participationType: ConferencePresentationType;
  presentationTitle: string;
  presentationDate: string;
  abstractId: string;
  session: string;
  coPresenters: string[];
  audience: number;
  questionsAsked: number;
  feedback: string;
  certificateUrl: string;
}

export interface ResearchGrantBudgetTracking {
  id: string;
  grantId: string;
  grant: Grant;
  trackingPeriod: string;
  totalBudget: number;
  spentToDate: number;
  committedAmount: number;
  availableBalance: number;
  currency: string;
  burnRate: number;
  projectedTotal: number;
  overBudget: boolean;
  variance: number;
  lineItems: BudgetLineItem[];
  lastUpdated: string;
}

export interface BudgetLineItem {
  category: GrantBudgetCategory;
  budgeted: number;
  spent: number;
  committed: number;
  available: number;
  variance: number;
  notes: string;
}

export interface ResearchMentorshipProgram {
  id: string;
  programName: string;
  description: string;
  coordinatorId: string;
  coordinator: Researcher;
  mentors: MentorPair[];
  totalMentees: number;
  averageMeetingFrequency: string;
  programDuration: number;
  startDate: string;
  endDate: string;
  status: string;
  satisfactionScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface MentorPair {
  mentorId: string;
  mentor: Researcher;
  menteeId: string;
  mentee: Researcher;
  startDate: string;
  endDate: string;
  meetingCount: number;
  topics: string[];
  satisfactionScore: number;
}

export interface ResearchFundingCall {
  id: string;
  title: string;
  description: string;
  agencyId: string;
  agency: FundingAgency;
  openDate: string;
  closeDate: string;
  totalBudget: number;
  currency: string;
  maxGrantSize: number;
  durationMonths: number;
  eligibleFields: ResearchField[];
  eligibleCountries: string[];
  applicationCount: number;
  fundedCount: number;
  successRate: number;
  status: string;
  requirements: string[];
  evaluationCriteria: GrantEvaluationCriteria[];
  createdAt: string;
  updatedAt: string;
}

export interface ResearchLab {
  id: string;
  name: string;
  description: string;
  centerId: string;
  center: ResearchCenter;
  directorId: string;
  director: Researcher;
  field: ResearchField;
  status: string;
  establishedDate: string;
  capacity: number;
  currentStaff: number;
  equipment: EquipmentItem[];
  projects: ResearchProject[];
  publications: Publication[];
  annualBudget: number;
  funding: FundingSource[];
  collaborations: ResearchCollaboration[];
  facilities: string[];
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResearchSeminar {
  id: string;
  title: string;
  description: string;
  seminarDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  isVirtual: boolean;
  virtualLink: string;
  speakerId: string;
  speaker: Researcher;
  topic: string;
  field: ResearchField;
  attendees: number;
  maxAttendees: number;
  registrationRequired: boolean;
  recordingUrl: string;
  materialsUrl: string;
  feedback: SeminarFeedback[];
}

export interface SeminarFeedback {
  id: string;
  attendeeId: string;
  rating: number;
  relevance: number;
  clarity: number;
  overall: number;
  comments: string;
}

export interface ResearchPublicationAuthor {
  authorId: string;
  author: Researcher;
  affiliation: string;
  contributionType: string;
  authorOrder: number;
  isCorresponding: boolean;
  orcidId: string;
}

export interface ResearchFundingAgencyProfile {
  id: string;
  agency: FundingAgency;
  totalFundingDistributed: number;
  activeCalls: number;
  fundedProjectsCount: number;
  averageGrantSize: number;
  successRate: number;
  topFundedFields: FieldStat[];
  geographicalDistribution: GeographicDistributionStat[];
  reportingRequirements: string[];
  applicationProcess: string[];
  evaluationTimeline: string;
}

export interface FieldStat {
  field: ResearchField;
  count: number;
  totalFunding: number;
}

export interface GeographicDistributionStat {
  region: string;
  count: number;
  percentage: number;
}

export interface ResearchJournalMetrics {
  id: string;
  journalId: string;
  journal: Journal;
  year: string;
  totalSubmissions: number;
  totalAccepted: number;
  acceptanceRate: number;
  rejectionRate: number;
  deskRejectRate: number;
  averageReviewTimeDays: number;
  averageTimeToDecision: number;
  citationsReceived: number;
  impactFactor: number;
  immediacyIndex: number;
  citedHalfLife: number;
  topAuthors: AuthorStat[];
  topCountries: CountryAuthorStat[];
}

export interface AuthorStat {
  authorId: string;
  authorName: string;
  papersPublished: number;
  totalCitations: number;
}

export interface CountryAuthorStat {
  country: string;
  papersPublished: number;
  percentage: number;
}

export interface ResearchTechnologyReadiness {
  id: string;
  technologyId: string;
  technologyName: string;
  currentTRL: number;
  targetTRL: number;
  assessmentDate: string;
  assessedBy: string;
  milestones: TRLMilestone[];
  risks: string[];
  resources: string[];
  timeline: string;
}

export interface TRLMilestone {
  level: number;
  description: string;
  achievedDate: string;
  evidence: string;
  status: string;
}

export interface ResearchPatentFiling {
  id: string;
  patentId: string;
  patent: Patent;
  filingAttorney: string;
  filingFirm: string;
  filingFee: number;
  currency: string;
  filingDate: string;
  applicationNumber: string;
  jurisdiction: string;
  priorityDate: string;
  pctaFiling: boolean;
  pctaFilingDate: string;
  nationalPhaseEntryDate: string;
  status: string;
  nextDeadline: string;
  notes: string;
}

export interface ResearchProjectTimeline {
  id: string;
  projectId: string;
  project: ResearchProject;
  phases: TimelinePhase[];
  totalDuration: number;
  completedPercent: number;
  onSchedule: boolean;
  riskLevel: string;
  criticalPath: string[];
}

export interface TimelinePhase {
  phase: ResearchPhase;
  startDate: string;
  endDate: string;
  duration: number;
  completed: boolean;
  completionPercent: number;
  milestones: string[];
}

export interface ResearchCollaborationMOU {
  id: string;
  collaborationId: string;
  collaboration: ResearchCollaboration;
  mouType: CollaborationAgreementType;
  signDate: string;
  expiryDate: string;
  renewalTerms: string;
  scope: string;
  financialTerms: string;
  intellectualPropertyTerms: string;
  disputeResolution: string;
  terminationClause: string;
  documentUrl: string;
  status: string;
}

export interface ResearchDataCitation {
  id: string;
  datasetId: string;
  dataset: ResearchDataset;
  citingPublicationId: string;
  citingPublication: Publication;
  citationDate: string;
  citationContext: string;
  citationType: string;
}

export interface ResearchOpenAccessCompliance {
  id: string;
  publicationId: string;
  publication: Publication;
  complianceStatus: string;
  repositoryDeposited: string;
  depositDate: string;
  embargoExpiry: string;
  licenseApplied: ResearchOutputLicense;
  apcPaid: boolean;
  apcAmount: number;
  funderPolicy: string;
  notes: string;
}

export interface ResearchGrantOutputTracking {
  id: string;
  grantId: string;
  grant: Grant;
  reportingPeriod: string;
  publicationsOutput: number;
  patentsOutput: number;
  datasetsOutput: number;
  presentationsOutput: number;
  phdStudents: number;
  postdocs: number;
  workshopsOrganized: number;
  policyBriefs: number;
  mediaMentions: number;
  summary: string;
  createdAt: string;
}

export interface ResearchBenchmarkingReport {
  id: string;
  institutionId: string;
  institution: string;
  benchmarkYear: string;
  peerGroup: string;
  metrics: BenchmarkingMetric[];
  overallScore: number;
  overallRank: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  generatedAt: string;
}

export interface BenchmarkingMetric {
  metricName: string;
  value: number;
  peerAverage: number;
  peerBest: number;
  rank: number;
  percentile: number;
  trend: string;
}

export interface ResearchDataManagementCompliance {
  id: string;
  projectId: string;
  project: ResearchProject;
  complianceStatus: string;
  dmpApproved: boolean;
  dmpApprovalDate: string;
  repositoryAssigned: string;
  dataShared: boolean;
  dataSharedDate: string;
  accessLevel: ResearchDataAccessLevel;
  retentionCompliant: boolean;
  lastAuditDate: string;
  nextAuditDate: string;
  issues: string[];
}

export interface ResearchInnovationAward {
  id: string;
  awardName: string;
  awardingBody: string;
  year: number;
  category: string;
  description: string;
  recipientId: string;
  recipient: Researcher;
  institutionId: string;
  institution: string;
  innovation: string;
  impact: string;
  prizeAmount: number;
  currency: string;
  international: boolean;
}

export interface ResearchCollaborationAnnualReport {
  id: string;
  collaborationId: string;
  collaboration: ResearchCollaboration;
  reportYear: string;
  totalOutputs: number;
  jointPublications: number;
  jointPatents: number;
  jointGrants: number;
  exchangeVisits: number;
  workshopsHeld: number;
  studentsSupervised: number;
  financialSummary: CollaborationFinancialSummary;
  achievements: string[];
  challenges: string[];
  futurePlans: string[];
  submittedBy: string;
  submittedAt: string;
}

export interface CollaborationFinancialSummary {
  totalBudget: number;
  totalSpent: number;
  partnerContributions: FundingContribution[];
  currency: string;
}

export interface ResearchEarlyCareerResearcher {
  id: string;
  researcherId: string;
  researcher: Researcher;
  careerStage: ResearchCareerLevel;
  yearsSincePhd: number;
  publicationsCount: number;
  citationsCount: number;
  hIndex: number;
  grantsReceived: number;
  mentoringReceived: number;
  mentoringProvided: number;
  awards: string[];
  careerGoals: string;
  supportNeeds: string[];
  mentorId: string;
  mentor: Researcher;
}

export interface ResearchGrantComplianceCheck {
  id: string;
  grantId: string;
  grant: Grant;
  checkDate: string;
  checkType: string;
  status: string;
  findings: string[];
  recommendations: string[];
  correctiveActions: string[];
  deadline: string;
  verifiedBy: string;
  nextCheckDate: string;
}

export interface ResearchSeminarSeries {
  id: string;
  seriesName: string;
  description: string;
  organizer: string;
  institutionId: string;
  institution: string;
  frequency: string;
  startDate: string;
  endDate: string;
  seminars: ResearchSeminar[];
  totalSeminars: number;
  totalAttendees: number;
  averageRating: number;
  speakers: Researcher[];
  topics: string[];
  status: string;
}

export interface ResearchCollaborationEvent {
  id: string;
  collaborationId: string;
  collaboration: ResearchCollaboration;
  eventType: string;
  name: string;
  description: string;
  eventDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  organizers: string[];
  participants: string[];
  agenda: string[];
  outcomes: string[];
  feedback: string;
  materialsUrl: string;
}
