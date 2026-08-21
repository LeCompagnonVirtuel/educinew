import { AppError } from './AppError';

export class IntEducationIntelligenceScoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Score d'intelligence éducative introuvable (${identifier})` : `Score d'intelligence éducative introuvable`;
    super(msg, 'INT_EDUCATION_INTELLIGENCE_SCORE_NOT_FOUND', 404);
  }
}

export class IntEducationIntelligenceScoreCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de score d'intelligence éducative (${identifier})` : `Erreur de création de score d'intelligence éducative`;
    super(msg, 'INT_EDUCATION_INTELLIGENCE_SCORE_CREATE', 500);
  }
}

export class IntEducationIntelligenceScoreUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de score d'intelligence éducative (${identifier})` : `Erreur de mise à jour de score d'intelligence éducative`;
    super(msg, 'INT_EDUCATION_INTELLIGENCE_SCORE_UPDATE', 500);
  }
}

export class IntEducationIntelligenceScoreDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de score d'intelligence éducative (${identifier})` : `Erreur de suppression de score d'intelligence éducative`;
    super(msg, 'INT_EDUCATION_INTELLIGENCE_SCORE_DELETE', 500);
  }
}

export class IntSchoolHealthScoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Score de santé scolaire introuvable (${identifier})` : `Score de santé scolaire introuvable`;
    super(msg, 'INT_SCHOOL_HEALTH_SCORE_NOT_FOUND', 404);
  }
}

export class IntSchoolHealthScoreCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de score de santé scolaire (${identifier})` : `Erreur de création de score de santé scolaire`;
    super(msg, 'INT_SCHOOL_HEALTH_SCORE_CREATE', 500);
  }
}

export class IntSchoolHealthScoreUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de score de santé scolaire (${identifier})` : `Erreur de mise à jour de score de santé scolaire`;
    super(msg, 'INT_SCHOOL_HEALTH_SCORE_UPDATE', 500);
  }
}

export class IntSchoolHealthScoreDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de score de santé scolaire (${identifier})` : `Erreur de suppression de score de santé scolaire`;
    super(msg, 'INT_SCHOOL_HEALTH_SCORE_DELETE', 500);
  }
}

export class IntAcademicHealthIndexNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indice de santé académique introuvable (${identifier})` : `Indice de santé académique introuvable`;
    super(msg, 'INT_ACADEMIC_HEALTH_INDEX_NOT_FOUND', 404);
  }
}

export class IntAcademicHealthIndexCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de indice de santé académique (${identifier})` : `Erreur de création de indice de santé académique`;
    super(msg, 'INT_ACADEMIC_HEALTH_INDEX_CREATE', 500);
  }
}

export class IntAcademicHealthIndexUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de indice de santé académique (${identifier})` : `Erreur de mise à jour de indice de santé académique`;
    super(msg, 'INT_ACADEMIC_HEALTH_INDEX_UPDATE', 500);
  }
}

export class IntAcademicHealthIndexDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de indice de santé académique (${identifier})` : `Erreur de suppression de indice de santé académique`;
    super(msg, 'INT_ACADEMIC_HEALTH_INDEX_DELETE', 500);
  }
}

export class IntFinancialHealthIndexNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indice de santé financière introuvable (${identifier})` : `Indice de santé financière introuvable`;
    super(msg, 'INT_FINANCIAL_HEALTH_INDEX_NOT_FOUND', 404);
  }
}

export class IntFinancialHealthIndexCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de indice de santé financière (${identifier})` : `Erreur de création de indice de santé financière`;
    super(msg, 'INT_FINANCIAL_HEALTH_INDEX_CREATE', 500);
  }
}

export class IntFinancialHealthIndexUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de indice de santé financière (${identifier})` : `Erreur de mise à jour de indice de santé financière`;
    super(msg, 'INT_FINANCIAL_HEALTH_INDEX_UPDATE', 500);
  }
}

export class IntFinancialHealthIndexDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de indice de santé financière (${identifier})` : `Erreur de suppression de indice de santé financière`;
    super(msg, 'INT_FINANCIAL_HEALTH_INDEX_DELETE', 500);
  }
}

export class IntTeacherPerformanceIndexNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indice de performance enseignante introuvable (${identifier})` : `Indice de performance enseignante introuvable`;
    super(msg, 'INT_TEACHER_PERFORMANCE_INDEX_NOT_FOUND', 404);
  }
}

export class IntTeacherPerformanceIndexCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de indice de performance enseignante (${identifier})` : `Erreur de création de indice de performance enseignante`;
    super(msg, 'INT_TEACHER_PERFORMANCE_INDEX_CREATE', 500);
  }
}

export class IntTeacherPerformanceIndexUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de indice de performance enseignante (${identifier})` : `Erreur de mise à jour de indice de performance enseignante`;
    super(msg, 'INT_TEACHER_PERFORMANCE_INDEX_UPDATE', 500);
  }
}

export class IntTeacherPerformanceIndexDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de indice de performance enseignante (${identifier})` : `Erreur de suppression de indice de performance enseignante`;
    super(msg, 'INT_TEACHER_PERFORMANCE_INDEX_DELETE', 500);
  }
}

export class IntStudentSuccessIndexNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indice de réussite étudiante introuvable (${identifier})` : `Indice de réussite étudiante introuvable`;
    super(msg, 'INT_STUDENT_SUCCESS_INDEX_NOT_FOUND', 404);
  }
}

export class IntStudentSuccessIndexCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de indice de réussite étudiante (${identifier})` : `Erreur de création de indice de réussite étudiante`;
    super(msg, 'INT_STUDENT_SUCCESS_INDEX_CREATE', 500);
  }
}

export class IntStudentSuccessIndexUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de indice de réussite étudiante (${identifier})` : `Erreur de mise à jour de indice de réussite étudiante`;
    super(msg, 'INT_STUDENT_SUCCESS_INDEX_UPDATE', 500);
  }
}

export class IntStudentSuccessIndexDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de indice de réussite étudiante (${identifier})` : `Erreur de suppression de indice de réussite étudiante`;
    super(msg, 'INT_STUDENT_SUCCESS_INDEX_DELETE', 500);
  }
}

export class IntCampusEfficiencyScoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Score d'efficacité du campus introuvable (${identifier})` : `Score d'efficacité du campus introuvable`;
    super(msg, 'INT_CAMPUS_EFFICIENCY_SCORE_NOT_FOUND', 404);
  }
}

export class IntCampusEfficiencyScoreCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de score d'efficacité du campus (${identifier})` : `Erreur de création de score d'efficacité du campus`;
    super(msg, 'INT_CAMPUS_EFFICIENCY_SCORE_CREATE', 500);
  }
}

export class IntCampusEfficiencyScoreUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de score d'efficacité du campus (${identifier})` : `Erreur de mise à jour de score d'efficacité du campus`;
    super(msg, 'INT_CAMPUS_EFFICIENCY_SCORE_UPDATE', 500);
  }
}

export class IntCampusEfficiencyScoreDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de score d'efficacité du campus (${identifier})` : `Erreur de suppression de score d'efficacité du campus`;
    super(msg, 'INT_CAMPUS_EFFICIENCY_SCORE_DELETE', 500);
  }
}

export class IntRiskScoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Score de risque introuvable (${identifier})` : `Score de risque introuvable`;
    super(msg, 'INT_RISK_SCORE_NOT_FOUND', 404);
  }
}

export class IntRiskScoreCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de score de risque (${identifier})` : `Erreur de création de score de risque`;
    super(msg, 'INT_RISK_SCORE_CREATE', 500);
  }
}

export class IntRiskScoreUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de score de risque (${identifier})` : `Erreur de mise à jour de score de risque`;
    super(msg, 'INT_RISK_SCORE_UPDATE', 500);
  }
}

export class IntRiskScoreDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de score de risque (${identifier})` : `Erreur de suppression de score de risque`;
    super(msg, 'INT_RISK_SCORE_DELETE', 500);
  }
}

export class IntComplianceScoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Score de conformité introuvable (${identifier})` : `Score de conformité introuvable`;
    super(msg, 'INT_COMPLIANCE_SCORE_NOT_FOUND', 404);
  }
}

export class IntComplianceScoreCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de score de conformité (${identifier})` : `Erreur de création de score de conformité`;
    super(msg, 'INT_COMPLIANCE_SCORE_CREATE', 500);
  }
}

export class IntComplianceScoreUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de score de conformité (${identifier})` : `Erreur de mise à jour de score de conformité`;
    super(msg, 'INT_COMPLIANCE_SCORE_UPDATE', 500);
  }
}

export class IntComplianceScoreDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de score de conformité (${identifier})` : `Erreur de suppression de score de conformité`;
    super(msg, 'INT_COMPLIANCE_SCORE_DELETE', 500);
  }
}

export class IntAiConfidenceScoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Score de confiance IA introuvable (${identifier})` : `Score de confiance IA introuvable`;
    super(msg, 'INT_AI_CONFIDENCE_SCORE_NOT_FOUND', 404);
  }
}

export class IntAiConfidenceScoreCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de score de confiance ia (${identifier})` : `Erreur de création de score de confiance ia`;
    super(msg, 'INT_AI_CONFIDENCE_SCORE_CREATE', 500);
  }
}

export class IntAiConfidenceScoreUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de score de confiance ia (${identifier})` : `Erreur de mise à jour de score de confiance ia`;
    super(msg, 'INT_AI_CONFIDENCE_SCORE_UPDATE', 500);
  }
}

export class IntAiConfidenceScoreDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de score de confiance ia (${identifier})` : `Erreur de suppression de score de confiance ia`;
    super(msg, 'INT_AI_CONFIDENCE_SCORE_DELETE', 500);
  }
}

export class IntExecutiveDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord exécutif introuvable (${identifier})` : `Tableau de bord exécutif introuvable`;
    super(msg, 'INT_EXECUTIVE_DASHBOARD_NOT_FOUND', 404);
  }
}

export class IntExecutiveDashboardCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de tableau de bord exécutif (${identifier})` : `Erreur de création de tableau de bord exécutif`;
    super(msg, 'INT_EXECUTIVE_DASHBOARD_CREATE', 500);
  }
}

export class IntExecutiveDashboardUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de tableau de bord exécutif (${identifier})` : `Erreur de mise à jour de tableau de bord exécutif`;
    super(msg, 'INT_EXECUTIVE_DASHBOARD_UPDATE', 500);
  }
}

export class IntExecutiveDashboardDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de tableau de bord exécutif (${identifier})` : `Erreur de suppression de tableau de bord exécutif`;
    super(msg, 'INT_EXECUTIVE_DASHBOARD_DELETE', 500);
  }
}

export class IntAiAlertNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Alerte IA introuvable (${identifier})` : `Alerte IA introuvable`;
    super(msg, 'INT_AI_ALERT_NOT_FOUND', 404);
  }
}

export class IntAiAlertCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de alerte ia (${identifier})` : `Erreur de création de alerte ia`;
    super(msg, 'INT_AI_ALERT_CREATE', 500);
  }
}

export class IntAiAlertUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de alerte ia (${identifier})` : `Erreur de mise à jour de alerte ia`;
    super(msg, 'INT_AI_ALERT_UPDATE', 500);
  }
}

export class IntAiAlertDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de alerte ia (${identifier})` : `Erreur de suppression de alerte ia`;
    super(msg, 'INT_AI_ALERT_DELETE', 500);
  }
}

