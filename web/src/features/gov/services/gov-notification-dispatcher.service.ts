// Government & National Governance Service - NotificationDispatcher
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NotificationDispatcher, NotificationDispatcherCreate } from '@educi/types';
import { GovNotificationDispatcherNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNotificationDispatcherService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNotificationDispatcher(schoolId: string, id: string): Promise<NotificationDispatcher> {
    const item = await this.repo.findNotificationDispatcherById(schoolId, id);
    if (!item) throw new GovNotificationDispatcherNotFoundError(id);
    return item;
  }

  async listNotificationDispatchers(schoolId: string, filters?: Record<string, unknown>): Promise<NotificationDispatcher[]> {
    return this.repo.findAllNotificationDispatchers(schoolId, filters);
  }

  async createNotificationDispatcher(schoolId: string, data: NotificationDispatcherCreate): Promise<NotificationDispatcher> {
    return this.repo.createNotificationDispatcher(schoolId, data);
  }

  async updateNotificationDispatcher(schoolId: string, id: string, data: Partial<NotificationDispatcherCreate>): Promise<NotificationDispatcher> {
    const existing = await this.repo.findNotificationDispatcherById(schoolId, id);
    if (!existing) throw new GovNotificationDispatcherNotFoundError(id);
    return this.repo.updateNotificationDispatcher(schoolId, id, data);
  }

  async deleteNotificationDispatcher(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNotificationDispatcherById(schoolId, id);
    if (!existing) throw new GovNotificationDispatcherNotFoundError(id);
    return this.repo.deleteNotificationDispatcher(schoolId, id);
  }

  async countNotificationDispatchers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNotificationDispatchers(schoolId, filters);
  }
}
