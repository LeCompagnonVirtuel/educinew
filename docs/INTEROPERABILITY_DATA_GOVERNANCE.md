# Interoperability — Data Governance

> Version : 1.0
> Statut : Validé

---

## 1. Governance Framework

```
┌─────────────────────────────────────────────────────────┐
│                DATA GOVERNANCE MODEL                    │
├──────────────┬──────────────┬──────────────────────────┤
│  Policies    │  Standards   │  Procedures              │
├──────────────┴──────────────┴──────────────────────────┤
│                STEWARDSHIP LAYER                        │
├──────────────┬──────────────┬──────────────────────────┤
│  Data Owner  │  Data Steward│  Data Custodian          │
│  (School)    │  (Director)  │  (IT Admin)              │
├──────────────┴──────────────┴──────────────────────────┤
│                ACCOUNTABILITY LAYER                     │
├──────────────┬──────────────┬──────────────────────────┤
│  Quality     │  Compliance  │  Audit                   │
│  Monitoring  │  Reporting   │  Trail                   │
└──────────────┴──────────────┴──────────────────────────┘
```

---

## 2. Data Classification

| Class | Description | Examples | Controls |
|-------|-------------|----------|----------|
| PUBLIC | Information publique | School name, address | No restriction |
| INTERNAL | Usage interne | Class schedules, events | Auth required |
| CONFIDENTIAL | Données sensibles | Grades, attendance | Encryption + RLS |
| RESTRICTED | Données critiques | Medical, financial | MFA + Audit |
| PROHIBITED | Interdit | Passwords, secrets | Never stored as-is |

### 2.1 Classification Rules

```typescript
interface DataClassification {
  field: string;
  classification: "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "RESTRICTED";
  retention_days: number;
  encryption_required: boolean;
  audit_access: boolean;
  pii: boolean;
  shareable: boolean;
}

const CLASSIFICATION_MAP: DataClassification[] = [
  {
    field: "student.email",
    classification: "CONFIDENTIAL",
    retention_days: 2555, // 7 years
    encryption_required: true,
    audit_access: true,
    pii: true,
    shareable: false
  },
  {
    field: "student.grades",
    classification: "CONFIDENTIAL",
    retention_days: 3650, // 10 years
    encryption_required: true,
    audit_access: true,
    pii: true,
    shareable: true // with consent
  },
  {
    field: "course.name",
    classification: "INTERNAL",
    retention_days: -1, // indefinite
    encryption_required: false,
    audit_access: false,
    pii: false,
    shareable: true
  },
  {
    field: "student.medical_conditions",
    classification: "RESTRICTED",
    retention_days: 2555,
    encryption_required: true,
    audit_access: true,
    pii: true,
    shareable: false
  }
];
```

---

## 3. Data Sharing Policies

### 3.1 Sharing Matrix

```typescript
interface SharingPolicy {
  source_entity: string;
  target_entity: string;
  data_fields: string[];
  purpose: string;
  consent_required: boolean;
  legal_basis: "consent" | "contract" | "legal_obligation" | "legitimate_interest";
  retention_at_target: number;
  encryption_in_transit: boolean;
  encryption_at_rest: boolean;
}

const SHARING_POLICIES: SharingPolicy[] = [
  {
    source_entity: "school",
    target_entity: "parent",
    data_fields: ["student.grades", "student.attendance", "student.behavior"],
    purpose: "Suivi scolaire",
    consent_required: true,
    legal_basis: "legitimate_interest",
    retention_at_target: 365,
    encryption_in_transit: true,
    encryption_at_rest: true
  },
  {
    source_entity: "school",
    target_entity: "ministry",
    data_fields: ["student.enrollment", "course.completion", "teacher资质"],
    purpose: "Reporting obligatoire",
    consent_required: false,
    legal_basis: "legal_obligation",
    retention_at_target: 3650,
    encryption_in_transit: true,
    encryption_at_rest: true
  },
  {
    source_entity: "school",
    target_entity: "partner_lms",
    data_fields: ["student.id", "student.name", "course.id"],
    purpose: "Intégration pédagogique",
    consent_required: true,
    legal_basis: "consent",
    retention_at_target: 365,
    encryption_in_transit: true,
    encryption_at_rest: false
  }
];
```

