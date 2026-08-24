# COMPLIANCE.md — Sovereign Cloud & Compliance

## Phase 3.5 — Regulatory Compliance Framework

---

## 1. Vision

A comprehensive compliance framework ensuring EduCI meets sovereign cloud requirements, data protection laws, and education sector regulations across all operating countries.

---

## 2. Compliance Domains

| Domain | Scope | Priority |
|--------|-------|----------|
| Data Sovereignty | National data residency laws | Critical |
| Privacy | GDPR, local data protection | Critical |
| Education | Ministry regulations | High |
| Financial | Tax, accounting standards | High |
| Security | OWASP, NIST, ISO 27001 | Critical |
| Accessibility | WCAG 2.1 AA | Medium |

---

## 3. Data Sovereignty

### 3.1 Requirements
| Country | Law | Data Location | Transfer Rules |
|---------|-----|---------------|----------------|
| Senegal | Loi sur la Protection des Données | In-country | Government approval |
| Côte d'Ivoire | Loi n°2013-450 | In-country | Adequacy decision |
| Burkina Faso | Loi n°010-2004 | In-country | Contractual safeguards |
| Mali | Loi n°2013-015 | In-country | Case-by-case |

### 3.2 Implementation
- Tenant data stays in designated region
- Cross-border transfer encrypted and logged
- Transfer impact assessments
- Government access request handling

---

## 4. Privacy Framework

| Requirement | Implementation |
|-------------|---------------|
| Consent | Explicit opt-in for data collection |
| Purpose limitation | Data used only for stated purpose |
| Data minimization | Collect only necessary data |
| Accuracy | Regular data quality checks |
| Storage limitation | Auto-deletion per retention policy |
| Right to access | Self-service data export |
| Right to erasure | Account deletion workflow |
| Data portability | Standard format export (JSON, CSV) |

---

## 5. Education Regulations

| Regulation | Requirement | EduCI Feature |
|------------|-------------|---------------|
| National curriculum | Standard alignment | Curriculum module |
| Exam standards | Secure examination | QR-signed exams |
| Teacher certification | Qualification tracking | Teacher profiles |
| School accreditation | Compliance reporting | Audit reports |
| Student records | Official transcript generation | Document module |

---

## 6. Financial Compliance

| Standard | Requirement |
|----------|-------------|
| OHADA | Uniform accounting for francophone Africa |
| GAAP | Generally Accepted Accounting Principles |
| Tax compliance | VAT, withholding tax calculation |
| Audit trail | Immutable financial records |
| Payment security | PCI DSS (via Money Fusion) |

---

## 7. Security Compliance

| Framework | Scope | Status |
|-----------|-------|--------|
| OWASP Top 10 | Application security | Implemented |
| NIST CSF | Cybersecurity framework | Roadmap |
| ISO 27001 | Information security | Certification planned |
| SOC 2 Type II | Service organization controls | Planned |
| CIS Benchmarks | Infrastructure hardening | Implemented |

---

## 8. Compliance API

```
GET  /api/v1/compliance/status           — Overall compliance status
GET  /api/v1/compliance/requirements     — List requirements
GET  /api/v1/compliance/gaps             — Identified gaps
POST /api/v1/compliance/assessment       — Run assessment
GET  /api/v1/compliance/audit-trail      — Audit logs
POST /api/v1/compliance/data-request     — Data subject request
GET  /api/v1/compliance/policies         — Policy documents
```

---

## 9. Audit Trail

| Event Type | Retention | Immutability |
|------------|-----------|--------------|
| Data access | 1 year | Yes |
| Data modification | 3 years | Yes |
| User actions | 1 year | Yes |
| System events | 90 days | Yes |
| Financial transactions | 10 years | Yes |

---

## 10. Compliance Roadmap

| Quarter | Milestone |
|---------|-----------|
| Q3 2026 | Privacy framework v1 |
| Q4 2026 | ISO 27001 gap analysis |
| Q1 2027 | SOC 2 Type I readiness |
| Q2 2027 | ISO 27001 certification |
| Q3 2027 | SOC 2 Type II audit |
