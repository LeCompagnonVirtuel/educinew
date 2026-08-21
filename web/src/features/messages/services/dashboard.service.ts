import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class DashboardService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async getDashboard() {
    logger.info('Getting communication dashboard', { schoolId: this.schoolId });
    return this.repository.getDashboard(this.schoolId);
  }

  async getRecentActivity(limit?: number) {
    logger.info('Getting recent activity', { schoolId: this.schoolId });
    const { data: conversations } = await this.repository.findAllConversations(this.schoolId, { limit: limit || 10, sortBy: 'lastMessageAt', sortOrder: 'desc' });
    return conversations;
  }

  async getUnreadCounts(userId: string) {
    logger.info('Getting unread counts', { userId, schoolId: this.schoolId });
    const totalUnread = await this.repository.getTotalUnreadCount(userId, this.schoolId);
    return { totalUnread };
  }
}
