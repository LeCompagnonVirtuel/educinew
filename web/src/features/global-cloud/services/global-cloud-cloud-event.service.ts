import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudEvent } from '@educi/types';
import { EduCloudCloudEventError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudEvent {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudEvent(schoolId: string, id: string): Promise<CloudEvent> {
    const item = await this.repo.getCloudEvent(schoolId, id);
    if (!item) throw new EduCloudCloudEventError(id);
    return item;
  }
  async listCloudEvents(schoolId: string, filters?: Record<string, unknown>): Promise<CloudEvent[]> {
    return this.repo.listCloudEvent(schoolId, filters);
  }
  async createCloudEvent(schoolId: string, data: Partial<CloudEvent>): Promise<CloudEvent> {
    return this.repo.createCloudEvent(schoolId, data as any);
  }
  async updateCloudEvent(schoolId: string, id: string, data: Partial<CloudEvent>): Promise<CloudEvent> {
    const existing = await this.repo.getCloudEvent(schoolId, id);
    if (!existing) throw new EduCloudCloudEventError(id);
    return this.repo.updateCloudEvent(schoolId, id, data as any);
  }
  async deleteCloudEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudEvent(schoolId, id);
    if (!existing) throw new EduCloudCloudEventError(id);
    return this.repo.deleteCloudEvent(schoolId, id);
  }
}
