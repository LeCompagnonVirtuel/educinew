export enum QuantumAlgorithm {
  GROVER = "GROVER",
  SHOR = "SHOR",
  DEUTSCH = "DEUTSCH",
  SIMON = "SIMON",
  BOHR = "BOHR",
  VQE = "VQE",
  QAOA = "QAOA",
  QUANTUM_SAMPLING = "QUANTUM_SAMPLING",
  QUANTUM_MACHINE_LEARNING = "QUANTUM_MACHINE_LEARNING",
  QUANTUM_OPTIMIZATION = "QUANTUM_OPTIMIZATION",
  QUANTUM_SIMULATION = "QUANTUM_SIMULATION",
  QUANTUM_KEY_DISTRIBUTION = "QUANTUM_KEY_DISTRIBUTION",
}

export enum EncryptionType {
  AES_128 = "AES_128",
  AES_256 = "AES_256",
  RSA_2048 = "RSA_2048",
  RSA_4096 = "RSA_4096",
  ECC = "ECC",
  HOMOMORPHIC_ADDITIVE = "HOMOMORPHIC_ADDITIVE",
  HOMOMORPHIC_MULTIPLICATIVE = "HOMOMORPHIC_MULTIPLICATIVE",
  HOMOMORPHIC_FULLY = "HOMOMORPHIC_FULLY",
  HOMOMORPHIC_PARTIAL = "HOMOMORPHIC_PARTIAL",
  HOMOMORPHIC_SYMMETRIC = "HOMOMORPHIC_SYMMETRIC",
  POST_QUANTUM_LATTICE = "POST_QUANTUM_LATTICE",
  POST_QUANTUM_HASH = "POST_QUANTUM_HASH",
  POST_QUANTUM_CODE = "POST_QUANTUM_CODE",
}

export enum ComputationType {
  SECURE_MULTI_PARTY = "SECURE_MULTI_PARTY",
  HOMOMORPHIC = "HOMOMORPHIC",
  TRUSTED_EXECUTION = "TRUSTED_EXECUTION",
  CONFIDENTIAL_COMPUTING = "CONFIDENTIAL_COMPUTING",
  ZERO_KNOWLEDGE = "ZERO_KNOWLEDGE",
  SECRET_SHARING = "SECRET_SHARING",
  FUNCTIONAL_ENCRYPTION = "FUNCTIONAL_ENCRYPTION",
  OBLIVIOUS_TRANSFER = "OBLIVIOUS_TRANSFER",
}

export enum IdentityProvider {
  DID_WEB = "DID_WEB",
  DID_KEY = "DID_KEY",
  DID_ETHR = "DID_ETHR",
  DID_SOV = "DID_SOV",
  DID_IPFS = "DID_IPFS",
  DID_PEER = "DID_PEER",
  DID_UUID = "DID_UUID",
}

export enum CredentialType {
  VERIFIABLE_PRESENTATION = "VERIFIABLE_PRESENTATION",
  VERIFIABLE_CREDENTIAL = "VERIFIABLE_CREDENTIAL",
  DECENTRALIZED_IDENTIFIER = "DECENTRALIZED_IDENTIFIER",
  BOUND_CREDENTIAL = "BOUND_CREDENTIAL",
  UNBOUND_CREDENTIAL = "UNBOUND_CREDENTIAL",
  ANONYMOUS_CREDENTIAL = "ANONYMOUS_CREDENTIAL",
  PSEUDONYMOUS_CREDENTIAL = "PSEUDONYMOUS_CREDENTIAL",
  SELECTIVE_DISCLOSURE = "SELECTIVE_DISCLOSURE",
}

export enum ZeroTrustPolicy {
  NEVER_TRUST = "NEVER_TRUST",
  ALWAYS_VERIFY = "ALWAYS_VERIFY",
  LEAST_PRIVILEGE = "LEAST_PRIVILEGE",
  MICRO_SEGMENTATION = "MICRO_SEGMENTATION",
  CONTINUOUS_AUTH = "CONTINUOUS_AUTH",
  CONTEXTUAL_ACCESS = "CONTEXTUAL_ACCESS",
  DEVICE_TRUST = "DEVICE_TRUST",
  NETWORK_TRUST = "NETWORK_TRUST",
}

