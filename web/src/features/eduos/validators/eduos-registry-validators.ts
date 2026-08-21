import { z } from 'zod';

const schoolId = z.string().uuid();

const registryTypeEnum = z.enum([
  'SCHOOL',
  'TEACHER',
  'STUDENT',
  'GRADUATE',
  'DIPLOMA',
  'CERTIFICATE',
  'EMPLOYER',
  'RESEARCH',
  'INSTITUTION',
]);

const registryStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED', 'ARCHIVED']);

const recordStatusEnum = z.enum(['CURRENT', 'HISTORICAL', 'SUPERSEDED', 'REVOKED']);

const dataQualityScoreEnum = z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'UNKNOWN']);

const blockchainNetworkEnum = z.enum(['ETHEREUM', 'POLYGON', 'SOLANA', 'HYPERLEDGER', 'PRIVATE']);

const transactionStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'FAILED', 'REVERSED']);

const smartContractStatusEnum = z.enum(['DEPLOYED', 'ACTIVE', 'PAUSED', 'TERMINATED']);

const ledgerEntryStatusEnum = z.enum(['COMMITTED', 'PENDING', 'REJECTED']);

// ── Blockchain Event ────────

export const blockchainEventCreateSchema = z.object({
  event_type: z.string(),
  data: z.record(z.unknown()),
  block_number: z.number(),
  transaction_hash: z.string(),
  timestamp: z.string().datetime(),
});

export const blockchainEventUpdateSchema = z.object({
  event_type: z.string().optional(),
  data: z.record(z.unknown()).optional(),
  block_number: z.number().optional(),
  transaction_hash: z.string().optional(),
  timestamp: z.string().datetime().optional(),
});

// ── Chain of Custody Entry ────────

export const chainOfCustodyEntryCreateSchema = z.object({
  action: z.string(),
  performed_by: z.string(),
  timestamp: z.string().datetime(),
  transaction_hash: z.string(),
  details: z.string(),
});

export const chainOfCustodyEntryUpdateSchema = z.object({
  action: z.string().optional(),
  performed_by: z.string().optional(),
  timestamp: z.string().datetime().optional(),
  transaction_hash: z.string().optional(),
  details: z.string().optional(),
});

// ── School Registry ────────

export const schoolRegistryCreateSchema = z.object({
  school_id: schoolId,
  registration_number: z.string(),
  name: z.string(),
  name_local: z.string(),
  school_type: z.string(),
  address: z.string(),
  region: z.string(),
  department: z.string(),
  commune: z.string(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  phone: z.string(),
  email: z.string(),
  website: z.string().nullable().optional(),
  student_count: z.number(),
  teacher_count: z.number(),
  accreditation_status: z.string(),
  accreditation_date: z.string().datetime().optional(),
  status: registryStatusEnum,
  data_quality: dataQualityScoreEnum,
  last_verified: z.string().datetime(),
});

export const schoolRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  registration_number: z.string().optional(),
  name: z.string().optional(),
  name_local: z.string().optional(),
  school_type: z.string().optional(),
  address: z.string().optional(),
  region: z.string().optional(),
  department: z.string().optional(),
  commune: z.string().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().nullable().optional(),
  student_count: z.number().optional(),
  teacher_count: z.number().optional(),
  accreditation_status: z.string().optional(),
  accreditation_date: z.string().datetime().optional(),
  status: registryStatusEnum.optional(),
  data_quality: dataQualityScoreEnum.optional(),
  last_verified: z.string().datetime().optional(),
});

// ── Teacher Registry ────────

export const teacherRegistryCreateSchema = z.object({
  school_id: schoolId,
  national_id: z.string(),
  teacher_id: z.string(),
  full_name: z.string(),
  date_of_birth: z.string().datetime(),
  gender: z.string(),
  qualification: z.string(),
  specialization: z.array(z.string()),
  years_experience: z.number(),
  certification_status: z.string(),
  certification_date: z.string().datetime().optional(),
  employment_status: z.string(),
  status: registryStatusEnum,
  data_quality: dataQualityScoreEnum,
  last_verified: z.string().datetime(),
});

