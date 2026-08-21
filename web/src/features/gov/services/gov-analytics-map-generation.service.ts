// Government & National Governance Service - AnalyticsMapGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsMapGeneration, AnalyticsMapGenerationCreate } from '@educi/types';
import { GovAnalyticsMapGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsMapGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAnalyticsMapGeneration(schoolId: string, id: string): Promise<AnalyticsMapGeneration> {
    const item = await this.repo.findAnalyticsMapGenerationById(schoolId, id);
    if (!item) throw new GovAnalyticsMapGenerationNotFoundError(id);
    return item;
  }

  async listAnalyticsMapGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsMapGeneration[]> {
    return this.repo.findAllAnalyticsMapGenerations(schoolId, filters);
  }

  async createAnalyticsMapGeneration(schoolId: string, data: AnalyticsMapGenerationCreate): Promise<AnalyticsMapGeneration> {
    return this.repo.createAnalyticsMapGeneration(schoolId, data);
  }

  async updateAnalyticsMapGeneration(schoolId: string, id: string, data: Partial<AnalyticsMapGenerationCreate>): Promise<AnalyticsMapGeneration> {
    const existing = await this.repo.findAnalyticsMapGenerationById(schoolId, id);
    if (!existing) throw new GovAnalyticsMapGenerationNotFoundError(id);
    return this.repo.updateAnalyticsMapGeneration(schoolId, id, data);
  }

  async deleteAnalyticsMapGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsMapGenerationById(schoolId, id);
    if (!existing) throw new GovAnalyticsMapGenerationNotFoundError(id);
    return this.repo.deleteAnalyticsMapGeneration(schoolId, id);
  }

  async countAnalyticsMapGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsMapGenerations(schoolId, filters);
  }
}
