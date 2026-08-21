// ============================================================================
// ENUMS
// ============================================================================

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WHATSAPP = "WHATSAPP",
  TELEGRAM = "TELEGRAM",
  TEAMS = "TEAMS",
  SLACK = "SLACK",
  VOICE = "VOICE",
  IN_APP = "IN_APP",
  WEBHOOK = "WEBHOOK",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
}

export enum NotificationType {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  REMINDER = "REMINDER",
  ALERT = "ALERT",
  EMERGENCY = "EMERGENCY",
  MARKETING = "MARKETING",
  TRANSACTIONAL = "TRANSACTIONAL",
  SYSTEM = "SYSTEM",
}

export enum NotificationStatus {
  PENDING = "PENDING",
  QUEUED = "QUEUED",
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  BOUNCED = "BOUNCED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum NotificationPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum NotificationFrequency {
  ONCE = "ONCE",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  CUSTOM = "CUSTOM",
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  OPENED = "OPENED",
  CLICKED = "CLICKED",
  FAILED = "FAILED",
  BOUNCED = "BOUNCED",
}

export enum MessageFormat {
  TEXT = "TEXT",
  HTML = "HTML",
  MARKDOWN = "MARKDOWN",
  RICH = "RICH",
  TEMPLATE = "TEMPLATE",
  DYNAMIC = "DYNAMIC",
}

export enum TemplateType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  WHATSAPP = "WHATSAPP",
  TELEGRAM = "TELEGRAM",
  VOICE = "VOICE",
  IN_APP = "IN_APP",
}

export enum TemplateStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  TESTING = "TESTING",
}

export enum AudienceType {
  ALL_USERS = "ALL_USERS",
  ROLE_BASED = "ROLE_BASED",
  SEGMENT = "SEGMENT",
  INDIVIDUAL = "INDIVIDUAL",
  SCHOOL = "SCHOOL",
  REGION = "REGION",
  CUSTOM = "CUSTOM",
}

export enum AudienceSegment {
  STUDENTS = "STUDENTS",
  TEACHERS = "TEACHERS",
  PARENTS = "PARENTS",
  ADMINS = "ADMINS",
  STAFF = "STAFF",
  ALUMNI = "ALUMNI",
  EMPLOYERS = "EMPLOYERS",
  CUSTOM = "CUSTOM",
}

export enum ScheduleType {
  IMMEDIATE = "IMMEDIATE",
  DELAYED = "DELAYED",
  RECURRING = "RECURRING",
  CRON = "CRON",
  EVENT_DRIVEN = "EVENT_DRIVEN",
}

export enum ScheduleStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum GeoTargetType {
  COUNTRY = "COUNTRY",
  REGION = "REGION",
  CITY = "CITY",
  RADIUS = "RADIUS",
  POLYGON = "POLYGON",
  POSTAL_CODE = "POSTAL_CODE",
}

export enum EmergencyLevel {
  NORMAL = "NORMAL",
  ELEVATED = "ELEVATED",
  HIGH = "HIGH",
  SEVERE = "SEVERE",
  EXTREME = "EXTREME",
}

export enum EmergencyType {
  WEATHER = "WEATHER",
  SECURITY = "SECURITY",
  HEALTH = "HEALTH",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  FIRE = "FIRE",
  EVACUATION = "EVACUATION",
  LOCKDOWN = "LOCKDOWN",
}

export enum AlertSource {
  MANUAL = "MANUAL",
  AUTOMATED = "AUTOMATED",
  IOT = "IOT",
  AI = "AI",
  EXTERNAL = "EXTERNAL",
  SCHEDULED = "SCHEDULED",
}

export enum ChannelPreference {
  PREFERRED = "PREFERRED",
  ALL = "ALL",
  NONE = "NONE",
  DAILY_DIGEST = "DAILY_DIGEST",
  WEEKLY_SUMMARY = "WEEKLY_SUMMARY",
}