export const teacherRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_id: z.string().optional(),
  teacher_id: z.string().optional(),
  full_name: z.string().optional(),
  date_of_birth: z.string().datetime().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  specialization: z.array(z.string()).optional(),
  years_experience: z.number().optional(),
  certification_status: z.string().optional(),
  certification_date: z.string().datetime().optional(),
  employment_status: z.string().optional(),
  status: registryStatusEnum.optional(),
  data_quality: dataQualityScoreEnum.optional(),
  last_verified: z.string().datetime().optional(),
});

// ── Student Registry ────────

export const studentRegistryCreateSchema = z.object({
  school_id: schoolId,
  national_id: z.string(),
  student_id: z.string(),
  full_name: z.string(),
  date_of_birth: z.string().datetime(),
  gender: z.string(),
  grade_level: z.string(),
  enrollment_date: z.string().datetime(),
  enrollment_status: z.string(),
  guardian_name: z.string(),
  guardian_contact: z.string(),
  status: registryStatusEnum,
  data_quality: dataQualityScoreEnum,
  last_verified: z.string().datetime(),
});

export const studentRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_id: z.string().optional(),
  student_id: z.string().optional(),
  full_name: z.string().optional(),
  date_of_birth: z.string().datetime().optional(),
  gender: z.string().optional(),
  grade_level: z.string().optional(),
  enrollment_date: z.string().datetime().optional(),
  enrollment_status: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_contact: z.string().optional(),
  status: registryStatusEnum.optional(),
  data_quality: dataQualityScoreEnum.optional(),
  last_verified: z.string().datetime().optional(),
});

// ── Graduate Registry ────────

export const graduateRegistryCreateSchema = z.object({
  school_id: schoolId,
  national_id: z.string(),
  graduate_id: z.string(),
  student_id: z.string(),
  full_name: z.string(),
  graduation_date: z.string().datetime(),
  program: z.string(),
  degree: z.string(),
  gpa: z.number().nullable().optional(),
  honors: z.string().nullable().optional(),
  current_employment: z.string().nullable().optional(),
  current_employer: z.string().nullable().optional(),
  status: registryStatusEnum,
  data_quality: dataQualityScoreEnum,
  last_verified: z.string().datetime(),
});

export const graduateRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  national_id: z.string().optional(),
  graduate_id: z.string().optional(),
  student_id: z.string().optional(),
  full_name: z.string().optional(),
  graduation_date: z.string().datetime().optional(),
  program: z.string().optional(),
  degree: z.string().optional(),
  gpa: z.number().nullable().optional(),
  honors: z.string().nullable().optional(),
  current_employment: z.string().nullable().optional(),
  current_employer: z.string().nullable().optional(),
  status: registryStatusEnum.optional(),
  data_quality: dataQualityScoreEnum.optional(),
  last_verified: z.string().datetime().optional(),
});

// ── Diploma Registry ────────

export const diplomaRegistryCreateSchema = z.object({
  school_id: schoolId,
  diploma_number: z.string(),
  graduate_id: z.string(),
  diploma_type: z.string(),
  program: z.string(),
  specialization: z.string(),
  graduation_date: z.string().datetime(),
  gpa: z.number().nullable().optional(),
  honors: z.string().nullable().optional(),
  status: recordStatusEnum,
  verification_code: z.string(),
  blockchain_tx: z.string().nullable().optional(),
  issued_at: z.string().datetime(),
});

export const diplomaRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  diploma_number: z.string().optional(),
  graduate_id: z.string().optional(),
  diploma_type: z.string().optional(),
  program: z.string().optional(),
  specialization: z.string().optional(),
  graduation_date: z.string().datetime().optional(),
  gpa: z.number().nullable().optional(),
  honors: z.string().nullable().optional(),
  status: recordStatusEnum.optional(),
  verification_code: z.string().optional(),
  blockchain_tx: z.string().nullable().optional(),
  issued_at: z.string().datetime().optional(),
});

// ── Certificate Registry ────────

export const certificateRegistryEntryCreateSchema = z.object({
  school_id: schoolId,
  certificate_number: z.string(),
  holder_id: z.string(),
  certificate_type: z.string(),
  title: z.string(),
  issued_at: z.string().datetime(),
  expires_at: z.string().datetime().optional(),
  status: recordStatusEnum,
  verification_code: z.string(),
  blockchain_tx: z.string().nullable().optional(),
});

export const certificateRegistryEntryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  certificate_number: z.string().optional(),
  holder_id: z.string().optional(),
  certificate_type: z.string().optional(),
  title: z.string().optional(),
  issued_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
  status: recordStatusEnum.optional(),
  verification_code: z.string().optional(),
  blockchain_tx: z.string().nullable().optional(),
});

