// Government & National Governance Service - ExamFraudDetection
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamFraudDetection, ExamFraudDetectionCreate } from '@educi/types';
import { GovExamFraudDetectionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamFraudDetectionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamFraudDetection(schoolId: string, id: string): Promise<ExamFraudDetection> {
    const item = await this.repo.findExamFraudDetectionById(schoolId, id);
    if (!item) throw new GovExamFraudDetectionNotFoundError(id);
    return item;
  }

  async listExamFraudDetections(schoolId: string, filters?: Record<string, unknown>): Promise<ExamFraudDetection[]> {
    return this.repo.findAllExamFraudDetections(schoolId, filters);
  }

  async createExamFraudDetection(schoolId: string, data: ExamFraudDetectionCreate): Promise<ExamFraudDetection> {
    return this.repo.createExamFraudDetection(schoolId, data);
  }

  async updateExamFraudDetection(schoolId: string, id: string, data: Partial<ExamFraudDetectionCreate>): Promise<ExamFraudDetection> {
    const existing = await this.repo.findExamFraudDetectionById(schoolId, id);
    if (!existing) throw new GovExamFraudDetectionNotFoundError(id);
    return this.repo.updateExamFraudDetection(schoolId, id, data);
  }

  async deleteExamFraudDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamFraudDetectionById(schoolId, id);
    if (!existing) throw new GovExamFraudDetectionNotFoundError(id);
    return this.repo.deleteExamFraudDetection(schoolId, id);
  }

  async countExamFraudDetections(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamFraudDetections(schoolId, filters);
  }
}
