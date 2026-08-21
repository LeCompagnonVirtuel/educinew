import { AppError } from './AppError';

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 2.10 — Enterprise Ecosystem Finalization Errors
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Domain 1: Global Administration (72 errors) ─────────────────────────────

// GlobalAdministration
export class EntGlobalAdministrationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Administration globale (${identifier}) introuvable` : 'Administration globale introuvable';
    super(msg, 'ENT_GLOBAL_ADMINISTRATION_NOT_FOUND', 404);
  }
}

export class EntGlobalAdministrationCreateError extends AppError {
  constructor(message = "Impossible de créer l'administration globale") {
    super(message, 'ENT_GLOBAL_ADMINISTRATION_CREATE_ERROR', 500);
  }
}

export class EntGlobalAdministrationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'administration globale") {
    super(message, 'ENT_GLOBAL_ADMINISTRATION_UPDATE_ERROR', 500);
  }
}

export class EntGlobalAdministrationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'administration globale") {
    super(message, 'ENT_GLOBAL_ADMINISTRATION_DELETE_ERROR', 500);
  }
}

// PlatformSetting
export class EntPlatformSettingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Paramètre (${identifier}) introuvable` : 'Paramètre introuvable';
    super(msg, 'ENT_PLATFORM_SETTING_NOT_FOUND', 404);
  }
}

export class EntPlatformSettingCreateError extends AppError {
  constructor(message = 'Impossible de créer le paramètre') {
    super(message, 'ENT_PLATFORM_SETTING_CREATE_ERROR', 500);
  }
}

export class EntPlatformSettingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le paramètre') {
    super(message, 'ENT_PLATFORM_SETTING_UPDATE_ERROR', 500);
  }
}

export class EntPlatformSettingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le paramètre') {
    super(message, 'ENT_PLATFORM_SETTING_DELETE_ERROR', 500);
  }
}

// EnvironmentConfig
export class EntEnvironmentConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration d'environnement (${identifier}) introuvable` : "Configuration d'environnement introuvable";
    super(msg, 'ENT_ENVIRONMENT_CONFIG_NOT_FOUND', 404);
  }
}

export class EntEnvironmentConfigCreateError extends AppError {
  constructor(message = "Impossible de créer la configuration d'environnement") {
    super(message, 'ENT_ENVIRONMENT_CONFIG_CREATE_ERROR', 500);
  }
}

export class EntEnvironmentConfigUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour la configuration d'environnement") {
    super(message, 'ENT_ENVIRONMENT_CONFIG_UPDATE_ERROR', 500);
  }
}

export class EntEnvironmentConfigDeleteError extends AppError {
  constructor(message = "Impossible de supprimer la configuration d'environnement") {
    super(message, 'ENT_ENVIRONMENT_CONFIG_DELETE_ERROR', 500);
  }
}

// FeatureFlag
export class EntFeatureFlagNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fonctionnalité (${identifier}) introuvable` : 'Fonctionnalité introuvable';
    super(msg, 'ENT_FEATURE_FLAG_NOT_FOUND', 404);
  }
}

export class EntFeatureFlagCreateError extends AppError {
  constructor(message = 'Impossible de créer la fonctionnalité') {
    super(message, 'ENT_FEATURE_FLAG_CREATE_ERROR', 500);
  }
}

export class EntFeatureFlagUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la fonctionnalité') {
    super(message, 'ENT_FEATURE_FLAG_UPDATE_ERROR', 500);
  }
}

export class EntFeatureFlagDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la fonctionnalité') {
    super(message, 'ENT_FEATURE_FLAG_DELETE_ERROR', 500);
  }
}

// ModuleRegistry
export class EntModuleRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Module (${identifier}) introuvable` : 'Module introuvable';
    super(msg, 'ENT_MODULE_REGISTRY_NOT_FOUND', 404);
  }
}

export class EntModuleRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer le module') {
    super(message, 'ENT_MODULE_REGISTRY_CREATE_ERROR', 500);
  }
}

export class EntModuleRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le module') {
    super(message, 'ENT_MODULE_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class EntModuleRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le module') {
    super(message, 'ENT_MODULE_REGISTRY_DELETE_ERROR', 500);
  }
}

// VersionRegistry
export class EntVersionRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Version (${identifier}) introuvable` : 'Version introuvable';
    super(msg, 'ENT_VERSION_REGISTRY_NOT_FOUND', 404);
  }
}

export class EntVersionRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer la version') {
    super(message, 'ENT_VERSION_REGISTRY_CREATE_ERROR', 500);
  }
}

export class EntVersionRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la version') {
    super(message, 'ENT_VERSION_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class EntVersionRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la version') {
    super(message, 'ENT_VERSION_REGISTRY_DELETE_ERROR', 500);
  }
}

// TenantRegistry
export class EntTenantRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Registre de tenant (${identifier}) introuvable` : 'Registre de tenant introuvable';
    super(msg, 'ENT_TENANT_REGISTRY_NOT_FOUND', 404);
  }
}

export class EntTenantRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer le registre de tenant') {
    super(message, 'ENT_TENANT_REGISTRY_CREATE_ERROR', 500);
  }
}

export class EntTenantRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le registre de tenant') {
    super(message, 'ENT_TENANT_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class EntTenantRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le registre de tenant') {
    super(message, 'ENT_TENANT_REGISTRY_DELETE_ERROR', 500);
  }
}

// LicenseRegistry
export class EntLicenseRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Licence (${identifier}) introuvable` : 'Licence introuvable';
    super(msg, 'ENT_LICENSE_REGISTRY_NOT_FOUND', 404);
  }
}

export class EntLicenseRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer la licence') {
    super(message, 'ENT_LICENSE_REGISTRY_CREATE_ERROR', 500);
  }
}

export class EntLicenseRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la licence') {
    super(message, 'ENT_LICENSE_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class EntLicenseRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la licence') {
    super(message, 'ENT_LICENSE_REGISTRY_DELETE_ERROR', 500);
  }
}

// DeploymentRegistry
export class EntDeploymentRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déploiement (${identifier}) introuvable` : 'Déploiement introuvable';
    super(msg, 'ENT_DEPLOYMENT_REGISTRY_NOT_FOUND', 404);
  }
}

export class EntDeploymentRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer le déploiement') {
    super(message, 'ENT_DEPLOYMENT_REGISTRY_CREATE_ERROR', 500);
  }
}

export class EntDeploymentRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le déploiement') {
    super(message, 'ENT_DEPLOYMENT_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class EntDeploymentRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le déploiement') {
    super(message, 'ENT_DEPLOYMENT_REGISTRY_DELETE_ERROR', 500);
  }
}

// PlatformDashboard
export class EntPlatformDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord (${identifier}) introuvable` : 'Tableau de bord introuvable';
    super(msg, 'ENT_PLATFORM_DASHBOARD_NOT_FOUND', 404);
  }
}

export class EntPlatformDashboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau de bord') {
    super(message, 'ENT_PLATFORM_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class EntPlatformDashboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tableau de bord') {
    super(message, 'ENT_PLATFORM_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class EntPlatformDashboardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tableau de bord') {
    super(message, 'ENT_PLATFORM_DASHBOARD_DELETE_ERROR', 500);
  }
}

// PlatformMetric
export class EntPlatformMetricNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Métrique (${identifier}) introuvable` : 'Métrique introuvable';
    super(msg, 'ENT_PLATFORM_METRIC_NOT_FOUND', 404);
  }
}

export class EntPlatformMetricCreateError extends AppError {
  constructor(message = 'Impossible de créer la métrique') {
    super(message, 'ENT_PLATFORM_METRIC_CREATE_ERROR', 500);
  }
}

export class EntPlatformMetricUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la métrique') {
    super(message, 'ENT_PLATFORM_METRIC_UPDATE_ERROR', 500);
  }
}

export class EntPlatformMetricDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la métrique') {
    super(message, 'ENT_PLATFORM_METRIC_DELETE_ERROR', 500);
  }
}

// PlatformAlert
export class EntPlatformAlertNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Alerte (${identifier}) introuvable` : 'Alerte introuvable';
    super(msg, 'ENT_PLATFORM_ALERT_NOT_FOUND', 404);
  }
}

export class EntPlatformAlertCreateError extends AppError {
  constructor(message = "Impossible de créer l'alerte") {
    super(message, 'ENT_PLATFORM_ALERT_CREATE_ERROR', 500);
  }
}

export class EntPlatformAlertUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'alerte") {
    super(message, 'ENT_PLATFORM_ALERT_UPDATE_ERROR', 500);
  }
}

export class EntPlatformAlertDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'alerte") {
    super(message, 'ENT_PLATFORM_ALERT_DELETE_ERROR', 500);
  }
}

// PlatformAudit
export class EntPlatformAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit (${identifier}) introuvable` : 'Audit introuvable';
    super(msg, 'ENT_PLATFORM_AUDIT_NOT_FOUND', 404);
  }
}

export class EntPlatformAuditCreateError extends AppError {
  constructor(message = "Impossible de créer l'audit") {
    super(message, 'ENT_PLATFORM_AUDIT_CREATE_ERROR', 500);
  }
}

export class EntPlatformAuditUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'audit") {
    super(message, 'ENT_PLATFORM_AUDIT_UPDATE_ERROR', 500);
  }
}

export class EntPlatformAuditDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'audit") {
    super(message, 'ENT_PLATFORM_AUDIT_DELETE_ERROR', 500);
  }
}

// PlatformBackup
export class EntPlatformBackupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Sauvegarde (${identifier}) introuvable` : 'Sauvegarde introuvable';
    super(msg, 'ENT_PLATFORM_BACKUP_NOT_FOUND', 404);
  }
}

export class EntPlatformBackupCreateError extends AppError {
  constructor(message = 'Impossible de créer la sauvegarde') {
    super(message, 'ENT_PLATFORM_BACKUP_CREATE_ERROR', 500);
  }
}

export class EntPlatformBackupUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la sauvegarde') {
    super(message, 'ENT_PLATFORM_BACKUP_UPDATE_ERROR', 500);
  }
}

export class EntPlatformBackupDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la sauvegarde') {
    super(message, 'ENT_PLATFORM_BACKUP_DELETE_ERROR', 500);
  }
}

// PlatformEvent
export class EntPlatformEventNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Événement (${identifier}) introuvable` : 'Événement introuvable';
    super(msg, 'ENT_PLATFORM_EVENT_NOT_FOUND', 404);
  }
}

export class EntPlatformEventCreateError extends AppError {
  constructor(message = "Impossible de créer l'événement") {
    super(message, 'ENT_PLATFORM_EVENT_CREATE_ERROR', 500);
  }
}

export class EntPlatformEventUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'événement") {
    super(message, 'ENT_PLATFORM_EVENT_UPDATE_ERROR', 500);
  }
}

export class EntPlatformEventDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'événement") {
    super(message, 'ENT_PLATFORM_EVENT_DELETE_ERROR', 500);
  }
}

// PlatformConfig
export class EntPlatformConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration (${identifier}) introuvable` : 'Configuration introuvable';
    super(msg, 'ENT_PLATFORM_CONFIG_NOT_FOUND', 404);
  }
}

export class EntPlatformConfigCreateError extends AppError {
  constructor(message = 'Impossible de créer la configuration') {
    super(message, 'ENT_PLATFORM_CONFIG_CREATE_ERROR', 500);
  }
}

export class EntPlatformConfigUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la configuration') {
    super(message, 'ENT_PLATFORM_CONFIG_UPDATE_ERROR', 500);
  }
}

export class EntPlatformConfigDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la configuration') {
    super(message, 'ENT_PLATFORM_CONFIG_DELETE_ERROR', 500);
  }
}

// PlatformWebhook
export class EntPlatformWebhookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Webhook (${identifier}) introuvable` : 'Webhook introuvable';
    super(msg, 'ENT_PLATFORM_WEBHOOK_NOT_FOUND', 404);
  }
}

export class EntPlatformWebhookCreateError extends AppError {
  constructor(message = 'Impossible de créer le webhook') {
    super(message, 'ENT_PLATFORM_WEBHOOK_CREATE_ERROR', 500);
  }
}

export class EntPlatformWebhookUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le webhook') {
    super(message, 'ENT_PLATFORM_WEBHOOK_UPDATE_ERROR', 500);
  }
}

export class EntPlatformWebhookDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le webhook') {
    super(message, 'ENT_PLATFORM_WEBHOOK_DELETE_ERROR', 500);
  }
}

// PlatformApiKey
export class EntPlatformApiKeyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Clé API (${identifier}) introuvable` : 'Clé API introuvable';
    super(msg, 'ENT_PLATFORM_API_KEY_NOT_FOUND', 404);
  }
}

export class EntPlatformApiKeyCreateError extends AppError {
  constructor(message = 'Impossible de créer la clé API') {
    super(message, 'ENT_PLATFORM_API_KEY_CREATE_ERROR', 500);
  }
}

export class EntPlatformApiKeyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la clé API') {
    super(message, 'ENT_PLATFORM_API_KEY_UPDATE_ERROR', 500);
  }
}

export class EntPlatformApiKeyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la clé API') {
    super(message, 'ENT_PLATFORM_API_KEY_DELETE_ERROR', 500);
  }
}
// ─── Domain 2: Tenant Management (64 errors) ────────────────────────────────

// Tenant
export class EntTenantNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tenant (${identifier}) introuvable` : 'Tenant introuvable';
    super(msg, 'ENT_TENANT_NOT_FOUND', 404);
  }
}

export class EntTenantCreateError extends AppError {
  constructor(message = 'Impossible de créer le tenant') {
    super(message, 'ENT_TENANT_CREATE_ERROR', 500);
  }
}

export class EntTenantUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tenant') {
    super(message, 'ENT_TENANT_UPDATE_ERROR', 500);
  }
}

export class EntTenantDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tenant') {
    super(message, 'ENT_TENANT_DELETE_ERROR', 500);
  }
}

// TenantIsolation
export class EntTenantIsolationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Isolation (${identifier}) introuvable` : 'Isolation introuvable';
    super(msg, 'ENT_TENANT_ISOLATION_NOT_FOUND', 404);
  }
}

export class EntTenantIsolationCreateError extends AppError {
  constructor(message = "Impossible de créer l'isolation") {
    super(message, 'ENT_TENANT_ISOLATION_CREATE_ERROR', 500);
  }
}

export class EntTenantIsolationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'isolation") {
    super(message, 'ENT_TENANT_ISOLATION_UPDATE_ERROR', 500);
  }
}

export class EntTenantIsolationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'isolation") {
    super(message, 'ENT_TENANT_ISOLATION_DELETE_ERROR', 500);
  }
}

// TenantMigration
export class EntTenantMigrationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Migration (${identifier}) introuvable` : 'Migration introuvable';
    super(msg, 'ENT_TENANT_MIGRATION_NOT_FOUND', 404);
  }
}

export class EntTenantMigrationCreateError extends AppError {
  constructor(message = 'Impossible de créer la migration') {
    super(message, 'ENT_TENANT_MIGRATION_CREATE_ERROR', 500);
  }
}

export class EntTenantMigrationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la migration') {
    super(message, 'ENT_TENANT_MIGRATION_UPDATE_ERROR', 500);
  }
}

export class EntTenantMigrationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la migration') {
    super(message, 'ENT_TENANT_MIGRATION_DELETE_ERROR', 500);
  }
}

// TenantBackupConfig
export class EntTenantBackupConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration de sauvegarde (${identifier}) introuvable` : 'Configuration de sauvegarde introuvable';
    super(msg, 'ENT_TENANT_BACKUP_CONFIG_NOT_FOUND', 404);
  }
}

export class EntTenantBackupConfigCreateError extends AppError {
  constructor(message = 'Impossible de créer la configuration de sauvegarde') {
    super(message, 'ENT_TENANT_BACKUP_CONFIG_CREATE_ERROR', 500);
  }
}

export class EntTenantBackupConfigUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la configuration de sauvegarde') {
    super(message, 'ENT_TENANT_BACKUP_CONFIG_UPDATE_ERROR', 500);
  }
}

export class EntTenantBackupConfigDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la configuration de sauvegarde') {
    super(message, 'ENT_TENANT_BACKUP_CONFIG_DELETE_ERROR', 500);
  }
}

// TenantRestore
export class EntTenantRestoreNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Restauration (${identifier}) introuvable` : 'Restauration introuvable';
    super(msg, 'ENT_TENANT_RESTORE_NOT_FOUND', 404);
  }
}

export class EntTenantRestoreCreateError extends AppError {
  constructor(message = 'Impossible de créer la restauration') {
    super(message, 'ENT_TENANT_RESTORE_CREATE_ERROR', 500);
  }
}

export class EntTenantRestoreUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la restauration') {
    super(message, 'ENT_TENANT_RESTORE_UPDATE_ERROR', 500);
  }
}

export class EntTenantRestoreDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la restauration') {
    super(message, 'ENT_TENANT_RESTORE_DELETE_ERROR', 500);
  }
}