// ── Employer Registry ────────

export const employerRegistryCreateSchema = z.object({
  school_id: schoolId,
  employer_id: z.string(),
  company_name: z.string(),
  registration_number: z.string(),
  industry: z.string(),
  address: z.string(),
  country: z.string(),
  contact_email: z.string(),
  contact_phone: z.string(),
  website: z.string().nullable().optional(),
  employee_count: z.number().nullable().optional(),
  status: registryStatusEnum,
});

export const employerRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  employer_id: z.string().optional(),
  company_name: z.string().optional(),
  registration_number: z.string().optional(),
  industry: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  contact_email: z.string().optional(),
  contact_phone: z.string().optional(),
  website: z.string().nullable().optional(),
  employee_count: z.number().nullable().optional(),
  status: registryStatusEnum.optional(),
});

// ── Research Registry ────────

export const researchRegistryCreateSchema = z.object({
  school_id: schoolId,
  research_id: z.string(),
  institution_id: z.string(),
  title: z.string(),
  principal_investigator: z.string(),
  research_area: z.string(),
  funding_source: z.string().nullable().optional(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  status: z.string(),
});

export const researchRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  research_id: z.string().optional(),
  institution_id: z.string().optional(),
  title: z.string().optional(),
  principal_investigator: z.string().optional(),
  research_area: z.string().optional(),
  funding_source: z.string().nullable().optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  status: z.string().optional(),
});

// ── Institution Registry ────────

export const institutionRegistryCreateSchema = z.object({
  school_id: schoolId,
  institution_id: z.string(),
  name: z.string(),
  institution_type: z.string(),
  country: z.string(),
  region: z.string(),
  accreditation_body: z.string(),
  accreditation_status: z.string(),
  programs_offered: z.array(z.string()),
  student_count: z.number().nullable().optional(),
  status: registryStatusEnum,
});

export const institutionRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  institution_id: z.string().optional(),
  name: z.string().optional(),
  institution_type: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  accreditation_body: z.string().optional(),
  accreditation_status: z.string().optional(),
  programs_offered: z.array(z.string()).optional(),
  student_count: z.number().nullable().optional(),
  status: registryStatusEnum.optional(),
});

// ── National Analytics Record ────────

export const nationalAnalyticsRecordCreateSchema = z.object({
  school_id: schoolId,
  registry_type: registryTypeEnum,
  total_records: z.number(),
  active_records: z.number(),
  verified_records: z.number(),
  pending_verification: z.number(),
  data_quality_distribution: z.record(z.number()),
  last_analyzed: z.string().datetime(),
});

export const nationalAnalyticsRecordUpdateSchema = z.object({
  school_id: schoolId.optional(),
  registry_type: registryTypeEnum.optional(),
  total_records: z.number().optional(),
  active_records: z.number().optional(),
  verified_records: z.number().optional(),
  pending_verification: z.number().optional(),
  data_quality_distribution: z.record(z.number()).optional(),
  last_analyzed: z.string().datetime().optional(),
});

// ── Registry Search Query ────────

export const registrySearchQueryCreateSchema = z.object({
  school_id: schoolId,
  registry_type: registryTypeEnum,
  query: z.string(),
  filters: z.record(z.unknown()),
  results_count: z.number(),
  searched_at: z.string().datetime(),
});

export const registrySearchQueryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  registry_type: registryTypeEnum.optional(),
  query: z.string().optional(),
  filters: z.record(z.unknown()).optional(),
  results_count: z.number().optional(),
  searched_at: z.string().datetime().optional(),
});

// ── Registry Bulk Import ────────

export const registryBulkImportCreateSchema = z.object({
  school_id: schoolId,
  registry_type: registryTypeEnum,
  file_name: z.string(),
  total_records: z.number(),
  imported: z.number(),
  failed: z.number(),
  errors: z.array(z.string()),
  status: z.string(),
});

export const registryBulkImportUpdateSchema = z.object({
  school_id: schoolId.optional(),
  registry_type: registryTypeEnum.optional(),
  file_name: z.string().optional(),
  total_records: z.number().optional(),
  imported: z.number().optional(),
  failed: z.number().optional(),
  errors: z.array(z.string()).optional(),
  status: z.string().optional(),
});