export class IntIntelligentKpiNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `KPI intelligent introuvable (${identifier})` : `KPI intelligent introuvable`;
    super(msg, 'INT_INTELLIGENT_KPI_NOT_FOUND', 404);
  }
}

export class IntIntelligentKpiCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de kpi intelligent (${identifier})` : `Erreur de création de kpi intelligent`;
    super(msg, 'INT_INTELLIGENT_KPI_CREATE', 500);
  }
}

export class IntIntelligentKpiUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de kpi intelligent (${identifier})` : `Erreur de mise à jour de kpi intelligent`;
    super(msg, 'INT_INTELLIGENT_KPI_UPDATE', 500);
  }
}

export class IntIntelligentKpiDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de kpi intelligent (${identifier})` : `Erreur de suppression de kpi intelligent`;
    super(msg, 'INT_INTELLIGENT_KPI_DELETE', 500);
  }
}

export class IntAiSummaryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résumé IA introuvable (${identifier})` : `Résumé IA introuvable`;
    super(msg, 'INT_AI_SUMMARY_NOT_FOUND', 404);
  }
}

export class IntAiSummaryCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de résumé ia (${identifier})` : `Erreur de création de résumé ia`;
    super(msg, 'INT_AI_SUMMARY_CREATE', 500);
  }
}

export class IntAiSummaryUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de résumé ia (${identifier})` : `Erreur de mise à jour de résumé ia`;
    super(msg, 'INT_AI_SUMMARY_UPDATE', 500);
  }
}

export class IntAiSummaryDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de résumé ia (${identifier})` : `Erreur de suppression de résumé ia`;
    super(msg, 'INT_AI_SUMMARY_DELETE', 500);
  }
}

export class IntAiInsightNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analyse IA introuvable (${identifier})` : `Analyse IA introuvable`;
    super(msg, 'INT_AI_INSIGHT_NOT_FOUND', 404);
  }
}

export class IntAiInsightCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de analyse ia (${identifier})` : `Erreur de création de analyse ia`;
    super(msg, 'INT_AI_INSIGHT_CREATE', 500);
  }
}

export class IntAiInsightUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de analyse ia (${identifier})` : `Erreur de mise à jour de analyse ia`;
    super(msg, 'INT_AI_INSIGHT_UPDATE', 500);
  }
}

export class IntAiInsightDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de analyse ia (${identifier})` : `Erreur de suppression de analyse ia`;
    super(msg, 'INT_AI_INSIGHT_DELETE', 500);
  }
}

export class IntAiAssistantQueryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Requête de l'assistant IA introuvable (${identifier})` : `Requête de l'assistant IA introuvable`;
    super(msg, 'INT_AI_ASSISTANT_QUERY_NOT_FOUND', 404);
  }
}

export class IntAiAssistantQueryCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de requête de l'assistant ia (${identifier})` : `Erreur de création de requête de l'assistant ia`;
    super(msg, 'INT_AI_ASSISTANT_QUERY_CREATE', 500);
  }
}

export class IntAiAssistantQueryUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de requête de l'assistant ia (${identifier})` : `Erreur de mise à jour de requête de l'assistant ia`;
    super(msg, 'INT_AI_ASSISTANT_QUERY_UPDATE', 500);
  }
}

export class IntAiAssistantQueryDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de requête de l'assistant ia (${identifier})` : `Erreur de suppression de requête de l'assistant ia`;
    super(msg, 'INT_AI_ASSISTANT_QUERY_DELETE', 500);
  }
}

export class IntAiAssistantResponseNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réponse de l'assistant IA introuvable (${identifier})` : `Réponse de l'assistant IA introuvable`;
    super(msg, 'INT_AI_ASSISTANT_RESPONSE_NOT_FOUND', 404);
  }
}

export class IntAiAssistantResponseCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de réponse de l'assistant ia (${identifier})` : `Erreur de création de réponse de l'assistant ia`;
    super(msg, 'INT_AI_ASSISTANT_RESPONSE_CREATE', 500);
  }
}

export class IntAiAssistantResponseUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de réponse de l'assistant ia (${identifier})` : `Erreur de mise à jour de réponse de l'assistant ia`;
    super(msg, 'INT_AI_ASSISTANT_RESPONSE_UPDATE', 500);
  }
}

export class IntAiAssistantResponseDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de réponse de l'assistant ia (${identifier})` : `Erreur de suppression de réponse de l'assistant ia`;
    super(msg, 'INT_AI_ASSISTANT_RESPONSE_DELETE', 500);
  }
}

export class IntDecisionRecommendationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recommandation décisionnelle introuvable (${identifier})` : `Recommandation décisionnelle introuvable`;
    super(msg, 'INT_DECISION_RECOMMENDATION_NOT_FOUND', 404);
  }
}

export class IntDecisionRecommendationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de recommandation décisionnelle (${identifier})` : `Erreur de création de recommandation décisionnelle`;
    super(msg, 'INT_DECISION_RECOMMENDATION_CREATE', 500);
  }
}

export class IntDecisionRecommendationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de recommandation décisionnelle (${identifier})` : `Erreur de mise à jour de recommandation décisionnelle`;
    super(msg, 'INT_DECISION_RECOMMENDATION_UPDATE', 500);
  }
}

export class IntDecisionRecommendationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de recommandation décisionnelle (${identifier})` : `Erreur de suppression de recommandation décisionnelle`;
    super(msg, 'INT_DECISION_RECOMMENDATION_DELETE', 500);
  }
}

export class IntRecommendationImpactNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Impact de la recommandation introuvable (${identifier})` : `Impact de la recommandation introuvable`;
    super(msg, 'INT_RECOMMENDATION_IMPACT_NOT_FOUND', 404);
  }
}

export class IntRecommendationImpactCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de impact de la recommandation (${identifier})` : `Erreur de création de impact de la recommandation`;
    super(msg, 'INT_RECOMMENDATION_IMPACT_CREATE', 500);
  }
}

export class IntRecommendationImpactUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de impact de la recommandation (${identifier})` : `Erreur de mise à jour de impact de la recommandation`;
    super(msg, 'INT_RECOMMENDATION_IMPACT_UPDATE', 500);
  }
}

export class IntRecommendationImpactDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de impact de la recommandation (${identifier})` : `Erreur de suppression de impact de la recommandation`;
    super(msg, 'INT_RECOMMENDATION_IMPACT_DELETE', 500);
  }
}

export class IntRecommendationCostNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Coût de la recommandation introuvable (${identifier})` : `Coût de la recommandation introuvable`;
    super(msg, 'INT_RECOMMENDATION_COST_NOT_FOUND', 404);
  }
}

export class IntRecommendationCostCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de coût de la recommandation (${identifier})` : `Erreur de création de coût de la recommandation`;
    super(msg, 'INT_RECOMMENDATION_COST_CREATE', 500);
  }
}

export class IntRecommendationCostUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de coût de la recommandation (${identifier})` : `Erreur de mise à jour de coût de la recommandation`;
    super(msg, 'INT_RECOMMENDATION_COST_UPDATE', 500);
  }
}

export class IntRecommendationCostDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de coût de la recommandation (${identifier})` : `Erreur de suppression de coût de la recommandation`;
    super(msg, 'INT_RECOMMENDATION_COST_DELETE', 500);
  }
}

export class IntDecisionScenarioNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Scénario décisionnel introuvable (${identifier})` : `Scénario décisionnel introuvable`;
    super(msg, 'INT_DECISION_SCENARIO_NOT_FOUND', 404);
  }
}

export class IntDecisionScenarioCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de scénario décisionnel (${identifier})` : `Erreur de création de scénario décisionnel`;
    super(msg, 'INT_DECISION_SCENARIO_CREATE', 500);
  }
}

export class IntDecisionScenarioUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de scénario décisionnel (${identifier})` : `Erreur de mise à jour de scénario décisionnel`;
    super(msg, 'INT_DECISION_SCENARIO_UPDATE', 500);
  }
}

export class IntDecisionScenarioDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de scénario décisionnel (${identifier})` : `Erreur de suppression de scénario décisionnel`;
    super(msg, 'INT_DECISION_SCENARIO_DELETE', 500);
  }
}

export class IntDecisionAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit décisionnel introuvable (${identifier})` : `Audit décisionnel introuvable`;
    super(msg, 'INT_DECISION_AUDIT_NOT_FOUND', 404);
  }
}

export class IntDecisionAuditCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de audit décisionnel (${identifier})` : `Erreur de création de audit décisionnel`;
    super(msg, 'INT_DECISION_AUDIT_CREATE', 500);
  }
}

export class IntDecisionAuditUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de audit décisionnel (${identifier})` : `Erreur de mise à jour de audit décisionnel`;
    super(msg, 'INT_DECISION_AUDIT_UPDATE', 500);
  }
}

export class IntDecisionAuditDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de audit décisionnel (${identifier})` : `Erreur de suppression de audit décisionnel`;
    super(msg, 'INT_DECISION_AUDIT_DELETE', 500);
  }
}

export class IntDataSourceConnectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Connexion à la source de données introuvable (${identifier})` : `Connexion à la source de données introuvable`;
    super(msg, 'INT_DATA_SOURCE_CONNECTION_NOT_FOUND', 404);
  }
}

export class IntDataSourceConnectionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de connexion à la source de données (${identifier})` : `Erreur de création de connexion à la source de données`;
    super(msg, 'INT_DATA_SOURCE_CONNECTION_CREATE', 500);
  }
}

export class IntDataSourceConnectionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de connexion à la source de données (${identifier})` : `Erreur de mise à jour de connexion à la source de données`;
    super(msg, 'INT_DATA_SOURCE_CONNECTION_UPDATE', 500);
  }
}

export class IntDataSourceConnectionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de connexion à la source de données (${identifier})` : `Erreur de suppression de connexion à la source de données`;
    super(msg, 'INT_DATA_SOURCE_CONNECTION_DELETE', 500);
  }
}

export class IntAiModelRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Registre de modèles IA introuvable (${identifier})` : `Registre de modèles IA introuvable`;
    super(msg, 'INT_AI_MODEL_REGISTRY_NOT_FOUND', 404);
  }
}

export class IntAiModelRegistryCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de registre de modèles ia (${identifier})` : `Erreur de création de registre de modèles ia`;
    super(msg, 'INT_AI_MODEL_REGISTRY_CREATE', 500);
  }
}

export class IntAiModelRegistryUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de registre de modèles ia (${identifier})` : `Erreur de mise à jour de registre de modèles ia`;
    super(msg, 'INT_AI_MODEL_REGISTRY_UPDATE', 500);
  }
}

export class IntAiModelRegistryDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de registre de modèles ia (${identifier})` : `Erreur de suppression de registre de modèles ia`;
    super(msg, 'INT_AI_MODEL_REGISTRY_DELETE', 500);
  }
}

export class IntIntelligenceConfigurationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration d'intelligence introuvable (${identifier})` : `Configuration d'intelligence introuvable`;
    super(msg, 'INT_INTELLIGENCE_CONFIGURATION_NOT_FOUND', 404);
  }
}

export class IntIntelligenceConfigurationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de configuration d'intelligence (${identifier})` : `Erreur de création de configuration d'intelligence`;
    super(msg, 'INT_INTELLIGENCE_CONFIGURATION_CREATE', 500);
  }
}

export class IntIntelligenceConfigurationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de configuration d'intelligence (${identifier})` : `Erreur de mise à jour de configuration d'intelligence`;
    super(msg, 'INT_INTELLIGENCE_CONFIGURATION_UPDATE', 500);
  }
}

export class IntIntelligenceConfigurationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de configuration d'intelligence (${identifier})` : `Erreur de suppression de configuration d'intelligence`;
    super(msg, 'INT_INTELLIGENCE_CONFIGURATION_DELETE', 500);
  }
}

export class IntPredictiveModelNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Modèle prédictif introuvable (${identifier})` : `Modèle prédictif introuvable`;
    super(msg, 'INT_PREDICTIVE_MODEL_NOT_FOUND', 404);
  }
}

export class IntPredictiveModelCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de modèle prédictif (${identifier})` : `Erreur de création de modèle prédictif`;
    super(msg, 'INT_PREDICTIVE_MODEL_CREATE', 500);
  }
}

export class IntPredictiveModelUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de modèle prédictif (${identifier})` : `Erreur de mise à jour de modèle prédictif`;
    super(msg, 'INT_PREDICTIVE_MODEL_UPDATE', 500);
  }
}

export class IntPredictiveModelDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de modèle prédictif (${identifier})` : `Erreur de suppression de modèle prédictif`;
    super(msg, 'INT_PREDICTIVE_MODEL_DELETE', 500);
  }
}

export class IntPredictionResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résultat de prédiction introuvable (${identifier})` : `Résultat de prédiction introuvable`;
    super(msg, 'INT_PREDICTION_RESULT_NOT_FOUND', 404);
  }
}

export class IntPredictionResultCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de résultat de prédiction (${identifier})` : `Erreur de création de résultat de prédiction`;
    super(msg, 'INT_PREDICTION_RESULT_CREATE', 500);
  }
}

export class IntPredictionResultUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de résultat de prédiction (${identifier})` : `Erreur de mise à jour de résultat de prédiction`;
    super(msg, 'INT_PREDICTION_RESULT_UPDATE', 500);
  }
}

export class IntPredictionResultDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de résultat de prédiction (${identifier})` : `Erreur de suppression de résultat de prédiction`;
    super(msg, 'INT_PREDICTION_RESULT_DELETE', 500);
  }
}

export class IntAcademicSuccessPredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction de réussite académique introuvable (${identifier})` : `Prédiction de réussite académique introuvable`;
    super(msg, 'INT_ACADEMIC_SUCCESS_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntAcademicSuccessPredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction de réussite académique (${identifier})` : `Erreur de création de prédiction de réussite académique`;
    super(msg, 'INT_ACADEMIC_SUCCESS_PREDICTION_CREATE', 500);
  }
}

export class IntAcademicSuccessPredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction de réussite académique (${identifier})` : `Erreur de mise à jour de prédiction de réussite académique`;
    super(msg, 'INT_ACADEMIC_SUCCESS_PREDICTION_UPDATE', 500);
  }
}

export class IntAcademicSuccessPredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction de réussite académique (${identifier})` : `Erreur de suppression de prédiction de réussite académique`;
    super(msg, 'INT_ACADEMIC_SUCCESS_PREDICTION_DELETE', 500);
  }
}

export class IntAcademicFailurePredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction d'échec académique introuvable (${identifier})` : `Prédiction d'échec académique introuvable`;
    super(msg, 'INT_ACADEMIC_FAILURE_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntAcademicFailurePredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction d'échec académique (${identifier})` : `Erreur de création de prédiction d'échec académique`;
    super(msg, 'INT_ACADEMIC_FAILURE_PREDICTION_CREATE', 500);
  }
}

export class IntAcademicFailurePredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction d'échec académique (${identifier})` : `Erreur de mise à jour de prédiction d'échec académique`;
    super(msg, 'INT_ACADEMIC_FAILURE_PREDICTION_UPDATE', 500);
  }
}

export class IntAcademicFailurePredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction d'échec académique (${identifier})` : `Erreur de suppression de prédiction d'échec académique`;
    super(msg, 'INT_ACADEMIC_FAILURE_PREDICTION_DELETE', 500);
  }
}

export class IntDropoutPredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction d'abandon introuvable (${identifier})` : `Prédiction d'abandon introuvable`;
    super(msg, 'INT_DROPOUT_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntDropoutPredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction d'abandon (${identifier})` : `Erreur de création de prédiction d'abandon`;
    super(msg, 'INT_DROPOUT_PREDICTION_CREATE', 500);
  }
}

export class IntDropoutPredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction d'abandon (${identifier})` : `Erreur de mise à jour de prédiction d'abandon`;
    super(msg, 'INT_DROPOUT_PREDICTION_UPDATE', 500);
  }
}

export class IntDropoutPredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction d'abandon (${identifier})` : `Erreur de suppression de prédiction d'abandon`;
    super(msg, 'INT_DROPOUT_PREDICTION_DELETE', 500);
  }
}

export class IntAbandonPredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction d'abandon introuvable (${identifier})` : `Prédiction d'abandon introuvable`;
    super(msg, 'INT_ABANDON_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntAbandonPredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction d'abandon (${identifier})` : `Erreur de création de prédiction d'abandon`;
    super(msg, 'INT_ABANDON_PREDICTION_CREATE', 500);
  }
}

export class IntAbandonPredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction d'abandon (${identifier})` : `Erreur de mise à jour de prédiction d'abandon`;
    super(msg, 'INT_ABANDON_PREDICTION_UPDATE', 500);
  }
}

export class IntAbandonPredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction d'abandon (${identifier})` : `Erreur de suppression de prédiction d'abandon`;
    super(msg, 'INT_ABANDON_PREDICTION_DELETE', 500);
  }
}

export class IntViolencePredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction de violence introuvable (${identifier})` : `Prédiction de violence introuvable`;
    super(msg, 'INT_VIOLENCE_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntViolencePredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction de violence (${identifier})` : `Erreur de création de prédiction de violence`;
    super(msg, 'INT_VIOLENCE_PREDICTION_CREATE', 500);
  }
}

export class IntViolencePredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction de violence (${identifier})` : `Erreur de mise à jour de prédiction de violence`;
    super(msg, 'INT_VIOLENCE_PREDICTION_UPDATE', 500);
  }
}

export class IntViolencePredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction de violence (${identifier})` : `Erreur de suppression de prédiction de violence`;
    super(msg, 'INT_VIOLENCE_PREDICTION_DELETE', 500);
  }
}

export class IntAbsenteeismPredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction d'absentéisme introuvable (${identifier})` : `Prédiction d'absentéisme introuvable`;
    super(msg, 'INT_ABSENTEEISM_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntAbsenteeismPredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction d'absentéisme (${identifier})` : `Erreur de création de prédiction d'absentéisme`;
    super(msg, 'INT_ABSENTEEISM_PREDICTION_CREATE', 500);
  }
}

export class IntAbsenteeismPredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction d'absentéisme (${identifier})` : `Erreur de mise à jour de prédiction d'absentéisme`;
    super(msg, 'INT_ABSENTEEISM_PREDICTION_UPDATE', 500);
  }
}

export class IntAbsenteeismPredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction d'absentéisme (${identifier})` : `Erreur de suppression de prédiction d'absentéisme`;
    super(msg, 'INT_ABSENTEEISM_PREDICTION_DELETE', 500);
  }
}

export class IntFraudPredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction de fraude introuvable (${identifier})` : `Prédiction de fraude introuvable`;
    super(msg, 'INT_FRAUD_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntFraudPredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction de fraude (${identifier})` : `Erreur de création de prédiction de fraude`;
    super(msg, 'INT_FRAUD_PREDICTION_CREATE', 500);
  }
}

export class IntFraudPredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction de fraude (${identifier})` : `Erreur de mise à jour de prédiction de fraude`;
    super(msg, 'INT_FRAUD_PREDICTION_UPDATE', 500);
  }
}

export class IntFraudPredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction de fraude (${identifier})` : `Erreur de suppression de prédiction de fraude`;
    super(msg, 'INT_FRAUD_PREDICTION_DELETE', 500);
  }
}

export class IntFinancialRiskPredictionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prédiction de risque financier introuvable (${identifier})` : `Prédiction de risque financier introuvable`;
    super(msg, 'INT_FINANCIAL_RISK_PREDICTION_NOT_FOUND', 404);
  }
}

export class IntFinancialRiskPredictionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prédiction de risque financier (${identifier})` : `Erreur de création de prédiction de risque financier`;
    super(msg, 'INT_FINANCIAL_RISK_PREDICTION_CREATE', 500);
  }
}

export class IntFinancialRiskPredictionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prédiction de risque financier (${identifier})` : `Erreur de mise à jour de prédiction de risque financier`;
    super(msg, 'INT_FINANCIAL_RISK_PREDICTION_UPDATE', 500);
  }
}

export class IntFinancialRiskPredictionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prédiction de risque financier (${identifier})` : `Erreur de suppression de prédiction de risque financier`;
    super(msg, 'INT_FINANCIAL_RISK_PREDICTION_DELETE', 500);
  }
}

export class IntBudgetForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision budgétaire introuvable (${identifier})` : `Prévision budgétaire introuvable`;
    super(msg, 'INT_BUDGET_FORECAST_NOT_FOUND', 404);
  }
}

export class IntBudgetForecastCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prévision budgétaire (${identifier})` : `Erreur de création de prévision budgétaire`;
    super(msg, 'INT_BUDGET_FORECAST_CREATE', 500);
  }
}

export class IntBudgetForecastUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prévision budgétaire (${identifier})` : `Erreur de mise à jour de prévision budgétaire`;
    super(msg, 'INT_BUDGET_FORECAST_UPDATE', 500);
  }
}

export class IntBudgetForecastDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prévision budgétaire (${identifier})` : `Erreur de suppression de prévision budgétaire`;
    super(msg, 'INT_BUDGET_FORECAST_DELETE', 500);
  }
}

export class IntEnrollmentForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision d'inscription introuvable (${identifier})` : `Prévision d'inscription introuvable`;
    super(msg, 'INT_ENROLLMENT_FORECAST_NOT_FOUND', 404);
  }
}

export class IntEnrollmentForecastCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prévision d'inscription (${identifier})` : `Erreur de création de prévision d'inscription`;
    super(msg, 'INT_ENROLLMENT_FORECAST_CREATE', 500);
  }
}

export class IntEnrollmentForecastUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prévision d'inscription (${identifier})` : `Erreur de mise à jour de prévision d'inscription`;
    super(msg, 'INT_ENROLLMENT_FORECAST_UPDATE', 500);
  }
}

export class IntEnrollmentForecastDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prévision d'inscription (${identifier})` : `Erreur de suppression de prévision d'inscription`;
    super(msg, 'INT_ENROLLMENT_FORECAST_DELETE', 500);
  }
}

export class IntRecruitmentForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision de recrutement introuvable (${identifier})` : `Prévision de recrutement introuvable`;
    super(msg, 'INT_RECRUITMENT_FORECAST_NOT_FOUND', 404);
  }
}

export class IntRecruitmentForecastCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prévision de recrutement (${identifier})` : `Erreur de création de prévision de recrutement`;
    super(msg, 'INT_RECRUITMENT_FORECAST_CREATE', 500);
  }
}

