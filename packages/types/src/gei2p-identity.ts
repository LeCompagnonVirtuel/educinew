export enum IdentityProvider {
  AZURE_AD = "AZURE_AD",
  GOOGLE_WORKSPACE = "GOOGLE_WORKSPACE",
  OKTA = "OKTA",
  AUTH0 = "AUTH0",
  ONELOGIN = "ONELOGIN",
  SHIBBOLETH = "SHIBBOLETH",
  KEYCLOAK = "KEYCLOAK",
  SUPABASE = "SUPABASE",
  FIREBASE = "FIREBASE",
  CUSTOM_OIDC = "CUSTOM_OIDC",
  CUSTOM_SAML = "CUSTOM_SAML",
  DECENTRALIZED = "DECENTRALIZED",
}

export enum IdentityProtocol {
  OAUTH2 = "OAUTH2",
  OPENID_CONNECT = "OPENID_CONNECT",
  SAML2 = "SAML2",
  SCIM = "SCIM",
  JWT = "JWT",
  DID = "DID",
  VERIFIABLE_CREDENTIALS = "VERIFIABLE_CREDENTIALS",
  LDAP = "LDAP",
  CAS = "CAS",
  FIDO2 = "FIDO2",
}

export enum IdentityStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  LOCKED = "LOCKED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  MIGRATED = "MIGRATED",
  DELETED = "DELETED",
  ARCHIVED = "ARCHIVED",
}

export enum FederationType {
  BILATERAL = "BILATERAL",
  MULTILATERAL = "MULTILATERAL",
  HUB_AND_SPOKE = "HUB_AND_SPOKE",
  PEER_TO_PEER = "PEER_TO_PEER",
  CENTRALIZED = "CENTRALIZED",
  DECENTRALIZED = "DECENTRALIZED",
  REGIONAL = "REGIONAL",
  GLOBAL = "GLOBAL",
  NATIONAL = "NATIONAL",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum LinkingMethod {
  OAUTH2 = "OAUTH2",
  SAML = "SAML",
  OIDC = "OIDC",
  DID = "DID",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  PHONE_VERIFICATION = "PHONE_VERIFICATION",
  INSTITUTIONAL_SSO = "INSTITUTIONAL_SSO",
  QR_CODE = "QR_CODE",
  MANUAL = "MANUAL",
  BLOCKCHAIN = "BLOCKCHAIN",
}

export enum ResolutionMethod {
  DID_RESOLVE = "DID_RESOLVE",
  OAUTH2_INTROSPECT = "OAUTH2_INTROSPECT",
  SAML_DISCOVERY = "SAML_DISCOVERY",
  DIRECTORY_LOOKUP = "DIRECTORY_LOOKUP",
  BLOCKCHAIN_LOOKUP = "BLOCKCHAIN_LOOKUP",
  CACHE = "CACHE",
  FALLBACK = "FALLBACK",
  AGGREGATED = "AGGREGATED",
}

export enum VerificationMethod {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  BIOMETRIC = "BIOMETRIC",
  DOCUMENT = "DOCUMENT",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENT = "GOVERNMENT",
  PEER = "PEER",
  AUTOMATED = "AUTOMATED",
  MANUAL = "MANUAL",
  MULTI_FACTOR = "MULTI_FACTOR",
  ZK_PROOF = "ZK_PROOF",
}

export enum RecoveryMethod {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  SECURITY_QUESTIONS = "SECURITY_QUESTIONS",
  BACKUP_CODES = "BACKUP_CODES",
  INSTITUTION_ADMIN = "INSTITUTION_ADMIN",
  GOVERNMENT_ID = "GOVERNMENT_ID",
  PEER_VERIFICATION = "PEER_VERIFICATION",
  IDENTITY_DOCUMENT = "IDENTITY_DOCUMENT",
  BIOMETRIC = "BIOMETRIC",
}

export enum DelegationType {
  FULL = "FULL",
  LIMITED = "LIMITED",
  TIME_BOUND = "TIME_BOUND",
  SCOPE_BOUND = "SCOPE_BOUND",
  INSTITUTIONAL = "INSTITUTIONAL",
  PARENTAL = "PARENTAL",
  LEGAL = "LEGAL",
  TEMPORARY = "TEMPORARY",
}

export enum ConsentStatus {
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  WITHDRAWN = "WITHDRAWN",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
  PARTIAL = "PARTIAL",
  MANDATORY = "MANDATORY",
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
}

export enum MappingType {
  DIRECT = "DIRECT",
  TRANSFORMED = "TRANSFORMED",
  APPROXIMATE = "APPROXIMATE",
  EQUIVALENT = "EQUIVALENT",
  ALTERNATE = "ALTERNATE",
  LEGACY = "LEGACY",
  REGIONAL = "REGIONAL",
  GLOBAL = "GLOBAL",
}

export enum AuthProtocol {
  OAUTH2_CODE = "OAUTH2_CODE",
  OAUTH2_IMPLICIT = "OAUTH2_IMPLICIT",
  OAUTH2_CLIENT_CREDENTIALS = "OAUTH2_CLIENT_CREDENTIALS",
  OAUTH2_PASSWORD = "OAUTH2_PASSWORD",
  OAUTH2_REFRESH = "OAUTH2_REFRESH",
  OIDC_HYBRID = "OIDC_HYBRID",
  OIDC_AUTH_CODE = "OIDC_AUTH_CODE",
  OIDC_IMPLICIT = "OIDC_IMPLICIT",
  SAML_WEB_SSO = "SAML_WEB_SSO",
  SAML_POST = "SAML_POST",
  SAML_ARTIFACT = "SAML_ARTIFACT",
  SCIM_BULK = "SCIM_BULK",
  SCIM_PATCH = "SCIM_PATCH",
  DID_AUTH = "DID_AUTH",
}

export enum CredentialFormat {
  JWT = "JWT",
  JSON_LD = "JSON_LD",
  CBOR = "CBOR",
  XML = "XML",
  PDF = "PDF",
  CHAPI = "CHAPI",
  DIDCOMM = "DIDCOMM",
  RAW = "RAW",
}

export enum IdentityTokenType {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  ID_TOKEN = "ID_TOKEN",
  SAML_ASSERTION = "SAML_ASSERTION",
  JWT = "JWT",
  OPAQUE = "OPAQUE",
  DID_DOCUMENT = "DID_DOCUMENT",
  VERIFIABLE_PRESENTATION = "VERIFIABLE_PRESENTATION",
}

export enum SessionStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  MFA_REQUIRED = "MFA_REQUIRED",
  LOCKED = "LOCKED",
}

export enum DIDMethod {
  KEY = "KEY",
  WEB = "WEB",
  Ion = "ION",
  ETHR = "ETHR",
  PKH = "PKH",
  Peer = "PEER",
  OP = "OP",
  SOV = "SOV",
  CHESS = "CHESS",
}

export enum DIDDocumentStatus {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
  SUSPENDED = "SUSPENDED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
}

export enum KeyPurpose {
  AUTHENTICATION = "AUTHENTICATION",
  ASSERTION_METHOD = "ASSERTION_METHOD",
  KEY_AGREEMENT = "KEY_AGREEMENT",
  CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
  CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION",
  VERIFICATION = "VERIFICATION",
  ENCRYPTION = "ENCRYPTION",
  SIGNING = "SIGNING",
}

export enum BiometricType {
  FINGERPRINT = "FINGERPRINT",
  FACE = "FACE",
  IRIS = "IRIS",
  VOICE = "VOICE",
  VEIN = "VEIN",
  RETINA = "RETINA",
  PALM = "PALM",
  KEystroke = "KEYSTROKE",
}

export enum PrivacyLevel {
  PUBLIC = "PUBLIC",
  INSTITUTIONAL = "INSTITUTIONAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  PRIVATE = "PRIVATE",
  ANONYMOUS = "ANONYMOUS",
}

