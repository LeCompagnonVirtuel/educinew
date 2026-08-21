import type { SupabaseClient } from '@supabase/supabase-js';
import type { StorageMetrics } from '@educi/types';
import { EduCloudStorageMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudStorageMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getStorageMetrics(schoolId: string, id: string): Promise<StorageMetrics> {
    const item = await this.repo.getStorageMetrics(schoolId, id);
    if (!item) throw new EduCloudStorageMetricsError(id);
    return item;
  }
  async listStorageMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<StorageMetrics[]> {
    return this.repo.listStorageMetrics(schoolId, filters);
  }
  async createStorageMetrics(schoolId: string, data: Partial<StorageMetrics>): Promise<StorageMetrics> {
    return this.repo.createStorageMetrics(schoolId, data as any);
  }
  async updateStorageMetrics(schoolId: string, id: string, data: Partial<StorageMetrics>): Promise<StorageMetrics> {
    const existing = await this.repo.getStorageMetrics(schoolId, id);
    if (!existing) throw new EduCloudStorageMetricsError(id);
    return this.repo.updateStorageMetrics(schoolId, id, data as any);
  }
  async deleteStorageMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStorageMetrics(schoolId, id);
    if (!existing) throw new EduCloudStorageMetricsError(id);
    return this.repo.deleteStorageMetrics(schoolId, id);
  }
}
