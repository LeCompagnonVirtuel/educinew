import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertEscalation } from '@educi/types';
import { EduCloudAlertEscalationError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudAlertEscalation {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getAlertEscalation(schoolId: string, id: string): Promise<AlertEscalation> {
    const item = await this.repo.getAlertEscalation(schoolId, id);
    if (!item) throw new EduCloudAlertEscalationError(id);
    return item;
  }
  async listAlertEscalations(schoolId: string, filters?: Record<string, unknown>): Promise<AlertEscalation[]> {
    return this.repo.listAlertEscalation(schoolId, filters);
  }
  async createAlertEscalation(schoolId: string, data: Partial<AlertEscalation>): Promise<AlertEscalation> {
    return this.repo.createAlertEscalation(schoolId, data as any);
  }
  async updateAlertEscalation(schoolId: string, id: string, data: Partial<AlertEscalation>): Promise<AlertEscalation> {
    const existing = await this.repo.getAlertEscalation(schoolId, id);
    if (!existing) throw new EduCloudAlertEscalationError(id);
    return this.repo.updateAlertEscalation(schoolId, id, data as any);
  }
  async deleteAlertEscalation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAlertEscalation(schoolId, id);
    if (!existing) throw new EduCloudAlertEscalationError(id);
    return this.repo.deleteAlertEscalation(schoolId, id);
  }
}
