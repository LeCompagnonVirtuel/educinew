import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryDashboard } from '@educi/types';
import { EduCloudMinistryDashboardError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMinistryDashboard {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMinistryDashboard(schoolId: string, id: string): Promise<MinistryDashboard> {
    const item = await this.repo.getMinistryDashboard(schoolId, id);
    if (!item) throw new EduCloudMinistryDashboardError(id);
    return item;
  }
  async listMinistryDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryDashboard[]> {
    return this.repo.listMinistryDashboard(schoolId, filters);
  }
  async createMinistryDashboard(schoolId: string, data: Partial<MinistryDashboard>): Promise<MinistryDashboard> {
    return this.repo.createMinistryDashboard(schoolId, data as any);
  }
  async updateMinistryDashboard(schoolId: string, id: string, data: Partial<MinistryDashboard>): Promise<MinistryDashboard> {
    const existing = await this.repo.getMinistryDashboard(schoolId, id);
    if (!existing) throw new EduCloudMinistryDashboardError(id);
    return this.repo.updateMinistryDashboard(schoolId, id, data as any);
  }
  async deleteMinistryDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMinistryDashboard(schoolId, id);
    if (!existing) throw new EduCloudMinistryDashboardError(id);
    return this.repo.deleteMinistryDashboard(schoolId, id);
  }
}
