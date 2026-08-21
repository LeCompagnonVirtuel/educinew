import type { SupabaseClient } from '@supabase/supabase-js';
import type { CrossBorderResearch, CrossBorderResearchCreate } from '@educi/types';
import { GovCrossBorderResearchNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataCrossBorderResearchService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<CrossBorderResearch> {
    const item = await this.repo.findCrossBorderResearchById(schoolId, id);
    if (!item) throw new GovCrossBorderResearchNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<CrossBorderResearch[]> {
    return this.repo.findAllCrossBorderResearches(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CrossBorderResearchCreate>): Promise<CrossBorderResearch> {
    return this.repo.createCrossBorderResearch(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CrossBorderResearchCreate>): Promise<CrossBorderResearch> {
    const existing = await this.repo.findCrossBorderResearchById(schoolId, id);
    if (!existing) throw new GovCrossBorderResearchNotFoundError(id);
    return this.repo.updateCrossBorderResearch(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCrossBorderResearchById(schoolId, id);
    if (!existing) throw new GovCrossBorderResearchNotFoundError(id);
    return this.repo.deleteCrossBorderResearch(schoolId, id);
  }
}
