export {
  type GestcrpBaseEntity,
  type PaginatedResult,
  type PaginationParams,
  type FilterParams,
  type GestcrpCrudRepository,
  GestcrpCrudRepositoryImpl,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

export {
  type GestcrpZeroTrustPolicy,
  type GestcrpZeroTrustAssessment,
  type GestcrpZeroTrustEvaluation,
  type GestcrpZeroTrustZone,
  type GestcrpZeroTrustContext,
  type ZeroTrustRepository,
  ZERO_TRUST_TABLE_NAMES,
  createZeroTrustRepository,
} from './zero-trust-repository';

export {
  type GestcrpIAMPolicy,
  type GestcrpIAMEvent,
  type GestcrpIAMSession,
  type GestcrpCredentialRotation,
  type GestcrpBiometricCredential,
  type IAMRepository,
  IAM_TABLE_NAMES,
  createIAMRepository,
} from './iam-repository';

export {
  type GestcrpSOCIncident,
  type GestcrpSOCIndicator,
  type GestcrpAPTAction,
  type SOCRepository,
  SOC_TABLE_NAMES,
  createSOCRepository,
} from './soc-repository';

export {
  type GestcrpSIEMEvent,
  type GestcrpSIEMRule,
  type GestcrpSIEMCorrelation,
  type SIEMRepository,
  SIEM_TABLE_NAMES,
  createSIEMRepository,
} from './siem-repository';

export {
  type GestcrpThreatIndicator,
  type GestcrpThreatFeed,
  type GestcrpThreatAnalysis,
  type GestcrpThreatFeedMatch,
  type ThreatRepository,
  THREAT_TABLE_NAMES,
  createThreatRepository,
} from './threat-repository';

export {
  type GestcrpAppScan,
  type GestcrpVulnerability,
  type GestcrpAPISecurityPolicy,
  type GestcrpDependencyScan,
  type AppSecurityRepository,
  APP_SECURITY_TABLE_NAMES,
  createAppSecurityRepository,
} from './app-security-repository';

export {
  type GestcrpDLPPolicy,
  type GestcrpDLPIncident,
  type GestcrpEncryptionKey,
  type GestcrpDataRetentionPolicy,
  type GestcrpDataMaskingRule,
  type DataSecurityRepository,
  DATA_SECURITY_TABLE_NAMES,
  createDataSecurityRepository,
} from './data-security-repository';

export {
  type GestcrpDeviceInventory,
  type GestcrpDeviceCompliance,
  type GestcrpMDMCommand,
  type DeviceRepository,
  DEVICE_TABLE_NAMES,
  createDeviceRepository,
} from './device-repository';

export {
  type GestcrpSOARPlaybook,
  type GestcrpSOARExecution,
  type SOARRepository,
  SOAR_TABLE_NAMES,
  createSOARRepository,
} from './soar-repository';

export {
  type GestcrpBCPPlan,
  type GestcrpBackupPolicy,
  type GestcrpBackupJob,
  type GestcrpDRTestResult,
  type BCPRepository,
  BCP_TABLE_NAMES,
  createBCPRepository,
} from './bcp-repository';

export {
  type GestcrpComplianceAssessment,
  type GestcrpGovernancePolicy,
  type GestcrpRiskRegister,
  type GestcrpAuditLog,
  type ComplianceRepository,
  COMPLIANCE_TABLE_NAMES,
  createComplianceRepository,
} from './compliance-repository';

export {
  type GestcrpCyberDigitalTwin,
  type GestcrpTwinResult,
  type GestcrpAttackScenario,
  type CyberTwinRepository,
  CYBER_TWIN_TABLE_NAMES,
  createCyberTwinRepository,
} from './cyber-twin-repository';