export enum OptInOutStatus {
  OPTED_IN = "OPTED_IN",
  OPTED_OUT = "OPTED_OUT",
  PENDING = "PENDING",
  UNSUBSCRIBED = "UNSUBSCRIBED",
}

export enum DeliveryOptimization {
  NONE = "NONE",
  BEST_TIME = "BEST_TIME",
  SMART = "SMART",
  BATCHED = "BATCHED",
  RATE_LIMITED = "RATE_LIMITED",
}

export enum ContentPersonalization {
  NONE = "NONE",
  NAME = "NAME",
  ROLE = "ROLE",
  PREFERENCES = "PREFERENCES",
  BEHAVIOR = "BEHAVIOR",
  AI = "AI",
}

export enum ABTestStatus {
  DRAFT = "DRAFT",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  ANALYZED = "ANALYZED",
}

export enum SendTimeOptimization {
  NONE = "NONE",
  AI_OPTIMIZED = "AI_OPTIMIZED",
  HISTORICAL = "HISTORICAL",
  CUSTOM = "CUSTOM",
}

export enum BounceType {
  HARD = "HARD",
  SOFT = "SOFT",
  TEMPORARY = "TEMPORARY",
  UNDETERMINED = "UNDETERMINED",
}

export enum UnsubscribeReason {
  NOT_INTERESTED = "NOT_INTERESTED",
  TOO_FREQUENT = "TOO_FREQUENT",
  IRRELEVANT = "IRRELEVANT",
  SPAM = "SPAM",
  OTHER = "OTHER",
}

export enum InboxType {
  PRIMARY = "PRIMARY",
  TRANSACTIONAL = "TRANSACTIONAL",
  PROMOTIONAL = "PROMOTIONAL",
  SOCIAL = "SOCIAL",
  UPDATES = "UPDATES",
  ALERTS = "ALERTS",
}

export enum ReadReceiptStatus {
  NONE = "NONE",
  DELIVERED = "DELIVERED",
  OPENED = "OPENED",
  ACKNOWLEDGED = "ACKNOWLEDGED",
}

export enum NotificationGroup {
  ACCOUNT = "ACCOUNT",
  SECURITY = "SECURITY",
  GRADES = "GRADES",
  ATTENDANCE = "ATTENDANCE",
  EVENTS = "EVENTS",
  FINANCES = "FINANCES",
  SYSTEM = "SYSTEM",
  MARKETING = "MARKETING",
}

export enum RetryPolicy {
  NONE = "NONE",
  FIXED_INTERVAL = "FIXED_INTERVAL",
  EXPONENTIAL_BACKOFF = "EXPONENTIAL_BACKOFF",
  LINEAR = "LINEAR",
  CUSTOM = "CUSTOM",
}

export enum ThrottleLimit {
  NONE = "NONE",
  PER_SECOND = "PER_SECOND",
  PER_MINUTE = "PER_MINUTE",
  PER_HOUR = "PER_HOUR",
  PER_DAY = "PER_DAY",
}

export enum BatchMode {
  NONE = "NONE",
  INDIVIDUAL = "INDIVIDUAL",
  BULK = "BULK",
  SEGMENT = "SEGMENT",
  ALL = "ALL",
}

export enum PersonalizationLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  ADVANCED = "ADVANCED",
  AI_POWERED = "AI_POWERED",
}

export enum MultiChannelStrategy {
  PREFERRED_ONLY = "PREFERRED_ONLY",
  ALL_CHANNELS = "ALL_CHANNELS",
  SMART_FALLBACK = "SMART_FALLBACK",
  SEQUENTIAL = "SEQUENTIAL",
  PARALLEL = "PARALLEL",
}

export enum ExpiryPolicy {
  NONE = "NONE",
  TIME_BASED = "TIME_BASED",
  EVENT_BASED = "EVENT_BASED",
  READ_BASED = "READ_BASED",
  CUSTOM = "CUSTOM",
}

