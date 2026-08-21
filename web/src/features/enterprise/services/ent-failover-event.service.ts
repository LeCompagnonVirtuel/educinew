// Enterprise Platform Service - FailoverEvent
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FailoverEvent, FailoverEventCreate } from '@educi/types';
import { EntFailoverEventNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFailoverEventService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFailoverEvent(schoolId: string, id: string): Promise<FailoverEvent> {
    const item = await this.repo.findFailoverEventById(schoolId, id);
    if (!item) throw new EntFailoverEventNotFoundError(id);
    return item;
  }
  async listFailoverEvents(schoolId: string, filters?: Record<string, unknown>): Promise<FailoverEvent[]> {
    return this.repo.findAllFailoverEvents(schoolId, filters);
  }
  async createFailoverEvent(schoolId: string, data: FailoverEventCreate): Promise<FailoverEvent> {
    return this.repo.createFailoverEvent(schoolId, data);
  }
  async updateFailoverEvent(schoolId: string, id: string, data: Partial<FailoverEventCreate>): Promise<FailoverEvent> {
    const existing = await this.repo.findFailoverEventById(schoolId, id);
    if (!existing) throw new EntFailoverEventNotFoundError(id);
    return this.repo.updateFailoverEvent(schoolId, id, data);
  }
  async deleteFailoverEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFailoverEventById(schoolId, id);
    if (!existing) throw new EntFailoverEventNotFoundError(id);
    return this.repo.deleteFailoverEvent(schoolId, id);
  }
  async countFailoverEvents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFailoverEvents(schoolId, filters);
  }
}
