import type { SupabaseClient } from '@supabase/supabase-js';
import type { MonitorDashboard } from '@educi/types';
import { EduCloudMonitorDashboardError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMonitorDashboard {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMonitorDashboard(schoolId: string, id: string): Promise<MonitorDashboard> {
    const item = await this.repo.getMonitorDashboard(schoolId, id);
    if (!item) throw new EduCloudMonitorDashboardError(id);
    return item;
  }
  async listMonitorDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MonitorDashboard[]> {
    return this.repo.listMonitorDashboard(schoolId, filters);
  }
  async createMonitorDashboard(schoolId: string, data: Partial<MonitorDashboard>): Promise<MonitorDashboard> {
    return this.repo.createMonitorDashboard(schoolId, data as any);
  }
  async updateMonitorDashboard(schoolId: string, id: string, data: Partial<MonitorDashboard>): Promise<MonitorDashboard> {
    const existing = await this.repo.getMonitorDashboard(schoolId, id);
    if (!existing) throw new EduCloudMonitorDashboardError(id);
    return this.repo.updateMonitorDashboard(schoolId, id, data as any);
  }
  async deleteMonitorDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMonitorDashboard(schoolId, id);
    if (!existing) throw new EduCloudMonitorDashboardError(id);
    return this.repo.deleteMonitorDashboard(schoolId, id);
  }
}