export enum SecurityProtocol {
  TLS_1_3 = "TLS_1_3",
  MTLS = "MTLS",
  JWT = "JWT",
  OAUTH2 = "OAUTH2",
  OIDC = "OIDC",
  SAML = "SAML",
  FIDO2 = "FIDO2",
  WEBAUTHN = "WEBAUTHN",
  QUANTUM_SAFE = "QUANTUM_SAFE",
}

export enum QubitState {
  ZERO = "ZERO",
  ONE = "ONE",
  SUPERPOSITION = "SUPERPOSITION",
  ENTANGLED = "ENTANGLED",
  DECOHERENT = "DECOHERENT",
}

export enum QuantumGate {
  HADAMARD = "HADAMARD",
  PAULI_X = "PAULI_X",
  PAULI_Y = "PAULI_Y",
  PAULI_Z = "PAULI_Z",
  CNOT = "CNOT",
  TOFFOLI = "TOFFOLI",
  ROTATION_X = "ROTATION_X",
  ROTATION_Y = "ROTATION_Y",
  ROTATION_Z = "ROTATION_Z",
  PHASE = "PHASE",
}

export enum ConfidentialComputePlatform {
  INTEL_SGX = "INTEL_SGX",
  AMD_SEV = "AMD_SEV",
  ARMTrustZone = "ARMTrustZone",
  AWS_NITRO = "AWS_NITRO",
  AZURE_CONFIDENTIAL = "AZURE_CONFIDENTIAL",
  GCP_CONFIDENTIAL = "GCP_CONFIDENTIAL",
}

export enum MPCProtocol {
  SHAMIR_SECRET_SHARING = "SHAMIR_SECRET_SHARING",
  GARbled_CIRCUITS = "GARbled_CIRCUITS",
  OBLIVIOUS_TRANSFER = "OBLIVIOUS_TRANSFER",
  HOMOMORPHIC_ENCRYPTION = "HOMOMORPHIC_ENCRYPTION",
  DIFFERENTIAL_PRIVATE = "DIFFERENTIAL_PRIVATE",
  SECRET_SHARING_ADDITIVE = "SECRET_SHARING_ADDITIVE",
}

export enum TrustLevel {
  UNTRUSTED = "UNTRUSTED",
  LIMITED = "LIMITED",
  PARTIAL = "PARTIAL",
  FULL = "FULL",
  VERIFIED = "VERIFIED",
}

export enum ThreatCategory {
  MALWARE = "MALWARE",
  PHISHING = "PHISHING",
  DDoS = "DDoS",
  DATA_EXFILTRATION = "DATA_EXFILTRATION",
  PRIVILEGE_ESCALATION = "PRIVILEGE_ESCALATION",
  MAN_IN_THE_MIDDLE = "MAN_IN_THE_MIDDLE",
  QUANTUM_ATTACK = "QUANTUM_ATTACK",
  SIDE_CHANNEL = "SIDE_CHANNEL",
}

export enum ComplianceFramework {
  NIST_800_53 = "NIST_800_53",
  ISO_27001 = "ISO_27001",
  SOC2_TYPE2 = "SOC2_TYPE2",
  GDPR = "GDPR",
  CCPA = "CCPA",
  HIPAA = "HIPAA",
  FEDRAMP = "FEDRAMP",
  PCI_DSS = "PCI_DSS",
}

export enum PostQuantumAlgorithm {
  CRYSTALS_KYBER = "CRYSTALS_KYBER",
  CRYSTALS_DILITHIUM = "CRYSTALS_DILITHIUM",
  FALCON = "FALCON",
  SPHINCS_PLUS = "SPHINCS_PLUS",
  NTRU = "NTRU",
  SABER = "SABER",
  FrodoKEM = "FrodoKEM",
  McELIECE = "McELIECE",
}

export enum HomomorphicScheme {
  BFV = "BFV",
  BGV = "BGV",
  CKKS = "CKKS",
  TFHE = "TFHE",
  FHEW = "FHEW",
  DM = "DM",
}

export enum TrustedExecutionEnvironment {
  SGX = "SGX",
  SEV = "SEV",
  TrustZone = "TrustZone",
  TDX = "TDX",
  SEV_SNP = "SEV_SNP",
}

export enum ZKProofType {
  SNARK = "SNARK",
  STARK = "STARK",
  BULLET_PROOF = "BULLET_PROOF",
  PLONK = "PLONK",
  GROTH16 = "GROTH16",
  FRI = "FRI",
}

