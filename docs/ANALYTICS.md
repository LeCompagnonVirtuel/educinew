# Phase 2.2 — Analytics & Business Intelligence Module

## Overview

The Analytics & Business Intelligence Module is the enterprise-grade data intelligence layer of EduCI. It provides comprehensive analytics across all institutional domains — academic, financial, HR, student, teacher, and parent — with predictive AI, custom dashboards, report builder, data warehouse, real-time streaming, and scheduled delivery capabilities.

### Core Capabilities

- **Executive Dashboard** — Unified KPI overview across all domains
- **Domain Analytics** — Academic, Financial, HR, Student, Teacher, Parent
- **Predictive AI** — Dropout prediction, payment default, revenue forecasting, enrollment forecasting, staff turnover, class overload, demand forecasting
- **Custom Dashboards** — Drag-and-drop widget-based dashboards with sharing
- **Report Builder** — Configurable columns, charts, filters, scheduling
- **Data Warehouse** — Fact tables, dimensions, ETL jobs
- **Real-Time Analytics** — Live KPI streaming
- **Scheduled Reports** — Email, SMS, push, webhook delivery
- **Export/Import** — Excel, PDF, CSV, JSON, XML, PowerPoint
- **Caching** — Multi-tier cache with configurable TTL
- **Permissions** — Granular RBAC per analytics domain

---

## Architecture

### Design Patterns

| Pattern | Implementation |
|---------|---------------|
| DDD (Domain-Driven Design) | Domains: academic, financial, hr, student, teacher, parent |
| Repository Pattern | `analytics.repository.ts` — 567-line Supabase data access layer |
| Service Layer | 40 service files with domain-specific logic |
| Hook Layer | 120 React hooks for UI state management |
| Validation Layer | 70+ Zod schemas for API input validation |

### Data Flow

```
Page Component → Hook → Service → Repository → Supabase
     ↓              ↓         ↓           ↓
   (UI)      (React State) (Business)  (Data Access)
```

### Multi-Tenancy

All queries are scoped by `schoolId` parameter. The repository enforces tenant isolation at the data access level.

---

## Module Structure

### File Inventory

| Layer | Count | Description |
|-------|-------|-------------|
| Types | 1 (`types.ts`) | Re-exports from `@educi/types` |
| Validators | 1 (`schemas.ts`) | 70+ Zod validation schemas |
| Repository | 1 (`analytics.repository.ts`) | 567-line Supabase data access (50+ methods) |
| Services | 40 files | Domain-specific business logic |
| Hooks | 120 files | React hooks for UI state |
| API Routes | 120+ routes | RESTful endpoints organized by domain |
| Mobile Screens | 12 files | React Native analytics screens |

**Total: ~300+ files**

### Directory Layout

