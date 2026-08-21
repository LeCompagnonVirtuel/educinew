export enum CredentialType {
  DIPLOMA = "DIPLOMA",
  DEGREE = "DEGREE",
  CERTIFICATE = "CERTIFICATE",
  TRANSCRIPT = "TRANSCRIPT",
  BADGE = "BADGE",
  MICRO_CREDENTIAL = "MICRO_CREDENTIAL",
  ATTESTATION = "ATTESTATION",
  PROFESSIONAL_LICENSE = "PROFESSIONAL_LICENSE",
  INTERNATIONAL_CERTIFICATION = "INTERNATIONAL_CERTIFICATION",
  SKILL_CERTIFICATE = "SKILL_CERTIFICATE",
  COMPLETION_CERTIFICATE = "COMPLETION_CERTIFICATE",
  HONOR_AWARD = "HONOR_AWARD",
  CONTINUING_EDUCATION = "CONTINUING_EDUCATION",
  APPRENTICESHIP = "APPRENTICESHIP",
  TRAINING_CERTIFICATE = "TRAINING_CERTIFICATE",
}

export enum CredentialStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  FRAUDULENT = "FRAUDULENT",
  RENEWED = "RENEWED",
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT",
}

export enum CredentialFormat {
  W3C_VC = "W3C_VC",
  OPEN_BADGES = "OPEN_BADGES",
  JWT = "JWT",
  JSON_LD = "JSON_LD",
  CBOR = "CBOR",
  XML = "XML",
  PDF = "PDF",
  CHAPI = "CHAPI",
  DIDCOMM = "DIDCOMM",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum IssuanceMethod {
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  BATCH = "BATCH",
  API = "API",
  WEBHOOK = "WEBHOOK",
  QR_SCAN = "QR_SCAN",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENT = "GOVERNMENT",
  BLOCKCHAIN = "BLOCKCHAIN",
  EDGE_FUNCTION = "EDGE_FUNCTION",
}

export enum VerificationMethod {
  QR_CODE = "QR_CODE",
  PUBLIC_URL = "PUBLIC_URL",
  API = "API",
  BLOCKCHAIN = "BLOCKCHAIN",
  DID_RESOLVE = "DID_RESOLVE",
  DIRECT = "DIRECT",
  WEBHOOK = "WEBHOOK",
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum RevocationReason {
  GRADUATED = "GRADUATED",
  TRANSFERRED = "TRANSFERRED",
  WITHDRAWN = "WITHDRAWN",
  EXPIRED = "EXPIRED",
  FRAUD = "FRAUD",
  POLICY_VIOLATION = "POLICY_VIOLATION",
  USER_REQUEST = "USER_REQUEST",
  INSTITUTIONAL_REQUEST = "INSTITUTIONAL_REQUEST",
  SECURITY_BREACH = "SECURITY_BREACH",
  DUPLICATE = "DUPLICATE",
  AMENDED = "AMENDED",
  SUPERSEDED = "SUPERSEDED",
}

export enum SharingScope {
  PRIVATE = "PRIVATE",
  INSTITUTIONAL = "INSTITUTIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  PUBLIC = "PUBLIC",
  SPECIFIC_INSTITUTIONS = "SPECIFIC_INSTITUTIONS",
  SPECIFIC_EMPLOYERS = "SPECIFIC_EMPLOYERS",
  VERIFIERS_ONLY = "VERIFIERS_ONLY",
}

export enum ExportFormat {
  PDF = "PDF",
  JSON = "JSON",
  JSON_LD = "JSON_LD",
  XML = "XML",
  CSV = "CSV",
  JWT = "JWT",
  DID_DOCUMENT = "DID_DOCUMENT",
  OPEN_BADGES = "OPEN_BADGES",
}

export enum WalletType {
  MOBILE = "MOBILE",
  WEB = "WEB",
  DESKTOP = "DESKTOP",
  HARDWARE = "HARDWARE",
  CLOUD = "CLOUD",
  INSTITUTIONAL = "INSTITUTIONAL",
  NATIVE = "NATIVE",
  HYBRID = "HYBRID",
}

export enum BlockchainNetwork {
  ETHEREUM = "ETHEREUM",
  POLYGON = "POLYGON",
  SOLANA = "SOLANA",
  HYPERLEDGER = "HYPERLEDGER",
  CORDA = "CORDA",
  AVALANCHE = "AVALANCHE",
  BNB_CHAIN = "BNB_CHAIN",
  ARBITRUM = "ARBITRUM",
  OPTIMISM = "OPTIMISM",
  CUSTOM = "CUSTOM",
}

export enum BadgeStandard {
  OPEN_BADGES_2 = "OPEN_BADGES_2",
  OPEN_BADGES_3 = "OPEN_BADGES_3",
  W3C_VC = "W3C_VC",
  MS_VERIFIABLE = "MS_VERIFIABLE",
  CUSTOM = "CUSTOM",
}

export enum CredentialCategory {
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
  VOCATIONAL = "VOCATIONAL",
  SKILL = "SKILL",
  COMPLETION = "COMPLETION",
  HONOR = "HONOR",
  LICENSE = "LICENSE",
  MICRO = "MICRO",
}

export enum CredentialLevel {
  FUNDAMENTAL = "FUNDAMENTAL",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTERY = "MASTERY",
}

export enum IssuerType {
  UNIVERSITY = "UNIVERSITY",
  COLLEGE = "COLLEGE",
  SCHOOL = "SCHOOL",
  GOVERNMENT = "GOVERNMENT",
  CORPORATION = "CORPORATION",
  NGO = "NGO",
  ONLINE_PLATFORM = "ONLINE_PLATFORM",
  PROFESSIONAL_BODY = "PROFESSIONAL_BODY",
  ACCREDITATION_BODY = "ACCREDITATION_BODY",
}

export enum VerificationResult {
  VALID = "VALID",
  INVALID = "INVALID",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  UNTRUSTED_ISSUER = "UNTRUSTED_ISSUER",
  TAMPERED = "TAMPERED",
  UNKNOWN = "UNKNOWN",
  PENDING = "PENDING",
}

export enum ExpiryAction {
  NOTIFY = "NOTIFY",
  AUTO_RENEW = "AUTO_RENEW",
  SUSPEND = "SUSPEND",
  REVOKE = "REVOKE",
  ARCHIVE = "ARCHIVE",
  NONE = "NONE",
}

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
  LOST = "LOST",
  STOLEN = "STOLEN",
  RECOVERED = "RECOVERED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
}

export enum WalletFeature {
  CREDENTIAL_STORAGE = "CREDENTIAL_STORAGE",
  CREDENTIAL_SHARING = "CREDENTIAL_SHARING",
  QR_GENERATION = "QR_GENERATION",
  PUSH_NOTIFICATIONS = "PUSH_NOTIFICATIONS",
  BIOMETRIC_AUTH = "BIOMETRIC_AUTH",
  OFFLINE_ACCESS = "OFFLINE_ACCESS",
  MULTI_DEVICE = "MULTI_DEVICE",
  SELECTIVE_DISCLOSURE = "SELECTIVE_DISCLOSURE",
  PRESENTATION_REQUESTS = "PRESENTATION_REQUESTS",
  CREDENTIAL_DISCOVERY = "CREDENTIAL_DISCOVERY",
}

export enum BlockchainTransactionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
  REVERTED = "REVERTED",
}

