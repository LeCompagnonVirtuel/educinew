// Enterprise Platform Service - TracingCollector
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TracingCollector, TracingCollectorCreate } from '@educi/types';
import { EntTracingCollectorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTracingCollectorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTracingCollector(schoolId: string, id: string): Promise<TracingCollector> {
    const item = await this.repo.findTracingCollectorById(schoolId, id);
    if (!item) throw new EntTracingCollectorNotFoundError(id);
    return item;
  }
  async listTracingCollectors(schoolId: string, filters?: Record<string, unknown>): Promise<TracingCollector[]> {
    return this.repo.findAllTracingCollectors(schoolId, filters);
  }
  async createTracingCollector(schoolId: string, data: TracingCollectorCreate): Promise<TracingCollector> {
    return this.repo.createTracingCollector(schoolId, data);
  }
  async updateTracingCollector(schoolId: string, id: string, data: Partial<TracingCollectorCreate>): Promise<TracingCollector> {
    const existing = await this.repo.findTracingCollectorById(schoolId, id);
    if (!existing) throw new EntTracingCollectorNotFoundError(id);
    return this.repo.updateTracingCollector(schoolId, id, data);
  }
  async deleteTracingCollector(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTracingCollectorById(schoolId, id);
    if (!existing) throw new EntTracingCollectorNotFoundError(id);
    return this.repo.deleteTracingCollector(schoolId, id);
  }
  async countTracingCollectors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTracingCollectors(schoolId, filters);
  }
}
