// Government & National Governance Service - MinistryDashboard
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryDashboard, MinistryDashboardCreate } from '@educi/types';
import { GovMinistryDashboardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryDashboardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getMinistryDashboard(schoolId: string, id: string): Promise<MinistryDashboard> {
    const item = await this.repo.findMinistryDashboardById(schoolId, id);
    if (!item) throw new GovMinistryDashboardNotFoundError(id);
    return item;
  }

  async listMinistryDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryDashboard[]> {
    return this.repo.findAllMinistryDashboards(schoolId, filters);
  }

  async createMinistryDashboard(schoolId: string, data: MinistryDashboardCreate): Promise<MinistryDashboard> {
    return this.repo.createMinistryDashboard(schoolId, data);
  }

  async updateMinistryDashboard(schoolId: string, id: string, data: Partial<MinistryDashboardCreate>): Promise<MinistryDashboard> {
    const existing = await this.repo.findMinistryDashboardById(schoolId, id);
    if (!existing) throw new GovMinistryDashboardNotFoundError(id);
    return this.repo.updateMinistryDashboard(schoolId, id, data);
  }

  async deleteMinistryDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryDashboardById(schoolId, id);
    if (!existing) throw new GovMinistryDashboardNotFoundError(id);
    return this.repo.deleteMinistryDashboard(schoolId, id);
  }

  async countMinistryDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMinistryDashboards(schoolId, filters);
  }
}
