import { AppError } from './AppError';

export class MINMinistryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_ERROR', 500, true);
  }
}

export class MINMinistryNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_NOT_FOUND', 404, true);
  }
}

export class MINMinistryAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_ALREADY_EXISTS', 409, true);
  }
}

export class MINMinistryUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_UPDATE_ERROR', 500, true);
  }
}

export class MINMinistryDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_DELETE_ERROR', 500, true);
  }
}

export class MINMinistryAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_ACCESS_DENIED', 403, true);
  }
}

export class MINMinistryValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_VALIDATION_ERROR', 422, true);
  }
}

export class MINMinistrySyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_SYNC_ERROR', 502, true);
  }
}

export class MINDepartmentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_ERROR', 500, true);
  }
}

export class MINDepartmentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_NOT_FOUND', 404, true);
  }
}

export class MINDepartmentAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_ALREADY_EXISTS', 409, true);
  }
}

export class MINDepartmentUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_UPDATE_ERROR', 500, true);
  }
}

export class MINDepartmentDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_DELETE_ERROR', 500, true);
  }
}

export class MINDepartmentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_ACCESS_DENIED', 403, true);
  }
}

export class MINDepartmentValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_VALIDATION_ERROR', 422, true);
  }
}

export class MINDepartmentHierarchyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_HIERARCHY_ERROR', 400, true);
  }
}

export class MINPolicyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_ERROR', 500, true);
  }
}

export class MINPolicyNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_NOT_FOUND', 404, true);
  }
}

export class MINPolicyAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_ALREADY_EXISTS', 409, true);
  }
}

export class MINPolicyUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_UPDATE_ERROR', 500, true);
  }
}

export class MINPolicyDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_DELETE_ERROR', 500, true);
  }
}

export class MINPolicyApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_APPROVAL_ERROR', 400, true);
  }
}

export class MINPolicyVersionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_VERSION_ERROR', 400, true);
  }
}

export class MINPolicyConflictError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_CONFLICT_ERROR', 409, true);
  }
}

export class MINDirectiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_ERROR', 500, true);
  }
}

export class MINDirectiveNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_NOT_FOUND', 404, true);
  }
}

export class MINDirectiveAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_ALREADY_EXISTS', 409, true);
  }
}

export class MINDirectiveUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_UPDATE_ERROR', 500, true);
  }
}

export class MINDirectiveDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_DELETE_ERROR', 500, true);
  }
}

export class MINDirectiveAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_ACCESS_DENIED', 403, true);
  }
}

export class MINDirectiveValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_VALIDATION_ERROR', 422, true);
  }
}

export class MINDirectiveBroadcastError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_BROADCAST_ERROR', 502, true);
  }
}

export class MINRegulationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_ERROR', 500, true);
  }
}

export class MINRegulationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_NOT_FOUND', 404, true);
  }
}

export class MINRegulationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_ALREADY_EXISTS', 409, true);
  }
}

export class MINRegulationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_UPDATE_ERROR', 500, true);
  }
}

export class MINRegulationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_DELETE_ERROR', 500, true);
  }
}

export class MINRegulationPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_PUBLISH_ERROR', 500, true);
  }
}

export class MINRegulationAmendmentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_AMENDMENT_ERROR', 400, true);
  }
}

export class MINCircularError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_ERROR', 500, true);
  }
}

export class MINCircularNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_NOT_FOUND', 404, true);
  }
}

export class MINCircularAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_ALREADY_EXISTS', 409, true);
  }
}

export class MINCircularUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_UPDATE_ERROR', 500, true);
  }
}

export class MINCircularDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_DELETE_ERROR', 500, true);
  }
}

export class MINCircularDistributionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_DISTRIBUTION_ERROR', 502, true);
  }
}

export class MINPersonnelError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_ERROR', 500, true);
  }
}

export class MINPersonnelNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_NOT_FOUND', 404, true);
  }
}

export class MINPersonnelAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_ALREADY_EXISTS', 409, true);
  }
}

export class MINPersonnelUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_UPDATE_ERROR', 500, true);
  }
}

export class MINPersonnelDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_DELETE_ERROR', 500, true);
  }
}

export class MINPersonnelAssignmentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_ASSIGNMENT_ERROR', 400, true);
  }
}

export class MINPersonnelTransferError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_TRANSFER_ERROR', 400, true);
  }
}

export class MINPersonnelPromotionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_PROMOTION_ERROR', 400, true);
  }
}

export class MINElectionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_ERROR', 500, true);
  }
}

export class MINElectionNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_NOT_FOUND', 404, true);
  }
}

export class MINElectionAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_ALREADY_EXISTS', 409, true);
  }
}

export class MINElectionUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_UPDATE_ERROR', 500, true);
  }
}

export class MINElectionDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_DELETE_ERROR', 500, true);
  }
}

export class MINElectionAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_ACCESS_DENIED', 403, true);
  }
}

export class MINElectionResultError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_RESULT_ERROR', 400, true);
  }
}

export class MINParliamentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_ERROR', 500, true);
  }
}

export class MINParliamentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_NOT_FOUND', 404, true);
  }
}

export class MINParliamentSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_SESSION_ERROR', 400, true);
  }
}

export class MINParliamentVoteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_VOTE_ERROR', 400, true);
  }
}

export class MINParliamentDebateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_DEBATE_ERROR', 400, true);
  }
}

export class MINFederalismError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_ERROR', 500, true);
  }
}

export class MINFederalismNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_NOT_FOUND', 404, true);
  }
}

export class MINFederalismAllocationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_ALLOCATION_ERROR', 400, true);
  }
}

export class MINFederalismSyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_SYNC_ERROR', 502, true);
  }
}

export class MINCabinetError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_ERROR', 500, true);
  }
}

export class MINCabinetNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_NOT_FOUND', 404, true);
  }
}

export class MINCabinetUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_UPDATE_ERROR', 500, true);
  }
}

export class MINCabinetAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_ACCESS_DENIED', 403, true);
  }
}

export class MINDiplomaticError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_ERROR', 500, true);
  }
}

export class MINDiplomaticNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_NOT_FOUND', 404, true);
  }
}

export class MINDiplomaticAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_ACCESS_DENIED', 403, true);
  }
}

export class MINDiplomaticCredentialError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_CREDENTIAL_ERROR', 400, true);
  }
}

export class MINIntergovernmentalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_ERROR', 500, true);
  }
}

export class MINIntergovernmentalNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_NOT_FOUND', 404, true);
  }
}

export class MINIntergovernmentalUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_UPDATE_ERROR', 500, true);
  }
}

export class MINIntergovernmentalAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_ACCESS_DENIED', 403, true);
  }
}

export class MINIntergovernmentalProtocolError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_PROTOCOL_ERROR', 400, true);
  }
}

export class MINPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_REVIEW_ERROR', 400, true);
  }
}

export class MINPolicyEnforcementError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_ENFORCEMENT_ERROR', 500, true);
  }
}

export class MINPolicyComplianceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_COMPLIANCE_ERROR', 422, true);
  }
}

export class MINEmergencySessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_EMERGENCY_SESSION_ERROR', 400, true);
  }
}

export class MINEmergencyDecreeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_EMERGENCY_DECREE_ERROR', 400, true);
  }
}

export class MINGovernmentReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_GOVERNMENT_REPORT_ERROR', 500, true);
  }
}

export class MINGovernmentReportNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_GOVERNMENT_REPORT_NOT_FOUND', 404, true);
  }
}

export class MINGovernmentReportAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_GOVERNMENT_REPORT_ACCESS_DENIED', 403, true);
  }
}

export class MINGovernmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_GOVERNMENT_ARCHIVE_ERROR', 500, true);
  }
}

export class MINGovernmentArchiveAccessError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_GOVERNMENT_ARCHIVE_ACCESS_ERROR', 403, true);
  }
}

export class MINNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_NOTIFICATION_ERROR', 500, true);
  }
}

export class MINNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class MINNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class MINConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CONFIG_ERROR', 500, true);
  }
}

export class MINConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CONFIG_NOT_FOUND', 404, true);
  }
}

export class MINConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class MINConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class MINConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class MINAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_AUDIT_LOG_ERROR', 500, true);
  }
}

export class MINAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class MINAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class MINIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTEGRATION_ERROR', 502, true);
  }
}

export class MINIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class MINIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class MINIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class MINDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DATA_EXPORT_ERROR', 500, true);
  }
}

export class MINDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DATA_IMPORT_ERROR', 500, true);
  }
}

export class MINDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class MINDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DASHBOARD_ERROR', 500, true);
  }
}

export class MINDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class MINDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class MINSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_SESSION_ERROR', 401, true);
  }
}

export class MINSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_SESSION_EXPIRED', 401, true);
  }
}

export class MINSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_SESSION_REVOKED', 401, true);
  }
}

export class MINRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_RATE_LIMIT_ERROR', 429, true);
  }
}

export class MINInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERNAL_ERROR', 500, false);
  }
}

export class MINExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class MINMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MAINTENANCE_ERROR', 503, true);
  }
}

export class REGRegistryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_ERROR', 500, true);
  }
}

export class REGRegistryNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_NOT_FOUND', 404, true);
  }
}

export class REGRegistryAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_ALREADY_EXISTS', 409, true);
  }
}

export class REGRegistryUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_UPDATE_ERROR', 500, true);
  }
}

export class REGRegistryDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_DELETE_ERROR', 500, true);
  }
}

export class REGRegistryAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_ACCESS_DENIED', 403, true);
  }
}

export class REGRegistryValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_VALIDATION_ERROR', 422, true);
  }
}

export class REGRegistrySyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_REGISTRY_SYNC_ERROR', 502, true);
  }
}

export class REGCitizenError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_ERROR', 500, true);
  }
}

export class REGCitizenNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_NOT_FOUND', 404, true);
  }
}

export class REGCitizenAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_ALREADY_EXISTS', 409, true);
  }
}

export class REGCitizenUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_UPDATE_ERROR', 500, true);
  }
}

export class REGCitizenDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_DELETE_ERROR', 500, true);
  }
}

export class REGCitizenAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_ACCESS_DENIED', 403, true);
  }
}

export class REGCitizenValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_VALIDATION_ERROR', 422, true);
  }
}

export class REGCitizenDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CITIZEN_DUPLICATE_ERROR', 409, true);
  }
}

export class REGBirthRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BIRTH_REGISTRATION_ERROR', 500, true);
  }
}

export class REGBirthRegistrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BIRTH_REGISTRATION_NOT_FOUND', 404, true);
  }
}

export class REGBirthRegistrationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BIRTH_REGISTRATION_DUPLICATE', 409, true);
  }
}

export class REGBirthRegistrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BIRTH_REGISTRATION_VALIDATION', 422, true);
  }
}

export class REGDeathRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEATH_REGISTRATION_ERROR', 500, true);
  }
}

export class REGDeathRegistrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEATH_REGISTRATION_NOT_FOUND', 404, true);
  }
}

export class REGDeathRegistrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEATH_REGISTRATION_VALIDATION', 422, true);
  }
}

export class REGDeathRegistrationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEATH_REGISTRATION_ACCESS_DENIED', 403, true);
  }
}

export class REGMarriageRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MARRIAGE_REGISTRATION_ERROR', 500, true);
  }
}

export class REGMarriageRegistrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MARRIAGE_REGISTRATION_NOT_FOUND', 404, true);
  }
}

export class REGMarriageRegistrationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MARRIAGE_REGISTRATION_DUPLICATE', 409, true);
  }
}

export class REGMarriageRegistrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MARRIAGE_REGISTRATION_VALIDATION', 422, true);
  }
}

export class REGAddressRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ADDRESS_REGISTRATION_ERROR', 500, true);
  }
}

export class REGAddressRegistrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ADDRESS_REGISTRATION_NOT_FOUND', 404, true);
  }
}

export class REGAddressRegistrationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ADDRESS_REGISTRATION_DUPLICATE', 409, true);
  }
}

export class REGAddressRegistrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ADDRESS_REGISTRATION_VALIDATION', 422, true);
  }
}

export class REGBusinessRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BUSINESS_REGISTRATION_ERROR', 500, true);
  }
}

export class REGBusinessRegistrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BUSINESS_REGISTRATION_NOT_FOUND', 404, true);
  }
}

export class REGBusinessRegistrationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BUSINESS_REGISTRATION_DUPLICATE', 409, true);
  }
}

export class REGBusinessRegistrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BUSINESS_REGISTRATION_VALIDATION', 422, true);
  }
}

export class REGBusinessRegistrationApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BUSINESS_REGISTRATION_APPROVAL', 400, true);
  }
}

export class REGPropertyRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_PROPERTY_REGISTRATION_ERROR', 500, true);
  }
}

export class REGPropertyRegistrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_PROPERTY_REGISTRATION_NOT_FOUND', 404, true);
  }
}

export class REGPropertyRegistrationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_PROPERTY_REGISTRATION_DUPLICATE', 409, true);
  }
}

export class REGPropertyRegistrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_PROPERTY_REGISTRATION_VALIDATION', 422, true);
  }
}

export class REGPropertyTransferError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_PROPERTY_TRANSFER_ERROR', 400, true);
  }
}

export class REGDocumentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_ERROR', 500, true);
  }
}

export class REGDocumentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_NOT_FOUND', 404, true);
  }
}

export class REGDocumentAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_ALREADY_EXISTS', 409, true);
  }
}

export class REGDocumentUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_UPDATE_ERROR', 500, true);
  }
}

export class REGDocumentDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_DELETE_ERROR', 500, true);
  }
}

export class REGDocumentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_ACCESS_DENIED', 403, true);
  }
}

export class REGDocumentValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DOCUMENT_VALIDATION_ERROR', 422, true);
  }
}

export class REGCertificateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_ERROR', 500, true);
  }
}

export class REGCertificateNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_NOT_FOUND', 404, true);
  }
}

export class REGCertificateRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_REVOKED', 410, true);
  }
}

export class REGCertificateExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_EXPIRED', 410, true);
  }
}

export class REGCertificateValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_VALIDATION_ERROR', 422, true);
  }
}

export class REGCertificateIssueError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_ISSUE_ERROR', 500, true);
  }
}

export class REGCertificateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CERTIFICATE_REVOKE_ERROR', 400, true);
  }
}

export class REGVerificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_VERIFICATION_ERROR', 500, true);
  }
}

export class REGVerificationFailedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_VERIFICATION_FAILED', 422, true);
  }
}

export class REGVerificationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_VERIFICATION_ACCESS_DENIED', 403, true);
  }
}

export class REGDemographicError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEMOGRAPHIC_ERROR', 500, true);
  }
}

export class REGDemographicNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEMOGRAPHIC_NOT_FOUND', 404, true);
  }
}

export class REGDemographicUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEMOGRAPHIC_UPDATE_ERROR', 500, true);
  }
}

export class REGDemographicValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DEMOGRAPHIC_VALIDATION_ERROR', 422, true);
  }
}

export class REGStatisticsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_STATISTICS_ERROR', 500, true);
  }
}

export class REGStatisticsAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_STATISTICS_ACCESS_DENIED', 403, true);
  }
}

export class REGStatisticsDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_STATISTICS_DATA_ERROR', 500, true);
  }
}

export class REGSearchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_SEARCH_ERROR', 500, true);
  }
}

export class REGSearchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_SEARCH_ACCESS_DENIED', 403, true);
  }
}

export class REGSearchRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_SEARCH_RATE_LIMIT', 429, true);
  }
}

export class REGBulkOperationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BULK_OPERATION_ERROR', 500, true);
  }
}

export class REGBulkOperationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BULK_OPERATION_ACCESS_DENIED', 403, true);
  }
}

export class REGBulkOperationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_BULK_OPERATION_VALIDATION_ERROR', 422, true);
  }
}

export class REGMigrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MIGRATION_ERROR', 500, true);
  }
}

export class REGMigrationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MIGRATION_ACCESS_DENIED', 403, true);
  }
}

export class REGMigrationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MIGRATION_VALIDATION_ERROR', 422, true);
  }
}

export class REGIdGenerationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ID_GENERATION_ERROR', 500, true);
  }
}

export class REGIdGenerationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ID_GENERATION_DUPLICATE', 409, true);
  }
}

export class REGIdGenerationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ID_GENERATION_ACCESS_DENIED', 403, true);
  }
}

export class REGCrossReferenceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CROSS_REFERENCE_ERROR', 500, true);
  }
}

export class REGCrossReferenceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CROSS_REFERENCE_NOT_FOUND', 404, true);
  }
}

export class REGCrossReferenceConflictError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CROSS_REFERENCE_CONFLICT', 409, true);
  }
}

export class REGArchivalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ARCHIVAL_ERROR', 500, true);
  }
}

export class REGArchivalAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_ARCHIVAL_ACCESS_DENIED', 403, true);
  }
}

export class REGNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_NOTIFICATION_ERROR', 500, true);
  }
}

export class REGNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class REGNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class REGConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CONFIG_ERROR', 500, true);
  }
}

export class REGConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CONFIG_NOT_FOUND', 404, true);
  }
}

export class REGConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class REGConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class REGConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class REGAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_AUDIT_LOG_ERROR', 500, true);
  }
}

export class REGAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class REGAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class REGIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_INTEGRATION_ERROR', 502, true);
  }
}

export class REGIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class REGIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class REGIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class REGDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DATA_EXPORT_ERROR', 500, true);
  }
}

export class REGDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DATA_IMPORT_ERROR', 500, true);
  }
}

export class REGDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class REGDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DASHBOARD_ERROR', 500, true);
  }
}

export class REGDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class REGDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class REGSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_SESSION_ERROR', 401, true);
  }
}

export class REGSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_SESSION_EXPIRED', 401, true);
  }
}

export class REGSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_SESSION_REVOKED', 401, true);
  }
}

export class REGRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_RATE_LIMIT_ERROR', 429, true);
  }
}

export class REGInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_INTERNAL_ERROR', 500, false);
  }
}

export class REGExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class REGMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_MAINTENANCE_ERROR', 503, true);
  }
}

export class EXMExaminationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_ERROR', 500, true);
  }
}

export class EXMExaminationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_NOT_FOUND', 404, true);
  }
}

export class EXMExaminationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_ALREADY_EXISTS', 409, true);
  }
}

export class EXMExaminationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_UPDATE_ERROR', 500, true);
  }
}

export class EXMExaminationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_DELETE_ERROR', 500, true);
  }
}

export class EXMExaminationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_ACCESS_DENIED', 403, true);
  }
}

export class EXMExaminationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_VALIDATION_ERROR', 422, true);
  }
}

export class EXMExaminationScheduleError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXAMINATION_SCHEDULE_ERROR', 400, true);
  }
}

export class EXMCurriculumError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_ERROR', 500, true);
  }
}

export class EXMCurriculumNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_NOT_FOUND', 404, true);
  }
}

export class EXMCurriculumAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_ALREADY_EXISTS', 409, true);
  }
}

export class EXMCurriculumUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_UPDATE_ERROR', 500, true);
  }
}

export class EXMCurriculumDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_DELETE_ERROR', 500, true);
  }
}

export class EXMCurriculumApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_APPROVAL_ERROR', 400, true);
  }
}

export class EXMCurriculumVersionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CURRICULUM_VERSION_ERROR', 400, true);
  }
}

export class EXMCertificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_ERROR', 500, true);
  }
}

export class EXMCertificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_NOT_FOUND', 404, true);
  }
}

export class EXMCertificationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_ALREADY_EXISTS', 409, true);
  }
}

export class EXMCertificationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_UPDATE_ERROR', 500, true);
  }
}

export class EXMCertificationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_DELETE_ERROR', 500, true);
  }
}

export class EXMCertificationApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_APPROVAL_ERROR', 400, true);
  }
}

export class EXMCertificationRevocationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_REVOCATION_ERROR', 400, true);
  }
}

export class EXMStandardsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STANDARDS_ERROR', 500, true);
  }
}

export class EXMStandardsNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STANDARDS_NOT_FOUND', 404, true);
  }
}

export class EXMStandardsAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STANDARDS_ALREADY_EXISTS', 409, true);
  }
}

export class EXMStandardsUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STANDARDS_UPDATE_ERROR', 500, true);
  }
}

export class EXMStandardsDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STANDARDS_DELETE_ERROR', 500, true);
  }
}

export class EXMStandardsApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STANDARDS_APPROVAL_ERROR', 400, true);
  }
}

export class EXMAccreditationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_ERROR', 500, true);
  }
}

export class EXMAccreditationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_NOT_FOUND', 404, true);
  }
}

export class EXMAccreditationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_ALREADY_EXISTS', 409, true);
  }
}

export class EXMAccreditationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_UPDATE_ERROR', 500, true);
  }
}

export class EXMAccreditationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_DELETE_ERROR', 500, true);
  }
}

export class EXMAccreditationApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_APPROVAL_ERROR', 400, true);
  }
}

export class EXMAccreditationRevocationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_ACCREDITATION_REVOCATION_ERROR', 400, true);
  }
}

export class EXMInspectionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INSPECTION_ERROR', 500, true);
  }
}

export class EXMInspectionNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INSPECTION_NOT_FOUND', 404, true);
  }
}

export class EXMInspectionUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INSPECTION_UPDATE_ERROR', 500, true);
  }
}

export class EXMInspectionDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INSPECTION_DELETE_ERROR', 500, true);
  }
}

export class EXMInspectionAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INSPECTION_ACCESS_DENIED', 403, true);
  }
}

export class EXMInspectionValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INSPECTION_VALIDATION_ERROR', 422, true);
  }
}

export class EXMGradingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_GRADING_ERROR', 500, true);
  }
}

export class EXMGradingNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_GRADING_NOT_FOUND', 404, true);
  }
}

export class EXMGradingUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_GRADING_UPDATE_ERROR', 500, true);
  }
}

export class EXMGradingValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_GRADING_VALIDATION_ERROR', 422, true);
  }
}

export class EXMGradingAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_GRADING_ACCESS_DENIED', 403, true);
  }
}

export class EXMTestCenterError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_TEST_CENTER_ERROR', 500, true);
  }
}

export class EXMTestCenterNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_TEST_CENTER_NOT_FOUND', 404, true);
  }
}

export class EXMTestCenterAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_TEST_CENTER_ALREADY_EXISTS', 409, true);
  }
}

export class EXMTestCenterUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_TEST_CENTER_UPDATE_ERROR', 500, true);
  }
}

export class EXMTestCenterDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_TEST_CENTER_DELETE_ERROR', 500, true);
  }
}

export class EXMTestCenterAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_TEST_CENTER_ACCESS_DENIED', 403, true);
  }
}

export class EXMResultError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_RESULT_ERROR', 500, true);
  }
}

export class EXMResultNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_RESULT_NOT_FOUND', 404, true);
  }
}

export class EXMResultUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_RESULT_UPDATE_ERROR', 500, true);
  }
}

export class EXMResultAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_RESULT_ACCESS_DENIED', 403, true);
  }
}

export class EXMResultPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_RESULT_PUBLISH_ERROR', 500, true);
  }
}

export class EXMCandidateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CANDIDATE_ERROR', 500, true);
  }
}

export class EXMCandidateNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CANDIDATE_NOT_FOUND', 404, true);
  }
}

export class EXMCandidateAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CANDIDATE_ALREADY_EXISTS', 409, true);
  }
}

export class EXMCandidateUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CANDIDATE_UPDATE_ERROR', 500, true);
  }
}

export class EXMCandidateDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CANDIDATE_DELETE_ERROR', 500, true);
  }
}

export class EXMCandidateRegistrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CANDIDATE_REGISTRATION_ERROR', 400, true);
  }
}

export class EXMPaperError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_ERROR', 500, true);
  }
}

export class EXMPaperNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_NOT_FOUND', 404, true);
  }
}

export class EXMPaperAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_ALREADY_EXISTS', 409, true);
  }
}

export class EXMPaperUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_UPDATE_ERROR', 500, true);
  }
}

export class EXMPaperDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_DELETE_ERROR', 500, true);
  }
}

export class EXMPaperAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_ACCESS_DENIED', 403, true);
  }
}

export class EXMPaperValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PAPER_VALIDATION_ERROR', 422, true);
  }
}

export class EXMSyllabusError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SYLLABUS_ERROR', 500, true);
  }
}

export class EXMSyllabusNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SYLLABUS_NOT_FOUND', 404, true);
  }
}

export class EXMSyllabusAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SYLLABUS_ALREADY_EXISTS', 409, true);
  }
}

export class EXMSyllabusUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SYLLABUS_UPDATE_ERROR', 500, true);
  }
}

export class EXMSyllabusDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SYLLABUS_DELETE_ERROR', 500, true);
  }
}

export class EXMSyllabusApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SYLLABUS_APPROVAL_ERROR', 400, true);
  }
}

export class EXMQuestionBankError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_QUESTION_BANK_ERROR', 500, true);
  }
}

export class EXMQuestionBankNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_QUESTION_BANK_NOT_FOUND', 404, true);
  }
}

export class EXMQuestionBankAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_QUESTION_BANK_ACCESS_DENIED', 403, true);
  }
}

export class EXMQuestionBankValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_QUESTION_BANK_VALIDATION_ERROR', 422, true);
  }
}

export class EXMProctoringError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PROCTORING_ERROR', 500, true);
  }
}

export class EXMProctoringNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PROCTORING_NOT_FOUND', 404, true);
  }
}

export class EXMProctoringAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PROCTORING_ACCESS_DENIED', 403, true);
  }
}

export class EXMProctoringValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_PROCTORING_VALIDATION_ERROR', 422, true);
  }
}

export class EXMStatisticsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STATISTICS_ERROR', 500, true);
  }
}

export class EXMStatisticsAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STATISTICS_ACCESS_DENIED', 403, true);
  }
}

export class EXMStatisticsDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_STATISTICS_DATA_ERROR', 500, true);
  }
}

export class EXMAppealError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_APPEAL_ERROR', 500, true);
  }
}

export class EXMAppealNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_APPEAL_NOT_FOUND', 404, true);
  }
}

export class EXMAppealAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_APPEAL_ALREADY_EXISTS', 409, true);
  }
}

export class EXMAppealUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_APPEAL_UPDATE_ERROR', 500, true);
  }
}

export class EXMAppealDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_APPEAL_DELETE_ERROR', 500, true);
  }
}

export class EXMAppealAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_APPEAL_ACCESS_DENIED', 403, true);
  }
}

export class EXMCertificationDocumentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_DOCUMENT_ERROR', 500, true);
  }
}

export class EXMCertificationDocumentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_DOCUMENT_NOT_FOUND', 404, true);
  }
}

export class EXMCertificationDocumentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CERTIFICATION_DOCUMENT_ACCESS_DENIED', 403, true);
  }
}

export class EXMComplianceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_COMPLIANCE_ERROR', 500, true);
  }
}

export class EXMComplianceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_COMPLIANCE_NOT_FOUND', 404, true);
  }
}

export class EXMComplianceUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_COMPLIANCE_UPDATE_ERROR', 500, true);
  }
}

export class EXMComplianceAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_COMPLIANCE_ACCESS_DENIED', 403, true);
  }
}

export class EXMComplianceValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_COMPLIANCE_VALIDATION_ERROR', 422, true);
  }
}

export class EXMNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_NOTIFICATION_ERROR', 500, true);
  }
}

export class EXMNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class EXMNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class EXMConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CONFIG_ERROR', 500, true);
  }
}

export class EXMConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CONFIG_NOT_FOUND', 404, true);
  }
}

export class EXMConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class EXMConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class EXMConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class EXMAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_AUDIT_LOG_ERROR', 500, true);
  }
}

export class EXMAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class EXMAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class EXMIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INTEGRATION_ERROR', 502, true);
  }
}

export class EXMIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class EXMIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class EXMIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class EXMDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_DATA_EXPORT_ERROR', 500, true);
  }
}

export class EXMDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_DATA_IMPORT_ERROR', 500, true);
  }
}

export class EXMDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class EXMDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_DASHBOARD_ERROR', 500, true);
  }
}

export class EXMDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class EXMDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class EXMSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SESSION_ERROR', 401, true);
  }
}

export class EXMSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SESSION_EXPIRED', 401, true);
  }
}

export class EXMSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_SESSION_REVOKED', 401, true);
  }
}

export class EXMRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_RATE_LIMIT_ERROR', 429, true);
  }
}

export class EXMInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_INTERNAL_ERROR', 500, false);
  }
}

export class EXMExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class EXMMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_MAINTENANCE_ERROR', 503, true);
  }
}

export class PUBPublicFinanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PUBLIC_FINANCE_ERROR', 500, true);
  }
}

export class PUBPublicFinanceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PUBLIC_FINANCE_NOT_FOUND', 404, true);
  }
}

export class PUBPublicFinanceUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PUBLIC_FINANCE_UPDATE_ERROR', 500, true);
  }
}

export class PUBPublicFinanceDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PUBLIC_FINANCE_DELETE_ERROR', 500, true);
  }
}

export class PUBPublicFinanceAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PUBLIC_FINANCE_ACCESS_DENIED', 403, true);
  }
}

export class PUBPublicFinanceValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PUBLIC_FINANCE_VALIDATION_ERROR', 422, true);
  }
}

export class PUBBudgetError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_ERROR', 500, true);
  }
}

export class PUBBudgetNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_NOT_FOUND', 404, true);
  }
}

export class PUBBudgetAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_ALREADY_EXISTS', 409, true);
  }
}

export class PUBBudgetUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_UPDATE_ERROR', 500, true);
  }
}

export class PUBBudgetDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_DELETE_ERROR', 500, true);
  }
}

export class PUBBudgetApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_APPROVAL_ERROR', 400, true);
  }
}

export class PUBBudgetOverrunError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_OVERRUN_ERROR', 400, true);
  }
}

export class PUBBudgetAllocationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_BUDGET_ALLOCATION_ERROR', 400, true);
  }
}

export class PUBTreasuryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TREASURY_ERROR', 500, true);
  }
}

export class PUBTreasuryNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TREASURY_NOT_FOUND', 404, true);
  }
}

export class PUBTreasuryUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TREASURY_UPDATE_ERROR', 500, true);
  }
}

export class PUBTreasuryAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TREASURY_ACCESS_DENIED', 403, true);
  }
}

export class PUBTreasurySyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TREASURY_SYNC_ERROR', 502, true);
  }
}

export class PUBProcurementError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_ERROR', 500, true);
  }
}

export class PUBProcurementNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_NOT_FOUND', 404, true);
  }
}

export class PUBProcurementAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_ALREADY_EXISTS', 409, true);
  }
}

export class PUBProcurementUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_UPDATE_ERROR', 500, true);
  }
}

export class PUBProcurementDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_DELETE_ERROR', 500, true);
  }
}