```
web/src/features/analytics/
├── types.ts                              # Type re-exports from @educi/types
├── validators/
│   └── schemas.ts                        # 70+ Zod validation schemas
├── repositories/
│   └── analytics.repository.ts           # SupabaseAnalyticsRepository (50+ methods)
├── services/
│   ├── index.ts                          # 40 service exports
│   ├── executive-dashboard.service.ts    # Executive dashboard aggregation
│   ├── academic-analytics.service.ts     # Academic domain analytics
│   ├── financial-analytics.service.ts    # Financial domain analytics
│   ├── hr-analytics.service.ts           # HR domain analytics
│   ├── student-analytics.service.ts      # Student domain analytics
│   ├── teacher-analytics.service.ts      # Teacher domain analytics
│   ├── parent-analytics.service.ts       # Parent domain analytics
│   ├── predictive-ai.service.ts          # Predictive AI models
│   ├── report.service.ts                 # Report CRUD & execution
│   ├── report-builder.service.ts         # Report builder logic
│   ├── dashboard.service.ts              # Dashboard CRUD
│   ├── dashboard-builder.service.ts      # Dashboard builder logic
│   ├── widget.service.ts                 # Widget CRUD
│   ├── chart.service.ts                  # Chart data aggregation
│   ├── export.service.ts                 # Multi-format export
│   ├── scheduled-report.service.ts       # Scheduled report management
│   ├── data-warehouse.service.ts         # Fact tables & dimensions
│   ├── data-source.service.ts            # Data source registry
│   ├── etl.service.ts                    # ETL job management
│   ├── kpi.service.ts                    # KPI calculation & aggregation
│   ├── snapshot.service.ts               # Point-in-time snapshots
│   ├── aggregation.service.ts            # Data aggregation pipelines
│   ├── cache.service.ts                  # Multi-tier caching
│   ├── permission.service.ts             # RBAC permission checks
│   ├── analytics-permission.service.ts   # Analytics-specific permissions
│   ├── event.service.ts                  # Analytics event logging
│   ├── notification.service.ts           # Alert notifications
│   ├── geo-analytics.service.ts          # Geographic analytics
│   ├── heatmap-analytics.service.ts      # Heatmap analytics
│   ├── funnel-analytics.service.ts       # Funnel analytics
│   ├── timeline-analytics.service.ts     # Timeline analytics
│   ├── cohort.service.ts                 # Cohort analysis
│   ├── cohort-retention.service.ts       # Cohort retention curves
│   ├── comparison.service.ts             # Period-over-period comparison
│   ├── trend.service.ts                  # Trend analysis
│   ├── anomaly.service.ts                # Anomaly detection
│   ├── benchmark.service.ts              # Benchmark comparisons
│   ├── segment.service.ts                # Student/parent segmentation
│   ├── real-time.service.ts              # Real-time streaming
│   └── scheduler.service.ts              # Job scheduling
├── hooks/
│   ├── use-academic-analytics.ts         # Academic analytics data
│   ├── use-age-distribution.ts           # Age distribution analysis
│   ├── use-aggregation.ts               # Data aggregation
│   ├── use-alerts.ts                     # Alert management
│   ├── use-analytics-filters.ts          # Filter state
│   ├── use-analytics-permissions.ts      # Permission checks
│   ├── use-analytics-search.ts           # Search functionality
│   ├── use-anomaly.ts                    # Anomaly detection
│   ├── use-attendance-kpi.ts             # Attendance KPIs
│   ├── use-benchmark.ts                  # Benchmark comparisons
│   ├── use-budget-utilization.ts         # Budget utilization
│   ├── use-cache.ts                      # Cache management
│   ├── use-cash-flow.ts                  # Cash flow analytics
│   ├── use-chart-data.ts                 # Chart data fetching
│   ├── use-chart-preview.ts              # Chart preview
│   ├── use-class-performance.ts          # Class performance
│   ├── use-cohort.ts                     # Cohort analysis
│   ├── use-column-config.ts              # Column configuration
│   ├── use-communication-analytics.ts    # Communication analytics
│   ├── use-comparison.ts                 # Period comparison
│   ├── use-compensation-analysis.ts      # Compensation analysis
│   ├── use-connectivity-analysis.ts      # Connectivity analysis
│   ├── use-cost-kpi.ts                   # Cost KPIs
│   ├── use-daily-comparison.ts           # Daily comparison
│   ├── use-dashboard-builder.ts          # Dashboard builder state
│   ├── use-dashboard-overview.ts         # Dashboard overview
│   ├── use-dashboards.ts                 # Dashboard list
│   ├── use-dashboard-share.ts            # Dashboard sharing
│   ├── use-data-sources.ts               # Data source registry
│   ├── use-data-table.ts                 # Data table state
│   ├── use-date-range.ts                 # Date range picker
│   ├── use-demographic-analysis.ts       # Demographic analysis
│   ├── use-digital-literacy-analysis.ts  # Digital literacy
│   ├── use-dimensions.ts                 # Data warehouse dimensions
│   ├── use-discipline-analytics.ts       # Discipline analytics
│   ├── use-dropout-risk.ts               # Dropout risk prediction
│   ├── use-education-level-analysis.ts   # Education level analysis
│   ├── use-enrollment-kpi.ts             # Enrollment KPIs
│   ├── use-enrollment-trend.ts           # Enrollment trends
│   ├── use-environmental-analysis.ts     # Environmental analysis
│   ├── use-ethnic-analysis.ts            # Ethnic analysis
│   ├── use-etl.ts                        # ETL job management
│   ├── use-etl-jobs.ts                   # ETL job list
│   ├── use-events.ts                     # Analytics events
│   ├── use-executive-dashboard.ts        # Executive dashboard
│   ├── use-expense-trend.ts              # Expense trends
│   ├── use-export.ts                     # Export functionality
│   ├── use-fact-table.ts                 # Fact table queries
│   ├── use-filter-builder.ts             # Filter builder
│   ├── use-financial-analytics.ts        # Financial analytics
│   ├── use-forecast.ts                   # Forecasting
│   ├── use-funnel.ts                     # Funnel analysis
│   ├── use-funnel-analytics.ts           # Funnel analytics
│   ├── use-gender-analysis.ts            # Gender analysis
│   ├── use-geo-analytics.ts              # Geographic analytics
│   ├── use-geographic-distribution.ts    # Geographic distribution
│   ├── use-geo-map.ts                    # Geo map data
│   ├── use-grade-evolution.ts            # Grade evolution
│   ├── use-growth-rate.ts                # Growth rate
│   ├── use-health-analytics.ts           # Health analytics
│   ├── use-health-outcomes.ts            # Health outcomes
│   ├── use-heatmap.ts                    # Heatmap data
│   ├── use-heatmap-analytics.ts          # Heatmap analytics
│   ├── use-hr-analytics.ts               # HR analytics
│   ├── use-import.ts                     # Import functionality
│   ├── use-income-analysis.ts            # Income analysis
│   ├── use-infrastructure-analysis.ts    # Infrastructure analysis
│   ├── use-kpi.ts                        # KPI data
│   ├── use-language-analysis.ts          # Language analysis
│   ├── use-literacy-analysis.ts          # Literacy analysis
│   ├── use-monthly-comparison.ts         # Monthly comparison
│   ├── use-nutrition-analysis.ts         # Nutrition analysis
│   ├── use-pagination.ts                 # Pagination state
│   ├── use-parent-analytics.ts           # Parent analytics
│   ├── use-parent-engagement.ts          # Parent engagement
│   ├── use-payment-status.ts             # Payment status
│   ├── use-performance-kpi.ts            # Performance KPIs
│   ├── use-performance-rating.ts         # Performance ratings
│   ├── use-permissions.ts                # Permission checks
│   ├── use-poverty-analysis.ts           # Poverty analysis
│   ├── use-predictions.ts                # Predictions
│   ├── use-predictive-model.ts           # Predictive model
│   ├── use-profit-kpi.ts                 # Profit KPIs
│   ├── use-quarterly-comparison.ts       # Quarterly comparison
│   ├── use-real-time.ts                  # Real-time streaming
│   ├── use-religion-analysis.ts          # Religion analysis
│   ├── use-report-builder.ts             # Report builder
│   ├── use-report-execution.ts           # Report execution
│   ├── use-report-preview.ts             # Report preview
│   ├── use-reports.ts                    # Reports list
│   ├── use-retention.ts                  # Retention analysis
│   ├── use-retention-kpi.ts              # Retention KPIs
│   ├── use-revenue-kpi.ts                # Revenue KPIs
│   ├── use-revenue-trend.ts              # Revenue trends
│   ├── use-satisfaction-kpi.ts           # Satisfaction KPIs
│   ├── use-scheduled-reports.ts          # Scheduled reports
│   ├── use-scheduler.ts                  # Scheduler management
│   ├── use-school-comparison.ts          # School comparison
│   ├── use-segment.ts                    # Segmentation
│   ├── use-snapshots.ts                  # Snapshots
│   ├── use-socioeconomic-analysis.ts     # Socioeconomic analysis
│   ├── use-sort-config.ts                # Sort configuration
│   ├── use-student-analytics.ts          # Student analytics
│   ├── use-student-kpi.ts                # Student KPIs
│   ├── use-subject-difficulty.ts         # Subject difficulty
│   ├── use-success-rate.ts               # Success rate
│   ├── use-target-vs-actual.ts           # Target vs actual
│   ├── use-teacher-analytics.ts          # Teacher analytics
│   ├── use-teacher-kpi.ts                # Teacher KPIs
│   ├── use-technology-analysis.ts        # Technology analysis
│   ├── use-timeline-analytics.ts         # Timeline analytics
│   ├── use-training-progress.ts          # Training progress
│   ├── use-trend.ts                      # Trend data
│   ├── use-turnover-rate.ts              # Turnover rate
│   ├── use-urban-rural-analysis.ts       # Urban/rural analysis
│   ├── use-weather-impact.ts             # Weather impact
│   ├── use-widget-data.ts                # Widget data
│   ├── use-widgets.ts                    # Widget list
│   ├── use-workforce-analytics.ts        # Workforce analytics
│   └── use-year-over-year.ts             # Year-over-year comparison
└── mobile/
    ├── index.ts                           # 11 mobile screen exports
    └── screens/
        ├── ExecutiveDashboardScreen.tsx
        ├── AcademicAnalyticsScreen.tsx
        ├── FinancialAnalyticsScreen.tsx
        ├── HrAnalyticsScreen.tsx
        ├── StudentAnalyticsScreen.tsx
        ├── TeacherAnalyticsScreen.tsx
        ├── ParentAnalyticsScreen.tsx
        ├── PredictiveAIScreen.tsx
        ├── ReportsScreen.tsx
        ├── DashboardsScreen.tsx
        └── ChartsScreen.tsx
```

