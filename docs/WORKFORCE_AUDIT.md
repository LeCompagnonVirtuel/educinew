# WORKFORCE_AUDIT - Audit Trail

Phase 4.4 - Module Workforce Audit

---

## 1. Objectif

Traçabilité complète des actions dans le module Workforce : accès données, modifications, opérations sensibles.

## 2. Modèle de Données

```sql
CREATE TABLE workforce_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  old_value JSONB,
  new_value JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  request_id TEXT,
  duration_ms INT,
  status TEXT CHECK (status IN ('SUCCESS','FAILURE','TIMEOUT')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workforce_audit_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  alert_type TEXT CHECK (alert_type IN ('SUSPICIOUS','UNAUTHORIZED','BULK_ACCESS','DATA_EXPORT','FAILED_LOGIN')),
  severity TEXT CHECK (severity IN ('LOW','MEDIUM','HIGH','CRITICAL')),
  description TEXT NOT NULL,
  related_log_ids UUID[],
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audit_logs_school ON workforce_audit_logs(school_id);
CREATE INDEX idx_audit_logs_user ON workforce_audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON workforce_audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON workforce_audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created ON workforce_audit_logs(created_at);
CREATE INDEX idx_audit_alerts_school ON workforce_audit_alerts(school_id);
CREATE INDEX idx_audit_alerts_severity ON workforce_audit_alerts(severity);
```

## 3. API Endpoints

### GET /api/workforce/audit/logs
```json
{
  "logs": [
    {
      "id": "uuid",
      "user": "jean.dupont@email.com",
      "action": "JOB_CREATED",
      "resource_type": "workforce_jobs",
      "new_value": { "title": "Développeur React", "company": "TechCorp" },
      "ip_address": "192.168.1.100",
      "status": "SUCCESS",
      "created_at": "2024-10-15T14:30:00Z"
    }
  ],
  "filters": { "user_id": "uuid", "action": "JOB_CREATED", "date_from": "2024-10-01" }
}
```

### GET /api/workforce/audit/alerts
```json
{
  "alerts": [
    {
      "id": "uuid",
      "alert_type": "BULK_ACCESS",
      "severity": "HIGH",
      "description": "User accessed 50+ talent profiles in 5 minutes",
      "is_resolved": false
    }
  ]
}
```

### POST /api/workforce/audit/alerts/:id/resolve
```json
{
  "resolution": "Verified bulk access for recruitment campaign",
  "notes": "Legitimate recruiter activity"
}
```

### GET /api/workforce/audit/export
```json
{
  "format": "CSV",
  "date_from": "2024-01-01",
  "date_to": "2024-10-31",
  "include_fields": ["user", "action", "resource_type", "created_at"]
}
```

## 4. Monitored Actions

```typescript
const AuditActions = {
  TALENT_VIEW: 'View talent profile',
  JOB_VIEW: 'View job listing',
  WALLET_VIEW: 'View career wallet',
  JOB_CREATE: 'Create job listing',
  JOB_UPDATE: 'Update job listing',
  APPLICATION_UPDATE: 'Update application status',
  DATA_EXPORT: 'Export data',
  BULK_ACCESS: 'Bulk data access',
  SALARY_VIEW: 'View salary information',
  LOGIN_SUCCESS: 'Successful login',
  LOGIN_FAILED: 'Failed login',
  PASSWORD_CHANGE: 'Password changed',
  RLS_BYPASS: 'RLS policy bypass attempt'
};
```

## 5. Alert Rules

```typescript
const AlertRules = {
  BULK_ACCESS: { threshold: 50, window: '5 minutes', severity: 'HIGH', action: 'ALERT + LOG' },
  FAILED_LOGIN: { threshold: 5, window: '15 minutes', severity: 'MEDIUM', action: 'ALERT + LOCK' },
  DATA_EXPORT: { threshold: 10, window: '1 hour', severity: 'HIGH', action: 'ALERT + NOTIFY_ADMIN' },
  UNUSUAL_LOCATION: { detection: 'GEO_ANOMALY', severity: 'MEDIUM', action: 'ALERT + REQUIRE_MFA' }
};
```

## 6. RBAC

| Rôle | Voir logs | Voir alerts | Export | Résoudre alerts |
|------|-----------|-------------|--------|-----------------|
| SUPER_ADMIN | ✅ (all) | ✅ | ✅ | ✅ |
| ADMIN | ✅ (school) | ✅ | ✅ | ✅ |
| AUDITOR | ✅ (assigned) | ✅ | ✅ | ❌ |
| ENSEIGNANT | ❌ | ❌ | ❌ | ❌ |
| ELEVE | ❌ (own) | ❌ | ❌ | ❌ |

## 7. Log Retention

```typescript
const LogRetention = {
  SUCCESS: '90 days',
  FAILURE: '1 year',
  SECURITY_INCIDENT: '3 years',
  COMPLIANCE: '7 years',
  archival: { enabled: true, storage: 'Cold Storage', compression: 'gzip' }
};
```

## 8. Analytics Dashboard

```typescript
const AuditAnalytics = {
  metrics: { totalActions: countAll(), actionsByType: groupBy('action'), failedAttempts: filterByStatus('FAILURE') },
  charts: { activityTimeline: 'LineChart', topActions: 'BarChart', userActivity: 'HeatMap' },
  exports: { csv: true, pdf: true, json: true }
};
```

## 9. Integration

```typescript
const AuditIntegration = {
  SIEM: { enabled: true, providers: ['Splunk', 'ELK', 'Datadog'], format: 'CEF' },
  NOTIFICATIONS: { email: true, slack: true, webhook: true }
};
```
