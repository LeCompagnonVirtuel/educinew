import { SupabaseClient } from '@supabase/supabase-js';
import {
  EduOSRuntimeManagerError,
  EduOSModuleRegistryError,
  EduOSServiceRegistryError,
  EduOSDynamicModuleLoaderError,
  EduOSPluginLoaderError,
  EduOSFeatureRegistryError,
  EduOSDependencyGraphError,
  EduOSBackgroundTaskError,
  EduOSSchedulerError,
  EduOSQueueManagerError,
  EduOSJobRunnerError,
  EduOSRuntimeConfigError,
  EduOSTenantRuntimeError,
  EduOSHealthManagerError,
  EduOSVisualWorkflowBuilderError,
  EduOSBPMNEngineError,
  EduOSStateMachineError,
  EduOSWorkflowConditionError,
  EduOSWorkflowBranchError,
  EduOSWorkflowLoopError,
  EduOSHumanApprovalError,
  EduOSWorkflowSLAError,
  EduOSWorkflowEscalationError,
  EduOSWorkflowRetryError,
  EduOSWorkflowRollbackError,
  EduOSWorkflowCompensationError,
  EduOSWorkflowTimerError,
  EduOSScheduledWorkflowError,
  EduOSWorkflowTemplateError,
  EduOSWorkflowVersioningError,
  EduOSWorkflowAuditTrailError,
  EduOSWorkflowInstanceError,
  EduOSNationalEducationIdentityError,
  EduOSStudentIdentityError,
  EduOSTeacherIdentityError,
  EduOSParentIdentityError,
  EduOSSchoolIdentityError,
  EduOSOrganizationIdentityError,
  EduOSIdentityFederationError,
  EduOSSSOConfigurationError,
  EduOSOAuthConfigurationError,
  EduOSSAMLConfigurationError,
  EduOSLDAPConfigurationError,
  EduOSBiometricIdentityError,
  EduOSQRIdentityError,
  EduOSNFCIdentityError,
  EduOSDigitalWalletIdentityError,
  EduOSIdentityVerificationError,
  EduOSIdentityConsentError,
  EduOSIdentityAccessLogError,
  EduOSIdentityEncryptionError,
  EduOSEducationWalletError,
  EduOSWalletCreditsError,
  EduOSScholarshipError,
  EduOSGovernmentGrantError,
  EduOSSubsidyError,
  EduOSLearningCreditsError,
  EduOSPaymentWalletError,
  EduOSDigitalCertificateWalletError,
  EduOSCredentialWalletError,
  EduOSWalletLedgerError,
  EduOSWalletTransactionError,
  EduOSWalletAnalyticsError,
  EduOSMarketplaceProductError,
  EduOSMarketplacePluginError,
  EduOSMarketplaceExtensionError,
  EduOSMarketplaceCourseError,
  EduOSMarketplaceBookError,
  EduOSMarketplaceAIModelError,
  EduOSMarketplaceTemplateError,
  EduOSMarketplaceServiceError,
  EduOSMarketplaceConsultantError,
  EduOSMarketplaceTutorError,
  EduOSDigitalProductError,
  EduOSProductSubscriptionError,
  EduOSProductReviewError,
  EduOSProductRatingError,
  EduOSProductLicenseError,
  EduOSMarketplaceAnalyticsError,
  EduOSProductCategoryEntityError,
  EduOSSellerProfileError,
  EduOSBoardError,
  EduOSBoardMeetingError,
  EduOSCommitteeError,
  EduOSVotingError,
  EduOSResolutionError,
  EduOSSchoolPolicyError,
  EduOSComplianceCheckError,
  EduOSLegalDocumentError,
  EduOSDecisionTrackingError,
  EduOSRiskRegisterError,
  EduOSInternalControlError,
  EduOSGovernanceAnalyticsError,
  EduOSSchoolRegistryError,
  EduOSTeacherRegistryError,
  EduOSStudentRegistryError,
  EduOSGraduateRegistryError,
  EduOSDiplomaRegistryError,
  EduOSCertificateRegistryEntryError,
  EduOSEmployerRegistryError,
  EduOSResearchRegistryError,
  EduOSInstitutionRegistryError,
  EduOSNationalAnalyticsRecordError,
  EduOSRegistrySearchQueryError,
  EduOSRegistryBulkImportError,
  EduOSRegistryExportError,
  EduOSCredentialBlockchainError,
  EduOSTranscriptBlockchainError,
  EduOSDiplomaLedgerError,
  EduOSAcademicLedgerError,
  EduOSCertificateLedgerError,
  EduOSVerificationPortalError,
  EduOSSmartContractError,
  EduOSImmutableAuditError,
  EduOSBlockchainExplorerError,
  EduOSBlockchainTransactionError,
  EduOSBlockchainAuditTrailError,
  EduOSIntegrationConnectorError,
  EduOSGoogleWorkspaceIntegrationError,
  EduOSMicrosoft365IntegrationError,
  EduOSGoogleClassroomIntegrationError,
  EduOSMicrosoftTeamsIntegrationError,
  EduOSVideoConferenceIntegrationError,
  EduOSMessagingIntegrationError,
  EduOSLMSIntegrationError,
  EduOSPaymentIntegrationError,
  EduOSMobileMoneyIntegrationError,
  EduOSCloudIntegrationError,
  EduOSCRMIntegrationError,
  EduOSAIServiceIntegrationError,
  EduOSIntegrationSyncLogError,
  EduOSIntegrationWebhookError,
  EduOSIntegrationAnalyticsError,
  EduOSIntegrationMappingError,
  EduOSAgentRegistryError,
  EduOSMultiAgentSystemError,
  EduOSPlanningEngineError,
  EduOSReasoningEngineError,
  EduOSContextEngineError,
  EduOSMemoryEngineError,
  EduOSKnowledgeGraphNodeError,
  EduOSKnowledgeGraphEdgeError,
  EduOSToolRegistryEntryError,
  EduOSTaskDelegationError,
  EduOSRAGOrchestratorError,
  EduOSDecisionEngineError,
  EduOSAIMonitoringError,
  EduOSAIModelRegistryError,
  EduOSAgentConversationError,
  EduOSDataMeshError,
  EduOSDataCatalogError,
  EduOSMetadataRecordError,
  EduOSMasterDataError,
  EduOSDataLineageError,
  EduOSDataGovernanceError,
  EduOSETLPipelineError,
  EduOSELTConfigurationError,
  EduOSDataStreamError,
  EduOSDataLakehouseError,
  EduOSDataWarehouseError,
  EduOSDataQualityReportError,
  EduOSDataMigrationJobError,
  EduOSAutomationBuilderError,
  EduOSEventTriggerError,
  EduOSBusinessRuleError,
  EduOSCronJobError,
  EduOSAutomationNotificationError,
  EduOSBatchProcessingJobError,
  EduOSLowCodeWorkflowError,
  EduOSNoCodeWorkflowError,
  EduOSAutomationAnalyticsError,
  EduOSAutomationExecutionError,
  EduOSAutomationTemplateError,
} from '@educi/errors';
import type {
  RuntimeManager, ModuleRegistry, ServiceRegistry, DynamicModuleLoader, PluginLoader,
  FeatureRegistry, DependencyGraph, BackgroundTask, Scheduler, QueueManager, JobRunner,
  RuntimeConfig, TenantRuntime, HealthManager, VisualWorkflowBuilder, BPMNEngine,
  StateMachine, WorkflowCondition, WorkflowBranch, WorkflowLoop, HumanApproval,
  WorkflowSLA, WorkflowEscalation, WorkflowRetry, WorkflowRollback, WorkflowCompensation,
  WorkflowTimer, ScheduledWorkflow, WorkflowTemplate, WorkflowVersioning, WorkflowAuditTrail,
  WorkflowInstance, NationalEducationIdentity, StudentIdentity, TeacherIdentity,
  ParentIdentity, SchoolIdentity, OrganizationIdentity, IdentityFederation, SSOConfiguration,
  OAuthConfiguration, SAMLConfiguration, LDAPConfiguration, BiometricIdentity, QRIdentity,
  NFCIdentity, DigitalWalletIdentity, IdentityVerification, IdentityConsent, IdentityAccessLog,
  IdentityEncryption, EducationWallet, WalletCredits, Scholarship, GovernmentGrant, Subsidy,
  LearningCredits, PaymentWallet, DigitalCertificateWallet, CredentialWallet, WalletLedger,
  WalletTransaction, WalletAnalytics, MarketplaceProduct, MarketplacePlugin, MarketplaceExtension,
  MarketplaceCourse, MarketplaceBook, MarketplaceAIModel, MarketplaceTemplate, MarketplaceService,
  MarketplaceConsultant, MarketplaceTutor, DigitalProduct, ProductSubscription, ProductReview,
  ProductRating, ProductLicense, MarketplaceAnalytics, ProductCategoryEntity, SellerProfile,
  Board, BoardMeeting, Committee, Voting, Resolution, SchoolPolicy, ComplianceCheck,
  LegalDocument, DecisionTracking, RiskRegister, InternalControl, GovernanceAnalytics,
  SchoolRegistry, TeacherRegistry, StudentRegistry, GraduateRegistry, DiplomaRegistry,
  CertificateRegistryEntry, EmployerRegistry, ResearchRegistry, InstitutionRegistry,
  NationalAnalyticsRecord, RegistrySearchQuery, RegistryBulkImport, RegistryExport,
  CredentialBlockchain, TranscriptBlockchain, DiplomaLedger, AcademicLedger, CertificateLedger,
  VerificationPortal, SmartContract, ImmutableAudit, BlockchainExplorer, BlockchainTransaction,
  BlockchainAuditTrail, IntegrationConnector, GoogleWorkspaceIntegration, Microsoft365Integration,
  GoogleClassroomIntegration, MicrosoftTeamsIntegration, VideoConferenceIntegration,
  MessagingIntegration, LMSIntegration, PaymentIntegration, MobileMoneyIntegration,
  CloudIntegration, CRMIntegration, AIServiceIntegration, IntegrationSyncLog, IntegrationWebhook,
  IntegrationAnalytics, IntegrationMapping, AgentRegistry, MultiAgentSystem, PlanningEngine,
  ReasoningEngine, ContextEngine, MemoryEngine, KnowledgeGraphNode, KnowledgeGraphEdge,
  ToolRegistryEntry, TaskDelegation, RAGOrchestrator, DecisionEngine, AIMonitoring,
  AIModelRegistry, AgentConversation, DataMesh, DataCatalog, MetadataRecord, MasterData,
  DataLineage, DataGovernance, ETLPipeline, ELTConfiguration, DataStream, DataLakehouse,
  DataWarehouse, DataQualityReport, DataMigrationJob, AutomationBuilder, EventTrigger,
  BusinessRule, CronJob, AutomationNotification, BatchProcessingJob, LowCodeWorkflow,
  NoCodeWorkflow, AutomationAnalytics, AutomationExecution, AutomationTemplate,
  DependencyNode, DependencyEdge, ResourceLimits, HealthCheck, WorkflowNode, WorkflowEdge,
  StateDefinition, StateTransition, BranchDefinition, WorkflowVariable, BoardMember, MeetingAgendaItem,
  MeetingAttendee, CommitteeMember, VoteOption, BlockchainEvent, ChainOfCustodyEntry,
  PlanningGoal, PlanningConstraint, ReasoningRule, AgentMessage, ToolCall,
  DataProduct, CatalogAsset, DataGovernanceRule, ETLTransformation, DataQualityIssue,
  AutomationNode, AutomationEdge, TriggerCondition, RuleCondition, RuleAction,
  NoCodeAction, AutomationVariable,
} from '@educi/types';

const now = () => new Date().toISOString();

