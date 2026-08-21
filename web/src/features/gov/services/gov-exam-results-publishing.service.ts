// Government & National Governance Service - ExamResultsPublishing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamResultsPublishing, ExamResultsPublishingCreate } from '@educi/types';
import { GovExamResultsPublishingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamResultsPublishingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamResultsPublishing(schoolId: string, id: string): Promise<ExamResultsPublishing> {
    const item = await this.repo.findExamResultsPublishingById(schoolId, id);
    if (!item) throw new GovExamResultsPublishingNotFoundError(id);
    return item;
  }

  async listExamResultsPublishings(schoolId: string, filters?: Record<string, unknown>): Promise<ExamResultsPublishing[]> {
    return this.repo.findAllExamResultsPublishings(schoolId, filters);
  }

  async createExamResultsPublishing(schoolId: string, data: ExamResultsPublishingCreate): Promise<ExamResultsPublishing> {
    return this.repo.createExamResultsPublishing(schoolId, data);
  }

  async updateExamResultsPublishing(schoolId: string, id: string, data: Partial<ExamResultsPublishingCreate>): Promise<ExamResultsPublishing> {
    const existing = await this.repo.findExamResultsPublishingById(schoolId, id);
    if (!existing) throw new GovExamResultsPublishingNotFoundError(id);
    return this.repo.updateExamResultsPublishing(schoolId, id, data);
  }

  async deleteExamResultsPublishing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamResultsPublishingById(schoolId, id);
    if (!existing) throw new GovExamResultsPublishingNotFoundError(id);
    return this.repo.deleteExamResultsPublishing(schoolId, id);
  }

  async countExamResultsPublishings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamResultsPublishings(schoolId, filters);
  }
}