// TenantArchive
export class EntTenantArchiveNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Archivage (${identifier}) introuvable` : 'Archivage introuvable';
    super(msg, 'ENT_TENANT_ARCHIVE_NOT_FOUND', 404);
  }
}

export class EntTenantArchiveCreateError extends AppError {
  constructor(message = "Impossible de créer l'archivage") {
    super(message, 'ENT_TENANT_ARCHIVE_CREATE_ERROR', 500);
  }
}

export class EntTenantArchiveUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'archivage") {
    super(message, 'ENT_TENANT_ARCHIVE_UPDATE_ERROR', 500);
  }
}

export class EntTenantArchiveDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'archivage") {
    super(message, 'ENT_TENANT_ARCHIVE_DELETE_ERROR', 500);
  }
}

// TenantClone
export class EntTenantCloneNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Clonage (${identifier}) introuvable` : 'Clonage introuvable';
    super(msg, 'ENT_TENANT_CLONE_NOT_FOUND', 404);
  }
}

export class EntTenantCloneCreateError extends AppError {
  constructor(message = 'Impossible de créer le clonage') {
    super(message, 'ENT_TENANT_CLONE_CREATE_ERROR', 500);
  }
}

export class EntTenantCloneUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le clonage') {
    super(message, 'ENT_TENANT_CLONE_UPDATE_ERROR', 500);
  }
}

export class EntTenantCloneDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le clonage') {
    super(message, 'ENT_TENANT_CLONE_DELETE_ERROR', 500);
  }
}

// TenantMerge
export class EntTenantMergeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fusion (${identifier}) introuvable` : 'Fusion introuvable';
    super(msg, 'ENT_TENANT_MERGE_NOT_FOUND', 404);
  }
}

export class EntTenantMergeCreateError extends AppError {
  constructor(message = 'Impossible de créer la fusion') {
    super(message, 'ENT_TENANT_MERGE_CREATE_ERROR', 500);
  }
}

export class EntTenantMergeUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la fusion') {
    super(message, 'ENT_TENANT_MERGE_UPDATE_ERROR', 500);
  }
}

export class EntTenantMergeDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la fusion') {
    super(message, 'ENT_TENANT_MERGE_DELETE_ERROR', 500);
  }
}

// TenantSplit
export class EntTenantSplitNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Division (${identifier}) introuvable` : 'Division introuvable';
    super(msg, 'ENT_TENANT_SPLIT_NOT_FOUND', 404);
  }
}

export class EntTenantSplitCreateError extends AppError {
  constructor(message = 'Impossible de créer la division') {
    super(message, 'ENT_TENANT_SPLIT_CREATE_ERROR', 500);
  }
}

export class EntTenantSplitUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la division') {
    super(message, 'ENT_TENANT_SPLIT_UPDATE_ERROR', 500);
  }
}

export class EntTenantSplitDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la division') {
    super(message, 'ENT_TENANT_SPLIT_DELETE_ERROR', 500);
  }
}

// TenantMonitoring
export class EntTenantMonitoringNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Surveillance (${identifier}) introuvable` : 'Surveillance introuvable';
    super(msg, 'ENT_TENANT_MONITORING_NOT_FOUND', 404);
  }
}

export class EntTenantMonitoringCreateError extends AppError {
  constructor(message = 'Impossible de créer la surveillance') {
    super(message, 'ENT_TENANT_MONITORING_CREATE_ERROR', 500);
  }
}

export class EntTenantMonitoringUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la surveillance') {
    super(message, 'ENT_TENANT_MONITORING_UPDATE_ERROR', 500);
  }
}

export class EntTenantMonitoringDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la surveillance') {
    super(message, 'ENT_TENANT_MONITORING_DELETE_ERROR', 500);
  }
}

// TenantAnalytics
export class EntTenantAnalyticsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analytique (${identifier}) introuvable` : 'Analytique introuvable';
    super(msg, 'ENT_TENANT_ANALYTICS_NOT_FOUND', 404);
  }
}

export class EntTenantAnalyticsCreateError extends AppError {
  constructor(message = "Impossible de créer l'analytique") {
    super(message, 'ENT_TENANT_ANALYTICS_CREATE_ERROR', 500);
  }
}

export class EntTenantAnalyticsUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'analytique") {
    super(message, 'ENT_TENANT_ANALYTICS_UPDATE_ERROR', 500);
  }
}

export class EntTenantAnalyticsDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'analytique") {
    super(message, 'ENT_TENANT_ANALYTICS_DELETE_ERROR', 500);
  }
}

// TenantQuota
export class EntTenantQuotaNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Quota (${identifier}) introuvable` : 'Quota introuvable';
    super(msg, 'ENT_TENANT_QUOTA_NOT_FOUND', 404);
  }
}

export class EntTenantQuotaCreateError extends AppError {
  constructor(message = 'Impossible de créer le quota') {
    super(message, 'ENT_TENANT_QUOTA_CREATE_ERROR', 500);
  }
}

export class EntTenantQuotaUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le quota') {
    super(message, 'ENT_TENANT_QUOTA_UPDATE_ERROR', 500);
  }
}

export class EntTenantQuotaDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le quota') {
    super(message, 'ENT_TENANT_QUOTA_DELETE_ERROR', 500);
  }
}

// TenantBilling
export class EntTenantBillingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Facturation (${identifier}) introuvable` : 'Facturation introuvable';
    super(msg, 'ENT_TENANT_BILLING_NOT_FOUND', 404);
  }
}

export class EntTenantBillingCreateError extends AppError {
  constructor(message = 'Impossible de créer la facturation') {
    super(message, 'ENT_TENANT_BILLING_CREATE_ERROR', 500);
  }
}

export class EntTenantBillingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la facturation') {
    super(message, 'ENT_TENANT_BILLING_UPDATE_ERROR', 500);
  }
}

export class EntTenantBillingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la facturation') {
    super(message, 'ENT_TENANT_BILLING_DELETE_ERROR', 500);
  }
}

// TenantFeature
export class EntTenantFeatureNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fonctionnalité de tenant (${identifier}) introuvable` : 'Fonctionnalité de tenant introuvable';
    super(msg, 'ENT_TENANT_FEATURE_NOT_FOUND', 404);
  }
}

export class EntTenantFeatureCreateError extends AppError {
  constructor(message = 'Impossible de créer la fonctionnalité de tenant') {
    super(message, 'ENT_TENANT_FEATURE_CREATE_ERROR', 500);
  }
}

export class EntTenantFeatureUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la fonctionnalité de tenant') {
    super(message, 'ENT_TENANT_FEATURE_UPDATE_ERROR', 500);
  }
}

export class EntTenantFeatureDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la fonctionnalité de tenant') {
    super(message, 'ENT_TENANT_FEATURE_DELETE_ERROR', 500);
  }
}

// TenantSso
export class EntTenantSsoNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SSO (${identifier}) introuvable` : 'SSO introuvable';
    super(msg, 'ENT_TENANT_SSO_NOT_FOUND', 404);
  }
}

export class EntTenantSsoCreateError extends AppError {
  constructor(message = 'Impossible de créer le SSO') {
    super(message, 'ENT_TENANT_SSO_CREATE_ERROR', 500);
  }
}

export class EntTenantSsoUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le SSO') {
    super(message, 'ENT_TENANT_SSO_UPDATE_ERROR', 500);
  }
}

export class EntTenantSsoDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le SSO') {
    super(message, 'ENT_TENANT_SSO_DELETE_ERROR', 500);
  }
}

// TenantCustomDomain
export class EntTenantCustomDomainNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Domaine personnalisé (${identifier}) introuvable` : 'Domaine personnalisé introuvable';
    super(msg, 'ENT_TENANT_CUSTOM_DOMAIN_NOT_FOUND', 404);
  }
}

export class EntTenantCustomDomainCreateError extends AppError {
  constructor(message = 'Impossible de créer le domaine personnalisé') {
    super(message, 'ENT_TENANT_CUSTOM_DOMAIN_CREATE_ERROR', 500);
  }
}

export class EntTenantCustomDomainUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le domaine personnalisé') {
    super(message, 'ENT_TENANT_CUSTOM_DOMAIN_UPDATE_ERROR', 500);
  }
}

export class EntTenantCustomDomainDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le domaine personnalisé') {
    super(message, 'ENT_TENANT_CUSTOM_DOMAIN_DELETE_ERROR', 500);
  }
}

// ─── Domain 3: Deployment & Release Management (56 errors) ───────────────────

// ReleasePipeline
export class EntReleasePipelineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pipeline (${identifier}) introuvable` : 'Pipeline introuvable';
    super(msg, 'ENT_RELEASE_PIPELINE_NOT_FOUND', 404);
  }
}

export class EntReleasePipelineCreateError extends AppError {
  constructor(message = 'Impossible de créer le pipeline') {
    super(message, 'ENT_RELEASE_PIPELINE_CREATE_ERROR', 500);
  }
}

export class EntReleasePipelineUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le pipeline') {
    super(message, 'ENT_RELEASE_PIPELINE_UPDATE_ERROR', 500);
  }
}

export class EntReleasePipelineDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le pipeline') {
    super(message, 'ENT_RELEASE_PIPELINE_DELETE_ERROR', 500);
  }
}

// PipelineStage
export class EntPipelineStageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Étape (${identifier}) introuvable` : 'Étape introuvable';
    super(msg, 'ENT_PIPELINE_STAGE_NOT_FOUND', 404);
  }
}

export class EntPipelineStageCreateError extends AppError {
  constructor(message = "Impossible de créer l'étape") {
    super(message, 'ENT_PIPELINE_STAGE_CREATE_ERROR', 500);
  }
}

export class EntPipelineStageUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'étape") {
    super(message, 'ENT_PIPELINE_STAGE_UPDATE_ERROR', 500);
  }
}

export class EntPipelineStageDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'étape") {
    super(message, 'ENT_PIPELINE_STAGE_DELETE_ERROR', 500);
  }
}

// PipelineRun
export class EntPipelineRunNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exécution (${identifier}) introuvable` : 'Exécution introuvable';
    super(msg, 'ENT_PIPELINE_RUN_NOT_FOUND', 404);
  }
}

export class EntPipelineRunCreateError extends AppError {
  constructor(message = "Impossible de créer l'exécution") {
    super(message, 'ENT_PIPELINE_RUN_CREATE_ERROR', 500);
  }
}

export class EntPipelineRunUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'exécution") {
    super(message, 'ENT_PIPELINE_RUN_UPDATE_ERROR', 500);
  }
}

export class EntPipelineRunDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'exécution") {
    super(message, 'ENT_PIPELINE_RUN_DELETE_ERROR', 500);
  }
}

// VersionManager
export class EntVersionManagerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Gestionnaire de version (${identifier}) introuvable` : 'Gestionnaire de version introuvable';
    super(msg, 'ENT_VERSION_MANAGER_NOT_FOUND', 404);
  }
}

export class EntVersionManagerCreateError extends AppError {
  constructor(message = 'Impossible de créer le gestionnaire de version') {
    super(message, 'ENT_VERSION_MANAGER_CREATE_ERROR', 500);
  }
}

export class EntVersionManagerUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le gestionnaire de version') {
    super(message, 'ENT_VERSION_MANAGER_UPDATE_ERROR', 500);
  }
}

export class EntVersionManagerDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le gestionnaire de version') {
    super(message, 'ENT_VERSION_MANAGER_DELETE_ERROR', 500);
  }
}

// BlueGreenDeployment
export class EntBlueGreenDeploymentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déploiement bleu-vert (${identifier}) introuvable` : 'Déploiement bleu-vert introuvable';
    super(msg, 'ENT_BLUE_GREEN_DEPLOYMENT_NOT_FOUND', 404);
  }
}

export class EntBlueGreenDeploymentCreateError extends AppError {
  constructor(message = 'Impossible de créer le déploiement bleu-vert') {
    super(message, 'ENT_BLUE_GREEN_DEPLOYMENT_CREATE_ERROR', 500);
  }
}

export class EntBlueGreenDeploymentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le déploiement bleu-vert') {
    super(message, 'ENT_BLUE_GREEN_DEPLOYMENT_UPDATE_ERROR', 500);
  }
}

export class EntBlueGreenDeploymentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le déploiement bleu-vert') {
    super(message, 'ENT_BLUE_GREEN_DEPLOYMENT_DELETE_ERROR', 500);
  }
}

// CanaryDeployment
export class EntCanaryDeploymentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déploiement canari (${identifier}) introuvable` : 'Déploiement canari introuvable';
    super(msg, 'ENT_CANARY_DEPLOYMENT_NOT_FOUND', 404);
  }
}

export class EntCanaryDeploymentCreateError extends AppError {
  constructor(message = 'Impossible de créer le déploiement canari') {
    super(message, 'ENT_CANARY_DEPLOYMENT_CREATE_ERROR', 500);
  }
}

export class EntCanaryDeploymentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le déploiement canari') {
    super(message, 'ENT_CANARY_DEPLOYMENT_UPDATE_ERROR', 500);
  }
}

export class EntCanaryDeploymentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le déploiement canari') {
    super(message, 'ENT_CANARY_DEPLOYMENT_DELETE_ERROR', 500);
  }
}

// Rollback
export class EntRollbackNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Retour arrière (${identifier}) introuvable` : 'Retour arrière introuvable';
    super(msg, 'ENT_ROLLBACK_NOT_FOUND', 404);
  }
}

export class EntRollbackCreateError extends AppError {
  constructor(message = 'Impossible de créer le retour arrière') {
    super(message, 'ENT_ROLLBACK_CREATE_ERROR', 500);
  }
}

export class EntRollbackUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le retour arrière') {
    super(message, 'ENT_ROLLBACK_UPDATE_ERROR', 500);
  }
}

export class EntRollbackDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le retour arrière') {
    super(message, 'ENT_ROLLBACK_DELETE_ERROR', 500);
  }
}

// MigrationManager
export class EntMigrationManagerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Gestionnaire de migration (${identifier}) introuvable` : 'Gestionnaire de migration introuvable';
    super(msg, 'ENT_MIGRATION_MANAGER_NOT_FOUND', 404);
  }
}

export class EntMigrationManagerCreateError extends AppError {
  constructor(message = 'Impossible de créer le gestionnaire de migration') {
    super(message, 'ENT_MIGRATION_MANAGER_CREATE_ERROR', 500);
  }
}

export class EntMigrationManagerUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le gestionnaire de migration') {
    super(message, 'ENT_MIGRATION_MANAGER_UPDATE_ERROR', 500);
  }
}

export class EntMigrationManagerDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le gestionnaire de migration') {
    super(message, 'ENT_MIGRATION_MANAGER_DELETE_ERROR', 500);
  }
}

// EnvironmentPromotion
export class EntEnvironmentPromotionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Promotion (${identifier}) introuvable` : 'Promotion introuvable';
    super(msg, 'ENT_ENVIRONMENT_PROMOTION_NOT_FOUND', 404);
  }
}

export class EntEnvironmentPromotionCreateError extends AppError {
  constructor(message = 'Impossible de créer la promotion') {
    super(message, 'ENT_ENVIRONMENT_PROMOTION_CREATE_ERROR', 500);
  }
}

export class EntEnvironmentPromotionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la promotion') {
    super(message, 'ENT_ENVIRONMENT_PROMOTION_UPDATE_ERROR', 500);
  }
}

export class EntEnvironmentPromotionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la promotion') {
    super(message, 'ENT_ENVIRONMENT_PROMOTION_DELETE_ERROR', 500);
  }
}

// DeploymentHistory
export class EntDeploymentHistoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Historique (${identifier}) introuvable` : 'Historique introuvable';
    super(msg, 'ENT_DEPLOYMENT_HISTORY_NOT_FOUND', 404);
  }
}

export class EntDeploymentHistoryCreateError extends AppError {
  constructor(message = "Impossible de créer l'historique") {
    super(message, 'ENT_DEPLOYMENT_HISTORY_CREATE_ERROR', 500);
  }
}

export class EntDeploymentHistoryUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'historique") {
    super(message, 'ENT_DEPLOYMENT_HISTORY_UPDATE_ERROR', 500);
  }
}

export class EntDeploymentHistoryDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'historique") {
    super(message, 'ENT_DEPLOYMENT_HISTORY_DELETE_ERROR', 500);
  }
}

// FeatureDeployment
export class EntFeatureDeploymentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déploiement de fonctionnalité (${identifier}) introuvable` : 'Déploiement de fonctionnalité introuvable';
    super(msg, 'ENT_FEATURE_DEPLOYMENT_NOT_FOUND', 404);
  }
}

export class EntFeatureDeploymentCreateError extends AppError {
  constructor(message = 'Impossible de créer le déploiement de fonctionnalité') {
    super(message, 'ENT_FEATURE_DEPLOYMENT_CREATE_ERROR', 500);
  }
}

export class EntFeatureDeploymentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le déploiement de fonctionnalité') {
    super(message, 'ENT_FEATURE_DEPLOYMENT_UPDATE_ERROR', 500);
  }
}

export class EntFeatureDeploymentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le déploiement de fonctionnalité') {
    super(message, 'ENT_FEATURE_DEPLOYMENT_DELETE_ERROR', 500);
  }
}

// ConfigDeployment
export class EntConfigDeploymentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déploiement de configuration (${identifier}) introuvable` : 'Déploiement de configuration introuvable';
    super(msg, 'ENT_CONFIG_DEPLOYMENT_NOT_FOUND', 404);
  }
}

export class EntConfigDeploymentCreateError extends AppError {
  constructor(message = 'Impossible de créer le déploiement de configuration') {
    super(message, 'ENT_CONFIG_DEPLOYMENT_CREATE_ERROR', 500);
  }
}

export class EntConfigDeploymentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le déploiement de configuration') {
    super(message, 'ENT_CONFIG_DEPLOYMENT_UPDATE_ERROR', 500);
  }
}

export class EntConfigDeploymentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le déploiement de configuration') {
    super(message, 'ENT_CONFIG_DEPLOYMENT_DELETE_ERROR', 500);
  }
}

// InfrastructureChange
export class EntInfrastructureChangeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Changement d'infrastructure (${identifier}) introuvable` : "Changement d'infrastructure introuvable";
    super(msg, 'ENT_INFRASTRUCTURE_CHANGE_NOT_FOUND', 404);
  }
}

