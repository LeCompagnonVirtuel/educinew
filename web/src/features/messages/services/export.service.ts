import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class ExportService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async exportMessages(conversationId: string, format: string) {
    logger.info('Exporting messages', { conversationId, format, schoolId: this.schoolId });
    const { data } = await this.repository.findMessages(conversationId, { limit: 10000 });
    return { messages: data, format, exportedAt: new Date().toISOString() };
  }

  async exportConversations(format: string) {
    logger.info('Exporting conversations', { format, schoolId: this.schoolId });
    const { data } = await this.repository.findAllConversations(this.schoolId, { limit: 10000 });
    return { conversations: data, format, exportedAt: new Date().toISOString() };
  }

  async exportStatistics(period?: string) {
    logger.info('Exporting message statistics', { period, schoolId: this.schoolId });
    const stats = await this.repository.getMessageStatistics(this.schoolId);
    return { statistics: stats, period: period || 'all', exportedAt: new Date().toISOString() };
  }
}
