// Enterprise Platform Service - OnCallSchedules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntOnCallScheduleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOnCallSchedule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findOnCallScheduleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listOnCallSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllOnCallSchedules(schoolId, filters);
  }
  async createOnCallSchedule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createOnCallSchedule(schoolId, data);
  }
  async updateOnCallSchedule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findOnCallScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateOnCallSchedule(schoolId, id, data);
  }
  async deleteOnCallSchedule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOnCallScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteOnCallSchedule(schoolId, id);
  }
  async countOnCallSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOnCallSchedules(schoolId, filters);
  }
}
