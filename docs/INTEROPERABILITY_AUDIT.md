# Interoperability — Audit & Compliance

> Version : 1.0
> Statut : Validé

---

## 1. Audit Framework

```
┌─────────────────────────────────────────────────────────┐
│                   AUDIT SYSTEM                          │
├─────────────┬──────────────┬───────────────────────────┤
│  Collection │  Processing  │  Reporting                │
│  (Logs)     │  (Pipeline)  │  (Dashboard)              │
└──────┬──────┴───────┬──────┴────────────┬──────────────┘
       │              │                   │
       ▼              ▼                   ▼
┌─────────────────────────────────────────────────────────┐
│              AUDIT STORE (Immutable)                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │audit_events│  │audit_hashes│  │audit_alerts│       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Audit Event Types

| Category | Events | Retention |
|----------|--------|-----------|
| Authentication | login, logout, mfa, sso | 7 years |
| Authorization | permission_granted, permission_denied | 7 years |
| Data Access | read, write, delete, export | 5 years |
| Connector | created, updated, deleted, synced | 5 years |
| Credential | issued, verified, revoked | 10 years |
| AI | prediction, grade, recommendation | 3 years |
| System | error, config_change, maintenance | 5 years |
| Compliance | consent, dsr_request, breach | 10 years |

---

## 3. Audit Event Schema

```typescript
interface AuditEvent {
  id: string;
  timestamp: string;
  event_type: AuditEventType;
  category: AuditCategory;
  severity: "info" | "warning" | "error" | "critical";
  school_id: string;
  actor: AuditActor;
  resource: AuditResource;
  action: string;
  outcome: "success" | "failure" | "partial";
  metadata: Record<string, unknown>;
  context: AuditContext;
  integrity_hash: string;
}

interface AuditActor {
  id?: string;
  type: "user" | "system" | "connector" | "api_key" | "anonymous";
  name?: string;
  role?: string;
  ip_address: string;
  user_agent: string;
  session_id?: string;
}

interface AuditResource {
  type: string;
  id?: string;
  name?: string;
  school_id?: string;
}

interface AuditContext {
  request_id: string;
  method?: string;
  path?: string;
  query_params?: Record<string, string>;
  response_status?: number;
  duration_ms?: number;
  protocol?: string;
  connector_id?: string;
}

type AuditEventType =
  | "auth.login"
  | "auth.logout"
  | "auth.mfa_verify"
  | "auth.sso_callback"
  | "auth.password_reset"
  | "auth.token_refresh"
  | "auth.permission_denied"
  | "data.create"
  | "data.read"
  | "data.update"
  | "data.delete"
  | "data.export"
  | "data.import"
  | "connector.create"
  | "connector.update"
  | "connector.delete"
  | "connector.sync"
  | "connector.sync_failed"
  | "credential.issue"
  | "credential.verify"
  | "credential.revoke"
  | "ai.prediction"
  | "ai.auto_grade"
  | "ai.recommendation"
  | "ai.anomaly_detected"
  | "compliance.consent_granted"
  | "compliance.consent_revoked"
  | "compliance.dsr_request"
  | "compliance.breach_detected"
  | "system.config_change"
  | "system.maintenance"
  | "system.error";

type AuditCategory =
  | "authentication"
  | "authorization"
  | "data_access"
  | "connector"
  | "credential"
  | "ai"
  | "compliance"
  | "system";
```

---

## 4. Audit Logger Implementation

```typescript
class AuditLogger {
  private supabase: SupabaseClient;
  private hasher: IntegrityHasher;

  constructor() {
    this.supabase = createClient(/* ... */);
    this.hasher = new IntegrityHasher();
  }

  async log(event: Omit<AuditEvent, "id" | "timestamp" | "integrity_hash">): Promise<void> {
    const fullEvent: AuditEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      integrity_hash: ""
    };

    // Compute integrity hash
    fullEvent.integrity_hash = await this.hasher.compute(fullEvent);

    // Store in immutable log
    await this.supabase.from("audit_events").insert(fullEvent);

    // Check for alerts
    await this.checkAlerts(fullEvent);

