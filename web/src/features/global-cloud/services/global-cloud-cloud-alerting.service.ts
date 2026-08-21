import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudAlerting } from '@educi/types';
import { EduCloudCloudAlertingError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudAlerting {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudAlerting(schoolId: string, id: string): Promise<CloudAlerting> {
    const item = await this.repo.getCloudAlerting(schoolId, id);
    if (!item) throw new EduCloudCloudAlertingError(id);
    return item;
  }
  async listCloudAlertings(schoolId: string, filters?: Record<string, unknown>): Promise<CloudAlerting[]> {
    return this.repo.listCloudAlerting(schoolId, filters);
  }
  async createCloudAlerting(schoolId: string, data: Partial<CloudAlerting>): Promise<CloudAlerting> {
    return this.repo.createCloudAlerting(schoolId, data as any);
  }
  async updateCloudAlerting(schoolId: string, id: string, data: Partial<CloudAlerting>): Promise<CloudAlerting> {
    const existing = await this.repo.getCloudAlerting(schoolId, id);
    if (!existing) throw new EduCloudCloudAlertingError(id);
    return this.repo.updateCloudAlerting(schoolId, id, data as any);
  }
  async deleteCloudAlerting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudAlerting(schoolId, id);
    if (!existing) throw new EduCloudCloudAlertingError(id);
    return this.repo.deleteCloudAlerting(schoolId, id);
  }
}
