# Phase 4.7 — GESTCRP (Gestion de la Cyber-résilience et Protection)

## Overview

GESTCRP is EduCI's comprehensive cybersecurity risk management module. It provides a unified platform for managing an educational institution's entire security posture — from Zero Trust architecture and identity management to incident response, compliance governance, and cyber digital twin simulation.

The module implements 12 interconnected subsystems, each with dedicated repositories, services, validators, and hooks. All data is multi-tenant scoped via `school_id` and follows the Page → Hook → Service → Repository → Supabase architecture.

**Version:** 1.0
**Status:** Production Ready
**Phase:** 4.7

---

## Architecture

### Subsystems

| # | Subsystem | Description |
|---|-----------|-------------|
| 1 | **Zero Trust Architecture** | Policy-based access control with continuous verification across 6 zones (Identify, Verify, Enforce, Adapt, Sustain, Recover) |
| 2 | **Identity & Access Management (IAM)** | Authentication methods, session management, credential rotation, biometric enrollment, and identity provider integration |
| 3 | **Security Operations Center (SOC)** | Incident lifecycle management, indicator tracking, APT action execution, and SOC dashboard |
| 4 | **SIEM** | Security event ingestion, correlation rules, real-time monitoring, and event search |
| 5 | **Threat Detection & Intelligence** | Threat indicators, intelligence feeds (STIX/TAXII/MISP), analysis, and feed matching |
| 6 | **Application Security** | SAST/DAST/SCA scanning, vulnerability tracking, API security policies, and dependency scanning |
| 7 | **Data Security & DLP** | DLP policies, incident review, encryption key management, retention policies, and data masking |
| 8 | **Device & Endpoint Security** | Device inventory, compliance checks, MDM commands, and endpoint protection status |
| 9 | **Security Automation (SOAR)** | Playbook orchestration, automated execution, step-by-step workflow management |
| 10 | **Business Continuity & DR** | BCP plans, backup policies, backup jobs, DR test results |
| 11 | **Compliance & Governance** | Assessment frameworks, governance policies, risk register, audit logs |
| 12 | **Cyber Digital Twin** | Attack simulation, penetration testing, chaos engineering, and scenario-based defense evaluation |

### Data Flow

```
┌─────────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────────┐    ┌───────────┐
│   Page/UI   │───▶│   Hook   │───▶│   Service   │───▶│  Repository  │───▶│  Supabase │
└─────────────┘    └──────────┘    └─────────────┘    └──────────────┘    └───────────┘
                                          │
                                    BaseGestcrpService
                                    (validation, auth,
                                     audit, pagination)
```

### Multi-tenancy

Every database query includes `.eq("school_id", schoolId)`. RLS policies enforce tenant isolation at the database level. Cross-tenant access is blocked at the service layer via `validateOwnership()`.

---

## API Endpoints Reference

### 1. Zero Trust (10 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/zero-trust/policies` | List Zero Trust policies |
| GET | `/api/gestcrp/zero-trust/policies/:id` | Get policy by ID |
| POST | `/api/gestcrp/zero-trust/policies` | Create policy |
| PUT | `/api/gestcrp/zero-trust/policies/:id` | Update policy |
| DELETE | `/api/gestcrp/zero-trust/policies/:id` | Delete policy |
| GET | `/api/gestcrp/zero-trust/assessments` | List assessments |
| GET | `/api/gestcrp/zero-trust/assessments/:id` | Get assessment by ID |
| POST | `/api/gestcrp/zero-trust/assessments` | Create assessment |
| GET | `/api/gestcrp/zero-trust/contexts` | List contexts |
| POST | `/api/gestcrp/zero-trust/contexts` | Create context |

### 2. IAM (12 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/iam/policies` | List IAM policies |
| GET | `/api/gestcrp/iam/policies/:id` | Get policy by ID |
| POST | `/api/gestcrp/iam/policies` | Create IAM policy |
| PUT | `/api/gestcrp/iam/policies/:id` | Update policy |
| DELETE | `/api/gestcrp/iam/policies/:id` | Delete policy |
| GET | `/api/gestcrp/iam/events` | List IAM events |
| GET | `/api/gestcrp/iam/events/:id` | Get event by ID |
| POST | `/api/gestcrp/iam/events` | Create IAM event |
| GET | `/api/gestcrp/iam/sessions` | List sessions |
| POST | `/api/gestcrp/iam/sessions` | Create session |
| POST | `/api/gestcrp/iam/sessions/:id/invalidate` | Invalidate session |
| POST | `/api/gestcrp/iam/credential-rotations` | Create rotation policy |