export class PUBProcurementApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_APPROVAL_ERROR', 400, true);
  }
}

export class PUBProcurementBidError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PROCUREMENT_BID_ERROR', 400, true);
  }
}

export class PUBContractError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_ERROR', 500, true);
  }
}

export class PUBContractNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_NOT_FOUND', 404, true);
  }
}

export class PUBContractAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_ALREADY_EXISTS', 409, true);
  }
}

export class PUBContractUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_UPDATE_ERROR', 500, true);
  }
}

export class PUBContractDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_DELETE_ERROR', 500, true);
  }
}

export class PUBContractApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_APPROVAL_ERROR', 400, true);
  }
}

export class PUBContractViolationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONTRACT_VIOLATION_ERROR', 400, true);
  }
}

export class PUBInvoiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INVOICE_ERROR', 500, true);
  }
}

export class PUBInvoiceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INVOICE_NOT_FOUND', 404, true);
  }
}

export class PUBInvoiceAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INVOICE_ALREADY_EXISTS', 409, true);
  }
}

export class PUBInvoiceUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INVOICE_UPDATE_ERROR', 500, true);
  }
}

export class PUBInvoiceDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INVOICE_DELETE_ERROR', 500, true);
  }
}

export class PUBInvoiceApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INVOICE_APPROVAL_ERROR', 400, true);
  }
}

export class PUBPaymentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_ERROR', 500, true);
  }
}

export class PUBPaymentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_NOT_FOUND', 404, true);
  }
}

export class PUBPaymentAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_ALREADY_EXISTS', 409, true);
  }
}

export class PUBPaymentUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_UPDATE_ERROR', 500, true);
  }
}

export class PUBPaymentDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_DELETE_ERROR', 500, true);
  }
}

export class PUBPaymentAuthorizationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_AUTHORIZATION_ERROR', 400, true);
  }
}

export class PUBPaymentReconciliationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_PAYMENT_RECONCILIATION_ERROR', 400, true);
  }
}

export class PUBFiscalYearError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_FISCAL_YEAR_ERROR', 500, true);
  }
}

export class PUBFiscalYearNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_FISCAL_YEAR_NOT_FOUND', 404, true);
  }
}

export class PUBFiscalYearAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_FISCAL_YEAR_ALREADY_EXISTS', 409, true);
  }
}

export class PUBFiscalYearUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_FISCAL_YEAR_UPDATE_ERROR', 500, true);
  }
}

export class PUBFiscalYearCloseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_FISCAL_YEAR_CLOSE_ERROR', 400, true);
  }
}

export class PUBTaxError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TAX_ERROR', 500, true);
  }
}

export class PUBTaxNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TAX_NOT_FOUND', 404, true);
  }
}

export class PUBTaxUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TAX_UPDATE_ERROR', 500, true);
  }
}

export class PUBTaxCollectionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TAX_COLLECTION_ERROR', 500, true);
  }
}

export class PUBTaxComplianceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TAX_COMPLIANCE_ERROR', 422, true);
  }
}

export class PUBGrantError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_GRANT_ERROR', 500, true);
  }
}

export class PUBGrantNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_GRANT_NOT_FOUND', 404, true);
  }
}

export class PUBGrantAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_GRANT_ALREADY_EXISTS', 409, true);
  }
}

export class PUBGrantUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_GRANT_UPDATE_ERROR', 500, true);
  }
}

export class PUBGrantDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_GRANT_DELETE_ERROR', 500, true);
  }
}

export class PUBGrantApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_GRANT_APPROVAL_ERROR', 400, true);
  }
}

export class PUBDebtError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DEBT_ERROR', 500, true);
  }
}

export class PUBDebtNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DEBT_NOT_FOUND', 404, true);
  }
}

export class PUBDebtUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DEBT_UPDATE_ERROR', 500, true);
  }
}

export class PUBDebtServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DEBT_SERVICE_ERROR', 500, true);
  }
}

export class PUBDebtComplianceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DEBT_COMPLIANCE_ERROR', 422, true);
  }
}

export class PUBAuditError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_ERROR', 500, true);
  }
}

export class PUBAuditNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_NOT_FOUND', 404, true);
  }
}

export class PUBAuditAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_ACCESS_DENIED', 403, true);
  }
}

export class PUBAuditReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_REPORT_ERROR', 500, true);
  }
}

export class PUBTransparencyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TRANSPARENCY_ERROR', 500, true);
  }
}

export class PUBTransparencyAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TRANSPARENCY_ACCESS_DENIED', 403, true);
  }
}

export class PUBTransparencyDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_TRANSPARENCY_DATA_ERROR', 500, true);
  }
}

export class PUBReportingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_REPORTING_ERROR', 500, true);
  }
}

export class PUBReportingAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_REPORTING_ACCESS_DENIED', 403, true);
  }
}

export class PUBReportingDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_REPORTING_DATA_ERROR', 500, true);
  }
}

export class PUBAllocationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_ALLOCATION_ERROR', 500, true);
  }
}

export class PUBAllocationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_ALLOCATION_NOT_FOUND', 404, true);
  }
}

export class PUBAllocationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_ALLOCATION_UPDATE_ERROR', 500, true);
  }
}

export class PUBAllocationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_ALLOCATION_ACCESS_DENIED', 403, true);
  }
}

export class PUBNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_NOTIFICATION_ERROR', 500, true);
  }
}

export class PUBNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class PUBNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class PUBConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONFIG_ERROR', 500, true);
  }
}

export class PUBConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONFIG_NOT_FOUND', 404, true);
  }
}

export class PUBConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class PUBConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class PUBConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class PUBAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_LOG_ERROR', 500, true);
  }
}

export class PUBAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class PUBAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class PUBIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INTEGRATION_ERROR', 502, true);
  }
}

export class PUBIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class PUBIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class PUBIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class PUBDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DATA_EXPORT_ERROR', 500, true);
  }
}

export class PUBDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DATA_IMPORT_ERROR', 500, true);
  }
}

export class PUBDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class PUBDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DASHBOARD_ERROR', 500, true);
  }
}

export class PUBDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class PUBDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class PUBSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_SESSION_ERROR', 401, true);
  }
}

export class PUBSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_SESSION_EXPIRED', 401, true);
  }
}

export class PUBSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_SESSION_REVOKED', 401, true);
  }
}

export class PUBRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_RATE_LIMIT_ERROR', 429, true);
  }
}

export class PUBInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_INTERNAL_ERROR', 500, false);
  }
}

export class PUBExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class PUBMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_MAINTENANCE_ERROR', 503, true);
  }
}

export class ANLAnalyticsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ANALYTICS_ERROR', 500, true);
  }
}

export class ANLAnalyticsNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ANALYTICS_NOT_FOUND', 404, true);
  }
}

export class ANLAnalyticsUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ANALYTICS_UPDATE_ERROR', 500, true);
  }
}

export class ANLAnalyticsDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ANALYTICS_DELETE_ERROR', 500, true);
  }
}

export class ANLAnalyticsAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ANALYTICS_ACCESS_DENIED', 403, true);
  }
}

export class ANLAnalyticsValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ANALYTICS_VALIDATION_ERROR', 422, true);
  }
}

export class ANLDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DASHBOARD_ERROR', 500, true);
  }
}

export class ANLDashboardNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DASHBOARD_NOT_FOUND', 404, true);
  }
}

export class ANLDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class ANLDashboardUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DASHBOARD_UPDATE_ERROR', 500, true);
  }
}

export class ANLDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class ANLReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_REPORT_ERROR', 500, true);
  }
}

export class ANLReportNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_REPORT_NOT_FOUND', 404, true);
  }
}

export class ANLReportAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_REPORT_ACCESS_DENIED', 403, true);
  }
}

export class ANLReportUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_REPORT_UPDATE_ERROR', 500, true);
  }
}

export class ANLReportDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_REPORT_DELETE_ERROR', 500, true);
  }
}

export class ANLReportGenerationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_REPORT_GENERATION_ERROR', 500, true);
  }
}

export class ANLIndicatorError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_ERROR', 500, true);
  }
}

export class ANLIndicatorNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_NOT_FOUND', 404, true);
  }
}

export class ANLIndicatorAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_ALREADY_EXISTS', 409, true);
  }
}

export class ANLIndicatorUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_UPDATE_ERROR', 500, true);
  }
}

export class ANLIndicatorDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_DELETE_ERROR', 500, true);
  }
}

export class ANLIndicatorAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_ACCESS_DENIED', 403, true);
  }
}

export class ANLIndicatorValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INDICATOR_VALIDATION_ERROR', 422, true);
  }
}

export class ANLDataSourceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_ERROR', 500, true);
  }
}

export class ANLDataSourceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_NOT_FOUND', 404, true);
  }
}

export class ANLDataSourceAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_ALREADY_EXISTS', 409, true);
  }
}

export class ANLDataSourceUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_UPDATE_ERROR', 500, true);
  }
}

export class ANLDataSourceDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_DELETE_ERROR', 500, true);
  }
}

export class ANLDataSourceSyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_SYNC_ERROR', 502, true);
  }
}

export class ANLDataSourceAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_SOURCE_ACCESS_DENIED', 403, true);
  }
}

export class ANLVisualizationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_VISUALIZATION_ERROR', 500, true);
  }
}

export class ANLVisualizationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_VISUALIZATION_NOT_FOUND', 404, true);
  }
}

export class ANLVisualizationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_VISUALIZATION_ALREADY_EXISTS', 409, true);
  }
}

export class ANLVisualizationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_VISUALIZATION_UPDATE_ERROR', 500, true);
  }
}

export class ANLVisualizationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_VISUALIZATION_DELETE_ERROR', 500, true);
  }
}

export class ANLVisualizationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_VISUALIZATION_ACCESS_DENIED', 403, true);
  }
}

export class ANLForecastError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_FORECAST_ERROR', 500, true);
  }
}

export class ANLForecastNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_FORECAST_NOT_FOUND', 404, true);
  }
}

export class ANLForecastUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_FORECAST_UPDATE_ERROR', 500, true);
  }
}

export class ANLForecastAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_FORECAST_ACCESS_DENIED', 403, true);
  }
}

export class ANLForecastValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_FORECAST_VALIDATION_ERROR', 422, true);
  }
}

export class ANLBenchmarkError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_BENCHMARK_ERROR', 500, true);
  }
}

export class ANLBenchmarkNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_BENCHMARK_NOT_FOUND', 404, true);
  }
}

export class ANLBenchmarkAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_BENCHMARK_ALREADY_EXISTS', 409, true);
  }
}

export class ANLBenchmarkUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_BENCHMARK_UPDATE_ERROR', 500, true);
  }
}

export class ANLBenchmarkDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_BENCHMARK_DELETE_ERROR', 500, true);
  }
}

export class ANLBenchmarkAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_BENCHMARK_ACCESS_DENIED', 403, true);
  }
}

export class ANLTrendError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_TREND_ERROR', 500, true);
  }
}

export class ANLTrendNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_TREND_NOT_FOUND', 404, true);
  }
}

export class ANLTrendUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_TREND_UPDATE_ERROR', 500, true);
  }
}

export class ANLTrendAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_TREND_ACCESS_DENIED', 403, true);
  }
}

export class ANLAlertError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ALERT_ERROR', 500, true);
  }
}

export class ANLAlertNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ALERT_NOT_FOUND', 404, true);
  }
}

export class ANLAlertUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ALERT_UPDATE_ERROR', 500, true);
  }
}

export class ANLAlertDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ALERT_DELETE_ERROR', 500, true);
  }
}

export class ANLAlertAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_ALERT_ACCESS_DENIED', 403, true);
  }
}

export class ANLSurveyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_ERROR', 500, true);
  }
}

export class ANLSurveyNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_NOT_FOUND', 404, true);
  }
}

export class ANLSurveyAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_ALREADY_EXISTS', 409, true);
  }
}

export class ANLSurveyUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_UPDATE_ERROR', 500, true);
  }
}

export class ANLSurveyDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_DELETE_ERROR', 500, true);
  }
}

export class ANLSurveyAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_ACCESS_DENIED', 403, true);
  }
}

export class ANLSurveyResponseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_RESPONSE_ERROR', 400, true);
  }
}

export class ANLSurveyValidationResponseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SURVEY_VALIDATION_RESPONSE_ERROR', 422, true);
  }
}

export class ANLDataQualityError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_QUALITY_ERROR', 500, true);
  }
}

export class ANLDataQualityNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_QUALITY_NOT_FOUND', 404, true);
  }
}

export class ANLDataQualityUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_QUALITY_UPDATE_ERROR', 500, true);
  }
}

export class ANLDataQualityAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_QUALITY_ACCESS_DENIED', 403, true);
  }
}

export class ANLDataQualityValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_QUALITY_VALIDATION_ERROR', 422, true);
  }
}

export class ANLGeospatialError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_GEOSPATIAL_ERROR', 500, true);
  }
}

export class ANLGeospatialNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_GEOSPATIAL_NOT_FOUND', 404, true);
  }
}

export class ANLGeospatialUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_GEOSPATIAL_UPDATE_ERROR', 500, true);
  }
}

export class ANLGeospatialAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_GEOSPATIAL_ACCESS_DENIED', 403, true);
  }
}

export class ANLGeospatialValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_GEOSPATIAL_VALIDATION_ERROR', 422, true);
  }
}

export class ANLDataLakeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_LAKE_ERROR', 500, true);
  }
}

export class ANLDataLakeNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_LAKE_NOT_FOUND', 404, true);
  }
}

export class ANLDataLakeUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_LAKE_UPDATE_ERROR', 500, true);
  }
}

export class ANLDataLakeAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_LAKE_ACCESS_DENIED', 403, true);
  }
}

export class ANLDataLakeSyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_LAKE_SYNC_ERROR', 502, true);
  }
}

export class ANLMachineLearningError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_MACHINE_LEARNING_ERROR', 500, true);
  }
}

export class ANLMachineLearningNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_MACHINE_LEARNING_NOT_FOUND', 404, true);
  }
}

export class ANLMachineLearningUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_MACHINE_LEARNING_UPDATE_ERROR', 500, true);
  }
}

export class ANLMachineLearningAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_MACHINE_LEARNING_ACCESS_DENIED', 403, true);
  }
}

export class ANLMachineLearningValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_MACHINE_LEARNING_VALIDATION_ERROR', 422, true);
  }
}

export class ANLScheduleError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SCHEDULE_ERROR', 500, true);
  }
}

export class ANLScheduleNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SCHEDULE_NOT_FOUND', 404, true);
  }
}

export class ANLScheduleUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SCHEDULE_UPDATE_ERROR', 500, true);
  }
}

export class ANLScheduleAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SCHEDULE_ACCESS_DENIED', 403, true);
  }
}

export class ANLScheduleValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SCHEDULE_VALIDATION_ERROR', 422, true);
  }
}

export class ANLExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_EXPORT_ERROR', 500, true);
  }
}

export class ANLExportAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_EXPORT_ACCESS_DENIED', 403, true);
  }
}

export class ANLExportFormatError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_EXPORT_FORMAT_ERROR', 400, true);
  }
}

export class ANLNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_NOTIFICATION_ERROR', 500, true);
  }
}

export class ANLNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class ANLNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class ANLConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_CONFIG_ERROR', 500, true);
  }
}

export class ANLConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_CONFIG_NOT_FOUND', 404, true);
  }
}

export class ANLConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class ANLConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class ANLConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class ANLAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_AUDIT_LOG_ERROR', 500, true);
  }
}

export class ANLAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class ANLAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class ANLIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INTEGRATION_ERROR', 502, true);
  }
}

export class ANLIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class ANLIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class ANLIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class ANLDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_EXPORT_ERROR', 500, true);
  }
}

export class ANLDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_IMPORT_ERROR', 500, true);
  }
}

export class ANLDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class ANLSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SESSION_ERROR', 401, true);
  }
}

export class ANLSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SESSION_EXPIRED', 401, true);
  }
}

export class ANLSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_SESSION_REVOKED', 401, true);
  }
}

export class ANLRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_RATE_LIMIT_ERROR', 429, true);
  }
}

export class ANLInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_INTERNAL_ERROR', 500, false);
  }
}

export class ANLExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class ANLMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_MAINTENANCE_ERROR', 503, true);
  }
}

export class IDTDigitalIdentityError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_ERROR', 500, true);
  }
}

export class IDTDigitalIdentityNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_NOT_FOUND', 404, true);
  }
}

export class IDTDigitalIdentityAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_ALREADY_EXISTS', 409, true);
  }
}

export class IDTDigitalIdentityUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_UPDATE_ERROR', 500, true);
  }
}

export class IDTDigitalIdentityDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_DELETE_ERROR', 500, true);
  }
}

export class IDTDigitalIdentityAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_ACCESS_DENIED', 403, true);
  }
}

export class IDTDigitalIdentityValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_VALIDATION_ERROR', 422, true);
  }
}

export class IDTDigitalIdentityRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DIGITAL_IDENTITY_REVOKED', 410, true);
  }
}

export class IDTAuthenticationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHENTICATION_ERROR', 401, true);
  }
}

export class IDTAuthenticationFailedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHENTICATION_FAILED', 401, true);
  }
}

export class IDTAuthenticationLockedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHENTICATION_LOCKED', 423, true);
  }
}

export class IDTAuthenticationSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHENTICATION_SESSION_ERROR', 401, true);
  }
}

export class IDTAuthorizationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHORIZATION_ERROR', 403, true);
  }
}

export class IDTAuthorizationInsufficientScopeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHORIZATION_INSUFFICIENT_SCOPE', 403, true);
  }
}

export class IDTAuthorizationTokenExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUTHORIZATION_TOKEN_EXPIRED', 401, true);
  }
}

export class IDTTokenError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_TOKEN_ERROR', 401, true);
  }
}

export class IDTTokenNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_TOKEN_NOT_FOUND', 404, true);
  }
}

export class IDTTokenExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_TOKEN_EXPIRED', 401, true);
  }
}

export class IDTTokenRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_TOKEN_REVOKED', 401, true);
  }
}

export class IDTTokenGenerationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_TOKEN_GENERATION_ERROR', 500, true);
  }
}

export class IDTKeyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_KEY_ERROR', 500, true);
  }
}

export class IDTKeyNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_KEY_NOT_FOUND', 404, true);
  }
}

export class IDTKeyRotationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_KEY_ROTATION_ERROR', 500, true);
  }
}

export class IDTKeyAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_KEY_ACCESS_DENIED', 403, true);
  }
}

export class IDTSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_ERROR', 401, true);
  }
}

export class IDTSessionNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_NOT_FOUND', 404, true);
  }
}

export class IDTSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_EXPIRED', 401, true);
  }
}

export class IDTSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_REVOKED', 401, true);
  }
}

export class IDTSessionCreationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_CREATION_ERROR', 500, true);
  }
}

export class IDTBiometricError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_BIOMETRIC_ERROR', 500, true);
  }
}

export class IDTBiometricNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_BIOMETRIC_NOT_FOUND', 404, true);
  }
}

export class IDTBiometricMatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_BIOMETRIC_MATCH_ERROR', 422, true);
  }
}

export class IDTBiometricAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_BIOMETRIC_ACCESS_DENIED', 403, true);
  }
}

export class IDTBiometricValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_BIOMETRIC_VALIDATION_ERROR', 422, true);
  }
}

export class IDTCredentialError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CREDENTIAL_ERROR', 500, true);
  }
}

export class IDTCredentialNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CREDENTIAL_NOT_FOUND', 404, true);
  }
}

export class IDTCredentialAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CREDENTIAL_ALREADY_EXISTS', 409, true);
  }
}

export class IDTCredentialUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CREDENTIAL_UPDATE_ERROR', 500, true);
  }
}

export class IDTCredentialRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CREDENTIAL_REVOKED', 410, true);
  }
}

export class IDTCredentialExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CREDENTIAL_EXPIRED', 410, true);
  }
}

export class IDTVerificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_VERIFICATION_ERROR', 500, true);
  }
}

export class IDTVerificationFailedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_VERIFICATION_FAILED', 422, true);
  }
}

export class IDTVerificationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_VERIFICATION_ACCESS_DENIED', 403, true);
  }
}

export class IDTSSOError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SSO_ERROR', 500, true);
  }
}

export class IDTSSOProviderError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SSO_PROVIDER_ERROR', 502, true);
  }
}

export class IDTSSOCallbackError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SSO_CALLBACK_ERROR', 400, true);
  }
}

export class IDTSSOLogoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SSO_LOGOUT_ERROR', 500, true);
  }
}

export class IDTOIDCError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_OIDC_ERROR', 500, true);
  }
}

export class IDTOIDCProviderError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_OIDC_PROVIDER_ERROR', 502, true);
  }
}

export class IDTOIDCCallbackError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_OIDC_CALLBACK_ERROR', 400, true);
  }
}

export class IDTConsentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONSENT_ERROR', 500, true);
  }
}

export class IDTConsentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONSENT_NOT_FOUND', 404, true);
  }
}

export class IDTConsentRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONSENT_REVOKED', 410, true);
  }
}

export class IDTConsentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONSENT_ACCESS_DENIED', 403, true);
  }
}

export class IDTConsentValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONSENT_VALIDATION_ERROR', 422, true);
  }
}

export class IDTAuditTrailError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUDIT_TRAIL_ERROR', 500, true);
  }
}

export class IDTAuditTrailNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUDIT_TRAIL_NOT_FOUND', 404, true);
  }
}

export class IDTAuditTrailAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUDIT_TRAIL_ACCESS_DENIED', 403, true);
  }
}

export class IDTRecoveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_RECOVERY_ERROR', 500, true);
  }
}

export class IDTRecoveryNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_RECOVERY_NOT_FOUND', 404, true);
  }
}

export class IDTRecoveryAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_RECOVERY_ACCESS_DENIED', 403, true);
  }
}

export class IDTRecoveryLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_RECOVERY_LIMIT', 429, true);
  }
}

export class IDTNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_NOTIFICATION_ERROR', 500, true);
  }
}

export class IDTNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class IDTNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class IDTConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONFIG_ERROR', 500, true);
  }
}

export class IDTConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONFIG_NOT_FOUND', 404, true);
  }
}

export class IDTConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class IDTConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class IDTConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class IDTAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUDIT_LOG_ERROR', 500, true);
  }
}

export class IDTAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class IDTAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class IDTIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_INTEGRATION_ERROR', 502, true);
  }
}

export class IDTIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class IDTIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class IDTIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class IDTDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DATA_EXPORT_ERROR', 500, true);
  }
}

export class IDTDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DATA_IMPORT_ERROR', 500, true);
  }
}

export class IDTDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class IDTDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DASHBOARD_ERROR', 500, true);
  }
}

export class IDTDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class IDTDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class IDTSessionManagementError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_MANAGEMENT_ERROR', 500, true);
  }
}

export class IDTSessionManagementAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_SESSION_MANAGEMENT_ACCESS_DENIED', 403, true);
  }
}

export class IDTRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_RATE_LIMIT_ERROR', 429, true);
  }
}

export class IDTInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_INTERNAL_ERROR', 500, false);
  }
}

export class IDTExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class IDTMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_MAINTENANCE_ERROR', 503, true);
  }
}

export class PRTPortalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_PORTAL_ERROR', 500, true);
  }
}

export class PRTPortalNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_PORTAL_NOT_FOUND', 404, true);
  }
}

export class PRTPortalUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_PORTAL_UPDATE_ERROR', 500, true);
  }
}

export class PRTPortalDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_PORTAL_DELETE_ERROR', 500, true);
  }
}

export class PRTPortalAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_PORTAL_ACCESS_DENIED', 403, true);
  }
}

export class PRTPortalValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_PORTAL_VALIDATION_ERROR', 422, true);
  }
}

export class PRTServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_ERROR', 500, true);
  }
}

export class PRTServiceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_NOT_FOUND', 404, true);
  }
}

export class PRTServiceAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_ALREADY_EXISTS', 409, true);
  }
}

export class PRTServiceUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_UPDATE_ERROR', 500, true);
  }
}

export class PRTServiceDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_DELETE_ERROR', 500, true);
  }
}

export class PRTServiceAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_ACCESS_DENIED', 403, true);
  }
}

export class PRTServiceValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SERVICE_VALIDATION_ERROR', 422, true);
  }
}

export class PRTRequestError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_ERROR', 500, true);
  }
}

export class PRTRequestNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_NOT_FOUND', 404, true);
  }
}

export class PRTRequestAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_ALREADY_EXISTS', 409, true);
  }
}

export class PRTRequestUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_UPDATE_ERROR', 500, true);
  }
}

export class PRTRequestDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_DELETE_ERROR', 500, true);
  }
}

export class PRTRequestAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_ACCESS_DENIED', 403, true);
  }
}

export class PRTRequestValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_REQUEST_VALIDATION_ERROR', 422, true);
  }
}

export class PRTTicketError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_ERROR', 500, true);
  }
}

export class PRTTicketNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_NOT_FOUND', 404, true);
  }
}

export class PRTTicketAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_ALREADY_EXISTS', 409, true);
  }
}

export class PRTTicketUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_UPDATE_ERROR', 500, true);
  }
}

export class PRTTicketDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_DELETE_ERROR', 500, true);
  }
}

export class PRTTicketAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_ACCESS_DENIED', 403, true);
  }
}

export class PRTTicketEscalationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_TICKET_ESCALATION_ERROR', 400, true);
  }
}

export class PRTFormError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_ERROR', 500, true);
  }
}

export class PRTFormNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_NOT_FOUND', 404, true);
  }
}

export class PRTFormAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_ALREADY_EXISTS', 409, true);
  }
}

export class PRTFormUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_UPDATE_ERROR', 500, true);
  }
}

export class PRTFormDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_DELETE_ERROR', 500, true);
  }
}

export class PRTFormAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_ACCESS_DENIED', 403, true);
  }
}

export class PRTFormValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FORM_VALIDATION_ERROR', 422, true);
  }
}

export class PRTNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_NOTIFICATION_ERROR', 500, true);
  }
}

export class PRTNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class PRTNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class PRTNotificationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_NOTIFICATION_ACCESS_DENIED', 403, true);
  }
}

export class PRTWorkflowError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_WORKFLOW_ERROR', 500, true);
  }
}

export class PRTWorkflowNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_WORKFLOW_NOT_FOUND', 404, true);
  }
}

export class PRTWorkflowUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_WORKFLOW_UPDATE_ERROR', 500, true);
  }
}

export class PRTWorkflowAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_WORKFLOW_ACCESS_DENIED', 403, true);
  }
}

export class PRTWorkflowValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_WORKFLOW_VALIDATION_ERROR', 422, true);
  }
}

export class PRTDocumentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_ERROR', 500, true);
  }
}

export class PRTDocumentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_NOT_FOUND', 404, true);
  }
}

export class PRTDocumentAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_ALREADY_EXISTS', 409, true);
  }
}

export class PRTDocumentUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_UPDATE_ERROR', 500, true);
  }
}

export class PRTDocumentDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_DELETE_ERROR', 500, true);
  }
}

export class PRTDocumentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_ACCESS_DENIED', 403, true);
  }
}

export class PRTDocumentValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DOCUMENT_VALIDATION_ERROR', 422, true);
  }
}

export class PRTChatError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CHAT_ERROR', 500, true);
  }
}

export class PRTChatNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CHAT_NOT_FOUND', 404, true);
  }
}

export class PRTChatAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CHAT_ACCESS_DENIED', 403, true);
  }
}

export class PRTChatMessageError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CHAT_MESSAGE_ERROR', 400, true);
  }
}

export class PRTFAQError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FAQ_ERROR', 500, true);
  }
}

export class PRTFAQNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FAQ_NOT_FOUND', 404, true);
  }
}

export class PRTFAQAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FAQ_ALREADY_EXISTS', 409, true);
  }
}

export class PRTFAQUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FAQ_UPDATE_ERROR', 500, true);
  }
}

export class PRTFAQDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FAQ_DELETE_ERROR', 500, true);
  }
}

export class PRTFeedbackError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FEEDBACK_ERROR', 500, true);
  }
}

export class PRTFeedbackNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FEEDBACK_NOT_FOUND', 404, true);
  }
}

export class PRTFeedbackAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FEEDBACK_ALREADY_EXISTS', 409, true);
  }
}

export class PRTFeedbackAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_FEEDBACK_ACCESS_DENIED', 403, true);
  }
}

export class PRTSearchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SEARCH_ERROR', 500, true);
  }
}

export class PRTSearchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SEARCH_ACCESS_DENIED', 403, true);
  }
}

export class PRTSearchRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SEARCH_RATE_LIMIT', 429, true);
  }
}

export class PRTConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CONFIG_ERROR', 500, true);
  }
}

export class PRTConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CONFIG_NOT_FOUND', 404, true);
  }
}

export class PRTConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class PRTConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class PRTConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class PRTAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_AUDIT_LOG_ERROR', 500, true);
  }
}

export class PRTAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class PRTAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class PRTIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_INTEGRATION_ERROR', 502, true);
  }
}

export class PRTIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class PRTIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class PRTIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class PRTDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DATA_EXPORT_ERROR', 500, true);
  }
}

export class PRTDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DATA_IMPORT_ERROR', 500, true);
  }
}

export class PRTDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class PRTDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DASHBOARD_ERROR', 500, true);
  }
}

export class PRTDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class PRTDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class PRTSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SESSION_ERROR', 401, true);
  }
}

export class PRTSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SESSION_EXPIRED', 401, true);
  }
}

export class PRTSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_SESSION_REVOKED', 401, true);
  }
}

export class PRTRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_RATE_LIMIT_ERROR', 429, true);
  }
}

export class PRTInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_INTERNAL_ERROR', 500, false);
  }
}

export class PRTExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class PRTMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_MAINTENANCE_ERROR', 503, true);
  }
}

export class ODPOpenDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_OPEN_DATA_ERROR', 500, true);
  }
}

export class ODPOpenDataNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_OPEN_DATA_NOT_FOUND', 404, true);
  }
}

export class ODPOpenDataUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_OPEN_DATA_UPDATE_ERROR', 500, true);
  }
}

export class ODPOpenDataDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_OPEN_DATA_DELETE_ERROR', 500, true);
  }
}

export class ODPOpenDataAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_OPEN_DATA_ACCESS_DENIED', 403, true);
  }
}

export class ODPOpenDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_OPEN_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class ODPCatalogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_ERROR', 500, true);
  }
}

export class ODPCatalogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_NOT_FOUND', 404, true);
  }
}

export class ODPCatalogAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_ALREADY_EXISTS', 409, true);
  }
}

export class ODPCatalogUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_UPDATE_ERROR', 500, true);
  }
}

