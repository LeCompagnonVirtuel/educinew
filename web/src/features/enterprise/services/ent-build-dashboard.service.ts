// Enterprise Platform Service - BuildDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BuildDashboard, BuildDashboardCreate } from '@educi/types';
import { EntBuildDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBuildDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBuildDashboard(schoolId: string, id: string): Promise<BuildDashboard> {
    const item = await this.repo.findBuildDashboardById(schoolId, id);
    if (!item) throw new EntBuildDashboardNotFoundError(id);
    return item;
  }
  async listBuildDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<BuildDashboard[]> {
    return this.repo.findAllBuildDashboards(schoolId, filters);
  }
  async createBuildDashboard(schoolId: string, data: BuildDashboardCreate): Promise<BuildDashboard> {
    return this.repo.createBuildDashboard(schoolId, data);
  }
  async updateBuildDashboard(schoolId: string, id: string, data: Partial<BuildDashboardCreate>): Promise<BuildDashboard> {
    const existing = await this.repo.findBuildDashboardById(schoolId, id);
    if (!existing) throw new EntBuildDashboardNotFoundError(id);
    return this.repo.updateBuildDashboard(schoolId, id, data);
  }
  async deleteBuildDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBuildDashboardById(schoolId, id);
    if (!existing) throw new EntBuildDashboardNotFoundError(id);
    return this.repo.deleteBuildDashboard(schoolId, id);
  }
  async countBuildDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBuildDashboards(schoolId, filters);
  }
}
