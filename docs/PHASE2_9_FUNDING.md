# Phase 2.9 - Funding

## Overview

The Funding module manages government funding, funding allocations, scholarships, scholarship applications, grants, grant projects, donors, NGO partners, budget allocations, regional budgets, fund disbursements, and funding reports. It provides comprehensive financial management for national education systems.

```
┌─────────────────────────────────────────────────────────┐
│                FUNDING LIFECYCLE                         │
├─────────────────────────────────────────────────────────┤
│  Funding → Allocation → Disbursement → Reporting         │
│  Scholarship → Application → Selection → Monitoring      │
│  Grant → Project → Donor → Partner → Budget              │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (12 in Module 9):**
- `GovGovernmentFundingRepository` - Funding CRUD + findByFiscalYear, findByStatus, approve
- `GovFundingAllocationRepository` - Allocation CRUD + findByFundingId, findBySchoolId, approve
- `GovScholarshipRepository` - Scholarship CRUD + findByStatus, findByAcademicYear, findActive
- `GovScholarshipApplicationRepository` - Application CRUD + findByScholarshipId, approve, reject
- `GovGrantRepository` - Grant CRUD + findByDonorId, findByStatus, approve
- `GovGrantProjectRepository` - Project CRUD + findByGrantId, findByStatus, complete
- `GovDonorRepository` - Donor CRUD + findActive, findByType, findByName
- `GovNgoPartnerRepository` - NGO partner CRUD + findActive, findBySpecialization, findByName
- `GovBudgetAllocationRepository` - Budget CRUD + findBySchoolId, findByFiscalYear, approve
- `GovRegionalBudgetRepository` - Regional budget CRUD + findByRegionId, findByFiscalYear, approve
- `GovFundDisbursementRepository` - Disbursement CRUD + findByAllocationId, findByStatus, process
- `GovFundingReportRepository` - Report CRUD + findBySchoolId, findByDateRange, findByType

### Validators

**File: `gov-analytics-funding-identity.ts` (2200 lines)**

| Schema | Purpose |
|--------|---------|
| `governmentFundingCreateSchema` | Validates funding creation |
| `governmentFundingUpdateSchema` | Validates funding updates |
| `governmentFundingQuerySchema` | Validates funding queries |
| `fundingAllocationCreateSchema` | Validates allocation creation |
| `fundingAllocationUpdateSchema` | Validates allocation updates |
| `fundingAllocationQuerySchema` | Validates allocation queries |
| `scholarshipCreateSchema` | Validates scholarship creation |
| `scholarshipUpdateSchema` | Validates scholarship updates |
| `scholarshipQuerySchema` | Validates scholarship queries |
| `scholarshipApplicationCreateSchema` | Validates application creation |
| `scholarshipApplicationUpdateSchema` | Validates application updates |
| `scholarshipApplicationQuerySchema` | Validates application queries |
| `grantCreateSchema` | Validates grant creation |
| `grantUpdateSchema` | Validates grant updates |
| `grantQuerySchema` | Validates grant queries |
| `grantProjectCreateSchema` | Validates project creation |
| `grantProjectUpdateSchema` | Validates project updates |
| `grantProjectQuerySchema` | Validates project queries |
| `donorCreateSchema` | Validates donor creation |
| `donorUpdateSchema` | Validates donor updates |
| `donorQuerySchema` | Validates donor queries |
| `ngoPartnerCreateSchema` | Validates NGO partner creation |
| `ngoPartnerUpdateSchema` | Validates NGO partner updates |
| `ngoPartnerQuerySchema` | Validates NGO partner queries |
| `budgetAllocationCreateSchema` | Validates budget allocation creation |
| `budgetAllocationUpdateSchema` | Validates budget allocation updates |
| `budgetAllocationQuerySchema` | Validates budget allocation queries |
| `regionalBudgetCreateSchema` | Validates regional budget creation |
| `regionalBudgetUpdateSchema` | Validates regional budget updates |
| `regionalBudgetQuerySchema` | Validates regional budget queries |
| `fundDisbursementCreateSchema` | Validates disbursement creation |
| `fundDisbursementUpdateSchema` | Validates disbursement updates |
| `fundDisbursementQuerySchema` | Validates disbursement queries |
| `fundingReportCreateSchema` | Validates report creation |
| `fundingReportUpdateSchema` | Validates report updates |
| `fundingReportQuerySchema` | Validates report queries |

### Errors

- `FundingNotFoundError` - Government funding not found
- `AllocationNotFoundError` - Funding allocation not found
- `ScholarshipNotFoundError` - Scholarship not found
- `ApplicationNotFoundError` - Scholarship application not found
- `GrantNotFoundError` - Grant not found
- `DonorNotFoundError` - Donor not found
- `NgoPartnerNotFoundError` - NGO partner not found
- `BudgetAllocationNotFoundError` - Budget allocation not found
- `DisbursementNotFoundError` - Fund disbursement not found
- `InsufficientFundsError` - Insufficient funds available
- `AllocationExceededError` - Allocation limit exceeded
- `DisbursementFailedError` - Disbursement processing failed

### Repository

All 12 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovScholarshipService` | `gov-scholarship.service.ts` | Scholarship management |
| `GovScholarshipSelectionService` | `gov-scholarship-selection.service.ts` | Selection process |
| `GovScholarshipApplicationService` | `gov-scholarship-application.service.ts` | Application management |
| `GovNgoPartnerService` | `gov-ngo-partner.service.ts` | NGO partner management |
| `GovRegionalBudgetService` | `gov-regional-budget.service.ts` | Regional budget management |
| `GovScheduledReportsService` | `gov-scheduled-reports.service.ts` | Scheduled report generation |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-government-funding-management` | Funding state management |
| `use-gov-government-funding-list` | Funding list operations |
| `use-gov-government-funding-actions` | Funding CRUD actions |
| `use-gov-funding-allocation-management` | Allocation state management |
| `use-gov-funding-allocation-list` | Allocation list operations |
| `use-gov-funding-allocation-actions` | Allocation CRUD actions |
| `use-gov-scholarship-management` | Scholarship state management |
| `use-gov-scholarship-list` | Scholarship list operations |
| `use-gov-scholarship-actions` | Scholarship CRUD actions |
| `use-gov-scholarship-selection` | Selection workflow |
| `use-gov-scholarship-application-management` | Application state management |
| `use-gov-scholarship-application-list` | Application list operations |
| `use-gov-scholarship-application-actions` | Application CRUD actions |
| `use-gov-scholarship-application-processing` | Application processing |
| `use-gov-grant-management` | Grant state management |
| `use-gov-grant-list` | Grant list operations |
| `use-gov-grant-actions` | Grant CRUD actions |
| `use-gov-donor-management` | Donor state management |
| `use-gov-donor-list` | Donor list operations |
| `use-gov-donor-actions` | Donor CRUD actions |
| `use-gov-ngo-partner-management` | NGO partner state |
| `use-gov-ngo-partner-list` | NGO partner list |
| `use-gov-ngo-partner-actions` | NGO partner CRUD |
| `use-gov-budget-allocation-management` | Budget state management |
| `use-gov-budget-allocation-list` | Budget list operations |
| `use-gov-budget-allocation-actions` | Budget CRUD actions |
| `use-gov-budget-analytic-management` | Budget analytic state |
| `use-gov-budget-optimization` | Budget optimization |
| `use-gov-regional-budget-management` | Regional budget state |
| `use-gov-regional-budget-list` | Regional budget list |
| `use-gov-regional-budget-actions` | Regional budget CRUD |
| `use-gov-fund-disbursement-management` | Disbursement state |
| `use-gov-fund-disbursement-list` | Disbursement list |
| `use-gov-fund-disbursement-actions` | Disbursement CRUD |
| `use-gov-funding-report-management` | Report state management |
| `use-gov-funding-report-list` | Report list operations |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/government-funding` | GET, POST |
| `/api/gov/government-funding/[id]` | GET, PUT, DELETE |
| `/api/gov/funding-allocation` | GET, POST |
| `/api/gov/funding-allocation/[id]` | GET, PUT, DELETE |
| `/api/gov/scholarship` | GET, POST |
| `/api/gov/scholarship/[id]` | GET, PUT, DELETE |
| `/api/gov/scholarship-application` | GET, POST |
| `/api/gov/scholarship-application/[id]` | GET, PUT, DELETE |
| `/api/gov/grant` | GET, POST |
| `/api/gov/grant/[id]` | GET, PUT, DELETE |
| `/api/gov/donor` | GET, POST |
| `/api/gov/donor/[id]` | GET, PUT, DELETE |
| `/api/gov/ngo-partner` | GET, POST |
| `/api/gov/ngo-partner/[id]` | GET, PUT, DELETE |
| `/api/gov/budget-allocation` | GET, POST |
| `/api/gov/budget-allocation/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-budget` | GET, POST |
| `/api/gov/regional-budget/[id]` | GET, PUT, DELETE |
| `/api/gov/funding-report` | GET, POST |
| `/api/gov/funding-report/[id]` | GET, PUT, DELETE |
| `/api/gov/funding/allocation/regional` | GET, POST |
| `/api/gov/funding/allocation/per-school` | GET, POST |
| `/api/gov/funding/allocation/per-student` | GET, POST |
| `/api/gov/funding/allocation/operational` | GET, POST |
| `/api/gov/funding/allocation/capital` | GET, POST |
| `/api/gov/funding/allocation/targeted` | GET, POST |
| `/api/gov/funding/allocation/emergency` | GET, POST |
| `/api/gov/funding/allocation/historical` | GET, POST |
| `/api/gov/funding/disbursement/tracking` | GET, POST |
| `/api/gov/funding/disbursement/approvals` | GET, POST |
| `/api/gov/funding/disbursement/verifications` | GET, POST |
| `/api/gov/funding/disbursement/reconciliation` | GET, POST |
| `/api/gov/funding/disbursement/audit-trail` | GET, POST |
| `/api/gov/funding/disbursement/schedules` | GET, POST |
| `/api/gov/funding/disbursement/reports` | GET, POST |
| `/api/gov/funding/disbursement/alerts` | GET, POST |
| `/api/gov/funding/scholarship/criteria` | GET, POST |
| `/api/gov/funding/scholarship/selection` | GET, POST |
| `/api/gov/funding/scholarship/disbursement` | GET, POST |
| `/api/gov/funding/scholarship/monitoring` | GET, POST |
| `/api/gov/funding/scholarship/renewals` | GET, POST |
| `/api/gov/funding/scholarship/analytics` | GET, POST |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovFundingDashboardScreen` | Funding dashboard |
| `GovFundingListScreen` | List funding |
| `GovFundingReportScreen` | Funding reports |
| `GovGrantListScreen` | List grants |
| `GovDonorListScreen` | List donors |
| `GovScholarshipListScreen` | List scholarships |
| `GovScholarshipApplicationScreen` | Scholarship applications |
| `GovBudgetAllocationScreen` | Budget allocations |
| `GovBudgetAnalyticScreen` | Budget analytics |

## Configuration

```typescript
const fundingConfig = {
  maxFundingPerFiscalYear: 100,
  maxAllocationsPerFunding: 1000,
  scholarshipApplicationDeadlineDays: 30,
  disbursementProcessingDays: 14,
  budgetApprovalRequired: true,
  disbursementApprovalThreshold: 100000,
  reportRetentionYears: 7,
  supportedFundingTypes: [
    'operational', 'capital', 'targeted', 'emergency', 'supplementary'
  ],
  supportedScholarshipTypes: [
    'merit', 'need_based', 'sports', 'arts', 'minority', 'disability'
  ],
  supportedGrantTypes: [
    'bilateral', 'multilateral', 'private', 'foundation', 'corporate'
  ],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `funding_admin` | Full funding management, approval authority |
| `budget_officer` | Budget allocation, disbursement processing |
| `scholarship_admin` | Scholarship management, application review |
| `grant_manager` | Grant management, donor relations |
| `financial_analyst` | Analytics, reporting, reconciliation |
| `school_admin` | School-level funding requests |
| `funding_viewer` | Read-only access |

## Multi-Tenancy

- Funding data scoped by `schoolId`
- Allocation per institution
- Scholarship per school/region
- Disbursement per allocation

## Offline Support

- Funding data cached offline
- Allocation status available
- Scholarship applications queued
- Report generation offline

## API Reference

### Government Funding
- `GET /api/gov/government-funding` - List funding
- `POST /api/gov/government-funding` - Create funding
- `GET /api/gov/government-funding/[id]` - Get funding
- `PUT /api/gov/government-funding/[id]` - Update funding
- `DELETE /api/gov/government-funding/[id]` - Delete funding

### Scholarship
- `GET /api/gov/scholarship` - List scholarships
- `POST /api/gov/scholarship` - Create scholarship
- `GET /api/gov/scholarship/[id]` - Get scholarship
- `PUT /api/gov/scholarship/[id]` - Update scholarship
- `DELETE /api/gov/scholarship/[id]` - Delete scholarship

### Scholarship Application
- `GET /api/gov/scholarship-application` - List applications
- `POST /api/gov/scholarship-application` - Create application
- `GET /api/gov/scholarship-application/[id]` - Get application
- `PUT /api/gov/scholarship-application/[id]` - Update application
- `DELETE /api/gov/scholarship-application/[id]` - Delete application

### Funding Allocation
- `GET /api/gov/funding-allocation` - List allocations
- `POST /api/gov/funding-allocation` - Create allocation
- `GET /api/gov/funding-allocation/[id]` - Get allocation
- `PUT /api/gov/funding-allocation/[id]` - Update allocation
- `DELETE /api/gov/funding-allocation/[id]` - Delete allocation

## Testing

- Unit tests for all funding services
- Integration tests for API routes
- E2E tests for funding workflows
- Scholarship selection tests
- Disbursement processing tests

## Security

- JWT authentication required
- Financial data encryption
- Approval workflow security
- Audit trail for all transactions
- Anti-fraud measures
