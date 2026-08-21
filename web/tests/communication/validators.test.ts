import { describe, it, expect } from 'vitest';
import {
  createConversationSchema,
  updateConversationSchema,
  sendMessageSchema,
  editMessageSchema,
  deleteMessageSchema,
  pinMessageSchema,
  reactToMessageSchema,
  replyToMessageSchema,
  forwardMessageSchema,
  searchMessageSchema,
  markAsReadSchema,
  createGroupSchema,
  updateGroupSchema,
  addGroupMemberSchema,
  removeGroupMemberSchema,
  initiateCallSchema,
  joinCallSchema,
  endCallSchema,
  sendEmailSchema,
  createEmailTemplateSchema,
  sendSmsSchema,
  createSmsTemplateSchema,
  sendBulkSmsSchema,
  createAnnouncementSchema,
  updateAnnouncementSchema,
  createCalendarEventSchema,
  updateCalendarEventSchema,
  createTaskSchema,
  updateTaskSchema,
  createDocumentSchema,
  updateDocumentSchema,
  shareDocumentSchema,
  createPollSchema,
  votePollSchema,
  createWebhookSchema,
  createChannelSchema,
  updateChannelSchema,
  createAutoResponseSchema,
  updateAutoResponseSchema,
  scheduleMessageSchema,
  cancelScheduledMessageSchema,
  searchConversationSchema,
  muteConversationSchema,
  pinConversationSchema,
  addParticipantSchema,
  removeParticipantSchema,
} from '../../src/features/communication/validators/schemas';