export class IntRecruitmentForecastUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prévision de recrutement (${identifier})` : `Erreur de mise à jour de prévision de recrutement`;
    super(msg, 'INT_RECRUITMENT_FORECAST_UPDATE', 500);
  }
}

export class IntRecruitmentForecastDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prévision de recrutement (${identifier})` : `Erreur de suppression de prévision de recrutement`;
    super(msg, 'INT_RECRUITMENT_FORECAST_DELETE', 500);
  }
}

export class IntTeacherNeedForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision de besoin en enseignants introuvable (${identifier})` : `Prévision de besoin en enseignants introuvable`;
    super(msg, 'INT_TEACHER_NEED_FORECAST_NOT_FOUND', 404);
  }
}

export class IntTeacherNeedForecastCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prévision de besoin en enseignants (${identifier})` : `Erreur de création de prévision de besoin en enseignants`;
    super(msg, 'INT_TEACHER_NEED_FORECAST_CREATE', 500);
  }
}

export class IntTeacherNeedForecastUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prévision de besoin en enseignants (${identifier})` : `Erreur de mise à jour de prévision de besoin en enseignants`;
    super(msg, 'INT_TEACHER_NEED_FORECAST_UPDATE', 500);
  }
}

export class IntTeacherNeedForecastDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prévision de besoin en enseignants (${identifier})` : `Erreur de suppression de prévision de besoin en enseignants`;
    super(msg, 'INT_TEACHER_NEED_FORECAST_DELETE', 500);
  }
}

export class IntClassroomNeedForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision de besoin en salles de classe introuvable (${identifier})` : `Prévision de besoin en salles de classe introuvable`;
    super(msg, 'INT_CLASSROOM_NEED_FORECAST_NOT_FOUND', 404);
  }
}

export class IntClassroomNeedForecastCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prévision de besoin en salles de classe (${identifier})` : `Erreur de création de prévision de besoin en salles de classe`;
    super(msg, 'INT_CLASSROOM_NEED_FORECAST_CREATE', 500);
  }
}

export class IntClassroomNeedForecastUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prévision de besoin en salles de classe (${identifier})` : `Erreur de mise à jour de prévision de besoin en salles de classe`;
    super(msg, 'INT_CLASSROOM_NEED_FORECAST_UPDATE', 500);
  }
}

export class IntClassroomNeedForecastDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prévision de besoin en salles de classe (${identifier})` : `Erreur de suppression de prévision de besoin en salles de classe`;
    super(msg, 'INT_CLASSROOM_NEED_FORECAST_DELETE', 500);
  }
}

export class IntMaterialNeedForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision de besoin en matériel introuvable (${identifier})` : `Prévision de besoin en matériel introuvable`;
    super(msg, 'INT_MATERIAL_NEED_FORECAST_NOT_FOUND', 404);
  }
}

export class IntMaterialNeedForecastCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de prévision de besoin en matériel (${identifier})` : `Erreur de création de prévision de besoin en matériel`;
    super(msg, 'INT_MATERIAL_NEED_FORECAST_CREATE', 500);
  }
}

export class IntMaterialNeedForecastUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de prévision de besoin en matériel (${identifier})` : `Erreur de mise à jour de prévision de besoin en matériel`;
    super(msg, 'INT_MATERIAL_NEED_FORECAST_UPDATE', 500);
  }
}

export class IntMaterialNeedForecastDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de prévision de besoin en matériel (${identifier})` : `Erreur de suppression de prévision de besoin en matériel`;
    super(msg, 'INT_MATERIAL_NEED_FORECAST_DELETE', 500);
  }
}

export class IntAiRiskNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Risque IA introuvable (${identifier})` : `Risque IA introuvable`;
    super(msg, 'INT_AI_RISK_NOT_FOUND', 404);
  }
}

export class IntAiRiskCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de risque ia (${identifier})` : `Erreur de création de risque ia`;
    super(msg, 'INT_AI_RISK_CREATE', 500);
  }
}

export class IntAiRiskUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de risque ia (${identifier})` : `Erreur de mise à jour de risque ia`;
    super(msg, 'INT_AI_RISK_UPDATE', 500);
  }
}

export class IntAiRiskDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de risque ia (${identifier})` : `Erreur de suppression de risque ia`;
    super(msg, 'INT_AI_RISK_DELETE', 500);
  }
}

export class IntRiskFactorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Facteur de risque introuvable (${identifier})` : `Facteur de risque introuvable`;
    super(msg, 'INT_RISK_FACTOR_NOT_FOUND', 404);
  }
}

export class IntRiskFactorCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de facteur de risque (${identifier})` : `Erreur de création de facteur de risque`;
    super(msg, 'INT_RISK_FACTOR_CREATE', 500);
  }
}

export class IntRiskFactorUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de facteur de risque (${identifier})` : `Erreur de mise à jour de facteur de risque`;
    super(msg, 'INT_RISK_FACTOR_UPDATE', 500);
  }
}

export class IntRiskFactorDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de facteur de risque (${identifier})` : `Erreur de suppression de facteur de risque`;
    super(msg, 'INT_RISK_FACTOR_DELETE', 500);
  }
}

export class IntRiskAssessmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation de risque introuvable (${identifier})` : `Évaluation de risque introuvable`;
    super(msg, 'INT_RISK_ASSESSMENT_NOT_FOUND', 404);
  }
}

export class IntRiskAssessmentCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de évaluation de risque (${identifier})` : `Erreur de création de évaluation de risque`;
    super(msg, 'INT_RISK_ASSESSMENT_CREATE', 500);
  }
}

export class IntRiskAssessmentUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de évaluation de risque (${identifier})` : `Erreur de mise à jour de évaluation de risque`;
    super(msg, 'INT_RISK_ASSESSMENT_UPDATE', 500);
  }
}

export class IntRiskAssessmentDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de évaluation de risque (${identifier})` : `Erreur de suppression de évaluation de risque`;
    super(msg, 'INT_RISK_ASSESSMENT_DELETE', 500);
  }
}

export class IntMitigationPlanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Plan d'atténuation introuvable (${identifier})` : `Plan d'atténuation introuvable`;
    super(msg, 'INT_MITIGATION_PLAN_NOT_FOUND', 404);
  }
}

export class IntMitigationPlanCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de plan d'atténuation (${identifier})` : `Erreur de création de plan d'atténuation`;
    super(msg, 'INT_MITIGATION_PLAN_CREATE', 500);
  }
}

export class IntMitigationPlanUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de plan d'atténuation (${identifier})` : `Erreur de mise à jour de plan d'atténuation`;
    super(msg, 'INT_MITIGATION_PLAN_UPDATE', 500);
  }
}

export class IntMitigationPlanDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de plan d'atténuation (${identifier})` : `Erreur de suppression de plan d'atténuation`;
    super(msg, 'INT_MITIGATION_PLAN_DELETE', 500);
  }
}

export class IntMitigationActionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Action d'atténuation introuvable (${identifier})` : `Action d'atténuation introuvable`;
    super(msg, 'INT_MITIGATION_ACTION_NOT_FOUND', 404);
  }
}

export class IntMitigationActionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de action d'atténuation (${identifier})` : `Erreur de création de action d'atténuation`;
    super(msg, 'INT_MITIGATION_ACTION_CREATE', 500);
  }
}

export class IntMitigationActionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de action d'atténuation (${identifier})` : `Erreur de mise à jour de action d'atténuation`;
    super(msg, 'INT_MITIGATION_ACTION_UPDATE', 500);
  }
}

export class IntMitigationActionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de action d'atténuation (${identifier})` : `Erreur de suppression de action d'atténuation`;
    super(msg, 'INT_MITIGATION_ACTION_DELETE', 500);
  }
}

export class IntRiskIndicatorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indicateur de risque introuvable (${identifier})` : `Indicateur de risque introuvable`;
    super(msg, 'INT_RISK_INDICATOR_NOT_FOUND', 404);
  }
}

export class IntRiskIndicatorCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de indicateur de risque (${identifier})` : `Erreur de création de indicateur de risque`;
    super(msg, 'INT_RISK_INDICATOR_CREATE', 500);
  }
}

export class IntRiskIndicatorUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de indicateur de risque (${identifier})` : `Erreur de mise à jour de indicateur de risque`;
    super(msg, 'INT_RISK_INDICATOR_UPDATE', 500);
  }
}

export class IntRiskIndicatorDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de indicateur de risque (${identifier})` : `Erreur de suppression de indicateur de risque`;
    super(msg, 'INT_RISK_INDICATOR_DELETE', 500);
  }
}

export class IntRiskEventNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Événement de risque introuvable (${identifier})` : `Événement de risque introuvable`;
    super(msg, 'INT_RISK_EVENT_NOT_FOUND', 404);
  }
}

export class IntRiskEventCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de événement de risque (${identifier})` : `Erreur de création de événement de risque`;
    super(msg, 'INT_RISK_EVENT_CREATE', 500);
  }
}

export class IntRiskEventUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de événement de risque (${identifier})` : `Erreur de mise à jour de événement de risque`;
    super(msg, 'INT_RISK_EVENT_UPDATE', 500);
  }
}

export class IntRiskEventDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de événement de risque (${identifier})` : `Erreur de suppression de événement de risque`;
    super(msg, 'INT_RISK_EVENT_DELETE', 500);
  }
}

export class IntRiskReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de risque introuvable (${identifier})` : `Rapport de risque introuvable`;
    super(msg, 'INT_RISK_REPORT_NOT_FOUND', 404);
  }
}

export class IntRiskReportCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de rapport de risque (${identifier})` : `Erreur de création de rapport de risque`;
    super(msg, 'INT_RISK_REPORT_CREATE', 500);
  }
}

export class IntRiskReportUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de rapport de risque (${identifier})` : `Erreur de mise à jour de rapport de risque`;
    super(msg, 'INT_RISK_REPORT_UPDATE', 500);
  }
}

export class IntRiskReportDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de rapport de risque (${identifier})` : `Erreur de suppression de rapport de risque`;
    super(msg, 'INT_RISK_REPORT_DELETE', 500);
  }
}

export class IntEarlyWarningNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Alerte précoce introuvable (${identifier})` : `Alerte précoce introuvable`;
    super(msg, 'INT_EARLY_WARNING_NOT_FOUND', 404);
  }
}

export class IntEarlyWarningCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de alerte précoce (${identifier})` : `Erreur de création de alerte précoce`;
    super(msg, 'INT_EARLY_WARNING_CREATE', 500);
  }
}

export class IntEarlyWarningUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de alerte précoce (${identifier})` : `Erreur de mise à jour de alerte précoce`;
    super(msg, 'INT_EARLY_WARNING_UPDATE', 500);
  }
}

export class IntEarlyWarningDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de alerte précoce (${identifier})` : `Erreur de suppression de alerte précoce`;
    super(msg, 'INT_EARLY_WARNING_DELETE', 500);
  }
}

export class IntKnowledgeArticleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Article de connaissances introuvable (${identifier})` : `Article de connaissances introuvable`;
    super(msg, 'INT_KNOWLEDGE_ARTICLE_NOT_FOUND', 404);
  }
}

export class IntKnowledgeArticleCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de article de connaissances (${identifier})` : `Erreur de création de article de connaissances`;
    super(msg, 'INT_KNOWLEDGE_ARTICLE_CREATE', 500);
  }
}

