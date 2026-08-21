import { z } from 'zod';

const ConversationTypeEnum = z.enum(['PRIVATE', 'GROUP', 'CLASS', 'LEVEL', 'COHORT', 'PARENTS', 'STAFF', 'TEACHERS', 'ADMIN', 'DIRECTION', 'ACCOUNTING']);
const MessageTypeEnum = z.enum(['TEXT', 'IMAGE', 'FILE', 'AUDIO', 'VIDEO', 'SYSTEM', 'ANNOUNCEMENT', 'BROADCAST']);
const MessageStatusEnum = z.enum(['SENT', 'DELIVERED', 'READ', 'DELETED', 'ARCHIVED']);
const NotificationTypeEnum = z.enum(['MESSAGE', 'ANNOUNCEMENT', 'BROADCAST', 'MENTION', 'REACTION', 'SYSTEM', 'REMINDER']);
const NotificationChannelEnum = z.enum(['IN_APP', 'PUSH', 'EMAIL', 'SMS', 'WHATSAPP']);
const BroadcastScopeEnum = z.enum(['SINGLE', 'CLASS', 'LEVEL', 'ALL_PARENTS', 'ALL_TEACHERS', 'ALL_STUDENTS', 'ALL_STAFF', 'WHOLE_SCHOOL', 'MULTI_SCHOOL']);
const ReactionTypeEnum = z.enum(['LIKE', 'LOVE', 'LAUGH', 'WOW', 'SAD', 'ANGRY']);
const GroupRoleEnum = z.enum(['OWNER', 'ADMIN', 'MODERATOR', 'MEMBER']);
const AttachmentTypeEnum = z.enum(['IMAGE', 'DOCUMENT', 'PDF', 'VIDEO', 'AUDIO', 'ARCHIVE', 'OTHER']);
const ReportReasonEnum = z.enum(['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'MISINFORMATION', 'OTHER']);

const sanitizeString = z.string().trim();

export const createConversationSchema = z.object({
  type: ConversationTypeEnum,
  title: sanitizeString.min(1, 'Titre requis').max(200),
  description: sanitizeString.max(1000).optional(),
  memberIds: z.array(z.string().uuid()).min(1, 'Au moins un membre requis'),
});

export const updateConversationSchema = z.object({
  title: sanitizeString.min(1).max(200).optional(),
  description: sanitizeString.max(1000).optional(),
  avatarUrl: z.string().url().optional().nullable(),
  isArchived: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  isMuted: z.boolean().optional(),
});

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
  content: sanitizeString.min(1, 'Message requis').max(5000),
  type: MessageTypeEnum.optional().default('TEXT'),
  replyToId: z.string().uuid().optional().nullable(),
  attachmentIds: z.array(z.string().uuid()).optional(),
});

export const editMessageSchema = z.object({
  content: sanitizeString.min(1, 'Message requis').max(5000),
});

export const messageFiltersSchema = z.object({
  conversationId: z.string().uuid().optional(),
  senderId: z.string().uuid().optional(),
  type: MessageTypeEnum.optional(),
  status: MessageStatusEnum.optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  hasAttachment: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  search: sanitizeString.max(200).optional(),
  limit: z.number().min(1).max(100).optional().default(20),
  offset: z.number().min(0).optional().default(0),
  sortBy: sanitizeString.optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const messageSearchSchema = z.object({
  query: sanitizeString.min(2, 'Requête trop courte').max(200),
  conversationId: z.string().uuid().optional(),
  senderId: z.string().uuid().optional(),
  type: MessageTypeEnum.optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  hasAttachment: z.boolean().optional(),
  limit: z.number().min(1).max(100).optional().default(20),
  offset: z.number().min(0).optional().default(0),
});

export const createGroupSchema = z.object({
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(1000).optional(),
  type: ConversationTypeEnum,
  memberIds: z.array(z.string().uuid()).min(1, 'Au moins un membre requis'),
});

export const updateGroupSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(1000).optional(),
  avatarUrl: z.string().url().optional().nullable(),
  isArchived: z.boolean().optional(),
});

