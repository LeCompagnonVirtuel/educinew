import type { SupabaseClient } from '@supabase/supabase-js';
import type { EventSource } from '@educi/types';
import { EduCloudEventSourceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEventSource {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEventSource(schoolId: string, id: string): Promise<EventSource> {
    const item = await this.repo.getEventSource(schoolId, id);
    if (!item) throw new EduCloudEventSourceError(id);
    return item;
  }
  async listEventSources(schoolId: string, filters?: Record<string, unknown>): Promise<EventSource[]> {
    return this.repo.listEventSource(schoolId, filters);
  }
  async createEventSource(schoolId: string, data: Partial<EventSource>): Promise<EventSource> {
    return this.repo.createEventSource(schoolId, data as any);
  }
  async updateEventSource(schoolId: string, id: string, data: Partial<EventSource>): Promise<EventSource> {
    const existing = await this.repo.getEventSource(schoolId, id);
    if (!existing) throw new EduCloudEventSourceError(id);
    return this.repo.updateEventSource(schoolId, id, data as any);
  }
  async deleteEventSource(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEventSource(schoolId, id);
    if (!existing) throw new EduCloudEventSourceError(id);
    return this.repo.deleteEventSource(schoolId, id);
  }
}
