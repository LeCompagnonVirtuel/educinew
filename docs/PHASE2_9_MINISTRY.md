# Phase 2.9 - Ministry Management

## Overview

The Ministry Management module provides comprehensive government-level education oversight capabilities. It manages the hierarchical structure of education ministries, departments, directorates, policies, programs, strategies, circulars, official documents, education calendars, national statistics, and ministry user management. This module serves as the top-level governance layer for national education systems.

```
┌─────────────────────────────────────────────────────────┐
│                    MINISTRY SYSTEM                       │
├─────────────────────────────────────────────────────────┤
│  Ministry → Department → Directorate → Schools          │
│  Policy → Program → Strategy → Circular → Document      │
│  Calendar → Statistics → Users → Notifications          │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (12 in Module 1):**
- `GovMinistryRepository` - Core ministry CRUD + findActive, findByCountry, findByName
- `GovMinistryDepartmentRepository` - Department CRUD + findByMinistryId, findByDirector
- `GovDirectorateRepository` - Directorate CRUD + findByDepartmentId, findByRegion
- `GovEducationPolicyRepository` - Policy CRUD + findByStatus, findByDateRange
- `GovNationalProgramRepository` - Program CRUD + findByPolicyId, findByAcademicYear
- `GovEducationStrategyRepository` - Strategy CRUD + findByMinistryId, findByStatus
- `GovCircularRepository` - Circular CRUD + findByCategory, findByDateRange
- `GovOfficialDocumentRepository` - Document CRUD + findByType, archive
- `GovEducationCalendarRepository` - Calendar CRUD + findByAcademicYear, findByDateRange
- `GovNationalStatisticRepository` - Statistics CRUD + findByYear, findByCategory, findLatest
- `GovMinistryUserRepository` - User CRUD + findByMinistryId, findByRole
- `GovMinistryNotificationRepository` - Notification CRUD + findUnread, markAsRead, findByPriority

**Entity Types (from @educi/types):**
- `Ministry`, `MinistryCreate`, `MinistryUpdate`, `MinistryQuery`
- `MinistryDepartment`, `MinistryDepartmentCreate`, `MinistryDepartmentUpdate`, `MinistryDepartmentQuery`
- `Directorate`, `DirectorateCreate`, `DirectorateUpdate`, `DirectorateQuery`
- `EducationPolicy`, `EducationPolicyCreate`, `EducationPolicyUpdate`, `EducationPolicyQuery`
- `NationalProgram`, `NationalProgramCreate`, `NationalProgramUpdate`, `NationalProgramQuery`
- `EducationStrategy`, `EducationStrategyCreate`, `EducationStrategyUpdate`, `EducationStrategyQuery`
- `Circular`, `CircularCreate`, `CircularUpdate`, `CircularQuery`
- `OfficialDocument`, `OfficialDocumentCreate`, `OfficialDocumentUpdate`, `OfficialDocumentQuery`
- `EducationCalendar`, `EducationCalendarCreate`, `EducationCalendarUpdate`, `EducationCalendarQuery`
- `NationalStatistic`, `NationalStatisticCreate`, `NationalStatisticUpdate`, `NationalStatisticQuery`
- `MinistryUser`, `MinistryUserCreate`, `MinistryUserUpdate`, `MinistryUserQuery`
- `MinistryNotification`, `MinistryNotificationCreate`, `MinistryNotificationUpdate`, `MinistryNotificationQuery`

### Validators

**File: `gov-ministry-region.ts` (958 lines)**

| Schema | Purpose |
|--------|---------|
| `ministryCreateSchema` | Validates ministry creation (name, country, code, status) |
| `ministryUpdateSchema` | Validates ministry updates (all fields optional) |
| `ministryQuerySchema` | Validates ministry list queries (pagination, sorting, filters) |
| `ministryFilterSchema` | Validates ministry filters (country, status, search) |
| `ministryDepartmentCreateSchema` | Validates department creation |
| `ministryDepartmentUpdateSchema` | Validates department updates |
| `ministryDepartmentQuerySchema` | Validates department queries |
| `directorateCreateSchema` | Validates directorate creation |
| `directorateUpdateSchema` | Validates directorate updates |
| `directorateQuerySchema` | Validates directorate queries |
| `educationPolicyCreateSchema` | Validates policy creation |
| `educationPolicyUpdateSchema` | Validates policy updates |
| `educationPolicyQuerySchema` | Validates policy queries |
| `nationalProgramCreateSchema` | Validates program creation |
| `nationalProgramUpdateSchema` | Validates program updates |
| `nationalProgramQuerySchema` | Validates program queries |
| `educationStrategyCreateSchema` | Validates strategy creation |
| `educationStrategyUpdateSchema` | Validates strategy updates |
| `educationStrategyQuerySchema` | Validates strategy queries |
| `circularCreateSchema` | Validates circular creation |
| `circularUpdateSchema` | Validates circular updates |
| `circularQuerySchema` | Validates circular queries |
| `officialDocumentCreateSchema` | Validates document creation |
| `officialDocumentUpdateSchema` | Validates document updates |
| `officialDocumentQuerySchema` | Validates document queries |
| `educationCalendarCreateSchema` | Validates calendar creation |
| `educationCalendarUpdateSchema` | Validates calendar updates |
| `educationCalendarQuerySchema` | Validates calendar queries |
| `nationalStatisticCreateSchema` | Validates statistic creation |
| `nationalStatisticUpdateSchema` | Validates statistic updates |
| `nationalStatisticQuerySchema` | Validates statistic queries |
| `ministryUserCreateSchema` | Validates user creation |
| `ministryUserUpdateSchema` | Validates user updates |
| `ministryUserQuerySchema` | Validates user queries |
| `ministryNotificationCreateSchema` | Validates notification creation |
| `ministryNotificationUpdateSchema` | Validates notification updates |
| `ministryNotificationQuerySchema` | Validates notification queries |
| `educationRegionCreateSchema` | Validates region creation |
| `educationRegionUpdateSchema` | Validates region updates |
| `educationRegionQuerySchema` | Validates region queries |
| `educationDistrictCreateSchema` | Validates district creation |
| `educationDistrictUpdateSchema` | Validates district updates |
| `educationDistrictQuerySchema` | Validates district queries |
| `academyCreateSchema` | Validates academy creation |
| `academyUpdateSchema` | Validates academy updates |
| `academyQuerySchema` | Validates academy queries |
| `regionalDirectorateCreateSchema` | Validates regional directorate creation |
| `regionalDirectorateUpdateSchema` | Validates regional directorate updates |
| `regionalDirectorateQuerySchema` | Validates regional directorate queries |

### Errors

**Error Classes (from service layer):**
- `MinistryNotFoundError` - Thrown when ministry not found
- `MinistryAlreadyExistsError` - Thrown on duplicate ministry creation
- `DepartmentNotFoundError` - Thrown when department not found
- `PolicyNotFoundError` - Thrown when policy not found
- `ProgramNotFoundError` - Thrown when program not found
- `CalendarNotFoundError` - Thrown when calendar entry not found
- `StatisticNotFoundError` - Thrown when statistic not found
- `UserNotFoundError` - Thrown when ministry user not found
- `ValidationError` - Thrown on invalid input data
- `UnauthorizedError` - Thrown on unauthorized access

### Repository

**File: `gov.repository.ts`**

| Repository | Methods |
|------------|---------|
| `GovMinistryRepository` | findById, findAll, create, update, delete, count, findActive, findByCountry, findByName |
| `GovMinistryDepartmentRepository` | findById, findAll, create, update, delete, count, findByMinistryId, findActive, findByDirector |
| `GovDirectorateRepository` | findById, findAll, create, update, delete, count, findByDepartmentId, findActive, findByRegion |
| `GovEducationPolicyRepository` | findById, findAll, create, update, delete, count, findByStatus, findByMinistryId, findActive, findByDateRange |
| `GovNationalProgramRepository` | findById, findAll, create, update, delete, count, findByPolicyId, findActive, findByAcademicYear |
| `GovEducationStrategyRepository` | findById, findAll, create, update, delete, count, findByMinistryId, findActive, findByStatus |
| `GovCircularRepository` | findById, findAll, create, update, delete, count, findByMinistryId, findActive, findByDateRange, findByCategory |
| `GovOfficialDocumentRepository` | findById, findAll, create, update, delete, count, findByMinistryId, findByType, findByStatus, archive |
| `GovEducationCalendarRepository` | findById, findAll, create, update, delete, count, findByAcademicYear, findByDateRange, findActive |
| `GovNationalStatisticRepository` | findById, findAll, create, update, delete, count, findByYear, findByCategory, findLatest |
| `GovMinistryUserRepository` | findById, findAll, create, update, delete, count, findByMinistryId, findByRole, findActive |
| `GovMinistryNotificationRepository` | findById, findAll, create, update, delete, count, findByMinistryId, findUnread, markAsRead, findByPriority |

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovMinistryService` | `gov-ministry.service.ts` | Core ministry CRUD operations |
| `GovMinistryDepartmentService` | `gov-ministry-department.service.ts` | Department management |
| `GovMinistryDashboardService` | `gov-ministry-dashboard.service.ts` | Dashboard aggregation |
| `GovMinistryAnalyticsService` | `gov-ministry-analytics.service.ts` | Ministry analytics |
| `GovMinistryExportService` | `gov-ministry-export.service.ts` | Data export capabilities |
| `GovMinistryUserService` | `gov-ministry-user.service.ts` | User management |
| `GovMinistryNotificationService` | `gov-ministry-notification.service.ts` | Notification dispatch |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-ministry-management` | Ministry CRUD state management |
| `use-gov-ministry-list` | Ministry list with pagination/filtering |
| `use-gov-ministry-actions` | Ministry create/update/delete actions |
| `use-gov-ministry-department-management` | Department state management |
| `use-gov-ministry-department-list` | Department list operations |
| `use-gov-ministry-department-actions` | Department CRUD actions |
| `use-gov-directorate-management` | Directorate state management |
| `use-gov-directorate-list` | Directorate list operations |
| `use-gov-directorate-actions` | Directorate CRUD actions |
| `use-gov-education-policy-management` | Policy state management |
| `use-gov-education-policy-list` | Policy list operations |
| `use-gov-education-policy-actions` | Policy CRUD actions |
| `use-gov-national-program-management` | Program state management |
| `use-gov-national-program-list` | Program list operations |
| `use-gov-national-program-actions` | Program CRUD actions |
| `use-gov-education-strategy-management` | Strategy state management |
| `use-gov-education-strategy-list` | Strategy list operations |
| `use-gov-education-strategy-actions` | Strategy CRUD actions |
| `use-gov-circular-management` | Circular state management |
| `use-gov-circular-list` | Circular list operations |
| `use-gov-circular-actions` | Circular CRUD actions |
| `use-gov-official-document-management` | Document state management |
| `use-gov-official-document-list` | Document list operations |
| `use-gov-official-document-actions` | Document CRUD actions |
| `use-gov-education-calendar-management` | Calendar state management |
| `use-gov-education-calendar-list` | Calendar list operations |
| `use-gov-education-calendar-actions` | Calendar CRUD actions |
| `use-gov-national-statistic-management` | Statistic state management |
| `use-gov-national-statistic-list` | Statistic list operations |
| `use-gov-national-statistic-actions` | Statistic CRUD actions |
| `use-gov-ministry-user-management` | User state management |
| `use-gov-ministry-user-list` | User list operations |
| `use-gov-ministry-user-actions` | User CRUD actions |
| `use-gov-ministry-notification-management` | Notification state management |
| `use-gov-ministry-notification-list` | Notification list operations |
| `use-gov-ministry-notification-actions` | Notification CRUD actions |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/ministry` | GET (list), POST (create) |
| `/api/gov/ministry/[id]` | GET (read), PUT (update), DELETE (delete) |
| `/api/gov/ministry-department` | GET, POST |
| `/api/gov/ministry-department/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry-user` | GET, POST |
| `/api/gov/ministry-user/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry-notification` | GET, POST |
| `/api/gov/ministry-notification/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/reports/quarterly` | GET, POST |
| `/api/gov/ministry/reports/quarterly/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/reports/parliamentary` | GET, POST |
| `/api/gov/ministry/reports/parliamentary/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/reports/monthly` | GET, POST |
| `/api/gov/ministry/reports/monthly/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/reports/international` | GET, POST |
| `/api/gov/ministry/reports/international/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/reports/annual` | GET, POST |
| `/api/gov/ministry/reports/annual/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/reports/ad-hoc` | GET, POST |
| `/api/gov/ministry/reports/ad-hoc/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/analytics/staff-productivity` | GET, POST |
| `/api/gov/ministry/analytics/staff-productivity/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/analytics/efficiency` | GET, POST |
| `/api/gov/ministry/analytics/efficiency/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/analytics/budget-utilization` | GET, POST |
| `/api/gov/ministry/analytics/budget-utilization/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/analytics/public-satisfaction` | GET, POST |
| `/api/gov/ministry/analytics/public-satisfaction/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/analytics/program-outcomes` | GET, POST |
| `/api/gov/ministry/analytics/program-outcomes/[id]` | GET, PUT, DELETE |
| `/api/gov/ministry/analytics/performance` | GET, POST |
| `/api/gov/ministry/analytics/performance/[id]` | GET, PUT, DELETE |
| `/api/gov/directorate` | GET, POST |
| `/api/gov/directorate/[id]` | GET, PUT, DELETE |
| `/api/gov/department` | GET, POST |
| `/api/gov/department/[id]` | GET, PUT, DELETE |
| `/api/gov/policy` | GET, POST |
| `/api/gov/policy/[id]` | GET, PUT, DELETE |
| `/api/gov/national-program` | GET, POST |
| `/api/gov/national-program/[id]` | GET, PUT, DELETE |
| `/api/gov/official-document` | GET, POST |
| `/api/gov/official-document/[id]` | GET, PUT, DELETE |
| `/api/gov/calendar` | GET, POST |
| `/api/gov/calendar/[id]` | GET, PUT, DELETE |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovDashboardScreen` | Main ministry dashboard |
| `GovMinistryListScreen` | List all ministries |
| `GovMinistryDetailScreen` | Ministry detail view |
| `GovDirectorateListScreen` | List directorates |
| `GovDepartmentListScreen` | List departments |
| `GovPolicyListScreen` | List education policies |
| `GovCircularListScreen` | List circulars |
| `GovCalendarScreen` | Education calendar view |

## Configuration

```typescript
// Ministry configuration
const ministryConfig = {
  maxNameLength: 200,
  maxCodeLength: 50,
  supportedStatuses: ['active', 'inactive', 'dissolved', 'pending'],
  defaultPageSize: 20,
  maxPageSize: 100,
  supportedReportTypes: ['quarterly', 'parliamentary', 'monthly', 'international', 'annual', 'ad-hoc'],
  analyticsRefreshInterval: 3600000, // 1 hour
  notificationPriorities: ['low', 'medium', 'high', 'urgent'],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `minister` | Full ministry access, policy creation, strategy approval |
| `director_general` | Department oversight, report generation, user management |
| `department_head` | Department-level CRUD, staff management, budget access |
| `policy_analyst` | Policy creation/editing, program management |
| `statistician` | National statistics, data collection, report generation |
| `admin` | System configuration, user management, audit logs |
| `viewer` | Read-only access to dashboards and reports |

## Multi-Tenancy

- All queries scoped by `schoolId` parameter
- Ministry data isolated per tenant
- Cross-tenant access requires explicit authorization
- Country-level filtering for regional ministries

## Offline Support

- Ministry dashboards cached for offline viewing
- Statistics data available offline
- Calendar events synced for offline access
- Offline-first approach for field inspectors

## API Reference

### Ministry
- `GET /api/gov/ministry` - List ministries with pagination
- `POST /api/gov/ministry` - Create new ministry
- `GET /api/gov/ministry/[id]` - Get ministry by ID
- `PUT /api/gov/ministry/[id]` - Update ministry
- `DELETE /api/gov/ministry/[id]` - Delete ministry

### Ministry Department
- `GET /api/gov/ministry-department` - List departments
- `POST /api/gov/ministry-department` - Create department
- `GET /api/gov/ministry-department/[id]` - Get department
- `PUT /api/gov/ministry-department/[id]` - Update department
- `DELETE /api/gov/ministry-department/[id]` - Delete department

### Ministry Reports
- `GET /api/gov/ministry/reports/quarterly` - List quarterly reports
- `POST /api/gov/ministry/reports/quarterly` - Generate quarterly report
- `GET /api/gov/ministry/reports/parliamentary` - List parliamentary reports
- `POST /api/gov/ministry/reports/parliamentary` - Generate parliamentary report
- `GET /api/gov/ministry/reports/annual` - List annual reports
- `POST /api/gov/ministry/reports/annual` - Generate annual report

### Ministry Analytics
- `GET /api/gov/ministry/analytics/performance` - Performance analytics
- `GET /api/gov/ministry/analytics/budget-utilization` - Budget utilization
- `GET /api/gov/ministry/analytics/staff-productivity` - Staff productivity
- `GET /api/gov/ministry/analytics/public-satisfaction` - Public satisfaction
- `GET /api/gov/ministry/analytics/program-outcomes` - Program outcomes
- `GET /api/gov/ministry/analytics/efficiency` - Efficiency metrics

## Testing

- Unit tests for all ministry services
- Integration tests for API routes
- E2E tests for ministry CRUD workflows
- Validator schema tests
- Mock repository tests

## Security

- JWT authentication required for all endpoints
- Role-based access control (RBAC) enforced
- Input validation via Zod schemas
- SQL injection prevention via parameterized queries
- Rate limiting on analytics endpoints
- Audit logging for all ministry operations
- Sensitive data encryption at rest
- HTTPS enforcement for all API calls
