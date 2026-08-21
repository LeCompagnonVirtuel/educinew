import type { SupabaseClient } from '@supabase/supabase-js';
import type { SolarProduction, SolarProductionCreate } from '@educi/types';
import { ScSolarProductionNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSolarManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getProduction(schoolId: string, id: string): Promise<SolarProduction> {
    const production = await this.repo.findSolarProductionById(schoolId, id);
    if (!production) throw new ScSolarProductionNotFoundError(id);
    return production;
  }

  async listProductions(schoolId: string): Promise<SolarProduction[]> {
    return this.repo.findAllSolarProductions(schoolId);
  }

  async createProduction(schoolId: string, data: SolarProductionCreate): Promise<SolarProduction> {
    return this.repo.createSolarProduction(schoolId, data);
  }

  async getTotalProduction(schoolId: string, start: string, end: string): Promise<number> {
    return this.repo.getTotalSolarProduction(schoolId, start, end);
  }

  async getDailyAverage(schoolId: string, days: number): Promise<number> {
    return this.repo.getSolarDailyAverage(schoolId, days);
  }

  async getEfficiencyRating(schoolId: string, panelId: string): Promise<number> {
    return this.repo.getSolarEfficiencyRating(schoolId, panelId);
  }

  async getPeakProduction(schoolId: string, start: string, end: string): Promise<SolarProduction> {
    return this.repo.getPeakSolarProduction(schoolId, start, end);
  }

  async deleteProduction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSolarProductionById(schoolId, id);
    if (!existing) throw new ScSolarProductionNotFoundError(id);
    return this.repo.deleteSolarProduction(schoolId, id);
  }
}
