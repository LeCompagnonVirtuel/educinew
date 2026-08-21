// Enterprise Platform Service - BillingCycles
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBillingCycleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBillingCycle(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBillingCycleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBillingCycles(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBillingCycles(schoolId, filters);
  }
  async createBillingCycle(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBillingCycle(schoolId, data);
  }
  async updateBillingCycle(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBillingCycleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBillingCycle(schoolId, id, data);
  }
  async deleteBillingCycle(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBillingCycleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBillingCycle(schoolId, id);
  }
  async countBillingCycles(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBillingCycles(schoolId, filters);
  }
}
