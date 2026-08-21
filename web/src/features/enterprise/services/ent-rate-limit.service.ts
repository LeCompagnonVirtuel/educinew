// Enterprise Platform Service - RateLimit
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RateLimit, RateLimitCreate } from '@educi/types';
import { EntRateLimitNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRateLimitService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRateLimit(schoolId: string, id: string): Promise<RateLimit> {
    const item = await this.repo.findRateLimitById(schoolId, id);
    if (!item) throw new EntRateLimitNotFoundError(id);
    return item;
  }
  async listRateLimits(schoolId: string, filters?: Record<string, unknown>): Promise<RateLimit[]> {
    return this.repo.findAllRateLimits(schoolId, filters);
  }
  async createRateLimit(schoolId: string, data: RateLimitCreate): Promise<RateLimit> {
    return this.repo.createRateLimit(schoolId, data);
  }
  async updateRateLimit(schoolId: string, id: string, data: Partial<RateLimitCreate>): Promise<RateLimit> {
    const existing = await this.repo.findRateLimitById(schoolId, id);
    if (!existing) throw new EntRateLimitNotFoundError(id);
    return this.repo.updateRateLimit(schoolId, id, data);
  }
  async deleteRateLimit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRateLimitById(schoolId, id);
    if (!existing) throw new EntRateLimitNotFoundError(id);
    return this.repo.deleteRateLimit(schoolId, id);
  }
  async countRateLimits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRateLimits(schoolId, filters);
  }
}
