import type { SupabaseClient } from '@supabase/supabase-js';
import type { Ministry, MinistryCreate } from '@educi/types';
import { GovMinistryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryMinistryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Ministry> {
    const item = await this.repo.findMinistryById(schoolId, id);
    if (!item) throw new GovMinistryNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Ministry[]> {
    return this.repo.findAllMinistries(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<MinistryCreate>): Promise<Ministry> {
    return this.repo.createMinistry(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<MinistryCreate>): Promise<Ministry> {
    const existing = await this.repo.findMinistryById(schoolId, id);
    if (!existing) throw new GovMinistryNotFoundError(id);
    return this.repo.updateMinistry(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryById(schoolId, id);
    if (!existing) throw new GovMinistryNotFoundError(id);
    return this.repo.deleteMinistry(schoolId, id);
  }
}
