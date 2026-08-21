export enum CredentialType {
  DEGREE = 'DEGREE',
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
  LICENSE = 'LICENSE',
  BADGE = 'BADGE',
  TRANSCRIPT = 'TRANSCRIPT',
  MICRO_CREDENTIAL = 'MICRO_CREDENTIAL',
  DIGITAL_BADGE = 'DIGITAL_BADGE',
  VERIFIABLE_CREDENTIAL = 'VERIFIABLE_CREDENTIAL',
  PROFESSIONAL_CERTIFICATION = 'PROFESSIONAL_CERTIFICATION',
  SKILL_CERTIFICATION = 'SKILL_CERTIFICATION',
  EMPLOYMENT_RECORD = 'EMPLOYMENT_RECORD',
  EXPERIENCE_RECORD = 'EXPERIENCE_RECORD',
  TRAINING_RECORD = 'TRAINING_RECORD',
  ACHIEVEMENT = 'ACHIEVEMENT',
  PORTFOLIO = 'PORTFOLIO',
  RECOMMENDATION = 'RECOMMENDATION',
  COMPETENCY = 'COMPETENCY',
  LEARNING_RECORD = 'LEARNING_RECORD',
  COMPLIANCE = 'COMPLIANCE',
}

export enum CredentialStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  ARCHIVED = 'ARCHIVED',
}

export enum WalletType {
  PERSONAL = 'PERSONAL',
  PROFESSIONAL = 'PROFESSIONAL',
  ACADEMIC = 'ACADEMIC',
  EMPLOYMENT = 'EMPLOYMENT',
  COMPLIANCE = 'COMPLIANCE',
  CAREER = 'CAREER',
  PORTFOLIO = 'PORTFOLIO',
  DIGITAL_IDENTITY = 'DIGITAL_IDENTITY',
  SHARED = 'SHARED',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
}

export enum SharingScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  EMPLOYER = 'EMPLOYER',
  SPECIFIC_ORGANIZATION = 'SPECIFIC_ORGANIZATION',
  VERIFIER_ONLY = 'VERIFIER_ONLY',
  NETWORK = 'NETWORK',
  SELECTIVE = 'SELECTIVE',
  TIME_LIMITED = 'TIME_LIMITED',
  CONDITIONAL = 'CONDITIONAL',
  ANONYMOUS = 'ANONYMOUS',
}

export enum PrivacyLevel {
  FULL公开 = 'FULL公开',
  PARTIAL = 'PARTIAL',
  MINIMAL = 'MINIMAL',
  ZERO_KNOWLEDGE = 'ZERO_KNOWLEDGE',
  SELECTIVE_DISCLOSURE = 'SELECTIVE_DISCLOSURE',
  ANONYMOUS = 'ANONYMOUS',
  PSEUDONYMOUS = 'PSEUDONYMOUS',
  ENCRYPTED = 'ENCRYPTED',
  HASHED = 'HASHED',
  HIDDEN = 'HIDDEN',
}

export enum ConsentStatus {
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  PENDING = 'PENDING',
  WITHDRAWN = 'WITHDRAWN',
  EXPIRED = 'EXPIRED',
  PARTIAL = 'PARTIAL',
  CONDITIONAL = 'CONDITIONAL',
  REVOKED = 'REVOKED',
  RENEWED = 'RENEWED',
  AUTO_RENEWED = 'AUTO_RENEWED',
}

export enum ExpiryAction {
  RENEW = 'RENEW',
  REVOKE = 'REVOKE',
  ARCHIVE = 'ARCHIVE',
  NOTIFY = 'NOTIFY',
  GRACE_PERIOD = 'GRACE_PERIOD',
  AUTO_RENEW = 'AUTO_RENEW',
  FLAG = 'FLAG',
  SUSPEND = 'SUSPEND',
  ESCALATE = 'ESCALATE',
  DEACTIVATE = 'DEACTIVATE',
}

export enum VerificationMethod {
  QR_CODE = 'QR_CODE',
  BLOCKCHAIN = 'BLOCKCHAIN',
  DIGITAL_SIGNATURE = 'DIGITAL_SIGNATURE',
  API = 'API',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  MANUAL = 'MANUAL',
  BIOMETRIC = 'BIOMETRIC',
  NFC = 'NFC',
  MULTI_FACTOR = 'MULTI_FACTOR',
}

export enum RevocationReason {
  COMPROMISED = 'COMPROMISED',
  SUPERSEDED = 'SUPERSEDED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FRAUD = 'FRAUD',
  ERROR = 'ERROR',
  EXPIRED = 'EXPIRED',
  REQUESTED = 'REQUESTED',
  POLICY_VIOLATION = 'POLICY_VIOLATION',
  INACTIVITY = 'INACTIVITY',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
}

export enum CredentialFormat {
  JSON_LD = 'JSON_LD',
  CBOR = 'CBOR',
  JWT = 'JWT',
  PDF = 'PDF',
  XML = 'XML',
  PNG = 'PNG',
  SVG = 'SVG',
  HTML = 'HTML',
  CSV = 'CSV',
  CUSTOM = 'CUSTOM',
}

