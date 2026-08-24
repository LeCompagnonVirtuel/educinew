# GESTCRP — Security Documentation

## Zero Trust Architecture

GESTCRP implements a Zero Trust security model based on the principle of "never trust, always verify."

### Trust Zones

The system operates across 6 trust zones:

| Zone | Description | Evaluation |
|------|-------------|------------|
| `IDENTIFY` | Initial identity verification | Identity provider, email, roles |
| `VERIFY` | Multi-factor verification | MFA status, device trust, location |
| `ENFORCE` | Policy enforcement | Access decisions, risk scoring |
| `ADAPT` | Continuous adaptation | Risk score changes, behavior analysis |
| `SUSTAIN` | Ongoing monitoring | Session validation, token refresh |
| `RECOVER` | Incident recovery | Quarantine, remediation |

### Policy Evaluation Flow

```
Request → Zone Evaluation → Condition Matching → Action Execution → Decision
                              │
                        Risk Score Calculation
                        (device, identity, network, behavior)
```

### Enforcement Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `STRICT` | Block on any failure, log all decisions | Production environments |
| `MODERATE` | Allow with warnings, log all decisions | Staging/testing |
| `ADVISORY` | Log only, no blocking | Audit/planning phase |

### Identity Context

Every Zero Trust assessment evaluates:

- **Verification Level:** NONE → BASIC → STANDARD → ELEVATED → HIGH → CRITICAL
- **Device Trust:** UNTRUSTED → REGISTERED → MANAGED → COMPLIANT → TRUSTED
- **Network Segment:** PUBLIC → PARTIAL → INTERNAL → RESTRICTED → ISOLATED
- **Risk Score:** 0-100 composite score based on all factors

### Risk Score Thresholds

| Range | Level | Action |
|-------|-------|--------|
| 0-30 | LOW | Allow |
| 31-60 | MEDIUM | Allow with monitoring |
| 61-80 | HIGH | Challenge (re-authenticate) |
| 81-90 | CRITICAL | Restrict access |
| 91-100 | EMERGENCY | Quarantine |

---

## Identity & Access Management (IAM)

### Authentication Methods

| Method | Description | Risk Weight |
|--------|-------------|-------------|
| `PASSWORD` | Standard password auth | 50 |
| `SSO` | Single Sign-On | 20 |
| `OAUTH` | OAuth 2.0 | 25 |
| `OIDC` | OpenID Connect | 20 |
| `SAML` | SAML 2.0 | 20 |
| `LDAP` | LDAP/Active Directory | 30 |
| `CERTIFICATE` | Client certificate | 10 |
| `BIOMETRIC` | Fingerprint/Face | 5 |
| `MAGIC_LINK` | Email magic link | 40 |
| `API_KEY` | API key | 35 |

### Identity Providers

| Provider | Type | Use Case |
|----------|------|----------|
| `INTERNAL` | Built-in | Default EduCI authentication |
| `GOOGLE` | OAuth/OIDC | Google Workspace integration |
| `MICROSOFT` | OAuth/OIDC | Azure AD / Microsoft 365 |
| `OKTA` | SAML/OIDC | Enterprise SSO |
| `AZURE_AD` | OAuth/OIDC | Azure Active Directory |
| `CUSTOM_SAML` | SAML | Custom SAML providers |

### Password Policy

| Rule | Value |
|------|-------|
| Minimum length | 12 characters |
| Maximum length | 128 characters |
| Require uppercase | Yes |
| Require lowercase | Yes |
| Require numbers | Yes |
| Require special chars | Yes |
| Password history | Last 12 passwords |
| Maximum age | 90 days |

### Credential Rotation

| Credential Type | Rotation Period | Alert Before | Enforced |
|-----------------|-----------------|--------------|----------|
| Password | 90 days | 14 days | Yes |
| API Key | 365 days | 30 days | Yes |
| Certificate | 365 days | 60 days | Yes |
| Token | 30 days | 7 days | Yes |
| Encryption Key | 365 days | 30 days | Yes |

### Session Management

