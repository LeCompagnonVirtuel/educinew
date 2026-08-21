// Enterprise Platform Service - LogAggregation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LogAggregation, LogAggregationCreate } from '@educi/types';
import { EntLogAggregationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLogAggregationServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLogAggregationService(schoolId: string, id: string): Promise<LogAggregation> {
    const item = await this.repo.findLogAggregationServiceById(schoolId, id);
    if (!item) throw new EntLogAggregationNotFoundError(id);
    return item;
  }
  async listLogAggregationServices(schoolId: string, filters?: Record<string, unknown>): Promise<LogAggregation[]> {
    return this.repo.findAllLogAggregationServices(schoolId, filters);
  }
  async createLogAggregationService(schoolId: string, data: LogAggregationCreate): Promise<LogAggregation> {
    return this.repo.createLogAggregationService(schoolId, data);
  }
  async updateLogAggregationService(schoolId: string, id: string, data: Partial<LogAggregationCreate>): Promise<LogAggregation> {
    const existing = await this.repo.findLogAggregationServiceById(schoolId, id);
    if (!existing) throw new EntLogAggregationNotFoundError(id);
    return this.repo.updateLogAggregationService(schoolId, id, data);
  }
  async deleteLogAggregationService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLogAggregationServiceById(schoolId, id);
    if (!existing) throw new EntLogAggregationNotFoundError(id);
    return this.repo.deleteLogAggregationService(schoolId, id);
  }
  async countLogAggregationServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLogAggregationServices(schoolId, filters);
  }
}
