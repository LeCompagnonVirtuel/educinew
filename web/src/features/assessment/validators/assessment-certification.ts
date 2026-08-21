import { z } from 'zod';

const schoolId = z.string().uuid();

// ── Certificate ────────────────────────────────────────────────────────────

export const certificateCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  program_id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  issued_date: z.string().datetime(),
  expiry_date: z.string().datetime().optional(),
  certificate_type: z.enum(['completion', 'achievement', 'participation', 'excellence', 'honor']),
  issued_by: z.string().uuid().optional(),
  status: z.enum(['active', 'expired', 'revoked', 'pending']).optional(),
});

export const certificateUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  program_id: z.string().uuid().optional(),
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  issued_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  certificate_type: z.enum(['completion', 'achievement', 'participation', 'excellence', 'honor']).optional(),
  issued_by: z.string().uuid().optional(),
  status: z.enum(['active', 'expired', 'revoked', 'pending']).optional(),
});

// ── Digital Certificate ────────────────────────────────────────────────────

export const digitalCertificateCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  digital_format: z.enum(['pdf', 'png', 'svg', 'json']),
  file_url: z.string().url().optional(),
  file_size: z.number().int().min(0).optional(),
  checksum_sha256: z.string().max(64).optional(),
  watermark_enabled: z.boolean().optional(),
  signature_enabled: z.boolean().optional(),
  qr_code_enabled: z.boolean().optional(),
  template_id: z.string().uuid().optional(),
});

export const digitalCertificateUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  digital_format: z.enum(['pdf', 'png', 'svg', 'json']).optional(),
  file_url: z.string().url().optional(),
  file_size: z.number().int().min(0).optional(),
  checksum_sha256: z.string().max(64).optional(),
  watermark_enabled: z.boolean().optional(),
  signature_enabled: z.boolean().optional(),
  qr_code_enabled: z.boolean().optional(),
  template_id: z.string().uuid().optional(),
});

// ── Blockchain Certificate ─────────────────────────────────────────────────

export const blockchainCertificateCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  blockchain_network: z.string().min(1).max(100),
  transaction_hash: z.string().max(200).optional(),
  block_number: z.number().int().min(0).optional(),
  smart_contract_address: z.string().max(100).optional(),
  wallet_address: z.string().max(100).optional(),
  immutable_proof: z.boolean().optional(),
  verification_url: z.string().url().optional(),
  minted_at: z.string().datetime().optional(),
});

export const blockchainCertificateUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  blockchain_network: z.string().min(1).max(100).optional(),
  transaction_hash: z.string().max(200).optional(),
  block_number: z.number().int().min(0).optional(),
  smart_contract_address: z.string().max(100).optional(),
  wallet_address: z.string().max(100).optional(),
  immutable_proof: z.boolean().optional(),
  verification_url: z.string().url().optional(),
  minted_at: z.string().datetime().optional(),
});

// ── QR Verification ────────────────────────────────────────────────────────

export const qRVerificationCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  qr_code_data: z.string().min(1).max(500),
  verification_url: z.string().url(),
  scan_count: z.number().int().min(0).optional(),
  last_scanned_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  qr_image_url: z.string().url().optional(),
});

export const qRVerificationUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  qr_code_data: z.string().min(1).max(500).optional(),
  verification_url: z.string().url().optional(),
  scan_count: z.number().int().min(0).optional(),
  last_scanned_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  qr_image_url: z.string().url().optional(),
});

// ── Public Verification ────────────────────────────────────────────────────

export const publicVerificationCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  verification_code: z.string().min(1).max(100),
  public_url: z.string().url(),
  show_details: z.boolean().optional(),
  show_score: z.boolean().optional(),
  show_date: z.boolean().optional(),
  allow_download: z.boolean().optional(),
  access_count: z.number().int().min(0).optional(),
});

export const publicVerificationUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  verification_code: z.string().min(1).max(100).optional(),
  public_url: z.string().url().optional(),
  show_details: z.boolean().optional(),
  show_score: z.boolean().optional(),
  show_date: z.boolean().optional(),
  allow_download: z.boolean().optional(),
  access_count: z.number().int().min(0).optional(),
});

// ── Certificate Template ───────────────────────────────────────────────────

export const certificateTemplateCreateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  template_html: z.string().max(50000).optional(),
  template_css: z.string().max(50000).optional(),
  layout: z.enum(['portrait', 'landscape']).optional(),
  paper_size: z.enum(['A4', 'A3', 'letter', 'legal']).optional(),
  school_logo_url: z.string().url().optional(),
  school_signature_url: z.string().url().optional(),
  is_default: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
});

export const certificateTemplateUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  template_html: z.string().max(50000).optional(),
  template_css: z.string().max(50000).optional(),
  layout: z.enum(['portrait', 'landscape']).optional(),
  paper_size: z.enum(['A4', 'A3', 'letter', 'legal']).optional(),
  school_logo_url: z.string().url().optional(),
  school_signature_url: z.string().url().optional(),
  is_default: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
});

// ── Certificate Branding ───────────────────────────────────────────────────

export const certificateBrandingCreateSchema = z.object({
  school_id: schoolId,
  school_name: z.string().min(1).max(300),
  logo_url: z.string().url().optional(),
  primary_color: z.string().max(7).optional(),
  secondary_color: z.string().max(7).optional(),
  font_family: z.string().max(100).optional(),
  seal_url: z.string().url().optional(),
  signature_image_url: z.string().url().optional(),
  footer_text: z.string().max(1000).optional(),
  watermark_text: z.string().max(200).optional(),
});

export const certificateBrandingUpdateSchema = z.object({
  school_id: schoolId,
  school_name: z.string().min(1).max(300).optional(),
  logo_url: z.string().url().optional(),
  primary_color: z.string().max(7).optional(),
  secondary_color: z.string().max(7).optional(),
  font_family: z.string().max(100).optional(),
  seal_url: z.string().url().optional(),
  signature_image_url: z.string().url().optional(),
  footer_text: z.string().max(1000).optional(),
  watermark_text: z.string().max(200).optional(),
});

// ── Certificate Expiration ─────────────────────────────────────────────────

export const certificateExpirationCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  expiry_date: z.string().datetime(),
  auto_renew: z.boolean().optional(),
  renewal_period_days: z.number().int().min(1).max(3650).optional(),
  notification_days_before: z.array(z.number().int().min(1).max(365)).optional(),
  expiration_action: z.enum(['notify', 'revoke', 'downgrade', 'extend']).optional(),
  grace_period_days: z.number().int().min(0).max(365).optional(),
});

