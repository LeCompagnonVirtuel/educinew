import { AppError } from './AppError';

// AUTOMATION ERRORS (76-100)

export class IntgAutomationNotFoundError extends AppError {
  constructor(message = 'Automatisation introuvable') {
    super(message, 'INTG_AUTOMATION_NOT_FOUND_ERROR', 404);
  }
}

export class IntgAutomationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'automatisation') {
    super(message, 'INTG_AUTOMATION_CREATE_ERROR', 500);
  }
}

export class IntgAutomationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'automatisation') {
    super(message, 'INTG_AUTOMATION_UPDATE_ERROR', 500);
  }
}

export class IntgAutomationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'automatisation') {
    super(message, 'INTG_AUTOMATION_DELETE_ERROR', 500);
  }
}

export class IntgAutomationExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution de l\'automatisation') {
    super(message, 'INTG_AUTOMATION_EXECUTION_ERROR', 500);
  }
}

export class IntgAutomationTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente de l\'automatisation dépassé') {
    super(message, 'INTG_AUTOMATION_TIMEOUT_ERROR', 504);
  }
}

export class IntgAutomationStepError extends AppError {
  constructor(message = 'Erreur d\'étape de l\'automatisation') {
    super(message, 'INTG_AUTOMATION_STEP_ERROR', 500);
  }
}

export class IntgAutomationConditionError extends AppError {
  constructor(message = 'Condition d\'automatisation invalide') {
    super(message, 'INTG_AUTOMATION_CONDITION_ERROR', 400);
  }
}

export class IntgAutomationTriggerError extends AppError {
  constructor(message = 'Erreur de déclencheur d\'automatisation') {
    super(message, 'INTG_AUTOMATION_TRIGGER_ERROR', 500);
  }
}

export class IntgAutomationVariableError extends AppError {
  constructor(message = 'Variable d\'automatisation invalide') {
    super(message, 'INTG_AUTOMATION_VARIABLE_ERROR', 400);
  }
}

export class IntgAutomationTemplateError extends AppError {
  constructor(message = 'Erreur de modèle d\'automatisation') {
    super(message, 'INTG_AUTOMATION_TEMPLATE_ERROR', 500);
  }
}

export class IntgAutomationScheduleError extends AppError {
  constructor(message = 'Planification d\'automatisation invalide') {
    super(message, 'INTG_AUTOMATION_SCHEDULE_ERROR', 400);
  }
}

export class IntgAutomationPausedError extends AppError {
  constructor(message = 'Automatisation en pause') {
    super(message, 'INTG_AUTOMATION_PAUSED_ERROR', 403);
  }
}

export class IntgAutomationRateLimitError extends AppError {
  constructor(message = 'Limite de débit d\'automatisation atteinte') {
    super(message, 'INTG_AUTOMATION_RATE_LIMIT_ERROR', 429);
  }
}

export class IntgWorkflowNotFoundError extends AppError {
  constructor(message = 'Flux de travail introuvable') {
    super(message, 'INTG_WORKFLOW_NOT_FOUND_ERROR', 404);
  }
}

export class IntgWorkflowCreateError extends AppError {
  constructor(message = 'Impossible de créer le flux de travail') {
    super(message, 'INTG_WORKFLOW_CREATE_ERROR', 500);
  }
}

export class IntgWorkflowUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le flux de travail') {
    super(message, 'INTG_WORKFLOW_UPDATE_ERROR', 500);
  }
}

export class IntgWorkflowDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le flux de travail') {
    super(message, 'INTG_WORKFLOW_DELETE_ERROR', 500);
  }
}

export class IntgWorkflowExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution du flux de travail') {
    super(message, 'INTG_WORKFLOW_EXECUTION_ERROR', 500);
  }
}

export class IntgWorkflowStepError extends AppError {
  constructor(message = 'Erreur d\'étape du flux de travail') {
    super(message, 'INTG_WORKFLOW_STEP_ERROR', 500);
  }
}

export class IntgWorkflowVersionError extends AppError {
  constructor(message = 'Version du flux de travail invalide') {
    super(message, 'INTG_WORKFLOW_VERSION_ERROR', 400);
  }
}

export class IntgWorkflowPublishError extends AppError {
  constructor(message = 'Erreur de publication du flux de travail') {
    super(message, 'INTG_WORKFLOW_PUBLISH_ERROR', 500);
  }
}

export class IntgApprovalNotFoundError extends AppError {
  constructor(message = 'Approbation introuvable') {
    super(message, 'INTG_APPROVAL_NOT_FOUND_ERROR', 404);
  }
}

export class IntgApprovalExpiredError extends AppError {
  constructor(message = 'Approbation expirée') {
    super(message, 'INTG_APPROVAL_EXPIRED_ERROR', 410);
  }
}

export class IntgApprovalTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente de l\'approbation dépassé') {
    super(message, 'INTG_APPROVAL_TIMEOUT_ERROR', 504);
  }
}

// CONNECTOR ERRORS (101-130)

export class IntgConnectorNotFoundError extends AppError {
  constructor(message = 'Connecteur introuvable') {
    super(message, 'INTG_CONNECTOR_NOT_FOUND_ERROR', 404);
  }
}