- **Max sessions per user:** 5
- **Session timeout:** 3,600 seconds (1 hour)
- **Refresh token expiry:** 86,400 seconds (24 hours)
- **MFA grace period:** 86,400 seconds (24 hours)

### Account Lockout

- **Max login attempts:** 5
- **Lockout duration:** 1,800 seconds (30 minutes)

---

## Security Operations Center (SOC)

### Incident Lifecycle

```
NEW → TRIAGED → INVESTIGATING → CONTAINED → ERADICATED → RECOVERED → CLOSED
 │                                               │
 └───────────────────────────────────────────────┘
                     FALSE_POSITIVE
```

### Severity Levels & Response Times

| Severity | Detection | Response | Resolution |
|----------|-----------|----------|------------|
| LOW | 1 hour | 2 hours | 24 hours |
| MEDIUM | 30 min | 1 hour | 12 hours |
| HIGH | 15 min | 30 min | 4 hours |
| CRITICAL | 5 min | 10 min | 2 hours |
| EMERGENCY | 1 min | 5 min | 1 hour |

### Incident Categories

| Category | Description |
|----------|-------------|
| `MALWARE` | Malicious software detection |
| `PHISHING` | Social engineering attacks |
| `DATA_BREACH` | Unauthorized data access |
| `UNAUTHORIZED_ACCESS` | Access policy violations |
| `DDoS` | Denial of service attacks |
| `INSIDER_THREAT` | Internal malicious activity |
| `RANSOMWARE` | Ransomware encryption |
| `ACCOUNT_COMPROMISE` | Credential theft/abuse |
| `DATA_EXFILTRATION` | Data theft attempts |
| `PRIVILEGE_ESCALATION` | Unauthorized privilege gain |
| `SOCIAL_ENGINEERING` | Manipulation attacks |
| `PHYSICAL_SECURITY` | Physical access violations |
| `COMPLIANCE_VIOLATION` | Policy non-compliance |
| `SERVICE_DISRUPTION` | Service availability issues |

### APT (Automated Playbook Trigger) Actions

| Action | Description |
|--------|-------------|
| `BLOCK_IP` | Block IP address at firewall |
| `QUARANTINE_DEVICE` | Isolate device from network |
| `DISABLE_ACCOUNT` | Disable compromised account |
| `REVOKE_SESSION` | Terminate active sessions |
| `UPDATE_FIREWALL` | Modify firewall rules |
| `ISOLATE_NETWORK` | Network segmentation |
| `FORCE_PASSWORD_RESET` | Require password change |
| `ENABLE_MFA` | Enforce MFA enrollment |
| `COLLECT_EVIDENCE` | Forensic data collection |
| `NOTIFY_ADMIN` | Alert administrators |
| `ESCALATE` | Escalate to senior staff |
| `CREATE_TICKET` | Create support ticket |

---

## SIEM Integration

### Event Types

| Type | Description | Sources |
|------|-------------|---------|
| `AUTH` | Authentication events | Login, logout, MFA |
| `NETWORK` | Network traffic | Firewall, router, switch |
| `APPLICATION` | App-level events | Web server, application logs |
| `SYSTEM` | OS events | OS logs, service status |
| `DATA` | Data access | Database, file access |
| `COMPLIANCE` | Policy events | Compliance checks |
| `THREAT` | Threat events | IDS/IPS, anti-malware |
| `VULNERABILITY` | Vuln events | Scanner results |
| `IDENTITY` | Identity events | IAM, directory |
| `ENDPOINT` | Endpoint events | EDR, antivirus |

### Event Processing Pipeline

```
Ingestion → Normalization → Enrichment → Correlation → Alerting → Storage
    │            │              │              │            │          │
    │         Parse fields   Add context   Rule match   Notify    Retain
    │         Map schemas    IOC lookup    Threshold    Actions   90 days
    │         Validate       GeoIP         Window       Escalate
    │
10,000 events/sec limit
```

### Rule Conditions