export enum CryptographicHash {
  SHA_256 = "SHA_256",
  SHA_3_256 = "SHA_3_256",
  BLAKE2 = "BLAKE2",
  BLAKE3 = "BLAKE3",
  KECCAK = "KECCAK",
}

export enum KeyExchangeProtocol {
  DHE = "DHE",
  ECDHE = "ECDHE",
  KYBER = "KYBER",
  NOISE = "NOISE",
  X3DH = "X3DH",
}

export enum QuantumErrorCorrection {
  SURFACE_CODE = "SURFACE_CODE",
  SHOR_CODE = "SHOR_CODE",
  STEANE_CODE = "STEANE_CODE",
  REPETITION_CODE = "REPETITION_CODE",
  COLOR_CODE = "COLOR_CODE",
}

export interface QuantumArchitecture {
  id: string;
  school_id: string;
  architecture_name: string;
  description: string;
  quantum_processors: QuantumProcessor[];
  classical_processors: ClassicalProcessor[];
  hybrid_interfaces: HybridInterface[];
  supported_algorithms: QuantumAlgorithm[];
  qubit_count_total: number;
  coherence_time_us: number;
  gate_error_rate: number;
  readout_error_rate: number;
  connectivity_topology: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QuantumProcessor {
  processor_id: string;
  name: string;
  qubit_count: number;
  qubit_type: string;
  connectivity: string;
  gate_set: QuantumGate[];
  coherence_time_us: number;
  gate_time_ns: number;
  error_rate: number;
  calibration_date: string;
  status: string;
}

export interface ClassicalProcessor {
  processor_id: string;
  name: string;
  cores: number;
  clock_speed_ghz: number;
  memory_gb: number;
  purpose: string;
  status: string;
}

export interface HybridInterface {
  interface_id: string;
  name: string;
  protocol: string;
  latency_ms: number;
  bandwidth_gbps: number;
  bidirectional: boolean;
  status: string;
}

export interface QuantumCircuit {
  id: string;
  architecture_id: string;
  circuit_name: string;
  description: string;
  qubits_used: number;
  depth: number;
  gates: QuantumCircuitGate[];
  measurements: QuantumMeasurement[];
  optimization_level: number;
  estimated_execution_time_ms: number;
  estimated_fidelity: number;
  created_at: string;
}

export interface QuantumCircuitGate {
  gate: QuantumGate;
  target_qubit: number;
  control_qubit: number | null;
  parameters: number[];
  position: number;
}

export interface QuantumMeasurement {
  qubit: number;
  basis: string;
  result: QubitState;
  probability: number;
}

export interface QuantumResult {
  id: string;
  circuit_id: string;
  execution_id: string;
  results: QuantumMeasurement[];
  classical_output: Record<string, unknown>;
  execution_time_ms: number;
  fidelity: number;
  shots: number;
  success: boolean;
  error_message: string | null;
  executed_at: string;
}

export interface QuantumAlgorithmConfig {
  id: string;
  algorithm: QuantumAlgorithm;
  parameters: Record<string, unknown>;
  qubits_required: number;
  depth_estimate: number;
  convergence_criteria: string;
  max_iterations: number;
  tolerance: number;
  description: string;
}

export interface ConfidentialCompute {
  id: string;
  school_id: string;
  platform: ConfidentialComputePlatform;
  enclave_id: string;
  attestation_url: string;
  attestation_status: string;
  enclave_size_mb: number;
  memory_encrypted: boolean;
  secure_boot_enabled: boolean;
  side_channel_protection: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EncryptedData {
  id: string;
  school_id: string;
  data_type: string;
  encryption_type: EncryptionType;
  encrypted_payload: string;
  iv: string;
  key_id: string;
  key_version: string;
  algorithm: string;
  compression: boolean;
  integrity_hash: string;
  created_at: string;
  expires_at: string;
}

export interface HomomorphicOperation {
  id: string;
  school_id: string;
  operation_type: string;
  scheme: HomomorphicScheme;
  input_data_ids: string[];
  result_data_id: string;
  operation_parameters: Record<string, unknown>;
  computation_time_ms: number;
  noise_level: number;
  precision_bits: number;
  status: string;
  executed_at: string;
}

export interface SecureComputation {
  id: string;
  school_id: string;
  computation_type: ComputationType;
  participants: ComputationParticipant[];
  protocol: MPCProtocol;
  input_count: number;
  output_count: number;
  rounds: number;
  total_communication_bytes: number;
  computation_time_ms: number;
  status: string;
  created_at: string;
  completed_at: string | null;
}

export interface ComputationParticipant {
  participant_id: string;
  role: string;
  party_index: number;
  input_data_id: string;
  contribution_hash: string;
  status: string;
}

export interface MPCSession {
  id: string;
  computation_id: string;
  session_name: string;
  protocol: MPCProtocol;
  parties: MPCParty[];
  threshold: number;
  secret_shares: SecretShare[];
  session_status: string;
  created_at: string;
  completed_at: string | null;
}

export interface MPCParty {
  party_id: string;
  party_index: number;
  endpoint: string;
  public_key: string;
  status: string;
  contribution_hash: string;
}

export interface SecretShare {
  share_id: string;
  party_id: string;
  share_index: number;
  share_value: string;
  polynomial_degree: number;
  created_at: string;
}

export interface DecentralizedIdentity {
  id: string;
  school_id: string;
  did: string;
  did_document: DIDDocument;
  provider: IdentityProvider;
  key_management: DIDKeyManagement;
  service_endpoints: DIDServiceEndpoint[];
  created_at: string;
  updated_at: string;
  deactivated: boolean;
}

export interface DIDDocument {
  context: string[];
  id: string;
  controller: string[];
  verification_method: DIDVerificationMethod[];
  authentication: string[];
  assertion_method: string[];
  key_agreement: string[];
  capability_delegation: string[];
  capability_invocation: string[];
  service: DIDService[];
}

export interface DIDVerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
  publicKeyJwk: Record<string, unknown>;
}

export interface DIDKeyManagement {
  key_id: string;
  key_type: string;
  key_curve: string;
  public_key: string;
  created_at: string;
  expires_at: string | null;
  rotated: boolean;
}

export interface DIDService {
  id: string;
  type: string;
  serviceEndpoint: string;
  serviceMetadata: Record<string, unknown>;
}

export interface DIDServiceEndpoint {
  endpoint_id: string;
  endpoint_type: string;
  url: string;
  description: string;
  active: boolean;
}

export interface VerifiableCredential {
  id: string;
  school_id: string;
  issuer_did: string;
  subject_did: string;
  credential_type: CredentialType;
  credential_schema: string;
  issuance_date: string;
  expiration_date: string | null;
  claims: VerifiableClaim[];
  proof: CredentialProof;
  revoked: boolean;
  revocation_date: string | null;
  status: string;
}

export interface VerifiableClaim {
  claim_type: string;
  claim_value: unknown;
  confidence: number;
  source: string;
  issued_at: string;
}

export interface CredentialProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
  jws: string;
}

