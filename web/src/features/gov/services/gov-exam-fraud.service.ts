// Government & National Governance Service - ExamFraud
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamFraud, ExamFraudCreate } from '@educi/types';
import { GovExamFraudNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamFraudService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamFraud(schoolId: string, id: string): Promise<ExamFraud> {
    const item = await this.repo.findExamFraudById(schoolId, id);
    if (!item) throw new GovExamFraudNotFoundError(id);
    return item;
  }

  async listExamFrauds(schoolId: string, filters?: Record<string, unknown>): Promise<ExamFraud[]> {
    return this.repo.findAllExamFrauds(schoolId, filters);
  }

  async createExamFraud(schoolId: string, data: ExamFraudCreate): Promise<ExamFraud> {
    return this.repo.createExamFraud(schoolId, data);
  }

  async updateExamFraud(schoolId: string, id: string, data: Partial<ExamFraudCreate>): Promise<ExamFraud> {
    const existing = await this.repo.findExamFraudById(schoolId, id);
    if (!existing) throw new GovExamFraudNotFoundError(id);
    return this.repo.updateExamFraud(schoolId, id, data);
  }

  async deleteExamFraud(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamFraudById(schoolId, id);
    if (!existing) throw new GovExamFraudNotFoundError(id);
    return this.repo.deleteExamFraud(schoolId, id);
  }

  async countExamFrauds(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamFrauds(schoolId, filters);
  }
}
