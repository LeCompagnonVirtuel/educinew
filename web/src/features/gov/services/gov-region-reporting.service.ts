// Government & National Governance Service - RegionReporting
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionReporting, RegionReportingCreate } from '@educi/types';
import { GovRegionReportingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionReportingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionReporting(schoolId: string, id: string): Promise<RegionReporting> {
    const item = await this.repo.findRegionReportingById(schoolId, id);
    if (!item) throw new GovRegionReportingNotFoundError(id);
    return item;
  }

  async listRegionReportings(schoolId: string, filters?: Record<string, unknown>): Promise<RegionReporting[]> {
    return this.repo.findAllRegionReportings(schoolId, filters);
  }

  async createRegionReporting(schoolId: string, data: RegionReportingCreate): Promise<RegionReporting> {
    return this.repo.createRegionReporting(schoolId, data);
  }

  async updateRegionReporting(schoolId: string, id: string, data: Partial<RegionReportingCreate>): Promise<RegionReporting> {
    const existing = await this.repo.findRegionReportingById(schoolId, id);
    if (!existing) throw new GovRegionReportingNotFoundError(id);
    return this.repo.updateRegionReporting(schoolId, id, data);
  }

  async deleteRegionReporting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionReportingById(schoolId, id);
    if (!existing) throw new GovRegionReportingNotFoundError(id);
    return this.repo.deleteRegionReporting(schoolId, id);
  }

  async countRegionReportings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionReportings(schoolId, filters);
  }
}
