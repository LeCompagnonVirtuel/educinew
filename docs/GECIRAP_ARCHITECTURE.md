# GECIRAP — Architecture Deep Dive

## Domain-Driven Design, Multi-Tenancy & Service Patterns

---

## 1. Architectural Principles

GECIRAP follows the EduCI enterprise architecture:

```
Page → Hook → Service → Repository → Supabase
```

No business logic in pages. No Supabase access in UI components. Every layer has a single responsibility.

### Layer Responsibilities

| Layer | Responsibility | Location |
|-------|---------------|----------|
| **Page** | Rendering, user interaction | `web/src/app/` |
| **Hook** | State management, data fetching | `web/src/features/gecirap/hooks/` |
| **Service** | Business logic, validation, orchestration | `web/src/features/gecirap/services/` |
| **Repository** | Data access, query building | `web/src/features/gecirap/repositories/` |
| **Supabase** | Storage, auth, RLS enforcement | External service |

---

## 2. Domain Model

GECIRAP is organized into 12 bounded contexts (modules):

```
┌──────────────────────────────────────────────────────────────────┐
│                        GECIRAP Domain                            │
├────────────────────────┬─────────────────────────────────────────┤
│  Cloud Infrastructure  │         Multi-Region & Geo              │
│  ─────────────────────│──────────────────────────────────────    │
│  CloudProvider         │  GeoRegion                              │
│  CloudAccount          │  RegionPolicy                           │
│  CloudResource         │  RegionHealth                           │
│  CloudEnvironment      │  FailoverPolicy                         │
│  CloudDeployment       │  TrafficRoute                           │
│  CloudQuota            │  RegionalDeployment                     │
├────────────────────────┼─────────────────────────────────────────┤
│  Containers            │         Infrastructure as Code          │
│  ─────────────────────│──────────────────────────────────────    │
│  Cluster               │  InfrastructureTemplate                 │
│  Node                  │  InfrastructureStack                    │
│  NodePool              │  ProvisioningJob                        │
│  Namespace             │  ResourceChange                         │
│  Workload              │  DriftDetection                         │
│  Container             │  InfrastructurePolicy                   │
│  Service (K8s)         │                                         │
│  Ingress               │                                         │
├────────────────────────┼─────────────────────────────────────────┤
│  Autoscaling           │         Disaster Recovery               │
│  ─────────────────────│──────────────────────────────────────    │
│  ScalingPolicy         │  DisasterRecoveryPlan                   │
│  ScalingEvent          │  RecoveryStrategy                       │
│  CapacityForecast      │  RecoveryExecution                      │
│  CapacityPlan          │  RecoveryTest                           │
│  ResourceUtilization   │  RecoveryDependency                     │
│  CapacityAlert         │                                         │
├────────────────────────┼─────────────────────────────────────────┤
│  Multi-Cloud           │         Edge Computing                  │
│  ─────────────────────│──────────────────────────────────────    │
│  CloudPlacementDecision│  EdgeNode                               │
│  CloudMigration        │  EdgeCluster                            │
│  CloudBalance          │  EdgeDeployment                         │
│  ProviderCapability    │  EdgeSyncJob                            │
│                        │  EdgeCache                              │
│                        │  EdgePolicy                             │
│                        │  OfflinePackage                         │
├────────────────────────┼─────────────────────────────────────────┤
│  Network & CDN         │         AIOps                           │
│  ─────────────────────│──────────────────────────────────────    │
│  Network               │  AIOpsAgent                             │
│  NetworkRoute          │  InfrastructureEvent                    │
│  LoadBalancer          │  IncidentCorrelation                    │
│  CDNDistribution       │  RootCauseAnalysis                      │
│  DNSRecord             │  Recommendation                         │
│  NetworkHealth         │  AutomatedAction                        │
│  TrafficMetric         │  RemediationPlan                        │
├────────────────────────┼─────────────────────────────────────────┤
│  FinOps                │         Digital Twin                    │
│  ─────────────────────│──────────────────────────────────────    │
│  CloudCost             │  InfrastructureTwin                     │
│  CostAllocation        │  TwinSimulation                         │
│  CostCenter            │  TwinScenario                           │
│  Budget                │  TwinResult                             │
│  CostForecast          │  TwinSync                               │
│  CostAnomaly           │                                         │
│  OptimizationRecomm.   │                                         │
│  ReservedCapacity      │                                         │
└────────────────────────┴─────────────────────────────────────────┘
```