export class IntKnowledgeArticleUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de article de connaissances (${identifier})` : `Erreur de mise à jour de article de connaissances`;
    super(msg, 'INT_KNOWLEDGE_ARTICLE_UPDATE', 500);
  }
}

export class IntKnowledgeArticleDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de article de connaissances (${identifier})` : `Erreur de suppression de article de connaissances`;
    super(msg, 'INT_KNOWLEDGE_ARTICLE_DELETE', 500);
  }
}

export class IntKnowledgeBaseNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Base de connaissances introuvable (${identifier})` : `Base de connaissances introuvable`;
    super(msg, 'INT_KNOWLEDGE_BASE_NOT_FOUND', 404);
  }
}

export class IntKnowledgeBaseCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de base de connaissances (${identifier})` : `Erreur de création de base de connaissances`;
    super(msg, 'INT_KNOWLEDGE_BASE_CREATE', 500);
  }
}

export class IntKnowledgeBaseUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de base de connaissances (${identifier})` : `Erreur de mise à jour de base de connaissances`;
    super(msg, 'INT_KNOWLEDGE_BASE_UPDATE', 500);
  }
}

export class IntKnowledgeBaseDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de base de connaissances (${identifier})` : `Erreur de suppression de base de connaissances`;
    super(msg, 'INT_KNOWLEDGE_BASE_DELETE', 500);
  }
}

export class IntKnowledgePolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique de connaissances introuvable (${identifier})` : `Politique de connaissances introuvable`;
    super(msg, 'INT_KNOWLEDGE_POLICY_NOT_FOUND', 404);
  }
}

export class IntKnowledgePolicyCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de politique de connaissances (${identifier})` : `Erreur de création de politique de connaissances`;
    super(msg, 'INT_KNOWLEDGE_POLICY_CREATE', 500);
  }
}

export class IntKnowledgePolicyUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de politique de connaissances (${identifier})` : `Erreur de mise à jour de politique de connaissances`;
    super(msg, 'INT_KNOWLEDGE_POLICY_UPDATE', 500);
  }
}

export class IntKnowledgePolicyDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de politique de connaissances (${identifier})` : `Erreur de suppression de politique de connaissances`;
    super(msg, 'INT_KNOWLEDGE_POLICY_DELETE', 500);
  }
}

export class IntKnowledgeRegulationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réglementation introuvable (${identifier})` : `Réglementation introuvable`;
    super(msg, 'INT_KNOWLEDGE_REGULATION_NOT_FOUND', 404);
  }
}

export class IntKnowledgeRegulationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de réglementation (${identifier})` : `Erreur de création de réglementation`;
    super(msg, 'INT_KNOWLEDGE_REGULATION_CREATE', 500);
  }
}

export class IntKnowledgeRegulationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de réglementation (${identifier})` : `Erreur de mise à jour de réglementation`;
    super(msg, 'INT_KNOWLEDGE_REGULATION_UPDATE', 500);
  }
}

export class IntKnowledgeRegulationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de réglementation (${identifier})` : `Erreur de suppression de réglementation`;
    super(msg, 'INT_KNOWLEDGE_REGULATION_DELETE', 500);
  }
}

export class IntKnowledgeProcedureNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Procédure introuvable (${identifier})` : `Procédure introuvable`;
    super(msg, 'INT_KNOWLEDGE_PROCEDURE_NOT_FOUND', 404);
  }
}

export class IntKnowledgeProcedureCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de procédure (${identifier})` : `Erreur de création de procédure`;
    super(msg, 'INT_KNOWLEDGE_PROCEDURE_CREATE', 500);
  }
}

export class IntKnowledgeProcedureUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de procédure (${identifier})` : `Erreur de mise à jour de procédure`;
    super(msg, 'INT_KNOWLEDGE_PROCEDURE_UPDATE', 500);
  }
}

export class IntKnowledgeProcedureDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de procédure (${identifier})` : `Erreur de suppression de procédure`;
    super(msg, 'INT_KNOWLEDGE_PROCEDURE_DELETE', 500);
  }
}

export class IntKnowledgeFaqNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `FAQ introuvable (${identifier})` : `FAQ introuvable`;
    super(msg, 'INT_KNOWLEDGE_FAQ_NOT_FOUND', 404);
  }
}

export class IntKnowledgeFaqCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de faq (${identifier})` : `Erreur de création de faq`;
    super(msg, 'INT_KNOWLEDGE_FAQ_CREATE', 500);
  }
}

export class IntKnowledgeFaqUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de faq (${identifier})` : `Erreur de mise à jour de faq`;
    super(msg, 'INT_KNOWLEDGE_FAQ_UPDATE', 500);
  }
}

export class IntKnowledgeFaqDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de faq (${identifier})` : `Erreur de suppression de faq`;
    super(msg, 'INT_KNOWLEDGE_FAQ_DELETE', 500);
  }
}

export class IntKnowledgeJurisprudenceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Jurisprudence introuvable (${identifier})` : `Jurisprudence introuvable`;
    super(msg, 'INT_KNOWLEDGE_JURISPRUDENCE_NOT_FOUND', 404);
  }
}

export class IntKnowledgeJurisprudenceCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de jurisprudence (${identifier})` : `Erreur de création de jurisprudence`;
    super(msg, 'INT_KNOWLEDGE_JURISPRUDENCE_CREATE', 500);
  }
}

export class IntKnowledgeJurisprudenceUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de jurisprudence (${identifier})` : `Erreur de mise à jour de jurisprudence`;
    super(msg, 'INT_KNOWLEDGE_JURISPRUDENCE_UPDATE', 500);
  }
}

export class IntKnowledgeJurisprudenceDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de jurisprudence (${identifier})` : `Erreur de suppression de jurisprudence`;
    super(msg, 'INT_KNOWLEDGE_JURISPRUDENCE_DELETE', 500);
  }
}

export class IntKnowledgeDocumentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Document de connaissances introuvable (${identifier})` : `Document de connaissances introuvable`;
    super(msg, 'INT_KNOWLEDGE_DOCUMENT_NOT_FOUND', 404);
  }
}

export class IntKnowledgeDocumentCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de document de connaissances (${identifier})` : `Erreur de création de document de connaissances`;
    super(msg, 'INT_KNOWLEDGE_DOCUMENT_CREATE', 500);
  }
}

export class IntKnowledgeDocumentUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de document de connaissances (${identifier})` : `Erreur de mise à jour de document de connaissances`;
    super(msg, 'INT_KNOWLEDGE_DOCUMENT_UPDATE', 500);
  }
}

export class IntKnowledgeDocumentDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de document de connaissances (${identifier})` : `Erreur de suppression de document de connaissances`;
    super(msg, 'INT_KNOWLEDGE_DOCUMENT_DELETE', 500);
  }
}

export class IntKnowledgeGuideNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Guide de connaissances introuvable (${identifier})` : `Guide de connaissances introuvable`;
    super(msg, 'INT_KNOWLEDGE_GUIDE_NOT_FOUND', 404);
  }
}

export class IntKnowledgeGuideCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de guide de connaissances (${identifier})` : `Erreur de création de guide de connaissances`;
    super(msg, 'INT_KNOWLEDGE_GUIDE_CREATE', 500);
  }
}

export class IntKnowledgeGuideUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de guide de connaissances (${identifier})` : `Erreur de mise à jour de guide de connaissances`;
    super(msg, 'INT_KNOWLEDGE_GUIDE_UPDATE', 500);
  }
}

export class IntKnowledgeGuideDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de guide de connaissances (${identifier})` : `Erreur de suppression de guide de connaissances`;
    super(msg, 'INT_KNOWLEDGE_GUIDE_DELETE', 500);
  }
}

export class IntRagQueryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Requête RAG introuvable (${identifier})` : `Requête RAG introuvable`;
    super(msg, 'INT_RAG_QUERY_NOT_FOUND', 404);
  }
}

export class IntRagQueryCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de requête rag (${identifier})` : `Erreur de création de requête rag`;
    super(msg, 'INT_RAG_QUERY_CREATE', 500);
  }
}

export class IntRagQueryUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de requête rag (${identifier})` : `Erreur de mise à jour de requête rag`;
    super(msg, 'INT_RAG_QUERY_UPDATE', 500);
  }
}

export class IntRagQueryDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de requête rag (${identifier})` : `Erreur de suppression de requête rag`;
    super(msg, 'INT_RAG_QUERY_DELETE', 500);
  }
}

export class IntRagResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résultat RAG introuvable (${identifier})` : `Résultat RAG introuvable`;
    super(msg, 'INT_RAG_RESULT_NOT_FOUND', 404);
  }
}

export class IntRagResultCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de résultat rag (${identifier})` : `Erreur de création de résultat rag`;
    super(msg, 'INT_RAG_RESULT_CREATE', 500);
  }
}

export class IntRagResultUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de résultat rag (${identifier})` : `Erreur de mise à jour de résultat rag`;
    super(msg, 'INT_RAG_RESULT_UPDATE', 500);
  }
}

export class IntRagResultDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de résultat rag (${identifier})` : `Erreur de suppression de résultat rag`;
    super(msg, 'INT_RAG_RESULT_DELETE', 500);
  }
}

export class IntNlQueryRecordNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Enregistrement de requête NL introuvable (${identifier})` : `Enregistrement de requête NL introuvable`;
    super(msg, 'INT_NL_QUERY_RECORD_NOT_FOUND', 404);
  }
}

export class IntNlQueryRecordCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de enregistrement de requête nl (${identifier})` : `Erreur de création de enregistrement de requête nl`;
    super(msg, 'INT_NL_QUERY_RECORD_CREATE', 500);
  }
}

export class IntNlQueryRecordUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de enregistrement de requête nl (${identifier})` : `Erreur de mise à jour de enregistrement de requête nl`;
    super(msg, 'INT_NL_QUERY_RECORD_UPDATE', 500);
  }
}

export class IntNlQueryRecordDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de enregistrement de requête nl (${identifier})` : `Erreur de suppression de enregistrement de requête nl`;
    super(msg, 'INT_NL_QUERY_RECORD_DELETE', 500);
  }
}

export class IntNlQueryTranslationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Traduction de requête NL introuvable (${identifier})` : `Traduction de requête NL introuvable`;
    super(msg, 'INT_NL_QUERY_TRANSLATION_NOT_FOUND', 404);
  }
}

export class IntNlQueryTranslationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de traduction de requête nl (${identifier})` : `Erreur de création de traduction de requête nl`;
    super(msg, 'INT_NL_QUERY_TRANSLATION_CREATE', 500);
  }
}

export class IntNlQueryTranslationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de traduction de requête nl (${identifier})` : `Erreur de mise à jour de traduction de requête nl`;
    super(msg, 'INT_NL_QUERY_TRANSLATION_UPDATE', 500);
  }
}

export class IntNlQueryTranslationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de traduction de requête nl (${identifier})` : `Erreur de suppression de traduction de requête nl`;
    super(msg, 'INT_NL_QUERY_TRANSLATION_DELETE', 500);
  }
}

export class IntNlQueryResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résultat de requête NL introuvable (${identifier})` : `Résultat de requête NL introuvable`;
    super(msg, 'INT_NL_QUERY_RESULT_NOT_FOUND', 404);
  }
}