export const certificateExpirationUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  expiry_date: z.string().datetime().optional(),
  auto_renew: z.boolean().optional(),
  renewal_period_days: z.number().int().min(1).max(3650).optional(),
  notification_days_before: z.array(z.number().int().min(1).max(365)).optional(),
  expiration_action: z.enum(['notify', 'revoke', 'downgrade', 'extend']).optional(),
  grace_period_days: z.number().int().min(0).max(365).optional(),
});

// ── Certificate Renewal ────────────────────────────────────────────────────

export const certificateRenewalCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  renewal_type: z.enum(['automatic', 'manual', 'exam_based', 'cpd']),
  requirements: z.record(z.unknown()).optional(),
  renewal_fee: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  validity_period_days: z.number().int().min(1).max(3650).optional(),
  max_renewals: z.number().int().min(1).max(100).optional(),
  current_renewal_count: z.number().int().min(0).optional(),
});

export const certificateRenewalUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  renewal_type: z.enum(['automatic', 'manual', 'exam_based', 'cpd']).optional(),
  requirements: z.record(z.unknown()).optional(),
  renewal_fee: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  validity_period_days: z.number().int().min(1).max(3650).optional(),
  max_renewals: z.number().int().min(1).max(100).optional(),
  current_renewal_count: z.number().int().min(0).optional(),
});

// ── Certificate Validation ─────────────────────────────────────────────────

export const certificateValidationCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  validation_type: z.enum(['automated', 'manual', 'third_party']),
  validator_id: z.string().uuid().optional(),
  is_valid: z.boolean(),
  validation_date: z.string().datetime(),
  validation_notes: z.string().max(2000).optional(),
  check_signature: z.boolean().optional(),
  check_expiration: z.boolean().optional(),
  check_revocation: z.boolean().optional(),
});

export const certificateValidationUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  validation_type: z.enum(['automated', 'manual', 'third_party']).optional(),
  validator_id: z.string().uuid().optional(),
  is_valid: z.boolean().optional(),
  validation_date: z.string().datetime().optional(),
  validation_notes: z.string().max(2000).optional(),
  check_signature: z.boolean().optional(),
  check_expiration: z.boolean().optional(),
  check_revocation: z.boolean().optional(),
});

// ── Certificate Revocation ─────────────────────────────────────────────────

export const certificateRevocationCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid(),
  reason: z.enum(['academic_dishonesty', 'policy_violation', 'error', 'request', 'other']),
  description: z.string().max(5000).optional(),
  revoked_by: z.string().uuid().optional(),
  revoked_at: z.string().datetime(),
  effective_date: z.string().datetime().optional(),
  notification_sent: z.boolean().optional(),
  appeal_deadline: z.string().datetime().optional(),
});

export const certificateRevocationUpdateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string().uuid().optional(),
  reason: z.enum(['academic_dishonesty', 'policy_violation', 'error', 'request', 'other']).optional(),
  description: z.string().max(5000).optional(),
  revoked_by: z.string().uuid().optional(),
  revoked_at: z.string().datetime().optional(),
  effective_date: z.string().datetime().optional(),
  notification_sent: z.boolean().optional(),
  appeal_deadline: z.string().datetime().optional(),
});

// ── Certificate Registry ───────────────────────────────────────────────────

export const certificateRegistryCreateSchema = z.object({
  school_id: schoolId,
  registry_name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  public_access: z.boolean().optional(),
  searchable: z.boolean().optional(),
  include_photo: z.boolean().optional(),
  include_scores: z.boolean().optional(),
  api_access_enabled: z.boolean().optional(),
  total_certificates: z.number().int().min(0).optional(),
  last_updated: z.string().datetime().optional(),
});

export const certificateRegistryUpdateSchema = z.object({
  school_id: schoolId,
  registry_name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  public_access: z.boolean().optional(),
  searchable: z.boolean().optional(),
  include_photo: z.boolean().optional(),
  include_scores: z.boolean().optional(),
  api_access_enabled: z.boolean().optional(),
  total_certificates: z.number().int().min(0).optional(),
  last_updated: z.string().datetime().optional(),
});

// ── Micro Credential ───────────────────────────────────────────────────────

export const microCredentialCreateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  skill_area: z.string().min(1).max(200),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  competency_units: z.number().int().min(1).max(100).optional(),
  assessment_method: z.enum(['portfolio', 'exam', 'project', 'peer', 'self']).optional(),
  estimated_hours: z.number().min(1).max(1000).optional(),
  valid_until: z.string().datetime().optional(),
  stackable: z.boolean().optional(),
  max_stack_size: z.number().int().min(2).max(20).optional(),
});

export const microCredentialUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  skill_area: z.string().min(1).max(200).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  competency_units: z.number().int().min(1).max(100).optional(),
  assessment_method: z.enum(['portfolio', 'exam', 'project', 'peer', 'self']).optional(),
  estimated_hours: z.number().min(1).max(1000).optional(),
  valid_until: z.string().datetime().optional(),
  stackable: z.boolean().optional(),
  max_stack_size: z.number().int().min(2).max(20).optional(),
});

// ── Skill Badge ────────────────────────────────────────────────────────────

export const skillBadgeCreateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  skill_tag: z.string().min(1).max(100),
  badge_image_url: z.string().url().optional(),
  category: z.string().max(100).optional(),
  points_value: z.number().int().min(0).optional(),
  rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary']).optional(),
  requirements: z.record(z.unknown()).optional(),
  auto_award: z.boolean().optional(),
});

export const skillBadgeUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  skill_tag: z.string().min(1).max(100).optional(),
  badge_image_url: z.string().url().optional(),
  category: z.string().max(100).optional(),
  points_value: z.number().int().min(0).optional(),
  rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary']).optional(),
  requirements: z.record(z.unknown()).optional(),
  auto_award: z.boolean().optional(),
});

// ── Open Badge ─────────────────────────────────────────────────────────────

export const openBadgeCreateSchema = z.object({
  school_id: schoolId,
  badge_name: z.string().min(1).max(200),
  badge_class: z.string().max(200).optional(),
  issuer_name: z.string().min(1).max(300),
  issuer_url: z.string().url().optional(),
  issuer_email: z.string().email().optional(),
  image_url: z.string().url().optional(),
  criteria: z.string().max(5000).optional(),
  alignment: z.array(z.object({
    name: z.string().max(200),
    url: z.string().url(),
    framework: z.string().max(200).optional(),
  })).optional(),
  expires: z.string().datetime().optional(),
  created_by: z.string().uuid().optional(),
});

