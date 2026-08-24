# Phase 2.9 - National Analytics

## Overview

The National Analytics module manages education KPIs, regional analytics KPIs, national dashboards, dashboard widgets, predictive analytics, dropout maps, infrastructure maps, teacher distribution, student distribution, budget analytics, education forecasts, and data collections. It provides comprehensive data-driven insights for national education governance.

```
┌─────────────────────────────────────────────────────────┐
│              NATIONAL ANALYTICS ARCHITECTURE             │
├─────────────────────────────────────────────────────────┤
│  KPIs → Dashboard → Widgets → Visualization              │
│  Predictive → Forecast → Dropout Map → Infrastructure    │
│  Distribution → Budget → Data Collection → Reporting     │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (12 in Module 8):**
- `GovEducationKpiRepository` - KPI CRUD + findByCategory, findByYear, findLatest
- `GovRegionalAnalyticsKpiRepository` - Regional KPI CRUD + findByRegionId, findByYear, findLatest
- `GovNationalDashboardRepository` - Dashboard CRUD + findActive, findByType, findByOwnerId
- `GovDashboardWidgetRepository` - Widget CRUD + findByDashboardId, findByType, reorder
- `GovPredictiveAnalyticRepository` - Predictive CRUD + findByModelType, findByStatus, findLatest
- `GovDropoutMapRepository` - Dropout map CRUD + findByRegionId, findByYear, findLatest
- `GovInfrastructureMapRepository` - Infrastructure map CRUD + findByRegionId, findByType, findLatest
- `GovTeacherDistributionRepository` - Teacher distribution CRUD + findByRegionId, findByYear, findLatest
- `GovStudentDistributionRepository` - Student distribution CRUD + findByRegionId, findByYear, findLatest
- `GovBudgetAnalyticRepository` - Budget analytic CRUD + findByRegionId, findByYear, findLatest
- `GovEducationForecastRepository` - Forecast CRUD + findByModelType, findByTargetYear, findLatest
- `GovDataCollectionRepository` - Data collection CRUD + findByStatus, findByDateRange, complete

### Validators

**File: `gov-analytics-funding-identity.ts` (2200 lines)**

| Schema | Purpose |
|--------|---------|
| `educationKpiCreateSchema` | Validates KPI creation (name, category, target, unit) |
| `educationKpiUpdateSchema` | Validates KPI updates |
| `educationKpiQuerySchema` | Validates KPI queries |
| `regionalAnalyticsKpiCreateSchema` | Validates regional KPI creation |
| `regionalAnalyticsKpiUpdateSchema` | Validates regional KPI updates |
| `regionalAnalyticsKpiQuerySchema` | Validates regional KPI queries |
| `nationalDashboardCreateSchema` | Validates dashboard creation |
| `nationalDashboardUpdateSchema` | Validates dashboard updates |
| `nationalDashboardQuerySchema` | Validates dashboard queries |
| `dashboardWidgetCreateSchema` | Validates widget creation |
| `dashboardWidgetUpdateSchema` | Validates widget updates |
| `dashboardWidgetQuerySchema` | Validates widget queries |
| `predictiveAnalyticCreateSchema` | Validates predictive model creation |
| `predictiveAnalyticUpdateSchema` | Validates predictive updates |
| `predictiveAnalyticQuerySchema` | Validates predictive queries |
| `dropoutMapCreateSchema` | Validates dropout map creation |
| `dropoutMapUpdateSchema` | Validates dropout map updates |
| `dropoutMapQuerySchema` | Validates dropout map queries |
| `infrastructureMapCreateSchema` | Validates infrastructure map creation |
| `infrastructureMapUpdateSchema` | Validates infrastructure map updates |
| `infrastructureMapQuerySchema` | Validates infrastructure map queries |
| `teacherDistributionCreateSchema` | Validates teacher distribution creation |
| `teacherDistributionUpdateSchema` | Validates teacher distribution updates |
| `teacherDistributionQuerySchema` | Validates teacher distribution queries |
| `studentDistributionCreateSchema` | Validates student distribution creation |
| `studentDistributionUpdateSchema` | Validates student distribution updates |
| `studentDistributionQuerySchema` | Validates student distribution queries |
| `budgetAnalyticCreateSchema` | Validates budget analytic creation |
| `budgetAnalyticUpdateSchema` | Validates budget analytic updates |
| `budgetAnalyticQuerySchema` | Validates budget analytic queries |
| `educationForecastCreateSchema` | Validates forecast creation |
| `educationForecastUpdateSchema` | Validates forecast updates |
| `educationForecastQuerySchema` | Validates forecast queries |
| `dataCollectionCreateSchema` | Validates data collection creation |
| `dataCollectionUpdateSchema` | Validates data collection updates |
| `dataCollectionQuerySchema` | Validates data collection queries |

### Errors

- `KpiNotFoundError` - KPI not found
- `DashboardNotFoundError` - Dashboard not found
- `WidgetNotFoundError` - Widget not found
- `PredictiveModelNotFoundError` - Predictive model not found
- `MapDataNotFoundError` - Map data not found
- `DistributionNotFoundError` - Distribution data not found
- `ForecastNotFoundError` - Forecast not found
- `DataCollectionNotFoundError` - Data collection not found
- `InvalidModelTypeError` - Invalid predictive model type
- `DataRefreshFailedError` - Data refresh failed

### Repository

All 12 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovPredictiveAnalyticService` | `gov-predictive-analytic.service.ts` | Predictive analytics |
| `GovInfrastructureMapService` | `gov-infrastructure-map.service.ts` | Infrastructure mapping |
| `GovNationalDashboardService` | `gov-national-dashboard.service.ts` | Dashboard management |
| `GovRegionAnalyticsService` | `gov-region-analytics.service.ts` | Regional analytics |
| `GovRegionalAnalyticsKpiService` | `gov-regional-analytics-kpi.service.ts` | Regional KPIs |
| `GovRegionDashboardService` | `gov-region-dashboard.service.ts` | Region dashboard |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-analytics-dashboard` | Dashboard state management |
| `use-gov-analytics-data-aggregation` | Data aggregation |
| `use-gov-analytics-forecast` | Forecast management |
| `use-gov-analytics-map-generation` | Map generation |
| `use-gov-analytics-report-generation` | Report generation |
| `use-gov-education-kpi-management` | KPI state management |
| `use-gov-education-kpi-list` | KPI list operations |
| `use-gov-education-kpi-actions` | KPI CRUD actions |
| `use-gov-national-dashboard-management` | Dashboard state |
| `use-gov-national-dashboard-list` | Dashboard list |
| `use-gov-national-dashboard-actions` | Dashboard CRUD |
| `use-gov-predictive-analytic-management` | Predictive state |
| `use-gov-predictive-analytic-list` | Predictive list |
| `use-gov-predictive-analytic-actions` | Predictive CRUD |
| `use-gov-dropout-map-management` | Dropout map state |
| `use-gov-infrastructure-map-management` | Infrastructure map state |
| `use-gov-teacher-distribution-management` | Teacher distribution state |
| `use-gov-student-distribution-management` | Student distribution state |
| `use-gov-budget-analytic-management` | Budget analytic state |
| `use-gov-education-forecast-management` | Forecast state |
| `use-gov-data-collection-management` | Data collection state |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/education-kpi` | GET, POST |
| `/api/gov/education-kpi/[id]` | GET, PUT, DELETE |
| `/api/gov/regional-analytics-kpi` | GET, POST |
| `/api/gov/regional-analytics-kpi/[id]` | GET, PUT, DELETE |
| `/api/gov/national-dashboard` | GET, POST |
| `/api/gov/national-dashboard/[id]` | GET, PUT, DELETE |
| `/api/gov/dashboard-widget` | GET, POST |
| `/api/gov/dashboard-widget/[id]` | GET, PUT, DELETE |
| `/api/gov/predictive-analytics` | GET, POST |
| `/api/gov/predictive-analytics/[id]` | GET, PUT, DELETE |
| `/api/gov/dropout-map` | GET, POST |
| `/api/gov/dropout-map/[id]` | GET, PUT, DELETE |
| `/api/gov/infrastructure-map` | GET, POST |
| `/api/gov/infrastructure-map/[id]` | GET, PUT, DELETE |
| `/api/gov/teacher-distribution` | GET, POST |
| `/api/gov/teacher-distribution/[id]` | GET, PUT, DELETE |
| `/api/gov/student-distribution` | GET, POST |
| `/api/gov/student-distribution/[id]` | GET, PUT, DELETE |
| `/api/gov/budget-analytic` | GET, POST |
| `/api/gov/budget-analytic/[id]` | GET, PUT, DELETE |
| `/api/gov/education-forecast` | GET, POST |
| `/api/gov/education-forecast/[id]` | GET, PUT, DELETE |
| `/api/gov/data-collection` | GET, POST |
| `/api/gov/data-collection/[id]` | GET, PUT, DELETE |
| `/api/gov/analytics/dashboard/national-summary` | GET, POST |
| `/api/gov/analytics/map/school-density` | GET, POST |
| `/api/gov/analytics/map/teacher-coverage` | GET, POST |
| `/api/gov/analytics/map/student-distribution` | GET, POST |
| `/api/gov/analytics/map/quality-zones` | GET, POST |
| `/api/gov/analytics/map/inspection-coverage` | GET, POST |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovAnalyticsDashboardScreen` | Analytics dashboard |
| `GovKpiListScreen` | List KPIs |
| `GovPredictiveAnalyticScreen` | Predictive analytics |
| `GovDropoutMapScreen` | Dropout map |
| `GovInfrastructureMapScreen` | Infrastructure map |
| `GovTeacherDistributionScreen` | Teacher distribution |
| `GovStudentDistributionScreen` | Student distribution |
| `GovBudgetAnalyticScreen` | Budget analytics |

## Configuration

```typescript
const analyticsConfig = {
  maxDashboardsPerUser: 10,
  maxWidgetsPerDashboard: 20,
  dashboardRefreshInterval: 300000, // 5 minutes
  kpiCalculationInterval: 3600000, // 1 hour
  predictiveModelRetrainingInterval: 86400000, // 24 hours
  mapDataRefreshInterval: 1800000, // 30 minutes
  forecastHorizonYears: 5,
  supportedKpiCategories: [
    'enrollment', 'retention', 'achievement', 'equity',
    'finance', 'infrastructure', 'teacher'
  ],
  supportedWidgetTypes: [
    'chart', 'table', 'map', 'gauge', 'counter',
    'trend', 'comparison', 'distribution', 'forecast'
  ],
  supportedPredictiveModels: [
    'enrollment_forecast', 'dropout_prediction', 'resource_optimization',
    'performance_prediction', 'infrastructure_needs'
  ],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `analytics_admin` | Full analytics management, model configuration |
| `data_analyst` | KPI creation, dashboard management, report generation |
| `policy_maker` | Predictive analytics, forecast access |
| `regional_manager` | Regional analytics, KPI viewing |
| `school_admin` | School-level analytics, data submission |
| `analytics_viewer` | Read-only dashboard access |

## Multi-Tenancy

- Analytics data scoped by `schoolId`
- Regional filtering available
- National-level aggregations
- Dashboard sharing per tenant

## Offline Support

- Dashboard snapshots offline
- KPI data cached
- Map tiles offline
- Forecast results available offline

## API Reference

### Education KPI
- `GET /api/gov/education-kpi` - List KPIs
- `POST /api/gov/education-kpi` - Create KPI
- `GET /api/gov/education-kpi/[id]` - Get KPI
- `PUT /api/gov/education-kpi/[id]` - Update KPI
- `DELETE /api/gov/education-kpi/[id]` - Delete KPI

### National Dashboard
- `GET /api/gov/national-dashboard` - List dashboards
- `POST /api/gov/national-dashboard` - Create dashboard
- `GET /api/gov/national-dashboard/[id]` - Get dashboard
- `PUT /api/gov/national-dashboard/[id]` - Update dashboard
- `DELETE /api/gov/national-dashboard/[id]` - Delete dashboard

### Predictive Analytics
- `GET /api/gov/predictive-analytics` - List models
- `POST /api/gov/predictive-analytics` - Create model
- `GET /api/gov/predictive-analytics/[id]` - Get model
- `PUT /api/gov/predictive-analytics/[id]` - Update model
- `DELETE /api/gov/predictive-analytics/[id]` - Delete model

## Testing

- Unit tests for all analytics services
- Integration tests for API routes
- E2E tests for dashboard workflows
- Predictive model validation tests
- Map generation tests

## Security

- JWT authentication required
- Data anonymization for sensitive metrics
- Dashboard access control
- Predictive model integrity
- Audit logging for data access
