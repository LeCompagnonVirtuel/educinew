// Enterprise Platform Types - Data, DevOps, Open Platform, Production
// Phase 2.10 - EduCI Platform

// =============================================================================
// DOMAIN 9 - Data Platform
// =============================================================================

export const DataLakeStatus = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;
export type DataLakeStatus = (typeof DataLakeStatus)[keyof typeof DataLakeStatus];

export const DataLakeStorageType = {
  S3: 's3',
  GCS: 'gcs',
  AZURE_BLOB: 'azure_blob',
  HDFS: 'hdfs',
  LOCAL: 'local',
} as const;
export type DataLakeStorageType = (typeof DataLakeStorageType)[keyof typeof DataLakeStorageType];

export const DataLakeStorageClass = {
  STANDARD: 'standard',
  INFREQUENT: 'infrequent',
  ARCHIVE: 'archive',
  DEEP_ARCHIVE: 'deep_archive',
} as const;
export type DataLakeStorageClass = (typeof DataLakeStorageClass)[keyof typeof DataLakeStorageClass];

export interface DataLake {
  id: string;
  name: string;
  description: string;
  storage_type: DataLakeStorageType;
  storage_class: DataLakeStorageClass;
  size_bytes: number;
  status: DataLakeStatus;
  created_at: string;
  updated_at: string;
}

export interface DataLakeCreate {
  name: string;
  description: string;
  storage_type: DataLakeStorageType;
  storage_class: DataLakeStorageClass;
  size_bytes: number;
  status: DataLakeStatus;
}

export interface DataLakeUpdate {
  name?: string;
  description?: string;
  storage_type?: DataLakeStorageType;
  storage_class?: DataLakeStorageClass;
  size_bytes?: number;
  status?: DataLakeStatus;
}

export interface DataLakeQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataLakeDatasetStatus = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;
export type DataLakeDatasetStatus = (typeof DataLakeDatasetStatus)[keyof typeof DataLakeDatasetStatus];

export const DataLakeDatasetFormat = {
  PARQUET: 'parquet',
  AVRO: 'avro',
  ORC: 'orc',
  JSON: 'json',
  CSV: 'csv',
  DELTA: 'delta',
} as const;
export type DataLakeDatasetFormat = (typeof DataLakeDatasetFormat)[keyof typeof DataLakeDatasetFormat];

export interface DataLakeDataset {
  id: string;
  lake_id: string;
  name: string;
  format: DataLakeDatasetFormat;
  schema: string;
  partitioning: string;
  size_bytes: number;
  status: DataLakeDatasetStatus;
  created_at: string;
  updated_at: string;
}

export interface DataLakeDatasetCreate {
  lake_id: string;
  name: string;
  format: DataLakeDatasetFormat;
  schema: string;
  partitioning: string;
  size_bytes: number;
  status: DataLakeDatasetStatus;
}

export interface DataLakeDatasetUpdate {
  lake_id?: string;
  name?: string;
  format?: DataLakeDatasetFormat;
  schema?: string;
  partitioning?: string;
  size_bytes?: number;
  status?: DataLakeDatasetStatus;
}

export interface DataLakeDatasetQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataArchiveStatus = {
  ACTIVE: 'active',
  RESTORING: 'restoring',
  EXPIRED: 'expired',
  DELETED: 'deleted',
} as const;
export type DataArchiveStatus = (typeof DataArchiveStatus)[keyof typeof DataArchiveStatus];

export interface DataArchive {
  id: string;
  name: string;
  source_table: string;
  archive_date: string;
  restore_available_until: string;
  size_bytes: number;
  status: DataArchiveStatus;
  created_at: string;
  updated_at: string;
}

export interface DataArchiveCreate {
  name: string;
  source_table: string;
  archive_date: string;
  restore_available_until: string;
  size_bytes: number;
  status: DataArchiveStatus;
}

export interface DataArchiveUpdate {
  name?: string;
  source_table?: string;
  archive_date?: string;
  restore_available_until?: string;
  size_bytes?: number;
  status?: DataArchiveStatus;
}

export interface DataArchiveQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataSnapshotStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  DELETED: 'deleted',
} as const;
export type DataSnapshotStatus = (typeof DataSnapshotStatus)[keyof typeof DataSnapshotStatus];

export interface DataSnapshot {
  id: string;
  source_db: string;
  source_table: string;
  snapshot_date: string;
  size_bytes: number;
  retention_days: number;
  status: DataSnapshotStatus;
  created_at: string;
  updated_at: string;
}

export interface DataSnapshotCreate {
  source_db: string;
  source_table: string;
  snapshot_date: string;
  size_bytes: number;
  retention_days: number;
  status: DataSnapshotStatus;
}

export interface DataSnapshotUpdate {
  source_db?: string;
  source_table?: string;
  snapshot_date?: string;
  size_bytes?: number;
  retention_days?: number;
  status?: DataSnapshotStatus;
}

export interface DataSnapshotQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const HistoricalStorageStatus = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;
export type HistoricalStorageStatus = (typeof HistoricalStorageStatus)[keyof typeof HistoricalStorageStatus];

export interface HistoricalStorage {
  id: string;
  entity_type: string;
  entity_id: string;
  snapshot_date: string;
  data_hash: string;
  size_bytes: number;
  status: HistoricalStorageStatus;
  created_at: string;
  updated_at: string;
}

export interface HistoricalStorageCreate {
  entity_type: string;
  entity_id: string;
  snapshot_date: string;
  data_hash: string;
  size_bytes: number;
  status: HistoricalStorageStatus;
}

export interface HistoricalStorageUpdate {
  entity_type?: string;
  entity_id?: string;
  snapshot_date?: string;
  data_hash?: string;
  size_bytes?: number;
  status?: HistoricalStorageStatus;
}

export interface HistoricalStorageQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataGovernanceStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;
export type DataGovernanceStatus = (typeof DataGovernanceStatus)[keyof typeof DataGovernanceStatus];

export const DataGovernanceClassification = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  CONFIDENTIAL: 'confidential',
  RESTRICTED: 'restricted',
} as const;
export type DataGovernanceClassification = (typeof DataGovernanceClassification)[keyof typeof DataGovernanceClassification];

export interface DataGovernance {
  id: string;
  name: string;
  description: string;
  owner: string;
  classification: DataGovernanceClassification;
  retention_policy: string;
  status: DataGovernanceStatus;
  created_at: string;
  updated_at: string;
}

export interface DataGovernanceCreate {
  name: string;
  description: string;
  owner: string;
  classification: DataGovernanceClassification;
  retention_policy: string;
  status: DataGovernanceStatus;
}

export interface DataGovernanceUpdate {
  name?: string;
  description?: string;
  owner?: string;
  classification?: DataGovernanceClassification;
  retention_policy?: string;
  status?: DataGovernanceStatus;
}

export interface DataGovernanceQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataLineageStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
} as const;
export type DataLineageStatus = (typeof DataLineageStatus)[keyof typeof DataLineageStatus];

export const DataLineageTransformationType = {
  EXTRACT: 'extract',
  TRANSFORM: 'transform',
  LOAD: 'load',
  MERGE: 'merge',
  AGGREGATE: 'aggregate',
  FILTER: 'filter',
  JOIN: 'join',
} as const;
export type DataLineageTransformationType = (typeof DataLineageTransformationType)[keyof typeof DataLineageTransformationType];

