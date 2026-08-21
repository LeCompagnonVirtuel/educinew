import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamAppeal, ExamAppealCreate } from '@educi/types';
import { GovExamAppealNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamAppealService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamAppeal> {
    const item = await this.repo.findExamAppealById(schoolId, id);
    if (!item) throw new GovExamAppealNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamAppeal[]> {
    return this.repo.findAllExamAppeals(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamAppealCreate>): Promise<ExamAppeal> {
    return this.repo.createExamAppeal(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamAppealCreate>): Promise<ExamAppeal> {
    const existing = await this.repo.findExamAppealById(schoolId, id);
    if (!existing) throw new GovExamAppealNotFoundError(id);
    return this.repo.updateExamAppeal(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamAppealById(schoolId, id);
    if (!existing) throw new GovExamAppealNotFoundError(id);
    return this.repo.deleteExamAppeal(schoolId, id);
  }
}
