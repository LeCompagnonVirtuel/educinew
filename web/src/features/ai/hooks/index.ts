export {
  useAiModels,
  useAiModel,
  useCreateAiModel,
  useUpdateAiModel,
  useDeleteAiModel,
} from './use-ai-models';

export {
  useAiPromptTemplates,
  useAiPromptTemplate,
  useCreatePromptTemplate,
  useUpdatePromptTemplate,
  useDeletePromptTemplate,
} from './use-ai-prompt-templates';

export {
  useAiPromptVersions,
  useAiPromptVersion,
  useCreatePromptVersion,
  useUpdatePromptVersion,
  useDeletePromptVersion,
} from './use-ai-prompt-versions';

export {
  useAiSessions,
  useAiSession,
  useCreateSession,
  useUpdateSession,
  useDeleteSession,
  useSessionMessages,
  useExportSession,
  useSearchSessions,
} from './use-ai-sessions';

export {
  useAiMessages,
  useAiMessage,
  useCreateMessage,
  useUpdateMessage,
  useDeleteMessage,
  useStreamMessage,
} from './use-ai-messages';

export {
  useAiContexts,
  useAiContext,
  useCreateContext,
  useUpdateContext,
  useDeleteContext,
  useContextSearch,
} from './use-ai-contexts';

export {
  useAiPreferences,
  useUpdatePreferences,
  useTheme,
  useLanguage,
  useNotifications,
} from './use-ai-preferences';

export {
  useAiAgents,
  useAiAgent,
  useCreateAgent,
  useUpdateAgent,
  useDeleteAgent,
  useAgentTasks,
  useAgentHandoff,
  useAgentEscalation,
} from './use-ai-agents';

export {
  useAiAgentTasks,
  useAiAgentTask,
  useCreateAgentTask,
  useUpdateAgentTask,
  useDeleteAgentTask,
  useAgentTaskQueue,
} from './use-ai-agent-tasks';

export {
  useStudentAssistant,
  useStudyPlan,
  useQuiz,
  useExercises,
  useFlashcards,
  useProgress,
  useAchievements,
  useLeaderboard,
  useHints,
  useStudyGoals,
} from './use-ai-student-assistant';

export {
  useTeacherAssistant,
  useLessonPlan,
  useAssessment,
  useRubric,
  useFeedback,
  useCorrection,
  useClassAnalytics,
  useIndividualAnalytics,
  useMeeting,
  useReport,
} from './use-ai-teacher-assistant';

export {
  useParentAssistant,
  useParentNotifications,
  useMeetingRequest,
  useHomework,
  useStudyTime,
  useProgressVisualization,
  useBehaviorReport,
  useEvents,
} from './use-ai-parent-assistant';

export {
  useAdminDashboard,
  useAdminReports,
  useFinancialReport,
  useEnrollment,
  useStaffManagement,
  useInventory,
  useMaintenance,
  useTransport,
} from './use-ai-admin-assistant';

export {
  useCurriculum,
  useLearningObjective,
  useScopeSequence,
  useLessonPlanTemplate,
  useAssessmentAlignment,
  useResourceRecommendation,
  useCompetencyFramework,
  useGapAnalysis,
} from './use-ai-curriculum';

export {
  useDocumentUpload,
  useDocumentQuery,
  useDocumentAnnotation,
  useDocumentExport,
  useDocumentShare,
  useDocumentVersion,
  useOcr,
  useSummarization,
} from './use-ai-document-processing';

export {
  useQualityCheck,
  useGrammarCheck,
  useStyleCheck,
  useFactualityCheck,
  useBiasCheck,
  usePlagiarismCheck,
} from './use-ai-quality-assurance';

export {
  useSpeechToText,
  useTextToSpeech,
  useVoiceClone,
  useTranscription,
  useVoiceTranslation,
  useVoiceAuthentication,
  useAudioEnhancement,
  useNoiseReduction,
} from './use-ai-voice-processing';

export {
  useImageAnalysis,
  useObjectDetection,
  useFaceDetection,
  useOcrVision,
  useTextDetection,
  useHandwriting,
  useDiagramUnderstanding,
  useVisualQA,
} from './use-ai-vision-processing';

export {
  useContentFilter,
  usePiiDetection,
  useJailbreakDetection,
  usePromptInjection,
  useBiasDetection,
  useSafetyClassification,
  useIncidentReport,
  useAgeVerification,
} from './use-ai-safety';

export {
  useModerationQueue,
  useModerationAction,
  useUserReport,
  useAppeal,
  useShadowBan,
  useProactiveModeration,
} from './use-ai-moderation';

export {
  useEthicsCheck,
  useBiasMitigation,
  useFairnessCheck,
  useModelCard,
  useConsentManagement,
} from './use-ai-ethics';

export {
  useUsageAnalytics,
  usePerformanceAnalytics,
  useQualityAnalytics,
  useCostAnalytics,
  useCohortAnalysis,
  useFunnelAnalysis,
  useHeatmap,
  useABTesting,
} from './use-ai-analytics';

