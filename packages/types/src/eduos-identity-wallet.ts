// Phase 3.4 - Module 3: Digital Identity Enums
export enum IdentityType {
  NATIONAL = 'NATIONAL',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  SCHOOL = 'SCHOOL',
  ORGANIZATION = 'ORGANIZATION',
}

export enum IdentityStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
}

export enum FederationProtocol {
  SAML = 'SAML',
  OAUTH2 = 'OAUTH2',
  OIDC = 'OIDC',
  LDAP = 'LDAP',
  CAS = 'CAS',
  WS_FEDERATION = 'WS_FEDERATION',
}

export enum AuthenticationMethod {
  PASSWORD = 'PASSWORD',
  BIOMETRIC = 'BIOMETRIC',
  QR_CODE = 'QR_CODE',
  NFC = 'NFC',
  HARDWARE_TOKEN = 'HARDWARE_TOKEN',
  SSO = 'SSO',
  MFA = 'MFA',
}

export enum VerificationStatus {
  VERIFIED = 'VERIFIED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  NOT_STARTED = 'NOT_STARTED',
}

export enum BiometricType {
  FINGERPRINT = 'FINGERPRINT',
  FACE = 'FACE',
  IRIS = 'IRIS',
  VOICE = 'VOICE',
  PALM = 'PALM',
}

export enum WalletType {
  DIGITAL = 'DIGITAL',
  CREDENTIAL = 'CREDENTIAL',
  ACADEMIC = 'ACADEMIC',
  PROFESSIONAL = 'PROFESSIONAL',
  PORTABLE = 'PORTABLE',
}

export enum IdentityProvider {
  INTERNAL = 'INTERNAL',
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
  APPLE = 'APPLE',
  FACEBOOK = 'FACEBOOK',
  SAML_IDP = 'SAML_IDP',
  LDAP = 'LDAP',
}

export enum AccessLevel {
  PUBLIC = 'PUBLIC',
  SCHOOL = 'SCHOOL',
  REGIONAL = 'REGIONAL',
  NATIONAL = 'NATIONAL',
  ADMIN = 'ADMIN',
}

export enum ConsentStatus {
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  WITHDRAWN = 'WITHDRAWN',
  PENDING = 'PENDING',
}

export enum DataClassification {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
  TOP_SECRET = 'TOP_SECRET',
}

export enum EncryptionType {
  AES_256 = 'AES_256',
  RSA_2048 = 'RSA_2048',
  ECDSA = 'ECDSA',
  BCRYPT = 'BCRYPT',
  ARGON2 = 'ARGON2',
}

// Phase 3.4 - Module 4: Education Wallet Enums
export enum WalletStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
  SUSPENDED = 'SUSPENDED',
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  TRANSFER = 'TRANSFER',
  REFUND = 'REFUND',
  GRANT = 'GRANT',
  SCHOLARSHIP = 'SCHOLARSHIP',
  SUBSIDY = 'SUBSIDY',
  PAYMENT = 'PAYMENT',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REVERSED = 'REVERSED',
}

export enum CreditType {
  LEARNING = 'LEARNING',
  ASSESSMENT = 'ASSESSMENT',
  CERTIFICATION = 'CERTIFICATION',
  RESEARCH = 'RESEARCH',
  SERVICE = 'SERVICE',
}

export enum ScholarshipType {
  MERIT = 'MERIT',
  NEED_BASED = 'NEED_BASED',
  SPORTS = 'SPORTS',
  ARTS = 'ARTS',
  DIVERSITY = 'DIVERSITY',
  GOVERNMENT = 'GOVERNMENT',
}

export enum GrantType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  LOCAL = 'LOCAL',
  INTERNATIONAL = 'INTERNATIONAL',
  PRIVATE = 'PRIVATE',
  FOUNDATION = 'FOUNDATION',
}

export enum SubsidyType {
  TUITION = 'TUITION',
  TRANSPORT = 'TRANSPORT',
  MEALS = 'MEALS',
  MATERIALS = 'MATERIALS',
  TECHNOLOGY = 'TECHNOLOGY',
  HOUSING = 'HOUSING',
}

export enum PaymentMethod {
  WALLET = 'WALLET',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_MONEY = 'MOBILE_MONEY',
  CASH = 'CASH',
  CRYPTO = 'CRYPTO',
  CARD = 'CARD',
}

export enum LedgerEntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  ADJUSTMENT = 'ADJUSTMENT',
  REVERSAL = 'REVERSAL',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
}

export enum WalletAnalyticsPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
}

// Phase 3.4 - Module 3: Digital Identity Interfaces
export interface NationalEducationIdentity {
  id: string;
  national_id_number: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  photo_url: string;
  identity_type: IdentityType;
  status: IdentityStatus;
  issued_at: string;
  expires_at: string;
  issuing_authority: string;
  created_at: string;
  updated_at: string;
}

export interface StudentIdentity {
  id: string;
  national_identity_id: string;
  student_number: string;
  school_id: string;
  grade_level: string;
  enrollment_date: string;
  status: IdentityStatus;
  created_at: string;
  updated_at: string;
}

export interface TeacherIdentity {
  id: string;
  national_identity_id: string;
  employee_number: string;
  school_id: string;
  department: string;
  specialization: string[];
  hire_date: string;
  status: IdentityStatus;
  created_at: string;
  updated_at: string;
}

export interface ParentIdentity {
  id: string;
  national_identity_id: string;
  children: string[];
  relationship: string;
  contact_email: string;
  contact_phone: string;
  status: IdentityStatus;
  created_at: string;
}