export const openBadgeUpdateSchema = z.object({
  school_id: schoolId,
  badge_name: z.string().min(1).max(200).optional(),
  badge_class: z.string().max(200).optional(),
  issuer_name: z.string().min(1).max(300).optional(),
  issuer_url: z.string().url().optional(),
  issuer_email: z.string().email().optional(),
  image_url: z.string().url().optional(),
  criteria: z.string().max(5000).optional(),
  alignment: z.array(z.object({
    name: z.string().max(200),
    url: z.string().url(),
    framework: z.string().max(200).optional(),
  })).optional(),
  expires: z.string().datetime().optional(),
  created_by: z.string().uuid().optional(),
});

// ── Achievement Certificate ────────────────────────────────────────────────

export const achievementCertificateCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  achievement_name: z.string().min(1).max(300),
  achievement_type: z.enum(['academic', 'athletic', 'arts', 'community', 'leadership', 'service']),
  level: z.enum(['school', 'district', 'regional', 'national', 'international']).optional(),
  date_achieved: z.string().datetime(),
  description: z.string().max(2000).optional(),
  criteria_met: z.array(z.string()).optional(),
  awarded_by: z.string().uuid().optional(),
  verified: z.boolean().optional(),
});

export const achievementCertificateUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  achievement_name: z.string().min(1).max(300).optional(),
  achievement_type: z.enum(['academic', 'athletic', 'arts', 'community', 'leadership', 'service']).optional(),
  level: z.enum(['school', 'district', 'regional', 'national', 'international']).optional(),
  date_achieved: z.string().datetime().optional(),
  description: z.string().max(2000).optional(),
  criteria_met: z.array(z.string()).optional(),
  awarded_by: z.string().uuid().optional(),
  verified: z.boolean().optional(),
});

// ── Academic Certificate ───────────────────────────────────────────────────

export const academicCertificateCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  degree: z.string().min(1).max(200),
  major: z.string().min(1).max(200),
  minor: z.string().max(200).optional(),
  institution: z.string().min(1).max(300),
  graduation_date: z.string().datetime(),
  gpa: z.number().min(0).max(4).optional(),
  honors: z.array(z.enum(['cum_laude', 'magna_cum_laude', 'summa_cum_laude'])).optional(),
  thesis_title: z.string().max(500).optional(),
  accreditation_body: z.string().max(200).optional(),
});

export const academicCertificateUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  degree: z.string().min(1).max(200).optional(),
  major: z.string().min(1).max(200).optional(),
  minor: z.string().max(200).optional(),
  institution: z.string().min(1).max(300).optional(),
  graduation_date: z.string().datetime().optional(),
  gpa: z.number().min(0).max(4).optional(),
  honors: z.array(z.enum(['cum_laude', 'magna_cum_laude', 'summa_cum_laude'])).optional(),
  thesis_title: z.string().max(500).optional(),
  accreditation_body: z.string().max(200).optional(),
});

// ── Professional Certificate ───────────────────────────────────────────────

export const professionalCertificateCreateSchema = z.object({
  school_id: schoolId,
  professional_id: z.string().uuid(),
  certification_name: z.string().min(1).max(300),
  issuing_organization: z.string().min(1).max(300),
  credential_id: z.string().max(200).optional(),
  issue_date: z.string().datetime(),
  expiry_date: z.string().datetime().optional(),
  credential_url: z.string().url().optional(),
  cpd_hours_required: z.number().int().min(0).optional(),
  cpd_hours_completed: z.number().int().min(0).optional(),
  status: z.enum(['active', 'expired', 'suspended', 'revoked']).optional(),
});

export const professionalCertificateUpdateSchema = z.object({
  school_id: schoolId,
  professional_id: z.string().uuid().optional(),
  certification_name: z.string().min(1).max(300).optional(),
  issuing_organization: z.string().min(1).max(300).optional(),
  credential_id: z.string().max(200).optional(),
  issue_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  credential_url: z.string().url().optional(),
  cpd_hours_required: z.number().int().min(0).optional(),
  cpd_hours_completed: z.number().int().min(0).optional(),
  status: z.enum(['active', 'expired', 'suspended', 'revoked']).optional(),
});

// ── Transcript Generator ───────────────────────────────────────────────────

export const transcriptGeneratorCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  transcript_type: z.enum(['official', 'unofficial', 'summary', 'detailed']),
  include_grades: z.boolean().optional(),
  include_credits: z.boolean().optional(),
  include_gpa: z.boolean().optional(),
  include_attendance: z.boolean().optional(),
  date_range_start: z.string().datetime().optional(),
  date_range_end: z.string().datetime().optional(),
  output_format: z.enum(['pdf', 'html', 'json']).optional(),
  digital_signature: z.boolean().optional(),
  generated_by: z.string().uuid().optional(),
});

export const transcriptGeneratorUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  transcript_type: z.enum(['official', 'unofficial', 'summary', 'detailed']).optional(),
  include_grades: z.boolean().optional(),
  include_credits: z.boolean().optional(),
  include_gpa: z.boolean().optional(),
  include_attendance: z.boolean().optional(),
  date_range_start: z.string().datetime().optional(),
  date_range_end: z.string().datetime().optional(),
  output_format: z.enum(['pdf', 'html', 'json']).optional(),
  digital_signature: z.boolean().optional(),
  generated_by: z.string().uuid().optional(),
});

// ── Digital Diploma ────────────────────────────────────────────────────────

export const digitalDiplomaCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  diploma_type: z.enum(['high_school', 'bachelors', 'masters', 'doctorate', 'certificate']),
  program_name: z.string().min(1).max(300),
  institution: z.string().min(1).max(300),
  graduation_year: z.number().int().min(1900).max(2100),
  honors_level: z.enum(['none', 'cum_laude', 'magna_cum_laude', 'summa_cum_laude']).optional(),
  blockchain_enabled: z.boolean().optional(),
  nft_enabled: z.boolean().optional(),
  ipfs_hash: z.string().max(200).optional(),
  issued_by: z.string().uuid().optional(),
});

export const digitalDiplomaUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  diploma_type: z.enum(['high_school', 'bachelors', 'masters', 'doctorate', 'certificate']).optional(),
  program_name: z.string().min(1).max(300).optional(),
  institution: z.string().min(1).max(300).optional(),
  graduation_year: z.number().int().min(1900).max(2100).optional(),
  honors_level: z.enum(['none', 'cum_laude', 'magna_cum_laude', 'summa_cum_laude']).optional(),
  blockchain_enabled: z.boolean().optional(),
  nft_enabled: z.boolean().optional(),
  ipfs_hash: z.string().max(200).optional(),
  issued_by: z.string().uuid().optional(),
});