// ── Registry Export ────────

export const registryExportCreateSchema = z.object({
  school_id: schoolId,
  registry_type: registryTypeEnum,
  format: z.string(),
  filters: z.record(z.unknown()),
  file_url: z.string().nullable().optional(),
  status: z.string(),
});

export const registryExportUpdateSchema = z.object({
  school_id: schoolId.optional(),
  registry_type: registryTypeEnum.optional(),
  format: z.string().optional(),
  filters: z.record(z.unknown()).optional(),
  file_url: z.string().nullable().optional(),
  status: z.string().optional(),
});

// ── Credential Blockchain ────────

export const credentialBlockchainCreateSchema = z.object({
  school_id: schoolId,
  network: blockchainNetworkEnum,
  contract_address: z.string(),
  chain_id: z.number(),
  credentials_issued: z.number(),
  last_block: z.number(),
  status: smartContractStatusEnum,
  deployed_at: z.string().datetime(),
});

export const credentialBlockchainUpdateSchema = z.object({
  school_id: schoolId.optional(),
  network: blockchainNetworkEnum.optional(),
  contract_address: z.string().optional(),
  chain_id: z.number().optional(),
  credentials_issued: z.number().optional(),
  last_block: z.number().optional(),
  status: smartContractStatusEnum.optional(),
  deployed_at: z.string().datetime().optional(),
});

// ── Transcript Blockchain ────────

export const transcriptBlockchainCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string(),
  transcript_hash: z.string(),
  ipfs_hash: z.string(),
  blockchain_network: blockchainNetworkEnum,
  transaction_hash: z.string(),
  block_number: z.number(),
  confirmed: z.boolean(),
});

export const transcriptBlockchainUpdateSchema = z.object({
  school_id: schoolId.optional(),
  student_id: z.string().optional(),
  transcript_hash: z.string().optional(),
  ipfs_hash: z.string().optional(),
  blockchain_network: blockchainNetworkEnum.optional(),
  transaction_hash: z.string().optional(),
  block_number: z.number().optional(),
  confirmed: z.boolean().optional(),
});

// ── Diploma Ledger ────────

export const diplomaLedgerCreateSchema = z.object({
  school_id: schoolId,
  diploma_id: z.string(),
  diploma_hash: z.string(),
  previous_hash: z.string(),
  blockchain_network: blockchainNetworkEnum,
  transaction_hash: z.string(),
  block_number: z.number(),
  status: ledgerEntryStatusEnum,
});

export const diplomaLedgerUpdateSchema = z.object({
  school_id: schoolId.optional(),
  diploma_id: z.string().optional(),
  diploma_hash: z.string().optional(),
  previous_hash: z.string().optional(),
  blockchain_network: blockchainNetworkEnum.optional(),
  transaction_hash: z.string().optional(),
  block_number: z.number().optional(),
  status: ledgerEntryStatusEnum.optional(),
});

// ── Academic Ledger ────────

export const academicLedgerCreateSchema = z.object({
  school_id: schoolId,
  student_id: z.string(),
  academic_record_hash: z.string(),
  record_type: z.string(),
  blockchain_network: blockchainNetworkEnum,
  transaction_hash: z.string(),
  block_number: z.number(),
  status: ledgerEntryStatusEnum,
});

export const academicLedgerUpdateSchema = z.object({
  school_id: schoolId.optional(),
  student_id: z.string().optional(),
  academic_record_hash: z.string().optional(),
  record_type: z.string().optional(),
  blockchain_network: blockchainNetworkEnum.optional(),
  transaction_hash: z.string().optional(),
  block_number: z.number().optional(),
  status: ledgerEntryStatusEnum.optional(),
});

// ── Certificate Ledger ────────

export const certificateLedgerCreateSchema = z.object({
  school_id: schoolId,
  certificate_id: z.string(),
  certificate_hash: z.string(),
  blockchain_network: blockchainNetworkEnum,
  transaction_hash: z.string(),
  block_number: z.number(),
  status: ledgerEntryStatusEnum,
});

export const certificateLedgerUpdateSchema = z.object({
  school_id: schoolId.optional(),
  certificate_id: z.string().optional(),
  certificate_hash: z.string().optional(),
  blockchain_network: blockchainNetworkEnum.optional(),
  transaction_hash: z.string().optional(),
  block_number: z.number().optional(),
  status: ledgerEntryStatusEnum.optional(),
});

