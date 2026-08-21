export enum PassportType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  RESEARCHER = "RESEARCHER",
  PROFESSIONAL = "PROFESSIONAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  DIGITAL = "DIGITAL",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum PassportStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  RENEWED = "RENEWED",
  CANCELLED = "CANCELLED",
}

export enum IdentityVerificationLevel {
  BASIC = "BASIC",
  ENHANCED = "ENHANCED",
  PREMIUM = "PREMIUM",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENT = "GOVERNMENT",
}

export enum CredentialType {
  DEGREE = "DEGREE",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  TRANSCRIPT = "TRANSCRIPT",
  LICENSE = "LICENSE",
  AWARD = "AWARD",
  MICRO_CREDENTIAL = "MICRO_CREDENTIAL",
  BADGE = "BADGE",
  SKILL_CERTIFICATE = "SKILL_CERTIFICATE",
}

export enum CredentialStatus {
  VALID = "VALID",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  FRAUDULENT = "FRAUDULENT",
}

export enum BlockchainType {
  ETHEREUM = "ETHEREUM",
  SOLANA = "SOLANA",
  POLYGON = "POLYGON",
  HYPERLEDGER = "HYPERLEDGER",
  CORDA = "CORDA",
  BITCOIN = "BITCOIN",
  CUSTOM = "CUSTOM",
}

export enum AuthMethod {
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
  SSO = "SSO",
  MFA = "MFA",
  BIOMETRIC = "BIOMETRIC",
  HARDWARE_KEY = "HARDWARE_KEY",
  BLOCKCHAIN = "BLOCKCHAIN",
  SOCIAL_LOGIN = "SOCIAL_LOGIN",
  CERTIFICATE_BASED = "CERTIFICATE_BASED",
}

export enum BiometricType {
  FINGERPRINT = "FINGERPRINT",
  FACE_RECOGNITION = "FACE_RECOGNITION",
  IRIS_SCAN = "IRIS_SCAN",
  VOICE_PRINT = "VOICE_PRINT",
  VEIN_PATTERN = "VEIN_PATTERN",
}

export enum FederationType {
  SAML = "SAML",
  OIDC = "OIDC",
  SHIBBOLETH = "SHIBBOLETH",
  CAS = "CAS",
  LDAP = "LDAP",
  AZURE_AD = "AZURE_AD",
  GOOGLE_WORKSPACE = "GOOGLE_WORKSPACE",
}

export enum WalletType {
  DIGITAL = "DIGITAL",
  MOBILE = "MOBILE",
  HARDWARE = "HARDWARE",
  CLOUD = "CLOUD",
  HYBRID = "HYBRID",
}

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
  LOST = "LOST",
  STOLEN = "STOLEN",
  RECOVERED = "RECOVERED",
  EXPIRED = "EXPIRED",
}

export enum CredentialFormat {
  JSON_LD = "JSON_LD",
  VC = "VC",
  JWT = "JWT",
  PDF = "PDF",
  XML = "XML",
  CBOR = "CBOR",
}

export enum VerificationStatus {
  VERIFIED = "VERIFIED",
  NOT_VERIFIED = "NOT_VERIFIED",
  PARTIALLY_VERIFIED = "PARTIALLY_VERIFIED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export enum TrustLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  NONE = "NONE",
  CUSTOM = "CUSTOM",
}

export enum IssuerType {
  UNIVERSITY = "UNIVERSITY",
  COLLEGE = "COLLEGE",
  SCHOOL = "SCHOOL",
  GOVERNMENT = "GOVERNMENT",
  PROFESSIONAL_BODY = "PROFESSIONAL_BODY",
  CORPORATION = "CORPORATION",
  NGO = "NGO",
  INTERNATIONAL_ORG = "INTERNATIONAL_ORG",
}

export enum RecipientType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PROFESSIONAL = "PROFESSIONAL",
  INSTITUTION = "INSTITUTION",
  EMPLOYER = "EMPLOYER",
  GOVERNMENT = "GOVERNMENT",
}

export enum DocumentFormat {
  PDF = "PDF",
  JPEG = "JPEG",
  PNG = "PNG",
  SVG = "SVG",
  HTML = "HTML",
  JSON_DOC = "JSON_DOC",
}

export enum StorageLocation {
  LOCAL = "LOCAL",
  CLOUD = "CLOUD",
  BLOCKCHAIN = "BLOCKCHAIN",
  IPFS = "IPFS",
  DECENTRALIZED = "DECENTRALIZED",
}

export enum ShareMethod {
  LINK = "LINK",
  QR_CODE = "QR_CODE",
  EMAIL = "EMAIL",
  NFC = "NFC",
  BLUETOOTH = "BLUETOOTH",
  API = "API",
}

export enum PrivacyLevel {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  RESTRICTED = "RESTRICTED",
  SELECTIVE = "SELECTIVE",
  CONFIDENTIAL = "CONFIDENTIAL",
}

export enum AuditAction {
  CREATED = "CREATED",
  VIEWED = "VIEWED",
  SHARED = "SHARED",
  VERIFIED = "VERIFIED",
  REVOKED = "REVOKED",
  UPDATED = "UPDATED",
  DOWNLOADED = "DOWNLOADED",
  EXPORTED = "EXPORTED",
}

export enum IdentityNotificationType {
  CREDENTIAL_ISSUED = "CREDENTIAL_ISSUED",
  CREDENTIAL_REVOKED = "CREDENTIAL_REVOKED",
  CREDENTIAL_EXPIRING = "CREDENTIAL_EXPIRING",
  WALLET_LOCKED = "WALLET_LOCKED",
  VERIFICATION_COMPLETE = "VERIFICATION_COMPLETE",
  SHARE_REQUEST = "SHARE_REQUEST",
  SECURITY_ALERT = "SECURITY_ALERT",
}