export class EntInfrastructureChangeCreateError extends AppError {
  constructor(message = "Impossible de créer le changement d'infrastructure") {
    super(message, 'ENT_INFRASTRUCTURE_CHANGE_CREATE_ERROR', 500);
  }
}

export class EntInfrastructureChangeUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le changement d'infrastructure") {
    super(message, 'ENT_INFRASTRUCTURE_CHANGE_UPDATE_ERROR', 500);
  }
}

export class EntInfrastructureChangeDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le changement d'infrastructure") {
    super(message, 'ENT_INFRASTRUCTURE_CHANGE_DELETE_ERROR', 500);
  }
}

// DeploymentApproval
export class EntDeploymentApprovalNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Approbation de déploiement (${identifier}) introuvable` : 'Approbation de déploiement introuvable';
    super(msg, 'ENT_DEPLOYMENT_APPROVAL_NOT_FOUND', 404);
  }
}

export class EntDeploymentApprovalCreateError extends AppError {
  constructor(message = "Impossible de créer l'approbation de déploiement") {
    super(message, 'ENT_DEPLOYMENT_APPROVAL_CREATE_ERROR', 500);
  }
}

export class EntDeploymentApprovalUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'approbation de déploiement") {
    super(message, 'ENT_DEPLOYMENT_APPROVAL_UPDATE_ERROR', 500);
  }
}

export class EntDeploymentApprovalDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'approbation de déploiement") {
    super(message, 'ENT_DEPLOYMENT_APPROVAL_DELETE_ERROR', 500);
  }
}

// ─── Domain 4: Observability (64 errors) ────────────────────────────────────

// DistributedTrace
export class EntDistributedTraceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Trace distribuée (${identifier}) introuvable` : 'Trace distribuée introuvable';
    super(msg, 'ENT_DISTRIBUTED_TRACE_NOT_FOUND', 404);
  }
}

export class EntDistributedTraceCreateError extends AppError {
  constructor(message = 'Impossible de créer la trace distribuée') {
    super(message, 'ENT_DISTRIBUTED_TRACE_CREATE_ERROR', 500);
  }
}

export class EntDistributedTraceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la trace distribuée') {
    super(message, 'ENT_DISTRIBUTED_TRACE_UPDATE_ERROR', 500);
  }
}

export class EntDistributedTraceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la trace distribuée') {
    super(message, 'ENT_DISTRIBUTED_TRACE_DELETE_ERROR', 500);
  }
}

// TraceSpan
export class EntTraceSpanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Span (${identifier}) introuvable` : 'Span introuvable';
    super(msg, 'ENT_TRACE_SPAN_NOT_FOUND', 404);
  }
}

export class EntTraceSpanCreateError extends AppError {
  constructor(message = 'Impossible de créer le span') {
    super(message, 'ENT_TRACE_SPAN_CREATE_ERROR', 500);
  }
}

export class EntTraceSpanUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le span') {
    super(message, 'ENT_TRACE_SPAN_UPDATE_ERROR', 500);
  }
}

export class EntTraceSpanDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le span') {
    super(message, 'ENT_TRACE_SPAN_DELETE_ERROR', 500);
  }
}

// StructuredLog
export class EntStructuredLogNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Log (${identifier}) introuvable` : 'Log introuvable';
    super(msg, 'ENT_STRUCTURED_LOG_NOT_FOUND', 404);
  }
}

export class EntStructuredLogCreateError extends AppError {
  constructor(message = 'Impossible de créer le log') {
    super(message, 'ENT_STRUCTURED_LOG_CREATE_ERROR', 500);
  }
}

export class EntStructuredLogUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le log') {
    super(message, 'ENT_STRUCTURED_LOG_UPDATE_ERROR', 500);
  }
}

export class EntStructuredLogDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le log') {
    super(message, 'ENT_STRUCTURED_LOG_DELETE_ERROR', 500);
  }
}

// Metric
export class EntMetricNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Métrique (${identifier}) introuvable` : 'Métrique introuvable';
    super(msg, 'ENT_METRIC_NOT_FOUND', 404);
  }
}

export class EntMetricCreateError extends AppError {
  constructor(message = 'Impossible de créer la métrique') {
    super(message, 'ENT_METRIC_CREATE_ERROR', 500);
  }
}

export class EntMetricUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la métrique') {
    super(message, 'ENT_METRIC_UPDATE_ERROR', 500);
  }
}

export class EntMetricDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la métrique') {
    super(message, 'ENT_METRIC_DELETE_ERROR', 500);
  }
}

// PerformanceDashboard
export class EntPerformanceDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord de performance (${identifier}) introuvable` : 'Tableau de bord de performance introuvable';
    super(msg, 'ENT_PERFORMANCE_DASHBOARD_NOT_FOUND', 404);
  }
}

export class EntPerformanceDashboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau de bord de performance') {
    super(message, 'ENT_PERFORMANCE_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class EntPerformanceDashboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tableau de bord de performance') {
    super(message, 'ENT_PERFORMANCE_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class EntPerformanceDashboardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tableau de bord de performance') {
    super(message, 'ENT_PERFORMANCE_DASHBOARD_DELETE_ERROR', 500);
  }
}

// ErrorDashboard
export class EntErrorDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord d'erreurs (${identifier}) introuvable` : "Tableau de bord d'erreurs introuvable";
    super(msg, 'ENT_ERROR_DASHBOARD_NOT_FOUND', 404);
  }
}

export class EntErrorDashboardCreateError extends AppError {
  constructor(message = "Impossible de créer le tableau de bord d'erreurs") {
    super(message, 'ENT_ERROR_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class EntErrorDashboardUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le tableau de bord d'erreurs") {
    super(message, 'ENT_ERROR_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class EntErrorDashboardDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le tableau de bord d'erreurs") {
    super(message, 'ENT_ERROR_DASHBOARD_DELETE_ERROR', 500);
  }
}

// SlowQuery
export class EntSlowQueryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Requête lente (${identifier}) introuvable` : 'Requête lente introuvable';
    super(msg, 'ENT_SLOW_QUERY_NOT_FOUND', 404);
  }
}

export class EntSlowQueryCreateError extends AppError {
  constructor(message = 'Impossible de créer la requête lente') {
    super(message, 'ENT_SLOW_QUERY_CREATE_ERROR', 500);
  }
}

export class EntSlowQueryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la requête lente') {
    super(message, 'ENT_SLOW_QUERY_UPDATE_ERROR', 500);
  }
}

export class EntSlowQueryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la requête lente') {
    super(message, 'ENT_SLOW_QUERY_DELETE_ERROR', 500);
  }
}

// AlertRule
export class EntAlertRuleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Règle d'alerte (${identifier}) introuvable` : "Règle d'alerte introuvable";
    super(msg, 'ENT_ALERT_RULE_NOT_FOUND', 404);
  }
}

export class EntAlertRuleCreateError extends AppError {
  constructor(message = "Impossible de créer la règle d'alerte") {
    super(message, 'ENT_ALERT_RULE_CREATE_ERROR', 500);
  }
}

export class EntAlertRuleUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour la règle d'alerte") {
    super(message, 'ENT_ALERT_RULE_UPDATE_ERROR', 500);
  }
}

export class EntAlertRuleDeleteError extends AppError {
  constructor(message = "Impossible de supprimer la règle d'alerte") {
    super(message, 'ENT_ALERT_RULE_DELETE_ERROR', 500);
  }
}

// AlertIncident
export class EntAlertIncidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Incident (${identifier}) introuvable` : 'Incident introuvable';
    super(msg, 'ENT_ALERT_INCIDENT_NOT_FOUND', 404);
  }
}

export class EntAlertIncidentCreateError extends AppError {
  constructor(message = "Impossible de créer l'incident") {
    super(message, 'ENT_ALERT_INCIDENT_CREATE_ERROR', 500);
  }
}

export class EntAlertIncidentUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'incident") {
    super(message, 'ENT_ALERT_INCIDENT_UPDATE_ERROR', 500);
  }
}

export class EntAlertIncidentDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'incident") {
    super(message, 'ENT_ALERT_INCIDENT_DELETE_ERROR', 500);
  }
}

// SLO
export class EntSloNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SLO (${identifier}) introuvable` : 'SLO introuvable';
    super(msg, 'ENT_SLO_NOT_FOUND', 404);
  }
}

export class EntSloCreateError extends AppError {
  constructor(message = 'Impossible de créer le SLO') {
    super(message, 'ENT_SLO_CREATE_ERROR', 500);
  }
}

export class EntSloUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le SLO') {
    super(message, 'ENT_SLO_UPDATE_ERROR', 500);
  }
}

export class EntSloDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le SLO') {
    super(message, 'ENT_SLO_DELETE_ERROR', 500);
  }
}

// SLA
export class EntSlaNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SLA (${identifier}) introuvable` : 'SLA introuvable';
    super(msg, 'ENT_SLA_NOT_FOUND', 404);
  }
}

export class EntSlaCreateError extends AppError {
  constructor(message = 'Impossible de créer le SLA') {
    super(message, 'ENT_SLA_CREATE_ERROR', 500);
  }
}

export class EntSlaUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le SLA') {
    super(message, 'ENT_SLA_UPDATE_ERROR', 500);
  }
}

export class EntSlaDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le SLA') {
    super(message, 'ENT_SLA_DELETE_ERROR', 500);
  }
}

// ServiceHealth
export class EntServiceHealthNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Santé du service (${identifier}) introuvable` : 'Santé du service introuvable';
    super(msg, 'ENT_SERVICE_HEALTH_NOT_FOUND', 404);
  }
}

export class EntServiceHealthCreateError extends AppError {
  constructor(message = 'Impossible de créer la santé du service') {
    super(message, 'ENT_SERVICE_HEALTH_CREATE_ERROR', 500);
  }
}

export class EntServiceHealthUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la santé du service') {
    super(message, 'ENT_SERVICE_HEALTH_UPDATE_ERROR', 500);
  }
}

export class EntServiceHealthDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la santé du service') {
    super(message, 'ENT_SERVICE_HEALTH_DELETE_ERROR', 500);
  }
}

// LogAggregation
export class EntLogAggregationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Agrégation de logs (${identifier}) introuvable` : 'Agrégation de logs introuvable';
    super(msg, 'ENT_LOG_AGGREGATION_NOT_FOUND', 404);
  }
}

export class EntLogAggregationCreateError extends AppError {
  constructor(message = "Impossible de créer l'agrégation de logs") {
    super(message, 'ENT_LOG_AGGREGATION_CREATE_ERROR', 500);
  }
}

export class EntLogAggregationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'agrégation de logs") {
    super(message, 'ENT_LOG_AGGREGATION_UPDATE_ERROR', 500);
  }
}

export class EntLogAggregationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'agrégation de logs") {
    super(message, 'ENT_LOG_AGGREGATION_DELETE_ERROR', 500);
  }
}

// MetricsAggregation
export class EntMetricsAggregationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Agrégation de métriques (${identifier}) introuvable` : 'Agrégation de métriques introuvable';
    super(msg, 'ENT_METRICS_AGGREGATION_NOT_FOUND', 404);
  }
}

export class EntMetricsAggregationCreateError extends AppError {
  constructor(message = "Impossible de créer l'agrégation de métriques") {
    super(message, 'ENT_METRICS_AGGREGATION_CREATE_ERROR', 500);
  }
}

export class EntMetricsAggregationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'agrégation de métriques") {
    super(message, 'ENT_METRICS_AGGREGATION_UPDATE_ERROR', 500);
  }
}

export class EntMetricsAggregationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'agrégation de métriques") {
    super(message, 'ENT_METRICS_AGGREGATION_DELETE_ERROR', 500);
  }
}

// AlertEscalation
export class EntAlertEscalationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Escalade (${identifier}) introuvable` : 'Escalade introuvable';
    super(msg, 'ENT_ALERT_ESCALATION_NOT_FOUND', 404);
  }
}

export class EntAlertEscalationCreateError extends AppError {
  constructor(message = "Impossible de créer l'escalade") {
    super(message, 'ENT_ALERT_ESCALATION_CREATE_ERROR', 500);
  }
}

export class EntAlertEscalationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'escalade") {
    super(message, 'ENT_ALERT_ESCALATION_UPDATE_ERROR', 500);
  }
}

export class EntAlertEscalationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'escalade") {
    super(message, 'ENT_ALERT_ESCALATION_DELETE_ERROR', 500);
  }
}

// PerformanceBaseline
export class EntPerformanceBaselineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Baseline de performance (${identifier}) introuvable` : 'Baseline de performance introuvable';
    super(msg, 'ENT_PERFORMANCE_BASELINE_NOT_FOUND', 404);
  }
}

export class EntPerformanceBaselineCreateError extends AppError {
  constructor(message = 'Impossible de créer la baseline de performance') {
    super(message, 'ENT_PERFORMANCE_BASELINE_CREATE_ERROR', 500);
  }
}

export class EntPerformanceBaselineUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la baseline de performance') {
    super(message, 'ENT_PERFORMANCE_BASELINE_UPDATE_ERROR', 500);
  }
}

export class EntPerformanceBaselineDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la baseline de performance') {
    super(message, 'ENT_PERFORMANCE_BASELINE_DELETE_ERROR', 500);
  }
}

// ─── Domain 5: Distributed Caching (48 errors) ──────────────────────────────

// RedisCluster
export class EntRedisClusterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cluster Redis (${identifier}) introuvable` : 'Cluster Redis introuvable';
    super(msg, 'ENT_REDIS_CLUSTER_NOT_FOUND', 404);
  }
}

export class EntRedisClusterCreateError extends AppError {
  constructor(message = 'Impossible de créer le cluster Redis') {
    super(message, 'ENT_REDIS_CLUSTER_CREATE_ERROR', 500);
  }
}

export class EntRedisClusterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cluster Redis') {
    super(message, 'ENT_REDIS_CLUSTER_UPDATE_ERROR', 500);
  }
}

export class EntRedisClusterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cluster Redis') {
    super(message, 'ENT_REDIS_CLUSTER_DELETE_ERROR', 500);
  }
}

// CacheLayer
export class EntCacheLayerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Couche de cache (${identifier}) introuvable` : 'Couche de cache introuvable';
    super(msg, 'ENT_CACHE_LAYER_NOT_FOUND', 404);
  }
}

export class EntCacheLayerCreateError extends AppError {
  constructor(message = 'Impossible de créer la couche de cache') {
    super(message, 'ENT_CACHE_LAYER_CREATE_ERROR', 500);
  }
}

export class EntCacheLayerUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la couche de cache') {
    super(message, 'ENT_CACHE_LAYER_UPDATE_ERROR', 500);
  }
}

export class EntCacheLayerDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la couche de cache') {
    super(message, 'ENT_CACHE_LAYER_DELETE_ERROR', 500);
  }
}

// CacheEntry
export class EntCacheEntryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Entrée de cache (${identifier}) introuvable` : 'Entrée de cache introuvable';
    super(msg, 'ENT_CACHE_ENTRY_NOT_FOUND', 404);
  }
}

export class EntCacheEntryCreateError extends AppError {
  constructor(message = "Impossible de créer l'entrée de cache") {
    super(message, 'ENT_CACHE_ENTRY_CREATE_ERROR', 500);
  }
}

export class EntCacheEntryUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'entrée de cache") {
    super(message, 'ENT_CACHE_ENTRY_UPDATE_ERROR', 500);
  }
}

export class EntCacheEntryDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'entrée de cache") {
    super(message, 'ENT_CACHE_ENTRY_DELETE_ERROR', 500);
  }
}

// DistributedCache
export class EntDistributedCacheNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cache distribué (${identifier}) introuvable` : 'Cache distribué introuvable';
    super(msg, 'ENT_DISTRIBUTED_CACHE_NOT_FOUND', 404);
  }
}

export class EntDistributedCacheCreateError extends AppError {
  constructor(message = 'Impossible de créer le cache distribué') {
    super(message, 'ENT_DISTRIBUTED_CACHE_CREATE_ERROR', 500);
  }
}

export class EntDistributedCacheUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cache distribué') {
    super(message, 'ENT_DISTRIBUTED_CACHE_UPDATE_ERROR', 500);
  }
}

export class EntDistributedCacheDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cache distribué') {
    super(message, 'ENT_DISTRIBUTED_CACHE_DELETE_ERROR', 500);
  }
}

// QueryCache
export class EntQueryCacheNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cache de requête (${identifier}) introuvable` : 'Cache de requête introuvable';
    super(msg, 'ENT_QUERY_CACHE_NOT_FOUND', 404);
  }
}

export class EntQueryCacheCreateError extends AppError {
  constructor(message = 'Impossible de créer le cache de requête') {
    super(message, 'ENT_QUERY_CACHE_CREATE_ERROR', 500);
  }
}

export class EntQueryCacheUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cache de requête') {
    super(message, 'ENT_QUERY_CACHE_UPDATE_ERROR', 500);
  }
}

export class EntQueryCacheDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cache de requête') {
    super(message, 'ENT_QUERY_CACHE_DELETE_ERROR', 500);
  }
}

// ApiCache
export class EntApiCacheNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cache API (${identifier}) introuvable` : 'Cache API introuvable';
    super(msg, 'ENT_API_CACHE_NOT_FOUND', 404);
  }
}

