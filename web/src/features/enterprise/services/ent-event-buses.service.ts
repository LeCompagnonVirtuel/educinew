// Enterprise Platform Service - EventBuses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEventBusService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEventBuse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findEventBuseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listEventBuses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllEventBuses(schoolId, filters);
  }
  async createEventBuse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createEventBuse(schoolId, data);
  }
  async updateEventBuse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findEventBuseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateEventBuse(schoolId, id, data);
  }
  async deleteEventBuse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEventBuseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteEventBuse(schoolId, id);
  }
  async countEventBuses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEventBuses(schoolId, filters);
  }
}
