import type { SupabaseClient } from '@supabase/supabase-js';
import type { EdgeNode } from '@educi/types';
import { EduCloudEdgeNodeError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEdgeNode {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEdgeNode(schoolId: string, id: string): Promise<EdgeNode> {
    const item = await this.repo.getEdgeNode(schoolId, id);
    if (!item) throw new EduCloudEdgeNodeError(id);
    return item;
  }
  async listEdgeNodes(schoolId: string, filters?: Record<string, unknown>): Promise<EdgeNode[]> {
    return this.repo.listEdgeNode(schoolId, filters);
  }
  async createEdgeNode(schoolId: string, data: Partial<EdgeNode>): Promise<EdgeNode> {
    return this.repo.createEdgeNode(schoolId, data as any);
  }
  async updateEdgeNode(schoolId: string, id: string, data: Partial<EdgeNode>): Promise<EdgeNode> {
    const existing = await this.repo.getEdgeNode(schoolId, id);
    if (!existing) throw new EduCloudEdgeNodeError(id);
    return this.repo.updateEdgeNode(schoolId, id, data as any);
  }
  async deleteEdgeNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEdgeNode(schoolId, id);
    if (!existing) throw new EduCloudEdgeNodeError(id);
    return this.repo.deleteEdgeNode(schoolId, id);
  }
}
