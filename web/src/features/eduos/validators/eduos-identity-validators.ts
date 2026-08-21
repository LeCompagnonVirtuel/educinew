import { z } from 'zod';

const schoolId = z.string().uuid();

// ── Module 3: Digital Identity ────────

export const nationalEducationIdentityCreateSchema = z.object({
  school_id: schoolId,
  national_id_number: z.string(),
  full_name: z.string(),
  date_of_birth: z.string(),
  gender: z.string(),
  nationality: z.string(),
  photo_url: z.string(),
  identity_type: z.enum(['NATIONAL', 'STUDENT', 'TEACHER', 'PARENT', 'SCHOOL', 'ORGANIZATION']),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']),
  issued_at: z.string(),
  expires_at: z.string(),
  issuing_authority: z.string(),
});

export const nationalEducationIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_id_number: z.string().optional(),
  full_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  photo_url: z.string().optional(),
  identity_type: z.enum(['NATIONAL', 'STUDENT', 'TEACHER', 'PARENT', 'SCHOOL', 'ORGANIZATION']).optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']).optional(),
  issued_at: z.string().optional(),
  expires_at: z.string().optional(),
  issuing_authority: z.string().optional(),
});

export const studentIdentityCreateSchema = z.object({
  school_id: schoolId,
  national_identity_id: z.string(),
  student_number: z.string(),
  grade_level: z.string(),
  enrollment_date: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']),
});

export const studentIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_identity_id: z.string().optional(),
  student_number: z.string().optional(),
  grade_level: z.string().optional(),
  enrollment_date: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']).optional(),
});

export const teacherIdentityCreateSchema = z.object({
  school_id: schoolId,
  national_identity_id: z.string(),
  employee_number: z.string(),
  department: z.string(),
  specialization: z.array(z.string()),
  hire_date: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']),
});

export const teacherIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_identity_id: z.string().optional(),
  employee_number: z.string().optional(),
  department: z.string().optional(),
  specialization: z.array(z.string()).optional(),
  hire_date: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']).optional(),
});

export const parentIdentityCreateSchema = z.object({
  school_id: schoolId,
  national_identity_id: z.string(),
  children: z.array(z.string()),
  relationship: z.string(),
  contact_email: z.string(),
  contact_phone: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']),
});

export const parentIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_identity_id: z.string().optional(),
  children: z.array(z.string()).optional(),
  relationship: z.string().optional(),
  contact_email: z.string().optional(),
  contact_phone: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']).optional(),
});

export const schoolIdentityCreateSchema = z.object({
  school_id: schoolId,
  registration_number: z.string(),
  name: z.string(),
  address: z.string(),
  region: z.string(),
  department: z.string(),
  school_type: z.string(),
  accreditation_status: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']),
});

export const schoolIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  registration_number: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  region: z.string().optional(),
  department: z.string().optional(),
  school_type: z.string().optional(),
  accreditation_status: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']).optional(),
});

export const organizationIdentityCreateSchema = z.object({
  school_id: schoolId,
  organization_name: z.string(),
  registration_number: z.string(),
  type: z.string(),
  address: z.string(),
  country: z.string(),
  contact_email: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']),
});

export const organizationIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  organization_name: z.string().optional(),
  registration_number: z.string().optional(),
  type: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  contact_email: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'REVOKED', 'PENDING', 'EXPIRED']).optional(),
});

export const identityFederationCreateSchema = z.object({
  school_id: schoolId,
  identity_provider: z.enum(['INTERNAL', 'GOOGLE', 'MICROSOFT', 'APPLE', 'FACEBOOK', 'SAML_IDP', 'LDAP']),
  protocol: z.enum(['SAML', 'OAUTH2', 'OIDC', 'LDAP', 'CAS', 'WS_FEDERATION']),
  provider_url: z.string(),
  entity_id: z.string(),
  metadata_url: z.string(),
  enabled: z.boolean(),
});

