import type { SupabaseClient } from '@supabase/supabase-js';
import type { FederationSync } from '@educi/types';
import { EduCloudFederationSyncError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFederationSync {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFederationSync(schoolId: string, id: string): Promise<FederationSync> {
    const item = await this.repo.getFederationSync(schoolId, id);
    if (!item) throw new EduCloudFederationSyncError(id);
    return item;
  }
  async listFederationSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<FederationSync[]> {
    return this.repo.listFederationSync(schoolId, filters);
  }
  async createFederationSync(schoolId: string, data: Partial<FederationSync>): Promise<FederationSync> {
    return this.repo.createFederationSync(schoolId, data as any);
  }
  async updateFederationSync(schoolId: string, id: string, data: Partial<FederationSync>): Promise<FederationSync> {
    const existing = await this.repo.getFederationSync(schoolId, id);
    if (!existing) throw new EduCloudFederationSyncError(id);
    return this.repo.updateFederationSync(schoolId, id, data as any);
  }
  async deleteFederationSync(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFederationSync(schoolId, id);
    if (!existing) throw new EduCloudFederationSyncError(id);
    return this.repo.deleteFederationSync(schoolId, id);
  }
}
