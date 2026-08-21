// =============================================================================
// Phase 3.4 — Education Operating System (EduOS)
// Module 7: National Registry & Blockchain Integration
// Module 8: Blockchain Education Infrastructure
// =============================================================================

// =============================================================================
// MODULE 7 — National Registry Enums
// =============================================================================

export enum RegistryType {
  SCHOOL = "SCHOOL",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  GRADUATE = "GRADUATE",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  EMPLOYER = "EMPLOYER",
  RESEARCH = "RESEARCH",
  INSTITUTION = "INSTITUTION",
}

export enum RegistryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  ARCHIVED = "ARCHIVED",
}

export enum VerificationStatus {
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export enum RecordStatus {
  CURRENT = "CURRENT",
  HISTORICAL = "HISTORICAL",
  SUPERSEDED = "SUPERSEDED",
  REVOKED = "REVOKED",
}

export enum RegistryAccessLevel {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
  GOVERNMENT_ONLY = "GOVERNMENT_ONLY",
}

export enum DataQualityScore {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  UNKNOWN = "UNKNOWN",
}

// =============================================================================
// MODULE 8 — Blockchain Education Enums
// =============================================================================

export enum BlockchainNetwork {
  ETHEREUM = "ETHEREUM",
  POLYGON = "POLYGON",
  SOLANA = "SOLANA",
  HYPERLEDGER = "HYPERLEDGER",
  PRIVATE = "PRIVATE",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
  REVERSED = "REVERSED",
}

export enum SmartContractStatus {
  DEPLOYED = "DEPLOYED",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  TERMINATED = "TERMINATED",
}

export enum LedgerEntryStatus {
  COMMITTED = "COMMITTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum VerificationMethod {
  QR_CODE = "QR_CODE",
  PUBLIC_URL = "PUBLIC_URL",
  BLOCKCHAIN_TX = "BLOCKCHAIN_TX",
  API = "API",
  MANUAL = "MANUAL",
}

export enum BlockStatus {
  MINED = "MINED",
  PENDING = "PENDING",
  ORPHANED = "ORPHANED",
}

// =============================================================================
// MODULE 7 — National Registry Interfaces
// =============================================================================

export interface SchoolRegistry {
  id: string;
  school_id: string;
  registration_number: string;
  name: string;
  name_local: string;
  school_type: string;
  address: string;
  region: string;
  department: string;
  commune: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  email: string;
  website: string | null;
  student_count: number;
  teacher_count: number;
  accreditation_status: string;
  accreditation_date: string | null;
  status: RegistryStatus;
  data_quality: DataQualityScore;
  last_verified: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherRegistry {
  id: string;
  national_id: string;
  teacher_id: string;
  school_id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  qualification: string;
  specialization: string[];
  years_experience: number;
  certification_status: string;
  certification_date: string | null;
  employment_status: string;
  status: RegistryStatus;
  data_quality: DataQualityScore;
  last_verified: string;
  created_at: string;
  updated_at: string;
}

export interface StudentRegistry {
  id: string;
  national_id: string;
  student_id: string;
  school_id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  grade_level: string;
  enrollment_date: string;
  enrollment_status: string;
  guardian_name: string;
  guardian_contact: string;
  status: RegistryStatus;
  data_quality: DataQualityScore;
  last_verified: string;
  created_at: string;
  updated_at: string;
}

export interface GraduateRegistry {
  id: string;
  national_id: string;
  graduate_id: string;
  student_id: string;
  school_id: string;
  full_name: string;
  graduation_date: string;
  program: string;
  degree: string;
  gpa: number | null;
  honors: string | null;
  current_employment: string | null;
  current_employer: string | null;
  status: RegistryStatus;
  data_quality: DataQualityScore;
  last_verified: string;
  created_at: string;
  updated_at: string;
}

export interface DiplomaRegistry {
  id: string;
  diploma_number: string;
  graduate_id: string;
  school_id: string;
  diploma_type: string;
  program: string;
  specialization: string;
  graduation_date: string;
  gpa: number | null;
  honors: string | null;
  status: RecordStatus;
  verification_code: string;
  blockchain_tx: string | null;
  issued_at: string;
  created_at: string;
  updated_at: string;
}

export interface CertificateRegistryEntry {
  id: string;
  certificate_number: string;
  holder_id: string;
  school_id: string;
  certificate_type: string;
  title: string;
  issued_at: string;
  expires_at: string | null;
  status: RecordStatus;
  verification_code: string;
  blockchain_tx: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployerRegistry {
  id: string;
  employer_id: string;
  company_name: string;
  registration_number: string;
  industry: string;
  address: string;
  country: string;
  contact_email: string;
  contact_phone: string;
  website: string | null;
  employee_count: number | null;
  status: RegistryStatus;
  created_at: string;
  updated_at: string;
}

export interface ResearchRegistry {
  id: string;
  research_id: string;
  institution_id: string;
  title: string;
  principal_investigator: string;
  research_area: string;
  funding_source: string | null;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface InstitutionRegistry {
  id: string;
  institution_id: string;
  name: string;
  institution_type: string;
  country: string;
  region: string;
  accreditation_body: string;
  accreditation_status: string;
  programs_offered: string[];
  student_count: number | null;
  status: RegistryStatus;
  created_at: string;
  updated_at: string;
}

export interface NationalAnalyticsRecord {
  id: string;
  registry_type: RegistryType;
  total_records: number;
  active_records: number;
  verified_records: number;
  pending_verification: number;
  data_quality_distribution: Record<string, number>;
  last_analyzed: string;
  created_at: string;
}

export interface RegistrySearchQuery {
  id: string;
  registry_type: RegistryType;
  query: string;
  filters: Record<string, unknown>;
  results_count: number;
  searched_at: string;
}

export interface RegistryBulkImport {
  id: string;
  registry_type: RegistryType;
  file_name: string;
  total_records: number;
  imported: number;
  failed: number;
  errors: string[];
  status: string;
  created_at: string;
}

export interface RegistryExport {
  id: string;
  registry_type: RegistryType;
  format: string;
  filters: Record<string, unknown>;
  file_url: string | null;
  status: string;
  created_at: string;
}

// =============================================================================
// MODULE 8 — Blockchain Education Interfaces
// =============================================================================

export interface CredentialBlockchain {
  id: string;
  school_id: string;
  network: BlockchainNetwork;
  contract_address: string;
  chain_id: number;
  credentials_issued: number;
  last_block: number;
  status: SmartContractStatus;
  deployed_at: string;
  created_at: string;
}

export interface TranscriptBlockchain {
  id: string;
  student_id: string;
  school_id: string;
  transcript_hash: string;
  ipfs_hash: string;
  blockchain_network: BlockchainNetwork;
  transaction_hash: string;
  block_number: number;
  confirmed: boolean;
  created_at: string;
}

export interface DiplomaLedger {
  id: string;
  diploma_id: string;
  school_id: string;
  diploma_hash: string;
  previous_hash: string;
  blockchain_network: BlockchainNetwork;
  transaction_hash: string;
  block_number: number;
  status: LedgerEntryStatus;
  created_at: string;
}

export interface AcademicLedger {
  id: string;
  student_id: string;
  school_id: string;
  academic_record_hash: string;
  record_type: string;
  blockchain_network: BlockchainNetwork;
  transaction_hash: string;
  block_number: number;
  status: LedgerEntryStatus;
  created_at: string;
}

export interface CertificateLedger {
  id: string;
  certificate_id: string;
  school_id: string;
  certificate_hash: string;
  blockchain_network: BlockchainNetwork;
  transaction_hash: string;
  block_number: number;
  status: LedgerEntryStatus;
  created_at: string;
}

export interface VerificationPortal {
  id: string;
  school_id: string;
  portal_url: string;
  api_endpoint: string;
  public_key: string;
  total_verifications: number;
  successful_verifications: number;
  created_at: string;
}

export interface SmartContract {
  id: string;
  school_id: string;
  name: string;
  contract_type: string;
  network: BlockchainNetwork;
  address: string;
  abi: Record<string, unknown>;
  bytecode: string;
  deployed_by: string;
  status: SmartContractStatus;
  deployed_at: string;
  created_at: string;
}

export interface ImmutableAudit {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  details: Record<string, unknown>;
  user_id: string;
  blockchain_network: BlockchainNetwork;
  transaction_hash: string;
  block_number: number;
  timestamp: string;
}

export interface BlockchainExplorer {
  id: string;
  school_id: string;
  network: BlockchainNetwork;
  explorer_url: string;
  api_url: string;
  last_sync: string;
  total_transactions: number;
  created_at: string;
}

export interface BlockchainTransaction {
  id: string;
  school_id: string;
  network: BlockchainNetwork;
  transaction_hash: string;
  from_address: string;
  to_address: string;
  value: number;
  gas_used: number;
  status: TransactionStatus;
  block_number: number;
  timestamp: string;
  created_at: string;
}

export interface BlockchainAuditTrail {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  events: BlockchainEvent[];
  chain_of_custody: ChainOfCustodyEntry[];
  created_at: string;
}

export interface BlockchainEvent {
  event_type: string;
  data: Record<string, unknown>;
  block_number: number;
  transaction_hash: string;
  timestamp: string;
}

export interface ChainOfCustodyEntry {
  action: string;
  performed_by: string;
  timestamp: string;
  transaction_hash: string;
  details: string;
}
