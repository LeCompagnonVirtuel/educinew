# API Routes — Phase 3.1 Intelligence

## Structure

Toutes les routes API se trouvent sous `src/app/api/intelligence/`.

Chaque entité dispose de :
- `route.ts` — GET (list) + POST (create)
- `[id]/route.ts` — GET (by id) + PUT (update) + DELETE

## Routes (32 entités × 2 fichiers = 64 fichiers route)

### Moteur & Sources

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/engines` | GET | Lister les moteurs | `IntEngineService.listEngines` |
| `POST /api/intelligence/engines` | POST | Créer un moteur | `IntEngineService.createEngine` |
| `GET /api/intelligence/engines/[id]` | GET | Détail d'un moteur | `IntEngineService.getEngine` |
| `PUT /api/intelligence/engines/[id]` | PUT | Modifier un moteur | `IntEngineService.updateEngine` |
| `DELETE /api/intelligence/engines/[id]` | DELETE | Supprimer un moteur | `IntEngineService.deleteEngine` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/data-sources` | GET | Lister les sources | `IntDataSourceService.listDataSources` |
| `POST /api/intelligence/data-sources` | POST | Créer une source | `IntDataSourceService.createDataSource` |
| `GET /api/intelligence/data-sources/[id]` | GET | Détail d'une source | `IntDataSourceService.getDataSource` |
| `PUT /api/intelligence/data-sources/[id]` | PUT | Modifier une source | `IntDataSourceService.updateDataSource` |
| `DELETE /api/intelligence/data-sources/[id]` | DELETE | Supprimer une source | `IntDataSourceService.deleteDataSource` |

### Pipelines & Modèles

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/pipelines` | GET | Lister les pipelines | `IntPipelineService.listPipelines` |
| `POST /api/intelligence/pipelines` | POST | Créer un pipeline | `IntPipelineService.createPipeline` |
| `GET /api/intelligence/pipelines/[id]` | GET | Détail d'un pipeline | `IntPipelineService.getPipeline` |
| `PUT /api/intelligence/pipelines/[id]` | PUT | Modifier un pipeline | `IntPipelineService.updatePipeline` |
| `DELETE /api/intelligence/pipelines/[id]` | DELETE | Supprimer un pipeline | `IntPipelineService.deletePipeline` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/models` | GET | Lister les modèles | `IntModelService.listModels` |
| `POST /api/intelligence/models` | POST | Créer un modèle | `IntModelService.createModel` |
| `GET /api/intelligence/models/[id]` | GET | Détail d'un modèle | `IntModelService.getModel` |
| `PUT /api/intelligence/models/[id]` | PUT | Modifier un modèle | `IntModelService.updateModel` |
| `DELETE /api/intelligence/models/[id]` | DELETE | Supprimer un modèle | `IntModelService.deleteModel` |

### Scores & Alertes

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/scores` | GET | Lister les scores | `IntScoreService.listScores` |
| `POST /api/intelligence/scores` | POST | Créer un score | `IntScoreService.createScore` |
| `GET /api/intelligence/scores/[id]` | GET | Détail d'un score | `IntScoreService.getScore` |
| `PUT /api/intelligence/scores/[id]` | PUT | Modifier un score | `IntScoreService.updateScore` |
| `DELETE /api/intelligence/scores/[id]` | DELETE | Supprimer un score | `IntScoreService.deleteScore` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/alerts` | GET | Lister les alertes | `IntAlertService.listAlerts` |
| `POST /api/intelligence/alerts` | POST | Créer une alerte | `IntAlertService.createAlert` |
| `GET /api/intelligence/alerts/[id]` | GET | Détail d'une alerte | `IntAlertService.getAlert` |
| `PUT /api/intelligence/alerts/[id]` | PUT | Modifier une alerte | `IntAlertService.updateAlert` |
| `DELETE /api/intelligence/alerts/[id]` | DELETE | Supprimer une alerte | `IntAlertService.deleteAlert` |