// ── Competency Test ────────────────────────────────────────────────────────

export const competencyTestCreateSchema = z.object({
  school_id: schoolId,
  competency_area: z.string().min(1).max(200),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  passing_score: z.number().min(0).max(100),
  time_limit_minutes: z.number().int().min(1).max(480).optional(),
  question_count: z.number().int().min(1).max(200).optional(),
  retake_policy: z.enum(['unlimited', 'limited', 'cooldown']).optional(),
  retake_cooldown_days: z.number().int().min(1).max(365).optional(),
  certificate_on_pass: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
});

export const competencyTestUpdateSchema = z.object({
  school_id: schoolId,
  competency_area: z.string().min(1).max(200).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  passing_score: z.number().min(0).max(100).optional(),
  time_limit_minutes: z.number().int().min(1).max(480).optional(),
  question_count: z.number().int().min(1).max(200).optional(),
  retake_policy: z.enum(['unlimited', 'limited', 'cooldown']).optional(),
  retake_cooldown_days: z.number().int().min(1).max(365).optional(),
  certificate_on_pass: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
});

// ── Skill Matrix ───────────────────────────────────────────────────────────

export const skillMatrixCreateSchema = z.object({
  school_id: schoolId,
  matrix_name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  skill_domains: z.array(z.object({
    domain: z.string().min(1).max(200),
    skills: z.array(z.string().min(1).max(200)),
    weight: z.number().min(0).max(1).optional(),
  })),
  target_audience: z.enum(['student', 'teacher', 'professional', 'all']).optional(),
  assessment_method: z.enum(['self', 'peer', 'expert', 'mixed']).optional(),
  created_by: z.string().uuid().optional(),
});

export const skillMatrixUpdateSchema = z.object({
  school_id: schoolId,
  matrix_name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  skill_domains: z.array(z.object({
    domain: z.string().min(1).max(200),
    skills: z.array(z.string().min(1).max(200)),
    weight: z.number().min(0).max(1).optional(),
  })).optional(),
  target_audience: z.enum(['student', 'teacher', 'professional', 'all']).optional(),
  assessment_method: z.enum(['self', 'peer', 'expert', 'mixed']).optional(),
  created_by: z.string().uuid().optional(),
});

// ── Competency Level Config ────────────────────────────────────────────────

export const competencyLevelConfigCreateSchema = z.object({
  school_id: schoolId,
  competency_name: z.string().min(1).max(200),
  levels: z.array(z.object({
    level: z.number().int().min(1).max(10),
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    required_score: z.number().min(0).max(100).optional(),
    required_hours: z.number().int().min(0).optional(),
  })),
  auto_progression: z.boolean().optional(),
  progression_threshold: z.number().min(0).max(1).optional(),
});

export const competencyLevelConfigUpdateSchema = z.object({
  school_id: schoolId,
  competency_name: z.string().min(1).max(200).optional(),
  levels: z.array(z.object({
    level: z.number().int().min(1).max(10),
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    required_score: z.number().min(0).max(100).optional(),
    required_hours: z.number().int().min(0).optional(),
  })).optional(),
  auto_progression: z.boolean().optional(),
  progression_threshold: z.number().min(0).max(1).optional(),
});

// ── Competency Rubric ──────────────────────────────────────────────────────

export const competencyRubricCreateSchema = z.object({
  school_id: schoolId,
  rubric_name: z.string().min(1).max(200),
  competency_area: z.string().min(1).max(200),
  performance_levels: z.number().int().min(2).max(10),
  criteria: z.array(z.object({
    name: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    weight: z.number().min(0).max(1).optional(),
    descriptors: z.record(z.string()).optional(),
  })),
  scoring_method: z.enum(['points', 'levels', 'holistic']).optional(),
  created_by: z.string().uuid().optional(),
});

export const competencyRubricUpdateSchema = z.object({
  school_id: schoolId,
  rubric_name: z.string().min(1).max(200).optional(),
  competency_area: z.string().min(1).max(200).optional(),
  performance_levels: z.number().int().min(2).max(10).optional(),
  criteria: z.array(z.object({
    name: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    weight: z.number().min(0).max(1).optional(),
    descriptors: z.record(z.string()).optional(),
  })).optional(),
  scoring_method: z.enum(['points', 'levels', 'holistic']).optional(),
  created_by: z.string().uuid().optional(),
});

// ── Performance Rubric ─────────────────────────────────────────────────────

export const performanceRubricCreateSchema = z.object({
  school_id: schoolId,
  rubric_name: z.string().min(1).max(200),
  task_description: z.string().max(2000).optional(),
  dimensions: z.array(z.object({
    name: z.string().min(1).max(200),
    weight: z.number().min(0).max(1),
    excellent: z.string().max(500).optional(),
    proficient: z.string().max(500).optional(),
    developing: z.string().max(500).optional(),
    beginning: z.string().max(500).optional(),
  })),
  total_points: z.number().int().min(1).max(1000).optional(),
  holistic_scoring: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
});

export const performanceRubricUpdateSchema = z.object({
  school_id: schoolId,
  rubric_name: z.string().min(1).max(200).optional(),
  task_description: z.string().max(2000).optional(),
  dimensions: z.array(z.object({
    name: z.string().min(1).max(200),
    weight: z.number().min(0).max(1),
    excellent: z.string().max(500).optional(),
    proficient: z.string().max(500).optional(),
    developing: z.string().max(500).optional(),
    beginning: z.string().max(500).optional(),
  })).optional(),
  total_points: z.number().int().min(1).max(1000).optional(),
  holistic_scoring: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
});

// ── Portfolio ──────────────────────────────────────────────────────────────

export const portfolioCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  title: z.string().min(1).max(300),
  description: z.string().max(5000).optional(),
  portfolio_type: z.enum(['academic', 'professional', 'creative', 'competency']),
  visibility: z.enum(['private', 'school', 'public']).optional(),
  template_id: z.string().uuid().optional(),
  cover_image_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  created_by: z.string().uuid().optional(),
});

export const portfolioUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(5000).optional(),
  portfolio_type: z.enum(['academic', 'professional', 'creative', 'competency']).optional(),
  visibility: z.enum(['private', 'school', 'public']).optional(),
  template_id: z.string().uuid().optional(),
  cover_image_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  created_by: z.string().uuid().optional(),
});

// ── Peer Assessment ────────────────────────────────────────────────────────