export const identityFederationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_provider: z.enum(['INTERNAL', 'GOOGLE', 'MICROSOFT', 'APPLE', 'FACEBOOK', 'SAML_IDP', 'LDAP']).optional(),
  protocol: z.enum(['SAML', 'OAUTH2', 'OIDC', 'LDAP', 'CAS', 'WS_FEDERATION']).optional(),
  provider_url: z.string().optional(),
  entity_id: z.string().optional(),
  metadata_url: z.string().optional(),
  enabled: z.boolean().optional(),
});

export const ssoConfigurationCreateSchema = z.object({
  school_id: schoolId,
  provider: z.enum(['INTERNAL', 'GOOGLE', 'MICROSOFT', 'APPLE', 'FACEBOOK', 'SAML_IDP', 'LDAP']),
  client_id: z.string(),
  authorization_url: z.string(),
  token_url: z.string(),
  user_info_url: z.string(),
  scopes: z.array(z.string()),
  enabled: z.boolean(),
});

export const ssoConfigurationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  provider: z.enum(['INTERNAL', 'GOOGLE', 'MICROSOFT', 'APPLE', 'FACEBOOK', 'SAML_IDP', 'LDAP']).optional(),
  client_id: z.string().optional(),
  authorization_url: z.string().optional(),
  token_url: z.string().optional(),
  user_info_url: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  enabled: z.boolean().optional(),
});

export const oAuthConfigurationCreateSchema = z.object({
  school_id: schoolId,
  client_id: z.string(),
  client_secret: z.string(),
  redirect_uris: z.array(z.string()),
  grant_types: z.array(z.string()),
  scopes: z.array(z.string()),
  enabled: z.boolean(),
});

export const oAuthConfigurationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  redirect_uris: z.array(z.string()).optional(),
  grant_types: z.array(z.string()).optional(),
  scopes: z.array(z.string()).optional(),
  enabled: z.boolean().optional(),
});

export const samlConfigurationCreateSchema = z.object({
  school_id: schoolId,
  entity_id: z.string(),
  sso_url: z.string(),
  slo_url: z.string(),
  certificate: z.string(),
  metadata_url: z.string(),
  enabled: z.boolean(),
});

export const samlConfigurationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  entity_id: z.string().optional(),
  sso_url: z.string().optional(),
  slo_url: z.string().optional(),
  certificate: z.string().optional(),
  metadata_url: z.string().optional(),
  enabled: z.boolean().optional(),
});

export const ldapConfigurationCreateSchema = z.object({
  school_id: schoolId,
  server_url: z.string(),
  base_dn: z.string(),
  bind_dn: z.string(),
  user_search_base: z.string(),
  group_search_base: z.string(),
  enabled: z.boolean(),
});

export const ldapConfigurationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  server_url: z.string().optional(),
  base_dn: z.string().optional(),
  bind_dn: z.string().optional(),
  user_search_base: z.string().optional(),
  group_search_base: z.string().optional(),
  enabled: z.boolean().optional(),
});

export const biometricIdentityCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  biometric_type: z.enum(['FINGERPRINT', 'FACE', 'IRIS', 'VOICE', 'PALM']),
  template_hash: z.string(),
  enrollment_date: z.string(),
  last_used: z.string().nullable().optional(),
  status: z.enum(['VERIFIED', 'PENDING', 'FAILED', 'EXPIRED', 'NOT_STARTED']),
});

export const biometricIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  biometric_type: z.enum(['FINGERPRINT', 'FACE', 'IRIS', 'VOICE', 'PALM']).optional(),
  template_hash: z.string().optional(),
  enrollment_date: z.string().optional(),
  last_used: z.string().nullable().optional(),
  status: z.enum(['VERIFIED', 'PENDING', 'FAILED', 'EXPIRED', 'NOT_STARTED']).optional(),
});

export const qrIdentityCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  qr_code_data: z.string(),
  qr_code_url: z.string(),
  valid_until: z.string(),
  scan_count: z.number(),
});