export interface EduOSRepository {
  createRuntimeManager(schoolId: string, data: RuntimeManager): Promise<RuntimeManager>;
  getRuntimeManager(schoolId: string, id: string): Promise<RuntimeManager | null>;
  updateRuntimeManager(schoolId: string, id: string, data: Partial<RuntimeManager>): Promise<RuntimeManager>;
  deleteRuntimeManager(schoolId: string, id: string): Promise<void>;
  listRuntimeManager(schoolId: string, filters?: Record<string, unknown>): Promise<RuntimeManager[]>;
  createModuleRegistry(schoolId: string, data: ModuleRegistry): Promise<ModuleRegistry>;
  getModuleRegistry(schoolId: string, id: string): Promise<ModuleRegistry | null>;
  updateModuleRegistry(schoolId: string, id: string, data: Partial<ModuleRegistry>): Promise<ModuleRegistry>;
  deleteModuleRegistry(schoolId: string, id: string): Promise<void>;
  listModuleRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<ModuleRegistry[]>;
  createServiceRegistry(schoolId: string, data: ServiceRegistry): Promise<ServiceRegistry>;
  getServiceRegistry(schoolId: string, id: string): Promise<ServiceRegistry | null>;
  updateServiceRegistry(schoolId: string, id: string, data: Partial<ServiceRegistry>): Promise<ServiceRegistry>;
  deleteServiceRegistry(schoolId: string, id: string): Promise<void>;
  listServiceRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceRegistry[]>;
  createDynamicModuleLoader(schoolId: string, data: DynamicModuleLoader): Promise<DynamicModuleLoader>;
  getDynamicModuleLoader(schoolId: string, id: string): Promise<DynamicModuleLoader | null>;
  updateDynamicModuleLoader(schoolId: string, id: string, data: Partial<DynamicModuleLoader>): Promise<DynamicModuleLoader>;
  deleteDynamicModuleLoader(schoolId: string, id: string): Promise<void>;
  listDynamicModuleLoader(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicModuleLoader[]>;
  createPluginLoader(schoolId: string, data: PluginLoader): Promise<PluginLoader>;
  getPluginLoader(schoolId: string, id: string): Promise<PluginLoader | null>;
  updatePluginLoader(schoolId: string, id: string, data: Partial<PluginLoader>): Promise<PluginLoader>;
  deletePluginLoader(schoolId: string, id: string): Promise<void>;
  listPluginLoader(schoolId: string, filters?: Record<string, unknown>): Promise<PluginLoader[]>;
  createFeatureRegistry(schoolId: string, data: FeatureRegistry): Promise<FeatureRegistry>;
  getFeatureRegistry(schoolId: string, id: string): Promise<FeatureRegistry | null>;
  updateFeatureRegistry(schoolId: string, id: string, data: Partial<FeatureRegistry>): Promise<FeatureRegistry>;
  deleteFeatureRegistry(schoolId: string, id: string): Promise<void>;
  listFeatureRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureRegistry[]>;
  createDependencyGraph(schoolId: string, data: DependencyGraph): Promise<DependencyGraph>;
  getDependencyGraph(schoolId: string, id: string): Promise<DependencyGraph | null>;
  updateDependencyGraph(schoolId: string, id: string, data: Partial<DependencyGraph>): Promise<DependencyGraph>;
  deleteDependencyGraph(schoolId: string, id: string): Promise<void>;
  listDependencyGraph(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyGraph[]>;
  createBackgroundTask(schoolId: string, data: BackgroundTask): Promise<BackgroundTask>;
  getBackgroundTask(schoolId: string, id: string): Promise<BackgroundTask | null>;
  updateBackgroundTask(schoolId: string, id: string, data: Partial<BackgroundTask>): Promise<BackgroundTask>;
  deleteBackgroundTask(schoolId: string, id: string): Promise<void>;
  listBackgroundTask(schoolId: string, filters?: Record<string, unknown>): Promise<BackgroundTask[]>;
  createScheduler(schoolId: string, data: Scheduler): Promise<Scheduler>;
  getScheduler(schoolId: string, id: string): Promise<Scheduler | null>;
  updateScheduler(schoolId: string, id: string, data: Partial<Scheduler>): Promise<Scheduler>;
  deleteScheduler(schoolId: string, id: string): Promise<void>;
  listScheduler(schoolId: string, filters?: Record<string, unknown>): Promise<Scheduler[]>;
  createQueueManager(schoolId: string, data: QueueManager): Promise<QueueManager>;
  getQueueManager(schoolId: string, id: string): Promise<QueueManager | null>;
  updateQueueManager(schoolId: string, id: string, data: Partial<QueueManager>): Promise<QueueManager>;
  deleteQueueManager(schoolId: string, id: string): Promise<void>;
  listQueueManager(schoolId: string, filters?: Record<string, unknown>): Promise<QueueManager[]>;
  createJobRunner(schoolId: string, data: JobRunner): Promise<JobRunner>;
  getJobRunner(schoolId: string, id: string): Promise<JobRunner | null>;
  updateJobRunner(schoolId: string, id: string, data: Partial<JobRunner>): Promise<JobRunner>;
  deleteJobRunner(schoolId: string, id: string): Promise<void>;
  listJobRunner(schoolId: string, filters?: Record<string, unknown>): Promise<JobRunner[]>;
  createRuntimeConfig(schoolId: string, data: RuntimeConfig): Promise<RuntimeConfig>;
  getRuntimeConfig(schoolId: string, id: string): Promise<RuntimeConfig | null>;
  updateRuntimeConfig(schoolId: string, id: string, data: Partial<RuntimeConfig>): Promise<RuntimeConfig>;
  deleteRuntimeConfig(schoolId: string, id: string): Promise<void>;
  listRuntimeConfig(schoolId: string, filters?: Record<string, unknown>): Promise<RuntimeConfig[]>;
  createTenantRuntime(schoolId: string, data: TenantRuntime): Promise<TenantRuntime>;
  getTenantRuntime(schoolId: string, id: string): Promise<TenantRuntime | null>;
  updateTenantRuntime(schoolId: string, id: string, data: Partial<TenantRuntime>): Promise<TenantRuntime>;
  deleteTenantRuntime(schoolId: string, id: string): Promise<void>;
  listTenantRuntime(schoolId: string, filters?: Record<string, unknown>): Promise<TenantRuntime[]>;
  createHealthManager(schoolId: string, data: HealthManager): Promise<HealthManager>;
  getHealthManager(schoolId: string, id: string): Promise<HealthManager | null>;
  updateHealthManager(schoolId: string, id: string, data: Partial<HealthManager>): Promise<HealthManager>;
  deleteHealthManager(schoolId: string, id: string): Promise<void>;
  listHealthManager(schoolId: string, filters?: Record<string, unknown>): Promise<HealthManager[]>;
  createVisualWorkflowBuilder(schoolId: string, data: VisualWorkflowBuilder): Promise<VisualWorkflowBuilder>;
  getVisualWorkflowBuilder(schoolId: string, id: string): Promise<VisualWorkflowBuilder | null>;
  updateVisualWorkflowBuilder(schoolId: string, id: string, data: Partial<VisualWorkflowBuilder>): Promise<VisualWorkflowBuilder>;
  deleteVisualWorkflowBuilder(schoolId: string, id: string): Promise<void>;
  listVisualWorkflowBuilder(schoolId: string, filters?: Record<string, unknown>): Promise<VisualWorkflowBuilder[]>;
  createBPMNEngine(schoolId: string, data: BPMNEngine): Promise<BPMNEngine>;
  getBPMNEngine(schoolId: string, id: string): Promise<BPMNEngine | null>;
  updateBPMNEngine(schoolId: string, id: string, data: Partial<BPMNEngine>): Promise<BPMNEngine>;
  deleteBPMNEngine(schoolId: string, id: string): Promise<void>;
  listBPMNEngine(schoolId: string, filters?: Record<string, unknown>): Promise<BPMNEngine[]>;
  createStateMachine(schoolId: string, data: StateMachine): Promise<StateMachine>;
  getStateMachine(schoolId: string, id: string): Promise<StateMachine | null>;
  updateStateMachine(schoolId: string, id: string, data: Partial<StateMachine>): Promise<StateMachine>;
  deleteStateMachine(schoolId: string, id: string): Promise<void>;
  listStateMachine(schoolId: string, filters?: Record<string, unknown>): Promise<StateMachine[]>;
  createWorkflowCondition(schoolId: string, data: WorkflowCondition): Promise<WorkflowCondition>;
  getWorkflowCondition(schoolId: string, id: string): Promise<WorkflowCondition | null>;
  updateWorkflowCondition(schoolId: string, id: string, data: Partial<WorkflowCondition>): Promise<WorkflowCondition>;
  deleteWorkflowCondition(schoolId: string, id: string): Promise<void>;
  listWorkflowCondition(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowCondition[]>;
  createWorkflowBranch(schoolId: string, data: WorkflowBranch): Promise<WorkflowBranch>;
  getWorkflowBranch(schoolId: string, id: string): Promise<WorkflowBranch | null>;
  updateWorkflowBranch(schoolId: string, id: string, data: Partial<WorkflowBranch>): Promise<WorkflowBranch>;
  deleteWorkflowBranch(schoolId: string, id: string): Promise<void>;
  listWorkflowBranch(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowBranch[]>;
  createWorkflowLoop(schoolId: string, data: WorkflowLoop): Promise<WorkflowLoop>;
  getWorkflowLoop(schoolId: string, id: string): Promise<WorkflowLoop | null>;
  updateWorkflowLoop(schoolId: string, id: string, data: Partial<WorkflowLoop>): Promise<WorkflowLoop>;
  deleteWorkflowLoop(schoolId: string, id: string): Promise<void>;
  listWorkflowLoop(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowLoop[]>;
  createHumanApproval(schoolId: string, data: HumanApproval): Promise<HumanApproval>;
  getHumanApproval(schoolId: string, id: string): Promise<HumanApproval | null>;
  updateHumanApproval(schoolId: string, id: string, data: Partial<HumanApproval>): Promise<HumanApproval>;
  deleteHumanApproval(schoolId: string, id: string): Promise<void>;
  listHumanApproval(schoolId: string, filters?: Record<string, unknown>): Promise<HumanApproval[]>;
  createWorkflowSLA(schoolId: string, data: WorkflowSLA): Promise<WorkflowSLA>;
  getWorkflowSLA(schoolId: string, id: string): Promise<WorkflowSLA | null>;
  updateWorkflowSLA(schoolId: string, id: string, data: Partial<WorkflowSLA>): Promise<WorkflowSLA>;
  deleteWorkflowSLA(schoolId: string, id: string): Promise<void>;
  listWorkflowSLA(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowSLA[]>;
  createWorkflowEscalation(schoolId: string, data: WorkflowEscalation): Promise<WorkflowEscalation>;
  getWorkflowEscalation(schoolId: string, id: string): Promise<WorkflowEscalation | null>;
  updateWorkflowEscalation(schoolId: string, id: string, data: Partial<WorkflowEscalation>): Promise<WorkflowEscalation>;
  deleteWorkflowEscalation(schoolId: string, id: string): Promise<void>;
  listWorkflowEscalation(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEscalation[]>;
  createWorkflowRetry(schoolId: string, data: WorkflowRetry): Promise<WorkflowRetry>;
  getWorkflowRetry(schoolId: string, id: string): Promise<WorkflowRetry | null>;
  updateWorkflowRetry(schoolId: string, id: string, data: Partial<WorkflowRetry>): Promise<WorkflowRetry>;
  deleteWorkflowRetry(schoolId: string, id: string): Promise<void>;
  listWorkflowRetry(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRetry[]>;
  createWorkflowRollback(schoolId: string, data: WorkflowRollback): Promise<WorkflowRollback>;
  getWorkflowRollback(schoolId: string, id: string): Promise<WorkflowRollback | null>;
  updateWorkflowRollback(schoolId: string, id: string, data: Partial<WorkflowRollback>): Promise<WorkflowRollback>;
  deleteWorkflowRollback(schoolId: string, id: string): Promise<void>;
  listWorkflowRollback(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRollback[]>;
  createWorkflowCompensation(schoolId: string, data: WorkflowCompensation): Promise<WorkflowCompensation>;
  getWorkflowCompensation(schoolId: string, id: string): Promise<WorkflowCompensation | null>;
  updateWorkflowCompensation(schoolId: string, id: string, data: Partial<WorkflowCompensation>): Promise<WorkflowCompensation>;
  deleteWorkflowCompensation(schoolId: string, id: string): Promise<void>;
  listWorkflowCompensation(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowCompensation[]>;
  createWorkflowTimer(schoolId: string, data: WorkflowTimer): Promise<WorkflowTimer>;
  getWorkflowTimer(schoolId: string, id: string): Promise<WorkflowTimer | null>;
  updateWorkflowTimer(schoolId: string, id: string, data: Partial<WorkflowTimer>): Promise<WorkflowTimer>;
  deleteWorkflowTimer(schoolId: string, id: string): Promise<void>;
  listWorkflowTimer(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowTimer[]>;
  createScheduledWorkflow(schoolId: string, data: ScheduledWorkflow): Promise<ScheduledWorkflow>;
  getScheduledWorkflow(schoolId: string, id: string): Promise<ScheduledWorkflow | null>;
  updateScheduledWorkflow(schoolId: string, id: string, data: Partial<ScheduledWorkflow>): Promise<ScheduledWorkflow>;
  deleteScheduledWorkflow(schoolId: string, id: string): Promise<void>;
  listScheduledWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<ScheduledWorkflow[]>;
  createWorkflowTemplate(schoolId: string, data: WorkflowTemplate): Promise<WorkflowTemplate>;
  getWorkflowTemplate(schoolId: string, id: string): Promise<WorkflowTemplate | null>;
  updateWorkflowTemplate(schoolId: string, id: string, data: Partial<WorkflowTemplate>): Promise<WorkflowTemplate>;
  deleteWorkflowTemplate(schoolId: string, id: string): Promise<void>;
  listWorkflowTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowTemplate[]>;
  createWorkflowVersioning(schoolId: string, data: WorkflowVersioning): Promise<WorkflowVersioning>;
  getWorkflowVersioning(schoolId: string, id: string): Promise<WorkflowVersioning | null>;
  updateWorkflowVersioning(schoolId: string, id: string, data: Partial<WorkflowVersioning>): Promise<WorkflowVersioning>;
  deleteWorkflowVersioning(schoolId: string, id: string): Promise<void>;
  listWorkflowVersioning(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowVersioning[]>;
  createWorkflowAuditTrail(schoolId: string, data: WorkflowAuditTrail): Promise<WorkflowAuditTrail>;
  getWorkflowAuditTrail(schoolId: string, id: string): Promise<WorkflowAuditTrail | null>;
  updateWorkflowAuditTrail(schoolId: string, id: string, data: Partial<WorkflowAuditTrail>): Promise<WorkflowAuditTrail>;
  deleteWorkflowAuditTrail(schoolId: string, id: string): Promise<void>;
  listWorkflowAuditTrail(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowAuditTrail[]>;
  createWorkflowInstance(schoolId: string, data: WorkflowInstance): Promise<WorkflowInstance>;
  getWorkflowInstance(schoolId: string, id: string): Promise<WorkflowInstance | null>;
  updateWorkflowInstance(schoolId: string, id: string, data: Partial<WorkflowInstance>): Promise<WorkflowInstance>;
  deleteWorkflowInstance(schoolId: string, id: string): Promise<void>;
  listWorkflowInstance(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowInstance[]>;
  createNationalEducationIdentity(schoolId: string, data: NationalEducationIdentity): Promise<NationalEducationIdentity>;
  getNationalEducationIdentity(schoolId: string, id: string): Promise<NationalEducationIdentity | null>;
  updateNationalEducationIdentity(schoolId: string, id: string, data: Partial<NationalEducationIdentity>): Promise<NationalEducationIdentity>;
  deleteNationalEducationIdentity(schoolId: string, id: string): Promise<void>;
  listNationalEducationIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<NationalEducationIdentity[]>;
  createStudentIdentity(schoolId: string, data: StudentIdentity): Promise<StudentIdentity>;
  getStudentIdentity(schoolId: string, id: string): Promise<StudentIdentity | null>;
  updateStudentIdentity(schoolId: string, id: string, data: Partial<StudentIdentity>): Promise<StudentIdentity>;
  deleteStudentIdentity(schoolId: string, id: string): Promise<void>;
  listStudentIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<StudentIdentity[]>;
  createTeacherIdentity(schoolId: string, data: TeacherIdentity): Promise<TeacherIdentity>;
  getTeacherIdentity(schoolId: string, id: string): Promise<TeacherIdentity | null>;
  updateTeacherIdentity(schoolId: string, id: string, data: Partial<TeacherIdentity>): Promise<TeacherIdentity>;
  deleteTeacherIdentity(schoolId: string, id: string): Promise<void>;
  listTeacherIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherIdentity[]>;
  createParentIdentity(schoolId: string, data: ParentIdentity): Promise<ParentIdentity>;
  getParentIdentity(schoolId: string, id: string): Promise<ParentIdentity | null>;
  updateParentIdentity(schoolId: string, id: string, data: Partial<ParentIdentity>): Promise<ParentIdentity>;
  deleteParentIdentity(schoolId: string, id: string): Promise<void>;
  listParentIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<ParentIdentity[]>;
  createSchoolIdentity(schoolId: string, data: SchoolIdentity): Promise<SchoolIdentity>;
  getSchoolIdentity(schoolId: string, id: string): Promise<SchoolIdentity | null>;
  updateSchoolIdentity(schoolId: string, id: string, data: Partial<SchoolIdentity>): Promise<SchoolIdentity>;
  deleteSchoolIdentity(schoolId: string, id: string): Promise<void>;
  listSchoolIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolIdentity[]>;
  createOrganizationIdentity(schoolId: string, data: OrganizationIdentity): Promise<OrganizationIdentity>;
  getOrganizationIdentity(schoolId: string, id: string): Promise<OrganizationIdentity | null>;
  updateOrganizationIdentity(schoolId: string, id: string, data: Partial<OrganizationIdentity>): Promise<OrganizationIdentity>;
  deleteOrganizationIdentity(schoolId: string, id: string): Promise<void>;
  listOrganizationIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<OrganizationIdentity[]>;
  createIdentityFederation(schoolId: string, data: IdentityFederation): Promise<IdentityFederation>;
  getIdentityFederation(schoolId: string, id: string): Promise<IdentityFederation | null>;
  updateIdentityFederation(schoolId: string, id: string, data: Partial<IdentityFederation>): Promise<IdentityFederation>;
  deleteIdentityFederation(schoolId: string, id: string): Promise<void>;
  listIdentityFederation(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityFederation[]>;
  createSSOConfiguration(schoolId: string, data: SSOConfiguration): Promise<SSOConfiguration>;
  getSSOConfiguration(schoolId: string, id: string): Promise<SSOConfiguration | null>;
  updateSSOConfiguration(schoolId: string, id: string, data: Partial<SSOConfiguration>): Promise<SSOConfiguration>;
  deleteSSOConfiguration(schoolId: string, id: string): Promise<void>;
  listSSOConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<SSOConfiguration[]>;
  createOAuthConfiguration(schoolId: string, data: OAuthConfiguration): Promise<OAuthConfiguration>;
  getOAuthConfiguration(schoolId: string, id: string): Promise<OAuthConfiguration | null>;
  updateOAuthConfiguration(schoolId: string, id: string, data: Partial<OAuthConfiguration>): Promise<OAuthConfiguration>;
  deleteOAuthConfiguration(schoolId: string, id: string): Promise<void>;
  listOAuthConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<OAuthConfiguration[]>;
  createSAMLConfiguration(schoolId: string, data: SAMLConfiguration): Promise<SAMLConfiguration>;
  getSAMLConfiguration(schoolId: string, id: string): Promise<SAMLConfiguration | null>;
  updateSAMLConfiguration(schoolId: string, id: string, data: Partial<SAMLConfiguration>): Promise<SAMLConfiguration>;
  deleteSAMLConfiguration(schoolId: string, id: string): Promise<void>;
  listSAMLConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<SAMLConfiguration[]>;
  createLDAPConfiguration(schoolId: string, data: LDAPConfiguration): Promise<LDAPConfiguration>;
  getLDAPConfiguration(schoolId: string, id: string): Promise<LDAPConfiguration | null>;
  updateLDAPConfiguration(schoolId: string, id: string, data: Partial<LDAPConfiguration>): Promise<LDAPConfiguration>;
  deleteLDAPConfiguration(schoolId: string, id: string): Promise<void>;
  listLDAPConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<LDAPConfiguration[]>;
  createBiometricIdentity(schoolId: string, data: BiometricIdentity): Promise<BiometricIdentity>;
  getBiometricIdentity(schoolId: string, id: string): Promise<BiometricIdentity | null>;
  updateBiometricIdentity(schoolId: string, id: string, data: Partial<BiometricIdentity>): Promise<BiometricIdentity>;
  deleteBiometricIdentity(schoolId: string, id: string): Promise<void>;
  listBiometricIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricIdentity[]>;
  createQRIdentity(schoolId: string, data: QRIdentity): Promise<QRIdentity>;
  getQRIdentity(schoolId: string, id: string): Promise<QRIdentity | null>;
  updateQRIdentity(schoolId: string, id: string, data: Partial<QRIdentity>): Promise<QRIdentity>;
  deleteQRIdentity(schoolId: string, id: string): Promise<void>;
  listQRIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<QRIdentity[]>;
  createNFCIdentity(schoolId: string, data: NFCIdentity): Promise<NFCIdentity>;
  getNFCIdentity(schoolId: string, id: string): Promise<NFCIdentity | null>;
  updateNFCIdentity(schoolId: string, id: string, data: Partial<NFCIdentity>): Promise<NFCIdentity>;
  deleteNFCIdentity(schoolId: string, id: string): Promise<void>;
  listNFCIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<NFCIdentity[]>;
  createDigitalWalletIdentity(schoolId: string, data: DigitalWalletIdentity): Promise<DigitalWalletIdentity>;
  getDigitalWalletIdentity(schoolId: string, id: string): Promise<DigitalWalletIdentity | null>;
  updateDigitalWalletIdentity(schoolId: string, id: string, data: Partial<DigitalWalletIdentity>): Promise<DigitalWalletIdentity>;
  deleteDigitalWalletIdentity(schoolId: string, id: string): Promise<void>;
  listDigitalWalletIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalWalletIdentity[]>;
  createIdentityVerification(schoolId: string, data: IdentityVerification): Promise<IdentityVerification>;
  getIdentityVerification(schoolId: string, id: string): Promise<IdentityVerification | null>;
  updateIdentityVerification(schoolId: string, id: string, data: Partial<IdentityVerification>): Promise<IdentityVerification>;
  deleteIdentityVerification(schoolId: string, id: string): Promise<void>;
  listIdentityVerification(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]>;
  createIdentityConsent(schoolId: string, data: IdentityConsent): Promise<IdentityConsent>;
  getIdentityConsent(schoolId: string, id: string): Promise<IdentityConsent | null>;
  updateIdentityConsent(schoolId: string, id: string, data: Partial<IdentityConsent>): Promise<IdentityConsent>;
  deleteIdentityConsent(schoolId: string, id: string): Promise<void>;
  listIdentityConsent(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityConsent[]>;
  createIdentityAccessLog(schoolId: string, data: IdentityAccessLog): Promise<IdentityAccessLog>;
  getIdentityAccessLog(schoolId: string, id: string): Promise<IdentityAccessLog | null>;
  updateIdentityAccessLog(schoolId: string, id: string, data: Partial<IdentityAccessLog>): Promise<IdentityAccessLog>;
  deleteIdentityAccessLog(schoolId: string, id: string): Promise<void>;
  listIdentityAccessLog(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAccessLog[]>;
  createIdentityEncryption(schoolId: string, data: IdentityEncryption): Promise<IdentityEncryption>;
  getIdentityEncryption(schoolId: string, id: string): Promise<IdentityEncryption | null>;
  updateIdentityEncryption(schoolId: string, id: string, data: Partial<IdentityEncryption>): Promise<IdentityEncryption>;
  deleteIdentityEncryption(schoolId: string, id: string): Promise<void>;
  listIdentityEncryption(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityEncryption[]>;
  createEducationWallet(schoolId: string, data: EducationWallet): Promise<EducationWallet>;
  getEducationWallet(schoolId: string, id: string): Promise<EducationWallet | null>;
  updateEducationWallet(schoolId: string, id: string, data: Partial<EducationWallet>): Promise<EducationWallet>;
  deleteEducationWallet(schoolId: string, id: string): Promise<void>;
  listEducationWallet(schoolId: string, filters?: Record<string, unknown>): Promise<EducationWallet[]>;
  createWalletCredits(schoolId: string, data: WalletCredits): Promise<WalletCredits>;
  getWalletCredits(schoolId: string, id: string): Promise<WalletCredits | null>;
  updateWalletCredits(schoolId: string, id: string, data: Partial<WalletCredits>): Promise<WalletCredits>;
  deleteWalletCredits(schoolId: string, id: string): Promise<void>;
  listWalletCredits(schoolId: string, filters?: Record<string, unknown>): Promise<WalletCredits[]>;
  createScholarship(schoolId: string, data: Scholarship): Promise<Scholarship>;
  getScholarship(schoolId: string, id: string): Promise<Scholarship | null>;
  updateScholarship(schoolId: string, id: string, data: Partial<Scholarship>): Promise<Scholarship>;
  deleteScholarship(schoolId: string, id: string): Promise<void>;
  listScholarship(schoolId: string, filters?: Record<string, unknown>): Promise<Scholarship[]>;
  createGovernmentGrant(schoolId: string, data: GovernmentGrant): Promise<GovernmentGrant>;
  getGovernmentGrant(schoolId: string, id: string): Promise<GovernmentGrant | null>;
  updateGovernmentGrant(schoolId: string, id: string, data: Partial<GovernmentGrant>): Promise<GovernmentGrant>;
  deleteGovernmentGrant(schoolId: string, id: string): Promise<void>;
  listGovernmentGrant(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentGrant[]>;
  createSubsidy(schoolId: string, data: Subsidy): Promise<Subsidy>;
  getSubsidy(schoolId: string, id: string): Promise<Subsidy | null>;
  updateSubsidy(schoolId: string, id: string, data: Partial<Subsidy>): Promise<Subsidy>;
  deleteSubsidy(schoolId: string, id: string): Promise<void>;
  listSubsidy(schoolId: string, filters?: Record<string, unknown>): Promise<Subsidy[]>;
  createLearningCredits(schoolId: string, data: LearningCredits): Promise<LearningCredits>;
  getLearningCredits(schoolId: string, id: string): Promise<LearningCredits | null>;
  updateLearningCredits(schoolId: string, id: string, data: Partial<LearningCredits>): Promise<LearningCredits>;
  deleteLearningCredits(schoolId: string, id: string): Promise<void>;
  listLearningCredits(schoolId: string, filters?: Record<string, unknown>): Promise<LearningCredits[]>;
  createPaymentWallet(schoolId: string, data: PaymentWallet): Promise<PaymentWallet>;
  getPaymentWallet(schoolId: string, id: string): Promise<PaymentWallet | null>;
  updatePaymentWallet(schoolId: string, id: string, data: Partial<PaymentWallet>): Promise<PaymentWallet>;
  deletePaymentWallet(schoolId: string, id: string): Promise<void>;
  listPaymentWallet(schoolId: string, filters?: Record<string, unknown>): Promise<PaymentWallet[]>;
  createDigitalCertificateWallet(schoolId: string, data: DigitalCertificateWallet): Promise<DigitalCertificateWallet>;
  getDigitalCertificateWallet(schoolId: string, id: string): Promise<DigitalCertificateWallet | null>;
  updateDigitalCertificateWallet(schoolId: string, id: string, data: Partial<DigitalCertificateWallet>): Promise<DigitalCertificateWallet>;
  deleteDigitalCertificateWallet(schoolId: string, id: string): Promise<void>;
  listDigitalCertificateWallet(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificateWallet[]>;
  createCredentialWallet(schoolId: string, data: CredentialWallet): Promise<CredentialWallet>;
  getCredentialWallet(schoolId: string, id: string): Promise<CredentialWallet | null>;
  updateCredentialWallet(schoolId: string, id: string, data: Partial<CredentialWallet>): Promise<CredentialWallet>;
  deleteCredentialWallet(schoolId: string, id: string): Promise<void>;
  listCredentialWallet(schoolId: string, filters?: Record<string, unknown>): Promise<CredentialWallet[]>;
  createWalletLedger(schoolId: string, data: WalletLedger): Promise<WalletLedger>;
  getWalletLedger(schoolId: string, id: string): Promise<WalletLedger | null>;
  updateWalletLedger(schoolId: string, id: string, data: Partial<WalletLedger>): Promise<WalletLedger>;
  deleteWalletLedger(schoolId: string, id: string): Promise<void>;
  listWalletLedger(schoolId: string, filters?: Record<string, unknown>): Promise<WalletLedger[]>;
  createWalletTransaction(schoolId: string, data: WalletTransaction): Promise<WalletTransaction>;
  getWalletTransaction(schoolId: string, id: string): Promise<WalletTransaction | null>;
  updateWalletTransaction(schoolId: string, id: string, data: Partial<WalletTransaction>): Promise<WalletTransaction>;
  deleteWalletTransaction(schoolId: string, id: string): Promise<void>;
  listWalletTransaction(schoolId: string, filters?: Record<string, unknown>): Promise<WalletTransaction[]>;
  createWalletAnalytics(schoolId: string, data: WalletAnalytics): Promise<WalletAnalytics>;
  getWalletAnalytics(schoolId: string, id: string): Promise<WalletAnalytics | null>;
  updateWalletAnalytics(schoolId: string, id: string, data: Partial<WalletAnalytics>): Promise<WalletAnalytics>;
  deleteWalletAnalytics(schoolId: string, id: string): Promise<void>;
  listWalletAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<WalletAnalytics[]>;
  createMarketplaceProduct(schoolId: string, data: MarketplaceProduct): Promise<MarketplaceProduct>;
  getMarketplaceProduct(schoolId: string, id: string): Promise<MarketplaceProduct | null>;
  updateMarketplaceProduct(schoolId: string, id: string, data: Partial<MarketplaceProduct>): Promise<MarketplaceProduct>;
  deleteMarketplaceProduct(schoolId: string, id: string): Promise<void>;
  listMarketplaceProduct(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceProduct[]>;
  createMarketplacePlugin(schoolId: string, data: MarketplacePlugin): Promise<MarketplacePlugin>;
  getMarketplacePlugin(schoolId: string, id: string): Promise<MarketplacePlugin | null>;
  updateMarketplacePlugin(schoolId: string, id: string, data: Partial<MarketplacePlugin>): Promise<MarketplacePlugin>;
  deleteMarketplacePlugin(schoolId: string, id: string): Promise<void>;
  listMarketplacePlugin(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplacePlugin[]>;
  createMarketplaceExtension(schoolId: string, data: MarketplaceExtension): Promise<MarketplaceExtension>;
  getMarketplaceExtension(schoolId: string, id: string): Promise<MarketplaceExtension | null>;
  updateMarketplaceExtension(schoolId: string, id: string, data: Partial<MarketplaceExtension>): Promise<MarketplaceExtension>;
  deleteMarketplaceExtension(schoolId: string, id: string): Promise<void>;
  listMarketplaceExtension(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceExtension[]>;
  createMarketplaceCourse(schoolId: string, data: MarketplaceCourse): Promise<MarketplaceCourse>;
  getMarketplaceCourse(schoolId: string, id: string): Promise<MarketplaceCourse | null>;
  updateMarketplaceCourse(schoolId: string, id: string, data: Partial<MarketplaceCourse>): Promise<MarketplaceCourse>;
  deleteMarketplaceCourse(schoolId: string, id: string): Promise<void>;
  listMarketplaceCourse(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceCourse[]>;
  createMarketplaceBook(schoolId: string, data: MarketplaceBook): Promise<MarketplaceBook>;
  getMarketplaceBook(schoolId: string, id: string): Promise<MarketplaceBook | null>;
  updateMarketplaceBook(schoolId: string, id: string, data: Partial<MarketplaceBook>): Promise<MarketplaceBook>;
  deleteMarketplaceBook(schoolId: string, id: string): Promise<void>;
  listMarketplaceBook(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceBook[]>;
  createMarketplaceAIModel(schoolId: string, data: MarketplaceAIModel): Promise<MarketplaceAIModel>;
  getMarketplaceAIModel(schoolId: string, id: string): Promise<MarketplaceAIModel | null>;
  updateMarketplaceAIModel(schoolId: string, id: string, data: Partial<MarketplaceAIModel>): Promise<MarketplaceAIModel>;
  deleteMarketplaceAIModel(schoolId: string, id: string): Promise<void>;
  listMarketplaceAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceAIModel[]>;
  createMarketplaceTemplate(schoolId: string, data: MarketplaceTemplate): Promise<MarketplaceTemplate>;
  getMarketplaceTemplate(schoolId: string, id: string): Promise<MarketplaceTemplate | null>;
  updateMarketplaceTemplate(schoolId: string, id: string, data: Partial<MarketplaceTemplate>): Promise<MarketplaceTemplate>;
  deleteMarketplaceTemplate(schoolId: string, id: string): Promise<void>;
  listMarketplaceTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceTemplate[]>;
  createMarketplaceService(schoolId: string, data: MarketplaceService): Promise<MarketplaceService>;
  getMarketplaceService(schoolId: string, id: string): Promise<MarketplaceService | null>;
  updateMarketplaceService(schoolId: string, id: string, data: Partial<MarketplaceService>): Promise<MarketplaceService>;
  deleteMarketplaceService(schoolId: string, id: string): Promise<void>;
  listMarketplaceService(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceService[]>;
  createMarketplaceConsultant(schoolId: string, data: MarketplaceConsultant): Promise<MarketplaceConsultant>;
  getMarketplaceConsultant(schoolId: string, id: string): Promise<MarketplaceConsultant | null>;
  updateMarketplaceConsultant(schoolId: string, id: string, data: Partial<MarketplaceConsultant>): Promise<MarketplaceConsultant>;
  deleteMarketplaceConsultant(schoolId: string, id: string): Promise<void>;
  listMarketplaceConsultant(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceConsultant[]>;
  createMarketplaceTutor(schoolId: string, data: MarketplaceTutor): Promise<MarketplaceTutor>;
  getMarketplaceTutor(schoolId: string, id: string): Promise<MarketplaceTutor | null>;
  updateMarketplaceTutor(schoolId: string, id: string, data: Partial<MarketplaceTutor>): Promise<MarketplaceTutor>;
  deleteMarketplaceTutor(schoolId: string, id: string): Promise<void>;
  listMarketplaceTutor(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceTutor[]>;
  createDigitalProduct(schoolId: string, data: DigitalProduct): Promise<DigitalProduct>;
  getDigitalProduct(schoolId: string, id: string): Promise<DigitalProduct | null>;
  updateDigitalProduct(schoolId: string, id: string, data: Partial<DigitalProduct>): Promise<DigitalProduct>;
  deleteDigitalProduct(schoolId: string, id: string): Promise<void>;
  listDigitalProduct(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalProduct[]>;
  createProductSubscription(schoolId: string, data: ProductSubscription): Promise<ProductSubscription>;
  getProductSubscription(schoolId: string, id: string): Promise<ProductSubscription | null>;
  updateProductSubscription(schoolId: string, id: string, data: Partial<ProductSubscription>): Promise<ProductSubscription>;
  deleteProductSubscription(schoolId: string, id: string): Promise<void>;
  listProductSubscription(schoolId: string, filters?: Record<string, unknown>): Promise<ProductSubscription[]>;
  createProductReview(schoolId: string, data: ProductReview): Promise<ProductReview>;
  getProductReview(schoolId: string, id: string): Promise<ProductReview | null>;
  updateProductReview(schoolId: string, id: string, data: Partial<ProductReview>): Promise<ProductReview>;
  deleteProductReview(schoolId: string, id: string): Promise<void>;
  listProductReview(schoolId: string, filters?: Record<string, unknown>): Promise<ProductReview[]>;
  createProductRating(schoolId: string, data: ProductRating): Promise<ProductRating>;
  getProductRating(schoolId: string, id: string): Promise<ProductRating | null>;
  updateProductRating(schoolId: string, id: string, data: Partial<ProductRating>): Promise<ProductRating>;
  deleteProductRating(schoolId: string, id: string): Promise<void>;
  listProductRating(schoolId: string, filters?: Record<string, unknown>): Promise<ProductRating[]>;
  createProductLicense(schoolId: string, data: ProductLicense): Promise<ProductLicense>;
  getProductLicense(schoolId: string, id: string): Promise<ProductLicense | null>;
  updateProductLicense(schoolId: string, id: string, data: Partial<ProductLicense>): Promise<ProductLicense>;
  deleteProductLicense(schoolId: string, id: string): Promise<void>;
  listProductLicense(schoolId: string, filters?: Record<string, unknown>): Promise<ProductLicense[]>;
  createMarketplaceAnalytics(schoolId: string, data: MarketplaceAnalytics): Promise<MarketplaceAnalytics>;
  getMarketplaceAnalytics(schoolId: string, id: string): Promise<MarketplaceAnalytics | null>;
  updateMarketplaceAnalytics(schoolId: string, id: string, data: Partial<MarketplaceAnalytics>): Promise<MarketplaceAnalytics>;
  deleteMarketplaceAnalytics(schoolId: string, id: string): Promise<void>;
  listMarketplaceAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceAnalytics[]>;
  createProductCategoryEntity(schoolId: string, data: ProductCategoryEntity): Promise<ProductCategoryEntity>;
  getProductCategoryEntity(schoolId: string, id: string): Promise<ProductCategoryEntity | null>;
  updateProductCategoryEntity(schoolId: string, id: string, data: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity>;
  deleteProductCategoryEntity(schoolId: string, id: string): Promise<void>;
  listProductCategoryEntity(schoolId: string, filters?: Record<string, unknown>): Promise<ProductCategoryEntity[]>;
  createSellerProfile(schoolId: string, data: SellerProfile): Promise<SellerProfile>;
  getSellerProfile(schoolId: string, id: string): Promise<SellerProfile | null>;
  updateSellerProfile(schoolId: string, id: string, data: Partial<SellerProfile>): Promise<SellerProfile>;
  deleteSellerProfile(schoolId: string, id: string): Promise<void>;
  listSellerProfile(schoolId: string, filters?: Record<string, unknown>): Promise<SellerProfile[]>;
  createBoard(schoolId: string, data: Board): Promise<Board>;
  getBoard(schoolId: string, id: string): Promise<Board | null>;
  updateBoard(schoolId: string, id: string, data: Partial<Board>): Promise<Board>;
  deleteBoard(schoolId: string, id: string): Promise<void>;
  listBoard(schoolId: string, filters?: Record<string, unknown>): Promise<Board[]>;
  createBoardMeeting(schoolId: string, data: BoardMeeting): Promise<BoardMeeting>;
  getBoardMeeting(schoolId: string, id: string): Promise<BoardMeeting | null>;
  updateBoardMeeting(schoolId: string, id: string, data: Partial<BoardMeeting>): Promise<BoardMeeting>;
  deleteBoardMeeting(schoolId: string, id: string): Promise<void>;
  listBoardMeeting(schoolId: string, filters?: Record<string, unknown>): Promise<BoardMeeting[]>;
  createCommittee(schoolId: string, data: Committee): Promise<Committee>;
  getCommittee(schoolId: string, id: string): Promise<Committee | null>;
  updateCommittee(schoolId: string, id: string, data: Partial<Committee>): Promise<Committee>;
  deleteCommittee(schoolId: string, id: string): Promise<void>;
  listCommittee(schoolId: string, filters?: Record<string, unknown>): Promise<Committee[]>;
  createVoting(schoolId: string, data: Voting): Promise<Voting>;
  getVoting(schoolId: string, id: string): Promise<Voting | null>;
  updateVoting(schoolId: string, id: string, data: Partial<Voting>): Promise<Voting>;
  deleteVoting(schoolId: string, id: string): Promise<void>;
  listVoting(schoolId: string, filters?: Record<string, unknown>): Promise<Voting[]>;
  createResolution(schoolId: string, data: Resolution): Promise<Resolution>;
  getResolution(schoolId: string, id: string): Promise<Resolution | null>;
  updateResolution(schoolId: string, id: string, data: Partial<Resolution>): Promise<Resolution>;
  deleteResolution(schoolId: string, id: string): Promise<void>;
  listResolution(schoolId: string, filters?: Record<string, unknown>): Promise<Resolution[]>;
  createSchoolPolicy(schoolId: string, data: SchoolPolicy): Promise<SchoolPolicy>;
  getSchoolPolicy(schoolId: string, id: string): Promise<SchoolPolicy | null>;
  updateSchoolPolicy(schoolId: string, id: string, data: Partial<SchoolPolicy>): Promise<SchoolPolicy>;
  deleteSchoolPolicy(schoolId: string, id: string): Promise<void>;
  listSchoolPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolPolicy[]>;
  createComplianceCheck(schoolId: string, data: ComplianceCheck): Promise<ComplianceCheck>;
  getComplianceCheck(schoolId: string, id: string): Promise<ComplianceCheck | null>;
  updateComplianceCheck(schoolId: string, id: string, data: Partial<ComplianceCheck>): Promise<ComplianceCheck>;
  deleteComplianceCheck(schoolId: string, id: string): Promise<void>;
  listComplianceCheck(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceCheck[]>;
  createLegalDocument(schoolId: string, data: LegalDocument): Promise<LegalDocument>;
  getLegalDocument(schoolId: string, id: string): Promise<LegalDocument | null>;
  updateLegalDocument(schoolId: string, id: string, data: Partial<LegalDocument>): Promise<LegalDocument>;
  deleteLegalDocument(schoolId: string, id: string): Promise<void>;
  listLegalDocument(schoolId: string, filters?: Record<string, unknown>): Promise<LegalDocument[]>;
  createDecisionTracking(schoolId: string, data: DecisionTracking): Promise<DecisionTracking>;
  getDecisionTracking(schoolId: string, id: string): Promise<DecisionTracking | null>;
  updateDecisionTracking(schoolId: string, id: string, data: Partial<DecisionTracking>): Promise<DecisionTracking>;
  deleteDecisionTracking(schoolId: string, id: string): Promise<void>;
  listDecisionTracking(schoolId: string, filters?: Record<string, unknown>): Promise<DecisionTracking[]>;
  createRiskRegister(schoolId: string, data: RiskRegister): Promise<RiskRegister>;
  getRiskRegister(schoolId: string, id: string): Promise<RiskRegister | null>;
  updateRiskRegister(schoolId: string, id: string, data: Partial<RiskRegister>): Promise<RiskRegister>;
  deleteRiskRegister(schoolId: string, id: string): Promise<void>;
  listRiskRegister(schoolId: string, filters?: Record<string, unknown>): Promise<RiskRegister[]>;
  createInternalControl(schoolId: string, data: InternalControl): Promise<InternalControl>;
  getInternalControl(schoolId: string, id: string): Promise<InternalControl | null>;
  updateInternalControl(schoolId: string, id: string, data: Partial<InternalControl>): Promise<InternalControl>;
  deleteInternalControl(schoolId: string, id: string): Promise<void>;
  listInternalControl(schoolId: string, filters?: Record<string, unknown>): Promise<InternalControl[]>;
  createGovernanceAnalytics(schoolId: string, data: GovernanceAnalytics): Promise<GovernanceAnalytics>;
  getGovernanceAnalytics(schoolId: string, id: string): Promise<GovernanceAnalytics | null>;
  updateGovernanceAnalytics(schoolId: string, id: string, data: Partial<GovernanceAnalytics>): Promise<GovernanceAnalytics>;
  deleteGovernanceAnalytics(schoolId: string, id: string): Promise<void>;
  listGovernanceAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<GovernanceAnalytics[]>;
  createSchoolRegistry(schoolId: string, data: SchoolRegistry): Promise<SchoolRegistry>;
  getSchoolRegistry(schoolId: string, id: string): Promise<SchoolRegistry | null>;
  updateSchoolRegistry(schoolId: string, id: string, data: Partial<SchoolRegistry>): Promise<SchoolRegistry>;
  deleteSchoolRegistry(schoolId: string, id: string): Promise<void>;
  listSchoolRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRegistry[]>;
  createTeacherRegistry(schoolId: string, data: TeacherRegistry): Promise<TeacherRegistry>;
  getTeacherRegistry(schoolId: string, id: string): Promise<TeacherRegistry | null>;
  updateTeacherRegistry(schoolId: string, id: string, data: Partial<TeacherRegistry>): Promise<TeacherRegistry>;
  deleteTeacherRegistry(schoolId: string, id: string): Promise<void>;
  listTeacherRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherRegistry[]>;
  createStudentRegistry(schoolId: string, data: StudentRegistry): Promise<StudentRegistry>;
  getStudentRegistry(schoolId: string, id: string): Promise<StudentRegistry | null>;
  updateStudentRegistry(schoolId: string, id: string, data: Partial<StudentRegistry>): Promise<StudentRegistry>;
  deleteStudentRegistry(schoolId: string, id: string): Promise<void>;
  listStudentRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRegistry[]>;
  createGraduateRegistry(schoolId: string, data: GraduateRegistry): Promise<GraduateRegistry>;
  getGraduateRegistry(schoolId: string, id: string): Promise<GraduateRegistry | null>;
  updateGraduateRegistry(schoolId: string, id: string, data: Partial<GraduateRegistry>): Promise<GraduateRegistry>;
  deleteGraduateRegistry(schoolId: string, id: string): Promise<void>;
  listGraduateRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<GraduateRegistry[]>;
  createDiplomaRegistry(schoolId: string, data: DiplomaRegistry): Promise<DiplomaRegistry>;
  getDiplomaRegistry(schoolId: string, id: string): Promise<DiplomaRegistry | null>;
  updateDiplomaRegistry(schoolId: string, id: string, data: Partial<DiplomaRegistry>): Promise<DiplomaRegistry>;
  deleteDiplomaRegistry(schoolId: string, id: string): Promise<void>;
  listDiplomaRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<DiplomaRegistry[]>;
  createCertificateRegistryEntry(schoolId: string, data: CertificateRegistryEntry): Promise<CertificateRegistryEntry>;
  getCertificateRegistryEntry(schoolId: string, id: string): Promise<CertificateRegistryEntry | null>;
  updateCertificateRegistryEntry(schoolId: string, id: string, data: Partial<CertificateRegistryEntry>): Promise<CertificateRegistryEntry>;
  deleteCertificateRegistryEntry(schoolId: string, id: string): Promise<void>;
  listCertificateRegistryEntry(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRegistryEntry[]>;
  createEmployerRegistry(schoolId: string, data: EmployerRegistry): Promise<EmployerRegistry>;
  getEmployerRegistry(schoolId: string, id: string): Promise<EmployerRegistry | null>;
  updateEmployerRegistry(schoolId: string, id: string, data: Partial<EmployerRegistry>): Promise<EmployerRegistry>;
  deleteEmployerRegistry(schoolId: string, id: string): Promise<void>;
  listEmployerRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<EmployerRegistry[]>;
  createResearchRegistry(schoolId: string, data: ResearchRegistry): Promise<ResearchRegistry>;
  getResearchRegistry(schoolId: string, id: string): Promise<ResearchRegistry | null>;
  updateResearchRegistry(schoolId: string, id: string, data: Partial<ResearchRegistry>): Promise<ResearchRegistry>;
  deleteResearchRegistry(schoolId: string, id: string): Promise<void>;
  listResearchRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchRegistry[]>;
  createInstitutionRegistry(schoolId: string, data: InstitutionRegistry): Promise<InstitutionRegistry>;
  getInstitutionRegistry(schoolId: string, id: string): Promise<InstitutionRegistry | null>;
  updateInstitutionRegistry(schoolId: string, id: string, data: Partial<InstitutionRegistry>): Promise<InstitutionRegistry>;
  deleteInstitutionRegistry(schoolId: string, id: string): Promise<void>;
  listInstitutionRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<InstitutionRegistry[]>;
  createNationalAnalyticsRecord(schoolId: string, data: NationalAnalyticsRecord): Promise<NationalAnalyticsRecord>;
  getNationalAnalyticsRecord(schoolId: string, id: string): Promise<NationalAnalyticsRecord | null>;
  updateNationalAnalyticsRecord(schoolId: string, id: string, data: Partial<NationalAnalyticsRecord>): Promise<NationalAnalyticsRecord>;
  deleteNationalAnalyticsRecord(schoolId: string, id: string): Promise<void>;
  listNationalAnalyticsRecord(schoolId: string, filters?: Record<string, unknown>): Promise<NationalAnalyticsRecord[]>;
  createRegistrySearchQuery(schoolId: string, data: RegistrySearchQuery): Promise<RegistrySearchQuery>;
  getRegistrySearchQuery(schoolId: string, id: string): Promise<RegistrySearchQuery | null>;
  updateRegistrySearchQuery(schoolId: string, id: string, data: Partial<RegistrySearchQuery>): Promise<RegistrySearchQuery>;
  deleteRegistrySearchQuery(schoolId: string, id: string): Promise<void>;
  listRegistrySearchQuery(schoolId: string, filters?: Record<string, unknown>): Promise<RegistrySearchQuery[]>;
  createRegistryBulkImport(schoolId: string, data: RegistryBulkImport): Promise<RegistryBulkImport>;
  getRegistryBulkImport(schoolId: string, id: string): Promise<RegistryBulkImport | null>;
  updateRegistryBulkImport(schoolId: string, id: string, data: Partial<RegistryBulkImport>): Promise<RegistryBulkImport>;
  deleteRegistryBulkImport(schoolId: string, id: string): Promise<void>;
  listRegistryBulkImport(schoolId: string, filters?: Record<string, unknown>): Promise<RegistryBulkImport[]>;
  createRegistryExport(schoolId: string, data: RegistryExport): Promise<RegistryExport>;
  getRegistryExport(schoolId: string, id: string): Promise<RegistryExport | null>;
  updateRegistryExport(schoolId: string, id: string, data: Partial<RegistryExport>): Promise<RegistryExport>;
  deleteRegistryExport(schoolId: string, id: string): Promise<void>;
  listRegistryExport(schoolId: string, filters?: Record<string, unknown>): Promise<RegistryExport[]>;
  createCredentialBlockchain(schoolId: string, data: CredentialBlockchain): Promise<CredentialBlockchain>;
  getCredentialBlockchain(schoolId: string, id: string): Promise<CredentialBlockchain | null>;
  updateCredentialBlockchain(schoolId: string, id: string, data: Partial<CredentialBlockchain>): Promise<CredentialBlockchain>;
  deleteCredentialBlockchain(schoolId: string, id: string): Promise<void>;
  listCredentialBlockchain(schoolId: string, filters?: Record<string, unknown>): Promise<CredentialBlockchain[]>;
  createTranscriptBlockchain(schoolId: string, data: TranscriptBlockchain): Promise<TranscriptBlockchain>;
  getTranscriptBlockchain(schoolId: string, id: string): Promise<TranscriptBlockchain | null>;
  updateTranscriptBlockchain(schoolId: string, id: string, data: Partial<TranscriptBlockchain>): Promise<TranscriptBlockchain>;
  deleteTranscriptBlockchain(schoolId: string, id: string): Promise<void>;
  listTranscriptBlockchain(schoolId: string, filters?: Record<string, unknown>): Promise<TranscriptBlockchain[]>;
  createDiplomaLedger(schoolId: string, data: DiplomaLedger): Promise<DiplomaLedger>;
  getDiplomaLedger(schoolId: string, id: string): Promise<DiplomaLedger | null>;
  updateDiplomaLedger(schoolId: string, id: string, data: Partial<DiplomaLedger>): Promise<DiplomaLedger>;
  deleteDiplomaLedger(schoolId: string, id: string): Promise<void>;
  listDiplomaLedger(schoolId: string, filters?: Record<string, unknown>): Promise<DiplomaLedger[]>;
  createAcademicLedger(schoolId: string, data: AcademicLedger): Promise<AcademicLedger>;
  getAcademicLedger(schoolId: string, id: string): Promise<AcademicLedger | null>;
  updateAcademicLedger(schoolId: string, id: string, data: Partial<AcademicLedger>): Promise<AcademicLedger>;
  deleteAcademicLedger(schoolId: string, id: string): Promise<void>;
  listAcademicLedger(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicLedger[]>;
  createCertificateLedger(schoolId: string, data: CertificateLedger): Promise<CertificateLedger>;
  getCertificateLedger(schoolId: string, id: string): Promise<CertificateLedger | null>;
  updateCertificateLedger(schoolId: string, id: string, data: Partial<CertificateLedger>): Promise<CertificateLedger>;
  deleteCertificateLedger(schoolId: string, id: string): Promise<void>;
  listCertificateLedger(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateLedger[]>;
  createVerificationPortal(schoolId: string, data: VerificationPortal): Promise<VerificationPortal>;
  getVerificationPortal(schoolId: string, id: string): Promise<VerificationPortal | null>;
  updateVerificationPortal(schoolId: string, id: string, data: Partial<VerificationPortal>): Promise<VerificationPortal>;
  deleteVerificationPortal(schoolId: string, id: string): Promise<void>;
  listVerificationPortal(schoolId: string, filters?: Record<string, unknown>): Promise<VerificationPortal[]>;
  createSmartContract(schoolId: string, data: SmartContract): Promise<SmartContract>;
  getSmartContract(schoolId: string, id: string): Promise<SmartContract | null>;
  updateSmartContract(schoolId: string, id: string, data: Partial<SmartContract>): Promise<SmartContract>;
  deleteSmartContract(schoolId: string, id: string): Promise<void>;
  listSmartContract(schoolId: string, filters?: Record<string, unknown>): Promise<SmartContract[]>;
  createImmutableAudit(schoolId: string, data: ImmutableAudit): Promise<ImmutableAudit>;
  getImmutableAudit(schoolId: string, id: string): Promise<ImmutableAudit | null>;
  updateImmutableAudit(schoolId: string, id: string, data: Partial<ImmutableAudit>): Promise<ImmutableAudit>;
  deleteImmutableAudit(schoolId: string, id: string): Promise<void>;
  listImmutableAudit(schoolId: string, filters?: Record<string, unknown>): Promise<ImmutableAudit[]>;
  createBlockchainExplorer(schoolId: string, data: BlockchainExplorer): Promise<BlockchainExplorer>;
  getBlockchainExplorer(schoolId: string, id: string): Promise<BlockchainExplorer | null>;
  updateBlockchainExplorer(schoolId: string, id: string, data: Partial<BlockchainExplorer>): Promise<BlockchainExplorer>;
  deleteBlockchainExplorer(schoolId: string, id: string): Promise<void>;
  listBlockchainExplorer(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainExplorer[]>;
  createBlockchainTransaction(schoolId: string, data: BlockchainTransaction): Promise<BlockchainTransaction>;
  getBlockchainTransaction(schoolId: string, id: string): Promise<BlockchainTransaction | null>;
  updateBlockchainTransaction(schoolId: string, id: string, data: Partial<BlockchainTransaction>): Promise<BlockchainTransaction>;
  deleteBlockchainTransaction(schoolId: string, id: string): Promise<void>;
  listBlockchainTransaction(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainTransaction[]>;
  createBlockchainAuditTrail(schoolId: string, data: BlockchainAuditTrail): Promise<BlockchainAuditTrail>;
  getBlockchainAuditTrail(schoolId: string, id: string): Promise<BlockchainAuditTrail | null>;
  updateBlockchainAuditTrail(schoolId: string, id: string, data: Partial<BlockchainAuditTrail>): Promise<BlockchainAuditTrail>;
  deleteBlockchainAuditTrail(schoolId: string, id: string): Promise<void>;
  listBlockchainAuditTrail(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainAuditTrail[]>;
  createIntegrationConnector(schoolId: string, data: IntegrationConnector): Promise<IntegrationConnector>;
  getIntegrationConnector(schoolId: string, id: string): Promise<IntegrationConnector | null>;
  updateIntegrationConnector(schoolId: string, id: string, data: Partial<IntegrationConnector>): Promise<IntegrationConnector>;
  deleteIntegrationConnector(schoolId: string, id: string): Promise<void>;
  listIntegrationConnector(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationConnector[]>;
  createGoogleWorkspaceIntegration(schoolId: string, data: GoogleWorkspaceIntegration): Promise<GoogleWorkspaceIntegration>;
  getGoogleWorkspaceIntegration(schoolId: string, id: string): Promise<GoogleWorkspaceIntegration | null>;
  updateGoogleWorkspaceIntegration(schoolId: string, id: string, data: Partial<GoogleWorkspaceIntegration>): Promise<GoogleWorkspaceIntegration>;
  deleteGoogleWorkspaceIntegration(schoolId: string, id: string): Promise<void>;
  listGoogleWorkspaceIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<GoogleWorkspaceIntegration[]>;
  createMicrosoft365Integration(schoolId: string, data: Microsoft365Integration): Promise<Microsoft365Integration>;
  getMicrosoft365Integration(schoolId: string, id: string): Promise<Microsoft365Integration | null>;
  updateMicrosoft365Integration(schoolId: string, id: string, data: Partial<Microsoft365Integration>): Promise<Microsoft365Integration>;
  deleteMicrosoft365Integration(schoolId: string, id: string): Promise<void>;
  listMicrosoft365Integration(schoolId: string, filters?: Record<string, unknown>): Promise<Microsoft365Integration[]>;
  createGoogleClassroomIntegration(schoolId: string, data: GoogleClassroomIntegration): Promise<GoogleClassroomIntegration>;
  getGoogleClassroomIntegration(schoolId: string, id: string): Promise<GoogleClassroomIntegration | null>;
  updateGoogleClassroomIntegration(schoolId: string, id: string, data: Partial<GoogleClassroomIntegration>): Promise<GoogleClassroomIntegration>;
  deleteGoogleClassroomIntegration(schoolId: string, id: string): Promise<void>;
  listGoogleClassroomIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<GoogleClassroomIntegration[]>;
  createMicrosoftTeamsIntegration(schoolId: string, data: MicrosoftTeamsIntegration): Promise<MicrosoftTeamsIntegration>;
  getMicrosoftTeamsIntegration(schoolId: string, id: string): Promise<MicrosoftTeamsIntegration | null>;
  updateMicrosoftTeamsIntegration(schoolId: string, id: string, data: Partial<MicrosoftTeamsIntegration>): Promise<MicrosoftTeamsIntegration>;
  deleteMicrosoftTeamsIntegration(schoolId: string, id: string): Promise<void>;
  listMicrosoftTeamsIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<MicrosoftTeamsIntegration[]>;
  createVideoConferenceIntegration(schoolId: string, data: VideoConferenceIntegration): Promise<VideoConferenceIntegration>;
  getVideoConferenceIntegration(schoolId: string, id: string): Promise<VideoConferenceIntegration | null>;
  updateVideoConferenceIntegration(schoolId: string, id: string, data: Partial<VideoConferenceIntegration>): Promise<VideoConferenceIntegration>;
  deleteVideoConferenceIntegration(schoolId: string, id: string): Promise<void>;
  listVideoConferenceIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<VideoConferenceIntegration[]>;
  createMessagingIntegration(schoolId: string, data: MessagingIntegration): Promise<MessagingIntegration>;
  getMessagingIntegration(schoolId: string, id: string): Promise<MessagingIntegration | null>;
  updateMessagingIntegration(schoolId: string, id: string, data: Partial<MessagingIntegration>): Promise<MessagingIntegration>;
  deleteMessagingIntegration(schoolId: string, id: string): Promise<void>;
  listMessagingIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<MessagingIntegration[]>;
  createLMSIntegration(schoolId: string, data: LMSIntegration): Promise<LMSIntegration>;
  getLMSIntegration(schoolId: string, id: string): Promise<LMSIntegration | null>;
  updateLMSIntegration(schoolId: string, id: string, data: Partial<LMSIntegration>): Promise<LMSIntegration>;
  deleteLMSIntegration(schoolId: string, id: string): Promise<void>;
  listLMSIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<LMSIntegration[]>;
  createPaymentIntegration(schoolId: string, data: PaymentIntegration): Promise<PaymentIntegration>;
  getPaymentIntegration(schoolId: string, id: string): Promise<PaymentIntegration | null>;
  updatePaymentIntegration(schoolId: string, id: string, data: Partial<PaymentIntegration>): Promise<PaymentIntegration>;
  deletePaymentIntegration(schoolId: string, id: string): Promise<void>;
  listPaymentIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<PaymentIntegration[]>;
  createMobileMoneyIntegration(schoolId: string, data: MobileMoneyIntegration): Promise<MobileMoneyIntegration>;
  getMobileMoneyIntegration(schoolId: string, id: string): Promise<MobileMoneyIntegration | null>;
  updateMobileMoneyIntegration(schoolId: string, id: string, data: Partial<MobileMoneyIntegration>): Promise<MobileMoneyIntegration>;
  deleteMobileMoneyIntegration(schoolId: string, id: string): Promise<void>;
  listMobileMoneyIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<MobileMoneyIntegration[]>;
  createCloudIntegration(schoolId: string, data: CloudIntegration): Promise<CloudIntegration>;
  getCloudIntegration(schoolId: string, id: string): Promise<CloudIntegration | null>;
  updateCloudIntegration(schoolId: string, id: string, data: Partial<CloudIntegration>): Promise<CloudIntegration>;
  deleteCloudIntegration(schoolId: string, id: string): Promise<void>;
  listCloudIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<CloudIntegration[]>;
  createCRMIntegration(schoolId: string, data: CRMIntegration): Promise<CRMIntegration>;
  getCRMIntegration(schoolId: string, id: string): Promise<CRMIntegration | null>;
  updateCRMIntegration(schoolId: string, id: string, data: Partial<CRMIntegration>): Promise<CRMIntegration>;
  deleteCRMIntegration(schoolId: string, id: string): Promise<void>;
  listCRMIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<CRMIntegration[]>;
  createAIServiceIntegration(schoolId: string, data: AIServiceIntegration): Promise<AIServiceIntegration>;
  getAIServiceIntegration(schoolId: string, id: string): Promise<AIServiceIntegration | null>;
  updateAIServiceIntegration(schoolId: string, id: string, data: Partial<AIServiceIntegration>): Promise<AIServiceIntegration>;
  deleteAIServiceIntegration(schoolId: string, id: string): Promise<void>;
  listAIServiceIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<AIServiceIntegration[]>;
  createIntegrationSyncLog(schoolId: string, data: IntegrationSyncLog): Promise<IntegrationSyncLog>;
  getIntegrationSyncLog(schoolId: string, id: string): Promise<IntegrationSyncLog | null>;
  updateIntegrationSyncLog(schoolId: string, id: string, data: Partial<IntegrationSyncLog>): Promise<IntegrationSyncLog>;
  deleteIntegrationSyncLog(schoolId: string, id: string): Promise<void>;
  listIntegrationSyncLog(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationSyncLog[]>;
  createIntegrationWebhook(schoolId: string, data: IntegrationWebhook): Promise<IntegrationWebhook>;
  getIntegrationWebhook(schoolId: string, id: string): Promise<IntegrationWebhook | null>;
  updateIntegrationWebhook(schoolId: string, id: string, data: Partial<IntegrationWebhook>): Promise<IntegrationWebhook>;
  deleteIntegrationWebhook(schoolId: string, id: string): Promise<void>;
  listIntegrationWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationWebhook[]>;
  createIntegrationAnalytics(schoolId: string, data: IntegrationAnalytics): Promise<IntegrationAnalytics>;
  getIntegrationAnalytics(schoolId: string, id: string): Promise<IntegrationAnalytics | null>;
  updateIntegrationAnalytics(schoolId: string, id: string, data: Partial<IntegrationAnalytics>): Promise<IntegrationAnalytics>;
  deleteIntegrationAnalytics(schoolId: string, id: string): Promise<void>;
  listIntegrationAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationAnalytics[]>;
  createIntegrationMapping(schoolId: string, data: IntegrationMapping): Promise<IntegrationMapping>;
  getIntegrationMapping(schoolId: string, id: string): Promise<IntegrationMapping | null>;
  updateIntegrationMapping(schoolId: string, id: string, data: Partial<IntegrationMapping>): Promise<IntegrationMapping>;
  deleteIntegrationMapping(schoolId: string, id: string): Promise<void>;
  listIntegrationMapping(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationMapping[]>;
  createAgentRegistry(schoolId: string, data: AgentRegistry): Promise<AgentRegistry>;
  getAgentRegistry(schoolId: string, id: string): Promise<AgentRegistry | null>;
  updateAgentRegistry(schoolId: string, id: string, data: Partial<AgentRegistry>): Promise<AgentRegistry>;
  deleteAgentRegistry(schoolId: string, id: string): Promise<void>;
  listAgentRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<AgentRegistry[]>;
  createMultiAgentSystem(schoolId: string, data: MultiAgentSystem): Promise<MultiAgentSystem>;
  getMultiAgentSystem(schoolId: string, id: string): Promise<MultiAgentSystem | null>;
  updateMultiAgentSystem(schoolId: string, id: string, data: Partial<MultiAgentSystem>): Promise<MultiAgentSystem>;
  deleteMultiAgentSystem(schoolId: string, id: string): Promise<void>;
  listMultiAgentSystem(schoolId: string, filters?: Record<string, unknown>): Promise<MultiAgentSystem[]>;
  createPlanningEngine(schoolId: string, data: PlanningEngine): Promise<PlanningEngine>;
  getPlanningEngine(schoolId: string, id: string): Promise<PlanningEngine | null>;
  updatePlanningEngine(schoolId: string, id: string, data: Partial<PlanningEngine>): Promise<PlanningEngine>;
  deletePlanningEngine(schoolId: string, id: string): Promise<void>;
  listPlanningEngine(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningEngine[]>;
  createReasoningEngine(schoolId: string, data: ReasoningEngine): Promise<ReasoningEngine>;
  getReasoningEngine(schoolId: string, id: string): Promise<ReasoningEngine | null>;
  updateReasoningEngine(schoolId: string, id: string, data: Partial<ReasoningEngine>): Promise<ReasoningEngine>;
  deleteReasoningEngine(schoolId: string, id: string): Promise<void>;
  listReasoningEngine(schoolId: string, filters?: Record<string, unknown>): Promise<ReasoningEngine[]>;
  createContextEngine(schoolId: string, data: ContextEngine): Promise<ContextEngine>;
  getContextEngine(schoolId: string, id: string): Promise<ContextEngine | null>;
  updateContextEngine(schoolId: string, id: string, data: Partial<ContextEngine>): Promise<ContextEngine>;
  deleteContextEngine(schoolId: string, id: string): Promise<void>;
  listContextEngine(schoolId: string, filters?: Record<string, unknown>): Promise<ContextEngine[]>;
  createMemoryEngine(schoolId: string, data: MemoryEngine): Promise<MemoryEngine>;
  getMemoryEngine(schoolId: string, id: string): Promise<MemoryEngine | null>;
  updateMemoryEngine(schoolId: string, id: string, data: Partial<MemoryEngine>): Promise<MemoryEngine>;
  deleteMemoryEngine(schoolId: string, id: string): Promise<void>;
  listMemoryEngine(schoolId: string, filters?: Record<string, unknown>): Promise<MemoryEngine[]>;
  createKnowledgeGraphNode(schoolId: string, data: KnowledgeGraphNode): Promise<KnowledgeGraphNode>;
  getKnowledgeGraphNode(schoolId: string, id: string): Promise<KnowledgeGraphNode | null>;
  updateKnowledgeGraphNode(schoolId: string, id: string, data: Partial<KnowledgeGraphNode>): Promise<KnowledgeGraphNode>;
  deleteKnowledgeGraphNode(schoolId: string, id: string): Promise<void>;
  listKnowledgeGraphNode(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeGraphNode[]>;
  createKnowledgeGraphEdge(schoolId: string, data: KnowledgeGraphEdge): Promise<KnowledgeGraphEdge>;
  getKnowledgeGraphEdge(schoolId: string, id: string): Promise<KnowledgeGraphEdge | null>;
  updateKnowledgeGraphEdge(schoolId: string, id: string, data: Partial<KnowledgeGraphEdge>): Promise<KnowledgeGraphEdge>;
  deleteKnowledgeGraphEdge(schoolId: string, id: string): Promise<void>;
  listKnowledgeGraphEdge(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeGraphEdge[]>;
  createToolRegistryEntry(schoolId: string, data: ToolRegistryEntry): Promise<ToolRegistryEntry>;
  getToolRegistryEntry(schoolId: string, id: string): Promise<ToolRegistryEntry | null>;
  updateToolRegistryEntry(schoolId: string, id: string, data: Partial<ToolRegistryEntry>): Promise<ToolRegistryEntry>;
  deleteToolRegistryEntry(schoolId: string, id: string): Promise<void>;
  listToolRegistryEntry(schoolId: string, filters?: Record<string, unknown>): Promise<ToolRegistryEntry[]>;
  createTaskDelegation(schoolId: string, data: TaskDelegation): Promise<TaskDelegation>;
  getTaskDelegation(schoolId: string, id: string): Promise<TaskDelegation | null>;
  updateTaskDelegation(schoolId: string, id: string, data: Partial<TaskDelegation>): Promise<TaskDelegation>;
  deleteTaskDelegation(schoolId: string, id: string): Promise<void>;
  listTaskDelegation(schoolId: string, filters?: Record<string, unknown>): Promise<TaskDelegation[]>;
  createRAGOrchestrator(schoolId: string, data: RAGOrchestrator): Promise<RAGOrchestrator>;
  getRAGOrchestrator(schoolId: string, id: string): Promise<RAGOrchestrator | null>;
  updateRAGOrchestrator(schoolId: string, id: string, data: Partial<RAGOrchestrator>): Promise<RAGOrchestrator>;
  deleteRAGOrchestrator(schoolId: string, id: string): Promise<void>;
  listRAGOrchestrator(schoolId: string, filters?: Record<string, unknown>): Promise<RAGOrchestrator[]>;
  createDecisionEngine(schoolId: string, data: DecisionEngine): Promise<DecisionEngine>;
  getDecisionEngine(schoolId: string, id: string): Promise<DecisionEngine | null>;
  updateDecisionEngine(schoolId: string, id: string, data: Partial<DecisionEngine>): Promise<DecisionEngine>;
  deleteDecisionEngine(schoolId: string, id: string): Promise<void>;
  listDecisionEngine(schoolId: string, filters?: Record<string, unknown>): Promise<DecisionEngine[]>;
  createAIMonitoring(schoolId: string, data: AIMonitoring): Promise<AIMonitoring>;
  getAIMonitoring(schoolId: string, id: string): Promise<AIMonitoring | null>;
  updateAIMonitoring(schoolId: string, id: string, data: Partial<AIMonitoring>): Promise<AIMonitoring>;
  deleteAIMonitoring(schoolId: string, id: string): Promise<void>;
  listAIMonitoring(schoolId: string, filters?: Record<string, unknown>): Promise<AIMonitoring[]>;
  createAIModelRegistry(schoolId: string, data: AIModelRegistry): Promise<AIModelRegistry>;
  getAIModelRegistry(schoolId: string, id: string): Promise<AIModelRegistry | null>;
  updateAIModelRegistry(schoolId: string, id: string, data: Partial<AIModelRegistry>): Promise<AIModelRegistry>;
  deleteAIModelRegistry(schoolId: string, id: string): Promise<void>;
  listAIModelRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<AIModelRegistry[]>;
  createAgentConversation(schoolId: string, data: AgentConversation): Promise<AgentConversation>;
  getAgentConversation(schoolId: string, id: string): Promise<AgentConversation | null>;
  updateAgentConversation(schoolId: string, id: string, data: Partial<AgentConversation>): Promise<AgentConversation>;
  deleteAgentConversation(schoolId: string, id: string): Promise<void>;
  listAgentConversation(schoolId: string, filters?: Record<string, unknown>): Promise<AgentConversation[]>;
  createDataMesh(schoolId: string, data: DataMesh): Promise<DataMesh>;
  getDataMesh(schoolId: string, id: string): Promise<DataMesh | null>;
  updateDataMesh(schoolId: string, id: string, data: Partial<DataMesh>): Promise<DataMesh>;
  deleteDataMesh(schoolId: string, id: string): Promise<void>;
  listDataMesh(schoolId: string, filters?: Record<string, unknown>): Promise<DataMesh[]>;
  createDataCatalog(schoolId: string, data: DataCatalog): Promise<DataCatalog>;
  getDataCatalog(schoolId: string, id: string): Promise<DataCatalog | null>;
  updateDataCatalog(schoolId: string, id: string, data: Partial<DataCatalog>): Promise<DataCatalog>;
  deleteDataCatalog(schoolId: string, id: string): Promise<void>;
  listDataCatalog(schoolId: string, filters?: Record<string, unknown>): Promise<DataCatalog[]>;
  createMetadataRecord(schoolId: string, data: MetadataRecord): Promise<MetadataRecord>;
  getMetadataRecord(schoolId: string, id: string): Promise<MetadataRecord | null>;
  updateMetadataRecord(schoolId: string, id: string, data: Partial<MetadataRecord>): Promise<MetadataRecord>;
  deleteMetadataRecord(schoolId: string, id: string): Promise<void>;
  listMetadataRecord(schoolId: string, filters?: Record<string, unknown>): Promise<MetadataRecord[]>;
  createMasterData(schoolId: string, data: MasterData): Promise<MasterData>;
  getMasterData(schoolId: string, id: string): Promise<MasterData | null>;
  updateMasterData(schoolId: string, id: string, data: Partial<MasterData>): Promise<MasterData>;
  deleteMasterData(schoolId: string, id: string): Promise<void>;
  listMasterData(schoolId: string, filters?: Record<string, unknown>): Promise<MasterData[]>;
  createDataLineage(schoolId: string, data: DataLineage): Promise<DataLineage>;
  getDataLineage(schoolId: string, id: string): Promise<DataLineage | null>;
  updateDataLineage(schoolId: string, id: string, data: Partial<DataLineage>): Promise<DataLineage>;
  deleteDataLineage(schoolId: string, id: string): Promise<void>;
  listDataLineage(schoolId: string, filters?: Record<string, unknown>): Promise<DataLineage[]>;
  createDataGovernance(schoolId: string, data: DataGovernance): Promise<DataGovernance>;
  getDataGovernance(schoolId: string, id: string): Promise<DataGovernance | null>;
  updateDataGovernance(schoolId: string, id: string, data: Partial<DataGovernance>): Promise<DataGovernance>;
  deleteDataGovernance(schoolId: string, id: string): Promise<void>;
  listDataGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernance[]>;
  createETLPipeline(schoolId: string, data: ETLPipeline): Promise<ETLPipeline>;
  getETLPipeline(schoolId: string, id: string): Promise<ETLPipeline | null>;
  updateETLPipeline(schoolId: string, id: string, data: Partial<ETLPipeline>): Promise<ETLPipeline>;
  deleteETLPipeline(schoolId: string, id: string): Promise<void>;
  listETLPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<ETLPipeline[]>;
  createELTConfiguration(schoolId: string, data: ELTConfiguration): Promise<ELTConfiguration>;
  getELTConfiguration(schoolId: string, id: string): Promise<ELTConfiguration | null>;
  updateELTConfiguration(schoolId: string, id: string, data: Partial<ELTConfiguration>): Promise<ELTConfiguration>;
  deleteELTConfiguration(schoolId: string, id: string): Promise<void>;
  listELTConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<ELTConfiguration[]>;
  createDataStream(schoolId: string, data: DataStream): Promise<DataStream>;
  getDataStream(schoolId: string, id: string): Promise<DataStream | null>;
  updateDataStream(schoolId: string, id: string, data: Partial<DataStream>): Promise<DataStream>;
  deleteDataStream(schoolId: string, id: string): Promise<void>;
  listDataStream(schoolId: string, filters?: Record<string, unknown>): Promise<DataStream[]>;
  createDataLakehouse(schoolId: string, data: DataLakehouse): Promise<DataLakehouse>;
  getDataLakehouse(schoolId: string, id: string): Promise<DataLakehouse | null>;
  updateDataLakehouse(schoolId: string, id: string, data: Partial<DataLakehouse>): Promise<DataLakehouse>;
  deleteDataLakehouse(schoolId: string, id: string): Promise<void>;
  listDataLakehouse(schoolId: string, filters?: Record<string, unknown>): Promise<DataLakehouse[]>;
  createDataWarehouse(schoolId: string, data: DataWarehouse): Promise<DataWarehouse>;
  getDataWarehouse(schoolId: string, id: string): Promise<DataWarehouse | null>;
  updateDataWarehouse(schoolId: string, id: string, data: Partial<DataWarehouse>): Promise<DataWarehouse>;
  deleteDataWarehouse(schoolId: string, id: string): Promise<void>;
  listDataWarehouse(schoolId: string, filters?: Record<string, unknown>): Promise<DataWarehouse[]>;
  createDataQualityReport(schoolId: string, data: DataQualityReport): Promise<DataQualityReport>;
  getDataQualityReport(schoolId: string, id: string): Promise<DataQualityReport | null>;
  updateDataQualityReport(schoolId: string, id: string, data: Partial<DataQualityReport>): Promise<DataQualityReport>;
  deleteDataQualityReport(schoolId: string, id: string): Promise<void>;
  listDataQualityReport(schoolId: string, filters?: Record<string, unknown>): Promise<DataQualityReport[]>;
  createDataMigrationJob(schoolId: string, data: DataMigrationJob): Promise<DataMigrationJob>;
  getDataMigrationJob(schoolId: string, id: string): Promise<DataMigrationJob | null>;
  updateDataMigrationJob(schoolId: string, id: string, data: Partial<DataMigrationJob>): Promise<DataMigrationJob>;
  deleteDataMigrationJob(schoolId: string, id: string): Promise<void>;
  listDataMigrationJob(schoolId: string, filters?: Record<string, unknown>): Promise<DataMigrationJob[]>;
  createAutomationBuilder(schoolId: string, data: AutomationBuilder): Promise<AutomationBuilder>;
  getAutomationBuilder(schoolId: string, id: string): Promise<AutomationBuilder | null>;
  updateAutomationBuilder(schoolId: string, id: string, data: Partial<AutomationBuilder>): Promise<AutomationBuilder>;
  deleteAutomationBuilder(schoolId: string, id: string): Promise<void>;
  listAutomationBuilder(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationBuilder[]>;
  createEventTrigger(schoolId: string, data: EventTrigger): Promise<EventTrigger>;
  getEventTrigger(schoolId: string, id: string): Promise<EventTrigger | null>;
  updateEventTrigger(schoolId: string, id: string, data: Partial<EventTrigger>): Promise<EventTrigger>;
  deleteEventTrigger(schoolId: string, id: string): Promise<void>;
  listEventTrigger(schoolId: string, filters?: Record<string, unknown>): Promise<EventTrigger[]>;
  createBusinessRule(schoolId: string, data: BusinessRule): Promise<BusinessRule>;
  getBusinessRule(schoolId: string, id: string): Promise<BusinessRule | null>;
  updateBusinessRule(schoolId: string, id: string, data: Partial<BusinessRule>): Promise<BusinessRule>;
  deleteBusinessRule(schoolId: string, id: string): Promise<void>;
  listBusinessRule(schoolId: string, filters?: Record<string, unknown>): Promise<BusinessRule[]>;
  createCronJob(schoolId: string, data: CronJob): Promise<CronJob>;
  getCronJob(schoolId: string, id: string): Promise<CronJob | null>;
  updateCronJob(schoolId: string, id: string, data: Partial<CronJob>): Promise<CronJob>;
  deleteCronJob(schoolId: string, id: string): Promise<void>;
  listCronJob(schoolId: string, filters?: Record<string, unknown>): Promise<CronJob[]>;
  createAutomationNotification(schoolId: string, data: AutomationNotification): Promise<AutomationNotification>;
  getAutomationNotification(schoolId: string, id: string): Promise<AutomationNotification | null>;
  updateAutomationNotification(schoolId: string, id: string, data: Partial<AutomationNotification>): Promise<AutomationNotification>;
  deleteAutomationNotification(schoolId: string, id: string): Promise<void>;
  listAutomationNotification(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationNotification[]>;
  createBatchProcessingJob(schoolId: string, data: BatchProcessingJob): Promise<BatchProcessingJob>;
  getBatchProcessingJob(schoolId: string, id: string): Promise<BatchProcessingJob | null>;
  updateBatchProcessingJob(schoolId: string, id: string, data: Partial<BatchProcessingJob>): Promise<BatchProcessingJob>;
  deleteBatchProcessingJob(schoolId: string, id: string): Promise<void>;
  listBatchProcessingJob(schoolId: string, filters?: Record<string, unknown>): Promise<BatchProcessingJob[]>;
  createLowCodeWorkflow(schoolId: string, data: LowCodeWorkflow): Promise<LowCodeWorkflow>;
  getLowCodeWorkflow(schoolId: string, id: string): Promise<LowCodeWorkflow | null>;
  updateLowCodeWorkflow(schoolId: string, id: string, data: Partial<LowCodeWorkflow>): Promise<LowCodeWorkflow>;
  deleteLowCodeWorkflow(schoolId: string, id: string): Promise<void>;
  listLowCodeWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<LowCodeWorkflow[]>;
  createNoCodeWorkflow(schoolId: string, data: NoCodeWorkflow): Promise<NoCodeWorkflow>;
  getNoCodeWorkflow(schoolId: string, id: string): Promise<NoCodeWorkflow | null>;
  updateNoCodeWorkflow(schoolId: string, id: string, data: Partial<NoCodeWorkflow>): Promise<NoCodeWorkflow>;
  deleteNoCodeWorkflow(schoolId: string, id: string): Promise<void>;
  listNoCodeWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<NoCodeWorkflow[]>;
  createAutomationAnalytics(schoolId: string, data: AutomationAnalytics): Promise<AutomationAnalytics>;
  getAutomationAnalytics(schoolId: string, id: string): Promise<AutomationAnalytics | null>;
  updateAutomationAnalytics(schoolId: string, id: string, data: Partial<AutomationAnalytics>): Promise<AutomationAnalytics>;
  deleteAutomationAnalytics(schoolId: string, id: string): Promise<void>;
  listAutomationAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationAnalytics[]>;
  createAutomationExecution(schoolId: string, data: AutomationExecution): Promise<AutomationExecution>;
  getAutomationExecution(schoolId: string, id: string): Promise<AutomationExecution | null>;
  updateAutomationExecution(schoolId: string, id: string, data: Partial<AutomationExecution>): Promise<AutomationExecution>;
  deleteAutomationExecution(schoolId: string, id: string): Promise<void>;
  listAutomationExecution(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationExecution[]>;
  createAutomationTemplate(schoolId: string, data: AutomationTemplate): Promise<AutomationTemplate>;
  getAutomationTemplate(schoolId: string, id: string): Promise<AutomationTemplate | null>;
  updateAutomationTemplate(schoolId: string, id: string, data: Partial<AutomationTemplate>): Promise<AutomationTemplate>;
  deleteAutomationTemplate(schoolId: string, id: string): Promise<void>;
  listAutomationTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationTemplate[]>;
  createDependencyNode(schoolId: string, data: DependencyNode): Promise<DependencyNode>;
  getDependencyNode(schoolId: string, id: string): Promise<DependencyNode | null>;
  updateDependencyNode(schoolId: string, id: string, data: Partial<DependencyNode>): Promise<DependencyNode>;
  deleteDependencyNode(schoolId: string, id: string): Promise<void>;
  listDependencyNode(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyNode[]>;
  createDependencyEdge(schoolId: string, data: DependencyEdge): Promise<DependencyEdge>;
  getDependencyEdge(schoolId: string, id: string): Promise<DependencyEdge | null>;
  updateDependencyEdge(schoolId: string, id: string, data: Partial<DependencyEdge>): Promise<DependencyEdge>;
  deleteDependencyEdge(schoolId: string, id: string): Promise<void>;
  listDependencyEdge(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyEdge[]>;
  createResourceLimits(schoolId: string, data: ResourceLimits): Promise<ResourceLimits>;
  getResourceLimits(schoolId: string, id: string): Promise<ResourceLimits | null>;
  updateResourceLimits(schoolId: string, id: string, data: Partial<ResourceLimits>): Promise<ResourceLimits>;
  deleteResourceLimits(schoolId: string, id: string): Promise<void>;
  listResourceLimits(schoolId: string, filters?: Record<string, unknown>): Promise<ResourceLimits[]>;
  createHealthCheck(schoolId: string, data: HealthCheck): Promise<HealthCheck>;
  getHealthCheck(schoolId: string, id: string): Promise<HealthCheck | null>;
  updateHealthCheck(schoolId: string, id: string, data: Partial<HealthCheck>): Promise<HealthCheck>;
  deleteHealthCheck(schoolId: string, id: string): Promise<void>;
  listHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<HealthCheck[]>;
  createWorkflowNode(schoolId: string, data: WorkflowNode): Promise<WorkflowNode>;
  getWorkflowNode(schoolId: string, id: string): Promise<WorkflowNode | null>;
  updateWorkflowNode(schoolId: string, id: string, data: Partial<WorkflowNode>): Promise<WorkflowNode>;
  deleteWorkflowNode(schoolId: string, id: string): Promise<void>;
  listWorkflowNode(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowNode[]>;
  createWorkflowEdge(schoolId: string, data: WorkflowEdge): Promise<WorkflowEdge>;
  getWorkflowEdge(schoolId: string, id: string): Promise<WorkflowEdge | null>;
  updateWorkflowEdge(schoolId: string, id: string, data: Partial<WorkflowEdge>): Promise<WorkflowEdge>;
  deleteWorkflowEdge(schoolId: string, id: string): Promise<void>;
  listWorkflowEdge(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEdge[]>;
  createStateDefinition(schoolId: string, data: StateDefinition): Promise<StateDefinition>;
  getStateDefinition(schoolId: string, id: string): Promise<StateDefinition | null>;
  updateStateDefinition(schoolId: string, id: string, data: Partial<StateDefinition>): Promise<StateDefinition>;
  deleteStateDefinition(schoolId: string, id: string): Promise<void>;
  listStateDefinition(schoolId: string, filters?: Record<string, unknown>): Promise<StateDefinition[]>;
  createStateTransition(schoolId: string, data: StateTransition): Promise<StateTransition>;
  getStateTransition(schoolId: string, id: string): Promise<StateTransition | null>;
  updateStateTransition(schoolId: string, id: string, data: Partial<StateTransition>): Promise<StateTransition>;
  deleteStateTransition(schoolId: string, id: string): Promise<void>;
  listStateTransition(schoolId: string, filters?: Record<string, unknown>): Promise<StateTransition[]>;
  createBranchDefinition(schoolId: string, data: BranchDefinition): Promise<BranchDefinition>;
  getBranchDefinition(schoolId: string, id: string): Promise<BranchDefinition | null>;
  updateBranchDefinition(schoolId: string, id: string, data: Partial<BranchDefinition>): Promise<BranchDefinition>;
  deleteBranchDefinition(schoolId: string, id: string): Promise<void>;
  listBranchDefinition(schoolId: string, filters?: Record<string, unknown>): Promise<BranchDefinition[]>;
  createWorkflowVariable(schoolId: string, data: WorkflowVariable): Promise<WorkflowVariable>;
  getWorkflowVariable(schoolId: string, id: string): Promise<WorkflowVariable | null>;
  updateWorkflowVariable(schoolId: string, id: string, data: Partial<WorkflowVariable>): Promise<WorkflowVariable>;
  deleteWorkflowVariable(schoolId: string, id: string): Promise<void>;
  listWorkflowVariable(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowVariable[]>;
  createBoardMember(schoolId: string, data: BoardMember): Promise<BoardMember>;
  getBoardMember(schoolId: string, id: string): Promise<BoardMember | null>;
  updateBoardMember(schoolId: string, id: string, data: Partial<BoardMember>): Promise<BoardMember>;
  deleteBoardMember(schoolId: string, id: string): Promise<void>;
  listBoardMember(schoolId: string, filters?: Record<string, unknown>): Promise<BoardMember[]>;
  createMeetingAgendaItem(schoolId: string, data: MeetingAgendaItem): Promise<MeetingAgendaItem>;
  getMeetingAgendaItem(schoolId: string, id: string): Promise<MeetingAgendaItem | null>;
  updateMeetingAgendaItem(schoolId: string, id: string, data: Partial<MeetingAgendaItem>): Promise<MeetingAgendaItem>;
  deleteMeetingAgendaItem(schoolId: string, id: string): Promise<void>;
  listMeetingAgendaItem(schoolId: string, filters?: Record<string, unknown>): Promise<MeetingAgendaItem[]>;
  createMeetingAttendee(schoolId: string, data: MeetingAttendee): Promise<MeetingAttendee>;
  getMeetingAttendee(schoolId: string, id: string): Promise<MeetingAttendee | null>;
  updateMeetingAttendee(schoolId: string, id: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee>;
  deleteMeetingAttendee(schoolId: string, id: string): Promise<void>;
  listMeetingAttendee(schoolId: string, filters?: Record<string, unknown>): Promise<MeetingAttendee[]>;
  createCommitteeMember(schoolId: string, data: CommitteeMember): Promise<CommitteeMember>;
  getCommitteeMember(schoolId: string, id: string): Promise<CommitteeMember | null>;
  updateCommitteeMember(schoolId: string, id: string, data: Partial<CommitteeMember>): Promise<CommitteeMember>;
  deleteCommitteeMember(schoolId: string, id: string): Promise<void>;
  listCommitteeMember(schoolId: string, filters?: Record<string, unknown>): Promise<CommitteeMember[]>;
  createVoteOption(schoolId: string, data: VoteOption): Promise<VoteOption>;
  getVoteOption(schoolId: string, id: string): Promise<VoteOption | null>;
  updateVoteOption(schoolId: string, id: string, data: Partial<VoteOption>): Promise<VoteOption>;
  deleteVoteOption(schoolId: string, id: string): Promise<void>;
  listVoteOption(schoolId: string, filters?: Record<string, unknown>): Promise<VoteOption[]>;
  createBlockchainEvent(schoolId: string, data: BlockchainEvent): Promise<BlockchainEvent>;
  getBlockchainEvent(schoolId: string, id: string): Promise<BlockchainEvent | null>;
  updateBlockchainEvent(schoolId: string, id: string, data: Partial<BlockchainEvent>): Promise<BlockchainEvent>;
  deleteBlockchainEvent(schoolId: string, id: string): Promise<void>;
  listBlockchainEvent(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainEvent[]>;
  createChainOfCustodyEntry(schoolId: string, data: ChainOfCustodyEntry): Promise<ChainOfCustodyEntry>;
  getChainOfCustodyEntry(schoolId: string, id: string): Promise<ChainOfCustodyEntry | null>;
  updateChainOfCustodyEntry(schoolId: string, id: string, data: Partial<ChainOfCustodyEntry>): Promise<ChainOfCustodyEntry>;
  deleteChainOfCustodyEntry(schoolId: string, id: string): Promise<void>;
  listChainOfCustodyEntry(schoolId: string, filters?: Record<string, unknown>): Promise<ChainOfCustodyEntry[]>;
  createPlanningGoal(schoolId: string, data: PlanningGoal): Promise<PlanningGoal>;
  getPlanningGoal(schoolId: string, id: string): Promise<PlanningGoal | null>;
  updatePlanningGoal(schoolId: string, id: string, data: Partial<PlanningGoal>): Promise<PlanningGoal>;
  deletePlanningGoal(schoolId: string, id: string): Promise<void>;
  listPlanningGoal(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningGoal[]>;
  createPlanningConstraint(schoolId: string, data: PlanningConstraint): Promise<PlanningConstraint>;
  getPlanningConstraint(schoolId: string, id: string): Promise<PlanningConstraint | null>;
  updatePlanningConstraint(schoolId: string, id: string, data: Partial<PlanningConstraint>): Promise<PlanningConstraint>;
  deletePlanningConstraint(schoolId: string, id: string): Promise<void>;
  listPlanningConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningConstraint[]>;
  createReasoningRule(schoolId: string, data: ReasoningRule): Promise<ReasoningRule>;
  getReasoningRule(schoolId: string, id: string): Promise<ReasoningRule | null>;
  updateReasoningRule(schoolId: string, id: string, data: Partial<ReasoningRule>): Promise<ReasoningRule>;
  deleteReasoningRule(schoolId: string, id: string): Promise<void>;
  listReasoningRule(schoolId: string, filters?: Record<string, unknown>): Promise<ReasoningRule[]>;
  createAgentMessage(schoolId: string, data: AgentMessage): Promise<AgentMessage>;
  getAgentMessage(schoolId: string, id: string): Promise<AgentMessage | null>;
  updateAgentMessage(schoolId: string, id: string, data: Partial<AgentMessage>): Promise<AgentMessage>;
  deleteAgentMessage(schoolId: string, id: string): Promise<void>;
  listAgentMessage(schoolId: string, filters?: Record<string, unknown>): Promise<AgentMessage[]>;
  createToolCall(schoolId: string, data: ToolCall): Promise<ToolCall>;
  getToolCall(schoolId: string, id: string): Promise<ToolCall | null>;
  updateToolCall(schoolId: string, id: string, data: Partial<ToolCall>): Promise<ToolCall>;
  deleteToolCall(schoolId: string, id: string): Promise<void>;
  listToolCall(schoolId: string, filters?: Record<string, unknown>): Promise<ToolCall[]>;
  createDataProduct(schoolId: string, data: DataProduct): Promise<DataProduct>;
  getDataProduct(schoolId: string, id: string): Promise<DataProduct | null>;
  updateDataProduct(schoolId: string, id: string, data: Partial<DataProduct>): Promise<DataProduct>;
  deleteDataProduct(schoolId: string, id: string): Promise<void>;
  listDataProduct(schoolId: string, filters?: Record<string, unknown>): Promise<DataProduct[]>;
  createCatalogAsset(schoolId: string, data: CatalogAsset): Promise<CatalogAsset>;
  getCatalogAsset(schoolId: string, id: string): Promise<CatalogAsset | null>;
  updateCatalogAsset(schoolId: string, id: string, data: Partial<CatalogAsset>): Promise<CatalogAsset>;
  deleteCatalogAsset(schoolId: string, id: string): Promise<void>;
  listCatalogAsset(schoolId: string, filters?: Record<string, unknown>): Promise<CatalogAsset[]>;
  createDataGovernanceRule(schoolId: string, data: DataGovernanceRule): Promise<DataGovernanceRule>;
  getDataGovernanceRule(schoolId: string, id: string): Promise<DataGovernanceRule | null>;
  updateDataGovernanceRule(schoolId: string, id: string, data: Partial<DataGovernanceRule>): Promise<DataGovernanceRule>;
  deleteDataGovernanceRule(schoolId: string, id: string): Promise<void>;
  listDataGovernanceRule(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernanceRule[]>;
  createETLTransformation(schoolId: string, data: ETLTransformation): Promise<ETLTransformation>;
  getETLTransformation(schoolId: string, id: string): Promise<ETLTransformation | null>;
  updateETLTransformation(schoolId: string, id: string, data: Partial<ETLTransformation>): Promise<ETLTransformation>;
  deleteETLTransformation(schoolId: string, id: string): Promise<void>;
  listETLTransformation(schoolId: string, filters?: Record<string, unknown>): Promise<ETLTransformation[]>;
  createDataQualityIssue(schoolId: string, data: DataQualityIssue): Promise<DataQualityIssue>;
  getDataQualityIssue(schoolId: string, id: string): Promise<DataQualityIssue | null>;
  updateDataQualityIssue(schoolId: string, id: string, data: Partial<DataQualityIssue>): Promise<DataQualityIssue>;
  deleteDataQualityIssue(schoolId: string, id: string): Promise<void>;
  listDataQualityIssue(schoolId: string, filters?: Record<string, unknown>): Promise<DataQualityIssue[]>;
  createAutomationNode(schoolId: string, data: AutomationNode): Promise<AutomationNode>;
  getAutomationNode(schoolId: string, id: string): Promise<AutomationNode | null>;
  updateAutomationNode(schoolId: string, id: string, data: Partial<AutomationNode>): Promise<AutomationNode>;
  deleteAutomationNode(schoolId: string, id: string): Promise<void>;
  listAutomationNode(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationNode[]>;
  createAutomationEdge(schoolId: string, data: AutomationEdge): Promise<AutomationEdge>;
  getAutomationEdge(schoolId: string, id: string): Promise<AutomationEdge | null>;
  updateAutomationEdge(schoolId: string, id: string, data: Partial<AutomationEdge>): Promise<AutomationEdge>;
  deleteAutomationEdge(schoolId: string, id: string): Promise<void>;
  listAutomationEdge(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationEdge[]>;
  createTriggerCondition(schoolId: string, data: TriggerCondition): Promise<TriggerCondition>;
  getTriggerCondition(schoolId: string, id: string): Promise<TriggerCondition | null>;
  updateTriggerCondition(schoolId: string, id: string, data: Partial<TriggerCondition>): Promise<TriggerCondition>;
  deleteTriggerCondition(schoolId: string, id: string): Promise<void>;
  listTriggerCondition(schoolId: string, filters?: Record<string, unknown>): Promise<TriggerCondition[]>;
  createRuleCondition(schoolId: string, data: RuleCondition): Promise<RuleCondition>;
  getRuleCondition(schoolId: string, id: string): Promise<RuleCondition | null>;
  updateRuleCondition(schoolId: string, id: string, data: Partial<RuleCondition>): Promise<RuleCondition>;
  deleteRuleCondition(schoolId: string, id: string): Promise<void>;
  listRuleCondition(schoolId: string, filters?: Record<string, unknown>): Promise<RuleCondition[]>;
  createRuleAction(schoolId: string, data: RuleAction): Promise<RuleAction>;
  getRuleAction(schoolId: string, id: string): Promise<RuleAction | null>;
  updateRuleAction(schoolId: string, id: string, data: Partial<RuleAction>): Promise<RuleAction>;
  deleteRuleAction(schoolId: string, id: string): Promise<void>;
  listRuleAction(schoolId: string, filters?: Record<string, unknown>): Promise<RuleAction[]>;
  createNoCodeAction(schoolId: string, data: NoCodeAction): Promise<NoCodeAction>;
  getNoCodeAction(schoolId: string, id: string): Promise<NoCodeAction | null>;
  updateNoCodeAction(schoolId: string, id: string, data: Partial<NoCodeAction>): Promise<NoCodeAction>;
  deleteNoCodeAction(schoolId: string, id: string): Promise<void>;
  listNoCodeAction(schoolId: string, filters?: Record<string, unknown>): Promise<NoCodeAction[]>;
  createAutomationVariable(schoolId: string, data: AutomationVariable): Promise<AutomationVariable>;
  getAutomationVariable(schoolId: string, id: string): Promise<AutomationVariable | null>;
  updateAutomationVariable(schoolId: string, id: string, data: Partial<AutomationVariable>): Promise<AutomationVariable>;
  deleteAutomationVariable(schoolId: string, id: string): Promise<void>;
  listAutomationVariable(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationVariable[]>;

}

class EduOSRepositoryImpl implements EduOSRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('EduOS entity not found');
  }

  async createRuntimeManager(schoolId: string, data: RuntimeManager): Promise<RuntimeManager> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('runtime_managers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRuntimeManagerError(error.message);
    return result;
  }

  async getRuntimeManager(schoolId: string, id: string): Promise<RuntimeManager | null> {
    const { data, error } = await this.supabase
      .from('runtime_managers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRuntimeManager(schoolId: string, id: string, data: Partial<RuntimeManager>): Promise<RuntimeManager> {
    const { data: result, error } = await this.supabase
      .from('runtime_managers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRuntimeManagerError(error.message);
    return result;
  }

  async deleteRuntimeManager(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('runtime_managers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRuntimeManagerError(error.message);
  }

  async listRuntimeManager(schoolId: string, filters?: Record<string, unknown>): Promise<RuntimeManager[]> {
    let query = this.supabase.from('runtime_managers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRuntimeManagerError(error.message);
    return data ?? [];
  }

  async createModuleRegistry(schoolId: string, data: ModuleRegistry): Promise<ModuleRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('module_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSModuleRegistryError(error.message);
    return result;
  }

  async getModuleRegistry(schoolId: string, id: string): Promise<ModuleRegistry | null> {
    const { data, error } = await this.supabase
      .from('module_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateModuleRegistry(schoolId: string, id: string, data: Partial<ModuleRegistry>): Promise<ModuleRegistry> {
    const { data: result, error } = await this.supabase
      .from('module_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSModuleRegistryError(error.message);
    return result;
  }

  async deleteModuleRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('module_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSModuleRegistryError(error.message);
  }

  async listModuleRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<ModuleRegistry[]> {
    let query = this.supabase.from('module_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSModuleRegistryError(error.message);
    return data ?? [];
  }

  async createServiceRegistry(schoolId: string, data: ServiceRegistry): Promise<ServiceRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('service_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSServiceRegistryError(error.message);
    return result;
  }

  async getServiceRegistry(schoolId: string, id: string): Promise<ServiceRegistry | null> {
    const { data, error } = await this.supabase
      .from('service_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateServiceRegistry(schoolId: string, id: string, data: Partial<ServiceRegistry>): Promise<ServiceRegistry> {
    const { data: result, error } = await this.supabase
      .from('service_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSServiceRegistryError(error.message);
    return result;
  }

  async deleteServiceRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('service_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSServiceRegistryError(error.message);
  }

  async listServiceRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceRegistry[]> {
    let query = this.supabase.from('service_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSServiceRegistryError(error.message);
    return data ?? [];
  }

  async createDynamicModuleLoader(schoolId: string, data: DynamicModuleLoader): Promise<DynamicModuleLoader> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dynamic_module_loaders')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDynamicModuleLoaderError(error.message);
    return result;
  }

  async getDynamicModuleLoader(schoolId: string, id: string): Promise<DynamicModuleLoader | null> {
    const { data, error } = await this.supabase
      .from('dynamic_module_loaders')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDynamicModuleLoader(schoolId: string, id: string, data: Partial<DynamicModuleLoader>): Promise<DynamicModuleLoader> {
    const { data: result, error } = await this.supabase
      .from('dynamic_module_loaders')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDynamicModuleLoaderError(error.message);
    return result;
  }

  async deleteDynamicModuleLoader(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dynamic_module_loaders')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDynamicModuleLoaderError(error.message);
  }

  async listDynamicModuleLoader(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicModuleLoader[]> {
    let query = this.supabase.from('dynamic_module_loaders').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDynamicModuleLoaderError(error.message);
    return data ?? [];
  }

  async createPluginLoader(schoolId: string, data: PluginLoader): Promise<PluginLoader> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('plugin_loaders')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSPluginLoaderError(error.message);
    return result;
  }

  async getPluginLoader(schoolId: string, id: string): Promise<PluginLoader | null> {
    const { data, error } = await this.supabase
      .from('plugin_loaders')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePluginLoader(schoolId: string, id: string, data: Partial<PluginLoader>): Promise<PluginLoader> {
    const { data: result, error } = await this.supabase
      .from('plugin_loaders')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSPluginLoaderError(error.message);
    return result;
  }

  async deletePluginLoader(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('plugin_loaders')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSPluginLoaderError(error.message);
  }

  async listPluginLoader(schoolId: string, filters?: Record<string, unknown>): Promise<PluginLoader[]> {
    let query = this.supabase.from('plugin_loaders').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSPluginLoaderError(error.message);
    return data ?? [];
  }

  async createFeatureRegistry(schoolId: string, data: FeatureRegistry): Promise<FeatureRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('feature_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSFeatureRegistryError(error.message);
    return result;
  }

  async getFeatureRegistry(schoolId: string, id: string): Promise<FeatureRegistry | null> {
    const { data, error } = await this.supabase
      .from('feature_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateFeatureRegistry(schoolId: string, id: string, data: Partial<FeatureRegistry>): Promise<FeatureRegistry> {
    const { data: result, error } = await this.supabase
      .from('feature_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSFeatureRegistryError(error.message);
    return result;
  }

  async deleteFeatureRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('feature_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSFeatureRegistryError(error.message);
  }

  async listFeatureRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureRegistry[]> {
    let query = this.supabase.from('feature_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSFeatureRegistryError(error.message);
    return data ?? [];
  }

  async createDependencyGraph(schoolId: string, data: DependencyGraph): Promise<DependencyGraph> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dependency_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDependencyGraphError(error.message);
    return result;
  }

  async getDependencyGraph(schoolId: string, id: string): Promise<DependencyGraph | null> {
    const { data, error } = await this.supabase
      .from('dependency_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDependencyGraph(schoolId: string, id: string, data: Partial<DependencyGraph>): Promise<DependencyGraph> {
    const { data: result, error } = await this.supabase
      .from('dependency_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDependencyGraphError(error.message);
    return result;
  }

  async deleteDependencyGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dependency_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDependencyGraphError(error.message);
  }

  async listDependencyGraph(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyGraph[]> {
    let query = this.supabase.from('dependency_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDependencyGraphError(error.message);
    return data ?? [];
  }

  async createBackgroundTask(schoolId: string, data: BackgroundTask): Promise<BackgroundTask> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('background_tasks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBackgroundTaskError(error.message);
    return result;
  }

  async getBackgroundTask(schoolId: string, id: string): Promise<BackgroundTask | null> {
    const { data, error } = await this.supabase
      .from('background_tasks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBackgroundTask(schoolId: string, id: string, data: Partial<BackgroundTask>): Promise<BackgroundTask> {
    const { data: result, error } = await this.supabase
      .from('background_tasks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBackgroundTaskError(error.message);
    return result;
  }

  async deleteBackgroundTask(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('background_tasks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBackgroundTaskError(error.message);
  }

  async listBackgroundTask(schoolId: string, filters?: Record<string, unknown>): Promise<BackgroundTask[]> {
    let query = this.supabase.from('background_tasks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBackgroundTaskError(error.message);
    return data ?? [];
  }

  async createScheduler(schoolId: string, data: Scheduler): Promise<Scheduler> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('schedulers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSchedulerError(error.message);
    return result;
  }

  async getScheduler(schoolId: string, id: string): Promise<Scheduler | null> {
    const { data, error } = await this.supabase
      .from('schedulers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScheduler(schoolId: string, id: string, data: Partial<Scheduler>): Promise<Scheduler> {
    const { data: result, error } = await this.supabase
      .from('schedulers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSchedulerError(error.message);
    return result;
  }

  async deleteScheduler(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('schedulers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSchedulerError(error.message);
  }

  async listScheduler(schoolId: string, filters?: Record<string, unknown>): Promise<Scheduler[]> {
    let query = this.supabase.from('schedulers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSchedulerError(error.message);
    return data ?? [];
  }

  async createQueueManager(schoolId: string, data: QueueManager): Promise<QueueManager> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('queue_managers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSQueueManagerError(error.message);
    return result;
  }

  async getQueueManager(schoolId: string, id: string): Promise<QueueManager | null> {
    const { data, error } = await this.supabase
      .from('queue_managers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQueueManager(schoolId: string, id: string, data: Partial<QueueManager>): Promise<QueueManager> {
    const { data: result, error } = await this.supabase
      .from('queue_managers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSQueueManagerError(error.message);
    return result;
  }

  async deleteQueueManager(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('queue_managers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSQueueManagerError(error.message);
  }

  async listQueueManager(schoolId: string, filters?: Record<string, unknown>): Promise<QueueManager[]> {
    let query = this.supabase.from('queue_managers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSQueueManagerError(error.message);
    return data ?? [];
  }

  async createJobRunner(schoolId: string, data: JobRunner): Promise<JobRunner> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('job_runners')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSJobRunnerError(error.message);
    return result;
  }

  async getJobRunner(schoolId: string, id: string): Promise<JobRunner | null> {
    const { data, error } = await this.supabase
      .from('job_runners')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateJobRunner(schoolId: string, id: string, data: Partial<JobRunner>): Promise<JobRunner> {
    const { data: result, error } = await this.supabase
      .from('job_runners')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSJobRunnerError(error.message);
    return result;
  }

  async deleteJobRunner(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('job_runners')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSJobRunnerError(error.message);
  }

  async listJobRunner(schoolId: string, filters?: Record<string, unknown>): Promise<JobRunner[]> {
    let query = this.supabase.from('job_runners').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSJobRunnerError(error.message);
    return data ?? [];
  }

  async createRuntimeConfig(schoolId: string, data: RuntimeConfig): Promise<RuntimeConfig> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('runtime_configs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRuntimeConfigError(error.message);
    return result;
  }

  async getRuntimeConfig(schoolId: string, id: string): Promise<RuntimeConfig | null> {
    const { data, error } = await this.supabase
      .from('runtime_configs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRuntimeConfig(schoolId: string, id: string, data: Partial<RuntimeConfig>): Promise<RuntimeConfig> {
    const { data: result, error } = await this.supabase
      .from('runtime_configs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRuntimeConfigError(error.message);
    return result;
  }

  async deleteRuntimeConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('runtime_configs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRuntimeConfigError(error.message);
  }

  async listRuntimeConfig(schoolId: string, filters?: Record<string, unknown>): Promise<RuntimeConfig[]> {
    let query = this.supabase.from('runtime_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRuntimeConfigError(error.message);
    return data ?? [];
  }

  async createTenantRuntime(schoolId: string, data: TenantRuntime): Promise<TenantRuntime> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('tenant_runtimes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSTenantRuntimeError(error.message);
    return result;
  }

  async getTenantRuntime(schoolId: string, id: string): Promise<TenantRuntime | null> {
    const { data, error } = await this.supabase
      .from('tenant_runtimes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTenantRuntime(schoolId: string, id: string, data: Partial<TenantRuntime>): Promise<TenantRuntime> {
    const { data: result, error } = await this.supabase
      .from('tenant_runtimes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSTenantRuntimeError(error.message);
    return result;
  }

  async deleteTenantRuntime(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tenant_runtimes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSTenantRuntimeError(error.message);
  }

  async listTenantRuntime(schoolId: string, filters?: Record<string, unknown>): Promise<TenantRuntime[]> {
    let query = this.supabase.from('tenant_runtimes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSTenantRuntimeError(error.message);
    return data ?? [];
  }

  async createHealthManager(schoolId: string, data: HealthManager): Promise<HealthManager> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('health_managers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSHealthManagerError(error.message);
    return result;
  }

  async getHealthManager(schoolId: string, id: string): Promise<HealthManager | null> {
    const { data, error } = await this.supabase
      .from('health_managers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHealthManager(schoolId: string, id: string, data: Partial<HealthManager>): Promise<HealthManager> {
    const { data: result, error } = await this.supabase
      .from('health_managers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSHealthManagerError(error.message);
    return result;
  }

  async deleteHealthManager(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('health_managers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSHealthManagerError(error.message);
  }

  async listHealthManager(schoolId: string, filters?: Record<string, unknown>): Promise<HealthManager[]> {
    let query = this.supabase.from('health_managers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSHealthManagerError(error.message);
    return data ?? [];
  }

  // -- Workflow Orchestration --------

  async createVisualWorkflowBuilder(schoolId: string, data: VisualWorkflowBuilder): Promise<VisualWorkflowBuilder> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('visual_workflow_builders')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return result;
  }

  async getVisualWorkflowBuilder(schoolId: string, id: string): Promise<VisualWorkflowBuilder | null> {
    const { data, error } = await this.supabase
      .from('visual_workflow_builders')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVisualWorkflowBuilder(schoolId: string, id: string, data: Partial<VisualWorkflowBuilder>): Promise<VisualWorkflowBuilder> {
    const { data: result, error } = await this.supabase
      .from('visual_workflow_builders')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return result;
  }

  async deleteVisualWorkflowBuilder(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('visual_workflow_builders')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
  }

  async listVisualWorkflowBuilder(schoolId: string, filters?: Record<string, unknown>): Promise<VisualWorkflowBuilder[]> {
    let query = this.supabase.from('visual_workflow_builders').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return data ?? [];
  }

  async createBPMNEngine(schoolId: string, data: BPMNEngine): Promise<BPMNEngine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('bpmn_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBPMNEngineError(error.message);
    return result;
  }

  async getBPMNEngine(schoolId: string, id: string): Promise<BPMNEngine | null> {
    const { data, error } = await this.supabase
      .from('bpmn_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBPMNEngine(schoolId: string, id: string, data: Partial<BPMNEngine>): Promise<BPMNEngine> {
    const { data: result, error } = await this.supabase
      .from('bpmn_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBPMNEngineError(error.message);
    return result;
  }

  async deleteBPMNEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('bpmn_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBPMNEngineError(error.message);
  }

  async listBPMNEngine(schoolId: string, filters?: Record<string, unknown>): Promise<BPMNEngine[]> {
    let query = this.supabase.from('bpmn_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBPMNEngineError(error.message);
    return data ?? [];
  }

  async createStateMachine(schoolId: string, data: StateMachine): Promise<StateMachine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('state_machines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSStateMachineError(error.message);
    return result;
  }

  async getStateMachine(schoolId: string, id: string): Promise<StateMachine | null> {
    const { data, error } = await this.supabase
      .from('state_machines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStateMachine(schoolId: string, id: string, data: Partial<StateMachine>): Promise<StateMachine> {
    const { data: result, error } = await this.supabase
      .from('state_machines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSStateMachineError(error.message);
    return result;
  }

  async deleteStateMachine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('state_machines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSStateMachineError(error.message);
  }

  async listStateMachine(schoolId: string, filters?: Record<string, unknown>): Promise<StateMachine[]> {
    let query = this.supabase.from('state_machines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSStateMachineError(error.message);
    return data ?? [];
  }

  async createWorkflowCondition(schoolId: string, data: WorkflowCondition): Promise<WorkflowCondition> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_conditions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowConditionError(error.message);
    return result;
  }

  async getWorkflowCondition(schoolId: string, id: string): Promise<WorkflowCondition | null> {
    const { data, error } = await this.supabase
      .from('workflow_conditions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowCondition(schoolId: string, id: string, data: Partial<WorkflowCondition>): Promise<WorkflowCondition> {
    const { data: result, error } = await this.supabase
      .from('workflow_conditions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowConditionError(error.message);
    return result;
  }

  async deleteWorkflowCondition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_conditions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowConditionError(error.message);
  }

  async listWorkflowCondition(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowCondition[]> {
    let query = this.supabase.from('workflow_conditions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowConditionError(error.message);
    return data ?? [];
  }

  async createWorkflowBranch(schoolId: string, data: WorkflowBranch): Promise<WorkflowBranch> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_branches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowBranchError(error.message);
    return result;
  }

  async getWorkflowBranch(schoolId: string, id: string): Promise<WorkflowBranch | null> {
    const { data, error } = await this.supabase
      .from('workflow_branches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowBranch(schoolId: string, id: string, data: Partial<WorkflowBranch>): Promise<WorkflowBranch> {
    const { data: result, error } = await this.supabase
      .from('workflow_branches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowBranchError(error.message);
    return result;
  }

  async deleteWorkflowBranch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_branches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowBranchError(error.message);
  }

  async listWorkflowBranch(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowBranch[]> {
    let query = this.supabase.from('workflow_branches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowBranchError(error.message);
    return data ?? [];
  }

  async createWorkflowLoop(schoolId: string, data: WorkflowLoop): Promise<WorkflowLoop> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_loops')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowLoopError(error.message);
    return result;
  }

  async getWorkflowLoop(schoolId: string, id: string): Promise<WorkflowLoop | null> {
    const { data, error } = await this.supabase
      .from('workflow_loops')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowLoop(schoolId: string, id: string, data: Partial<WorkflowLoop>): Promise<WorkflowLoop> {
    const { data: result, error } = await this.supabase
      .from('workflow_loops')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowLoopError(error.message);
    return result;
  }

  async deleteWorkflowLoop(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_loops')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowLoopError(error.message);
  }

  async listWorkflowLoop(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowLoop[]> {
    let query = this.supabase.from('workflow_loops').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowLoopError(error.message);
    return data ?? [];
  }

  async createHumanApproval(schoolId: string, data: HumanApproval): Promise<HumanApproval> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('human_approvals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSHumanApprovalError(error.message);
    return result;
  }

  async getHumanApproval(schoolId: string, id: string): Promise<HumanApproval | null> {
    const { data, error } = await this.supabase
      .from('human_approvals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHumanApproval(schoolId: string, id: string, data: Partial<HumanApproval>): Promise<HumanApproval> {
    const { data: result, error } = await this.supabase
      .from('human_approvals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSHumanApprovalError(error.message);
    return result;
  }

  async deleteHumanApproval(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('human_approvals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSHumanApprovalError(error.message);
  }

  async listHumanApproval(schoolId: string, filters?: Record<string, unknown>): Promise<HumanApproval[]> {
    let query = this.supabase.from('human_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSHumanApprovalError(error.message);
    return data ?? [];
  }

  async createWorkflowSLA(schoolId: string, data: WorkflowSLA): Promise<WorkflowSLA> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_slas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowSLAError(error.message);
    return result;
  }

  async getWorkflowSLA(schoolId: string, id: string): Promise<WorkflowSLA | null> {
    const { data, error } = await this.supabase
      .from('workflow_slas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowSLA(schoolId: string, id: string, data: Partial<WorkflowSLA>): Promise<WorkflowSLA> {
    const { data: result, error } = await this.supabase
      .from('workflow_slas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowSLAError(error.message);
    return result;
  }

  async deleteWorkflowSLA(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_slas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowSLAError(error.message);
  }

  async listWorkflowSLA(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowSLA[]> {
    let query = this.supabase.from('workflow_slas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowSLAError(error.message);
    return data ?? [];
  }

  async createWorkflowEscalation(schoolId: string, data: WorkflowEscalation): Promise<WorkflowEscalation> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_escalations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowEscalationError(error.message);
    return result;
  }

  async getWorkflowEscalation(schoolId: string, id: string): Promise<WorkflowEscalation | null> {
    const { data, error } = await this.supabase
      .from('workflow_escalations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowEscalation(schoolId: string, id: string, data: Partial<WorkflowEscalation>): Promise<WorkflowEscalation> {
    const { data: result, error } = await this.supabase
      .from('workflow_escalations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowEscalationError(error.message);
    return result;
  }

  async deleteWorkflowEscalation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_escalations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowEscalationError(error.message);
  }

  async listWorkflowEscalation(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEscalation[]> {
    let query = this.supabase.from('workflow_escalations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowEscalationError(error.message);
    return data ?? [];
  }

  async createWorkflowRetry(schoolId: string, data: WorkflowRetry): Promise<WorkflowRetry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_retries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowRetryError(error.message);
    return result;
  }

  async getWorkflowRetry(schoolId: string, id: string): Promise<WorkflowRetry | null> {
    const { data, error } = await this.supabase
      .from('workflow_retries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowRetry(schoolId: string, id: string, data: Partial<WorkflowRetry>): Promise<WorkflowRetry> {
    const { data: result, error } = await this.supabase
      .from('workflow_retries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowRetryError(error.message);
    return result;
  }

  async deleteWorkflowRetry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_retries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowRetryError(error.message);
  }

  async listWorkflowRetry(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRetry[]> {
    let query = this.supabase.from('workflow_retries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowRetryError(error.message);
    return data ?? [];
  }

  async createWorkflowRollback(schoolId: string, data: WorkflowRollback): Promise<WorkflowRollback> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_rollbacks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowRollbackError(error.message);
    return result;
  }

  async getWorkflowRollback(schoolId: string, id: string): Promise<WorkflowRollback | null> {
    const { data, error } = await this.supabase
      .from('workflow_rollbacks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowRollback(schoolId: string, id: string, data: Partial<WorkflowRollback>): Promise<WorkflowRollback> {
    const { data: result, error } = await this.supabase
      .from('workflow_rollbacks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowRollbackError(error.message);
    return result;
  }

  async deleteWorkflowRollback(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_rollbacks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowRollbackError(error.message);
  }

  async listWorkflowRollback(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRollback[]> {
    let query = this.supabase.from('workflow_rollbacks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowRollbackError(error.message);
    return data ?? [];
  }

  async createWorkflowCompensation(schoolId: string, data: WorkflowCompensation): Promise<WorkflowCompensation> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_compensations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowCompensationError(error.message);
    return result;
  }

  async getWorkflowCompensation(schoolId: string, id: string): Promise<WorkflowCompensation | null> {
    const { data, error } = await this.supabase
      .from('workflow_compensations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowCompensation(schoolId: string, id: string, data: Partial<WorkflowCompensation>): Promise<WorkflowCompensation> {
    const { data: result, error } = await this.supabase
      .from('workflow_compensations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowCompensationError(error.message);
    return result;
  }

  async deleteWorkflowCompensation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_compensations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowCompensationError(error.message);
  }

  async listWorkflowCompensation(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowCompensation[]> {
    let query = this.supabase.from('workflow_compensations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowCompensationError(error.message);
    return data ?? [];
  }

  async createWorkflowTimer(schoolId: string, data: WorkflowTimer): Promise<WorkflowTimer> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_timers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowTimerError(error.message);
    return result;
  }

  async getWorkflowTimer(schoolId: string, id: string): Promise<WorkflowTimer | null> {
    const { data, error } = await this.supabase
      .from('workflow_timers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowTimer(schoolId: string, id: string, data: Partial<WorkflowTimer>): Promise<WorkflowTimer> {
    const { data: result, error } = await this.supabase
      .from('workflow_timers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowTimerError(error.message);
    return result;
  }

  async deleteWorkflowTimer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_timers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowTimerError(error.message);
  }

  async listWorkflowTimer(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowTimer[]> {
    let query = this.supabase.from('workflow_timers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowTimerError(error.message);
    return data ?? [];
  }

  async createScheduledWorkflow(schoolId: string, data: ScheduledWorkflow): Promise<ScheduledWorkflow> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scheduled_workflows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSScheduledWorkflowError(error.message);
    return result;
  }

  async getScheduledWorkflow(schoolId: string, id: string): Promise<ScheduledWorkflow | null> {
    const { data, error } = await this.supabase
      .from('scheduled_workflows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScheduledWorkflow(schoolId: string, id: string, data: Partial<ScheduledWorkflow>): Promise<ScheduledWorkflow> {
    const { data: result, error } = await this.supabase
      .from('scheduled_workflows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSScheduledWorkflowError(error.message);
    return result;
  }

  async deleteScheduledWorkflow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scheduled_workflows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSScheduledWorkflowError(error.message);
  }

  async listScheduledWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<ScheduledWorkflow[]> {
    let query = this.supabase.from('scheduled_workflows').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSScheduledWorkflowError(error.message);
    return data ?? [];
  }

  async createWorkflowTemplate(schoolId: string, data: WorkflowTemplate): Promise<WorkflowTemplate> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowTemplateError(error.message);
    return result;
  }

  async getWorkflowTemplate(schoolId: string, id: string): Promise<WorkflowTemplate | null> {
    const { data, error } = await this.supabase
      .from('workflow_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowTemplate(schoolId: string, id: string, data: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const { data: result, error } = await this.supabase
      .from('workflow_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowTemplateError(error.message);
    return result;
  }

  async deleteWorkflowTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowTemplateError(error.message);
  }

  async listWorkflowTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowTemplate[]> {
    let query = this.supabase.from('workflow_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowTemplateError(error.message);
    return data ?? [];
  }

  async createWorkflowVersioning(schoolId: string, data: WorkflowVersioning): Promise<WorkflowVersioning> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_versionings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowVersioningError(error.message);
    return result;
  }

  async getWorkflowVersioning(schoolId: string, id: string): Promise<WorkflowVersioning | null> {
    const { data, error } = await this.supabase
      .from('workflow_versionings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowVersioning(schoolId: string, id: string, data: Partial<WorkflowVersioning>): Promise<WorkflowVersioning> {
    const { data: result, error } = await this.supabase
      .from('workflow_versionings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowVersioningError(error.message);
    return result;
  }

  async deleteWorkflowVersioning(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_versionings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowVersioningError(error.message);
  }

  async listWorkflowVersioning(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowVersioning[]> {
    let query = this.supabase.from('workflow_versionings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowVersioningError(error.message);
    return data ?? [];
  }

  async createWorkflowAuditTrail(schoolId: string, data: WorkflowAuditTrail): Promise<WorkflowAuditTrail> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_audit_trails')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowAuditTrailError(error.message);
    return result;
  }

  async getWorkflowAuditTrail(schoolId: string, id: string): Promise<WorkflowAuditTrail | null> {
    const { data, error } = await this.supabase
      .from('workflow_audit_trails')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowAuditTrail(schoolId: string, id: string, data: Partial<WorkflowAuditTrail>): Promise<WorkflowAuditTrail> {
    const { data: result, error } = await this.supabase
      .from('workflow_audit_trails')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowAuditTrailError(error.message);
    return result;
  }

  async deleteWorkflowAuditTrail(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_audit_trails')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowAuditTrailError(error.message);
  }

  async listWorkflowAuditTrail(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowAuditTrail[]> {
    let query = this.supabase.from('workflow_audit_trails').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowAuditTrailError(error.message);
    return data ?? [];
  }

  async createWorkflowInstance(schoolId: string, data: WorkflowInstance): Promise<WorkflowInstance> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_instances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowInstanceError(error.message);
    return result;
  }

  async getWorkflowInstance(schoolId: string, id: string): Promise<WorkflowInstance | null> {
    const { data, error } = await this.supabase
      .from('workflow_instances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowInstance(schoolId: string, id: string, data: Partial<WorkflowInstance>): Promise<WorkflowInstance> {
    const { data: result, error } = await this.supabase
      .from('workflow_instances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowInstanceError(error.message);
    return result;
  }

  async deleteWorkflowInstance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_instances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowInstanceError(error.message);
  }

  async listWorkflowInstance(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowInstance[]> {
    let query = this.supabase.from('workflow_instances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowInstanceError(error.message);
    return data ?? [];
  }

  // -- Digital Identity --------

  async createNationalEducationIdentity(schoolId: string, data: NationalEducationIdentity): Promise<NationalEducationIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_education_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSNationalEducationIdentityError(error.message);
    return result;
  }

  async getNationalEducationIdentity(schoolId: string, id: string): Promise<NationalEducationIdentity | null> {
    const { data, error } = await this.supabase
      .from('national_education_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNationalEducationIdentity(schoolId: string, id: string, data: Partial<NationalEducationIdentity>): Promise<NationalEducationIdentity> {
    const { data: result, error } = await this.supabase
      .from('national_education_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSNationalEducationIdentityError(error.message);
    return result;
  }

  async deleteNationalEducationIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_education_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSNationalEducationIdentityError(error.message);
  }

  async listNationalEducationIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<NationalEducationIdentity[]> {
    let query = this.supabase.from('national_education_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSNationalEducationIdentityError(error.message);
    return data ?? [];
  }

  async createStudentIdentity(schoolId: string, data: StudentIdentity): Promise<StudentIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSStudentIdentityError(error.message);
    return result;
  }

  async getStudentIdentity(schoolId: string, id: string): Promise<StudentIdentity | null> {
    const { data, error } = await this.supabase
      .from('student_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStudentIdentity(schoolId: string, id: string, data: Partial<StudentIdentity>): Promise<StudentIdentity> {
    const { data: result, error } = await this.supabase
      .from('student_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSStudentIdentityError(error.message);
    return result;
  }

  async deleteStudentIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSStudentIdentityError(error.message);
  }

  async listStudentIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<StudentIdentity[]> {
    let query = this.supabase.from('student_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSStudentIdentityError(error.message);
    return data ?? [];
  }

  async createTeacherIdentity(schoolId: string, data: TeacherIdentity): Promise<TeacherIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSTeacherIdentityError(error.message);
    return result;
  }

  async getTeacherIdentity(schoolId: string, id: string): Promise<TeacherIdentity | null> {
    const { data, error } = await this.supabase
      .from('teacher_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherIdentity(schoolId: string, id: string, data: Partial<TeacherIdentity>): Promise<TeacherIdentity> {
    const { data: result, error } = await this.supabase
      .from('teacher_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSTeacherIdentityError(error.message);
    return result;
  }

  async deleteTeacherIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSTeacherIdentityError(error.message);
  }

  async listTeacherIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherIdentity[]> {
    let query = this.supabase.from('teacher_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSTeacherIdentityError(error.message);
    return data ?? [];
  }

  async createParentIdentity(schoolId: string, data: ParentIdentity): Promise<ParentIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('parent_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSParentIdentityError(error.message);
    return result;
  }

  async getParentIdentity(schoolId: string, id: string): Promise<ParentIdentity | null> {
    const { data, error } = await this.supabase
      .from('parent_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateParentIdentity(schoolId: string, id: string, data: Partial<ParentIdentity>): Promise<ParentIdentity> {
    const { data: result, error } = await this.supabase
      .from('parent_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSParentIdentityError(error.message);
    return result;
  }

  async deleteParentIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSParentIdentityError(error.message);
  }

  async listParentIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<ParentIdentity[]> {
    let query = this.supabase.from('parent_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSParentIdentityError(error.message);
    return data ?? [];
  }

  async createSchoolIdentity(schoolId: string, data: SchoolIdentity): Promise<SchoolIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSchoolIdentityError(error.message);
    return result;
  }

  async getSchoolIdentity(schoolId: string, id: string): Promise<SchoolIdentity | null> {
    const { data, error } = await this.supabase
      .from('school_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSchoolIdentity(schoolId: string, id: string, data: Partial<SchoolIdentity>): Promise<SchoolIdentity> {
    const { data: result, error } = await this.supabase
      .from('school_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSchoolIdentityError(error.message);
    return result;
  }

  async deleteSchoolIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSchoolIdentityError(error.message);
  }

  async listSchoolIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolIdentity[]> {
    let query = this.supabase.from('school_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSchoolIdentityError(error.message);
    return data ?? [];
  }

  async createOrganizationIdentity(schoolId: string, data: OrganizationIdentity): Promise<OrganizationIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('organization_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSOrganizationIdentityError(error.message);
    return result;
  }

  async getOrganizationIdentity(schoolId: string, id: string): Promise<OrganizationIdentity | null> {
    const { data, error } = await this.supabase
      .from('organization_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateOrganizationIdentity(schoolId: string, id: string, data: Partial<OrganizationIdentity>): Promise<OrganizationIdentity> {
    const { data: result, error } = await this.supabase
      .from('organization_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSOrganizationIdentityError(error.message);
    return result;
  }

  async deleteOrganizationIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('organization_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSOrganizationIdentityError(error.message);
  }

  async listOrganizationIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<OrganizationIdentity[]> {
    let query = this.supabase.from('organization_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSOrganizationIdentityError(error.message);
    return data ?? [];
  }

  async createIdentityFederation(schoolId: string, data: IdentityFederation): Promise<IdentityFederation> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_federations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIdentityFederationError(error.message);
    return result;
  }

  async getIdentityFederation(schoolId: string, id: string): Promise<IdentityFederation | null> {
    const { data, error } = await this.supabase
      .from('identity_federations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIdentityFederation(schoolId: string, id: string, data: Partial<IdentityFederation>): Promise<IdentityFederation> {
    const { data: result, error } = await this.supabase
      .from('identity_federations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIdentityFederationError(error.message);
    return result;
  }

  async deleteIdentityFederation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_federations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIdentityFederationError(error.message);
  }

  async listIdentityFederation(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityFederation[]> {
    let query = this.supabase.from('identity_federations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIdentityFederationError(error.message);
    return data ?? [];
  }

  async createSSOConfiguration(schoolId: string, data: SSOConfiguration): Promise<SSOConfiguration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sso_configurations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSSOConfigurationError(error.message);
    return result;
  }

  async getSSOConfiguration(schoolId: string, id: string): Promise<SSOConfiguration | null> {
    const { data, error } = await this.supabase
      .from('sso_configurations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSSOConfiguration(schoolId: string, id: string, data: Partial<SSOConfiguration>): Promise<SSOConfiguration> {
    const { data: result, error } = await this.supabase
      .from('sso_configurations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSSOConfigurationError(error.message);
    return result;
  }

  async deleteSSOConfiguration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sso_configurations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSSOConfigurationError(error.message);
  }

  async listSSOConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<SSOConfiguration[]> {
    let query = this.supabase.from('sso_configurations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSSOConfigurationError(error.message);
    return data ?? [];
  }

  async createOAuthConfiguration(schoolId: string, data: OAuthConfiguration): Promise<OAuthConfiguration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('oauth_configurations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSOAuthConfigurationError(error.message);
    return result;
  }

  async getOAuthConfiguration(schoolId: string, id: string): Promise<OAuthConfiguration | null> {
    const { data, error } = await this.supabase
      .from('oauth_configurations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateOAuthConfiguration(schoolId: string, id: string, data: Partial<OAuthConfiguration>): Promise<OAuthConfiguration> {
    const { data: result, error } = await this.supabase
      .from('oauth_configurations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSOAuthConfigurationError(error.message);
    return result;
  }

  async deleteOAuthConfiguration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('oauth_configurations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSOAuthConfigurationError(error.message);
  }

  async listOAuthConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<OAuthConfiguration[]> {
    let query = this.supabase.from('oauth_configurations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSOAuthConfigurationError(error.message);
    return data ?? [];
  }

  async createSAMLConfiguration(schoolId: string, data: SAMLConfiguration): Promise<SAMLConfiguration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('saml_configurations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSAMLConfigurationError(error.message);
    return result;
  }

  async getSAMLConfiguration(schoolId: string, id: string): Promise<SAMLConfiguration | null> {
    const { data, error } = await this.supabase
      .from('saml_configurations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSAMLConfiguration(schoolId: string, id: string, data: Partial<SAMLConfiguration>): Promise<SAMLConfiguration> {
    const { data: result, error } = await this.supabase
      .from('saml_configurations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSAMLConfigurationError(error.message);
    return result;
  }

  async deleteSAMLConfiguration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('saml_configurations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSAMLConfigurationError(error.message);
  }

  async listSAMLConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<SAMLConfiguration[]> {
    let query = this.supabase.from('saml_configurations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSAMLConfigurationError(error.message);
    return data ?? [];
  }

  async createLDAPConfiguration(schoolId: string, data: LDAPConfiguration): Promise<LDAPConfiguration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ldap_configurations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSLDAPConfigurationError(error.message);
    return result;
  }

  async getLDAPConfiguration(schoolId: string, id: string): Promise<LDAPConfiguration | null> {
    const { data, error } = await this.supabase
      .from('ldap_configurations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLDAPConfiguration(schoolId: string, id: string, data: Partial<LDAPConfiguration>): Promise<LDAPConfiguration> {
    const { data: result, error } = await this.supabase
      .from('ldap_configurations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSLDAPConfigurationError(error.message);
    return result;
  }

  async deleteLDAPConfiguration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ldap_configurations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSLDAPConfigurationError(error.message);
  }

  async listLDAPConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<LDAPConfiguration[]> {
    let query = this.supabase.from('ldap_configurations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSLDAPConfigurationError(error.message);
    return data ?? [];
  }

  async createBiometricIdentity(schoolId: string, data: BiometricIdentity): Promise<BiometricIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('biometric_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBiometricIdentityError(error.message);
    return result;
  }

  async getBiometricIdentity(schoolId: string, id: string): Promise<BiometricIdentity | null> {
    const { data, error } = await this.supabase
      .from('biometric_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBiometricIdentity(schoolId: string, id: string, data: Partial<BiometricIdentity>): Promise<BiometricIdentity> {
    const { data: result, error } = await this.supabase
      .from('biometric_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBiometricIdentityError(error.message);
    return result;
  }

  async deleteBiometricIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('biometric_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBiometricIdentityError(error.message);
  }

  async listBiometricIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricIdentity[]> {
    let query = this.supabase.from('biometric_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBiometricIdentityError(error.message);
    return data ?? [];
  }

  async createQRIdentity(schoolId: string, data: QRIdentity): Promise<QRIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('qr_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSQRIdentityError(error.message);
    return result;
  }

  async getQRIdentity(schoolId: string, id: string): Promise<QRIdentity | null> {
    const { data, error } = await this.supabase
      .from('qr_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateQRIdentity(schoolId: string, id: string, data: Partial<QRIdentity>): Promise<QRIdentity> {
    const { data: result, error } = await this.supabase
      .from('qr_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSQRIdentityError(error.message);
    return result;
  }

  async deleteQRIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('qr_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSQRIdentityError(error.message);
  }

  async listQRIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<QRIdentity[]> {
    let query = this.supabase.from('qr_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSQRIdentityError(error.message);
    return data ?? [];
  }

  async createNFCIdentity(schoolId: string, data: NFCIdentity): Promise<NFCIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('nfc_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSNFCIdentityError(error.message);
    return result;
  }

  async getNFCIdentity(schoolId: string, id: string): Promise<NFCIdentity | null> {
    const { data, error } = await this.supabase
      .from('nfc_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNFCIdentity(schoolId: string, id: string, data: Partial<NFCIdentity>): Promise<NFCIdentity> {
    const { data: result, error } = await this.supabase
      .from('nfc_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSNFCIdentityError(error.message);
    return result;
  }

  async deleteNFCIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('nfc_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSNFCIdentityError(error.message);
  }

  async listNFCIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<NFCIdentity[]> {
    let query = this.supabase.from('nfc_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSNFCIdentityError(error.message);
    return data ?? [];
  }

  async createDigitalWalletIdentity(schoolId: string, data: DigitalWalletIdentity): Promise<DigitalWalletIdentity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('digital_wallet_identities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDigitalWalletIdentityError(error.message);
    return result;
  }

  async getDigitalWalletIdentity(schoolId: string, id: string): Promise<DigitalWalletIdentity | null> {
    const { data, error } = await this.supabase
      .from('digital_wallet_identities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDigitalWalletIdentity(schoolId: string, id: string, data: Partial<DigitalWalletIdentity>): Promise<DigitalWalletIdentity> {
    const { data: result, error } = await this.supabase
      .from('digital_wallet_identities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDigitalWalletIdentityError(error.message);
    return result;
  }

  async deleteDigitalWalletIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_wallet_identities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDigitalWalletIdentityError(error.message);
  }

  async listDigitalWalletIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalWalletIdentity[]> {
    let query = this.supabase.from('digital_wallet_identities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDigitalWalletIdentityError(error.message);
    return data ?? [];
  }

  async createIdentityVerification(schoolId: string, data: IdentityVerification): Promise<IdentityVerification> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_verifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIdentityVerificationError(error.message);
    return result;
  }

  async getIdentityVerification(schoolId: string, id: string): Promise<IdentityVerification | null> {
    const { data, error } = await this.supabase
      .from('identity_verifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIdentityVerification(schoolId: string, id: string, data: Partial<IdentityVerification>): Promise<IdentityVerification> {
    const { data: result, error } = await this.supabase
      .from('identity_verifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIdentityVerificationError(error.message);
    return result;
  }

  async deleteIdentityVerification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_verifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIdentityVerificationError(error.message);
  }

  async listIdentityVerification(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    let query = this.supabase.from('identity_verifications').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIdentityVerificationError(error.message);
    return data ?? [];
  }

  async createIdentityConsent(schoolId: string, data: IdentityConsent): Promise<IdentityConsent> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_consents')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIdentityConsentError(error.message);
    return result;
  }

  async getIdentityConsent(schoolId: string, id: string): Promise<IdentityConsent | null> {
    const { data, error } = await this.supabase
      .from('identity_consents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIdentityConsent(schoolId: string, id: string, data: Partial<IdentityConsent>): Promise<IdentityConsent> {
    const { data: result, error } = await this.supabase
      .from('identity_consents')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIdentityConsentError(error.message);
    return result;
  }

  async deleteIdentityConsent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_consents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIdentityConsentError(error.message);
  }

  async listIdentityConsent(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityConsent[]> {
    let query = this.supabase.from('identity_consents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIdentityConsentError(error.message);
    return data ?? [];
  }

  async createIdentityAccessLog(schoolId: string, data: IdentityAccessLog): Promise<IdentityAccessLog> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_access_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIdentityAccessLogError(error.message);
    return result;
  }

  async getIdentityAccessLog(schoolId: string, id: string): Promise<IdentityAccessLog | null> {
    const { data, error } = await this.supabase
      .from('identity_access_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIdentityAccessLog(schoolId: string, id: string, data: Partial<IdentityAccessLog>): Promise<IdentityAccessLog> {
    const { data: result, error } = await this.supabase
      .from('identity_access_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIdentityAccessLogError(error.message);
    return result;
  }

  async deleteIdentityAccessLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_access_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIdentityAccessLogError(error.message);
  }

  async listIdentityAccessLog(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAccessLog[]> {
    let query = this.supabase.from('identity_access_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIdentityAccessLogError(error.message);
    return data ?? [];
  }

  async createIdentityEncryption(schoolId: string, data: IdentityEncryption): Promise<IdentityEncryption> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_encryptions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIdentityEncryptionError(error.message);
    return result;
  }

  async getIdentityEncryption(schoolId: string, id: string): Promise<IdentityEncryption | null> {
    const { data, error } = await this.supabase
      .from('identity_encryptions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIdentityEncryption(schoolId: string, id: string, data: Partial<IdentityEncryption>): Promise<IdentityEncryption> {
    const { data: result, error } = await this.supabase
      .from('identity_encryptions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIdentityEncryptionError(error.message);
    return result;
  }

  async deleteIdentityEncryption(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_encryptions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIdentityEncryptionError(error.message);
  }

  async listIdentityEncryption(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityEncryption[]> {
    let query = this.supabase.from('identity_encryptions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIdentityEncryptionError(error.message);
    return data ?? [];
  }

  // -- Education Wallet --------

  async createEducationWallet(schoolId: string, data: EducationWallet): Promise<EducationWallet> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('education_wallets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSEducationWalletError(error.message);
    return result;
  }

  async getEducationWallet(schoolId: string, id: string): Promise<EducationWallet | null> {
    const { data, error } = await this.supabase
      .from('education_wallets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEducationWallet(schoolId: string, id: string, data: Partial<EducationWallet>): Promise<EducationWallet> {
    const { data: result, error } = await this.supabase
      .from('education_wallets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSEducationWalletError(error.message);
    return result;
  }

  async deleteEducationWallet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('education_wallets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSEducationWalletError(error.message);
  }

  async listEducationWallet(schoolId: string, filters?: Record<string, unknown>): Promise<EducationWallet[]> {
    let query = this.supabase.from('education_wallets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSEducationWalletError(error.message);
    return data ?? [];
  }

  async createWalletCredits(schoolId: string, data: WalletCredits): Promise<WalletCredits> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('wallet_credits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWalletCreditsError(error.message);
    return result;
  }

  async getWalletCredits(schoolId: string, id: string): Promise<WalletCredits | null> {
    const { data, error } = await this.supabase
      .from('wallet_credits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWalletCredits(schoolId: string, id: string, data: Partial<WalletCredits>): Promise<WalletCredits> {
    const { data: result, error } = await this.supabase
      .from('wallet_credits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWalletCreditsError(error.message);
    return result;
  }

  async deleteWalletCredits(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('wallet_credits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWalletCreditsError(error.message);
  }

  async listWalletCredits(schoolId: string, filters?: Record<string, unknown>): Promise<WalletCredits[]> {
    let query = this.supabase.from('wallet_credits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWalletCreditsError(error.message);
    return data ?? [];
  }

  async createScholarship(schoolId: string, data: Scholarship): Promise<Scholarship> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scholarships')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSScholarshipError(error.message);
    return result;
  }

  async getScholarship(schoolId: string, id: string): Promise<Scholarship | null> {
    const { data, error } = await this.supabase
      .from('scholarships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScholarship(schoolId: string, id: string, data: Partial<Scholarship>): Promise<Scholarship> {
    const { data: result, error } = await this.supabase
      .from('scholarships')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSScholarshipError(error.message);
    return result;
  }

  async deleteScholarship(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scholarships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSScholarshipError(error.message);
  }

  async listScholarship(schoolId: string, filters?: Record<string, unknown>): Promise<Scholarship[]> {
    let query = this.supabase.from('scholarships').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSScholarshipError(error.message);
    return data ?? [];
  }

  async createGovernmentGrant(schoolId: string, data: GovernmentGrant): Promise<GovernmentGrant> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_grants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSGovernmentGrantError(error.message);
    return result;
  }

  async getGovernmentGrant(schoolId: string, id: string): Promise<GovernmentGrant | null> {
    const { data, error } = await this.supabase
      .from('government_grants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateGovernmentGrant(schoolId: string, id: string, data: Partial<GovernmentGrant>): Promise<GovernmentGrant> {
    const { data: result, error } = await this.supabase
      .from('government_grants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSGovernmentGrantError(error.message);
    return result;
  }

  async deleteGovernmentGrant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_grants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSGovernmentGrantError(error.message);
  }

  async listGovernmentGrant(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentGrant[]> {
    let query = this.supabase.from('government_grants').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSGovernmentGrantError(error.message);
    return data ?? [];
  }

  async createSubsidy(schoolId: string, data: Subsidy): Promise<Subsidy> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('subsidies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSubsidyError(error.message);
    return result;
  }

  async getSubsidy(schoolId: string, id: string): Promise<Subsidy | null> {
    const { data, error } = await this.supabase
      .from('subsidies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSubsidy(schoolId: string, id: string, data: Partial<Subsidy>): Promise<Subsidy> {
    const { data: result, error } = await this.supabase
      .from('subsidies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSubsidyError(error.message);
    return result;
  }

  async deleteSubsidy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('subsidies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSubsidyError(error.message);
  }

  async listSubsidy(schoolId: string, filters?: Record<string, unknown>): Promise<Subsidy[]> {
    let query = this.supabase.from('subsidies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSubsidyError(error.message);
    return data ?? [];
  }

  async createLearningCredits(schoolId: string, data: LearningCredits): Promise<LearningCredits> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('learning_credits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSLearningCreditsError(error.message);
    return result;
  }

  async getLearningCredits(schoolId: string, id: string): Promise<LearningCredits | null> {
    const { data, error } = await this.supabase
      .from('learning_credits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLearningCredits(schoolId: string, id: string, data: Partial<LearningCredits>): Promise<LearningCredits> {
    const { data: result, error } = await this.supabase
      .from('learning_credits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSLearningCreditsError(error.message);
    return result;
  }

  async deleteLearningCredits(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_credits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSLearningCreditsError(error.message);
  }

  async listLearningCredits(schoolId: string, filters?: Record<string, unknown>): Promise<LearningCredits[]> {
    let query = this.supabase.from('learning_credits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSLearningCreditsError(error.message);
    return data ?? [];
  }

  async createPaymentWallet(schoolId: string, data: PaymentWallet): Promise<PaymentWallet> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('payment_wallets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSPaymentWalletError(error.message);
    return result;
  }

  async getPaymentWallet(schoolId: string, id: string): Promise<PaymentWallet | null> {
    const { data, error } = await this.supabase
      .from('payment_wallets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePaymentWallet(schoolId: string, id: string, data: Partial<PaymentWallet>): Promise<PaymentWallet> {
    const { data: result, error } = await this.supabase
      .from('payment_wallets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSPaymentWalletError(error.message);
    return result;
  }

  async deletePaymentWallet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('payment_wallets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSPaymentWalletError(error.message);
  }

  async listPaymentWallet(schoolId: string, filters?: Record<string, unknown>): Promise<PaymentWallet[]> {
    let query = this.supabase.from('payment_wallets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSPaymentWalletError(error.message);
    return data ?? [];
  }

  async createDigitalCertificateWallet(schoolId: string, data: DigitalCertificateWallet): Promise<DigitalCertificateWallet> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('digital_certificate_wallets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDigitalCertificateWalletError(error.message);
    return result;
  }

  async getDigitalCertificateWallet(schoolId: string, id: string): Promise<DigitalCertificateWallet | null> {
    const { data, error } = await this.supabase
      .from('digital_certificate_wallets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDigitalCertificateWallet(schoolId: string, id: string, data: Partial<DigitalCertificateWallet>): Promise<DigitalCertificateWallet> {
    const { data: result, error } = await this.supabase
      .from('digital_certificate_wallets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDigitalCertificateWalletError(error.message);
    return result;
  }

  async deleteDigitalCertificateWallet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_certificate_wallets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDigitalCertificateWalletError(error.message);
  }

  async listDigitalCertificateWallet(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificateWallet[]> {
    let query = this.supabase.from('digital_certificate_wallets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDigitalCertificateWalletError(error.message);
    return data ?? [];
  }

  async createCredentialWallet(schoolId: string, data: CredentialWallet): Promise<CredentialWallet> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('credential_wallets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCredentialWalletError(error.message);
    return result;
  }

  async getCredentialWallet(schoolId: string, id: string): Promise<CredentialWallet | null> {
    const { data, error } = await this.supabase
      .from('credential_wallets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCredentialWallet(schoolId: string, id: string, data: Partial<CredentialWallet>): Promise<CredentialWallet> {
    const { data: result, error } = await this.supabase
      .from('credential_wallets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCredentialWalletError(error.message);
    return result;
  }

  async deleteCredentialWallet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('credential_wallets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCredentialWalletError(error.message);
  }

  async listCredentialWallet(schoolId: string, filters?: Record<string, unknown>): Promise<CredentialWallet[]> {
    let query = this.supabase.from('credential_wallets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCredentialWalletError(error.message);
    return data ?? [];
  }

  async createWalletLedger(schoolId: string, data: WalletLedger): Promise<WalletLedger> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('wallet_ledgers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWalletLedgerError(error.message);
    return result;
  }

  async getWalletLedger(schoolId: string, id: string): Promise<WalletLedger | null> {
    const { data, error } = await this.supabase
      .from('wallet_ledgers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWalletLedger(schoolId: string, id: string, data: Partial<WalletLedger>): Promise<WalletLedger> {
    const { data: result, error } = await this.supabase
      .from('wallet_ledgers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWalletLedgerError(error.message);
    return result;
  }

  async deleteWalletLedger(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('wallet_ledgers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWalletLedgerError(error.message);
  }

  async listWalletLedger(schoolId: string, filters?: Record<string, unknown>): Promise<WalletLedger[]> {
    let query = this.supabase.from('wallet_ledgers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWalletLedgerError(error.message);
    return data ?? [];
  }

  async createWalletTransaction(schoolId: string, data: WalletTransaction): Promise<WalletTransaction> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('wallet_transactions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWalletTransactionError(error.message);
    return result;
  }

  async getWalletTransaction(schoolId: string, id: string): Promise<WalletTransaction | null> {
    const { data, error } = await this.supabase
      .from('wallet_transactions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWalletTransaction(schoolId: string, id: string, data: Partial<WalletTransaction>): Promise<WalletTransaction> {
    const { data: result, error } = await this.supabase
      .from('wallet_transactions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWalletTransactionError(error.message);
    return result;
  }

  async deleteWalletTransaction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('wallet_transactions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWalletTransactionError(error.message);
  }

  async listWalletTransaction(schoolId: string, filters?: Record<string, unknown>): Promise<WalletTransaction[]> {
    let query = this.supabase.from('wallet_transactions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWalletTransactionError(error.message);
    return data ?? [];
  }

  async createWalletAnalytics(schoolId: string, data: WalletAnalytics): Promise<WalletAnalytics> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('wallet_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWalletAnalyticsError(error.message);
    return result;
  }

  async getWalletAnalytics(schoolId: string, id: string): Promise<WalletAnalytics | null> {
    const { data, error } = await this.supabase
      .from('wallet_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWalletAnalytics(schoolId: string, id: string, data: Partial<WalletAnalytics>): Promise<WalletAnalytics> {
    const { data: result, error } = await this.supabase
      .from('wallet_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWalletAnalyticsError(error.message);
    return result;
  }

  async deleteWalletAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('wallet_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWalletAnalyticsError(error.message);
  }

  async listWalletAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<WalletAnalytics[]> {
    let query = this.supabase.from('wallet_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWalletAnalyticsError(error.message);
    return data ?? [];
  }

  // -- Enterprise Marketplace --------

  async createMarketplaceProduct(schoolId: string, data: MarketplaceProduct): Promise<MarketplaceProduct> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_products')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceProductError(error.message);
    return result;
  }

  async getMarketplaceProduct(schoolId: string, id: string): Promise<MarketplaceProduct | null> {
    const { data, error } = await this.supabase
      .from('marketplace_products')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceProduct(schoolId: string, id: string, data: Partial<MarketplaceProduct>): Promise<MarketplaceProduct> {
    const { data: result, error } = await this.supabase
      .from('marketplace_products')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceProductError(error.message);
    return result;
  }

  async deleteMarketplaceProduct(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_products')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceProductError(error.message);
  }

  async listMarketplaceProduct(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceProduct[]> {
    let query = this.supabase.from('marketplace_products').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceProductError(error.message);
    return data ?? [];
  }

  async createMarketplacePlugin(schoolId: string, data: MarketplacePlugin): Promise<MarketplacePlugin> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_plugins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplacePluginError(error.message);
    return result;
  }

  async getMarketplacePlugin(schoolId: string, id: string): Promise<MarketplacePlugin | null> {
    const { data, error } = await this.supabase
      .from('marketplace_plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplacePlugin(schoolId: string, id: string, data: Partial<MarketplacePlugin>): Promise<MarketplacePlugin> {
    const { data: result, error } = await this.supabase
      .from('marketplace_plugins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplacePluginError(error.message);
    return result;
  }

  async deleteMarketplacePlugin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplacePluginError(error.message);
  }

  async listMarketplacePlugin(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplacePlugin[]> {
    let query = this.supabase.from('marketplace_plugins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplacePluginError(error.message);
    return data ?? [];
  }

  async createMarketplaceExtension(schoolId: string, data: MarketplaceExtension): Promise<MarketplaceExtension> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_extensions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceExtensionError(error.message);
    return result;
  }

  async getMarketplaceExtension(schoolId: string, id: string): Promise<MarketplaceExtension | null> {
    const { data, error } = await this.supabase
      .from('marketplace_extensions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceExtension(schoolId: string, id: string, data: Partial<MarketplaceExtension>): Promise<MarketplaceExtension> {
    const { data: result, error } = await this.supabase
      .from('marketplace_extensions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceExtensionError(error.message);
    return result;
  }

  async deleteMarketplaceExtension(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_extensions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceExtensionError(error.message);
  }

  async listMarketplaceExtension(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceExtension[]> {
    let query = this.supabase.from('marketplace_extensions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceExtensionError(error.message);
    return data ?? [];
  }

  async createMarketplaceCourse(schoolId: string, data: MarketplaceCourse): Promise<MarketplaceCourse> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_courses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceCourseError(error.message);
    return result;
  }

  async getMarketplaceCourse(schoolId: string, id: string): Promise<MarketplaceCourse | null> {
    const { data, error } = await this.supabase
      .from('marketplace_courses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceCourse(schoolId: string, id: string, data: Partial<MarketplaceCourse>): Promise<MarketplaceCourse> {
    const { data: result, error } = await this.supabase
      .from('marketplace_courses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceCourseError(error.message);
    return result;
  }

  async deleteMarketplaceCourse(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_courses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceCourseError(error.message);
  }

  async listMarketplaceCourse(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceCourse[]> {
    let query = this.supabase.from('marketplace_courses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceCourseError(error.message);
    return data ?? [];
  }

  async createMarketplaceBook(schoolId: string, data: MarketplaceBook): Promise<MarketplaceBook> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_books')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceBookError(error.message);
    return result;
  }

  async getMarketplaceBook(schoolId: string, id: string): Promise<MarketplaceBook | null> {
    const { data, error } = await this.supabase
      .from('marketplace_books')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceBook(schoolId: string, id: string, data: Partial<MarketplaceBook>): Promise<MarketplaceBook> {
    const { data: result, error } = await this.supabase
      .from('marketplace_books')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceBookError(error.message);
    return result;
  }

  async deleteMarketplaceBook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_books')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceBookError(error.message);
  }

  async listMarketplaceBook(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceBook[]> {
    let query = this.supabase.from('marketplace_books').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceBookError(error.message);
    return data ?? [];
  }

  async createMarketplaceAIModel(schoolId: string, data: MarketplaceAIModel): Promise<MarketplaceAIModel> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_ai_models')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceAIModelError(error.message);
    return result;
  }

  async getMarketplaceAIModel(schoolId: string, id: string): Promise<MarketplaceAIModel | null> {
    const { data, error } = await this.supabase
      .from('marketplace_ai_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceAIModel(schoolId: string, id: string, data: Partial<MarketplaceAIModel>): Promise<MarketplaceAIModel> {
    const { data: result, error } = await this.supabase
      .from('marketplace_ai_models')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceAIModelError(error.message);
    return result;
  }

  async deleteMarketplaceAIModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_ai_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceAIModelError(error.message);
  }

  async listMarketplaceAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceAIModel[]> {
    let query = this.supabase.from('marketplace_ai_models').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceAIModelError(error.message);
    return data ?? [];
  }

  async createMarketplaceTemplate(schoolId: string, data: MarketplaceTemplate): Promise<MarketplaceTemplate> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceTemplateError(error.message);
    return result;
  }

  async getMarketplaceTemplate(schoolId: string, id: string): Promise<MarketplaceTemplate | null> {
    const { data, error } = await this.supabase
      .from('marketplace_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceTemplate(schoolId: string, id: string, data: Partial<MarketplaceTemplate>): Promise<MarketplaceTemplate> {
    const { data: result, error } = await this.supabase
      .from('marketplace_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceTemplateError(error.message);
    return result;
  }

  async deleteMarketplaceTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceTemplateError(error.message);
  }

  async listMarketplaceTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceTemplate[]> {
    let query = this.supabase.from('marketplace_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceTemplateError(error.message);
    return data ?? [];
  }

  async createMarketplaceService(schoolId: string, data: MarketplaceService): Promise<MarketplaceService> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_services')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceServiceError(error.message);
    return result;
  }

  async getMarketplaceService(schoolId: string, id: string): Promise<MarketplaceService | null> {
    const { data, error } = await this.supabase
      .from('marketplace_services')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceService(schoolId: string, id: string, data: Partial<MarketplaceService>): Promise<MarketplaceService> {
    const { data: result, error } = await this.supabase
      .from('marketplace_services')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceServiceError(error.message);
    return result;
  }

  async deleteMarketplaceService(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_services')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceServiceError(error.message);
  }

  async listMarketplaceService(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceService[]> {
    let query = this.supabase.from('marketplace_services').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceServiceError(error.message);
    return data ?? [];
  }

  async createMarketplaceConsultant(schoolId: string, data: MarketplaceConsultant): Promise<MarketplaceConsultant> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_consultants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceConsultantError(error.message);
    return result;
  }

  async getMarketplaceConsultant(schoolId: string, id: string): Promise<MarketplaceConsultant | null> {
    const { data, error } = await this.supabase
      .from('marketplace_consultants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceConsultant(schoolId: string, id: string, data: Partial<MarketplaceConsultant>): Promise<MarketplaceConsultant> {
    const { data: result, error } = await this.supabase
      .from('marketplace_consultants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceConsultantError(error.message);
    return result;
  }

  async deleteMarketplaceConsultant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_consultants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceConsultantError(error.message);
  }

  async listMarketplaceConsultant(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceConsultant[]> {
    let query = this.supabase.from('marketplace_consultants').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceConsultantError(error.message);
    return data ?? [];
  }

  async createMarketplaceTutor(schoolId: string, data: MarketplaceTutor): Promise<MarketplaceTutor> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_tutors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceTutorError(error.message);
    return result;
  }

  async getMarketplaceTutor(schoolId: string, id: string): Promise<MarketplaceTutor | null> {
    const { data, error } = await this.supabase
      .from('marketplace_tutors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceTutor(schoolId: string, id: string, data: Partial<MarketplaceTutor>): Promise<MarketplaceTutor> {
    const { data: result, error } = await this.supabase
      .from('marketplace_tutors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceTutorError(error.message);
    return result;
  }

  async deleteMarketplaceTutor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_tutors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceTutorError(error.message);
  }

  async listMarketplaceTutor(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceTutor[]> {
    let query = this.supabase.from('marketplace_tutors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceTutorError(error.message);
    return data ?? [];
  }

  async createDigitalProduct(schoolId: string, data: DigitalProduct): Promise<DigitalProduct> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('digital_products')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDigitalProductError(error.message);
    return result;
  }

  async getDigitalProduct(schoolId: string, id: string): Promise<DigitalProduct | null> {
    const { data, error } = await this.supabase
      .from('digital_products')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDigitalProduct(schoolId: string, id: string, data: Partial<DigitalProduct>): Promise<DigitalProduct> {
    const { data: result, error } = await this.supabase
      .from('digital_products')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDigitalProductError(error.message);
    return result;
  }

  async deleteDigitalProduct(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_products')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDigitalProductError(error.message);
  }

  async listDigitalProduct(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalProduct[]> {
    let query = this.supabase.from('digital_products').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDigitalProductError(error.message);
    return data ?? [];
  }

  async createProductSubscription(schoolId: string, data: ProductSubscription): Promise<ProductSubscription> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('product_subscriptions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSProductSubscriptionError(error.message);
    return result;
  }

  async getProductSubscription(schoolId: string, id: string): Promise<ProductSubscription | null> {
    const { data, error } = await this.supabase
      .from('product_subscriptions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProductSubscription(schoolId: string, id: string, data: Partial<ProductSubscription>): Promise<ProductSubscription> {
    const { data: result, error } = await this.supabase
      .from('product_subscriptions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSProductSubscriptionError(error.message);
    return result;
  }

  async deleteProductSubscription(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('product_subscriptions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSProductSubscriptionError(error.message);
  }

  async listProductSubscription(schoolId: string, filters?: Record<string, unknown>): Promise<ProductSubscription[]> {
    let query = this.supabase.from('product_subscriptions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSProductSubscriptionError(error.message);
    return data ?? [];
  }

  async createProductReview(schoolId: string, data: ProductReview): Promise<ProductReview> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('product_reviews')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSProductReviewError(error.message);
    return result;
  }

  async getProductReview(schoolId: string, id: string): Promise<ProductReview | null> {
    const { data, error } = await this.supabase
      .from('product_reviews')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProductReview(schoolId: string, id: string, data: Partial<ProductReview>): Promise<ProductReview> {
    const { data: result, error } = await this.supabase
      .from('product_reviews')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSProductReviewError(error.message);
    return result;
  }

  async deleteProductReview(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('product_reviews')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSProductReviewError(error.message);
  }

  async listProductReview(schoolId: string, filters?: Record<string, unknown>): Promise<ProductReview[]> {
    let query = this.supabase.from('product_reviews').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSProductReviewError(error.message);
    return data ?? [];
  }

  async createProductRating(schoolId: string, data: ProductRating): Promise<ProductRating> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('product_ratings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSProductRatingError(error.message);
    return result;
  }

  async getProductRating(schoolId: string, id: string): Promise<ProductRating | null> {
    const { data, error } = await this.supabase
      .from('product_ratings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProductRating(schoolId: string, id: string, data: Partial<ProductRating>): Promise<ProductRating> {
    const { data: result, error } = await this.supabase
      .from('product_ratings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSProductRatingError(error.message);
    return result;
  }

  async deleteProductRating(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('product_ratings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSProductRatingError(error.message);
  }

  async listProductRating(schoolId: string, filters?: Record<string, unknown>): Promise<ProductRating[]> {
    let query = this.supabase.from('product_ratings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSProductRatingError(error.message);
    return data ?? [];
  }

  async createProductLicense(schoolId: string, data: ProductLicense): Promise<ProductLicense> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('product_licenses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSProductLicenseError(error.message);
    return result;
  }

  async getProductLicense(schoolId: string, id: string): Promise<ProductLicense | null> {
    const { data, error } = await this.supabase
      .from('product_licenses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProductLicense(schoolId: string, id: string, data: Partial<ProductLicense>): Promise<ProductLicense> {
    const { data: result, error } = await this.supabase
      .from('product_licenses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSProductLicenseError(error.message);
    return result;
  }

  async deleteProductLicense(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('product_licenses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSProductLicenseError(error.message);
  }

  async listProductLicense(schoolId: string, filters?: Record<string, unknown>): Promise<ProductLicense[]> {
    let query = this.supabase.from('product_licenses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSProductLicenseError(error.message);
    return data ?? [];
  }

  async createMarketplaceAnalytics(schoolId: string, data: MarketplaceAnalytics): Promise<MarketplaceAnalytics> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('marketplace_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMarketplaceAnalyticsError(error.message);
    return result;
  }

  async getMarketplaceAnalytics(schoolId: string, id: string): Promise<MarketplaceAnalytics | null> {
    const { data, error } = await this.supabase
      .from('marketplace_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMarketplaceAnalytics(schoolId: string, id: string, data: Partial<MarketplaceAnalytics>): Promise<MarketplaceAnalytics> {
    const { data: result, error } = await this.supabase
      .from('marketplace_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMarketplaceAnalyticsError(error.message);
    return result;
  }

  async deleteMarketplaceAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('marketplace_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMarketplaceAnalyticsError(error.message);
  }

  async listMarketplaceAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceAnalytics[]> {
    let query = this.supabase.from('marketplace_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMarketplaceAnalyticsError(error.message);
    return data ?? [];
  }

  async createProductCategoryEntity(schoolId: string, data: ProductCategoryEntity): Promise<ProductCategoryEntity> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('product_category_entities')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSProductCategoryEntityError(error.message);
    return result;
  }

  async getProductCategoryEntity(schoolId: string, id: string): Promise<ProductCategoryEntity | null> {
    const { data, error } = await this.supabase
      .from('product_category_entities')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateProductCategoryEntity(schoolId: string, id: string, data: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity> {
    const { data: result, error } = await this.supabase
      .from('product_category_entities')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSProductCategoryEntityError(error.message);
    return result;
  }

  async deleteProductCategoryEntity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('product_category_entities')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSProductCategoryEntityError(error.message);
  }

  async listProductCategoryEntity(schoolId: string, filters?: Record<string, unknown>): Promise<ProductCategoryEntity[]> {
    let query = this.supabase.from('product_category_entities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSProductCategoryEntityError(error.message);
    return data ?? [];
  }

  async createSellerProfile(schoolId: string, data: SellerProfile): Promise<SellerProfile> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('seller_profiles')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSellerProfileError(error.message);
    return result;
  }

  async getSellerProfile(schoolId: string, id: string): Promise<SellerProfile | null> {
    const { data, error } = await this.supabase
      .from('seller_profiles')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSellerProfile(schoolId: string, id: string, data: Partial<SellerProfile>): Promise<SellerProfile> {
    const { data: result, error } = await this.supabase
      .from('seller_profiles')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSellerProfileError(error.message);
    return result;
  }

  async deleteSellerProfile(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('seller_profiles')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSellerProfileError(error.message);
  }

  async listSellerProfile(schoolId: string, filters?: Record<string, unknown>): Promise<SellerProfile[]> {
    let query = this.supabase.from('seller_profiles').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSellerProfileError(error.message);
    return data ?? [];
  }

  // -- Governance Platform --------

  async createBoard(schoolId: string, data: Board): Promise<Board> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('boards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBoardError(error.message);
    return result;
  }

  async getBoard(schoolId: string, id: string): Promise<Board | null> {
    const { data, error } = await this.supabase
      .from('boards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBoard(schoolId: string, id: string, data: Partial<Board>): Promise<Board> {
    const { data: result, error } = await this.supabase
      .from('boards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBoardError(error.message);
    return result;
  }

  async deleteBoard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('boards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBoardError(error.message);
  }

  async listBoard(schoolId: string, filters?: Record<string, unknown>): Promise<Board[]> {
    let query = this.supabase.from('boards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBoardError(error.message);
    return data ?? [];
  }

  async createBoardMeeting(schoolId: string, data: BoardMeeting): Promise<BoardMeeting> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('board_meetings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBoardMeetingError(error.message);
    return result;
  }

  async getBoardMeeting(schoolId: string, id: string): Promise<BoardMeeting | null> {
    const { data, error } = await this.supabase
      .from('board_meetings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBoardMeeting(schoolId: string, id: string, data: Partial<BoardMeeting>): Promise<BoardMeeting> {
    const { data: result, error } = await this.supabase
      .from('board_meetings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBoardMeetingError(error.message);
    return result;
  }

  async deleteBoardMeeting(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('board_meetings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBoardMeetingError(error.message);
  }

  async listBoardMeeting(schoolId: string, filters?: Record<string, unknown>): Promise<BoardMeeting[]> {
    let query = this.supabase.from('board_meetings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBoardMeetingError(error.message);
    return data ?? [];
  }

  async createCommittee(schoolId: string, data: Committee): Promise<Committee> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('committees')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCommitteeError(error.message);
    return result;
  }

  async getCommittee(schoolId: string, id: string): Promise<Committee | null> {
    const { data, error } = await this.supabase
      .from('committees')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCommittee(schoolId: string, id: string, data: Partial<Committee>): Promise<Committee> {
    const { data: result, error } = await this.supabase
      .from('committees')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCommitteeError(error.message);
    return result;
  }

  async deleteCommittee(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('committees')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCommitteeError(error.message);
  }

  async listCommittee(schoolId: string, filters?: Record<string, unknown>): Promise<Committee[]> {
    let query = this.supabase.from('committees').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCommitteeError(error.message);
    return data ?? [];
  }

  async createVoting(schoolId: string, data: Voting): Promise<Voting> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('votings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVotingError(error.message);
    return result;
  }

  async getVoting(schoolId: string, id: string): Promise<Voting | null> {
    const { data, error } = await this.supabase
      .from('votings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVoting(schoolId: string, id: string, data: Partial<Voting>): Promise<Voting> {
    const { data: result, error } = await this.supabase
      .from('votings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVotingError(error.message);
    return result;
  }

  async deleteVoting(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('votings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVotingError(error.message);
  }

  async listVoting(schoolId: string, filters?: Record<string, unknown>): Promise<Voting[]> {
    let query = this.supabase.from('votings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVotingError(error.message);
    return data ?? [];
  }

  async createResolution(schoolId: string, data: Resolution): Promise<Resolution> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resolutions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSResolutionError(error.message);
    return result;
  }

  async getResolution(schoolId: string, id: string): Promise<Resolution | null> {
    const { data, error } = await this.supabase
      .from('resolutions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResolution(schoolId: string, id: string, data: Partial<Resolution>): Promise<Resolution> {
    const { data: result, error } = await this.supabase
      .from('resolutions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSResolutionError(error.message);
    return result;
  }

  async deleteResolution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resolutions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSResolutionError(error.message);
  }

  async listResolution(schoolId: string, filters?: Record<string, unknown>): Promise<Resolution[]> {
    let query = this.supabase.from('resolutions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSResolutionError(error.message);
    return data ?? [];
  }

  async createSchoolPolicy(schoolId: string, data: SchoolPolicy): Promise<SchoolPolicy> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_policies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSchoolPolicyError(error.message);
    return result;
  }

  async getSchoolPolicy(schoolId: string, id: string): Promise<SchoolPolicy | null> {
    const { data, error } = await this.supabase
      .from('school_policies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSchoolPolicy(schoolId: string, id: string, data: Partial<SchoolPolicy>): Promise<SchoolPolicy> {
    const { data: result, error } = await this.supabase
      .from('school_policies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSchoolPolicyError(error.message);
    return result;
  }

  async deleteSchoolPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_policies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSchoolPolicyError(error.message);
  }

  async listSchoolPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolPolicy[]> {
    let query = this.supabase.from('school_policies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSchoolPolicyError(error.message);
    return data ?? [];
  }

  async createComplianceCheck(schoolId: string, data: ComplianceCheck): Promise<ComplianceCheck> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSComplianceCheckError(error.message);
    return result;
  }

  async getComplianceCheck(schoolId: string, id: string): Promise<ComplianceCheck | null> {
    const { data, error } = await this.supabase
      .from('compliance_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateComplianceCheck(schoolId: string, id: string, data: Partial<ComplianceCheck>): Promise<ComplianceCheck> {
    const { data: result, error } = await this.supabase
      .from('compliance_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSComplianceCheckError(error.message);
    return result;
  }

  async deleteComplianceCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSComplianceCheckError(error.message);
  }

  async listComplianceCheck(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceCheck[]> {
    let query = this.supabase.from('compliance_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSComplianceCheckError(error.message);
    return data ?? [];
  }

  async createLegalDocument(schoolId: string, data: LegalDocument): Promise<LegalDocument> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('legal_documents')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSLegalDocumentError(error.message);
    return result;
  }

  async getLegalDocument(schoolId: string, id: string): Promise<LegalDocument | null> {
    const { data, error } = await this.supabase
      .from('legal_documents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLegalDocument(schoolId: string, id: string, data: Partial<LegalDocument>): Promise<LegalDocument> {
    const { data: result, error } = await this.supabase
      .from('legal_documents')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSLegalDocumentError(error.message);
    return result;
  }

  async deleteLegalDocument(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('legal_documents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSLegalDocumentError(error.message);
  }

  async listLegalDocument(schoolId: string, filters?: Record<string, unknown>): Promise<LegalDocument[]> {
    let query = this.supabase.from('legal_documents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSLegalDocumentError(error.message);
    return data ?? [];
  }

  async createDecisionTracking(schoolId: string, data: DecisionTracking): Promise<DecisionTracking> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('decision_trackings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDecisionTrackingError(error.message);
    return result;
  }

  async getDecisionTracking(schoolId: string, id: string): Promise<DecisionTracking | null> {
    const { data, error } = await this.supabase
      .from('decision_trackings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDecisionTracking(schoolId: string, id: string, data: Partial<DecisionTracking>): Promise<DecisionTracking> {
    const { data: result, error } = await this.supabase
      .from('decision_trackings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDecisionTrackingError(error.message);
    return result;
  }

  async deleteDecisionTracking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('decision_trackings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDecisionTrackingError(error.message);
  }

  async listDecisionTracking(schoolId: string, filters?: Record<string, unknown>): Promise<DecisionTracking[]> {
    let query = this.supabase.from('decision_trackings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDecisionTrackingError(error.message);
    return data ?? [];
  }

  async createRiskRegister(schoolId: string, data: RiskRegister): Promise<RiskRegister> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('risk_registers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRiskRegisterError(error.message);
    return result;
  }

  async getRiskRegister(schoolId: string, id: string): Promise<RiskRegister | null> {
    const { data, error } = await this.supabase
      .from('risk_registers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRiskRegister(schoolId: string, id: string, data: Partial<RiskRegister>): Promise<RiskRegister> {
    const { data: result, error } = await this.supabase
      .from('risk_registers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRiskRegisterError(error.message);
    return result;
  }

  async deleteRiskRegister(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('risk_registers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRiskRegisterError(error.message);
  }

  async listRiskRegister(schoolId: string, filters?: Record<string, unknown>): Promise<RiskRegister[]> {
    let query = this.supabase.from('risk_registers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRiskRegisterError(error.message);
    return data ?? [];
  }

  async createInternalControl(schoolId: string, data: InternalControl): Promise<InternalControl> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('internal_controls')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSInternalControlError(error.message);
    return result;
  }

  async getInternalControl(schoolId: string, id: string): Promise<InternalControl | null> {
    const { data, error } = await this.supabase
      .from('internal_controls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInternalControl(schoolId: string, id: string, data: Partial<InternalControl>): Promise<InternalControl> {
    const { data: result, error } = await this.supabase
      .from('internal_controls')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSInternalControlError(error.message);
    return result;
  }

  async deleteInternalControl(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('internal_controls')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSInternalControlError(error.message);
  }

  async listInternalControl(schoolId: string, filters?: Record<string, unknown>): Promise<InternalControl[]> {
    let query = this.supabase.from('internal_controls').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSInternalControlError(error.message);
    return data ?? [];
  }

  async createGovernanceAnalytics(schoolId: string, data: GovernanceAnalytics): Promise<GovernanceAnalytics> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governance_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSGovernanceAnalyticsError(error.message);
    return result;
  }

  async getGovernanceAnalytics(schoolId: string, id: string): Promise<GovernanceAnalytics | null> {
    const { data, error } = await this.supabase
      .from('governance_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateGovernanceAnalytics(schoolId: string, id: string, data: Partial<GovernanceAnalytics>): Promise<GovernanceAnalytics> {
    const { data: result, error } = await this.supabase
      .from('governance_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSGovernanceAnalyticsError(error.message);
    return result;
  }

  async deleteGovernanceAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governance_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSGovernanceAnalyticsError(error.message);
  }

  async listGovernanceAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<GovernanceAnalytics[]> {
    let query = this.supabase.from('governance_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSGovernanceAnalyticsError(error.message);
    return data ?? [];
  }

  // -- National Registry --------

  async createSchoolRegistry(schoolId: string, data: SchoolRegistry): Promise<SchoolRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSchoolRegistryError(error.message);
    return result;
  }

  async getSchoolRegistry(schoolId: string, id: string): Promise<SchoolRegistry | null> {
    const { data, error } = await this.supabase
      .from('school_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSchoolRegistry(schoolId: string, id: string, data: Partial<SchoolRegistry>): Promise<SchoolRegistry> {
    const { data: result, error } = await this.supabase
      .from('school_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSchoolRegistryError(error.message);
    return result;
  }

  async deleteSchoolRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSchoolRegistryError(error.message);
  }

  async listSchoolRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRegistry[]> {
    let query = this.supabase.from('school_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSchoolRegistryError(error.message);
    return data ?? [];
  }

  async createTeacherRegistry(schoolId: string, data: TeacherRegistry): Promise<TeacherRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSTeacherRegistryError(error.message);
    return result;
  }

  async getTeacherRegistry(schoolId: string, id: string): Promise<TeacherRegistry | null> {
    const { data, error } = await this.supabase
      .from('teacher_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTeacherRegistry(schoolId: string, id: string, data: Partial<TeacherRegistry>): Promise<TeacherRegistry> {
    const { data: result, error } = await this.supabase
      .from('teacher_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSTeacherRegistryError(error.message);
    return result;
  }

  async deleteTeacherRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSTeacherRegistryError(error.message);
  }

  async listTeacherRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherRegistry[]> {
    let query = this.supabase.from('teacher_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSTeacherRegistryError(error.message);
    return data ?? [];
  }

  async createStudentRegistry(schoolId: string, data: StudentRegistry): Promise<StudentRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSStudentRegistryError(error.message);
    return result;
  }

  async getStudentRegistry(schoolId: string, id: string): Promise<StudentRegistry | null> {
    const { data, error } = await this.supabase
      .from('student_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStudentRegistry(schoolId: string, id: string, data: Partial<StudentRegistry>): Promise<StudentRegistry> {
    const { data: result, error } = await this.supabase
      .from('student_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSStudentRegistryError(error.message);
    return result;
  }

  async deleteStudentRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSStudentRegistryError(error.message);
  }

  async listStudentRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRegistry[]> {
    let query = this.supabase.from('student_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSStudentRegistryError(error.message);
    return data ?? [];
  }

  async createGraduateRegistry(schoolId: string, data: GraduateRegistry): Promise<GraduateRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graduate_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSGraduateRegistryError(error.message);
    return result;
  }

  async getGraduateRegistry(schoolId: string, id: string): Promise<GraduateRegistry | null> {
    const { data, error } = await this.supabase
      .from('graduate_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateGraduateRegistry(schoolId: string, id: string, data: Partial<GraduateRegistry>): Promise<GraduateRegistry> {
    const { data: result, error } = await this.supabase
      .from('graduate_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSGraduateRegistryError(error.message);
    return result;
  }

  async deleteGraduateRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graduate_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSGraduateRegistryError(error.message);
  }

  async listGraduateRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<GraduateRegistry[]> {
    let query = this.supabase.from('graduate_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSGraduateRegistryError(error.message);
    return data ?? [];
  }

  async createDiplomaRegistry(schoolId: string, data: DiplomaRegistry): Promise<DiplomaRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('diploma_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDiplomaRegistryError(error.message);
    return result;
  }

  async getDiplomaRegistry(schoolId: string, id: string): Promise<DiplomaRegistry | null> {
    const { data, error } = await this.supabase
      .from('diploma_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDiplomaRegistry(schoolId: string, id: string, data: Partial<DiplomaRegistry>): Promise<DiplomaRegistry> {
    const { data: result, error } = await this.supabase
      .from('diploma_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDiplomaRegistryError(error.message);
    return result;
  }

  async deleteDiplomaRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('diploma_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDiplomaRegistryError(error.message);
  }

  async listDiplomaRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<DiplomaRegistry[]> {
    let query = this.supabase.from('diploma_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDiplomaRegistryError(error.message);
    return data ?? [];
  }

  async createCertificateRegistryEntry(schoolId: string, data: CertificateRegistryEntry): Promise<CertificateRegistryEntry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('certificate_registry_entries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCertificateRegistryEntryError(error.message);
    return result;
  }

  async getCertificateRegistryEntry(schoolId: string, id: string): Promise<CertificateRegistryEntry | null> {
    const { data, error } = await this.supabase
      .from('certificate_registry_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateRegistryEntry(schoolId: string, id: string, data: Partial<CertificateRegistryEntry>): Promise<CertificateRegistryEntry> {
    const { data: result, error } = await this.supabase
      .from('certificate_registry_entries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCertificateRegistryEntryError(error.message);
    return result;
  }

  async deleteCertificateRegistryEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_registry_entries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCertificateRegistryEntryError(error.message);
  }

  async listCertificateRegistryEntry(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRegistryEntry[]> {
    let query = this.supabase.from('certificate_registry_entries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCertificateRegistryEntryError(error.message);
    return data ?? [];
  }

  async createEmployerRegistry(schoolId: string, data: EmployerRegistry): Promise<EmployerRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employer_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSEmployerRegistryError(error.message);
    return result;
  }

  async getEmployerRegistry(schoolId: string, id: string): Promise<EmployerRegistry | null> {
    const { data, error } = await this.supabase
      .from('employer_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEmployerRegistry(schoolId: string, id: string, data: Partial<EmployerRegistry>): Promise<EmployerRegistry> {
    const { data: result, error } = await this.supabase
      .from('employer_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSEmployerRegistryError(error.message);
    return result;
  }

  async deleteEmployerRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employer_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSEmployerRegistryError(error.message);
  }

  async listEmployerRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<EmployerRegistry[]> {
    let query = this.supabase.from('employer_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSEmployerRegistryError(error.message);
    return data ?? [];
  }

  async createResearchRegistry(schoolId: string, data: ResearchRegistry): Promise<ResearchRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('research_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSResearchRegistryError(error.message);
    return result;
  }

  async getResearchRegistry(schoolId: string, id: string): Promise<ResearchRegistry | null> {
    const { data, error } = await this.supabase
      .from('research_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResearchRegistry(schoolId: string, id: string, data: Partial<ResearchRegistry>): Promise<ResearchRegistry> {
    const { data: result, error } = await this.supabase
      .from('research_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSResearchRegistryError(error.message);
    return result;
  }

  async deleteResearchRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSResearchRegistryError(error.message);
  }

  async listResearchRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchRegistry[]> {
    let query = this.supabase.from('research_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSResearchRegistryError(error.message);
    return data ?? [];
  }

  async createInstitutionRegistry(schoolId: string, data: InstitutionRegistry): Promise<InstitutionRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('institution_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSInstitutionRegistryError(error.message);
    return result;
  }

  async getInstitutionRegistry(schoolId: string, id: string): Promise<InstitutionRegistry | null> {
    const { data, error } = await this.supabase
      .from('institution_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInstitutionRegistry(schoolId: string, id: string, data: Partial<InstitutionRegistry>): Promise<InstitutionRegistry> {
    const { data: result, error } = await this.supabase
      .from('institution_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSInstitutionRegistryError(error.message);
    return result;
  }

  async deleteInstitutionRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('institution_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSInstitutionRegistryError(error.message);
  }

  async listInstitutionRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<InstitutionRegistry[]> {
    let query = this.supabase.from('institution_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSInstitutionRegistryError(error.message);
    return data ?? [];
  }

  async createNationalAnalyticsRecord(schoolId: string, data: NationalAnalyticsRecord): Promise<NationalAnalyticsRecord> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_analytics_records')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSNationalAnalyticsRecordError(error.message);
    return result;
  }

  async getNationalAnalyticsRecord(schoolId: string, id: string): Promise<NationalAnalyticsRecord | null> {
    const { data, error } = await this.supabase
      .from('national_analytics_records')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNationalAnalyticsRecord(schoolId: string, id: string, data: Partial<NationalAnalyticsRecord>): Promise<NationalAnalyticsRecord> {
    const { data: result, error } = await this.supabase
      .from('national_analytics_records')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSNationalAnalyticsRecordError(error.message);
    return result;
  }

  async deleteNationalAnalyticsRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_analytics_records')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSNationalAnalyticsRecordError(error.message);
  }

  async listNationalAnalyticsRecord(schoolId: string, filters?: Record<string, unknown>): Promise<NationalAnalyticsRecord[]> {
    let query = this.supabase.from('national_analytics_records').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSNationalAnalyticsRecordError(error.message);
    return data ?? [];
  }

  async createRegistrySearchQuery(schoolId: string, data: RegistrySearchQuery): Promise<RegistrySearchQuery> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('registry_search_queries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRegistrySearchQueryError(error.message);
    return result;
  }

  async getRegistrySearchQuery(schoolId: string, id: string): Promise<RegistrySearchQuery | null> {
    const { data, error } = await this.supabase
      .from('registry_search_queries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRegistrySearchQuery(schoolId: string, id: string, data: Partial<RegistrySearchQuery>): Promise<RegistrySearchQuery> {
    const { data: result, error } = await this.supabase
      .from('registry_search_queries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRegistrySearchQueryError(error.message);
    return result;
  }

  async deleteRegistrySearchQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('registry_search_queries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRegistrySearchQueryError(error.message);
  }

  async listRegistrySearchQuery(schoolId: string, filters?: Record<string, unknown>): Promise<RegistrySearchQuery[]> {
    let query = this.supabase.from('registry_search_queries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRegistrySearchQueryError(error.message);
    return data ?? [];
  }

  async createRegistryBulkImport(schoolId: string, data: RegistryBulkImport): Promise<RegistryBulkImport> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('registry_bulk_imports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRegistryBulkImportError(error.message);
    return result;
  }

  async getRegistryBulkImport(schoolId: string, id: string): Promise<RegistryBulkImport | null> {
    const { data, error } = await this.supabase
      .from('registry_bulk_imports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRegistryBulkImport(schoolId: string, id: string, data: Partial<RegistryBulkImport>): Promise<RegistryBulkImport> {
    const { data: result, error } = await this.supabase
      .from('registry_bulk_imports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRegistryBulkImportError(error.message);
    return result;
  }

  async deleteRegistryBulkImport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('registry_bulk_imports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRegistryBulkImportError(error.message);
  }

  async listRegistryBulkImport(schoolId: string, filters?: Record<string, unknown>): Promise<RegistryBulkImport[]> {
    let query = this.supabase.from('registry_bulk_imports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRegistryBulkImportError(error.message);
    return data ?? [];
  }

  async createRegistryExport(schoolId: string, data: RegistryExport): Promise<RegistryExport> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('registry_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRegistryExportError(error.message);
    return result;
  }

  async getRegistryExport(schoolId: string, id: string): Promise<RegistryExport | null> {
    const { data, error } = await this.supabase
      .from('registry_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRegistryExport(schoolId: string, id: string, data: Partial<RegistryExport>): Promise<RegistryExport> {
    const { data: result, error } = await this.supabase
      .from('registry_exports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRegistryExportError(error.message);
    return result;
  }

  async deleteRegistryExport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('registry_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRegistryExportError(error.message);
  }

  async listRegistryExport(schoolId: string, filters?: Record<string, unknown>): Promise<RegistryExport[]> {
    let query = this.supabase.from('registry_exports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRegistryExportError(error.message);
    return data ?? [];
  }

  // -- Blockchain Education --------

  async createCredentialBlockchain(schoolId: string, data: CredentialBlockchain): Promise<CredentialBlockchain> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('credential_blockchains')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCredentialBlockchainError(error.message);
    return result;
  }

  async getCredentialBlockchain(schoolId: string, id: string): Promise<CredentialBlockchain | null> {
    const { data, error } = await this.supabase
      .from('credential_blockchains')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCredentialBlockchain(schoolId: string, id: string, data: Partial<CredentialBlockchain>): Promise<CredentialBlockchain> {
    const { data: result, error } = await this.supabase
      .from('credential_blockchains')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCredentialBlockchainError(error.message);
    return result;
  }

  async deleteCredentialBlockchain(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('credential_blockchains')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCredentialBlockchainError(error.message);
  }

  async listCredentialBlockchain(schoolId: string, filters?: Record<string, unknown>): Promise<CredentialBlockchain[]> {
    let query = this.supabase.from('credential_blockchains').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCredentialBlockchainError(error.message);
    return data ?? [];
  }

  async createTranscriptBlockchain(schoolId: string, data: TranscriptBlockchain): Promise<TranscriptBlockchain> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transcript_blockchains')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSTranscriptBlockchainError(error.message);
    return result;
  }

  async getTranscriptBlockchain(schoolId: string, id: string): Promise<TranscriptBlockchain | null> {
    const { data, error } = await this.supabase
      .from('transcript_blockchains')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTranscriptBlockchain(schoolId: string, id: string, data: Partial<TranscriptBlockchain>): Promise<TranscriptBlockchain> {
    const { data: result, error } = await this.supabase
      .from('transcript_blockchains')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSTranscriptBlockchainError(error.message);
    return result;
  }

  async deleteTranscriptBlockchain(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transcript_blockchains')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSTranscriptBlockchainError(error.message);
  }

  async listTranscriptBlockchain(schoolId: string, filters?: Record<string, unknown>): Promise<TranscriptBlockchain[]> {
    let query = this.supabase.from('transcript_blockchains').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSTranscriptBlockchainError(error.message);
    return data ?? [];
  }

  async createDiplomaLedger(schoolId: string, data: DiplomaLedger): Promise<DiplomaLedger> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('diploma_ledgers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDiplomaLedgerError(error.message);
    return result;
  }

  async getDiplomaLedger(schoolId: string, id: string): Promise<DiplomaLedger | null> {
    const { data, error } = await this.supabase
      .from('diploma_ledgers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDiplomaLedger(schoolId: string, id: string, data: Partial<DiplomaLedger>): Promise<DiplomaLedger> {
    const { data: result, error } = await this.supabase
      .from('diploma_ledgers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDiplomaLedgerError(error.message);
    return result;
  }

  async deleteDiplomaLedger(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('diploma_ledgers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDiplomaLedgerError(error.message);
  }

  async listDiplomaLedger(schoolId: string, filters?: Record<string, unknown>): Promise<DiplomaLedger[]> {
    let query = this.supabase.from('diploma_ledgers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDiplomaLedgerError(error.message);
    return data ?? [];
  }

  async createAcademicLedger(schoolId: string, data: AcademicLedger): Promise<AcademicLedger> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('academic_ledgers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAcademicLedgerError(error.message);
    return result;
  }

  async getAcademicLedger(schoolId: string, id: string): Promise<AcademicLedger | null> {
    const { data, error } = await this.supabase
      .from('academic_ledgers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAcademicLedger(schoolId: string, id: string, data: Partial<AcademicLedger>): Promise<AcademicLedger> {
    const { data: result, error } = await this.supabase
      .from('academic_ledgers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAcademicLedgerError(error.message);
    return result;
  }

  async deleteAcademicLedger(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_ledgers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAcademicLedgerError(error.message);
  }

  async listAcademicLedger(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicLedger[]> {
    let query = this.supabase.from('academic_ledgers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAcademicLedgerError(error.message);
    return data ?? [];
  }

  async createCertificateLedger(schoolId: string, data: CertificateLedger): Promise<CertificateLedger> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('certificate_ledgers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCertificateLedgerError(error.message);
    return result;
  }

  async getCertificateLedger(schoolId: string, id: string): Promise<CertificateLedger | null> {
    const { data, error } = await this.supabase
      .from('certificate_ledgers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCertificateLedger(schoolId: string, id: string, data: Partial<CertificateLedger>): Promise<CertificateLedger> {
    const { data: result, error } = await this.supabase
      .from('certificate_ledgers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCertificateLedgerError(error.message);
    return result;
  }

  async deleteCertificateLedger(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_ledgers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCertificateLedgerError(error.message);
  }

  async listCertificateLedger(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateLedger[]> {
    let query = this.supabase.from('certificate_ledgers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCertificateLedgerError(error.message);
    return data ?? [];
  }

  async createVerificationPortal(schoolId: string, data: VerificationPortal): Promise<VerificationPortal> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('verification_portals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVerificationPortalError(error.message);
    return result;
  }

  async getVerificationPortal(schoolId: string, id: string): Promise<VerificationPortal | null> {
    const { data, error } = await this.supabase
      .from('verification_portals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVerificationPortal(schoolId: string, id: string, data: Partial<VerificationPortal>): Promise<VerificationPortal> {
    const { data: result, error } = await this.supabase
      .from('verification_portals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVerificationPortalError(error.message);
    return result;
  }

  async deleteVerificationPortal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('verification_portals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVerificationPortalError(error.message);
  }

  async listVerificationPortal(schoolId: string, filters?: Record<string, unknown>): Promise<VerificationPortal[]> {
    let query = this.supabase.from('verification_portals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVerificationPortalError(error.message);
    return data ?? [];
  }

  async createSmartContract(schoolId: string, data: SmartContract): Promise<SmartContract> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('smart_contracts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSSmartContractError(error.message);
    return result;
  }

  async getSmartContract(schoolId: string, id: string): Promise<SmartContract | null> {
    const { data, error } = await this.supabase
      .from('smart_contracts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSmartContract(schoolId: string, id: string, data: Partial<SmartContract>): Promise<SmartContract> {
    const { data: result, error } = await this.supabase
      .from('smart_contracts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSSmartContractError(error.message);
    return result;
  }

  async deleteSmartContract(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('smart_contracts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSSmartContractError(error.message);
  }

  async listSmartContract(schoolId: string, filters?: Record<string, unknown>): Promise<SmartContract[]> {
    let query = this.supabase.from('smart_contracts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSSmartContractError(error.message);
    return data ?? [];
  }

  async createImmutableAudit(schoolId: string, data: ImmutableAudit): Promise<ImmutableAudit> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('immutable_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSImmutableAuditError(error.message);
    return result;
  }

  async getImmutableAudit(schoolId: string, id: string): Promise<ImmutableAudit | null> {
    const { data, error } = await this.supabase
      .from('immutable_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateImmutableAudit(schoolId: string, id: string, data: Partial<ImmutableAudit>): Promise<ImmutableAudit> {
    const { data: result, error } = await this.supabase
      .from('immutable_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSImmutableAuditError(error.message);
    return result;
  }

  async deleteImmutableAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('immutable_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSImmutableAuditError(error.message);
  }

  async listImmutableAudit(schoolId: string, filters?: Record<string, unknown>): Promise<ImmutableAudit[]> {
    let query = this.supabase.from('immutable_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSImmutableAuditError(error.message);
    return data ?? [];
  }

  async createBlockchainExplorer(schoolId: string, data: BlockchainExplorer): Promise<BlockchainExplorer> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('blockchain_explorers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBlockchainExplorerError(error.message);
    return result;
  }

  async getBlockchainExplorer(schoolId: string, id: string): Promise<BlockchainExplorer | null> {
    const { data, error } = await this.supabase
      .from('blockchain_explorers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBlockchainExplorer(schoolId: string, id: string, data: Partial<BlockchainExplorer>): Promise<BlockchainExplorer> {
    const { data: result, error } = await this.supabase
      .from('blockchain_explorers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBlockchainExplorerError(error.message);
    return result;
  }

  async deleteBlockchainExplorer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('blockchain_explorers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBlockchainExplorerError(error.message);
  }

  async listBlockchainExplorer(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainExplorer[]> {
    let query = this.supabase.from('blockchain_explorers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBlockchainExplorerError(error.message);
    return data ?? [];
  }

  async createBlockchainTransaction(schoolId: string, data: BlockchainTransaction): Promise<BlockchainTransaction> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('blockchain_transactions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBlockchainTransactionError(error.message);
    return result;
  }

  async getBlockchainTransaction(schoolId: string, id: string): Promise<BlockchainTransaction | null> {
    const { data, error } = await this.supabase
      .from('blockchain_transactions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBlockchainTransaction(schoolId: string, id: string, data: Partial<BlockchainTransaction>): Promise<BlockchainTransaction> {
    const { data: result, error } = await this.supabase
      .from('blockchain_transactions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBlockchainTransactionError(error.message);
    return result;
  }

  async deleteBlockchainTransaction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('blockchain_transactions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBlockchainTransactionError(error.message);
  }

  async listBlockchainTransaction(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainTransaction[]> {
    let query = this.supabase.from('blockchain_transactions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBlockchainTransactionError(error.message);
    return data ?? [];
  }

  async createBlockchainAuditTrail(schoolId: string, data: BlockchainAuditTrail): Promise<BlockchainAuditTrail> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('blockchain_audit_trails')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return result;
  }

  async getBlockchainAuditTrail(schoolId: string, id: string): Promise<BlockchainAuditTrail | null> {
    const { data, error } = await this.supabase
      .from('blockchain_audit_trails')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBlockchainAuditTrail(schoolId: string, id: string, data: Partial<BlockchainAuditTrail>): Promise<BlockchainAuditTrail> {
    const { data: result, error } = await this.supabase
      .from('blockchain_audit_trails')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return result;
  }

  async deleteBlockchainAuditTrail(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('blockchain_audit_trails')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
  }

  async listBlockchainAuditTrail(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainAuditTrail[]> {
    let query = this.supabase.from('blockchain_audit_trails').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return data ?? [];
  }

  // -- Ecosystem Integration Hub --------

  async createIntegrationConnector(schoolId: string, data: IntegrationConnector): Promise<IntegrationConnector> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('integration_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIntegrationConnectorError(error.message);
    return result;
  }

  async getIntegrationConnector(schoolId: string, id: string): Promise<IntegrationConnector | null> {
    const { data, error } = await this.supabase
      .from('integration_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrationConnector(schoolId: string, id: string, data: Partial<IntegrationConnector>): Promise<IntegrationConnector> {
    const { data: result, error } = await this.supabase
      .from('integration_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIntegrationConnectorError(error.message);
    return result;
  }

  async deleteIntegrationConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integration_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIntegrationConnectorError(error.message);
  }

  async listIntegrationConnector(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationConnector[]> {
    let query = this.supabase.from('integration_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIntegrationConnectorError(error.message);
    return data ?? [];
  }

  async createGoogleWorkspaceIntegration(schoolId: string, data: GoogleWorkspaceIntegration): Promise<GoogleWorkspaceIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('google_workspace_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSGoogleWorkspaceIntegrationError(error.message);
    return result;
  }

  async getGoogleWorkspaceIntegration(schoolId: string, id: string): Promise<GoogleWorkspaceIntegration | null> {
    const { data, error } = await this.supabase
      .from('google_workspace_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateGoogleWorkspaceIntegration(schoolId: string, id: string, data: Partial<GoogleWorkspaceIntegration>): Promise<GoogleWorkspaceIntegration> {
    const { data: result, error } = await this.supabase
      .from('google_workspace_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSGoogleWorkspaceIntegrationError(error.message);
    return result;
  }

  async deleteGoogleWorkspaceIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('google_workspace_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSGoogleWorkspaceIntegrationError(error.message);
  }

  async listGoogleWorkspaceIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<GoogleWorkspaceIntegration[]> {
    let query = this.supabase.from('google_workspace_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSGoogleWorkspaceIntegrationError(error.message);
    return data ?? [];
  }

  async createMicrosoft365Integration(schoolId: string, data: Microsoft365Integration): Promise<Microsoft365Integration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('microsoft_365_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMicrosoft365IntegrationError(error.message);
    return result;
  }

  async getMicrosoft365Integration(schoolId: string, id: string): Promise<Microsoft365Integration | null> {
    const { data, error } = await this.supabase
      .from('microsoft_365_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMicrosoft365Integration(schoolId: string, id: string, data: Partial<Microsoft365Integration>): Promise<Microsoft365Integration> {
    const { data: result, error } = await this.supabase
      .from('microsoft_365_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMicrosoft365IntegrationError(error.message);
    return result;
  }

  async deleteMicrosoft365Integration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('microsoft_365_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMicrosoft365IntegrationError(error.message);
  }

  async listMicrosoft365Integration(schoolId: string, filters?: Record<string, unknown>): Promise<Microsoft365Integration[]> {
    let query = this.supabase.from('microsoft_365_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMicrosoft365IntegrationError(error.message);
    return data ?? [];
  }

  async createGoogleClassroomIntegration(schoolId: string, data: GoogleClassroomIntegration): Promise<GoogleClassroomIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('google_classroom_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSGoogleClassroomIntegrationError(error.message);
    return result;
  }

  async getGoogleClassroomIntegration(schoolId: string, id: string): Promise<GoogleClassroomIntegration | null> {
    const { data, error } = await this.supabase
      .from('google_classroom_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateGoogleClassroomIntegration(schoolId: string, id: string, data: Partial<GoogleClassroomIntegration>): Promise<GoogleClassroomIntegration> {
    const { data: result, error } = await this.supabase
      .from('google_classroom_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSGoogleClassroomIntegrationError(error.message);
    return result;
  }

  async deleteGoogleClassroomIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('google_classroom_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSGoogleClassroomIntegrationError(error.message);
  }

  async listGoogleClassroomIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<GoogleClassroomIntegration[]> {
    let query = this.supabase.from('google_classroom_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSGoogleClassroomIntegrationError(error.message);
    return data ?? [];
  }

  async createMicrosoftTeamsIntegration(schoolId: string, data: MicrosoftTeamsIntegration): Promise<MicrosoftTeamsIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('microsoft_teams_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMicrosoftTeamsIntegrationError(error.message);
    return result;
  }

  async getMicrosoftTeamsIntegration(schoolId: string, id: string): Promise<MicrosoftTeamsIntegration | null> {
    const { data, error } = await this.supabase
      .from('microsoft_teams_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMicrosoftTeamsIntegration(schoolId: string, id: string, data: Partial<MicrosoftTeamsIntegration>): Promise<MicrosoftTeamsIntegration> {
    const { data: result, error } = await this.supabase
      .from('microsoft_teams_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMicrosoftTeamsIntegrationError(error.message);
    return result;
  }

  async deleteMicrosoftTeamsIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('microsoft_teams_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMicrosoftTeamsIntegrationError(error.message);
  }

  async listMicrosoftTeamsIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<MicrosoftTeamsIntegration[]> {
    let query = this.supabase.from('microsoft_teams_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMicrosoftTeamsIntegrationError(error.message);
    return data ?? [];
  }

  async createVideoConferenceIntegration(schoolId: string, data: VideoConferenceIntegration): Promise<VideoConferenceIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('video_conference_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVideoConferenceIntegrationError(error.message);
    return result;
  }

  async getVideoConferenceIntegration(schoolId: string, id: string): Promise<VideoConferenceIntegration | null> {
    const { data, error } = await this.supabase
      .from('video_conference_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVideoConferenceIntegration(schoolId: string, id: string, data: Partial<VideoConferenceIntegration>): Promise<VideoConferenceIntegration> {
    const { data: result, error } = await this.supabase
      .from('video_conference_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVideoConferenceIntegrationError(error.message);
    return result;
  }

  async deleteVideoConferenceIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('video_conference_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVideoConferenceIntegrationError(error.message);
  }

  async listVideoConferenceIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<VideoConferenceIntegration[]> {
    let query = this.supabase.from('video_conference_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVideoConferenceIntegrationError(error.message);
    return data ?? [];
  }

  async createMessagingIntegration(schoolId: string, data: MessagingIntegration): Promise<MessagingIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('messaging_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMessagingIntegrationError(error.message);
    return result;
  }

  async getMessagingIntegration(schoolId: string, id: string): Promise<MessagingIntegration | null> {
    const { data, error } = await this.supabase
      .from('messaging_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMessagingIntegration(schoolId: string, id: string, data: Partial<MessagingIntegration>): Promise<MessagingIntegration> {
    const { data: result, error } = await this.supabase
      .from('messaging_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMessagingIntegrationError(error.message);
    return result;
  }

  async deleteMessagingIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('messaging_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMessagingIntegrationError(error.message);
  }

  async listMessagingIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<MessagingIntegration[]> {
    let query = this.supabase.from('messaging_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMessagingIntegrationError(error.message);
    return data ?? [];
  }

  async createLMSIntegration(schoolId: string, data: LMSIntegration): Promise<LMSIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('lms_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSLMSIntegrationError(error.message);
    return result;
  }

  async getLMSIntegration(schoolId: string, id: string): Promise<LMSIntegration | null> {
    const { data, error } = await this.supabase
      .from('lms_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLMSIntegration(schoolId: string, id: string, data: Partial<LMSIntegration>): Promise<LMSIntegration> {
    const { data: result, error } = await this.supabase
      .from('lms_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSLMSIntegrationError(error.message);
    return result;
  }

  async deleteLMSIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lms_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSLMSIntegrationError(error.message);
  }

  async listLMSIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<LMSIntegration[]> {
    let query = this.supabase.from('lms_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSLMSIntegrationError(error.message);
    return data ?? [];
  }

  async createPaymentIntegration(schoolId: string, data: PaymentIntegration): Promise<PaymentIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('payment_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSPaymentIntegrationError(error.message);
    return result;
  }

  async getPaymentIntegration(schoolId: string, id: string): Promise<PaymentIntegration | null> {
    const { data, error } = await this.supabase
      .from('payment_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePaymentIntegration(schoolId: string, id: string, data: Partial<PaymentIntegration>): Promise<PaymentIntegration> {
    const { data: result, error } = await this.supabase
      .from('payment_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSPaymentIntegrationError(error.message);
    return result;
  }

  async deletePaymentIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('payment_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSPaymentIntegrationError(error.message);
  }

  async listPaymentIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<PaymentIntegration[]> {
    let query = this.supabase.from('payment_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSPaymentIntegrationError(error.message);
    return data ?? [];
  }

  async createMobileMoneyIntegration(schoolId: string, data: MobileMoneyIntegration): Promise<MobileMoneyIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('mobile_money_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMobileMoneyIntegrationError(error.message);
    return result;
  }

  async getMobileMoneyIntegration(schoolId: string, id: string): Promise<MobileMoneyIntegration | null> {
    const { data, error } = await this.supabase
      .from('mobile_money_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMobileMoneyIntegration(schoolId: string, id: string, data: Partial<MobileMoneyIntegration>): Promise<MobileMoneyIntegration> {
    const { data: result, error } = await this.supabase
      .from('mobile_money_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMobileMoneyIntegrationError(error.message);
    return result;
  }

  async deleteMobileMoneyIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mobile_money_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMobileMoneyIntegrationError(error.message);
  }

  async listMobileMoneyIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<MobileMoneyIntegration[]> {
    let query = this.supabase.from('mobile_money_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMobileMoneyIntegrationError(error.message);
    return data ?? [];
  }

  async createCloudIntegration(schoolId: string, data: CloudIntegration): Promise<CloudIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCloudIntegrationError(error.message);
    return result;
  }

  async getCloudIntegration(schoolId: string, id: string): Promise<CloudIntegration | null> {
    const { data, error } = await this.supabase
      .from('cloud_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCloudIntegration(schoolId: string, id: string, data: Partial<CloudIntegration>): Promise<CloudIntegration> {
    const { data: result, error } = await this.supabase
      .from('cloud_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCloudIntegrationError(error.message);
    return result;
  }

  async deleteCloudIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCloudIntegrationError(error.message);
  }

  async listCloudIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<CloudIntegration[]> {
    let query = this.supabase.from('cloud_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCloudIntegrationError(error.message);
    return data ?? [];
  }

  async createCRMIntegration(schoolId: string, data: CRMIntegration): Promise<CRMIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('crm_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCRMIntegrationError(error.message);
    return result;
  }

  async getCRMIntegration(schoolId: string, id: string): Promise<CRMIntegration | null> {
    const { data, error } = await this.supabase
      .from('crm_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCRMIntegration(schoolId: string, id: string, data: Partial<CRMIntegration>): Promise<CRMIntegration> {
    const { data: result, error } = await this.supabase
      .from('crm_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCRMIntegrationError(error.message);
    return result;
  }

  async deleteCRMIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('crm_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCRMIntegrationError(error.message);
  }

  async listCRMIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<CRMIntegration[]> {
    let query = this.supabase.from('crm_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCRMIntegrationError(error.message);
    return data ?? [];
  }

  async createAIServiceIntegration(schoolId: string, data: AIServiceIntegration): Promise<AIServiceIntegration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ai_service_integrations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAIServiceIntegrationError(error.message);
    return result;
  }

  async getAIServiceIntegration(schoolId: string, id: string): Promise<AIServiceIntegration | null> {
    const { data, error } = await this.supabase
      .from('ai_service_integrations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIServiceIntegration(schoolId: string, id: string, data: Partial<AIServiceIntegration>): Promise<AIServiceIntegration> {
    const { data: result, error } = await this.supabase
      .from('ai_service_integrations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAIServiceIntegrationError(error.message);
    return result;
  }

  async deleteAIServiceIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_service_integrations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAIServiceIntegrationError(error.message);
  }

  async listAIServiceIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<AIServiceIntegration[]> {
    let query = this.supabase.from('ai_service_integrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAIServiceIntegrationError(error.message);
    return data ?? [];
  }

  async createIntegrationSyncLog(schoolId: string, data: IntegrationSyncLog): Promise<IntegrationSyncLog> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('integration_sync_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIntegrationSyncLogError(error.message);
    return result;
  }

  async getIntegrationSyncLog(schoolId: string, id: string): Promise<IntegrationSyncLog | null> {
    const { data, error } = await this.supabase
      .from('integration_sync_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrationSyncLog(schoolId: string, id: string, data: Partial<IntegrationSyncLog>): Promise<IntegrationSyncLog> {
    const { data: result, error } = await this.supabase
      .from('integration_sync_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIntegrationSyncLogError(error.message);
    return result;
  }

  async deleteIntegrationSyncLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integration_sync_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIntegrationSyncLogError(error.message);
  }

  async listIntegrationSyncLog(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationSyncLog[]> {
    let query = this.supabase.from('integration_sync_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIntegrationSyncLogError(error.message);
    return data ?? [];
  }

  async createIntegrationWebhook(schoolId: string, data: IntegrationWebhook): Promise<IntegrationWebhook> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('integration_webhooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIntegrationWebhookError(error.message);
    return result;
  }

  async getIntegrationWebhook(schoolId: string, id: string): Promise<IntegrationWebhook | null> {
    const { data, error } = await this.supabase
      .from('integration_webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrationWebhook(schoolId: string, id: string, data: Partial<IntegrationWebhook>): Promise<IntegrationWebhook> {
    const { data: result, error } = await this.supabase
      .from('integration_webhooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIntegrationWebhookError(error.message);
    return result;
  }

  async deleteIntegrationWebhook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integration_webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIntegrationWebhookError(error.message);
  }

  async listIntegrationWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationWebhook[]> {
    let query = this.supabase.from('integration_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIntegrationWebhookError(error.message);
    return data ?? [];
  }

  async createIntegrationAnalytics(schoolId: string, data: IntegrationAnalytics): Promise<IntegrationAnalytics> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('integration_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIntegrationAnalyticsError(error.message);
    return result;
  }

  async getIntegrationAnalytics(schoolId: string, id: string): Promise<IntegrationAnalytics | null> {
    const { data, error } = await this.supabase
      .from('integration_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrationAnalytics(schoolId: string, id: string, data: Partial<IntegrationAnalytics>): Promise<IntegrationAnalytics> {
    const { data: result, error } = await this.supabase
      .from('integration_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIntegrationAnalyticsError(error.message);
    return result;
  }

  async deleteIntegrationAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integration_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIntegrationAnalyticsError(error.message);
  }

  async listIntegrationAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationAnalytics[]> {
    let query = this.supabase.from('integration_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIntegrationAnalyticsError(error.message);
    return data ?? [];
  }

  async createIntegrationMapping(schoolId: string, data: IntegrationMapping): Promise<IntegrationMapping> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('integration_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSIntegrationMappingError(error.message);
    return result;
  }

  async getIntegrationMapping(schoolId: string, id: string): Promise<IntegrationMapping | null> {
    const { data, error } = await this.supabase
      .from('integration_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateIntegrationMapping(schoolId: string, id: string, data: Partial<IntegrationMapping>): Promise<IntegrationMapping> {
    const { data: result, error } = await this.supabase
      .from('integration_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSIntegrationMappingError(error.message);
    return result;
  }

  async deleteIntegrationMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('integration_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSIntegrationMappingError(error.message);
  }

  async listIntegrationMapping(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationMapping[]> {
    let query = this.supabase.from('integration_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSIntegrationMappingError(error.message);
    return data ?? [];
  }

  // -- AI Orchestrator --------

  async createAgentRegistry(schoolId: string, data: AgentRegistry): Promise<AgentRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('agent_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAgentRegistryError(error.message);
    return result;
  }

  async getAgentRegistry(schoolId: string, id: string): Promise<AgentRegistry | null> {
    const { data, error } = await this.supabase
      .from('agent_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAgentRegistry(schoolId: string, id: string, data: Partial<AgentRegistry>): Promise<AgentRegistry> {
    const { data: result, error } = await this.supabase
      .from('agent_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAgentRegistryError(error.message);
    return result;
  }

  async deleteAgentRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('agent_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAgentRegistryError(error.message);
  }

  async listAgentRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<AgentRegistry[]> {
    let query = this.supabase.from('agent_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAgentRegistryError(error.message);
    return data ?? [];
  }

  async createMultiAgentSystem(schoolId: string, data: MultiAgentSystem): Promise<MultiAgentSystem> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('multi_agent_systems')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMultiAgentSystemError(error.message);
    return result;
  }

  async getMultiAgentSystem(schoolId: string, id: string): Promise<MultiAgentSystem | null> {
    const { data, error } = await this.supabase
      .from('multi_agent_systems')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMultiAgentSystem(schoolId: string, id: string, data: Partial<MultiAgentSystem>): Promise<MultiAgentSystem> {
    const { data: result, error } = await this.supabase
      .from('multi_agent_systems')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMultiAgentSystemError(error.message);
    return result;
  }

  async deleteMultiAgentSystem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('multi_agent_systems')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMultiAgentSystemError(error.message);
  }

  async listMultiAgentSystem(schoolId: string, filters?: Record<string, unknown>): Promise<MultiAgentSystem[]> {
    let query = this.supabase.from('multi_agent_systems').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMultiAgentSystemError(error.message);
    return data ?? [];
  }

  async createPlanningEngine(schoolId: string, data: PlanningEngine): Promise<PlanningEngine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('planning_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSPlanningEngineError(error.message);
    return result;
  }

  async getPlanningEngine(schoolId: string, id: string): Promise<PlanningEngine | null> {
    const { data, error } = await this.supabase
      .from('planning_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePlanningEngine(schoolId: string, id: string, data: Partial<PlanningEngine>): Promise<PlanningEngine> {
    const { data: result, error } = await this.supabase
      .from('planning_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSPlanningEngineError(error.message);
    return result;
  }

  async deletePlanningEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('planning_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSPlanningEngineError(error.message);
  }

  async listPlanningEngine(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningEngine[]> {
    let query = this.supabase.from('planning_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSPlanningEngineError(error.message);
    return data ?? [];
  }

  async createReasoningEngine(schoolId: string, data: ReasoningEngine): Promise<ReasoningEngine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('reasoning_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSReasoningEngineError(error.message);
    return result;
  }

  async getReasoningEngine(schoolId: string, id: string): Promise<ReasoningEngine | null> {
    const { data, error } = await this.supabase
      .from('reasoning_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateReasoningEngine(schoolId: string, id: string, data: Partial<ReasoningEngine>): Promise<ReasoningEngine> {
    const { data: result, error } = await this.supabase
      .from('reasoning_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSReasoningEngineError(error.message);
    return result;
  }

  async deleteReasoningEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('reasoning_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSReasoningEngineError(error.message);
  }

  async listReasoningEngine(schoolId: string, filters?: Record<string, unknown>): Promise<ReasoningEngine[]> {
    let query = this.supabase.from('reasoning_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSReasoningEngineError(error.message);
    return data ?? [];
  }

  async createContextEngine(schoolId: string, data: ContextEngine): Promise<ContextEngine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('context_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSContextEngineError(error.message);
    return result;
  }

  async getContextEngine(schoolId: string, id: string): Promise<ContextEngine | null> {
    const { data, error } = await this.supabase
      .from('context_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateContextEngine(schoolId: string, id: string, data: Partial<ContextEngine>): Promise<ContextEngine> {
    const { data: result, error } = await this.supabase
      .from('context_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSContextEngineError(error.message);
    return result;
  }

  async deleteContextEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('context_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSContextEngineError(error.message);
  }

  async listContextEngine(schoolId: string, filters?: Record<string, unknown>): Promise<ContextEngine[]> {
    let query = this.supabase.from('context_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSContextEngineError(error.message);
    return data ?? [];
  }

  async createMemoryEngine(schoolId: string, data: MemoryEngine): Promise<MemoryEngine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('memory_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMemoryEngineError(error.message);
    return result;
  }

  async getMemoryEngine(schoolId: string, id: string): Promise<MemoryEngine | null> {
    const { data, error } = await this.supabase
      .from('memory_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMemoryEngine(schoolId: string, id: string, data: Partial<MemoryEngine>): Promise<MemoryEngine> {
    const { data: result, error } = await this.supabase
      .from('memory_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMemoryEngineError(error.message);
    return result;
  }

  async deleteMemoryEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('memory_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMemoryEngineError(error.message);
  }

  async listMemoryEngine(schoolId: string, filters?: Record<string, unknown>): Promise<MemoryEngine[]> {
    let query = this.supabase.from('memory_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMemoryEngineError(error.message);
    return data ?? [];
  }

  async createKnowledgeGraphNode(schoolId: string, data: KnowledgeGraphNode): Promise<KnowledgeGraphNode> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_graph_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSKnowledgeGraphNodeError(error.message);
    return result;
  }

  async getKnowledgeGraphNode(schoolId: string, id: string): Promise<KnowledgeGraphNode | null> {
    const { data, error } = await this.supabase
      .from('knowledge_graph_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateKnowledgeGraphNode(schoolId: string, id: string, data: Partial<KnowledgeGraphNode>): Promise<KnowledgeGraphNode> {
    const { data: result, error } = await this.supabase
      .from('knowledge_graph_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSKnowledgeGraphNodeError(error.message);
    return result;
  }

  async deleteKnowledgeGraphNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_graph_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSKnowledgeGraphNodeError(error.message);
  }

  async listKnowledgeGraphNode(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeGraphNode[]> {
    let query = this.supabase.from('knowledge_graph_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSKnowledgeGraphNodeError(error.message);
    return data ?? [];
  }

  async createKnowledgeGraphEdge(schoolId: string, data: KnowledgeGraphEdge): Promise<KnowledgeGraphEdge> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_graph_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSKnowledgeGraphEdgeError(error.message);
    return result;
  }

  async getKnowledgeGraphEdge(schoolId: string, id: string): Promise<KnowledgeGraphEdge | null> {
    const { data, error } = await this.supabase
      .from('knowledge_graph_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateKnowledgeGraphEdge(schoolId: string, id: string, data: Partial<KnowledgeGraphEdge>): Promise<KnowledgeGraphEdge> {
    const { data: result, error } = await this.supabase
      .from('knowledge_graph_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSKnowledgeGraphEdgeError(error.message);
    return result;
  }

  async deleteKnowledgeGraphEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_graph_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSKnowledgeGraphEdgeError(error.message);
  }

  async listKnowledgeGraphEdge(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeGraphEdge[]> {
    let query = this.supabase.from('knowledge_graph_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSKnowledgeGraphEdgeError(error.message);
    return data ?? [];
  }

  async createToolRegistryEntry(schoolId: string, data: ToolRegistryEntry): Promise<ToolRegistryEntry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('tool_registry_entries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSToolRegistryEntryError(error.message);
    return result;
  }

  async getToolRegistryEntry(schoolId: string, id: string): Promise<ToolRegistryEntry | null> {
    const { data, error } = await this.supabase
      .from('tool_registry_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateToolRegistryEntry(schoolId: string, id: string, data: Partial<ToolRegistryEntry>): Promise<ToolRegistryEntry> {
    const { data: result, error } = await this.supabase
      .from('tool_registry_entries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSToolRegistryEntryError(error.message);
    return result;
  }

  async deleteToolRegistryEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tool_registry_entries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSToolRegistryEntryError(error.message);
  }

  async listToolRegistryEntry(schoolId: string, filters?: Record<string, unknown>): Promise<ToolRegistryEntry[]> {
    let query = this.supabase.from('tool_registry_entries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSToolRegistryEntryError(error.message);
    return data ?? [];
  }

  async createTaskDelegation(schoolId: string, data: TaskDelegation): Promise<TaskDelegation> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('task_delegations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSTaskDelegationError(error.message);
    return result;
  }

  async getTaskDelegation(schoolId: string, id: string): Promise<TaskDelegation | null> {
    const { data, error } = await this.supabase
      .from('task_delegations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTaskDelegation(schoolId: string, id: string, data: Partial<TaskDelegation>): Promise<TaskDelegation> {
    const { data: result, error } = await this.supabase
      .from('task_delegations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSTaskDelegationError(error.message);
    return result;
  }

  async deleteTaskDelegation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('task_delegations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSTaskDelegationError(error.message);
  }

  async listTaskDelegation(schoolId: string, filters?: Record<string, unknown>): Promise<TaskDelegation[]> {
    let query = this.supabase.from('task_delegations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSTaskDelegationError(error.message);
    return data ?? [];
  }

  async createRAGOrchestrator(schoolId: string, data: RAGOrchestrator): Promise<RAGOrchestrator> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('rag_orchestrators')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSRAGOrchestratorError(error.message);
    return result;
  }

  async getRAGOrchestrator(schoolId: string, id: string): Promise<RAGOrchestrator | null> {
    const { data, error } = await this.supabase
      .from('rag_orchestrators')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRAGOrchestrator(schoolId: string, id: string, data: Partial<RAGOrchestrator>): Promise<RAGOrchestrator> {
    const { data: result, error } = await this.supabase
      .from('rag_orchestrators')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSRAGOrchestratorError(error.message);
    return result;
  }

  async deleteRAGOrchestrator(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rag_orchestrators')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSRAGOrchestratorError(error.message);
  }

  async listRAGOrchestrator(schoolId: string, filters?: Record<string, unknown>): Promise<RAGOrchestrator[]> {
    let query = this.supabase.from('rag_orchestrators').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSRAGOrchestratorError(error.message);
    return data ?? [];
  }

  async createDecisionEngine(schoolId: string, data: DecisionEngine): Promise<DecisionEngine> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('decision_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDecisionEngineError(error.message);
    return result;
  }

  async getDecisionEngine(schoolId: string, id: string): Promise<DecisionEngine | null> {
    const { data, error } = await this.supabase
      .from('decision_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDecisionEngine(schoolId: string, id: string, data: Partial<DecisionEngine>): Promise<DecisionEngine> {
    const { data: result, error } = await this.supabase
      .from('decision_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDecisionEngineError(error.message);
    return result;
  }

  async deleteDecisionEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('decision_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDecisionEngineError(error.message);
  }

  async listDecisionEngine(schoolId: string, filters?: Record<string, unknown>): Promise<DecisionEngine[]> {
    let query = this.supabase.from('decision_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDecisionEngineError(error.message);
    return data ?? [];
  }

  async createAIMonitoring(schoolId: string, data: AIMonitoring): Promise<AIMonitoring> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ai_monitorings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAIMonitoringError(error.message);
    return result;
  }

  async getAIMonitoring(schoolId: string, id: string): Promise<AIMonitoring | null> {
    const { data, error } = await this.supabase
      .from('ai_monitorings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIMonitoring(schoolId: string, id: string, data: Partial<AIMonitoring>): Promise<AIMonitoring> {
    const { data: result, error } = await this.supabase
      .from('ai_monitorings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAIMonitoringError(error.message);
    return result;
  }

  async deleteAIMonitoring(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_monitorings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAIMonitoringError(error.message);
  }

  async listAIMonitoring(schoolId: string, filters?: Record<string, unknown>): Promise<AIMonitoring[]> {
    let query = this.supabase.from('ai_monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAIMonitoringError(error.message);
    return data ?? [];
  }

  async createAIModelRegistry(schoolId: string, data: AIModelRegistry): Promise<AIModelRegistry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ai_model_registries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAIModelRegistryError(error.message);
    return result;
  }

  async getAIModelRegistry(schoolId: string, id: string): Promise<AIModelRegistry | null> {
    const { data, error } = await this.supabase
      .from('ai_model_registries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIModelRegistry(schoolId: string, id: string, data: Partial<AIModelRegistry>): Promise<AIModelRegistry> {
    const { data: result, error } = await this.supabase
      .from('ai_model_registries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAIModelRegistryError(error.message);
    return result;
  }

  async deleteAIModelRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ai_model_registries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAIModelRegistryError(error.message);
  }

  async listAIModelRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<AIModelRegistry[]> {
    let query = this.supabase.from('ai_model_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAIModelRegistryError(error.message);
    return data ?? [];
  }

  async createAgentConversation(schoolId: string, data: AgentConversation): Promise<AgentConversation> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('agent_conversations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAgentConversationError(error.message);
    return result;
  }

  async getAgentConversation(schoolId: string, id: string): Promise<AgentConversation | null> {
    const { data, error } = await this.supabase
      .from('agent_conversations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAgentConversation(schoolId: string, id: string, data: Partial<AgentConversation>): Promise<AgentConversation> {
    const { data: result, error } = await this.supabase
      .from('agent_conversations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAgentConversationError(error.message);
    return result;
  }

  async deleteAgentConversation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('agent_conversations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAgentConversationError(error.message);
  }

  async listAgentConversation(schoolId: string, filters?: Record<string, unknown>): Promise<AgentConversation[]> {
    let query = this.supabase.from('agent_conversations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAgentConversationError(error.message);
    return data ?? [];
  }

  // -- Data Mesh & Analytics --------

  async createDataMesh(schoolId: string, data: DataMesh): Promise<DataMesh> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_meshes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataMeshError(error.message);
    return result;
  }

  async getDataMesh(schoolId: string, id: string): Promise<DataMesh | null> {
    const { data, error } = await this.supabase
      .from('data_meshes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataMesh(schoolId: string, id: string, data: Partial<DataMesh>): Promise<DataMesh> {
    const { data: result, error } = await this.supabase
      .from('data_meshes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataMeshError(error.message);
    return result;
  }

  async deleteDataMesh(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_meshes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataMeshError(error.message);
  }

  async listDataMesh(schoolId: string, filters?: Record<string, unknown>): Promise<DataMesh[]> {
    let query = this.supabase.from('data_meshes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataMeshError(error.message);
    return data ?? [];
  }

  async createDataCatalog(schoolId: string, data: DataCatalog): Promise<DataCatalog> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_catalogs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataCatalogError(error.message);
    return result;
  }

  async getDataCatalog(schoolId: string, id: string): Promise<DataCatalog | null> {
    const { data, error } = await this.supabase
      .from('data_catalogs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataCatalog(schoolId: string, id: string, data: Partial<DataCatalog>): Promise<DataCatalog> {
    const { data: result, error } = await this.supabase
      .from('data_catalogs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataCatalogError(error.message);
    return result;
  }

  async deleteDataCatalog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_catalogs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataCatalogError(error.message);
  }

  async listDataCatalog(schoolId: string, filters?: Record<string, unknown>): Promise<DataCatalog[]> {
    let query = this.supabase.from('data_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataCatalogError(error.message);
    return data ?? [];
  }

  async createMetadataRecord(schoolId: string, data: MetadataRecord): Promise<MetadataRecord> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metadata_records')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMetadataRecordError(error.message);
    return result;
  }

  async getMetadataRecord(schoolId: string, id: string): Promise<MetadataRecord | null> {
    const { data, error } = await this.supabase
      .from('metadata_records')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMetadataRecord(schoolId: string, id: string, data: Partial<MetadataRecord>): Promise<MetadataRecord> {
    const { data: result, error } = await this.supabase
      .from('metadata_records')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMetadataRecordError(error.message);
    return result;
  }

  async deleteMetadataRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metadata_records')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMetadataRecordError(error.message);
  }

  async listMetadataRecord(schoolId: string, filters?: Record<string, unknown>): Promise<MetadataRecord[]> {
    let query = this.supabase.from('metadata_records').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMetadataRecordError(error.message);
    return data ?? [];
  }

  async createMasterData(schoolId: string, data: MasterData): Promise<MasterData> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('master_data')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSMasterDataError(error.message);
    return result;
  }

  async getMasterData(schoolId: string, id: string): Promise<MasterData | null> {
    const { data, error } = await this.supabase
      .from('master_data')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMasterData(schoolId: string, id: string, data: Partial<MasterData>): Promise<MasterData> {
    const { data: result, error } = await this.supabase
      .from('master_data')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSMasterDataError(error.message);
    return result;
  }

  async deleteMasterData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('master_data')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSMasterDataError(error.message);
  }

  async listMasterData(schoolId: string, filters?: Record<string, unknown>): Promise<MasterData[]> {
    let query = this.supabase.from('master_data').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSMasterDataError(error.message);
    return data ?? [];
  }

  async createDataLineage(schoolId: string, data: DataLineage): Promise<DataLineage> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_lineages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataLineageError(error.message);
    return result;
  }

  async getDataLineage(schoolId: string, id: string): Promise<DataLineage | null> {
    const { data, error } = await this.supabase
      .from('data_lineages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataLineage(schoolId: string, id: string, data: Partial<DataLineage>): Promise<DataLineage> {
    const { data: result, error } = await this.supabase
      .from('data_lineages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataLineageError(error.message);
    return result;
  }

  async deleteDataLineage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_lineages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataLineageError(error.message);
  }

  async listDataLineage(schoolId: string, filters?: Record<string, unknown>): Promise<DataLineage[]> {
    let query = this.supabase.from('data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataLineageError(error.message);
    return data ?? [];
  }

  async createDataGovernance(schoolId: string, data: DataGovernance): Promise<DataGovernance> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_governances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataGovernanceError(error.message);
    return result;
  }

  async getDataGovernance(schoolId: string, id: string): Promise<DataGovernance | null> {
    const { data, error } = await this.supabase
      .from('data_governances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataGovernance(schoolId: string, id: string, data: Partial<DataGovernance>): Promise<DataGovernance> {
    const { data: result, error } = await this.supabase
      .from('data_governances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataGovernanceError(error.message);
    return result;
  }

  async deleteDataGovernance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_governances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataGovernanceError(error.message);
  }

  async listDataGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernance[]> {
    let query = this.supabase.from('data_governances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataGovernanceError(error.message);
    return data ?? [];
  }

  async createETLPipeline(schoolId: string, data: ETLPipeline): Promise<ETLPipeline> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('etl_pipelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSETLPipelineError(error.message);
    return result;
  }

  async getETLPipeline(schoolId: string, id: string): Promise<ETLPipeline | null> {
    const { data, error } = await this.supabase
      .from('etl_pipelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateETLPipeline(schoolId: string, id: string, data: Partial<ETLPipeline>): Promise<ETLPipeline> {
    const { data: result, error } = await this.supabase
      .from('etl_pipelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSETLPipelineError(error.message);
    return result;
  }

  async deleteETLPipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('etl_pipelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSETLPipelineError(error.message);
  }

  async listETLPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<ETLPipeline[]> {
    let query = this.supabase.from('etl_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSETLPipelineError(error.message);
    return data ?? [];
  }

  async createELTConfiguration(schoolId: string, data: ELTConfiguration): Promise<ELTConfiguration> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('elt_configurations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSELTConfigurationError(error.message);
    return result;
  }

  async getELTConfiguration(schoolId: string, id: string): Promise<ELTConfiguration | null> {
    const { data, error } = await this.supabase
      .from('elt_configurations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateELTConfiguration(schoolId: string, id: string, data: Partial<ELTConfiguration>): Promise<ELTConfiguration> {
    const { data: result, error } = await this.supabase
      .from('elt_configurations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSELTConfigurationError(error.message);
    return result;
  }

  async deleteELTConfiguration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('elt_configurations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSELTConfigurationError(error.message);
  }

  async listELTConfiguration(schoolId: string, filters?: Record<string, unknown>): Promise<ELTConfiguration[]> {
    let query = this.supabase.from('elt_configurations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSELTConfigurationError(error.message);
    return data ?? [];
  }

  async createDataStream(schoolId: string, data: DataStream): Promise<DataStream> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_streams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataStreamError(error.message);
    return result;
  }

  async getDataStream(schoolId: string, id: string): Promise<DataStream | null> {
    const { data, error } = await this.supabase
      .from('data_streams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataStream(schoolId: string, id: string, data: Partial<DataStream>): Promise<DataStream> {
    const { data: result, error } = await this.supabase
      .from('data_streams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataStreamError(error.message);
    return result;
  }

  async deleteDataStream(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_streams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataStreamError(error.message);
  }

  async listDataStream(schoolId: string, filters?: Record<string, unknown>): Promise<DataStream[]> {
    let query = this.supabase.from('data_streams').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataStreamError(error.message);
    return data ?? [];
  }

  async createDataLakehouse(schoolId: string, data: DataLakehouse): Promise<DataLakehouse> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_lakehouses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataLakehouseError(error.message);
    return result;
  }

  async getDataLakehouse(schoolId: string, id: string): Promise<DataLakehouse | null> {
    const { data, error } = await this.supabase
      .from('data_lakehouses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataLakehouse(schoolId: string, id: string, data: Partial<DataLakehouse>): Promise<DataLakehouse> {
    const { data: result, error } = await this.supabase
      .from('data_lakehouses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataLakehouseError(error.message);
    return result;
  }

  async deleteDataLakehouse(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_lakehouses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataLakehouseError(error.message);
  }

  async listDataLakehouse(schoolId: string, filters?: Record<string, unknown>): Promise<DataLakehouse[]> {
    let query = this.supabase.from('data_lakehouses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataLakehouseError(error.message);
    return data ?? [];
  }

  async createDataWarehouse(schoolId: string, data: DataWarehouse): Promise<DataWarehouse> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_warehouses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataWarehouseError(error.message);
    return result;
  }

  async getDataWarehouse(schoolId: string, id: string): Promise<DataWarehouse | null> {
    const { data, error } = await this.supabase
      .from('data_warehouses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataWarehouse(schoolId: string, id: string, data: Partial<DataWarehouse>): Promise<DataWarehouse> {
    const { data: result, error } = await this.supabase
      .from('data_warehouses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataWarehouseError(error.message);
    return result;
  }

  async deleteDataWarehouse(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_warehouses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataWarehouseError(error.message);
  }

  async listDataWarehouse(schoolId: string, filters?: Record<string, unknown>): Promise<DataWarehouse[]> {
    let query = this.supabase.from('data_warehouses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataWarehouseError(error.message);
    return data ?? [];
  }

  async createDataQualityReport(schoolId: string, data: DataQualityReport): Promise<DataQualityReport> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_quality_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataQualityReportError(error.message);
    return result;
  }

  async getDataQualityReport(schoolId: string, id: string): Promise<DataQualityReport | null> {
    const { data, error } = await this.supabase
      .from('data_quality_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataQualityReport(schoolId: string, id: string, data: Partial<DataQualityReport>): Promise<DataQualityReport> {
    const { data: result, error } = await this.supabase
      .from('data_quality_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataQualityReportError(error.message);
    return result;
  }

  async deleteDataQualityReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_quality_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataQualityReportError(error.message);
  }

  async listDataQualityReport(schoolId: string, filters?: Record<string, unknown>): Promise<DataQualityReport[]> {
    let query = this.supabase.from('data_quality_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataQualityReportError(error.message);
    return data ?? [];
  }

  async createDataMigrationJob(schoolId: string, data: DataMigrationJob): Promise<DataMigrationJob> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_migration_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataMigrationJobError(error.message);
    return result;
  }

  async getDataMigrationJob(schoolId: string, id: string): Promise<DataMigrationJob | null> {
    const { data, error } = await this.supabase
      .from('data_migration_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataMigrationJob(schoolId: string, id: string, data: Partial<DataMigrationJob>): Promise<DataMigrationJob> {
    const { data: result, error } = await this.supabase
      .from('data_migration_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataMigrationJobError(error.message);
    return result;
  }

  async deleteDataMigrationJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_migration_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataMigrationJobError(error.message);
  }

  async listDataMigrationJob(schoolId: string, filters?: Record<string, unknown>): Promise<DataMigrationJob[]> {
    let query = this.supabase.from('data_migration_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataMigrationJobError(error.message);
    return data ?? [];
  }

  // -- Automation Platform --------

  async createAutomationBuilder(schoolId: string, data: AutomationBuilder): Promise<AutomationBuilder> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_builders')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return result;
  }

  async getAutomationBuilder(schoolId: string, id: string): Promise<AutomationBuilder | null> {
    const { data, error } = await this.supabase
      .from('automation_builders')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationBuilder(schoolId: string, id: string, data: Partial<AutomationBuilder>): Promise<AutomationBuilder> {
    const { data: result, error } = await this.supabase
      .from('automation_builders')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return result;
  }

  async deleteAutomationBuilder(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_builders')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationBuilderError(error.message);
  }

  async listAutomationBuilder(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationBuilder[]> {
    let query = this.supabase.from('automation_builders').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return data ?? [];
  }

  async createEventTrigger(schoolId: string, data: EventTrigger): Promise<EventTrigger> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('event_triggers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSEventTriggerError(error.message);
    return result;
  }

  async getEventTrigger(schoolId: string, id: string): Promise<EventTrigger | null> {
    const { data, error } = await this.supabase
      .from('event_triggers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEventTrigger(schoolId: string, id: string, data: Partial<EventTrigger>): Promise<EventTrigger> {
    const { data: result, error } = await this.supabase
      .from('event_triggers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSEventTriggerError(error.message);
    return result;
  }

  async deleteEventTrigger(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('event_triggers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSEventTriggerError(error.message);
  }

  async listEventTrigger(schoolId: string, filters?: Record<string, unknown>): Promise<EventTrigger[]> {
    let query = this.supabase.from('event_triggers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSEventTriggerError(error.message);
    return data ?? [];
  }

  async createBusinessRule(schoolId: string, data: BusinessRule): Promise<BusinessRule> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('business_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBusinessRuleError(error.message);
    return result;
  }

  async getBusinessRule(schoolId: string, id: string): Promise<BusinessRule | null> {
    const { data, error } = await this.supabase
      .from('business_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBusinessRule(schoolId: string, id: string, data: Partial<BusinessRule>): Promise<BusinessRule> {
    const { data: result, error } = await this.supabase
      .from('business_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBusinessRuleError(error.message);
    return result;
  }

  async deleteBusinessRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('business_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBusinessRuleError(error.message);
  }

  async listBusinessRule(schoolId: string, filters?: Record<string, unknown>): Promise<BusinessRule[]> {
    let query = this.supabase.from('business_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBusinessRuleError(error.message);
    return data ?? [];
  }

  async createCronJob(schoolId: string, data: CronJob): Promise<CronJob> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cron_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCronJobError(error.message);
    return result;
  }

  async getCronJob(schoolId: string, id: string): Promise<CronJob | null> {
    const { data, error } = await this.supabase
      .from('cron_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCronJob(schoolId: string, id: string, data: Partial<CronJob>): Promise<CronJob> {
    const { data: result, error } = await this.supabase
      .from('cron_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCronJobError(error.message);
    return result;
  }

  async deleteCronJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cron_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCronJobError(error.message);
  }

  async listCronJob(schoolId: string, filters?: Record<string, unknown>): Promise<CronJob[]> {
    let query = this.supabase.from('cron_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCronJobError(error.message);
    return data ?? [];
  }

  async createAutomationNotification(schoolId: string, data: AutomationNotification): Promise<AutomationNotification> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_notifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationNotificationError(error.message);
    return result;
  }

  async getAutomationNotification(schoolId: string, id: string): Promise<AutomationNotification | null> {
    const { data, error } = await this.supabase
      .from('automation_notifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationNotification(schoolId: string, id: string, data: Partial<AutomationNotification>): Promise<AutomationNotification> {
    const { data: result, error } = await this.supabase
      .from('automation_notifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationNotificationError(error.message);
    return result;
  }

  async deleteAutomationNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_notifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationNotificationError(error.message);
  }

  async listAutomationNotification(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationNotification[]> {
    let query = this.supabase.from('automation_notifications').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationNotificationError(error.message);
    return data ?? [];
  }

  async createBatchProcessingJob(schoolId: string, data: BatchProcessingJob): Promise<BatchProcessingJob> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('batch_processing_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBatchProcessingJobError(error.message);
    return result;
  }

  async getBatchProcessingJob(schoolId: string, id: string): Promise<BatchProcessingJob | null> {
    const { data, error } = await this.supabase
      .from('batch_processing_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBatchProcessingJob(schoolId: string, id: string, data: Partial<BatchProcessingJob>): Promise<BatchProcessingJob> {
    const { data: result, error } = await this.supabase
      .from('batch_processing_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBatchProcessingJobError(error.message);
    return result;
  }

  async deleteBatchProcessingJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('batch_processing_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBatchProcessingJobError(error.message);
  }

  async listBatchProcessingJob(schoolId: string, filters?: Record<string, unknown>): Promise<BatchProcessingJob[]> {
    let query = this.supabase.from('batch_processing_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBatchProcessingJobError(error.message);
    return data ?? [];
  }

  async createLowCodeWorkflow(schoolId: string, data: LowCodeWorkflow): Promise<LowCodeWorkflow> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('low_code_workflows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSLowCodeWorkflowError(error.message);
    return result;
  }

  async getLowCodeWorkflow(schoolId: string, id: string): Promise<LowCodeWorkflow | null> {
    const { data, error } = await this.supabase
      .from('low_code_workflows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateLowCodeWorkflow(schoolId: string, id: string, data: Partial<LowCodeWorkflow>): Promise<LowCodeWorkflow> {
    const { data: result, error } = await this.supabase
      .from('low_code_workflows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSLowCodeWorkflowError(error.message);
    return result;
  }

  async deleteLowCodeWorkflow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('low_code_workflows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSLowCodeWorkflowError(error.message);
  }

  async listLowCodeWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<LowCodeWorkflow[]> {
    let query = this.supabase.from('low_code_workflows').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSLowCodeWorkflowError(error.message);
    return data ?? [];
  }

  async createNoCodeWorkflow(schoolId: string, data: NoCodeWorkflow): Promise<NoCodeWorkflow> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('no_code_workflows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
    return result;
  }

  async getNoCodeWorkflow(schoolId: string, id: string): Promise<NoCodeWorkflow | null> {
    const { data, error } = await this.supabase
      .from('no_code_workflows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNoCodeWorkflow(schoolId: string, id: string, data: Partial<NoCodeWorkflow>): Promise<NoCodeWorkflow> {
    const { data: result, error } = await this.supabase
      .from('no_code_workflows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
    return result;
  }

  async deleteNoCodeWorkflow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('no_code_workflows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
  }

  async listNoCodeWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<NoCodeWorkflow[]> {
    let query = this.supabase.from('no_code_workflows').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
    return data ?? [];
  }

  async createAutomationAnalytics(schoolId: string, data: AutomationAnalytics): Promise<AutomationAnalytics> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_analytics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationAnalyticsError(error.message);
    return result;
  }

  async getAutomationAnalytics(schoolId: string, id: string): Promise<AutomationAnalytics | null> {
    const { data, error } = await this.supabase
      .from('automation_analytics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationAnalytics(schoolId: string, id: string, data: Partial<AutomationAnalytics>): Promise<AutomationAnalytics> {
    const { data: result, error } = await this.supabase
      .from('automation_analytics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationAnalyticsError(error.message);
    return result;
  }

  async deleteAutomationAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_analytics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationAnalyticsError(error.message);
  }

  async listAutomationAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationAnalytics[]> {
    let query = this.supabase.from('automation_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationAnalyticsError(error.message);
    return data ?? [];
  }

  async createAutomationExecution(schoolId: string, data: AutomationExecution): Promise<AutomationExecution> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_executions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationExecutionError(error.message);
    return result;
  }

  async getAutomationExecution(schoolId: string, id: string): Promise<AutomationExecution | null> {
    const { data, error } = await this.supabase
      .from('automation_executions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationExecution(schoolId: string, id: string, data: Partial<AutomationExecution>): Promise<AutomationExecution> {
    const { data: result, error } = await this.supabase
      .from('automation_executions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationExecutionError(error.message);
    return result;
  }

  async deleteAutomationExecution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_executions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationExecutionError(error.message);
  }

  async listAutomationExecution(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationExecution[]> {
    let query = this.supabase.from('automation_executions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationExecutionError(error.message);
    return data ?? [];
  }

  async createAutomationTemplate(schoolId: string, data: AutomationTemplate): Promise<AutomationTemplate> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationTemplateError(error.message);
    return result;
  }

  async getAutomationTemplate(schoolId: string, id: string): Promise<AutomationTemplate | null> {
    const { data, error } = await this.supabase
      .from('automation_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationTemplate(schoolId: string, id: string, data: Partial<AutomationTemplate>): Promise<AutomationTemplate> {
    const { data: result, error } = await this.supabase
      .from('automation_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationTemplateError(error.message);
    return result;
  }

  async deleteAutomationTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationTemplateError(error.message);
  }

  async listAutomationTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationTemplate[]> {
    let query = this.supabase.from('automation_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationTemplateError(error.message);
    return data ?? [];
  }

  async createDependencyNode(schoolId: string, data: DependencyNode): Promise<DependencyNode> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dependency_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDependencyGraphError(error.message);
    return result;
  }

  async getDependencyNode(schoolId: string, id: string): Promise<DependencyNode | null> {
    const { data, error } = await this.supabase
      .from('dependency_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDependencyNode(schoolId: string, id: string, data: Partial<DependencyNode>): Promise<DependencyNode> {
    const { data: result, error } = await this.supabase
      .from('dependency_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDependencyGraphError(error.message);
    return result;
  }

  async deleteDependencyNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dependency_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDependencyGraphError(error.message);
  }

  async listDependencyNode(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyNode[]> {
    let query = this.supabase.from('dependency_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDependencyGraphError(error.message);
    return data ?? [];
  }

  async createDependencyEdge(schoolId: string, data: DependencyEdge): Promise<DependencyEdge> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dependency_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDependencyGraphError(error.message);
    return result;
  }

  async getDependencyEdge(schoolId: string, id: string): Promise<DependencyEdge | null> {
    const { data, error } = await this.supabase
      .from('dependency_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDependencyEdge(schoolId: string, id: string, data: Partial<DependencyEdge>): Promise<DependencyEdge> {
    const { data: result, error } = await this.supabase
      .from('dependency_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDependencyGraphError(error.message);
    return result;
  }

  async deleteDependencyEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dependency_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDependencyGraphError(error.message);
  }

  async listDependencyEdge(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyEdge[]> {
    let query = this.supabase.from('dependency_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDependencyGraphError(error.message);
    return data ?? [];
  }

  async createResourceLimits(schoolId: string, data: ResourceLimits): Promise<ResourceLimits> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_limits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCoreRuntimeError(error.message);
    return result;
  }

  async getResourceLimits(schoolId: string, id: string): Promise<ResourceLimits | null> {
    const { data, error } = await this.supabase
      .from('resource_limits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateResourceLimits(schoolId: string, id: string, data: Partial<ResourceLimits>): Promise<ResourceLimits> {
    const { data: result, error } = await this.supabase
      .from('resource_limits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCoreRuntimeError(error.message);
    return result;
  }

  async deleteResourceLimits(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_limits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCoreRuntimeError(error.message);
  }

  async listResourceLimits(schoolId: string, filters?: Record<string, unknown>): Promise<ResourceLimits[]> {
    let query = this.supabase.from('resource_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCoreRuntimeError(error.message);
    return data ?? [];
  }

  async createHealthCheck(schoolId: string, data: HealthCheck): Promise<HealthCheck> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('health_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSHealthManagerError(error.message);
    return result;
  }

  async getHealthCheck(schoolId: string, id: string): Promise<HealthCheck | null> {
    const { data, error } = await this.supabase
      .from('health_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateHealthCheck(schoolId: string, id: string, data: Partial<HealthCheck>): Promise<HealthCheck> {
    const { data: result, error } = await this.supabase
      .from('health_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSHealthManagerError(error.message);
    return result;
  }

  async deleteHealthCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('health_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSHealthManagerError(error.message);
  }

  async listHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<HealthCheck[]> {
    let query = this.supabase.from('health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSHealthManagerError(error.message);
    return data ?? [];
  }

  async createWorkflowNode(schoolId: string, data: WorkflowNode): Promise<WorkflowNode> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return result;
  }

  async getWorkflowNode(schoolId: string, id: string): Promise<WorkflowNode | null> {
    const { data, error } = await this.supabase
      .from('workflow_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowNode(schoolId: string, id: string, data: Partial<WorkflowNode>): Promise<WorkflowNode> {
    const { data: result, error } = await this.supabase
      .from('workflow_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return result;
  }

  async deleteWorkflowNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
  }

  async listWorkflowNode(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowNode[]> {
    let query = this.supabase.from('workflow_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return data ?? [];
  }

  async createWorkflowEdge(schoolId: string, data: WorkflowEdge): Promise<WorkflowEdge> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return result;
  }

  async getWorkflowEdge(schoolId: string, id: string): Promise<WorkflowEdge | null> {
    const { data, error } = await this.supabase
      .from('workflow_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowEdge(schoolId: string, id: string, data: Partial<WorkflowEdge>): Promise<WorkflowEdge> {
    const { data: result, error } = await this.supabase
      .from('workflow_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return result;
  }

  async deleteWorkflowEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
  }

  async listWorkflowEdge(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEdge[]> {
    let query = this.supabase.from('workflow_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVisualWorkflowBuilderError(error.message);
    return data ?? [];
  }

  async createStateDefinition(schoolId: string, data: StateDefinition): Promise<StateDefinition> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('state_definitions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSStateMachineError(error.message);
    return result;
  }

  async getStateDefinition(schoolId: string, id: string): Promise<StateDefinition | null> {
    const { data, error } = await this.supabase
      .from('state_definitions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStateDefinition(schoolId: string, id: string, data: Partial<StateDefinition>): Promise<StateDefinition> {
    const { data: result, error } = await this.supabase
      .from('state_definitions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSStateMachineError(error.message);
    return result;
  }

  async deleteStateDefinition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('state_definitions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSStateMachineError(error.message);
  }

  async listStateDefinition(schoolId: string, filters?: Record<string, unknown>): Promise<StateDefinition[]> {
    let query = this.supabase.from('state_definitions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSStateMachineError(error.message);
    return data ?? [];
  }

  async createStateTransition(schoolId: string, data: StateTransition): Promise<StateTransition> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('state_transitions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSStateMachineError(error.message);
    return result;
  }

  async getStateTransition(schoolId: string, id: string): Promise<StateTransition | null> {
    const { data, error } = await this.supabase
      .from('state_transitions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStateTransition(schoolId: string, id: string, data: Partial<StateTransition>): Promise<StateTransition> {
    const { data: result, error } = await this.supabase
      .from('state_transitions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSStateMachineError(error.message);
    return result;
  }

  async deleteStateTransition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('state_transitions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSStateMachineError(error.message);
  }

  async listStateTransition(schoolId: string, filters?: Record<string, unknown>): Promise<StateTransition[]> {
    let query = this.supabase.from('state_transitions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSStateMachineError(error.message);
    return data ?? [];
  }

  async createBranchDefinition(schoolId: string, data: BranchDefinition): Promise<BranchDefinition> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('branch_definitions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowBranchError(error.message);
    return result;
  }

  async getBranchDefinition(schoolId: string, id: string): Promise<BranchDefinition | null> {
    const { data, error } = await this.supabase
      .from('branch_definitions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBranchDefinition(schoolId: string, id: string, data: Partial<BranchDefinition>): Promise<BranchDefinition> {
    const { data: result, error } = await this.supabase
      .from('branch_definitions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowBranchError(error.message);
    return result;
  }

  async deleteBranchDefinition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('branch_definitions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowBranchError(error.message);
  }

  async listBranchDefinition(schoolId: string, filters?: Record<string, unknown>): Promise<BranchDefinition[]> {
    let query = this.supabase.from('branch_definitions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowBranchError(error.message);
    return data ?? [];
  }

  async createWorkflowVariable(schoolId: string, data: WorkflowVariable): Promise<WorkflowVariable> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_variables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSWorkflowTemplateError(error.message);
    return result;
  }

  async getWorkflowVariable(schoolId: string, id: string): Promise<WorkflowVariable | null> {
    const { data, error } = await this.supabase
      .from('workflow_variables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWorkflowVariable(schoolId: string, id: string, data: Partial<WorkflowVariable>): Promise<WorkflowVariable> {
    const { data: result, error } = await this.supabase
      .from('workflow_variables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSWorkflowTemplateError(error.message);
    return result;
  }

  async deleteWorkflowVariable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_variables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSWorkflowTemplateError(error.message);
  }

  async listWorkflowVariable(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowVariable[]> {
    let query = this.supabase.from('workflow_variables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSWorkflowTemplateError(error.message);
    return data ?? [];
  }

  async createBoardMember(schoolId: string, data: BoardMember): Promise<BoardMember> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('board_members')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBoardError(error.message);
    return result;
  }

  async getBoardMember(schoolId: string, id: string): Promise<BoardMember | null> {
    const { data, error } = await this.supabase
      .from('board_members')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBoardMember(schoolId: string, id: string, data: Partial<BoardMember>): Promise<BoardMember> {
    const { data: result, error } = await this.supabase
      .from('board_members')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBoardError(error.message);
    return result;
  }

  async deleteBoardMember(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('board_members')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBoardError(error.message);
  }

  async listBoardMember(schoolId: string, filters?: Record<string, unknown>): Promise<BoardMember[]> {
    let query = this.supabase.from('board_members').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBoardError(error.message);
    return data ?? [];
  }

  async createMeetingAgendaItem(schoolId: string, data: MeetingAgendaItem): Promise<MeetingAgendaItem> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('meeting_agenda_items')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBoardMeetingError(error.message);
    return result;
  }

  async getMeetingAgendaItem(schoolId: string, id: string): Promise<MeetingAgendaItem | null> {
    const { data, error } = await this.supabase
      .from('meeting_agenda_items')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMeetingAgendaItem(schoolId: string, id: string, data: Partial<MeetingAgendaItem>): Promise<MeetingAgendaItem> {
    const { data: result, error } = await this.supabase
      .from('meeting_agenda_items')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBoardMeetingError(error.message);
    return result;
  }

  async deleteMeetingAgendaItem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('meeting_agenda_items')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBoardMeetingError(error.message);
  }

  async listMeetingAgendaItem(schoolId: string, filters?: Record<string, unknown>): Promise<MeetingAgendaItem[]> {
    let query = this.supabase.from('meeting_agenda_items').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBoardMeetingError(error.message);
    return data ?? [];
  }

  async createMeetingAttendee(schoolId: string, data: MeetingAttendee): Promise<MeetingAttendee> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('meeting_attendees')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBoardMeetingError(error.message);
    return result;
  }

  async getMeetingAttendee(schoolId: string, id: string): Promise<MeetingAttendee | null> {
    const { data, error } = await this.supabase
      .from('meeting_attendees')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMeetingAttendee(schoolId: string, id: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee> {
    const { data: result, error } = await this.supabase
      .from('meeting_attendees')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBoardMeetingError(error.message);
    return result;
  }

  async deleteMeetingAttendee(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('meeting_attendees')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBoardMeetingError(error.message);
  }

  async listMeetingAttendee(schoolId: string, filters?: Record<string, unknown>): Promise<MeetingAttendee[]> {
    let query = this.supabase.from('meeting_attendees').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBoardMeetingError(error.message);
    return data ?? [];
  }

  async createCommitteeMember(schoolId: string, data: CommitteeMember): Promise<CommitteeMember> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('committee_members')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSCommitteeError(error.message);
    return result;
  }

  async getCommitteeMember(schoolId: string, id: string): Promise<CommitteeMember | null> {
    const { data, error } = await this.supabase
      .from('committee_members')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCommitteeMember(schoolId: string, id: string, data: Partial<CommitteeMember>): Promise<CommitteeMember> {
    const { data: result, error } = await this.supabase
      .from('committee_members')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSCommitteeError(error.message);
    return result;
  }

  async deleteCommitteeMember(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('committee_members')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSCommitteeError(error.message);
  }

  async listCommitteeMember(schoolId: string, filters?: Record<string, unknown>): Promise<CommitteeMember[]> {
    let query = this.supabase.from('committee_members').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSCommitteeError(error.message);
    return data ?? [];
  }

  async createVoteOption(schoolId: string, data: VoteOption): Promise<VoteOption> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vote_options')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSVotingError(error.message);
    return result;
  }

  async getVoteOption(schoolId: string, id: string): Promise<VoteOption | null> {
    const { data, error } = await this.supabase
      .from('vote_options')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVoteOption(schoolId: string, id: string, data: Partial<VoteOption>): Promise<VoteOption> {
    const { data: result, error } = await this.supabase
      .from('vote_options')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSVotingError(error.message);
    return result;
  }

  async deleteVoteOption(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vote_options')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSVotingError(error.message);
  }

  async listVoteOption(schoolId: string, filters?: Record<string, unknown>): Promise<VoteOption[]> {
    let query = this.supabase.from('vote_options').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSVotingError(error.message);
    return data ?? [];
  }

  async createBlockchainEvent(schoolId: string, data: BlockchainEvent): Promise<BlockchainEvent> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('blockchain_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return result;
  }

  async getBlockchainEvent(schoolId: string, id: string): Promise<BlockchainEvent | null> {
    const { data, error } = await this.supabase
      .from('blockchain_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBlockchainEvent(schoolId: string, id: string, data: Partial<BlockchainEvent>): Promise<BlockchainEvent> {
    const { data: result, error } = await this.supabase
      .from('blockchain_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return result;
  }

  async deleteBlockchainEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('blockchain_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
  }

  async listBlockchainEvent(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainEvent[]> {
    let query = this.supabase.from('blockchain_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return data ?? [];
  }

  async createChainOfCustodyEntry(schoolId: string, data: ChainOfCustodyEntry): Promise<ChainOfCustodyEntry> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('chain_of_custody_entries')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return result;
  }

  async getChainOfCustodyEntry(schoolId: string, id: string): Promise<ChainOfCustodyEntry | null> {
    const { data, error } = await this.supabase
      .from('chain_of_custody_entries')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateChainOfCustodyEntry(schoolId: string, id: string, data: Partial<ChainOfCustodyEntry>): Promise<ChainOfCustodyEntry> {
    const { data: result, error } = await this.supabase
      .from('chain_of_custody_entries')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return result;
  }

  async deleteChainOfCustodyEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('chain_of_custody_entries')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
  }

  async listChainOfCustodyEntry(schoolId: string, filters?: Record<string, unknown>): Promise<ChainOfCustodyEntry[]> {
    let query = this.supabase.from('chain_of_custody_entries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBlockchainAuditTrailError(error.message);
    return data ?? [];
  }

  async createPlanningGoal(schoolId: string, data: PlanningGoal): Promise<PlanningGoal> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('planning_goals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSPlanningEngineError(error.message);
    return result;
  }

  async getPlanningGoal(schoolId: string, id: string): Promise<PlanningGoal | null> {
    const { data, error } = await this.supabase
      .from('planning_goals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePlanningGoal(schoolId: string, id: string, data: Partial<PlanningGoal>): Promise<PlanningGoal> {
    const { data: result, error } = await this.supabase
      .from('planning_goals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSPlanningEngineError(error.message);
    return result;
  }

  async deletePlanningGoal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('planning_goals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSPlanningEngineError(error.message);
  }

  async listPlanningGoal(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningGoal[]> {
    let query = this.supabase.from('planning_goals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSPlanningEngineError(error.message);
    return data ?? [];
  }

  async createPlanningConstraint(schoolId: string, data: PlanningConstraint): Promise<PlanningConstraint> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('planning_constraints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSPlanningEngineError(error.message);
    return result;
  }

  async getPlanningConstraint(schoolId: string, id: string): Promise<PlanningConstraint | null> {
    const { data, error } = await this.supabase
      .from('planning_constraints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePlanningConstraint(schoolId: string, id: string, data: Partial<PlanningConstraint>): Promise<PlanningConstraint> {
    const { data: result, error } = await this.supabase
      .from('planning_constraints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSPlanningEngineError(error.message);
    return result;
  }

  async deletePlanningConstraint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('planning_constraints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSPlanningEngineError(error.message);
  }

  async listPlanningConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningConstraint[]> {
    let query = this.supabase.from('planning_constraints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSPlanningEngineError(error.message);
    return data ?? [];
  }

  async createReasoningRule(schoolId: string, data: ReasoningRule): Promise<ReasoningRule> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('reasoning_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSReasoningEngineError(error.message);
    return result;
  }

  async getReasoningRule(schoolId: string, id: string): Promise<ReasoningRule | null> {
    const { data, error } = await this.supabase
      .from('reasoning_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateReasoningRule(schoolId: string, id: string, data: Partial<ReasoningRule>): Promise<ReasoningRule> {
    const { data: result, error } = await this.supabase
      .from('reasoning_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSReasoningEngineError(error.message);
    return result;
  }

  async deleteReasoningRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('reasoning_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSReasoningEngineError(error.message);
  }

  async listReasoningRule(schoolId: string, filters?: Record<string, unknown>): Promise<ReasoningRule[]> {
    let query = this.supabase.from('reasoning_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSReasoningEngineError(error.message);
    return data ?? [];
  }

  async createAgentMessage(schoolId: string, data: AgentMessage): Promise<AgentMessage> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('agent_messages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAgentConversationError(error.message);
    return result;
  }

  async getAgentMessage(schoolId: string, id: string): Promise<AgentMessage | null> {
    const { data, error } = await this.supabase
      .from('agent_messages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAgentMessage(schoolId: string, id: string, data: Partial<AgentMessage>): Promise<AgentMessage> {
    const { data: result, error } = await this.supabase
      .from('agent_messages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAgentConversationError(error.message);
    return result;
  }

  async deleteAgentMessage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('agent_messages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAgentConversationError(error.message);
  }

  async listAgentMessage(schoolId: string, filters?: Record<string, unknown>): Promise<AgentMessage[]> {
    let query = this.supabase.from('agent_messages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAgentConversationError(error.message);
    return data ?? [];
  }

  async createToolCall(schoolId: string, data: ToolCall): Promise<ToolCall> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('tool_calls')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAgentConversationError(error.message);
    return result;
  }

  async getToolCall(schoolId: string, id: string): Promise<ToolCall | null> {
    const { data, error } = await this.supabase
      .from('tool_calls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateToolCall(schoolId: string, id: string, data: Partial<ToolCall>): Promise<ToolCall> {
    const { data: result, error } = await this.supabase
      .from('tool_calls')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAgentConversationError(error.message);
    return result;
  }

  async deleteToolCall(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tool_calls')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAgentConversationError(error.message);
  }

  async listToolCall(schoolId: string, filters?: Record<string, unknown>): Promise<ToolCall[]> {
    let query = this.supabase.from('tool_calls').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAgentConversationError(error.message);
    return data ?? [];
  }

  async createDataProduct(schoolId: string, data: DataProduct): Promise<DataProduct> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_products')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataMeshError(error.message);
    return result;
  }

  async getDataProduct(schoolId: string, id: string): Promise<DataProduct | null> {
    const { data, error } = await this.supabase
      .from('data_products')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataProduct(schoolId: string, id: string, data: Partial<DataProduct>): Promise<DataProduct> {
    const { data: result, error } = await this.supabase
      .from('data_products')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataMeshError(error.message);
    return result;
  }

  async deleteDataProduct(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_products')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataMeshError(error.message);
  }

  async listDataProduct(schoolId: string, filters?: Record<string, unknown>): Promise<DataProduct[]> {
    let query = this.supabase.from('data_products').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataMeshError(error.message);
    return data ?? [];
  }

  async createCatalogAsset(schoolId: string, data: CatalogAsset): Promise<CatalogAsset> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('catalog_assets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataCatalogError(error.message);
    return result;
  }

  async getCatalogAsset(schoolId: string, id: string): Promise<CatalogAsset | null> {
    const { data, error } = await this.supabase
      .from('catalog_assets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateCatalogAsset(schoolId: string, id: string, data: Partial<CatalogAsset>): Promise<CatalogAsset> {
    const { data: result, error } = await this.supabase
      .from('catalog_assets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataCatalogError(error.message);
    return result;
  }

  async deleteCatalogAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('catalog_assets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataCatalogError(error.message);
  }

  async listCatalogAsset(schoolId: string, filters?: Record<string, unknown>): Promise<CatalogAsset[]> {
    let query = this.supabase.from('catalog_assets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataCatalogError(error.message);
    return data ?? [];
  }

  async createDataGovernanceRule(schoolId: string, data: DataGovernanceRule): Promise<DataGovernanceRule> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_governance_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataGovernanceError(error.message);
    return result;
  }

  async getDataGovernanceRule(schoolId: string, id: string): Promise<DataGovernanceRule | null> {
    const { data, error } = await this.supabase
      .from('data_governance_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataGovernanceRule(schoolId: string, id: string, data: Partial<DataGovernanceRule>): Promise<DataGovernanceRule> {
    const { data: result, error } = await this.supabase
      .from('data_governance_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataGovernanceError(error.message);
    return result;
  }

  async deleteDataGovernanceRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_governance_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataGovernanceError(error.message);
  }

  async listDataGovernanceRule(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernanceRule[]> {
    let query = this.supabase.from('data_governance_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataGovernanceError(error.message);
    return data ?? [];
  }

  async createETLTransformation(schoolId: string, data: ETLTransformation): Promise<ETLTransformation> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('etl_transformations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSETLPipelineError(error.message);
    return result;
  }

  async getETLTransformation(schoolId: string, id: string): Promise<ETLTransformation | null> {
    const { data, error } = await this.supabase
      .from('etl_transformations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateETLTransformation(schoolId: string, id: string, data: Partial<ETLTransformation>): Promise<ETLTransformation> {
    const { data: result, error } = await this.supabase
      .from('etl_transformations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSETLPipelineError(error.message);
    return result;
  }

  async deleteETLTransformation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('etl_transformations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSETLPipelineError(error.message);
  }

  async listETLTransformation(schoolId: string, filters?: Record<string, unknown>): Promise<ETLTransformation[]> {
    let query = this.supabase.from('etl_transformations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSETLPipelineError(error.message);
    return data ?? [];
  }

  async createDataQualityIssue(schoolId: string, data: DataQualityIssue): Promise<DataQualityIssue> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_quality_issues')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSDataQualityReportError(error.message);
    return result;
  }

  async getDataQualityIssue(schoolId: string, id: string): Promise<DataQualityIssue | null> {
    const { data, error } = await this.supabase
      .from('data_quality_issues')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataQualityIssue(schoolId: string, id: string, data: Partial<DataQualityIssue>): Promise<DataQualityIssue> {
    const { data: result, error } = await this.supabase
      .from('data_quality_issues')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSDataQualityReportError(error.message);
    return result;
  }

  async deleteDataQualityIssue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_quality_issues')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSDataQualityReportError(error.message);
  }

  async listDataQualityIssue(schoolId: string, filters?: Record<string, unknown>): Promise<DataQualityIssue[]> {
    let query = this.supabase.from('data_quality_issues').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSDataQualityReportError(error.message);
    return data ?? [];
  }

  async createAutomationNode(schoolId: string, data: AutomationNode): Promise<AutomationNode> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return result;
  }

  async getAutomationNode(schoolId: string, id: string): Promise<AutomationNode | null> {
    const { data, error } = await this.supabase
      .from('automation_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationNode(schoolId: string, id: string, data: Partial<AutomationNode>): Promise<AutomationNode> {
    const { data: result, error } = await this.supabase
      .from('automation_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return result;
  }

  async deleteAutomationNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationBuilderError(error.message);
  }

  async listAutomationNode(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationNode[]> {
    let query = this.supabase.from('automation_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return data ?? [];
  }

  async createAutomationEdge(schoolId: string, data: AutomationEdge): Promise<AutomationEdge> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return result;
  }

  async getAutomationEdge(schoolId: string, id: string): Promise<AutomationEdge | null> {
    const { data, error } = await this.supabase
      .from('automation_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationEdge(schoolId: string, id: string, data: Partial<AutomationEdge>): Promise<AutomationEdge> {
    const { data: result, error } = await this.supabase
      .from('automation_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return result;
  }

  async deleteAutomationEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationBuilderError(error.message);
  }

  async listAutomationEdge(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationEdge[]> {
    let query = this.supabase.from('automation_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationBuilderError(error.message);
    return data ?? [];
  }

  async createTriggerCondition(schoolId: string, data: TriggerCondition): Promise<TriggerCondition> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('trigger_conditions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSEventTriggerError(error.message);
    return result;
  }

  async getTriggerCondition(schoolId: string, id: string): Promise<TriggerCondition | null> {
    const { data, error } = await this.supabase
      .from('trigger_conditions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTriggerCondition(schoolId: string, id: string, data: Partial<TriggerCondition>): Promise<TriggerCondition> {
    const { data: result, error } = await this.supabase
      .from('trigger_conditions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSEventTriggerError(error.message);
    return result;
  }

  async deleteTriggerCondition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('trigger_conditions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSEventTriggerError(error.message);
  }

  async listTriggerCondition(schoolId: string, filters?: Record<string, unknown>): Promise<TriggerCondition[]> {
    let query = this.supabase.from('trigger_conditions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSEventTriggerError(error.message);
    return data ?? [];
  }

  async createRuleCondition(schoolId: string, data: RuleCondition): Promise<RuleCondition> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('rule_conditions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBusinessRuleError(error.message);
    return result;
  }

  async getRuleCondition(schoolId: string, id: string): Promise<RuleCondition | null> {
    const { data, error } = await this.supabase
      .from('rule_conditions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRuleCondition(schoolId: string, id: string, data: Partial<RuleCondition>): Promise<RuleCondition> {
    const { data: result, error } = await this.supabase
      .from('rule_conditions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBusinessRuleError(error.message);
    return result;
  }

  async deleteRuleCondition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rule_conditions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBusinessRuleError(error.message);
  }

  async listRuleCondition(schoolId: string, filters?: Record<string, unknown>): Promise<RuleCondition[]> {
    let query = this.supabase.from('rule_conditions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBusinessRuleError(error.message);
    return data ?? [];
  }

  async createRuleAction(schoolId: string, data: RuleAction): Promise<RuleAction> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('rule_actions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSBusinessRuleError(error.message);
    return result;
  }

  async getRuleAction(schoolId: string, id: string): Promise<RuleAction | null> {
    const { data, error } = await this.supabase
      .from('rule_actions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRuleAction(schoolId: string, id: string, data: Partial<RuleAction>): Promise<RuleAction> {
    const { data: result, error } = await this.supabase
      .from('rule_actions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSBusinessRuleError(error.message);
    return result;
  }

  async deleteRuleAction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rule_actions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSBusinessRuleError(error.message);
  }

  async listRuleAction(schoolId: string, filters?: Record<string, unknown>): Promise<RuleAction[]> {
    let query = this.supabase.from('rule_actions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSBusinessRuleError(error.message);
    return data ?? [];
  }

  async createNoCodeAction(schoolId: string, data: NoCodeAction): Promise<NoCodeAction> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('no_code_actions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
    return result;
  }

  async getNoCodeAction(schoolId: string, id: string): Promise<NoCodeAction | null> {
    const { data, error } = await this.supabase
      .from('no_code_actions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNoCodeAction(schoolId: string, id: string, data: Partial<NoCodeAction>): Promise<NoCodeAction> {
    const { data: result, error } = await this.supabase
      .from('no_code_actions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
    return result;
  }

  async deleteNoCodeAction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('no_code_actions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
  }

  async listNoCodeAction(schoolId: string, filters?: Record<string, unknown>): Promise<NoCodeAction[]> {
    let query = this.supabase.from('no_code_actions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSNoCodeWorkflowError(error.message);
    return data ?? [];
  }

  async createAutomationVariable(schoolId: string, data: AutomationVariable): Promise<AutomationVariable> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('automation_variables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduOSAutomationTemplateError(error.message);
    return result;
  }

  async getAutomationVariable(schoolId: string, id: string): Promise<AutomationVariable | null> {
    const { data, error } = await this.supabase
      .from('automation_variables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutomationVariable(schoolId: string, id: string, data: Partial<AutomationVariable>): Promise<AutomationVariable> {
    const { data: result, error } = await this.supabase
      .from('automation_variables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduOSAutomationTemplateError(error.message);
    return result;
  }

  async deleteAutomationVariable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('automation_variables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduOSAutomationTemplateError(error.message);
  }

  async listAutomationVariable(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationVariable[]> {
    let query = this.supabase.from('automation_variables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduOSAutomationTemplateError(error.message);
    return data ?? [];
  }

}

export function createEduOSRepository(supabase: SupabaseClient): EduOSRepository {
  return new EduOSRepositoryImpl(supabase);
}
