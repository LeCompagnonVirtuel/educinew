import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudNode } from '@educi/types';
import { EduCloudCloudNodeError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudNode {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudNode(schoolId: string, id: string): Promise<CloudNode> {
    const item = await this.repo.getCloudNode(schoolId, id);
    if (!item) throw new EduCloudCloudNodeError(id);
    return item;
  }
  async listCloudNodes(schoolId: string, filters?: Record<string, unknown>): Promise<CloudNode[]> {
    return this.repo.listCloudNode(schoolId, filters);
  }
  async createCloudNode(schoolId: string, data: Partial<CloudNode>): Promise<CloudNode> {
    return this.repo.createCloudNode(schoolId, data as any);
  }
  async updateCloudNode(schoolId: string, id: string, data: Partial<CloudNode>): Promise<CloudNode> {
    const existing = await this.repo.getCloudNode(schoolId, id);
    if (!existing) throw new EduCloudCloudNodeError(id);
    return this.repo.updateCloudNode(schoolId, id, data as any);
  }
  async deleteCloudNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudNode(schoolId, id);
    if (!existing) throw new EduCloudCloudNodeError(id);
    return this.repo.deleteCloudNode(schoolId, id);
  }
}
