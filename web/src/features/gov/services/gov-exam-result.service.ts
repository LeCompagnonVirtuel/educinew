// Government & National Governance Service - ExamResult
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamResult, ExamResultCreate } from '@educi/types';
import { GovExamResultNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamResultService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamResult(schoolId: string, id: string): Promise<ExamResult> {
    const item = await this.repo.findExamResultById(schoolId, id);
    if (!item) throw new GovExamResultNotFoundError(id);
    return item;
  }

  async listExamResults(schoolId: string, filters?: Record<string, unknown>): Promise<ExamResult[]> {
    return this.repo.findAllExamResults(schoolId, filters);
  }

  async createExamResult(schoolId: string, data: ExamResultCreate): Promise<ExamResult> {
    return this.repo.createExamResult(schoolId, data);
  }

  async updateExamResult(schoolId: string, id: string, data: Partial<ExamResultCreate>): Promise<ExamResult> {
    const existing = await this.repo.findExamResultById(schoolId, id);
    if (!existing) throw new GovExamResultNotFoundError(id);
    return this.repo.updateExamResult(schoolId, id, data);
  }

  async deleteExamResult(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamResultById(schoolId, id);
    if (!existing) throw new GovExamResultNotFoundError(id);
    return this.repo.deleteExamResult(schoolId, id);
  }

  async countExamResults(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamResults(schoolId, filters);
  }
}
