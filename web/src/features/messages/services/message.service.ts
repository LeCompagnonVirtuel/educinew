import type { SupabaseMessageRepository } from '../repositories';
import {
  sendMessageSchema,
  editMessageSchema,
  deleteMessageSchema,
  pinMessageSchema,
  forwardMessageSchema,
  messageFiltersSchema,
  messageSearchSchema,
  bulkMarkReadSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface MessageServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class MessageService {
  constructor(private readonly deps: MessageServiceDeps) {}

  async findMessage(id: string) {
    const message = await this.deps.repository.findMessage(id);
    if (!message) throw new Error('Message not found');
    return message;
  }

  async findMessages(conversationId: string, filters?: Record<string, unknown>) {
    const parsed = filters ? messageFiltersSchema.parse(filters) : undefined;
    return this.deps.repository.findMessages(conversationId, parsed as any);
  }

  async createMessage(data: Record<string, unknown>, senderId: string) {
    const parsed = sendMessageSchema.parse(data);
    return this.deps.repository.createMessage(parsed as any, senderId, this.deps.schoolId);
  }

  async updateMessage(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findMessage(id);
    if (!existing) throw new Error('Message not found');
    const parsed = editMessageSchema.parse(data);
    const updated = await this.deps.repository.updateMessage(id, parsed);
    logger.info('Message updated', { messageId: id }, 'messages');
    return updated;
  }

  async deleteMessage(id: string, permanent: boolean = false) {
    const existing = await this.deps.repository.findMessage(id);
    if (!existing) throw new Error('Message not found');
    if (permanent) {
      await this.deps.repository.deleteMessage(id);
      logger.info('Message permanently deleted', { messageId: id }, 'messages');
    } else {
      await this.deps.repository.softDeleteMessage(id);
      logger.info('Message soft deleted', { messageId: id }, 'messages');
    }
  }

  async softDeleteMessage(id: string) {
    const existing = await this.deps.repository.findMessage(id);
    if (!existing) throw new Error('Message not found');
    return this.deps.repository.softDeleteMessage(id);
  }

  async pinMessage(id: string) {
    const existing = await this.deps.repository.findMessage(id);
    if (!existing) throw new Error('Message not found');
    return this.deps.repository.pinMessage(id);
  }

  async forwardMessage(id: string, targetConversationIds: string[], userId: string) {
    const parsed = forwardMessageSchema.parse({ messageId: id, targetConversationIds });
    return this.deps.repository.forwardMessage(parsed.messageId, parsed.targetConversationIds, userId);
  }

  async searchMessages(search: Record<string, unknown>) {
    const parsed = messageSearchSchema.parse(search);
    return this.deps.repository.searchMessages(this.deps.schoolId, parsed as any);
  }

  async markAsRead(messageId: string, userId: string) {
    const message = await this.deps.repository.findMessage(messageId);
    if (!message) throw new Error('Message not found');
    return this.deps.repository.markAsRead(messageId, userId);
  }

  async markConversationAsRead(conversationId: string, userId: string) {
    await this.deps.repository.markConversationAsRead(conversationId, userId);
    logger.info('Conversation marked as read', { conversationId, userId }, 'messages');
  }

  async getUnreadCount(conversationId: string, userId: string) {
    return this.deps.repository.getUnreadCount(conversationId, userId);
  }

  async getTotalUnreadCount(userId: string) {
    return this.deps.repository.getTotalUnreadCount(userId, this.deps.schoolId);
  }
}
