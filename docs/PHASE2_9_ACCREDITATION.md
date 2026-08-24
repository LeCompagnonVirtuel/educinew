# Phase 2.9 - Accreditation

## Overview

The Accreditation module manages accreditations, standards, assessments, certifications, renewals, quality audits, compliance rules, quality indicators, accreditation documents, and audit findings. It provides comprehensive accreditation lifecycle management for educational institutions.

```
┌─────────────────────────────────────────────────────────┐
│              ACCREDITATION LIFECYCLE                      │
├─────────────────────────────────────────────────────────┤
│  Standard → Assessment → Application → Review            │
│  Decision → Certification → Renewal → Archive            │
│  Quality Audit → Compliance Rule → Finding → Indicator   │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10 in Module 7):**
- `GovAccreditationRepository` - Accreditation CRUD + findBySchoolId, findByStatus, approve, revoke
- `GovAccreditationStandardRepository` - Standard CRUD + findByCategory, findActive, findByName
- `GovAccreditationAssessmentRepository` - Assessment CRUD + findByAccreditationId, findByStandardId, findByStatus
- `GovCertificationRepository` - Certification CRUD + findBySchoolId, findActive, findExpired, renew
- `GovRenewalRepository` - Renewal CRUD + findByCertificationId, findByStatus, approve, reject
- `GovQualityAuditRepository` - Audit CRUD + findBySchoolId, findByStatus, findByDateRange, complete
- `GovComplianceRuleRepository` - Rule CRUD + findByCategory, findActive, findByName
- `GovQualityIndicatorRepository` - Indicator CRUD + findBySchoolId, findByCategory, findLatest
- `GovAccreditationDocumentRepository` - Document CRUD + findByAccreditationId, findByType, verify
- `GovAuditFindingRepository` - Finding CRUD + findByAuditId, findBySeverity, findByStatus, resolve

### Validators

**File: `gov-exams-inspection-accreditation.ts` (1474 lines)**

| Schema | Purpose |
|--------|---------|
| `accreditationCreateSchema` | Validates accreditation creation |
| `accreditationUpdateSchema` | Validates accreditation updates |
| `accreditationQuerySchema` | Validates accreditation queries |
| `accreditationStandardCreateSchema` | Validates standard creation |
| `accreditationStandardUpdateSchema` | Validates standard updates |
| `accreditationStandardQuerySchema` | Validates standard queries |
| `accreditationAssessmentCreateSchema` | Validates assessment creation |
| `accreditationAssessmentUpdateSchema` | Validates assessment updates |
| `accreditationAssessmentQuerySchema` | Validates assessment queries |
| `certificationCreateSchema` | Validates certification creation |
| `certificationUpdateSchema` | Validates certification updates |
| `certificationQuerySchema` | Validates certification queries |
| `renewalCreateSchema` | Validates renewal creation |
| `renewalUpdateSchema` | Validates renewal updates |
| `renewalQuerySchema` | Validates renewal queries |
| `qualityAuditCreateSchema` | Validates audit creation |
| `qualityAuditUpdateSchema` | Validates audit updates |
| `qualityAuditQuerySchema` | Validates audit queries |
| `complianceRuleCreateSchema` | Validates rule creation |
| `complianceRuleUpdateSchema` | Validates rule updates |
| `complianceRuleQuerySchema` | Validates rule queries |
| `qualityIndicatorCreateSchema` | Validates indicator creation |
| `qualityIndicatorUpdateSchema` | Validates indicator updates |
| `qualityIndicatorQuerySchema` | Validates indicator queries |
| `accreditationDocumentCreateSchema` | Validates document creation |
| `accreditationDocumentUpdateSchema` | Validates document updates |
| `accreditationDocumentQuerySchema` | Validates document queries |
| `auditFindingCreateSchema` | Validates finding creation |
| `auditFindingUpdateSchema` | Validates finding updates |
| `auditFindingQuerySchema` | Validates finding queries |

### Errors

- `AccreditationNotFoundError` - Accreditation not found
- `StandardNotFoundError` - Standard not found
- `AssessmentNotFoundError` - Assessment not found
- `CertificationNotFoundError` - Certification not found
- `RenewalNotFoundError` - Renewal not found
- `QualityAuditNotFoundError` - Quality audit not found
- `ComplianceRuleNotFoundError` - Compliance rule not found
- `QualityIndicatorNotFoundError` - Quality indicator not found
- `DocumentNotFoundError` - Accreditation document not found
- `AuditFindingNotFoundError` - Audit finding not found
- `AccreditationRevokedError` - Accreditation has been revoked
- `CertificationExpiredError` - Certification has expired
- `RenewalAlreadyProcessedError` - Renewal already processed

### Repository

All 10 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovAccreditationStandardService` | `gov-accreditation-standard.service.ts` | Standard management |
| `GovAccreditationDocumentService` | `gov-accreditation-document.service.ts` | Document management |
| `GovRenewalService` | `gov-renewal.service.ts` | Renewal management |
| `GovQualityAuditService` | `gov-quality-audit.service.ts` | Quality audit management |
| `GovQualityIndicatorService` | `gov-quality-indicator.service.ts` | Quality indicators |
| `GovAuditFindingService` | `gov-audit-finding.service.ts` | Audit finding management |
| `GovComplianceRuleService` | `gov-compliance-rule.service.ts` | Compliance rule management |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-accreditation-management` | Accreditation state management |
| `use-gov-accreditation-list` | Accreditation list operations |
| `use-gov-accreditation-actions` | Accreditation CRUD actions |
| `use-gov-accreditation-standard-management` | Standard state management |
| `use-gov-accreditation-standard-list` | Standard list operations |
| `use-gov-accreditation-standard-actions` | Standard CRUD actions |
| `use-gov-accreditation-assessment-management` | Assessment state management |
| `use-gov-accreditation-assessment-list` | Assessment list operations |
| `use-gov-accreditation-assessment-actions` | Assessment CRUD actions |
| `use-gov-accreditation-assessment-scoring` | Assessment scoring logic |
| `use-gov-accreditation-document-management` | Document state management |
| `use-gov-accreditation-document-list` | Document list operations |
| `use-gov-accreditation-document-actions` | Document CRUD actions |
| `use-gov-accreditation-document-verification` | Document verification |
| `use-gov-accreditation-application` | Application workflow |
| `use-gov-accreditation-renewal` | Renewal workflow |
| `use-gov-accreditation-status-tracking` | Status tracking |
| `use-gov-certification-management` | Certification state management |
| `use-gov-certification-list` | Certification list operations |
| `use-gov-certification-actions` | Certification CRUD actions |
| `use-gov-renewal-management` | Renewal state management |
| `use-gov-renewal-list` | Renewal list operations |
| `use-gov-renewal-actions` | Renewal CRUD actions |
| `use-gov-quality-audit-management` | Quality audit state |
| `use-gov-quality-audit-list` | Quality audit list |
| `use-gov-quality-audit-actions` | Quality audit CRUD |
| `use-gov-audit-finding-management` | Audit finding state |
| `use-gov-audit-finding-list` | Audit finding list |
| `use-gov-audit-finding-actions` | Audit finding CRUD |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/accreditation` | GET, POST |
| `/api/gov/accreditation/[id]` | GET, PUT, DELETE |
| `/api/gov/accreditation-standard` | GET, POST |
| `/api/gov/accreditation-standard/[id]` | GET, PUT, DELETE |
| `/api/gov/accreditation-assessment` | GET, POST |
| `/api/gov/accreditation-assessment/[id]` | GET, PUT, DELETE |
| `/api/gov/accreditation-document` | GET, POST |
| `/api/gov/accreditation-document/[id]` | GET, PUT, DELETE |
| `/api/gov/audit-finding` | GET, POST |
| `/api/gov/audit-finding/[id]` | GET, PUT, DELETE |
| `/api/gov/quality-audit` | GET, POST |
| `/api/gov/quality-audit/[id]` | GET, PUT, DELETE |
| `/api/gov/quality-indicator` | GET, POST |
| `/api/gov/quality-indicator/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance-rule` | GET, POST |
| `/api/gov/compliance-rule/[id]` | GET, PUT, DELETE |
| `/api/gov/certification` | GET, POST |
| `/api/gov/certification/[id]` | GET, PUT, DELETE |
| `/api/gov/renewal` | GET, POST |
| `/api/gov/renewal/[id]` | GET, PUT, DELETE |
| `/api/gov/accreditation/application/submission` | GET, POST |
| `/api/gov/accreditation/application/review` | GET, POST |
| `/api/gov/accreditation/application/decision` | GET, POST |
| `/api/gov/accreditation/application/site-visit` | GET, POST |
| `/api/gov/accreditation/application/peer-evaluation` | GET, POST |
| `/api/gov/accreditation/application/status-tracking` | GET, POST |
| `/api/gov/accreditation/renewal/initiation` | GET, POST |
| `/api/gov/accreditation/renewal/progress-tracking` | GET, POST |
| `/api/gov/accreditation/renewal/assessment` | GET, POST |
| `/api/gov/accreditation/renewal/evidence-collection` | GET, POST |
| `/api/gov/accreditation/renewal/notification` | GET, POST |
| `/api/gov/accreditation/renewal/archive` | GET, POST |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovAccreditationListScreen` | List accreditations |
| `GovAccreditationDetailScreen` | Accreditation detail |
| `GovAccreditationDashboardScreen` | Accreditation dashboard |
| `GovCertificationListScreen` | List certifications |
| `GovQualityAuditListScreen` | Quality audits |
| `GovQualityIndicatorScreen` | Quality indicators |

## Configuration

```typescript
const accreditationConfig = {
  maxAccreditationsPerSchool: 10,
  accreditationValidityYears: 5,
  renewalAdvanceMonths: 6,
  assessmentPassingScore: 70,
  qualityAuditFrequencyDays: 365,
  documentVerificationTimeout: 86400000, // 24 hours
  findingResolutionDays: 90,
  supportedAccreditationTypes: ['initial', 'renewal', 'expansion', 'special'],
  supportedStandardCategories: [
    'academic', 'infrastructure', 'governance', 'finance',
    'student_services', 'research', 'community', 'international'
  ],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `accreditation_admin` | Full accreditation management |
| `quality_director` | Quality audit oversight, standard creation |
| `accreditation_officer` | Application processing, assessment coordination |
| `peer_evaluator` | Peer evaluation, site visit |
| `school_admin` | Application submission, evidence upload |
| `accreditation_viewer` | Read-only access |

## Multi-Tenancy

- Accreditation data scoped by `schoolId`
- Standard definitions global
- Assessment data per accreditation
- Certification lifecycle per institution

## Offline Support

- Accreditation status available offline
- Standards reference offline
- Evidence upload queued
- Assessment drafts offline

## API Reference

### Accreditation
- `GET /api/gov/accreditation` - List accreditations
- `POST /api/gov/accreditation` - Create accreditation
- `GET /api/gov/accreditation/[id]` - Get accreditation
- `PUT /api/gov/accreditation/[id]` - Update accreditation
- `DELETE /api/gov/accreditation/[id]` - Delete accreditation

### Accreditation Standard
- `GET /api/gov/accreditation-standard` - List standards
- `POST /api/gov/accreditation-standard` - Create standard
- `GET /api/gov/accreditation-standard/[id]` - Get standard
- `PUT /api/gov/accreditation-standard/[id]` - Update standard
- `DELETE /api/gov/accreditation-standard/[id]` - Delete standard

### Accreditation Application
- `GET /api/gov/accreditation/application/submission` - List submissions
- `POST /api/gov/accreditation/application/submission` - Submit application
- `GET /api/gov/accreditation/application/review` - List reviews
- `POST /api/gov/accreditation/application/review` - Create review
- `GET /api/gov/accreditation/application/decision` - List decisions
- `POST /api/gov/accreditation/application/decision` - Make decision

## Testing

- Unit tests for all accreditation services
- Integration tests for API routes
- E2E tests for accreditation workflows
- Assessment scoring tests
- Renewal process tests

## Security

- JWT authentication required
- Document integrity protection
- Assessment tamper prevention
- Audit trail for all decisions
- Secure document storage