export const peerAssessmentCreateSchema = z.object({
  school_id: schoolId,
  assessment_id: z.string().uuid(),
  assessor_id: z.string().uuid(),
  assessable_id: z.string().uuid(),
  assessable_type: z.enum(['student', 'group', 'project']),
  rubric_id: z.string().uuid().optional(),
  anonymous: z.boolean().optional(),
  scores: z.record(z.number()).optional(),
  comments: z.string().max(5000).optional(),
  submitted_at: z.string().datetime().optional(),
});

export const peerAssessmentUpdateSchema = z.object({
  school_id: schoolId,
  assessment_id: z.string().uuid().optional(),
  assessor_id: z.string().uuid().optional(),
  assessable_id: z.string().uuid().optional(),
  assessable_type: z.enum(['student', 'group', 'project']).optional(),
  rubric_id: z.string().uuid().optional(),
  anonymous: z.boolean().optional(),
  scores: z.record(z.number()).optional(),
  comments: z.string().max(5000).optional(),
  submitted_at: z.string().datetime().optional(),
});

// ── Self Assessment ────────────────────────────────────────────────────────

export const selfAssessmentCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  assessment_id: z.string().uuid(),
  rubric_id: z.string().uuid().optional(),
  scores: z.record(z.number()).optional(),
  reflections: z.string().max(10000).optional(),
  goals: z.array(z.string()).optional(),
  submitted_at: z.string().datetime().optional(),
});

export const selfAssessmentUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  assessment_id: z.string().uuid().optional(),
  rubric_id: z.string().uuid().optional(),
  scores: z.record(z.number()).optional(),
  reflections: z.string().max(10000).optional(),
  goals: z.array(z.string()).optional(),
  submitted_at: z.string().datetime().optional(),
});

// ── Teacher Assessment ─────────────────────────────────────────────────────

export const teacherAssessmentCreateSchema = z.object({
  school_id: schoolId,
  teacher_id: z.string().uuid(),
  student_id: z.string().uuid(),
  assessment_type: z.enum(['formative', 'summative', 'diagnostic', 'benchmark']),
  subject: z.string().min(1).max(200),
  scores: z.record(z.number()).optional(),
  rubric_id: z.string().uuid().optional(),
  comments: z.string().max(10000).optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  assessment_date: z.string().datetime().optional(),
});

export const teacherAssessmentUpdateSchema = z.object({
  school_id: schoolId,
  teacher_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  assessment_type: z.enum(['formative', 'summative', 'diagnostic', 'benchmark']).optional(),
  subject: z.string().min(1).max(200).optional(),
  scores: z.record(z.number()).optional(),
  rubric_id: z.string().uuid().optional(),
  comments: z.string().max(10000).optional(),
  evidence_urls: z.array(z.string().url()).optional(),
  assessment_date: z.string().datetime().optional(),
});

// ── External Assessment ────────────────────────────────────────────────────

export const externalAssessmentCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  exam_name: z.string().min(1).max(300),
  examining_body: z.string().min(1).max(300),
  exam_date: z.string().datetime(),
  score: z.number().min(0).optional(),
  max_score: z.number().min(1).optional(),
  grade: z.string().max(20).optional(),
  percentile: z.number().min(0).max(100).optional(),
  certificate_number: z.string().max(200).optional(),
  verified: z.boolean().optional(),
  evidence_url: z.string().url().optional(),
});

export const externalAssessmentUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  exam_name: z.string().min(1).max(300).optional(),
  examining_body: z.string().min(1).max(300).optional(),
  exam_date: z.string().datetime().optional(),
  score: z.number().min(0).optional(),
  max_score: z.number().min(1).optional(),
  grade: z.string().max(20).optional(),
  percentile: z.number().min(0).max(100).optional(),
  certificate_number: z.string().max(200).optional(),
  verified: z.boolean().optional(),
  evidence_url: z.string().url().optional(),
});

// ── Competency Report ──────────────────────────────────────────────────────

export const competencyReportCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  report_period: z.string().min(1).max(100),
  competencies: z.array(z.object({
    name: z.string().min(1).max(200),
    level: z.enum(['emerging', 'developing', 'proficient', 'advanced', 'exemplary']),
    score: z.number().min(0).max(100).optional(),
    evidence: z.array(z.string()).optional(),
  })),
  overall_level: z.enum(['emerging', 'developing', 'proficient', 'advanced', 'exemplary']).optional(),
  recommendations: z.string().max(5000).optional(),
  generated_by: z.string().uuid().optional(),
});

export const competencyReportUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  report_period: z.string().min(1).max(100).optional(),
  competencies: z.array(z.object({
    name: z.string().min(1).max(200),
    level: z.enum(['emerging', 'developing', 'proficient', 'advanced', 'exemplary']),
    score: z.number().min(0).max(100).optional(),
    evidence: z.array(z.string()).optional(),
  })).optional(),
  overall_level: z.enum(['emerging', 'developing', 'proficient', 'advanced', 'exemplary']).optional(),
  recommendations: z.string().max(5000).optional(),
  generated_by: z.string().uuid().optional(),
});

// ── Gap Analysis ───────────────────────────────────────────────────────────

export const gapAnalysisCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  target_program: z.string().min(1).max(300).optional(),
  required_competencies: z.array(z.object({
    competency: z.string().min(1).max(200),
    required_level: z.string().max(100),
    current_level: z.string().max(100).optional(),
    gap_size: z.number().optional(),
  })),
  analysis_date: z.string().datetime().optional(),
  priority_areas: z.array(z.string()).optional(),
  recommended_actions: z.array(z.string()).optional(),
  generated_by: z.string().uuid().optional(),
});

export const gapAnalysisUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  target_program: z.string().min(1).max(300).optional(),
  required_competencies: z.array(z.object({
    competency: z.string().min(1).max(200),
    required_level: z.string().max(100),
    current_level: z.string().max(100).optional(),
    gap_size: z.number().optional(),
  })).optional(),
  analysis_date: z.string().datetime().optional(),
  priority_areas: z.array(z.string()).optional(),
  recommended_actions: z.array(z.string()).optional(),
  generated_by: z.string().uuid().optional(),
});

// ── Learning Path Suggestion ───────────────────────────────────────────────

export const learningPathSuggestionCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  target_goal: z.string().min(1).max(300),
  current_level: z.string().max(100).optional(),
  estimated_duration_weeks: z.number().int().min(1).max(260).optional(),
  milestones: z.array(z.object({
    name: z.string().min(1).max(200),
    description: z.string().max(500).optional(),
    week_number: z.number().int().min(1).optional(),
    assessment_type: z.enum(['quiz', 'project', 'exam', 'portfolio']).optional(),
  })),
  learning_style: z.enum(['visual', 'auditory', 'kinesthetic', 'reading', 'mixed']).optional(),
  pace: z.enum(['self_paced', 'structured', 'intensive']).optional(),
  generated_by: z.string().uuid().optional(),
});

