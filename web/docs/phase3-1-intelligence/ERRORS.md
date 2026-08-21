# Hiérarchie d'erreurs — Phase 3.1 Intelligence

## Vue d'ensemble

La phase 3.1 Intelligence définit **410 classes d'erreur** dans `packages/errors/src/phase3-1-intelligence.ts`. Chaque entité dispose de 4 erreurs (Not Found, Create, Update, Delete), soit 32 entités × 4 = 128 classes principales, plus des erreurs supplémentaires pour les sous-entités.

## Structure

```typescript
import { AppError } from './AppError';

export class Int{Entity}{Action}Error extends AppError {
  constructor(identifier?: string) {
    const msg = identifier 
      ? `Message d'erreur (${identifier})` 
      : `Message d'erreur`;
    super(msg, 'INT_{ERROR_CODE}', 404 | 500);
  }
}
```

## Codes d'erreur par entité

### Moteur & Sources

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntEngineNotFoundError` | `INT_ENGINE_NOT_FOUND` | 404 | Moteur introuvable |
| `IntEngineCreateError` | `INT_ENGINE_CREATE_FAILED` | 500 | Erreur de création moteur |
| `IntEngineUpdateError` | `INT_ENGINE_UPDATE_FAILED` | 500 | Erreur de mise à jour moteur |
| `IntEngineDeleteError` | `INT_ENGINE_DELETE_FAILED` | 500 | Erreur de suppression moteur |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntDataSourceNotFoundError` | `INT_DATA_SOURCE_NOT_FOUND` | 404 | Source de données introuvable |
| `IntDataSourceCreateError` | `INT_DATA_SOURCE_CREATE_FAILED` | 500 | Erreur de création source |
| `IntDataSourceUpdateError` | `INT_DATA_SOURCE_UPDATE_FAILED` | 500 | Erreur de mise à jour source |
| `IntDataSourceDeleteError` | `INT_DATA_SOURCE_DELETE_FAILED` | 500 | Erreur de suppression source |

### Scores d'intelligence

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntEducationIntelligenceScoreNotFoundError` | `INT_EDUCATION_INTELLIGENCE_SCORE_NOT_FOUND` | 404 | Score d'intelligence éducative introuvable |
| `IntEducationIntelligenceScoreCreateError` | `INT_EDUCATION_INTELLIGENCE_SCORE_CREATE` | 500 | Erreur de création score |
| `IntEducationIntelligenceScoreUpdateError` | `INT_EDUCATION_INTELLIGENCE_SCORE_UPDATE` | 500 | Erreur de mise à jour score |
| `IntEducationIntelligenceScoreDeleteError` | `INT_EDUCATION_INTELLIGENCE_SCORE_DELETE` | 500 | Erreur de suppression score |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntSchoolHealthScoreNotFoundError` | `INT_SCHOOL_HEALTH_SCORE_NOT_FOUND` | 404 | Score de santé scolaire introuvable |
| `IntSchoolHealthScoreCreateError` | `INT_SCHOOL_HEALTH_SCORE_CREATE` | 500 | Erreur de création score santé |
| `IntSchoolHealthScoreUpdateError` | `INT_SCHOOL_HEALTH_SCORE_UPDATE` | 500 | Erreur de mise à jour score santé |
| `IntSchoolHealthScoreDeleteError` | `INT_SCHOOL_HEALTH_SCORE_DELETE` | 500 | Erreur de suppression score santé |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAcademicHealthIndexNotFoundError` | `INT_ACADEMIC_HEALTH_INDEX_NOT_FOUND` | 404 | Indice de santé académique introuvable |
| `IntAcademicHealthIndexCreateError` | `INT_ACADEMIC_HEALTH_INDEX_CREATE` | 500 | Erreur de création indice santé académique |
| `IntAcademicHealthIndexUpdateError` | `INT_ACADEMIC_HEALTH_INDEX_UPDATE` | 500 | Erreur de mise à jour indice santé académique |
| `IntAcademicHealthIndexDeleteError` | `INT_ACADEMIC_HEALTH_INDEX_DELETE` | 500 | Erreur de suppression indice santé académique |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntFinancialHealthIndexNotFoundError` | `INT_FINANCIAL_HEALTH_INDEX_NOT_FOUND` | 404 | Indice de santé financière introuvable |
| `IntFinancialHealthIndexCreateError` | `INT_FINANCIAL_HEALTH_INDEX_CREATE` | 500 | Erreur de création indice santé financière |
| `IntFinancialHealthIndexUpdateError` | `INT_FINANCIAL_HEALTH_INDEX_UPDATE` | 500 | Erreur de mise à jour indice santé financière |
| `IntFinancialHealthIndexDeleteError` | `INT_FINANCIAL_HEALTH_INDEX_DELETE` | 500 | Erreur de suppression indice santé financière |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntTeacherPerformanceIndexNotFoundError` | `INT_TEACHER_PERFORMANCE_INDEX_NOT_FOUND` | 404 | Indice de performance enseignante introuvable |
| `IntTeacherPerformanceIndexCreateError` | `INT_TEACHER_PERFORMANCE_INDEX_CREATE` | 500 | Erreur de création indice performance |
| `IntTeacherPerformanceIndexUpdateError` | `INT_TEACHER_PERFORMANCE_INDEX_UPDATE` | 500 | Erreur de mise à jour indice performance |
| `IntTeacherPerformanceIndexDeleteError` | `INT_TEACHER_PERFORMANCE_INDEX_DELETE` | 500 | Erreur de suppression indice performance |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntStudentSuccessIndexNotFoundError` | `INT_STUDENT_SUCCESS_INDEX_NOT_FOUND` | 404 | Indice de réussite étudiante introuvable |
| `IntStudentSuccessIndexCreateError` | `INT_STUDENT_SUCCESS_INDEX_CREATE` | 500 | Erreur de création indice réussite |
| `IntStudentSuccessIndexUpdateError` | `INT_STUDENT_SUCCESS_INDEX_UPDATE` | 500 | Erreur de mise à jour indice réussite |
| `IntStudentSuccessIndexDeleteError` | `INT_STUDENT_SUCCESS_INDEX_DELETE` | 500 | Erreur de suppression indice réussite |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntCampusEfficiencyScoreNotFoundError` | `INT_CAMPUS_EFFICIENCY_SCORE_NOT_FOUND` | 404 | Score d'efficacité du campus introuvable |
| `IntCampusEfficiencyScoreCreateError` | `INT_CAMPUS_EFFICIENCY_SCORE_CREATE` | 500 | Erreur de création score efficacité |
| `IntCampusEfficiencyScoreUpdateError` | `INT_CAMPUS_EFFICIENCY_SCORE_UPDATE` | 500 | Erreur de mise à jour score efficacité |
| `IntCampusEfficiencyScoreDeleteError` | `INT_CAMPUS_EFFICIENCY_SCORE_DELETE` | 500 | Erreur de suppression score efficacité |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntRiskScoreNotFoundError` | `INT_RISK_SCORE_NOT_FOUND` | 404 | Score de risque introuvable |
| `IntRiskScoreCreateError` | `INT_RISK_SCORE_CREATE` | 500 | Erreur de création score risque |
| `IntRiskScoreUpdateError` | `INT_RISK_SCORE_UPDATE` | 500 | Erreur de mise à jour score risque |
| `IntRiskScoreDeleteError` | `INT_RISK_SCORE_DELETE` | 500 | Erreur de suppression score risque |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntComplianceScoreNotFoundError` | `INT_COMPLIANCE_SCORE_NOT_FOUND` | 404 | Score de conformité introuvable |
| `IntComplianceScoreCreateError` | `INT_COMPLIANCE_SCORE_CREATE` | 500 | Erreur de création score conformité |
| `IntComplianceScoreUpdateError` | `INT_COMPLIANCE_SCORE_UPDATE` | 500 | Erreur de mise à jour score conformité |
| `IntComplianceScoreDeleteError` | `INT_COMPLIANCE_SCORE_DELETE` | 500 | Erreur de suppression score conformité |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiConfidenceScoreNotFoundError` | `INT_AI_CONFIDENCE_SCORE_NOT_FOUND` | 404 | Score de confiance IA introuvable |
| `IntAiConfidenceScoreCreateError` | `INT_AI_CONFIDENCE_SCORE_CREATE` | 500 | Erreur de création score confiance IA |
| `IntAiConfidenceScoreUpdateError` | `INT_AI_CONFIDENCE_SCORE_UPDATE` | 500 | Erreur de mise à jour score confiance IA |
| `IntAiConfidenceScoreDeleteError` | `INT_AI_CONFIDENCE_SCORE_DELETE` | 500 | Erreur de suppression score confiance IA |

### Dashboards & Alertes

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntExecutiveDashboardNotFoundError` | `INT_EXECUTIVE_DASHBOARD_NOT_FOUND` | 404 | Tableau de bord exécutif introuvable |
| `IntExecutiveDashboardCreateError` | `INT_EXECUTIVE_DASHBOARD_CREATE` | 500 | Erreur de création dashboard |
| `IntExecutiveDashboardUpdateError` | `INT_EXECUTIVE_DASHBOARD_UPDATE` | 500 | Erreur de mise à jour dashboard |
| `IntExecutiveDashboardDeleteError` | `INT_EXECUTIVE_DASHBOARD_DELETE` | 500 | Erreur de suppression dashboard |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiAlertNotFoundError` | `INT_AI_ALERT_NOT_FOUND` | 404 | Alerte IA introuvable |
| `IntAiAlertCreateError` | `INT_AI_ALERT_CREATE` | 500 | Erreur de création alerte IA |
| `IntAiAlertUpdateError` | `INT_AI_ALERT_UPDATE` | 500 | Erreur de mise à jour alerte IA |
| `IntAiAlertDeleteError` | `INT_AI_ALERT_DELETE` | 500 | Erreur de suppression alerte IA |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntIntelligentKpiNotFoundError` | `INT_INTELLIGENT_KPI_NOT_FOUND` | 404 | KPI intelligent introuvable |
| `IntIntelligentKpiCreateError` | `INT_INTELLIGENT_KPI_CREATE` | 500 | Erreur de création KPI |
| `IntIntelligentKpiUpdateError` | `INT_INTELLIGENT_KPI_UPDATE` | 500 | Erreur de mise à jour KPI |
| `IntIntelligentKpiDeleteError` | `INT_INTELLIGENT_KPI_DELETE` | 500 | Erreur de suppression KPI |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiSummaryNotFoundError` | `INT_AI_SUMMARY_NOT_FOUND` | 404 | Résumé IA introuvable |
| `IntAiSummaryCreateError` | `INT_AI_SUMMARY_CREATE` | 500 | Erreur de création résumé IA |
| `IntAiSummaryUpdateError` | `INT_AI_SUMMARY_UPDATE` | 500 | Erreur de mise à jour résumé IA |
| `IntAiSummaryDeleteError` | `INT_AI_SUMMARY_DELETE` | 500 | Erreur de suppression résumé IA |

### Insights & Recommandations

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiInsightNotFoundError` | `INT_AI_INSIGHT_NOT_FOUND` | 404 | Analyse IA introuvable |
| `IntAiInsightCreateError` | `INT_AI_INSIGHT_CREATE` | 500 | Erreur de création analyse IA |
| `IntAiInsightUpdateError` | `INT_AI_INSIGHT_UPDATE` | 500 | Erreur de mise à jour analyse IA |
| `IntAiInsightDeleteError` | `INT_AI_INSIGHT_DELETE` | 500 | Erreur de suppression analyse IA |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiAssistantQueryNotFoundError` | `INT_AI_ASSISTANT_QUERY_NOT_FOUND` | 404 | Requête assistant IA introuvable |
| `IntAiAssistantQueryCreateError` | `INT_AI_ASSISTANT_QUERY_CREATE` | 500 | Erreur de création requête assistant |
| `IntAiAssistantQueryUpdateError` | `INT_AI_ASSISTANT_QUERY_UPDATE` | 500 | Erreur de mise à jour requête assistant |
| `IntAiAssistantQueryDeleteError` | `INT_AI_ASSISTANT_QUERY_DELETE` | 500 | Erreur de suppression requête assistant |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiAssistantResponseNotFoundError` | `INT_AI_ASSISTANT_RESPONSE_NOT_FOUND` | 404 | Réponse assistant IA introuvable |
| `IntAiAssistantResponseCreateError` | `INT_AI_ASSISTANT_RESPONSE_CREATE` | 500 | Erreur de création réponse assistant |
| `IntAiAssistantResponseUpdateError` | `INT_AI_ASSISTANT_RESPONSE_UPDATE` | 500 | Erreur de mise à jour réponse assistant |
| `IntAiAssistantResponseDeleteError` | `INT_AI_ASSISTANT_RESPONSE_DELETE` | 500 | Erreur de suppression réponse assistant |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntDecisionRecommendationNotFoundError` | `INT_DECISION_RECOMMENDATION_NOT_FOUND` | 404 | Recommandation décisionnelle introuvable |
| `IntDecisionRecommendationCreateError` | `INT_DECISION_RECOMMENDATION_CREATE` | 500 | Erreur de création recommandation |
| `IntDecisionRecommendationUpdateError` | `INT_DECISION_RECOMMENDATION_UPDATE` | 500 | Erreur de mise à jour recommandation |
| `IntDecisionRecommendationDeleteError` | `INT_DECISION_RECOMMENDATION_DELETE` | 500 | Erreur de suppression recommandation |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntRecommendationImpactNotFoundError` | `INT_RECOMMENDATION_IMPACT_NOT_FOUND` | 404 | Impact de la recommandation introuvable |
| `IntRecommendationImpactCreateError` | `INT_RECOMMENDATION_IMPACT_CREATE` | 500 | Erreur de création impact |
| `IntRecommendationImpactUpdateError` | `INT_RECOMMENDATION_IMPACT_UPDATE` | 500 | Erreur de mise à jour impact |
| `IntRecommendationImpactDeleteError` | `INT_RECOMMENDATION_IMPACT_DELETE` | 500 | Erreur de suppression impact |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntRecommendationCostNotFoundError` | `INT_RECOMMENDATION_COST_NOT_FOUND` | 404 | Coût de la recommandation introuvable |
| `IntRecommendationCostCreateError` | `INT_RECOMMENDATION_COST_CREATE` | 500 | Erreur de création coût |
| `IntRecommendationCostUpdateError` | `INT_RECOMMENDATION_COST_UPDATE` | 500 | Erreur de mise à jour coût |
| `IntRecommendationCostDeleteError` | `INT_RECOMMENDATION_COST_DELETE` | 500 | Erreur de suppression coût |

### Scénarios & Audit

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntDecisionScenarioNotFoundError` | `INT_DECISION_SCENARIO_NOT_FOUND` | 404 | Scénario décisionnel introuvable |
| `IntDecisionScenarioCreateError` | `INT_DECISION_SCENARIO_CREATE` | 500 | Erreur de création scénario |
| `IntDecisionScenarioUpdateError` | `INT_DECISION_SCENARIO_UPDATE` | 500 | Erreur de mise à jour scénario |
| `IntDecisionScenarioDeleteError` | `INT_DECISION_SCENARIO_DELETE` | 500 | Erreur de suppression scénario |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntDecisionAuditNotFoundError` | `INT_DECISION_AUDIT_NOT_FOUND` | 404 | Audit décisionnel introuvable |
| `IntDecisionAuditCreateError` | `INT_DECISION_AUDIT_CREATE` | 500 | Erreur de création audit |
| `IntDecisionAuditUpdateError` | `INT_DECISION_AUDIT_UPDATE` | 500 | Erreur de mise à jour audit |
| `IntDecisionAuditDeleteError` | `INT_DECISION_AUDIT_DELETE` | 500 | Erreur de suppression audit |

### Infrastructure

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntDataSourceConnectionNotFoundError` | `INT_DATA_SOURCE_CONNECTION_NOT_FOUND` | 404 | Connexion source de données introuvable |
| `IntDataSourceConnectionCreateError` | `INT_DATA_SOURCE_CONNECTION_CREATE` | 500 | Erreur de création connexion |
| `IntDataSourceConnectionUpdateError` | `INT_DATA_SOURCE_CONNECTION_UPDATE` | 500 | Erreur de mise à jour connexion |
| `IntDataSourceConnectionDeleteError` | `INT_DATA_SOURCE_CONNECTION_DELETE` | 500 | Erreur de suppression connexion |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAiModelRegistryNotFoundError` | `INT_AI_MODEL_REGISTRY_NOT_FOUND` | 404 | Registre de modèles IA introuvable |
| `IntAiModelRegistryCreateError` | `INT_AI_MODEL_REGISTRY_CREATE` | 500 | Erreur de création registre |
| `IntAiModelRegistryUpdateError` | `INT_AI_MODEL_REGISTRY_UPDATE` | 500 | Erreur de mise à jour registre |
| `IntAiModelRegistryDeleteError` | `INT_AI_MODEL_REGISTRY_DELETE` | 500 | Erreur de suppression registre |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntIntelligenceConfigurationNotFoundError` | `INT_INTELLIGENCE_CONFIGURATION_NOT_FOUND` | 404 | Configuration d'intelligence introuvable |
| `IntIntelligenceConfigurationCreateError` | `INT_INTELLIGENCE_CONFIGURATION_CREATE` | 500 | Erreur de création configuration |
| `IntIntelligenceConfigurationUpdateError` | `INT_INTELLIGENCE_CONFIGURATION_UPDATE` | 500 | Erreur de mise à jour configuration |
| `IntIntelligenceConfigurationDeleteError` | `INT_INTELLIGENCE_CONFIGURATION_DELETE` | 500 | Erreur de suppression configuration |

