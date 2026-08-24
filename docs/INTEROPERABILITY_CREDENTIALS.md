# Interoperability — Credentials & Certifications

> Version : 1.0
> Statut : Validé

---

## 1. Credentials Architecture

```
┌─────────────────────────────────────────────────┐
│              CREDENTIALS SYSTEM                  │
├─────────────┬──────────────┬────────────────────┤
│   Issuance  │  Verification │   Revocation       │
│   Engine    │  Service      │   Registry         │
└──────┬──────┴───────┬──────┴────────┬───────────┘
       │              │               │
       ▼              ▼               ▼
┌─────────────────────────────────────────────────┐
│              CREDENTIAL STORE                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐│
│  │credentials │  │ revocations │  │ verify_logs ││
│  └────────────┘  └────────────┘  └────────────┘│
└─────────────────────────────────────────────────┘
```

---

## 2. Credential Types

| Type | Format | Standards | Usage |
|------|--------|-----------|-------|
| Student ID | W3C VC | DID | Identification |
| Grade Certificate | W3C VC | JSON-LD | Résultats |
| Attendance Proof | W3C VC | JWT | Présence |
| Teacher License | W3C VC | DID | Qualification |
| Achievement Badge | Open Badges 3 | JSON-LD | Récompenses |

---

## 3. W3C Verifiable Credentials

### 3.1 Issue Credential

```typescript
interface Credential {
  "@context": string[];
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: {
    id: string;
    [key: string]: unknown;
  };
  credentialSchema?: {
    id: string;
    type: string;
  };
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
  };
}

class CredentialIssuer {
  private keyStore: KeyStore;

  async issueCredential(params: {
    type: string[];
    subject_id: string;
    subject_did: string;
    claims: Record<string, unknown>;
    expiration?: string;
    schema_id?: string;
  }): Promise<Credential> {
    // 1. Build credential
    const credential: Credential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      type: ["VerifiableCredential", ...params.type],
      issuer: "did:web:educi.com",
      issuanceDate: new Date().toISOString(),
      expirationDate: params.expiration,
      credentialSubject: {
        id: params.subject_did,
        ...params.claims
      }
    };

    if (params.schema_id) {
      credential.credentialSchema = {
        id: params.schema_id,
        type: "JsonSchemaValidator2018"
      };
    }

    // 2. Sign with school key
    const proof = await this.signCredential(credential);
    credential.proof = proof;

    // 3. Store
    await this.storeCredential(credential);

    return credential;
  }

  private async signCredential(credential: Credential): Promise<Credential["proof"]> {
    const key = await this.keyStore.getSigningKey(credential.issuer);

    const proofOptions = {
      "@context": "https://w3id.org/security/v2",
      type: "Ed25519Signature2018",
      created: new Date().toISOString(),
      verificationMethod: `${credential.issuer}#key-1`,
      proofPurpose: "assertionMethod"
    };

    const proofValue = await key.sign(
      canonicalize(credential) + canonicalize(proofOptions)
    );

    return {
      ...proofOptions,
      proofValue: Buffer.from(proofValue).toString("base64")
    };
  }
}
```

### 3.2 Verify Credential

```typescript
class CredentialVerifier {
  async verify(credential: Credential): Promise<VerificationResult> {
    const errors: string[] = [];

    // 1. Validate structure
    if (!credential["@context"]?.includes("https://www.w3.org/2018/credentials/v1")) {
      errors.push("Invalid @context");
    }

    // 2. Check expiration
    if (credential.expirationDate) {
      if (new Date(credential.expirationDate) < new Date()) {
        errors.push("Credential expired");
      }
    }

    // 3. Check revocation
    const isRevoked = await this.checkRevocation(credential);
    if (isRevoked) {
      errors.push("Credential has been revoked");
    }

    // 4. Verify proof
    const proofValid = await this.verifyProof(credential);
    if (!proofValid) {
      errors.push("Invalid proof signature");
    }

    // 5. Validate schema if present
    if (credential.credentialSchema) {
      const schemaValid = await this.validateSchema(
        credential.credentialSubject,
        credential.credentialSchema.id
      );
      if (!schemaValid) {
        errors.push("Does not match credential schema");
      }
    }

    return {
      verified: errors.length === 0,
      errors,
      credential
    };
  }

  private async checkRevocation(credential: Credential): Promise<boolean> {
    const { data } = await this.supabase
      .from("credential_revocations")
      .select("id")
      .eq("credential_id", credential.id)
      .single();

    return !!data;
  }
}
```

---

## 4. Open Badges 3.0

```typescript
class BadgeIssuer {
  async issueBadge(params: {
    badge_class_id: string;
    recipient_email: string;
    achievement: {
      name: string;
      description: string;
      criteria?: string;
    };
    evidence?: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }): Promise<OpenBadge> {
    const badge: OpenBadge = {
      "@context": [
        "https://w3id.org/openbadges/v3",
        "https://w3id.org/security/bbs/v1"
      ],
      type: "VerifiableCredential",
      issuer: {
        type: "Profile",
        name: "EduCI School",
        url: "https://educi.com",
        image: "https://educi.com/logo.png"
      },
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        type": "Achievement",
        name: params.achievement.name,
        description: params.achievement.description,
        criteria: params.achievement.criteria,
        image: `https://educi.com/badges/${params.badge_class_id}.png`
      },
      evidence: params.evidence,
      credentialStatus: {
        id: `https://educi.com/badges/status/${crypto.randomUUID()}`,
        type": "RevocationList2020"
      }
    };