export const qrIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  qr_code_data: z.string().optional(),
  qr_code_url: z.string().optional(),
  valid_until: z.string().optional(),
  scan_count: z.number().optional(),
});

export const nfcIdentityCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  nfc_tag_id: z.string(),
  nfc_data: z.string(),
  last_read: z.string().nullable().optional(),
  status: z.string(),
});

export const nfcIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  nfc_tag_id: z.string().optional(),
  nfc_data: z.string().optional(),
  last_read: z.string().nullable().optional(),
  status: z.string().optional(),
});

export const digitalWalletIdentityCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  wallet_id: z.string(),
  wallet_type: z.enum(['DIGITAL', 'CREDENTIAL', 'ACADEMIC', 'PROFESSIONAL', 'PORTABLE']),
  balance: z.number(),
  status: z.enum(['ACTIVE', 'FROZEN', 'CLOSED', 'SUSPENDED']),
});

export const digitalWalletIdentityUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  wallet_id: z.string().optional(),
  wallet_type: z.enum(['DIGITAL', 'CREDENTIAL', 'ACADEMIC', 'PROFESSIONAL', 'PORTABLE']).optional(),
  balance: z.number().optional(),
  status: z.enum(['ACTIVE', 'FROZEN', 'CLOSED', 'SUSPENDED']).optional(),
});

export const identityVerificationCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  verification_type: z.string(),
  verification_method: z.enum(['PASSWORD', 'BIOMETRIC', 'QR_CODE', 'NFC', 'HARDWARE_TOKEN', 'SSO', 'MFA']),
  status: z.enum(['VERIFIED', 'PENDING', 'FAILED', 'EXPIRED', 'NOT_STARTED']),
  verified_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
});

export const identityVerificationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  verification_type: z.string().optional(),
  verification_method: z.enum(['PASSWORD', 'BIOMETRIC', 'QR_CODE', 'NFC', 'HARDWARE_TOKEN', 'SSO', 'MFA']).optional(),
  status: z.enum(['VERIFIED', 'PENDING', 'FAILED', 'EXPIRED', 'NOT_STARTED']).optional(),
  verified_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
});

export const identityConsentCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  data_type: z.string(),
  purpose: z.string(),
  status: z.enum(['GRANTED', 'DENIED', 'WITHDRAWN', 'PENDING']),
  granted_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
});

export const identityConsentUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  data_type: z.string().optional(),
  purpose: z.string().optional(),
  status: z.enum(['GRANTED', 'DENIED', 'WITHDRAWN', 'PENDING']).optional(),
  granted_at: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
});

export const identityAccessLogCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  action: z.string(),
  resource: z.string(),
  ip_address: z.string(),
  user_agent: z.string(),
  success: z.boolean(),
  timestamp: z.string(),
});

export const identityAccessLogUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  action: z.string().optional(),
  resource: z.string().optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  success: z.boolean().optional(),
  timestamp: z.string().optional(),
});

export const identityEncryptionCreateSchema = z.object({
  school_id: schoolId,
  identity_id: z.string(),
  encryption_type: z.enum(['AES_256', 'RSA_2048', 'ECDSA', 'BCRYPT', 'ARGON2']),
  key_version: z.string(),
});

export const identityEncryptionUpdateSchema = z.object({
  school_id: schoolId.optional(),
  identity_id: z.string().optional(),
  encryption_type: z.enum(['AES_256', 'RSA_2048', 'ECDSA', 'BCRYPT', 'ARGON2']).optional(),
  key_version: z.string().optional(),
});

// ── Module 4: Education Wallet ────────

export const educationWalletCreateSchema = z.object({
  school_id: schoolId,
  owner_id: z.string(),
  owner_type: z.string(),
  wallet_type: z.enum(['DIGITAL', 'CREDENTIAL', 'ACADEMIC', 'PROFESSIONAL', 'PORTABLE']),
  balance: z.number(),
  currency: z.string(),
  status: z.enum(['ACTIVE', 'FROZEN', 'CLOSED', 'SUSPENDED']),
});