### 3. SOC (10 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/soc/incidents` | List incidents |
| GET | `/api/gestcrp/soc/incidents/:id` | Get incident by ID |
| POST | `/api/gestcrp/soc/incidents` | Create incident |
| PUT | `/api/gestcrp/soc/incidents/:id` | Update incident |
| POST | `/api/gestcrp/soc/incidents/:id/close` | Close incident |
| POST | `/api/gestcrp/soc/incidents/:id/assign` | Assign incident |
| GET | `/api/gestcrp/soc/indicators` | List indicators |
| POST | `/api/gestcrp/soc/indicators` | Create indicator |
| GET | `/api/gestcrp/soc/apt-actions` | List APT actions |
| POST | `/api/gestcrp/soc/apt-actions` | Create APT action |

### 4. SIEM (10 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/siem/events` | List SIEM events |
| GET | `/api/gestcrp/siem/events/:id` | Get event by ID |
| POST | `/api/gestcrp/siem/events` | Ingest event |
| POST | `/api/gestcrp/siem/events/bulk` | Bulk ingest events |
| GET | `/api/gestcrp/siem/events/search` | Search events |
| GET | `/api/gestcrp/siem/rules` | List rules |
| POST | `/api/gestcrp/siem/rules` | Create rule |
| PUT | `/api/gestcrp/siem/rules/:id` | Update rule |
| DELETE | `/api/gestcrp/siem/rules/:id` | Delete rule |
| GET | `/api/gestcrp/siem/correlations` | List correlations |

### 5. Threat Detection (10 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/threats/indicators` | List indicators |
| GET | `/api/gestcrp/threats/indicators/:id` | Get indicator by ID |
| POST | `/api/gestcrp/threats/indicators` | Create indicator |
| PUT | `/api/gestcrp/threats/indicators/:id` | Update indicator |
| DELETE | `/api/gestcrp/threats/indicators/:id` | Delete indicator |
| GET | `/api/gestcrp/threats/feeds` | List feeds |
| POST | `/api/gestcrp/threats/feeds` | Create feed |
| PUT | `/api/gestcrp/threats/feeds/:id` | Update feed |
| GET | `/api/gestcrp/threats/analyses` | List analyses |
| POST | `/api/gestcrp/threats/analyses` | Create analysis |

### 6. Application Security (8 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/app-security/scans` | List scans |
| GET | `/api/gestcrp/app-security/scans/:id` | Get scan by ID |
| POST | `/api/gestcrp/app-security/scans` | Create scan |
| POST | `/api/gestcrp/app-security/scans/:id/start` | Start scan |
| POST | `/api/gestcrp/app-security/scans/:id/complete` | Complete scan |
| GET | `/api/gestcrp/app-security/vulnerabilities` | List vulnerabilities |
| POST | `/api/gestcrp/app-security/vulnerabilities` | Create vulnerability |
| PUT | `/api/gestcrp/app-security/api-policies` | Manage API security policies |

### 7. Data Security & DLP (8 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/data-security/dlp-policies` | List DLP policies |
| POST | `/api/gestcrp/data-security/dlp-policies` | Create DLP policy |
| GET | `/api/gestcrp/data-security/dlp-incidents` | List DLP incidents |
| POST | `/api/gestcrp/data-security/dlp-incidents` | Create DLP incident |
| POST | `/api/gestcrp/data-security/dlp-incidents/:id/review` | Review DLP incident |
| GET | `/api/gestcrp/data-security/encryption-keys` | List encryption keys |
| POST | `/api/gestcrp/data-security/encryption-keys` | Create encryption key |
| POST | `/api/gestcrp/data-security/encryption-keys/:id/rotate` | Rotate key |

### 8. Device Security (6 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/devices/inventory` | List devices |
| GET | `/api/gestcrp/devices/inventory/:id` | Get device by ID |
| POST | `/api/gestcrp/devices/inventory` | Register device |
| POST | `/api/gestcrp/devices/compliance` | Check device compliance |
| GET | `/api/gestcrp/devices/mdm-commands` | List MDM commands |
| POST | `/api/gestcrp/devices/mdm-commands` | Send MDM command |

