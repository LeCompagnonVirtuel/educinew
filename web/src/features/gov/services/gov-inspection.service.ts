// Government & National Governance Service - Inspection (Alias for InspectionVisit)
// Phase 2.9 - EduCI Platform
// Re-export wrapper providing singular method names expected by API routes

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionVisit, InspectionVisitCreate } from '@educi/types';
import { GovInspectionVisitNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspection(schoolId: string, id: string): Promise<InspectionVisit> {
    const item = await this.repo.findInspectionVisitById(schoolId, id);
    if (!item) throw new GovInspectionVisitNotFoundError(id);
    return item;
  }

  async listInspections(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionVisit[]> {
    return this.repo.findAllInspectionVisits(schoolId, filters);
  }

  async createInspection(schoolId: string, data: InspectionVisitCreate): Promise<InspectionVisit> {
    return this.repo.createInspectionVisit(schoolId, data);
  }

  async updateInspection(schoolId: string, id: string, data: Partial<InspectionVisitCreate>): Promise<InspectionVisit> {
    const existing = await this.repo.findInspectionVisitById(schoolId, id);
    if (!existing) throw new GovInspectionVisitNotFoundError(id);
    return this.repo.updateInspectionVisit(schoolId, id, data);
  }

  async deleteInspection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionVisitById(schoolId, id);
    if (!existing) throw new GovInspectionVisitNotFoundError(id);
    return this.repo.deleteInspectionVisit(schoolId, id);
  }

  async countInspections(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionVisits(schoolId, filters);
  }
}