---

## Types & Interfaces

All types are imported from `@educi/types` and re-exported via `types.ts`.

### Core Analytics Types

| Type | Description |
|------|-------------|
| `ExecutiveDashboard` | Unified executive dashboard with KPIs from all domains |
| `AcademicAnalytics` | Academic performance, attendance, grade evolution |
| `FinancialAnalytics` | Revenue, expenses, profit, cash flow, payments |
| `HrAnalytics` | Workforce, turnover, attendance, training, compensation |
| `StudentAnalytics` | Enrollment, academic, discipline, health, payments |
| `TeacherAnalytics` | Performance, attendance, workload, satisfaction |
| `ParentAnalytics` | Payments, engagement, communication, satisfaction |

### Predictive AI Types

| Type | Description |
|------|-------------|
| `PredictiveAIResult` | Model output with predictions, accuracy, factors |
| `Prediction` | Individual prediction with risk score and factors |
| `PredictionFactor` | Factor contributing to prediction |
| `DropoutPrediction` | Dropout risk assessment |
| `StudentRiskAnalytics` | Student risk distribution |

### Dashboard & Widget Types

| Type | Description |
|------|-------------|
| `CustomDashboard` | User-configurable dashboard |
| `DashboardWidget` | Widget with type, data source, config, position |
| `ChartData` | Chart labels, datasets, metadata |
| `GeoMapData` | Geographic region data |
| `HeatmapData` | Heatmap rows, columns, values |
| `FunnelData` | Funnel stage data |

### Data Warehouse Types

| Type | Description |
|------|-------------|
| `DataWarehouseFact` | Fact table records |
| `DataWarehouseDimension` | Dimension records |
| `ETLJob` | ETL job configuration |

### KPI Types

| Type | Description |
|------|-------------|
| `RevenueKPIs` | Revenue metrics (MRR, ARR, growth, forecasts) |
| `FinancialKPIs` | Financial health (expenses, profit, margins) |
| `AcademicKPIs` | Academic metrics (schools, students, teachers) |
| `HrKPIs` | HR metrics (employees, turnover, satisfaction) |
| `StudentKPIs` | Student metrics (enrollments, retention, GPA) |
| `TeacherKPIs` | Teacher metrics (performance, ratios, certification) |
| `ParentKPIs` | Parent metrics (engagement, satisfaction) |
| `SystemKPIs` | System metrics (uptime, response time, sessions) |

### Enums (from `@educi/types`)

| Enum | Values |
|------|--------|
| `AnalyticsPeriodType` | `daily`, `weekly`, `monthly`, `quarterly`, `yearly` |
| `ChartTypeEnum` | `line`, `area`, `bar`, `pie`, `donut`, `radar`, `polar`, `treemap`, `sankey`, `bubble`, `scatter`, `heatmap`, `gauge`, `funnel`, `candlestick`, `timeline`, `calendar`, `geo_map` |
| `ExportFormatType` | `excel`, `pdf`, `csv`, `json`, `xml`, `powerpoint` |
| `DataSourceTypeEnum` | `students`, `teachers`, `classes`, `subjects`, `exams`, `attendance`, `finance`, `hr`, `messages`, `schools`, `users`, `payments`, `enrollments` |
| `PredictiveModelType` | `dropout`, `payment_default`, `academic_risk`, `revenue_forecast`, `enrollment_forecast`, `staff_turnover`, `class_overload`, `demand_forecast` |
| `ReportScheduleType` | `none`, `daily`, `weekly`, `monthly`, `quarterly`, `yearly` |

### Extended Types

| Type | Description |
|------|-------------|
| `AnalyticsRepositoryExtended` | Repository with event logging |
| `ReportConfig` | Report configuration with columns, charts, schedule |
| `ScheduledReport` | Scheduled delivery configuration |
| `ExportFormat` | Export format with options |
| `ImportResult` | Import result with success/error counts |

---

## API Routes

All routes are under `/api/analytics/` and organized by domain.