### 9. SOAR (6 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/soar/playbooks` | List playbooks |
| POST | `/api/gestcrp/soar/playbooks` | Create playbook |
| PUT | `/api/gestcrp/soar/playbooks/:id` | Update playbook |
| GET | `/api/gestcrp/soar/executions` | List executions |
| POST | `/api/gestcrp/soar/playbooks/:id/execute` | Execute playbook |
| POST | `/api/gestcrp/soar/executions/:id/complete` | Complete execution |

### 10. BCP & DR (6 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/bcp/plans` | List BCP plans |
| POST | `/api/gestcrp/bcp/plans` | Create BCP plan |
| GET | `/api/gestcrp/bcp/backup-policies` | List backup policies |
| POST | `/api/gestcrp/bcp/backup-policies` | Create backup policy |
| GET | `/api/gestcrp/bcp/backup-jobs` | List backup jobs |
| POST | `/api/gestcrp/bcp/dr-test-results` | Record DR test result |

### 11. Compliance & Governance (8 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/compliance/assessments` | List assessments |
| POST | `/api/gestcrp/compliance/assessments` | Create assessment |
| GET | `/api/gestcrp/compliance/governance-policies` | List governance policies |
| POST | `/api/gestcrp/compliance/governance-policies` | Create governance policy |
| GET | `/api/gestcrp/compliance/risks` | List risks |
| POST | `/api/gestcrp/compliance/risks` | Create risk |
| GET | `/api/gestcrp/compliance/audit-logs` | List audit logs |
| POST | `/api/gestcrp/compliance/audit-logs` | Create audit log |

### 12. Cyber Digital Twin (7 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/cyber-twin/twins` | List digital twins |
| POST | `/api/gestcrp/cyber-twin/twins` | Create digital twin |
| POST | `/api/gestcrp/cyber-twin/twins/:id/start` | Start simulation |
| POST | `/api/gestcrp/cyber-twin/twins/:id/complete` | Complete simulation |
| GET | `/api/gestcrp/cyber-twin/results` | List results |
| POST | `/api/gestcrp/cyber-twin/results` | Create result |
| POST | `/api/gestcrp/cyber-twin/scenarios` | Create attack scenario |

### 13. Dashboard (2 routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gestcrp/dashboard` | Get aggregated security dashboard |
| GET | `/api/gestcrp/dashboard/score` | Get security score with breakdown |

**Total: 103 routes**

---

## Configuration

Configuration is centralized in `packages/config/src/phase4-7-gestcrp.ts`.

### Zero Trust

| Key | Default | Description |
|-----|---------|-------------|
| `enabled` | `true` | Enable/disable Zero Trust evaluation |
| `defaultZone` | `IDENTIFY` | Default zone for new policies |
| `evaluationInterval` | `300` | Seconds between evaluations |
| `riskThresholds.low` | `30` | Risk score below which context is LOW |
| `riskThresholds.medium` | `60` | Risk score for MEDIUM context |
| `riskThresholds.high` | `80` | Risk score for HIGH context |
| `riskThresholds.critical` | `90` | Risk score for CRITICAL context |
| `enforcementModes.STRICT.blockOnFailure` | `true` | Block on evaluation failure |
| `enforcementModes.MODERATE.blockOnFailure` | `false` | Advisory on failure |
| `enforcementModes.ADVISORY.logAllDecisions` | `false` | No logging for advisory |

### IAM

| Key | Default | Description |
|-----|---------|-------------|
| `maxSessionsPerUser` | `5` | Max concurrent sessions |
| `sessionTimeout` | `3600` | Session timeout in seconds |
| `refreshTokenExpiry` | `86400` | Refresh token lifetime |
| `maxLoginAttempts` | `5` | Lockout threshold |
| `lockoutDuration` | `1800` | Lockout duration in seconds |
| `passwordPolicy.minLength` | `12` | Minimum password length |
| `passwordPolicy.maxAge` | `90` | Password expiration days |

### SOC

| Key | Default | Description |
|-----|---------|-------------|
| `retentionDays` | `365` | Incident retention period |
| `maxIncidentsPerPage` | `50` | Pagination limit |
| `severityWeights.EMERGENCY` | `25` | Weight for emergency severity |
| `responseTimes.CRITICAL.detect` | `300` | Max detection time for CRITICAL |

### SIEM

| Key | Default | Description |
|-----|---------|-------------|
| `maxEventsPerSecond` | `10000` | Ingestion rate limit |
| `retentionDays` | `90` | Event retention |
| `batchSize` | `1000` | Bulk ingestion batch size |
| `correlationWindow` | `300` | Correlation time window |

