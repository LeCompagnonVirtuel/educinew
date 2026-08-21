import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudCost } from '@educi/types';
import { EduCloudCloudCostError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudCost {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudCost(schoolId: string, id: string): Promise<CloudCost> {
    const item = await this.repo.getCloudCost(schoolId, id);
    if (!item) throw new EduCloudCloudCostError(id);
    return item;
  }
  async listCloudCosts(schoolId: string, filters?: Record<string, unknown>): Promise<CloudCost[]> {
    return this.repo.listCloudCost(schoolId, filters);
  }
  async createCloudCost(schoolId: string, data: Partial<CloudCost>): Promise<CloudCost> {
    return this.repo.createCloudCost(schoolId, data as any);
  }
  async updateCloudCost(schoolId: string, id: string, data: Partial<CloudCost>): Promise<CloudCost> {
    const existing = await this.repo.getCloudCost(schoolId, id);
    if (!existing) throw new EduCloudCloudCostError(id);
    return this.repo.updateCloudCost(schoolId, id, data as any);
  }
  async deleteCloudCost(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudCost(schoolId, id);
    if (!existing) throw new EduCloudCloudCostError(id);
    return this.repo.deleteCloudCost(schoolId, id);
  }
}
