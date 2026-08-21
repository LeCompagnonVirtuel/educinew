import { AppError } from './AppError';

export class IntgAIModelError extends AppError {
  constructor(message = 'Erreur de modèle IA') {
    super(message, 'INTG_AI_MODEL_ERROR', 500);
  }
}

export class IntgAIModelNotFoundError extends AppError {
  constructor(message = 'Modèle IA introuvable') {
    super(message, 'INTG_AI_MODEL_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAIModelUnavailableError extends AppError {
  constructor(message = 'Modèle IA indisponible') {
    super(message, 'INTG_AI_MODEL_UNAVAILABLE_ERROR', 503);
  }
}

export class IntgAIAgentNotFoundError extends AppError {
  constructor(message = 'Agent IA introuvable') {
    super(message, 'INTG_AI_AGENT_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAIAgentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'agent IA') {
    super(message, 'INTG_AI_AGENT_CREATE_ERROR', 500);
  }
}

export class IntgAIAgentExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution de l\'agent IA') {
    super(message, 'INTG_AI_AGENT_EXECUTION_ERROR', 500);
  }
}

export class IntgAITaskError extends AppError {
  constructor(message = 'Erreur de tâche IA') {
    super(message, 'INTG_AI_TASK_ERROR', 500);
  }
}

export class IntgAITaskTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente de la tâche IA dépassé') {
    super(message, 'INTG_AI_TASK_TIMEOUT_ERROR', 504);
  }
}

export class IntgAITokenLimitError extends AppError {
  constructor(message = 'Limite de tokens IA dépassée') {
    super(message, 'INTG_AI_TOKEN_LIMIT_ERROR', 400);
  }
}

export class IntgAIPromptError extends AppError {
  constructor(message = 'Erreur de prompt IA') {
    super(message, 'INTG_AI_PROMPT_ERROR', 500);
  }
}

