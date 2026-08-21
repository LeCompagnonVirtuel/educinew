import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnergyMonitor, EnergyMonitorCreate } from '@educi/types';
import { ScEnergyMonitorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEnergyMonitorService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMonitor(schoolId: string, id: string): Promise<EnergyMonitor> {
    const monitor = await this.repo.findEnergyMonitorById(schoolId, id);
    if (!monitor) throw new ScEnergyMonitorNotFoundError(id);
    return monitor;
  }

  async listMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<EnergyMonitor[]> {
    return this.repo.findAllEnergyMonitors(schoolId, filters);
  }

  async createMonitor(schoolId: string, data: EnergyMonitorCreate): Promise<EnergyMonitor> {
    return this.repo.createEnergyMonitor(schoolId, data);
  }

  async updateMonitor(schoolId: string, id: string, data: Partial<EnergyMonitorCreate>): Promise<EnergyMonitor> {
    const existing = await this.repo.findEnergyMonitorById(schoolId, id);
    if (!existing) throw new ScEnergyMonitorNotFoundError(id);
    return this.repo.updateEnergyMonitor(schoolId, id, data);
  }

  async deleteMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnergyMonitorById(schoolId, id);
    if (!existing) throw new ScEnergyMonitorNotFoundError(id);
    return this.repo.deleteEnergyMonitor(schoolId, id);
  }

  async countMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnergyMonitors(schoolId, filters);
  }
}