    // Real-time notification for critical events
    if (fullEvent.severity === "critical") {
      await this.notifyCritical(fullEvent);
    }
  }

  async verifyIntegrity(eventId: string): Promise<IntegrityResult> {
    const { data: event } = await this.supabase
      .from("audit_events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (!event) {
      return { valid: false, error: "Event not found" };
    }

    const { integrity_hash, ...eventData } = event;
    const computedHash = await this.hasher.compute(eventData);

    return {
      valid: integrity_hash === computedHash,
      stored_hash: integrity_hash,
      computed_hash: computedHash,
      event_timestamp: event.timestamp
    };
  }
}

class IntegrityHasher {
  async compute(event: Omit<AuditEvent, "integrity_hash">): Promise<string> {
    const payload = JSON.stringify(event, Object.keys(event).sort());
    const hash = crypto.createHash("sha256").update(payload).digest("hex");

    // Chain with previous hash for tamper detection
    const prevHash = await this.getPreviousHash(event.school_id);
    const chained = crypto
      .createHash("sha256")
      .update(`${prevHash}:${hash}`)
      .digest("hex");

    return chained;
  }

  private async getPreviousHash(schoolId: string): Promise<string> {
    const { data } = await this.supabase
      .from("audit_events")
      .select("integrity_hash")
      .eq("school_id", schoolId)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    return data?.integrity_hash || "genesis";
  }
}
```

---

## 5. Audit Queries

### 5.1 Search Audit Events

```http
POST /api/v1/interop/audit/search
```

**Request Body:**
```json
{
  "school_id": "school_123",
  "filters": {
    "category": "connector",
    "event_type": ["connector.sync", "connector.sync_failed"],
    "severity": ["warning", "error"],
    "date_range": {
      "start": "2026-08-01T00:00:00Z",
      "end": "2026-08-07T23:59:59Z"
    },
    "connector_id": "conn_abc123"
  },
  "sort": { "timestamp": "desc" },
  "limit": 100,
  "offset": 0
}
```

**Response 200:**
```json
{
  "events": [
    {
      "id": "evt_xyz789",
      "timestamp": "2026-08-07T10:30:00Z",
      "event_type": "connector.sync_failed",
      "category": "connector",
      "severity": "error",
      "actor": {
        "type": "connector",
        "ip_address": "10.0.0.1"
      },
      "resource": {
        "type": "connector",
        "id": "conn_abc123"
      },
      "action": "sync_grades",
      "outcome": "failure",
      "metadata": {
        "error": "LTI token expired",
        "records_attempted": 50,
        "records_succeeded": 0
      }
    }
  ],
  "total": 42,
  "pagination": {
    "page": 1,
    "per_page": 100
  }
}
```

### 5.2 Integrity Verification

```http
POST /api/v1/interop/audit/verify
```

**Request Body:**
```json
{
  "event_ids": ["evt_xyz789", "evt_abc123"],
  "verify_chain": true
}
```

**Response 200:**
```json
{
  "results": [
    {
      "event_id": "evt_xyz789",
      "valid": true,
      "chain_valid": true,
      "timestamp": "2026-08-07T10:30:00Z"
    },
    {
      "event_id": "evt_abc123",
      "valid": true,
      "chain_valid": true,
      "timestamp": "2026-08-07T10:25:00Z"
    }
  ],
  "all_valid": true
}
```

---

## 6. Alerting System

```typescript
interface AlertRule {
  id: string;
  school_id: string;
  name: string;
  description: string;
  conditions: AlertCondition[];
  actions: AlertAction[];
  cooldown_minutes: number;
  enabled: boolean;
}

interface AlertCondition {
  field: string;
  operator: "equals" | "contains" | "greater_than" | "less_than" | "in";
  value: unknown;
}

interface AlertAction {
  type: "email" | "webhook" | "sms" | "dashboard";
  target: string;
  template?: string;
}

class AuditAlertManager {
  private rules: Map<string, AlertRule>;

  constructor() {
    this.rules = new Map();
  }

  async checkAlerts(event: AuditEvent): Promise<void> {
    for (const [_, rule] of this.rules) {
      if (!rule.enabled) continue;
      if (rule.school_id !== event.school_id) continue;

      const matches = rule.conditions.every(cond =>
        this.checkCondition(event, cond)
      );

      if (matches) {
        await this.triggerAlert(rule, event);
      }
    }
  }

