// Enterprise Platform Service - AffiliateProgramsPayouts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAffiliatePayoutService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAffiliateProgramsPayout(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAffiliateProgramsPayoutById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAffiliateProgramsPayouts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAffiliateProgramsPayouts(schoolId, filters);
  }
  async createAffiliateProgramsPayout(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAffiliateProgramsPayout(schoolId, data);
  }
  async updateAffiliateProgramsPayout(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAffiliateProgramsPayoutById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAffiliateProgramsPayout(schoolId, id, data);
  }
  async deleteAffiliateProgramsPayout(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAffiliateProgramsPayoutById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAffiliateProgramsPayout(schoolId, id);
  }
  async countAffiliateProgramsPayouts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAffiliateProgramsPayouts(schoolId, filters);
  }
}
