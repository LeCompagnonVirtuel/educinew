import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudMonitor } from '@educi/types';
import { EduCloudCloudMonitorError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudMonitor {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudMonitor(schoolId: string, id: string): Promise<CloudMonitor> {
    const item = await this.repo.getCloudMonitor(schoolId, id);
    if (!item) throw new EduCloudCloudMonitorError(id);
    return item;
  }
  async listCloudMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<CloudMonitor[]> {
    return this.repo.listCloudMonitor(schoolId, filters);
  }
  async createCloudMonitor(schoolId: string, data: Partial<CloudMonitor>): Promise<CloudMonitor> {
    return this.repo.createCloudMonitor(schoolId, data as any);
  }
  async updateCloudMonitor(schoolId: string, id: string, data: Partial<CloudMonitor>): Promise<CloudMonitor> {
    const existing = await this.repo.getCloudMonitor(schoolId, id);
    if (!existing) throw new EduCloudCloudMonitorError(id);
    return this.repo.updateCloudMonitor(schoolId, id, data as any);
  }
  async deleteCloudMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudMonitor(schoolId, id);
    if (!existing) throw new EduCloudCloudMonitorError(id);
    return this.repo.deleteCloudMonitor(schoolId, id);
  }
}
