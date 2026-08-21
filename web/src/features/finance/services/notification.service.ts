import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class NotificationService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findNotifications(userId?: string) {
    return this.repository.listFinanceNotifications(this.schoolId, userId);
  }

  async createNotification(data: Record<string, unknown>) {
    const notification = await this.repository.createFinanceNotification({ ...data, school_id: this.schoolId });
    logger.info('Finance notification created', { notificationId: notification.id }, 'finance');
    return notification;
  }

  async markNotificationAsRead(id: string) {
    const notification = await this.repository.markNotificationRead(id);
    logger.info('Finance notification marked as read', { notificationId: id }, 'finance');
    return notification;
  }
}