export interface SchoolIdentity {
  id: string;
  school_id: string;
  registration_number: string;
  name: string;
  address: string;
  region: string;
  department: string;
  school_type: string;
  accreditation_status: string;
  status: IdentityStatus;
  created_at: string;
  updated_at: string;
}

export interface OrganizationIdentity {
  id: string;
  organization_name: string;
  registration_number: string;
  type: string;
  address: string;
  country: string;
  contact_email: string;
  status: IdentityStatus;
  created_at: string;
}

export interface IdentityFederation {
  id: string;
  school_id: string;
  identity_provider: IdentityProvider;
  protocol: FederationProtocol;
  provider_url: string;
  entity_id: string;
  metadata_url: string;
  enabled: boolean;
  created_at: string;
}

export interface SSOConfiguration {
  id: string;
  school_id: string;
  provider: IdentityProvider;
  client_id: string;
  authorization_url: string;
  token_url: string;
  user_info_url: string;
  scopes: string[];
  enabled: boolean;
  created_at: string;
}

export interface OAuthConfiguration {
  id: string;
  school_id: string;
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  grant_types: string[];
  scopes: string[];
  enabled: boolean;
  created_at: string;
}

export interface SAMLConfiguration {
  id: string;
  school_id: string;
  entity_id: string;
  sso_url: string;
  slo_url: string;
  certificate: string;
  metadata_url: string;
  enabled: boolean;
  created_at: string;
}

export interface LDAPConfiguration {
  id: string;
  school_id: string;
  server_url: string;
  base_dn: string;
  bind_dn: string;
  user_search_base: string;
  group_search_base: string;
  enabled: boolean;
  created_at: string;
}

export interface BiometricIdentity {
  id: string;
  identity_id: string;
  biometric_type: BiometricType;
  template_hash: string;
  enrollment_date: string;
  last_used: string | null;
  status: VerificationStatus;
  created_at: string;
}

export interface QRIdentity {
  id: string;
  identity_id: string;
  qr_code_data: string;
  qr_code_url: string;
  valid_until: string;
  scan_count: number;
  created_at: string;
}

export interface NFCIdentity {
  id: string;
  identity_id: string;
  nfc_tag_id: string;
  nfc_data: string;
  last_read: string | null;
  status: string;
  created_at: string;
}

export interface DigitalWalletIdentity {
  id: string;
  identity_id: string;
  wallet_id: string;
  wallet_type: WalletType;
  balance: number;
  status: WalletStatus;
  created_at: string;
  updated_at: string;
}

export interface IdentityVerification {
  id: string;
  identity_id: string;
  verification_type: string;
  verification_method: AuthenticationMethod;
  status: VerificationStatus;
  verified_by: string | null;
  verified_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface IdentityConsent {
  id: string;
  identity_id: string;
  data_type: string;
  purpose: string;
  status: ConsentStatus;
  granted_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface IdentityAccessLog {
  id: string;
  identity_id: string;
  action: string;
  resource: string;
  ip_address: string;
  user_agent: string;
  success: boolean;
  timestamp: string;
}

export interface IdentityEncryption {
  id: string;
  identity_id: string;
  encryption_type: EncryptionType;
  key_version: string;
  created_at: string;
}

// Phase 3.4 - Module 4: Education Wallet Interfaces
export interface EducationWallet {
  id: string;
  school_id: string;
  owner_id: string;
  owner_type: string;
  wallet_type: WalletType;
  balance: number;
  currency: string;
  status: WalletStatus;
  created_at: string;
  updated_at: string;
}

export interface WalletCredits {
  id: string;
  wallet_id: string;
  credit_type: CreditType;
  amount: number;
  source: string;
  earned_at: string;
  expires_at: string | null;
  created_at: string;
}

export interface Scholarship {
  id: string;
  school_id: string;
  student_id: string;
  scholarship_type: ScholarshipType;
  name: string;
  amount: number;
  currency: string;
  academic_year: string;
  status: string;
  award_date: string;
  created_at: string;
}

export interface GovernmentGrant {
  id: string;
  school_id: string;
  grant_type: GrantType;
  name: string;
  amount: number;
  currency: string;
  funding_body: string;
  project_name: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}

export interface Subsidy {
  id: string;
  school_id: string;
  student_id: string;
  subsidy_type: SubsidyType;
  amount: number;
  currency: string;
  provider: string;
  period: string;
  status: string;
  created_at: string;
}

export interface LearningCredits {
  id: string;
  student_id: string;
  school_id: string;
  credits_earned: number;
  credits_spent: number;
  credits_available: number;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentWallet {
  id: string;
  wallet_id: string;
  payment_method: PaymentMethod;
  card_last_four: string | null;
  mobile_number: string | null;
  bank_account: string | null;
  is_default: boolean;
  created_at: string;
}

export interface DigitalCertificateWallet {
  id: string;
  wallet_id: string;
  certificate_id: string;
  certificate_type: string;
  issued_at: string;
  added_at: string;
}

export interface CredentialWallet {
  id: string;
  wallet_id: string;
  credential_type: string;
  credential_id: string;
  issuer: string;
  issued_at: string;
  expires_at: string | null;
  verified: boolean;
  added_at: string;
}

export interface WalletLedger {
  id: string;
  wallet_id: string;
  entry_type: LedgerEntryType;
  amount: number;
  balance_after: number;
  reference: string;
  description: string;
  created_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  transaction_type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  from_wallet: string | null;
  to_wallet: string | null;
  payment_method: PaymentMethod | null;
  reference: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface WalletAnalytics {
  id: string;
  wallet_id: string;
  period: WalletAnalyticsPeriod;
  total_credits: number;
  total_debits: number;
  total_transfers: number;
  balance_trend: number[];
  spending_categories: Record<string, number>;
  generated_at: string;
}