export class IntNlQueryResultCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de résultat de requête nl (${identifier})` : `Erreur de création de résultat de requête nl`;
    super(msg, 'INT_NL_QUERY_RESULT_CREATE', 500);
  }
}

export class IntNlQueryResultUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de résultat de requête nl (${identifier})` : `Erreur de mise à jour de résultat de requête nl`;
    super(msg, 'INT_NL_QUERY_RESULT_UPDATE', 500);
  }
}

export class IntNlQueryResultDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de résultat de requête nl (${identifier})` : `Erreur de suppression de résultat de requête nl`;
    super(msg, 'INT_NL_QUERY_RESULT_DELETE', 500);
  }
}

export class IntNlVisualizationSuggestionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Suggestion de visualisation NL introuvable (${identifier})` : `Suggestion de visualisation NL introuvable`;
    super(msg, 'INT_NL_VISUALIZATION_SUGGESTION_NOT_FOUND', 404);
  }
}

export class IntNlVisualizationSuggestionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de suggestion de visualisation nl (${identifier})` : `Erreur de création de suggestion de visualisation nl`;
    super(msg, 'INT_NL_VISUALIZATION_SUGGESTION_CREATE', 500);
  }
}

export class IntNlVisualizationSuggestionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de suggestion de visualisation nl (${identifier})` : `Erreur de mise à jour de suggestion de visualisation nl`;
    super(msg, 'INT_NL_VISUALIZATION_SUGGESTION_UPDATE', 500);
  }
}

export class IntNlVisualizationSuggestionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de suggestion de visualisation nl (${identifier})` : `Erreur de suppression de suggestion de visualisation nl`;
    super(msg, 'INT_NL_VISUALIZATION_SUGGESTION_DELETE', 500);
  }
}

export class IntAiReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport IA introuvable (${identifier})` : `Rapport IA introuvable`;
    super(msg, 'INT_AI_REPORT_NOT_FOUND', 404);
  }
}

export class IntAiReportCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de rapport ia (${identifier})` : `Erreur de création de rapport ia`;
    super(msg, 'INT_AI_REPORT_CREATE', 500);
  }
}

export class IntAiReportUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de rapport ia (${identifier})` : `Erreur de mise à jour de rapport ia`;
    super(msg, 'INT_AI_REPORT_UPDATE', 500);
  }
}

export class IntAiReportDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de rapport ia (${identifier})` : `Erreur de suppression de rapport ia`;
    super(msg, 'INT_AI_REPORT_DELETE', 500);
  }
}

export class IntReportScheduleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Planification de rapport introuvable (${identifier})` : `Planification de rapport introuvable`;
    super(msg, 'INT_REPORT_SCHEDULE_NOT_FOUND', 404);
  }
}

export class IntReportScheduleCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de planification de rapport (${identifier})` : `Erreur de création de planification de rapport`;
    super(msg, 'INT_REPORT_SCHEDULE_CREATE', 500);
  }
}

export class IntReportScheduleUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de planification de rapport (${identifier})` : `Erreur de mise à jour de planification de rapport`;
    super(msg, 'INT_REPORT_SCHEDULE_UPDATE', 500);
  }
}

export class IntReportScheduleDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de planification de rapport (${identifier})` : `Erreur de suppression de planification de rapport`;
    super(msg, 'INT_REPORT_SCHEDULE_DELETE', 500);
  }
}

export class IntReportTemplateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Modèle de rapport introuvable (${identifier})` : `Modèle de rapport introuvable`;
    super(msg, 'INT_REPORT_TEMPLATE_NOT_FOUND', 404);
  }
}

export class IntReportTemplateCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de modèle de rapport (${identifier})` : `Erreur de création de modèle de rapport`;
    super(msg, 'INT_REPORT_TEMPLATE_CREATE', 500);
  }
}

export class IntReportTemplateUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de modèle de rapport (${identifier})` : `Erreur de mise à jour de modèle de rapport`;
    super(msg, 'INT_REPORT_TEMPLATE_UPDATE', 500);
  }
}

export class IntReportTemplateDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de modèle de rapport (${identifier})` : `Erreur de suppression de modèle de rapport`;
    super(msg, 'INT_REPORT_TEMPLATE_DELETE', 500);
  }
}

export class IntBenchmarkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Référence comparative introuvable (${identifier})` : `Référence comparative introuvable`;
    super(msg, 'INT_BENCHMARK_NOT_FOUND', 404);
  }
}

export class IntBenchmarkCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de référence comparative (${identifier})` : `Erreur de création de référence comparative`;
    super(msg, 'INT_BENCHMARK_CREATE', 500);
  }
}

export class IntBenchmarkUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de référence comparative (${identifier})` : `Erreur de mise à jour de référence comparative`;
    super(msg, 'INT_BENCHMARK_UPDATE', 500);
  }
}

export class IntBenchmarkDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de référence comparative (${identifier})` : `Erreur de suppression de référence comparative`;
    super(msg, 'INT_BENCHMARK_DELETE', 500);
  }
}

export class IntBenchmarkComparisonNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Comparaison de référence introuvable (${identifier})` : `Comparaison de référence introuvable`;
    super(msg, 'INT_BENCHMARK_COMPARISON_NOT_FOUND', 404);
  }
}

export class IntBenchmarkComparisonCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de comparaison de référence (${identifier})` : `Erreur de création de comparaison de référence`;
    super(msg, 'INT_BENCHMARK_COMPARISON_CREATE', 500);
  }
}

export class IntBenchmarkComparisonUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de comparaison de référence (${identifier})` : `Erreur de mise à jour de comparaison de référence`;
    super(msg, 'INT_BENCHMARK_COMPARISON_UPDATE', 500);
  }
}

export class IntBenchmarkComparisonDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de comparaison de référence (${identifier})` : `Erreur de suppression de comparaison de référence`;
    super(msg, 'INT_BENCHMARK_COMPARISON_DELETE', 500);
  }
}

export class IntBenchmarkRankingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Classement de référence introuvable (${identifier})` : `Classement de référence introuvable`;
    super(msg, 'INT_BENCHMARK_RANKING_NOT_FOUND', 404);
  }
}

export class IntBenchmarkRankingCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de classement de référence (${identifier})` : `Erreur de création de classement de référence`;
    super(msg, 'INT_BENCHMARK_RANKING_CREATE', 500);
  }
}

export class IntBenchmarkRankingUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de classement de référence (${identifier})` : `Erreur de mise à jour de classement de référence`;
    super(msg, 'INT_BENCHMARK_RANKING_UPDATE', 500);
  }
}

export class IntBenchmarkRankingDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de classement de référence (${identifier})` : `Erreur de suppression de classement de référence`;
    super(msg, 'INT_BENCHMARK_RANKING_DELETE', 500);
  }
}

export class IntBenchmarkPercentileNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Percentile de référence introuvable (${identifier})` : `Percentile de référence introuvable`;
    super(msg, 'INT_BENCHMARK_PERCENTILE_NOT_FOUND', 404);
  }
}

export class IntBenchmarkPercentileCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de percentile de référence (${identifier})` : `Erreur de création de percentile de référence`;
    super(msg, 'INT_BENCHMARK_PERCENTILE_CREATE', 500);
  }
}

export class IntBenchmarkPercentileUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de percentile de référence (${identifier})` : `Erreur de mise à jour de percentile de référence`;
    super(msg, 'INT_BENCHMARK_PERCENTILE_UPDATE', 500);
  }
}

export class IntBenchmarkPercentileDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de percentile de référence (${identifier})` : `Erreur de suppression de percentile de référence`;
    super(msg, 'INT_BENCHMARK_PERCENTILE_DELETE', 500);
  }
}

export class IntBenchmarkTendanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tendance de référence introuvable (${identifier})` : `Tendance de référence introuvable`;
    super(msg, 'INT_BENCHMARK_TENDANCE_NOT_FOUND', 404);
  }
}

export class IntBenchmarkTendanceCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de tendance de référence (${identifier})` : `Erreur de création de tendance de référence`;
    super(msg, 'INT_BENCHMARK_TENDANCE_CREATE', 500);
  }
}

export class IntBenchmarkTendanceUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de tendance de référence (${identifier})` : `Erreur de mise à jour de tendance de référence`;
    super(msg, 'INT_BENCHMARK_TENDANCE_UPDATE', 500);
  }
}

export class IntBenchmarkTendanceDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de tendance de référence (${identifier})` : `Erreur de suppression de tendance de référence`;
    super(msg, 'INT_BENCHMARK_TENDANCE_DELETE', 500);
  }
}

export class IntBenchmarkEvolutionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évolution de référence introuvable (${identifier})` : `Évolution de référence introuvable`;
    super(msg, 'INT_BENCHMARK_EVOLUTION_NOT_FOUND', 404);
  }
}

export class IntBenchmarkEvolutionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de évolution de référence (${identifier})` : `Erreur de création de évolution de référence`;
    super(msg, 'INT_BENCHMARK_EVOLUTION_CREATE', 500);
  }
}

export class IntBenchmarkEvolutionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de évolution de référence (${identifier})` : `Erreur de mise à jour de évolution de référence`;
    super(msg, 'INT_BENCHMARK_EVOLUTION_UPDATE', 500);
  }
}

export class IntBenchmarkEvolutionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de évolution de référence (${identifier})` : `Erreur de suppression de évolution de référence`;
    super(msg, 'INT_BENCHMARK_EVOLUTION_DELETE', 500);
  }
}

export class IntBenchmarkGapNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Écart de référence introuvable (${identifier})` : `Écart de référence introuvable`;
    super(msg, 'INT_BENCHMARK_GAP_NOT_FOUND', 404);
  }
}

export class IntBenchmarkGapCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de écart de référence (${identifier})` : `Erreur de création de écart de référence`;
    super(msg, 'INT_BENCHMARK_GAP_CREATE', 500);
  }
}

export class IntBenchmarkGapUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de écart de référence (${identifier})` : `Erreur de mise à jour de écart de référence`;
    super(msg, 'INT_BENCHMARK_GAP_UPDATE', 500);
  }
}

export class IntBenchmarkGapDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de écart de référence (${identifier})` : `Erreur de suppression de écart de référence`;
    super(msg, 'INT_BENCHMARK_GAP_DELETE', 500);
  }
}

export class IntScenarioNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Scénario introuvable (${identifier})` : `Scénario introuvable`;
    super(msg, 'INT_SCENARIO_NOT_FOUND', 404);
  }
}

export class IntScenarioCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de scénario (${identifier})` : `Erreur de création de scénario`;
    super(msg, 'INT_SCENARIO_CREATE', 500);
  }
}

export class IntScenarioUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de scénario (${identifier})` : `Erreur de mise à jour de scénario`;
    super(msg, 'INT_SCENARIO_UPDATE', 500);
  }
}

export class IntScenarioDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de scénario (${identifier})` : `Erreur de suppression de scénario`;
    super(msg, 'INT_SCENARIO_DELETE', 500);
  }
}

export class IntScenarioSimulationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Simulation de scénario introuvable (${identifier})` : `Simulation de scénario introuvable`;
    super(msg, 'INT_SCENARIO_SIMULATION_NOT_FOUND', 404);
  }
}

export class IntScenarioSimulationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de simulation de scénario (${identifier})` : `Erreur de création de simulation de scénario`;
    super(msg, 'INT_SCENARIO_SIMULATION_CREATE', 500);
  }
}

export class IntScenarioSimulationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de simulation de scénario (${identifier})` : `Erreur de mise à jour de simulation de scénario`;
    super(msg, 'INT_SCENARIO_SIMULATION_UPDATE', 500);
  }
}