export enum WalletSecurityLevel {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ENHANCED = 'ENHANCED',
  HIGH = 'HIGH',
  MAXIMUM = 'MAXIMUM',
  BIOMETRIC = 'BIOMETRIC',
  HARDWARE = 'HARDWARE',
  MULTI_SIG = 'MULTI_SIG',
  SOCIAL_RECOVERY = 'SOCIAL_RECOVERY',
  INSTITUTIONAL = 'INSTITUTIONAL',
}

export enum CredentialIssuerType {
  UNIVERSITY = 'UNIVERSITY',
  COLLEGE = 'COLLEGE',
  SCHOOL = 'SCHOOL',
  TRAINING_PROVIDER = 'TRAINING_PROVIDER',
  EMPLOYER = 'EMPLOYER',
  GOVERNMENT = 'GOVERNMENT',
  PROFESSIONAL_BODY = 'PROFESSIONAL_BODY',
  INDUSTRY_CONSORTIUM = 'INDUSTRY_CONSORTIUM',
  PLATFORM = 'PLATFORM',
  SELF_ISSUED = 'SELF_ISSUED',
}

export enum CredentialCategory {
  EDUCATION = 'EDUCATION',
  EMPLOYMENT = 'EMPLOYMENT',
  SKILL = 'SKILL',
  TRAINING = 'TRAINING',
  COMPLIANCE = 'COMPLIANCE',
  IDENTITY = 'IDENTITY',
  ACHIEVEMENT = 'ACHIEVEMENT',
  RECOMMENDATION = 'RECOMMENDATION',
  PORTFOLIO = 'PORTFOLIO',
  LICENSE = 'LICENSE',
}

export enum SharingFormat {
  URL = 'URL',
  QR_CODE = 'QR_CODE',
  PDF = 'PDF',
  JSON = 'JSON',
  EMAIL = 'EMAIL',
  EMBED = 'EMBED',
  PRINT = 'PRINT',
  NFC = 'NFC',
  BLOCKCHAIN = 'BLOCKCHAIN',
  API = 'API',
}

export enum ConsentScope {
  ONE_TIME = 'ONE_TIME',
  SESSION = 'SESSION',
  LIMITED = 'LIMITED',
  UNLIMITED = 'UNLIMITED',
  PURPOSE_LIMITED = 'PURPOSE_LIMITED',
  TIME_LIMITED = 'TIME_LIMITED',
  RECURRING = 'RECURRING',
  CONDITIONAL = 'CONDITIONAL',
  DELEGATED = 'DELEGATED',
  WITHDRAWABLE = 'WITHDRAWABLE',
}

export enum VerificationResult {
  VALID = 'VALID',
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED',
  NOT_FOUND = 'NOT_FOUND',
  TAMPERED = 'TAMPERED',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  UNVERIFIABLE = 'UNVERIFIABLE',
}

export enum PassportStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  MIGRATED = 'MIGRATED',
  LOCKED = 'LOCKED',
  DEACTIVATED = 'DEACTIVATED',
}

export enum CareerMilestoneType {
  EDUCATION = 'EDUCATION',
  EMPLOYMENT = 'EMPLOYMENT',
  CERTIFICATION = 'CERTIFICATION',
  ACHIEVEMENT = 'ACHIEVEMENT',
  SKILL = 'SKILL',
  PROJECT = 'PROJECT',
  PROMOTION = 'PROMOTION',
  TRAINING = 'TRAINING',
  PUBLICATION = 'PUBLICATION',
  AWARD = 'AWARD',
}

export enum DigitalBadgeType {
  SKILL = 'SKILL',
  ACHIEVEMENT = 'ACHIEVEMENT',
  COMPLETION = 'COMPLETION',
  PARTICIPATION = 'PARTICIPATION',
  LEADERSHIP = 'LEADERSHIP',
  INNOVATION = 'INNOVATION',
  COMMUNITY = 'COMMUNITY',
  MASTERY = 'MASTERY',
  EXCELLENCE = 'EXCELLENCE',
  CUSTOM = 'CUSTOM',
}

export enum WalletIntegration {
  LINKEDIN = 'LINKEDIN',
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
  APPLE = 'APPLE',
  HRIS = 'HRIS',
  ATS = 'ATS',
  LMS = 'LMS',
  SSO = 'SSO',
  OPENID = 'OPENID',
  SAML = 'SAML',
}

export enum CredentialEncryption {
  AES_256 = 'AES_256',
  RSA = 'RSA',
  ECC = 'ECC',
  CHACHA20 = 'CHACHA20',
  HYBRID = 'HYBRID',
  QUANTUM_RESISTANT = 'QUANTUM_RESISTANT',
  NONE = 'NONE',
  END_TO_END = 'END_TO_END',
  AT_REST = 'AT_REST',
  IN_TRANSIT = 'IN_TRANSIT',
}

export enum WalletBackupType {
  CLOUD = 'CLOUD',
  LOCAL = 'LOCAL',
  HARDWARE = 'HARDWARE',
  SOCIAL = 'SOCIAL',
  MULTISIG = 'MULTISIG',
  PAPER = 'PAPER',
  RECOVERY_PHRASE = 'RECOVERY_PHRASE',
  BIOMETRIC = 'BIOMETRIC',
  INSTITUTIONAL = 'INSTITUTIONAL',
  HYBRID = 'HYBRID',
}

