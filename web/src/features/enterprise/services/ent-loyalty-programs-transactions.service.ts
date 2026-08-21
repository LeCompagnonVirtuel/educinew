// Enterprise Platform Service - LoyaltyProgramsTransactions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoyaltyTransactionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoyaltyProgramsTransaction(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLoyaltyProgramsTransactionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLoyaltyProgramsTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLoyaltyProgramsTransactions(schoolId, filters);
  }
  async createLoyaltyProgramsTransaction(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLoyaltyProgramsTransaction(schoolId, data);
  }
  async updateLoyaltyProgramsTransaction(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLoyaltyProgramsTransactionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLoyaltyProgramsTransaction(schoolId, id, data);
  }
  async deleteLoyaltyProgramsTransaction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoyaltyProgramsTransactionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLoyaltyProgramsTransaction(schoolId, id);
  }
  async countLoyaltyProgramsTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoyaltyProgramsTransactions(schoolId, filters);
  }
}