| Operator | Description |
|----------|-------------|
| `EQUALS` | Exact match |
| `NOT_EQUALS` | Not equal |
| `CONTAINS` | Substring match |
| `REGEX` | Regular expression |
| `GREATER_THAN` | Numeric greater than |
| `LESS_THAN` | Numeric less than |
| `IN` | Value in list |
| `NOT_IN` | Value not in list |
| `EXISTS` | Field exists |
| `NOT_EXISTS` | Field does not exist |

### Rule Actions

| Action | Description |
|--------|-------------|
| `ALERT` | Generate security alert |
| `TICKET` | Create incident ticket |
| `BLOCK` | Block source |
| `QUARANTINE` | Isolate entity |
| `NOTIFY` | Send notification |
| `ESCALATE` | Escalate severity |
| `LOG` | Write to audit log |
| `ENRICH` | Add context data |

### Correlation Rules

Correlation rules detect multi-step attacks by matching patterns across multiple events within a time window.

**Default settings:**
- Correlation window: 300 seconds
- Minimum threshold: 3 events
- Max conditions per rule: 20
- Max actions per rule: 10

---

## Threat Detection & Intelligence

### Indicator Types

| Type | Format | Example |
|------|--------|---------|
| `IP` | IPv4/IPv6/CIDR | `203.0.113.42`, `198.51.100.0/24` |
| `DOMAIN` | FQDN | `evil.example.com` |
| `URL` | Full URL | `https://evil.example.com/payload` |
| `FILE_HASH` | MD5/SHA1/SHA256 | `e99a18c428cb38d5f260853678922e03` |
| `EMAIL` | Email address | `attacker@evil.example.com` |
| `CVE` | CVE identifier | `CVE-2026-0001` |
| `YARA` | YARA rule name | `APT28_Backdoor` |
| `Sigma` | Sigma rule name | `Brute Force Detection` |
| `BEHAVIOR` | Behavioral pattern | `lateral_movement` |
| `TTP` | MITRE ATT&CK TTP | `T1071` |

### Threat Feeds

Supported feed formats:

| Format | Description |
|--------|-------------|
| `STIX` | Structured Threat Information Expression |
| `TAXII` | Trusted Automated Exchange of Intelligence Information |
| `CSV` | Comma-separated values |
| `JSON` | JSON format |
| `MISP` | Malware Information Sharing Platform |
| `CUSTOM` | Custom format |

### Auto-Block Threshold

Indicators with confidence ≥ 85% are automatically added to block lists.

---

## Application Security

### Scan Types

| Type | Full Name | Description |
|------|-----------|-------------|
| `SAST` | Static Application Security Testing | Source code analysis |
| `DAST` | Dynamic Application Security Testing | Runtime testing |
| `SCA` | Software Composition Analysis | Dependency scanning |
| `IAST` | Interactive AST | Hybrid static/dynamic |
| `RASP` | Runtime Application Self-Protection | In-app protection |
| `CONTAINER` | Container Scanning | Docker/OCI images |
| `IAC` | Infrastructure as Code | Terraform/CloudFormation |
| `API` | API Security Testing | API endpoint testing |
| `MOBILE` | Mobile App Scanning | iOS/Android apps |
| `SECRETS` | Secret Scanning | Hardcoded secrets |

### Vulnerability Risk Score Calculation

```
Base score from severity:
  INFO: 10, LOW: 25, MEDIUM: 50, HIGH: 75, CRITICAL: 90

Adjustments:
  + CVSS score override (if provided)
  + 10 points if exploit available
  - 5 points if patch available

Final: clamp(0, 100, calculated_score)
```

### Vulnerability Statuses

| Status | Description |
|--------|-------------|
| `NEW` | Just discovered |
| `CONFIRMED` | Verified as real |
| `IN_PROGRESS` | Being remediated |
| `MITIGATED` | Workaround in place |
| `RESOLVED` | Fixed |
| `ACCEPTED` | Risk accepted |
| `FALSE_POSITIVE` | Not a real vulnerability |

### API Security Policies

