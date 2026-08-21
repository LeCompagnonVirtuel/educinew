import type { Conversation, ConversationMember, Message, MessageRead, Reaction, Attachment, Notification, NotificationPreference, NotificationSettings, Group, GroupMember, Announcement, Broadcast, MessageSearch, MessageFilters, CreateConversationRequest, SendMessageRequest, EditMessageRequest, CreateGroupRequest, CreateAnnouncementRequest, CreateBroadcastRequest, MessageStatistics, CommunicationDashboard, MessageAudit, MessageRepository } from '@educi/types';

export interface MessageRepositoryExtended extends MessageRepository {
  findUser(userId: string): Promise<any | null>;
  findUsers(userIds: string[]): Promise<any[]>;
  findClass(classId: string): Promise<any | null>;
  findStudentsByClass(classId: string): Promise<any[]>;
  findParentsByStudent(studentId: string): Promise<any[]>;
  getSchoolSettings(schoolId: string): Promise<any>;
  logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void>;
}

export type { Conversation, ConversationMember, Message, MessageRead, Reaction, Attachment, Notification, NotificationPreference, NotificationSettings, Group, GroupMember, Announcement, Broadcast, MessageSearch, MessageFilters, CreateConversationRequest, SendMessageRequest, EditMessageRequest, CreateGroupRequest, CreateAnnouncementRequest, CreateBroadcastRequest, MessageStatistics, CommunicationDashboard, MessageAudit };