export enum AuditAction {
  IDENTITY_CREATED = "IDENTITY_CREATED",
  IDENTITY_UPDATED = "IDENTITY_UPDATED",
  IDENTITY_DELETED = "IDENTITY_DELETED",
  IDENTITY_LINKED = "IDENTITY_LINKED",
  IDENTITY_UNLINKED = "IDENTITY_UNLINKED",
  IDENTITY_VERIFIED = "IDENTITY_VERIFIED",
  IDENTITY_SUSPENDED = "IDENTITY_SUSPENDED",
  IDENTITY_REACTIVATED = "IDENTITY_REACTIVATED",
  IDENTITY_MIGRATED = "IDENTITY_MIGRATED",
  IDENTITY_DELEGATED = "IDENTITY_DELEGATED",
  IDENTITY_CONSENTED = "IDENTITY_CONSENTED",
  IDENTITY_REVOKED = "IDENTITY_REVOKED",
  CREDENTIAL_ISSUED = "CREDENTIAL_ISSUED",
  CREDENTIAL_VERIFIED = "CREDENTIAL_VERIFIED",
  CREDENTIAL_REVOKED = "CREDENTIAL_REVOKED",
  FEDERATION_CREATED = "FEDERATION_CREATED",
  FEDERATION_JOINED = "FEDERATION_JOINED",
  FEDERATION_LEFT = "FEDERATION_LEFT",
  RECOVERY_INITIATED = "RECOVERY_INITIATED",
  RECOVERY_COMPLETED = "RECOVERY_COMPLETED",
  SESSION_CREATED = "SESSION_CREATED",
  SESSION_TERMINATED = "SESSION_TERMINATED",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WEBHOOK = "WEBHOOK",
  IN_APP = "IN_APP",
}

export enum ConflictResolution {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENT = "GOVERNMENT",
  MANUAL = "MANUAL",
  PRIORITY = "PRIORITY",
  FEDERATED = "FEDERATED",
}

export enum MigrationStrategy {
  DIRECT_COPY = "DIRECT_COPY",
  TRANSFORM = "TRANSFORM",
  MERGE = "MERGE",
  DEDUPLICATE = "DEDUPLICATE",
  ARCHIVE = "ARCHIVE",
  SELECTIVE = "SELECTIVE",
  BACKFILL = "BACKFILL",
}

export enum DataRetentionPolicy {
  RETAIN_FOREVER = "RETAIN_FOREVER",
  RETAIN_DURATION = "RETAIN_DURATION",
  RETAIN_UNTIL = "RETAIN_UNTIL",
  ANONYMIZE = "ANONYMIZE",
  DELETE = "DELETE",
  ARCHIVE = "ARCHIVE",
}

export enum EncryptionAlgorithm {
  AES_256_GCM = "AES_256_GCM",
  AES_256_CBC = "AES_256_CBC",
  RSA_OAEP = "RSA_OAEP",
  ECIES = "ECIES",
  CHACHA20_POLY1305 = "CHACHA20_POLY1305",
  X25519 = "X25519",
  P256 = "P256",
}

export enum HashAlgorithm {
  SHA256 = "SHA256",
  SHA384 = "SHA384",
  SHA512 = "SHA512",
  BLAKE2B = "BLAKE2B",
  KECCAK256 = "KECCAK256",
}

export enum SignatureAlgorithm {
  RSA_PSS = "RSA_PSS",
  ECDSA = "ECDSA",
  EDDSA = "EDDSA",
  BLS = "BLS",
  SCHNORR = "SCHNORR",
}

export enum TokenEndpointAuthMethod {
  CLIENT_SECRET_BASIC = "CLIENT_SECRET_BASIC",
  CLIENT_SECRET_POST = "CLIENT_SECRET_POST",
  CLIENT_SECRET_JWT = "CLIENT_SECRET_JWT",
  PRIVATE_KEY_JWT = "PRIVATE_KEY_JWT",
  NONE = "NONE",
}

export enum GrantType {
  AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
  CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  PASSWORD = "PASSWORD",
  IMPLICIT = "IMPLICIT",
  JWT_BEARER = "JWT_BEARER",
  DEVICE_CODE = "DEVICE_CODE",
}

export enum ResponseType {
  CODE = "CODE",
  TOKEN = "TOKEN",
  ID_TOKEN = "ID_TOKEN",
  CODE_TOKEN = "CODE_TOKEN",
  CODE_ID_TOKEN = "CODE_ID_TOKEN",
  TOKEN_ID_TOKEN = "TOKEN_ID_TOKEN",
  CODE_TOKEN_ID_TOKEN = "CODE_TOKEN_ID_TOKEN",
}

export enum ScopeType {
  IDENTITY_READ = "IDENTITY_READ",
  IDENTITY_WRITE = "IDENTITY_WRITE",
  IDENTITY_ADMIN = "IDENTITY_ADMIN",
  CREDENTIAL_READ = "CREDENTIAL_READ",
  CREDENTIAL_WRITE = "CREDENTIAL_WRITE",
  CREDENTIAL_VERIFY = "CREDENTIAL_VERIFY",
  PROFILE_READ = "PROFILE_READ",
  PROFILE_WRITE = "PROFILE_WRITE",
  CONSENT_READ = "CONSENT_READ",
  CONSENT_WRITE = "CONSENT_WRITE",
}

export enum DiscoveryProtocol {
  WEBFINGER = "WEBFINGER",
  DID_DIRECTORY = "DID_DIRECTORY",
  SAML_METADATA = "SAML_METADATA",
  OIDC_DISCOVERY = "OIDC_DISCOVERY",
  SCIM_DISCOVERY = "SCIM_DISCOVERY",
  CUSTOM = "CUSTOM",
}

export enum TrustLevel {
  UNTRUSTED = "UNTRUSTED",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  INSTITUTIONAL = "INSTITUTIONAL",
  GOVERNMENTAL = "GOVERNMENTAL",
}

export enum RiskAssessment {
  NONE = "NONE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ThreatType {
  CREDENTIAL_THEFT = "CREDENTIAL_THEFT",
  IDENTITY_FRAUD = "IDENTITY_FRAUD",
  REPLAY_ATTACK = "REPLAY_ATTACK",
  MAN_IN_THE_MIDDLE = "MAN_IN_THE_MIDDLE",
  PHISHING = "PHISHING",
  BRUTE_FORCE = "BRUTE_FORCE",
  TOKEN_LEAK = "TOKEN_LEAK",
  SESSION_HIJACK = "SESSION_HIJACK",
}

export enum RateLimitScope {
  GLOBAL = "GLOBAL",
  PER_USER = "PER_USER",
  PER_IP = "PER_IP",
  PER_INSTITUTION = "PER_INSTITUTION",
  PER_ENDPOINT = "PER_ENDPOINT",
}

export enum CacheStrategy {
  NONE = "NONE",
  IN_MEMORY = "IN_MEMORY",
  REDIS = "REDIS",
  MEMCACHED = "MEMCACHED",
  CDN = "CDN",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
  MAINTENANCE = "MAINTENANCE",
}

export enum LogEventType {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
  AUDIT = "AUDIT",
}

export enum RegionScope {
  LOCAL = "LOCAL",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  GLOBAL = "GLOBAL",
}

export enum ComplianceFramework {
  GDPR = "GDPR",
  CCPA = "CCPA",
  FERPA = "FERPA",
  HIPAA = "HIPAA",
  SOC2 = "SOC2",
  ISO27001 = "ISO27001",
  NIST = "NIST",
  LOCAL_REGULATION = "LOCAL_REGULATION",
}

export enum InteroperabilityLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  ADVANCED = "ADVANCED",
  FULL = "FULL",
}

export enum VersioningStrategy {
  NONE = "NONE",
  URL_PATH = "URL_PATH",
  HEADER = "HEADER",
  QUERY_PARAM = "QUERY_PARAM",
  CONTENT_NEGOTIATION = "CONTENT_NEGOTIATION",
}

export enum DeploymentTarget {
  CLOUD = "CLOUD",
  ON_PREMISE = "ON_PREMISE",
  HYBRID = "HYBRID",
  EDGE = "EDGE",
  MULTI_CLOUD = "MULTI_CLOUD",
}

export enum EnvironmentType {
  DEVELOPMENT = "DEVELOPMENT",
  STAGING = "STAGING",
  UAT = "UAT",
  PRODUCTION = "PRODUCTION",
  DR = "DR",
}

export enum ServiceProviderRole {
  IDENTITY_PROVIDER = "IDENTITY_PROVIDER",
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
  RELYING_PARTY = "RELYING_PARTY",
  BROKER = "BROKER",
  FEDERATION = "FEDERATION",
}