export class ODPCatalogDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_DELETE_ERROR', 500, true);
  }
}

export class ODPCatalogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_ACCESS_DENIED', 403, true);
  }
}

export class ODPCatalogValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CATALOG_VALIDATION_ERROR', 422, true);
  }
}

export class ODPDatasetError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_ERROR', 500, true);
  }
}

export class ODPDatasetNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_NOT_FOUND', 404, true);
  }
}

export class ODPDatasetAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_ALREADY_EXISTS', 409, true);
  }
}

export class ODPDatasetUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_UPDATE_ERROR', 500, true);
  }
}

export class ODPDatasetDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_DELETE_ERROR', 500, true);
  }
}

export class ODPDatasetAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_ACCESS_DENIED', 403, true);
  }
}

export class ODPDatasetValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_VALIDATION_ERROR', 422, true);
  }
}

export class ODPDatasetPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATASET_PUBLISH_ERROR', 500, true);
  }
}

export class ODPMetadataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_METADATA_ERROR', 500, true);
  }
}

export class ODPMetadataNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_METADATA_NOT_FOUND', 404, true);
  }
}

export class ODPMetadataUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_METADATA_UPDATE_ERROR', 500, true);
  }
}

export class ODPMetadataAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_METADATA_ACCESS_DENIED', 403, true);
  }
}

export class ODPMetadataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_METADATA_VALIDATION_ERROR', 422, true);
  }
}

export class ODPAPIError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_ERROR', 500, true);
  }
}

export class ODPAPINotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_NOT_FOUND', 404, true);
  }
}

export class ODPAPIUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_UPDATE_ERROR', 500, true);
  }
}

export class ODPAPIDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_DELETE_ERROR', 500, true);
  }
}

export class ODPAPIAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_ACCESS_DENIED', 403, true);
  }
}

export class ODPAPIKeyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_KEY_ERROR', 401, true);
  }
}

export class ODPAPILimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_API_LIMIT_ERROR', 429, true);
  }
}

export class ODPDownloadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DOWNLOAD_ERROR', 500, true);
  }
}

export class ODPDownloadAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DOWNLOAD_ACCESS_DENIED', 403, true);
  }
}

export class ODPDownloadFormatError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DOWNLOAD_FORMAT_ERROR', 400, true);
  }
}

export class ODPVisualizationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VISUALIZATION_ERROR', 500, true);
  }
}

export class ODPVisualizationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VISUALIZATION_NOT_FOUND', 404, true);
  }
}

export class ODPVisualizationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VISUALIZATION_ACCESS_DENIED', 403, true);
  }
}

export class ODPFeedbackError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_FEEDBACK_ERROR', 500, true);
  }
}

export class ODPFeedbackNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_FEEDBACK_NOT_FOUND', 404, true);
  }
}

export class ODPFeedbackAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_FEEDBACK_ACCESS_DENIED', 403, true);
  }
}

export class ODPUsageError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_USAGE_ERROR', 500, true);
  }
}

export class ODPUsageAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_USAGE_ACCESS_DENIED', 403, true);
  }
}

export class ODPUsageDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_USAGE_DATA_ERROR', 500, true);
  }
}

export class ODPGovernanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_GOVERNANCE_ERROR', 500, true);
  }
}

export class ODPGovernanceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_GOVERNANCE_NOT_FOUND', 404, true);
  }
}

export class ODPGovernanceAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_GOVERNANCE_ACCESS_DENIED', 403, true);
  }
}

export class ODPGovernanceValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_GOVERNANCE_VALIDATION_ERROR', 422, true);
  }
}

export class ODPQualityError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_QUALITY_ERROR', 500, true);
  }
}

export class ODPQualityNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_QUALITY_NOT_FOUND', 404, true);
  }
}

export class ODPQualityAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_QUALITY_ACCESS_DENIED', 403, true);
  }
}

export class ODPQualityValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_QUALITY_VALIDATION_ERROR', 422, true);
  }
}

export class ODPSearchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_SEARCH_ERROR', 500, true);
  }
}

export class ODPSearchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_SEARCH_ACCESS_DENIED', 403, true);
  }
}

export class ODPSearchRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_SEARCH_RATE_LIMIT', 429, true);
  }
}

export class ODPNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_NOTIFICATION_ERROR', 500, true);
  }
}

export class ODPNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class ODPNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class ODPConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CONFIG_ERROR', 500, true);
  }
}

export class ODPConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CONFIG_NOT_FOUND', 404, true);
  }
}

export class ODPConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class ODPConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class ODPConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class ODPAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_AUDIT_LOG_ERROR', 500, true);
  }
}

export class ODPAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class ODPAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class ODPIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_INTEGRATION_ERROR', 502, true);
  }
}

export class ODPIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class ODPIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class ODPIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class ODPDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATA_EXPORT_ERROR', 500, true);
  }
}

export class ODPDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATA_IMPORT_ERROR', 500, true);
  }
}

export class ODPDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class ODPDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DASHBOARD_ERROR', 500, true);
  }
}

export class ODPDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class ODPDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class ODPBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_BATCH_ERROR', 500, true);
  }
}

export class ODPBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_BATCH_ACCESS_DENIED', 403, true);
  }
}

export class ODPBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_BATCH_VALIDATION_ERROR', 422, true);
  }
}

export class ODPVersionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VERSION_ERROR', 500, true);
  }
}

export class ODPVersionNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VERSION_NOT_FOUND', 404, true);
  }
}

export class ODPVersionAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VERSION_ACCESS_DENIED', 403, true);
  }
}

export class ODPVersionConflictError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_VERSION_CONFLICT_ERROR', 409, true);
  }
}

export class ODPSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_SESSION_ERROR', 401, true);
  }
}

export class ODPSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_SESSION_EXPIRED', 401, true);
  }
}

export class ODPSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_SESSION_REVOKED', 401, true);
  }
}

export class ODPInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_INTERNAL_ERROR', 500, false);
  }
}

export class ODPExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class ODPMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_MAINTENANCE_ERROR', 503, true);
  }
}

export class OBSEducationObservatoryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EDUCATION_OBSERVATORY_ERROR', 500, true);
  }
}

export class OBSEducationObservatoryNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EDUCATION_OBSERVATORY_NOT_FOUND', 404, true);
  }
}

export class OBSEducationObservatoryUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EDUCATION_OBSERVATORY_UPDATE_ERROR', 500, true);
  }
}

export class OBSEducationObservatoryDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EDUCATION_OBSERVATORY_DELETE_ERROR', 500, true);
  }
}

export class OBSEducationObservatoryAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EDUCATION_OBSERVATORY_ACCESS_DENIED', 403, true);
  }
}

export class OBSEducationObservatoryValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EDUCATION_OBSERVATORY_VALIDATION_ERROR', 422, true);
  }
}

export class OBSTrackingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_TRACKING_ERROR', 500, true);
  }
}

export class OBSTrackingNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_TRACKING_NOT_FOUND', 404, true);
  }
}

export class OBSTrackingUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_TRACKING_UPDATE_ERROR', 500, true);
  }
}

export class OBSTrackingAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_TRACKING_ACCESS_DENIED', 403, true);
  }
}

export class OBSTrackingValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_TRACKING_VALIDATION_ERROR', 422, true);
  }
}

export class OBSOutcomeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_ERROR', 500, true);
  }
}

export class OBSOutcomeNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_NOT_FOUND', 404, true);
  }
}

export class OBSOutcomeAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_ALREADY_EXISTS', 409, true);
  }
}

export class OBSOutcomeUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_UPDATE_ERROR', 500, true);
  }
}

export class OBSOutcomeDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_DELETE_ERROR', 500, true);
  }
}

export class OBSOutcomeAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_ACCESS_DENIED', 403, true);
  }
}

export class OBSOutcomeValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_OUTCOME_VALIDATION_ERROR', 422, true);
  }
}

export class OBSEffectivenessError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EFFECTIVENESS_ERROR', 500, true);
  }
}

export class OBSEffectivenessNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EFFECTIVENESS_NOT_FOUND', 404, true);
  }
}

export class OBSEffectivenessUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EFFECTIVENESS_UPDATE_ERROR', 500, true);
  }
}

export class OBSEffectivenessAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EFFECTIVENESS_ACCESS_DENIED', 403, true);
  }
}

export class OBSEffectivenessValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EFFECTIVENESS_VALIDATION_ERROR', 422, true);
  }
}

export class OBSBenchmarkError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_BENCHMARK_ERROR', 500, true);
  }
}

export class OBSBenchmarkNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_BENCHMARK_NOT_FOUND', 404, true);
  }
}

export class OBSBenchmarkAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_BENCHMARK_ALREADY_EXISTS', 409, true);
  }
}

export class OBSBenchmarkUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_BENCHMARK_UPDATE_ERROR', 500, true);
  }
}

export class OBSBenchmarkDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_BENCHMARK_DELETE_ERROR', 500, true);
  }
}

export class OBSBenchmarkAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_BENCHMARK_ACCESS_DENIED', 403, true);
  }
}

export class OBSAlertError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_ALERT_ERROR', 500, true);
  }
}

export class OBSAlertNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_ALERT_NOT_FOUND', 404, true);
  }
}

export class OBSAlertUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_ALERT_UPDATE_ERROR', 500, true);
  }
}

export class OBSAlertDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_ALERT_DELETE_ERROR', 500, true);
  }
}

export class OBSAlertAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_ALERT_ACCESS_DENIED', 403, true);
  }
}

export class OBSResearchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RESEARCH_ERROR', 500, true);
  }
}

export class OBSResearchNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RESEARCH_NOT_FOUND', 404, true);
  }
}

export class OBSResearchAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RESEARCH_ALREADY_EXISTS', 409, true);
  }
}

export class OBSResearchUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RESEARCH_UPDATE_ERROR', 500, true);
  }
}

export class OBSResearchDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RESEARCH_DELETE_ERROR', 500, true);
  }
}

export class OBSResearchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RESEARCH_ACCESS_DENIED', 403, true);
  }
}

export class OBSEvaluationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EVALUATION_ERROR', 500, true);
  }
}

export class OBSEvaluationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EVALUATION_NOT_FOUND', 404, true);
  }
}

export class OBSEvaluationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EVALUATION_ALREADY_EXISTS', 409, true);
  }
}

export class OBSEvaluationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EVALUATION_UPDATE_ERROR', 500, true);
  }
}

export class OBSEvaluationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EVALUATION_DELETE_ERROR', 500, true);
  }
}

export class OBSEvaluationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EVALUATION_ACCESS_DENIED', 403, true);
  }
}

export class OBSReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_REPORT_ERROR', 500, true);
  }
}

export class OBSReportNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_REPORT_NOT_FOUND', 404, true);
  }
}

export class OBSReportAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_REPORT_ACCESS_DENIED', 403, true);
  }
}

export class OBSReportGenerationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_REPORT_GENERATION_ERROR', 500, true);
  }
}

export class OBSIndicatorError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INDICATOR_ERROR', 500, true);
  }
}

export class OBSIndicatorNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INDICATOR_NOT_FOUND', 404, true);
  }
}

export class OBSIndicatorAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INDICATOR_ALREADY_EXISTS', 409, true);
  }
}

export class OBSIndicatorUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INDICATOR_UPDATE_ERROR', 500, true);
  }
}

export class OBSIndicatorDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INDICATOR_DELETE_ERROR', 500, true);
  }
}

export class OBSIndicatorAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INDICATOR_ACCESS_DENIED', 403, true);
  }
}

export class OBSSurveyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_ERROR', 500, true);
  }
}

export class OBSSurveyNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_NOT_FOUND', 404, true);
  }
}

export class OBSSurveyAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_ALREADY_EXISTS', 409, true);
  }
}

export class OBSSurveyUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_UPDATE_ERROR', 500, true);
  }
}

export class OBSSurveyDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_DELETE_ERROR', 500, true);
  }
}

export class OBSSurveyAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_ACCESS_DENIED', 403, true);
  }
}

export class OBSSurveyResponseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SURVEY_RESPONSE_ERROR', 400, true);
  }
}

export class OBSDataCollectionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DATA_COLLECTION_ERROR', 500, true);
  }
}

export class OBSDataCollectionAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DATA_COLLECTION_ACCESS_DENIED', 403, true);
  }
}

export class OBSDataCollectionValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DATA_COLLECTION_VALIDATION_ERROR', 422, true);
  }
}

export class OBSForecastError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_FORECAST_ERROR', 500, true);
  }
}

export class OBSForecastNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_FORECAST_NOT_FOUND', 404, true);
  }
}

export class OBSForecastAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_FORECAST_ACCESS_DENIED', 403, true);
  }
}

export class OBSForecastValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_FORECAST_VALIDATION_ERROR', 422, true);
  }
}

export class OBSRecommendationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RECOMMENDATION_ERROR', 500, true);
  }
}

export class OBSRecommendationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RECOMMENDATION_NOT_FOUND', 404, true);
  }
}

export class OBSRecommendationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RECOMMENDATION_UPDATE_ERROR', 500, true);
  }
}

export class OBSRecommendationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RECOMMENDATION_ACCESS_DENIED', 403, true);
  }
}

export class OBSRecommendationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RECOMMENDATION_VALIDATION_ERROR', 422, true);
  }
}

export class OBSNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_NOTIFICATION_ERROR', 500, true);
  }
}

export class OBSNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class OBSNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class OBSConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_CONFIG_ERROR', 500, true);
  }
}

export class OBSConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_CONFIG_NOT_FOUND', 404, true);
  }
}

export class OBSConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class OBSConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class OBSConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class OBSAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_AUDIT_LOG_ERROR', 500, true);
  }
}

export class OBSAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class OBSAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class OBSIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INTEGRATION_ERROR', 502, true);
  }
}

export class OBSIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class OBSIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class OBSIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class OBSDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DATA_EXPORT_ERROR', 500, true);
  }
}

export class OBSDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DATA_IMPORT_ERROR', 500, true);
  }
}

export class OBSDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class OBSDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DASHBOARD_ERROR', 500, true);
  }
}

export class OBSDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class OBSDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class OBSSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SESSION_ERROR', 401, true);
  }
}

export class OBSSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SESSION_EXPIRED', 401, true);
  }
}

export class OBSSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_SESSION_REVOKED', 401, true);
  }
}

export class OBSRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_RATE_LIMIT_ERROR', 429, true);
  }
}

export class OBSInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_INTERNAL_ERROR', 500, false);
  }
}

export class OBSExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class OBSMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_MAINTENANCE_ERROR', 503, true);
  }
}

export class EMREmergencyManagementError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EMERGENCY_MANAGEMENT_ERROR', 500, true);
  }
}

export class EMREmergencyManagementNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EMERGENCY_MANAGEMENT_NOT_FOUND', 404, true);
  }
}

export class EMREmergencyManagementUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EMERGENCY_MANAGEMENT_UPDATE_ERROR', 500, true);
  }
}

export class EMREmergencyManagementDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EMERGENCY_MANAGEMENT_DELETE_ERROR', 500, true);
  }
}

export class EMREmergencyManagementAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EMERGENCY_MANAGEMENT_ACCESS_DENIED', 403, true);
  }
}

export class EMREmergencyManagementValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EMERGENCY_MANAGEMENT_VALIDATION_ERROR', 422, true);
  }
}

export class EMRAlertError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_ERROR', 500, true);
  }
}

export class EMRAlertNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_NOT_FOUND', 404, true);
  }
}

export class EMRAlertAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_ALREADY_EXISTS', 409, true);
  }
}

export class EMRAlertUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_UPDATE_ERROR', 500, true);
  }
}

export class EMRAlertDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_DELETE_ERROR', 500, true);
  }
}

export class EMRAlertAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_ACCESS_DENIED', 403, true);
  }
}

export class EMRAlertBroadcastError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_ALERT_BROADCAST_ERROR', 502, true);
  }
}

export class EMRIncidentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_ERROR', 500, true);
  }
}

export class EMRIncidentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_NOT_FOUND', 404, true);
  }
}

export class EMRIncidentAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_ALREADY_EXISTS', 409, true);
  }
}

export class EMRIncidentUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_UPDATE_ERROR', 500, true);
  }
}

export class EMRIncidentDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_DELETE_ERROR', 500, true);
  }
}

export class EMRIncidentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_ACCESS_DENIED', 403, true);
  }
}

export class EMRIncidentEscalationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INCIDENT_ESCALATION_ERROR', 400, true);
  }
}

export class EMRResponseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESPONSE_ERROR', 500, true);
  }
}

export class EMRResponseNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESPONSE_NOT_FOUND', 404, true);
  }
}

export class EMRResponseUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESPONSE_UPDATE_ERROR', 500, true);
  }
}

export class EMRResponseAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESPONSE_ACCESS_DENIED', 403, true);
  }
}

export class EMRResponseValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESPONSE_VALIDATION_ERROR', 422, true);
  }
}

export class EMRResourceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_ERROR', 500, true);
  }
}

export class EMRResourceNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_NOT_FOUND', 404, true);
  }
}

export class EMRResourceAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_ALREADY_EXISTS', 409, true);
  }
}

export class EMRResourceUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_UPDATE_ERROR', 500, true);
  }
}

export class EMRResourceDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_DELETE_ERROR', 500, true);
  }
}

export class EMRResourceAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_ACCESS_DENIED', 403, true);
  }
}

export class EMRResourceAllocationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RESOURCE_ALLOCATION_ERROR', 400, true);
  }
}

export class EMRPlanError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_ERROR', 500, true);
  }
}

export class EMRPlanNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_NOT_FOUND', 404, true);
  }
}

export class EMRPlanAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_ALREADY_EXISTS', 409, true);
  }
}

export class EMRPlanUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_UPDATE_ERROR', 500, true);
  }
}

export class EMRPlanDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_DELETE_ERROR', 500, true);
  }
}

export class EMRPlanAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_ACCESS_DENIED', 403, true);
  }
}

export class EMRPlanApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_PLAN_APPROVAL_ERROR', 400, true);
  }
}

export class EMREvacuationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EVACUATION_ERROR', 500, true);
  }
}

export class EMREvacuationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EVACUATION_NOT_FOUND', 404, true);
  }
}

export class EMREvacuationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EVACUATION_UPDATE_ERROR', 500, true);
  }
}

export class EMREvacuationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EVACUATION_ACCESS_DENIED', 403, true);
  }
}

export class EMREvacuationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EVACUATION_VALIDATION_ERROR', 422, true);
  }
}

export class EMRCoordinatorError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COORDINATOR_ERROR', 500, true);
  }
}

export class EMRCoordinatorNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COORDINATOR_NOT_FOUND', 404, true);
  }
}

export class EMRCoordinatorUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COORDINATOR_UPDATE_ERROR', 500, true);
  }
}

export class EMRCoordinatorAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COORDINATOR_ACCESS_DENIED', 403, true);
  }
}

export class EMRCoordinatorValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COORDINATOR_VALIDATION_ERROR', 422, true);
  }
}

export class EMRDrillError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DRILL_ERROR', 500, true);
  }
}

export class EMRDrillNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DRILL_NOT_FOUND', 404, true);
  }
}

export class EMRDrillAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DRILL_ALREADY_EXISTS', 409, true);
  }
}

export class EMRDrillUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DRILL_UPDATE_ERROR', 500, true);
  }
}

export class EMRDrillDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DRILL_DELETE_ERROR', 500, true);
  }
}

export class EMRDrillAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DRILL_ACCESS_DENIED', 403, true);
  }
}

export class EMRCommunicationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COMMUNICATION_ERROR', 500, true);
  }
}

export class EMRCommunicationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COMMUNICATION_NOT_FOUND', 404, true);
  }
}

export class EMRCommunicationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COMMUNICATION_ACCESS_DENIED', 403, true);
  }
}

export class EMRCommunicationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_COMMUNICATION_DELIVERY_ERROR', 502, true);
  }
}

export class EMRDamageAssessmentError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DAMAGE_ASSESSMENT_ERROR', 500, true);
  }
}

export class EMRDamageAssessmentNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DAMAGE_ASSESSMENT_NOT_FOUND', 404, true);
  }
}

export class EMRDamageAssessmentUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DAMAGE_ASSESSMENT_UPDATE_ERROR', 500, true);
  }
}

export class EMRDamageAssessmentAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DAMAGE_ASSESSMENT_ACCESS_DENIED', 403, true);
  }
}

export class EMRRecoveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RECOVERY_ERROR', 500, true);
  }
}

export class EMRRecoveryNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RECOVERY_NOT_FOUND', 404, true);
  }
}

export class EMRRecoveryUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RECOVERY_UPDATE_ERROR', 500, true);
  }
}

export class EMRRecoveryAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RECOVERY_ACCESS_DENIED', 403, true);
  }
}

export class EMRRecoveryApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RECOVERY_APPROVAL_ERROR', 400, true);
  }
}

export class EMRNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_NOTIFICATION_ERROR', 500, true);
  }
}

export class EMRNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class EMRNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class EMRConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_CONFIG_ERROR', 500, true);
  }
}

export class EMRConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_CONFIG_NOT_FOUND', 404, true);
  }
}

export class EMRConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class EMRConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class EMRConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class EMRAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_AUDIT_LOG_ERROR', 500, true);
  }
}

export class EMRAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class EMRAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class EMRIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INTEGRATION_ERROR', 502, true);
  }
}

export class EMRIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class EMRIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class EMRIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class EMRDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DATA_EXPORT_ERROR', 500, true);
  }
}

export class EMRDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DATA_IMPORT_ERROR', 500, true);
  }
}

export class EMRDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class EMRDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DASHBOARD_ERROR', 500, true);
  }
}

export class EMRDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class EMRDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class EMRSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_SESSION_ERROR', 401, true);
  }
}

export class EMRSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_SESSION_EXPIRED', 401, true);
  }
}

export class EMRSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_SESSION_REVOKED', 401, true);
  }
}

export class EMRRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_RATE_LIMIT_ERROR', 429, true);
  }
}

export class EMRInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_INTERNAL_ERROR', 500, false);
  }
}

export class EMRExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class EMRMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_MAINTENANCE_ERROR', 503, true);
  }
}

export class INTInternationalCooperationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNATIONAL_COOPERATION_ERROR', 500, true);
  }
}

export class INTInternationalCooperationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNATIONAL_COOPERATION_NOT_FOUND', 404, true);
  }
}

export class INTInternationalCooperationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNATIONAL_COOPERATION_UPDATE_ERROR', 500, true);
  }
}

export class INTInternationalCooperationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNATIONAL_COOPERATION_DELETE_ERROR', 500, true);
  }
}

export class INTInternationalCooperationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNATIONAL_COOPERATION_ACCESS_DENIED', 403, true);
  }
}

export class INTInternationalCooperationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNATIONAL_COOPERATION_VALIDATION_ERROR', 422, true);
  }
}

export class INTAgreementError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_ERROR', 500, true);
  }
}

export class INTAgreementNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_NOT_FOUND', 404, true);
  }
}

export class INTAgreementAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_ALREADY_EXISTS', 409, true);
  }
}

export class INTAgreementUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_UPDATE_ERROR', 500, true);
  }
}

export class INTAgreementDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_DELETE_ERROR', 500, true);
  }
}

export class INTAgreementAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_ACCESS_DENIED', 403, true);
  }
}

export class INTAgreementApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_APPROVAL_ERROR', 400, true);
  }
}

export class INTAgreementRatificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AGREEMENT_RATIFICATION_ERROR', 400, true);
  }
}

export class INTPartnerError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_ERROR', 500, true);
  }
}

export class INTPartnerNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_NOT_FOUND', 404, true);
  }
}

export class INTPartnerAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_ALREADY_EXISTS', 409, true);
  }
}

export class INTPartnerUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_UPDATE_ERROR', 500, true);
  }
}

export class INTPartnerDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_DELETE_ERROR', 500, true);
  }
}

export class INTPartnerAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_ACCESS_DENIED', 403, true);
  }
}

export class INTPartnerValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PARTNER_VALIDATION_ERROR', 422, true);
  }
}

export class INTProjectError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_ERROR', 500, true);
  }
}

export class INTProjectNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_NOT_FOUND', 404, true);
  }
}

export class INTProjectAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_ALREADY_EXISTS', 409, true);
  }
}

export class INTProjectUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_UPDATE_ERROR', 500, true);
  }
}

export class INTProjectDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_DELETE_ERROR', 500, true);
  }
}

export class INTProjectAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_ACCESS_DENIED', 403, true);
  }
}

export class INTProjectApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_APPROVAL_ERROR', 400, true);
  }
}

export class INTProjectReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_PROJECT_REPORT_ERROR', 500, true);
  }
}

export class INTFundingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_ERROR', 500, true);
  }
}

export class INTFundingNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_NOT_FOUND', 404, true);
  }
}

export class INTFundingAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_ALREADY_EXISTS', 409, true);
  }
}

export class INTFundingUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_UPDATE_ERROR', 500, true);
  }
}

export class INTFundingDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_DELETE_ERROR', 500, true);
  }
}

export class INTFundingAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_ACCESS_DENIED', 403, true);
  }
}

export class INTFundingApprovalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_FUNDING_APPROVAL_ERROR', 400, true);
  }
}

export class INTDonorError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DONOR_ERROR', 500, true);
  }
}

export class INTDonorNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DONOR_NOT_FOUND', 404, true);
  }
}

export class INTDonorAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DONOR_ALREADY_EXISTS', 409, true);
  }
}

export class INTDonorUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DONOR_UPDATE_ERROR', 500, true);
  }
}

export class INTDonorDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DONOR_DELETE_ERROR', 500, true);
  }
}

export class INTDonorAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DONOR_ACCESS_DENIED', 403, true);
  }
}

export class INTExchangeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXCHANGE_ERROR', 500, true);
  }
}

export class INTExchangeNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXCHANGE_NOT_FOUND', 404, true);
  }
}

export class INTExchangeAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXCHANGE_ALREADY_EXISTS', 409, true);
  }
}

export class INTExchangeUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXCHANGE_UPDATE_ERROR', 500, true);
  }
}

export class INTExchangeDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXCHANGE_DELETE_ERROR', 500, true);
  }
}

export class INTExchangeAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXCHANGE_ACCESS_DENIED', 403, true);
  }
}

export class INTCapacityError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CAPACITY_ERROR', 500, true);
  }
}

export class INTCapacityNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CAPACITY_NOT_FOUND', 404, true);
  }
}

export class INTCapacityAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CAPACITY_ALREADY_EXISTS', 409, true);
  }
}

export class INTCapacityUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CAPACITY_UPDATE_ERROR', 500, true);
  }
}

export class INTCapacityDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CAPACITY_DELETE_ERROR', 500, true);
  }
}

export class INTCapacityAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CAPACITY_ACCESS_DENIED', 403, true);
  }
}

export class INTDiplomaticError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DIPLOMATIC_ERROR', 500, true);
  }
}

export class INTDiplomaticNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DIPLOMATIC_NOT_FOUND', 404, true);
  }
}

export class INTDiplomaticUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DIPLOMATIC_UPDATE_ERROR', 500, true);
  }
}

export class INTDiplomaticAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DIPLOMATIC_ACCESS_DENIED', 403, true);
  }
}

export class INTDiplomaticCredentialError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DIPLOMATIC_CREDENTIAL_ERROR', 400, true);
  }
}

export class INTPolicyError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_POLICY_ERROR', 500, true);
  }
}

export class INTPolicyNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_POLICY_NOT_FOUND', 404, true);
  }
}

export class INTPolicyAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_POLICY_ALREADY_EXISTS', 409, true);
  }
}

export class INTPolicyUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_POLICY_UPDATE_ERROR', 500, true);
  }
}

export class INTPolicyDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_POLICY_DELETE_ERROR', 500, true);
  }
}

export class INTPolicyAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_POLICY_ACCESS_DENIED', 403, true);
  }
}

export class INTCollaborationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_COLLABORATION_ERROR', 500, true);
  }
}

export class INTCollaborationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_COLLABORATION_NOT_FOUND', 404, true);
  }
}

export class INTCollaborationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_COLLABORATION_ALREADY_EXISTS', 409, true);
  }
}

export class INTCollaborationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_COLLABORATION_UPDATE_ERROR', 500, true);
  }
}

export class INTCollaborationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_COLLABORATION_DELETE_ERROR', 500, true);
  }
}

export class INTCollaborationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_COLLABORATION_ACCESS_DENIED', 403, true);
  }
}

export class INTReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_REPORT_ERROR', 500, true);
  }
}

export class INTReportNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_REPORT_NOT_FOUND', 404, true);
  }
}

export class INTReportAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_REPORT_ACCESS_DENIED', 403, true);
  }
}

export class INTReportGenerationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_REPORT_GENERATION_ERROR', 500, true);
  }
}

export class INTNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_NOTIFICATION_ERROR', 500, true);
  }
}

export class INTNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class INTNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class INTConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CONFIG_ERROR', 500, true);
  }
}

export class INTConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CONFIG_NOT_FOUND', 404, true);
  }
}

export class INTConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class INTConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class INTConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class INTAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AUDIT_LOG_ERROR', 500, true);
  }
}

export class INTAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class INTAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class INTIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTEGRATION_ERROR', 502, true);
  }
}

export class INTIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class INTIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class INTIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class INTDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DATA_EXPORT_ERROR', 500, true);
  }
}

export class INTDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DATA_IMPORT_ERROR', 500, true);
  }
}

export class INTDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class INTDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DASHBOARD_ERROR', 500, true);
  }
}

export class INTDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class INTDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class INTSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_SESSION_ERROR', 401, true);
  }
}

export class INTSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_SESSION_EXPIRED', 401, true);
  }
}

export class INTSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_SESSION_REVOKED', 401, true);
  }
}

export class INTRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_RATE_LIMIT_ERROR', 429, true);
  }
}

export class INTInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_INTERNAL_ERROR', 500, false);
  }
}

export class INTExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class INTMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_MAINTENANCE_ERROR', 503, true);
  }
}

export class TWNDigitalTwinError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_ERROR', 500, true);
  }
}

export class TWNDigitalTwinNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_NOT_FOUND', 404, true);
  }
}

export class TWNDigitalTwinUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_UPDATE_ERROR', 500, true);
  }
}

export class TWNDigitalTwinDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_DELETE_ERROR', 500, true);
  }
}

export class TWNDigitalTwinAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_ACCESS_DENIED', 403, true);
  }
}

export class TWNDigitalTwinValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_VALIDATION_ERROR', 422, true);
  }
}

export class TWNDigitalTwinSyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DIGITAL_TWIN_SYNC_ERROR', 502, true);
  }
}

export class TWNModelError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_ERROR', 500, true);
  }
}

export class TWNModelNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_NOT_FOUND', 404, true);
  }
}

