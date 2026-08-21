import type { SupabaseClient } from '@supabase/supabase-js';
import type { DnsZone } from '@educi/types';
import { EduCloudDnsZoneError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDnsZone {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDnsZone(schoolId: string, id: string): Promise<DnsZone> {
    const item = await this.repo.getDnsZone(schoolId, id);
    if (!item) throw new EduCloudDnsZoneError(id);
    return item;
  }
  async listDnsZones(schoolId: string, filters?: Record<string, unknown>): Promise<DnsZone[]> {
    return this.repo.listDnsZone(schoolId, filters);
  }
  async createDnsZone(schoolId: string, data: Partial<DnsZone>): Promise<DnsZone> {
    return this.repo.createDnsZone(schoolId, data as any);
  }
  async updateDnsZone(schoolId: string, id: string, data: Partial<DnsZone>): Promise<DnsZone> {
    const existing = await this.repo.getDnsZone(schoolId, id);
    if (!existing) throw new EduCloudDnsZoneError(id);
    return this.repo.updateDnsZone(schoolId, id, data as any);
  }
  async deleteDnsZone(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDnsZone(schoolId, id);
    if (!existing) throw new EduCloudDnsZoneError(id);
    return this.repo.deleteDnsZone(schoolId, id);
  }
}
