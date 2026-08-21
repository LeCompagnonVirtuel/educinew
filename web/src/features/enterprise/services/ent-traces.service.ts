// Enterprise Platform Service - Traces
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTraceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTrace(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTraceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTraces(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTraces(schoolId, filters);
  }
  async createTrace(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTrace(schoolId, data);
  }
  async updateTrace(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTraceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTrace(schoolId, id, data);
  }
  async deleteTrace(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTraceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTrace(schoolId, id);
  }
  async countTraces(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTraces(schoolId, filters);
  }
}