### Executive & KPI Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/executive` | GET | Executive dashboard KPIs |
| `/api/analytics/kpi` | GET | KPI data by type |
| `/api/analytics/kpi/[kpiId]` | GET | KPI trend data |
| `/api/analytics/attendance-kpi` | GET | Attendance KPIs |
| `/api/analytics/enrollment-kpi` | GET | Enrollment KPIs |
| `/api/analytics/performance-kpi` | GET | Performance KPIs |
| `/api/analytics/revenue-kpi` | GET | Revenue KPIs |
| `/api/analytics/cost-kpi` | GET | Cost KPIs |
| `/api/analytics/profit-kpi` | GET | Profit KPIs |
| `/api/analytics/retention-kpi` | GET | Retention KPIs |
| `/api/analytics/satisfaction-kpi` | GET | Satisfaction KPIs |
| `/api/analytics/teacher-kpi` | GET | Teacher KPIs |
| `/api/analytics/student-kpi` | GET | Student KPIs |

### Domain Analytics Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/academic` | GET | Academic analytics |
| `/api/analytics/financial` | GET | Financial analytics |
| `/api/analytics/hr` | GET | HR analytics |
| `/api/analytics/students` | GET | Student analytics |
| `/api/analytics/teachers` | GET | Teacher analytics |
| `/api/analytics/parents` | GET | Parent analytics |

### Student Sub-Domain Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/enrollment-trend` | GET | Enrollment trends |
| `/api/analytics/grade-evolution` | GET | Grade evolution |
| `/api/analytics/subject-difficulty` | GET | Subject difficulty |
| `/api/analytics/success-rate` | GET | Success rate |
| `/api/analytics/discipline` | GET | Discipline analytics |
| `/api/analytics/health` | GET | Health analytics |
| `/api/analytics/dropout-risk` | GET | Dropout risk |
| `/api/analytics/payment-status` | GET | Payment status |
| `/api/analytics/parent-engagement` | GET | Parent engagement |

### HR Sub-Domain Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/workforce` | GET | Workforce analytics |
| `/api/analytics/turnover` | GET | Turnover analytics |
| `/api/analytics/training` | GET | Training analytics |
| `/api/analytics/compensation` | GET | Compensation analytics |
| `/api/analytics/performance-rating` | GET | Performance ratings |

### Financial Sub-Domain Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/revenue-trend` | GET | Revenue trends |
| `/api/analytics/expense-trend` | GET | Expense trends |
| `/api/analytics/cash-flow` | GET | Cash flow analytics |
| `/api/analytics/budget-utilization` | GET | Budget utilization |
| `/api/analytics/forecast` | GET | Financial forecast |

### Comparison Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/comparison` | GET | Period comparison |
| `/api/analytics/daily-comparison` | GET | Daily comparison |
| `/api/analytics/monthly-comparison` | GET | Monthly comparison |
| `/api/analytics/quarterly-comparison` | GET | Quarterly comparison |
| `/api/analytics/year-over-year` | GET | Year-over-year |
| `/api/analytics/school-comparison` | GET | School comparison |
| `/api/analytics/target-vs-actual` | GET | Target vs actual |
| `/api/analytics/growth-rate` | GET | Growth rate |

### Demographic & Socioeconomic Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/age-distribution` | GET | Age distribution |
| `/api/analytics/gender-analysis` | GET | Gender analysis |
| `/api/analytics/ethnic-analysis` | GET | Ethnic analysis |
| `/api/analytics/religion-analysis` | GET | Religion analysis |
| `/api/analytics/language-analysis` | GET | Language analysis |
| `/api/analytics/demographic-analysis` | GET | Demographic analysis |
| `/api/analytics/socioeconomic-analysis` | GET | Socioeconomic analysis |
| `/api/analytics/poverty-analysis` | GET | Poverty analysis |
| `/api/analytics/income-analysis` | GET | Income analysis |
| `/api/analytics/urban-rural-analysis` | GET | Urban/rural analysis |
| `/api/analytics/geographic-distribution` | GET | Geographic distribution |
| `/api/analytics/education-level-analysis` | GET | Education level analysis |

### Advanced Analytics Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/anomaly` | GET | Anomaly detection |
| `/api/analytics/benchmark` | GET | Benchmark comparisons |
| `/api/analytics/cohort` | GET | Cohort analysis |
| `/api/analytics/segment` | GET | Segmentation |
| `/api/analytics/trend` | GET | Trend analysis |
| `/api/analytics/timeline` | GET | Timeline analytics |
| `/api/analytics/real-time` | GET | Real-time streaming |

### Visualization Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/charts` | GET | Chart data |
| `/api/analytics/chart-preview` | GET | Chart preview |
| `/api/analytics/geo-map` | GET | Geographic map |
| `/api/analytics/heatmap` | GET | Heatmap data |
| `/api/analytics/heatmap-analytics` | GET | Heatmap analytics |
| `/api/analytics/funnel` | GET | Funnel data |
| `/api/analytics/funnel-analytics` | GET | Funnel analytics |
| `/api/analytics/geo-analytics` | GET | Geographic analytics |
| `/api/analytics/dimensions` | GET | Data dimensions |
| `/api/analytics/fact-table` | GET | Fact table data |

### Dashboard Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/dashboards` | GET/POST | List/create dashboards |
| `/api/analytics/dashboards/[id]` | GET/PUT/DELETE | Dashboard CRUD |
| `/api/analytics/dashboards/[id]/share` | POST | Share dashboard |
| `/api/analytics/dashboards/[id]/widgets` | POST | Add widget |
| `/api/analytics/dashboards/[id]/widgets/[widgetId]` | PUT/DELETE | Widget CRUD |
| `/api/analytics/dashboard-builder` | GET | Dashboard builder |
| `/api/analytics/dashboard-overview` | GET | Dashboard overview |
| `/api/analytics/widgets` | GET | Widget list |
| `/api/analytics/widgets/[id]` | GET | Widget data |