export class EntApiCacheCreateError extends AppError {
  constructor(message = 'Impossible de créer le cache API') {
    super(message, 'ENT_API_CACHE_CREATE_ERROR', 500);
  }
}

export class EntApiCacheUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cache API') {
    super(message, 'ENT_API_CACHE_UPDATE_ERROR', 500);
  }
}

export class EntApiCacheDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cache API') {
    super(message, 'ENT_API_CACHE_DELETE_ERROR', 500);
  }
}

// CacheInvalidation
export class EntCacheInvalidationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Invalidation (${identifier}) introuvable` : 'Invalidation introuvable';
    super(msg, 'ENT_CACHE_INVALIDATION_NOT_FOUND', 404);
  }
}

export class EntCacheInvalidationCreateError extends AppError {
  constructor(message = "Impossible de créer l'invalidation") {
    super(message, 'ENT_CACHE_INVALIDATION_CREATE_ERROR', 500);
  }
}

export class EntCacheInvalidationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'invalidation") {
    super(message, 'ENT_CACHE_INVALIDATION_UPDATE_ERROR', 500);
  }
}

export class EntCacheInvalidationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'invalidation") {
    super(message, 'ENT_CACHE_INVALIDATION_DELETE_ERROR', 500);
  }
}

// CacheMetrics
export class EntCacheMetricsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Métriques de cache (${identifier}) introuvable` : 'Métriques de cache introuvable';
    super(msg, 'ENT_CACHE_METRICS_NOT_FOUND', 404);
  }
}

export class EntCacheMetricsCreateError extends AppError {
  constructor(message = 'Impossible de créer les métriques de cache') {
    super(message, 'ENT_CACHE_METRICS_CREATE_ERROR', 500);
  }
}

export class EntCacheMetricsUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour les métriques de cache') {
    super(message, 'ENT_CACHE_METRICS_UPDATE_ERROR', 500);
  }
}

export class EntCacheMetricsDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer les métriques de cache') {
    super(message, 'ENT_CACHE_METRICS_DELETE_ERROR', 500);
  }
}

// CacheWarmer
export class EntCacheWarmerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réchauffeur (${identifier}) introuvable` : 'Réchauffeur introuvable';
    super(msg, 'ENT_CACHE_WARMER_NOT_FOUND', 404);
  }
}

export class EntCacheWarmerCreateError extends AppError {
  constructor(message = 'Impossible de créer le réchauffeur') {
    super(message, 'ENT_CACHE_WARMER_CREATE_ERROR', 500);
  }
}

export class EntCacheWarmerUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le réchauffeur') {
    super(message, 'ENT_CACHE_WARMER_UPDATE_ERROR', 500);
  }
}

export class EntCacheWarmerDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le réchauffeur') {
    super(message, 'ENT_CACHE_WARMER_DELETE_ERROR', 500);
  }
}

// CacheSnapshot
export class EntCacheSnapshotNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Instantané (${identifier}) introuvable` : 'Instantané introuvable';
    super(msg, 'ENT_CACHE_SNAPSHOT_NOT_FOUND', 404);
  }
}

export class EntCacheSnapshotCreateError extends AppError {
  constructor(message = "Impossible de créer l'instantané") {
    super(message, 'ENT_CACHE_SNAPSHOT_CREATE_ERROR', 500);
  }
}

export class EntCacheSnapshotUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'instantané") {
    super(message, 'ENT_CACHE_SNAPSHOT_UPDATE_ERROR', 500);
  }
}

export class EntCacheSnapshotDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'instantané") {
    super(message, 'ENT_CACHE_SNAPSHOT_DELETE_ERROR', 500);
  }
}

// CachePolicy
export class EntCachePolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique de cache (${identifier}) introuvable` : 'Politique de cache introuvable';
    super(msg, 'ENT_CACHE_POLICY_NOT_FOUND', 404);
  }
}

export class EntCachePolicyCreateError extends AppError {
  constructor(message = 'Impossible de créer la politique de cache') {
    super(message, 'ENT_CACHE_POLICY_CREATE_ERROR', 500);
  }
}

export class EntCachePolicyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la politique de cache') {
    super(message, 'ENT_CACHE_POLICY_UPDATE_ERROR', 500);
  }
}

export class EntCachePolicyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la politique de cache') {
    super(message, 'ENT_CACHE_POLICY_DELETE_ERROR', 500);
  }
}

// CacheCluster
export class EntCacheClusterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cluster de cache (${identifier}) introuvable` : 'Cluster de cache introuvable';
    super(msg, 'ENT_CACHE_CLUSTER_NOT_FOUND', 404);
  }
}

export class EntCacheClusterCreateError extends AppError {
  constructor(message = 'Impossible de créer le cluster de cache') {
    super(message, 'ENT_CACHE_CLUSTER_CREATE_ERROR', 500);
  }
}

export class EntCacheClusterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cluster de cache') {
    super(message, 'ENT_CACHE_CLUSTER_UPDATE_ERROR', 500);
  }
}

export class EntCacheClusterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cluster de cache') {
    super(message, 'ENT_CACHE_CLUSTER_DELETE_ERROR', 500);
  }
}

// ─── Domain 6: Global Search (56 errors) ────────────────────────────────────

// SearchIndex
export class EntSearchIndexNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Index (${identifier}) introuvable` : 'Index introuvable';
    super(msg, 'ENT_SEARCH_INDEX_NOT_FOUND', 404);
  }
}

export class EntSearchIndexCreateError extends AppError {
  constructor(message = "Impossible de créer l'index") {
    super(message, 'ENT_SEARCH_INDEX_CREATE_ERROR', 500);
  }
}

export class EntSearchIndexUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'index") {
    super(message, 'ENT_SEARCH_INDEX_UPDATE_ERROR', 500);
  }
}

export class EntSearchIndexDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'index") {
    super(message, 'ENT_SEARCH_INDEX_DELETE_ERROR', 500);
  }
}

// SearchDocument
export class EntSearchDocumentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Document (${identifier}) introuvable` : 'Document introuvable';
    super(msg, 'ENT_SEARCH_DOCUMENT_NOT_FOUND', 404);
  }
}

export class EntSearchDocumentCreateError extends AppError {
  constructor(message = 'Impossible de créer le document') {
    super(message, 'ENT_SEARCH_DOCUMENT_CREATE_ERROR', 500);
  }
}

export class EntSearchDocumentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le document') {
    super(message, 'ENT_SEARCH_DOCUMENT_UPDATE_ERROR', 500);
  }
}

export class EntSearchDocumentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le document') {
    super(message, 'ENT_SEARCH_DOCUMENT_DELETE_ERROR', 500);
  }
}

// SearchQuery
export class EntSearchQueryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Requête (${identifier}) introuvable` : 'Requête introuvable';
    super(msg, 'ENT_SEARCH_QUERY_NOT_FOUND', 404);
  }
}

export class EntSearchQueryCreateError extends AppError {
  constructor(message = 'Impossible de créer la requête') {
    super(message, 'ENT_SEARCH_QUERY_CREATE_ERROR', 500);
  }
}

export class EntSearchQueryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la requête') {
    super(message, 'ENT_SEARCH_QUERY_UPDATE_ERROR', 500);
  }
}

export class EntSearchQueryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la requête') {
    super(message, 'ENT_SEARCH_QUERY_DELETE_ERROR', 500);
  }
}

// SearchSuggestion
export class EntSearchSuggestionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Suggestion (${identifier}) introuvable` : 'Suggestion introuvable';
    super(msg, 'ENT_SEARCH_SUGGESTION_NOT_FOUND', 404);
  }
}

export class EntSearchSuggestionCreateError extends AppError {
  constructor(message = 'Impossible de créer la suggestion') {
    super(message, 'ENT_SEARCH_SUGGESTION_CREATE_ERROR', 500);
  }
}

export class EntSearchSuggestionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la suggestion') {
    super(message, 'ENT_SEARCH_SUGGESTION_UPDATE_ERROR', 500);
  }
}

export class EntSearchSuggestionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la suggestion') {
    super(message, 'ENT_SEARCH_SUGGESTION_DELETE_ERROR', 500);
  }
}

// SearchAnalytics
export class EntSearchAnalyticsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analytique de recherche (${identifier}) introuvable` : 'Analytique de recherche introuvable';
    super(msg, 'ENT_SEARCH_ANALYTICS_NOT_FOUND', 404);
  }
}

export class EntSearchAnalyticsCreateError extends AppError {
  constructor(message = "Impossible de créer l'analytique de recherche") {
    super(message, 'ENT_SEARCH_ANALYTICS_CREATE_ERROR', 500);
  }
}

export class EntSearchAnalyticsUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'analytique de recherche") {
    super(message, 'ENT_SEARCH_ANALYTICS_UPDATE_ERROR', 500);
  }
}

export class EntSearchAnalyticsDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'analytique de recherche") {
    super(message, 'ENT_SEARCH_ANALYTICS_DELETE_ERROR', 500);
  }
}

// GlobalSearchConfig
export class EntGlobalSearchConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration de recherche globale (${identifier}) introuvable` : 'Configuration de recherche globale introuvable';
    super(msg, 'ENT_GLOBAL_SEARCH_CONFIG_NOT_FOUND', 404);
  }
}

export class EntGlobalSearchConfigCreateError extends AppError {
  constructor(message = 'Impossible de créer la configuration de recherche globale') {
    super(message, 'ENT_GLOBAL_SEARCH_CONFIG_CREATE_ERROR', 500);
  }
}

export class EntGlobalSearchConfigUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la configuration de recherche globale') {
    super(message, 'ENT_GLOBAL_SEARCH_CONFIG_UPDATE_ERROR', 500);
  }
}

export class EntGlobalSearchConfigDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la configuration de recherche globale') {
    super(message, 'ENT_GLOBAL_SEARCH_CONFIG_DELETE_ERROR', 500);
  }
}

// ElasticCluster
export class EntElasticClusterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cluster (${identifier}) introuvable` : 'Cluster introuvable';
    super(msg, 'ENT_ELASTIC_CLUSTER_NOT_FOUND', 404);
  }
}

export class EntElasticClusterCreateError extends AppError {
  constructor(message = 'Impossible de créer le cluster') {
    super(message, 'ENT_ELASTIC_CLUSTER_CREATE_ERROR', 500);
  }
}

export class EntElasticClusterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cluster') {
    super(message, 'ENT_ELASTIC_CLUSTER_UPDATE_ERROR', 500);
  }
}

export class EntElasticClusterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cluster') {
    super(message, 'ENT_ELASTIC_CLUSTER_DELETE_ERROR', 500);
  }
}

// IndexBuilder
export class EntIndexBuilderNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Constructeur d'index (${identifier}) introuvable` : "Constructeur d'index introuvable";
    super(msg, 'ENT_INDEX_BUILDER_NOT_FOUND', 404);
  }
}

export class EntIndexBuilderCreateError extends AppError {
  constructor(message = "Impossible de créer le constructeur d'index") {
    super(message, 'ENT_INDEX_BUILDER_CREATE_ERROR', 500);
  }
}

export class EntIndexBuilderUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le constructeur d'index") {
    super(message, 'ENT_INDEX_BUILDER_UPDATE_ERROR', 500);
  }
}

export class EntIndexBuilderDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le constructeur d'index") {
    super(message, 'ENT_INDEX_BUILDER_DELETE_ERROR', 500);
  }
}

// IncrementalIndex
export class EntIncrementalIndexNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Index incrémental (${identifier}) introuvable` : 'Index incrémental introuvable';
    super(msg, 'ENT_INCREMENTAL_INDEX_NOT_FOUND', 404);
  }
}

export class EntIncrementalIndexCreateError extends AppError {
  constructor(message = "Impossible de créer l'index incrémental") {
    super(message, 'ENT_INCREMENTAL_INDEX_CREATE_ERROR', 500);
  }
}

export class EntIncrementalIndexUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'index incrémental") {
    super(message, 'ENT_INCREMENTAL_INDEX_UPDATE_ERROR', 500);
  }
}

export class EntIncrementalIndexDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'index incrémental") {
    super(message, 'ENT_INCREMENTAL_INDEX_DELETE_ERROR', 500);
  }
}

// PeopleSearch
export class EntPeopleSearchNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recherche de personnes (${identifier}) introuvable` : 'Recherche de personnes introuvable';
    super(msg, 'ENT_PEOPLE_SEARCH_NOT_FOUND', 404);
  }
}

export class EntPeopleSearchCreateError extends AppError {
  constructor(message = 'Impossible de créer la recherche de personnes') {
    super(message, 'ENT_PEOPLE_SEARCH_CREATE_ERROR', 500);
  }
}

export class EntPeopleSearchUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la recherche de personnes') {
    super(message, 'ENT_PEOPLE_SEARCH_UPDATE_ERROR', 500);
  }
}

export class EntPeopleSearchDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la recherche de personnes') {
    super(message, 'ENT_PEOPLE_SEARCH_DELETE_ERROR', 500);
  }
}

// SchoolSearch
export class EntSchoolSearchNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recherche d'école (${identifier}) introuvable` : "Recherche d'école introuvable";
    super(msg, 'ENT_SCHOOL_SEARCH_NOT_FOUND', 404);
  }
}

export class EntSchoolSearchCreateError extends AppError {
  constructor(message = "Impossible de créer la recherche d'école") {
    super(message, 'ENT_SCHOOL_SEARCH_CREATE_ERROR', 500);
  }
}

export class EntSchoolSearchUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour la recherche d'école") {
    super(message, 'ENT_SCHOOL_SEARCH_UPDATE_ERROR', 500);
  }
}

export class EntSchoolSearchDeleteError extends AppError {
  constructor(message = "Impossible de supprimer la recherche d'école") {
    super(message, 'ENT_SCHOOL_SEARCH_DELETE_ERROR', 500);
  }
}

// AnalyticsSearch
export class EntAnalyticsSearchNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recherche analytique (${identifier}) introuvable` : 'Recherche analytique introuvable';
    super(msg, 'ENT_ANALYTICS_SEARCH_NOT_FOUND', 404);
  }
}

export class EntAnalyticsSearchCreateError extends AppError {
  constructor(message = 'Impossible de créer la recherche analytique') {
    super(message, 'ENT_ANALYTICS_SEARCH_CREATE_ERROR', 500);
  }
}

export class EntAnalyticsSearchUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la recherche analytique') {
    super(message, 'ENT_ANALYTICS_SEARCH_UPDATE_ERROR', 500);
  }
}

export class EntAnalyticsSearchDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la recherche analytique') {
    super(message, 'ENT_ANALYTICS_SEARCH_DELETE_ERROR', 500);
  }
}

// SearchRelevance
export class EntSearchRelevanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pertinence (${identifier}) introuvable` : 'Pertinence introuvable';
    super(msg, 'ENT_SEARCH_RELEVANCE_NOT_FOUND', 404);
  }
}

export class EntSearchRelevanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la pertinence') {
    super(message, 'ENT_SEARCH_RELEVANCE_CREATE_ERROR', 500);
  }
}

export class EntSearchRelevanceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la pertinence') {
    super(message, 'ENT_SEARCH_RELEVANCE_UPDATE_ERROR', 500);
  }
}

export class EntSearchRelevanceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la pertinence') {
    super(message, 'ENT_SEARCH_RELEVANCE_DELETE_ERROR', 500);
  }
}

// SearchSynonym
export class EntSearchSynonymNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Synonyme (${identifier}) introuvable` : 'Synonyme introuvable';
    super(msg, 'ENT_SEARCH_SYNONYM_NOT_FOUND', 404);
  }
}

export class EntSearchSynonymCreateError extends AppError {
  constructor(message = 'Impossible de créer le synonyme') {
    super(message, 'ENT_SEARCH_SYNONYM_CREATE_ERROR', 500);
  }
}

export class EntSearchSynonymUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le synonyme') {
    super(message, 'ENT_SEARCH_SYNONYM_UPDATE_ERROR', 500);
  }
}

export class EntSearchSynonymDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le synonyme') {
    super(message, 'ENT_SEARCH_SYNONYM_DELETE_ERROR', 500);
  }
}

// ─── Domain 7: Security & Zero Trust (64 errors) ────────────────────────────

// ZeroTrustPolicy
export class EntZeroTrustPolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique de confiance nulle (${identifier}) introuvable` : 'Politique de confiance nulle introuvable';
    super(msg, 'ENT_ZERO_TRUST_POLICY_NOT_FOUND', 404);
  }
}

export class EntZeroTrustPolicyCreateError extends AppError {
  constructor(message = 'Impossible de créer la politique de confiance nulle') {
    super(message, 'ENT_ZERO_TRUST_POLICY_CREATE_ERROR', 500);
  }
}

export class EntZeroTrustPolicyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la politique de confiance nulle') {
    super(message, 'ENT_ZERO_TRUST_POLICY_UPDATE_ERROR', 500);
  }
}

export class EntZeroTrustPolicyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la politique de confiance nulle') {
    super(message, 'ENT_ZERO_TRUST_POLICY_DELETE_ERROR', 500);
  }
}

