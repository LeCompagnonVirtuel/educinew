# Smart Campus Audit Documentation

## Executive Summary

This audit document establishes the governance framework, compliance requirements, and operational review processes for the Phase 2.8 Smart Campus implementation. It covers data protection, safety regulations, financial controls, and operational excellence standards applicable to all Smart Campus modules.

The audit framework ensures compliance with French education regulations (Code de l'Education), GDPR for personal data, healthcare data regulations for medical records, and financial audit standards for procurement and asset management. Regular audits verify system integrity, security posture, and operational effectiveness.

Audit findings drive continuous improvement with mandatory remediation timelines for critical issues and tracked improvement plans for moderate findings. The framework supports both internal operational audits and external regulatory examinations.

## Architecture Overview

```
+------------------------------------------+
|           Audit Framework                |
+----------+----------+--------------------+
|  Data    |Security  |  Operational       |
|  Privacy | Audit    |  Audit             |
+----------+----------+--------------------+
|    Compliance Monitoring Engine          |
|    (Automated Policy Enforcement)        |
+------------------------------------------+
|    Audit Log Aggregation (Immutable)     |
+------------------------------------------+
|    Reporting Dashboard + Export          |
+------------------------------------------+
```

## Audit Scope Matrix

| Module | Data Privacy | Safety | Financial | Operational |
|--------|-------------|--------|-----------|-------------|
| Transport | Student location history | Vehicle safety inspections | Fuel and maintenance costs | Route efficiency metrics |
| Library | Loan history access logs | N/A | Acquisition spending | Circulation KPIs |
| Cafeteria | Meal preference data | Food safety compliance | Revenue reconciliation | Waste metrics |
| Medical | Health record encryption | Emergency response times | Insurance claim tracking | Sick bay utilization |
| Boarding | Room assignment privacy | Supervision coverage | Residential fees | Occupancy rates |
| Visitors | ID document handling | Entry/exit logging | Badge cost tracking | Visitor flow analytics |
| Assets | N/A | Equipment safety | Depreciation accuracy | Utilization rates |
| Maintenance | N/A | Work order SLA compliance | Cost variance tracking | Response time metrics |
| Security | Camera footage access | Emergency drill compliance | Vendor contract terms | Incident resolution |
| Environment | Sensor data anonymization | Air quality compliance | Energy cost tracking | Sustainability metrics |
| IoT | Device telemetry privacy | Device safety standards | Hardware lifecycle cost | Uptime and reliability |

## GDPR Compliance Controls

### Data Protection Impact Assessment

| Data Category | Legal Basis | Retention Period | Access Control | Encryption |
|---------------|-------------|------------------|----------------|------------|
| Student location (Transport) | Legitimate interest | 90 days | Parent, admin only | AES-256 at rest |
| Medical records | Vital interests | Active + 5 years | Nurse, admin | AES-256-GCM field-level |
| Library loan history | Contract performance | 2 years | Student, librarian | TLS in transit |
| Cafeteria orders | Contract performance | 1 year | Student, parent | TLS in transit |
| Visitor ID documents | Legal obligation | 30 days | Security, admin | AES-256 at rest |
| Camera footage | Legitimate interest | 30 days | Security only | AES-256 at rest |
| IoT sensor data | Legitimate interest | 1 year aggregated | Facilities, admin | TLS in transit |
| Access logs | Legal obligation | 3 years | Security, admin | AES-256 at rest |

### Data Subject Rights Implementation

| Right | Implementation | Response SLA |
|-------|----------------|-------------|
| Access (Art. 15) | Automated export via admin portal | 30 days |
| Rectification (Art. 16) | Self-service for profile data | Immediate |
| Erasure (Art. 17) | Automated deletion workflow | 30 days |
| Portability (Art. 20) | JSON/CSV export endpoint | 30 days |
| Restriction (Art. 18) | Data freeze flag in database | 72 hours |
| Objection (Art. 21) | Opt-out mechanism per module | 30 days |

## Security Audit Controls

### Access Control Review

| Control | Frequency | Owner | Evidence |
|---------|-----------|-------|----------|
| User account review | Quarterly | Admin | Account listing with role mapping |
| Permission matrix audit | Semi-annually | Security | RBAC configuration export |
| Service account review | Quarterly | IT | Active service accounts list |
| API key rotation | Every 90 days | DevOps | Key rotation logs |
| MFA compliance check | Monthly | Security | MFA enrollment report |
| Privileged access review | Monthly | Admin | Admin action audit logs |

### Vulnerability Management

| Activity | Frequency | Tool | SLA |
|----------|-----------|------|-----|
| Automated vulnerability scan | Weekly | Nessus | Critical: 48h, High: 7 days |
| Dependency audit | Daily | Snyk | Critical: 24h, High: 7 days |
| Penetration test | Annually | External vendor | Full report within 30 days |
| Configuration review | Quarterly | ScoutSuite | Remediation plan within 14 days |
| SSL certificate check | Weekly | Custom | Renewal 30 days before expiry |

### Incident Response Audit

| Metric | Target | Measurement |
|--------|--------|-------------|
| Detection time | < 15 minutes | Alert timestamp - incident occurrence |
| Response time | < 30 minutes | First action - alert timestamp |
| Containment time | < 2 hours | Containment - detection |
| Resolution time | < 24 hours | Resolution - detection |
| Post-incident review | Within 48 hours | Review completion timestamp |
| Lessons learned implemented | Within 30 days | Implementation confirmation |

## Financial Audit Controls

### Procurement Controls

| Threshold | Approval Required | Documentation |
|-----------|-------------------|---------------|
| < 500 | Department manager | Purchase request |
| 500 - 5,000 | Director | 3 competitive quotes |
| 5,000 - 25,000 | Finance committee | Full procurement dossier |
| > 25,000 | Board approval | Public tender process |

### Asset Valuation Controls

| Control | Frequency | Process |
|---------|-----------|---------|
| Physical inventory count | Annual | Stock-take with variance report |
| Depreciation calculation | Monthly | Automated with manual review |
| Asset disposal approval | Per event | Dual authorization above threshold |
| Insurance valuation update | Annual | External appraiser engagement |
| Write-off authorization | Per event | Finance committee approval |

### Budget Variance Monitoring

| Category | Alert Threshold | Escalation |
|----------|----------------|------------|
| Energy costs | 10% over budget | Facilities manager |
| Maintenance costs | 15% over budget | Director |
| Transport costs | 10% over budget | Transport manager |
| Cafeteria costs | 5% over budget | Cafeteria manager |
| IT/IoT costs | 10% over budget | IT director |

## Operational Audit Checklist

### Monthly Operational Review

| Item | Module | Check | Target | Owner |
|------|--------|-------|--------|-------|
| Route efficiency | Transport | Average route completion time | < 10% variance | Transport manager |
| Vehicle maintenance | Transport | Scheduled maintenance compliance | 100% on time | Transport manager |
| Overdue recovery | Library | Items returned before overdue | > 90% | Librarian |
| Catalog accuracy | Library | Random sample verification | > 99% accuracy | Librarian |
| Food waste | Cafeteria | Waste weight per meal | < 100g average | Cafeteria manager |
| Allergen incidents | Cafeteria | Allergen reaction reports | 0 incidents | Cafeteria manager |
| Sick bay response | Medical | Average check-in to treatment | < 15 minutes | Nurse |
| Vaccination compliance | Medical | Required vaccines completed | > 95% | Nurse |
| Check-in compliance | Boarding | Students checked in by curfew | > 98% | House parent |
| Room inspection | Boarding | Average cleanliness score | > 7/10 | House parent |
| Visitor processing | Security | Average check-in time | < 5 minutes | Security |
| Incident resolution | Security | Average resolution time | < 24 hours | Security lead |
| Work order completion | Maintenance | Completed within SLA | > 85% | Facilities manager |
| Sensor uptime | IoT | Devices reporting normally | > 99% | IT manager |
| Air quality | Environment | Average AQI | < 50 (Good) | Facilities manager |

### Quarterly Compliance Review

| Review Area | Scope | Auditor | Deliverable |
|-------------|-------|---------|-------------|
| RBAC effectiveness | All modules | Security team | Permission drift report |
| Data access audit | All personal data | DPO | Access log analysis |
| Financial reconciliation | All procurement | Finance | Variance report |
| Safety compliance | Transport, medical, security | External auditor | Compliance certificate |
| Environmental metrics | Energy, waste, water | Sustainability officer | Sustainability report |

## Audit Log Requirements

### Immutable Audit Trail Structure

```json
{
  "audit_id": "aud_uuid",
  "timestamp": "2025-07-22T10:30:00Z",
  "actor_id": "user_uuid",
  "actor_type": "staff",
  "action": "medical.profile.update",
  "resource_type": "medical_profile",
  "resource_id": "profile_uuid",
  "previous_state": { "allergies": ["peanuts"] },
  "new_state": { "allergies": ["peanuts", "shellfish"] },
  "ip_address": "192.168.1.100",
  "session_id": "sess_uuid",
  "justification": "Annual health review update"
}
```

### Audit Event Categories

| Category | Examples | Retention | Alert Threshold |
|----------|----------|-----------|-----------------|
| Authentication | Login, logout, failed attempt | 1 year | 5 failures in 10 minutes |
| Authorization | Permission grant/deny, role change | 2 years | Admin role assignment |
| Data modification | Profile update, record deletion | 5 years | Medical record change |
| Financial | Transaction, refund, procurement | 7 years | Amount > 1000 |
| Security | Incident report, access denied | 5 years | Critical severity |
| System | Configuration change, deployment | 2 years | Production change |
| Emergency | Lockdown, evacuation, SOS | 10 years | Any emergency event |

## Testing Strategy

**Audit Log Integrity**: Tests verify append-only semantics for audit tables. Attempted modifications rejected at database level with constraint violations.

**Compliance Reporting**: Tests validate automated report generation matches manual audit findings within 5% variance.

**Access Control Verification**: Tests simulate unauthorized access attempts across all modules and verify proper denial with audit log entry.

**Data Retention Enforcement**: Tests verify automatic data purging respects configured retention periods and produces deletion certificates.

**Financial Reconciliation**: Tests validate procurement approval workflows enforce threshold-based routing and budget limit checks.

**Incident Response Simulation**: Quarterly drill tests verify audit trail captures all incident response actions with correct timestamps and actor identification.
