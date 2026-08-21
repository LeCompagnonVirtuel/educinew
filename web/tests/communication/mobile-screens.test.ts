import { describe, it, expect, vi } from 'vitest';
import { createConversationService } from '../../src/features/communication/services/conversation.service';
import { createMessageService } from '../../src/features/communication/services/message.service';
import { createCallService } from '../../src/features/communication/services/call.service';
import { createGroupService } from '../../src/features/communication/services/group.service';
import { createNotificationService } from '../../src/features/communication/services/notification.service';
import { createEmailService } from '../../src/features/communication/services/email.service';
import { createSmsService } from '../../src/features/communication/services/sms.service';
import { createPushService } from '../../src/features/communication/services/push.service';
import { createAnnouncementService } from '../../src/features/communication/services/announcement.service';
import { createCalendarService } from '../../src/features/communication/services/calendar.service';
import { createTaskService } from '../../src/features/communication/services/task.service';
import { createDocumentService } from '../../src/features/communication/services/document.service';
import { createContactService } from '../../src/features/communication/services/contact.service';
import { createPollService } from '../../src/features/communication/services/poll.service';
import { createChannelService } from '../../src/features/communication/services/channel.service';
import { createPresenceService } from '../../src/features/communication/services/presence.service';
import { createAutoResponseService } from '../../src/features/communication/services/auto-response.service';
import { createSearchService } from '../../src/features/communication/services/search.service';
import { createExportService } from '../../src/features/communication/services/export.service';
import { createScheduledMessageService } from '../../src/features/communication/services/scheduled-message.service';
import { createWebhookService } from '../../src/features/communication/services/webhook.service';
import { createAiService } from '../../src/features/communication/services/ai.service';
import { createCollaborationService } from '../../src/features/communication/services/collaboration.service';
import { createThreadService } from '../../src/features/communication/services/thread.service';

