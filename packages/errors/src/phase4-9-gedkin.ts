import { AppError } from './AppError';

// ─── Module 1 — Data Fabric ─────────────────────────────────────────────────
export class GedkinDataDomainNotFoundError extends AppError {
  constructor(message = 'Domaine de données introuvable', code = 'GEDKIN_DATA_DOMAIN_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinDataDomainError extends AppError {
  constructor(message = 'Erreur domaine de données', code = 'GEDKIN_DATA_DOMAIN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDataDomainConflictError extends AppError {
  constructor(message = 'Conflit de domaine de données', code = 'GEDKIN_DATA_DOMAIN_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GedkinDataProductNotFoundError extends AppError {
  constructor(message = 'Produit de données introuvable', code = 'GEDKIN_DATA_PRODUCT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinDataProductError extends AppError {
  constructor(message = 'Erreur produit de données', code = 'GEDKIN_DATA_PRODUCT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDataProductConflictError extends AppError {
  constructor(message = 'Conflit de produit de données', code = 'GEDKIN_DATA_PRODUCT_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GedkinDataContractError extends AppError {
  constructor(message = 'Erreur contrat de données', code = 'GEDKIN_DATA_CONTRACT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDataQualityError extends AppError {
  constructor(message = 'Erreur qualité de données', code = 'GEDKIN_DATA_QUALITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDataLineageError extends AppError {
  constructor(message = 'Erreur lignée de données', code = 'GEDKIN_DATA_LINEAGE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDataSourceNotFoundError extends AppError {
  constructor(message = 'Source de données introuvable', code = 'GEDKIN_DATA_SOURCE_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinDataSourceError extends AppError {
  constructor(message = 'Erreur source de données', code = 'GEDKIN_DATA_SOURCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 2 — Knowledge Graph ─────────────────────────────────────────────
export class GedkinKnowledgeEntityNotFoundError extends AppError {
  constructor(message = 'Entité de connaissance introuvable', code = 'GEDKIN_KNOWLEDGE_ENTITY_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinKnowledgeEntityError extends AppError {
  constructor(message = 'Erreur entité de connaissance', code = 'GEDKIN_KNOWLEDGE_ENTITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinKnowledgeEntityConflictError extends AppError {
  constructor(message = 'Conflit d\'entité de connaissance', code = 'GEDKIN_KNOWLEDGE_ENTITY_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GedkinKnowledgeRelationError extends AppError {
  constructor(message = 'Erreur relation de connaissance', code = 'GEDKIN_KNOWLEDGE_RELATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinGraphSnapshotError extends AppError {
  constructor(message = 'Erreur snapshot de graphe', code = 'GEDKIN_GRAPH_SNAPSHOT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinEntityResolutionError extends AppError {
  constructor(message = 'Erreur résolution d\'entité', code = 'GEDKIN_ENTITY_RESOLUTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinGraphTraversalError extends AppError {
  constructor(message = 'Erreur parcours de graphe', code = 'GEDKIN_GRAPH_TRAVERSAL', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 3 — Semantic ────────────────────────────────────────────────────
export class GedkinSemanticConceptNotFoundError extends AppError {
  constructor(message = 'Concept sémantique introuvable', code = 'GEDKIN_SEMANTIC_CONCEPT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinSemanticConceptError extends AppError {
  constructor(message = 'Erreur concept sémantique', code = 'GEDKIN_SEMANTIC_CONCEPT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinOntologyNotFoundError extends AppError {
  constructor(message = 'Ontologie introuvable', code = 'GEDKIN_ONTOLOGY_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinOntologyError extends AppError {
  constructor(message = 'Erreur ontologie', code = 'GEDKIN_ONTOLOGY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinTaxonomyNotFoundError extends AppError {
  constructor(message = 'Taxonomie introuvable', code = 'GEDKIN_TAXONOMY_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinTaxonomyError extends AppError {
  constructor(message = 'Erreur taxonomie', code = 'GEDKIN_TAXONOMY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinEmbeddingError extends AppError {
  constructor(message = 'Erreur d\'embedding', code = 'GEDKIN_EMBEDDING', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinSemanticSearchError extends AppError {
  constructor(message = 'Erreur de recherche sémantique', code = 'GEDKIN_SEMANTIC_SEARCH', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 4 — Research ────────────────────────────────────────────────────
export class GedkinResearchProjectNotFoundError extends AppError {
  constructor(message = 'Projet de recherche introuvable', code = 'GEDKIN_RESEARCH_PROJECT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinResearchProjectError extends AppError {
  constructor(message = 'Erreur projet de recherche', code = 'GEDKIN_RESEARCH_PROJECT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinPublicationNotFoundError extends AppError {
  constructor(message = 'Publication introuvable', code = 'GEDKIN_PUBLICATION_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinPublicationError extends AppError {
  constructor(message = 'Erreur publication', code = 'GEDKIN_PUBLICATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinResearcherNotFoundError extends AppError {
  constructor(message = 'Chercheur introuvable', code = 'GEDKIN_RESEARCHER_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinResearcherError extends AppError {
  constructor(message = 'Erreur chercheur', code = 'GEDKIN_RESEARCHER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinCitationError extends AppError {
  constructor(message = 'Erreur de citation', code = 'GEDKIN_CITATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinResearchTrendError extends AppError {
  constructor(message = 'Erreur tendance de recherche', code = 'GEDKIN_RESEARCH_TREND', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 5 — Observatory ─────────────────────────────────────────────────
export class GedkinIndicatorNotFoundError extends AppError {
  constructor(message = 'Indicateur introuvable', code = 'GEDKIN_INDICATOR_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinIndicatorError extends AppError {
  constructor(message = 'Erreur indicateur', code = 'GEDKIN_INDICATOR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDashboardNotFoundError extends AppError {
  constructor(message = 'Tableau de bord introuvable', code = 'GEDKIN_DASHBOARD_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinDashboardError extends AppError {
  constructor(message = 'Erreur tableau de bord', code = 'GEDKIN_DASHBOARD', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinBenchmarkNotFoundError extends AppError {
  constructor(message = 'Benchmark introuvable', code = 'GEDKIN_BENCHMARK_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinBenchmarkError extends AppError {
  constructor(message = 'Erreur benchmark', code = 'GEDKIN_BENCHMARK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinSDGAlignmentError extends AppError {
  constructor(message = 'Erreur d\'alignement ODD', code = 'GEDKIN_SDG_ALIGNMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 6 — Policy ──────────────────────────────────────────────────────
export class GedkinPolicyNotFoundError extends AppError {
  constructor(message = 'Politique introuvable', code = 'GEDKIN_POLICY_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinPolicyError extends AppError {
  constructor(message = 'Erreur politique', code = 'GEDKIN_POLICY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinPolicyConflictError extends AppError {
  constructor(message = 'Conflit de politique', code = 'GEDKIN_POLICY_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GedkinPolicySimulationError extends AppError {
  constructor(message = 'Erreur simulation de politique', code = 'GEDKIN_POLICY_SIMULATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDecisionRecommendationError extends AppError {
  constructor(message = 'Erreur recommandation de décision', code = 'GEDKIN_DECISION_RECOMMENDATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinImpactAnalysisError extends AppError {
  constructor(message = 'Erreur analyse d\'impact', code = 'GEDKIN_IMPACT_ANALYSIS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 7 — Forecasting ─────────────────────────────────────────────────
export class GedkinForecastNotFoundError extends AppError {
  constructor(message = 'Prévision introuvable', code = 'GEDKIN_FORECAST_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinForecastError extends AppError {
  constructor(message = 'Erreur de prévision', code = 'GEDKIN_FORECAST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinForecastFailedError extends AppError {
  constructor(message = 'Échec de prévision', code = 'GEDKIN_FORECAST_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinForecastModelError extends AppError {
  constructor(message = 'Erreur de modèle de prévision', code = 'GEDKIN_FORECAST_MODEL', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDriftDetectedError extends AppError {
  constructor(message = 'Dérive détectée', code = 'GEDKIN_DRIFT_DETECTED', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GedkinCapacityForecastError extends AppError {
  constructor(message = 'Erreur de prévision de capacité', code = 'GEDKIN_CAPACITY_FORECAST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 8 — AI Agents ───────────────────────────────────────────────────
export class GedkinAgentNotFoundError extends AppError {
  constructor(message = 'Agent IA introuvable', code = 'GEDKIN_AGENT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinAgentError extends AppError {
  constructor(message = 'Erreur agent IA', code = 'GEDKIN_AGENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinAgentInactiveError extends AppError {
  constructor(message = 'Agent IA inactif', code = 'GEDKIN_AGENT_INACTIVE', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GedkinTaskNotFoundError extends AppError {
  constructor(message = 'Tâche introuvable', code = 'GEDKIN_TASK_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinTaskError extends AppError {
  constructor(message = 'Erreur tâche', code = 'GEDKIN_TASK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinTaskFailedError extends AppError {
  constructor(message = 'Échec de tâche', code = 'GEDKIN_TASK_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinToolCallError extends AppError {
  constructor(message = 'Erreur d\'appel d\'outil', code = 'GEDKIN_TOOL_CALL', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinAgentMemoryError extends AppError {
  constructor(message = 'Erreur mémoire agent', code = 'GEDKIN_AGENT_MEMORY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 9 — Research Lab ────────────────────────────────────────────────
export class GedkinExperimentNotFoundError extends AppError {
  constructor(message = 'Expérience introuvable', code = 'GEDKIN_EXPERIMENT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinExperimentError extends AppError {
  constructor(message = 'Erreur expérience', code = 'GEDKIN_EXPERIMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinExperimentFailedError extends AppError {
  constructor(message = 'Échec d\'expérience', code = 'GEDKIN_EXPERIMENT_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinDatasetNotFoundError extends AppError {
  constructor(message = 'Jeu de données introuvable', code = 'GEDKIN_DATASET_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinDatasetError extends AppError {
  constructor(message = 'Erreur jeu de données', code = 'GEDKIN_DATASET', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinModelExperimentError extends AppError {
  constructor(message = 'Erreur modèle d\'expérience', code = 'GEDKIN_MODEL_EXPERIMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinBenchmarkError_ extends AppError {
  constructor(message = 'Erreur benchmark lab', code = 'GEDKIN_BENCHMARK_LAB', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 10 — Marketplace ────────────────────────────────────────────────
export class GedkinMarketplaceProductNotFoundError extends AppError {
  constructor(message = 'Produit marketplace introuvable', code = 'GEDKIN_MARKETPLACE_PRODUCT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinMarketplaceProductError extends AppError {
  constructor(message = 'Erreur produit marketplace', code = 'GEDKIN_MARKETPLACE_PRODUCT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinMarketplaceConflictError extends AppError {
  constructor(message = 'Conflit marketplace', code = 'GEDKIN_MARKETPLACE_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GedkinSubscriptionError extends AppError {
  constructor(message = 'Erreur d\'abonnement', code = 'GEDKIN_SUBSCRIPTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinAccessDeniedError extends AppError {
  constructor(message = 'Accès refusé', code = 'GEDKIN_ACCESS_DENIED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GedkinSLAError extends AppError {
  constructor(message = 'Erreur SLA', code = 'GEDKIN_SLA', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinLicensingError extends AppError {
  constructor(message = 'Erreur de licence', code = 'GEDKIN_LICENSING', statusCode = 403) {
    super(message, code, statusCode);
  }
}

// ─── Module 11 — Simulation ─────────────────────────────────────────────────
export class GedkinSimulationNotFoundError extends AppError {
  constructor(message = 'Simulation introuvable', code = 'GEDKIN_SIMULATION_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinSimulationError extends AppError {
  constructor(message = 'Erreur simulation', code = 'GEDKIN_SIMULATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinSimulationFailedError extends AppError {
  constructor(message = 'Échec de simulation', code = 'GEDKIN_SIMULATION_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinScenarioNotFoundError extends AppError {
  constructor(message = 'Scénario introuvable', code = 'GEDKIN_SCENARIO_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinScenarioError extends AppError {
  constructor(message = 'Erreur scénario', code = 'GEDKIN_SCENARIO', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinScenarioRunError extends AppError {
  constructor(message = 'Erreur exécution de scénario', code = 'GEDKIN_SCENARIO_RUN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinSensitivityError extends AppError {
  constructor(message = 'Erreur d\'analyse de sensibilité', code = 'GEDKIN_SENSITIVITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 12 — Copilot ────────────────────────────────────────────────────
export class GedkinCopilotQueryError extends AppError {
  constructor(message = 'Erreur de requête copilote', code = 'GEDKIN_COPILOT_QUERY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinCopilotResponseError extends AppError {
  constructor(message = 'Erreur de réponse copilote', code = 'GEDKIN_COPILOT_RESPONSE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinCopilotApprovalError extends AppError {
  constructor(message = 'Erreur d\'approbation copilote', code = 'GEDKIN_COPILOT_APPROVAL', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinCopilotSourceError extends AppError {
  constructor(message = 'Erreur de source copilote', code = 'GEDKIN_COPILOT_SOURCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinCopilotConversationError extends AppError {
  constructor(message = 'Erreur de conversation copilote', code = 'GEDKIN_COPILOT_CONVERSATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GedkinSQLInjectionBlockedError extends AppError {
  constructor(message = 'Injection SQL bloquée', code = 'GEDKIN_SQL_INJECTION_BLOCKED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

// ─── Common ─────────────────────────────────────────────────────────────────
export class GedkinValidationError extends AppError {
  constructor(message = 'Erreur de validation', code = 'GEDKIN_VALIDATION', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GedkinNotFoundError extends AppError {
  constructor(message = 'Ressource introuvable', code = 'GEDKIN_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GedkinPermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes', code = 'GEDKIN_PERMISSION', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GedkinConflictError extends AppError {
  constructor(message = 'Conflit de données', code = 'GEDKIN_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GedkinRateLimitError extends AppError {
  constructor(message = 'Limite de requêtes atteinte', code = 'GEDKIN_RATE_LIMIT', statusCode = 429) {
    super(message, code, statusCode);
  }
}

export class GedkinTimeoutError extends AppError {
  constructor(message = 'Délai dépassé', code = 'GEDKIN_TIMEOUT', statusCode = 504) {
    super(message, code, statusCode);
  }
}

export class GedkinTenantError extends AppError {
  constructor(message = 'Erreur de tenant', code = 'GEDKIN_TENANT', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GedkinAuthorizationError extends AppError {
  constructor(message = 'Erreur d\'autorisation', code = 'GEDKIN_AUTHORIZATION', statusCode = 403) {
    super(message, code, statusCode);
  }
}
