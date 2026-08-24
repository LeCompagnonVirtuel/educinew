# Infirmerie Documentation

## Executive Summary

The Medical module (Infirmerie) manages student health records, sick bay visits, medication administration, vaccination tracking, and emergency medical protocols. It provides school nurses with a comprehensive health management system while maintaining strict privacy compliance with healthcare data regulations.

The system stores medical history, allergy information, emergency contacts, and authorized medications. It generates vaccination compliance reports for enrollment verification and tracks communicable disease incidents for public health reporting.

Medical data handling follows the highest security standards with field-level encryption, role-based access, and detailed audit logging. Emergency protocols trigger multi-channel notifications to parents and administration simultaneously.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│           Medical Service                │
├──────────┬──────────┬────────────────────┤
│  Health  │  Visit   │  Vaccination       │
│  Record  │  Manager │  Tracker           │
├──────────┴──────────┴────────────────────┤
│       Emergency Notification Engine      │
│    (SMS + Push + Email + PA System)      │
├──────────────────────────────────────────┤
│    FHIR Adapter (Optional Integration)   │
├──────────────────────────────────────────┤
│   PostgreSQL (Encrypted Medical Schema)  │
└──────────────────────────────────────────┘
```

Health Record maintains encrypted student medical profiles. Visit Manager handles sick bay check-in/out, diagnosis logging, and medication administration. Vaccination Tracker manages immunization schedules and compliance verification.

## Entity Relationships

### MedicalProfile

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student (unique) |
| blood_type | VARCHAR(5) | ABO + Rh factor |
| allergies | TEXT[] | Allergen codes |
| conditions | JSONB | Chronic conditions |
| medications | JSONB | Current medications |
| emergency_contacts | JSONB | Ordered contact list |
| insurance_info | JSONB | Health insurance details |
| photo_url | VARCHAR(500) | For identification |
| physician_name | VARCHAR(200) | Primary care doctor |
| physician_phone | VARCHAR(20) | Doctor contact |

### SickBayVisit

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| nurse_id | UUID | FK to staff (nurse) |
| arrival_time | TIMESTAMP | When student arrived |
| departure_time | TIMESTAMP | When released |
| symptoms | TEXT[] | Reported symptoms |
| temperature | DECIMAL(4,1) | Body temperature in Celsius |
| observations | TEXT | Nurse notes |
| actions_taken | TEXT[] | Treatments administered |
| parent_notified | BOOLEAN | Whether parents contacted |
| sent_home | BOOLEAN | Dismissed from school |
| severity | ENUM | `minor`, `moderate`, `severe` |

### Medication

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Medication name |
| type | ENUM | `prescription`, `otc`, `emergency` |
| dosage_form | VARCHAR(50) | tablet, liquid, inhaler |
| stock_quantity | INTEGER | Current inventory |
| expiry_date | DATE | Expiration date |
| storage_requirements | TEXT | Temperature, light conditions |
| controlled | BOOLEAN | Controlled substance flag |

### MedicationAdministration

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| medication_id | UUID | FK to medication |
| nurse_id | UUID | FK to nurse |
| visit_id | UUID | FK to sick bay visit (nullable) |
| dose | VARCHAR(50) | Amount administered |
| route | ENUM | `oral`, `topical`, `inhalation`, `injection` |
| administered_at | TIMESTAMP | When given |
| notes | TEXT | Administration notes |

### Vaccination

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| student_id | UUID | FK to student |
| vaccine_name | VARCHAR(100) | Vaccine identifier |
| dose_number | INTEGER | Which dose in series |
| administered_date | DATE | When given |
| lot_number | VARCHAR(50) | Vaccine batch |
| administered_by | VARCHAR(200) | Provider name |
| next_dose_date | DATE | Scheduled follow-up |
| status | ENUM | `completed`, `scheduled`, `overdue`, `exempt` |

### HealthIncident

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| incident_type | ENUM | `illness`, `injury`, `allergic_reaction`, `outbreak` |
| affected_students | UUID[] | List of student IDs |
| description | TEXT | Incident details |
| severity | ENUM | `low`, `medium`, `high`, `critical` |
| reported_by | UUID | FK to staff |
| public_health_notified | BOOLEAN | Reportable disease flag |
| actions_taken | TEXT[] | Response actions |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/medical/profiles/:student_id` | Get student medical profile | nurse, admin |
| POST | `/api/v1/medical/profiles` | Create medical profile | nurse, admin |
| PUT | `/api/v1/medical/profiles/:id` | Update medical profile | nurse, admin |
| POST | `/api/v1/medical/visits` | Check-in to sick bay | nurse |
| GET | `/api/v1/medical/visits?date=:date` | Today's visits | nurse, admin |
| PUT | `/api/v1/medical/visits/:id` | Update visit notes | nurse |
| PUT | `/api/v1/medical/visits/:id/discharge` | Discharge student | nurse |
| POST | `/api/v1/medical/administrations` | Log medication given | nurse |
| GET | `/api/v1/medical/medications` | List available medications | nurse |
| GET | `/api/v1/medical/vaccinations?student=:id` | Vaccination records | nurse, parent |
| POST | `/api/v1/medical/vaccinations` | Record vaccination | nurse |
| GET | `/api/v1/medical/vaccinations/compliance` | Compliance report | admin |
| POST | `/api/v1/medical/incidents` | Report health incident | nurse, admin |
| GET | `/api/v1/medical/incidents` | List incidents | admin |
| POST | `/api/v1/medical/emergency/:student_id` | Trigger emergency protocol | nurse, admin |
| GET | `/api/v1/medical/dashboard` | Nurse dashboard data | nurse |

