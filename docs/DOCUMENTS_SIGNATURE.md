# Document Digital Signature Documentation

## Overview

The Digital Signature feature provides comprehensive electronic and digital signature workflows with certificate management, validation, chain of custody, and legal compliance. It supports multiple signature types, bulk signing, and integration with timestamp authorities.

---

## Signature Types

### Electronic Signature

| Property | Description |
|----------|-------------|
| Implementation | Click-to-sign |
| Legal Status | Contractual binding |
| Verification | Visual comparison |
| Storage | Image + metadata |
| Use Cases | Internal documents, approvals |

### Digital Signature

| Property | Description |
|----------|-------------|
| Implementation | Certificate-based (X.509) |
| Legal Status | Legally binding |
| Verification | Cryptographic verification |
| Storage | Certificate + encrypted hash |
| Use Cases | Contracts, legal documents |

### Handwritten Signature

| Property | Description |
|----------|-------------|
| Implementation | Image upload/capture |
| Legal Status | Contractual binding |
| Verification | Visual comparison |
| Storage | Image + metadata |
| Use Cases | Personal documents |

### Biometric Signature

| Property | Description |
|----------|-------------|
| Implementation | Touch/mouse dynamics |
| Legal Status | Enhanced legal standing |
| Verification | Behavioral analysis |
| Storage | Biometric data + hash |
| Use Cases | High-security documents |

---

## Signature Workflows

### Simple Signature

```
Document Owner
  → Request Signature
    → Signer Receives Notification
      → Signer Reviews Document
        → Signer Signs
          → Signature Applied
            → Document Owner Notified
```

### Sequential Signature

```
Signer 1 (Order: 1)
  → Signs Document
    → Signer 2 (Order: 2) Notified
      → Signs Document
        → Signer 3 (Order: 3) Notified
          → Signs Document
            → All Signatures Complete
              → Document Finalized
```

### Parallel Signature

```
All Signers Notified Simultaneously
  → Signer 1 Signs
  → Signer 2 Signs
  → Signer 3 Signs
    → All Signatures Complete
      → Document Finalized
```

### Approval + Signature

```
Approver Reviews
  → Approves Document
    → Signer Notified
      → Signs Document
        → Signature Applied
          → Document Finalized
```

---

## Certificate Management

### Certificate Types

| Type | Description | Use Case |
|------|-------------|----------|
| Self-Signed | User-generated | Internal documents |
| Organization | Organization-issued | Business documents |
| CA-Signed | Certificate Authority | Legal documents |
| HSM | Hardware Security Module | High-security |

### Certificate Properties

```typescript
interface Certificate {
  id: string;
  subject: string;
  issuer: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  publicKey: string;
  signatureAlgorithm: string;
  keySize: number;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
}
```

### Certificate Lifecycle

```
Certificate Request
  → Validation
    → Issuance
      → Active Use
        → Renewal (before expiry)
          → New Certificate
            → Old Certificate Retired
```

### Certificate Storage

| Storage | Description |
|---------|-------------|
| Software | Encrypted file storage |
| HSM | Hardware Security Module |
| Cloud HSM | Cloud-based HSM |
| Smart Card | Physical smart card |

---

## Signature Validation

### Validation Process

```
Signature Data
  → Extract Certificate
    → Verify Certificate Chain
      → Check Certificate Validity
        → Verify Document Hash
          → Confirm Signer Identity
            → Verify Timestamp
              → Return Result
```

### Validation Results

| Status | Description |
|--------|-------------|
| `VALID` | Signature is valid |
| `INVALID` | Signature is invalid |
| `EXPIRED` | Certificate has expired |
| `REVOKED` | Certificate has been revoked |
| `UNKNOWN` | Cannot verify signature |

### Validation Response

```json
{
  "signatureId": "sig_001",
  "valid": true,
  "status": "VALID",
  "signer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "certificate": {
    "subject": "CN=John Doe, O=Acme School",
    "issuer": "CN=Acme CA",
    "validFrom": "2026-01-01T00:00:00Z",
    "validTo": "2027-01-01T00:00:00Z",
    "status": "ACTIVE"
  },
  "document": {
    "hash": "sha256:abc123...",
    "verified": true
  },
  "timestamp": {
    "time": "2026-01-15T10:30:00Z",
    "authority": "Acme TSA",
    "verified": true
  },
  "validatedAt": "2026-01-15T12:00:00Z"
}
```

---

## Chain of Custody

### Custody Events

| Event | Description |
|-------|-------------|
| `CREATED` | Document created |
| `MODIFIED` | Document modified |
| `SIGNED` | Document signed |
| `APPROVED` | Document approved |
| `TRANSFERRED` | Document transferred |
| `ARCHIVED` | Document archived |
| `DELETED` | Document deleted |

### Custody Record

