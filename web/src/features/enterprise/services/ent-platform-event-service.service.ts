// Enterprise Platform Service - PlatformEvent
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformEvent, PlatformEventCreate } from '@educi/types';
import { EntPlatformEventNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformEventServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformEventService(schoolId: string, id: string): Promise<PlatformEvent> {
    const item = await this.repo.findPlatformEventServiceById(schoolId, id);
    if (!item) throw new EntPlatformEventNotFoundError(id);
    return item;
  }
  async listPlatformEventServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformEvent[]> {
    return this.repo.findAllPlatformEventServices(schoolId, filters);
  }
  async createPlatformEventService(schoolId: string, data: PlatformEventCreate): Promise<PlatformEvent> {
    return this.repo.createPlatformEventService(schoolId, data);
  }
  async updatePlatformEventService(schoolId: string, id: string, data: Partial<PlatformEventCreate>): Promise<PlatformEvent> {
    const existing = await this.repo.findPlatformEventServiceById(schoolId, id);
    if (!existing) throw new EntPlatformEventNotFoundError(id);
    return this.repo.updatePlatformEventService(schoolId, id, data);
  }
  async deletePlatformEventService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformEventServiceById(schoolId, id);
    if (!existing) throw new EntPlatformEventNotFoundError(id);
    return this.repo.deletePlatformEventService(schoolId, id);
  }
  async countPlatformEventServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformEventServices(schoolId, filters);
  }
}
