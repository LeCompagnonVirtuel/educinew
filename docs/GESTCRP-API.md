# GESTCRP — API Reference

## Authentication & Authorization

All GESTCRP API endpoints require:

1. **Valid Supabase JWT** in the `Authorization: Bearer <token>` header
2. **Valid `school_id`** — either from the JWT claims or passed as a query/body parameter
3. **RBAC permissions** — the user must have a role authorized for the requested operation

### Roles with GESTCRP Access

| Role | Access Level |
|------|-------------|
| `SUPER_ADMIN` | Full access across all schools |
| `ADMIN` | Full access for their school |
| `DIRECTEUR` | Read access to dashboards, compliance, and reports |
| `COMPTABLE` | Read access to compliance and audit logs |
| `ENSEIGNANT` | Limited read access to security awareness |

### Request Headers

```
Authorization: Bearer <supabase_jwt>
Content-Type: application/json
X-School-Id: <school_id>   // Optional if school_id is in JWT
```

---

## Pagination

All list endpoints support pagination via query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `offset` | number | `0` | Number of records to skip |
| `limit` | number | `50` | Max records per page (max: 200) |

### Response Format

```json
{
  "data": [...],
  "total": 150,
  "offset": 0,
  "limit": 50
}
```

---

## Filtering

List endpoints support filtering via query parameters:

```
GET /api/gestcrp/soc/incidents?severity=CRITICAL&status=NEW
GET /api/gestcrp/threats/indicators?category=MALWARE&type=IP
```

Filter keys are validated and sanitized — empty or undefined values are ignored.

---

## Error Response Format

```json
{
  "error": {
    "code": "GESTCRP_SOC_INCIDENT",
    "message": "Erreur incident SOC",
    "statusCode": 500,
    "details": {}
  }
}
```

---

## Zero Trust Endpoints

### List Policies

```
GET /api/gestcrp/zero-trust/policies
```

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `offset` | number | Pagination offset |
| `limit` | number | Page size |
| `enabled` | boolean | Filter by enabled status |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "school_id": "uuid",
      "name": "Default Zero Trust Policy",
      "description": "Enforces verification for all access",
      "enabled": true,
      "priority": 500,
      "zones": ["IDENTIFY", "VERIFY", "ENFORCE"],
      "conditions": [
        {
          "field": "device.trust_level",
          "operator": "EQUALS",
          "value": "TRUSTED",
          "negate": false
        }
      ],
      "actions": [
        {
          "type": "ALLOW",
          "parameters": {},
          "timeout": 300,
          "fallback": "DENY"
        }
      ],
      "enforcement_mode": "STRICT",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "offset": 0,
  "limit": 50
}
```

### Create Policy

```
POST /api/gestcrp/zero-trust/policies
```

**Request Body:**

```json
{
  "name": "Staff Access Policy",
  "description": "Controls access for teaching staff",
  "enabled": true,
  "priority": 500,
  "zones": ["IDENTIFY", "VERIFY"],
  "conditions": [
    {
      "field": "identity.verification_level",
      "operator": "IN",
      "value": ["STANDARD", "ELEVATED"],
      "negate": false
    }
  ],
  "actions": [
    {
      "type": "ALLOW",
      "parameters": {},
      "timeout": 300,
      "fallback": "CHALLENGE"
    }
  ],
  "enforcement_mode": "STRICT"
}
```

### Create Assessment

```
POST /api/gestcrp/zero-trust/assessments
```

**Request Body:**

```json
{
  "subject_type": "USER",
  "subject_id": "uuid",
  "decision": "ALLOW",
  "confidence": 95,
  "risk_score": 15,
  "risk_factors": ["known_device", "valid_mfa"],
  "policies_evaluated": ["policy-uuid-1"],
  "enforcement_actions": [],
  "expires_at": "2026-01-02T00:00:00Z"
}
```

---

## IAM Endpoints

### List IAM Events

```
GET /api/gestcrp/iam/events
```

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "school_id": "uuid",
      "user_id": "uuid",
      "event_type": "LOGIN_SUCCESS",
      "auth_method": "PASSWORD",
      "identity_provider": "INTERNAL",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "success": true,
      "risk_score": 5,
      "risk_factors": [],
      "metadata": {},
      "timestamp": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "offset": 0,
  "limit": 50
}
```

### Create Session

```
POST /api/gestcrp/iam/sessions
```

**Request Body:**

