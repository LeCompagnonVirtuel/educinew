# GECIRAP — Security & Compliance

## Enterprise Security Framework for Infrastructure

---

## 1. Vision

GECIRAP Security provides comprehensive security controls, compliance management, and audit capabilities for all infrastructure operations, ensuring educational institutions meet regulatory requirements and maintain robust security postures.

---

## 2. Security Controls

### Control Categories

| Category | Description |
|----------|-------------|
| `IDENTITY` | Authentication & authorization |
| `NETWORK` | Network security |
| `DATA` | Data protection |
| `COMPUTE` | Compute security |
| `MONITORING` | Security monitoring |
| `COMPLIANCE` | Regulatory compliance |

### Encryption

| Setting | Value |
|---------|-------|
| Data at rest | AES-256-GCM |
| Data in transit | TLS 1.3 |
| Key management | AES-256-GCM |
| Key rotation | 90 days |

---

## 3. Audit Logging

Every operation generates an audit log:

| Field | Description |
|-------|-------------|
| `action` | Operation performed |
| `actor` | User or system |
| `actor_type` | USER, SYSTEM, API |
| `resource` | Target entity type |
| `resource_id` | Target entity ID |
| `details` | Operation metadata |
| `ip_address` | Source IP |
| `user_agent` | Client identifier |
| `result` | SUCCESS or FAILURE |
| `timestamp` | When it happened |

### Audit Log Retention

| Data Type | Retention |
|-----------|-----------|
| Audit logs | 365 days |
| Security events | 365 days |
| Access logs | 90 days |
| Error logs | 30 days |

---

## 4. Sensitive Operations

Operations that require additional logging:

| Operation | Category |
|-----------|----------|
| Cloud provider creation | Identity |
| Credential management | Identity |
| Resource deletion | Compute |
| Network changes | Network |
| DR recovery execution | Operations |
| Budget modification | Financial |
| Policy changes | Governance |

---

## 5. API Security

### Rate Limiting

| Endpoint Type | Limit |
|---------------|-------|
| General API | 1,000 req/min |
| Dashboard | 100 req/min |
| Bulk operations | 100 items/request |

### Authentication

- Supabase JWT required on all endpoints
- Token validated on every request
- Expired tokens rejected

### Authorization

| Role | Access |
|------|--------|
| `SUPER_ADMIN` | Full access all schools |
| `ADMIN` | Full access own school |
| `DIRECTEUR` | Read-only dashboard |
| Other | No access |

---

## 6. Data Protection

### Data Classification

| Level | Description | Examples |
|-------|-------------|----------|
| `PUBLIC` | Publicly available | Marketing materials |
| `INTERNAL` | Internal use only | Memos, org charts |
| `CONFIDENTIAL` | Restricted access | Student records, financial |
| `RESTRICTED` | Highly restricted | PII, payment data |
| `TOP_SECRET` | Maximum restriction | Encryption keys |

### Data Handling

| Classification | Encryption | Access | Backup |
|----------------|------------|--------|--------|
| PUBLIC | Optional | All users | Standard |
| INTERNAL | At rest | Staff | Standard |
| CONFIDENTIAL | AES-256 | Authorized | Encrypted |
| RESTRICTED | AES-256-GCM | Strict RBAC | Encrypted + audited |
| TOP_SECRET | HSM | Named individuals | Encrypted + immutable |

---

## 7. Compliance Frameworks

| Framework | Description | Status |
|-----------|-------------|--------|
| ISO_27001 | Information Security Management | Supported |
| SOC2_TYPE1 | Service Organization Controls (design) | Supported |
| SOC2_TYPE2 | Service Organization Controls (operating) | Supported |
| GDPR | General Data Protection Regulation | Supported |
| PCI_DSS | Payment Card Industry Data Security | Supported |
| FERPA | Family Educational Rights and Privacy | Supported |
| CHILD_PROTECTION | Child data protection | Supported |
| LOCAL_REGULATION | Local regulatory requirements | Supported |

---

## 8. Compliance Assessment Flow

```
NOT_STARTED → IN_PROGRESS → COMPLIANT / PARTIALLY_COMPLIANT / NON_COMPLIANT
                                       │
                                 Score ≥ 90%: COMPLIANT
                                 Score ≥ 70%: PARTIALLY_COMPLIANT
                                 Score < 70%: NON_COMPLIANT
```

---

## 9. Secret Management

### Secret Rotation

| Secret Type | Rotation Period | Alert Before |
|-------------|----------------|--------------|
| API Keys | 90 days | 14 days |
| Database passwords | 90 days | 14 days |
| Encryption keys | 365 days | 30 days |
| TLS certificates | 365 days | 60 days |

### Secret Security Rules

1. Never expose secrets to client-side code
2. Never log secret values
3. Never commit secrets to version control
4. Use environment variables for configuration
5. Rotate secrets regularly

---

## 10. Network Security

### Security Groups

| Rule Type | Description |
|-----------|-------------|
| Inbound | Control incoming traffic |
| Outbound | Control outgoing traffic |

### Network Segmentation

| Segment | Description | Access |
|---------|-------------|--------|
| Public | Internet-facing | Public |
| DMZ | Semi-trusted zone | Controlled |
| Internal | Internal services | Staff only |
| Restricted | Sensitive systems | Named individuals |

---

## 11. Security Monitoring

### Monitoring Rules

| Rule | Condition | Action |
|------|-----------|--------|
| Failed login | > 5 attempts in 5 min | Lock account |
| Privilege escalation | Unauthorized role change | Alert + block |
| Data exfiltration | Large data download | Alert + block |
| Anomalous access | Unusual IP/time | Alert + verify |

---

## 12. Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `auditAllOperations` | true | Log every operation |
| `sensitiveOperationLogging` | true | Extra logging for sensitive ops |
| `encryptionRequired` | true | Require encryption |
| `rbacEnforcement` | true | Enforce RBAC |
| `abacEnforcement` | true | Enforce ABAC |
| `rateLimitingEnabled` | true | Enable rate limiting |
| `maxApiRequestsPerMinute` | 1,000 | Rate limit |
| `secretRotationDays` | 90 | Secret rotation period |
| `accessReviewDays` | 30 | Access review frequency |
