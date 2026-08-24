# Interoperability — Data Mesh

> Version : 1.0
> Statut : Validé

---

## 1. Data Mesh Principles

1. **Domain-Oriented** — Chaque domaine gère ses données
2. **Data as a Product** — Les données sont des produits avec SLA
3. **Self-Serve** — Accès autonome via APIs
4. **Federated Governance** — Règles centrales, exécution décentralisée

---

## 2. Domain Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   DATA MESH HUB                         │
├─────────────┬──────────────┬───────────────────────────┤
│  Domain     │  Data Products│  APIs                     │
│  Registry   │  Catalog     │  Gateway                  │
└──────┬──────┴───────┬──────┴────────────┬──────────────┘
       │              │                   │
  ┌────┴────┐   ┌────┴────┐   ┌────┴────┐
  │Academic │   │ Finance │   │Student │
  │Domain   │   │ Domain  │   │Domain  │
  └────┬────┘   └────┬────┘   └────┬────┘
       │              │             │
  ┌────┴────┐   ┌────┴────┐   ┌────┴────┐
  │Grades   │   │Payments │   │Profiles│
  │Courses  │   │Invoices │   │Attendance│
  │Transcr. │   │Budgets  │   │Health  │
  └─────────┘   └─────────┘   └─────────┘
```

---

## 3. Data Products

### 3.1 Data Product Definition

```typescript
interface DataProduct {
  id: string;
  name: string;
  domain: string;
  description: string;
  owner: string;
  version: string;
  schema: DataSchema[];
  sla: SLAConfig;
  access_level: "public" | "internal" | "restricted";
  tags: string[];
  quality_metrics: QualityMetrics;
}

interface SLAConfig {
  availability: number; // percentage
  latency_ms: number;
  freshness_seconds: number;
  completeness: number; // percentage
  uptime_schedule: string;
}

const DATA_PRODUCTS: DataProduct[] = [
  {
    id: "dp_grades",
    name: "Academic Grades",
    domain: "academic",
    description: "Notes et résultats académiques des élèves",
    owner: "academic_domain",
    version: "1.0.0",
    schema: [
      { field: "student_id", type: "uuid", required: true },
      { field: "course_id", type: "uuid", required: true },
      { field: "score", type: "number", required: true },
      { field: "period", type: "string", required: true },
      { field: "updated_at", type: "timestamp", required: true }
    ],
    sla: {
      availability: 99.9,
      latency_ms: 100,
      freshness_seconds: 300,
      completeness: 99.5,
      uptime_schedule: "24/7"
    },
    access_level: "internal",
    tags: ["academic", "grades", "student"],
    quality_metrics: {
      completeness: 99.8,
      accuracy: 99.9,
      timeliness: 99.5,
      consistency: 99.7
    }
  },
  {
    id: "dp_student_profiles",
    name: "Student Profiles",
    domain: "student",
    description: "Profils et informations des élèves",
    owner: "student_domain",
    version: "1.0.0",
    schema: [
      { field: "id", type: "uuid", required: true },
      { field: "first_name", type: "string", required: true },
      { field: "last_name", type: "string", required: true },
      { field: "email", type: "string", required: false },
      { field: "enrollment_date", type: "date", required: true }
    ],
    sla: {
      availability: 99.99,
      latency_ms: 50,
      freshness_seconds: 60,
      completeness: 99.9,
      uptime_schedule: "24/7"
    },
    access_level: "restricted",
    tags: ["student", "profile", "pii"],
    quality_metrics: {
      completeness: 99.5,
      accuracy: 99.9,
      timeliness: 99.8,
      consistency: 99.6
    }
  }
];
```

---

## 4. Data Product API

### 4.1 Publish Data Product

```typescript
class DataProductPublisher {
  async publish(product: DataProduct): Promise<void> {
    // 1. Validate schema
    await this.validateSchema(product);

    // 2. Register in catalog
    await this.registerInCatalog(product);

    // 3. Create API endpoints
    await this.createEndpoints(product);

    // 4. Set up monitoring
    await this.setupMonitoring(product);

    // 5. Notify consumers
    await this.notifyConsumers(product);
  }

