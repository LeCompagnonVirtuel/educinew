import type { SupabaseClient } from '@supabase/supabase-js';
import type { DnsTransfer } from '@educi/types';
import { EduCloudDnsTransferError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDnsTransfer {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDnsTransfer(schoolId: string, id: string): Promise<DnsTransfer> {
    const item = await this.repo.getDnsTransfer(schoolId, id);
    if (!item) throw new EduCloudDnsTransferError(id);
    return item;
  }
  async listDnsTransfers(schoolId: string, filters?: Record<string, unknown>): Promise<DnsTransfer[]> {
    return this.repo.listDnsTransfer(schoolId, filters);
  }
  async createDnsTransfer(schoolId: string, data: Partial<DnsTransfer>): Promise<DnsTransfer> {
    return this.repo.createDnsTransfer(schoolId, data as any);
  }
  async updateDnsTransfer(schoolId: string, id: string, data: Partial<DnsTransfer>): Promise<DnsTransfer> {
    const existing = await this.repo.getDnsTransfer(schoolId, id);
    if (!existing) throw new EduCloudDnsTransferError(id);
    return this.repo.updateDnsTransfer(schoolId, id, data as any);
  }
  async deleteDnsTransfer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDnsTransfer(schoolId, id);
    if (!existing) throw new EduCloudDnsTransferError(id);
    return this.repo.deleteDnsTransfer(schoolId, id);
  }
}