export interface DataLineage {
  id: string;
  source_dataset: string;
  target_dataset: string;
  transformation_type: DataLineageTransformationType;
  pipeline_id: string;
  status: DataLineageStatus;
  created_at: string;
  updated_at: string;
}

export interface DataLineageCreate {
  source_dataset: string;
  target_dataset: string;
  transformation_type: DataLineageTransformationType;
  pipeline_id: string;
  status: DataLineageStatus;
}

export interface DataLineageUpdate {
  source_dataset?: string;
  target_dataset?: string;
  transformation_type?: DataLineageTransformationType;
  pipeline_id?: string;
  status?: DataLineageStatus;
}

export interface DataLineageQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const MetadataCatalogStatus = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  DEPRECATED: 'deprecated',
} as const;
export type MetadataCatalogStatus = (typeof MetadataCatalogStatus)[keyof typeof MetadataCatalogStatus];

export const MetadataCatalogClassification = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  CONFIDENTIAL: 'confidential',
  RESTRICTED: 'restricted',
} as const;
export type MetadataCatalogClassification = (typeof MetadataCatalogClassification)[keyof typeof MetadataCatalogClassification];

export interface MetadataCatalog {
  id: string;
  name: string;
  description: string;
  schema: string;
  owner: string;
  classification: MetadataCatalogClassification;
  tags: string[];
  status: MetadataCatalogStatus;
  created_at: string;
  updated_at: string;
}

export interface MetadataCatalogCreate {
  name: string;
  description: string;
  schema: string;
  owner: string;
  classification: MetadataCatalogClassification;
  tags: string[];
  status: MetadataCatalogStatus;
}

export interface MetadataCatalogUpdate {
  name?: string;
  description?: string;
  schema?: string;
  owner?: string;
  classification?: MetadataCatalogClassification;
  tags?: string[];
  status?: MetadataCatalogStatus;
}

export interface MetadataCatalogQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataQualityStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
} as const;
export type DataQualityStatus = (typeof DataQualityStatus)[keyof typeof DataQualityStatus];

export const DataQualityRuleType = {
  COMPLETENESS: 'completeness',
  UNIQUENESS: 'uniqueness',
  CONSISTENCY: 'consistency',
  VALIDITY: 'validity',
  TIMELINESS: 'timeliness',
  ACCURACY: 'accuracy',
} as const;
export type DataQualityRuleType = (typeof DataQualityRuleType)[keyof typeof DataQualityRuleType];

export interface DataQuality {
  id: string;
  dataset_id: string;
  rule_name: string;
  rule_type: DataQualityRuleType;
  threshold: number;
  last_run_value: number;
  last_run_at: string;
  status: DataQualityStatus;
  created_at: string;
  updated_at: string;
}

export interface DataQualityCreate {
  dataset_id: string;
  rule_name: string;
  rule_type: DataQualityRuleType;
  threshold: number;
  last_run_value: number;
  last_run_at: string;
  status: DataQualityStatus;
}

export interface DataQualityUpdate {
  dataset_id?: string;
  rule_name?: string;
  rule_type?: DataQualityRuleType;
  threshold?: number;
  last_run_value?: number;
  last_run_at?: string;
  status?: DataQualityStatus;
}

export interface DataQualityQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataPipelineStatus = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  FAILED: 'failed',
  COMPLETED: 'completed',
} as const;
export type DataPipelineStatus = (typeof DataPipelineStatus)[keyof typeof DataPipelineStatus];

export interface DataPipeline {
  id: string;
  name: string;
  source: string;
  destination: string;
  schedule: string;
  transformation: string;
  status: DataPipelineStatus;
  created_at: string;
  updated_at: string;
}

export interface DataPipelineCreate {
  name: string;
  source: string;
  destination: string;
  schedule: string;
  transformation: string;
  status: DataPipelineStatus;
}

export interface DataPipelineUpdate {
  name?: string;
  source?: string;
  destination?: string;
  schedule?: string;
  transformation?: string;
  status?: DataPipelineStatus;
}

export interface DataPipelineQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataRetentionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
export type DataRetentionStatus = (typeof DataRetentionStatus)[keyof typeof DataRetentionStatus];

export interface DataRetention {
  id: string;
  dataset_id: string;
  retention_days: number;
  auto_delete: boolean;
  last_cleanup_at: string;
  status: DataRetentionStatus;
  created_at: string;
  updated_at: string;
}

export interface DataRetentionCreate {
  dataset_id: string;
  retention_days: number;
  auto_delete: boolean;
  last_cleanup_at: string;
  status: DataRetentionStatus;
}

export interface DataRetentionUpdate {
  dataset_id?: string;
  retention_days?: number;
  auto_delete?: boolean;
  last_cleanup_at?: string;
  status?: DataRetentionStatus;
}

export interface DataRetentionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataClassificationStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;
export type DataClassificationStatus = (typeof DataClassificationStatus)[keyof typeof DataClassificationStatus];

export const DataClassificationLevel = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  CONFIDENTIAL: 'confidential',
  RESTRICTED: 'restricted',
} as const;
export type DataClassificationLevel = (typeof DataClassificationLevel)[keyof typeof DataClassificationLevel];

export interface DataClassification {
  id: string;
  name: string;
  level: DataClassificationLevel;
  description: string;
  handling_rules: string;
  status: DataClassificationStatus;
  created_at: string;
  updated_at: string;
}

export interface DataClassificationCreate {
  name: string;
  level: DataClassificationLevel;
  description: string;
  handling_rules: string;
  status: DataClassificationStatus;
}

export interface DataClassificationUpdate {
  name?: string;
  level?: DataClassificationLevel;
  description?: string;
  handling_rules?: string;
  status?: DataClassificationStatus;
}

export interface DataClassificationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataEncryptionStatus = {
  ACTIVE: 'active',
  KEY_EXPIRED: 'key_expired',
  DISABLED: 'disabled',
} as const;
export type DataEncryptionStatus = (typeof DataEncryptionStatus)[keyof typeof DataEncryptionStatus];

export const DataEncryptionAlgorithm = {
  AES_256: 'aes_256',
  AES_128: 'aes_128',
  RSA_2048: 'rsa_2048',
  RSA_4096: 'rsa_4096',
  CHACHA20: 'chacha20',
} as const;
export type DataEncryptionAlgorithm = (typeof DataEncryptionAlgorithm)[keyof typeof DataEncryptionAlgorithm];

export interface DataEncryption {
  id: string;
  dataset_id: string;
  algorithm: DataEncryptionAlgorithm;
  key_id: string;
  encrypted_at: string;
  status: DataEncryptionStatus;
  created_at: string;
  updated_at: string;
}

export interface DataEncryptionCreate {
  dataset_id: string;
  algorithm: DataEncryptionAlgorithm;
  key_id: string;
  encrypted_at: string;
  status: DataEncryptionStatus;
}

export interface DataEncryptionUpdate {
  dataset_id?: string;
  algorithm?: DataEncryptionAlgorithm;
  key_id?: string;
  encrypted_at?: string;
  status?: DataEncryptionStatus;
}

export interface DataEncryptionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DataAccessPolicyStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;
export type DataAccessPolicyStatus = (typeof DataAccessPolicyStatus)[keyof typeof DataAccessPolicyStatus];

export const DataAccessPolicyPermission = {
  READ: 'read',
  WRITE: 'write',
  READ_WRITE: 'read_write',
  ADMIN: 'admin',
} as const;
export type DataAccessPolicyPermission = (typeof DataAccessPolicyPermission)[keyof typeof DataAccessPolicyPermission];