### Analyse prédictive

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntPredictiveModelNotFoundError` | `INT_PREDICTIVE_MODEL_NOT_FOUND` | 404 | Modèle prédictif introuvable |
| `IntPredictiveModelCreateError` | `INT_PREDICTIVE_MODEL_CREATE` | 500 | Erreur de création modèle prédictif |
| `IntPredictiveModelUpdateError` | `INT_PREDICTIVE_MODEL_UPDATE` | 500 | Erreur de mise à jour modèle prédictif |
| `IntPredictiveModelDeleteError` | `INT_PREDICTIVE_MODEL_DELETE` | 500 | Erreur de suppression modèle prédictif |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntPredictionResultNotFoundError` | `INT_PREDICTION_RESULT_NOT_FOUND` | 404 | Résultat de prédiction introuvable |
| `IntPredictionResultCreateError` | `INT_PREDICTION_RESULT_CREATE` | 500 | Erreur de création résultat prédiction |
| `IntPredictionResultUpdateError` | `INT_PREDICTION_RESULT_UPDATE` | 500 | Erreur de mise à jour résultat prédiction |
| `IntPredictionResultDeleteError` | `INT_PREDICTION_RESULT_DELETE` | 500 | Erreur de suppression résultat prédiction |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAcademicSuccessPredictionNotFoundError` | `INT_ACADEMIC_SUCCESS_PREDICTION_NOT_FOUND` | 404 | Prédiction réussite académique introuvable |
| `IntAcademicSuccessPredictionCreateError` | `INT_ACADEMIC_SUCCESS_PREDICTION_CREATE` | 500 | Erreur de création prédiction réussite |
| `IntAcademicSuccessPredictionUpdateError` | `INT_ACADEMIC_SUCCESS_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction réussite |
| `IntAcademicSuccessPredictionDeleteError` | `INT_ACADEMIC_SUCCESS_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction réussite |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAcademicFailurePredictionNotFoundError` | `INT_ACADEMIC_FAILURE_PREDICTION_NOT_FOUND` | 404 | Prédiction échec académique introuvable |
| `IntAcademicFailurePredictionCreateError` | `INT_ACADEMIC_FAILURE_PREDICTION_CREATE` | 500 | Erreur de création prédiction échec |
| `IntAcademicFailurePredictionUpdateError` | `INT_ACADEMIC_FAILURE_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction échec |
| `IntAcademicFailurePredictionDeleteError` | `INT_ACADEMIC_FAILURE_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction échec |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntDropoutPredictionNotFoundError` | `INT_DROPOUT_PREDICTION_NOT_FOUND` | 404 | Prédiction d'abandon introuvable |
| `IntDropoutPredictionCreateError` | `INT_DROPOUT_PREDICTION_CREATE` | 500 | Erreur de création prédiction abandon |
| `IntDropoutPredictionUpdateError` | `INT_DROPOUT_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction abandon |
| `IntDropoutPredictionDeleteError` | `INT_DROPOUT_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction abandon |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAbandonPredictionNotFoundError` | `INT_ABANDON_PREDICTION_NOT_FOUND` | 404 | Prédiction d'abandon introuvable |
| `IntAbandonPredictionCreateError` | `INT_ABANDON_PREDICTION_CREATE` | 500 | Erreur de création prédiction abandon |
| `IntAbandonPredictionUpdateError` | `INT_ABANDON_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction abandon |
| `IntAbandonPredictionDeleteError` | `INT_ABANDON_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction abandon |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntViolencePredictionNotFoundError` | `INT_VIOLENCE_PREDICTION_NOT_FOUND` | 404 | Prédiction de violence introuvable |
| `IntViolencePredictionCreateError` | `INT_VIOLENCE_PREDICTION_CREATE` | 500 | Erreur de création prédiction violence |
| `IntViolencePredictionUpdateError` | `INT_VIOLENCE_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction violence |
| `IntViolencePredictionDeleteError` | `INT_VIOLENCE_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction violence |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntAbsenteeismPredictionNotFoundError` | `INT_ABSENTEEISM_PREDICTION_NOT_FOUND` | 404 | Prédiction d'absentéisme introuvable |
| `IntAbsenteeismPredictionCreateError` | `INT_ABSENTEEISM_PREDICTION_CREATE` | 500 | Erreur de création prédiction absentéisme |
| `IntAbsenteeismPredictionUpdateError` | `INT_ABSENTEEISM_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction absentéisme |
| `IntAbsenteeismPredictionDeleteError` | `INT_ABSENTEEISM_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction absentéisme |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntFraudPredictionNotFoundError` | `INT_FRAUD_PREDICTION_NOT_FOUND` | 404 | Prédiction de fraude introuvable |
| `IntFraudPredictionCreateError` | `INT_FRAUD_PREDICTION_CREATE` | 500 | Erreur de création prédiction fraude |
| `IntFraudPredictionUpdateError` | `INT_FRAUD_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction fraude |
| `IntFraudPredictionDeleteError` | `INT_FRAUD_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction fraude |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntFinancialRiskPredictionNotFoundError` | `INT_FINANCIAL_RISK_PREDICTION_NOT_FOUND` | 404 | Prédiction de risque financier introuvable |
| `IntFinancialRiskPredictionCreateError` | `INT_FINANCIAL_RISK_PREDICTION_CREATE` | 500 | Erreur de création prédiction risque financier |
| `IntFinancialRiskPredictionUpdateError` | `INT_FINANCIAL_RISK_PREDICTION_UPDATE` | 500 | Erreur de mise à jour prédiction risque financier |
| `IntFinancialRiskPredictionDeleteError` | `INT_FINANCIAL_RISK_PREDICTION_DELETE` | 500 | Erreur de suppression prédiction risque financier |

