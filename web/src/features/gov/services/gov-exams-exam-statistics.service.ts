import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamStatistics, ExamStatisticsCreate } from '@educi/types';
import { GovExamStatisticsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamStatisticsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamStatistics> {
    const item = await this.repo.findExamStatisticsById(schoolId, id);
    if (!item) throw new GovExamStatisticsNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamStatistics[]> {
    return this.repo.findAllExamStatistics(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamStatisticsCreate>): Promise<ExamStatistics> {
    return this.repo.createExamStatistics(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamStatisticsCreate>): Promise<ExamStatistics> {
    const existing = await this.repo.findExamStatisticsById(schoolId, id);
    if (!existing) throw new GovExamStatisticsNotFoundError(id);
    return this.repo.updateExamStatistics(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamStatisticsById(schoolId, id);
    if (!existing) throw new GovExamStatisticsNotFoundError(id);
    return this.repo.deleteExamStatistics(schoolId, id);
  }
}
