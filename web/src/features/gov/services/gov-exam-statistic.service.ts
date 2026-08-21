// Government & National Governance Service - ExamStatistic (Singular Alias)
// Phase 2.9 - EduCI Platform
// Re-export wrapper providing singular method names expected by API routes

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamStatistics, ExamStatisticsCreate } from '@educi/types';
import { GovExamStatisticsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamStatisticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamStatistic(schoolId: string, id: string): Promise<ExamStatistics> {
    const item = await this.repo.findExamStatisticsById(schoolId, id);
    if (!item) throw new GovExamStatisticsNotFoundError(id);
    return item;
  }

  async listExamStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<ExamStatistics[]> {
    return this.repo.findAllExamStatistics(schoolId, filters);
  }

  async createExamStatistic(schoolId: string, data: ExamStatisticsCreate): Promise<ExamStatistics> {
    return this.repo.createExamStatistics(schoolId, data);
  }

  async updateExamStatistic(schoolId: string, id: string, data: Partial<ExamStatisticsCreate>): Promise<ExamStatistics> {
    const existing = await this.repo.findExamStatisticsById(schoolId, id);
    if (!existing) throw new GovExamStatisticsNotFoundError(id);
    return this.repo.updateExamStatistics(schoolId, id, data);
  }

  async deleteExamStatistic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamStatisticsById(schoolId, id);
    if (!existing) throw new GovExamStatisticsNotFoundError(id);
    return this.repo.deleteExamStatistics(schoolId, id);
  }

  async countExamStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamStatistics(schoolId, filters);
  }
}
