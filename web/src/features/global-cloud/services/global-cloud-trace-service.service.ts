import type { SupabaseClient } from '@supabase/supabase-js';
import type { TraceService } from '@educi/types';
import { EduCloudTraceServiceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTraceService {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTraceService(schoolId: string, id: string): Promise<TraceService> {
    const item = await this.repo.getTraceService(schoolId, id);
    if (!item) throw new EduCloudTraceServiceError(id);
    return item;
  }
  async listTraceServices(schoolId: string, filters?: Record<string, unknown>): Promise<TraceService[]> {
    return this.repo.listTraceService(schoolId, filters);
  }
  async createTraceService(schoolId: string, data: Partial<TraceService>): Promise<TraceService> {
    return this.repo.createTraceService(schoolId, data as any);
  }
  async updateTraceService(schoolId: string, id: string, data: Partial<TraceService>): Promise<TraceService> {
    const existing = await this.repo.getTraceService(schoolId, id);
    if (!existing) throw new EduCloudTraceServiceError(id);
    return this.repo.updateTraceService(schoolId, id, data as any);
  }
  async deleteTraceService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTraceService(schoolId, id);
    if (!existing) throw new EduCloudTraceServiceError(id);
    return this.repo.deleteTraceService(schoolId, id);
  }
}
