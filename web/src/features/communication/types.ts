import type {
  Conversation,
  Message,
  MessageAttachment,
  MessageReaction,
  MessageMention,
  MessageThread,
  MessageRead,
  MessageDelivered,
  Group,
  GroupMember,
  GroupInvite,
  GroupSettings,
  Call,
  CallParticipant,
  CallRecording,
  CallInvitation,
  Email,
  EmailTemplate,
  EmailCampaign,
  EmailCampaignStats,
  EmailTracking,
  EmailSignature,
  SmsMessage,
  SmsBulk,
  SmsTemplate,
  PushNotification,
  PushSubscription,
  PushTemplate,
  Announcement,
  AnnouncementRead,
  CalendarEvent,
  CalendarAttendee,
  CalendarReminder,
  CalendarSubscription,
  Task,
  TaskComment,
  TaskChecklist,
  TaskAssignment,
  Document,
  DocumentVersion,
  DocumentPermissionEntry,
  DocumentComment,
  CollaborationSession,
  CollaborationPresence,
  AISummary,
  AITranslation,
  AICorrection,
  AIResponse,
  AIMeetingSummary,
  AISpamDetection,
  Notification,
  NotificationPreference,
  NotificationBatch,
  NotificationBatchStats,
  Contact,
  ContactGroup,
  LinkPreview,
  UserPresence,
  Poll,
  PollOption,
  PollVote,
  Webhook,
  ScheduledMessage,
  AutoResponse,
  Channel,
  SearchQuery,
  ExportJob,
  CommunicationRepository,
  ConversationType,
  ConversationStatus,
  MessageType,
  MessageStatus,
  MessagePriority,
  GroupType,
  GroupRole,
  CallType,
  CallStatus,
  EmailStatus,
  SmsProvider,
  SmsStatus,
  PushPlatform,
  PushStatus,
  AnnouncementType,
  AnnouncementPriority,
  CalendarEventType,
  TaskStatus,
  TaskPriority,
  DocumentType,
  DocumentPermissionLevel,
  CollaborationMode,
  AISummaryType,
  SpamAction,
  ThreadStatus,
  ReactionType,
  MentionType,
  TypingStatus,
  OnlineStatus,
  SearchScope,
  NotificationEventType,
} from '@educi/types';

export interface CommunicationRepositoryExtended extends CommunicationRepository {
  logCommunicationEvent(schoolId: string, event: string, data: Record<string, unknown>): Promise<void>;
  getConversationStats(conversationId: string): Promise<ConversationStats>;
  getMessageStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<MessageStats>;
  getGroupStats(groupId: string): Promise<GroupStats>;
  getCallStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<CallStats>;
  getEmailStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<EmailStats>;
  getSmsStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<SmsStats>;
  getAnnouncementStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<AnnouncementStats>;
  getNotificationStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<NotificationStats>;
  getPresenceStats(schoolId: string): Promise<PresenceStats>;
  bulkMarkAsRead(conversationId: string, userId: string, messageIds: string[]): Promise<void>;
  bulkDeleteMessages(messageIds: string[]): Promise<void>;
  bulkArchiveConversations(conversationIds: string[]): Promise<void>;
  getRecentConversations(schoolId: string, userId: string, limit?: number): Promise<Conversation[]>;
  getFrequentContacts(schoolId: string, userId: string, limit?: number): Promise<Contact[]>;
  getUnreadCounts(schoolId: string, userId: string): Promise<Record<string, number>>;
}

export interface ConversationStats {
  totalConversations: number;
  activeConversations: number;
  archivedConversations: number;
  directConversations: number;
  groupConversations: number;
  channelConversations: number;
  messagesLast24h: number;
  messagesLast7d: number;
  messagesLast30d: number;
  averageResponseTimeMinutes: number;
  peakHour: number;
}

