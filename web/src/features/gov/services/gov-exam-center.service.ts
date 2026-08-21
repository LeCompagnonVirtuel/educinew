// Government & National Governance Service - ExamCenter
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamCenter, ExamCenterCreate } from '@educi/types';
import { GovExamCenterNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamCenterService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamCenter(schoolId: string, id: string): Promise<ExamCenter> {
    const item = await this.repo.findExamCenterById(schoolId, id);
    if (!item) throw new GovExamCenterNotFoundError(id);
    return item;
  }

  async listExamCenters(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCenter[]> {
    return this.repo.findAllExamCenters(schoolId, filters);
  }

  async createExamCenter(schoolId: string, data: ExamCenterCreate): Promise<ExamCenter> {
    return this.repo.createExamCenter(schoolId, data);
  }

  async updateExamCenter(schoolId: string, id: string, data: Partial<ExamCenterCreate>): Promise<ExamCenter> {
    const existing = await this.repo.findExamCenterById(schoolId, id);
    if (!existing) throw new GovExamCenterNotFoundError(id);
    return this.repo.updateExamCenter(schoolId, id, data);
  }

  async deleteExamCenter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamCenterById(schoolId, id);
    if (!existing) throw new GovExamCenterNotFoundError(id);
    return this.repo.deleteExamCenter(schoolId, id);
  }

  async countExamCenters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamCenters(schoolId, filters);
  }
}
