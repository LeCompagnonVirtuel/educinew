import type { SupabaseClient } from '@supabase/supabase-js';
import type { PluginMetrics } from '@educi/types';
import { EduCloudPluginMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudPluginMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getPluginMetrics(schoolId: string, id: string): Promise<PluginMetrics> {
    const item = await this.repo.getPluginMetrics(schoolId, id);
    if (!item) throw new EduCloudPluginMetricsError(id);
    return item;
  }
  async listPluginMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<PluginMetrics[]> {
    return this.repo.listPluginMetrics(schoolId, filters);
  }
  async createPluginMetrics(schoolId: string, data: Partial<PluginMetrics>): Promise<PluginMetrics> {
    return this.repo.createPluginMetrics(schoolId, data as any);
  }
  async updatePluginMetrics(schoolId: string, id: string, data: Partial<PluginMetrics>): Promise<PluginMetrics> {
    const existing = await this.repo.getPluginMetrics(schoolId, id);
    if (!existing) throw new EduCloudPluginMetricsError(id);
    return this.repo.updatePluginMetrics(schoolId, id, data as any);
  }
  async deletePluginMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPluginMetrics(schoolId, id);
    if (!existing) throw new EduCloudPluginMetricsError(id);
    return this.repo.deletePluginMetrics(schoolId, id);
  }
}
