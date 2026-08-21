import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamSupervisor, ExamSupervisorCreate } from '@educi/types';
import { GovExamSupervisorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsExamSupervisorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ExamSupervisor> {
    const item = await this.repo.findExamSupervisorById(schoolId, id);
    if (!item) throw new GovExamSupervisorNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSupervisor[]> {
    return this.repo.findAllExamSupervisors(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor> {
    return this.repo.createExamSupervisor(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor> {
    const existing = await this.repo.findExamSupervisorById(schoolId, id);
    if (!existing) throw new GovExamSupervisorNotFoundError(id);
    return this.repo.updateExamSupervisor(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamSupervisorById(schoolId, id);
    if (!existing) throw new GovExamSupervisorNotFoundError(id);
    return this.repo.deleteExamSupervisor(schoolId, id);
  }
}