---

## 3. Multi-Tenancy

### Strategy: Shared Database, Shared Schema

Every table includes `school_id`. Every query includes `.eq("school_id", schoolId)`. RLS enforces isolation at the database level. The service layer adds `validateOwnership()` as a defense-in-depth measure.

### Implementation

```typescript
// Repository layer — every query includes school_id
async findAll(schoolId: string, params?: PaginationParams & FilterParams) {
  let query = this.supabase
    .from(this.tableName)
    .select('*', { count: 'exact' })
    .eq('school_id', schoolId)       // ← tenant filter
    .is('deleted_at', null)
    .range(offset, offset + safeLimit - 1);
  // ...
}

// Service layer — ownership validation
protected validateOwnership<T extends GecirapBaseEntity>(
  entity: T,
  schoolId: string,
  entityName: string,
): void {
  if (entity.school_id !== schoolId) {
    throw new GecirapPermissionError(
      `Accès non autorisé à ${entityName} d'un autre établissement`
    );
  }
}
```

### API Layer Enforcement

Every API route:
1. Authenticates user via Supabase JWT
2. Fetches `school_id` from users table
3. Validates role is `SUPER_ADMIN` or `ADMIN`
4. Passes `schoolId` to service methods

```typescript
const { data: profile } = await supabase
  .from('users')
  .select('role, school_id')
  .eq('id', user.id)
  .single();

const schoolId = profile?.school_id;
if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });
if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
}
```

---

## 4. Service Patterns

### Base Service

`BaseGecirapService` provides:

| Method | Purpose |
|--------|---------|
| `validateSchoolId()` | Ensure school_id is non-empty |
| `validateId()` | Ensure entity ID is non-empty |
| `validateSchema()` | Zod schema validation |
| `validatePagination()` | Clamp offset/limit values |
| `ensureExists()` | Verify entity exists before operation |
| `validateOwnership()` | Cross-tenant access prevention |
| `validateNotEmpty()` | Required field validation |
| `validateEnum()` | Enum value validation |
| `validateRange()` | Numeric range validation |
| `sanitizeFilters()` | Remove empty filter values |

### Service Lifecycle

```
1. Validate schoolId
2. Validate input (Zod schema)
3. Check entity exists (ensureExists)
4. Validate ownership (validateOwnership)
5. Execute business logic
6. Return result
```

### Error Handling

Services throw typed errors from `@educi/errors`:

```typescript
throw new GecirapValidationError('Erreur de validation cluster: name - requis');
throw new GecirapNotFoundError('Cluster (uuid) introuvable');
throw new GecirapPermissionError('Accès non autorisé à cluster d\'un autre établissement');
```

---

## 5. Repository Pattern

### CRUD Operations

| Operation | Method | Description |
|-----------|--------|-------------|
| List | `findAll(schoolId, params)` | Paginated list with filters |
| Read | `findById(id, schoolId)` | Single entity by ID |
| Create | `create(data, schoolId)` | Insert with UUID generation |
| Update | `update(id, schoolId, data)` | Partial update |
| Delete | `delete(id, schoolId)` | Hard delete |
| Soft Delete | `softDelete(id, schoolId)` | Set `deleted_at` |
| Restore | `restore(id, schoolId)` | Clear `deleted_at` |
| Count | `count(schoolId, filters)` | Count with filters |
| Exists | `exists(id, schoolId)` | Boolean existence check |

### Query Pattern

All queries follow:
1. Filter by `school_id`
2. Exclude soft-deleted (`deleted_at IS NULL`)
3. Apply additional filters
4. Order by `created_at DESC`
5. Apply pagination (range)

---

## 6. Validation Strategy

### Zod Schemas

Every entity has create and update schemas defined in `packages/types/src/phase4-8-gecirap.ts`.

```typescript
export const createGecirapClusterSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(128),
  provider: z.nativeEnum(GecirapCloudProviderType),
  region: z.string().min(1),
  status: z.nativeEnum(GecirapClusterStatus).default(GecirapClusterStatus.PROVISIONING),
  nodeCount: z.number().int().min(0).default(0),
  capacity: z.record(z.number()).default({}),
  config: z.record(z.unknown()).default({}),
});
```

### API-Level Validation

API routes use Zod for request validation:

```typescript
const CreateSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  type: z.enum(['AWS', 'AZURE', 'GCP', 'OPENSTACK', 'VMWARE', 'OTHER']),
  // ...
});

