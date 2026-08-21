# Phase 3.1 — Education Intelligence Platform

## Aperçu

La plateforme d'Intelligence Éducative (Phase 3.1) constitue le cerveau décisionnel de l'écosystème EduCI. Elle agrège les données de toutes les phases précédentes pour fournir des analyses prédictives, des recommandations IA, et des tableaux de bord exécutifs destinés aux décideurs éducatifs.

## Architecture

```
src/features/intelligence/
├── types.ts                    # Réexportation des types depuis @educi/types
├── repositories/
│   └── intelligence.repository.ts  # IntelligenceRepositoryImpl (160+ méthodes CRUD)
├── services/                   # 32 services métier
│   ├── int-engine.service.ts
│   ├── int-data-source.service.ts
│   ├── int-pipeline.service.ts
│   ├── int-model.service.ts
│   ├── int-score.service.ts
│   ├── int-alert.service.ts
│   ├── int-recommendation.service.ts
│   ├── int-dashboard.service.ts
│   ├── int-widget.service.ts
│   ├── int-kpi.service.ts
│   ├── int-insight.service.ts
│   ├── int-action.service.ts
│   ├── int-predictive-model.service.ts
│   ├── int-student-risk.service.ts
│   ├── int-early-warning.service.ts
│   ├── int-student-outlook.service.ts
│   ├── int-scenario.service.ts
│   ├── int-knowledge-base.service.ts
│   ├── int-nlp-task.service.ts
│   ├── int-sentiment.service.ts
│   ├── int-classification.service.ts
│   ├── int-summarization.service.ts
│   ├── int-document-analysis.service.ts
│   ├── int-benchmark.service.ts
│   ├── int-ai-insight.service.ts
│   ├── int-analytics-report.service.ts
│   ├── int-visualization.service.ts
│   ├── int-connector.service.ts
│   ├── int-data-sync.service.ts
│   ├── int-api.service.ts
│   ├── int-security.service.ts
│   └── int-monitoring.service.ts
├── hooks/                      # 64 hooks (list + actions × 32 entités)
│   ├── use-int-engine-list.ts
│   ├── use-int-engine-actions.ts
│   └── ...
├── validators/                 # 3 fichiers Zod
│   ├── intelligence-core.ts
│   ├── intelligence-knowledge.ts
│   └── intelligence-predictive.ts
```

## Entités (32 entités)

| Catégorie | Entité | Table Supabase |
|-----------|--------|----------------|
| **Moteur** | IntelligenceEngine | `intelligence_engines` |
| **Sources** | DataSource | `intelligence_data_sources` |
| **Pipeline** | IntelligencePipeline | `intelligence_pipelines` |
| **Modèle** | AIModel | `intelligence_models` |
| **Score** | IntelligenceScore | `intelligence_scores` |
| **Alerte** | AIAlert | `intelligence_alerts` |
| **Recommandation** | Recommendation | `intelligence_recommendations` |
| **Tableau de bord** | IntelligenceDashboard | `intelligence_dashboards` |
| **Widget** | IntelligenceWidget | `intelligence_widgets` |
| **KPI** | IntelligenceKPI | `intelligence_kpis` |
| **Insight** | IntelligenceInsight | `intelligence_insights` |
| **Action** | IntelligenceAction | `intelligence_actions` |
| **Modèle prédictif** | PredictiveModel | `intelligence_predictive_models` |
| **Risque étudiant** | StudentRiskAssessment | `intelligence_student_risk` |
| **Alerte précoce** | EarlyWarning | `intelligence_early_warnings` |
| **Perspective étudiant** | StudentOutlook | `intelligence_student_outlooks` |
| **Scénario** | Scenario | `intelligence_scenarios` |
| **Base de connaissances** | KnowledgeBaseArticle | `intelligence_knowledge_base` |
| **Tâche NLP** | NLPTask | `intelligence_nlp_tasks` |
| **Analyse sentiment** | SentimentAnalysis | `intelligence_sentiment_analyses` |
| **Classification auto** | AutoClassification | `intelligence_auto_classifications` |
| **Résumé texte** | TextSummarization | `intelligence_text_summarizations` |
| **Analyse document** | DocumentAnalysis | `intelligence_document_analyses` |
| **Benchmark** | Benchmark | `intelligence_benchmarks` |
| **Insight IA** | AIInsight | `intelligence_ai_insights` |
| **Rapport analytics** | AnalyticsReport | `intelligence_analytics_reports` |
| **Visualisation** | Visualization | `intelligence_visualizations` |
| **Connecteur** | IntelligenceConnector | `intelligence_connectors` |
| **Sync données** | IntelligenceDataSync | `intelligence_data_syncs` |
| **API** | IntelligenceAPI | `intelligence_apis` |
| **Sécurité** | IntelligenceSecurity | `intelligence_security` |
| **Monitoring** | IntelligenceMonitoring | `intelligence_monitoring` |

## Fonctionnalités

### Moteur d'intelligence
- Agrégation multi-sources (académique, présence, finances, RH, LXP, smart campus, etc.)
- Configuration flexible par école
- Pipeline ETL/Stream/Batch/Real-time

### Analyse prédictive
- Prédiction de réussite/échec académique
- Détection de risque d'abandon
- Prédiction d'absentéisme
- Détection de fraude
- Prévisions financières et d'inscription

### NLP & Connaissances
- Analyse de sentiment (FR/EN)
- Classification automatique des requêtes
- Résumé de texte (5 types)
- Analyse de documents (OCR, extraction, entités)
- Base de connaissances RAG

### Décisionnel
- Tableaux de bord exécutifs par rôle
- KPIs intelligents avec tendances
- Recommandations avec impact/coût
- Scénarios de simulation
- Alertes et avertissements précoces

## Dépendances

- `@educi/types` — Types partagés (~50 enums, ~221 interfaces)
- `@educi/errors` — Hiérarchie d'erreurs (410 classes Int*Error)
- Supabase — Base de données et authentification
- Zod — Validation des schémas
- Next.js — API routes et React Server Components
