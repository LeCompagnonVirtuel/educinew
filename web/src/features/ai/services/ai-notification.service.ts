import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiNotification, AiNotificationQuery, AiNotificationCreate, AiNotificationUpdate } from '@educi/types';
import { AiNotificationNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiNotificationService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getNotification(schoolId: string, id: string): Promise<AiNotification> {
    const notification = await this.repo.findById(schoolId, id);
    if (!notification) throw new AiNotificationNotFoundError(id);
    return notification;
  }

  async listNotifications(schoolId: string, query: AiNotificationQuery): Promise<AiNotification[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createNotification(schoolId: string, data: AiNotificationCreate): Promise<AiNotification> {
    return this.repo.create(schoolId, data);
  }

  async updateNotification(schoolId: string, id: string, data: AiNotificationUpdate): Promise<AiNotification> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiNotificationNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteNotification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiNotificationNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async markAsRead(schoolId: string, id: string): Promise<AiNotification> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiNotificationNotFoundError(id);
    return this.repo.update(schoolId, id, { read: true, readAt: new Date().toISOString() });
  }

  async markAllAsRead(schoolId: string, userId: string): Promise<void> {
    return this.repo.markAllNotificationsAsRead(schoolId, userId);
  }

  async getUnreadCount(schoolId: string, userId: string): Promise<number> {
    return this.repo.findUnreadNotificationCount(schoolId, userId);
  }
}