export const createAnnouncementSchema = z.object({
  title: sanitizeString.min(1, 'Titre requis').max(200),
  content: sanitizeString.min(1, 'Contenu requis').max(5000),
  type: NotificationTypeEnum,
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  targetAudience: BroadcastScopeEnum,
  targetIds: z.array(z.string().uuid()).optional(),
  attachmentIds: z.array(z.string().uuid()).optional(),
  scheduledAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

export const updateAnnouncementSchema = z.object({
  title: sanitizeString.min(1).max(200).optional(),
  content: sanitizeString.min(1).max(5000).optional(),
  type: NotificationTypeEnum.optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  targetAudience: BroadcastScopeEnum.optional(),
  targetIds: z.array(z.string().uuid()).optional(),
  expiresAt: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
});

export const createBroadcastSchema = z.object({
  title: sanitizeString.min(1, 'Titre requis').max(200),
  content: sanitizeString.min(1, 'Contenu requis').max(5000),
  scope: BroadcastScopeEnum,
  targetIds: z.array(z.string().uuid()).optional(),
  channels: z.array(NotificationChannelEnum).min(1, 'Au moins un canal requis'),
  attachmentIds: z.array(z.string().uuid()).optional(),
  scheduledAt: z.string().optional(),
});

export const updateBroadcastSchema = z.object({
  title: sanitizeString.min(1).max(200).optional(),
  content: sanitizeString.min(1).max(5000).optional(),
  scope: BroadcastScopeEnum.optional(),
  targetIds: z.array(z.string().uuid()).optional(),
  channels: z.array(NotificationChannelEnum).optional(),
  scheduledAt: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'SCHEDULED', 'SENT', 'FAILED']).optional(),
});

export const addReactionSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
  type: ReactionTypeEnum,
});

export const notificationSettingsSchema = z.object({
  emailEnabled: z.boolean().optional(),
  pushEnabled: z.boolean().optional(),
  smsEnabled: z.boolean().optional(),
  whatsappEnabled: z.boolean().optional(),
  messageNotifications: z.boolean().optional(),
  announcementNotifications: z.boolean().optional(),
  broadcastNotifications: z.boolean().optional(),
  mentionNotifications: z.boolean().optional(),
  reactionNotifications: z.boolean().optional(),
  systemNotifications: z.boolean().optional(),
  quietHoursStart: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis').optional().nullable(),
  quietHoursEnd: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis').optional().nullable(),
});

export const notificationPreferenceSchema = z.object({
  channel: NotificationChannelEnum,
  type: NotificationTypeEnum,
  isEnabled: z.boolean(),
});

export const attachmentUploadSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 25 * 1024 * 1024, 'Le fichier ne doit pas dépasser 25MB'),
});

export const reportMessageSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
  reason: ReportReasonEnum,
  description: sanitizeString.max(1000).optional(),
});

export const moderationActionSchema = z.object({
  userId: z.string().uuid('ID utilisateur invalide'),
  action: z.enum(['WARNING', 'MUTED', 'BLOCKED', 'REMOVED', 'BANNED']),
  reason: sanitizeString.min(1, 'Raison requise').max(500),
  duration: z.number().min(1).optional(),
});

export const archiveConversationSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
});

export const deleteMessageSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
  permanent: z.boolean().default(false),
});

export const forwardMessageSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
  targetConversationIds: z.array(z.string().uuid()).min(1, 'Au moins une conversation requise'),
});

export const pinMessageSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
});

export const muteConversationSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
  muted: z.boolean(),
});

export const bulkMarkReadSchema = z.object({
  messageIds: z.array(z.string().uuid()).min(1, 'Au moins un message requis'),
});

export const exportMessagesSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
  format: z.enum(['PDF', 'CSV', 'JSON']).default('PDF'),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const importMessagesSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
  file: z.custom<File>()
    .refine((f) => f instanceof File, 'Fichier requis')
    .refine((f) => f instanceof File && f.size <= 10 * 1024 * 1024, 'Le fichier ne doit pas dépasser 10MB'),
});

export const conversationSearchSchema = z.object({
  query: sanitizeString.min(2, 'Requête trop courte').max(200),
  type: ConversationTypeEnum.optional(),
  isArchived: z.boolean().optional(),
  limit: z.number().min(1).max(50).optional().default(20),
});

export const memberRoleSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
  userId: z.string().uuid('ID utilisateur invalide'),
  role: GroupRoleEnum,
});

export const notificationBatchSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1, 'Au moins un utilisateur requis'),
  type: NotificationTypeEnum,
  title: sanitizeString.min(1, 'Titre requis').max(200),
  body: sanitizeString.min(1, ' Corps requis').max(2000),
  channels: z.array(NotificationChannelEnum).optional(),
});

export const broadcastScheduleSchema = z.object({
  broadcastId: z.string().uuid('ID de diffusion invalide'),
  scheduledAt: z.string().min(1, 'Date de programmation requise'),
});

