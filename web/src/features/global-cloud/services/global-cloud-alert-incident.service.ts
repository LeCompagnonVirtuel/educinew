import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertIncident } from '@educi/types';
import { EduCloudAlertIncidentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudAlertIncident {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getAlertIncident(schoolId: string, id: string): Promise<AlertIncident> {
    const item = await this.repo.getAlertIncident(schoolId, id);
    if (!item) throw new EduCloudAlertIncidentError(id);
    return item;
  }
  async listAlertIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<AlertIncident[]> {
    return this.repo.listAlertIncident(schoolId, filters);
  }
  async createAlertIncident(schoolId: string, data: Partial<AlertIncident>): Promise<AlertIncident> {
    return this.repo.createAlertIncident(schoolId, data as any);
  }
  async updateAlertIncident(schoolId: string, id: string, data: Partial<AlertIncident>): Promise<AlertIncident> {
    const existing = await this.repo.getAlertIncident(schoolId, id);
    if (!existing) throw new EduCloudAlertIncidentError(id);
    return this.repo.updateAlertIncident(schoolId, id, data as any);
  }
  async deleteAlertIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAlertIncident(schoolId, id);
    if (!existing) throw new EduCloudAlertIncidentError(id);
    return this.repo.deleteAlertIncident(schoolId, id);
  }
}