```json
{
  "user_id": "uuid",
  "token_hash": "sha256_hash",
  "auth_method": "PASSWORD",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "expires_at": "2026-01-01T01:00:00Z"
}
```

### Enroll Biometric

```
POST /api/gestcrp/iam/biometric-credentials
```

**Request Body:**

```json
{
  "user_id": "uuid",
  "type": "FINGERPRINT",
  "template_hash": "base64_template_hash",
  "salt": "random_salt",
  "algorithm": "SHA-256"
}
```

---

## SOC Endpoints

### Create Incident

```
POST /api/gestcrp/soc/incidents
```

**Request Body:**

```json
{
  "title": "Suspicious login from foreign IP",
  "description": "Multiple failed login attempts detected from IP 203.0.113.42",
  "severity": "HIGH",
  "category": "ACCOUNT_COMPROMISE",
  "source": "SIEM Alert #1234",
  "affected_systems": ["auth-service", "user-api"],
  "affected_users": ["uuid-user-1"],
  "indicators": [
    {
      "type": "IP",
      "value": "203.0.113.42",
      "confidence": 85,
      "severity": "HIGH",
      "source": "Threat Intelligence",
      "tags": ["brute-force", "foreign"]
    }
  ],
  "risk_score": 75,
  "estimated_impact": 60
}
```

### Close Incident

```
POST /api/gestcrp/soc/incidents/:id/close
```

**Request Body:**

```json
{
  "root_cause": "Compromised credentials from phishing campaign",
  "remediation": "Force password reset for affected users, blocked source IP",
  "lessons_learned": "Implement MFA for all admin accounts",
  "closed_by": "uuid-admin"
}
```

### Create APT Action

```
POST /api/gestcrp/soc/apt-actions
```

**Request Body:**

```json
{
  "incident_id": "uuid-incident",
  "action": "BLOCK_IP",
  "parameters": {
    "ip_address": "203.0.113.42",
    "duration": 86400
  },
  "executed_by": "uuid-admin"
}
```

---

## SIEM Endpoints

### Ingest Event

```
POST /api/gestcrp/siem/events
```

**Request Body:**

```json
{
  "source": "nginx-access-log",
  "event_type": "NETWORK",
  "severity": "HIGH",
  "message": "Suspicious request pattern detected",
  "raw_log": "203.0.113.42 - - [01/Jan/2026:00:00:00] \"GET /admin HTTP/1.1\" 403",
  "parsed_fields": {
    "status_code": 403,
    "path": "/admin",
    "method": "GET"
  },
  "user": "unknown",
  "ip_address": "203.0.113.42",
  "tags": ["suspicious", "admin-access"]
}
```

### Bulk Ingest Events

```
POST /api/gestcrp/siem/events/bulk
```

**Request Body:**

```json
{
  "events": [
    { "source": "firewall", "event_type": "NETWORK", "severity": "MEDIUM", "message": "...", "raw_log": "..." },
    { "source": "ids", "event_type": "THREAT", "severity": "HIGH", "message": "...", "raw_log": "..." }
  ]
}
```

**Response:**

```json
{
  "ingested": 1,
  "errors": [
    { "index": 1, "message": "source est requis" }
  ]
}
```

### Create SIEM Rule

```
POST /api/gestcrp/siem/rules
```

**Request Body:**

```json
{
  "name": "Brute Force Detection",
  "description": "Detects more than 5 failed logins in 5 minutes",
  "enabled": true,
  "severity": "HIGH",
  "event_type": "AUTH",
  "conditions": [
    {
      "field": "event_type",
      "operator": "EQUALS",
      "value": "LOGIN_FAILURE",
      "timeframe": 300,
      "count": 5
    }
  ],
  "actions": [
    {
      "type": "ALERT",
      "parameters": { "channel": "email" }
    },
    {
      "type": "BLOCK",
      "parameters": { "duration": 1800 }
    }
  ],
  "suppression_window": 300
}
```

---

## Threat Detection Endpoints

### Create Threat Indicator

```
POST /api/gestcrp/threats/indicators
```

**Request Body:**

```json
{
  "type": "IP",
  "value": "198.51.100.0/24",
  "confidence": 90,
  "severity": "CRITICAL",
  "category": "MALWARE",
  "source": "Internal SOC Analysis",
  "tags": ["c2-server", "apt28"],
  "description": "Known C2 infrastructure for APT28",
  "mitre_attack_ids": ["T1071", "T1573"]
}
```

