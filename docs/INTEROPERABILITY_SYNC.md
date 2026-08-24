# Interoperability — Sync Engine

> Version : 1.0
> Statut : Validé

---

## 1. Sync Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SYNC ENGINE                          │
├─────────────┬──────────────┬───────────────────────────┤
│  Scheduler  │  Queue (BullMQ) │  Workers               │
│  (Cron)     │  (Redis)        │  (Stateless)           │
└──────┬──────┴───────┬───────┴────────────┬────────────┘
       │              │                    │
       ▼              ▼                    ▼
┌─────────────────────────────────────────────────────────┐
│                 SYNC ORCHESTRATOR                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Conflict  │  │Transform │  │Dedup     │             │
│  │Resolver  │  │Pipeline  │  │Engine    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                 CONNECTOR ADAPTERS                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │  LTI   │  │  xAPI  │  │ CalDAV │  │  REST  │       │
│  └────────┘  └────────┘  └────────┘  └────────┘       │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Sync Modes

| Mode | Description | Use Case | Latency |
|------|-------------|----------|---------|
| Real-time | Event-driven | Grades, attendance | < 1s |
| Near Real-time | Polling + diff | Calendar, roster | < 5min |
| Batch | Scheduled bulk | Reports, exports | Hourly |
| Manual | On-demand | Transcripts | On-request |

---

## 3. Core Sync Engine

```typescript
interface SyncConfig {
  id: string;
  connector_id: string;
  entity_type: EntityType;
  direction: "inbound" | "outbound" | "bidirectional";
  mode: "realtime" | "near_realtime" | "batch" | "manual";
  schedule?: string; // cron expression
  batch_size: number;
  conflict_strategy: "source_wins" | "target_wins" | "manual" | "merge";
  dedup_strategy: "external_id" | "composite_key" | "fingerprint";
  transform_rules?: TransformRule[];
  filters?: SyncFilter[];
}

type EntityType =
  | "students"
  | "teachers"
  | "courses"
  | "grades"
  | "attendance"
  | "assignments"
  | "calendar"
  | "discipline"
  | "custom";

interface SyncJob {
  id: string;
  config_id: string;
  connector_id: string;
  direction: "inbound" | "outbound" | "bidirectional";
  entity_type: EntityType;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  mode: string;
  started_at?: string;
  completed_at?: string;
  stats: SyncStats;
  errors: SyncError[];
  sync_token?: string;
  retry_count: number;
  max_retries: number;
}

interface SyncStats {
  total: number;
  created: number;
  updated: number;
  deleted: number;
  skipped: number;
  conflicted: number;
  resolved: number;
  failed: number;
  duration_ms: number;
}

interface SyncError {
  record_id: string;
  operation: "create" | "update" | "delete";
  error: string;
  retryable: boolean;
  timestamp: string;
}
```

---

## 4. Sync Orchestrator

