import type { SupabaseClient } from '@supabase/supabase-js';
import type { MultiGovernment } from '@educi/types';
import { EduCloudMultiGovernmentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMultiGovernment {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMultiGovernment(schoolId: string, id: string): Promise<MultiGovernment> {
    const item = await this.repo.getMultiGovernment(schoolId, id);
    if (!item) throw new EduCloudMultiGovernmentError(id);
    return item;
  }
  async listMultiGovernments(schoolId: string, filters?: Record<string, unknown>): Promise<MultiGovernment[]> {
    return this.repo.listMultiGovernment(schoolId, filters);
  }
  async createMultiGovernment(schoolId: string, data: Partial<MultiGovernment>): Promise<MultiGovernment> {
    return this.repo.createMultiGovernment(schoolId, data as any);
  }
  async updateMultiGovernment(schoolId: string, id: string, data: Partial<MultiGovernment>): Promise<MultiGovernment> {
    const existing = await this.repo.getMultiGovernment(schoolId, id);
    if (!existing) throw new EduCloudMultiGovernmentError(id);
    return this.repo.updateMultiGovernment(schoolId, id, data as any);
  }
  async deleteMultiGovernment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMultiGovernment(schoolId, id);
    if (!existing) throw new EduCloudMultiGovernmentError(id);
    return this.repo.deleteMultiGovernment(schoolId, id);
  }
}
