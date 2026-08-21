export enum IdentityType {
  NATIONAL_STUDENT = 'national_student',
  NATIONAL_TEACHER = 'national_teacher',
  NATIONAL_STAFF = 'national_staff',
  NATIONAL_PARENT = 'national_parent',
  NATIONAL_ADMIN = 'national_admin',
  NATIONAL_INSPECTOR = 'national_inspector',
  NATIONAL_DIRECTOR = 'national_director',
  GOVERNMENT_OFFICIAL = 'government_official',
  PARTNER = 'partner',
  ALUMNI = 'alumni',
  CUSTOM = 'custom'
}

export enum IDStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
  LOST = 'lost',
  STOLEN = 'stolen',
  REPLACED = 'replaced',
  UNDER_REVIEW = 'under_review',
  DRAFT = 'draft',
  ISSUED = 'issued',
  CANCELLED = 'cancelled'
}

export enum CredentialType {
  DIGITAL_ID_CARD = 'digital_id_card',
  DIGITAL_BADGE = 'digital_badge',
  DIGITAL_CERTIFICATE = 'digital_certificate',
  DIGITAL_Diploma = 'digital_diploma',
  DIGITAL_TRANSCRIPT = 'digital_transcript',
  DIGITAL_LICENSE = 'digital_license',
  DIGITAL_MEMBERSHIP = 'digital_membership',
  DIGITAL_PASS = 'digital_pass',
  DIGITAL_VOUCHER = 'digital_voucher',
  DIGITAL_TOKEN = 'digital_token',
  DIGITAL_QR = 'digital_qr',
  DIGITAL_BARCODE = 'digital_barcode',
  BLOCKCHAIN_CREDENTIAL = 'blockchain_credential',
  NFC_CREDENTIAL = 'nfc_credential',
  BIOMETRIC_CREDENTIAL = 'biometric_credential',
  CUSTOM = 'custom'
}

export enum CertificateType {
  BIRTH_CERTIFICATE = 'birth_certificate',
  ENROLLMENT_CERTIFICATE = 'enrollment_certificate',
  ATTENDANCE_CERTIFICATE = 'attendance_certificate',
  GRADE_CERTIFICATE = 'grade_certificate',
  TRANSCRIPT_CERTIFICATE = 'transcript_certificate',
  GRADUATION_CERTIFICATE = 'graduation_certificate',
  TRANSFER_CERTIFICATE = 'transfer_certificate',
  CONDUCT_CERTIFICATE = 'conduct_certificate',
  MEDICAL_CERTIFICATE = 'medical_certificate',
  FINANCE_CERTIFICATE = 'finance_certificate',
  EMPLOYMENT_CERTIFICATE = 'employment_certificate',
  TRAINING_CERTIFICATE = 'training_certificate',
  QUALIFICATION_CERTIFICATE = 'qualification_certificate',
  PROFESSIONAL_CERTIFICATE = 'professional_certificate',
  CUSTOM = 'custom'
}

export enum SignatureType {
  DIGITAL = 'digital',
  ELECTRONIC = 'electronic',
  ADVANCED = 'advanced',
  QUALIFIED = 'qualified',
  TIMESTAMPED = 'timestamped',
  HANDWRITTEN = 'handwritten',
  BIOMETRIC = 'biometric',
  CRYPTOGRAPHIC = 'cryptographic',
  BLOCKCHAIN = 'blockchain',
  OTP = 'otp',
  CUSTOM = 'custom'
}

export enum IntegrationType {
  MINISTRY_OF_EDUCATION = 'ministry_of_education',
  CIVIL_REGISTRY = 'civil_registry',
  NATIONAL_ID_AUTHORITY = 'national_id_authority',
  TAX_AUTHORITY = 'tax_authority',
  HEALTH_MINISTRY = 'health_ministry',
  INTERIOR_MINISTRY = 'interior_ministry',
  FOREIGN_AFFAIRS = 'foreign_affairs',
  IMMIGRATION = 'immigration',
  EMPLOYMENT_AGENCY = 'employment_agency',
  SOCIAL_SECURITY = 'social_security',
  CENTRAL_BANK = 'central_bank',
  UNIVERSITY_SYSTEM = 'university_system',
  CUSTOM = 'custom'
}