export class TWNModelAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_ALREADY_EXISTS', 409, true);
  }
}

export class TWNModelUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_UPDATE_ERROR', 500, true);
  }
}

export class TWNModelDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_DELETE_ERROR', 500, true);
  }
}

export class TWNModelAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_ACCESS_DENIED', 403, true);
  }
}

export class TWNModelValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_VALIDATION_ERROR', 422, true);
  }
}

export class TWNModelVersionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MODEL_VERSION_ERROR', 400, true);
  }
}

export class TWNDataIngestionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_INGESTION_ERROR', 500, true);
  }
}

export class TWNDataIngestionNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_INGESTION_NOT_FOUND', 404, true);
  }
}

export class TWNDataIngestionUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_INGESTION_UPDATE_ERROR', 500, true);
  }
}

export class TWNDataIngestionAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_INGESTION_ACCESS_DENIED', 403, true);
  }
}

export class TWNDataIngestionValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_INGESTION_VALIDATION_ERROR', 422, true);
  }
}

export class TWNSimulationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_ERROR', 500, true);
  }
}

export class TWNSimulationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_NOT_FOUND', 404, true);
  }
}

export class TWNSimulationAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_ALREADY_EXISTS', 409, true);
  }
}

export class TWNSimulationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_UPDATE_ERROR', 500, true);
  }
}

export class TWNSimulationDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_DELETE_ERROR', 500, true);
  }
}

export class TWNSimulationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_ACCESS_DENIED', 403, true);
  }
}

export class TWNSimulationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_VALIDATION_ERROR', 422, true);
  }
}

export class TWNSimulationExecutionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SIMULATION_EXECUTION_ERROR', 500, true);
  }
}

export class TWNVisualizationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_VISUALIZATION_ERROR', 500, true);
  }
}

export class TWNVisualizationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_VISUALIZATION_NOT_FOUND', 404, true);
  }
}

export class TWNVisualizationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_VISUALIZATION_ACCESS_DENIED', 403, true);
  }
}

export class TWNVisualizationUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_VISUALIZATION_UPDATE_ERROR', 500, true);
  }
}

export class TWNVisualizationValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_VISUALIZATION_VALIDATION_ERROR', 422, true);
  }
}

export class TWNPredictionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_PREDICTION_ERROR', 500, true);
  }
}

export class TWNPredictionNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_PREDICTION_NOT_FOUND', 404, true);
  }
}

export class TWNPredictionAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_PREDICTION_ACCESS_DENIED', 403, true);
  }
}

export class TWNPredictionValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_PREDICTION_VALIDATION_ERROR', 422, true);
  }
}

export class TWNScenarioError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SCENARIO_ERROR', 500, true);
  }
}

export class TWNScenarioNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SCENARIO_NOT_FOUND', 404, true);
  }
}

export class TWNScenarioAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SCENARIO_ALREADY_EXISTS', 409, true);
  }
}

export class TWNScenarioUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SCENARIO_UPDATE_ERROR', 500, true);
  }
}

export class TWNScenarioDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SCENARIO_DELETE_ERROR', 500, true);
  }
}

export class TWNScenarioAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SCENARIO_ACCESS_DENIED', 403, true);
  }
}

export class TWNGeofencingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GEOFENCING_ERROR', 500, true);
  }
}

export class TWNGeofencingNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GEOFENCING_NOT_FOUND', 404, true);
  }
}

export class TWNGeofencingUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GEOFENCING_UPDATE_ERROR', 500, true);
  }
}

export class TWNGeofencingAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GEOFENCING_ACCESS_DENIED', 403, true);
  }
}

export class TWNGeofencingValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GEOFENCING_VALIDATION_ERROR', 422, true);
  }
}

export class TWNRealTimeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REAL_TIME_ERROR', 500, true);
  }
}

export class TWNRealTimeNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REAL_TIME_NOT_FOUND', 404, true);
  }
}

export class TWNRealTimeAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REAL_TIME_ACCESS_DENIED', 403, true);
  }
}

export class TWNRealTimeSyncError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REAL_TIME_SYNC_ERROR', 502, true);
  }
}

export class TWNGISIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GIS_INTEGRATION_ERROR', 502, true);
  }
}

export class TWNGISIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GIS_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class TWNGISIntegrationAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GIS_INTEGRATION_ACCESS_DENIED', 403, true);
  }
}

export class TWNGISIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_GIS_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class TWNInfrastructureError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INFRASTRUCTURE_ERROR', 500, true);
  }
}

export class TWNInfrastructureNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INFRASTRUCTURE_NOT_FOUND', 404, true);
  }
}

export class TWNInfrastructureUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INFRASTRUCTURE_UPDATE_ERROR', 500, true);
  }
}

export class TWNInfrastructureAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INFRASTRUCTURE_ACCESS_DENIED', 403, true);
  }
}

export class TWNInfrastructureValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INFRASTRUCTURE_VALIDATION_ERROR', 422, true);
  }
}

export class TWNSensorError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_ERROR', 500, true);
  }
}

export class TWNSensorNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_NOT_FOUND', 404, true);
  }
}

export class TWNSensorAlreadyExistsError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_ALREADY_EXISTS', 409, true);
  }
}

export class TWNSensorUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_UPDATE_ERROR', 500, true);
  }
}

export class TWNSensorDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_DELETE_ERROR', 500, true);
  }
}

export class TWNSensorAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_ACCESS_DENIED', 403, true);
  }
}

export class TWNSensorDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SENSOR_DATA_ERROR', 500, true);
  }
}

export class TWNReportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REPORT_ERROR', 500, true);
  }
}

export class TWNReportNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REPORT_NOT_FOUND', 404, true);
  }
}

export class TWNReportAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REPORT_ACCESS_DENIED', 403, true);
  }
}

export class TWNReportGenerationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_REPORT_GENERATION_ERROR', 500, true);
  }
}

export class TWNAlertError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_ALERT_ERROR', 500, true);
  }
}

export class TWNAlertNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_ALERT_NOT_FOUND', 404, true);
  }
}

export class TWNAlertUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_ALERT_UPDATE_ERROR', 500, true);
  }
}

export class TWNAlertDeleteError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_ALERT_DELETE_ERROR', 500, true);
  }
}

export class TWNAlertAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_ALERT_ACCESS_DENIED', 403, true);
  }
}

export class TWNNotificationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_NOTIFICATION_ERROR', 500, true);
  }
}

export class TWNNotificationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_NOTIFICATION_NOT_FOUND', 404, true);
  }
}

export class TWNNotificationDeliveryError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_NOTIFICATION_DELIVERY_ERROR', 502, true);
  }
}

export class TWNConfigError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_CONFIG_ERROR', 500, true);
  }
}

export class TWNConfigNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_CONFIG_NOT_FOUND', 404, true);
  }
}

export class TWNConfigUpdateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_CONFIG_UPDATE_ERROR', 500, true);
  }
}

export class TWNConfigAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_CONFIG_ACCESS_DENIED', 403, true);
  }
}

export class TWNConfigValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_CONFIG_VALIDATION_ERROR', 422, true);
  }
}

export class TWNAuditLogError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_AUDIT_LOG_ERROR', 500, true);
  }
}

export class TWNAuditLogAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_AUDIT_LOG_ACCESS_DENIED', 403, true);
  }
}

export class TWNAuditLogNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_AUDIT_LOG_NOT_FOUND', 404, true);
  }
}

export class TWNIntegrationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INTEGRATION_ERROR', 502, true);
  }
}

export class TWNIntegrationNotFoundError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INTEGRATION_NOT_FOUND', 404, true);
  }
}

export class TWNIntegrationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INTEGRATION_TIMEOUT', 504, true);
  }
}

export class TWNIntegrationAuthError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INTEGRATION_AUTH_ERROR', 401, true);
  }
}

export class TWNDataExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_EXPORT_ERROR', 500, true);
  }
}

export class TWNDataImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_IMPORT_ERROR', 500, true);
  }
}

export class TWNDataValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DATA_VALIDATION_ERROR', 422, true);
  }
}

export class TWNDashboardError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DASHBOARD_ERROR', 500, true);
  }
}

export class TWNDashboardAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DASHBOARD_ACCESS_DENIED', 403, true);
  }
}

export class TWNDashboardDataError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_DASHBOARD_DATA_ERROR', 500, true);
  }
}

export class TWNSessionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SESSION_ERROR', 401, true);
  }
}

export class TWNSessionExpiredError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SESSION_EXPIRED', 401, true);
  }
}

export class TWNSessionRevokedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_SESSION_REVOKED', 401, true);
  }
}

export class TWNRateLimitError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_RATE_LIMIT_ERROR', 429, true);
  }
}

export class TWNInternalError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_INTERNAL_ERROR', 500, false);
  }
}

export class TWNExternalServiceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_EXTERNAL_SERVICE_ERROR', 502, true);
  }
}

export class TWNMaintenanceError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_MAINTENANCE_ERROR', 503, true);
  }
}

export class MINMinistryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_LOAD_ERROR', 500, true);
  }
}

export class MINMinistryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_EXPORT_ERROR', 500, true);
  }
}

export class MINMinistryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_IMPORT_ERROR', 500, true);
  }
}

export class MINMinistryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_TIMEOUT_ERROR', 504, true);
  }
}

export class MINMinistryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_MINISTRY_DUPLICATE_ERROR', 409, true);
  }
}

export class MINDepartmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_LOAD_ERROR', 500, true);
  }
}

export class MINDepartmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_EXPORT_ERROR', 500, true);
  }
}

export class MINDepartmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_IMPORT_ERROR', 500, true);
  }
}

export class MINDepartmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_TIMEOUT_ERROR', 504, true);
  }
}

export class MINDepartmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DEPARTMENT_DUPLICATE_ERROR', 409, true);
  }
}

export class MINPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_LOAD_ERROR', 500, true);
  }
}

export class MINPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_EXPORT_ERROR', 500, true);
  }
}

export class MINPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_IMPORT_ERROR', 500, true);
  }
}

export class MINPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_TIMEOUT_ERROR', 504, true);
  }
}

export class MINPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_DUPLICATE_ERROR', 409, true);
  }
}

export class MINPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_DRAFT_ERROR', 400, true);
  }
}

export class MINPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_PUBLISH_ERROR', 500, true);
  }
}

export class MINPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_ARCHIVE_ERROR', 500, true);
  }
}

export class MINPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_REVOKE_ERROR', 400, true);
  }
}

export class MINPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_POLICY_SHARE_ERROR', 502, true);
  }
}

export class MINDirectiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_LOAD_ERROR', 500, true);
  }
}

export class MINDirectiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_EXPORT_ERROR', 500, true);
  }
}

export class MINDirectiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_IMPORT_ERROR', 500, true);
  }
}

export class MINDirectiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_TIMEOUT_ERROR', 504, true);
  }
}

export class MINDirectiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_DUPLICATE_ERROR', 409, true);
  }
}

export class MINDirectiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_DRAFT_ERROR', 400, true);
  }
}

export class MINDirectivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_PUBLISH_ERROR', 500, true);
  }
}

export class MINDirectiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_ARCHIVE_ERROR', 500, true);
  }
}

export class MINDirectiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_REVOKE_ERROR', 400, true);
  }
}

export class MINDirectiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIRECTIVE_SHARE_ERROR', 502, true);
  }
}

export class MINRegulationLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_LOAD_ERROR', 500, true);
  }
}

export class MINRegulationExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_EXPORT_ERROR', 500, true);
  }
}

export class MINRegulationImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_IMPORT_ERROR', 500, true);
  }
}

export class MINRegulationTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_TIMEOUT_ERROR', 504, true);
  }
}

export class MINRegulationDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_DUPLICATE_ERROR', 409, true);
  }
}

export class MINRegulationDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_DRAFT_ERROR', 400, true);
  }
}

export class MINRegulationArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_ARCHIVE_ERROR', 500, true);
  }
}

export class MINRegulationRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_REVOKE_ERROR', 400, true);
  }
}

export class MINRegulationShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_REGULATION_SHARE_ERROR', 502, true);
  }
}

export class MINCircularLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_LOAD_ERROR', 500, true);
  }
}

export class MINCircularExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_EXPORT_ERROR', 500, true);
  }
}

export class MINCircularImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_IMPORT_ERROR', 500, true);
  }
}

export class MINCircularTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_TIMEOUT_ERROR', 504, true);
  }
}

export class MINCircularDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_DUPLICATE_ERROR', 409, true);
  }
}

export class MINCircularDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_DRAFT_ERROR', 400, true);
  }
}

export class MINCircularArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_ARCHIVE_ERROR', 500, true);
  }
}

export class MINCircularRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CIRCULAR_REVOKE_ERROR', 400, true);
  }
}

export class MINPersonnelLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_LOAD_ERROR', 500, true);
  }
}

export class MINPersonnelExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_EXPORT_ERROR', 500, true);
  }
}

export class MINPersonnelImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_IMPORT_ERROR', 500, true);
  }
}

export class MINPersonnelTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_TIMEOUT_ERROR', 504, true);
  }
}

export class MINPersonnelDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_DUPLICATE_ERROR', 409, true);
  }
}

export class MINPersonnelRecallError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_RECALL_ERROR', 400, true);
  }
}

export class MINPersonnelLeaveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_LEAVE_ERROR', 400, true);
  }
}

export class MINPersonnelRetirementError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_RETIREMENT_ERROR', 400, true);
  }
}

export class MINPersonnelSuspensionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PERSONNEL_SUSPENSION_ERROR', 400, true);
  }
}

export class MINElectionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_LOAD_ERROR', 500, true);
  }
}

export class MINElectionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_EXPORT_ERROR', 500, true);
  }
}

export class MINElectionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_IMPORT_ERROR', 500, true);
  }
}

export class MINElectionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_TIMEOUT_ERROR', 504, true);
  }
}

export class MINElectionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_DUPLICATE_ERROR', 409, true);
  }
}

export class MINElectionBallotError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_BALLOT_ERROR', 400, true);
  }
}

export class MINElectionPollingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_POLLING_ERROR', 400, true);
  }
}

export class MINElectionCountingError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_COUNTING_ERROR', 400, true);
  }
}

export class MINElectionDisputeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_ELECTION_DISPUTE_ERROR', 400, true);
  }
}

export class MINParliamentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_LOAD_ERROR', 500, true);
  }
}

export class MINParliamentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_EXPORT_ERROR', 500, true);
  }
}

export class MINParliamentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_IMPORT_ERROR', 500, true);
  }
}

export class MINParliamentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_TIMEOUT_ERROR', 504, true);
  }
}

export class MINParliamentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_DUPLICATE_ERROR', 409, true);
  }
}

export class MINParliamentBillError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_BILL_ERROR', 400, true);
  }
}

export class MINParliamentMotionError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_MOTION_ERROR', 400, true);
  }
}

export class MINParliamentQuorumError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_PARLIAMENT_QUORUM_ERROR', 400, true);
  }
}

export class MINFederalismLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_LOAD_ERROR', 500, true);
  }
}

export class MINFederalismExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_EXPORT_ERROR', 500, true);
  }
}

export class MINFederalismImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_IMPORT_ERROR', 500, true);
  }
}

export class MINFederalismTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_TIMEOUT_ERROR', 504, true);
  }
}

export class MINFederalismDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_DUPLICATE_ERROR', 409, true);
  }
}

export class MINFederalismReconciliationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_RECONCILIATION_ERROR', 400, true);
  }
}

export class MINFederalismDisputeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_FEDERALISM_DISPUTE_ERROR', 400, true);
  }
}

export class MINCabinetLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_LOAD_ERROR', 500, true);
  }
}

export class MINCabinetExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_EXPORT_ERROR', 500, true);
  }
}

export class MINCabinetImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_IMPORT_ERROR', 500, true);
  }
}

export class MINCabinetTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_TIMEOUT_ERROR', 504, true);
  }
}

export class MINCabinetDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_CABINET_DUPLICATE_ERROR', 409, true);
  }
}

export class MINDiplomaticLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_LOAD_ERROR', 500, true);
  }
}

export class MINDiplomaticExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_EXPORT_ERROR', 500, true);
  }
}

export class MINDiplomaticImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_IMPORT_ERROR', 500, true);
  }
}

export class MINDiplomaticTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_TIMEOUT_ERROR', 504, true);
  }
}

export class MINDiplomaticDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_DUPLICATE_ERROR', 409, true);
  }
}

export class MINDiplomaticRecallError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_DIPLOMATIC_RECALL_ERROR', 400, true);
  }
}

export class MINIntergovernmentalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_LOAD_ERROR', 500, true);
  }
}

export class MINIntergovernmentalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_EXPORT_ERROR', 500, true);
  }
}

export class MINIntergovernmentalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_IMPORT_ERROR', 500, true);
  }
}

export class MINIntergovernmentalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_TIMEOUT_ERROR', 504, true);
  }
}

export class MINIntergovernmentalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_DUPLICATE_ERROR', 409, true);
  }
}

export class MINIntergovernmentalDisputeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_INTERGOVERNMENTAL_DISPUTE_ERROR', 400, true);
  }
}