export interface DataAccessPolicy {
  id: string;
  dataset_id: string;
  principal: string;
  permission: DataAccessPolicyPermission;
  conditions: string;
  expires_at: string;
  status: DataAccessPolicyStatus;
  created_at: string;
  updated_at: string;
}

export interface DataAccessPolicyCreate {
  dataset_id: string;
  principal: string;
  permission: DataAccessPolicyPermission;
  conditions: string;
  expires_at: string;
  status: DataAccessPolicyStatus;
}

export interface DataAccessPolicyUpdate {
  dataset_id?: string;
  principal?: string;
  permission?: DataAccessPolicyPermission;
  conditions?: string;
  expires_at?: string;
  status?: DataAccessPolicyStatus;
}

export interface DataAccessPolicyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

// =============================================================================
// DOMAIN 10 - DevOps
// =============================================================================

export const CIPipelineStatus = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  DISABLED: 'disabled',
} as const;
export type CIPipelineStatus = (typeof CIPipelineStatus)[keyof typeof CIPipelineStatus];

export const CIPipelineTrigger = {
  PUSH: 'push',
  PULL_REQUEST: 'pull_request',
  SCHEDULE: 'schedule',
  MANUAL: 'manual',
  TAG: 'tag',
} as const;
export type CIPipelineTrigger = (typeof CIPipelineTrigger)[keyof typeof CIPipelineTrigger];

export interface CIPipeline {
  id: string;
  name: string;
  repository: string;
  branch: string;
  trigger: CIPipelineTrigger;
  stages: string[];
  status: CIPipelineStatus;
  created_at: string;
  updated_at: string;
}

export interface CIPipelineCreate {
  name: string;
  repository: string;
  branch: string;
  trigger: CIPipelineTrigger;
  stages: string[];
  status: CIPipelineStatus;
}

export interface CIPipelineUpdate {
  name?: string;
  repository?: string;
  branch?: string;
  trigger?: CIPipelineTrigger;
  stages?: string[];
  status?: CIPipelineStatus;
}

export interface CIPipelineQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const CIRunStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;
export type CIRunStatus = (typeof CIRunStatus)[keyof typeof CIRunStatus];

export interface CIRun {
  id: string;
  pipeline_id: string;
  commit_sha: string;
  started_at: string;
  completed_at: string;
  duration_seconds: number;
  status: CIRunStatus;
  created_at: string;
  updated_at: string;
}

export interface CIRunCreate {
  pipeline_id: string;
  commit_sha: string;
  started_at: string;
  completed_at: string;
  duration_seconds: number;
  status: CIRunStatus;
}

export interface CIRunUpdate {
  pipeline_id?: string;
  commit_sha?: string;
  started_at?: string;
  completed_at?: string;
  duration_seconds?: number;
  status?: CIRunStatus;
}

export interface CIRunQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const QualityGateStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
} as const;
export type QualityGateStatus = (typeof QualityGateStatus)[keyof typeof QualityGateStatus];

export interface QualityGate {
  id: string;
  name: string;
  rules: string[];
  blocking: boolean;
  stage: string;
  status: QualityGateStatus;
  created_at: string;
  updated_at: string;
}

export interface QualityGateCreate {
  name: string;
  rules: string[];
  blocking: boolean;
  stage: string;
  status: QualityGateStatus;
}

export interface QualityGateUpdate {
  name?: string;
  rules?: string[];
  blocking?: boolean;
  stage?: string;
  status?: QualityGateStatus;
}

export interface QualityGateQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const QualityGateResultStatus = {
  PASSED: 'passed',
  FAILED: 'failed',
  ERROR: 'error',
} as const;
export type QualityGateResultStatus = (typeof QualityGateResultStatus)[keyof typeof QualityGateResultStatus];

export interface QualityGateResult {
  id: string;
  gate_id: string;
  run_id: string;
  passed: boolean;
  violations: string[];
  checked_at: string;
  status: QualityGateResultStatus;
  created_at: string;
  updated_at: string;
}

export interface QualityGateResultCreate {
  gate_id: string;
  run_id: string;
  passed: boolean;
  violations: string[];
  checked_at: string;
  status: QualityGateResultStatus;
}

export interface QualityGateResultUpdate {
  gate_id?: string;
  run_id?: string;
  passed?: boolean;
  violations?: string[];
  checked_at?: string;
  status?: QualityGateResultStatus;
}

export interface QualityGateResultQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ReleaseNoteStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;
export type ReleaseNoteStatus = (typeof ReleaseNoteStatus)[keyof typeof ReleaseNoteStatus];

export interface ReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  author: string;
  published_at: string;
  status: ReleaseNoteStatus;
  created_at: string;
  updated_at: string;
}

export interface ReleaseNoteCreate {
  version: string;
  title: string;
  content: string;
  author: string;
  published_at: string;
  status: ReleaseNoteStatus;
}

export interface ReleaseNoteUpdate {
  version?: string;
  title?: string;
  content?: string;
  author?: string;
  published_at?: string;
  status?: ReleaseNoteStatus;
}

export interface ReleaseNoteQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const BuildDashboardStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
export type BuildDashboardStatus = (typeof BuildDashboardStatus)[keyof typeof BuildDashboardStatus];

export interface BuildDashboard {
  id: string;
  name: string;
  pipelines: string[];
  widgets: string[];
  refresh_interval: number;
  status: BuildDashboardStatus;
  created_at: string;
  updated_at: string;
}

export interface BuildDashboardCreate {
  name: string;
  pipelines: string[];
  widgets: string[];
  refresh_interval: number;
  status: BuildDashboardStatus;
}

export interface BuildDashboardUpdate {
  name?: string;
  pipelines?: string[];
  widgets?: string[];
  refresh_interval?: number;
  status?: BuildDashboardStatus;
}

export interface BuildDashboardQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const TestDashboardStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
export type TestDashboardStatus = (typeof TestDashboardStatus)[keyof typeof TestDashboardStatus];

export interface TestDashboard {
  id: string;
  name: string;
  test_suites: string[];
  widgets: string[];
  refresh_interval: number;
  status: TestDashboardStatus;
  created_at: string;
  updated_at: string;
}

export interface TestDashboardCreate {
  name: string;
  test_suites: string[];
  widgets: string[];
  refresh_interval: number;
  status: TestDashboardStatus;
}

export interface TestDashboardUpdate {
  name?: string;
  test_suites?: string[];
  widgets?: string[];
  refresh_interval?: number;
  status?: TestDashboardStatus;
}

export interface TestDashboardQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const CoverageDashboardStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
export type CoverageDashboardStatus = (typeof CoverageDashboardStatus)[keyof typeof CoverageDashboardStatus];

export const CoverageDashboardTrend = {
  IMPROVING: 'improving',
  STABLE: 'stable',
  DECLINING: 'declining',
} as const;
export type CoverageDashboardTrend = (typeof CoverageDashboardTrend)[keyof typeof CoverageDashboardTrend];

export interface CoverageDashboard {
  id: string;
  name: string;
  threshold: number;
  current_coverage: number;
  trend: CoverageDashboardTrend;
  status: CoverageDashboardStatus;
  created_at: string;
  updated_at: string;
}

export interface CoverageDashboardCreate {
  name: string;
  threshold: number;
  current_coverage: number;
  trend: CoverageDashboardTrend;
  status: CoverageDashboardStatus;
}