### 3.2 Consent Management

```typescript
class ConsentManager {
  async recordConsent(params: {
    user_id: string;
    school_id: string;
    purpose: string;
    data_fields: string[];
    granted: boolean;
    expires_at?: string;
    ip_address: string;
  }): Promise<ConsentRecord> {
    const consent: ConsentRecord = {
      id: crypto.randomUUID(),
      user_id: params.user_id,
      school_id: params.school_id,
      purpose: params.purpose,
      data_fields: params.data_fields,
      granted: params.granted,
      granted_at: new Date().toISOString(),
      expires_at: params.expires_at,
      ip_address: params.ip_address,
      version: "1.0"
    };

    await this.supabase.from("consent_records").insert(consent);
    await this.auditLog("consent_recorded", consent);

    return consent;
  }

  async checkConsent(
    userId: string,
    schoolId: string,
    purpose: string,
    dataFields: string[]
  ): Promise<boolean> {
    const { data } = await this.supabase
      .from("consent_records")
      .select("*")
      .eq("user_id", userId)
      .eq("school_id", schoolId)
      .eq("purpose", purpose)
      .eq("granted", true)
      .gt("expires_at", new Date().toISOString())
      .order("granted_at", { ascending: false })
      .limit(1)
      .single();

    if (!data) return false;

    // Check all requested fields are covered
    return data.data_fields.includes("*") ||
           dataFields.every(f => data.data_fields.includes(f));
  }
}
```

---

## 4. Data Quality Rules

```typescript
interface QualityRule {
  id: string;
  entity_type: string;
  field: string;
  rule_type: "required" | "format" | "range" | "unique" | "reference" | "custom";
  params: Record<string, unknown>;
  severity: "error" | "warning" | "info";
  message: string;
}

const QUALITY_RULES: QualityRule[] = [
  {
    id: "qr_001",
    entity_type: "student",
    field: "email",
    rule_type: "format",
    params: { pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    severity: "error",
    message: "Email invalide"
  },
  {
    id: "qr_002",
    entity_type: "student",
    field: "date_of_birth",
    rule_type: "range",
    params: {
      min: "1990-01-01",
      max: "2020-12-31"
    },
    severity: "error",
    message: "Date de naissance hors limites raisonnables"
  },
  {
    id: "qr_003",
    entity_type: "grade",
    field: "score",
    rule_type: "range",
    params: { min: 0, max: 20 },
    severity: "error",
    message: "Note hors barème"
  },
  {
    id: "qr_004",
    entity_type: "student",
    field: "national_id",
    rule_type: "unique",
    params: { scope: "school_id" },
    severity: "warning",
    message: "Numéro national déjà utilisé dans cette école"
  }
];

class DataQualityEngine {
  async validate(
    entityType: string,
    record: Record<string, unknown>,
    schoolId: string
  ): Promise<QualityResult> {
    const rules = QUALITY_RULES.filter(r => r.entity_type === entityType);
    const errors: QualityIssue[] = [];
    const warnings: QualityIssue[] = [];

    for (const rule of rules) {
      const value = record[rule.field];
      const isValid = this.checkRule(rule, value, record, schoolId);

      if (!isValid) {
        const issue: QualityIssue = {
          rule_id: rule.id,
          field: rule.field,
          message: rule.message,
          value,
          severity: rule.severity
        };

        if (rule.severity === "error") errors.push(issue);
        else warnings.push(issue);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      score: this.calculateScore(rules.length, errors.length, warnings.length)
    };
  }
}
```

---

## 5. Retention & Deletion

