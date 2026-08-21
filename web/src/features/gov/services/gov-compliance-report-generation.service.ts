// Government & National Governance Service - ComplianceReportGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceReportGeneration, ComplianceReportGenerationCreate } from '@educi/types';
import { GovComplianceReportGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceReportGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceReportGeneration(schoolId: string, id: string): Promise<ComplianceReportGeneration> {
    const item = await this.repo.findComplianceReportGenerationById(schoolId, id);
    if (!item) throw new GovComplianceReportGenerationNotFoundError(id);
    return item;
  }

  async listComplianceReportGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceReportGeneration[]> {
    return this.repo.findAllComplianceReportGenerations(schoolId, filters);
  }

  async createComplianceReportGeneration(schoolId: string, data: ComplianceReportGenerationCreate): Promise<ComplianceReportGeneration> {
    return this.repo.createComplianceReportGeneration(schoolId, data);
  }

  async updateComplianceReportGeneration(schoolId: string, id: string, data: Partial<ComplianceReportGenerationCreate>): Promise<ComplianceReportGeneration> {
    const existing = await this.repo.findComplianceReportGenerationById(schoolId, id);
    if (!existing) throw new GovComplianceReportGenerationNotFoundError(id);
    return this.repo.updateComplianceReportGeneration(schoolId, id, data);
  }

  async deleteComplianceReportGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceReportGenerationById(schoolId, id);
    if (!existing) throw new GovComplianceReportGenerationNotFoundError(id);
    return this.repo.deleteComplianceReportGeneration(schoolId, id);
  }

  async countComplianceReportGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceReportGenerations(schoolId, filters);
  }
}