Each policy defines:
- **Authentication method:** NONE, API_KEY, BEARER, BASIC, MUTUAL_TLS
- **Rate limit:** Requests per window (max 100,000)
- **Input validation rules:** Field-level type, length, pattern validation
- **Output encoding:** HTML, JSON, XML, PLAIN
- **CORS policy:** Origins, methods, headers, credentials
- **WAF rules:** SQL_INJECTION, XSS, CSRF, PATH_TRAVERSAL, COMMAND_INJECTION, LDAP_INJECTION, XXE

---

## Data Security & DLP

### Data Classification Levels

| Level | Description | Examples |
|-------|-------------|----------|
| `PUBLIC` | Publicly available | Marketing materials, public website |
| `INTERNAL` | Internal use only | Internal memos, org charts |
| `CONFIDENTIAL` | Restricted to authorized | Student records, financial data |
| `RESTRICTED` | Highly restricted | PII, payment data, health records |
| `TOP_SECRET` | Maximum restriction | Encryption keys, security configs |

### DLP Policy Types

| Type | Description |
|------|-------------|
| `CONTENT_INSPECTION` | Inspect file/email content |
| `CONTEXTUAL` | Context-aware detection |
| `PATTERN_MATCHING` | Regex/keyword matching |
| `ANOMALY_DETECTION` | Behavioral anomalies |
| `USER_ACTIVITY` | User behavior monitoring |
| `FILE_FINGERPRINTING` | Known file detection |

### DLP Actions

| Action | Description |
|--------|-------------|
| `BLOCK` | Prevent the action |
| `ENCRYPT` | Encrypt data before transfer |
| `REDACT` | Remove sensitive content |
| `QUARANTINE` | Isolate for review |
| `NOTIFY` | Alert administrator |
| `LOG` | Record the event |
| `WATERMARK` | Add identifying watermark |
| `RESTRICT` | Limit access permissions |
| `THROTTLE` | Rate limit transfers |

### Encryption Algorithms

| Algorithm | Key Size | Use Case |
|-----------|----------|----------|
| `AES-256-GCM` | 256-bit | Data encryption (default) |
| `AES-256-CBC` | 256-bit | Legacy data encryption |
| `RSA-4096` | 4096-bit | Key exchange, signing |
| `ECDSA-P384` | 384-bit | Digital signatures |
| `ChaCha20-Poly1305` | 256-bit | High-performance encryption |

### Data Retention

| Deletion Method | Description |
|-----------------|-------------|
| `SECURE_DELETE` | Cryptographic erasure |
| `CRYPTO_SHREDDING` | Destroy encryption keys |
| `PHYSICAL_DESTRUCTION` | Physical media destruction |

### Data Masking Types

| Type | Description | Example |
|------|-------------|---------|
| `FULL` | Complete replacement | `****` |
| `PARTIAL` | Partial masking | `****5678` |
| `TOKEN` | Tokenized replacement | `tok_abc123` |
| `HASH` | One-way hash | SHA-256 digest |
| `FORMAT_PRESERVING` | Maintains format | `X-XXX-XXX-1234` |
| `REDACTION` | Content removal | `[REDACTED]` |

---

## Device & Endpoint Security

### Device Platforms

| Platform | Protection Tools |
|----------|-----------------|
| `WINDOWS` | Defender, EDR, BitLocker |
| `MACOS` | XProtect, MDM, FileVault |
| `LINUX` | ClamAV, SELinux, LUKS |
| `IOS` | MDM, Passcode, Touch ID |
| `ANDROID` | MDM, Work Profile, Encryption |
| `CHROME_OS` | Chrome Enterprise, EDR |
| `IOT` | Network segmentation |

### Device Statuses

| Status | Description |
|--------|-------------|
| `ONLINE` | Connected and active |
| `OFFLINE` | Not connected |
| `SUSPENDED` | Admin-suspended |
| `COMPROMISED` | Security breach detected |
| `QUARANTINE` | Isolated for investigation |
| `RETIRED` | Decommissioned |

### MDM Commands

