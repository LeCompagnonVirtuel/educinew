// Government & National Governance Service - RegulationCategory
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegulationCategory, RegulationCategoryCreate } from '@educi/types';
import { GovRegulationCategoryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegulationCategoryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegulationCategory(schoolId: string, id: string): Promise<RegulationCategory> {
    const item = await this.repo.findRegulationCategoryById(schoolId, id);
    if (!item) throw new GovRegulationCategoryNotFoundError(id);
    return item;
  }

  async listRegulationCategories(schoolId: string, filters?: Record<string, unknown>): Promise<RegulationCategory[]> {
    return this.repo.findAllRegulationCategories(schoolId, filters);
  }

  async createRegulationCategory(schoolId: string, data: RegulationCategoryCreate): Promise<RegulationCategory> {
    return this.repo.createRegulationCategory(schoolId, data);
  }

  async updateRegulationCategory(schoolId: string, id: string, data: Partial<RegulationCategoryCreate>): Promise<RegulationCategory> {
    const existing = await this.repo.findRegulationCategoryById(schoolId, id);
    if (!existing) throw new GovRegulationCategoryNotFoundError(id);
    return this.repo.updateRegulationCategory(schoolId, id, data);
  }

  async deleteRegulationCategory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegulationCategoryById(schoolId, id);
    if (!existing) throw new GovRegulationCategoryNotFoundError(id);
    return this.repo.deleteRegulationCategory(schoolId, id);
  }

  async countRegulationCategories(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegulationCategories(schoolId, filters);
  }
}
