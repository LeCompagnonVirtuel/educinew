import type { SupabaseMessageRepository } from '../repositories';
import {
  notificationSettingsSchema,
  notificationPreferenceSchema,
  messageFiltersSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface NotificationServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class NotificationService {
  constructor(private readonly deps: NotificationServiceDeps) {}

  async findNotification(id: string) {
    const notification = await this.deps.repository.findNotification(id);
    if (!notification) throw new Error('Notification not found');
    return notification;
  }

  async findNotifications(userId: string, filters?: Record<string, unknown>) {
    const parsed = filters ? messageFiltersSchema.parse(filters) : undefined;
    return this.deps.repository.findNotifications(userId, this.deps.schoolId, parsed as any);
  }

  async createNotification(data: Record<string, unknown>) {
    const parsed = notificationPreferenceSchema.parse(data);
    const notification = await this.deps.repository.createNotification({
      userId: data.userId as string,
      schoolId: this.deps.schoolId,
      type: parsed.type,
      title: data.title as string,
      body: data.body as string,
      data: data.data as Record<string, unknown> | undefined,
      channels: data.channels as string[] | undefined,
    });
    logger.info('Notification created', { notificationId: notification.id }, 'messages');
    return notification;
  }

  async markNotificationAsRead(id: string) {
    const existing = await this.deps.repository.findNotification(id);
    if (!existing) throw new Error('Notification not found');
    return this.deps.repository.markNotificationAsRead(id);
  }

  async markAllNotificationsAsRead(userId: string) {
    await this.deps.repository.markAllNotificationsAsRead(userId, this.deps.schoolId);
    logger.info('All notifications marked as read', { userId }, 'messages');
  }

  async deleteNotification(id: string) {
    const existing = await this.deps.repository.findNotification(id);
    if (!existing) throw new Error('Notification not found');
    await this.deps.repository.deleteNotification(id);
    logger.info('Notification deleted', { notificationId: id }, 'messages');
  }

  async deleteAllNotifications(userId: string) {
    await this.deps.repository.deleteAllNotifications(userId, this.deps.schoolId);
    logger.info('All notifications deleted', { userId }, 'messages');
  }

  async findPreferences(userId: string) {
    return this.deps.repository.findNotificationPreferences(userId, this.deps.schoolId);
  }

  async updatePreference(userId: string, channel: string, type: string, isEnabled: boolean) {
    return this.deps.repository.updateNotificationPreference(
      userId,
      this.deps.schoolId,
      channel,
      type,
      isEnabled,
    );
  }

  async findSettings(userId: string) {
    return this.deps.repository.findNotificationSettings(userId, this.deps.schoolId);
  }

  async updateSettings(userId: string, data: Record<string, unknown>) {
    const parsed = notificationSettingsSchema.parse(data);
    return this.deps.repository.updateNotificationSettings(
      userId,
      this.deps.schoolId,
      parsed as any,
    );
  }
}
