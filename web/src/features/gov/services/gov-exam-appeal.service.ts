// Government & National Governance Service - ExamAppeal
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamAppeal, ExamAppealCreate } from '@educi/types';
import { GovExamAppealNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamAppealService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamAppeal(schoolId: string, id: string): Promise<ExamAppeal> {
    const item = await this.repo.findExamAppealById(schoolId, id);
    if (!item) throw new GovExamAppealNotFoundError(id);
    return item;
  }

  async listExamAppeals(schoolId: string, filters?: Record<string, unknown>): Promise<ExamAppeal[]> {
    return this.repo.findAllExamAppeals(schoolId, filters);
  }

  async createExamAppeal(schoolId: string, data: ExamAppealCreate): Promise<ExamAppeal> {
    return this.repo.createExamAppeal(schoolId, data);
  }

  async updateExamAppeal(schoolId: string, id: string, data: Partial<ExamAppealCreate>): Promise<ExamAppeal> {
    const existing = await this.repo.findExamAppealById(schoolId, id);
    if (!existing) throw new GovExamAppealNotFoundError(id);
    return this.repo.updateExamAppeal(schoolId, id, data);
  }

  async deleteExamAppeal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamAppealById(schoolId, id);
    if (!existing) throw new GovExamAppealNotFoundError(id);
    return this.repo.deleteExamAppeal(schoolId, id);
  }

  async countExamAppeals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamAppeals(schoolId, filters);
  }
}
