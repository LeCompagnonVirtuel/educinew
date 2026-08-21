import type { SupabaseClient } from '@supabase/supabase-js';
import type { ObservabilityAlert } from '@educi/types';
import { EduCloudObservabilityAlertError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudObservabilityAlert {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getObservabilityAlert(schoolId: string, id: string): Promise<ObservabilityAlert> {
    const item = await this.repo.getObservabilityAlert(schoolId, id);
    if (!item) throw new EduCloudObservabilityAlertError(id);
    return item;
  }
  async listObservabilityAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<ObservabilityAlert[]> {
    return this.repo.listObservabilityAlert(schoolId, filters);
  }
  async createObservabilityAlert(schoolId: string, data: Partial<ObservabilityAlert>): Promise<ObservabilityAlert> {
    return this.repo.createObservabilityAlert(schoolId, data as any);
  }
  async updateObservabilityAlert(schoolId: string, id: string, data: Partial<ObservabilityAlert>): Promise<ObservabilityAlert> {
    const existing = await this.repo.getObservabilityAlert(schoolId, id);
    if (!existing) throw new EduCloudObservabilityAlertError(id);
    return this.repo.updateObservabilityAlert(schoolId, id, data as any);
  }
  async deleteObservabilityAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getObservabilityAlert(schoolId, id);
    if (!existing) throw new EduCloudObservabilityAlertError(id);
    return this.repo.deleteObservabilityAlert(schoolId, id);
  }
}