| Command | Description |
|---------|-------------|
| `LOCK` | Lock the device screen |
| `WIPE` | Factory reset device |
| `REBOOT` | Restart device |
| `INSTALL_APP` | Install application |
| `REMOVE_APP` | Uninstall application |
| `UPDATE_POLICY` | Push policy update |
| `ENCRYPT` | Enable full-disk encryption |
| `DECRYPT` | Disable encryption |
| `SCAN` | Run security scan |
| `ENROLL` | Enroll in MDM |
| `LOCATION` | Request device location |
| `SCREENSHOT` | Capture screen |

### Device Protection Status

Monitored protection components:

- **Antivirus:** Enabled, version, last scan, definition update
- **Firewall:** Enabled status
- **Encryption:** Enabled status
- **EDR:** Enabled status
- **DLP:** Enabled status
- **Threat detections:** Count

### Compliance Checks

| Check | Description |
|-------|-------------|
| OS up to date | Latest security patches |
| Encryption compliant | Full-disk encryption enabled |
| Password compliant | Meets password policy |
| Patch level | Current patch level |

---

## Security Automation (SOAR)

### Playbook Triggers

| Trigger | Description |
|---------|-------------|
| `INCIDENT_CREATED` | New SOC incident |
| `INCIDENT_SEVERITY_CHANGE` | Severity escalation |
| `THREAT_DETECTED` | Threat indicator match |
| `VULNERABILITY_FOUND` | New vulnerability |
| `COMPLIANCE_VIOLATION` | Policy breach |
| `DATA_BREACH` | Data exposure event |
| `INSIDER_THREAT` | Internal threat detected |
| `ACCOUNT_COMPROMISE` | Account takeover |
| `MALWARE_DETECTED` | Malware execution |
| `UNAUTHORIZED_ACCESS` | Access violation |
| `SCHEDULE` | Time-based trigger |
| `MANUAL` | Manual execution |

### Step Types

| Type | Description |
|------|-------------|
| `ACTION` | Execute an action |
| `DECISION` | Branch based on condition |
| `DELAY` | Wait for duration |
| `LOOP` | Iterate over collection |
| `PARALLEL` | Execute multiple steps concurrently |
| `CONDITIONAL` | Conditional execution |
| `TRANSFORM` | Data transformation |

### Execution Flow

```
Trigger → Condition Check → Step Execution → Result Evaluation
                                    │
                              Retry on failure
                              (max 3 retries)
                                    │
                              On Success → on_success steps
                              On Failure → on_failure steps
```

### Limits

- Max playbooks per school: 100
- Max steps per playbook: 50
- Max concurrent executions: Not limited
- Execution timeout: 3,600 seconds
- Max retries per step: 3

---

## Business Continuity & Disaster Recovery

### BCP Plan Lifecycle

```
DRAFT → TESTING → ACTIVE → ARCHIVED
  │        │         │
  └────────┘         │
    Failed           └── Review cycle
```

### Critical Function Properties

| Property | Description |
|----------|-------------|
| `maxTolerableDowntime` | Maximum acceptable downtime |
| `recoveryTimeObjective` | Target recovery time |
| `recoveryPointObjective` | Maximum data loss (seconds) |
| `dependencies` | Required systems |
| `resources` | Required infrastructure |

### Backup Types

| Type | Description | Speed | Storage |
|------|-------------|-------|---------|
| `FULL` | Complete backup | Slow | Large |
| `INCREMENTAL` | Changes since last backup | Fast | Small |
| `DIFFERENTIAL` | Changes since last full | Medium | Medium |

### Backup Sites

| Site | Description |
|------|-------------|
| `PRIMARY` | On-premises primary |
| `SECONDARY` | On-premises secondary |
| `CLOUD` | Cloud storage |
| `OFFSITE` | Physical offsite location |

### DR Testing Schedule

| Type | Description | Frequency |
|------|-------------|-----------|
| `TABLETOP` | Discussion-based | Monthly |
| `SIMULATION` | Scenario walkthrough | Quarterly |
| `PARTIAL_EXERCISE` | Partial system test | Semi-annual |
| `FULL_EXERCISE` | Full system test | Annual |

---

## Compliance & Governance

### Supported Standards