```typescript
class SyncOrchestrator {
  private queue: BullMQ.Queue;
  private worker: BullMQ.Worker;
  private supabase: SupabaseClient;

  constructor() {
    this.queue = new BullMQ.Queue("sync", {
      connection: { host: "localhost", port: 6379 },
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
        removeOnComplete: 100,
        removeOnFail: 50
      }
    });

    this.worker = new BullMQ.Worker("sync", this.processJob.bind(this), {
      connection: { host: "localhost", port: 6379 },
      concurrency: 5,
      limiter: { max: 10, duration: 1000 }
    });
  }

  async scheduleSync(config: SyncConfig): Promise<string> {
    const job: SyncJob = {
      id: crypto.randomUUID(),
      config_id: config.id,
      connector_id: config.connector_id,
      direction: config.direction,
      entity_type: config.entity_type,
      status: "pending",
      mode: config.mode,
      stats: this.emptyStats(),
      errors: [],
      retry_count: 0,
      max_retries: 3
    };

    const bullJob = await this.queue.add("sync", job, {
      delay: config.mode === "manual" ? 0 : undefined,
      repeat: config.schedule ? { cron: config.schedule } : undefined
    });

    await this.logJobCreated(job);
    return job.id;
  }

  private async processJob(job: BullMQ.Job<SyncJob>): Promise<SyncResult> {
    const syncJob = job.data;
    const startTime = Date.now();

    // 1. Update status
    await this.updateJobStatus(syncJob.id, "running");

    try {
      // 2. Get connector and config
      const connector = await this.getConnector(syncJob.connector_id);
      const config = await this.getSyncConfig(syncJob.config_id);
      const adapter = this.getAdapter(connector.type);

      // 3. Fetch changes
      const changes = await adapter.fetchChanges({
        connector,
        entity_type: syncJob.entity_type,
        since_token: syncJob.sync_token,
        limit: config.batch_size
      });

      // 4. Transform
      const transformed = await this.transformBatch(
        changes.records,
        config.transform_rules
      );

      // 5. Deduplicate
      const deduplicated = await this.deduplicate(
        transformed,
        syncJob.entity_type,
        config.dedup_strategy
      );

      // 6. Resolve conflicts
      const resolved = await this.resolveConflicts(
        deduplicated,
        syncJob.entity_type,
        config.conflict_strategy
      );

      // 7. Apply changes
      const result = await this.applyChanges(
        resolved,
        syncJob.direction,
        syncJob.entity_type
      );

      // 8. Update sync token
      await this.updateSyncToken(syncJob.connector_id, changes.new_token);

      // 9. Complete
      const finalStats: SyncStats = {
        ...result,
        duration_ms: Date.now() - startTime
      };

      await this.completeJob(syncJob.id, finalStats);

      return { success: true, stats: finalStats };

    } catch (error) {
      await this.failJob(syncJob.id, error);
      throw error;
    }
  }

  private async deduplicate(
    records: TransformedRecord[],
    entityType: EntityType,
    strategy: string
  ): Promise<DeduplicatedBatch> {
    const existing = await this.fetchExistingRecords(entityType, records);

    return records.map(record => {
      const match = existing.find(e =>
        this.matchRecord(e, record, strategy)
      );

      return {
        record,
        action: match ? "update" : "create",
        existing_id: match?.id
      };
    });
  }

  private async resolveConflicts(
    batch: DeduplicatedBatch[],
    entityType: EntityType,
    strategy: string
  ): Promise<ResolvedBatch> {
    return batch.map(item => {
      if (item.action !== "update") return { ...item, resolved: true };

      const existing = item.existing_id
        ? this.getExistingRecord(item.existing_id)
        : null;

      if (!existing) return { ...item, resolved: true };

      switch (strategy) {
        case "source_wins":
          return { ...item, resolved: true, use_incoming: true };

        case "target_wins":
          return { ...item, resolved: true, use_incoming: false };

        case "merge":
          return {
            ...item,
            resolved: true,
            merged: this.mergeRecords(existing, item.record)
          };

        case "manual":
          return { ...item, resolved: false, requires_review: true };

        default:
          return { ...item, resolved: true, use_incoming: true };
      }
    });
  }
}
```

---

## 5. Transform Pipeline

```typescript
interface TransformRule {
  field: string;
  operation: "map" | "convert" | "format" | "default" | "custom";
  params: Record<string, unknown>;
}

class TransformPipeline {
  async transformBatch(
    records: unknown[],
    rules?: TransformRule[]
  ): Promise<TransformedRecord[]> {
    if (!rules?.length) return records as TransformedRecord[];

    return records.map(record => {
      let transformed = { ...record };

      for (const rule of rules) {
        transformed = this.applyRule(transformed, rule);
      }

      return transformed;
    });
  }

  private applyRule(record: Record<string, unknown>, rule: TransformRule): Record<string, unknown> {
    const value = this.getNestedValue(record, rule.field);

    switch (rule.operation) {
      case "map":
        return this.applyMap(record, rule.field, value, rule.params);

      case "convert":
        return this.applyConvert(record, rule.field, value, rule.params);

      case "format":
        return this.applyFormat(record, rule.field, value, rule.params);

      case "default":
        if (value === undefined || value === null) {
          return this.setNestedValue(record, rule.field, rule.params.value);
        }
        return record;

      case "custom":
        return this.applyCustomTransform(record, rule);

      default:
        return record;
    }
  }

  private applyMap(
    record: Record<string, unknown>,
    field: string,
    value: unknown,
    params: { mapping: Record<string, unknown> }
  ): Record<string, unknown> {
    const mapped = params.mapping[value as string] || value;
    return this.setNestedValue(record, field, mapped);
  }

  private applyConvert(
    record: Record<string, unknown>,
    field: string,
    value: unknown,
    params: { type: string; format?: string }
  ): Record<string, unknown> {
    let converted: unknown;

    switch (params.type) {
      case "date":
        converted = this.convertDate(value as string, params.format);
        break;
      case "number":
        converted = Number(value);
        break;
      case "string":
        converted = String(value);
        break;
      case "boolean":
        converted = Boolean(value);
        break;
      default:
        converted = value;
    }

    return this.setNestedValue(record, field, converted);
  }
}
```

