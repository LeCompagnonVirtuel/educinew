// Government & National Governance Service - RegionDashboard
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionDashboard, RegionDashboardCreate } from '@educi/types';
import { GovRegionDashboardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionDashboardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionDashboard(schoolId: string, id: string): Promise<RegionDashboard> {
    const item = await this.repo.findRegionDashboardById(schoolId, id);
    if (!item) throw new GovRegionDashboardNotFoundError(id);
    return item;
  }

  async listRegionDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<RegionDashboard[]> {
    return this.repo.findAllRegionDashboards(schoolId, filters);
  }

  async createRegionDashboard(schoolId: string, data: RegionDashboardCreate): Promise<RegionDashboard> {
    return this.repo.createRegionDashboard(schoolId, data);
  }

  async updateRegionDashboard(schoolId: string, id: string, data: Partial<RegionDashboardCreate>): Promise<RegionDashboard> {
    const existing = await this.repo.findRegionDashboardById(schoolId, id);
    if (!existing) throw new GovRegionDashboardNotFoundError(id);
    return this.repo.updateRegionDashboard(schoolId, id, data);
  }

  async deleteRegionDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionDashboardById(schoolId, id);
    if (!existing) throw new GovRegionDashboardNotFoundError(id);
    return this.repo.deleteRegionDashboard(schoolId, id);
  }

  async countRegionDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionDashboards(schoolId, filters);
  }
}
