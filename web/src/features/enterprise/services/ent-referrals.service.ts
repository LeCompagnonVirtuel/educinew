// Enterprise Platform Service - Referrals
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReferralService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReferral(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReferralById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReferrals(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReferrals(schoolId, filters);
  }
  async createReferral(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReferral(schoolId, data);
  }
  async updateReferral(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReferralById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReferral(schoolId, id, data);
  }
  async deleteReferral(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReferralById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReferral(schoolId, id);
  }
  async countReferrals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReferrals(schoolId, filters);
  }
}
