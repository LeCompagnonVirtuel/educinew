import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudTracing } from '@educi/types';
import { EduCloudCloudTracingError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudTracing {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudTracing(schoolId: string, id: string): Promise<CloudTracing> {
    const item = await this.repo.getCloudTracing(schoolId, id);
    if (!item) throw new EduCloudCloudTracingError(id);
    return item;
  }
  async listCloudTracings(schoolId: string, filters?: Record<string, unknown>): Promise<CloudTracing[]> {
    return this.repo.listCloudTracing(schoolId, filters);
  }
  async createCloudTracing(schoolId: string, data: Partial<CloudTracing>): Promise<CloudTracing> {
    return this.repo.createCloudTracing(schoolId, data as any);
  }
  async updateCloudTracing(schoolId: string, id: string, data: Partial<CloudTracing>): Promise<CloudTracing> {
    const existing = await this.repo.getCloudTracing(schoolId, id);
    if (!existing) throw new EduCloudCloudTracingError(id);
    return this.repo.updateCloudTracing(schoolId, id, data as any);
  }
  async deleteCloudTracing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudTracing(schoolId, id);
    if (!existing) throw new EduCloudCloudTracingError(id);
    return this.repo.deleteCloudTracing(schoolId, id);
  }
}
