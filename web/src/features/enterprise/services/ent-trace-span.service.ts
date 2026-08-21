// Enterprise Platform Service - TraceSpan
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TraceSpan, TraceSpanCreate } from '@educi/types';
import { EntTraceSpanNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTraceSpanService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTraceSpan(schoolId: string, id: string): Promise<TraceSpan> {
    const item = await this.repo.findTraceSpanById(schoolId, id);
    if (!item) throw new EntTraceSpanNotFoundError(id);
    return item;
  }
  async listTraceSpans(schoolId: string, filters?: Record<string, unknown>): Promise<TraceSpan[]> {
    return this.repo.findAllTraceSpans(schoolId, filters);
  }
  async createTraceSpan(schoolId: string, data: TraceSpanCreate): Promise<TraceSpan> {
    return this.repo.createTraceSpan(schoolId, data);
  }
  async updateTraceSpan(schoolId: string, id: string, data: Partial<TraceSpanCreate>): Promise<TraceSpan> {
    const existing = await this.repo.findTraceSpanById(schoolId, id);
    if (!existing) throw new EntTraceSpanNotFoundError(id);
    return this.repo.updateTraceSpan(schoolId, id, data);
  }
  async deleteTraceSpan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTraceSpanById(schoolId, id);
    if (!existing) throw new EntTraceSpanNotFoundError(id);
    return this.repo.deleteTraceSpan(schoolId, id);
  }
  async countTraceSpans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTraceSpans(schoolId, filters);
  }
}
