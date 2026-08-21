// Enterprise Platform Service - ComplianceAssessmentsFindings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAssessmentFindingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getComplianceAssessmentsFinding(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findComplianceAssessmentsFindingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listComplianceAssessmentsFindings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllComplianceAssessmentsFindings(schoolId, filters);
  }
  async createComplianceAssessmentsFinding(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createComplianceAssessmentsFinding(schoolId, data);
  }
  async updateComplianceAssessmentsFinding(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findComplianceAssessmentsFindingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateComplianceAssessmentsFinding(schoolId, id, data);
  }
  async deleteComplianceAssessmentsFinding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceAssessmentsFindingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteComplianceAssessmentsFinding(schoolId, id);
  }
  async countComplianceAssessmentsFindings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceAssessmentsFindings(schoolId, filters);
  }
}