export enum ExternalIdentitySource {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  APPLE = "APPLE",
  MICROSOFT = "MICROSOFT",
  GITHUB = "GITHUB",
  LINKEDIN = "LINKEDIN",
  GOVERNMENT = "GOVERNMENT",
  INSTITUTION = "INSTITUTION",
  CUSTOM = "CUSTOM",
}

export enum MappingPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum SyncStatus {
  SYNCED = "SYNCED",
  PENDING = "PENDING",
  CONFLICT = "CONFLICT",
  FAILED = "FAILED",
  PARTIAL = "PARTIAL",
}

export interface GlobalEducationIdentity {
  id: string;
  globalId: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  schoolId: string;
  institutionId: string;
  institutionGlobalId: string;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  federationMemberships: FederationMembership[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  consentRecords: ConsentRecord[];
  delegationRecords: DelegationRecord[];
  recoveryMethods: RecoveryMethodConfig[];
  securitySettings: IdentitySecuritySettings;
  privacySettings: IdentityPrivacySettings;
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface StudentGlobalID {
  id: string;
  globalId: string;
  studentId: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  schoolId: string;
  institutionId: string;
  institutionGlobalId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  consentRecords: ConsentRecord[];
  recoveryMethods: RecoveryMethodConfig[];
  securitySettings: IdentitySecuritySettings;
  privacySettings: IdentityPrivacySettings;
  academicProfile: StudentAcademicProfile;
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TeacherGlobalID {
  id: string;
  globalId: string;
  teacherId: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  schoolId: string;
  institutionId: string;
  institutionGlobalId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  consentRecords: ConsentRecord[];
  delegationRecords: DelegationRecord[];
  recoveryMethods: RecoveryMethodConfig[];
  securitySettings: IdentitySecuritySettings;
  privacySettings: IdentityPrivacySettings;
  professionalProfile: TeacherProfessionalProfile;
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InstitutionGlobalID {
  id: string;
  globalId: string;
  institutionId: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  institutionName: string;
  institutionType: string;
  country: string;
  region: string;
  accreditationStatus: string;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  federationMemberships: FederationMembership[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  subInstitutions: string[];
  parentInstitution: string | null;
  trustRelationships: TrustRelationship[];
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ResearcherGlobalID {
  id: string;
  globalId: string;
  researcherId: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  schoolId: string;
  institutionId: string;
  institutionGlobalId: string;
  firstName: string;
  lastName: string;
  email: string;
  researchField: string;
  orcidId: string | null;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  consentRecords: ConsentRecord[];
  recoveryMethods: RecoveryMethodConfig[];
  securitySettings: IdentitySecuritySettings;
  researchProfile: ResearcherProfile;
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmployerEducationID {
  id: string;
  globalId: string;
  employerId: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  companyName: string;
  companyType: string;
  country: string;
  industry: string;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  federationMemberships: FederationMembership[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  credentialVerificationAccess: CredentialVerificationAccess;
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface OrganizationID {
  id: string;
  globalId: string;
  organizationId: string;
  organizationName: string;
  organizationType: string;
  identityProvider: IdentityProvider;
  identityProtocol: IdentityProtocol;
  identityStatus: IdentityStatus;
  country: string;
  region: string;
  registrationNumber: string | null;
  externalIds: ExternalIdentityMapping[];
  digitalIdentity: DigitalIdentityProfile;
  linkedAccounts: LinkedAccount[];
  federationMemberships: FederationMembership[];
  verifiableCredentials: VerifiableCredentialRef[];
  didDocument: DIDDocument | null;
  verificationStatus: VerificationStatusSummary;
  trustRelationships: TrustRelationship[];
  auditLog: IdentityAuditEntry[];
  metadata: IdentityMetadata;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DigitalIdentityMapping {
  id: string;
  sourceProvider: IdentityProvider;
  sourceProtocol: IdentityProtocol;
  sourceIdentifier: string;
  targetProvider: IdentityProvider;
  targetProtocol: IdentityProtocol;
  targetIdentifier: string;
  mappingType: MappingType;
  trustLevel: TrustLevel;
  verificationStatus: string;
  schoolId: string;
  isActive: boolean;
  isPrimary: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityFederation {
  id: string;
  federationName: string;
  federationType: FederationType;
  memberProviders: FederationMember[];
  trustFramework: TrustFramework;
  metadata: FederationMetadata;
  schoolId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityLink {
  id: string;
  sourceIdentityId: string;
  targetIdentityId: string;
  linkingMethod: LinkingMethod;
  trustLevel: TrustLevel;
  verificationStatus: string;
  schoolId: string;
  isActive: boolean;
  linkedAt: string;
  unlinkedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityResolution {
  id: string;
  queryType: string;
  queryValue: string;
  resolutionMethod: ResolutionMethod;
  resolvedIdentityId: string;
  trustLevel: TrustLevel;
  confidence: number;
  schoolId: string;
  resolvedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityVerification {
  id: string;
  identityId: string;
  verificationMethod: VerificationMethod;
  verificationStatus: string;
  verifier: string;
  verifierType: string;
  schoolId: string;
  verifiedAt: string;
  expiresAt: string | null;
  evidence: VerificationEvidence[];
  metadata: Record<string, unknown>;
}

export interface IdentityRecovery {
  id: string;
  identityId: string;
  recoveryMethod: RecoveryMethod;
  recoveryStatus: string;
  initiatedBy: string;
  initiatedAt: string;
  completedAt: string | null;
  expiresAt: string;
  verificationSteps: RecoveryVerificationStep[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityDelegation {
  id: string;
  delegatorId: string;
  delegateeId: string;
  delegationType: DelegationType;
  scopes: string[];
  startDate: string;
  endDate: string | null;
  status: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityConsent {
  id: string;
  identityId: string;
  consentType: string;
  consentStatus: ConsentStatus;
  grantedScopes: string[];
  deniedScopes: string[];
  purpose: string;
  schoolId: string;
  grantedAt: string;
  expiresAt: string | null;
  withdrawnAt: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityRevocation {
  id: string;
  identityId: string;
  revocationReason: RevocationReason;
  revokedBy: string;
  revokedAt: string;
  effectiveDate: string;
  reversible: boolean;
  schoolId: string;
  auditTrail: RevocationAuditEntry[];
  metadata: Record<string, unknown>;
}

export interface IdentityHistoryEntry {
  id: string;
  identityId: string;
  eventType: AuditAction;
  eventTimestamp: string;
  actor: string;
  actorType: string;
  previousState: Record<string, unknown> | null;
  newState: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface CrossPlatformMapping {
  id: string;
  sourcePlatform: string;
  targetPlatform: string;
  sourceIdentifier: string;
  targetIdentifier: string;
  mappingType: MappingType;
  trustLevel: TrustLevel;
  isActive: boolean;
  verified: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityConfig {
  id: string;
  schoolId: string;
  defaultIdentityProvider: IdentityProvider;
  defaultProtocol: IdentityProtocol;
  allowedProviders: IdentityProvider[];
  allowedProtocols: IdentityProtocol[];
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  requireBiometricVerification: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  passwordPolicy: PasswordPolicy;
  mfaPolicy: MFAPolicy;
  federationPolicy: FederationPolicy;
  recoveryPolicy: RecoveryPolicy;
  delegationPolicy: DelegationPolicy;
  consentPolicy: ConsentPolicy;
  auditPolicy: AuditPolicy;
  encryptionConfig: EncryptionConfig;
  webhookEndpoints: WebhookEndpoint[];
  createdAt: string;
  updatedAt: string;
}

export interface IdentityMetrics {
  id: string;
  schoolId: string;
  period: string;
  totalIdentities: number;
  activeIdentities: number;
  newIdentities: number;
  deactivatedIdentities: number;
  suspendedIdentities: number;
  linkedIdentities: number;
  verifiedIdentities: number;
  failedVerifications: number;
  recoveryAttempts: number;
  successfulRecoveries: number;
  failedRecoveries: number;
  activeSessions: number;
  averageSessionDuration: number;
  federationConnections: number;
  averageLinkingTime: number;
  averageResolutionTime: number;
  averageVerificationTime: number;
  securityIncidents: number;
  complianceScore: number;
  uptimePercentage: number;
  apiCallCount: number;
  errorRate: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  metricsBreakdown: MetricsBreakdown;
  computedAt: string;
}

export interface ExternalIdentityMapping {
  id: string;
  provider: IdentityProvider;
  protocol: IdentityProtocol;
  externalId: string;
  externalEmail: string | null;
  externalDisplayName: string | null;
  isVerified: boolean;
  isPrimary: boolean;
  linkedAt: string;
  metadata: Record<string, unknown>;
}

export interface DigitalIdentityProfile {
  did: string | null;
  didMethod: DIDMethod | null;
  didDocumentStatus: DIDDocumentStatus | null;
  verifiableCredentials: VerifiableCredentialRef[];
  keyPairs: KeyPairInfo[];
  biometricEnrollments: BiometricEnrollment[];
  walletInfo: DigitalWalletInfo | null;
}

export interface LinkedAccount {
  id: string;
  provider: IdentityProvider;
  protocol: IdentityProtocol;
  externalId: string;
  email: string | null;
  displayName: string | null;
  isVerified: boolean;
  isPrimary: boolean;
  linkedAt: string;
  lastSyncAt: string | null;
  metadata: Record<string, unknown>;
}

export interface FederationMembership {
  id: string;
  federationId: string;
  federationName: string;
  federationType: FederationType;
  memberRole: string;
  trustLevel: TrustLevel;
  joinedAt: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface VerifiableCredentialRef {
  id: string;
  credentialId: string;
  credentialType: string;
  issuer: string;
  issuanceDate: string;
  expiryDate: string | null;
  status: string;
  format: CredentialFormat;
  metadata: Record<string, unknown>;
}

export interface DIDDocument {
  id: string;
  did: string;
  didMethod: DIDMethod;
  controller: string;
  publicKey: DIDPublicKey[];
  authentication: string[];
  assertionMethod: string[];
  keyAgreement: string[];
  capabilityInvocation: string[];
  capabilityDelegation: string[];
  service: DIDService[];
  created: string;
  updated: string;
  versionId: string;
  deactivated: boolean;
}

export interface VerificationStatusSummary {
  overallStatus: string;
  identityVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  institutionVerified: boolean;
  governmentVerified: boolean;
  lastVerificationDate: string;
  nextVerificationDate: string | null;
  verificationLevel: string;
  trustScore: number;
}

export interface ConsentRecord {
  id: string;
  consentType: string;
  status: ConsentStatus;
  scopes: string[];
  purpose: string;
  thirdPartyRecipients: string[];
  retentionPeriod: number;
  grantedAt: string;
  expiresAt: string | null;
  withdrawnAt: string | null;
  lastReviewedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface DelegationRecord {
  id: string;
  delegateeId: string;
  delegateeName: string;
  delegationType: DelegationType;
  scopes: string[];
  restrictions: string[];
  startDate: string;
  endDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecoveryMethodConfig {
  method: RecoveryMethod;
  isEnabled: boolean;
  priority: number;
  verificationSteps: string[];
  cooldownPeriod: number;
  maxAttempts: number;
  metadata: Record<string, unknown>;
}

export interface IdentitySecuritySettings {
  requireMFA: boolean;
  allowedMFAMethods: BiometricType[];
  sessionTimeout: number;
  maxConcurrentSessions: number;
  passwordPolicy: PasswordPolicy;
  lockoutPolicy: LockoutPolicy;
  ipWhitelist: string[];
  ipBlacklist: string[];
  geoRestrictions: string[];
  deviceTrust: boolean;
  riskAssessment: boolean;
  anomalyDetection: boolean;
}

export interface IdentityPrivacySettings {
  defaultPrivacyLevel: PrivacyLevel;
  profileVisibility: string;
  credentialSharingDefault: boolean;
  allowThirdPartySharing: boolean;
  dataRetentionDays: number;
  anonymizeAfterDays: number;
  exportableData: string[];
  deletableData: string[];
  auditLogRetentionDays: number;
}

export interface IdentityAuditEntry {
  id: string;
  eventType: AuditAction;
  timestamp: string;
  actor: string;
  actorType: string;
  resourceId: string;
  resourceType: string;
  changes: AuditChange[];
  ipAddress: string;
  userAgent: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityMetadata {
  version: string;
  schemaVersion: string;
  source: string;
  tags: string[];
  customFields: Record<string, unknown>;
  lastSyncedAt: string | null;
  syncSource: string | null;
}

export interface StudentAcademicProfile {
  studentId: string;
  institutionId: string;
  programOfStudy: string;
  enrollmentYear: number;
  expectedGraduationYear: number | null;
  currentYear: number | null;
  academicStatus: string;
  gpa: number | null;
  credits: number | null;
}

export interface TeacherProfessionalProfile {
  teacherId: string;
  institutionId: string;
  department: string;
  title: string;
  specializations: string[];
  certifications: string[];
  yearsOfExperience: number;
  employmentStatus: string;
}

export interface ResearcherProfile {
  researcherId: string;
  institutionId: string;
  researchField: string;
  orcidId: string | null;
  publications: number;
  hIndex: number | null;
  researchGateScore: number | null;
  specializations: string[];
}

export interface CredentialVerificationAccess {
  canVerify: boolean;
  verificationScope: string[];
  rateLimit: number;
  requiresApproval: boolean;
}

export interface TrustRelationship {
  id: string;
  partnerId: string;
  partnerName: string;
  trustLevel: TrustLevel;
  relationshipType: string;
  establishedAt: string;
  expiresAt: string | null;
  status: string;
  metadata: Record<string, unknown>;
}

export interface FederationMember {
  providerId: string;
  providerName: string;
  providerType: string;
  protocol: IdentityProtocol;
  trustLevel: TrustLevel;
  joinedAt: string;
  status: string;
}

export interface TrustFramework {
  name: string;
  version: string;
  assuranceLevels: string[];
  policyRules: string[];
  complianceRequirements: string[];
}

export interface FederationMetadata {
  description: string;
  website: string;
  contactEmail: string;
  totalMembers: number;
  activeMembers: number;
  supportedProtocols: IdentityProtocol[];
  region: string;
}

export interface VerificationEvidence {
  type: string;
  provider: string;
  verifiedAt: string;
  evidenceUrl: string | null;
  metadata: Record<string, unknown>;
}

export interface RecoveryVerificationStep {
  step: number;
  method: RecoveryMethod;
  status: string;
  completedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface RevocationAuditEntry {
  action: string;
  timestamp: string;
  actor: string;
  reason: string;
  metadata: Record<string, unknown>;
}

export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  prohibitCommonPasswords: boolean;
  passwordHistoryCount: number;
  maxAge: number;
}

export interface MFAPolicy {
  required: boolean;
  allowedMethods: BiometricType[];
  gracePeriod: number;
  rememberDevice: boolean;
  rememberDeviceDuration: number;
}

export interface FederationPolicy {
  allowFederation: boolean;
  allowedFederationTypes: FederationType[];
  requireApproval: boolean;
  defaultTrustLevel: TrustLevel;
  autoLinkAccounts: boolean;
  conflictResolution: ConflictResolution;
}

export interface RecoveryPolicy {
  allowedMethods: RecoveryMethod[];
  requireApproval: boolean;
  maxRecoveryAttempts: number;
  cooldownPeriod: number;
  notifyAdmin: boolean;
  notifyUser: boolean;
}

export interface DelegationPolicy {
  allowDelegation: boolean;
  maxDelegationDepth: number;
  allowedScopes: string[];
  requireConsent: boolean;
  auditDelegation: boolean;
}

export interface ConsentPolicy {
  requireConsent: boolean;
  consentExpiry: number;
  allowPartialConsent: boolean;
  auditConsent: boolean;
  dataRetentionDays: number;
}

export interface AuditPolicy {
  enabled: boolean;
  retentionDays: number;
  logLevel: LogEventType;
  includeMetadata: boolean;
  realTimeAlerts: boolean;
}

export interface EncryptionConfig {
  algorithm: EncryptionAlgorithm;
  keySize: number;
  keyRotationDays: number;
  atRestEncryption: boolean;
  transitEncryption: boolean;
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

export interface PasswordPolicyConfig {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  prohibitCommonPasswords: boolean;
  passwordHistoryCount: number;
  maxAge: number;
}

export interface LockoutPolicy {
  maxAttempts: number;
  lockoutDuration: number;
  resetAttemptsAfter: number;
  notifyAdmin: boolean;
}

export interface MetricsBreakdown {
  byProvider: Record<string, number>;
  byProtocol: Record<string, number>;
  byStatus: Record<string, number>;
  byRegion: Record<string, number>;
  byInstitution: Record<string, number>;
}

export interface DIDPublicKey {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
  purpose: KeyPurpose;
}

export interface DIDService {
  id: string;
  type: string;
  serviceEndpoint: string;
  description: string;
}

export interface KeyPairInfo {
  id: string;
  keyType: string;
  purpose: KeyPurpose;
  publicKey: string;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

export interface BiometricEnrollment {
  id: string;
  biometricType: BiometricType;
  templateHash: string;
  enrollmentDate: string;
  lastVerified: string;
  provider: string;
  isActive: boolean;
}

export interface DigitalWalletInfo {
  walletId: string;
  walletType: string;
  isActive: boolean;
  credentialCount: number;
  lastSyncAt: string;
  metadata: Record<string, unknown>;
}

export interface AuditChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changeType: string;
}

export interface RetryPolicy {
  maxRetries: number;
  retryInterval: number;
  backoffMultiplier: number;
}

export interface IdentityBulkOperation {
  id: string;
  operationType: string;
  identityIds: string[];
  status: string;
  initiatedBy: string;
  initiatedAt: string;
  completedAt: string | null;
  failedCount: number;
  successCount: number;
  errors: string[];
  metadata: Record<string, unknown>;
}

export interface IdentitySyncJob {
  id: string;
  sourceProvider: IdentityProvider;
  targetProvider: IdentityProvider;
  syncType: string;
  status: SyncStatus;
  startedAt: string;
  completedAt: string | null;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  errors: string[];
  metadata: Record<string, unknown>;
}

export interface IdentitySearchQuery {
  query: string;
  filters: IdentitySearchFilter[];
  sort: IdentitySearchSort[];
  pagination: IdentitySearchPagination;
}

export interface IdentitySearchFilter {
  field: string;
  operator: string;
  value: unknown;
}

export interface IdentitySearchSort {
  field: string;
  direction: string;
}

export interface IdentitySearchPagination {
  page: number;
  pageSize: number;
  totalCount: number | null;
}

export interface IdentitySearchResult {
  identities: GlobalEducationIdentity[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface IdentityExportRequest {
  format: string;
  filters: IdentitySearchFilter[];
  includeMetadata: boolean;
  includeAuditLog: boolean;
  encryptionRequired: boolean;
}

export interface IdentityExportResult {
  exportId: string;
  format: string;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityImportRequest {
  sourceFormat: string;
  sourceUrl: string;
  mappingConfig: Record<string, unknown>;
  conflictResolution: ConflictResolution;
  dryRun: boolean;
}

export interface IdentityImportResult {
  importId: string;
  status: string;
  totalRecords: number;
  importedRecords: number;
  skippedRecords: number;
  failedRecords: number;
  errors: string[];
  warnings: string[];
  metadata: Record<string, unknown>;
}

export interface IdentityWebhookEvent {
  eventId: string;
  eventType: string;
  identityId: string;
  schoolId: string;
  timestamp: string;
  payload: Record<string, unknown>;
  signature: string;
}

export interface IdentityHealthCheck {
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

export enum IdentityLifecycleStage {
  PROVISIONING = "PROVISIONING",
  ACTIVE = "ACTIVE",
  DORMANT = "DORMANT",
  SUSPENDED = "SUSPENDED",
  DEPROVISIONING = "DEPROVISIONING",
  DEPROVISIONED = "DEPROVISIONED",
}

export enum IdentityAttributeType {
  NAME = "NAME",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  ADDRESS = "ADDRESS",
  DATE_OF_BIRTH = "DATE_OF_BIRTH",
  NATIONALITY = "NATIONALITY",
  GENDER = "GENDER",
  PHOTO = "PHOTO",
  BIOMETRIC = "BIOMETRIC",
  INSTITUTIONAL_ID = "INSTITUTIONAL_ID",
}

export enum IdentityConsentType {
  DATA_PROCESSING = "DATA_PROCESSING",
  DATA_SHARING = "DATA_SHARING",
  CREDENTIAL_SHARING = "CREDENTIAL_SHARING",
  PROFILE_VISIBILITY = "PROFILE_VISIBILITY",
  ANALYTICS = "ANALYTICS",
  MARKETING = "MARKETING",
  THIRD_PARTY = "THIRD_PARTY",
}

export enum IdentityEventSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

export enum IdentityLockReason {
  PASSWORD_EXPIRY = "PASSWORD_EXPIRY",
  MFA_FAILURE = "MFA_FAILURE",
  SUSPICIOUS_ACTIVITY = "SUSPICIOUS_ACTIVITY",
  ADMIN_ACTION = "ADMIN_ACTION",
  COMPLIANCE = "COMPLIANCE",
  USER_REQUEST = "USER_REQUEST",
}

export enum IdentityUnlockMethod {
  PASSWORD_RESET = "PASSWORD_RESET",
  MFA_VERIFICATION = "MFA_VERIFICATION",
  ADMIN_OVERRIDE = "ADMIN_OVERRIDE",
  IDENTITY_VERIFICATION = "IDENTITY_VERIFICATION",
}

export enum IdentityTransferStatus {
  INITIATED = "INITIATED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  ROLLED_BACK = "ROLLED_BACK",
}

export enum IdentityComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
}

export enum IdentityAttributeSource {
  SELF_DECLARED = "SELF_DECLARED",
  INSTITUTION_VERIFIED = "INSTITUTION_VERIFIED",
  GOVERNMENT_VERIFIED = "GOVERNMENT_VERIFIED",
  THIRD_PARTY = "THIRD_PARTY",
  INFERRED = "INFERRED",
}

export enum IdentityVerificationChallenge {
  OTP_EMAIL = "OTP_EMAIL",
  OTP_SMS = "OTP_SMS",
  SECURITY_QUESTIONS = "SECURITY_QUESTIONS",
  DOCUMENT_UPLOAD = "DOCUMENT_UPLOAD",
  VIDEO_CALL = "VIDEO_CALL",
  IN_PERSON = "IN_PERSON",
}

export enum FederationAttributeMapping {
  MAP = "MAP",
  IGNORE = "IGNORE",
  REQUIRED = "REQUIRED",
  OPTIONAL = "OPTIONAL",
  TRANSFORM = "TRANSFORM",
}

export enum DIDVerificationRelationship {
  AUTHENTICATION = "AUTHENTICATION",
  ASSERTION_METHOD = "ASSERTION_METHOD",
  KEY_AGREEMENT = "KEY_AGREEMENT",
  CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
  CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION",
}

export enum WalletBackupType {
  SEED_PHRASE = "SEED_PHRASE",
  KEY_FILE = "KEY_FILE",
  CLOUD_BACKUP = "CLOUD_BACKUP",
  SOCIAL_RECOVERY = "SOCIAL_RECOVERY",
  QR_CODE = "QR_CODE",
}

export enum IdentityProviderHealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  DOWN = "DOWN",
  MAINTENANCE = "MAINTENANCE",
}

export interface IdentityLifecycleEvent {
  id: string;
  identityId: string;
  stage: IdentityLifecycleStage;
  eventTimestamp: string;
  actor: string;
  actorType: string;
  reason: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityAttribute {
  id: string;
  identityId: string;
  attributeType: IdentityAttributeType;
  attributeKey: string;
  attributeValue: string;
  isVerified: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
  source: IdentityAttributeSource;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IdentityConsentRecord {
  id: string;
  identityId: string;
  consentType: IdentityConsentType;
  status: ConsentStatus;
  grantedScopes: string[];
  purpose: string;
  thirdPartyRecipients: string[];
  retentionPeriod: number;
  grantedAt: string;
  expiresAt: string | null;
  withdrawnAt: string | null;
  lastReviewedAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityEventLog {
  id: string;
  identityId: string;
  eventType: AuditAction;
  severity: IdentityEventSeverity;
  message: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  schoolId: string;
  timestamp: string;
}

export interface IdentityLockRecord {
  id: string;
  identityId: string;
  lockReason: IdentityLockReason;
  lockedAt: string;
  lockedBy: string;
  unlockMethod: IdentityUnlockMethod | null;
  unlockedAt: string | null;
  unlockedBy: string | null;
  expiresAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityTransferRecord {
  id: string;
  sourceInstitutionId: string;
  targetInstitutionId: string;
  identityId: string;
  status: IdentityTransferStatus;
  initiatedBy: string;
  initiatedAt: string;
  completedAt: string | null;
  dataTransferred: string[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityComplianceRecord {
  id: string;
  identityId: string;
  framework: ComplianceFramework;
  status: IdentityComplianceStatus;
  lastAssessedAt: string;
  nextAssessmentAt: string | null;
  findings: ComplianceFinding[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityVerificationChallengeRecord {
  id: string;
  identityId: string;
  challengeType: IdentityVerificationChallenge;
  status: string;
  initiatedAt: string;
  completedAt: string | null;
  expiresAt: string;
  attempts: number;
  maxAttempts: number;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface FederationAttributeMappingEntry {
  sourceAttribute: string;
  targetAttribute: string;
  mappingType: FederationAttributeMapping;
  transformation: string | null;
  defaultValue: string | null;
  isRequired: boolean;
}

export interface DIDVerificationRelationshipEntry {
  did: string;
  relationship: DIDVerificationRelationship;
  keyId: string;
  isActive: boolean;
}

export interface WalletBackupRecord {
  id: string;
  walletId: string;
  backupType: WalletBackupType;
  backupUrl: string;
  encrypted: boolean;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface IdentityProviderHealth {
  providerId: string;
  providerName: string;
  status: IdentityProviderHealthStatus;
  latency: number;
  lastChecked: string;
  uptime30d: number;
  errorRate: number;
}

export interface IdentityBulkProvisionRequest {
  sourceFormat: string;
  sourceUrl: string;
  identityType: string;
  defaultProvider: IdentityProvider;
  defaultProtocol: IdentityProtocol;
  conflictResolution: ConflictResolution;
  dryRun: boolean;
  schoolId: string;
}

export interface IdentityBulkProvisionResult {
  requestId: string;
  status: string;
  totalRecords: number;
  provisionedCount: number;
  skippedCount: number;
  failedCount: number;
  errors: string[];
  warnings: string[];
  startedAt: string;
  completedAt: string | null;
  schoolId: string;
}

export interface IdentitySearchFilter {
  field: string;
  operator: string;
  value: unknown;
  type: string;
}

export interface IdentitySearchSort {
  field: string;
  direction: string;
}

export interface IdentitySearchRequest {
  query: string;
  filters: IdentitySearchFilter[];
  sort: IdentitySearchSort[];
  page: number;
  pageSize: number;
  schoolId: string;
}

export interface IdentitySearchResponse {
  results: GlobalEducationIdentity[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, Record<string, number>>;
}

export interface IdentityAuditSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  recentEvents: IdentityEventLog[];
  period: string;
  schoolId: string;
}

export interface FederationTrustStatus {
  federationId: string;
  federationName: string;
  trustLevel: TrustLevel;
  isActive: boolean;
  lastSyncAt: string | null;
  memberCount: number;
  healthyMembers: number;
  unhealthyMembers: number;
}

export interface IdentityDashboardMetrics {
  totalIdentities: number;
  activeIdentities: number;
  pendingVerifications: number;
  failedVerifications: number;
  lockedIdentities: number;
  recentActivity: IdentityEventLog[];
  topProviders: Record<string, number>;
  topProtocols: Record<string, number>;
  complianceStatus: Record<string, string>;
  period: string;
  schoolId: string;
}

export interface IdentityExportFormat {
  format: string;
  includesMetadata: boolean;
  includesAuditLog: boolean;
  includesVerificationStatus: boolean;
  encrypted: boolean;
}

export interface IdentityImportFormat {
  format: string;
  encoding: string;
  delimiter: string | null;
  hasHeader: boolean;
  fieldMapping: Record<string, string>;
}

export interface IdentityBatchOperation {
  id: string;
  operationType: string;
  identityIds: string[];
  status: string;
  initiatedBy: string;
  initiatedAt: string;
  completedAt: string | null;
  results: IdentityBatchOperationResult[];
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityBatchOperationResult {
  identityId: string;
  status: string;
  error: string | null;
  changes: Record<string, unknown>;
}

export interface IdentityTokenIntrospection {
  active: boolean;
  scope: string;
  client_id: string;
  username: string;
  token_type: string;
  exp: number;
  iat: number;
  sub: string;
  aud: string;
  iss: string;
  jti: string;
  identity_id: string;
  school_id: string;
}

export interface IdentitySessionRecord {
  id: string;
  identityId: string;
  sessionToken: string;
  status: SessionStatus;
  ipAddress: string;
  userAgent: string;
  deviceInfo: string;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string;
  terminatedAt: string | null;
  schoolId: string;
}

export interface IdentityPermissionEntry {
  id: string;
  identityId: string;
  permission: string;
  scope: string;
  grantedAt: string;
  expiresAt: string | null;
  grantedBy: string;
  isActive: boolean;
  schoolId: string;
}

export enum IdentityMFAStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
  SETUP_IN_PROGRESS = "SETUP_IN_PROGRESS",
  RECOVERY = "RECOVERY",
}

export enum IdentityTOTPStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  NOT_SETUP = "NOT_SETUP",
}

export enum IdentityBackupCodeStatus {
  ACTIVE = "ACTIVE",
  EXHAUSTED = "EXHAUSTED",
  REVOKED = "REVOKED",
  NOT_SETUP = "NOT_SETUP",
}

export enum IdentityWebAuthnStatus {
  REGISTERED = "REGISTERED",
  NOT_REGISTERED = "NOT_REGISTERED",
  FAILED = "FAILED",
}

export enum IdentityOAuthGrantType {
  AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
  CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  IMPLICIT = "IMPLICIT",
  DEVICE_CODE = "DEVICE_CODE",
}

export enum IdentityOIDCScope {
  OPENID = "OPENID",
  PROFILE = "PROFILE",
  EMAIL = "EMAIL",
  ADDRESS = "ADDRESS",
  PHONE = "PHONE",
  OFFLINE_ACCESS = "OFFLINE_ACCESS",
}

export enum IdentitySAMLNameIDFormat {
  EMAIL_ADDRESS = "EMAIL_ADDRESS",
  TRANSIENT = "TRANSIENT",
  PERSISTENT = "PERSISTENT",
  UNSPECIFIED = "UNSPECIFIED",
  X509_SUBJECT = "X509_SUBJECT",
}

export enum IdentitySCIMResourceType {
  USER = "USER",
  GROUP = "GROUP",
  ENTERPRISE_USER = "ENTERPRISE_USER",
}

export enum IdentityDIDCommMessageType {
  REQUEST = "REQUEST",
  RESPONSE = "RESPONSE",
  ACK = "ACK",
  PROBLEM_REPORT = "PROBLEM_REPORT",
}

export enum IdentityVerifiablePresentationType {
  VERIFIABLE_PRESENTATION = "VERIFIABLE_PRESENTATION",
  AUTHENTICATED_VERIFIABLE_PRESENTATION = "AUTHENTICATED_VERIFIABLE_PRESENTATION",
}

export enum IdentityKeyRecoveryMethod {
  SEED_BACKUP = "SEED_BACKUP",
  SOCIAL_RECOVERY = "SOCIAL_RECOVERY",
  INSTITUTIONAL = "INSTITUTIONAL",
  HARDWARE_TOKEN = "HARDWARE_TOKEN",
  SHAMIR_SECRET_SHARING = "SHAMIR_SECRET_SHARING",
}

export interface IdentityMFAConfiguration {
  id: string;
  identityId: string;
  status: IdentityMFAStatus;
  totpStatus: IdentityTOTPStatus;
  backupCodeStatus: IdentityBackupCodeStatus;
  webAuthnStatus: IdentityWebAuthnStatus;
  allowedMethods: BiometricType[];
  enforced: boolean;
  gracePeriod: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityOAuthToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string | null;
  scope: string;
  idToken: string | null;
  issuedAt: string;
  expiresAt: string;
  identityId: string;
  sessionId: string;
}

export interface IdentityOIDCClaims {
  sub: string;
  name: string;
  givenName: string | null;
  familyName: string | null;
  email: string | null;
  emailVerified: boolean | null;
  phone: string | null;
  phoneVerified: boolean | null;
  picture: string | null;
  locale: string | null;
  zoneinfo: string | null;
  updatedAt: number | null;
  identityId: string;
  schoolId: string;
}

export interface IdentitySAMLAssertion {
  id: string;
  issueInstant: string;
  issuer: string;
  subject: string;
  nameIdFormat: IdentitySAMLNameIDFormat;
  conditions: SAMLConditions;
  attributes: SAMLAttribute[];
  authnStatement: SAMLAuthnStatement;
  signature: string;
  schoolId: string;
}

export interface SAMLConditions {
  notBefore: string;
  notOnOrAfter: string;
  audienceRestriction: string[];
}

export interface SAMLAttribute {
  name: string;
  nameFormat: string;
  values: string[];
}

export interface SAMLAuthnStatement {
  authnInstant: string;
  sessionIndex: string;
  authnContextClassRef: string;
}

export interface IdentitySCIMUser {
  id: string;
  externalId: string;
  userName: string;
  name: SCIMName;
  displayName: string;
  emails: SCIMEmail[];
  phoneNumbers: SCIMPhone[];
  active: boolean;
  groups: SCIMGroup[];
  enterprise: SCIMEnterpriseUser | null;
  schoolId: string;
  meta: SCIMMeta;
}

export interface SCIMName {
  formatted: string;
  familyName: string;
  givenName: string;
  middleName: string | null;
}

export interface SCIMEmail {
  value: string;
  type: string;
  primary: boolean;
}

export interface SCIMPhone {
  value: string;
  type: string;
  primary: boolean;
}

export interface SCIMGroup {
  value: string;
  display: string;
  type: string;
}

export interface SCIMEnterpriseUser {
  employeeNumber: string | null;
  department: string | null;
  organization: string | null;
  title: string | null;
  manager: SCIMManager | null;
}

export interface SCIMManager {
  value: string;
  display: string;
  ref: string;
}

export interface SCIMMeta {
  resourceType: string;
  created: string;
  lastModified: string;
  location: string;
  version: string;
}

export interface IdentityDIDCommMessage {
  id: string;
  type: IdentityDIDCommMessageType;
  from: string;
  to: string;
  createdTime: string;
  expiresTime: string | null;
  body: Record<string, unknown>;
  attachments: DIDCommAttachment[];
  schoolId: string;
}

export interface DIDCommAttachment {
  id: string;
  filename: string;
  mimeType: string;
  data: string;
  description: string | null;
}

export interface IdentityVerifiablePresentation {
  id: string;
  type: IdentityVerifiablePresentationType;
  holder: string;
  verifiableCredential: VerifiableCredentialRef[];
  proof: W3CProof | null;
  challenge: string | null;
  domain: string | null;
  schoolId: string;
  createdAt: string;
}

export interface W3CProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
  jws: string;
}

export interface IdentityKeyRecoveryPlan {
  id: string;
  identityId: string;
  method: IdentityKeyRecoveryMethod;
  isActive: boolean;
  shares: KeyRecoveryShare[];
  threshold: number;
  createdAt: string;
  updatedAt: string;
  schoolId: string;
}

export interface KeyRecoveryShare {
  shareIndex: number;
  recipientId: string;
  recipientType: string;
  encryptedShare: string;
  createdAt: string;
}

export interface IdentityFederatedAttributeMapping {
  id: string;
  federationId: string;
  sourceAttribute: string;
  targetAttribute: string;
  transformation: string | null;
  defaultValue: string | null;
  isRequired: boolean;
  isActive: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityPasswordHistoryEntry {
  id: string;
  identityId: string;
  passwordHash: string;
  algorithm: string;
  createdAt: string;
  isActive: boolean;
}

export interface IdentitySecurityIncident {
  id: string;
  identityId: string;
  incidentType: ThreatType;
  severity: RiskAssessment;
  detectedAt: string;
  resolvedAt: string | null;
  description: string;
  actions: string[];
  reportedBy: string;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityRateLimitRecord {
  id: string;
  identityId: string;
  endpoint: string;
  requestCount: number;
  windowStart: string;
  windowEnd: string;
  limitExceeded: boolean;
  schoolId: string;
}

export interface IdentityAuditTrailSummary {
  identityId: string;
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsByActor: Record<string, number>;
  lastActivityAt: string;
  firstActivityAt: string;
  schoolId: string;
}

export interface IdentityComplianceCheckResult {
  framework: ComplianceFramework;
  status: IdentityComplianceStatus;
  score: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  findings: ComplianceFinding[];
  checkedAt: string;
  schoolId: string;
}

export interface ComplianceFinding {
  ruleId: string;
  ruleName: string;
  status: string;
  severity: string;
  message: string;
  recommendation: string;
}

export interface IdentityFederationHealthRecord {
  federationId: string;
  status: HealthStatus;
  memberStatus: Record<string, string>;
  lastHealthCheck: string;
  uptime: number;
  latency: number;
  errorRate: number;
  schoolId: string;
}

export interface IdentityTokenRevocationRequest {
  token: string;
  tokenType: string;
  reason: string;
  revokedBy: string;
  schoolId: string;
}

export interface IdentityTokenRevocationResult {
  revoked: boolean;
  tokenType: string;
  revokedAt: string;
  message: string;
}

export interface IdentityBulkDeactivationRequest {
  identityIds: string[];
  reason: string;
  notifyUsers: boolean;
  retainData: boolean;
  schoolId: string;
}

export interface IdentityBulkDeactivationResult {
  requestCount: number;
  deactivatedCount: number;
  failedCount: number;
  errors: string[];
  completedAt: string;
  schoolId: string;
}

export interface IdentityMigrationPlan {
  id: string;
  sourceProvider: IdentityProvider;
  targetProvider: IdentityProvider;
  strategy: MigrationStrategy;
  identityCount: number;
  status: string;
  scheduledAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  schoolId: string;
  metadata: Record<string, unknown>;
}

export interface IdentityMigrationResult {
  planId: string;
  totalMigrated: number;
  successCount: number;
  failureCount: number;
  errors: string[];
  warnings: string[];
  completedAt: string;
  schoolId: string;
}

export interface IdentityConsentRequest {
  identityId: string;
  consentType: IdentityConsentType;
  scopes: string[];
  purpose: string;
  duration: number | null;
  thirdPartyRecipients: string[];
  schoolId: string;
}

export interface IdentityConsentResponse {
  consentId: string;
  status: ConsentStatus;
  grantedAt: string;
  expiresAt: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityDelegationRequest {
  delegatorId: string;
  delegateeId: string;
  delegationType: DelegationType;
  scopes: string[];
  restrictions: string[];
  startDate: string;
  endDate: string | null;
  requiresConsent: boolean;
  schoolId: string;
}

export interface IdentityDelegationResponse {
  delegationId: string;
  status: string;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityRecoveryRequest {
  identityId: string;
  recoveryMethod: RecoveryMethod;
  contactValue: string;
  schoolId: string;
}

export interface IdentityRecoveryResponse {
  recoveryId: string;
  status: string;
  verificationSteps: string[];
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityProfileUpdateRequest {
  identityId: string;
  attributes: Record<string, unknown>;
  reason: string;
  schoolId: string;
}

export interface IdentityProfileUpdateResult {
  updated: boolean;
  changedFields: string[];
  updatedAt: string;
  requiresVerification: boolean;
  metadata: Record<string, unknown>;
}

export interface IdentityTokenIntrospectionResult {
  active: boolean;
  scope: string;
  clientId: string;
  username: string;
  tokenType: string;
  exp: number;
  iat: number;
  nbf: number;
  sub: string;
  aud: string;
  iss: string;
  jti: string;
  identityId: string;
  schoolId: string;
  sessionId: string;
}

export interface IdentitySessionCreateRequest {
  identityId: string;
  ipAddress: string;
  userAgent: string;
  deviceInfo: string;
  rememberMe: boolean;
  schoolId: string;
}

export interface IdentitySessionCreateResult {
  sessionId: string;
  sessionToken: string;
  expiresAt: string;
  accessToken: string;
  refreshToken: string;
  metadata: Record<string, unknown>;
}

export interface IdentitySessionTerminateRequest {
  sessionId: string;
  reason: string;
  schoolId: string;
}

export interface IdentitySessionTerminateResult {
  terminated: boolean;
  terminatedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityPasswordChangeRequest {
  identityId: string;
  currentPassword: string;
  newPassword: string;
  schoolId: string;
}

export interface IdentityPasswordChangeResult {
  changed: boolean;
  changedAt: string;
  requireLogout: boolean;
  metadata: Record<string, unknown>;
}

export interface IdentityPasswordResetRequest {
  email: string;
  schoolId: string;
}

export interface IdentityPasswordResetResult {
  resetToken: string;
  expiresAt: string;
  message: string;
}

export interface IdentityPasswordResetConfirmRequest {
  token: string;
  newPassword: string;
  schoolId: string;
}

export interface IdentityPasswordResetConfirmResult {
  reset: boolean;
  resetAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityMFASetupRequest {
  identityId: string;
  method: BiometricType;
  schoolId: string;
}

export interface IdentityMFASetupResult {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityMFAVerifyRequest {
  identityId: string;
  code: string;
  method: BiometricType;
  schoolId: string;
}

export interface IdentityMFAVerifyResult {
  verified: boolean;
  verifiedAt: string;
  trustDuration: number | null;
  metadata: Record<string, unknown>;
}

export interface IdentityMFARecoveryRequest {
  identityId: string;
  backupCode: string;
  schoolId: string;
}

export interface IdentityMFARecoveryResult {
  recovered: boolean;
  newBackupCodes: string[];
  recoveredAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityAttributeUpdateRequest {
  identityId: string;
  attributeType: IdentityAttributeType;
  attributeKey: string;
  attributeValue: string;
  schoolId: string;
}

export interface IdentityAttributeUpdateResult {
  updated: boolean;
  attributeId: string;
  updatedAt: string;
  requiresVerification: boolean;
  metadata: Record<string, unknown>;
}

export interface IdentityAttributeVerifyRequest {
  identityId: string;
  attributeId: string;
  verificationMethod: VerificationMethod;
  schoolId: string;
}

export interface IdentityAttributeVerifyResult {
  verified: boolean;
  verifiedAt: string;
  verificationMethod: VerificationMethod;
  metadata: Record<string, unknown>;
}

export interface IdentityAuditLogRequest {
  identityId: string;
  dateFrom: string;
  dateTo: string;
  eventTypes: AuditAction[];
  page: number;
  pageSize: number;
  schoolId: string;
}

export interface IdentityAuditLogResult {
  entries: IdentityAuditEntry[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface IdentityComplianceReportRequest {
  framework: ComplianceFramework;
  dateFrom: string;
  dateTo: string;
  includeDetails: boolean;
  schoolId: string;
}

export interface IdentityComplianceReportResult {
  reportId: string;
  framework: ComplianceFramework;
  status: IdentityComplianceStatus;
  score: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  findings: ComplianceFinding[];
  generatedAt: string;
  schoolId: string;
}

export interface IdentitySearchByAttributeRequest {
  attributeType: IdentityAttributeType;
  attributeKey: string;
  attributeValue: string;
  exactMatch: boolean;
  schoolId: string;
}

export interface IdentitySearchByAttributeResult {
  identities: GlobalEducationIdentity[];
  totalCount: number;
  searchTime: number;
}

export interface IdentityFederationJoinRequest {
  federationId: string;
  providerId: string;
  providerName: string;
  protocol: IdentityProtocol;
  metadata: Record<string, unknown>;
}

export interface IdentityFederationJoinResult {
  membershipId: string;
  status: string;
  trustLevel: TrustLevel;
  joinedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityFederationLeaveRequest {
  federationId: string;
  membershipId: string;
  reason: string;
  schoolId: string;
}

export interface IdentityFederationLeaveResult {
  left: boolean;
  leftAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityConsentGrantRequest {
  identityId: string;
  consentType: IdentityConsentType;
  scopes: string[];
  purpose: string;
  duration: number | null;
  thirdPartyRecipients: string[];
  schoolId: string;
}

export interface IdentityConsentGrantResult {
  consentId: string;
  status: ConsentStatus;
  grantedAt: string;
  expiresAt: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityConsentWithdrawRequest {
  identityId: string;
  consentId: string;
  reason: string;
  schoolId: string;
}

export interface IdentityConsentWithdrawResult {
  withdrawn: boolean;
  withdrawnAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityDelegationCreateRequest {
  delegatorId: string;
  delegateeId: string;
  delegationType: DelegationType;
  scopes: string[];
  restrictions: string[];
  startDate: string;
  endDate: string | null;
  requireConsent: boolean;
  schoolId: string;
}

export interface IdentityDelegationCreateResult {
  delegationId: string;
  status: string;
  createdAt: string;
  expiresAt: string | null;
  metadata: Record<string, unknown>;
}

export interface IdentityDelegationRevokeRequest {
  delegationId: string;
  reason: string;
  revokedBy: string;
  schoolId: string;
}

export interface IdentityDelegationRevokeResult {
  revoked: boolean;
  revokedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityRecoveryInitiateRequest {
  identityId: string;
  recoveryMethod: RecoveryMethod;
  contactValue: string;
  schoolId: string;
}

export interface IdentityRecoveryInitiateResult {
  recoveryId: string;
  status: string;
  verificationSteps: string[];
  expiresAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityRecoveryCompleteRequest {
  recoveryId: string;
  verificationCode: string;
  newPassword: string | null;
  schoolId: string;
}

export interface IdentityRecoveryCompleteResult {
  completed: boolean;
  identityId: string;
  completedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityDeactivateRequest {
  identityId: string;
  reason: string;
  retainData: boolean;
  notifyUser: boolean;
  schoolId: string;
}

export interface IdentityDeactivateResult {
  deactivated: boolean;
  deactivatedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityReactivateRequest {
  identityId: string;
  reason: string;
  schoolId: string;
}

export interface IdentityReactivateResult {
  reactivated: boolean;
  reactivatedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityDeleteRequest {
  identityId: string;
  reason: string;
  confirmIdentity: boolean;
  schoolId: string;
}

export interface IdentityDeleteResult {
  deleted: boolean;
  deletedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityExportRequest {
  identityIds: string[];
  format: string;
  includeMetadata: boolean;
  includeAuditLog: boolean;
  encrypted: boolean;
  schoolId: string;
}

export interface IdentityExportResult {
  exportId: string;
  downloadUrl: string;
  fileSize: number;
  expiresAt: string;
  identityCount: number;
  metadata: Record<string, unknown>;
}

export interface IdentityImportRequest {
  sourceFormat: string;
  sourceUrl: string;
  mappingConfig: Record<string, unknown>;
  conflictResolution: ConflictResolution;
  dryRun: boolean;
  schoolId: string;
}

export interface IdentityImportResult {
  importId: string;
  status: string;
  totalRecords: number;
  importedCount: number;
  skippedCount: number;
  failedCount: number;
  errors: string[];
  warnings: string[];
  metadata: Record<string, unknown>;
}

export interface IdentityBulkStatusUpdateRequest {
  identityIds: string[];
  newStatus: IdentityStatus;
  reason: string;
  schoolId: string;
}

export interface IdentityBulkStatusUpdateResult {
  requestCount: number;
  updatedCount: number;
  failedCount: number;
  errors: string[];
  completedAt: string;
  schoolId: string;
}

export interface IdentityCrossPlatformLinkRequest {
  identityId: string;
  targetPlatform: string;
  targetIdentifier: string;
  linkingMethod: LinkingMethod;
  schoolId: string;
}

export interface IdentityCrossPlatformLinkResult {
  linkId: string;
  status: string;
  linkedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityCrossPlatformUnlinkRequest {
  linkId: string;
  reason: string;
  schoolId: string;
}

export interface IdentityCrossPlatformUnlinkResult {
  unlinked: boolean;
  unlinkedAt: string;
  metadata: Record<string, unknown>;
}

export interface IdentityResolutionRequest {
  queryType: string;
  queryValue: string;
  resolutionMethod: ResolutionMethod;
  schoolId: string;
}

export interface IdentityResolutionResult {
  resolutionId: string;
  identityId: string;
  confidence: number;
  trustLevel: TrustLevel;
  resolvedAt: string;
  metadata: Record<string, unknown>;
}