export enum QRType {
  STUDENT_ID = 'student_id',
  TEACHER_ID = 'teacher_id',
  STAFF_ID = 'staff_id',
  CERTIFICATE = 'certificate',
  ATTENDANCE = 'attendance',
  PAYMENT = 'payment',
  TRANSPORT = 'transport',
  EVENT = 'event',
  FACILITY_ACCESS = 'facility_access',
  EXAMINATION = 'examination',
  GRADUATION = 'graduation',
  CUSTOM = 'custom'
}

export enum CardType {
  STUDENT_ID_CARD = 'student_id_card',
  TEACHER_ID_CARD = 'teacher_id_card',
  STAFF_ID_CARD = 'staff_id_card',
  PARENT_ID_CARD = 'parent_id_card',
  ADMIN_ID_CARD = 'admin_id_card',
  INSPECTOR_ID_CARD = 'inspector_id_card',
  VISITOR_BADGE = 'visitor_badge',
  TRANSIT_PASS = 'transit_pass',
  LIBRARY_CARD = 'library_card',
  CANTEEN_CARD = 'canteen_card',
  ACCESS_CARD = 'access_card',
  COMBINED_CARD = 'combined_card',
  VIRTUAL_CARD = 'virtual_card',
  CUSTOM = 'custom'
}

export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  FACE = 'face',
  IRIS = 'iris',
  VOICE = 'voice',
  PALM = 'palm',
  RETINA = 'retina',
  BEHAVIOURAL = 'behavioural',
  DNA = 'dna',
  VEIN = 'vein',
  CUSTOM = 'custom'
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  SUSPENDED = 'suspended',
  UNDER_REVIEW = 'under_review',
  REJECTED = 'rejected',
  APPROVED = 'approved'
}

export enum IdentityVerificationMethod {
  MANUAL = 'manual',
  BIOMETRIC = 'biometric',
  DOCUMENT = 'document',
  VIDEO = 'video',
  IN_PERSON = 'in_person',
  REMOTE = 'remote',
  INTEGRATION = 'integration',
  QR_SCAN = 'qr_scan',
  NFC_SCAN = 'nfc_scan',
  BLOCKCHAIN = 'blockchain'
}

export enum DocumentFormat {
  PDF = 'pdf',
  JPEG = 'jpeg',
  PNG = 'png',
  SVG = 'svg',
  HTML = 'html',
  XML = 'xml',
  JSON = 'json',
  BARCODE = 'barcode',
  QR_CODE = 'qr_code',
  CUSTOM = 'custom'
}

export enum CardMaterial {
  PVC = 'pvc',
  POLYCARBONATE = 'polycarbonate',
  PAPER = 'paper',
  COMPOSITE = 'composite',
  METAL = 'metal',
  WOOD = 'wood',
  BIODEGRADABLE = 'biodegradable',
  CUSTOM = 'custom'
}

export enum CardEncoding {
  MAGNETIC_STRIPE = 'magnetic_stripe',
  BARCODE = 'barcode',
  QR_CODE = 'qr_code',
  NFC = 'nfc',
  RFID = 'rfid',
  CHIP = 'chip',
  NONE = 'none',
  CUSTOM = 'custom'
}

export enum SignatureAlgorithm {
  RSA_SHA256 = 'rsa_sha256',
  RSA_SHA384 = 'rsa_sha384',
  RSA_SHA512 = 'rsa_sha512',
  ECDSA_SHA256 = 'ecdsa_sha256',
  ECDSA_SHA384 = 'ecdsa_sha384',
  ECDSA_SHA512 = 'ecdsa_sha512',
  HMAC_SHA256 = 'hmac_sha256',
  HMAC_SHA384 = 'hmac_sha384',
  HMAC_SHA512 = 'hmac_sha512',
  ED25519 = 'ed25519',
  CUSTOM = 'custom'
}

export enum IdentityEncryption {
  AES_128 = 'aes_128',
  AES_256 = 'aes_256',
  RSA_2048 = 'rsa_2048',
  RSA_4096 = 'rsa_4096',
  ECC_P256 = 'ecc_p256',
  ECC_P384 = 'ecc_p384',
  CHACHA20 = 'chacha20',
  CUSTOM = 'custom'
}

export enum BiometricQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  UNACCEPTABLE = 'unacceptable'
}