export interface MessageStats {
  totalMessages: number;
  textMessages: number;
  imageMessages: number;
  videoMessages: number;
  audioMessages: number;
  documentMessages: number;
  voiceNotes: number;
  polls: number;
  averageMessageLength: number;
  messagesPerConversation: number;
  replyRate: number;
  reactionRate: number;
}

export interface GroupStats {
  totalGroups: number;
  activeGroups: number;
  totalMembers: number;
  averageMembersPerGroup: number;
  mostActiveGroup: string;
  messagesLast7d: number;
}

export interface CallStats {
  totalCalls: number;
  audioCalls: number;
  videoCalls: number;
  conferenceCalls: number;
  averageDurationSeconds: number;
  missedCalls: number;
  totalDurationMinutes: number;
  recordingCount: number;
}

export interface EmailStats {
  totalEmails: number;
  sentEmails: number;
  deliveredEmails: number;
  openedEmails: number;
  bouncedEmails: number;
  failedEmails: number;
  averageOpenRate: number;
  campaignCount: number;
  templateCount: number;
}

export interface SmsStats {
  totalSms: number;
  sentSms: number;
  deliveredSms: number;
  failedSms: number;
  totalCost: number;
  averageCostPerSms: number;
  bulkCount: number;
}

export interface AnnouncementStats {
  totalAnnouncements: number;
  publishedAnnouncements: number;
  draftAnnouncements: number;
  averageReadRate: number;
  averageAckRate: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
}

export interface NotificationStats {
  totalNotifications: number;
  readNotifications: number;
  unreadNotifications: number;
  byChannel: Record<string, number>;
  byType: Record<string, number>;
  deliveryRate: number;
}

export interface PresenceStats {
  onlineUsers: number;
  awayUsers: number;
  busyUsers: number;
  offlineUsers: number;
  totalUsers: number;
  averageSessionMinutes: number;
}

export type {
  Conversation,
  Message,
  MessageAttachment,
  MessageReaction,
  MessageMention,
  MessageThread,
  MessageRead,
  MessageDelivered,
  Group,
  GroupMember,
  GroupInvite,
  GroupSettings,
  Call,
  CallParticipant,
  CallRecording,
  CallInvitation,
  Email,
  EmailTemplate,
  EmailCampaign,
  EmailCampaignStats,
  EmailTracking,
  EmailSignature,
  SmsMessage,
  SmsBulk,
  SmsTemplate,
  PushNotification,
  PushSubscription,
  PushTemplate,
  Announcement,
  AnnouncementRead,
  CalendarEvent,
  CalendarAttendee,
  CalendarReminder,
  CalendarSubscription,
  Task,
  TaskComment,
  TaskChecklist,
  TaskAssignment,
  Document,
  DocumentVersion,
  DocumentPermissionEntry,
  DocumentComment,
  CollaborationSession,
  CollaborationPresence,
  AISummary,
  AITranslation,
  AICorrection,
  AIResponse,
  AIMeetingSummary,
  AISpamDetection,
  Notification,
  NotificationPreference,
  NotificationBatch,
  NotificationBatchStats,
  Contact,
  ContactGroup,
  LinkPreview,
  UserPresence,
  Poll,
  PollOption,
  PollVote,
  Webhook,
  ScheduledMessage,
  AutoResponse,
  Channel,
  SearchQuery,
  ExportJob,
  ConversationType,
  ConversationStatus,
  MessageType,
  MessageStatus,
  MessagePriority,
  GroupType,
  GroupRole,
  CallType,
  CallStatus,
  EmailStatus,
  SmsProvider,
  SmsStatus,
  PushPlatform,
  PushStatus,
  AnnouncementType,
  AnnouncementPriority,
  CalendarEventType,
  TaskStatus,
  TaskPriority,
  DocumentType,
  DocumentPermissionLevel,
  CollaborationMode,
  AISummaryType,
  SpamAction,
  ThreadStatus,
  ReactionType,
  MentionType,
  TypingStatus,
  OnlineStatus,
  SearchScope,
  NotificationEventType,
};
