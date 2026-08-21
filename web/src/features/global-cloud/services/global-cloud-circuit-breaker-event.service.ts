import type { SupabaseClient } from '@supabase/supabase-js';
import type { CircuitBreakerEvent } from '@educi/types';
import { EduCloudCircuitBreakerEventError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCircuitBreakerEvent {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCircuitBreakerEvent(schoolId: string, id: string): Promise<CircuitBreakerEvent> {
    const item = await this.repo.getCircuitBreakerEvent(schoolId, id);
    if (!item) throw new EduCloudCircuitBreakerEventError(id);
    return item;
  }
  async listCircuitBreakerEvents(schoolId: string, filters?: Record<string, unknown>): Promise<CircuitBreakerEvent[]> {
    return this.repo.listCircuitBreakerEvent(schoolId, filters);
  }
  async createCircuitBreakerEvent(schoolId: string, data: Partial<CircuitBreakerEvent>): Promise<CircuitBreakerEvent> {
    return this.repo.createCircuitBreakerEvent(schoolId, data as any);
  }
  async updateCircuitBreakerEvent(schoolId: string, id: string, data: Partial<CircuitBreakerEvent>): Promise<CircuitBreakerEvent> {
    const existing = await this.repo.getCircuitBreakerEvent(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerEventError(id);
    return this.repo.updateCircuitBreakerEvent(schoolId, id, data as any);
  }
  async deleteCircuitBreakerEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCircuitBreakerEvent(schoolId, id);
    if (!existing) throw new EduCloudCircuitBreakerEventError(id);
    return this.repo.deleteCircuitBreakerEvent(schoolId, id);
  }
}
