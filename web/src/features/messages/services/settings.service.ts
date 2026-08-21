import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class SettingsService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async findSettings(userId: string) {
    logger.info('Finding notification settings', { userId, schoolId: this.schoolId });
    return this.repository.findNotificationSettings(userId, this.schoolId);
  }

  async updateSettings(userId: string, data: Record<string, unknown>) {
    logger.info('Updating notification settings', { userId, schoolId: this.schoolId });
    return this.repository.updateNotificationSettings(userId, this.schoolId, data);
  }

  async findNotificationSettings(userId: string) {
    logger.info('Finding notification settings', { userId, schoolId: this.schoolId });
    return this.repository.findNotificationSettings(userId, this.schoolId);
  }

  async updateNotificationSettings(userId: string, data: Record<string, unknown>) {
    logger.info('Updating notification settings', { userId, schoolId: this.schoolId });
    return this.repository.updateNotificationSettings(userId, this.schoolId, data);
  }
}
