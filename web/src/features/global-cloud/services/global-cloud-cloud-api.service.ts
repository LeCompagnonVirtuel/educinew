import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudApi } from '@educi/types';
import { EduCloudCloudApiError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudApi {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudApi(schoolId: string, id: string): Promise<CloudApi> {
    const item = await this.repo.getCloudApi(schoolId, id);
    if (!item) throw new EduCloudCloudApiError(id);
    return item;
  }
  async listCloudApis(schoolId: string, filters?: Record<string, unknown>): Promise<CloudApi[]> {
    return this.repo.listCloudApi(schoolId, filters);
  }
  async createCloudApi(schoolId: string, data: Partial<CloudApi>): Promise<CloudApi> {
    return this.repo.createCloudApi(schoolId, data as any);
  }
  async updateCloudApi(schoolId: string, id: string, data: Partial<CloudApi>): Promise<CloudApi> {
    const existing = await this.repo.getCloudApi(schoolId, id);
    if (!existing) throw new EduCloudCloudApiError(id);
    return this.repo.updateCloudApi(schoolId, id, data as any);
  }
  async deleteCloudApi(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudApi(schoolId, id);
    if (!existing) throw new EduCloudCloudApiError(id);
    return this.repo.deleteCloudApi(schoolId, id);
  }
}
