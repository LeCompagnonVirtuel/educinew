// Enterprise Platform Service - Subscriptions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSubscriptionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSubscription(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSubscriptionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSubscriptions(schoolId, filters);
  }
  async createSubscription(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSubscription(schoolId, data);
  }
  async updateSubscription(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSubscriptionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSubscription(schoolId, id, data);
  }
  async deleteSubscription(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSubscriptionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSubscription(schoolId, id);
  }
  async countSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSubscriptions(schoolId, filters);
  }
}
