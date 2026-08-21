// Government & National Governance Service - ExamSupervisor
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamSupervisor, ExamSupervisorCreate } from '@educi/types';
import { GovExamSupervisorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamSupervisorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamSupervisor(schoolId: string, id: string): Promise<ExamSupervisor> {
    const item = await this.repo.findExamSupervisorById(schoolId, id);
    if (!item) throw new GovExamSupervisorNotFoundError(id);
    return item;
  }

  async listExamSupervisors(schoolId: string, filters?: Record<string, unknown>): Promise<ExamSupervisor[]> {
    return this.repo.findAllExamSupervisors(schoolId, filters);
  }

  async createExamSupervisor(schoolId: string, data: ExamSupervisorCreate): Promise<ExamSupervisor> {
    return this.repo.createExamSupervisor(schoolId, data);
  }

  async updateExamSupervisor(schoolId: string, id: string, data: Partial<ExamSupervisorCreate>): Promise<ExamSupervisor> {
    const existing = await this.repo.findExamSupervisorById(schoolId, id);
    if (!existing) throw new GovExamSupervisorNotFoundError(id);
    return this.repo.updateExamSupervisor(schoolId, id, data);
  }

  async deleteExamSupervisor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamSupervisorById(schoolId, id);
    if (!existing) throw new GovExamSupervisorNotFoundError(id);
    return this.repo.deleteExamSupervisor(schoolId, id);
  }

  async countExamSupervisors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamSupervisors(schoolId, filters);
  }
}
