// Government & National Governance Service - ApiRateLimiter
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ApiRateLimiter, ApiRateLimiterCreate } from '@educi/types';
import { GovApiRateLimiterNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovApiRateLimiterService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getApiRateLimiter(schoolId: string, id: string): Promise<ApiRateLimiter> {
    const item = await this.repo.findApiRateLimiterById(schoolId, id);
    if (!item) throw new GovApiRateLimiterNotFoundError(id);
    return item;
  }

  async listApiRateLimiters(schoolId: string, filters?: Record<string, unknown>): Promise<ApiRateLimiter[]> {
    return this.repo.findAllApiRateLimiters(schoolId, filters);
  }

  async createApiRateLimiter(schoolId: string, data: ApiRateLimiterCreate): Promise<ApiRateLimiter> {
    return this.repo.createApiRateLimiter(schoolId, data);
  }

  async updateApiRateLimiter(schoolId: string, id: string, data: Partial<ApiRateLimiterCreate>): Promise<ApiRateLimiter> {
    const existing = await this.repo.findApiRateLimiterById(schoolId, id);
    if (!existing) throw new GovApiRateLimiterNotFoundError(id);
    return this.repo.updateApiRateLimiter(schoolId, id, data);
  }

  async deleteApiRateLimiter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findApiRateLimiterById(schoolId, id);
    if (!existing) throw new GovApiRateLimiterNotFoundError(id);
    return this.repo.deleteApiRateLimiter(schoolId, id);
  }

  async countApiRateLimiters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countApiRateLimiters(schoolId, filters);
  }
}
