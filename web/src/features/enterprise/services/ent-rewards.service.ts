// Enterprise Platform Service - Rewards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRewardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReward(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRewardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRewards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRewards(schoolId, filters);
  }
  async createReward(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReward(schoolId, data);
  }
  async updateReward(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRewardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReward(schoolId, id, data);
  }
  async deleteReward(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRewardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReward(schoolId, id);
  }
  async countRewards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRewards(schoolId, filters);
  }
}
