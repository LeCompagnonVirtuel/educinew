import { AppError } from './AppError';

// ─── API Gateway ────────────────────────────────────────────────────────────

export class IntgIntegrationNotFoundError extends AppError {
  constructor(message = 'Intégration introuvable') {
    super(message, 'INTG_INTEGRATION_NOT_FOUND_ERROR', 404);
  }
}

export class IntgIntegrationCreateError extends AppError {
  constructor(message = "Impossible de créer l'intégration") {
    super(message, 'INTG_INTEGRATION_CREATE_ERROR', 500);
  }
}

export class IntgIntegrationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'intégration") {
    super(message, 'INTG_INTEGRATION_UPDATE_ERROR', 500);
  }
}

export class IntgIntegrationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'intégration") {
    super(message, 'INTG_INTEGRATION_DELETE_ERROR', 500);
  }
}

export class IntgIntegrationConfigError extends AppError {
  constructor(message = "Configuration d'intégration invalide") {
    super(message, 'INTG_INTEGRATION_CONFIG_ERROR', 400);
  }
}

export class IntgIntegrationAuthError extends AppError {
  constructor(message = "Authentification de l'intégration échouée") {
    super(message, 'INTG_INTEGRATION_AUTH_ERROR', 401);
  }
}

export class IntgIntegrationRateLimitError extends AppError {
  constructor(message = "Limite de débit de l'intégration atteinte") {
    super(message, 'INTG_INTEGRATION_RATE_LIMIT_ERROR', 429);
  }
}

export class IntgIntegrationHealthCheckError extends AppError {
  constructor(message = "Vérification de santé de l'intégration échouée") {
    super(message, 'INTG_INTEGRATION_HEALTH_CHECK_ERROR', 502);
  }
}

export class IntgAPIKeyNotFoundError extends AppError {
  constructor(message = 'Clé API introuvable') {
    super(message, 'INTG_API_KEY_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAPIKeyCreateError extends AppError {
  constructor(message = 'Impossible de créer la clé API') {
    super(message, 'INTG_API_KEY_CREATE_ERROR', 500);
  }
}

export class IntgAPIKeyRevokedError extends AppError {
  constructor(message = 'Clé API révoquée') {
    super(message, 'INTG_API_KEY_REVOKED_ERROR', 403);
  }
}

export class IntgAPIKeyExpiredError extends AppError {
  constructor(message = 'Clé API expirée') {
    super(message, 'INTG_API_KEY_EXPIRED_ERROR', 401);
  }
}

export class IntgOAuthTokenError extends AppError {
  constructor(message = 'Erreur de jeton OAuth') {
    super(message, 'INTG_OAUTH_TOKEN_ERROR', 401);
  }
}

export class IntgOAuthConfigError extends AppError {
  constructor(message = 'Configuration OAuth invalide') {
    super(message, 'INTG_OAUTH_CONFIG_ERROR', 400);
  }
}

export class IntgRateLimitExceededError extends AppError {
  constructor(message = 'Limite de débit dépassée') {
    super(message, 'INTG_RATE_LIMIT_EXCEEDED_ERROR', 429);
  }
}

export class IntgRateLimitConfigError extends AppError {
  constructor(message = 'Configuration de limite de débit invalide') {
    super(message, 'INTG_RATE_LIMIT_CONFIG_ERROR', 400);
  }
}

export class IntgAPILogError extends AppError {
  constructor(message = "Erreur d'enregistrement du journal API") {
    super(message, 'INTG_API_LOG_ERROR', 500);
  }
}

export class IntgAPIAnalyticsError extends AppError {
  constructor(message = "Erreur lors de l'analyse API") {
    super(message, 'INTG_API_ANALYTICS_ERROR', 500);
  }
}

export class IntgAPIVersionError extends AppError {
  constructor(message = 'Version API invalide') {
    super(message, 'INTG_API_VERSION_ERROR', 400);
  }
}

export class IntgSDKGenerationError extends AppError {
  constructor(message = "Erreur lors de la génération du SDK") {
    super(message, 'INTG_SDK_GENERATION_ERROR', 500);
  }
}

export class IntgEndpointNotFoundError extends AppError {
  constructor(message = 'Point de terminaison introuvable') {
    super(message, 'INTG_ENDPOINT_NOT_FOUND_ERROR', 404);
  }
}

export class IntgEndpointCreateError extends AppError {
  constructor(message = 'Impossible de créer le point de terminaison') {
    super(message, 'INTG_ENDPOINT_CREATE_ERROR', 500);
  }
}

export class IntgGatewayConfigError extends AppError {
  constructor(message = 'Configuration de la passerelle invalide') {
    super(message, 'INTG_GATEWAY_CONFIG_ERROR', 400);
  }
}

export class IntgGatewayTimeoutError extends AppError {
  constructor(message = "Délai d'attente de la passerelle dépassé") {
    super(message, 'INTG_GATEWAY_TIMEOUT_ERROR', 504);
  }
}

export class IntgGatewayUnavailableError extends AppError {
  constructor(message = 'Passerelle indisponible') {
    super(message, 'INTG_GATEWAY_UNAVAILABLE_ERROR', 503);
  }
}

// ─── Webhooks ───────────────────────────────────────────────────────────────

export class IntgWebhookNotFoundError extends AppError {
  constructor(message = 'Webhook introuvable') {
    super(message, 'INTG_WEBHOOK_NOT_FOUND_ERROR', 404);
  }
}

export class IntgWebhookCreateError extends AppError {
  constructor(message = 'Impossible de créer le webhook') {
    super(message, 'INTG_WEBHOOK_CREATE_ERROR', 500);
  }
}

export class IntgWebhookUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le webhook') {
    super(message, 'INTG_WEBHOOK_UPDATE_ERROR', 500);
  }
}

