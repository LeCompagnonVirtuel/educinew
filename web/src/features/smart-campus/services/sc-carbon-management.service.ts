import type { SupabaseClient } from '@supabase/supabase-js';
import type { CarbonFootprint, CarbonFootprintCreate } from '@educi/types';
import { ScCarbonFootprintNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScCarbonManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getFootprint(schoolId: string, id: string): Promise<CarbonFootprint> {
    const footprint = await this.repo.findCarbonFootprintById(schoolId, id);
    if (!footprint) throw new ScCarbonFootprintNotFoundError(id);
    return footprint;
  }

  async listFootprints(schoolId: string): Promise<CarbonFootprint[]> {
    return this.repo.findAllCarbonFootprints(schoolId);
  }

  async createFootprint(schoolId: string, data: CarbonFootprintCreate): Promise<CarbonFootprint> {
    return this.repo.createCarbonFootprint(schoolId, data);
  }

  async getTotalEmissions(schoolId: string, start: string, end: string): Promise<number> {
    return this.repo.getTotalCarbonEmissions(schoolId, start, end);
  }

  async getByScope(schoolId: string, scope: number): Promise<CarbonFootprint[]> {
    return this.repo.findCarbonFootprintsByScope(schoolId, scope);
  }

  async getEmissionsTrend(schoolId: string, days: number): Promise<Record<string, number>[]> {
    return this.repo.getCarbonEmissionsTrend(schoolId, days);
  }

  async getYearlyTotal(schoolId: string, year: number): Promise<number> {
    return this.repo.getCarbonYearlyTotal(schoolId, year);
  }

  async deleteFootprint(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCarbonFootprintById(schoolId, id);
    if (!existing) throw new ScCarbonFootprintNotFoundError(id);
    return this.repo.deleteCarbonFootprint(schoolId, id);
  }
}
