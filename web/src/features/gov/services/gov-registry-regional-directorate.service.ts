import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalDirectorate, RegionalDirectorateCreate } from '@educi/types';
import { GovRegionalDirectorateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegistryRegionalDirectorateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<RegionalDirectorate> {
    const item = await this.repo.findRegionalDirectorateById(schoolId, id);
    if (!item) throw new GovRegionalDirectorateNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalDirectorate[]> {
    return this.repo.findAllRegionalDirectorates(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<RegionalDirectorateCreate>): Promise<RegionalDirectorate> {
    return this.repo.createRegionalDirectorate(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<RegionalDirectorateCreate>): Promise<RegionalDirectorate> {
    const existing = await this.repo.findRegionalDirectorateById(schoolId, id);
    if (!existing) throw new GovRegionalDirectorateNotFoundError(id);
    return this.repo.updateRegionalDirectorate(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalDirectorateById(schoolId, id);
    if (!existing) throw new GovRegionalDirectorateNotFoundError(id);
    return this.repo.deleteRegionalDirectorate(schoolId, id);
  }
}