export enum CredentialClaimType {
  SELF_CLAIMED = 'SELF_CLAIMED',
  ISSUER_ASSERTED = 'ISSUER_ASSERTED',
  THIRD_PARTY_VERIFIED = 'THIRD_PARTY_VERIFIED',
  BLOCKCHAIN_ANCHORED = 'BLOCKCHAIN_ANCHORED',
  AI_VALIDATED = 'AI_VALIDATED',
  PEER_CONFIRMED = 'PEER_CONFIRMED',
  AUTOMATED = 'AUTOMATED',
  MANUAL = 'MANUAL',
  ORACLE = 'ORACLE',
  HYBRID = 'HYBRID',
}

export enum PassportSection {
  PERSONAL = 'PERSONAL',
  EDUCATION = 'EDUCATION',
  EMPLOYMENT = 'EMPLOYMENT',
  SKILLS = 'SKILLS',
  CERTIFICATIONS = 'CERTIFICATIONS',
  TRAINING = 'TRAINING',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  RECOMMENDATIONS = 'RECOMMENDATIONS',
  PORTFOLIO = 'PORTFOLIO',
  ACTIVITY = 'ACTIVITY',
}

export enum CredentialRevocationList {
  BLOCKCHAIN = 'BLOCKCHAIN',
  CENTRALIZED = 'CENTRALIZED',
  DISTRIBUTED = 'DISTRIBUTED',
  HYBRID = 'HYBRID',
  CACHED = 'CACHED',
  REAL_TIME = 'REAL_TIME',
  BATCH = 'BATCH',
  EVENT_DRIVEN = 'EVENT_DRIVEN',
  PERIODIC = 'PERIODIC',
  ON_DEMAND = 'ON_DEMAND',
}

export enum WalletFeature {
  CREDENTIAL_STORAGE = 'CREDENTIAL_STORAGE',
  CREDENTIAL_SHARING = 'CREDENTIAL_SHARING',
  CREDENTIAL_SEARCH = 'CREDENTIAL_SEARCH',
  CREDENTIAL_VERIFICATION = 'CREDENTIAL_VERIFICATION',
  QR_GENERATION = 'QR_GENERATION',
  BACKUP_RESTORE = 'BACKUP_RESTORE',
  MULTI_DEVICE = 'MULTI_DEVICE',
  OFFLINE_ACCESS = 'OFFLINE_ACCESS',
  PUSH_NOTIFICATIONS = 'PUSH_NOTIFICATIONS',
  ANALYTICS = 'ANALYTICS',
}

export enum CredentialTemplate {
  STANDARD = 'STANDARD',
  EXTENDED = 'EXTENDED',
  MINIMAL = 'MINIMAL',
  CUSTOM = 'CUSTOM',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  INDUSTRY = 'INDUSTRY',
  ACADEMIC = 'ACADEMIC',
  PROFESSIONAL = 'PROFESSIONAL',
  GOVERNMENT = 'GOVERNMENT',
  OPEN_BADGE = 'OPEN_BADGE',
}

export enum CredentialRevocationStatus {
  NOT_REVOKED = 'NOT_REVOKED',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  REINSTATED = 'REINSTATED',
  EXPIRED = 'EXPIRED',
  UNKNOWN = 'UNKNOWN',
  ERROR = 'ERROR',
  UNCHECKED = 'UNCHECKED',
}

export enum WalletAccessControl {
  PIN = 'PIN',
  BIOMETRIC = 'BIOMETRIC',
  PASSWORD = 'PASSWORD',
  MULTI_FACTOR = 'MULTI_FACTOR',
  HARDWARE_KEY = 'HARDWARE_KEY',
  SOCIAL_RECOVERY = 'SOCIAL_RECOVERY',
  TIME_LOCK = 'TIME_LOCK',
  GEO_FENCE = 'GEO_FENCE',
  DEVICE_BINDING = 'DEVICE_BINDING',
  INSTITUTIONAL = 'INSTITUTIONAL',
}

export enum CredentialDisplay {
  FULL = 'FULL',
  COMPACT = 'COMPACT',
  MINIMAL = 'MINIMAL',
  CARD = 'CARD',
  LIST = 'LIST',
  GRID = 'GRID',
  TIMELINE = 'TIMELINE',
  MAP = 'MAP',
  DASHBOARD = 'DASHBOARD',
  CUSTOM = 'CUSTOM',
}

export enum CredentialAuditAction {
  VIEWED = 'VIEWED',
  SHARED = 'SHARED',
  VERIFIED = 'VERIFIED',
  DOWNLOADED = 'DOWNLOADED',
  EXPORTED = 'EXPORTED',
  REVOKED = 'REVOKED',
  RENEWED = 'RENEWED',
  MODIFIED = 'MODIFIED',
  DELETED = 'DELETED',
  RESTORED = 'RESTORED',
}