export interface CoverageDashboardUpdate {
  name?: string;
  threshold?: number;
  current_coverage?: number;
  trend?: CoverageDashboardTrend;
  status?: CoverageDashboardStatus;
}

export interface CoverageDashboardQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const CodeReviewStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  CHANGES_REQUESTED: 'changes_requested',
  DISMISSED: 'dismissed',
} as const;
export type CodeReviewStatus = (typeof CodeReviewStatus)[keyof typeof CodeReviewStatus];

export interface CodeReview {
  id: string;
  pull_request_id: string;
  reviewer_id: string;
  status_change: string;
  comments: string[];
  approved_at: string;
  status: CodeReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface CodeReviewCreate {
  pull_request_id: string;
  reviewer_id: string;
  status_change: string;
  comments: string[];
  approved_at: string;
  status: CodeReviewStatus;
}

export interface CodeReviewUpdate {
  pull_request_id?: string;
  reviewer_id?: string;
  status_change?: string;
  comments?: string[];
  approved_at?: string;
  status?: CodeReviewStatus;
}

export interface CodeReviewQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const SecurityScanStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
} as const;
export type SecurityScanStatus = (typeof SecurityScanStatus)[keyof typeof SecurityScanStatus];

export const SecurityScanScanType = {
  SAST: 'sast',
  DAST: 'dast',
  IAST: 'iast',
  SCA: 'sca',
  SECRET: 'secret',
} as const;
export type SecurityScanScanType = (typeof SecurityScanScanType)[keyof typeof SecurityScanScanType];

export interface SecurityScan {
  id: string;
  run_id: string;
  scan_type: SecurityScanScanType;
  findings_count: number;
  critical_count: number;
  status: SecurityScanStatus;
  created_at: string;
  updated_at: string;
}

export interface SecurityScanCreate {
  run_id: string;
  scan_type: SecurityScanScanType;
  findings_count: number;
  critical_count: number;
  status: SecurityScanStatus;
}

export interface SecurityScanUpdate {
  run_id?: string;
  scan_type?: SecurityScanScanType;
  findings_count?: number;
  critical_count?: number;
  status?: SecurityScanStatus;
}

export interface SecurityScanQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DependencyScanStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
} as const;
export type DependencyScanStatus = (typeof DependencyScanStatus)[keyof typeof DependencyScanStatus];

export interface DependencyScan {
  id: string;
  project_id: string;
  total_deps: number;
  outdated_count: number;
  vulnerable_count: number;
  scanned_at: string;
  status: DependencyScanStatus;
  created_at: string;
  updated_at: string;
}

export interface DependencyScanCreate {
  project_id: string;
  total_deps: number;
  outdated_count: number;
  vulnerable_count: number;
  scanned_at: string;
  status: DependencyScanStatus;
}

export interface DependencyScanUpdate {
  project_id?: string;
  total_deps?: number;
  outdated_count?: number;
  vulnerable_count?: number;
  scanned_at?: string;
  status?: DependencyScanStatus;
}

export interface DependencyScanQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const InfrastructureCodeStatus = {
  ACTIVE: 'active',
  DRIFTED: 'drifted',
  DESTROYED: 'destroyed',
} as const;
export type InfrastructureCodeStatus = (typeof InfrastructureCodeStatus)[keyof typeof InfrastructureCodeStatus];

export const InfrastructureCodeProvider = {
  AWS: 'aws',
  AZURE: 'azure',
  GCP: 'gcp',
  KUBERNETES: 'kubernetes',
  TERRAFORM: 'terraform',
} as const;
export type InfrastructureCodeProvider = (typeof InfrastructureCodeProvider)[keyof typeof InfrastructureCodeProvider];

export interface InfrastructureCode {
  id: string;
  name: string;
  provider: InfrastructureCodeProvider;
  resource_type: string;
  state_hash: string;
  last_applied_at: string;
  status: InfrastructureCodeStatus;
  created_at: string;
  updated_at: string;
}

export interface InfrastructureCodeCreate {
  name: string;
  provider: InfrastructureCodeProvider;
  resource_type: string;
  state_hash: string;
  last_applied_at: string;
  status: InfrastructureCodeStatus;
}

export interface InfrastructureCodeUpdate {
  name?: string;
  provider?: InfrastructureCodeProvider;
  resource_type?: string;
  state_hash?: string;
  last_applied_at?: string;
  status?: InfrastructureCodeStatus;
}

export interface InfrastructureCodeQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ContainerImageStatus = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
  VULNERABLE: 'vulnerable',
} as const;
export type ContainerImageStatus = (typeof ContainerImageStatus)[keyof typeof ContainerImageStatus];

export interface ContainerImage {
  id: string;
  name: string;
  tag: string;
  size_bytes: number;
  vulnerability_count: number;
  pushed_at: string;
  status: ContainerImageStatus;
  created_at: string;
  updated_at: string;
}

export interface ContainerImageCreate {
  name: string;
  tag: string;
  size_bytes: number;
  vulnerability_count: number;
  pushed_at: string;
  status: ContainerImageStatus;
}

export interface ContainerImageUpdate {
  name?: string;
  tag?: string;
  size_bytes?: number;
  vulnerability_count?: number;
  pushed_at?: string;
  status?: ContainerImageStatus;
}

export interface ContainerImageQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const HelmChartStatus = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
} as const;
export type HelmChartStatus = (typeof HelmChartStatus)[keyof typeof HelmChartStatus];

export interface HelmChart {
  id: string;
  name: string;
  version: string;
  app_version: string;
  repository: string;
  status: HelmChartStatus;
  created_at: string;
  updated_at: string;
}

export interface HelmChartCreate {
  name: string;
  version: string;
  app_version: string;
  repository: string;
  status: HelmChartStatus;
}

export interface HelmChartUpdate {
  name?: string;
  version?: string;
  app_version?: string;
  repository?: string;
  status?: HelmChartStatus;
}

export interface HelmChartQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

// =============================================================================
// DOMAIN 11 - Open Platform
// =============================================================================

export const SDKStatus = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
} as const;
export type SDKStatus = (typeof SDKStatus)[keyof typeof SDKStatus];

export const SDKLanguage = {
  TYPESCRIPT: 'typescript',
  PYTHON: 'python',
  JAVA: 'java',
  GO: 'go',
  RUBY: 'ruby',
  CSHARP: 'csharp',
  PHP: 'php',
  SWIFT: 'swift',
  KOTLIN: 'kotlin',
  RUST: 'rust',
} as const;
export type SDKLanguage = (typeof SDKLanguage)[keyof typeof SDKLanguage];

export interface SDK {
  id: string;
  name: string;
  language: SDKLanguage;
  version: string;
  description: string;
  download_count: number;
  status: SDKStatus;
  created_at: string;
  updated_at: string;
}

export interface SDKCreate {
  name: string;
  language: SDKLanguage;
  version: string;
  description: string;
  download_count: number;
  status: SDKStatus;
}

export interface SDKUpdate {
  name?: string;
  language?: SDKLanguage;
  version?: string;
  description?: string;
  download_count?: number;
  status?: SDKStatus;
}

export interface SDKQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const SDKReleaseStatus = {
  PUBLISHED: 'published',
  DEPRECATED: 'deprecated',
  YANKED: 'yanked',
} as const;
export type SDKReleaseStatus = (typeof SDKReleaseStatus)[keyof typeof SDKReleaseStatus];

