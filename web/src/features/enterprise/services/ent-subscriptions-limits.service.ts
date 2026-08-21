// Enterprise Platform Service - SubscriptionsLimits
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSubscriptionLimitService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSubscriptionsLimit(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSubscriptionsLimitById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSubscriptionsLimits(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSubscriptionsLimits(schoolId, filters);
  }
  async createSubscriptionsLimit(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSubscriptionsLimit(schoolId, data);
  }
  async updateSubscriptionsLimit(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSubscriptionsLimitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSubscriptionsLimit(schoolId, id, data);
  }
  async deleteSubscriptionsLimit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSubscriptionsLimitById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSubscriptionsLimit(schoolId, id);
  }
  async countSubscriptionsLimits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSubscriptionsLimits(schoolId, filters);
  }
}
