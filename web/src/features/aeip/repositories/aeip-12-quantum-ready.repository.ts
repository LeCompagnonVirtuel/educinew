import { SupabaseClient } from '@supabase/supabase-js';
import { AppError, NotFoundError, ValidationError } from '@educi/errors';
import { CrudRepository, CrudRepositoryImpl, createCrudRepository } from './aeip-base.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP-12 QUANTUM-READY — Repository
// Post-quantum crypto, quantique, hybrid, migration, résilience
// Table prefix: qnt
// ═══════════════════════════════════════════════════════════════════════

// ── Quantum Readiness ──
export interface QntQuantumReadiness {
  id: string;
  school_id: string;
  assessment_name: string;
  assessment_date: string;
  overall_readiness_score: number;
  crypto_readiness_score: number;
  data_protection_score: number;
  algorithm_readiness_score: number;
  infrastructure_score: number;
  status: 'completed' | 'in_progress' | 'scheduled';
  assessed_by: string;
  findings: Record<string, unknown>[];
  recommendations: Record<string, unknown>[];
  next_assessment_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumReadinessItem {
  id: string;
  school_id: string;
  readiness_id: string;
  category: 'crypto' | 'data' | 'algorithm' | 'infrastructure' | 'governance' | 'workforce';
  item_name: string;
  description: string;
  current_state: string;
  target_state: string;
  gap_severity: 'none' | 'low' | 'medium' | 'high' | 'critical';
  remediation_priority: number;
  estimated_effort: string;
  estimated_cost: number;
  due_date: string | null;
  status: 'not_started' | 'planned' | 'in_progress' | 'completed' | 'deferred';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Post-Quantum Cryptography ──
export interface QntPQCAlgorithm {
  id: string;
  school_id: string;
  algorithm_name: string;
  algorithm_family: 'lattice' | 'hash' | 'code' | 'multivariate' | 'isogeny' | 'hybrid';
  standard: 'nist_finalized' | 'nist_candidate' | 'custom' | 'experimental';
  use_case: 'key_encapsulation' | 'digital_signature' | 'encryption' | 'hash' | 'random';
  security_level_bits: number;
  key_size_bytes: number;
  ciphertext_overhead_percent: number;
  performance_comparison: Record<string, unknown>;
  nist_status: string;
  is_recommended: boolean;
  implementation_status: 'not_started' | 'research' | 'prototype' | 'testing' | 'production';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntCryptoInventory {
  id: string;
  school_id: string;
  crypto_system_name: string;
  crypto_system_type: 'symmetric' | 'asymmetric' | 'hash' | 'key_exchange' | 'digital_signature' | 'mac' | 'kdf' | 'random';
  algorithm: string;
  key_size: number;
  current_standard: 'classical' | 'pqc' | 'hybrid';
  quantum_vulnerable: boolean;
  vulnerability_level: 'safe' | 'timeline_at_risk' | 'vulnerable' | 'critically_vulnerable';
  data_lifetime_years: number;
  harvest_now_decrypt_later_risk: boolean;
  usage_locations: string[];
  last_audit_date: string;
  migration_status: 'not_started' | 'planned' | 'in_progress' | 'completed';
  pqc_algorithm_id: string | null;
  replacement_deadline: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntKeyRotation {
  id: string;
  school_id: string;
  key_name: string;
  key_type: string;
  rotation_policy_days: number;
  last_rotated_at: string;
  next_rotation_at: string;
  auto_rotation_enabled: boolean;
  rotation_count: number;
  algorithm: string;
  key_size: number;
  is_post_quantum: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Quantum Computing ──
export interface QntQuantumResource {
  id: string;
  school_id: string;
  resource_name: string;
  resource_type: 'simulator' | 'cloud_access' | 'emulator' | 'hybrid' | 'real_hardware';
  provider: string;
  qubit_count: number;
  qubit_type: string;
  gate_fidelity: number;
  connectivity: string;
  max_circuit_depth: number;
  status: 'available' | 'offline' | 'maintenance' | 'deprecated';
  access_type: 'dedicated' | 'shared' | 'on_demand';
  cost_per_hour: number;
  api_endpoint: string | null;
  capabilities: string[];
  restrictions: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumExperiment {
  id: string;
  school_id: string;
  experiment_name: string;
  experiment_type: 'algorithm_test' | 'benchmark' | 'research' | 'optimization' | 'simulation' | 'education';
  resource_id: string;
  circuit_type: string;
  qubits_used: number;
  gate_count: number;
  circuit_depth: number;
  shots: number;
  status: 'draft' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  results: Record<string, unknown>;
  fidelity_score: number;
  execution_time_ms: number;
  cost: number;
  researcher_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumCircuit {
  id: string;
  school_id: string;
  experiment_id: string;
  circuit_name: string;
  qubit_count: number;
  gate_count: number;
  circuit_depth: number;
  gate_breakdown: Record<string, number>;
  circuit_json: Record<string, unknown>;
  description: string;
  author_id: string;
  is_optimized: boolean;
  optimization_passes: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumResult {
  id: string;
  school_id: string;
  experiment_id: string;
  result_type: 'measurement' | 'state_vector' | 'density_matrix' | 'expectation_value' | 'fidelity';
  raw_results: Record<string, unknown>;
  processed_results: Record<string, unknown>;
  histogram: Record<string, number>;
  fidelity: number;
  statistical_significance: number;
  error_rate: number;
  analysis_notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Quantum-Safe Migration ──
export interface QntMigrationPlan {
  id: string;
  school_id: string;
  plan_name: string;
  plan_type: 'crypto_agility' | 'full_migration' | 'hybrid_transition' | 'selective';
  status: 'draft' | 'approved' | 'in_progress' | 'completed' | 'on_hold';
  start_date: string;
  target_date: string;
  phases: Record<string, unknown>[];
  total_systems_affected: number;
  systems_migrated: number;
  systems_remaining: number;
  estimated_budget: number;
  actual_cost: number;
  risk_assessment: Record<string, unknown>;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntMigrationPhase {
  id: string;
  school_id: string;
  migration_plan_id: string;
  phase_number: number;
  phase_name: string;
  phase_type: 'inventory' | 'assessment' | 'design' | 'implementation' | 'testing' | 'deployment' | 'verification';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'skipped';
  start_date: string;
  end_date: string;
  systems: string[];
  deliverables: string[];
  assigned_team: string[];
  blockers: string[];
  completion_percent: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntMigrationTask {
  id: string;
  school_id: string;
  phase_id: string;
  task_name: string;
  task_type: 'inventory' | 'replace' | 'test' | 'validate' | 'deploy' | 'document';
  system_id: string | null;
  from_algorithm: string;
  to_algorithm: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked' | 'deferred';
  assigned_to: string;
  estimated_hours: number;
  actual_hours: number;
  dependencies: string[];
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Hybrid Encryption ──
export interface QntHybridCipherSuite {
  id: string;
  school_id: string;
  suite_name: string;
  classical_algorithm: string;
  classical_key_size: number;
  pqc_algorithm: string;
  pqc_security_level: number;
  hybrid_mode: 'concat' | 'kdf' | 'nested' | 'parallel';
  compliance: string[];
  performance_benchmark: Record<string, unknown>;
  is_recommended: boolean;
  status: 'testing' | 'production' | 'deprecated';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntHybridKeyExchange {
  id: string;
  school_id: string;
  exchange_id: string;
  session_id: string | null;
  cipher_suite_id: string;
  classical_public_key: string;
  pqc_public_key: string;
  classical_shared_secret: string;
  pqc_shared_secret: string;
  derived_key_hash: string;
  status: 'initiated' | 'completed' | 'failed' | 'expired';
  initiator_id: string;
  responder_id: string | null;
  protocol_version: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Quantum Threat Intelligence ──
export interface QntThreatIntelligence {
  id: string;
  school_id: string;
  threat_type: 'quantum_computing_advancement' | 'crypto_breakthrough' | 'harvest_decrypt' | 'supply_chain' | 'standard_change';
  title: string;
  description: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  source: string;
  source_url: string;
  published_date: string;
  affected_algorithms: string[];
  mitigation_steps: string[];
  relevance_score: number;
  reviewed: boolean;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumAdvancement {
  id: string;
  school_id: string;
  advancement_name: string;
  advancement_type: 'hardware' | 'algorithm' | 'software' | 'theory' | 'commercial';
  description: string;
  qubit_count: number | null;
  error_rate: number | null;
  significance_level: 'low' | 'medium' | 'high' | 'breakthrough';
  impact_on_crypto: string[];
  timeline_estimate: string;
  source: string;
  reported_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Quantum Education ──
export interface QntQuantumCourse {
  id: string;
  school_id: string;
  course_name: string;
  course_type: 'introductory' | 'intermediate' | 'advanced' | 'specialized';
  topics: string[];
  target_audience: string[];
  duration_hours: number;
  prerequisites: string[];
  learning_objectives: string[];
  status: 'draft' | 'active' | 'archived';
  enrollment_count: number;
  completion_count: number;
  avg_rating: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumEnrollment {
  id: string;
  school_id: string;
  course_id: string;
  user_id: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped' | 'waitlisted';
  enrolled_at: string;
  started_at: string | null;
  completed_at: string | null;
  progress_percent: number;
  score: number | null;
  certificate_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Quantum-Safe Digital Signatures ──
export interface QntDigitalSignature {
  id: string;
  school_id: string;
  signature_type: 'document' | 'code' | 'api' | 'certificate' | 'blockchain';
  classical_algorithm: string;
  pqc_algorithm: string;
  is_hybrid: boolean;
  signer_id: string;
  document_hash: string;
  signature_value: string;
  public_key: string;
  certificate_chain: string[];
  timestamp: string;
  verified: boolean;
  verification_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntQuantumCertificate {
  id: string;
  school_id: string;
  certificate_type: 'tls' | 'code_signing' | 'document_signing' | 'email' | 'device';
  subject: string;
  issuer: string;
  serial_number: string;
  not_before: string;
  not_after: string;
  classical_algorithm: string;
  pqc_algorithm: string;
  is_hybrid: boolean;
  key_size: number;
  san: string[];
  auto_renew: boolean;
  renew_days_before: number;
  status: 'active' | 'expiring_soon' | 'expired' | 'revoked';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Quantum Random Number Generation ──
export interface QntQRNGConfig {
  id: string;
  school_id: string;
  provider: string;
  source_type: 'hardware' | 'cloud' | 'hybrid' | 'pseudorandom_with_quantum_seed';
  api_endpoint: string | null;
  entropy_rate: number;
  min_entropy_bits: number;
  max_request_size: number;
  rate_limit_rpm: number;
  certification: string[];
  status: 'active' | 'inactive' | 'testing';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QntRandomnessRequest {
  id: string;
  school_id: string;
  config_id: string;
  request_type: 'bytes' | 'integers' | 'floats' | 'uuid' | 'token';
  size_bytes: number;
  status: 'pending' | 'completed' | 'failed';
  response_time_ms: number;
  entropy_bits: number;
  used_for: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Table Name Map ──
export const QNT_TABLE_NAMES = {
  QUANTUM_READINESS: 'qnt_quantum_readinesss',
  QUANTUM_READINESS_ITEM: 'qnt_quantum_readiness_items',
  PQC_ALGORITHM: 'qnt_pqc_algorithms',
  CRYPTO_INVENTORY: 'qnt_crypto_inventories',
  KEY_ROTATION: 'qnt_key_rotations',
  QUANTUM_RESOURCE: 'qnt_quantum_resources',
  QUANTUM_EXPERIMENT: 'qnt_quantum_experiments',
  QUANTUM_CIRCUIT: 'qnt_quantum_circuits',
  QUANTUM_RESULT: 'qnt_quantum_results',
  MIGRATION_PLAN: 'qnt_migration_plans',
  MIGRATION_PHASE: 'qnt_migration_phases',
  MIGRATION_TASK: 'qnt_migration_tasks',
  HYBRID_CIPHER_SUITE: 'qnt_hybrid_cipher_suites',
  HYBRID_KEY_EXCHANGE: 'qnt_hybrid_key_exchanges',
  THREAT_INTELLIGENCE: 'qnt_threat_intelligences',
  QUANTUM_ADVANCEMENT: 'qnt_quantum_advancements',
  QUANTUM_COURSE: 'qnt_quantum_courses',
  QUANTUM_ENROLLMENT: 'qnt_quantum_enrollments',
  DIGITAL_SIGNATURE: 'qnt_digital_signatures',
  QUANTUM_CERTIFICATE: 'qnt_quantum_certificates',
  QRNG_CONFIG: 'qnt_qrng_configs',
  RANDOMNESS_REQUEST: 'qnt_randomness_requests',
} as const;

// ── Repository Interface ──
export interface AEIP12Repository {
  quantumReadinesss: CrudRepository<QntQuantumReadiness>;
  quantumReadinessItems: CrudRepository<QntQuantumReadinessItem>;
  pqcAlgorithms: CrudRepository<QntPQCAlgorithm>;
  cryptoInventories: CrudRepository<QntCryptoInventory>;
  keyRotations: CrudRepository<QntKeyRotation>;
  quantumResources: CrudRepository<QntQuantumResource>;
  quantumExperiments: CrudRepository<QntQuantumExperiment>;
  quantumCircuits: CrudRepository<QntQuantumCircuit>;
  quantumResults: CrudRepository<QntQuantumResult>;
  migrationPlans: CrudRepository<QntMigrationPlan>;
  migrationPhases: CrudRepository<QntMigrationPhase>;
  migrationTasks: CrudRepository<QntMigrationTask>;
  hybridCipherSuites: CrudRepository<QntHybridCipherSuite>;
  hybridKeyExchanges: CrudRepository<QntHybridKeyExchange>;
  threatIntelligences: CrudRepository<QntThreatIntelligence>;
  quantumAdvancements: CrudRepository<QntQuantumAdvancement>;
  quantumCourses: CrudRepository<QntQuantumCourse>;
  quantumEnrollments: CrudRepository<QntQuantumEnrollment>;
  digitalSignatures: CrudRepository<QntDigitalSignature>;
  quantumCertificates: CrudRepository<QntQuantumCertificate>;
  qrngConfigs: CrudRepository<QntQRNGConfig>;
  randomnessRequests: CrudRepository<QntRandomnessRequest>;
}

// ── Factory Function ──
export function createAEIP12Repository(supabase: SupabaseClient): AEIP12Repository {
  return {
    quantumReadinesss: createCrudRepository<QntQuantumReadiness>(supabase, QNT_TABLE_NAMES.QUANTUM_READINESS),
    quantumReadinessItems: createCrudRepository<QntQuantumReadinessItem>(supabase, QNT_TABLE_NAMES.QUANTUM_READINESS_ITEM),
    pqcAlgorithms: createCrudRepository<QntPQCAlgorithm>(supabase, QNT_TABLE_NAMES.PQC_ALGORITHM),
    cryptoInventories: createCrudRepository<QntCryptoInventory>(supabase, QNT_TABLE_NAMES.CRYPTO_INVENTORY),
    keyRotations: createCrudRepository<QntKeyRotation>(supabase, QNT_TABLE_NAMES.KEY_ROTATION),
    quantumResources: createCrudRepository<QntQuantumResource>(supabase, QNT_TABLE_NAMES.QUANTUM_RESOURCE),
    quantumExperiments: createCrudRepository<QntQuantumExperiment>(supabase, QNT_TABLE_NAMES.QUANTUM_EXPERIMENT),
    quantumCircuits: createCrudRepository<QntQuantumCircuit>(supabase, QNT_TABLE_NAMES.QUANTUM_CIRCUIT),
    quantumResults: createCrudRepository<QntQuantumResult>(supabase, QNT_TABLE_NAMES.QUANTUM_RESULT),
    migrationPlans: createCrudRepository<QntMigrationPlan>(supabase, QNT_TABLE_NAMES.MIGRATION_PLAN),
    migrationPhases: createCrudRepository<QntMigrationPhase>(supabase, QNT_TABLE_NAMES.MIGRATION_PHASE),
    migrationTasks: createCrudRepository<QntMigrationTask>(supabase, QNT_TABLE_NAMES.MIGRATION_TASK),
    hybridCipherSuites: createCrudRepository<QntHybridCipherSuite>(supabase, QNT_TABLE_NAMES.HYBRID_CIPHER_SUITE),
    hybridKeyExchanges: createCrudRepository<QntHybridKeyExchange>(supabase, QNT_TABLE_NAMES.HYBRID_KEY_EXCHANGE),
    threatIntelligences: createCrudRepository<QntThreatIntelligence>(supabase, QNT_TABLE_NAMES.THREAT_INTELLIGENCE),
    quantumAdvancements: createCrudRepository<QntQuantumAdvancement>(supabase, QNT_TABLE_NAMES.QUANTUM_ADVANCEMENT),
    quantumCourses: createCrudRepository<QntQuantumCourse>(supabase, QNT_TABLE_NAMES.QUANTUM_COURSE),
    quantumEnrollments: createCrudRepository<QntQuantumEnrollment>(supabase, QNT_TABLE_NAMES.QUANTUM_ENROLLMENT),
    digitalSignatures: createCrudRepository<QntDigitalSignature>(supabase, QNT_TABLE_NAMES.DIGITAL_SIGNATURE),
    quantumCertificates: createCrudRepository<QntQuantumCertificate>(supabase, QNT_TABLE_NAMES.QUANTUM_CERTIFICATE),
    qrngConfigs: createCrudRepository<QntQRNGConfig>(supabase, QNT_TABLE_NAMES.QRNG_CONFIG),
    randomnessRequests: createCrudRepository<QntRandomnessRequest>(supabase, QNT_TABLE_NAMES.RANDOMNESS_REQUEST),
  };
}
