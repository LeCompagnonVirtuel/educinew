import { describe, it, expect } from 'vitest';
import type {
  Conversation,
  ConversationMember,
  Message,
  MessageRead,
  Reaction,
  Attachment,
  Notification,
  NotificationPreference,
  NotificationSettings,
  Group,
  GroupMember,
  Announcement,
  Broadcast,
  MessageSearch,
  MessageFilters,
  CreateConversationRequest,
  SendMessageRequest,
  EditMessageRequest,
  CreateGroupRequest,
  CreateAnnouncementRequest,
  CreateBroadcastRequest,
  MessageStatistics,
  CommunicationDashboard,
  MessageAudit,
} from '@educi/types';

describe('Message Types', () => {
  it('should define Conversation interface correctly', () => {
    const conversation: Conversation = {
      id: '1',
      type: 'PRIVATE',
      title: 'Discussion',
      description: 'Test',
      avatarUrl: null,
      schoolId: 'sch1',
      isArchived: false,
      isPinned: false,
      isMuted: false,
      lastMessageAt: new Date().toISOString(),
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(conversation.id).toBe('1');
    expect(conversation.type).toBe('PRIVATE');
  });

  it('should define ConversationMember interface correctly', () => {
    const member: ConversationMember = {
      id: '1',
      conversationId: 'c1',
      userId: 'u1',
      role: 'MEMBER',
      isMuted: false,
      lastReadAt: new Date().toISOString(),
      joinedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    expect(member.conversationId).toBe('c1');
    expect(member.role).toBe('MEMBER');
  });

  it('should define Message interface correctly', () => {
    const message: Message = {
      id: '1',
      conversationId: 'c1',
      senderId: 'u1',
      content: 'Hello',
      type: 'TEXT',
      status: 'SENT',
      replyToId: null,
      isPinned: false,
      isDeleted: false,
      editedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(message.content).toBe('Hello');
    expect(message.type).toBe('TEXT');
  });

  it('should define MessageRead interface correctly', () => {
    const read: MessageRead = {
      id: '1',
      messageId: 'm1',
      userId: 'u1',
      readAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    expect(read.messageId).toBe('m1');
    expect(read.readAt).toBeDefined();
  });

  it('should define Reaction interface correctly', () => {
    const reaction: Reaction = {
      id: '1',
      messageId: 'm1',
      userId: 'u1',
      type: 'LIKE',
      createdAt: new Date().toISOString(),
    };
    expect(reaction.type).toBe('LIKE');
    expect(reaction.messageId).toBe('m1');
  });

  it('should define Attachment interface correctly', () => {
    const attachment: Attachment = {
      id: '1',
      messageId: 'm1',
      fileName: 'document.pdf',
      fileUrl: 'https://example.com/doc.pdf',
      fileSize: 1024,
      mimeType: 'application/pdf',
      type: 'PDF',
      uploadedBy: 'u1',
      createdAt: new Date().toISOString(),
    };
    expect(attachment.fileName).toBe('document.pdf');
    expect(attachment.type).toBe('PDF');
  });

  it('should define Notification interface correctly', () => {
    const notification: Notification = {
      id: '1',
      userId: 'u1',
      schoolId: 'sch1',
      type: 'MESSAGE',
      title: 'New message',
      body: 'You have a new message',
      data: {},
      read: false,
      createdAt: new Date().toISOString(),
    };
    expect(notification.type).toBe('MESSAGE');
    expect(notification.read).toBe(false);
  });

  it('should define NotificationPreference interface correctly', () => {
    const pref: NotificationPreference = {
      id: '1',
      userId: 'u1',
      schoolId: 'sch1',
      channel: 'EMAIL',
      type: 'MESSAGE',
      isEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(pref.channel).toBe('EMAIL');
    expect(pref.isEnabled).toBe(true);
  });

  it('should define NotificationSettings interface correctly', () => {
    const settings: NotificationSettings = {
      id: '1',
      userId: 'u1',
      schoolId: 'sch1',
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: false,
      whatsappEnabled: false,
      messageNotifications: true,
      announcementNotifications: true,
      broadcastNotifications: true,
      mentionNotifications: true,
      reactionNotifications: true,
      systemNotifications: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(settings.emailEnabled).toBe(true);
    expect(settings.quietHoursStart).toBe('22:00');
  });

  it('should define Group interface correctly', () => {
    const group: Group = {
      id: '1',
      name: 'Teachers Group',
      description: 'All teachers',
      type: 'STAFF',
      schoolId: 'sch1',
      avatarUrl: null,
      isArchived: false,
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(group.name).toBe('Teachers Group');
    expect(group.type).toBe('STAFF');
  });

  it('should define GroupMember interface correctly', () => {
    const member: GroupMember = {
      id: '1',
      groupId: 'g1',
      userId: 'u1',
      role: 'ADMIN',
      joinedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    expect(member.role).toBe('ADMIN');
    expect(member.groupId).toBe('g1');
  });

  it('should define Announcement interface correctly', () => {
    const announcement: Announcement = {
      id: '1',
      title: 'School Event',
      content: 'Annual day celebration',
      type: 'ANNOUNCEMENT',
      priority: 'HIGH',
      targetAudience: 'ALL_PARENTS',
      schoolId: 'sch1',
      publishedBy: 'u1',
      isPublished: true,
      publishedAt: new Date().toISOString(),
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(announcement.priority).toBe('HIGH');
    expect(announcement.isPublished).toBe(true);
  });

  it('should define Broadcast interface correctly', () => {
    const broadcast: Broadcast = {
      id: '1',
      title: 'Important Notice',
      content: 'School closed tomorrow',
      scope: 'WHOLE_SCHOOL',
      schoolId: 'sch1',
      sentBy: 'u1',
      status: 'SENT',
      channels: ['EMAIL', 'SMS'],
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(broadcast.status).toBe('SENT');
    expect(broadcast.channels).toHaveLength(2);
  });

  it('should define MessageSearch interface correctly', () => {
    const search: MessageSearch = {
      query: 'test',
      conversationId: 'c1',
      senderId: 'u1',
      type: 'TEXT',
      dateFrom: '2025-01-01',
      dateTo: '2025-12-31',
      hasAttachment: false,
      limit: 20,
      offset: 0,
    };
    expect(search.query).toBe('test');
    expect(search.limit).toBe(20);
  });

  it('should define MessageFilters interface correctly', () => {
    const filters: MessageFilters = {
      conversationId: 'c1',
      senderId: 'u1',
      type: 'TEXT',
      status: 'SENT',
      dateFrom: '2025-01-01',
      dateTo: '2025-12-31',
      hasAttachment: false,
      isArchived: false,
      isPinned: false,
      search: 'test',
      limit: 20,
      offset: 0,
      sortBy: 'created_at',
      sortOrder: 'desc',
    };
    expect(filters.sortBy).toBe('created_at');
    expect(filters.sortOrder).toBe('desc');
  });

  it('should define CreateConversationRequest correctly', () => {
    const request: CreateConversationRequest = {
      type: 'GROUP',
      title: 'New Group',
      description: 'Group description',
      memberIds: ['u1', 'u2'],
    };
    expect(request.type).toBe('GROUP');
    expect(request.memberIds).toHaveLength(2);
  });

  it('should define SendMessageRequest correctly', () => {
    const request: SendMessageRequest = {
      conversationId: 'c1',
      content: 'Hello everyone!',
      type: 'TEXT',
      replyToId: null,
      attachmentIds: [],
    };
    expect(request.content).toBe('Hello everyone!');
    expect(request.conversationId).toBe('c1');
  });

  it('should define EditMessageRequest correctly', () => {
    const request: EditMessageRequest = {
      content: 'Updated message',
    };
    expect(request.content).toBe('Updated message');
  });

  it('should define CreateGroupRequest correctly', () => {
    const request: CreateGroupRequest = {
      name: 'Study Group',
      description: 'For studying',
      type: 'CLASS',
      memberIds: ['u1', 'u2', 'u3'],
    };
    expect(request.name).toBe('Study Group');
    expect(request.memberIds).toHaveLength(3);
  });

  it('should define CreateAnnouncementRequest correctly', () => {
    const request: CreateAnnouncementRequest = {
      title: 'Exam Schedule',
      content: 'Final exams start next week',
      type: 'ANNOUNCEMENT',
      priority: 'URGENT',
      targetAudience: 'ALL_STUDENTS',
    };
    expect(request.priority).toBe('URGENT');
    expect(request.targetAudience).toBe('ALL_STUDENTS');
  });

  it('should define CreateBroadcastRequest correctly', () => {
    const request: CreateBroadcastRequest = {
      title: 'Holiday Notice',
      content: 'School closed for holidays',
      scope: 'WHOLE_SCHOOL',
      channels: ['EMAIL', 'PUSH'],
    };
    expect(request.scope).toBe('WHOLE_SCHOOL');
    expect(request.channels).toContain('EMAIL');
  });

  it('should define MessageStatistics interface correctly', () => {
    const stats: MessageStatistics = {
      schoolId: 'sch1',
      totalMessages: 1000,
      totalConversations: 50,
      totalUsers: 100,
      messagesByType: { TEXT: 800, IMAGE: 100, FILE: 50, AUDIO: 20, VIDEO: 10, SYSTEM: 10, ANNOUNCEMENT: 5, BROADCAST: 5 },
      messagesByDay: [],
      messagesByHour: [],
      topConversations: [],
      activeUsers: 0,
      averageMessagesPerDay: 0,
      averageResponseTime: 0,
    };
    expect(stats.totalMessages).toBe(1000);
    expect(stats.messagesByType.TEXT).toBe(800);
  });

  it('should define CommunicationDashboard interface correctly', () => {
    const dashboard: CommunicationDashboard = {
      schoolId: 'sch1',
      totalConversations: 50,
      activeConversations: 30,
      totalMessages: 1000,
      unreadNotifications: 15,
      pendingBroadcasts: 3,
      recentActivity: [],
      topConversations: [],
      unreadByUser: {},
    };
    expect(dashboard.totalConversations).toBe(50);
    expect(dashboard.unreadNotifications).toBe(15);
  });

  it('should define MessageAudit interface correctly', () => {
    const audit: MessageAudit = {
      id: '1',
      schoolId: 'sch1',
      userId: 'u1',
      action: 'CREATE',
      entityType: 'MESSAGE',
      entityId: 'm1',
      previousValue: null,
      newValue: { content: 'Hello' },
      createdAt: new Date().toISOString(),
    };
    expect(audit.action).toBe('CREATE');
    expect(audit.entityType).toBe('MESSAGE');
  });

  it('should define all ConversationType values', () => {
    const types: Conversation['type'][] = ['PRIVATE', 'GROUP', 'CLASS', 'LEVEL', 'COHORT', 'PARENTS', 'STAFF', 'TEACHERS', 'ADMIN', 'DIRECTION', 'ACCOUNTING'];
    expect(types).toHaveLength(11);
  });

  it('should define all MessageType values', () => {
    const types: Message['type'][] = ['TEXT', 'IMAGE', 'FILE', 'AUDIO', 'VIDEO', 'SYSTEM', 'ANNOUNCEMENT', 'BROADCAST'];
    expect(types).toHaveLength(8);
  });

  it('should define all MessageStatus values', () => {
    const statuses: Message['status'][] = ['SENT', 'DELIVERED', 'READ', 'DELETED', 'ARCHIVED'];
    expect(statuses).toHaveLength(5);
  });

  it('should define all NotificationType values', () => {
    const types: Notification['type'][] = ['MESSAGE', 'ANNOUNCEMENT', 'BROADCAST', 'MENTION', 'REACTION', 'SYSTEM', 'REMINDER'];
    expect(types).toHaveLength(7);
  });

  it('should define all NotificationChannel values', () => {
    const channels: NotificationPreference['channel'][] = ['IN_APP', 'PUSH', 'EMAIL', 'SMS', 'WHATSAPP'];
    expect(channels).toHaveLength(5);
  });

  it('should define all BroadcastScope values', () => {
    const scopes: Broadcast['scope'][] = ['SINGLE', 'CLASS', 'LEVEL', 'ALL_PARENTS', 'ALL_TEACHERS', 'ALL_STUDENTS', 'ALL_STAFF', 'WHOLE_SCHOOL', 'MULTI_SCHOOL'];
    expect(scopes).toHaveLength(9);
  });

  it('should define all ReactionType values', () => {
    const types: Reaction['type'][] = ['LIKE', 'LOVE', 'LAUGH', 'WOW', 'SAD', 'ANGRY'];
    expect(types).toHaveLength(6);
  });

  it('should define all GroupRole values', () => {
    const roles: GroupMember['role'][] = ['OWNER', 'ADMIN', 'MODERATOR', 'MEMBER'];
    expect(roles).toHaveLength(4);
  });

  it('should define all AttachmentType values', () => {
    const types: Attachment['type'][] = ['IMAGE', 'DOCUMENT', 'PDF', 'VIDEO', 'AUDIO', 'ARCHIVE', 'OTHER'];
    expect(types).toHaveLength(7);
  });

  it('should define all BroadcastStatus values', () => {
    const statuses: Broadcast['status'][] = ['DRAFT', 'SCHEDULED', 'SENT', 'FAILED'];
    expect(statuses).toHaveLength(4);
  });

  it('should define all AnnouncementPriority values', () => {
    const priorities: Announcement['priority'][] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    expect(priorities).toHaveLength(4);
  });
});
