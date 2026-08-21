import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudABTestError, EduCloudABTestMetricError, EduCloudABTestResultError, EduCloudAudienceConditionError, EduCloudAudienceError, EduCloudAudienceFilterError, EduCloudBaseNotificationError, EduCloudBatchError, EduCloudChangelogError, EduCloudChannelHealthError, EduCloudChannelPreferenceError, EduCloudEmailNotificationError, EduCloudEmergencyAckError, EduCloudEmergencyAlertError, EduCloudEmergencyBroadcastError, EduCloudGeoCoordinateError, EduCloudGeoFenceError, EduCloudGeoNotificationError, EduCloudGeoTargetError, EduCloudImportErrorError, EduCloudInAppNotificationError, EduCloudNotificationAIError, EduCloudNotificationAIModelError, EduCloudNotificationAIRecommendationError, EduCloudNotificationAnalyticsDataError, EduCloudNotificationArchiveError, EduCloudNotificationAttachmentError, EduCloudNotificationAuditError, EduCloudNotificationBatchError, EduCloudNotificationBounceError, EduCloudNotificationChangelogError, EduCloudNotificationClickError, EduCloudNotificationComplianceError, EduCloudNotificationConversionError, EduCloudNotificationDashboardError, EduCloudNotificationDeliveryError, EduCloudNotificationDigestError, EduCloudNotificationError, EduCloudNotificationEventError, EduCloudNotificationEventLogError, EduCloudNotificationExportError, EduCloudNotificationFilterError, EduCloudNotificationGDPRError, EduCloudNotificationHealthError, EduCloudNotificationImportError, EduCloudNotificationInboxError, EduCloudNotificationInsightError, EduCloudNotificationJobError, EduCloudNotificationMetricError, EduCloudNotificationMigrationError, EduCloudNotificationOpenError, EduCloudNotificationPreferenceError, EduCloudNotificationQueueError, EduCloudNotificationRateLimitError, EduCloudNotificationReadError, EduCloudNotificationReportError, EduCloudNotificationScheduleError, EduCloudNotificationSettingError, EduCloudNotificationSyncError, EduCloudNotificationSystemAlertError, EduCloudNotificationTemplateError, EduCloudNotificationTemplateVersionError, EduCloudNotificationThrottleError, EduCloudNotificationUnsubscribeError, EduCloudNotificationVersionError, EduCloudNotificationWebhookDeliveryError, EduCloudNotificationWebhookError, EduCloudNotificationWidgetError, EduCloudPushNotificationError, EduCloudPushRichMediaError, EduCloudQuietHoursError, EduCloudRetryPolicyError, EduCloudSlackFieldError, EduCloudSlackNotificationError, EduCloudSMSNotificationError, EduCloudTeamsActionError, EduCloudTeamsNotificationError, EduCloudTeamsSectionError, EduCloudTelegramNotificationError, EduCloudVoiceNotificationError, EduCloudWebhookNotificationError, EduCloudWhatsAppButtonError, EduCloudWhatsAppInteractiveError, EduCloudWhatsAppNotificationError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface ObserveModuleRepository {

  // =============================================================================
  // NOTIFICATION-UNIFIED
  // =============================================================================
  getBaseNotification(schoolId: string, id: string): Promise<any | null>;
  listBaseNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBaseNotification(schoolId: string, data: any): Promise<any>;
  updateBaseNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteBaseNotification(schoolId: string, id: string): Promise<void>;

  getEmailNotification(schoolId: string, id: string): Promise<any | null>;
  listEmailNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmailNotification(schoolId: string, data: any): Promise<any>;
  updateEmailNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmailNotification(schoolId: string, id: string): Promise<void>;

  getSMSNotification(schoolId: string, id: string): Promise<any | null>;
  listSMSNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSMSNotification(schoolId: string, data: any): Promise<any>;
  updateSMSNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteSMSNotification(schoolId: string, id: string): Promise<void>;

  getPushNotification(schoolId: string, id: string): Promise<any | null>;
  listPushNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPushNotification(schoolId: string, data: any): Promise<any>;
  updatePushNotification(schoolId: string, id: string, data: any): Promise<any>;
  deletePushNotification(schoolId: string, id: string): Promise<void>;

  getWhatsAppNotification(schoolId: string, id: string): Promise<any | null>;
  listWhatsAppNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatsAppNotification(schoolId: string, data: any): Promise<any>;
  updateWhatsAppNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatsAppNotification(schoolId: string, id: string): Promise<void>;

  getTelegramNotification(schoolId: string, id: string): Promise<any | null>;
  listTelegramNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTelegramNotification(schoolId: string, data: any): Promise<any>;
  updateTelegramNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteTelegramNotification(schoolId: string, id: string): Promise<void>;

  getTeamsNotification(schoolId: string, id: string): Promise<any | null>;
  listTeamsNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeamsNotification(schoolId: string, data: any): Promise<any>;
  updateTeamsNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeamsNotification(schoolId: string, id: string): Promise<void>;

  getSlackNotification(schoolId: string, id: string): Promise<any | null>;
  listSlackNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSlackNotification(schoolId: string, data: any): Promise<any>;
  updateSlackNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteSlackNotification(schoolId: string, id: string): Promise<void>;

  getVoiceNotification(schoolId: string, id: string): Promise<any | null>;
  listVoiceNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceNotification(schoolId: string, data: any): Promise<any>;
  updateVoiceNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceNotification(schoolId: string, id: string): Promise<void>;

  getInAppNotification(schoolId: string, id: string): Promise<any | null>;
  listInAppNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInAppNotification(schoolId: string, data: any): Promise<any>;
  updateInAppNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteInAppNotification(schoolId: string, id: string): Promise<void>;

  getWebhookNotification(schoolId: string, id: string): Promise<any | null>;
  listWebhookNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWebhookNotification(schoolId: string, data: any): Promise<any>;
  updateWebhookNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteWebhookNotification(schoolId: string, id: string): Promise<void>;

  getNotificationAttachment(schoolId: string, id: string): Promise<any | null>;
  listNotificationAttachment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationAttachment(schoolId: string, data: any): Promise<any>;
  updateNotificationAttachment(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationAttachment(schoolId: string, id: string): Promise<void>;

  getPushRichMedia(schoolId: string, id: string): Promise<any | null>;
  listPushRichMedia(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPushRichMedia(schoolId: string, data: any): Promise<any>;
  updatePushRichMedia(schoolId: string, id: string, data: any): Promise<any>;
  deletePushRichMedia(schoolId: string, id: string): Promise<void>;

  getWhatsAppButton(schoolId: string, id: string): Promise<any | null>;
  listWhatsAppButton(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatsAppButton(schoolId: string, data: any): Promise<any>;
  updateWhatsAppButton(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatsAppButton(schoolId: string, id: string): Promise<void>;

  getWhatsAppInteractive(schoolId: string, id: string): Promise<any | null>;
  listWhatsAppInteractive(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatsAppInteractive(schoolId: string, data: any): Promise<any>;
  updateWhatsAppInteractive(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatsAppInteractive(schoolId: string, id: string): Promise<void>;

  getTeamsAction(schoolId: string, id: string): Promise<any | null>;
  listTeamsAction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeamsAction(schoolId: string, data: any): Promise<any>;
  updateTeamsAction(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeamsAction(schoolId: string, id: string): Promise<void>;

  getTeamsSection(schoolId: string, id: string): Promise<any | null>;
  listTeamsSection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeamsSection(schoolId: string, data: any): Promise<any>;
  updateTeamsSection(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeamsSection(schoolId: string, id: string): Promise<void>;

  getSlackField(schoolId: string, id: string): Promise<any | null>;
  listSlackField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSlackField(schoolId: string, data: any): Promise<any>;
  updateSlackField(schoolId: string, id: string, data: any): Promise<any>;
  deleteSlackField(schoolId: string, id: string): Promise<void>;

  getNotificationConfig(schoolId: string, id: string): Promise<any | null>;
  listNotificationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationConfig(schoolId: string, data: any): Promise<any>;
  updateNotificationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationConfig(schoolId: string, id: string): Promise<void>;

  getNotificationRateLimitConfig(schoolId: string, id: string): Promise<any | null>;
  listNotificationRateLimitConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationRateLimitConfig(schoolId: string, data: any): Promise<any>;
  updateNotificationRateLimitConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationRateLimitConfig(schoolId: string, id: string): Promise<void>;

  getQuietHoursConfig(schoolId: string, id: string): Promise<any | null>;
  listQuietHoursConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createQuietHoursConfig(schoolId: string, data: any): Promise<any>;
  updateQuietHoursConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteQuietHoursConfig(schoolId: string, id: string): Promise<void>;

  getRetryPolicyConfig(schoolId: string, id: string): Promise<any | null>;
  listRetryPolicyConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRetryPolicyConfig(schoolId: string, data: any): Promise<any>;
  updateRetryPolicyConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteRetryPolicyConfig(schoolId: string, id: string): Promise<void>;

  getNotificationTemplate(schoolId: string, id: string): Promise<any | null>;
  listNotificationTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationTemplate(schoolId: string, data: any): Promise<any>;
  updateNotificationTemplate(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationTemplate(schoolId: string, id: string): Promise<void>;

  getNotificationTemplateVersion(schoolId: string, id: string): Promise<any | null>;
  listNotificationTemplateVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationTemplateVersion(schoolId: string, data: any): Promise<any>;
  updateNotificationTemplateVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationTemplateVersion(schoolId: string, id: string): Promise<void>;

  getNotificationBatch(schoolId: string, id: string): Promise<any | null>;
  listNotificationBatch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationBatch(schoolId: string, data: any): Promise<any>;
  updateNotificationBatch(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationBatch(schoolId: string, id: string): Promise<void>;

  getBatchConfig(schoolId: string, id: string): Promise<any | null>;
  listBatchConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBatchConfig(schoolId: string, data: any): Promise<any>;
  updateBatchConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteBatchConfig(schoolId: string, id: string): Promise<void>;

  getNotificationJob(schoolId: string, id: string): Promise<any | null>;
  listNotificationJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationJob(schoolId: string, data: any): Promise<any>;
  updateNotificationJob(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationJob(schoolId: string, id: string): Promise<void>;

  getNotificationSchedule(schoolId: string, id: string): Promise<any | null>;
  listNotificationSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationSchedule(schoolId: string, data: any): Promise<any>;
  updateNotificationSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationSchedule(schoolId: string, id: string): Promise<void>;

  getNotificationDelivery(schoolId: string, id: string): Promise<any | null>;
  listNotificationDelivery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationDelivery(schoolId: string, data: any): Promise<any>;
  updateNotificationDelivery(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationDelivery(schoolId: string, id: string): Promise<void>;

  getNotificationBounce(schoolId: string, id: string): Promise<any | null>;
  listNotificationBounce(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationBounce(schoolId: string, data: any): Promise<any>;
  updateNotificationBounce(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationBounce(schoolId: string, id: string): Promise<void>;

  getNotificationClick(schoolId: string, id: string): Promise<any | null>;
  listNotificationClick(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationClick(schoolId: string, data: any): Promise<any>;
  updateNotificationClick(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationClick(schoolId: string, id: string): Promise<void>;

  getNotificationOpen(schoolId: string, id: string): Promise<any | null>;
  listNotificationOpen(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationOpen(schoolId: string, data: any): Promise<any>;
  updateNotificationOpen(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationOpen(schoolId: string, id: string): Promise<void>;

  getNotificationConversion(schoolId: string, id: string): Promise<any | null>;
  listNotificationConversion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationConversion(schoolId: string, data: any): Promise<any>;
  updateNotificationConversion(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationConversion(schoolId: string, id: string): Promise<void>;

  getNotificationUnsubscribe(schoolId: string, id: string): Promise<any | null>;
  listNotificationUnsubscribe(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationUnsubscribe(schoolId: string, data: any): Promise<any>;
  updateNotificationUnsubscribe(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationUnsubscribe(schoolId: string, id: string): Promise<void>;

  getAudience(schoolId: string, id: string): Promise<any | null>;
  listAudience(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAudience(schoolId: string, data: any): Promise<any>;
  updateAudience(schoolId: string, id: string, data: any): Promise<any>;
  deleteAudience(schoolId: string, id: string): Promise<void>;

  getAudienceFilter(schoolId: string, id: string): Promise<any | null>;
  listAudienceFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAudienceFilter(schoolId: string, data: any): Promise<any>;
  updateAudienceFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteAudienceFilter(schoolId: string, id: string): Promise<void>;

  getAudienceCondition(schoolId: string, id: string): Promise<any | null>;
  listAudienceCondition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAudienceCondition(schoolId: string, data: any): Promise<any>;
  updateAudienceCondition(schoolId: string, id: string, data: any): Promise<any>;
  deleteAudienceCondition(schoolId: string, id: string): Promise<void>;

  getGeoTarget(schoolId: string, id: string): Promise<any | null>;
  listGeoTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoTarget(schoolId: string, data: any): Promise<any>;
  updateGeoTarget(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoTarget(schoolId: string, id: string): Promise<void>;

  getGeoCoordinate(schoolId: string, id: string): Promise<any | null>;
  listGeoCoordinate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoCoordinate(schoolId: string, data: any): Promise<any>;
  updateGeoCoordinate(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoCoordinate(schoolId: string, id: string): Promise<void>;

  getGeoFence(schoolId: string, id: string): Promise<any | null>;
  listGeoFence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoFence(schoolId: string, data: any): Promise<any>;
  updateGeoFence(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoFence(schoolId: string, id: string): Promise<void>;

  getGeoNotification(schoolId: string, id: string): Promise<any | null>;
  listGeoNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoNotification(schoolId: string, data: any): Promise<any>;
  updateGeoNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoNotification(schoolId: string, id: string): Promise<void>;

  getEmergencyAlert(schoolId: string, id: string): Promise<any | null>;
  listEmergencyAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmergencyAlert(schoolId: string, data: any): Promise<any>;
  updateEmergencyAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmergencyAlert(schoolId: string, id: string): Promise<void>;

  getEmergencyBroadcast(schoolId: string, id: string): Promise<any | null>;
  listEmergencyBroadcast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmergencyBroadcast(schoolId: string, data: any): Promise<any>;
  updateEmergencyBroadcast(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmergencyBroadcast(schoolId: string, id: string): Promise<void>;

  getEmergencyAck(schoolId: string, id: string): Promise<any | null>;
  listEmergencyAck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmergencyAck(schoolId: string, data: any): Promise<any>;
  updateEmergencyAck(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmergencyAck(schoolId: string, id: string): Promise<void>;

  getNotificationPreference(schoolId: string, id: string): Promise<any | null>;
  listNotificationPreference(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationPreference(schoolId: string, data: any): Promise<any>;
  updateNotificationPreference(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationPreference(schoolId: string, id: string): Promise<void>;

  getChannelPreferenceConfig(schoolId: string, id: string): Promise<any | null>;
  listChannelPreferenceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createChannelPreferenceConfig(schoolId: string, data: any): Promise<any>;
  updateChannelPreferenceConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteChannelPreferenceConfig(schoolId: string, id: string): Promise<void>;

  getNotificationSetting(schoolId: string, id: string): Promise<any | null>;
  listNotificationSetting(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationSetting(schoolId: string, data: any): Promise<any>;
  updateNotificationSetting(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationSetting(schoolId: string, id: string): Promise<void>;

  getNotificationDigest(schoolId: string, id: string): Promise<any | null>;
  listNotificationDigest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationDigest(schoolId: string, data: any): Promise<any>;
  updateNotificationDigest(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationDigest(schoolId: string, id: string): Promise<void>;

  getNotificationInbox(schoolId: string, id: string): Promise<any | null>;
  listNotificationInbox(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationInbox(schoolId: string, data: any): Promise<any>;
  updateNotificationInbox(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationInbox(schoolId: string, id: string): Promise<void>;

  getNotificationRead(schoolId: string, id: string): Promise<any | null>;
  listNotificationRead(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationRead(schoolId: string, data: any): Promise<any>;
  updateNotificationRead(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationRead(schoolId: string, id: string): Promise<void>;

  getNotificationArchive(schoolId: string, id: string): Promise<any | null>;
  listNotificationArchive(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationArchive(schoolId: string, data: any): Promise<any>;
  updateNotificationArchive(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationArchive(schoolId: string, id: string): Promise<void>;

  getABTest(schoolId: string, id: string): Promise<any | null>;
  listABTest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createABTest(schoolId: string, data: any): Promise<any>;
  updateABTest(schoolId: string, id: string, data: any): Promise<any>;
  deleteABTest(schoolId: string, id: string): Promise<void>;

  getABTestResult(schoolId: string, id: string): Promise<any | null>;
  listABTestResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createABTestResult(schoolId: string, data: any): Promise<any>;
  updateABTestResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteABTestResult(schoolId: string, id: string): Promise<void>;

  getABTestMetric(schoolId: string, id: string): Promise<any | null>;
  listABTestMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createABTestMetric(schoolId: string, data: any): Promise<any>;
  updateABTestMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteABTestMetric(schoolId: string, id: string): Promise<void>;

  getNotificationAnalyticsData(schoolId: string, id: string): Promise<any | null>;
  listNotificationAnalyticsData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationAnalyticsData(schoolId: string, data: any): Promise<any>;
  updateNotificationAnalyticsData(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationAnalyticsData(schoolId: string, id: string): Promise<void>;

  getNotificationReport(schoolId: string, id: string): Promise<any | null>;
  listNotificationReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationReport(schoolId: string, data: any): Promise<any>;
  updateNotificationReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationReport(schoolId: string, id: string): Promise<void>;

  getNotificationInsight(schoolId: string, id: string): Promise<any | null>;
  listNotificationInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationInsight(schoolId: string, data: any): Promise<any>;
  updateNotificationInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationInsight(schoolId: string, id: string): Promise<void>;

  getNotificationAI(schoolId: string, id: string): Promise<any | null>;
  listNotificationAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationAI(schoolId: string, data: any): Promise<any>;
  updateNotificationAI(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationAI(schoolId: string, id: string): Promise<void>;

  getNotificationAIModel(schoolId: string, id: string): Promise<any | null>;
  listNotificationAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationAIModel(schoolId: string, data: any): Promise<any>;
  updateNotificationAIModel(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationAIModel(schoolId: string, id: string): Promise<void>;

  getNotificationAIRecommendation(schoolId: string, id: string): Promise<any | null>;
  listNotificationAIRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationAIRecommendation(schoolId: string, data: any): Promise<any>;
  updateNotificationAIRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationAIRecommendation(schoolId: string, id: string): Promise<void>;

  getNotificationEvent(schoolId: string, id: string): Promise<any | null>;
  listNotificationEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationEvent(schoolId: string, data: any): Promise<any>;
  updateNotificationEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationEvent(schoolId: string, id: string): Promise<void>;

  getNotificationEventLog(schoolId: string, id: string): Promise<any | null>;
  listNotificationEventLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationEventLog(schoolId: string, data: any): Promise<any>;
  updateNotificationEventLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationEventLog(schoolId: string, id: string): Promise<void>;

  getNotificationWebhook(schoolId: string, id: string): Promise<any | null>;
  listNotificationWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationWebhook(schoolId: string, data: any): Promise<any>;
  updateNotificationWebhook(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationWebhook(schoolId: string, id: string): Promise<void>;

  getNotificationWebhookConfig(schoolId: string, id: string): Promise<any | null>;
  listNotificationWebhookConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationWebhookConfig(schoolId: string, data: any): Promise<any>;
  updateNotificationWebhookConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationWebhookConfig(schoolId: string, id: string): Promise<void>;

  getNotificationWebhookDelivery(schoolId: string, id: string): Promise<any | null>;
  listNotificationWebhookDelivery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationWebhookDelivery(schoolId: string, data: any): Promise<any>;
  updateNotificationWebhookDelivery(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationWebhookDelivery(schoolId: string, id: string): Promise<void>;

  getNotificationRateLimit(schoolId: string, id: string): Promise<any | null>;
  listNotificationRateLimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationRateLimit(schoolId: string, data: any): Promise<any>;
  updateNotificationRateLimit(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationRateLimit(schoolId: string, id: string): Promise<void>;

  getNotificationThrottle(schoolId: string, id: string): Promise<any | null>;
  listNotificationThrottle(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationThrottle(schoolId: string, data: any): Promise<any>;
  updateNotificationThrottle(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationThrottle(schoolId: string, id: string): Promise<void>;

  getNotificationQueue(schoolId: string, id: string): Promise<any | null>;
  listNotificationQueue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationQueue(schoolId: string, data: any): Promise<any>;
  updateNotificationQueue(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationQueue(schoolId: string, id: string): Promise<void>;

  getNotificationAudit(schoolId: string, id: string): Promise<any | null>;
  listNotificationAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationAudit(schoolId: string, data: any): Promise<any>;
  updateNotificationAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationAudit(schoolId: string, id: string): Promise<void>;

  getNotificationCompliance(schoolId: string, id: string): Promise<any | null>;
  listNotificationCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationCompliance(schoolId: string, data: any): Promise<any>;
  updateNotificationCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationCompliance(schoolId: string, id: string): Promise<void>;

  getNotificationGDPR(schoolId: string, id: string): Promise<any | null>;
  listNotificationGDPR(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationGDPR(schoolId: string, data: any): Promise<any>;
  updateNotificationGDPR(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationGDPR(schoolId: string, id: string): Promise<void>;

  getNotificationExport(schoolId: string, id: string): Promise<any | null>;
  listNotificationExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationExport(schoolId: string, data: any): Promise<any>;
  updateNotificationExport(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationExport(schoolId: string, id: string): Promise<void>;

  getNotificationImport(schoolId: string, id: string): Promise<any | null>;
  listNotificationImport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationImport(schoolId: string, data: any): Promise<any>;
  updateNotificationImport(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationImport(schoolId: string, id: string): Promise<void>;

  getImportError(schoolId: string, id: string): Promise<any | null>;
  listImportError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImportError(schoolId: string, data: any): Promise<any>;
  updateImportError(schoolId: string, id: string, data: any): Promise<any>;
  deleteImportError(schoolId: string, id: string): Promise<void>;

  getNotificationSync(schoolId: string, id: string): Promise<any | null>;
  listNotificationSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationSync(schoolId: string, data: any): Promise<any>;
  updateNotificationSync(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationSync(schoolId: string, id: string): Promise<void>;

  getNotificationDashboard(schoolId: string, id: string): Promise<any | null>;
  listNotificationDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationDashboard(schoolId: string, data: any): Promise<any>;
  updateNotificationDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationDashboard(schoolId: string, id: string): Promise<void>;

  getNotificationWidget(schoolId: string, id: string): Promise<any | null>;
  listNotificationWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationWidget(schoolId: string, data: any): Promise<any>;
  updateNotificationWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationWidget(schoolId: string, id: string): Promise<void>;

  getNotificationFilter(schoolId: string, id: string): Promise<any | null>;
  listNotificationFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationFilter(schoolId: string, data: any): Promise<any>;
  updateNotificationFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationFilter(schoolId: string, id: string): Promise<void>;

  getNotificationVersion(schoolId: string, id: string): Promise<any | null>;
  listNotificationVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationVersion(schoolId: string, data: any): Promise<any>;
  updateNotificationVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationVersion(schoolId: string, id: string): Promise<void>;

  getNotificationMigration(schoolId: string, id: string): Promise<any | null>;
  listNotificationMigration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationMigration(schoolId: string, data: any): Promise<any>;
  updateNotificationMigration(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationMigration(schoolId: string, id: string): Promise<void>;

  getNotificationChangelog(schoolId: string, id: string): Promise<any | null>;
  listNotificationChangelog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationChangelog(schoolId: string, data: any): Promise<any>;
  updateNotificationChangelog(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationChangelog(schoolId: string, id: string): Promise<void>;

  getChangelogEntry(schoolId: string, id: string): Promise<any | null>;
  listChangelogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createChangelogEntry(schoolId: string, data: any): Promise<any>;
  updateChangelogEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteChangelogEntry(schoolId: string, id: string): Promise<void>;

  getNotificationHealth(schoolId: string, id: string): Promise<any | null>;
  listNotificationHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationHealth(schoolId: string, data: any): Promise<any>;
  updateNotificationHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationHealth(schoolId: string, id: string): Promise<void>;

  getChannelHealth(schoolId: string, id: string): Promise<any | null>;
  listChannelHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createChannelHealth(schoolId: string, data: any): Promise<any>;
  updateChannelHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteChannelHealth(schoolId: string, id: string): Promise<void>;

  getNotificationMetric(schoolId: string, id: string): Promise<any | null>;
  listNotificationMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationMetric(schoolId: string, data: any): Promise<any>;
  updateNotificationMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationMetric(schoolId: string, id: string): Promise<void>;

  getNotificationSystemAlert(schoolId: string, id: string): Promise<any | null>;
  listNotificationSystemAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNotificationSystemAlert(schoolId: string, data: any): Promise<any>;
  updateNotificationSystemAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteNotificationSystemAlert(schoolId: string, id: string): Promise<void>;

}

class ObserveModuleRepositoryImpl implements ObserveModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // NOTIFICATION-UNIFIED
  // =============================================================================
  async getBaseNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('base_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBaseNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('base_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBaseNotificationError(error.message);
    return data ?? [];
  }

  async createBaseNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('base_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBaseNotificationError(error.message);
    return result;
  }

  async updateBaseNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('base_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBaseNotificationError(error.message);
    return result;
  }

  async deleteBaseNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('base_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBaseNotificationError(error.message);
  }

  async getEmailNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('email_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmailNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('email_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmailNotificationError(error.message);
    return data ?? [];
  }

  async createEmailNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('email_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmailNotificationError(error.message);
    return result;
  }

  async updateEmailNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('email_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmailNotificationError(error.message);
    return result;
  }

  async deleteEmailNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('email_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmailNotificationError(error.message);
  }

  async getSMSNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('smsnotificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSMSNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('smsnotificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSMSNotificationError(error.message);
    return data ?? [];
  }

  async createSMSNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('smsnotificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSMSNotificationError(error.message);
    return result;
  }

  async updateSMSNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('smsnotificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSMSNotificationError(error.message);
    return result;
  }

  async deleteSMSNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('smsnotificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSMSNotificationError(error.message);
  }

  async getPushNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('push_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPushNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('push_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPushNotificationError(error.message);
    return data ?? [];
  }

  async createPushNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('push_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPushNotificationError(error.message);
    return result;
  }

  async updatePushNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('push_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPushNotificationError(error.message);
    return result;
  }

  async deletePushNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('push_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPushNotificationError(error.message);
  }

  async getWhatsAppNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('whats_app_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatsAppNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('whats_app_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatsAppNotificationError(error.message);
    return data ?? [];
  }

  async createWhatsAppNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('whats_app_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatsAppNotificationError(error.message);
    return result;
  }

  async updateWhatsAppNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('whats_app_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatsAppNotificationError(error.message);
    return result;
  }

  async deleteWhatsAppNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('whats_app_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatsAppNotificationError(error.message);
  }

  async getTelegramNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('telegram_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTelegramNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('telegram_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTelegramNotificationError(error.message);
    return data ?? [];
  }

  async createTelegramNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('telegram_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTelegramNotificationError(error.message);
    return result;
  }

  async updateTelegramNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('telegram_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTelegramNotificationError(error.message);
    return result;
  }

  async deleteTelegramNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('telegram_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTelegramNotificationError(error.message);
  }

  async getTeamsNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teams_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeamsNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teams_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeamsNotificationError(error.message);
    return data ?? [];
  }

  async createTeamsNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teams_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeamsNotificationError(error.message);
    return result;
  }

  async updateTeamsNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teams_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeamsNotificationError(error.message);
    return result;
  }

  async deleteTeamsNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teams_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeamsNotificationError(error.message);
  }

  async getSlackNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('slack_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSlackNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('slack_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSlackNotificationError(error.message);
    return data ?? [];
  }

  async createSlackNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('slack_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSlackNotificationError(error.message);
    return result;
  }

  async updateSlackNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('slack_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSlackNotificationError(error.message);
    return result;
  }

  async deleteSlackNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('slack_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSlackNotificationError(error.message);
  }

  async getVoiceNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceNotificationError(error.message);
    return data ?? [];
  }

  async createVoiceNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceNotificationError(error.message);
    return result;
  }

  async updateVoiceNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceNotificationError(error.message);
    return result;
  }

  async deleteVoiceNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceNotificationError(error.message);
  }

  async getInAppNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('in_app_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInAppNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('in_app_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInAppNotificationError(error.message);
    return data ?? [];
  }

  async createInAppNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('in_app_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInAppNotificationError(error.message);
    return result;
  }

  async updateInAppNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('in_app_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInAppNotificationError(error.message);
    return result;
  }

  async deleteInAppNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('in_app_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInAppNotificationError(error.message);
  }

  async getWebhookNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('webhook_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWebhookNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('webhook_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWebhookNotificationError(error.message);
    return data ?? [];
  }

  async createWebhookNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('webhook_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWebhookNotificationError(error.message);
    return result;
  }

  async updateWebhookNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('webhook_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWebhookNotificationError(error.message);
    return result;
  }

  async deleteWebhookNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('webhook_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWebhookNotificationError(error.message);
  }

  async getNotificationAttachment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_attachments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationAttachment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_attachments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationAttachmentError(error.message);
    return data ?? [];
  }

  async createNotificationAttachment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_attachments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationAttachmentError(error.message);
    return result;
  }

  async updateNotificationAttachment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_attachments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationAttachmentError(error.message);
    return result;
  }

  async deleteNotificationAttachment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_attachments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationAttachmentError(error.message);
  }

  async getPushRichMedia(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('push_rich_medias')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPushRichMedia(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('push_rich_medias').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPushRichMediaError(error.message);
    return data ?? [];
  }

  async createPushRichMedia(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('push_rich_medias')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPushRichMediaError(error.message);
    return result;
  }

  async updatePushRichMedia(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('push_rich_medias')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPushRichMediaError(error.message);
    return result;
  }

  async deletePushRichMedia(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('push_rich_medias')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPushRichMediaError(error.message);
  }

  async getWhatsAppButton(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('whats_app_buttoa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatsAppButton(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('whats_app_buttoa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatsAppButtonError(error.message);
    return data ?? [];
  }

  async createWhatsAppButton(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('whats_app_buttoa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatsAppButtonError(error.message);
    return result;
  }

  async updateWhatsAppButton(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('whats_app_buttoa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatsAppButtonError(error.message);
    return result;
  }

  async deleteWhatsAppButton(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('whats_app_buttoa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatsAppButtonError(error.message);
  }

  async getWhatsAppInteractive(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('whats_app_interactives')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatsAppInteractive(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('whats_app_interactives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatsAppInteractiveError(error.message);
    return data ?? [];
  }

  async createWhatsAppInteractive(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('whats_app_interactives')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatsAppInteractiveError(error.message);
    return result;
  }

  async updateWhatsAppInteractive(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('whats_app_interactives')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatsAppInteractiveError(error.message);
    return result;
  }

  async deleteWhatsAppInteractive(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('whats_app_interactives')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatsAppInteractiveError(error.message);
  }

  async getTeamsAction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teams_actioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeamsAction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teams_actioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeamsActionError(error.message);
    return data ?? [];
  }

  async createTeamsAction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teams_actioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeamsActionError(error.message);
    return result;
  }

  async updateTeamsAction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teams_actioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeamsActionError(error.message);
    return result;
  }

  async deleteTeamsAction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teams_actioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeamsActionError(error.message);
  }

  async getTeamsSection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teams_sectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeamsSection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teams_sectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeamsSectionError(error.message);
    return data ?? [];
  }

  async createTeamsSection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teams_sectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeamsSectionError(error.message);
    return result;
  }

  async updateTeamsSection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teams_sectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeamsSectionError(error.message);
    return result;
  }

  async deleteTeamsSection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teams_sectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeamsSectionError(error.message);
  }

  async getSlackField(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('slack_fields')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSlackField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('slack_fields').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSlackFieldError(error.message);
    return data ?? [];
  }

  async createSlackField(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('slack_fields')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSlackFieldError(error.message);
    return result;
  }

  async updateSlackField(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('slack_fields')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSlackFieldError(error.message);
    return result;
  }

  async deleteSlackField(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('slack_fields')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSlackFieldError(error.message);
  }

  async getNotificationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationError(error.message);
    return data ?? [];
  }

  async createNotificationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationError(error.message);
    return result;
  }

  async updateNotificationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationError(error.message);
    return result;
  }

  async deleteNotificationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationError(error.message);
  }

  async getNotificationRateLimitConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_rate_limits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationRateLimitConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
    return data ?? [];
  }

  async createNotificationRateLimitConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_rate_limits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
    return result;
  }

  async updateNotificationRateLimitConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_rate_limits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
    return result;
  }

  async deleteNotificationRateLimitConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_rate_limits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
  }

  async getQuietHoursConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('quiet_hourses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listQuietHoursConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('quiet_hourses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudQuietHoursError(error.message);
    return data ?? [];
  }

  async createQuietHoursConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('quiet_hourses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudQuietHoursError(error.message);
    return result;
  }

  async updateQuietHoursConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('quiet_hourses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudQuietHoursError(error.message);
    return result;
  }

  async deleteQuietHoursConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('quiet_hourses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudQuietHoursError(error.message);
  }

  async getRetryPolicyConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('retry_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRetryPolicyConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('retry_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRetryPolicyError(error.message);
    return data ?? [];
  }

  async createRetryPolicyConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('retry_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRetryPolicyError(error.message);
    return result;
  }

  async updateRetryPolicyConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('retry_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRetryPolicyError(error.message);
    return result;
  }

  async deleteRetryPolicyConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('retry_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRetryPolicyError(error.message);
  }

  async getNotificationTemplate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationTemplateError(error.message);
    return data ?? [];
  }

  async createNotificationTemplate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationTemplateError(error.message);
    return result;
  }

  async updateNotificationTemplate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationTemplateError(error.message);
    return result;
  }

  async deleteNotificationTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationTemplateError(error.message);
  }

  async getNotificationTemplateVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_template_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationTemplateVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_template_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationTemplateVersionError(error.message);
    return data ?? [];
  }

  async createNotificationTemplateVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_template_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationTemplateVersionError(error.message);
    return result;
  }

  async updateNotificationTemplateVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_template_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationTemplateVersionError(error.message);
    return result;
  }

  async deleteNotificationTemplateVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_template_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationTemplateVersionError(error.message);
  }

  async getNotificationBatch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_batches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationBatch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_batches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationBatchError(error.message);
    return data ?? [];
  }

  async createNotificationBatch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_batches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationBatchError(error.message);
    return result;
  }

  async updateNotificationBatch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_batches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationBatchError(error.message);
    return result;
  }

  async deleteNotificationBatch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_batches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationBatchError(error.message);
  }

  async getBatchConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('batches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBatchConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('batches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBatchError(error.message);
    return data ?? [];
  }

  async createBatchConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('batches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBatchError(error.message);
    return result;
  }

  async updateBatchConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('batches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBatchError(error.message);
    return result;
  }

  async deleteBatchConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('batches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBatchError(error.message);
  }

  async getNotificationJob(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationJobError(error.message);
    return data ?? [];
  }

  async createNotificationJob(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationJobError(error.message);
    return result;
  }

  async updateNotificationJob(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationJobError(error.message);
    return result;
  }

  async deleteNotificationJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationJobError(error.message);
  }

  async getNotificationSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationScheduleError(error.message);
    return data ?? [];
  }

  async createNotificationSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationScheduleError(error.message);
    return result;
  }

  async updateNotificationSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationScheduleError(error.message);
    return result;
  }

  async deleteNotificationSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationScheduleError(error.message);
  }

  async getNotificationDelivery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_deliverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationDelivery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_deliverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationDeliveryError(error.message);
    return data ?? [];
  }

  async createNotificationDelivery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_deliverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationDeliveryError(error.message);
    return result;
  }

  async updateNotificationDelivery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_deliverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationDeliveryError(error.message);
    return result;
  }

  async deleteNotificationDelivery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_deliverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationDeliveryError(error.message);
  }

  async getNotificationBounce(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_bounces')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationBounce(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_bounces').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationBounceError(error.message);
    return data ?? [];
  }

  async createNotificationBounce(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_bounces')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationBounceError(error.message);
    return result;
  }

  async updateNotificationBounce(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_bounces')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationBounceError(error.message);
    return result;
  }

  async deleteNotificationBounce(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_bounces')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationBounceError(error.message);
  }

  async getNotificationClick(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_clicks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationClick(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_clicks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationClickError(error.message);
    return data ?? [];
  }

  async createNotificationClick(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_clicks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationClickError(error.message);
    return result;
  }

  async updateNotificationClick(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_clicks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationClickError(error.message);
    return result;
  }

  async deleteNotificationClick(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_clicks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationClickError(error.message);
  }

  async getNotificationOpen(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_opens')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationOpen(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_opens').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationOpenError(error.message);
    return data ?? [];
  }

  async createNotificationOpen(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_opens')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationOpenError(error.message);
    return result;
  }

  async updateNotificationOpen(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_opens')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationOpenError(error.message);
    return result;
  }

  async deleteNotificationOpen(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_opens')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationOpenError(error.message);
  }

  async getNotificationConversion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_conversioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationConversion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_conversioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationConversionError(error.message);
    return data ?? [];
  }

  async createNotificationConversion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_conversioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationConversionError(error.message);
    return result;
  }

  async updateNotificationConversion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_conversioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationConversionError(error.message);
    return result;
  }

  async deleteNotificationConversion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_conversioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationConversionError(error.message);
  }

  async getNotificationUnsubscribe(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_unsubscribes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationUnsubscribe(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_unsubscribes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationUnsubscribeError(error.message);
    return data ?? [];
  }

  async createNotificationUnsubscribe(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_unsubscribes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationUnsubscribeError(error.message);
    return result;
  }

  async updateNotificationUnsubscribe(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_unsubscribes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationUnsubscribeError(error.message);
    return result;
  }

  async deleteNotificationUnsubscribe(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_unsubscribes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationUnsubscribeError(error.message);
  }

  async getAudience(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audiences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAudience(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audiences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAudienceError(error.message);
    return data ?? [];
  }

  async createAudience(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audiences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAudienceError(error.message);
    return result;
  }

  async updateAudience(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audiences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAudienceError(error.message);
    return result;
  }

  async deleteAudience(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audiences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAudienceError(error.message);
  }

  async getAudienceFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audience_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAudienceFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audience_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAudienceFilterError(error.message);
    return data ?? [];
  }

  async createAudienceFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audience_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAudienceFilterError(error.message);
    return result;
  }

  async updateAudienceFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audience_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAudienceFilterError(error.message);
    return result;
  }

  async deleteAudienceFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audience_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAudienceFilterError(error.message);
  }

  async getAudienceCondition(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audience_conditioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAudienceCondition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audience_conditioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAudienceConditionError(error.message);
    return data ?? [];
  }

  async createAudienceCondition(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audience_conditioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAudienceConditionError(error.message);
    return result;
  }

  async updateAudienceCondition(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audience_conditioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAudienceConditionError(error.message);
    return result;
  }

  async deleteAudienceCondition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audience_conditioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAudienceConditionError(error.message);
  }

  async getGeoTarget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_targets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_targets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoTargetError(error.message);
    return data ?? [];
  }

  async createGeoTarget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_targets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoTargetError(error.message);
    return result;
  }

  async updateGeoTarget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_targets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoTargetError(error.message);
    return result;
  }

  async deleteGeoTarget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_targets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoTargetError(error.message);
  }

  async getGeoCoordinate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_coordinates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoCoordinate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_coordinates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoCoordinateError(error.message);
    return data ?? [];
  }

  async createGeoCoordinate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_coordinates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoCoordinateError(error.message);
    return result;
  }

  async updateGeoCoordinate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_coordinates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoCoordinateError(error.message);
    return result;
  }

  async deleteGeoCoordinate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_coordinates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoCoordinateError(error.message);
  }

  async getGeoFence(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_fences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoFence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_fences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoFenceError(error.message);
    return data ?? [];
  }

  async createGeoFence(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_fences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoFenceError(error.message);
    return result;
  }

  async updateGeoFence(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_fences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoFenceError(error.message);
    return result;
  }

  async deleteGeoFence(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_fences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoFenceError(error.message);
  }

  async getGeoNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoNotificationError(error.message);
    return data ?? [];
  }

  async createGeoNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoNotificationError(error.message);
    return result;
  }

  async updateGeoNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoNotificationError(error.message);
    return result;
  }

  async deleteGeoNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoNotificationError(error.message);
  }

  async getEmergencyAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('emergency_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmergencyAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('emergency_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmergencyAlertError(error.message);
    return data ?? [];
  }

  async createEmergencyAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('emergency_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmergencyAlertError(error.message);
    return result;
  }

  async updateEmergencyAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('emergency_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmergencyAlertError(error.message);
    return result;
  }

  async deleteEmergencyAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('emergency_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmergencyAlertError(error.message);
  }

  async getEmergencyBroadcast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('emergency_broadcasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmergencyBroadcast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('emergency_broadcasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmergencyBroadcastError(error.message);
    return data ?? [];
  }

  async createEmergencyBroadcast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('emergency_broadcasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmergencyBroadcastError(error.message);
    return result;
  }

  async updateEmergencyBroadcast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('emergency_broadcasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmergencyBroadcastError(error.message);
    return result;
  }

  async deleteEmergencyBroadcast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('emergency_broadcasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmergencyBroadcastError(error.message);
  }

  async getEmergencyAck(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('emergency_acks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmergencyAck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('emergency_acks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmergencyAckError(error.message);
    return data ?? [];
  }

  async createEmergencyAck(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('emergency_acks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmergencyAckError(error.message);
    return result;
  }

  async updateEmergencyAck(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('emergency_acks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmergencyAckError(error.message);
    return result;
  }

  async deleteEmergencyAck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('emergency_acks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmergencyAckError(error.message);
  }

  async getNotificationPreference(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_preferences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationPreference(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_preferences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationPreferenceError(error.message);
    return data ?? [];
  }

  async createNotificationPreference(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_preferences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationPreferenceError(error.message);
    return result;
  }

  async updateNotificationPreference(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_preferences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationPreferenceError(error.message);
    return result;
  }

  async deleteNotificationPreference(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_preferences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationPreferenceError(error.message);
  }

  async getChannelPreferenceConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('channel_preferences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listChannelPreferenceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('channel_preferences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudChannelPreferenceError(error.message);
    return data ?? [];
  }

  async createChannelPreferenceConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('channel_preferences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudChannelPreferenceError(error.message);
    return result;
  }

  async updateChannelPreferenceConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('channel_preferences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudChannelPreferenceError(error.message);
    return result;
  }

  async deleteChannelPreferenceConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('channel_preferences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudChannelPreferenceError(error.message);
  }

  async getNotificationSetting(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_settings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationSetting(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_settings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationSettingError(error.message);
    return data ?? [];
  }

  async createNotificationSetting(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_settings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationSettingError(error.message);
    return result;
  }

  async updateNotificationSetting(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_settings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationSettingError(error.message);
    return result;
  }

  async deleteNotificationSetting(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_settings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationSettingError(error.message);
  }

  async getNotificationDigest(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_digests')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationDigest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_digests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationDigestError(error.message);
    return data ?? [];
  }

  async createNotificationDigest(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_digests')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationDigestError(error.message);
    return result;
  }

  async updateNotificationDigest(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_digests')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationDigestError(error.message);
    return result;
  }

  async deleteNotificationDigest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_digests')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationDigestError(error.message);
  }

  async getNotificationInbox(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_inboxes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationInbox(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_inboxes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationInboxError(error.message);
    return data ?? [];
  }

  async createNotificationInbox(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_inboxes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationInboxError(error.message);
    return result;
  }

  async updateNotificationInbox(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_inboxes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationInboxError(error.message);
    return result;
  }

  async deleteNotificationInbox(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_inboxes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationInboxError(error.message);
  }

  async getNotificationRead(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_reads')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationRead(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_reads').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationReadError(error.message);
    return data ?? [];
  }

  async createNotificationRead(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_reads')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationReadError(error.message);
    return result;
  }

  async updateNotificationRead(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_reads')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationReadError(error.message);
    return result;
  }

  async deleteNotificationRead(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_reads')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationReadError(error.message);
  }

  async getNotificationArchive(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_archives')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationArchive(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_archives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationArchiveError(error.message);
    return data ?? [];
  }

  async createNotificationArchive(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_archives')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationArchiveError(error.message);
    return result;
  }

  async updateNotificationArchive(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_archives')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationArchiveError(error.message);
    return result;
  }

  async deleteNotificationArchive(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_archives')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationArchiveError(error.message);
  }

  async getABTest(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('abtests')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listABTest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('abtests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudABTestError(error.message);
    return data ?? [];
  }

  async createABTest(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('abtests')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudABTestError(error.message);
    return result;
  }

  async updateABTest(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('abtests')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudABTestError(error.message);
    return result;
  }

  async deleteABTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('abtests')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudABTestError(error.message);
  }

  async getABTestResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('abtest_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listABTestResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('abtest_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudABTestResultError(error.message);
    return data ?? [];
  }

  async createABTestResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('abtest_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudABTestResultError(error.message);
    return result;
  }

  async updateABTestResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('abtest_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudABTestResultError(error.message);
    return result;
  }

  async deleteABTestResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('abtest_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudABTestResultError(error.message);
  }

  async getABTestMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('abtest_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listABTestMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('abtest_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudABTestMetricError(error.message);
    return data ?? [];
  }

  async createABTestMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('abtest_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudABTestMetricError(error.message);
    return result;
  }

  async updateABTestMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('abtest_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudABTestMetricError(error.message);
    return result;
  }

  async deleteABTestMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('abtest_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudABTestMetricError(error.message);
  }

  async getNotificationAnalyticsData(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_analytics_datas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationAnalyticsData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_analytics_datas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationAnalyticsDataError(error.message);
    return data ?? [];
  }

  async createNotificationAnalyticsData(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_analytics_datas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationAnalyticsDataError(error.message);
    return result;
  }

  async updateNotificationAnalyticsData(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_analytics_datas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationAnalyticsDataError(error.message);
    return result;
  }

  async deleteNotificationAnalyticsData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_analytics_datas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationAnalyticsDataError(error.message);
  }

  async getNotificationReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationReportError(error.message);
    return data ?? [];
  }

  async createNotificationReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationReportError(error.message);
    return result;
  }

  async updateNotificationReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationReportError(error.message);
    return result;
  }

  async deleteNotificationReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationReportError(error.message);
  }

  async getNotificationInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationInsightError(error.message);
    return data ?? [];
  }

  async createNotificationInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationInsightError(error.message);
    return result;
  }

  async updateNotificationInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationInsightError(error.message);
    return result;
  }

  async deleteNotificationInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationInsightError(error.message);
  }

  async getNotificationAI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationAIError(error.message);
    return data ?? [];
  }

  async createNotificationAI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationAIError(error.message);
    return result;
  }

  async updateNotificationAI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationAIError(error.message);
    return result;
  }

  async deleteNotificationAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationAIError(error.message);
  }

  async getNotificationAIModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_aimodels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_aimodels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationAIModelError(error.message);
    return data ?? [];
  }

  async createNotificationAIModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_aimodels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationAIModelError(error.message);
    return result;
  }

  async updateNotificationAIModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_aimodels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationAIModelError(error.message);
    return result;
  }

  async deleteNotificationAIModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_aimodels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationAIModelError(error.message);
  }

  async getNotificationAIRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_airecommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationAIRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_airecommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationAIRecommendationError(error.message);
    return data ?? [];
  }

  async createNotificationAIRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_airecommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationAIRecommendationError(error.message);
    return result;
  }

  async updateNotificationAIRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_airecommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationAIRecommendationError(error.message);
    return result;
  }

  async deleteNotificationAIRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_airecommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationAIRecommendationError(error.message);
  }

  async getNotificationEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationEventError(error.message);
    return data ?? [];
  }

  async createNotificationEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationEventError(error.message);
    return result;
  }

  async updateNotificationEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationEventError(error.message);
    return result;
  }

  async deleteNotificationEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationEventError(error.message);
  }

  async getNotificationEventLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_event_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationEventLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_event_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationEventLogError(error.message);
    return data ?? [];
  }

  async createNotificationEventLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_event_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationEventLogError(error.message);
    return result;
  }

  async updateNotificationEventLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_event_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationEventLogError(error.message);
    return result;
  }

  async deleteNotificationEventLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_event_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationEventLogError(error.message);
  }

  async getNotificationWebhook(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationWebhookError(error.message);
    return data ?? [];
  }

  async createNotificationWebhook(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_webhooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationWebhookError(error.message);
    return result;
  }

  async updateNotificationWebhook(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_webhooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationWebhookError(error.message);
    return result;
  }

  async deleteNotificationWebhook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationWebhookError(error.message);
  }

  async getNotificationWebhookConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationWebhookConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationWebhookError(error.message);
    return data ?? [];
  }

  async createNotificationWebhookConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_webhooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationWebhookError(error.message);
    return result;
  }

  async updateNotificationWebhookConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_webhooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationWebhookError(error.message);
    return result;
  }

  async deleteNotificationWebhookConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationWebhookError(error.message);
  }

  async getNotificationWebhookDelivery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_webhook_deliverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationWebhookDelivery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_webhook_deliverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationWebhookDeliveryError(error.message);
    return data ?? [];
  }

  async createNotificationWebhookDelivery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_webhook_deliverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationWebhookDeliveryError(error.message);
    return result;
  }

  async updateNotificationWebhookDelivery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_webhook_deliverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationWebhookDeliveryError(error.message);
    return result;
  }

  async deleteNotificationWebhookDelivery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_webhook_deliverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationWebhookDeliveryError(error.message);
  }

  async getNotificationRateLimit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_rate_limits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationRateLimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
    return data ?? [];
  }

  async createNotificationRateLimit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_rate_limits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
    return result;
  }

  async updateNotificationRateLimit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_rate_limits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
    return result;
  }

  async deleteNotificationRateLimit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_rate_limits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationRateLimitError(error.message);
  }

  async getNotificationThrottle(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_throttles')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationThrottle(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_throttles').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationThrottleError(error.message);
    return data ?? [];
  }

  async createNotificationThrottle(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_throttles')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationThrottleError(error.message);
    return result;
  }

  async updateNotificationThrottle(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_throttles')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationThrottleError(error.message);
    return result;
  }

  async deleteNotificationThrottle(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_throttles')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationThrottleError(error.message);
  }

  async getNotificationQueue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_queues')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationQueue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_queues').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationQueueError(error.message);
    return data ?? [];
  }

  async createNotificationQueue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_queues')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationQueueError(error.message);
    return result;
  }

  async updateNotificationQueue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_queues')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationQueueError(error.message);
    return result;
  }

  async deleteNotificationQueue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_queues')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationQueueError(error.message);
  }

  async getNotificationAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationAuditError(error.message);
    return data ?? [];
  }

  async createNotificationAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationAuditError(error.message);
    return result;
  }

  async updateNotificationAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationAuditError(error.message);
    return result;
  }

  async deleteNotificationAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationAuditError(error.message);
  }

  async getNotificationCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationComplianceError(error.message);
    return data ?? [];
  }

  async createNotificationCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationComplianceError(error.message);
    return result;
  }

  async updateNotificationCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationComplianceError(error.message);
    return result;
  }

  async deleteNotificationCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationComplianceError(error.message);
  }

  async getNotificationGDPR(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_gdprs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationGDPR(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_gdprs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationGDPRError(error.message);
    return data ?? [];
  }

  async createNotificationGDPR(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_gdprs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationGDPRError(error.message);
    return result;
  }

  async updateNotificationGDPR(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_gdprs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationGDPRError(error.message);
    return result;
  }

  async deleteNotificationGDPR(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_gdprs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationGDPRError(error.message);
  }

  async getNotificationExport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_exports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationExportError(error.message);
    return data ?? [];
  }

  async createNotificationExport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationExportError(error.message);
    return result;
  }

  async updateNotificationExport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_exports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationExportError(error.message);
    return result;
  }

  async deleteNotificationExport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationExportError(error.message);
  }

  async getNotificationImport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_imports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationImport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_imports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationImportError(error.message);
    return data ?? [];
  }

  async createNotificationImport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_imports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationImportError(error.message);
    return result;
  }

  async updateNotificationImport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_imports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationImportError(error.message);
    return result;
  }

  async deleteNotificationImport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_imports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationImportError(error.message);
  }

  async getImportError(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('import_errors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImportError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('import_errors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImportErrorError(error.message);
    return data ?? [];
  }

  async createImportError(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('import_errors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImportErrorError(error.message);
    return result;
  }

  async updateImportError(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('import_errors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImportErrorError(error.message);
    return result;
  }

  async deleteImportError(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('import_errors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImportErrorError(error.message);
  }

  async getNotificationSync(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_syncs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_syncs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationSyncError(error.message);
    return data ?? [];
  }

  async createNotificationSync(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_syncs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationSyncError(error.message);
    return result;
  }

  async updateNotificationSync(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_syncs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationSyncError(error.message);
    return result;
  }

  async deleteNotificationSync(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_syncs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationSyncError(error.message);
  }

  async getNotificationDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationDashboardError(error.message);
    return data ?? [];
  }

  async createNotificationDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationDashboardError(error.message);
    return result;
  }

  async updateNotificationDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationDashboardError(error.message);
    return result;
  }

  async deleteNotificationDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationDashboardError(error.message);
  }

  async getNotificationWidget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationWidgetError(error.message);
    return data ?? [];
  }

  async createNotificationWidget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationWidgetError(error.message);
    return result;
  }

  async updateNotificationWidget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationWidgetError(error.message);
    return result;
  }

  async deleteNotificationWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationWidgetError(error.message);
  }

  async getNotificationFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationFilterError(error.message);
    return data ?? [];
  }

  async createNotificationFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationFilterError(error.message);
    return result;
  }

  async updateNotificationFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationFilterError(error.message);
    return result;
  }

  async deleteNotificationFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationFilterError(error.message);
  }

  async getNotificationVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationVersionError(error.message);
    return data ?? [];
  }

  async createNotificationVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationVersionError(error.message);
    return result;
  }

  async updateNotificationVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationVersionError(error.message);
    return result;
  }

  async deleteNotificationVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationVersionError(error.message);
  }

  async getNotificationMigration(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_migratioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationMigration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_migratioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationMigrationError(error.message);
    return data ?? [];
  }

  async createNotificationMigration(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_migratioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationMigrationError(error.message);
    return result;
  }

  async updateNotificationMigration(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_migratioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationMigrationError(error.message);
    return result;
  }

  async deleteNotificationMigration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_migratioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationMigrationError(error.message);
  }

  async getNotificationChangelog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_changelogs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationChangelog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_changelogs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationChangelogError(error.message);
    return data ?? [];
  }

  async createNotificationChangelog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_changelogs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationChangelogError(error.message);
    return result;
  }

  async updateNotificationChangelog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_changelogs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationChangelogError(error.message);
    return result;
  }

  async deleteNotificationChangelog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_changelogs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationChangelogError(error.message);
  }

  async getChangelogEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('changelogs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listChangelogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('changelogs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudChangelogError(error.message);
    return data ?? [];
  }

  async createChangelogEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('changelogs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudChangelogError(error.message);
    return result;
  }

  async updateChangelogEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('changelogs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudChangelogError(error.message);
    return result;
  }

  async deleteChangelogEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('changelogs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudChangelogError(error.message);
  }

  async getNotificationHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationHealthError(error.message);
    return data ?? [];
  }

  async createNotificationHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationHealthError(error.message);
    return result;
  }

  async updateNotificationHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationHealthError(error.message);
    return result;
  }

  async deleteNotificationHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationHealthError(error.message);
  }

  async getChannelHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('channel_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listChannelHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('channel_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudChannelHealthError(error.message);
    return data ?? [];
  }

  async createChannelHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('channel_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudChannelHealthError(error.message);
    return result;
  }

  async updateChannelHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('channel_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudChannelHealthError(error.message);
    return result;
  }

  async deleteChannelHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('channel_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudChannelHealthError(error.message);
  }

  async getNotificationMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationMetricError(error.message);
    return data ?? [];
  }

  async createNotificationMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationMetricError(error.message);
    return result;
  }

  async updateNotificationMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationMetricError(error.message);
    return result;
  }

  async deleteNotificationMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationMetricError(error.message);
  }

  async getNotificationSystemAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('notification_system_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNotificationSystemAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('notification_system_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNotificationSystemAlertError(error.message);
    return data ?? [];
  }

  async createNotificationSystemAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('notification_system_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNotificationSystemAlertError(error.message);
    return result;
  }

  async updateNotificationSystemAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('notification_system_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNotificationSystemAlertError(error.message);
    return result;
  }

  async deleteNotificationSystemAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notification_system_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNotificationSystemAlertError(error.message);
  }

}

export function createObserveModuleRepository(supabase: SupabaseClient): ObserveModuleRepository {
  return new ObserveModuleRepositoryImpl(supabase);
}

