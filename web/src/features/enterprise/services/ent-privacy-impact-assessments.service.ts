// Enterprise Platform Service - PrivacyImpactAssessments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPrivacyImpactAssessmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPrivacyImpactAssessment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPrivacyImpactAssessmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPrivacyImpactAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPrivacyImpactAssessments(schoolId, filters);
  }
  async createPrivacyImpactAssessment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPrivacyImpactAssessment(schoolId, data);
  }
  async updatePrivacyImpactAssessment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPrivacyImpactAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePrivacyImpactAssessment(schoolId, id, data);
  }
  async deletePrivacyImpactAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPrivacyImpactAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePrivacyImpactAssessment(schoolId, id);
  }
  async countPrivacyImpactAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPrivacyImpactAssessments(schoolId, filters);
  }
}