### Report Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/reports` | GET/POST | List/create reports |
| `/api/analytics/reports/[id]` | GET/PUT/DELETE | Report CRUD |
| `/api/analytics/reports/[id]/execute` | POST | Execute report |
| `/api/analytics/reports/[id]/preview` | GET | Report preview |
| `/api/analytics/report-builder` | GET | Report builder |
| `/api/analytics/scheduled-reports` | GET/POST | Scheduled reports |
| `/api/analytics/scheduled-reports/[id]` | PUT/DELETE | Scheduled report CRUD |

### Export/Import Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/export` | POST | Export data |
| `/api/analytics/import` | POST | Import data |
| `/api/analytics/execute` | POST | Execute export |

### Data Warehouse Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/etl` | GET | ETL status |
| `/api/analytics/etl/[jobId]` | POST | Run ETL job |
| `/api/analytics/snapshots` | GET/POST | Snapshots |
| `/api/analytics/snapshots/[id]/restore` | POST | Restore snapshot |
| `/api/analytics/data-sources` | GET | Data sources |

### Utility Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/alerts` | GET | Alerts |
| `/api/analytics/events` | GET/POST | Analytics events |
| `/api/analytics/cache` | GET/DELETE | Cache management |
| `/api/analytics/filters` | GET | Filter options |
| `/api/analytics/pagination` | GET | Pagination config |
| `/api/analytics/date-range` | GET | Date range options |
| `/api/analytics/sort-config` | GET | Sort configuration |
| `/api/analytics/column-config` | GET | Column configuration |
| `/api/analytics/data-table` | GET | Data table data |
| `/api/analytics/search` | GET | Analytics search |
| `/api/analytics/permissions` | GET | Permission checks |
| `/api/analytics/filter-builder` | GET | Filter builder |
| `/api/analytics/warmup` | GET | Cache warmup |

### Communication & External Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/communication` | GET | Communication analytics |
| `/api/analytics/notifications` | GET | Notifications |
| `/api/analytics/[resource]/[id]` | GET | Generic resource analytics |

### Health & Infrastructure Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics/health` | GET | Health analytics |
| `/api/analytics/infrastructure` | GET | Infrastructure analytics |
| `/api/analytics/technology` | GET | Technology analytics |
| `/api/analytics/digital-literacy` | GET | Digital literacy analytics |
| `/api/analytics/literacy` | GET | Literacy analytics |
| `/api/analytics/connectivity` | GET | Connectivity analytics |
| `/api/analytics/environmental` | GET | Environmental analytics |
| `/api/analytics/nutrition` | GET | Nutrition analytics |
| `/api/analytics/weather` | GET | Weather impact |
| `/api/analytics/dropout` | GET | Dropout analytics |
| `/api/analytics/academic` | GET | Academic analytics |
| `/api/analytics/class-performance` | GET | Class performance |

---

## Services (40 Services)

### Domain Services

| Service | Methods | Description |
|---------|---------|-------------|
| `executive-dashboard.service.ts` | 5+ | Executive dashboard aggregation |
| `academic-analytics.service.ts` | 10+ | Academic performance, attendance, grades |
| `financial-analytics.service.ts` | 10+ | Revenue, expenses, profit, cash flow |
| `hr-analytics.service.ts` | 10+ | Workforce, turnover, training, compensation |
| `student-analytics.service.ts` | 10+ | Enrollment, academic, discipline, health |
| `teacher-analytics.service.ts` | 10+ | Performance, attendance, workload, satisfaction |
| `parent-analytics.service.ts` | 10+ | Payments, engagement, communication, satisfaction |

### Infrastructure Services

| Service | Methods | Description |
|---------|---------|-------------|
| `predictive-ai.service.ts` | 8+ | Predictive model execution |
| `report.service.ts` | 6+ | Report CRUD & execution |
| `report-builder.service.ts` | 5+ | Report builder logic |
| `dashboard.service.ts` | 6+ | Dashboard CRUD & sharing |
| `dashboard-builder.service.ts` | 5+ | Dashboard builder logic |
| `widget.service.ts` | 5+ | Widget CRUD |
| `chart.service.ts` | 4+ | Chart data aggregation |
| `export.service.ts` | 3+ | Multi-format export |
| `scheduled-report.service.ts` | 5+ | Scheduled report management |
| `data-warehouse.service.ts` | 4+ | Fact tables & dimensions |
| `data-source.service.ts` | 3+ | Data source registry |
| `etl.service.ts` | 3+ | ETL job management |
| `kpi.service.ts` | 10+ | KPI calculation & aggregation |
| `snapshot.service.ts` | 3+ | Point-in-time snapshots |
| `aggregation.service.ts` | 5+ | Data aggregation pipelines |
| `cache.service.ts` | 4+ | Multi-tier caching |
| `permission.service.ts` | 5+ | RBAC permission checks |
| `analytics-permission.service.ts` | 5+ | Analytics-specific permissions |
| `event.service.ts` | 3+ | Analytics event logging |
| `notification.service.ts` | 3+ | Alert notifications |

### Advanced Analytics Services

| Service | Methods | Description |
|---------|---------|-------------|
| `geo-analytics.service.ts` | 3+ | Geographic analytics |
| `heatmap-analytics.service.ts` | 3+ | Heatmap analytics |
| `funnel-analytics.service.ts` | 3+ | Funnel analytics |
| `timeline-analytics.service.ts` | 3+ | Timeline analytics |
| `cohort.service.ts` | 3+ | Cohort analysis |
| `cohort-retention.service.ts` | 3+ | Cohort retention curves |
| `comparison.service.ts` | 5+ | Period-over-period comparison |
| `trend.service.ts` | 3+ | Trend analysis |
| `anomaly.service.ts` | 3+ | Anomaly detection |
| `benchmark.service.ts` | 3+ | Benchmark comparisons |
| `segment.service.ts` | 3+ | Student/parent segmentation |
| `real-time.service.ts` | 3+ | Real-time streaming |
| `scheduler.service.ts` | 3+ | Job scheduling |