export class IntScenarioSimulationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de simulation de scénario (${identifier})` : `Erreur de suppression de simulation de scénario`;
    super(msg, 'INT_SCENARIO_SIMULATION_DELETE', 500);
  }
}

export class IntScenarioResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résultat de scénario introuvable (${identifier})` : `Résultat de scénario introuvable`;
    super(msg, 'INT_SCENARIO_RESULT_NOT_FOUND', 404);
  }
}

export class IntScenarioResultCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de résultat de scénario (${identifier})` : `Erreur de création de résultat de scénario`;
    super(msg, 'INT_SCENARIO_RESULT_CREATE', 500);
  }
}

export class IntScenarioResultUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de résultat de scénario (${identifier})` : `Erreur de mise à jour de résultat de scénario`;
    super(msg, 'INT_SCENARIO_RESULT_UPDATE', 500);
  }
}

export class IntScenarioResultDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de résultat de scénario (${identifier})` : `Erreur de suppression de résultat de scénario`;
    super(msg, 'INT_SCENARIO_RESULT_DELETE', 500);
  }
}

export class IntScenarioCostNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Coût du scénario introuvable (${identifier})` : `Coût du scénario introuvable`;
    super(msg, 'INT_SCENARIO_COST_NOT_FOUND', 404);
  }
}

export class IntScenarioCostCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de coût du scénario (${identifier})` : `Erreur de création de coût du scénario`;
    super(msg, 'INT_SCENARIO_COST_CREATE', 500);
  }
}

export class IntScenarioCostUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de coût du scénario (${identifier})` : `Erreur de mise à jour de coût du scénario`;
    super(msg, 'INT_SCENARIO_COST_UPDATE', 500);
  }
}

export class IntScenarioCostDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de coût du scénario (${identifier})` : `Erreur de suppression de coût du scénario`;
    super(msg, 'INT_SCENARIO_COST_DELETE', 500);
  }
}

export class IntScenarioImpactNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Impact du scénario introuvable (${identifier})` : `Impact du scénario introuvable`;
    super(msg, 'INT_SCENARIO_IMPACT_NOT_FOUND', 404);
  }
}

export class IntScenarioImpactCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de impact du scénario (${identifier})` : `Erreur de création de impact du scénario`;
    super(msg, 'INT_SCENARIO_IMPACT_CREATE', 500);
  }
}

export class IntScenarioImpactUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de impact du scénario (${identifier})` : `Erreur de mise à jour de impact du scénario`;
    super(msg, 'INT_SCENARIO_IMPACT_UPDATE', 500);
  }
}

export class IntScenarioImpactDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de impact du scénario (${identifier})` : `Erreur de suppression de impact du scénario`;
    super(msg, 'INT_SCENARIO_IMPACT_DELETE', 500);
  }
}

export class IntScenarioProjectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Projection de scénario introuvable (${identifier})` : `Projection de scénario introuvable`;
    super(msg, 'INT_SCENARIO_PROJECTION_NOT_FOUND', 404);
  }
}

export class IntScenarioProjectionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de projection de scénario (${identifier})` : `Erreur de création de projection de scénario`;
    super(msg, 'INT_SCENARIO_PROJECTION_CREATE', 500);
  }
}

export class IntScenarioProjectionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de projection de scénario (${identifier})` : `Erreur de mise à jour de projection de scénario`;
    super(msg, 'INT_SCENARIO_PROJECTION_UPDATE', 500);
  }
}

export class IntScenarioProjectionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de projection de scénario (${identifier})` : `Erreur de suppression de projection de scénario`;
    super(msg, 'INT_SCENARIO_PROJECTION_DELETE', 500);
  }
}

export class IntScenarioRoiNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `ROI du scénario introuvable (${identifier})` : `ROI du scénario introuvable`;
    super(msg, 'INT_SCENARIO_ROI_NOT_FOUND', 404);
  }
}

export class IntScenarioRoiCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de roi du scénario (${identifier})` : `Erreur de création de roi du scénario`;
    super(msg, 'INT_SCENARIO_ROI_CREATE', 500);
  }
}

export class IntScenarioRoiUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de roi du scénario (${identifier})` : `Erreur de mise à jour de roi du scénario`;
    super(msg, 'INT_SCENARIO_ROI_UPDATE', 500);
  }
}

export class IntScenarioRoiDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de roi du scénario (${identifier})` : `Erreur de suppression de roi du scénario`;
    super(msg, 'INT_SCENARIO_ROI_DELETE', 500);
  }
}

export class IntAiChatSessionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Session de chat IA introuvable (${identifier})` : `Session de chat IA introuvable`;
    super(msg, 'INT_AI_CHAT_SESSION_NOT_FOUND', 404);
  }
}

export class IntAiChatSessionCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de session de chat ia (${identifier})` : `Erreur de création de session de chat ia`;
    super(msg, 'INT_AI_CHAT_SESSION_CREATE', 500);
  }
}

export class IntAiChatSessionUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de session de chat ia (${identifier})` : `Erreur de mise à jour de session de chat ia`;
    super(msg, 'INT_AI_CHAT_SESSION_UPDATE', 500);
  }
}

export class IntAiChatSessionDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de session de chat ia (${identifier})` : `Erreur de suppression de session de chat ia`;
    super(msg, 'INT_AI_CHAT_SESSION_DELETE', 500);
  }
}

export class IntAiChatMessageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message de chat IA introuvable (${identifier})` : `Message de chat IA introuvable`;
    super(msg, 'INT_AI_CHAT_MESSAGE_NOT_FOUND', 404);
  }
}

export class IntAiChatMessageCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de message de chat ia (${identifier})` : `Erreur de création de message de chat ia`;
    super(msg, 'INT_AI_CHAT_MESSAGE_CREATE', 500);
  }
}

export class IntAiChatMessageUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de message de chat ia (${identifier})` : `Erreur de mise à jour de message de chat ia`;
    super(msg, 'INT_AI_CHAT_MESSAGE_UPDATE', 500);
  }
}

export class IntAiChatMessageDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de message de chat ia (${identifier})` : `Erreur de suppression de message de chat ia`;
    super(msg, 'INT_AI_CHAT_MESSAGE_DELETE', 500);
  }
}

export class IntAiChatContextNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contexte de chat IA introuvable (${identifier})` : `Contexte de chat IA introuvable`;
    super(msg, 'INT_AI_CHAT_CONTEXT_NOT_FOUND', 404);
  }
}

export class IntAiChatContextCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de contexte de chat ia (${identifier})` : `Erreur de création de contexte de chat ia`;
    super(msg, 'INT_AI_CHAT_CONTEXT_CREATE', 500);
  }
}

export class IntAiChatContextUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de contexte de chat ia (${identifier})` : `Erreur de mise à jour de contexte de chat ia`;
    super(msg, 'INT_AI_CHAT_CONTEXT_UPDATE', 500);
  }
}

export class IntAiChatContextDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de contexte de chat ia (${identifier})` : `Erreur de suppression de contexte de chat ia`;
    super(msg, 'INT_AI_CHAT_CONTEXT_DELETE', 500);
  }
}

export class IntAiChatFeedbackNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Retour de chat IA introuvable (${identifier})` : `Retour de chat IA introuvable`;
    super(msg, 'INT_AI_CHAT_FEEDBACK_NOT_FOUND', 404);
  }
}

export class IntAiChatFeedbackCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de retour de chat ia (${identifier})` : `Erreur de création de retour de chat ia`;
    super(msg, 'INT_AI_CHAT_FEEDBACK_CREATE', 500);
  }
}

export class IntAiChatFeedbackUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de retour de chat ia (${identifier})` : `Erreur de mise à jour de retour de chat ia`;
    super(msg, 'INT_AI_CHAT_FEEDBACK_UPDATE', 500);
  }
}

export class IntAiChatFeedbackDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de retour de chat ia (${identifier})` : `Erreur de suppression de retour de chat ia`;
    super(msg, 'INT_AI_CHAT_FEEDBACK_DELETE', 500);
  }
}

export class IntWarningRuleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Règle d'alerte introuvable (${identifier})` : `Règle d'alerte introuvable`;
    super(msg, 'INT_WARNING_RULE_NOT_FOUND', 404);
  }
}

export class IntWarningRuleCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de règle d'alerte (${identifier})` : `Erreur de création de règle d'alerte`;
    super(msg, 'INT_WARNING_RULE_CREATE', 500);
  }
}

export class IntWarningRuleUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de règle d'alerte (${identifier})` : `Erreur de mise à jour de règle d'alerte`;
    super(msg, 'INT_WARNING_RULE_UPDATE', 500);
  }
}

export class IntWarningRuleDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de règle d'alerte (${identifier})` : `Erreur de suppression de règle d'alerte`;
    super(msg, 'INT_WARNING_RULE_DELETE', 500);
  }
}

export class IntWarningEscalationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Escalade d'alerte introuvable (${identifier})` : `Escalade d'alerte introuvable`;
    super(msg, 'INT_WARNING_ESCALATION_NOT_FOUND', 404);
  }
}

export class IntWarningEscalationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de escalade d'alerte (${identifier})` : `Erreur de création de escalade d'alerte`;
    super(msg, 'INT_WARNING_ESCALATION_CREATE', 500);
  }
}

export class IntWarningEscalationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de escalade d'alerte (${identifier})` : `Erreur de mise à jour de escalade d'alerte`;
    super(msg, 'INT_WARNING_ESCALATION_UPDATE', 500);
  }
}

export class IntWarningEscalationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de escalade d'alerte (${identifier})` : `Erreur de suppression de escalade d'alerte`;
    super(msg, 'INT_WARNING_ESCALATION_DELETE', 500);
  }
}

export class IntWarningNotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification d'alerte introuvable (${identifier})` : `Notification d'alerte introuvable`;
    super(msg, 'INT_WARNING_NOTIFICATION_NOT_FOUND', 404);
  }
}

export class IntWarningNotificationCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de notification d'alerte (${identifier})` : `Erreur de création de notification d'alerte`;
    super(msg, 'INT_WARNING_NOTIFICATION_CREATE', 500);
  }
}

export class IntWarningNotificationUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de notification d'alerte (${identifier})` : `Erreur de mise à jour de notification d'alerte`;
    super(msg, 'INT_WARNING_NOTIFICATION_UPDATE', 500);
  }
}

export class IntWarningNotificationDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de notification d'alerte (${identifier})` : `Erreur de suppression de notification d'alerte`;
    super(msg, 'INT_WARNING_NOTIFICATION_DELETE', 500);
  }
}

export class IntStudentAtRiskNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Étudiant à risque introuvable (${identifier})` : `Étudiant à risque introuvable`;
    super(msg, 'INT_STUDENT_AT_RISK_NOT_FOUND', 404);
  }
}

export class IntStudentAtRiskCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de étudiant à risque (${identifier})` : `Erreur de création de étudiant à risque`;
    super(msg, 'INT_STUDENT_AT_RISK_CREATE', 500);
  }
}

export class IntStudentAtRiskUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de étudiant à risque (${identifier})` : `Erreur de mise à jour de étudiant à risque`;
    super(msg, 'INT_STUDENT_AT_RISK_UPDATE', 500);
  }
}

export class IntStudentAtRiskDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de étudiant à risque (${identifier})` : `Erreur de suppression de étudiant à risque`;
    super(msg, 'INT_STUDENT_AT_RISK_DELETE', 500);
  }
}