| Standard | Description |
|----------|-------------|
| `ISO_27001` | Information Security Management |
| `SOC2_TYPE1` | Service Organization Controls (design) |
| `SOC2_TYPE2` | Service Organization Controls (operating) |
| `GDPR` | General Data Protection Regulation |
| `PCI_DSS` | Payment Card Industry Data Security |
| `HIPAA` | Health Insurance Portability |
| `NIST_CSF` | NIST Cybersecurity Framework |
| `CIS_BENCHMARKS` | Center for Internet Security |
| `FERPA` | Family Educational Rights and Privacy |
| `CHILD_PROTECTION` | Child data protection |
| `CLOUD_SECURITY` | Cloud security alliance |
| `LOCAL_REGULATION` | Local regulatory requirements |

### Compliance Assessment Flow

```
NOT_STARTED → IN_PROGRESS → COMPLIANT / PARTIALLY_COMPLIANT / NON_COMPLIANT
                                       │
                                 Score ≥ 90%: COMPLIANT
                                 Score ≥ 70%: PARTIALLY_COMPLIANT
                                 Score < 70%: NON_COMPLIANT
```

### Governance Policy Lifecycle

```
DRAFT → REVIEW → APPROVED → ACTIVE → ARCHIVED
                │                       │
                └── DEPRECATED          └── DEPRECATED
```

### Risk Assessment

| Risk Level | Score Range | Priority |
|------------|-------------|----------|
| LOW | 1-5 | Low |
| MEDIUM | 6-11 | Medium |
| HIGH | 12-19 | High |
| CRITICAL | 20-25 | Critical |

**Score = Likelihood (1-5) × Impact (1-5)**

### Risk Statuses

| Status | Description |
|--------|-------------|
| `IDENTIFIED` | Risk discovered |
| `ANALYZED` | Risk assessed |
| `TREATED` | Mitigation applied |
| `MONITORED` | Ongoing monitoring |
| `CLOSED` | Risk resolved |

### Control Types

| Type | Description |
|------|-------------|
| `PREVENTIVE` | Prevents incidents |
| `DETECTIVE` | Detects incidents |
| `CORRECTIVE` | Corrects after incident |
| `COMPENSATING` | Alternative control |

---

## Cyber Digital Twin

### Simulation Types

| Type | Description |
|------|-------------|
| `ATTACK_SIMULATION` | General attack simulation |
| `PENETRATION_TEST` | Authorized penetration testing |
| `RED_TEAM` | Adversary simulation |
| `BLUE_TEAM` | Defensive simulation |
| `PURPLE_TEAM` | Combined offensive/defensive |
| `CHAOS_ENGINEERING` | Resilience testing |
| `DISASTER_RECOVERY` | DR procedure validation |
| `INCIDENT_RESPONSE` | IR procedure testing |

### Twin Lifecycle

```
DRAFT → READY → RUNNING → COMPLETED
  │       │        │
  └───────┘        ├── FAILED
    Paused         └── PAUSED
```

### Result Metrics

| Metric | Description |
|--------|-------------|
| `detection_time` | Seconds to detect the attack |
| `response_time` | Seconds to respond |
| `mitigation_time` | Seconds to mitigate |
| `score` | Overall defense score (0-100) |

### Finding Types

| Type | Description |
|------|-------------|
| `VULNERABILITY` | Security weakness found |
| `DETECTION_GAP` | Attack not detected |
| `RESPONSE_DELAY` | Slow response time |
| `CONFIGURATION_ISSUE` | Misconfiguration |
| `BEST_PRACTICE` | Best practice violation |

### Limits

- Max digital twins per school: 10
- Max attack scenarios per twin: 50
- Max results retained: 1,000
- Simulation timeout: 7,200 seconds
- Max concurrent simulations: 3

---

## Audit Logging

All security operations generate audit logs with:

- **Actor:** User, system, API, or service that performed the action
- **Action:** Description of the operation
- **Resource:** Target entity type and ID
- **Result:** SUCCESS or FAILURE
- **Context:** IP address, user agent, timestamp
- **Details:** Operation-specific metadata

Audit logs are immutable and retained for 365 days by default.
