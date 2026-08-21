import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiRateLimit, AiRateLimitQuery, AiRateLimitCreate, AiRateLimitUpdate } from '@educi/types';
import { AiRateLimitNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiRateLimitService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getRateLimit(schoolId: string, id: string): Promise<AiRateLimit> {
    const rateLimit = await this.repo.findById(schoolId, id);
    if (!rateLimit) throw new AiRateLimitNotFoundError(id);
    return rateLimit;
  }

  async listRateLimits(schoolId: string, query: AiRateLimitQuery): Promise<AiRateLimit[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createRateLimit(schoolId: string, data: AiRateLimitCreate): Promise<AiRateLimit> {
    return this.repo.create(schoolId, data);
  }

  async updateRateLimit(schoolId: string, id: string, data: AiRateLimitUpdate): Promise<AiRateLimit> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiRateLimitNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
