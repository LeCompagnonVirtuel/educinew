import type { SupabaseClient } from '@supabase/supabase-js';
import type { EdgeFunction } from '@educi/types';
import { EduCloudEdgeFunctionError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEdgeFunction {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEdgeFunction(schoolId: string, id: string): Promise<EdgeFunction> {
    const item = await this.repo.getEdgeFunction(schoolId, id);
    if (!item) throw new EduCloudEdgeFunctionError(id);
    return item;
  }
  async listEdgeFunctions(schoolId: string, filters?: Record<string, unknown>): Promise<EdgeFunction[]> {
    return this.repo.listEdgeFunction(schoolId, filters);
  }
  async createEdgeFunction(schoolId: string, data: Partial<EdgeFunction>): Promise<EdgeFunction> {
    return this.repo.createEdgeFunction(schoolId, data as any);
  }
  async updateEdgeFunction(schoolId: string, id: string, data: Partial<EdgeFunction>): Promise<EdgeFunction> {
    const existing = await this.repo.getEdgeFunction(schoolId, id);
    if (!existing) throw new EduCloudEdgeFunctionError(id);
    return this.repo.updateEdgeFunction(schoolId, id, data as any);
  }
  async deleteEdgeFunction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEdgeFunction(schoolId, id);
    if (!existing) throw new EduCloudEdgeFunctionError(id);
    return this.repo.deleteEdgeFunction(schoolId, id);
  }
}
