import type { SupabaseClient } from '@supabase/supabase-js';
import type { EventTrigger } from '@educi/types';
import { EduOSEventTriggerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSEventTriggerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getEventTrigger(schoolId: string, id: string): Promise<EventTrigger> {
    const item = await this.repo.getEventTrigger(schoolId, id);
    if (!item) throw new EduOSEventTriggerError(id);
    return item;
  }
  async listEventTriggers(schoolId: string, filters?: Record<string, unknown>): Promise<EventTrigger[]> {
    return this.repo.listEventTriggers(schoolId, filters);
  }
  async createEventTrigger(schoolId: string, data: Partial<EventTrigger>): Promise<EventTrigger> {
    return this.repo.createEventTrigger(schoolId, data as any);
  }
  async updateEventTrigger(schoolId: string, id: string, data: Partial<EventTrigger>): Promise<EventTrigger> {
    const existing = await this.repo.getEventTrigger(schoolId, id);
    if (!existing) throw new EduOSEventTriggerError(id);
    return this.repo.updateEventTrigger(schoolId, id, data as any);
  }
  async deleteEventTrigger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEventTrigger(schoolId, id);
    if (!existing) throw new EduOSEventTriggerError(id);
    return this.repo.deleteEventTrigger(schoolId, id);
  }
}

