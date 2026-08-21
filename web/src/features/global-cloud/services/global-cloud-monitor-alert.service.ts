import type { SupabaseClient } from '@supabase/supabase-js';
import type { MonitorAlert } from '@educi/types';
import { EduCloudMonitorAlertError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMonitorAlert {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMonitorAlert(schoolId: string, id: string): Promise<MonitorAlert> {
    const item = await this.repo.getMonitorAlert(schoolId, id);
    if (!item) throw new EduCloudMonitorAlertError(id);
    return item;
  }
  async listMonitorAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<MonitorAlert[]> {
    return this.repo.listMonitorAlert(schoolId, filters);
  }
  async createMonitorAlert(schoolId: string, data: Partial<MonitorAlert>): Promise<MonitorAlert> {
    return this.repo.createMonitorAlert(schoolId, data as any);
  }
  async updateMonitorAlert(schoolId: string, id: string, data: Partial<MonitorAlert>): Promise<MonitorAlert> {
    const existing = await this.repo.getMonitorAlert(schoolId, id);
    if (!existing) throw new EduCloudMonitorAlertError(id);
    return this.repo.updateMonitorAlert(schoolId, id, data as any);
  }
  async deleteMonitorAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMonitorAlert(schoolId, id);
    if (!existing) throw new EduCloudMonitorAlertError(id);
    return this.repo.deleteMonitorAlert(schoolId, id);
  }
}
