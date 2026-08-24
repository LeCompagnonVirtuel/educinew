# GEDKIN Architecture — Deep Dive

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Presentation Layer                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │  Pages  │  │  Hooks  │  │  UI     │  │ Mobile  │  │  Copilot│ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘ │
├───────┴────────────┴────────────┴────────────┴────────────┴────────┤
│                        Service Layer                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ DataSvc  │  │GraphSvc  │  │Semantic  │  │Research  │           │
│  │          │  │          │  │  Svc     │  │  Svc     │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ObsrvSvc  │  │PolicySvc │  │Forecast  │  │ AgentSvc │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │LabSvc    │  │MarketSvc │  │SimulSvc  │  │CopilotSvc│           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
├───────┴────────────┴────────────┴────────────┴────────────────────┤
│                       Repository Layer                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              GedkinCrudRepositoryImpl<T>                     │   │
│  │  findAll · findById · create · update · delete · softDelete  │   │
│  └────────────────────────────┬────────────────────────────────┘   │
├───────────────────────────────┴────────────────────────────────────┤
│                        Data Layer                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Supabase  │  │ pgvector │  │  Edge    │  │ Storage  │           │
│  │ Postgres │  │ Vectors  │  │Functions │  │          │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer Responsibilities

### Presentation Layer

| Component | Responsibility |
|-----------|---------------|
| Pages | Route rendering, layout composition |
| Hooks | State management, data fetching orchestration |
| UI Components | Display, interaction, animations |
| Mobile | Expo/React Native offline-first experience |
| Copilot | Natural language interface |

### Service Layer

| Component | Responsibility |
|-----------|---------------|
| BaseGedkinService | Validation, authorization, business logic |
| Module Services | Domain-specific operations |
| AI Integration | DeepSeek/Gemini orchestration |

### Repository Layer

| Component | Responsibility |
|-----------|---------------|
| GedkinCrudRepositoryImpl | Generic CRUD with multi-tenant filtering |
| Specialized Repos | Custom query patterns per module |

### Data Layer

| Component | Responsibility |
|-----------|---------------|
| Supabase Postgres | Primary data store |
| pgvector | Vector similarity search |
| Edge Functions | Serverless compute |
| Storage | File and artifact storage |

---

## Base Service Pattern

```typescript
export abstract class BaseGedkinService {
  protected readonly config: GedkinServiceConfig;

  constructor(config: GedkinServiceConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  protected validateSchoolId(schoolId: string): void;
  protected validateId(id: string, entityName: string): void;
  protected validateSchema<T>(schema: z.ZodSchema<T>, data: unknown, entityName: string): T;
  protected validatePagination(params: PaginationParams): PaginationParams;
  protected async ensureExists<T>(repo, id, schoolId, entityName): Promise<T>;
  protected validateOwnership<T>(entity, schoolId, entityName): void;
  protected validateNotEmpty(data, fields, entityName): void;
  protected validateEnum<T>(value, allowed, fieldName, entityName): void;
  protected validateRange(value, min, max, fieldName, entityName): void;
  protected sanitizeFilters(filters: FilterParams): FilterParams;
}
```

---

## Base Repository Pattern

```typescript
export interface GedkinCrudRepository<T extends GedkinBaseEntity> {
  findAll(schoolId: string, params?: PaginationParams & FilterParams): Promise<PaginatedResult<T>>;
  findById(id: string, schoolId: string): Promise<T>;
  create(data: Omit<T, 'id' | 'school_id' | 'created_at' | 'updated_at'>, schoolId: string): Promise<T>;
  update(id: string, schoolId: string, data: Partial<Omit<T, 'id' | 'school_id' | 'created_at'>>): Promise<T>;
  delete(id: string, schoolId: string): Promise<void>;
  softDelete(id: string, schoolId: string): Promise<void>;
  restore(id: string, schoolId: string): Promise<void>;
  count(schoolId: string, filters?: FilterParams): Promise<number>;
  exists(id: string, schoolId: string): Promise<boolean>;
}
```

---

## Module Dependency Graph

```
M1 Data Fabric
├── M2 Knowledge Graph (lineage tracking)
├── M3 Semantic Intelligence (embeddings)
└── M10 Marketplace (data products)

M2 Knowledge Graph
├── M3 Semantic Intelligence (entity embeddings)
├── M4 Research Intelligence (research entities)
└── M8 AI Agents (graph traversal agent)

M3 Semantic Intelligence
├── M12 Copilot (semantic search)
└── M9 Lab (dataset embeddings)

M4 Research Intelligence
├── M5 Observatory (research indicators)
└── M8 AI Agents (research agent)

M5 Observatory
├── M6 Policy (indicator-based decisions)
├── M7 Forecasting (indicator predictions)
└── M11 Simulation (scenario baselines)

M6 Policy Intelligence
├── M7 Forecasting (policy impact forecasts)
├── M11 Simulation (policy simulations)
└── M8 AI Agents (policy agent)

M7 Forecasting Engine
├── M11 Simulation (forecast scenarios)
└── M8 AI Agents (forecasting agent)

M8 AI Agent Network
├── All modules (agent orchestration)
└── M12 Copilot (agent responses)

M9 Research Lab
├── M4 Research Intelligence (experiment results)
└── M3 Semantic Intelligence (dataset embeddings)

M10 Marketplace
├── M1 Data Fabric (data products)
└── M9 Lab (published models)

M11 Simulation Engine
├── M7 Forecasting (simulation inputs)
└── M6 Policy (scenario outcomes)

M12 Intelligence Copilot
├── All modules (unified query interface)
└── M8 AI Agents (response generation)
```

---

## Error Handling

All GEDKIN errors extend `AppError` with structured codes:

| Error Pattern | Code Suffix | HTTP Status |
|--------------|-------------|-------------|
| Not Found | `_NOT_FOUND` | 404 |
| Conflict | `_CONFLICT` | 409 |
| Validation | `_VALIDATION` | 400 |
| Permission | `_PERMISSION` | 403 |
| Rate Limit | `_RATE_LIMIT` | 429 |
| Timeout | `_TIMEOUT` | 504 |
| Generic | `_ERROR` | 500 |

---

## Configuration Hierarchy

```
gedkinConfig (root)
├── dataFabric
├── knowledgeGraph
├── semantic
├── research
├── observatory
├── policy
├── forecast
├── agent
├── experiment
├── marketplace
├── simulation
├── copilot
├── ai
├── security
└── performance
```

---

## Multi-Tenant Isolation

Every data access enforces:

1. **Repository Level** — `.eq('school_id', schoolId)` on all queries
2. **Service Level** — `validateSchoolId()` before operations
3. **RLS Level** — Database policies enforce tenant boundaries
4. **API Level** — JWT contains `school_id` claim
5. **UI Level** — Only authorized modules visible per role

---

## Performance Architecture

| Strategy | Implementation |
|----------|---------------|
| Caching | Redis-backed, 300s TTL |
| Vector Indexing | pgvector IVFFlat |
| Graph Indexing | Adjacency lists + B-tree |
| Pagination | Offset-based, max 200 |
| Lazy Loading | Client-side deferred fetch |
| Background Jobs | Edge Function cron |
| Streaming | SSE for copilot responses |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SECURITY.md](GEDKIN_SECURITY.md)
- [GEDKIN_PERFORMANCE.md](GEDKIN_PERFORMANCE.md)
