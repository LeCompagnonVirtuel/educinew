export enum ExchangeStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  SUSPENDED = "SUSPENDED",
  WAITLISTED = "WAITLISTED",
}

export enum MobilityType {
  SEMESTER_EXCHANGE = "SEMESTER_EXCHANGE",
  FULL_YEAR = "FULL_YEAR",
  SUMMER_PROGRAM = "SUMMER_PROGRAM",
  SHORT_TERM = "SHORT_TERM",
  RESEARCH_MOBILITY = "RESEARCH_MOBILITY",
  INTERNSHIP_MOBILITY = "INTERNSHIP_MOBILITY",
  DUAL_DEGREE = "DUAL_DEGREE",
  JOINT_DEGREE = "JOINT_DEGREE",
}

export enum VisaType {
  STUDENT_VISA = "STUDENT_VISA",
  EXCHANGE_VISA = "EXCHANGE_VISA",
  RESEARCH_VISA = "RESEARCH_VISA",
  INTERNSHIP_VISA = "INTERNSHIP_VISA",
  TRANSIT_VISA = "TRANSIT_VISA",
  TOURIST_VISA = "TOURIST_VISA",
  MULTIPLE_ENTRY = "MULTIPLE_ENTRY",
  LONG_STAY = "LONG_STAY",
}

export enum VisaStatus {
  NOT_STARTED = "NOT_STARTED",
  DOCUMENTS_PENDING = "DOCUMENTS_PENDING",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  EXPIRED = "EXPIRED",
  RENEWAL_REQUIRED = "RENEWAL_REQUIRED",
}

export enum AccommodationType {
  UNIVERSITY_DORMITORY = "UNIVERSITY_DORMITORY",
  PRIVATE_DORMITORY = "PRIVATE_DORMITORY",
  HOMESTAY = "HOMESTAY",
  APARTMENT = "APARTMENT",
  SHARED_HOUSING = "SHARED_HOUSING",
  HOSTEL = "HOSTEL",
  STUDIO = "STUDIO",
  FAMILY_HOUSING = "FAMILY_HOUSING",
}

export enum ScholarshipStatus {
  ELIGIBLE = "ELIGIBLE",
  APPLIED = "APPLIED",
  UNDER_REVIEW = "UNDER_REVIEW",
  AWARDED = "AWARDED",
  DECLINED = "DECLINED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
  COMPLETED = "COMPLETED",
}

export enum ScholarshipType {
  MERIT_BASED = "MERIT_BASED",
  NEED_BASED = "NEED_BASED",
  GOVERNMENT = "GOVERNMENT",
  INSTITUTIONAL = "INSTITUTIONAL",
  PRIVATE_FUND = "PRIVATE_FUND",
  SPORTS = "SPORTS",
  CULTURAL = "CULTURAL",
  RESEARCH = "RESEARCH",
}

export enum CreditTransferStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  PARTIALLY_APPROVED = "PARTIALLY_APPROVED",
  REJECTED = "REJECTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  COMPLETED = "COMPLETED",
}

export enum TranscriptFormat {
  ECTS = "ECTS",
  US_CREDITS = "US_CREDITS",
  NATIONAL_SYSTEM = "NATIONAL_SYSTEM",
  CUSTOM = "CUSTOM",
  EQUISVALENT = "EQUISVALENT",
}

export enum MobilityDirection {
  OUTBOUND = "OUTBOUND",
  INBOUND = "INBOUND",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum HostInstitutionType {
  UNIVERSITY = "UNIVERSITY",
  COLLEGE = "COLLEGE",
  POLYTECHNIC = "POLYTECHNIC",
  RESEARCH_INSTITUTE = "RESEARCH_INSTITUTE",
  CORPORATE = "CORPORATE",
  NGO = "NGO",
  GOVERNMENT = "GOVERNMENT",
}

export enum LanguageProficiency {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  NATIVE = "NATIVE",
}

export enum CulturalOrientationStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  WAIVED = "WAIVED",
  FAILED = "FAILED",
}

export enum PreDepartureStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  WAIVED = "WAIVED",
}

export enum MobilityAgreementStatus {
  DRAFT = "DRAFT",
  PENDING_SIGNATURE = "PENDING_SIGNATURE",
  SIGNED = "SIGNED",
  AMENDED = "AMENDED",
  TERMINATED = "TERMINATED",
}

export enum InsuranceCoverageType {
  HEALTH = "HEALTH",
  TRAVEL = "TRAVEL",
  LIABILITY = "LIABILITY",
  ACCIDENT = "ACCIDENT",
  MEDICAL_EVACUATION = "MEDICAL_EVACUATION",
  COMPREHENSIVE = "COMPREHENSIVE",
}

export enum MobilityProgramStatus {
  PLANNING = "PLANNING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  FULL = "FULL",
  SUSPENDED = "SUSPENDED",
  COMPLETED = "COMPLETED",
}

export enum AcademicCalendarType {
  SEMESTER = "SEMESTER",
  TRIMESTER = "TRIMESTER",
  QUARTER = "QUARTER",
  TERM = "TERM",
  YEARROUND = "YEARROUND",
}

export enum PartnershipStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  PENDING_RENEWAL = "PENDING_RENEWAL",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
}

export enum PartnershipLevel {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  CONSORTIUM = "CONSORTIUM",
  NETWORK = "NETWORK",
  INTERGOVERNMENTAL = "INTERGOVERNMENTAL",
}

export enum CreditEquivalenceStatus {
  PENDING = "PENDING",
  EVALUATED = "EVALUATED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum LanguageTestType {
  IELTS = "IELTS",
  TOEFL = "TOEFL",
  DELF = "DELF",
  DALF = "DALF",
  DELE = "DELE",
  CELPE = "CELPE",
  HSK = "HSK",
  JLPT = "JLPT",
  TOPIK = "TOPIK",
}

export enum MobilityDocumentType {
  ACCEPTANCE_LETTER = "ACCEPTANCE_LETTER",
  TRANSCRIPT = "TRANSCRIPT",
  INSURANCE_CERT = "INSURANCE_CERT",
  VISA_COPY = "VISA_COPY",
  PASSPORT_COPY = "PASSPORT_COPY",
  FLIGHT_ITEINERARY = "FLIGHT_ITEINERARY",
  ACCOMMODATION_PROOF = "ACCOMMODATION_PROOF",
  EMERGENCY_CONTACT = "EMERGENCY_CONTACT",
}

