import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProxyMetrics } from '@educi/types';
import { EduCloudProxyMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudProxyMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getProxyMetrics(schoolId: string, id: string): Promise<ProxyMetrics> {
    const item = await this.repo.getProxyMetrics(schoolId, id);
    if (!item) throw new EduCloudProxyMetricsError(id);
    return item;
  }
  async listProxyMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<ProxyMetrics[]> {
    return this.repo.listProxyMetrics(schoolId, filters);
  }
  async createProxyMetrics(schoolId: string, data: Partial<ProxyMetrics>): Promise<ProxyMetrics> {
    return this.repo.createProxyMetrics(schoolId, data as any);
  }
  async updateProxyMetrics(schoolId: string, id: string, data: Partial<ProxyMetrics>): Promise<ProxyMetrics> {
    const existing = await this.repo.getProxyMetrics(schoolId, id);
    if (!existing) throw new EduCloudProxyMetricsError(id);
    return this.repo.updateProxyMetrics(schoolId, id, data as any);
  }
  async deleteProxyMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProxyMetrics(schoolId, id);
    if (!existing) throw new EduCloudProxyMetricsError(id);
    return this.repo.deleteProxyMetrics(schoolId, id);
  }
}
