import type { SupabaseClient } from '@supabase/supabase-js';
import type { BurnoutDetection, BurnoutDetectionCreate } from '@educi/types';
import { AdaptiveBurnoutNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveBurnoutService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getBurnoutDetection(schoolId: string, id: string): Promise<BurnoutDetection> {
    const item = await this.repo.getBurnoutDetection(schoolId, id);
    if (!item) throw new AdaptiveBurnoutNotFoundError(id);
    return item;
  }
  async listBurnoutDetections(schoolId: string, filters?: Record<string, unknown>): Promise<BurnoutDetection[]> {
    return this.repo.listBurnoutDetections(schoolId, filters);
  }
  async createBurnoutDetection(schoolId: string, data: BurnoutDetectionCreate): Promise<BurnoutDetection> {
    return this.repo.createBurnoutDetection(schoolId, { ...data } as any);
  }
  async updateBurnoutDetection(schoolId: string, id: string, data: Partial<BurnoutDetectionCreate>): Promise<BurnoutDetection> {
    const existing = await this.repo.getBurnoutDetection(schoolId, id);
    if (!existing) throw new AdaptiveBurnoutNotFoundError(id);
    return this.repo.updateBurnoutDetection(schoolId, id, data);
  }
  async deleteBurnoutDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBurnoutDetection(schoolId, id);
    if (!existing) throw new AdaptiveBurnoutNotFoundError(id);
    return this.repo.deleteBurnoutDetection(schoolId, id);
  }
}
