import type { SupabaseClient } from '@supabase/supabase-js';
import type { ApiLimit } from '@educi/types';
import { EduCloudApiLimitError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudApiLimit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getApiLimit(schoolId: string, id: string): Promise<ApiLimit> {
    const item = await this.repo.getApiLimit(schoolId, id);
    if (!item) throw new EduCloudApiLimitError(id);
    return item;
  }
  async listApiLimits(schoolId: string, filters?: Record<string, unknown>): Promise<ApiLimit[]> {
    return this.repo.listApiLimit(schoolId, filters);
  }
  async createApiLimit(schoolId: string, data: Partial<ApiLimit>): Promise<ApiLimit> {
    return this.repo.createApiLimit(schoolId, data as any);
  }
  async updateApiLimit(schoolId: string, id: string, data: Partial<ApiLimit>): Promise<ApiLimit> {
    const existing = await this.repo.getApiLimit(schoolId, id);
    if (!existing) throw new EduCloudApiLimitError(id);
    return this.repo.updateApiLimit(schoolId, id, data as any);
  }
  async deleteApiLimit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getApiLimit(schoolId, id);
    if (!existing) throw new EduCloudApiLimitError(id);
    return this.repo.deleteApiLimit(schoolId, id);
  }
}
