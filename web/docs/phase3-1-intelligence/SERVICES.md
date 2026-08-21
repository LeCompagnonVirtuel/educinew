# Services — Phase 3.1 Intelligence

## Vue d'ensemble

La couche service contient 32 services métier situés dans `src/features/intelligence/services/`. Chaque service encapsule la logique métier pour une entité et interagit avec le repository pour les opérations CRUD.

## Architecture des services

```typescript
// Pattern standard de chaque service
export class Int{Entity}Service {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }

  async get{Entity}(schoolId: string, id: string): Promise<{EntityType}> {
    const item = await this.repo.get{Entity}(id, schoolId);
    if (!item) throw new Int{Entity}NotFoundError(id);
    return item;
  }

  async list{Entities}(schoolId: string, filters?: Record<string, unknown>): Promise<{EntityType}[]> {
    return this.repo.list{Entities}(schoolId, filters);
  }

  async create{Entity}(schoolId: string, data: {EntityType}Create): Promise<{EntityType}> {
    return this.repo.create{Entity}({ ...data, school_id: schoolId });
  }

  async update{Entity}(schoolId: string, id: string, data: Partial<{EntityType}Create>): Promise<{EntityType}> {
    const existing = await this.repo.get{Entity}(id, schoolId);
    if (!existing) throw new Int{Entity}NotFoundError(id);
    return this.repo.update{Entity}(id, schoolId, data);
  }

  async delete{Entity}(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.get{Entity}(id, schoolId);
    if (!existing) throw new Int{Entity}NotFoundError(id);
    return this.repo.delete{Entity}(id, schoolId);
  }
}
```

## Liste des 32 services

### Moteur & Sources

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntEngineService` | `int-engine.service.ts` | `IntelligenceEngine` | `intelligence_engines` |
| `IntDataSourceService` | `int-data-source.service.ts` | `DataSource` | `intelligence_data_sources` |

### Pipeline & Modèles

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntPipelineService` | `int-pipeline.service.ts` | `IntelligencePipeline` | `intelligence_pipelines` |
| `IntModelService` | `int-model.service.ts` | `AIModel` | `intelligence_models` |

### Scores & Alertes

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntScoreService` | `int-score.service.ts` | `IntelligenceScore` | `intelligence_scores` |
| `IntAlertService` | `int-alert.service.ts` | `AIAlert` | `intelligence_alerts` |

### Recommandations & Dashboards

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntRecommendationService` | `int-recommendation.service.ts` | `Recommendation` | `intelligence_recommendations` |
| `IntDashboardService` | `int-dashboard.service.ts` | `IntelligenceDashboard` | `intelligence_dashboards` |
| `IntWidgetService` | `int-widget.service.ts` | `IntelligenceWidget` | `intelligence_widgets` |
| `IntKPIService` | `int-kpi.service.ts` | `IntelligenceKPI` | `intelligence_kpis` |

### Insights & Actions

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntInsightService` | `int-insight.service.ts` | `IntelligenceInsight` | `intelligence_insights` |
| `IntActionService` | `int-action.service.ts` | `IntelligenceAction` | `intelligence_actions` |

### Analyse prédictive

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntPredictiveModelService` | `int-predictive-model.service.ts` | `PredictiveModel` | `intelligence_predictive_models` |
| `IntStudentRiskService` | `int-student-risk.service.ts` | `StudentRiskAssessment` | `intelligence_student_risk` |
| `IntEarlyWarningService` | `int-early-warning.service.ts` | `EarlyWarning` | `intelligence_early_warnings` |
| `IntStudentOutlookService` | `int-student-outlook.service.ts` | `StudentOutlook` | `intelligence_student_outlooks` |
| `IntScenarioService` | `int-scenario.service.ts` | `Scenario` | `intelligence_scenarios` |

### NLP & Connaissances

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntKnowledgeBaseService` | `int-knowledge-base.service.ts` | `KnowledgeBaseArticle` | `intelligence_knowledge_base` |
| `IntNLPTaskService` | `int-nlp-task.service.ts` | `NLPTask` | `intelligence_nlp_tasks` |
| `IntSentimentService` | `int-sentiment.service.ts` | `SentimentAnalysis` | `intelligence_sentiment_analyses` |
| `IntClassificationService` | `int-classification.service.ts` | `AutoClassification` | `intelligence_auto_classifications` |
| `IntSummarizationService` | `int-summarization.service.ts` | `TextSummarization` | `intelligence_text_summarizations` |
| `IntDocumentAnalysisService` | `int-document-analysis.service.ts` | `DocumentAnalysis` | `intelligence_document_analyses` |

### Analytics & Reporting

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntBenchmarkService` | `int-benchmark.service.ts` | `Benchmark` | `intelligence_benchmarks` |
| `IntAIInsightService` | `int-ai-insight.service.ts` | `AIInsight` | `intelligence_ai_insights` |
| `IntAnalyticsReportService` | `int-analytics-report.service.ts` | `AnalyticsReport` | `intelligence_analytics_reports` |
| `IntVisualizationService` | `int-visualization.service.ts` | `Visualization` | `intelligence_visualizations` |

### Intégration & Infrastructure

| Service | Fichier | Entité | Table |
|---------|---------|--------|-------|
| `IntConnectorService` | `int-connector.service.ts` | `IntelligenceConnector` | `intelligence_connectors` |
| `IntDataSyncService` | `int-data-sync.service.ts` | `IntelligenceDataSync` | `intelligence_data_syncs` |
| `IntAPIService` | `int-api.service.ts` | `IntelligenceAPI` | `intelligence_apis` |
| `IntSecurityService` | `int-security.service.ts` | `IntelligenceSecurity` | `intelligence_security` |
| `IntMonitoringService` | `int-monitoring.service.ts` | `IntelligenceMonitoring` | `intelligence_monitoring` |

## Méthodes par service

Chaque service expose 5 méthodes CRUD :

| Méthode | Description | Erreur si non trouvé |
|---------|-------------|---------------------|
| `get{Entity}(schoolId, id)` | Récupérer un élément par ID | `Int{Entity}NotFoundError` |
| `list{Entities}(schoolId, filters?)` | Lister les éléments avec filtres | Retourne `[]` |
| `create{Entity}(schoolId, data)` | Créer un nouvel élément | — |
| `update{Entity}(schoolId, id, data)` | Modifier un élément existant | `Int{Entity}NotFoundError` |
| `delete{Entity}(schoolId, id)` | Supprimer un élément | `Int{Entity}NotFoundError` |

## Exemple d'utilisation

```typescript
// Dans une API Route
import { IntEngineService } from '@/features/intelligence/services/int-engine.service';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const service = new IntEngineService(supabase);
  const engines = await service.listEngines('school-id-123');
  
  return NextResponse.json({ data: engines });
}
```

## Dépendances

- `@supabase/supabase-js` — Client Supabase
- `@educi/types` — Types TypeScript
- `@educi/errors` — Classes d'erreur
- `../repositories/intelligence.repository` — Repository