### Threat Detection

| Key | Default | Description |
|-----|---------|-------------|
| `maxIndicators` | `100000` | Max indicators per school |
| `feedRefreshInterval` | `3600` | Feed sync interval |
| `indicatorExpiryDays` | `90` | Indicator auto-expiry |
| `autoBlockThreshold` | `85` | Auto-block confidence threshold |

### Data Security

| Key | Default | Description |
|-----|---------|-------------|
| `encryption.keySize` | `256` | Default AES key size |
| `encryption.keyRotationDays` | `90` | Key rotation interval |
| `maxPolicies` | `100` | Max DLP policies |

### Device Security

| Key | Default | Description |
|-----|---------|-------------|
| `maxDevices` | `10000` | Max devices per school |
| `complianceCheckInterval` | `3600` | Seconds between compliance checks |
| `mdm.maxCommands` | `100` | Max queued MDM commands |

### SOAR

| Key | Default | Description |
|-----|---------|-------------|
| `maxPlaybooks` | `100` | Max playbooks per school |
| `executionTimeout` | `3600` | Max execution duration |
| `maxStepsPerPlaybook` | `50` | Step limit |

### BCP

| Key | Default | Description |
|-----|---------|-------------|
| `testingFrequency` | `QUARTERLY` | Default testing frequency |
| `backup.maxConcurrentJobs` | `5` | Max parallel backup jobs |

---

## Error Codes

All errors extend `AppError` from `@educi/errors`.

