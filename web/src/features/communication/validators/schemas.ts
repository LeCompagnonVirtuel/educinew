import { z } from 'zod';

const conversationTypeEnum = z.enum(['direct', 'group', 'channel', 'support']);
const conversationStatusEnum = z.enum(['active', 'archived', 'deleted', 'muted']);
const messageTypeEnum = z.enum(['text', 'image', 'file', 'audio', 'video', 'system', 'location', 'contact', 'poll', 'announcement']);
const messageStatusEnum = z.enum(['sent', 'delivered', 'read', 'failed', 'pending']);
const participantRoleEnum = z.enum(['owner', 'admin', 'moderator', 'member']);
const callTypeEnum = z.enum(['audio', 'video', 'screen_share']);
const callStatusEnum = z.enum(['ringing', 'active', 'ended', 'missed', 'declined', 'failed']);
const emailStatusEnum = z.enum(['draft', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed']);
const emailPriorityEnum = z.enum(['low', 'normal', 'high', 'urgent']);
const smsStatusEnum = z.enum(['pending', 'sent', 'delivered', 'failed', 'bounced']);
const pushStatusEnum = z.enum(['pending', 'sent', 'delivered', 'opened', 'failed']);
const announcementTypeEnum = z.enum(['info', 'warning', 'urgent', 'event', 'maintenance']);
const announcementStatusEnum = z.enum(['draft', 'published', 'scheduled', 'expired', 'deleted']);
const calendarEventTypeEnum = z.enum(['meeting', 'class', 'exam', 'event', 'reminder', 'holiday']);
const calendarEventStatusEnum = z.enum(['tentative', 'confirmed', 'cancelled', 'completed']);
const taskStatusEnum = z.enum(['pending', 'in_progress', 'completed', 'cancelled', 'blocked']);
const taskPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);
const documentStatusEnum = z.enum(['draft', 'published', 'archived', 'deleted']);
const collaborationStatusEnum = z.enum(['active', 'paused', 'ended']);
const notificationTypeEnum = z.enum(['message', 'mention', 'reaction', 'call', 'email', 'sms', 'push', 'announcement', 'task', 'calendar', 'document']);
const contactGroupEnum = z.enum(['student', 'teacher', 'parent', 'staff', 'vendor', 'other']);
const pollStatusEnum = z.enum(['active', 'closed', 'draft']);
const webhookStatusEnum = z.enum(['active', 'inactive', 'failed']);
const channelTypeEnum = z.enum(['general', 'announcements', 'support', 'project', 'department']);
const presenceStatusEnum = z.enum(['online', 'away', 'busy', 'offline', 'dnd']);
const exportFormatEnum = z.enum(['json', 'csv', 'pdf', 'xlsx']);
const autoResponseStatusEnum = z.enum(['active', 'inactive', 'scheduled']);
const scheduledMessageStatusEnum = z.enum(['pending', 'sent', 'cancelled', 'failed']);

const dateRangeSchema = z.object({
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

const sortSchema = z.object({
  sortBy: z.string().max(100).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// --- Conversation Schemas ---

export const createConversationSchema = z.object({
  type: conversationTypeEnum.default('direct'),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  participants: z.array(z.string().uuid()).min(1).max(500),
  metadata: z.record(z.unknown()).default({}),
});

export const updateConversationSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const listConversationSchema = z.object({
  type: conversationTypeEnum.optional(),
  status: conversationStatusEnum.optional(),
  participantId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const archiveConversationSchema = z.object({
  conversationId: z.string().uuid(),
});

export const muteConversationSchema = z.object({
  conversationId: z.string().uuid(),
  duration: z.number().int().min(0).max(43200).optional(),
});

export const pinConversationSchema = z.object({
  conversationId: z.string().uuid(),
  pinned: z.boolean().default(true),
});

export const addParticipantSchema = z.object({
  conversationId: z.string().uuid(),
  userIds: z.array(z.string().uuid()).min(1).max(100),
  role: participantRoleEnum.default('member'),
});

export const removeParticipantSchema = z.object({
  conversationId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const conversationStatsSchema = z.object({
  conversationId: z.string().uuid(),
});

export const searchConversationSchema = z.object({
  query: z.string().min(1).max(200),
  type: conversationTypeEnum.optional(),
  participantId: z.string().uuid().optional(),
  ...paginationSchema.shape,
});

// --- Message Schemas ---

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1).max(50000),
  type: messageTypeEnum.default('text'),
  replyToId: z.string().uuid().optional(),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
  mentions: z.array(z.string().uuid()).max(100).optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const editMessageSchema = z.object({
  conversationId: z.string().uuid(),
  messageId: z.string().uuid(),
  content: z.string().min(1).max(50000),
});

export const deleteMessageSchema = z.object({
  conversationId: z.string().uuid(),
  messageId: z.string().uuid(),
  forEveryone: z.boolean().default(true),
});

export const pinMessageSchema = z.object({
  conversationId: z.string().uuid(),
  messageId: z.string().uuid(),
  pinned: z.boolean().default(true),
});

export const reactToMessageSchema = z.object({
  conversationId: z.string().uuid(),
  messageId: z.string().uuid(),
  emoji: z.string().min(1).max(10),
});

export const removeReactionSchema = z.object({
  conversationId: z.string().uuid(),
  messageId: z.string().uuid(),
  emoji: z.string().min(1).max(10),
});

export const replyToMessageSchema = z.object({
  conversationId: z.string().uuid(),
  messageId: z.string().uuid(),
  content: z.string().min(1).max(50000),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
});

export const forwardMessageSchema = z.object({
  messageId: z.string().uuid(),
  targetConversationIds: z.array(z.string().uuid()).min(1).max(20),
  addNote: z.string().max(5000).optional(),
});

export const searchMessageSchema = z.object({
  query: z.string().min(1).max(200),
  conversationId: z.string().uuid().optional(),
  senderId: z.string().uuid().optional(),
  type: messageTypeEnum.optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
});

export const markAsReadSchema = z.object({
  conversationId: z.string().uuid(),
  messageIds: z.array(z.string().uuid()).min(1).max(100),
});

export const markAsDeliveredSchema = z.object({
  conversationId: z.string().uuid(),
  messageIds: z.array(z.string().uuid()).min(1).max(100),
});

export const getMessagesSchema = z.object({
  conversationId: z.string().uuid(),
  before: z.string().uuid().optional(),
  after: z.string().uuid().optional(),
  type: messageTypeEnum.optional(),
  ...paginationSchema.shape,
});

export const bulkDeleteMessagesSchema = z.object({
  conversationId: z.string().uuid(),
  messageIds: z.array(z.string().uuid()).min(1).max(100),
  forEveryone: z.boolean().default(false),
});

export const bulkMarkAsReadSchema = z.object({
  conversationId: z.string().uuid(),
  beforeTimestamp: z.string().datetime().optional(),
});

export const messageStatsSchema = z.object({
  conversationId: z.string().uuid(),
  ...dateRangeSchema.shape,
});

// --- Thread Schemas ---

export const getThreadSchema = z.object({
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
});

export const getThreadMessagesSchema = z.object({
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const lockThreadSchema = z.object({
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
  locked: z.boolean().default(true),
});

export const threadStatsSchema = z.object({
  conversationId: z.string().uuid(),
  threadId: z.string().uuid(),
});

// --- Group Schemas ---

export const createGroupSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  members: z.array(z.string().uuid()).min(1).max(500),
  avatar: z.string().url().max(2000).optional(),
  isPrivate: z.boolean().default(false),
  metadata: z.record(z.unknown()).default({}),
});

export const updateGroupSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  avatar: z.string().url().max(2000).optional(),
  isPrivate: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const listGroupSchema = z.object({
  search: z.string().max(200).optional(),
  isPrivate: z.boolean().optional(),
  memberId: z.string().uuid().optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const addGroupMemberSchema = z.object({
  groupId: z.string().uuid(),
  userIds: z.array(z.string().uuid()).min(1).max(100),
  role: participantRoleEnum.default('member'),
});

export const removeGroupMemberSchema = z.object({
  groupId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const updateGroupMemberRoleSchema = z.object({
  groupId: z.string().uuid(),
  userId: z.string().uuid(),
  role: participantRoleEnum,
});

export const inviteToGroupSchema = z.object({
  groupId: z.string().uuid(),
  emails: z.array(z.string().email()).min(1).max(50),
  message: z.string().max(1000).optional(),
  role: participantRoleEnum.default('member'),
});

export const getGroupInvitesSchema = z.object({
  groupId: z.string().uuid(),
  status: z.enum(['pending', 'accepted', 'declined', 'expired']).optional(),
  ...paginationSchema.shape,
});

export const groupStatsSchema = z.object({
  groupId: z.string().uuid(),
});

export const deleteGroupSchema = z.object({
  groupId: z.string().uuid(),
  transferOwnerId: z.string().uuid().optional(),
});

// --- Call Schemas ---

export const initiateCallSchema = z.object({
  conversationId: z.string().uuid().optional(),
  participantIds: z.array(z.string().uuid()).min(1).max(100),
  type: callTypeEnum.default('audio'),
  metadata: z.record(z.unknown()).default({}),
});

export const joinCallSchema = z.object({
  callId: z.string().uuid(),
  videoEnabled: z.boolean().default(false),
  audioEnabled: z.boolean().default(true),
});

export const leaveCallSchema = z.object({
  callId: z.string().uuid(),
});

export const endCallSchema = z.object({
  callId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export const muteCallParticipantSchema = z.object({
  callId: z.string().uuid(),
  participantId: z.string().uuid(),
  muted: z.boolean().default(true),
});

export const toggleVideoSchema = z.object({
  callId: z.string().uuid(),
  enabled: z.boolean(),
});

export const toggleScreenShareSchema = z.object({
  callId: z.string().uuid(),
  enabled: z.boolean(),
});

export const getCallRecordingSchema = z.object({
  callId: z.string().uuid(),
});

export const callStatsSchema = z.object({
  callId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
});

export const listCallSchema = z.object({
  conversationId: z.string().uuid().optional(),
  type: callTypeEnum.optional(),
  status: callStatusEnum.optional(),
  participantId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Email Schemas ---

export const sendEmailSchema = z.object({
  to: z.array(z.string().email()).min(1).max(100),
  cc: z.array(z.string().email()).max(50).optional(),
  bcc: z.array(z.string().email()).max(50).optional(),
  subject: z.string().min(1).max(500),
  body: z.string().min(1).max(100000),
  isHtml: z.boolean().default(true),
  priority: emailPriorityEnum.default('normal'),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(20).optional(),
  templateId: z.string().uuid().optional(),
  templateData: z.record(z.unknown()).optional(),
  scheduleAt: z.string().datetime().optional(),
  replyToId: z.string().uuid().optional(),
});

export const saveDraftSchema = z.object({
  to: z.array(z.string().email()).max(100).optional(),
  cc: z.array(z.string().email()).max(50).optional(),
  bcc: z.array(z.string().email()).max(50).optional(),
  subject: z.string().max(500).optional(),
  body: z.string().max(100000).optional(),
  isHtml: z.boolean().default(true),
  priority: emailPriorityEnum.default('normal'),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(20).optional(),
});

export const deleteEmailSchema = z.object({
  emailId: z.string().uuid(),
  permanent: z.boolean().default(false),
});

export const createEmailTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  subject: z.string().min(1).max(500),
  body: z.string().min(1).max(100000),
  isHtml: z.boolean().default(true),
  category: z.string().max(100).optional(),
  variables: z.array(z.string().max(100)).max(50).default([]),
  description: z.string().max(1000).optional(),
});

export const updateEmailTemplateSchema = z.object({
  templateId: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  subject: z.string().min(1).max(500).optional(),
  body: z.string().min(1).max(100000).optional(),
  isHtml: z.boolean().optional(),
  category: z.string().max(100).optional(),
  variables: z.array(z.string().max(100)).max(50).optional(),
  description: z.string().max(1000).optional(),
});

export const sendCampaignSchema = z.object({
  name: z.string().min(1).max(200),
  templateId: z.string().uuid(),
  recipientListId: z.string().uuid(),
  scheduleAt: z.string().datetime().optional(),
  segmentFilters: z.record(z.unknown()).default({}),
  metadata: z.record(z.unknown()).default({}),
});

export const emailStatsSchema = z.object({
  campaignId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listEmailSchema = z.object({
  status: emailStatusEnum.optional(),
  priority: emailPriorityEnum.optional(),
  folder: z.enum(['inbox', 'sent', 'drafts', 'archive', 'trash']).optional(),
  search: z.string().max(200).optional(),
  senderId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const getEmailTemplatesSchema = z.object({
  search: z.string().max(200).optional(),
  category: z.string().max(100).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const createEmailSignatureSchema = z.object({
  name: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  isDefault: z.boolean().default(false),
});

// --- SMS Schemas ---

export const sendSmsSchema = z.object({
  to: z.string().min(1).max(20),
  message: z.string().min(1).max(1600),
  templateId: z.string().uuid().optional(),
  templateData: z.record(z.unknown()).optional(),
  scheduleAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const sendBulkSmsSchema = z.object({
  recipients: z.array(z.object({
    phone: z.string().min(1).max(20),
    data: z.record(z.unknown()).optional(),
  })).min(1).max(10000),
  message: z.string().min(1).max(1600).optional(),
  templateId: z.string().uuid(),
  templateData: z.record(z.unknown()).default({}),
  scheduleAt: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const createSmsTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  body: z.string().min(1).max(1600),
  variables: z.array(z.string().max(100)).max(20).default([]),
  description: z.string().max(1000).optional(),
});

export const smsStatsSchema = z.object({
  campaignId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listSmsSchema = z.object({
  status: smsStatusEnum.optional(),
  to: z.string().max(20).optional(),
  from: z.string().max(20).optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const getSmsTemplatesSchema = z.object({
  search: z.string().max(200).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Push Notification Schemas ---

export const sendPushNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(1000),
  data: z.record(z.unknown()).default({}),
  imageUrl: z.string().url().max(2000).optional(),
  actionUrl: z.string().url().max(2000).optional(),
  recipients: z.array(z.string().uuid()).min(1).max(10000),
  templateId: z.string().uuid().optional(),
  templateData: z.record(z.unknown()).optional(),
  scheduleAt: z.string().datetime().optional(),
});

export const subscribeToPushSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().min(1).max(500),
  platform: z.enum(['web', 'ios', 'android', 'windows', 'macos']),
  topics: z.array(z.string().max(100)).max(50).default([]),
});

export const unsubscribeFromPushSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().min(1).max(500).optional(),
  topics: z.array(z.string().max(100)).max(50).optional(),
});

export const pushStatsSchema = z.object({
  campaignId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listPushSchema = z.object({
  status: pushStatusEnum.optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const getPushTemplatesSchema = z.object({
  search: z.string().max(200).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Announcement Schemas ---

export const createAnnouncementSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(50000),
  type: announcementTypeEnum.default('info'),
  priority: emailPriorityEnum.default('normal'),
  targetAudience: z.array(z.enum(['all', 'students', 'teachers', 'parents', 'staff'])).min(1).max(10),
  targetUserIds: z.array(z.string().uuid()).max(10000).optional(),
  targetGroupIds: z.array(z.string().uuid()).max(100).optional(),
  scheduleAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  requireAck: z.boolean().default(false),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const updateAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(50000).optional(),
  type: announcementTypeEnum.optional(),
  priority: emailPriorityEnum.optional(),
  targetAudience: z.array(z.enum(['all', 'students', 'teachers', 'parents', 'staff'])).min(1).max(10).optional(),
  targetUserIds: z.array(z.string().uuid()).max(10000).optional(),
  targetGroupIds: z.array(z.string().uuid()).max(100).optional(),
  scheduleAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  requireAck: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const publishAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
});

export const acknowledgeAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
  comment: z.string().max(1000).optional(),
});

export const announcementStatsSchema = z.object({
  announcementId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listAnnouncementSchema = z.object({
  type: announcementTypeEnum.optional(),
  status: announcementStatusEnum.optional(),
  priority: emailPriorityEnum.optional(),
  requireAck: z.boolean().optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const deleteAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
});

export const getAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
});

// --- Calendar Schemas ---

export const createCalendarEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  type: calendarEventTypeEnum.default('meeting'),
  status: calendarEventStatusEnum.default('tentative'),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  allDay: z.boolean().default(false),
  location: z.string().max(500).optional(),
  attendees: z.array(z.object({
    userId: z.string().uuid(),
    role: z.enum(['organizer', 'required', 'optional']).default('required'),
  })).max(500).default([]),
  recurrence: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    interval: z.number().int().min(1).max(365).default(1),
    count: z.number().int().min(1).max(365).optional(),
    until: z.string().datetime().optional(),
  }).optional(),
  reminders: z.array(z.object({
    minutes: z.number().int().min(0).max(43200),
    method: z.enum(['push', 'email', 'sms']).default('push'),
  })).max(10).default([{ minutes: 15, method: 'push' }]),
  calendarId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const updateCalendarEventSchema = z.object({
  eventId: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  type: calendarEventTypeEnum.optional(),
  status: calendarEventStatusEnum.optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  allDay: z.boolean().optional(),
  location: z.string().max(500).optional(),
  attendees: z.array(z.object({
    userId: z.string().uuid(),
    role: z.enum(['organizer', 'required', 'optional']).default('required'),
  })).max(500).optional(),
  recurrence: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    interval: z.number().int().min(1).max(365).default(1),
    count: z.number().int().min(1).max(365).optional(),
    until: z.string().datetime().optional(),
  }).optional(),
  reminders: z.array(z.object({
    minutes: z.number().int().min(0).max(43200),
    method: z.enum(['push', 'email', 'sms']).default('push'),
  })).max(10).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const respondToEventSchema = z.object({
  eventId: z.string().uuid(),
  response: z.enum(['accepted', 'declined', 'tentative']),
  comment: z.string().max(1000).optional(),
});

export const calendarStatsSchema = z.object({
  calendarId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listCalendarEventSchema = z.object({
  calendarId: z.string().uuid().optional(),
  type: calendarEventTypeEnum.optional(),
  status: calendarEventStatusEnum.optional(),
  attendeeId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const deleteCalendarEventSchema = z.object({
  eventId: z.string().uuid(),
  notifyAttendees: z.boolean().default(true),
});

export const getCalendarSubscriptionsSchema = z.object({
  userId: z.string().uuid().optional(),
  ...paginationSchema.shape,
});

export const calendarReminderSchema = z.object({
  eventId: z.string().uuid(),
  reminderId: z.string().uuid().optional(),
  minutes: z.number().int().min(0).max(43200),
  method: z.enum(['push', 'email', 'sms']).default('push'),
});

// --- Task Schemas ---

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  status: taskStatusEnum.default('pending'),
  priority: taskPriorityEnum.default('medium'),
  assigneeId: z.string().uuid().optional(),
  assigneeIds: z.array(z.string().uuid()).max(50).optional(),
  dueDate: z.string().datetime().optional(),
  reminderAt: z.string().datetime().optional(),
  parentTaskId: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  checklist: z.array(z.object({
    id: z.string().uuid().optional(),
    text: z.string().min(1).max(200),
    completed: z.boolean().default(false),
  })).max(50).default([]),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const updateTaskSchema = z.object({
  taskId: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  assigneeId: z.string().uuid().optional(),
  assigneeIds: z.array(z.string().uuid()).max(50).optional(),
  dueDate: z.string().datetime().optional(),
  reminderAt: z.string().datetime().optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  checklist: z.array(z.object({
    id: z.string().uuid().optional(),
    text: z.string().min(1).max(200),
    completed: z.boolean().default(false),
  })).max(50).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const assignTaskSchema = z.object({
  taskId: z.string().uuid(),
  assigneeId: z.string().uuid(),
  dueDate: z.string().datetime().optional(),
  message: z.string().max(1000).optional(),
});

export const addTaskCommentSchema = z.object({
  taskId: z.string().uuid(),
  content: z.string().min(1).max(5000),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(5).optional(),
});

export const toggleTaskChecklistSchema = z.object({
  taskId: z.string().uuid(),
  checklistItemId: z.string().uuid(),
  completed: z.boolean(),
});

export const taskStatsSchema = z.object({
  projectId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listTaskSchema = z.object({
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  assigneeId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
  parentTaskId: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const deleteTaskSchema = z.object({
  taskId: z.string().uuid(),
  deleteSubtasks: z.boolean().default(false),
});

// --- Document Schemas ---

export const createDocumentSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().max(1000000).optional(),
  folderId: z.string().uuid().optional(),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string().max(50)).max(20).default([]),
  collaborators: z.array(z.object({
    userId: z.string().uuid(),
    permission: z.enum(['view', 'comment', 'edit', 'admin']).default('view'),
  })).max(100).default([]),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const updateDocumentSchema = z.object({
  documentId: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().max(1000000).optional(),
  folderId: z.string().uuid().optional(),
  isPublic: z.boolean().optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  status: documentStatusEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const moveDocumentSchema = z.object({
  documentId: z.string().uuid(),
  targetFolderId: z.string().uuid().optional(),
});

export const shareDocumentSchema = z.object({
  documentId: z.string().uuid(),
  userIds: z.array(z.string().uuid()).min(1).max(100),
  permission: z.enum(['view', 'comment', 'edit', 'admin']).default('view'),
  expiresAt: z.string().datetime().optional(),
  message: z.string().max(1000).optional(),
});

export const addDocumentVersionSchema = z.object({
  documentId: z.string().uuid(),
  content: z.string().max(1000000),
  changeNotes: z.string().max(1000).optional(),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
});

export const addDocumentCommentSchema = z.object({
  documentId: z.string().uuid(),
  content: z.string().min(1).max(5000),
  position: z.object({
    startOffset: z.number().int().min(0),
    endOffset: z.number().int().min(0),
  }).optional(),
  replyToId: z.string().uuid().optional(),
});

export const documentStatsSchema = z.object({
  documentId: z.string().uuid().optional(),
  folderId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listDocumentSchema = z.object({
  folderId: z.string().uuid().optional(),
  status: documentStatusEnum.optional(),
  isPublic: z.boolean().optional(),
  ownerId: z.string().uuid().optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Collaboration Schemas ---

export const startCollaborationSessionSchema = z.object({
  documentId: z.string().uuid(),
  userId: z.string().uuid(),
  metadata: z.record(z.unknown()).default({}),
});

export const updateCollaborationPresenceSchema = z.object({
  sessionId: z.string().uuid(),
  cursor: z.object({
    position: z.number().int().min(0),
    selection: z.object({
      start: z.number().int().min(0),
      end: z.number().int().min(0),
    }).optional(),
  }).optional(),
  typing: z.boolean().default(false),
  metadata: z.record(z.unknown()).default({}),
});

export const endCollaborationSessionSchema = z.object({
  sessionId: z.string().uuid(),
});

export const getCollaborationSessionsSchema = z.object({
  documentId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  status: collaborationStatusEnum.optional(),
  ...paginationSchema.shape,
});

// --- AI Schemas ---

export const generateSummarySchema = z.object({
  content: z.string().min(1).max(1000000),
  maxLength: z.number().int().min(50).max(5000).default(500),
  language: z.string().min(2).max(5).default('en'),
  style: z.enum(['formal', 'casual', 'technical', 'simple']).default('formal'),
});

export const translateTextSchema = z.object({
  text: z.string().min(1).max(50000),
  targetLanguage: z.string().min(2).max(5),
  sourceLanguage: z.string().min(2).max(5).optional(),
  context: z.string().max(1000).optional(),
});

export const correctTextSchema = z.object({
  text: z.string().min(1).max(50000),
  language: z.string().min(2).max(5).default('en'),
  style: z.enum(['grammar', 'spelling', 'punctuation', 'style', 'all']).default('all'),
});

export const suggestResponseSchema = z.object({
  messageContent: z.string().min(1).max(50000),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(50000),
  })).max(50).optional(),
  tone: z.enum(['formal', 'casual', 'friendly', 'professional', 'empathetic']).default('professional'),
  maxSuggestions: z.number().int().min(1).max(10).default(3),
  language: z.string().min(2).max(5).default('en'),
});

export const generateMeetingSummarySchema = z.object({
  transcript: z.string().min(1).max(1000000),
  includeActionItems: z.boolean().default(true),
  includeKeyDecisions: z.boolean().default(true),
  includeParticipants: z.boolean().default(true),
  maxLength: z.number().int().min(100).max(10000).default(2000),
  language: z.string().min(2).max(5).default('en'),
});

export const detectSpamSchema = z.object({
  content: z.string().min(1).max(100000),
  senderId: z.string().uuid().optional(),
  channel: z.enum(['email', 'sms', 'push', 'message']).optional(),
});

// --- Notification Schemas ---

export const getNotificationsSchema = z.object({
  type: notificationTypeEnum.optional(),
  read: z.boolean().optional(),
  userId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const markNotificationReadSchema = z.object({
  notificationIds: z.array(z.string().uuid()).min(1).max(100),
  read: z.boolean().default(true),
});

export const getNotificationPreferencesSchema = z.object({
  userId: z.string().uuid(),
});

export const updateNotificationPreferenceSchema = z.object({
  userId: z.string().uuid(),
  preferences: z.array(z.object({
    type: notificationTypeEnum,
    channels: z.array(z.enum(['push', 'email', 'sms', 'in_app'])).min(1).max(4),
    enabled: z.boolean().default(true),
  })).min(1).max(20),
});

export const sendNotificationBatchSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(1000),
  type: notificationTypeEnum,
  recipientIds: z.array(z.string().uuid()).min(1).max(10000),
  data: z.record(z.unknown()).default({}),
  scheduleAt: z.string().datetime().optional(),
});

// --- Contact Schemas ---

export const createContactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255).optional(),
  phone: z.string().max(20).optional(),
  group: contactGroupEnum.default('other'),
  organization: z.string().max(200).optional(),
  title: z.string().max(200).optional(),
  avatar: z.string().url().max(2000).optional(),
  notes: z.string().max(2000).optional(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).default({}),
});

export const updateContactSchema = z.object({
  contactId: z.string().uuid(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255).optional(),
  phone: z.string().max(20).optional(),
  group: contactGroupEnum.optional(),
  organization: z.string().max(200).optional(),
  title: z.string().max(200).optional(),
  avatar: z.string().url().max(2000).optional(),
  notes: z.string().max(2000).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const contactStatsSchema = z.object({
  group: contactGroupEnum.optional(),
  ...dateRangeSchema.shape,
});

export const listContactSchema = z.object({
  group: contactGroupEnum.optional(),
  search: z.string().max(200).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

export const deleteContactSchema = z.object({
  contactId: z.string().uuid(),
});

// --- Poll Schemas ---

export const createPollSchema = z.object({
  question: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
  options: z.array(z.object({
    text: z.string().min(1).max(200),
    imageUrl: z.string().url().max(2000).optional(),
  })).min(2).max(20),
  allowMultiple: z.boolean().default(false),
  anonymous: z.boolean().default(false),
  expiresAt: z.string().datetime().optional(),
  conversationId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const votePollSchema = z.object({
  pollId: z.string().uuid(),
  optionIds: z.array(z.string().uuid()).min(1),
  comment: z.string().max(1000).optional(),
});

export const closePollSchema = z.object({
  pollId: z.string().uuid(),
  announceResults: z.boolean().default(true),
});

export const pollStatsSchema = z.object({
  pollId: z.string().uuid().optional(),
  conversationId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listPollSchema = z.object({
  status: pollStatusEnum.optional(),
  conversationId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Webhook Schemas ---

export const createWebhookSchema = z.object({
  url: z.string().url().max(2000),
  events: z.array(z.string().min(1).max(100)).min(1).max(50),
  secret: z.string().min(16).max(256).optional(),
  description: z.string().max(500).optional(),
  headers: z.record(z.string()).optional(),
  active: z.boolean().default(true),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
});

export const updateWebhookSchema = z.object({
  webhookId: z.string().uuid(),
  url: z.string().url().max(2000).optional(),
  events: z.array(z.string().min(1).max(100)).min(1).max(50).optional(),
  secret: z.string().min(16).max(256).optional(),
  description: z.string().max(500).optional(),
  headers: z.record(z.string()).optional(),
  active: z.boolean().optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
});

export const webhookStatsSchema = z.object({
  webhookId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listWebhookSchema = z.object({
  status: webhookStatusEnum.optional(),
  search: z.string().max(200).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Channel Schemas ---

export const createChannelSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: channelTypeEnum.default('general'),
  isPrivate: z.boolean().default(false),
  members: z.array(z.string().uuid()).min(1).max(5000).optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const updateChannelSchema = z.object({
  channelId: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: channelTypeEnum.optional(),
  isPrivate: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const channelStatsSchema = z.object({
  channelId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listChannelSchema = z.object({
  type: channelTypeEnum.optional(),
  isPrivate: z.boolean().optional(),
  search: z.string().max(200).optional(),
  memberId: z.string().uuid().optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Search Schemas ---

export const searchSchema = z.object({
  query: z.string().min(1).max(200),
  types: z.array(z.enum(['messages', 'conversations', 'files', 'contacts', 'announcements', 'tasks', 'events'])).min(1).max(10),
  filters: z.record(z.unknown()).optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
});

export const searchStatsSchema = z.object({
  query: z.string().min(1).max(200).optional(),
  ...dateRangeSchema.shape,
});

// --- Presence Schemas ---

export const updatePresenceSchema = z.object({
  status: presenceStatusEnum,
  customMessage: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
});

export const getPresenceSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1).max(500),
});

export const presenceStatsSchema = z.object({
  ...dateRangeSchema.shape,
});

// --- Auto Response Schemas ---

export const createAutoResponseSchema = z.object({
  name: z.string().min(1).max(200),
  trigger: z.object({
    type: z.enum(['keyword', 'regex', 'time_based', 'channel']),
    value: z.string().min(1).max(500),
  }),
  response: z.object({
    content: z.string().min(1).max(5000),
    type: z.enum(['text', 'template', 'external']).default('text'),
    templateId: z.string().uuid().optional(),
    externalUrl: z.string().url().max(2000).optional(),
  }),
  channels: z.array(z.enum(['email', 'sms', 'push', 'message', 'chat'])).min(1).max(5),
  status: autoResponseStatusEnum.default('active'),
  schedule: z.object({
    startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    daysOfWeek: z.array(z.number().int().min(0).max(6)).min(1).max(7).optional(),
  }).optional(),
  maxTriggersPerDay: z.number().int().min(1).max(10000).default(100),
  metadata: z.record(z.unknown()).default({}),
});

export const updateAutoResponseSchema = z.object({
  autoResponseId: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  trigger: z.object({
    type: z.enum(['keyword', 'regex', 'time_based', 'channel']),
    value: z.string().min(1).max(500),
  }).optional(),
  response: z.object({
    content: z.string().min(1).max(5000),
    type: z.enum(['text', 'template', 'external']).default('text'),
    templateId: z.string().uuid().optional(),
    externalUrl: z.string().url().max(2000).optional(),
  }).optional(),
  channels: z.array(z.enum(['email', 'sms', 'push', 'message', 'chat'])).min(1).max(5).optional(),
  status: autoResponseStatusEnum.optional(),
  schedule: z.object({
    startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    daysOfWeek: z.array(z.number().int().min(0).max(6)).min(1).max(7).optional(),
  }).optional(),
  maxTriggersPerDay: z.number().int().min(1).max(10000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const autoResponseStatsSchema = z.object({
  autoResponseId: z.string().uuid().optional(),
  ...dateRangeSchema.shape,
});

export const listAutoResponseSchema = z.object({
  status: autoResponseStatusEnum.optional(),
  channel: z.enum(['email', 'sms', 'push', 'message', 'chat']).optional(),
  search: z.string().max(200).optional(),
  ...paginationSchema.shape,
  ...sortSchema.shape,
});

// --- Export Schemas ---

export const exportConversationSchema = z.object({
  conversationId: z.string().uuid(),
  format: exportFormatEnum.default('json'),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  includeAttachments: z.boolean().default(true),
  messageTypes: z.array(messageTypeEnum).max(10).optional(),
});

export const exportDocumentsSchema = z.object({
  folderId: z.string().uuid().optional(),
  documentIds: z.array(z.string().uuid()).max(100).optional(),
  format: exportFormatEnum.default('json'),
  includeVersions: z.boolean().default(true),
  includeComments: z.boolean().default(true),
});

// --- Scheduled Message Schemas ---

export const scheduleMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1).max(50000),
  type: messageTypeEnum.default('text'),
  scheduledAt: z.string().datetime(),
  attachments: z.array(z.object({
    fileName: z.string().min(1).max(255),
    fileUrl: z.string().url().max(2000),
    fileSize: z.number().int().min(0),
    mimeType: z.string().min(1).max(100),
  })).max(10).optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const cancelScheduledMessageSchema = z.object({
  scheduledMessageId: z.string().uuid(),
});

export const getScheduledMessagesSchema = z.object({
  conversationId: z.string().uuid().optional(),
  status: scheduledMessageStatusEnum.optional(),
  ...dateRangeSchema.shape,
  ...paginationSchema.shape,
  ...sortSchema.shape,
});
