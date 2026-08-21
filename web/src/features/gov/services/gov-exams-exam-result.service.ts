import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamResult, ExamResultCreate } from '@educi/types';
import { GovExamResultNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamResultService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamResult> {
    const item = await this.repo.findExamResultById(schoolId, id);
    if (!item) throw new GovExamResultNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamResult[]> {
    return this.repo.findAllExamResults(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamResultCreate>): Promise<ExamResult> {
    return this.repo.createExamResult(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamResultCreate>): Promise<ExamResult> {
    const existing = await this.repo.findExamResultById(schoolId, id);
    if (!existing) throw new GovExamResultNotFoundError(id);
    return this.repo.updateExamResult(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamResultById(schoolId, id);
    if (!existing) throw new GovExamResultNotFoundError(id);
    return this.repo.deleteExamResult(schoolId, id);
  }
}