| Code | Class | HTTP | Description |
|------|-------|------|-------------|
| `GESTCRP_ZERO_TRUST_POLICY` | `GestcrpZeroTrustPolicyError` | 400 | Zero Trust policy error |
| `GESTCRP_ZERO_TRUST_EVALUATION` | `GestcrpZeroTrustEvaluationError` | 500 | Zero Trust evaluation failure |
| `GESTCRP_ZERO_TRUST_ASSESSMENT` | `GestcrpZeroTrustAssessmentError` | 500 | Zero Trust assessment failure |
| `GESTCRP_ZERO_TRUST_ZONE` | `GestcrpZeroTrustZoneError` | 400 | Zero Trust zone error |
| `GESTCRP_ZERO_TRUST_CONTEXT` | `GestcrpZeroTrustContextError` | 500 | Zero Trust context error |
| `GESTCRP_IAM_POLICY` | `GestcrpIAMPolicyError` | 400 | IAM policy error |
| `GESTCRP_IAM_EVENT` | `GestcrpIAMEventError` | 500 | IAM event error |
| `GESTCRP_IAM_SESSION` | `GestcrpIAMSessionError` | 500 | IAM session error |
| `GESTCRP_IAM_AUTHENTICATION` | `GestcrpIAMAuthenticationError` | 401 | Authentication failure |
| `GESTCRP_IAM_AUTHORIZATION` | `GestcrpIAMAuthorizationError` | 403 | Authorization failure |
| `GESTCRP_CREDENTIAL_ROTATION` | `GestcrpCredentialRotationError` | 500 | Credential rotation error |
| `GESTCRP_BIOMETRIC` | `GestcrpBiometricError` | 500 | Biometric credential error |
| `GESTCRP_SOC_INCIDENT` | `GestcrpSOCIncidentError` | 500 | SOC incident error |
| `GESTCRP_SOC_INDICATOR` | `GestcrpSOCIndicatorError` | 500 | SOC indicator error |
| `GESTCRP_SOC_APT_ACTION` | `GestcrpSOCAPTTActionError` | 500 | APT action error |
| `GESTCRP_SOC_DASHBOARD` | `GestcrpSOCDashboardError` | 500 | SOC dashboard error |
| `GESTCRP_SOC_STATUS` | `GestcrpSOCStatusError` | 500 | SOC status error |
| `GESTCRP_SIEM_EVENT` | `GestcrpSIEMEventError` | 500 | SIEM event error |
| `GESTCRP_SIEM_RULE` | `GestcrpSIEMRuleError` | 400 | SIEM rule error |
| `GESTCRP_SIEM_CORRELATION` | `GestcrpSIEMCorrelationError` | 500 | SIEM correlation error |
| `GESTCRP_SIEM_INGESTION` | `GestcrpSIEMIngestionError` | 500 | SIEM ingestion error |
| `GESTCRP_SIEM_DASHBOARD` | `GestcrpSIEMDashboardError` | 500 | SIEM dashboard error |
| `GESTCRP_THREAT_INDICATOR` | `GestcrpThreatIndicatorError` | 500 | Threat indicator error |
| `GESTCRP_THREAT_FEED` | `GestcrpThreatFeedError` | 500 | Threat feed error |
| `GESTCRP_THREAT_ANALYSIS` | `GestcrpThreatAnalysisError` | 500 | Threat analysis error |
| `GESTCRP_THREAT_DETECTION` | `GestcrpThreatDetectionError` | 500 | Threat detection error |
| `GESTCRP_THREAT_INTELLIGENCE` | `GestcrpThreatIntelligenceError` | 500 | Threat intelligence error |
| `GESTCRP_APP_SCAN` | `GestcrpAppScanError` | 500 | Application scan error |
| `GESTCRP_VULNERABILITY` | `GestcrpVulnerabilityError` | 500 | Vulnerability error |
| `GESTCRP_API_SECURITY` | `GestcrpAPISecurityError` | 500 | API security error |
| `GESTCRP_DEPENDENCY_SCAN` | `GestcrpDependencyScanError` | 500 | Dependency scan error |
| `GESTCRP_DLP_POLICY` | `GestcrpDLPPolicyError` | 400 | DLP policy error |
| `GESTCRP_DLP_INCIDENT` | `GestcrpDLPIncidentError` | 500 | DLP incident error |
| `GESTCRP_ENCRYPTION_KEY` | `GestcrpEncryptionKeyError` | 500 | Encryption key error |
| `GESTCRP_DATA_RETENTION` | `GestcrpDataRetentionPolicyError` | 400 | Retention policy error |
| `GESTCRP_DATA_MASKING` | `GestcrpDataMaskingError` | 500 | Data masking error |
| `GESTCRP_DEVICE_INVENTORY` | `GestcrpDeviceInventoryError` | 500 | Device inventory error |
| `GESTCRP_DEVICE_PROTECTION` | `GestcrpDeviceProtectionError` | 500 | Device protection error |
| `GESTCRP_DEVICE_COMPLIANCE` | `GestcrpDeviceComplianceError` | 500 | Device compliance error |
| `GESTCRP_MDM_COMMAND` | `GestcrpMDMCommandError` | 500 | MDM command error |
| `GESTCRP_ENDPOINT_PROTECTION` | `GestcrpEndpointProtectionError` | 500 | Endpoint protection error |
| `GESTCRP_SOAR_PLAYBOOK` | `GestcrpSOARPlaybookError` | 400 | SOAR playbook error |
| `GESTCRP_SOAR_EXECUTION` | `GestcrpSOARExecutionError` | 500 | SOAR execution error |
| `GESTCRP_SECURITY_METRICS` | `GestcrpSecurityMetricsError` | 500 | Security metrics error |
| `GESTCRP_SECURITY_DASHBOARD` | `GestcrpSecurityDashboardError` | 500 | Security dashboard error |
| `GESTCRP_BCP_PLAN` | `GestcrpBCPPlanError` | 400 | BCP plan error |
| `GESTCRP_RECOVERY_PROCEDURE` | `GestcrpRecoveryProcedureError` | 500 | Recovery procedure error |
| `GESTCRP_BACKUP_POLICY` | `GestcrpBackupPolicyError` | 400 | Backup policy error |
| `GESTCRP_BACKUP_JOB` | `GestcrpBackupJobError` | 500 | Backup job error |
| `GESTCRP_DR_TEST` | `GestcrpDRTestError` | 500 | DR test error |
| `GESTCRP_COMPLIANCE_ASSESSMENT` | `GestcrpComplianceAssessmentError` | 500 | Compliance assessment error |
| `GESTCRP_GOVERNANCE_POLICY` | `GestcrpGovernancePolicyError` | 400 | Governance policy error |
| `GESTCRP_RISK_REGISTER` | `GestcrpRiskRegisterError` | 500 | Risk register error |
| `GESTCRP_AUDIT_LOG` | `GestcrpAuditLogError` | 500 | Audit log error |
| `GESTCRP_DIGITAL_TWIN` | `GestcrpDigitalTwinError` | 500 | Digital twin error |
| `GESTCRP_TWIN_SIMULATION` | `GestcrpTwinSimulationError` | 500 | Twin simulation error |
| `GESTCRP_TWIN_RESULT` | `GestcrpTwinResultError` | 500 | Twin result error |
| `GESTCRP_ATTACK_SCENARIO` | `GestcrpAttackScenarioError` | 400 | Attack scenario error |
| `GESTCRP_VALIDATION` | `GestcrpValidationError` | 400 | Validation error |
| `GESTCRP_NOT_FOUND` | `GestcrpNotFoundError` | 404 | Resource not found |
| `GESTCRP_PERMISSION` | `GestcrpPermissionError` | 403 | Permission denied |
| `GESTCRP_CONFLICT` | `GestcrpConflictError` | 409 | Data conflict |
| `GESTCRP_RATE_LIMIT` | `GestcrpRateLimitError` | 429 | Rate limit exceeded |
| `GESTCRP_NETWORK` | `GestcrpNetworkError` | 503 | Network error |
| `GESTCRP_TIMEOUT` | `GestcrpTimeoutError` | 504 | Operation timeout |