---

## Hooks (120 Hooks)

### Domain Hooks

| Hook | Description |
|------|-------------|
| `useAcademicAnalytics` | Academic analytics data |
| `useFinancialAnalytics` | Financial analytics data |
| `useHrAnalytics` | HR analytics data |
| `useStudentAnalytics` | Student analytics data |
| `useTeacherAnalytics` | Teacher analytics data |
| `useParentAnalytics` | Parent analytics data |
| `useExecutiveDashboard` | Executive dashboard |

### KPI Hooks

| Hook | Description |
|------|-------------|
| `useAttendanceKpi` | Attendance KPIs |
| `useEnrollmentKpi` | Enrollment KPIs |
| `usePerformanceKpi` | Performance KPIs |
| `useRevenueKpi` | Revenue KPIs |
| `useCostKpi` | Cost KPIs |
| `useProfitKpi` | Profit KPIs |
| `useRetentionKpi` | Retention KPIs |
| `useSatisfactionKpi` | Satisfaction KPIs |
| `useTeacherKpi` | Teacher KPIs |
| `useStudentKpi` | Student KPIs |
| `useKpi` | Generic KPI data |

### Dashboard & Widget Hooks

| Hook | Description |
|------|-------------|
| `useDashboards` | Dashboard list |
| `useDashboardOverview` | Dashboard overview |
| `useDashboardBuilder` | Dashboard builder state |
| `useDashboardShare` | Dashboard sharing |
| `useWidgets` | Widget list |
| `useWidgetData` | Widget data |
| `useChartData` | Chart data fetching |
| `useChartPreview` | Chart preview |

### Report Hooks

| Hook | Description |
|------|-------------|
| `useReports` | Reports list |
| `useReportBuilder` | Report builder state |
| `useReportExecution` | Report execution |
| `useReportPreview` | Report preview |
| `useScheduledReports` | Scheduled reports |
| `useScheduler` | Scheduler management |

### Comparison & Trend Hooks

| Hook | Description |
|------|-------------|
| `useComparison` | Period comparison |
| `useDailyComparison` | Daily comparison |
| `useMonthlyComparison` | Monthly comparison |
| `useQuarterlyComparison` | Quarterly comparison |
| `useYearOverYear` | Year-over-year |
| `useSchoolComparison` | School comparison |
| `useTargetVsActual` | Target vs actual |
| `useGrowthRate` | Growth rate |
| `useTrend` | Trend data |

### Demographic Hooks

| Hook | Description |
|------|-------------|
| `useAgeDistribution` | Age distribution |
| `useGenderAnalysis` | Gender analysis |
| `useEthnicAnalysis` | Ethnic analysis |
| `useReligionAnalysis` | Religion analysis |
| `useLanguageAnalysis` | Language analysis |
| `useDemographicAnalysis` | Demographic analysis |
| `useSocioeconomicAnalysis` | Socioeconomic analysis |
| `usePovertyAnalysis` | Poverty analysis |
| `useIncomeAnalysis` | Income analysis |
| `useUrbanRuralAnalysis` | Urban/rural analysis |
| `useGeographicDistribution` | Geographic distribution |
| `useEducationLevelAnalysis` | Education level analysis |

### Advanced Analytics Hooks

| Hook | Description |
|------|-------------|
| `useAnomaly` | Anomaly detection |
| `useBenchmark` | Benchmark comparisons |
| `useCohort` | Cohort analysis |
| `useSegment` | Segmentation |
| `useTimelineAnalytics` | Timeline analytics |
| `useRealTime` | Real-time streaming |
| `usePredictions` | Predictions |
| `usePredictiveModel` | Predictive model |
| `useForecast` | Forecasting |
| `useDropoutRisk` | Dropout risk |

### Visualization Hooks

| Hook | Description |
|------|-------------|
| `useGeoAnalytics` | Geographic analytics |
| `useGeoMap` | Geo map data |
| `useHeatmap` | Heatmap data |
| `useHeatmapAnalytics` | Heatmap analytics |
| `useFunnel` | Funnel data |
| `useFunnelAnalytics` | Funnel analytics |

### Financial Hooks

| Hook | Description |
|------|-------------|
| `useCashFlow` | Cash flow analytics |
| `useExpenseTrend` | Expense trends |
| `useRevenueTrend` | Revenue trends |
| `useBudgetUtilization` | Budget utilization |
| `usePaymentStatus` | Payment status |

### Student Sub-Domain Hooks

| Hook | Description |
|------|-------------|
| `useEnrollmentTrend` | Enrollment trends |
| `useGradeEvolution` | Grade evolution |
| `useSubjectDifficulty` | Subject difficulty |
| `useSuccessRate` | Success rate |
| `useDisciplineAnalytics` | Discipline analytics |
| `useHealthAnalytics` | Health analytics |
| `useHealthOutcomes` | Health outcomes |
| `useParentEngagement` | Parent engagement |

### HR Sub-Domain Hooks

| Hook | Description |
|------|-------------|
| `useWorkforceAnalytics` | Workforce analytics |
| `useTurnoverRate` | Turnover rate |
| `useTrainingProgress` | Training progress |
| `useCompensationAnalysis` | Compensation analytics |
| `usePerformanceRating` | Performance ratings |

### Data Management Hooks

| Hook | Description |
|------|-------------|
| `useDataSources` | Data source registry |
| `useDimensions` | Data dimensions |
| `useFactTable` | Fact table queries |
| `useEtl` | ETL job management |
| `useEtlJobs` | ETL job list |
| `useSnapshots` | Snapshots |
| `useExport` | Export functionality |
| `useImport` | Import functionality |
| `useEvents` | Analytics events |
| `useCache` | Cache management |

### UI State Hooks