### Recommandations & Dashboards

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/recommendations` | GET | Lister les recommandations | `IntRecommendationService.listRecommendations` |
| `POST /api/intelligence/recommendations` | POST | Créer une recommandation | `IntRecommendationService.createRecommendation` |
| `GET /api/intelligence/recommendations/[id]` | GET | Détail d'une recommandation | `IntRecommendationService.getRecommendation` |
| `PUT /api/intelligence/recommendations/[id]` | PUT | Modifier une recommandation | `IntRecommendationService.updateRecommendation` |
| `DELETE /api/intelligence/recommendations/[id]` | DELETE | Supprimer une recommandation | `IntRecommendationService.deleteRecommendation` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/dashboards` | GET | Lister les dashboards | `IntDashboardService.listDashboards` |
| `POST /api/intelligence/dashboards` | POST | Créer un dashboard | `IntDashboardService.createDashboard` |
| `GET /api/intelligence/dashboards/[id]` | GET | Détail d'un dashboard | `IntDashboardService.getDashboard` |
| `PUT /api/intelligence/dashboards/[id]` | PUT | Modifier un dashboard | `IntDashboardService.updateDashboard` |
| `DELETE /api/intelligence/dashboards/[id]` | DELETE | Supprimer un dashboard | `IntDashboardService.deleteDashboard` |

### Widgets & KPIs

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/widgets` | GET | Lister les widgets | `IntWidgetService.listWidgets` |
| `POST /api/intelligence/widgets` | POST | Créer un widget | `IntWidgetService.createWidget` |
| `GET /api/intelligence/widgets/[id]` | GET | Détail d'un widget | `IntWidgetService.getWidget` |
| `PUT /api/intelligence/widgets/[id]` | PUT | Modifier un widget | `IntWidgetService.updateWidget` |
| `DELETE /api/intelligence/widgets/[id]` | DELETE | Supprimer un widget | `IntWidgetService.deleteWidget` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/kpis` | GET | Lister les KPIs | `IntKPIService.listKPIs` |
| `POST /api/intelligence/kpis` | POST | Créer un KPI | `IntKPIService.createKPI` |
| `GET /api/intelligence/kpis/[id]` | GET | Détail d'un KPI | `IntKPIService.getKPI` |
| `PUT /api/intelligence/kpis/[id]` | PUT | Modifier un KPI | `IntKPIService.updateKPI` |
| `DELETE /api/intelligence/kpis/[id]` | DELETE | Supprimer un KPI | `IntKPIService.deleteKPI` |

### Insights & Actions

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/insights` | GET | Lister les insights | `IntInsightService.listInsights` |
| `POST /api/intelligence/insights` | POST | Créer un insight | `IntInsightService.createInsight` |
| `GET /api/intelligence/insights/[id]` | GET | Détail d'un insight | `IntInsightService.getInsight` |
| `PUT /api/intelligence/insights/[id]` | PUT | Modifier un insight | `IntInsightService.updateInsight` |
| `DELETE /api/intelligence/insights/[id]` | DELETE | Supprimer un insight | `IntInsightService.deleteInsight` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/actions` | GET | Lister les actions | `IntActionService.listActions` |
| `POST /api/intelligence/actions` | POST | Créer une action | `IntActionService.createAction` |
| `GET /api/intelligence/actions/[id]` | GET | Détail d'une action | `IntActionService.getAction` |
| `PUT /api/intelligence/actions/[id]` | PUT | Modifier une action | `IntActionService.updateAction` |
| `DELETE /api/intelligence/actions/[id]` | DELETE | Supprimer une action | `IntActionService.deleteAction` |

