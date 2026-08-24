# GEDKIN Data Privacy Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

GEDKIN data privacy framework ensures compliance with education data protection regulations across African jurisdictions, implementing consent management, data minimization, anonymization, pseudonymization, retention enforcement, and cross-border transfer controls.

---

## Privacy Principles

| Principle | Implementation |
|-----------|---------------|
| Lawfulness | Consent-based processing |
| Purpose limitation | Purpose-tagged access |
| Data minimization | Schema-enforced collection |
| Accuracy | Validation and update mechanisms |
| Storage limitation | Automated retention policies |
| Integrity | Encryption and audit |
| Accountability | Audit trail and reporting |

---

## Data Classification

### Classification Levels

| Level | Description | Examples | Controls |
|-------|-------------|----------|----------|
| PUBLIC | Publicly available | School name, address | Basic access |
| INTERNAL | Internal use only | Staff directory, calendar | Authentication |
| CONFIDENTIAL | Sensitive data | Student grades, health records | RBAC + encryption |
| RESTRICTED | Highly sensitive | Financial records, medical data | ABAC + MFA |
| TOP_SECRET | Maximum protection | Personal identifiers, biometrics | Full audit + approval |

### Classification Mapping

| Data Domain | Default Classification |
|-------------|----------------------|
| SCHOOL | PUBLIC |
| STUDENT | CONFIDENTIAL |
| TEACHER | INTERNAL |
| PARENT | CONFIDENTIAL |
| FINANCE | RESTRICTED |
| HR | CONFIDENTIAL |
| EXAMS | RESTRICTED |
| CURRICULUM | INTERNAL |
| RESEARCH | INTERNAL |
| GOVERNMENT | CONFIDENTIAL |
| HEALTH | RESTRICTED |
| INFRASTRUCTURE | PUBLIC |
| IDENTITY | TOP_SECRET |
| CLOUD | INTERNAL |
| CYBERSECURITY | RESTRICTED |

---

## Consent Management

### Consent Records

```typescript
interface ConsentRecord {
  id: string;
  userId: string;
  schoolId: string;
  consentType: ConsentType;
  granted: boolean;
  timestamp: string;
  expiresAt?: string;
  revokedAt?: string;
  purpose: string;
  legalBasis: string;
}
```

### Consent Types

| Type | Purpose | Legal Basis |
|------|---------|-------------|
| DATA_PROCESSING | Core ERP functionality | Contract performance |
| ANALYTICS | Usage analytics | Legitimate interest |
| RESEARCH | Research participation | Consent |
| SHARING | Third-party data sharing | Consent |
| MARKETING | Marketing communications | Consent |

### Consent Lifecycle

```
Grant → Active → Expiry/Revocation → Deletion
```

---

## Anonymization Techniques

### K-Anonymity

| K | Privacy Level | Use Case |
|---|--------------|----------|
| 2 | Low | Internal analytics |
| 5 | Medium | Research sharing |
| 10 | High | Public datasets |
| 50 | Very High | International sharing |

### Implementation

```typescript
function anonymizeRecord(record, k = 5): AnonymizedRecord {
  return {
    id: hash(record.id),
    generalizedAge: generalizeAge(record.age, k),
    suppressedName: suppress(record.name),
    maskedEmail: maskEmail(record.email),
  };
}
```

### L-Diversity

Ensures at least L distinct values for sensitive attributes within each equivalence class.

| L | Diversity Level |
|---|----------------|
| 2 | Basic diversity |
| 5 | Good diversity |
| 10 | Excellent diversity |

---

## Pseudonymization

### Techniques

| Field | Method | Reversible |
|-------|--------|-----------|
| `user_id` | HMAC-SHA256 | Yes (with key) |
| `email` | Token mapping | Yes (with mapping) |
| `name` | Initial + token | No |
| `ip_address` | Partial mask | No |
| `phone` | Partial mask | No |

### Pseudonymization Key Management

| Aspect | Implementation |
|--------|---------------|
| Storage | Supabase Vault |
| Rotation | 90 days |
| Access | Role-based |
| Backup | Encrypted |

---

## Retention Policies