const validation = CreateSchema.safeParse(body);
if (!validation.success) {
  const errors = validation.error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
  return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
}
```

---

## 7. Configuration Management

All configuration lives in `packages/config/src/phase4-8-gecirap.ts`. Configuration is organized per module:

```typescript
export const gecirapConfig = {
  cloud: gecirapCloudConfig,
  region: gecirapRegionConfig,
  multiRegion: gecirapMultiRegionConfig,
  container: gecirapContainerConfig,
  iac: gecirapIaCConfig,
  autoscaling: gecirapAutoscalingConfig,
  dr: gecirapDRConfig,
  multiCloud: gecirapMultiCloudConfig,
  edge: gecirapEdgeConfig,
  network: gecirapNetworkConfig,
  aiops: gecirapAIOpsConfig,
  finops: gecirapFinOpsConfig,
  digitalTwin: gecirapDigitalTwinConfig,
  security: gecirapSecurityConfig,
  observability: gecirapObservabilityConfig,
};
```

---

## 8. Type System

### Enums

Every domain concept has a typed enum:

```typescript
export enum GecirapCloudProviderType {
  AWS = 'AWS',
  AZURE = 'AZURE',
  GCP = 'GCP',
  ORACLE = 'ORACLE',
  PRIVATE = 'PRIVATE',
  ON_PREMISE = 'ON_PREMISE',
  HYBRID = 'HYBRID',
}
```

### Interfaces

Every entity has a TypeScript interface:

```typescript
export interface GecirapCluster {
  id: string;
  schoolId: string;
  name: string;
  provider: GecirapCloudProviderType;
  region: string;
  status: GecirapClusterStatus;
  nodeCount: number;
  capacity: Record<string, number>;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
```

### No `any`

The codebase uses `Record<string, unknown>` for dynamic data and explicit types for structured data. No `any` types are used.

---

## 9. Data Flow

### Read Path

```
Browser → Next.js Route → Supabase Client → PostgreSQL (RLS) → Response
   │                           │
   │                    .eq('school_id', schoolId)
   │                    .is('deleted_at', null)
   │                    .range(offset, offset + limit - 1)
   │
   └── JSON Response
```

### Write Path

```
Browser → Next.js Route → Zod Validation → Supabase Client → PostgreSQL
   │                           │                               │
   │                    Schema.safeParse()              .eq('school_id', schoolId)
   │                    Error handling                  .insert() / .update()
   │
   └── JSON Response (201 or 200)
```

### Delete Path (Soft Delete)

```
Browser → Next.js Route → Auth Check → Supabase Client → PostgreSQL
   │                       │                           │
   │                  role check              .update({ deleted_at: now })
   │                  school_id check         .eq('id', id)
   │
   └── JSON Response { success: true }
```

---

## 10. Testing Strategy

| Level | Framework | Scope |
|-------|-----------|-------|
| Unit | Vitest | Services, validators, error classes |
| Integration | Vitest + Supabase test client | Repository + database |
| E2E | Playwright | Full API workflows |

### Test Structure

```
web/src/features/gecirap/services/__tests__/
  cloud-service.test.ts
  region-service.test.ts
  container-service.test.ts
  iac-service.test.ts
  scaling-service.test.ts
  dr-service.test.ts
  multi-cloud-service.test.ts
  edge-service.test.ts
  network-service.test.ts
  aiops-service.test.ts
  finops-service.test.ts
  digital-twin-service.test.ts
```

---

## 11. Observability

### Logs

Structured JSON logs for all operations:
- Request ID
- User ID
- School ID
- Operation type
- Duration
- Status

### Metrics

- API response times per endpoint
- Error rates per module
- Database query performance
- Cloud provider API latency
- Edge node sync lag

### Dashboards

- Infrastructure overview
- Cost analytics
- Capacity utilization
- DR readiness
- Security posture

---

## 12. Extension Points

| Mechanism | Purpose |
|-----------|---------|
| New repository | Add new entity type |
| New service | Add business logic |
| New API route | Expose new endpoint |
| New enum | Add domain value |
| New config | Add tunable parameter |
| New error class | Add typed error |
| New Zod schema | Add validation |
| New hook | Add frontend data fetching |