| Hook | Description |
|------|-------------|
| `useAnalyticsFilters` | Filter state |
| `useDateRange` | Date range picker |
| `usePagination` | Pagination state |
| `useSortConfig` | Sort configuration |
| `useColumnConfig` | Column configuration |
| `useDataTable` | Data table state |
| `useFilterBuilder` | Filter builder |
| `useAnalyticsSearch` | Search functionality |

### Permission & Alert Hooks

| Hook | Description |
|------|-------------|
| `usePermissions` | Permission checks |
| `useAnalyticsPermissions` | Analytics-specific permissions |
| `useAlerts` | Alert management |

### External Integration Hooks

| Hook | Description |
|------|-------------|
| `useCommunicationAnalytics` | Communication analytics |
| `useClassPerformance` | Class performance |
| `useConnectivityAnalysis` | Connectivity analysis |
| `useDigitalLiteracyAnalysis` | Digital literacy |
| `useEnvironmentalAnalysis` | Environmental analysis |
| `useInfrastructureAnalysis` | Infrastructure analysis |
| `useLiteracyAnalysis` | Literacy analysis |
| `useNutritionAnalysis` | Nutrition analysis |
| `useTechnologyAnalysis` | Technology analysis |
| `useWeatherImpact` | Weather impact |

---

## Validators (70+ Zod Schemas)

### Dashboard Schemas

| Schema | Description |
|--------|-------------|
| `createDashboardSchema` | Create dashboard validation |
| `updateDashboardSchema` | Update dashboard validation |
| `dashboardIdSchema` | Dashboard ID validation |
| `shareDashboardSchema` | Dashboard sharing validation |

### Widget Schemas

| Schema | Description |
|--------|-------------|
| `addWidgetSchema` | Add widget validation |
| `updateWidgetSchema` | Update widget validation |
| `widgetIdSchema` | Widget ID validation |

### Chart Schemas

| Schema | Description |
|--------|-------------|
| `getChartDataSchema` | Chart data query validation |
| `getGeoMapDataSchema` | Geo map data query validation |
| `getHeatmapDataSchema` | Heatmap data query validation |
| `getFunnelDataSchema` | Funnel data query validation |

### Report Schemas

| Schema | Description |
|--------|-------------|
| `createReportSchema` | Create report validation |
| `updateReportSchema` | Update report validation |
| `reportIdSchema` | Report ID validation |
| `executeReportSchema` | Execute report validation |

### Predictive AI Schemas

| Schema | Description |
|--------|-------------|
| `runPredictiveModelSchema` | Run model validation |
| `getPredictionsSchema` | Get predictions validation |

### Analytics Query Schemas

| Schema | Description |
|--------|-------------|
| `getAcademicAnalyticsSchema` | Academic analytics query |
| `getFinancialAnalyticsSchema` | Financial analytics query |
| `getHrAnalyticsSchema` | HR analytics query |
| `getStudentAnalyticsSchema` | Student analytics query |
| `getTeacherAnalyticsSchema` | Teacher analytics query |
| `getParentAnalyticsSchema` | Parent analytics query |
| `getExecutiveDashboardSchema` | Executive dashboard query |

### Export/Import Schemas

| Schema | Description |
|--------|-------------|
| `exportDataSchema` | Export data validation |
| `importDataSchema` | Import data validation |
| `bulkExportSchema` | Bulk export validation |
| `bulkImportSchema` | Bulk import validation |

### Scheduled Report Schemas

| Schema | Description |
|--------|-------------|
| `createScheduledReportSchema` | Create scheduled report |
| `updateScheduledReportSchema` | Update scheduled report |
| `scheduledReportIdSchema` | Scheduled report ID |

### KPI Schemas

| Schema | Description |
|--------|-------------|
| `getKPISchema` | KPI query validation |
| `getKPITrendSchema` | KPI trend query |

### Data Warehouse Schemas

| Schema | Description |
|--------|-------------|
| `getFactTableSchema` | Fact table query |
| `getDimensionSchema` | Dimension query |
| `runETLSchema` | Run ETL job |

### Snapshot Schemas

| Schema | Description |
|--------|-------------|
| `createSnapshotSchema` | Create snapshot |
| `restoreSnapshotSchema` | Restore snapshot |

### Event Schemas

| Schema | Description |
|--------|-------------|
| `logAnalyticsEventSchema` | Log analytics event |
| `getAnalyticsEventsSchema` | Get analytics events |

---

## Mobile Module (12 Screens)

| Screen | Description |
|--------|-------------|
| `ExecutiveDashboardScreen` | Executive dashboard overview |
| `AcademicAnalyticsScreen` | Academic analytics |
| `FinancialAnalyticsScreen` | Financial analytics |
| `HrAnalyticsScreen` | HR analytics |
| `StudentAnalyticsScreen` | Student analytics |
| `TeacherAnalyticsScreen` | Teacher analytics |
| `ParentAnalyticsScreen` | Parent analytics |
| `PredictiveAIScreen` | Predictive AI results |
| `ReportsScreen` | Reports list & execution |
| `DashboardsScreen` | Custom dashboards |
| `ChartsScreen` | Chart visualizations |
| `AcademicAnalyticsScreen` | Academic analytics |

All screens are exported from `mobile/features/analytics/index.ts`.

---

## Data Sources

The analytics module integrates with 13 data sources:

| Data Source | Supabase Table | Domain |
|-------------|----------------|--------|
| `students` | `students` | Student |
| `teachers` | `teachers` | Teacher |
| `classes` | `classes` | Academic |
| `subjects` | `subjects` | Academic |
| `exams` | `exam_results` | Academic |
| `attendance` | `attendance_records` | Academic |
| `finance` | `finance_payments` | Financial |
| `hr` | `hr_employees` | HR |
| `messages` | `messages` | Communication |
| `schools` | `schools` | System |
| `users` | `users` | System |
| `payments` | `finance_payments` | Financial |
| `enrollments` | `student_enrollments` | Student |

---