export class IntgWebhookDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le webhook') {
    super(message, 'INTG_WEBHOOK_DELETE_ERROR', 500);
  }
}

export class IntgWebhookDeliveryError extends AppError {
  constructor(message = 'Échec de la livraison du webhook') {
    super(message, 'INTG_WEBHOOK_DELIVERY_ERROR', 502);
  }
}

export class IntgWebhookSignatureError extends AppError {
  constructor(message = 'Signature du webhook invalide') {
    super(message, 'INTG_WEBHOOK_SIGNATURE_ERROR', 401);
  }
}

export class IntgWebhookSecretError extends AppError {
  constructor(message = 'Erreur de secret du webhook') {
    super(message, 'INTG_WEBHOOK_SECRET_ERROR', 500);
  }
}

export class IntgWebhookRetryExhaustedError extends AppError {
  constructor(message = 'Toutes les tentatives de webhook épuisées') {
    super(message, 'INTG_WEBHOOK_RETRY_EXHAUSTED_ERROR', 502);
  }
}

export class IntgWebhookConfigError extends AppError {
  constructor(message = 'Configuration du webhook invalide') {
    super(message, 'INTG_WEBHOOK_CONFIG_ERROR', 400);
  }
}

export class IntgWebhookDisabledError extends AppError {
  constructor(message = 'Webhook désactivé') {
    super(message, 'INTG_WEBHOOK_DISABLED_ERROR', 403);
  }
}

export class IntgWebhookTimeoutError extends AppError {
  constructor(message = "Délai d'attente du webhook dépassé") {
    super(message, 'INTG_WEBHOOK_TIMEOUT_ERROR', 504);
  }
}

export class IntgWebhookPayloadError extends AppError {
  constructor(message = 'Charge utile du webhook invalide') {
    super(message, 'INTG_WEBHOOK_PAYLOAD_ERROR', 400);
  }
}

export class IntgWebhookTemplateError extends AppError {
  constructor(message = 'Erreur de modèle de webhook') {
    super(message, 'INTG_WEBHOOK_TEMPLATE_ERROR', 500);
  }
}

export class IntgWebhookTestError extends AppError {
  constructor(message = 'Erreur lors du test du webhook') {
    super(message, 'INTG_WEBHOOK_TEST_ERROR', 500);
  }
}

export class IntgWebhookReplayError extends AppError {
  constructor(message = 'Erreur lors de la rejouée du webhook') {
    super(message, 'INTG_WEBHOOK_REPLAY_ERROR', 500);
  }
}

export class IntgDeadLetterError extends AppError {
  constructor(message = "Erreur de file d'attente des lettres mortes") {
    super(message, 'INTG_DEAD_LETTER_ERROR', 500);
  }
}

export class IntgDeadLetterNotFoundError extends AppError {
  constructor(message = 'Lettre morte introuvable') {
    super(message, 'INTG_DEAD_LETTER_NOT_FOUND_ERROR', 404);
  }
}

export class IntgDeadLetterRetryError extends AppError {
  constructor(message = 'Erreur de reprise de la lettre morte') {
    super(message, 'INTG_DEAD_LETTER_RETRY_ERROR', 500);
  }
}

export class IntgWebhookEventError extends AppError {
  constructor(message = "Erreur d'événement webhook") {
    super(message, 'INTG_WEBHOOK_EVENT_ERROR', 500);
  }
}

export class IntgWebhookFilterError extends AppError {
  constructor(message = 'Filtre webhook invalide') {
    super(message, 'INTG_WEBHOOK_FILTER_ERROR', 400);
  }
}

export class IntgWebhookHeaderError extends AppError {
  constructor(message = 'En-tête webhook invalide') {
    super(message, 'INTG_WEBHOOK_HEADER_ERROR', 400);
  }
}

export class IntgWebhookEndpointError extends AppError {
  constructor(message = 'URL de destination du webhook introuvable') {
    super(message, 'INTG_WEBHOOK_ENDPOINT_ERROR', 404);
  }
}

export class IntgWebhookQueueError extends AppError {
  constructor(message = "File d'attente webhook indisponible") {
    super(message, 'INTG_WEBHOOK_QUEUE_ERROR', 503);
  }
}

export class IntgWebhookMonitoringError extends AppError {
  constructor(message = 'Erreur de surveillance du webhook') {
    super(message, 'INTG_WEBHOOK_MONITORING_ERROR', 500);
  }
}

