import type { SupabaseClient } from '@supabase/supabase-js';
import type { CircuitBreakerStateHistory } from '@educi/types';
import { EduCloudCircuitBreakerStateHistoryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCircuitBreakerStateHistory {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCircuitBreakerStateHistory(schoolId: string, id: string): Promise<CircuitBreakerStateHistory> {
    const item = await this.repo.getCircuitBreakerStateHistory(schoolId, id);
    if (!item) throw new EduCloudCircuitBreakerStateHistoryError(id);
    return item;
  }
  async listCircuitBreakerStateHistorys(schoolId: string, filters?: Record<string, unknown>): Promise<CircuitBreakerStateHistory[]> {
    return this.repo.listCircuitBreakerStateHistory(schoolId, filters);
  }
  async createCircuitBreakerStateHistory(schoolId: string, data: Partial<CircuitBreakerStateHistory>): Promise<CircuitBreakerStateHistory> {
    return this.repo.createCircuitBreakerStateHistory(schoolId, data as any);
  }
  async updateCircuitBreakerStateHistory(schoolId: string, id: string, data: Partial<CircuitBreakerStateHistory>): Promise<CircuitBreakerStateHistory> {
    const existing = await this.repo.getCircuitBreakerStateHistory(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerStateHistoryError(id);
    return this.repo.updateCircuitBreakerStateHistory(schoolId, id, data as any);
  }
  async deleteCircuitBreakerStateHistory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCircuitBreakerStateHistory(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerStateHistoryError(id);
    return this.repo.deleteCircuitBreakerStateHistory(schoolId, id);
  }
}