## Data Warehouse

### Fact Tables

| Fact Table | Metrics |
|------------|---------|
| `analytics_facts` | Aggregated metrics by date, school, dimension |

### Dimensions

| Dimension | Description |
|-----------|-------------|
| Date | Time-based dimension (day, week, month, quarter, year) |
| School | School-level dimension |
| Department | Department-level dimension |
| Class | Class-level dimension |
| Student | Student-level dimension |
| Teacher | Teacher-level dimension |

### ETL Jobs

| Job | Description |
|-----|-------------|
| `analytics_etl_jobs` | ETL job configuration and status |

---

## Predictive AI

### Models

| Model | Description |
|-------|-------------|
| `dropout` | Predicts student dropout risk |
| `payment_default` | Predicts payment default risk |
| `academic_risk` | Predicts academic performance risk |
| `revenue_forecast` | Forecasts revenue trends |
| `enrollment_forecast` | Forecasts enrollment trends |
| `staff_turnover` | Predicts staff turnover risk |
| `class_overload` | Predicts class overload risk |
| `demand_forecast` | Forecasts demand trends |

### Risk Levels

| Level | Score Range |
|-------|-------------|
| `low` | 0.0 - 0.25 |
| `medium` | 0.25 - 0.50 |
| `high` | 0.50 - 0.75 |
| `critical` | 0.75 - 1.00 |

---

## Report Builder

### Report Configuration

- **Data Source**: Any of the 13 data sources
- **Filters**: Dynamic filter configuration
- **Group By**: Up to 10 grouping dimensions
- **Sort**: Configurable sort field and order
- **Columns**: Up to 50 custom columns with type and format
- **Charts**: Up to 10 embedded charts
- **Schedule**: None, daily, weekly, monthly, quarterly, yearly
- **Recipients**: Up to 100 email addresses
- **Format**: Excel, PDF, CSV, JSON, XML, PowerPoint

---

## Dashboard Builder

### Widget Types

| Widget | Description |
|--------|-------------|
| `kpi` | Key Performance Indicator |
| `chart` | Chart visualization |
| `table` | Data table |
| `map` | Geographic map |
| `gauge` | Gauge visualization |
| `heatmap` | Heatmap visualization |
| `timeline` | Timeline visualization |
| `text` | Text display |
| `image` | Image display |
| `list` | List display |
| `progress` | Progress bar |
| `comparison` | Comparison widget |

### Widget Positioning

- Grid: 12-column layout
- Position: `{ x, y, w, h }`
- Refresh interval: 30-3600 seconds
- Visibility toggle

---

## Export/Import

### Export Formats

| Format | Extension |
|--------|-----------|
| Excel | `.xlsx` |
| PDF | `.pdf` |
| CSV | `.csv` |
| JSON | `.json` |
| XML | `.xml` |
| PowerPoint | `.pptx` |

### Import Capabilities

- Bulk import with validation
- Validate-only mode
- Multi-data-source import

---

## Scheduled Reports

### Delivery Channels

| Channel | Description |
|---------|-------------|
| `email` | Email delivery |
| `sms` | SMS delivery |
| `push` | Push notification |
| `webhook` | Webhook delivery |

### Schedule Types

| Type | Description |
|------|-------------|
| `none` | Manual execution only |
| `daily` | Daily delivery |
| `weekly` | Weekly delivery |
| `monthly` | Monthly delivery |
| `quarterly` | Quarterly delivery |
| `yearly` | Yearly delivery |

---

## Caching Strategy

### Cache Service

- Multi-tier caching with configurable TTL
- Cache warmup endpoint
- Cache invalidation on data changes
- Per-user cache isolation

### Cache Keys

- Dashboard data: 5-minute TTL
- KPI data: 1-minute TTL
- Chart data: 5-minute TTL
- Report data: 10-minute TTL

---

## Security & Permissions

### RBAC Permissions

| Permission | Description |
|------------|-------------|
| `analytics:read` | View analytics data |
| `analytics:write` | Create/update dashboards & reports |
| `analytics:admin` | Manage analytics settings |
| `analytics:export` | Export analytics data |
| `analytics:schedule` | Manage scheduled reports |
| `analytics:predict` | Run predictive models |
| `analytics:warehouse` | Manage data warehouse |

### Permission Checks

- All API routes verify user permissions
- Dashboard sharing respects permission levels
- Report execution requires appropriate permissions
- Export/import requires export permission

---

## Configuration Constants

### Analytics Constants (from `@educi/config`)

```typescript
analytics: {
  defaultPeriod: 'monthly',
  maxDateRange: 365,
  maxWidgets: 50,
  maxCharts: 10,
  maxColumns: 50,
  maxRecipients: 100,
  maxSharedUsers: 50,
  cacheTTL: 300,
  maxFileSize: 10485760, // 10MB
  supportedFormats: ['excel', 'pdf', 'csv', 'json', 'xml', 'powerpoint'],
}
```

---

## Integration with Other Modules

| Module | Integration |
|--------|------------|
| **Enterprise** | School management, multi-tenant data |
| **Finance** | Payment data, revenue analytics |
| **HR** | Employee data, workforce analytics |
| **Students** | Enrollment, academic, discipline |
| **Teachers** | Performance, attendance, workload |
| **Parents** | Engagement, communication, satisfaction |
| **Academic** | Classes, subjects, exams, attendance |
| **Examinations** | Exam results, grade analytics |
| **Messages** | Communication analytics |
| **Schools** | School-level analytics |
| **Users** | User analytics |
| **Onboarding** | Onboarding analytics |

---

## File Counts Summary

| Category | Count |
|----------|-------|
| Total Files | ~300+ |
| Type Files | 1 |
| Validator Files | 1 |
| Repository Files | 1 |
| Service Files | 40 |
| Hook Files | 120 |
| API Route Files | 120+ |
| Mobile Screen Files | 12 |
| Test Files | TBD |
