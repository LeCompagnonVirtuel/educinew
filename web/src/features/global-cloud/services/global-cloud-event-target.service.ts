import type { SupabaseClient } from '@supabase/supabase-js';
import type { EventTarget } from '@educi/types';
import { EduCloudEventTargetError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEventTarget {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEventTarget(schoolId: string, id: string): Promise<EventTarget> {
    const item = await this.repo.getEventTarget(schoolId, id);
    if (!item) throw new EduCloudEventTargetError(id);
    return item;
  }
  async listEventTargets(schoolId: string, filters?: Record<string, unknown>): Promise<EventTarget[]> {
    return this.repo.listEventTarget(schoolId, filters);
  }
  async createEventTarget(schoolId: string, data: Partial<EventTarget>): Promise<EventTarget> {
    return this.repo.createEventTarget(schoolId, data as any);
  }
  async updateEventTarget(schoolId: string, id: string, data: Partial<EventTarget>): Promise<EventTarget> {
    const existing = await this.repo.getEventTarget(schoolId, id);
    if (!existing) throw new EduCloudEventTargetError(id);
    return this.repo.updateEventTarget(schoolId, id, data as any);
  }
  async deleteEventTarget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEventTarget(schoolId, id);
    if (!existing) throw new EduCloudEventTargetError(id);
    return this.repo.deleteEventTarget(schoolId, id);
  }
}