export enum PermissionType {
  VIEW = "VIEW",
  SHARE = "SHARE",
  VERIFY = "VERIFY",
  DOWNLOAD = "DOWNLOAD",
  EXPORT = "EXPORT",
  REVOKE = "REVOKE",
  ADMIN = "ADMIN",
}

export enum ExpiryAction {
  NOTIFY = "NOTIFY",
  AUTO_RENEW = "AUTO_RENEW",
  SUSPEND = "SUSPEND",
  REVOKE = "REVOKE",
  NONE = "NONE",
}

export enum ValidationType {
  SIGNATURE = "SIGNATURE",
  CHAIN = "CHAIN",
  ISSUER = "ISSUER",
  EXPIRY = "EXPIRY",
  REVOCATION = "REVOCATION",
  INTEGRITY = "INTEGRITY",
}

export enum IdentityProviderType {
  UNIVERSITY = "UNIVERSITY",
  GOVERNMENT = "GOVERNMENT",
  CORPORATE = "CORPORATE",
  CLOUD = "CLOUD",
  DECENTRALIZED = "DECENTRALIZED",
  HYBRID = "HYBRID",
}

export enum CredentialCategory {
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
  VOCATIONAL = "VOCATIONAL",
  SKILL = "SKILL",
  COMPLETION = "COMPLETION",
  HONOR = "HONOR",
  LICENSE = "LICENSE",
}

export enum AchievementLevel {
  DISTINCTION = "DISTINCTION",
  MERIT = "MERIT",
  PASS = "PASS",
  HONORS = "HONORS",
  FIRST_CLASS = "FIRST_CLASS",
  SECOND_CLASS = "SECOND_CLASS",
  THIRD_CLASS = "THIRD_CLASS",
}

export enum TransferCreditStatus {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  CONDITIONAL = "CONDITIONAL",
  NOT_ACCEPTED = "NOT_ACCEPTED",
  UNDER_REVIEW = "UNDER_REVIEW",
}

export enum CrossBorderStatus {
  RECOGNIZED = "RECOGNIZED",
  PENDING_RECOGNITION = "PENDING_RECOGNITION",
  NOT_RECOGNIZED = "NOT_RECOGNIZED",
  CONDITIONALLY_RECOGNIZED = "CONDITIONALLY_RECOGNIZED",
  UNDER_EVALUATION = "UNDER_EVALUATION",
}

export enum RecognitionBody {
  NATIONAL_AUTHORITY = "NATIONAL_AUTHORITY",
  PROFESSIONAL_BODY = "PROFESSIONAL_BODY",
  UNIVERSITY = "UNIVERSITY",
  INTERNATIONAL_ORG = "INTERNATIONAL_ORG",
  GOVERNMENT = "GOVERNMENT",
}

export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTER = "MASTER",
}