```typescript
interface RetentionPolicy {
  entity_type: string;
  retention_days: number;
  deletion_method: "soft_delete" | "hard_delete" | "anonymize" | "archive";
  archive_after_days?: number;
  legal_hold: boolean;
}

const RETENTION_POLICIES: RetentionPolicy[] = [
  {
    entity_type: "student",
    retention_days: 2555, // 7 years after last enrollment
    deletion_method: "anonymize",
    archive_after_days: 730,
    legal_hold: false
  },
  {
    entity_type: "grade",
    retention_days: 3650, // 10 years
    deletion_method: "archive",
    archive_after_days: 1825,
    legal_hold: false
  },
  {
    entity_type: "attendance",
    retention_days: 1095, // 3 years
    deletion_method: "hard_delete",
    legal_hold: false
  },
  {
    entity_type: "audit_log",
    retention_days: -1, // Indefinite
    deletion_method: "archive",
    legal_hold: true
  }
];

class RetentionManager {
  async enforceRetention(schoolId: string): Promise<RetentionResult> {
    const result: RetentionResult = { processed: 0, deleted: 0, archived: 0, anonymized: 0 };

    for (const policy of RETENTION_POLICIES) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - policy.retention_days);

      const expired = await this.findExpiredRecords(
        policy.entity_type,
        schoolId,
        cutoffDate
      );

      for (const record of expired) {
        switch (policy.deletion_method) {
          case "hard_delete":
            await this.hardDelete(record);
            result.deleted++;
            break;
          case "soft_delete":
            await this.softDelete(record);
            result.deleted++;
            break;
          case "anonymize":
            await this.anonymize(record);
            result.anonymized++;
            break;
          case "archive":
            await this.archive(record);
            result.archived++;
            break;
        }

        result.processed++;
      }
    }

    return result;
  }

  private async anonymize(record: Record<string, unknown>): Promise<void> {
    const anonymized = {
      ...record,
      first_name: "ANONYMIZED",
      last_name: "ANONYMIZED",
      email: `deleted_${record.id}@anonymized.local`,
      phone: null,
      address: null,
      national_id: null,
      date_of_birth: null,
      photo_url: null,
      anonymized_at: new Date().toISOString()
    };

    await this.supabase
      .from(record._table)
      .update(anonymized)
      .eq("id", record.id);
  }
}
```

---

## 6. GDPR / ANP Compliance

```typescript
class ComplianceChecker {
  async generateComplianceReport(schoolId: string): Promise<ComplianceReport> {
    return {
      school_id: schoolId,
      generated_at: new Date().toISOString(),
      checks: {
        data_inventory: await this.checkDataInventory(schoolId),
        consent_status: await this.checkConsentStatus(schoolId),
        retention_compliance: await this.checkRetentionCompliance(schoolId),
        encryption_status: await this.checkEncryptionStatus(schoolId),
        access_controls: await this.checkAccessControls(schoolId),
        breach_readiness: await this.checkBreachReadiness(schoolId),
        dpia_status: await this.checkDPIAStatus(schoolId)
      },
      overall_score: 0, // Calculated
      recommendations: []
    };
  }

  async handleDataSubjectRequest(
    userId: string,
    request_type: "access" | "rectification" | "erasure" | "portability"
  ): Promise<DSRResult> {
    // Log the request
    await this.logDSR(userId, request_type);

    switch (request_type) {
      case "access":
        return this.processAccessRequest(userId);
      case "rectification":
        return this.processRectificationRequest(userId);
      case "erasure":
        return this.processErasureRequest(userId);
      case "portability":
        return this.processPortabilityRequest(userId);
    }
  }
}
```

---

## 7. Database Schema

```sql
CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  school_id UUID NOT NULL REFERENCES schools(id),
  purpose TEXT NOT NULL,
  data_fields TEXT[] NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  ip_address INET,
  version TEXT NOT NULL DEFAULT '1.0'
);

CREATE TABLE data_quality_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  entity_type TEXT NOT NULL,
  record_id UUID,
  rule_id TEXT NOT NULL,
  severity TEXT NOT NULL,
  message TEXT NOT NULL,
  field TEXT,
  value JSONB,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE retention_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  entity_type TEXT NOT NULL,
  action TEXT NOT NULL,
  records_affected INTEGER NOT NULL,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  executed_by UUID REFERENCES users(id)
);

CREATE INDEX idx_consent_user ON consent_records(user_id, school_id, purpose);
CREATE INDEX idx_quality_log_school ON data_quality_log(school_id, entity_type, checked_at DESC);
CREATE INDEX idx_retention_log ON retention_log(school_id, executed_at DESC);
```
