// Government & National Governance Service - ExamGrading
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamGrading, ExamGradingCreate } from '@educi/types';
import { GovExamGradingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamGradingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamGrading(schoolId: string, id: string): Promise<ExamGrading> {
    const item = await this.repo.findExamGradingById(schoolId, id);
    if (!item) throw new GovExamGradingNotFoundError(id);
    return item;
  }

  async listExamGradings(schoolId: string, filters?: Record<string, unknown>): Promise<ExamGrading[]> {
    return this.repo.findAllExamGradings(schoolId, filters);
  }

  async createExamGrading(schoolId: string, data: ExamGradingCreate): Promise<ExamGrading> {
    return this.repo.createExamGrading(schoolId, data);
  }

  async updateExamGrading(schoolId: string, id: string, data: Partial<ExamGradingCreate>): Promise<ExamGrading> {
    const existing = await this.repo.findExamGradingById(schoolId, id);
    if (!existing) throw new GovExamGradingNotFoundError(id);
    return this.repo.updateExamGrading(schoolId, id, data);
  }

  async deleteExamGrading(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamGradingById(schoolId, id);
    if (!existing) throw new GovExamGradingNotFoundError(id);
    return this.repo.deleteExamGrading(schoolId, id);
  }

  async countExamGradings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamGradings(schoolId, filters);
  }
}