```json
{
  "eventId": "custody_001",
  "documentId": "doc_123",
  "event": "SIGNED",
  "userId": "user_002",
  "timestamp": "2026-01-15T10:30:00Z",
  "details": {
    "signatureId": "sig_001",
    "certificateId": "cert_001",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  },
  "documentHash": "sha256:abc123...",
  "previousHash": "sha256:def456..."
}
```

### Custody Chain Verification

```
Document Hash Chain
  → Verify Each Hash
    → Check Signature
      → Validate Timestamp
        → Confirm Integrity
          → Return Chain Status
```

---

## Timestamp Integration

### Timestamp Authority (TSA)

| Property | Description |
|----------|-------------|
| Protocol | RFC 3161 |
| Authority | Acme TSA / Custom |
| Accuracy | 1 second |
| Trust Chain | CA-issued |

### Timestamp Properties

```typescript
interface Timestamp {
  id: string;
  signatureId: string;
  time: string;
  authority: string;
  certificate: string;
  serialNumber: string;
  status: 'VALID' | 'INVALID' | 'EXPIRED';
}
```

### Timestamp Flow

```
Signature Applied
  → Request Timestamp
    → TSA Validates Request
      → TSA Signs Timestamp
        → Timestamp Returned
          → Timestamp Attached to Signature
```

---

## Legal Compliance

### eIDAS Regulation

| Requirement | Implementation |
|-------------|---------------|
| Advanced Electronic Signature | Certificate-based |
| Qualified Certificate | CA-issued certificates |
| Trust Services | Timestamp authority |
| Audit Trail | Comprehensive logging |
| Long-term Validation | Archive with timestamps |

### ESIGN Act

| Requirement | Implementation |
|-------------|---------------|
| Intent to Sign | Explicit sign action |
| Consent to E-Sign | User agreement |
| Record Retention | 7-year minimum |
| Access to Records | Export capability |
| Non-Repudiation | Certificate verification |

### UETA Compliance

| Requirement | Implementation |
|-------------|---------------|
| Agreement | User consent |
| Attribution | Identity verification |
| Record Keeping | Audit trail |
| Integrity | Hash verification |

---

## Bulk Signing

### Bulk Sign Configuration

```json
{
  "documentIds": ["doc_001", "doc_002", "doc_003"],
  "signatureType": "ELECTRONIC",
  "signatureImage": "base64-image",
  "certificateId": "cert_001",
  "position": {
    "page": -1,
    "x": 100,
    "y": 500,
    "width": 200,
    "height": 50
  }
}
```

### Bulk Sign Status

```json
{
  "bulkId": "bulk_001",
  "total": 3,
  "completed": 2,
  "failed": 1,
  "status": "PARTIAL",
  "results": [
    {
      "documentId": "doc_001",
      "status": "SIGNED",
      "signatureId": "sig_001"
    },
    {
      "documentId": "doc_002",
      "status": "SIGNED",
      "signatureId": "sig_002"
    },
    {
      "documentId": "doc_003",
      "status": "FAILED",
      "error": "Document locked"
    }
  ]
}
```

---

## API Reference

### Request Signature

```
POST /api/documents/signatures/request
```

**Request Body:**
```json
{
  "documentId": "doc_123",
  "signers": [
    {
      "userId": "user_002",
      "role": "APPROVER",
      "order": 1,
      "email": "signer@example.com"
    }
  ],
  "message": "Please sign the contract",
  "expiresAt": "2026-02-15T00:00:00Z",
  "reminderDays": 3
}
```

**Response:**
```json
{
  "signatureRequest": {
    "id": "req_001",
    "documentId": "doc_123",
    "status": "PENDING",
    "signers": [
      {
        "userId": "user_002",
        "status": "PENDING",
        "token": "sign_token_abc123"
      }
    ],
    "createdAt": "2026-01-15T10:30:00Z",
    "expiresAt": "2026-02-15T00:00:00Z"
  }
}
```

### Sign Document

```
POST /api/documents/signatures/sign
```

**Request Body:**
```json
{
  "signatureId": "sig_001",
  "signature": "base64-signature-image",
  "certificate": "certificate-data",
  "pin": "1234",
  "position": {
    "page": 1,
    "x": 100,
    "y": 500,
    "width": 200,
    "height": 50
  }
}
```

**Response:**
```json
{
  "signature": {
    "id": "sig_001",
    "documentId": "doc_123",
    "signerId": "user_002",
    "status": "SIGNED",
    "signedAt": "2026-01-15T10:35:00Z",
    "certificate": {
      "id": "cert_001",
      "validTo": "2027-01-01T00:00:00Z"
    },
    "timestamp": {
      "time": "2026-01-15T10:35:00Z",
      "authority": "Acme TSA"
    }
  }
}
```

### Verify Signature

```
GET /api/documents/signatures/verify/[id]
```

**Response:**
```json
{
  "signatureId": "sig_001",
  "valid": true,
  "status": "VALID",
  "signer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "certificate": {
    "status": "ACTIVE",
    "validTo": "2027-01-01T00:00:00Z"
  },
  "document": {
    "hash": "sha256:abc123...",
    "verified": true
  },
  "timestamp": {
    "verified": true
  }
}
```