export interface CredentialVerification {
  id: string;
  credential_id: string;
  verifier_did: string;
  holder_did: string;
  verification_type: string;
  is_valid: boolean;
  verification_result: VerificationResult;
  disclosed_claims: string[];
  verification_timestamp: string;
  expires_at: string;
}

export interface VerificationResult {
  signature_valid: boolean;
  issuer_trusted: boolean;
  not_revoked: boolean;
  not_expired: boolean;
  schema_valid: boolean;
  overall_valid: boolean;
  errors: string[];
}

export interface ZeroTrustConfig {
  id: string;
  school_id: string;
  policies: ZeroTrustPolicy[];
  identity_verification: IdentityVerificationConfig;
  device_trust: DeviceTrustConfig;
  network_segmentation: NetworkSegmentationConfig;
  data_protection: DataProtectionConfig;
  continuous_monitoring: ContinuousMonitoringConfig;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IdentityVerificationConfig {
  mfa_required: boolean;
  biometric_enabled: boolean;
  certificate_based: boolean;
  session_timeout_minutes: number;
  max_concurrent_sessions: number;
  risk_based_auth: boolean;
}

export interface DeviceTrustConfig {
  device_registration_required: boolean;
  device_health_check: boolean;
  certificate_pinning: boolean;
  jailbreak_detection: boolean;
  minimum_os_version: string;
  antivirus_required: boolean;
}

export interface NetworkSegmentationConfig {
  micro_segmentation_enabled: boolean;
  vlan_count: number;
  firewall_rules_count: number;
  encrypted_communication: boolean;
  vpn_required: boolean;
  dns_filtering: boolean;
}

export interface DataProtectionConfig {
  encryption_at_rest: boolean;
  encryption_in_transit: boolean;
  data_classification: boolean;
  dlp_enabled: boolean;
  backup_encryption: boolean;
  key_rotation_days: number;
}

export interface ContinuousMonitoringConfig {
  log_aggregation: boolean;
  anomaly_detection: boolean;
  threat_intelligence: boolean;
  incident_response: boolean;
  siem_integration: boolean;
  monitoring_interval_seconds: number;
}

export interface ZeroTrustRule {
  id: string;
  config_id: string;
  rule_name: string;
  description: string;
  source_zone: string;
  destination_zone: string;
  allowed_protocols: string[];
  required_auth_level: string;
  conditions: string[];
  action: string;
  priority: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface SecurityPosture {
  id: string;
  school_id: string;
  overall_score: number;
  identity_score: number;
  device_score: number;
  network_score: number;
  data_score: number;
  application_score: number;
  threat_protection_score: number;
  compliance_score: number;
  vulnerabilities: SecurityVulnerability[];
  recommendations: SecurityRecommendation[];
  last_assessment: string;
  next_assessment: string;
}

export interface SecurityVulnerability {
  vulnerability_id: string;
  category: string;
  severity: string;
  description: string;
  affected_assets: string[];
  cve_id: string | null;
  cvss_score: number;
  remediation: string;
  status: string;
  discovered_at: string;
}

export interface SecurityRecommendation {
  recommendation_id: string;
  category: string;
  priority: string;
  description: string;
  implementation_effort: string;
  expected_impact: number;
  status: string;
}

export interface FutureComputingMetrics {
  id: string;
  school_id: string;
  period: string;
  quantum_readiness_score: number;
  confidential_computing_score: number;
  post_quantum_score: number;
  zero_trust_score: number;
  decentralized_identity_score: number;
  overall_readiness_score: number;
  quantum_algorithms_tested: number;
  encrypted_computations: number;
  mpc_sessions_completed: number;
  did_documents_issued: number;
  credentials_issued: number;
  credentials_verified: number;
  threat_blocked_count: number;
  generated_at: string;
}

export interface QuantumReadinessAssessment {
  id: string;
  school_id: string;
  current_state: string;
  target_state: string;
  gap_analysis: QuantumGapAnalysis[];
  roadmap: QuantumRoadmapItem[];
  estimated_timeline_months: number;
  investment_required: number;
  risk_assessment: string;
  recommendations: string[];
  assessed_at: string;
}

export interface QuantumGapAnalysis {
  area: string;
  current_capability: string;
  target_capability: string;
  gap_size: string;
  priority: string;
}

export interface QuantumRoadmapItem {
  phase: number;
  phase_name: string;
  description: string;
  duration_months: number;
  dependencies: string[];
  deliverables: string[];
  estimated_cost: number;
}

export interface PostQuantumMigration {
  id: string;
  school_id: string;
  migration_status: string;
  algorithms_to_migrate: PostQuantumAlgorithmItem[];
  data_classification: DataClassificationItem[];
  timeline_months: number;
  budget: number;
  progress_percentage: number;
  milestones: MigrationMilestone[];
  risks: string[];
  created_at: string;
  updated_at: string;
}

export interface PostQuantumAlgorithmItem {
  algorithm_name: string;
  current_use: string;
  pqc_replacement: string;
  migration_priority: string;
  estimated_effort: string;
}

export interface DataClassificationItem {
  data_type: string;
  sensitivity_level: string;
  volume_gb: number;
  quantum_vulnerable: boolean;
  migration_priority: string;
}

export interface MigrationMilestone {
  milestone_id: string;
  name: string;
  description: string;
  target_date: string;
  status: string;
  completed_at: string | null;
}

export interface HomomorphicEncryptionConfig {
  id: string;
  school_id: string;
  scheme: HomomorphicScheme;
  key_size_bits: number;
  noise_budget_bits: number;
  supported_operations: string[];
  max_ciphertext_depth: number;
  performance_profile: HomomorphicPerformanceProfile;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomomorphicPerformanceProfile {
  key_generation_ms: number;
  encryption_ms: number;
  decryption_ms: number;
  addition_ms: number;
  multiplication_ms: number;
  rotation_ms: number;
  bootstrapping_ms: number;
}

export interface ConfidentialComputeConfig {
  id: string;
  school_id: string;
  platform: ConfidentialComputePlatform;
  tee_type: TrustedExecutionEnvironment;
  enclave_size_mb: number;
  memory_encryption: boolean;
  attestation_enabled: boolean;
  remote_attestation_url: string;
  side_channel_protection: boolean;
  secure_boot: boolean;
  debug_mode: boolean;
  applications: ConfidentialApplication[];
  created_at: string;
  updated_at: string;
}

export interface ConfidentialApplication {
  app_id: string;
  app_name: string;
  description: string;
  enclave_required: boolean;
  attestation_required: boolean;
  status: string;
}

export interface MPCConfig {
  id: string;
  school_id: string;
  protocol: MPCProtocol;
  threshold: number;
  max_parties: number;
  communication_timeout_ms: number;
  retry_count: number;
  encryption_for_shares: EncryptionType;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface DIDConfig {
  id: string;
  school_id: string;
  primary_provider: IdentityProvider;
  did_method: string;
  key_rotation_days: number;
  auto_recovery_enabled: boolean;
  recovery_method: string;
  service_endpoints: DIDServiceEndpoint[];
  trust_framework: string;
  created_at: string;
  updated_at: string;
}

export interface VerifiableCredentialConfig {
  id: string;
  school_id: string;
  issuer_did: string;
  credential_types: CredentialType[];
  proof_type: string;
  signature_suite: string;
  schema_url: string;
  revocation_enabled: boolean;
  status_list_url: string;
  valid_duration_days: number;
  auto_renewal: boolean;
  created_at: string;
  updated_at: string;
}

export interface ZeroTrustMetrics {
  id: string;
  school_id: string;
  period: string;
  total_authentications: number;
  successful_authentications: number;
  failed_authentications: number;
  avg_auth_time_ms: number;
  mfa_usage_rate: number;
  device_compliance_rate: number;
  network_incidents: number;
  blocked_connections: number;
  threat_detections: number;
  false_positive_rate: number;
  overall_trust_score: number;
  generated_at: string;
}

export interface QuantumCircuitMetrics {
  id: string;
  school_id: string;
  period: string;
  circuits_executed: number;
  total_qubits_used: number;
  average_circuit_depth: number;
  average_fidelity: number;
  total_execution_time_ms: number;
  success_rate: number;
  algorithm_distribution: Record<QuantumAlgorithm, number>;
  generated_at: string;
}

export interface SecurityThreatLog {
  id: string;
  school_id: string;
  threat_category: ThreatCategory;
  severity: string;
  source_ip: string;
  target_resource: string;
  detection_method: string;
  blocked: boolean;
  response_action: string;
  detected_at: string;
  resolved_at: string | null;
  assigned_to: string;
  notes: string;
}

export interface EncryptionKeyManagement {
  id: string;
  school_id: string;
  key_id: string;
  key_type: string;
  algorithm: EncryptionType;
  key_size_bits: number;
  created_at: string;
  expires_at: string;
  rotation_date: string;
  usage_count: number;
  max_usage: number;
  status: string;
  backed_up: boolean;
}

export interface QuantumKeyDistribution {
  id: string;
  school_id: string;
  sender_node: string;
  receiver_node: string;
  key_length_bits: number;
  error_rate: number;
  secret_key_rate: number;
  protocol: string;
  fiber_length_km: number;
  status: string;
  created_at: string;
}

export interface PostQuantumCryptoConfig {
  id: string;
  school_id: string;
  algorithm: PostQuantumAlgorithm;
  key_size_bits: number;
  security_level: number;
  signature_size_bytes: number;
  public_key_size_bytes: number;
  performance_profile: PostQuantumPerformanceProfile;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostQuantumPerformanceProfile {
  keygen_ms: number;
  sign_ms: number;
  verify_ms: number;
  encapsulate_ms: number;
  decapsulate_ms: number;
}

export interface ZKProofConfig {
  id: string;
  school_id: string;
  proof_type: ZKProofType;
  circuit_size: number;
  proving_time_ms: number;
  verification_time_ms: number;
  proof_size_bytes: number;
  trusted_setup_required: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrustedExecutionConfig {
  id: string;
  school_id: string;
  tee_type: TrustedExecutionEnvironment;
  enclave_count: number;
  total_enclave_memory_mb: number;
  attestation_service_url: string;
  remote_attestation_enabled: boolean;
  side_channel_mitigations: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QuantumErrorCorrectionConfig {
  id: string;
  school_id: string;
  correction_code: QuantumErrorCorrection;
  logical_qubits: number;
  physical_qubits_per_logical: number;
  threshold_error_rate: number;
  current_error_rate: number;
  overhead_factor: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuantumSafeAlgorithmSuite {
  id: string;
  school_id: string;
  suite_name: string;
  key_exchange: KeyExchangeProtocol;
  digital_signature: PostQuantumAlgorithm;
  symmetric_encryption: EncryptionType;
  hash_function: CryptographicHash;
  hybrid_mode: boolean;
  classical_fallback: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuantumThreatAssessment {
  id: string;
  school_id: string;
  assessment_date: string;
  current_crypto_dependencies: CryptoDependency[];
  quantum_vulnerable_systems: string[];
  migration_urgency: string;
  estimated_qubits_to_break: number;
  years_to_threat: number;
  recommendations: string[];
  budget_estimate: number;
}

export interface CryptoDependency {
  system_name: string;
  algorithm: string;
  key_size: number;
  quantum_vulnerable: boolean;
  migration_complexity: string;
  priority: string;
}

export interface HomomorphicComputationResult {
  id: string;
  computation_id: string;
  encrypted_result: string;
  decryption_required: boolean;
  noise_budget_remaining: number;
  correctness_probability: number;
  computation_time_ms: number;
  result_hash: string;
}

export interface SecureEnclaveAttestation {
  id: string;
  school_id: string;
  enclave_id: string;
  platform: ConfidentialComputePlatform;
  attestation_quote: string;
  attestation_signature: string;
  timestamp: string;
  quote_version: string;
  tee_tcb_svn: string;
  mr_enclave: string;
  mr_signer: string;
  status: string;
}

export interface ZeroTrustAccessPolicy {
  id: string;
  school_id: string;
  policy_name: string;
  source_identity: string;
  destination_resource: string;
  conditions: AccessCondition[];
  action: string;
  risk_score_threshold: number;
  session_timeout_minutes: number;
  mfa_required: boolean;
  device_trust_required: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface AccessCondition {
  condition_type: string;
  operator: string;
  value: string;
  case_sensitive: boolean;
}

export interface DIDResolutionResult {
  id: string;
  did: string;
  did_document: DIDDocument;
  resolver_metadata: ResolverMetadata;
  resolution_method: string;
  resolved_at: string;
  cached: boolean;
}

export interface ResolverMetadata {
  driver_id: string;
  driver_version: string;
  duration_ms: number;
}

export interface CredentialSchema {
  id: string;
  schema_id: string;
  schema_name: string;
  version: string;
  type: string;
  attributes: CredentialSchemaAttribute[];
  created_at: string;
}

export interface CredentialSchemaAttribute {
  attribute_name: string;
  attribute_type: string;
  required: boolean;
  description: string;
}

export interface QuantumCircuitTemplate {
  id: string;
  template_name: string;
  algorithm: QuantumAlgorithm;
  qubit_count: number;
  circuit_gates: QuantumCircuitGate[];
  description: string;
  use_cases: string[];
  estimated_fidelity: number;
  created_at: string;
}

export interface PostQuantumMigrationPlan {
  id: string;
  school_id: string;
  plan_name: string;
  phases: PostQuantumMigrationPhase[];
  total_duration_months: number;
  total_budget: number;
  risk_level: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PostQuantumMigrationPhase {
  phase_number: number;
  phase_name: string;
  description: string;
  duration_months: number;
  systems: string[];
  algorithms: PostQuantumAlgorithm[];
  deliverables: string[];
  dependencies: string[];
  cost: number;
}

export interface QuantumComputingBenchmark {
  id: string;
  school_id: string;
  benchmark_name: string;
  algorithm: QuantumAlgorithm;
  qubits_used: number;
  circuit_depth: number;
  fidelity: number;
  execution_time_ms: number;
  classical_comparison_ms: number;
  speedup_factor: number;
  executed_at: string;
}

export interface ConfidentialComputingWorkload {
  id: string;
  school_id: string;
  workload_name: string;
  workload_type: string;
  platform: ConfidentialComputePlatform;
  cpu_cores: number;
  memory_mb: number;
  storage_gb: number;
  network_bandwidth_mbps: number;
  encryption_required: boolean;
  attestation_required: boolean;
  status: string;
  created_at: string;
}

export interface ZeroTrustNetworkSegment {
  id: string;
  school_id: string;
  segment_name: string;
  segment_type: string;
  ip_range: string;
  trust_level: TrustLevel;
  allowed_protocols: string[];
  micro_segmentation_id: string;
  firewall_rules_count: number;
  monitoring_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface MPCComputationTemplate {
  id: string;
  template_name: string;
  protocol: MPCProtocol;
  min_parties: number;
  max_parties: number;
  threshold: number;
  computation_type: string;
  description: string;
  estimated_time_seconds: number;
  created_at: string;
}

export interface QuantumKeyPair {
  id: string;
  school_id: string;
  algorithm: PostQuantumAlgorithm;
  public_key: string;
  private_key_reference: string;
  key_size_bits: number;
  created_at: string;
  expires_at: string;
  rotated: boolean;
  usage_count: number;
}

export interface QuantumRandomNumberGenerator {
  id: string;
  school_id: string;
  source: string;
  entropy_rate: number;
  min_entropy: number;
  bits_generated: number;
  last_calibration: string;
  status: string;
}

export interface DigitalSignatureScheme {
  id: string;
  school_id: string;
  scheme_name: string;
  algorithm: PostQuantumAlgorithm;
  hash_function: CryptographicHash;
  signature_size_bytes: number;
  public_key_size_bytes: number;
  security_level: number;
  enabled: boolean;
  created_at: string;
}

export interface QuantumSafeTransport {
  id: string;
  school_id: string;
  protocol: SecurityProtocol;
  quantum_safe: boolean;
  key_exchange: KeyExchangeProtocol;
  cipher_suite: string;
  certificate_type: string;
  mutual_authentication: boolean;
  status: string;
}

export interface HomomorphicDataPipeline {
  id: string;
  school_id: string;
  pipeline_name: string;
  input_sources: string[];
  operations: HomomorphicOperation[];
  output_destination: string;
  total_computation_time_ms: number;
  noise_budget_used: number;
  status: string;
  created_at: string;
}

export interface QuantumErrorRate {
  id: string;
  school_id: string;
  processor_id: string;
  single_qubit_error_rate: number;
  two_qubit_error_rate: number;
  readout_error_rate: number;
  measurement_error_rate: number;
  coherence_error_rate: number;
  total_error_rate: number;
  measured_at: string;
}

export interface SecureMultiPartyConfig {
  id: string;
  school_id: string;
  min_parties: number;
  max_parties: number;
  threshold: number;
  protocol: MPCProtocol;
  communication_rounds: number;
  verification_enabled: boolean;
  abort_on_cheating: boolean;
  timeout_seconds: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ZeroTrustIdentityProvider {
  id: string;
  school_id: string;
  provider_type: string;
  protocol: SecurityProtocol;
  mfa_methods: string[];
  risk_engine_enabled: boolean;
  continuous_verification: boolean;
  session_management: string;
  status: string;
  created_at: string;
}

export interface PostQuantumCertificate {
  id: string;
  school_id: string;
  certificate_type: string;
  algorithm: PostQuantumAlgorithm;
  subject: string;
  issuer: string;
  valid_from: string;
  valid_to: string;
  public_key: string;
  signature: string;
  revoked: boolean;
  chain_depth: number;
}

export interface QuantumThreatIntelligence {
  id: string;
  school_id: string;
  threat_type: string;
  quantum_capability_required: number;
  estimated_availability: string;
  affected_algorithms: string[];
  risk_level: string;
  last_updated: string;
  source: string;
}

export interface ConfidentialComputingAttestationPolicy {
  id: string;
  school_id: string;
  policy_name: string;
  allowed_platforms: ConfidentialComputePlatform[];
  required_tcb_version: string;
  mr_enclave_whitelist: string[];
  min_security_level: number;
  auto_refresh: boolean;
  enforcement_mode: string;
  created_at: string;
  updated_at: string;
}
