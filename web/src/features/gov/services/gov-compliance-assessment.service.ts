// Government & National Governance Service - ComplianceAssessment
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceAssessment, ComplianceAssessmentCreate } from '@educi/types';
import { GovComplianceAssessmentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceAssessmentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceAssessment(schoolId: string, id: string): Promise<ComplianceAssessment> {
    const item = await this.repo.findComplianceAssessmentById(schoolId, id);
    if (!item) throw new GovComplianceAssessmentNotFoundError(id);
    return item;
  }

  async listComplianceAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceAssessment[]> {
    return this.repo.findAllComplianceAssessments(schoolId, filters);
  }

  async createComplianceAssessment(schoolId: string, data: ComplianceAssessmentCreate): Promise<ComplianceAssessment> {
    return this.repo.createComplianceAssessment(schoolId, data);
  }

  async updateComplianceAssessment(schoolId: string, id: string, data: Partial<ComplianceAssessmentCreate>): Promise<ComplianceAssessment> {
    const existing = await this.repo.findComplianceAssessmentById(schoolId, id);
    if (!existing) throw new GovComplianceAssessmentNotFoundError(id);
    return this.repo.updateComplianceAssessment(schoolId, id, data);
  }

  async deleteComplianceAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceAssessmentById(schoolId, id);
    if (!existing) throw new GovComplianceAssessmentNotFoundError(id);
    return this.repo.deleteComplianceAssessment(schoolId, id);
  }

  async countComplianceAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceAssessments(schoolId, filters);
  }
}
