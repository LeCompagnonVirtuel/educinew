// Government & National Governance Service - EducationStrategy
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationStrategy, EducationStrategyCreate } from '@educi/types';
import { GovEducationStrategyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationStrategyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationStrategy(schoolId: string, id: string): Promise<EducationStrategy> {
    const item = await this.repo.findEducationStrategyById(schoolId, id);
    if (!item) throw new GovEducationStrategyNotFoundError(id);
    return item;
  }

  async listEducationStrategies(schoolId: string, filters?: Record<string, unknown>): Promise<EducationStrategy[]> {
    return this.repo.findAllEducationStrategies(schoolId, filters);
  }

  async createEducationStrategy(schoolId: string, data: EducationStrategyCreate): Promise<EducationStrategy> {
    return this.repo.createEducationStrategy(schoolId, data);
  }

  async updateEducationStrategy(schoolId: string, id: string, data: Partial<EducationStrategyCreate>): Promise<EducationStrategy> {
    const existing = await this.repo.findEducationStrategyById(schoolId, id);
    if (!existing) throw new GovEducationStrategyNotFoundError(id);
    return this.repo.updateEducationStrategy(schoolId, id, data);
  }

  async deleteEducationStrategy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationStrategyById(schoolId, id);
    if (!existing) throw new GovEducationStrategyNotFoundError(id);
    return this.repo.deleteEducationStrategy(schoolId, id);
  }

  async countEducationStrategies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationStrategies(schoolId, filters);
  }
}
