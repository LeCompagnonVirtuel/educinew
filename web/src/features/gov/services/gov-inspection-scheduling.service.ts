// Government & National Governance Service - InspectionScheduling
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionScheduling, InspectionSchedulingCreate } from '@educi/types';
import { GovInspectionSchedulingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionSchedulingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionScheduling(schoolId: string, id: string): Promise<InspectionScheduling> {
    const item = await this.repo.findInspectionSchedulingById(schoolId, id);
    if (!item) throw new GovInspectionSchedulingNotFoundError(id);
    return item;
  }

  async listInspectionSchedulings(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionScheduling[]> {
    return this.repo.findAllInspectionSchedulings(schoolId, filters);
  }

  async createInspectionScheduling(schoolId: string, data: InspectionSchedulingCreate): Promise<InspectionScheduling> {
    return this.repo.createInspectionScheduling(schoolId, data);
  }

  async updateInspectionScheduling(schoolId: string, id: string, data: Partial<InspectionSchedulingCreate>): Promise<InspectionScheduling> {
    const existing = await this.repo.findInspectionSchedulingById(schoolId, id);
    if (!existing) throw new GovInspectionSchedulingNotFoundError(id);
    return this.repo.updateInspectionScheduling(schoolId, id, data);
  }

  async deleteInspectionScheduling(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionSchedulingById(schoolId, id);
    if (!existing) throw new GovInspectionSchedulingNotFoundError(id);
    return this.repo.deleteInspectionScheduling(schoolId, id);
  }

  async countInspectionSchedulings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionSchedulings(schoolId, filters);
  }
}
