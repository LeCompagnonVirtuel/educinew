// Government & National Governance Service - InspectionReportGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionReportGeneration, InspectionReportGenerationCreate } from '@educi/types';
import { GovInspectionReportGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionReportGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionReportGeneration(schoolId: string, id: string): Promise<InspectionReportGeneration> {
    const item = await this.repo.findInspectionReportGenerationById(schoolId, id);
    if (!item) throw new GovInspectionReportGenerationNotFoundError(id);
    return item;
  }

  async listInspectionReportGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionReportGeneration[]> {
    return this.repo.findAllInspectionReportGenerations(schoolId, filters);
  }

  async createInspectionReportGeneration(schoolId: string, data: InspectionReportGenerationCreate): Promise<InspectionReportGeneration> {
    return this.repo.createInspectionReportGeneration(schoolId, data);
  }

  async updateInspectionReportGeneration(schoolId: string, id: string, data: Partial<InspectionReportGenerationCreate>): Promise<InspectionReportGeneration> {
    const existing = await this.repo.findInspectionReportGenerationById(schoolId, id);
    if (!existing) throw new GovInspectionReportGenerationNotFoundError(id);
    return this.repo.updateInspectionReportGeneration(schoolId, id, data);
  }

  async deleteInspectionReportGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionReportGenerationById(schoolId, id);
    if (!existing) throw new GovInspectionReportGenerationNotFoundError(id);
    return this.repo.deleteInspectionReportGeneration(schoolId, id);
  }

  async countInspectionReportGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionReportGenerations(schoolId, filters);
  }
}
