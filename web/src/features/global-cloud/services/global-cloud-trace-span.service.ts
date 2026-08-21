import type { SupabaseClient } from '@supabase/supabase-js';
import type { TraceSpan } from '@educi/types';
import { EduCloudTraceSpanError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTraceSpan {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTraceSpan(schoolId: string, id: string): Promise<TraceSpan> {
    const item = await this.repo.getTraceSpan(schoolId, id);
    if (!item) throw new EduCloudTraceSpanError(id);
    return item;
  }
  async listTraceSpans(schoolId: string, filters?: Record<string, unknown>): Promise<TraceSpan[]> {
    return this.repo.listTraceSpan(schoolId, filters);
  }
  async createTraceSpan(schoolId: string, data: Partial<TraceSpan>): Promise<TraceSpan> {
    return this.repo.createTraceSpan(schoolId, data as any);
  }
  async updateTraceSpan(schoolId: string, id: string, data: Partial<TraceSpan>): Promise<TraceSpan> {
    const existing = await this.repo.getTraceSpan(schoolId, id);
    if (!existing) throw new EduCloudTraceSpanError(id);
    return this.repo.updateTraceSpan(schoolId, id, data as any);
  }
  async deleteTraceSpan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTraceSpan(schoolId, id);
    if (!existing) throw new EduCloudTraceSpanError(id);
    return this.repo.deleteTraceSpan(schoolId, id);
  }
}
