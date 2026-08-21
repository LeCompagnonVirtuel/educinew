import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudSecurity } from '@educi/types';
import { EduCloudCloudSecurityError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudSecurity {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudSecurity(schoolId: string, id: string): Promise<CloudSecurity> {
    const item = await this.repo.getCloudSecurity(schoolId, id);
    if (!item) throw new EduCloudCloudSecurityError(id);
    return item;
  }
  async listCloudSecuritys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudSecurity[]> {
    return this.repo.listCloudSecurity(schoolId, filters);
  }
  async createCloudSecurity(schoolId: string, data: Partial<CloudSecurity>): Promise<CloudSecurity> {
    return this.repo.createCloudSecurity(schoolId, data as any);
  }
  async updateCloudSecurity(schoolId: string, id: string, data: Partial<CloudSecurity>): Promise<CloudSecurity> {
    const existing = await this.repo.getCloudSecurity(schoolId, id);
    if (!existing) throw new EduCloudCloudSecurityError(id);
    return this.repo.updateCloudSecurity(schoolId, id, data as any);
  }
  async deleteCloudSecurity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudSecurity(schoolId, id);
    if (!existing) throw new EduCloudCloudSecurityError(id);
    return this.repo.deleteCloudSecurity(schoolId, id);
  }
}
