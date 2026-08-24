# GEGIN Identity Management

## Phase 4.2 - Global Education Intelligence Network

---

## 1. Overview

Handles cross-institutional identity federation, enabling single sign-on (SSO)
and unified credentials across GEGIN partner institutions.

---

## 2. Identity Model

### 2.1 Identity Types

| Type | Description | Federation |
|------|-------------|------------|
| Student | Current enrollment | Full SSO |
| Teacher | Active employment | Full SSO |
| Admin | Administrative staff | Full SSO |
| Alumni | Graduated former student | Limited SSO |
| External | Guest or partner | Scoped access |

### 2.2 Identity Schema

```typescript
interface GEGINIdentity {
  id: string;
  globalUserId: string;
  localIds: LocalIdentity[];
  primaryInstitution: string;
  federated: boolean;
  attributes: IdentityAttributes;
  credentials: CredentialInfo[];
  status: IdentityStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface LocalIdentity {
  institutionId: string;
  localUserId: string;
  role: string;
  syncedAt: Date;
}
```

---

## 3. Federation Protocol

### 3.1 SSO Architecture

```
User → Identity Provider (IdP) → GEGIN Gateway → Service Provider (SP)
```

### 3.2 Supported Protocols

- **SAML 2.0**: Enterprise institution integration
- **OpenID Connect**: Modern web application SSO
- **OAuth 2.0**: API authentication and authorization

### 3.3 Trust Chain

1. Root CA issues institution certificates
2. Institution registers IdP with GEGIN
3. GEGIN validates IdP metadata
4. Trust established for user assertions

---

## 4. Global User ID

### 4.1 Generation Rules

- UUID v7 format (time-ordered)
- Immutable once created
- No PII in the identifier
- Cross-institutional uniqueness guaranteed

### 4.2 Attribute Mapping

| GEGIN Attribute | Source | Priority |
|-----------------|--------|----------|
| firstName | Primary institution | High |
| lastName | Primary institution | High |
| email | Verified email | Critical |
| dateOfBirth | Verified records | High |
| nationality | Government ID | Medium |

---

## 5. Credential Management

### 5.1 Credential Types

- **Password**: Standard authentication
- **MFA Token**: TOTP or hardware key
- **Biometric**: Fingerprint or face (mobile)
- **Certificate**: X.509 for API access
- **Passkey**: WebAuthn/FIDO2

### 5.2 Password Policy

- Minimum 12 characters
- Complexity requirements enforced
- Breach database checking
- Rotation: 90 days (configurable)

---

## 6. Session Management

### 6.1 Session Properties

- Max session duration: 24 hours
- Idle timeout: 30 minutes
- Concurrent session limit: 5
- Cross-institution session sharing

### 6.2 Session Tokens

```
Format: JWT (RS256 signed)
Claims: sub, institutions[], roles[], permissions[]
Expiry: Short-lived (1 hour)
Refresh: Sliding window
```

---

## 7. Attribute Verification

### 7.1 Verification Levels

| Level | Method | Trust Score |
|-------|--------|-------------|
| Basic | Email verification | 0.3 |
| Standard | ID document upload | 0.6 |
| Enhanced | Government ID check | 0.9 |
| Premium | In-person verification | 1.0 |

### 7.2 Verification Process

1. User submits document
2. Automated OCR extraction
3. AI-powered document validation
4. Manual review (if needed)
5. Trust score updated

---

## 8. Privacy & Consent

### 8.1 Consent Requirements

- Explicit consent for data sharing
- Granular consent per attribute
- Consent withdrawal supported
- Audit trail for all consent changes

### 8.2 Data Minimization

- Share only required attributes
- Attribute hiding for sensitive fields
- Time-limited attribute access
- Purpose-bound data release

---

## 9. Recovery & Revocation

### 9.1 Account Recovery

1. Identity proofing at primary institution
2. Global identity re-verification
3. Cross-institution credential reset
4. Session invalidation across all institutions

### 9.2 Revocation Process

```
Revocation Request → Verification → Confirmation → Global Invalidation
```

---

## 10. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/gegin/identity/federate` | Initiate SSO |
| POST | `/gegin/identity/assertion` | Process assertion |
| GET | `/gegin/identity/verify/:id` | Verify identity |
| PATCH | `/gegin/identity/attributes` | Update attributes |
| POST | `/gegin/identity/revoke` | Revoke credentials |
| GET | `/gegin/identity/audit` | Audit trail |
