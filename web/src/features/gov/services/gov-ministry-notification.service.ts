// Government & National Governance Service - MinistryNotification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryNotification, MinistryNotificationCreate } from '@educi/types';
import { GovMinistryNotificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryNotificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getMinistryNotification(schoolId: string, id: string): Promise<MinistryNotification> {
    const item = await this.repo.findMinistryNotificationById(schoolId, id);
    if (!item) throw new GovMinistryNotificationNotFoundError(id);
    return item;
  }

  async listMinistryNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryNotification[]> {
    return this.repo.findAllMinistryNotifications(schoolId, filters);
  }

  async createMinistryNotification(schoolId: string, data: MinistryNotificationCreate): Promise<MinistryNotification> {
    return this.repo.createMinistryNotification(schoolId, data);
  }

  async updateMinistryNotification(schoolId: string, id: string, data: Partial<MinistryNotificationCreate>): Promise<MinistryNotification> {
    const existing = await this.repo.findMinistryNotificationById(schoolId, id);
    if (!existing) throw new GovMinistryNotificationNotFoundError(id);
    return this.repo.updateMinistryNotification(schoolId, id, data);
  }

  async deleteMinistryNotification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryNotificationById(schoolId, id);
    if (!existing) throw new GovMinistryNotificationNotFoundError(id);
    return this.repo.deleteMinistryNotification(schoolId, id);
  }

  async countMinistryNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMinistryNotifications(schoolId, filters);
  }
}