export class MINPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Policy_BATCHERROR', 500, true);
  }
}
export class MINPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_LOADERROR', 500, true);
  }
}
export class MINReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_EXPORTERROR', 500, true);
  }
}
export class MINReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_IMPORTERROR', 500, true);
  }
}
export class MINReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_TIMEOUTERROR', 504, true);
  }
}
export class MINReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_DUPLICATEERROR', 409, true);
  }
}
export class MINReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_DRAFTERROR', 500, true);
  }
}
export class MINReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_PUBLISHERROR', 500, true);
  }
}
export class MINReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_ARCHIVEERROR', 500, true);
  }
}
export class MINReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_REVOKEERROR', 500, true);
  }
}
export class MINReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_SHAREERROR', 500, true);
  }
}
export class MINReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_BATCHERROR', 500, true);
  }
}
export class MINReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_REVIEWERROR', 500, true);
  }
}
export class MINReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_LOADERROR', 500, true);
  }
}
export class MINTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_EXPORTERROR', 500, true);
  }
}
export class MINTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_IMPORTERROR', 500, true);
  }
}
export class MINTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_TIMEOUTERROR', 504, true);
  }
}
export class MINTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_DUPLICATEERROR', 409, true);
  }
}
export class MINTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_DRAFTERROR', 500, true);
  }
}
export class MINTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_PUBLISHERROR', 500, true);
  }
}
export class MINTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_ARCHIVEERROR', 500, true);
  }
}
export class MINTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_REVOKEERROR', 500, true);
  }
}
export class MINTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_SHAREERROR', 500, true);
  }
}
export class MINTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_BATCHERROR', 500, true);
  }
}
export class MINTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_REVIEWERROR', 500, true);
  }
}
export class MINTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_LOADERROR', 500, true);
  }
}
export class MINScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_EXPORTERROR', 500, true);
  }
}
export class MINScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_IMPORTERROR', 500, true);
  }
}
export class MINScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class MINScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class MINScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_DRAFTERROR', 500, true);
  }
}
export class MINSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_PUBLISHERROR', 500, true);
  }
}
export class MINScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class MINScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_REVOKEERROR', 500, true);
  }
}
export class MINScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_SHAREERROR', 500, true);
  }
}
export class MINScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_BATCHERROR', 500, true);
  }
}
export class MINScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_REVIEWERROR', 500, true);
  }
}
export class MINScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_LOADERROR', 500, true);
  }
}
export class MINArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_EXPORTERROR', 500, true);
  }
}
export class MINArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_IMPORTERROR', 500, true);
  }
}
export class MINArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_TIMEOUTERROR', 504, true);
  }
}
export class MINArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_DUPLICATEERROR', 409, true);
  }
}
export class MINArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_DRAFTERROR', 500, true);
  }
}
export class MINArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_PUBLISHERROR', 500, true);
  }
}
export class MINArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_ARCHIVEERROR', 500, true);
  }
}
export class MINArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_REVOKEERROR', 500, true);
  }
}
export class MINArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_SHAREERROR', 500, true);
  }
}
export class MINArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_BATCHERROR', 500, true);
  }
}
export class MINArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_REVIEWERROR', 500, true);
  }
}
export class MINArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_LOADERROR', 500, true);
  }
}
export class MINWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_EXPORTERROR', 500, true);
  }
}
export class MINWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_IMPORTERROR', 500, true);
  }
}
export class MINWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class MINWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class MINWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_DRAFTERROR', 500, true);
  }
}
export class MINWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_PUBLISHERROR', 500, true);
  }
}
export class MINWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class MINWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_REVOKEERROR', 500, true);
  }
}
export class MINWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_SHAREERROR', 500, true);
  }
}
export class MINWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_BATCHERROR', 500, true);
  }
}
export class MINWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_REVIEWERROR', 500, true);
  }
}
export class MINWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_LOADERROR', 500, true);
  }
}
export class MINBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_EXPORTERROR', 500, true);
  }
}
export class MINBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_IMPORTERROR', 500, true);
  }
}
export class MINBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_TIMEOUTERROR', 504, true);
  }
}
export class MINBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_DUPLICATEERROR', 409, true);
  }
}
export class MINBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_DRAFTERROR', 500, true);
  }
}
export class MINBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_PUBLISHERROR', 500, true);
  }
}
export class MINBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_ARCHIVEERROR', 500, true);
  }
}
export class MINBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_REVOKEERROR', 500, true);
  }
}
export class MINBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_SHAREERROR', 500, true);
  }
}
export class MINBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_BATCHERROR', 500, true);
  }
}
export class MINBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_REVIEWERROR', 500, true);
  }
}
export class MINBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_LOADERROR', 500, true);
  }
}
export class MINVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_EXPORTERROR', 500, true);
  }
}
export class MINVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_IMPORTERROR', 500, true);
  }
}
export class MINVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_TIMEOUTERROR', 504, true);
  }
}
export class MINVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_DUPLICATEERROR', 409, true);
  }
}
export class MINVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_DRAFTERROR', 500, true);
  }
}
export class MINVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_PUBLISHERROR', 500, true);
  }
}
export class MINVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_ARCHIVEERROR', 500, true);
  }
}
export class MINVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_REVOKEERROR', 500, true);
  }
}
export class MINVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_SHAREERROR', 500, true);
  }
}
export class MINVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_BATCHERROR', 500, true);
  }
}
export class MINVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_REVIEWERROR', 500, true);
  }
}
export class MINVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_LOADERROR', 500, true);
  }
}
export class MINTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_EXPORTERROR', 500, true);
  }
}
export class MINTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_IMPORTERROR', 500, true);
  }
}
export class MINTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_TIMEOUTERROR', 504, true);
  }
}
export class MINTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_DUPLICATEERROR', 409, true);
  }
}
export class MINTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_DRAFTERROR', 500, true);
  }
}
export class MINTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_PUBLISHERROR', 500, true);
  }
}
export class MINTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_ARCHIVEERROR', 500, true);
  }
}
export class MINTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_REVOKEERROR', 500, true);
  }
}
export class MINTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_SHAREERROR', 500, true);
  }
}
export class MINTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_BATCHERROR', 500, true);
  }
}
export class MINTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_REVIEWERROR', 500, true);
  }
}
export class MINTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_LOADERROR', 500, true);
  }
}
export class MINCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_EXPORTERROR', 500, true);
  }
}
export class MINCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_IMPORTERROR', 500, true);
  }
}
export class MINCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_TIMEOUTERROR', 504, true);
  }
}
export class MINCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_DUPLICATEERROR', 409, true);
  }
}
export class MINCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_DRAFTERROR', 500, true);
  }
}
export class MINCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_PUBLISHERROR', 500, true);
  }
}
export class MINCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_ARCHIVEERROR', 500, true);
  }
}
export class MINCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_REVOKEERROR', 500, true);
  }
}
export class MINCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_SHAREERROR', 500, true);
  }
}
export class MINCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_BATCHERROR', 500, true);
  }
}
export class MINCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_REVIEWERROR', 500, true);
  }
}
export class MINCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_LOADERROR', 500, true);
  }
}
export class MINCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_EXPORTERROR', 500, true);
  }
}
export class MINCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_IMPORTERROR', 500, true);
  }
}
export class MINCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_TIMEOUTERROR', 504, true);
  }
}
export class MINCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_DUPLICATEERROR', 409, true);
  }
}
export class MINCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_DRAFTERROR', 500, true);
  }
}
export class MINCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_PUBLISHERROR', 500, true);
  }
}
export class MINCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_ARCHIVEERROR', 500, true);
  }
}
export class MINCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_REVOKEERROR', 500, true);
  }
}
export class MINCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_SHAREERROR', 500, true);
  }
}
export class MINCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_BATCHERROR', 500, true);
  }
}
export class MINCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_REVIEWERROR', 500, true);
  }
}
export class MINCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_LOADERROR', 500, true);
  }
}
export class MINAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_EXPORTERROR', 500, true);
  }
}
export class MINAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_IMPORTERROR', 500, true);
  }
}
export class MINAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class MINAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class MINAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_DRAFTERROR', 500, true);
  }
}
export class MINAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_PUBLISHERROR', 500, true);
  }
}
export class MINAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class MINAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_REVOKEERROR', 500, true);
  }
}
export class MINAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_SHAREERROR', 500, true);
  }
}
export class MINAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_BATCHERROR', 500, true);
  }
}
export class MINAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_REVIEWERROR', 500, true);
  }
}
export class MINAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_LOADERROR', 500, true);
  }
}
export class MINApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_EXPORTERROR', 500, true);
  }
}
export class MINApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_IMPORTERROR', 500, true);
  }
}
export class MINApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_TIMEOUTERROR', 504, true);
  }
}
export class MINApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_DUPLICATEERROR', 409, true);
  }
}
export class MINApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_DRAFTERROR', 500, true);
  }
}
export class MINApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_PUBLISHERROR', 500, true);
  }
}
export class MINApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_ARCHIVEERROR', 500, true);
  }
}
export class MINApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_REVOKEERROR', 500, true);
  }
}
export class MINApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_SHAREERROR', 500, true);
  }
}
export class MINApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_BATCHERROR', 500, true);
  }
}
export class MINApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_REVIEWERROR', 500, true);
  }
}
export class MINApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class MINReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_LOADERROR', 500, true);
  }
}
export class MINReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_EXPORTERROR', 500, true);
  }
}
export class MINReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_IMPORTERROR', 500, true);
  }
}
export class MINReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_TIMEOUTERROR', 504, true);
  }
}
export class MINReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_DUPLICATEERROR', 409, true);
  }
}
export class MINReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_DRAFTERROR', 500, true);
  }
}
export class MINReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_PUBLISHERROR', 500, true);
  }
}
export class MINReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_ARCHIVEERROR', 500, true);
  }
}
export class MINReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_REVOKEERROR', 500, true);
  }
}
export class MINReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_SHAREERROR', 500, true);
  }
}
export class MINReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_BATCHERROR', 500, true);
  }
}
export class MINReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class MINReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class MINReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_REVIEWERROR', 500, true);
  }
}
export class MINReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class MINReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_MIN_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_LOADERROR', 500, true);
  }
}
export class REGPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_EXPORTERROR', 500, true);
  }
}
export class REGPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_IMPORTERROR', 500, true);
  }
}
export class REGPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_TIMEOUTERROR', 504, true);
  }
}
export class REGPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_DUPLICATEERROR', 409, true);
  }
}
export class REGPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_DRAFTERROR', 500, true);
  }
}
export class REGPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_PUBLISHERROR', 500, true);
  }
}
export class REGPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_ARCHIVEERROR', 500, true);
  }
}
export class REGPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_REVOKEERROR', 500, true);
  }
}
export class REGPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_SHAREERROR', 500, true);
  }
}
export class REGPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_BATCHERROR', 500, true);
  }
}
export class REGPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_REVIEWERROR', 500, true);
  }
}
export class REGPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_LOADERROR', 500, true);
  }
}
export class REGReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_EXPORTERROR', 500, true);
  }
}
export class REGReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_IMPORTERROR', 500, true);
  }
}
export class REGReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_TIMEOUTERROR', 504, true);
  }
}
export class REGReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_DUPLICATEERROR', 409, true);
  }
}
export class REGReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_DRAFTERROR', 500, true);
  }
}
export class REGReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_PUBLISHERROR', 500, true);
  }
}
export class REGReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_ARCHIVEERROR', 500, true);
  }
}
export class REGReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_REVOKEERROR', 500, true);
  }
}
export class REGReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_SHAREERROR', 500, true);
  }
}
export class REGReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_BATCHERROR', 500, true);
  }
}
export class REGReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_REVIEWERROR', 500, true);
  }
}
export class REGReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_LOADERROR', 500, true);
  }
}
export class REGTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_EXPORTERROR', 500, true);
  }
}
export class REGTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_IMPORTERROR', 500, true);
  }
}
export class REGTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_TIMEOUTERROR', 504, true);
  }
}
export class REGTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_DUPLICATEERROR', 409, true);
  }
}
export class REGTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_DRAFTERROR', 500, true);
  }
}
export class REGTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_PUBLISHERROR', 500, true);
  }
}
export class REGTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_ARCHIVEERROR', 500, true);
  }
}
export class REGTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_REVOKEERROR', 500, true);
  }
}
export class REGTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_SHAREERROR', 500, true);
  }
}
export class REGTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_BATCHERROR', 500, true);
  }
}
export class REGTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_REVIEWERROR', 500, true);
  }
}
export class REGTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_LOADERROR', 500, true);
  }
}
export class REGScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_EXPORTERROR', 500, true);
  }
}
export class REGScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_IMPORTERROR', 500, true);
  }
}
export class REGScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class REGScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class REGScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_DRAFTERROR', 500, true);
  }
}
export class REGSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_PUBLISHERROR', 500, true);
  }
}
export class REGScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class REGScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_REVOKEERROR', 500, true);
  }
}
export class REGScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_SHAREERROR', 500, true);
  }
}
export class REGScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_BATCHERROR', 500, true);
  }
}
export class REGScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_REVIEWERROR', 500, true);
  }
}
export class REGScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_LOADERROR', 500, true);
  }
}
export class REGArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_EXPORTERROR', 500, true);
  }
}
export class REGArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_IMPORTERROR', 500, true);
  }
}
export class REGArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_TIMEOUTERROR', 504, true);
  }
}
export class REGArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_DUPLICATEERROR', 409, true);
  }
}
export class REGArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_DRAFTERROR', 500, true);
  }
}
export class REGArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_PUBLISHERROR', 500, true);
  }
}
export class REGArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_ARCHIVEERROR', 500, true);
  }
}
export class REGArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_REVOKEERROR', 500, true);
  }
}
export class REGArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_SHAREERROR', 500, true);
  }
}
export class REGArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_BATCHERROR', 500, true);
  }
}
export class REGArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_REVIEWERROR', 500, true);
  }
}
export class REGArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_LOADERROR', 500, true);
  }
}
export class REGWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_EXPORTERROR', 500, true);
  }
}
export class REGWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_IMPORTERROR', 500, true);
  }
}
export class REGWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class REGWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class REGWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_DRAFTERROR', 500, true);
  }
}
export class REGWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_PUBLISHERROR', 500, true);
  }
}
export class REGWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class REGWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_REVOKEERROR', 500, true);
  }
}
export class REGWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_SHAREERROR', 500, true);
  }
}
export class REGWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_BATCHERROR', 500, true);
  }
}
export class REGWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_REVIEWERROR', 500, true);
  }
}
export class REGWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_LOADERROR', 500, true);
  }
}
export class REGBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_EXPORTERROR', 500, true);
  }
}
export class REGBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_IMPORTERROR', 500, true);
  }
}
export class REGBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_TIMEOUTERROR', 504, true);
  }
}
export class REGBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_DUPLICATEERROR', 409, true);
  }
}
export class REGBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_DRAFTERROR', 500, true);
  }
}
export class REGBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_PUBLISHERROR', 500, true);
  }
}
export class REGBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_ARCHIVEERROR', 500, true);
  }
}
export class REGBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_REVOKEERROR', 500, true);
  }
}
export class REGBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_SHAREERROR', 500, true);
  }
}
export class REGBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_BATCHERROR', 500, true);
  }
}
export class REGBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_REVIEWERROR', 500, true);
  }
}
export class REGBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_LOADERROR', 500, true);
  }
}
export class REGVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_EXPORTERROR', 500, true);
  }
}
export class REGVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_IMPORTERROR', 500, true);
  }
}
export class REGVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_TIMEOUTERROR', 504, true);
  }
}
export class REGVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_DUPLICATEERROR', 409, true);
  }
}
export class REGVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_DRAFTERROR', 500, true);
  }
}
export class REGVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_PUBLISHERROR', 500, true);
  }
}
export class REGVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_ARCHIVEERROR', 500, true);
  }
}
export class REGVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_REVOKEERROR', 500, true);
  }
}
export class REGVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_SHAREERROR', 500, true);
  }
}
export class REGVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_BATCHERROR', 500, true);
  }
}
export class REGVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_REVIEWERROR', 500, true);
  }
}
export class REGVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_LOADERROR', 500, true);
  }
}
export class REGTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_EXPORTERROR', 500, true);
  }
}
export class REGTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_IMPORTERROR', 500, true);
  }
}
export class REGTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_TIMEOUTERROR', 504, true);
  }
}
export class REGTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_DUPLICATEERROR', 409, true);
  }
}
export class REGTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_DRAFTERROR', 500, true);
  }
}
export class REGTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_PUBLISHERROR', 500, true);
  }
}
export class REGTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_ARCHIVEERROR', 500, true);
  }
}
export class REGTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_REVOKEERROR', 500, true);
  }
}
export class REGTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_SHAREERROR', 500, true);
  }
}
export class REGTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_BATCHERROR', 500, true);
  }
}
export class REGTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_REVIEWERROR', 500, true);
  }
}
export class REGTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_LOADERROR', 500, true);
  }
}
export class REGCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_EXPORTERROR', 500, true);
  }
}
export class REGCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_IMPORTERROR', 500, true);
  }
}
export class REGCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_TIMEOUTERROR', 504, true);
  }
}
export class REGCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_DUPLICATEERROR', 409, true);
  }
}
export class REGCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_DRAFTERROR', 500, true);
  }
}
export class REGCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_PUBLISHERROR', 500, true);
  }
}
export class REGCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_ARCHIVEERROR', 500, true);
  }
}
export class REGCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_REVOKEERROR', 500, true);
  }
}
export class REGCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_SHAREERROR', 500, true);
  }
}
export class REGCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_BATCHERROR', 500, true);
  }
}
export class REGCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_REVIEWERROR', 500, true);
  }
}
export class REGCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_LOADERROR', 500, true);
  }
}
export class REGCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_EXPORTERROR', 500, true);
  }
}
export class REGCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_IMPORTERROR', 500, true);
  }
}
export class REGCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_TIMEOUTERROR', 504, true);
  }
}
export class REGCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_DUPLICATEERROR', 409, true);
  }
}
export class REGCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_DRAFTERROR', 500, true);
  }
}
export class REGCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_PUBLISHERROR', 500, true);
  }
}
export class REGCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_ARCHIVEERROR', 500, true);
  }
}
export class REGCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_REVOKEERROR', 500, true);
  }
}
export class REGCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_SHAREERROR', 500, true);
  }
}
export class REGCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_BATCHERROR', 500, true);
  }
}
export class REGCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_REVIEWERROR', 500, true);
  }
}
export class REGCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_LOADERROR', 500, true);
  }
}
export class REGAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_EXPORTERROR', 500, true);
  }
}
export class REGAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_IMPORTERROR', 500, true);
  }
}
export class REGAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class REGAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class REGAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_DRAFTERROR', 500, true);
  }
}
export class REGAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_PUBLISHERROR', 500, true);
  }
}
export class REGAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class REGAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_REVOKEERROR', 500, true);
  }
}
export class REGAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_SHAREERROR', 500, true);
  }
}
export class REGAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_BATCHERROR', 500, true);
  }
}
export class REGAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_REVIEWERROR', 500, true);
  }
}
export class REGAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_LOADERROR', 500, true);
  }
}
export class REGApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_EXPORTERROR', 500, true);
  }
}
export class REGApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_IMPORTERROR', 500, true);
  }
}
export class REGApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_TIMEOUTERROR', 504, true);
  }
}
export class REGApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_DUPLICATEERROR', 409, true);
  }
}
export class REGApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_DRAFTERROR', 500, true);
  }
}
export class REGApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_PUBLISHERROR', 500, true);
  }
}
export class REGApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_ARCHIVEERROR', 500, true);
  }
}
export class REGApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_REVOKEERROR', 500, true);
  }
}
export class REGApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_SHAREERROR', 500, true);
  }
}
export class REGApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_BATCHERROR', 500, true);
  }
}
export class REGApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_REVIEWERROR', 500, true);
  }
}
export class REGApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class REGReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_LOADERROR', 500, true);
  }
}
export class REGReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_EXPORTERROR', 500, true);
  }
}
export class REGReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_IMPORTERROR', 500, true);
  }
}
export class REGReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_TIMEOUTERROR', 504, true);
  }
}
export class REGReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_DUPLICATEERROR', 409, true);
  }
}
export class REGReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_DRAFTERROR', 500, true);
  }
}
export class REGReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_PUBLISHERROR', 500, true);
  }
}
export class REGReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_ARCHIVEERROR', 500, true);
  }
}
export class REGReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_REVOKEERROR', 500, true);
  }
}
export class REGReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_SHAREERROR', 500, true);
  }
}
export class REGReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_BATCHERROR', 500, true);
  }
}
export class REGReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class REGReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class REGReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_REVIEWERROR', 500, true);
  }
}
export class REGReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class REGReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_REG_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_LOADERROR', 500, true);
  }
}
export class EXMPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_EXPORTERROR', 500, true);
  }
}
export class EXMPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_IMPORTERROR', 500, true);
  }
}
export class EXMPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_TIMEOUTERROR', 504, true);
  }
}
export class EXMPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_DUPLICATEERROR', 409, true);
  }
}
export class EXMPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_DRAFTERROR', 500, true);
  }
}
export class EXMPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_PUBLISHERROR', 500, true);
  }
}
export class EXMPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_ARCHIVEERROR', 500, true);
  }
}
export class EXMPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_REVOKEERROR', 500, true);
  }
}
export class EXMPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_SHAREERROR', 500, true);
  }
}
export class EXMPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_BATCHERROR', 500, true);
  }
}
export class EXMPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_REVIEWERROR', 500, true);
  }
}
export class EXMPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_LOADERROR', 500, true);
  }
}
export class EXMReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_EXPORTERROR', 500, true);
  }
}
export class EXMReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_IMPORTERROR', 500, true);
  }
}
export class EXMReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_TIMEOUTERROR', 504, true);
  }
}
export class EXMReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_DUPLICATEERROR', 409, true);
  }
}
export class EXMReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_DRAFTERROR', 500, true);
  }
}
export class EXMReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_PUBLISHERROR', 500, true);
  }
}
export class EXMReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_ARCHIVEERROR', 500, true);
  }
}
export class EXMReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_REVOKEERROR', 500, true);
  }
}
export class EXMReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_SHAREERROR', 500, true);
  }
}
export class EXMReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_BATCHERROR', 500, true);
  }
}
export class EXMReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_REVIEWERROR', 500, true);
  }
}
export class EXMReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_LOADERROR', 500, true);
  }
}
export class EXMTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_EXPORTERROR', 500, true);
  }
}
export class EXMTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_IMPORTERROR', 500, true);
  }
}
export class EXMTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_TIMEOUTERROR', 504, true);
  }
}
export class EXMTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_DUPLICATEERROR', 409, true);
  }
}
export class EXMTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_DRAFTERROR', 500, true);
  }
}
export class EXMTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_PUBLISHERROR', 500, true);
  }
}
export class EXMTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_ARCHIVEERROR', 500, true);
  }
}
export class EXMTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_REVOKEERROR', 500, true);
  }
}
export class EXMTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_SHAREERROR', 500, true);
  }
}
export class EXMTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_BATCHERROR', 500, true);
  }
}
export class EXMTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_REVIEWERROR', 500, true);
  }
}
export class EXMTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_LOADERROR', 500, true);
  }
}
export class EXMScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_EXPORTERROR', 500, true);
  }
}
export class EXMScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_IMPORTERROR', 500, true);
  }
}
export class EXMScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class EXMScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class EXMScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_DRAFTERROR', 500, true);
  }
}
export class EXMSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_PUBLISHERROR', 500, true);
  }
}
export class EXMScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class EXMScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_REVOKEERROR', 500, true);
  }
}
export class EXMScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_SHAREERROR', 500, true);
  }
}
export class EXMScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_BATCHERROR', 500, true);
  }
}
export class EXMScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_REVIEWERROR', 500, true);
  }
}
export class EXMScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_LOADERROR', 500, true);
  }
}
export class EXMArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_EXPORTERROR', 500, true);
  }
}
export class EXMArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_IMPORTERROR', 500, true);
  }
}
export class EXMArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_TIMEOUTERROR', 504, true);
  }
}
export class EXMArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_DUPLICATEERROR', 409, true);
  }
}
export class EXMArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_DRAFTERROR', 500, true);
  }
}
export class EXMArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_PUBLISHERROR', 500, true);
  }
}
export class EXMArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_ARCHIVEERROR', 500, true);
  }
}
export class EXMArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_REVOKEERROR', 500, true);
  }
}
export class EXMArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_SHAREERROR', 500, true);
  }
}
export class EXMArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_BATCHERROR', 500, true);
  }
}
export class EXMArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_REVIEWERROR', 500, true);
  }
}
export class EXMArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_LOADERROR', 500, true);
  }
}
export class EXMWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_EXPORTERROR', 500, true);
  }
}
export class EXMWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_IMPORTERROR', 500, true);
  }
}
export class EXMWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class EXMWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class EXMWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_DRAFTERROR', 500, true);
  }
}
export class EXMWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_PUBLISHERROR', 500, true);
  }
}
export class EXMWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class EXMWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_REVOKEERROR', 500, true);
  }
}
export class EXMWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_SHAREERROR', 500, true);
  }
}
export class EXMWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_BATCHERROR', 500, true);
  }
}
export class EXMWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_REVIEWERROR', 500, true);
  }
}
export class EXMWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_LOADERROR', 500, true);
  }
}
export class EXMBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_EXPORTERROR', 500, true);
  }
}
export class EXMBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_IMPORTERROR', 500, true);
  }
}
export class EXMBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_TIMEOUTERROR', 504, true);
  }
}
export class EXMBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_DUPLICATEERROR', 409, true);
  }
}
export class EXMBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_DRAFTERROR', 500, true);
  }
}
export class EXMBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_PUBLISHERROR', 500, true);
  }
}
export class EXMBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_ARCHIVEERROR', 500, true);
  }
}
export class EXMBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_REVOKEERROR', 500, true);
  }
}
export class EXMBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_SHAREERROR', 500, true);
  }
}
export class EXMBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_BATCHERROR', 500, true);
  }
}
export class EXMBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_REVIEWERROR', 500, true);
  }
}
export class EXMBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_LOADERROR', 500, true);
  }
}
export class EXMVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_EXPORTERROR', 500, true);
  }
}
export class EXMVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_IMPORTERROR', 500, true);
  }
}
export class EXMVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_TIMEOUTERROR', 504, true);
  }
}
export class EXMVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_DUPLICATEERROR', 409, true);
  }
}
export class EXMVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_DRAFTERROR', 500, true);
  }
}
export class EXMVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_PUBLISHERROR', 500, true);
  }
}
export class EXMVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_ARCHIVEERROR', 500, true);
  }
}
export class EXMVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_REVOKEERROR', 500, true);
  }
}
export class EXMVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_SHAREERROR', 500, true);
  }
}
export class EXMVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_BATCHERROR', 500, true);
  }
}
export class EXMVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_REVIEWERROR', 500, true);
  }
}
export class EXMVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_LOADERROR', 500, true);
  }
}
export class EXMTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_EXPORTERROR', 500, true);
  }
}
export class EXMTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_IMPORTERROR', 500, true);
  }
}
export class EXMTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_TIMEOUTERROR', 504, true);
  }
}
export class EXMTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_DUPLICATEERROR', 409, true);
  }
}
export class EXMTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_DRAFTERROR', 500, true);
  }
}
export class EXMTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_PUBLISHERROR', 500, true);
  }
}
export class EXMTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_ARCHIVEERROR', 500, true);
  }
}
export class EXMTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_REVOKEERROR', 500, true);
  }
}
export class EXMTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_SHAREERROR', 500, true);
  }
}
export class EXMTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_BATCHERROR', 500, true);
  }
}
export class EXMTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_REVIEWERROR', 500, true);
  }
}
export class EXMTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_LOADERROR', 500, true);
  }
}
export class EXMCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_EXPORTERROR', 500, true);
  }
}
export class EXMCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_IMPORTERROR', 500, true);
  }
}
export class EXMCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_TIMEOUTERROR', 504, true);
  }
}
export class EXMCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_DUPLICATEERROR', 409, true);
  }
}
export class EXMCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_DRAFTERROR', 500, true);
  }
}
export class EXMCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_PUBLISHERROR', 500, true);
  }
}
export class EXMCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_ARCHIVEERROR', 500, true);
  }
}
export class EXMCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_REVOKEERROR', 500, true);
  }
}
export class EXMCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_SHAREERROR', 500, true);
  }
}
export class EXMCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_BATCHERROR', 500, true);
  }
}
export class EXMCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_REVIEWERROR', 500, true);
  }
}
export class EXMCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_LOADERROR', 500, true);
  }
}
export class EXMCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_EXPORTERROR', 500, true);
  }
}
export class EXMCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_IMPORTERROR', 500, true);
  }
}
export class EXMCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_TIMEOUTERROR', 504, true);
  }
}
export class EXMCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_DUPLICATEERROR', 409, true);
  }
}
export class EXMCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_DRAFTERROR', 500, true);
  }
}
export class EXMCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_PUBLISHERROR', 500, true);
  }
}
export class EXMCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_ARCHIVEERROR', 500, true);
  }
}
export class EXMCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_REVOKEERROR', 500, true);
  }
}
export class EXMCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_SHAREERROR', 500, true);
  }
}
export class EXMCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_BATCHERROR', 500, true);
  }
}
export class EXMCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_REVIEWERROR', 500, true);
  }
}
export class EXMCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_LOADERROR', 500, true);
  }
}
export class EXMAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_EXPORTERROR', 500, true);
  }
}
export class EXMAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_IMPORTERROR', 500, true);
  }
}
export class EXMAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class EXMAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class EXMAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_DRAFTERROR', 500, true);
  }
}
export class EXMAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_PUBLISHERROR', 500, true);
  }
}
export class EXMAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class EXMAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_REVOKEERROR', 500, true);
  }
}
export class EXMAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_SHAREERROR', 500, true);
  }
}
export class EXMAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_BATCHERROR', 500, true);
  }
}
export class EXMAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_REVIEWERROR', 500, true);
  }
}
export class EXMAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_LOADERROR', 500, true);
  }
}
export class EXMApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_EXPORTERROR', 500, true);
  }
}
export class EXMApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_IMPORTERROR', 500, true);
  }
}
export class EXMApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_TIMEOUTERROR', 504, true);
  }
}
export class EXMApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_DUPLICATEERROR', 409, true);
  }
}
export class EXMApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_DRAFTERROR', 500, true);
  }
}
export class EXMApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_PUBLISHERROR', 500, true);
  }
}
export class EXMApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_ARCHIVEERROR', 500, true);
  }
}
export class EXMApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_REVOKEERROR', 500, true);
  }
}
export class EXMApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_SHAREERROR', 500, true);
  }
}
export class EXMApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_BATCHERROR', 500, true);
  }
}
export class EXMApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_REVIEWERROR', 500, true);
  }
}
export class EXMApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EXMReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_LOADERROR', 500, true);
  }
}
export class EXMReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_EXPORTERROR', 500, true);
  }
}
export class EXMReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_IMPORTERROR', 500, true);
  }
}
export class EXMReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_TIMEOUTERROR', 504, true);
  }
}
export class EXMReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_DUPLICATEERROR', 409, true);
  }
}
export class EXMReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_DRAFTERROR', 500, true);
  }
}
export class EXMReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_PUBLISHERROR', 500, true);
  }
}
export class EXMReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_ARCHIVEERROR', 500, true);
  }
}
export class EXMReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_REVOKEERROR', 500, true);
  }
}
export class EXMReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_SHAREERROR', 500, true);
  }
}
export class EXMReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_BATCHERROR', 500, true);
  }
}
export class EXMReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EXMReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EXMReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_REVIEWERROR', 500, true);
  }
}
export class EXMReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EXMReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EXM_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_LOADERROR', 500, true);
  }
}
export class PUBPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_EXPORTERROR', 500, true);
  }
}
export class PUBPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_IMPORTERROR', 500, true);
  }
}
export class PUBPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_TIMEOUTERROR', 504, true);
  }
}
export class PUBPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_DUPLICATEERROR', 409, true);
  }
}
export class PUBPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_DRAFTERROR', 500, true);
  }
}
export class PUBPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_PUBLISHERROR', 500, true);
  }
}
export class PUBPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_ARCHIVEERROR', 500, true);
  }
}
export class PUBPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_REVOKEERROR', 500, true);
  }
}
export class PUBPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_SHAREERROR', 500, true);
  }
}
export class PUBPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_BATCHERROR', 500, true);
  }
}
export class PUBPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_REVIEWERROR', 500, true);
  }
}
export class PUBPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_LOADERROR', 500, true);
  }
}
export class PUBReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_EXPORTERROR', 500, true);
  }
}
export class PUBReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_IMPORTERROR', 500, true);
  }
}
export class PUBReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_TIMEOUTERROR', 504, true);
  }
}
export class PUBReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_DUPLICATEERROR', 409, true);
  }
}
export class PUBReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_DRAFTERROR', 500, true);
  }
}
export class PUBReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_PUBLISHERROR', 500, true);
  }
}
export class PUBReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_ARCHIVEERROR', 500, true);
  }
}
export class PUBReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_REVOKEERROR', 500, true);
  }
}
export class PUBReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_SHAREERROR', 500, true);
  }
}
export class PUBReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_BATCHERROR', 500, true);
  }
}
export class PUBReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_REVIEWERROR', 500, true);
  }
}
export class PUBReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_LOADERROR', 500, true);
  }
}
export class PUBTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_EXPORTERROR', 500, true);
  }
}
export class PUBTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_IMPORTERROR', 500, true);
  }
}
export class PUBTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_TIMEOUTERROR', 504, true);
  }
}
export class PUBTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_DUPLICATEERROR', 409, true);
  }
}
export class PUBTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_DRAFTERROR', 500, true);
  }
}
export class PUBTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_PUBLISHERROR', 500, true);
  }
}
export class PUBTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_ARCHIVEERROR', 500, true);
  }
}
export class PUBTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_REVOKEERROR', 500, true);
  }
}
export class PUBTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_SHAREERROR', 500, true);
  }
}
export class PUBTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_BATCHERROR', 500, true);
  }
}
export class PUBTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_REVIEWERROR', 500, true);
  }
}
export class PUBTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_LOADERROR', 500, true);
  }
}
export class PUBScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_EXPORTERROR', 500, true);
  }
}
export class PUBScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_IMPORTERROR', 500, true);
  }
}
export class PUBScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class PUBScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class PUBScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_DRAFTERROR', 500, true);
  }
}
export class PUBSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_PUBLISHERROR', 500, true);
  }
}
export class PUBScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class PUBScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_REVOKEERROR', 500, true);
  }
}
export class PUBScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_SHAREERROR', 500, true);
  }
}
export class PUBScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_BATCHERROR', 500, true);
  }
}
export class PUBScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_REVIEWERROR', 500, true);
  }
}
export class PUBScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_LOADERROR', 500, true);
  }
}
export class PUBArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_EXPORTERROR', 500, true);
  }
}
export class PUBArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_IMPORTERROR', 500, true);
  }
}
export class PUBArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_TIMEOUTERROR', 504, true);
  }
}
export class PUBArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_DUPLICATEERROR', 409, true);
  }
}
export class PUBArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_DRAFTERROR', 500, true);
  }
}
export class PUBArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_PUBLISHERROR', 500, true);
  }
}
export class PUBArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_ARCHIVEERROR', 500, true);
  }
}
export class PUBArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_REVOKEERROR', 500, true);
  }
}
export class PUBArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_SHAREERROR', 500, true);
  }
}
export class PUBArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_BATCHERROR', 500, true);
  }
}
export class PUBArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_REVIEWERROR', 500, true);
  }
}
export class PUBArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_LOADERROR', 500, true);
  }
}
export class PUBWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_EXPORTERROR', 500, true);
  }
}
export class PUBWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_IMPORTERROR', 500, true);
  }
}
export class PUBWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class PUBWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class PUBWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_DRAFTERROR', 500, true);
  }
}
export class PUBWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_PUBLISHERROR', 500, true);
  }
}
export class PUBWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class PUBWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_REVOKEERROR', 500, true);
  }
}
export class PUBWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_SHAREERROR', 500, true);
  }
}
export class PUBWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_BATCHERROR', 500, true);
  }
}
export class PUBWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_REVIEWERROR', 500, true);
  }
}
export class PUBWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_LOADERROR', 500, true);
  }
}
export class PUBBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_EXPORTERROR', 500, true);
  }
}
export class PUBBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_IMPORTERROR', 500, true);
  }
}
export class PUBBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_TIMEOUTERROR', 504, true);
  }
}
export class PUBBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_DUPLICATEERROR', 409, true);
  }
}
export class PUBBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_DRAFTERROR', 500, true);
  }
}
export class PUBBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_PUBLISHERROR', 500, true);
  }
}
export class PUBBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_ARCHIVEERROR', 500, true);
  }
}
export class PUBBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_REVOKEERROR', 500, true);
  }
}
export class PUBBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_SHAREERROR', 500, true);
  }
}
export class PUBBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_BATCHERROR', 500, true);
  }
}
export class PUBBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_REVIEWERROR', 500, true);
  }
}
export class PUBBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_LOADERROR', 500, true);
  }
}
export class PUBVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_EXPORTERROR', 500, true);
  }
}
export class PUBVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_IMPORTERROR', 500, true);
  }
}
export class PUBVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_TIMEOUTERROR', 504, true);
  }
}
export class PUBVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_DUPLICATEERROR', 409, true);
  }
}
export class PUBVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_DRAFTERROR', 500, true);
  }
}
export class PUBVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_PUBLISHERROR', 500, true);
  }
}
export class PUBVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_ARCHIVEERROR', 500, true);
  }
}
export class PUBVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_REVOKEERROR', 500, true);
  }
}
export class PUBVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_SHAREERROR', 500, true);
  }
}
export class PUBVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_BATCHERROR', 500, true);
  }
}
export class PUBVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_REVIEWERROR', 500, true);
  }
}
export class PUBVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_LOADERROR', 500, true);
  }
}
export class PUBTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_EXPORTERROR', 500, true);
  }
}
export class PUBTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_IMPORTERROR', 500, true);
  }
}
export class PUBTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_TIMEOUTERROR', 504, true);
  }
}
export class PUBTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_DUPLICATEERROR', 409, true);
  }
}
export class PUBTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_DRAFTERROR', 500, true);
  }
}
export class PUBTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_PUBLISHERROR', 500, true);
  }
}
export class PUBTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_ARCHIVEERROR', 500, true);
  }
}
export class PUBTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_REVOKEERROR', 500, true);
  }
}
export class PUBTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_SHAREERROR', 500, true);
  }
}
export class PUBTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_BATCHERROR', 500, true);
  }
}
export class PUBTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_REVIEWERROR', 500, true);
  }
}
export class PUBTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_LOADERROR', 500, true);
  }
}
export class PUBCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_EXPORTERROR', 500, true);
  }
}
export class PUBCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_IMPORTERROR', 500, true);
  }
}
export class PUBCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_TIMEOUTERROR', 504, true);
  }
}
export class PUBCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_DUPLICATEERROR', 409, true);
  }
}
export class PUBCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_DRAFTERROR', 500, true);
  }
}
export class PUBCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_PUBLISHERROR', 500, true);
  }
}
export class PUBCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_ARCHIVEERROR', 500, true);
  }
}
export class PUBCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_REVOKEERROR', 500, true);
  }
}
export class PUBCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_SHAREERROR', 500, true);
  }
}
export class PUBCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_BATCHERROR', 500, true);
  }
}
export class PUBCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_REVIEWERROR', 500, true);
  }
}
export class PUBCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_LOADERROR', 500, true);
  }
}
export class PUBCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_EXPORTERROR', 500, true);
  }
}
export class PUBCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_IMPORTERROR', 500, true);
  }
}
export class PUBCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_TIMEOUTERROR', 504, true);
  }
}
export class PUBCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_DUPLICATEERROR', 409, true);
  }
}
export class PUBCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_DRAFTERROR', 500, true);
  }
}
export class PUBCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_PUBLISHERROR', 500, true);
  }
}
export class PUBCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_ARCHIVEERROR', 500, true);
  }
}
export class PUBCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_REVOKEERROR', 500, true);
  }
}
export class PUBCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_SHAREERROR', 500, true);
  }
}
export class PUBCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_BATCHERROR', 500, true);
  }
}
export class PUBCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_REVIEWERROR', 500, true);
  }
}
export class PUBCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_LOADERROR', 500, true);
  }
}
export class PUBAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_EXPORTERROR', 500, true);
  }
}
export class PUBAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_IMPORTERROR', 500, true);
  }
}
export class PUBAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class PUBAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class PUBAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_DRAFTERROR', 500, true);
  }
}
export class PUBAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_PUBLISHERROR', 500, true);
  }
}
export class PUBAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class PUBAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_REVOKEERROR', 500, true);
  }
}
export class PUBAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_SHAREERROR', 500, true);
  }
}
export class PUBAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_BATCHERROR', 500, true);
  }
}
export class PUBAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_REVIEWERROR', 500, true);
  }
}
export class PUBAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_LOADERROR', 500, true);
  }
}
export class PUBApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_EXPORTERROR', 500, true);
  }
}
export class PUBApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_IMPORTERROR', 500, true);
  }
}
export class PUBApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_TIMEOUTERROR', 504, true);
  }
}
export class PUBApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_DUPLICATEERROR', 409, true);
  }
}
export class PUBApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_DRAFTERROR', 500, true);
  }
}
export class PUBApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_PUBLISHERROR', 500, true);
  }
}
export class PUBApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_ARCHIVEERROR', 500, true);
  }
}
export class PUBApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_REVOKEERROR', 500, true);
  }
}
export class PUBApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_SHAREERROR', 500, true);
  }
}
export class PUBApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_BATCHERROR', 500, true);
  }
}
export class PUBApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_REVIEWERROR', 500, true);
  }
}
export class PUBApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PUBReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_LOADERROR', 500, true);
  }
}
export class PUBReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_EXPORTERROR', 500, true);
  }
}
export class PUBReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_IMPORTERROR', 500, true);
  }
}
export class PUBReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_TIMEOUTERROR', 504, true);
  }
}
export class PUBReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_DUPLICATEERROR', 409, true);
  }
}
export class PUBReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_DRAFTERROR', 500, true);
  }
}
export class PUBReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_PUBLISHERROR', 500, true);
  }
}
export class PUBReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_ARCHIVEERROR', 500, true);
  }
}
export class PUBReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_REVOKEERROR', 500, true);
  }
}
export class PUBReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_SHAREERROR', 500, true);
  }
}
export class PUBReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_BATCHERROR', 500, true);
  }
}
export class PUBReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PUBReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PUBReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_REVIEWERROR', 500, true);
  }
}
export class PUBReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PUBReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PUB_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_LOADERROR', 500, true);
  }
}
export class ANLPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_EXPORTERROR', 500, true);
  }
}
export class ANLPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_IMPORTERROR', 500, true);
  }
}
export class ANLPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_TIMEOUTERROR', 504, true);
  }
}
export class ANLPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_DUPLICATEERROR', 409, true);
  }
}
export class ANLPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_DRAFTERROR', 500, true);
  }
}
export class ANLPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_PUBLISHERROR', 500, true);
  }
}
export class ANLPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_ARCHIVEERROR', 500, true);
  }
}
export class ANLPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_REVOKEERROR', 500, true);
  }
}
export class ANLPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_SHAREERROR', 500, true);
  }
}
export class ANLPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_BATCHERROR', 500, true);
  }
}
export class ANLPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_REVIEWERROR', 500, true);
  }
}
export class ANLPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_LOADERROR', 500, true);
  }
}
export class ANLReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_EXPORTERROR', 500, true);
  }
}
export class ANLReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_IMPORTERROR', 500, true);
  }
}
export class ANLReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_TIMEOUTERROR', 504, true);
  }
}
export class ANLReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_DUPLICATEERROR', 409, true);
  }
}
export class ANLReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_DRAFTERROR', 500, true);
  }
}
export class ANLReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_PUBLISHERROR', 500, true);
  }
}
export class ANLReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_ARCHIVEERROR', 500, true);
  }
}
export class ANLReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_REVOKEERROR', 500, true);
  }
}
export class ANLReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_SHAREERROR', 500, true);
  }
}
export class ANLReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_BATCHERROR', 500, true);
  }
}
export class ANLReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_REVIEWERROR', 500, true);
  }
}
export class ANLReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_LOADERROR', 500, true);
  }
}
export class ANLTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_EXPORTERROR', 500, true);
  }
}
export class ANLTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_IMPORTERROR', 500, true);
  }
}
export class ANLTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_TIMEOUTERROR', 504, true);
  }
}
export class ANLTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_DUPLICATEERROR', 409, true);
  }
}
export class ANLTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_DRAFTERROR', 500, true);
  }
}
export class ANLTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_PUBLISHERROR', 500, true);
  }
}
export class ANLTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_ARCHIVEERROR', 500, true);
  }
}
export class ANLTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_REVOKEERROR', 500, true);
  }
}
export class ANLTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_SHAREERROR', 500, true);
  }
}
export class ANLTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_BATCHERROR', 500, true);
  }
}
export class ANLTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_REVIEWERROR', 500, true);
  }
}
export class ANLTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_LOADERROR', 500, true);
  }
}
export class ANLScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_EXPORTERROR', 500, true);
  }
}
export class ANLScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_IMPORTERROR', 500, true);
  }
}
export class ANLScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class ANLScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class ANLScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_DRAFTERROR', 500, true);
  }
}
export class ANLSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_PUBLISHERROR', 500, true);
  }
}
export class ANLScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class ANLScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_REVOKEERROR', 500, true);
  }
}
export class ANLScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_SHAREERROR', 500, true);
  }
}
export class ANLScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_BATCHERROR', 500, true);
  }
}
export class ANLScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_REVIEWERROR', 500, true);
  }
}
export class ANLScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_LOADERROR', 500, true);
  }
}
export class ANLArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_EXPORTERROR', 500, true);
  }
}
export class ANLArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_IMPORTERROR', 500, true);
  }
}
export class ANLArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_TIMEOUTERROR', 504, true);
  }
}
export class ANLArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_DUPLICATEERROR', 409, true);
  }
}
export class ANLArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_DRAFTERROR', 500, true);
  }
}
export class ANLArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_PUBLISHERROR', 500, true);
  }
}
export class ANLArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_ARCHIVEERROR', 500, true);
  }
}
export class ANLArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_REVOKEERROR', 500, true);
  }
}
export class ANLArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_SHAREERROR', 500, true);
  }
}
export class ANLArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_BATCHERROR', 500, true);
  }
}
export class ANLArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_REVIEWERROR', 500, true);
  }
}
export class ANLArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_LOADERROR', 500, true);
  }
}
export class ANLWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_EXPORTERROR', 500, true);
  }
}
export class ANLWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_IMPORTERROR', 500, true);
  }
}
export class ANLWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class ANLWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class ANLWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_DRAFTERROR', 500, true);
  }
}
export class ANLWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_PUBLISHERROR', 500, true);
  }
}
export class ANLWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class ANLWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_REVOKEERROR', 500, true);
  }
}
export class ANLWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_SHAREERROR', 500, true);
  }
}
export class ANLWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_BATCHERROR', 500, true);
  }
}
export class ANLWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_REVIEWERROR', 500, true);
  }
}
export class ANLWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_LOADERROR', 500, true);
  }
}
export class ANLBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_EXPORTERROR', 500, true);
  }
}
export class ANLBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_IMPORTERROR', 500, true);
  }
}
export class ANLBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_TIMEOUTERROR', 504, true);
  }
}
export class ANLBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_DUPLICATEERROR', 409, true);
  }
}
export class ANLBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_DRAFTERROR', 500, true);
  }
}
export class ANLBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_PUBLISHERROR', 500, true);
  }
}
export class ANLBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_ARCHIVEERROR', 500, true);
  }
}
export class ANLBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_REVOKEERROR', 500, true);
  }
}
export class ANLBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_SHAREERROR', 500, true);
  }
}
export class ANLBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_BATCHERROR', 500, true);
  }
}
export class ANLBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_REVIEWERROR', 500, true);
  }
}
export class ANLBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_LOADERROR', 500, true);
  }
}
export class ANLVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_EXPORTERROR', 500, true);
  }
}
export class ANLVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_IMPORTERROR', 500, true);
  }
}
export class ANLVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_TIMEOUTERROR', 504, true);
  }
}
export class ANLVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_DUPLICATEERROR', 409, true);
  }
}
export class ANLVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_DRAFTERROR', 500, true);
  }
}
export class ANLVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_PUBLISHERROR', 500, true);
  }
}
export class ANLVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_ARCHIVEERROR', 500, true);
  }
}
export class ANLVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_REVOKEERROR', 500, true);
  }
}
export class ANLVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_SHAREERROR', 500, true);
  }
}
export class ANLVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_BATCHERROR', 500, true);
  }
}
export class ANLVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_REVIEWERROR', 500, true);
  }
}
export class ANLVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_LOADERROR', 500, true);
  }
}
export class ANLTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_EXPORTERROR', 500, true);
  }
}
export class ANLTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_IMPORTERROR', 500, true);
  }
}
export class ANLTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_TIMEOUTERROR', 504, true);
  }
}
export class ANLTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_DUPLICATEERROR', 409, true);
  }
}
export class ANLTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_DRAFTERROR', 500, true);
  }
}
export class ANLTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_PUBLISHERROR', 500, true);
  }
}
export class ANLTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_ARCHIVEERROR', 500, true);
  }
}
export class ANLTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_REVOKEERROR', 500, true);
  }
}
export class ANLTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_SHAREERROR', 500, true);
  }
}
export class ANLTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_BATCHERROR', 500, true);
  }
}
export class ANLTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_REVIEWERROR', 500, true);
  }
}
export class ANLTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_LOADERROR', 500, true);
  }
}
export class ANLCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_EXPORTERROR', 500, true);
  }
}
export class ANLCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_IMPORTERROR', 500, true);
  }
}
export class ANLCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_TIMEOUTERROR', 504, true);
  }
}
export class ANLCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_DUPLICATEERROR', 409, true);
  }
}
export class ANLCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_DRAFTERROR', 500, true);
  }
}
export class ANLCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_PUBLISHERROR', 500, true);
  }
}
export class ANLCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_ARCHIVEERROR', 500, true);
  }
}
export class ANLCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_REVOKEERROR', 500, true);
  }
}
export class ANLCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_SHAREERROR', 500, true);
  }
}
export class ANLCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_BATCHERROR', 500, true);
  }
}
export class ANLCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_REVIEWERROR', 500, true);
  }
}
export class ANLCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_LOADERROR', 500, true);
  }
}
export class ANLCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_EXPORTERROR', 500, true);
  }
}
export class ANLCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_IMPORTERROR', 500, true);
  }
}
export class ANLCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_TIMEOUTERROR', 504, true);
  }
}
export class ANLCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_DUPLICATEERROR', 409, true);
  }
}
export class ANLCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_DRAFTERROR', 500, true);
  }
}
export class ANLCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_PUBLISHERROR', 500, true);
  }
}
export class ANLCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_ARCHIVEERROR', 500, true);
  }
}
export class ANLCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_REVOKEERROR', 500, true);
  }
}
export class ANLCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_SHAREERROR', 500, true);
  }
}
export class ANLCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_BATCHERROR', 500, true);
  }
}
export class ANLCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_REVIEWERROR', 500, true);
  }
}
export class ANLCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_LOADERROR', 500, true);
  }
}
export class ANLAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_EXPORTERROR', 500, true);
  }
}
export class ANLAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_IMPORTERROR', 500, true);
  }
}
export class ANLAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class ANLAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class ANLAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_DRAFTERROR', 500, true);
  }
}
export class ANLAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_PUBLISHERROR', 500, true);
  }
}
export class ANLAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class ANLAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_REVOKEERROR', 500, true);
  }
}
export class ANLAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_SHAREERROR', 500, true);
  }
}
export class ANLAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_BATCHERROR', 500, true);
  }
}
export class ANLAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_REVIEWERROR', 500, true);
  }
}
export class ANLAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_LOADERROR', 500, true);
  }
}
export class ANLApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_EXPORTERROR', 500, true);
  }
}
export class ANLApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_IMPORTERROR', 500, true);
  }
}
export class ANLApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_TIMEOUTERROR', 504, true);
  }
}
export class ANLApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_DUPLICATEERROR', 409, true);
  }
}
export class ANLApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_DRAFTERROR', 500, true);
  }
}
export class ANLApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_PUBLISHERROR', 500, true);
  }
}
export class ANLApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_ARCHIVEERROR', 500, true);
  }
}
export class ANLApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_REVOKEERROR', 500, true);
  }
}
export class ANLApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_SHAREERROR', 500, true);
  }
}
export class ANLApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_BATCHERROR', 500, true);
  }
}
export class ANLApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_REVIEWERROR', 500, true);
  }
}
export class ANLApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ANLReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_LOADERROR', 500, true);
  }
}
export class ANLReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_EXPORTERROR', 500, true);
  }
}
export class ANLReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_IMPORTERROR', 500, true);
  }
}
export class ANLReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_TIMEOUTERROR', 504, true);
  }
}
export class ANLReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_DUPLICATEERROR', 409, true);
  }
}
export class ANLReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_DRAFTERROR', 500, true);
  }
}
export class ANLReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_PUBLISHERROR', 500, true);
  }
}
export class ANLReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_ARCHIVEERROR', 500, true);
  }
}
export class ANLReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_REVOKEERROR', 500, true);
  }
}
export class ANLReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_SHAREERROR', 500, true);
  }
}
export class ANLReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_BATCHERROR', 500, true);
  }
}
export class ANLReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ANLReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ANLReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_REVIEWERROR', 500, true);
  }
}
export class ANLReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ANLReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ANL_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_LOADERROR', 500, true);
  }
}
export class IDTPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_EXPORTERROR', 500, true);
  }
}
export class IDTPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_IMPORTERROR', 500, true);
  }
}
export class IDTPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_TIMEOUTERROR', 504, true);
  }
}
export class IDTPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_DUPLICATEERROR', 409, true);
  }
}
export class IDTPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_DRAFTERROR', 500, true);
  }
}
export class IDTPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_PUBLISHERROR', 500, true);
  }
}
export class IDTPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_ARCHIVEERROR', 500, true);
  }
}
export class IDTPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_REVOKEERROR', 500, true);
  }
}
export class IDTPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_SHAREERROR', 500, true);
  }
}
export class IDTPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_BATCHERROR', 500, true);
  }
}
export class IDTPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_REVIEWERROR', 500, true);
  }
}
export class IDTPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_LOADERROR', 500, true);
  }
}
export class IDTReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_EXPORTERROR', 500, true);
  }
}
export class IDTReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_IMPORTERROR', 500, true);
  }
}
export class IDTReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_TIMEOUTERROR', 504, true);
  }
}
export class IDTReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_DUPLICATEERROR', 409, true);
  }
}
export class IDTReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_DRAFTERROR', 500, true);
  }
}
export class IDTReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_PUBLISHERROR', 500, true);
  }
}
export class IDTReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_ARCHIVEERROR', 500, true);
  }
}
export class IDTReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_REVOKEERROR', 500, true);
  }
}
export class IDTReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_SHAREERROR', 500, true);
  }
}
export class IDTReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_BATCHERROR', 500, true);
  }
}
export class IDTReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_REVIEWERROR', 500, true);
  }
}
export class IDTReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_LOADERROR', 500, true);
  }
}
export class IDTTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_EXPORTERROR', 500, true);
  }
}
export class IDTTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_IMPORTERROR', 500, true);
  }
}
export class IDTTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_TIMEOUTERROR', 504, true);
  }
}
export class IDTTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_DUPLICATEERROR', 409, true);
  }
}
export class IDTTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_DRAFTERROR', 500, true);
  }
}
export class IDTTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_PUBLISHERROR', 500, true);
  }
}
export class IDTTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_ARCHIVEERROR', 500, true);
  }
}
export class IDTTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_REVOKEERROR', 500, true);
  }
}
export class IDTTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_SHAREERROR', 500, true);
  }
}
export class IDTTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_BATCHERROR', 500, true);
  }
}
export class IDTTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_REVIEWERROR', 500, true);
  }
}
export class IDTTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_LOADERROR', 500, true);
  }
}
export class IDTScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_EXPORTERROR', 500, true);
  }
}
export class IDTScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_IMPORTERROR', 500, true);
  }
}
export class IDTScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class IDTScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class IDTScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_DRAFTERROR', 500, true);
  }
}
export class IDTSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_PUBLISHERROR', 500, true);
  }
}
export class IDTScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class IDTScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_REVOKEERROR', 500, true);
  }
}
export class IDTScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_SHAREERROR', 500, true);
  }
}
export class IDTScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_BATCHERROR', 500, true);
  }
}
export class IDTScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_REVIEWERROR', 500, true);
  }
}
export class IDTScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_LOADERROR', 500, true);
  }
}
export class IDTArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_EXPORTERROR', 500, true);
  }
}
export class IDTArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_IMPORTERROR', 500, true);
  }
}
export class IDTArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_TIMEOUTERROR', 504, true);
  }
}
export class IDTArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_DUPLICATEERROR', 409, true);
  }
}
export class IDTArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_DRAFTERROR', 500, true);
  }
}
export class IDTArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_PUBLISHERROR', 500, true);
  }
}
export class IDTArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_ARCHIVEERROR', 500, true);
  }
}
export class IDTArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_REVOKEERROR', 500, true);
  }
}
export class IDTArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_SHAREERROR', 500, true);
  }
}
export class IDTArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_BATCHERROR', 500, true);
  }
}
export class IDTArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_REVIEWERROR', 500, true);
  }
}
export class IDTArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_LOADERROR', 500, true);
  }
}
export class IDTWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_EXPORTERROR', 500, true);
  }
}
export class IDTWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_IMPORTERROR', 500, true);
  }
}
export class IDTWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class IDTWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class IDTWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_DRAFTERROR', 500, true);
  }
}
export class IDTWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_PUBLISHERROR', 500, true);
  }
}
export class IDTWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class IDTWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_REVOKEERROR', 500, true);
  }
}
export class IDTWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_SHAREERROR', 500, true);
  }
}
export class IDTWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_BATCHERROR', 500, true);
  }
}
export class IDTWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_REVIEWERROR', 500, true);
  }
}
export class IDTWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_LOADERROR', 500, true);
  }
}
export class IDTBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_EXPORTERROR', 500, true);
  }
}
export class IDTBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_IMPORTERROR', 500, true);
  }
}
export class IDTBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_TIMEOUTERROR', 504, true);
  }
}
export class IDTBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_DUPLICATEERROR', 409, true);
  }
}
export class IDTBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_DRAFTERROR', 500, true);
  }
}
export class IDTBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_PUBLISHERROR', 500, true);
  }
}
export class IDTBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_ARCHIVEERROR', 500, true);
  }
}
export class IDTBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_REVOKEERROR', 500, true);
  }
}
export class IDTBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_SHAREERROR', 500, true);
  }
}
export class IDTBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_BATCHERROR', 500, true);
  }
}
export class IDTBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_REVIEWERROR', 500, true);
  }
}
export class IDTBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_LOADERROR', 500, true);
  }
}
export class IDTVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_EXPORTERROR', 500, true);
  }
}
export class IDTVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_IMPORTERROR', 500, true);
  }
}
export class IDTVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_TIMEOUTERROR', 504, true);
  }
}
export class IDTVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_DUPLICATEERROR', 409, true);
  }
}
export class IDTVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_DRAFTERROR', 500, true);
  }
}
export class IDTVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_PUBLISHERROR', 500, true);
  }
}
export class IDTVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_ARCHIVEERROR', 500, true);
  }
}
export class IDTVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_REVOKEERROR', 500, true);
  }
}
export class IDTVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_SHAREERROR', 500, true);
  }
}
export class IDTVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_BATCHERROR', 500, true);
  }
}
export class IDTVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_REVIEWERROR', 500, true);
  }
}
export class IDTVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_LOADERROR', 500, true);
  }
}
export class IDTTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_EXPORTERROR', 500, true);
  }
}
export class IDTTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_IMPORTERROR', 500, true);
  }
}
export class IDTTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_TIMEOUTERROR', 504, true);
  }
}
export class IDTTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_DUPLICATEERROR', 409, true);
  }
}
export class IDTTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_DRAFTERROR', 500, true);
  }
}
export class IDTTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_PUBLISHERROR', 500, true);
  }
}
export class IDTTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_ARCHIVEERROR', 500, true);
  }
}
export class IDTTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_REVOKEERROR', 500, true);
  }
}
export class IDTTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_SHAREERROR', 500, true);
  }
}
export class IDTTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_BATCHERROR', 500, true);
  }
}
export class IDTTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_REVIEWERROR', 500, true);
  }
}
export class IDTTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_LOADERROR', 500, true);
  }
}
export class IDTCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_EXPORTERROR', 500, true);
  }
}
export class IDTCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_IMPORTERROR', 500, true);
  }
}
export class IDTCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_TIMEOUTERROR', 504, true);
  }
}
export class IDTCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_DUPLICATEERROR', 409, true);
  }
}
export class IDTCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_DRAFTERROR', 500, true);
  }
}
export class IDTCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_PUBLISHERROR', 500, true);
  }
}
export class IDTCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_ARCHIVEERROR', 500, true);
  }
}
export class IDTCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_REVOKEERROR', 500, true);
  }
}
export class IDTCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_SHAREERROR', 500, true);
  }
}
export class IDTCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_BATCHERROR', 500, true);
  }
}
export class IDTCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_REVIEWERROR', 500, true);
  }
}
export class IDTCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_LOADERROR', 500, true);
  }
}
export class IDTCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_EXPORTERROR', 500, true);
  }
}
export class IDTCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_IMPORTERROR', 500, true);
  }
}
export class IDTCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_TIMEOUTERROR', 504, true);
  }
}
export class IDTCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_DUPLICATEERROR', 409, true);
  }
}
export class IDTCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_DRAFTERROR', 500, true);
  }
}
export class IDTCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_PUBLISHERROR', 500, true);
  }
}
export class IDTCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_ARCHIVEERROR', 500, true);
  }
}
export class IDTCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_REVOKEERROR', 500, true);
  }
}
export class IDTCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_SHAREERROR', 500, true);
  }
}
export class IDTCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_BATCHERROR', 500, true);
  }
}
export class IDTCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_REVIEWERROR', 500, true);
  }
}
export class IDTCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_LOADERROR', 500, true);
  }
}
export class IDTAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_EXPORTERROR', 500, true);
  }
}
export class IDTAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_IMPORTERROR', 500, true);
  }
}
export class IDTAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class IDTAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class IDTAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_DRAFTERROR', 500, true);
  }
}
export class IDTAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_PUBLISHERROR', 500, true);
  }
}
export class IDTAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class IDTAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_REVOKEERROR', 500, true);
  }
}
export class IDTAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_SHAREERROR', 500, true);
  }
}
export class IDTAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_BATCHERROR', 500, true);
  }
}
export class IDTAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_REVIEWERROR', 500, true);
  }
}
export class IDTAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_LOADERROR', 500, true);
  }
}
export class IDTApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_EXPORTERROR', 500, true);
  }
}
export class IDTApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_IMPORTERROR', 500, true);
  }
}
export class IDTApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_TIMEOUTERROR', 504, true);
  }
}
export class IDTApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_DUPLICATEERROR', 409, true);
  }
}
export class IDTApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_DRAFTERROR', 500, true);
  }
}
export class IDTApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_PUBLISHERROR', 500, true);
  }
}
export class IDTApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_ARCHIVEERROR', 500, true);
  }
}
export class IDTApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_REVOKEERROR', 500, true);
  }
}
export class IDTApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_SHAREERROR', 500, true);
  }
}
export class IDTApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_BATCHERROR', 500, true);
  }
}
export class IDTApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_REVIEWERROR', 500, true);
  }
}
export class IDTApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class IDTReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_LOADERROR', 500, true);
  }
}
export class IDTReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_EXPORTERROR', 500, true);
  }
}
export class IDTReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_IMPORTERROR', 500, true);
  }
}
export class IDTReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_TIMEOUTERROR', 504, true);
  }
}
export class IDTReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_DUPLICATEERROR', 409, true);
  }
}
export class IDTReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_DRAFTERROR', 500, true);
  }
}
export class IDTReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_PUBLISHERROR', 500, true);
  }
}
export class IDTReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_ARCHIVEERROR', 500, true);
  }
}
export class IDTReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_REVOKEERROR', 500, true);
  }
}
export class IDTReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_SHAREERROR', 500, true);
  }
}
export class IDTReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_BATCHERROR', 500, true);
  }
}
export class IDTReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class IDTReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class IDTReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_REVIEWERROR', 500, true);
  }
}
export class IDTReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class IDTReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_IDT_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_LOADERROR', 500, true);
  }
}
export class PRTPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_EXPORTERROR', 500, true);
  }
}
export class PRTPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_IMPORTERROR', 500, true);
  }
}
export class PRTPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_TIMEOUTERROR', 504, true);
  }
}
export class PRTPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_DUPLICATEERROR', 409, true);
  }
}
export class PRTPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_DRAFTERROR', 500, true);
  }
}
export class PRTPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_PUBLISHERROR', 500, true);
  }
}
export class PRTPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_ARCHIVEERROR', 500, true);
  }
}
export class PRTPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_REVOKEERROR', 500, true);
  }
}
export class PRTPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_SHAREERROR', 500, true);
  }
}
export class PRTPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_BATCHERROR', 500, true);
  }
}
export class PRTPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_REVIEWERROR', 500, true);
  }
}
export class PRTPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_LOADERROR', 500, true);
  }
}
export class PRTReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_EXPORTERROR', 500, true);
  }
}
export class PRTReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_IMPORTERROR', 500, true);
  }
}
export class PRTReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_TIMEOUTERROR', 504, true);
  }
}
export class PRTReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_DUPLICATEERROR', 409, true);
  }
}
export class PRTReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_DRAFTERROR', 500, true);
  }
}
export class PRTReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_PUBLISHERROR', 500, true);
  }
}
export class PRTReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_ARCHIVEERROR', 500, true);
  }
}
export class PRTReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_REVOKEERROR', 500, true);
  }
}
export class PRTReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_SHAREERROR', 500, true);
  }
}
export class PRTReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_BATCHERROR', 500, true);
  }
}
export class PRTReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_REVIEWERROR', 500, true);
  }
}
export class PRTReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_LOADERROR', 500, true);
  }
}
export class PRTTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_EXPORTERROR', 500, true);
  }
}
export class PRTTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_IMPORTERROR', 500, true);
  }
}
export class PRTTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_TIMEOUTERROR', 504, true);
  }
}
export class PRTTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_DUPLICATEERROR', 409, true);
  }
}
export class PRTTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_DRAFTERROR', 500, true);
  }
}
export class PRTTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_PUBLISHERROR', 500, true);
  }
}
export class PRTTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_ARCHIVEERROR', 500, true);
  }
}
export class PRTTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_REVOKEERROR', 500, true);
  }
}
export class PRTTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_SHAREERROR', 500, true);
  }
}
export class PRTTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_BATCHERROR', 500, true);
  }
}
export class PRTTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_REVIEWERROR', 500, true);
  }
}
export class PRTTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_LOADERROR', 500, true);
  }
}
export class PRTScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_EXPORTERROR', 500, true);
  }
}
export class PRTScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_IMPORTERROR', 500, true);
  }
}
export class PRTScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class PRTScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class PRTScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_DRAFTERROR', 500, true);
  }
}
export class PRTSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_PUBLISHERROR', 500, true);
  }
}
export class PRTScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class PRTScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_REVOKEERROR', 500, true);
  }
}
export class PRTScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_SHAREERROR', 500, true);
  }
}
export class PRTScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_BATCHERROR', 500, true);
  }
}
export class PRTScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_REVIEWERROR', 500, true);
  }
}
export class PRTScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_LOADERROR', 500, true);
  }
}
export class PRTArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_EXPORTERROR', 500, true);
  }
}
export class PRTArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_IMPORTERROR', 500, true);
  }
}
export class PRTArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_TIMEOUTERROR', 504, true);
  }
}
export class PRTArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_DUPLICATEERROR', 409, true);
  }
}
export class PRTArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_DRAFTERROR', 500, true);
  }
}
export class PRTArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_PUBLISHERROR', 500, true);
  }
}
export class PRTArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_ARCHIVEERROR', 500, true);
  }
}
export class PRTArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_REVOKEERROR', 500, true);
  }
}
export class PRTArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_SHAREERROR', 500, true);
  }
}
export class PRTArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_BATCHERROR', 500, true);
  }
}
export class PRTArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_REVIEWERROR', 500, true);
  }
}
export class PRTArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_LOADERROR', 500, true);
  }
}
export class PRTWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_EXPORTERROR', 500, true);
  }
}
export class PRTWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_IMPORTERROR', 500, true);
  }
}
export class PRTWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class PRTWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class PRTWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_DRAFTERROR', 500, true);
  }
}
export class PRTWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_PUBLISHERROR', 500, true);
  }
}
export class PRTWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class PRTWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_REVOKEERROR', 500, true);
  }
}
export class PRTWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_SHAREERROR', 500, true);
  }
}
export class PRTWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_BATCHERROR', 500, true);
  }
}
export class PRTWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_REVIEWERROR', 500, true);
  }
}
export class PRTWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_LOADERROR', 500, true);
  }
}
export class PRTBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_EXPORTERROR', 500, true);
  }
}
export class PRTBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_IMPORTERROR', 500, true);
  }
}
export class PRTBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_TIMEOUTERROR', 504, true);
  }
}
export class PRTBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_DUPLICATEERROR', 409, true);
  }
}
export class PRTBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_DRAFTERROR', 500, true);
  }
}
export class PRTBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_PUBLISHERROR', 500, true);
  }
}
export class PRTBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_ARCHIVEERROR', 500, true);
  }
}
export class PRTBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_REVOKEERROR', 500, true);
  }
}
export class PRTBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_SHAREERROR', 500, true);
  }
}
export class PRTBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_BATCHERROR', 500, true);
  }
}
export class PRTBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_REVIEWERROR', 500, true);
  }
}
export class PRTBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_LOADERROR', 500, true);
  }
}
export class PRTVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_EXPORTERROR', 500, true);
  }
}
export class PRTVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_IMPORTERROR', 500, true);
  }
}
export class PRTVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_TIMEOUTERROR', 504, true);
  }
}
export class PRTVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_DUPLICATEERROR', 409, true);
  }
}
export class PRTVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_DRAFTERROR', 500, true);
  }
}
export class PRTVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_PUBLISHERROR', 500, true);
  }
}
export class PRTVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_ARCHIVEERROR', 500, true);
  }
}
export class PRTVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_REVOKEERROR', 500, true);
  }
}
export class PRTVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_SHAREERROR', 500, true);
  }
}
export class PRTVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_BATCHERROR', 500, true);
  }
}
export class PRTVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_REVIEWERROR', 500, true);
  }
}
export class PRTVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_LOADERROR', 500, true);
  }
}
export class PRTTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_EXPORTERROR', 500, true);
  }
}
export class PRTTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_IMPORTERROR', 500, true);
  }
}
export class PRTTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_TIMEOUTERROR', 504, true);
  }
}
export class PRTTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_DUPLICATEERROR', 409, true);
  }
}
export class PRTTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_DRAFTERROR', 500, true);
  }
}
export class PRTTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_PUBLISHERROR', 500, true);
  }
}
export class PRTTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_ARCHIVEERROR', 500, true);
  }
}
export class PRTTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_REVOKEERROR', 500, true);
  }
}
export class PRTTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_SHAREERROR', 500, true);
  }
}
export class PRTTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_BATCHERROR', 500, true);
  }
}
export class PRTTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_REVIEWERROR', 500, true);
  }
}
export class PRTTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_LOADERROR', 500, true);
  }
}
export class PRTCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_EXPORTERROR', 500, true);
  }
}
export class PRTCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_IMPORTERROR', 500, true);
  }
}
export class PRTCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_TIMEOUTERROR', 504, true);
  }
}
export class PRTCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_DUPLICATEERROR', 409, true);
  }
}
export class PRTCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_DRAFTERROR', 500, true);
  }
}
export class PRTCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_PUBLISHERROR', 500, true);
  }
}
export class PRTCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_ARCHIVEERROR', 500, true);
  }
}
export class PRTCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_REVOKEERROR', 500, true);
  }
}
export class PRTCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_SHAREERROR', 500, true);
  }
}
export class PRTCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_BATCHERROR', 500, true);
  }
}
export class PRTCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_REVIEWERROR', 500, true);
  }
}
export class PRTCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_LOADERROR', 500, true);
  }
}
export class PRTCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_EXPORTERROR', 500, true);
  }
}
export class PRTCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_IMPORTERROR', 500, true);
  }
}
export class PRTCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_TIMEOUTERROR', 504, true);
  }
}
export class PRTCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_DUPLICATEERROR', 409, true);
  }
}
export class PRTCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_DRAFTERROR', 500, true);
  }
}
export class PRTCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_PUBLISHERROR', 500, true);
  }
}
export class PRTCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_ARCHIVEERROR', 500, true);
  }
}
export class PRTCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_REVOKEERROR', 500, true);
  }
}
export class PRTCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_SHAREERROR', 500, true);
  }
}
export class PRTCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_BATCHERROR', 500, true);
  }
}
export class PRTCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_REVIEWERROR', 500, true);
  }
}
export class PRTCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_LOADERROR', 500, true);
  }
}
export class PRTAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_EXPORTERROR', 500, true);
  }
}
export class PRTAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_IMPORTERROR', 500, true);
  }
}
export class PRTAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class PRTAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class PRTAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_DRAFTERROR', 500, true);
  }
}
export class PRTAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_PUBLISHERROR', 500, true);
  }
}
export class PRTAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class PRTAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_REVOKEERROR', 500, true);
  }
}
export class PRTAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_SHAREERROR', 500, true);
  }
}
export class PRTAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_BATCHERROR', 500, true);
  }
}
export class PRTAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_REVIEWERROR', 500, true);
  }
}
export class PRTAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_LOADERROR', 500, true);
  }
}
export class PRTApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_EXPORTERROR', 500, true);
  }
}
export class PRTApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_IMPORTERROR', 500, true);
  }
}
export class PRTApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_TIMEOUTERROR', 504, true);
  }
}
export class PRTApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_DUPLICATEERROR', 409, true);
  }
}
export class PRTApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_DRAFTERROR', 500, true);
  }
}
export class PRTApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_PUBLISHERROR', 500, true);
  }
}
export class PRTApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_ARCHIVEERROR', 500, true);
  }
}
export class PRTApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_REVOKEERROR', 500, true);
  }
}
export class PRTApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_SHAREERROR', 500, true);
  }
}
export class PRTApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_BATCHERROR', 500, true);
  }
}
export class PRTApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_REVIEWERROR', 500, true);
  }
}
export class PRTApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class PRTReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_LOADERROR', 500, true);
  }
}
export class PRTReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_EXPORTERROR', 500, true);
  }
}
export class PRTReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_IMPORTERROR', 500, true);
  }
}
export class PRTReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_TIMEOUTERROR', 504, true);
  }
}
export class PRTReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_DUPLICATEERROR', 409, true);
  }
}
export class PRTReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_DRAFTERROR', 500, true);
  }
}
export class PRTReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_PUBLISHERROR', 500, true);
  }
}
export class PRTReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_ARCHIVEERROR', 500, true);
  }
}
export class PRTReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_REVOKEERROR', 500, true);
  }
}
export class PRTReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_SHAREERROR', 500, true);
  }
}
export class PRTReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_BATCHERROR', 500, true);
  }
}
export class PRTReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class PRTReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class PRTReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_REVIEWERROR', 500, true);
  }
}
export class PRTReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class PRTReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_PRT_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_LOADERROR', 500, true);
  }
}
export class ODPPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_EXPORTERROR', 500, true);
  }
}
export class ODPPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_IMPORTERROR', 500, true);
  }
}
export class ODPPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_TIMEOUTERROR', 504, true);
  }
}
export class ODPPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_DUPLICATEERROR', 409, true);
  }
}
export class ODPPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_DRAFTERROR', 500, true);
  }
}
export class ODPPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_PUBLISHERROR', 500, true);
  }
}
export class ODPPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_ARCHIVEERROR', 500, true);
  }
}
export class ODPPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_REVOKEERROR', 500, true);
  }
}
export class ODPPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_SHAREERROR', 500, true);
  }
}
export class ODPPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_BATCHERROR', 500, true);
  }
}
export class ODPPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_REVIEWERROR', 500, true);
  }
}
export class ODPPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_LOADERROR', 500, true);
  }
}
export class ODPReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_EXPORTERROR', 500, true);
  }
}
export class ODPReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_IMPORTERROR', 500, true);
  }
}
export class ODPReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_TIMEOUTERROR', 504, true);
  }
}
export class ODPReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_DUPLICATEERROR', 409, true);
  }
}
export class ODPReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_DRAFTERROR', 500, true);
  }
}
export class ODPReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_PUBLISHERROR', 500, true);
  }
}
export class ODPReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_ARCHIVEERROR', 500, true);
  }
}
export class ODPReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_REVOKEERROR', 500, true);
  }
}
export class ODPReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_SHAREERROR', 500, true);
  }
}
export class ODPReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_BATCHERROR', 500, true);
  }
}
export class ODPReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_REVIEWERROR', 500, true);
  }
}
export class ODPReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_LOADERROR', 500, true);
  }
}
export class ODPTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_EXPORTERROR', 500, true);
  }
}
export class ODPTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_IMPORTERROR', 500, true);
  }
}
export class ODPTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_TIMEOUTERROR', 504, true);
  }
}
export class ODPTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_DUPLICATEERROR', 409, true);
  }
}
export class ODPTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_DRAFTERROR', 500, true);
  }
}
export class ODPTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_PUBLISHERROR', 500, true);
  }
}
export class ODPTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_ARCHIVEERROR', 500, true);
  }
}
export class ODPTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_REVOKEERROR', 500, true);
  }
}
export class ODPTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_SHAREERROR', 500, true);
  }
}
export class ODPTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_BATCHERROR', 500, true);
  }
}
export class ODPTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_REVIEWERROR', 500, true);
  }
}
export class ODPTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_LOADERROR', 500, true);
  }
}
export class ODPScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_EXPORTERROR', 500, true);
  }
}
export class ODPScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_IMPORTERROR', 500, true);
  }
}
export class ODPScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class ODPScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class ODPScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_DRAFTERROR', 500, true);
  }
}
export class ODPSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_PUBLISHERROR', 500, true);
  }
}
export class ODPScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class ODPScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_REVOKEERROR', 500, true);
  }
}
export class ODPScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_SHAREERROR', 500, true);
  }
}
export class ODPScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_BATCHERROR', 500, true);
  }
}
export class ODPScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_REVIEWERROR', 500, true);
  }
}
export class ODPScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_LOADERROR', 500, true);
  }
}
export class ODPArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_EXPORTERROR', 500, true);
  }
}
export class ODPArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_IMPORTERROR', 500, true);
  }
}
export class ODPArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_TIMEOUTERROR', 504, true);
  }
}
export class ODPArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_DUPLICATEERROR', 409, true);
  }
}
export class ODPArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_DRAFTERROR', 500, true);
  }
}
export class ODPArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_PUBLISHERROR', 500, true);
  }
}
export class ODPArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_ARCHIVEERROR', 500, true);
  }
}
export class ODPArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_REVOKEERROR', 500, true);
  }
}
export class ODPArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_SHAREERROR', 500, true);
  }
}
export class ODPArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_BATCHERROR', 500, true);
  }
}
export class ODPArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_REVIEWERROR', 500, true);
  }
}
export class ODPArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_LOADERROR', 500, true);
  }
}
export class ODPWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_EXPORTERROR', 500, true);
  }
}
export class ODPWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_IMPORTERROR', 500, true);
  }
}
export class ODPWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class ODPWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class ODPWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_DRAFTERROR', 500, true);
  }
}
export class ODPWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_PUBLISHERROR', 500, true);
  }
}
export class ODPWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class ODPWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_REVOKEERROR', 500, true);
  }
}
export class ODPWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_SHAREERROR', 500, true);
  }
}
export class ODPWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_BATCHERROR', 500, true);
  }
}
export class ODPWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_REVIEWERROR', 500, true);
  }
}
export class ODPWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_LOADERROR', 500, true);
  }
}
export class ODPBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_EXPORTERROR', 500, true);
  }
}
export class ODPBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_IMPORTERROR', 500, true);
  }
}
export class ODPBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_TIMEOUTERROR', 504, true);
  }
}
export class ODPBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_DUPLICATEERROR', 409, true);
  }
}
export class ODPBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_DRAFTERROR', 500, true);
  }
}
export class ODPBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_PUBLISHERROR', 500, true);
  }
}
export class ODPBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_ARCHIVEERROR', 500, true);
  }
}
export class ODPBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_REVOKEERROR', 500, true);
  }
}
export class ODPBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_SHAREERROR', 500, true);
  }
}
export class ODPBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_BATCHERROR', 500, true);
  }
}
export class ODPBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_REVIEWERROR', 500, true);
  }
}
export class ODPBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_LOADERROR', 500, true);
  }
}
export class ODPVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_EXPORTERROR', 500, true);
  }
}
export class ODPVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_IMPORTERROR', 500, true);
  }
}
export class ODPVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_TIMEOUTERROR', 504, true);
  }
}
export class ODPVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_DUPLICATEERROR', 409, true);
  }
}
export class ODPVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_DRAFTERROR', 500, true);
  }
}
export class ODPVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_PUBLISHERROR', 500, true);
  }
}
export class ODPVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_ARCHIVEERROR', 500, true);
  }
}
export class ODPVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_REVOKEERROR', 500, true);
  }
}
export class ODPVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_SHAREERROR', 500, true);
  }
}
export class ODPVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_BATCHERROR', 500, true);
  }
}
export class ODPVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_REVIEWERROR', 500, true);
  }
}
export class ODPVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_LOADERROR', 500, true);
  }
}
export class ODPTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_EXPORTERROR', 500, true);
  }
}
export class ODPTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_IMPORTERROR', 500, true);
  }
}
export class ODPTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_TIMEOUTERROR', 504, true);
  }
}
export class ODPTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_DUPLICATEERROR', 409, true);
  }
}
export class ODPTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_DRAFTERROR', 500, true);
  }
}
export class ODPTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_PUBLISHERROR', 500, true);
  }
}
export class ODPTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_ARCHIVEERROR', 500, true);
  }
}
export class ODPTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_REVOKEERROR', 500, true);
  }
}
export class ODPTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_SHAREERROR', 500, true);
  }
}
export class ODPTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_BATCHERROR', 500, true);
  }
}
export class ODPTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_REVIEWERROR', 500, true);
  }
}
export class ODPTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_LOADERROR', 500, true);
  }
}
export class ODPCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_EXPORTERROR', 500, true);
  }
}
export class ODPCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_IMPORTERROR', 500, true);
  }
}
export class ODPCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_TIMEOUTERROR', 504, true);
  }
}
export class ODPCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_DUPLICATEERROR', 409, true);
  }
}
export class ODPCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_DRAFTERROR', 500, true);
  }
}
export class ODPCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_PUBLISHERROR', 500, true);
  }
}
export class ODPCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_ARCHIVEERROR', 500, true);
  }
}
export class ODPCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_REVOKEERROR', 500, true);
  }
}
export class ODPCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_SHAREERROR', 500, true);
  }
}
export class ODPCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_BATCHERROR', 500, true);
  }
}
export class ODPCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_REVIEWERROR', 500, true);
  }
}
export class ODPCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_LOADERROR', 500, true);
  }
}
export class ODPCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_EXPORTERROR', 500, true);
  }
}
export class ODPCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_IMPORTERROR', 500, true);
  }
}
export class ODPCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_TIMEOUTERROR', 504, true);
  }
}
export class ODPCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_DUPLICATEERROR', 409, true);
  }
}
export class ODPCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_DRAFTERROR', 500, true);
  }
}
export class ODPCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_PUBLISHERROR', 500, true);
  }
}
export class ODPCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_ARCHIVEERROR', 500, true);
  }
}
export class ODPCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_REVOKEERROR', 500, true);
  }
}
export class ODPCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_SHAREERROR', 500, true);
  }
}
export class ODPCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_BATCHERROR', 500, true);
  }
}
export class ODPCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_REVIEWERROR', 500, true);
  }
}
export class ODPCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_LOADERROR', 500, true);
  }
}
export class ODPAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_EXPORTERROR', 500, true);
  }
}
export class ODPAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_IMPORTERROR', 500, true);
  }
}
export class ODPAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class ODPAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class ODPAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_DRAFTERROR', 500, true);
  }
}
export class ODPAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_PUBLISHERROR', 500, true);
  }
}
export class ODPAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class ODPAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_REVOKEERROR', 500, true);
  }
}
export class ODPAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_SHAREERROR', 500, true);
  }
}
export class ODPAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_BATCHERROR', 500, true);
  }
}
export class ODPAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_REVIEWERROR', 500, true);
  }
}
export class ODPAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_LOADERROR', 500, true);
  }
}
export class ODPApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_EXPORTERROR', 500, true);
  }
}
export class ODPApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_IMPORTERROR', 500, true);
  }
}
export class ODPApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_TIMEOUTERROR', 504, true);
  }
}
export class ODPApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_DUPLICATEERROR', 409, true);
  }
}
export class ODPApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_DRAFTERROR', 500, true);
  }
}
export class ODPApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_PUBLISHERROR', 500, true);
  }
}
export class ODPApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_ARCHIVEERROR', 500, true);
  }
}
export class ODPApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_REVOKEERROR', 500, true);
  }
}
export class ODPApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_SHAREERROR', 500, true);
  }
}
export class ODPApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_BATCHERROR', 500, true);
  }
}
export class ODPApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_REVIEWERROR', 500, true);
  }
}
export class ODPApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class ODPReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_LOADERROR', 500, true);
  }
}
export class ODPReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_EXPORTERROR', 500, true);
  }
}
export class ODPReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_IMPORTERROR', 500, true);
  }
}
export class ODPReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_TIMEOUTERROR', 504, true);
  }
}
export class ODPReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_DUPLICATEERROR', 409, true);
  }
}
export class ODPReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_DRAFTERROR', 500, true);
  }
}
export class ODPReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_PUBLISHERROR', 500, true);
  }
}
export class ODPReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_ARCHIVEERROR', 500, true);
  }
}
export class ODPReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_REVOKEERROR', 500, true);
  }
}
export class ODPReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_SHAREERROR', 500, true);
  }
}
export class ODPReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_BATCHERROR', 500, true);
  }
}
export class ODPReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class ODPReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class ODPReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_REVIEWERROR', 500, true);
  }
}
export class ODPReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class ODPReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_ODP_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_LOADERROR', 500, true);
  }
}
export class OBSPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_EXPORTERROR', 500, true);
  }
}
export class OBSPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_IMPORTERROR', 500, true);
  }
}
export class OBSPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_TIMEOUTERROR', 504, true);
  }
}
export class OBSPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_DUPLICATEERROR', 409, true);
  }
}
export class OBSPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_DRAFTERROR', 500, true);
  }
}
export class OBSPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_PUBLISHERROR', 500, true);
  }
}
export class OBSPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_ARCHIVEERROR', 500, true);
  }
}
export class OBSPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_REVOKEERROR', 500, true);
  }
}
export class OBSPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_SHAREERROR', 500, true);
  }
}
export class OBSPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_BATCHERROR', 500, true);
  }
}
export class OBSPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_REVIEWERROR', 500, true);
  }
}
export class OBSPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_LOADERROR', 500, true);
  }
}
export class OBSReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_EXPORTERROR', 500, true);
  }
}
export class OBSReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_IMPORTERROR', 500, true);
  }
}
export class OBSReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_TIMEOUTERROR', 504, true);
  }
}
export class OBSReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_DUPLICATEERROR', 409, true);
  }
}
export class OBSReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_DRAFTERROR', 500, true);
  }
}
export class OBSReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_PUBLISHERROR', 500, true);
  }
}
export class OBSReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_ARCHIVEERROR', 500, true);
  }
}
export class OBSReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_REVOKEERROR', 500, true);
  }
}
export class OBSReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_SHAREERROR', 500, true);
  }
}
export class OBSReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_BATCHERROR', 500, true);
  }
}
export class OBSReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_REVIEWERROR', 500, true);
  }
}
export class OBSReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_LOADERROR', 500, true);
  }
}
export class OBSTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_EXPORTERROR', 500, true);
  }
}
export class OBSTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_IMPORTERROR', 500, true);
  }
}
export class OBSTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_TIMEOUTERROR', 504, true);
  }
}
export class OBSTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_DUPLICATEERROR', 409, true);
  }
}
export class OBSTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_DRAFTERROR', 500, true);
  }
}
export class OBSTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_PUBLISHERROR', 500, true);
  }
}
export class OBSTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_ARCHIVEERROR', 500, true);
  }
}
export class OBSTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_REVOKEERROR', 500, true);
  }
}
export class OBSTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_SHAREERROR', 500, true);
  }
}
export class OBSTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_BATCHERROR', 500, true);
  }
}
export class OBSTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_REVIEWERROR', 500, true);
  }
}
export class OBSTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_LOADERROR', 500, true);
  }
}
export class OBSScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_EXPORTERROR', 500, true);
  }
}
export class OBSScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_IMPORTERROR', 500, true);
  }
}
export class OBSScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class OBSScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class OBSScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_DRAFTERROR', 500, true);
  }
}
export class OBSSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_PUBLISHERROR', 500, true);
  }
}
export class OBSScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class OBSScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_REVOKEERROR', 500, true);
  }
}
export class OBSScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_SHAREERROR', 500, true);
  }
}
export class OBSScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_BATCHERROR', 500, true);
  }
}
export class OBSScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_REVIEWERROR', 500, true);
  }
}
export class OBSScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_LOADERROR', 500, true);
  }
}
export class OBSArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_EXPORTERROR', 500, true);
  }
}
export class OBSArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_IMPORTERROR', 500, true);
  }
}
export class OBSArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_TIMEOUTERROR', 504, true);
  }
}
export class OBSArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_DUPLICATEERROR', 409, true);
  }
}
export class OBSArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_DRAFTERROR', 500, true);
  }
}
export class OBSArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_PUBLISHERROR', 500, true);
  }
}
export class OBSArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_ARCHIVEERROR', 500, true);
  }
}
export class OBSArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_REVOKEERROR', 500, true);
  }
}
export class OBSArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_SHAREERROR', 500, true);
  }
}
export class OBSArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_BATCHERROR', 500, true);
  }
}
export class OBSArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_REVIEWERROR', 500, true);
  }
}
export class OBSArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_LOADERROR', 500, true);
  }
}
export class OBSWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_EXPORTERROR', 500, true);
  }
}
export class OBSWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_IMPORTERROR', 500, true);
  }
}
export class OBSWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class OBSWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class OBSWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_DRAFTERROR', 500, true);
  }
}
export class OBSWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_PUBLISHERROR', 500, true);
  }
}
export class OBSWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class OBSWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_REVOKEERROR', 500, true);
  }
}
export class OBSWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_SHAREERROR', 500, true);
  }
}
export class OBSWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_BATCHERROR', 500, true);
  }
}
export class OBSWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_REVIEWERROR', 500, true);
  }
}
export class OBSWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_LOADERROR', 500, true);
  }
}
export class OBSBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_EXPORTERROR', 500, true);
  }
}
export class OBSBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_IMPORTERROR', 500, true);
  }
}
export class OBSBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_TIMEOUTERROR', 504, true);
  }
}
export class OBSBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_DUPLICATEERROR', 409, true);
  }
}
export class OBSBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_DRAFTERROR', 500, true);
  }
}
export class OBSBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_PUBLISHERROR', 500, true);
  }
}
export class OBSBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_ARCHIVEERROR', 500, true);
  }
}
export class OBSBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_REVOKEERROR', 500, true);
  }
}
export class OBSBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_SHAREERROR', 500, true);
  }
}
export class OBSBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_BATCHERROR', 500, true);
  }
}
export class OBSBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_REVIEWERROR', 500, true);
  }
}
export class OBSBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_LOADERROR', 500, true);
  }
}
export class OBSVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_EXPORTERROR', 500, true);
  }
}
export class OBSVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_IMPORTERROR', 500, true);
  }
}
export class OBSVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_TIMEOUTERROR', 504, true);
  }
}
export class OBSVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_DUPLICATEERROR', 409, true);
  }
}
export class OBSVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_DRAFTERROR', 500, true);
  }
}
export class OBSVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_PUBLISHERROR', 500, true);
  }
}
export class OBSVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_ARCHIVEERROR', 500, true);
  }
}
export class OBSVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_REVOKEERROR', 500, true);
  }
}
export class OBSVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_SHAREERROR', 500, true);
  }
}
export class OBSVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_BATCHERROR', 500, true);
  }
}
export class OBSVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_REVIEWERROR', 500, true);
  }
}
export class OBSVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_LOADERROR', 500, true);
  }
}
export class OBSTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_EXPORTERROR', 500, true);
  }
}
export class OBSTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_IMPORTERROR', 500, true);
  }
}
export class OBSTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_TIMEOUTERROR', 504, true);
  }
}
export class OBSTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_DUPLICATEERROR', 409, true);
  }
}
export class OBSTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_DRAFTERROR', 500, true);
  }
}
export class OBSTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_PUBLISHERROR', 500, true);
  }
}
export class OBSTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_ARCHIVEERROR', 500, true);
  }
}
export class OBSTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_REVOKEERROR', 500, true);
  }
}
export class OBSTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_SHAREERROR', 500, true);
  }
}
export class OBSTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_BATCHERROR', 500, true);
  }
}
export class OBSTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_REVIEWERROR', 500, true);
  }
}
export class OBSTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_LOADERROR', 500, true);
  }
}
export class OBSCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_EXPORTERROR', 500, true);
  }
}
export class OBSCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_IMPORTERROR', 500, true);
  }
}
export class OBSCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_TIMEOUTERROR', 504, true);
  }
}
export class OBSCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_DUPLICATEERROR', 409, true);
  }
}
export class OBSCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_DRAFTERROR', 500, true);
  }
}
export class OBSCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_PUBLISHERROR', 500, true);
  }
}
export class OBSCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_ARCHIVEERROR', 500, true);
  }
}
export class OBSCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_REVOKEERROR', 500, true);
  }
}
export class OBSCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_SHAREERROR', 500, true);
  }
}
export class OBSCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_BATCHERROR', 500, true);
  }
}
export class OBSCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_REVIEWERROR', 500, true);
  }
}
export class OBSCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_LOADERROR', 500, true);
  }
}
export class OBSCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_EXPORTERROR', 500, true);
  }
}
export class OBSCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_IMPORTERROR', 500, true);
  }
}
export class OBSCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_TIMEOUTERROR', 504, true);
  }
}
export class OBSCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_DUPLICATEERROR', 409, true);
  }
}
export class OBSCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_DRAFTERROR', 500, true);
  }
}
export class OBSCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_PUBLISHERROR', 500, true);
  }
}
export class OBSCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_ARCHIVEERROR', 500, true);
  }
}
export class OBSCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_REVOKEERROR', 500, true);
  }
}
export class OBSCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_SHAREERROR', 500, true);
  }
}
export class OBSCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_BATCHERROR', 500, true);
  }
}
export class OBSCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_REVIEWERROR', 500, true);
  }
}
export class OBSCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_LOADERROR', 500, true);
  }
}
export class OBSAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_EXPORTERROR', 500, true);
  }
}
export class OBSAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_IMPORTERROR', 500, true);
  }
}
export class OBSAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class OBSAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class OBSAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_DRAFTERROR', 500, true);
  }
}
export class OBSAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_PUBLISHERROR', 500, true);
  }
}
export class OBSAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class OBSAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_REVOKEERROR', 500, true);
  }
}
export class OBSAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_SHAREERROR', 500, true);
  }
}
export class OBSAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_BATCHERROR', 500, true);
  }
}
export class OBSAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_REVIEWERROR', 500, true);
  }
}
export class OBSAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_LOADERROR', 500, true);
  }
}
export class OBSApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_EXPORTERROR', 500, true);
  }
}
export class OBSApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_IMPORTERROR', 500, true);
  }
}
export class OBSApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_TIMEOUTERROR', 504, true);
  }
}
export class OBSApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_DUPLICATEERROR', 409, true);
  }
}
export class OBSApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_DRAFTERROR', 500, true);
  }
}
export class OBSApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_PUBLISHERROR', 500, true);
  }
}
export class OBSApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_ARCHIVEERROR', 500, true);
  }
}
export class OBSApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_REVOKEERROR', 500, true);
  }
}
export class OBSApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_SHAREERROR', 500, true);
  }
}
export class OBSApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_BATCHERROR', 500, true);
  }
}
export class OBSApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_REVIEWERROR', 500, true);
  }
}
export class OBSApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class OBSReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_LOADERROR', 500, true);
  }
}
export class OBSReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_EXPORTERROR', 500, true);
  }
}
export class OBSReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_IMPORTERROR', 500, true);
  }
}
export class OBSReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_TIMEOUTERROR', 504, true);
  }
}
export class OBSReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_DUPLICATEERROR', 409, true);
  }
}
export class OBSReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_DRAFTERROR', 500, true);
  }
}
export class OBSReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_PUBLISHERROR', 500, true);
  }
}
export class OBSReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_ARCHIVEERROR', 500, true);
  }
}
export class OBSReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_REVOKEERROR', 500, true);
  }
}
export class OBSReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_SHAREERROR', 500, true);
  }
}
export class OBSReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_BATCHERROR', 500, true);
  }
}
export class OBSReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class OBSReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class OBSReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_REVIEWERROR', 500, true);
  }
}
export class OBSReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class OBSReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_OBS_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_LOADERROR', 500, true);
  }
}
export class EMRPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_EXPORTERROR', 500, true);
  }
}
export class EMRPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_IMPORTERROR', 500, true);
  }
}
export class EMRPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_TIMEOUTERROR', 504, true);
  }
}
export class EMRPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_DUPLICATEERROR', 409, true);
  }
}
export class EMRPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_DRAFTERROR', 500, true);
  }
}
export class EMRPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_PUBLISHERROR', 500, true);
  }
}
export class EMRPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_ARCHIVEERROR', 500, true);
  }
}
export class EMRPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_REVOKEERROR', 500, true);
  }
}
export class EMRPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_SHAREERROR', 500, true);
  }
}
export class EMRPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_BATCHERROR', 500, true);
  }
}
export class EMRPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_REVIEWERROR', 500, true);
  }
}
export class EMRPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_LOADERROR', 500, true);
  }
}
export class EMRReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_EXPORTERROR', 500, true);
  }
}
export class EMRReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_IMPORTERROR', 500, true);
  }
}
export class EMRReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_TIMEOUTERROR', 504, true);
  }
}
export class EMRReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_DUPLICATEERROR', 409, true);
  }
}
export class EMRReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_DRAFTERROR', 500, true);
  }
}
export class EMRReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_PUBLISHERROR', 500, true);
  }
}
export class EMRReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_ARCHIVEERROR', 500, true);
  }
}
export class EMRReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_REVOKEERROR', 500, true);
  }
}
export class EMRReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_SHAREERROR', 500, true);
  }
}
export class EMRReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_BATCHERROR', 500, true);
  }
}
export class EMRReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_REVIEWERROR', 500, true);
  }
}
export class EMRReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_LOADERROR', 500, true);
  }
}
export class EMRTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_EXPORTERROR', 500, true);
  }
}
export class EMRTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_IMPORTERROR', 500, true);
  }
}
export class EMRTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_TIMEOUTERROR', 504, true);
  }
}
export class EMRTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_DUPLICATEERROR', 409, true);
  }
}
export class EMRTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_DRAFTERROR', 500, true);
  }
}
export class EMRTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_PUBLISHERROR', 500, true);
  }
}
export class EMRTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_ARCHIVEERROR', 500, true);
  }
}
export class EMRTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_REVOKEERROR', 500, true);
  }
}
export class EMRTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_SHAREERROR', 500, true);
  }
}
export class EMRTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_BATCHERROR', 500, true);
  }
}
export class EMRTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_REVIEWERROR', 500, true);
  }
}
export class EMRTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_LOADERROR', 500, true);
  }
}
export class EMRScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_EXPORTERROR', 500, true);
  }
}
export class EMRScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_IMPORTERROR', 500, true);
  }
}
export class EMRScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class EMRScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class EMRScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_DRAFTERROR', 500, true);
  }
}
export class EMRSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_PUBLISHERROR', 500, true);
  }
}
export class EMRScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class EMRScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_REVOKEERROR', 500, true);
  }
}
export class EMRScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_SHAREERROR', 500, true);
  }
}
export class EMRScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_BATCHERROR', 500, true);
  }
}
export class EMRScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_REVIEWERROR', 500, true);
  }
}
export class EMRScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_LOADERROR', 500, true);
  }
}
export class EMRArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_EXPORTERROR', 500, true);
  }
}
export class EMRArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_IMPORTERROR', 500, true);
  }
}
export class EMRArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_TIMEOUTERROR', 504, true);
  }
}
export class EMRArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_DUPLICATEERROR', 409, true);
  }
}
export class EMRArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_DRAFTERROR', 500, true);
  }
}
export class EMRArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_PUBLISHERROR', 500, true);
  }
}
export class EMRArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_ARCHIVEERROR', 500, true);
  }
}
export class EMRArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_REVOKEERROR', 500, true);
  }
}
export class EMRArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_SHAREERROR', 500, true);
  }
}
export class EMRArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_BATCHERROR', 500, true);
  }
}
export class EMRArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_REVIEWERROR', 500, true);
  }
}
export class EMRArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_LOADERROR', 500, true);
  }
}
export class EMRWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_EXPORTERROR', 500, true);
  }
}
export class EMRWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_IMPORTERROR', 500, true);
  }
}
export class EMRWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class EMRWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class EMRWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_DRAFTERROR', 500, true);
  }
}
export class EMRWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_PUBLISHERROR', 500, true);
  }
}
export class EMRWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class EMRWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_REVOKEERROR', 500, true);
  }
}
export class EMRWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_SHAREERROR', 500, true);
  }
}
export class EMRWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_BATCHERROR', 500, true);
  }
}
export class EMRWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_REVIEWERROR', 500, true);
  }
}
export class EMRWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_LOADERROR', 500, true);
  }
}
export class EMRBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_EXPORTERROR', 500, true);
  }
}
export class EMRBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_IMPORTERROR', 500, true);
  }
}
export class EMRBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_TIMEOUTERROR', 504, true);
  }
}
export class EMRBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_DUPLICATEERROR', 409, true);
  }
}
export class EMRBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_DRAFTERROR', 500, true);
  }
}
export class EMRBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_PUBLISHERROR', 500, true);
  }
}
export class EMRBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_ARCHIVEERROR', 500, true);
  }
}
export class EMRBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_REVOKEERROR', 500, true);
  }
}
export class EMRBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_SHAREERROR', 500, true);
  }
}
export class EMRBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_BATCHERROR', 500, true);
  }
}
export class EMRBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_REVIEWERROR', 500, true);
  }
}
export class EMRBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_LOADERROR', 500, true);
  }
}
export class EMRVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_EXPORTERROR', 500, true);
  }
}
export class EMRVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_IMPORTERROR', 500, true);
  }
}
export class EMRVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_TIMEOUTERROR', 504, true);
  }
}
export class EMRVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_DUPLICATEERROR', 409, true);
  }
}
export class EMRVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_DRAFTERROR', 500, true);
  }
}
export class EMRVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_PUBLISHERROR', 500, true);
  }
}
export class EMRVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_ARCHIVEERROR', 500, true);
  }
}
export class EMRVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_REVOKEERROR', 500, true);
  }
}
export class EMRVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_SHAREERROR', 500, true);
  }
}
export class EMRVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_BATCHERROR', 500, true);
  }
}
export class EMRVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_REVIEWERROR', 500, true);
  }
}
export class EMRVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_LOADERROR', 500, true);
  }
}
export class EMRTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_EXPORTERROR', 500, true);
  }
}
export class EMRTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_IMPORTERROR', 500, true);
  }
}
export class EMRTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_TIMEOUTERROR', 504, true);
  }
}
export class EMRTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_DUPLICATEERROR', 409, true);
  }
}
export class EMRTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_DRAFTERROR', 500, true);
  }
}
export class EMRTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_PUBLISHERROR', 500, true);
  }
}
export class EMRTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_ARCHIVEERROR', 500, true);
  }
}
export class EMRTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_REVOKEERROR', 500, true);
  }
}
export class EMRTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_SHAREERROR', 500, true);
  }
}
export class EMRTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_BATCHERROR', 500, true);
  }
}
export class EMRTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_REVIEWERROR', 500, true);
  }
}
export class EMRTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_LOADERROR', 500, true);
  }
}
export class EMRCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_EXPORTERROR', 500, true);
  }
}
export class EMRCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_IMPORTERROR', 500, true);
  }
}
export class EMRCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_TIMEOUTERROR', 504, true);
  }
}
export class EMRCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_DUPLICATEERROR', 409, true);
  }
}
export class EMRCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_DRAFTERROR', 500, true);
  }
}
export class EMRCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_PUBLISHERROR', 500, true);
  }
}
export class EMRCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_ARCHIVEERROR', 500, true);
  }
}
export class EMRCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_REVOKEERROR', 500, true);
  }
}
export class EMRCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_SHAREERROR', 500, true);
  }
}
export class EMRCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_BATCHERROR', 500, true);
  }
}
export class EMRCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_REVIEWERROR', 500, true);
  }
}
export class EMRCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_LOADERROR', 500, true);
  }
}
export class EMRCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_EXPORTERROR', 500, true);
  }
}
export class EMRCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_IMPORTERROR', 500, true);
  }
}
export class EMRCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_TIMEOUTERROR', 504, true);
  }
}
export class EMRCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_DUPLICATEERROR', 409, true);
  }
}
export class EMRCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_DRAFTERROR', 500, true);
  }
}
export class EMRCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_PUBLISHERROR', 500, true);
  }
}
export class EMRCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_ARCHIVEERROR', 500, true);
  }
}
export class EMRCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_REVOKEERROR', 500, true);
  }
}
export class EMRCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_SHAREERROR', 500, true);
  }
}
export class EMRCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_BATCHERROR', 500, true);
  }
}
export class EMRCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_REVIEWERROR', 500, true);
  }
}
export class EMRCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_LOADERROR', 500, true);
  }
}
export class EMRAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_EXPORTERROR', 500, true);
  }
}
export class EMRAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_IMPORTERROR', 500, true);
  }
}
export class EMRAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class EMRAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class EMRAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_DRAFTERROR', 500, true);
  }
}
export class EMRAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_PUBLISHERROR', 500, true);
  }
}
export class EMRAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class EMRAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_REVOKEERROR', 500, true);
  }
}
export class EMRAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_SHAREERROR', 500, true);
  }
}
export class EMRAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_BATCHERROR', 500, true);
  }
}
export class EMRAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_REVIEWERROR', 500, true);
  }
}
export class EMRAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_LOADERROR', 500, true);
  }
}
export class EMRApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_EXPORTERROR', 500, true);
  }
}
export class EMRApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_IMPORTERROR', 500, true);
  }
}
export class EMRApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_TIMEOUTERROR', 504, true);
  }
}
export class EMRApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_DUPLICATEERROR', 409, true);
  }
}
export class EMRApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_DRAFTERROR', 500, true);
  }
}
export class EMRApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_PUBLISHERROR', 500, true);
  }
}
export class EMRApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_ARCHIVEERROR', 500, true);
  }
}
export class EMRApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_REVOKEERROR', 500, true);
  }
}
export class EMRApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_SHAREERROR', 500, true);
  }
}
export class EMRApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_BATCHERROR', 500, true);
  }
}
export class EMRApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_REVIEWERROR', 500, true);
  }
}
export class EMRApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class EMRReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_LOADERROR', 500, true);
  }
}
export class EMRReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_EXPORTERROR', 500, true);
  }
}
export class EMRReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_IMPORTERROR', 500, true);
  }
}
export class EMRReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_TIMEOUTERROR', 504, true);
  }
}
export class EMRReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_DUPLICATEERROR', 409, true);
  }
}
export class EMRReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_DRAFTERROR', 500, true);
  }
}
export class EMRReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_PUBLISHERROR', 500, true);
  }
}
export class EMRReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_ARCHIVEERROR', 500, true);
  }
}
export class EMRReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_REVOKEERROR', 500, true);
  }
}
export class EMRReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_SHAREERROR', 500, true);
  }
}
export class EMRReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_BATCHERROR', 500, true);
  }
}
export class EMRReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class EMRReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class EMRReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_REVIEWERROR', 500, true);
  }
}
export class EMRReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class EMRReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_EMR_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_LOADERROR', 500, true);
  }
}
export class INTPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_EXPORTERROR', 500, true);
  }
}
export class INTPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_IMPORTERROR', 500, true);
  }
}
export class INTPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_TIMEOUTERROR', 504, true);
  }
}
export class INTPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_DUPLICATEERROR', 409, true);
  }
}
export class INTPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_DRAFTERROR', 500, true);
  }
}
export class INTPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_PUBLISHERROR', 500, true);
  }
}
export class INTPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_ARCHIVEERROR', 500, true);
  }
}
export class INTPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_REVOKEERROR', 500, true);
  }
}
export class INTPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_SHAREERROR', 500, true);
  }
}
export class INTPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_BATCHERROR', 500, true);
  }
}
export class INTPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_REVIEWERROR', 500, true);
  }
}
export class INTPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_LOADERROR', 500, true);
  }
}
export class INTReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_EXPORTERROR', 500, true);
  }
}
export class INTReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_IMPORTERROR', 500, true);
  }
}
export class INTReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_TIMEOUTERROR', 504, true);
  }
}
export class INTReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_DUPLICATEERROR', 409, true);
  }
}
export class INTReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_DRAFTERROR', 500, true);
  }
}
export class INTReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_PUBLISHERROR', 500, true);
  }
}
export class INTReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_ARCHIVEERROR', 500, true);
  }
}
export class INTReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_REVOKEERROR', 500, true);
  }
}
export class INTReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_SHAREERROR', 500, true);
  }
}
export class INTReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_BATCHERROR', 500, true);
  }
}
export class INTReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_REVIEWERROR', 500, true);
  }
}
export class INTReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_LOADERROR', 500, true);
  }
}
export class INTTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_EXPORTERROR', 500, true);
  }
}
export class INTTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_IMPORTERROR', 500, true);
  }
}
export class INTTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_TIMEOUTERROR', 504, true);
  }
}
export class INTTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_DUPLICATEERROR', 409, true);
  }
}
export class INTTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_DRAFTERROR', 500, true);
  }
}
export class INTTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_PUBLISHERROR', 500, true);
  }
}
export class INTTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_ARCHIVEERROR', 500, true);
  }
}
export class INTTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_REVOKEERROR', 500, true);
  }
}
export class INTTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_SHAREERROR', 500, true);
  }
}
export class INTTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_BATCHERROR', 500, true);
  }
}
export class INTTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_REVIEWERROR', 500, true);
  }
}
export class INTTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_LOADERROR', 500, true);
  }
}
export class INTScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_EXPORTERROR', 500, true);
  }
}
export class INTScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_IMPORTERROR', 500, true);
  }
}
export class INTScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class INTScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class INTScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_DRAFTERROR', 500, true);
  }
}
export class INTSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_PUBLISHERROR', 500, true);
  }
}
export class INTScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class INTScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_REVOKEERROR', 500, true);
  }
}
export class INTScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_SHAREERROR', 500, true);
  }
}
export class INTScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_BATCHERROR', 500, true);
  }
}
export class INTScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_REVIEWERROR', 500, true);
  }
}
export class INTScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_LOADERROR', 500, true);
  }
}
export class INTArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_EXPORTERROR', 500, true);
  }
}
export class INTArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_IMPORTERROR', 500, true);
  }
}
export class INTArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_TIMEOUTERROR', 504, true);
  }
}
export class INTArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_DUPLICATEERROR', 409, true);
  }
}
export class INTArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_DRAFTERROR', 500, true);
  }
}
export class INTArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_PUBLISHERROR', 500, true);
  }
}
export class INTArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_ARCHIVEERROR', 500, true);
  }
}
export class INTArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_REVOKEERROR', 500, true);
  }
}
export class INTArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_SHAREERROR', 500, true);
  }
}
export class INTArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_BATCHERROR', 500, true);
  }
}
export class INTArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_REVIEWERROR', 500, true);
  }
}
export class INTArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_LOADERROR', 500, true);
  }
}
export class INTWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_EXPORTERROR', 500, true);
  }
}
export class INTWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_IMPORTERROR', 500, true);
  }
}
export class INTWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class INTWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class INTWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_DRAFTERROR', 500, true);
  }
}
export class INTWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_PUBLISHERROR', 500, true);
  }
}
export class INTWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class INTWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_REVOKEERROR', 500, true);
  }
}
export class INTWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_SHAREERROR', 500, true);
  }
}
export class INTWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_BATCHERROR', 500, true);
  }
}
export class INTWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_REVIEWERROR', 500, true);
  }
}
export class INTWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_LOADERROR', 500, true);
  }
}
export class INTBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_EXPORTERROR', 500, true);
  }
}
export class INTBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_IMPORTERROR', 500, true);
  }
}
export class INTBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_TIMEOUTERROR', 504, true);
  }
}
export class INTBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_DUPLICATEERROR', 409, true);
  }
}
export class INTBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_DRAFTERROR', 500, true);
  }
}
export class INTBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_PUBLISHERROR', 500, true);
  }
}
export class INTBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_ARCHIVEERROR', 500, true);
  }
}
export class INTBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_REVOKEERROR', 500, true);
  }
}
export class INTBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_SHAREERROR', 500, true);
  }
}
export class INTBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_BATCHERROR', 500, true);
  }
}
export class INTBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_REVIEWERROR', 500, true);
  }
}
export class INTBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_LOADERROR', 500, true);
  }
}
export class INTVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_EXPORTERROR', 500, true);
  }
}
export class INTVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_IMPORTERROR', 500, true);
  }
}
export class INTVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_TIMEOUTERROR', 504, true);
  }
}
export class INTVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_DUPLICATEERROR', 409, true);
  }
}
export class INTVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_DRAFTERROR', 500, true);
  }
}
export class INTVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_PUBLISHERROR', 500, true);
  }
}
export class INTVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_ARCHIVEERROR', 500, true);
  }
}
export class INTVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_REVOKEERROR', 500, true);
  }
}
export class INTVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_SHAREERROR', 500, true);
  }
}
export class INTVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_BATCHERROR', 500, true);
  }
}
export class INTVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_REVIEWERROR', 500, true);
  }
}
export class INTVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_LOADERROR', 500, true);
  }
}
export class INTTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_EXPORTERROR', 500, true);
  }
}
export class INTTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_IMPORTERROR', 500, true);
  }
}
export class INTTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_TIMEOUTERROR', 504, true);
  }
}
export class INTTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_DUPLICATEERROR', 409, true);
  }
}
export class INTTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_DRAFTERROR', 500, true);
  }
}
export class INTTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_PUBLISHERROR', 500, true);
  }
}
export class INTTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_ARCHIVEERROR', 500, true);
  }
}
export class INTTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_REVOKEERROR', 500, true);
  }
}
export class INTTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_SHAREERROR', 500, true);
  }
}
export class INTTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_BATCHERROR', 500, true);
  }
}
export class INTTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_REVIEWERROR', 500, true);
  }
}
export class INTTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_LOADERROR', 500, true);
  }
}
export class INTCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_EXPORTERROR', 500, true);
  }
}
export class INTCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_IMPORTERROR', 500, true);
  }
}
export class INTCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_TIMEOUTERROR', 504, true);
  }
}
export class INTCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_DUPLICATEERROR', 409, true);
  }
}
export class INTCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_DRAFTERROR', 500, true);
  }
}
export class INTCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_PUBLISHERROR', 500, true);
  }
}
export class INTCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_ARCHIVEERROR', 500, true);
  }
}
export class INTCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_REVOKEERROR', 500, true);
  }
}
export class INTCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_SHAREERROR', 500, true);
  }
}
export class INTCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_BATCHERROR', 500, true);
  }
}
export class INTCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_REVIEWERROR', 500, true);
  }
}
export class INTCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_LOADERROR', 500, true);
  }
}
export class INTCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_EXPORTERROR', 500, true);
  }
}
export class INTCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_IMPORTERROR', 500, true);
  }
}
export class INTCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_TIMEOUTERROR', 504, true);
  }
}
export class INTCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_DUPLICATEERROR', 409, true);
  }
}
export class INTCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_DRAFTERROR', 500, true);
  }
}
export class INTCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_PUBLISHERROR', 500, true);
  }
}
export class INTCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_ARCHIVEERROR', 500, true);
  }
}
export class INTCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_REVOKEERROR', 500, true);
  }
}
export class INTCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_SHAREERROR', 500, true);
  }
}
export class INTCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_BATCHERROR', 500, true);
  }
}
export class INTCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_REVIEWERROR', 500, true);
  }
}
export class INTCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_LOADERROR', 500, true);
  }
}
export class INTAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_EXPORTERROR', 500, true);
  }
}
export class INTAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_IMPORTERROR', 500, true);
  }
}
export class INTAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class INTAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class INTAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_DRAFTERROR', 500, true);
  }
}
export class INTAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_PUBLISHERROR', 500, true);
  }
}
export class INTAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class INTAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_REVOKEERROR', 500, true);
  }
}
export class INTAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_SHAREERROR', 500, true);
  }
}
export class INTAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_BATCHERROR', 500, true);
  }
}
export class INTAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_REVIEWERROR', 500, true);
  }
}
export class INTAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_LOADERROR', 500, true);
  }
}
export class INTApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_EXPORTERROR', 500, true);
  }
}
export class INTApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_IMPORTERROR', 500, true);
  }
}
export class INTApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_TIMEOUTERROR', 504, true);
  }
}
export class INTApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_DUPLICATEERROR', 409, true);
  }
}
export class INTApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_DRAFTERROR', 500, true);
  }
}
export class INTApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_PUBLISHERROR', 500, true);
  }
}
export class INTApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_ARCHIVEERROR', 500, true);
  }
}
export class INTApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_REVOKEERROR', 500, true);
  }
}
export class INTApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_SHAREERROR', 500, true);
  }
}
export class INTApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_BATCHERROR', 500, true);
  }
}
export class INTApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_REVIEWERROR', 500, true);
  }
}
export class INTApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class INTReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_LOADERROR', 500, true);
  }
}
export class INTReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_EXPORTERROR', 500, true);
  }
}
export class INTReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_IMPORTERROR', 500, true);
  }
}
export class INTReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_TIMEOUTERROR', 504, true);
  }
}
export class INTReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_DUPLICATEERROR', 409, true);
  }
}
export class INTReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_DRAFTERROR', 500, true);
  }
}
export class INTReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_PUBLISHERROR', 500, true);
  }
}
export class INTReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_ARCHIVEERROR', 500, true);
  }
}
export class INTReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_REVOKEERROR', 500, true);
  }
}
export class INTReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_SHAREERROR', 500, true);
  }
}
export class INTReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_BATCHERROR', 500, true);
  }
}
export class INTReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class INTReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class INTReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_REVIEWERROR', 500, true);
  }
}
export class INTReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class INTReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_INT_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNPolicyLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_LOADERROR', 500, true);
  }
}
export class TWNPolicyExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_EXPORTERROR', 500, true);
  }
}
export class TWNPolicyImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_IMPORTERROR', 500, true);
  }
}
export class TWNPolicyTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_TIMEOUTERROR', 504, true);
  }
}
export class TWNPolicyDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_DUPLICATEERROR', 409, true);
  }
}
export class TWNPolicyDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_DRAFTERROR', 500, true);
  }
}
export class TWNPolicyPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_PUBLISHERROR', 500, true);
  }
}
export class TWNPolicyArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_ARCHIVEERROR', 500, true);
  }
}
export class TWNPolicyRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_REVOKEERROR', 500, true);
  }
}
export class TWNPolicyShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_SHAREERROR', 500, true);
  }
}
export class TWNPolicyBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_BATCHERROR', 500, true);
  }
}
export class TWNPolicyBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNPolicyBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNPolicyReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_REVIEWERROR', 500, true);
  }
}
export class TWNPolicyReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNPolicyReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Policy_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNReportLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_LOADERROR', 500, true);
  }
}
export class TWNReportExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_EXPORTERROR', 500, true);
  }
}
export class TWNReportImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_IMPORTERROR', 500, true);
  }
}
export class TWNReportTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_TIMEOUTERROR', 504, true);
  }
}
export class TWNReportDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_DUPLICATEERROR', 409, true);
  }
}
export class TWNReportDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_DRAFTERROR', 500, true);
  }
}
export class TWNReportPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_PUBLISHERROR', 500, true);
  }
}
export class TWNReportArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_ARCHIVEERROR', 500, true);
  }
}
export class TWNReportRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_REVOKEERROR', 500, true);
  }
}
export class TWNReportShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_SHAREERROR', 500, true);
  }
}
export class TWNReportBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_BATCHERROR', 500, true);
  }
}
export class TWNReportBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNReportBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNReportReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_REVIEWERROR', 500, true);
  }
}
export class TWNReportReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNReportReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Report_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNTemplateLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_LOADERROR', 500, true);
  }
}
export class TWNTemplateExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_EXPORTERROR', 500, true);
  }
}
export class TWNTemplateImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_IMPORTERROR', 500, true);
  }
}
export class TWNTemplateTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_TIMEOUTERROR', 504, true);
  }
}
export class TWNTemplateDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_DUPLICATEERROR', 409, true);
  }
}
export class TWNTemplateDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_DRAFTERROR', 500, true);
  }
}
export class TWNTemplatePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_PUBLISHERROR', 500, true);
  }
}
export class TWNTemplateArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_ARCHIVEERROR', 500, true);
  }
}
export class TWNTemplateRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_REVOKEERROR', 500, true);
  }
}
export class TWNTemplateShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_SHAREERROR', 500, true);
  }
}
export class TWNTemplateBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_BATCHERROR', 500, true);
  }
}
export class TWNTemplateBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNTemplateBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNTemplateReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_REVIEWERROR', 500, true);
  }
}
export class TWNTemplateReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNTemplateReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Template_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNScheduleLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_LOADERROR', 500, true);
  }
}
export class TWNScheduleExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_EXPORTERROR', 500, true);
  }
}
export class TWNScheduleImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_IMPORTERROR', 500, true);
  }
}
export class TWNScheduleTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_TIMEOUTERROR', 504, true);
  }
}
export class TWNScheduleDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_DUPLICATEERROR', 409, true);
  }
}
export class TWNScheduleDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_DRAFTERROR', 500, true);
  }
}
export class TWNSchedulePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_PUBLISHERROR', 500, true);
  }
}
export class TWNScheduleArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_ARCHIVEERROR', 500, true);
  }
}
export class TWNScheduleRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_REVOKEERROR', 500, true);
  }
}
export class TWNScheduleShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_SHAREERROR', 500, true);
  }
}
export class TWNScheduleBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_BATCHERROR', 500, true);
  }
}
export class TWNScheduleBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNScheduleBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNScheduleReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_REVIEWERROR', 500, true);
  }
}
export class TWNScheduleReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNScheduleReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Schedule_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNArchiveLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_LOADERROR', 500, true);
  }
}
export class TWNArchiveExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_EXPORTERROR', 500, true);
  }
}
export class TWNArchiveImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_IMPORTERROR', 500, true);
  }
}
export class TWNArchiveTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_TIMEOUTERROR', 504, true);
  }
}
export class TWNArchiveDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_DUPLICATEERROR', 409, true);
  }
}
export class TWNArchiveDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_DRAFTERROR', 500, true);
  }
}
export class TWNArchivePublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_PUBLISHERROR', 500, true);
  }
}
export class TWNArchiveArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_ARCHIVEERROR', 500, true);
  }
}
export class TWNArchiveRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_REVOKEERROR', 500, true);
  }
}
export class TWNArchiveShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_SHAREERROR', 500, true);
  }
}
export class TWNArchiveBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_BATCHERROR', 500, true);
  }
}
export class TWNArchiveBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNArchiveBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNArchiveReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_REVIEWERROR', 500, true);
  }
}
export class TWNArchiveReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNArchiveReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Archive_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNWorkflowLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_LOADERROR', 500, true);
  }
}
export class TWNWorkflowExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_EXPORTERROR', 500, true);
  }
}
export class TWNWorkflowImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_IMPORTERROR', 500, true);
  }
}
export class TWNWorkflowTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_TIMEOUTERROR', 504, true);
  }
}
export class TWNWorkflowDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_DUPLICATEERROR', 409, true);
  }
}
export class TWNWorkflowDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_DRAFTERROR', 500, true);
  }
}
export class TWNWorkflowPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_PUBLISHERROR', 500, true);
  }
}
export class TWNWorkflowArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_ARCHIVEERROR', 500, true);
  }
}
export class TWNWorkflowRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_REVOKEERROR', 500, true);
  }
}
export class TWNWorkflowShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_SHAREERROR', 500, true);
  }
}
export class TWNWorkflowBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_BATCHERROR', 500, true);
  }
}
export class TWNWorkflowBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNWorkflowBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNWorkflowReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_REVIEWERROR', 500, true);
  }
}
export class TWNWorkflowReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNWorkflowReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Workflow_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNBatchLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_LOADERROR', 500, true);
  }
}
export class TWNBatchExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_EXPORTERROR', 500, true);
  }
}
export class TWNBatchImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_IMPORTERROR', 500, true);
  }
}
export class TWNBatchTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_TIMEOUTERROR', 504, true);
  }
}
export class TWNBatchDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_DUPLICATEERROR', 409, true);
  }
}
export class TWNBatchDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_DRAFTERROR', 500, true);
  }
}
export class TWNBatchPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_PUBLISHERROR', 500, true);
  }
}
export class TWNBatchArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_ARCHIVEERROR', 500, true);
  }
}
export class TWNBatchRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_REVOKEERROR', 500, true);
  }
}
export class TWNBatchShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_SHAREERROR', 500, true);
  }
}
export class TWNBatchBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_BATCHERROR', 500, true);
  }
}
export class TWNBatchBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNBatchBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNBatchReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_REVIEWERROR', 500, true);
  }
}
export class TWNBatchReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNBatchReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Batch_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNVersionLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_LOADERROR', 500, true);
  }
}
export class TWNVersionExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_EXPORTERROR', 500, true);
  }
}
export class TWNVersionImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_IMPORTERROR', 500, true);
  }
}
export class TWNVersionTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_TIMEOUTERROR', 504, true);
  }
}
export class TWNVersionDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_DUPLICATEERROR', 409, true);
  }
}
export class TWNVersionDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_DRAFTERROR', 500, true);
  }
}
export class TWNVersionPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_PUBLISHERROR', 500, true);
  }
}
export class TWNVersionArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_ARCHIVEERROR', 500, true);
  }
}
export class TWNVersionRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_REVOKEERROR', 500, true);
  }
}
export class TWNVersionShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_SHAREERROR', 500, true);
  }
}
export class TWNVersionBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_BATCHERROR', 500, true);
  }
}
export class TWNVersionBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNVersionBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNVersionReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_REVIEWERROR', 500, true);
  }
}
export class TWNVersionReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNVersionReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Version_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNTagLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_LOADERROR', 500, true);
  }
}
export class TWNTagExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_EXPORTERROR', 500, true);
  }
}
export class TWNTagImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_IMPORTERROR', 500, true);
  }
}
export class TWNTagTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_TIMEOUTERROR', 504, true);
  }
}
export class TWNTagDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_DUPLICATEERROR', 409, true);
  }
}
export class TWNTagDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_DRAFTERROR', 500, true);
  }
}
export class TWNTagPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_PUBLISHERROR', 500, true);
  }
}
export class TWNTagArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_ARCHIVEERROR', 500, true);
  }
}
export class TWNTagRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_REVOKEERROR', 500, true);
  }
}
export class TWNTagShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_SHAREERROR', 500, true);
  }
}
export class TWNTagBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_BATCHERROR', 500, true);
  }
}
export class TWNTagBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNTagBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNTagReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_REVIEWERROR', 500, true);
  }
}
export class TWNTagReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNTagReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Tag_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNCategoryLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_LOADERROR', 500, true);
  }
}
export class TWNCategoryExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_EXPORTERROR', 500, true);
  }
}
export class TWNCategoryImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_IMPORTERROR', 500, true);
  }
}
export class TWNCategoryTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_TIMEOUTERROR', 504, true);
  }
}
export class TWNCategoryDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_DUPLICATEERROR', 409, true);
  }
}
export class TWNCategoryDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_DRAFTERROR', 500, true);
  }
}
export class TWNCategoryPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_PUBLISHERROR', 500, true);
  }
}
export class TWNCategoryArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_ARCHIVEERROR', 500, true);
  }
}
export class TWNCategoryRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_REVOKEERROR', 500, true);
  }
}
export class TWNCategoryShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_SHAREERROR', 500, true);
  }
}
export class TWNCategoryBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_BATCHERROR', 500, true);
  }
}
export class TWNCategoryBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNCategoryBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNCategoryReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_REVIEWERROR', 500, true);
  }
}
export class TWNCategoryReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNCategoryReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Category_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNCommentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_LOADERROR', 500, true);
  }
}
export class TWNCommentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_EXPORTERROR', 500, true);
  }
}
export class TWNCommentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_IMPORTERROR', 500, true);
  }
}
export class TWNCommentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_TIMEOUTERROR', 504, true);
  }
}
export class TWNCommentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_DUPLICATEERROR', 409, true);
  }
}
export class TWNCommentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_DRAFTERROR', 500, true);
  }
}
export class TWNCommentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_PUBLISHERROR', 500, true);
  }
}
export class TWNCommentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_ARCHIVEERROR', 500, true);
  }
}
export class TWNCommentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_REVOKEERROR', 500, true);
  }
}
export class TWNCommentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_SHAREERROR', 500, true);
  }
}
export class TWNCommentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_BATCHERROR', 500, true);
  }
}
export class TWNCommentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNCommentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNCommentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_REVIEWERROR', 500, true);
  }
}
export class TWNCommentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNCommentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Comment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNAttachmentLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_LOADERROR', 500, true);
  }
}
export class TWNAttachmentExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_EXPORTERROR', 500, true);
  }
}
export class TWNAttachmentImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_IMPORTERROR', 500, true);
  }
}
export class TWNAttachmentTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_TIMEOUTERROR', 504, true);
  }
}
export class TWNAttachmentDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_DUPLICATEERROR', 409, true);
  }
}
export class TWNAttachmentDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_DRAFTERROR', 500, true);
  }
}
export class TWNAttachmentPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_PUBLISHERROR', 500, true);
  }
}
export class TWNAttachmentArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_ARCHIVEERROR', 500, true);
  }
}
export class TWNAttachmentRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_REVOKEERROR', 500, true);
  }
}
export class TWNAttachmentShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_SHAREERROR', 500, true);
  }
}
export class TWNAttachmentBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_BATCHERROR', 500, true);
  }
}
export class TWNAttachmentBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNAttachmentBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNAttachmentReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_REVIEWERROR', 500, true);
  }
}
export class TWNAttachmentReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNAttachmentReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Attachment_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNApprovalLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_LOADERROR', 500, true);
  }
}
export class TWNApprovalExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_EXPORTERROR', 500, true);
  }
}
export class TWNApprovalImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_IMPORTERROR', 500, true);
  }
}
export class TWNApprovalTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_TIMEOUTERROR', 504, true);
  }
}
export class TWNApprovalDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_DUPLICATEERROR', 409, true);
  }
}
export class TWNApprovalDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_DRAFTERROR', 500, true);
  }
}
export class TWNApprovalPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_PUBLISHERROR', 500, true);
  }
}
export class TWNApprovalArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_ARCHIVEERROR', 500, true);
  }
}
export class TWNApprovalRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_REVOKEERROR', 500, true);
  }
}
export class TWNApprovalShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_SHAREERROR', 500, true);
  }
}
export class TWNApprovalBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_BATCHERROR', 500, true);
  }
}
export class TWNApprovalBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNApprovalBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNApprovalReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_REVIEWERROR', 500, true);
  }
}
export class TWNApprovalReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNApprovalReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Approval_REVIEWVALIDATIONERROR', 422, true);
  }
}
export class TWNReviewLoadError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_LOADERROR', 500, true);
  }
}
export class TWNReviewExportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_EXPORTERROR', 500, true);
  }
}
export class TWNReviewImportError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_IMPORTERROR', 500, true);
  }
}
export class TWNReviewTimeoutError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_TIMEOUTERROR', 504, true);
  }
}
export class TWNReviewDuplicateError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_DUPLICATEERROR', 409, true);
  }
}
export class TWNReviewDraftError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_DRAFTERROR', 500, true);
  }
}
export class TWNReviewPublishError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_PUBLISHERROR', 500, true);
  }
}
export class TWNReviewArchiveError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_ARCHIVEERROR', 500, true);
  }
}
export class TWNReviewRevokeError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_REVOKEERROR', 500, true);
  }
}
export class TWNReviewShareError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_SHAREERROR', 500, true);
  }
}
export class TWNReviewBatchError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_BATCHERROR', 500, true);
  }
}
export class TWNReviewBatchAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_BATCHACCESSDENIEDERROR', 403, true);
  }
}
export class TWNReviewBatchValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_BATCHVALIDATIONERROR', 422, true);
  }
}
export class TWNReviewReviewError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_REVIEWERROR', 500, true);
  }
}
export class TWNReviewReviewAccessDeniedError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_REVIEWACCESSDENIEDERROR', 403, true);
  }
}
export class TWNReviewReviewValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GOV_TWN_Review_REVIEWVALIDATIONERROR', 422, true);
  }
}