export enum SmartContractAction {
  ISSUE = "ISSUE",
  VERIFY = "VERIFY",
  REVOKE = "REVOKE",
  RENEW = "RENEW",
  TRANSFER = "TRANSFER",
  UPDATE = "UPDATE",
}

export enum CredentialClaimType {
  PERSONAL_IDENTIFIER = "PERSONAL_IDENTIFIER",
  ACADEMIC_RECORD = "ACADEMIC_RECORD",
  SKILL_ASSERTION = "SKILL_ASSERTION",
  COMPETENCY_ASSERTION = "COMPETENCY_ASSERTION",
  PROFESSIONAL_ASSERTION = "PROFESSIONAL_ASSERTION",
  EDUCATION_COMPLETION = "EDUCATION_COMPLETION",
  TRAINING_COMPLETION = "TRAINING_COMPLETION",
}

export enum DigitalSignatureType {
  RSA = "RSA",
  ECDSA = "ECDSA",
  EDDSA = "EDDSA",
  BLS = "BLS",
  SCHNORR = "SCHNORR",
}

export enum KeyType {
  RSA = "RSA",
  EC = "EC",
  ED25519 = "ED25519",
  BLS = "BLS",
  SECP256K1 = "SECP256K1",
}

export enum RevocationMechanism {
  CRL = "CRL",
  OCSP = "OCSP",
  SMART_CONTRACT = "SMART_CONTRACT",
  REVOKE_LIST = "REVOKE_LIST",
  DID_DOCUMENT = "DID_DOCUMENT",
}

export enum CredentialTemplateType {
  STANDARD = "STANDARD",
  CUSTOM = "CUSTOM",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENT = "GOVERNMENT",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum SharingProtocol {
  DIDCOMM = "DIDCOMM",
  CHAPI = "CHAPI",
  OIDC = "OIDC",
  QR = "QR",
  EMAIL = "EMAIL",
  API = "API",
  WEBHOOK = "WEBHOOK",
  DEEP_LINK = "DEEP_LINK",
}

export enum PresentationType {
  VERIFIABLE_PRESENTATION = "VERIFIABLE_PRESENTATION",
  SELECTIVE_DISCLOSURE = "SELECTIVE_DISCLOSURE",
  ANONYMOUS = "ANONYMOUS",
  PREDICATE = "PREDICATE",
  RANGE = "RANGE",
}

export enum ImportSource {
  FILE_UPLOAD = "FILE_UPLOAD",
  API = "API",
  QR_SCAN = "QR_SCAN",
  EMAIL = "EMAIL",
  WALLET = "WALLET",
  BLOCKCHAIN = "BLOCKCHAIN",
  WEBHOOK = "WEBHOOK",
}

export enum CredentialEvent {
  ISSUED = "ISSUED",
  VERIFIED = "VERIFIED",
  SHARED = "SHARED",
  DOWNLOADED = "DOWNLOADED",
  REVOKED = "REVOKED",
  RENEWED = "RENEWED",
  EXPIRED = "EXPIRED",
  UPDATED = "UPDATED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export enum ComplianceStandard {
  W3C_VC = "W3C_VC",
  OPEN_BADGES = "OPEN_BADGES",
  EU_EBSI = "EU_EBSI",
  US_DEPT_OF_ED = "US_DEPT_OF_ED",
  UNESCO = "UNESCO",
  ISO_17024 = "ISO_17024",
  ISO_21001 = "ISO_21001",
}

export enum CredentialBatchStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  PARTIAL = "PARTIAL",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum AuditAction {
  CREDENTIAL_ISSUED = "CREDENTIAL_ISSUED",
  CREDENTIAL_VERIFIED = "CREDENTIAL_VERIFIED",
  CREDENTIAL_REVOKED = "CREDENTIAL_REVOKED",
  CREDENTIAL_RENEWED = "CREDENTIAL_RENEWED",
  CREDENTIAL_SHARED = "CREDENTIAL_SHARED",
  CREDENTIAL_DOWNLOADED = "CREDENTIAL_DOWNLOADED",
  CREDENTIAL_IMPORTED = "CREDENTIAL_IMPORTED",
  CREDENTIAL_EXPORTED = "CREDENTIAL_EXPORTED",
  WALLET_CREATED = "WALLET_CREATED",
  WALLET_BACKED_UP = "WALLET_BACKED_UP",
  WALLET_RESTORED = "WALLET_RESTORED",
  WALLET_LOCKED = "WALLET_LOCKED",
  WALLET_UNLOCKED = "WALLET_UNLOCKED",
}

export enum NotificationType {
  CREDENTIAL_ISSUED = "CREDENTIAL_ISSUED",
  CREDENTIAL_REVOKED = "CREDENTIAL_REVOKED",
  CREDENTIAL_EXPIRING = "CREDENTIAL_EXPIRING",
  CREDENTIAL_EXPIRED = "CREDENTIAL_EXPIRED",
  VERIFICATION_COMPLETE = "VERIFICATION_COMPLETE",
  SHARE_REQUEST = "SHARE_REQUEST",
  WALLET_ALERT = "WALLET_ALERT",
  SECURITY_ALERT = "SECURITY_ALERT",
}

export enum BlockchainContractType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
  ERC20 = "ERC20",
  CUSTOM = "CUSTOM",
  HYPERLEDGER_CONTRACT = "HYPERLEDGER_CONTRACT",
}

export enum TrustAnchor {
  ROOT = "ROOT",
  INTERMEDIATE = "INTERMEDIATE",
  LEAF = "LEAF",
  BRIDGE = "BRIDGE",
}

export enum RevocationStatus {
  NOT_REVOKED = "NOT_REVOKED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  UNKNOWN = "UNKNOWN",
}

export enum CredentialEncryption {
  AES_256_GCM = "AES_256_GCM",
  AES_256_CBC = "AES_256_CBC",
  RSA_OAEP = "RSA_OAEP",
  ECIES = "ECIES",
  NONE = "NONE",
}

export enum WalletRecoveryMethod {
  SEED_PHRASE = "SEED_PHRASE",
  BACKUP_FILE = "BACKUP_FILE",
  BIOMETRIC = "BIOMETRIC",
  SOCIAL_RECOVERY = "SOCIAL_RECOVERY",
  INSTITUTIONAL = "INSTITUTIONAL",
  HARDWARE_KEY = "HARDWARE_KEY",
}

