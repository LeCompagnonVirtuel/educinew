import type { SupabaseClient } from '@supabase/supabase-js';
import type { CostAlert } from '@educi/types';
import { EduCloudCostAlertError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCostAlert {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCostAlert(schoolId: string, id: string): Promise<CostAlert> {
    const item = await this.repo.getCostAlert(schoolId, id);
    if (!item) throw new EduCloudCostAlertError(id);
    return item;
  }
  async listCostAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<CostAlert[]> {
    return this.repo.listCostAlert(schoolId, filters);
  }
  async createCostAlert(schoolId: string, data: Partial<CostAlert>): Promise<CostAlert> {
    return this.repo.createCostAlert(schoolId, data as any);
  }
  async updateCostAlert(schoolId: string, id: string, data: Partial<CostAlert>): Promise<CostAlert> {
    const existing = await this.repo.getCostAlert(schoolId, id);
    if (!existing) throw new EduCloudCostAlertError(id);
    return this.repo.updateCostAlert(schoolId, id, data as any);
  }
  async deleteCostAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCostAlert(schoolId, id);
    if (!existing) throw new EduCloudCostAlertError(id);
    return this.repo.deleteCostAlert(schoolId, id);
  }
}
