# Hooks React — Phase 3.1 Intelligence

## Vue d'ensemble

La couche hooks contient 64 hooks React situés dans `src/features/intelligence/hooks/`. Pour chaque entité, il existe deux hooks :
- **List hook** — Récupère et gère la liste des éléments
- **Actions hook** — Gère les opérations CRUD (create, update, remove)

## Architecture des hooks

### Hook List (lecture seule)

```typescript
'use client';
import { useState, useEffect, useCallback } from 'react';

export const useInt{Entity}List = (schoolId: string) => {
  const [items, setItems] = useState<{EntityType}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new Int{Entity}Service(supabase);
      const data = await service.list{Entities}(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
```

### Hook Actions (écriture)

```typescript
'use client';
import { useState, useCallback } from 'react';

export const useInt{Entity}Actions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: {EntityType}Create): Promise<{EntityType} | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new Int{Entity}Service(supabase);
      return await service.create{Entity}(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<{EntityType}Create>): Promise<{EntityType} | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new Int{Entity}Service(supabase);
      return await service.update{Entity}(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new Int{Entity}Service(supabase);
      await service.delete{Entity}(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
```

## Liste des 64 hooks

### Moteur & Sources

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntEngineList` | `use-int-engine-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntEngineActions` | `use-int-engine-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntDataSourceList` | `use-int-data-source-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntDataSourceActions` | `use-int-data-source-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Pipeline & Modèles

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntPipelineList` | `use-int-pipeline-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntPipelineActions` | `use-int-pipeline-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntModelList` | `use-int-model-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntModelActions` | `use-int-model-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Scores & Alertes

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntScoreList` | `use-int-score-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntScoreActions` | `use-int-score-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntAlertList` | `use-int-alert-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntAlertActions` | `use-int-alert-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Recommandations & Dashboards

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntRecommendationList` | `use-int-recommendation-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntRecommendationActions` | `use-int-recommendation-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntDashboardList` | `use-int-dashboard-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntDashboardActions` | `use-int-dashboard-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntWidgetList` | `use-int-widget-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntWidgetActions` | `use-int-widget-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntKPIList` | `use-int-kpi-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntKPIActions` | `use-int-kpi-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Insights & Actions

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntInsightList` | `use-int-insight-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntInsightActions` | `use-int-insight-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntActionList` | `use-int-action-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntActionActions` | `use-int-action-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Analyse prédictive

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntPredictiveModelList` | `use-int-predictive-model-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntPredictiveModelActions` | `use-int-predictive-model-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntStudentRiskList` | `use-int-student-risk-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntStudentRiskActions` | `use-int-student-risk-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntEarlyWarningList` | `use-int-early-warning-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntEarlyWarningActions` | `use-int-early-warning-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntStudentOutlookList` | `use-int-student-outlook-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntStudentOutlookActions` | `use-int-student-outlook-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntScenarioList` | `use-int-scenario-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntScenarioActions` | `use-int-scenario-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### NLP & Connaissances

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntKnowledgeBaseList` | `use-int-knowledge-base-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntKnowledgeBaseActions` | `use-int-knowledge-base-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntNLPTaskList` | `use-int-nlp-task-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntNLPTaskActions` | `use-int-nlp-task-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntSentimentList` | `use-int-sentiment-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntSentimentActions` | `use-int-sentiment-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntClassificationList` | `use-int-classification-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntClassificationActions` | `use-int-classification-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntSummarizationList` | `use-int-summarization-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntSummarizationActions` | `use-int-summarization-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntDocumentAnalysisList` | `use-int-document-analysis-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntDocumentAnalysisActions` | `use-int-document-analysis-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Analytics & Reporting

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntBenchmarkList` | `use-int-benchmark-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntBenchmarkActions` | `use-int-benchmark-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntAIInsightList` | `use-int-ai-insight-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntAIInsightActions` | `use-int-ai-insight-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntAnalyticsReportList` | `use-int-analytics-report-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntAnalyticsReportActions` | `use-int-analytics-report-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntVisualizationList` | `use-int-visualization-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntVisualizationActions` | `use-int-visualization-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

### Intégration & Infrastructure

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntConnectorList` | `use-int-connector-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntConnectorActions` | `use-int-connector-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntDataSyncList` | `use-int-data-sync-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntDataSyncActions` | `use-int-data-sync-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntAPIList` | `use-int-api-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntAPIActions` | `use-int-api-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntSecurityList` | `use-int-security-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntSecurityActions` | `use-int-security-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

| Hook | Fichier | Type | Retour |
|------|---------|------|--------|
| `useIntMonitoringList` | `use-int-monitoring-list.ts` | List | `{ items, loading, error, refresh }` |
| `useIntMonitoringActions` | `use-int-monitoring-actions.ts` | Actions | `{ loading, error, create, update, remove }` |

## Utilisation dans les composants

```tsx
'use client';
import { useIntEngineList } from '@/features/intelligence/hooks/use-int-engine-list';
import { useIntEngineActions } from '@/features/intelligence/hooks/use-int-engine-actions';

export function IntelligenceDashboard({ schoolId }: { schoolId: string }) {
  const { items: engines, loading, error, refresh } = useIntEngineList(schoolId);
  const { create, update, remove } = useIntEngineActions(schoolId);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Moteurs d'intelligence ({engines.length})</h1>
      {engines.map(engine => (
        <div key={engine.id}>{engine.name}</div>
      ))}
      <button onClick={() => create({ name: 'Nouveau moteur' })}>
        Ajouter
      </button>
    </div>
  );
}
```

## Notes techniques

- Tous les hooks sont marqués `'use client'` (Client Components)
- Utilisation de `useCallback` pour la stabilité des références
- Utilisation de `useEffect` pour le fetch initial automatique
- Gestion d'erreur en français ('Erreur inconnue')
- Création du client Supabase via `createClient()` côté client
