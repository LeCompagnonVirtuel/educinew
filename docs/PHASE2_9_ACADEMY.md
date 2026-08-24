# Phase 2.9 - Academy & Regional Education

## Overview

The Academy & Regional Education module manages education regions, districts, academies, regional directorates, inspectors, inspection visits, regional reports, KPIs, district reports, and region users. It provides the hierarchical regional governance layer between ministries and individual schools.

```
┌─────────────────────────────────────────────────────────┐
│              REGIONAL GOVERNANCE HIERARCHY               │
├─────────────────────────────────────────────────────────┤
│  Ministry → Region → District → School                  │
│  Academy → Specialization → Programs                     │
│  Directorate → Inspector → Visit → Report                │
│  KPIs → Analytics → Performance Tracking                 │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10 in Module 2):**
- `GovEducationRegionRepository` - Region CRUD + findActive, findByName, findByCountryId
- `GovEducationDistrictRepository` - District CRUD + findByRegionId, findActive, findByName
- `GovAcademyRepository` - Academy CRUD + findByRegionId, findActive, findBySpecialization
- `GovRegionalDirectorateRepository` - Directorate CRUD + findByRegionId, findActive, findByDirector
- `GovInspectorRepository` - Inspector CRUD + findByRegionId, findActive, findBySpecialization
- `GovInspectionVisitRepository` - Visit CRUD + findByInspectorId, findBySchoolId, findByStatus, findByDateRange
- `GovRegionalReportRepository` - Report CRUD + findByRegionId, findByDateRange, findByType
- `GovRegionalKpiRepository` - KPI CRUD + findByRegionId, findByYear, findLatest
- `GovDistrictReportRepository` - District report CRUD + findByDistrictId, findByDateRange, findByType
- `GovRegionUserRepository` - Region user CRUD + findByRegionId, findByRole, findActive

### Validators

**File: `gov-ministry-region.ts` (958 lines)**

| Schema | Purpose |
|--------|---------|
| `educationRegionCreateSchema` | Validates region creation |
| `educationRegionUpdateSchema` | Validates region updates |
| `educationRegionQuerySchema` | Validates region queries |
| `educationDistrictCreateSchema` | Validates district creation |
| `educationDistrictUpdateSchema` | Validates district updates |
| `educationDistrictQuerySchema` | Validates district queries |
| `academyCreateSchema` | Validates academy creation |
| `academyUpdateSchema` | Validates academy updates |
| `academyQuerySchema` | Validates academy queries |
| `regionalDirectorateCreateSchema` | Validates directorate creation |
| `regionalDirectorateUpdateSchema` | Validates directorate updates |
| `regionalDirectorateQuerySchema` | Validates directorate queries |
| `inspectorCreateSchema` | Validates inspector creation |
| `inspectorUpdateSchema` | Validates inspector updates |
| `inspectorQuerySchema` | Validates inspector queries |
| `inspectionVisitCreateSchema` | Validates visit creation |
| `inspectionVisitUpdateSchema` | Validates visit updates |
| `inspectionVisitQuerySchema` | Validates visit queries |
| `regionalReportCreateSchema` | Validates report creation |
| `regionalReportUpdateSchema` | Validates report updates |
| `regionalReportQuerySchema` | Validates report queries |
| `regionalKpiCreateSchema` | Validates KPI creation |
| `regionalKpiUpdateSchema` | Validates KPI updates |
| `regionalKpiQuerySchema` | Validates KPI queries |
| `districtReportCreateSchema` | Validates district report creation |
| `districtReportUpdateSchema` | Validates district report updates |
| `districtReportQuerySchema` | Validates district report queries |
| `regionUserCreateSchema` | Validates region user creation |
| `regionUserUpdateSchema` | Validates region user updates |
| `regionUserQuerySchema` | Validates region user queries |

### Errors

- `RegionNotFoundError` - Region not found
- `DistrictNotFoundError` - District not found
- `AcademyNotFoundError` - Academy not found
- `InspectorNotFoundError` - Inspector not found
- `VisitNotFoundError` - Inspection visit not found
- `ReportNotFoundError` - Regional report not found
- `KpiNotFoundError` - KPI not found
- `DuplicateRegionError` - Region already exists
- `InvalidDateRangeError` - Invalid date range for reports

### Repository

**File: `gov.repository.ts`**

All 10 repository interfaces follow standard CRUD pattern with additional domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovRegionAnalyticsService` | `gov-region-analytics.service.ts` | Regional analytics |
| `GovRegionDashboardService` | `gov-region-dashboard.service.ts` | Dashboard aggregation |
| `GovRegionReportingService` | `gov-region-reporting.service.ts` | Report generation |
| `GovRegionUserService` | `gov-region-user.service.ts` | Region user management |
| `GovRegionalDirectorateService` | `gov-regional-directorate.service.ts` | Directorate management |
| `GovRegionalReportService` | `gov-regional-report.service.ts` | Regional reports |
| `GovRegionalKpiService` | `gov-regional-kpi.service.ts` | KPI tracking |
| `GovRegionalBudgetService` | `gov-regional-budget.service.ts` | Regional budget |
| `GovRegionalAnalyticsKpiService` | `gov-regional-analytics-kpi.service.ts` | Analytics KPIs |
| `GovInspectorService` | `gov-inspector.service.ts` | Inspector management |
| `GovInspectorPerformanceService` | `gov-inspector-performance.service.ts` | Inspector performance |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-region-analytics` | Regional analytics state |
| `use-gov-region-dashboard` | Dashboard data |
| `use-gov-region-reporting` | Report generation |
| `use-gov-region-user-management` | User management |
| `use-gov-region-user-list` | User list operations |
| `use-gov-region-user-actions` | User CRUD actions |
| `use-gov-regional-directorate-management` | Directorate state |
| `use-gov-regional-directorate-list` | Directorate list |
| `use-gov-regional-directorate-actions` | Directorate CRUD |
| `use-gov-regional-report-management` | Report state |
| `use-gov-regional-report-list` | Report list |
| `use-gov-regional-report-actions` | Report CRUD |
| `use-gov-regional-kpi-management` | KPI state |
| `use-gov-regional-kpi-list` | KPI list |
| `use-gov-regional-kpi-actions` | KPI CRUD |
| `use-gov-regional-budget-management` | Budget state |
| `use-gov-regional-budget-list` | Budget list |
| `use-gov-regional-budget-actions` | Budget CRUD |
| `use-gov-regional-analytics-kpi-management` | Analytics KPI state |
| `use-gov-regional-analytics-kpi-list` | Analytics KPI list |
| `use-gov-regional-analytics-kpi-actions` | Analytics KPI CRUD |
| `use-gov-inspector-management` | Inspector state |
| `use-gov-inspector-list` | Inspector list |
| `use-gov-inspector-actions` | Inspector CRUD |
| `use-gov-academy-management` | Academy state |
| `use-gov-academy-list` | Academy list |
| `use-gov-academy-actions` | Academy CRUD |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/region` | GET, POST |
| `/api/gov/region/[id]` | GET, PUT, DELETE |
| `/api/gov/region-user` | GET, POST |
| `/api/gov/region-user/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-directorate` | GET, POST |
| `/api/gov/regional-directorate/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-report` | GET, POST |
| `/api/gov/regional-report/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-kpi` | GET, POST |
| `/api/gov/regional-kpi/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-budget` | GET, POST |
| `/api/gov/regional-budget/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-analytics-kpi` | GET, POST |
| `/api/gov/regional-analytics-kpi/[id]` | GET, PUT, DELETE |
| `/api/gov/academy` | GET, POST |
| `/api/gov/academy/[id]` | GET, PUT, DELETE |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovRegionListScreen` | List all regions |
| `GovRegionDetailScreen` | Region detail view |
| `GovRegionDashboardScreen` | Region dashboard |
| `GovRegionalReportScreen` | Regional reports |
| `GovRegionalKpiScreen` | Regional KPIs |
| `GovDistrictListScreen` | List districts |
| `GovDirectorateListScreen` | List directorates |
| `GovInspectorListScreen` | List inspectors |
| `GovAcademyListScreen` | List academies |

## Configuration

```typescript
const regionalConfig = {
  maxRegions: 100,
  maxDistrictsPerRegion: 50,
  maxAcademiesPerRegion: 20,
  kpiRefreshInterval: 1800000, // 30 minutes
  reportGenerationTimeout: 300000, // 5 minutes
  inspectorAssignmentAutoBalance: true,
  supportedInspectorSpecializations: [
    'curriculum', 'administration', 'finance', 'infrastructure',
    'student_affairs', 'teacher_development', 'quality_assurance'
  ],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `regional_director` | Full region access, inspector assignment, report approval |
| `district_head` | District-level CRUD, school oversight |
| `inspector` | Visit management, report creation, compliance checking |
| `academy_director` | Academy management, program oversight |
| `region_admin` | User management, system configuration |
| `region_viewer` | Read-only access to dashboards and reports |

## Multi-Tenancy

- Region data scoped by `schoolId`
- District filtering within regions
- Academy specialization-based access
- Inspector assignment isolation

## Offline Support

- Region dashboards cached offline
- Inspector reports available offline
- KPI data synced for offline viewing
- Calendar events available offline

## API Reference

### Education Region
- `GET /api/gov/region` - List regions
- `POST /api/gov/region` - Create region
- `GET /api/gov/region/[id]` - Get region
- `PUT /api/gov/region/[id]` - Update region
- `DELETE /api/gov/region/[id]` - Delete region

### Academy
- `GET /api/gov/academy` - List academies
- `POST /api/gov/academy` - Create academy
- `GET /api/gov/academy/[id]` - Get academy
- `PUT /api/gov/academy/[id]` - Update academy
- `DELETE /api/gov/academy/[id]` - Delete academy

### Regional Directorate
- `GET /api/gov/regional-directorate` - List directorates
- `POST /api/gov/regional-directorate` - Create directorate
- `GET /api/gov/regional-directorate/[id]` - Get directorate
- `PUT /api/gov/regional-directorate/[id]` - Update directorate
- `DELETE /api/gov/regional-directorate/[id]` - Delete directorate

## Testing

- Unit tests for all regional services
- Integration tests for API routes
- E2E tests for regional workflows
- Inspector assignment tests
- Report generation tests

## Security

- JWT authentication required
- RBAC enforced per region
- Inspector identity verification
- Report integrity checks
- Audit logging for all operations
