// Government & National Governance Service - AnalyticsDashboardGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsDashboardGeneration, AnalyticsDashboardGenerationCreate } from '@educi/types';
import { GovAnalyticsDashboardGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsDashboardGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAnalyticsDashboardGeneration(schoolId: string, id: string): Promise<AnalyticsDashboardGeneration> {
    const item = await this.repo.findAnalyticsDashboardGenerationById(schoolId, id);
    if (!item) throw new GovAnalyticsDashboardGenerationNotFoundError(id);
    return item;
  }

  async listAnalyticsDashboardGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsDashboardGeneration[]> {
    return this.repo.findAllAnalyticsDashboardGenerations(schoolId, filters);
  }

  async createAnalyticsDashboardGeneration(schoolId: string, data: AnalyticsDashboardGenerationCreate): Promise<AnalyticsDashboardGeneration> {
    return this.repo.createAnalyticsDashboardGeneration(schoolId, data);
  }

  async updateAnalyticsDashboardGeneration(schoolId: string, id: string, data: Partial<AnalyticsDashboardGenerationCreate>): Promise<AnalyticsDashboardGeneration> {
    const existing = await this.repo.findAnalyticsDashboardGenerationById(schoolId, id);
    if (!existing) throw new GovAnalyticsDashboardGenerationNotFoundError(id);
    return this.repo.updateAnalyticsDashboardGeneration(schoolId, id, data);
  }

  async deleteAnalyticsDashboardGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsDashboardGenerationById(schoolId, id);
    if (!existing) throw new GovAnalyticsDashboardGenerationNotFoundError(id);
    return this.repo.deleteAnalyticsDashboardGeneration(schoolId, id);
  }

  async countAnalyticsDashboardGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsDashboardGenerations(schoolId, filters);
  }
}
