// Enterprise Platform Service - ComplianceAssessments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntComplianceAssessmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getComplianceAssessment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findComplianceAssessmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listComplianceAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllComplianceAssessments(schoolId, filters);
  }
  async createComplianceAssessment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createComplianceAssessment(schoolId, data);
  }
  async updateComplianceAssessment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findComplianceAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateComplianceAssessment(schoolId, id, data);
  }
  async deleteComplianceAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceAssessmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteComplianceAssessment(schoolId, id);
  }
  async countComplianceAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceAssessments(schoolId, filters);
  }
}