export enum EmergencyProtocol {
  STANDARD = "STANDARD",
  MEDICAL_EMERGENCY = "MEDICAL_EMERGENCY",
  NATURAL_DISASTER = "NATURAL_DISASTER",
  POLITICAL_UNREST = "POLITICAL_UNREST",
  PANDEMIC = "PANDEMIC",
  EVACUATION = "EVACUATION",
}

export enum MobilityEvaluationType {
  ACADEMIC = "ACADEMIC",
  CULTURAL = "CULTURAL",
  LANGUAGE = "LANGUAGE",
  PROFESSIONAL = "PROFESSIONAL",
  PERSONAL = "PERSONAL",
}

export enum ProgramFundingSource {
  GOVERNMENT = "GOVERNMENT",
  INSTITUTION = "INSTITUTION",
  PRIVATE = "PRIVATE",
  MIXED = "MIXED",
  STUDENT_SELF = "STUDENT_SELF",
}

export enum MobilityPhase {
  APPLICATION = "APPLICATION",
  PRE_APPROVAL = "PRE_APPROVAL",
  POST_APPROVAL = "POST_APPROVAL",
  PRE_DEPARTURE = "PRE_DEPARTURE",
  ON_SITE = "ON_SITE",
  RE_INTEGRATION = "RE_INTEGRATION",
  POST_MOBILITY = "POST_MOBILITY",
}

export enum StudentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  GRADUATED = "GRADUATED",
  ON_LEAVE = "ON_LEAVE",
  SUSPENDED = "SUSPENDED",
  EXPELLED = "EXPELLED",
}

export enum TransferCreditUnit {
  ECTS = "ECTS",
  CRH = "CRH",
  UNITS = "UNITS",
  HOURS = "HOURS",
}

export enum GradeConversionScale {
  LETTER = "LETTER",
  NUMERIC_100 = "NUMERIC_100",
  NUMERIC_20 = "NUMERIC_20",
  PASS_FAIL = "PASS_FAIL",
  DESCRIPTIVE = "DESCRIPTIVE",
}

export enum MobilityReportType {
  PROGRESS = "PROGRESS",
  FINAL = "FINAL",
  ACADEMIC = "ACADEMIC",
  CULTURAL = "CULTURAL",
  FINANCIAL = "FINANCIAL",
}

export enum PartnerCountryRegion {
  EUROPE = "EUROPE",
  NORTH_AMERICA = "NORTH_AMERICA",
  SOUTH_AMERICA = "SOUTH_AMERICA",
  AFRICA = "AFRICA",
  ASIA = "ASIA",
  OCEANIA = "OCEANIA",
  MIDDLE_EAST = "MIDDLE_EAST",
}

export enum MobilityOutcome {
  SUCCESSFUL = "SUCCESSFUL",
  PARTIALLY_SUCCESSFUL = "PARTIALLY_SUCCESSFUL",
  UNSUCCESSFUL = "UNSUCCESSFUL",
  WITHDRAWN = "WITHDRAWN",
}

export enum AccommodationStatus {
  REQUESTED = "REQUESTED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  WAITLISTED = "WAITLISTED",
}

export enum InsuranceStatus {
  NOT_REQUIRED = "NOT_REQUIRED",
  REQUIRED = "REQUIRED",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  EXPIRED = "EXPIRED",
}

export enum CulturalActivityType {
  ORIENTATION = "ORIENTATION",
  FIELD_TRIP = "FIELD_TRIP",
  WORKSHOP = "WORKSHOP",
  SOCIAL_EVENT = "SOCIAL_EVENT",
  MENTORING = "MENTORING",
  NETWORKING = "NETWORKING",
}

export enum MobilityFeeType {
  APPLICATION = "APPLICATION",
  TUITION = "TUITION",
  HOUSING = "HOUSING",
  INSURANCE = "INSURANCE",
  VISA = "VISA",
  SERVICE = "SERVICE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PARTIAL = "PARTIAL",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
  WAIVED = "WAIVED",
}

export enum AcademicYearFormat {
  YYYY_YYYY = "YYYY_YYYY",
  YYYY = "YYYY",
  YYYY_YY = "YYYY_YY",
}

export enum MobilityCreditStatus {
  EARNED = "EARNED",
  PENDING = "PENDING",
  TRANSFERRED = "TRANSFERRED",
  EXEMPTED = "EXEMPTED",
  FAILED = "FAILED",
}

export enum CountryCodeFormat {
  ISO_3166_1 = "ISO_3166_1",
  ISO_3166_2 = "ISO_3166_2",
  CUSTOM = "CUSTOM",
}

export enum MobilityApplicationRound {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  ROLLING = "ROLLING",
  EMERGENCY = "EMERGENCY",
}

export enum StudentExchangeAgreementType {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  CONSORTIUM = "CONSORTIUM",
}

export enum MobilitySupportLevel {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  MINIMAL = "MINIMAL",
  NONE = "NONE",
}

export enum TranscriptEvaluationMethod {
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL",
  HYBRID = "HYBRID",
}

export enum MobilityDataSyncStatus {
  SYNCED = "SYNCED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  CONFLICT = "CONFLICT",
}

export enum CulturalCompetencyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}

export enum MobilityNotificationType {
  APPLICATION_RECEIVED = "APPLICATION_RECEIVED",
  STATUS_CHANGE = "STATUS_CHANGE",
  DOCUMENT_REQUIRED = "DOCUMENT_REQUIRED",
  DEADLINE_REMINDER = "DEADLINE_REMINDER",
  EMERGENCY = "EMERGENCY",
}

export enum ExchangeInstitutionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  BLACKLISTED = "BLACKLISTED",
}

export enum MobilityGenderDistribution {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  UNDISCLOSED = "UNDISCLOSED",
}

export enum MobilityScholarshipDisbursement {
  LUMP_SUM = "LUMP_SUM",
  MONTHLY = "MONTHLY",
  PERSEMESTER = "PERSEMESTER",
  MILESTONE = "MILESTONE",
}

export enum MobilityReviewStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ESCALATED = "ESCALATED",
}

export enum MobilityLanguageRequirement {
  REQUIRED = "REQUIRED",
  RECOMMENDED = "RECOMMENDED",
  NOT_REQUIRED = "NOT_REQUIRED",
}

export enum MobilityHostMatchStatus {
  UNMATCHED = "UNMATCHED",
  MATCHED = "MATCHED",
  CONFIRMED = "CONFIRMED",
  DECLINED = "DECLINED",
}

