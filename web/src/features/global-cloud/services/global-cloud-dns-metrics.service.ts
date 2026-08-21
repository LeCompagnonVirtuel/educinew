import type { SupabaseClient } from '@supabase/supabase-js';
import type { DnsMetrics } from '@educi/types';
import { EduCloudDnsMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDnsMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDnsMetrics(schoolId: string, id: string): Promise<DnsMetrics> {
    const item = await this.repo.getDnsMetrics(schoolId, id);
    if (!item) throw new EduCloudDnsMetricsError(id);
    return item;
  }
  async listDnsMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<DnsMetrics[]> {
    return this.repo.listDnsMetrics(schoolId, filters);
  }
  async createDnsMetrics(schoolId: string, data: Partial<DnsMetrics>): Promise<DnsMetrics> {
    return this.repo.createDnsMetrics(schoolId, data as any);
  }
  async updateDnsMetrics(schoolId: string, id: string, data: Partial<DnsMetrics>): Promise<DnsMetrics> {
    const existing = await this.repo.getDnsMetrics(schoolId, id);
    if (!existing) throw new EduCloudDnsMetricsError(id);
    return this.repo.updateDnsMetrics(schoolId, id, data as any);
  }
  async deleteDnsMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDnsMetrics(schoolId, id);
    if (!existing) throw new EduCloudDnsMetricsError(id);
    return this.repo.deleteDnsMetrics(schoolId, id);
  }
}
