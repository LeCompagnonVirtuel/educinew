import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudLogging } from '@educi/types';
import { EduCloudCloudLoggingError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudLogging {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudLogging(schoolId: string, id: string): Promise<CloudLogging> {
    const item = await this.repo.getCloudLogging(schoolId, id);
    if (!item) throw new EduCloudCloudLoggingError(id);
    return item;
  }
  async listCloudLoggings(schoolId: string, filters?: Record<string, unknown>): Promise<CloudLogging[]> {
    return this.repo.listCloudLogging(schoolId, filters);
  }
  async createCloudLogging(schoolId: string, data: Partial<CloudLogging>): Promise<CloudLogging> {
    return this.repo.createCloudLogging(schoolId, data as any);
  }
  async updateCloudLogging(schoolId: string, id: string, data: Partial<CloudLogging>): Promise<CloudLogging> {
    const existing = await this.repo.getCloudLogging(schoolId, id);
    if (!existing) throw new EduCloudCloudLoggingError(id);
    return this.repo.updateCloudLogging(schoolId, id, data as any);
  }
  async deleteCloudLogging(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudLogging(schoolId, id);
    if (!existing) throw new EduCloudCloudLoggingError(id);
    return this.repo.deleteCloudLogging(schoolId, id);
  }
}
