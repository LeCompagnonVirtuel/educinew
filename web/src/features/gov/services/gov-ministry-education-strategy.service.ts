import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationStrategy, EducationStrategyCreate } from '@educi/types';
import { GovEducationStrategyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryEducationStrategyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationStrategy> {
    const item = await this.repo.findEducationStrategyById(schoolId, id);
    if (!item) throw new GovEducationStrategyNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationStrategy[]> {
    return this.repo.findAllEducationStrategies(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationStrategyCreate>): Promise<EducationStrategy> {
    return this.repo.createEducationStrategy(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationStrategyCreate>): Promise<EducationStrategy> {
    const existing = await this.repo.findEducationStrategyById(schoolId, id);
    if (!existing) throw new GovEducationStrategyNotFoundError(id);
    return this.repo.updateEducationStrategy(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationStrategyById(schoolId, id);
    if (!existing) throw new GovEducationStrategyNotFoundError(id);
    return this.repo.deleteEducationStrategy(schoolId, id);
  }
}
