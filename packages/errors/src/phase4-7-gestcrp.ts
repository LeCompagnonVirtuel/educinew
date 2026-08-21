import { AppError } from './AppError';

// ─── Zero Trust Errors ─────────────────────────────────────────────────────
export class GestcrpZeroTrustPolicyError extends AppError {
  constructor(message = 'Erreur politique Zero Trust', code = 'GESTCRP_ZERO_TRUST_POLICY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpZeroTrustEvaluationError extends AppError {
  constructor(message = 'Erreur évaluation Zero Trust', code = 'GESTCRP_ZERO_TRUST_EVALUATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpZeroTrustAssessmentError extends AppError {
  constructor(message = 'Erreur assessment Zero Trust', code = 'GESTCRP_ZERO_TRUST_ASSESSMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpZeroTrustZoneError extends AppError {
  constructor(message = 'Erreur zone Zero Trust', code = 'GESTCRP_ZERO_TRUST_ZONE', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpZeroTrustContextError extends AppError {
  constructor(message = 'Erreur contexte Zero Trust', code = 'GESTCRP_ZERO_TRUST_CONTEXT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Identity & Access Management Errors ──────────────────────────────────
export class GestcrpIAMPolicyError extends AppError {
  constructor(message = 'Erreur politique IAM', code = 'GESTCRP_IAM_POLICY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpIAMEventError extends AppError {
  constructor(message = 'Erreur événement IAM', code = 'GESTCRP_IAM_EVENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpIAMSessionError extends AppError {
  constructor(message = 'Erreur session IAM', code = 'GESTCRP_IAM_SESSION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpIAMAuthenticationError extends AppError {
  constructor(message = 'Erreur authentification IAM', code = 'GESTCRP_IAM_AUTHENTICATION', statusCode = 401) {
    super(message, code, statusCode);
  }
}

export class GestcrpIAMAuthorizationError extends AppError {
  constructor(message = 'Erreur autorisation IAM', code = 'GESTCRP_IAM_AUTHORIZATION', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GestcrpCredentialRotationError extends AppError {
  constructor(message = 'Erreur rotation credential', code = 'GESTCRP_CREDENTIAL_ROTATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpBiometricError extends AppError {
  constructor(message = 'Erreur biométrique', code = 'GESTCRP_BIOMETRIC', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── SOC Errors ────────────────────────────────────────────────────────────
export class GestcrpSOCIncidentError extends AppError {
  constructor(message = 'Erreur incident SOC', code = 'GESTCRP_SOC_INCIDENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSOCIndicatorError extends AppError {
  constructor(message = 'Erreur indicateur SOC', code = 'GESTCRP_SOC_INDICATOR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSOCAPTTActionError extends AppError {
  constructor(message = 'Erreur action APT SOC', code = 'GESTCRP_SOC_APT_ACTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSOCDashboardError extends AppError {
  constructor(message = 'Erreur dashboard SOC', code = 'GESTCRP_SOC_DASHBOARD', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSOCStatusError extends AppError {
  constructor(message = 'Erreur statut SOC', code = 'GESTCRP_SOC_STATUS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── SIEM Errors ──────────────────────────────────────────────────────────
export class GestcrpSIEMEventError extends AppError {
  constructor(message = 'Erreur événement SIEM', code = 'GESTCRP_SIEM_EVENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSIEMRuleError extends AppError {
  constructor(message = 'Erreur règle SIEM', code = 'GESTCRP_SIEM_RULE', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpSIEMCorrelationError extends AppError {
  constructor(message = 'Erreur corrélation SIEM', code = 'GESTCRP_SIEM_CORRELATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSIEMIngestionError extends AppError {
  constructor(message = 'Erreur ingestion SIEM', code = 'GESTCRP_SIEM_INGESTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSIEMDashboardError extends AppError {
  constructor(message = 'Erreur dashboard SIEM', code = 'GESTCRP_SIEM_DASHBOARD', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Threat Detection Errors ──────────────────────────────────────────────
export class GestcrpThreatIndicatorError extends AppError {
  constructor(message = 'Erreur indicateur menace', code = 'GESTCRP_THREAT_INDICATOR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpThreatFeedError extends AppError {
  constructor(message = 'Erreur flux menace', code = 'GESTCRP_THREAT_FEED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpThreatAnalysisError extends AppError {
  constructor(message = 'Erreur analyse menace', code = 'GESTCRP_THREAT_ANALYSIS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpThreatDetectionError extends AppError {
  constructor(message = 'Erreur détection menace', code = 'GESTCRP_THREAT_DETECTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpThreatIntelligenceError extends AppError {
  constructor(message = 'Erreur intelligence menace', code = 'GESTCRP_THREAT_INTELLIGENCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Application Security Errors ──────────────────────────────────────────
export class GestcrpAppScanError extends AppError {
  constructor(message = 'Erreur scan application', code = 'GESTCRP_APP_SCAN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpVulnerabilityError extends AppError {
  constructor(message = 'Erreur vulnérabilité', code = 'GESTCRP_VULNERABILITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpAPISecurityError extends AppError {
  constructor(message = 'Erreur sécurité API', code = 'GESTCRP_API_SECURITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpDependencyScanError extends AppError {
  constructor(message = 'Erreur scan dépendances', code = 'GESTCRP_DEPENDENCY_SCAN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Data Security & DLP Errors ──────────────────────────────────────────
export class GestcrpDLPPolicyError extends AppError {
  constructor(message = 'Erreur politique DLP', code = 'GESTCRP_DLP_POLICY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpDLPIncidentError extends AppError {
  constructor(message = 'Erreur incident DLP', code = 'GESTCRP_DLP_INCIDENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpEncryptionKeyError extends AppError {
  constructor(message = 'Erreur clé chiffrement', code = 'GESTCRP_ENCRYPTION_KEY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpDataRetentionPolicyError extends AppError {
  constructor(message = 'Erreur politique rétention données', code = 'GESTCRP_DATA_RETENTION', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpDataMaskingError extends AppError {
  constructor(message = 'Erreur masquage données', code = 'GESTCRP_DATA_MASKING', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Device & Endpoint Security Errors ────────────────────────────────────
export class GestcrpDeviceInventoryError extends AppError {
  constructor(message = 'Erreur inventaire appareil', code = 'GESTCRP_DEVICE_INVENTORY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpDeviceProtectionError extends AppError {
  constructor(message = 'Erreur protection appareil', code = 'GESTCRP_DEVICE_PROTECTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpDeviceComplianceError extends AppError {
  constructor(message = 'Erreur conformité appareil', code = 'GESTCRP_DEVICE_COMPLIANCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpMDMCommandError extends AppError {
  constructor(message = 'Erreur commande MDM', code = 'GESTCRP_MDM_COMMAND', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpEndpointProtectionError extends AppError {
  constructor(message = 'Erreur protection endpoint', code = 'GESTCRP_ENDPOINT_PROTECTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Security Automation & SOAR Errors ────────────────────────────────────
export class GestcrpSOARPlaybookError extends AppError {
  constructor(message = 'Erreur playbook SOAR', code = 'GESTCRP_SOAR_PLAYBOOK', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpSOARExecutionError extends AppError {
  constructor(message = 'Erreur exécution SOAR', code = 'GESTCRP_SOAR_EXECUTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSecurityMetricsError extends AppError {
  constructor(message = 'Erreur métriques sécurité', code = 'GESTCRP_SECURITY_METRICS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpSecurityDashboardError extends AppError {
  constructor(message = 'Erreur dashboard sécurité', code = 'GESTCRP_SECURITY_DASHBOARD', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Business Continuity & DR Errors ──────────────────────────────────────
export class GestcrpBCPPlanError extends AppError {
  constructor(message = 'Erreur plan BCP', code = 'GESTCRP_BCP_PLAN', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpRecoveryProcedureError extends AppError {
  constructor(message = 'Erreur procédure récupération', code = 'GESTCRP_RECOVERY_PROCEDURE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpBackupPolicyError extends AppError {
  constructor(message = 'Erreur politique backup', code = 'GESTCRP_BACKUP_POLICY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpBackupJobError extends AppError {
  constructor(message = 'Erreur job backup', code = 'GESTCRP_BACKUP_JOB', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpDRTestError extends AppError {
  constructor(message = 'Erreur test DR', code = 'GESTCRP_DR_TEST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Compliance & Governance Errors ───────────────────────────────────────
export class GestcrpComplianceAssessmentError extends AppError {
  constructor(message = 'Erreur évaluation conformité', code = 'GESTCRP_COMPLIANCE_ASSESSMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpGovernancePolicyError extends AppError {
  constructor(message = 'Erreur politique gouvernance', code = 'GESTCRP_GOVERNANCE_POLICY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpRiskRegisterError extends AppError {
  constructor(message = 'Erreur registre risques', code = 'GESTCRP_RISK_REGISTER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpAuditLogError extends AppError {
  constructor(message = 'Erreur journal audit', code = 'GESTCRP_AUDIT_LOG', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Cyber Digital Twin Errors ────────────────────────────────────────────
export class GestcrpDigitalTwinError extends AppError {
  constructor(message = 'Erreur jumeau numérique', code = 'GESTCRP_DIGITAL_TWIN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpTwinSimulationError extends AppError {
  constructor(message = 'Erreur simulation twin', code = 'GESTCRP_TWIN_SIMULATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpTwinResultError extends AppError {
  constructor(message = 'Erreur résultat twin', code = 'GESTCRP_TWIN_RESULT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GestcrpAttackScenarioError extends AppError {
  constructor(message = 'Erreur scénario attaque', code = 'GESTCRP_ATTACK_SCENARIO', statusCode = 400) {
    super(message, code, statusCode);
  }
}

// ─── Validation Errors ────────────────────────────────────────────────────
export class GestcrpValidationError extends AppError {
  constructor(message = 'Erreur validation données sécurité', code = 'GESTCRP_VALIDATION', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GestcrpNotFoundError extends AppError {
  constructor(resource = 'Ressource sécurité', code = 'GESTCRP_NOT_FOUND', statusCode = 404) {
    super(`${resource} introuvable`, code, statusCode);
  }
}

export class GestcrpPermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes', code = 'GESTCRP_PERMISSION', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GestcrpConflictError extends AppError {
  constructor(message = 'Conflit de données sécurité', code = 'GESTCRP_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GestcrpRateLimitError extends AppError {
  constructor(message = 'Limite de requêtes atteinte', code = 'GESTCRP_RATE_LIMIT', statusCode = 429) {
    super(message, code, statusCode);
  }
}

export class GestcrpNetworkError extends AppError {
  constructor(message = 'Erreur réseau sécurité', code = 'GESTCRP_NETWORK', statusCode = 503) {
    super(message, code, statusCode);
  }
}

export class GestcrpTimeoutError extends AppError {
  constructor(message = 'Délai dépassé opération sécurité', code = 'GESTCRP_TIMEOUT', statusCode = 504) {
    super(message, code, statusCode);
  }
}