export enum IdentityEvent {
  CREATED = 'created',
  ISSUED = 'issued',
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  REPLACED = 'replaced',
  RENEWED = 'renewed',
  LOST_REPORTED = 'lost_reported',
  STOLEN_REPORTED = 'stolen_reported',
  FOUND = 'found',
  EXPIRED = 'expired',
  VERIFIED = 'verified',
  UPDATED = 'updated',
  DUPLICATE_DETECTED = 'duplicate_detected',
  CUSTOM = 'custom'
}

export enum IdentityShareLevel {
  PUBLIC = 'public',
  ORGANISATION = 'organisation',
  DEPARTMENT = 'department',
  ROLE_BASED = 'role_based',
  PRIVATE = 'private',
  CONFIDENTIAL = 'confidential',
  RESTRICTED = 'restricted'
}

export enum ValidationRuleType {
  FORMAT = 'format',
  LENGTH = 'length',
  PATTERN = 'pattern',
  RANGE = 'range',
  UNIQUE = 'unique',
  EXISTENCE = 'existence',
  CROSS_FIELD = 'cross_field',
  CUSTOM = 'custom'
}

export interface NationalStudentID {
  id: string;
  studentId: string;
  nationalIdNumber: string;
  schoolId: string;
  schoolName: string;
  regionId: string;
  regionName: string;
  departmentId: string;
  departmentName: string;
  inspectionId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  nationality: string;
  photoUrl: string;
  enrollmentDate: string;
  graduationDate: string | null;
  level: string;
  section: string;
  series: string;
  class: string;
  status: IDStatus;
  verificationStatus: VerificationStatus;
  issuedDate: string;
  expiryDate: string;
  lastVerified: string;
  qrCode: string;
  biometricHash: string;
  digitalSignature: string;
  blockchainHash: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface NationalTeacherID {
  id: string;
  teacherId: string;
  nationalIdNumber: string;
  schoolId: string;
  schoolName: string;
  regionId: string;
  regionName: string;
  departmentId: string;
  departmentName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  nationality: string;
  photoUrl: string;
  hireDate: string;
  speciality: string;
  grade: string;
  qualification: string;
  yearsOfExperience: number;
  licenseNumber: string;
  licenseExpiry: string;
  status: IDStatus;
  verificationStatus: VerificationStatus;
  issuedDate: string;
  expiryDate: string;
  lastVerified: string;
  qrCode: string;
  biometricHash: string;
  digitalSignature: string;
  blockchainHash: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface NationalStaffID {
  id: string;
  staffId: string;
  nationalIdNumber: string;
  schoolId: string;
  schoolName: string;
  regionId: string;
  regionName: string;
  departmentId: string;
  departmentName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  nationality: string;
  photoUrl: string;
  hireDate: string;
  position: string;
  department: string;
  employmentType: string;
  contractType: string;
  status: IDStatus;
  verificationStatus: VerificationStatus;
  issuedDate: string;
  expiryDate: string;
  lastVerified: string;
  qrCode: string;
  biometricHash: string;
  digitalSignature: string;
  blockchainHash: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DigitalCredential {
  id: string;
  holderId: string;
  holderType: IdentityType;
  credentialType: CredentialType;
  title: string;
  description: string;
  issuerId: string;
  issuerName: string;
  issuerType: string;
  credentialNumber: string;
  issuanceDate: string;
  expiryDate: string | null;
  status: IDStatus;
  verificationStatus: VerificationStatus;
  verificationMethod: IdentityVerificationMethod;
  claims: CredentialClaim[];
  evidence: CredentialEvidence[];
  proof: CredentialProof;
  format: DocumentFormat;
  publicKey: string;
  privateKey: string;
  revokedAt: string | null;
  revokedBy: string | null;
  revocationReason: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialClaim {
  type: string;
  value: unknown;
  label: string;
  verified: boolean;
  verificationDate: string | null;
}

export interface CredentialEvidence {
  type: string;
  url: string;
  hash: string;
  mimeType: string;
  uploadedAt: string;
}

export interface CredentialProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
  challenge: string | null;
  domain: string | null;
}

export interface DigitalCertificate {
  id: string;
  certificateNumber: string;
  certificateType: CertificateType;
  holderId: string;
  holderType: IdentityType;
  holderName: string;
  schoolId: string;
  schoolName: string;
  regionId: string;
  regionName: string;
  title: string;
  description: string;
  issuedBy: string;
  issuedByName: string;
  issuedByTitle: string;
  issuedDate: string;
  expiryDate: string | null;
  validFrom: string;
  validUntil: string | null;
  status: IDStatus;
  verificationStatus: VerificationStatus;
  grade: string | null;
  average: number | null;
  mention: string | null;
  academicYear: string;
  programme: string | null;
  specialization: string | null;
  digitalSignature: string;
  signatureAlgorithm: SignatureAlgorithm;
  qrCode: string;
  verificationUrl: string;
  verificationCode: string;
  blockchainHash: string | null;
  format: DocumentFormat;
  fileUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DigitalSignature {
  id: string;
  signerId: string;
  signerName: string;
  signerTitle: string;
  signerRole: string;
  signatureType: SignatureType;
  algorithm: SignatureAlgorithm;
  signatureValue: string;
  certificateId: string;
  certificateNumber: string;
  documentId: string;
  documentType: string;
  documentHash: string;
  timestamp: string;
  timestampAuthority: string | null;
  ipAddress: string;
  userAgent: string;
  location: string | null;
  reason: string | null;
  contactInfo: string | null;
  revocationStatus: string;
  verificationStatus: VerificationStatus;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GovernmentIntegration {
  id: string;
  integrationType: IntegrationType;
  name: string;
  description: string;
  apiEndpoint: string;
  apiKey: string;
  clientId: string;
  clientSecret: string;
  authType: string;
  encryptionType: IdentityEncryption;
  timeout: number;
  retryAttempts: number;
  rateLimitPerMinute: number;
  isActive: boolean;
  status: string;
  lastSync: string;
  syncFrequency: string;
  syncDirection: string;
  dataMapping: Record<string, string>;
  errorHandling: string;
  alertEmails: string[];
  webhookUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface NationalQRCode {
  id: string;
  qrType: QRType;
  entityType: IdentityType;
  entityId: string;
  entityName: string;
  schoolId: string;
  qrData: string;
  qrUrl: string;
  signatureAlgorithm: SignatureAlgorithm;
  digitalSignature: string;
  version: string;
  expiryDate: string | null;
  isActive: boolean;
  isRevoked: boolean;
  revokedAt: string | null;
  revokedBy: string | null;
  scanCount: number;
  lastScannedAt: string | null;
  lastScannedBy: string | null;
  lastScanLocation: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SmartCard {
  id: string;
  cardNumber: string;
  cardType: CardType;
  holderId: string;
  holderType: IdentityType;
  holderName: string;
  schoolId: string;
  schoolName: string;
  cardMaterial: CardMaterial;
  cardEncoding: CardEncoding;
  chipId: string | null;
  nfcId: string | null;
  magneticStripeData: string | null;
  barcode: string;
  qrCode: string;
  photoUrl: string;
  issuedDate: string;
  expiryDate: string;
  status: IDStatus;
  isActive: boolean;
  isBlocked: boolean;
  blockedAt: string | null;
  blockedReason: string | null;
  accessLevels: string[];
  privileges: string[];
  balance: number | null;
  transactionCount: number;
  lastUsedAt: string | null;
  lastUsedLocation: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface BiometricData {
  id: string;
  holderId: string;
  holderType: IdentityType;
  biometricType: BiometricType;
  template: string;
  quality: BiometricQuality;
  format: string;
  captureDate: string;
  captureDevice: string;
  captureLocation: string | null;
  captureOperator: string | null;
  encryptedTemplate: string;
  encryptionKey: string;
  hashAlgorithm: string;
  templateHash: string;
  version: string;
  isActive: boolean;
  enrolledBy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityVerification {
  id: string;
  identityId: string;
  identityType: IdentityType;
  verifierId: string;
  verifierName: string;
  verifierRole: string;
  verificationMethod: IdentityVerificationMethod;
  verificationType: string;
  status: VerificationStatus;
  result: string;
  confidence: number;
  matchedFields: string[];
  mismatchedFields: string[];
  biometricMatch: boolean | null;
  documentValid: boolean | null;
  signatureValid: boolean | null;
  qrCodeValid: boolean | null;
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
  location: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityConfig {
  id: string;
  schoolId: string;
  nationalIdEnabled: boolean;
  teacherIdEnabled: boolean;
  staffIdEnabled: boolean;
  studentIdEnabled: boolean;
  digitalCredentialsEnabled: boolean;
  digitalCertificatesEnabled: boolean;
  digitalSignaturesEnabled: boolean;
  smartCardsEnabled: boolean;
  biometricsEnabled: boolean;
  qrCodesEnabled: boolean;
  blockchainEnabled: boolean;
  governmentIntegrationEnabled: boolean;
  autoRenewal: boolean;
  renewalPeriodDays: number;
  expiryWarningDays: number;
  maxActiveCards: number;
  cardMaterial: CardMaterial;
  cardEncoding: CardEncoding;
  signatureAlgorithm: SignatureAlgorithm;
  encryptionType: IdentityEncryption;
  biometricTypes: BiometricType[];
  verificationMethods: IdentityVerificationMethod[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityMetrics {
  totalStudentIDs: number;
  totalTeacherIDs: number;
  totalStaffIDs: number;
  activeCards: number;
  inactiveCards: number;
  suspendedCards: number;
  revokedCards: number;
  totalCredentials: number;
  activeCredentials: number;
  totalCertificates: number;
  issuedCertificates: number;
  totalSignatures: number;
  totalVerifications: number;
  successfulVerifications: number;
  failedVerifications: number;
  averageVerificationTime: number;
  qrCodeScans: number;
  biometricEnrollments: number;
  smartCardTransactions: number;
  governmentSyncCount: number;
  lastSyncDate: string;
  metadata: Record<string, unknown>;
}

export interface IdentityAuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: IdentityEvent;
  entityType: string;
  entityId: string;
  entityName: string;
  previousValues: Record<string, unknown>;
  newValues: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  location: string | null;
  deviceInfo: string;
  sessionId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface IdentityValidationRule {
  id: string;
  name: string;
  description: string;
  ruleType: ValidationRuleType;
  entityType: IdentityType;
  field: string;
  pattern: string | null;
  minLength: number | null;
  maxLength: number | null;
  minValue: number | null;
  maxValue: number | null;
  allowedValues: unknown[] | null;
  isRequired: boolean;
  errorMessage: string;
  isActive: boolean;
  priority: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityTemplate {
  id: string;
  name: string;
  description: string;
  templateType: string;
  entityType: IdentityType;
  credentialType: CredentialType;
  frontLayout: Record<string, unknown>;
  backLayout: Record<string, unknown>;
  fields: TemplateField[];
  colors: Record<string, string>;
  fonts: Record<string, string>;
  logoUrl: string | null;
  backgroundUrl: string | null;
  watermarkUrl: string | null;
  isActive: boolean;
  version: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateField {
  name: string;
  label: string;
  type: string;
  position: WidgetPosition;
  size: WidgetSize;
  style: Record<string, unknown>;
  isRequired: boolean;
  defaultValue: string | null;
  dataSource: string | null;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface IdentityBatch {
  id: string;
  name: string;
  description: string;
  entityType: IdentityType;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: string;
  startedAt: string;
  completedAt: string | null;
  errors: IdentityBatchError[];
  metadata: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityBatchError {
  recordId: string;
  recordNumber: number;
  field: string;
  message: string;
  value: unknown;
}

export interface IdentityReport {
  id: string;
  name: string;
  description: string;
  reportType: string;
  entityType: IdentityType;
  period: string;
  startDate: string;
  endDate: string;
  generatedBy: string;
  format: string;
  fileUrl: string | null;
  fileSize: number;
  sections: ReportSection[];
  parameters: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ReportSection {
  title: string;
  content: string;
  data: Record<string, unknown>[];
  insights: string[];
}

export interface IdentityShare {
  id: string;
  identityId: string;
  identityType: IdentityType;
  sharedBy: string;
  sharedWith: string;
  sharedWithType: string;
  shareLevel: IdentityShareLevel;
  permissions: string[];
  expiresAt: string | null;
  accessCount: number;
  maxAccessCount: number | null;
  lastAccessedAt: string | null;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityNotification {
  id: string;
  userId: string;
  identityId: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  isRead: boolean;
  actionUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface IdentityRevocation {
  id: string;
  identityId: string;
  identityType: IdentityType;
  revokedBy: string;
  revokedByName: string;
  reason: string;
  description: string;
  revokedAt: string;
  effectiveDate: string;
  crlEntry: string | null;
  ocspStatus: string | null;
  notificationsSent: boolean;
  notificationsSentAt: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityRecovery {
  id: string;
  identityId: string;
  identityType: IdentityType;
  reporterId: string;
  reporterName: string;
  reporterContact: string;
  recoveryType: string;
  description: string;
  reportedAt: string;
  policeReportNumber: string | null;
  policeReportUrl: string | null;
  status: string;
  resolvedAt: string | null;
  resolvedBy: string | null;
  replacementId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityStatistics {
  schoolId: string;
  totalIdentities: number;
  byType: Record<IdentityType, number>;
  byStatus: Record<IDStatus, number>;
  activeCredentials: number;
  pendingCredentials: number;
  expiredCredentials: number;
  revokedCredentials: number;
  totalCertificates: number;
  issuedCertificates: number;
  totalCards: number;
  activeCards: number;
  totalVerifications: number;
  successfulVerifications: number;
  failedVerifications: number;
  averageVerificationTime: number;
  biometricEnrollments: number;
  qrCodeScans: number;
  smartCardTransactions: number;
  monthlyIssuance: MonthlyIssuance[];
  metadata: Record<string, unknown>;
}

export interface MonthlyIssuance {
  month: string;
  studentIDs: number;
  teacherIDs: number;
  staffIDs: number;
  credentials: number;
  certificates: number;
}

export interface IdentitySearch {
  query: string;
  entityType: IdentityType | null;
  status: IDStatus | null;
  verificationStatus: VerificationStatus | null;
  schoolId: string | null;
  regionId: string | null;
  departmentId: string | null;
  issuedFrom: string | null;
  issuedTo: string | null;
  expiryFrom: string | null;
  expiryTo: string | null;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface IdentitySearchResult {
  data: NationalStudentID[] | NationalTeacherID[] | NationalStaffID[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IdentityExport {
  id: string;
  entityType: IdentityType;
  format: string;
  filters: Record<string, unknown>;
  status: string;
  fileUrl: string | null;
  fileSize: number;
  rowCount: number;
  startedAt: string;
  completedAt: string | null;
  createdBy: string;
  metadata: Record<string, unknown>;
}

export interface IdentityImport {
  id: string;
  entityType: IdentityType;
  fileName: string;
  totalRows: number;
  processedRows: number;
  successfulRows: number;
  failedRows: number;
  status: string;
  errors: IdentityBatchError[];
  mapping: Record<string, string>;
  startedAt: string;
  completedAt: string | null;
  createdBy: string;
  metadata: Record<string, unknown>;
}

export interface IdentityAPIKey {
  id: string;
  name: string;
  description: string;
  key: string;
  secret: string;
  entityType: IdentityType;
  permissions: string[];
  rateLimit: number;
  expiresAt: string | null;
  lastUsedAt: string | null;
  isActive: boolean;
  createdBy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityWebhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: IdentityEvent[];
  entityType: IdentityType;
  isActive: boolean;
  lastTriggeredAt: string | null;
  failureCount: number;
  retryPolicy: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityEncryptionKey {
  id: string;
  name: string;
  algorithm: IdentityEncryption;
  keySize: number;
  publicKey: string;
  encryptedPrivateKey: string;
  keyVersion: number;
  isActive: boolean;
  expiresAt: string | null;
  rotatedAt: string | null;
  nextRotationAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityCertificateAuthority {
  id: string;
  name: string;
  description: string;
  rootCertUrl: string;
  intermediateCertUrl: string | null;
  algorithm: SignatureAlgorithm;
  keySize: number;
  validFrom: string;
  validUntil: string;
  issuer: string;
  subject: string;
  serialNumber: string;
  fingerprint: string;
  crlUrl: string;
  ocspUrl: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityDevice {
  id: string;
  name: string;
  type: string;
  schoolId: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  lastSync: string;
  status: string;
  capabilities: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityAccessLog {
  id: string;
  identityId: string;
  identityType: IdentityType;
  holderId: string;
  holderName: string;
  accessType: string;
  location: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  wasSuccessful: boolean;
  failureReason: string | null;
  metadata: Record<string, unknown>;
}
