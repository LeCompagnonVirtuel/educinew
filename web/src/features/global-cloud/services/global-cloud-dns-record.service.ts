import type { SupabaseClient } from '@supabase/supabase-js';
import type { DnsRecord } from '@educi/types';
import { EduCloudDnsRecordError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDnsRecord {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDnsRecord(schoolId: string, id: string): Promise<DnsRecord> {
    const item = await this.repo.getDnsRecord(schoolId, id);
    if (!item) throw new EduCloudDnsRecordError(id);
    return item;
  }
  async listDnsRecords(schoolId: string, filters?: Record<string, unknown>): Promise<DnsRecord[]> {
    return this.repo.listDnsRecord(schoolId, filters);
  }
  async createDnsRecord(schoolId: string, data: Partial<DnsRecord>): Promise<DnsRecord> {
    return this.repo.createDnsRecord(schoolId, data as any);
  }
  async updateDnsRecord(schoolId: string, id: string, data: Partial<DnsRecord>): Promise<DnsRecord> {
    const existing = await this.repo.getDnsRecord(schoolId, id);
    if (!existing) throw new EduCloudDnsRecordError(id);
    return this.repo.updateDnsRecord(schoolId, id, data as any);
  }
  async deleteDnsRecord(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDnsRecord(schoolId, id);
    if (!existing) throw new EduCloudDnsRecordError(id);
    return this.repo.deleteDnsRecord(schoolId, id);
  }
}
