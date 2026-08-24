# Phase 2.10 - Observability

## Overview

The Observability module provides comprehensive monitoring, tracing, logging, and alerting for the EduCI enterprise ecosystem. It implements distributed tracing with trace spans, structured logging, SLO tracking, SLA monitoring, alert rules, notification routing, and observability dashboards. This module ensures complete visibility into system behavior and performance across all services.

```
┌─────────────────────────────────────────────────────────┐
│                   OBSERVABILITY                          │
├─────────────────────────────────────────────────────────┤
│  Distributed Tracing → Structured Logging               │
│  SLO/SLA Tracking → Alert Rules → Notification Routing  │
│  Dashboards → Metrics Collection → Correlation          │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10):**
- `TraceSpanRepository` - Trace span CRUD + findByTraceId, findByService
- `StructuredLogRepository` - Structured log CRUD + findByLevel, findByService
- `SLORepository` - SLO CRUD + findByService, findBreached
- `SLARepository` - SLA CRUD + findByService, findByTier
- `AlertRuleRepository` - Alert rule CRUD + findByMetric, findActive
- `NotificationRouteRepository` - Notification route CRUD + findByAlert, findByChannel
- `MetricsCollectorRepository` - Metrics CRUD + findByMetric, findByPeriod
- `ObservabilityDashboardRepository` - Dashboard CRUD + findByOwner, findPublic
- `CorrelationRepository` - Correlation CRUD + findByTraceId, findBySpanId
- `IncidentRepository` - Incident CRUD + findByStatus, findBySeverity

**Entity Types (40):**
- `TraceSpan`, `TraceSpanCreate`, `TraceSpanUpdate`, `TraceSpanQuery`
- `StructuredLog`, `StructuredLogCreate`, `StructuredLogUpdate`, `StructuredLogQuery`
- `SLO`, `SLOCreate`, `SLOUpdate`, `SLOQuery`
- `SLA`, `SLACreate`, `SLAUpdate`, `SLAQuery`
- `AlertRule`, `AlertRuleCreate`, `AlertRuleUpdate`, `AlertRuleQuery`
- `NotificationRoute`, `NotificationRouteCreate`, `NotificationRouteUpdate`, `NotificationRouteQuery`
- `MetricsCollector`, `MetricsCollectorCreate`, `MetricsCollectorUpdate`, `MetricsCollectorQuery`
- `ObservabilityDashboard`, `ObservabilityDashboardCreate`, `ObservabilityDashboardUpdate`, `ObservabilityDashboardQuery`
- `Correlation`, `CorrelationCreate`, `CorrelationUpdate`, `CorrelationQuery`
- `Incident`, `IncidentCreate`, `IncidentUpdate`, `IncidentQuery`

### Validators

**File: `ep-deployment-observability.ts` (1,350 lines)**

| Schema | Purpose |
|--------|---------|
| `traceSpanCreateSchema` | Validates trace span creation (traceId, service, duration) |
| `structuredLogCreateSchema` | Validates log creation (level, message, metadata) |
| `sloCreateSchema` | Validates SLO creation (target, window, indicator) |
| `slaCreateSchema` | Validates SLA creation (tier, uptime, responseTime) |
| `alertRuleCreateSchema` | Validates alert rule creation (metric, condition, threshold) |
| `notificationRouteCreateSchema` | Validates notification route creation (channels, conditions) |
| `metricsCollectorCreateSchema` | Validates metrics collector creation |
| `observabilityDashboardCreateSchema` | Validates dashboard creation (title, widgets, layout) |
| `correlationCreateSchema` | Validates correlation creation |
| `incidentCreateSchema` | Validates incident creation (title, severity, service) |

### Errors

| Error Code | Description |
|------------|-------------|
| `TRACE_SPAN_NOT_FOUND` | Trace span not found |
| `LOG_NOT_FOUND` | Structured log not found |
| `SLO_BREACHED` | SLO target breached |
| `SLA_BREACHED` | SLA target breached |
| `ALERT_RULE_INVALID` | Alert rule configuration invalid |
| `NOTIFICATION_FAILED` | Notification delivery failed |
| `METRICS_UNAVAILABLE` | Metrics collection unavailable |
| `DASHBOARD_NOT_FOUND` | Dashboard not found |
| `CORRELATION_FAILED` | Trace correlation failed |
| `INCIDENT_ESCALATION_FAILED` | Incident escalation failed |

### Repository

```typescript
// 10 repository interfaces for observability
interface TraceSpanRepository {
  create(data: TraceSpanCreate): Promise<TraceSpan>;
  findById(id: string): Promise<TraceSpan | null>;
  findByTraceId(traceId: string): Promise<TraceSpan[]>;
  findByService(service: string): Promise<TraceSpan[]>;
  findByOperation(operation: string): Promise<TraceSpan[]>;
  update(id: string, data: TraceSpanUpdate): Promise<TraceSpan>;
  list(query: TraceSpanQuery): Promise<TraceSpan[]>;
  count(query: TraceSpanQuery): Promise<number>;
  findSlowQueries(thresholdMs: number): Promise<TraceSpan[]>;
  findErrors(startTime: Date, endTime: Date): Promise<TraceSpan[]>;
}

