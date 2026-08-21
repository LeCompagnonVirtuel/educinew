import type { SupabaseClient } from '@supabase/supabase-js';
import type { CarbonFootprint, CarbonFootprintCreate } from '@educi/types';
import { ScCarbonFootprintNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScCarbonFootprintService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getFootprint(schoolId: string, id: string): Promise<CarbonFootprint> {
    const footprint = await this.repo.findCarbonFootprintById(schoolId, id);
    if (!footprint) throw new ScCarbonFootprintNotFoundError(id);
    return footprint;
  }

  async listFootprints(schoolId: string, filters?: Record<string, unknown>): Promise<CarbonFootprint[]> {
    return this.repo.findAllCarbonFootprints(schoolId, filters);
  }

  async createFootprint(schoolId: string, data: CarbonFootprintCreate): Promise<CarbonFootprint> {
    return this.repo.createCarbonFootprint(schoolId, data);
  }

  async updateFootprint(schoolId: string, id: string, data: Partial<CarbonFootprintCreate>): Promise<CarbonFootprint> {
    const existing = await this.repo.findCarbonFootprintById(schoolId, id);
    if (!existing) throw new ScCarbonFootprintNotFoundError(id);
    return this.repo.updateCarbonFootprint(schoolId, id, data);
  }

  async deleteFootprint(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCarbonFootprintById(schoolId, id);
    if (!existing) throw new ScCarbonFootprintNotFoundError(id);
    return this.repo.deleteCarbonFootprint(schoolId, id);
  }

  async countFootprints(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCarbonFootprints(schoolId, filters);
  }
}