export enum CompetencyStatus {
  ACHIEVED = "ACHIEVED",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export enum LearningOutcomeType {
  KNOWLEDGE = "KNOWLEDGE",
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  ATTITUDE = "ATTITUDE",
  BEHAVIOR = "BEHAVIOR",
}

export enum AssessmentMethod {
  EXAMINATION = "EXAMINATION",
  PORTFOLIO = "PORTFOLIO",
  PROJECT = "PROJECT",
  PRACTICAL = "PRACTICAL",
  ORAL = "ORAL",
  WRITTEN = "WRITTEN",
  PEER = "PEER",
  SELF = "SELF",
}

export enum GradeType {
  LETTER = "LETTER",
  NUMERIC = "NUMERIC",
  GPA = "GPA",
  PERCENTAGE = "PERCENTAGE",
  PASS_FAIL = "PASS_FAIL",
}

export enum TranscriptFormat {
  DIGITAL = "DIGITAL",
  PAPER = "PAPER",
  BLOCKCHAIN = "BLOCKCHAIN",
  VERIFIED = "VERIFIED",
}

export enum VerificationMethod {
  QR_CODE = "QR_CODE",
  CODE = "CODE",
  LINK = "LINK",
  API = "API",
  DIRECT = "DIRECT",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum SharingScope {
  PUBLIC = "PUBLIC",
  SPECIFIC = "SPECIFIC",
  INSTITUTIONAL = "INSTITUTIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum RevocationReason {
  GRADUATED = "GRADUATED",
  INCOMPLETE = "INCOMPLETE",
  FRAUD = "FRAUD",
  EXPIRED = "EXPIRED",
  AMENDED = "AMENDED",
  REQUESTED = "REQUESTED",
  POLICY = "POLICY",
}

export enum IdentityRecoveryMethod {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  SECURITY_QUESTIONS = "SECURITY_QUESTIONS",
  IDENTITY_VERIFICATION = "IDENTITY_VERIFICATION",
  INSTITUTION = "INSTITUTION",
  BACKUP_CODES = "BACKUP_CODES",
}

export enum WalletFeature {
  CREDENTIAL_STORAGE = "CREDENTIAL_STORAGE",
  CREDENTIAL_SHARING = "CREDENTIAL_SHARING",
  QR_GENERATION = "QR_GENERATION",
  PUSH_NOTIFICATIONS = "PUSH_NOTIFICATIONS",
  BIOMETRIC_AUTH = "BIOMETRIC_AUTH",
  OFFLINE_ACCESS = "OFFLINE_ACCESS",
  MULTI_DEVICE = "MULTI_DEVICE",
}

export enum CredentialVerificationResult {
  VALID = "VALID",
  INVALID = "INVALID",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  UNTRUSTED_ISSUER = "UNTRUSTED_ISSUER",
  TAMPERED = "TAMPERED",
  UNKNOWN = "UNKNOWN",
}

export enum DigitalSignatureType {
  RSA = "RSA",
  ECDSA = "ECDSA",
  EDDSA = "EDDSA",
  BLS = "BLS",
}

export enum EncryptionType {
  AES_256 = "AES_256",
  RSA_OAEP = "RSA_OAEP",
  ECIES = "ECIES",
  CHACHA20 = "CHACHA20",
}

export enum KeyType {
  RSA = "RSA",
  EC = "EC",
  ED25519 = "ED25519",
  BLS = "BLS",
}

export enum RevocationMechanism {
  CRL = "CRL",
  OCSP = "OCSP",
  SMART_CONTRACT = "SMART_CONTRACT",
  REVOKE_LIST = "REVOKE_LIST",
}

export enum WalletSecurityLevel {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  HIGH = "HIGH",
  MAXIMUM = "MAXIMUM",
}

export enum CredentialDisplay {
  CARD = "CARD",
  DETAILED = "DETAILED",
  MINIMAL = "MINIMAL",
  CUSTOM = "CUSTOM",
}

export enum VerificationTrustChain {
  DIRECT = "DIRECT",
  CHAINED = "CHAINED",
  FEDERATED = "FEDERATED",
  ROOT_OF_TRUST = "ROOT_OF_TRUST",
}

export enum IdentityAttributeType {
  PERSONAL = "PERSONAL",
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
  FINANCIAL = "FINANCIAL",
  HEALTH = "HEALTH",
}

export enum ConsentType {
  FULL = "FULL",
  SELECTIVE = "SELECTIVE",
  ANONYMOUS = "ANONYMOUS",
  TEMPORARY = "TEMPORARY",
  NONE = "NONE",
}

export enum DataPortabilityFormat {
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV",
  PDF_PORT = "PDF_PORT",
  DIGITAL = "DIGITAL",
}

export enum InteroperabilityStandard {
  W3C_VC = "W3C_VC",
  OPEN_BADGES = "OPEN_BADGES",
  EUROPEAN_DIGITAL = "EUROPEAN_DIGITAL",
  CUSTOM = "CUSTOM",
}

export enum ComplianceFramework {
  GDPR = "GDPR",
  CCPA = "CCPA",
  FERPA = "FERPA",
  HIPAA = "HIPAA",
  LOCAL = "LOCAL",
}

export enum IdentityLifecycle {
  CREATED = "CREATED",
  VERIFIED = "VERIFIED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
  ARCHIVED = "ARCHIVED",
}

export enum WalletBackupType {
  CLOUD = "CLOUD",
  LOCAL = "LOCAL",
  SEED_PHRASE = "SEED_PHRASE",
  KEY_FILE = "KEY_FILE",
  HYBRID = "HYBRID",
}

export enum CredentialClaimType {
  PERSONAL_IDENTIFIER = "PERSONAL_IDENTIFIER",
  ACADEMIC_RECORD = "ACADEMIC_RECORD",
  SKILL_ASSERTION = "SKILL_ASSERTION",
  COMPETENCY_ASSERTION = "COMPETENCY_ASSERTION",
  PROFESSIONAL_ASSERTION = "PROFESSIONAL_ASSERTION",
}

export enum CrossBorderAgreementType {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  REGIONAL = "REGIONAL",
  GLOBAL = "GLOBAL",
}

export enum RecognitionDecision {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  CONDITIONAL = "CONDITIONAL",
  DENIED = "DENIED",
  PENDING = "PENDING",
}

export enum BlockchainNetworkType {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
  PRIVATE = "PRIVATE",
  CONSORTIUM = "CONSORTIUM",
}

export enum SmartContractAction {
  ISSUE = "ISSUE",
  VERIFY = "VERIFY",
  REVOKE = "REVOKE",
  RENEW = "RENEW",
  TRANSFER = "TRANSFER",
}

export enum CredentialTemplateType {
  STANDARD = "STANDARD",
  CUSTOM = "CUSTOM",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENT = "GOVERNMENT",
}
export interface GlobalStudentPassport {
  id: string;
  passportNumber: string;
  passportType: PassportType;
  passportStatus: PassportStatus;
  verificationLevel: IdentityVerificationLevel;
  studentId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  countryOfBirth: string;
  gender: string;
  photographUrl: string;
  biometricData: StudentBiometricData | null;
  contactInformation: StudentContactInformation;
  academicHistory: StudentAcademicRecord[];
  currentInstitution: StudentInstitutionAffiliation;
  passportIssuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  lastRenewalDate: string | null;
  issuingCountry: string;
  issuingInstitution: string;
  verificationCode: string;
  qrCode: string;
  blockchainId: string | null;
  digitalSignature: string;
  verificationUrl: string;
  sharingPreferences: PassportSharingPreferences;
  privacySettings: PassportPrivacySettings;
  securitySettings: PassportSecuritySettings;
  activityLog: PassportActivityLog[];
  linkedAccounts: PassportLinkedAccount[];
  achievements: StudentAchievement[];
  skills: StudentSkill[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface StudentBiometricData {
  biometricType: BiometricType;
  templateHash: string;
  enrollmentDate: string;
  lastVerified: string;
  provider: string;
  isEnrolled: boolean;
}

export interface StudentContactInformation {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface StudentAcademicRecord {
  recordId: string;
  institutionName: string;
  institutionCountry: string;
  degreeLevel: string;
  programName: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  status: string;
  gpa: number | null;
  credits: number;
  honors: string[];
  transcriptUrl: string | null;
}

export interface StudentInstitutionAffiliation {
  institutionId: string;
  institutionName: string;
  institutionCountry: string;
  studentNumber: string;
  enrollmentStatus: string;
  programName: string;
  yearOfStudy: number;
  expectedGraduation: string;
  faculty: string;
  department: string;
}

export interface PassportSharingPreferences {
  defaultPrivacyLevel: PrivacyLevel;
  autoShareTranscript: boolean;
  autoShareCertificates: boolean;
  shareWithEmployers: boolean;
  shareWithInstitutions: boolean;
  shareWithGovernment: boolean;
  expiryForSharedCredentials: number;
}

export interface PassportPrivacySettings {
  showPersonalInfo: boolean;
  showAcademicInfo: boolean;
  showContactInfo: boolean;
  showFinancialInfo: boolean;
  allowPublicSearch: boolean;
  allowInstitutionalSearch: boolean;
}

export interface PassportSecuritySettings {
  authenticationMethod: AuthMethod;
  mfaEnabled: boolean;
  biometricEnabled: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  passwordLastChanged: string;
  securityQuestions: SecurityQuestion[];
}

export interface SecurityQuestion {
  questionId: string;
  question: string;
  answerHash: string;
}

export interface PassportActivityLog {
  logId: string;
  action: AuditAction;
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  location: string;
}

export interface PassportLinkedAccount {
  accountId: string;
  provider: string;
  providerType: IdentityProviderType;
  externalId: string;
  email: string;
  linkedDate: string;
  isVerified: boolean;
}

export interface StudentAchievement {
  achievementId: string;
  achievementType: string;
  title: string;
  description: string;
  dateAchieved: string;
  issuingOrganization: string;
  country: string;
  level: AchievementLevel;
  credentialId: string | null;
  verified: boolean;
}

export interface StudentSkill {
  skillId: string;
  skillName: string;
  skillCategory: string;
  skillLevel: SkillLevel;
  verifiedBy: string;
  verificationDate: string;
  evidenceUrl: string | null;
  expiresAt: string | null;
}
export interface GlobalTeacherPassport {
  id: string;
  passportNumber: string;
  passportType: PassportType;
  passportStatus: PassportStatus;
  verificationLevel: IdentityVerificationLevel;
  teacherId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  photographUrl: string;
  biometricData: TeacherBiometricData | null;
  contactInformation: TeacherContactInformation;
  professionalHistory: TeacherProfessionalRecord[];
  currentAffiliation: TeacherInstitutionAffiliation;
  qualifications: TeacherQualification[];
  certifications: TeacherCertification[];
  specializations: string[];
  teachingExperience: TeacherExperience[];
  researchOutput: TeacherResearchOutput[];
  passportIssuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  lastRenewalDate: string | null;
  issuingCountry: string;
  issuingInstitution: string;
  verificationCode: string;
  qrCode: string;
  blockchainId: string | null;
  digitalSignature: string;
  verificationUrl: string;
  sharingPreferences: TeacherPassportSharingPreferences;
  activityLog: TeacherActivityLog[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TeacherBiometricData {
  biometricType: BiometricType;
  templateHash: string;
  enrollmentDate: string;
  lastVerified: string;
  provider: string;
  isEnrolled: boolean;
}

export interface TeacherContactInformation {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  officeHours: string;
  officeLocation: string;
}

export interface TeacherProfessionalRecord {
  recordId: string;
  institutionName: string;
  institutionCountry: string;
  position: string;
  department: string;
  startDate: string;
  endDate: string | null;
  status: string;
  responsibilities: string[];
}

export interface TeacherInstitutionAffiliation {
  institutionId: string;
  institutionName: string;
  institutionCountry: string;
  employeeId: string;
  position: string;
  department: string;
  faculty: string;
  employmentStatus: string;
  tenureStatus: string;
  startDate: string;
}

export interface TeacherQualification {
  qualificationId: string;
  qualificationName: string;
  qualificationLevel: string;
  fieldOfStudy: string;
  institutionName: string;
  institutionCountry: string;
  yearObtained: string;
  grade: string;
  credits: number;
  verified: boolean;
  documentUrl: string | null;
}

export interface TeacherCertification {
  certificationId: string;
  certificationName: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string | null;
  certificationNumber: string;
  status: string;
  verified: boolean;
  documentUrl: string | null;
}

export interface TeacherExperience {
  experienceId: string;
  institutionName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  achievements: string[];
}

export interface TeacherResearchOutput {
  publicationId: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  doi: string;
  citations: number;
  impactFactor: number;
  isPeerReviewed: boolean;
}

export interface TeacherPassportSharingPreferences {
  defaultPrivacyLevel: PrivacyLevel;
  shareQualifications: boolean;
  shareCertifications: boolean;
  shareResearch: boolean;
  shareExperience: boolean;
  shareWithInstitutions: boolean;
  shareWithEmployers: boolean;
}

export interface TeacherActivityLog {
  logId: string;
  action: AuditAction;
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}
export interface ResearchPassport {
  id: string;
  passportNumber: string;
  passportStatus: PassportStatus;
  researcherId: string;
  firstName: string;
  lastName: string;
  nationality: string;
  institutionAffiliation: string;
  researchAreas: string[];
  orcidId: string | null;
  scopusId: string | null;
  googleScholarId: string | null;
  researchGateId: string | null;
  hIndex: number;
  citationCount: number;
  publicationCount: number;
  patents: number;
  grants: ResearchGrant[];
  collaborations: ResearchCollaboration[];
  peerReviewActivities: PeerReviewActivity[];
  academicDegrees: AcademicDegree[];
  memberships: ResearchMembership[];
  awards: ResearchAward[];
  verificationCode: string;
  qrCode: string;
  blockchainId: string | null;
  digitalSignature: string;
  issueDate: string;
  expiryDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ResearchGrant {
  grantId: string;
  grantTitle: string;
  fundingBody: string;
  amount: number;
  currencyCode: string;
  startDate: string;
  endDate: string;
  status: string;
  role: string;
}

export interface ResearchCollaboration {
  collaborationId: string;
  partnerName: string;
  partnerInstitution: string;
  partnerCountry: string;
  researchArea: string;
  startDate: string;
  endDate: string | null;
  status: string;
  outcomes: string[];
}

export interface PeerReviewActivity {
  reviewId: string;
  journalName: string;
  manuscriptId: string;
  reviewDate: string;
  decision: string;
}

export interface AcademicDegree {
  degreeId: string;
  degreeName: string;
  fieldOfStudy: string;
  institutionName: string;
  institutionCountry: string;
  yearObtained: string;
  grade: string;
  thesisTitle: string | null;
}

export interface ResearchMembership {
  membershipId: string;
  organizationName: string;
  membershipType: string;
  startDate: string;
  endDate: string | null;
  status: string;
}

export interface ResearchAward {
  awardId: string;
  awardName: string;
  awardingBody: string;
  dateReceived: string;
  category: string;
  description: string;
}
export interface InternationalAcademicIdentity {
  id: string;
  identityId: string;
  identityType: string;
  verificationLevel: IdentityVerificationLevel;
  holderName: string;
  holderId: string;
  nationality: string;
  issuingCountry: string;
  issuingInstitution: string;
  issuingAuthority: string;
  identityNumber: string;
  issueDate: string;
  expiryDate: string;
  status: IdentityLifecycle;
  biometricData: IdentityBiometricData | null;
  digitalSignature: string;
  publicKey: string;
  verificationUrl: string;
  qrCode: string;
  blockchainId: string | null;
  linkedIdentities: LinkedIdentity[];
  consentRecords: ConsentRecord[];
  attributeClaims: AttributeClaim[];
  trustAnchors: TrustAnchor[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityBiometricData {
  biometricType: BiometricType;
  templateHash: string;
  enrollmentDate: string;
  lastVerified: string;
  provider: string;
}

export interface LinkedIdentity {
  linkedId: string;
  identityType: string;
  issuerName: string;
  issuerCountry: string;
  externalId: string;
  linkDate: string;
  status: string;
}

export interface ConsentRecord {
  consentId: string;
  consentType: ConsentType;
  purpose: string;
  grantedTo: string;
  grantedDate: string;
  expiryDate: string | null;
  scope: string[];
  isActive: boolean;
  revokedDate: string | null;
}

export interface AttributeClaim {
  claimId: string;
  claimType: IdentityAttributeType;
  claimName: string;
  claimValue: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string | null;
  verified: boolean;
  proofType: string;
}

export interface TrustAnchor {
  anchorId: string;
  anchorName: string;
  anchorType: string;
  publicKey: string;
  trustLevel: TrustLevel;
  validFrom: string;
  validUntil: string;
  issuer: string;
}
export interface GlobalDigitalCredential {
  id: string;
  credentialId: string;
  credentialType: CredentialType;
  credentialCategory: CredentialCategory;
  credentialStatus: CredentialStatus;
  credentialFormat: CredentialFormat;
  holderId: string;
  holderName: string;
  holderType: RecipientType;
  issuerId: string;
  issuerName: string;
  issuerType: IssuerType;
  issuerCountry: string;
  issuerTrustLevel: TrustLevel;
  title: string;
  description: string;
  subject: string;
  fieldOfStudy: string;
  qualificationLevel: string;
  credits: number;
  grade: string;
  achievementLevel: AchievementLevel;
  issueDate: string;
  expiryDate: string | null;
  validFrom: string;
  validUntil: string | null;
  lastVerificationDate: string | null;
  digitalSignature: DigitalCredentialSignature;
  proofOfIssuance: ProofOfIssuance;
  metadata: CredentialMetadata;
  displayProperties: CredentialDisplayProperties;
  revocationInfo: RevocationInfo | null;
  sharingHistory: CredentialSharingHistory[];
  verificationHistory: CredentialVerificationHistory[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DigitalCredentialSignature {
  signatureType: DigitalSignatureType;
  signatureValue: string;
  signedDate: string;
  signerCertificate: string;
  signerPublicKey: string;
}

export interface ProofOfIssuance {
  proofType: string;
  proofValue: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
}

export interface CredentialMetadata {
  schemaVersion: string;
  issuanceVersion: string;
  credentialSchema: string;
  context: string[];
  refreshService: string | null;
  termsOfUse: string;
}

export interface CredentialDisplayProperties {
  backgroundColor: string;
  textColor: string;
  logoUrl: string;
  cardLayout: CredentialDisplay;
  customFields: DisplayCustomField[];
}

export interface DisplayCustomField {
  fieldName: string;
  fieldValue: string;
  fieldType: string;
}

export interface RevocationInfo {
  revoked: boolean;
  revokedDate: string | null;
  revokedReason: RevocationReason | null;
  revocationListIndex: number | null;
  revocationListUrl: string | null;
}

export interface CredentialSharingHistory {
  shareId: string;
  sharedWith: string;
  sharedWithEntity: string;
  sharedDate: string;
  scope: SharingScope;
  purpose: string;
  expiryDate: string | null;
  accessCount: number;
}

export interface CredentialVerificationHistory {
  verificationId: string;
  verifiedBy: string;
  verifiedEntity: string;
  verificationDate: string;
  verificationMethod: VerificationMethod;
  result: CredentialVerificationResult;
  details: string;
}
export interface GlobalCertificate {
  id: string;
  certificateId: string;
  certificateType: string;
  credentialType: CredentialType;
  credentialStatus: CredentialStatus;
  holderId: string;
  holderName: string;
  holderNationality: string;
  issuerId: string;
  issuerName: string;
  issuerType: IssuerType;
  issuerCountry: string;
  title: string;
  description: string;
  programName: string;
  programLevel: string;
  fieldOfStudy: string;
  specializations: string[];
  credits: number;
  grade: string;
  honors: string[];
  completionDate: string;
  issueDate: string;
  expiryDate: string | null;
  certificateNumber: string;
  serialNumber: string;
  digitalSignature: DigitalCredentialSignature;
  verificationCode: string;
  verificationUrl: string;
  qrCode: string;
  blockchainId: string | null;
  ipfsHash: string | null;
  documentHash: string;
  templateId: string;
  language: string;
  attachments: CertificateAttachment[];
  verificationHistory: CredentialVerificationHistory[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CertificateAttachment {
  attachmentId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileSize: number;
  uploadDate: string;
}

export interface BlockchainCredential {
  id: string;
  credentialId: string;
  blockchainType: BlockchainType;
  networkType: BlockchainNetworkType;
  contractAddress: string | null;
  tokenId: string | null;
  tokenStandard: string;
  chainId: number;
  transactionHash: string | null;
  blockNumber: number | null;
  walletAddress: string;
  credentialHash: string;
  metadataHash: string;
  smartContractVersion: string;
  gasUsed: number | null;
  gasPrice: number | null;
  status: CredentialStatus;
  issuerAddress: string;
  holderAddress: string;
  issuedDate: string;
  lastUpdated: string;
  verificationCount: number;
  revocationBlockNumber: number | null;
  ipfsMetadataUrl: string | null;
  interactions: BlockchainInteraction[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BlockchainInteraction {
  interactionId: string;
  action: SmartContractAction;
  fromAddress: string;
  toAddress: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  gasUsed: number;
  status: string;
}
export interface CrossBorderAuthentication {
  id: string;
  authenticationId: string;
  sourceCountry: string;
  sourceInstitution: string;
  sourceAuthority: string;
  destinationCountry: string;
  destinationInstitution: string;
  destinationAuthority: string;
  agreementType: CrossBorderAgreementType;
  credentialType: string;
  credentialId: string;
  holderName: string;
  holderNationality: string;
  authenticationDate: string;
  decision: RecognitionDecision;
  decisionAuthority: string;
  conditions: string[];
  validityPeriod: string;
  expiryDate: string | null;
  verificationResult: VerificationStatus;
  verificationDate: string;
  verificationMethod: string;
  equivalentLevel: string;
  equivalentCredits: number;
  notes: string;
  documents: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FederationIdentity {
  id: string;
  federationId: string;
  federationName: string;
  federationType: FederationType;
  identityProvider: IdentityProviderFederation;
  serviceProviders: ServiceProviderFederation[];
  trustFramework: FederationTrustFramework;
  authenticationProtocol: string;
  attributeTransfer: AttributeTransferProtocol;
  metadataUrl: string;
  certificateThumbprint: string;
  entityId: string;
  displayName: string;
  description: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  technicalContact: string;
  administrativeContact: string;
  supportedNameIdFormats: string[];
  supportedBindings: string[];
  encryptionAlgorithm: string;
  signingAlgorithm: string;
  singleSignOnUrl: string;
  singleLogoutUrl: string;
  assertionConsumerServiceUrl: string;
  attributes: FederationAttribute[];
  policies: FederationPolicy[];
  memberInstitutions: FederationMemberInstitution[];
  isActive: boolean;
  lastHealthCheck: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityProviderFederation {
  providerId: string;
  providerName: string;
  providerUrl: string;
  providerType: IdentityProviderType;
  certificateUrl: string;
  supportedAttributes: string[];
  entityCategory: string[];
  registrationAuthority: string;
}

export interface ServiceProviderFederation {
  providerId: string;
  providerName: string;
  providerUrl: string;
  requiredAttributes: string[];
  optionalAttributes: string[];
  assertionConsumerUrl: string;
  singleLogoutUrl: string;
}

export interface FederationTrustFramework {
  frameworkName: string;
  frameworkVersion: string;
  trustLevels: FederationTrustLevel[];
  requirements: string[];
  complianceChecks: string[];
}

export interface FederationTrustLevel {
  levelName: string;
  levelValue: number;
  requirements: string[];
  validFor: string[];
}

export interface AttributeTransferProtocol {
  protocol: string;
  encryptionEnabled: boolean;
  signingEnabled: boolean;
  compressionEnabled: boolean;
  attributes: string[];
  pseudonymizationEnabled: boolean;
}

export interface FederationAttribute {
  attributeName: string;
  attributeValue: string;
  attributeType: string;
  required: boolean;
  requestedBy: string[];
  consentRequired: boolean;
}

export interface FederationPolicy {
  policyId: string;
  policyName: string;
  policyType: string;
  description: string;
  rules: string[];
  enforcement: string;
  effectiveDate: string;
}

export interface FederationMemberInstitution {
  institutionId: string;
  institutionName: string;
  institutionCountry: string;
  role: string;
  joinDate: string;
  status: string;
  attributes: string[];
}
export interface AcademicWallet {
  id: string;
  walletId: string;
  walletType: WalletType;
  walletStatus: WalletStatus;
  securityLevel: WalletSecurityLevel;
  holderId: string;
  holderName: string;
  holderEmail: string;
  holderType: string;
  credentials: WalletCredential[];
  identityDocuments: WalletIdentityDocument[];
  biometricData: WalletBiometricData | null;
  encryptionKey: WalletEncryptionKey;
  backupInfo: WalletBackupInfo;
  linkedDevices: WalletLinkedDevice[];
  accessControls: WalletAccessControl[];
  sharingSettings: WalletSharingSettings;
  notificationSettings: WalletNotificationSettings;
  recoveryMethods: WalletRecoveryMethod[];
  activityLog: WalletActivityLog[];
  preferences: WalletPreferences;
  features: WalletFeature[];
  lastAccess: string;
  lastSync: string;
  deviceFingerprint: string;
  appVersion: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletCredential {
  walletCredentialId: string;
  credentialId: string;
  credentialType: CredentialType;
  credentialTitle: string;
  issuerName: string;
  issuerCountry: string;
  issueDate: string;
  expiryDate: string | null;
  status: CredentialStatus;
  displayProperties: CredentialDisplayProperties;
  isFavorite: boolean;
  isHidden: boolean;
  tags: string[];
  addedDate: string;
  lastUsed: string;
}

export interface WalletIdentityDocument {
  documentId: string;
  documentType: string;
  documentNumber: string;
  issuingCountry: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  holderName: string;
  photographUrl: string;
  documentHash: string;
  isPrimary: boolean;
}

export interface WalletBiometricData {
  enabled: boolean;
  enrolledTypes: BiometricType[];
  lastEnrolled: string;
  fallbackMethod: string;
}

export interface WalletEncryptionKey {
  keyId: string;
  keyType: KeyType;
  encryptionType: EncryptionType;
  publicKey: string;
  createdAt: string;
  lastRotated: string;
  rotationPeriod: number;
}

export interface WalletBackupInfo {
  backupEnabled: boolean;
  backupType: WalletBackupType;
  lastBackupDate: string;
  backupLocation: string;
  encryptedBackup: boolean;
  backupSize: number;
  backupVersion: string;
}

export interface WalletLinkedDevice {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  platform: string;
  lastAccess: string;
  linkedDate: string;
  isActive: boolean;
  trustLevel: string;
}

export interface WalletAccessControl {
  controlId: string;
  entityName: string;
  entityType: string;
  permissions: PermissionType[];
  grantedDate: string;
  expiryDate: string | null;
  isActive: boolean;
  conditions: string[];
}

export interface WalletSharingSettings {
  defaultScope: SharingScope;
  requireConsent: boolean;
  autoExpireDays: number;
  allowAnonymousVerification: boolean;
  allowedVerifiers: string[];
  blockedVerifiers: string[];
}

export interface WalletNotificationSettings {
  credentialExpiry: boolean;
  newCredential: boolean;
  verificationRequest: boolean;
  shareRequest: boolean;
  securityAlert: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
}

export interface WalletRecoveryMethod {
  methodId: string;
  methodType: IdentityRecoveryMethod;
  configured: boolean;
  configuredDate: string | null;
  lastUsed: string | null;
  isPrimary: boolean;
  backupCodes: string[];
}

export interface WalletActivityLog {
  logId: string;
  action: AuditAction;
  description: string;
  deviceId: string;
  ipAddress: string;
  timestamp: string;
  location: string;
}

export interface WalletPreferences {
  language: string;
  theme: string;
  currencyCode: string;
  timezone: string;
  biometricUnlock: boolean;
  autoLockTimeout: number;
  showPreview: boolean;
  compactMode: boolean;
}
export interface CredentialRevocationRecord {
  id: string;
  credentialId: string;
  revokedBy: string;
  revokedDate: string;
  reason: RevocationReason;
  details: string;
  revocationMechanism: RevocationMechanism;
  publishedTo: string[];
  effectiveDate: string;
  appealDeadline: string | null;
  appealStatus: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface VerificationRequest {
  id: string;
  requestNumber: string;
  credentialId: string;
  requesterId: string;
  requesterName: string;
  requesterOrganization: string;
  requesterType: string;
  verificationMethod: VerificationMethod;
  verificationScope: string[];
  consentGiven: boolean;
  consentDate: string;
  requestDate: string;
  expiryDate: string;
  status: VerificationStatus;
  result: CredentialVerificationResult | null;
  verifiedDate: string | null;
  verifierNotes: string;
  requestedAttributes: string[];
  returnedAttributes: string[];
  trustChainVerified: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CrossBorderRecognitionRequest {
  id: string;
  requestNumber: string;
  credentialId: string;
  holderName: string;
  holderNationality: string;
  sourceCountry: string;
  sourceInstitution: string;
  sourceCredentialType: string;
  destinationCountry: string;
  destinationInstitution: string;
  destinationProgram: string;
  requestDate: string;
  status: CrossBorderStatus;
  decision: RecognitionDecision | null;
  decisionDate: string | null;
  decisionAuthority: string;
  evaluatedBy: string;
  equivalentLevel: string | null;
  equivalentCredits: number | null;
  conditions: string[];
  requiredDocuments: string[];
  submittedDocuments: string[];
  evaluationNotes: string;
  appealDeadline: string | null;
  appealStatus: string | null;
  agreementReference: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AcademicTranscript {
  id: string;
  transcriptId: string;
  transcriptFormat: TranscriptFormat;
  holderId: string;
  holderName: string;
  issuingInstitution: string;
  issuingCountry: string;
  institutionCode: string;
  studentNumber: string;
  programName: string;
  degreeLevel: string;
  fieldOfStudy: string;
  enrollmentDate: string;
  graduationDate: string | null;
  status: string;
  totalCredits: number;
  gpa: number;
  gpaScale: string;
  honors: string[];
  academicStanding: string;
  courses: TranscriptCourse[];
  degreeRequirements: DegreeRequirement[];
  academicRemarks: string[];
  issueDate: string;
  verificationCode: string;
  verificationUrl: string;
  digitalSignature: DigitalCredentialSignature;
  blockchainId: string | null;
  language: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TranscriptCourse {
  courseId: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
  semester: string;
  academicYear: string;
  instructor: string;
  status: string;
  repeatStatus: string | null;
}

export interface DegreeRequirement {
  requirementId: string;
  requirementType: string;
  requirementName: string;
  creditsRequired: number;
  creditsCompleted: number;
  status: string;
  courses: string[];
}
export interface DigitalBadge {
  id: string;
  badgeId: string;
  badgeName: string;
  badgeType: string;
  issuerId: string;
  issuerName: string;
  issuerType: IssuerType;
  holderId: string;
  holderName: string;
  description: string;
  criteria: string[];
  imageUrl: string;
  imageHash: string;
  badgeClass: string;
  category: string;
  skills: string[];
  competencyLevel: string;
  issueDate: string;
  expiryDate: string | null;
  status: CredentialStatus;
  verificationCode: string;
  verificationUrl: string;
  evidenceUrl: string;
  digitalSignature: DigitalCredentialSignature;
  blockchainId: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MicroCredential {
  id: string;
  microCredentialId: string;
  credentialType: CredentialType;
  credentialStatus: CredentialStatus;
  holderId: string;
  holderName: string;
  issuerId: string;
  issuerName: string;
  issuerCountry: string;
  title: string;
  description: string;
  learningOutcomes: LearningOutcome[];
  assessmentType: AssessmentMethod;
  credits: number;
  creditSystem: string;
  equivalenceLevel: string;
  fieldOfStudy: string;
  skills: SkillAssertion[];
  competencies: CompetencyAssertion[];
  issueDate: string;
  expiryDate: string | null;
  verificationCode: string;
  verificationUrl: string;
  digitalSignature: DigitalCredentialSignature;
  blockchainId: string | null;
  pathways: CredentialPathway[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LearningOutcome {
  outcomeId: string;
  outcomeType: LearningOutcomeType;
  description: string;
  assessmentCriteria: string[];
  achieved: boolean;
  achievedDate: string | null;
}

export interface SkillAssertion {
  skillId: string;
  skillName: string;
  skillCategory: string;
  skillLevel: SkillLevel;
  verifiedBy: string;
  verificationDate: string;
  evidenceUrl: string | null;
}

export interface CompetencyAssertion {
  competencyId: string;
  competencyName: string;
  competencyFramework: string;
  level: string;
  status: CompetencyStatus;
  achievedDate: string | null;
  verifiedBy: string;
}

export interface CredentialPathway {
  pathwayId: string;
  pathwayName: string;
  pathwayType: string;
  description: string;
  creditsRequired: number;
  creditsCompleted: number;
  status: string;
  nextCredential: string | null;
}

export interface IdentityAuditTrail {
  id: string;
  auditId: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  performedBy: string;
  performedByName: string;
  performedByType: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  details: string;
  previousState: string | null;
  newState: string | null;
  hash: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityVerificationLog {
  id: string;
  logId: string;
  credentialId: string;
  verifierId: string;
  verifierName: string;
  verifierOrganization: string;
  verificationMethod: VerificationMethod;
  verificationDate: string;
  result: CredentialVerificationResult;
  trustChainResult: string;
  requestedAttributes: string[];
  disclosedAttributes: string[];
  consentRecord: string;
  ipAddress: string;
  location: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletSyncRecord {
  id: string;
  syncId: string;
  walletId: string;
  deviceId: string;
  syncType: string;
  syncDate: string;
  credentialsSynced: number;
  status: string;
  conflictResolution: string;
  dataHash: string;
  syncDuration: number;
  errorMessage: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface DigitalIdentityProvider {
  id: string;
  providerId: string;
  providerName: string;
  providerType: IdentityProviderType;
  providerUrl: string;
  country: string;
  registrationNumber: string;
  establishedDate: string;
  contactEmail: string;
  contactPhone: string;
  technicalContact: string;
  administrativeContact: string;
  supportedCredentialTypes: CredentialType[];
  supportedBlockchainTypes: BlockchainType[];
  trustLevel: TrustLevel;
  accreditationStatus: string;
  accreditationBody: string;
  accreditationDate: string;
  certificates: ProviderCertificate[];
  apiEndpoints: ProviderApiEndpoint[];
  metadataUrl: string;
  metadataVersion: string;
  uptime: number;
  lastHealthCheck: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProviderCertificate {
  certificateId: string;
  certificateType: string;
  issuer: string;
  validFrom: string;
  validUntil: string;
  thumbprint: string;
}

export interface ProviderApiEndpoint {
  endpointId: string;
  endpointName: string;
  endpointUrl: string;
  method: string;
  description: string;
  rateLimit: number;
  authenticationRequired: boolean;
}

export interface IdentityConsentManagement {
  id: string;
  consentId: string;
  holderId: string;
  holderName: string;
  consentType: ConsentType;
  purpose: string;
  grantedTo: string;
  grantedToName: string;
  grantedToOrganization: string;
  attributes: string[];
  grantedDate: string;
  expiryDate: string | null;
  isActive: boolean;
  revokedDate: string | null;
  revokedReason: string | null;
  lastUsed: string | null;
  usageCount: number;
  legalBasis: string;
  dataController: string;
  dataProcessor: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CredentialTemplate {
  id: string;
  templateId: string;
  templateName: string;
  templateType: CredentialTemplateType;
  credentialType: CredentialType;
  description: string;
  issuerId: string;
  issuerName: string;
  issuerCountry: string;
  issuerType: IssuerType;
  design: TemplateDesign;
  fields: TemplateField[];
  signatureConfig: TemplateSignatureConfig;
  verificationConfig: TemplateVerificationConfig;
  branding: TemplateBranding;
  version: string;
  isActive: boolean;
  usageCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TemplateDesign {
  layout: string;
  orientation: string;
  dimensions: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  backgroundImage: string | null;
  logoPosition: string;
}

export interface TemplateField {
  fieldName: string;
  fieldType: string;
  required: boolean;
  defaultValue: string | null;
  placeholder: string;
  validation: string | null;
  displayOrder: number;
}

export interface TemplateSignatureConfig {
  signatureType: DigitalSignatureType;
  required: boolean;
  position: string;
  issuerPublicKey: string;
}

export interface TemplateVerificationConfig {
  verificationUrl: string;
  qrCodeEnabled: boolean;
  blockchainEnabled: boolean;
  ipfsEnabled: boolean;
}

export interface TemplateBranding {
  logoUrl: string;
  sealUrl: string | null;
  watermarkUrl: string | null;
  issuerDisplayName: string;
  issuerWebsite: string;
}

export interface IdentityKeyPair {
  id: string;
  keyId: string;
  keyType: KeyType;
  purpose: string;
  publicKey: string;
  privateKeyEncrypted: string;
  generatedAt: string;
  expiresAt: string | null;
  lastRotated: string;
  isActive: boolean;
  algorithm: string;
  keySize: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CredentialBlockchainSync {
  id: string;
  syncId: string;
  credentialId: string;
  blockchainType: BlockchainType;
  networkType: BlockchainNetworkType;
  transactionHash: string;
  blockNumber: number;
  syncDate: string;
  syncStatus: string;
  syncType: string;
  gasUsed: number | null;
  gasPrice: number | null;
  contractAddress: string | null;
  tokenId: string | null;
  errorMessage: string | null;
  retryCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
