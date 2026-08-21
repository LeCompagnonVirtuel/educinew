// Enterprise Platform Service - AffiliateProgramsCommissions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAffiliateCommissionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAffiliateProgramsCommission(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAffiliateProgramsCommissionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAffiliateProgramsCommissions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAffiliateProgramsCommissions(schoolId, filters);
  }
  async createAffiliateProgramsCommission(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAffiliateProgramsCommission(schoolId, data);
  }
  async updateAffiliateProgramsCommission(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAffiliateProgramsCommissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAffiliateProgramsCommission(schoolId, id, data);
  }
  async deleteAffiliateProgramsCommission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAffiliateProgramsCommissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAffiliateProgramsCommission(schoolId, id);
  }
  async countAffiliateProgramsCommissions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAffiliateProgramsCommissions(schoolId, filters);
  }
}