### Prévisions

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntBudgetForecastNotFoundError` | `INT_BUDGET_FORECAST_NOT_FOUND` | 404 | Prévision budgétaire introuvable |
| `IntBudgetForecastCreateError` | `INT_BUDGET_FORECAST_CREATE` | 500 | Erreur de création prévision budgétaire |
| `IntBudgetForecastUpdateError` | `INT_BUDGET_FORECAST_UPDATE` | 500 | Erreur de mise à jour prévision budgétaire |
| `IntBudgetForecastDeleteError` | `INT_BUDGET_FORECAST_DELETE` | 500 | Erreur de suppression prévision budgétaire |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntEnrollmentForecastNotFoundError` | `INT_ENROLLMENT_FORECAST_NOT_FOUND` | 404 | Prévision d'inscription introuvable |
| `IntEnrollmentForecastCreateError` | `INT_ENROLLMENT_FORECAST_CREATE` | 500 | Erreur de création prévision inscription |
| `IntEnrollmentForecastUpdateError` | `INT_ENROLLMENT_FORECAST_UPDATE` | 500 | Erreur de mise à jour prévision inscription |
| `IntEnrollmentForecastDeleteError` | `INT_ENROLLMENT_FORECAST_DELETE` | 500 | Erreur de suppression prévision inscription |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntRecruitmentForecastNotFoundError` | `INT_RECRUITMENT_FORECAST_NOT_FOUND` | 404 | Prévision de recrutement introuvable |
| `IntRecruitmentForecastCreateError` | `INT_RECRUITMENT_FORECAST_CREATE` | 500 | Erreur de création prévision recrutement |
| `IntRecruitmentForecastUpdateError` | `INT_RECRUITMENT_FORECAST_UPDATE` | 500 | Erreur de mise à jour prévision recrutement |
| `IntRecruitmentForecastDeleteError` | `INT_RECRUITMENT_FORECAST_DELETE` | 500 | Erreur de suppression prévision recrutement |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntTeacherNeedForecastNotFoundError` | `INT_TEACHER_NEED_FORECAST_NOT_FOUND` | 404 | Prévision de besoin en enseignants introuvable |
| `IntTeacherNeedForecastCreateError` | `INT_TEACHER_NEED_FORECAST_CREATE` | 500 | Erreur de création prévision besoin enseignants |
| `IntTeacherNeedForecastUpdateError` | `INT_TEACHER_NEED_FORECAST_UPDATE` | 500 | Erreur de mise à jour prévision besoin enseignants |
| `IntTeacherNeedForecastDeleteError` | `INT_TEACHER_NEED_FORECAST_DELETE` | 500 | Erreur de suppression prévision besoin enseignants |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntClassroomNeedForecastNotFoundError` | `INT_CLASSROOM_NEED_FORECAST_NOT_FOUND` | 404 | Prévision de besoin en salles introuvable |
| `IntClassroomNeedForecastCreateError` | `INT_CLASSROOM_NEED_FORECAST_CREATE` | 500 | Erreur de création prévision besoin salles |
| `IntClassroomNeedForecastUpdateError` | `INT_CLASSROOM_NEED_FORECAST_UPDATE` | 500 | Erreur de mise à jour prévision besoin salles |
| `IntClassroomNeedForecastDeleteError` | `INT_CLASSROOM_NEED_FORECAST_DELETE` | 500 | Erreur de suppression prévision besoin salles |

| Classe | Code | HTTP | Description |
|--------|------|------|-------------|
| `IntMaterialNeedForecastNotFoundError` | `INT_MATERIAL_NEED_FORECAST_NOT_FOUND` | 404 | Prévision de besoin en matériel introuvable |
| `IntMaterialNeedForecastCreateError` | `INT_MATERIAL_NEED_FORECAST_CREATE` | 500 | Erreur de création prévision besoin matériel |
| `IntMaterialNeedForecastUpdateError` | `INT_MATERIAL_NEED_FORECAST_UPDATE` | 500 | Erreur de mise à jour prévision besoin matériel |
| `IntMaterialNeedForecastDeleteError` | `INT_MATERIAL_NEED_FORECAST_DELETE` | 500 | Erreur de suppression prévision besoin matériel |

## Utilisation dans les services

```typescript
import { IntEngineNotFoundError } from '@educi/errors';

export class IntEngineService {
  async getEngine(schoolId: string, id: string): Promise<IntelligenceEngine> {
    const item = await this.repo.getEngine(id, schoolId);
    if (!item) throw new IntEngineNotFoundError(id);
    return item;
  }
}
```

## Gestion des erreurs dans les API routes

```typescript
export async function GET(request: NextRequest) {
  try {
    const data = await service.listEngines(schoolId);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```