export const learningPathSuggestionUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  target_goal: z.string().min(1).max(300).optional(),
  current_level: z.string().max(100).optional(),
  estimated_duration_weeks: z.number().int().min(1).max(260).optional(),
  milestones: z.array(z.object({
    name: z.string().min(1).max(200),
    description: z.string().max(500).optional(),
    week_number: z.number().int().min(1).optional(),
    assessment_type: z.enum(['quiz', 'project', 'exam', 'portfolio']).optional(),
  })).optional(),
  learning_style: z.enum(['visual', 'auditory', 'kinesthetic', 'reading', 'mixed']).optional(),
  pace: z.enum(['self_paced', 'structured', 'intensive']).optional(),
  generated_by: z.string().uuid().optional(),
});

// ── Certification Eligibility ──────────────────────────────────────────────

export const certificationEligibilityCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  certification_id: z.string().uuid(),
  eligible: z.boolean(),
  requirements_met: z.array(z.object({
    requirement: z.string().min(1).max(200),
    met: z.boolean(),
    evidence: z.string().max(500).optional(),
  })),
  eligibility_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});

export const certificationEligibilityUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  certification_id: z.string().uuid().optional(),
  eligible: z.boolean().optional(),
  requirements_met: z.array(z.object({
    requirement: z.string().min(1).max(200),
    met: z.boolean(),
    evidence: z.string().max(500).optional(),
  })).optional(),
  eligibility_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});

// ── Skill Evolution Tracking ───────────────────────────────────────────────

export const skillEvolutionTrackingCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid(),
  skill_name: z.string().min(1).max(200),
  initial_level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']),
  current_level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
  measurement_method: z.enum(['assessment', 'portfolio', 'observation', 'self_report']).optional(),
  data_points: z.array(z.object({
    date: z.string().datetime(),
    level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']),
    evidence: z.string().max(500).optional(),
  })).optional(),
  growth_rate: z.number().optional(),
  predicted_next_level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
});

export const skillEvolutionTrackingUpdateSchema = z.object({
  school_id: schoolId,
  student_id: z.string().uuid().optional(),
  skill_name: z.string().min(1).max(200).optional(),
  initial_level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
  current_level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
  measurement_method: z.enum(['assessment', 'portfolio', 'observation', 'self_report']).optional(),
  data_points: z.array(z.object({
    date: z.string().datetime(),
    level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']),
    evidence: z.string().max(500).optional(),
  })).optional(),
  growth_rate: z.number().optional(),
  predicted_next_level: z.enum(['none', 'beginner', 'intermediate', 'advanced', 'expert']).optional(),
});

// ── National Exam ──────────────────────────────────────────────────────────

export const nationalExamCreateSchema = z.object({
  school_id: schoolId,
  exam_name: z.string().min(1).max(300),
  exam_code: z.string().min(1).max(50),
  subject: z.string().min(1).max(200),
  level: z.enum(['primary', 'middle', 'high', 'university']),
  academic_year: z.string().min(4).max(9),
  exam_date: z.string().datetime(),
  registration_deadline: z.string().datetime().optional(),
  max_participants: z.number().int().min(1).max(1000000).optional(),
  duration_minutes: z.number().int().min(1).max(600),
  total_marks: z.number().int().min(1).max(1000),
  passing_marks: z.number().int().min(0).optional(),
  regions: z.array(z.string()).optional(),
  language_options: z.array(z.string()).optional(),
});

export const nationalExamUpdateSchema = z.object({
  school_id: schoolId,
  exam_name: z.string().min(1).max(300).optional(),
  exam_code: z.string().min(1).max(50).optional(),
  subject: z.string().min(1).max(200).optional(),
  level: z.enum(['primary', 'middle', 'high', 'university']).optional(),
  academic_year: z.string().min(4).max(9).optional(),
  exam_date: z.string().datetime().optional(),
  registration_deadline: z.string().datetime().optional(),
  max_participants: z.number().int().min(1).max(1000000).optional(),
  duration_minutes: z.number().int().min(1).max(600).optional(),
  total_marks: z.number().int().min(1).max(1000).optional(),
  passing_marks: z.number().int().min(0).optional(),
  regions: z.array(z.string()).optional(),
  language_options: z.array(z.string()).optional(),
});

// ── Exam Center ────────────────────────────────────────────────────────────

export const examCenterCreateSchema = z.object({
  school_id: schoolId,
  center_name: z.string().min(1).max(300),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(200),
  region: z.string().min(1).max(200),
  country: z.string().min(2).max(100),
  postal_code: z.string().max(20).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity: z.number().int().min(1).max(10000),
  contact_person: z.string().max(200).optional(),
  contact_phone: z.string().max(30).optional(),
  contact_email: z.string().email().optional(),
  facilities: z.array(z.string()).optional(),
  accessible: z.boolean().optional(),
});

export const examCenterUpdateSchema = z.object({
  school_id: schoolId,
  center_name: z.string().min(1).max(300).optional(),
  address: z.string().min(1).max(500).optional(),
  city: z.string().min(1).max(200).optional(),
  region: z.string().min(1).max(200).optional(),
  country: z.string().min(2).max(100).optional(),
  postal_code: z.string().max(20).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity: z.number().int().min(1).max(10000).optional(),
  contact_person: z.string().max(200).optional(),
  contact_phone: z.string().max(30).optional(),
  contact_email: z.string().email().optional(),
  facilities: z.array(z.string()).optional(),
  accessible: z.boolean().optional(),
});

// ── Seat Allocation ────────────────────────────────────────────────────────

export const seatAllocationCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  center_id: z.string().uuid(),
  total_seats: z.number().int().min(1).max(10000),
  allocated_seats: z.number().int().min(0).optional(),
  room_assignments: z.array(z.object({
    room: z.string().min(1).max(100),
    capacity: z.number().int().min(1).max(1000),
    allocated: z.number().int().min(0).optional(),
  })).optional(),
  allocation_date: z.string().datetime().optional(),
  status: z.enum(['planned', 'open', 'filling', 'full', 'closed']).optional(),
});

export const seatAllocationUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  center_id: z.string().uuid().optional(),
  total_seats: z.number().int().min(1).max(10000).optional(),
  allocated_seats: z.number().int().min(0).optional(),
  room_assignments: z.array(z.object({
    room: z.string().min(1).max(100),
    capacity: z.number().int().min(1).max(1000),
    allocated: z.number().int().min(0).optional(),
  })).optional(),
  allocation_date: z.string().datetime().optional(),
  status: z.enum(['planned', 'open', 'filling', 'full', 'closed']).optional(),
});

