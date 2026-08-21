import type { SupabaseClient } from '@supabase/supabase-js';
import type { WaterUsage, WaterUsageCreate } from '@educi/types';
import { ScWaterUsageNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScWaterUsageService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getUsage(schoolId: string, id: string): Promise<WaterUsage> {
    const usage = await this.repo.findWaterUsageById(schoolId, id);
    if (!usage) throw new ScWaterUsageNotFoundError(id);
    return usage;
  }

  async listUsages(schoolId: string, filters?: Record<string, unknown>): Promise<WaterUsage[]> {
    return this.repo.findAllWaterUsages(schoolId, filters);
  }

  async createUsage(schoolId: string, data: WaterUsageCreate): Promise<WaterUsage> {
    return this.repo.createWaterUsage(schoolId, data);
  }

  async updateUsage(schoolId: string, id: string, data: Partial<WaterUsageCreate>): Promise<WaterUsage> {
    const existing = await this.repo.findWaterUsageById(schoolId, id);
    if (!existing) throw new ScWaterUsageNotFoundError(id);
    return this.repo.updateWaterUsage(schoolId, id, data);
  }

  async deleteUsage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWaterUsageById(schoolId, id);
    if (!existing) throw new ScWaterUsageNotFoundError(id);
    return this.repo.deleteWaterUsage(schoolId, id);
  }

  async countUsages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWaterUsages(schoolId, filters);
  }
}
