// Government & National Governance Service - PushNotification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PushNotification, PushNotificationCreate } from '@educi/types';
import { GovPushNotificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPushNotificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getPushNotification(schoolId: string, id: string): Promise<PushNotification> {
    const item = await this.repo.findPushNotificationById(schoolId, id);
    if (!item) throw new GovPushNotificationNotFoundError(id);
    return item;
  }

  async listPushNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<PushNotification[]> {
    return this.repo.findAllPushNotifications(schoolId, filters);
  }

  async createPushNotification(schoolId: string, data: PushNotificationCreate): Promise<PushNotification> {
    return this.repo.createPushNotification(schoolId, data);
  }

  async updatePushNotification(schoolId: string, id: string, data: Partial<PushNotificationCreate>): Promise<PushNotification> {
    const existing = await this.repo.findPushNotificationById(schoolId, id);
    if (!existing) throw new GovPushNotificationNotFoundError(id);
    return this.repo.updatePushNotification(schoolId, id, data);
  }

  async deletePushNotification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPushNotificationById(schoolId, id);
    if (!existing) throw new GovPushNotificationNotFoundError(id);
    return this.repo.deletePushNotification(schoolId, id);
  }

  async countPushNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPushNotifications(schoolId, filters);
  }
}