// ── Candidate Registration ─────────────────────────────────────────────────

export const candidateRegistrationCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  registration_number: z.string().min(1).max(100),
  center_id: z.string().uuid().optional(),
  seat_number: z.string().max(50).optional(),
  registration_date: z.string().datetime(),
  fee_paid: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  documents_submitted: z.array(z.string()).optional(),
  special_requirements: z.string().max(1000).optional(),
  status: z.enum(['pending', 'confirmed', 'waitlisted', 'cancelled']).optional(),
});

export const candidateRegistrationUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  registration_number: z.string().min(1).max(100).optional(),
  center_id: z.string().uuid().optional(),
  seat_number: z.string().max(50).optional(),
  registration_date: z.string().datetime().optional(),
  fee_paid: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  documents_submitted: z.array(z.string()).optional(),
  special_requirements: z.string().max(1000).optional(),
  status: z.enum(['pending', 'confirmed', 'waitlisted', 'cancelled']).optional(),
});

// ── Anonymous Number ───────────────────────────────────────────────────────

export const anonymousNumberCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  anonymous_number: z.string().min(1).max(50),
  barcode: z.string().max(200).optional(),
  qr_code: z.string().max(500).optional(),
  issued_at: z.string().datetime().optional(),
  paper_version: z.number().int().min(1).optional(),
  batch_id: z.string().uuid().optional(),
});

export const anonymousNumberUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  anonymous_number: z.string().min(1).max(50).optional(),
  barcode: z.string().max(200).optional(),
  qr_code: z.string().max(500).optional(),
  issued_at: z.string().datetime().optional(),
  paper_version: z.number().int().min(1).optional(),
  batch_id: z.string().uuid().optional(),
});

// ── Exam Distribution ──────────────────────────────────────────────────────

export const examDistributionCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  center_id: z.string().uuid(),
  distribution_date: z.string().datetime(),
  papers_received: z.number().int().min(0).optional(),
  papers_sealed: z.number().int().min(0).optional(),
  security_level: z.enum(['standard', 'enhanced', 'maximum']).optional(),
  chain_of_custody: z.array(z.object({
    person: z.string().min(1).max(200),
    timestamp: z.string().datetime(),
    action: z.string().min(1).max(100),
  })).optional(),
  status: z.enum(['preparing', 'in_transit', 'delivered', 'sealed', 'opened']).optional(),
});

export const examDistributionUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  center_id: z.string().uuid().optional(),
  distribution_date: z.string().datetime().optional(),
  papers_received: z.number().int().min(0).optional(),
  papers_sealed: z.number().int().min(0).optional(),
  security_level: z.enum(['standard', 'enhanced', 'maximum']).optional(),
  chain_of_custody: z.array(z.object({
    person: z.string().min(1).max(200),
    timestamp: z.string().datetime(),
    action: z.string().min(1).max(100),
  })).optional(),
  status: z.enum(['preparing', 'in_transit', 'delivered', 'sealed', 'opened']).optional(),
});

// ── Secure Printing ────────────────────────────────────────────────────────

export const securePrintingCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  print_job_id: z.string().uuid().optional(),
  copies_per_paper: z.number().int().min(1).max(10).optional(),
  watermark_text: z.string().max(200).optional(),
  security_paper: z.boolean().optional(),
  microprint: z.boolean().optional(),
  uv_features: z.boolean().optional(),
  sequential_numbering: z.boolean().optional(),
  tracking_barcode: z.boolean().optional(),
  printer_id: z.string().uuid().optional(),
  printed_by: z.string().uuid().optional(),
  printed_at: z.string().datetime().optional(),
});

export const securePrintingUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  print_job_id: z.string().uuid().optional(),
  copies_per_paper: z.number().int().min(1).max(10).optional(),
  watermark_text: z.string().max(200).optional(),
  security_paper: z.boolean().optional(),
  microprint: z.boolean().optional(),
  uv_features: z.boolean().optional(),
  sequential_numbering: z.boolean().optional(),
  tracking_barcode: z.boolean().optional(),
  printer_id: z.string().uuid().optional(),
  printed_by: z.string().uuid().optional(),
  printed_at: z.string().datetime().optional(),
});

// ── Correction Center ──────────────────────────────────────────────────────

export const correctionCenterCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  center_name: z.string().min(1).max(300),
  address: z.string().max(500).optional(),
  max_papers: z.number().int().min(1).max(100000).optional(),
  staff_count: z.number().int().min(0).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  security_level: z.enum(['standard', 'enhanced', 'maximum']).optional(),
  cctv_enabled: z.boolean().optional(),
  access_control: z.boolean().optional(),
  status: z.enum(['preparing', 'active', 'completed', 'archived']).optional(),
});

export const correctionCenterUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  center_name: z.string().min(1).max(300).optional(),
  address: z.string().max(500).optional(),
  max_papers: z.number().int().min(1).max(100000).optional(),
  staff_count: z.number().int().min(0).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  security_level: z.enum(['standard', 'enhanced', 'maximum']).optional(),
  cctv_enabled: z.boolean().optional(),
  access_control: z.boolean().optional(),
  status: z.enum(['preparing', 'active', 'completed', 'archived']).optional(),
});

// ── Marker Assignment ──────────────────────────────────────────────────────

export const markerAssignmentCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  marker_id: z.string().uuid(),
  question_section: z.string().min(1).max(200),
  assigned_papers: z.number().int().min(0).optional(),
  max_papers: z.number().int().min(1).max(5000).optional(),
  assigned_at: z.string().datetime().optional(),
  deadline: z.string().datetime().optional(),
  payment_rate: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  status: z.enum(['assigned', 'in_progress', 'completed', 'reassigned']).optional(),
});

export const markerAssignmentUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  marker_id: z.string().uuid().optional(),
  question_section: z.string().min(1).max(200).optional(),
  assigned_papers: z.number().int().min(0).optional(),
  max_papers: z.number().int().min(1).max(5000).optional(),
  assigned_at: z.string().datetime().optional(),
  deadline: z.string().datetime().optional(),
  payment_rate: z.number().min(0).optional(),
  currency: z.string().min(3).max(3).optional(),
  status: z.enum(['assigned', 'in_progress', 'completed', 'reassigned']).optional(),
});

// ── Double Marking ─────────────────────────────────────────────────────────