export enum PassportPrivacySetting {
  FULLY_PRIVATE = 'FULLY_PRIVATE',
  SELECTIVE = 'SELECTIVE',
  PUBLIC_EDUCATION = 'PUBLIC_EDUCATION',
  PUBLIC_SKILLS = 'PUBLIC_SKILLS',
  EMPLOYER_VISIBLE = 'EMPLOYER_VISIBLE',
  NETWORK_VISIBLE = 'NETWORK_VISIBLE',
  ANONYMOUS = 'ANONYMOUS',
  CUSTOM = 'CUSTOM',
  GRADUATED = 'GRADUATED',
  DYNAMIC = 'DYNAMIC',
}

export enum CredentialIssuanceMethod {
  DIRECT = 'DIRECT',
  VERIFICATION_REQUIRED = 'VERIFICATION_REQUIRED',
  APPROVAL_REQUIRED = 'APPROVAL_REQUIRED',
  AUTOMATIC = 'AUTOMATIC',
  BATCH = 'BATCH',
  API = 'API',
  WEBHOOK = 'WEBHOOK',
  SSI = 'SSI',
  BLOCKCHAIN = 'BLOCKCHAIN',
  HYBRID = 'HYBRID',
}

export enum WalletRecoveryMethod {
  RECOVERY_PHRASE = 'RECOVERY_PHRASE',
  BIOMETRIC = 'BIOMETRIC',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  SECURITY_QUESTIONS = 'SECURITY_QUESTIONS',
  SOCIAL_RECOVERY = 'SOCIAL_RECOVERY',
  HARDWARE_KEY = 'HARDWARE_KEY',
  INSTITUTIONAL = 'INSTITUTIONAL',
  MULTI_DEVICE = 'MULTI_DEVICE',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
}

export enum ProfessionalCredential {
  id: string;
  school_id: string;
  credential_type: CredentialType;
  credential_id: string;
  holder_id: string;
  holder_name: string;
  issuer_id: string;
  issuer_name: string;
  issuer_type: CredentialIssuerType;
  title: string;
  description: string;
  issued_date: string;
  expiry_date: string;
  status: CredentialStatus;
  format: CredentialFormat;
  credential_data: Record<string, unknown>;
  verification_url: string;
  revocation_url: string;
  proof: CredentialProof;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CredentialProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofValue: string;
  proofPurpose: string;
  jws: string;
}

export interface CareerCredential {
  id: string;
  school_id: string;
  holder_id: string;
  credential_id: string;
  credential_type: CredentialType;
  category: CredentialCategory;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  status: CredentialStatus;
  skills: string[];
  competencies: string[];
  verification_status: VerificationResult;
  sharing_scope: SharingScope;
  privacy_level: PrivacyLevel;
  created_at: string;
  updated_at: string;
}

export interface SkillCredential {
  id: string;
  school_id: string;
  holder_id: string;
  skill_name: string;
  skill_category: string;
  proficiency_level: string;
  issuer_id: string;
  issuer_name: string;
  assessment_score: number;
  assessment_date: string;
  credential_id: string;
  expiry_date: string;
  status: CredentialStatus;
  verified: boolean;
  verification_method: VerificationMethod;
  created_at: string;
  updated_at: string;
}

export interface EmploymentCredential {
  id: string;
  school_id: string;
  holder_id: string;
  employer_id: string;
  employer_name: string;
  position: string;
  department: string;
  start_date: string;
  end_date: string;
  employment_type: string;
  salary_range: string;
  responsibilities: string[];
  achievements: string[];
  supervisor: string;
  reference_contact: string;
  verification_status: VerificationResult;
  credential_id: string;
  status: CredentialStatus;
  created_at: string;
  updated_at: string;
}

export interface ExperienceCredential {
  id: string;
  school_id: string;
  holder_id: string;
  experience_type: string;
  organization: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string;
  duration_months: number;
  skills_developed: string[];
  outcomes: string[];
  verification_contact: string;
  credential_id: string;
  status: CredentialStatus;
  created_at: string;
  updated_at: string;
}

export interface TrainingCertificate {
  id: string;
  school_id: string;
  holder_id: string;
  training_program: string;
  provider: string;
  provider_type: string;
  completion_date: string;
  hours_completed: number;
  score: number;
  grade: string;
  skills_acquired: string[];
  credential_id: string;
  certificate_number: string;
  expiry_date: string;
  status: CredentialStatus;
  created_at: string;
  updated_at: string;
}

export interface DigitalBadge {
  id: string;
  school_id: string;
  holder_id: string;
  badge_type: DigitalBadgeType;
  badge_name: string;
  badge_description: string;
  badge_image_url: string;
  issuer_id: string;
  issuer_name: string;
  issued_date: string;
  criteria: string[];
  skills: string[];
  criteria_url: string;
  expiration_date: string;
  status: CredentialStatus;
  badge_class: string;
  badge_category: string;
  created_at: string;
  updated_at: string;
}