export enum QuietHoursAction {
  DELAY = "DELAY",
  SKIP = "SKIP",
  QUEUE = "QUEUE",
  SEND_ANYWAY = "SEND_ANYWAY",
}

export enum RateLimitScope {
  GLOBAL = "GLOBAL",
  PER_USER = "PER_USER",
  PER_TENANT = "PER_TENANT",
  PER_CHANNEL = "PER_CHANNEL",
  PER_TEMPLATE = "PER_TEMPLATE",
}

export enum NotificationAnalytics {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  OPENED = "OPENED",
  CLICKED = "CLICKED",
  CONVERTED = "CONVERTED",
  BOUNCED = "BOUNCED",
  FAILED = "FAILED",
}

export enum ContentSafetyLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  STRICT = "STRICT",
  CUSTOM = "CUSTOM",
}

export enum LocalizationSupport {
  SINGLE_LANGUAGE = "SINGLE_LANGUAGE",
  MULTI_LANGUAGE = "MULTI_LANGUAGE",
  AUTO_TRANSLATE = "AUTO_TRANSLATE",
}

export enum WebhookMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum QueuePriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

// ============================================================================
// INTERFACES — Core Notification
// ============================================================================

export interface BaseNotification {
  id: string;
  school_id: string;
  type: NotificationType;
  status: NotificationStatus;
  priority: NotificationPriority;
  channel: NotificationChannel;
  title: string;
  body: string;
  sender_id?: string;
  recipient_id: string;
  group: NotificationGroup;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface EmailNotification extends BaseNotification {
  channel: NotificationChannel.EMAIL;
  from_email: string;
  from_name?: string;
  to_email: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  html_body?: string;
  text_body?: string;
  attachments?: NotificationAttachment[];
  headers?: Record<string, string>;
  reply_to?: string;
  template_id?: string;
  template_vars?: Record<string, unknown>;
  delivered_at?: string;
  opened_at?: string;
  clicked_at?: string;
  bounce_info?: NotificationBounce;
}

export interface SMSNotification extends BaseNotification {
  channel: NotificationChannel.SMS;
  from_number: string;
  to_number: string;
  message: string;
  encoding?: string;
  sender_id?: string;
  segments?: number;
  delivered_at?: string;
  error_code?: string;
  error_message?: string;
}

export interface PushNotification extends BaseNotification {
  channel: NotificationChannel.PUSH;
  device_tokens: string[];
  platform: "ios" | "android" | "web";
  title: string;
  body: string;
  image_url?: string;
  action_url?: string;
  badge_count?: number;
  sound?: string;
  category?: string;
  ttl?: number;
  collapse_id?: string;
  silent?: boolean;
  rich_media?: PushRichMedia;
}

export interface WhatsAppNotification extends BaseNotification {
  channel: NotificationChannel.WHATSAPP;
  from_number: string;
  to_number: string;
  template_name?: string;
  template_vars?: Record<string, unknown>;
  body: string;
  media_url?: string;
  media_type?: "image" | "video" | "audio" | "document";
  buttons?: WhatsAppButton[];
  interactive?: WhatsAppInteractive;
}

export interface TelegramNotification extends BaseNotification {
  channel: NotificationChannel.TELEGRAM;
  chat_id: string;
  message: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  reply_markup?: Record<string, unknown>;
  photo?: string;
  document?: string;
  disable_notification?: boolean;
  disable_web_page_preview?: boolean;
}

export interface TeamsNotification extends BaseNotification {
  channel: NotificationChannel.TEAMS;
  webhook_url: string;
  title: string;
  body: string;
  summary?: string;
  color?: string;
  potential_action?: TeamsAction[];
  sections?: TeamsSection[];
  theme_color?: string;
}

export interface SlackNotification extends BaseNotification {
  channel: NotificationChannel.SLACK;
  slack_channel: string;
  title: string;
  body: string;
  fallback?: string;
  color?: string;
  pretext?: string;
  fields?: SlackField[];
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  blocks?: Record<string, unknown>[];
}

export interface VoiceNotification extends BaseNotification {
  channel: NotificationChannel.VOICE;
  to_number: string;
  from_number: string;
  script: string;
  language?: string;
  voice?: "male" | "female" | "neutral";
  speed?: number;
  max_duration?: number;
  call_status?: "initiated" | "ringing" | "answered" | "completed" | "failed" | "busy" | "no_answer";
  recording_url?: string;
  twilio_sid?: string;
}

export interface InAppNotification extends BaseNotification {
  channel: NotificationChannel.IN_APP;
  inbox_type: InboxType;
  action_url?: string;
  icon?: string;
  image_url?: string;
  read_at?: string;
  archived_at?: string;
  pinned?: boolean;
  read_receipt?: ReadReceiptStatus;
  expires_at?: string;
  cta_label?: string;
  cta_url?: string;
}

export interface WebhookNotification extends BaseNotification {
  channel: NotificationChannel.WEBHOOK;
  webhook_url: string;
  method: WebhookMethod;
  headers?: Record<string, string>;
  payload: Record<string, unknown>;
  secret?: string;
  retry_count?: number;
  last_status_code?: number;
  response_body?: string;
}

// ============================================================================
// INTERFACES — Supporting Types
// ============================================================================

export interface NotificationAttachment {
  id: string;
  filename: string;
  url: string;
  mime_type: string;
  size_bytes: number;
}

export interface PushRichMedia {
  image_url?: string;
  video_url?: string;
  gif_url?: string;
}

export interface WhatsAppButton {
  type: "quick_reply" | "url" | "phone_number";
  text: string;
  payload?: string;
  url?: string;
  phone_number?: string;
}

export interface WhatsAppInteractive {
  type: "button" | "list" | "product";
  body: string;
  buttons?: WhatsAppButton[];
}

export interface TeamsAction {
  type: "openUri" | "invokeCard";
  name: string;
  target?: string;
}

export interface TeamsSection {
  activity_title?: string;
  activity_subtitle?: string;
  activity_image?: string;
  facts?: { name: string; value: string }[];
  text?: string;
  markdown?: boolean;
}

export interface SlackField {
  title: string;
  value: string;
  short?: boolean;
}

// ============================================================================
// INTERFACES — Config & Templates
// ============================================================================

export interface NotificationConfig {
  id: string;
  school_id: string;
  enabled_channels: NotificationChannel[];
  default_priority: NotificationPriority;
  default_format: MessageFormat;
  rate_limits: NotificationRateLimitConfig;
  quiet_hours: QuietHoursConfig;
  retry_policy: RetryPolicyConfig;
  delivery_optimization: DeliveryOptimization;
  multi_channel_strategy: MultiChannelStrategy;
  content_safety: ContentSafetyLevel;
  localization: LocalizationSupport;
  created_at: string;
  updated_at: string;
}

export interface NotificationRateLimitConfig {
  global: number;
  per_user: number;
  per_tenant: number;
  per_channel: Record<NotificationChannel, number>;
  scope: RateLimitScope;
  window_seconds: number;
}

export interface QuietHoursConfig {
  enabled: boolean;
  start_hour: number;
  end_hour: number;
  timezone: string;
  action: QuietHoursAction;
}

export interface RetryPolicyConfig {
  policy: RetryPolicy;
  max_retries: number;
  base_interval_ms: number;
  max_interval_ms: number;
  backoff_multiplier?: number;
}

export interface NotificationTemplate {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  type: TemplateType;
  status: TemplateStatus;
  subject?: string;
  body: string;
  format: MessageFormat;
  variables: string[];
  locale?: string;
  is_default?: boolean;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface NotificationTemplateVersion {
  id: string;
  template_id: string;
  version: number;
  body: string;
  subject?: string;
  variables: string[];
  changelog?: string;
  created_by?: string;
  created_at: string;
}

// ============================================================================
// INTERFACES — Batching & Scheduling
// ============================================================================

export interface NotificationBatch {
  id: string;
  school_id: string;
  name?: string;
  mode: BatchMode;
  status: NotificationStatus;
  channel: NotificationChannel;
  template_id?: string;
  total_count: number;
  sent_count: number;
  failed_count: number;
  delivered_count: number;
  batch_config?: BatchConfig;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BatchConfig {
  chunk_size: number;
  delay_between_chunks_ms: number;
  max_concurrent: number;
}

export interface NotificationJob {
  id: string;
  school_id: string;
  batch_id?: string;
  notification_id: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  priority: QueuePriority;
  attempts: number;
  max_attempts: number;
  next_retry_at?: string;
  last_error?: string;
  payload: Record<string, unknown>;
  scheduled_at: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationSchedule {
  id: string;
  school_id: string;
  name: string;
  type: ScheduleType;
  status: ScheduleStatus;
  template_id?: string;
  channel: NotificationChannel;
  audience_type: AudienceType;
  cron_expression?: string;
  delay_minutes?: number;
  timezone: string;
  start_date: string;
  end_date?: string;
  last_run_at?: string;
  next_run_at?: string;
  run_count: number;
  config?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Delivery & Tracking
// ============================================================================

export interface NotificationDelivery {
  id: string;
  notification_id: string;
  channel: NotificationChannel;
  status: DeliveryStatus;
  provider?: string;
  provider_message_id?: string;
  attempts: number;
  last_attempt_at?: string;
  delivered_at?: string;
  error_code?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface NotificationBounce {
  id: string;
  notification_id: string;
  type: BounceType;
  code?: string;
  reason: string;
  email?: string;
  provider?: string;
  created_at: string;
}

export interface NotificationClick {
  id: string;
  notification_id: string;
  channel: NotificationChannel;
  url?: string;
  device_type?: string;
  ip_address?: string;
  user_agent?: string;
  country?: string;
  city?: string;
  created_at: string;
}

export interface NotificationOpen {
  id: string;
  notification_id: string;
  channel: NotificationChannel;
  device_type?: string;
  platform?: string;
  ip_address?: string;
  user_agent?: string;
  country?: string;
  city?: string;
  opened_at: string;
}

export interface NotificationConversion {
  id: string;
  notification_id: string;
  click_id?: string;
  conversion_type: string;
  value?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface NotificationUnsubscribe {
  id: string;
  school_id: string;
  user_id: string;
  channel: NotificationChannel;
  group?: NotificationGroup;
  reason: UnsubscribeReason;
  reason_text?: string;
  unsubscribed_at: string;
}

// ============================================================================
// INTERFACES — Audience & Targeting
// ============================================================================

export interface Audience {
  id: string;
  school_id: string;
  name: string;
  type: AudienceType;
  segment?: AudienceSegment;
  filters?: AudienceFilter[];
  conditions?: AudienceCondition[];
  user_count?: number;
  last_calculated_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AudienceFilter {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "nin" | "contains" | "starts_with" | "ends_with";
  value: unknown;
  logic?: "and" | "or";
}

export interface AudienceCondition {
  field: string;
  condition: string;
  value: unknown;
}

export interface GeoTarget {
  id: string;
  school_id: string;
  name: string;
  type: GeoTargetType;
  coordinates: GeoCoordinate[];
  radius_km?: number;
  postal_codes?: string[];
  country_code?: string;
  region?: string;
  city?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface GeoFence {
  id: string;
  geo_target_id: string;
  name: string;
  polygon: GeoCoordinate[];
  alert_on: "enter" | "exit" | "both";
  active: boolean;
  created_at: string;
}

export interface GeoNotification {
  id: string;
  notification_id: string;
  geo_target_id: string;
  geo_fence_id?: string;
  triggered_by: "enter" | "exit" | "location";
  user_id: string;
  user_location?: GeoCoordinate;
  triggered_at: string;
}

// ============================================================================
// INTERFACES — Emergency
// ============================================================================

export interface EmergencyAlert {
  id: string;
  school_id: string;
  title: string;
  body: string;
  level: EmergencyLevel;
  type: EmergencyType;
  source: AlertSource;
  channels: NotificationChannel[];
  audience_type: AudienceType;
  geo_target_id?: string;
  requires_ack: boolean;
  ack_deadline_minutes?: number;
  repeat_interval_minutes?: number;
  expires_at: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyBroadcast {
  id: string;
  emergency_id: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  total_recipients: number;
  acknowledged_count: number;
  sent_count: number;
  delivered_count: number;
  failed_count: number;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAck {
  id: string;
  emergency_id: string;
  broadcast_id?: string;
  user_id: string;
  acknowledged_at: string;
  user_location?: GeoCoordinate;
  notes?: string;
}

// ============================================================================
// INTERFACES — Preferences & Settings
// ============================================================================

export interface NotificationPreference {
  id: string;
  school_id: string;
  user_id: string;
  channel_preferences: ChannelPreferenceConfig[];
  quiet_hours?: QuietHoursConfig;
  digest_frequency?: NotificationFrequency;
  enabled_groups: NotificationGroup[];
  created_at: string;
  updated_at: string;
}

export interface ChannelPreferenceConfig {
  channel: NotificationChannel;
  enabled: boolean;
  preference: ChannelPreference;
  opt_status: OptInOutStatus;
  groups?: NotificationGroup[];
}

export interface NotificationSetting {
  id: string;
  school_id: string;
  key: string;
  value: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationDigest {
  id: string;
  school_id: string;
  user_id: string;
  frequency: NotificationFrequency;
  channels: NotificationChannel[];
  groups?: NotificationGroup[];
  last_sent_at?: string;
  next_scheduled_at?: string;
  notification_ids: string[];
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Inbox & Read
// ============================================================================

export interface NotificationInbox {
  id: string;
  school_id: string;
  user_id: string;
  notification_id: string;
  inbox_type: InboxType;
  is_read: boolean;
  is_archived: boolean;
  is_pinned: boolean;
  read_at?: string;
  archived_at?: string;
  created_at: string;
}

export interface NotificationRead {
  id: string;
  notification_id: string;
  user_id: string;
  read_at: string;
  device_type?: string;
  platform?: string;
}

export interface NotificationArchive {
  id: string;
  notification_id: string;
  user_id: string;
  archived_at: string;
}

// ============================================================================
// INTERFACES — A/B Testing
// ============================================================================

export interface ABTest {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  status: ABTestStatus;
  notification_a_id: string;
  notification_b_id: string;
  split_percentage: number;
  winner_variant?: "A" | "B" | "TIE";
  sample_size?: number;
  confidence_level?: number;
  started_at?: string;
  ended_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ABTestResult {
  id: string;
  test_id: string;
  variant: "A" | "B";
  metric: NotificationAnalytics;
  value: number;
  sample_size: number;
  calculated_at: string;
}

export interface ABTestMetric {
  id: string;
  test_id: string;
  metric: NotificationAnalytics;
  variant_a: number;
  variant_b: number;
  winner?: "A" | "B";
  confidence?: number;
  calculated_at: string;
}

// ============================================================================
// INTERFACES — Analytics & Reports
// ============================================================================

export interface NotificationAnalyticsData {
  id: string;
  school_id: string;
  period: "hourly" | "daily" | "weekly" | "monthly";
  period_start: string;
  period_end: string;
  channel: NotificationChannel;
  total_sent: number;
  total_delivered: number;
  total_opened: number;
  total_clicked: number;
  total_bounced: number;
  total_failed: number;
  total_converted: number;
  open_rate: number;
  click_rate: number;
  bounce_rate: number;
  conversion_rate: number;
  created_at: string;
}

export interface NotificationReport {
  id: string;
  school_id: string;
  name: string;
  type: string;
  date_from: string;
  date_to: string;
  channels?: NotificationChannel[];
  groups?: NotificationGroup[];
  data: Record<string, unknown>;
  generated_at: string;
  created_by?: string;
  created_at: string;
}

export interface NotificationInsight {
  id: string;
  school_id: string;
  insight_type: string;
  title: string;
  description: string;
  recommendation: string;
  metric_value?: number;
  metric_change?: number;
  period: string;
  data?: Record<string, unknown>;
  created_at: string;
}

// ============================================================================
// INTERFACES — AI
// ============================================================================

export interface NotificationAI {
  id: string;
  school_id: string;
  model: NotificationAIModel;
  recommendation: NotificationAIRecommendation;
  confidence: number;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  applied: boolean;
  applied_at?: string;
  created_at: string;
}

export interface NotificationAIModel {
  provider: "deepseek" | "gemini";
  model_name: string;
  version?: string;
  endpoint?: string;
}

export interface NotificationAIRecommendation {
  type: "send_time" | "subject_line" | "content" | "channel" | "audience";
  recommendation: string;
  reason?: string;
  expected_impact?: number;
}

// ============================================================================
// INTERFACES — Events
// ============================================================================

export interface NotificationEvent {
  id: string;
  school_id: string;
  type: NotificationEventType;
  entity_type: string;
  entity_id: string;
  actor_id?: string;
  data: Record<string, unknown>;
  created_at: string;
}

export enum NotificationEventType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  QUEUED = "QUEUED",
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  OPENED = "OPENED",
  CLICKED = "CLICKED",
  FAILED = "FAILED",
  BOUNCED = "BOUNCED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  CONVERTED = "CONVERTED",
  UNSUBSCRIBED = "UNSUBSCRIBED",
  ACKNOWLEDGED = "ACKNOWLEDGED",
}

export interface NotificationEventLog {
  id: string;
  event_id: string;
  notification_id: string;
  channel?: NotificationChannel;
  status?: NotificationStatus;
  error?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

// ============================================================================
// INTERFACES — Webhooks
// ============================================================================

export interface NotificationWebhook {
  id: string;
  school_id: string;
  name: string;
  url: string;
  secret: string;
  events: NotificationEventType[];
  active: boolean;
  headers?: Record<string, string>;
  retry_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface NotificationWebhookConfig {
  id: string;
  webhook_id: string;
  timeout_ms: number;
  retry_policy: RetryPolicy;
  max_retries: number;
  verify_signature: boolean;
  ip_whitelist?: string[];
  created_at: string;
  updated_at: string;
}

export interface NotificationWebhookDelivery {
  id: string;
  webhook_id: string;
  event_id: string;
  status: "success" | "failed" | "timeout" | "retrying";
  request_method: WebhookMethod;
  request_headers: Record<string, string>;
  request_body: string;
  response_status?: number;
  response_body?: string;
  response_time_ms?: number;
  attempts: number;
  next_retry_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Rate Limiting & Queues
// ============================================================================

export interface NotificationRateLimit {
  id: string;
  school_id: string;
  scope: RateLimitScope;
  channel: NotificationChannel;
  limit: number;
  window_seconds: number;
  current_count: number;
  window_start: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationThrottle {
  id: string;
  school_id: string;
  channel: NotificationChannel;
  limit: ThrottleLimit;
  max_per_window: number;
  current_window_count: number;
  window_reset_at: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationQueue {
  id: string;
  school_id: string;
  channel: NotificationChannel;
  priority: QueuePriority;
  total_items: number;
  processed_items: number;
  failed_items: number;
  paused: boolean;
  last_processed_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Audit & Compliance
// ============================================================================

export interface NotificationAudit {
  id: string;
  school_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  actor_id: string;
  actor_role?: string;
  changes?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface NotificationCompliance {
  id: string;
  school_id: string;
  regulation: string;
  status: "compliant" | "non_compliant" | "pending_review";
  last_audit_at?: string;
  next_audit_at?: string;
  findings?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationGDPR {
  id: string;
  school_id: string;
  user_id: string;
  request_type: "access" | "deletion" | "export" | "rectification" | "portability";
  status: "pending" | "in_progress" | "completed" | "denied";
  requested_at: string;
  completed_at?: string;
  data_exported?: boolean;
  notifications_deleted?: boolean;
  notes?: string;
  processed_by?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Import/Export & Sync
// ============================================================================

export interface NotificationExport {
  id: string;
  school_id: string;
  format: "csv" | "json" | "xlsx" | "pdf";
  filters?: Record<string, unknown>;
  status: "pending" | "processing" | "completed" | "failed";
  file_url?: string;
  file_size_bytes?: number;
  record_count?: number;
  requested_by?: string;
  completed_at?: string;
  created_at: string;
}

export interface NotificationImport {
  id: string;
  school_id: string;
  source: "csv" | "json" | "xlsx" | "api";
  status: "pending" | "processing" | "completed" | "failed" | "partial";
  total_records: number;
  processed_records: number;
  failed_records: number;
  error_log?: ImportError[];
  file_url?: string;
  imported_by?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ImportError {
  row: number;
  field: string;
  error: string;
  value?: unknown;
}

export interface NotificationSync {
  id: string;
  school_id: string;
  source: string;
  direction: "inbound" | "outbound";
  status: "pending" | "syncing" | "completed" | "failed";
  records_synced: number;
  last_synced_at?: string;
  next_sync_at?: string;
  config?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Dashboard & UI
// ============================================================================

export interface NotificationDashboard {
  id: string;
  school_id: string;
  user_id: string;
  name: string;
  layout: NotificationWidget[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationWidget {
  id: string;
  dashboard_id: string;
  type: "chart" | "table" | "counter" | "list" | "timeline";
  title: string;
  config: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  refresh_interval_seconds?: number;
  created_at: string;
  updated_at: string;
}

export interface NotificationFilter {
  id: string;
  school_id: string;
  user_id: string;
  name: string;
  channel?: NotificationChannel[];
  status?: NotificationStatus[];
  type?: NotificationType[];
  group?: NotificationGroup[];
  priority?: NotificationPriority[];
  date_from?: string;
  date_to?: string;
  search?: string;
  is_global: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// INTERFACES — Versioning & Migrations
// ============================================================================

export interface NotificationVersion {
  id: string;
  entity_type: string;
  entity_id: string;
  version: number;
  data: Record<string, unknown>;
  created_by?: string;
  created_at: string;
}

export interface NotificationMigration {
  id: string;
  name: string;
  version: string;
  status: "pending" | "running" | "completed" | "failed" | "rolled_back";
  up_sql?: string;
  down_sql?: string;
  executed_at?: string;
  duration_ms?: number;
  error?: string;
  created_at: string;
}

export interface NotificationChangelog {
  id: string;
  version: string;
  changes: ChangelogEntry[];
  released_at?: string;
  created_at: string;
}

export interface ChangelogEntry {
  type: "added" | "changed" | "deprecated" | "removed" | "fixed" | "security";
  description: string;
  entity_type?: string;
  entity_id?: string;
}

// ============================================================================
// INTERFACES — Health & Monitoring
// ============================================================================

export interface NotificationHealth {
  id: string;
  school_id: string;
  status: "healthy" | "degraded" | "down";
  channels: ChannelHealth[];
  queue_depth: number;
  avg_delivery_time_ms: number;
  error_rate: number;
  checked_at: string;
}

export interface ChannelHealth {
  channel: NotificationChannel;
  status: "healthy" | "degraded" | "down";
  latency_ms: number;
  error_rate: number;
  provider_status?: string;
  last_checked_at: string;
}

export interface NotificationMetric {
  id: string;
  school_id: string;
  metric_name: string;
  metric_value: number;
  unit?: string;
  tags?: Record<string, string>;
  recorded_at: string;
}

export interface NotificationSystemAlert {
  id: string;
  school_id: string;
  alert_type: string;
  severity: EmergencyLevel;
  message: string;
  source?: string;
  metadata?: Record<string, unknown>;
  acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  created_at: string;
}