    return this.credentialIssuer.issueCredential({
      type: ["OpenBadgeCredential"],
      subject_id: params.recipient_email,
      subject_did: await this.resolveDID(params.recipient_email),
      claims: badge.credentialSubject as Record<string, unknown>
    });
  }
}
```

---

## 5. API Endpoints

### 5.1 Issue Credential

```http
POST /api/v1/interop/credentials/issue
```

**Request Body:**
```json
{
  "type": ["GradeCertificate"],
  "school_id": "school_123",
  "subject": {
    "student_id": "student_456",
    "student_did": "did:web:educi.com:student:456"
  },
  "claims": {
    "course": "Mathématiques",
    "grade": "6ème",
    "period": "2025-2026",
    "score": 85,
    "max_score": 100,
    "mention": "Bien"
  },
  "expiration": "2030-08-07T00:00:00Z"
}
```

**Response 201:**
```json
{
  "id": "cred_abc123",
  "credential": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiableCredential", "GradeCertificate"],
    "issuer": "did:web:educi.com",
    "issuanceDate": "2026-08-07T14:00:00Z",
    "expirationDate": "2030-08-07T00:00:00Z",
    "credentialSubject": {
      "id": "did:web:educi.com:student:456",
      "course": "Mathématiques",
      "grade": "6ème",
      "score": 85
    },
    "proof": {
      "type": "Ed25519Signature2018",
      "proofValue": "z58DAdF..."
    }
  },
  "verification_url": "https://educi.com/verify/cred_abc123"
}
```

### 5.2 Verify Credential

```http
POST /api/v1/interop/credentials/verify
```

**Request Body:**
```json
{
  "credential": { ... },
  "options": {
    "check_revocation": true,
    "check_expiration": true,
    "check_schema": true
  }
}
```

**Response 200:**
```json
{
  "verified": true,
  "checks": {
    "structure": "passed",
    "expiration": "passed",
    "revocation": "passed",
    "signature": "passed",
    "schema": "passed"
  },
  "credential": { ... }
}
```

### 5.3 Revoke Credential

```http
POST /api/v1/interop/credentials/revoke
```

**Request Body:**
```json
{
  "credential_id": "cred_abc123",
  "reason": "Grade correction required"
}
```

---

## 6. DID Registry

```typescript
interface DIDDocument {
  "@context": string[];
  id: string;
  controller: string;
  verificationMethod: Array<{
    id: string;
    type: string;
    controller: string;
    publicKeyMultibase?: string;
    publicKeyJwk?: Record<string, unknown>;
  }>;
  authentication: string[];
  assertionMethod: string[];
}

class DIDRegistry {
  async createDID(schoolId: string): Promise<DIDDocument> {
    const did = `did:web:educi.com:school:${schoolId}`;
    const keyPair = await this.generateKeyPair();

    const doc: DIDDocument = {
      "@context": ["https://www.w3.org/ns/did/v1"],
      id: did,
      controller: did,
      verificationMethod: [{
        id: `${did}#key-1`,
        type: "Ed25519VerificationKey2018",
        controller: did,
        publicKeyMultibase: keyPair.publicKeyMultibase
      }],
      authentication: [`${did}#key-1`],
      assertionMethod: [`${did}#key-1`]
    };

    await this.storeDID(doc);
    await this.publishDID(doc);

    return doc;
  }

  async resolveDID(did: string): Promise<DIDDocument> {
    if (did.startsWith("did:web:")) {
      return this.resolveWebDID(did);
    }
    return this.resolveFromStore(did);
  }
}
```

---

## 7. Database Schema

```sql
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  type TEXT[] NOT NULL,
  subject_did TEXT NOT NULL,
  issuer_did TEXT NOT NULL,
  claims JSONB NOT NULL,
  proof JSONB NOT NULL,
  expiration_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','revoked','expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE credential_revocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credential_id UUID NOT NULL REFERENCES credentials(id),
  reason TEXT NOT NULL,
  revoked_by UUID NOT NULL REFERENCES users(id),
  revoked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE did_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  did TEXT NOT NULL UNIQUE,
  document JSONB NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_credentials_subject ON credentials(subject_did);
CREATE INDEX idx_credentials_school ON credentials(school_id, status);
CREATE INDEX idx_credentials_status ON credentials(status, expiration_date);
```