export interface SDKRelease {
  id: string;
  sdk_id: string;
  version: string;
  changelog: string;
  download_url: string;
  published_at: string;
  status: SDKReleaseStatus;
  created_at: string;
  updated_at: string;
}

export interface SDKReleaseCreate {
  sdk_id: string;
  version: string;
  changelog: string;
  download_url: string;
  published_at: string;
  status: SDKReleaseStatus;
}

export interface SDKReleaseUpdate {
  sdk_id?: string;
  version?: string;
  changelog?: string;
  download_url?: string;
  published_at?: string;
  status?: SDKReleaseStatus;
}

export interface SDKReleaseQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const CLIStatus = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
} as const;
export type CLIStatus = (typeof CLIStatus)[keyof typeof CLIStatus];

export const CLIPlatform = {
  LINUX: 'linux',
  MACOS: 'macos',
  WINDOWS: 'windows',
  ALL: 'all',
} as const;
export type CLIPlatform = (typeof CLIPlatform)[keyof typeof CLIPlatform];

export interface CLI {
  id: string;
  name: string;
  version: string;
  platform: CLIPlatform;
  download_url: string;
  status: CLIStatus;
  created_at: string;
  updated_at: string;
}

export interface CLICreate {
  name: string;
  version: string;
  platform: CLIPlatform;
  download_url: string;
  status: CLIStatus;
}

export interface CLIUpdate {
  name?: string;
  version?: string;
  platform?: CLIPlatform;
  download_url?: string;
  status?: CLIStatus;
}

export interface CLIQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const APIDocumentationStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  DEPRECATED: 'deprecated',
} as const;
export type APIDocumentationStatus = (typeof APIDocumentationStatus)[keyof typeof APIDocumentationStatus];

export const APIDocumentationAuthType = {
  API_KEY: 'api_key',
  OAUTH2: 'oauth2',
  BEARER: 'bearer',
  BASIC: 'basic',
  NONE: 'none',
} as const;
export type APIDocumentationAuthType = (typeof APIDocumentationAuthType)[keyof typeof APIDocumentationAuthType];

export interface APIDocumentation {
  id: string;
  title: string;
  version: string;
  base_url: string;
  auth_type: APIDocumentationAuthType;
  status: APIDocumentationStatus;
  created_at: string;
  updated_at: string;
}

export interface APIDocumentationCreate {
  title: string;
  version: string;
  base_url: string;
  auth_type: APIDocumentationAuthType;
  status: APIDocumentationStatus;
}

export interface APIDocumentationUpdate {
  title?: string;
  version?: string;
  base_url?: string;
  auth_type?: APIDocumentationAuthType;
  status?: APIDocumentationStatus;
}

export interface APIDocumentationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const OpenAPISpecStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  DEPRECATED: 'deprecated',
} as const;
export type OpenAPISpecStatus = (typeof OpenAPISpecStatus)[keyof typeof OpenAPISpecStatus];

export interface OpenAPISpec {
  id: string;
  title: string;
  version: string;
  spec_json: string;
  spec_url: string;
  status: OpenAPISpecStatus;
  created_at: string;
  updated_at: string;
}

export interface OpenAPISpecCreate {
  title: string;
  version: string;
  spec_json: string;
  spec_url: string;
  status: OpenAPISpecStatus;
}

export interface OpenAPISpecUpdate {
  title?: string;
  version?: string;
  spec_json?: string;
  spec_url?: string;
  status?: OpenAPISpecStatus;
}

export interface OpenAPISpecQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const GraphQLSchemaStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  DEPRECATED: 'deprecated',
} as const;
export type GraphQLSchemaStatus = (typeof GraphQLSchemaStatus)[keyof typeof GraphQLSchemaStatus];

export interface GraphQLSchema {
  id: string;
  name: string;
  version: string;
  schema_sdl: string;
  status: GraphQLSchemaStatus;
  created_at: string;
  updated_at: string;
}

export interface GraphQLSchemaCreate {
  name: string;
  version: string;
  schema_sdl: string;
  status: GraphQLSchemaStatus;
}

export interface GraphQLSchemaUpdate {
  name?: string;
  version?: string;
  schema_sdl?: string;
  status?: GraphQLSchemaStatus;
}

export interface GraphQLSchemaQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DeveloperPortalStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;
export type DeveloperPortalStatus = (typeof DeveloperPortalStatus)[keyof typeof DeveloperPortalStatus];

export interface DeveloperPortal {
  id: string;
  name: string;
  description: string;
  base_url: string;
  status: DeveloperPortalStatus;
  created_at: string;
  updated_at: string;
}

export interface DeveloperPortalCreate {
  name: string;
  description: string;
  base_url: string;
  status: DeveloperPortalStatus;
}

export interface DeveloperPortalUpdate {
  name?: string;
  description?: string;
  base_url?: string;
  status?: DeveloperPortalStatus;
}

export interface DeveloperPortalQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DeveloperAppStatus = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
} as const;
export type DeveloperAppStatus = (typeof DeveloperAppStatus)[keyof typeof DeveloperAppStatus];

export interface DeveloperApp {
  id: string;
  developer_id: string;
  name: string;
  description: string;
  api_key: string;
  redirect_uris: string[];
  status: DeveloperAppStatus;
  created_at: string;
  updated_at: string;
}

export interface DeveloperAppCreate {
  developer_id: string;
  name: string;
  description: string;
  api_key: string;
  redirect_uris: string[];
  status: DeveloperAppStatus;
}

export interface DeveloperAppUpdate {
  developer_id?: string;
  name?: string;
  description?: string;
  api_key?: string;
  redirect_uris?: string[];
  status?: DeveloperAppStatus;
}

export interface DeveloperAppQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const SandboxStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
} as const;
export type SandboxStatus = (typeof SandboxStatus)[keyof typeof SandboxStatus];

export const SandboxEnvironment = {
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  STAGING: 'staging',
} as const;
export type SandboxEnvironment = (typeof SandboxEnvironment)[keyof typeof SandboxEnvironment];

export interface Sandbox {
  id: string;
  name: string;
  environment: SandboxEnvironment;
  base_url: string;
  seed_data: string;
  expires_at: string;
  status: SandboxStatus;
  created_at: string;
  updated_at: string;
}

export interface SandboxCreate {
  name: string;
  environment: SandboxEnvironment;
  base_url: string;
  seed_data: string;
  expires_at: string;
  status: SandboxStatus;
}

export interface SandboxUpdate {
  name?: string;
  environment?: SandboxEnvironment;
  base_url?: string;
  seed_data?: string;
  expires_at?: string;
  status?: SandboxStatus;
}

export interface SandboxQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const SandboxInstanceStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
} as const;
export type SandboxInstanceStatus = (typeof SandboxInstanceStatus)[keyof typeof SandboxInstanceStatus];

export interface SandboxInstance {
  id: string;
  sandbox_id: string;
  user_id: string;
  created_at: string;
  expires_at: string;
  status: SandboxInstanceStatus;
  created_at2: string;
  updated_at: string;
}

export interface SandboxInstanceCreate {
  sandbox_id: string;
  user_id: string;
  created_at: string;
  expires_at: string;
  status: SandboxInstanceStatus;
  created_at2: string;
}

export interface SandboxInstanceUpdate {
  sandbox_id?: string;
  user_id?: string;
  created_at?: string;
  expires_at?: string;
  status?: SandboxInstanceStatus;
  created_at2?: string;
}

