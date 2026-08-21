import type { SupabaseClient } from '@supabase/supabase-js';
import type { CircuitBreakerMetrics } from '@educi/types';
import { EduCloudCircuitBreakerMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCircuitBreakerMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCircuitBreakerMetrics(schoolId: string, id: string): Promise<CircuitBreakerMetrics> {
    const item = await this.repo.getCircuitBreakerMetrics(schoolId, id);
    if (!item) throw new EduCloudCircuitBreakerMetricsError(id);
    return item;
  }
  async listCircuitBreakerMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<CircuitBreakerMetrics[]> {
    return this.repo.listCircuitBreakerMetrics(schoolId, filters);
  }
  async createCircuitBreakerMetrics(schoolId: string, data: Partial<CircuitBreakerMetrics>): Promise<CircuitBreakerMetrics> {
    return this.repo.createCircuitBreakerMetrics(schoolId, data as any);
  }
  async updateCircuitBreakerMetrics(schoolId: string, id: string, data: Partial<CircuitBreakerMetrics>): Promise<CircuitBreakerMetrics> {
    const existing = await this.repo.getCircuitBreakerMetrics(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerMetricsError(id);
    return this.repo.updateCircuitBreakerMetrics(schoolId, id, data as any);
  }
  async deleteCircuitBreakerMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCircuitBreakerMetrics(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerMetricsError(id);
    return this.repo.deleteCircuitBreakerMetrics(schoolId, id);
  }
}
