import type { SupabaseMessageRepository } from '../repositories';
import {
  createConversationSchema,
  updateConversationSchema,
  archiveConversationSchema,
  memberRoleSchema,
  messageFiltersSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface ConversationServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class ConversationService {
  constructor(private readonly deps: ConversationServiceDeps) {}

  async findConversation(id: string) {
    const conversation = await this.deps.repository.findConversation(id);
    if (!conversation) throw new Error('Conversation not found');
    return conversation;
  }

  async findAllConversations(filters?: Record<string, unknown>) {
    const parsed = filters ? messageFiltersSchema.parse(filters) : undefined;
    return this.deps.repository.findAllConversations(this.deps.schoolId, parsed as any);
  }

  async createConversation(data: Record<string, unknown>, userId: string) {
    const parsed = createConversationSchema.parse(data);
    return this.deps.repository.createConversation(parsed as any, this.deps.schoolId);
  }

  async updateConversation(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findConversation(id);
    if (!existing) throw new Error('Conversation not found');
    const parsed = updateConversationSchema.parse(data);
    const updated = await this.deps.repository.updateConversation(id, parsed as any);
    logger.info('Conversation updated', { conversationId: id }, 'messages');
    return updated;
  }

  async deleteConversation(id: string) {
    const existing = await this.deps.repository.findConversation(id);
    if (!existing) throw new Error('Conversation not found');
    await this.deps.repository.deleteConversation(id);
    logger.info('Conversation deleted', { conversationId: id }, 'messages');
  }

  async archiveConversation(id: string) {
    const existing = await this.deps.repository.findConversation(id);
    if (!existing) throw new Error('Conversation not found');
    return this.deps.repository.archiveConversation(id);
  }

  async restoreConversation(id: string) {
    const existing = await this.deps.repository.findConversation(id);
    if (!existing) throw new Error('Conversation not found');
    return this.deps.repository.restoreConversation(id);
  }

  async pinConversation(id: string) {
    const existing = await this.deps.repository.findConversation(id);
    if (!existing) throw new Error('Conversation not found');
    return this.deps.repository.pinConversation(id);
  }

  async muteConversation(id: string, muted: boolean) {
    const existing = await this.deps.repository.findConversation(id);
    if (!existing) throw new Error('Conversation not found');
    return this.deps.repository.muteConversation(id, muted);
  }

  async addMember(conversationId: string, userId: string, role?: string) {
    const conversation = await this.deps.repository.findConversation(conversationId);
    if (!conversation) throw new Error('Conversation not found');
    return this.deps.repository.addConversationMember(conversationId, userId, role);
  }

  async removeMember(conversationId: string, userId: string) {
    const conversation = await this.deps.repository.findConversation(conversationId);
    if (!conversation) throw new Error('Conversation not found');
    await this.deps.repository.removeConversationMember(conversationId, userId);
    logger.info('Member removed from conversation', { conversationId, userId }, 'messages');
  }

  async updateMemberRole(conversationId: string, userId: string, role: string) {
    const conversation = await this.deps.repository.findConversation(conversationId);
    if (!conversation) throw new Error('Conversation not found');
    return this.deps.repository.updateMemberRole(conversationId, userId, role);
  }

  async muteMember(conversationId: string, userId: string, muted: boolean) {
    const conversation = await this.deps.repository.findConversation(conversationId);
    if (!conversation) throw new Error('Conversation not found');
    return this.deps.repository.muteMember(conversationId, userId, muted);
  }

  async updateLastRead(conversationId: string, userId: string) {
    await this.deps.repository.updateLastRead(conversationId, userId);
  }

  async getUnreadCount(conversationId: string, userId: string) {
    return this.deps.repository.getUnreadCount(conversationId, userId);
  }

  async getTotalUnreadCount(userId: string) {
    return this.deps.repository.getTotalUnreadCount(userId, this.deps.schoolId);
  }
}
