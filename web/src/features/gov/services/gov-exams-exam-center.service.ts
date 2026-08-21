import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamCenter, ExamCenterCreate } from '@educi/types';
import { GovExamCenterNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamCenterService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamCenter> {
    const item = await this.repo.findExamCenterById(schoolId, id);
    if (!item) throw new GovExamCenterNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCenter[]> {
    return this.repo.findAllExamCenters(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamCenterCreate>): Promise<ExamCenter> {
    return this.repo.createExamCenter(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamCenterCreate>): Promise<ExamCenter> {
    const existing = await this.repo.findExamCenterById(schoolId, id);
    if (!existing) throw new GovExamCenterNotFoundError(id);
    return this.repo.updateExamCenter(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamCenterById(schoolId, id);
    if (!existing) throw new GovExamCenterNotFoundError(id);
    return this.repo.deleteExamCenter(schoolId, id);
  }
}
