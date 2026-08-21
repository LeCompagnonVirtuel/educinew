// Enterprise Platform Service - PlatformEvent
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformEvent, PlatformEventCreate } from '@educi/types';
import { EntPlatformEventNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformEventService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformEvent(schoolId: string, id: string): Promise<PlatformEvent> {
    const item = await this.repo.findPlatformEventById(schoolId, id);
    if (!item) throw new EntPlatformEventNotFoundError(id);
    return item;
  }
  async listPlatformEvents(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformEvent[]> {
    return this.repo.findAllPlatformEvents(schoolId, filters);
  }
  async createPlatformEvent(schoolId: string, data: PlatformEventCreate): Promise<PlatformEvent> {
    return this.repo.createPlatformEvent(schoolId, data);
  }
  async updatePlatformEvent(schoolId: string, id: string, data: Partial<PlatformEventCreate>): Promise<PlatformEvent> {
    const existing = await this.repo.findPlatformEventById(schoolId, id);
    if (!existing) throw new EntPlatformEventNotFoundError(id);
    return this.repo.updatePlatformEvent(schoolId, id, data);
  }
  async deletePlatformEvent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformEventById(schoolId, id);
    if (!existing) throw new EntPlatformEventNotFoundError(id);
    return this.repo.deletePlatformEvent(schoolId, id);
  }
  async countPlatformEvents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformEvents(schoolId, filters);
  }
}
