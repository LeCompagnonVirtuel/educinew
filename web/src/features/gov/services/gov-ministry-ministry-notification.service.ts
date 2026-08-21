import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryNotification, MinistryNotificationCreate } from '@educi/types';
import { GovMinistryNotificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryMinistryNotificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<MinistryNotification> {
    const item = await this.repo.findMinistryNotificationById(schoolId, id);
    if (!item) throw new GovMinistryNotificationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryNotification[]> {
    return this.repo.findAllMinistryNotifications(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<MinistryNotificationCreate>): Promise<MinistryNotification> {
    return this.repo.createMinistryNotification(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<MinistryNotificationCreate>): Promise<MinistryNotification> {
    const existing = await this.repo.findMinistryNotificationById(schoolId, id);
    if (!existing) throw new GovMinistryNotificationNotFoundError(id);
    return this.repo.updateMinistryNotification(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryNotificationById(schoolId, id);
    if (!existing) throw new GovMinistryNotificationNotFoundError(id);
    return this.repo.deleteMinistryNotification(schoolId, id);
  }
}