export const educationWalletUpdateSchema = z.object({
  school_id: schoolId.optional(),
  owner_id: z.string().optional(),
  owner_type: z.string().optional(),
  wallet_type: z.enum(['DIGITAL', 'CREDENTIAL', 'ACADEMIC', 'PROFESSIONAL', 'PORTABLE']).optional(),
  balance: z.number().optional(),
  currency: z.string().optional(),
  status: z.enum(['ACTIVE', 'FROZEN', 'CLOSED', 'SUSPENDED']).optional(),
});

export const walletCreditsCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  credit_type: z.enum(['LEARNING', 'ASSESSMENT', 'CERTIFICATION', 'RESEARCH', 'SERVICE']),
  amount: z.number(),
  source: z.string(),
  earned_at: z.string(),
  expires_at: z.string().nullable().optional(),
});

export const walletCreditsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  credit_type: z.enum(['LEARNING', 'ASSESSMENT', 'CERTIFICATION', 'RESEARCH', 'SERVICE']).optional(),
  amount: z.number().optional(),
  source: z.string().optional(),
  earned_at: z.string().optional(),
  expires_at: z.string().nullable().optional(),
});

export const scholarshipCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string(),
  scholarship_type: z.enum(['MERIT', 'NEED_BASED', 'SPORTS', 'ARTS', 'DIVERSITY', 'GOVERNMENT']),
  name: z.string(),
  amount: z.number(),
  currency: z.string(),
  academic_year: z.string(),
  status: z.string(),
  award_date: z.string(),
});

export const scholarshipUpdateSchema = z.object({
  school_id: schoolId.optional(),
  student_id: z.string().optional(),
  scholarship_type: z.enum(['MERIT', 'NEED_BASED', 'SPORTS', 'ARTS', 'DIVERSITY', 'GOVERNMENT']).optional(),
  name: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  academic_year: z.string().optional(),
  status: z.string().optional(),
  award_date: z.string().optional(),
});

export const governmentGrantCreateSchema = z.object({
  school_id: schoolId,
  grant_type: z.enum(['FEDERAL', 'STATE', 'LOCAL', 'INTERNATIONAL', 'PRIVATE', 'FOUNDATION']),
  name: z.string(),
  amount: z.number(),
  currency: z.string(),
  funding_body: z.string(),
  project_name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  status: z.string(),
});

export const governmentGrantUpdateSchema = z.object({
  school_id: schoolId.optional(),
  grant_type: z.enum(['FEDERAL', 'STATE', 'LOCAL', 'INTERNATIONAL', 'PRIVATE', 'FOUNDATION']).optional(),
  name: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  funding_body: z.string().optional(),
  project_name: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  status: z.string().optional(),
});

export const subsidyCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string(),
  subsidy_type: z.enum(['TUITION', 'TRANSPORT', 'MEALS', 'MATERIALS', 'TECHNOLOGY', 'HOUSING']),
  amount: z.number(),
  currency: z.string(),
  provider: z.string(),
  period: z.string(),
  status: z.string(),
});

export const subsidyUpdateSchema = z.object({
  school_id: schoolId.optional(),
  student_id: z.string().optional(),
  subsidy_type: z.enum(['TUITION', 'TRANSPORT', 'MEALS', 'MATERIALS', 'TECHNOLOGY', 'HOUSING']).optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  provider: z.string().optional(),
  period: z.string().optional(),
  status: z.string().optional(),
});

export const learningCreditsCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string(),
  credits_earned: z.number(),
  credits_spent: z.number(),
  credits_available: z.number(),
  last_activity: z.string(),
});

export const learningCreditsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  student_id: z.string().optional(),
  credits_earned: z.number().optional(),
  credits_spent: z.number().optional(),
  credits_available: z.number().optional(),
  last_activity: z.string().optional(),
});

