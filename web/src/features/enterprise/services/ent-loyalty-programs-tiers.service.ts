// Enterprise Platform Service - LoyaltyProgramsTiers
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoyaltyTierService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoyaltyProgramsTier(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLoyaltyProgramsTierById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLoyaltyProgramsTiers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLoyaltyProgramsTiers(schoolId, filters);
  }
  async createLoyaltyProgramsTier(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLoyaltyProgramsTier(schoolId, data);
  }
  async updateLoyaltyProgramsTier(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLoyaltyProgramsTierById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLoyaltyProgramsTier(schoolId, id, data);
  }
  async deleteLoyaltyProgramsTier(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoyaltyProgramsTierById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLoyaltyProgramsTier(schoolId, id);
  }
  async countLoyaltyProgramsTiers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoyaltyProgramsTiers(schoolId, filters);
  }
}