### Create Threat Feed

```
POST /api/gestcrp/threats/feeds
```

**Request Body:**

```json
{
  "name": "AlienVault OTX",
  "url": "https://otx.alienvault.com/api/v1/pulses/subscribed",
  "feed_type": "STIX",
  "format": "application/stix+json",
  "refresh_interval_minutes": 60,
  "enabled": true,
  "reliability": 85
}
```

---

## Application Security Endpoints

### Create Scan

```
POST /api/gestcrp/app-security/scans
```

**Request Body:**

```json
{
  "scan_type": "SAST",
  "target": "https://github.com/educi/web",
  "scanner": "Semgrep",
  "version": "1.45.0",
  "triggered_by": "uuid-admin"
}
```

### Create Vulnerability

```
POST /api/gestcrp/app-security/vulnerabilities
```

**Request Body:**

```json
{
  "scan_id": "uuid-scan",
  "title": "SQL Injection in user search",
  "description": "Unsanitized input in user search endpoint",
  "severity": "CRITICAL",
  "category": "INJECTION",
  "cwe_id": "CWE-89",
  "cve_id": "CVE-2026-0001",
  "cvss_score": 9.8,
  "affected_component": "user-api",
  "affected_file": "src/api/users/search.ts",
  "affected_line": 42,
  "evidence": "POST /api/users/search with payload: ' OR 1=1 --",
  "recommendation": "Use parameterized queries",
  "exploit_available": true,
  "patch_available": false
}
```

---

## Data Security Endpoints

### Create DLP Policy

```
POST /api/gestcrp/data-security/dlp-policies
```

**Request Body:**

```json
{
  "name": "Student PII Protection",
  "description": "Prevents unauthorized export of student personal data",
  "enabled": true,
  "policy_type": "PATTERN_MATCHING",
  "data_classification": ["CONFIDENTIAL", "RESTRICTED"],
  "patterns": [
    {
      "name": "Student ID Pattern",
      "type": "REGEX",
      "pattern": "STU-\\d{8}",
      "confidence": 95,
      "description": "Matches student ID format"
    }
  ],
  "actions": ["BLOCK", "NOTIFY", "LOG"],
  "severity": "HIGH",
  "notification_channels": ["email", "slack"],
  "applies_to": "TRANSFER"
}
```

### Create Encryption Key

```
POST /api/gestcrp/data-security/encryption-keys
```

**Request Body:**

```json
{
  "name": "student-data-primary",
  "algorithm": "AES-256-GCM",
  "size": 256,
  "purpose": "ENCRYPTION",
  "fingerprint": "sha256_fingerprint",
  "encrypted_private_key": "base64_encrypted_key"
}
```

---

## Device Security Endpoints

### Register Device

```
POST /api/gestcrp/devices/inventory
```

**Request Body:**

```json
{
  "name": "Admin Laptop",
  "hostname": "admin-laptop-01",
  "platform": "WINDOWS",
  "os_version": "Windows 11 23H2",
  "serial_number": "SN12345678",
  "mac_address": "AA:BB:CC:DD:EE:FF",
  "ip_address": "192.168.1.100",
  "owner": "uuid-admin",
  "department": "Administration",
  "tags": ["admin", "managed"]
}
```

### Send MDM Command

```
POST /api/gestcrp/devices/mdm-commands
```

**Request Body:**

```json
{
  "device_id": "uuid-device",
  "command": "ENCRYPT",
  "parameters": {
    "algorithm": "AES-256",
    "scope": "full_disk"
  }
}
```

---

## SOAR Endpoints

### Create Playbook

```
POST /api/gestcrp/soar/playbooks
```

**Request Body:**

```json
{
  "name": "Auto-Respond: Brute Force",
  "description": "Automatically blocks IP after 10 failed login attempts",
  "enabled": true,
  "trigger": "INCIDENT_CREATED",
  "conditions": [
    { "field": "category", "operator": "EQUALS", "value": "ACCOUNT_COMPROMISE" }
  ],
  "steps": [
    {
      "id": "step-1",
      "name": "Block Source IP",
      "type": "ACTION",
      "action": "BLOCK_IP",
      "parameters": { "duration": 86400 },
      "timeout": 30,
      "retryCount": 3
    },
    {
      "id": "step-2",
      "name": "Notify Admin",
      "type": "ACTION",
      "action": "NOTIFY_ADMIN",
      "parameters": { "channel": "email", "priority": "high" },
      "timeout": 10,
      "retryCount": 1
    }
  ]
}
```

