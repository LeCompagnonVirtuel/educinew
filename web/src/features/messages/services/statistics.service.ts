import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class StatisticsService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async getMessageStatistics(filters?: Record<string, unknown>) {
    logger.info('Getting message statistics', { schoolId: this.schoolId });
    return this.repository.getMessageStatistics(this.schoolId, filters);
  }

  async getConversationStatistics(conversationId: string) {
    logger.info('Getting conversation statistics', { conversationId, schoolId: this.schoolId });
    const { data } = await this.repository.findMessages(conversationId, { limit: 10000 });
    return { conversationId, totalMessages: data.length, lastActivity: data[0]?.createdAt };
  }

  async getUserStatistics(userId: string) {
    logger.info('Getting user statistics', { userId, schoolId: this.schoolId });
    const { data: conversations } = await this.repository.findAllConversations(this.schoolId, { limit: 10000 });
    return { userId, totalConversations: conversations.length };
  }
}