### Revoke Signature

```
POST /api/documents/signatures/[id]/revoke
```

**Request Body:**
```json
{
  "reason": "Document needs corrections",
  "comments": "Please review section 3"
}
```

### Get Certificate

```
GET /api/documents/signatures/certificate/[id]
```

**Response:**
```json
{
  "certificate": {
    "id": "cert_001",
    "subject": "CN=John Doe, O=Acme School",
    "issuer": "CN=Acme CA",
    "serialNumber": "1234567890",
    "validFrom": "2026-01-01T00:00:00Z",
    "validTo": "2027-01-01T00:00:00Z",
    "keySize": 2048,
    "signatureAlgorithm": "SHA256withRSA",
    "status": "ACTIVE"
  }
}
```

### Bulk Sign

```
POST /api/documents/signatures/bulk
```

**Request Body:**
```json
{
  "documentIds": ["doc_001", "doc_002", "doc_003"],
  "signatureType": "ELECTRONIC",
  "signatureImage": "base64-signature",
  "position": {
    "page": -1,
    "x": 100,
    "y": 500,
    "width": 200,
    "height": 50
  }
}
```

### Get Signature Status

```
GET /api/documents/signatures/[id]/status
```

### Get Signature History

```
GET /api/documents/signatures/history/[documentId]
```

### Send Reminder

```
POST /api/documents/signatures/[id]/remind
```

### Get Pending Signatures

```
GET /api/documents/signatures/pending
```

---

## Configuration

### Signature Settings

```typescript
signatures: {
  provider: 'docusign',
  maxSigners: 10,
  expirationDays: 30,
  reminderIntervalDays: 3,
  signatureTypes: ['ELECTRONIC', 'DIGITAL', 'HANDWRITTEN', 'BIOMETRIC'],
  certificates: {
    issuer: 'Acme CA',
    keySize: 2048,
    validityYears: 1,
    algorithm: 'SHA256withRSA'
  },
  timestamp: {
    authority: 'Acme TSA',
    protocol: 'RFC3161',
    accuracy: 1
  },
  position: {
    defaultPage: 1,
    defaultX: 100,
    defaultY: 500,
    defaultWidth: 200,
    defaultHeight: 50
  },
  validation: {
    verifyCertificate: true,
    verifyTimestamp: true,
    verifyHash: true,
    allowExpired: false
  }
}
```

### Performance Metrics

| Metric | Target |
|--------|--------|
| Signature request | < 1s |
| Sign document | < 5s |
| Verify signature | < 2s |
| Bulk sign (10 docs) | < 30s |
| Certificate generation | < 3s |

---

## Error Handling

| Error | Code | Description |
|-------|------|-------------|
| `SIGNATURE_NOT_FOUND` | 404 | Signature not found |
| `DOCUMENT_LOCKED` | 409 | Document is locked |
| `CERTIFICATE_EXPIRED` | 400 | Certificate has expired |
| `CERTIFICATE_REVOKED` | 400 | Certificate has been revoked |
| `INVALID_PIN` | 401 | Invalid PIN provided |
| `SIGNATURE_EXPIRED` | 408 | Signature request expired |
| `MAX_SIGNERS_EXCEEDED` | 400 | Too many signers |
| `SIGNATURE_FAILED` | 500 | Signature creation failed |
| `VERIFICATION_FAILED` | 500 | Signature verification failed |

---

## Security Considerations

### Security Measures

| Measure | Implementation |
|---------|---------------|
| Certificate Storage | HSM / Encrypted |
| PIN Protection | Required for signing |
| Audit Trail | All operations logged |
| Non-Repudiation | Cryptographic proof |
| Document Integrity | Hash verification |
| Timestamp Verification | TSA validation |

### Threat Mitigations

| Threat | Mitigation |
|--------|------------|
| Forgery | Certificate verification |
| Tampering | Hash verification |
| Repudiation | Audit trail + timestamps |
| Identity Theft | Multi-factor authentication |
| Certificate Theft | HSM storage |

---

## Best Practices

### For Signers

1. **Verify Document** — Review before signing
2. **Use Strong PIN** — Use complex PINs
3. **Keep Certificates Secure** — Protect private keys
4. **Understand Implications** — Know what you're signing
5. **Save Confirmations** — Keep signing receipts

### For Administrators

1. **Monitor Signatures** — Track pending signatures
2. **Manage Certificates** — Rotate expired certificates
3. **Review Audit Logs** — Regular security reviews
4. **Test Workflows** — Verify signature workflows
5. **Train Users** — Educate on signature processes

### For Developers

1. **Validate Inputs** — Verify signature data
2. **Handle Errors** — Graceful error handling
3. **Log Operations** — Comprehensive audit trail
4. **Verify Certificates** — Always validate certificates
5. **Use Timestamps** — Add timestamps to signatures
