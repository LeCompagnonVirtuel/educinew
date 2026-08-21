import { describe, it, expect } from 'vitest';
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

import type {
  CommunicationRepositoryExtended,
  ConversationStats,
  MessageStats,
  GroupStats,
  CallStats,
  EmailStats,
  SmsStats,
  AnnouncementStats,
  NotificationStats,
  PresenceStats,
} from '../../src/features/communication/types';

describe('Communication Types', () => {
  describe('ConversationStats interface', () => {
    it('should have totalConversations', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.totalConversations).toBe(10);
    });

    it('should have activeConversations', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.activeConversations).toBe(5);
    });

    it('should have archivedConversations', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.archivedConversations).toBe(5);
    });

    it('should have directConversations', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.directConversations).toBe(3);
    });

    it('should have groupConversations', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.groupConversations).toBe(2);
    });

    it('should have channelConversations', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.channelConversations).toBe(1);
    });

    it('should have messagesLast24h', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.messagesLast24h).toBe(100);
    });

    it('should have messagesLast7d', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.messagesLast7d).toBe(500);
    });

    it('should have messagesLast30d', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.messagesLast30d).toBe(2000);
    });

    it('should have averageResponseTimeMinutes', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.averageResponseTimeMinutes).toBe(5);
    });

    it('should have peakHour', () => {
      const stats: ConversationStats = {
        totalConversations: 10,
        activeConversations: 5,
        archivedConversations: 5,
        directConversations: 3,
        groupConversations: 2,
        channelConversations: 1,
        messagesLast24h: 100,
        messagesLast7d: 500,
        messagesLast30d: 2000,
        averageResponseTimeMinutes: 5,
        peakHour: 14,
      };
      expect(stats.peakHour).toBe(14);
    });
  });

  describe('MessageStats interface', () => {
    it('should have totalMessages', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.totalMessages).toBe(1000);
    });

    it('should have textMessages', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.textMessages).toBe(800);
    });

    it('should have imageMessages', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.imageMessages).toBe(100);
    });

    it('should have videoMessages', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.videoMessages).toBe(50);
    });

    it('should have audioMessages', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.audioMessages).toBe(30);
    });

    it('should have documentMessages', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.documentMessages).toBe(20);
    });

    it('should have voiceNotes', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.voiceNotes).toBe(10);
    });

    it('should have polls', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.polls).toBe(5);
    });

    it('should have averageMessageLength', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.averageMessageLength).toBe(150);
    });

    it('should have messagesPerConversation', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.messagesPerConversation).toBe(25);
    });

    it('should have replyRate', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.replyRate).toBe(0.65);
    });

    it('should have reactionRate', () => {
      const stats: MessageStats = {
        totalMessages: 1000,
        textMessages: 800,
        imageMessages: 100,
        videoMessages: 50,
        audioMessages: 30,
        documentMessages: 20,
        voiceNotes: 10,
        polls: 5,
        averageMessageLength: 150,
        messagesPerConversation: 25,
        replyRate: 0.65,
        reactionRate: 0.3,
      };
      expect(stats.reactionRate).toBe(0.3);
    });
  });

  describe('GroupStats interface', () => {
    it('should have totalGroups', () => {
      const stats: GroupStats = {
        totalGroups: 50,
        activeGroups: 30,
        totalMembers: 200,
        averageMembersPerGroup: 4,
        mostActiveGroup: 'group-1',
        messagesLast7d: 1000,
      };
      expect(stats.totalGroups).toBe(50);
    });

    it('should have activeGroups', () => {
      const stats: GroupStats = {
        totalGroups: 50,
        activeGroups: 30,
        totalMembers: 200,
        averageMembersPerGroup: 4,
        mostActiveGroup: 'group-1',
        messagesLast7d: 1000,
      };
      expect(stats.activeGroups).toBe(30);
    });

    it('should have totalMembers', () => {
      const stats: GroupStats = {
        totalGroups: 50,
        activeGroups: 30,
        totalMembers: 200,
        averageMembersPerGroup: 4,
        mostActiveGroup: 'group-1',
        messagesLast7d: 1000,
      };
      expect(stats.totalMembers).toBe(200);
    });

    it('should have averageMembersPerGroup', () => {
      const stats: GroupStats = {
        totalGroups: 50,
        activeGroups: 30,
        totalMembers: 200,
        averageMembersPerGroup: 4,
        mostActiveGroup: 'group-1',
        messagesLast7d: 1000,
      };
      expect(stats.averageMembersPerGroup).toBe(4);
    });

    it('should have mostActiveGroup', () => {
      const stats: GroupStats = {
        totalGroups: 50,
        activeGroups: 30,
        totalMembers: 200,
        averageMembersPerGroup: 4,
        mostActiveGroup: 'group-1',
        messagesLast7d: 1000,
      };
      expect(stats.mostActiveGroup).toBe('group-1');
    });

    it('should have messagesLast7d', () => {
      const stats: GroupStats = {
        totalGroups: 50,
        activeGroups: 30,
        totalMembers: 200,
        averageMembersPerGroup: 4,
        mostActiveGroup: 'group-1',
        messagesLast7d: 1000,
      };
      expect(stats.messagesLast7d).toBe(1000);
    });
  });

  describe('CallStats interface', () => {
    it('should have totalCalls', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.totalCalls).toBe(100);
    });

    it('should have audioCalls', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.audioCalls).toBe(60);
    });

    it('should have videoCalls', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.videoCalls).toBe(30);
    });

    it('should have conferenceCalls', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.conferenceCalls).toBe(10);
    });

    it('should have averageDurationSeconds', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.averageDurationSeconds).toBe(300);
    });

    it('should have missedCalls', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.missedCalls).toBe(15);
    });

    it('should have totalDurationMinutes', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.totalDurationMinutes).toBe(500);
    });

    it('should have recordingCount', () => {
      const stats: CallStats = {
        totalCalls: 100,
        audioCalls: 60,
        videoCalls: 30,
        conferenceCalls: 10,
        averageDurationSeconds: 300,
        missedCalls: 15,
        totalDurationMinutes: 500,
        recordingCount: 25,
      };
      expect(stats.recordingCount).toBe(25);
    });
  });

  describe('EmailStats interface', () => {
    it('should have totalEmails', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.totalEmails).toBe(5000);
    });

    it('should have sentEmails', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.sentEmails).toBe(4800);
    });

    it('should have deliveredEmails', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.deliveredEmails).toBe(4700);
    });

    it('should have openedEmails', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.openedEmails).toBe(3500);
    });

    it('should have bouncedEmails', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.bouncedEmails).toBe(100);
    });

    it('should have failedEmails', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.failedEmails).toBe(50);
    });

    it('should have averageOpenRate', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.averageOpenRate).toBe(0.72);
    });

    it('should have campaignCount', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.campaignCount).toBe(10);
    });

    it('should have templateCount', () => {
      const stats: EmailStats = {
        totalEmails: 5000,
        sentEmails: 4800,
        deliveredEmails: 4700,
        openedEmails: 3500,
        bouncedEmails: 100,
        failedEmails: 50,
        averageOpenRate: 0.72,
        campaignCount: 10,
        templateCount: 20,
      };
      expect(stats.templateCount).toBe(20);
    });
  });

  describe('SmsStats interface', () => {
    it('should have totalSms', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.totalSms).toBe(1000);
    });

    it('should have sentSms', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.sentSms).toBe(950);
    });

    it('should have deliveredSms', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.deliveredSms).toBe(900);
    });

    it('should have failedSms', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.failedSms).toBe(50);
    });

    it('should have totalCost', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.totalCost).toBe(75.50);
    });

    it('should have averageCostPerSms', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.averageCostPerSms).toBe(0.075);
    });

    it('should have bulkCount', () => {
      const stats: SmsStats = {
        totalSms: 1000,
        sentSms: 950,
        deliveredSms: 900,
        failedSms: 50,
        totalCost: 75.50,
        averageCostPerSms: 0.075,
        bulkCount: 5,
      };
      expect(stats.bulkCount).toBe(5);
    });
  });

  describe('AnnouncementStats interface', () => {
    it('should have totalAnnouncements', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.totalAnnouncements).toBe(100);
    });

    it('should have publishedAnnouncements', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.publishedAnnouncements).toBe(80);
    });

    it('should have draftAnnouncements', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.draftAnnouncements).toBe(20);
    });

    it('should have averageReadRate', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.averageReadRate).toBe(0.85);
    });

    it('should have averageAckRate', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.averageAckRate).toBe(0.60);
    });

    it('should have byType', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.byType).toEqual({ info: 50, warning: 30, urgent: 20 });
    });

    it('should have byPriority', () => {
      const stats: AnnouncementStats = {
        totalAnnouncements: 100,
        publishedAnnouncements: 80,
        draftAnnouncements: 20,
        averageReadRate: 0.85,
        averageAckRate: 0.60,
        byType: { info: 50, warning: 30, urgent: 20 },
        byPriority: { low: 30, medium: 50, high: 20 },
      };
      expect(stats.byPriority).toEqual({ low: 30, medium: 50, high: 20 });
    });
  });

  describe('NotificationStats interface', () => {
    it('should have totalNotifications', () => {
      const stats: NotificationStats = {
        totalNotifications: 5000,
        readNotifications: 4000,
        unreadNotifications: 1000,
        byChannel: { email: 2000, push: 1500, sms: 1000, inApp: 500 },
        byType: { message: 2000, task: 1500, calendar: 1000, other: 500 },
        deliveryRate: 0.98,
      };
      expect(stats.totalNotifications).toBe(5000);
    });

    it('should have readNotifications', () => {
      const stats: NotificationStats = {
        totalNotifications: 5000,
        readNotifications: 4000,
        unreadNotifications: 1000,
        byChannel: { email: 2000, push: 1500, sms: 1000, inApp: 500 },
        byType: { message: 2000, task: 1500, calendar: 1000, other: 500 },
        deliveryRate: 0.98,
      };
      expect(stats.readNotifications).toBe(4000);
    });

    it('should have unreadNotifications', () => {
      const stats: NotificationStats = {
        totalNotifications: 5000,
        readNotifications: 4000,
        unreadNotifications: 1000,
        byChannel: { email: 2000, push: 1500, sms: 1000, inApp: 500 },
        byType: { message: 2000, task: 1500, calendar: 1000, other: 500 },
        deliveryRate: 0.98,
      };
      expect(stats.unreadNotifications).toBe(1000);
    });

    it('should have byChannel', () => {
      const stats: NotificationStats = {
        totalNotifications: 5000,
        readNotifications: 4000,
        unreadNotifications: 1000,
        byChannel: { email: 2000, push: 1500, sms: 1000, inApp: 500 },
        byType: { message: 2000, task: 1500, calendar: 1000, other: 500 },
        deliveryRate: 0.98,
      };
      expect(stats.byChannel).toEqual({ email: 2000, push: 1500, sms: 1000, inApp: 500 });
    });

    it('should have byType', () => {
      const stats: NotificationStats = {
        totalNotifications: 5000,
        readNotifications: 4000,
        unreadNotifications: 1000,
        byChannel: { email: 2000, push: 1500, sms: 1000, inApp: 500 },
        byType: { message: 2000, task: 1500, calendar: 1000, other: 500 },
        deliveryRate: 0.98,
      };
      expect(stats.byType).toEqual({ message: 2000, task: 1500, calendar: 1000, other: 500 });
    });

    it('should have deliveryRate', () => {
      const stats: NotificationStats = {
        totalNotifications: 5000,
        readNotifications: 4000,
        unreadNotifications: 1000,
        byChannel: { email: 2000, push: 1500, sms: 1000, inApp: 500 },
        byType: { message: 2000, task: 1500, calendar: 1000, other: 500 },
        deliveryRate: 0.98,
      };
      expect(stats.deliveryRate).toBe(0.98);
    });
  });

  describe('PresenceStats interface', () => {
    it('should have onlineUsers', () => {
      const stats: PresenceStats = {
        onlineUsers: 50,
        awayUsers: 10,
        busyUsers: 5,
        offlineUsers: 35,
        totalUsers: 100,
        averageSessionMinutes: 45,
      };
      expect(stats.onlineUsers).toBe(50);
    });

    it('should have awayUsers', () => {
      const stats: PresenceStats = {
        onlineUsers: 50,
        awayUsers: 10,
        busyUsers: 5,
        offlineUsers: 35,
        totalUsers: 100,
        averageSessionMinutes: 45,
      };
      expect(stats.awayUsers).toBe(10);
    });

    it('should have busyUsers', () => {
      const stats: PresenceStats = {
        onlineUsers: 50,
        awayUsers: 10,
        busyUsers: 5,
        offlineUsers: 35,
        totalUsers: 100,
        averageSessionMinutes: 45,
      };
      expect(stats.busyUsers).toBe(5);
    });

    it('should have offlineUsers', () => {
      const stats: PresenceStats = {
        onlineUsers: 50,
        awayUsers: 10,
        busyUsers: 5,
        offlineUsers: 35,
        totalUsers: 100,
        averageSessionMinutes: 45,
      };
      expect(stats.offlineUsers).toBe(35);
    });

    it('should have totalUsers', () => {
      const stats: PresenceStats = {
        onlineUsers: 50,
        awayUsers: 10,
        busyUsers: 5,
        offlineUsers: 35,
        totalUsers: 100,
        averageSessionMinutes: 45,
      };
      expect(stats.totalUsers).toBe(100);
    });

    it('should have averageSessionMinutes', () => {
      const stats: PresenceStats = {
        onlineUsers: 50,
        awayUsers: 10,
        busyUsers: 5,
        offlineUsers: 35,
        totalUsers: 100,
        averageSessionMinutes: 45,
      };
      expect(stats.averageSessionMinutes).toBe(45);
    });
  });

  describe('CommunicationRepositoryExtended interface', () => {
    it('should have logCommunicationEvent method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.logCommunicationEvent).toBe('function');
    });

    it('should have getConversationStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getConversationStats).toBe('function');
    });

    it('should have getMessageStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getMessageStats).toBe('function');
    });

    it('should have getGroupStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getGroupStats).toBe('function');
    });

    it('should have getCallStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getCallStats).toBe('function');
    });

    it('should have getEmailStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getEmailStats).toBe('function');
    });

    it('should have getSmsStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getSmsStats).toBe('function');
    });

    it('should have getAnnouncementStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getAnnouncementStats).toBe('function');
    });

    it('should have getNotificationStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getNotificationStats).toBe('function');
    });

    it('should have getPresenceStats method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getPresenceStats).toBe('function');
    });

    it('should have bulkMarkAsRead method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.bulkMarkAsRead).toBe('function');
    });

    it('should have bulkDeleteMessages method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.bulkDeleteMessages).toBe('function');
    });

    it('should have bulkArchiveConversations method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.bulkArchiveConversations).toBe('function');
    });

    it('should have getRecentConversations method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getRecentConversations).toBe('function');
    });

    it('should have getFrequentContacts method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getFrequentContacts).toBe('function');
    });

    it('should have getUnreadCounts method signature', () => {
      const mockRepo: CommunicationRepositoryExtended = {
        logCommunicationEvent: vi.fn(),
        getConversationStats: vi.fn(),
        getMessageStats: vi.fn(),
        getGroupStats: vi.fn(),
        getCallStats: vi.fn(),
        getEmailStats: vi.fn(),
        getSmsStats: vi.fn(),
        getAnnouncementStats: vi.fn(),
        getNotificationStats: vi.fn(),
        getPresenceStats: vi.fn(),
        bulkMarkAsRead: vi.fn(),
        bulkDeleteMessages: vi.fn(),
        bulkArchiveConversations: vi.fn(),
        getRecentConversations: vi.fn(),
        getFrequentContacts: vi.fn(),
        getUnreadCounts: vi.fn(),
      } as any;
      expect(typeof mockRepo.getUnreadCounts).toBe('function');
    });
  });

  describe('Type compatibility', () => {
    it('should allow Conversation type to be used as object', () => {
      const conv: Partial<Conversation> = { id: 'test', type: 'direct' };
      expect(conv.id).toBe('test');
    });

    it('should allow Message type to be used as object', () => {
      const msg: Partial<Message> = { id: 'test', content: 'Hello' };
      expect(msg.content).toBe('Hello');
    });

    it('should allow Group type to be used as object', () => {
      const group: Partial<Group> = { id: 'test', name: 'Test Group' };
      expect(group.name).toBe('Test Group');
    });

    it('should allow Call type to be used as object', () => {
      const call: Partial<Call> = { id: 'test', type: 'video' };
      expect(call.type).toBe('video');
    });

    it('should allow Email type to be used as object', () => {
      const email: Partial<Email> = { id: 'test', subject: 'Test' };
      expect(email.subject).toBe('Test');
    });

    it('should allow Notification type to be used as object', () => {
      const notif: Partial<Notification> = { id: 'test', title: 'Test' };
      expect(notif.title).toBe('Test');
    });

    it('should allow Task type to be used as object', () => {
      const task: Partial<Task> = { id: 'test', title: 'Test Task' };
      expect(task.title).toBe('Test Task');
    });

    it('should allow Document type to be used as object', () => {
      const doc: Partial<Document> = { id: 'test', name: 'Test Doc' };
      expect(doc.name).toBe('Test Doc');
    });

    it('should allow Contact type to be used as object', () => {
      const contact: Partial<Contact> = { id: 'test', name: 'Test Contact' };
      expect(contact.name).toBe('Test Contact');
    });

    it('should allow Poll type to be used as object', () => {
      const poll: Partial<Poll> = { id: 'test', question: 'Test?' };
      expect(poll.question).toBe('Test?');
    });

    it('should allow Webhook type to be used as object', () => {
      const webhook: Partial<Webhook> = { id: 'test', url: 'https://test.com' };
      expect(webhook.url).toBe('https://test.com');
    });

    it('should allow Channel type to be used as object', () => {
      const channel: Partial<Channel> = { id: 'test', name: 'general' };
      expect(channel.name).toBe('general');
    });

    it('should allow CalendarEvent type to be used as object', () => {
      const event: Partial<CalendarEvent> = { id: 'test', title: 'Meeting' };
      expect(event.title).toBe('Meeting');
    });

    it('should allow Announcement type to be used as object', () => {
      const announcement: Partial<Announcement> = { id: 'test', title: 'News' };
      expect(announcement.title).toBe('News');
    });

    it('should allow SmsMessage type to be used as object', () => {
      const sms: Partial<SmsMessage> = { id: 'test', message: 'Hello' };
      expect(sms.message).toBe('Hello');
    });

    it('should allow PushNotification type to be used as object', () => {
      const push: Partial<PushNotification> = { id: 'test', title: 'Alert' };
      expect(push.title).toBe('Alert');
    });

    it('should allow AutoResponse type to be used as object', () => {
      const auto: Partial<AutoResponse> = { id: 'test', trigger: 'keyword' };
      expect(auto.trigger).toBe('keyword');
    });

    it('should allow ScheduledMessage type to be used as object', () => {
      const scheduled: Partial<ScheduledMessage> = { id: 'test', content: 'Later' };
      expect(scheduled.content).toBe('Later');
    });
  });
});
