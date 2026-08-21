// Enterprise Platform Service - ConsentRecords
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntConsentRecordService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getConsentRecord(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findConsentRecordById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listConsentRecords(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllConsentRecords(schoolId, filters);
  }
  async createConsentRecord(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createConsentRecord(schoolId, data);
  }
  async updateConsentRecord(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findConsentRecordById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateConsentRecord(schoolId, id, data);
  }
  async deleteConsentRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findConsentRecordById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteConsentRecord(schoolId, id);
  }
  async countConsentRecords(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countConsentRecords(schoolId, filters);
  }
}