const mockRepository = {
  logCommunicationEvent: vi.fn().mockResolvedValue(undefined),
  getConversationStats: vi.fn().mockResolvedValue({ totalConversations: 0 }),
  getMessageStats: vi.fn().mockResolvedValue({ totalMessages: 0 }),
  getGroupStats: vi.fn().mockResolvedValue({ totalGroups: 0 }),
  getCallStats: vi.fn().mockResolvedValue({ totalCalls: 0 }),
  getEmailStats: vi.fn().mockResolvedValue({ totalEmails: 0 }),
  getSmsStats: vi.fn().mockResolvedValue({ totalSms: 0 }),
  getAnnouncementStats: vi.fn().mockResolvedValue({ totalAnnouncements: 0 }),
  getNotificationStats: vi.fn().mockResolvedValue({ totalNotifications: 0 }),
  getPresenceStats: vi.fn().mockResolvedValue({ onlineUsers: 0 }),
  bulkMarkAsRead: vi.fn().mockResolvedValue(undefined),
  bulkDeleteMessages: vi.fn().mockResolvedValue(undefined),
  bulkArchiveConversations: vi.fn().mockResolvedValue(undefined),
  getRecentConversations: vi.fn().mockResolvedValue([]),
  getFrequentContacts: vi.fn().mockResolvedValue([]),
  getUnreadCounts: vi.fn().mockResolvedValue({}),
  getConversations: vi.fn().mockResolvedValue([]),
  getConversation: vi.fn().mockResolvedValue(null),
  createConversation: vi.fn().mockResolvedValue({ id: 'c1' }),
  updateConversation: vi.fn().mockResolvedValue({ id: 'c1' }),
  deleteConversation: vi.fn().mockResolvedValue(undefined),
  archiveConversation: vi.fn().mockResolvedValue({ id: 'c1' }),
  muteConversation: vi.fn().mockResolvedValue({ id: 'c1' }),
  pinConversation: vi.fn().mockResolvedValue({ id: 'c1' }),
  addParticipant: vi.fn().mockResolvedValue({ id: 'c1' }),
  removeParticipant: vi.fn().mockResolvedValue({ id: 'c1' }),
  getMessages: vi.fn().mockResolvedValue([]),
  getMessage: vi.fn().mockResolvedValue(null),
  sendMessage: vi.fn().mockResolvedValue({ id: 'm1' }),
  editMessage: vi.fn().mockResolvedValue({ id: 'm1' }),
  deleteMessage: vi.fn().mockResolvedValue(undefined),
  pinMessage: vi.fn().mockResolvedValue({ id: 'm1' }),
  reactToMessage: vi.fn().mockResolvedValue({ id: 'r1' }),
  removeReaction: vi.fn().mockResolvedValue(undefined),
  replyToMessage: vi.fn().mockResolvedValue({ id: 'm1' }),
  forwardMessage: vi.fn().mockResolvedValue([]),
  searchMessages: vi.fn().mockResolvedValue([]),
  markAsRead: vi.fn().mockResolvedValue(undefined),
  markAsDelivered: vi.fn().mockResolvedValue(undefined),
  getUnreadCount: vi.fn().mockResolvedValue(0),
  getThread: vi.fn().mockResolvedValue(null),
  getThreadMessages: vi.fn().mockResolvedValue([]),
  lockThread: vi.fn().mockResolvedValue({ id: 't1' }),
  getGroups: vi.fn().mockResolvedValue([]),
  getGroup: vi.fn().mockResolvedValue(null),
  createGroup: vi.fn().mockResolvedValue({ id: 'g1' }),
  updateGroup: vi.fn().mockResolvedValue({ id: 'g1' }),
  deleteGroup: vi.fn().mockResolvedValue(undefined),
  addGroupMember: vi.fn().mockResolvedValue({ id: 'gm1' }),
  removeGroupMember: vi.fn().mockResolvedValue(undefined),
  updateGroupMemberRole: vi.fn().mockResolvedValue({ id: 'gm1' }),
  inviteToGroup: vi.fn().mockResolvedValue({ id: 'gi1' }),
  getGroupInvites: vi.fn().mockResolvedValue([]),
  getCalls: vi.fn().mockResolvedValue([]),
  getCall: vi.fn().mockResolvedValue({ id: 'call1' }),
  createCall: vi.fn().mockResolvedValue({ id: 'call1' }),
  updateCall: vi.fn().mockResolvedValue({ id: 'call1' }),
  joinCall: vi.fn().mockResolvedValue({ id: 'cp1' }),
  leaveCall: vi.fn().mockResolvedValue(undefined),
  endCall: vi.fn().mockResolvedValue({ id: 'call1' }),
  muteCallParticipant: vi.fn().mockResolvedValue({ id: 'cp1' }),
  toggleVideo: vi.fn().mockResolvedValue({ id: 'cp1' }),
  toggleScreenShare: vi.fn().mockResolvedValue({ id: 'cp1' }),
  getCallRecording: vi.fn().mockResolvedValue(null),
  getEmails: vi.fn().mockResolvedValue([]),
  getEmail: vi.fn().mockResolvedValue(null),
  sendEmail: vi.fn().mockResolvedValue({ id: 'e1' }),
  saveDraft: vi.fn().mockResolvedValue({ id: 'e1' }),
  deleteEmail: vi.fn().mockResolvedValue(undefined),
  getEmailTemplates: vi.fn().mockResolvedValue([]),
  createEmailTemplate: vi.fn().mockResolvedValue({ id: 'et1' }),
  updateEmailTemplate: vi.fn().mockResolvedValue({ id: 'et1' }),
  deleteEmailTemplate: vi.fn().mockResolvedValue(undefined),
  sendCampaign: vi.fn().mockResolvedValue({ id: 'ec1' }),
  getEmailCampaigns: vi.fn().mockResolvedValue([]),
  getEmailSignatures: vi.fn().mockResolvedValue([]),
  getSmsMessages: vi.fn().mockResolvedValue([]),
  sendSms: vi.fn().mockResolvedValue({ id: 's1' }),
  sendBulkSms: vi.fn().mockResolvedValue({ id: 'sb1' }),
  getSmsTemplates: vi.fn().mockResolvedValue([]),
  createSmsTemplate: vi.fn().mockResolvedValue({ id: 'st1' }),
  deleteSmsTemplate: vi.fn().mockResolvedValue(undefined),
  getPushNotifications: vi.fn().mockResolvedValue([]),
  sendPushNotification: vi.fn().mockResolvedValue({ id: 'p1' }),
  subscribeToPush: vi.fn().mockResolvedValue({ id: 'ps1' }),
  unsubscribeFromPush: vi.fn().mockResolvedValue(undefined),
  getPushTemplates: vi.fn().mockResolvedValue([]),
  deletePushTemplate: vi.fn().mockResolvedValue(undefined),
  getAnnouncements: vi.fn().mockResolvedValue([]),
  getAnnouncement: vi.fn().mockResolvedValue(null),
  createAnnouncement: vi.fn().mockResolvedValue({ id: 'a1' }),
  updateAnnouncement: vi.fn().mockResolvedValue({ id: 'a1' }),
  deleteAnnouncement: vi.fn().mockResolvedValue(undefined),
  publishAnnouncement: vi.fn().mockResolvedValue({ id: 'a1' }),
  acknowledgeAnnouncement: vi.fn().mockResolvedValue(undefined),
  getCalendarEvents: vi.fn().mockResolvedValue([]),
  getCalendarEvent: vi.fn().mockResolvedValue(null),
  createCalendarEvent: vi.fn().mockResolvedValue({ id: 'ce1' }),
  updateCalendarEvent: vi.fn().mockResolvedValue({ id: 'ce1' }),
  deleteCalendarEvent: vi.fn().mockResolvedValue(undefined),
  respondToEvent: vi.fn().mockResolvedValue({ id: 'ca1' }),
  getCalendarSubscriptions: vi.fn().mockResolvedValue([]),
  getTasks: vi.fn().mockResolvedValue([]),
  getTask: vi.fn().mockResolvedValue(null),
  createTask: vi.fn().mockResolvedValue({ id: 'tk1' }),
  updateTask: vi.fn().mockResolvedValue({ id: 'tk1' }),
  deleteTask: vi.fn().mockResolvedValue(undefined),
  assignTask: vi.fn().mockResolvedValue({ id: 'ta1' }),
  addTaskComment: vi.fn().mockResolvedValue({ id: 'tc1' }),
  toggleTaskChecklist: vi.fn().mockResolvedValue({ id: 'tcl1' }),
  getDocuments: vi.fn().mockResolvedValue([]),
  getDocument: vi.fn().mockResolvedValue(null),
  createDocument: vi.fn().mockResolvedValue({ id: 'd1' }),
  updateDocument: vi.fn().mockResolvedValue({ id: 'd1' }),
  deleteDocument: vi.fn().mockResolvedValue(undefined),
  moveDocument: vi.fn().mockResolvedValue({ id: 'd1' }),
  shareDocument: vi.fn().mockResolvedValue({ id: 'dp1' }),
  getDocumentVersions: vi.fn().mockResolvedValue([]),
  addDocumentVersion: vi.fn().mockResolvedValue({ id: 'dv1' }),
  addDocumentComment: vi.fn().mockResolvedValue({ id: 'dc1' }),
  startCollaborationSession: vi.fn().mockResolvedValue({ id: 'cs1' }),
  updateCollaborationPresence: vi.fn().mockResolvedValue({ id: 'cp1' }),
  endCollaborationSession: vi.fn().mockResolvedValue(undefined),
  getCollaborationSessions: vi.fn().mockResolvedValue([]),
  generateSummary: vi.fn().mockResolvedValue({ id: 'ai1' }),
  translateText: vi.fn().mockResolvedValue({ id: 'ait1' }),
  correctText: vi.fn().mockResolvedValue({ id: 'aic1' }),
  suggestResponse: vi.fn().mockResolvedValue({ id: 'ais1' }),
  generateMeetingSummary: vi.fn().mockResolvedValue({ id: 'aims1' }),
  detectSpam: vi.fn().mockResolvedValue({ id: 'aisd1' }),
  getNotifications: vi.fn().mockResolvedValue([]),
  markNotificationRead: vi.fn().mockResolvedValue(undefined),
  getNotificationPreferences: vi.fn().mockResolvedValue([]),
  updateNotificationPreference: vi.fn().mockResolvedValue({ id: 'np1' }),
  sendNotificationBatch: vi.fn().mockResolvedValue({ id: 'nb1' }),
  getContacts: vi.fn().mockResolvedValue([]),
  getContact: vi.fn().mockResolvedValue(null),
  createContact: vi.fn().mockResolvedValue({ id: 'ct1' }),
  updateContact: vi.fn().mockResolvedValue({ id: 'ct1' }),
  deleteContact: vi.fn().mockResolvedValue(undefined),
  getContactGroups: vi.fn().mockResolvedValue([]),
  getPolls: vi.fn().mockResolvedValue([]),
  getPoll: vi.fn().mockResolvedValue(null),
  createPoll: vi.fn().mockResolvedValue({ id: 'po1' }),
  votePoll: vi.fn().mockResolvedValue({ id: 'pv1' }),
  closePoll: vi.fn().mockResolvedValue({ id: 'po1' }),
  getWebhooks: vi.fn().mockResolvedValue([]),
  createWebhook: vi.fn().mockResolvedValue({ id: 'wh1' }),
  updateWebhook: vi.fn().mockResolvedValue({ id: 'wh1' }),
  deleteWebhook: vi.fn().mockResolvedValue(undefined),
  getChannels: vi.fn().mockResolvedValue([]),
  getChannel: vi.fn().mockResolvedValue(null),
  createChannel: vi.fn().mockResolvedValue({ id: 'ch1' }),
  updateChannel: vi.fn().mockResolvedValue({ id: 'ch1' }),
  deleteChannel: vi.fn().mockResolvedValue(undefined),
  updatePresence: vi.fn().mockResolvedValue({ id: 'up1' }),
  getPresence: vi.fn().mockResolvedValue([]),
  getAutoResponses: vi.fn().mockResolvedValue([]),
  createAutoResponse: vi.fn().mockResolvedValue({ id: 'ar1' }),
  updateAutoResponse: vi.fn().mockResolvedValue({ id: 'ar1' }),
  deleteAutoResponse: vi.fn().mockResolvedValue(undefined),
  search: vi.fn().mockResolvedValue({ id: 'sq1', results: 0 }),
  exportConversation: vi.fn().mockResolvedValue({ id: 'ej1' }),
  exportDocuments: vi.fn().mockResolvedValue({ id: 'ej2' }),
  scheduleMessage: vi.fn().mockResolvedValue({ id: 'sm1' }),
  cancelScheduledMessage: vi.fn().mockResolvedValue(undefined),
  getScheduledMessages: vi.fn().mockResolvedValue([]),
} as Record<string, vi.Mock>;

