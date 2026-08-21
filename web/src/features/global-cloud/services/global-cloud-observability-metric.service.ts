import type { SupabaseClient } from '@supabase/supabase-js';
import type { ObservabilityMetric } from '@educi/types';
import { EduCloudObservabilityMetricError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudObservabilityMetric {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getObservabilityMetric(schoolId: string, id: string): Promise<ObservabilityMetric> {
    const item = await this.repo.getObservabilityMetric(schoolId, id);
    if (!item) throw new EduCloudObservabilityMetricError(id);
    return item;
  }
  async listObservabilityMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<ObservabilityMetric[]> {
    return this.repo.listObservabilityMetric(schoolId, filters);
  }
  async createObservabilityMetric(schoolId: string, data: Partial<ObservabilityMetric>): Promise<ObservabilityMetric> {
    return this.repo.createObservabilityMetric(schoolId, data as any);
  }
  async updateObservabilityMetric(schoolId: string, id: string, data: Partial<ObservabilityMetric>): Promise<ObservabilityMetric> {
    const existing = await this.repo.getObservabilityMetric(schoolId, id);
    if (!existing) throw new EduCloudObservabilityMetricError(id);
    return this.repo.updateObservabilityMetric(schoolId, id, data as any);
  }
  async deleteObservabilityMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getObservabilityMetric(schoolId, id);
    if (!existing) throw new EduCloudObservabilityMetricError(id);
    return this.repo.deleteObservabilityMetric(schoolId, id);
  }
}
