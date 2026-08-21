import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScalingEvent } from '@educi/types';
import { EduCloudScalingEventError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudScalingEvent {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getScalingEvent(schoolId: string, id: string): Promise<ScalingEvent> {
    const item = await this.repo.getScalingEvent(schoolId, id);
    if (!item) throw new EduCloudScalingEventError(id);
    return item;
  }
  async listScalingEvents(schoolId: string, filters?: Record<string, unknown>): Promise<ScalingEvent[]> {
    return this.repo.listScalingEvent(schoolId, filters);
  }
  async createScalingEvent(schoolId: string, data: Partial<ScalingEvent>): Promise<ScalingEvent> {
    return this.repo.createScalingEvent(schoolId, data as any);
  }
  async updateScalingEvent(schoolId: string, id: string, data: Partial<ScalingEvent>): Promise<ScalingEvent> {
    const existing = await this.repo.getScalingEvent(schoolId, id);
    if (!existing) throw new EduCloudScalingEventError(id);
    return this.repo.updateScalingEvent(schoolId, id, data as any);
  }
  async deleteScalingEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScalingEvent(schoolId, id);
    if (!existing) throw new EduCloudScalingEventError(id);
    return this.repo.deleteScalingEvent(schoolId, id);
  }
}
