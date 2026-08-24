# Enterprise Administration Dashboard — EduCI Enterprise

## Overview

The Enterprise module provides a complete SaaS back-office for managing thousands of schools from a single interface. It handles school management, subscriptions, licenses, feature flags, monitoring, support, analytics, and system administration.

## Architecture

DDD pattern: Types → Validators → Repository → Services → Hooks → Pages → API

## API Routes (74 routes)

### Schools
- `/api/enterprise/schools` — School CRUD
- `/api/enterprise/schools/[schoolId]` — Single school
- `/api/enterprise/schools/[schoolId]/suspend` — Suspend school
- `/api/enterprise/schools/[schoolId]/activate` — Activate school
- `/api/enterprise/schools/[schoolId]/block` — Block school
- `/api/enterprise/schools/[schoolId]/archive` — Archive school
- `/api/enterprise/schools/[schoolId]/clone` — Clone school
- `/api/enterprise/schools/[schoolId]/migrate` — Migrate school
- `/api/enterprise/schools/[schoolId]/health` — School health
- `/api/enterprise/schools/[schoolId]/storage` — School storage
- `/api/enterprise/schools/[schoolId]/quota` — School quota

### Subscriptions
- `/api/enterprise/subscriptions` — Subscription CRUD
- `/api/enterprise/subscriptions/[id]` — Single subscription
- `/api/enterprise/subscriptions/[id]/cancel` — Cancel
- `/api/enterprise/subscriptions/[id]/renew` — Renew
- `/api/enterprise/subscriptions/[id]/change-plan` — Change plan

### Licenses
- `/api/enterprise/licenses` — License CRUD
- `/api/enterprise/licenses/[id]` — Single license
- `/api/enterprise/licenses/[id]/activate` — Activate
- `/api/enterprise/licenses/[id]/revoke` — Revoke
- `/api/enterprise/licenses/[id]/validate` — Validate

### Users
- `/api/enterprise/users` — User CRUD
- `/api/enterprise/users/[userId]` — Single user
- `/api/enterprise/users/[userId]/lock` — Lock
- `/api/enterprise/users/[userId]/unlock` — Unlock
- `/api/enterprise/users/[userId]/mfa/reset` — Reset MFA
- `/api/enterprise/users/[userId]/sessions` — Sessions
- `/api/enterprise/users/[userId]/sessions/[sid]/revoke` — Revoke session

### Tickets
- `/api/enterprise/tickets` — Ticket CRUD
- `/api/enterprise/tickets/[ticketId]` — Single ticket
- `/api/enterprise/tickets/[ticketId]/assign` — Assign
- `/api/enterprise/tickets/[ticketId]/escalate` — Escalate
- `/api/enterprise/tickets/[ticketId]/resolve` — Resolve
- `/api/enterprise/tickets/[ticketId]/close` — Close
- `/api/enterprise/tickets/[ticketId]/messages` — Messages

### Feature Flags
- `/api/enterprise/feature-flags` — Flag CRUD
- `/api/enterprise/feature-flags/[flagId]` — Single flag
- `/api/enterprise/feature-flags/[flagId]/toggle` — Toggle

### Audit
- `/api/enterprise/audit` — Audit logs
- `/api/enterprise/audit/stats` — Audit stats
- `/api/enterprise/audit/export` — Export audit

### Other
- `/api/enterprise/notifications` — Notifications
- `/api/enterprise/settings` — Settings
- `/api/enterprise/billing/cycles` — Billing cycles
- `/api/enterprise/storage/usage` — Storage usage
- `/api/enterprise/api-usage` — API usage
- `/api/enterprise/quotas` — Quotas
- `/api/enterprise/coupons` — Coupons
- `/api/enterprise/analytics/snapshot` — Analytics snapshot
- `/api/enterprise/analytics/range` — Analytics range
- `/api/enterprise/statistics` — Statistics
- `/api/enterprise/monitoring/events` — Monitoring events
- `/api/enterprise/monitoring/health` — System health
- `/api/enterprise/maintenance` — Maintenance windows
- `/api/enterprise/release-notes` — Release notes
- `/api/enterprise/dashboard` — Dashboard
- `/api/enterprise/search` — Search
- `/api/enterprise/export` — Export
- `/api/enterprise/import` — Import
- `/api/enterprise/sync` — Sync
- `/api/enterprise/timeline` — Timeline
- `/api/enterprise/health` — Health checks
- `/api/enterprise/alerts` — Alerts
- `/api/enterprise/reports` — Reports
- `/api/enterprise/webhooks` — Webhooks

## Services (40 services)

EnterpriseDashboardService, SchoolManagementService, SubscriptionService, LicenseService, EnterpriseUserService, EnterpriseRoleService, EnterpriseSessionService, EnterpriseAnalyticsService, EnterpriseStatisticsService, EnterpriseMonitoringService, EnterpriseMaintenanceService, EnterpriseReleaseNotesService, SupportTicketService, TicketMessageService, FeatureFlagService, EnterpriseAuditService, EnterpriseNotificationService, EnterpriseSettingsService, BillingService, StorageService, ApiUsageService, QuotaService, CouponService, EnterpriseValidationService, EnterprisePermissionService, EnterpriseSearchService, EnterpriseExportService, EnterpriseImportService, EnterpriseSyncService, EnterpriseTimelineService, EnterpriseSettingsEmailService, EnterpriseSettingsSmsService, EnterpriseSettingsPaymentService, EnterpriseSettingsSecurityService, EnterpriseSettingsBrandingService, EnterpriseHealthService, EnterpriseAlertService, EnterpriseReportService, EnterpriseCacheService, EnterpriseWebhookService

## Hooks (61 hooks)

All enterprise operations are exposed through React hooks.

## Configuration (20 sections)

ENTERPRISE_LIMITS, ENTERPRISE_PLANS, ENTERPRISE_LICENSE, ENTERPRISE_QUOTAS, ENTERPRISE_STORAGE, ENTERPRISE_ANALYTICS, ENTERPRISE_MONITORING, ENTERPRISE_FEATURE_FLAGS, ENTERPRISE_SECURITY, ENTERPRISE_AUDIT, ENTERPRISE_SUPER_ADMIN, ENTERPRISE_SUPPORT, ENTERPRISE_API, ENTERPRISE_EMAIL, ENTERPRISE_SMS, ENTERPRISE_NOTIFICATIONS, ENTERPRISE_BILLING, ENTERPRISE_MAINTENANCE

## Mobile Support

React Native screens for dashboard, school management, tickets, monitoring, feature flags, settings.
