import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegulationCategory, RegulationCategoryCreate } from '@educi/types';
import { GovRegulationCategoryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatoryRegulationCategoryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<RegulationCategory> {
    const item = await this.repo.findRegulationCategoryById(schoolId, id);
    if (!item) throw new GovRegulationCategoryNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<RegulationCategory[]> {
    return this.repo.findAllRegulationCategories(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<RegulationCategoryCreate>): Promise<RegulationCategory> {
    return this.repo.createRegulationCategory(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<RegulationCategoryCreate>): Promise<RegulationCategory> {
    const existing = await this.repo.findRegulationCategoryById(schoolId, id);
    if (!existing) throw new GovRegulationCategoryNotFoundError(id);
    return this.repo.updateRegulationCategory(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegulationCategoryById(schoolId, id);
    if (!existing) throw new GovRegulationCategoryNotFoundError(id);
    return this.repo.deleteRegulationCategory(schoolId, id);
  }
}
