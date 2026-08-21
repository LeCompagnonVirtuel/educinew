import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudProxy } from '@educi/types';
import { EduCloudCloudProxyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudProxy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudProxy(schoolId: string, id: string): Promise<CloudProxy> {
    const item = await this.repo.getCloudProxy(schoolId, id);
    if (!item) throw new EduCloudCloudProxyError(id);
    return item;
  }
  async listCloudProxys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudProxy[]> {
    return this.repo.listCloudProxy(schoolId, filters);
  }
  async createCloudProxy(schoolId: string, data: Partial<CloudProxy>): Promise<CloudProxy> {
    return this.repo.createCloudProxy(schoolId, data as any);
  }
  async updateCloudProxy(schoolId: string, id: string, data: Partial<CloudProxy>): Promise<CloudProxy> {
    const existing = await this.repo.getCloudProxy(schoolId, id);
    if (!existing) throw new EduCloudCloudProxyError(id);
    return this.repo.updateCloudProxy(schoolId, id, data as any);
  }
  async deleteCloudProxy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudProxy(schoolId, id);
    if (!existing) throw new EduCloudCloudProxyError(id);
    return this.repo.deleteCloudProxy(schoolId, id);
  }
}
