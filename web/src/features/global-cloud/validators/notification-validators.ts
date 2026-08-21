import { z } from 'zod'

const schoolId = z.string().uuid()

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Core Schemas
// ============================================================================

const BaseNotificationSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().optional(),
})

const CreateBaseNotificationSchema = BaseNotificationSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
})

const UpdateBaseNotificationSchema = BaseNotificationSchema.partial().required({ id: true })

// ============================================================================
// Channel-Specific Create Schemas
// ============================================================================

const CreateEmailNotificationSchema = z.object({
  school_id: schoolId,
  from_email: z.string().email(),
  from_name: z.string().optional(),
  to_email: z.string().email(),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  subject: z.string(),
  html_body: z.string().optional(),
  text_body: z.string().optional(),
  headers: z.record(z.string()).optional(),
  reply_to: z.string().email().optional(),
  template_id: z.string().uuid().optional(),
  template_vars: z.record(z.unknown()).optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('EMAIL'),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateSMSNotificationSchema = z.object({
  school_id: schoolId,
  from_number: z.string(),
  to_number: z.string(),
  message: z.string(),
  encoding: z.string().optional(),
  sender_id: z.string().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('SMS'),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreatePushNotificationSchema = z.object({
  school_id: schoolId,
  device_tokens: z.array(z.string()),
  platform: z.enum(['ios', 'android', 'web']),
  title: z.string(),
  body: z.string(),
  image_url: z.string().url().optional(),
  action_url: z.string().url().optional(),
  badge_count: z.number().int().min(0).optional(),
  sound: z.string().optional(),
  category: z.string().optional(),
  ttl: z.number().int().min(0).optional(),
  collapse_id: z.string().optional(),
  silent: z.boolean().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('PUSH'),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateWhatsAppNotificationSchema = z.object({
  school_id: schoolId,
  from_number: z.string(),
  to_number: z.string(),
  template_name: z.string().optional(),
  template_vars: z.record(z.unknown()).optional(),
  body: z.string(),
  media_url: z.string().url().optional(),
  media_type: z.enum(['image', 'video', 'audio', 'document']).optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('WHATSAPP'),
  title: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateTelegramNotificationSchema = z.object({
  school_id: schoolId,
  chat_id: z.string(),
  message: z.string(),
  parse_mode: z.enum(['HTML', 'Markdown', 'MarkdownV2']).optional(),
  reply_markup: z.record(z.unknown()).optional(),
  photo: z.string().optional(),
  document: z.string().optional(),
  disable_notification: z.boolean().optional(),
  disable_web_page_preview: z.boolean().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('TELEGRAM'),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateTeamsNotificationSchema = z.object({
  school_id: schoolId,
  webhook_url: z.string().url(),
  title: z.string(),
  body: z.string(),
  summary: z.string().optional(),
  color: z.string().optional(),
  theme_color: z.string().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('TEAMS'),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateSlackNotificationSchema = z.object({
  school_id: schoolId,
  slack_channel: z.string(),
  title: z.string(),
  body: z.string(),
  fallback: z.string().optional(),
  color: z.string().optional(),
  pretext: z.string().optional(),
  image_url: z.string().url().optional(),
  thumb_url: z.string().url().optional(),
  footer: z.string().optional(),
  blocks: z.array(z.record(z.unknown())).optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('SLACK'),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateVoiceNotificationSchema = z.object({
  school_id: schoolId,
  to_number: z.string(),
  from_number: z.string(),
  script: z.string(),
  language: z.string().optional(),
  voice: z.enum(['male', 'female', 'neutral']).optional(),
  speed: z.number().min(0.5).max(2).optional(),
  max_duration: z.number().int().min(1).optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('VOICE'),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateInAppNotificationSchema = z.object({
  school_id: schoolId,
  inbox_type: z.enum(['PRIMARY', 'TRANSACTIONAL', 'PROMOTIONAL', 'SOCIAL', 'UPDATES', 'ALERTS']),
  action_url: z.string().url().optional(),
  icon: z.string().optional(),
  image_url: z.string().url().optional(),
  pinned: z.boolean().optional(),
  expires_at: z.string().optional(),
  cta_label: z.string().optional(),
  cta_url: z.string().url().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('IN_APP'),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const CreateWebhookNotificationSchema = z.object({
  school_id: schoolId,
  webhook_url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  headers: z.record(z.string()).optional(),
  payload: z.record(z.unknown()),
  secret: z.string().optional(),
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  channel: z.literal('WEBHOOK'),
  title: z.string(),
  body: z.string(),
  sender_id: z.string().uuid().optional(),
  recipient_id: z.string().uuid(),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']),
  metadata: z.record(z.unknown()).optional(),
})

const UpdateEmailNotificationSchema = CreateEmailNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateSMSNotificationSchema = CreateSMSNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdatePushNotificationSchema = CreatePushNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateWhatsAppNotificationSchema = CreateWhatsAppNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateTelegramNotificationSchema = CreateTelegramNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateTeamsNotificationSchema = CreateTeamsNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateSlackNotificationSchema = CreateSlackNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateVoiceNotificationSchema = CreateVoiceNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateInAppNotificationSchema = CreateInAppNotificationSchema.partial().extend({ id: z.string().uuid() })
const UpdateWebhookNotificationSchema = CreateWebhookNotificationSchema.partial().extend({ id: z.string().uuid() })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Config & Templates
// ============================================================================

const NotificationConfigSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  enabled_channels: z.array(z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA'])),
  default_priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY']),
  default_format: z.enum(['TEXT', 'HTML', 'MARKDOWN', 'RICH', 'TEMPLATE', 'DYNAMIC']),
  rate_limits: z.object({
    global: z.number().int().min(0),
    per_user: z.number().int().min(0),
    per_tenant: z.number().int().min(0),
    per_channel: z.record(z.number().int().min(0)),
    scope: z.enum(['GLOBAL', 'PER_USER', 'PER_TENANT', 'PER_CHANNEL', 'PER_TEMPLATE']),
    window_seconds: z.number().int().min(1),
  }),
  quiet_hours: z.object({
    enabled: z.boolean(),
    start_hour: z.number().int().min(0).max(23),
    end_hour: z.number().int().min(0).max(23),
    timezone: z.string(),
    action: z.enum(['DELAY', 'SKIP', 'QUEUE', 'SEND_ANYWAY']),
  }),
  retry_policy: z.object({
    policy: z.enum(['NONE', 'FIXED_INTERVAL', 'EXPONENTIAL_BACKOFF', 'LINEAR', 'CUSTOM']),
    max_retries: z.number().int().min(0),
    base_interval_ms: z.number().int().min(0),
    max_interval_ms: z.number().int().min(0),
    backoff_multiplier: z.number().min(1).optional(),
  }),
  delivery_optimization: z.enum(['NONE', 'BEST_TIME', 'SMART', 'BATCHED', 'RATE_LIMITED']),
  multi_channel_strategy: z.enum(['PREFERRED_ONLY', 'ALL_CHANNELS', 'SMART_FALLBACK', 'SEQUENTIAL', 'PARALLEL']),
  content_safety: z.enum(['NONE', 'BASIC', 'STRICT', 'CUSTOM']),
  localization: z.enum(['SINGLE_LANGUAGE', 'MULTI_LANGUAGE', 'AUTO_TRANSLATE']),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationConfigSchema = NotificationConfigSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationConfigSchema = NotificationConfigSchema.partial().required({ id: true })

const NotificationTemplateSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'VOICE', 'IN_APP']),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED', 'TESTING']),
  subject: z.string().optional(),
  body: z.string(),
  format: z.enum(['TEXT', 'HTML', 'MARKDOWN', 'RICH', 'TEMPLATE', 'DYNAMIC']),
  variables: z.array(z.string()),
  locale: z.string().optional(),
  is_default: z.boolean().optional(),
  version: z.number().int().min(1),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().optional(),
})

const CreateNotificationTemplateSchema = NotificationTemplateSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
})

const UpdateNotificationTemplateSchema = NotificationTemplateSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Batching & Scheduling
// ============================================================================

const NotificationBatchSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string().optional(),
  mode: z.enum(['NONE', 'INDIVIDUAL', 'BULK', 'SEGMENT', 'ALL']),
  status: z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED']),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  template_id: z.string().uuid().optional(),
  total_count: z.number().int().min(0),
  sent_count: z.number().int().min(0),
  failed_count: z.number().int().min(0),
  delivered_count: z.number().int().min(0),
  batch_config: z.object({
    chunk_size: z.number().int().min(1),
    delay_between_chunks_ms: z.number().int().min(0),
    max_concurrent: z.number().int().min(1),
  }).optional(),
  started_at: z.string().optional(),
  completed_at: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationBatchSchema = NotificationBatchSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationBatchSchema = NotificationBatchSchema.partial().required({ id: true })

const NotificationScheduleSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  type: z.enum(['IMMEDIATE', 'DELAYED', 'RECURRING', 'CRON', 'EVENT_DRIVEN']),
  status: z.enum(['PENDING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED']),
  template_id: z.string().uuid().optional(),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  audience_type: z.enum(['ALL_USERS', 'ROLE_BASED', 'SEGMENT', 'INDIVIDUAL', 'SCHOOL', 'REGION', 'CUSTOM']),
  cron_expression: z.string().optional(),
  delay_minutes: z.number().int().min(0).optional(),
  timezone: z.string(),
  start_date: z.string(),
  end_date: z.string().optional(),
  last_run_at: z.string().optional(),
  next_run_at: z.string().optional(),
  run_count: z.number().int().min(0),
  config: z.record(z.unknown()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationScheduleSchema = NotificationScheduleSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationScheduleSchema = NotificationScheduleSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Delivery & Tracking
// ============================================================================

const NotificationDeliverySchema = z.object({
  id: z.string().uuid(),
  notification_id: z.string().uuid(),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  status: z.enum(['PENDING', 'SENT', 'DELIVERED', 'OPENED', 'CLICKED', 'FAILED', 'BOUNCED']),
  provider: z.string().optional(),
  provider_message_id: z.string().optional(),
  attempts: z.number().int().min(0),
  last_attempt_at: z.string().optional(),
  delivered_at: z.string().optional(),
  error_code: z.string().optional(),
  error_message: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationDeliverySchema = NotificationDeliverySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationDeliverySchema = NotificationDeliverySchema.partial().required({ id: true })

const NotificationUnsubscribeSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  user_id: z.string().uuid(),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  group: z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING']).optional(),
  reason: z.enum(['NOT_INTERESTED', 'TOO_FREQUENT', 'IRRELEVANT', 'SPAM', 'OTHER']),
  reason_text: z.string().optional(),
  unsubscribed_at: z.string(),
})

const CreateNotificationUnsubscribeSchema = NotificationUnsubscribeSchema.omit({ id: true })
const UpdateNotificationUnsubscribeSchema = NotificationUnsubscribeSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Audience & Targeting
// ============================================================================

const AudienceSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  type: z.enum(['ALL_USERS', 'ROLE_BASED', 'SEGMENT', 'INDIVIDUAL', 'SCHOOL', 'REGION', 'CUSTOM']),
  segment: z.enum(['STUDENTS', 'TEACHERS', 'PARENTS', 'ADMINS', 'STAFF', 'ALUMNI', 'EMPLOYERS', 'CUSTOM']).optional(),
  user_count: z.number().int().min(0).optional(),
  last_calculated_at: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateAudienceSchema = AudienceSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateAudienceSchema = AudienceSchema.partial().required({ id: true })

const GeoTargetSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  type: z.enum(['COUNTRY', 'REGION', 'CITY', 'RADIUS', 'POLYGON', 'POSTAL_CODE']),
  coordinates: z.array(z.object({ lat: z.number(), lng: z.number() })),
  radius_km: z.number().min(0).optional(),
  postal_codes: z.array(z.string()).optional(),
  country_code: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateGeoTargetSchema = GeoTargetSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateGeoTargetSchema = GeoTargetSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Emergency
// ============================================================================

const EmergencyAlertSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  title: z.string(),
  body: z.string(),
  level: z.enum(['NORMAL', 'ELEVATED', 'HIGH', 'SEVERE', 'EXTREME']),
  type: z.enum(['WEATHER', 'SECURITY', 'HEALTH', 'INFRASTRUCTURE', 'FIRE', 'EVACUATION', 'LOCKDOWN']),
  source: z.enum(['MANUAL', 'AUTOMATED', 'IOT', 'AI', 'EXTERNAL', 'SCHEDULED']),
  channels: z.array(z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA'])),
  audience_type: z.enum(['ALL_USERS', 'ROLE_BASED', 'SEGMENT', 'INDIVIDUAL', 'SCHOOL', 'REGION', 'CUSTOM']),
  geo_target_id: z.string().uuid().optional(),
  requires_ack: z.boolean(),
  ack_deadline_minutes: z.number().int().min(0).optional(),
  repeat_interval_minutes: z.number().int().min(0).optional(),
  expires_at: z.string(),
  created_by: z.string().uuid().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateEmergencyAlertSchema = EmergencyAlertSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateEmergencyAlertSchema = EmergencyAlertSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Preferences & Settings
// ============================================================================

const NotificationPreferenceSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  user_id: z.string().uuid(),
  channel_preferences: z.array(z.object({
    channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
    enabled: z.boolean(),
    preference: z.enum(['PREFERRED', 'ALL', 'NONE', 'DAILY_DIGEST', 'WEEKLY_SUMMARY']),
    opt_status: z.enum(['OPTED_IN', 'OPTED_OUT', 'PENDING', 'UNSUBSCRIBED']),
    groups: z.array(z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING'])).optional(),
  })),
  quiet_hours: z.object({
    enabled: z.boolean(),
    start_hour: z.number().int().min(0).max(23),
    end_hour: z.number().int().min(0).max(23),
    timezone: z.string(),
    action: z.enum(['DELAY', 'SKIP', 'QUEUE', 'SEND_ANYWAY']),
  }).optional(),
  digest_frequency: z.enum(['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM']).optional(),
  enabled_groups: z.array(z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING'])),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationPreferenceSchema = NotificationPreferenceSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationPreferenceSchema = NotificationPreferenceSchema.partial().required({ id: true })

const NotificationSettingSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  key: z.string(),
  value: z.string(),
  description: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationSettingSchema = NotificationSettingSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationSettingSchema = NotificationSettingSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Inbox & Read
// ============================================================================

const NotificationInboxSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  user_id: z.string().uuid(),
  notification_id: z.string().uuid(),
  inbox_type: z.enum(['PRIMARY', 'TRANSACTIONAL', 'PROMOTIONAL', 'SOCIAL', 'UPDATES', 'ALERTS']),
  is_read: z.boolean(),
  is_archived: z.boolean(),
  is_pinned: z.boolean(),
  read_at: z.string().optional(),
  archived_at: z.string().optional(),
  created_at: z.string(),
})

const CreateNotificationInboxSchema = NotificationInboxSchema.omit({
  id: true,
  created_at: true,
})

const UpdateNotificationInboxSchema = NotificationInboxSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - A/B Testing
// ============================================================================

const ABTestSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['DRAFT', 'RUNNING', 'COMPLETED', 'ANALYZED']),
  notification_a_id: z.string().uuid(),
  notification_b_id: z.string().uuid(),
  split_percentage: z.number().min(0).max(100),
  winner_variant: z.enum(['A', 'B', 'TIE']).optional(),
  sample_size: z.number().int().min(0).optional(),
  confidence_level: z.number().min(0).max(1).optional(),
  started_at: z.string().optional(),
  ended_at: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateABTestSchema = ABTestSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateABTestSchema = ABTestSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Analytics & Reports
// ============================================================================

const NotificationAnalyticsDataSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  period_start: z.string(),
  period_end: z.string(),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  total_sent: z.number().int().min(0),
  total_delivered: z.number().int().min(0),
  total_opened: z.number().int().min(0),
  total_clicked: z.number().int().min(0),
  total_bounced: z.number().int().min(0),
  total_failed: z.number().int().min(0),
  total_converted: z.number().int().min(0),
  open_rate: z.number().min(0).max(100),
  click_rate: z.number().min(0).max(100),
  bounce_rate: z.number().min(0).max(100),
  conversion_rate: z.number().min(0).max(100),
  created_at: z.string(),
})

const CreateNotificationAnalyticsDataSchema = NotificationAnalyticsDataSchema.omit({
  id: true,
  created_at: true,
})

const UpdateNotificationAnalyticsDataSchema = NotificationAnalyticsDataSchema.partial().required({ id: true })

const NotificationReportSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  type: z.string(),
  date_from: z.string(),
  date_to: z.string(),
  channels: z.array(z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA'])).optional(),
  groups: z.array(z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING'])).optional(),
  data: z.record(z.unknown()),
  generated_at: z.string(),
  created_by: z.string().uuid().optional(),
  created_at: z.string(),
})

const CreateNotificationReportSchema = NotificationReportSchema.omit({
  id: true,
  created_at: true,
})

const UpdateNotificationReportSchema = NotificationReportSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Webhooks
// ============================================================================

const NotificationWebhookSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  name: z.string(),
  url: z.string().url(),
  secret: z.string(),
  events: z.array(z.enum(['CREATED', 'UPDATED', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'OPENED', 'CLICKED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED', 'CONVERTED', 'UNSUBSCRIBED', 'ACKNOWLEDGED'])),
  active: z.boolean(),
  headers: z.record(z.string()).optional(),
  retry_count: z.number().int().min(0),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().optional(),
})

const CreateNotificationWebhookSchema = NotificationWebhookSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
})

const UpdateNotificationWebhookSchema = NotificationWebhookSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Rate Limiting & Queues
// ============================================================================

const NotificationRateLimitSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  scope: z.enum(['GLOBAL', 'PER_USER', 'PER_TENANT', 'PER_CHANNEL', 'PER_TEMPLATE']),
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  limit: z.number().int().min(0),
  window_seconds: z.number().int().min(1),
  current_count: z.number().int().min(0),
  window_start: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationRateLimitSchema = NotificationRateLimitSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationRateLimitSchema = NotificationRateLimitSchema.partial().required({ id: true })

const NotificationQueueSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']),
  total_items: z.number().int().min(0),
  processed_items: z.number().int().min(0),
  failed_items: z.number().int().min(0),
  paused: z.boolean(),
  last_processed_at: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationQueueSchema = NotificationQueueSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationQueueSchema = NotificationQueueSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Audit & Compliance
// ============================================================================

const NotificationAuditSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  action: z.string(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  actor_id: z.string().uuid(),
  actor_role: z.string().optional(),
  changes: z.record(z.unknown()).optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  created_at: z.string(),
})

const CreateNotificationAuditSchema = NotificationAuditSchema.omit({ id: true, created_at: true })
const UpdateNotificationAuditSchema = NotificationAuditSchema.partial().required({ id: true })

const NotificationGDPRSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  user_id: z.string().uuid(),
  request_type: z.enum(['access', 'deletion', 'export', 'rectification', 'portability']),
  status: z.enum(['pending', 'in_progress', 'completed', 'denied']),
  requested_at: z.string(),
  completed_at: z.string().optional(),
  data_exported: z.boolean().optional(),
  notifications_deleted: z.boolean().optional(),
  notes: z.string().optional(),
  processed_by: z.string().uuid().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationGDPRSchema = NotificationGDPRSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationGDPRSchema = NotificationGDPRSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Dashboard & UI
// ============================================================================

const NotificationDashboardSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  user_id: z.string().uuid(),
  name: z.string(),
  layout: z.array(z.object({
    id: z.string().uuid(),
    dashboard_id: z.string().uuid(),
    type: z.enum(['chart', 'table', 'counter', 'list', 'timeline']),
    title: z.string(),
    config: z.record(z.unknown()),
    position: z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() }),
    refresh_interval_seconds: z.number().int().min(0).optional(),
    created_at: z.string(),
    updated_at: z.string(),
  })),
  is_default: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationDashboardSchema = NotificationDashboardSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationDashboardSchema = NotificationDashboardSchema.partial().required({ id: true })

const NotificationFilterSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  user_id: z.string().uuid(),
  name: z.string(),
  channel: z.array(z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA'])).optional(),
  status: z.array(z.enum(['PENDING', 'QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED', 'CANCELLED', 'EXPIRED'])).optional(),
  type: z.array(z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'REMINDER', 'ALERT', 'EMERGENCY', 'MARKETING', 'TRANSACTIONAL', 'SYSTEM'])).optional(),
  group: z.array(z.enum(['ACCOUNT', 'SECURITY', 'GRADES', 'ATTENDANCE', 'EVENTS', 'FINANCES', 'SYSTEM', 'MARKETING'])).optional(),
  priority: z.array(z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL', 'EMERGENCY'])).optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  search: z.string().optional(),
  is_global: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

const CreateNotificationFilterSchema = NotificationFilterSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

const UpdateNotificationFilterSchema = NotificationFilterSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Health & Monitoring
// ============================================================================

const NotificationHealthSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  status: z.enum(['healthy', 'degraded', 'down']),
  channels: z.array(z.object({
    channel: z.enum(['EMAIL', 'SMS', 'PUSH', 'WHATSAPP', 'TELEGRAM', 'TEAMS', 'SLACK', 'VOICE', 'IN_APP', 'WEBHOOK', 'SOCIAL_MEDIA']),
    status: z.enum(['healthy', 'degraded', 'down']),
    latency_ms: z.number().min(0),
    error_rate: z.number().min(0).max(100),
    provider_status: z.string().optional(),
    last_checked_at: z.string(),
  })),
  queue_depth: z.number().int().min(0),
  avg_delivery_time_ms: z.number().min(0),
  error_rate: z.number().min(0).max(100),
  checked_at: z.string(),
})

const CreateNotificationHealthSchema = NotificationHealthSchema.omit({ id: true })
const UpdateNotificationHealthSchema = NotificationHealthSchema.partial().required({ id: true })

const NotificationSystemAlertSchema = z.object({
  id: z.string().uuid(),
  school_id: schoolId,
  alert_type: z.string(),
  severity: z.enum(['NORMAL', 'ELEVATED', 'HIGH', 'SEVERE', 'EXTREME']),
  message: z.string(),
  source: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  acknowledged: z.boolean(),
  acknowledged_by: z.string().uuid().optional(),
  acknowledged_at: z.string().optional(),
  created_at: z.string(),
})

const CreateNotificationSystemAlertSchema = NotificationSystemAlertSchema.omit({
  id: true,
  created_at: true,
})

const UpdateNotificationSystemAlertSchema = NotificationSystemAlertSchema.partial().required({ id: true })

// ============================================================================
// MODULE 9: NOTIFICATION UNIFIED - Exports
// ============================================================================

export {
  CreateBaseNotificationSchema,
  UpdateBaseNotificationSchema,
  CreateEmailNotificationSchema,
  UpdateEmailNotificationSchema,
  CreateSMSNotificationSchema,
  UpdateSMSNotificationSchema,
  CreatePushNotificationSchema,
  UpdatePushNotificationSchema,
  CreateWhatsAppNotificationSchema,
  UpdateWhatsAppNotificationSchema,
  CreateTelegramNotificationSchema,
  UpdateTelegramNotificationSchema,
  CreateTeamsNotificationSchema,
  UpdateTeamsNotificationSchema,
  CreateSlackNotificationSchema,
  UpdateSlackNotificationSchema,
  CreateVoiceNotificationSchema,
  UpdateVoiceNotificationSchema,
  CreateInAppNotificationSchema,
  UpdateInAppNotificationSchema,
  CreateWebhookNotificationSchema,
  UpdateWebhookNotificationSchema,
  CreateNotificationConfigSchema,
  UpdateNotificationConfigSchema,
  CreateNotificationTemplateSchema,
  UpdateNotificationTemplateSchema,
  CreateNotificationBatchSchema,
  UpdateNotificationBatchSchema,
  CreateNotificationScheduleSchema,
  UpdateNotificationScheduleSchema,
  CreateNotificationDeliverySchema,
  UpdateNotificationDeliverySchema,
  CreateNotificationUnsubscribeSchema,
  UpdateNotificationUnsubscribeSchema,
  CreateAudienceSchema,
  UpdateAudienceSchema,
  CreateGeoTargetSchema,
  UpdateGeoTargetSchema,
  CreateEmergencyAlertSchema,
  UpdateEmergencyAlertSchema,
  CreateNotificationPreferenceSchema,
  UpdateNotificationPreferenceSchema,
  CreateNotificationSettingSchema,
  UpdateNotificationSettingSchema,
  CreateNotificationInboxSchema,
  UpdateNotificationInboxSchema,
  CreateABTestSchema,
  UpdateABTestSchema,
  CreateNotificationAnalyticsDataSchema,
  UpdateNotificationAnalyticsDataSchema,
  CreateNotificationReportSchema,
  UpdateNotificationReportSchema,
  CreateNotificationWebhookSchema,
  UpdateNotificationWebhookSchema,
  CreateNotificationRateLimitSchema,
  UpdateNotificationRateLimitSchema,
  CreateNotificationQueueSchema,
  UpdateNotificationQueueSchema,
  CreateNotificationAuditSchema,
  UpdateNotificationAuditSchema,
  CreateNotificationGDPRSchema,
  UpdateNotificationGDPRSchema,
  CreateNotificationDashboardSchema,
  UpdateNotificationDashboardSchema,
  CreateNotificationFilterSchema,
  UpdateNotificationFilterSchema,
  CreateNotificationHealthSchema,
  UpdateNotificationHealthSchema,
  CreateNotificationSystemAlertSchema,
  UpdateNotificationSystemAlertSchema,
}