export enum CredentialSortField {
  ISSUED_AT = "ISSUED_AT",
  EXPIRES_AT = "EXPIRES_AT",
  TYPE = "TYPE",
  STATUS = "STATUS",
  ISSUER = "ISSUER",
  TITLE = "TITLE",
}

export enum ShareAction {
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
}

export enum QRType {
  CREDENTIAL = "CREDENTIAL",
  VERIFICATION = "VERIFICATION",
  SHARING = "SHARING",
  WALLET_IMPORT = "WALLET_IMPORT",
}

export enum PresentationRequestStatus {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  DENIED = "DENIED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
}

export interface EducationCredential {
  id: string;
  credentialId: string;
  credentialType: CredentialType;
  credentialStatus: CredentialStatus;
  credentialFormat: CredentialFormat;
  credentialCategory: CredentialCategory;
  credentialLevel: CredentialLevel;
  schoolId: string;
  title: string;
  description: string;
  issuer: CredentialIssuer;
  holder: CredentialHolder;
  issuanceDate: string;
  expiryDate: string | null;
  renewalDate: string | null;
  evidence: CredentialEvidence[];
  claims: CredentialClaim[];
  verification: CredentialVerificationInfo;
  revocation: CredentialRevocationInfo;
  sharing: CredentialSharingConfig;
  export: CredentialExportConfig;
  blockchain: BlockchainCredentialInfo | null;
  w3cCredential: W3CVerifiableCredential | null;
  openBadge: OpenBadge | null;
  digitalSignature: DigitalSignature;
  metadata: CredentialMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CredentialIssuance {
  id: string;
  credentialId: string;
  credentialType: CredentialType;
  issuanceMethod: IssuanceMethod;
  issuerId: string;
  issuerName: string;
  issuerType: IssuerType;
  holderId: string;
  holderName: string;
  templateId: string | null;
  templateType: CredentialTemplateType;
  batchId: string | null;
  issuanceDate: string;
  expiryDate: string | null;
  status: string;
  blockchainTxHash: string | null;
  w3cCredentialId: string | null;
  openBadgeId: string | null;
  verificationUrl: string;
  downloadUrl: string;
  schoolId: string;
  metadata: CredentialMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CredentialVerification {
  id: string;
  credentialId: string;
  verificationMethod: VerificationMethod;
  verificationResult: VerificationResult;
  verifierId: string;
  verifierName: string;
  verifierType: string;
  verificationDate: string;
  expiryDate: string | null;
  evidence: VerificationEvidence[];
  trustAnchor: TrustAnchor;
  confidenceScore: number;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialRevocation {
  id: string;
  credentialId: string;
  revocationReason: RevocationReason;
  revokedBy: string;
  revokedAt: string;
  effectiveDate: string;
  reversible: boolean;
  revocationMechanism: RevocationMechanism;
  blockchainTxHash: string | null;
  status: RevocationStatus;
  schoolId: string;
  auditTrail: RevocationAuditEntry[];
  metadata: Record<string, unknown>;
}

export interface CredentialRenewal {
  id: string;
  credentialId: string;
  originalExpiryDate: string;
  newExpiryDate: string;
  renewalDate: string;
  renewedBy: string;
  renewalReason: string;
  previousCredentialId: string;
  status: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialExpiration {
  id: string;
  credentialId: string;
  expiryDate: string;
  daysUntilExpiry: number;
  expiryAction: ExpiryAction;
  notifiedAt: string | null;
  notificationCount: number;
  autoRenewEnabled: boolean;
  renewalLeadTime: number;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialSharing {
  id: string;
  credentialId: string;
  sharingScope: SharingScope;
  sharingProtocol: SharingProtocol;
  sharedBy: string;
  sharedWith: string | null;
  sharedAt: string;
  expiresAt: string | null;
  accessCount: number;
  maxAccessCount: number | null;
  downloadCount: number;
  verificationCount: number;
  status: ShareAction;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialExport {
  id: string;
  credentialId: string;
  exportFormat: ExportFormat;
  exportedBy: string;
  exportedAt: string;
  downloadUrl: string;
  fileSize: number;
  encrypted: boolean;
  expiresAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialImport {
  id: string;
  sourceFormat: CredentialFormat;
  sourceUrl: string | null;
  sourceFile: string | null;
  importSource: ImportSource;
  credentialType: CredentialType;
  holderId: string;
  status: string;
  importedAt: string;
  validationResult: ImportValidationResult;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialWallet {
  id: string;
  walletId: string;
  walletType: WalletType;
  walletStatus: WalletStatus;
  holderId: string;
  holderName: string;
  credentialCount: number;
  credentials: WalletCredentialRef[];
  features: WalletFeature[];
  backupEnabled: boolean;
  lastBackupAt: string | null;
  recoveryMethods: WalletRecoveryMethod[];
  deviceInfo: WalletDeviceInfo;
  schoolId: string;
  metadata: WalletMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CredentialHistory {
  id: string;
  credentialId: string;
  events: CredentialEventEntry[];
  totalEvents: number;
  schoolId: string;
}

export interface CredentialQR {
  id: string;
  credentialId: string;
  qrType: QRType;
  qrData: string;
  qrUrl: string;
  verificationUrl: string;
  expiresAt: string;
  accessCount: number;
  maxAccessCount: number | null;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
}

export interface W3CVerifiableCredential {
  id: string;
  context: string[];
  type: string[];
  issuer: string | W3CIssuer;
  issuanceDate: string;
  expirationDate: string | null;
  credentialSubject: W3CCredentialSubject;
  credentialStatus: W3CCredentialStatus;
  credentialSchema: W3CCredentialSchema[];
  evidence: W3CEvidence[];
  proof: W3CProof;
  name: string;
  description: string;
}

export interface OpenBadge {
  id: string;
  schema: string;
  type: string;
  name: string;
  description: string;
  image: string;
  criteria: OpenBadgeCriteria;
  issuer: OpenBadgeIssuer;
  issuedOn: string;
  expiresOn: string | null;
  badgeClass: OpenBadgeClass;
  recipient: OpenBadgeRecipient;
  verification: OpenBadgeVerification;
}

export interface BlockchainCredential {
  id: string;
  blockchainNetwork: BlockchainNetwork;
  contractType: BlockchainContractType;
  contractAddress: string;
  tokenId: string;
  transactionHash: string;
  blockNumber: number;
  chainId: number;
  metadataUri: string;
  ownerAddress: string;
  issuerAddress: string;
  isVerified: boolean;
  lastVerifiedAt: string | null;
  createdAt: string;
}

export interface CredentialConfig {
  id: string;
  schoolId: string;
  defaultFormat: CredentialFormat;
  allowedFormats: CredentialFormat[];
  defaultIssuanceMethod: IssuanceMethod;
  allowedIssuanceMethods: IssuanceMethod[];
  defaultVerificationMethod: VerificationMethod;
  allowedVerificationMethods: VerificationMethod[];
  requireDigitalSignature: boolean;
  enableBlockchain: boolean;
  blockchainNetwork: BlockchainNetwork | null;
  enableWallet: boolean;
  walletTypes: WalletType[];
  expiryPolicy: ExpiryPolicy;
  renewalPolicy: RenewalPolicy;
  sharingPolicy: SharingPolicy;
  revocationPolicy: RevocationRevocationPolicy;
  importPolicy: ImportPolicy;
  exportPolicy: ExportPolicy;
  complianceStandards: ComplianceStandard[];
  templateConfigs: CredentialTemplateConfig[];
  webhookEndpoints: WebhookEndpoint[];
  encryptionConfig: CredentialEncryptionConfig;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalCredentials: number;
  activeCredentials: number;
  expiredCredentials: number;
  revokedCredentials: number;
  pendingCredentials: number;
  credentialsIssued: number;
  credentialsVerified: number;
  credentialsShared: number;
  credentialsExported: number;
  credentialsImported: number;
  credentialsRenewed: number;
  averageIssuanceTime: number;
  averageVerificationTime: number;
  averageSharingTime: number;
  walletCount: number;
  activeWallets: number;
  blockchainTransactions: number;
  blockchainVerificationCount: number;
  qrCodeScans: number;
  verificationSuccessRate: number;
  complianceScore: number;
  metricsBreakdown: CredentialMetricsBreakdown;
  computedAt: string;
}

export interface CredentialIssuer {
  id: string;
  name: string;
  type: IssuerType;
  country: string;
  website: string | null;
  accreditationStatus: string;
  accreditationBody: string | null;
  digitalSignature: DigitalSignature;
  publicKey: string;
  did: string | null;
  trustLevel: string;
  metadata: Record<string, unknown>;
}

export interface CredentialHolder {
  id: string;
  name: string;
  email: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  did: string | null;
  walletId: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialEvidence {
  type: string;
  name: string;
  description: string;
  url: string | null;
  hash: string | null;
  verifiedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface CredentialClaim {
  type: CredentialClaimType;
  name: string;
  value: unknown;
  description: string;
  verified: boolean;
  metadata: Record<string, unknown>;
}

export interface CredentialVerificationInfo {
  verificationUrl: string;
  verificationCode: string;
  qrCode: string;
  lastVerifiedAt: string | null;
  verificationCount: number;
  trustLevel: string;
}

export interface CredentialRevocationInfo {
  isRevoked: boolean;
  revocationDate: string | null;
  revocationReason: RevocationReason | null;
  revocationMechanism: RevocationMechanism;
  revocationListUrl: string | null;
}

export interface CredentialSharingConfig {
  allowedScopes: SharingScope[];
  allowedProtocols: SharingProtocol[];
  requireApproval: boolean;
  defaultScope: SharingScope;
  maxShareCount: number | null;
  shareExpiryDays: number;
}

export interface CredentialExportConfig {
  allowedFormats: ExportFormat[];
  requireEncryption: boolean;
  watermarkEnabled: boolean;
  maxExports: number | null;
}

export interface BlockchainCredentialInfo {
  enabled: boolean;
  network: BlockchainNetwork | null;
  contractAddress: string | null;
  tokenId: string | null;
  transactionHash: string | null;
  metadataUri: string | null;
}

export interface DigitalSignature {
  algorithm: DigitalSignatureType;
  keyType: KeyType;
  publicKey: string;
  signatureValue: string;
  created: string;
  verificationMethod: string;
}

export interface CredentialMetadata {
  version: string;
  schemaVersion: string;
  source: string;
  tags: string[];
  customFields: Record<string, unknown>;
}

export interface VerificationEvidence {
  type: string;
  url: string | null;
  hash: string | null;
  verifiedAt: string;
  metadata: Record<string, unknown>;
}

export interface RevocationAuditEntry {
  action: string;
  timestamp: string;
  actor: string;
  reason: string;
  metadata: Record<string, unknown>;
}

export interface WalletCredentialRef {
  credentialId: string;
  credentialType: CredentialType;
  title: string;
  issuerName: string;
  addedAt: string;
  isPinned: boolean;
}

export interface WalletDeviceInfo {
  deviceId: string;
  deviceType: string;
  os: string;
  osVersion: string;
  appVersion: string;
  lastActiveAt: string;
}

export interface WalletMetadata {
  version: string;
  lastSyncAt: string | null;
  syncStatus: string;
  storageUsed: number;
  storageLimit: number;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  parsedCredential: Record<string, unknown> | null;
  detectedFormat: CredentialFormat | null;
  detectedType: CredentialType | null;
}

export interface CredentialEventEntry {
  eventId: string;
  eventType: CredentialEvent;
  timestamp: string;
  actor: string;
  actorType: string;
  details: Record<string, unknown>;
}

export interface W3CIssuer {
  id: string;
  name: string;
  image: string;
  url: string;
  did: string;
}

export interface W3CCredentialSubject {
  id: string;
  type: string[];
  name: string;
  description: string;
  additionalProperties: Record<string, unknown>;
}

export interface W3CCredentialStatus {
  id: string;
  type: string;
  statusListIndex: string;
  statusListCredential: string;
}

export interface W3CCredentialSchema {
  id: string;
  type: string;
}

export interface W3CEvidence {
  id: string;
  type: string[];
  verifier: string;
  evidenceDocument: string;
  subjectPresence: string;
  credentialPresence: string;
}

export interface W3CProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
  jws: string;
  challenge: string | null;
  domain: string | null;
  nonce: string | null;
}

export interface OpenBadgeCriteria {
  narrative: string;
  extensions: Record<string, unknown>;
}

export interface OpenBadgeIssuer {
  id: string;
  name: string;
  url: string;
  image: string;
  email: string;
}

export interface OpenBadgeClass {
  id: string;
  name: string;
  description: string;
  image: string;
  criteria: OpenBadgeCriteria;
  issuer: OpenBadgeIssuer;
}

export interface OpenBadgeRecipient {
  type: string;
  identity: string;
  name: string;
  hashed: boolean;
}

export interface OpenBadgeVerification {
  type: string;
  url: string;
}

export interface ExpiryPolicy {
  defaultExpiryDays: number;
  allowIndefinite: boolean;
  requireExpiry: boolean;
  expiryAction: ExpiryAction;
  renewalLeadTime: number;
}

export interface RenewalPolicy {
  allowRenewal: boolean;
  maxRenewals: number | null;
  renewalWindow: number;
  requireVerification: boolean;
}

export interface SharingPolicy {
  allowSharing: boolean;
  allowedScopes: SharingScope[];
  allowedProtocols: SharingProtocol[];
  requireApproval: boolean;
  auditSharing: boolean;
}

export interface RevocationRevocationPolicy {
  allowRevocation: boolean;
  allowedReasons: RevocationReason[];
  requireApproval: boolean;
  notifyHolder: boolean;
  auditRevocation: boolean;
}

export interface ImportPolicy {
  allowedSources: ImportSource[];
  allowedFormats: CredentialFormat[];
  requireValidation: boolean;
  autoVerify: boolean;
}

export interface ExportPolicy {
  allowedFormats: ExportFormat[];
  requireEncryption: boolean;
  watermarkEnabled: boolean;
  auditExport: boolean;
}

export interface CredentialTemplateConfig {
  templateId: string;
  templateName: string;
  credentialType: CredentialType;
  format: CredentialFormat;
  isActive: boolean;
  fields: TemplateField[];
}

export interface TemplateField {
  name: string;
  type: string;
  required: boolean;
  defaultValue: unknown | null;
  validation: FieldValidation;
}

export interface FieldValidation {
  minLength: number | null;
  maxLength: number | null;
  pattern: string | null;
  min: number | null;
  max: number | null;
  allowedValues: unknown[] | null;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  retryPolicy: RetryPolicy;
  metadata: Record<string, unknown>;
}

export interface CredentialEncryptionConfig {
  algorithm: CredentialEncryption;
  keySize: number;
  atRestEncryption: boolean;
  transitEncryption: boolean;
}

export interface RetryPolicy {
  maxRetries: number;
  retryInterval: number;
  backoffMultiplier: number;
}

export interface CredentialMetricsBreakdown {
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byFormat: Record<string, number>;
  byIssuer: Record<string, number>;
  byMonth: Record<string, number>;
  byCountry: Record<string, number>;
}

export interface CredentialBulkIssuance {
  id: string;
  batchId: string;
  credentialType: CredentialType;
  format: CredentialFormat;
  totalCount: number;
  processedCount: number;
  successCount: number;
  failedCount: number;
  status: CredentialBatchStatus;
  initiatedBy: string;
  startedAt: string;
  completedAt: string | null;
  errors: string[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialSearchQuery {
  query: string;
  filters: CredentialSearchFilter[];
  sort: CredentialSearchSort[];
  pagination: CredentialSearchPagination;
}

export interface CredentialSearchFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface CredentialSearchSort {
  field: CredentialSortField;
  direction: string;
}

export interface CredentialSearchPagination {
  page: number;
  pageSize: number;
  totalCount: number | null;
}

export interface CredentialSearchResult {
  credentials: EducationCredential[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface CredentialShareRequest {
  credentialId: string;
  sharingScope: SharingScope;
  sharingProtocol: SharingProtocol;
  sharedWith: string | null;
  purpose: string;
  expiryDays: number | null;
  metadata: Record<string, unknown>;
}

export interface CredentialShareResponse {
  shareId: string;
  shareUrl: string;
  verificationUrl: string;
  qrCode: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialPresentationRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterType: string;
  requiredCredentialTypes: CredentialType[];
  requiredClaims: string[];
  optionalClaims: string[];
  purpose: string;
  expiryDate: string;
  status: PresentationRequestStatus;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialPresentation {
  id: string;
  requestId: string;
  credentialIds: string[];
  holderId: string;
  holderDid: string;
  verifierId: string;
  verifierDid: string;
  selectedClaims: string[];
  proof: W3CProof;
  timestamp: string;
  verified: boolean;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialVerificationLog {
  id: string;
  credentialId: string;
  verifierId: string;
  verifierName: string;
  verificationMethod: VerificationMethod;
  verificationResult: VerificationResult;
  verifiedAt: string;
  ipAddress: string;
  userAgent: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialBackup {
  id: string;
  walletId: string;
  credentialIds: string[];
  backupFormat: string;
  encrypted: boolean;
  encryptionKey: string | null;
  backupUrl: string;
  fileSize: number;
  createdAt: string;
  expiresAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialRevocationList {
  id: string;
  listId: string;
  issuerId: string;
  credentialType: CredentialType;
  revokedCredentialIds: string[];
  lastUpdated: string;
  totalRevoked: number;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialHealthCheck {
  status: HealthStatus;
  version: string;
  uptime: number;
  checks: HealthCheckItem[];
  lastChecked: string;
}

export interface HealthCheckItem {
  name: string;
  status: HealthStatus;
  latency: number;
  message: string | null;
  lastChecked: string;
}

export enum CredentialLifecycleStage {
  DRAFT = "DRAFT",
  PENDING_ISSUANCE = "PENDING_ISSUANCE",
  ISSUED = "ISSUED",
  ACTIVE = "ACTIVE",
  SHARED = "SHARED",
  EXPIRING = "EXPIRING",
  EXPIRED = "EXPIRED",
  RENEWED = "RENEWED",
  REVOKED = "REVOKED",
  ARCHIVED = "ARCHIVED",
}

export enum CredentialEvidenceType {
  DOCUMENT = "DOCUMENT",
  TRANSCRIPT = "TRANSCRIPT",
  ASSESSMENT = "ASSESSMENT",
  PORTFOLIO = "PORTFOLIO",
  ATTENDANCE = "ATTENDANCE",
  PROJECT = "PROJECT",
  RECOMMENDATION = "RECOMMENDATION",
}

export enum CredentialRevocationStatus {
  NOT_REVOKED = "NOT_REVOKED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  PARTIALLY_REVOKED = "PARTIALLY_REVOKED",
}

export enum CredentialShareScope {
  PRIVATE = "PRIVATE",
  INSTITUTIONAL = "INSTITUTIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  PUBLIC = "PUBLIC",
}

export enum WalletBackupStatus {
  NOT_BACKED_UP = "NOT_BACKED_UP",
  BACKED_UP = "BACKED_UP",
  PARTIAL = "PARTIAL",
  EXPIRED = "EXPIRED",
}

export enum WalletRecoveryStatus {
  NONE = "NONE",
  INITIATED = "INITIATED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum BlockchainVerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export enum CredentialDisplayMode {
  FULL = "FULL",
  MINIMAL = "MINIMAL",
  SELECTIVE = "SELECTIVE",
  REDACTED = "REDACTED",
}

export enum CredentialIssuerTrustLevel {
  UNTRUSTED = "UNTRUSTED",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  ROOT = "ROOT",
}

export enum WalletEncryptionType {
  AES_256_GCM = "AES_256_GCM",
  AES_256_CBC = "AES_256_CBC",
  CHACHA20 = "CHACHA20",
  NONE = "NONE",
}

export enum CredentialNotificationType {
  ISSUED = "ISSUED",
  EXPIRING_SOON = "EXPIRING_SOON",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SHARED = "SHARED",
  DOWNLOADED = "DOWNLOADED",
  VERIFIED = "VERIFIED",
}

export enum CredentialSearchIndex {
  TITLE = "TITLE",
  ISSUER = "ISSUER",
  TYPE = "TYPE",
  STATUS = "STATUS",
  DATE = "DATE",
}

export enum WalletSyncStatus {
  SYNCED = "SYNCED",
  SYNCING = "SYNCING",
  CONFLICT = "CONFLICT",
  FAILED = "FAILED",
  OFFLINE = "OFFLINE",
}

export enum CredentialRevocationListType {
  STATUS_LIST_2021 = "STATUS_LIST_2021",
  REVOCATION_LIST_2020 = "REVOCATION_LIST_2020",
  UNI_DIRECTIONAL = "UNI_DIRECTIONAL",
  CUSTOM = "CUSTOM",
}

export interface CredentialLifecycleEvent {
  id: string;
  credentialId: string;
  stage: CredentialLifecycleStage;
  eventTimestamp: string;
  actor: string;
  actorType: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface CredentialEvidenceRecord {
  id: string;
  credentialId: string;
  evidenceType: CredentialEvidenceType;
  name: string;
  description: string;
  url: string | null;
  hash: string | null;
  mimeType: string | null;
  size: number | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialRevocationListRecord {
  id: string;
  listId: string;
  listType: CredentialRevocationListType;
  issuerId: string;
  credentialType: CredentialType;
  revokedCredentialIds: string[];
  totalRevoked: number;
  lastUpdated: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialShareRecord {
  id: string;
  credentialId: string;
  sharedBy: string;
  sharedWith: string | null;
  scope: CredentialShareScope;
  protocol: SharingProtocol;
  sharedAt: string;
  expiresAt: string | null;
  accessCount: number;
  downloadCount: number;
  verificationCount: number;
  status: ShareAction;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface WalletBackupRecord {
  id: string;
  walletId: string;
  backupType: string;
  backupUrl: string;
  encrypted: boolean;
  encryptionType: WalletEncryptionType | null;
  fileSize: number;
  status: WalletBackupStatus;
  createdAt: string;
  expiresAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface WalletRecoveryRecord {
  id: string;
  walletId: string;
  recoveryMethod: WalletRecoveryMethod;
  status: WalletRecoveryStatus;
  initiatedBy: string;
  initiatedAt: string;
  completedAt: string | null;
  failedAt: string | null;
  failureReason: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface BlockchainVerificationRecord {
  id: string;
  credentialId: string;
  transactionHash: string;
  blockNumber: number;
  chainId: number;
  status: BlockchainVerificationStatus;
  verifiedAt: string;
  verifiedBy: string;
  proofData: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialDisplayConfig {
  mode: CredentialDisplayMode;
  showIssuer: boolean;
  showExpiry: boolean;
  showVerificationUrl: boolean;
  showQRCode: boolean;
  showEvidence: boolean;
  redactedFields: string[];
}

export interface CredentialIssuerTrustRecord {
  issuerId: string;
  issuerName: string;
  trustLevel: CredentialIssuerTrustLevel;
  trustScore: number;
  totalIssued: number;
  verifiedCount: number;
  revokedCount: number;
  lastIssuedAt: string | null;
  schoolId: string;
}

export interface WalletSyncRecord {
  id: string;
  walletId: string;
  syncStatus: WalletSyncStatus;
  lastSyncAt: string | null;
  syncSource: string;
  credentialsSynced: number;
  conflictsDetected: number;
  errors: string[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialBatchIssuanceItem {
  holderId: string;
  holderName: string;
  holderEmail: string;
  credentialType: CredentialType;
  templateId: string | null;
  customFields: Record<string, unknown>;
}

export interface CredentialBatchIssuanceRequest {
  batchName: string;
  credentialType: CredentialType;
  format: CredentialFormat;
  items: CredentialBatchIssuanceItem[];
  issuanceMethod: IssuanceMethod;
  scheduleDate: string | null;
  notifyHolders: boolean;
  schoolId: string;
}

export interface CredentialBatchIssuanceResult {
  batchId: string;
  status: string;
  totalCount: number;
  processedCount: number;
  successCount: number;
  failedCount: number;
  results: CredentialBatchIssuanceItemResult[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface CredentialBatchIssuanceItemResult {
  holderId: string;
  credentialId: string | null;
  status: string;
  error: string | null;
}

export interface CredentialTemplate {
  id: string;
  templateId: string;
  templateName: string;
  credentialType: CredentialType;
  format: CredentialFormat;
  language: string;
  design: TemplateDesign;
  fields: TemplateField[];
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TemplateDesign {
  backgroundColor: string;
  textColor: string;
  logoUrl: string | null;
  signatureUrl: string | null;
  sealUrl: string | null;
  layout: string;
  customCss: string | null;
}

export interface CredentialRevocationBatchRequest {
  credentialIds: string[];
  reason: RevocationReason;
  effectiveDate: string;
  notifyHolders: boolean;
  schoolId: string;
}

export interface CredentialRevocationBatchResult {
  batchId: string;
  totalCount: number;
  revokedCount: number;
  failedCount: number;
  errors: string[];
  completedAt: string;
  schoolId: string;
}

export interface CredentialRenewalBatchRequest {
  credentialIds: string[];
  newExpiryDate: string;
  renewalReason: string;
  notifyHolders: boolean;
  schoolId: string;
}

export interface CredentialRenewalBatchResult {
  batchId: string;
  totalCount: number;
  renewedCount: number;
  failedCount: number;
  errors: string[];
  completedAt: string;
  schoolId: string;
}

export interface CredentialAnalyticsQuery {
  dateFrom: string;
  dateTo: string;
  groupBy: string;
  filters: Record<string, unknown>;
  schoolId: string;
}

export interface CredentialAnalyticsResult {
  totalIssued: number;
  totalVerified: number;
  totalShared: number;
  totalRevoked: number;
  totalExpired: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byIssuer: Record<string, number>;
  byMonth: Record<string, number>;
  verificationSuccessRate: number;
  averageTimeToFirstShare: number;
  period: string;
  schoolId: string;
}

export interface CredentialVerificationRequest {
  credentialId: string;
  verifierId: string;
  verifierName: string;
  purpose: string;
  requestedClaims: string[];
  schoolId: string;
}

export interface CredentialVerificationResponse {
  verificationId: string;
  credentialId: string;
  result: VerificationResult;
  trustScore: number;
  verifiedAt: string;
  expiresAt: string | null;
  evidence: VerificationEvidence[];
  metadata: Record<string, unknown>;
}

export interface CredentialShareRequest {
  credentialId: string;
  scope: CredentialShareScope;
  protocol: SharingProtocol;
  sharedWith: string | null;
  purpose: string;
  expiryDays: number | null;
  maxAccessCount: number | null;
  schoolId: string;
}

export interface CredentialShareResponse {
  shareId: string;
  shareUrl: string;
  verificationUrl: string;
  qrCode: string;
  expiresAt: string;
  accessCount: number;
  metadata: Record<string, unknown>;
}

export interface WalletImportRequest {
  walletType: WalletType;
  importSource: ImportSource;
  sourceData: string;
  encryptionKey: string | null;
  schoolId: string;
}

export interface WalletImportResult {
  walletId: string;
  credentialsImported: number;
  credentialsFailed: number;
  errors: string[];
  importedAt: string;
  schoolId: string;
}

export interface WalletExportRequest {
  walletId: string;
  format: ExportFormat;
  includePrivateKeys: boolean;
  encryptionKey: string | null;
  credentialIds: string[] | null;
  schoolId: string;
}

export interface WalletExportResult {
  exportId: string;
  downloadUrl: string;
  fileSize: number;
  credentialsExported: number;
  encrypted: boolean;
  expiresAt: string;
  schoolId: string;
}

export interface CredentialRevocationCheck {
  credentialId: string;
  isRevoked: boolean;
  revocationDate: string | null;
  revocationReason: RevocationReason | null;
  checkedAt: string;
  method: RevocationMechanism;
}

export enum CredentialTemplateStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}

export enum CredentialDesignLayout {
  CLASSIC = "CLASSIC",
  MODERN = "MODERN",
  MINIMAL = "MINIMAL",
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
  CUSTOM = "CUSTOM",
}

export enum CredentialRevocationListStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
}

export enum WalletNotificationType {
  CREDENTIAL_RECEIVED = "CREDENTIAL_RECEIVED",
  CREDENTIAL_EXPIRING = "CREDENTIAL_EXPIRING",
  WALLET_BACKUP_REMINDER = "WALLET_BACKUP_REMINDER",
  SECURITY_ALERT = "SECURITY_ALERT",
  SYNC_COMPLETE = "SYNC_COMPLETE",
}

export enum CredentialVerificationLogType {
  QR_SCAN = "QR_SCAN",
  URL_CHECK = "URL_CHECK",
  API_CALL = "API_CALL",
  BLOCKCHAIN = "BLOCKCHAIN",
  DID_RESOLVE = "DID_RESOLVE",
}

export enum WalletDeviceType {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
  WEARABLE = "WEARABLE",
}

export enum CredentialDesignOrientation {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
}

export enum WalletPrivacyLevel {
  PUBLIC = "PUBLIC",
  INSTITUTIONAL = "INSTITUTIONAL",
  PRIVATE = "PRIVATE",
  ANONYMOUS = "ANONYMOUS",
}

export enum CredentialBlockchainStatus {
  MINTED = "MINTED",
  PENDING_MINT = "PENDING_MINT",
  FAILED_MINT = "FAILED_MINT",
  NOT_BLOCKCHAIN = "NOT_BLOCKCHAIN",
}

export enum WalletRecoveryStatus2 {
  NOT_INITIATED = "NOT_INITIATED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum CredentialTemplateField {
  TITLE = "TITLE",
  DESCRIPTION = "DESCRIPTION",
  HOLDER_NAME = "HOLDER_NAME",
  ISSUER_NAME = "ISSUER_NAME",
  ISSUE_DATE = "ISSUE_DATE",
  EXPIRY_DATE = "EXPIRY_DATE",
  CREDENTIAL_ID = "CREDENTIAL_ID",
  QR_CODE = "QR_CODE",
}

export interface CredentialTemplateRecord {
  id: string;
  templateId: string;
  templateName: string;
  credentialType: CredentialType;
  format: CredentialFormat;
  status: CredentialTemplateStatus;
  layout: CredentialDesignLayout;
  orientation: CredentialDesignOrientation;
  fields: CredentialTemplateField[];
  design: TemplateDesign;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CredentialDesignConfig {
  layout: CredentialDesignLayout;
  orientation: CredentialDesignOrientation;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  logoUrl: string | null;
  signatureUrl: string | null;
  sealUrl: string | null;
  watermarkUrl: string | null;
  fontFamily: string;
  fontSize: number;
  customCss: string | null;
}

export interface CredentialRevocationListConfig {
  listType: CredentialRevocationListType;
  status: CredentialRevocationListStatus;
  refreshInterval: number;
  maxEntries: number;
  autoCleanup: boolean;
  retentionDays: number;
}

export interface WalletNotification {
  id: string;
  walletId: string;
  notificationType: WalletNotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl: string | null;
  createdAt: string;
  schoolId: string;
}

export interface CredentialVerificationLog {
  id: string;
  credentialId: string;
  logType: CredentialVerificationLogType;
  verifierId: string;
  verifierName: string;
  result: VerificationResult;
  verifiedAt: string;
  ipAddress: string;
  userAgent: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface WalletDeviceInfo2 {
  deviceId: string;
  deviceType: WalletDeviceType;
  os: string;
  osVersion: string;
  appVersion: string;
  manufacturer: string | null;
  model: string | null;
  lastActiveAt: string;
}

export interface CredentialDesignTemplate {
  id: string;
  templateName: string;
  credentialType: CredentialType;
  design: CredentialDesignConfig;
  isDefault: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WalletPrivacyConfig {
  privacyLevel: WalletPrivacyLevel;
  showCredentialDetails: boolean;
  showIssuerInfo: boolean;
  showExpiryDate: boolean;
  allowAnalytics: boolean;
  shareUsageData: boolean;
}

export interface CredentialBlockchainConfig {
  enabled: boolean;
  network: BlockchainNetwork | null;
  contractAddress: string | null;
  contractType: BlockchainContractType | null;
  autoMint: boolean;
  confirmationsRequired: number;
  gasLimit: number | null;
}

export interface WalletRecoveryPlan {
  id: string;
  walletId: string;
  recoveryMethod: WalletRecoveryMethod;
  status: WalletRecoveryStatus2;
  recoveryData: string;
  createdAt: string;
  expiresAt: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialSearchFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface CredentialSearchSort {
  field: CredentialSortField;
  direction: string;
}

export interface CredentialSearchPagination {
  page: number;
  pageSize: number;
  totalCount: number | null;
}

export interface CredentialShareRequest2 {
  credentialId: string;
  scope: CredentialShareScope;
  protocol: SharingProtocol;
  sharedWith: string | null;
  purpose: string;
  expiryDays: number | null;
  maxAccessCount: number | null;
  schoolId: string;
}

export interface CredentialShareResponse2 {
  shareId: string;
  shareUrl: string;
  verificationUrl: string;
  qrCode: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletSetupRequest {
  walletType: WalletType;
  holderId: string;
  holderName: string;
  encryptionKey: string | null;
  backupEnabled: boolean;
  schoolId: string;
}

export interface WalletSetupResult {
  walletId: string;
  walletType: WalletType;
  status: WalletStatus;
  recoveryPhrase: string | null;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialAcceptRequest {
  credentialId: string;
  holderId: string;
  walletId: string | null;
  schoolId: string;
}

export interface CredentialAcceptResult {
  accepted: boolean;
  walletCredentialId: string | null;
  acceptedAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialDeclineRequest {
  credentialId: string;
  holderId: string;
  reason: string;
  schoolId: string;
}

export interface CredentialDeclineResult {
  declined: boolean;
  declinedAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialAuditSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  recentEvents: CredentialEventEntry[];
  period: string;
  schoolId: string;
}

export interface CredentialDashboardMetrics {
  totalCredentials: number;
  activeCredentials: number;
  expiredCredentials: number;
  revokedCredentials: number;
  pendingCredentials: number;
  recentIssued: CredentialEventEntry[];
  recentVerified: CredentialEventEntry[];
  topIssuers: Record<string, number>;
  topTypes: Record<string, number>;
  period: string;
  schoolId: string;
}

export interface CredentialBatchIssuanceSchedule {
  id: string;
  batchId: string;
  scheduledDate: string;
  credentialType: CredentialType;
  format: CredentialFormat;
  totalItems: number;
  status: string;
  initiatedBy: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CredentialVerificationBatchRequest {
  credentialIds: string[];
  verificationMethod: VerificationMethod;
  verifierId: string;
  purpose: string;
  schoolId: string;
}

export interface CredentialVerificationBatchResult {
  batchId: string;
  totalCount: number;
  verifiedCount: number;
  failedCount: number;
  results: CredentialVerificationResultItem[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface CredentialVerificationResultItem {
  credentialId: string;
  verificationId: string | null;
  result: VerificationResult;
  trustScore: number;
  error: string | null;
}

export interface CredentialRevocationBatchResultItem {
  credentialId: string;
  status: string;
  error: string | null;
}

export interface CredentialRenewalBatchResultItem {
  credentialId: string;
  newExpiryDate: string;
  status: string;
  error: string | null;
}

export interface WalletCredentialShareRequest {
  walletId: string;
  credentialId: string;
  scope: CredentialShareScope;
  protocol: SharingProtocol;
  sharedWith: string | null;
  purpose: string;
  expiryDays: number | null;
  schoolId: string;
}

export interface WalletCredentialShareResponse {
  shareId: string;
  shareUrl: string;
  verificationUrl: string;
  qrCode: string;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletCredentialRemoveRequest {
  walletId: string;
  credentialId: string;
  reason: string;
  schoolId: string;
}

export interface WalletCredentialRemoveResult {
  removed: boolean;
  removedAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletBackupCreateRequest {
  walletId: string;
  backupType: string;
  encryptionKey: string | null;
  schoolId: string;
}

export interface WalletBackupCreateResult {
  backupId: string;
  backupUrl: string;
  fileSize: number;
  encrypted: boolean;
  expiresAt: string;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletRestoreRequest {
  walletId: string;
  backupId: string;
  encryptionKey: string | null;
  schoolId: string;
}

export interface WalletRestoreResult {
  restored: boolean;
  credentialsRestored: number;
  restoredAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletLockRequest {
  walletId: string;
  reason: string;
  schoolId: string;
}

export interface WalletLockResult {
  locked: boolean;
  lockedAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletUnlockRequest {
  walletId: string;
  unlockMethod: WalletRecoveryMethod;
  unlockCode: string;
  schoolId: string;
}

export interface WalletUnlockResult {
  unlocked: boolean;
  unlockedAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialPresentationFulfillRequest {
  requestId: string;
  credentialIds: string[];
  selectedClaims: string[];
  holderId: string;
  holderDid: string;
  schoolId: string;
}

export interface CredentialPresentationFulfillResult {
  presentationId: string;
  proof: W3CProof;
  timestamp: string;
  verified: boolean;
  metadata: Record<string, unknown>;
}

export interface CredentialRevocationListCreateRequest {
  issuerId: string;
  credentialType: CredentialType;
  listType: CredentialRevocationListType;
  schoolId: string;
}

export interface CredentialRevocationListCreateResult {
  listId: string;
  listUrl: string;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialRevocationListUpdateRequest {
  listId: string;
  credentialIds: string[];
  action: string;
  reason: RevocationReason;
  schoolId: string;
}

export interface CredentialRevocationListUpdateResult {
  updated: boolean;
  totalRevoked: number;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialDisplayRequest {
  credentialId: string;
  displayMode: CredentialDisplayMode;
  selectedFields: string[] | null;
  schoolId: string;
}

export interface CredentialDisplayResult {
  credentialId: string;
  displayData: Record<string, unknown>;
  displayMode: CredentialDisplayMode;
  renderedAt: string;
  metadata: Record<string, unknown>;
}

export interface WalletSyncRequest {
  walletId: string;
  syncSource: string;
  forceSync: boolean;
  schoolId: string;
}

export interface WalletSyncResult {
  syncId: string;
  status: WalletSyncStatus;
  credentialsSynced: number;
  conflictsDetected: number;
  syncedAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialAnalyticsDashboard {
  totalCredentials: number;
  activeCredentials: number;
  expiredCredentials: number;
  revokedCredentials: number;
  totalVerifications: number;
  totalShares: number;
  totalWallets: number;
  recentActivity: CredentialEventEntry[];
  topTypes: Record<string, number>;
  topIssuers: Record<string, number>;
  verificationTrend: Record<string, number>;
  period: string;
  schoolId: string;
}

export interface CredentialRevocationListEntry {
  listId: string;
  credentialId: string;
  revokedAt: string;
  reason: RevocationReason;
  revokedBy: string;
}

export interface CredentialBlockchainMintRequest {
  credentialId: string;
  network: BlockchainNetwork;
  contractAddress: string;
  tokenURI: string;
  recipientAddress: string;
  schoolId: string;
}

export interface CredentialBlockchainMintResult {
  transactionHash: string;
  blockNumber: number;
  tokenId: string;
  status: string;
  mintedAt: string;
  metadata: Record<string, unknown>;
}

export interface CredentialBlockchainVerifyRequest {
  credentialId: string;
  transactionHash: string;
  network: BlockchainNetwork;
  schoolId: string;
}

export interface CredentialBlockchainVerifyResult {
  verified: boolean;
  blockNumber: number;
  timestamp: string;
  ownerAddress: string;
  metadata: Record<string, unknown>;
}