// AccessPolicy
export class EntAccessPolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique d'accès (${identifier}) introuvable` : "Politique d'accès introuvable";
    super(msg, 'ENT_ACCESS_POLICY_NOT_FOUND', 404);
  }
}

export class EntAccessPolicyCreateError extends AppError {
  constructor(message = "Impossible de créer la politique d'accès") {
    super(message, 'ENT_ACCESS_POLICY_CREATE_ERROR', 500);
  }
}

export class EntAccessPolicyUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour la politique d'accès") {
    super(message, 'ENT_ACCESS_POLICY_UPDATE_ERROR', 500);
  }
}

export class EntAccessPolicyDeleteError extends AppError {
  constructor(message = "Impossible de supprimer la politique d'accès") {
    super(message, 'ENT_ACCESS_POLICY_DELETE_ERROR', 500);
  }
}

// Role
export class EntRoleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rôle (${identifier}) introuvable` : 'Rôle introuvable';
    super(msg, 'ENT_ROLE_NOT_FOUND', 404);
  }
}

export class EntRoleCreateError extends AppError {
  constructor(message = 'Impossible de créer le rôle') {
    super(message, 'ENT_ROLE_CREATE_ERROR', 500);
  }
}

export class EntRoleUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rôle') {
    super(message, 'ENT_ROLE_UPDATE_ERROR', 500);
  }
}

export class EntRoleDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rôle') {
    super(message, 'ENT_ROLE_DELETE_ERROR', 500);
  }
}

// Permission
export class EntPermissionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Permission (${identifier}) introuvable` : 'Permission introuvable';
    super(msg, 'ENT_PERMISSION_NOT_FOUND', 404);
  }
}

export class EntPermissionCreateError extends AppError {
  constructor(message = 'Impossible de créer la permission') {
    super(message, 'ENT_PERMISSION_CREATE_ERROR', 500);
  }
}

export class EntPermissionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la permission') {
    super(message, 'ENT_PERMISSION_UPDATE_ERROR', 500);
  }
}

export class EntPermissionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la permission') {
    super(message, 'ENT_PERMISSION_DELETE_ERROR', 500);
  }
}

// AbacPolicy
export class EntAbacPolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique ABAC (${identifier}) introuvable` : 'Politique ABAC introuvable';
    super(msg, 'ENT_ABAC_POLICY_NOT_FOUND', 404);
  }
}

export class EntAbacPolicyCreateError extends AppError {
  constructor(message = 'Impossible de créer la politique ABAC') {
    super(message, 'ENT_ABAC_POLICY_CREATE_ERROR', 500);
  }
}

export class EntAbacPolicyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la politique ABAC') {
    super(message, 'ENT_ABAC_POLICY_UPDATE_ERROR', 500);
  }
}

export class EntAbacPolicyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la politique ABAC') {
    super(message, 'ENT_ABAC_POLICY_DELETE_ERROR', 500);
  }
}

// PolicyEvaluation
export class EntPolicyEvaluationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation (${identifier}) introuvable` : 'Évaluation introuvable';
    super(msg, 'ENT_POLICY_EVALUATION_NOT_FOUND', 404);
  }
}

export class EntPolicyEvaluationCreateError extends AppError {
  constructor(message = "Impossible de créer l'évaluation") {
    super(message, 'ENT_POLICY_EVALUATION_CREATE_ERROR', 500);
  }
}

export class EntPolicyEvaluationUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'évaluation") {
    super(message, 'ENT_POLICY_EVALUATION_UPDATE_ERROR', 500);
  }
}

export class EntPolicyEvaluationDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'évaluation") {
    super(message, 'ENT_POLICY_EVALUATION_DELETE_ERROR', 500);
  }
}

// SecretRotation
export class EntSecretRotationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rotation des secrets (${identifier}) introuvable` : 'Rotation des secrets introuvable';
    super(msg, 'ENT_SECRET_ROTATION_NOT_FOUND', 404);
  }
}

export class EntSecretRotationCreateError extends AppError {
  constructor(message = 'Impossible de créer la rotation des secrets') {
    super(message, 'ENT_SECRET_ROTATION_CREATE_ERROR', 500);
  }
}

export class EntSecretRotationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la rotation des secrets') {
    super(message, 'ENT_SECRET_ROTATION_UPDATE_ERROR', 500);
  }
}

export class EntSecretRotationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la rotation des secrets') {
    super(message, 'ENT_SECRET_ROTATION_DELETE_ERROR', 500);
  }
}

// SecurityCenter
export class EntSecurityCenterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Centre de sécurité (${identifier}) introuvable` : 'Centre de sécurité introuvable';
    super(msg, 'ENT_SECURITY_CENTER_NOT_FOUND', 404);
  }
}

export class EntSecurityCenterCreateError extends AppError {
  constructor(message = 'Impossible de créer le centre de sécurité') {
    super(message, 'ENT_SECURITY_CENTER_CREATE_ERROR', 500);
  }
}

export class EntSecurityCenterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le centre de sécurité') {
    super(message, 'ENT_SECURITY_CENTER_UPDATE_ERROR', 500);
  }
}

export class EntSecurityCenterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le centre de sécurité') {
    super(message, 'ENT_SECURITY_CENTER_DELETE_ERROR', 500);
  }
}

// ThreatDetection
export class EntThreatDetectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Détection de menace (${identifier}) introuvable` : 'Détection de menace introuvable';
    super(msg, 'ENT_THREAT_DETECTION_NOT_FOUND', 404);
  }
}

export class EntThreatDetectionCreateError extends AppError {
  constructor(message = 'Impossible de créer la détection de menace') {
    super(message, 'ENT_THREAT_DETECTION_CREATE_ERROR', 500);
  }
}

export class EntThreatDetectionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la détection de menace') {
    super(message, 'ENT_THREAT_DETECTION_UPDATE_ERROR', 500);
  }
}

export class EntThreatDetectionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la détection de menace') {
    super(message, 'ENT_THREAT_DETECTION_DELETE_ERROR', 500);
  }
}

// SecurityAudit
export class EntSecurityAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit de sécurité (${identifier}) introuvable` : 'Audit de sécurité introuvable';
    super(msg, 'ENT_SECURITY_AUDIT_NOT_FOUND', 404);
  }
}

export class EntSecurityAuditCreateError extends AppError {
  constructor(message = "Impossible de créer l'audit de sécurité") {
    super(message, 'ENT_SECURITY_AUDIT_CREATE_ERROR', 500);
  }
}

export class EntSecurityAuditUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'audit de sécurité") {
    super(message, 'ENT_SECURITY_AUDIT_UPDATE_ERROR', 500);
  }
}

export class EntSecurityAuditDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'audit de sécurité") {
    super(message, 'ENT_SECURITY_AUDIT_DELETE_ERROR', 500);
  }
}

// FirewallRule
export class EntFirewallRuleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Règle de pare-feu (${identifier}) introuvable` : 'Règle de pare-feu introuvable';
    super(msg, 'ENT_FIREWALL_RULE_NOT_FOUND', 404);
  }
}

export class EntFirewallRuleCreateError extends AppError {
  constructor(message = 'Impossible de créer la règle de pare-feu') {
    super(message, 'ENT_FIREWALL_RULE_CREATE_ERROR', 500);
  }
}

export class EntFirewallRuleUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la règle de pare-feu') {
    super(message, 'ENT_FIREWALL_RULE_UPDATE_ERROR', 500);
  }
}

export class EntFirewallRuleDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la règle de pare-feu') {
    super(message, 'ENT_FIREWALL_RULE_DELETE_ERROR', 500);
  }
}

// IpWhitelist
export class EntIpWhitelistNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Liste blanche (${identifier}) introuvable` : 'Liste blanche introuvable';
    super(msg, 'ENT_IP_WHITELIST_NOT_FOUND', 404);
  }
}

export class EntIpWhitelistCreateError extends AppError {
  constructor(message = 'Impossible de créer la liste blanche') {
    super(message, 'ENT_IP_WHITELIST_CREATE_ERROR', 500);
  }
}

export class EntIpWhitelistUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la liste blanche') {
    super(message, 'ENT_IP_WHITELIST_UPDATE_ERROR', 500);
  }
}

export class EntIpWhitelistDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la liste blanche') {
    super(message, 'ENT_IP_WHITELIST_DELETE_ERROR', 500);
  }
}

// EncryptionKey
export class EntEncryptionKeyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Clé de chiffrement (${identifier}) introuvable` : 'Clé de chiffrement introuvable';
    super(msg, 'ENT_ENCRYPTION_KEY_NOT_FOUND', 404);
  }
}

export class EntEncryptionKeyCreateError extends AppError {
  constructor(message = 'Impossible de créer la clé de chiffrement') {
    super(message, 'ENT_ENCRYPTION_KEY_CREATE_ERROR', 500);
  }
}

export class EntEncryptionKeyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la clé de chiffrement') {
    super(message, 'ENT_ENCRYPTION_KEY_UPDATE_ERROR', 500);
  }
}

export class EntEncryptionKeyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la clé de chiffrement') {
    super(message, 'ENT_ENCRYPTION_KEY_DELETE_ERROR', 500);
  }
}

// SecurityIncident
export class EntSecurityIncidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Incident de sécurité (${identifier}) introuvable` : 'Incident de sécurité introuvable';
    super(msg, 'ENT_SECURITY_INCIDENT_NOT_FOUND', 404);
  }
}

export class EntSecurityIncidentCreateError extends AppError {
  constructor(message = "Impossible de créer l'incident de sécurité") {
    super(message, 'ENT_SECURITY_INCIDENT_CREATE_ERROR', 500);
  }
}

export class EntSecurityIncidentUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'incident de sécurité") {
    super(message, 'ENT_SECURITY_INCIDENT_UPDATE_ERROR', 500);
  }
}

export class EntSecurityIncidentDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'incident de sécurité") {
    super(message, 'ENT_SECURITY_INCIDENT_DELETE_ERROR', 500);
  }
}

// VulnerabilityScan
export class EntVulnerabilityScanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Scan de vulnérabilité (${identifier}) introuvable` : 'Scan de vulnérabilité introuvable';
    super(msg, 'ENT_VULNERABILITY_SCAN_NOT_FOUND', 404);
  }
}

export class EntVulnerabilityScanCreateError extends AppError {
  constructor(message = 'Impossible de créer le scan de vulnérabilité') {
    super(message, 'ENT_VULNERABILITY_SCAN_CREATE_ERROR', 500);
  }
}

export class EntVulnerabilityScanUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le scan de vulnérabilité') {
    super(message, 'ENT_VULNERABILITY_SCAN_UPDATE_ERROR', 500);
  }
}

export class EntVulnerabilityScanDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le scan de vulnérabilité') {
    super(message, 'ENT_VULNERABILITY_SCAN_DELETE_ERROR', 500);
  }
}

// AccessLog
export class EntAccessLogNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Journal d'accès (${identifier}) introuvable` : "Journal d'accès introuvable";
    super(msg, 'ENT_ACCESS_LOG_NOT_FOUND', 404);
  }
}

export class EntAccessLogCreateError extends AppError {
  constructor(message = "Impossible de créer le journal d'accès") {
    super(message, 'ENT_ACCESS_LOG_CREATE_ERROR', 500);
  }
}

export class EntAccessLogUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le journal d'accès") {
    super(message, 'ENT_ACCESS_LOG_UPDATE_ERROR', 500);
  }
}

export class EntAccessLogDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le journal d'accès") {
    super(message, 'ENT_ACCESS_LOG_DELETE_ERROR', 500);
  }
}

// ─── Domain 8: High Availability & Disaster Recovery (56 errors) ─────────────

// FailoverConfig
export class EntFailoverConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration de basculement (${identifier}) introuvable` : 'Configuration de basculement introuvable';
    super(msg, 'ENT_FAILOVER_CONFIG_NOT_FOUND', 404);
  }
}

export class EntFailoverConfigCreateError extends AppError {
  constructor(message = 'Impossible de créer la configuration de basculement') {
    super(message, 'ENT_FAILOVER_CONFIG_CREATE_ERROR', 500);
  }
}

export class EntFailoverConfigUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la configuration de basculement') {
    super(message, 'ENT_FAILOVER_CONFIG_UPDATE_ERROR', 500);
  }
}

export class EntFailoverConfigDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la configuration de basculement') {
    super(message, 'ENT_FAILOVER_CONFIG_DELETE_ERROR', 500);
  }
}

// FailoverEvent
export class EntFailoverEventNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Événement de basculement (${identifier}) introuvable` : 'Événement de basculement introuvable';
    super(msg, 'ENT_FAILOVER_EVENT_NOT_FOUND', 404);
  }
}

export class EntFailoverEventCreateError extends AppError {
  constructor(message = "Impossible de créer l'événement de basculement") {
    super(message, 'ENT_FAILOVER_EVENT_CREATE_ERROR', 500);
  }
}

export class EntFailoverEventUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'événement de basculement") {
    super(message, 'ENT_FAILOVER_EVENT_UPDATE_ERROR', 500);
  }
}

export class EntFailoverEventDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'événement de basculement") {
    super(message, 'ENT_FAILOVER_EVENT_DELETE_ERROR', 500);
  }
}

// Replication
export class EntReplicationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réplication (${identifier}) introuvable` : 'Réplication introuvable';
    super(msg, 'ENT_REPLICATION_NOT_FOUND', 404);
  }
}

export class EntReplicationCreateError extends AppError {
  constructor(message = 'Impossible de créer la réplication') {
    super(message, 'ENT_REPLICATION_CREATE_ERROR', 500);
  }
}

export class EntReplicationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la réplication') {
    super(message, 'ENT_REPLICATION_UPDATE_ERROR', 500);
  }
}

export class EntReplicationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la réplication') {
    super(message, 'ENT_REPLICATION_DELETE_ERROR', 500);
  }
}

// GeoReplication
export class EntGeoReplicationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réplication géo (${identifier}) introuvable` : 'Réplication géo introuvable';
    super(msg, 'ENT_GEO_REPLICATION_NOT_FOUND', 404);
  }
}

export class EntGeoReplicationCreateError extends AppError {
  constructor(message = 'Impossible de créer la réplication géo') {
    super(message, 'ENT_GEO_REPLICATION_CREATE_ERROR', 500);
  }
}

export class EntGeoReplicationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la réplication géo') {
    super(message, 'ENT_GEO_REPLICATION_UPDATE_ERROR', 500);
  }
}

export class EntGeoReplicationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la réplication géo') {
    super(message, 'ENT_GEO_REPLICATION_DELETE_ERROR', 500);
  }
}

// HealthCheck
export class EntHealthCheckNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vérification de santé (${identifier}) introuvable` : 'Vérification de santé introuvable';
    super(msg, 'ENT_HEALTH_CHECK_NOT_FOUND', 404);
  }
}

export class EntHealthCheckCreateError extends AppError {
  constructor(message = 'Impossible de créer la vérification de santé') {
    super(message, 'ENT_HEALTH_CHECK_CREATE_ERROR', 500);
  }
}

export class EntHealthCheckUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la vérification de santé') {
    super(message, 'ENT_HEALTH_CHECK_UPDATE_ERROR', 500);
  }
}

export class EntHealthCheckDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la vérification de santé') {
    super(message, 'ENT_HEALTH_CHECK_DELETE_ERROR', 500);
  }
}

// HealthStatus
export class EntHealthStatusNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `État de santé (${identifier}) introuvable` : 'État de santé introuvable';
    super(msg, 'ENT_HEALTH_STATUS_NOT_FOUND', 404);
  }
}

export class EntHealthStatusCreateError extends AppError {
  constructor(message = "Impossible de créer l'état de santé") {
    super(message, 'ENT_HEALTH_STATUS_CREATE_ERROR', 500);
  }
}

export class EntHealthStatusUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'état de santé") {
    super(message, 'ENT_HEALTH_STATUS_UPDATE_ERROR', 500);
  }
}

export class EntHealthStatusDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'état de santé") {
    super(message, 'ENT_HEALTH_STATUS_DELETE_ERROR', 500);
  }
}

// AutoRecovery
export class EntAutoRecoveryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Récupération automatique (${identifier}) introuvable` : 'Récupération automatique introuvable';
    super(msg, 'ENT_AUTO_RECOVERY_NOT_FOUND', 404);
  }
}

export class EntAutoRecoveryCreateError extends AppError {
  constructor(message = 'Impossible de créer la récupération automatique') {
    super(message, 'ENT_AUTO_RECOVERY_CREATE_ERROR', 500);
  }
}

export class EntAutoRecoveryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la récupération automatique') {
    super(message, 'ENT_AUTO_RECOVERY_UPDATE_ERROR', 500);
  }
}

export class EntAutoRecoveryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la récupération automatique') {
    super(message, 'ENT_AUTO_RECOVERY_DELETE_ERROR', 500);
  }
}

// RecoveryAttempt
export class EntRecoveryAttemptNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tentative de récupération (${identifier}) introuvable` : 'Tentative de récupération introuvable';
    super(msg, 'ENT_RECOVERY_ATTEMPT_NOT_FOUND', 404);
  }
}

export class EntRecoveryAttemptCreateError extends AppError {
  constructor(message = 'Impossible de créer la tentative de récupération') {
    super(message, 'ENT_RECOVERY_ATTEMPT_CREATE_ERROR', 500);
  }
}

export class EntRecoveryAttemptUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la tentative de récupération') {
    super(message, 'ENT_RECOVERY_ATTEMPT_UPDATE_ERROR', 500);
  }
}

export class EntRecoveryAttemptDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la tentative de récupération') {
    super(message, 'ENT_RECOVERY_ATTEMPT_DELETE_ERROR', 500);
  }
}

// BackupSchedule
export class EntBackupScheduleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Planification de sauvegarde (${identifier}) introuvable` : 'Planification de sauvegarde introuvable';
    super(msg, 'ENT_BACKUP_SCHEDULE_NOT_FOUND', 404);
  }
}

