# Interoperability — Architecture

> Version : 1.0
> Statut : Validé

---

## 1. Principles Fondamentaux

1. **Protocol-First** — Chaque intégration suit un standard ouvert
2. **Zero Trust** — Chaque requête est vérifiée indépendamment
3. **Event-Driven** — Synchronisation via événements, pas de polling
4. **Idempotent** — Requêtes safely retryable
5. **Observable** — Métriques et logs sur chaque opération

---

## 2. Architecture Macro

```
┌────────────────────────────────────────────────────────────┐
│                    EXTERNAL SYSTEMS                        │
├──────────┬──────────┬──────────┬──────────┬──────────────┤
│   LMS    │  xAPI    │  CalDAV  │   SSO    │  Legacy ERP  │
└────┬─────┴────┬─────┴────┬─────┴────┬─────┴──────┬───────┘
     │          │          │          │            │
     ▼          ▼          ▼          ▼            ▼
┌────────────────────────────────────────────────────────────┐
│              INTEROPERABILITY GATEWAY (Edge)               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │  Rate   │ │Protocol │ │  Auth   │ │  Log    │        │
│  │ Limiter │ │ Router  │ │Verifier │ │  Stack  │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────┐
│                  CONNECTOR ENGINE                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │   LTI    │ │   xAPI   │ │  CalDAV  │ │   OIDC   │    │
│  │ Connector│ │ Connector│ │Connector │ │Connector │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  SCORM   │ │   SAML   │ │   FHIR   │ │  Custom  │    │
│  │ Connector│ │ Connector│ │Connector │ │Connector │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────┐
│                    CORE SERVICES                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  Sync    │ │  Audit   │ │  Queue   │ │  Cache   │    │
│  │  Engine  │ │  Service │ │ (BullMQ) │ │ (Redis)  │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────┐
│                    SUPABASE                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  interop  │ │connector_│ │sync_log  │ │audit_log │    │
│  │_connectors│ │  config  │ │          │ │          │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Composants Détailés

### 3.1 Interop Gateway (Edge Function)

```typescript
// supabase/functions/interop-gateway/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface GatewayRequest {
  protocol: "lti" | "xapi" | "caldav" | "oidc" | "saml" | "custom";
  connector_id: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  body?: unknown;
  school_id: string;
}

serve(async (req: Request) => {
  const gateway = new InteropGateway();
  return gateway.handle(req);
});

class InteropGateway {
  private rateLimiter = new RateLimiter({ windowMs: 60000, max: 100 });
  private authVerifier = new AuthVerifier();
  private protocolRouter = new ProtocolRouter();
  private auditLogger = new AuditLogger();

  async handle(req: Request): Promise<Response> {
    const startTime = Date.now();

    // 1. Rate limiting
    const clientId = this.extractClientId(req);
    if (!this.rateLimiter.allow(clientId)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded" }),
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // 2. Auth verification
    const auth = await this.authVerifier.verify(req);
    if (!auth.valid) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    // 3. Route to protocol handler
    const protocol = this.protocolRouter.detect(req);
    const handler = this.protocolRouter.getHandler(protocol);

    // 4. Execute with timeout
    const result = await Promise.race([
      handler.execute(req, auth),
      this.timeout(30000)
    ]);

    // 5. Audit log
    await this.auditLogger.log({
      protocol,
      connector_id: auth.connector_id,
      school_id: auth.school_id,
      method: req.method,
      path: new URL(req.url).pathname,
      status: result.status,
      duration_ms: Date.now() - startTime,
      timestamp: new Date().toISOString()
    });

    return result;
  }
}
```

### 3.2 Protocol Router

```typescript
class ProtocolRouter {
  private handlers = new Map<string, ProtocolHandler>();

  constructor() {
    this.handlers.set("lti", new LTIHandler());
    this.handlers.set("xapi", new XAPIHandler());
    this.handlers.set("caldav", new CalDAVHandler());
    this.handlers.set("oidc", new OIDCHandler());
    this.handlers.set("saml", new SAMLHandler());
    this.handlers.set("custom", new CustomHandler());
  }

  detect(req: Request): string {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path.includes("/lti/")) return "lti";
    if (path.includes("/xapi/")) return "xapi";
    if (path.includes("/caldav/")) return "caldav";
    if (path.includes("/oidc/")) return "oidc";
    if (path.includes("/saml/")) return "saml";
    return "custom";
  }

  getHandler(protocol: string): ProtocolHandler {
    return this.handlers.get(protocol) || this.handlers.get("custom")!;
  }
}
```

### 3.3 Sync Engine

```typescript
interface SyncJob {
  id: string;
  connector_id: string;
  direction: "inbound" | "outbound" | "bidirectional";
  entity_type: "students" | "grades" | "attendance" | "courses";
  status: "pending" | "running" | "completed" | "failed";
  last_sync_token?: string;
  batch_size: number;
  retry_count: number;
  max_retries: number;
}