export interface SandboxInstanceQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const APIUsageStatus = {
  ACTIVE: 'active',
  RATE_LIMITED: 'rate_limited',
} as const;
export type APIUsageStatus = (typeof APIUsageStatus)[keyof typeof APIUsageStatus];

export interface APIUsage {
  id: string;
  app_id: string;
  endpoint: string;
  method: string;
  count: number;
  avg_duration_ms: number;
  error_rate: number;
  period: string;
  status: APIUsageStatus;
  created_at: string;
  updated_at: string;
}

export interface APIUsageCreate {
  app_id: string;
  endpoint: string;
  method: string;
  count: number;
  avg_duration_ms: number;
  error_rate: number;
  period: string;
  status: APIUsageStatus;
}

export interface APIUsageUpdate {
  app_id?: string;
  endpoint?: string;
  method?: string;
  count?: number;
  avg_duration_ms?: number;
  error_rate?: number;
  period?: string;
  status?: APIUsageStatus;
}

export interface APIUsageQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const WebhookStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  FAILED: 'failed',
} as const;
export type WebhookStatus = (typeof WebhookStatus)[keyof typeof WebhookStatus];

export interface Webhook {
  id: string;
  app_id: string;
  url: string;
  events: string[];
  secret: string;
  retry_count: number;
  status: WebhookStatus;
  created_at: string;
  updated_at: string;
}

export interface WebhookCreate {
  app_id: string;
  url: string;
  events: string[];
  secret: string;
  retry_count: number;
  status: WebhookStatus;
}

export interface WebhookUpdate {
  app_id?: string;
  url?: string;
  events?: string[];
  secret?: string;
  retry_count?: number;
  status?: WebhookStatus;
}

export interface WebhookQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DeveloperDocumentationStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;
export type DeveloperDocumentationStatus = (typeof DeveloperDocumentationStatus)[keyof typeof DeveloperDocumentationStatus];

export interface DeveloperDocumentation {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  status: DeveloperDocumentationStatus;
  created_at: string;
  updated_at: string;
}

export interface DeveloperDocumentationCreate {
  title: string;
  content: string;
  category: string;
  author: string;
  status: DeveloperDocumentationStatus;
}

export interface DeveloperDocumentationUpdate {
  title?: string;
  content?: string;
  category?: string;
  author?: string;
  status?: DeveloperDocumentationStatus;
}

export interface DeveloperDocumentationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const SDKExampleStatus = {
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
} as const;
export type SDKExampleStatus = (typeof SDKExampleStatus)[keyof typeof SDKExampleStatus];

export interface SDKExample {
  id: string;
  sdk_id: string;
  language: string;
  title: string;
  code: string;
  description: string;
  status: SDKExampleStatus;
  created_at: string;
  updated_at: string;
}

export interface SDKExampleCreate {
  sdk_id: string;
  language: string;
  title: string;
  code: string;
  description: string;
  status: SDKExampleStatus;
}

export interface SDKExampleUpdate {
  sdk_id?: string;
  language?: string;
  title?: string;
  code?: string;
  description?: string;
  status?: SDKExampleStatus;
}

export interface SDKExampleQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const RateLimitStatus = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
} as const;
export type RateLimitStatus = (typeof RateLimitStatus)[keyof typeof RateLimitStatus];

export interface RateLimit {
  id: string;
  app_id: string;
  endpoint: string;
  limit_per_minute: number;
  limit_per_day: number;
  status: RateLimitStatus;
  created_at: string;
  updated_at: string;
}

export interface RateLimitCreate {
  app_id: string;
  endpoint: string;
  limit_per_minute: number;
  limit_per_day: number;
  status: RateLimitStatus;
}

export interface RateLimitUpdate {
  app_id?: string;
  endpoint?: string;
  limit_per_minute?: number;
  limit_per_day?: number;
  status?: RateLimitStatus;
}

export interface RateLimitQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const OAuthAppStatus = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  REVOKED: 'revoked',
} as const;
export type OAuthAppStatus = (typeof OAuthAppStatus)[keyof typeof OAuthAppStatus];

export interface OAuthApp {
  id: string;
  name: string;
  client_id: string;
  client_secret_hash: string;
  redirect_uris: string[];
  scopes: string[];
  status: OAuthAppStatus;
  created_at: string;
  updated_at: string;
}

export interface OAuthAppCreate {
  name: string;
  client_id: string;
  client_secret_hash: string;
  redirect_uris: string[];
  scopes: string[];
  status: OAuthAppStatus;
}

export interface OAuthAppUpdate {
  name?: string;
  client_id?: string;
  client_secret_hash?: string;
  redirect_uris?: string[];
  scopes?: string[];
  status?: OAuthAppStatus;
}

export interface OAuthAppQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

// =============================================================================
// DOMAIN 12 - Production Readiness
// =============================================================================

export const ProductionHealthCheckStatus = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
} as const;
export type ProductionHealthCheckStatus = (typeof ProductionHealthCheckStatus)[keyof typeof ProductionHealthCheckStatus];

export const ProductionHealthCheckCheckType = {
  HTTP: 'http',
  TCP: 'tcp',
  GRPC: 'grpc',
  DATABASE: 'database',
  CACHE: 'cache',
  QUEUE: 'queue',
} as const;
export type ProductionHealthCheckCheckType = (typeof ProductionHealthCheckCheckType)[keyof typeof ProductionHealthCheckCheckType];

export interface ProductionHealthCheck {
  id: string;
  service_name: string;
  check_type: ProductionHealthCheckCheckType;
  endpoint: string;
  expected_status: number;
  interval_seconds: number;
  status: ProductionHealthCheckStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductionHealthCheckCreate {
  service_name: string;
  check_type: ProductionHealthCheckCheckType;
  endpoint: string;
  expected_status: number;
  interval_seconds: number;
  status: ProductionHealthCheckStatus;
}

export interface ProductionHealthCheckUpdate {
  service_name?: string;
  check_type?: ProductionHealthCheckCheckType;
  endpoint?: string;
  expected_status?: number;
  interval_seconds?: number;
  status?: ProductionHealthCheckStatus;
}

export interface ProductionHealthCheckQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const DiagnosticRunStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
} as const;
export type DiagnosticRunStatus = (typeof DiagnosticRunStatus)[keyof typeof DiagnosticRunStatus];

export const DiagnosticRunDiagnosticType = {
  CONNECTIVITY: 'connectivity',
  PERFORMANCE: 'performance',
  SECURITY: 'security',
  CONFIGURATION: 'configuration',
  RESOURCE: 'resource',
} as const;
export type DiagnosticRunDiagnosticType = (typeof DiagnosticRunDiagnosticType)[keyof typeof DiagnosticRunDiagnosticType];

export interface DiagnosticRun {
  id: string;
  service_name: string;
  diagnostic_type: DiagnosticRunDiagnosticType;
  results: string;
  started_at: string;
  completed_at: string;
  status: DiagnosticRunStatus;
  created_at: string;
  updated_at: string;
}

export interface DiagnosticRunCreate {
  service_name: string;
  diagnostic_type: DiagnosticRunDiagnosticType;
  results: string;
  started_at: string;
  completed_at: string;
  status: DiagnosticRunStatus;
}

export interface DiagnosticRunUpdate {
  service_name?: string;
  diagnostic_type?: DiagnosticRunDiagnosticType;
  results?: string;
  started_at?: string;
  completed_at?: string;
  status?: DiagnosticRunStatus;
}