export class IntgAIPromptNotFoundError extends AppError {
  constructor(message = 'Prompt IA introuvable') {
    super(message, 'INTG_AI_PROMPT_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAIKnowledgeBaseError extends AppError {
  constructor(message = 'Erreur de base de connaissances IA') {
    super(message, 'INTG_AI_KNOWLEDGE_BASE_ERROR', 500);
  }
}

export class IntgAIKnowledgeBaseNotFoundError extends AppError {
  constructor(message = 'Base de connaissances IA introuvable') {
    super(message, 'INTG_AI_KNOWLEDGE_BASE_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAIIndexingError extends AppError {
  constructor(message = 'Erreur d\'indexation IA') {
    super(message, 'INTG_AI_INDEXING_ERROR', 500);
  }
}

export class IntgAISearchError extends AppError {
  constructor(message = 'Erreur de recherche sémantique IA') {
    super(message, 'INTG_AI_SEARCH_ERROR', 500);
  }
}

export class IntgAIRAGError extends AppError {
  constructor(message = 'Erreur RAG IA') {
    super(message, 'INTG_AI_RAG_ERROR', 500);
  }
}

export class IntgAIAssistantError extends AppError {
  constructor(message = 'Erreur d\'assistant IA') {
    super(message, 'INTG_AI_ASSISTANT_ERROR', 500);
  }
}

export class IntgAIAssistantNotFoundError extends AppError {
  constructor(message = 'Assistant IA introuvable') {
    super(message, 'INTG_AI_ASSISTANT_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAIClassificationError extends AppError {
  constructor(message = 'Erreur de classification IA') {
    super(message, 'INTG_AI_CLASSIFICATION_ERROR', 500);
  }
}

export class IntgAISummarizationError extends AppError {
  constructor(message = 'Erreur de résumé IA') {
    super(message, 'INTG_AI_SUMMARIZATION_ERROR', 500);
  }
}

export class IntgAIOCRError extends AppError {
  constructor(message = 'Erreur OCR IA') {
    super(message, 'INTG_AI_OCR_ERROR', 500);
  }
}

export class IntgAITranslationError extends AppError {
  constructor(message = 'Erreur de traduction IA') {
    super(message, 'INTG_AI_TRANSLATION_ERROR', 500);
  }
}

export class IntgAIRecommendationError extends AppError {
  constructor(message = 'Erreur de recommandation IA') {
    super(message, 'INTG_AI_RECOMMENDATION_ERROR', 500);
  }
}

export class IntgAIModerationError extends AppError {
  constructor(message = 'Erreur de modération IA') {
    super(message, 'INTG_AI_MODERATION_ERROR', 500);
  }
}

export class IntgAIEvaluationError extends AppError {
  constructor(message = 'Erreur d\'évaluation IA') {
    super(message, 'INTG_AI_EVALUATION_ERROR', 500);
  }
}

export class IntgAIPipelineError extends AppError {
  constructor(message = 'Erreur de pipeline IA') {
    super(message, 'INTG_AI_PIPELINE_ERROR', 500);
  }
}

export class IntgAIPipelineStepError extends AppError {
  constructor(message = 'Erreur d\'étape de pipeline IA') {
    super(message, 'INTG_AI_PIPELINE_STEP_ERROR', 500);
  }
}

export class IntgAIEmbeddingError extends AppError {
  constructor(message = 'Erreur d\'embeddings IA') {
    super(message, 'INTG_AI_EMBEDDING_ERROR', 500);
  }
}

export class IntgAIVectorStoreError extends AppError {
  constructor(message = 'Erreur de magasin de vecteurs IA') {
    super(message, 'INTG_AI_VECTOR_STORE_ERROR', 500);
  }
}

export class IntgAIProviderError extends AppError {
  constructor(message = 'Erreur du fournisseur IA') {
    super(message, 'INTG_AI_PROVIDER_ERROR', 502);
  }
}

export class IntgMarketplaceItemNotFoundError extends AppError {
  constructor(message = 'Élément du marketplace introuvable') {
    super(message, 'INTG_MARKETPLACE_ITEM_NOT_FOUND_ERROR', 404);
  }
}

export class IntgMarketplaceItemCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'élément du marketplace') {
    super(message, 'INTG_MARKETPLACE_ITEM_CREATE_ERROR', 500);
  }
}

export class IntgMarketplaceItemPublishError extends AppError {
  constructor(message = 'Erreur de publication du marketplace') {
    super(message, 'INTG_MARKETPLACE_ITEM_PUBLISH_ERROR', 500);
  }
}

export class IntgMarketplaceItemReviewError extends AppError {
  constructor(message = 'Revue du marketplace invalide') {
    super(message, 'INTG_MARKETPLACE_ITEM_REVIEW_ERROR', 400);
  }
}

export class IntgMarketplaceSearchError extends AppError {
  constructor(message = 'Erreur de recherche du marketplace') {
    super(message, 'INTG_MARKETPLACE_SEARCH_ERROR', 500);
  }
}

export class IntgMarketplaceSubscriptionError extends AppError {
  constructor(message = 'Erreur d\'abonnement au marketplace') {
    super(message, 'INTG_MARKETPLACE_SUBSCRIPTION_ERROR', 500);
  }
}

export class IntgMarketplaceLicenseError extends AppError {
  constructor(message = 'Licence du marketplace invalide') {
    super(message, 'INTG_MARKETPLACE_LICENSE_ERROR', 400);
  }
}

export class IntgMarketplaceLicenseExpiredError extends AppError {
  constructor(message = 'Licence du marketplace expirée') {
    super(message, 'INTG_MARKETPLACE_LICENSE_EXPIRED_ERROR', 410);
  }
}

export class IntgMarketplaceDependencyError extends AppError {
  constructor(message = 'Dépendance du marketplace manquante') {
    super(message, 'INTG_MARKETPLACE_DEPENDENCY_ERROR', 400);
  }
}

export class IntgPluginNotFoundError extends AppError {
  constructor(message = 'Plugin introuvable') {
    super(message, 'INTG_PLUGIN_NOT_FOUND_ERROR', 404);
  }
}

export class IntgPluginInstallError extends AppError {
  constructor(message = 'Erreur d\'installation du plugin') {
    super(message, 'INTG_PLUGIN_INSTALL_ERROR', 500);
  }
}

export class IntgPluginUninstallError extends AppError {
  constructor(message = 'Erreur de désinstallation du plugin') {
    super(message, 'INTG_PLUGIN_UNINSTALL_ERROR', 500);
  }
}

export class IntgPluginConfigError extends AppError {
  constructor(message = 'Configuration du plugin invalide') {
    super(message, 'INTG_PLUGIN_CONFIG_ERROR', 400);
  }
}

export class IntgExtensionNotFoundError extends AppError {
  constructor(message = 'Extension introuvable') {
    super(message, 'INTG_EXTENSION_NOT_FOUND_ERROR', 404);
  }
}

export class IntgExtensionInstallError extends AppError {
  constructor(message = 'Erreur d\'installation de l\'extension') {
    super(message, 'INTG_EXTENSION_INSTALL_ERROR', 500);
  }
}

export class IntgDeveloperAppNotFoundError extends AppError {
  constructor(message = 'Application développeur introuvable') {
    super(message, 'INTG_DEVELOPER_APP_NOT_FOUND_ERROR', 404);
  }
}

export class IntgDeveloperAppCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'application développeur') {
    super(message, 'INTG_DEVELOPER_APP_CREATE_ERROR', 500);
  }
}

export class IntgDeveloperAppPendingError extends AppError {
  constructor(message = 'Application développeur en attente de validation') {
    super(message, 'INTG_DEVELOPER_APP_PENDING_ERROR', 403);
  }
}

export class IntgDeveloperAppRejectedError extends AppError {
  constructor(message = 'Application développeur rejetée') {
    super(message, 'INTG_DEVELOPER_APP_REJECTED_ERROR', 403);
  }
}

export class IntgDeveloperSecretError extends AppError {
  constructor(message = 'Erreur de secret développeur') {
    super(message, 'INTG_DEVELOPER_SECRET_ERROR', 500);
  }
}

export class IntgMetricError extends AppError {
  constructor(message = 'Erreur de métriques') {
    super(message, 'INTG_METRIC_ERROR', 500);
  }
}

export class IntgTraceError extends AppError {
  constructor(message = 'Erreur de traçage') {
    super(message, 'INTG_TRACE_ERROR', 500);
  }
}

export class IntgLogError extends AppError {
  constructor(message = 'Erreur de journalisation') {
    super(message, 'INTG_LOG_ERROR', 500);
  }
}

export class IntgAlertError extends AppError {
  constructor(message = 'Erreur d\'alerte') {
    super(message, 'INTG_ALERT_ERROR', 500);
  }
}

export class IntgAlertNotFoundError extends AppError {
  constructor(message = 'Alerte introuvable') {
    super(message, 'INTG_ALERT_NOT_FOUND_ERROR', 404);
  }
}

export class IntgHealthCheckError extends AppError {
  constructor(message = 'Vérification de santé échouée') {
    super(message, 'INTG_HEALTH_CHECK_ERROR', 502);
  }
}

export class IntgHealthCheckTimeoutError extends AppError {
  constructor(message = 'Délai de vérification de santé dépassé') {
    super(message, 'INTG_HEALTH_CHECK_TIMEOUT_ERROR', 504);
  }
}

export class IntgDashboardError extends AppError {
  constructor(message = 'Erreur de tableau de bord') {
    super(message, 'INTG_DASHBOARD_ERROR', 500);
  }
}

export class IntgCronMonitorError extends AppError {
  constructor(message = 'Erreur de surveillance cron') {
    super(message, 'INTG_CRON_MONITOR_ERROR', 500);
  }
}

export class IntgQueueMonitorError extends AppError {
  constructor(message = 'Erreur de surveillance de file d\'attente') {
    super(message, 'INTG_QUEUE_MONITOR_ERROR', 500);
  }
}

export class IntgPerformanceError extends AppError {
  constructor(message = 'Erreur de performance') {
    super(message, 'INTG_PERFORMANCE_ERROR', 500);
  }
}

export class IntgSentryIntegrationError extends AppError {
  constructor(message = 'Erreur d\'intégration Sentry') {
    super(message, 'INTG_SENTRY_INTEGRATION_ERROR', 502);
  }
}

export class IntgMonitoringConfigError extends AppError {
  constructor(message = 'Configuration de surveillance invalide') {
    super(message, 'INTG_MONITORING_CONFIG_ERROR', 400);
  }
}

export class IntgAlertChannelError extends AppError {
  constructor(message = 'Erreur de canal d\'alerte') {
    super(message, 'INTG_ALERT_CHANNEL_ERROR', 500);
  }
}

export class IntgMetricQueryError extends AppError {
  constructor(message = 'Erreur de requête de métriques') {
    super(message, 'INTG_METRIC_QUERY_ERROR', 500);
  }
}

export class IntgDistributedLogError extends AppError {
  constructor(message = 'Erreur de journal distribué') {
    super(message, 'INTG_DISTRIBUTED_LOG_ERROR', 500);
  }
}

export class IntgTraceNotFoundError extends AppError {
  constructor(message = 'Trace introuvable') {
    super(message, 'INTG_TRACE_NOT_FOUND_ERROR', 404);
  }
}

export class IntgSpanError extends AppError {
  constructor(message = 'Erreur de span') {
    super(message, 'INTG_SPAN_ERROR', 500);
  }
}

export class IntgAlertSilenceError extends AppError {
  constructor(message = 'Erreur de mise en sourdine d\'alerte') {
    super(message, 'INTG_ALERT_SILENCE_ERROR', 500);
  }
}

export class IntgDashboardWidgetError extends AppError {
  constructor(message = 'Erreur de widget de tableau de bord') {
    super(message, 'INTG_DASHBOARD_WIDGET_ERROR', 500);
  }
}

export class IntgSecretVaultError extends AppError {
  constructor(message = 'Erreur de coffre-fort de secrets') {
    super(message, 'INTG_SECRET_VAULT_ERROR', 500);
  }
}

export class IntgSecretNotFoundError extends AppError {
  constructor(message = 'Secret introuvable') {
    super(message, 'INTG_SECRET_NOT_FOUND_ERROR', 404);
  }
}

export class IntgSecretCreateError extends AppError {
  constructor(message = 'Impossible de créer le secret') {
    super(message, 'INTG_SECRET_CREATE_ERROR', 500);
  }
}

export class IntgSecretExpiredError extends AppError {
  constructor(message = 'Secret expiré') {
    super(message, 'INTG_SECRET_EXPIRED_ERROR', 410);
  }
}

export class IntgEncryptionError extends AppError {
  constructor(message = 'Erreur de chiffrement') {
    super(message, 'INTG_ENCRYPTION_ERROR', 500);
  }
}

export class IntgDecryptionError extends AppError {
  constructor(message = 'Erreur de déchiffrement') {
    super(message, 'INTG_DECRYPTION_ERROR', 500);
  }
}

export class IntgKeyRotationError extends AppError {
  constructor(message = 'Erreur de rotation des clés') {
    super(message, 'INTG_KEY_ROTATION_ERROR', 500);
  }
}

export class IntgKeyNotFoundError extends AppError {
  constructor(message = 'Clé introuvable') {
    super(message, 'INTG_KEY_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAuditTrailError extends AppError {
  constructor(message = 'Erreur de piste d\'audit') {
    super(message, 'INTG_AUDIT_TRAIL_ERROR', 500);
  }
}

export class IntgAuditExportError extends AppError {
  constructor(message = 'Erreur d\'export d\'audit') {
    super(message, 'INTG_AUDIT_EXPORT_ERROR', 500);
  }
}

export class IntgFirewallError extends AppError {
  constructor(message = 'Erreur de pare-feu') {
    super(message, 'INTG_FIREWALL_ERROR', 500);
  }
}

export class IntgFirewallRuleError extends AppError {
  constructor(message = 'Règle de pare-feu invalide') {
    super(message, 'INTG_FIREWALL_RULE_ERROR', 400);
  }
}

export class IntgIPBlockError extends AppError {
  constructor(message = 'IP bloquée') {
    super(message, 'INTG_IP_BLOCK_ERROR', 403);
  }
}

export class IntgIPAllowError extends AppError {
  constructor(message = 'IP non autorisée') {
    super(message, 'INTG_IP_ALLOW_ERROR', 403);
  }
}

export class IntgBotProtectionError extends AppError {
  constructor(message = 'Erreur de protection contre les bots') {
    super(message, 'INTG_BOT_PROTECTION_ERROR', 500);
  }
}

export class IntgThreatDetectionError extends AppError {
  constructor(message = 'Erreur de détection de menaces') {
    super(message, 'INTG_THREAT_DETECTION_ERROR', 500);
  }
}

export class IntgSecurityPolicyError extends AppError {
  constructor(message = 'Politique de sécurité invalide') {
    super(message, 'INTG_SECURITY_POLICY_ERROR', 400);
  }
}

export class IntgComplianceError extends AppError {
  constructor(message = 'Erreur de conformité') {
    super(message, 'INTG_COMPLIANCE_ERROR', 500);
  }
}

export class IntgSecurityScanError extends AppError {
  constructor(message = 'Erreur d\'analyse de sécurité') {
    super(message, 'INTG_SECURITY_SCAN_ERROR', 500);
  }
}

export class IntgIncidentResponseError extends AppError {
  constructor(message = 'Erreur de réponse aux incidents') {
    super(message, 'INTG_INCIDENT_RESPONSE_ERROR', 500);
  }
}
