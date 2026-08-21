import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudIdentity } from '@educi/types';
import { EduCloudCloudIdentityError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudIdentity {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudIdentity(schoolId: string, id: string): Promise<CloudIdentity> {
    const item = await this.repo.getCloudIdentity(schoolId, id);
    if (!item) throw new EduCloudCloudIdentityError(id);
    return item;
  }
  async listCloudIdentitys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudIdentity[]> {
    return this.repo.listCloudIdentity(schoolId, filters);
  }
  async createCloudIdentity(schoolId: string, data: Partial<CloudIdentity>): Promise<CloudIdentity> {
    return this.repo.createCloudIdentity(schoolId, data as any);
  }
  async updateCloudIdentity(schoolId: string, id: string, data: Partial<CloudIdentity>): Promise<CloudIdentity> {
    const existing = await this.repo.getCloudIdentity(schoolId, id);
    if (!existing) throw new EduCloudCloudIdentityError(id);
    return this.repo.updateCloudIdentity(schoolId, id, data as any);
  }
  async deleteCloudIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudIdentity(schoolId, id);
    if (!existing) throw new EduCloudCloudIdentityError(id);
    return this.repo.deleteCloudIdentity(schoolId, id);
  }
}
