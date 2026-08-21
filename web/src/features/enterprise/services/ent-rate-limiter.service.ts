// Enterprise Platform Service - RateLimiter
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RateLimiter, RateLimiterCreate } from '@educi/types';
import { EntRateLimiterNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRateLimiterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRateLimiter(schoolId: string, id: string): Promise<RateLimiter> {
    const item = await this.repo.findRateLimiterById(schoolId, id);
    if (!item) throw new EntRateLimiterNotFoundError(id);
    return item;
  }
  async listRateLimiters(schoolId: string, filters?: Record<string, unknown>): Promise<RateLimiter[]> {
    return this.repo.findAllRateLimiters(schoolId, filters);
  }
  async createRateLimiter(schoolId: string, data: RateLimiterCreate): Promise<RateLimiter> {
    return this.repo.createRateLimiter(schoolId, data);
  }
  async updateRateLimiter(schoolId: string, id: string, data: Partial<RateLimiterCreate>): Promise<RateLimiter> {
    const existing = await this.repo.findRateLimiterById(schoolId, id);
    if (!existing) throw new EntRateLimiterNotFoundError(id);
    return this.repo.updateRateLimiter(schoolId, id, data);
  }
  async deleteRateLimiter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRateLimiterById(schoolId, id);
    if (!existing) throw new EntRateLimiterNotFoundError(id);
    return this.repo.deleteRateLimiter(schoolId, id);
  }
  async countRateLimiters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRateLimiters(schoolId, filters);
  }
}
