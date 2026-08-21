import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalExam, NationalExamCreate } from '@educi/types';
import { GovNationalExamNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsNationalExamService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NationalExam> {
    const item = await this.repo.findNationalExamById(schoolId, id);
    if (!item) throw new GovNationalExamNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NationalExam[]> {
    return this.repo.findAllNationalExams(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NationalExamCreate>): Promise<NationalExam> {
    return this.repo.createNationalExam(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NationalExamCreate>): Promise<NationalExam> {
    const existing = await this.repo.findNationalExamById(schoolId, id);
    if (!existing) throw new GovNationalExamNotFoundError(id);
    return this.repo.updateNationalExam(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalExamById(schoolId, id);
    if (!existing) throw new GovNationalExamNotFoundError(id);
    return this.repo.deleteNationalExam(schoolId, id);
  }
}