export enum MobilityProgramCycle {
  ANNUAL = "ANNUAL",
  SEMESTER = "SEMESTER",
  QUARTER = "QUARTER",
  CUSTOM = "CUSTOM",
}

export interface ExchangeProgram {
  id: string;
  name: string;
  code: string;
  description: string;
  mobilityType: MobilityType;
  direction: MobilityDirection;
  status: MobilityProgramStatus;
  hostInstitutionId: string;
  hostInstitution: HostInstitution;
  homeInstitutionId: string;
  homeInstitution: HomeInstitution;
  academicYear: string;
  semester: string;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  maxParticipants: number;
  currentParticipants: number;
  minGpa: number;
  languageRequirements: LanguageRequirement[];
  requiredDocuments: MobilityDocumentType[];
  creditsAvailable: number;
  creditUnit: TransferCreditUnit;
  fundingSources: ProgramFundingSource[];
  totalBudget: number;
  scholarshipAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentExchange {
  id: string;
  studentId: string;
  student: StudentProfile;
  exchangeProgramId: string;
  exchangeProgram: ExchangeProgram;
  status: ExchangeStatus;
  phase: MobilityPhase;
  direction: MobilityDirection;
  hostInstitutionId: string;
  hostInstitution: HostInstitution;
  startDate: string;
  endDate: string;
  expectedEndDate: string;
  actualStartDate: string;
  actualEndDate: string;
  creditsEnrolled: number;
  creditsCompleted: number;
  creditUnit: TransferCreditUnit;
  gpa: number;
  transcriptFormat: TranscriptFormat;
  languageProficiency: LanguageProficiency;
  insuranceStatus: InsuranceStatus;
  visaStatus: VisaStatus;
  accommodationId: string;
  accommodation: Accommodation;
  scholarshipId: string;
  scholarship: Scholarship;
  mentorId: string;
  mentor: MentorProfile;
  agreement: MobilityAgreement;
  evaluation: MobilityEvaluation;
  reports: MobilityReport[];
  documents: MobilityDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface ErasmusProgram {
  id: string;
  name: string;
  code: string;
  description: string;
  programType: MobilityType;
  fundingBody: string;
  totalBudget: number;
  allocatedBudget: number;
  participatingCountries: string[];
  participatingInstitutions: string[];
  academicYear: string;
  applicationDeadline: string;
  selectionCriteria: SelectionCriteria[];
  mobilityWindows: MobilityWindow[];
  creditTransfer: CreditTransferConfig;
  languageSupport: LanguageSupportConfig;
  insuranceRequirements: InsuranceConfig;
  reportingRequirements: ReportingConfig;
  status: MobilityProgramStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InternationalAdmission {
  id: string;
  studentId: string;
  student: StudentProfile;
  targetInstitutionId: string;
  targetInstitution: HostInstitution;
  programId: string;
  program: AcademicProgram;
  applicationRound: MobilityApplicationRound;
  applicationDate: string;
  decisionDate: string;
  decision: AdmissionDecision;
  conditionalRequirements: string[];
  documents: AdmissionDocument[];
  languageScores: LanguageScore[];
  academicTranscript: AcademicTranscript;
  recommendationLetters: RecommendationLetter[];
  statementOfPurpose: string;
  portfolioUrl: string;
  applicationFee: ApplicationFee;
  status: AdmissionStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisaWorkflow {
  id: string;
  studentId: string;
  student: StudentProfile;
  visaType: VisaType;
  destinationCountry: string;
  issuingAuthority: string;
  applicationDate: string;
  appointmentDate: string;
  decisionDate: string;
  status: VisaStatus;
  documents: VisaDocument[];
  biometricsCompleted: boolean;
  interviewRequired: boolean;
  interviewDate: string;
  processingTime: number;
  visaNumber: string;
  visaExpiryDate: string;
  entryType: string;
  multipleEntry: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Accommodation {
  id: string;
  studentId: string;
  student: StudentProfile;
  accommodationType: AccommodationType;
  status: AccommodationStatus;
  providerName: string;
  providerContact: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  roomNumber: string;
  roomType: string;
  capacity: number;
  monthlyRent: number;
  currency: string;
  depositAmount: number;
  utilitiesIncluded: boolean;
  startDate: string;
  endDate: string;
  contractUrl: string;
  amenities: string[];
  distanceToCampus: number;
  distanceUnit: string;
  transportationOptions: string[];
  mealPlan: string;
  specialRequests: string;
  createdAt: string;
  updatedAt: string;
}

export interface Scholarship {
  id: string;
  name: string;
  code: string;
  description: string;
  scholarshipType: ScholarshipType;
  fundingSource: ProgramFundingSource;
  amount: number;
  currency: string;
  durationMonths: number;
  eligibilityCriteria: EligibilityCriteria;
  applicationDeadline: string;
  maxRecipients: number;
  currentRecipients: number;
  renewable: boolean;
  academicRequirements: AcademicRequirements;
  financialRequirements: FinancialRequirements;
  countryRequirements: string[];
  status: ScholarshipStatus;
  disbursementMethod: MobilityScholarshipDisbursement;
  disbursementSchedule: DisbursementSchedule[];
  createdAt: string;
  updatedAt: string;
}

export interface MobilityTracking {
  id: string;
  exchangeId: string;
  exchange: StudentExchange;
  phase: MobilityPhase;
  status: string;
  milestones: MobilityMilestone[];
  checkpoints: MobilityCheckpoint[];
  alerts: MobilityAlert[];
  travelItinerary: TravelItinerary;
  emergencyContact: EmergencyContact;
  locationHistory: LocationEntry[];
  communications: MobilityCommunication[];
  financialSummary: MobilityFinancialSummary;
  academicProgress: AcademicProgress;
  culturalActivities: CulturalActivity[];
  healthRecords: HealthRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeAnalytics {
  id: string;
  institutionId: string;
  academicYear: string;
  totalExchanges: number;
  outboundExchanges: number;
  inboundExchanges: number;
  topDestinationCountries: CountryStat[];
  topSourceCountries: CountryStat[];
  genderDistribution: GenderDistribution;
  fieldDistribution: FieldDistribution[];
  averageGpa: number;
  completionRate: number;
  averageDuration: number;
  totalCreditsTransferred: number;
  totalScholarshipsAwarded: number;
  totalScholarshipAmount: number;
  averageSatisfactionScore: number;
  employmentOutcome: EmploymentOutcome[];
  regionDistribution: RegionDistribution[];
  mobilityTrend: MobilityTrend[];
  createdAt: string;
  updatedAt: string;
}

export interface AcademicTransfer {
  id: string;
  studentId: string;
  student: StudentProfile;
  sourceInstitutionId: string;
  sourceInstitution: HomeInstitution;
  targetInstitutionId: string;
  targetInstitution: HostInstitution;
  transferType: string;
  status: CreditTransferStatus;
  coursesTransferred: CourseTransfer[];
  totalCreditsTransferred: number;
  totalCreditsRequested: number;
  creditUnit: TransferCreditUnit;
  gpaEquivalent: number;
  gradeScale: GradeConversionScale;
  evaluationMethod: TranscriptEvaluationMethod;
  evaluatorId: string;
  evaluationDate: string;
  approvalDate: string;
  conditions: string[];
  rejectionReason: string;
  documents: TransferDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptConversion {
  id: string;
  studentId: string;
  student: StudentProfile;
  sourceTranscript: AcademicTranscript;
  sourceFormat: TranscriptFormat;
  targetFormat: TranscriptFormat;
  sourceScale: string;
  targetScale: string;
  convertedGrades: ConvertedGrade[];
  conversionTable: ConversionTableEntry[];
  totalCredits: number;
  convertedCredits: number;
  averageGrade: string;
  convertedAverageGrade: string;
  evaluatorId: string;
  evaluationDate: string;
  verified: boolean;
  verifiedBy: string;
  verificationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostInstitution {
  id: string;
  name: string;
  code: string;
  institutionType: HostInstitutionType;
  country: string;
  city: string;
  address: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  erasmusCode: string;
  internationalOffice: InternationalOffice;
  partnershipLevel: PartnershipLevel;
  partnershipStatus: PartnershipStatus;
  ranking: InstitutionRanking;
  availablePrograms: AcademicProgram[];
  languageOfInstruction: string[];
  academicCalendar: AcademicCalendar;
  tuitionFeeRange: FeeRange;
  livingCostEstimate: LivingCostEstimate;
  accreditation: Accreditation[];
  facilities: InstitutionFacilities[];
  createdAt: string;
  updatedAt: string;
}

export interface HomeInstitution {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
  address: string;
  website: string;
  contactEmail: string;
  internationalOffice: InternationalOffice;
  mobilityCoordinator: CoordinatorProfile;
  outgoingStudentRequirements: OutgoingRequirements;
  creditTransferPolicy: CreditTransferPolicy;
  gradeConversionTable: ConversionTableEntry[];
  academicCalendar: AcademicCalendar;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  countryOfBirth: string;
  gender: string;
  studentNumber: string;
  institutionId: string;
  institution: string;
  faculty: string;
  department: string;
  program: string;
  yearOfStudy: number;
  gpa: number;
  totalCredits: number;
  languages: LanguageProficiencyEntry[];
  passportNumber: string;
  passportExpiry: string;
  emergencyContact: EmergencyContact;
  address: Address;
  phone: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface MentorProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  department: string;
  specialization: string;
  experience: number;
  languages: string[];
  availability: MentorAvailability;
  maxMentees: number;
  currentMentees: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface MobilityAgreement {
  id: string;
  exchangeId: string;
  exchange: StudentExchange;
  agreementType: StudentExchangeAgreementType;
  status: MobilityAgreementStatus;
  templateId: string;
  content: string;
  signedByStudent: boolean;
  signedByHomeInstitution: boolean;
  signedByHostInstitution: boolean;
  studentSignatureDate: string;
  homeSignatureDate: string;
  hostSignatureDate: string;
  attachments: string[];
  amendments: AgreementAmendment[];
  createdAt: string;
  updatedAt: string;
}

export interface MobilityEvaluation {
  id: string;
  exchangeId: string;
  exchange: StudentExchange;
  evaluationType: MobilityEvaluationType;
  academicEvaluation: AcademicEvaluation;
  culturalEvaluation: CulturalEvaluation;
  languageEvaluation: LanguageEvaluation;
  overallSatisfaction: number;
  recommendations: string[];
  skillsGained: string[];
  challengesFaced: string[];
  wouldRecommend: boolean;
  evaluatorComments: string;
  createdAt: string;
  updatedAt: string;
}

export interface MobilityDocument {
  id: string;
  exchangeId: string;
  exchange: StudentExchange;
  documentType: MobilityDocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  verifiedAt: string;
  verifiedBy: string;
  expiryDate: string;
  status: string;
  notes: string;
}

export interface MobilityReport {
  id: string;
  exchangeId: string;
  exchange: StudentExchange;
  reportType: MobilityReportType;
  reportingPeriod: string;
  submissionDate: string;
  content: string;
  attachments: string[];
  reviewerId: string;
  reviewerComments: string;
  status: string;
  grade: string;
  createdAt: string;
  updatedAt: string;
}

export interface LanguageRequirement {
  languageCode: string;
  languageName: string;
  minimumLevel: LanguageProficiency;
  testRequired: boolean;
  testType: LanguageTestType;
  minimumScore: number;
  alternativeProofAccepted: boolean;
}

export interface LanguageProficiencyEntry {
  languageCode: string;
  languageName: string;
  proficiency: LanguageProficiency;
  certified: boolean;
  certificationBody: string;
  certificationDate: string;
  expiryDate: string;
}

export interface LanguageScore {
  testType: LanguageTestType;
  overallScore: number;
  componentScores: ComponentScore[];
  testDate: string;
  certificateUrl: string;
  validUntil: string;
}

export interface ComponentScore {
  component: string;
  score: number;
  maxScore: number;
}

export interface AcademicProgram {
  id: string;
  name: string;
  code: string;
  degree: string;
  field: string;
  duration: number;
  durationUnit: string;
  credits: number;
  language: string;
  description: string;
  learningOutcomes: string[];
  assessmentMethods: string[];
}

export interface AcademicTranscript {
  id: string;
  studentId: string;
  institutionId: string;
  academicYear: string;
  semester: string;
  courses: TranscriptCourse[];
  totalCredits: number;
  gpa: number;
  scale: string;
  issuedDate: string;
  verified: boolean;
}

export interface TranscriptCourse {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
  status: string;
}

export interface ConvertedGrade {
  originalGrade: string;
  convertedGrade: string;
  originalPoints: number;
  convertedPoints: number;
  credits: number;
}

export interface ConversionTableEntry {
  sourceGrade: string;
  targetGrade: string;
  sourcePoints: number;
  targetPoints: number;
  description: string;
}

export interface CourseTransfer {
  sourceCourseId: string;
  sourceCourseCode: string;
  sourceCourseName: string;
  sourceCredits: number;
  sourceGrade: string;
  targetCourseId: string;
  targetCourseCode: string;
  targetCourseName: string;
  targetCredits: number;
  targetGrade: string;
  equivalenceStatus: CreditEquivalenceStatus;
  notes: string;
}

export interface AdmissionDocument {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
}

export interface RecommendationLetter {
  id: string;
  recommenderName: string;
  recommenderTitle: string;
  recommenderInstitution: string;
  recommenderEmail: string;
  relationship: string;
  letterUrl: string;
  submittedAt: string;
}

export interface VisaDocument {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
}

export interface TransferDocument {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
}

export interface ApplicationFee {
  amount: number;
  currency: string;
  paid: boolean;
  paymentDate: string;
  transactionId: string;
  receiptUrl: string;
}

export interface SelectionCriteria {
  criterionName: string;
  weight: number;
  description: string;
  minimumScore: number;
}

export interface MobilityWindow {
  id: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  availableSlots: number;
  academicPeriod: string;
}

export interface CreditTransferConfig {
  enabled: boolean;
  maxCreditsTransferable: number;
  creditUnit: TransferCreditUnit;
  minGradeRequired: string;
  automaticApproval: boolean;
}

export interface LanguageSupportConfig {
  provided: boolean;
  preDepartureCourse: boolean;
  onSiteCourse: boolean;
  languagePartner: boolean;
  maximumHours: number;
  fundingAvailable: boolean;
}

export interface InsuranceConfig {
  mandatory: boolean;
  minimumCoverage: number;
  currency: string;
  approvedProviders: string[];
  coverageTypes: InsuranceCoverageType[];
}

export interface ReportingConfig {
  progressReportRequired: boolean;
  finalReportRequired: boolean;
  reportFrequency: string;
  evaluationRequired: boolean;
}

export interface EligibilityCriteria {
  minGpa: number;
  maxAge: number;
  nationalityRestrictions: string[];
  programRestrictions: string[];
  yearRestrictions: number[];
  languageRequirement: LanguageProficiency;
}

export interface AcademicRequirements {
  minCreditsCompleted: number;
  minGpa: number;
  prerequisiteCourses: string[];
  goodStandingRequired: boolean;
}

export interface FinancialRequirements {
  familyIncomeLimit: number;
  bankStatementRequired: boolean;
  minimumBalance: number;
  currency: string;
}

export interface DisbursementSchedule {
  installmentNumber: number;
  amount: number;
  currency: string;
  dueDate: string;
  disbursed: boolean;
  disbursedDate: string;
}

export interface MobilityMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  completedDate: string;
  status: string;
  phase: MobilityPhase;
}

export interface MobilityCheckpoint {
  id: string;
  name: string;
  date: string;
  status: string;
  verifiedBy: string;
  notes: string;
}

export interface MobilityAlert {
  id: string;
  alertType: string;
  severity: string;
  message: string;
  triggeredAt: string;
  resolvedAt: string;
  resolvedBy: string;
}

export interface TravelItinerary {
  departureFlight: FlightDetail;
  returnFlight: FlightDetail;
  groundTransport: GroundTransport[];
  connections: TravelConnection[];
}

export interface FlightDetail {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDateTime: string;
  arrivalDateTime: string;
  bookingReference: string;
}

export interface GroundTransport {
  type: string;
  provider: string;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  arrivalTime: string;
  bookingReference: string;
}

export interface TravelConnection {
  fromCity: string;
  toCity: string;
  transportType: string;
  departureTime: string;
  arrivalTime: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  isPrimary: boolean;
  alternatePhone: string;
}

export interface LocationEntry {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
  timestamp: string;
  activity: string;
}

export interface MobilityCommunication {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  content: string;
  type: string;
  timestamp: string;
  read: boolean;
}

export interface MobilityFinancialSummary {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  currency: string;
  scholarshipsReceived: number;
  personalFunds: number;
  loansOutstanding: number;
  expenseBreakdown: ExpenseItem[];
  exchangeRateUsed: number;
}

export interface ExpenseItem {
  category: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  receiptUrl: string;
}

export interface AcademicProgress {
  creditsEnrolled: number;
  creditsCompleted: number;
  creditsPending: number;
  coursesInProgress: CourseProgress[];
  coursesCompleted: CourseProgress[];
  currentGpa: number;
  academicStanding: string;
}

export interface CourseProgress {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  status: string;
  grade: string;
  attendance: number;
}

export interface CulturalActivity {
  id: string;
  activityType: CulturalActivityType;
  name: string;
  description: string;
  date: string;
  duration: number;
  location: string;
  participants: number;
  feedback: string;
  certificateUrl: string;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  recordType: string;
  description: string;
  date: string;
  provider: string;
  location: string;
  documentUrl: string;
  confidential: boolean;
}

export interface CountryStat {
  country: string;
  countryCode: string;
  count: number;
  percentage: number;
  topInstitutions: string[];
}

export interface GenderDistribution {
  male: number;
  female: number;
  nonBinary: number;
  undisclosed: number;
  total: number;
}

export interface FieldDistribution {
  field: string;
  count: number;
  percentage: number;
}

export interface EmploymentOutcome {
  employed: number;
  furtherStudy: number;
  seekingEmployment: number;
  other: number;
  averageTimeToEmployment: number;
}

export interface RegionDistribution {
  region: PartnerCountryRegion;
  count: number;
  percentage: number;
}

export interface MobilityTrend {
  year: string;
  outboundCount: number;
  inboundCount: number;
  netMobility: number;
  topDestination: string;
}

export interface InternationalOffice {
  id: string;
  name: string;
  director: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface InstitutionRanking {
  globalRank: number;
  regionalRank: number;
  subjectRank: number;
  rankingSource: string;
  rankingYear: string;
}

export interface AcademicCalendar {
  id: string;
  academicYear: string;
  calendarType: AcademicCalendarType;
  terms: AcademicTerm[];
}

export interface AcademicTerm {
  name: string;
  startDate: string;
  endDate: string;
  examPeriod: string;
}

export interface FeeRange {
  min: number;
  max: number;
  currency: string;
  period: string;
}

export interface LivingCostEstimate {
  accommodation: number;
  food: number;
  transportation: number;
  books: number;
  personal: number;
  total: number;
  currency: string;
}

export interface Accreditation {
  body: string;
  program: string;
  validUntil: string;
  status: string;
}

export interface InstitutionFacilities {
  library: boolean;
  laboratory: boolean;
  sports: boolean;
  healthCenter: boolean;
  counseling: boolean;
  careerServices: boolean;
  internationalOffice: boolean;
  studentCenter: boolean;
}

export interface OutgoingRequirements {
  minCreditsCompleted: number;
  minGpa: number;
  languageRequirements: LanguageRequirement[];
  documentsRequired: string[];
  applicationDeadline: string;
}

export interface CreditTransferPolicy {
  maxCreditsTransferable: number;
  minGradeRequired: string;
  automaticApproval: boolean;
  evaluationProcess: TranscriptEvaluationMethod;
}

export interface CoordinatorProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
}

export interface MentorAvailability {
  available: boolean;
  hoursPerWeek: number;
  preferredTimeSlots: string[];
  languages: string[];
}

export interface AgreementAmendment {
  id: string;
  amendmentDate: string;
  description: string;
  approvedBy: string[];
  status: string;
}

export interface AcademicEvaluation {
  coursePerformance: string;
  researchQuality: string;
  participation: string;
  overallRating: number;
  comments: string;
}

export interface CulturalEvaluation {
  adaptationLevel: number;
  culturalEngagement: number;
  socialIntegration: number;
  overallRating: number;
  comments: string;
}

export interface LanguageEvaluation {
  preMobilityLevel: LanguageProficiency;
  postMobilityLevel: LanguageProficiency;
  improvement: number;
  dailyUsage: string;
  academicUsage: string;
  overallRating: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export enum MobilityLanguageTestStatus {
  NOT_TAKEN = "NOT_TAKEN",
  REGISTERED = "REGISTERED",
  COMPLETED = "COMPLETED",
  SCORE_RECEIVED = "SCORE_RECEIVED",
  EXPIRED = "EXPIRED",
}

export enum MobilityConsentStatus {
  PENDING = "PENDING",
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  WITHDRAWN = "WITHDRAWN",
}

export enum MobilityDocumentVerification {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum MobilityFundingStatus {
  NOT_APPLIED = "NOT_APPLIED",
  APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  DISBURSED = "DISBURSED",
  PARTIALLY_DISBURSED = "PARTIALLY_DISBURSED",
}

export enum MobilityHealthClearance {
  NOT_REQUIRED = "NOT_REQUIRED",
  PENDING = "PENDING",
  CLEARED = "CLEARED",
  CONDITIONAL = "CONDITIONAL",
  DENIED = "DENIED",
}

export interface MobilityLanguageTestRegistration {
  id: string;
  studentId: string;
  testType: LanguageTestType;
  registrationDate: string;
  testDate: string;
  testCenter: string;
  country: string;
  status: MobilityLanguageTestStatus;
  score: number;
  certificateUrl: string;
}

export interface MobilityConsentRecord {
  id: string;
  studentId: string;
  consentType: string;
  description: string;
  status: MobilityConsentStatus;
  grantedAt: string;
  withdrawnAt: string;
  ipAddress: string;
}

export interface MobilityDocumentChecklist {
  id: string;
  exchangeId: string;
  documents: MobilityDocumentChecklistItem[];
  completedCount: number;
  totalCount: number;
  completionPercent: number;
  lastUpdated: string;
}

export interface MobilityDocumentChecklistItem {
  documentType: MobilityDocumentType;
  required: boolean;
  status: MobilityDocumentVerification;
  submittedAt: string;
  verifiedAt: string;
  expiryDate: string;
  notes: string;
}

export interface MobilityFundingApplication {
  id: string;
  studentId: string;
  scholarshipId: string;
  scholarship: Scholarship;
  applicationDate: string;
  amountRequested: number;
  amountApproved: number;
  currency: string;
  status: MobilityFundingStatus;
  supportingDocuments: string[];
  decisionDate: string;
  disbursementDate: string;
}

export interface MobilityHealthClearanceRecord {
  id: string;
  studentId: string;
  clearanceType: string;
  status: MobilityHealthClearance;
  providerName: string;
  clearanceDate: string;
  expiryDate: string;
  documentUrl: string;
  conditions: string[];
}

export interface MobilityInboundOrientation {
  id: string;
  inboundStudentId: string;
  orientationDate: string;
  sessions: OrientationSession[];
  attended: boolean;
  completionPercent: number;
  feedback: string;
}

export interface OrientationSession {
  sessionId: string;
  topic: string;
  presenter: string;
  duration: number;
  attended: boolean;
}

export interface MobilityOutboundBriefing {
  id: string;
  outboundStudentId: string;
  briefingDate: string;
  destination: string;
  topicsCovered: string[];
  completedBy: string;
  completionStatus: string;
  checklist: PreDepartureChecklistItem[];
}

export interface PreDepartureChecklistItem {
  item: string;
  completed: boolean;
  dueDate: string;
  notes: string;
}

export interface MobilityInsurancePolicy {
  id: string;
  studentId: string;
  exchangeId: string;
  providerName: string;
  policyNumber: string;
  coverageTypes: InsuranceCoverageType[];
  startDate: string;
  endDate: string;
  premiumAmount: number;
  currency: string;
  coverageAmount: number;
  documentUrl: string;
}

export interface MobilityArrivalRecord {
  id: string;
  exchangeId: string;
  arrivalDate: string;
  arrivalAirport: string;
  transportToAccommodation: string;
  accommodationConfirmed: boolean;
  localSimActivated: boolean;
  bankAccountOpened: boolean;
  registeredWithLocalAuth: boolean;
  mentorContacted: boolean;
  notes: string;
}

export interface MobilityDepartureRecord {
  id: string;
  exchangeId: string;
  departureDate: string;
  departureAirport: string;
  accommodationVacated: boolean;
  localSimDeactivated: boolean;
  bankAccountClosed: boolean;
  deregisteredFromLocalAuth: boolean;
  finalReportSubmitted: boolean;
  exitInterviewCompleted: boolean;
  notes: string;
}

export interface MobilityWellbeingRecord {
  id: string;
  studentId: string;
  checkInDate: string;
  physicalHealth: number;
  mentalHealth: number;
  socialIntegration: number;
  academicStress: number;
  financialStress: number;
  overallWellbeing: number;
  supportNeeded: boolean;
  supportProvided: string;
  followUpDate: string;
}

export interface MobilityAcademicAdvisor {
  id: string;
  studentId: string;
  advisorName: string;
  advisorEmail: string;
  institution: string;
  department: string;
  role: string;
  meetingFrequency: string;
  lastMeeting: string;
  nextMeeting: string;
}

export interface MobilityHostFamily {
  id: string;
  studentId: string;
  familyName: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  numberOfMembers: number;
  languages: string[];
  specialNeeds: string[];
  startDate: string;
  endDate: string;
}

export interface MobilityCourseRegistration {
  id: string;
  exchangeId: string;
  courses: RegisteredCourse[];
  totalCredits: number;
  creditUnit: TransferCreditUnit;
  registrationDate: string;
  approvedBy: string;
}

export interface RegisteredCourse {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
}

export interface MobilityGradeReport {
  id: string;
  exchangeId: string;
  courses: GradeReportCourse[];
  gpa: number;
  scale: string;
  creditsEarned: number;
  creditsAttempted: number;
  academicStanding: string;
  issuedDate: string;
  transcriptUrl: string;
}

export interface GradeReportCourse {
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
  passed: boolean;
}

export interface MobilityCulturalAssessment {
  id: string;
  studentId: string;
  assessmentDate: string;
  culturalAwareness: number;
  adaptability: number;
  interculturalSkills: number;
  languageConfidence: number;
  socialNetwork: number;
  overallScore: number;
  recommendations: string[];
}

export interface MobilityReintegrationPlan {
  id: string;
  exchangeId: string;
  planDate: string;
  academicGoals: string[];
  careerGoals: string[];
  skillApplication: string[];
  networkMaintenance: string[];
  followUpMeeting: string;
  status: string;
}

export interface MobilityDataConsent {
  id: string;
  studentId: string;
  consentType: string;
  purpose: string;
  dataShared: string[];
  recipient: string;
  consentGiven: boolean;
  consentDate: string;
  expiryDate: string;
  withdrawable: boolean;
}

export interface MobilityCreditEquivalency {
  id: string;
  sourceCourseCode: string;
  sourceCourseName: string;
  sourceCredits: number;
  sourceInstitution: string;
  targetCourseCode: string;
  targetCourseName: string;
  targetCredits: number;
  targetInstitution: string;
  equivalencyStatus: CreditEquivalenceStatus;
  evaluatorComments: string;
  approvedBy: string;
  approvalDate: string;
}

export interface MobilityCostEstimate {
  id: string;
  destination: string;
  durationWeeks: number;
  accommodationCost: number;
  foodCost: number;
  transportCost: number;
  insuranceCost: number;
  visaCost: number;
  flightCost: number;
  personalCost: number;
  totalEstimate: number;
  currency: string;
  lastUpdated: string;
}

export interface MobilityStudentFeedback {
  id: string;
  exchangeId: string;
  feedbackDate: string;
  overallSatisfaction: number;
  academicExperience: number;
  culturalExperience: number;
  accommodationSatisfaction: number;
  supportSatisfaction: number;
  wouldRecommend: boolean;
  bestAspect: string;
  worstAspect: string;
  suggestions: string[];
  testimonial: string;
  anonymous: boolean;
}

export interface MobilityProgramEvaluation {
  id: string;
  programId: string;
  evaluationPeriod: string;
  totalParticipants: number;
  responseRate: number;
  averageSatisfaction: number;
  academicOutcomes: string;
  culturalOutcomes: string;
  languageOutcomes: string;
  areasForImprovement: string[];
  strengths: string[];
  recommendations: string[];
  submittedBy: string;
  submittedAt: string;
}

export interface MobilityEmergencyRecord {
  id: string;
  studentId: string;
  exchangeId: string;
  emergencyType: EmergencyProtocol;
  reportedDate: string;
  reportedBy: string;
  location: string;
  description: string;
  actionsTaken: string[];
  resolvedDate: string;
  resolvedBy: string;
  followUpRequired: boolean;
  followUpDate: string;
  documentsAttached: string[];
  status: string;
}

export interface MobilityVisaApplicationTracking {
  id: string;
  studentId: string;
  visaType: VisaType;
  destinationCountry: string;
  applicationSubmittedDate: string;
  biometricsDate: string;
  interviewDate: string;
  decisionDate: string;
  status: VisaStatus;
  processingCenter: string;
  trackingNumber: string;
  passportCollected: boolean;
  passportReturnDate: string;
  visaStickerNumber: string;
  validityFrom: string;
  validityTo: string;
  entriesPermitted: string;
  notes: string;
}

export interface MobilityArrivalChecklist {
  id: string;
  exchangeId: string;
  items: ArrivalChecklistItem[];
  completionPercent: number;
  completedAt: string;
  verifiedBy: string;
}

export interface ArrivalChecklistItem {
  item: string;
  completed: boolean;
  completedAt: string;
  notes: string;
}

export interface MobilityTransportArrangement {
  id: string;
  exchangeId: string;
  transportType: string;
  provider: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  bookingReference: string;
  cost: number;
  currency: string;
  confirmed: boolean;
}

export interface MobilityLocalRegistration {
  id: string;
  studentId: string;
  exchangeId: string;
  registrationAuthority: string;
  registrationDate: string;
  registrationNumber: string;
  addressRegistered: string;
  documentsSubmitted: string[];
  cardIssued: boolean;
  cardNumber: string;
  expiryDate: string;
  renewalRequired: boolean;
  notes: string;
}

export interface MobilityBankAccount {
  id: string;
  studentId: string;
  exchangeId: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  currency: string;
  openedDate: string;
  closedDate: string;
  status: string;
  monthlyFees: number;
}

export interface MobilitySIMCard {
  id: string;
  studentId: string;
  exchangeId: string;
  provider: string;
  phoneNumber: string;
  dataPlan: string;
  activatedDate: string;
  deactivatedDate: string;
  monthlyCost: number;
  currency: string;
  status: string;
}

export interface MobilityCulturalActivityParticipation {
  id: string;
  studentId: string;
  activityId: string;
  activityName: string;
  activityType: CulturalActivityType;
  participationDate: string;
  duration: number;
  location: string;
  satisfaction: number;
  skillsLearned: string[];
  certificateUrl: string;
}

export interface MobilityMentoringSession {
  id: string;
  exchangeId: string;
  mentorId: string;
  mentorName: string;
  sessionDate: string;
  duration: number;
  sessionType: string;
  topicsDiscussed: string[];
  actionItems: string[];
  studentSatisfaction: number;
  notes: string;
  nextSessionDate: string;
}

export interface MobilityIncidentReport {
  id: string;
  studentId: string;
  exchangeId: string;
  incidentType: string;
  severity: string;
  reportedDate: string;
  location: string;
  description: string;
  witnesses: string[];
  authoritiesNotified: boolean;
  insuranceClaim: boolean;
  actionsTaken: string[];
  resolvedDate: string;
  resolvedBy: string;
  outcome: string;
}

export interface MobilityWellnessPlan {
  id: string;
  studentId: string;
  exchangeId: string;
  createdDate: string;
  healthGoals: string[];
  mentalHealthGoals: string[];
  socialGoals: string[];
  exercisePlan: string;
  dietaryRequirements: string[];
  medicalNeeds: string[];
  emergencyProcedures: string[];
  supportContacts: EmergencyContact[];
  reviewDate: string;
}

export interface MobilitySocialIntegration {
  id: string;
  studentId: string;
  exchangeId: string;
  assessmentDate: string;
  localFriends: number;
  internationalFriends: number;
  clubMemberships: string[];
  volunteerActivities: string[];
  socialEventsAttended: number;
  integrationScore: number;
  challenges: string[];
  strategies: string[];
}

export interface MobilityAcademicPerformance {
  id: string;
  exchangeId: string;
  semester: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  creditsEarned: number;
  gpa: number;
  classRank: number;
  totalStudents: number;
  professorComments: string[];
  attendanceRate: number;
  participationScore: number;
  researchInvolvement: boolean;
  academicAwards: string[];
}

export interface MobilityFinancialAid {
  id: string;
  studentId: string;
  exchangeId: string;
  aidType: string;
  source: string;
  amount: number;
  currency: string;
  disbursementDate: string;
  disbursementMethod: string;
  conditions: string[];
  renewalEligible: boolean;
  status: string;
}

export interface MobilityTravelInsurance {
  id: string;
  studentId: string;
  exchangeId: string;
  provider: string;
  policyNumber: string;
  coverageTypes: InsuranceCoverageType[];
  coverageAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  premium: number;
  documentUrl: string;
  emergencyAssistanceNumber: string;
  status: string;
}

export interface MobilityHostInstitutionFeedback {
  id: string;
  exchangeId: string;
  hostInstitutionId: string;
  feedbackDate: string;
  academicSupport: number;
  administrativeSupport: number;
  facilitiesQuality: number;
  studentServices: number;
  accommodationSupport: number;
  culturalPrograms: number;
  overallSatisfaction: number;
  strengths: string[];
  improvements: string[];
  wouldPartnerAgain: boolean;
  comments: string;
}

export interface MobilityAlumniNetwork {
  id: string;
  alumniId: string;
  graduateId: string;
  exchangeId: string;
  graduationYear: string;
  institution: string;
  program: string;
  currentEmployer: string;
  currentPosition: string;
  location: string;
  industry: string;
  availableForMentoring: boolean;
  availableForNetworking: boolean;
  linkedinUrl: string;
  joinedDate: string;
}

export interface MobilityQualityAssurance {
  id: string;
  programId: string;
  assessmentDate: string;
  assessorId: string;
  assessorName: string;
  qualityCriteria: QualityCriterion[];
  overallScore: number;
  accreditationStatus: string;
  recommendations: string[];
  nextReviewDate: string;
}

export interface QualityCriterion {
  criterion: string;
  weight: number;
  score: number;
  maxScore: number;
  comments: string;
}

export interface MobilityComplianceRecord {
  id: string;
  exchangeId: string;
  complianceType: string;
  requirement: string;
  status: string;
  verifiedDate: string;
  verifiedBy: string;
  documentUrl: string;
  expiryDate: string;
  renewalRequired: boolean;
  notes: string;
}

export interface MobilityDataSyncLog {
  id: string;
  exchangeId: string;
  syncType: string;
  sourceSystem: string;
  targetSystem: string;
  recordsSent: number;
  recordsReceived: number;
  recordsFailed: number;
  syncDate: string;
  duration: number;
  status: MobilityDataSyncStatus;
  errors: string[];
}

export interface MobilityCancellationRecord {
  id: string;
  exchangeId: string;
  cancellationDate: string;
  reason: string;
  requestedBy: string;
  approvedBy: string;
  refundAmount: number;
  refundCurrency: string;
  refundStatus: string;
  documentsReturned: boolean;
  visaCancelled: boolean;
  accommodationCancelled: boolean;
  insuranceCancelled: boolean;
  notes: string;
}

export interface MobilityExtensionRequest {
  id: string;
  exchangeId: string;
  requestedExtensionWeeks: number;
  reason: string;
  requestedDate: string;
  approvedBy: string;
  approvalDate: string;
  status: string;
  additionalCost: number;
  additionalFunding: string;
  newEndDate: string;
  notes: string;
}

export interface MobilityLateRegistration {
  id: string;
  exchangeId: string;
  originalDeadline: string;
  registrationDate: string;
  justification: string;
  lateFee: number;
  currency: string;
  approvedBy: string;
  approvalDate: string;
  status: string;
}

export interface MobilityVisaRenewal {
  id: string;
  studentId: string;
  originalVisaId: string;
  renewalReason: string;
  applicationDate: string;
  newExpiryDate: string;
  status: VisaStatus;
  processingTime: number;
  fee: number;
  currency: string;
  notes: string;
}

export interface MobilityTravelDelay {
  id: string;
  exchangeId: string;
  delayType: string;
  carrier: string;
  originalDeparture: string;
  newDeparture: string;
  delayDuration: number;
  reason: string;
  compensation: number;
  compensationCurrency: string;
  alternativeArranged: boolean;
  accommodationProvided: boolean;
  mealsProvided: boolean;
}

export interface MobilityHealthInsuranceClaim {
  id: string;
  studentId: string;
  insurancePolicyId: string;
  claimDate: string;
  claimType: string;
  provider: string;
  amount: number;
  currency: string;
  description: string;
  documentsAttached: string[];
  status: string;
  processedDate: string;
  paidAmount: number;
  notes: string;
}

export interface MobilitySocialMediaPost {
  id: string;
  studentId: string;
  exchangeId: string;
  platform: string;
  postDate: string;
  content: string;
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
  sentiment: string;
}

export interface MobilityNewsletterEntry {
  id: string;
  exchangeId: string;
  studentId: string;
  publicationDate: string;
  headline: string;
  content: string;
  imageUrl: string;
  authorName: string;
  views: number;
  featured: boolean;
}
