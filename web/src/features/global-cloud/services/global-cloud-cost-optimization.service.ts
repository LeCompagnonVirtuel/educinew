import type { SupabaseClient } from '@supabase/supabase-js';
import type { CostOptimization } from '@educi/types';
import { EduCloudCostOptimizationError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCostOptimization {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCostOptimization(schoolId: string, id: string): Promise<CostOptimization> {
    const item = await this.repo.getCostOptimization(schoolId, id);
    if (!item) throw new EduCloudCostOptimizationError(id);
    return item;
  }
  async listCostOptimizations(schoolId: string, filters?: Record<string, unknown>): Promise<CostOptimization[]> {
    return this.repo.listCostOptimization(schoolId, filters);
  }
  async createCostOptimization(schoolId: string, data: Partial<CostOptimization>): Promise<CostOptimization> {
    return this.repo.createCostOptimization(schoolId, data as any);
  }
  async updateCostOptimization(schoolId: string, id: string, data: Partial<CostOptimization>): Promise<CostOptimization> {
    const existing = await this.repo.getCostOptimization(schoolId, id);
    if (!existing) throw new EduCloudCostOptimizationError(id);
    return this.repo.updateCostOptimization(schoolId, id, data as any);
  }
  async deleteCostOptimization(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCostOptimization(schoolId, id);
    if (!existing) throw new EduCloudCostOptimizationError(id);
    return this.repo.deleteCostOptimization(schoolId, id);
  }
}
