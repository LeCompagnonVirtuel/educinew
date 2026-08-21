// Government & National Governance Service - AnalyticsReportGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsReportGeneration, AnalyticsReportGenerationCreate } from '@educi/types';
import { GovAnalyticsReportGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsReportGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAnalyticsReportGeneration(schoolId: string, id: string): Promise<AnalyticsReportGeneration> {
    const item = await this.repo.findAnalyticsReportGenerationById(schoolId, id);
    if (!item) throw new GovAnalyticsReportGenerationNotFoundError(id);
    return item;
  }

  async listAnalyticsReportGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReportGeneration[]> {
    return this.repo.findAllAnalyticsReportGenerations(schoolId, filters);
  }

  async createAnalyticsReportGeneration(schoolId: string, data: AnalyticsReportGenerationCreate): Promise<AnalyticsReportGeneration> {
    return this.repo.createAnalyticsReportGeneration(schoolId, data);
  }

  async updateAnalyticsReportGeneration(schoolId: string, id: string, data: Partial<AnalyticsReportGenerationCreate>): Promise<AnalyticsReportGeneration> {
    const existing = await this.repo.findAnalyticsReportGenerationById(schoolId, id);
    if (!existing) throw new GovAnalyticsReportGenerationNotFoundError(id);
    return this.repo.updateAnalyticsReportGeneration(schoolId, id, data);
  }

  async deleteAnalyticsReportGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsReportGenerationById(schoolId, id);
    if (!existing) throw new GovAnalyticsReportGenerationNotFoundError(id);
    return this.repo.deleteAnalyticsReportGeneration(schoolId, id);
  }

  async countAnalyticsReportGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsReportGenerations(schoolId, filters);
  }
}