### Execute Playbook

```
POST /api/gestcrp/soar/playbooks/:id/execute
```

**Request Body:**

```json
{
  "trigger": "INCIDENT_CREATED",
  "triggered_by": "uuid-system",
  "initial_data": {
    "incident_id": "uuid-incident",
    "source_ip": "203.0.113.42"
  }
}
```

---

## BCP & DR Endpoints

### Create BCP Plan

```
POST /api/gestcrp/bcp/plans
```

**Request Body:**

```json
{
  "name": "Critical Systems Recovery Plan",
  "description": "Recovery procedures for critical educational systems",
  "scope": "Student information system, LMS, grade management",
  "objectives": [
    "Restore SIS within 4 hours",
    "Restore LMS within 2 hours",
    "Zero data loss for grade records"
  ],
  "critical_functions": [
    {
      "name": "Student Information System",
      "description": "Core student data management",
      "importance": "CRITICAL",
      "maxTolerableDowntime": 14400,
      "recoveryTimeObjective": 3600,
      "recoveryPointObjective": 0,
      "dependencies": ["database", "auth-service"],
      "resources": ["db-server-01", "app-server-01"],
      "owner": "uuid-admin"
    }
  ]
}
```

### Create Backup Policy

```
POST /api/gestcrp/bcp/backup-policies
```

**Request Body:**

```json
{
  "name": "Daily Database Backup",
  "description": "Full backup of all databases daily",
  "backup_type": "FULL",
  "schedule": "0 2 * * *",
  "retention_days": 90,
  "target_location": "CLOUD",
  "sources": ["database", "uploads", "config"],
  "encryption_enabled": true,
  "verify_after_backup": true
}
```

---

## Compliance & Governance Endpoints

### Create Compliance Assessment

```
POST /api/gestcrp/compliance/assessments
```

**Request Body:**

```json
{
  "standard": "ISO_27001",
  "name": "Annual ISO 27001 Assessment",
  "description": "2026 annual compliance assessment",
  "scope": "All school IT systems and data processing",
  "assessor": "uuid-admin",
  "valid_until": "2027-01-01T00:00:00Z",
  "requirements": [
    {
      "section": "A.9.1",
      "description": "Access control policy",
      "riskLevel": "HIGH"
    }
  ]
}
```

### Create Governance Policy

```
POST /api/gestcrp/compliance/governance-policies
```

**Request Body:**

```json
{
  "name": "Data Classification Policy",
  "description": "Defines data classification levels and handling procedures",
  "category": "DATA_GOVERNANCE",
  "version": "1.0",
  "owner": "uuid-admin",
  "effective_date": "2026-01-01T00:00:00Z",
  "review_date": "2026-07-01T00:00:00Z",
  "applicable_roles": ["ADMIN", "COMPTABLE", "SECRETAIRE"],
  "applicable_data": ["CONFIDENTIAL", "RESTRICTED"],
  "tags": ["data-governance", "classification"]
}
```

### Create Risk

```
POST /api/gestcrp/compliance/risks
```

**Request Body:**

```json
{
  "name": "Data breach via phishing",
  "description": "Risk of student data exposure through phishing attacks",
  "category": "CYBERSECURITY",
  "likelihood": 4,
  "impact": 5,
  "owner": "uuid-admin",
  "controls": ["MFA", "Security Awareness Training", "Email Filtering"],
  "treatment_plan": "Implement MFA for all staff, quarterly security training"
}
```

---

## Cyber Digital Twin Endpoints

### Create Digital Twin

```
POST /api/gestcrp/cyber-twin/twins
```

**Request Body:**