export class EntBackupScheduleCreateError extends AppError {
  constructor(message = 'Impossible de créer la planification de sauvegarde') {
    super(message, 'ENT_BACKUP_SCHEDULE_CREATE_ERROR', 500);
  }
}

export class EntBackupScheduleUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la planification de sauvegarde') {
    super(message, 'ENT_BACKUP_SCHEDULE_UPDATE_ERROR', 500);
  }
}

export class EntBackupScheduleDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la planification de sauvegarde') {
    super(message, 'ENT_BACKUP_SCHEDULE_DELETE_ERROR', 500);
  }
}

// BackupJob
export class EntBackupJobNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Travail de sauvegarde (${identifier}) introuvable` : 'Travail de sauvegarde introuvable';
    super(msg, 'ENT_BACKUP_JOB_NOT_FOUND', 404);
  }
}

export class EntBackupJobCreateError extends AppError {
  constructor(message = 'Impossible de créer le travail de sauvegarde') {
    super(message, 'ENT_BACKUP_JOB_CREATE_ERROR', 500);
  }
}

export class EntBackupJobUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le travail de sauvegarde') {
    super(message, 'ENT_BACKUP_JOB_UPDATE_ERROR', 500);
  }
}

export class EntBackupJobDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le travail de sauvegarde') {
    super(message, 'ENT_BACKUP_JOB_DELETE_ERROR', 500);
  }
}

// DisasterRecoveryPlan
export class EntDisasterRecoveryPlanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Plan de reprise d'activité (${identifier}) introuvable` : "Plan de reprise d'activité introuvable";
    super(msg, 'ENT_DISASTER_RECOVERY_PLAN_NOT_FOUND', 404);
  }
}

export class EntDisasterRecoveryPlanCreateError extends AppError {
  constructor(message = "Impossible de créer le plan de reprise d'activité") {
    super(message, 'ENT_DISASTER_RECOVERY_PLAN_CREATE_ERROR', 500);
  }
}

export class EntDisasterRecoveryPlanUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le plan de reprise d'activité") {
    super(message, 'ENT_DISASTER_RECOVERY_PLAN_UPDATE_ERROR', 500);
  }
}

export class EntDisasterRecoveryPlanDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le plan de reprise d'activité") {
    super(message, 'ENT_DISASTER_RECOVERY_PLAN_DELETE_ERROR', 500);
  }
}

// DisasterRecoveryTest
export class EntDisasterRecoveryTestNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Test de reprise (${identifier}) introuvable` : 'Test de reprise introuvable';
    super(msg, 'ENT_DISASTER_RECOVERY_TEST_NOT_FOUND', 404);
  }
}

export class EntDisasterRecoveryTestCreateError extends AppError {
  constructor(message = 'Impossible de créer le test de reprise') {
    super(message, 'ENT_DISASTER_RECOVERY_TEST_CREATE_ERROR', 500);
  }
}

export class EntDisasterRecoveryTestUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le test de reprise') {
    super(message, 'ENT_DISASTER_RECOVERY_TEST_UPDATE_ERROR', 500);
  }
}

export class EntDisasterRecoveryTestDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le test de reprise') {
    super(message, 'ENT_DISASTER_RECOVERY_TEST_DELETE_ERROR', 500);
  }
}

// RegionConfig
export class EntRegionConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration de région (${identifier}) introuvable` : 'Configuration de région introuvable';
    super(msg, 'ENT_REGION_CONFIG_NOT_FOUND', 404);
  }
}

export class EntRegionConfigCreateError extends AppError {
  constructor(message = 'Impossible de créer la configuration de région') {
    super(message, 'ENT_REGION_CONFIG_CREATE_ERROR', 500);
  }
}

export class EntRegionConfigUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la configuration de région') {
    super(message, 'ENT_REGION_CONFIG_UPDATE_ERROR', 500);
  }
}

export class EntRegionConfigDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la configuration de région') {
    super(message, 'ENT_REGION_CONFIG_DELETE_ERROR', 500);
  }
}

// LoadBalancer
export class EntLoadBalancerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Équilibreur de charge (${identifier}) introuvable` : 'Équilibreur de charge introuvable';
    super(msg, 'ENT_LOAD_BALANCER_NOT_FOUND', 404);
  }
}

export class EntLoadBalancerCreateError extends AppError {
  constructor(message = "Impossible de créer l'équilibreur de charge") {
    super(message, 'ENT_LOAD_BALANCER_CREATE_ERROR', 500);
  }
}

export class EntLoadBalancerUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'équilibreur de charge") {
    super(message, 'ENT_LOAD_BALANCER_UPDATE_ERROR', 500);
  }
}

export class EntLoadBalancerDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'équilibreur de charge") {
    super(message, 'ENT_LOAD_BALANCER_DELETE_ERROR', 500);
  }
}

// ─── Domain 9: Data Lifecycle & Governance (56 errors) ──────────────────────

// DataLake
export class EntDataLakeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Lac de données (${identifier}) introuvable` : 'Lac de données introuvable';
    super(msg, 'ENT_DATA_LAKE_NOT_FOUND', 404);
  }
}

export class EntDataLakeCreateError extends AppError {
  constructor(message = 'Impossible de créer le lac de données') {
    super(message, 'ENT_DATA_LAKE_CREATE_ERROR', 500);
  }
}

export class EntDataLakeUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le lac de données') {
    super(message, 'ENT_DATA_LAKE_UPDATE_ERROR', 500);
  }
}

export class EntDataLakeDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le lac de données') {
    super(message, 'ENT_DATA_LAKE_DELETE_ERROR', 500);
  }
}

// DataLakeDataset
export class EntDataLakeDatasetNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Jeu de données (${identifier}) introuvable` : 'Jeu de données introuvable';
    super(msg, 'ENT_DATA_LAKE_DATASET_NOT_FOUND', 404);
  }
}

export class EntDataLakeDatasetCreateError extends AppError {
  constructor(message = 'Impossible de créer le jeu de données') {
    super(message, 'ENT_DATA_LAKE_DATASET_CREATE_ERROR', 500);
  }
}

export class EntDataLakeDatasetUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le jeu de données') {
    super(message, 'ENT_DATA_LAKE_DATASET_UPDATE_ERROR', 500);
  }
}

export class EntDataLakeDatasetDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le jeu de données') {
    super(message, 'ENT_DATA_LAKE_DATASET_DELETE_ERROR', 500);
  }
}

// DataArchive
export class EntDataArchiveNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Archivage (${identifier}) introuvable` : 'Archivage introuvable';
    super(msg, 'ENT_DATA_ARCHIVE_NOT_FOUND', 404);
  }
}

export class EntDataArchiveCreateError extends AppError {
  constructor(message = "Impossible de créer l'archivage") {
    super(message, 'ENT_DATA_ARCHIVE_CREATE_ERROR', 500);
  }
}

export class EntDataArchiveUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'archivage") {
    super(message, 'ENT_DATA_ARCHIVE_UPDATE_ERROR', 500);
  }
}

export class EntDataArchiveDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'archivage") {
    super(message, 'ENT_DATA_ARCHIVE_DELETE_ERROR', 500);
  }
}

// DataSnapshot
export class EntDataSnapshotNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Instantané (${identifier}) introuvable` : 'Instantané introuvable';
    super(msg, 'ENT_DATA_SNAPSHOT_NOT_FOUND', 404);
  }
}

export class EntDataSnapshotCreateError extends AppError {
  constructor(message = "Impossible de créer l'instantané") {
    super(message, 'ENT_DATA_SNAPSHOT_CREATE_ERROR', 500);
  }
}

export class EntDataSnapshotUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'instantané") {
    super(message, 'ENT_DATA_SNAPSHOT_UPDATE_ERROR', 500);
  }
}

export class EntDataSnapshotDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'instantané") {
    super(message, 'ENT_DATA_SNAPSHOT_DELETE_ERROR', 500);
  }
}

// HistoricalStorage
export class EntHistoricalStorageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Stockage historique (${identifier}) introuvable` : 'Stockage historique introuvable';
    super(msg, 'ENT_HISTORICAL_STORAGE_NOT_FOUND', 404);
  }
}

export class EntHistoricalStorageCreateError extends AppError {
  constructor(message = 'Impossible de créer le stockage historique') {
    super(message, 'ENT_HISTORICAL_STORAGE_CREATE_ERROR', 500);
  }
}

export class EntHistoricalStorageUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le stockage historique') {
    super(message, 'ENT_HISTORICAL_STORAGE_UPDATE_ERROR', 500);
  }
}

export class EntHistoricalStorageDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le stockage historique') {
    super(message, 'ENT_HISTORICAL_STORAGE_DELETE_ERROR', 500);
  }
}

// DataGovernance
export class EntDataGovernanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Gouvernance (${identifier}) introuvable` : 'Gouvernance introuvable';
    super(msg, 'ENT_DATA_GOVERNANCE_NOT_FOUND', 404);
  }
}

export class EntDataGovernanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la gouvernance') {
    super(message, 'ENT_DATA_GOVERNANCE_CREATE_ERROR', 500);
  }
}

export class EntDataGovernanceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la gouvernance') {
    super(message, 'ENT_DATA_GOVERNANCE_UPDATE_ERROR', 500);
  }
}

export class EntDataGovernanceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la gouvernance') {
    super(message, 'ENT_DATA_GOVERNANCE_DELETE_ERROR', 500);
  }
}

// DataLineage
export class EntDataLineageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ligneage (${identifier}) introuvable` : 'Ligneage introuvable';
    super(msg, 'ENT_DATA_LINEAGE_NOT_FOUND', 404);
  }
}

export class EntDataLineageCreateError extends AppError {
  constructor(message = 'Impossible de créer le ligneage') {
    super(message, 'ENT_DATA_LINEAGE_CREATE_ERROR', 500);
  }
}

export class EntDataLineageUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le ligneage') {
    super(message, 'ENT_DATA_LINEAGE_UPDATE_ERROR', 500);
  }
}

export class EntDataLineageDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le ligneage') {
    super(message, 'ENT_DATA_LINEAGE_DELETE_ERROR', 500);
  }
}

// MetadataCatalog
export class EntMetadataCatalogNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Catalogue de métadonnées (${identifier}) introuvable` : 'Catalogue de métadonnées introuvable';
    super(msg, 'ENT_METADATA_CATALOG_NOT_FOUND', 404);
  }
}

export class EntMetadataCatalogCreateError extends AppError {
  constructor(message = 'Impossible de créer le catalogue de métadonnées') {
    super(message, 'ENT_METADATA_CATALOG_CREATE_ERROR', 500);
  }
}

export class EntMetadataCatalogUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le catalogue de métadonnées') {
    super(message, 'ENT_METADATA_CATALOG_UPDATE_ERROR', 500);
  }
}

export class EntMetadataCatalogDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le catalogue de métadonnées') {
    super(message, 'ENT_METADATA_CATALOG_DELETE_ERROR', 500);
  }
}

// DataQuality
export class EntDataQualityNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Qualité (${identifier}) introuvable` : 'Qualité introuvable';
    super(msg, 'ENT_DATA_QUALITY_NOT_FOUND', 404);
  }
}

export class EntDataQualityCreateError extends AppError {
  constructor(message = 'Impossible de créer la qualité') {
    super(message, 'ENT_DATA_QUALITY_CREATE_ERROR', 500);
  }
}

export class EntDataQualityUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la qualité') {
    super(message, 'ENT_DATA_QUALITY_UPDATE_ERROR', 500);
  }
}

export class EntDataQualityDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la qualité') {
    super(message, 'ENT_DATA_QUALITY_DELETE_ERROR', 500);
  }
}

// DataPipeline
export class EntDataPipelineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pipeline de données (${identifier}) introuvable` : 'Pipeline de données introuvable';
    super(msg, 'ENT_DATA_PIPELINE_NOT_FOUND', 404);
  }
}

export class EntDataPipelineCreateError extends AppError {
  constructor(message = 'Impossible de créer le pipeline de données') {
    super(message, 'ENT_DATA_PIPELINE_CREATE_ERROR', 500);
  }
}

export class EntDataPipelineUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le pipeline de données') {
    super(message, 'ENT_DATA_PIPELINE_UPDATE_ERROR', 500);
  }
}

export class EntDataPipelineDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le pipeline de données') {
    super(message, 'ENT_DATA_PIPELINE_DELETE_ERROR', 500);
  }
}

// DataRetention
export class EntDataRetentionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rétention (${identifier}) introuvable` : 'Rétention introuvable';
    super(msg, 'ENT_DATA_RETENTION_NOT_FOUND', 404);
  }
}

export class EntDataRetentionCreateError extends AppError {
  constructor(message = 'Impossible de créer la rétention') {
    super(message, 'ENT_DATA_RETENTION_CREATE_ERROR', 500);
  }
}

export class EntDataRetentionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la rétention') {
    super(message, 'ENT_DATA_RETENTION_UPDATE_ERROR', 500);
  }
}

export class EntDataRetentionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la rétention') {
    super(message, 'ENT_DATA_RETENTION_DELETE_ERROR', 500);
  }
}

// DataClassification
export class EntDataClassificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Classification (${identifier}) introuvable` : 'Classification introuvable';
    super(msg, 'ENT_DATA_CLASSIFICATION_NOT_FOUND', 404);
  }
}

export class EntDataClassificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la classification') {
    super(message, 'ENT_DATA_CLASSIFICATION_CREATE_ERROR', 500);
  }
}

export class EntDataClassificationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la classification') {
    super(message, 'ENT_DATA_CLASSIFICATION_UPDATE_ERROR', 500);
  }
}

export class EntDataClassificationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la classification') {
    super(message, 'ENT_DATA_CLASSIFICATION_DELETE_ERROR', 500);
  }
}

// DataEncryption
export class EntDataEncryptionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Chiffrement (${identifier}) introuvable` : 'Chiffrement introuvable';
    super(msg, 'ENT_DATA_ENCRYPTION_NOT_FOUND', 404);
  }
}

export class EntDataEncryptionCreateError extends AppError {
  constructor(message = 'Impossible de créer le chiffrement') {
    super(message, 'ENT_DATA_ENCRYPTION_CREATE_ERROR', 500);
  }
}

export class EntDataEncryptionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le chiffrement') {
    super(message, 'ENT_DATA_ENCRYPTION_UPDATE_ERROR', 500);
  }
}

export class EntDataEncryptionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le chiffrement') {
    super(message, 'ENT_DATA_ENCRYPTION_DELETE_ERROR', 500);
  }
}

// DataAccessPolicy
export class EntDataAccessPolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique d'accès aux données (${identifier}) introuvable` : "Politique d'accès aux données introuvable";
    super(msg, 'ENT_DATA_ACCESS_POLICY_NOT_FOUND', 404);
  }
}

export class EntDataAccessPolicyCreateError extends AppError {
  constructor(message = "Impossible de créer la politique d'accès aux données") {
    super(message, 'ENT_DATA_ACCESS_POLICY_CREATE_ERROR', 500);
  }
}

export class EntDataAccessPolicyUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour la politique d'accès aux données") {
    super(message, 'ENT_DATA_ACCESS_POLICY_UPDATE_ERROR', 500);
  }
}

export class EntDataAccessPolicyDeleteError extends AppError {
  constructor(message = "Impossible de supprimer la politique d'accès aux données") {
    super(message, 'ENT_DATA_ACCESS_POLICY_DELETE_ERROR', 500);
  }
}

// ─── Domain 10: CI/CD & DevOps (56 errors) ──────────────────────────────────

// CIPipeline
export class EntCiPipelineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pipeline CI (${identifier}) introuvable` : 'Pipeline CI introuvable';
    super(msg, 'ENT_CI_PIPELINE_NOT_FOUND', 404);
  }
}

export class EntCiPipelineCreateError extends AppError {
  constructor(message = 'Impossible de créer le pipeline CI') {
    super(message, 'ENT_CI_PIPELINE_CREATE_ERROR', 500);
  }
}

export class EntCiPipelineUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le pipeline CI') {
    super(message, 'ENT_CI_PIPELINE_UPDATE_ERROR', 500);
  }
}

export class EntCiPipelineDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le pipeline CI') {
    super(message, 'ENT_CI_PIPELINE_DELETE_ERROR', 500);
  }
}

// CIRun
export class EntCiRunNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exécution CI (${identifier}) introuvable` : 'Exécution CI introuvable';
    super(msg, 'ENT_CI_RUN_NOT_FOUND', 404);
  }
}

export class EntCiRunCreateError extends AppError {
  constructor(message = "Impossible de créer l'exécution CI") {
    super(message, 'ENT_CI_RUN_CREATE_ERROR', 500);
  }
}

export class EntCiRunUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'exécution CI") {
    super(message, 'ENT_CI_RUN_UPDATE_ERROR', 500);
  }
}

export class EntCiRunDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'exécution CI") {
    super(message, 'ENT_CI_RUN_DELETE_ERROR', 500);
  }
}

