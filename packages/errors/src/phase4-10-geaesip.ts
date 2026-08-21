import { AppError } from './AppError';

// ─── Intelligence Core ───────────────────────────────────────────────────────
export class GeaesipIntelligenceCoreError extends AppError {
  constructor(message = 'Erreur du noyau d\'intelligence', code = 'GEAESIP_INTELLIGENCE_CORE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipKnowledgeFusionError extends AppError {
  constructor(message = 'Erreur de fusion de connaissances', code = 'GEAESIP_KNOWLEDGE_FUSION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipCausalReasoningError extends AppError {
  constructor(message = 'Erreur de raisonnement causal', code = 'GEAESIP_CAUSAL_REASONING', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipConfidenceError extends AppError {
  constructor(message = 'Erreur de score de confiance', code = 'GEAESIP_CONFIDENCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Control Center ──────────────────────────────────────────────────────────
export class GeaesipCockpitError extends AppError {
  constructor(message = 'Erreur du cockpit de commande', code = 'GEAESIP_COCKPIT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipAlertError extends AppError {
  constructor(message = 'Erreur d\'alerte', code = 'GEAESIP_ALERT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipDecisionQueueError extends AppError {
  constructor(message = 'Erreur de file de décisions', code = 'GEAESIP_DECISION_QUEUE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Cross-Domain ────────────────────────────────────────────────────────────
export class GeaesipCrossDomainEventError extends AppError {
  constructor(message = 'Erreur d\'événement inter-domaine', code = 'GEAESIP_CROSS_DOMAIN_EVENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipCorrelationError extends AppError {
  constructor(message = 'Erreur de corrélation', code = 'GEAESIP_CORRELATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipImpactChainError extends AppError {
  constructor(message = 'Erreur de chaîne d\'impact', code = 'GEAESIP_IMPACT_CHAIN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipSystemicRiskError extends AppError {
  constructor(message = 'Erreur de risque systémique', code = 'GEAESIP_SYSTEMIC_RISK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipDependencyGraphError extends AppError {
  constructor(message = 'Erreur de graphe de dépendances', code = 'GEAESIP_DEPENDENCY_GRAPH', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Digital Twin ────────────────────────────────────────────────────────────
export class GeaesipTwinError extends AppError {
  constructor(message = 'Erreur de jumeau numérique', code = 'GEAESIP_TWIN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipTwinSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation du jumeau', code = 'GEAESIP_TWIN_SYNC', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipTwinSimulationError extends AppError {
  constructor(message = 'Erreur de simulation du jumeau', code = 'GEAESIP_TWIN_SIMULATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Scenario ────────────────────────────────────────────────────────────────
export class GeaesipScenarioError extends AppError {
  constructor(message = 'Erreur de scénario', code = 'GEAESIP_SCENARIO', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipScenarioRunError extends AppError {
  constructor(message = 'Erreur d\'exécution de scénario', code = 'GEAESIP_SCENARIO_RUN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipScenarioComparisonError extends AppError {
  constructor(message = 'Erreur de comparaison de scénarios', code = 'GEAESIP_SCENARIO_COMPARISON', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Decision ────────────────────────────────────────────────────────────────
export class GeaesipDecisionError extends AppError {
  constructor(message = 'Erreur de décision', code = 'GEAESIP_DECISION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipDecisionApprovalError extends AppError {
  constructor(message = 'Erreur d\'approbation de décision', code = 'GEAESIP_DECISION_APPROVAL', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipDecisionAuditError extends AppError {
  constructor(message = 'Erreur d\'audit de décision', code = 'GEAESIP_DECISION_AUDIT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipApprovalRequiredError extends AppError {
  constructor(message = 'Approbation requise', code = 'GEAESIP_APPROVAL_REQUIRED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GeaesipDecisionDeniedError extends AppError {
  constructor(message = 'Décision refusée', code = 'GEAESIP_DECISION_DENIED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

// ─── Agents ──────────────────────────────────────────────────────────────────
export class GeaesipAgentRegistryError extends AppError {
  constructor(message = 'Erreur du registre d\'agents', code = 'GEAESIP_AGENT_REGISTRY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipMissionError extends AppError {
  constructor(message = 'Erreur de mission', code = 'GEAESIP_MISSION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipConsensusError extends AppError {
  constructor(message = 'Erreur de consensus', code = 'GEAESIP_CONSENSUS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipNegotiationError extends AppError {
  constructor(message = 'Erreur de négociation', code = 'GEAESIP_NEGOTIATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipDelegationError extends AppError {
  constructor(message = 'Erreur de délégation', code = 'GEAESIP_DELEGATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Workflow ────────────────────────────────────────────────────────────────
export class GeaesipWorkflowError extends AppError {
  constructor(message = 'Erreur de workflow', code = 'GEAESIP_WORKFLOW', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipTaskError extends AppError {
  constructor(message = 'Erreur de tâche', code = 'GEAESIP_TASK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipActionPlanError extends AppError {
  constructor(message = 'Erreur de plan d\'action', code = 'GEAESIP_ACTION_PLAN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution', code = 'GEAESIP_EXECUTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipRollbackError extends AppError {
  constructor(message = 'Erreur de rollback', code = 'GEAESIP_ROLLBACK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Risk ────────────────────────────────────────────────────────────────────
export class GeaesipRiskError extends AppError {
  constructor(message = 'Erreur de risque', code = 'GEAESIP_RISK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipRiskMatrixError extends AppError {
  constructor(message = 'Erreur de matrice de risques', code = 'GEAESIP_RISK_MATRIX', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipEarlyWarningError extends AppError {
  constructor(message = 'Erreur d\'alerte précoce', code = 'GEAESIP_EARLY_WARNING', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipMitigationError extends AppError {
  constructor(message = 'Erreur d\'atténuation', code = 'GEAESIP_MITIGATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Crisis ──────────────────────────────────────────────────────────────────
export class GeaesipCrisisActiveError extends AppError {
  constructor(message = 'Erreur d\'activation de crise', code = 'GEAESIP_CRISIS_ACTIVE', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GeaesipCrisisEscalationError extends AppError {
  constructor(message = 'Erreur d\'escalade de crise', code = 'GEAESIP_CRISIS_ESCALATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipCrisisCommunicationError extends AppError {
  constructor(message = 'Erreur de communication de crise', code = 'GEAESIP_CRISIS_COMMUNICATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipCrisisActiveNotFoundError extends AppError {
  constructor(message = 'Crise active introuvable', code = 'GEAESIP_CRISIS_ACTIVE_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

// ─── Resource ────────────────────────────────────────────────────────────────
export class GeaesipResourceOptimizationError extends AppError {
  constructor(message = 'Erreur d\'optimisation des ressources', code = 'GEAESIP_RESOURCE_OPTIMIZATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipAllocationError extends AppError {
  constructor(message = 'Erreur d\'allocation', code = 'GEAESIP_ALLOCATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Copilot ─────────────────────────────────────────────────────────────────
export class GeaesipCopilotError extends AppError {
  constructor(message = 'Erreur du copilote', code = 'GEAESIP_COPILOT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipCopilotExplanationError extends AppError {
  constructor(message = 'Erreur d\'explication du copilote', code = 'GEAESIP_COPILOT_EXPLANATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipSQLInjectionBlockedError_ extends AppError {
  constructor(message = 'Injection SQL bloquée', code = 'GEAESIP_SQL_INJECTION_BLOCKED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

// ─── Memory ──────────────────────────────────────────────────────────────────
export class GeaesipMemoryError extends AppError {
  constructor(message = 'Erreur de mémoire', code = 'GEAESIP_MEMORY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipMemoryAccessDeniedError extends AppError {
  constructor(message = 'Accès à la mémoire refusé', code = 'GEAESIP_MEMORY_ACCESS_DENIED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GeaesipMemoryExpiredError extends AppError {
  constructor(message = 'Mémoire expirée', code = 'GEAESIP_MEMORY_EXPIRED', statusCode = 410) {
    super(message, code, statusCode);
  }
}

// ─── Evaluation ──────────────────────────────────────────────────────────────
export class GeaesipEvaluationError extends AppError {
  constructor(message = 'Erreur d\'évaluation', code = 'GEAESIP_EVALUATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipModelEvaluationError extends AppError {
  constructor(message = 'Erreur d\'évaluation de modèle', code = 'GEAESIP_MODEL_EVALUATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipAgentEvaluationError extends AppError {
  constructor(message = 'Erreur d\'évaluation d\'agent', code = 'GEAESIP_AGENT_EVALUATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Impact ──────────────────────────────────────────────────────────────────
export class GeaesipImpactError extends AppError {
  constructor(message = 'Erreur d\'impact', code = 'GEAESIP_IMPACT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipEconomicForecastError extends AppError {
  constructor(message = 'Erreur de prévision économique', code = 'GEAESIP_ECONOMIC_FORECAST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Forecasting ─────────────────────────────────────────────────────────────
export class GeaesipForecastError_ extends AppError {
  constructor(message = 'Erreur de prévision', code = 'GEAESIP_FORECAST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipDriftDetectedError_ extends AppError {
  constructor(message = 'Dérive détectée', code = 'GEAESIP_DRIFT_DETECTED', statusCode = 400) {
    super(message, code, statusCode);
  }
}

// ─── Observatory ─────────────────────────────────────────────────────────────
export class GeaesipCompositeIndexError extends AppError {
  constructor(message = 'Erreur d\'indice composite', code = 'GEAESIP_COMPOSITE_INDEX', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipObservatoryError_ extends AppError {
  constructor(message = 'Erreur d\'observatoire', code = 'GEAESIP_OBSERVATORY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Governance ──────────────────────────────────────────────────────────────
export class GeaesipGovernanceError extends AppError {
  constructor(message = 'Erreur de gouvernance', code = 'GEAESIP_GOVERNANCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipEthicsReviewError extends AppError {
  constructor(message = 'Erreur de revue éthique', code = 'GEAESIP_ETHICS_REVIEW', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipBiasError extends AppError {
  constructor(message = 'Erreur de biais', code = 'GEAESIP_BIAS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipGovernanceViolationError extends AppError {
  constructor(message = 'Violation de gouvernance', code = 'GEAESIP_GOVERNANCE_VIOLATION', statusCode = 403) {
    super(message, code, statusCode);
  }
}

// ─── API/Events ──────────────────────────────────────────────────────────────
export class GeaesipAPIError extends AppError {
  constructor(message = 'Erreur API', code = 'GEAESIP_API', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipEventBusError extends AppError {
  constructor(message = 'Erreur du bus d\'événements', code = 'GEAESIP_EVENT_BUS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipSubscriptionError_ extends AppError {
  constructor(message = 'Erreur d\'abonnement', code = 'GEAESIP_SUBSCRIPTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Runtime ─────────────────────────────────────────────────────────────────
export class GeaesipRuntimeError extends AppError {
  constructor(message = 'Erreur d\'exécution', code = 'GEAESIP_RUNTIME', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GeaesipRuntimeExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution runtime', code = 'GEAESIP_RUNTIME_EXECUTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Common ──────────────────────────────────────────────────────────────────
export class GeaesipValidationError extends AppError {
  constructor(message = 'Erreur de validation', code = 'GEAESIP_VALIDATION', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GeaesipNotFoundError extends AppError {
  constructor(message = 'Ressource introuvable', code = 'GEAESIP_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GeaesipPermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes', code = 'GEAESIP_PERMISSION', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GeaesipConflictError extends AppError {
  constructor(message = 'Conflit de données', code = 'GEAESIP_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GeaesipRateLimitError extends AppError {
  constructor(message = 'Limite de requêtes atteinte', code = 'GEAESIP_RATE_LIMIT', statusCode = 429) {
    super(message, code, statusCode);
  }
}

export class GeaesipTimeoutError extends AppError {
  constructor(message = 'Délai dépassé', code = 'GEAESIP_TIMEOUT', statusCode = 504) {
    super(message, code, statusCode);
  }
}

export class GeaesipTenantError extends AppError {
  constructor(message = 'Erreur de tenant', code = 'GEAESIP_TENANT', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GeaesipAuthorizationError_ extends AppError {
  constructor(message = 'Erreur d\'autorisation', code = 'GEAESIP_AUTHORIZATION', statusCode = 403) {
    super(message, code, statusCode);
  }
}
