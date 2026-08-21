import type { SupabaseClient } from '@supabase/supabase-js';
import type { CircuitBreaker } from '@educi/types';
import { EduCloudCircuitBreakerError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCircuitBreaker {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCircuitBreaker(schoolId: string, id: string): Promise<CircuitBreaker> {
    const item = await this.repo.getCircuitBreaker(schoolId, id);
    if (!item) throw new EduCloudCircuitBreakerError(id);
    return item;
  }
  async listCircuitBreakers(schoolId: string, filters?: Record<string, unknown>): Promise<CircuitBreaker[]> {
    return this.repo.listCircuitBreaker(schoolId, filters);
  }
  async createCircuitBreaker(schoolId: string, data: Partial<CircuitBreaker>): Promise<CircuitBreaker> {
    return this.repo.createCircuitBreaker(schoolId, data as any);
  }
  async updateCircuitBreaker(schoolId: string, id: string, data: Partial<CircuitBreaker>): Promise<CircuitBreaker> {
    const existing = await this.repo.getCircuitBreaker(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerError(id);
    return this.repo.updateCircuitBreaker(schoolId, id, data as any);
  }
  async deleteCircuitBreaker(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCircuitBreaker(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerError(id);
    return this.repo.deleteCircuitBreaker(schoolId, id);
  }
}