// QualityGate
export class EntQualityGateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Porte de qualité (${identifier}) introuvable` : 'Porte de qualité introuvable';
    super(msg, 'ENT_QUALITY_GATE_NOT_FOUND', 404);
  }
}

export class EntQualityGateCreateError extends AppError {
  constructor(message = 'Impossible de créer la porte de qualité') {
    super(message, 'ENT_QUALITY_GATE_CREATE_ERROR', 500);
  }
}

export class EntQualityGateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la porte de qualité') {
    super(message, 'ENT_QUALITY_GATE_UPDATE_ERROR', 500);
  }
}

export class EntQualityGateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la porte de qualité') {
    super(message, 'ENT_QUALITY_GATE_DELETE_ERROR', 500);
  }
}

// QualityGateResult
export class EntQualityGateResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résultat (${identifier}) introuvable` : 'Résultat introuvable';
    super(msg, 'ENT_QUALITY_GATE_RESULT_NOT_FOUND', 404);
  }
}

export class EntQualityGateResultCreateError extends AppError {
  constructor(message = 'Impossible de créer le résultat') {
    super(message, 'ENT_QUALITY_GATE_RESULT_CREATE_ERROR', 500);
  }
}

export class EntQualityGateResultUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le résultat') {
    super(message, 'ENT_QUALITY_GATE_RESULT_UPDATE_ERROR', 500);
  }
}

export class EntQualityGateResultDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le résultat') {
    super(message, 'ENT_QUALITY_GATE_RESULT_DELETE_ERROR', 500);
  }
}

// ReleaseNote
export class EntReleaseNoteNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Note de version (${identifier}) introuvable` : 'Note de version introuvable';
    super(msg, 'ENT_RELEASE_NOTE_NOT_FOUND', 404);
  }
}

export class EntReleaseNoteCreateError extends AppError {
  constructor(message = 'Impossible de créer la note de version') {
    super(message, 'ENT_RELEASE_NOTE_CREATE_ERROR', 500);
  }
}

export class EntReleaseNoteUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la note de version') {
    super(message, 'ENT_RELEASE_NOTE_UPDATE_ERROR', 500);
  }
}

export class EntReleaseNoteDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la note de version') {
    super(message, 'ENT_RELEASE_NOTE_DELETE_ERROR', 500);
  }
}

// BuildDashboard
export class EntBuildDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord de build (${identifier}) introuvable` : 'Tableau de bord de build introuvable';
    super(msg, 'ENT_BUILD_DASHBOARD_NOT_FOUND', 404);
  }
}

export class EntBuildDashboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau de bord de build') {
    super(message, 'ENT_BUILD_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class EntBuildDashboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tableau de bord de build') {
    super(message, 'ENT_BUILD_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class EntBuildDashboardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tableau de bord de build') {
    super(message, 'ENT_BUILD_DASHBOARD_DELETE_ERROR', 500);
  }
}

// TestDashboard
export class EntTestDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord de test (${identifier}) introuvable` : 'Tableau de bord de test introuvable';
    super(msg, 'ENT_TEST_DASHBOARD_NOT_FOUND', 404);
  }
}

export class EntTestDashboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau de bord de test') {
    super(message, 'ENT_TEST_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class EntTestDashboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tableau de bord de test') {
    super(message, 'ENT_TEST_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class EntTestDashboardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tableau de bord de test') {
    super(message, 'ENT_TEST_DASHBOARD_DELETE_ERROR', 500);
  }
}

// CoverageDashboard
export class EntCoverageDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord de couverture (${identifier}) introuvable` : 'Tableau de bord de couverture introuvable';
    super(msg, 'ENT_COVERAGE_DASHBOARD_NOT_FOUND', 404);
  }
}

export class EntCoverageDashboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau de bord de couverture') {
    super(message, 'ENT_COVERAGE_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class EntCoverageDashboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tableau de bord de couverture') {
    super(message, 'ENT_COVERAGE_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class EntCoverageDashboardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tableau de bord de couverture') {
    super(message, 'ENT_COVERAGE_DASHBOARD_DELETE_ERROR', 500);
  }
}

// CodeReview
export class EntCodeReviewNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Revue de code (${identifier}) introuvable` : 'Revue de code introuvable';
    super(msg, 'ENT_CODE_REVIEW_NOT_FOUND', 404);
  }
}

export class EntCodeReviewCreateError extends AppError {
  constructor(message = 'Impossible de créer la revue de code') {
    super(message, 'ENT_CODE_REVIEW_CREATE_ERROR', 500);
  }
}

export class EntCodeReviewUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la revue de code') {
    super(message, 'ENT_CODE_REVIEW_UPDATE_ERROR', 500);
  }
}

export class EntCodeReviewDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la revue de code') {
    super(message, 'ENT_CODE_REVIEW_DELETE_ERROR', 500);
  }
}

// SecurityScan
export class EntSecurityScanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Scan de sécurité (${identifier}) introuvable` : 'Scan de sécurité introuvable';
    super(msg, 'ENT_SECURITY_SCAN_NOT_FOUND', 404);
  }
}

export class EntSecurityScanCreateError extends AppError {
  constructor(message = 'Impossible de créer le scan de sécurité') {
    super(message, 'ENT_SECURITY_SCAN_CREATE_ERROR', 500);
  }
}

export class EntSecurityScanUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le scan de sécurité') {
    super(message, 'ENT_SECURITY_SCAN_UPDATE_ERROR', 500);
  }
}

export class EntSecurityScanDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le scan de sécurité') {
    super(message, 'ENT_SECURITY_SCAN_DELETE_ERROR', 500);
  }
}

// DependencyScan
export class EntDependencyScanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Scan de dépendances (${identifier}) introuvable` : 'Scan de dépendances introuvable';
    super(msg, 'ENT_DEPENDENCY_SCAN_NOT_FOUND', 404);
  }
}

export class EntDependencyScanCreateError extends AppError {
  constructor(message = 'Impossible de créer le scan de dépendances') {
    super(message, 'ENT_DEPENDENCY_SCAN_CREATE_ERROR', 500);
  }
}

export class EntDependencyScanUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le scan de dépendances') {
    super(message, 'ENT_DEPENDENCY_SCAN_UPDATE_ERROR', 500);
  }
}

export class EntDependencyScanDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le scan de dépendances') {
    super(message, 'ENT_DEPENDENCY_SCAN_DELETE_ERROR', 500);
  }
}

// InfrastructureCode
export class EntInfrastructureCodeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Code d'infrastructure (${identifier}) introuvable` : "Code d'infrastructure introuvable";
    super(msg, 'ENT_INFRASTRUCTURE_CODE_NOT_FOUND', 404);
  }
}

export class EntInfrastructureCodeCreateError extends AppError {
  constructor(message = "Impossible de créer le code d'infrastructure") {
    super(message, 'ENT_INFRASTRUCTURE_CODE_CREATE_ERROR', 500);
  }
}

export class EntInfrastructureCodeUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le code d'infrastructure") {
    super(message, 'ENT_INFRASTRUCTURE_CODE_UPDATE_ERROR', 500);
  }
}

export class EntInfrastructureCodeDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le code d'infrastructure") {
    super(message, 'ENT_INFRASTRUCTURE_CODE_DELETE_ERROR', 500);
  }
}

// ContainerImage
export class EntContainerImageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Image conteneur (${identifier}) introuvable` : 'Image conteneur introuvable';
    super(msg, 'ENT_CONTAINER_IMAGE_NOT_FOUND', 404);
  }
}

export class EntContainerImageCreateError extends AppError {
  constructor(message = "Impossible de créer l'image conteneur") {
    super(message, 'ENT_CONTAINER_IMAGE_CREATE_ERROR', 500);
  }
}

export class EntContainerImageUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'image conteneur") {
    super(message, 'ENT_CONTAINER_IMAGE_UPDATE_ERROR', 500);
  }
}

export class EntContainerImageDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'image conteneur") {
    super(message, 'ENT_CONTAINER_IMAGE_DELETE_ERROR', 500);
  }
}

// HelmChart
export class EntHelmChartNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Chart Helm (${identifier}) introuvable` : 'Chart Helm introuvable';
    super(msg, 'ENT_HELM_CHART_NOT_FOUND', 404);
  }
}

export class EntHelmChartCreateError extends AppError {
  constructor(message = 'Impossible de créer le chart Helm') {
    super(message, 'ENT_HELM_CHART_CREATE_ERROR', 500);
  }
}

export class EntHelmChartUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le chart Helm') {
    super(message, 'ENT_HELM_CHART_UPDATE_ERROR', 500);
  }
}

export class EntHelmChartDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le chart Helm') {
    super(message, 'ENT_HELM_CHART_DELETE_ERROR', 500);
  }
}

// ─── Domain 11: Developer Platform (64 errors) ──────────────────────────────

// SDK
export class EntSdkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SDK (${identifier}) introuvable` : 'SDK introuvable';
    super(msg, 'ENT_SDK_NOT_FOUND', 404);
  }
}

export class EntSdkCreateError extends AppError {
  constructor(message = 'Impossible de créer le SDK') {
    super(message, 'ENT_SDK_CREATE_ERROR', 500);
  }
}

export class EntSdkUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le SDK') {
    super(message, 'ENT_SDK_UPDATE_ERROR', 500);
  }
}

export class EntSdkDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le SDK') {
    super(message, 'ENT_SDK_DELETE_ERROR', 500);
  }
}

// SDKRelease
export class EntSdkReleaseNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Version SDK (${identifier}) introuvable` : 'Version SDK introuvable';
    super(msg, 'ENT_SDK_RELEASE_NOT_FOUND', 404);
  }
}

export class EntSdkReleaseCreateError extends AppError {
  constructor(message = 'Impossible de créer la version SDK') {
    super(message, 'ENT_SDK_RELEASE_CREATE_ERROR', 500);
  }
}

export class EntSdkReleaseUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la version SDK') {
    super(message, 'ENT_SDK_RELEASE_UPDATE_ERROR', 500);
  }
}

export class EntSdkReleaseDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la version SDK') {
    super(message, 'ENT_SDK_RELEASE_DELETE_ERROR', 500);
  }
}

// CLI
export class EntCliNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `CLI (${identifier}) introuvable` : 'CLI introuvable';
    super(msg, 'ENT_CLI_NOT_FOUND', 404);
  }
}

export class EntCliCreateError extends AppError {
  constructor(message = 'Impossible de créer le CLI') {
    super(message, 'ENT_CLI_CREATE_ERROR', 500);
  }
}

export class EntCliUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le CLI') {
    super(message, 'ENT_CLI_UPDATE_ERROR', 500);
  }
}

export class EntCliDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le CLI') {
    super(message, 'ENT_CLI_DELETE_ERROR', 500);
  }
}

// APIDocumentation
export class EntApiDocumentationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Documentation API (${identifier}) introuvable` : 'Documentation API introuvable';
    super(msg, 'ENT_API_DOCUMENTATION_NOT_FOUND', 404);
  }
}

export class EntApiDocumentationCreateError extends AppError {
  constructor(message = 'Impossible de créer la documentation API') {
    super(message, 'ENT_API_DOCUMENTATION_CREATE_ERROR', 500);
  }
}

export class EntApiDocumentationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la documentation API') {
    super(message, 'ENT_API_DOCUMENTATION_UPDATE_ERROR', 500);
  }
}

export class EntApiDocumentationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la documentation API') {
    super(message, 'ENT_API_DOCUMENTATION_DELETE_ERROR', 500);
  }
}

// OpenAPISpec
export class EntOpenApiSpecNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Spécification OpenAPI (${identifier}) introuvable` : 'Spécification OpenAPI introuvable';
    super(msg, 'ENT_OPEN_API_SPEC_NOT_FOUND', 404);
  }
}

export class EntOpenApiSpecCreateError extends AppError {
  constructor(message = 'Impossible de créer la spécification OpenAPI') {
    super(message, 'ENT_OPEN_API_SPEC_CREATE_ERROR', 500);
  }
}

export class EntOpenApiSpecUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la spécification OpenAPI') {
    super(message, 'ENT_OPEN_API_SPEC_UPDATE_ERROR', 500);
  }
}

export class EntOpenApiSpecDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la spécification OpenAPI') {
    super(message, 'ENT_OPEN_API_SPEC_DELETE_ERROR', 500);
  }
}

// GraphQLSchema
export class EntGraphqlSchemaNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Schéma GraphQL (${identifier}) introuvable` : 'Schéma GraphQL introuvable';
    super(msg, 'ENT_GRAPHQL_SCHEMA_NOT_FOUND', 404);
  }
}

export class EntGraphqlSchemaCreateError extends AppError {
  constructor(message = 'Impossible de créer le schéma GraphQL') {
    super(message, 'ENT_GRAPHQL_SCHEMA_CREATE_ERROR', 500);
  }
}

export class EntGraphqlSchemaUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le schéma GraphQL') {
    super(message, 'ENT_GRAPHQL_SCHEMA_UPDATE_ERROR', 500);
  }
}

export class EntGraphqlSchemaDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le schéma GraphQL') {
    super(message, 'ENT_GRAPHQL_SCHEMA_DELETE_ERROR', 500);
  }
}

// DeveloperPortal
export class EntDeveloperPortalNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Portail développeur (${identifier}) introuvable` : 'Portail développeur introuvable';
    super(msg, 'ENT_DEVELOPER_PORTAL_NOT_FOUND', 404);
  }
}

export class EntDeveloperPortalCreateError extends AppError {
  constructor(message = 'Impossible de créer le portail développeur') {
    super(message, 'ENT_DEVELOPER_PORTAL_CREATE_ERROR', 500);
  }
}

export class EntDeveloperPortalUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le portail développeur') {
    super(message, 'ENT_DEVELOPER_PORTAL_UPDATE_ERROR', 500);
  }
}

export class EntDeveloperPortalDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le portail développeur') {
    super(message, 'ENT_DEVELOPER_PORTAL_DELETE_ERROR', 500);
  }
}

// DeveloperApp
export class EntDeveloperAppNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Application développeur (${identifier}) introuvable` : 'Application développeur introuvable';
    super(msg, 'ENT_DEVELOPER_APP_NOT_FOUND', 404);
  }
}

export class EntDeveloperAppCreateError extends AppError {
  constructor(message = "Impossible de créer l'application développeur") {
    super(message, 'ENT_DEVELOPER_APP_CREATE_ERROR', 500);
  }
}

export class EntDeveloperAppUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'application développeur") {
    super(message, 'ENT_DEVELOPER_APP_UPDATE_ERROR', 500);
  }
}

export class EntDeveloperAppDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'application développeur") {
    super(message, 'ENT_DEVELOPER_APP_DELETE_ERROR', 500);
  }
}

// Sandbox
export class EntSandboxNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Sandbox (${identifier}) introuvable` : 'Sandbox introuvable';
    super(msg, 'ENT_SANDBOX_NOT_FOUND', 404);
  }
}

export class EntSandboxCreateError extends AppError {
  constructor(message = 'Impossible de créer la sandbox') {
    super(message, 'ENT_SANDBOX_CREATE_ERROR', 500);
  }
}

export class EntSandboxUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la sandbox') {
    super(message, 'ENT_SANDBOX_UPDATE_ERROR', 500);
  }
}

export class EntSandboxDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la sandbox') {
    super(message, 'ENT_SANDBOX_DELETE_ERROR', 500);
  }
}

// SandboxInstance
export class EntSandboxInstanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Instance de sandbox (${identifier}) introuvable` : 'Instance de sandbox introuvable';
    super(msg, 'ENT_SANDBOX_INSTANCE_NOT_FOUND', 404);
  }
}

export class EntSandboxInstanceCreateError extends AppError {
  constructor(message = "Impossible de créer l'instance de sandbox") {
    super(message, 'ENT_SANDBOX_INSTANCE_CREATE_ERROR', 500);
  }
}

export class EntSandboxInstanceUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'instance de sandbox") {
    super(message, 'ENT_SANDBOX_INSTANCE_UPDATE_ERROR', 500);
  }
}

export class EntSandboxInstanceDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'instance de sandbox") {
    super(message, 'ENT_SANDBOX_INSTANCE_DELETE_ERROR', 500);
  }
}

// APIUsage
export class EntApiUsageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Utilisation API (${identifier}) introuvable` : 'Utilisation API introuvable';
    super(msg, 'ENT_API_USAGE_NOT_FOUND', 404);
  }
}

export class EntApiUsageCreateError extends AppError {
  constructor(message = "Impossible de créer l'utilisation API") {
    super(message, 'ENT_API_USAGE_CREATE_ERROR', 500);
  }
}

export class EntApiUsageUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'utilisation API") {
    super(message, 'ENT_API_USAGE_UPDATE_ERROR', 500);
  }
}

export class EntApiUsageDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'utilisation API") {
    super(message, 'ENT_API_USAGE_DELETE_ERROR', 500);
  }
}

// Webhook (Developer Platform)
export class EntDeveloperWebhookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Webhook développeur (${identifier}) introuvable` : 'Webhook développeur introuvable';
    super(msg, 'ENT_DEVELOPER_WEBHOOK_NOT_FOUND', 404);
  }
}

export class EntDeveloperWebhookCreateError extends AppError {
  constructor(message = 'Impossible de créer le webhook développeur') {
    super(message, 'ENT_DEVELOPER_WEBHOOK_CREATE_ERROR', 500);
  }
}

export class EntDeveloperWebhookUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le webhook développeur') {
    super(message, 'ENT_DEVELOPER_WEBHOOK_UPDATE_ERROR', 500);
  }
}

export class EntDeveloperWebhookDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le webhook développeur') {
    super(message, 'ENT_DEVELOPER_WEBHOOK_DELETE_ERROR', 500);
  }
}

// DeveloperDocumentation
export class EntDeveloperDocumentationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Documentation développeur (${identifier}) introuvable` : 'Documentation développeur introuvable';
    super(msg, 'ENT_DEVELOPER_DOCUMENTATION_NOT_FOUND', 404);
  }
}

