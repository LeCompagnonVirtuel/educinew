// Enterprise Platform Service - Credits
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCreditService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCredit(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCreditById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCredits(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCredits(schoolId, filters);
  }
  async createCredit(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCredit(schoolId, data);
  }
  async updateCredit(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCreditById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCredit(schoolId, id, data);
  }
  async deleteCredit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCreditById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCredit(schoolId, id);
  }
  async countCredits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCredits(schoolId, filters);
  }
}