describe('Mobile Screen Compatibility', () => {
  describe('Conversation Service - Mobile Support', () => {
    it('should create conversation service with mobile-compatible methods', () => {
      const service = createConversationService(mockRepository as never);
      expect(typeof service.getConversations).toBe('function');
      expect(typeof service.createConversation).toBe('function');
      expect(typeof service.deleteConversation).toBe('function');
    });

    it('should handle mobile conversation creation', async () => {
      const service = createConversationService(mockRepository as never);
      const result = await service.createConversation('school1', 'user1', {
        type: 'direct',
        participants: ['user1', 'user2'],
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('c1');
    });

    it('should handle mobile conversation listing', async () => {
      const service = createConversationService(mockRepository as never);
      const result = await service.getConversations('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Message Service - Mobile Support', () => {
    it('should create message service with mobile-compatible methods', () => {
      const service = createMessageService(mockRepository as never);
      expect(typeof service.getMessages).toBe('function');
      expect(typeof service.sendMessage).toBe('function');
    });

    it('should handle mobile message sending', async () => {
      const service = createMessageService(mockRepository as never);
      const result = await service.sendMessage('school1', 'c1', 'user1', {
        content: 'Hello from mobile',
        type: 'text',
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('m1');
    });

    it('should handle mobile message listing', async () => {
      const service = createMessageService(mockRepository as never);
      const result = await service.getMessages('c1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Call Service - Mobile Support', () => {
    it('should create call service with mobile-compatible methods', () => {
      const service = createCallService(mockRepository as never);
      expect(typeof service.getCalls).toBe('function');
      expect(typeof service.initiateCall).toBe('function');
      expect(typeof service.endCall).toBe('function');
    });

    it('should handle mobile call initiation', async () => {
      const service = createCallService(mockRepository as never);
      mockRepository.createCall.mockResolvedValue({ id: 'call1' });
      const result = await service.initiateCall('school1', 'user1', {
        type: 'audio',
        participantIds: [],
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('call1');
    });

    it('should handle mobile video toggle', async () => {
      const service = createCallService(mockRepository as never);
      mockRepository.getCall.mockResolvedValue({ id: 'call1', participants: [{ userId: 'user1' }] });
      const result = await service.toggleVideo('call1', 'user1', true);
      expect(result).toBeDefined();
    });
  });

  describe('Group Service - Mobile Support', () => {
    it('should create group service with mobile-compatible methods', () => {
      const service = createGroupService(mockRepository as never);
      expect(typeof service.getGroups).toBe('function');
      expect(typeof service.createGroup).toBe('function');
    });

    it('should handle mobile group creation', async () => {
      const service = createGroupService(mockRepository as never);
      const result = await service.createGroup('school1', 'user1', {
        name: 'Mobile Group',
        type: 'class',
        members: [],
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('g1');
    });
  });

  describe('Notification Service - Mobile Support', () => {
    it('should create notification service with mobile-compatible methods', () => {
      const service = createNotificationService(mockRepository as never);
      expect(typeof service.getNotifications).toBe('function');
      expect(typeof service.markNotificationRead).toBe('function');
    });

    it('should handle mobile notification listing', async () => {
      const service = createNotificationService(mockRepository as never);
      const result = await service.getNotifications('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle mobile notification preference update', async () => {
      const service = createNotificationService(mockRepository as never);
      const result = await service.updateNotificationPreference('school1', 'user1', { enabled: false });
      expect(result).toBeDefined();
    });
  });

  describe('Email Service - Mobile Support', () => {
    it('should create email service with mobile-compatible methods', () => {
      const service = createEmailService(mockRepository as never);
      expect(typeof service.getEmails).toBe('function');
      expect(typeof service.sendEmail).toBe('function');
    });

    it('should handle mobile email sending', async () => {
      const service = createEmailService(mockRepository as never);
      const result = await service.sendEmail('school1', 'user1', {
        to: ['recipient@school.com'],
        subject: 'Mobile Email',
        body: 'Sent from mobile',
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('e1');
    });
  });

  describe('SMS Service - Mobile Support', () => {
    it('should create SMS service with mobile-compatible methods', () => {
      const service = createSmsService(mockRepository as never);
      expect(typeof service.getSmsMessages).toBe('function');
      expect(typeof service.sendSms).toBe('function');
    });

    it('should handle mobile SMS sending', async () => {
      const service = createSmsService(mockRepository as never);
      const result = await service.sendSms('school1', 'user1', {
        to: '+225111111',
        message: 'SMS from mobile',
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('s1');
    });
  });

  describe('Push Service - Mobile Support', () => {
    it('should create push service with mobile-compatible methods', () => {
      const service = createPushService(mockRepository as never);
      expect(typeof service.getPushNotifications).toBe('function');
      expect(typeof service.subscribeToPush).toBe('function');
    });

    it('should handle mobile push subscription', async () => {
      const service = createPushService(mockRepository as never);
      const result = await service.subscribeToPush('user1', 'school1', {
        platform: 'android',
        endpoint: 'https://fcm.googleapis.com/test',
        keys: { p256dh: 'key', auth: 'auth' },
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('ps1');
    });
  });

  describe('Announcement Service - Mobile Support', () => {
    it('should create announcement service with mobile-compatible methods', () => {
      const service = createAnnouncementService(mockRepository as never);
      expect(typeof service.getAnnouncements).toBe('function');
      expect(typeof service.createAnnouncement).toBe('function');
    });

    it('should handle mobile announcement listing', async () => {
      const service = createAnnouncementService(mockRepository as never);
      const result = await service.getAnnouncements('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Calendar Service - Mobile Support', () => {
    it('should create calendar service with mobile-compatible methods', () => {
      const service = createCalendarService(mockRepository as never);
      expect(typeof service.getCalendarEvents).toBe('function');
      expect(typeof service.createCalendarEvent).toBe('function');
    });

    it('should handle mobile calendar event listing', async () => {
      const service = createCalendarService(mockRepository as never);
      const result = await service.getCalendarEvents('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Task Service - Mobile Support', () => {
    it('should create task service with mobile-compatible methods', () => {
      const service = createTaskService(mockRepository as never);
      expect(typeof service.getTasks).toBe('function');
      expect(typeof service.createTask).toBe('function');
    });

    it('should handle mobile task creation', async () => {
      const service = createTaskService(mockRepository as never);
      const result = await service.createTask('school1', 'user1', {
        title: 'Mobile Task',
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('tk1');
    });
  });

  describe('Document Service - Mobile Support', () => {
    it('should create document service with mobile-compatible methods', () => {
      const service = createDocumentService(mockRepository as never);
      expect(typeof service.getDocuments).toBe('function');
      expect(typeof service.createDocument).toBe('function');
    });

    it('should handle mobile document listing', async () => {
      const service = createDocumentService(mockRepository as never);
      const result = await service.getDocuments('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Contact Service - Mobile Support', () => {
    it('should create contact service with mobile-compatible methods', () => {
      const service = createContactService(mockRepository as never);
      expect(typeof service.getContacts).toBe('function');
      expect(typeof service.createContact).toBe('function');
    });

    it('should handle mobile contact listing', async () => {
      const service = createContactService(mockRepository as never);
      const result = await service.getContacts('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Poll Service - Mobile Support', () => {
    it('should create poll service with mobile-compatible methods', () => {
      const service = createPollService(mockRepository as never);
      expect(typeof service.getPolls).toBe('function');
      expect(typeof service.createPoll).toBe('function');
    });

    it('should handle mobile poll creation', async () => {
      const service = createPollService(mockRepository as never);
      const result = await service.createPoll('school1', 'user1', {
        conversationId: 'c1',
        question: 'Test poll',
        options: [{ text: 'Option 1' }, { text: 'Option 2' }],
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('po1');
    });
  });

  describe('Channel Service - Mobile Support', () => {
    it('should create channel service with mobile-compatible methods', () => {
      const service = createChannelService(mockRepository as never);
      expect(typeof service.getChannels).toBe('function');
      expect(typeof service.createChannel).toBe('function');
    });

    it('should handle mobile channel listing', async () => {
      const service = createChannelService(mockRepository as never);
      const result = await service.getChannels('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Presence Service - Mobile Support', () => {
    it('should create presence service with mobile-compatible methods', () => {
      const service = createPresenceService(mockRepository as never);
      expect(typeof service.updatePresence).toBe('function');
      expect(typeof service.getPresence).toBe('function');
    });

    it('should handle mobile presence update', async () => {
      const service = createPresenceService(mockRepository as never);
      const result = await service.updatePresence('user1', 'school1', 'online');
      expect(result).toBeDefined();
    });
  });

  describe('Auto-Response Service - Mobile Support', () => {
    it('should create auto-response service with mobile-compatible methods', () => {
      const service = createAutoResponseService(mockRepository as never);
      expect(typeof service.getAutoResponses).toBe('function');
      expect(typeof service.createAutoResponse).toBe('function');
    });

    it('should handle mobile auto-response listing', async () => {
      const service = createAutoResponseService(mockRepository as never);
      const result = await service.getAutoResponses('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Search Service - Mobile Support', () => {
    it('should create search service with mobile-compatible methods', () => {
      const service = createSearchService(mockRepository as never);
      expect(typeof service.search).toBe('function');
    });

    it('should handle mobile search', async () => {
      const service = createSearchService(mockRepository as never);
      const result = await service.search('school1', 'user1', 'query', 'all');
      expect(result).toBeDefined();
    });
  });

  describe('Export Service - Mobile Support', () => {
    it('should create export service with mobile-compatible methods', () => {
      const service = createExportService(mockRepository as never);
      expect(typeof service.exportConversation).toBe('function');
      expect(typeof service.exportDocuments).toBe('function');
    });

    it('should handle mobile conversation export', async () => {
      const service = createExportService(mockRepository as never);
      const result = await service.exportConversation('c1', 'pdf');
      expect(result).toBeDefined();
      expect(result.id).toBe('ej1');
    });
  });

  describe('Scheduled Message Service - Mobile Support', () => {
    it('should create scheduled message service with mobile-compatible methods', () => {
      const service = createScheduledMessageService(mockRepository as never);
      expect(typeof service.scheduleMessage).toBe('function');
      expect(typeof service.getScheduledMessages).toBe('function');
    });

    it('should handle mobile message scheduling', async () => {
      const service = createScheduledMessageService(mockRepository as never);
      const result = await service.scheduleMessage('school1', 'user1', {
        conversationId: 'c1',
        content: 'Scheduled from mobile',
        scheduledFor: '2026-12-01T12:00:00Z',
      });
      expect(result).toBeDefined();
      expect(result.id).toBe('sm1');
    });
  });

  describe('Webhook Service - Mobile Support', () => {
    it('should create webhook service with mobile-compatible methods', () => {
      const service = createWebhookService(mockRepository as never);
      expect(typeof service.getWebhooks).toBe('function');
      expect(typeof service.createWebhook).toBe('function');
    });

    it('should handle mobile webhook listing', async () => {
      const service = createWebhookService(mockRepository as never);
      const result = await service.getWebhooks('school1', 'user1');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('AI Service - Mobile Support', () => {
    it('should create AI service with mobile-compatible methods', () => {
      const service = createAiService(mockRepository as never);
      expect(typeof service.generateSummary).toBe('function');
      expect(typeof service.translateText).toBe('function');
      expect(typeof service.detectSpam).toBe('function');
    });

    it('should handle mobile AI summary generation', async () => {
      const service = createAiService(mockRepository as never);
      const result = await service.generateSummary('school1', 'user1', { content: 'Some content to summarize' });
      expect(result).toBeDefined();
      expect(result.id).toBe('ai1');
    });
  });

  describe('Collaboration Service - Mobile Support', () => {
    it('should create collaboration service with mobile-compatible methods', () => {
      const service = createCollaborationService(mockRepository as never);
      expect(typeof service.startCollaborationSession).toBe('function');
      expect(typeof service.endCollaborationSession).toBe('function');
    });

    it('should handle mobile collaboration session start', async () => {
      const service = createCollaborationService(mockRepository as never);
      const result = await service.startCollaborationSession('school1', 'user1', { documentId: 'd1' });
      expect(result).toBeDefined();
      expect(result.id).toBe('cs1');
    });
  });

  describe('Thread Service - Mobile Support', () => {
    it('should create thread service with mobile-compatible methods', () => {
      const service = createThreadService(mockRepository as never);
      expect(typeof service.getThread).toBe('function');
      expect(typeof service.getThreadMessages).toBe('function');
    });

    it('should handle mobile thread retrieval', async () => {
      const service = createThreadService(mockRepository as never);
      mockRepository.getThread.mockResolvedValue({ id: 't1' });
      const result = await service.getThread('t1', 'user1');
      expect(result).toBeDefined();
    });
  });
});