export class IntgConnectorCreateError extends AppError {
  constructor(message = 'Impossible de créer le connecteur') {
    super(message, 'INTG_CONNECTOR_CREATE_ERROR', 500);
  }
}

export class IntgConnectorUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le connecteur') {
    super(message, 'INTG_CONNECTOR_UPDATE_ERROR', 500);
  }
}

export class IntgConnectorDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le connecteur') {
    super(message, 'INTG_CONNECTOR_DELETE_ERROR', 500);
  }
}

export class IntgConnectorConfigError extends AppError {
  constructor(message = 'Configuration du connecteur invalide') {
    super(message, 'INTG_CONNECTOR_CONFIG_ERROR', 400);
  }
}

export class IntgConnectorAuthError extends AppError {
  constructor(message = 'Authentification du connecteur échouée') {
    super(message, 'INTG_CONNECTOR_AUTH_ERROR', 401);
  }
}

export class IntgConnectorSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation du connecteur') {
    super(message, 'INTG_CONNECTOR_SYNC_ERROR', 500);
  }
}

export class IntgConnectorMappingError extends AppError {
  constructor(message = 'Mappage du connecteur invalide') {
    super(message, 'INTG_CONNECTOR_MAPPING_ERROR', 400);
  }
}

export class IntgConnectorHealthError extends AppError {
  constructor(message = 'Santé du connecteur dégradée') {
    super(message, 'INTG_CONNECTOR_HEALTH_ERROR', 502);
  }
}

export class IntgConnectorRateLimitError extends AppError {
  constructor(message = 'Limite de débit du connecteur atteinte') {
    super(message, 'INTG_CONNECTOR_RATE_LIMIT_ERROR', 429);
  }
}

export class IntgConnectorTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente du connecteur dépassé') {
    super(message, 'INTG_CONNECTOR_TIMEOUT_ERROR', 504);
  }
}

export class IntgConnectorDisabledError extends AppError {
  constructor(message = 'Connecteur désactivé') {
    super(message, 'INTG_CONNECTOR_DISABLED_ERROR', 403);
  }
}

export class IntgConnectorBatchError extends AppError {
  constructor(message = 'Erreur de traitement par lots du connecteur') {
    super(message, 'INTG_CONNECTOR_BATCH_ERROR', 500);
  }
}

export class IntgConnectorTransformationError extends AppError {
  constructor(message = 'Erreur de transformation du connecteur') {
    super(message, 'INTG_CONNECTOR_TRANSFORMATION_ERROR', 500);
  }
}

export class IntgConnectorCacheError extends AppError {
  constructor(message = 'Erreur de cache du connecteur') {
    super(message, 'INTG_CONNECTOR_CACHE_ERROR', 500);
  }
}

export class IntgGoogleConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Google') {
    super(message, 'INTG_GOOGLE_CONNECTOR_ERROR', 502);
  }
}

export class IntgMicrosoftConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Microsoft') {
    super(message, 'INTG_MICROSOFT_CONNECTOR_ERROR', 502);
  }
}

export class IntgZoomConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Zoom') {
    super(message, 'INTG_ZOOM_CONNECTOR_ERROR', 502);
  }
}

export class IntgSlackConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Slack') {
    super(message, 'INTG_SLACK_CONNECTOR_ERROR', 502);
  }
}

export class IntgTwilioConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Twilio') {
    super(message, 'INTG_TWILIO_CONNECTOR_ERROR', 502);
  }
}

export class IntgStripeConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Stripe') {
    super(message, 'INTG_STRIPE_CONNECTOR_ERROR', 502);
  }
}

export class IntgFirebaseConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Firebase') {
    super(message, 'INTG_FIREBASE_CONNECTOR_ERROR', 502);
  }
}

export class IntgSupabaseConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Supabase') {
    super(message, 'INTG_SUPABASE_CONNECTOR_ERROR', 502);
  }
}

export class IntgAWSConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur AWS') {
    super(message, 'INTG_AWS_CONNECTOR_ERROR', 502);
  }
}

export class IntgAzureConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur Azure') {
    super(message, 'INTG_AZURE_CONNECTOR_ERROR', 502);
  }
}

export class IntgLDAPConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur LDAP') {
    super(message, 'INTG_LDAP_CONNECTOR_ERROR', 502);
  }
}

export class IntgSAMLConnectorError extends AppError {
  constructor(message = 'Erreur du connecteur SAML') {
    super(message, 'INTG_SAML_CONNECTOR_ERROR', 502);
  }
}

export class IntgConnectorWebhookError extends AppError {
  constructor(message = 'Erreur de webhook du connecteur') {
    super(message, 'INTG_CONNECTOR_WEBHOOK_ERROR', 500);
  }
}

export class IntgConnectorVersionError extends AppError {
  constructor(message = 'Version du connecteur incompatible') {
    super(message, 'INTG_CONNECTOR_VERSION_ERROR', 400);
  }
}

export class IntgConnectorRetryError extends AppError {
  constructor(message = 'Erreur de reprise du connecteur') {
    super(message, 'INTG_CONNECTOR_RETRY_ERROR', 500);
  }
}
