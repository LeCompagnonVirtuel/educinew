# Security Documentation — EduCI Phase 4.0

**Version:** 4.0.0  
**Status:** Active  
**Last Updated:** 2026-08-06

---

## Overview

This document describes the security architecture, policies, and practices implemented in EduCI to protect data, users, and systems.

---

## Security Architecture

### Defense in Depth

```
┌─────────────────────────────────────┐
│  Layer 1: Network Security          │
├─────────────────────────────────────┤
│  Layer 2: Application Security      │
├─────────────────────────────────────┤
│  Layer 3: Data Security             │
├─────────────────────────────────────┤
│  Layer 4: Access Control            │
├─────────────────────────────────────┤
│  Layer 5: Monitoring & Response     │
└─────────────────────────────────────┘
```

---

## OWASP Top 10 Mitigations

| Risk | Mitigation |
|------|-----------|
| Broken Access Control | RBAC + RLS enforced |
| Cryptographic Failures | AES-256 + TLS 1.3 |
| Injection | Parameterized queries + Zod validation |
| Insecure Design | Threat modeling in design phase |
| Security Misconfiguration | Automated config checks |
| Vulnerable Components | Dependency scanning |
| Auth Failures | MFA + rate limiting |
| Data Integrity | HMAC signing + audit logs |
| Logging Failures | Centralized logging |
| SSRF | Input validation + allowlisting |

---

## Authentication

### Supabase Auth Configuration

- JWT tokens with short expiry (15 minutes)
- Refresh token rotation
- Email verification required
- Password complexity enforcement
- Account lockout after 5 failed attempts

### Multi-Factor Authentication

| Method | Availability |
|--------|-------------|
| TOTP (Authenticator App) | All users |
| SMS OTP | Where supported |
| Email OTP | Backup method |

---

## Authorization

### RBAC Implementation

```typescript
interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
  conditions?: Record<string, unknown>;
}
```

### Role Hierarchy

```
SUPER_ADMIN → ADMIN → DIRECTEUR → SECRETAIRE
                                  → COMPTABLE
                                  → ENSEIGNANT
                                  → SURVEILLANT
                                  → PARENT
                                  → ELEVE
```

---

## Row Level Security (RLS)

All tables enforce:

```sql
CREATE POLICY school_isolation ON table_name
  USING (school_id = auth.school_id());
```

### RLS Rules

- Every query filtered by `school_id`
- Admin override requires audit logging
- No bypass allowed without explicit authorization
- Regular RLS policy audits

---

## Data Protection

### Encryption

| State | Method |
|-------|--------|
| At Rest | AES-256 via Supabase |
| In Transit | TLS 1.3 |
| Backups | Encrypted with separate keys |
| Secrets | Supabase Vault |

### Data Classification

| Level | Examples | Protection |
|-------|---------|-----------|
| Public | School name, address | Basic |
| Internal | Staff directory | Authentication |
| Confidential | Student grades | RBAC + encryption |
| Restricted | Medical records | MFA + audit |

---

## API Security

### Required Headers

```
Authorization: Bearer <jwt>
Content-Type: application/json
X-School-ID: <uuid>
```

### Rate Limiting

| Endpoint Type | Limit |
|--------------|-------|
| Authentication | 5/minute |
| Read operations | 100/minute |
| Write operations | 50/minute |
| AI operations | 20/minute |

### Input Validation

- Zod schema validation on all endpoints
- SQL injection prevention via parameterized queries
- XSS prevention via output encoding
- CSRF protection via token validation

---

## Webhook Security

### Money Fusion Webhooks

```typescript
function validateWebhook(payload: string, signature: string): boolean {
  const expected = hmacSHA256(payload, WEBHOOK_SECRET);
  return timingSafeEqual(signature, expected);
}
```

- HMAC SHA-256 signature validation
- Timestamp validation (5-minute window)
- Replay attack prevention
- Idempotency key enforcement

---

## Security Monitoring

### Logging

All security events logged:

- Authentication attempts
- Authorization failures
- Data access anomalies
- Configuration changes
- API abuse patterns

### Alerting

| Alert | Severity | Response |
|-------|----------|---------|
| Brute force attempt | High | Account lockout |
| Unusual data access | High | Admin notification |
| Failed MFA | Medium | Review required |
| Rate limit exceeded | Medium | Temporary block |

---

## Incident Response

### Process

1. **Detection** — Automated or manual identification
2. **Assessment** — Severity and scope evaluation
3. **Containment** — Immediate threat mitigation
4. **Eradication** — Root cause removal
5. **Recovery** — System restoration
6. **Lessons Learned** — Process improvement

---

## Compliance

| Standard | Status |
|----------|--------|
| OWASP Top 10 | Full compliance |
| FERPA | Student data protection |
| COPPA | Children's privacy |
| GDPR | Where applicable |

---

## Security Checklist

- [ ] All endpoints require authentication
- [ ] RLS enabled on all tables
- [ ] Secrets never in client code
- [ ] Input validation on all APIs
- [ ] Rate limiting configured
- [ ] Audit logging enabled
- [ ] Dependencies scanned
- [ ] HTTPS enforced

---

## Related Documentation

- [AI_GOVERNANCE.md](AI_GOVERNANCE.md) — AI Governance Platform
- [API.md](API.md) — API Documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) — Deployment Guide
