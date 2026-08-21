import type { SupabaseClient } from '@supabase/supabase-js';
import type { CapacityAlert } from '@educi/types';
import { EduCloudCapacityAlertError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCapacityAlert {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCapacityAlert(schoolId: string, id: string): Promise<CapacityAlert> {
    const item = await this.repo.getCapacityAlert(schoolId, id);
    if (!item) throw new EduCloudCapacityAlertError(id);
    return item;
  }
  async listCapacityAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<CapacityAlert[]> {
    return this.repo.listCapacityAlert(schoolId, filters);
  }
  async createCapacityAlert(schoolId: string, data: Partial<CapacityAlert>): Promise<CapacityAlert> {
    return this.repo.createCapacityAlert(schoolId, data as any);
  }
  async updateCapacityAlert(schoolId: string, id: string, data: Partial<CapacityAlert>): Promise<CapacityAlert> {
    const existing = await this.repo.getCapacityAlert(schoolId, id);
    if (!existing) throw new EduCloudCapacityAlertError(id);
    return this.repo.updateCapacityAlert(schoolId, id, data as any);
  }
  async deleteCapacityAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCapacityAlert(schoolId, id);
    if (!existing) throw new EduCloudCapacityAlertError(id);
    return this.repo.deleteCapacityAlert(schoolId, id);
  }
}
