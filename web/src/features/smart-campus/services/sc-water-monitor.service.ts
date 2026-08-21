import type { SupabaseClient } from '@supabase/supabase-js';
import type { WaterMonitor, WaterMonitorCreate } from '@educi/types';
import { ScWaterMonitorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScWaterMonitorService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMonitor(schoolId: string, id: string): Promise<WaterMonitor> {
    const monitor = await this.repo.findWaterMonitorById(schoolId, id);
    if (!monitor) throw new ScWaterMonitorNotFoundError(id);
    return monitor;
  }

  async listMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<WaterMonitor[]> {
    return this.repo.findAllWaterMonitors(schoolId, filters);
  }

  async createMonitor(schoolId: string, data: WaterMonitorCreate): Promise<WaterMonitor> {
    return this.repo.createWaterMonitor(schoolId, data);
  }

  async updateMonitor(schoolId: string, id: string, data: Partial<WaterMonitorCreate>): Promise<WaterMonitor> {
    const existing = await this.repo.findWaterMonitorById(schoolId, id);
    if (!existing) throw new ScWaterMonitorNotFoundError(id);
    return this.repo.updateWaterMonitor(schoolId, id, data);
  }

  async deleteMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWaterMonitorById(schoolId, id);
    if (!existing) throw new ScWaterMonitorNotFoundError(id);
    return this.repo.deleteWaterMonitor(schoolId, id);
  }

  async countMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWaterMonitors(schoolId, filters);
  }
}