export {
  useDashboard,
  useWidget,
  useDashboardShare,
  useDashboardTemplate,
  useDashboardAlert,
} from './use-ai-dashboard';

export {
  useInsights,
  useTrends,
  useAnomalies,
  useCorrelations,
  useInsightPredictions,
  useInsightRecommendations,
} from './use-ai-insights';

export {
  usePredictionRequest,
  usePredictionConfig,
  useBacktest,
  useEnsemble,
  useDriftDetection,
  usePredictionMonitoring,
} from './use-ai-predictions';

export {
  useRecommendationRequest,
  useRecommendationFeedback,
  useKnowledgeGraph,
  useContextAware,
  useRecommendationDiversity,
  useRecommendationFreshness,
} from './use-ai-recommendations';

export {
  useAutomation,
  useTrigger,
  useScheduledExecution,
  useEventListener,
  useWebhook,
  useWorkflowTemplate,
} from './use-ai-automation';

export {
  useWorkflow,
  useWorkflowStep,
  useWorkflowExecution,
  useWorkflowRollback,
  useWorkflowVersion,
  useWorkflowTesting,
  useWorkflowDeployment,
  useWorkflowMonitoring,
} from './use-ai-workflow';

export {
  useSchedule,
  useConflictResolution,
  useOptimization,
  useScheduleTemplate,
  usePublication,
  useReminder,
} from './use-ai-schedule';

export {
  useAiNotification,
  useNotificationBatch,
  useNotificationTemplate,
  useNotificationPreference,
  useNotificationDigest,
  useNotificationHistory,
  useNotificationTest,
  useNotificationAnalytics,
} from './use-ai-notification';

export {
  useIntegration,
  useWebhookIntegration,
  useApiKeyIntegration,
  useOAuth2Integration,
  useVersioningIntegration,
} from './use-ai-integration';

export {
  useApiKey,
  useApiKeyCreate,
  useApiKeyRotate,
  useApiKeyRevoke,
  useApiKeyList,
} from './use-ai-api-key';

export {
  useRateLimitConfig,
  useRateLimitStatus,
  useRateLimitOverride,
  useRateLimitAnalytics,
} from './use-ai-rate-limit';

export {
  useCacheConfig,
  useCacheStatus,
  useCacheInvalidation,
  useCacheAnalytics,
} from './use-ai-cache';

export {
  useStorageConfig,
  useFileUpload,
  useFileShare,
  useQuota,
  useStorageBackup,
} from './use-ai-storage';

export {
  useLogConfig,
  useLogEntries,
  useRemoteLog,
  useAuditLog,
} from './use-ai-log';

export {
  useHealthCheck,
  usePerformanceMetrics,
  useAvailability,
  useSecurityMetrics,
  useResourceMetrics,
} from './use-ai-monitor';

export {
  useAlerts,
  useAlertEscalation,
  useAlertTemplate,
  useAlertSuppression,
  useAlertAnalytics,
} from './use-ai-alert';

export {
  useHealthCheckEndpoint,
  useComponentCheck,
  useDeepCheck,
  useReadinessLiveness,
} from './use-ai-health-check';

export {
  useLoadBalancer,
  useStickySession,
  useCircuitBreaker,
  useLoadBalancerAnalytics,
} from './use-ai-load-balancer';

export {
  useScalingConfig,
  usePredictiveScaling,
  useScheduledScaling,
  useMetricScaling,
} from './use-ai-scaling';

export {
  useAuthentication,
  useAuthorization,
  useCsrf,
  usePasswordPolicy,
  useTwoFactor,
} from './use-ai-security';

export {
  useEncryptionConfig,
  useKeyManagement,
  useFieldEncryption,
  useCertificate,
} from './use-ai-encryption';

export {
  useRbac,
  usePermissions,
  useRolePermissionMatrix,
  usePolicy,
  useContextAuth,
} from './use-ai-authorization';

export {
  useAuditEvent,
  useAuditQuery,
  useAuditReport,
  useComplianceAudit,
  useAuditArchive,
} from './use-ai-audit';

export {
  useComplianceCheck,
  useConsentManagementCompliance,
  useDataProtection,
  useBreachNotification,
  usePia,
} from './use-ai-compliance';

export {
  useDataClassification,
  usePrivacyConfig,
  useDataTransfer,
  usePrivacyByDesign,
  usePrivacyMonitoring,
} from './use-ai-privacy';

export {
  useRetentionPolicy,
  useDeletion,
  useArchival,
  useLegalHold,
} from './use-ai-data-retention';

export {
  useMobileConfig,
  usePushNotification,
  useBiometricAuth,
  useDeviceManagement,
} from './use-ai-mobile';

export {
  useOfflineConfig,
  useOfflineSync,
  useOfflineQueue,
} from './use-ai-offline';