  async createEndpoints(product: DataProduct): Promise<void> {
    const basePath = `/api/v1/datamesh/${product.domain}/${product.id}`;

    // Read endpoint
    await this.registerEndpoint({
      method: "GET",
      path: `${basePath}`,
      description: `Read ${product.name}`,
      auth: { type: "bearer", scopes: [`${product.id}:read`] },
      rate_limit: { max: 100, window: 60 }
    });

    // Query endpoint
    await this.registerEndpoint({
      method: "POST",
      path: `${basePath}/query`,
      description: `Query ${product.name}`,
      auth: { type: "bearer", scopes: [`${product.id}:query`] },
      rate_limit: { max: 50, window: 60 }
    });

    // Subscribe endpoint
    await this.registerEndpoint({
      method: "POST",
      path: `${basePath}/subscribe`,
      description: `Subscribe to ${product.name} changes`,
      auth: { type: "bearer", scopes: [`${product.id}:subscribe`] },
      rate_limit: { max: 10, window: 60 }
    });
  }
}
```

### 4.2 Query Data Product

```http
POST /api/v1/datamesh/academic/dp_grades/query
```

**Request Body:**
```json
{
  "filters": {
    "student_id": "student_456",
    "period": "2025-S2"
  },
  "fields": ["course_id", "score", "period"],
  "sort": { "field": "score", "order": "desc" },
  "limit": 50,
  "offset": 0
}
```

**Response 200:**
```json
{
  "data_product_id": "dp_grades",
  "version": "1.0.0",
  "data": [
    {
      "course_id": "course_math_6",
      "score": 16.5,
      "period": "2025-S2"
    },
    {
      "course_id": "course_french_6",
      "score": 14.2,
      "period": "2025-S2"
    }
  ],
  "metadata": {
    "total": 2,
    "freshness": "2026-08-07T10:00:00Z",
    "completeness": 100,
    "cache_hit": false
  }
}
```

---

## 5. Cross-Domain Queries

```typescript
class CrossDomainQueryEngine {
  async executeFederatedQuery(
    query: FederatedQuery,
    userContext: UserContext
  ): Promise<FederatedResult> {
    // 1. Parse query to identify required domains
    const requiredDomains = this.parseDomains(query);

    // 2. Check permissions
    const permissions = await this.checkPermissions(userContext, requiredDomains);

    // 3. Optimize query plan
    const queryPlan = this.optimizeQuery(query, permissions);

    // 4. Execute in parallel where possible
    const results = await this.executePlan(queryPlan);

    // 5. Merge results
    return this.mergeResults(results, query.joins);
  }
}

// Example: Get student grades with teacher info
const federatedQuery = {
  selects: [
    { domain: "student", fields: ["first_name", "last_name"] },
    { domain: "academic", fields: ["score", "period"] },
    { domain: "teacher", fields: ["first_name as teacher_name"] }
  ],
  joins: [
    {
      left: { domain: "student", field: "id" },
      right: { domain: "academic", field: "student_id" }
    },
    {
      left: { domain: "academic", field: "teacher_id" },
      right: { domain: "teacher", field: "id" }
    }
  ],
  filters: {
    "academic.period": "2025-S2",
    "academic.score": { "$gte": 10 }
  },
  sort: { "academic.score": "desc" },
  limit: 100
};
```

---

## 6. Data Lineage

```typescript
interface LineageRecord {
  source_domain: string;
  source_product: string;
  target_domain: string;
  target_product: string;
  transformation: string;
  frequency: string;
  last_sync: string;
  record_count: number;
  quality_score: number;
}

class DataLineageTracker {
  async trackTransformation(params: {
    source: DataProductRef;
    target: DataProductRef;
    transformation: string;
    input_records: number;
    output_records: number;
  }): Promise<LineageRecord> {
    const lineage: LineageRecord = {
      source_domain: params.source.domain,
      source_product: params.source.product_id,
      target_domain: params.target.domain,
      target_product: params.target.product_id,
      transformation: params.transformation,
      frequency: "on_demand",
      last_sync: new Date().toISOString(),
      record_count: params.output_records,
      quality_score: this.calculateQualityScore(
        params.input_records,
        params.output_records
      )
    };

    await this.supabase.from("data_lineage").insert(lineage);
    return lineage;
  }

  async getLineage(
    productId: string,
    depth: number = 3
  ): Promise<LineageGraph> {
    // Build upstream lineage
    const upstream = await this.getUpstream(productId, depth);

    // Build downstream lineage
    const downstream = await this.getDownstream(productId, depth);

    return { upstream, downstream };
  }
}
```

---

## 7. Discovery & Catalog

### 7.1 Search Data Products

```http
GET /api/v1/datamesh/catalog/search?q={query}&domain={domain}&tags={tags}
```

**Response 200:**
```json
{
  "results": [
    {
      "id": "dp_grades",
      "name": "Academic Grades",
      "domain": "academic",
      "description": "Notes et résultats académiques",
      "owner": "academic_domain",
      "version": "1.0.0",
      "quality_score": 99.7,
      "tags": ["academic", "grades", "student"],
      "last_updated": "2026-08-07T10:00:00Z"
    }
  ],
  "total": 1,
  "facets": {
    "domains": ["academic", "student", "finance"],
    "tags": ["grades", "attendance", "payments"]
  }
}
```

---

## 8. Domain Ownership

| Domain | Owner | Products | SLA |
|--------|-------|----------|-----|
| Academic | Directeur Pédagogique | Grades, Courses, Transcripts | 99.9% |
| Student | Secrétariat | Profiles, Attendance, Health | 99.99% |
| Finance | Comptable | Payments, Invoices, Budget | 99.9% |
| HR | DRH | Teachers, Staff, Contracts | 99.5% |
| Operations | Intendant | Transport, Library, Discipline | 99.5% |
