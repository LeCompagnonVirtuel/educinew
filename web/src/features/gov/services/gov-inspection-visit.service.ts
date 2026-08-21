// Government & National Governance Service - InspectionVisit
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionVisit, InspectionVisitCreate } from '@educi/types';
import { GovInspectionVisitNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionVisitService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionVisit(schoolId: string, id: string): Promise<InspectionVisit> {
    const item = await this.repo.findInspectionVisitById(schoolId, id);
    if (!item) throw new GovInspectionVisitNotFoundError(id);
    return item;
  }

  async listInspectionVisits(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionVisit[]> {
    return this.repo.findAllInspectionVisits(schoolId, filters);
  }

  async createInspectionVisit(schoolId: string, data: InspectionVisitCreate): Promise<InspectionVisit> {
    return this.repo.createInspectionVisit(schoolId, data);
  }

  async updateInspectionVisit(schoolId: string, id: string, data: Partial<InspectionVisitCreate>): Promise<InspectionVisit> {
    const existing = await this.repo.findInspectionVisitById(schoolId, id);
    if (!existing) throw new GovInspectionVisitNotFoundError(id);
    return this.repo.updateInspectionVisit(schoolId, id, data);
  }

  async deleteInspectionVisit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionVisitById(schoolId, id);
    if (!existing) throw new GovInspectionVisitNotFoundError(id);
    return this.repo.deleteInspectionVisit(schoolId, id);
  }

  async countInspectionVisits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionVisits(schoolId, filters);
  }
}