export interface DiagnosticRunQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ProductionAuditStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
} as const;
export type ProductionAuditStatus = (typeof ProductionAuditStatus)[keyof typeof ProductionAuditStatus];

export const ProductionAuditAuditType = {
  SECURITY: 'security',
  COMPLIANCE: 'compliance',
  PERFORMANCE: 'performance',
  CONFIGURATION: 'configuration',
  ACCESS: 'access',
} as const;
export type ProductionAuditAuditType = (typeof ProductionAuditAuditType)[keyof typeof ProductionAuditAuditType];

export interface ProductionAudit {
  id: string;
  audit_type: ProductionAuditAuditType;
  scope: string;
  findings: string[];
  score: number;
  completed_at: string;
  status: ProductionAuditStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductionAuditCreate {
  audit_type: ProductionAuditAuditType;
  scope: string;
  findings: string[];
  score: number;
  completed_at: string;
  status: ProductionAuditStatus;
}

export interface ProductionAuditUpdate {
  audit_type?: ProductionAuditAuditType;
  scope?: string;
  findings?: string[];
  score?: number;
  completed_at?: string;
  status?: ProductionAuditStatus;
}

export interface ProductionAuditQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const PerformanceBenchmarkStatus = {
  PASSED: 'passed',
  FAILED: 'failed',
  ERROR: 'error',
} as const;
export type PerformanceBenchmarkStatus = (typeof PerformanceBenchmarkStatus)[keyof typeof PerformanceBenchmarkStatus];

export const PerformanceBenchmarkTestType = {
  LATENCY: 'latency',
  THROUGHPUT: 'throughput',
  CPU: 'cpu',
  MEMORY: 'memory',
  DISK_IO: 'disk_io',
  NETWORK: 'network',
} as const;
export type PerformanceBenchmarkTestType = (typeof PerformanceBenchmarkTestType)[keyof typeof PerformanceBenchmarkTestType];

export interface PerformanceBenchmark {
  id: string;
  name: string;
  test_type: PerformanceBenchmarkTestType;
  target_metric: number;
  actual_metric: number;
  threshold: number;
  passed: boolean;
  ran_at: string;
  status: PerformanceBenchmarkStatus;
  created_at: string;
  updated_at: string;
}

export interface PerformanceBenchmarkCreate {
  name: string;
  test_type: PerformanceBenchmarkTestType;
  target_metric: number;
  actual_metric: number;
  threshold: number;
  passed: boolean;
  ran_at: string;
  status: PerformanceBenchmarkStatus;
}

export interface PerformanceBenchmarkUpdate {
  name?: string;
  test_type?: PerformanceBenchmarkTestType;
  target_metric?: number;
  actual_metric?: number;
  threshold?: number;
  passed?: boolean;
  ran_at?: string;
  status?: PerformanceBenchmarkStatus;
}

export interface PerformanceBenchmarkQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const SecurityBenchmarkStatus = {
  PASSED: 'passed',
  FAILED: 'failed',
  ERROR: 'error',
} as const;
export type SecurityBenchmarkStatus = (typeof SecurityBenchmarkStatus)[keyof typeof SecurityBenchmarkStatus];

export const SecurityBenchmarkSeverity = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info',
} as const;
export type SecurityBenchmarkSeverity = (typeof SecurityBenchmarkSeverity)[keyof typeof SecurityBenchmarkSeverity];

export interface SecurityBenchmark {
  id: string;
  name: string;
  control: string;
  expected: string;
  actual: string;
  passed: boolean;
  severity: SecurityBenchmarkSeverity;
  ran_at: string;
  status: SecurityBenchmarkStatus;
  created_at: string;
  updated_at: string;
}

export interface SecurityBenchmarkCreate {
  name: string;
  control: string;
  expected: string;
  actual: string;
  passed: boolean;
  severity: SecurityBenchmarkSeverity;
  ran_at: string;
  status: SecurityBenchmarkStatus;
}

export interface SecurityBenchmarkUpdate {
  name?: string;
  control?: string;
  expected?: string;
  actual?: string;
  passed?: boolean;
  severity?: SecurityBenchmarkSeverity;
  ran_at?: string;
  status?: SecurityBenchmarkStatus;
}

export interface SecurityBenchmarkQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ScalabilityBenchmarkStatus = {
  PASSED: 'passed',
  FAILED: 'failed',
  ERROR: 'error',
} as const;
export type ScalabilityBenchmarkStatus = (typeof ScalabilityBenchmarkStatus)[keyof typeof ScalabilityBenchmarkStatus];

export interface ScalabilityBenchmark {
  id: string;
  name: string;
  concurrent_users: number;
  response_time_ms: number;
  throughput_rps: number;
  error_rate: number;
  ran_at: string;
  status: ScalabilityBenchmarkStatus;
  created_at: string;
  updated_at: string;
}

export interface ScalabilityBenchmarkCreate {
  name: string;
  concurrent_users: number;
  response_time_ms: number;
  throughput_rps: number;
  error_rate: number;
  ran_at: string;
  status: ScalabilityBenchmarkStatus;
}

export interface ScalabilityBenchmarkUpdate {
  name?: string;
  concurrent_users?: number;
  response_time_ms?: number;
  throughput_rps?: number;
  error_rate?: number;
  ran_at?: string;
  status?: ScalabilityBenchmarkStatus;
}

export interface ScalabilityBenchmarkQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const CompatibilityMatrixStatus = {
  TESTED: 'tested',
  PASSED: 'passed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
} as const;
export type CompatibilityMatrixStatus = (typeof CompatibilityMatrixStatus)[keyof typeof CompatibilityMatrixStatus];

export interface CompatibilityMatrix {
  id: string;
  name: string;
  platform: string;
  version: string;
  tested: boolean;
  passed: boolean;
  notes: string;
  tested_at: string;
  status: CompatibilityMatrixStatus;
  created_at: string;
  updated_at: string;
}

export interface CompatibilityMatrixCreate {
  name: string;
  platform: string;
  version: string;
  tested: boolean;
  passed: boolean;
  notes: string;
  tested_at: string;
  status: CompatibilityMatrixStatus;
}

export interface CompatibilityMatrixUpdate {
  name?: string;
  platform?: string;
  version?: string;
  tested?: boolean;
  passed?: boolean;
  notes?: string;
  tested_at?: string;
  status?: CompatibilityMatrixStatus;
}