| Data Type | Retention | Archive | Delete |
|-----------|-----------|---------|--------|
| Student records | 10 years | After 5 years | After 10 years |
| Financial records | 7 years | After 3 years | After 7 years |
| Audit logs | 5 years | After 2 years | After 5 years |
| Research data | 5 years | After 2 years | After 5 years |
| Health records | 10 years | After 5 years | After 10 years |
| Copilot conversations | 90 days | None | After 90 days |
| Agent memory | 1 hour | None | After 1 hour |
| Cache data | 5 minutes | None | After 5 minutes |

### Automated Enforcement

```typescript
const retentionPolicies = [
  { table: 'gedkin_copilot_conversations', days: 90 },
  { table: 'gedkin_agent_memory', days: 0, hours: 1 },
  { table: 'gedkin_semantic_searches', days: 30 },
  { table: 'gedkin_data_access_logs', days: 365 },
];
```

---

## Cross-Border Transfer

### Transfer Rules

| Source Region | Destination | Requirement |
|---------------|-------------|-------------|
| Same region | Same region | No restriction |
| Within Africa | Within Africa | Standard contractual clauses |
| Africa | Europe | Adequacy or SCC |
| Africa | Other | DPA + encryption |

### Data Residency Enforcement

```typescript
function enforceDataResidency(schoolId, targetRegion) {
  const schoolRegion = getSchoolRegion(schoolId);
  if (schoolRegion !== targetRegion) {
    throw new DataResidencyError(
      `Cross-region transfer not allowed: ${schoolRegion} → ${targetRegion}`
    );
  }
}
```

---

## Right to Access

### Data Export Format

```json
{
  "personal_data": {
    "identity": {...},
    "academic": {...},
    "financial": {...},
    "health": {...}
  },
  "metadata": {
    "exported_at": "2026-08-09T10:00:00Z",
    "format": "GEDKIN_DATA_EXPORT_v1",
    "school_id": "..."
  }
}
```

### Response Time

| Request Type | SLA |
|-------------|-----|
| Standard access | 30 days |
| Complex request | 60 days |
| Extension | 90 days (with notice) |

---

## Right to Erasure

### Erasure Rules

| Data Type | Erasable | Exception |
|-----------|----------|-----------|
| Profile data | Yes | Active enrollment |
| Academic records | No | Legal requirement |
| Financial records | No | Tax compliance |
| Health records | Yes | Active treatment |
| Research data | Anonymize | Published research |

### Erasure Process

```
Request → Validation → Impact Assessment → Partial/Full Erasure → Confirmation
```

---

## Data Breach Response

### Response Timeline

| Phase | Timeframe | Actions |
|-------|-----------|---------|
| Detection | Immediate | Identify scope |
| Containment | 1 hour | Stop ongoing breach |
| Assessment | 4 hours | Evaluate impact |
| Notification | 24 hours | Notify authorities |
| User notification | 72 hours | Notify affected users |
| Remediation | 1 week | Implement fixes |
| Post-mortem | 2 weeks | Review and improve |

---

## Privacy Impact Assessment

### Trigger Events

| Event | PIA Required |
|-------|-------------|
| New data processing | Yes |
| New third-party sharing | Yes |
| New AI model deployment | Yes |
| Cross-border transfer | Yes |
| System architecture change | Yes |

### PIA Components

1. Data flow mapping
2. Risk identification
3. Mitigation measures
4. Residual risk assessment
5. Approval and monitoring

---

## Configuration

```typescript
export const gedkinPrivacyConfig = {
  consentRequired: true,
  dataMinimization: true,
  anonymizationEnabled: true,
  pseudonymizationEnabled: true,
  retentionEnforcement: true,
  crossBorderControls: true,
  rightToAccess: true,
  rightToErasure: true,
  breachNotification: true,
  piaRequired: true,
};
```

---

## Audit Reporting

| Report | Frequency | Audience |
|--------|-----------|----------|
| Privacy compliance | Monthly | DPO |
| Consent metrics | Weekly | Management |
| Retention compliance | Monthly | Operations |
| Breach summary | Per incident | Management |
| Data subject requests | Monthly | DPO |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SECURITY.md](GEDKIN_SECURITY.md)
- [GEDKIN_RBAC.md](GEDKIN_RBAC.md)
