# Architecture — Phase 3.3 Assessment Engine

## Design Patterns

### Domain-Driven Design (DDD)

The assessment module follows DDD with bounded contexts mapped to 11 modules:

- **Core Assessment Context**: Exams, sessions, attempts, grading
- **Question Bank Context**: Questions, categories, tags, import/export
- **Certification Context**: Certificates, badges, diplomas, verification
- **Competency Context**: Skills, rubrics, portfolios, assessments
- **National Exam Context**: Centers, registration, correction, results
- **Accreditation Context**: Standards, audits, compliance
- **Integrity Context**: Plagiarism, AI detection, fraud
- **Portfolio Context**: Student/teacher portfolios, media
- **Research Context**: Projects, publications, grants
- **International Context**: Credits, transfers, recognition
- **AI Features Context**: Feedback, predictions, moderation

### Repository Pattern

Single `AssessmentRepository` interface with 5 CRUD methods per entity:

```typescript
// web/src/features/assessment/repositories/assessment.repository.ts
export interface AssessmentRepository {
  create<Entity>(schoolId: string, data: EntityCreate): Promise<Entity>;
  get<Entity>(schoolId: string, id: string): Promise<Entity | null>;
  update<Entity>(schoolId: string, id: string, data: EntityUpdate): Promise<Entity>;
  delete<Entity>(schoolId: string, id: string): Promise<void>;
  list<Entity>(schoolId: string, filters?: Record<string, unknown>): Promise<Entity[]>;
}
```

Implementation uses Supabase client for all database operations. Every method is scoped to `schoolId` for multi-tenancy.

### Service Layer

40 service classes follow identical pattern:

```typescript
export class Assessment[Entity]Service {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async get(schoolId, id) → throws NotFoundError if missing
  async list(schoolId, filters?)
  async create(schoolId, data)
  async update(schoolId, id, data) → throws NotFoundError if missing
  async delete(schoolId, id) → throws NotFoundError if missing
}
```

Services instantiate the repository and delegate CRUD. Error handling throws typed `Assessment*Error` classes from `@educi/errors`.

## Data Flow

```
Client (React/React Native)
  ↓ HTTP request
API Route (Next.js /api/assessment/*)
  ↓ Validates with Zod schemas
Service Layer
  ↓ Business logic + error handling
Repository Layer
  ↓ Supabase queries
PostgreSQL Database
  ↓
Supabase Realtime (optional)
  ↓
Client State (React hooks)
```

### Request Lifecycle

1. **Client** calls a hook (`useAssessment*`)
2. **Hook** instantiates a service via `createClient()`
3. **Service** validates input, calls repository
4. **Repository** executes Supabase query
5. **Response** flows back through service → hook → UI

### Hook Pattern

40 hooks follow two patterns:

**List Hook** — fetches data on mount:
```typescript
export const useAssessment[Entity]List = (schoolId: string) => {
  const [items, setItems] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // fetchItems via service.list*
  return { items, loading, error, refresh: fetchItems };
};
```

**Actions Hook** — CRUD operations:
```typescript
export const useAssessment[Entity]Actions = () => {
  // create, update, delete mutations
  return { create, update, delete, loading, error };
};
```

## Multi-Tenancy

All data is scoped to `school_id`. Every query includes `schoolId` as the first parameter. Row Level Security (RLS) policies on Supabase enforce isolation.

## Error Handling

853 typed error classes in `@educi/errors` extend `AppError`:

```typescript
export class Assessment[Domain]Error extends AppError {
  constructor(details?: string | Record<string, unknown>) {
    super(`Assessment [Domain] error${details ? `: ${JSON.stringify(details)}` : ''}`,
      'ASSESSMENT_[CODE]', 500, true);
  }
}
```

Errors are grouped by module (120 per module 1-2, 60 for module 3, 50 for module 4, 60 for module 5, 40 for module 6, 50+ for remaining).

## Validation

4 Zod schema files with create/update schemas per entity:

| File | Entities |
|------|----------|
| `assessment-core.ts` | Module 1-2: AI exam, grading, proctoring, questions |
| `assessment-certification.ts` | Module 3: Certificates, badges, diplomas |
| `assessment-modules.ts` | Module 4-5: Competency, national exams |
| `assessment-research-intl.ts` | Module 6-11: Accreditation, integrity, portfolio, research, international, AI |
