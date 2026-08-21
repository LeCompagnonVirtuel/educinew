import type { SupabaseClient } from '@supabase/supabase-js';
import type { WaterMonitor, WaterMonitorCreate } from '@educi/types';
import { ScWaterMonitorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScWaterManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMonitor(schoolId: string, id: string): Promise<WaterMonitor> {
    const monitor = await this.repo.findWaterMonitorById(schoolId, id);
    if (!monitor) throw new ScWaterMonitorNotFoundError(id);
    return monitor;
  }

  async listMonitors(schoolId: string): Promise<WaterMonitor[]> {
    return this.repo.findAllWaterMonitors(schoolId);
  }

  async createMonitor(schoolId: string, data: WaterMonitorCreate): Promise<WaterMonitor> {
    return this.repo.createWaterMonitor(schoolId, data);
  }

  async getTotalUsage(schoolId: string, buildingId: string, start: string, end: string): Promise<number> {
    return this.repo.getTotalWaterUsage(schoolId, buildingId, start, end);
  }

  async getLeakageMonitors(schoolId: string): Promise<WaterMonitor[]> {
    return this.repo.findLeakageWaterMonitors(schoolId);
  }

  async getHighUsage(schoolId: string, thresholdLiters: number): Promise<WaterMonitor[]> {
    return this.repo.findHighUsageWaterMonitors(schoolId, thresholdLiters);
  }

  async getUsageTrend(schoolId: string, location: string, days: number): Promise<Record<string, number>[]> {
    return this.repo.getWaterUsageTrend(schoolId, location, days);
  }

  async deleteMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWaterMonitorById(schoolId, id);
    if (!existing) throw new ScWaterMonitorNotFoundError(id);
    return this.repo.deleteWaterMonitor(schoolId, id);
  }
}
