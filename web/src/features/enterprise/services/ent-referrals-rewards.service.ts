// Enterprise Platform Service - ReferralsRewards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReferralRewardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReferralsReward(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReferralsRewardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReferralsRewards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReferralsRewards(schoolId, filters);
  }
  async createReferralsReward(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReferralsReward(schoolId, data);
  }
  async updateReferralsReward(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReferralsRewardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReferralsReward(schoolId, id, data);
  }
  async deleteReferralsReward(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReferralsRewardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReferralsReward(schoolId, id);
  }
  async countReferralsRewards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReferralsRewards(schoolId, filters);
  }
}