export const doubleMarkingCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  percentage_sample: z.number().min(0).max(100).optional(),
  agreement_threshold: z.number().min(0).max(100).optional(),
  escalation_threshold: z.number().min(0).max(100).optional(),
  primary_marker_id: z.string().uuid().optional(),
  secondary_marker_id: z.string().uuid().optional(),
  adjudicator_id: z.string().uuid().optional(),
  sections: z.array(z.string()).optional(),
});

export const doubleMarkingUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  percentage_sample: z.number().min(0).max(100).optional(),
  agreement_threshold: z.number().min(0).max(100).optional(),
  escalation_threshold: z.number().min(0).max(100).optional(),
  primary_marker_id: z.string().uuid().optional(),
  secondary_marker_id: z.string().uuid().optional(),
  adjudicator_id: z.string().uuid().optional(),
  sections: z.array(z.string()).optional(),
});

// ── Moderation ─────────────────────────────────────────────────────────────

export const moderationCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  moderator_id: z.string().uuid(),
  moderation_type: z.enum(['pre_moderation', 'post_moderation', 'continuous']),
  sample_size: z.number().int().min(1).max(10000).optional(),
  criteria: z.array(z.string()).optional(),
  notes: z.string().max(5000).optional(),
  findings: z.string().max(10000).optional(),
  recommendations: z.string().max(5000).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
});

export const moderationUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  moderator_id: z.string().uuid().optional(),
  moderation_type: z.enum(['pre_moderation', 'post_moderation', 'continuous']).optional(),
  sample_size: z.number().int().min(1).max(10000).optional(),
  criteria: z.array(z.string()).optional(),
  notes: z.string().max(5000).optional(),
  findings: z.string().max(10000).optional(),
  recommendations: z.string().max(5000).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
});

// ── Appeal ─────────────────────────────────────────────────────────────────

export const appealCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  student_id: z.string().uuid(),
  appeal_type: z.enum(['grading', 'procedural', 'accommodation', 'result']),
  grounds: z.string().min(1).max(5000),
  supporting_evidence: z.array(z.string().url()).optional(),
  filed_date: z.string().datetime(),
  deadline: z.string().datetime().optional(),
  reviewer_id: z.string().uuid().optional(),
  decision: z.enum(['upheld', 'partially_upheld', 'dismissed', 'pending']).optional(),
  decision_notes: z.string().max(5000).optional(),
  decision_date: z.string().datetime().optional(),
});

export const appealUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  appeal_type: z.enum(['grading', 'procedural', 'accommodation', 'result']).optional(),
  grounds: z.string().min(1).max(5000).optional(),
  supporting_evidence: z.array(z.string().url()).optional(),
  filed_date: z.string().datetime().optional(),
  deadline: z.string().datetime().optional(),
  reviewer_id: z.string().uuid().optional(),
  decision: z.enum(['upheld', 'partially_upheld', 'dismissed', 'pending']).optional(),
  decision_notes: z.string().max(5000).optional(),
  decision_date: z.string().datetime().optional(),
});

// ── Results Publication ────────────────────────────────────────────────────

export const resultsPublicationCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  publication_date: z.string().datetime(),
  publication_method: z.enum(['online', 'mail', 'sms', 'in_person', 'mixed']),
  show_individual_scores: z.boolean().optional(),
  show_ranking: z.boolean().optional(),
  show_percentile: z.boolean().optional(),
  show_pass_fail: z.boolean().optional(),
  access_code_required: z.boolean().optional(),
  access_code: z.string().max(50).optional(),
  notification_sent: z.boolean().optional(),
  embargo_until: z.string().datetime().optional(),
  published_by: z.string().uuid().optional(),
});

export const resultsPublicationUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  publication_date: z.string().datetime().optional(),
  publication_method: z.enum(['online', 'mail', 'sms', 'in_person', 'mixed']).optional(),
  show_individual_scores: z.boolean().optional(),
  show_ranking: z.boolean().optional(),
  show_percentile: z.boolean().optional(),
  show_pass_fail: z.boolean().optional(),
  access_code_required: z.boolean().optional(),
  access_code: z.string().max(50).optional(),
  notification_sent: z.boolean().optional(),
  embargo_until: z.string().datetime().optional(),
  published_by: z.string().uuid().optional(),
});

// ── Exam Ranking ───────────────────────────────────────────────────────────

export const examRankingCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  ranking_type: z.enum(['overall', 'by_subject', 'by_region', 'by_school']),
  include_ties: z.boolean().optional(),
  tie_breaker_method: z.enum(['none', 'time', 'age', 'alphabetical']).optional(),
  show_percentile: z.boolean().optional(),
  top_n: z.number().int().min(1).max(10000).optional(),
  region: z.string().max(200).optional(),
  calculated_at: z.string().datetime().optional(),
  total_candidates: z.number().int().min(0).optional(),
});

export const examRankingUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  ranking_type: z.enum(['overall', 'by_subject', 'by_region', 'by_school']).optional(),
  include_ties: z.boolean().optional(),
  tie_breaker_method: z.enum(['none', 'time', 'age', 'alphabetical']).optional(),
  show_percentile: z.boolean().optional(),
  top_n: z.number().int().min(1).max(10000).optional(),
  region: z.string().max(200).optional(),
  calculated_at: z.string().datetime().optional(),
  total_candidates: z.number().int().min(0).optional(),
});

// ── National Analytics ─────────────────────────────────────────────────────

export const nationalAnalyticsCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  academic_year: z.string().min(4).max(9),
  total_candidates: z.number().int().min(0).optional(),
  average_score: z.number().min(0).optional(),
  median_score: z.number().min(0).optional(),
  standard_deviation: z.number().min(0).optional(),
  pass_rate: z.number().min(0).max(1).optional(),
  grade_distribution: z.record(z.number()).optional(),
  regional_comparison: z.record(z.unknown()).optional(),
  gender_analysis: z.record(z.unknown()).optional(),
  trend_data: z.array(z.unknown()).optional(),
  generated_at: z.string().datetime().optional(),
});

export const nationalAnalyticsUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  academic_year: z.string().min(4).max(9).optional(),
  total_candidates: z.number().int().min(0).optional(),
  average_score: z.number().min(0).optional(),
  median_score: z.number().min(0).optional(),
  standard_deviation: z.number().min(0).optional(),
  pass_rate: z.number().min(0).max(1).optional(),
  grade_distribution: z.record(z.number()).optional(),
  regional_comparison: z.record(z.unknown()).optional(),
  gender_analysis: z.record(z.unknown()).optional(),
  trend_data: z.array(z.unknown()).optional(),
  generated_at: z.string().datetime().optional(),
});