// ── Verification Portal ────────

export const verificationPortalCreateSchema = z.object({
  school_id: schoolId,
  portal_url: z.string(),
  api_endpoint: z.string(),
  public_key: z.string(),
  total_verifications: z.number(),
  successful_verifications: z.number(),
});

export const verificationPortalUpdateSchema = z.object({
  school_id: schoolId.optional(),
  portal_url: z.string().optional(),
  api_endpoint: z.string().optional(),
  public_key: z.string().optional(),
  total_verifications: z.number().optional(),
  successful_verifications: z.number().optional(),
});

// ── Smart Contract ────────

export const smartContractCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  contract_type: z.string(),
  network: blockchainNetworkEnum,
  address: z.string(),
  abi: z.record(z.unknown()),
  bytecode: z.string(),
  deployed_by: z.string(),
  status: smartContractStatusEnum,
  deployed_at: z.string().datetime(),
});

export const smartContractUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  contract_type: z.string().optional(),
  network: blockchainNetworkEnum.optional(),
  address: z.string().optional(),
  abi: z.record(z.unknown()).optional(),
  bytecode: z.string().optional(),
  deployed_by: z.string().optional(),
  status: smartContractStatusEnum.optional(),
  deployed_at: z.string().datetime().optional(),
});

// ── Immutable Audit ────────

export const immutableAuditCreateSchema = z.object({
  school_id: schoolId,
  entity_type: z.string(),
  entity_id: z.string(),
  action: z.string(),
  details: z.record(z.unknown()),
  user_id: z.string(),
  blockchain_network: blockchainNetworkEnum,
  transaction_hash: z.string(),
  block_number: z.number(),
  timestamp: z.string().datetime(),
});

export const immutableAuditUpdateSchema = z.object({
  school_id: schoolId.optional(),
  entity_type: z.string().optional(),
  entity_id: z.string().optional(),
  action: z.string().optional(),
  details: z.record(z.unknown()).optional(),
  user_id: z.string().optional(),
  blockchain_network: blockchainNetworkEnum.optional(),
  transaction_hash: z.string().optional(),
  block_number: z.number().optional(),
  timestamp: z.string().datetime().optional(),
});

// ── Blockchain Explorer ────────

export const blockchainExplorerCreateSchema = z.object({
  school_id: schoolId,
  network: blockchainNetworkEnum,
  explorer_url: z.string(),
  api_url: z.string(),
  last_sync: z.string().datetime(),
  total_transactions: z.number(),
});

export const blockchainExplorerUpdateSchema = z.object({
  school_id: schoolId.optional(),
  network: blockchainNetworkEnum.optional(),
  explorer_url: z.string().optional(),
  api_url: z.string().optional(),
  last_sync: z.string().datetime().optional(),
  total_transactions: z.number().optional(),
});

// ── Blockchain Transaction ────────

export const blockchainTransactionCreateSchema = z.object({
  school_id: schoolId,
  network: blockchainNetworkEnum,
  transaction_hash: z.string(),
  from_address: z.string(),
  to_address: z.string(),
  value: z.number(),
  gas_used: z.number(),
  status: transactionStatusEnum,
  block_number: z.number(),
  timestamp: z.string().datetime(),
});

export const blockchainTransactionUpdateSchema = z.object({
  school_id: schoolId.optional(),
  network: blockchainNetworkEnum.optional(),
  transaction_hash: z.string().optional(),
  from_address: z.string().optional(),
  to_address: z.string().optional(),
  value: z.number().optional(),
  gas_used: z.number().optional(),
  status: transactionStatusEnum.optional(),
  block_number: z.number().optional(),
  timestamp: z.string().datetime().optional(),
});

// ── Blockchain Audit Trail ────────

export const blockchainAuditTrailCreateSchema = z.object({
  school_id: schoolId,
  entity_type: z.string(),
  entity_id: z.string(),
  events: z.array(blockchainEventCreateSchema),
  chain_of_custody: z.array(chainOfCustodyEntryCreateSchema),
});

export const blockchainAuditTrailUpdateSchema = z.object({
  school_id: schoolId.optional(),
  entity_type: z.string().optional(),
  entity_id: z.string().optional(),
  events: z.array(blockchainEventUpdateSchema).optional(),
  chain_of_custody: z.array(chainOfCustodyEntryUpdateSchema).optional(),
});