  private async triggerAlert(
    rule: AlertRule,
    event: AuditEvent
  ): Promise<void> {
    // Check cooldown
    const lastTriggered = await this.getLastTriggered(rule.id);
    if (lastTriggered) {
      const cooldownEnd = new Date(lastTriggered);
      cooldownEnd.setMinutes(cooldownEnd.getMinutes() + rule.cooldown_minutes);
      if (new Date() < cooldownEnd) return;
    }

    // Execute actions
    for (const action of rule.actions) {
      await this.executeAction(action, rule, event);
    }

    // Log alert
    await this.logAlert(rule.id, event.id);
  }

  private async executeAction(
    action: AlertAction,
    rule: AlertRule,
    event: AuditEvent
  ): Promise<void> {
    switch (action.type) {
      case "email":
        await this.sendEmail(action.target, rule, event);
        break;
      case "webhook":
        await this.sendWebhook(action.target, rule, event);
        break;
      case "sms":
        await this.sendSMS(action.target, rule, event);
        break;
      case "dashboard":
        await this.addToDashboard(action.target, rule, event);
        break;
    }
  }
}
```

---

## 7. Compliance Reports

```typescript
class ComplianceReporter {
  async generateReport(
    schoolId: string,
    period: { start: string; end: string }
  ): Promise<ComplianceReport> {
    return {
      school_id: schoolId,
      period,
      generated_at: new Date().toISOString(),
      summary: {
        total_events: await this.countEvents(schoolId, period),
        auth_events: await this.countByCategory(schoolId, "authentication", period),
        data_events: await this.countByCategory(schoolId, "data_access", period),
        connector_events: await this.countByCategory(schoolId, "connector", period),
        ai_events: await this.countByCategory(schoolId, "ai", period),
        compliance_events: await this.countByCategory(schoolId, "compliance", period)
      },
      security: {
        failed_logins: await this.countFailedLogins(schoolId, period),
        permission_denied: await this.countPermissionDenied(schoolId, period),
        anomalies_detected: await this.countAnomalies(schoolId, period),
        mfa_usage_rate: await this.getMFAUsageRate(schoolId, period)
      },
      data_governance: {
        consent_records: await this.countConsents(schoolId, period),
        dsr_requests: await this.countDSRRequests(schoolId, period),
        data_exports: await this.countExports(schoolId, period),
        retention_violations: await this.checkRetentionViolations(schoolId)
      },
      connectors: {
        active_connectors: await this.countActiveConnectors(schoolId),
        sync_success_rate: await this.getSyncSuccessRate(schoolId, period),
        avg_sync_duration: await this.getAvgSyncDuration(schoolId, period),
        errors: await this.getConnectorErrors(schoolId, period)
      },
      recommendations: await this.generateRecommendations(schoolId)
    };
  }
}
```

---

## 8. Database Schema

```sql
CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  school_id UUID NOT NULL REFERENCES schools(id),
  actor JSONB NOT NULL,
  resource JSONB NOT NULL,
  action TEXT NOT NULL,
  outcome TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  context JSONB DEFAULT '{}',
  integrity_hash TEXT NOT NULL
);

CREATE TABLE audit_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id TEXT NOT NULL,
  event_id UUID REFERENCES audit_events(id),
  school_id UUID NOT NULL REFERENCES schools(id),
  triggered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actions_executed JSONB DEFAULT '[]'
);

CREATE TABLE audit_alert_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  description TEXT,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  cooldown_minutes INTEGER DEFAULT 60,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_audit_events_school ON audit_events(school_id, timestamp DESC);
CREATE INDEX idx_audit_events_category ON audit_events(category, timestamp DESC);
CREATE INDEX idx_audit_events_type ON audit_events(event_type, timestamp DESC);
CREATE INDEX idx_audit_events_severity ON audit_events(severity, timestamp DESC)
  WHERE severity IN ('warning', 'error', 'critical');
CREATE INDEX idx_audit_alerts_school ON audit_alerts(school_id, triggered_at DESC);

-- Partitioning by month for performance
CREATE TABLE audit_events_2026_08 PARTITION OF audit_events
  FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
```
