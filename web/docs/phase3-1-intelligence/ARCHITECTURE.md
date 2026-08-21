# Architecture Technique — Phase 3.1 Intelligence

## Vue d'ensemble

La plateforme Intelligence suit une architecture en couches avec séparation stricte des responsabilités :

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React      │  │   Hooks     │  │   Validators (Zod)  │  │
│  │   Components │  │   (64)      │  │   (3 fichiers)      │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
├─────────┼────────────────┼─────────────────────┼─────────────┤
│         │          API Routes (32)              │             │
│         │    /api/intelligence/{entity}         │             │
├─────────┼────────────────┼─────────────────────┼─────────────┤
│              Service Layer (32 services)                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Int*Service (get, list, create, update, delete)        │  │
│  └─────────────────────────┬───────────────────────────────┘  │
├─────────────────────────────┼─────────────────────────────────┤
│              Repository Layer                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  IntelligenceRepositoryImpl (160+ méthodes)             │  │
│  └─────────────────────────┬───────────────────────────────┘  │
├─────────────────────────────┼─────────────────────────────────┤
│              Supabase (PostgreSQL)                            │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  intelligence_* tables (32 tables)                       │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Flux de données

### 1. Collecte de données
```
Sources externes → DataSources → Pipelines (ETL/Stream) → IntelligenceEngine
```

### 2. Traitement IA
```
IntelligenceEngine → AIModels → Scores/Insights/Alertes
```

### 3. Analyse prédictive
```
PredictiveModels → StudentRisk/EarlyWarnings/Outlooks/Scenarios
```

### 4. NLP & Connaissances
```
Documents → NLPTasks → Sentiment/Classification/Summarization → KnowledgeBase
```

### 5. Décisionnel
```
Scores/Insights → Dashboards → Widgets/KPIs → Recommandations → Actions
```

## Patterns d'intégration

### Repository Pattern
```typescript
// features/intelligence/repositories/intelligence.repository.ts
export interface IntelligenceRepository {
  createEngine(schoolId: string, data: IntelligenceEngineCreate): Promise<IntelligenceEngine>;
  getEngine(schoolId: string, id: string): Promise<IntelligenceEngine | null>;
  // ... 160+ méthodes
}

export class IntelligenceRepositoryImpl implements IntelligenceRepository {
  constructor(private readonly supabase: SupabaseClient) {}
  // Implémentation Supabase
}
```

### Service Pattern
```typescript
// features/intelligence/services/int-engine.service.ts
export class IntEngineService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  
  async getEngine(schoolId: string, id: string): Promise<IntelligenceEngine> {
    const item = await this.repo.getEngine(id, schoolId);
    if (!item) throw new IntEngineNotFoundError(id);
    return item;
  }
}
```

### API Route Pattern
```typescript
// app/api/intelligence/engines/route.ts
export async function GET(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { searchParams } = new URL(request.url);
  const schoolId = searchParams.get('schoolId');
  const service = new IntEngineService(supabase);
  const data = await service.listEngines(schoolId);
  return NextResponse.json({ data });
}
```

### Hook Pattern (List)
```typescript
// features/intelligence/hooks/use-int-engine-list.ts
'use client';
export const useIntEngineList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ... fetch logic
  return { items, loading, error, refresh: fetchItems };
};
```

### Hook Pattern (Actions)
```typescript
// features/intelligence/hooks/use-int-engine-actions.ts
'use client';
export const useIntEngineActions = (schoolId: string) => {
  const create = useCallback(async (data) => { /* ... */ }, [schoolId]);
  const update = useCallback(async (id, data) => { /* ... */ }, [schoolId]);
  const remove = useCallback(async (id) => { /* ... */ }, [schoolId]);
  return { loading, error, create, update, remove };
};
```

## Pipeline IA/ML

### Types de modèles
| Type | Usage |
|------|-------|
| `CLASSIFICATION` | Catégorisation de données |
| `REGRESSION` | Prédiction de valeurs continues |
| `CLUSTERING` | Groupement de données |
| `ANOMALY_DETECTION` | Détection d'anomalies |
| `TIME_SERIES` | Séries temporelles |
| `NLP` | Traitement du langage naturel |

### Pipeline de traitement
1. **Ingestion** — DataSources collectent les données brutes
2. **Transformation** — Pipelines ETL/Stream nettoient et transforment
3. **Entraînement** — AIModels sont entraînés sur les données
4. **Inférence** — Modèles prédictifs génèrent des prédictions
5. **Évaluation** — Scores et métriques de confiance
6. **Alerting** — Alertes et avertissements précoces
7. **Recommandation** — Recommandations décisionnelles
8. **Visualisation** — Dashboards et widgets

## Isolation par école

Toutes les opérations sont filtrées par `schoolId` :
- Repository : `.eq('school_id', schoolId)`
- Service : paramètre `schoolId` obligatoire
- API Route : `schoolId` dans query params ou body
- Hook : `schoolId` comme dépendance