---

## 6. Conflict Resolution

```typescript
class ConflictResolver {
  async autoResolve(
    incoming: Record<string, unknown>,
    existing: Record<string, unknown>,
    strategy: string
  ): Promise<ResolutionResult> {
    switch (strategy) {
      case "source_wins":
        return { use_incoming: true, confidence: 1.0 };

      case "target_wins":
        return { use_incoming: false, confidence: 1.0 };

      case "merge":
        return this.mergeRecords(incoming, existing);

      case "newest_wins":
        const incomingDate = new Date(incoming.updated_at as string);
        const existingDate = new Date(existing.updated_at as string);
        return {
          use_incoming: incomingDate > existingDate,
          confidence: 0.9
        };

      case "most_fields":
        const incomingFilled = this.countFields(incoming);
        const existingFilled = this.countFields(existing);
        return {
          use_incoming: incomingFilled > existingFilled,
          confidence: 0.7
        };

      default:
        return { use_incoming: true, confidence: 0.5 };
    }
  }

  private mergeRecords(
    incoming: Record<string, unknown>,
    existing: Record<string, unknown>
  ): ResolutionResult {
    const merged: Record<string, unknown> = { ...existing };

    for (const [key, value] of Object.entries(incoming)) {
      if (value !== undefined && value !== null) {
        // Prefer non-empty values
        if (existing[key] === undefined || existing[key] === null) {
          merged[key] = value;
        }
        // Prefer newer timestamps
        else if (key.endsWith("_at") || key === "updated_at") {
          if (new Date(value as string) > new Date(existing[key] as string)) {
            merged[key] = value;
          }
        }
        // Prefer higher scores/grades
        else if (key.includes("score") || key.includes("grade")) {
          if ((value as number) > (existing[key] as number)) {
            merged[key] = value;
          }
        }
      }
    }

    return { use_incoming: false, merged, confidence: 0.85 };
  }
}
```

---

## 7. API Endpoints

### 7.1 Trigger Sync

```http
POST /api/v1/interop/sync/trigger
```

**Request Body:**
```json
{
  "connector_id": "conn_abc123",
  "entity_type": "grades",
  "direction": "bidirectional",
  "mode": "manual",
  "options": {
    "conflict_strategy": "merge",
    "batch_size": 500
  }
}
```

**Response 202:**
```json
{
  "job_id": "sync_xyz789",
  "status": "pending",
  "estimated_duration": "30s",
  "poll_url": "/api/v1/interop/sync/jobs/sync_xyz789"
}
```

### 7.2 Get Sync Status

```http
GET /api/v1/interop/sync/jobs/{job_id}
```

**Response 200:**
```json
{
  "job_id": "sync_xyz789",
  "status": "running",
  "progress": 65,
  "stats": {
    "total": 150,
    "created": 20,
    "updated": 80,
    "skipped": 10,
    "failed": 2
  },
  "started_at": "2026-08-07T14:00:00Z",
  "elapsed_ms": 15000
}
```

### 7.3 Cancel Sync

```http
POST /api/v1/interop/sync/jobs/{job_id}/cancel
```

---

## 8. Scheduling

```typescript
class SyncScheduler {
  private schedules: Map<string, SyncSchedule>;

  constructor() {
    this.schedules = new Map();
  }

  async addSchedule(config: SyncConfig): Promise<void> {
    if (!config.schedule) return;

    // Validate cron expression
    if (!cron.validate(config.schedule)) {
      throw new Error("Invalid cron expression");
    }

    this.schedules.set(config.id, {
      config_id: config.id,
      cron: config.schedule,
      enabled: true,
      next_run: cron.getNextDate(config.schedule)
    });
  }

  async checkSchedules(): Promise<string[]> {
    const now = new Date();
    const dueJobs: string[] = [];

    for (const [id, schedule] of this.schedules) {
      if (schedule.enabled && new Date(schedule.next_run) <= now) {
        dueJobs.push(schedule.config_id);
        schedule.next_run = cron.getNextDate(schedule.cron);
      }
    }

    return dueJobs;
  }
}
```

---

## 9. Performance Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Sync latency (realtime) | < 1s | > 5s |
| Sync latency (batch) | < 5min | > 15min |
| Throughput | > 1000 records/s | < 100 records/s |
| Error rate | < 1% | > 5% |
| Queue depth | < 100 | > 500 |
| Worker utilization | < 80% | > 90% |