export interface VerifiableCredential {
  id: string;
  school_id: string;
  holder_id: string;
  credential_type: CredentialType;
  issuer_did: string;
  subject_did: string;
  issuance_date: string;
  expiration_date: string;
  credential_schema: string;
  credential_status: CredentialStatus;
  claims: Record<string, unknown>;
  proof: CredentialProof;
  revocation: CredentialRevocation;
  format: CredentialFormat;
  raw_credential: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialWallet {
  id: string;
  school_id: string;
  owner_id: string;
  wallet_name: string;
  wallet_type: WalletType;
  security_level: WalletSecurityLevel;
  credentials: string[];
  credential_count: number;
  encryption_type: CredentialEncryption;
  access_control: WalletAccessControl;
  backup_enabled: boolean;
  backup_type: WalletBackupType;
  backup_date: string;
  integrations: WalletIntegration[];
  features: WalletFeature[];
  multi_device: boolean;
  offline_capable: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CareerWallet {
  id: string;
  school_id: string;
  owner_id: string;
  wallet_name: string;
  career_credential_ids: string[];
  education_credentials: string[];
  employment_credentials: string[];
  skill_credentials: string[];
  training_credentials: string[];
  badge_credentials: string[];
  total_credentials: number;
  sharing_preferences: SharingPreference[];
  privacy_settings: PrivacySettings;
  career_passport_id: string;
  integrations: WalletIntegration[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SharingPreference {
  credential_type: CredentialType;
  default_scope: SharingScope;
  default_privacy: PrivacyLevel;
  require_consent: boolean;
  expiry_days: number;
}

export interface PrivacySettings {
  default_privacy_level: PrivacyLevel;
  profile_visibility: string;
  show_education: boolean;
  show_employment: boolean;
  show_skills: boolean;
  show_certifications: boolean;
  show_portfolio: boolean;
  allow_employer_search: boolean;
  allow_recruiter_contact: boolean;
  anonymous_mode: boolean;
}

export interface CredentialVerificationResult {
  id: string;
  school_id: string;
  credential_id: string;
  verifier_id: string;
  verification_method: VerificationMethod;
  result: VerificationResult;
  verified_at: string;
  verification_details: Record<string, unknown>;
  issuer_confirmed: boolean;
  not_revoked: boolean;
  not_expired: boolean;
  signature_valid: boolean;
  chain_of_trust: string[];
  confidence_score: number;
  created_at: string;
  updated_at: string;
}

export interface CredentialRevocation {
  id: string;
  school_id: string;
  credential_id: string;
  revoker_id: string;
  revocation_reason: RevocationReason;
  revocation_date: string;
  revocation_list_type: CredentialRevocationList;
  revocation_list_url: string;
  effective_date: string;
  notification_sent: boolean;
  comments: string;
  status: CredentialRevocationStatus;
  created_at: string;
  updated_at: string;
}

export interface CredentialExpiration {
  id: string;
  school_id: string;
  credential_id: string;
  expiry_date: string;
  expiry_action: ExpiryAction;
  warning_days: number[];
  last_warning_sent: string;
  renewal_required: boolean;
  renewal_url: string;
  grace_period_days: number;
  grace_period_end: string;
  auto_renew: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialSharing {
  id: string;
  school_id: string;
  credential_id: string;
  sharer_id: string;
  recipient_id: string;
  recipient_organization: string;
  sharing_scope: SharingScope;
  sharing_format: SharingFormat;
  privacy_level: PrivacyLevel;
  consent_id: string;
  share_url: string;
  share_expiry: string;
  view_count: number;
  last_viewed: string;
  download_count: number;
  verification_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialPrivacy {
  id: string;
  school_id: string;
  credential_id: string;
  privacy_level: PrivacyLevel;
  visible_fields: string[];
  hidden_fields: string[];
  selective_disclosure: boolean;
  zero_knowledge_proof: boolean;
  anonymous_credential: boolean;
  pseudonymous: boolean;
  encryption_enabled: boolean;
  data_minimization: boolean;
  purpose_limitation: boolean;
  storage_limitation: boolean;
  created_at: string;
  updated_at: string;
}

export interface CredentialConsent {
  id: string;
  school_id: string;
  credential_id: string;
  holder_id: string;
  consent_scope: ConsentScope;
  consent_status: ConsentStatus;
  purpose: string;
  recipient: string;
  data_fields: string[];
  expiry_date: string;
  last_used: string;
  usage_count: number;
  max_usage: number;
  withdrawal_date: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPassport {
  id: string;
  school_id: string;
  holder_id: string;
  holder_name: string;
  passport_number: string;
  status: PassportStatus;
  sections: PassportSection[];
  education_credentials: string[];
  employment_credentials: string[];
  skill_credentials: string[];
  certification_credentials: string[];
  training_credentials: string[];
  achievement_credentials: string[];
  total_credentials: number;
  verification_level: number;
  privacy_settings: PassportPrivacySetting;
  sharing_preferences: SharingPreference[];
  career_milestones: CareerMilestone[];
  digital_identity: DigitalIdentity;
  qr_code: string;
  blockchain_anchor: string;
  last_synced: string;
  created_at: string;
  updated_at: string;
}

export interface CareerMilestone {
  milestone_id: string;
  milestone_type: CareerMilestoneType;
  title: string;
  description: string;
  date: string;
  credential_id: string;
  organization: string;
  skills: string[];
  significance: string;
}

export interface DigitalIdentity {
  did: string;
  public_key: string;
  key_type: string;
  created_date: string;
  recovery_method: WalletRecoveryMethod;
  verification_level: number;
  biometric_hash: string;
  device_bindings: DeviceBinding[];
}

export interface DeviceBinding {
  device_id: string;
  device_type: string;
  device_name: string;
  bound_date: string;
  last_active: string;
  trusted: boolean;
}

export interface CredentialConfig {
  id: string;
  school_id: string;
  default_credential_format: CredentialFormat;
  default_issuance_method: CredentialIssuanceMethod;
  auto_issuance_enabled: boolean;
  verification_required: boolean;
  expiration_enforced: boolean;
  blockchain_anchoring: boolean;
  template_default: CredentialTemplate;
  encryption_type: CredentialEncryption;
  backup_enabled: boolean;
  backup_type: WalletBackupType;
  sharing_default_scope: SharingScope;
  privacy_default_level: PrivacyLevel;
  consent_required: boolean;
  consent_expiry_days: number;
  notification_settings: Record<string, boolean>;
  integration_settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CredentialMetrics {
  id: string;
  school_id: string;
  total_credentials_issued: number;
  active_credentials: number;
  expired_credentials: number;
  revoked_credentials: number;
  pending_credentials: number;
  total_wallets: number;
  active_wallets: number;
  total_shares: number;
  total_verifications: number;
  avg_verification_time: number;
  verification_success_rate: number;
  credential_types_breakdown: Record<CredentialType, number>;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialIssuance {
  id: string;
  school_id: string;
  credential_id: string;
  issuer_id: string;
  holder_id: string;
  issuance_method: CredentialIssuanceMethod;
  issuance_date: string;
  template_used: CredentialTemplate;
  credential_format: CredentialFormat;
  blockchain_tx: string;
  notification_sent: boolean;
  auto_share: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WalletActivity {
  id: string;
  school_id: string;
  wallet_id: string;
  activity_type: CredentialAuditAction;
  credential_id: string;
  user_id: string;
  ip_address: string;
  device_info: string;
  timestamp: string;
  details: Record<string, unknown>;
  created_at: string;
}

export interface CredentialTemplateConfig {
  id: string;
  school_id: string;
  template_name: string;
  template_type: CredentialTemplate;
  credential_type: CredentialType;
  fields: TemplateField[];
  design: TemplateDesign;
  issuer_logo_url: string;
  issuer_name: string;
  signature_required: boolean;
  blockchain_anchored: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateField {
  field_name: string;
  field_type: string;
  required: boolean;
  display_name: string;
  description: string;
  validation_rules: string[];
  default_value: string;
}

export interface TemplateDesign {
  background_color: string;
  text_color: string;
  font_family: string;
  layout: string;
  logo_position: string;
  border_style: string;
  qr_code_position: string;
}

export interface CredentialBatch {
  id: string;
  school_id: string;
  batch_name: string;
  credential_type: CredentialType;
  template_id: string;
  issuer_id: string;
  total_credentials: number;
  issued_count: number;
  failed_count: number;
  batch_date: string;
  completion_date: string;
  blockchain_tx_batch: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialAuditLog {
  id: string;
  school_id: string;
  credential_id: string;
  action: CredentialAuditAction;
  actor_id: string;
  actor_type: string;
  timestamp: string;
  ip_address: string;
  device_info: string;
  location: string;
  details: Record<string, unknown>;
  created_at: string;
}

export interface CredentialSchema {
  id: string;
  school_id: string;
  schema_name: string;
  schema_type: CredentialType;
  version: string;
  schema_definition: Record<string, unknown>;
  required_fields: string[];
  optional_fields: string[];
  validation_rules: Record<string, unknown>;
  issuer_requirements: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialRevocationListEntry {
  id: string;
  school_id: string;
  credential_id: string;
  revocation_date: string;
  revocation_reason: RevocationReason;
  revocation_list_type: CredentialRevocationList;
  revocation_list_url: string;
  revoked_by: string;
  effective_date: string;
  restored_date: string;
  status: CredentialRevocationStatus;
  created_at: string;
  updated_at: string;
}

export interface WalletBackup {
  id: string;
  school_id: string;
  wallet_id: string;
  backup_type: WalletBackupType;
  backup_date: string;
  backup_size: number;
  encrypted: boolean;
  encryption_key_id: string;
  recovery_phrase_hash: string;
  cloud_storage_url: string;
  local_path: string;
  verified: boolean;
  verification_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialShareLink {
  id: string;
  school_id: string;
  credential_id: string;
  sharer_id: string;
  share_url: string;
  qr_code_url: string;
  expiry_date: string;
  max_views: number;
  current_views: number;
  password_protected: boolean;
  password_hash: string;
  allowed_verifiers: string[];
  audit_trail: CredentialAuditAction[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPassportExport {
  id: string;
  school_id: string;
  passport_id: string;
  export_format: CredentialFormat;
  export_url: string;
  export_date: string;
  file_size: number;
  encrypted: boolean;
  includes_sections: PassportSection[];
  includes_credentials: string[];
  digital_signature: string;
  verification_url: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialVerificationLog {
  id: string;
  school_id: string;
  credential_id: string;
  verifier_id: string;
  verifier_organization: string;
  verification_method: VerificationMethod;
  verification_date: string;
  result: VerificationResult;
  verification_details: Record<string, unknown>;
  confidence_score: number;
  chain_of_trust: string[];
  created_at: string;
  updated_at: string;
}

export interface WalletNotification {
  id: string;
  school_id: string;
  wallet_id: string;
  notification_type: string;
  title: string;
  message: string;
  credential_id: string;
  action_url: string;
  read: boolean;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialSearchIndex {
  id: string;
  school_id: string;
  credential_id: string;
  credential_type: CredentialType;
  title: string;
  issuer: string;
  holder_name: string;
  skills: string[];
  categories: CredentialCategory[];
  issued_date: string;
  expiry_date: string;
  status: CredentialStatus;
  verification_status: VerificationResult;
  search_keywords: string[];
  created_at: string;
  updated_at: string;
}

export interface CredentialTrustChain {
  id: string;
  school_id: string;
  credential_id: string;
  trust_level: number;
  chain: TrustChainLink[];
  root_trust_anchor: string;
  last_verification: string;
  verification_count: number;
  chain_integrity: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrustChainLink {
  issuer_id: string;
  issuer_name: string;
  trust_level: number;
  verification_date: string;
  verification_method: VerificationMethod;
}

export interface CredentialAnalytics {
  id: string;
  school_id: string;
  credential_id: string;
  views: number;
  shares: number;
  downloads: number;
  verifications: number;
  unique_viewers: number;
  top_viewers: string[];
  avg_view_duration: number;
  conversion_rate: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface WalletIntegrationConfig {
  id: string;
  school_id: string;
  wallet_id: string;
  integration_type: WalletIntegration;
  api_key: string;
  webhook_url: string;
  sync_enabled: boolean;
  sync_frequency: string;
  auto_import: boolean;
  auto_export: boolean;
  data_mapping: Record<string, string>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialExpiryNotification {
  id: string;
  school_id: string;
  credential_id: string;
  holder_id: string;
  notification_date: string;
  expiry_date: string;
  days_before_expiry: number;
  notification_channel: string;
  sent: boolean;
  acknowledged: boolean;
  renewal_initiated: boolean;
  created_at: string;
  updated_at: string;
}

export interface CredentialBulkOperation {
  id: string;
  school_id: string;
  operation_type: string;
  credential_type: CredentialType;
  total_items: number;
  processed_items: number;
  failed_items: number;
  operation_date: string;
  completion_date: string;
  errors: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPassportTimeline {
  id: string;
  school_id: string;
  passport_id: string;
  timeline_entries: TimelineEntry[];
  total_entries: number;
  date_range_start: string;
  date_range_end: string;
  created_at: string;
  updated_at: string;
}

export interface TimelineEntry {
  entry_id: string;
  date: string;
  entry_type: CareerMilestoneType;
  title: string;
  description: string;
  credential_id: string;
  organization: string;
  icon: string;
  color: string;
}

export interface CredentialDisplayConfig {
  id: string;
  school_id: string;
  credential_type: CredentialType;
  display_mode: CredentialDisplay;
  fields_to_show: string[];
  fields_to_hide: string[];
  custom_labels: Record<string, string>;
  icon_url: string;
  color_scheme: string;
  layout: string;
  created_at: string;
  updated_at: string;
}

export interface WalletSecurityLog {
  id: string;
  school_id: string;
  wallet_id: string;
  security_event: string;
  severity: string;
  timestamp: string;
  ip_address: string;
  device_info: string;
  location: string;
  details: Record<string, unknown>;
  resolved: boolean;
  resolved_at: string;
  created_at: string;
}

export interface CredentialRecoveryRequest {
  id: string;
  school_id: string;
  wallet_id: string;
  credential_id: string;
  requester_id: string;
  recovery_method: WalletRecoveryMethod;
  request_date: string;
  approval_required: boolean;
  approved: boolean;
  approved_by: string;
  approved_at: string;
  recovery_completed: boolean;
  recovery_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PassportDataSync {
  id: string;
  school_id: string;
  passport_id: string;
  sync_source: string;
  sync_type: string;
  last_sync_date: string;
  next_sync_date: string;
  credentials_synced: number;
  credentials_pending: number;
  sync_errors: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialUsageAnalytics {
  id: string;
  school_id: string;
  credential_type: CredentialType;
  total_issued: number;
  total_active: number;
  total_shared: number;
  total_verified: number;
  avg_shares_per_credential: number;
  avg_verifications_per_credential: number;
  most_viewed_credentials: string[];
  top_sharing_recipients: string[];
  period: string;
  created_at: string;
  updated_at: string;
}

export interface WalletRecoveryPhrase {
  id: string;
  school_id: string;
  wallet_id: string;
  phrase_hash: string;
  phrase_length: number;
  created_date: string;
  last_verified: string;
  verified: boolean;
  backup_locations: string[];
  shamir_shares: number;
  threshold: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialBlockchainAnchor {
  id: string;
  school_id: string;
  credential_id: string;
  blockchain_network: string;
  transaction_hash: string;
  block_number: number;
  timestamp: string;
  gas_used: number;
  confirmation_count: number;
  anchor_status: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPassportShare {
  id: string;
  school_id: string;
  passport_id: string;
  sharer_id: string;
  recipient_id: string;
  recipient_organization: string;
  sections_shared: PassportSection[];
  credentials_shared: string[];
  sharing_scope: SharingScope;
  share_url: string;
  expiry_date: string;
  view_count: number;
  last_viewed: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WalletDeviceManagement {
  id: string;
  school_id: string;
  wallet_id: string;
  device_id: string;
  device_type: string;
  device_name: string;
  os_version: string;
  app_version: string;
  bound_date: string;
  last_active: string;
  trusted: boolean;
  remote_wipe_enabled: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialIssuanceBatch {
  id: string;
  school_id: string;
  batch_name: string;
  issuer_id: string;
  credential_type: CredentialType;
  template_id: string;
  recipient_ids: string[];
  issuance_date: string;
  total_issued: number;
  successful: number;
  failed: number;
  blockchain_batch: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialQualityScore {
  id: string;
  school_id: string;
  credential_id: string;
  quality_score: number;
  completeness_score: number;
  verification_score: number;
  freshness_score: number;
  relevance_score: number;
  issuer_trust_score: number;
  overall_grade: string;
  recommendations: string[];
  calculated_at: string;
  created_at: string;
  updated_at: string;
}

export interface WalletConsentManagement {
  id: string;
  school_id: string;
  wallet_id: string;
  holder_id: string;
  total_consents: number;
  active_consents: number;
  expired_consents: number;
  withdrawn_consents: number;
  consent_history: ConsentRecord[];
  last_review_date: string;
  next_review_date: string;
  created_at: string;
  updated_at: string;
}

export interface ConsentRecord {
  consent_id: string;
  credential_id: string;
  consent_scope: ConsentScope;
  consent_status: ConsentStatus;
  granted_date: string;
  expiry_date: string;
  purpose: string;
  recipient: string;
}

export interface CredentialShareAnalytics {
  id: string;
  school_id: string;
  credential_id: string;
  total_shares: number;
  unique_recipients: number;
  avg_shares_per_period: number;
  top_sharing_formats: SharingFormat[];
  top_sharing_scopes: SharingScope[];
  conversion_from_share: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface WalletBackupVerification {
  id: string;
  school_id: string;
  wallet_id: string;
  backup_id: string;
  verification_date: string;
  verification_method: string;
  backup_integrity: boolean;
  data完整性: boolean;
  test_recovery: boolean;
  recovery_time_seconds: number;
  verification_result: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialComplianceCheck {
  id: string;
  school_id: string;
  credential_id: string;
  compliance_type: string;
  check_date: string;
  result: string;
  issues_found: string[];
  corrective_actions: string[];
  next_check_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPassportAnalytics {
  id: string;
  school_id: string;
  passport_id: string;
  total_views: number;
  unique_viewers: number;
  total_shares: number;
  total_verifications: number;
  profile_completion: number;
  credential_richness: number;
  engagement_score: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface WalletAccessLog {
  id: string;
  school_id: string;
  wallet_id: string;
  access_type: string;
  user_id: string;
  ip_address: string;
  device_info: string;
  location: string;
  timestamp: string;
  success: boolean;
  failure_reason: string;
  created_at: string;
}

export interface CredentialSchemaVersion {
  id: string;
  school_id: string;
  schema_id: string;
  version: string;
  changes: string[];
  created_date: string;
  deprecated: boolean;
  migration_required: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WalletFeatureFlag {
  id: string;
  school_id: string;
  feature_name: string;
  feature_description: string;
  enabled: boolean;
  percentage_rollout: number;
  target_audience: string[];
  min_version: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialEndorsement {
  id: string;
  school_id: string;
  credential_id: string;
  endorser_id: string;
  endorser_name: string;
  endorsement_text: string;
  endorsement_date: string;
  relationship: string;
  verified: boolean;
  public: boolean;
  created_at: string;
  updated_at: string;
}

export interface WalletSocialRecovery {
  id: string;
  school_id: string;
  wallet_id: string;
  guardian_ids: string[];
  guardian_count: number;
  threshold: number;
  recovery_initiated: boolean;
  recovery_initiated_by: string;
  recovery_initiated_at: string;
  approvals_received: number;
  recovery_completed: boolean;
  recovery_completed_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialIssuanceRequest {
  id: string;
  school_id: string;
  requester_id: string;
  credential_type: CredentialType;
  template_id: string;
  evidence: string[];
  justification: string;
  request_date: string;
  reviewed_by: string;
  review_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CareerPassportMilestone {
  id: string;
  school_id: string;
  passport_id: string;
  milestone_type: CareerMilestoneType;
  title: string;
  description: string;
  achieved_date: string;
  credential_id: string;
  organization: string;
  skills: string[];
  significance: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}