export interface CompatibilityMatrixQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ProductionCertificateStatus = {
  VALID: 'valid',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;
export type ProductionCertificateStatus = (typeof ProductionCertificateStatus)[keyof typeof ProductionCertificateStatus];

export interface ProductionCertificate {
  id: string;
  standard: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  scope: string;
  status: ProductionCertificateStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductionCertificateCreate {
  standard: string;
  issuer: string;
  issue_date: string;
  expiry_date: string;
  scope: string;
  status: ProductionCertificateStatus;
}

export interface ProductionCertificateUpdate {
  standard?: string;
  issuer?: string;
  issue_date?: string;
  expiry_date?: string;
  scope?: string;
  status?: ProductionCertificateStatus;
}

export interface ProductionCertificateQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const LoadTestStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
  CANCELLED: 'cancelled',
} as const;
export type LoadTestStatus = (typeof LoadTestStatus)[keyof typeof LoadTestStatus];

export interface LoadTest {
  id: string;
  name: string;
  target_service: string;
  concurrent_users: number;
  duration_seconds: number;
  ramp_up_seconds: number;
  results: string;
  ran_at: string;
  status: LoadTestStatus;
  created_at: string;
  updated_at: string;
}

export interface LoadTestCreate {
  name: string;
  target_service: string;
  concurrent_users: number;
  duration_seconds: number;
  ramp_up_seconds: number;
  results: string;
  ran_at: string;
  status: LoadTestStatus;
}

export interface LoadTestUpdate {
  name?: string;
  target_service?: string;
  concurrent_users?: number;
  duration_seconds?: number;
  ramp_up_seconds?: number;
  results?: string;
  ran_at?: string;
  status?: LoadTestStatus;
}

export interface LoadTestQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const StressTestStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
  CANCELLED: 'cancelled',
} as const;
export type StressTestStatus = (typeof StressTestStatus)[keyof typeof StressTestStatus];

export interface StressTest {
  id: string;
  name: string;
  target_service: string;
  max_concurrent_users: number;
  breaking_point: number;
  recovery_time_seconds: number;
  ran_at: string;
  status: StressTestStatus;
  created_at: string;
  updated_at: string;
}

export interface StressTestCreate {
  name: string;
  target_service: string;
  max_concurrent_users: number;
  breaking_point: number;
  recovery_time_seconds: number;
  ran_at: string;
  status: StressTestStatus;
}

export interface StressTestUpdate {
  name?: string;
  target_service?: string;
  max_concurrent_users?: number;
  breaking_point?: number;
  recovery_time_seconds?: number;
  ran_at?: string;
  status?: StressTestStatus;
}

export interface StressTestQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const EnduranceTestStatus = {
  COMPLETED: 'completed',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
  CANCELLED: 'cancelled',
} as const;
export type EnduranceTestStatus = (typeof EnduranceTestStatus)[keyof typeof EnduranceTestStatus];

export interface EnduranceTest {
  id: string;
  name: string;
  target_service: string;
  duration_hours: number;
  memory_leak_detected: boolean;
  final_memory_mb: number;
  ran_at: string;
  status: EnduranceTestStatus;
  created_at: string;
  updated_at: string;
}

export interface EnduranceTestCreate {
  name: string;
  target_service: string;
  duration_hours: number;
  memory_leak_detected: boolean;
  final_memory_mb: number;
  ran_at: string;
  status: EnduranceTestStatus;
}

export interface EnduranceTestUpdate {
  name?: string;
  target_service?: string;
  duration_hours?: number;
  memory_leak_detected?: boolean;
  final_memory_mb?: number;
  ran_at?: string;
  status?: EnduranceTestStatus;
}

export interface EnduranceTestQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const CapacityPlanStatus = {
  ACTIVE: 'active',
  OUTDATED: 'outdated',
  REPLACED: 'replaced',
} as const;
export type CapacityPlanStatus = (typeof CapacityPlanStatus)[keyof typeof CapacityPlanStatus];

export const CapacityPlanResourceType = {
  CPU: 'cpu',
  MEMORY: 'memory',
  STORAGE: 'storage',
  NETWORK: 'network',
  GPU: 'gpu',
} as const;
export type CapacityPlanResourceType = (typeof CapacityPlanResourceType)[keyof typeof CapacityPlanResourceType];

export interface CapacityPlan {
  id: string;
  resource_type: CapacityPlanResourceType;
  current_capacity: number;
  projected_6m: number;
  projected_12m: number;
  recommended: number;
  status: CapacityPlanStatus;
  created_at: string;
  updated_at: string;
}

export interface CapacityPlanCreate {
  resource_type: CapacityPlanResourceType;
  current_capacity: number;
  projected_6m: number;
  projected_12m: number;
  recommended: number;
  status: CapacityPlanStatus;
}

export interface CapacityPlanUpdate {
  resource_type?: CapacityPlanResourceType;
  current_capacity?: number;
  projected_6m?: number;
  projected_12m?: number;
  recommended?: number;
  status?: CapacityPlanStatus;
}

export interface CapacityPlanQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ProductionRunbookStatus = {
  ACTIVE: 'active',
  OUTDATED: 'outdated',
  ARCHIVED: 'archived',
} as const;
export type ProductionRunbookStatus = (typeof ProductionRunbookStatus)[keyof typeof ProductionRunbookStatus];

export interface ProductionRunbook {
  id: string;
  name: string;
  service_name: string;
  scenario: string;
  steps: string[];
  last_verified_at: string;
  status: ProductionRunbookStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductionRunbookCreate {
  name: string;
  service_name: string;
  scenario: string;
  steps: string[];
  last_verified_at: string;
  status: ProductionRunbookStatus;
}

export interface ProductionRunbookUpdate {
  name?: string;
  service_name?: string;
  scenario?: string;
  steps?: string[];
  last_verified_at?: string;
  status?: ProductionRunbookStatus;
}

export interface ProductionRunbookQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const IncidentPostmortemStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;
export type IncidentPostmortemStatus = (typeof IncidentPostmortemStatus)[keyof typeof IncidentPostmortemStatus];

export interface IncidentPostmortem {
  id: string;
  incident_id: string;
  title: string;
  root_cause: string;
  timeline: string[];
  remediation: string[];
  lessons_learned: string[];
  status: IncidentPostmortemStatus;
  created_at: string;
  updated_at: string;
}

export interface IncidentPostmortemCreate {
  incident_id: string;
  title: string;
  root_cause: string;
  timeline: string[];
  remediation: string[];
  lessons_learned: string[];
  status: IncidentPostmortemStatus;
}

export interface IncidentPostmortemUpdate {
  incident_id?: string;
  title?: string;
  root_cause?: string;
  timeline?: string[];
  remediation?: string[];
  lessons_learned?: string[];
  status?: IncidentPostmortemStatus;
}

export interface IncidentPostmortemQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const ProductionChecklistStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type ProductionChecklistStatus = (typeof ProductionChecklistStatus)[keyof typeof ProductionChecklistStatus];

export interface ProductionChecklist {
  id: string;
  name: string;
  category: string;
  items: string[];
  last_completed_at: string;
  status: ProductionChecklistStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductionChecklistCreate {
  name: string;
  category: string;
  items: string[];
  last_completed_at: string;
  status: ProductionChecklistStatus;
}

export interface ProductionChecklistUpdate {
  name?: string;
  category?: string;
  items?: string[];
  last_completed_at?: string;
  status?: ProductionChecklistStatus;
}

export interface ProductionChecklistQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export const GoLiveApprovalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;
export type GoLiveApprovalStatus = (typeof GoLiveApprovalStatus)[keyof typeof GoLiveApprovalStatus];

export interface GoLiveApproval {
  id: string;
  service_name: string;
  environment: string;
  approvers: string[];
  approved_at: string;
  conditions: string[];
  status: GoLiveApprovalStatus;
  created_at: string;
  updated_at: string;
}

export interface GoLiveApprovalCreate {
  service_name: string;
  environment: string;
  approvers: string[];
  approved_at: string;
  conditions: string[];
  status: GoLiveApprovalStatus;
}

export interface GoLiveApprovalUpdate {
  service_name?: string;
  environment?: string;
  approvers?: string[];
  approved_at?: string;
  conditions?: string[];
  status?: GoLiveApprovalStatus;
}

export interface GoLiveApprovalQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}
