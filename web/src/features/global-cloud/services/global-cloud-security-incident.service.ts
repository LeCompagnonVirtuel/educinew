import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityIncident } from '@educi/types';
import { EduCloudSecurityIncidentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSecurityIncident {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSecurityIncident(schoolId: string, id: string): Promise<SecurityIncident> {
    const item = await this.repo.getSecurityIncident(schoolId, id);
    if (!item) throw new EduCloudSecurityIncidentError(id);
    return item;
  }
  async listSecurityIncidents(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityIncident[]> {
    return this.repo.listSecurityIncident(schoolId, filters);
  }
  async createSecurityIncident(schoolId: string, data: Partial<SecurityIncident>): Promise<SecurityIncident> {
    return this.repo.createSecurityIncident(schoolId, data as any);
  }
  async updateSecurityIncident(schoolId: string, id: string, data: Partial<SecurityIncident>): Promise<SecurityIncident> {
    const existing = await this.repo.getSecurityIncident(schoolId, id);
    if (!existing) throw new EduCloudSecurityIncidentError(id);
    return this.repo.updateSecurityIncident(schoolId, id, data as any);
  }
  async deleteSecurityIncident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecurityIncident(schoolId, id);
    if (!existing) throw new EduCloudSecurityIncidentError(id);
    return this.repo.deleteSecurityIncident(schoolId, id);
  }
}