class SyncEngine {
  private queue: BullMQ.Queue;
  private supabase: SupabaseClient;

  constructor() {
    this.queue = new BullMQ.Queue("interop-sync", {
      connection: { host: "localhost", port: 6379 }
    });
  }

  async enqueueSync(job: Omit<SyncJob, "id" | "status">): Promise<string> {
    const syncJob: SyncJob = {
      ...job,
      id: crypto.randomUUID(),
      status: "pending",
      retry_count: 0,
      max_retries: 3
    };

    await this.queue.add("sync", syncJob, {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 }
    });

    return syncJob.id;
  }

  async processSync(job: SyncJob): Promise<SyncResult> {
    const connector = await this.getConnector(job.connector_id);
    const handler = this.getProtocolHandler(connector.type);

    // Fetch changes since last sync
    const changes = await handler.fetchChanges({
      connector,
      entity_type: job.entity_type,
      since_token: job.last_sync_token,
      limit: job.batch_size
    });

    // Transform and validate
    const transformed = await this.transformBatch(changes, connector);

    // Apply to EduCI
    const result = await this.applyChanges(transformed, job);

    // Update sync token
    await this.updateSyncToken(job.connector_id, changes.new_token);

    return result;
  }
}
```

---

## 4. Data Flow

### 4.1 Inbound Sync (LMS → EduCI)

```
Moodle                    EduCI Gateway              Supabase
  │                            │                        │
  │── LTI Launch ─────────────▶│                        │
  │                            │── Verify JWT ─────────▶│
  │                            │◀── User exists? ───────│
  │◀── 200 OK + Session ──────│                        │
  │                            │                        │
  │── Grade Push (AGS) ───────▶│                        │
  │                            │── Transform ──────────▶│
  │                            │── Upsert grade ───────▶│
  │                            │── Log audit ──────────▶│
  │◀── 201 Created ───────────│                        │
```

### 4.2 Outbound Sync (EduCI → Calendar)

```
EduCI                    EduCI Gateway              CalDAV Server
  │                            │                        │
  │── Event Created ──────────▶│                        │
  │                            │── Transform to VEVENT ▶│
  │                            │── PUT /cal/{id}.ics ──▶│
  │                            │◀── 201 Created ────────│
  │                            │── Store sync token ───▶│ (DB)
  │◀── Success ───────────────│                        │
```

---

## 5. Database Schema

```sql
-- Tables interopérabilité
CREATE TABLE interop_connectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('lti','xapi','caldav','oidc','saml','custom')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','paused','error')),
  config_encrypted JSONB NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  last_sync_at TIMESTAMPTZ,
  error_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connector_id UUID NOT NULL REFERENCES interop_connectors(id),
  direction TEXT NOT NULL CHECK (direction IN ('inbound','outbound','bidirectional')),
  entity_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('started','completed','failed')),
  records_processed INTEGER DEFAULT 0,
  records_created INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  records_deleted INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER,
  sync_token TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE interop_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connector_id UUID REFERENCES interop_connectors(id),
  school_id UUID NOT NULL REFERENCES schools(id),
  protocol TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_id UUID,
  actor_type TEXT,
  resource_type TEXT,
  resource_id TEXT,
  status INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_connectors_school ON interop_connectors(school_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_connectors_type ON interop_connectors(type) WHERE status = 'active';
CREATE INDEX idx_sync_logs_connector ON sync_logs(connector_id, started_at DESC);
CREATE INDEX idx_audit_log_school ON interop_audit_log(school_id, created_at DESC);
CREATE INDEX idx_audit_log_connector ON interop_audit_log(connector_id, created_at DESC);

-- RLS
ALTER TABLE interop_connectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "school_isolation" ON interop_connectors
  FOR ALL USING (school_id = (auth.jwt() ->> 'school_id')::UUID);

ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "school_isolation" ON sync_logs
  FOR ALL USING (connector_id IN (
    SELECT id FROM interop_connectors WHERE school_id = (auth.jwt() ->> 'school_id')::UUID
  ));
```

---

## 6. Sécurité Architecture

- Toute communication externe via TLS 1.3
- Clés de connecteur chiffrées au repos (AES-256-GCM)
- Validation JWT avec JWKS rotation
- Rate limiting par école et par connecteur
- Audit log immuable (append-only)
- Network isolation via VPC peering

---

## 7. Scalabilité

| Composant | Strategy | Capacity |
|-----------|----------|----------|
| Gateway | Horizontal scaling | 10k req/s |
| Sync Engine | Queue-based workers | 1k jobs/min |
| Cache | Redis Cluster | 100k keys/s |
| Database | Read replicas | 5k queries/s |