```json
{
  "name": "Network Penetration Test Q1 2026",
  "description": "Quarterly penetration test of school network",
  "simulation_type": "PENETRATION_TEST",
  "scope": "External-facing services and internal network",
  "created_by": "uuid-admin",
  "environment": {
    "network": {
      "segments": ["PUBLIC", "INTERNAL"],
      "firewallRules": ["allow-http", "allow-https"],
      "openPorts": [80, 443, 8080]
    },
    "systems": [
      {
        "type": "web-server",
        "version": "nginx/1.24",
        "configuration": {},
        "vulnerabilities": []
      }
    ],
    "users": [
      {
        "roles": ["admin", "teacher", "student"],
        "count": 500,
        "behaviorProfile": "normal",
        "accessLevel": "mixed"
      }
    ],
    "data": [
      {
        "classification": ["CONFIDENTIAL", "RESTRICTED"],
        "volume": 10000,
        "sensitivity": "high"
      }
    ]
  },
  "attackScenarios": [
    {
      "name": "SQL Injection Attack",
      "description": "Attempt SQL injection on student search API",
      "technique": "SQL Injection",
      "mitreAttackId": "T1190",
      "severity": "CRITICAL",
      "target": "student-api",
      "expectedDuration": 300,
      "steps": [
        {
          "order": 1,
          "action": "Send malicious payload to search endpoint",
          "parameters": { "payload": "' OR 1=1 --" },
          "expectedOutcome": "Database returns all records",
          "timeout": 30
        }
      ],
      "successCriteria": ["Data exfiltration achieved"],
      "rollbackPlan": "Restore database from backup"
    }
  ]
}
```

### Create Attack Scenario

```
POST /api/gestcrp/cyber-twin/scenarios
```

**Request Body:**

```json
{
  "twin_id": "uuid-twin",
  "name": "Phishing Campaign",
  "description": "Simulated phishing targeting staff credentials",
  "technique": "Spear Phishing",
  "mitre_attack_id": "T1566",
  "severity": "HIGH",
  "target": "staff-email",
  "expected_duration": 600,
  "steps": [
    {
      "order": 1,
      "action": "Send phishing email to 10 staff members",
      "parameters": { "template": "password-reset" },
      "expectedOutcome": "At least 2 staff click link",
      "timeout": 300
    }
  ],
  "success_criteria": ["Credential harvesting successful"],
  "rollback_plan": "Notify affected staff, force password reset"
}
```

---

## Dashboard Endpoints

### Get Security Dashboard

```
GET /api/gestcrp/dashboard
```

**Response:**

```json
{
  "overview": {
    "overallScore": 87,
    "riskLevel": "LOW",
    "openIncidents": 2,
    "activeThreats": 12,
    "complianceRate": 94.5,
    "deviceComplianceRate": 96.2
  },
  "zeroTrust": { "totalPolicies": 5, "activePolicies": 4, "averageRiskScore": 15 },
  "soc": { "openIncidents": 2, "criticalIncidents": 0, "averageResolutionTime": 0 },
  "siem": { "totalEvents": 15000, "highSeverityEvents": 23, "activeRules": 12 },
  "threats": { "totalIndicators": 45, "activeFeeds": 3, "averageConfidence": 82 },
  "appSecurity": { "totalVulnerabilities": 8, "criticalVulnerabilities": 1, "openVulnerabilities": 5 },
  "dataSecurity": { "activeDLPPolicies": 4, "unreviewedIncidents": 3, "activeEncryptionKeys": 2 },
  "devices": { "totalDevices": 120, "onlineDevices": 98, "compromisedDevices": 0, "complianceRate": 96.2 },
  "soar": { "activePlaybooks": 6, "totalExecutions": 45, "successRate": 95.5 },
  "bcp": { "activePlans": 2, "totalBackupJobs": 30, "failedBackupJobs": 1 },
  "compliance": { "overallScore": 94, "activePolicies": 15, "openRisks": 8 },
  "cyberTwin": { "totalTwins": 3, "completedTwins": 2, "averageScore": 78 },
  "lastUpdated": "2026-01-01T12:00:00Z"
}
```

### Get Security Score

```
GET /api/gestcrp/dashboard/score
```

**Response:**

```json
{
  "overall": 87,
  "breakdown": {
    "zeroTrust": 100,
    "soc": 80,
    "siem": 95,
    "threats": 90,
    "appSecurity": 60,
    "dataSecurity": 95,
    "devices": 96,
    "soar": 95,
    "bcp": 80,
    "compliance": 94
  },
  "trend": "STABLE"
}
```

---

## Rate Limiting

- **Default:** 100 requests per minute per user
- **SIEM Ingestion:** 10,000 events per second per school
- **Bulk Operations:** Limited to 100 items per request

Rate limit responses return HTTP 429 with:

```json
{
  "error": {
    "code": "GESTCRP_RATE_LIMIT",
    "message": "Limite de requêtes atteinte",
    "statusCode": 429
  }
}
```
