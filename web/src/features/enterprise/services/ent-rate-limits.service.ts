// Enterprise Platform Service - RateLimits
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRateLimitService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRateLimit(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRateLimitById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRateLimits(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRateLimits(schoolId, filters);
  }
  async createRateLimit(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRateLimit(schoolId, data);
  }
  async updateRateLimit(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRateLimitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRateLimit(schoolId, id, data);
  }
  async deleteRateLimit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRateLimitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRateLimit(schoolId, id);
  }
  async countRateLimits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRateLimits(schoolId, filters);
  }
}
