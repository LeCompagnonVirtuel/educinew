// Enterprise Platform Service - DnsRecords
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDnsRecordService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDnsRecord(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDnsRecordById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDnsRecords(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDnsRecords(schoolId, filters);
  }
  async createDnsRecord(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDnsRecord(schoolId, data);
  }
  async updateDnsRecord(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDnsRecordById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDnsRecord(schoolId, id, data);
  }
  async deleteDnsRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDnsRecordById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDnsRecord(schoolId, id);
  }
  async countDnsRecords(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDnsRecords(schoolId, filters);
  }
}
