# Tests — Phase 3.1 Intelligence

## Vue d'ensemble

La suite de tests pour la phase 3.1 Intelligence se trouve dans `tests/phase3-1-intelligence/` et utilise Vitest comme framework de test.

## Fichiers de test

| Fichier | Service testé | Tests |
|---------|---------------|-------|
| `int-engine.test.ts` | `IntEngineService` | 30 tests |
| `int-data-source.test.ts` | `IntDataSourceService` | ~30 tests |
| `int-pipeline.test.ts` | `IntPipelineService` | ~30 tests |
| `int-scenario.test.ts` | `IntScenarioService` | ~30 tests |
| `int-knowledge-base.test.ts` | `IntKnowledgeBaseService` | ~30 tests |

**Total estimé : 150+ tests** (5 fichiers × ~30 tests)

## Pattern de test

### Mock Supabase

```typescript
const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({ single: vi.fn(), data: [], error: null })),
      data: [],
      error: null,
    })),
    insert: vi.fn(() => ({ 
      select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) 
    })),
    update: vi.fn(() => ({ 
      eq: vi.fn(() => ({ 
        select: vi.fn(() => ({ single: vi.fn(), data: null, error: null })) 
      })) 
    })),
    delete: vi.fn(() => ({ 
      eq: vi.fn(() => ({ data: null, error: null })) 
    })),
  })),
} as any;
```

### Structure de test

```typescript
describe('Int{Entity}Service', () => {
  let service: Int{Entity}Service;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new Int{Entity}Service(mockSupabase);
  });

  // Tests de base
  it('should create service instance', () => { ... });
  it('should have supabase injected', () => { ... });

  // Tests CRUD
  it('should get {entity} by id', async () => { ... });
  it('should list {entities}', async () => { ... });
  it('should create {entity}', async () => { ... });
  it('should update {entity}', async () => { ... });
  it('should delete {entity}', async () => { ... });

  // Tests de filtres
  it('should handle list with filters', async () => { ... });
  it('should handle list with undefined filters', async () => { ... });
  it('should handle list with empty filters', async () => { ... });

  // Tests de concurrence
  it('should handle multiple calls', async () => { ... });
  it('should handle concurrency', async () => { ... });

  // Tests de cas spéciaux
  it('should handle get with special id', async () => { ... });
  it('should handle create with full data', async () => { ... });
  it('should handle create with minimal data', async () => { ... });
  it('should handle update with partial data', async () => { ... });

  // Tests d'asynchrone
  it('should handle get is async', async () => { ... });
  it('should handle list is async', async () => { ... });

  // Tests de workflow
  it('should handle get then update', async () => { ... });
  it('should handle create then delete', async () => { ... });
  it('should handle list after create', async () => { ... });
});
```

## Exemple complet : int-engine.test.ts

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IntEngineService } from '@/features/intelligence/services/int-engine.service';

const mockSupabase = { /* ... */ } as any;

describe('IntEngineService', () => {
  let service: IntEngineService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new IntEngineService(mockSupabase);
  });

  it('should create service instance', () => {
    expect(service).toBeDefined();
  });

  it('should get engine by id', async () => {
    const result = await service.getEngine('school-1', 'test-id');
    expect(result).toBeDefined();
  });

  it('should list engines', async () => {
    const result = await service.listEngines('school-1');
    expect(result).toBeDefined();
  });

  it('should create engine', async () => {
    const result = await service.createEngine('school-1', { name: 'Test' } as any);
    expect(result).toBeDefined();
  });

  it('should handle concurrency', async () => {
    const results = await Promise.all([
      service.listEngines('school-1'),
      service.listEngines('school-1'),
      service.listEngines('school-1'),
    ]);
    expect(results).toHaveLength(3);
  });

  it('should handle get then update', async () => {
    const item = await service.getEngine('school-1', 'test-id');
    expect(item).toBeDefined();
    const updated = await service.updateEngine('school-1', 'test-id', { name: 'Updated' } as any);
    expect(updated).toBeDefined();
  });
});
```

## Configuration Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
```

## Couverture par service

| Catégorie | Services | Tests estimés |
|-----------|----------|---------------|
| Moteur & Sources | 2 | 60 |
| Pipeline & Modèles | 2 | 60 |
| Scores & Alertes | 2 | 60 |
| Recommandations & Dashboards | 4 | 120 |
| Insights & Actions | 2 | 60 |
| Analyse prédictive | 5 | 150 |
| NLP & Connaissances | 6 | 180 |
| Analytics & Reporting | 4 | 120 |
| Intégration & Infrastructure | 5 | 150 |
| **Total** | **32** | **960** |

## Exécution des tests

```bash
# Tous les tests Intelligence
npx vitest run tests/phase3-1-intelligence/

# Un fichier spécifique
npx vitest run tests/phase3-1-intelligence/int-engine.test.ts

# Mode watch
npx vitest watch tests/phase3-1-intelligence/

# Couverture
npx vitest run --coverage tests/phase3-1-intelligence/
```

## Tests d'intégration

Les tests d'intégration supplémentaires se trouvent dans :
- `tests/api/` — Tests des routes API
- `tests/platform.integration.test.ts` — Tests d'intégration plateforme
