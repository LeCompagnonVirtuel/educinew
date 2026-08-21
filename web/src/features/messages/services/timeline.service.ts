import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class TimelineService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async getTimeline(filters?: Record<string, unknown>) {
    logger.info('Getting timeline', { schoolId: this.schoolId });
    const { data: conversations } = await this.repository.findAllConversations(this.schoolId, { limit: 50, sortBy: 'lastMessageAt', sortOrder: 'desc' });
    return { timeline: conversations, generatedAt: new Date().toISOString() };
  }

  async getConversationTimeline(conversationId: string, limit?: number) {
    logger.info('Getting conversation timeline', { conversationId, schoolId: this.schoolId });
    const { data } = await this.repository.findMessages(conversationId, { limit: limit || 50, sortBy: 'createdAt', sortOrder: 'desc' });
    return { timeline: data, conversationId };
  }

  async getUserTimeline(userId: string, limit?: number) {
    logger.info('Getting user timeline', { userId, schoolId: this.schoolId });
    const { data: conversations } = await this.repository.findAllConversations(this.schoolId, { limit: limit || 50, sortBy: 'lastMessageAt', sortOrder: 'desc' });
    return { timeline: conversations, userId };
  }
}
