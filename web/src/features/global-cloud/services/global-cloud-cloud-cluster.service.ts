import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudCluster } from '@educi/types';
import { EduCloudCloudClusterError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudCluster {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudCluster(schoolId: string, id: string): Promise<CloudCluster> {
    const item = await this.repo.getCloudCluster(schoolId, id);
    if (!item) throw new EduCloudCloudClusterError(id);
    return item;
  }
  async listCloudClusters(schoolId: string, filters?: Record<string, unknown>): Promise<CloudCluster[]> {
    return this.repo.listCloudCluster(schoolId, filters);
  }
  async createCloudCluster(schoolId: string, data: Partial<CloudCluster>): Promise<CloudCluster> {
    return this.repo.createCloudCluster(schoolId, data as any);
  }
  async updateCloudCluster(schoolId: string, id: string, data: Partial<CloudCluster>): Promise<CloudCluster> {
    const existing = await this.repo.getCloudCluster(schoolId, id);
    if (!existing) throw new EduCloudCloudClusterError(id);
    return this.repo.updateCloudCluster(schoolId, id, data as any);
  }
  async deleteCloudCluster(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudCluster(schoolId, id);
    if (!existing) throw new EduCloudCloudClusterError(id);
    return this.repo.deleteCloudCluster(schoolId, id);
  }
}