export class IntgWebhookBatchError extends AppError {
  constructor(message = 'Erreur de traitement par lots du webhook') {
    super(message, 'INTG_WEBHOOK_BATCH_ERROR', 500);
  }
}

// ─── Event Bus ──────────────────────────────────────────────────────────────

export class IntgEventPublishError extends AppError {
  constructor(message = "Erreur lors de la publication de l'événement") {
    super(message, 'INTG_EVENT_PUBLISH_ERROR', 500);
  }
}

export class IntgEventNotFoundError extends AppError {
  constructor(message = 'Événement introuvable') {
    super(message, 'INTG_EVENT_NOT_FOUND_ERROR', 404);
  }
}

export class IntgEventConsumeError extends AppError {
  constructor(message = "Erreur lors de la consommation de l'événement") {
    super(message, 'INTG_EVENT_CONSUME_ERROR', 500);
  }
}

export class IntgEventTimeoutError extends AppError {
  constructor(message = "Délai d'attente de l'événement dépassé") {
    super(message, 'INTG_EVENT_TIMEOUT_ERROR', 504);
  }
}

export class IntgTopicNotFoundError extends AppError {
  constructor(message = 'Sujet introuvable') {
    super(message, 'INTG_TOPIC_NOT_FOUND_ERROR', 404);
  }
}

export class IntgTopicCreateError extends AppError {
  constructor(message = 'Impossible de créer le sujet') {
    super(message, 'INTG_TOPIC_CREATE_ERROR', 500);
  }
}

export class IntgTopicDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le sujet') {
    super(message, 'INTG_TOPIC_DELETE_ERROR', 500);
  }
}

export class IntgTopicConfigError extends AppError {
  constructor(message = 'Configuration du sujet invalide') {
    super(message, 'INTG_TOPIC_CONFIG_ERROR', 400);
  }
}

export class IntgSubscriptionNotFoundError extends AppError {
  constructor(message = 'Abonnement introuvable') {
    super(message, 'INTG_SUBSCRIPTION_NOT_FOUND_ERROR', 404);
  }
}

export class IntgSubscriptionCreateError extends AppError {
  constructor(message = "Impossible de créer l'abonnement") {
    super(message, 'INTG_SUBSCRIPTION_CREATE_ERROR', 500);
  }
}

export class IntgConsumerError extends AppError {
  constructor(message = 'Erreur du consommateur') {
    super(message, 'INTG_CONSUMER_ERROR', 500);
  }
}

export class IntgProducerError extends AppError {
  constructor(message = 'Erreur du producteur') {
    super(message, 'INTG_PRODUCER_ERROR', 500);
  }
}

export class IntgPriorityQueueError extends AppError {
  constructor(message = "Erreur de file d'attente prioritaire") {
    super(message, 'INTG_PRIORITY_QUEUE_ERROR', 500);
  }
}

export class IntgDelayedEventError extends AppError {
  constructor(message = "Erreur d'événement différé") {
    super(message, 'INTG_DELAYED_EVENT_ERROR', 500);
  }
}

export class IntgEventMetricsError extends AppError {
  constructor(message = "Erreur des métriques d'événement") {
    super(message, 'INTG_EVENT_METRICS_ERROR', 500);
  }
}

export class IntgCorrelationError extends AppError {
  constructor(message = 'Erreur de corrélation') {
    super(message, 'INTG_CORRELATION_ERROR', 500);
  }
}

export class IntgSagaError extends AppError {
  constructor(message = 'Erreur de saga') {
    super(message, 'INTG_SAGA_ERROR', 500);
  }
}

export class IntgSagaStepError extends AppError {
  constructor(message = "Erreur d'étape de saga") {
    super(message, 'INTG_SAGA_STEP_ERROR', 500);
  }
}

export class IntgSagaTimeoutError extends AppError {
  constructor(message = "Délai d'attente du saga dépassé") {
    super(message, 'INTG_SAGA_TIMEOUT_ERROR', 504);
  }
}

export class IntgStreamingError extends AppError {
  constructor(message = 'Erreur de flux') {
    super(message, 'INTG_STREAMING_ERROR', 500);
  }
}

export class IntgEventFilterError extends AppError {
  constructor(message = "Filtre d'événement invalide") {
    super(message, 'INTG_EVENT_FILTER_ERROR', 400);
  }
}

export class IntgEventDuplicateError extends AppError {
  constructor(message = 'Événement en double détecté') {
    super(message, 'INTG_EVENT_DUPLICATE_ERROR', 409);
  }
}

export class IntgEventOrderError extends AppError {
  constructor(message = "Ordre d'événement invalide") {
    super(message, 'INTG_EVENT_ORDER_ERROR', 500);
  }
}

export class IntgDomainEventError extends AppError {
  constructor(message = "Erreur d'événement de domaine") {
    super(message, 'INTG_DOMAIN_EVENT_ERROR', 500);
  }
}

export class IntgEventStoreError extends AppError {
  constructor(message = "Magasin d'événements indisponible") {
    super(message, 'INTG_EVENT_STORE_ERROR', 503);
  }
}