## Configuration Reference

```yaml
medical:
  privacy:
    encryption_algorithm: "aes-256-gcm"
    field_level_encryption: true
    encrypted_fields: ["allergies", "conditions", "medications", "insurance_info"]
    access_log_retention_days: 2555
    consent_required_for_sharing: true

  emergency:
    notification_channels: ["sms", "push", "email"]
    escalation_timeout_minutes: 5
    auto_escalate_to: ["principal", "school_nurse_supervisor"]
    911_integration: false

  vaccination:
    required_vaccines:
      - "dtap"
      - "polio"
      - "mmr"
      - "hepatitis_b"
      - "varicella"
    exemption_types: ["medical", "religious"]
    compliance_check_on_enrollment: true

  sick_bay:
    max_concurrent_students: 6
    observation_period_minutes: 30
    isolation_protocol_enabled: true
    daily_capacity_report: true

  medications:
    inventory_alert_threshold: 5
    expiry_alert_days: 30
    controlled_substance_dual_witness: true
    parental_consent_required: true

  reporting:
    reportable_diseases: ["measles", "meningitis", "hepatitis_a", "tb"]
    public_health_agency: "ARS"
    auto_report_generation: true
```

## Security Considerations

- Medical profiles encrypted at field level; decryption requires `medical:read` permission plus valid理由
- All access logged with `accessor_id`, `student_id`, `purpose`, and `timestamp`
- Emergency protocol overrides normal RBAC to reach designated contacts
- Medication administration requires two-person witness for controlled substances
- Vaccination records shared with enrollment office only as compliance boolean (not full record)
- Data retention: active records retained indefinitely; records of graduated students archived after 5 years
- GDPR Article 9 special category data handling with explicit consent management

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Health Profile | View child's medical profile (parents only) |
| Visit History | See past sick bay visits and outcomes |
| Vaccination Status | Track immunization compliance |
| Emergency Contacts | View and update emergency contact list |
| Medication Reminder | Push alerts for daily medications |
| Allergen Card | Quick-reference allergen card for field trips |
| Nurse Chat | Secure messaging with school nurse |

## Testing Strategy

**Encryption**: Unit tests verify field-level encryption round-trip for all sensitive fields. Tests validate encrypted data unreadable without proper decryption keys.

**Emergency Protocol**: Integration tests simulate emergency triggers and verify all notification channels fire within 30 seconds. Tests validate escalation chain when primary contacts unreachable.

**Vaccination Compliance**: Tests validate compliance calculation against French vaccination schedule. Edge cases include partial series, medical exemptions, and late vaccinations.

**Access Control**: Authorization tests verify nurse can access all student profiles, teachers see only emergency info, and parents see only their children's records.

**Medication Safety**: Tests validate controlled substance dual-witness requirement, inventory alerts at threshold, and expiry date warnings.

**Incident Reporting**: Tests verify reportable disease detection triggers public health notification workflow. End-to-end test validates report generation with correct agency formatting.