### Analyse prédictive

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/predictive-models` | GET | Lister les modèles prédictifs | `IntPredictiveModelService.listPredictiveModels` |
| `POST /api/intelligence/predictive-models` | POST | Créer un modèle prédictif | `IntPredictiveModelService.createPredictiveModel` |
| `GET /api/intelligence/predictive-models/[id]` | GET | Détail d'un modèle prédictif | `IntPredictiveModelService.getPredictiveModel` |
| `PUT /api/intelligence/predictive-models/[id]` | PUT | Modifier un modèle prédictif | `IntPredictiveModelService.updatePredictiveModel` |
| `DELETE /api/intelligence/predictive-models/[id]` | DELETE | Supprimer un modèle prédictif | `IntPredictiveModelService.deletePredictiveModel` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/student-risks` | GET | Lister les évaluations de risque | `IntStudentRiskService.listStudentRiskAssessments` |
| `POST /api/intelligence/student-risks` | POST | Créer une évaluation de risque | `IntStudentRiskService.createStudentRiskAssessment` |
| `GET /api/intelligence/student-risks/[id]` | GET | Détail d'une évaluation | `IntStudentRiskService.getStudentRiskAssessment` |
| `PUT /api/intelligence/student-risks/[id]` | PUT | Modifier une évaluation | `IntStudentRiskService.updateStudentRiskAssessment` |
| `DELETE /api/intelligence/student-risks/[id]` | DELETE | Supprimer une évaluation | `IntStudentRiskService.deleteStudentRiskAssessment` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/early-warnings` | GET | Lister les alertes précoces | `IntEarlyWarningService.listEarlyWarnings` |
| `POST /api/intelligence/early-warnings` | POST | Créer une alerte précoce | `IntEarlyWarningService.createEarlyWarning` |
| `GET /api/intelligence/early-warnings/[id]` | GET | Détail d'une alerte précoce | `IntEarlyWarningService.getEarlyWarning` |
| `PUT /api/intelligence/early-warnings/[id]` | PUT | Modifier une alerte précoce | `IntEarlyWarningService.updateEarlyWarning` |
| `DELETE /api/intelligence/early-warnings/[id]` | DELETE | Supprimer une alerte précoce | `IntEarlyWarningService.deleteEarlyWarning` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/student-outlooks` | GET | Lister les perspectives | `IntStudentOutlookService.listStudentOutlooks` |
| `POST /api/intelligence/student-outlooks` | POST | Créer une perspective | `IntStudentOutlookService.createStudentOutlook` |
| `GET /api/intelligence/student-outlooks/[id]` | GET | Détail d'une perspective | `IntStudentOutlookService.getStudentOutlook` |
| `PUT /api/intelligence/student-outlooks/[id]` | PUT | Modifier une perspective | `IntStudentOutlookService.updateStudentOutlook` |
| `DELETE /api/intelligence/student-outlooks/[id]` | DELETE | Supprimer une perspective | `IntStudentOutlookService.deleteStudentOutlook` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/scenarios` | GET | Lister les scénarios | `IntScenarioService.listScenarios` |
| `POST /api/intelligence/scenarios` | POST | Créer un scénario | `IntScenarioService.createScenario` |
| `GET /api/intelligence/scenarios/[id]` | GET | Détail d'un scénario | `IntScenarioService.getScenario` |
| `PUT /api/intelligence/scenarios/[id]` | PUT | Modifier un scénario | `IntScenarioService.updateScenario` |
| `DELETE /api/intelligence/scenarios/[id]` | DELETE | Supprimer un scénario | `IntScenarioService.deleteScenario` |

### NLP & Connaissances

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/knowledge-base` | GET | Lister les articles | `IntKnowledgeBaseService.listKnowledgeBaseArticles` |
| `POST /api/intelligence/knowledge-base` | POST | Créer un article | `IntKnowledgeBaseService.createKnowledgeBaseArticle` |
| `GET /api/intelligence/knowledge-base/[id]` | GET | Détail d'un article | `IntKnowledgeBaseService.getKnowledgeBaseArticle` |
| `PUT /api/intelligence/knowledge-base/[id]` | PUT | Modifier un article | `IntKnowledgeBaseService.updateKnowledgeBaseArticle` |
| `DELETE /api/intelligence/knowledge-base/[id]` | DELETE | Supprimer un article | `IntKnowledgeBaseService.deleteKnowledgeBaseArticle` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/nlp-tasks` | GET | Lister les tâches NLP | `IntNLPTaskService.listNLPTasks` |
| `POST /api/intelligence/nlp-tasks` | POST | Créer une tâche NLP | `IntNLPTaskService.createNLPTask` |
| `GET /api/intelligence/nlp-tasks/[id]` | GET | Détail d'une tâche NLP | `IntNLPTaskService.getNLPTask` |
| `PUT /api/intelligence/nlp-tasks/[id]` | PUT | Modifier une tâche NLP | `IntNLPTaskService.updateNLPTask` |
| `DELETE /api/intelligence/nlp-tasks/[id]` | DELETE | Supprimer une tâche NLP | `IntNLPTaskService.deleteNLPTask` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/sentiment-analyses` | GET | Lister les analyses de sentiment | `IntSentimentService.listSentimentAnalyses` |
| `POST /api/intelligence/sentiment-analyses` | POST | Créer une analyse de sentiment | `IntSentimentService.createSentimentAnalysis` |
| `GET /api/intelligence/sentiment-analyses/[id]` | GET | Détail d'une analyse | `IntSentimentService.getSentimentAnalysis` |
| `PUT /api/intelligence/sentiment-analyses/[id]` | PUT | Modifier une analyse | `IntSentimentService.updateSentimentAnalysis` |
| `DELETE /api/intelligence/sentiment-analyses/[id]` | DELETE | Supprimer une analyse | `IntSentimentService.deleteSentimentAnalysis` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/classifications` | GET | Lister les classifications | `IntClassificationService.listAutoClassifications` |
| `POST /api/intelligence/classifications` | POST | Créer une classification | `IntClassificationService.createAutoClassification` |
| `GET /api/intelligence/classifications/[id]` | GET | Détail d'une classification | `IntClassificationService.getAutoClassification` |
| `PUT /api/intelligence/classifications/[id]` | PUT | Modifier une classification | `IntClassificationService.updateAutoClassification` |
| `DELETE /api/intelligence/classifications/[id]` | DELETE | Supprimer une classification | `IntClassificationService.deleteAutoClassification` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/summarizations` | GET | Lister les résumés | `IntSummarizationService.listTextSummarizations` |
| `POST /api/intelligence/summarizations` | POST | Créer un résumé | `IntSummarizationService.createTextSummarization` |
| `GET /api/intelligence/summarizations/[id]` | GET | Détail d'un résumé | `IntSummarizationService.getTextSummarization` |
| `PUT /api/intelligence/summarizations/[id]` | PUT | Modifier un résumé | `IntSummarizationService.updateTextSummarization` |
| `DELETE /api/intelligence/summarizations/[id]` | DELETE | Supprimer un résumé | `IntSummarizationService.deleteTextSummarization` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/document-analyses` | GET | Lister les analyses de documents | `IntDocumentAnalysisService.listDocumentAnalyses` |
| `POST /api/intelligence/document-analyses` | POST | Créer une analyse de document | `IntDocumentAnalysisService.createDocumentAnalysis` |
| `GET /api/intelligence/document-analyses/[id]` | GET | Détail d'une analyse | `IntDocumentAnalysisService.getDocumentAnalysis` |
| `PUT /api/intelligence/document-analyses/[id]` | PUT | Modifier une analyse | `IntDocumentAnalysisService.updateDocumentAnalysis` |
| `DELETE /api/intelligence/document-analyses/[id]` | DELETE | Supprimer une analyse | `IntDocumentAnalysisService.deleteDocumentAnalysis` |

### Analytics & Reporting

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/benchmarks` | GET | Lister les benchmarks | `IntBenchmarkService.listBenchmarks` |
| `POST /api/intelligence/benchmarks` | POST | Créer un benchmark | `IntBenchmarkService.createBenchmark` |
| `GET /api/intelligence/benchmarks/[id]` | GET | Détail d'un benchmark | `IntBenchmarkService.getBenchmark` |
| `PUT /api/intelligence/benchmarks/[id]` | PUT | Modifier un benchmark | `IntBenchmarkService.updateBenchmark` |
| `DELETE /api/intelligence/benchmarks/[id]` | DELETE | Supprimer un benchmark | `IntBenchmarkService.deleteBenchmark` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/ai-insights` | GET | Lister les insights IA | `IntAIInsightService.listAIInsights` |
| `POST /api/intelligence/ai-insights` | POST | Créer un insight IA | `IntAIInsightService.createAIInsight` |
| `GET /api/intelligence/ai-insights/[id]` | GET | Détail d'un insight IA | `IntAIInsightService.getAIInsight` |
| `PUT /api/intelligence/ai-insights/[id]` | PUT | Modifier un insight IA | `IntAIInsightService.updateAIInsight` |
| `DELETE /api/intelligence/ai-insights/[id]` | DELETE | Supprimer un insight IA | `IntAIInsightService.deleteAIInsight` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/analytics-reports` | GET | Lister les rapports | `IntAnalyticsReportService.listAnalyticsReports` |
| `POST /api/intelligence/analytics-reports` | POST | Créer un rapport | `IntAnalyticsReportService.createAnalyticsReport` |
| `GET /api/intelligence/analytics-reports/[id]` | GET | Détail d'un rapport | `IntAnalyticsReportService.getAnalyticsReport` |
| `PUT /api/intelligence/analytics-reports/[id]` | PUT | Modifier un rapport | `IntAnalyticsReportService.updateAnalyticsReport` |
| `DELETE /api/intelligence/analytics-reports/[id]` | DELETE | Supprimer un rapport | `IntAnalyticsReportService.deleteAnalyticsReport` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/visualizations` | GET | Lister les visualisations | `IntVisualizationService.listVisualizations` |
| `POST /api/intelligence/visualizations` | POST | Créer une visualisation | `IntVisualizationService.createVisualization` |
| `GET /api/intelligence/visualizations/[id]` | GET | Détail d'une visualisation | `IntVisualizationService.getVisualization` |
| `PUT /api/intelligence/visualizations/[id]` | PUT | Modifier une visualisation | `IntVisualizationService.updateVisualization` |
| `DELETE /api/intelligence/visualizations/[id]` | DELETE | Supprimer une visualisation | `IntVisualizationService.deleteVisualization` |

### Intégration & Infrastructure

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/connectors` | GET | Lister les connecteurs | `IntConnectorService.listConnectors` |
| `POST /api/intelligence/connectors` | POST | Créer un connecteur | `IntConnectorService.createConnector` |
| `GET /api/intelligence/connectors/[id]` | GET | Détail d'un connecteur | `IntConnectorService.getConnector` |
| `PUT /api/intelligence/connectors/[id]` | PUT | Modifier un connecteur | `IntConnectorService.updateConnector` |
| `DELETE /api/intelligence/connectors/[id]` | DELETE | Supprimer un connecteur | `IntConnectorService.deleteConnector` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/data-syncs` | GET | Lister les synchronisations | `IntDataSyncService.listDataSyncs` |
| `POST /api/intelligence/data-syncs` | POST | Créer une synchronisation | `IntDataSyncService.createDataSync` |
| `GET /api/intelligence/data-syncs/[id]` | GET | Détail d'une synchronisation | `IntDataSyncService.getDataSync` |
| `PUT /api/intelligence/data-syncs/[id]` | PUT | Modifier une synchronisation | `IntDataSyncService.updateDataSync` |
| `DELETE /api/intelligence/data-syncs/[id]` | DELETE | Supprimer une synchronisation | `IntDataSyncService.deleteDataSync` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/apis` | GET | Lister les APIs | `IntAPIService.listAPIs` |
| `POST /api/intelligence/apis` | POST | Créer une API | `IntAPIService.createAPI` |
| `GET /api/intelligence/apis/[id]` | GET | Détail d'une API | `IntAPIService.getAPI` |
| `PUT /api/intelligence/apis/[id]` | PUT | Modifier une API | `IntAPIService.updateAPI` |
| `DELETE /api/intelligence/apis/[id]` | DELETE | Supprimer une API | `IntAPIService.deleteAPI` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/security` | GET | Lister les règles sécurité | `IntSecurityService.listSecurities` |
| `POST /api/intelligence/security` | POST | Créer une règle sécurité | `IntSecurityService.createSecurity` |
| `GET /api/intelligence/security/[id]` | GET | Détail d'une règle sécurité | `IntSecurityService.getSecurity` |
| `PUT /api/intelligence/security/[id]` | PUT | Modifier une règle sécurité | `IntSecurityService.updateSecurity` |
| `DELETE /api/intelligence/security/[id]` | DELETE | Supprimer une règle sécurité | `IntSecurityService.deleteSecurity` |

| Route | Méthode | Description | Service |
|-------|---------|-------------|---------|
| `GET /api/intelligence/monitoring` | GET | Lister les métriques monitoring | `IntMonitoringService.listMonitorings` |
| `POST /api/intelligence/monitoring` | POST | Créer une métrique monitoring | `IntMonitoringService.createMonitoring` |
| `GET /api/intelligence/monitoring/[id]` | GET | Détail d'une métrique monitoring | `IntMonitoringService.getMonitoring` |
| `PUT /api/intelligence/monitoring/[id]` | PUT | Modifier une métrique monitoring | `IntMonitoringService.updateMonitoring` |
| `DELETE /api/intelligence/monitoring/[id]` | DELETE | Supprimer une métrique monitoring | `IntMonitoringService.deleteMonitoring` |

## Pattern de réponse

```json
// Succès (GET list)
{ "data": [...] }

// Succès (GET by id)
{ "data": { ... } }

// Succès (POST/PUT)
{ "data": { ... } }

// Erreur
{ "error": "Message d'erreur" }
```

## Paramètres query (GET list)

| Paramètre | Type | Description |
|-----------|------|-------------|
| `schoolId` | UUID | **Obligatoire** — ID de l'école |
| `page` | number | Numéro de page (défaut: 1) |
| `limit` | number | Éléments par page (défaut: 20, max: 100) |
| `sort` | string | Champ de tri |
| `order` | `asc` \| `desc` | Ordre de tri |

## Authentication

Toutes les routes utilisent `SUPABASE_SERVICE_ROLE_KEY` pour l'accès service-to-service. L'authentification utilisateur est gérée par le middleware Next.js.
