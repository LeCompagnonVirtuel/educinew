import type { SupabaseClient } from '@supabase/supabase-js';
import type { LogQuery } from '@educi/types';
import { EduCloudLogQueryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudLogQuery {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getLogQuery(schoolId: string, id: string): Promise<LogQuery> {
    const item = await this.repo.getLogQuery(schoolId, id);
    if (!item) throw new EduCloudLogQueryError(id);
    return item;
  }
  async listLogQuerys(schoolId: string, filters?: Record<string, unknown>): Promise<LogQuery[]> {
    return this.repo.listLogQuery(schoolId, filters);
  }
  async createLogQuery(schoolId: string, data: Partial<LogQuery>): Promise<LogQuery> {
    return this.repo.createLogQuery(schoolId, data as any);
  }
  async updateLogQuery(schoolId: string, id: string, data: Partial<LogQuery>): Promise<LogQuery> {
    const existing = await this.repo.getLogQuery(schoolId, id);
    if (!existing) throw new EduCloudLogQueryError(id);
    return this.repo.updateLogQuery(schoolId, id, data as any);
  }
  async deleteLogQuery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLogQuery(schoolId, id);
    if (!existing) throw new EduCloudLogQueryError(id);
    return this.repo.deleteLogQuery(schoolId, id);
  }
}