export const paymentWalletCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  payment_method: z.enum(['WALLET', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CASH', 'CRYPTO', 'CARD']),
  card_last_four: z.string().nullable().optional(),
  mobile_number: z.string().nullable().optional(),
  bank_account: z.string().nullable().optional(),
  is_default: z.boolean(),
});

export const paymentWalletUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  payment_method: z.enum(['WALLET', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CASH', 'CRYPTO', 'CARD']).optional(),
  card_last_four: z.string().nullable().optional(),
  mobile_number: z.string().nullable().optional(),
  bank_account: z.string().nullable().optional(),
  is_default: z.boolean().optional(),
});

export const digitalCertificateWalletCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  certificate_id: z.string(),
  certificate_type: z.string(),
  issued_at: z.string(),
  added_at: z.string(),
});

export const digitalCertificateWalletUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  certificate_id: z.string().optional(),
  certificate_type: z.string().optional(),
  issued_at: z.string().optional(),
  added_at: z.string().optional(),
});

export const credentialWalletCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  credential_type: z.string(),
  credential_id: z.string(),
  issuer: z.string(),
  issued_at: z.string(),
  expires_at: z.string().nullable().optional(),
  verified: z.boolean(),
  added_at: z.string(),
});

export const credentialWalletUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  credential_type: z.string().optional(),
  credential_id: z.string().optional(),
  issuer: z.string().optional(),
  issued_at: z.string().optional(),
  expires_at: z.string().nullable().optional(),
  verified: z.boolean().optional(),
  added_at: z.string().optional(),
});

export const walletLedgerCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  entry_type: z.enum(['CREDIT', 'DEBIT', 'ADJUSTMENT', 'REVERSAL', 'TRANSFER_IN', 'TRANSFER_OUT']),
  amount: z.number(),
  balance_after: z.number(),
  reference: z.string(),
  description: z.string(),
});

export const walletLedgerUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  entry_type: z.enum(['CREDIT', 'DEBIT', 'ADJUSTMENT', 'REVERSAL', 'TRANSFER_IN', 'TRANSFER_OUT']).optional(),
  amount: z.number().optional(),
  balance_after: z.number().optional(),
  reference: z.string().optional(),
  description: z.string().optional(),
});

export const walletTransactionCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  transaction_type: z.enum(['CREDIT', 'DEBIT', 'TRANSFER', 'REFUND', 'GRANT', 'SCHOLARSHIP', 'SUBSIDY', 'PAYMENT']),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REVERSED']),
  from_wallet: z.string().nullable().optional(),
  to_wallet: z.string().nullable().optional(),
  payment_method: z.enum(['WALLET', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CASH', 'CRYPTO', 'CARD']).nullable().optional(),
  reference: z.string(),
  description: z.string(),
  metadata: z.record(z.unknown()),
});

export const walletTransactionUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  transaction_type: z.enum(['CREDIT', 'DEBIT', 'TRANSFER', 'REFUND', 'GRANT', 'SCHOLARSHIP', 'SUBSIDY', 'PAYMENT']).optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REVERSED']).optional(),
  from_wallet: z.string().nullable().optional(),
  to_wallet: z.string().nullable().optional(),
  payment_method: z.enum(['WALLET', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CASH', 'CRYPTO', 'CARD']).nullable().optional(),
  reference: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const walletAnalyticsCreateSchema = z.object({
  school_id: schoolId,
  wallet_id: z.string(),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL']),
  total_credits: z.number(),
  total_debits: z.number(),
  total_transfers: z.number(),
  balance_trend: z.array(z.number()),
  spending_categories: z.record(z.number()),
  generated_at: z.string(),
});

export const walletAnalyticsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  wallet_id: z.string().optional(),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL']).optional(),
  total_credits: z.number().optional(),
  total_debits: z.number().optional(),
  total_transfers: z.number().optional(),
  balance_trend: z.array(z.number()).optional(),
  spending_categories: z.record(z.number()).optional(),
  generated_at: z.string().optional(),
});