describe('CommunicationValidators', () => {
  describe('createConversationSchema', () => {
    it('should validate valid conversation data', () => {
      const result = createConversationSchema.safeParse({
        type: 'direct',
        participants: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject without participants', () => {
      const result = createConversationSchema.safeParse({ type: 'direct' });
      expect(result.success).toBe(false);
    });

    it('should default type to direct', () => {
      const result = createConversationSchema.safeParse({
        participants: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.type).toBe('direct');
    });

    it('should reject invalid type', () => {
      const result = createConversationSchema.safeParse({
        type: 'invalid',
        participants: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject title over 200 chars', () => {
      const result = createConversationSchema.safeParse({
        participants: ['550e8400-e29b-41d4-a716-446655440000'],
        title: 'x'.repeat(201),
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid title', () => {
      const result = createConversationSchema.safeParse({
        participants: ['550e8400-e29b-41d4-a716-446655440000'],
        title: 'Project Chat',
      });
      expect(result.success).toBe(true);
    });

    it('should validate all conversation types', () => {
      for (const type of ['direct', 'group', 'channel', 'support']) {
        const result = createConversationSchema.safeParse({
          type,
          participants: ['550e8400-e29b-41d4-a716-446655440000'],
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('sendMessageSchema', () => {
    it('should validate valid message', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'Hello world',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty content', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject content over 50000 chars', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'x'.repeat(50001),
      });
      expect(result.success).toBe(false);
    });

    it('should accept content at exactly 50000 chars', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'x'.repeat(50000),
      });
      expect(result.success).toBe(true);
    });

    it('should default type to text', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'Hi',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.type).toBe('text');
    });

    it('should validate all message types', () => {
      for (const type of ['text', 'image', 'file', 'audio', 'video', 'system', 'location', 'contact', 'poll', 'announcement']) {
        const result = sendMessageSchema.safeParse({
          conversationId: '550e8400-e29b-41d4-a716-446655440000',
          content: 'Hi',
          type,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid UUID for conversationId', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: 'not-a-uuid',
        content: 'Hi',
      });
      expect(result.success).toBe(false);
    });

    it('should accept attachments', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'See attached',
        attachments: [{
          fileName: 'doc.pdf',
          fileUrl: 'https://example.com/doc.pdf',
          fileSize: 1024,
          mimeType: 'application/pdf',
        }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject attachment with invalid URL', () => {
      const result = sendMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'See attached',
        attachments: [{
          fileName: 'doc.pdf',
          fileUrl: 'not-a-url',
          fileSize: 1024,
          mimeType: 'application/pdf',
        }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('editMessageSchema', () => {
    it('should validate valid edit data', () => {
      const result = editMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
        content: 'Updated content',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty content', () => {
      const result = editMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
        content: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('deleteMessageSchema', () => {
    it('should validate valid delete data', () => {
      const result = deleteMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
    });

    it('should default forEveryone to true', () => {
      const result = deleteMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.forEveryone).toBe(true);
    });
  });

  describe('createGroupSchema', () => {
    it('should validate valid group data', () => {
      const result = createGroupSchema.safeParse({
        name: 'Math Club',
        members: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = createGroupSchema.safeParse({
        name: '',
        members: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject name over 200 chars', () => {
      const result = createGroupSchema.safeParse({
        name: 'x'.repeat(201),
        members: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject without members', () => {
      const result = createGroupSchema.safeParse({ name: 'Group' });
      expect(result.success).toBe(false);
    });
  });

  describe('initiateCallSchema', () => {
    it('should validate valid call data', () => {
      const result = initiateCallSchema.safeParse({
        participantIds: ['550e8400-e29b-41d4-a716-446655440000'],
        type: 'video',
      });
      expect(result.success).toBe(true);
    });

    it('should default type to audio', () => {
      const result = initiateCallSchema.safeParse({
        participantIds: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.type).toBe('audio');
    });

    it('should reject without participants', () => {
      const result = initiateCallSchema.safeParse({ type: 'video' });
      expect(result.success).toBe(false);
    });
  });

  describe('sendEmailSchema', () => {
    it('should validate valid email data', () => {
      const result = sendEmailSchema.safeParse({
        to: ['user@example.com'],
        subject: 'Hello',
        body: 'Content',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = sendEmailSchema.safeParse({
        to: ['not-an-email'],
        subject: 'Hello',
        body: 'Content',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty subject', () => {
      const result = sendEmailSchema.safeParse({
        to: ['user@example.com'],
        subject: '',
        body: 'Content',
      });
      expect(result.success).toBe(false);
    });

    it('should reject without body', () => {
      const result = sendEmailSchema.safeParse({
        to: ['user@example.com'],
        subject: 'Hello',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('sendSmsSchema', () => {
    it('should validate valid SMS', () => {
      const result = sendSmsSchema.safeParse({
        to: '+1234567890',
        message: 'Hello',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const result = sendSmsSchema.safeParse({
        to: '+1234567890',
        message: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message over 1600 chars', () => {
      const result = sendSmsSchema.safeParse({
        to: '+1234567890',
        message: 'x'.repeat(1601),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('createAnnouncementSchema', () => {
    it('should validate valid announcement', () => {
      const result = createAnnouncementSchema.safeParse({
        title: 'School Event',
        content: 'Join us for the annual day.',
        type: 'info',
        targetAudience: ['all'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createAnnouncementSchema.safeParse({
        title: '',
        content: 'Body',
        targetAudience: ['all'],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('createCalendarEventSchema', () => {
    it('should validate valid event', () => {
      const result = createCalendarEventSchema.safeParse({
        title: 'Staff Meeting',
        startTime: '2024-06-01T10:00:00Z',
        endTime: '2024-06-01T11:00:00Z',
        type: 'meeting',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createCalendarEventSchema.safeParse({
        title: '',
        startTime: '2024-06-01T10:00:00Z',
        endTime: '2024-06-01T11:00:00Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('createTaskSchema', () => {
    it('should validate valid task', () => {
      const result = createTaskSchema.safeParse({
        title: 'Grade papers',
        assignees: ['550e8400-e29b-41d4-a716-446655440000'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createTaskSchema.safeParse({ title: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('createDocumentSchema', () => {
    it('should validate valid document', () => {
      const result = createDocumentSchema.safeParse({
        title: 'Curriculum',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty title', () => {
      const result = createDocumentSchema.safeParse({ title: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('createPollSchema', () => {
    it('should validate valid poll', () => {
      const result = createPollSchema.safeParse({
        question: 'Best day for meeting?',
        options: [{ text: 'Monday' }, { text: 'Wednesday' }, { text: 'Friday' }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject with less than 2 options', () => {
      const result = createPollSchema.safeParse({
        question: 'Best day?',
        options: [{ text: 'Monday' }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('createWebhookSchema', () => {
    it('should validate valid webhook', () => {
      const result = createWebhookSchema.safeParse({
        url: 'https://example.com/webhook',
        events: ['message.sent'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid URL', () => {
      const result = createWebhookSchema.safeParse({
        url: 'not-a-url',
        events: ['message.sent'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject without events', () => {
      const result = createWebhookSchema.safeParse({
        url: 'https://example.com/webhook',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('createChannelSchema', () => {
    it('should validate valid channel', () => {
      const result = createChannelSchema.safeParse({ name: 'General' });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = createChannelSchema.safeParse({ name: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('createAutoResponseSchema', () => {
    it('should validate valid auto response', () => {
      const result = createAutoResponseSchema.safeParse({
        name: 'Away Message',
        trigger: { type: 'keyword', value: 'away' },
        response: { content: 'I am currently away' },
        channels: ['message'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject without trigger', () => {
      const result = createAutoResponseSchema.safeParse({
        name: 'Away Message',
        response: { content: 'Hi' },
        channels: ['message'],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('scheduleMessageSchema', () => {
    it('should validate valid scheduled message', () => {
      const result = scheduleMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: 'Reminder',
        scheduledAt: '2024-12-01T09:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty content', () => {
      const result = scheduleMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        content: '',
        scheduledAt: '2024-12-01T09:00:00Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('searchConversationSchema', () => {
    it('should validate valid search', () => {
      const result = searchConversationSchema.safeParse({ query: 'test' });
      expect(result.success).toBe(true);
    });

    it('should reject empty query', () => {
      const result = searchConversationSchema.safeParse({ query: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('muteConversationSchema', () => {
    it('should validate valid mute data', () => {
      const result = muteConversationSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('pinConversationSchema', () => {
    it('should validate valid pin data', () => {
      const result = pinConversationSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        pinned: true,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('addParticipantSchema', () => {
    it('should validate valid participant data', () => {
      const result = addParticipantSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        userIds: ['550e8400-e29b-41d4-a716-446655440001'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('removeParticipantSchema', () => {
    it('should validate valid remove data', () => {
      const result = removeParticipantSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        userId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('pinMessageSchema', () => {
    it('should validate valid pin data', () => {
      const result = pinMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('reactToMessageSchema', () => {
    it('should validate valid reaction', () => {
      const result = reactToMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
        emoji: '👍',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('replyToMessageSchema', () => {
    it('should validate valid reply', () => {
      const result = replyToMessageSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageId: '550e8400-e29b-41d4-a716-446655440001',
        content: 'Reply content',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('forwardMessageSchema', () => {
    it('should validate valid forward', () => {
      const result = forwardMessageSchema.safeParse({
        messageId: '550e8400-e29b-41d4-a716-446655440000',
        targetConversationIds: ['550e8400-e29b-41d4-a716-446655440001'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('markAsReadSchema', () => {
    it('should validate valid mark as read', () => {
      const result = markAsReadSchema.safeParse({
        conversationId: '550e8400-e29b-41d4-a716-446655440000',
        messageIds: ['550e8400-e29b-41d4-a716-446655440001'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('createEmailTemplateSchema', () => {
    it('should validate valid template', () => {
      const result = createEmailTemplateSchema.safeParse({
        name: 'Welcome',
        subject: 'Welcome to school',
        body: 'Hello {{name}}',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('sendBulkSmsSchema', () => {
    it('should validate valid bulk SMS', () => {
      const result = sendBulkSmsSchema.safeParse({
        recipients: [{ phone: '+1234567890' }],
        templateId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('updateConversationSchema', () => {
    it('should validate valid update', () => {
      const result = updateConversationSchema.safeParse({ title: 'New Title' });
      expect(result.success).toBe(true);
    });
  });

  describe('updateGroupSchema', () => {
    it('should validate valid update', () => {
      const result = updateGroupSchema.safeParse({ name: 'New Name' });
      expect(result.success).toBe(true);
    });
  });

  describe('updateChannelSchema', () => {
    it('should validate valid update', () => {
      const result = updateChannelSchema.safeParse({ channelId: '550e8400-e29b-41d4-a716-446655440000', name: 'New Name' });
      expect(result.success).toBe(true);
    });
  });

  describe('updateAutoResponseSchema', () => {
    it('should validate valid update', () => {
      const result = updateAutoResponseSchema.safeParse({ autoResponseId: '550e8400-e29b-41d4-a716-446655440000', name: 'Updated' });
      expect(result.success).toBe(true);
    });
  });

  describe('joinCallSchema', () => {
    it('should validate valid join', () => {
      const result = joinCallSchema.safeParse({
        callId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('endCallSchema', () => {
    it('should validate valid end', () => {
      const result = endCallSchema.safeParse({
        callId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('votePollSchema', () => {
    it('should validate valid vote', () => {
      const result = votePollSchema.safeParse({
        pollId: '550e8400-e29b-41d4-a716-446655440000',
        optionIds: ['550e8400-e29b-41d4-a716-446655440001'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('cancelScheduledMessageSchema', () => {
    it('should validate valid cancel', () => {
      const result = cancelScheduledMessageSchema.safeParse({
        scheduledMessageId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('shareDocumentSchema', () => {
    it('should validate valid share', () => {
      const result = shareDocumentSchema.safeParse({
        documentId: '550e8400-e29b-41d4-a716-446655440000',
        userIds: ['550e8400-e29b-41d4-a716-446655440001'],
        permission: 'view',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('updateAnnouncementSchema', () => {
    it('should validate valid update', () => {
      const result = updateAnnouncementSchema.safeParse({ announcementId: '550e8400-e29b-41d4-a716-446655440000', title: 'Updated' });
      expect(result.success).toBe(true);
    });
  });

  describe('updateCalendarEventSchema', () => {
    it('should validate valid update', () => {
      const result = updateCalendarEventSchema.safeParse({ eventId: '550e8400-e29b-41d4-a716-446655440000', title: 'Updated' });
      expect(result.success).toBe(true);
    });
  });

  describe('updateTaskSchema', () => {
    it('should validate valid update', () => {
      const result = updateTaskSchema.safeParse({ taskId: '550e8400-e29b-41d4-a716-446655440000', title: 'Updated' });
      expect(result.success).toBe(true);
    });
  });

  describe('updateDocumentSchema', () => {
    it('should validate valid update', () => {
      const result = updateDocumentSchema.safeParse({ documentId: '550e8400-e29b-41d4-a716-446655440000', title: 'Updated' });
      expect(result.success).toBe(true);
    });
  });

  describe('addGroupMemberSchema', () => {
    it('should validate valid data', () => {
      const result = addGroupMemberSchema.safeParse({
        groupId: '550e8400-e29b-41d4-a716-446655440000',
        userIds: ['550e8400-e29b-41d4-a716-446655440001'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('removeGroupMemberSchema', () => {
    it('should validate valid data', () => {
      const result = removeGroupMemberSchema.safeParse({
        groupId: '550e8400-e29b-41d4-a716-446655440000',
        userId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
    });
  });
});