export class EntDeveloperDocumentationCreateError extends AppError {
  constructor(message = 'Impossible de créer la documentation développeur') {
    super(message, 'ENT_DEVELOPER_DOCUMENTATION_CREATE_ERROR', 500);
  }
}

export class EntDeveloperDocumentationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la documentation développeur') {
    super(message, 'ENT_DEVELOPER_DOCUMENTATION_UPDATE_ERROR', 500);
  }
}

export class EntDeveloperDocumentationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la documentation développeur') {
    super(message, 'ENT_DEVELOPER_DOCUMENTATION_DELETE_ERROR', 500);
  }
}

// SDKExample
export class EntSdkExampleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exemple SDK (${identifier}) introuvable` : 'Exemple SDK introuvable';
    super(msg, 'ENT_SDK_EXAMPLE_NOT_FOUND', 404);
  }
}

export class EntSdkExampleCreateError extends AppError {
  constructor(message = "Impossible de créer l'exemple SDK") {
    super(message, 'ENT_SDK_EXAMPLE_CREATE_ERROR', 500);
  }
}

export class EntSdkExampleUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'exemple SDK") {
    super(message, 'ENT_SDK_EXAMPLE_UPDATE_ERROR', 500);
  }
}

export class EntSdkExampleDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'exemple SDK") {
    super(message, 'ENT_SDK_EXAMPLE_DELETE_ERROR', 500);
  }
}

// RateLimit
export class EntRateLimitNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Limite de débit (${identifier}) introuvable` : 'Limite de débit introuvable';
    super(msg, 'ENT_RATE_LIMIT_NOT_FOUND', 404);
  }
}

export class EntRateLimitCreateError extends AppError {
  constructor(message = 'Impossible de créer la limite de débit') {
    super(message, 'ENT_RATE_LIMIT_CREATE_ERROR', 500);
  }
}

export class EntRateLimitUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la limite de débit') {
    super(message, 'ENT_RATE_LIMIT_UPDATE_ERROR', 500);
  }
}

export class EntRateLimitDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la limite de débit') {
    super(message, 'ENT_RATE_LIMIT_DELETE_ERROR', 500);
  }
}

// OAuthApp
export class EntOAuthAppNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Application OAuth (${identifier}) introuvable` : 'Application OAuth introuvable';
    super(msg, 'ENT_OAUTH_APP_NOT_FOUND', 404);
  }
}

export class EntOAuthAppCreateError extends AppError {
  constructor(message = "Impossible de créer l'application OAuth") {
    super(message, 'ENT_OAUTH_APP_CREATE_ERROR', 500);
  }
}

export class EntOAuthAppUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'application OAuth") {
    super(message, 'ENT_OAUTH_APP_UPDATE_ERROR', 500);
  }
}

export class EntOAuthAppDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'application OAuth") {
    super(message, 'ENT_OAUTH_APP_DELETE_ERROR', 500);
  }
}

// ─── Domain 12: Production Readiness (64 errors) ────────────────────────────

// ProductionHealthCheck
export class EntProductionHealthCheckNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vérification de santé (${identifier}) introuvable` : 'Vérification de santé introuvable';
    super(msg, 'ENT_PRODUCTION_HEALTH_CHECK_NOT_FOUND', 404);
  }
}

export class EntProductionHealthCheckCreateError extends AppError {
  constructor(message = 'Impossible de créer la vérification de santé') {
    super(message, 'ENT_PRODUCTION_HEALTH_CHECK_CREATE_ERROR', 500);
  }
}

export class EntProductionHealthCheckUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la vérification de santé') {
    super(message, 'ENT_PRODUCTION_HEALTH_CHECK_UPDATE_ERROR', 500);
  }
}

export class EntProductionHealthCheckDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la vérification de santé') {
    super(message, 'ENT_PRODUCTION_HEALTH_CHECK_DELETE_ERROR', 500);
  }
}

// DiagnosticRun
export class EntDiagnosticRunNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Diagnostic (${identifier}) introuvable` : 'Diagnostic introuvable';
    super(msg, 'ENT_DIAGNOSTIC_RUN_NOT_FOUND', 404);
  }
}

export class EntDiagnosticRunCreateError extends AppError {
  constructor(message = 'Impossible de créer le diagnostic') {
    super(message, 'ENT_DIAGNOSTIC_RUN_CREATE_ERROR', 500);
  }
}

export class EntDiagnosticRunUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le diagnostic') {
    super(message, 'ENT_DIAGNOSTIC_RUN_UPDATE_ERROR', 500);
  }
}

export class EntDiagnosticRunDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le diagnostic') {
    super(message, 'ENT_DIAGNOSTIC_RUN_DELETE_ERROR', 500);
  }
}

// ProductionAudit
export class EntProductionAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit de production (${identifier}) introuvable` : 'Audit de production introuvable';
    super(msg, 'ENT_PRODUCTION_AUDIT_NOT_FOUND', 404);
  }
}

export class EntProductionAuditCreateError extends AppError {
  constructor(message = "Impossible de créer l'audit de production") {
    super(message, 'ENT_PRODUCTION_AUDIT_CREATE_ERROR', 500);
  }
}

export class EntProductionAuditUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'audit de production") {
    super(message, 'ENT_PRODUCTION_AUDIT_UPDATE_ERROR', 500);
  }
}

export class EntProductionAuditDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'audit de production") {
    super(message, 'ENT_PRODUCTION_AUDIT_DELETE_ERROR', 500);
  }
}

// PerformanceBenchmark
export class EntPerformanceBenchmarkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Benchmark de performance (${identifier}) introuvable` : 'Benchmark de performance introuvable';
    super(msg, 'ENT_PERFORMANCE_BENCHMARK_NOT_FOUND', 404);
  }
}

export class EntPerformanceBenchmarkCreateError extends AppError {
  constructor(message = 'Impossible de créer le benchmark de performance') {
    super(message, 'ENT_PERFORMANCE_BENCHMARK_CREATE_ERROR', 500);
  }
}

export class EntPerformanceBenchmarkUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le benchmark de performance') {
    super(message, 'ENT_PERFORMANCE_BENCHMARK_UPDATE_ERROR', 500);
  }
}

export class EntPerformanceBenchmarkDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le benchmark de performance') {
    super(message, 'ENT_PERFORMANCE_BENCHMARK_DELETE_ERROR', 500);
  }
}

// SecurityBenchmark
export class EntSecurityBenchmarkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Benchmark de sécurité (${identifier}) introuvable` : 'Benchmark de sécurité introuvable';
    super(msg, 'ENT_SECURITY_BENCHMARK_NOT_FOUND', 404);
  }
}

export class EntSecurityBenchmarkCreateError extends AppError {
  constructor(message = 'Impossible de créer le benchmark de sécurité') {
    super(message, 'ENT_SECURITY_BENCHMARK_CREATE_ERROR', 500);
  }
}

export class EntSecurityBenchmarkUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le benchmark de sécurité') {
    super(message, 'ENT_SECURITY_BENCHMARK_UPDATE_ERROR', 500);
  }
}

export class EntSecurityBenchmarkDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le benchmark de sécurité') {
    super(message, 'ENT_SECURITY_BENCHMARK_DELETE_ERROR', 500);
  }
}

// ScalabilityBenchmark
export class EntScalabilityBenchmarkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Benchmark de scalabilité (${identifier}) introuvable` : 'Benchmark de scalabilité introuvable';
    super(msg, 'ENT_SCALABILITY_BENCHMARK_NOT_FOUND', 404);
  }
}

export class EntScalabilityBenchmarkCreateError extends AppError {
  constructor(message = 'Impossible de créer le benchmark de scalabilité') {
    super(message, 'ENT_SCALABILITY_BENCHMARK_CREATE_ERROR', 500);
  }
}

export class EntScalabilityBenchmarkUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le benchmark de scalabilité') {
    super(message, 'ENT_SCALABILITY_BENCHMARK_UPDATE_ERROR', 500);
  }
}

export class EntScalabilityBenchmarkDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le benchmark de scalabilité') {
    super(message, 'ENT_SCALABILITY_BENCHMARK_DELETE_ERROR', 500);
  }
}

// CompatibilityMatrix
export class EntCompatibilityMatrixNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Matrice de compatibilité (${identifier}) introuvable` : 'Matrice de compatibilité introuvable';
    super(msg, 'ENT_COMPATIBILITY_MATRIX_NOT_FOUND', 404);
  }
}

export class EntCompatibilityMatrixCreateError extends AppError {
  constructor(message = 'Impossible de créer la matrice de compatibilité') {
    super(message, 'ENT_COMPATIBILITY_MATRIX_CREATE_ERROR', 500);
  }
}

export class EntCompatibilityMatrixUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la matrice de compatibilité') {
    super(message, 'ENT_COMPATIBILITY_MATRIX_UPDATE_ERROR', 500);
  }
}

export class EntCompatibilityMatrixDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la matrice de compatibilité') {
    super(message, 'ENT_COMPATIBILITY_MATRIX_DELETE_ERROR', 500);
  }
}

// ProductionCertificate
export class EntProductionCertificateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Certificat de production (${identifier}) introuvable` : 'Certificat de production introuvable';
    super(msg, 'ENT_PRODUCTION_CERTIFICATE_NOT_FOUND', 404);
  }
}

export class EntProductionCertificateCreateError extends AppError {
  constructor(message = 'Impossible de créer le certificat de production') {
    super(message, 'ENT_PRODUCTION_CERTIFICATE_CREATE_ERROR', 500);
  }
}

export class EntProductionCertificateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le certificat de production') {
    super(message, 'ENT_PRODUCTION_CERTIFICATE_UPDATE_ERROR', 500);
  }
}

export class EntProductionCertificateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le certificat de production') {
    super(message, 'ENT_PRODUCTION_CERTIFICATE_DELETE_ERROR', 500);
  }
}

// LoadTest
export class EntLoadTestNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Test de charge (${identifier}) introuvable` : 'Test de charge introuvable';
    super(msg, 'ENT_LOAD_TEST_NOT_FOUND', 404);
  }
}

export class EntLoadTestCreateError extends AppError {
  constructor(message = 'Impossible de créer le test de charge') {
    super(message, 'ENT_LOAD_TEST_CREATE_ERROR', 500);
  }
}

export class EntLoadTestUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le test de charge') {
    super(message, 'ENT_LOAD_TEST_UPDATE_ERROR', 500);
  }
}

export class EntLoadTestDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le test de charge') {
    super(message, 'ENT_LOAD_TEST_DELETE_ERROR', 500);
  }
}

// StressTest
export class EntStressTestNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Test de stress (${identifier}) introuvable` : 'Test de stress introuvable';
    super(msg, 'ENT_STRESS_TEST_NOT_FOUND', 404);
  }
}

export class EntStressTestCreateError extends AppError {
  constructor(message = 'Impossible de créer le test de stress') {
    super(message, 'ENT_STRESS_TEST_CREATE_ERROR', 500);
  }
}

export class EntStressTestUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le test de stress') {
    super(message, 'ENT_STRESS_TEST_UPDATE_ERROR', 500);
  }
}

export class EntStressTestDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le test de stress') {
    super(message, 'ENT_STRESS_TEST_DELETE_ERROR', 500);
  }
}

// EnduranceTest
export class EntEnduranceTestNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Test d'endurance (${identifier}) introuvable` : "Test d'endurance introuvable";
    super(msg, 'ENT_ENDURANCE_TEST_NOT_FOUND', 404);
  }
}

export class EntEnduranceTestCreateError extends AppError {
  constructor(message = "Impossible de créer le test d'endurance") {
    super(message, 'ENT_ENDURANCE_TEST_CREATE_ERROR', 500);
  }
}

export class EntEnduranceTestUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour le test d'endurance") {
    super(message, 'ENT_ENDURANCE_TEST_UPDATE_ERROR', 500);
  }
}

export class EntEnduranceTestDeleteError extends AppError {
  constructor(message = "Impossible de supprimer le test d'endurance") {
    super(message, 'ENT_ENDURANCE_TEST_DELETE_ERROR', 500);
  }
}

// CapacityPlan
export class EntCapacityPlanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Plan de capacité (${identifier}) introuvable` : 'Plan de capacité introuvable';
    super(msg, 'ENT_CAPACITY_PLAN_NOT_FOUND', 404);
  }
}

export class EntCapacityPlanCreateError extends AppError {
  constructor(message = 'Impossible de créer le plan de capacité') {
    super(message, 'ENT_CAPACITY_PLAN_CREATE_ERROR', 500);
  }
}

export class EntCapacityPlanUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le plan de capacité') {
    super(message, 'ENT_CAPACITY_PLAN_UPDATE_ERROR', 500);
  }
}

export class EntCapacityPlanDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le plan de capacité') {
    super(message, 'ENT_CAPACITY_PLAN_DELETE_ERROR', 500);
  }
}

// ProductionRunbook
export class EntProductionRunbookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Manuel opérationnel (${identifier}) introuvable` : 'Manuel opérationnel introuvable';
    super(msg, 'ENT_PRODUCTION_RUNBOOK_NOT_FOUND', 404);
  }
}

export class EntProductionRunbookCreateError extends AppError {
  constructor(message = 'Impossible de créer le manuel opérationnel') {
    super(message, 'ENT_PRODUCTION_RUNBOOK_CREATE_ERROR', 500);
  }
}

export class EntProductionRunbookUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le manuel opérationnel') {
    super(message, 'ENT_PRODUCTION_RUNBOOK_UPDATE_ERROR', 500);
  }
}

export class EntProductionRunbookDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le manuel opérationnel') {
    super(message, 'ENT_PRODUCTION_RUNBOOK_DELETE_ERROR', 500);
  }
}

// IncidentPostmortem
export class EntIncidentPostmortemNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Post-mortem (${identifier}) introuvable` : 'Post-mortem introuvable';
    super(msg, 'ENT_INCIDENT_POSTMORTEM_NOT_FOUND', 404);
  }
}

export class EntIncidentPostmortemCreateError extends AppError {
  constructor(message = 'Impossible de créer le post-mortem') {
    super(message, 'ENT_INCIDENT_POSTMORTEM_CREATE_ERROR', 500);
  }
}

export class EntIncidentPostmortemUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le post-mortem') {
    super(message, 'ENT_INCIDENT_POSTMORTEM_UPDATE_ERROR', 500);
  }
}

export class EntIncidentPostmortemDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le post-mortem') {
    super(message, 'ENT_INCIDENT_POSTMORTEM_DELETE_ERROR', 500);
  }
}

// ProductionChecklist
export class EntProductionChecklistNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Liste de contrôle (${identifier}) introuvable` : 'Liste de contrôle introuvable';
    super(msg, 'ENT_PRODUCTION_CHECKLIST_NOT_FOUND', 404);
  }
}

export class EntProductionChecklistCreateError extends AppError {
  constructor(message = 'Impossible de créer la liste de contrôle') {
    super(message, 'ENT_PRODUCTION_CHECKLIST_CREATE_ERROR', 500);
  }
}

export class EntProductionChecklistUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la liste de contrôle') {
    super(message, 'ENT_PRODUCTION_CHECKLIST_UPDATE_ERROR', 500);
  }
}

export class EntProductionChecklistDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la liste de contrôle') {
    super(message, 'ENT_PRODUCTION_CHECKLIST_DELETE_ERROR', 500);
  }
}

// GoLiveApproval
export class EntGoLiveApprovalNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Approbation de mise en production (${identifier}) introuvable` : 'Approbation de mise en production introuvable';
    super(msg, 'ENT_GO_LIVE_APPROVAL_NOT_FOUND', 404);
  }
}

export class EntGoLiveApprovalCreateError extends AppError {
  constructor(message = "Impossible de créer l'approbation de mise en production") {
    super(message, 'ENT_GO_LIVE_APPROVAL_CREATE_ERROR', 500);
  }
}

export class EntGoLiveApprovalUpdateError extends AppError {
  constructor(message = "Impossible de mettre à jour l'approbation de mise en production") {
    super(message, 'ENT_GO_LIVE_APPROVAL_UPDATE_ERROR', 500);
  }
}

export class EntGoLiveApprovalDeleteError extends AppError {
  constructor(message = "Impossible de supprimer l'approbation de mise en production") {
    super(message, 'ENT_GO_LIVE_APPROVAL_DELETE_ERROR', 500);
  }
}

// ─── Generic / Aliases ────────────────────────────────────────────────────────

export class EntNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ressource enterprise (${identifier}) introuvable` : 'Ressource enterprise introuvable';
    super(msg, 'ENT_NOT_FOUND', 404);
  }
}

export class EntWebhookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Webhook (${identifier}) introuvable` : 'Webhook introuvable';
    super(msg, 'ENT_WEBHOOK_NOT_FOUND', 404);
  }
}

export class EntOauthAppNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Application OAuth (${identifier}) introuvable` : 'Application OAuth introuvable';
    super(msg, 'ENT_OAUTH_APP_NOT_FOUND', 404);
  }
}
