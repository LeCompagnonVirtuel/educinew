// Government & National Governance Service - ExamScheduling
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamScheduling, ExamSchedulingCreate } from '@educi/types';
import { GovExamSchedulingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamSchedulingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamScheduling(schoolId: string, id: string): Promise<ExamScheduling> {
    const item = await this.repo.findExamSchedulingById(schoolId, id);
    if (!item) throw new GovExamSchedulingNotFoundError(id);
    return item;
  }

  async listExamSchedulings(schoolId: string, filters?: Record<string, unknown>): Promise<ExamScheduling[]> {
    return this.repo.findAllExamSchedulings(schoolId, filters);
  }

  async createExamScheduling(schoolId: string, data: ExamSchedulingCreate): Promise<ExamScheduling> {
    return this.repo.createExamScheduling(schoolId, data);
  }

  async updateExamScheduling(schoolId: string, id: string, data: Partial<ExamSchedulingCreate>): Promise<ExamScheduling> {
    const existing = await this.repo.findExamSchedulingById(schoolId, id);
    if (!existing) throw new GovExamSchedulingNotFoundError(id);
    return this.repo.updateExamScheduling(schoolId, id, data);
  }

  async deleteExamScheduling(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamSchedulingById(schoolId, id);
    if (!existing) throw new GovExamSchedulingNotFoundError(id);
    return this.repo.deleteExamScheduling(schoolId, id);
  }

  async countExamSchedulings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamSchedulings(schoolId, filters);
  }
}
