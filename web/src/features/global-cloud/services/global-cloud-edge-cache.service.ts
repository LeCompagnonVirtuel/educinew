import type { SupabaseClient } from '@supabase/supabase-js';
import type { EdgeCache } from '@educi/types';
import { EduCloudEdgeCacheError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEdgeCache {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEdgeCache(schoolId: string, id: string): Promise<EdgeCache> {
    const item = await this.repo.getEdgeCache(schoolId, id);
    if (!item) throw new EduCloudEdgeCacheError(id);
    return item;
  }
  async listEdgeCaches(schoolId: string, filters?: Record<string, unknown>): Promise<EdgeCache[]> {
    return this.repo.listEdgeCache(schoolId, filters);
  }
  async createEdgeCache(schoolId: string, data: Partial<EdgeCache>): Promise<EdgeCache> {
    return this.repo.createEdgeCache(schoolId, data as any);
  }
  async updateEdgeCache(schoolId: string, id: string, data: Partial<EdgeCache>): Promise<EdgeCache> {
    const existing = await this.repo.getEdgeCache(schoolId, id);
    if (!existing) throw new EduCloudEdgeCacheError(id);
    return this.repo.updateEdgeCache(schoolId, id, data as any);
  }
  async deleteEdgeCache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEdgeCache(schoolId, id);
    if (!existing) throw new EduCloudEdgeCacheError(id);
    return this.repo.deleteEdgeCache(schoolId, id);
  }
}
