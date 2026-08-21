import { describe, it, expect } from 'vitest';
import {
  createConversationSchema,
  updateConversationSchema,
  sendMessageSchema,
  editMessageSchema,
  messageFiltersSchema,
  messageSearchSchema,
  createGroupSchema,
  updateGroupSchema,
  createAnnouncementSchema,
  updateAnnouncementSchema,
  createBroadcastSchema,
  updateBroadcastSchema,
  addReactionSchema,
  notificationSettingsSchema,
  notificationPreferenceSchema,
  attachmentUploadSchema,
  reportMessageSchema,
  moderationActionSchema,
  archiveConversationSchema,
  deleteMessageSchema,
  forwardMessageSchema,
  pinMessageSchema,
  muteConversationSchema,
  bulkMarkReadSchema,
  exportMessagesSchema,
  importMessagesSchema,
  conversationSearchSchema,
  memberRoleSchema,
  notificationBatchSchema,
  broadcastScheduleSchema,
  searchFilterSchema,
  messageStatsSchema,
  attachmentDownloadSchema,
  announcementPublishSchema,
  conversationArchiveSchema,
  messageRestoreSchema,
  conversationRestoreSchema,
  groupMemberSchema,
  settingsUpdateSchema,
} from '@/features/messages/validators';

describe('Message Validators', () => {
  describe('createConversationSchema', () => {
    it('should validate correct conversation data', () => {
      const result = createConversationSchema.safeParse({
        type: 'GROUP',
        title: 'New Group',
        memberIds: ['123e4567-e89b-12d3-a456-426614174000'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createConversationSchema.safeParse({
        type: 'GROUP',
        title: '',
        memberIds: ['123e4567-e89b-12d3-a456-426614174000'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty memberIds', () => {
      const result = createConversationSchema.safeParse({
        type: 'GROUP',
        title: 'New Group',
        memberIds: [],
      });
      expect(result.success).toBe(false);
    });

    it('should accept all conversation types', () => {
      for (const type of ['PRIVATE', 'GROUP', 'CLASS', 'LEVEL', 'STAFF', 'TEACHERS', 'ADMIN']) {
        const result = createConversationSchema.safeParse({
          type,
          title: 'Test',
          memberIds: ['123e4567-e89b-12d3-a456-426614174000'],
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept optional description', () => {
      const result = createConversationSchema.safeParse({
        type: 'GROUP',
        title: 'Test',
        description: 'Description here',
        memberIds: ['123e4567-e89b-12d3-a456-426614174000'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('updateConversationSchema', () => {
    it('should validate partial update', () => {
      const result = updateConversationSchema.safeParse({ title: 'Updated Title' });
      expect(result.success).toBe(true);
    });

    it('should validate with all fields', () => {
      const result = updateConversationSchema.safeParse({
        title: 'Updated',
        description: 'New description',
        avatarUrl: 'https://example.com/avatar.png',
        isArchived: true,
        isPinned: false,
        isMuted: true,
      });
      expect(result.success).toBe(true);
    });

    it('should accept null avatarUrl', () => {
      const result = updateConversationSchema.safeParse({ avatarUrl: null });
      expect(result.success).toBe(true);
    });

    it('should reject invalid avatarUrl', () => {
      const result = updateConversationSchema.safeParse({ avatarUrl: 'not-a-url' });
      expect(result.success).toBe(false);
    });
  });

  describe('sendMessageSchema', () => {
    it('should validate correct message', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Hello!',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty content', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        content: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid conversationId', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: 'invalid',
        content: 'Hello',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all message types', () => {
      for (const type of ['TEXT', 'IMAGE', 'FILE', 'AUDIO', 'VIDEO', 'SYSTEM']) {
        const result = sendMessageSchema.safeParse({
          conversationId: '123e4567-e89b-12d3-a456-426614174000',
          content: 'Test',
          type,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept optional replyToId', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Reply',
        replyToId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });

    it('should default type to TEXT', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Hello',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.type).toBe('TEXT');
      }
    });
  });

  describe('editMessageSchema', () => {
    it('should validate correct edit', () => {
      const result = editMessageSchema.safeParse({ content: 'Updated message' });
      expect(result.success).toBe(true);
    });

    it('should reject empty content', () => {
      const result = editMessageSchema.safeParse({ content: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('messageFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = messageFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(20);
        expect(result.data.offset).toBe(0);
        expect(result.data.sortOrder).toBe('desc');
      }
    });

    it('should validate custom filters', () => {
      const result = messageFiltersSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        senderId: '123e4567-e89b-12d3-a456-426614174001',
        type: 'TEXT',
        status: 'SENT',
        search: 'test',
        limit: 50,
        offset: 10,
        sortBy: 'created_at',
        sortOrder: 'asc',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('messageSearchSchema', () => {
    it('should validate correct search', () => {
      const result = messageSearchSchema.safeParse({ query: 'test query' });
      expect(result.success).toBe(true);
    });

    it('should reject short query', () => {
      const result = messageSearchSchema.safeParse({ query: 'a' });
      expect(result.success).toBe(false);
    });

    it('should reject empty query', () => {
      const result = messageSearchSchema.safeParse({ query: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('createGroupSchema', () => {
    it('should validate correct group', () => {
      const result = createGroupSchema.safeParse({
        name: 'Study Group',
        type: 'CLASS',
        memberIds: ['123e4567-e89b-12d3-a456-426614174000'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = createGroupSchema.safeParse({
        name: '',
        type: 'CLASS',
        memberIds: ['123e4567-e89b-12d3-a456-426614174000'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty memberIds', () => {
      const result = createGroupSchema.safeParse({
        name: 'Test',
        type: 'CLASS',
        memberIds: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('updateGroupSchema', () => {
    it('should validate partial update', () => {
      const result = updateGroupSchema.safeParse({ name: 'Updated Name' });
      expect(result.success).toBe(true);
    });

    it('should accept null avatarUrl', () => {
      const result = updateGroupSchema.safeParse({ avatarUrl: null });
      expect(result.success).toBe(true);
    });
  });

  describe('createAnnouncementSchema', () => {
    it('should validate correct announcement', () => {
      const result = createAnnouncementSchema.safeParse({
        title: 'School Event',
        content: 'Annual day celebration',
        type: 'ANNOUNCEMENT',
        priority: 'HIGH',
        targetAudience: 'ALL_PARENTS',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createAnnouncementSchema.safeParse({
        title: '',
        content: 'Content',
        type: 'ANNOUNCEMENT',
        priority: 'HIGH',
        targetAudience: 'ALL_PARENTS',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty content', () => {
      const result = createAnnouncementSchema.safeParse({
        title: 'Title',
        content: '',
        type: 'ANNOUNCEMENT',
        priority: 'HIGH',
        targetAudience: 'ALL_PARENTS',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all priorities', () => {
      for (const priority of ['LOW', 'MEDIUM', 'HIGH', 'URGENT']) {
        const result = createAnnouncementSchema.safeParse({
          title: 'Title',
          content: 'Content',
          type: 'ANNOUNCEMENT',
          priority,
          targetAudience: 'ALL_PARENTS',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('updateAnnouncementSchema', () => {
    it('should validate partial update', () => {
      const result = updateAnnouncementSchema.safeParse({ title: 'Updated' });
      expect(result.success).toBe(true);
    });

    it('should accept isPublished field', () => {
      const result = updateAnnouncementSchema.safeParse({ isPublished: true });
      expect(result.success).toBe(true);
    });
  });

  describe('createBroadcastSchema', () => {
    it('should validate correct broadcast', () => {
      const result = createBroadcastSchema.safeParse({
        title: 'Holiday Notice',
        content: 'School closed',
        scope: 'WHOLE_SCHOOL',
        channels: ['EMAIL', 'SMS'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty channels', () => {
      const result = createBroadcastSchema.safeParse({
        title: 'Title',
        content: 'Content',
        scope: 'WHOLE_SCHOOL',
        channels: [],
      });
      expect(result.success).toBe(false);
    });

    it('should accept all scopes', () => {
      for (const scope of ['SINGLE', 'CLASS', 'LEVEL', 'ALL_PARENTS', 'WHOLE_SCHOOL']) {
        const result = createBroadcastSchema.safeParse({
          title: 'Title',
          content: 'Content',
          scope,
          channels: ['EMAIL'],
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('updateBroadcastSchema', () => {
    it('should validate partial update', () => {
      const result = updateBroadcastSchema.safeParse({ title: 'Updated' });
      expect(result.success).toBe(true);
    });

    it('should accept status field', () => {
      const result = updateBroadcastSchema.safeParse({ status: 'DRAFT' });
      expect(result.success).toBe(true);
    });
  });

  describe('addReactionSchema', () => {
    it('should validate correct reaction', () => {
      const result = addReactionSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
        type: 'LIKE',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all reaction types', () => {
      for (const type of ['LIKE', 'LOVE', 'LAUGH', 'WOW', 'SAD', 'ANGRY']) {
        const result = addReactionSchema.safeParse({
          messageId: '123e4567-e89b-12d3-a456-426614174000',
          type,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid messageId', () => {
      const result = addReactionSchema.safeParse({
        messageId: 'invalid',
        type: 'LIKE',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('notificationSettingsSchema', () => {
    it('should validate with defaults', () => {
      const result = notificationSettingsSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate custom settings', () => {
      const result = notificationSettingsSchema.safeParse({
        emailEnabled: true,
        pushEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid quiet hours format', () => {
      const result = notificationSettingsSchema.safeParse({
        quietHoursStart: '10pm',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('notificationPreferenceSchema', () => {
    it('should validate correct preference', () => {
      const result = notificationPreferenceSchema.safeParse({
        channel: 'EMAIL',
        type: 'MESSAGE',
        isEnabled: true,
      });
      expect(result.success).toBe(true);
    });

    it('should accept all channels', () => {
      for (const channel of ['IN_APP', 'PUSH', 'EMAIL', 'SMS', 'WHATSAPP']) {
        const result = notificationPreferenceSchema.safeParse({
          channel,
          type: 'MESSAGE',
          isEnabled: true,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('reportMessageSchema', () => {
    it('should validate correct report', () => {
      const result = reportMessageSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
        reason: 'SPAM',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all reasons', () => {
      for (const reason of ['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'MISINFORMATION', 'OTHER']) {
        const result = reportMessageSchema.safeParse({
          messageId: '123e4567-e89b-12d3-a456-426614174000',
          reason,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('moderationActionSchema', () => {
    it('should validate correct action', () => {
      const result = moderationActionSchema.safeParse({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        action: 'WARNING',
        reason: 'Inappropriate content',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all actions', () => {
      for (const action of ['WARNING', 'MUTED', 'BLOCKED', 'REMOVED', 'BANNED']) {
        const result = moderationActionSchema.safeParse({
          userId: '123e4567-e89b-12d3-a456-426614174000',
          action,
          reason: 'Test reason',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept optional duration', () => {
      const result = moderationActionSchema.safeParse({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        action: 'MUTED',
        reason: 'Spam',
        duration: 24,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('archiveConversationSchema', () => {
    it('should validate correct data', () => {
      const result = archiveConversationSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('deleteMessageSchema', () => {
    it('should validate correct data', () => {
      const result = deleteMessageSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });

    it('should default permanent to false', () => {
      const result = deleteMessageSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.permanent).toBe(false);
      }
    });
  });

  describe('forwardMessageSchema', () => {
    it('should validate correct data', () => {
      const result = forwardMessageSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
        targetConversationIds: ['123e4567-e89b-12d3-a456-426614174001'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty targetConversationIds', () => {
      const result = forwardMessageSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
        targetConversationIds: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('pinMessageSchema', () => {
    it('should validate correct data', () => {
      const result = pinMessageSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('muteConversationSchema', () => {
    it('should validate correct data', () => {
      const result = muteConversationSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        muted: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('bulkMarkReadSchema', () => {
    it('should validate correct data', () => {
      const result = bulkMarkReadSchema.safeParse({
        messageIds: ['123e4567-e89b-12d3-a456-426614174000'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty messageIds', () => {
      const result = bulkMarkReadSchema.safeParse({ messageIds: [] });
      expect(result.success).toBe(false);
    });
  });

  describe('exportMessagesSchema', () => {
    it('should validate correct data', () => {
      const result = exportMessagesSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });

    it('should default format to PDF', () => {
      const result = exportMessagesSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.format).toBe('PDF');
      }
    });

    it('should accept all formats', () => {
      for (const format of ['PDF', 'CSV', 'JSON']) {
        const result = exportMessagesSchema.safeParse({
          conversationId: '123e4567-e89b-12d3-a456-426614174000',
          format,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('conversationSearchSchema', () => {
    it('should validate correct search', () => {
      const result = conversationSearchSchema.safeParse({ query: 'test query' });
      expect(result.success).toBe(true);
    });

    it('should reject short query', () => {
      const result = conversationSearchSchema.safeParse({ query: 'a' });
      expect(result.success).toBe(false);
    });
  });

  describe('memberRoleSchema', () => {
    it('should validate correct data', () => {
      const result = memberRoleSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        role: 'ADMIN',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all roles', () => {
      for (const role of ['OWNER', 'ADMIN', 'MODERATOR', 'MEMBER']) {
        const result = memberRoleSchema.safeParse({
          conversationId: '123e4567-e89b-12d3-a456-426614174000',
          userId: '123e4567-e89b-12d3-a456-426614174001',
          role,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('notificationBatchSchema', () => {
    it('should validate correct data', () => {
      const result = notificationBatchSchema.safeParse({
        userIds: ['123e4567-e89b-12d3-a456-426614174000'],
        type: 'MESSAGE',
        title: 'Batch notification',
        body: 'Notification body',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty userIds', () => {
      const result = notificationBatchSchema.safeParse({
        userIds: [],
        type: 'MESSAGE',
        title: 'Title',
        body: 'Body',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('broadcastScheduleSchema', () => {
    it('should validate correct data', () => {
      const result = broadcastScheduleSchema.safeParse({
        broadcastId: '123e4567-e89b-12d3-a456-426614174000',
        scheduledAt: '2025-12-25T09:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('searchFilterSchema', () => {
    it('should validate correct search', () => {
      const result = searchFilterSchema.safeParse({ query: 'test query' });
      expect(result.success).toBe(true);
    });

    it('should accept types filter', () => {
      const result = searchFilterSchema.safeParse({
        query: 'search',
        types: ['CONVERSATION', 'MESSAGE'],
      });
      expect(result.success).toBe(true);
    });

    it('should default limit to 20', () => {
      const result = searchFilterSchema.safeParse({ query: 'test' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(20);
      }
    });
  });

  describe('messageStatsSchema', () => {
    it('should validate empty request', () => {
      const result = messageStatsSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate with date range', () => {
      const result = messageStatsSchema.safeParse({
        dateFrom: '2025-01-01',
        dateTo: '2025-12-31',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('attachmentDownloadSchema', () => {
    it('should validate correct data', () => {
      const result = attachmentDownloadSchema.safeParse({
        attachmentId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('announcementPublishSchema', () => {
    it('should validate correct data', () => {
      const result = announcementPublishSchema.safeParse({
        announcementId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('conversationArchiveSchema', () => {
    it('should validate correct data', () => {
      const result = conversationArchiveSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
        archive: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('messageRestoreSchema', () => {
    it('should validate correct data', () => {
      const result = messageRestoreSchema.safeParse({
        messageId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('conversationRestoreSchema', () => {
    it('should validate correct data', () => {
      const result = conversationRestoreSchema.safeParse({
        conversationId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('groupMemberSchema', () => {
    it('should validate correct data', () => {
      const result = groupMemberSchema.safeParse({
        groupId: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });

    it('should default role to MEMBER', () => {
      const result = groupMemberSchema.safeParse({
        groupId: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.role).toBe('MEMBER');
      }
    });
  });

  describe('settingsUpdateSchema', () => {
    it('should validate with defaults', () => {
      const result = settingsUpdateSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate custom settings', () => {
      const result = settingsUpdateSchema.safeParse({
        emailEnabled: true,
        pushEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00',
      });
      expect(result.success).toBe(true);
    });
  });
});
