// Enterprise Platform Service - SubscriptionsUsage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSubscriptionUsageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSubscriptionsUsage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSubscriptionsUsageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSubscriptionsUsage(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSubscriptionsUsage(schoolId, filters);
  }
  async createSubscriptionsUsage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSubscriptionsUsage(schoolId, data);
  }
  async updateSubscriptionsUsage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSubscriptionsUsageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSubscriptionsUsage(schoolId, id, data);
  }
  async deleteSubscriptionsUsage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSubscriptionsUsageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSubscriptionsUsage(schoolId, id);
  }
  async countSubscriptionsUsage(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSubscriptionsUsage(schoolId, filters);
  }
}
