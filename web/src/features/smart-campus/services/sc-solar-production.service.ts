import type { SupabaseClient } from '@supabase/supabase-js';
import type { SolarProduction, SolarProductionCreate } from '@educi/types';
import { ScSolarProductionNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSolarProductionService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getProduction(schoolId: string, id: string): Promise<SolarProduction> {
    const production = await this.repo.findSolarProductionById(schoolId, id);
    if (!production) throw new ScSolarProductionNotFoundError(id);
    return production;
  }

  async listProductions(schoolId: string, filters?: Record<string, unknown>): Promise<SolarProduction[]> {
    return this.repo.findAllSolarProductions(schoolId, filters);
  }

  async createProduction(schoolId: string, data: SolarProductionCreate): Promise<SolarProduction> {
    return this.repo.createSolarProduction(schoolId, data);
  }

  async updateProduction(schoolId: string, id: string, data: Partial<SolarProductionCreate>): Promise<SolarProduction> {
    const existing = await this.repo.findSolarProductionById(schoolId, id);
    if (!existing) throw new ScSolarProductionNotFoundError(id);
    return this.repo.updateSolarProduction(schoolId, id, data);
  }

  async deleteProduction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSolarProductionById(schoolId, id);
    if (!existing) throw new ScSolarProductionNotFoundError(id);
    return this.repo.deleteSolarProduction(schoolId, id);
  }

  async countProductions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSolarProductions(schoolId, filters);
  }
}