interface SLORepository {
  create(data: SLOCreate): Promise<SLO>;
  findById(id: string): Promise<SLO | null>;
  findByService(service: string): Promise<SLO[]>;
  findBreached(): Promise<SLO[]>;
  update(id: string, data: SLOUpdate): Promise<SLO>;
  delete(id: string): Promise<void>;
  list(query: SLOQuery): Promise<SLO[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `TraceSpanService` | Distributed tracing collection and analysis |
| `StructuredLogService` | Structured logging and querying |
| `SLOService` | SLO definition and tracking |
| `SLAService` | SLA management and enforcement |
| `AlertRuleService` | Alert rule creation and evaluation |
| `NotificationRouteService` | Alert notification routing |
| `MetricsCollectorService` | Metrics collection and aggregation |
| `ObservabilityDashboardService` | Dashboard creation and management |
| `CorrelationService` | Trace-log correlation |
| `IncidentService` | Incident management and escalation |

### Hooks

| Hook | Purpose |
|------|---------|
| `useTraceSpans` | Trace span querying |
| `useStructuredLogs` | Log querying and filtering |
| `useSLOs` | SLO management |
| `useSLAs` | SLA management |
| `useAlertRules` | Alert rule management |
| `useNotificationRoutes` | Notification route management |
| `useMetricsCollectors` | Metrics management |
| `useObservabilityDashboards` | Dashboard management |
| `useCorrelations` | Trace correlation |
| `useIncidents` | Incident management |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/observability/traces` | List trace spans |
| POST | `/api/enterprise/observability/traces` | Create trace span |
| GET | `/api/enterprise/observability/traces/[id]` | Get trace span |
| GET | `/api/enterprise/observability/traces/trace/[traceId]` | Get full trace |
| GET | `/api/enterprise/observability/logs` | List structured logs |
| POST | `/api/enterprise/observability/logs` | Create log entry |
| GET | `/api/enterprise/observability/logs/[id]` | Get log entry |
| GET | `/api/enterprise/observability/slos` | List SLOs |
| POST | `/api/enterprise/observability/slos` | Create SLO |
| GET | `/api/enterprise/observability/slos/[id]` | Get SLO |
| PUT | `/api/enterprise/observability/slos/[id]` | Update SLO |
| GET | `/api/enterprise/observability/slas` | List SLAs |
| POST | `/api/enterprise/observability/slas` | Create SLA |
| GET | `/api/enterprise/observability/alerts` | List alert rules |
| POST | `/api/enterprise/observability/alerts` | Create alert rule |
| GET | `/api/enterprise/observability/alerts/[id]` | Get alert rule |
| PUT | `/api/enterprise/observability/alerts/[id]` | Update alert rule |
| GET | `/api/enterprise/observability/notifications` | List notification routes |
| POST | `/api/enterprise/observability/notifications` | Create notification route |
| GET | `/api/enterprise/observability/metrics` | List metrics |
| POST | `/api/enterprise/observability/metrics` | Create metric |
| GET | `/api/enterprise/observability/dashboards` | List dashboards |
| POST | `/api/enterprise/observability/dashboards` | Create dashboard |
| GET | `/api/enterprise/observability/dashboards/[id]` | Get dashboard |
| GET | `/api/enterprise/observability/incidents` | List incidents |
| POST | `/api/enterprise/observability/incidents` | Create incident |
| PUT | `/api/enterprise/observability/incidents/[id]` | Update incident |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `ObservabilityDashboardScreen` | Observability overview |
| `TraceListScreen` | Trace span listing |
| `TraceDetailScreen` | Trace span details |
| `LogViewerScreen` | Structured log viewer |
| `SLODashboardScreen` | SLO tracking |
| `AlertManagerScreen` | Alert rule management |
| `IncidentListScreen` | Incident listing |
| `MetricsExplorerScreen` | Metrics exploration |

## Configuration

```typescript
export const OBSERVABILITY_CONFIG = {
  limits: {
    maxTraceSpans: 1000000,
    maxLogEntries: 10000000,
    maxSLOs: 100,
    maxSLAs: 50,
    maxAlertRules: 500,
    maxDashboards: 100,
  },
  tracing: {
    samplingRate: 0.1,
    maxSpanDurationMs: 300000,
    propagationFormat: 'w3c',
    batchIntervalMs: 5000,
  },
  logging: {
    retentionDays: 30,
    maxLogSize: 10240,
    compressionEnabled: true,
    realtimeEnabled: true,
  },
  slo: {
    defaultWindow: '30d',
    burnRateThreshold: 2,
    errorBudgetAlertThreshold: 0.1,
  },
  alerts: {
    evaluationIntervalMs: 60000,
    notificationCooldownMs: 300000,
    maxRetries: 3,
    escalationTimeoutMs: 900000,
  },
  metrics: {
    collectionIntervalMs: 15000,
    retentionDays: 90,
    aggregationIntervals: ['1m', '5m', '1h', '1d'],
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `observability_admin` | Full observability management |
| `observability_operator` | Alert management, incident response |
| `observability_viewer` | Read-only access to all observability data |
| `sre_engineer` | SLO/SLA management, incident response |
| `platform_admin` | Cross-service observability |

## Multi-Tenancy

- Trace spans scoped by service and tenant
- Logs filtered by tenant context
- SLOs and SLAs per tenant service
- Alert rules can be tenant-specific
- Dashboards shared or tenant-scoped
- Incidents linked to tenant services

## Offline Support

- Trace spans queued for batch upload
- Logs buffered locally when offline
- SLO calculations performed on cached data
- Alert rules evaluated offline with local metrics
- Dashboard snapshots cached for offline viewing

## API Reference

### Traces
- GET /api/enterprise/observability/traces
- POST /api/enterprise/observability/traces
- GET /api/enterprise/observability/traces/[id]
- GET /api/enterprise/observability/traces/trace/[traceId]

### Logs
- GET /api/enterprise/observability/logs
- POST /api/enterprise/observability/logs
- GET /api/enterprise/observability/logs/[id]

### SLOs
- GET /api/enterprise/observability/slos
- POST /api/enterprise/observability/slos
- GET /api/enterprise/observability/slos/[id]
- PUT /api/enterprise/observability/slos/[id]

### SLAs
- GET /api/enterprise/observability/slas
- POST /api/enterprise/observability/slas
- GET /api/enterprise/observability/slas/[id]
- PUT /api/enterprise/observability/slas/[id]

### Alert Rules
- GET /api/enterprise/observability/alerts
- POST /api/enterprise/observability/alerts
- GET /api/enterprise/observability/alerts/[id]
- PUT /api/enterprise/observability/alerts/[id]

### Notifications
- GET /api/enterprise/observability/notifications
- POST /api/enterprise/observability/notifications
- GET /api/enterprise/observability/notifications/[id]
- PUT /api/enterprise/observability/notifications/[id]

### Metrics
- GET /api/enterprise/observability/metrics
- POST /api/enterprise/observability/metrics

### Dashboards
- GET /api/enterprise/observability/dashboards
- POST /api/enterprise/observability/dashboards
- GET /api/enterprise/observability/dashboards/[id]
- PUT /api/enterprise/observability/dashboards/[id]

### Incidents
- GET /api/enterprise/observability/incidents
- POST /api/enterprise/observability/incidents
- GET /api/enterprise/observability/incidents/[id]
- PUT /api/enterprise/observability/incidents/[id]

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | Trace collection and querying |
| E2E Tests | Full observability workflows |
| Alert Tests | Alert rule evaluation and notification |
| SLO Tests | SLO tracking and breach detection |

## Security

- Trace data access controlled by role
- Log entries sanitized of sensitive data
- Alert notifications encrypted in transit
- Dashboard access restricted by permissions
- Incident data retained per compliance policy
- Metrics collection respects tenant boundaries
- Observability APIs rate limited
