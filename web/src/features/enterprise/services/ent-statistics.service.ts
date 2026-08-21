// Enterprise Platform Service - Statistics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStatisticService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStatistic(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStatisticById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStatistics(schoolId, filters);
  }
  async createStatistic(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStatistic(schoolId, data);
  }
  async updateStatistic(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStatisticById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStatistic(schoolId, id, data);
  }
  async deleteStatistic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStatisticById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStatistic(schoolId, id);
  }
  async countStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStatistics(schoolId, filters);
  }
}