---

## File Structure

```
packages/
  types/src/phase4-7-gestcrp.ts       # Zod schemas, enums, TypeScript interfaces
  errors/src/phase4-7-gestcrp.ts      # Error classes
  config/src/phase4-7-gestcrp.ts      # Configuration constants

web/src/features/gestcrp/
  repositories/
    base-gestcrp-repository.ts        # Generic CRUD repository
    zero-trust-repository.ts
    iam-repository.ts
    soc-repository.ts
    siem-repository.ts
    threat-repository.ts
    app-security-repository.ts
    data-security-repository.ts
    device-repository.ts
    soar-repository.ts
    bcp-repository.ts
    compliance-repository.ts
    cyber-twin-repository.ts
    index.ts

  services/
    base-gestcrp-service.ts           # Base service with validation/auth
    zero-trust-service.ts
    iam-service.ts
    soc-service.ts
    siem-service.ts
    threat-detection-service.ts
    app-security-service.ts
    data-security-service.ts
    device-security-service.ts
    soar-service.ts
    bcp-service.ts
    compliance-service.ts
    cyber-twin-service.ts
    security-dashboard-service.ts     # Aggregated dashboard
    index.ts
    __tests__/                        # Unit tests per service

  validators/
    zero-trust.ts
    iam.ts
    soc.ts
    siem.ts
    threat-detection.ts
    app-security.ts
    data-security.ts
    device-security.ts
    soar.ts
    bcp.ts
    compliance.ts
    cyber-twin.ts
    index.ts

  hooks/
    use-zero-trust.ts
    use-iam.ts
    use-soc.ts
    use-siem.ts
    use-threat-detection.ts
    use-app-security.ts
    use-data-security.ts
    use-device-security.ts
    use-soar.ts
    use-bcp.ts
    use-compliance.ts
    use-cyber-twin.ts
    use-security-dashboard.ts
    index.ts

web/src/app/mobile/gestcrp/
  index.tsx                           # Dashboard overview
  zero-trust/index.tsx, [id].tsx
  iam/index.tsx, [id].tsx
  soc/index.tsx, [id].tsx
  threats/index.tsx, [id].tsx
  app-security/index.tsx
  data-security/index.tsx
  devices/index.tsx
  compliance/index.tsx
  bcp/index.tsx
  cyber-twin/index.tsx
```

---

## Deployment Notes

1. **Database migrations** must be run before deploying. All tables require `school_id` columns, RLS policies, and appropriate indexes.
2. **RLS policies** must be created for every table. Never rely on RLS alone — always add `school_id` filtering in queries.
3. **Encryption keys** should be backed up to a separate vault. Never store unencrypted private keys in the database.
4. **SIEM event ingestion** rate is limited to 10,000 events/second per school. Configure `maxEventsPerSecond` based on infrastructure capacity.
5. **SOAR playbook execution** has a default timeout of 3,600 seconds. Long-running playbooks should use step-level timeouts.
6. **BCP backup jobs** are limited to 5 concurrent jobs per school. Adjust `maxConcurrentJobs` based on storage throughput.
7. **Threat intelligence feeds** sync every 3,600 seconds. Ensure outbound HTTP access to configured feed URLs.
8. **Digital twin simulations** are limited to 3 concurrent per school and timeout after 7,200 seconds.
9. All services extend `BaseGestcrpService` which provides validation, ownership checks, and pagination defaults (max 200 per page).
10. The `SecurityDashboardService` aggregates data from all 12 subsystems using `Promise.allSettled` — it tolerates partial failures (up to 6 of 12 services can fail).
