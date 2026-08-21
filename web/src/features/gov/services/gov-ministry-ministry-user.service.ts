import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryUser, MinistryUserCreate } from '@educi/types';
import { GovMinistryUserNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryMinistryUserService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<MinistryUser> {
    const item = await this.repo.findMinistryUserById(schoolId, id);
    if (!item) throw new GovMinistryUserNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryUser[]> {
    return this.repo.findAllMinistryUsers(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<MinistryUserCreate>): Promise<MinistryUser> {
    return this.repo.createMinistryUser(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<MinistryUserCreate>): Promise<MinistryUser> {
    const existing = await this.repo.findMinistryUserById(schoolId, id);
    if (!existing) throw new GovMinistryUserNotFoundError(id);
    return this.repo.updateMinistryUser(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryUserById(schoolId, id);
    if (!existing) throw new GovMinistryUserNotFoundError(id);
    return this.repo.deleteMinistryUser(schoolId, id);
  }
}