export class IntTeacherInDifficultyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Enseignant en difficulté introuvable (${identifier})` : `Enseignant en difficulté introuvable`;
    super(msg, 'INT_TEACHER_IN_DIFFICULTY_NOT_FOUND', 404);
  }
}

export class IntTeacherInDifficultyCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de enseignant en difficulté (${identifier})` : `Erreur de création de enseignant en difficulté`;
    super(msg, 'INT_TEACHER_IN_DIFFICULTY_CREATE', 500);
  }
}

export class IntTeacherInDifficultyUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de enseignant en difficulté (${identifier})` : `Erreur de mise à jour de enseignant en difficulté`;
    super(msg, 'INT_TEACHER_IN_DIFFICULTY_UPDATE', 500);
  }
}

export class IntTeacherInDifficultyDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de enseignant en difficulté (${identifier})` : `Erreur de suppression de enseignant en difficulté`;
    super(msg, 'INT_TEACHER_IN_DIFFICULTY_DELETE', 500);
  }
}

export class IntLowPerformanceClassNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Classe à faible performance introuvable (${identifier})` : `Classe à faible performance introuvable`;
    super(msg, 'INT_LOW_PERFORMANCE_CLASS_NOT_FOUND', 404);
  }
}

export class IntLowPerformanceClassCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de classe à faible performance (${identifier})` : `Erreur de création de classe à faible performance`;
    super(msg, 'INT_LOW_PERFORMANCE_CLASS_CREATE', 500);
  }
}

export class IntLowPerformanceClassUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de classe à faible performance (${identifier})` : `Erreur de mise à jour de classe à faible performance`;
    super(msg, 'INT_LOW_PERFORMANCE_CLASS_UPDATE', 500);
  }
}

export class IntLowPerformanceClassDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de classe à faible performance (${identifier})` : `Erreur de suppression de classe à faible performance`;
    super(msg, 'INT_LOW_PERFORMANCE_CLASS_DELETE', 500);
  }
}

export class IntFinancialDeclineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déclin financier introuvable (${identifier})` : `Déclin financier introuvable`;
    super(msg, 'INT_FINANCIAL_DECLINE_NOT_FOUND', 404);
  }
}

export class IntFinancialDeclineCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de déclin financier (${identifier})` : `Erreur de création de déclin financier`;
    super(msg, 'INT_FINANCIAL_DECLINE_CREATE', 500);
  }
}

export class IntFinancialDeclineUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de déclin financier (${identifier})` : `Erreur de mise à jour de déclin financier`;
    super(msg, 'INT_FINANCIAL_DECLINE_UPDATE', 500);
  }
}

export class IntFinancialDeclineDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de déclin financier (${identifier})` : `Erreur de suppression de déclin financier`;
    super(msg, 'INT_FINANCIAL_DECLINE_DELETE', 500);
  }
}

export class IntAbsenteeismEpidemicNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Épidémie d'absentéisme introuvable (${identifier})` : `Épidémie d'absentéisme introuvable`;
    super(msg, 'INT_ABSENTEEISM_EPIDEMIC_NOT_FOUND', 404);
  }
}

export class IntAbsenteeismEpidemicCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de épidémie d'absentéisme (${identifier})` : `Erreur de création de épidémie d'absentéisme`;
    super(msg, 'INT_ABSENTEEISM_EPIDEMIC_CREATE', 500);
  }
}

export class IntAbsenteeismEpidemicUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de épidémie d'absentéisme (${identifier})` : `Erreur de mise à jour de épidémie d'absentéisme`;
    super(msg, 'INT_ABSENTEEISM_EPIDEMIC_UPDATE', 500);
  }
}

export class IntAbsenteeismEpidemicDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de épidémie d'absentéisme (${identifier})` : `Erreur de suppression de épidémie d'absentéisme`;
    super(msg, 'INT_ABSENTEEISM_EPIDEMIC_DELETE', 500);
  }
}

export class IntPotentialFraudNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fraude potentielle introuvable (${identifier})` : `Fraude potentielle introuvable`;
    super(msg, 'INT_POTENTIAL_FRAUD_NOT_FOUND', 404);
  }
}

export class IntPotentialFraudCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de fraude potentielle (${identifier})` : `Erreur de création de fraude potentielle`;
    super(msg, 'INT_POTENTIAL_FRAUD_CREATE', 500);
  }
}

export class IntPotentialFraudUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de fraude potentielle (${identifier})` : `Erreur de mise à jour de fraude potentielle`;
    super(msg, 'INT_POTENTIAL_FRAUD_UPDATE', 500);
  }
}

export class IntPotentialFraudDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de fraude potentielle (${identifier})` : `Erreur de suppression de fraude potentielle`;
    super(msg, 'INT_POTENTIAL_FRAUD_DELETE', 500);
  }
}

export class IntCyberAttackNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Attaque informatique introuvable (${identifier})` : `Attaque informatique introuvable`;
    super(msg, 'INT_CYBER_ATTACK_NOT_FOUND', 404);
  }
}

export class IntCyberAttackCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de attaque informatique (${identifier})` : `Erreur de création de attaque informatique`;
    super(msg, 'INT_CYBER_ATTACK_CREATE', 500);
  }
}

export class IntCyberAttackUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de attaque informatique (${identifier})` : `Erreur de mise à jour de attaque informatique`;
    super(msg, 'INT_CYBER_ATTACK_UPDATE', 500);
  }
}

export class IntCyberAttackDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de attaque informatique (${identifier})` : `Erreur de suppression de attaque informatique`;
    super(msg, 'INT_CYBER_ATTACK_DELETE', 500);
  }
}

export class IntSecurityIncidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Incident de sécurité introuvable (${identifier})` : `Incident de sécurité introuvable`;
    super(msg, 'INT_SECURITY_INCIDENT_NOT_FOUND', 404);
  }
}

export class IntSecurityIncidentCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de incident de sécurité (${identifier})` : `Erreur de création de incident de sécurité`;
    super(msg, 'INT_SECURITY_INCIDENT_CREATE', 500);
  }
}

export class IntSecurityIncidentUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de incident de sécurité (${identifier})` : `Erreur de mise à jour de incident de sécurité`;
    super(msg, 'INT_SECURITY_INCIDENT_UPDATE', 500);
  }
}

export class IntSecurityIncidentDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de incident de sécurité (${identifier})` : `Erreur de suppression de incident de sécurité`;
    super(msg, 'INT_SECURITY_INCIDENT_DELETE', 500);
  }
}

export class IntAiRiskReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de risque IA introuvable (${identifier})` : `Rapport de risque IA introuvable`;
    super(msg, 'INT_AI_RISK_REPORT_NOT_FOUND', 404);
  }
}

export class IntAiRiskReportCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de rapport de risque ia (${identifier})` : `Erreur de création de rapport de risque ia`;
    super(msg, 'INT_AI_RISK_REPORT_CREATE', 500);
  }
}

export class IntAiRiskReportUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de rapport de risque ia (${identifier})` : `Erreur de mise à jour de rapport de risque ia`;
    super(msg, 'INT_AI_RISK_REPORT_UPDATE', 500);
  }
}

export class IntAiRiskReportDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de rapport de risque ia (${identifier})` : `Erreur de suppression de rapport de risque ia`;
    super(msg, 'INT_AI_RISK_REPORT_DELETE', 500);
  }
}

export class IntIntelligenceAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit d'intelligence introuvable (${identifier})` : `Audit d'intelligence introuvable`;
    super(msg, 'INT_INTELLIGENCE_AUDIT_NOT_FOUND', 404);
  }
}

export class IntIntelligenceAuditCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de audit d'intelligence (${identifier})` : `Erreur de création de audit d'intelligence`;
    super(msg, 'INT_INTELLIGENCE_AUDIT_CREATE', 500);
  }
}

export class IntIntelligenceAuditUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de audit d'intelligence (${identifier})` : `Erreur de mise à jour de audit d'intelligence`;
    super(msg, 'INT_INTELLIGENCE_AUDIT_UPDATE', 500);
  }
}

export class IntIntelligenceAuditDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de audit d'intelligence (${identifier})` : `Erreur de suppression de audit d'intelligence`;
    super(msg, 'INT_INTELLIGENCE_AUDIT_DELETE', 500);
  }
}

export class IntPredictionAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit de prédiction introuvable (${identifier})` : `Audit de prédiction introuvable`;
    super(msg, 'INT_PREDICTION_AUDIT_NOT_FOUND', 404);
  }
}

export class IntPredictionAuditCreateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de création de audit de prédiction (${identifier})` : `Erreur de création de audit de prédiction`;
    super(msg, 'INT_PREDICTION_AUDIT_CREATE', 500);
  }
}

export class IntPredictionAuditUpdateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de mise à jour de audit de prédiction (${identifier})` : `Erreur de mise à jour de audit de prédiction`;
    super(msg, 'INT_PREDICTION_AUDIT_UPDATE', 500);
  }
}

export class IntPredictionAuditDeleteError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de suppression de audit de prédiction (${identifier})` : `Erreur de suppression de audit de prédiction`;
    super(msg, 'INT_PREDICTION_AUDIT_DELETE', 500);
  }
}

export class IntelligenceEngineError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur du moteur d'intelligence (${identifier})` : `Erreur du moteur d'intelligence`;
    super(msg, 'INTELLIGENCE_ENGINE_ERROR', 500);
  }
}

export class IntelligenceValidationError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de validation (${identifier})` : `Erreur de validation`;
    super(msg, 'INTELLIGENCE_VALIDATION_ERROR', 400);
  }
}

export class IntelligencePermissionError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de permission (${identifier})` : `Erreur de permission`;
    super(msg, 'INTELLIGENCE_PERMISSION_ERROR', 403);
  }
}

export class IntelligenceRateLimitError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Limite de débit dépassée (${identifier})` : `Limite de débit dépassée`;
    super(msg, 'INTELLIGENCE_RATE_LIMIT_ERROR', 429);
  }
}

export class IntelligenceTimeoutError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Délai d'attente dépassé (${identifier})` : `Délai d'attente dépassé`;
    super(msg, 'INTELLIGENCE_TIMEOUT_ERROR', 504);
  }
}

export class IntelligenceDataCorruptionError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Données corrompues (${identifier})` : `Données corrompues`;
    super(msg, 'INTELLIGENCE_DATA_CORRUPTION_ERROR', 500);
  }
}

export class IntelligenceModelNotReadyError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Modèle non prêt (${identifier})` : `Modèle non prêt`;
    super(msg, 'INTELLIGENCE_MODEL_NOT_READY_ERROR', 503);
  }
}

export class IntelligenceQueryFailedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Échec de la requête (${identifier})` : `Échec de la requête`;
    super(msg, 'INTELLIGENCE_QUERY_FAILED_ERROR', 500);
  }
}

export class IntelligenceReportGenerationError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur de génération de rapport (${identifier})` : `Erreur de génération de rapport`;
    super(msg, 'INTELLIGENCE_REPORT_GENERATION_ERROR', 500);
  }
}

export class IntelligenceExportError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Erreur d'exportation (${identifier})` : `Erreur d'exportation`;
    super(msg, 'INTELLIGENCE_EXPORT_ERROR', 500);
  }
}
