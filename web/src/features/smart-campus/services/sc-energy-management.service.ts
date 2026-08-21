import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnergyMonitor, EnergyMonitorCreate } from '@educi/types';
import { ScEnergyMonitorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEnergyManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMonitor(schoolId: string, id: string): Promise<EnergyMonitor> {
    const monitor = await this.repo.findEnergyMonitorById(schoolId, id);
    if (!monitor) throw new ScEnergyMonitorNotFoundError(id);
    return monitor;
  }

  async listMonitors(schoolId: string): Promise<EnergyMonitor[]> {
    return this.repo.findAllEnergyMonitors(schoolId);
  }

  async createMonitor(schoolId: string, data: EnergyMonitorCreate): Promise<EnergyMonitor> {
    return this.repo.createEnergyMonitor(schoolId, data);
  }

  async getTotalConsumption(schoolId: string, buildingId: string, start: string, end: string): Promise<number> {
    return this.repo.getTotalEnergyConsumption(schoolId, buildingId, start, end);
  }

  async getPeakUsage(schoolId: string, buildingId: string, start: string, end: string): Promise<number> {
    return this.repo.getPeakEnergyUsage(schoolId, buildingId, start, end);
  }

  async getOverconsumption(schoolId: string, threshold: number): Promise<EnergyMonitor[]> {
    return this.repo.findOverconsumptionMonitors(schoolId, threshold);
  }

  async getConsumptionTrend(schoolId: string, location: string, days: number): Promise<Record<string, number>[]> {
    return this.repo.getEnergyConsumptionTrend(schoolId, location, days);
  }

  async deleteMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnergyMonitorById(schoolId, id);
    if (!existing) throw new ScEnergyMonitorNotFoundError(id);
    return this.repo.deleteEnergyMonitor(schoolId, id);
  }
}
