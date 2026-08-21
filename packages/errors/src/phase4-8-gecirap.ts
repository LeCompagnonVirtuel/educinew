import { AppError } from './AppError';

// ─── Module 1 — Cloud Infrastructure ────────────────────────────────────────
export class GecirapCloudProviderNotFoundError extends AppError {
  constructor(message = 'Fournisseur cloud introuvable', code = 'GECIRAP_CLOUD_PROVIDER_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudProviderError extends AppError {
  constructor(message = 'Erreur fournisseur cloud', code = 'GECIRAP_CLOUD_PROVIDER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudAccountNotFoundError extends AppError {
  constructor(message = 'Compte cloud introuvable', code = 'GECIRAP_CLOUD_ACCOUNT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudAccountError extends AppError {
  constructor(message = 'Erreur compte cloud', code = 'GECIRAP_CLOUD_ACCOUNT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudAccountConflictError extends AppError {
  constructor(message = 'Conflit de compte cloud', code = 'GECIRAP_CLOUD_ACCOUNT_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudResourceNotFoundError extends AppError {
  constructor(message = 'Ressource cloud introuvable', code = 'GECIRAP_CLOUD_RESOURCE_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudResourceError extends AppError {
  constructor(message = 'Erreur ressource cloud', code = 'GECIRAP_CLOUD_RESOURCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudRegionNotFoundError extends AppError {
  constructor(message = 'Région cloud introuvable', code = 'GECIRAP_CLOUD_REGION_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudRegionError extends AppError {
  constructor(message = 'Erreur région cloud', code = 'GECIRAP_CLOUD_REGION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudQuotaExceededError extends AppError {
  constructor(message = 'Quota cloud dépassé', code = 'GECIRAP_CLOUD_QUOTA_EXCEEDED', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudEnvironmentError extends AppError {
  constructor(message = 'Erreur environnement cloud', code = 'GECIRAP_CLOUD_ENVIRONMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudDeploymentError extends AppError {
  constructor(message = 'Erreur déploiement cloud', code = 'GECIRAP_CLOUD_DEPLOYMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudDeploymentFailedError extends AppError {
  constructor(message = 'Échec déploiement cloud', code = 'GECIRAP_CLOUD_DEPLOYMENT_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudHealthCheckError extends AppError {
  constructor(message = 'Erreur health check cloud', code = 'GECIRAP_CLOUD_HEALTH_CHECK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 2 — Multi-Region ───────────────────────────────────────────────
export class GecirapGeoRegionNotFoundError extends AppError {
  constructor(message = 'Région géographique introuvable', code = 'GECIRAP_GEO_REGION_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapGeoRegionError extends AppError {
  constructor(message = 'Erreur région géographique', code = 'GECIRAP_GEO_REGION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRegionPolicyError extends AppError {
  constructor(message = 'Erreur politique région', code = 'GECIRAP_REGION_POLICY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRegionHealthError extends AppError {
  constructor(message = 'Erreur santé région', code = 'GECIRAP_REGION_HEALTH', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapFailoverError extends AppError {
  constructor(message = 'Erreur failover', code = 'GECIRAP_FAILOVER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapFailoverFailedError extends AppError {
  constructor(message = 'Échec failover', code = 'GECIRAP_FAILOVER_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapTrafficRouteError extends AppError {
  constructor(message = 'Erreur routage trafic', code = 'GECIRAP_TRAFFIC_ROUTE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapReplicationError extends AppError {
  constructor(message = 'Erreur réplication', code = 'GECIRAP_REPLICATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapResidencyError extends AppError {
  constructor(message = 'Erreur résidence données', code = 'GECIRAP_RESIDENCY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

// ─── Module 3 — Containers ─────────────────────────────────────────────────
export class GecirapClusterNotFoundError extends AppError {
  constructor(message = 'Cluster introuvable', code = 'GECIRAP_CLUSTER_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapClusterError extends AppError {
  constructor(message = 'Erreur cluster', code = 'GECIRAP_CLUSTER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapNodeNotFoundError extends AppError {
  constructor(message = 'Nœud introuvable', code = 'GECIRAP_NODE_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapNodeError extends AppError {
  constructor(message = 'Erreur nœud', code = 'GECIRAP_NODE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapWorkloadNotFoundError extends AppError {
  constructor(message = 'Charge de travail introuvable', code = 'GECIRAP_WORKLOAD_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapWorkloadError extends AppError {
  constructor(message = 'Erreur charge de travail', code = 'GECIRAP_WORKLOAD', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapWorkloadSchedulingError extends AppError {
  constructor(message = 'Erreur planification charge de travail', code = 'GECIRAP_WORKLOAD_SCHEDULING', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapContainerError extends AppError {
  constructor(message = 'Erreur conteneur', code = 'GECIRAP_CONTAINER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapServiceError extends AppError {
  constructor(message = 'Erreur service', code = 'GECIRAP_SERVICE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapIngressError extends AppError {
  constructor(message = 'Erreur ingress', code = 'GECIRAP_INGRESS', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapNamespaceError extends AppError {
  constructor(message = 'Erreur namespace', code = 'GECIRAP_NAMESPACE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapDeploymentRollbackError extends AppError {
  constructor(message = 'Erreur retour arrière déploiement', code = 'GECIRAP_DEPLOYMENT_ROLLBACK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 4 — IaC ────────────────────────────────────────────────────────
export class GecirapTemplateNotFoundError extends AppError {
  constructor(message = 'Modèle IaC introuvable', code = 'GECIRAP_TEMPLATE_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapTemplateError extends AppError {
  constructor(message = 'Erreur modèle IaC', code = 'GECIRAP_TEMPLATE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapStackNotFoundError extends AppError {
  constructor(message = 'Stack IaC introuvable', code = 'GECIRAP_STACK_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapStackError extends AppError {
  constructor(message = 'Erreur stack IaC', code = 'GECIRAP_STACK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapProvisioningError extends AppError {
  constructor(message = 'Erreur provisionnement', code = 'GECIRAP_PROVISIONING', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapProvisioningFailedError extends AppError {
  constructor(message = 'Échec provisionnement', code = 'GECIRAP_PROVISIONING_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapDriftDetectedError extends AppError {
  constructor(message = 'Dérive de configuration détectée', code = 'GECIRAP_DRIFT_DETECTED', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapPolicyViolationError extends AppError {
  constructor(message = 'Violation de politique', code = 'GECIRAP_POLICY_VIOLATION', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapApprovalRequiredError extends AppError {
  constructor(message = 'Approbation requise', code = 'GECIRAP_APPROVAL_REQUIRED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GecirapDestroyBlockedError extends AppError {
  constructor(message = 'Destruction bloquée', code = 'GECIRAP_DESTROY_BLOCKED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

// ─── Module 5 — Autoscaling ────────────────────────────────────────────────
export class GecirapScalingPolicyNotFoundError extends AppError {
  constructor(message = 'Politique d\'autoscaling introuvable', code = 'GECIRAP_SCALING_POLICY_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapScalingPolicyError extends AppError {
  constructor(message = 'Erreur politique d\'autoscaling', code = 'GECIRAP_SCALING_POLICY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapScalingFailedError extends AppError {
  constructor(message = 'Échec d\'autoscaling', code = 'GECIRAP_SCALING_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCapacityError extends AppError {
  constructor(message = 'Erreur de capacité', code = 'GECIRAP_CAPACITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCapacityForecastError extends AppError {
  constructor(message = 'Erreur de prévision de capacité', code = 'GECIRAP_CAPACITY_FORECAST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCapacityAlertError extends AppError {
  constructor(message = 'Alerte de capacité', code = 'GECIRAP_CAPACITY_ALERT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 6 — DR ─────────────────────────────────────────────────────────
export class GecirapRecoveryPlanNotFoundError extends AppError {
  constructor(message = 'Plan de récupération introuvable', code = 'GECIRAP_RECOVERY_PLAN_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapRecoveryPlanError extends AppError {
  constructor(message = 'Erreur plan de récupération', code = 'GECIRAP_RECOVERY_PLAN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRecoveryFailedError extends AppError {
  constructor(message = 'Échec de récupération', code = 'GECIRAP_RECOVERY_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRecoveryTestError extends AppError {
  constructor(message = 'Erreur test de récupération', code = 'GECIRAP_RECOVERY_TEST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRTONotMetError extends AppError {
  constructor(message = 'RTO non respecté', code = 'GECIRAP_RTO_NOT_MET', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapRPONotMetError extends AppError {
  constructor(message = 'RPO non respecté', code = 'GECIRAP_RPO_NOT_MET', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapDependencyError extends AppError {
  constructor(message = 'Erreur de dépendance', code = 'GECIRAP_DEPENDENCY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 7 — Multi-Cloud ────────────────────────────────────────────────
export class GecirapPlacementError extends AppError {
  constructor(message = 'Erreur de placement multi-cloud', code = 'GECIRAP_PLACEMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapMigrationError extends AppError {
  constructor(message = 'Erreur de migration', code = 'GECIRAP_MIGRATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapMigrationFailedError extends AppError {
  constructor(message = 'Échec de migration', code = 'GECIRAP_MIGRATION_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCloudBalanceError extends AppError {
  constructor(message = 'Erreur de balance cloud', code = 'GECIRAP_CLOUD_BALANCE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCapabilityError extends AppError {
  constructor(message = 'Erreur de capacité cloud', code = 'GECIRAP_CAPABILITY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 8 — Edge ───────────────────────────────────────────────────────
export class GecirapEdgeNodeNotFoundError extends AppError {
  constructor(message = 'Nœud edge introuvable', code = 'GECIRAP_EDGE_NODE_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapEdgeNodeError extends AppError {
  constructor(message = 'Erreur nœud edge', code = 'GECIRAP_EDGE_NODE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapEdgeClusterError extends AppError {
  constructor(message = 'Erreur cluster edge', code = 'GECIRAP_EDGE_CLUSTER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapEdgeDeploymentError extends AppError {
  constructor(message = 'Erreur déploiement edge', code = 'GECIRAP_EDGE_DEPLOYMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapEdgeSyncError extends AppError {
  constructor(message = 'Erreur synchronisation edge', code = 'GECIRAP_EDGE_SYNC', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapEdgeSyncConflictError extends AppError {
  constructor(message = 'Conflit de synchronisation edge', code = 'GECIRAP_EDGE_SYNC_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GecirapOfflinePackageError extends AppError {
  constructor(message = 'Erreur package hors-ligne', code = 'GECIRAP_OFFLINE_PACKAGE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapEdgePolicyError extends AppError {
  constructor(message = 'Erreur politique edge', code = 'GECIRAP_EDGE_POLICY', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 9 — Network ────────────────────────────────────────────────────
export class GecirapNetworkNotFoundError extends AppError {
  constructor(message = 'Réseau introuvable', code = 'GECIRAP_NETWORK_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapNetworkError extends AppError {
  constructor(message = 'Erreur réseau', code = 'GECIRAP_NETWORK', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapNetworkRouteError extends AppError {
  constructor(message = 'Erreur routage réseau', code = 'GECIRAP_NETWORK_ROUTE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapLoadBalancerError extends AppError {
  constructor(message = 'Erreur équilibreur de charge', code = 'GECIRAP_LOAD_BALANCER', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCDNError extends AppError {
  constructor(message = 'Erreur CDN', code = 'GECIRAP_CDN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapDNSRecordError extends AppError {
  constructor(message = 'Erreur enregistrement DNS', code = 'GECIRAP_DNS_RECORD', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapTrafficAnomalyError extends AppError {
  constructor(message = 'Anomalie de trafic détectée', code = 'GECIRAP_TRAFFIC_ANOMALY', statusCode = 400) {
    super(message, code, statusCode);
  }
}

// ─── Module 10 — AIOps ─────────────────────────────────────────────────────
export class GecirapAIOpsAgentError extends AppError {
  constructor(message = 'Erreur agent AIOps', code = 'GECIRAP_AIOPS_AGENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapAIOpsAgentNotFoundError extends AppError {
  constructor(message = 'Agent AIOps introuvable', code = 'GECIRAP_AIOPS_AGENT_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapIncidentCorrelationError extends AppError {
  constructor(message = 'Erreur corrélation incidents', code = 'GECIRAP_INCIDENT_CORRELATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRootCauseError extends AppError {
  constructor(message = 'Erreur analyse cause racine', code = 'GECIRAP_ROOT_CAUSE', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRecommendationError extends AppError {
  constructor(message = 'Erreur recommandation', code = 'GECIRAP_RECOMMENDATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRemediationError extends AppError {
  constructor(message = 'Erreur remédiation', code = 'GECIRAP_REMEDIATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapRemediationDeniedError extends AppError {
  constructor(message = 'Remédiation refusée', code = 'GECIRAP_REMEDIATION_DENIED', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GecirapRemediationFailedError extends AppError {
  constructor(message = 'Échec de remédiation', code = 'GECIRAP_REMEDIATION_FAILED', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapAutoActionError extends AppError {
  constructor(message = 'Erreur action automatique', code = 'GECIRAP_AUTO_ACTION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 11 — FinOps ────────────────────────────────────────────────────
export class GecirapCostError extends AppError {
  constructor(message = 'Erreur de coût', code = 'GECIRAP_COST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCostAnomalyDetectedError extends AppError {
  constructor(message = 'Anomalie de coût détectée', code = 'GECIRAP_COST_ANOMALY_DETECTED', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapBudgetExceededError extends AppError {
  constructor(message = 'Budget dépassé', code = 'GECIRAP_BUDGET_EXCEEDED', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapBudgetNotFoundError extends AppError {
  constructor(message = 'Budget introuvable', code = 'GECIRAP_BUDGET_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapBudgetError extends AppError {
  constructor(message = 'Erreur budget', code = 'GECIRAP_BUDGET', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapForecastError extends AppError {
  constructor(message = 'Erreur de prévision', code = 'GECIRAP_FORECAST', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapOptimizationError extends AppError {
  constructor(message = 'Erreur d\'optimisation', code = 'GECIRAP_OPTIMIZATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapCommitmentError extends AppError {
  constructor(message = 'Erreur d\'engagement', code = 'GECIRAP_COMMITMENT', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Module 12 — Digital Twin ──────────────────────────────────────────────
export class GecirapTwinNotFoundError extends AppError {
  constructor(message = 'Jumeau numérique introuvable', code = 'GECIRAP_TWIN_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapTwinError extends AppError {
  constructor(message = 'Erreur jumeau numérique', code = 'GECIRAP_TWIN', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapTwinSimulationError extends AppError {
  constructor(message = 'Erreur simulation jumeau', code = 'GECIRAP_TWIN_SIMULATION', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapTwinSyncError extends AppError {
  constructor(message = 'Erreur synchronisation jumeau', code = 'GECIRAP_TWIN_SYNC', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class GecirapTwinScenarioError extends AppError {
  constructor(message = 'Erreur scénario jumeau', code = 'GECIRAP_TWIN_SCENARIO', statusCode = 500) {
    super(message, code, statusCode);
  }
}

// ─── Common ─────────────────────────────────────────────────────────────────
export class GecirapValidationError extends AppError {
  constructor(message = 'Erreur de validation', code = 'GECIRAP_VALIDATION', statusCode = 400) {
    super(message, code, statusCode);
  }
}

export class GecirapNotFoundError extends AppError {
  constructor(message = 'Ressource introuvable', code = 'GECIRAP_NOT_FOUND', statusCode = 404) {
    super(message, code, statusCode);
  }
}

export class GecirapPermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes', code = 'GECIRAP_PERMISSION', statusCode = 403) {
    super(message, code, statusCode);
  }
}

export class GecirapConflictError extends AppError {
  constructor(message = 'Conflit de données', code = 'GECIRAP_CONFLICT', statusCode = 409) {
    super(message, code, statusCode);
  }
}

export class GecirapRateLimitError extends AppError {
  constructor(message = 'Limite de requêtes atteinte', code = 'GECIRAP_RATE_LIMIT', statusCode = 429) {
    super(message, code, statusCode);
  }
}

export class GecirapTimeoutError extends AppError {
  constructor(message = 'Délai dépassé', code = 'GECIRAP_TIMEOUT', statusCode = 504) {
    super(message, code, statusCode);
  }
}

export class GecirapNetworkCommonError extends AppError {
  constructor(message = 'Erreur réseau', code = 'GECIRAP_NETWORK_COMMON', statusCode = 503) {
    super(message, code, statusCode);
  }
}
