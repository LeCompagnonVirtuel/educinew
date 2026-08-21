// Enterprise Platform Service - LogAggregation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LogAggregation, LogAggregationCreate } from '@educi/types';
import { EntLogAggregationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLogAggregationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLogAggregation(schoolId: string, id: string): Promise<LogAggregation> {
    const item = await this.repo.findLogAggregationById(schoolId, id);
    if (!item) throw new EntLogAggregationNotFoundError(id);
    return item;
  }
  async listLogAggregations(schoolId: string, filters?: Record<string, unknown>): Promise<LogAggregation[]> {
    return this.repo.findAllLogAggregations(schoolId, filters);
  }
  async createLogAggregation(schoolId: string, data: LogAggregationCreate): Promise<LogAggregation> {
    return this.repo.createLogAggregation(schoolId, data);
  }
  async updateLogAggregation(schoolId: string, id: string, data: Partial<LogAggregationCreate>): Promise<LogAggregation> {
    const existing = await this.repo.findLogAggregationById(schoolId, id);
    if (!existing) throw new EntLogAggregationNotFoundError(id);
    return this.repo.updateLogAggregation(schoolId, id, data);
  }
  async deleteLogAggregation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLogAggregationById(schoolId, id);
    if (!existing) throw new EntLogAggregationNotFoundError(id);
    return this.repo.deleteLogAggregation(schoolId, id);
  }
  async countLogAggregations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLogAggregations(schoolId, filters);
  }
}
