# GEDKIN Security & Privacy Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

GEDKIN implements defense-in-depth security with RBAC, ABAC, tenant isolation, zero trust, encryption, audit logging, data minimization, anonymization, pseudonymization, data residency enforcement, consent management, and retention enforcement.

---

## Security Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Security Layers                    │
├─────────────────────────────────────────────────────┤
│  1. Authentication (Supabase Auth + MFA)            │
│  2. Authorization (RBAC + ABAC)                     │
│  3. Tenant Isolation (school_id + RLS)              │
│  4. Input Validation (Zod schemas)                  │
│  5. Output Sanitization (XSS prevention)            │
│  6. Encryption (AES-256 + TLS 1.3)                  │
│  7. Audit Logging (all access)                      │
│  8. Rate Limiting (per user/endpoint)               │
│  9. OWASP Top 10 compliance                         │
└─────────────────────────────────────────────────────┘
```

---

## Authentication

| Feature | Implementation |
|---------|---------------|
| Provider | Supabase Auth |
| Token Type | JWT (RS256) |
| MFA | TOTP (Google Authenticator) |
| Session Duration | 1 hour |
| Refresh Token | 7 days |
| Password Policy | Min 12 chars, complexity required |

---

## Authorization

### RBAC Roles

| Role | GEDKIN Access |
|------|---------------|
| SUPER_ADMIN | Full access |
| ADMIN | Full access (tenant scope) |
| DIRECTEUR | Read/Write all modules |
| SECRETAIRE | Read/Write operational modules |
| COMPTABLE | Read finance, Write finance |
| ENSEIGNANT | Read academic, Write grades |
| SURVEILLANT | Read attendance, Write attendance |
| PARENT | Read child data only |
| ELEVE | Read own data only |

### ABAC Attributes

| Attribute | Description |
|-----------|-------------|
| `user.role` | User role |
| `user.school_id` | Tenant ID |
| `resource.classification` | Data classification |
| `resource.visibility` | Data visibility |
| `action.type` | Read/Write/Delete |
| `context.time` | Access time |
| `context.location` | Access location |

### Policy Evaluation

```
ALLOW if:
  (role_permission AND attribute_match AND tenant_match AND time_valid)
DENY otherwise
```

---

## Tenant Isolation

### Implementation Layers

| Layer | Mechanism |
|-------|-----------|
| Application | `school_id` filter on all queries |
| Database | Row-Level Security (RLS) policies |
| API | JWT `school_id` claim validation |
| UI | Module visibility per school |

### RLS Policy Example

```sql
CREATE POLICY gedkin_tenant_isolation ON gedkin_entities
  USING (school_id = current_setting('app.current_school_id')::uuid);
```

---

## Zero Trust Architecture

| Principle | Implementation |
|-----------|---------------|
| Never trust, always verify | Validate every request |
| Least privilege | Minimum required permissions |
| Micro-segmentation | Module-level isolation |
| Assume breach | Audit all access |
| Verify explicitly | Multi-factor authentication |

---

## Encryption

### At Rest

| Data Type | Algorithm | Key Management |
|-----------|-----------|----------------|
| Database | AES-256 | Supabase managed |
| Files | AES-256 | Supabase Storage |
| Backups | AES-256 | Encryption keys |
| Logs | AES-256 | Log encryption |

### In Transit

| Protocol | Version | Usage |
|----------|---------|-------|
| TLS | 1.3 | All API traffic |
| WSS | 1.3 | Realtime connections |
| HTTPS | 1.3 | Web application |

---

## OWASP Top 10 Compliance

| Risk | Mitigation | Status |
|------|-----------|--------|
| Broken Access Control | RBAC + ABAC + RLS | Active |
| Cryptographic Failures | AES-256 + TLS 1.3 | Active |
| Injection | Zod validation + parameterized queries | Active |
| Insecure Design | Threat modeling + security review | Active |
| Security Misconfiguration | Automated checks | Active |
| Vulnerable Components | Dependency scanning | Active |
| Auth Failures | MFA + rate limiting | Active |
| Data Integrity | HMAC signing + audit | Active |
| Logging Failures | Centralized audit logging | Active |
| SSRF | Input validation + allowlisting | Active |

---

## Data Minimization

| Principle | Implementation |
|-----------|---------------|
| Collect only necessary data | Schema validation enforces fields |
| Retain only required period | Automated retention policies |
| Process only stated purposes | Purpose-based access control |
| Delete when no longer needed | Automated cleanup jobs |

---

## Anonymization

### Techniques

| Technique | Description |
|-----------|-------------|
| K-Anonymity | Group records into k-sized sets |
| L-Diversity | Ensure attribute diversity |
| T-Closeness | Limit distribution difference |
| Differential Privacy | Add calibrated noise |

### Use Cases

| Use Case | Technique |
|----------|-----------|
| Research sharing | K-Anonymity + L-Diversity |
| Analytics export | Differential Privacy |
| Public datasets | Full anonymization |
| Test data | Synthetic data generation |

---

## Pseudonymization

### Implementation

| Field | Pseudonymization Method |
|-------|------------------------|
| `user_id` | HMAC-SHA256 hash |
| `email` | Token-based replacement |
| `name` | Initial + token |
| `ip_address` | Partial masking |

---

## Data Residency

### Supported Regions

| Region | Code | Data Location |
|--------|------|---------------|
| West Africa | WA | Senegal |
| Central Africa | CA | Cameroon |
| East Africa | EA | Kenya |
| Europe | EU | France |
| North America | NA | United States |

### Enforcement

- Data stored in specified region
- Cross-region transfer requires approval
- Compliance with local regulations

---

## Consent Management

### Consent Types

| Type | Description |
|------|-------------|
| `DATA_PROCESSING` | Core data processing |
| `ANALYTICS` | Usage analytics |
| `RESEARCH` | Research participation |
| `SHARING` | Data sharing |
| `MARKETING` | Marketing communications |

### Consent Flow

```
User → Grant Consent → Store Consent Record → Enforce in Processing
User → Revoke Consent → Update Record → Stop Processing
```

---

## Retention Enforcement

| Data Type | Retention Period | Action |
|-----------|-----------------|--------|
| Student records | 10 years | Archive |
| Financial records | 7 years | Archive |
| Audit logs | 5 years | Archive |
| Research data | 5 years | Delete |
| Copilot conversations | 90 days | Delete |
| Agent memory | 1 hour | Evict |

---

## Configuration

```typescript
export const gedkinSecurityConfig = {
  enabled: true,
  rbacEnforcement: true,
  abacEnforcement: true,
  tenantIsolationStrict: true,
  zeroTrustEnabled: true,
  leastPrivilege: true,
  encryptionRequired: true,
  auditAllAccess: true,
  dataMinimization: true,
  anonymizationEnabled: true,
  pseudonymizationEnabled: true,
  dataResidencyEnforcement: true,
  consentRequired: true,
  retentionEnforcement: true,
};
```

---

## Security Audit Checklist

| Check | Frequency | Owner |
|-------|-----------|-------|
| Dependency scanning | Daily | CI/CD |
| Penetration testing | Quarterly | Security team |
| Code review | Per PR | Development team |
| RLS policy audit | Monthly | Security team |
| Access log review | Weekly | Security team |
| Encryption key rotation | Annually | Operations |
| Incident response drill | Quarterly | Security team |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_PRIVACY.md](GEDKIN_PRIVACY.md)
- [GEDKIN_RBAC.md](GEDKIN_RBAC.md)
- [SECURITY.md](SECURITY.md)