export const searchFilterSchema = z.object({
  query: sanitizeString.min(2, 'Requête trop courte').max(200),
  types: z.array(z.enum(['CONVERSATION', 'MESSAGE', 'ANNOUNCEMENT', 'BROADCAST'])).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  conversationId: z.string().uuid().optional(),
  senderId: z.string().uuid().optional(),
  limit: z.number().min(1).max(100).optional().default(20),
  offset: z.number().min(0).optional().default(0),
});

export const messageStatsSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  conversationId: z.string().uuid().optional(),
  type: MessageTypeEnum.optional(),
});

export const attachmentDownloadSchema = z.object({
  attachmentId: z.string().uuid('ID de pièce jointe invalide'),
});

export const announcementPublishSchema = z.object({
  announcementId: z.string().uuid('ID d\'annonce invalide'),
});

export const conversationArchiveSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
  archive: z.boolean(),
});

export const messageRestoreSchema = z.object({
  messageId: z.string().uuid('ID de message invalide'),
});

export const conversationRestoreSchema = z.object({
  conversationId: z.string().uuid('ID de conversation invalide'),
});

export const groupMemberSchema = z.object({
  groupId: z.string().uuid('ID de groupe invalide'),
  userId: z.string().uuid('ID utilisateur invalide'),
  role: GroupRoleEnum.optional().default('MEMBER'),
});

export const settingsUpdateSchema = z.object({
  emailEnabled: z.boolean().optional(),
  pushEnabled: z.boolean().optional(),
  smsEnabled: z.boolean().optional(),
  whatsappEnabled: z.boolean().optional(),
  messageNotifications: z.boolean().optional(),
  announcementNotifications: z.boolean().optional(),
  broadcastNotifications: z.boolean().optional(),
  mentionNotifications: z.boolean().optional(),
  reactionNotifications: z.boolean().optional(),
  systemNotifications: z.boolean().optional(),
  quietHoursStart: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis').optional().nullable(),
  quietHoursEnd: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM requis').optional().nullable(),
});

export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type UpdateConversationInput = z.infer<typeof updateConversationSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type EditMessageInput = z.infer<typeof editMessageSchema>;
export type MessageFiltersInput = z.infer<typeof messageFiltersSchema>;
export type MessageSearchInput = z.infer<typeof messageSearchSchema>;
export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
export type CreateBroadcastInput = z.infer<typeof createBroadcastSchema>;
export type UpdateBroadcastInput = z.infer<typeof updateBroadcastSchema>;
export type AddReactionInput = z.infer<typeof addReactionSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
export type NotificationPreferenceInput = z.infer<typeof notificationPreferenceSchema>;
export type AttachmentUploadInput = z.infer<typeof attachmentUploadSchema>;
export type ReportMessageInput = z.infer<typeof reportMessageSchema>;
export type ModerationActionInput = z.infer<typeof moderationActionSchema>;
export type ArchiveConversationInput = z.infer<typeof archiveConversationSchema>;
export type DeleteMessageInput = z.infer<typeof deleteMessageSchema>;
export type ForwardMessageInput = z.infer<typeof forwardMessageSchema>;
export type PinMessageInput = z.infer<typeof pinMessageSchema>;
export type MuteConversationInput = z.infer<typeof muteConversationSchema>;
export type BulkMarkReadInput = z.infer<typeof bulkMarkReadSchema>;
export type ExportMessagesInput = z.infer<typeof exportMessagesSchema>;
export type ImportMessagesInput = z.infer<typeof importMessagesSchema>;
export type ConversationSearchInput = z.infer<typeof conversationSearchSchema>;
export type MemberRoleInput = z.infer<typeof memberRoleSchema>;
export type NotificationBatchInput = z.infer<typeof notificationBatchSchema>;
export type BroadcastScheduleInput = z.infer<typeof broadcastScheduleSchema>;
export type SearchFilterInput = z.infer<typeof searchFilterSchema>;
export type MessageStatsInput = z.infer<typeof messageStatsSchema>;
export type AttachmentDownloadInput = z.infer<typeof attachmentDownloadSchema>;
export type AnnouncementPublishInput = z.infer<typeof announcementPublishSchema>;
export type ConversationArchiveInput = z.infer<typeof conversationArchiveSchema>;
export type MessageRestoreInput = z.infer<typeof messageRestoreSchema>;
export type ConversationRestoreInput = z.infer<typeof conversationRestoreSchema>;
export type GroupMemberInput = z.infer<typeof groupMemberSchema>;
export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
